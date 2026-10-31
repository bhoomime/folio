# Bhoomie — portfolio

A hand-drawn, motion-led portfolio built from Bhoomie's own drawings.

**The idea:** one small hand-drawn ball of red wool (the dot on the "i" in *Bhoomie*) unspools into a red thread as you scroll the home page sideways, rolling as it goes. It hangs the five projects like a clothesline, gives the cat a seat, clips the polaroids, passes through her hands on the resume drawing, and finally lights the flame in her hair on the contact panel. "Click here & start from the beginning" rewinds it back onto the "i".

## Run it

```bash
python tools/serve.py
```

Then open http://localhost:5173. Opening the HTML files directly also mostly works, but page transitions need a server.

## Pages

| Page | What it does |
|---|---|
| `site/index.html` | Horizontal journey on screens at least 3:2 and tall enough for its text (vertical scroll and trackpad swipes both move it; ← → keys too). Phones, tablets, squarer monitors and short or zoomed windows get a normal vertical page instead, set in columns on wide screens. |
| `site/project.html?p=<slug>` | Vertical case study, rendered from `js/data.js`. It reads top to bottom: title and facts, the cover, a one-line summary, an overview (the problem and the solution side by side), three "what it does" cards, then numbered chapters, the reflection and the next project. On wide screens (1200px and up) a short contents list sits beside the story, with a small red mark beside the chapter you are reading; on smaller screens the contents fold into an "on this page" list. Every picture opens larger on click or Enter. |
| `site/playground.html` | "The Archive": a grid-paper pinboard you drag around (with inertia), shuffle, and click to enlarge. On touch screens it is a scrolling pile. |

## Editing content

Everything textual lives in **`site/js/data.js`**: projects (order, copy, tags, images, chapters, quote, learning), the About text and polaroids, and the Playground items.

- Images and videos are self-hosted in `site/assets/media/`. Full-size originals (copied once from your Framer uploads) live in **`media-src/`**, outside `site/` so they are never deployed. `python tools/prepare_media.py` turns each one into WebP copies 512, 1024 and 2048 px wide (`kheyt-cover-1024.webp` and so on, never upscaled) and copies MP4s across as they are.
- To add or swap an image: save it as `media-src/<name>.png` (or `.jpg`), run `python tools/prepare_media.py`, and refer to it in `data.js` by name with its original size, e.g. `im('kheyt-cover', 2859, 1482, 'alt text')`. The site picks the right size for each screen. A path or full URL also works in place of a name.
- **The girl in the hero** ("Before I knew what design was…") is your two-second film, one drawn on paper and one on the blue. `python tools/prepare_girl.py <paper film.mp4> <blue film.mp4>` turns them into transparent animated WebPs (`site/assets/media/girl-*.webp`), so her lines sit straight on the page with no background box, thickened a touch to match the other drawings. It plays once when the page opens, stops on her holding up the drawing, and replays when you point at her. With reduced motion or paused animations she shows that last frame. Only the current theme's file downloads.
- The polaroids in *Meet the lady behind the pixels* swing when you grab them but don't open a preview.
- **Case studies** are written in plain words, with the facts taken from the Figma file "Portfolio" (one page per project). Each project has `glance` (problem and solution), `features` (three cards) and `chapters`. A chapter has a short `nav` name for the contents list, a `title` that states the takeaway, and a list of `blocks`. The block types are listed at the top of `PROJECTS`:
  - `p`: paragraphs.
  - `list`: ticked or numbered.
  - `stats`: big numbers that count up.
  - `findings`: numbered cards, with or without pictures.
  - `quotes`: speech bubbles.
  - `persona`: a profile card, or several side by side.
  - `question`: the "how might we", large and centred.
  - `steps`: a numbered line, a storyboard grid, or a zig-zag with pictures (`layout: 'zig'`).
  - `images`: `'wide'`, `'row'` or `'phones'`.
  - `columns`: side-by-side lists.
  - `palette`: type and colour swatches.
  - `tree`: the app's structure.
  - `changes`: what testing changed, as "what we heard → what we changed".
  - `video`: a screen recording with a poster frame, e.g. `{ t: 'video', src: 'assets/media/span-vid-day.mp4', poster: im('span-vid-day-poster', 1440, 900), w: 1440, h: 900, alt, cap }`. It plays muted when half of it is on screen and pauses when it leaves; with reduced motion or paused animations it waits for the play button.
  - `table`: a results table, with `head` (column names), `rows` (the first cell of each row is its label) and an optional `note`. On phones it scrolls sideways inside its box.
  - `stickies`: a research board of sticky notes in columns, each column with a `title`, a `tone` (`pain`, `way`, `insight` or `key`), its `items`, and `c: 2` to make it twice as wide.
  - `more`: detail folded away behind a toggle.
  - `link`: a button link.
  - `soon`: dashed "coming soon" slots for screens that aren't ready yet.
