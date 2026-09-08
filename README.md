# Immaculate Connections Travel Agency — website redesign

Redesign of [immaculateconnectionsph.com](https://www.immaculateconnectionsph.com/) as a fast, static, five-page site.

**Live preview:** https://technextmarketing.github.io/immaculateconnectionsph/

No build step and no framework: upload the folder to any static host or serve it with GitHub Pages.

All copy, packages, inclusions, places, photos and the logo come from the agency's existing website. Photos are served from the agency's own Wix media library (`static.wixstatic.com`).

See [AUDIT.md](AUDIT.md) for the full audit of the current site, the pain points found, and how this redesign addresses them.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero with the agency headline and tagline, quick inquiry card, destinations ticker, five services, how booking works, featured packages with region tabs, tour-highlight posters, why choose us, previous tours gallery, FAQ, call to action. |
| `services.html` | Ticketing, Hotel Bookings & Reservations, Transport Service Reservations (vans, coasters, bus, 4-seater), Local & International Tour Packages, and Meetings, Incentives, Conferences, Exhibitions, Trainings & Seminars. Flight and event quote forms pre-fill the inquiry page. |
| `tours.html` | All 17 packages with search, region, duration and sort filters. Each card opens a details modal with places, inclusions, status and (for Vietnam) the itinerary posters. |
| `package.html` | Package detail page (`package.html?id=<package-id>`): hero, sticky section tabs, photo gallery, overview, day-by-day itinerary, inclusions and exclusions, places with a location guide, 2026 travel dates with surcharges, itinerary posters, related packages and a sticky quote button. |
| `about.html` | Why choose us, the four values, mission and vision, previous tours gallery, contact details. |
| `contact.html` | Three-step inquiry form delivered to `inquiries@immaculateconnectionsph.com`, contact cards, map, FAQ. |

## Inquiry form delivery

The form posts to FormSubmit's AJAX endpoint for `inquiries@immaculateconnectionsph.com` (see `CONFIG.formEndpoint` in `assets/js/main.js`). No account is needed.

**One-time activation:** the first time the form is submitted from the live domain, FormSubmit emails `inquiries@immaculateconnectionsph.com` with an "Activate form" link. Click it once and every later submission is delivered directly to the inbox (subject line `Website inquiry: <service> – <package>`, fields as a table, reply-to set to the traveller's email). If sending fails for any reason, the page offers the traveller an email and a Facebook Messenger fallback carrying the same details.

Optional hardening after activation: FormSubmit provides a hashed alias for the address; paste it into `CONFIG.formEndpoint` to keep the raw email out of the page source.

## Where to edit

- **Contact details** (mobile, landline, email, Facebook, address): `CONFIG` at the top of `assets/js/main.js`. All `data-tel`, `data-landline`, `data-mail`, `data-fb` and `data-msg` links read from it.
- **Packages, inclusions, places, photos, posters, ticker**: `assets/js/data.js`. Add a package once and it appears on the home tabs, the tours page, the details modal and the inquiry dropdown.
- **Colours and fonts**: `:root` in `assets/css/style.css`.
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
