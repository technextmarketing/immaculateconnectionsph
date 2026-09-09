# Website audit: immaculateconnectionsph.com

Audit date: 8 September 2026. Scope: every public page of the current Wix site (Home, Services, Tours dropdown → Local Tours and International Tour, Vietnam, About Us, Inquiries). Findings are grouped by area, each with the evidence seen on the live site and how the redesign in this repository addresses it.

## 1. Summary

The current site has a clear service list and a genuinely useful set of local tour packages, but most of that value is hidden. Titles and copy are unfinished, the main "Tours" link opens an empty page, packages have no prices, durations or detail pages, and the forms carry template placeholders. Trust signals (accreditation, reviews, policies, team) are absent. The redesign keeps the agency's branding, logo, photos and package content and rebuilds the structure around showcasing the services and packages, with working inquiry delivery to `inquiries@immaculateconnectionsph.com`.

## 2. Pain points found

### 2.1 Search visibility and metadata
| # | Finding | Evidence |
|---|---------|----------|
| 1 | Every page title uses the Wix default site name "travel" instead of the business name | `Home | travel`, `Services | travel`, `Local Tours | travel`, `vietnam | travel`, `Inquiries | travel` |
| 2 | No meta description on any page | `<meta name="description">` absent site-wide |
| 3 | No Open Graph or Twitter card tags, so shared links show no preview | Missing `og:*` tags |
| 4 | Non-descriptive URL slugs | `/tours-1`, `/services-5` for the International Tour page |
| 5 | No structured data (TravelAgency / TouristTrip schema) | None detected |
| 6 | Image alt text is missing or is a file name | Alt values such as `7.JPG`, `365666113_1001743050956890_2037425764501592656_n.jpg`, `IMG_5909.JPG`, empty alt on hero images |

### 2.2 Unfinished template content and typos
| # | Finding | Evidence |
|---|---------|----------|
| 7 | Template placeholder paragraph left live | International Tour page: "This is a Paragraph. Click on "Edit Text" or double click on the text box to start editing the content." |
| 8 | Template contact block with a fake phone number | About Us: "I'm always looking for new and exciting opportunities. Let's connect." and "123-456-7890" |
| 9 | Placeholder dropdown options | Event form: "Choice 4"; Inquiry form package list: "Item 1" |
| 10 | Wrong options copied into the flight-quote form | "Trip Type" and "Transportation" dropdowns both list "Social media / Word of mouth / Other" |
| 11 | Spelling and grammar errors in headline service names | "Hotel Bookings & Reservationss", "Air Condictioned Van", "…brings you from point A to B that.", "LOCALLEGISLATORS" |
| 12 | Japan and China are listed as "TOURS" with no page or content behind them | International Tour page links only Vietnam |

### 2.3 Navigation and information architecture
| # | Finding | Evidence |
|---|---------|----------|
| 13 | The main "Tours" menu item opens an empty page | `/tours-1` renders header and footer only |
| 14 | Local and International tours are only reachable through a hover dropdown | Sub-items under "Tours" |
| 15 | "SEE FULL DETAILS" on the home page goes to the inquiry form, not to details | Button href `/inquiries` |
| 16 | Home services list links all five items to the same page anchor-free | All five link to `/services` |
| 17 | Package list on the Inquiry form does not match the Tours page | Form lists "Bohol, Camotes 2 days 1 night, Camotes tour 2, Siargao 3Days 2 nights, Hong kong 4 days 3 nights, Hong Kong 3days 2 nights"; Tours page lists nine differently named packages and no Siargao or Hong Kong |

### 2.4 Package presentation (the core product)
| # | Finding | Evidence |
|---|---------|----------|
| 18 | No prices, "starting from" rates or how to get a quote per package | None on any package |
| 19 | No duration for most packages | Only "Camotes Charms" states "2 days 1 night" |
| 20 | No itinerary, schedule, pick-up point, group size or what is excluded | Packages show only "Inclusions" and "Places" |
| 21 | Three of nine local packages are "Coming Soon!" with a "Book now!" button | Boracay Bliss, El Nido Escapade, Coron Captures |
| 22 | Vietnam content is delivered as image posters only, so it is unsearchable and unreadable on small screens | Five PNG posters, no text itinerary |
| 23 | No package detail pages, no filtering or sorting, no comparison | Single long page of stacked blocks |
| 24 | Home "Tour Packages" section shows posters/photos with no captions or links | Four images, one generic button |

