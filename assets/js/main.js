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
    formEndpoint: 'https://formsubmit.co/ajax/inquiries@immaculateconnectionsph.com'
  };
  IC.config = CONFIG;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wix = (id, w, h, al) => IC.wix ? IC.wix(id, w, h, al) : id;
  const peso = n => '₱' + Number(n).toLocaleString('en-PH');
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
  const isPastDate = (d, t) => { const e = rangeEnd(d, t.year); return !!e && e < today; };
  const effStatus = t => {
    if (t.ends && new Date(t.ends + 'T23:59:59') < today) return 'past';
    if (t.travelDates && t.travelDates.length && t.travelDates.every(d => isPastDate(d, t))) return 'past';
    return t.status;
  };
  const statusLabel = t => IC.statusLabel[effStatus(t)] || '';
  const money = (p, n) => { const v = n == null ? p.from : n; return (p && p.currency === 'USD' ? '$' : '₱') + Number(v).toLocaleString('en-PH'); };
  const priceValue = t => (t.price ? t.price.from * (t.price.currency === 'USD' ? 57 : 1) : 9e9);
  const pkgUrl = t => `package.html?id=${encodeURIComponent(t.id)}`;
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
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

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
    phone: svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>')
  };

  /* ===================== Header, progress bar, drawer ===================== */
  function initHeader() {
    const header = $('#header');
    let bar = $('.scroll-progress');
    if (!bar) { bar = document.createElement('div'); bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.prepend(bar); }
    const onScroll = () => {
      if (header) header.classList.toggle('scrolled', window.scrollY > 10);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const page = document.body.dataset.page;
    $$('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === page));

    const toggle = $('#navToggle'), drawer = $('#drawer');
    if (toggle && drawer) {
      const open = () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
      const close = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
      toggle.addEventListener('click', () => (drawer.classList.contains('open') ? close() : open()));
      $$('[data-close-drawer]', drawer).forEach(el => el.addEventListener('click', close));
      $$('a', drawer).forEach(a => a.addEventListener('click', close));
      window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
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
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  }

  function initTilt(root = document) {
    if (reduced || touch) return;
    $$('[data-tilt]', root).forEach(card => {
      if (card.dataset.tiltReady) return;
      card.dataset.tiltReady = '1';
      let raf = 0, last = null;
      card.addEventListener('mousemove', e => {
        last = e;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = card.getBoundingClientRect();
          const x = (last.clientX - r.left) / r.width - 0.5;
          const y = (last.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
          card.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg');
        });
      });
      card.addEventListener('mouseleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
  }

  function initHeroTitle() {
    const t = $('.hero-title[data-split]');
    if (!t || reduced) return;
    let i = 0;
    const wrap = node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span'); s.className = 'word'; s.textContent = part; s.style.animationDelay = (i++ * 60 + 120) + 'ms'; frag.appendChild(s);
        });
        node.parentNode.replaceChild(frag, node);
      } else { Array.from(node.childNodes).forEach(wrap); }
    };
    wrap(t);
  }

  function initTicker() {
    const track = $('#ticker');
    if (!track || !IC.destinationsTicker) return;
    const items = IC.destinationsTicker.map(([n, s]) => `<span class="marquee-item">${esc(n)}<small>${esc(s)}</small></span>`).join('');
    track.innerHTML = items + items;
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
    initTilt(grid);
  }

  function initFeatured() {
    const grid = $('#featuredGrid');
    if (!grid || !IC.tours) return;
    const tabs = $$('#featuredTabs .tab');
    // Three packages, reshuffled on every page load (departed and coming-soon packages excluded)
    const live = IC.tours.filter(t => effStatus(t) !== 'past' && effStatus(t) !== 'soon');
    const show = region => renderTours(grid, shuffle(region === 'all' ? live : live.filter(t => t.region === region)).slice(0, 3));
    tabs.forEach(tab => tab.addEventListener('click', () => { tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); show(tab.dataset.filter); }));
    show('all');
  }

  /* ---- Special offers (packages with a published price) ---- */
  function initOffers() {
    const grid = $('#offersGrid');
    if (!grid || !IC.tours) return;
    const offers = IC.tours.filter(t => t.price && effStatus(t) !== 'past');
    grid.innerHTML = offers.map((t, i) => `
      <article class="offer-card reveal" style="--d:${i * 0.1}s" data-tilt>
        <a class="offer-media" href="${pkgUrl(t)}"><img src="${wix(t.image, 520, 390, t.imageAlign)}" alt="${esc(t.alt)}" loading="lazy" width="520" height="390">${cardBadge(t)}</a>
        <div class="offer-body">
          <div class="offer-kickers"><span class="offer-kicker">${flagImg(t)}${esc(t.country)}</span><span class="offer-kicker">${I.plane}${esc(t.departure.split(' (')[0])} departure</span><span class="offer-kicker">${I.clock}${esc(t.duration)}</span></div>
          ${statusPill(t)}
          <h3><a href="${pkgUrl(t)}">${esc(t.name)}</a></h3>
          <p>${esc(t.summary)}</p>
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
    initTilt(grid);
  }

  /* ---- Tours page ---- */
  function initToursPage() {
    const grid = $('#toursGrid');
    if (!grid || !IC.tours) return;
    const search = $('#tourSearch'), dur = $('#durationSel'), sort = $('#sortSel'), count = $('#resultsCount'), clear = $('#clearFilters');
    const tabs = $$('#regionTabs .tab');
    const params = new URLSearchParams(location.search);
    let region = params.get('region') && IC.regions[params.get('region')] ? params.get('region') : 'all';
    tabs.forEach(t => {
      const r = t.dataset.filter;
      const n = r === 'all' ? IC.tours.length : IC.tours.filter(x => x.region === r).length;
      t.insertAdjacentHTML('beforeend', `<span class="count">${n}</span>`);
      t.classList.toggle('active', r === region);
      t.addEventListener('click', () => { region = r; tabs.forEach(x => x.classList.toggle('active', x === t)); apply(); });
    });
    const durOk = (t, v) => v === 'all' || (v === 'day' && t.days === 1) || (v === 'multi' && t.days >= 2) || (v === 'offer' && effStatus(t) === 'offer') || (v === 'soon' && effStatus(t) === 'soon') || (v === 'past' && effStatus(t) === 'past');
    const order = { offer: 0, available: 1, request: 2, soon: 3, past: 9 };
    function apply() {
      const q = (search.value || '').trim().toLowerCase();
      const list = IC.tours.filter(t =>
        (region === 'all' || t.region === region) && durOk(t, dur.value) &&
        (!q || (t.name + ' ' + regionLabel(t) + ' ' + (t.country || '') + ' ' + t.places.join(' ') + ' ' + t.inclusions.join(' ')).toLowerCase().includes(q))
      );
      switch (sort.value) {
        case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'duration': list.sort((a, b) => (a.days || 99) - (b.days || 99)); break;
        case 'price': list.sort((a, b) => priceValue(a) - priceValue(b)); break;
        default: list.sort((a, b) => (order[effStatus(a)] - order[effStatus(b)]) || ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)));
      }
      renderTours(grid, list);
      count.innerHTML = `Showing <strong>${list.length}</strong> of ${IC.tours.length} packages` + (region !== 'all' ? ` in <strong>${esc(IC.regions[region].label)}</strong>` : '');
    }
    [search, dur, sort].forEach(el => el.addEventListener('input', apply));
    clear.addEventListener('click', () => { search.value = ''; dur.value = 'all'; sort.value = 'featured'; region = 'all'; tabs.forEach(x => x.classList.toggle('active', x.dataset.filter === 'all')); apply(); });
    apply();
  }

  /* ===================== Package detail page ===================== */
  function initPackagePage() {
    const root = $('#pkgPage');
    if (!root || !IC.tours) return;
    const id = new URLSearchParams(location.search).get('id');
    const t = IC.tours.find(x => x.id === id);
    if (!t) {
      root.innerHTML = `<section class="section"><div class="container text-center"><span class="eyebrow center">Package not found</span><h1 class="h2" style="margin-bottom:12px">We couldn’t find that package</h1><p class="lead" style="margin:0 auto 24px">It may have been renamed. Browse all current packages instead.</p><a class="btn btn-primary btn-lg" href="tours.html">Browse tour packages ${I.arrow}</a></div></section>`;
      return;
    }
    const region = destLabel(t);
    const related = IC.tours.filter(x => x.id !== t.id && x.region === t.region).slice(0, 3);
    const hasDates = t.travelDates && t.travelDates.length;
    const hasIt = t.itinerary && t.itinerary.length;
    const hasPosters = t.posters && t.posters.length;
    const gallery = t.gallery && t.gallery.length ? t.gallery : [t.image];

    document.title = `${t.name} | ${CONFIG.shortName}`;
    const md = $('meta[name="description"]'); if (md) md.content = t.summary;
    const og = $('meta[property="og:title"]'); if (og) og.content = t.name;
    const ogd = $('meta[property="og:description"]'); if (ogd) ogd.content = t.summary;
    const ogi = $('meta[property="og:image"]'); if (ogi) ogi.content = wix(t.image, 1200, 630, t.imageAlign);

    const tabs = [['overview', 'Overview'], hasIt ? ['itinerary', 'Itinerary'] : null, ['inclusions', 'Inclusions'], ['places', 'Places & guide'], hasDates ? ['dates', 'Dates & price'] : null, hasPosters ? ['posters', 'Posters'] : null].filter(Boolean);

    root.innerHTML = `
      <section class="pkg-hero">
        <div class="hero-bg"><img src="${wix(t.hero || t.image, 960, 500, t.hero ? 'c' : t.imageAlign)}" alt="" width="960" height="500"></div>
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>${I.left.replace('m15 18-6-6 6-6', 'm9 18 6-6-6-6')}<a href="tours.html">Tour Packages</a>${I.left.replace('m15 18-6-6 6-6', 'm9 18 6-6-6-6')}<span>${esc(region)}</span></nav>
          <div class="chips pkg-chips">
            ${t.badge && t.badge.toLowerCase() !== statusLabel(t).toLowerCase() ? `<span class="pill gold">${esc(t.badge)}</span>` : ''}
            ${t.price ? `<span class="pill gold">${esc(t.price.label)} ${money(t.price)}</span>` : ''}
            <span class="pill glass">${flagImg(t)}${esc(region)}</span>
            ${t.duration ? `<span class="pill glass">${I.clock}${esc(t.duration)}</span>` : ''}
            ${t.departure ? `<span class="pill glass">${I.plane}Departs ${esc(t.departure)}</span>` : ''}
            ${statusPill(t)}
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
              ${gallery.length > 1 ? `<div class="pkg-thumbs">${gallery.map((g, i) => `<button type="button" class="${i === 0 ? 'active' : ''}" data-thumb="${esc(g)}" aria-label="Photo ${i + 1}"><img src="${wix(g, 240, 180, t.imageAlign)}" alt=""></button>`).join('')}</div>` : ''}
            </div>

            <article id="overview" class="pkg-section reveal">
              <span class="eyebrow">Overview</span>
              <h2 class="h2">About this ${t.days === 1 ? 'day tour' : 'package'}</h2>
              <p class="pkg-text">${esc(t.overview || t.summary)}</p>
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
                <div class="inc-col"><h4>${I.check} Inclusions</h4><ul>${t.inclusions.map(x => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul></div>
                ${t.exclusions && t.exclusions.length ? `<div class="inc-col exc"><h4>${I.x} Exclusions</h4><ul>${t.exclusions.map(x => `<li>${I.x}<span>${esc(x)}</span></li>`).join('')}</ul></div>` : ''}
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

            ${hasDates ? `<article id="dates" class="pkg-section reveal">
              <span class="eyebrow">Dates &amp; price</span>
              <h2 class="h2">Travel dates 2026</h2>
              <p class="muted" style="margin-bottom:18px">${esc(t.travelDatesNote || '')} Base rate ${esc(t.price.label.toLowerCase())} ${money(t.price)} ${esc(t.price.unit)}.</p>
              <div class="date-grid">${t.travelDates.map(d => `<span class="date-chip ${d.add ? 'sur' : ''} ${isPastDate(d, t) ? 'past' : ''}" title="${isPastDate(d, t) ? 'This date has passed' : 'Available date'}">${I.cal}<span>${esc(d.d)}${d.y ? ' ' + d.y : ''}</span>${d.add ? `<em>+${d.cur === 'USD' ? '$' + d.add : peso(d.add)}</em>` : ''}</span>`).join('')}</div>
              <p class="small muted" style="margin-top:14px">Dates in orange carry a peak-season surcharge per pax; greyed dates have passed. Availability is confirmed at booking.</p>
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
              <ul class="meta">
                ${t.duration ? `<li>${I.clock}<span>${esc(t.duration)}</span></li>` : ''}
                ${t.departure ? `<li>${I.plane}<span>Departs ${esc(t.departure)}</span></li>` : ''}
                <li>${I.pin}<span>${esc(region)}</span></li>
                ${hasDates ? `<li>${I.cal}<span>${t.travelDates.length} departure dates in 2026</span></li>` : ''}
                <li>${statusPill(t)}</li>
              </ul>
              <a class="btn btn-primary btn-block btn-lg" href="contact.html?service=tour&package=${encodeURIComponent(t.id)}">${ctaLabel(t)} ${I.arrow}</a>
              <a class="btn btn-outline btn-block" href="${CONFIG.messenger}" target="_blank" rel="noopener">${I.msg} Message us on Facebook</a>
              <a class="btn btn-light btn-block" href="${CONFIG.mobileHref}">${I.phone} ${esc(CONFIG.mobile)}</a>
              <p class="small muted" style="margin-top:14px">Quotations are free. Inquiries go straight to ${esc(CONFIG.email)}.</p>
            </div>
          </aside>
        </div>
      </section>

      ${related.length ? `<section class="section bg-white"><div class="container">
        <div class="section-head split reveal"><div><span class="eyebrow">You may also like</span><h2 class="h2">Other packages you may like</h2></div><a class="link-arrow" href="tours.html?region=${esc(t.region)}">Browse all packages ${I.arrow}</a></div>
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
    const ld = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: t.name, description: t.summary, image: wix(t.image, 1200, 630, t.imageAlign), touristType: 'Leisure', itinerary: t.places.map(p => ({ '@type': 'TouristAttraction', name: p })), provider: { '@type': 'TravelAgency', name: CONFIG.brand, telephone: CONFIG.mobile, email: CONFIG.email, url: 'https://www.immaculateconnectionsph.com/' } };
    if (t.price) ld.offers = { '@type': 'Offer', price: t.price.from, priceCurrency: t.price.currency || 'PHP', availability: effStatus(t) === 'past' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', url: location.href };
    const s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

    initTilt(root);
  }

  /* ===================== Lightbox & galleries ===================== */
  let lb;
  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close photo">${I.x}</button><figure style="margin:0;text-align:center"><img alt=""><figcaption></figcaption></figure>`;
    document.body.appendChild(lb);
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox-close')) close(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    return lb;
  }
  function openLightbox(src, title) {
    const box = ensureLightbox();
    $('img', box).src = src; $('img', box).alt = title || ''; $('figcaption', box).textContent = title || '';
    box.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function initGallery() {
    const root = $('#gallery');
    if (root && IC.gallery) {
      const items = root.dataset.limit ? IC.gallery.slice(0, parseInt(root.dataset.limit, 10)) : IC.gallery;
      root.innerHTML = items.map((g, i) => `
        <figure class="gal-item ${g.shape} reveal" style="--d:${(i % 4) * 0.08}s" data-lb="${esc(g.id)}" data-title="${esc(g.title)} · ${esc(g.sub)}" tabindex="0" role="button" aria-label="View ${esc(g.title)}">
          <img src="${wix(g.id, 900, g.shape === 'tall' ? 1200 : g.shape === 'square' ? 900 : 675)}" alt="${esc(g.title)} – ${esc(g.sub)}" loading="lazy">
          <figcaption>${esc(g.title)}<small>${esc(g.sub)}</small></figcaption>
        </figure>`).join('');
    }
    $$('[data-photos]').forEach(row => {
      const list = IC[row.dataset.photos]; if (!list) return;
      const caps = (row.dataset.captions || '').split('|');
      row.innerHTML = list.map((id, i) => `<figure class="reveal" style="--d:${i * 0.08}s" data-lb="${esc(id)}" data-title="${esc(caps[i] || '')}" tabindex="0" role="button" aria-label="View photo"><img src="${wix(id, 800, 600)}" alt="${esc(caps[i] || 'Photo')}" loading="lazy">${caps[i] ? `<figcaption>${esc(caps[i])}</figcaption>` : ''}</figure>`).join('');
    });
    document.addEventListener('click', e => {
      const f = e.target.closest('[data-lb]'); if (!f || e.target.closest('a,button')) return;
      openLightbox(wix(f.dataset.lb), f.dataset.title || '');
    });
    document.addEventListener('keydown', e => {
      const f = e.target.closest && e.target.closest('[data-lb]');
      if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLightbox(wix(f.dataset.lb), f.dataset.title || ''); }
    });
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
    service: 'Service', package: 'Package', destination: 'Destination', date: 'Travel date', pax: 'Number of people',
    from: 'From', to: 'To', trip: 'Trip type', depart: 'Departure date', return: 'Return date', cabin: 'Class',
    checkin: 'Check-in', checkout: 'Check-out', rooms: 'Rooms', guests: 'Guests',
    vehicle: 'Vehicle', pickup: 'Pick-up location', days: 'Duration', route: 'Route',
    event: 'Type of event', epax: 'Participants', venue: 'Venue city', estart: 'Date start', eend: 'Date end', needs: 'Requirements',
    notes: 'Other details', name: 'Name', email: 'Email', phone: 'Phone', contact: 'Preferred contact'
  };

  function initInquiry() {
    const form = $('#inquiryForm');
    if (!form) return;
    const steps = $$('.fstep', form), pSteps = $$('.progress .p-step', form), bars = $$('.progress .bar', form);
    const params = new URLSearchParams(location.search);
    let cur = 1;

    const pkg = $('#f_package', form);
    if (pkg && IC.tours) {
      pkg.innerHTML = '<option value="">Select a package</option>' +
        Object.keys(IC.regions).map(r => `<optgroup label="${esc(IC.regions[r].label)}">${IC.tours.filter(t => t.region === r).map(t => `<option value="${esc(t.id)}">${esc(t.name)}${t.duration ? ' · ' + esc(t.duration) : ''}${t.price ? ' · ' + money(t.price) : ''}</option>`).join('')}</optgroup>`).join('') +
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
      const o = collect();
      const btn = $('[type="submit"]', form), errBox = $('#formError', form);
      errBox.classList.remove('show'); btn.disabled = true; btn.textContent = 'Sending…';
      const serviceName = SERVICE_LABELS[o.service] || 'Travel';
      const payload = { _subject: `Website inquiry: ${serviceName}${o.package ? ' – ' + o.package : ''}`, _template: 'table', _captcha: 'false', _replyto: o.email, name: o.name, email: o.email };
      Object.keys(o).forEach(k => { if (LABELS[k]) payload[LABELS[k]] = k === 'service' ? serviceName : o[k]; });
      payload['Sent from'] = location.href;
      let sent = false, detail = '';
      try {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        const j = await r.json().catch(() => ({})); sent = r.ok && String(j.success) !== 'false'; detail = j.message || '';
      } catch (_) { sent = false; }
      const text = `Inquiry via website\n\n${Object.keys(o).filter(k => LABELS[k]).map(k => `${LABELS[k]}: ${k === 'service' ? serviceName : o[k]}`).join('\n')}`;
      const success = $('#success', form);
      $('#mailLink', success).href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Inquiry: ' + serviceName)}&body=${encodeURIComponent(text)}`;
      $('#msgLink', success).href = CONFIG.messenger;
      const first = (o.name || '').split(' ')[0] || 'there';
      if (sent) {
        $('#formBody', form).style.display = 'none'; success.classList.add('show');
        $('#successMsg', success).textContent = `Thank you, ${first}! Your inquiry has been sent to ${CONFIG.email}. Our team will get back to you shortly with a quotation. Need it faster? Message us on Facebook or call ${CONFIG.mobile}.`;
        window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 110, behavior: reduced ? 'auto' : 'smooth' });
      } else {
        btn.disabled = false; btn.innerHTML = `Try again ${I.arrow}`;
        errBox.innerHTML = `We could not send your inquiry automatically${detail ? ' (' + esc(detail) + ')' : ''}. Please <a href="${$('#mailLink', success).href}" style="font-weight:700;text-decoration:underline">send it by email</a> or <a href="${CONFIG.messenger}" target="_blank" rel="noopener" style="font-weight:700;text-decoration:underline">message us on Facebook</a>.`;
        errBox.classList.add('show');
      }
    });

    go(params.get('service') ? 2 : 1);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeader(); initContactLinks(); initHeroTitle(); initTicker(); initOffers(); initFeatured(); initToursPage(); initPackagePage();
    initGallery(); initFaq(); initSubnav(); initMisc(); initInquiry(); initTilt(); initReveal();
  });
})();
