/* ------------------------------------------------------------------
   Shared runtime for every page.
------------------------------------------------------------------- */
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } },
};
const html = (s) => { const t = document.createElement('template'); t.innerHTML = s.trim(); return t.content.firstElementChild; };
const imgSrc = (img, size) => fx(img.id, size);
const srcset = (img, sizes = [512, 1024, 2048]) => sizes.filter((s, i) => i === 0 || s / 2 < img.w).map((s) => `${fx(img.id, s)} ${Math.min(s, img.w)}w`).join(', ');

/* ---------------------------------------------------------------- frame loop */
const Loop = {
  fns: new Set(),
  add(fn) { this.fns.add(fn); return () => this.fns.delete(fn); },
  start() {
    const step = (time) => { this.fns.forEach((f) => f(time)); };
    if (window.gsap) gsap.ticker.add((t) => step(t * 1000));
    else { const r = (t) => { step(t); requestAnimationFrame(r); }; requestAnimationFrame(r); }
  },
};

/* ---------------------------------------------------------------- svg defs: ink boil */
function injectDefs() {
  const seeds = [3, 11, 23];
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${seeds.map((s, i) =>
    `<filter id="boil-${i}" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="2" seed="${s}"/><feDisplacementMap in="SourceGraphic" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>`).join('')}</defs></svg>`);
}
/** Boil only what's on screen; it's a repaint every 120ms. */
let boilIO;
function watchBoil(root = document) {
  if (RM) return;
  boilIO ||= new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '10% 30% 10% 30%' });
  $$('.boil', root).forEach((el, i) => { el.style.animationDelay = `${-(i % 3) * .12}s`; boilIO.observe(el); });
}

/* ---------------------------------------------------------------- doodles */
/** Keep doodle lines at a constant pen width whatever size the SVG renders at. */
let strokeRO;
function sizeStrokes(root = document) {
  strokeRO ||= new ResizeObserver((es) => es.forEach((e) => {
    const svg = e.target, w = e.contentRect.width;
    if (!w) return;
    const px = parseFloat(svg.dataset.px || getComputedStyle(svg).getPropertyValue('--pen') || 2.1) || 2.1;
    svg.style.setProperty('--sw', (px * (+svg.dataset.vbw || 100) / w).toFixed(3));
  }));
  $$('svg.dd', root).forEach((s) => strokeRO.observe(s));
}
/* Lines draw on like a pen (dash offset 1 → 0), fills pop in after. Driven by GSAP so
   timing is exact and it can be interrupted mid-stroke. */
const ddParts = (svg) => ({ strokes: $$('[pathLength]', svg), fills: $$('.af, .f', svg) });
function drawIn(svg, delay = 0) {
  if (!svg) return;
  if (!window.gsap || RM) { svg.classList.remove('pre', 'erase'); return; }
  const { strokes, fills } = ddParts(svg), st = +(svg.dataset.stagger || .06);
  svg.classList.add('js-draw');
  gsap.killTweensOf([...strokes, ...fills]);
  if (svg.classList.contains('pre')) { gsap.set(strokes, { strokeDashoffset: 1.001 }); gsap.set(fills, { opacity: 0 }); }
  svg.classList.remove('pre', 'erase');
  strokes.forEach((p) => {
    const dur = parseFloat(p.style.getPropertyValue('--dur')) || .7;
    gsap.to(p, { strokeDashoffset: 0, duration: dur, ease: 'power2.inOut', delay: delay + (+p.dataset.n || 0) * st });
  });
  fills.forEach((p) => gsap.to(p, { opacity: 1, duration: .45, ease: 'power2.out', delay: delay + .15 + (+p.dataset.n || 0) * st }));
}
function eraseOut(svg) {
  if (!svg) return;
  if (!window.gsap || RM) { svg.classList.add('pre'); return; }
  const { strokes, fills } = ddParts(svg);
  svg.classList.add('js-draw');
  gsap.killTweensOf([...strokes, ...fills]);
  gsap.to(strokes, { strokeDashoffset: 1.001, duration: .35, ease: 'power2.in' });
  gsap.to(fills, { opacity: 0, duration: .25, ease: 'power2.in' });
}

/* ---------------------------------------------------------------- smooth scroll */
let lenis = null;
function initLenis(opts = {}) {
  if (RM || !window.Lenis) return null;
  lenis = new Lenis({ lerp: .085, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4, ...opts });
  if (window.gsap) { gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  else { const r = (t) => { lenis.raf(t); requestAnimationFrame(r); }; requestAnimationFrame(r); }
  return lenis;
}
function scrollToY(y, opts = {}) {
  const { onComplete, ...rest } = opts;
  if (lenis) { lenis.scrollTo(y, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4), ...rest, onComplete: () => onComplete?.() }); return; }
  const now = RM || rest.immediate;
  window.scrollTo({ top: y, behavior: now ? 'auto' : 'smooth' });
  if (onComplete) setTimeout(onComplete, now ? 0 : 700);
}

/* ---------------------------------------------------------------- motion the visitor can pause */
const MOTION = { paused: false };
try { MOTION.paused = localStorage.getItem('bh-still') === '1'; } catch (e) { /* private mode */ }

/* ---------------------------------------------------------------- modal helpers */
/** Make everything except `keep` unreachable while an overlay is open. */
function setInert(on, keep = []) {
  [...document.body.children].forEach((el) => {
    if (keep.includes(el) || el.matches('script, svg, .grain, .cursor, .toast, .curtain')) return;
    if (on) { if (!el.inert) { el.inert = true; el.dataset.inerted = '1'; } }
    else if (el.dataset.inerted) { el.inert = false; delete el.dataset.inerted; }
  });
}

/* ---------------------------------------------------------------- sound (synthesised, off by default) */
const Sound = {
  on: false, ctx: null,
  ensure() {
    if (this.ctx) return;
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const c = (this.ctx = new C());
    this.out = c.createGain(); this.out.gain.value = .0001;
    const comp = c.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3;
    this.out.connect(comp).connect(c.destination);
    // a small room: decaying noise as the impulse response
    const len = c.sampleRate * 1.6, ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
    this.verb = c.createConvolver(); this.verb.buffer = ir;
    const wet = c.createGain(); wet.gain.value = .32; this.verb.connect(wet).connect(this.out);
    const nb = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    this.noise = nb;
    // the pencil: a bed of filtered noise whose level follows how fast the thread is being drawn
    const src = c.createBufferSource(); src.buffer = nb; src.loop = true;
    this.scrBP = c.createBiquadFilter(); this.scrBP.type = 'bandpass'; this.scrBP.frequency.value = 2800; this.scrBP.Q.value = 1.1;
    const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 900;
    this.scrG = c.createGain(); this.scrG.gain.value = 0;
    src.connect(this.scrBP).connect(hp).connect(this.scrG).connect(this.out); src.start();
  },
  set(v) {
    this.ensure(); if (!this.ctx) return;
    this.on = v; this.ctx.resume();
    this.out.gain.setTargetAtTime(v ? .85 : .0001, this.ctx.currentTime, .06);
    store.set('bh-sound', v ? '1' : '0');
  },
  _env(g, t, a, peak, d) { g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); },
  _voice(type, f, v, d, wet = .3, f2) {
    if (!this.on) return;
    const c = this.ctx, t = c.currentTime, o = c.createOscillator(), g = c.createGain(), lp = c.createBiquadFilter();
    o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d * .8);
    lp.type = 'lowpass'; lp.frequency.value = Math.min(9000, f * 5);
    this._env(g, t, .004, v, d);
    o.connect(lp).connect(g); g.connect(this.out);
    if (wet) { const s = c.createGain(); s.gain.value = wet; g.connect(s).connect(this.verb); }
    o.start(t); o.stop(t + d + .05);
  },
  tick(i = 0) { const n = [880, 988, 1175, 1319, 1568][i % 5]; this._voice('triangle', n, .045, .14, .2); },
  pop(v = .16) { this._voice('sine', 620, v, .11, .15, 170); },
  bell(i = 0, v = .07) {
    const n = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66][i % 7];
    this._voice('sine', n, v, 1.4, .6); this._voice('sine', n * 2.76, v * .25, .7, .6);
  },
  whoosh(dur = 1, v = .22) {
    if (!this.on) return;
    const c = this.ctx, t = c.currentTime, s = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; bp.type = 'bandpass'; bp.Q.value = 2.2;
    bp.frequency.setValueAtTime(320, t); bp.frequency.exponentialRampToValueAtTime(2600, t + dur * .7);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + dur * .45); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.connect(bp).connect(g).connect(this.out); const w = c.createGain(); w.gain.value = .5; g.connect(w).connect(this.verb);
    s.start(t); s.stop(t + dur + .05);
  },
  scratch(speed) {
    if (!this.on || !this.scrG) return;
    const t = this.ctx.currentTime, s = clamp(speed, 0, 1);
    this.scrG.gain.setTargetAtTime(s * .09, t, .05);
    this.scrBP.frequency.setTargetAtTime(2200 + s * 2200, t, .08);
  },
};

/* ---------------------------------------------------------------- toast */
let toastEl, toastT;
const ensureToast = () => (toastEl ||= document.body.appendChild(html('<div class="toast" role="status" aria-live="polite"></div>')));
function toast(msg) {
  ensureToast();
  toastEl.textContent = '';
  requestAnimationFrame(() => { toastEl.textContent = msg; toastEl.classList.add('show'); });
  clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2400);
}

/* ---------------------------------------------------------------- theme */
function initTheme() {
  const btns = $$('[data-theme-toggle]');
  // the light switch is a real switch for assistive tech too: "Paper theme, on / off"
  const label = () => btns.forEach((b) => b.setAttribute('aria-checked', String(document.documentElement.dataset.theme !== 'blue')));
  label();
  btns.forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.busy) return;
    const next = document.documentElement.dataset.theme === 'blue' ? 'paper' : 'blue';
    const apply = () => {
      const root = document.documentElement;
      root.classList.add('no-tx');
      if (next === 'paper') delete root.dataset.theme; else root.dataset.theme = next;
      b.classList.remove('to-blue', 'to-paper');
      void getComputedStyle(document.body).color; // flush styles while transitions are off
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('no-tx')));
      $('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(root).getPropertyValue('--paper').trim());
      store.set('bh-theme', next); label(); document.dispatchEvent(new CustomEvent('themechange'));
    };
    const spread = () => {
      delete b.dataset.busy;
      Sound.whoosh(.7, .14);
      const r = b.getBoundingClientRect();
      if (document.startViewTransition && !RM) {
        const root = document.documentElement;
        root.style.setProperty('--tx', `${r.left + r.width / 2}px`); root.style.setProperty('--ty', `${r.top + r.height / 2}px`);
        root.classList.add('theme-vt');
        const vt = document.startViewTransition(apply);
        vt.finished.finally(() => root.classList.remove('theme-vt'));
      } else apply();
    };
    // flip the lever first (click!), then let the new theme spread out from the switch
    b.dataset.busy = '1'; b.classList.add(`to-${next}`); Sound.pop(.06);
    setTimeout(spread, RM ? 0 : 230);
  }));
}

/* ---------------------------------------------------------------- nav */
function initNav() {
  // hand-drawn ring around the active link
  $$('.nav-links a').forEach((a) => a.insertAdjacentHTML('beforeend', doodle('ring', { cls: 'ring pre', stagger: 0 })));
  const sb = $('#sound-toggle');
  if (sb) {
    sb.setAttribute('aria-label', 'Sound');
    const sync = () => { sb.setAttribute('aria-pressed', String(Sound.on)); };
    sb.addEventListener('click', () => { Sound.set(!Sound.on); sync(); if (Sound.on) Sound.bell(2, .08); toast(Sound.on ? 'sound on ♪' : 'shh, sound off'); });
    sync();
  }
  const mb = $('.menu-btn'), sheet = $('.menu-sheet');
  if (mb && sheet) {
    sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-label', 'Menu');
    const set = (o) => {
      const was = sheet.classList.contains('open');
      sheet.classList.toggle('open', o); mb.setAttribute('aria-expanded', String(o)); mb.textContent = o ? 'close' : 'menu';
      document.documentElement.style.overflow = o ? 'hidden' : ''; o ? lenis?.stop() : lenis?.start();
      setInert(o, [sheet, $('.nav')]);
      if (o) requestAnimationFrame(() => $('a', sheet)?.focus({ preventScroll: true }));
      else if (was && (sheet.contains(document.activeElement) || document.activeElement === document.body)) mb.focus({ preventScroll: true });
    };
    mb.addEventListener('click', () => set(!sheet.classList.contains('open')));
    $$('a', sheet).forEach((a) => a.addEventListener('click', () => set(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && sheet.classList.contains('open')) set(false); });
  }
  const mt = $('#motion-toggle');
  const syncMotion = () => { document.documentElement.classList.toggle('still', MOTION.paused); mt?.setAttribute('aria-pressed', String(MOTION.paused)); };
  mt?.setAttribute('aria-label', 'Pause animations');
  mt?.addEventListener('click', () => {
    MOTION.paused = !MOTION.paused; store.set('bh-still', MOTION.paused ? '1' : '0'); syncMotion();
    document.dispatchEvent(new CustomEvent('motionchange')); toast(MOTION.paused ? 'animations paused' : 'animations back on');
  });
  syncMotion();
  $$('.nav-links a, .nav-logo').forEach((a, i) => a.addEventListener('pointerenter', () => Sound.tick(i)));
  // a soft paper backdrop once content scrolls under the nav (not on the horizontal wall)
  const nav = $('.nav');
  if (nav) {
    let solid = false;
    const check = () => {
      const s = scrollY > 24 && !document.documentElement.classList.contains('is-h');
      if (s !== solid) { solid = s; nav.classList.toggle('solid', s); }
    };
    addEventListener('scroll', check, { passive: true }); check();
  }
}
let activeNav = null;
function setActiveNav(key) {
  if (key === activeNav) return;
  activeNav = key;
  $$('.nav-links a').forEach((a) => {
    const on = a.dataset.nav === key, ring = $('.ring', a);
    if (on) { a.setAttribute('aria-current', 'location'); drawIn(ring); } else { a.removeAttribute('aria-current'); eraseOut(ring); }
  });
}

/* ---------------------------------------------------------------- cursor */
function initCursor() {
  if (!FINE || RM) return;
  document.documentElement.classList.add('has-cursor');
  const c = document.body.appendChild(html('<div class="cursor hidden" aria-hidden="true"><div class="cursor-ring"></div><div class="cursor-dot"></div><div class="cursor-label"></div></div>'));
  const label = $('.cursor-label', c);
  let x = -100, y = -100, tx = -100, ty = -100, seen = false;
  window.POINTER = { x: innerWidth / 2, y: innerHeight / 2, moved: false };
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY; POINTER.x = tx; POINTER.y = ty; POINTER.moved = true;
    if (!seen) { x = tx; y = ty; seen = true; }
  }, { passive: true });
  document.addEventListener('pointerleave', () => c.classList.add('hidden'));
  Loop.add(() => {
    x += (tx - x) * .3; y += (ty - y) * .3;
    c.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
  });
  const setState = (el) => {
    c.classList.remove('link', 'view', 'drag', 'pencil');
    const kind = el?.dataset.cursor;
    if (!kind || kind === 'hide') { c.classList.add('hidden'); return; }
    c.classList.remove('hidden');
    c.classList.add(kind);
    label.textContent = el.dataset.cursorLabel || (kind === 'view' ? 'Open' : kind === 'drag' ? 'Drag' : '');
  };
  document.addEventListener('pointerover', (e) => setState(e.target.closest('[data-cursor]')));
  addEventListener('pointerdown', () => c.querySelector('.cursor-dot').animate([{ scale: 1 }, { scale: .7 }, { scale: 1 }], { duration: 260, easing: 'ease-out', composite: 'add' }));
}
window.POINTER ||= { x: innerWidth / 2, y: innerHeight / 2, moved: false };
if (!FINE) addEventListener('pointermove', (e) => { POINTER.x = e.clientX; POINTER.y = e.clientY; POINTER.moved = true; }, { passive: true });

/* ---------------------------------------------------------------- eyes that follow you */
/** pupils: elements to move together; face: element whose centre is the gaze origin; max: px */
function lookAt(pupils, face, max = 6) {
  if (!pupils.length || !face) return;
  let cx = 0, cy = 0, blink = 1, nextBlink = performance.now() + 2500 + Math.random() * 3000, blinkT = 0;
  Loop.add((now) => {
    const r = face.getBoundingClientRect();
    if (r.right < -50 || r.left > innerWidth + 50 || r.bottom < 0 || r.top > innerHeight) return;
    const fx0 = r.left + r.width / 2, fy0 = r.top + r.height * .4;
    let dx = POINTER.x - fx0, dy = POINTER.y - fy0;
    const d = Math.hypot(dx, dy) || 1, k = Math.min(max, d * .04) / d;
    cx += (dx * k - cx) * .12; cy += (dy * k - cy) * .12;
    if (!RM && !MOTION.paused && now > nextBlink) { blinkT = now; nextBlink = now + 2800 + Math.random() * 4200; }
    const bt = (now - blinkT) / 160; blink = bt < 1 ? 1 - Math.sin(bt * Math.PI) * .9 : 1;
    const s = (pupils[0].dataset.unit || 'px');
    pupils.forEach((p) => {
      const m = +(p.dataset.scale || 1);
      p.style.transform = `translate(${(cx * m).toFixed(2)}${s},${(cy * m).toFixed(2)}${s}) scaleY(${blink.toFixed(3)})`;
    });
  });
}

/* ---------------------------------------------------------------- the cat that can't find the page */
/** Runs the "cat-look" doodle on the not-found pages: it blinks, looks left, looks right, gives up with
    a "?", then rests a few seconds before trying again. Stops with the pause button; under reduced
    motion it stays still, drawn with its "?" showing. */
function searchingCat(svg) {
  if (!svg || !window.gsap || RM) return;
  const head = $('.head', svg), eyes = $('.pupils', svg), ask = $('.ask', svg), tail = $('.tail path', svg);
  const neck = '51 52';
  gsap.set(ask, { opacity: 0, scale: 0, rotation: -14, svgOrigin: '83 20' });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 1.4, defaults: { ease: 'power2.inOut' } })
    .to(eyes, { scaleY: .1, svgOrigin: '51 37', duration: .08, yoyo: true, repeat: 1, ease: 'power1.inOut' })
    .to(head, { rotation: -9, svgOrigin: neck, duration: .6 })
    .to(eyes, { x: -2.6, duration: .45 }, '<')
    .to(head, { rotation: 7, svgOrigin: neck, duration: .8 }, '+=.7')
    .to(eyes, { x: 2.6, duration: .55 }, '<')
    .to(head, { rotation: 0, svgOrigin: neck, duration: .5 }, '+=.6')
    .to(eyes, { x: 0, y: -1.2, duration: .35 }, '<') // glances up at the "?"
    .to(ask, { opacity: 1, scale: 1, rotation: 0, duration: .5, ease: 'back.out(2.6)' }, '<.1')
    .to(ask, { opacity: 0, scale: .7, duration: .2, ease: 'power1.in' }, '+=1.5')
    .to(eyes, { y: 0, duration: .3 }, '<');
  const t0 = performance.now();
  Loop.add((now) => {
    if (MOTION.paused || !tail) return;
    const s = Math.sin((now - t0) * .0021);
    tail.setAttribute('d', `M70 100C${(76 + s * 3).toFixed(1)} 110 ${(80 + s * 9).toFixed(1)} 124 ${(76 + s * 15).toFixed(1)} 138`);
  });
  // paused: back to the resting pose at once; resumed: start the search again
  const sync = () => { if (MOTION.paused) tl.pause(0); else if (tl.paused()) tl.restart(true); };
  document.addEventListener('motionchange', sync); sync();
}

/* ---------------------------------------------------------------- sketch buttons */
function initSketchButtons(root = document) {
  $$('.sbtn', root).forEach((b, i) => {
    if (!$('.sb-edge', b)) b.insertAdjacentHTML('afterbegin', '<svg class="sb-edge" aria-hidden="true" focusable="false"><path/></svg>');
    const svg = $('.sb-edge', b), p = $('path', svg);
    new ResizeObserver(() => {
      const w = b.offsetWidth, h = b.offsetHeight;
      svg.setAttribute('viewBox', `-2 -2 ${w + 4} ${h + 4}`); p.setAttribute('d', sketchPill(w, h, i + 7));
    }).observe(b);
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`); b.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    b.addEventListener('pointerenter', () => Sound.tick(i + 2));
  });
}

