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


def icons():
    """One square icon set on every page: favicon.ico (16/32/48, also what Google fetches for the
    search result), a 192 px PNG and the iOS home-screen icon. Made from the logo mark."""
    tags = ('<link rel="icon" href="favicon.ico" sizes="48x48">\n  <link rel="icon" href="assets/img/favicon-192.png" type="image/png" sizes="192x192">\n'
            '  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">')
    n = 0
    for p in sorted(glob.glob("*.html")):
        s = read(p)
        s2 = re.sub(r'<link rel="icon"[^>]*>(?:\n  <link rel="(?:icon|apple-touch-icon)"[^>]*>)*', lambda m: tags, s, count=1)
        n += write(p, s2)
    print(f"  icons: {n} page(s) updated")


# Addresses of the old Wix site. GitHub Pages cannot send a server redirect, so each one is a
# tiny page with an instant meta refresh and a canonical to the new page; Google treats that as
# a permanent redirect and passes the old page's standing on. Never delete one: they are indexed
# and linked from Facebook posts. Kept out of the sitemap.
LEGACY = {
    "home": "", "tours-1": "tours", "local-tours": "tours", "local-tour": "tours", "international-tour": "tours",
    "international-tours": "tours", "vietnam": "tours?country=vietnam", "services-1": "services", "services-5": "tours",
    "inquiries": "contact", "inquiry": "contact", "contact-us": "contact", "about-us": "about", "about-1": "about",
    # packages replaced on 15 Oct 2026 by the Vietnam programmes; their old pages forward to the Tours list,
    # which then says the tour is no longer listed (main.js, initToursPage)
    "package-danang-6d4n": "tours?retired=1",
    "package-danang-5d3n": "tours?retired=1",
    "package-japan-tokyo-fuji-5d4n": "tours?retired=1",
    "package-bohol-breezes": "tours?retired=1",
    "package-camotes-discover": "tours?retired=1",
    "package-camotes-tudela": "tours?retired=1",
    "package-cebu-highlands": "tours?retired=1",
    "package-queen-city": "tours?retired=1",
    "package-twin-city": "tours?retired=1",
    "package-boracay-bliss": "tours?retired=1",
    "package-el-nido": "tours?retired=1",
    "package-coron": "tours?retired=1",
}


def legacy_redirects():
    n = 0
    for old, new in LEGACY.items():
        url = SITE + new
        canon = SITE + new.split("?")[0]
        s = (f'<!DOCTYPE html>\n<!-- Old address, forwarded. Written by tools/seo.py (LEGACY). -->\n<html lang="en">\n<head>\n'
             f'  <meta charset="utf-8">\n  <title>Moved | {NAME}</title>\n  <link rel="canonical" href="{canon}">\n'
             f'  <meta http-equiv="refresh" content="0; url={html.escape(url)}">\n</head>\n<body>\n'
             f'  <p>This page has moved to <a href="{html.escape(url)}">{html.escape(url)}</a>.</p>\n</body>\n</html>\n')
        n += write(f"{old}.html", s)
    print(f"  old Wix addresses: {len(LEGACY)} forwarders, {n} written")


# ------------------------------------------------------------------ pages step
def money(p):
    if not p: return ""
    cur = (p.get("currency") or "PHP").upper()
    sym = {"PHP": "₱", "USD": "US$"}.get(cur, cur + " ")
    return f"{p.get('label') or 'From'} {sym}{int(p['from']):,} {p.get('unit') or ''}".strip()


MONTHS = {m: i + 1 for i, m in enumerate("jan feb mar apr may jun jul aug sep oct nov dec".split())}


def date_start(d, year):
    """First day of a travel date like "Aug 2–6" or "Aug 28–Sep 1", in the date's own year (else the tour's)."""
    m = re.match(r"([A-Za-z]{3})[a-z]*\.?\s*(\d{1,2})", str(d.get("d", "")))
    y = d.get("y") or year
    if not m or not y or m.group(1).lower() not in MONTHS: return None
    try: return date(int(y), MONTHS[m.group(1).lower()], int(m.group(2)))
    except ValueError: return None


def open_dates(t):
    """Travel dates still to come. A departure closes on its travel day, the same rule as main.js."""
    today = date.today()
    return [d for d in t.get("dates") or [] if (lambda s: s is None or s > today)(date_start(d, t.get("year")))]


def date_text(d, t):
    """ "Dec 19–23 2026 (+₱1,000 per pax)": the year, and the peak-date surcharge in the currency the package page shows."""
    y = d.get("y") or t.get("year")
    add = f" (+{'US$' if d.get('cur') == 'USD' else '₱'}{int(d['add']):,} per pax)" if d.get("add") else ""
    return f"{d['d']}{' ' + str(y) if y else ''}{add}"


def live(tours):
    today = date.today().isoformat()
    return [t for t in tours if t.get("status") != "past" and not (t.get("ends") and t["ends"] < today)
            and not (t.get("dates") and not open_dates(t))]


