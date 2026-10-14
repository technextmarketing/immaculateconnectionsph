# SEO keyword map: immaculateconnectionsph.com

**Status 14 Oct 2026:** sections 3a (static pages: title, description, H1, answer-first intro) and 3b (package `SEO_TITLES` + `SEO_DESCS` in `tools/build.py`) are APPLIED and live, plus 5c items 1-4 (agency `contactPoint` + landline, one `#agency` entity on the service pages, Cebu `areaServed`, AboutPage/ContactPage). Old Wix URLs forward via `tools/seo.py` `LEGACY`. Sitemap submitted in Search Console.
**Still open:** the 5 new pages in section 4, the Google Business Profile (section 5b), and every row marked **[AGENCY]** (24/7, licensed guides, DOT, "all-in", hours, official email, "Tour Services" logo subtitle).
This file is not deployed (the workflow publishes only the public site).

---
Date: 2026-10-14. Repo `C:\Users\leuss\ClaudeWork\immaculateconnectionsph` at `27d95e8`. This audit is read-only: no repo file was changed.
Scripts: `C:\Users\leuss\ClaudeWork\qa\ic-seo\meta.py` (title/meta/H1/H2 per page), `txt.py` (visible text), `lencheck.py` (checks the lengths in section 3).
I did not repeat items from `qa\audit\content-audit.md` or `qa\design\design-audit.md`. Where one of their open items affects keywords, I give its ID, e.g. (content H7).

Rule followed: every fact proposed for copy below is taken from the repo. Five things stay out of the copy until the agency answers them:
- DOT accreditation and licensed guides
- 24/7 support
- the official email
- privacy and terms
- "all-in" pricing

Rows that depend on them are marked **[AGENCY]**.

---

## 0. What ranks today (12 searches, 14 Oct 2026)

| Query | What ranks | What it means for us |
|---|---|---|
| travel agency cebu tour packages | Thin, low-quality pages: a Yola site and copies of one scraped "List of travel agencies in Cebu" PDF on unrelated domains | There is almost no strong local agency page. A clean, specific site can win this query. |
| van rental cebu with driver rates | Klook "Cebu Car Rental with Driver", a Grab Rent news story (SunStar), a Carrd page from a small operator that **publishes rates**, an old PHIVOLCS tender | Searchers want **rates and what the price includes** (overtime, extra stops, tolls). Our page says only "quoted on request". |
| coaster rental cebu | One booking-engine page (24-seat coaster priced by 3/6/9 hours), then roller-coaster pages | The query has weak commercial competition. A dedicated coaster section with capacity and use cases is enough to rank. |
| bohol day tour package from cebu | OTAs only: AAA/Viator, Expedia, Travelocity, Klook, Trip.com, bohol-philippines.com, blogs | We would be the only local agency result. OTA listings win on itinerary, timing (4:30 am start, 12–14 h day) and what is included. Our package has the stops but no timings. |
| camotes island tour package from cebu | Blogs only (Lakwatsero, Sygic, Wikivoyage, SunStar); "no ready-made package found" | **This is the best quick win.** We have two real Camotes packages and no agency competes for the query. |
| da nang tour package from cebu 2026 | Da Nang tourism-board news about a promotion held in Cebu (27 Jan 2026), a land-only operator, flight pages | No Cebu agency package ranks. Our Da Nang tours fly **from Manila**, so target "da nang tour package philippines / from manila" and say it plainly. |
| japan tour package from cebu 2026 | Press releases and global tour aggregators; "no Cebu-specific package found" | **Big opening.** Our Japan tour flies Cebu Pacific **direct from Cebu**. |
| hanoi sapa halong tour from cebu | A Scribd quotation (Manila), TourRadar, Pelago, Expedia; "no package starting in Cebu" | Same opening as Japan. Our Hanoi tour flies Vietnam Airlines **from Cebu**. |
| educational tour cebu | School news posts (SMU, UNO-R, SJC), TTG Asia "Education tourism gains ground in Cebu" (Feb 2026); one local agency named only in passing | Demand is real (Cebu + Bohol trips for 90-200 students, factory visits, seminars) and no agency has a landing page for it. |
| corporate team building cebu travel agency | SilverKris and hotel content, UP Cebu staff event, a 2016 AirYouGo story | No agency owns the query. Our MICE page fits it but never uses the words "team building" or "company outing" in a heading. |
| airline ticketing office cebu city | KLIA.info AirAsia sales-office listing, a SunStar AirYouGo story, spam "airline office" pages | The intent is local: an office address and hours. Our Cebu City office address is the asset here. Hours are **[AGENCY]**. |
| "Immaculate Connections" Cebu travel | Nothing about the agency (MCIA "Cebu Connect" results) | The brand is not indexed yet. Search Console, the Business Profile and citations come first (section 5). |

