// Every root-relative href in the built site must resolve to a file in dist/. Run after `astro build`
// (the deploy does). Added 20 Nov 2026 after ~100 links to locale pages that were never built
// (/ar/blog/…, /es/studio/, /ru/404/) had shipped from the language switcher and the nav.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const files = [];
const walk = (d) => { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } };
walk(root);
const missing = new Map();
for (const f of files) {
  for (const [, h] of readFileSync(f, 'utf8').matchAll(/href="(\/[^"#?]*)/g)) {
    if (h.startsWith('//')) continue;
    const ok = existsSync(join(root, h)) && statSync(join(root, h)).isFile() || existsSync(join(root, h, 'index.html')) || existsSync(join(root, h.replace(/\/$/, '') + '.html'));
    if (!ok) missing.set(h, f);
  }
}
if (missing.size) {
  for (const [h, f] of [...missing].slice(0, 20)) console.error(`missing ${h}  (linked from ${f})`);
  console.error(`${missing.size} internal links point at nothing`);
  process.exit(1);
}
console.log(`links ok: ${files.length} pages checked`);