/* ---------------------------------------------------------------- copy email */
function initCopy(root = document) {
  $$('[data-copy]', root).forEach((b) => b.addEventListener('click', async (e) => {
    e.preventDefault();
    const v = b.dataset.copy;
    try {
      await navigator.clipboard.writeText(v); toast('email copied, talk soon ✿'); Sound.pop();
      // the button answers where you clicked, too: "Copied ✓" for a moment
      b.classList.add('copied'); clearTimeout(b._copied); b._copied = setTimeout(() => b.classList.remove('copied'), 1800);
    }
    catch (err) { location.href = `mailto:${v}`; }
  }));
}

/* ---------------------------------------------------------------- lightbox */
function initLightbox(root = document) {
  let box, big, from, trigger, open = false;
  const close = () => {
    if (!open) return; open = false;
    const r = from.getBoundingClientRect();
    const a = big.animate([{ transform: big.style.transform }, { transform: `translate(${r.left}px,${r.top}px) scale(${r.width / big.offsetWidth})` }], { duration: RM ? 1 : 380, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
    box.classList.remove('show');
    a.onfinish = () => { box.classList.remove('open'); from.style.visibility = ''; big.remove(); lenis?.start(); };
    setInert(false);
    trigger?.focus({ preventScroll: true }); // back to whatever opened it
  };
  // images open from a .zoom button wrapping them (keyboard and pointer), or from the image itself
  root.addEventListener('click', (e) => {
    const t = e.target.closest('.zoom, img[data-zoom]');
    if (!t) return;
    e.preventDefault();
    openFrom(t.matches('img') ? t : $('img[data-zoom]', t));
  });
  function openFrom(t) {
    if (!t || open) return;
    trigger = t.closest('button, a, [tabindex]') || document.activeElement;
    box ||=document.body.appendChild(html('<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image preview"><button class="lb-close">close preview <span aria-hidden="true">✕</span></button></div>'));
    box.onclick = close;
    from = t; open = true;
    big = new Image(); big.alt = t.alt; big.src = t.dataset.zoom; big.decoding = 'async';
    const r = t.getBoundingClientRect();
    const ratio = r.width / r.height, maxW = innerWidth * .9, maxH = innerHeight * .86;
    let w = maxW, h = w / ratio; if (h > maxH) { h = maxH; w = h * ratio; }
    big.style.width = `${w}px`; big.style.height = `${h}px`;
    const tx = (innerWidth - w) / 2, ty = (innerHeight - h) / 2;
    big.style.transform = `translate(${tx}px,${ty}px)`;
    box.appendChild(big); box.classList.add('open'); requestAnimationFrame(() => box.classList.add('show'));
    t.style.visibility = 'hidden';
    big.animate([{ transform: `translate(${r.left}px,${r.top}px) scale(${r.width / w})` }, { transform: `translate(${tx}px,${ty}px)` }], { duration: RM ? 1 : 520, easing: 'cubic-bezier(.22,1,.36,1)' });
    lenis?.stop(); setInert(true, [box]); $('.lb-close', box).focus({ preventScroll: true });
    Sound.pop(.1);
  }
  window.zoomImage = openFrom;
  addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  addEventListener('wheel', () => open && close(), { passive: true });
}

/* ---------------------------------------------------------------- page transitions */
const XVT = 'onpagereveal' in window && CSS.supports('view-transition-name: a');
function initTransitions() {
  const cur = document.body.appendChild(html('<div class="curtain" aria-hidden="true"></div>'));
  if (store.sget('bh-curtain')) {
    store.sset('bh-curtain', '');
    cur.classList.add('instant');
    requestAnimationFrame(() => requestAnimationFrame(() => { cur.classList.remove('instant'); cur.classList.add('leave'); }));
  }
  if (XVT) return; // the browser morphs between pages for us (see @view-transition)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    e.preventDefault();
    cur.style.setProperty('--cx', `${e.clientX}px`); cur.style.setProperty('--cy', `${e.clientY}px`);
    cur.classList.remove('leave'); cur.classList.add('cover');
    store.sset('bh-curtain', '1');
    setTimeout(() => { location.href = url.href; }, RM ? 0 : 520);
  });
  addEventListener('pageshow', (e) => { if (e.persisted) { cur.classList.remove('cover', 'instant'); cur.classList.add('leave'); } });
}

