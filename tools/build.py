#!/usr/bin/env python3
"""Build the Immaculate Connections site.

    python tools/build.py          # everything below (needs Google Chrome for the pages)
    python tools/build.py assets   # bundles only: this is what the deploy workflow runs
    python tools/build.py pages    # package pages, Tours grid and sitemap only

assets  Minifies the stylesheets and scripts into four bundles and stamps every page's
        ?v= with a hash of the bundle, so browsers pick up a change without anyone
        bumping a version by hand:
          assets/css/site.min.css       fonts.css + style.css + components.css (every page)
          assets/css/hero.min.css       hero.css (home)
          assets/css/quotation.min.css  quotation.css (contact, payment)
          assets/js/site.min.js         data.js + main.js (every page)

pages   Opens each package in headless Chrome, takes the markup the site's own script
        renders, and writes it into a real page, package-<id>.html, with that package's
        title, description, share image (assets/img/media/og-pkg-<id>.jpg), canonical
        address and structured data. The script still runs on those pages and refreshes
        dates and availability, so a page stays correct between builds; rebuild when a
        package's name, summary or photo changes, or a package is added or removed.
        Also pre-renders the Tours grid into tours.html (so it does not jump in) and
        rewrites sitemap.xml.

Edit the sources (the .css and .js files above, package.html, tours.html); the .min files
and package-*.html are written by this script. Needs: pip install rcssmin (assets),
websocket-client pillow (pages). Scripts are minified by tools/jsmin_safe.py.
"""
import functools, glob, hashlib, http.server, io, json, os, re, shutil, socket, subprocess, sys, tempfile, threading, time, urllib.request
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
SITE = "https://technextmarketing.github.io/immaculateconnectionsph/"   # keep in step with CONFIG.siteUrl in main.js
BRAND = "Immaculate Connections"


def read(p): return io.open(p, encoding="utf-8").read()


def write(p, s):
    if os.path.exists(p) and read(p) == s: return False
    io.open(p, "w", encoding="utf-8", newline="\n").write(s); return True


# ---------------------------------------------------------------- assets
BUNDLES = [
    ("assets/css/site.min.css", ["assets/css/fonts.css", "assets/css/style.css", "assets/css/components.css"]),
    ("assets/css/hero.min.css", ["assets/css/hero.css"]),
    ("assets/css/quotation.min.css", ["assets/css/quotation.css"]),
    ("assets/js/site.min.js", ["assets/js/data.js", "assets/js/main.js"]),
]


def build_assets():
    import rcssmin
    sys.path.insert(0, os.path.join(ROOT, 'tools'))
    from jsmin_safe import minify as jsmin
    stamps = {}
    for out, srcs in BUNDLES:
        parts = [read(s) for s in srcs]
        body = "\n".join(rcssmin.cssmin(p) for p in parts) if out.endswith(".css") else "\n;".join(jsmin(p) for p in parts)
        text = f"/* {os.path.basename(out)}: built by tools/build.py from {', '.join(os.path.basename(s) for s in srcs)}. Edit those, not this file. */\n{body}\n"
        write(out, text)
        stamps[out] = hashlib.sha1(text.encode("utf-8")).hexdigest()[:10]
        print(f"  {out}: {sum(len(p.encode()) for p in parts) // 1024} KB -> {len(text.encode()) // 1024} KB")
    n = 0
    for p in sorted(glob.glob("*.html")):
        s = read(p)
        s2 = re.sub(r"(assets/(?:css|js)/[a-z]+\.min\.(?:css|js))\?v=[\w]+", lambda m: f"{m.group(1)}?v={stamps[m.group(1)]}", s)
        n += write(p, s2)
    print(f"  stamped {n} page(s)")


# ---------------------------------------------------------------- pages
TRAP = r"""
(() => {   // remember the first markup the site's script writes into each element with an id
  const d = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  window.__html = {};
  Object.defineProperty(Element.prototype, 'innerHTML', { configurable: true,
    get() { return d.get.call(this); },
    set(v) { if (this.id && !(this.id in window.__html)) window.__html[this.id] = String(v); d.set.call(this, v); } });
})();
"""


