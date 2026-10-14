/* =========================================================
   Immaculate Connections Travel Agency — chat.js
   ---------------------------------------------------------
   "Ask us" travel assistant: a launcher stacked above the
   Messenger button and a chat panel that answers ONLY from
   the site's own data (IC.tours, IC.config, IC.countryGuide).
   No external calls, no invented prices, dates or rules.
   Runs after data.js and main.js in site.min.js.

   Optional hook: set IC.chatEndpoint to a URL and questions
   are POSTed as { question, history, page }; a JSON reply
   { answer: "text" } is shown. Any error falls back to the
   local engine. Off by default.
   ========================================================= */

(function () {
  'use strict';

  const IC = (window.IC = window.IC || {});
  if (IC.chatEndpoint === undefined) IC.chatEndpoint = null;
  if (document.getElementById('icc-panel')) return;   // loaded twice: keep the first

  /* ---------- helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const U = IC.util || {};
  const CONFIG = IC.config || U.CONFIG || {};
  const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const phoneMQ = window.matchMedia('(max-width: 640px)');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const NUM = new Intl.NumberFormat('en-PH');
  const peso = n => '₱' + NUM.format(Number(n));
  const money = (p, n) => { const v = n == null ? p.from : n; return (p && p.currency === 'USD' ? '$' : '₱') + NUM.format(Number(v)); };
  const pkgUrl = t => 'package-' + encodeURIComponent(t.id);
  const quoteUrl = (t, extra) => 'contact?' + new URLSearchParams(Object.assign({ service: 'tour', package: t.id }, extra || {})).toString();
  const svcQuote = svc => 'contact?' + new URLSearchParams({ service: svc }).toString();
  const tours = () => (Array.isArray(IC.tours) ? IC.tours : []);
  const byId = id => tours().find(t => t.id === id);
  const store = {
    get(k) { try { const v = window.sessionStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
    set(k, v) { try { window.sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage off: the chat still works */ } }
  };
  const KEY = 'icChat.v1', NUDGED = 'icChat.nudged';

  /* ---------- dates (same rules as main.js) ---------- */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  const rangeStart = U.rangeStart || ((d, year) => {
    const m = String(d.d).match(/^([A-Za-z]{3})[a-z]*\.?\s*(\d{1,2})/);
    if (!m) return null;
    const mon = MONTHS[m[1].toLowerCase()];
    return mon === undefined ? null : new Date(d.y || year || today.getFullYear(), mon, parseInt(m[2], 10));
  });
  const isPast = (d, t) => { const s = rangeStart(d, t.year); return !!s && s <= today; };
  const upcoming = t => (t.travelDates || []).filter(d => rangeStart(d, t.year) && !isPast(d, t));
  const effStatus = U.effStatus || (t => {
    if (t.ends && new Date(t.ends + 'T23:59:59') < today) return 'past';
    if (t.travelDates && t.travelDates.length && t.travelDates.every(d => isPast(d, t))) return 'past';
    return t.status;
  });
  const statusText = t => ((IC.statusLabel || {})[effStatus(t)] || '');
  const dateIso = (d, t) => {
    const s = rangeStart(d, t.year);
    return s ? `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, '0')}-${String(s.getDate()).padStart(2, '0')}` : '';
  };
  const addText = d => (d.add ? '+' + (d.cur === 'USD' ? '$' + NUM.format(d.add) : peso(d.add)) : '');
  const dateHref = (d, t) => {
    const yr = d.y || t.year;
    const extra = { notes: `Preferred travel dates: ${d.d}${yr ? ' ' + yr : ''}${d.add ? ` (peak-date surcharge ${addText(d).slice(1)} per pax)` : ''}` };
    const iso = dateIso(d, t); if (iso) extra.date = iso;
    return quoteUrl(t, extra);
  };

  /* ---------- contact details (CONFIG first, then the footer links) ---------- */
  const contact = (() => {
    const href = sel => { const a = $(sel); return a ? a.getAttribute('href') : ''; };
    const text = sel => { const a = $(sel); return a ? a.textContent.trim() : ''; };
    const msgr = () => {
      const a = $('.fab-msg[data-msg]') || $('[data-msg]');
      const h = a && a.getAttribute('href');
      return CONFIG.messenger || (h && h !== '#' ? h : '');
    };
    return {
      mobile: CONFIG.mobile || text('a[data-tel]'),
      mobileHref: CONFIG.mobileHref || href('a[href^="tel:"]'),
      landline: CONFIG.landline || '',
      landlineHref: CONFIG.landlineHref || '',
      email: CONFIG.email || text('a[data-mail]'),
      address: CONFIG.address || '',
      facebook: CONFIG.facebook || '',
      get messenger() { return msgr(); }
    };
  })();

  /* ---------- icons ---------- */
  const svg = (p, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra || ''}>${p}</svg>`;
  const Ico = {
    chat: svg('<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-5.1A8.2 8.2 0 0 1 3 11.5 8.6 8.6 0 0 1 12 3a8.6 8.6 0 0 1 9 8.5Z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" stroke-width="2.6"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    send: svg('<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>'),
    mail: svg('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    msgr: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.99-.88a.8.8 0 0 1 .53-.04c.91.25 1.88.39 2.9.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z"/></svg>',
    pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    cal: svg('<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>')
  };

  /* =========================================================
     Answer engine
     ========================================================= */
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const words = s => (norm(s) ? norm(s).split(' ') : []);

  // Words that carry no destination meaning (English + Tagalog + Cebuano)
  const STOP = new Set(('a an the is are am was were be to of in on at for from by with and or but if so do does did can could would should will '
    + 'i me my we us our you your it its this that these those there here what whats which who how much many when where why '
    + 'tour tours package packages trip trips travel offer offers deal deals please pls po ba ang ng mga sa na ug sa ko mo ka kayo ninyo nimo '
    + 'about any have has got get want need like know tell show give some info information details detail available availability '
    + 'price prices pricing cost costs rate rates fee fees magkano pila tagpila presyo budget cheap cheapest amount per pax person '
    + 'date dates schedule schedules when kailan kanus kanusa month months departure departures depart departing next upcoming '
    + 'include included includes inclusion inclusions including exclude excluded excludes exclusion exclusions kasama apil not '
    + 'itinerary itineraries day days program programme activities plan places spots visit see where saan asa '
    + 'hi hello hey kumusta kamusta maayong buntag hapon gabii good morning afternoon evening thanks thank salamat daghang '
    + 'book booking reserve quote quotation go going also more again just only all list').split(' '));

  // Phrases that switch on an intent
  const RX = {
    greet: /^(hi+|hello|hey|helo|hallo|yo|kumusta|kamusta|musta|maayong (buntag|hapon|gabii|udto)|good (morning|afternoon|evening|day)|greetings)\b/,
    thanks: /\b(thanks|thank you|thank u|ty|salamat|daghang salamat|maraming salamat)\b/,
    price: /\b(how much|price|prices|pricing|cost|costs|rate|rates|magkano|pila|tagpila|presyo|budget|cheap|cheapest|amount|fee|fees)\b/,
    dates: /\b(when|dates?|schedules?|departures?|kailan|kanus ?a|available|availability|slots?|next trip)\b/,
    excl: /\b(exclu\w*|not included|not include|extra cost|hindi kasama|dili apil|walay apil)\b/,
    incl: /\b(includ\w*|inclusions?|kasama|apil|covered|comes with|whats in it)\b/,
    itin: /\b(itinerar\w*|day by day|program|programme|activities|what will we do|whats the plan|day 1)\b/,
    places: /\b(places|spots|destinations|what will we see|sights|attractions)\b/,
    where: /\b(where|saan|asa|pick ?up|meeting point|depart from|leave from|departs? from)\b/,
    car: /\b(car|cars|van|vans|coaster|coasters|bus|buses|rent|rental|rentals|renta|arkila|abang|driver|transport|transportation|transfers?|seater|vehicles?|sakyanan|shuttle)\b/,
    hotel: /\b(hotels?|resorts?|rooms?|accommodations?|stay|lodging|kwarto|hostel|inn)\b/,
    ticket: /\b(tickets?|ticketing|flights?|airfare|airline|plane|ferry|ferries|fast ?craft|eroplano|barko|tiket|fly)\b/,
    mice: /\b(mice|events?|seminars?|conventions?|conferences?|trainings?|meetings?|corporate|reunions?|orientation|team ?building|incentives?|exhibitions?)\b/,
    contact: /\b(contact|phone|number|numero|call|tawag|cellphone|cp|mobile|landline|telephone|tel|email|e mail|gmail|address|location|located|office|where are you|nasaan kayo|asa mo|asa inyo|hours|open|opening|closing time|reach you|talk to|human|agent)\b/,
    office: /\b(where are you|where is your (office|shop|agency)|your (office|address|location)|nasaan kayo|saan kayo|asa mo|asa inyo|asa man mo|asa ka|located)\b/,
    messenger: /\b(messenger|facebook|fb|chat with|message you|pm)\b/,
    visa: /\b(visa|visas|passport|entry requirements?|immigration)\b/,
    pay: /\b(pay|payment|payments|gcash|bank|installment|downpayment|down payment|deposit|credit card|bayad)\b/,
    book: /\b(how (do|can) i book|how to book|book(ing)?|reserve|reservation|magpa ?book|pa ?book|mag ?book)\b/,
    custom: /\b(custom|customi[sz]e|tailor|private tour|own itinerary|personali[sz]ed)\b/,
    intl: /\b(international|abroad|overseas|foreign|outside the philippines|outbound)\b/,
    local: /\b(local|domestic|philippines|pinas|within the philippines)\b/,
    day: /\b(day tours?|day trips?|daytours?|one day|1 day|whole day)\b/,
    soon: /\b(coming soon|soon|upcoming packages|new packages)\b/,
    list: /\b(tours|packages|what do you (have|offer)|options|destinations|all tours|list)\b/
  };

  // Searchable text per package, built once
  const bigrams = ws => ws.slice(1).map((w, i) => ws[i] + w);
  let INDEX = null;
  const index = () => {
    if (INDEX) return INDEX;
    INDEX = tours().map(t => {
      const nameW = words(t.name + ' ' + String(t.id).replace(/-/g, ' '));
      const placeW = words((t.places || []).join(' '));
      const regionW = words(t.region + ' ' + ((IC.regions || {})[t.region] ? IC.regions[t.region].label : ''));
      return {
        t,
        name: new Set(nameW.concat(bigrams(nameW), words(String(t.id).replace(/-/g, '')))),
        country: new Set(words(t.country)),
        places: new Set(placeW.concat(bigrams(placeW))),
        region: new Set(regionW),
        summary: new Set(words(t.summary).filter(w => w.length > 3 && !STOP.has(w)))
      };
    });
    return INDEX;
  };
  const near = (q, set) => {
    if (set.has(q)) return 1;
    if (q.length < 4) return 0;
    for (const w of set) {
      if (w.length >= 4 && (w.startsWith(q) || q.startsWith(w)) && Math.abs(w.length - q.length) <= 2) return 0.8;
    }
    return 0;
  };
  // Score every package against the question; return the clear winners
  const findTours = q => {
    const ws = words(q);
    const qs = ws.filter(w => !STOP.has(w)).concat(bigrams(ws).filter(b => b.length >= 5));
    if (!qs.length) return [];
    const scored = index().map(x => {
      let s = 0, strong = 0;
      new Set(qs).forEach(w => {
        const n = near(w, x.name) * 5, c = near(w, x.country) * 4, p = near(w, x.places) * 3, r = near(w, x.region) * 2, m = near(w, x.summary);
        const best = Math.max(n, c, p, r, m) * (w.length <= 2 ? 0.4 : 1);   // "da", "el": weak on their own
        s += best; if (best >= 2 && w.length >= 3) strong++;
      });
      return { t: x.t, s, strong };
    }).filter(x => x.strong > 0 && x.s >= 2.4).sort((a, b) => b.s - a.s);
    if (!scored.length) return [];
    const top = scored[0].s;
    return scored.filter(x => x.s >= top * 0.8).map(x => x.t);
  };
  const live = list => list.filter(t => effStatus(t) !== 'past');
  const sortTours = list => list.slice().sort((a, b) => {
    const na = upcoming(a)[0], nb = upcoming(b)[0];
    const da = na ? rangeStart(na, a.year).getTime() : 9e15, db = nb ? rangeStart(nb, b.year).getTime() : 9e15;
    return da - db || a.name.localeCompare(b.name);
  });

  /* ---------- reply builders (all text escaped) ---------- */
  const priceLine = t => (effStatus(t) === 'past'
    ? '<p class="icc-price is-ask">Departed — ask us for the next departure</p>'
    : t.price
    ? `<p class="icc-price"><span>${esc(t.price.label || 'From')}</span> <b>${esc(money(t.price))}</b> <span>${esc(t.price.unit || '')}</span></p>`
    : '<p class="icc-price is-ask">Price on request — free quotation</p>');
  const datesBlock = (t, n) => {
    const up = upcoming(t);
    const st = effStatus(t);
    if (!t.travelDates || !t.travelDates.length) {
      if (st === 'soon') return '<p class="icc-note">Travel dates to be announced. Ask us to let you know when it opens.</p>';
      return '<p class="icc-note">Runs on request: tell us your preferred date and group size.</p>';
    }
    if (!up.length) return '<p class="icc-note">All published departures have passed. Ask us about the next one.</p>';
    const shown = up.slice(0, n || 4);
    return `<p class="icc-sub">${IcoInline('cal')}Next departures</p><ul class="icc-dates">${shown.map(d => {
      const yr = d.y && d.y !== t.year ? ' ' + d.y : '';
      return `<li><a href="${esc(dateHref(d, t))}" title="Ask about these dates">${esc(d.d + yr)}</a>${d.add ? `<em>${esc(addText(d))}</em>` : ''}</li>`;
    }).join('')}</ul>`
      + (up.length > shown.length ? `<p class="icc-note"><a href="${esc(pkgUrl(t))}#dates">${up.length - shown.length} more date${up.length - shown.length > 1 ? 's' : ''} on the package page</a></p>` : '')
      + (shown.some(d => d.add) ? '<p class="icc-note">Surcharges are per pax on peak dates.</p>' : '');
  };
  function IcoInline(k) { return Ico[k].replace('<svg ', '<svg class="icc-i" '); }
  const actions = t => {
    const st = effStatus(t);
    const label = st === 'past' ? 'Ask about the next departure' : st === 'soon' ? 'Ask about this tour' : 'Get a quote';
    return `<div class="icc-actions"><a class="icc-btn" href="${esc(pkgUrl(t))}">View package</a><a class="icc-btn is-primary" href="${esc(quoteUrl(t))}">${esc(label)}</a></div>`;
  };
  const card = (t, n) => {
    const st = effStatus(t);
    const meta = [t.duration, t.departure ? 'Departs ' + t.departure : ''].filter(Boolean).map(esc).join(' · ');
    return `<article class="icc-card"><div class="icc-card-top"><a class="icc-card-title" href="${esc(pkgUrl(t))}">${esc(t.name)}</a>`
      + `<span class="icc-status s-${esc(st)}">${esc(statusText(t))}</span></div>`
      + (meta ? `<p class="icc-meta">${meta}</p>` : '')
      + priceLine(t) + datesBlock(t, n) + actions(t) + '</article>';
  };
  const row = t => {
    const nx = upcoming(t)[0];
    const bits = [t.duration, effStatus(t) === 'past' ? 'Departed' : t.price ? `${t.price.label || 'From'} ${money(t.price)}` : 'Price on request', nx ? 'Next: ' + nx.d + (nx.y && nx.y !== t.year ? ' ' + nx.y : '') : ''].filter(Boolean);
    return `<li><a href="${esc(pkgUrl(t))}"><b>${esc(t.name)}</b><span>${esc(bits.join(' · '))}</span></a></li>`;
  };
  const rows = list => `<ul class="icc-rows">${list.map(row).join('')}</ul>`;
  const p = s => `<p>${s}</p>`;
  const contactActions = () => {
    const out = [`<a class="icc-btn is-primary" href="contact">Send an inquiry</a>`];
    if (contact.messenger) out.push(`<a class="icc-btn is-msgr" href="${esc(contact.messenger)}" target="_blank" rel="noopener">${IcoInline('msgr')}Message us</a>`);
    if (contact.mobileHref) out.push(`<a class="icc-btn" href="${esc(contact.mobileHref)}">${IcoInline('phone')}Call ${esc(contact.mobile)}</a>`);
    return `<div class="icc-actions is-wrap">${out.join('')}</div>`;
  };
  const list = items => `<ul class="icc-list">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
  const notPublished = t => (t.status === 'soon' || (t.inclusions || []).join(' ').toLowerCase().indexOf('coming soon') >= 0);

  const MAIN_CHIPS = ['Tour packages', 'Prices & dates', 'Car rental', 'Hotels & tickets', 'Events / MICE', 'Contact us'];
  const pkgChips = t => [{ label: 'Prices & dates', pkg: t.id, intent: 'price' }, { label: 'What’s included?', pkg: t.id, intent: 'incl' }, { label: 'Itinerary', pkg: t.id, intent: 'itin' }, { label: 'Not included', pkg: t.id, intent: 'excl' }];

  const SERVICES = {
    car: {
      html: p('We arrange <b>air-conditioned vehicles with a driver</b> for airport transfers, city tours, out-of-town trips and event shuttles:')
        + list(['4-Seater: up to 4 passengers', 'Van: small groups and families', 'Coaster: mid-size groups', 'Bus: large groups and delegations'])
        + p('Rates depend on the route and how long you need the vehicle, so every trip gets a free quotation. Send the pick-up point, stops and date.'),
      page: 'car-rental', pageLabel: 'Car rental', svc: 'transport'
    },
    hotel: {
      html: p('We book <b>rooms at our partner resorts and hotels</b>, on their own or as part of a tour: Panglao and Anda in Bohol, the Camotes Islands, Moalboal and Cebu City, Boracay, El Nido and Coron.')
        + p('Send the island, check-in and check-out dates, rooms and guests (and a resort name if you have one). We check availability and rates with our partners and send a free quotation.'),
      page: 'hotel-booking', pageLabel: 'Hotel booking', svc: 'hotel'
    },
    ticket: {
      html: p('Our ticketing desk books <b>domestic and international flights, boat and ferry tickets</b> and group bookings: one-way, round-trip or multi-city.')
        + p('Send the route, dates and number of travellers for a free quotation. Several of our international packages already include the flight.'),
      page: 'ticketing', pageLabel: 'Ticketing', svc: 'flights'
    },
    mice: {
      html: p('We handle <b>meetings and events</b>: conventions and conferences, seminars and trainings, orientation courses for local legislators and LGU staff, reunions and corporate gatherings.')
        + p('We can arrange the venue, accommodation, meals, participant transport and tickets or a tour for participants. Tell us the type of event, number of participants, dates and place, and our team replies with a proposal.'),
      page: 'mice', pageLabel: 'MICE & events', svc: 'mice'
    }
  };
  const serviceReply = keys => {
    let html = keys.map(k => SERVICES[k].html).join('<hr class="icc-hr">');
    html += `<div class="icc-actions is-wrap">${keys.map(k => `<a class="icc-btn" href="${esc(SERVICES[k].page)}">${esc(SERVICES[k].pageLabel)}</a>`).join('')}`
      + `<a class="icc-btn is-primary" href="${esc(svcQuote(SERVICES[keys[0]].svc))}">Get a free quote</a></div>`;
    return html;
  };

  const contactReply = q => {
    const hours = /\b(hours|open|opening|closing)\b/.test(q);
    let html = hours ? p('Our office hours aren’t published on the website, so please call or message us first. Here is how to reach the team:') : p('Here is how to reach our team:');
    const li = [];
    if (contact.mobile) li.push(`<li>${IcoInline('phone')}<span>Mobile: <a href="${esc(contact.mobileHref)}">${esc(contact.mobile)}</a></span></li>`);
    if (contact.landline) li.push(`<li>${IcoInline('phone')}<span>Landline: <a href="${esc(contact.landlineHref)}">${esc(contact.landline)}</a></span></li>`);
    if (contact.email) li.push(`<li>${IcoInline('mail')}<span><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></span></li>`);
    if (contact.messenger) li.push(`<li>${IcoInline('msgr')}<span><a href="${esc(contact.messenger)}" target="_blank" rel="noopener">Facebook Messenger</a></span></li>`);
    if (contact.address) li.push(`<li>${IcoInline('pin')}<span>${esc(contact.address)}</span></li>`);
    html += `<ul class="icc-contact">${li.join('')}</ul>` + contactActions();
    return html;
  };
  const fallback = () => p('I’m not sure about that one, and I’d rather not guess. Our team can answer it directly:') + contactActions();

  const greetReply = () => p('Hi! I’m the Immaculate Connections travel assistant. Ask me about our tour packages, prices and travel dates, or our car rental, hotel, ticketing and events services.')
    + p('Try “Vietnam tours”, “How much is Bohol?” or “Dates for Hanoi”.');

  // The engine: question (+ optional forced package / intent) -> { html, chips, last }
  function answer(text, ctx, force) {
    const q = norm(text);
    const has = k => RX[k].test(q);
    const out = (html, chips, last) => ({ html, chips: chips || [], last: last === undefined ? ctx.last : last });
    const wantKey = has('excl') ? 'excl' : has('incl') ? 'incl' : has('itin') ? 'itin' : has('places') ? 'places' : has('price') ? 'price' : has('dates') ? 'dates' : has('where') ? 'where' : '';
    const intent = (force && force.intent) || wantKey;

    if (!q) return out(greetReply(), MAIN_CHIPS);

    // Chip shortcuts
    if (!force) {
      if (q === 'tour packages') return overview(ctx);
      if (q === 'prices dates') return pricesOverview(ctx);
      if (q === 'hotels tickets') return out(serviceReply(['hotel', 'ticket']), ['Car rental', 'Tour packages', 'Contact us']);
      if (q === 'contact us') return out(contactReply(q), ['Tour packages', 'Prices & dates']);
    }

    // Package named, forced, or remembered
    let found = force && force.pkg ? [byId(force.pkg)].filter(Boolean) : findTours(text);
    const greetOnly = RX.greet.test(q) && words(q).filter(w => !STOP.has(w)).length === 0 && !wantKey;
    if (greetOnly) return out(greetReply(), MAIN_CHIPS);
    if (has('thanks') && !found.length && !wantKey) return out(p('You’re welcome! Anything else I can help with?'), MAIN_CHIPS);
    if (has('office') && !(force && force.pkg)) return out(contactReply(q), ['Tour packages', 'Prices & dates']);
    // Places we get asked about but have no package for: say so plainly instead of guessing
    if (/\bsiargao\b/.test(q) && !found.length) {
      return out(p('We don’t have a Siargao package at the moment. Our Boracay, El Nido and Coron packages are coming soon, and we can plan a custom island trip or book your flights and hotel on request.')
        + `<div class="icc-actions"><a class="icc-btn is-primary" href="${esc('contact?' + new URLSearchParams({ service: 'tour', package: 'custom', notes: 'Siargao trip' }))}">Ask for a custom trip</a><a class="icc-btn" href="tours">See all packages</a></div>`, ['Tour packages', 'Contact us']);
    }

    // Visa / entry: only what the site publishes per country
    if (has('visa')) {
      const country = (found[0] && found[0].country) || ['Vietnam', 'China', 'Japan', 'Philippines'].find(c => q.indexOf(c.toLowerCase()) >= 0);
      const guide = country && IC.countryGuide && IC.countryGuide[country];
      const entry = guide && guide.find(g => g.ic === 'entry');
      if (entry) {
        return out(p(`<b>${esc(country)} — ${esc(entry.lead)}.</b> ${esc(entry.body)}`) + p('This is general guidance from our travel guide. Our team confirms the requirements for your trip.') + contactActions(),
          ['Contact us'], found.length === 1 ? [found[0].id] : ctx.last);
      }
      return out(fallback(), MAIN_CHIPS);
    }
    if (has('pay') && !found.length) {
      return out(p('Nothing is paid on the website. Our team first confirms the package, your dates and the final price, then sends an official quotation with the payment instructions.') + contactActions(), MAIN_CHIPS);
    }
    if (has('custom') && !found.length) {
      return out(p('Yes, tours can be tailored to your preferences. In the inquiry form choose “Custom itinerary” and describe your dates, group size and the places you want to see.')
        + `<div class="icc-actions"><a class="icc-btn is-primary" href="${esc('contact?' + new URLSearchParams({ service: 'tour', package: 'custom' }))}">Plan a custom tour</a></div>`, ['Tour packages', 'Contact us']);
    }
    if (has('book') && !found.length && !wantKey) {
      return out(p('Open the package page and tap “Request a quote”, or send an inquiry and choose your package. We confirm availability for your dates and send a quotation with the payment details; your booking is confirmed once payment is received.')
        + `<div class="icc-actions"><a class="icc-btn" href="tours">Browse packages</a><a class="icc-btn is-primary" href="contact">Send an inquiry</a></div>`, MAIN_CHIPS);
    }

    // Services, unless the question is about a package detail
    const svcKeys = ['car', 'hotel', 'ticket', 'mice'].filter(has);
    if (svcKeys.length && !(found.length && ['price', 'dates', 'incl', 'excl', 'itin', 'places'].indexOf(intent) >= 0)) {
      let html = serviceReply(svcKeys.slice(0, 2));
      // related packages: match on the place words only ("hotel in bohol" -> bohol), not "car" in "cable car"
      const placeWords = words(text).filter(w => !['car', 'hotel', 'ticket', 'mice'].some(k => RX[k].test(w))).join(' ');
      const rel = live(force && force.pkg ? found : findTours(placeWords)).slice(0, 3);
      if (rel.length) html += `<p class="icc-sub">Related packages</p>` + rows(rel);
      return out(html, svcKeys.indexOf('car') < 0 ? ['Car rental', 'Tour packages', 'Contact us'] : ['Hotels & tickets', 'Tour packages', 'Contact us'], rel.length === 1 ? [rel[0].id] : ctx.last);
    }

    // Filters: international / local / day tours / coming soon
    const filterTours = () => {
      let l = tours();
      if (has('intl')) l = l.filter(t => t.region === 'intl');
      else if (has('local')) l = l.filter(t => t.region !== 'intl');
      if (has('day')) l = l.filter(t => t.days === 1);
      if (has('soon') && !has('day')) l = l.filter(t => effStatus(t) === 'soon');
      return l;
    };
    const filtered = has('intl') || has('local') || has('day') || (has('soon') && !found.length);
    if (filtered) {
      let l = live(filterTours());
      if (found.length) {   // "day tours in cebu": narrow by the place too
        const ids = new Set(found.map(t => t.id));
        const both = l.filter(t => ids.has(t.id));
        const region = found[0].region;
        l = both.length ? both : l.filter(t => t.region === region).length ? l.filter(t => t.region === region) : l;
      }
      if (!l.length) return out(p('I couldn’t find a published package like that right now.') + contactActions(), MAIN_CHIPS);
      const title = has('intl') ? 'International packages' : has('day') ? 'Day tours' : has('soon') ? 'Coming soon' : 'Local packages';
      return out(`<p><b>${esc(title)}</b> (${l.length}):</p>` + rows(sortTours(l)) + p('Tap a package for its page, or ask me about one, e.g. “dates for ' + esc(l[0].name.split(/[:–-]/)[0].trim()) + '”.'),
        l.length === 1 ? pkgChips(l[0]) : l.slice(0, 4).map(t => ({ label: t.name, pkg: t.id })), l.length === 1 ? [l[0].id] : l.map(t => t.id));
    }

    // Follow-up on the package(s) we were talking about
    if (!found.length && intent && ctx.last && ctx.last.length) found = ctx.last.map(byId).filter(Boolean);

    if (found.length) {
      const one = found.length === 1 ? found[0] : null;
      const ids = found.map(t => t.id);
      if (!one && ['incl', 'excl', 'itin', 'places', 'where'].indexOf(intent) >= 0) {
        return out(p('Which package do you mean?'), found.slice(0, 6).map(t => ({ label: t.name, pkg: t.id, intent })), ids);
      }
      if (one) {
        const t = one;
        if (intent === 'incl') {
          if (notPublished(t)) return out(p(`The <b>${esc(t.name)}</b> package is still being finalised, so its inclusions aren’t published yet.`) + actions(t), pkgChips(t), [t.id]);
          return out(p(`<b>Included</b> in ${esc(t.name)}`) + list(t.inclusions || []) + actions(t), pkgChips(t).filter(c => c.intent !== 'incl'), [t.id]);
        }
        if (intent === 'excl') {
          const ex = (t.exclusions || []).concat((t.optional || []).map(o => 'Optional: ' + o));
          if (!ex.length) return out(p(`The package page for <b>${esc(t.name)}</b> doesn’t list exclusions. Our team can confirm what is not covered.`) + actions(t), pkgChips(t), [t.id]);
          return out(p(`<b>Not included</b> in ${esc(t.name)}`) + list(ex) + actions(t), pkgChips(t).filter(c => c.intent !== 'excl'), [t.id]);
        }
        if (intent === 'itin') {
          if (!t.itinerary || !t.itinerary.length) return out(p(`The itinerary for <b>${esc(t.name)}</b> isn’t published yet.`) + actions(t), pkgChips(t), [t.id]);
          const days = t.itinerary.map(d => {
            const items = d.items || [];
            return `<li><b>${esc(d.day)}${d.title ? ': ' + esc(d.title) : ''}</b><span>${esc(items.slice(0, 4).join(' · '))}${items.length > 4 ? ' …' : ''}</span></li>`;
          }).join('');
          return out(p(`<b>Itinerary</b> for ${esc(t.name)}`) + `<ul class="icc-days">${days}</ul>` + `<p class="icc-note"><a href="${esc(pkgUrl(t))}#itinerary">Full day-by-day itinerary</a></p>` + actions(t), pkgChips(t).filter(c => c.intent !== 'itin'), [t.id]);
        }
        if (intent === 'places') {
          if (!t.places || !t.places.length) return out(p(`The places for <b>${esc(t.name)}</b> aren’t published yet.`) + actions(t), pkgChips(t), [t.id]);
          return out(p(`<b>Places</b> on ${esc(t.name)}`) + list(t.places) + actions(t), pkgChips(t), [t.id]);
        }
        if (intent === 'where') {
          return out(p(`<b>${esc(t.name)}</b> departs from <b>${esc(t.departure || 'a point we confirm on booking')}</b>. Exact meeting points and times are confirmed in your booking voucher.`) + actions(t), pkgChips(t), [t.id]);
        }
        return out(card(t), pkgChips(t).filter(c => c.intent !== 'price'), [t.id]);
      }
      // Several matches: show them as cards (or rows when there are many)
      const lv = live(found);
      const showList = sortTours(lv.length ? lv : found);
      const html = showList.length <= 3
        ? `<p>I found ${showList.length} packages:</p>` + showList.map(t => card(t, 3)).join('')
        : `<p>I found ${showList.length} packages:</p>` + rows(showList);
      return out(html, showList.slice(0, 4).map(t => ({ label: t.name, pkg: t.id })), showList.map(t => t.id));
    }

    // Contact / Messenger
    if (has('contact') || has('messenger')) return out(contactReply(q), ['Tour packages', 'Prices & dates']);
    if (intent === 'price' || intent === 'dates') return pricesOverview(ctx);
    if (has('list') || has('book')) return overview(ctx);
    if (has('thanks')) return out(p('You’re welcome! Anything else I can help with?'), MAIN_CHIPS);
    return out(fallback(), MAIN_CHIPS);

    function overview() {
      const l = live(tours());
      const groups = {};
      l.forEach(t => { const k = t.country || 'Other'; (groups[k] = groups[k] || []).push(t); });
      const g = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
      const html = p(`We have <b>${l.length} packages</b> on the website right now:`)
        + `<ul class="icc-list">${g.map(k => `<li><b>${esc(k)}</b>: ${groups[k].map(t => esc(t.name)).join(', ')}</li>`).join('')}</ul>`
        + `<div class="icc-actions"><a class="icc-btn" href="tours">See all packages</a><a class="icc-btn is-primary" href="${esc('contact?' + new URLSearchParams({ service: 'tour', package: 'custom' }))}">Custom tour</a></div>`;
      return { html, chips: ['International tours', 'Day tours in Cebu', 'Bohol & Camotes', 'Prices & dates'], last: ctx.last };
    }
    function pricesOverview() {
      const priced = sortTours(live(tours()).filter(t => t.price));
      const html = p('Published rates and the next departure for our priced packages:') + rows(priced)
        + p('Local tours (Cebu, Bohol, Camotes) are quoted for your group: ask for a free quotation.')
        + '<p class="icc-note">Name a package for its full list of dates, e.g. “dates for Da Nang 6D4N”.</p>';
      return { html, chips: priced.slice(0, 4).map(t => ({ label: t.name, pkg: t.id, intent: 'price' })), last: priced.map(t => t.id) };
    }
  }

  /* =========================================================
     UI
     ========================================================= */
  const logo = 'assets/img/media/ab1a9837b67f.png';
  const launch = document.createElement('button');
  launch.type = 'button';
  launch.className = 'icc-launch';
  launch.setAttribute('aria-haspopup', 'dialog');
  launch.setAttribute('aria-expanded', 'false');
  launch.setAttribute('aria-controls', 'icc-panel');
  launch.setAttribute('aria-label', 'Ask us: open the travel assistant');
  launch.innerHTML = `<span class="icc-badge" aria-hidden="true"></span>${Ico.chat}<span class="icc-label">Ask us</span>`;

  const panel = document.createElement('section');
  panel.className = 'icc-panel';
  panel.id = 'icc-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Travel assistant chat');
  panel.innerHTML = `
    <header class="icc-head">
      <span class="icc-avatar"><img src="${logo}" alt="" width="40" height="40" decoding="async"></span>
      <div class="icc-who"><h2>Travel assistant</h2><p><i aria-hidden="true"></i>Automated assistant · instant answers</p></div>
      <button type="button" class="icc-x" aria-label="Close chat">${Ico.close}</button>
    </header>
    <div class="icc-log" role="log" aria-live="polite" aria-relevant="additions" tabindex="-1"></div>
    <div class="icc-chips" role="group" aria-label="Suggested questions"></div>
    <form class="icc-form" autocomplete="off">
      <label class="icc-sr" for="icc-in">Your question</label>
      <input id="icc-in" class="icc-in" type="text" maxlength="300" enterkeyhint="send" placeholder="Ask about a tour, price or date">
      <button type="submit" class="icc-send" aria-label="Send">${Ico.send}</button>
    </form>
    <p class="icc-foot">Answers come from our published packages. For bookings our team confirms everything.</p>`;

  const log = $('.icc-log', panel), chipsEl = $('.icc-chips', panel), form = $('.icc-form', panel), input = $('.icc-in', panel), closeBtn = $('.icc-x', panel);

  const state = { last: null, busy: false, hist: [] };   // hist: entries replayed on reload (no HTML stored)
  const save = () => store.set(KEY, { hist: state.hist.slice(-40), open: isOpen });

  const scrollDown = () => { log.scrollTop = log.scrollHeight; };
  const addMsg = (who, html) => {
    const el = document.createElement('div');
    el.className = 'icc-msg ' + (who === 'me' ? 'is-me' : 'is-bot');
    el.innerHTML = who === 'me' ? `<p>${esc(html)}</p>` : html;
    log.appendChild(el);
    // a long answer opens at its start (with the question above it), a short one scrolls to the end
    const prev = el.previousElementSibling;
    const top = (prev && who !== 'me' ? prev.offsetTop : el.offsetTop) - 12;
    log.scrollTop = el.offsetTop + el.offsetHeight - top > log.clientHeight ? top : log.scrollHeight;
    return el;
  };
  const setChips = list => {
    chipsEl.innerHTML = '';
    list.forEach(c => {
      const o = typeof c === 'string' ? { label: c } : c;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'icc-chip'; b.textContent = o.label;
      b.addEventListener('click', () => ask(o.label, o.pkg || o.intent ? { pkg: o.pkg, intent: o.intent } : null));
      chipsEl.appendChild(b);
    });
    chipsEl.hidden = !list.length;
  };
  const run = (text, force) => {
    const r = answer(text, { last: state.last }, force);
    state.last = r.last;
    return r;
  };
  const typing = () => {
    const el = document.createElement('div');
    el.className = 'icc-msg is-bot icc-typing';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(el); scrollDown();
    return el;
  };
  const wait = ms => new Promise(res => setTimeout(res, ms));

  const remote = (text) => {
    const url = IC.chatEndpoint;
    if (!url || typeof url !== 'string' || !window.fetch) return Promise.resolve(null);
    const ctrl = window.AbortController ? new AbortController() : null;
    const timer = setTimeout(() => { if (ctrl) ctrl.abort(); }, 8000);
    const history = state.hist.filter(h => h.u || h.e).slice(-10).map(h => (h.u ? { role: 'user', text: h.u } : { role: 'assistant', text: h.e }));
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: text, history, page: location.pathname }), signal: ctrl ? ctrl.signal : undefined })
      .then(r => (r.ok ? r.json() : null))
      .then(j => (j && typeof j.answer === 'string' && j.answer.trim() ? j.answer.trim() : null))
      .catch(() => null)
      .then(v => { clearTimeout(timer); return v; });
  };
  const textHtml = s => s.split(/\n{2,}/).map(par => `<p>${esc(par).replace(/\n/g, '<br>')}</p>`).join('');

  async function ask(text, force) {
    text = String(text || '').trim().slice(0, 300);
    if (!text || state.busy) return;
    state.busy = true;
    addMsg('me', text);
    state.hist.push({ u: text, f: force || undefined });
    setChips([]);
    const dots = typing();
    const t0 = Date.now();
    const ep = force ? null : await remote(text);
    const delay = reducedMQ.matches ? 0 : 420 + Math.min(280, text.length * 6);
    const left = delay - (Date.now() - t0);
    if (left > 0) await wait(left);
    dots.remove();
    if (ep) {
      addMsg('bot', textHtml(ep));
      state.hist.push({ e: ep });
      setChips(MAIN_CHIPS);
    } else {
      const r = run(text, force);
      addMsg('bot', r.html);
      setChips(r.chips);
    }
    save();
    state.busy = false;
  }

  const restore = () => {
    const saved = store.get(KEY);
    log.innerHTML = '';
    addMsg('bot', greetReply());
    let chips = MAIN_CHIPS;
    if (saved && Array.isArray(saved.hist)) {
      state.hist = saved.hist.filter(h => h && (typeof h.u === 'string' || typeof h.e === 'string'));
      state.hist.forEach(h => {
        if (typeof h.u === 'string') {
          addMsg('me', h.u);
          const r = run(h.u, h.f && typeof h.f === 'object' ? { pkg: String(h.f.pkg || ''), intent: String(h.f.intent || '') } : null);
          // a remote answer, when one follows, replaces the local one
          const i = state.hist.indexOf(h), nx = state.hist[i + 1];
          if (!(nx && typeof nx.e === 'string')) { addMsg('bot', r.html); chips = r.chips; }
        } else { addMsg('bot', textHtml(h.e)); chips = MAIN_CHIPS; }
      });
    }
    setChips(chips);
  };

  /* ---------- open / close ---------- */
  let isOpen = false, hideTimer = 0, built = false;
  const lockScroll = on => document.documentElement.classList.toggle('icc-lock', on && phoneMQ.matches);
  function open() {
    if (isOpen) return;
    isOpen = true;
    if (!built) { restore(); built = true; }
    clearTimeout(hideTimer);
    panel.hidden = false;
    void panel.offsetWidth;   // start the transition from the closed state
    panel.classList.add('is-open');
    document.documentElement.classList.add('icc-open');
    launch.setAttribute('aria-expanded', 'true');
    launch.classList.remove('is-nudge');
    lockScroll(true);
    scrollDown();
    setTimeout(() => input.focus({ preventScroll: true }), reducedMQ.matches ? 0 : 60);
  }
  function close(returnFocus) {
    if (!isOpen) return;
    isOpen = false;
    panel.classList.remove('is-open');
    document.documentElement.classList.remove('icc-open');
    launch.setAttribute('aria-expanded', 'false');
    lockScroll(false);
    hideTimer = setTimeout(() => { panel.hidden = true; }, reducedMQ.matches ? 0 : 260);
    if (returnFocus !== false) launch.focus({ preventScroll: true });
  }
  launch.addEventListener('click', () => (isOpen ? close() : open()));
  closeBtn.addEventListener('click', () => close());
  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; ask(v); });
  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    // Phones: the sheet covers the page, so Tab stays inside it
    if (e.key === 'Tab' && phoneMQ.matches) {
      const f = Array.from(panel.querySelectorAll('a[href], button:not([disabled]), input')).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  phoneMQ.addEventListener ? phoneMQ.addEventListener('change', () => lockScroll(isOpen)) : phoneMQ.addListener(() => lockScroll(isOpen));

  /* ---------- placement: stacked above the Messenger button ---------- */
  const root = document.documentElement;
  const place = () => {
    const fab = $('.fab-msg');
    let r = 22, b = 22, h = 48;
    if (fab) {
      const cs = getComputedStyle(fab);
      if (cs.display !== 'none') {
        r = parseFloat(cs.right) || r;
        b = parseFloat(cs.bottom) || b;
        h = fab.offsetHeight || h;
      } else { h = 0; b = parseFloat(cs.bottom) || b; }
    }
    // phones: side by side with Messenger, so the pair takes one row of the screen, not three
    const side = phoneMQ.matches && fab && h;
    root.classList.toggle('icc-side', !!side);
    root.style.setProperty('--icc-r', (side ? r + fab.offsetWidth + 10 : r) + 'px');
    root.style.setProperty('--icc-b', (side ? b + (h - 44) / 2 : b + h + (h ? 12 : 0)) + 'px');
  };
  let raf = 0;
  const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; place(); }); };

  /* ---------- mount ---------- */
  function mount() {
    document.body.appendChild(launch);
    document.body.appendChild(panel);
    place();
    root.classList.add('icc-ready');
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
    if (window.MutationObserver) new MutationObserver(schedule).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    // One gentle nudge per visit
    if (!store.get(NUDGED)) {
      setTimeout(() => {
        if (isOpen) return;
        launch.classList.add('is-nudge');
        store.set(NUDGED, 1);
      }, 3500);
    }
    // Reopen if the visitor had the chat open on the previous page of this visit
    const s = store.get(KEY);
    if (s && s.open && !phoneMQ.matches) open();
    window.addEventListener('pagehide', () => { const v = store.get(KEY) || {}; if (built) v.hist = state.hist.slice(-40); v.open = isOpen; store.set(KEY, v); });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  IC.chat = { open, close, ask, answer: (q, last) => answer(q, { last: last || null }) };
})();