/* ---------------------------------------------------------------- reveal on scroll (vertical pages) */
function onEnter(els, fn, opts = {}) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { fn(e.target); if (!opts.repeat) io.unobserve(e.target); }
  }), { rootMargin: opts.margin || '0px 0px -12% 0px', threshold: opts.threshold || 0 });
  els.forEach((el) => io.observe(el));
  return io;
}

/* ---------------------------------------------------------------- drawings as masks */
function applyArt(root = document) {
  $$('[data-art]', root).forEach((el) => {
    const u = `url("${el.dataset.art}")`;
    el.style.webkitMaskImage = u; el.style.maskImage = u;
  });
}

/* ---------------------------------------------------------------- boot */
function bootCommon() {
  applyArt();
  ensureToast();
  $$('a[target="_blank"]').forEach((a) => {
    const l = a.getAttribute('aria-label');
    if (l) { if (!/new tab/.test(l)) a.setAttribute('aria-label', `${l} (opens in a new tab)`); }
    else if (!$('.vh', a)) a.insertAdjacentHTML('beforeend', '<span class="vh"> (opens in a new tab)</span>');
  });
  $$('.arr').forEach((g) => g.setAttribute('aria-hidden', 'true'));
  injectDefs();
  document.body.insertAdjacentHTML('beforeend', '<div class="grain" aria-hidden="true"></div>');
  initTheme(); initNav(); initCursor(); initTransitions(); initSketchButtons(); initCopy(); initLightbox();
  sizeStrokes(); watchBoil();
  if (store.get('bh-sound') === '1') {
    // browsers need a gesture before audio can start
    const arm = () => { Sound.set(true); $('#sound-toggle')?.setAttribute('aria-pressed', 'true'); removeEventListener('pointerdown', arm); removeEventListener('keydown', arm); };
    addEventListener('pointerdown', arm); addEventListener('keydown', arm);
  }
  $$('.yr').forEach((e) => { e.textContent = new Date().getFullYear(); });
}