### 2.5 Conversion and trust
| # | Finding | Evidence |
|---|---------|----------|
| 25 | Hero has no call to action | Home hero contains headline and paragraph only |
| 26 | Two different contact emails used on the site | `inquiries@immaculateconnectionsph.com` (footer) and `immaculateconnectionsph@gmail.com` (About, footer "Contact Us") |
| 27 | Phone numbers are plain text, not tap-to-call links | Footer mobile and telephone |
| 28 | No chat or instant-message entry point despite an active Facebook page | Only a "Follow Us" link |
| 29 | No testimonials, ratings, accreditation (DOT/DTI), team, FAQs, or payment and cancellation policies | Absent site-wide |
| 30 | No map, office hours or directions | Address in footer only |
| 31 | Forms give no visible confirmation or expectation of response time | Wix default behaviour |

### 2.6 Design, accessibility and performance
| # | Finding | Evidence |
|---|---------|----------|
| 32 | Low-contrast grey (#868686) headings on light backgrounds fail WCAG AA for large text in places | Computed heading colour `rgb(134,134,134)` |
| 33 | Heading hierarchy is out of order | H4 tagline placed before H2 sections; multiple H2s with "#Tour Highlights" as a heading |
| 34 | Mixed type system | Georgia, Raleway, Arial, Times New Roman, Helvetica Neue and Montserrat all in use |
| 35 | Heavy page weight and slow first render from the Wix runtime and large uncompressed images | Page rendering timed out repeatedly during the audit; posters served as large PNGs |
| 36 | Country-code selector on the inquiry form renders as a 240-item list on the page | Inquiries page text dump |
| 37 | Long footer repeated with duplicate "Inquire Now" and "Contact Us" buttons pointing to different channels | Footer on every page |

## 3. Best practices for a travel agency website

1. **Lead with the products.** Packages should be browsable from the first screen: filters by region and duration, cards with duration, key stops and a clear "Request a quote" action, and a details view with inclusions, places, and what is excluded.
2. **One inquiry path that reaches the inbox.** A single inquiry form that pre-fills the selected package, validates input, confirms submission on screen, and delivers to one monitored address. Phone, Messenger and email as secondary paths, all tap-to-use on mobile.
3. **Be explicit about money and status.** Show a price or "quotation on request", show duration, and mark unfinished packages as "coming soon" rather than offering "Book now".
4. **Show proof.** Real tour photos with captions, event portfolio (the agency already has strong MICE photos), accreditation numbers, and reviews when available.
5. **Consistent, correct details everywhere.** One email, one mobile, one landline, one address, one Facebook page, repeated identically on every page and in structured data.
6. **Fast, accessible and mobile-first.** Static pages, compressed and lazy-loaded images, readable contrast (≥ 4.5:1), correct heading order, descriptive alt text, keyboard-accessible menus and dialogs.
7. **SEO fundamentals.** Business-name page titles, meta descriptions, Open Graph tags, descriptive URLs, `TravelAgency` schema, and text content (not posters) for itineraries.
8. **Clear services page.** One section per service with what is included, who it is for, and a service-specific quote form.
9. **Copy that is finished.** No template text, no placeholder options, proofread service names.
10. **Trust and policy pages.** FAQs, booking process, payment methods, cancellation terms, privacy note on forms.

## 4. How the redesign addresses each area

| Area | What changed |
|------|--------------|
| Metadata | Business-name titles, meta descriptions and Open Graph tags on every page; `TravelAgency` JSON-LD with the real address, phone, email and Facebook page; descriptive alt text on every image. |
| Content | All template text removed; service names and copy proofread; the five services and all packages carry the agency's own wording, inclusions and places. |
| Navigation | Flat five-item menu (Home, Services, Tour Packages, About Us, Inquiries); tours page with region tabs, search, duration filter and sort; sticky sub-nav on the services page; footer links to local and international packages. |
| Packages | All 15 packages from the site and the inquiry form are listed (9 local, 6 international) with duration, status (available / coming soon / details on request), places, inclusions, and a details modal. Vietnam posters are shown as an enlargeable gallery inside the package. Coming-soon packages say so and invite a custom request instead of "Book now". |
| Conversion | Hero call-to-action and a 60-second quick inquiry card; orange "Inquire Now" in the header; tap-to-call mobile and landline; Facebook Messenger floating button; one consistent email (`inquiries@immaculateconnectionsph.com`). |
| Inquiry form | Three-step form (service → details → contact) that adapts fields to the service, pre-fills the chosen package, validates, and sends straight to `inquiries@immaculateconnectionsph.com` via FormSubmit with an on-screen confirmation and email/Messenger fallback. |
| Trust | Real "Previous Tours" and MICE photos with captions, mission and vision, the agency's four values, an FAQ on how booking works, map and full contact details. Placeholders for accreditation numbers and reviews are intentionally left out rather than invented. |
| Design | The agency's palette (blue #1D67CD, gold #FFB730, orange #F6931E, slate #324158) and logo, serif headings with a script tagline echoing the current site, higher contrast text, consistent two-font system, wave divider and photo-led sections. |
| Performance | Static HTML/CSS/JS, no framework, images served resized from the agency's own media library with lazy loading, reduced-motion support. |

## 5. Recommended next steps for the agency

- Add prices or "from" rates per package and confirm the Siargao, Hong Kong, Japan and China itineraries in text form.
- Provide DOT accreditation and DTI/SEC registration numbers for the footer.
- Collect three to five client testimonials (the LGU orientation course and corporate groups are ideal) with permission to publish.
- Decide one official email (the redesign uses `inquiries@immaculateconnectionsph.com`) and retire the Gmail address from public pages.
- Publish office hours and payment/cancellation terms.
- Activate the FormSubmit delivery link when the first inquiry arrives (one-time email to the inbox), then optionally switch to the hashed alias FormSubmit provides.

## 6. Second-round audit of the redesign (8 September 2026): UI recommendations and edits

Reviewed on the live GitHub Pages build at desktop and mobile widths. Each item lists the recommendation and what was changed.

| # | Finding on the redesign | Recommendation | Status |
|---|-------------------------|----------------|--------|
| U1 | Service card icons (absolutely positioned) overlapped the card titles on the four small cards | Put the icon in the normal flow above the title; let rows grow with content | Fixed |
| U2 | Stats band showed "0" for every counter (the count-up script had been removed) and the numbers added little value | Remove the stats band | Removed, as requested |
| U3 | "How it works" repeated the hero copy and pushed the packages down the page | Remove the section; move users straight from services to packages | Removed, as requested |
| U4 | Package details opened in a modal: not linkable, not shareable, not indexable | Give every package its own page (`package.html?id=…`) with tabs, gallery, itinerary, inclusions, places guide, dates and price, posters and structured data | Done |
| U5 | The Vietnam itinerary posters were shown as images only | Transcribe each poster into a full product: Da Nang 6D4N, Da Nang 5D3N and Hanoi–Sapa–Ha Long Bay 4D3N, each with price, 2026 travel dates and surcharges, inclusions, exclusions, hotels, optional tours and day-by-day itinerary | Done |
| U6 | Packages listed places without explaining them | Add a short location guide for every stop (60+ places) on the package pages | Done |
| U7 | Tour card footer read "Inclusions · 5 included", which is not a buying signal | Show the price when published ("Starts at ₱23,888 / per pax"), otherwise "Quotation on request"; add departure city and duration pills | Done |
| U8 | The primary product (Tour Packages) looked like every other menu item | Highlight it as a gold pill in the header and the mobile drawer | Done |
| U9 | The inquiry form required a "Continue" click after choosing a service | Show the matching form immediately when a service is selected; keep Back available | Done |
| U10 | Home page had no place to surface the published offers | Add a "Special offers 2026" section with price, departure city and number of dates, plus a floating badge on the hero | Done |
| U11 | Poster strip on the home page used generic captions ("Tour package poster") | Replaced by the offers section; posters now live on their package pages with tap-to-enlarge | Done |
| U12 | Hero copy block was heavy on mobile and had no scroll cue | Tint the copy box, add a scroll indicator and a wave divider | Done |
| U13 | Gallery captions only appeared on hover, so touch users never saw them | Always show captions on touch devices | Done |
| U14 | Little motion beyond fade-ins | Add scroll progress bar, 3D tilt with glare on cards, sliding tab indicator, accordion itinerary, thumbnail-swap gallery, sticky mobile quote bar; all respect reduced-motion | Done |
| U15 | Favicon used the full wordmark, unreadable at 16px | Use the bird-and-palms logo mark from the agency's About page | Done |
| U16 | Tours page filters had no way to isolate priced offers or sort by price | Add "Special offers" filter and "Price: low to high" sort | Done |
| U17 | Contact/quote paths did not carry the chosen package | Package page buttons and offer cards pre-fill the inquiry form with the package | Done |

### Still recommended (needs client input)
- Prices for local tours (Bohol, Camotes, Cebu) so those cards can show "from" rates.
- Text itineraries for Siargao, Hong Kong, Japan and China.
- Customer testimonials with permission, and DOT accreditation / DTI numbers for the footer.
- Confirmed office hours and payment / cancellation terms for the FAQ.
- Real photos for Siargao, Japan and China (the current cards reuse generic travel photos from the existing site).

## 7. Third round (9 September 2026): missed posters, status, header, performance, mobile

| # | Finding | Action |
|---|---------|--------|
| P1 | The home-page "Tour Packages" carousel on the current site holds more itinerary posters than first captured | Scraped the full carousel; transcribed Shanghai Mini Kyoto 5D4N (Juneyao Air, out Manila, from USD 369, 25–29 July 2026), Charming Yunnan 8D7N (China Southern, out Manila, from USD 1,488, six 2026 dates) and Japan Tokyo · Yokohama · Mt. Fuji 5D4N (Cebu Pacific, out Cebu, from USD 1,049, eight dates Dec 2026 – Feb 2027) with inclusions, exclusions, hotels, surcharges and child rates |
| P2 | Generic "Japan Tours" and "China Tours" placeholders and the Siargao / Hong Kong entries (present only in the site's inquiry dropdown, with no product content) padded the catalogue | Removed; the catalogue now lists only the 15 packages the agency actually publishes (9 local, 6 international) |
| P3 | No way to tell that a departure had already happened | Automatic "Departed" status when every travel date has passed (Shanghai, July 2026); departed packages sort last, are excluded from the home page, show a notice on their page, and appear under an "Archive: past departures" filter. Individual past dates are greyed out on every package page |
| P4 | The header logo was a 3956 × 4167 px PNG with a mostly transparent canvas, rendering as a tiny mark and downloading ~200 KB three times per page | Header now uses the bird-and-palms mark (cropped, 140 px) with a text wordmark; footer uses a cropped 120 px logo. Applied to all six pages |
| P5 | Page lag: multiple `backdrop-filter` blurs over a continuously animated hero image, CSS blur on a 1920 px poster, tilt handlers on every card, PNG posters served full-size | Removed backdrop blurs and the infinite hero zoom, moved tilt to requestAnimationFrame on service and offer cards only, all Wix images now served as WebP (`enc_auto`) at display size with width/height attributes; package hero uses a 960 px blurred image |
| P6 | "International · Vietnam" labels were redundant | Cards, package pages and breadcrumbs show only the country for overseas packages |
| P7 | Country flags and status were not visible at a glance | Flag (flagcdn) beside the destination on cards, offer cards and package pages; colour-coded status pills (Special offer, Available now, Details on request, Coming soon, Departed) |
| P8 | Footer too tall; no agency credit | Compact footer (≈40 % shorter), link columns hidden on phones, "Powered by TechNext" credit |
| P9 | Mobile audit at 375 px: 4-column footer grid leaked below 640 px; long `<select>` options and the unbreakable email address pushed the contact page 42 px wider than the viewport; icon overlapped the title on the large service card; card buttons overflowed; offer kickers wrapped with a dangling separator | Responsive footer grid; `min-width: 0` on form and card grids with `overflow-wrap: anywhere` on emails; icon placed in flow on small screens; wrapping card buttons; kickers split into separate chips; tighter hero, section and form spacing under 640 px |
| P10 | Poster copy error on the agency's own Japan poster (it repeats the Vietnam hotels and the Han River optional tour) | Not reproduced on the site; flagged here for the agency to correct |
| P11 | Buttons varied in height and width and shifted on hover; scrollbars showed default grey buttons; the mobile scale was still large; "Special offer" appeared on the poster, the badge, a ribbon and the status pill of the same card; the home page listed nine packages | Fixed-height buttons with equal-width groups and no hover jump; transparent scrollbar track and buttons with a slim thumb; 15 px mobile base with smaller headings, buttons, pills and spacing; badge now shows the price tag (or "Departed") and never repeats the status pill; home page shows three packages reshuffled on every load |

## 7. Quotation and payment round (9 September 2026)

| # | Request | What was built |
|---|---------|----------------|
| Q1 | The traveller should receive a quotation, not just a thank-you note | On a successful submission the page renders a full quotation document: reference number, issue and validity dates, prepared-for block, booking details, estimated cost, inclusions and exclusions, itinerary at a glance, terms and signature block |
| Q2 | Email the quotation to the traveller as well as the agency | FormSubmit's auto-response sends the traveller a plain-text copy with the reference, details, estimate and next steps. The agency's copy now carries the reference in the subject line |
| Q3 | State that the agency will contact the client directly by email | A highlighted callout at the top of the notes block names the traveller's own email address and explains what happens next |
| Q4 | The quotation must be downloadable | A print stylesheet strips the site chrome so the browser's *Save as PDF* produces a clean single document; the *Download quotation* button opens that dialog |
| Q5 | Proper design and fonts for a business document | Inter for all data and figures with tabular numerals, Playfair Display for the masthead and title, a printed-stationery layout with a brand rule, ruled sections and a two-column parties block |
| Q6 | A button to proceed to payment | `payment.html` shows the booking summary, the three-step payment process, payment methods and direct contact buttons. It receives only the reference, package, service and estimate, never personal data |
| Q7 | Summarise inclusions as small tags on each package card | Tags such as Airfare, Airport transfers, Hotel, Meals, Transport, Tour guide, Entrance fees, Sightseeing, Insurance, Baggage and Pasalubong are derived from each package's own inclusion list and shown on package cards, offer cards and package pages |
| Q8 | Clicking a travel date should open the inquiry form | Every future departure date is now a link that opens the form with the package, the ISO travel date and a note naming the exact departure window and any surcharge. Past dates stay struck through and unclickable |
| Q9 | Passenger counts were vague ranges | Every count field across the site now takes an exact number instead of a range. The home quick quote, the flight quote and event quote on the services page, and the tour, flight, hotel and event blocks of the inquiry form all use number inputs with a minimum of 1, a sensible maximum and a numeric keypad on mobile. Rooms and guests were converted for the same reason. The quotation now multiplies the published rate by the exact head count, so the estimate is a single figure rather than a range |

No test submission was made, as requested. The first live submission still triggers FormSubmit's one-time activation email to `inquiries@immaculateconnectionsph.com`; the auto-response to travellers starts working once that link is clicked.

## 7. Interface audit, 9 September 2026: header, buttons, mobile and duplication

Checked every page at 1200 px and at 375 px, measuring tap targets, overflow and repeated content.

### Header
| Finding | Change |
|---|---|
| "Tour Packages" was a filled gold pill, reading as a button rather than a menu item and competing with the orange Inquire Now call to action | It is now the same text as its neighbours, set in a heavier weight with a permanent gold underline. The underline turns blue when it is the current page |
| The pill was hidden below 640 px, so the most important link disappeared on phones | Removed that rule; the link now appears in the mobile menu with a gold edge |
| The logo differed between pages | All seven pages already shared identical markup; a single rule now fixes its height at 44 px so it cannot drift again |

### Buttons
Sizes were measured across every page and fall into four deliberate steps: 40 px small, 42 px inside cards, 46 px standard and 52 px large. Weight was unified at 700, and hover no longer shifts a button's position, which previously made rows twitch. Grouped buttons share equal widths so pairs line up.

### Mobile
| Finding | Change |
|---|---|
| The filter panel occupied roughly 450 px before a single package appeared | Search, length and sort fold behind one "Search & sort" control; the country tabs stay visible. The block is now 166 px |
| Country tabs were 35 px tall, below a comfortable tap | Raised to 40 px, with card buttons at 42 px |
| Package cards carried a summary, a places list, inclusion tags and two buttons | The places list is hidden on phones, the summary is clamped to two lines, tags cap at three and the card keeps one full-width action. The photo and title still open the package. Card height fell from 652 px to 478 px |
| The package hero repeated the duration, departure and status shown in the facts grid below | Departure and status chips are hidden on phones |
| The footer ran very long as a single column | Link lists sit in two columns |

### Duplicated content removed
- The call-to-action band repeated the address, both numbers and the email immediately above the footer, which lists all of them. The line is gone from the home, services and about pages.
- The footer "Explore" column repeated Home and About Us from the main menu. Both removed, leaving package links.
- The mobile menu had an "Inquire Now" button directly above its own "Inquiries" menu item. The duplicate button is gone.
- The package sidebar repeated the facts grid line for line. It now shows only the number of departure dates alongside the price and the actions.

---

## 8. Hero section: motion and interaction (9 September 2026)

The home page hero was a still frame with one word-by-word fade. It now has a
choreographed entrance and four things a visitor can actually operate, while
staying inside the performance budget set earlier: transform and opacity only,
no backdrop filters and no looping background zoom.

### Motion
| Effect | How it is built |
|---|---|
| Staged entrance | Each element in the copy column carries `--i` and shares one keyframe, so the kicker, headline, tagline, paragraph, now-booking line, buttons and trust row arrive in sequence. Pure CSS, so the copy is never hidden behind a script |
| Headline reveal | Every word sits in a clipping wrapper and slides up from under it, 80 ms apart. The wrappers open again afterwards so the gold underline that draws itself under "Dream" is not clipped |
| Pointer parallax | One `pointermove` listener writes `--px`, `--py` and the glow position once per frame; the stylesheet decides how far the footage, the light pools, the copy and the quote card travel. Mouse only, and only above 900 px |
| Scroll parallax | One `scroll` listener writes `--sp`; the footage scales gently, the copy drifts up and fades, and the work stops once the hero has left the screen |
| Ambient light | Two radial gradients breathe slowly behind the footage, and one gold sweep crosses the hero as the page settles. Gradients rather than blur filters, so there is nothing to rasterise |
| Water line | The wave at the foot of the hero is now two layers swaying gently out of step |

### Interaction
| Element | What it does |
|---|---|
| "Now booking" line | Cycles through the packages that are actually bookable — flag, short name and starting price — and links straight to the one on show. A gold progress bar tracks the cycle; hovering, focusing or leaving the tab pauses it |
| Destination chips | The six markets we sell, under the destination field. One tap fills the field, tapping again clears it, and typing by hand keeps the matching chip in step |
| Progress meter | Counts how many of the four basics are filled and reads "Ready to send" at four, when the send button picks up a slow sheen |
| Video control | A pause and play button for the background footage, which WCAG asks for on any moving content. It appears only once the clip is really playing |
| Buttons and cue | The two hero buttons carry a small light that follows the cursor; the scroll cue is now a real control that takes the visitor to the special offers |

### Notes from the work
- `.split` was already a two-column section layout in `style.css`, so the class the headline splitter adds is `.is-split`. The collision made the headline lay out as a grid.
- The `hidden` attribute lost to `.btn { display: … }`, which left "hidden" buttons on the page. `[hidden] { display: none !important; }` now sits with the base overrides.
- Everything above is switched off under `prefers-reduced-motion`, and the pointer effects never run on a touch screen.

## 9. No payment step until details and pricing are confirmed (9 September 2026)

A quotation produced from published rates is an estimate: the destinations, the
travel dates and the final price are only real once the reservations team has
checked them. Asking for money before that point is the wrong order, so the
website no longer offers a payment step at all.

| Change | Where |
|---|---|
| `CONFIG.payments` switch, off by default and guarded by `payReady()`, which also requires real account details | `assets/js/main.js` |
| The *Proceed to payment* button is hidden; the quotation now offers *Download quotation*, *Email a copy* and *Message us* | `contact.html`, `assets/js/main.js` |
| A line under the actions explains that pricing is confirmed by the team first and that no payment is requested on the website | `contact.html` |
| The quotation document states plainly that no deposit or payment is requested through the website, and that payment instructions come only with the official quotation. Its status reads "Estimate · for confirmation" | `buildQuotation()` |
| The traveller's emailed copy says the same in its "what happens next" steps | auto-response text |
| `payment.html`, now unlinked, states that nothing is collected on the website | `initPayment()` |

Turning the step back on later is one line: set `payments: true` and fill in
`CONFIG.payment` with the agency's bank and e-wallet details.

