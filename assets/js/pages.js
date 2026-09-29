/* =========================================================
   Immaculate Connections: service pages, gallery and blog
   ---------------------------------------------------------
   Runs after main.js and uses its helpers (IC.util). Every
   piece starts from content that is already visible in the
   HTML; this file only adds the live behaviour.
   ========================================================= */
(function () {
  'use strict';
  const IC = window.IC || (window.IC = {});
  const U = IC.util;
  if (!U) return;
  const { $, $$, esc, reduced, touch } = U;
  const fine = window.matchMedia('(pointer: fine)').matches && !touch;
  const EASE = 'cubic-bezier(.16, 1, .3, 1)';

  /* ---------- small helpers ---------- */
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const parseISO = v => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const fmtDay = d => (d ? `${WEEK[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}` : '');
  const fmtShort = d => (d ? `${d.getDate()} ${MON[d.getMonth()]}` : '');
  const fmtRange = (a, b) => {
    if (!a) return '';
    if (!b || +b === +a) return fmtDay(a);
    if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()) return `${a.getDate()}–${b.getDate()} ${MON[a.getMonth()]} ${a.getFullYear()}`;
    return `${fmtShort(a)} – ${fmtShort(b)} ${b.getFullYear()}`;
  };
  const isoOf = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const ahead = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return isoOf(d); };
  const hashStr = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const onView = (el, cb, opts) => {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver(en => en.forEach(e => cb(e.isIntersecting)), opts || { threshold: .12 }).observe(el);
  };

  // Text that changes slides out and the new value slides in, so the eye catches what moved.
  const swapText = (el, text) => {
    if (!el) return;
    text = String(text);
    if ((el._t !== undefined ? el._t : el.textContent) === text) return;
    el._t = text;
    if (reduced || !el.animate) { el.textContent = text; return; }
    if (el._busy) return;
    el._busy = true;
    let done = false;
    const land = () => {
      if (done) return; done = true;
      el.textContent = el._t; el._busy = false;
      el.animate([{ opacity: 0, transform: 'translate3d(0, 45%, 0)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE });
    };
    const out = el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translate3d(0, -45%, 0)' }], { duration: 110, easing: 'ease-in', fill: 'forwards' });
    out.onfinish = () => { land(); out.cancel(); };
    setTimeout(land, 180);   // a throttled tab may never report the end of the animation
  };

  // Split-flap letters, like a departures board: each cell riffles, then lands.
  const FLAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const flapTo = (box, word) => {
    const cells = $$('i', box);
    const w = String(word || '').toUpperCase().padEnd(cells.length, '·').slice(0, cells.length);
    cells.forEach((c, k) => {
      const target = w[k];
      if (c._v === target) return;
      c._v = target;
      clearInterval(c._iv);
      if (reduced) { c.textContent = target; return; }
      let n = 0; const turns = 4 + k * 3;
      c._iv = setInterval(() => {
        if (++n >= turns) { clearInterval(c._iv); c.textContent = target; c.classList.remove('land'); void c.offsetWidth; c.classList.add('land'); return; }
        c.textContent = FLAP[(Math.random() * 26) | 0];
      }, 42);
    });
  };

  // A document on the table: it leans toward the pointer.
  const tilt = (host, el, max) => {
    if (!fine || reduced || !host || !el) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const apply = () => {
      raf = 0; cx += (tx - cx) * .12; cy += (ty - cy) * .12;
      el.style.setProperty('--rx', (cy * max).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (cx * max).toFixed(2) + 'deg');
      if (Math.abs(tx - cx) > .003 || Math.abs(ty - cy) > .003) raf = requestAnimationFrame(apply);
    };
    host.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - .5) * 2; ty = -((e.clientY - r.top) / r.height - .5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    host.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });
  };

  const SVG = {
    person: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="7.5" r="3.6"/><path d="M4.8 20.2c.6-4 3.5-6.4 7.2-6.4s6.6 2.4 7.2 6.4c.1.5-.3.8-.8.8H5.6c-.5 0-.9-.3-.8-.8Z"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19V7"/><path d="M3 14h18v5"/><path d="M21 14v-2.5A3.5 3.5 0 0 0 17.5 8H11v6"/><circle cx="7" cy="11" r="2"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 14.6A8.5 8.5 0 0 1 9.4 3.6a.6.6 0 0 0-.8-.7 9.5 9.5 0 1 0 12.5 12.5.6.6 0 0 0-.7-.8Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'
  };
  const iconRow = (box, n, svg, max) => {
    if (!box) return;
    n = Math.max(0, n | 0);
    const shown = Math.min(n, max), more = n - shown;
    const have = box.querySelectorAll('i').length;
    if (have === shown && box.dataset.more === String(more)) return;
    box.dataset.more = String(more);
    box.innerHTML = Array.from({ length: shown }, (_, k) => `<i style="--k:${k}">${svg}</i>`).join('') + (more > 0 ? `<b>+${more}</b>` : '');
    if (!reduced) $$('i', box).forEach((el, k) => { if (k >= have) el.animate([{ opacity: 0, transform: 'scale(.3) translate3d(0, 6px, 0)' }, { opacity: 1, transform: 'none' }], { duration: 380, delay: (k - have) * 45, easing: EASE, fill: 'backwards' }); });
  };

  /* =========================================================
     Service pages: the live travel document
     ========================================================= */
  const EXAMPLES = {
    transport: () => ({ vehicle: 'Van', pickup: 'Mactan-Cebu International Airport', route: 'Cebu City → Oslob → Moalboal', date: ahead(24), days: '1 day' }),
    hotel: () => ({ destination: 'Anda, Bohol', checkin: ahead(30), checkout: ahead(33), rooms: '2', guests: '4' }),
    flights: () => ({ trip: 'Round trip', from: 'Manila', to: 'Da Nang', depart: ahead(35), return: ahead(40), pax: '2', cabin: 'Economy' }),
    mice: () => ({ event: 'Seminar', epax: '120', estart: ahead(45), eend: ahead(46), venue: 'Cebu City', needs: ['Venue', 'Accommodation', 'Meals'] })
  };

  const readForm = form => {
    const o = {};
    new FormData(form).forEach((v, k) => {
      if (k === 'service' || k === 'page') return;
      if (k === 'needs') (o.needs = o.needs || []).push(v); else if (v !== '') o[k] = v;
    });
    return o;
  };

  /* ---- Car rental: a trip ticket with the vehicle and the route drawn out ---- */
  const VEH = { '4-Seater': 'seater', Van: 'van', Coaster: 'coaster', Bus: 'bus' };
  function tripDoc(doc) {
    const vehs = $$('.veh', doc), base = $('.route-base', doc), ink = $('.route-ink', doc), stops = $('.route-stops', doc), car = $('.route-car', doc);
    if (!base) return { update() {} };
    const vb = base.ownerSVGElement.viewBox.baseVal, L = base.getTotalLength();
    ink.style.strokeDasharray = L; ink.style.strokeDashoffset = L;
    let lastVeh = null, lastStops = null, timer = 0;
    const pt = t => base.getPointAtLength(clamp(t, 0, 1) * L);
    const put = (el, t) => { const p = pt(t); el.style.left = (p.x / vb.width * 100).toFixed(2) + '%'; el.style.top = (p.y / vb.height * 100).toFixed(2) + '%'; };
    const setVeh = key => {
      if (key === lastVeh) return;
      lastVeh = key;
      vehs.forEach(el => {
        const on = el.dataset.veh === key;
        el.classList.toggle('on', on);
        if (on && !reduced) el.animate([{ transform: 'translate3d(-135%, 0, 0)', opacity: 0 }, { transform: 'translate3d(4%, 0, 0)', opacity: 1, offset: .72 }, { transform: 'none', opacity: 1 }], { duration: 950, easing: EASE });
      });
    };
    const split = (pickup, route) => {
      let list = String(route || '').split(/\s*(?:→|->|>|,|;|\s-\s|\bto\b)\s*/i).map(s => s.trim()).filter(Boolean);
      if (pickup && !(list[0] && list[0].toLowerCase() === pickup.toLowerCase())) list.unshift(pickup);
      if (list.length > 6) list = list.slice(0, 5).concat(list[list.length - 1]);
      return list;
    };
    const draw = list => {
      stops.innerHTML = list.map((n, k) => `<span class="stop${k === 0 ? ' start' : ''}${k === list.length - 1 && k ? ' end' : ''}" style="--k:${k}"><i></i><em>${esc(n)}</em></span>`).join('');
      // each label sits on the outside of the curve, so neighbours never collide
      $$('.stop', stops).forEach((s, k) => { const t = list.length < 2 ? 0 : k / (list.length - 1); put(s, t); s.classList.toggle('below', pt(t).y > vb.height * .52); });
      if (reduced) { ink.style.strokeDashoffset = 0; put(car, 1); return; }
      ink.getAnimations().forEach(a => a.cancel());
      ink.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 1600, easing: 'cubic-bezier(.45, 0, .2, 1)', fill: 'forwards' });
      const t0 = performance.now(), dur = 1600;
      cancelAnimationFrame(car._raf);
      const step = now => {
        const k = clamp((now - t0) / dur, 0, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        put(car, e);
        const a = pt(e), b = pt(Math.min(1, e + .01));
        car.style.setProperty('--a', (Math.atan2(b.y - a.y, b.x - a.x) * 57.2958).toFixed(1) + 'deg');
        if (k < 1) car._raf = requestAnimationFrame(step);
      };
      car._raf = requestAnimationFrame(step);
    };
    return {
      update(v, changed) {
        setVeh(VEH[v.vehicle] || (v.vehicle ? 'any' : 'none'));
        swapText($('[data-out="vehicle"]', doc), !v.vehicle ? 'Choose a vehicle' : /^not/i.test(v.vehicle) ? 'We advise the vehicle' : v.vehicle);
        swapText($('[data-out="pickup"]', doc), v.pickup || 'Your pick-up point');
        swapText($('[data-out="date"]', doc), fmtDay(parseISO(v.date)) || 'Your date');
        swapText($('[data-out="days"]', doc), v.days || 'Transfer or day trip');
        const list = split(v.pickup, v.route), key = list.join('|');
        if (key !== lastStops) {
          lastStops = key; clearTimeout(timer);
          timer = setTimeout(() => draw(list.length ? list : ['Pick-up', 'Drop-off']), changed === 'route' || changed === 'pickup' ? 500 : 0);
        }
      }
    };
  }

  /* ---- Hotel booking: a stay voucher; the photo (and the hero) follow the island ---- */
  const DEST = [
    { key: 'panglao', re: /panglao|alona/i, img: 'svc-stay-panglao' },
    { key: 'anda', re: /\banda\b/i, img: 'svc-stay-anda' },
    { key: 'bohol', re: /bohol|tagbilaran|loboc|chocolate/i, img: 'dest-bohol' },
    { key: 'camotes', re: /camotes|mangodlong|santiago bay|tudela|san francisco/i, img: 'dest-camotes-sunset' },
    { key: 'boracay', re: /boracay|caticlan|malay/i, img: 'dest-boracay' },
    { key: 'elnido', re: /el ?nido|palawan|puerto princesa/i, img: 'dest-palawan' },
    { key: 'coron', re: /coron|busuanga/i, img: 'dest-coron' },
    { key: 'moalboal', re: /moalboal|oslob|badian/i, img: 'dest-moalboal' },
    { key: 'cebu', re: /cebu|mactan|lapu|talisay/i, img: 'dest-cebu' },
    { key: 'danang', re: /da ?nang|hoi ?an/i, img: 'dest-danang' },
    { key: 'halong', re: /ha ?long|hanoi|sapa/i, img: 'dest-halong' },
    { key: 'shanghai', re: /shanghai/i, img: 'dest-shanghai' },
    { key: 'yunnan', re: /yunnan|kunming|dali|lijiang/i, img: 'dest-yunnan' },
    { key: 'japan', re: /japan|tokyo|fuji|yokohama/i, img: 'dest-fuji' }
  ];
  const destOf = text => (text ? DEST.find(d => d.re.test(text)) || null : null);
  function stayDoc(doc) {
    const img = $('.stay-photo img', doc), hero = doc.closest('.svc-hero'), scenes = hero ? $$('.ph-scene', hero) : [];
    let lastKey, lastNights = -1;
    return {
      update(v) {
        const d = destOf(v.destination), key = d ? d.key : '';
        swapText($('[data-out="destination"]', doc), v.destination || 'Your island or resort');
        if (key !== lastKey) {
          lastKey = key;
          const src = `assets/img/hero/${d ? d.img : 'svc-stay-anda'}-960.webp`;
          if (img && img.getAttribute('src') !== src) {
            img.classList.add('swap');
            const im = new Image();
            im.onload = () => { img.src = src; requestAnimationFrame(() => img.classList.remove('swap')); };
            im.src = src;
          }
          if (d && IC.pageHero) { const i = scenes.findIndex(s => s.dataset.dest === d.key); if (i > -1) IC.pageHero.show(i); }
        }
        const a = parseISO(v.checkin), b = parseISO(v.checkout), n = a && b && b > a ? Math.round((b - a) / 864e5) : 0;
        swapText($('[data-out="checkin"]', doc), fmtDay(a) || 'Check-in date');
        swapText($('[data-out="checkout"]', doc), fmtDay(b) || 'Check-out date');
        if (n !== lastNights) {
          lastNights = n;
          iconRow($('[data-out="moons"]', doc), n, SVG.moon, 10);
          swapText($('[data-out="nights"]', doc), n ? `${n} night${n > 1 ? 's' : ''}` : 'Pick your dates');
        }
        const rooms = parseInt(v.rooms, 10) || 0, guests = parseInt(v.guests, 10) || 0;
        swapText($('[data-out="rooms"]', doc), rooms || '–'); iconRow($('[data-out="roomIcons"]', doc), rooms, SVG.bed, 6);
        swapText($('[data-out="guests"]', doc), guests || '–'); iconRow($('[data-out="guestIcons"]', doc), guests, SVG.person, 8);
        doc.classList.toggle('has-key', n > 0);
      }
    };
  }

  /* ---- Ticketing: a boarding pass with a departures-board route ---- */
  const AIRPORTS = [
    ['Puerto Princesa', 'PPS'], ['General Santos', 'GES'], ['Cagayan de Oro', 'CGY'], ['Kuala Lumpur', 'KUL'], ['Ho Chi Minh', 'SGN'], ['Hong Kong', 'HKG'],
    ['Tagbilaran', 'TAG'], ['Dumaguete', 'DGT'], ['Zamboanga', 'ZAM'], ['Singapore', 'SIN'], ['Busuanga', 'USU'], ['Caticlan', 'MPH'], ['Shanghai', 'SHA'],
    ['Da Nang', 'DAD'], ['Danang', 'DAD'], ['El Nido', 'ENI'], ['Boracay', 'MPH'], ['Tacloban', 'TAC'], ['Bacolod', 'BCD'], ['Siargao', 'IAO'], ['Panglao', 'TAG'],
    ['Kunming', 'KMG'], ['Bangkok', 'BKK'], ['Jakarta', 'JKT'], ['Saigon', 'SGN'], ['Iloilo', 'ILO'], ['Kalibo', 'KLO'], ['Manila', 'MNL'], ['Mactan', 'CEB'],
    ['Taipei', 'TPE'], ['Tokyo', 'TYO'], ['Osaka', 'OSA'], ['Seoul', 'SEL'], ['Busan', 'PUS'], ['Hanoi', 'HAN'], ['Macau', 'MFM'], ['Dubai', 'DXB'], ['Davao', 'DVO'],
    ['Clark', 'CRK'], ['Coron', 'USU'], ['Bohol', 'TAG'], ['Cebu', 'CEB'], ['Doha', 'DOH'], ['Bali', 'DPS']
  ];
  const codeOf = text => {
    if (!text) return '';
    const t = text.toLowerCase();
    const hit = AIRPORTS.find(([n]) => t.includes(n.toLowerCase()));
    if (hit) return hit[1];
    const m = /\b([A-Za-z]{3})\b/.exec(text.trim());
    return m && text.trim().length === 3 ? m[1].toUpperCase() : '';
  };
  function passDoc(doc) {
    const arc = $('.pass-arc path.arc', doc), plane = $('.pass-plane', doc), bars = $('.barcode', doc);
    const L = arc ? arc.getTotalLength() : 0;
    let lastLeg = '';
    const fly = () => {
      if (!arc || !plane) return;
      const vb = arc.ownerSVGElement.viewBox.baseVal;
      const put = t => {
        const p = arc.getPointAtLength(t * L), q = arc.getPointAtLength(Math.min(L, t * L + 1));
        plane.style.left = (p.x / vb.width * 100).toFixed(2) + '%'; plane.style.top = (p.y / vb.height * 100).toFixed(2) + '%';
        plane.style.setProperty('--a', (Math.atan2(q.y - p.y, q.x - p.x) * 57.2958).toFixed(1) + 'deg');
      };
      arc.style.strokeDasharray = `${L}`;
      if (reduced) { arc.style.strokeDashoffset = 0; put(.5); return; }
      arc.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 1300, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' });
      const t0 = performance.now(), dur = 1300;
      cancelAnimationFrame(plane._raf);
      const step = now => { const k = clamp((now - t0) / dur, 0, 1); put(.08 + .84 * (1 - Math.pow(1 - k, 3))); if (k < 1) plane._raf = requestAnimationFrame(step); };
      plane._raf = requestAnimationFrame(step);
    };
    const barcode = seed => {
      if (!bars) return;
      let h = hashStr(seed), html = '';
      for (let k = 0; k < 34; k++) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; html += `<i style="--w:${1 + (h % 3)}"></i>`; }
      bars.innerHTML = html;
    };
    return {
      update(v) {
        const from = codeOf(v.from), to = codeOf(v.to);
        flapTo($('[data-out="fromCode"]', doc), from || '···');
        flapTo($('[data-out="toCode"]', doc), to || '···');
        swapText($('[data-out="fromCity"]', doc), v.from || 'Where from');
        swapText($('[data-out="toCity"]', doc), v.to || 'Where to');
        const trip = v.trip || 'Round trip';
        swapText($('[data-out="trip"]', doc), trip);
        doc.classList.toggle('one-way', trip === 'One way');
        doc.classList.toggle('multi', trip === 'Multi-city');
        swapText($('[data-out="depart"]', doc), fmtDay(parseISO(v.depart)) || 'Departure date');
        swapText($('[data-out="return"]', doc), fmtDay(parseISO(v.return)) || 'Return date');
        const pax = parseInt(v.pax, 10) || 0;
        swapText($('[data-out="pax"]', doc), pax ? `${pax} passenger${pax > 1 ? 's' : ''}` : 'Passengers');
        iconRow($('[data-out="paxIcons"]', doc), pax, SVG.person, 9);
        swapText($('[data-out="cabin"]', doc), v.cabin || 'Economy');
        swapText($('[data-out="stubLeg"]', doc), `${from || '···'} → ${to || '···'}`);
        const leg = `${from}>${to}>${trip}`;
        if (leg !== lastLeg) { lastLeg = leg; if (from && to) fly(); barcode(leg + v.depart); }
      }
    };
  }

  /* ---- MICE: an event badge swinging on its lanyard, with the hall filling up ---- */
  const NEEDS = ['Venue', 'Accommodation', 'Participant transport', 'Meals', 'Tickets / flights', 'Tour for participants'];
  function badgeDoc(doc) {
    const card = $('.badge-card', doc), seats = $('.seat-map', doc), legend = $('[data-out="seatNote"]', doc);
    const SEATS = 96;
    if (seats && !seats.children.length) seats.innerHTML = Array.from({ length: SEATS }, (_, k) => `<i style="--k:${k}"></i>`).join('');
    const dots = seats ? $$('i', seats) : [];
    // a little spring: pointer movement and every change nudge the badge
    let ang = 0, vel = 0, raf = 0;
    const tick = () => {
      raf = 0; vel += -ang * .045; vel *= .92; ang += vel;
      card.style.setProperty('--swing', ang.toFixed(2) + 'deg');
      if (Math.abs(ang) > .03 || Math.abs(vel) > .03) raf = requestAnimationFrame(tick); else { ang = vel = 0; card.style.setProperty('--swing', '0deg'); }
    };
    const kick = f => { if (reduced || !card) return; vel += f; if (!raf) raf = requestAnimationFrame(tick); };
    if (fine && !reduced) doc.parentElement.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') kick(clamp((e.movementX || 0) * .025, -.8, .8)); });
    let lastFill = -1, lastType = '';
    return {
      intro() { if (!reduced && card) { card.animate([{ transform: 'translate3d(0, -60%, 0) rotate(-8deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 900, easing: EASE }); setTimeout(() => kick(2.6), 650); } },
      update(v, changed) {
        const type = v.event || 'Your event';
        swapText($('[data-out="event"]', doc), type);
        if (type !== lastType) { lastType = type; kick(1.6); }
        const a = parseISO(v.estart), b = parseISO(v.eend);
        swapText($('[data-out="dates"]', doc), fmtRange(a, b && a && b >= a ? b : null) || 'Dates to follow');
        swapText($('[data-out="venue"]', doc), v.venue || 'Venue or city');
        const pax = parseInt(v.epax, 10) || 0;
        swapText($('[data-out="epax"]', doc), pax ? pax.toLocaleString('en-PH') : '–');
        const per = pax > SEATS ? Math.ceil(pax / SEATS) : 1, fill = Math.min(SEATS, Math.ceil(pax / per));
        if (legend) swapText(legend, pax ? (per > 1 ? `1 seat = ${per} participants` : '1 seat = 1 participant') : 'Tell us how many');
        if (fill !== lastFill) {
          const prev = Math.max(0, lastFill); lastFill = fill;
          dots.forEach((d, k) => d.classList.toggle('on', k < fill));
          if (!reduced) dots.slice(prev, fill).forEach((d, k) => d.animate([{ transform: 'scale(.2)', opacity: .2 }, { transform: 'none', opacity: 1 }], { duration: 340, delay: Math.min(k, 60) * 9, easing: EASE, fill: 'backwards' }));
        }
        const needs = v.needs || [];
        $$('[data-need]', doc).forEach(el => el.classList.toggle('on', needs.includes(el.dataset.need)));
        if (changed === 'needs' || changed === 'epax') kick(.9);
      }
    };
  }

  const DOCS = { transport: tripDoc, hotel: stayDoc, flights: passDoc, mice: badgeDoc };

  // One sentence and a short list per service, for the storyboard's chat and quotation scenes.
  const SUMMARY = {
    transport: v => ({
      ask: `Hi! ${v.vehicle && !/^not/i.test(v.vehicle) ? `A ${v.vehicle.toLowerCase()}` : 'A vehicle'} with driver${v.pickup ? ` from ${v.pickup}` : ''}${v.date ? ` on ${fmtShort(parseISO(v.date))}` : ''}${v.route ? `, route ${v.route}` : ''}. How much?`,
      lines: [['Service', 'Car rental with driver'], ['Vehicle', v.vehicle || 'To advise'], ['Pick-up', v.pickup || 'To confirm'], ['Date', fmtDay(parseISO(v.date)) || 'To confirm'], ['Duration', v.days || 'To confirm']]
    }),
    hotel: v => {
      const a = parseISO(v.checkin), b = parseISO(v.checkout), n = a && b && b > a ? Math.round((b - a) / 864e5) : 0;
      return {
        ask: `Hi! ${v.rooms ? `${v.rooms} room${v.rooms > 1 ? 's' : ''}` : 'A room'} for ${v.guests || 'our group'} in ${v.destination || 'Bohol'}${n ? `, ${n} night${n > 1 ? 's' : ''} from ${fmtShort(a)}` : ''}. Is it available?`,
        lines: [['Service', 'Hotel booking'], ['Where', v.destination || 'To confirm'], ['Dates', a && b ? fmtRange(a, b) : 'To confirm'], ['Rooms', v.rooms || 'To confirm'], ['Guests', v.guests || 'To confirm']]
      };
    },
    flights: v => ({
      ask: `Hi! ${v.trip || 'Round trip'} ${v.from || 'Cebu'} to ${v.to || 'Da Nang'}${v.depart ? ` on ${fmtShort(parseISO(v.depart))}` : ''} for ${v.pax || 'our group'}. What are the fare options?`,
      lines: [['Service', 'Ticketing'], ['Route', `${v.from || '…'} → ${v.to || '…'}`], ['Trip', v.trip || 'Round trip'], ['Depart', fmtDay(parseISO(v.depart)) || 'To confirm'], ['Passengers', v.pax || 'To confirm']]
    }),
    mice: v => ({
      ask: `Hi! We're planning a ${String(v.event || 'seminar').toLowerCase()} for ${v.epax || 'our'} participants${v.venue ? ` in ${v.venue}` : ''}${v.estart ? ` on ${fmtShort(parseISO(v.estart))}` : ''}. Can you help?`,
      lines: [['Event', v.event || 'To confirm'], ['Participants', v.epax || 'To confirm'], ['Dates', fmtRange(parseISO(v.estart), parseISO(v.eend)) || 'To confirm'], ['Venue', v.venue || 'To confirm'], ['Arrange', (v.needs && v.needs.length) ? v.needs.join(', ') : 'To confirm']]
    })
  };

  function initServiceHero() {
    const form = $('[data-svc-form]'), doc = $('[data-doc]');
    if (!form || !doc) return;
    const kind = doc.dataset.doc, api = (DOCS[kind] || (() => ({ update() {} })))(doc, form);
    const example = EXAMPLES[kind] ? EXAMPLES[kind]() : {};
    let last = null;
    const render = changed => {
      const mine = readForm(form), used = Object.keys(mine).length > 0;
      const v = used ? mine : example;
      doc.classList.toggle('is-example', !used);
      api.update(v, changed);
      const s = SUMMARY[kind] ? SUMMARY[kind](v) : null;
      if (s) {
        $$('[data-sb="ask"]').forEach(el => { el.textContent = s.ask; });
        $$('[data-sb="lines"]').forEach(ul => { ul.innerHTML = s.lines.map(([k, val]) => `<li><span>${esc(k)}</span><b>${esc(val)}</b></li>`).join(''); });
      }
      // single values the storyboard scenes repeat (pick-up point, check-in day, route, event)
      const f = Object.assign({}, v, { checkinFmt: fmtDay(parseISO(v.checkin)), dateFmt: fmtDay(parseISO(v.date)), departFmt: fmtDay(parseISO(v.depart)) });
      $$('[data-sb-field]').forEach(el => { el.textContent = f[el.dataset.sbField] || el.dataset.sbEmpty || ''; });
      last = v;
      IC.svcValues = v;
      document.dispatchEvent(new CustomEvent('svc:change', { detail: { v, changed } }));
    };
    form.addEventListener('input', e => render(e.target.name));
    form.addEventListener('change', e => render(e.target.name));

    // steppers (rooms, guests, passengers)
    $$('.stepper', form).forEach(st => {
      const input = $('input', st);
      $$('button[data-step]', st).forEach(b => b.addEventListener('click', () => {
        const min = +input.min || 0, max = +input.max || 999, cur = parseInt(input.value || input.placeholder || min, 10);
        input.value = clamp(cur + (+b.dataset.step), Math.max(1, min), max);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }));
    });
    // a range slider that drives a number field (participants)
    $$('input[type="range"][data-sync]', form).forEach(r => {
      const target = form.elements[r.dataset.sync];
      r.addEventListener('input', () => { target.value = r.value; target.dispatchEvent(new Event('input', { bubbles: true })); });
      target.addEventListener('input', () => { if (target.value) r.value = clamp(+target.value, +r.min, +r.max); });
    });
    // the return date and the "other legs" note only apply to some trip types
    const toggleWhen = () => {
      $$('[data-when]', form).forEach(el => {
        const ctl = form.elements[el.dataset.whenField || 'trip'];
        const val = ctl ? (ctl.value || (ctl.length ? '' : '')) : '';
        const on = el.dataset.when.split('|').includes(val || el.dataset.whenDefault || '');
        el.hidden = !on;
        $$('input, select, textarea', el).forEach(i => { i.disabled = !on; });
      });
    };
    form.addEventListener('change', toggleWhen); toggleWhen();
    // swap origin and destination
    const swap = $('[data-swap]', form);
    if (swap) swap.addEventListener('click', () => {
      const a = form.elements.from, b = form.elements.to; [a.value, b.value] = [b.value, a.value];
      swap.classList.remove('spin'); void swap.offsetWidth; swap.classList.add('spin');
      render('from');
    });
    // check-out can't come before check-in, return can't come before departure
    const pairDates = (a, b) => {
      const x = form.elements[a], y = form.elements[b]; if (!x || !y) return;
      const today = ahead(0); x.min = today; y.min = today;
      x.addEventListener('change', () => { if (x.value) { y.min = x.value; if (y.value && y.value < x.value) y.value = x.value; } });
    };
    pairDates('checkin', 'checkout'); pairDates('depart', 'return'); pairDates('estart', 'eend');
    if (form.elements.date) form.elements.date.min = ahead(0);

    form.addEventListener('submit', () => {
      // empty fields are left out of the link, so the inquiry page only fills what was given
      $$('input, select, textarea', form).forEach(el => { if (!el.value && el.name && el.type !== 'hidden') el.disabled = true; });
      setTimeout(() => $$('input, select, textarea', form).forEach(el => { el.disabled = false; }), 0);
    });

    render(null);
    const wrap = doc.closest('.svc-doc-wrap');
    tilt(wrap, doc, 6);
    if (api.intro) api.intro();
    else if (!reduced) doc.animate([{ opacity: 0, transform: 'translate3d(0, 34px, 0) rotate(3deg)', clipPath: 'inset(0 0 100% 0 round 18px)' }, { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0% 0 round 18px)' }], { duration: 1100, delay: 250, easing: EASE, fill: 'backwards' });
  }

  // Buttons elsewhere on the page that fill the hero form: data-fill='{"vehicle":"Van"}'
  function initFill() {
    const form = $('[data-svc-form]');
    if (!form) return;
    $$('[data-fill]').forEach(b => b.addEventListener('click', e => {
      e.preventDefault();
      let data = {};
      try { data = JSON.parse(b.dataset.fill); } catch (err) { return; }
      Object.keys(data).forEach(k => {
        const val = data[k];
        const els = $$(`[name="${k}"]`, form);
        els.forEach(el => {
          if (el.type === 'radio') el.checked = el.value === val;
          else if (el.type === 'checkbox') el.checked = [].concat(val).includes(el.value);
          else el.value = val;
        });
      });
      form.dispatchEvent(new Event('change', { bubbles: true }));
      const first = Object.keys(data)[0];
      form.dispatchEvent(new Event('input', { bubbles: true }));
      $$(`[name="${first}"]`, form).forEach(el => el.dispatchEvent(new Event('input', { bubbles: true })));
      const hero = form.closest('.svc-hero') || form;
      const top = hero.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
      const doc = $('[data-doc]');
      if (doc && !reduced) doc.animate([{ boxShadow: '0 0 0 0 rgba(255, 183, 48, .0)' }, { boxShadow: '0 0 0 10px rgba(255, 183, 48, .55)' }, { boxShadow: '0 0 0 0 rgba(255, 183, 48, 0)' }], { duration: 1200, delay: 450, easing: 'ease-out' });
    }));
  }

  /* =========================================================
     Journey storyboard: the stage follows the step you are reading
     ========================================================= */
  function initStoryboards() {
    $$('[data-storyboard]').forEach(sb => {
      const steps = $$('.sb-step', sb), scenes = $$('.sb-scene', sb), fill = $('.sb-progress i', sb);
      if (!steps.length || !scenes.length) return;
      let cur = -1;
      const show = n => {
        if (n === cur || n < 0) return;
        cur = n;
        scenes.forEach((s, k) => {
          const on = k === n;
          s.classList.toggle('is-on', on);
          if (on) { s.classList.remove('play'); void s.offsetWidth; s.classList.add('play'); }
        });
        steps.forEach((s, k) => { s.classList.toggle('is-on', k === n); s.classList.toggle('is-done', k < n); });
      };
      if ('IntersectionObserver' in window) {
        // on phones the stage sits on top of the screen, so a step counts as read lower down
        const narrow = window.matchMedia('(max-width: 900px)').matches;
        const io = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) show(steps.indexOf(e.target)); }), { rootMargin: narrow ? '-66% 0px -22% 0px' : '-42% 0px -48% 0px' });
        steps.forEach(s => io.observe(s));
      }
      // scenes pick up the visitor's own choices from the hero form
      const pick = v => $$('[data-pick]', sb).forEach(el => {
        const list = [].concat((v && v[el.dataset.pickField || 'vehicle']) || []);
        el.classList.toggle('pick', list.length ? list.includes(el.dataset.pick) : el.hasAttribute('data-pick-default'));
      });
      document.addEventListener('svc:change', e => pick(e.detail.v));
      pick(IC.svcValues);
      steps.forEach((s, k) => s.addEventListener('click', () => show(k)));
      show(0);
      if (fill) {
        let raf = 0, live = false;
        const upd = () => {
          raf = 0;
          const r = sb.getBoundingClientRect();
          const p = clamp((window.innerHeight * .55 - r.top) / Math.max(1, r.height - window.innerHeight * .4), 0, 1);
          fill.style.transform = `scaleY(${p.toFixed(3)})`;
        };
        onView(sb, v => { live = v; if (v) upd(); }, { threshold: 0 });
        window.addEventListener('scroll', () => { if (live && !raf) raf = requestAnimationFrame(upd); }, { passive: true });
      }
    });
  }

  /* =========================================================
     Service page sections
     ========================================================= */
  // Tabs that switch a large panel (vehicle line-up, event types)
  function initSwitchers() {
    $$('[data-switcher]').forEach(box => {
      const tabs = $$('[role="tab"]', box), panels = $$('[role="tabpanel"]', box);
      const select = (i, focus) => {
        tabs.forEach((t, k) => { const on = k === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
        panels.forEach((p, k) => {
          const on = k === i; p.hidden = !on;
          if (on && !reduced) { const art = $('.sw-art', p); if (art) art.animate([{ transform: 'translate3d(-18%, 0, 0)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 700, easing: EASE }); }
        });
        if (focus) tabs[i].focus();
      };
      tabs.forEach((t, k) => {
        t.addEventListener('click', () => select(k));
        t.addEventListener('keydown', e => {
          const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (d) { e.preventDefault(); select((k + d + tabs.length) % tabs.length, true); }
        });
      });
      select(Math.max(0, tabs.findIndex(t => t.getAttribute('aria-selected') === 'true')));
    });
  }

  // Package cards by id: data-related="queen-city,twin-city"
  function initRelated() {
    $$('[data-related]').forEach(grid => {
      if (!IC.tours) return;
      const ids = grid.dataset.related.split(',').map(s => s.trim());
      const list = ids.map(id => IC.tours.find(t => t.id === id)).filter(Boolean);
      grid.innerHTML = list.map((t, i) => U.tourCard(t, i)).join('');
    });
  }

  // Ticketing: the flights already inside our packages, as a departures board
  const LEG = { 'danang-6d4n': 'DAD', 'danang-5d3n': 'DAD', 'hanoi-sapa-halong-4d3n': 'HAN', 'shanghai-mini-kyoto-5d4n': 'SHA', 'charming-yunnan-8d7n': 'KMG', 'japan-tokyo-fuji-5d4n': 'TYO' };
  function initBoard() {
    const board = $('[data-board]');
    if (!board || !IC.tours) return;
    const rows = IC.tours.filter(t => LEG[t.id]).map(t => {
      const inc = (t.inclusions || []).join(' · ');
      const air = (t.inclusions || []).find(x => /airfare|charter/i.test(x)) || '';
      const carrier = /charter/i.test(air) ? 'Charter flight' : ((air.match(/(?:via|with)\s+([A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)*)/) || [])[1] || 'Scheduled flight');
      const kg = [...new Set((inc.match(/\d+\s?kg/gi) || []).map(x => x.replace(/\s/, ' ')))];
      const bag = kg.length ? kg.join(' + ') + (/hand carry only/i.test(inc) ? ' hand carry only' : '') : 'See package';
      const from = /cebu/i.test(t.departure || '') ? 'CEB' : 'MNL';
      const next = (t.travelDates || []).find(d => !U.isPastDate(d, t));
      const when = next ? `${next.d}${next.y && next.y !== t.year ? ' ' + next.y : ''}` : 'Ask us';
      return { t, from, to: LEG[t.id], carrier, bag, when };
    });
    board.innerHTML = rows.map((r, i) => `
      <a class="db-row" href="${U.pkgUrl(r.t)}" style="--i:${i}">
        <span class="db-leg"><span class="db-code">${r.from.split('').map(c => `<i>${c}</i>`).join('')}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span class="db-code" data-to="${r.to}">${r.to.split('').map(c => `<i>${c}</i>`).join('')}</span></span>
        <span class="db-pkg"><b>${esc(r.t.name)}</b><small>${esc(r.carrier)} · ${esc(r.bag)}</small></span>
        <span class="db-next"><small>Next departure</small><b>${esc(r.when)}</b></span>
        <span class="db-go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>
      </a>`).join('');
    // the codes riffle into place the first time the board is seen
    let seen = false;
    onView(board, v => {
      if (!v || seen) return; seen = true;
      if (reduced) return;
      $$('.db-code', board).forEach((c, k) => {
        const word = $$('i', c).map(i => i.textContent).join('');
        $$('i', c).forEach(i => { i._v = ''; i.textContent = '·'; });
        setTimeout(() => flapTo(c, word), 120 + k * 90);
      });
    }, { threshold: .25 });
  }

  // Hotel booking: destination tiles fill the form (and swing the hero to that island)
  // Car rental: route strips fill pick-up and route. Both use data-fill; this adds the
  // pressed state so the chosen tile stays marked.
  function initPressed() {
    const form = $('[data-svc-form]');
    if (!form) return;
    const groups = {};
    $$('[data-fill][data-group]').forEach(b => { (groups[b.dataset.group] = groups[b.dataset.group] || []).push(b); b.setAttribute('aria-pressed', 'false'); });
    Object.values(groups).forEach(list => list.forEach(b => b.addEventListener('click', () => list.forEach(x => x.setAttribute('aria-pressed', String(x === b))))));
  }

  /* =========================================================
     Boot
     ========================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    initServiceHero(); initFill(); initPressed(); initStoryboards(); initSwitchers(); initRelated(); initBoard();
    if (IC.pagesExtra) IC.pagesExtra.forEach(fn => { try { fn(U); } catch (e) { /* one section failing leaves the rest working */ } });
  });
})();
