/* ------------------------------------------------------------------
   Case study page, rendered from PROJECTS in data.js.
   ?p=slug is the short overview, for someone with three minutes: title and
   facts, cover, a one-line summary, the problem and solution, numbers, a
   walkthrough (one line beside one big picture, step by step), the outcome
   and the learning, with "Read the full case study" at the top and bottom.
   ?p=slug&view=full is the whole story: the same opening, every chapter
   (detail a reader can skip folds behind a toggle; each feature follows one
   template), the reflection and the next project, with a contents list
   beside the chapters on wide screens and a "Skip to the final design" link.
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
    $('.topbar')?.remove();
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

  /* ---------------------------------------------------------------- pieces */
  const chars = (t) => [...t].map((c) => (c === ' ' ? ' ' : `<span class="ch">${c}</span>`)).join('');
  const words = (t) => t.split(' ').map((w) => `<span class="w">${w}</span>`).join(' ');
  const lbl = (img) => `Enlarge image${img.alt ? `: ${img.alt.replace(/"/g, '&quot;')}` : ''}`;
  const imgTag = (img, sizes, more = '') => `<img src="${fx(img.id, 1024)}" srcset="${srcset(img)}" sizes="${sizes}" alt="${(img.alt || '').replace(/"/g, '&quot;')}" loading="lazy" decoding="async" width="${img.w}" height="${img.h}" data-zoom="${fx(img.id, 2048)}"${more}>`;
  // a framed photo in a row of shots: unmasks and drifts as you scroll
  const shot = (img, sizes) => `<figure class="shot" style="flex:${(img.w / img.h).toFixed(4)} 1 0;aspect-ratio:${img.w}/${img.h}"><button type="button" class="zoom" aria-label="${lbl(img)}">${imgTag(img, sizes)}</button></figure>`;
  // a picture inside a card (features, findings, steps, personas)
  const ph = (img, cls = '') => `<div class="pic ph ${cls}" role="img" aria-label="Placeholder: ${img.ph}" style="--ar:${img.w || 4}/${img.h || 3}"><span class="ph-in"><span class="ph-k hand">${img.k || 'coming soon'}</span><span class="ph-l">${img.ph}</span></span></div>`;
  const pic = (img, sizes = '(min-width: 860px) 30vw, 92vw', cls = '') => (img.ph ? ph(img, cls) : `<button type="button" class="zoom pic ${cls}" aria-label="${lbl(img)}" style="--ar:${img.w}/${img.h}">${imgTag(img, sizes)}</button>`);
  const SIZES = { wide: '(min-width: 1400px) 1000px, 92vw', phones: '(min-width: 860px) 18vw, 62vw' };
  const list = (items, cls = '') => `<ul class="${cls}">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
  const isNum = (n) => typeof n === 'number';
  const head = (b, lvl = 3) => (b.title ? `<h${lvl} class="blk-h">${b.title}</h${lvl}>` : '') + (b.intro ? `<p class="blk-intro">${b.intro}</p>` : '');
  const tall = (img) => img && img.h > img.w;
  // a screen recording that loops quietly inside a browser frame: no control bar, one play/pause button
  const loop = (v) => `<figure class="loop"><div class="dev"><span class="dev-bar" aria-hidden="true"><i></i><i></i><i></i></span><div class="dev-screen" style="--ar:${v.w}/${v.h}"><video src="${v.src}" poster="${fx(v.poster.id, 2048)}" muted loop playsinline preload="none" aria-label="${v.alt.replace(/"/g, '&quot;')}"></video></div></div><button type="button" class="loop-btn" aria-label="Play the recording"><span aria-hidden="true"></span></button></figure>`;
  // a screen with numbered pins on it; the numbered list beside it says what each pin points to
  const annotated = (img, notes, sizes) => `<div class="annot">
      <div class="annot-pic">${pic(img, sizes)}${notes.map((n, i) => `<span class="pin" style="left:${n.x}%;top:${n.y}%" data-pin="${i}" aria-hidden="true">${i + 1}</span>`).join('')}</div>
      <ol class="annot-list">${notes.map((n, i) => `<li data-pin="${i}"><span class="pin-n" aria-hidden="true">${i + 1}</span><span>${n.text}</span></li>`).join('')}</ol>
    </div>`;

  /* ---------------------------------------------------------------- blocks
     Each chapter is a list of blocks; `t` picks the kind. Text can carry
     <mark> (a highlighter stroke on the phrase that matters) and <b>. */
  const BLOCK = {
    p: (b) => `<div class="blk blk-p">${head(b)}${b.text.map((t, i) => `<p class="rise${b.lead && !i ? ' lead' : ''}">${t}</p>`).join('')}</div>`,

    list: (b) => `<div class="blk blk-list rise">${head(b)}${list(b.items, `ticks${b.numbered ? ' numbered' : ''}`)}</div>`,

    stats: (b) => `<div class="blk blk-stats">${head(b)}<ul class="stats n-${b.items.length}">${b.items.map((s) => `<li class="rise">
        <span class="st-n">${s.pre || ''}${isNum(s.n) ? `<span class="num" data-n="${s.n}">${s.n}</span>` : s.n}<span class="st-u">${s.unit || ''}</span></span>
        <span class="st-l">${s.label}</span></li>`).join('')}</ul>${b.note ? `<p class="blk-note">${b.note}</p>` : ''}</div>`,

    findings: (b) => {
      const h = b.title ? 4 : 3;
      const imgs = b.items.some((f) => f.img);
      return `<div class="blk blk-find">${head(b)}<ol class="find${imgs ? ' with-img' : ''}${b.items.some((f) => f.body) ? '' : ' terse'} c-${b.cols || (b.items.length % 3 === 0 || b.items.length > 4 ? 3 : 2)}">${b.items.map((f, i) => `<li class="rise">
        ${f.img ? pic(f.img, '(min-width: 860px) 24vw, 92vw', 'f-pic') : ''}
        <div class="f-txt">${b.plain ? '' : `<span class="f-n hand" aria-hidden="true">${pad(i + 1)}</span>`}<h${h}>${f.title}</h${h}>${f.body ? `<p>${f.body}</p>` : ''}</div></li>`).join('')}</ol></div>`;
    },

    quotes: (b) => `<div class="blk blk-quotes">${head(b)}<ul class="quotes">${b.items.map((q, i) => `<li class="rise" style="--tilt:${[-1.2, .9, -.5, 1.3, -.9, .6][i % 6]}deg">
        <blockquote><p>${q.q}</p></blockquote>${q.who ? `<p class="q-who">${q.who}</p>` : ''}</li>`).join('')}</ul></div>`,

    persona: (b) => {
      const one = (p, compact) => `<article class="persona${compact ? ' compact' : ''} rise">
        <div class="pe-top">
          <div class="pe-pic">${p.img ? pic(p.img, compact ? '160px' : '(min-width: 860px) 300px, 50vw') : `<span class="pe-initial serif" aria-hidden="true">${p.name[0]}</span>`}</div>
          <div class="pe-id">
            ${p.role ? `<p class="pe-role hand">${p.role}</p>` : ''}
            <h3>${p.name}</h3>
            ${p.facts ? list(p.facts, 'pe-facts') : ''}
          </div>
        </div>
        ${p.quote ? `<blockquote class="pe-quote"><p>“${p.quote}”</p></blockquote>` : ''}
        ${p.bio ? `<p class="pe-bio">${p.bio}</p>` : ''}
        ${p.lists ? `<div class="pe-lists">${p.lists.map(([h, items]) => `<div><h4>${h}</h4>${list(items, 'ticks')}</div>`).join('')}</div>` : ''}
      </article>`;
      return `<div class="blk blk-persona">${head(b)}${b.items ? `<div class="personas n-${b.items.length}">${b.items.map((p) => one(p, true)).join('')}</div>` : one(b)}</div>`;
    },

    question: (b) => `<figure class="blk blk-q rise"><figcaption class="hand">${b.label || 'the question'}</figcaption><p class="serif">${b.text}</p>${b.note ? `<p class="q-note">${b.note}</p>` : ''}</figure>`,

    steps: (b) => {
      const imgs = b.items.some((s) => s.img);
      const lay = imgs ? (b.layout || 'grid') : 'line';
      return `<div class="blk blk-steps">${head(b)}<ol class="steps s-${lay}${b.cols ? ` c-${b.cols}` : ''}${b.items.some((x) => x.body) ? '' : ' terse'}${b.ar && imgs ? ' fixed' : ''}"${b.ar && imgs ? ` style="--sar:${b.ar}"` : ''}>${b.items.map((s, i) => `<li class="rise">
        ${s.img ? pic(s.img, lay === 'zig' ? '(min-width: 860px) 40vw, 92vw' : '(min-width: 860px) 24vw, 92vw', 's-pic') : ''}
        <div class="s-txt"><span class="s-n hand" aria-hidden="true">${pad(i + 1)}</span>${s.n ? `<span class="s-k">${s.n}</span>` : ''}<h4>${s.title}</h4>${s.body ? `<p>${s.body}</p>` : ''}</div></li>`).join('')}</ol></div>`;
    },

    images: (b) => {
      const layout = b.layout || 'row';
      const sizes = SIZES[layout] || `(min-width: 860px) ${Math.round(80 / b.images.length)}vw, 92vw`;
      return `<div class="blk blk-img${b.bleed ? ' bleed' : ''}">${head(b)}<div class="shots shots-${layout}${b.ui ? ' shots-ui' : ''} ${b.narrow ? 'shots-narrow' : ''}">${b.images.map((m) => shot(m, sizes)).join('')}</div>${b.cap ? `<p class="cap">${b.cap}</p>` : ''}</div>`;
    },

    columns: (b) => `<div class="blk blk-cols">${head(b)}<div class="cols n-${b.items.length}">${b.items.map((c) => `<div class="col rise${c.tone ? ` tone-${c.tone}` : ''}">
        <h4>${c.title}</h4>${c.body ? `<p>${c.body}</p>` : ''}${c.items ? list(c.items, 'ticks') : ''}</div>`).join('')}</div></div>`,

    palette: (b) => `<div class="blk blk-pal rise">${head(b)}<div class="pal">
        <div class="pal-type">${b.fonts.map((f) => `<p><span class="pal-aa" style="font-family:${(f.css || 'var(--f-body)').replace(/"/g, "'")}" aria-hidden="true">Aa</span><span class="pal-name">${f.name}</span>${f.note ? `<span class="pal-note">${f.note}</span>` : ''}</p>`).join('')}</div>
        <ul class="pal-colors">${b.colors.map((c) => `<li><span class="sw" style="background:${c}"></span><code>${c}</code></li>`).join('')}</ul>
      </div></div>`,

    tree: (b) => `<div class="blk blk-tree rise">${head(b)}<div class="tree"><p class="tr-root">${b.root}</p><ul>${b.branches.map(([h, kids]) => `<li><span class="tr-b">${h}</span><ol class="tr-kids">${kids.map((k) => `<li>${k}</li>`).join('')}</ol></li>`).join('')}</ul></div></div>`,

    changes: (b) => `<div class="blk blk-changes">${head(b)}<ol class="changes">${b.items.map((c) => `<li class="rise">
        <div class="c-heard"><p class="hand">what we heard</p><p>${c.heard}</p></div>
        <span class="c-arrow" aria-hidden="true">${doodle('arrow', { pre: true })}</span>
        <div class="c-did"><p class="hand">what we changed</p><p>${c.changed}</p></div>
        ${c.img ? pic(c.img, '(min-width: 860px) 40vw, 92vw', 'c-pic') : ''}</li>`).join('')}</ol></div>`,

    soon: (b) => `<div class="blk blk-soon">${head(b)}<div class="soon n-${b.items.length}">${b.items.map((it) => ph(it)).join('')}</div>${b.note ? `<p class="blk-note">${b.note}</p>` : ''}</div>`,

    /* a screen recording: plays muted while on screen, with controls, and never by itself when motion is reduced or paused */
    video: (b) => `<figure class="blk blk-vid rise">${head(b)}<div class="vid" style="--ar:${b.w}/${b.h}"><video src="${b.src}" poster="${fx(b.poster.id, 2048)}" muted loop playsinline preload="none" controls aria-label="${b.alt.replace(/"/g, '&quot;')}"></video></div>${b.cap ? `<figcaption class="cap">${b.cap}</figcaption>` : ''}</figure>`,

    table: (b) => `<div class="blk blk-table rise">${head(b)}<div class="tbl-wrap" tabindex="0" role="region" aria-label="${(b.title || 'Table').replace(/"/g, '&quot;')}"><table class="tbl"><thead><tr>${b.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join('')}</tr>`).join('')}</tbody></table></div>${b.note ? `<p class="blk-note">${b.note}</p>` : ''}</div>`,

    /* a research board, re-set as sticky notes */
    stickies: (b) => `<div class="blk blk-stick rise">${head(b)}<div class="stick-board">${b.cols.map((c) => `<div class="stick-col" style="--c:${c.c || 1}"><h4 class="hand">${c.title}</h4><ul>${c.items.map((t, i) => `<li class="stick tone-${c.tone}" style="--r:${[-1.4, 1.1, -.5, 1.6, -1, .6][i % 6]}deg">${t}</li>`).join('')}</ul></div>`).join('')}</div>${b.note ? `<p class="blk-note">${b.note}</p>` : ''}</div>`,

    /* the overview's walkthrough: one line beside one big picture, step by step */
    walk: (b) => `<ol class="walk">${b.items.map((w, i) => `<li class="walk-row rise${tall(w.img) ? ' tall' : ''}">
        <p class="walk-line"><span class="walk-n hand" aria-hidden="true">${pad(i + 1)}</span>${w.line}</p>
        <div class="walk-pic">${w.video ? loop(w.video) : pic(w.img, tall(w.img) ? '(min-width: 860px) 340px, 80vw' : '(min-width: 1200px) 640px, (min-width: 860px) 55vw, 92vw')}</div></li>`).join('')}</ol>`,

    /* research artifacts as papers in a folder: they peek out, rise on hover or focus, and open full size */
    papers: (b) => `<div class="blk blk-papers">${head(b)}<ul class="papers">${b.items.map((p, i) => `<li class="rise" style="--tilt:${[-2, 1.6, -1.2, 2.2, -1.6][i % 5]}deg">
        <button type="button" class="zoom paper" aria-label="Open ${p.label.replace(/"/g, '&quot;')}${p.img.alt ? `: ${p.img.alt.replace(/"/g, '&quot;')}` : ''}">
          <span class="paper-tab" aria-hidden="true"></span><span class="paper-back" aria-hidden="true"></span>
          <span class="paper-sheet">${imgTag(p.img, '(min-width: 860px) 240px, 45vw')}</span>
          <span class="paper-pocket" aria-hidden="true"></span>
        </button>
        <p class="paper-label hand">${p.label}</p></li>`).join('')}</ul>${b.note ? `<p class="blk-note">${b.note}</p>` : ''}</div>`,

    /* one feature, always in the same order: the problem, what it does, the screen, the decisions and why */
    feature: (b) => `<article class="blk fx">
        <header class="fx-head rise"><p class="fx-kick hand">feature ${pad(b.n)}</p><h3>${b.title}</h3></header>
        <div class="fx-ps rise">
          <div><h4 class="hand">the problem</h4><p>${b.pain}</p></div>
          <div><h4 class="hand">what it does</h4><p>${b.solve}</p></div>
        </div>
        <div class="fx-pic rise${tall(b.img) ? ' tall' : ''}">${b.notes ? annotated(b.img, b.notes, SIZES.wide) : b.video ? loop(b.video) : pic(b.img, tall(b.img) ? '(min-width: 860px) 380px, 80vw' : SIZES.wide)}</div>
        <h4 class="fx-dh hand rise">the decisions</h4>
        <ol class="fx-dec">${b.decisions.map((d, i) => `<li class="rise"><span class="fx-n" aria-hidden="true">${i + 1}</span><p class="fx-d">${d.d}</p><p class="fx-why"><b>Why:</b> ${d.why}</p></li>`).join('')}</ol>
      </article>`,

    more: (b) => `<details class="blk blk-more"><summary><span>${b.summary}</span><span class="plus" aria-hidden="true"></span></summary><div class="more-in">${b.blocks.map(block).join('')}</div></details>`,

    link: (b) => `<p class="blk blk-link rise"><a class="sbtn" href="${b.href}" target="_blank" rel="noopener">${b.label} <span class="arr">↗</span></a></p>`,
  };
  // detail a skimming reader can skip folds behind a toggle: a whole chapter (`fold: true`) or one block (`fold: 'label'`)
  const fold = (label, inner, cls = '') => `<details class="blk blk-more${cls}"><summary><span>${label}</span><span class="plus" aria-hidden="true"></span></summary><div class="more-in">${inner}</div></details>`;
  function block(b) {
    const html = (BLOCK[b.t] || BLOCK.p)(b);
    return b.fold ? fold(b.fold, html) : html;
  }

  /* reading time, from the words a reader actually reads (not image names or settings) */
  const SKIP = new Set(['t', 'id', 'src', 'alt', 'w', 'h', 'layout', 'tone', 'ar', 'cols', 'k', 'ph', 'poster', 'gf', 'css', 'colors', 'c', 'fold', 'ui']);
  const textOf = (x) => (typeof x === 'string' ? x : Array.isArray(x) ? x.map(textOf).join(' ') : x && typeof x === 'object' ? Object.keys(x).filter((k) => !SKIP.has(k)).map((k) => textOf(x[k])).join(' ') : '');
  const mins = (x) => Math.max(1, Math.round(textOf(x).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220));

  const chapter = (c, i) => `<section class="chap${c.fold ? ' folded' : ''}" id="ch-${i + 1}" data-ch="${c.nav}" aria-labelledby="ch-h-${i + 1}">
      <header class="ch-head rise">
        <p class="ch-kick"><span class="ch-num">${pad(i + 1)}</span><span class="hand">${c.nav}</span></p>
        <h2 id="ch-h-${i + 1}">${c.title}</h2>
        ${c.lede ? `<p class="ch-lede">${c.lede}</p>` : ''}
      </header>
      ${c.fold ? fold(`Read this part · ${mins(c.blocks)} min`, c.blocks.map(block).join(''), ' ch-fold') : c.blocks.map(block).join('')}
    </section>`;

  /* two ways to read: a short overview first (?p=slug), the whole story one click away (&view=full) */
  const FULL = qs.get('view') === 'full';
  const O = P.ov || {};
  const urlOv = `project.html?p=${P.slug}`, urlFull = `${urlOv}&view=full`;
  const fullMin = mins([P.glance, P.chapters, P.quote, P.learning]);
  const ovMin = Math.max(2, mins([P.summary, P.glance, O, P.learning]));
  // the chapter where the final design starts, for "Skip to the final design"
  const designAt = P.chapters.findIndex((c) => c.design);

  /* contents (full case study only): the overview, every chapter, the reflection */
  const toc = FULL ? [{ id: 'overview', nav: 'Overview' }, ...P.chapters.map((c, i) => ({ id: `ch-${i + 1}`, nav: c.nav })), { id: 'reflection', nav: 'Reflection' }] : [];
  // chapters club into a few parts (`part` on each chapter): the contents list shows the parts, and opens the one you're in
  const parts = [];
  P.chapters.forEach((c, i) => { const g = parts[parts.length - 1]; if (g && c.part && g.name === c.part) g.ch.push(i); else parts.push({ name: c.part || c.nav, ch: [i] }); });
  const tocList = (cls) => `<ol class="${cls}">
      <li><a href="#overview" data-i="0">Overview</a></li>
      ${parts.map((g) => {
        const first = g.ch[0] + 1;
        if (g.ch.length === 1) return `<li><a href="#ch-${first}" data-i="${first}">${P.chapters[g.ch[0]].nav}</a></li>`;
        // a chapter named like its part is the part's own link, so it isn't listed twice
        const sub = g.ch.filter((i) => P.chapters[i].nav !== g.name);
        return `<li class="toc-g" data-g="${g.ch.map((i) => i + 1).join(' ')}"><a class="toc-gl" href="#ch-${first}" data-i="${first}">${g.name}</a><ol class="toc-sub">${sub.map((i) => `<li><a href="#ch-${i + 1}" data-i="${i + 1}">${P.chapters[i].nav}</a></li>`).join('')}</ol></li>`;
      }).join('')}
      <li><a href="#reflection" data-i="${P.chapters.length + 1}">Reflection</a></li>
    </ol>`;
  const G = P.glance;

  const glanceHTML = `<section class="cs-glance" id="overview" aria-labelledby="ov-h">
          <h2 class="vh" id="ov-h">Overview</h2>
          <div class="gl-grid">
            <div class="gl rise"><h3 class="hand">the problem</h3><p>${G.problem}</p></div>
            <div class="gl rise"><h3 class="hand">${G.solutionLabel || 'the solution'}</h3><p>${G.solution}</p></div>
          </div>
        </section>`;
  const learningHTML = `<div class="cs-learning"><div class="learn"><span class="tape"></span>${doodle('bulb', { pre: true })}<h3>key design learning</h3><p>${P.learning}</p></div></div>`;

  const modeBar = FULL
    ? `<div class="cs-mode"><a class="cs-mode-back" href="${urlOv}"><span aria-hidden="true">←</span> Back to the ${ovMin}-minute overview</a>${designAt >= 0 ? `<a class="cs-skip" href="#ch-${designAt + 1}">Skip to the final design <span aria-hidden="true">↓</span></a>` : ''}<p class="cs-mode-note">The full case study · about ${fullMin} min</p></div>`
    : `<div class="cs-mode"><p class="cs-mode-note"><span class="hand">short on time?</span> This is the ${ovMin}-minute overview.</p><a class="sbtn primary" href="${urlFull}">Read the full case study <span class="cs-mode-min">${fullMin} min</span> <span class="arr">→</span></a></div>`;

  const ovSec = (id, kick, h, inner) => `<section class="ov-sec" aria-labelledby="ov-${id}"><p class="ch-kick"><span class="hand">${kick}</span></p><h2 id="ov-${id}">${h}</h2>${inner}</section>`;
  const overviewBody = `<div class="cs-body ov">
      <aside class="toc ov-side" aria-label="Full case study">
        <p class="toc-h hand">the overview</p>
        <a class="ov-side-a" href="${urlFull}">Read the full case study <span>about ${fullMin} min <span aria-hidden="true">→</span></span></a>
      </aside>
      <div class="cs-main">
        ${glanceHTML}
        ${O.impact ? ovSec('nums', 'in numbers', O.impactTitle || 'What it came to', BLOCK.stats({ items: O.impact })) : ''}
        ${O.walk ? ovSec('walk', 'the work', O.walkTitle || 'From the research to the final design', `${O.part ? `<p class="ov-part rise"><span class="hand">my part</span> ${O.part}</p>` : ''}${BLOCK.walk({ items: O.walk })}`) : ''}
        ${O.outcome ? ovSec('out', 'the outcome', O.outcomeTitle || 'What came of it', `<div class="blk blk-p"><p class="rise lead">${O.outcome}</p></div>`) : ''}
        <section class="cs-reflect" aria-label="Key design learning">${learningHTML}</section>
        <section class="ov-cta" aria-labelledby="ov-cta-h">
          <h2 id="ov-cta-h">Want the whole story?</h2>
          <p>The full case study walks through every step: the research, the decisions and what testing changed. About ${fullMin} minutes.</p>
          <a class="sbtn primary" href="${urlFull}">Read the full case study <span class="arr">→</span></a>
          <p class="ov-jump-h hand">or go straight to one part</p>
          <ul class="ov-jump">${parts.map((g) => `<li><a href="${urlFull}#ch-${g.ch[0] + 1}">${g.ch.length === 1 ? P.chapters[g.ch[0]].nav : g.name}</a></li>`).join('')}</ul>
        </section>
      </div>
    </div>`;
  const fullBody = `<div class="cs-body">
      <nav class="toc" aria-label="On this page">
        <p class="toc-h hand">on this page</p>
        <div class="toc-in"><span class="toc-mark" aria-hidden="true"></span>${tocList('toc-list')}</div>
      </nav>
      <div class="cs-main">
        ${glanceHTML}
        <details class="toc-m"><summary><span class="hand">on this page</span><span class="plus" aria-hidden="true"></span></summary>${tocList('toc-m-list')}</details>
        ${P.chapters.map(chapter).join('')}
        <section class="cs-reflect" id="reflection" aria-labelledby="rf-h">
          <h2 class="vh" id="rf-h">Reflection</h2>
          <div class="cs-quote"><blockquote><span class="qm l" aria-hidden="true">${doodle('quote', { pre: true })}</span><p class="lit-words">${words(P.quote)}</p><span class="qm r" aria-hidden="true">${doodle('quote', { pre: true })}</span></blockquote><p class="cite hand">reflecting on ${P.title}</p></div>
          ${learningHTML}
        </section>
        <div class="ov-cta ov-cta-back"><a class="sbtn" href="${urlOv}"><span aria-hidden="true">←</span> Back to the ${ovMin}-minute overview</a></div>
      </div>
    </div>`;

  $('#case').innerHTML = `<div class="wrap">
    <header class="cs-hero">
      <a class="cs-back" href="index.html#works"><span aria-hidden="true">←</span> all projects</a>
      <p class="cs-index"><span class="hand">case study</span> ${pad(idx + 1)} / ${pad(N)} · ${P.year}</p>
      <h1 class="cs-title serif" aria-label="${P.title}"><span class="ln" aria-hidden="true">${chars(P.title)}</span></h1>
      <p class="cs-lede">${P.lede}</p>
      <dl class="cs-meta">${P.meta.map(([k, v]) => `<div><dt>${k.toLowerCase()}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${modeBar}
    </header>
    <figure class="cs-cover">
      <div class="cs-cover-frame"><span class="tape"></span><svg class="frame-edge dd pre" aria-hidden="true"><path pathLength="1" style="--dur:1.4s"/></svg>
        <div class="cs-cover-img"><button type="button" class="zoom" aria-label="${lbl(P.hero)}"><img src="${fx(P.hero.id, 2048)}" srcset="${srcset(P.hero)}" sizes="(min-width: 1400px) 1320px, 94vw" alt="${P.hero.alt || P.title}" fetchpriority="high" width="${P.hero.w}" height="${P.hero.h}" data-zoom="${fx(P.hero.id, 2048)}"></button></div>
      </div>
    </figure>
    <section class="cs-summary" aria-label="Summary"><p class="lit-words">${words(P.summary)}</p></section>

    ${FULL ? fullBody : overviewBody}

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

  const gf = [...new Set(P.chapters.flatMap((c) => c.blocks).filter((b) => b.t === 'palette').flatMap((b) => b.fonts.map((f) => f.gf)).filter(Boolean))];
  if (gf.length) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${gf.map((f) => `family=${f}`).join('&')}&display=swap">`);

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
    if (RM || !n) return;
    gsap.to(o, { v: n, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-IN'); } });
  };
  onEnter($$('.rise, .shot'), (el) => {
    el.classList.add('in');
    $$('.num', el).forEach(count);
    $$('.c-arrow .dd', el).forEach((d) => drawIn(d, .25));
  }, { margin: '0px 0px -8% 0px' });
  onEnter([$('.cs-quote')].filter(Boolean), (el) => { $$('.qm .dd', el).forEach((d, i) => drawIn(d, i * .5)); }, { margin: '0px 0px -25% 0px' });
  onEnter([$('.learn')].filter(Boolean), (el) => drawIn($('.dd', el), .2), { margin: '0px 0px -20% 0px' });
  if (RM) $$('.dd.pre').forEach((d) => d.classList.remove('pre'));
  // recordings play while they're on screen, unless motion is reduced or paused
  const vids = $$('.vid video');
  if (vids.length && !RM) {
    const vio = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting && !root.classList.contains('still')) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    }), { threshold: .5 });
    vids.forEach((v) => vio.observe(v));
  }
  // loops in a browser frame play while on screen, unless motion is reduced or paused; the button always works, and the visitor's choice wins
  $$('.loop').forEach((f) => {
    const v = $('video', f), btn = $('.loop-btn', f);
    let chosen = '';
    const set = (on) => { f.classList.toggle('playing', on); btn.setAttribute('aria-label', on ? 'Pause the recording' : 'Play the recording'); };
    const play = () => { v.preload = 'auto'; v.play().then(() => set(true)).catch(() => set(false)); };
    const stop = () => { v.pause(); set(false); };
    btn.addEventListener('click', () => { if (v.paused) { chosen = 'play'; play(); } else { chosen = 'pause'; stop(); } });
    new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { if (!v.paused) stop(); return; }
      if (chosen === 'play' || (!chosen && !RM && !root.classList.contains('still'))) play();
    }, { threshold: .5 }).observe(v);
  });
  // a pin on a screen lights up with its line in the list
  $$('.annot').forEach((a) => {
    const pins = $$('.pin', a);
    $$('.annot-list li', a).forEach((li) => {
      const p = pins[+li.dataset.pin];
      li.addEventListener('pointerenter', () => p.classList.add('hot'));
      li.addEventListener('pointerleave', () => p.classList.remove('hot'));
    });
  });

  /* ---------------------------------------------------------------- contents: a short red mark slides to where you are */
  const mark = $('.toc-mark');
  const links = $$('.toc-list a');
  const groups = $$('.toc-list .toc-g');
  const secs = toc.map((t) => document.getElementById(t.id));
  let docH = 1, vh = innerHeight, cur = -1;
  // the link for a section: its own line inside an open part, otherwise the part's link
  const linkFor = (i) => links.find((a) => +a.dataset.i === i && a.closest('.toc-sub')) || links.find((a) => +a.dataset.i === i);
  const placeMark = () => {
    if (!mark) return;
    const a = linkFor(cur);
    mark.classList.toggle('on', !!a);
    if (a) { mark.style.transform = `translateY(${a.offsetTop + 6}px)`; mark.style.height = `${a.offsetHeight - 12}px`; }
  };
  function layoutToc() {
    vh = innerHeight; docH = Math.max(1, document.documentElement.scrollHeight - vh);
    placeMark();
  }
  links.concat($$('.toc-m-list a')).forEach((a) => a.addEventListener('click', (e) => {
    const el = secs[+a.dataset.i];
    if (!el) return;
    e.preventDefault();
    a.closest('details')?.removeAttribute('open');
    $('details.ch-fold', el)?.setAttribute('open', '');
    scrollToY(el.getBoundingClientRect().top + scrollY - 96, { duration: 1.2 });
    el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });
    Sound.tick(+a.dataset.i);
  }));

  // "Skip to the final design": open that chapter if it's folded, then go to it
  $('.cs-skip')?.addEventListener('click', (e) => {
    const el = document.getElementById(e.currentTarget.getAttribute('href').slice(1));
    if (!el) return;
    e.preventDefault();
    $('details.ch-fold', el)?.setAttribute('open', '');
    scrollToY(el.getBoundingClientRect().top + scrollY - 96, { duration: 1.2 });
    el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });
  });

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
    root.style.setProperty('--p', p.toFixed(4));
    // where you are: the last section whose top has passed the reading line, and how far through it
    const line = vh * .32;
    let i = -1;
    secs.forEach((s, k) => { if (s && s.getBoundingClientRect().top <= line) i = k; });
    if (i !== cur) {
      cur = i;
      groups.forEach((g) => g.classList.toggle('open', g.dataset.g.split(' ').includes(String(i))));
      const now = linkFor(i);
      links.forEach((a) => { a.classList.toggle('cur', a === now); if (a === now) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
      placeMark();
    }
    lit.forEach((l) => {
      if (RM) return;
      const r = l.el.getBoundingClientRect();
      const k = Math.round(clamp((vh * .88 - r.top) / (r.height + vh * .3), 0, 1) * l.ws.length);
      if (k !== l.n) { l.ws.forEach((w, j) => w.classList.toggle('lit', j < k)); l.n = k; }
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
    layoutToc();
    imgs = shotImgs();
    Loop.add(frame); Loop.start();
    setInterval(() => { imgs = shotImgs(); }, 900);
    let rt; const relayout = () => { clearTimeout(rt); rt = setTimeout(layoutToc, 150); };
    addEventListener('resize', relayout);
    new ResizeObserver(relayout).observe($('#case'));
    // arriving from the overview's "go straight to one part": open that chapter if it's folded, then go to it
    const target = FULL && location.hash && document.getElementById(location.hash.slice(1));
    if (target) {
      $('details.ch-fold', target)?.setAttribute('open', '');
      requestAnimationFrame(() => scrollToY(target.getBoundingClientRect().top + scrollY - 96, { immediate: true }));
    }
    if (RM) { $('.cs-cover').classList.add('in'); return; }
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.cs-title .ch', { yPercent: 112, y: 0 }, { yPercent: 0, duration: 1.15, stagger: .05 })
      .fromTo('.cs-back, .cs-index', { opacity: 0, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .3, ease: 'power1.out', clearProps: 'filter' }, .1)
      .fromTo('.cs-lede', { opacity: 0, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .3, ease: 'power1.out', clearProps: 'filter' }, .2)
      .fromTo('.cs-meta, .cs-mode', { opacity: 0, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .3, ease: 'power1.out', clearProps: 'filter' }, .3)
      .add(() => { drawIn(edge); $('.cs-cover').classList.add('in'); }, viaVT ? 0 : .35);
  });
})();