def agency_ld(tours):
    s = read("index.html")
    m = re.search(r'<script type="application/ld\+json">\s*(\{"@context":"https://schema.org","@type":"TravelAgency".*?\})\s*</script>', s, re.S)
    if not m: print("  index.html: TravelAgency data not found"); return
    d = json.loads(m.group(1))
    d.update({"@id": SITE + "#agency", "alternateName": "Immaculate Connections",
              "description": "Cebu City travel agency for groups and families: tour packages, flight and ferry tickets, hotels, vans, coasters and buses with driver, and seminars and events, booked by one team, with Vietnam, China and Japan tours from Manila and Cebu.",
              "contactPoint": [{"@type": "ContactPoint", "telephone": "+63 917 319 8540", "contactType": "customer service", "areaServed": "PH"},
                               {"@type": "ContactPoint", "telephone": "+63 32 238 3343", "contactType": "reservations", "areaServed": "PH"}],
              "areaServed": [{"@type": "City", "name": "Cebu City"}, {"@type": "AdministrativeArea", "name": "Cebu"}, {"@type": "Country", "name": "Philippines"}],
              "knowsAbout": ["Tour packages", "Vietnam tours", "Da Nang tours", "Hanoi tours", "Sapa tours", "Ha Long Bay tours", "China tours", "Japan tours", "Tokyo tours", "Osaka tours", "Shanghai tours", "Beijing tours", "Zhangjiajie tours", "Custom Cebu and Bohol trips", "Flight ticketing", "Ferry tickets", "Hotel booking", "Van and bus rental with driver", "MICE", "Seminars and events"],
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
         f"We currently offer {len(L)} packages: {sum(t.get('country') == 'Vietnam' for t in L)} Vietnam tours from Manila and Cebu (Da Nang, Hanoi, Sapa and Ha Long Bay) {sum(t.get('country') == 'China' for t in L)} China tours from Manila and Cebu (Shanghai, Beijing, Zhangjiajie, Chongqing, Chengdu, Xi’an, Yunnan, Harbin, Xinjiang, Tibet and more) and {sum(t.get('country') == 'Japan' for t in L)} Japan tours from Manila and Cebu (Tokyo, Mt. Fuji, Osaka, Kyoto, Hokkaido). Every package page lists the itinerary, inclusions, exclusions and travel dates, and we also build custom itineraries for families, companies and groups."),
        ("How much do the tour packages cost?",
         (f"Rates start {money(dict(min((t for t in priced), key=lambda t: t['price']['from'])['price'], label='from'))} and differ by departure date; each package page shows the base rate and the amount added on dearer dates. " if priced else "")
         + "Custom trips are quoted on request, and every quotation is free."),
        ("Where do the tours depart from?",
         (f"International packages depart from {' or '.join(deps)}. " if deps else "")
         + "Custom trips around Cebu pick up from Cebu City or Mactan hotels."),
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
    for key, n in (("packages", len(L)), ("packages-local", len(local)), ("packages-abroad", len(intl)),
                   ("packages-danang", sum("Da Nang" in t["name"] for t in L)), ("packages-vietnam", sum(t.get("country") == "Vietnam" for t in L)), ("packages-china", sum(t.get("country") == "China" for t in L)), ("packages-japan", sum(t.get("country") == "Japan" for t in L)), ("packages-hanoi", sum(any(w in t["name"] for w in ("Hanoi", "Sapa", "Ha Long")) for t in L))):
        s = re.sub(rf'(<strong data-stat="{key}">)\d+(</strong>)', lambda m: f"{m.group(1)}{n}{m.group(2)}", s)
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
    llms = [f"# {NAME}", "", "> Travel agency in Cebu City, Philippines, for groups and families. Local and international tour packages, flight and ferry ticketing, hotel bookings, vans, coasters and buses with driver, and seminars, events and MICE, booked by one team. Quotations are free.", "",
            "Departures: the Vietnam, China and Japan packages fly from Manila (NAIA) or Cebu (Mactan-Cebu International); each package page names its departure city. Custom trips around Cebu, Bohol and Camotes are arranged on request.", "",
            "Contact: +63 917 319 8540 (mobile), (032) 238 3343 (landline), immaculateconnectionsph@gmail.com, Facebook: https://www.facebook.com/ImmaculateConnections.ph, Messenger: https://m.me/ImmaculateConnections.ph",
            "Office: Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street, Cebu City, Cebu, Philippines 6000", "", "## Pages", ""]
    LABEL = {"": "Home", "mice": "MICE and events"}
    llms += [f"- [{LABEL.get(p, p.replace('-', ' ').title())}]({SITE}{p}): {d}" for p, d in pages]
    llms += ["", "## Tour packages", ""]
    for t in L:
        bits = [t.get("duration"), f"departs {t['departure']}" if t.get("departure") else None, money(t.get("price")) or "price on request"]
        llms.append(f"- [{t['name']}]({SITE}package-{t['id']}): {'; '.join(b for b in bits if b)}. {t.get('summary', '')}")
    llms += ["", "## More", "", f"- [Packages, prices and dates in one file]({SITE}packages.md)", f"- [Sitemap]({SITE}sitemap.xml)", ""]
    pk = [f"# Tour packages and prices: {NAME}", "", f"Updated {today}. Prices are per person unless stated. Only travel dates still to come are listed; a peak date shows its surcharge per pax in brackets. Confirm availability and the final quotation with the agency (free).", ""]
    for t in L:
        pk += [f"## {t['name']}", "", f"- Page: {SITE}package-{t['id']}", f"- Destination: {t.get('country', '')} ({t.get('regionLabel', '')})"]
        if t.get("duration"): pk.append(f"- Duration: {t['duration']}")
        if t.get("departure"): pk.append(f"- Departs: {t['departure']}")
        pk.append(f"- Price: {money(t.get('price')) or 'on request (free quotation)'}")
        up = open_dates(t)
        if up: pk.append(f"- Travel dates: {', '.join(date_text(d, t) for d in up[:40])}{' …' if len(up) > 40 else ''}")
        if t.get("inclusions"): pk.append("- Includes: " + "; ".join(t["inclusions"]))
        if t.get("exclusions"): pk.append("- Excludes: " + "; ".join(t["exclusions"]))
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
