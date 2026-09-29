/* =========================================================
   Immaculate Connections Travel Agency — main.js (v2)
   ---------------------------------------------------------
   Nav, scroll progress, reveal + tilt animations, ticker,
   tour cards, special-offer cards, package detail page,
   galleries + lightbox, FAQ, services sub-nav, inquiry form
   (FormSubmit → inquiries@immaculateconnectionsph.com).
   ========================================================= */

(function () {
  'use strict';

  const IC = (window.IC = window.IC || {});

  const CONFIG = {
    brand: 'Immaculate Connections Travel Agency',
    // Public address of the site: canonical links and structured data are built on it.
    // Change it (with the other GitHub addresses, see the README) when the domain moves.
    siteUrl: 'https://technextmarketing.github.io/immaculateconnectionsph/',
    shortName: 'Immaculate Connections',
    mobile: '+63 917 318 8997',
    mobileHref: 'tel:+639173188997',
    landline: '(032) 238 3343',
    landlineHref: 'tel:+63322383343',
    email: 'inquiries@immaculateconnectionsph.com',
    facebook: 'https://www.facebook.com/ImmaculateConnections.ph',
    messenger: 'https://m.me/ImmaculateConnections.ph',
    address: 'Unit 4E, 4th Floor, JL Millennium Building, Don Jose Avila Street, Cebu City, Cebu, Philippines',
    // Inquiries are delivered straight to the agency inbox through FormSubmit.
    // The first submission triggers a one-time activation email to that inbox.
    formEndpoint: 'https://formsubmit.co/ajax/inquiries@immaculateconnectionsph.com',
    quotePrefix: 'ICQ',      // quotation reference prefix
    quoteValidDays: 7,       // how long a quotation stays valid
    // ---- Online payment step ----
    // Travel dates, locations and final pricing are confirmed by the team
    // before any money changes hands, so the website never asks a visitor to
    // pay. The inquiry is delivered by email, Messenger or a downloaded copy.
    // Flip this to true only when the agency has a confirmed booking flow and
    // the account details below are filled in.
    payments: false,
    // ---- Payment details shown on payment.html ----
    // Leave the arrays empty and the page tells travellers that the account
    // details arrive with their official invoice. Fill them in and the cards
    // appear automatically. Example:
    //   bank: [{ bank: 'BDO', name: 'Immaculate Connections Travel Agency', number: '0000 0000 0000' }]
    //   ewallet: [{ name: 'GCash', account: 'Immaculate Connections', number: '0917 000 0000' }]
    //   link: 'https://your-payment-link'   // optional online checkout
    payment: { bank: [], ewallet: [], link: '' }
  };
  IC.config = CONFIG;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;

  /* Motion: the hero camera, the photo piles, the ticker and the "now booking" pill advance
     by themselves. A small button on each stops or restarts all of them at once (WCAG 2.2.2)
     for as long as the visitor stays on the page. Reduced-motion visitors get stills, so
     they get no buttons. */
  const Motion = (() => {
    let paused = false;   // for this page view only: every page opens playing
    const subs = [];
    const ICONS = {
      pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="3.6" height="14" rx="1"/><rect x="13.9" y="5" width="3.6" height="14" rx="1"/></svg>',
      play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.5 5.8v12.4a1 1 0 0 0 1.53.85l9.9-6.2a1 1 0 0 0 0-1.7l-9.9-6.2A1 1 0 0 0 8.5 5.8Z"/></svg>'
    };
    const sync = () => {
      document.documentElement.classList.toggle('motion-paused', paused);
      document.querySelectorAll('.motion-toggle').forEach(b => {
        const label = paused ? 'Play moving content' : 'Pause moving content';
        b.innerHTML = ICONS[paused ? 'play' : 'pause']; b.setAttribute('aria-label', label); b.title = label;
      });
    };
    const set = v => {
      paused = !!v;
      sync(); subs.forEach(fn => fn(paused));
    };
    sync();
    return {
      get paused() { return paused; },
      on(fn) { subs.push(fn); },
      button(host, cls, first) {
        if (reduced || !host) return null;
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'motion-toggle' + (cls ? ' ' + cls : '');
        b.addEventListener('click', e => { e.stopPropagation(); set(!paused); });
        if (first) host.prepend(b); else host.appendChild(b);
        sync(); return b;
      }
    };
  })();
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wix = (id, w, h, al) => IC.wix ? IC.wix(id, w, h, al) : id;
  const NUM = new Intl.NumberFormat('en-PH');   // one formatter: toLocaleString builds a new one on every call
  const peso = n => '₱' + NUM.format(Number(n));
  // A payment step is offered only when the agency has switched it on and has
  // real account details to show. Until then a quotation is an estimate and
  // the traveller simply sends it to us.
  const payReady = () => {
    const p = CONFIG.payment || {};
    return CONFIG.payments === true && !!((p.bank && p.bank.length) || (p.ewallet && p.ewallet.length) || p.link);
  };
  const regionLabel = t => (IC.regions[t.region] ? IC.regions[t.region].label : t.region);
  // ---- Status: a package whose travel dates have all passed becomes 'past' (Departed)
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  const rangeEnd = (d, year) => {
    const mm = String(d.d).match(/^([A-Za-z]{3})[a-z]*\.?\s*(\d{1,2})\s*[–-]\s*(?:([A-Za-z]{3})[a-z]*\.?\s*)?(\d{1,2})$/);
    if (!mm) return null;
    const mon = MONTHS[(mm[3] || mm[1]).slice(0, 3).toLowerCase()];
    return mon === undefined ? null : new Date(d.y || year || 2026, mon, parseInt(mm[4], 10));
  };
  const rangeStart = (d, year) => {
    const mm = String(d.d).match(/^([A-Za-z]{3})[a-z]*\.?\s*(\d{1,2})\s*[–-]/);
    if (!mm) return rangeEnd(d, year);
    const mon = MONTHS[mm[1].slice(0, 3).toLowerCase()];
    return mon === undefined ? null : new Date(d.y || year || 2026, mon, parseInt(mm[2], 10));
  };
  // A departure closes on its travel day (same rule as the Immaculate Ops dashboard).
  const isPastDate = (d, t) => { const s = rangeStart(d, t.year); return !!s && s <= today; };
  const effStatus = t => {
    if (t.ends && new Date(t.ends + 'T23:59:59') < today) return 'past';
    if (t.travelDates && t.travelDates.length && t.travelDates.every(d => isPastDate(d, t))) return 'past';
    return t.status;
  };
  const statusLabel = t => IC.statusLabel[effStatus(t)] || '';
  const money = (p, n) => { const v = n == null ? p.from : n; return (p && p.currency === 'USD' ? '$' : '₱') + NUM.format(Number(v)); };
  const priceValue = t => (t.price ? t.price.from * (t.price.currency === 'USD' ? 57 : 1) : 9e9);
  // Each package is a real page (built by tools/build.py); package.html?id= still works and forwards there.
  const pkgUrl = t => `package-${encodeURIComponent(t.id)}.html`;
  // A package page opens on a sharp photo of its destination (IC.destHero); a package without one falls back to its own image
  const pkgHeroBg = t => {
    const k = IC.destHero && IC.destHero[t.id];
    const pic = k
      ? `<picture><source media="(max-width: 700px)" srcset="assets/img/hero/dest-${k}-960.webp 960w, assets/img/hero/dest-${k}-1280.webp 1280w" sizes="100vw"><img src="assets/img/hero/dest-${k}-2400.webp" width="2400" height="1350" alt="" fetchpriority="high" decoding="async"></picture>`
      : `<img src="${wix(t.hero || t.image, 1600)}" alt="" decoding="async">`;
    return `<div class="ph-rig"><figure class="ph-scene is-on${k ? '' : ' soft'}" data-move="push">${pic}</figure></div>`;
  };
  const abs = p => new URL(p, CONFIG.siteUrl).href;
  const setMeta = (name, v) => { const el = $(`meta[name="${name}"]`); if (el) el.content = v || ''; };
  const ctaLabel = t => { const s = effStatus(t); return s === 'past' ? 'Ask about the next departure' : s === 'soon' ? 'Ask about this tour' : s === 'offer' ? 'Book this offer' : 'Request a quote'; };
  const flagImg = t => (t.flag ? `<img class="flag" src="https://flagcdn.com/w40/${t.flag}.png" srcset="https://flagcdn.com/w80/${t.flag}.png 2x" width="20" height="15" alt="${esc(t.country || '')} flag" loading="lazy">` : '');
  const statusPill = t => `<span class="status-pill ${effStatus(t)}"><i></i>${esc(statusLabel(t))}</span>`;
  // Destination label: the country for overseas packages, the region for local ones
  const destLabel = t => (t.region === 'intl' && t.country ? t.country : regionLabel(t));
  // Image badge: "Departed", a price tag for priced offers, or a label that does not repeat the status pill
  const cardBadge = t => {
    const s = effStatus(t);
    if (s === 'past') return '<span class="badge grey">Departed</span>';
    if (t.price) return `<span class="badge gold">${esc(t.price.label)} ${money(t.price)}</span>`;
    if (t.badge && t.badge.toLowerCase() !== statusLabel(t).toLowerCase()) return `<span class="badge ${badgeClass(t.badge)}">${esc(t.badge)}</span>`;
    return '';
  };
  /* ---- Packages are grouped and filtered by country ---- */
  const cSlug = v => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const countryList = tours => {
    const m = new Map();
    (tours || IC.tours || []).forEach(t => {
      const k = t.country || 'Other';
      if (!m.has(k)) m.set(k, { name: k, flag: t.flag, slug: cSlug(k), count: 0 });
      m.get(k).count++;
    });
    return [...m.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  };
  const countryTabs = (host, allLabel, tours, showAllCount) => {
    if (!host) return [];
    const list = countryList(tours);
    host.innerHTML =
      `<button class="tab active" type="button" data-filter="all">${esc(allLabel)}${showAllCount ? `<span class="count">${(tours || IC.tours).length}</span>` : ''}</button>` +
      list.map(c => `<button class="tab" type="button" data-filter="${esc(c.slug)}">${c.flag ? `<img class="flag" src="https://flagcdn.com/w40/${esc(c.flag)}.png" width="20" height="15" alt="" loading="lazy">` : ''}${esc(c.name)}<span class="count">${c.count}</span></button>`).join('');
    return $$('.tab', host);
  };

  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  /* ---- Inclusion summary tags, derived from each package's inclusion list ---- */
  const INC_TAGS = [
    { re: /charter flight|airfare|economy air|round ?trip.*flight/i, label: 'Airfare', icon: 'plane' },
    { re: /airport transfer|airport pick/i, label: 'Airport transfers', icon: 'plane' },
    { re: /hotel|accommodation|resort|night/i, label: 'Hotel', icon: 'bed' },
    { re: /breakfast|meal|lunch|dinner|buffet/i, label: 'Meals', icon: 'meal' },
    { re: /boat ticket|ferry|fast ?craft/i, label: 'Boat ticket', icon: 'boat' },
    { re: /coach|transportation|air-?conditioned van|van|coaster|bus/i, label: 'Transport', icon: 'bus' },
    { re: /guide/i, label: 'Tour guide', icon: 'guide' },
    { re: /entrance|terminal fee/i, label: 'Entrance fees', icon: 'ticket' },
    { re: /sightseeing/i, label: 'Sightseeing', icon: 'camera' },
    { re: /insurance/i, label: 'Insurance', icon: 'shield' },
    { re: /baggage|hand carry/i, label: 'Baggage', icon: 'bag' },
    { re: /pasalubong|souvenir/i, label: 'Pasalubong', icon: 'gift' }
  ];
  const incTags = t => {
    if (!t || !t.inclusions || !t.inclusions.length || t.status === 'soon') return [];
    const hay = t.inclusions.join(' · ');
    if (/provided on request|coming soon/i.test(hay)) return [];
    return INC_TAGS.filter(x => x.re.test(hay));
  };
  const incTagsHtml = (t, max) => {
    const tags = incTags(t);
    if (!tags.length) return '';
    const shown = max ? tags.slice(0, max) : tags;
    const extra = tags.length - shown.length;
    return `<ul class="inc-tags" aria-label="What is included">${shown.map(x => `<li>${I[x.icon]}<span>${esc(x.label)}</span></li>`).join('')}${extra > 0 ? `<li class="more">+${extra}</li>` : ''}</ul>`;
  };

  /* ---- Travel dates link to the inquiry form with the dates pre-filled ---- */
  const dateChipIso = (d, t) => {
    const m = String(d.d || '').match(/([A-Za-z]{3})[a-z]*\s*(\d{1,2})/);
    if (!m) return '';
    const mo = MONTHS[m[1].toLowerCase()];
    if (mo == null) return '';
    const y = d.y || t.year || new Date().getFullYear();
    return `${y}-${String(mo + 1).padStart(2, '0')}-${String(+m[2]).padStart(2, '0')}`;
  };
  const dateChipHref = (d, t) => {
    const q = new URLSearchParams({ service: 'tour', package: t.id });
    const iso = dateChipIso(d, t);
    if (iso) q.set('date', iso);
    q.set('notes', `Preferred travel dates: ${d.d}${d.y || t.year ? ' ' + (d.y || t.year) : ''}${d.add ? ` (peak-date surcharge ${money(t.price, d.add)} per pax)` : ''}`);
    return 'contact.html?' + q.toString();
  };

  const svg = (p, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
  const I = {
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    x: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    plane: svg('<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>'),
    arrow: svg('<path d="M5 12h14M12 5l7 7-7 7"/>', 'class="arrow"'),
    left: svg('<path d="m15 18-6-6 6-6"/>'),
    info: svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
    cal: svg('<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    tag: svg('<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'),
    bed: svg('<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>'),
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    msg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.99-.88a.8.8 0 0 1 .53-.04c.91.25 1.88.39 2.9.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z"/></svg>',
    phone: svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    mail: svg('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>'),
    card: svg('<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>'),
    bank: svg('<path d="M3 21h18"/><path d="M5 21V10M9 21V10M15 21V10M19 21V10"/><path d="m12 3 9 5H3z"/>'),
    wallet: svg('<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M18 12h.01"/>'),
    meal: svg('<path d="M3 2v7a3 3 0 0 0 6 0V2"/><path d="M6 2v20"/><path d="M17 2v20"/><path d="M17 12c2.2 0 4-1.8 4-4V2h-4"/>'),
    bus: svg('<path d="M8 6v6M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>'),
    guide: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21a7 7 0 0 1 13 0"/>'),
    shield: svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
    ticket: svg('<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v14"/>'),
    boat: svg('<path d="M3 18a4 4 0 0 0 3.5-2 4 4 0 0 0 7 0 4 4 0 0 0 7 0"/><path d="M4 14 12 3l8 11"/><path d="M12 3v11"/>'),
    camera: svg('<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>'),
    bag: svg('<path d="M6 20V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"/><rect width="16" height="14" x="4" y="6" rx="2"/><path d="M9 4V2h6v2"/>'),
    gift: svg('<rect width="20" height="5" x="2" y="7" rx="1"/><path d="M12 22V7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'),
    passport: svg('<path d="M4 4a2 2 0 0 1 2-2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2z"/><circle cx="11.5" cy="10" r="3"/><path d="M8.5 16h6"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    translate: svg('<path d="M4 5h9"/><path d="M8 3v2c0 5-2.5 8-6 9"/><path d="M6 9c0 3 3 5.5 7 6.5"/><path d="m21 22-4-9-4 9"/><path d="M14.5 18.5h5"/>'),
    wifi: svg('<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>'),
    landmark: svg('<path d="M3 22h18"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="M4 11h16"/><path d="m12 3 8 5H4z"/>')
  };

  /* ===================== Header, progress bar, drawer ===================== */
  function initHeader() {
    const header = $('#header');
    let bar = $('.scroll-progress');
    if (!bar) { bar = document.createElement('div'); bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.prepend(bar); }
    // The scrollable height only changes on resize or as content loads, so
    // measure it there and cache it. Reading it inside the scroll handler
    // forced a layout on every scroll event, the main scroll-jank source. The
    // paint is coalesced to one write per frame.
    let max = 0, ticking = false, heroEnd = 0, heroEl = null;
    // On every page the header floats over the opening hero (body[data-hero-top])
    // and stays transparent until the hero has scrolled out from under it.
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      heroEl = document.body.hasAttribute('data-hero-top') ? $('.hero-tl, .page-hero, .pkg-hero') : null;
      heroEnd = heroEl ? heroEl.getBoundingClientRect().top + window.scrollY + heroEl.offsetHeight - (header ? header.offsetHeight : 80) - 12 : 0;
    };
    const paint = () => {
      ticking = false;
      if (header) header.classList.toggle('scrolled', window.scrollY > 10);
      if (header) header.classList.toggle('on-hero', !!heroEl && window.scrollY < heroEnd);
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    // Layout is read in the next frame, once, so the reads don't force extra layouts of a
    // page that the other scripts are still building. Until then the header simply starts
    // over the hero, which is where every page opens.
    let pending = 0;
    const remeasure = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0; measure();
        // Pages that build their hero in script (package, team) call this once it exists;
        // a page left without a hero gets the ordinary sticky header back.
        if (!heroEl && document.body.hasAttribute('data-hero-top')) { document.body.removeAttribute('data-hero-top'); measure(); }
        paint();
      });
    };
    heroEl = document.body.hasAttribute('data-hero-top') ? $('.hero-tl, .page-hero, .pkg-hero') : null;
    if (header && heroEl && window.scrollY === 0) header.classList.add('on-hero');
    remeasure();
    IC.refreshHeader = remeasure;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure, { passive: true });
    window.addEventListener('load', remeasure);
    const page = document.body.dataset.page, sub = document.body.dataset.sub;
    $$('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === page));
    $$('[data-sub]').forEach(a => { const on = !!sub && a.dataset.sub === sub; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); });

    /* Services menu: opens on hover (mouse), on the caret button (touch, keyboard),
       and shows a photo of whichever service the pointer or focus is on. */
    const item = $('#navServicesItem');
    if (item) {
      const caret = $('.nav-caret', item), shot = $('.nm-shot img', item), cap = $('.nm-shot figcaption', item);
      const items = $$('.nm-item', item);
      let timer = 0, want = '';
      const setShot = a => {
        if (!a || !shot) return;
        items.forEach(x => x.classList.toggle('is-hot', x === a));
        const src = a.dataset.shot; if (!src || want === src) return;
        want = src; shot.classList.add('swap');
        const im = new Image();
        im.onload = () => { if (want !== src) return; shot.src = src; cap.textContent = ($('b', a) || a).textContent; requestAnimationFrame(() => shot.classList.remove('swap')); };
        im.src = src;
      };
      const open = () => {
        clearTimeout(timer); if (item.classList.contains('open')) return;
        item.classList.add('open'); caret.setAttribute('aria-expanded', 'true');
        setShot($('.nm-item.active', item) || items[0]);
      };
      const close = now => {
        clearTimeout(timer);
        const done = () => { item.classList.remove('open'); caret.setAttribute('aria-expanded', 'false'); };
        if (now) done(); else timer = setTimeout(done, 240);
      };
      item.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(timer); timer = setTimeout(open, 60); } });
      item.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') close(); });
      caret.addEventListener('click', () => (item.classList.contains('open') ? close(true) : open()));
      items.forEach(a => { a.addEventListener('pointerenter', () => setShot(a)); a.addEventListener('focus', () => setShot(a)); });
      item.addEventListener('keydown', e => { if (e.key === 'Escape' && item.classList.contains('open')) { close(true); caret.focus(); } });
      item.addEventListener('focusout', e => { if (!item.contains(e.relatedTarget)) close(true); });
      document.addEventListener('pointerdown', e => { if (!item.contains(e.target)) close(true); });
    }

    const toggle = $('#navToggle'), drawer = $('#drawer');
    if (toggle && drawer) {
      const open = () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
      const close = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
      toggle.addEventListener('click', () => (drawer.classList.contains('open') ? close() : open()));
      $$('[data-close-drawer]', drawer).forEach(el => el.addEventListener('click', close));
      $$('a', drawer).forEach(a => a.addEventListener('click', close));
      window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
      // the drawer's Services list folds open; it starts open on a service page
      $$('.drawer-toggle', drawer).forEach(b => {
        const list = document.getElementById(b.getAttribute('aria-controls')); if (!list) return;
        const set = on => { b.setAttribute('aria-expanded', String(on)); list.hidden = !on; };
        b.addEventListener('click', () => set(list.hidden));
        if (page === b.dataset.nav) set(true);
      });
    }
  }

  function initContactLinks() {
    $$('[data-msg]').forEach(a => { a.href = CONFIG.messenger; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-fb]').forEach(a => { a.href = CONFIG.facebook; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-tel]').forEach(a => { a.href = CONFIG.mobileHref; if (!a.hasAttribute('data-keep')) a.textContent = CONFIG.mobile; });
    $$('[data-landline]').forEach(a => { a.href = CONFIG.landlineHref; if (!a.hasAttribute('data-keep')) a.textContent = CONFIG.landline; });
    $$('[data-mail]').forEach(a => { a.href = 'mailto:' + CONFIG.email; if (!a.hasAttribute('data-keep')) a.textContent = CONFIG.email; });
    $$('[data-year]').forEach(e => (e.textContent = new Date().getFullYear()));
  }

  /* ===================== Motion: reveal, tilt, hero words ===================== */
  function initReveal() {
    const els = $$('.reveal');
    // scripts that add content later (pages.js) hand their .reveal elements to IC.reveal
    if (reduced || !('IntersectionObserver' in window)) { IC.reveal = list => list.forEach(e => e.classList.add('in')); IC.reveal(els); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    IC.reveal = list => list.forEach(e => io.observe(e));
    els.forEach(e => io.observe(e));
  }

  /* ---------- Headline: masked word reveal ----------
     Every word is put in a clipping wrapper and slides up from under it, one
     after another. The wrappers open again once the run is over so the gold
     underline under the highlighted word is never clipped. Runs on CSS
     transitions; the class on .hero is what starts them.                  */
  function initHeroTitle() {
    const t = $('.hero-title[data-split]');
    if (!t) return;
    let i = 0;
    const wrap = node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className = 'w';
          const inner = document.createElement('span');
          inner.textContent = part; inner.style.setProperty('--wi', i++);
          w.appendChild(inner); frag.appendChild(w);
        });
        node.parentNode.replaceChild(frag, node);
      } else Array.from(node.childNodes).forEach(wrap);
    };
    Array.from(t.childNodes).forEach(wrap);
    t.classList.add('is-split');   // 'split' is taken by a two-column section layout
    const settle = () => t.classList.add('words-done');
    if (reduced) settle(); else setTimeout(settle, 1200 + i * 80);
  }

  /* ---------- Hero entrance ----------
     Two frames of breathing room so the starting state paints before the
     transitions begin, otherwise the first word can appear already in place. */
  function initHeroStage() {
    const hero = $('.hero, .page-hero');
    if (!hero) return;
    const on = () => hero.classList.add('is-in');
    if (reduced) { on(); return; }
    // Two frames normally; the timer is the safety net for a tab that opens in
    // the background, where animation frames do not run until it is looked at.
    requestAnimationFrame(() => requestAnimationFrame(on));
    setTimeout(on, 600);
  }

  /* ---------- Hero controls ----------
     The background is deliberately still: no pointer parallax, no scroll
     drift. What is left is the scroll cue, and a small light inside the two
     hero buttons that follows the cursor while it is over them.          */
  function initHeroMotion() {
    const hero = $('.hero');
    if (!hero) return;

    if (!reduced && !touch) {
      $$('.hero-actions .btn', hero).forEach(b => {
        let br = null;
        b.addEventListener('pointerenter', () => { br = b.getBoundingClientRect(); });
        b.addEventListener('pointermove', e => {
          const r = br || (br = b.getBoundingClientRect());
          b.style.setProperty('--bx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
          b.style.setProperty('--by', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
        }, { passive: true });
        b.addEventListener('pointerleave', () => { br = null; });
      });
    }

    const cue = $('#heroScroll');
    if (cue) cue.addEventListener('click', () => {
      const next = $('#plan') || $('#offers') || hero.nextElementSibling;
      if (next) window.scrollTo({ top: next.getBoundingClientRect().top + window.scrollY - 90, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- "Now booking" line ----------
     Cycles through the packages that are actually bookable, links straight to
     the one on show, pauses on hover, focus and when the tab is hidden.    */
  function initHeroNext() {
    const box = $('#heroNext'), slot = $('#heroNextSlot');
    if (!box || !slot || !IC.tours) return;
    const list = IC.tours.filter(t => t.price && t.status !== 'soon' && effStatus(t) !== 'past');
    if (!list.length) return;

    // The pill is narrow, so the filler words in a package name come out and the
    // recognisable part stays: "Da Nang Charter Flight 6D4N Tour" -> "Da Nang 6D4N".
    const shortName = t => String(t.name).replace(/charter flight/i, '').replace(/\s*tour\s*$/i, '').replace(/\s{2,}/g, ' ').trim();
    slot.innerHTML = list.map(t =>
      `<span class="hn-item">${flagImg(t)}<b>${esc(shortName(t))}</b><i>from ${money(t.price)}</i></span>`).join('');
    const nodes = $$('.hn-item', slot);
    box.hidden = false;

    let cur = 0;
    const go = n => {
      nodes.forEach(el => el.classList.remove('out'));
      if (n !== cur) { nodes[cur].classList.remove('on'); nodes[cur].classList.add('out'); }
      nodes[n].classList.add('on');
      cur = n;
      const t = list[n];
      box.href = pkgUrl(t);
      box.setAttribute('aria-label', 'Now booking: ' + t.name + ', from ' + money(t.price) + '. Open the package.');
    };
    go(0);
    if (reduced || nodes.length < 2) return;

    const DUR = 4200;
    box.style.setProperty('--hn-dur', DUR + 'ms');
    box.classList.add('ticking');
    let timer = Motion.paused ? 0 : setInterval(() => go((cur + 1) % nodes.length), DUR);
    if (!timer) box.classList.add('paused');
    const pause = () => { if (timer) { clearInterval(timer); timer = 0; box.classList.add('paused'); } };
    const play = () => {
      if (timer || Motion.paused) return;
      box.classList.remove('paused', 'ticking');
      void box.offsetWidth;                     // restart the progress bar in step
      box.classList.add('ticking');
      timer = setInterval(() => go((cur + 1) % nodes.length), DUR);
    };
    box.addEventListener('pointerenter', pause);
    box.addEventListener('pointerleave', play);
    box.addEventListener('focus', pause);
    box.addEventListener('blur', play);
    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
    Motion.on(p => (p ? pause() : play()));
  }

  /* ---------- Hero quote card ----------
     Destination chips fill the field in one tap, and a meter shows how many of
     the four basics are in. All four filled and the send button lights up.  */
  function initQuoteCard() {
    const card = $('#quickQuote');
    if (!card) return;
    const dest = $('#qq_dest', card), picks = $('#qqPicks', card);

    if (picks && IC.heroPicks && IC.heroPicks.length) {
      picks.innerHTML = '<span class="pick-label">Popular right now</span>' + IC.heroPicks.map((d, i) =>
        `<button class="pick" type="button" data-q="${esc(d.q)}" style="--i:${i}">` +
        (d.flag ? `<img class="flag" src="https://flagcdn.com/w40/${esc(d.flag)}.png" width="16" height="12" alt="" loading="lazy">` : '') +
        `${esc(d.q)}</button>`).join('');
      picks.hidden = false;
      picks.addEventListener('click', e => {
        const b = e.target.closest('.pick');
        if (!b || !dest) return;
        const already = b.classList.contains('on');
        dest.value = already ? '' : b.dataset.q;
        dest.dispatchEvent(new Event('input', { bubbles: true }));
      });
    }

    const fill = $('#qcFill', card), count = $('#qcCount', card), submit = $('button[type=submit]', card);
    const fields = ['qq_service', 'qq_dest', 'qq_date', 'qq_pax'].map(id => $('#' + id, card)).filter(Boolean);
    const sync = () => {
      const n = fields.filter(f => String(f.value || '').trim()).length;
      if (fill) fill.style.setProperty('--v', (n / fields.length).toFixed(2));
      if (count) count.textContent = n === fields.length ? 'Ready to send' : n + ' of ' + fields.length;
      if (submit) submit.classList.toggle('ready', n === fields.length);
      card.classList.toggle('ready', n === fields.length);
      // a destination typed by hand keeps the matching chip in step
      if (picks && dest) {
        const v = dest.value.trim().toLowerCase();
        $$('.pick', picks).forEach(x => x.classList.toggle('on', x.dataset.q.toLowerCase() === v));
      }
    };
    fields.forEach(f => { f.addEventListener('input', sync); f.addEventListener('change', sync); });
    sync();
  }

  function initTicker() {
    const track = $('#ticker');
    if (!track || !IC.destinationsTicker) return;
    const items = IC.destinationsTicker.map(([n, s]) => `<span class="marquee-item">${esc(n)}<small>${esc(s)}</small></span>`).join('');
    track.innerHTML = items + items;
    const bar = track.closest('.marquee');
    if (!bar || reduced) return;
    Motion.button(bar, 'on-navy');
    if ('IntersectionObserver' in window) new IntersectionObserver(en => bar.classList.toggle('is-idle', !en[0].isIntersecting)).observe(bar);
  }

  /* ===================== Tour cards ===================== */
  function badgeClass(b) {
    b = (b || '').toLowerCase();
    if (b.includes('soon')) return 'grey';
    if (b.includes('offer')) return '';
    if (b.includes('heritage')) return 'blue';
    if (b.includes('featured')) return 'gold';
    return 'navy';
  }
  function priceBlock(t, big) {
    if (t.price) return `<div class="price ${big ? 'big' : ''}"><small>${esc(t.price.label)}</small><strong>${money(t.price)}</strong><span>${esc(t.price.unit)}</span></div>`;
    return `<div class="price"><small>Pricing</small><strong class="soft">Quotation on request</strong></div>`;
  }
  function tourCard(t, i) {
    const shown = t.places.slice(0, 3), more = t.places.length - shown.length;
    return `
    <article class="tour-card ${effStatus(t) === 'soon' || effStatus(t) === 'past' ? 'soon' : ''}" style="animation-delay:${Math.min(i, 8) * 60}ms">
      <a class="tour-media" href="${pkgUrl(t)}" aria-label="${esc(t.name)}">
        ${cardBadge(t)}
        <img src="${wix(t.image, 640, 480, t.imageAlign)}" alt="${esc(t.alt)}" loading="lazy" width="640" height="480">
        <div class="tour-meta">
          ${t.duration ? `<span class="pill glass">${I.clock}${esc(t.duration)}</span>` : ''}
          ${t.departure ? `<span class="pill glass">${I.plane}${esc(t.departure.split(' (')[0])}</span>` : ''}
        </div>
      </a>
      <div class="tour-body">
        <div class="tour-region"><span>${flagImg(t)}${esc(destLabel(t))}</span>${statusPill(t)}</div>
        <h3><a href="${pkgUrl(t)}">${esc(t.name)}</a></h3>
        <p class="tour-intro">${esc(t.summary)}</p>
        ${incTagsHtml(t, 4)}
        <ul class="tour-highlights">
          ${shown.map(p => `<li>${I.check}<span>${esc(p)}</span></li>`).join('')}
          ${more > 0 ? `<li class="more">+ ${more} more places</li>` : ''}
        </ul>
        <div class="tour-foot">
          ${priceBlock(t)}
          <div class="actions">
            <a class="btn btn-outline" href="${pkgUrl(t)}">View package</a>
            <a class="btn btn-primary" href="contact.html?service=tour&package=${encodeURIComponent(t.id)}">${ctaLabel(t)}</a>
          </div>
        </div>
      </div>
    </article>`;
  }
  function renderTours(grid, list) {
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state"><h3 class="h3">No packages match those filters</h3><p class="muted">Try another region, or ask us for a custom itinerary.</p><a class="btn btn-primary" style="margin-top:18px" href="contact.html?service=tour&package=custom">Request a custom tour ${I.arrow}</a></div>`;
      return;
    }
    grid.innerHTML = list.map(tourCard).join('');
  }

  function initFeatured() {
    const grid = $('#featuredGrid');
    if (!grid || !IC.tours) return;
    // Three packages, reshuffled on every page load (departed and coming-soon packages excluded)
    const live = IC.tours.filter(t => effStatus(t) !== 'past' && effStatus(t) !== 'soon');
    const tabs = countryTabs($('#featuredTabs'), 'Featured', live, false);
    const show = country => renderTours(grid, shuffle(country === 'all' ? live : live.filter(t => cSlug(t.country) === country)).slice(0, 3));
    tabs.forEach(tab => tab.addEventListener('click', () => { tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); show(tab.dataset.filter); }));
    show('all');
  }

  /* ---- Special offers (packages with a published price) ---- */
  function initOffers() {
    const grid = $('#offersGrid');
    if (!grid || !IC.tours) return;
    const offers = IC.tours.filter(t => t.price && effStatus(t) !== 'past');
    grid.innerHTML = offers.map((t, i) => `
      <article class="offer-card reveal" style="--d:${i * 0.1}s">
        <a class="offer-media" href="${pkgUrl(t)}"><img src="${wix(t.image, 520, 390, t.imageAlign)}" alt="${esc(t.alt)}" loading="lazy" width="520" height="390">${cardBadge(t)}</a>
        <div class="offer-body">
          <div class="offer-kickers"><span class="offer-kicker">${flagImg(t)}${esc(t.country)}</span><span class="offer-kicker">${I.plane}${esc(t.departure.split(' (')[0])} departure</span><span class="offer-kicker">${I.clock}${esc(t.duration)}</span></div>
          ${statusPill(t)}
          <h3><a href="${pkgUrl(t)}">${esc(t.name)}</a></h3>
          <p>${esc(t.summary)}</p>
          ${incTagsHtml(t, 4)}
          <div class="offer-foot">
            ${priceBlock(t, true)}
            <div class="offer-dates">${I.cal}<span>${t.travelDates.length} departure dates in 2026</span></div>
          </div>
          <div class="offer-actions">
            <a class="btn btn-primary" href="${pkgUrl(t)}">See itinerary ${I.arrow}</a>
            <a class="btn btn-outline" href="contact.html?service=tour&package=${encodeURIComponent(t.id)}">Book this offer</a>
          </div>
        </div>
      </article>`).join('');
  }

  /* ---- Tours page ---- */
  function initToursPage() {
    const grid = $('#toursGrid');
    if (!grid || !IC.tours) return;
    const search = $('#tourSearch'), dur = $('#durationSel'), sort = $('#sortSel'), count = $('#resultsCount'), clear = $('#clearFilters');
    const tabs = countryTabs($('#regionTabs'), 'All packages', IC.tours, true);
    const params = new URLSearchParams(location.search);
    const slugs = countryList().map(c => c.slug);
    // Older links used ?region=cebu|bohol|visayas|intl
    const legacy = { cebu: 'philippines', bohol: 'philippines', visayas: 'philippines', intl: 'all' };
    let country = params.get('country') && slugs.includes(cSlug(params.get('country'))) ? cSlug(params.get('country'))
      : (params.get('region') && legacy[params.get('region')]) || 'all';
    if (!slugs.includes(country)) country = 'all';
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.filter === country);
      t.addEventListener('click', () => { country = t.dataset.filter; tabs.forEach(x => x.classList.toggle('active', x === t)); apply(); });
    });
    const fTog = $('#filtersToggle'), fBox = $('.filters');
    if (fTog && fBox) fTog.addEventListener('click', () => {
      const open = fBox.classList.toggle('open');
      fTog.setAttribute('aria-expanded', String(open));
    });
    const durOk = (t, v) => v === 'all' || (v === 'day' && t.days === 1) || (v === 'multi' && t.days >= 2) || (v === 'offer' && effStatus(t) === 'offer') || (v === 'soon' && effStatus(t) === 'soon') || (v === 'past' && effStatus(t) === 'past');
    const order = { offer: 0, available: 1, request: 2, soon: 3, past: 9 };
    function apply() {
      const q = (search.value || '').trim().toLowerCase();
      const list = IC.tours.filter(t =>
        (country === 'all' || cSlug(t.country) === country) && durOk(t, dur.value) &&
        (!q || (t.name + ' ' + regionLabel(t) + ' ' + (t.country || '') + ' ' + t.places.join(' ') + ' ' + t.inclusions.join(' ')).toLowerCase().includes(q))
      );
      switch (sort.value) {
        case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'duration': list.sort((a, b) => (a.days || 99) - (b.days || 99)); break;
        case 'price': list.sort((a, b) => priceValue(a) - priceValue(b)); break;
        default: list.sort((a, b) => (order[effStatus(a)] - order[effStatus(b)]) || ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)));
      }
      renderTours(grid, list);
      const cName = (countryList().find(c => c.slug === country) || {}).name;
      count.innerHTML = `Showing <strong>${list.length}</strong> of ${IC.tours.length} packages` + (cName ? ` in <strong>${esc(cName)}</strong>` : '');
    }
    [search, dur, sort].forEach(el => el.addEventListener('input', apply));
    clear.addEventListener('click', () => { search.value = ''; dur.value = 'all'; sort.value = 'featured'; country = 'all'; tabs.forEach(x => x.classList.toggle('active', x.dataset.filter === 'all')); apply(); });
    apply();
  }

  /* ===================== Package detail page ===================== */
  function initPackagePage() {
    const root = $('#pkgPage');
    if (!root || !IC.tours) return;
    const params = new URLSearchParams(location.search);
    // Pre-built pages carry their package id; the old package.html?id= address forwards to them.
    const baked = document.body.dataset.pkg;
    const id = baked || params.get('id');
    const t = IC.tours.find(x => x.id === id);
    if (t && !baked && !params.has('bake')) { location.replace(pkgUrl(t) + location.hash); return; }
    if (!t) {
      root.innerHTML = `<section class="section"><div class="container text-center"><span class="eyebrow center">Package not found</span><h1 class="h2" style="margin-bottom:12px">We couldn’t find that package</h1><p class="lead" style="margin:0 auto 24px">It may have been renamed. Browse all current packages instead.</p><a class="btn btn-primary btn-lg" href="tours.html">Browse tour packages ${I.arrow}</a></div></section>`;
      return;
    }
    const region = destLabel(t);
    const related = IC.tours.filter(x => x.id !== t.id && x.country === t.country).slice(0, 3);
    const hasDates = t.travelDates && t.travelDates.length;
    const hasIt = t.itinerary && t.itinerary.length;
    const hasPosters = t.posters && t.posters.length;
    const guide = IC.countryGuide && IC.countryGuide[t.country];
    const hasGuide = !!(guide && guide.length);
    const gallery = t.gallery && t.gallery.length ? t.gallery : [t.image];

    // Dates can run into the next year, so the heading takes its year(s) from the dates themselves.
    const years = hasDates ? [...new Set(t.travelDates.map(d => Number(d.y || t.year)).filter(Boolean))].sort() : [];
    const yearsLabel = years.length > 1 ? `${years[0]}\u2013${years[years.length - 1]}` : years.length ? String(years[0]) : '';

    if (!baked) {   // a pre-built page already has its own title, description and share tags
    document.title = `${t.name} | ${CONFIG.shortName}`;
    const md = $('meta[name="description"]'); if (md) md.content = t.summary;
    const og = $('meta[property="og:title"]'); if (og) og.content = t.name;
    const ogd = $('meta[property="og:description"]'); if (ogd) ogd.content = t.summary;
    const ogi = $('meta[property="og:image"]'); if (ogi) ogi.content = abs(wix(t.image, 1200, 630, t.imageAlign));
    // Each package is its own page for search and social: canonical URL, cards and TouristTrip data
    const self = abs(pkgUrl(t));
    const canon = $('link[rel="canonical"]'); if (canon) canon.href = self;
    const ogu = $('meta[property="og:url"]'); if (ogu) ogu.content = self;
    setMeta('twitter:title', t.name); setMeta('twitter:description', t.summary); setMeta('twitter:image', ogi ? ogi.content : '');
    }

    // Travel dates lead: they are what a visitor books, so they come first in the tabs and on the page
    const tabs = [hasDates ? ['dates', 'Dates & price'] : null, ['overview', 'Overview'], hasIt ? ['itinerary', 'Itinerary'] : null, ['inclusions', 'Inclusions'], ['places', 'Places'], hasGuide ? ['guide', 'Know before you go'] : null, hasPosters ? ['posters', 'Posters'] : null].filter(Boolean);

    const GUIDE_ICONS = { entry: I.passport, money: I.wallet, weather: I.sun, transport: I.bus, language: I.translate, culture: I.landmark, safety: I.shield, connectivity: I.wifi, food: I.meal };

    root.innerHTML = `
      <section class="pkg-hero">
        <div class="hero-bg" aria-hidden="true">${pkgHeroBg(t)}</div>
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>${I.left.replace('m15 18-6-6 6-6', 'm9 18 6-6-6-6')}<a href="tours.html">Tour Packages</a>${I.left.replace('m15 18-6-6 6-6', 'm9 18 6-6-6-6')}<span>${esc(region)}</span></nav>
          <div class="chips pkg-chips">
            ${t.badge && t.badge.toLowerCase() !== statusLabel(t).toLowerCase() ? `<span class="pill gold">${esc(t.badge)}</span>` : ''}
            ${t.price ? `<span class="pill gold">${esc(t.price.label)} ${money(t.price)}</span>` : ''}
            <span class="pill glass">${flagImg(t)}${esc(region)}</span>
            ${t.duration ? `<span class="pill glass">${I.clock}${esc(t.duration)}</span>` : ''}
            ${t.departure ? `<span class="pill glass chip-departure">${I.plane}Departs ${esc(t.departure)}</span>` : ''}
            <span class="chip-status">${statusPill(t)}</span>
          </div>
          <h1 class="h1 pkg-title">${esc(t.name)}</h1>
          ${t.subtitle ? `<p class="pkg-subtitle script">${esc(t.subtitle)}</p>` : ''}
          <p class="lead pkg-lead">${esc(t.summary)}</p>
          ${effStatus(t) === 'past' ? `<div class="pkg-past">${I.info}<span>This departure has passed${t.travelDates && t.travelDates.length ? ' (' + esc(t.travelDates[t.travelDates.length - 1].d) + ' ' + esc(String(t.travelDates[t.travelDates.length - 1].y || t.year || '')) + ')' : ''}. Ask us about the next schedule.</span></div>` : ''}
        </div>
      </section>

      <nav class="pkg-tabs" aria-label="Package sections"><div class="container">${tabs.map(([k, l], i) => `<a href="#${k}" class="${i === 0 ? 'active' : ''}">${l}</a>`).join('')}<span class="pkg-tab-ink" aria-hidden="true"></span></div></nav>

      <section class="section-tight">
        <div class="container pkg-layout">
          <div class="pkg-main">
            <div class="pkg-gallery reveal" id="pkgGallery">
              <figure class="pkg-gallery-main" data-lb="${esc(gallery[0])}" data-title="${esc(t.name)}"><img src="${wix(gallery[0], 960, 640, t.imageAlign)}" alt="${esc(t.alt)}" width="960" height="640"><figcaption>Tap to enlarge</figcaption></figure>
              ${gallery.length > 1 ? `<div class="pkg-thumbs">${gallery.map((g, i) => `<button type="button" class="${i === 0 ? 'active' : ''}" data-thumb="${esc(g)}" aria-label="Photo ${i + 1}"><img src="${wix(g, 240, 180, t.imageAlign)}" alt="" width="96" height="72" loading="lazy"></button>`).join('')}</div>` : ''}
            </div>

            ${hasDates ? `<article id="dates" class="pkg-section reveal">
              <span class="eyebrow">Dates &amp; price</span>
              <h2 class="h2">Travel dates${yearsLabel ? ' ' + yearsLabel : ''}</h2>
              <p class="muted" style="margin-bottom:18px">${esc(t.travelDatesNote || '')} Base rate ${esc(t.price.label.toLowerCase())} ${money(t.price)} ${esc(t.price.unit)}.</p>
              <div class="date-grid">${t.travelDates.map(d => isPastDate(d, t)
                ? `<span class="date-chip past" title="This departure date has passed">${I.cal}<span>${esc(d.d)}${d.y ? ' ' + d.y : ''}</span></span>`
                : `<a class="date-chip ${d.add ? 'sur' : ''}" href="${dateChipHref(d, t)}" title="Select these dates and send an inquiry">${I.cal}<span>${esc(d.d)}${d.y ? ' ' + d.y : ''}</span>${d.add ? `<em>+${d.cur === 'USD' ? '$' + d.add : peso(d.add)}</em>` : ''}</a>`).join('')}</div>
              <p class="date-hint">${I.arrow.replace('class="arrow"', '')}<span><strong>Tap a date to book it.</strong> Your inquiry form opens with this package and your chosen departure already filled in. Dates in orange carry a peak-season surcharge per pax; greyed dates have passed. Availability is confirmed at booking.</span></p>
            </article>` : ''}

            <article id="overview" class="pkg-section reveal">
              <span class="eyebrow">Overview</span>
              <h2 class="h2">About this ${t.days === 1 ? 'day tour' : 'package'}</h2>
              <p class="pkg-text">${esc(t.overview || t.summary)}</p>
              ${incTagsHtml(t)}
              <div class="pkg-facts">
                ${t.duration ? `<div>${I.clock}<div><small>Duration</small><strong>${esc(t.duration)}</strong></div></div>` : ''}
                ${t.departure ? `<div>${I.plane}<div><small>Departure</small><strong>${esc(t.departure)}</strong></div></div>` : ''}
                <div>${I.pin}<div><small>Destination</small><strong>${esc(region)}</strong></div></div>
                <div>${I.tag}<div><small>Status</small><strong>${esc(statusLabel(t))}</strong></div></div>
              </div>
            </article>

            ${hasIt ? `<article id="itinerary" class="pkg-section reveal">
              <span class="eyebrow">Itinerary</span>
              <h2 class="h2">Day by day</h2>
              <div class="timeline-it">
                ${t.itinerary.map((d, i) => `<details class="it-block" ${i === 0 ? 'open' : ''}><summary><span class="it-num">${esc(d.day)}</span><span class="it-title">${esc(d.title)}</span><span class="plus">${svg('<path d="M12 5v14M5 12h14"/>')}</span></summary><ul>${d.items.map(x => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul></details>`).join('')}
              </div>
            </article>` : ''}

            <article id="inclusions" class="pkg-section reveal">
              <span class="eyebrow">What’s covered</span>
              <h2 class="h2">Inclusions${t.exclusions && t.exclusions.length ? ' & exclusions' : ''}</h2>
              <div class="inc-grid">
                <div class="inc-col"><h3>${I.check} Inclusions</h3><ul>${t.inclusions.map(x => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul></div>
                ${t.exclusions && t.exclusions.length ? `<div class="inc-col exc"><h3>${I.x} Exclusions</h3><ul>${t.exclusions.map(x => `<li>${I.x}<span>${esc(x)}</span></li>`).join('')}</ul></div>` : ''}
              </div>
              ${t.hotels ? `<div class="pkg-note"><strong>${I.bed} Accommodation</strong><ul>${t.hotels.map(h => `<li>${esc(h)}</li>`).join('')}</ul></div>` : ''}
              ${t.optional ? `<div class="pkg-note gold"><strong>${I.star} Optional</strong><ul>${t.optional.map(h => `<li>${esc(h)}</li>`).join('')}</ul></div>` : ''}
              ${t.notes ? `<p class="muted small" style="margin-top:14px">${t.notes.map(esc).join(' ')}</p>` : ''}
            </article>

            <article id="places" class="pkg-section reveal">
              <span class="eyebrow">Places &amp; guide</span>
              <h2 class="h2">Where you’ll go</h2>
              <p class="muted" style="margin-bottom:22px">A short guide to every stop in this package.</p>
              <div class="place-grid">
                ${t.places.map((p, i) => `<div class="place-card" style="--d:${(i % 4) * 0.06}s"><span class="n">${i + 1}</span><div><strong>${esc(p)}</strong><p>${esc(IC.placeInfo[p] || 'Included in this package’s itinerary.')}</p></div></div>`).join('')}
              </div>
            </article>

            ${hasGuide ? `<article id="guide" class="pkg-section reveal">
              <span class="eyebrow">Know before you go</span>
              <h2 class="h2">Your ${esc(t.country)} travel guide</h2>
              <p class="muted" style="margin-bottom:22px">Practical tips for ${esc(t.country)}, from entry rules to what to eat. General guidance for a Philippine traveller — rules and prices change, so confirm the latest before you fly. ${t.region === 'intl' ? 'Need a hand with the visa or tickets? Our team is glad to help.' : ''}</p>
              <div class="guide-grid">
                ${guide.map(g => `<div class="guide-card"><span class="guide-ic">${GUIDE_ICONS[g.ic] || I.info}</span><div class="guide-body"><h3>${esc(g.t)}</h3>${g.lead ? `<p class="guide-lead">${esc(g.lead)}</p>` : ''}<p>${esc(g.body)}</p></div></div>`).join('')}
              </div>
            </article>` : ''}

            ${hasPosters ? `<article id="posters" class="pkg-section reveal">
              <span class="eyebrow">Posters</span>
              <h2 class="h2">Official itinerary posters</h2>
              <p class="muted" style="margin-bottom:18px">Tap a poster to read it in full size.</p>
              <div class="poster-row">${t.posters.map((p, i) => `<figure data-lb="${esc(p)}" data-title="${esc(t.name)} poster ${i + 1}" tabindex="0" role="button" aria-label="View poster ${i + 1}"><img src="${wix(p, 450, 600, 't')}" alt="${esc(t.name)} poster ${i + 1}" loading="lazy" width="450" height="600"></figure>`).join('')}</div>
            </article>` : ''}
          </div>

          <aside class="pkg-side">
            <div class="side-card sticky reveal">
              ${priceBlock(t, true)}
              ${hasDates ? `<ul class="meta"><li>${I.cal}<span>${t.travelDates.length} departure dates${yearsLabel ? ' in ' + yearsLabel : ''}</span></li></ul>` : ''}
              <a class="btn btn-primary btn-block btn-lg" href="contact.html?service=tour&package=${encodeURIComponent(t.id)}">${ctaLabel(t)} ${I.arrow}</a>
              <a class="btn btn-outline btn-block" href="${CONFIG.messenger}" target="_blank" rel="noopener">${I.msg} Message us on Facebook</a>
              <a class="btn btn-light btn-block" href="${CONFIG.mobileHref}">${I.phone} ${esc(CONFIG.mobile)}</a>
              <p class="small muted" style="margin-top:14px">Quotations are free. Inquiries go straight to ${esc(CONFIG.email)}.</p>
            </div>
          </aside>
        </div>
      </section>

      ${related.length ? `<section class="section bg-white"><div class="container">
        <div class="section-head split reveal"><div><span class="eyebrow">You may also like</span><h2 class="h2">Other packages you may like</h2></div><a class="link-arrow" href="tours.html?country=${esc(cSlug(t.country))}">More from ${esc(t.country || regionLabel(t))} ${I.arrow}</a></div>
        <div class="tour-grid" id="relatedGrid"></div>
      </div></section>` : ''}

      <div class="sticky-cta" id="stickyCta">
        <div>${t.price ? `<small>${esc(t.price.label)}</small><strong>${money(t.price)}</strong>` : `<small>Price</small><strong>On request</strong>`}</div>
        <a class="btn btn-primary" href="contact.html?service=tour&package=${encodeURIComponent(t.id)}">${ctaLabel(t)}</a>
      </div>`;

    if (related.length) renderTours($('#relatedGrid', root), related);

    // Gallery thumbs
    const mainImg = $('.pkg-gallery-main img', root), mainFig = $('.pkg-gallery-main', root);
    $$('[data-thumb]', root).forEach(b => b.addEventListener('click', () => {
      $$('[data-thumb]', root).forEach(x => x.classList.remove('active')); b.classList.add('active');
      mainImg.style.opacity = '0';
      setTimeout(() => { mainImg.src = wix(b.dataset.thumb, 960, 640, t.imageAlign); mainFig.dataset.lb = b.dataset.thumb; mainImg.onload = () => (mainImg.style.opacity = '1'); }, 180);
    }));

    // Tabs: active section + sliding ink
    const tabLinks = $$('.pkg-tabs a', root), ink = $('.pkg-tab-ink', root);
    const moveInk = a => { if (!a || !ink) return; const r = a.getBoundingClientRect(), pr = a.parentElement.getBoundingClientRect(); ink.style.width = r.width + 'px'; ink.style.transform = `translateX(${r.left - pr.left + a.parentElement.scrollLeft}px)`; };
    moveInk(tabLinks[0]);
    window.addEventListener('resize', () => moveInk($('.pkg-tabs a.active', root)));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { tabLinks.forEach(a => { const on = a.getAttribute('href') === '#' + en.target.id; a.classList.toggle('active', on); if (on) moveInk(a); }); } }), { rootMargin: '-30% 0px -60% 0px' });
      $$('.pkg-section', root).forEach(s => io.observe(s));
    }
    tabLinks.forEach(a => a.addEventListener('click', e => { e.preventDefault(); const target = $(a.getAttribute('href'), root); if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 150, behavior: reduced ? 'auto' : 'smooth' }); }));

    // Sticky mobile CTA visibility
    const sticky = $('#stickyCta', root);
    window.addEventListener('scroll', () => sticky.classList.toggle('show', window.scrollY > 500), { passive: true });

    // Structured data
    const ld = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: t.name, description: t.summary, url: abs(pkgUrl(t)), image: abs(IC.wixJpg ? IC.wixJpg(t.image) : wix(t.image)), touristType: 'Leisure', itinerary: t.places.map(p => ({ '@type': 'TouristAttraction', name: p })), provider: { '@type': 'TravelAgency', name: CONFIG.brand, telephone: CONFIG.mobile, email: CONFIG.email, url: 'https://www.immaculateconnectionsph.com/' } };
    if (t.price) ld.offers = { '@type': 'Offer', price: t.price.from, priceCurrency: t.price.currency || 'PHP', availability: effStatus(t) === 'past' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', url: abs(pkgUrl(t)) };
    $$('script[data-ld="pkg"]').forEach(x => x.remove());   // the pre-built copy; this one has today's availability
    const s = document.createElement('script'); s.type = 'application/ld+json'; s.dataset.ld = 'pkg'; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

  }

  /* ===================== Lightbox & galleries ===================== */
  let lb;
  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close photo">${I.x}</button><span class="lightbox-count" aria-live="polite"></span><button class="lightbox-nav prev" type="button" aria-label="Previous photo">${I.left}</button><figure style="margin:0;text-align:center"><img alt=""><figcaption></figcaption></figure><button class="lightbox-nav next" type="button" aria-label="Next photo">${I.left}</button>`;
    document.body.appendChild(lb);
    const close = () => {
      lb.classList.remove('open'); document.body.style.overflow = '';
      lbInert.forEach(el => { el.inert = false; }); lbInert = [];
      if (lbReturn && document.contains(lbReturn)) lbReturn.focus({ preventScroll: true });
      lbReturn = null;
    };
    lb.addEventListener('click', e => {
      if (e.target.closest('.lightbox-nav')) { stepLightbox(e.target.closest('.next') ? 1 : -1); return; }
      if (e.target === lb || e.target.closest('.lightbox-close')) close();
    });
    window.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'Tab') {   // keep Tab inside the viewer
        const f = $$('button', lb).filter(b => b.offsetParent !== null);
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
      else if (e.key === 'ArrowRight') stepLightbox(1);
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
    });
    let sx = null;
    lb.addEventListener('pointerdown', e => { sx = e.clientX; });
    lb.addEventListener('pointerup', e => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50 && lbList.length > 1) stepLightbox(dx < 0 ? 1 : -1); });
    return lb;
  }
  // The viewer shows one photo, or steps through a group: openLightbox(src, title, [{src, title}], index)
  let lbList = [], lbAt = 0, lbReturn = null, lbInert = [];
  function showLightbox(dir) {
    const box = ensureLightbox(), it = lbList[lbAt]; if (!it) return;
    const img = $('img', box);
    img.src = it.src; img.alt = it.title || ''; $('figcaption', box).textContent = it.title || '';
    $('.lightbox-count', box).textContent = lbList.length > 1 ? `${lbAt + 1} / ${lbList.length}` : '';
    if (dir && !reduced) img.animate([{ opacity: 0, transform: `translate3d(${dir * 40}px, 0, 0)` }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.16, 1, .3, 1)' });
  }
  function stepLightbox(dir) {
    if (lbList.length < 2) return;
    lbAt = (lbAt + dir + lbList.length) % lbList.length; showLightbox(dir);
  }
  function openLightbox(src, title, list, index) {
    const box = ensureLightbox();
    lbList = list && list.length ? list : [{ src, title }]; lbAt = list && list.length ? Math.max(0, index || 0) : 0;
    box.classList.toggle('single', lbList.length < 2);
    showLightbox(0);
    if (!box.classList.contains('open')) {
      lbReturn = document.activeElement;
      // the page behind is out of reach of Tab and screen readers while the photo is open
      lbInert = [...document.body.children].filter(el => el !== box && !el.inert && el.tagName !== 'SCRIPT');
      lbInert.forEach(el => { el.inert = true; });
    }
    box.classList.add('open'); document.body.style.overflow = 'hidden';
    $('.lightbox-close', box).focus({ preventScroll: true });
  }
  function initGallery() {
    const root = $('#gallery');
    if (root && IC.gallery) {
      const items = root.dataset.limit ? IC.gallery.slice(0, parseInt(root.dataset.limit, 10)) : IC.gallery;
      root.innerHTML = items.map((g, i) => `
        <figure class="gal-item ${g.shape} reveal" style="--d:${(i % 4) * 0.08}s" data-cat="${esc(g.cat || '')}" data-lb="${esc(g.id)}" data-title="${esc(g.title)} · ${esc(g.sub)}" tabindex="0" role="button" aria-label="View ${esc(g.title)}">
          <img src="${wix(g.id, 900, g.shape === 'tall' ? 1200 : g.shape === 'square' ? 900 : 675)}" alt="${esc(g.title)} – ${esc(g.sub)}" loading="lazy" decoding="async" width="900" height="${g.shape === 'tall' ? 1200 : g.shape === 'square' ? 900 : 675}">
          <figcaption>${esc(g.title)}<small>${esc(g.sub)}</small></figcaption>
        </figure>`).join('');
    }
    $$('[data-photos]').forEach(row => {
      const list = IC[row.dataset.photos]; if (!list) return;
      const caps = (row.dataset.captions || '').split('|');
      row.innerHTML = list.map((id, i) => `<figure class="reveal" style="--d:${i * 0.08}s" data-lb="${esc(id)}" data-title="${esc(caps[i] || '')}" tabindex="0" role="button" aria-label="View photo"><img src="${wix(id, 800, 600)}" alt="${esc(caps[i] || 'Photo')}" loading="lazy" decoding="async" width="800" height="600">${caps[i] ? `<figcaption>${esc(caps[i])}</figcaption>` : ''}</figure>`).join('');
    });
    if (root && root.hasAttribute('data-filters')) initGalleryFilters(root);
    // A photo opens in the viewer with the rest of its group (the visible gallery tiles, or its photo row) to step through
    const openFrom = f => {
      const group = f.closest('#gallery, [data-photos]');
      const els = group ? $$('[data-lb]', group).filter(x => !x.hidden) : [f];
      openLightbox(wix(f.dataset.lb), f.dataset.title || '', els.map(x => ({ src: wix(x.dataset.lb), title: x.dataset.title || '' })), els.indexOf(f));
    };
    document.addEventListener('click', e => {
      const f = e.target.closest('[data-lb]'); if (!f || e.target.closest('a,button')) return;
      openFrom(f);
    });
    document.addEventListener('keydown', e => {
      const f = e.target.closest && e.target.closest('[data-lb]');
      if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openFrom(f); }
    });
    // Tiles follow the pointer a little, like looking into a window
    if (!reduced && !touch) $$('.gal-item').forEach(t => {
      t.addEventListener('pointermove', e => {
        const r = t.getBoundingClientRect();
        t.style.setProperty('--gx', ((0.5 - (e.clientX - r.left) / r.width) * 16).toFixed(1) + 'px');
        t.style.setProperty('--gy', ((0.5 - (e.clientY - r.top) / r.height) * 16).toFixed(1) + 'px');
        t.classList.add('is-tracking');
      });
      t.addEventListener('pointerleave', () => { t.classList.remove('is-tracking'); t.style.removeProperty('--gx'); t.style.removeProperty('--gy'); });
    });
  }

  /* ===================== Gallery filters =====================
     The chips re-sort the wall: tiles that stay slide to their new place,
     tiles that arrive fade and grow in (FLIP, so layout is never animated). */
  function initGalleryFilters(root) {
    const bar = $('#galFilters'); if (!bar) return;
    const tiles = $$('.gal-item', root);
    const CATS = [['all', 'All photos'], ['local', 'Philippine tours'], ['intl', 'International'], ['events', 'Seminars & events'], ['transport', 'Transport']];
    const count = k => (k === 'all' ? tiles.length : tiles.filter(t => t.dataset.cat === k).length);
    bar.innerHTML = CATS.filter(([k]) => count(k)).map(([k, l]) => `<button type="button" data-f="${k}" aria-pressed="${k === 'all'}">${esc(l)}<span class="n">${count(k)}</span></button>`).join('');
    bar.addEventListener('click', e => {
      const b = e.target.closest('button[data-f]'); if (!b || b.getAttribute('aria-pressed') === 'true') return;
      const k = b.dataset.f;
      $$('button', bar).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const first = new Map(tiles.map(t => [t, t.hidden ? null : t.getBoundingClientRect()]));
      tiles.forEach(t => { t.hidden = !(k === 'all' || t.dataset.cat === k); if (!t.hidden) t.classList.add('in'); });
      if (reduced) return;
      tiles.forEach(t => {
        if (t.hidden) return;
        const a = first.get(t), b2 = t.getBoundingClientRect();
        if (!a) { t.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.16, 1, .3, 1)' }); return; }
        const dx = a.left - b2.left, dy = a.top - b2.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) t.animate([{ transform: `translate3d(${dx}px, ${dy}px, 0)` }, { transform: 'none' }], { duration: 620, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      });
    });
  }

  /* ===================== About page: one interaction per section =====================
     The trip photos are a pile of prints to shuffle; each value lights up the
     sentence that proves it; mission, vision and team cards tilt toward the
     pointer under a moving spotlight; the badges draw themselves in; and the
     contact band keeps a slow camera on its photo with a light that follows
     the pointer. Everything rests off screen; reduced motion keeps it still. */
  function initAboutFx() {
    const fine = window.matchMedia('(pointer: fine)').matches && !touch;

    /* the pile of prints */
    const stack = $('#abStack');
    if (stack) {
      const deck = $('.ab-deck', stack), prints = $$('.ab-print', stack);
      const SLOTS = [{ px: '0%', py: '0%', pr: '-2deg', ps: 1, z: 3 }, { px: '-15%', py: '-9%', pr: '-8deg', ps: .95, z: 2 }, { px: '14%', py: '-13%', pr: '6deg', ps: .92, z: 1 }];
      let order = prints.map((_, k) => k), timer = null, inView = false, hover = false;
      const lay = () => order.forEach((k, pos) => {
        const p = prints[k], s = SLOTS[Math.min(pos, SLOTS.length - 1)];
        p.style.setProperty('--px', s.px); p.style.setProperty('--py', s.py); p.style.setProperty('--pr', s.pr);
        p.style.setProperty('--ps', s.ps); p.style.setProperty('--z', s.z);
        p.classList.toggle('is-front', pos === 0); p.setAttribute('aria-current', pos === 0 ? 'true' : 'false');
      });
      const front = k => {
        const pos = order.indexOf(k); if (pos <= 0) return;
        order = [k].concat(order.filter(x => x !== k)); lay();
        if (!reduced) prints[k].animate([{ translate: '0 0' }, { translate: '0 -28px' }, { translate: '0 0' }], { duration: 760, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      };
      const stop = () => { clearInterval(timer); timer = null; };
      const start = () => { if (reduced || timer || hover || !inView || document.hidden || Motion.paused) return; timer = setInterval(() => front(order[1]), 4200); };
      prints.forEach((p, k) => p.addEventListener('click', () => { front(k); stop(); start(); }));
      stack.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); front(order[1]); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); front(order[order.length - 1]); }
      });
      if (fine && !reduced) {
        stack.addEventListener('pointerenter', () => { hover = true; stop(); });
        stack.addEventListener('pointermove', e => {
          const r = stack.getBoundingClientRect();
          deck.style.setProperty('--ty', (((e.clientX - r.left) / r.width - .5) * 14).toFixed(2) + 'deg');
          deck.style.setProperty('--tx', ((.5 - (e.clientY - r.top) / r.height) * 12).toFixed(2) + 'deg');
        });
        stack.addEventListener('pointerleave', () => { hover = false; deck.style.setProperty('--ty', '0deg'); deck.style.setProperty('--tx', '0deg'); start(); });
      }
      let sx = null;
      stack.addEventListener('pointerdown', e => { sx = e.clientX; });
      stack.addEventListener('pointerup', e => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 45) front(dx < 0 ? order[1] : order[order.length - 1]); });
      if ('IntersectionObserver' in window) new IntersectionObserver(en => { inView = en[0].isIntersecting; inView ? start() : stop(); }, { threshold: .3 }).observe(stack);
      document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
      Motion.on(p => (p ? stop() : start()));
      Motion.button(stack, 'ab-motion');
      lay();
    }

    /* values that light up their proof */
    const vals = $('.ab-values');
    if (vals) {
      const chips = $$('button[data-k]', vals), marks = $$('.ab-hl');
      let demo = null, touched = false;
      const show = k => {
        chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.k === k)));
        marks.forEach(m => m.classList.toggle('on', m.dataset.k === k));
      };
      const take = k => { touched = true; clearInterval(demo); show(k); };
      chips.forEach(c => {
        c.addEventListener('click', () => take(c.getAttribute('aria-pressed') === 'true' ? '' : c.dataset.k));
        c.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') take(c.dataset.k); });
        c.addEventListener('focus', () => take(c.dataset.k));
      });
      // the first time the section is read, walk through the four values once
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(en => {
          if (!en[0].isIntersecting || touched) return;
          io.disconnect();
          const keys = chips.map(c => c.dataset.k); let i = 0;
          show(keys[0]);
          demo = setInterval(() => { i++; if (i >= keys.length || touched) { clearInterval(demo); if (!touched) show(''); return; } show(keys[i]); }, 1500);
        }, { threshold: .6 });
        io.observe(vals);
      }
    }

    /* tilting cards with a spotlight */
    if (fine && !reduced) $$('.fx-tilt, .tm-card').forEach(card => {
      let r = null;
      card.addEventListener('pointerenter', () => { r = card.getBoundingClientRect(); card.style.setProperty('--spot', '1'); });
      card.addEventListener('pointermove', e => {
        const b = r || (r = card.getBoundingClientRect());
        const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
        card.classList.add('is-tilting');
        card.style.setProperty('--ry', ((x - .5) * 8).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((.5 - y) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', () => { r = null; card.classList.remove('is-tilting'); card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); card.style.setProperty('--spot', '0'); });
    });

    /* badges that draw themselves in */
    $$('.ab-badges').forEach(row => {
      if (reduced) return;
      $$(':scope > div', row).forEach((b, i) => {
        b.style.setProperty('--bi', i);
        $$('svg path, svg circle, svg rect, svg line, svg polyline', b).forEach(s => s.setAttribute('pathLength', '1'));
      });
      row.classList.add('ab-draw');
    });

    /* the contact band: a slow camera and a light that follows the pointer */
    $$('.fx-band').forEach(band => {
      const img = $('img', band); let cam = null;
      if (img && !reduced) {
        cam = img.animate([{ transform: 'scale(1.06) translate3d(-1.5%, 0, 0)' }, { transform: 'scale(1.16) translate3d(1.5%, -1%, 0)' }], { duration: 16000, easing: 'ease-in-out', iterations: Infinity, direction: 'alternate' });
        cam.pause();
        let seen = false;
        if ('IntersectionObserver' in window) new IntersectionObserver(en => { seen = en[0].isIntersecting; seen && !Motion.paused ? cam.play() : cam.pause(); }).observe(band);
        Motion.on(p => (p || !seen ? cam.pause() : cam.play()));
      }
      if (fine && !reduced) {
        band.addEventListener('pointermove', e => {
          const b = band.getBoundingClientRect();
          band.style.setProperty('--mx', ((e.clientX - b.left) / b.width * 100).toFixed(1) + '%');
          band.style.setProperty('--my', ((e.clientY - b.top) / b.height * 100).toFixed(1) + '%');
          band.style.setProperty('--spot', '1');
        });
        band.addEventListener('pointerleave', () => band.style.setProperty('--spot', '0'));
      }
    });
    if (fine && !reduced) $$('.fx-btn').forEach(bt => bt.addEventListener('pointermove', e => {
      const b = bt.getBoundingClientRect();
      bt.style.setProperty('--bx', ((e.clientX - b.left) / b.width * 100).toFixed(1) + '%');
      bt.style.setProperty('--by', ((e.clientY - b.top) / b.height * 100).toFixed(1) + '%');
    }));
  }

  /* ===================== FAQ, sub-nav, misc ===================== */
  function initFaq() {
    $$('.faq').forEach(faq => faq.addEventListener('toggle', e => { if (e.target.open) $$('details[open]', faq).forEach(d => { if (d !== e.target) d.open = false; }); }, true));
  }
  function initSubnav() {
    const nav = $('.subnav');
    if (!nav || !('IntersectionObserver' in window)) return;
    const links = $$('a[href^="#"]', nav), secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-35% 0px -55% 0px' });
    secs.forEach(s => io.observe(s));
  }
  function initMisc() {
    const dl = $('#destList');
    if (dl && IC.destinationsTicker) dl.innerHTML = IC.destinationsTicker.map(([n]) => `<option value="${esc(n)}">`).join('');
    const today = new Date().toISOString().slice(0, 10);
    $$('input[type="date"]').forEach(d => { if (!d.min) d.min = today; });
    const toTop = $('#toTop');
    if (toTop) {
      window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 600), { passive: true });
      toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
    }
  }

  /* ===================== Inquiry form ===================== */
  const SERVICE_LABELS = { tour: 'Tour package', flights: 'Ticketing (flights / ferry)', hotel: 'Hotel booking & reservation', transport: 'Transport service reservation', mice: 'Meetings, events, trainings & seminars', other: 'Other inquiry' };
  const LABELS = {
    service: 'Service', package: 'Package', destination: 'Destination', date: 'Travel date', pax: 'Number of pax',
    from: 'From', to: 'To', trip: 'Trip type', depart: 'Departure date', return: 'Return date', cabin: 'Class',
    checkin: 'Check-in', checkout: 'Check-out', rooms: 'Rooms', guests: 'Guests',
    vehicle: 'Vehicle', pickup: 'Pick-up location', days: 'Duration', route: 'Route',
    event: 'Type of event', epax: 'Participants (pax)', venue: 'Venue city', estart: 'Date start', eend: 'Date end', needs: 'Requirements',
    notes: 'Other details', name: 'Name', email: 'Email', phone: 'Phone', contact: 'Preferred contact'
  };

  /* ---- Quotation document ---------------------------------------------- */
  const fmtDate = d => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  // Form dates arrive as 2026-09-23. Nobody reads a quotation in ISO, so every
  // date field is set the way the rest of the document reads dates.
  const DATE_FIELDS = ['date', 'depart', 'return', 'checkin', 'checkout', 'estart', 'eend'];
  const fmtISO = v => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v == null ? '' : v).trim());
    return m ? fmtDate(new Date(+m[1], +m[2] - 1, +m[3])) : String(v == null ? '' : v);
  };
  const fmtField = (k, v) => (DATE_FIELDS.indexOf(k) === -1 ? String(v == null ? '' : v) : fmtISO(v));
  const paxCount = v => { const n = parseInt(String(v == null ? '' : v).replace(/[^\d]/g, ''), 10); return Number.isFinite(n) && n > 0 ? n : null; };
  const paxWord = n => n + (n === 1 ? ' traveller' : ' travellers');
  const quoteRef = () => {
    const d = new Date(), p = x => String(x).padStart(2, '0');
    return `${CONFIG.quotePrefix}-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  /* ---------- The quotation document ----------
     Set as a business document: a masthead with the reference panel, a subject
     line saying what is being quoted, who it is for beside the trip summary,
     one cost table that totals in its own foot, then inclusions, itinerary,
     terms and a signature block. Each fact appears once. Styling and the A4
     print rules live in assets/css/quotation.css.                          */
  function buildQuotation(o, tour, ref, issued, valid) {
    const serviceName = SERVICE_LABELS[o.service] || 'Travel service';
    const pax = o.pax || o.guests || o.epax || '';
    const heads = paxCount(pax);

    // The subject line, the trip summary and the cost table each carry these
    // once, so the request table below only shows what is left: route, cabin,
    // rooms, vehicle, event requirements.
    const covered = ['name', 'email', 'phone', 'contact', 'service', 'package', 'destination', 'date', 'pax', 'guests', 'epax', 'notes'];
    const rows = Object.keys(o)
      .filter(k => LABELS[k] && covered.indexOf(k) === -1 && String(o[k]).trim())
      .map(k => `<tr><td class="k">${LABELS[k]}</td><td class="v">${esc(fmtField(k, o[k]))}</td></tr>`).join('');

    const subject = tour ? tour.name : (o.package && o.package !== 'custom' ? o.package : (o.destination || serviceName));
    const subLine = (tour
      ? [tour.duration, tour.departure ? 'Departs ' + tour.departure : '', serviceName]
      : [serviceName, o.destination && o.destination !== subject ? o.destination : '']
    ).filter(Boolean).join(' \u00b7 ');

    const facts = [
      ['Travel date', fmtField('date', o.date || o.depart || o.checkin || o.estart || '') || 'To be advised'],
      ['Travellers', heads ? paxWord(heads) : (pax || 'To be advised')],
      ['Destination', o.destination || (tour ? (tour.country || destLabel(tour)) : '')],
      ['Duration', tour ? '' : (o.days || '')],
      ['Service', serviceName]
    ].filter(r => r[1]).map(r => `<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join('');

    let cost;
    if (tour && tour.price) {
      const rate = money(tour.price);
      const unit = tour.price.unit || '';
      const total = heads ? money(tour.price, tour.price.from * heads) : '\u2014';
      cost = `
        <table class="qt-table cost">
          <thead><tr><th>Description</th><th class="num">Rate</th><th class="num">Travellers</th><th class="num">Line total</th></tr></thead>
          <tbody><tr>
            <td data-l="Package"><strong>${esc(tour.name)}</strong><span class="desc">${esc([tour.duration, tour.departure ? 'departs ' + tour.departure : ''].filter(Boolean).join(' \u00b7 '))}</span></td>
            <td class="num" data-l="Rate">${rate}<span class="unit">${esc(unit)}</span></td>
            <td class="num" data-l="Travellers">${heads ? heads : esc(pax || '\u2014')}</td>
            <td class="num" data-l="Line total">${total}</td>
          </tr></tbody>
          <tfoot><tr>
            <td class="lblcell" colspan="3"><span class="lbl">Estimated total</span></td>
            <td class="num" data-l="Estimated total"><span class="sum">${total}</span></td>
          </tr></tfoot>
        </table>
        <p class="qt-fine">${heads ? `${rate} ${esc(unit)} \u00d7 ${paxWord(heads)}, at the published rate.` : 'The total is worked out once the number of travellers is confirmed.'} Peak-date surcharges, where any apply to your dates, are shown on your official quotation.</p>`;
    } else {
      cost = `<div class="qt-tbc">${I.info}<span>Final pricing is confirmed by our team once the details and availability for your dates are checked. Your official quotation follows by email.</span></div>`;
    }

    const inc = tour && tour.inclusions && tour.inclusions.length && tour.status !== 'soon' ? `
      <div class="qt-cols">
        <div><h4>Inclusions</h4><ul>${tour.inclusions.map(x => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul></div>
        <div class="exc"><h4>Exclusions</h4><ul>${(tour.exclusions && tour.exclusions.length ? tour.exclusions : ['As advised on your official quotation']).map(x => `<li>${I.x}<span>${esc(x)}</span></li>`).join('')}</ul></div>
      </div>` : '';

    const itin = tour && tour.itinerary && tour.itinerary.length ? `
      <div class="qt-section"><h4>Itinerary at a glance</h4><div class="qt-days">${tour.itinerary.map(d => `<div class="qt-day"><b>${esc(d.day)}</b><span>${esc(d.title)}</span></div>`).join('')}</div></div>` : '';

    const req = rows ? `<div class="qt-section"><h4>Request details</h4><table class="qt-table"><tbody>${rows}</tbody></table></div>` : '';
    const notes = String(o.notes || '').trim()
      ? `<div class="qt-section"><h4>Notes from you</h4><p class="qt-quote">${esc(o.notes)}</p></div>` : '';

    return `
    <div class="qt-doc" id="qtDoc">
      <div class="qt-band"></div>

      <header class="qt-head">
        <div class="qt-brand">
          <img src="${IC.media ? IC.media.mark : ''}" alt="">
          <div>
            <strong>Immaculate Connections</strong>
            <span class="tag">Travel Agency</span>
            <span>${esc(CONFIG.address)}</span>
            <span>${esc(CONFIG.mobile)} &middot; ${esc(CONFIG.landline)}</span>
            <span>${esc(CONFIG.email)}</span>
          </div>
        </div>
        <div class="qt-meta">
          <div class="qt-title">Quotation</div>
          <dl>
            <dt>Quotation no.</dt><dd class="ref">${esc(ref)}</dd>
            <dt>Date issued</dt><dd>${esc(fmtDate(issued))}</dd>
            <dt>Valid until</dt><dd>${esc(fmtDate(valid))}</dd>
            <dt>Status</dt><dd><span class="qt-status">For confirmation</span></dd>
          </dl>
        </div>
      </header>

      <div class="qt-subject">
        <span class="qt-label">Quotation for</span>
        <h3>${tour && tour.flag ? flagImg(tour) : ''}${esc(subject)}</h3>
        ${subLine ? `<p>${esc(subLine)}</p>` : ''}
      </div>

      <div class="qt-parties">
        <div>
          <span class="qt-label">Prepared for</span>
          <strong>${esc(o.name || 'Traveller')}</strong>
          <p>${esc(o.email || '')}${o.phone ? '<br>' + esc(o.phone) : ''}${o.contact ? '<br>Preferred contact: ' + esc(o.contact) : ''}</p>
        </div>
        <div>
          <span class="qt-label">Trip summary</span>
          <dl class="qt-facts">${facts}</dl>
        </div>
      </div>

      ${req}
      <div class="qt-section"><h4>Estimated cost</h4>${cost}</div>
      ${inc}
      ${itin}
      ${notes}

      <div class="qt-section qt-notes">
        <h4>Important notes</h4>
        <div class="qt-callout">${I.mail}<p><strong>Our team will contact you directly by email at ${esc(o.email || 'your email address')}</strong> to confirm the destinations and itinerary details, check availability for your dates and finalise the pricing. Your official quotation comes from that team. <strong>No payment is collected on this website</strong> &mdash; you may download, print or forward this quotation for your reference.</p></div>
        <ol>
          <li>This quotation is an <strong>estimate</strong> based on the details you submitted. Rates are per person on twin-sharing basis unless stated otherwise and are subject to availability at the time of booking.</li>
          <li>Published rates may carry <strong>peak-season surcharges</strong> on selected travel dates. Any surcharge that applies to your dates is shown on your official quotation.</li>
          <li><strong>No deposit or payment is requested through this website.</strong> Payment instructions are issued only with your official quotation, once the locations, dates and final pricing are confirmed by our team.</li>
          <li>Airfare, hotel and tour rates are <strong>not held until payment is received</strong> and may change without prior notice.</li>
          <li>This quotation is valid until <strong>${esc(fmtDate(valid))}</strong>. Quote reference <strong>${esc(ref)}</strong> when you contact us.</li>
          <li>Exclusions such as visa fees, travel tax, tips and single supplements are charged separately where applicable.</li>
        </ol>
      </div>

      <footer class="qt-foot">
        <div class="sig">
          <span class="qt-label">Prepared by</span>
          <strong>Reservations Team</strong>
          <span>Immaculate Connections Travel Agency</span>
          <span>${esc(CONFIG.email)} &middot; ${esc(CONFIG.mobile)}</span>
        </div>
        <div class="stamp">
          <span>Quotation no.</span>
          <strong>${esc(ref)}</strong>
          <em>Issued ${esc(fmtDate(issued))} &middot; valid until ${esc(fmtDate(valid))}</em>
        </div>
      </footer>
      <p class="qt-legal"><strong>This document is a quotation, not an invoice or a receipt.</strong> Prepared from the details above and from published rates; both are confirmed by our reservations team before any booking is made. Thank you for choosing Immaculate Connections Travel Agency &mdash; crafting seamless journeys, creating lasting memories.</p>
    </div>`;
  }

  function initInquiry() {
    const form = $('#inquiryForm');
    if (!form) return;
    const steps = $$('.fstep', form), pSteps = $$('.progress .p-step', form), bars = $$('.progress .bar', form);
    const params = new URLSearchParams(location.search);
    let cur = 1;

    const pkg = $('#f_package', form);
    if (pkg && IC.tours) {
      pkg.innerHTML = '<option value="">Select a package</option>' +
        countryList().map(c => `<optgroup label="${esc(c.name)}">${IC.tours.filter(t => cSlug(t.country) === c.slug).map(t => `<option value="${esc(t.id)}">${esc(t.name)}${t.duration ? ' · ' + esc(t.duration) : ''}${t.price ? ' · ' + money(t.price) : ''}</option>`).join('')}</optgroup>`).join('') +
        '<option value="custom">Custom itinerary (describe below)</option>';
    }

    const showFor = () => {
      const v = form.elements.service.value;
      $$('[data-for]', form).forEach(el => { const ok = el.dataset.for.split(',').includes(v); el.classList.toggle('show', ok); $$('input,select,textarea', el).forEach(f => { f.disabled = !ok; }); });
      const hint = $('#detailsHint', form);
      if (hint) hint.textContent = ({
        tour: 'Choose a package or describe the trip you have in mind. Dates can be tentative.',
        flights: 'Tell us the route and dates and we will quote available fares.',
        hotel: 'Where, when and how many guests. Add a preferred hotel or resort if you have one.',
        transport: 'Vehicle type, pick-up point and dates. Rates vary by package and location.',
        mice: 'The basics are enough. Our team will follow up with a proposal for your event.',
        other: 'Tell us what you need and we will point you to the right person.'
      })[v] || 'Tell us what you need.';
      const label = $('#chosenService', form); if (label) label.textContent = SERVICE_LABELS[v] || '';
    };

    const setVal = (name, val) => {
      if (val == null || val === '') return;
      $$(`[name="${name}"]`, form).forEach(el => {
        if (el.type === 'radio' || el.type === 'checkbox') { if (el.value === val) el.checked = true; }
        else if (el.tagName === 'SELECT') { const o = Array.from(el.options).find(x => x.value === val || x.text === val); if (o) el.value = o.value; }
        else el.value = val;
      });
    };

    const scrollToForm = () => { const top = form.getBoundingClientRect().top + window.scrollY - 110; if (window.scrollY > top) window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' }); };
    const go = n => {
      cur = n;
      steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step, 10) === n));
      pSteps.forEach(p => { const k = parseInt(p.dataset.step, 10); p.classList.toggle('active', k === n); p.classList.toggle('done', k < n); const i = $('i', p); if (k < n) i.innerHTML = I.check; else i.textContent = k; });
      bars.forEach((b, idx) => b.classList.toggle('fill', idx + 1 < n));
      if (n === 3) buildSummary();
      scrollToForm();
      if (n === 2) { const first = $('.fstep[data-step="2"] [data-for].show input, .fstep[data-step="2"] [data-for].show select', form); if (first && !touch) first.focus({ preventScroll: true }); }
    };

    // Picking a service shows its form straight away (no extra click)
    $$('input[name="service"]', form).forEach(r => r.addEventListener('change', () => { showFor(); $('#serviceErr', form).style.display = 'none'; setTimeout(() => go(2), 160); }));
    const step1Nav = $('.fstep[data-step="1"] .form-nav', form); if (step1Nav) step1Nav.style.display = 'none';

    if (params.get('package') && !params.get('service')) params.set('service', 'tour');
    params.forEach((v, k) => setVal(k, v));
    showFor();
    // Arriving from a service page with the trip filled in: skip the service choice, and
    // when those details are complete open straight on the contact step. (Runs after the
    // rest of this setup, which defines the summary the contact step shows.)
    if (params.get('page') && form.elements.service.value) setTimeout(() => {
      go(2);
      const s2 = steps.find(s => parseInt(s.dataset.step, 10) === 2);
      const shown = s2 ? $$('[data-for].show input, [data-for].show select, [data-for].show textarea', s2).filter(el => !el.disabled) : [];
      if (shown.length && shown.every(el => el.checkValidity())) go(3);
    }, 0);

    const validate = n => {
      const step = steps.find(s => parseInt(s.dataset.step, 10) === n);
      let ok = true, first = null;
      $$('.field', step).forEach(f => f.classList.remove('error'));
      if (n === 1) { const chosen = !!form.elements.service.value; $('#serviceErr', form).style.display = chosen ? 'none' : 'block'; return chosen; }
      $$('input,select,textarea', step).forEach(el => { if (el.disabled) return; if (!el.checkValidity()) { ok = false; const f = el.closest('.field'); if (f) f.classList.add('error'); if (!first) first = el; } });
      if (first) first.focus();
      return ok;
    };
    form.addEventListener('click', e => {
      const nx = e.target.closest('[data-next]'); if (nx && validate(cur)) go(cur + 1);
      const pv = e.target.closest('[data-prev]'); if (pv) go(cur - 1);
    });

    const collect = () => {
      const fd = new FormData(form); const o = {};
      fd.forEach((v, k) => { if (v === '' || k === 'consent' || k.startsWith('_')) return; o[k] = o[k] ? o[k] + ', ' + v : v; });
      if (o.package && IC.tours) { const t = IC.tours.find(x => x.id === o.package); if (t) o.package = t.name + (t.duration ? ` (${t.duration})` : ''); else if (o.package === 'custom') o.package = 'Custom itinerary'; }
      return o;
    };
    const buildSummary = () => {
      const o = collect(); const box = $('#summary', form); if (!box) return;
      box.innerHTML = Object.keys(o).filter(k => LABELS[k] && !['name', 'email', 'phone', 'contact'].includes(k)).map(k => `<div><span>${LABELS[k]}</span><strong>${esc(k === 'service' ? (SERVICE_LABELS[o[k]] || o[k]) : o[k])}</strong></div>`).join('');
    };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate(3)) return;
      const rawPkg = (form.querySelector('#f_package') && !form.querySelector('#f_package').disabled) ? form.querySelector('#f_package').value : '';
      const o = collect();
      const btn = $('[type="submit"]', form), errBox = $('#formError', form);
      errBox.classList.remove('show'); btn.disabled = true; btn.textContent = 'Preparing your quotation…';

      const serviceName = SERVICE_LABELS[o.service] || 'Travel';
      const tour = rawPkg && IC.tours ? IC.tours.find(t => t.id === rawPkg) : null;
      const ref = quoteRef();
      const issued = new Date();
      const valid = new Date(issued.getTime() + CONFIG.quoteValidDays * 864e5);
      const first = (o.name || '').split(' ')[0] || 'there';

      // Estimated total, used on the quotation and carried to the payment page
      let amount = '';
      if (tour && tour.price) {
        const heads = paxCount(o.pax || o.guests || o.epax);
        amount = heads ? money(tour.price, tour.price.from * heads) : money(tour.price) + ' ' + tour.price.unit;
      }

      const lines = Object.keys(o).filter(k => LABELS[k]).map(k => `${LABELS[k]}: ${k === 'service' ? serviceName : fmtField(k, o[k])}`).join('\n');
      const autoresponse =
        `Hi ${first},\n\nThank you for your inquiry with Immaculate Connections Travel Agency. Here is your quotation for reference.\n\n` +
        `QUOTATION ${ref}\nDate issued: ${fmtDate(issued)}\nValid until: ${fmtDate(valid)}\n\n${lines}\n` +
        (amount ? `\nEstimated total: ${amount}\n(Estimate only, based on published rates and subject to availability. Not a confirmed price.)\n` : '\nFinal pricing is confirmed once we check the details and availability for your dates.\n') +
        `\nWHAT HAPPENS NEXT\n1. We confirm the destinations, itinerary details and availability for your travel dates.\n2. Our team contacts you directly by email at this address with your official quotation and the final pricing.\n3. Payment instructions are issued with that official quotation. Nothing is collected through the website.\n\n` +
        `You can also download or print a copy of this quotation from the page where you submitted your inquiry.\n\n` +
        `Immaculate Connections Travel Agency\n${CONFIG.address}\nMobile ${CONFIG.mobile} · Tel ${CONFIG.landline}\n${CONFIG.email}`;

      const payload = {
        _subject: `Website inquiry ${ref}: ${serviceName}${o.package ? ' – ' + o.package : ''}`,
        _template: 'table', _captcha: 'false', _replyto: o.email, _autoresponse: autoresponse,
        'Quotation ref': ref, name: o.name, email: o.email
      };
      Object.keys(o).forEach(k => { if (LABELS[k]) payload[LABELS[k]] = k === 'service' ? serviceName : o[k]; });
      if (amount) payload['Estimated total'] = amount;
      payload['Sent from'] = location.href;

      let sent = false, detail = '';
      try {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        const j = await r.json().catch(() => ({})); sent = r.ok && String(j.success) !== 'false'; detail = j.message || '';
      } catch (_) { sent = false; }

      const text = `Quotation ${ref}\n\n${lines}${amount ? `\nEstimated total: ${amount}` : ''}`;
      const success = $('#success', form);
      $('#mailLink', success).href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Quotation ${ref}: ` + serviceName)}&body=${encodeURIComponent(text)}`;
      $('#msgLink', success).href = CONFIG.messenger;

      if (sent) {
        $('#formBody', form).style.display = 'none';
        $('#quotation', success).innerHTML = buildQuotation(o, tour, ref, issued, valid);
        $('#successMsg', success).textContent = `Thank you, ${first}. Quotation ${ref} has been prepared and a copy is on its way to ${o.email}. Our team confirms the destinations, dates and final pricing first, then emails your official quotation. No payment is needed now.`;
        // The payment step only appears once the agency confirms a booking flow
        // (CONFIG.payments) and has account details to show. Until then the
        // traveller keeps the quotation and sends it to us instead.
        const pay = $('#qtPay', success);
        if (pay) {
          if (payReady()) {
            const q = new URLSearchParams({ ref, svc: serviceName });
            if (tour) q.set('pkg', tour.name); else if (o.package) q.set('pkg', o.package);
            if (amount) q.set('amt', amount);
            pay.href = 'payment.html?' + q.toString();
            pay.hidden = false;
          } else pay.hidden = true;
        }
        const sentMail = $('#mailLink', success), sentMsg = $('#msgLink', success);
        if (sentMail) sentMail.textContent = 'Email a copy';
        if (sentMsg) sentMsg.textContent = 'Message us';
        success.classList.add('show');
        window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 110, behavior: reduced ? 'auto' : 'smooth' });
      } else {
        // Delivery did not go through (most often the mail relay is not activated
        // yet). Still give the traveller their quotation, and make sending it by
        // email or Messenger the primary action. Provider wording is never shown.
        $('#formBody', form).style.display = 'none';
        $('#quotation', success).innerHTML = buildQuotation(o, tour, ref, issued, valid);
        $('#successMsg', success).textContent = `Your quotation ${ref} is ready, ${first}. It has not reached our team yet, so please send it with one tap using the buttons below. We will reply to ${o.email} to confirm availability and payment details.`;
        const h3 = success.querySelector('.qt-intro h3'); if (h3) h3.textContent = 'One more tap to send it';
        const chk = success.querySelector('.qt-intro .check'); if (chk) { chk.classList.add('pending'); chk.innerHTML = I.mail; }
        // The inline form error sits inside the hidden form body, so show the
        // notice in the success panel instead.
        let notice = success.querySelector('#qtNotice');
        if (!notice) { notice = document.createElement('div'); notice.id = 'qtNotice'; notice.className = 'form-error no-print'; success.querySelector('.qt-intro').appendChild(notice); }
        const mailBtn = $('#mailLink', success), msgBtn = $('#msgLink', success), dlBtn = $('#qtDownload'), payBtn = $('#qtPay', success);
        if (mailBtn) { mailBtn.className = 'btn btn-primary'; mailBtn.textContent = 'Send by email'; }
        if (msgBtn) { msgBtn.className = 'btn btn-blue'; msgBtn.textContent = 'Send on Messenger'; }
        if (dlBtn) dlBtn.className = 'btn btn-outline';
        if (payBtn) payBtn.hidden = true;
        notice.textContent = 'Our online form could not deliver your inquiry automatically. Sending it by email or Messenger takes one tap and reaches the same team.';
        notice.classList.add('show');
        success.classList.add('show');
        window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 110, behavior: reduced ? 'auto' : 'smooth' });
        if (/activat/i.test(detail)) console.warn('[Immaculate Connections] The FormSubmit relay for ' + CONFIG.email + ' is not activated yet. Open the "Activate Form" email in that inbox and click the link once. Inquiries will then arrive automatically.');
      }
    });

    const dl = $('#qtDownload');
    if (dl) dl.addEventListener('click', () => window.print());

    // contact.html?preview=quote renders a sample quotation so the template can be
    // checked (layout, print, download) without submitting the form or sending mail.
    if (params.get('preview') === 'quote') {
      const sample = (IC.tours || []).find(t => t.price) || (IC.tours || [])[0];
      const demo = { service: 'tour', package: sample ? sample.name : 'Sample package', date: '2026-11-06', pax: 4, budget: '', notes: 'Sample quotation for template preview.', name: 'Sample Traveller', email: 'traveller@example.com', phone: '+63 917 000 0000', contact: 'Email' };
      const ref = quoteRef(), issued = new Date(), valid = new Date(issued.getTime() + CONFIG.quoteValidDays * 864e5);
      const success = $('#success', form);
      $('#formBody', form).style.display = 'none';
      $('#quotation', success).innerHTML = buildQuotation(demo, sample, ref, issued, valid);
      $('#successMsg', success).textContent = 'This is a preview of the quotation template. Nothing has been sent. Remove ?preview=quote from the address to use the normal inquiry form.';
      $('#success h3', success).textContent = 'Quotation template preview';
      const pay = $('#qtPay', success);
      if (pay) {
        if (payReady()) { pay.href = 'payment.html?' + new URLSearchParams({ ref, svc: 'Tour package', pkg: sample ? sample.name : '', amt: sample && sample.price ? money(sample.price, sample.price.from * 4) : '' }).toString(); pay.hidden = false; }
        else pay.hidden = true;
      }
      success.classList.add('show');
    }

    go(params.get('service') ? 2 : 1);
  }

  /* ===================== Inner-page heroes =====================
     Every page opens on a full-bleed photo the camera keeps moving on: one
     slow move, or a sequence of places with a dissolve and a caption. The
     pointer and the scroll nudge the camera, the figures count up, and it
     all rests off screen or in a hidden tab; reduced motion keeps a still. */
  function initPageHeroes() {
    const hero = $('.page-hero, .pkg-hero'); if (!hero) return;
    const rig = $('.ph-rig', hero); if (!rig) return;
    const scenes = $$('.ph-scene', rig), place = $('.ph-place-name', hero), DWELL = 6000;
    const MOVES = {
      push:  ['scale(1.06) translate3d(0, 0, 0)', 'scale(1.18) translate3d(-1.5%, 1%, 0)'],
      dolly: ['scale(1.04) translate3d(0, 1%, 0)', 'scale(1.26) translate3d(0, -1%, 0)'],
      panR:  ['scale(1.15) translate3d(-3.5%, 0, 0)', 'scale(1.15) translate3d(3.5%, -.5%, 0)'],
      panL:  ['scale(1.15) translate3d(3.5%, 0, 0)', 'scale(1.15) translate3d(-3.5%, .5%, 0)'],
      pull:  ['scale(1.22) translate3d(1%, 1%, 0)', 'scale(1.06) translate3d(0, 0, 0)'],
      tilt:  ['scale(1.16) translate3d(0, 3.5%, 0)', 'scale(1.16) translate3d(0, -3%, 0)'],
      orbit: ['scale(1.1) rotate(-1.2deg) translate3d(1%, 0, 0)', 'scale(1.18) rotate(.5deg) translate3d(-1%, -1%, 0)'],
      drift: ['scale(1.18) rotate(.8deg) translate3d(-2%, 1.5%, 0)', 'scale(1.07) rotate(-.3deg) translate3d(2%, -1%, 0)']
    };
    let si = 0, timer = null, visible = true;
    const load = s => {
      const src = $('source', s), img = $('img', s);
      if (src && src.dataset.srcset) { src.srcset = src.dataset.srcset; delete src.dataset.srcset; }
      if (img && img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
      return img;
    };
    const move = (s, loop) => {
      if (reduced || !s) return null;
      const [a, b] = MOVES[s.dataset.move] || MOVES.push;
      const anim = $('img', s).animate([{ transform: a }, { transform: b }], loop
        ? { duration: 18000, easing: 'ease-in-out', iterations: Infinity, direction: 'alternate' }
        : { duration: DWELL + 2600, easing: 'cubic-bezier(.33, 0, .4, 1)', fill: 'both' });
      if (!visible || document.hidden || Motion.paused) anim.pause();
      return anim;
    };
    const setPlace = name => {
      if (!place || !name) return;
      const old = place.lastElementChild;
      const n = document.createElement('span'); n.innerHTML = name;
      if (old && old.textContent === n.textContent) return;
      if (reduced || !old) { place.textContent = ''; place.appendChild(n); return; }
      n.className = 'in'; place.appendChild(n); old.className = 'out';
      requestAnimationFrame(() => requestAnimationFrame(() => { n.className = ''; }));
      setTimeout(() => { if (old.parentNode) old.remove(); }, 700);
    };
    // A hero marked data-manual changes scene only when asked (IC.pageHero.show), e.g. the
    // Hotel Booking page, where the photo follows the island the visitor picks.
    const manual = hero.hasAttribute('data-manual');
    let pending = -1;
    const next = async target => {
      const to = target == null ? (si + 1) % scenes.length : target;
      if (to === si || to < 0 || to >= scenes.length) return;
      pending = to;
      const s = scenes[to], img = load(s);
      try { if (img && !img.complete) await img.decode(); } catch (e) { /* show it anyway */ }
      if (pending !== to) return;   // a newer choice arrived while this photo loaded
      const from = scenes[si]; si = to;
      s._cam = move(s, manual);
      if (!reduced) {
        const out = from.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.24)' }], { duration: 1500, easing: 'cubic-bezier(.5, 0, .8, .4)', fill: 'forwards' });
        s.animate([{ transform: 'scale(1.16)' }, { transform: 'scale(1)' }], { duration: 1600, easing: 'cubic-bezier(.16, 1, .3, 1)' });
        setTimeout(() => { out.cancel(); if (from._cam && !from.classList.contains('is-on')) { from._cam.cancel(); from._cam = null; } }, 1800);
      }
      s.classList.add('is-on'); from.classList.remove('is-on');
      setPlace(s.dataset.place || '');
      if (!manual) load(scenes[(to + 1) % scenes.length]);
    };
    IC.pageHero = { show: i => next(i), scenes };
    const start = () => { if (manual || reduced || scenes.length < 2 || timer || !visible || document.hidden || Motion.paused) return; timer = setInterval(next, DWELL); };
    const stop = () => { clearInterval(timer); timer = null; };
    scenes[0]._cam = move(scenes[0], scenes.length < 2 || manual);
    if (scenes.length > 1) {
      setPlace(scenes[0].dataset.place || '');
      if (!manual) {
      const warm = () => load(scenes[1]);
      if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 2500 }); else setTimeout(warm, 1500);
      }
    }

    /* pointer parallax and a scroll push-in on the camera rig */
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, rect = null;
    const apply = () => {
      raf = 0;
      cx += (tx - cx) * .07; cy += (ty - cy) * .07;
      const sc = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
      rig.style.setProperty('--rx', (-cx * 20).toFixed(2) + 'px');
      rig.style.setProperty('--ry', (-cy * 12 + sc * 70).toFixed(2) + 'px');
      rig.style.setProperty('--rz', (1 + sc * .1).toFixed(4));
      if (Math.abs(tx - cx) > .002 || Math.abs(ty - cy) > .002) raf = requestAnimationFrame(apply);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply); };
    if (!reduced) {
      if (window.matchMedia('(pointer: fine)').matches) {
        hero.addEventListener('pointerenter', () => { rect = hero.getBoundingClientRect(); });
        hero.addEventListener('pointermove', e => {
          if (e.pointerType !== 'mouse') return;
          const r = rect || (rect = hero.getBoundingClientRect());
          tx = ((e.clientX - r.left) / r.width) * 2 - 1; ty = ((e.clientY - r.top) / r.height) * 2 - 1; kick();
        }, { passive: true });
        hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; rect = null; kick(); });
      }
      window.addEventListener('scroll', () => { rect = null; if (window.scrollY < hero.offsetHeight * 1.3) kick(); }, { passive: true });
    }

    /* rest when nobody can see it */
    const pause = () => { stop(); scenes.forEach(s => s._cam && s._cam.pause()); };
    const play = () => { if (Motion.paused) return; scenes.forEach(s => s._cam && s.classList.contains('is-on') && s._cam.play()); start(); };
    if ('IntersectionObserver' in window) new IntersectionObserver(en => { visible = en[0].isIntersecting; visible ? play() : pause(); }, { threshold: .05 }).observe(hero);
    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
    Motion.on(p => (p ? pause() : visible && !document.hidden && play()));
    Motion.button(hero, 'on-photo ph-motion');
    start();

    /* the hero's figures count up to their value once */
    if (!reduced) $$('.page-hero-stats strong', hero).forEach(el => {
      const txt = el.textContent.trim(); if (!/^\d+$/.test(txt) || +txt < 3) return;
      const n = +txt, t0 = performance.now() + 450, dur = 1100;
      el.textContent = '0';
      const tick = now => { const k = Math.min(1, Math.max(0, (now - t0) / dur)); el.textContent = String(Math.round(n * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      setTimeout(() => { el.textContent = txt; }, 2000);
    });
  }

  /* ===================== Hero: travelogue =====================
     Behind the copy the camera keeps moving on a destination (a push-in,
     a pan, a tilt, a dolly, one move per place) and every few seconds it
     dollies through to the next place, with a warm light leak across the
     cut; the reel at the bottom shows where it is and jumps anywhere. In
     front, the agency's own group photos sit as a pile of prints: the top
     one is thrown to the back by the timer, a tap, a drag, a swipe, the
     arrows or the keyboard, and the next one pulls into focus. Hovering
     fans the pile open and the top print catches the light; the corner
     button opens it full size. Pointer and scroll nudge the camera.
     Everything rests off screen, in a hidden tab or while a photo is open;
     reduced motion keeps plain cross-fades and manual control.            */
  function initTravelogue() {
    const hero = $('.hero-tl'); if (!hero) return;
    const rig = $('#tlRig', hero), deck = $('#tlDeck', hero), stack = $('#tlStack', hero), prints$ = $('.tl-prints', hero), leak = $('.tl-leak', hero);
    const scenes = $$('.scene', rig), prints = $$('.print', deck), thumbs = $$('#tlThumbs button', hero), chips = $$('#tlChips button', hero);
    const place = $('#tlPlace', hero), thumbRow = $('#tlThumbs', hero), chipRow = $('#tlChips', hero);
    if (!rig || !deck || !scenes.length || !prints.length) return;
    const DWELL = 3000, FAR = 4, L = scenes.length;   // a new photo and destination every 3 s
    hero.style.setProperty('--tl-dwell', DWELL + 'ms');
    const fine = window.matchMedia('(pointer: fine)').matches;
    const MOVES = {
      push:  ['scale(1.06) translate3d(0, 0, 0)', 'scale(1.2) translate3d(-1.5%, 1%, 0)'],
      dolly: ['scale(1.04) translate3d(0, 1%, 0)', 'scale(1.3) translate3d(0, -1%, 0)'],
      panR:  ['scale(1.16) translate3d(-4%, 0, 0)', 'scale(1.16) translate3d(4%, -.5%, 0)'],
      pull:  ['scale(1.24) translate3d(1%, 1%, 0)', 'scale(1.07) translate3d(0, 0, 0)'],
      tilt:  ['scale(1.18) translate3d(0, 4%, 0)', 'scale(1.18) translate3d(0, -3.5%, 0)'],
      panL:  ['scale(1.16) translate3d(4%, 0, 0)', 'scale(1.16) translate3d(-4%, .5%, 0)'],
      orbit: ['scale(1.1) rotate(-1.4deg) translate3d(1%, 0, 0)', 'scale(1.2) rotate(.6deg) translate3d(-1%, -1%, 0)'],
      drift: ['scale(1.2) rotate(1deg) translate3d(-2%, 2%, 0)', 'scale(1.08) rotate(-.4deg) translate3d(2%, -1%, 0)']
    };
    let si = 0, lastScene = 0, order = prints.map((_, k) => k), timer = null, busy = false;
    let visible = true, hovering = false, focused = false, dragging = false;

    const loadScene = s => {
      const src = $('source', s), img = $('img', s);
      if (src && src.dataset.srcset) { src.srcset = src.dataset.srcset; delete src.dataset.srcset; }
      if (img && img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
      return img;
    };
    const loadPrint = p => {
      const img = $('img', p); if (!img || !img.dataset.src) return;
      if (img.dataset.srcset) { img.sizes = img.dataset.sizes || ''; img.srcset = img.dataset.srcset; delete img.dataset.srcset; }
      img.src = img.dataset.src; delete img.dataset.src;
    };
    let near = 1;   // how deep into the pile photos load: the top two first, the rest after the page load
    const warmPile = () => { near = FAR; order.forEach((k, d) => { if (d <= FAR) loadPrint(prints[k]); }); };
    const camera = s => {
      if (reduced || !s) return;
      if (s._cam) s._cam.cancel();
      const [a, b] = MOVES[s.dataset.move] || MOVES.push;
      s._cam = $('img', s).animate([{ transform: a }, { transform: b }], { duration: DWELL + 2600, easing: 'cubic-bezier(.33, 0, .4, 1)', fill: 'both' });
      if (!visible || document.hidden || Motion.paused) s._cam.pause();
    };
    const setPlace = name => {
      if (!place || !name) return;
      const old = place.lastElementChild;
      if (old && old.textContent === name) return;
      const n = document.createElement('span'); n.textContent = name;
      if (reduced || !old) { place.textContent = ''; place.appendChild(n); return; }
      n.className = 'in'; place.appendChild(n); old.className = 'out';
      requestAnimationFrame(() => requestAnimationFrame(() => { n.className = ''; }));
      setTimeout(() => { if (old.parentNode) old.remove(); }, 700);
    };
    const center = (row, el) => requestAnimationFrame(() => { if (row && el && row.scrollWidth > row.clientWidth) row.scrollTo({ left: el.offsetLeft - row.clientWidth / 2 + el.offsetWidth / 2, behavior: reduced ? 'auto' : 'smooth' }); });
    const markChip = () => {
      chips.forEach((c, k) => { c.setAttribute('aria-pressed', String(k === si)); c.classList.remove('run'); });
      const c = chips[si]; if (!c) return;
      // restart the chip's meter a frame later instead of forcing a layout to do it
      requestAnimationFrame(() => requestAnimationFrame(() => { if (timer && chips[si] === c) c.classList.add('run'); }));
      center(chipRow, c);
    };
    let switching = false;
    const showScene = async (n, manual) => {
      const to = ((n % L) + L) % L, now = performance.now();
      if (to === si || switching || (!manual && now - lastScene < 1300)) return;
      lastScene = now; switching = true;
      const s = scenes[to], img = loadScene(s);
      try { if (img && !img.complete) await img.decode(); } catch (e) { /* show it anyway */ }
      switching = false;
      const from = scenes[si]; si = to;
      camera(s);
      if (!reduced) {
        // the camera flies through: the old place rushes past, the new one settles in
        const out = from.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.28)' }], { duration: 1200, easing: 'cubic-bezier(.5, 0, .8, .4)', fill: 'forwards' });
        s.animate([{ transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 1300, easing: 'cubic-bezier(.16, 1, .3, 1)' });
        setTimeout(() => out.cancel(), 1400);
        if (leak) { leak.classList.remove('flash'); void leak.offsetWidth; leak.classList.add('flash'); }
      }
      s.classList.add('is-on'); from.classList.remove('is-on');
      setTimeout(() => { if (from._cam && !from.classList.contains('is-on')) { from._cam.cancel(); from._cam = null; } }, 1400);
      setPlace(s.dataset.place ? s.dataset.place.replace(/&amp;/g, '&') : '');
      markChip();
      loadScene(scenes[(to + 1) % L]); loadScene(scenes[(to + 2) % L]);
    };

    /* the pile: order[0] is on top; depth past FAR is hidden at the back */
    const layout = () => {
      order.forEach((k, d) => {
        const p = prints[k];
        p.style.setProperty('--d', Math.min(d, FAR));
        p.style.setProperty('--o', d < FAR ? 1 : 0);
        p.classList.toggle('is-top', d === 0);
        p.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
        const z = $('.print-zoom', p); if (z) z.tabIndex = d === 0 ? 0 : -1;
        if (d <= Math.max(near, 1)) loadPrint(p);
      });
      const top = order[0];
      thumbs.forEach((b, k) => b.setAttribute('aria-current', String(k === top)));
      center(thumbRow, thumbs[top]);
    };
    const undeal = () => prints.forEach(p => p.classList.remove('deal'));
    const focusIn = () => {
      if (reduced) return;
      const p = prints[order[0]]; p.classList.remove('focus-in'); void p.offsetWidth; p.classList.add('focus-in');
    };
    const throwTop = (dir, from) => new Promise(res => {
      undeal();
      const p = prints[order[0]];
      let settled = false, anim = null;
      const settle = () => {
        if (settled) return; settled = true;
        p.style.transition = 'none'; p.style.transform = ''; p.style.setProperty('--glare', '0');
        order.push(order.shift()); layout();
        if (anim) anim.cancel();
        void p.offsetWidth; p.style.transition = '';
        focusIn(); res();
      };
      if (reduced) { settle(); return; }
      const start = from || getComputedStyle(p).transform;
      anim = p.animate([
        { transform: start === 'none' ? 'none' : start, opacity: 1 },
        { transform: `translate3d(${dir * 128}%, -16%, 0) rotate(${dir * 19}deg)`, opacity: 0 }
      ], { duration: 520, easing: 'cubic-bezier(.45, 0, .8, .35)', fill: 'forwards' });
      anim.onfinish = settle;
      setTimeout(settle, 700);   // the pile moves on even if the page is not being painted
    });
    const bringBack = () => {
      undeal();
      const k = order.pop(); order.unshift(k);
      const p = prints[k]; loadPrint(p);
      if (reduced) { layout(); return; }
      p.style.transition = 'none'; layout();
      const a = p.animate([{ transform: 'translate3d(-128%, -16%, 0) rotate(-19deg)', opacity: 0 }, { opacity: 1, offset: .5 }], { duration: 620, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      a.onfinish = a.oncancel = () => { p.style.transition = ''; };
      focusIn();
    };
    const next = async (dir = 1, from, auto) => {
      if (busy) return;
      // on the timer, photo and destination move together: if the next destination photo is
      // still downloading, both wait for the next beat instead of drifting apart
      if (auto) { const im = loadScene(scenes[(si + 1) % L]); if (im && !(im.complete && im.naturalWidth)) return; }
      busy = true;
      showScene(si + 1);
      await throwTop(dir, from);
      busy = false;
    };
    const prev = () => { if (busy) return; showScene(si - 1); bringBack(); };
    const jump = k => {
      const pos = order.indexOf(k); if (pos <= 0 || busy) return;
      undeal(); order = order.slice(pos).concat(order.slice(0, pos)); layout(); focusIn(); showScene(si + 1);
    };

    /* the timer */
    const lightboxOpen = () => !!$('.lightbox.open');
    const held = () => hovering || focused || dragging || !visible || document.hidden || lightboxOpen() || Motion.paused;
    const stop = () => { clearInterval(timer); timer = null; chips.forEach(c => c.classList.remove('run')); };
    const start = () => {
      if (reduced || timer || held()) return;
      timer = setInterval(() => { if (lightboxOpen()) return; next(1, undefined, true); markChip(); }, DWELL);
      markChip();
    };
    const restart = () => { stop(); start(); };

    const nb = $('#tlNext', hero), pb = $('#tlPrev', hero);
    if (nb) nb.addEventListener('click', () => { next(1); restart(); });
    if (pb) pb.addEventListener('click', () => { prev(); restart(); });
    thumbs.forEach((b, k) => b.addEventListener('click', () => { jump(k); restart(); }));
    chips.forEach((b, k) => b.addEventListener('click', () => { showScene(k, true); restart(); }));
    stack.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(1); restart(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); restart(); }
    });
    prints$.addEventListener('focusin', e => { if (e.target.matches(':focus-visible')) { focused = true; stop(); } });
    prints$.addEventListener('focusout', e => { if (!prints$.contains(e.relatedTarget)) { focused = false; start(); } });

    /* full size: the corner button opens the site's photo viewer */
    deck.addEventListener('click', e => {
      const z = e.target.closest('.print-zoom'); if (!z) return;
      e.stopPropagation(); stop();
      if (typeof openLightbox === 'function') openLightbox(z.dataset.lg, (z.dataset.title || '').replace(/&rsquo;/g, '\u2019'));
    });
    document.addEventListener('keyup', e => { if (e.key === 'Escape') setTimeout(start, 50); });
    document.addEventListener('click', e => { if (e.target.closest && e.target.closest('.lightbox')) setTimeout(start, 50); });

    /* the top print catches the light under the pointer */
    if (fine && !reduced) {
      stack.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const p = prints[order[0]], r = p.getBoundingClientRect();
        p.style.setProperty('--gx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
        p.style.setProperty('--gy', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
        p.style.setProperty('--glare', '1');
      });
      stack.addEventListener('pointerleave', () => prints.forEach(p => p.style.setProperty('--glare', '0')));
    }

    /* drag or swipe the top print; a tap throws it too */
    let drag = null;
    deck.addEventListener('pointerdown', e => {
      const p = e.target.closest('.print');
      if (!p || e.target.closest('.print-zoom') || !p.classList.contains('is-top') || busy || (e.button !== undefined && e.button !== 0)) return;
      const now = performance.now();
      drag = { p, x: e.clientX, y: e.clientY, dx: 0, dy: 0, moved: false, vx: 0, lx: e.clientX, lt: now, r: parseFloat(p.style.getPropertyValue('--r')) || 0 };
      try { p.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
    });
    deck.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 6) return;
      if (!drag.moved) { drag.moved = true; dragging = true; stop(); undeal(); drag.p.classList.add('is-dragging'); }
      const now = performance.now();
      drag.vx = (e.clientX - drag.lx) / Math.max(1, now - drag.lt); drag.lx = e.clientX; drag.lt = now;
      drag.dx = dx; drag.dy = dy;
      drag.p.style.transform = `translate3d(${dx}px, ${dy * .5}px, 0) rotate(${drag.r + dx / 14}deg)`;
    });
    const endDrag = e => {
      if (!drag) return;
      const d = drag; drag = null;
      d.p.classList.remove('is-dragging');
      if (!d.moved) { if (e.type === 'pointerup') { next(1); restart(); } return; }
      dragging = false;
      if (Math.abs(d.dx) > 110 || Math.abs(d.vx) > .6) {
        const from = d.p.style.transform; d.p.style.transform = '';
        next(Math.sign(d.dx || d.vx) || 1, from);
      } else d.p.style.transform = '';
      start();
    };
    deck.addEventListener('pointerup', endDrag);
    deck.addEventListener('pointercancel', endDrag);
    deck.addEventListener('dragstart', e => e.preventDefault());

    /* camera rig: pointer parallax and a scroll push-in, eased every frame */
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, rect = null;
    const apply = () => {
      raf = 0;
      cx += (tx - cx) * .07; cy += (ty - cy) * .07;
      const s = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
      rig.style.setProperty('--rx', (-cx * 22).toFixed(2) + 'px');
      rig.style.setProperty('--ry', (-cy * 14 + s * 90).toFixed(2) + 'px');
      rig.style.setProperty('--rz', (1 + s * .12).toFixed(4));
      deck.style.setProperty('--ty', (cx * 9).toFixed(2) + 'deg');
      deck.style.setProperty('--tx', (-cy * 7).toFixed(2) + 'deg');
      deck.style.setProperty('--sy', (-s * 64).toFixed(1) + 'px');
      if (Math.abs(tx - cx) > .002 || Math.abs(ty - cy) > .002) raf = requestAnimationFrame(apply);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply); };
    if (!reduced) {
      if (fine) {
        hero.addEventListener('pointerenter', () => { rect = hero.getBoundingClientRect(); });
        hero.addEventListener('pointermove', e => {
          if (e.pointerType !== 'mouse') return;
          const r = rect || (rect = hero.getBoundingClientRect());
          tx = ((e.clientX - r.left) / r.width) * 2 - 1; ty = ((e.clientY - r.top) / r.height) * 2 - 1; kick();
        }, { passive: true });
        hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; rect = null; kick(); });
        window.addEventListener('resize', () => { rect = null; }, { passive: true });
      }
      window.addEventListener('scroll', () => { rect = null; if (window.scrollY < hero.offsetHeight * 1.3) kick(); }, { passive: true });
    }

    /* off screen or hidden: everything rests */
    const pauseAll = () => { stop(); scenes.forEach(s => s._cam && s._cam.pause()); };
    const playAll = () => { if (Motion.paused) return; scenes.forEach(s => s._cam && s.classList.contains('is-on') && s._cam.play()); start(); };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(en => { visible = en[0].isIntersecting; visible ? playAll() : pauseAll(); }, { threshold: .05 }).observe(hero);
    }
    document.addEventListener('visibilitychange', () => (document.hidden ? pauseAll() : playAll()));
    Motion.on(p => (p ? pauseAll() : visible && !document.hidden && playAll()));
    Motion.button($('.tl-reel', hero), 'on-photo tl-motion', true);

    prints.forEach(p => p.addEventListener('animationend', ev => { if (ev.animationName === 'tlDeal') p.classList.remove('deal'); }));
    layout(); camera(scenes[0]); setPlace((scenes[0].dataset.place || '').replace(/&amp;/g, '&'));
    const warm = () => { warmPile(); loadScene(scenes[1]); loadScene(scenes[2 % L]); };
    const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(warm, { timeout: 2500 }) : setTimeout(warm, 800));
    if (document.readyState === 'complete') idle(); else window.addEventListener('load', idle, { once: true });
    start();
  }

  /* ===================== Team cards ===================== */
  /* ===================== Team ===================== */
  // Initials for the fallback avatar when a member has no photo yet.
  const tmInitials = m => (m.name || m.role || '').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const tmAvatar = m => m.photo
    ? `<img src="${wix(m.photo, 560, 560)}" alt="${esc(m.name || m.role)}" loading="lazy" width="560" height="560">`
    : `<span class="tm-initials" aria-hidden="true">${esc(tmInitials(m))}</span>`;
  const tmHref = m => `team.html?member=${encodeURIComponent(m.slug)}`;

  // About-page grid: each card is a link to that member's profile page.
  // Profiles marked placeholder: true are drafts; the section stays hidden until real ones exist.
  const realTeam = () => (IC.team || []).filter(m => !m.placeholder);
  function initTeam() {
    const grid = $('#teamGrid');
    if (!grid || !IC.team) return;
    const team = realTeam(), section = grid.closest('section');
    if (section) section.hidden = !team.length;
    if (!team.length) return;
    grid.innerHTML = team.map((m, i) => `
      <a class="tm-card reveal" href="${tmHref(m)}" style="--d:${(i % 3) * 0.08}s" aria-label="View ${esc(m.name)}\u2019s profile">
        <div class="tm-photo${m.photo ? '' : ' plain'}">${tmAvatar(m)}</div>
        <div class="tm-body">
          <span class="tm-role">${esc(m.dept || m.role)}</span>
          <h3>${esc(m.name)}</h3>
          <p>${esc(m.tagline || m.role)}</p>
          <span class="tm-cta">View profile ${I.arrow}</span>
        </div>
      </a>`).join('');
  }

  // Individual profile page: team.html?member=<slug>, rendered into #teamProfile.
  function initTeamProfile() {
    const root = $('#teamProfile');
    if (!root || !IC.team) return;
    const slug = new URLSearchParams(location.search).get('member');
    const team = realTeam();
    const m = slug ? team.find(x => x.slug === slug) : team[0];
    if (!m) {
      root.innerHTML = `<section class="section"><div class="container text-center"><span class="eyebrow center">Profile not found</span><h1 class="h2" style="margin-bottom:12px">We couldn\u2019t find that team member</h1><a class="btn btn-primary btn-lg" href="about.html#team">Meet the team ${I.arrow}</a></div></section>`;
      return;
    }
    const first = (m.name || '').split(' ')[0] || 'this desk';
    const mail = m.email || CONFIG.email;
    const others = IC.team.filter(x => x.slug !== m.slug);

    document.title = `${m.name} \u2014 ${m.role} | ${CONFIG.shortName}`;
    const md = $('meta[name="description"]'); if (md) md.content = `${m.name}, ${m.role} at ${CONFIG.brand}. ${m.tagline || ''}`;

    root.innerHTML = `
      <section class="page-hero tp-hero">
        <div class="hero-bg" aria-hidden="true"><div class="ph-rig"><figure class="ph-scene is-on" data-move="push"><picture><source media="(max-width: 700px)" srcset="assets/img/hero/group-1-960.webp 960w, assets/img/hero/group-1-1280.webp 1280w" sizes="100vw"><img src="assets/img/hero/group-1-lg.webp" width="1632" height="918" alt="" fetchpriority="high" decoding="async"></picture></figure></div></div>
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>${I.left.replace('m15 18-6-6 6-6', 'm9 18 6-6-6-6')}<a href="about.html#team">Our team</a>${I.left.replace('m15 18-6-6 6-6', 'm9 18 6-6-6-6')}<span>${esc(m.name)}</span></nav>
          <div class="tp-head">
            <div class="tp-avatar${m.photo ? '' : ' plain'}">${tmAvatar(m)}</div>
            <div class="tp-headmain">
              <span class="tp-dept">${esc(m.dept || 'Immaculate Connections')}</span>
              <h1 class="h1">${esc(m.name)}</h1>
              <p class="tp-role">${esc(m.role)}</p>
              <p class="lead tp-tagline">${esc(m.tagline || '')}</p>
              <div class="tp-actions">
                <a class="btn btn-primary" href="mailto:${esc(mail)}?subject=${encodeURIComponent('For ' + m.name + ' \u2013 ' + m.dept)}">${I.mail} Email ${esc(first)}</a>
                <a class="btn btn-ghost" href="${CONFIG.messenger}" target="_blank" rel="noopener">${I.msg} Message us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container tp-layout">
          <div class="tp-main">
            ${m.placeholder ? `<div class="tp-note">${I.info}<p><strong>Sample profile.</strong> ${esc(first)}\u2019s name, photo and details are placeholders shown so the layout can be reviewed. Replace them with the real team member before this page goes live.</p></div>` : ''}
            <article class="tp-block">
              <span class="eyebrow">About</span>
              <h2 class="h2">Meet ${esc(first)}</h2>
              <p class="tp-bio">${esc(m.bio || '')}</p>
            </article>
            <article class="tp-block">
              <span class="eyebrow">Day to day</span>
              <h2 class="h2">What ${esc(first)} handles</h2>
              <ul class="tp-handles">${(m.handles || []).map(h => `<li>${I.check}<span>${esc(h)}</span></li>`).join('')}</ul>
            </article>
            ${m.focus && m.focus.length ? `<article class="tp-block">
              <span class="eyebrow">Focus areas</span>
              <h2 class="h2">Ask ${esc(first)} about</h2>
              <div class="tp-chips">${m.focus.map(f => `<span class="chip">${esc(f)}</span>`).join('')}</div>
            </article>` : ''}
          </div>

          <aside class="tp-side">
            <div class="side-card reveal">
              <h3 class="tp-side-title">${esc(first)} at a glance</h3>
              <ul class="tp-facts">
                <li>${I.tag}<div><small>Desk</small><strong>${esc(m.dept || m.role)}</strong></div></li>
                ${m.experience ? `<li>${I.star}<div><small>Specialises in</small><strong>${esc(m.experience)}</strong></div></li>` : ''}
                ${m.languages ? `<li>${I.msg}<div><small>Languages</small><strong>${esc(m.languages)}</strong></div></li>` : ''}
                <li>${I.pin}<div><small>Based in</small><strong>Cebu City, Philippines</strong></div></li>
              </ul>
              <a class="btn btn-primary btn-block" href="contact.html?service=tour">Send an inquiry ${I.arrow}</a>
              <a class="btn btn-outline btn-block" href="mailto:${esc(mail)}?subject=${encodeURIComponent('For ' + m.name + ' \u2013 ' + m.dept)}">${I.mail} Email ${esc(first)}</a>
              <a class="btn btn-light btn-block" href="${CONFIG.mobileHref}">${I.phone} ${esc(CONFIG.mobile)}</a>
              <p class="small muted" style="margin-top:12px">Inquiries reach the whole team at ${esc(CONFIG.email)} and are passed to the right desk.</p>
            </div>
          </aside>
        </div>
      </section>

      <section class="section bg-soft">
        <div class="container">
          <div class="section-head center reveal">
            <span class="eyebrow center">The rest of the team</span>
            <h2 class="h2">Meet the other desks</h2>
          </div>
          <div class="team-grid" id="teamProfileGrid">${others.map((x, i) => `
            <a class="tm-card reveal" href="${tmHref(x)}" style="--d:${(i % 3) * 0.08}s" aria-label="View ${esc(x.name)}\u2019s profile">
              <div class="tm-photo${x.photo ? '' : ' plain'}">${tmAvatar(x)}</div>
              <div class="tm-body">
                <span class="tm-role">${esc(x.dept || x.role)}</span>
                <h3>${esc(x.name)}</h3>
                <p>${esc(x.tagline || x.role)}</p>
                <span class="tm-cta">View profile ${I.arrow}</span>
              </div>
            </a>`).join('')}</div>
          <div class="text-center" style="margin-top:32px"><a class="btn btn-outline" href="about.html#team">${I.left} Back to the team</a></div>
        </div>
      </section>`;
  }

  /* ===================== Payment page ===================== */
  /* ===================== Payment page ===================== */
  function initPayment() {
    const root = $('#payPage');
    if (!root) return;
    const p = new URLSearchParams(location.search);
    const ref = p.get('ref') || '', pkg = p.get('pkg') || '', amt = p.get('amt') || '', svc = p.get('svc') || '';

    const refCard = $('#payRef', root);
    if (refCard) {
      refCard.innerHTML = [
        ref ? `<div class="row"><span>Quotation no.</span><strong class="code">${esc(ref)}</strong></div>` : '',
        svc ? `<div class="row"><span>Service</span><strong>${esc(svc)}</strong></div>` : '',
        pkg ? `<div class="row"><span>Package</span><strong>${esc(pkg)}</strong></div>` : '',
        `<div class="row"><span>${amt ? 'Estimated total' : 'Amount'}</span><strong class="${amt ? 'big' : ''}">${amt ? esc(amt) : 'Confirmed on your official invoice'}</strong></div>`
      ].join('') || '<p class="muted">Open this page from your quotation to see your reference number.</p>';
    }

    const pay = CONFIG.payment || {};
    const methods = $('#payMethods', root);
    if (methods) {
      const cards = [];
      (pay.bank || []).forEach(b => cards.push(`<div class="pay-method"><span class="ic">${I.bank}</span><div><strong>${esc(b.bank)}</strong><p>${esc(b.name)}</p><p class="acct">${esc(b.number)}</p></div></div>`));
      (pay.ewallet || []).forEach(w => cards.push(`<div class="pay-method"><span class="ic">${I.wallet}</span><div><strong>${esc(w.name)}</strong><p>${esc(w.account)}</p><p class="acct">${esc(w.number)}</p></div></div>`));
      methods.innerHTML = cards.length && payReady() ? cards.join('') :
        `<div class="pay-method"><span class="ic">${I.mail}</span><div><strong>Nothing is collected on this website</strong><p>Once the destinations, travel dates and final pricing are confirmed, our team emails your official quotation together with the bank transfer and e-wallet details, the exact deposit amount and the deadline to settle. Message or call us any time to go through it.</p></div></div>`;
    }

    const link = $('#payLink', root);
    if (link) { if (pay.link && payReady()) { link.href = pay.link; link.hidden = false; } else link.hidden = true; }

    const subject = encodeURIComponent(ref ? `Payment for quotation ${ref}` : 'Payment for my booking');
    const body = encodeURIComponent(`Hello Immaculate Connections,\n\nI would like to proceed with payment.\n\n${ref ? 'Quotation no.: ' + ref + '\n' : ''}${pkg ? 'Package: ' + pkg + '\n' : ''}${amt ? 'Estimated total: ' + amt + '\n' : ''}\nPlease send me the payment details.\n\nThank you.`);
    const mail = $('#payMail', root);
    if (mail) mail.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    const msg = $('#payMsg', root);
    if (msg) msg.href = CONFIG.messenger;
    $$('[data-ref]').forEach(el => (el.textContent = ref || '—'));
  }

  // Figures that come from the package data, so they stay true when packages change
  function initStats() {
    $$('[data-stat="countries"]').forEach(el => { el.textContent = String(countryList().filter(c => c.name !== 'Other').length); });
  }

  // The service pages, gallery and blog (pages.js) build on the same helpers
  IC.util = { $, $$, esc, reduced, touch, Motion, I, wix, money, peso, pkgUrl, effStatus, statusLabel, statusPill, flagImg, tourCard, openLightbox, countryList, rangeStart, isPastDate, CONFIG };

  document.addEventListener('DOMContentLoaded', () => {
    initStats(); initHeader(); initContactLinks(); initHeroTitle(); initTicker(); initOffers(); initFeatured(); initToursPage(); initPackagePage();
    initTravelogue(); initGallery(); initTeam(); initFaq(); initSubnav(); initMisc(); initInquiry(); initPayment(); initTeamProfile(); initReveal();
    initHeroNext(); initQuoteCard(); initHeroMotion(); initPageHeroes(); initAboutFx(); initHeroStage();
    if (IC.refreshHeader) IC.refreshHeader();
  });
})();
