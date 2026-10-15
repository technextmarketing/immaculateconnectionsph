#!/usr/bin/env python3
"""Build the Immaculate Connections site.

    python tools/build.py          # everything below (needs Google Chrome for the pages)
    python tools/build.py assets   # bundles only: this is what the deploy workflow runs
    python tools/build.py pages    # package pages, Tours grid and sitemap only

assets  Copies the shared header and footer (_partials/) into every page, minifies the
        stylesheets and scripts into bundles and stamps every page's ?v= with a hash of
        the bundle, so browsers pick up a change without anyone bumping a version by hand:
          assets/css/site.min.css       fonts.css + style.css + components.css (every page)
          assets/css/hero.min.css       hero.css (home)
          assets/css/quotation.min.css  quotation.css (contact, payment)
          assets/css/pages.min.css      pages.css (service pages, gallery, blog)
          assets/js/site.min.js         data.js + main.js + chat.js (every page)
          assets/js/pages.min.js        pages.js (service pages, gallery, blog)
        data.js keeps every package in full, but only a light card index of IC.tours goes into
        site.min.js. The rest of each package (itinerary, inclusions, hotels, notes...) is written
        to assets/data/pkg/<id>.json and inlined into its package page (#pkgData), and the day
        titles and inclusions of every package to assets/data/tours-more.json (Tours page rows,
        search and the Ticketing board). See split_tours().

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
SITE = "https://www.immaculateconnectionsph.com/"   # keep in step with CONFIG.siteUrl in main.js
BRAND = "Immaculate Connections"
# Search titles and descriptions per package, from the keyword map (each title targets one search,
# names the departure city (Manila), and is <= 35 chars so the brand suffix fits in 60).
# The page itself keeps the package's own name as its H1.
SEO_TITLES = {
    "danang-6d4n-bana-overnight": "Da Nang 6D4N with Ba Na Hills Stay",
    "danang-5d3n-bana-overnight": "Da Nang 5D3N with Ba Na Hills Stay",
    "danang-6d4n-charter": "Da Nang Charter 6D4N, Sea Garden",
    "danang-5d3n-charter": "Da Nang Charter 5D3N, Sea Garden",
    "rose-danang-6d4n": "Da Nang Charter 6D4N, Nagila Hotel",
    "rose-danang-5d3n": "Da Nang Charter 5D3N, Nagila Hotel",
    "danang-4d3n": "Da Nang 4D3N Tour from Manila",
    "danang-4d3n-z2": "Da Nang 4D3N Tour via AirAsia",
    "hanoi-sapa-4d3n": "Hanoi Sapa 4D3N Tour from Manila",
    "hanoi-sapa-halong-5d4n": "Hanoi Sapa Ha Long 5D4N Tour",
    "hanoi-sapa-halong-5d3n-charter": "Ha Long Hanoi Sapa 5D3N Charter",
    "hanoi-sapa-halong-5d3n-charter-classic": "Sapa Hanoi Ha Long 5D3N Charter",
    "hanoi-sapa-halong-6d4n-charter": "Hanoi Sapa Ha Long 6D4N Charter",
    "hanoi-sapa-halong-6d4n-charter-classic": "Sapa Hanoi Ha Long 6D4N Charter",
}
# Hand-written meta descriptions (<= 155 chars): price, length and departure first, never cut off.
SEO_DESCS = {
    "danang-6d4n-bana-overnight": "Da Nang 6D4N charter tour from Manila from ₱29,888 per pax: a night at Ba Na Hills, the Golden Bridge, Hoi An and city sights, VietJet Air charter.",
    "danang-5d3n-bana-overnight": "Da Nang 5D3N charter tour from Manila from ₱27,888 per pax with a night at Ba Na Hills, the Golden Bridge, Hoi An and city sights on a VietJet Air charter.",
    "danang-6d4n-charter": "Da Nang 6D4N charter flight tour from Manila from ₱24,888 per pax: four nights at Sea Garden Hotel or similar, Ba Na Hills, Hoi An and the city.",
    "danang-5d3n-charter": "Da Nang 5D3N charter flight tour from Manila from ₱22,888 per pax: three nights at Sea Garden Hotel or similar, Ba Na Hills, Hoi An and city tour.",
    "rose-danang-6d4n": "Da Nang 6D4N charter flight tour from Manila from ₱23,888 per pax: four nights at Nagila Hotel or similar, Ba Na Hills, Hoi An and city sights.",
    "rose-danang-5d3n": "Da Nang 5D3N charter flight tour from Manila from ₱22,888 per pax: three nights at Nagila Hotel or similar, Ba Na Hills, Hoi An and city sights.",
    "danang-4d3n": "Da Nang 4D3N tour from Manila on Cebu Pacific from ₱23,888 per pax: Han River Hotel or similar, Ba Na Hills, Hoi An and Da Nang city sights.",
    "danang-4d3n-z2": "Da Nang 4D3N tour from Manila on AirAsia from ₱26,888 per pax: Ba Na Hills, Hoi An, Son Tra, the Marble Mountains and My Khe Beach.",
    "hanoi-sapa-4d3n": "Hanoi and Sapa 4D3N tour from Manila on Cebu Pacific from ₱36,888 per pax: Fansipan by cable car, Sapa town and Hanoi’s Old Quarter, 4★ hotels.",
    "hanoi-sapa-halong-5d4n": "Hanoi, Sapa and Ha Long Bay 5D4N tour from Manila on Cebu Pacific from ₱33,888 per pax: Fansipan, the Old Quarter and a Ha Long Bay cruise.",
    "hanoi-sapa-halong-5d3n-charter": "Ha Long Bay, Hanoi and Sapa 5D3N charter tour from Manila from ₱32,888 per pax, no shopping stops: bay cruise, Old Quarter and Fansipan.",
    "hanoi-sapa-halong-5d3n-charter-classic": "Sapa, Hanoi and Ha Long Bay 5D3N charter tour from Manila from ₱28,888 per pax: Fansipan, Hanoi city tour and a Ha Long Bay cruise.",
    "hanoi-sapa-halong-6d4n-charter": "Hanoi, Sapa and Ha Long Bay 6D4N charter tour from Manila from ₱35,888 per pax, no shopping stops: Fansipan, the Old Quarter and a bay cruise.",
    "hanoi-sapa-halong-6d4n-charter-classic": "Sapa, Hanoi and Ha Long Bay 6D4N charter tour from Manila from ₱29,888 per pax: Fansipan, Cat Cat Village, Hanoi and two nights at Ha Long Bay.",
}


def read(p): return io.open(p, encoding="utf-8").read()


def write(p, s):
    if os.path.exists(p) and read(p) == s: return False
    io.open(p, "w", encoding="utf-8", newline="\n").write(s); return True


# ---------------------------------------------------------------- partials
# The header (with the Services menu and the phone drawer) and the footer are written once,
# in _partials/, and copied into every page between <!-- build:header --> / <!-- /build:header -->
# and <!-- build:footer --> / <!-- /build:footer --> markers. Edit the partials, not the pages.
PARTIALS = [("header", "_partials/header.html", r'  <header class="header" id="header">.*?\n(?=\n  <main)'),
            ("footer", "_partials/footer.html", r'  <footer class="footer">.*?\n(?=\n  <script src=)')]


def inject_partials():
    n = 0
    for p in sorted(glob.glob("*.html")):
        s = o = read(p)
        for key, src, first in PARTIALS:
            html = read(src).rstrip("\n")
            start, end = f"<!-- build:{key} -->", f"<!-- /build:{key} -->"
            if start in s:
                s = re.sub(re.escape(start) + r".*?" + re.escape(end), lambda m: f"{start}\n{html}\n  {end}", s, count=1, flags=re.S)
            else:   # first run on a page: wrap its own copy in markers
                m = re.search(first, s, re.S)
                if m: s = s[:m.start()] + f"  {start}\n{html}\n  {end}\n" + s[m.end():]
        if s != o: n += write(p, s)
    print(f"  partials: {n} page(s) updated")


# ---------------------------------------------------------------- assets
BUNDLES = [
    ("assets/css/site.min.css", ["assets/css/fonts.css", "assets/css/style.css", "assets/css/components.css", "assets/css/chat.css"]),
    ("assets/css/hero.min.css", ["assets/css/hero.css"]),
    ("assets/css/quotation.min.css", ["assets/css/quotation.css"]),
    ("assets/css/pages.min.css", ["assets/css/pages.css"]),
    ("assets/js/site.min.js", ["assets/js/data.js", "assets/js/main.js", "assets/js/chat.js"]),
    ("assets/js/pages.min.js", ["assets/js/pages.js"]),
]


# ---------------------------------------------------------------- package data
# IC.tours in data.js is one JSON array (written by ~/ClaudeWork/qa/uos/inject.py) with every package in full.
# The pages only need a card index up front: id, name, country, dates, price, places, posters... The fields
# below are only read by a package's own page, the chat (on request) and the quotation, so they leave the bundle.
HEAVY = ("subtitle", "gallery", "overview", "travelDatesNote", "itinerary", "inclusions", "exclusions", "hotelsLabel", "hotels", "optional", "notes")
DATE_KEYS = ("d", "y", "add", "cur")
PKG_DIR = "assets/data/pkg"


def tours_span(s):
    i = s.index("  IC.tours = [") + len("  IC.tours = ")
    return i, s.index("\n  ];\n", i) + 4


def load_tours():
    s = read("assets/js/data.js"); i, j = tours_span(s)
    return json.loads(s[i:j])


def inc_rules():
    # the inclusion tags (Airfare, Hotel, Meals...) are defined once, in main.js (INC_TAGS); the card index carries
    # each package's tags as bits in that order (incMask), so cards can show them without the inclusion list
    block = re.search(r"const INC_TAGS = \[(.*?)\n  \];", read("assets/js/main.js"), re.S).group(1)
    return [re.compile(rx, re.I) for rx in re.findall(r"\{ re: /(.+?)/i, label: '", block)]


def pkg_tag(pid):
    return '<script type="application/json" id="pkgData">' + read(f"{PKG_DIR}/{pid}.json").replace("</", "<\\/") + "</script>"


def split_tours():
    """Write the per-package files and return data.js with IC.tours reduced to the card index."""
    s = read("assets/js/data.js"); i, j = tours_span(s)
    T = json.loads(s[i:j])
    rules = inc_rules()
    os.makedirs(PKG_DIR, exist_ok=True)
    keys, rows, more, n = [], [], {}, 0
    for t in T:
        heavy = {k: t[k] for k in HEAVY if k in t}
        dates = t.get("travelDates")
        if dates and any(set(d) - set(DATE_KEYS) for d in dates): heavy["travelDates"] = dates   # anything beyond the dates themselves
        n += write(f"{PKG_DIR}/{t['id']}.json", json.dumps(heavy, ensure_ascii=False, separators=(",", ":")))
        inc = t.get("inclusions") or []
        hay = " · ".join(inc)
        light = {k: v for k, v in t.items() if k not in HEAVY}
        if dates is not None:   # [d, y, add, cur], trailing blanks dropped
            light["travelDates"] = [[d.get(k) or (0 if k in ("y", "add") else "") for k in DATE_KEYS] for d in dates]
            for d in light["travelDates"]:
                while len(d) > 1 and not d[-1]: d.pop()
        light["incMask"] = 0 if re.search(r"provided on request|coming soon", hay, re.I) else sum(1 << b for b, rx in enumerate(rules) if rx.search(hay))
        for k in light:
            if k not in keys: keys.append(k)
        rows.append(light)
        more[t["id"]] = {"it": [[d.get("day", ""), d.get("title", "")] for d in t.get("itinerary") or []], "inc": inc}
    for f in glob.glob(f"{PKG_DIR}/*.json"):
        if os.path.basename(f)[:-5] not in more: os.remove(f); print("  removed", f)
    write("assets/data/tours-more.json", json.dumps(more, ensure_ascii=False, separators=(",", ":")))
    # packed: one row of values per package under one list of keys; places, which many packages share, by number
    names = list(dict.fromkeys(p for r in rows for p in r.get("places") or []))
    at = {p: n for n, p in enumerate(names)}
    for r in rows:
        if r.get("places") is not None: r["places"] = [at[p] for p in r["places"]]
    packed = json.dumps([[r.get(k) for k in keys] for r in rows], ensure_ascii=False, separators=(",", ":"))
    unpack = ("((K, P, R) => R.map(r => { const t = {}; K.forEach((k, i) => { if (r[i] !== null) t[k] = r[i]; });"
              " if (t.places) t.places = t.places.map(n => P[n]);"
              " if (t.travelDates) t.travelDates = t.travelDates.map(d => { const o = { d: d[0] }; if (d[1]) o.y = d[1]; if (d[2]) o.add = d[2]; if (d[3]) o.cur = d[3]; return o; });"
              " return t; }))(" + json.dumps(keys) + ", " + json.dumps(names, ensure_ascii=False, separators=(",", ":")) + ", " + packed + ")")
    # pre-built package pages carry their own details, so they render in full without a request
    m = 0
    for t in T:
        f = f"package-{t['id']}.html"
        if not os.path.exists(f): continue
        page = read(f)
        tag = pkg_tag(t["id"])
        page2, k = re.subn(r'<script type="application/json" id="pkgData">.*?</script>', lambda _: tag, page, count=1, flags=re.S)
        if not k: page2 = page.replace("</head>", f"  {tag}\n</head>", 1)
        m += write(f, page2)
    print(f"  package data: {len(T)} packages, {n} detail file(s) and {m} page(s) updated")
    return s[:i] + unpack + s[j:]


def build_assets():
    inject_partials()
    import seo; seo.legacy_redirects(); seo.faq_ld(); seo.robots(); seo.icons()
    import rcssmin
    sys.path.insert(0, os.path.join(ROOT, 'tools'))
    from jsmin_safe import minify as jsmin
    stamps = {}
    tours_js = split_tours()
    for out, srcs in BUNDLES:
        parts = [tours_js if s == "assets/js/data.js" else read(s) for s in srcs]
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
        full = json.loads(b.eval("""JSON.stringify(IC.tours.map(t => ({ id: t.id, name: t.name, country: t.country, region: t.region, regionLabel: (IC.regions[t.region] || {}).label || t.region,
          duration: t.duration, days: t.days, departure: t.departure, price: t.price, status: t.status, summary: t.summary, ends: t.ends,
          year: t.year || null,
          dates: (t.travelDates || []).map(d => ({ d: d.d, y: d.y || null, add: d.add || 0, cur: d.cur || '' })) })))"""))
    finally:
        b.close(); srv.shutdown()
    F = {t["id"]: t for t in load_tours()}   # the page script only has the card index; the lists come from data.js
    for t in full: t["inclusions"] = F[t["id"]].get("inclusions") or []; t["exclusions"] = F[t["id"]].get("exclusions") or []

    # tours.html
    s = read("tours.html")
    s = put_between(put_between(put_between(s, "toursGrid", tours_parts["grid"]), "regionTabs", tours_parts["tabs"]), "resultsCount", tours_parts["count"])
    print("  tours.html:", "updated" if write("tours.html", s) else "unchanged")

    # one page per package, from the package.html template
    tpl = read("package.html")
    for f in glob.glob("package-*.html"):
        if f[8:-5] not in ids and "Written by tools/seo.py (LEGACY)" not in read(f): os.remove(f); print("  removed", f)   # retired packages keep a forwarder
    for t in pages:
        url = f"{SITE}package-{t['id']}"   # clean URL; Pages serves package-<id>.html
        name = SEO_TITLES.get(t["id"], t["name"])
        title = f"{name} | {BRAND}" if len(name) + len(BRAND) + 3 <= 62 else name
        desc = SEO_DESCS.get(t["id"]) or trim(t["summary"])
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
        hero = re.search(r'srcset="((assets/img/hero/dest-[\w-]+)-m\.webp 810w)" sizes="100vw"><img src="(assets/img/hero/dest-[\w-]+-2400\.webp)"', t["pkg"])
        if hero:   # phones get the portrait crop (-m), like the <source> does
            pre = (f'  <link rel="preload" as="image" href="{hero.group(3)}" media="(min-width: 701px)" fetchpriority="high">\n'
                   f'  <link rel="preload" as="image" href="{hero.group(2)}-m.webp" imagesrcset="{hero.group(1)}" imagesizes="100vw" media="(max-width: 700px)" fetchpriority="high">\n')
            s = s.replace('  <link rel="preload" href="assets/fonts/', pre + '  <link rel="preload" href="assets/fonts/', 1)
        ld = t["ld"].replace("</", "<\\/")
        crumbs = json.dumps({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE},
            {"@type": "ListItem", "position": 2, "name": "Tours", "item": SITE + "tours"},
            {"@type": "ListItem", "position": 3, "name": t["name"], "item": url}]}, ensure_ascii=False).replace("</", "<\\/")
        s = s.replace("</head>", f'  <script type="application/ld+json" data-ld="pkg">{ld}</script>\n  <script type="application/ld+json">{crumbs}</script>\n</head>', 1)
        s = s.replace("</head>", f"  {pkg_tag(t['id'])}\n</head>", 1)   # this package's details, for the page script (see split_tours)
        s = s.replace("<body data-page=\"tours\" data-hero-top", f"<body data-page=\"tours\" data-hero-top data-pkg=\"{t['id']}\"", 1)
        body = t["pkg"].replace('<div class="tour-grid" id="relatedGrid"></div>', f'<div class="tour-grid" id="relatedGrid">{t["related"]}</div>')
        s, n = re.subn(r'<div id="pkgPage" aria-live="polite">.*?\n    </div>\n  </main>', lambda m: f'<div id="pkgPage">{body}\n    </div>\n  </main>', s, count=1, flags=re.S)
        assert n == 1, "package.html: #pkgPage not found"
        s = s.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n<!-- Built by tools/build.py from package.html and this package's entry in assets/js/data.js. Edit those and rebuild; changes here are overwritten. -->\n", 1)
        print(f"  package-{t['id']}.html:", "updated" if write(f"package-{t['id']}.html", s) else "unchanged", f"(title {len(title)}, description {len(desc)})")

    # sitemap: the pages people land on, then every package
    today = date.today().isoformat()
    main = [("", "weekly", "1.0"), ("tours.html", "weekly", "0.9"), ("services.html", "monthly", "0.8"), ("car-rental.html", "monthly", "0.8"), ("hotel-booking.html", "monthly", "0.8"),
            ("ticketing.html", "monthly", "0.8"), ("mice.html", "monthly", "0.8"), ("gallery.html", "monthly", "0.7"), ("blog.html", "weekly", "0.7"), ("about.html", "monthly", "0.6"), ("contact.html", "monthly", "0.8")]
    main += [(os.path.basename(p), "monthly", "0.6") for p in sorted(glob.glob("blog-*.html"))]
    main = [m for m in main if not m[0] or os.path.exists(m[0])]   # only pages that exist
    def lastmod(page):
        # the day the page last changed: today while it has uncommitted edits, else its last commit
        # (Google only trusts lastmod that tracks real changes; it ignores changefreq and priority)
        def git(*a): return subprocess.run(["git", *a], capture_output=True, text=True).stdout.strip()
        if not page or git("status", "--porcelain", "--", page): return today
        return git("log", "-1", "--format=%cs", "--", page) or today
    rows = [f"  <url><loc>{SITE}{p[:-5]}</loc><lastmod>{lastmod(p or 'index.html')}</lastmod></url>" for p, f, pr in main]
    rows += [f"  <url><loc>{SITE}package-{t['id']}</loc><lastmod>{lastmod('package-' + t['id'] + '.html')}</lastmod></url>" for t in pages]
    print("  sitemap.xml:", "updated" if write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(rows) + "\n</urlset>\n") else "unchanged")

    # search and AI-search files from the same package data
    import seo
    files = {t["id"]: t["imageFile"] for t in pages}
    for t in full: t["imageFile"] = files.get(t["id"], "")
    seo.agency_ld(full); seo.tours_faq(full); seo.ai_files(full); seo.sitemap_media(full)


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    if what in ("all", "assets"): print("assets"); build_assets()
    if what in ("all", "pages"): print("pages"); build_pages()
    if what == "all": print("assets (again, so the new pages carry the stamps)"); build_assets()
