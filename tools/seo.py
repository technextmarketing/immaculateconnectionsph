"""Search and AI-search files for the Immaculate Connections site, called by tools/build.py.

assets step (no browser needed, also runs in the deploy workflow):
  faq_ld()        FAQPage structured data for every page with a .faq block, built from the
                  visible questions so the two never disagree
  robots()        robots.txt: everything open except the private pages; AI search crawlers named
pages step (needs the package data that build.py reads in Chrome):
  agency_ld(t)    the home page's TravelAgency data, with the current packages as its catalogue
  tours_faq(t)    the Tours page FAQ: packages, prices, departures and day tours, from the data
  ai_files(t)     llms.txt and packages.md for AI assistants
  sitemap_media(t) image entries for the packages and video entries for the gallery
"""
import glob, html, io, json, re
from datetime import date

SITE = "https://www.immaculateconnectionsph.com/"
NAME = "Immaculate Connections Travel Agency"
MEDIA = "assets/img/media/"


def read(p): return io.open(p, encoding="utf-8").read()
def write(p, s):
    old = read(p) if glob.glob(p) else None
    if old == s: return False
    io.open(p, "w", encoding="utf-8", newline="").write(s); return True
def text(fragment): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()
def ld_tag(key, data): return f'<script type="application/ld+json" data-ld="{key}">{json.dumps(data, ensure_ascii=False)}</script>'
def put_ld(s, key, data):
    tag = ld_tag(key, data)
    s, n = re.subn(rf'<script type="application/ld\+json" data-ld="{key}">.*?</script>', lambda m: tag, s, count=1, flags=re.S)
    return s if n else s.replace("</head>", f"  {tag}\n</head>", 1)


# ------------------------------------------------------------------ assets step
def faq_ld():
    n = 0
    for p in sorted(glob.glob("*.html")):
        s = read(p)
        block = re.search(r'<div class="faq\b[^"]*"[^>]*>(.*?)\n\s*</div>\n', s, re.S)
        qa = re.findall(r"<summary[^>]*>(.*?)<span class=\"plus\".*?</summary>\s*<div class=\"faq-body\">(.*?)</div>", block.group(1), re.S) if block else []
        if not qa: continue
        data = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": text(q), "acceptedAnswer": {"@type": "Answer", "text": text(a)}} for q, a in qa]}
        n += write(p, put_ld(s, "faq", data))
    print(f"  FAQ data: {n} page(s) updated")


def robots():
    bots = ["Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "anthropic-ai", "Applebot-Extended"]
    s = "# Immaculate Connections Travel Agency, Cebu City\n# Search engines and AI assistants are welcome; only the private pages are closed.\n\nUser-agent: *\nAllow: /\nDisallow: /payment\nDisallow: /team\n\n"
    s += "".join(f"User-agent: {b}\n" for b in bots) + "Allow: /\nDisallow: /payment\nDisallow: /team\n\n"
    s += f"Sitemap: {SITE}sitemap.xml\n# Summary for AI assistants: {SITE}llms.txt\n"
    print("  robots.txt:", "updated" if write("robots.txt", s) else "unchanged")


# ------------------------------------------------------------------ pages step
def money(p):
    if not p: return ""
    cur = (p.get("currency") or "PHP").upper()
    sym = {"PHP": "₱", "USD": "US$"}.get(cur, cur + " ")
    return f"{p.get('label') or 'From'} {sym}{int(p['from']):,} {p.get('unit') or ''}".strip()


def live(tours):
    today = date.today().isoformat()
    return [t for t in tours if t.get("status") != "past" and not (t.get("ends") and t["ends"] < today)]


def agency_ld(tours):
    s = read("index.html")
    m = re.search(r'<script type="application/ld\+json">\s*(\{"@context":"https://schema.org","@type":"TravelAgency".*?\})\s*</script>', s, re.S)
    if not m: print("  index.html: TravelAgency data not found"); return
    d = json.loads(m.group(1))
    d.update({"@id": SITE + "#agency", "description": "Cebu City travel agency: local and international tour packages, flight and ferry ticketing, hotel bookings, vehicle hire with driver, and seminars, events and MICE.",
              "areaServed": [{"@type": "City", "name": "Cebu City"}, {"@type": "AdministrativeArea", "name": "Cebu"}, {"@type": "Country", "name": "Philippines"}],
              "knowsAbout": ["Tour packages", "Bohol tours", "Cebu city tours", "Camotes Islands", "Vietnam tours", "Japan tours", "Flight ticketing", "Ferry tickets", "Hotel booking", "Van and bus rental with driver", "MICE", "Seminars and events"],
              "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Tour packages", "itemListElement": [
                  dict({"@type": "Offer", "itemOffered": {"@type": "TouristTrip", "name": t["name"], "url": SITE + "package-" + t["id"]}},
                       **({"price": t["price"]["from"], "priceCurrency": (t["price"].get("currency") or "PHP").upper()} if t.get("price") else {})) for t in live(tours)]}})
    site = {"@context": "https://schema.org", "@type": "WebSite", "@id": SITE + "#website", "name": "Immaculate Connections", "alternateName": NAME, "url": SITE, "inLanguage": "en", "publisher": {"@id": SITE + "#agency"}}
    tag = '<script type="application/ld+json">\n  ' + json.dumps(d, ensure_ascii=False, separators=(",", ":")) + "\n  </script>"
    s = s[:m.start()] + tag + s[m.end():]
    s = put_ld(s, "website", site)
    print("  index.html agency data:", "updated" if write("index.html", s) else "unchanged")