- **Placeholders:** any picture can be a placeholder. Write `{ ph: 'what will go here', w: 16, h: 10 }` in place of `im(...)`, and add `k: 'being white-labelled'` to change the small label. When the real image is ready, swap the placeholder for `im(...)`.
- **Fonts in a palette** can load just for that page: add `gf: 'Manrope:wght@500'` (the Google Fonts family string) to the font.
- **Span** (the preventive-health clinic) is white-labelled work from an internship. Keep the real company, product and doctor names out of it.
- In case-study text, wrap the one phrase that carries a paragraph's point in `<mark>`. It gets a highlighter stroke on paper and turns yellow on the blue theme. Use `<b>` for names of things.
- The storyboards, field photos, personas and dashboards came from the Figma file. Their full-size copies are in `media-src/` (captions printed on the illustrations were cropped off, because the page sets its own captions).
- On phones, rows of photos become a swipeable strip, and picture cards with only a title sit two to a row.

## Drawings

- Your original PNGs stay untouched in the project root. `python tools/prepare_assets.py` turns them into transparent, recolourable layers in `site/assets/art/` (ink and red separated; pupils, flower heads and wall frames cut out so they can move). Re-run it if you redraw something.
- The new doodles (little Bhoomie holding her crayon drawing, the cat, the research/systems/craft sketches, notes, arrows and so on) are SVG paths in **`site/js/doodles.js`**. Each is a list of strokes: `['s', d]` ink, `['a', d]` red, `['af', d]` red fill.
- Every drawing "boils" (redraws slightly on 2s, like hand animation) while on screen, and lines draw themselves on with a pen nib.

## The thread's route

In `site/index.html`, invisible markers decide where the thread goes: `data-anchor="line"` (pass through), `"nail"`/`"pin"` (hang something, with a little sag), `"seat"` (flat, for the cat) and `"end"` (the flame). `data-loop` adds a hand-drawn loop. Move a marker's `--ax`/`--ay` to reroute it.

**When the journey goes sideways:** `layout()` in `site/js/home.js` uses it only when the window is at least 3:2 and every text block fits between the nav and the progress bar (`fitsSideways()`, which lists the blocks it checks). Blocks are placed by screen size but their text is sized in `rem`, so a short window or a reader's larger browser text can tip it into the vertical page. If you add a text block to the journey, add its selector to `FIT_BOTTOM` (and `FIT_TOP` if it sits near the top).

## Themes, sound, motion