def find_chrome():
    for c in [os.environ.get("CHROME"), r"C:\Program Files\Google\Chrome\Application\chrome.exe", r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
              shutil.which("google-chrome"), shutil.which("chromium"), shutil.which("chromium-browser"), "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]:
        if c and os.path.exists(c): return c
    sys.exit("Google Chrome not found: set CHROME to its path")


def free_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass


class Browser:
    def __init__(self):
        import websocket
        self.port = free_port(); self.prof = tempfile.mkdtemp(prefix="icbuild-")
        self.proc = subprocess.Popen([find_chrome(), "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-allow-origins=*",
                                      f"--remote-debugging-port={self.port}", f"--user-data-dir={self.prof}", "--window-size=1440,1000", "about:blank"],
                                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(80):
            try:
                pages = [x for x in json.load(urllib.request.urlopen(f"http://127.0.0.1:{self.port}/json")) if x.get("type") == "page"]
                if pages: break
            except Exception: pass
            time.sleep(.25)
        self.ws = websocket.create_connection(pages[0]["webSocketDebuggerUrl"], timeout=60); self.seq = 0; self.events = []
        self.send("Page.enable"); self.send("Page.addScriptToEvaluateOnNewDocument", {"source": TRAP})

    def send(self, method, params=None):
        self.seq += 1; self.ws.send(json.dumps({"id": self.seq, "method": method, "params": params or {}}))
        while True:
            m = json.loads(self.ws.recv())
            if m.get("id") == self.seq:
                if "error" in m: raise RuntimeError(f"{method}: {m['error']}")
                return m.get("result", {})
            self.events.append(m)

    def eval(self, expr):
        r = self.send("Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True})
        if "exceptionDetails" in r: raise RuntimeError(r["exceptionDetails"].get("text", "script error") + ": " + expr[:80])
        return r["result"].get("value")

    def open(self, url, ready):
        self.events = []; self.send("Page.navigate", {"url": url})
        end = time.time() + 45
        while time.time() < end and not any(e.get("method") == "Page.loadEventFired" for e in self.events):
            self.events.append(json.loads(self.ws.recv()))
        for _ in range(100):
            if self.eval(f"!!({ready})"): return
            time.sleep(.1)
        raise RuntimeError("page did not render: " + url)

    def close(self):
        try: self.ws.close()
        except Exception: pass
        self.proc.kill(); time.sleep(.5); shutil.rmtree(self.prof, ignore_errors=True)


def trim(text, n=155):
    """A description that shows whole in search results: whole sentences, else whole words."""
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= n: return text
    cut = text[:n + 1]
    s = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
    if s > 90: return cut[:s + 1]
    return cut[:cut.rfind(" ")].rstrip(",;:–—- ") + "…"


def esc(s): return (s or "").replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")


def og_card(tour, key):
    """1200x630 share image from the package's destination photo (JPEG, which every network reads)."""
    from PIL import Image
    out = f"assets/img/media/og-pkg-{tour['id']}.jpg"
    src = f"assets/img/hero/dest-{key}-2400.jpg" if key else ("assets/img/media/" + tour["imageFile"] if tour.get("imageFile") else None)
    if not src or not os.path.exists(src): return None
    if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src): return out
    im = Image.open(src).convert("RGB"); w, h = im.size; r = 1200 / 630
    if w / h > r: nw = int(h * r); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else: nh = int(w / r); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    im.resize((1200, 630), Image.LANCZOS).save(out, "JPEG", quality=84, optimize=True, progressive=True)
    return out


def set_meta(s, attr, name, value):
    pat = re.compile(rf'(<meta {attr}="{re.escape(name)}" content=")[^"]*(">)')
    assert pat.search(s), name
    return pat.sub(lambda m: m.group(1) + esc(value) + m.group(2), s, count=1)


def put_between(s, key, html):
    pat = re.compile(rf"(<!-- build:{key} -->).*?(<!-- /build -->)", re.S)
    assert pat.search(s), key
    return pat.sub(lambda m: m.group(1) + html + m.group(2), s, count=1)


def build_pages():
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", free_port()), functools.partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{srv.server_address[1]}/"
    b = Browser()
    try:
        # the Tours grid, filter tabs and count, exactly as the script first draws them
        b.open(base + "tours.html", "window.__html && window.__html.toursGrid")
        tours_parts = b.eval("JSON.stringify({ grid: __html.toursGrid, tabs: __html.regionTabs, count: document.getElementById('resultsCount').innerHTML })")
        tours_parts = json.loads(tours_parts)
        ids = b.eval("JSON.stringify(IC.tours.map(t => t.id))"); ids = json.loads(ids)
        pages = []
        for pid in ids:
            b.open(f"{base}package.html?id={pid}&bake", "window.__html && window.__html.pkgPage && document.querySelector('script[data-ld=\"pkg\"]')")
            got = json.loads(b.eval("""JSON.stringify((() => { const t = IC.tours.find(x => x.id === %s);
              const media = IC.wixJpg ? IC.wixJpg(t.image) : '';
              return { id: t.id, name: t.name, summary: t.summary, key: (IC.destHero || {})[t.id] || '', imageFile: media.split('/').pop(),
                       pkg: __html.pkgPage, related: __html.relatedGrid || '', ld: document.querySelector('script[data-ld="pkg"]').textContent }; })())""" % json.dumps(pid)))
            pages.append(got)
    finally:
        b.close(); srv.shutdown()

    # tours.html
    s = read("tours.html")
    s = put_between(put_between(put_between(s, "toursGrid", tours_parts["grid"]), "regionTabs", tours_parts["tabs"]), "resultsCount", tours_parts["count"])
    print("  tours.html:", "updated" if write("tours.html", s) else "unchanged")

    # one page per package, from the package.html template
    tpl = read("package.html")
    for f in glob.glob("package-*.html"):
        if f[8:-5] not in ids: os.remove(f); print("  removed", f)
    for t in pages:
        url = f"{SITE}package-{t['id']}.html"
        title = f"{t['name']} | {BRAND}" if len(t["name"]) + len(BRAND) + 3 <= 62 else t["name"]
        desc = trim(t["summary"])
        og = og_card(t, t["key"])
        og_url = SITE + og if og else None
        s = tpl
        s = re.sub(r"<title>.*?</title>", lambda m: f"<title>{esc(title)}</title>", s, count=1)
        s = set_meta(s, "name", "description", desc)
        s = set_meta(s, "property", "og:title", t["name"]); s = set_meta(s, "property", "og:description", desc)
        s = set_meta(s, "property", "og:url", url)
        s = set_meta(s, "name", "twitter:title", t["name"]); s = set_meta(s, "name", "twitter:description", desc)
        if og_url: s = set_meta(s, "property", "og:image", og_url); s = set_meta(s, "name", "twitter:image", og_url)
        s = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', s, count=1)
        s = s.replace('  <meta name="robots" content="noindex, follow">\n', "")
        # the hero photo starts loading with the page
        hero = re.search(r'srcset="((assets/img/hero/dest-[\w-]+)-960\.webp 960w, [^"]+)" sizes="100vw"><img src="(assets/img/hero/dest-[\w-]+-2400\.webp)"', t["pkg"])
        if hero:   # phones pick the 960 or 1280 copy by screen density, like the <source> does
            pre = (f'  <link rel="preload" as="image" href="{hero.group(3)}" media="(min-width: 701px)" fetchpriority="high">\n'
                   f'  <link rel="preload" as="image" href="{hero.group(2)}-1280.webp" imagesrcset="{hero.group(1)}" imagesizes="100vw" media="(max-width: 700px)" fetchpriority="high">\n')
            s = s.replace('  <link rel="preload" href="assets/fonts/', pre + '  <link rel="preload" href="assets/fonts/', 1)
        ld = t["ld"].replace("</", "<\\/")
        s = s.replace("</head>", f'  <script type="application/ld+json" data-ld="pkg">{ld}</script>\n</head>', 1)
        s = s.replace("<body data-page=\"tours\" data-hero-top", f"<body data-page=\"tours\" data-hero-top data-pkg=\"{t['id']}\"", 1)
        body = t["pkg"].replace('<div class="tour-grid" id="relatedGrid"></div>', f'<div class="tour-grid" id="relatedGrid">{t["related"]}</div>')
        s, n = re.subn(r'<div id="pkgPage" aria-live="polite">.*?\n    </div>\n  </main>', lambda m: f'<div id="pkgPage">{body}\n    </div>\n  </main>', s, count=1, flags=re.S)
        assert n == 1, "package.html: #pkgPage not found"
        s = s.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n<!-- Built by tools/build.py from package.html and this package's entry in assets/js/data.js. Edit those and rebuild; changes here are overwritten. -->\n", 1)
        print(f"  package-{t['id']}.html:", "updated" if write(f"package-{t['id']}.html", s) else "unchanged", f"(title {len(title)}, description {len(desc)})")

    # sitemap: the pages people land on, then every package
    today = date.today().isoformat()
    main = [("", "weekly", "1.0"), ("tours.html", "weekly", "0.9"), ("services.html", "monthly", "0.8"), ("about.html", "monthly", "0.6"), ("contact.html", "monthly", "0.8")]
    old = read("sitemap.xml") if os.path.exists("sitemap.xml") else ""
    def lastmod(loc, fresh):
        m = re.search(rf"<loc>{re.escape(loc)}</loc><lastmod>([\d-]+)</lastmod>", old)
        return today if fresh or not m else m.group(1)
    rows = [f"  <url><loc>{SITE}{p}</loc><lastmod>{lastmod(SITE + p, False)}</lastmod><changefreq>{f}</changefreq><priority>{pr}</priority></url>" for p, f, pr in main]
    rows += [f"  <url><loc>{SITE}package-{t['id']}.html</loc><lastmod>{lastmod(SITE + 'package-' + t['id'] + '.html', False)}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>" for t in pages]
    print("  sitemap.xml:", "updated" if write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(rows) + "\n</urlset>\n") else "unchanged")


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    if what in ("all", "assets"): print("assets"); build_assets()
    if what in ("all", "pages"): print("pages"); build_pages()
    if what == "all": print("assets (again, so the new pages carry the stamps)"); build_assets()