Sources: [yolasite](https://cebu-travel-and-tour-package-by-jys.yolasite.com/), [Klook car with driver](https://www.klook.com/activity/6657-cebu-car-rental-with-driver/), [SunStar Grab](https://www.sunstar.com.ph/cebu/business/grab-includes-tour-packages-in-car-service), [maxwellcarscebu](https://maxwellcarscebu.carrd.co), [ntmg coaster](https://book.ntmg.com/po94QOO4xk28cxBLhv4R96wz8UJiCiYf6GmLwbxg/products/ba0e1b45-bde4-5ef0-a0ed-a1015a9aa889?lng=en-US), [AAA Bohol day tour](https://www.aaa.com/tripcanvas/thing-to-do/bohol-day-tour-from-cebu-shared-w-rt-transfers-and-ferry-112751P31), [Klook Bohol](https://www.klook.com/en-AU/activity/3645-sightsee-bohol-tour-cebu/), [Lakwatsero Camotes](https://www.lakwatsero.com/?p=3527), [Wikivoyage Camotes](https://en.wikivoyage.org/wiki/Camotes_Islands), [Da Nang promotion in Cebu](https://danangfantasticity.com/en/da-nang-strengthens-tourism-promotion-in-the-philippines-through-a-series-of-key-networking-and-business-matching-activities), [hoiandaytrip](https://hoiandaytrip.com/?p=37367), [Japan packages PR](https://www.wboc.com/online_features/press_releases/how-to-choose-japan-trip-packages-2026-from-the-philippines-diper-tour-guide/article_4b343b1e-0b57-56a6-a9aa-96d5d69b3a2d.html), [Scribd Hanoi quote](https://www.scribd.com/document/910304313/Quotation), [TTG education tourism](https://www.ttgasia.com/2026/02/04/education-tourism-gains-ground-in-cebu/), [SMU tour](https://smu.edu.ph/smu-hospitality-and-tourism-students-explore-cebu-and-bohol-in-immersive-educational-tour/), [SilverKris team building](https://silverkris.singaporeair.com/branded-content/cebu-business-travel-team-building/), [KLIA AirAsia Cebu](https://klia.info/airlines/airasia/ticket_offices/cebu_city.htm), [SunStar Air You Go](https://weekend.sunstar.com.ph/?p=2664).

**Takeaway:** competition for "from Cebu" commercial queries is weak and mostly OTAs and blogs. The agency's real edge is a Cebu City office that publishes dates, inclusions and prices for tours that **leave from Cebu** (Hanoi, Japan, Bohol, Camotes, Cebu day tours). Titles and H1s should say "from Cebu" wherever that is true, and "from Manila" wherever it is not.

---

## 1. Positioning audit: **5 / 10**

### What the site says the agency is

| Where | Text | Verdict |
|---|---|---|
| index.html `<title>` | "Immaculate Connections \| Cebu Travel Agency, Tours & Tickets" | Good: who, what, where. The brand is first, though nobody searches for it yet. |
| index.html H1 | "Journeys planned to the last detail" | No category, place or service; could be any agency anywhere. |
| index.html hero sub | "From Bohol day trips to Da Nang charters and Japan tours, one Cebu team books the tickets, hotels, transport and guides, so your group simply shows up and enjoys the trip." | **Best positioning line on the site**: Cebu, one team, groups, everything booked. It belongs in the H1 area and the meta description. |
| index.html H2 | "Your Dream Vacation Awaits" / "Crafting Seamless Journeys, Creating Lasting Memories." / "your gateway to impeccable travel experiences" | Generic slogan copy that dilutes the hero line. |
| index.html stats | "4 Destination countries · Licensed Tour guides · Cebu City Office & local team · 24/7 Traveller support" | Two of the four stats are open **[AGENCY]** questions (licensed guides, 24/7; content H7). Only "Cebu City Office" is a safe differentiator. |
| about.html H1 | "Crafting Seamless Journeys, Creating Lasting Memories" | Slogan repeated from home. The first paragraph is good: "Immaculate Connections Travel Agency is a Cebu City travel agency offering ticketing, hotel bookings, transport, local and international tour packages, and trainings, seminars and events." |
| about.html Mission/Vision | "pinnacle of innovative and responsible travel… global community of conscious travellers"; "commitment to sustainable tourism" (5 mentions site-wide) | Unsupported claims: no sustainability practice is described anywhere. This reads as boilerplate and weakens trust. |
| services.html H1 | "Your Immaculate Service" | No keyword, no meaning for a stranger. |
| _partials/header.html logo | "Immaculate Connections **Tour Services**" | Conflicts with "Travel Agency" in every title, schema and llms.txt (content L7). |

### Clarity scores

| Question | Score | Note |
|---|---|---|
| Who | 6 | The name is clear. The audience (groups, schools, LGUs, companies, families) is shown in photos and MICE copy but never stated. |
| What | 6 | Five services are listed consistently ("Ticketing · Hotels · Transport · Events"), but every H1 avoids naming them. |
| Where | 6 | "Cebu" is in most titles. The Cebu City office address appears on every page footer. The H1s never say Cebu. |
| Differentiation | 3 | The real differentiators are in the data but not in the headlines (see below). |
| Consistency | 5 | "Travel Agency" vs "Tour Services". Generic slogans repeated across home, about and services. The tone shifts from specific (service pages) to brochure (home, about). |

### Real differentiators found in the repo (use these)

1. **International tours that fly out of Cebu.**
   - Hanoi–Sapa–Ha Long 4D3N on Vietnam Airlines, `departure: 'Cebu (Mactan-Cebu International)'` (data.js:289).
   - Japan Tokyo–Yokohama–Mt. Fuji 5D4N, "direct from Cebu on Cebu Pacific" (data.js:507, :511).
   - Da Nang and Yunnan fly from Manila. Say so; never imply Cebu for them.
2. **Published dates, inclusions, exclusions and prices.** Rare among Cebu agencies; competitors are OTAs.
   - Da Nang from ₱21,888 / ₱23,888 per pax.
   - Hanoi from ₱32,888.
   - Yunnan from US$1,488.
   - Japan from US$1,049.
3. **Group and institutional work.**
   - "Orientation courses for local legislators & LGU staff" (services.html, mice.html).
   - Gallery: "Factory site visit · Educational tour", "Student group tour", "Student delegation", seminars, Tokyo and Hong Kong group tours.
4. **One team for the whole trip.** Tickets, hotel, transport with driver and events in one inquiry; free quotation.
5. **Local day and overnight tours from Cebu.**
   - Bohol day tour with two-way fast craft from Cebu City pier.
   - Camotes 2D1N tours from Danao port.
   - Cebu City and highlands day tours with pick-up from Cebu City or Mactan hotels.

**Not usable until the agency confirms:**
- In-house fleet. The site says "Transport Service **Reservations**" and "Rates quoted on request"; nothing says the agency owns the vehicles. Do not write "our fleet".
- DOT accreditation.
- Licensed guides.
- 24/7 support.

### Recommended positioning line (repo facts only)

> **Cebu City travel agency for groups and families: tours, flights, hotels, vans and events booked by one team, with published tour dates and prices, and international tours that fly out of Cebu.**

Use this line (or its first half) as:
- the home H1 support line;
- the about-page first sentence;
- the GBP description;
- the `description` in the TravelAgency JSON-LD.

---

## 2. Keyword map: every indexable page

Indexable means in sitemap.xml and without noindex: 25 URLs. 404, package.html, payment and team are noindex and excluded.

| URL | Primary keyword | Secondaries | Current `<title>` | Current meta description | Current H1 | Gaps / cannibalisation |
|---|---|---|---|---|---|---|
| / | travel agency cebu | travel agency in cebu city; cebu tour packages; tour packages from cebu | Immaculate Connections \| Cebu Travel Agency, Tours & Tickets | Cebu travel agency: Bohol, Camotes and Cebu tours, Vietnam, China and Japan packages, flight tickets, hotels, van and bus hire, and events. | Journeys planned to the last detail | H1 has no keyword. The brand-first title wastes the front of the title while the brand has no search demand. "coaster" is missing from the description. Overlaps services.html on "travel services cebu". |
| /tours | tour packages from cebu | cebu tour packages 2026; international tour packages philippines; bohol and camotes tour packages | Tour Packages from Cebu & Manila: Bohol, Vietnam & Japan | Tour packages from Cebu and Manila: Bohol, Camotes and Cebu City day tours, plus Da Nang, Hanoi–Sapa–Ha Long Bay, Yunnan and Japan, with dates and inclusions. | Local & International Packages | Description is **158 chars** (cut off in results). Brand missing from the title. H1 has no "Cebu". Competes with home for "cebu tour packages": let tours own "tour packages", home own "travel agency". |
| /services | travel services cebu | ticketing hotel transport cebu; one-stop travel agency cebu | Travel Services in Cebu: Tickets, Hotels, Transport & Events | Flight ticketing, hotel bookings, van, coaster and bus reservations, local and international tour packages, and seminar and event logistics in Cebu. | Your Immaculate Service | Brand missing from title. H1 is empty of meaning. Each section repeats a dedicated page (ticketing, hotel, car-rental, mice) with the same headings (H2 "Ticketing" vs ticketing page), so it cannibalises them. Make it a hub that links out. |
| /car-rental | van rental cebu with driver | coaster rental cebu; bus rental cebu; airport transfer cebu (Mactan) | Car Rental with Driver in Cebu \| Immaculate Connections | Vans, coasters, buses and 4-seaters with driver for airport transfers, city tours, out-of-town trips and event shuttles in Cebu. Free quotation. | Car rental with driver | "Car rental" is the weakest of the four terms: people search "van rental / van for hire / coaster rental". "rental" appears once in body copy ("car rental"). No seat capacities **[AGENCY]**, no rates or "what's included" (the SERP rewards both). |
| /hotel-booking | hotel booking cebu | bohol resort booking; camotes resort; panglao / anda hotel | Hotel and Resort Booking in Cebu & Bohol \| Immaculate Connections | Rooms at our partner resorts and hotels in Bohol, Camotes, Cebu and beyond, on their own or with a tour. Send your dates for a free quotation. | Hotel bookings, island to island | Title is **65 chars** (truncated). Low-intent keyword for an agency (OTAs dominate); its value is supporting the packages. H1 has no place name. |
| /ticketing | airline ticketing cebu | ferry tickets cebu to bohol / camotes; group flight booking cebu; international flight booking philippines | Flight and Ferry Tickets in Cebu \| Immaculate Connections | Domestic and international flights, boat and ferry tickets and group bookings, one-way, round-trip or multi-city. Send the route and dates for a free quotation. | Flights and ferries, booked for you | Fine. The H1 lacks "Cebu" and "ticketing". The local office intent needs an address and hours on page; hours are **[AGENCY]**. |
| /mice | MICE cebu | seminar organizer cebu; corporate events / team building cebu; LGU orientation seminar; company outing cebu | MICE, Seminars and Events in Cebu \| Immaculate Connections | Conventions, seminars, trainings, orientation courses and corporate gatherings: venue, accommodation, meals and participant transport arranged for you. | Meetings and events, handled end to end | "Team building" and "company outing" are missing from title, H1 and H2 although the home form offers "An event, seminar or team building". "Educational tour" has no home (gap 4.2). |
| /gallery | (brand support) group tour photos | japan group tour; hong kong group tour; educational tour photos | Gallery: Group Tour Photos and Videos \| Immaculate Connections | Photos and videos from our group tours in Tokyo and Hong Kong, trips around the Philippines, seminars, events and airport transfers from Cebu City. | Our travellers, on the road | Title is **62 chars**. Duplicates about.html's gallery block (design H5). It shows Hong Kong and Singapore trips that have no package: say "custom group tours" so searchers are not misled. |
| /about | about immaculate connections | cebu city travel agency; travel agency JL Millennium Building | About Us \| Immaculate Connections Travel Agency, Cebu City | Why travellers choose Immaculate Connections: quality service, reliability, attention to detail and professionalism, and photos from our group tours. | Crafting Seamless Journeys, Creating Lasting Memories | H1 is a slogan. The description is generic. Brand-entity page: it should state the name, office, services and who it serves, for Google and AI answers. |
| /contact | travel agency cebu contact | free travel quotation; tour quotation cebu | Inquire & Get a Quote \| Immaculate Connections Travel Agency | Request a free quotation for tour packages, flights, hotels, transport or events. Mobile +63 917 319 8540, Tel (032) 238 3343, Cebu City. | Inquire & Get a Quote | OK. "Cebu City" should be in the title for the "travel agency near me / office" intent. |
| /package-danang-6d4n | da nang tour package from manila | da nang 6d4n; da nang charter flight package; ba na hills hoi an tour | Da Nang Charter Flight 6D4N Tour \| Immaculate Connections | Round-trip charter flight from Manila, four nights in Da Nang, Ba Na Hills, Hoi An, the Dragon Bridge and the Hai Van Pass, all guided in English. | Da Nang Charter Flight 6D4N Tour | Cannibalises 5D3N: both titles start "Da Nang Charter Flight". Lead the title with duration and departure, and cross-link "longer / shorter version". The price (₱23,888) is not in the description. |
| /package-danang-5d3n | da nang tour package 5d3n | da nang package philippines; da nang long weekend | Da Nang Charter Flight 5D3N Tour \| Immaculate Connections | The shorter Da Nang charter: round-trip flight from Manila, three nights at Sea Garden Hotel or a similar local 4-star, Ba Na Hills and the city… | Da Nang Charter Flight 5D3N Tour | Description ends in "…" (truncated). Same cannibalisation as above. The lowest price on the site (₱21,888) is not in the description. |
| /package-hanoi-sapa-halong-4d3n | hanoi sapa halong bay tour from cebu | vietnam tour package from cebu; ha long bay cruise package philippines | Hanoi – Sapa – Ha Long Bay 4D3N Tour \| Immaculate Connections | Fly Vietnam Airlines from Cebu for Hanoi's Old Quarter, the Fansipan cable car in Sapa and an exclusive Ha Long Bay cruise, with two lunch buffets… | Hanoi – Sapa – Ha Long Bay 4D3N Tour | Title is **61 chars** with no "from Cebu", the page's strongest edge. Description truncated. |
| /package-charming-yunnan-8d7n | yunnan tour package philippines | kunming dali lijiang shangri-la tour; china tour package from manila | Charming Yunnan 8D7N Tour \| Immaculate Connections | Kunming, Dali, Lijiang and Shangri-La in eight days: China Southern flights from Manila, 5-star hotels, a high-speed train ride and two upgraded lunch… | Charming Yunnan 8D7N Tour | "China" is not in the title. Description truncated. |
| /package-japan-tokyo-fuji-5d4n | japan tour package from cebu | tokyo mt fuji tour package philippines; japan winter tour 2026 | Tokyo & Mt. Fuji 5D4N Japan Tour \| Immaculate Connections | Winter in Japan direct from Cebu on Cebu Pacific: Tokyo, Yokohama and Mt. Fuji with hotel breakfasts, an English-speaking guide and two upgraded lunch… | Japan: Tokyo · Yokohama · Mt. Fuji 5D4N Tour | "from Cebu" is not in the title although it is the page's biggest differentiator in the SERP. Description truncated. |
| /package-shanghai-mini-kyoto-5d4n | shanghai tour package philippines | (departed) | Shanghai Mini Kyoto 5D4N Tour \| Immaculate Connections | Five days in Shanghai on Juneyao Air from Manila… | Shanghai Mini Kyoto 5D4N Tour | The tour has departed. Keep it indexable only if it will run again **[AGENCY]**, content #14. Otherwise noindex and remove it from the sitemap, or turn it into "Shanghai tours: ask for the next date". |
| /package-bohol-breezes | bohol day tour from cebu | bohol tour package; chocolate hills loboc river tour from cebu | Bohol Tour Package: Bohol Breezes \| Immaculate Connections | A full day across Bohol's icons, from the Blood Compact Shrine and Baclayon Church to the Chocolate Hills, with lunch on a Loboc River cruise. | Bohol Breezes: Embrace Island Serenity! | Highest-volume local query, and every competitor is an OTA. The title should say "Day Tour from Cebu". The description omits "two-way boat ticket from Cebu", which is included (data.js:332). |
| /package-camotes-discover | camotes island tour package | camotes tour from cebu; camotes 2d1n; lake danao camotes | Camotes Island Tour Package \| Immaculate Connections | Beaches, caves and Cebu's largest lake over two days on the Camotes Islands, with hotel, meals, boat tickets and guide arranged. | Discover Enchanting Camotes | Good title. Cannibalises camotes-tudela on "camotes tour": keep "Camotes Island Tour Package" here and give Tudela the long tail. The H1 should include "Camotes Islands 2D1N". |
| /package-camotes-tudela | tudela camotes tour | bukilat cave tour; camotes overnight tour; busay falls camotes | Camotes Charms: Lakwatsa sa Tudela \| Immaculate Connections | The quieter Tudela side of Camotes: Bukilat sea cave, the Villahermosa mangroves, the heritage Kaompang tree and Busay Falls, with an overnight stay. | Camotes Charms: Lakwatsa sa Tudela | The name hides what it is (no "tour", no "2D1N"). Add it to `SEO_TITLES`. |
| /package-cebu-highlands | cebu highlands tour | temple of leah tour; sirao garden tour; cebu tops / busay day tour | Cebu Highlands Vista Tour \| Immaculate Connections | Cebu's most photographed hilltop spots in one day: the Temple of Leah, Little Kyoto, Seoul Sierra and the flower fields of Sirao Garden. | Cebu Highlands Vista Tour | OK. Add "Temple of Leah", the search term, to the title. |
| /package-queen-city | cebu city tour | cebu heritage tour; magellan's cross basilica tour | Queen City Tour: Cebu \| Immaculate Connections | Cebu City's heritage trail: Magellan's Cross, the Basilica del Sto. Niño, Fort San Pedro, the ancestral houses of Parian and the Taoist Temple. | Queen City Tour: Cebu | Cannibalises twin-city on "cebu city tour". Give this page "Cebu City heritage tour" and twin-city "Cebu and Mactan tour". |
| /package-twin-city | cebu mactan city tour | alegre guitar factory tour; cebu tour for first-timers | Twin City Tour: Cebu \| Immaculate Connections | Cebu City's landmarks plus a crossing to Mactan for the Alegre Guitar Factory. Ideal for first-time visitors with one day to spare. | Twin City Tour: Cebu | See above. |
| /package-boracay-bliss | boracay tour package | boracay package from cebu | Boracay Tour Package: Boracay Bliss \| Immaculate Connections | Our Boracay package is being finalised… | Boracay Bliss | "Coming soon" page with no product: thin content. Keep it indexable only as "custom Boracay trips" (see 3). Content L10 (departs Cebu) still applies. |
| /package-el-nido | el nido tour package | el nido package philippines | El Nido, Palawan Tour Package \| Immaculate Connections | Lagoons and limestone cliffs… being finalised… | El Nido Escapade: Memory Keepers | As Boracay. |
| /package-coron | coron tour package | coron palawan package | Coron, Palawan Tour Package \| Immaculate Connections | Coron's lakes, lagoons and shipwrecks… being finalised… | Coron Captures | As Boracay. |

### Cross-site cannibalisation summary

- **"cebu tour packages":** home, tours and services all compete. Fix: home = "travel agency cebu"; tours = "tour packages from cebu"; services = hub for "travel services".
- **services.html vs each service page:** identical H2s ("Ticketing", "Hotel Bookings & Reservations"…) and embedded quote forms. Fix: keep services short; each block gets 2 lines plus a link to its page; drop the duplicate forms. This is also a UX win (design H4 gaps).
- **Da Nang 6D4N vs 5D3N:** titles differ only by duration. Fix: titles below, plus a "Prefer N days? See the other Da Nang tour" link (content exists in "Other packages you may like").
- **Queen City vs Twin City; Camotes Discover vs Tudela:** split by sub-intent (titles below).
- **about.html gallery block vs gallery.html:** duplicate image content (design H5 covers the fix).

---

## 3. Exact rewrites (machine-usable)

Conventions:
- Brand suffix is always ` | Immaculate Connections` (25 chars), so the body is at most 35 chars.
- Every title and description length was checked with `lencheck.py`.
- "from Cebu" is used only where `departure` is Cebu in data.js.
- No 24/7, licensed, accredited, all-in or email claims.

### 3a. Static pages

| file | new `<title>` | new meta description | H1 suggestion | Answer-first intro (add under the H1) |
|---|---|---|---|---|
| index.html | Cebu Travel Agency: Tours & Tickets \| Immaculate Connections | Cebu City travel agency: Bohol, Camotes and Cebu tours, Vietnam, China and Japan packages, flights, hotels, van and coaster hire, and events. Free quote. | Your Cebu City travel agency, planned to the last detail | Immaculate Connections Travel Agency is a travel agency in Cebu City, Philippines, that books tour packages, flight and ferry tickets, hotels, vans, coasters and buses with driver, and seminars and events. One team handles the whole trip, and every quotation is free. |
| tours.html | Tour Packages from Cebu & Manila \| Immaculate Connections | Bohol, Camotes and Cebu City tours from Cebu, plus Hanoi and Japan tours from Cebu and Da Nang and Yunnan from Manila, with dates, inclusions and prices. | Tour packages from Cebu and Manila | We publish {N} tour packages: {N_local} in the Philippines and {N_abroad} abroad. Bohol, Camotes and Cebu City tours leave from Cebu. The Hanoi–Sapa–Ha Long and Japan tours fly from Cebu, and the Da Nang and Yunnan tours fly from Manila. (Write the counts from the existing `data-stat` build tokens; today 14 / 9 / 5.) |
| services.html | Travel Services in Cebu City \| Immaculate Connections | Flight and ferry ticketing, hotel bookings, van, coaster and bus hire with driver, tour packages, and seminars and events, from one Cebu City team. | Travel services in Cebu: tickets, hotels, transport, tours and events | We offer five services from our Cebu City office: flight and ferry ticketing, hotel and resort bookings, vehicle hire with driver (4-seaters, vans, coasters and buses), local and international tour packages, and meetings and events. Quotations are free. |
| car-rental.html | Van & Coaster Rental in Cebu \| Immaculate Connections | Van, coaster, bus and 4-seater hire with driver in Cebu: airport transfers, city tours, out-of-town trips and event shuttles, air-conditioned. Free quote. | Van, coaster and bus rental with driver in Cebu | We arrange air-conditioned vans, coasters, buses and 4-seaters with driver in Cebu, for Mactan-Cebu airport transfers, city tours, out-of-town trips and event shuttles. Rates depend on the route and how long you need the vehicle, so send the route for a free quotation. |
| hotel-booking.html | Hotel & Resort Booking Cebu & Bohol \| Immaculate Connections | Hotel and resort booking in Bohol (Panglao, Anda), Camotes, Moalboal, Cebu City, Boracay and Palawan, on its own or with a tour. Free quotation. | Hotel and resort booking in Cebu, Bohol and Camotes | We book hotels and resorts in Panglao and Anda (Bohol), the Camotes Islands, Moalboal, Cebu City, Boracay, El Nido and Coron, for your own dates or as part of a tour package. Send the island, dates, rooms and guests for a free quotation. |
| ticketing.html | Flight & Ferry Ticketing in Cebu \| Immaculate Connections | Domestic and international flights, ferry tickets to Bohol and Camotes, and group bookings from our Cebu City office. One-way, round-trip or multi-city. | Flight and ferry ticketing in Cebu City | Our Cebu City ticketing desk books domestic and international flights and boat and ferry tickets for island tours, one-way, round-trip or multi-city, for individuals and groups. Send the route, dates and number of passengers for a free quotation. |
| mice.html | MICE, Seminars & Events in Cebu \| Immaculate Connections | Seminars, trainings, conventions, LGU orientation courses, team building and company outings in Cebu: venue, rooms, meals and transport arranged. | MICE, seminars and corporate events in Cebu | We organise seminars, trainings, conventions, orientation courses for local legislators and LGU staff, reunions and corporate gatherings in Cebu. We arrange the venue, accommodation, meals, participant transport and, if needed, flights and a tour. |
| gallery.html | Group Tour Photos & Videos \| Immaculate Connections | Photos and videos from our group tours in Tokyo and Hong Kong, school and company trips, Philippine tours, seminars and airport transfers from Cebu. | (keep) | These are photos and videos from groups we have travelled with: tours in Japan and Hong Kong, trips around the Philippines, an educational factory visit, seminars and events, and the transfers in between. |
| about.html | About Our Cebu City Travel Agency \| Immaculate Connections | Immaculate Connections is a Cebu City travel agency for tours, tickets, hotels, vehicle hire and events, with an office on Don Jose Avila Street. | About Immaculate Connections, a Cebu City travel agency | Immaculate Connections Travel Agency is a Cebu City travel agency at Unit 4E, JL Millennium Building, Don Jose Avila Street. We book tour packages, flight and ferry tickets, hotels, vehicles with driver, and seminars and events for families, schools, companies and local government groups. |
| contact.html | Contact & Free Quotation, Cebu City \| Immaculate Connections | Request a free quotation for tours, flights, hotels, vans or events. Mobile +63 917 319 8540, landline (032) 238 3343, JL Millennium Building, Cebu City. | (keep "Inquire & Get a Quote") | Send the inquiry form below, call +63 917 319 8540 or (032) 238 3343, or message us on Facebook. Our office is at Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street, Cebu City. Quotations are free and nothing is paid on the website. |

Notes:
- **index.html:** keep "Journeys planned to the last detail" as the eyebrow or tagline if the owner likes it. Delete or merge the generic H2 "Your Dream Vacation Awaits" so the hero intro carries the positioning.
- **about.html:** replace the Mission/Vision "sustainable tourism / pinnacle of innovative and responsible travel" lines, or back them with a real practice **[AGENCY]**.
- **car-rental.html:** add seat capacities when known **[AGENCY]**. Do not write "our fleet" until the agency confirms it owns the vehicles **[AGENCY]**.
- **hotel-booking.html:** "partner resorts" is content question #9 **[AGENCY]**.
- **ticketing.html:** add office hours once confirmed **[AGENCY]**.
- **mice.html:** rename H2 "The events we handle" to "Seminars, team building and corporate events we handle".

### 3b. Package pages (generated by tools/build.py)

**Pattern.** Replace the title and description logic at build.py:263-265.

```python
# title: keyword-first SEO name + fixed brand suffix, hard cap 60
SUFFIX = " | Immaculate Connections"
seo = SEO_TITLES.get(t["id"]) or t["name"]
title = seo + SUFFIX if len(seo) + len(SUFFIX) <= 60 else seo[:60]
assert len(title) <= 60, (t["id"], title)

# description: price + length + departure first (the facts searchers compare), then the summary, trimmed at 155
dep = (t.get("departure") or "").split(" (")[0]            # "Cebu (Mactan-Cebu International)" -> "Cebu"
dep = "Cebu" if dep.startswith("Cebu") else dep             # "Cebu City pier" / "Cebu City hotels" -> "Cebu"
price = money(t["price"]).replace("From ", "from ").replace(" per pax", "").replace(" all-in per person", "").replace(" per person", "") if t.get("price") else ""
lead = ", ".join(x for x in [t.get("duration"), f"from {dep}" if dep else "", price] if x)
desc = trim(f"{lead[0].upper() + lead[1:]}. {t['summary']}" if lead else t["summary"])
```

Notes:
- `money` is in seo.py; import it or copy it.
- Strip "all-in" (content H1, **[AGENCY]**).
- For `status: 'soon'` the lead collapses to "from Cebu"; prefer the custom text in the last table of this section.

**`SEO_TITLES` (replace the whole dict; every body is ≤35 chars):**

| id | SEO title body | Full title (chars) |
|---|---|---|
| danang-6d4n | Da Nang Tour 6D4N from Manila | Da Nang Tour 6D4N from Manila \| Immaculate Connections (54) |
| danang-5d3n | Da Nang Tour 5D3N from Manila | … (54) |
| hanoi-sapa-halong-4d3n | Hanoi Sapa Ha Long Tour from Cebu | … (58) |
| charming-yunnan-8d7n | Yunnan China Tour 8D7N from Manila | … (59) |
| japan-tokyo-fuji-5d4n | Japan Tour from Cebu: Tokyo & Fuji | … (59) |
| shanghai-mini-kyoto-5d4n | Shanghai Tour 5D4N from Manila | … (55) |
| bohol-breezes | Bohol Day Tour from Cebu | … (49) |
| camotes-discover | Camotes Island Tour 2D1N from Cebu | … (59) |
| camotes-tudela | Tudela, Camotes Overnight Tour | … (55) |
| cebu-highlands | Cebu Highlands Tour: Temple of Leah | … (60) |
| queen-city | Cebu City Heritage Tour | … (48) |
| twin-city | Cebu & Mactan Twin City Tour | … (53) |
| boracay-bliss | Boracay Tour Package | … (45) |
| el-nido | El Nido, Palawan Tour Package | … (54) |
| coron | Coron, Palawan Tour Package | … (52) |

Keep the H1 as the package's own name (build.py already does this). Add the AEO intro below.

**AEO intro pattern for package pages.** One sentence, rendered by main.js above "About this package". It can also go in the `summary` field's first sentence.

`"{name} is a {duration} {country == 'Philippines' ? 'tour' : country + ' tour'} departing {departure}{price ? ', ' + price : ''}. {first clause of summary}."`

**Three example outputs.** Lengths checked; the descriptions are the exact strings the pattern produces.

| file | title | meta description | AEO intro |
|---|---|---|---|
| package-japan-tokyo-fuji-5d4n.html | Japan Tour from Cebu: Tokyo & Fuji \| Immaculate Connections | 5 days 4 nights, from Cebu, from US$1,049. Winter in Japan direct from Cebu on Cebu Pacific: Tokyo, Yokohama and Mt. Fuji with hotel breakfasts, an… | The Japan: Tokyo · Yokohama · Mt. Fuji 5D4N Tour is a 5 days 4 nights Japan tour departing Cebu (Mactan-Cebu International) on Cebu Pacific, from US$1,049 per person. It covers Tokyo, Yokohama and Mt. Fuji with an English-speaking guide. |
| package-bohol-breezes.html | Bohol Day Tour from Cebu \| Immaculate Connections | Day tour, from Cebu. A full day across Bohol's icons, from the Blood Compact Shrine and Baclayon Church to the Chocolate Hills, with lunch on a Loboc River cruise. *(over 155, so `trim` cuts it to the whole sentence; better to hand-write it as in the next table)* | Bohol Breezes is a day tour of Bohol from Cebu City pier, with two-way boat tickets, terminal and entrance fees, a tour guide, air-conditioned transport and lunch on the Loboc River included. Rates are quoted on request. |
| package-hanoi-sapa-halong-4d3n.html | Hanoi Sapa Ha Long Tour from Cebu \| Immaculate Connections | 4 days 3 nights, from Cebu, from ₱32,888. Fly Vietnam Airlines from Cebu for Hanoi's Old Quarter, the Fansipan cable car in Sapa and an exclusive Ha Long… | The Hanoi – Sapa – Ha Long Bay 4D3N Tour is a 4 days 3 nights Vietnam tour departing Cebu (Mactan-Cebu International) on Vietnam Airlines, from ₱32,888 per person. It covers Hanoi's Old Quarter, the Fansipan cable car in Sapa and a Ha Long Bay cruise. |

**Better still: hand-written descriptions per package.** Add a `seoDesc` field in data.js and let build.py prefer `t.get("seoDesc")` over the pattern. A pattern cannot avoid the "…" truncation on long summaries. Ready-to-paste values (all ≤155):

| id | seoDesc |
|---|---|
| danang-6d4n | Da Nang 6D4N tour from Manila from ₱23,888 per pax: round-trip charter flight, 4 hotel nights, Ba Na Hills, Hoi An and the Hai Van Pass, English-guided. |
| danang-5d3n | Da Nang 5D3N tour from Manila from ₱21,888 per pax: round-trip charter flight, 3 nights at Sea Garden Hotel or similar 4-star, Ba Na Hills and city tour. |
| hanoi-sapa-halong-4d3n | Hanoi, Sapa and Ha Long Bay 4D3N tour from Cebu on Vietnam Airlines, from ₱32,888: Old Quarter, Fansipan cable car and a Ha Long Bay cruise. |
| charming-yunnan-8d7n | Yunnan, China 8D7N tour from Manila on China Southern, from US$1,488: Kunming, Dali, Lijiang and Shangri-La, 5-star hotels and a high-speed train. |
| japan-tokyo-fuji-5d4n | Japan 5D4N winter tour from Cebu on Cebu Pacific, from US$1,049: Tokyo, Yokohama and Mt. Fuji with hotel breakfasts and an English-speaking guide. |
| bohol-breezes | Bohol day tour from Cebu: fast craft both ways, Blood Compact Shrine, Baclayon Church, Chocolate Hills and lunch on a Loboc River cruise. Free quotation. |
| camotes-discover | Camotes Islands 2D1N tour from Cebu via Danao port: beaches, caves and Lake Danao, with hotel, meals, boat tickets and guide arranged. Free quotation. |
| camotes-tudela | Tudela, Camotes 2D1N tour from Cebu: Bukilat sea cave, Villahermosa mangroves, the Kaompang tree and Busay Falls, with an overnight stay. Free quotation. |
| cebu-highlands | Cebu highlands day tour: Temple of Leah, Little Kyoto, Seoul Sierra and Sirao Garden, with air-conditioned van, guide and entrance fees. Free quotation. |
| queen-city | Cebu City heritage day tour: Magellan's Cross, Basilica del Sto. Niño, Fort San Pedro, Parian ancestral houses and the Taoist Temple. Free quotation. |
| twin-city | Cebu and Mactan day tour for first-timers: Cebu City landmarks plus the Alegre Guitar Factory on Mactan, with van, guide and entrance fees. Free quotation. |
| boracay-bliss | Planning Boracay? Our Boracay package is being finalised; we can arrange a custom Boracay trip with flights, hotel and transfers now. Free quotation. |
| el-nido | El Nido, Palawan: our package is being finalised, and we can arrange a custom El Nido trip with flights, hotel and island tours now. Free quotation. |
| coron | Coron, Palawan: lakes, lagoons and shipwrecks. Our package is being finalised; custom Coron trips with flights and hotel can be arranged now. Free quote. |
| shanghai-mini-kyoto-5d4n | Shanghai 5D4N tour from Manila on Juneyao Air: the Bund, Lujiazui and the "Mini Kyoto" street. Published dates have passed; ask us for the next departure. |

Caveats:
- **[AGENCY]** The Da Nang "4 hotel nights" depends on content H4. The Bohol "fast craft" comes from data.js:328 ("Fast craft from Cebu to Tagbilaran").
- The Cebu day-tour inclusions (van, licensed guide, entrance fees) are from `INC_CEBU` (data.js:216). "Licensed" is deliberately left out until confirmed.
- The "custom trip with flights, hotel and island tours" wording for Boracay, El Nido and Coron rests on the services they already sell (ticketing + hotel + tours). Fine, but confirm **[AGENCY]**.

---

## 4. Content gaps: up to 5 new pages

| # | Page (slug) | Primary keyword | Intent | Outline | Agency facts needed? |
|---|---|---|---|---|---|
| 4.1 | International tours from Cebu (`tours-from-cebu`) | international tour package from cebu; japan / vietnam tour from cebu | Commercial | H1 "International tour packages that fly from Cebu". Answer box: which tours fly from Cebu (Hanoi on Vietnam Airlines, Japan on Cebu Pacific) and which from Manila (Da Nang charter, Yunnan). Comparison table: duration, airline, baggage (already on ticketing.html), from-price, next open date (built from data.js). Visa notes link to each country guide. "Flying from Cebu to Manila for the charter? We book the connecting flight" (ticketing service). FAQ. | **No.** Everything is in data.js. Build it from the data like the tours FAQ (seo.py) so it never goes stale. Best ROI of the five. |
| 4.2 | Educational and school tours (`educational-tours`) | educational tour cebu; school field trip cebu bohol; student tour package philippines | Commercial, B2B (schools, colleges, HTM programmes) | H1 "Educational tours and school trips from Cebu". What we arrange: transport (coaster/bus), factory and industry visits (gallery video "Factory site visit · Educational tour"), seminars (MICE), heritage tours (Queen City), Bohol and Camotes legs. Photo strip of student groups (index print-2/print-3). How it works (5 steps, as on MICE). Inquiry pre-filled `?service=mice&notes=Educational tour`. | **Yes:** group sizes handled, chaperone ratio, insurance, permit and CHED/DepEd paperwork help, sample per-pax price, school references and consent for photos (content #12). |
| 4.3 | Van and coaster rental rates guide (`van-rental-cebu-rates`) | van rental cebu rates; coaster rental cebu price; how much is van rental in cebu | Commercial investigation | H1 "Van and coaster rental in Cebu: what it costs and what's included". Seat capacity per vehicle. What changes the price (hours, route, out-of-town, overnight, fuel/tolls/parking/driver meals). Sample routes from car-rental.html (airport transfer, Cebu City heritage day, highlands, Mactan, Danao port for Camotes, event shuttle) with "from ₱…" or "quoted per route". FAQ: overtime, extra stops, driver accommodation on overnight trips. Link to the car-rental form. | **Yes:** capacities, at least indicative rates or "starts at", what is included (fuel, tolls, driver meals), overtime rule, whether vehicles are own fleet or partner. Without rates, keep the page as "what affects the price" only, which is weaker. |
| 4.4 | Bohol day trip from Cebu: how it works (`bohol-day-tour-from-cebu`), or expand the Bohol Breezes page instead of a new URL | bohol day tour from cebu; cebu to bohol day trip itinerary | Informational to commercial | Answer box: "Yes, Bohol can be done in one day from Cebu: fast craft to Tagbilaran, Blood Compact Shrine, Baclayon Church, Bilar forest, Chocolate Hills, Loboc River lunch, fast craft back." Timeline with times. What's included / not. What to bring. Can we add the tarsier sanctuary? Private vs group. Overnight alternative (hotel-booking Panglao/Anda). | **Partly:** pick-up and return times, which pier and fast-craft line, per-pax rate or "from", tarsier add-on, private-group minimum. To avoid cannibalising the package, prefer making this the Bohol Breezes page's content. |
| 4.5 | Company outings and team building in Cebu (`team-building-cebu`) | corporate team building cebu; company outing cebu; team building venue cebu | Commercial, B2B | H1 "Company outings and team building in Cebu". Formats: day outing (highlands, Mactan resort day: gallery "Resort day out"), overnight (Camotes, Bohol), seminar plus outing (MICE), incentive trips abroad (Japan, Vietnam packages for groups). What we arrange: venue, coaster/bus, meals, rooms, facilitator?. Process and inquiry. Gallery strip (seminar energiser, live band night, team outing). | **Yes:** whether they supply facilitators or games, venues and partner resorts used, group-size range, sample package. |

Also considered and dropped:
- **"Japan visa for Filipinos" guide.** High volume, but whether the agency lodges visas (accredited agency) is unknown **[AGENCY]**. Publishing visa guidance without that invites liability. Revisit once the agency confirms.
- **A blog.** Not until the five pages above exist. build.py already supports `blog-*.html` in the sitemap.

---

## 5. Local SEO

### 5a. NAP: every variant found in the repo

| Element | Variant | Where (count) | Status |
|---|---|---|---|
| Name | Immaculate Connections Travel Agency | JSON-LD, footer, titles of 404/payment/team/package template, llms.txt, seo.py `NAME` | **Canonical. Use this on GBP and directories.** |
| Name | Immaculate Connections | Title suffix on all pages, `BRAND` in build.py, WebSite schema `name` | OK as short brand (WebSite `alternateName` already links them) |
| Name | Immaculate Connections **Tour Services** | `_partials/header.html` logo subtitle (every page) | **Inconsistent.** Change to "Travel Agency" unless the registered business name is "Tour Services" **[AGENCY]** (content L7) |
| Address | Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street, Cebu City, Cebu, Philippines 6000 | footer partial and pages (31), data/CONFIG | Canonical visible form |
| Address | Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street, Cebu City 6000, Philippines | llms.txt, seo.py `ai_files` (2) | Same address, different order. Align with the canonical form. |
| Address | JL Millennium Building, Don Jose Avila Street, Cebu City | contact.html H2 (and 1 other) | Shortened, acceptable in a heading |
| Address | streetAddress "Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street" / Cebu City / Cebu / 6000 / PH | JSON-LD on index and 4 service pages | Correct structured form |
| Mobile | +63 917 319 8540 (`tel:+639173198540`) | everywhere (101 text, 17 links) | Canonical |
| Landline | (032) 238 3343 (`tel:+63322383343`) | 65 text, 2 links | Visible but **missing from JSON-LD**. Add it via `contactPoint`. |
| Phone | 0917 000 0000 | `assets/js/main.js:59` comment (GCash sample), README | Not rendered. Make sure it never reaches the payment page. |
| Email | immaculateconnectionsph@gmail.com | all pages, JSON-LD (20), chat, form | In use. Official email is **[AGENCY]** (content M9). |
| Email | inquiries@immaculateconnectionsph.com | AUDIT.md only (6) | Not on public pages. If AUDIT.md is still deployed, it is a conflicting public NAP (content H10, believed fixed in ce06dc3; recheck the live URL). |
| Facebook | https://www.facebook.com/ImmaculateConnections.ph, m.me/ImmaculateConnections.ph | schema `sameAs`, footer, llms.txt | Consistent |

**Rule:** the GBP, Facebook "About", and every directory listing must use exactly the following:
- Name: "Immaculate Connections Travel Agency"
- Address: the canonical address above
- Phones: +63 917 319 8540 as primary, (032) 238 3343 as secondary
- Website: https://www.immaculateconnectionsph.com/

### 5b. Google Business Profile

1. **Claim or verify** the profile at the JL Millennium Building address. Check first for an existing or duplicate listing from the Wix era and merge it.
2. **Primary category:** *Travel agency*. **Secondary categories:**
   - *Tour agency*
   - *Tour operator* (for the published packages)
   - *Bus charter* or *Transportation service*, only if the agency operates or contracts the vehicles **[AGENCY]**. Never "Car rental agency" (that implies self-drive).
   - *Event planner*, if MICE is a real revenue line.
3. **Description (≤750 chars):** start with the positioning line from section 1, then the five services and the departure facts (Hanoi and Japan from Cebu). No 24/7, licensed or accredited claims until confirmed.
4. **Services list:** one entry per service page, linking to the URL with UTM (`?utm_source=gbp&utm_medium=organic&utm_campaign=<page>`):
   - Flight & ferry ticketing
   - Hotel & resort booking
   - Van/coaster/bus hire with driver
   - Tour packages
   - MICE & seminars
   - Educational tours
   - Team building
5. **Products:** one per live package, with photo, the "from" price as on the site, and a link to `package-<id>`. Update them when build.py runs; packages.md is the source list.
6. **Hours:** required for "near me" and "open now" ranking. **[AGENCY]** Do not copy payment.html's unconfirmed Mon–Sat 9–6.
7. **Photos:**
   - office exterior and signage, interior, team at desk (needed for verification and trust);
   - vehicles (if own);
   - 10-15 gallery images already on the site, after photo consent is confirmed (content #12).
8. **Posts:** one per departure month (e.g. "Japan from Cebu: Dec 19–23 and Jan 2027 dates open"), each linking to the package.
9. **Q&A:** seed it with the tours FAQ questions ("Where do the tours depart from?", "Do you offer day tours from Cebu?").
10. **Reviews:** after every trip, send a short review link (`g.page/r/<id>/review`) via Messenger. Reply to every review. Ask reviewers to mention the trip (e.g. "Bohol day tour", "Japan tour"); that feeds local relevance.
11. **Messaging / booking links:** set the Messenger link and "Get quote" to `contact?utm_source=gbp`.
12. **Citations (same NAP):**
    - Facebook page About
    - Apple Business Connect
    - Bing Places
    - Waze/Google Maps pin check
    - DOT accredited-establishments listing (only if accredited **[AGENCY]**)
    - Yellow Pages PH
    - Cebu Chamber or PTAA/TTAC membership pages, if members **[AGENCY]**
13. **Search Console:** the verification file `googlee4a95ab68dd774c1.html` is present. Submit sitemap.xml and request indexing for home, tours, car-rental and the Bohol, Camotes, Hanoi and Japan packages first. The brand search currently returns nothing.

### 5c. Structured data suggestions (seo.py / page JSON-LD)

1. **TravelAgency (index.html, `agency_ld`).** Add:
   - `"alternateName": "Immaculate Connections"`
   - `"contactPoint": [{"@type":"ContactPoint","telephone":"+63 917 319 8540","contactType":"customer service","areaServed":"PH","availableLanguage":["en","fil","ceb"]}, {"@type":"ContactPoint","telephone":"+63 32 238 3343","contactType":"reservations"}]`
     - **[AGENCY]** Confirm the languages; Cebuano and Filipino are an assumption, so drop them if unsure.
   - `"hasMap"` (the GBP share URL) once the profile exists.
   - `"geo": {"@type":"GeoCoordinates","latitude":…,"longitude":…}` from the GBP pin.
   - `"openingHoursSpecification"` once hours are confirmed **[AGENCY]**.
   - `sameAs` should gain the GBP URL and any directory profiles.
   - The `description` should use the section 1 positioning line.
   - Add `"slogan": "Journeys planned to the last detail"` if the brand keeps it.
2. **One entity, referenced everywhere.** The four service pages each embed a full copy of the TravelAgency object as `provider`. Replace it with `"provider": {"@id": "https://www.immaculateconnectionsph.com/#agency"}` so Google sees one business, and so NAP edits happen in one place (seo.py).
3. **Service `areaServed`.** car-rental is `"Philippines"`. Use `[{"@type":"City","name":"Cebu City"},{"@type":"AdministrativeArea","name":"Cebu"}]` for car-rental, hotel-booking (plus Bohol) and mice. Keep "Philippines" for ticketing.
4. **Missing page types:**
   - about.html: `AboutPage` with `mainEntity: {"@id": "#agency"}`
   - contact.html: `ContactPage` with the same
   - services.html: `ItemList` of the 5 Service URLs
   - tours.html: `ItemList` of package URLs (ordered as the grid), generated in `tours_faq`
5. **Package pages.** TouristTrip plus BreadcrumbList already exist. Add `"provider": {"@id": "#agency"}` and `"touristType"` where obvious ("Families", "Groups"). For the departed Shanghai tour, content L2 applies.
6. **Do not add** `aggregateRating` until there are real on-site reviews. Self-serving review markup is ignored and risks a manual action.

---

## Priority order (what to ship first)

1. Section 3 titles, descriptions and H1s on the 10 static pages, plus the `SEO_TITLES` / `seoDesc` change in build.py. Rebuild and resubmit the sitemap.
2. Answer-first intros on home, tours, car-rental, the Bohol, Camotes, Hanoi and Japan package pages.
3. GBP claim, categories, products, and an hours request to the agency. Fix the "Tour Services" logo subtitle.
4. JSON-LD `@id` provider references, `contactPoint` with the landline, and `areaServed`.
5. New page 4.1 (no agency input needed), then 4.3 and 4.2 once the agency answers.