FAQ_ITEM = '          <details><summary>{q}<span class="plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span></summary><div class="faq-body">{a}</div></details>'


def tours_faq(tours):
    L = live(tours)
    E = html.escape
    local = [t for t in L if t.get("region") != "intl"]; intl = [t for t in L if t.get("region") == "intl"]
    names = lambda ts: ", ".join(t["name"] for t in ts[:-1]) + (" and " if len(ts) > 1 else "") + (ts[-1]["name"] if ts else "")
    priced = [t for t in L if t.get("price")]
    day = [t for t in local if t.get("days") == 1]
    deps = sorted({t["departure"] for t in intl if t.get("departure")})
    qa = [
        ("What tour packages does Immaculate Connections offer?",
         f"We currently offer {len(L)} packages. In the Philippines: {names(local)}. Abroad: {names(intl)}. Every package page lists the itinerary, inclusions, exclusions and travel dates, and we also build custom itineraries for families, companies and groups."),
        ("How much do the tour packages cost?",
         ("Published rates: " + "; ".join(f"{t['name']}, {money(t['price'])}" for t in priced) + ". " if priced else "")
         + "Peak travel dates carry the surcharge shown beside each date on the package page. Local tours are quoted on request, and every quotation is free."),
        ("Where do the tours depart from?",
         (f"International packages depart from {' or '.join(deps)}. " if deps else "")
         + "Cebu tours pick up from Cebu City or Mactan hotels, and the Bohol and Camotes packages include two-way boat tickets from Cebu."),
        ("Do you offer day tours from Cebu?",
         f"Yes. Our day tours are {names(day)}. Each package page lists the stops and inclusions; send an inquiry with your date and group size for a quotation." if day else
         "Yes. Send an inquiry with your date and group size and we will quote a day tour around Cebu."),
        ("How do I book a tour package?",
         "Open the package page and click “Request a quote”, or use the inquiry form and choose your package. We confirm availability for your dates and send a quotation with the payment details. Your booking is confirmed once payment is received."),
    ]
    body = "\n".join(FAQ_ITEM.format(q=E(q), a=E(a)) for q, a in qa)
    sec = f'''<!-- build:faq (written by tools/build.py pages from the package data) -->
    <section class="section bg-white" aria-labelledby="tours-faq-h">
      <div class="container">
        <div class="section-head center reveal">
          <span class="eyebrow center">Good to know</span>
          <h2 class="h2" id="tours-faq-h">Tour package questions, answered</h2>
        </div>
        <div class="faq reveal">
{body}
        </div>
      </div>
    </section>
    <!-- /build:faq -->'''
    s = read("tours.html")
    if "<!-- build:faq" in s:
        s = re.sub(r"<!-- build:faq.*?<!-- /build:faq -->", lambda m: sec, s, count=1, flags=re.S)
    else:   # first run: before the closing call-to-action band
        i = s.rindex('    <section class="section-tight">')
        s = s[:i] + "    " + sec + "\n\n" + s[i:]
    print("  tours.html FAQ:", "updated" if write("tours.html", s) else "unchanged")


