/* ------------------------------------------------------------------
   Home: a walk along Bhoomie's wall.
   One red dot (the dot on her "i") unspools into a thread as you scroll.
   It hangs her work, gives the cat a seat, pins her polaroids, passes
   through her hands, and finally lights the spark in her hair.
------------------------------------------------------------------- */
(() => {
  const root = document.documentElement;
  const track = $('#track');
  const threadSvg = $('#thread'), threadPath = $('.thread-line'), nib = $('.nib'), nailsG = $('.nails');
  let H = false, vw = innerWidth, vh = innerHeight, maxS = 0, S = 0, prevS = 0;

  /* ================================================================ build content */
  const fillDoodles = (scope = document) => $$('[data-doodle]', scope).forEach((el) => {
    el.innerHTML = doodle(el.dataset.doodle, { pre: el.hasAttribute('data-pre') });
  });

  // ---- gallery wall: Bhoomie's drawing, cut into frames that can hang and swing
  const WALL = { ox: 109, oy: 199, W: 1400, H: 1068 };
  const FRAMES = [
    { k: 'mushroom', box: [145, 199, 439, 645], pv: [50, 3] },
    { k: 'smiley', box: [473, 238, 632, 483], pv: [50, 5] },
    { k: 'board', box: [655, 217, 1196, 664], pv: [51, 7], red: 1 },
    { k: 'cat', box: [1223, 226, 1509, 702], pv: [45.5, 2.4], red: 1 },
    { k: 'square', box: [109, 671, 480, 1030], pv: [50, 1.5], draw: 1 },
    { k: 'big', box: [524, 697, 972, 1267], pv: [50, 4], red: 1, live: 1 },
    { k: 'waves', box: [1009, 730, 1300, 971], pv: [50, 2], red: 1 },
    { k: 'pot', box: [1014, 1021, 1203, 1257], pv: [50, 2], red: 1 },
  ];
  const wall = $('.wall');
  wall.innerHTML = FRAMES.map((f) => {
    const [x0, y0, x1, y1] = f.box, P = (v, d) => (v / d * 100).toFixed(3) + '%';
    const live = f.live ? `<div class="wf-live boil" style="inset:13% 16% 17% 16%">${['research', 'systems', 'craft'].map((n) => doodle(n, { pre: true, cls: 'live-' + n, stagger: .09 })).join('')}<span class="wf-live-cap"></span></div>` : '';
    const draw = f.draw ? `<div class="wf-draw" style="inset:4.5%" data-cursor="pencil"><canvas></canvas><p class="hint">your turn,<br>draw something ✎</p><button class="clear" type="button" tabindex="-1">clear ✕</button></div>` : '';
    return `<div class="wf wf-${f.k}" style="left:${P(x0 - WALL.ox, WALL.W)};top:${P(y0 - WALL.oy, WALL.H)};width:${P(x1 - x0, WALL.W)};height:${P(y1 - y0, WALL.H)};--px:${f.pv[0]}%;--py:${f.pv[1]}%">
      <div class="wf-in"><span class="art boil" data-art="assets/art/wall-${f.k}-ink.png"></span>${f.red ? `<span class="art acc boil" data-art="assets/art/wall-${f.k}-red.png"></span>` : ''}${live}${draw}</div></div>`;
  }).join('');

  // ---- works
  const list = $('.works-list');
  list.innerHTML = PROJECTS.map((p, i) => `
    <article class="work" data-slug="${p.slug}" style="--ny:${i % 2 ? 18.5 : 14}vh" data-reveal>
      <i class="anc" data-anchor="nail"></i>
      <a class="work-link" href="project.html?p=${p.slug}" data-cursor="view" data-cursor-label="Open" aria-label="${p.title}: ${p.short}">
        <div class="work-swing">
          <svg class="work-string" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M23 100L50 1L77 100"/></svg>
          <div class="work-frame">
            <svg class="frame-edge dd pre" aria-hidden="true"><path pathLength="1" style="--dur:1.1s"/></svg>
            <div class="work-img">
              <img src="${fx(p.cover.id, 1024)}" srcset="${srcset(p.cover)}" sizes="(min-width: 900px) 34vw, 92vw" alt="${p.cover.alt || ''}" ${i > 1 ? 'loading="lazy"' : ''} decoding="async">
              ${p.coverAlt ? `<img class="alt" src="${fx(p.coverAlt.id, 1024)}" alt="" loading="lazy" decoding="async">` : ''}
              <span class="veil"></span>
            </div>
          </div>
        </div>
        <div class="work-meta">
          <span class="work-num">0${i + 1}</span>
          <h3 class="work-title serif">${p.title}${doodle('underline', { pre: true, cls: 'title-ul' })}</h3>
          <p class="work-short">${p.short}</p>
          <p class="work-tags">${[...p.tags, p.year].map((t) => `<span class="tag">${t}</span>`).join(' · ')}</p>
        </div>
      </a>
    </article>`).join('');
  $('.works-head sup').textContent = `(${String(PROJECTS.length).padStart(2, '0')})`;

  // ---- about
  const [hiP, outP] = $$('.about-p');
  const words = (el, text) => { el.innerHTML = text.split(' ').map((w) => `<span class="w">${w}</span>`).join(' '); };
  words(hiP, ABOUT.intro); words(outP, ABOUT.outside);
  const ROT = [-3, 2.6, -1.6, 3.2, -2.4, 1.8];
  $('.polaroids').innerHTML = ABOUT.polaroids.map((q, i) => `
    <div class="pola" style="--pl:${4 + i * 14.5}vw;--pt:${i % 2 ? 18.5 : 15.5}vh">
      <i class="anc" data-anchor="pin"></i>${i === ABOUT.polaroids.length - 1 ? '<i class="anc past" data-anchor="line"></i>' : ''}
      <span class="pola-swing" data-cursor="drag" data-cursor-label="Swing me">
        <span class="pola-clip" aria-hidden="true"><svg viewBox="0 0 16 40"><rect x="2" y="1" width="12" height="38" rx="3"/><path d="M8 5V35M2 21H14"/></svg></span>
        <span class="pola-card" style="--r:${ROT[i % ROT.length]}deg">
          <img src="${fx(q.img.id, 512)}" alt="${q.img.alt}" loading="lazy" decoding="async">
          <span class="pola-cap">${q.cap}</span>
          <span class="pola-date">${q.date}</span>
        </span>
      </span>
    </div>`).join('');
  $('.notes').innerHTML = ABOUT.notes.map((n) => `
    <article class="note" data-reveal><span class="tape"></span>${doodle(n.doodle, { pre: true })}<h3>${n.title}</h3><p>${n.body}</p></article>`).join('');
  // ---- vase of flowers
  const VASE = { W: 1600, H: 1428, flowers: [[362, 635, 543, 818], [386, 401, 652, 652], [570, 688, 775, 874], [603, 259, 943, 510], [736, 511, 1021, 759], [910, 302, 1177, 548], [1059, 548, 1235, 734]] };
  $('.vase').innerHTML = `<span class="art" data-art="assets/art/vase-ink.png"></span>` + VASE.flowers.map(([x0, y0, x1, y1], i) =>
    `<span class="vf" style="left:${x0 / VASE.W * 100}%;top:${y0 / VASE.H * 100}%;width:${(x1 - x0) / VASE.W * 100}%;height:${(y1 - y0) / VASE.H * 100}%"><span class="vf-in" style="position:absolute;inset:0;transform-origin:50% 92%"><span class="art acc" data-art="assets/art/vase-flower-${i}-petal.png"></span><span class="art" data-art="assets/art/vase-flower-${i}-dots.png"></span></span></span>`).join('');

  fillDoodles();
  $$('.pillar').forEach((p) => p.insertAdjacentHTML('beforeend', doodle('underline', { pre: true })));
  bootCommon();

  /* ================================================================ swing physics */
  class Swing {
    constructor(el, o = {}) { Object.assign(this, { el, a: 0, v: 0, k: o.k ?? .045, c: o.c ?? .055, lean: o.lean ?? 1, max: o.max ?? 14, drag: false, rest: true }); }
    step(wind) {
      if (this.drag) return;
      const tgt = clamp(wind * this.lean, -this.max, this.max);
      this.v += (tgt - this.a) * this.k; this.v *= 1 - this.c; this.a += this.v;
      if (Math.abs(this.a - tgt) < .003 && Math.abs(this.v) < .003) { if (!this.rest) { this.a = tgt; this.apply(); } this.rest = Math.abs(tgt) < .003; return; }
      this.rest = false; this.apply();
    }
    kick(v) { if (!RM) { this.v += v; this.rest = false; } }
    apply() { this.el.style.transform = `rotate(${this.a.toFixed(3)}deg)`; }
  }
  const swings = [];
  $$('.work-swing').forEach((el, i) => swings.push(new Swing(el, { k: .04 + (i % 3) * .006, c: .05, lean: .8, max: 9 })));
  $$('.wf-in').forEach((el, i) => {
    const s = new Swing(el, { k: .05 + (i % 4) * .008, c: .06, lean: .55, max: 8 });
    swings.push(s);
    el.parentElement.addEventListener('pointerenter', () => { s.kick((i % 2 ? 1 : -1) * 1.1); Sound.tick(i); });
  });
  const polaSwings = $$('.pola-swing').map((el, i) => new Swing(el, { k: .035 + (i % 3) * .005, c: .04, lean: 1.1, max: 40 }));
  swings.push(...polaSwings);

  // grab a polaroid and fling it (the photos don't open: they're keepsakes, not previews)
  polaSwings.forEach((s, i) => {
    const el = s.el, fig = el.parentElement;
    let startX = 0, startY = 0, moved = false, lastA = 0;
    const angleTo = (e) => {
      const r = fig.getBoundingClientRect();
      const px = r.left + r.width / 2, py = r.top;
      return clamp(Math.atan2(-(e.clientX - px), Math.max(10, e.clientY - py)) * 180 / Math.PI, -40, 40);
    };
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      startX = e.clientX; startY = e.clientY; moved = false; lastA = s.a;
      if (e.pointerType === 'touch') return; // fingers scroll the page
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      if (!moved && Math.hypot(e.clientX - startX, e.clientY - startY) > 5) { moved = true; s.drag = true; fig.classList.add('grab'); Sound.tick(i); }
      if (!moved) return;
      const a = angleTo(e); s.v = (a - lastA) * .6; lastA = a; s.a = a; s.apply();
    });
    const up = (e) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      el.releasePointerCapture(e.pointerId);
      fig.classList.remove('grab');
      if (moved) { s.drag = false; s.rest = false; Sound.pop(.08); }
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('pointerenter', () => s.kick(i % 2 ? .8 : -.8));
  });

  /* ================================================================ measuring */
  const trackPos = (el) => {
    let x = 0, y = 0, e = el;
    while (e && e !== track) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
    return { x, y };
  };
  let sections = [], reveals = [];

  /* ================================================================ the thread */
  const TH = { pts: [], cum: [], total: 0, lut: null, step: 4, nails: [], pins: [], seat: null, lastL: -1 };
  let nibR = 9; // the radius of the thread's ball of wool, set from the dot on the "i"
  let anchors = [];
  function yAt(x) {
    const A = anchors;
    if (x <= A[0].x) return A[0].y;
    if (x >= A[A.length - 1].x) return A[A.length - 1].y;
    let lo = 0, hi = A.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (A[m].x <= x) lo = m; else hi = m; }
    const a = A[lo], b = A[hi], f = (x - a.x) / ((b.x - a.x) || 1);
    let y = a.y + (b.y - a.y) * smoother(f);
    if (a.sag && b.sag) y += Math.min(vh * .035, (b.x - a.x) * .07) * Math.sin(Math.PI * f);
    if (!(a.flat && b.flat)) y += (1.5 * Math.sin(x * .013) + 1.1 * Math.sin(x * .031 + 1.7)) * Math.sin(Math.PI * f);
    return y;
  }
  const bez = (p0, p1, p2, p3, t) => { const u = 1 - t; return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]; };

  function buildThread() {
    const tt = $('.tittle'), tp = trackPos(tt);
    const S0 = [tp.x + tt.offsetWidth / 2, tp.y + tt.offsetHeight / 2];
    nibR = tt.offsetWidth / 2 * 1.7; // the ball of wool is drawn 1.7 dots wide, like the dot on the "i"
    const ball = $('svg', nib), size = (nibR * 2).toFixed(1), off = (-nibR).toFixed(1);
    if (ball) { ball.setAttribute('width', size); ball.setAttribute('height', size); ball.setAttribute('x', off); ball.setAttribute('y', off); }

    // route: every [data-anchor] in the track, in order along x
    anchors = []; TH.nails = []; TH.pins = []; TH.seat = null; TH.end = null;
    $$('[data-anchor]', track).forEach((el) => {
      const p = trackPos(el), kind = el.dataset.anchor;
      if (kind === 'seat') {
        const f = vw * (+el.dataset.flat || 70) / 1440;
        anchors.push({ x: p.x - f, y: p.y, flat: 1 }, { x: p.x + f, y: p.y, flat: 1 });
        TH.seat = { x: p.x, el: $('.cat') };
      } else {
        const a = { x: p.x, y: p.y, sag: kind === 'nail' || kind === 'pin' ? 1 : 0 };
        anchors.push(a);
        if (kind === 'nail') TH.nails.push({ x: p.x, y: p.y, swing: swings[TH.nails.length] });
        if (kind === 'pin') TH.pins.push({ x: p.x, y: p.y, el: el.parentElement, swing: polaSwings[TH.pins.length] });
        if (kind === 'end') TH.end = a;
      }
    });
    anchors.sort((a, b) => a.x - b.x);
    const loops = $$('[data-loop]', track).map((el) => ({ xc: trackPos(el).x, r: vh * (+el.dataset.loop) / 100 }));

    // the dot hops off the "i", over the "e", drops between name and wall, then runs right
    const name = $('.hero-name'), np = trackPos(name), wp = trackPos(wall);
    const nameR = np.x + name.offsetWidth * .98;
    const gx = Math.min((nameR + wp.x) / 2, wp.x - vw * .015);
    const G = [gx, vh * .64];
    const ex = gx + vw * .07, E = [ex, yAt(ex)];
    const pts = [];
    const A = [S0, [S0[0] + vw * .05, S0[1] - vh * .15], [gx + vw * .012, S0[1] - vh * .11], G];
    const B = [G, [gx, G[1] + (E[1] - G[1]) * .7], [gx + vw * .02, E[1]], E];
    for (let i = 0; i <= 60; i++) pts.push(bez(...A, i / 60));
    for (let i = 1; i <= 50; i++) pts.push(bez(...B, i / 50));
    const xEnd = TH.end ? TH.end.x : track.scrollWidth - vw * .3;
    for (let x0 = ex + 5; x0 <= xEnd; x0 += 5) {
      let x = x0, y = yAt(x0);
      for (const L of loops) {
        const w = L.r * 3.3, d = x0 - (L.xc - w / 2);
        if (d > 0 && d < w) {
          const ph = d / w, th = 2 * Math.PI * ph + Math.PI, R = L.r * Math.sin(Math.PI * ph) ** 2;
          x = x0 - R * Math.sin(th); y = y - R * (1 - Math.cos(th));
        }
      }
      pts.push([x, y]);
    }
    if (TH.end) pts.push([TH.end.x, TH.end.y]);

    // arc length, running max of x, and a scroll → length lookup (smoothed so climbs and loops draw at a readable pace)
    const n = pts.length, cum = new Float64Array(n), mx = new Float64Array(n);
    let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    mx[0] = pts[0][0];
    for (let i = 1; i < n; i++) {
      cum[i] = cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      mx[i] = Math.max(mx[i - 1], pts[i][0]);
      d += 'L' + pts[i][0].toFixed(1) + ' ' + pts[i][1].toFixed(1);
    }
    TH.pts = pts; TH.cum = cum; TH.total = cum[n - 1];
    threadPath.setAttribute('d', d);
    threadPath.style.strokeDasharray = `${TH.total} ${TH.total}`;

    const F = vw * .72, step = TH.step, K = Math.ceil(maxS / step) + 2;
    const raw = new Float64Array(K);
    let j = 0;
    for (let k = 1; k < K; k++) { const X = k * step + F; while (j < n - 1 && mx[j] < X) j++; raw[k] = cum[j]; } // raw[0] = 0: the dot rests on the "i"
    const win = Math.max(1, Math.round(vw * .2 / step)), pre = new Float64Array(K + 1);
    for (let k = 0; k < K; k++) pre[k + 1] = pre[k] + raw[k];
    TH.lut = new Float64Array(K);
    for (let k = 0; k < K; k++) TH.lut[k] = (pre[k + 1] - pre[Math.max(0, k - win + 1)]) / win;
    const lenAtX = (x) => { let i = 0; while (i < n - 1 && mx[i] < x) i++; return cum[i]; };
    TH.nails.forEach((q) => { q.L = lenAtX(q.x); });
    TH.pins.forEach((q) => { q.L = lenAtX(q.x); });
    if (TH.seat) TH.seat.L = lenAtX(TH.seat.x);

    nailsG.innerHTML = TH.nails.map((q) => `<circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="5.5"/>`).join('');
    TH.nailEls = $$('circle', nailsG);
    TH.lastL = -1;
  }
  const lenAt = (s) => {
    const f = s / TH.step, k = Math.floor(f), L = TH.lut;
    if (!L) return 0;
    if (k >= L.length - 1) return L[L.length - 1];
    return lerp(L[Math.max(0, k)], L[k + 1], f - k);
  };
  const pointAt = (L) => {
    const c = TH.cum; let lo = 0, hi = c.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (c[m] <= L) lo = m; else hi = m; }
    const t = (L - c[lo]) / ((c[hi] - c[lo]) || 1), a = TH.pts[lo], b = TH.pts[hi];
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
  };

  let lit = false, catIn = false;
  function updateThread() {
    if (!H || !TH.pts?.length) return; // the vertical page has no thread (the intro still calls this)
    const L = lenAt(S);
    if (Math.abs(L - TH.lastL) < .05) { if (TH.moving) { TH.moving = false; Sound.scratch(0); } return; }
    TH.moving = true;
    const speed = Math.abs(L - TH.lastL);
    TH.lastL = L;
    threadPath.style.strokeDashoffset = (TH.total - L).toFixed(1);
    const [x, y] = pointAt(L);
    // the ball of wool at the thread's end rolls as it unwinds: one turn per circumference of thread
    nib.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(L / nibR * 57.3 % 360).toFixed(1)})`);
    Sound.scratch(speed / 40);
    TH.nails.forEach((q, i) => {
      const on = L >= q.L - 2, el = TH.nailEls[i];
      if (on !== el.classList.contains('on')) { el.classList.toggle('on', on); if (on) { q.swing?.kick(-2.2); Sound.pop(.07); } }
    });
    TH.pins.forEach((q, i) => {
      const on = L >= q.L - 2;
      if (on !== q.el.classList.contains('pinned')) { q.el.classList.toggle('pinned', on); if (on) { q.swing?.kick(i % 2 ? 3 : -3); Sound.tick(i); } }
    });
    if (TH.seat && !catIn && L >= TH.seat.L - vw * .05) { catIn = true; hopCat(); }
    const isLit = L >= TH.total - 1.5;
    if (isLit !== lit) { lit = isLit; $('.fire').classList.toggle('lit', lit); if (lit) Sound.whoosh(1.1, .2); }
  }

  /* ================================================================ layout */
  // the journey places its blocks by screen size but sizes their text in rem, so a short screen or a
  // reader's larger text can push a block under the nav or down to the bottom edge. Check them all.
  const FIT_TOP = '.hero-left, .works-head, .about-title, .note';
  const FIT_BOTTOM = '.hero-left, .come, .works-head, .work, .about-hi, .about-outside, .pola, .note, .contact-copy, .again, .end-foot';
  function fitsSideways() {
    const y = (el) => { let t = 0; for (let e = el; e && e !== track; e = e.offsetParent) t += e.offsetTop; return t; };
    const shown = (el) => el.offsetParent !== null;
    const top = $('.nav').offsetHeight, bottom = vh - 44; // a little air above the bottom edge, and the light switch in its corner
    return $$(FIT_TOP, track).filter(shown).every((el) => y(el) >= top)
      && $$(FIT_BOTTOM, track).filter(shown).every((el) => y(el) + el.offsetHeight <= bottom);
  }

  function layout() {
    vw = innerWidth; vh = innerHeight;
    // squarer than 3:2, the journey's drawings run into its text; anything that doesn't fit gets the vertical page
    const wantH = vw >= 900 && vw / vh >= 1.5;
    const frac = maxS ? S / maxS : 0;
    root.classList.toggle('is-h', wantH);
    H = wantH && fitsSideways();
    if (!H) root.classList.remove('is-h');
    if (H) {
      track.style.transform = '';
      // make the page tall first so the scrollbar is in place, then measure the width it leaves
      document.body.style.height = `${track.scrollWidth}px`;
      vw = root.clientWidth;
      maxS = track.scrollWidth - vw;
      document.body.style.height = `${maxS + vh}px`;
      threadSvg.setAttribute('width', track.scrollWidth); threadSvg.setAttribute('height', vh);
      threadSvg.setAttribute('viewBox', `0 0 ${track.scrollWidth} ${vh}`);
      buildThread();
      sections = $$('[data-section]', track).map((el) => ({ el, x: trackPos(el).x, key: el.dataset.section, label: el.dataset.label }));
      reveals = $$('[data-reveal]', track).map((el) => ({ el, x: trackPos(el).x }));
      // doodles that draw themselves when their block arrives
      [['.cam', '.about-outside'], ['.spark', '.contact-copy'], ['.again-loop', '.again']].forEach(([d, at]) => reveals.push({ el: $(d), x: trackPos($(at)).x, draw: 1 }));
      endX = trackPos($('.end')).x;
      if (!catIn) $('.cat').style.opacity = 0;
      if (frac) scrollToY(frac * maxS, { immediate: true });
    } else {
      document.body.style.height = ''; track.style.transform = '';
      maxS = document.documentElement.scrollHeight - vh;
      sections = $$('[data-section]', track).map((el) => ({ el, key: el.dataset.section, label: el.dataset.label }));
    }
    lenis?.resize?.();
  }

  /* ================================================================ reveals */
  const revealed = new WeakSet();
  let endX = Infinity;
  function reveal(el) {
    if (revealed.has(el)) return;
    revealed.add(el);
    el.classList.add('in');
    if (el.matches('.cam, .spark, .again-loop')) drawIn($('.dd', el));
    if (el.classList.contains('work')) {
      drawIn($('.frame-edge', el), .05);
      const s = swings[$$('.work').indexOf(el)]; s?.kick(H ? -1.6 : 1.2);
    }
    if (el.classList.contains('note')) drawIn($('.dd', el), .2);
  }
  const vertReveal = () => onEnter($$('[data-reveal]'), reveal, { margin: '0px 0px -10% 0px' });

  // frame edges match each frame's real size, so lines stay pen-width
  const edgeRO = new ResizeObserver((es) => es.forEach((e) => {
    const svg = e.target, w = svg.clientWidth, h = svg.clientHeight, i = +svg.dataset.i;
    if (!w) return;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    $('path', svg).setAttribute('d', sketchRect(w, h, 11 + i * 7, { inset: 1, wob: 6 }) + sketchRect(w, h, 12 + i * 7, { inset: Math.max(6, w * .028), wob: 4 }));
  }));
  $$('.frame-edge').forEach((s, i) => { s.dataset.i = i; edgeRO.observe(s); });

  /* ================================================================ hero: live sketch + draw-here */
  const live = $('.wf-live'), liveSvgs = $$('.wf-live .dd'), liveCap = $('.wf-live-cap'), pillars = $$('.pillar');
  let liveK = -1, liveT = null, livePaused = false;
  const LIVE_CAP = ['1 · research', '2 · systems', '3 · visual craft'];
  function liveNext() {
    clearTimeout(liveT);
    if (livePaused || RM || MOTION.paused) return;
    if (liveK >= 0) { eraseOut(liveSvgs[liveK]); eraseOut($('.dd', pillars[liveK])); pillars[liveK].classList.remove('on'); }
    liveK = (liveK + 1) % 3;
    liveT = setTimeout(() => {
      $('.pillars').classList.add('cycling');
      drawIn(liveSvgs[liveK]); drawIn($('.dd', pillars[liveK]), .2); pillars[liveK].classList.add('on');
      liveCap.textContent = LIVE_CAP[liveK];
      liveT = setTimeout(liveNext, 2900);
    }, liveK === 0 && !$('.pillars').classList.contains('cycling') ? 0 : 420);
  }
  function setLivePaused(p) { if (p === livePaused) return; livePaused = p; if (!p) liveNext(); else clearTimeout(liveT); }
  document.addEventListener('motionchange', () => { if (MOTION.paused) clearTimeout(liveT); else if (!livePaused) liveNext(); });
  if (RM) { drawIn(liveSvgs[0]); liveCap.textContent = LIVE_CAP[0]; }

  (function drawHere() {
    const box = $('.wf-draw'); if (!box) return;
    const cv = $('canvas', box), ctx = cv.getContext('2d');
    let strokes = [], cur = null;
    const color = () => getComputedStyle(root).getPropertyValue('--accent').trim() || '#fe2917';
    const fit = () => { const r = box.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); cv.width = Math.max(1, r.width * d); cv.height = Math.max(1, r.height * d); paint(); };
    const paint = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.strokeStyle = color(); ctx.lineCap = ctx.lineJoin = 'round'; ctx.lineWidth = 2.6 * Math.min(2, devicePixelRatio || 1);
      strokes.forEach((s) => {
        if (s.length < 2) return;
        ctx.beginPath(); ctx.moveTo(s[0][0] * cv.width, s[0][1] * cv.height);
        for (let i = 1; i < s.length - 1; i++) {
          const mx2 = (s[i][0] + s[i + 1][0]) / 2, my2 = (s[i][1] + s[i + 1][1]) / 2;
          ctx.quadraticCurveTo(s[i][0] * cv.width, s[i][1] * cv.height, mx2 * cv.width, my2 * cv.height);
        }
        const l = s[s.length - 1]; ctx.lineTo(l[0] * cv.width, l[1] * cv.height); ctx.stroke();
      });
    };
    const pos = (e) => { const r = box.getBoundingClientRect(); return [clamp((e.clientX - r.left) / r.width, 0, 1), clamp((e.clientY - r.top) / r.height, 0, 1)]; };
    box.addEventListener('pointerdown', (e) => { if (e.target.closest('.clear')) return; e.preventDefault(); box.setPointerCapture(e.pointerId); cur = [pos(e)]; strokes.push(cur); box.classList.add('used'); });
    box.addEventListener('pointermove', (e) => { if (!cur) return; cur.push(pos(e)); paint(); if (cur.length % 6 === 0) Sound.scratch(.5); });
    const end = () => { cur = null; Sound.scratch(0); };
    box.addEventListener('pointerup', end); box.addEventListener('pointercancel', end);
    $('.clear', box).addEventListener('click', () => { strokes = []; paint(); box.classList.remove('used'); Sound.pop(.08); });
    new ResizeObserver(fit).observe(box);
    document.addEventListener('themechange', paint);
  })();

  /* ================================================================ eyes */
  $$('.rg-pupil').forEach((p) => { p.dataset.scale = 1; });
  lookAt($$('.rg-pupil'), $('.resume-girl'), 20);
  lookAt($$('.fire-pupil'), $('.fire'), 15);

  /* ================================================================ cat + flowers */
  const tail = $('.dd-cat .tail path');
  function hopCat() {
    const c = $('.cat');
    if (RM) { c.style.opacity = 1; return; }
    gsap.fromTo(c, { y: -70, opacity: 0, scaleY: 1.08 }, { y: 0, opacity: 1, scaleY: 1, duration: .9, ease: 'bounce.out' });
    Sound.pop(.1);
  }
  let bloomed = false;
  function bloom() {
    if (bloomed) return; bloomed = true;
    const fl = $$('.vf-in');
    if (RM) return;
    gsap.fromTo(fl, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: 1.1, ease: 'back.out(2.2)', stagger: { each: .09, from: 'center' } });
    fl.forEach((_, i) => setTimeout(() => Sound.bell(i, .05), 120 + i * 90));
  }
  if (!RM) gsap.set('.vf-in', { scale: 0 });
  const vfs = $$('.vf');

  /* ================================================================ word light-up */
  const wordPs = $$('.about-p').map((el) => ({ el, ws: $$('.w', el), lit: -1 }));
  wordPs.forEach((w) => !RM && w.el.classList.add('dim'));
  function updateWords() {
    if (RM) return;
    wordPs.forEach((w) => {
      const r = w.el.getBoundingClientRect();
      const p = H ? clamp((vw * .92 - r.left) / (vw * .45), 0, 1) : clamp((vh * .9 - r.top) / (vh * .5), 0, 1);
      const n = Math.round(p * w.ws.length);
      if (n === w.lit) return;
      w.ws.forEach((s, i) => s.classList.toggle('lit', i < n)); w.lit = n;
    });
  }

  /* ================================================================ sections + nav */
  let curSec = -1;
  function updateSections() {
    let k = 0;
    if (H) sections.forEach((s, i) => { if (S + vw * .5 >= s.x) k = i; });
    else sections.forEach((s, i) => { if (s.el.getBoundingClientRect().top < vh * .5) k = i; });
    if (k !== curSec) {
      curSec = k;
      const s = sections[k];
      setActiveNav(s.key === 'works' ? 'works' : s.key === 'about' ? 'about' : null);
      setLivePaused(s.key !== 'hello');
    }
  }

  /* ================================================================ go-to links */
  function targetFor(key) {
    if (key === '0') return 0;
    const el = $('#' + key);
    if (!el) return null;
    if (H) return Math.min(maxS, trackPos(el).x + (key === 'works' ? vw * .04 : 0));
    return el.getBoundingClientRect().top + scrollY - (key === 'works' ? 70 : 40);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-goto]');
    if (!a) return;
    const y = targetFor(a.dataset.goto);
    if (y == null) return;
    e.preventDefault();
    const far = Math.abs(y - S) / Math.max(1, vw);
    const dest = $({ works: '#works-h', about: '#about-h', 0: '.hero-name', hello: '.hero-name' }[a.dataset.goto] || `#${a.dataset.goto}`);
    const land = () => { if (!dest) return; dest.setAttribute('tabindex', '-1'); dest.focus({ preventScroll: true }); };
    scrollToY(y, { duration: a.dataset.goto === '0' ? Math.min(4.2, 1.6 + far * .35) : Math.min(2.6, 1.1 + far * .25), easing: (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), onComplete: land });
    if (a.dataset.goto === '0') Sound.whoosh(1.6, .12);
    history.replaceState(null, '', a.dataset.goto === '0' ? location.pathname + location.search : '#' + a.dataset.goto);
  });
  // keyboard: arrows walk the wall
  addEventListener('keydown', (e) => {
    if (!H || e.altKey || e.metaKey || e.ctrlKey || /input|textarea/i.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); scrollToY(clamp(S + (e.key === 'ArrowRight' ? 1 : -1) * vw * .8, 0, maxS), { duration: .9 }); }
  });
  // When the browser scrolls the clipped wrapper to reveal something (a focused link, a
  // find-in-page match, a screen reader's cursor), turn that into a walk along the wall.
  function absorbHv() {
    const dx = hv.scrollLeft;
    if (!dx && !hv.scrollTop) return;
    hv.scrollLeft = 0; hv.scrollTop = 0;
    if (!H || !dx) return;
    S = clamp(S + dx, 0, maxS);
    scrollToY(S, { immediate: true });
    track.style.transform = `translate3d(${-S}px,0,0)`;
  }

  /* ================================================================ page transitions (morph the clicked cover) */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('.work-link');
    if (!a) return;
    $$('.work-img, .work-title').forEach((el) => { el.style.viewTransitionName = ''; });
    $('.work-img', a).style.viewTransitionName = 'hero-img';
    Sound.pop(.12);
  });
  addEventListener('pagereveal', (e) => {
    const from = window.navigation?.activation?.from?.url;
    if (!e.viewTransition || !from) return;
    const slug = new URL(from).searchParams.get('p');
    const card = slug && $(`.work[data-slug="${slug}"] .work-img`);
    if (!card) return;
    const r = card.getBoundingClientRect();
    if (r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight) {
      card.style.viewTransitionName = 'hero-img';
      e.viewTransition.finished.finally(() => { card.style.viewTransitionName = ''; });
    }
  });

  /* ================================================================ the girl in the hero */
  // a two-second animation of her holding up her drawing (one per theme, made by tools/prepare_girl.py).
  // It plays once and stops on its last frame; reduced motion or paused animations show just that frame.
  // Each run gets a fresh blob URL, because re-setting the same image URL doesn't restart an animation.
  const girlArt = $('.girl-art');
  const still = () => RM || MOTION.paused;
  const girlImg = () => $(root.dataset.theme === 'blue' ? '.girl-anim.blue' : '.girl-anim.paper', girlArt);
  const girlFiles = {};
  const girlFile = (img) => (girlFiles[img.dataset.play] ||= fetch(img.dataset.play).then((r) => r.blob()));
  let girlStarted = 0, girlUrl = '';
  async function showGirl(play) {
    const img = girlImg();
    if (!play) { img.src = img.dataset.end; return; }
    girlStarted = performance.now();
    try {
      const url = URL.createObjectURL(await girlFile(img));
      img.src = url; if (girlUrl) URL.revokeObjectURL(girlUrl); girlUrl = url;
    } catch (e) { img.src = img.dataset.play; } // opened from disk, where fetch isn't allowed
  }
  if (!still()) girlFile(girlImg()); // start the download now, so it's ready when she appears
  function playGirl(delay = 0) {
    setTimeout(() => { girlArt.classList.add('on'); showGirl(!still()); }, delay * 1000);
  }
  // point at her (or tap her) to watch it again; a theme switch shows the other version
  $('.hero-girl').addEventListener('pointerenter', () => { if (!still() && performance.now() - girlStarted > 2100) showGirl(true); });
  document.addEventListener('themechange', () => { if (girlArt.classList.contains('on')) showGirl(!still() && performance.now() - girlStarted < 2000); });

  /* ================================================================ intro */
  function quickIn() {
    root.classList.remove('intro');
    if (RM) { $$('.dd.pre').forEach((s) => s.classList.remove('pre')); return; }
    gsap.fromTo('.hero-name .ch', { yPercent: 110, y: 0 }, { yPercent: 0, duration: .9, ease: 'power4.out', stagger: .03 });
    gsap.fromTo('.wf', { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', stagger: .04 });
    playGirl(.2); drawIn($('.come-arrow .dd'), .5);
    setTimeout(liveNext, 900);
  }
  function intro() {
    // where the dot will land: measured without the letters' intro offset
    const tt = $('.tittle'), tp = trackPos(tt), tr = track.getBoundingClientRect();
    const size = tt.offsetWidth, r = { left: tp.x + tr.left, top: tp.y + tr.top };
    const dot = document.body.appendChild(html(`<div class="wool-dot" aria-hidden="true" style="position:fixed;left:0;top:0;z-index:10005;pointer-events:none">${doodle('wool')}</div>`));
    const cx = innerWidth / 2, cy = innerHeight / 2;
    gsap.set(dot, { width: size, height: size, x: cx - size / 2, y: cy - size / 2, scale: 0 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => root.classList.remove('intro') });
    tl.to(dot, { scale: 2.2, duration: .5, ease: 'back.out(3)', onStart: () => Sound.pop(.12) })
      .to(dot, { scale: 1, duration: .35, ease: 'power2.inOut' }, '+=.15')
      .fromTo('.hero-name .ch', { yPercent: 110, y: 0 }, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: .055 }, '-=.2')
      .to(dot, { x: r.left, duration: .95, ease: 'power2.inOut' }, '<.15')
      .to(dot, { y: r.top, duration: .95, ease: 'back.in(1.6)' }, '<')
      .add(() => { Sound.pop(.16); }, '>-.02')
      .to(dot, { scaleX: 1.45, scaleY: .62, duration: .09, ease: 'power1.out', transformOrigin: '50% 100%' })
      .to(dot, { scaleX: 1, scaleY: 1, duration: .6, ease: 'elastic.out(1.2, .35)' })
      .add(() => { dot.remove(); $('.tittle').style.opacity = ''; root.classList.remove('intro'); updateThread(); }, '<.1')
      .fromTo('.wf', { y: () => -vh * .5, rotation: (i) => (i % 2 ? 10 : -12), opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.in', stagger: { each: .07, from: 'center' } }, 1.05)
      .to('.wf', { rotation: 0, duration: 1.6, ease: 'elastic.out(1, .32)', stagger: { each: .07, from: 'center' } }, 1.8)
      .add(() => FRAMES.forEach((_, i) => setTimeout(() => Sound.tick(i), i * 70)), 1.75)
      .fromTo('.hero-role', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8 }, 1.4)
      .add(() => playGirl(0), 1.5)
      .fromTo('.girl-cap', { opacity: 0 }, { opacity: 1, duration: .8 }, 2.4)
      .fromTo('.nav', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .7 }, 1.7)
      .fromTo('.come-txt', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .8 }, 2.1)
      .add(() => drawIn($('.come-arrow .dd'), 0), 2.3)
      .fromTo('.scroll-hint', { opacity: 0 }, { opacity: 1, duration: .8 }, 2.7)
      .add(liveNext, 2.6);
  }

  /* ================================================================ main loop */
  let t0 = performance.now(), hintGone = false;
  const workImgs = $$('.work-img');
  function frame(now) {
    const sy = window.scrollY;
    S = H ? clamp(sy, 0, maxS) : sy;
    const v = S - prevS; prevS = S;
    if (H) {
      absorbHv();
      track.style.transform = `translate3d(${-S.toFixed(2)}px,0,0)`;
      if (TH.lut) updateThread();
      for (const r of reveals) if (!revealed.has(r.el) && S + vw * (r.draw ? .9 : .82) > r.x) reveal(r.el);
      if (!bloomed && S + vw * .55 > endX) bloom();
    }
    if (!hintGone && S > 30) { hintGone = true; gsap.to('.scroll-hint', { opacity: 0, duration: .4 }); }
    // the wall leans into the motion, then swings back when you stop
    const wind = RM ? 0 : (H ? -v * .11 : -v * .05);
    swings.forEach((s) => s.step(wind));
    // parallax inside the frames: depth without moving the frame itself
    if (H && !RM) workImgs.forEach((box) => {
      const r = box.getBoundingClientRect();
      if (r.right < 0 || r.left > vw) return;
      box.style.setProperty('--plx', `${(((r.left + r.width / 2) / vw - .5) * -5).toFixed(2)}%`);
    });
    if (tail && !RM && !MOTION.paused) { const s = Math.sin((now - t0) * .0021); tail.setAttribute('d', `M70 100C${(76 + s * 3).toFixed(1)} 110 ${(80 + s * 9).toFixed(1)} 124 ${(76 + s * 15).toFixed(1)} 138`); }
    if (bloomed && !RM && !MOTION.paused) vfs.forEach((f, i) => {
      const r = f.getBoundingClientRect(), dx = POINTER.x - (r.left + r.width / 2), dy = POINTER.y - (r.top + r.height / 2);
      const push = POINTER.moved ? clamp(-dx / 60, -6, 6) * Math.max(0, 1 - Math.hypot(dx, dy) / 260) : 0;
      f.style.transform = `rotate(${(Math.sin(now * .0011 + i * 1.3) * 2.2 + push).toFixed(2)}deg)`;
    });
    updateWords(); updateSections();
  }

  /* ================================================================ boot */
  const hv = $('#hv');
  hv.addEventListener('scroll', absorbHv);
  const startIntro = root.classList.contains('intro') && !RM && scrollY < 5;
  document.fonts.ready.then(() => {
    layout();
    initLenis({ gestureOrientation: 'both' });
    Loop.add(frame); Loop.start();
    if (!H) {
      vertReveal();
      onEnter([$('.fire')], (el) => el.classList.add('lit'), { margin: '0px 0px -25% 0px' });
      onEnter([$('.vase')], bloom, { margin: '0px 0px -20% 0px' });
      onEnter([$('.cam'), $('.spark'), $('.again-loop')].filter(Boolean), (el) => drawIn($('.dd', el)), {});
    }
    const toHash = (immediate) => { const y = location.hash && targetFor(location.hash.slice(1)); if (y != null && y !== '') scrollToY(y, { immediate, duration: 1.6 }); };
    toHash(true);
    addEventListener('hashchange', () => toHash(false));
    if (startIntro) { store.sset('bh-intro', '1'); intro(); } else quickIn();
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { const was = H; layout(); if (was !== H) location.reload(); }, 160); });
  });
})();
