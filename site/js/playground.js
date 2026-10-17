/* ------------------------------------------------------------------
   Playground: a pinboard of experiments. Drag (with inertia), wheel,
   or arrow keys to move around; shuffle re-pins the pile.
------------------------------------------------------------------- */
(() => {
  const items = PLAYGROUND.items;
  const vp = $('#board'), board = $('.board', vp);
  const PAN = matchMedia('(min-width: 861px) and (hover: hover)').matches;
  $('.play-intro').textContent = PLAYGROUND.intro;
  $$('[data-doodle]').forEach((el) => { el.innerHTML = doodle(el.dataset.doodle); });

  board.innerHTML = items.map((it, i) => {
    const media = it.video
      ? `<video src="${it.video}" muted loop playsinline preload="metadata" aria-label="Motion piece ${i + 1}"></video><span class="play-badge">▶ motion</span>`
      : `<img src="${fx(it.img.id, 1024)}" srcset="${srcset(it.img, [512, 1024])}" sizes="340px" alt="${it.img.alt}" loading="lazy" decoding="async" width="${it.img.w}" height="${it.img.h}" data-zoom="${fx(it.img.id, 2048)}">`;
    const att = i % 3 === 0 ? '<span class="pin" aria-hidden="true"></span>' : `<span class="tape" aria-hidden="true" style="--tr:${i % 2 ? 3 : -4}deg"></span>`;
    const label = it.video ? `Play motion piece ${i + 1}` : `Enlarge image: ${it.img.alt}`;
    return `<button type="button" class="pin-item" data-i="${i}" data-cursor="view" data-cursor-label="${it.video ? 'Play' : 'Look closer'}" aria-label="${label}">${att}<span class="pi-media">${media}</span></button>`;
  }).join('') + ['cat', 'sparkle', 'spiral', 'plane', 'heart', 'craft', 'camera', 'sprout'].map((n) => `<span class="deco boil" data-deco="${n}">${doodle(n)}</span>`).join('');

  bootCommon();
  setActiveNav('playground');
  const els = $$('.pin-item', board), vids = $$('video', board), decos = $$('.deco', board);

  /* ---------------------------------------------------------------- open */
  function openItem(el) {
    const v = $('video', el);
    if (!v) { zoomImage($('img', el)); return; }
    if ($('.vbox')) return; // already showing one
    const box = document.body.appendChild(html(`<div class="vbox" role="dialog" aria-modal="true" aria-label="Motion piece"><button type="button">close video <span aria-hidden="true">✕</span></button><video src="${v.currentSrc || v.src}" autoplay loop playsinline controls muted></video></div>`));
    requestAnimationFrame(() => box.classList.add('show'));
    setInert(true, [box]);
    const close = () => { box.classList.remove('show'); setTimeout(() => box.remove(), 150); removeEventListener('keydown', esc); setInert(false); el.focus({ preventScroll: true }); };
    const esc = (e) => { if (e.key === 'Escape') close(); };
    box.addEventListener('click', (e) => { if (e.target.tagName !== 'VIDEO') close(); });
    addEventListener('keydown', esc);
    $('button', box).focus();
    Sound.pop(.1);
  }

  /* ---------------------------------------------------------------- videos play when seen */
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    v.dataset.seen = e.isIntersecting ? '1' : '';
    if (e.isIntersecting && !RM && !MOTION.paused) v.play().catch(() => {}); else v.pause();
  }), { root: PAN ? vp : null, threshold: .3 });
  vids.forEach((v) => vio.observe(v));
  document.addEventListener('motionchange', () => vids.forEach((v) => { if (MOTION.paused) v.pause(); else if (v.dataset.seen && !RM) v.play().catch(() => {}); }));

  // Enter / Space on a focused pin (detail 0 = keyboard); pointer clicks are handled by the board
  if (PAN) els.forEach((el) => el.addEventListener('click', (e) => { if (e.detail === 0) openItem(el); }));

  if (!PAN) {
    els.forEach((el) => el.addEventListener('click', () => openItem(el)));
    $('#shuffle').addEventListener('click', () => {
      const order = els.slice().sort(() => Math.random() - .5);
      order.forEach((el) => board.appendChild(el));
      Sound.whoosh(.6, .12);
    });
    return;
  }

  /* ---------------------------------------------------------------- pinboard layout */
  let BW = innerWidth, BH = innerHeight, seed = 1;
  const aspect = (i) => {
    const it = items[i], v = $('video', els[i]);
    if (v) return v.videoWidth ? v.videoWidth / v.videoHeight : it.w / it.h;
    return it.img.w / it.img.h;
  };
  function layout(animate = false) {
    const R = rng(seed * 97 + 3);
    const colW = 350, cols = Math.max(5, Math.ceil((innerWidth * 1.5) / colW)), left0 = Math.max(innerWidth * .34, 420);
    const colsH = Array.from({ length: cols }, (_, c) => innerHeight * .15 + (c % 2) * 60);
    const order = els.map((_, i) => i);
    if (seed > 1) for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    order.forEach((i) => {
      const a = aspect(i), w = Math.round(a >= 1.2 ? 290 + R() * 50 : a <= .8 ? 210 + R() * 40 : 250 + R() * 40);
      const h = w / a + 16;
      const c = colsH.indexOf(Math.min(...colsH));
      const x = Math.round(left0 + c * colW + (colW - w) / 2 + (R() - .5) * 46), y = Math.round(colsH[c] + (R() - .5) * 26);
      colsH[c] = y + h + 64 + R() * 30;
      const r = ((R() - .5) * 7).toFixed(2), el = els[i];
      if (animate && !RM) gsap.to(el, { left: x, top: y, width: w, '--r': `${r}deg`, duration: 1.1, ease: 'power3.inOut', delay: R() * .18 });
      else { el.style.left = `${x}px`; el.style.top = `${y}px`; el.style.width = `${w}px`; el.style.setProperty('--r', `${r}deg`); }
    });
    BW = left0 + cols * colW + 160; BH = Math.max(innerHeight + 200, Math.max(...colsH) + 140);
    board.style.width = `${BW}px`; board.style.height = `${BH}px`;
    decos.forEach((d, k) => {
      const s = 90 + R() * 70;
      Object.assign(d.style, { width: `${s}px`, height: `${s}px`, left: `${left0 - 160 + R() * (BW - left0)}px`, top: `${80 + R() * (BH - 200)}px`, transform: `rotate(${(R() - .5) * 30}deg)` });
    });
    sizeStrokes(board);
  }

  /* ---------------------------------------------------------------- panning with inertia */
  let px = 0, py = 0, tx = 0, ty = 0, vx = 0, vy = 0, drag = null;
  const minX = () => Math.min(0, innerWidth - BW), minY = () => Math.min(0, innerHeight - BH);
  const rubber = (v, lo, hi) => (v > hi ? hi + (v - hi) * .3 : v < lo ? lo + (v - lo) * .3 : v);
  vp.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, tx, ty, item: e.target.closest('.pin-item'), moved: false, lx: e.clientX, ly: e.clientY };
    vx = vy = 0;
    vp.setPointerCapture(e.pointerId);
  });
  vp.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) > 6) { drag.moved = true; vp.classList.add('dragging'); }
    if (!drag.moved) return;
    vx = e.clientX - drag.lx; vy = e.clientY - drag.ly; drag.lx = e.clientX; drag.ly = e.clientY;
    tx = rubber(drag.tx + dx, minX(), 0); ty = rubber(drag.ty + dy, minY(), 0);
    px = tx; py = ty;
  });
  const up = (e) => {
    if (!drag) return;
    vp.releasePointerCapture?.(e.pointerId);
    vp.classList.remove('dragging');
    if (!drag.moved && drag.item) openItem(drag.item);
    drag = null;
  };
  vp.addEventListener('pointerup', up); vp.addEventListener('pointercancel', up);
  vp.addEventListener('wheel', (e) => {
    e.preventDefault();
    const k = e.deltaMode === 1 ? 32 : 1;
    tx = clamp(tx - (e.shiftKey ? e.deltaY : e.deltaX) * k, minX(), 0);
    ty = clamp(ty - (e.shiftKey ? 0 : e.deltaY) * k, minY(), 0);
    vx = vy = 0;
  }, { passive: false });
  vp.addEventListener('keydown', (e) => {
    const m = { ArrowLeft: [160, 0], ArrowRight: [-160, 0], ArrowUp: [0, 160], ArrowDown: [0, -160] }[e.key];
    if (!m) return;
    e.preventDefault();
    tx = clamp(tx + m[0], minX(), 0); ty = clamp(ty + m[1], minY(), 0);
  });
  // tabbing to a pin brings it to the middle of the screen; the browser's own
  // scroll of this clipped viewport is undone so only our pan moves the board
  vp.addEventListener('focusin', (e) => {
    const el = e.target.closest('.pin-item');
    if (!el) return;
    const x = parseFloat(el.style.left) || 0, y = parseFloat(el.style.top) || 0, w = el.offsetWidth, h = el.offsetHeight;
    const sx = x + tx, sy = y + ty;
    if (sx < 60 || sx + w > innerWidth - 60 || sy < 100 || sy + h > innerHeight - 60) {
      tx = clamp(innerWidth / 2 - (x + w / 2), minX(), 0); ty = clamp(innerHeight / 2 - (y + h / 2), minY(), 0); vx = vy = 0;
    }
  });
  vp.addEventListener('scroll', () => { vp.scrollLeft = 0; vp.scrollTop = 0; });
  document.body.insertAdjacentHTML('beforeend', `<div class="pan-pad" role="group" aria-label="Move the board">${[
    ['up', '↑', 0, 1], ['left', '←', 1, 0], ['down', '↓', 0, -1], ['right', '→', -1, 0],
  ].map(([k, g, x, y]) => `<button type="button" class="${k}" data-px="${x}" data-py="${y}" aria-label="Move board ${k}"><span aria-hidden="true">${g}</span></button>`).join('')}</div>`);
  $$('.pan-pad button').forEach((b) => b.addEventListener('click', () => {
    tx = clamp(tx + b.dataset.px * innerWidth * .4, minX(), 0); ty = clamp(ty + b.dataset.py * innerHeight * .4, minY(), 0); vx = vy = 0;
    Sound.tick(2);
  }));
  Loop.add(() => {
    if (!drag) {
      if (Math.abs(vx) > .02 || Math.abs(vy) > .02) { tx += vx; ty += vy; vx *= .93; vy *= .93; }
      const cx = clamp(tx, minX(), 0), cy = clamp(ty, minY(), 0);
      if (cx !== tx) { tx += (cx - tx) * .16; vx *= .5; }
      if (cy !== ty) { ty += (cy - ty) * .16; vy *= .5; }
      px += (tx - px) * (RM ? 1 : .2); py += (ty - py) * (RM ? 1 : .2);
    }
    board.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0)`;
  });

  /* ---------------------------------------------------------------- shuffle */
  $('#shuffle').addEventListener('click', () => {
    seed++; layout(true);
    Sound.whoosh(.8, .12);
    els.forEach((_, i) => setTimeout(() => Sound.tick(i), 80 + i * 45));
    if (!RM) $('#shuffle .arr').animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 700, easing: 'cubic-bezier(.65,0,.35,1)' });
  });

  /* ---------------------------------------------------------------- boot */
  const ready = vids.map((v) => new Promise((r) => { if (v.readyState >= 1) r(); else { v.addEventListener('loadedmetadata', r, { once: true }); setTimeout(r, 1500); } }));
  Promise.all(ready).then(() => {
    layout();
    Loop.start();
    if (!RM) {
      const order = els.slice().sort((a, b) => (parseFloat(a.style.left) + parseFloat(a.style.top)) - (parseFloat(b.style.left) + parseFloat(b.style.top)));
      // `translate` (not transform) so each pin keeps its CSS tilt
      gsap.fromTo(order, { opacity: 0, translate: '0px -40px' }, { opacity: 1, translate: '0px 0px', duration: .8, ease: 'back.out(1.6)', stagger: .045, onStart: () => Sound.pop(.08), clearProps: 'translate' });
      gsap.fromTo('.play-head', { opacity: 0, y: 20, rotation: -6 }, { opacity: 1, y: 0, rotation: -1.4, duration: 1, ease: 'elastic.out(1, .5)' });
    }
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => layout(), 150); });
  });
})();
