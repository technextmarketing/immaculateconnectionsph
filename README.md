# Immaculate Connections Travel Agency — website redesign

Redesign of [immaculateconnectionsph.com](https://www.immaculateconnectionsph.com/) as a fast, static, five-page site.

**Live preview:** https://technextmarketing.github.io/immaculateconnectionsph/

No build step and no framework: upload the folder to any static host or serve it with GitHub Pages.

All copy, packages, inclusions, places, photos and the logo come from the agency's existing website. Photos are served from the agency's own Wix media library (`static.wixstatic.com`).

See [AUDIT.md](AUDIT.md) for the full audit of the current site, the pain points found, and how this redesign addresses them.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: animated hero (staged entrance, masked headline, pointer and scroll parallax, rotating "now booking" line, destination chips, background video with a pause control), quick inquiry card, destinations ticker, five services, how booking works, featured packages with region tabs, tour-highlight posters, why choose us, previous tours gallery, FAQ, call to action. |
| `services.html` | Ticketing, Hotel Bookings & Reservations, Transport Service Reservations (vans, coasters, bus, 4-seater), Local & International Tour Packages, and Meetings, Incentives, Conferences, Exhibitions, Trainings & Seminars. Flight and event quote forms pre-fill the inquiry page. |
| `tours.html` | All 15 packages with search, region, duration, archive (past departures) and sort filters. Each card opens a details modal with places, inclusions, status and (for Vietnam) the itinerary posters. |
| `package.html` | Package detail page (`package.html?id=<package-id>`): hero, sticky section tabs, photo gallery, overview, day-by-day itinerary, inclusions and exclusions, places with a location guide, 2026 travel dates with surcharges, itinerary posters, related packages and a sticky quote button. |
| `payment.html` | Held back, not linked from anywhere: the payment step is off until the agency confirms a booking flow (`CONFIG.payments`). It states that nothing is collected on the website. |
| `about.html` | Why choose us, the four values, mission and vision, team cards for the four desks, previous tours gallery, contact details. |
| `contact.html` | Three-step inquiry form delivered to `inquiries@immaculateconnectionsph.com`. On submit it renders a printable quotation the traveller can download, email or send on Messenger. No payment is requested. |

## Inquiry form delivery

The form posts to FormSubmit's AJAX endpoint for `inquiries@immaculateconnectionsph.com` (see `CONFIG.formEndpoint` in `assets/js/main.js`). No account is needed.

**One-time activation:** the first time the form is submitted from the live domain, FormSubmit emails `inquiries@immaculateconnectionsph.com` with an "Activate form" link. Click it once and every later submission is delivered directly to the inbox (subject line `Website inquiry: <service> – <package>`, fields as a table, reply-to set to the traveller's email). If sending fails for any reason, the page offers the traveller an email and a Facebook Messenger fallback carrying the same details.

Optional hardening after activation: FormSubmit provides a hashed alias for the address; paste it into `CONFIG.formEndpoint` to keep the raw email out of the page source.

## Quotation flow

`Inquiry form → quotation → download, email or Messenger`

There is no payment step. Destinations, travel dates and final pricing are
confirmed by the reservations team first, and payment instructions are issued
only with the official quotation that team sends.

1. **The traveller submits the form.** The inquiry is emailed to `inquiries@immaculateconnectionsph.com` with a quotation reference in the subject line (`Website inquiry ICQ-260909-4821: Tour package – …`).
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

## Where to edit

- **Contact details** (mobile, landline, email, Facebook, address): `CONFIG` at the top of `assets/js/main.js`. All `data-tel`, `data-landline`, `data-mail`, `data-fb` and `data-msg` links read from it.
- **Packages, inclusions, places, photos, posters, ticker**: `assets/js/data.js`. Give a package `travelDates` (and `year` / per-date `y`) or an `ends` date and it is marked **Departed** automatically once every date has passed; departed packages move to the "Archive" filter and off the home page. Add a package once and it appears on the home tabs, the tours page, the details modal and the inquiry dropdown.
- **Colours and fonts**: `:root` in `assets/css/style.css`. Quotation and payment styling, including the print rules, live in `assets/css/quotation.css`.
- **Inclusion tags on cards** (Airfare, Hotel, Meals, Transport, Tour guide, Entrance fees, Insurance and so on) are derived automatically from each package's `inclusions` list by `INC_TAGS` in `assets/js/main.js`.
- **Travel dates** on a package page link straight to the inquiry form with the package and the chosen departure pre-filled.
- **Team cards on the About page**: `IC.team` in `assets/js/data.js`. Each entry is a desk in the agency. Add a `name` (and optionally a `photo`, using a Wix media id from the agency's own library, plus a direct `email`) and the card becomes a personal profile with the person's name as the title and the desk as the subtitle. Leave `name` empty and the card shows the desk with the agency's own service icon, so the section stays accurate until real names and photographs are supplied.
- **Copy**: the HTML files. Header and footer are repeated in each page.

## Publishing

Every push to `main` is deployed to GitHub Pages by `.github/workflows/deploy-pages.yml` (Pages source: GitHub Actions). The live preview is https://technextmarketing.github.io/immaculateconnectionsph/. To move to the agency's own domain, point the domain at GitHub Pages and set it under Settings → Pages, or upload the folder to any static host:

```bash
python -m http.server 8080 --directory .
```

## Items the agency should confirm

- Prices or "from" rates per package (the site currently states none, so the redesign shows "Quotation on request").
- Text itineraries for Siargao, Hong Kong, Japan and China.
- DOT accreditation and business registration numbers for the footer.
- Office hours and payment / cancellation terms.
