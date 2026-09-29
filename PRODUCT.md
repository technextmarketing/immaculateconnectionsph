# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Filipino travellers planning a trip with other people: families, barkadas (friend groups), schools and student delegations, companies, and local government units (LGU staff, local legislators). They usually arrive from a Facebook post, a Messenger link or a search, often on a phone.
- Their job: find a trip or service that fits their dates and group size, understand what is included, and ask for a price without committing.
- Secondary: organisers of seminars, trainings, conventions and corporate gatherings who need venue, accommodation, meals and participant transport handled in one place.

## Product Purpose

The website of Immaculate Connections Travel Agency (Tour Services), Cebu City, Philippines. It shows the agency's tour packages and services and turns interest into an inquiry: every page leads to a free quotation request (inquiry form, Messenger, phone). Success is a visitor sending an inquiry with the package, dates and group size filled in.

## Positioning

One Cebu team handles the whole trip for a group: tickets, hotel, air-conditioned vehicles with driver, guides and meals, for local tours (Cebu, Bohol, Camotes, Palawan, Boracay, Siargao) and fixed-departure international packages (Vietnam, China, Japan), plus event and seminar logistics. The agency's own photos of past group tours, events and delegations are the proof.

## Operating Context

- Services: local and international tour packages; ticketing (domestic and international flights, boat and ferry tickets, group bookings); hotel bookings and reservations with resort and hotel partners; transport service reservations (vans, coasters, buses and 4-seaters, air-conditioned, with driver); MICE (meetings, incentives, conferences, exhibitions, trainings, seminars, orientation courses, reunions, corporate gatherings).
- Office: Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street, Cebu City. Mobile +63 917 318 8997, landline (032) 238 3343, inquiries@immaculateconnectionsph.com, Facebook page ImmaculateConnections.ph.
- Prices: only the packages that publish a rate show one (in PHP or USD); everything else is "quotation on request". Quotations are free. No payment is taken on the website.

## Capabilities and Constraints

- Static site (HTML, CSS, JavaScript) on GitHub Pages; `python tools/build.py` bundles assets, pre-renders the 15 package pages and the Tours grid, and writes the sitemap. Package data lives in `assets/js/data.js`.
- Inquiry form posts through FormSubmit to inquiries@immaculateconnectionsph.com (needs its one-time activation from the agency's inbox). Never send test submissions.
- Package statuses and departure dates are computed from the data: a departure counts as passed on its travel day.
- Must stay fast and usable on phones and tablets, respect reduced motion, and keep a pause control on anything that moves by itself.
- Undecided: real team names and photos (the team section stays hidden until they arrive); the move to the agency's own domain.

## Brand Commitments

- Name: Immaculate Connections Travel Agency, "Tour Services". Bird logo mark in the agency's blue and gold.
- Existing look is kept: agency blue and gold on navy, Playfair Display headings, Raleway text, Dancing Script accents, the travelogue home hero (confirmed 29 Sep 2026: "keep the look, upgrade every section").
- Voice: warm, confident, service-first ("Your Immaculate Service", "Crafting seamless journeys, creating lasting memories").

## Evidence on Hand

- The agency's own photos: 18 gallery photos in `assets/img/media/` (listed in `IC.gallery` in `data.js`) and 9 group-tour photos (`assets/img/hero/print-*`, `group-*`), about 27 in all. Captions describe what is visible; only verified places are named.
- 15 packages with itineraries, inclusions, places, dates and published rates where the agency gave them; itinerary posters for the Vietnam, China and Japan programmes.
- Licensed, credited stock photos (Unsplash License, one CC BY-SA Commons photo) for destination backgrounds; credits in the README.
- Absent, never to be invented: testimonials and reviews, client names or logos, traffic or booking numbers, awards, accreditation numbers, prices the agency has not published, team members.

## Product Principles

- Every page ends in a free quotation: the next step is always visible.
- Real over polished: the agency's own trips and people come first; stock only sets the scene and is never passed off as the agency's.
- Say only what the agency offers and has published.
- Built for a phone in someone's hand, then scaled up.

## Accessibility & Inclusion

- WCAG 2.2 AA as the working standard: pause control for auto-moving content, visible keyboard focus, text at least 11px, tap targets at least 24px (32px where possible), reduced-motion fallbacks.
