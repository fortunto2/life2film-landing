// Every root-relative href in the built site must resolve to a file in dist/. Run after `astro build`
// (the deploy does). Added 20 Nov 2026 after ~100 links to locale pages that were never built
// (/ar/blog/…, /es/studio/, /ru/404/) had shipped from the language switcher and the nav.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const files = [];
const built = new Set(); // every file under dist/, as a site path
const walk = (d) => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else { built.add(p.slice(root.length)); if (p.endsWith('.html')) files.push(p); } } };
walk(root);
const resolves = (h) => built.has(h) || built.has(`${h.replace(/\/$/, '')}/index.html`) || built.has(`${h.replace(/\/$/, '')}.html`);
const missing = new Map();
for (const f of files) {
  for (const [, h] of readFileSync(f, 'utf8').matchAll(/href="(\/[^"#?]*)/g)) {
    if (h.startsWith('//')) continue;
    if (!resolves(decodeURI(h))) missing.set(h, f);
  }
}
if (missing.size) {
  for (const [h, f] of [...missing].slice(0, 20)) console.error(`missing ${h}  (linked from ${f})`);
  console.error(`${missing.size} internal links point at nothing`);
  process.exit(1);
}
// Links to our other sites (from the shared registry) must answer 200 too: on 20 Nov 2026 every
// locale hub shipped visayes.app/ru/en/... for a week, and only an internal check had run.
const ours = /href="(https:\/\/(?:visayes\.app|superduperai\.co)\/[^"#?]*)/g;
const external = new Map();
for (const f of files) for (const [, u] of readFileSync(f, 'utf8').matchAll(ours)) external.set(u, f);
const dead = [];
await Promise.all([...external].map(async ([u, f]) => {
  const r = await fetch(u, { method: 'HEAD', redirect: 'follow' }).catch(() => null);
  if (!r || r.status !== 200) dead.push(`${r?.status ?? 'no answer'} ${u}  (linked from ${f})`);
}));
if (dead.length) {
  for (const d of dead.slice(0, 20)) console.error(d);
  console.error(`${dead.length} links to our other sites are dead`);
  process.exit(1);
}
console.log(`links ok: ${files.length} pages checked, ${external.size} links to our other sites answer 200`);
