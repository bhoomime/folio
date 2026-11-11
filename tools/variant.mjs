/*
  Builds a copy of the site without some projects, for a second Vercel project.

      HIDE_PROJECTS=span node tools/variant.mjs [site folder]

  It edits the folder in place (on Vercel that's the build's own copy of the repo):
  the project leaves data.js, its media files are deleted so they aren't served,
  and the project counts and lines that mention it are rewritten.
  With HIDE_PROJECTS unset it does nothing, so the main site deploys exactly as it is.
*/
import fs from 'node:fs';
import path from 'node:path';

const hide = (process.env.HIDE_PROJECTS || '').split(',').map((s) => s.trim()).filter(Boolean);
if (!hide.length) { console.log('variant: nothing to hide, the site stays as it is'); process.exit(0); }

const site = path.resolve(process.argv[2] || 'site');
const read = (f) => fs.readFileSync(path.join(site, f), 'utf8');
const write = (f, s) => fs.writeFileSync(path.join(site, f), s);
const fail = (msg) => { console.error(`variant: ${msg}`); process.exit(1); };

// lines that name a hidden project and have to change with it; a missing line fails the build, so stale copy gets noticed
const COPY = {
  span: [
    ['index.html', 'from rural supply chains to what your health data actually means.', 'from rural supply chains to how a store could remember your skin.'],
    ['404.html', 'from rural supply chains to preventive health', 'from rural supply chains to beauty retail'],
  ],
};
const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

// 1. data.js: each project runs from a "  {" line to a "  }," line
let lines = read('js/data.js').split('\n');
const total = lines.filter((l) => /^ {4}slug: '/.test(l)).length;
const titles = [];
for (const slug of hide) {
  const at = lines.findIndex((l) => l.startsWith(`    slug: '${slug}'`));
  if (at < 1 || lines[at - 1] !== '  {') fail(`can't find the project "${slug}" in js/data.js`);
  titles.push((lines[at].match(/title: '([^']+)'/) || [])[1]);
  let end = at;
  while (end < lines.length && !/^ {2}\},?$/.test(lines[end])) end++;
  if (end === lines.length) fail(`can't find where "${slug}" ends`);
  const blank = lines[end + 1] === '' ? 1 : 0;
  lines.splice(at - 1, end - at + 2 + blank);
}
write('js/data.js', lines.join('\n'));
const left = total - hide.length;

// 2. media: files named after the project ("span-ui-hub-1024.webp") aren't deployed
const media = path.join(site, 'assets', 'media');
let removed = 0;
for (const f of fs.readdirSync(media)) {
  if (hide.some((slug) => f.startsWith(`${slug}-`))) { fs.unlinkSync(path.join(media, f)); removed++; }
}

// 3. pages: project counts, the description's list, and lines that mention the project
const pad = (n) => String(n).padStart(2, '0');
for (const f of fs.readdirSync(site).filter((x) => x.endsWith('.html'))) {
  let s = read(f);
  s = s.replaceAll(`(${pad(total)})`, `(${pad(left)})`);
  s = s.replaceAll(`${WORDS[total]} problems`, `${WORDS[left]} problems`).replaceAll(`${WORDS[total]} case studies`, `${WORDS[left]} case studies`);
  s = s.replace(/Selected projects: ([^."]+)\./, (m, list) => `Selected projects: ${list.split(', ').filter((t) => !titles.includes(t)).join(', ')}.`);
  write(f, s);
}
for (const slug of hide) {
  for (const [f, from, to] of COPY[slug] || []) {
    const s = read(f);
    if (!s.includes(from)) fail(`"${from}" isn't in ${f} any more; update COPY in tools/variant.mjs`);
    write(f, s.replace(from, to));
  }
}

// 4. nothing of the project may be left in the code the browser loads
for (const f of ['js/data.js', 'js/home.js', 'js/project.js', 'js/core.js', 'index.html', 'project.html', '404.html', 'playground.html']) {
  const s = read(f);
  for (const slug of hide) if (s.includes(`'${slug}-`) || s.includes(`slug: '${slug}'`)) fail(`${f} still mentions "${slug}"`);
}
console.log(`variant: hid ${hide.join(', ')} (${titles.join(', ')}): ${left} projects left, ${removed} media files removed`);