def ai_files(tours):
    L = live(tours); today = date.today().isoformat()
    pages = [("", "Services, special offers and featured packages"), ("tours", "All tour packages with filters"), ("services", "Ticketing, hotels, transport and events"),
             ("car-rental", "Vans, coasters, buses and cars with driver in Cebu"), ("hotel-booking", "Hotel and resort bookings"), ("ticketing", "Flight and ferry tickets, group bookings"),
             ("mice", "Seminars, conventions and corporate events"), ("gallery", "Photos and videos from our group tours"), ("about", "About the agency and team"), ("contact", "Free quotation and inquiry form")]
    llms = [f"# {NAME}", "", "> Travel agency in Cebu City, Philippines. Local and international tour packages, flight and ferry ticketing, hotel bookings, vehicle hire with driver, and seminars, events and MICE. Quotations are free.", "",
            "Contact: +63 917 319 8540 (mobile), (032) 238 3343 (landline), immaculateconnectionsph@gmail.com, Facebook Messenger: https://www.facebook.com/ImmaculateConnections.ph",
            "Office: Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street, Cebu City 6000, Philippines", "", "## Pages", ""]
    LABEL = {"": "Home", "mice": "MICE and events"}
    llms += [f"- [{LABEL.get(p, p.replace('-', ' ').title())}]({SITE}{p}): {d}" for p, d in pages]
    llms += ["", "## Tour packages", ""]
    for t in L:
        bits = [t.get("duration"), f"departs {t['departure']}" if t.get("departure") else None, money(t.get("price")) or "price on request"]
        llms.append(f"- [{t['name']}]({SITE}package-{t['id']}): {'; '.join(b for b in bits if b)}. {t.get('summary', '')}")
    llms += ["", "## More", "", f"- [Packages, prices and dates in one file]({SITE}packages.md)", f"- [Sitemap]({SITE}sitemap.xml)", ""]
    pk = [f"# Tour packages and prices: {NAME}", "", f"Updated {today}. Prices are per person unless stated; peak dates carry the surcharge shown. Confirm availability and the final quotation with the agency (free).", ""]
    for t in L:
        pk += [f"## {t['name']}", "", f"- Page: {SITE}package-{t['id']}", f"- Destination: {t.get('country', '')} ({t.get('regionLabel', '')})"]
        if t.get("duration"): pk.append(f"- Duration: {t['duration']}")
        if t.get("departure"): pk.append(f"- Departs: {t['departure']}")
        pk.append(f"- Price: {money(t.get('price')) or 'on request (free quotation)'}")
        if t.get("dates"): pk.append(f"- Travel dates: {', '.join(t['dates'][:40])}{' …' if len(t['dates']) > 40 else ''}")
        if t.get("inclusions"): pk.append("- Includes: " + "; ".join(t["inclusions"]))
        if t.get("summary"): pk.append(f"- Summary: {t['summary']}")
        pk.append("")
    print("  llms.txt:", "updated" if write("llms.txt", "\n".join(llms)) else "unchanged", "| packages.md:", "updated" if write("packages.md", "\n".join(pk)) else "unchanged")


def add_to_url(s, loc, extra):   # media goes last in its <url>, so build.py still finds <loc><lastmod> together
    return re.sub(rf"(<loc>{re.escape(loc)}</loc>.*?)</url>", lambda m: m.group(1) + extra + "</url>", s, count=1, flags=re.S)


def sitemap_media(tours):
    s = read("sitemap.xml")
    s = re.sub(r"\s*<(image|video):\w+>.*?</\1:\w+>", "", s, flags=re.S)   # rebuilt every time
    s = s.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">', 1)
    E = html.escape
    for t in tours:
        if not t.get("imageFile"): continue
        loc = f"{SITE}package-{t['id']}"
        s = add_to_url(s, loc, f"<image:image><image:loc>{SITE}{MEDIA}{t['imageFile']}</image:loc></image:image>")
    g = read("gallery.html") if glob.glob("gallery.html") else ""
    vids = re.findall(r'data-video="([^"]+)" data-poster="([^"]+)" data-title="([^"]+)"', g)
    if vids:
        v = "".join(f"<video:video><video:thumbnail_loc>{SITE}{p}</video:thumbnail_loc><video:title>{t}</video:title><video:description>{t}, Immaculate Connections Travel Agency</video:description><video:content_loc>{SITE}{u}</video:content_loc></video:video>" for u, p, t in vids)
        s = add_to_url(s, SITE + "gallery", v)
    print("  sitemap.xml media:", "updated" if write("sitemap.xml", s) else "unchanged")
