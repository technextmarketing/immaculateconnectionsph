/* Home hero: which slide a visit opens on.
   Loaded right after the hero markup (not deferred) so the chosen photo and destination are in
   place before the first paint. The hero never moves on by itself (main.js, initTravelogue);
   each visit opens on a random slide, most often the 1st (45%) or the 2nd (35%), the other
   slides sharing the rest. main.js reads window.__tlStart. */
(function () {
  var hero = document.querySelector('.hero-tl');
  if (!hero) return;
  var scenes = hero.querySelectorAll('#tlRig .scene'), prints = hero.querySelectorAll('#tlDeck .print');
  var n = prints.length, L = scenes.length;
  if (!n || !L) return;
  var r = Math.random();
  var k = r < 0.45 ? 0 : r < 0.8 ? 1 : 2 + Math.floor((r - 0.8) / 0.2 * Math.max(1, n - 2));
  k = Math.min(Math.max(k, 0), n - 1);
  window.__tlStart = k;
  if (!k) return;   // the markup already shows the 1st slide

  var load = function (img) {
    if (!img || !img.getAttribute('data-src')) return;
    if (img.getAttribute('data-srcset')) { img.sizes = img.getAttribute('data-sizes') || img.sizes || ''; img.srcset = img.getAttribute('data-srcset'); img.removeAttribute('data-srcset'); }
    img.src = img.getAttribute('data-src'); img.removeAttribute('data-src');
  };
  // destination photo behind the pile
  var s = scenes[k % L];
  if (s !== scenes[0]) {
    var src = s.querySelector('source');
    if (src && src.getAttribute('data-srcset')) { src.srcset = src.getAttribute('data-srcset'); src.removeAttribute('data-srcset'); }
    var im = s.querySelector('img'); load(im); if (im) im.setAttribute('fetchpriority', 'high');
    scenes[0].classList.remove('is-on'); s.classList.add('is-on');
    var place = hero.querySelector('#tlPlace');
    if (place && s.getAttribute('data-place')) place.textContent = s.getAttribute('data-place');
  }
  // the pile: print k on top, the ones after it beneath (same depths as main.js layout())
  for (var d = 0; d < n; d++) {
    var p = prints[(k + d) % n];
    p.style.setProperty('--d', Math.min(d, 4));
    p.style.setProperty('--o', d < 4 ? 1 : 0);
    p.style.setProperty('--k', d < 4 ? 3 - d : -1);
    p.classList.toggle('is-top', d === 0);
    p.classList.toggle('deal', d > 0 && d < 4);
    if (d <= 1) load(p.querySelector('img'));
  }
})();
