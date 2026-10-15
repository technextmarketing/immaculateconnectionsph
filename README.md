# Immaculate Connections Travel Agency — website redesign

Redesign of [immaculateconnectionsph.com](https://www.immaculateconnectionsph.com/) as a fast, static, five-page site.

**Live preview:** https://technextmarketing.github.io/immaculateconnectionsph/

No framework. Pages are plain HTML; one small Python build (`tools/build.py`, see **Build** below) minifies the styles and scripts and writes the 15 package pages. Upload the folder to any static host or serve it with GitHub Pages.

All copy, packages, inclusions, places, photos and the logo come from the agency's existing website. Photos were downloaded from the agency's Wix media library into `assets/img/media/` (see Photos below).

See [AUDIT.md](AUDIT.md) for the full audit of the current site, the pain points found, and how this redesign addresses them.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: a travelogue hero (a destination photo the camera keeps moving on, with the place name and a timer; in front, the agency's own group photos as a pile of framed prints that can be thrown to the back by tap, drag, swipe, arrows or keyboard, with a thumbnail picker), the credibility figures, then the welcome copy with the rotating "now booking" line and the quick quotation card, followed by special offers, services, featured packages, gallery and FAQ. Hero photos live in `assets/img/hero` (`dest-*` backgrounds at 2000/1200 px, `print-*` 820x615, `thumb-*`); captions and places are set in the hero markup. |
| `services.html` | Ticketing, Hotel Bookings & Reservations, Transport Service Reservations (vans, coasters, bus, 4-seater), Local & International Tour Packages, and Meetings, Incentives, Conferences, Exhibitions, Trainings & Seminars. Flight and event quote forms pre-fill the inquiry page. |
| `tours.html` | All 15 packages with combinable filters: search (places, inclusions, itinerary days), destination tabs, trip length, departing from (Cebu / Manila), travel month (from the departure dates; local tours without fixed dates count for every month), status (past departures hidden unless asked for) and must-include chips (airfare, hotel, meals, boat ticket, transport, guide, entrance fees, insurance). Every option shows its live count and empty options are disabled; active filters show as removable chips; the choices are kept in the address (`?country=vietnam&len=4-5&month=2026-12&inc=Airfare`) so a filtered list can be shared. Sort: recommended, next departure, price, length, name. Each package is a horizontal row (`tourRow` in `main.js`, `.trow` styles in `components.css`), two per line on wide screens: the whole itinerary poster uncropped on the left (tap for every poster in the viewer; local packages show their photo), then the facts, a two-line summary, one line per itinerary day and the price. The first view of the grid is pre-rendered by the build. |
| `package-<id>.html` | One real page per package, written by `tools/build.py` from `package.html` and the package's entry in `data.js`: its own title, description, share image (`assets/img/media/og-pkg-<id>.jpg`), canonical address and structured data, with the page body already rendered (hero, sticky section tabs, photo gallery, travel dates first, overview, itinerary, inclusions, places, posters, related packages). The script still runs there and refreshes dates and availability. |
| `package.html` | The template for those pages, and the old `package.html?id=<package-id>` address, which now forwards to `package-<id>.html`. Kept out of search (`noindex`). |
| `payment.html` | Held back, not linked from anywhere: the payment step is off until the agency confirms a booking flow (`CONFIG.payments`). It states that nothing is collected on the website. |
| `car-rental.html`, `hotel-booking.html`, `ticketing.html`, `mice.html` | The four service pages under the Services menu. The hero is the service's own document (trip ticket, stay voucher, boarding pass, event badge) that fills in live as the visitor types in the inquiry form beside it; the form continues to `contact.html` with the details filled in (`page=` tells the inquiry page to open on the contact step). Below it a journey storyboard (five scenes that follow the step being read), then the service's own sections. Behaviour in `assets/js/pages.js`, styles in `assets/css/pages.css`. |
| `about.html` | Why choose us, the four values, mission and vision, clickable team cards (three per row) that open profiles, previous tours gallery, contact details. |
| `team.html` | Individual team-member profile (`team.html?member=<slug>`): hero with photo/initials, bio, what they handle, focus areas, an at-a-glance side card and the other members. Content comes from `IC.team` in `data.js`. |
| `contact.html` | Three-step inquiry form delivered to `immaculateconnectionsph@gmail.com`. On submit it renders a printable quotation the traveller can download, email or send on Messenger. No payment is requested. |

## Inquiry form delivery

The form posts to FormSubmit's AJAX endpoint for `immaculateconnectionsph@gmail.com` (see `CONFIG.formEndpoint` in `assets/js/main.js`). No account is needed.

**One-time activation:** the first time the form is submitted from the live domain, FormSubmit emails `immaculateconnectionsph@gmail.com` with an "Activate form" link. Click it once and every later submission is delivered directly to the inbox (subject line `Website inquiry: <service> – <package>`, fields as a table, reply-to set to the traveller's email). If sending fails for any reason, the page offers the traveller an email and a Facebook Messenger fallback carrying the same details.

Optional hardening after activation: FormSubmit provides a hashed alias for the address; paste it into `CONFIG.formEndpoint` to keep the raw email out of the page source.

## Quotation flow

`Inquiry form → quotation → download, email or Messenger`

There is no payment step. Destinations, travel dates and final pricing are
confirmed by the reservations team first, and payment instructions are issued
only with the official quotation that team sends.

1. **The traveller submits the form.** The inquiry is emailed to `immaculateconnectionsph@gmail.com` with a quotation reference in the subject line (`Website inquiry ICQ-260909-4821: Tour package – …`).
2. **A quotation appears on screen straight away.** It carries the quotation number, issue and validity dates, the traveller's details, the booking details they entered, an estimated cost (rate × number of travellers when the package has a published rate), inclusions and exclusions, the itinerary at a glance and the terms. It states that the agency will contact the traveller directly by email.
3. **The same quotation is emailed to the traveller.** FormSubmit's auto-response sends a plain-text copy with the reference, the details, the estimate and the next steps.
4. **Download.** The *Download quotation* button opens the print dialog; choosing **Save as PDF** produces a clean one-document PDF (headers, navigation, forms and buttons are stripped by the print stylesheet in `assets/css/quotation.css`).
5. **Send it to us.** *Email a copy* and *Message us* carry the same details to the agency in one tap, which is also the fallback if automatic delivery ever fails.
6. **No payment step.** `CONFIG.payments` is `false`, so the *Proceed to payment* button stays hidden and `payment.html` is unlinked. Set it to `true` and fill in `CONFIG.payment` once the agency has a confirmed booking flow, and the button reappears carrying only the quotation reference, package name, service and estimated amount in the URL.

**Preview the template without sending anything:** open `contact.html?preview=quote`. It fills the document with sample data so layout, print and download can be checked. Nothing is submitted and no email is sent.

**Payment details.** `CONFIG.payment` in `assets/js/main.js` is empty and `CONFIG.payments` is `false`, so the payment step is switched off everywhere. Set the switch and fill in the arrays together, and the cards appear automatically:

```js
payment: {
  bank: [{ bank: 'BDO', name: 'Immaculate Connections Travel Agency', number: '0000 0000 0000' }],
  ewallet: [{ name: 'GCash', account: 'Immaculate Connections', number: '0917 000 0000' }],
  link: ''   // optional online checkout; shows a "Pay online now" button
}
```

## B2B partner quotations

`contact.html` opens on two tabs: **Traveller inquiry** (the three-step form above) and **Partner quotation** (B2B). The partner tab stays locked until a partner code is entered in the optional *Booking for clients?* bar, or arrives in a link: `contact.html?partner=CODE` (the code is removed from the address bar straight away and kept for that browser tab only).

- A valid code opens a separate one-page form: company and contact, quotation type (tour package, custom itinerary, hotel block, transport, ticketing, MICE), package, route, dates, adults / children / tour leaders, rooms, hotel class, meals, what to include, rate basis (net or commissionable), currency, deadline, budget and notes.
- It posts to the same inbox with its own reference (`ICB-261013-4821`), the partner type and the code in the email, and gives the partner a printable copy of the request. Nothing is priced on the page.
- **Codes:** only a SHA-256 of each code is in `CONFIG.partnerCodes` (`assets/js/main.js`), never the code itself, so do not write the plain codes in this public repository. Add one with `python tools/partner_code.py NEW-CODE "Label"` and paste the printed line; delete a line to retire a code. Codes ignore case, spaces and dashes. This is a convenience gate, not security: every request is still checked by the team.

## Where to edit

- **Contact details** (mobile, landline, email, Facebook, address): `CONFIG` at the top of `assets/js/main.js`. All `data-tel`, `data-landline`, `data-mail`, `data-fb` and `data-msg` links read from it.
- **Packages, inclusions, places, photos, posters, ticker**: `assets/js/data.js`. Give a package `travelDates` (and `year` / per-date `y`) or an `ends` date and it is marked **Departed** automatically once every date has passed; departed packages move to the "Archive" filter and off the home page. Add a package once and it appears on the home tabs, the tours page, the details modal and the inquiry dropdown.
- **Colours and fonts**: `:root` in `assets/css/style.css`. Quotation and payment styling, including the print rules, live in `assets/css/quotation.css`.
- **Inclusion tags on cards** (Airfare, Hotel, Meals, Transport, Tour guide, Entrance fees, Insurance and so on) are derived automatically from each package's `inclusions` list by `INC_TAGS` in `assets/js/main.js`.
- **Travel dates** on a package page link straight to the inquiry form with the package and the chosen departure pre-filled.
- **Team cards on the About page**: `IC.team` in `assets/js/data.js`. Each entry is a desk in the agency. Add a `name` (and optionally a `photo`, using a media id from the `LOCAL` map in `data.js`, plus a direct `email`) and the card becomes a personal profile with the person's name as the title and the desk as the subtitle. Leave `name` empty and the card shows the desk with the agency's own service icon, so the section stays accurate until real names and photographs are supplied.
- **Header and footer**: `_partials/header.html` (with the Services menu and the phone drawer) and `_partials/footer.html`. The build copies them into every page between `<!-- build:header -->` and `<!-- build:footer -->` markers, so edit the partials, never the copies.
- **Copy**: the HTML files. Don't edit `package-*.html` (rebuilt from `package.html`) or the `.min` files.
- **After any edit** to a stylesheet, a script, `package.html` or a package in `data.js`, run `python tools/build.py` (see **Build**).

## Build

```bash
pip install rcssmin websocket-client pillow
python tools/build.py          # bundles, package pages, Tours grid, sitemap (needs Google Chrome)
python tools/build.py assets   # bundles only
```

- **Bundles.** Every page loads `assets/css/site.min.css` (`fonts.css` + `style.css` + `components.css`), `assets/js/site.min.js` (`data.js` + `main.js`), plus `hero.min.css` on the home page and `quotation.min.css` on contact and payment. The build stamps each page's `?v=` with a hash of the bundle, so there is no version to bump by hand. The deploy workflow runs `tools/build.py assets` on every push, so a forgotten local build still ships the latest styles and scripts.
- **Package pages.** The build opens each package in headless Chrome, takes the markup the site's own script renders and writes `package-<id>.html`. Rebuild when a package is added, removed or renamed, or its summary or photo changes. Dates and availability refresh by themselves in the browser.
- **Tours grid.** The first view of the Tours page (tabs, count, cards) is written into `tours.html` between `<!-- build:... -->` markers, so the page doesn't jump when the script draws it.
- **Fonts** are hosted with the site in `assets/fonts/` (Playfair Display, Raleway, Dancing Script, Inter; SIL Open Font License), declared in `assets/css/fonts.css` with size-matched fallbacks so text doesn't move when they load.
- **Moving content** (home hero, photo piles, ticker, page hero cameras) has a pause / play button; `Motion` in `main.js`.

## Photos

All photos live in `assets/img/media/` (nothing is loaded from Wix any more). Every photo has a WebP copy next to the JPEG, and the pages load the WebP; the JPEGs are the masters and the share images (`og-*.jpg`) stay JPEG because every network reads it. The home pile's prints also have a 640px copy for phones (`print-N-640.webp`). Add a WebP copy when adding a photo. Each photo keeps its original media id as the key of the `LOCAL` map at the top of `assets/js/data.js`; the map points to the file, and JPEGs also have an `-800` copy for cards. To add a photo: drop the file (up to 1600 px on the long side, plus an 800 px copy for JPEGs) into the folder and add one line to the map, then refer to it by that id in the package data. Social-share cards are the `og-*.jpg` files (1200×630).

## Hero photo credits

Every page opens on a photo from `assets/img/hero/`. Unsplash photos are free for commercial use (credit appreciated). Wikimedia Commons photos keep their licence: CC BY-SA 4.0 needs the credit below and the adapted file shared under the same licence; CC0 needs nothing. Which package uses which photo is set in `IC.destHero` in `assets/js/data.js`.

- `dest-bohol-*`: photo by Zed Benson on Unsplash (https://unsplash.com/photos/chocolate-hills-bohol-philippines-tyMVaFXcksU), Unsplash License
- `dest-danang-*`: photo by Linda Gerbec on Unsplash (https://unsplash.com/photos/golden-bridge-held-by-giant-hands-in-vietnam-CsoQ-jm_0vQ), Unsplash License
- `dest-palawan-*`: photo by Roman Lezhnin on Unsplash (https://unsplash.com/photos/kayaking-through-turquoise-water-surrounded-by-mountains-Tx6hqbZuHPo), Unsplash License
- `dest-fuji-*`: photo by Max Bender on Unsplash (https://unsplash.com/photos/pagoda-and-mount-fuji-in-japan-FuxYvi-hcWQ), Unsplash License
- `dest-boracay-*`: photo by Edward Ang on Unsplash (https://unsplash.com/photos/a-group-of-sailboats-sailing-on-a-body-of-water-near-palm-trees-7pUL8o7e8bQ), Unsplash License
- `dest-halong-*`: photo by Marina Lobato on Unsplash (https://unsplash.com/photos/boats-on-turquoise-ha-long-bay-kG7pOXbBfNs), Unsplash License
- `dest-coron-*`: photo by Junel Mujar on Unsplash (https://unsplash.com/photos/a-group-of-boats-floating-on-top-of-a-lake-surrounded-by-trees-IzcFq844SKk), Unsplash License
- `dest-moalboal-*`: photo by Ken Suarez on Unsplash (https://unsplash.com/photos/aerial-photography-of-several-white-boats-near-island-oO7d1Q9mJZQ), Unsplash License
- `dest-cebu-{2400,1280,960}`: photo by Jaye Hernandez on Unsplash (https://unsplash.com/photos/a-view-of-a-city-and-a-body-of-water-n4-7eI0aOtU), Unsplash License
- `dest-shanghai-*`: photo by Freeman Zhou on Unsplash (https://unsplash.com/photos/lujiazui-skyline-at-the-bund-shanghai-oV9hp8wXkPE), Unsplash License
- `dest-yunnan-*`: photo by Morgan Fung on Unsplash (https://unsplash.com/photos/the-mountains-are-reflected-in-the-still-water-of-the-lake-SU-GSBsHNJ8), Unsplash License
- `dest-sky-*`: photo by Johny Goerend on Unsplash (https://unsplash.com/photos/white-and-black-airplane-wing-over-white-clouds-during-daytime-KB9r_hTzyeQ), Unsplash License
- `dest-cebu-night-*`: photo by Zany Jadraque on Unsplash (https://unsplash.com/photos/long-exposure-photo-of-urban-city-with-lights-wptXOM6JytM), Unsplash License
- `dest-cebu-aerial-*`: photo by Fritz Gabriel Carilo on Unsplash (https://unsplash.com/photos/birds-eye-view-photography-of-buildings-fulyk6dVFSQ), Unsplash License
- `dest-hoian-lanterns-*`: photo by Hieu Do Quang on Unsplash (https://unsplash.com/photos/a-bunch-of-lanterns-that-are-hanging-from-a-tree-nj70WidlPjc), Unsplash License
- `dest-sapa-*` and `media/vn-sapa*`: photo by Denis Sobnakov on Unsplash (https://unsplash.com/photos/the-sun-is-setting-over-a-green-valley-DY5cv04E42I), Unsplash License
- `dest-fansipan-train-*` and `media/vn-fansipan-train*`: photo by Vivu Vietnam on Unsplash (https://unsplash.com/photos/a-red-and-yellow-train-traveling-down-a-mountain-side-W6ynUCrM_24), Unsplash License
- `dest-dragon-bridge-*` and `media/vn-dragon-bridge*`: photo by Christian on Unsplash (https://unsplash.com/photos/a-large-fire-breathing-sculpture-is-lit-up-at-night-NsUrkNKt-kY), Unsplash License
- `dest-hanoi-train-street-*` and `media/vn-hanoi-train-street*`: photo by Ryan Le on Unsplash (https://unsplash.com/photos/a-train-traveling-down-train-tracks-next-to-a-crowd-of-people-EKFPwbPkDec), Unsplash License
- `dest-hoian-boats-*` and `media/vn-hoian-boats*`: photo by Hieu Do Quang on Unsplash (https://unsplash.com/photos/a-group-of-people-in-small-boats-on-a-river-owU4CVUvEyM), Unsplash License
- `dest-danang-beach-*` and `media/vn-danang-beach*`: photo by Thach Tran on Unsplash (https://unsplash.com/photos/an-aerial-view-of-a-beach-and-a-city-w_0Dk0_JN3A), Unsplash License
- `dest-halong-boat-*` and `media/vn-halong-boat*`: photo by Andre Ouellet on Unsplash (https://unsplash.com/photos/white-and-black-boat-on-water-near-mountain-during-daytime--0hW5I7eRJE), Unsplash License
- `dest-hanoi-flags-*` and `media/vn-hanoi-flags*`: photo by Hieu Tran on Unsplash (https://unsplash.com/photos/red-flags-on-brown-concrete-building-during-daytime-cc6st2qGZjE), Unsplash License
- `dest-dragon-bridge-day-*` and `media/vn-dragon-bridge-day*`: photo by Vincent Yap on Unsplash (https://unsplash.com/photos/dragon-bridge-in-da-nang-D3KnI5O5v2Y), Unsplash License
- `dest-golden-bridge-walk-*` and `media/vn-golden-bridge-walk*`: photo by Andreea Popa on Unsplash (https://unsplash.com/photos/people-walking-on-bridge-during-daytime-PknaOrb1lVo), Unsplash License
- `dest-marble-mountains-*` and `media/vn-marble-mountains*`: photo by Christian on Unsplash (https://unsplash.com/photos/a-building-with-a-statue-on-top-of-it-5XIW-AMQLyA), Unsplash License
- `media/vn-danang*`, `media/vn-halong*`, `media/vn-hoian-lanterns*`: card copies of the `dest-danang`, `dest-halong` and `dest-hoian-lanterns` photos above
- `dest-great-wall-*` and `media/cn-great-wall*`: photo by Hanson Lu on Unsplash (https://unsplash.com/photos/great-wall-of-china-china-_8EFj6ISA08), Unsplash License
- `dest-zhangjiajie-*` and `media/cn-zhangjiajie*`: photo by Robynne O on Unsplash (https://unsplash.com/photos/sandstone-pillars-in-zhangjiajie-national-park-CRvaC071ZXo), Unsplash License
- `dest-harbin-ice-*` and `media/cn-harbin-ice*`: photo by lin zhaohai on Unsplash (https://unsplash.com/photos/a-group-of-people-standing-around-an-ice-sculpture-HjnrjKUUhlY), Unsplash License
- `dest-chongqing-night-*` and `media/cn-chongqing-night*`: photo by lastmayday on Unsplash (https://unsplash.com/photos/nighttime-skyline-with-a-bright-red-bridge-Du5FXCrcW9c), Unsplash License
- `dest-west-lake-*` and `media/cn-west-lake*`: photo by A F on Unsplash (https://unsplash.com/photos/people-on-brown-wooden-dock-during-daytime-r6WjJfTuwQ8), Unsplash License
- `dest-cruise-ship-*` and `media/cn-cruise-ship*`: photo by Georgy Trofimov on Unsplash (https://unsplash.com/photos/white-cruise-ship-on-sea-during-daytime-xEJoSsDCnR8), Unsplash License
- `dest-shanghai-disney-*` and `media/cn-shanghai-disney*`: photo by Capricorn song on Unsplash (https://unsplash.com/photos/brown-and-blue-concrete-castle-under-blue-sky-during-daytime-BLYq8Qk8Q98), Unsplash License
- `dest-forbidden-city-*` and `media/cn-forbidden-city*`: photo by Rafik Wahba on Unsplash (https://unsplash.com/photos/guardian-lion-at-hall-of-supreme-harmony-LkyYLdL3WxE), Unsplash License
- `dest-wuzhen-*` and `media/cn-wuzhen*`: photo by Calvin Wong on Unsplash (https://unsplash.com/photos/a-bridge-over-a-body-of-water-at-night-0UkWI-xxV9Y), Unsplash License
- `media/cn-shanghai*`, `media/cn-yunnan*`: card copies of the `dest-shanghai` and `dest-yunnan` photos above
- `dest-panda-*` and `media/cn-panda*`: photo by Pascal Müller on Unsplash (https://unsplash.com/photos/two-white-and-black-pandas-lying-on-floor-during-daytime-4EajIuUxgAQ), Unsplash License
- `dest-jiuzhaigou-*` and `media/cn-jiuzhaigou*`: photo by Say Wah Lee on Unsplash (https://unsplash.com/photos/a-river-surrounded-by-a-forest-filled-with-lots-of-trees-DkJd8Ve-0Ts), Unsplash License
- `dest-terracotta-*` and `media/cn-terracotta*`: photo by Aaron Greenwood on Unsplash (https://unsplash.com/photos/terracotta-soldiers-xZDWEEMS3sA), Unsplash License
- `dest-guilin-*` and `media/cn-guilin*`: photo by Conny Schneider on Unsplash (https://unsplash.com/photos/a-group-of-people-riding-on-top-of-a-boat-NOoAtNhIh-4), Unsplash License
- `dest-potala-*` and `media/cn-potala*`: photo by Mauricio Manzato on Unsplash (https://unsplash.com/photos/the-potala-palace-towers-above-a-mountain-T1EmuU0819Y), Unsplash License
- `dest-xinjiang-*` and `media/cn-xinjiang*`: photo by Wang John on Unsplash (https://unsplash.com/photos/green-grass-field-near-mountain-under-blue-sky-during-daytime-L9SEgCJ1TMc), Unsplash License
- `dest-inner-mongolia-*` and `media/cn-inner-mongolia*`: photo by Charles MingZ on Unsplash (https://unsplash.com/photos/a-yurt-in-a-field-with-mountains-in-the-background-NuAWwfD_j24), Unsplash License
- `dest-qingdao-*` and `media/cn-qingdao*`: photo by R HAI on Unsplash (https://unsplash.com/photos/an-aerial-view-of-a-city-and-a-body-of-water-BZrJ5tcuJE0), Unsplash License
- `dest-sanya-*` and `media/cn-sanya*`: photo by Weichao Deng on Unsplash (https://unsplash.com/photos/ocean-waves-crashing-on-shore-during-sunset-HCoylGhhqQg), Unsplash License
- `dest-yangtze-*` and `media/cn-yangtze*`: photo by Dong Zhang on Unsplash (https://unsplash.com/photos/body-of-water-in-between-mountains-under-white-sky-at-daytime-vfaYObaMRew), Unsplash License
- `dest-fenghuang-*` and `media/cn-fenghuang*`: photo by Shihan Yin on Unsplash (https://unsplash.com/photos/a-river-running-through-a-city-next-to-tall-buildings-SdmYyjzweHg), Unsplash License
- `dest-guizhou-*` and `media/cn-guizhou*`: photo by Howen on Unsplash (https://unsplash.com/photos/an-aerial-view-of-a-village-in-the-mountains-51Lbr9j6T7c), Unsplash License
- `dest-longmen-*` and `media/cn-longmen*`: photo by Eric Zhang on Unsplash (https://unsplash.com/photos/a-large-statue-of-a-buddha-in-a-cave-8YTGBuffXuc), Unsplash License
- `dest-pingyao-*` and `media/cn-pingyao*`: photo by Peter Burdon on Unsplash (https://unsplash.com/photos/an-aerial-view-of-a-city-with-many-roofs-9xuTzaAw5i4), Unsplash License
- `dest-wuyishan-*` and `media/cn-wuyishan*`: photo by Yihan Wang on Unsplash (https://unsplash.com/photos/a-green-field-with-mountains-in-the-background-obJrTa2446I), Unsplash License
- `dest-wuhan-*` and `media/cn-wuhan*`: photo by Bo Zhang on Unsplash (https://unsplash.com/photos/a-tall-building-with-a-yellow-roof-surrounded-by-trees-C2z6-TWsooU), Unsplash License
- `dest-jeju-*` and `media/cn-jeju*`: photo by Lightscape on Unsplash (https://unsplash.com/photos/cliff-near-body-of-water-during-daytime-JjnCtpzFXo4), Unsplash License
- `dest-qinghai-*` and `media/cn-qinghai*`: photo by ran liwen on Unsplash (https://unsplash.com/photos/a-large-body-of-water-sitting-next-to-a-lush-green-field-HyGqaGRESGw), Unsplash License
- `dest-xiamen-*` and `media/cn-xiamen*`: photo by 拍照铺 pjoup on Unsplash (https://unsplash.com/photos/an-aerial-view-of-a-city-and-a-body-of-water-30LZG4gvIE0), Unsplash License
- `dest-lijiang-*` and `media/cn-lijiang*`: photo by Noppon Meenuch on Unsplash (https://unsplash.com/photos/a-scenic-view-of-a-mountain-range-with-a-lake-in-the-foreground-buk8ZfFM5IA), Unsplash License
- `dest-shanghai-night-*` and `media/cn-shanghai-night*`: photo by Himmel S on Unsplash (https://unsplash.com/photos/a-view-of-a-city-at-night-from-across-the-water-QfMMmk7arb4), Unsplash License
- `dest-universal-beijing-*` and `media/cn-universal-beijing*`: photo by fan yang on Unsplash (https://unsplash.com/photos/a-street-sign-in-front-of-a-castle-MKSgu-4WZiA), Unsplash License
- `dest-xishuangbanna-*` and `media/cn-xishuangbanna*`: photo by kev1n Z on Unsplash (https://unsplash.com/photos/lighted-building-near-body-of-water-during-night-time-x7zeYK0OjQY), Unsplash License
- `dest-shenzhen-*` and `media/cn-shenzhen*`: photo by Robert Bye on Unsplash (https://unsplash.com/photos/landscape-photo-of-a-city-skyline-xQdUIo_MSQ4), Unsplash License
- `dest-misty-mountains-*` and `media/cn-misty-mountains*`: photo by Sherry Xu on Unsplash (https://unsplash.com/photos/a-view-of-a-mountain-range-covered-in-fog-YNximhgXa9k), Unsplash License
- `dest-tokyo-*` and `media/jp-tokyo*`: photo by Jezael Melgoza on Unsplash (https://unsplash.com/photos/cars-in-neon-shibuya-intersection-alY6_OpdwRQ), Unsplash License
- `dest-osaka-castle-*` and `media/jp-osaka-castle*`: photo by Jeremy Santana on Unsplash (https://unsplash.com/photos/white-and-black-concrete-building-near-green-trees-during-daytime-7_puF4jioPo), Unsplash License
- `dest-kyoto-*` and `media/jp-kyoto*`: photo by Kazuo ota on Unsplash (https://unsplash.com/photos/black-metal-fence-near-brown-concrete-building-during-daytime-UgojrqCaNu0), Unsplash License
- `dest-hokkaido-*` and `media/jp-hokkaido*`: photo by Graeme Cross on Unsplash (https://unsplash.com/photos/land-covered-in-snow-AGpwHgBO-Zg), Unsplash License
- `dest-shirakawago-*` and `media/jp-shirakawago*`: photo by Hyungman Jeon on Unsplash (https://unsplash.com/photos/a-snow-covered-village-in-the-middle-of-a-forest-8nM5OvAtP4k), Unsplash License
- `dest-okinawa-*` and `media/jp-okinawa*`: photo by Shino Nakamura on Unsplash (https://unsplash.com/photos/a-beach-with-people-walking-on-it-UHgogyYReFM), Unsplash License
- `dest-hakone-*` and `media/jp-hakone*`: photo by Snowscat on Unsplash (https://unsplash.com/photos/a-large-body-of-water-with-a-mountain-in-the-background-FTBZMXZtdT8), Unsplash License
- `media/jp-fuji*`: card copies of the `dest-fuji` photo above
- `svc-road-palms-*`: photo by Mae De los Santos on Unsplash (https://unsplash.com/photos/an-empty-road-surrounded-by-palm-trees-under-a-cloudy-blue-sky-JCShU4j-jr8), Unsplash License
- `svc-stay-anda-*`: photo by Bryan Agua on Unsplash (https://unsplash.com/photos/photo-of-four-loungers-under-gazebo-facing-swimming-pool--HTTS0vxkVU), Unsplash License
- `svc-stay-panglao-*`: photo by Brian Kairuz on Unsplash (https://unsplash.com/photos/blue-calm-sea-under-blue-and-white-skies-hiqElPJaLbM), Unsplash License
- `svc-fly-wing-*`: photo by Madison Olling on Unsplash (https://unsplash.com/photos/view-of-airliner-wing-6wmxDOa_AO4), Unsplash License
- `svc-fly-panglao-*`: photo by Kylle Pangan on Unsplash (https://unsplash.com/photos/a-large-building-with-a-green-roof-and-a-curved-walkway-MZPiA5MNa6M), Unsplash License
- `svc-mice-audience-*`: photo by Headway on Unsplash (https://unsplash.com/photos/crowd-of-people-sitting-on-chairs-inside-room-F2KRf_QfCqw), Unsplash License
- `dest-camotes-*`: photo by Rollymagpayo on Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Pier_in_Camotes_Islands.jpg), CC BY-SA 4.0
- `dest-camotes-sunset-*`: photo by Headshop5 on Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Sunset_in_the_Camotes_Islands.jpg), CC0
- `group-*.jpg`, `print-*`, `thumb-*`: the agency's own group photos

## Go-live checklist

- **FormSubmit activation:** submit the inquiry form once from the live site and click the activation link that arrives at `immaculateconnectionsph@gmail.com`.
- **Domain:** live at https://www.immaculateconnectionsph.com/ since 14 Oct 2026. DNS stays at Wix (ns0/ns1.wixdns.net): A `@` -> 185.199.108-111.153, CNAME `www` -> technextmarketing.github.io, custom domain set under Settings -> Pages. Keep the Microsoft 365 MX/TXT/CNAME records (email for `inquiries@`) untouched. `CONFIG.siteUrl` in `main.js`, `SITE` in `tools/build.py`, canonical tags, `og:url`, `sitemap.xml` and `robots.txt` carry this address.
- **Team profiles:** the team section on the About page stays hidden while every entry in `IC.team` (data.js) is marked `placeholder: true`. Put in the real names and photos and drop `placeholder` from each one, and the section and `team.html` profiles appear; then remove the `noindex` tag from `team.html` and the `Disallow: /team.html` line in `robots.txt`.
- **Payments:** `payment.html` is `noindex` and unlinked while `CONFIG.payments` is false. When payments are switched on, remove that tag and the `Disallow` line.
- **Departure rule:** a travel date closes on its departure day (same as the Immaculate Ops dashboard).

## Publishing

Every push to `main` is deployed to GitHub Pages by `.github/workflows/deploy-pages.yml` (Pages source: GitHub Actions). The live site is https://www.immaculateconnectionsph.com/ (custom domain on GitHub Pages). To move to another static host, upload the folder:

```bash
python -m http.server 8080 --directory .
```

## Items the agency should confirm

- Prices or "from" rates per package (the site currently states none, so the redesign shows "Quotation on request").
- Text itineraries for Siargao, Hong Kong, Japan and China.
- DOT accreditation and business registration numbers for the footer.
- Office hours and payment / cancellation terms.

## Gallery and chat assistant (added 14 Oct 2026)

- **Gallery** (`gallery.html`, linked in the header): 13 trip videos and every photo in `IC.gallery`. The page is generated by `~/ClaudeWork/qa/ic_gallery_page.py`; edit the `VIDS` list there and re-run it, then `python tools/build.py assets`. Videos are 720p H.264 MP4s with `-poster.webp` / `-poster-800.webp` stills in `assets/media/gallery/`; trip stills are in `assets/img/media/gallery/` (1600 px + `-800` copy) and are listed at the top of `IC.gallery` in `data.js`. Source footage: Google Drive "ICTS Group Photo / 02. Group Tours Images".
- **Chat assistant** (`assets/js/chat.js`, `assets/css/chat.css`, bundled into `site.min.js` / `site.min.css`): the "Ask us" button above Messenger. It answers only from the site's own data (packages, prices, dates, inclusions, services, contact details) with no external calls, and hands off to the inquiry form, Messenger or a phone call. `IC.chatEndpoint` (off by default) can point it at a future AI back end; the CSP `connect-src` must then allow that address.