- **Paper** (black and red on off-white) or **Blueprint** (white and yellow on your blue), toggled by the light switch in the bottom-right corner: lever up is lights on (paper), down is off (blue). Clicking flips the lever first, then the new theme spreads from the switch like spilled ink. The switch is the `switch` doodle in `site/js/doodles.js`, red on paper and white on the blue.
- **The ball of wool** is the `wool` doodle in `site/js/doodles.js`, drawn in the accent colour, so it's red on paper and yellow on the blue. Colours are tokens at the top of `site/css/base.css`.
- **Sound** is off by default (speaker icon). It's synthesized in the browser: a pencil scratch while the thread draws, soft ticks on hover, pops when things pin, bells when the flowers bloom.
- **Pause animations** (the ⏸ icon, next to sound) stops the always-on motion: line boil, grain, the cycling hero sketch, the cat's tail, swaying flowers, playground videos and the not-found cat's search (`searchingCat` in `core.js`, drawn as `cat-look` in `doodles.js`). It's remembered across visits.
- **Reduced motion** is respected: no intro, no boil or grain, no smooth scrolling or swinging, no page-to-page cover morph, and every drawing appears fully drawn. Fades stay, as gentle cross-fades.
- **Keyboard and screen readers:** every image you can enlarge is a button (Enter opens, Escape closes and returns focus), the skip link and in-page jumps move focus to where they land, overlays keep focus inside them, and the playground board can be moved with arrow keys or the on-screen arrow buttons, no dragging needed.
- **Type scale:** every text size is a role token at the top of `site/css/base.css` (`--fs-giant`, `--fs-display`, `--fs-h1`, `--fs-statement`, `--fs-h2`, `--fs-lede`, `--fs-h3`, `--fs-body-lg`, `--fs-body`, `--fs-small`, `--fs-ui`, `--fs-caption`, `--fs-micro`), each with a matching `--lh-*` line-height. Sizes are in `rem`, so text grows when a visitor raises their browser's default font size. Change a token to resize that role everywhere. Fraunces' softness (`"SOFT" 40`) is set once on `body`.
- **Colour tokens for small text:** `--accent-text` is the brand red deepened just enough for small labels to pass 4.5:1 contrast; `--accent` stays for drawings, the thread, the logo and large type. Anything small in red (labels, the nav's brackets, the cursor's "View" bubble) uses `--accent-text`.
- **White cards** (notes, polaroids, the playground intro, the learning card) have their own tokens: `--card-ink`, `--card-ink-2`, `--card-muted`, and `--card-accent`/`--card-accent-text`/`--card-on-accent`, which those cards swap in for the page accent. In the blue theme they turn blue, since yellow can't sit on white. Put any new white card on these too.
- **Labels over photos or video** sit on `--scrim` with `--on-scrim` text, which stays above 5:1 over any frame.
- Every text colour is solid (no alpha), so it reads the same on whatever surface it lands on.

## Deploy

`site/404.html` is the not-found page; Netlify, Vercel, Cloudflare Pages and GitHub Pages serve it automatically for missing paths. It resolves links from the site root with `<base href="/">`, so if you host the site in a subfolder (a GitHub Pages project site like `/portfolio/`), change that one line to `<base href="/portfolio/">`. A case-study link with an unknown or missing `?p=` shows its own "I can't find that case study" page listing all projects.

**Live:** https://folio-phi-eosin.vercel.app, the Vercel project `folio`, linked to https://github.com/bhoomime/folio. Every push to `main` deploys to production automatically; `vercel.json` tells Vercel to serve the `site/` folder as it is.

It's a static site, so it would also work if you uploaded the **`site/`** folder to Netlify (drag and drop), Cloudflare Pages or GitHub Pages. No build step. When you change CSS/JS, bump the `?v=` number (currently `?v=20`) in the four HTML files (including `404.html`) so visitors get the new files.

## Notes

- Fonts: Canela (your current display face) is commercial, so this uses **Fraunces** (Google Fonts) at a thin weight. If you own a Canela licence, swap `--f-display` in `base.css`. Body text is Satoshi (Fontshare), handwriting is Kalam.
- Page-to-page morphs (the clicked cover growing into the case-study hero) use cross-document View Transitions (Chrome, Edge, Safari 18.2+). Other browsers get a paper-curtain transition instead.
