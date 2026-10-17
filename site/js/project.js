/* ------------------------------------------------------------------
   Case study page, rendered from PROJECTS in data.js (?p=slug).
------------------------------------------------------------------- */
(() => {
  const root = document.documentElement;
  const qs = new URLSearchParams(location.search), slug = qs.get('p');
  const pad = (n) => String(n).padStart(2, '0');
  const found = PROJECTS.findIndex((p) => p.slug === slug);
  if (found < 0) { missing(slug); return; }
  const idx = found;
  const P = PROJECTS[idx], N = PROJECTS.length, next = PROJECTS[(idx + 1) % N];
  document.title = `${P.title} · Bhoomie`;
  $('meta[name="description"]').setAttribute('content', `${P.title}, a case study by Bhoomie. ${P.summary}`);

  /* An unknown or missing ?p= never silently shows another project: say so, and list them all. */
  function missing(asked) {
    const NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const all = NUM[PROJECTS.length] || String(PROJECTS.length);
    const typo = asked != null && asked !== '';
    document.title = `${typo ? 'Case study not found' : 'Case studies'} · Bhoomie`;
    $('meta[name="description"]').setAttribute('content', `Case studies by ${SITE.fullName} (Bhoomie), product designer.`);
    if (typo) document.head.insertAdjacentHTML('beforeend', '<meta name="robots" content="noindex">');
    ['.rail', '.rail-ticks', '.topbar'].forEach((s) => $(s)?.remove());
    $('#case').innerHTML = `<div class="wrap"><section class="cs-missing" aria-labelledby="missing-h">
      <a class="cs-back" href="index.html#works"><span aria-hidden="true">←</span> all projects</a>
      <div class="cs-missing-doodle" aria-hidden="true">${typo ? doodle('cat-look', { pre: true }) : doodle('spiral', { pre: true, stagger: .1 })}</div>
      <p class="cs-index"><span class="hand">case study</span> ${typo ? 'not found' : `${pad(PROJECTS.length)} projects`}</p>
      <h1 class="cs-missing-h serif" id="missing-h">${typo ? 'I can’t find that case study' : 'Pick a case study'}</h1>
      <p class="cs-lede">${typo ? `It may have moved, or the link may have a typo. Here are all ${all}:` : `Here are all ${all}:`}</p>
      <ul class="cs-missing-list">${PROJECTS.map((p, i) => `<li><a href="project.html?p=${p.slug}"><span class="n hand">${pad(i + 1)}</span><span class="t serif">${p.title}</span><span class="s">${p.short}</span><span class="arr" aria-hidden="true">→</span></a></li>`).join('')}</ul>
    </section></div>`;
    $$('[data-doodle]').forEach((el) => { el.innerHTML = doodle(el.dataset.doodle, { pre: el.hasAttribute('data-pre') }); });
    bootCommon();
    setActiveNav('works');
    document.fonts.ready.then(() => { initLenis(); Loop.start(); drawIn($('.cs-missing-doodle .dd'), .2); if (typo) searchingCat($('.cs-missing-doodle .dd')); });
  }

  const chars = (t) => [...t].map((c) => (c === ' ' ? ' ' : `<span class="ch">${c}</span>`)).join('');
  const words = (t) => t.split(' ').map((w) => `<span class="w">${w}</span>`).join(' ');
  const shot = (img, sizes) => `<figure class="shot" style="flex:${(img.w / img.h).toFixed(4)} 1 0;aspect-ratio:${img.w}/${img.h}"><button type="button" class="zoom" aria-label="Enlarge image${img.alt ? `: ${img.alt}` : ''}"><img src="${fx(img.id, 1024)}" srcset="${srcset(img)}" sizes="${sizes}" alt="${img.alt || ''}" loading="lazy" decoding="async" width="${img.w}" height="${img.h}" data-zoom="${fx(img.id, 2048)}"></button></figure>`;
  const SIZES = { wide: '(min-width: 1400px) 1320px, 94vw', phones: '(min-width: 860px) 22vw, 62vw' };

  const chapter = (s, i) => {
    const body = s.body?.length, layout = s.layout || 'row';
    const sizes = SIZES[layout] || `(min-width: 860px) ${Math.round(96 / (s.images?.length || 1))}vw, 94vw`;
    const stat = s.stat ? `<div class="stat rise"><span class="stat-n"><span class="num" data-n="${s.stat.n}">${s.stat.n}</span>%${doodle('ring', { pre: true })}</span><span class="stat-l">${s.stat.label}</span></div>` : '';
    return `<section class="chap ${body ? '' : 'ch-only-img'}" id="ch-${i + 1}" data-ch="${s.title}" aria-labelledby="ch-h-${i + 1}">
      <div class="chap-text">
        <div class="ch-head rise"><span class="ch-num">${pad(i + 1)}</span><h2 id="ch-h-${i + 1}">${s.title}</h2></div>
        ${body ? `<div class="ch-body">${s.body.map((p) => `<p class="rise">${p}</p>`).join('')}${stat}</div>` : ''}
      </div>
      ${s.images ? `<div class="shots shots-${layout} ${s.narrow ? 'shots-narrow' : ''}">${s.images.map((m) => shot(m, sizes)).join('')}</div>` : ''}
    </section>`;
  };

  $('#case').innerHTML = `<div class="wrap">
    <header class="cs-hero">
      <a class="cs-back" href="index.html#works"><span aria-hidden="true">←</span> all projects</a>
      <p class="cs-index"><span class="hand">case study</span> ${pad(idx + 1)} / ${pad(N)} · ${P.year}</p>
      <h1 class="cs-title serif" aria-label="${P.title}"><span class="ln" aria-hidden="true">${chars(P.title)}</span></h1>
      <p class="cs-lede">${P.lede}</p>
      <dl class="cs-meta">${Object.entries(P.meta).map(([k, v]) => `<div><dt>${k.toLowerCase()}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </header>
    <figure class="cs-cover">
      <div class="cs-cover-frame"><span class="tape"></span><svg class="frame-edge dd pre" aria-hidden="true"><path pathLength="1" style="--dur:1.4s"/></svg>
        <div class="cs-cover-img"><button type="button" class="zoom" aria-label="Enlarge image: ${P.hero.alt || P.title}"><img src="${fx(P.hero.id, 2048)}" srcset="${srcset(P.hero)}" sizes="(min-width: 1400px) 1320px, 94vw" alt="${P.hero.alt || P.title}" fetchpriority="high" width="${P.hero.w}" height="${P.hero.h}" data-zoom="${fx(P.hero.id, 2048)}"></button></div>
      </div>
    </figure>
    <section class="cs-summary" aria-label="Summary"><p class="lit-words">${words(P.summary)}</p></section>
    ${P.sections.map(chapter).join('')}
    <section class="cs-quote" aria-label="Reflection"><blockquote><span class="qm l" aria-hidden="true">${doodle('quote', { pre: true })}</span><p class="lit-words">${words(P.quote)}</p><span class="qm r" aria-hidden="true">${doodle('quote', { pre: true })}</span></blockquote><cite>reflecting on ${P.title}</cite></section>
    <section class="cs-learning" aria-label="Key design learning"><div class="learn"><span class="tape"></span>${doodle('bulb', { pre: true })}<h2>key design learning</h2><p>${P.learning}</p></div></section>
    <a class="cs-next" href="project.html?p=${next.slug}" data-cursor="view" data-cursor-label="Next">
      <span class="hand">next up · ${pad((idx + 1) % N + 1)}</span>
      <span class="cs-next-title">${next.title}</span>
      <span class="cs-next-short">${next.short}</span>
      <span class="cs-next-img"><img src="${fx(next.cover.id, 1024)}" alt="" loading="lazy" decoding="async"></span>
    </a>
    <footer class="cs-foot">
      <div class="cs-foot-top">
        <h2>Got a spark?<br><em>Let’s talk.</em></h2>
        <div class="contact-btns">
          <button class="sbtn primary" type="button" data-copy="${SITE.email}"><span class="swap"><span>Copy email</span><span aria-hidden="true">Copied</span></span> <span class="arr swap"><span>✿</span><span>✓</span></span></button>
          <a class="sbtn" href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn <span class="arr">↗</span></a>
          <a class="sbtn" href="index.html#works">All projects <span class="arr">→</span></a>
        </div>
      </div>
      <div class="foot"><span>©&nbsp;<span class="yr">2026</span> ${SITE.fullName}</span><a href="index.html">Home <span aria-hidden="true">→</span></a></div>
    </footer>
  </div>`;

  $$('[data-doodle]').forEach((el) => { el.innerHTML = doodle(el.dataset.doodle, { pre: el.hasAttribute('data-pre') }); });
  bootCommon();
  setActiveNav('works');

  // sketchy frame around the cover, sized to the real box
  const edge = $('.cs-cover .frame-edge');
  new ResizeObserver(() => {
    const w = edge.clientWidth, h = edge.clientHeight;
    if (!w) return;
    edge.setAttribute('viewBox', `0 0 ${w} ${h}`);
    $('path', edge).setAttribute('d', sketchRect(w, h, 5 + idx * 3, { inset: 1, wob: 8 }) + sketchRect(w, h, 6 + idx * 3, { inset: Math.max(8, w * .012), wob: 5 }));
  }).observe(edge);

  /* ---------------------------------------------------------------- reveals */
  const count = (el) => {
    const n = +el.dataset.n, o = { v: 0 };
    if (RM) return;
    gsap.to(o, { v: n, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); } });
  };
  onEnter($$('.rise, .shot'), (el) => {
    el.classList.add('in');
    if (el.classList.contains('stat')) { drawIn($('.dd', el), .3); count($('.num', el)); }
  }, { margin: '0px 0px -8% 0px' });
  onEnter([$('.cs-quote')], (el) => { $$('.qm .dd', el).forEach((d, i) => drawIn(d, i * .5)); }, { margin: '0px 0px -25% 0px' });
  onEnter([$('.learn')], (el) => drawIn($('.dd', el), .2), { margin: '0px 0px -20% 0px' });
  if (RM) $$('.dd.pre').forEach((d) => d.classList.remove('pre'));

  /* ---------------------------------------------------------------- reading thread */
  const rail = $('.rail'), rsvg = $('.rail-svg'), rline = $('.rail-line'), rbg = $('.rail-bg'), rnib = $('.rail-nib'), ticks = $('.rail-ticks');
  let RL = 0, chapters = [], docH = 1, vh = innerHeight;
  function layoutRail() {
    vh = innerHeight; docH = Math.max(1, document.documentElement.scrollHeight - vh);
    const h = rail.clientHeight;
    if (!h) return;
    rsvg.setAttribute('viewBox', `0 0 24 ${h}`);
    let d = 'M12 0';
    for (let y = 8; y <= h; y += 8) d += `L${(12 + Math.sin(y * .021) * 2.2 + Math.sin(y * .0063 + 1) * 3).toFixed(2)} ${y}`;
    rline.setAttribute('d', d); rbg.setAttribute('d', d);
    RL = rline.getTotalLength();
    rline.style.strokeDasharray = `${RL} ${RL}`;
    chapters = $$('.chap').map((el) => ({ el, f: clamp((el.getBoundingClientRect().top + scrollY - vh * .35) / docH, 0, 1), title: el.dataset.ch }));
    ticks.innerHTML = chapters.map((c, i) => `<a href="#${c.el.id}" style="top:${(c.f * 100).toFixed(2)}%"><span>${pad(i + 1)} · ${c.title}</span></a>`).join('');
    $$('a', ticks).forEach((a, i) => a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToY(chapters[i].el.getBoundingClientRect().top + scrollY - 90, { duration: 1.2 });
      Sound.tick(i);
    }));
  }

  /* ---------------------------------------------------------------- next project: the cover follows you */
  const nx = $('.cs-next'), nimg = $('.cs-next-img');
  let ix = innerWidth / 2, iy = innerHeight / 2, rot = 0, hovering = false;
  if (FINE && !RM) {
    nx.addEventListener('pointerenter', () => { hovering = true; nx.classList.add('hovering'); ix = POINTER.x; iy = POINTER.y; Sound.tick(3); });
    nx.addEventListener('pointerleave', () => { hovering = false; nx.classList.remove('hovering'); });
  }
  nx.addEventListener('click', () => {
    $('.cs-cover-img').style.viewTransitionName = 'none';
    nimg.style.viewTransitionName = 'hero-img';
    Sound.pop(.12);
  });
  addEventListener('pageswap', (e) => {
    if (!e.viewTransition) return;
    const c = $('.cs-cover-img'), r = c.getBoundingClientRect();
    if (c.style.viewTransitionName !== 'none' && (r.bottom < 0 || r.top > innerHeight)) c.style.viewTransitionName = 'none';
  });
  let viaVT = false;
  addEventListener('pagereveal', (e) => { viaVT = !!e.viewTransition; });

  /* ---------------------------------------------------------------- loop */
  const lit = $$('.lit-words').map((el) => ({ el, ws: $$('.w', el), n: -1 }));
  if (!RM) lit.forEach((l) => l.el.classList.add('dim'));
  const shotImgs = () => $$('.shot.in img, .cs-cover-img img');
  let imgs = [];
  function frame() {
    const p = clamp(scrollY / docH, 0, 1);
    if (RL) {
      rline.style.strokeDashoffset = (RL * (1 - p)).toFixed(1);
      const pt = rline.getPointAtLength(RL * p);
      rnib.setAttribute('cx', pt.x.toFixed(1)); rnib.setAttribute('cy', pt.y.toFixed(1));
      $$('a', ticks).forEach((a, i) => a.classList.toggle('past', p >= chapters[i].f - .002));
    }
    root.style.setProperty('--p', p.toFixed(4));
    lit.forEach((l) => {
      if (RM) return;
      const r = l.el.getBoundingClientRect();
      const k = Math.round(clamp((vh * .88 - r.top) / (r.height + vh * .3), 0, 1) * l.ws.length);
      if (k !== l.n) { l.ws.forEach((w, i) => w.classList.toggle('lit', i < k)); l.n = k; }
    });
    if (!RM) {
      imgs.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        img.style.setProperty('--py', `${(((r.top + r.height / 2) / vh - .5) * -4).toFixed(2)}%`);
      });
      if (hovering) {
        const dx = POINTER.x - ix; ix += dx * .14; iy += (POINTER.y - iy) * .14; rot += (clamp(dx * .18, -12, 12) - rot) * .12;
        nimg.style.transform = `translate3d(${ix.toFixed(1)}px,${iy.toFixed(1)}px,0) translate(-50%,-50%) rotate(${rot.toFixed(2)}deg) scale(1)`;
      }
    }
  }

  /* ---------------------------------------------------------------- boot */
  document.fonts.ready.then(() => {
    initLenis();
    layoutRail();
    imgs = shotImgs();
    Loop.add(frame); Loop.start();
    setInterval(() => { imgs = shotImgs(); }, 900);
    if (RM) { $('.cs-cover').classList.add('in'); return; }
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.cs-title .ch', { yPercent: 112, y: 0 }, { yPercent: 0, duration: 1.15, stagger: .05 })
      .fromTo('.cs-back, .cs-index', { opacity: 0, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .3, ease: 'power1.out', clearProps: 'filter' }, .1)
      .fromTo('.cs-lede', { opacity: 0, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .3, ease: 'power1.out', clearProps: 'filter' }, .2)
      .fromTo('.cs-meta', { opacity: 0, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .3, ease: 'power1.out', clearProps: 'filter' }, .3)
      .add(() => { drawIn(edge); $('.cs-cover').classList.add('in'); }, viaVT ? 0 : .35);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layoutRail, 150); });
    new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(layoutRail, 150); }).observe($('#case'));
  });
})();
