/* =========================================================
   Immaculate Connections Travel Agency — main.js
   ---------------------------------------------------------
   Nav & drawer, reveal animations, destinations ticker,
   tour cards + package modal, galleries + lightbox, FAQ,
   services sub-nav, multi-step inquiry form (FormSubmit).
   ========================================================= */

(function () {
  'use strict';

  const IC = (window.IC = window.IC || {});

  /* ---- Agency contact details (from immaculateconnectionsph.com) ---- */
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
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wix = (id, w, h) => IC.wix ? IC.wix(id, w, h) : id;

  const svg = (p, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
  const I = {
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    x: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    arrow: svg('<path d="M5 12h14M12 5l7 7-7 7"/>', 'class="arrow"'),
    info: svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
    map: svg('<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>'),
    msg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.99-.88a.8.8 0 0 1 .53-.04c.91.25 1.88.39 2.9.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z"/></svg>'
  };

  /* ===================== Header / drawer ===================== */
  function initHeader() {
    const header = $('#header');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
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

  /* ===================== Contact links from CONFIG ===================== */
  function initContactLinks() {
    $$('[data-msg]').forEach(a => { a.href = CONFIG.messenger; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-fb]').forEach(a => { a.href = CONFIG.facebook; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-tel]').forEach(a => { a.href = CONFIG.mobileHref; if (!a.hasAttribute('data-keep')) a.textContent = CONFIG.mobile; });
    $$('[data-landline]').forEach(a => { a.href = CONFIG.landlineHref; if (!a.hasAttribute('data-keep')) a.textContent = CONFIG.landline; });
    $$('[data-mail]').forEach(a => { a.href = 'mailto:' + CONFIG.email; if (!a.hasAttribute('data-keep')) a.textContent = CONFIG.email; });
    $$('[data-year]').forEach(e => (e.textContent = new Date().getFullYear()));
  }

  /* ===================== Reveal ===================== */
  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  }

  /* ===================== Hero title ===================== */
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
          const s = document.createElement('span');
          s.className = 'word'; s.textContent = part; s.style.animationDelay = (i++ * 60 + 120) + 'ms';
          frag.appendChild(s);
        });
        node.parentNode.replaceChild(frag, node);
      } else { Array.from(node.childNodes).forEach(wrap); }
    };
    wrap(t);
  }

  /* ===================== Ticker ===================== */
  function initTicker() {
    const track = $('#ticker');
    if (!track || !IC.destinationsTicker) return;
    const items = IC.destinationsTicker.map(([n, s]) => `<span class="marquee-item">${esc(n)}<small>${esc(s)}</small></span>`).join('');
    track.innerHTML = items + items;
  }

  /* ===================== Tours ===================== */
  function badgeClass(b) {
    b = (b || '').toLowerCase();
    if (b.includes('soon')) return 'grey';
    if (b.includes('heritage') || b.includes('poster')) return 'blue';
    if (b.includes('featured')) return '';
    return 'navy';
  }
  function statusLabel(t) { return IC.statusLabel[t.status] || ''; }
  function ctaLabel(t) { return t.status === 'soon' ? 'Ask about this tour' : 'Request a quote'; }

  function tourCard(t, i) {
    const region = IC.regions[t.region] ? IC.regions[t.region].label : t.region;
    const shown = t.places.slice(0, 3);
    const more = t.places.length - shown.length;
    return `
    <article class="tour-card ${t.status === 'soon' ? 'soon' : ''}" style="animation-delay:${Math.min(i, 8) * 60}ms" data-id="${esc(t.id)}">
      <div class="tour-media">
        ${t.badge ? `<span class="badge ${badgeClass(t.badge)}">${esc(t.badge)}</span>` : ''}
        <img src="${wix(t.image, 800, 600)}" alt="${esc(t.alt)}" loading="lazy">
        <div class="tour-meta">
          ${t.duration ? `<span class="pill glass">${I.clock}${esc(t.duration)}</span>` : ''}
          <span class="pill glass">${I.pin}${esc(region)}</span>
        </div>
      </div>
      <div class="tour-body">
        <div class="tour-region"><span>${esc(region)}</span><span class="status">${esc(statusLabel(t))}</span></div>
        <h3><button type="button" data-open="${esc(t.id)}">${esc(t.name)}</button></h3>
        <p class="tour-intro">${esc(t.intro.length > 130 ? t.intro.slice(0, 127).replace(/\s+\S*$/, '') + '…' : t.intro)}</p>
        <ul class="tour-highlights">
          ${shown.map(p => `<li>${I.check}<span>${esc(p)}</span></li>`).join('')}
          ${more > 0 ? `<li class="more">+ ${more} more places</li>` : ''}
        </ul>
        <div class="tour-foot">
          <div class="price"><small>${t.status === 'available' ? 'Inclusions' : 'Status'}</small><strong>${t.status === 'available' ? esc(t.inclusions.length + ' included') : esc(statusLabel(t))}</strong></div>
          <div class="actions">
            <button class="btn btn-outline" type="button" data-open="${esc(t.id)}">Details</button>
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
    const tabs = $$('#featuredTabs .tab');
    const show = region => renderTours(grid, region === 'all' ? IC.tours.filter(t => t.featured) : IC.tours.filter(t => t.region === region).slice(0, 6));
    tabs.forEach(tab => tab.addEventListener('click', () => { tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); show(tab.dataset.filter); }));
    show('all');
  }

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

    const durOk = (t, v) => v === 'all' || (v === 'day' && t.days === 1) || (v === 'multi' && t.days >= 2) || (v === 'soon' && t.status === 'soon');
    function apply() {
      const q = (search.value || '').trim().toLowerCase();
      const list = IC.tours.filter(t =>
        (region === 'all' || t.region === region) && durOk(t, dur.value) &&
        (!q || (t.name + ' ' + IC.regions[t.region].label + ' ' + t.places.join(' ') + ' ' + t.inclusions.join(' ')).toLowerCase().includes(q))
      );
      switch (sort.value) {
        case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'duration': list.sort((a, b) => (a.days || 99) - (b.days || 99)); break;
        default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (a.status === 'available' ? -1 : 1) - (b.status === 'available' ? -1 : 1));
      }
      renderTours(grid, list);
      count.innerHTML = `Showing <strong>${list.length}</strong> of ${IC.tours.length} packages` + (region !== 'all' ? ` in <strong>${esc(IC.regions[region].label)}</strong>` : '');
    }
    [search, dur, sort].forEach(el => el.addEventListener('input', apply));
    clear.addEventListener('click', () => { search.value = ''; dur.value = 'all'; sort.value = 'featured'; region = 'all'; tabs.forEach(x => x.classList.toggle('active', x.dataset.filter === 'all')); apply(); });
    apply();
    if (params.get('open')) openTour(params.get('open'));
  }

  /* ---- Package modal ---- */
  let modal, lastFocus;
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `<div class="modal-backdrop" data-close></div><div class="modal-card" id="modalCard"></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    return modal;
  }
  function openTour(id) {
    const t = IC.tours.find(x => x.id === id);
    if (!t) return;
    const m = ensureModal();
    const card = $('#modalCard', m);
    const region = IC.regions[t.region] ? IC.regions[t.region].label : t.region;
    card.innerHTML = `
      <button class="modal-close" type="button" data-close aria-label="Close package details">${I.x}</button>
      <div class="modal-hero">
        <img src="${wix(t.image, 1400, 700)}" alt="${esc(t.alt)}">
        <div class="modal-hero-text">
          <div class="chips">
            <span class="pill glass">${I.pin}${esc(region)}</span>
            ${t.duration ? `<span class="pill glass">${I.clock}${esc(t.duration)}</span>` : ''}
            <span class="pill glass">${I.info}${esc(statusLabel(t))}</span>
          </div>
          <h2>${esc(t.name)}</h2>
        </div>
      </div>
      <div class="modal-body">
        <div>
          <p class="intro">${esc(t.intro)}</p>
          <h4>Places you’ll visit</h4>
          <ul class="places">${t.places.map((p, i) => `<li><span class="n">${i + 1}</span><span>${esc(p)}</span></li>`).join('')}</ul>
          ${t.posters && t.posters.length ? `<h4>Itinerary posters</h4><p class="muted small" style="margin-bottom:12px">Tap a poster to enlarge.</p><div class="poster-row">${t.posters.map((p, i) => `<figure data-poster="${esc(p)}" data-title="${esc(t.name)} poster ${i + 1}"><img src="${wix(p, 600, 800)}" alt="${esc(t.name)} itinerary poster ${i + 1}" loading="lazy"></figure>`).join('')}</div>` : ''}
        </div>
        <aside class="modal-side">
          <div class="side-card">
            <div class="price"><small>Pricing</small><strong>Quotation on request</strong></div>
            <ul class="meta">
              ${t.duration ? `<li>${I.clock}<span>${esc(t.duration)}</span></li>` : ''}
              <li>${I.pin}<span>${esc(region)}</span></li>
              <li>${I.info}<span>${esc(statusLabel(t))}</span></li>
            </ul>
            <a class="btn btn-primary btn-block" href="contact.html?service=tour&package=${encodeURIComponent(t.id)}">${ctaLabel(t)} ${I.arrow}</a>
            <a class="btn btn-outline btn-block" href="${CONFIG.messenger}" target="_blank" rel="noopener">${I.msg} Message us on Facebook</a>
          </div>
          <div class="side-card"><h4>Inclusions</h4><ul class="inc">${t.inclusions.map(x => `<li>${I.check}<span>${esc(x)}</span></li>`).join('')}</ul></div>
        </aside>
      </div>`;
    lastFocus = document.activeElement;
    m.classList.add('open'); document.body.style.overflow = 'hidden'; card.scrollTop = 0;
    $('.modal-close', m).focus();
  }
  function closeModal() { if (!modal) return; modal.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  IC.openTour = openTour;

  /* ===================== Lightbox (shared) ===================== */
  let lb;
  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close photo">${I.x}</button><figure style="margin:0;text-align:center"><img alt=""><figcaption></figcaption></figure>`;
    document.body.appendChild(lb);
    const close = () => { lb.classList.remove('open'); if (!modal || !modal.classList.contains('open')) document.body.style.overflow = ''; };
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox-close')) close(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    return lb;
  }
  function openLightbox(src, title) {
    const box = ensureLightbox();
    $('img', box).src = src; $('img', box).alt = title || '';
    $('figcaption', box).textContent = title || '';
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
    const posters = $('#posters');
    if (posters && IC.posters) {
      posters.innerHTML = IC.posters.map((p, i) => `<figure class="reveal" style="--d:${i * 0.08}s" data-lb="${esc(p.id)}" data-title="${esc(p.title)}" tabindex="0" role="button" aria-label="View ${esc(p.title)}"><img src="${wix(p.id, 700, 930)}" alt="${esc(p.title)}" loading="lazy"><figcaption>${esc(p.title)}</figcaption></figure>`).join('');
    }
    $$('[data-photos]').forEach(row => {
      const list = IC[row.dataset.photos];
      if (!list) return;
      const caps = (row.dataset.captions || '').split('|');
      row.innerHTML = list.map((id, i) => `<figure class="reveal" style="--d:${i * 0.08}s" data-lb="${esc(id)}" data-title="${esc(caps[i] || '')}" tabindex="0" role="button" aria-label="View photo"><img src="${wix(id, 800, 600)}" alt="${esc(caps[i] || 'Photo')}" loading="lazy">${caps[i] ? `<figcaption>${esc(caps[i])}</figcaption>` : ''}</figure>`).join('');
    });
    document.addEventListener('click', e => {
      const f = e.target.closest('[data-lb], [data-poster]');
      if (!f) return;
      const id = f.dataset.lb || f.dataset.poster;
      openLightbox(wix(id), f.dataset.title || '');
    });
    document.addEventListener('keydown', e => {
      const f = e.target.closest && e.target.closest('[data-lb]');
      if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLightbox(wix(f.dataset.lb), f.dataset.title || ''); }
    });
  }

  /* ===================== FAQ ===================== */
  function initFaq() {
    $$('.faq').forEach(faq => faq.addEventListener('toggle', e => {
      if (e.target.open) $$('details[open]', faq).forEach(d => { if (d !== e.target) d.open = false; });
    }, true));
  }

  /* ===================== Services sub-nav ===================== */
  function initSubnav() {
    const nav = $('.subnav');
    if (!nav || !('IntersectionObserver' in window)) return;
    const links = $$('a[href^="#"]', nav);
    const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-35% 0px -55% 0px' });
    secs.forEach(s => io.observe(s));
  }

  /* ===================== Misc ===================== */
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
    document.addEventListener('click', e => {
      const o = e.target.closest('[data-open]');
      if (o) { e.preventDefault(); openTour(o.dataset.open); }
    });
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
        Object.keys(IC.regions).map(r => `<optgroup label="${esc(IC.regions[r].label)}">${IC.tours.filter(t => t.region === r).map(t => `<option value="${esc(t.id)}">${esc(t.name)}${t.duration ? ' · ' + esc(t.duration) : ''}</option>`).join('')}</optgroup>`).join('') +
        '<option value="custom">Custom itinerary (describe below)</option>';
    }

    const showFor = () => {
      const v = form.elements.service.value;
      $$('[data-for]', form).forEach(el => {
        const ok = el.dataset.for.split(',').includes(v);
        el.classList.toggle('show', ok);
        $$('input,select,textarea', el).forEach(f => { f.disabled = !ok; });
      });
      const hint = $('#detailsHint', form);
      if (hint) hint.textContent = ({
        tour: 'Choose a package or describe the trip you have in mind. Dates can be tentative.',
        flights: 'Tell us the route and dates and we will quote available fares.',
        hotel: 'Where, when and how many guests. Add a preferred hotel or resort if you have one.',
        transport: 'Vehicle type, pick-up point and dates. Rates vary by package and location.',
        mice: 'The basics are enough. Our team will follow up with a proposal for your event.',
        other: 'Tell us what you need and we will point you to the right person.'
      })[v] || 'Tell us what you need.';
    };
    $$('input[name="service"]', form).forEach(r => r.addEventListener('change', showFor));

    const setVal = (name, val) => {
      if (val == null || val === '') return;
      $$(`[name="${name}"]`, form).forEach(el => {
        if (el.type === 'radio' || el.type === 'checkbox') { if (el.value === val) el.checked = true; }
        else if (el.tagName === 'SELECT') { const o = Array.from(el.options).find(x => x.value === val || x.text === val); if (o) el.value = o.value; }
        else el.value = val;
      });
    };
    if (params.get('package') && !params.get('service')) params.set('service', 'tour');
    params.forEach((v, k) => setVal(k, v));
    showFor();

    const scrollToForm = () => { const top = form.getBoundingClientRect().top + window.scrollY - 110; if (window.scrollY > top) window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' }); };
    const go = n => {
      cur = n;
      steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step, 10) === n));
      pSteps.forEach(p => { const k = parseInt(p.dataset.step, 10); p.classList.toggle('active', k === n); p.classList.toggle('done', k < n); const i = $('i', p); if (k < n) i.innerHTML = I.check; else i.textContent = k; });
      bars.forEach((b, idx) => b.classList.toggle('fill', idx + 1 < n));
      if (n === 3) buildSummary();
      scrollToForm();
    };
    const validate = n => {
      const step = steps.find(s => parseInt(s.dataset.step, 10) === n);
      let ok = true, first = null;
      $$('.field', step).forEach(f => f.classList.remove('error'));
      if (n === 1) { const chosen = !!form.elements.service.value; $('#serviceErr', form).style.display = chosen ? 'none' : 'block'; return chosen; }
      $$('input,select,textarea', step).forEach(el => {
        if (el.disabled) return;
        if (!el.checkValidity()) { ok = false; const f = el.closest('.field'); if (f) f.classList.add('error'); if (!first) first = el; }
      });
      if (first) first.focus();
      return ok;
    };
    form.addEventListener('click', e => {
      const nx = e.target.closest('[data-next]'); if (nx && validate(cur)) go(cur + 1);
      const pv = e.target.closest('[data-prev]'); if (pv) go(cur - 1);
    });

    const collect = () => {
      const fd = new FormData(form);
      const o = {};
      fd.forEach((v, k) => { if (v === '' || k === 'consent' || k.startsWith('_')) return; o[k] = o[k] ? o[k] + ', ' + v : v; });
      if (o.package && IC.tours) { const t = IC.tours.find(x => x.id === o.package); if (t) o.package = t.name + (t.duration ? ` (${t.duration})` : ''); else if (o.package === 'custom') o.package = 'Custom itinerary'; }
      return o;
    };
    const buildSummary = () => {
      const o = collect(); const box = $('#summary', form); if (!box) return;
      box.innerHTML = Object.keys(o).filter(k => LABELS[k] && !['name', 'email', 'phone', 'contact'].includes(k))
        .map(k => `<div><span>${LABELS[k]}</span><strong>${esc(k === 'service' ? (SERVICE_LABELS[o[k]] || o[k]) : o[k])}</strong></div>`).join('');
    };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate(3)) return;
      const o = collect();
      const btn = $('[type="submit"]', form);
      const errBox = $('#formError', form);
      errBox.classList.remove('show');
      btn.disabled = true; btn.textContent = 'Sending…';

      const serviceName = SERVICE_LABELS[o.service] || 'Travel';
      const payload = {
        _subject: `Website inquiry: ${serviceName}${o.package ? ' – ' + o.package : ''}`,
        _template: 'table',
        _captcha: 'false',
        _replyto: o.email,
        name: o.name,
        email: o.email
      };
      Object.keys(o).forEach(k => { if (LABELS[k]) payload[LABELS[k]] = k === 'service' ? serviceName : o[k]; });
      payload['Sent from'] = location.href;

      let sent = false, detail = '';
      try {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        const j = await r.json().catch(() => ({}));
        sent = r.ok && String(j.success) !== 'false';
        detail = j.message || '';
      } catch (_) { sent = false; }

      const text = `Inquiry via website\n\n${Object.keys(o).filter(k => LABELS[k]).map(k => `${LABELS[k]}: ${k === 'service' ? serviceName : o[k]}`).join('\n')}`;
      const success = $('#success', form);
      $('#mailLink', success).href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Inquiry: ' + serviceName)}&body=${encodeURIComponent(text)}`;
      $('#msgLink', success).href = CONFIG.messenger;
      const first = (o.name || '').split(' ')[0] || 'there';

      if (sent) {
        $('#formBody', form).style.display = 'none';
        success.classList.add('show');
        $('#successMsg', success).textContent = `Thank you, ${first}! Your inquiry has been sent to ${CONFIG.email}. Our team will get back to you shortly with a quotation. Need it faster? Message us on Facebook or call ${CONFIG.mobile}.`;
        window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 110, behavior: reduced ? 'auto' : 'smooth' });
      } else {
        btn.disabled = false; btn.innerHTML = `Try again ${I.arrow}`;
        errBox.innerHTML = `We could not send your inquiry automatically${detail ? ' (' + esc(detail) + ')' : ''}. Please <a href="${$('#mailLink', success).href}" style="font-weight:700;text-decoration:underline">send it by email</a> or <a href="${CONFIG.messenger}" target="_blank" rel="noopener" style="font-weight:700;text-decoration:underline">message us on Facebook</a>.`;
        errBox.classList.add('show');
      }
    });

    go(1);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeader(); initContactLinks(); initHeroTitle(); initTicker(); initFeatured(); initToursPage();
    initGallery(); initFaq(); initSubnav(); initMisc(); initInquiry(); initReveal();
  });
})();
