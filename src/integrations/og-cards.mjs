/**
 * A social card for every page, drawn after the build from the page itself.
 *
 * Until 16 Nov 2026 every page shared /img/og.png, a card that says "Free video tools that run in
 * your browser": a link to the Studio page posted in Telegram previewed as the browser tools. Now
 * `Base.astro` points each page at `/og/<its path>.jpg`, and this integration reads every built
 * page, takes its headline (the h1, or the og:title where the h1 is a bare word like "Blog") and
 * its description, and draws that card with a picture of what the page is about: the Mac window
 * for Studio and the agent guides, each browser tool as it looks with a video in it
 * (public/img/tools/<tool>.jpg), the iPhone screens for the rest.
 *
 * Arabic pages point at the English page's card: satori lays text out glyph by glyph with no
 * shaping and no right-to-left, so Arabic would come out as disconnected letters in reverse.
 *
 * Drawn with satori (layout) and resvg (pixels), written as JPEG by sharp, cached by content in
 * node_modules/.cache/og-cards, so a build that changes no headline draws nothing. The build fails
 * if any page names a card that was not written.
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const SITE = 'https://life2film.com';
const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const CACHE = join(ROOT, 'node_modules/.cache/og-cards');
const IMG = join(ROOT, 'public/img');
/** Bump when the drawing changes, so cached cards are drawn again. */
const DESIGN = 5;

const W = 1200;
const H = 630;
const C = { bg: '#050506', fg: '#f2f2f4', muted: '#8a8a95', line: '#26262e', cyan: '#00f2e0', blue: '#017aff', pink: '#fa3fa5', orange: '#ffa61d', yellow: '#feff00' };
const GRAD = `linear-gradient(90deg, ${C.cyan}, ${C.blue} 35%, ${C.pink} 65%, ${C.orange} 85%, ${C.yellow})`;

/**
 * Which picture a page gets, by its path with the language prefix taken off. First match wins.
 * `wide` is a Mac screenshot under the headline; `phones` is two iPhone screens beside it.
 */
const PICTURES = [
  [/^\/studio\/agent\//, { wide: 'studio-agent.jpg', label: 'Life2Film Studio' }],
  [/^\/studio\//, { wide: 'studio.jpg', label: 'Life2Film Studio' }],
  [/^\/guides\/edit-video-with-/, { wide: 'studio-agent.jpg', label: 'Life2Film Studio' }],
  [/^\/guides\//, { wide: 'studio-agent.jpg', label: 'Life2Film Studio' }],
  [/^\/engine\//, { wide: 'studio-sound.jpg', label: 'life2film-engine' }],
  [/^\/tools\/([a-z0-9-]+)\//, { tool: true, label: 'Life2Film tools' }],
  [/^\/tools\//, { phones: ['shot-03.jpg', 'shot-02.jpg'], label: 'Life2Film tools' }],
  [/^\/blog\/./, { phones: null, label: 'Life2Film blog' }],
  [/^\//, { phones: ['shot-01.jpg', 'shot-02.jpg'], label: 'Life2Film for iPhone' }],
];
const PAIRS = [['shot-01.jpg', 'shot-02.jpg'], ['shot-03.jpg', 'shot-04.jpg'], ['shot-02.jpg', 'shot-03.jpg'], ['shot-04.jpg', 'shot-01.jpg']];
const LANGS = new Set(['es', 'pt', 'id', 'ar', 'ru', 'tr']);

/** The page's path without its language: "/ru/studio/" → "/studio/". */
function bare(path) {
  const m = path.match(/^\/([a-z]{2})(\/.*)$/);
  return m && LANGS.has(m[1]) ? m[2] : path;
}

function pictureOf(path) {
  const p = bare(path);
  for (const [re, pick] of PICTURES) {
    const m = p.match(re);
    if (!m) continue;
    if (pick.tool) {
      const shot = `tools/${m[1]}.jpg`;
      return existsSync(join(IMG, shot)) ? { wide: shot, label: pick.label } : { phones: PAIRS[0], label: pick.label };
    }
    if (pick.phones === null) {
      const n = createHash('sha1').update(p).digest()[0] % PAIRS.length;
      return { phones: PAIRS[n], label: pick.label };
    }
    return pick;
  }
  return { phones: PAIRS[0], label: 'Life2Film' };
}

const text = (s) =>
  s.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
const meta = (html, key) => html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1];
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** What a page says about itself: the headline and the line under it. */
function readPage(html) {
  const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
  const ogTitle = text(meta(html, 'og:title') ?? '').replace(/\s+[—|–-]\s+Life2Film.*$/i, '').replace(/^Life2Film\s+[—|–-]\s+/i, '');
  const title = h1.split(' ').length >= 2 ? h1 : ogTitle || h1;
  return { title, description: text(meta(html, 'og:description') ?? ''), lang: html.match(/<html lang="([^"]+)"/)?.[1] ?? 'en', image: meta(html, 'og:image') };
}

const el = (type, style, children) => ({ type, props: { style, children } });
const img = (src, style) => ({ type: 'img', props: { src, style } });
const dataUri = async (file) => `data:image/jpeg;base64,${(await readFile(join(IMG, file))).toString('base64')}`;

function brand(label, path) {
  return el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }, [
    el('div', { display: 'flex', alignItems: 'center' }, [
      el('div', { width: 34, height: 34, borderRadius: 17, backgroundImage: `linear-gradient(135deg, ${C.cyan}, ${C.blue} 50%, ${C.pink})`, marginRight: 16 }),
      el('div', { fontSize: 28, fontWeight: 700, color: C.fg }, label),
    ]),
    el('div', { fontSize: 22, color: C.muted }, `life2film.com${path === '/' ? '' : path.replace(/\/$/, '')}`),
  ]);
}

/** Headline size by length, so a long blog title still fits its lines. */
const sizeOf = (title, roomy) => {
  const n = title.length;
  if (roomy) return n > 70 ? 44 : n > 40 ? 52 : 62;
  return n > 80 ? 40 : n > 50 ? 46 : n > 26 ? 54 : 64;
};

async function wideCard({ title, path, picture, ratio }) {
  const size = sizeOf(title, true);
  const lines = Math.ceil((title.length * size * 0.52) / 1072);
  const top = 150 + Math.min(lines, 2) * size * 1.12 + 26;
  return el('div', { width: W, height: H, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', backgroundColor: C.bg, fontFamily: 'SG' }, [
    el('div', { position: 'absolute', left: 200, top: -380, width: 800, height: 700, borderRadius: 400, backgroundImage: 'radial-gradient(circle, rgba(1,122,255,0.22), rgba(1,122,255,0) 70%)' }),
    el('div', { display: 'flex', padding: '52px 64px 0' }, [brand(picture.label, path)]),
    el('div', { display: 'flex', padding: '30px 64px 0', fontSize: size, fontWeight: 700, lineHeight: 1.12, color: C.fg, letterSpacing: -1 }, clip(title, 110)),
    img(await dataUri(picture.wide), { position: 'absolute', left: 64, top, width: 1072, height: Math.round(1072 * ratio), borderRadius: 14, border: `1px solid ${C.line}` }),
    el('div', { position: 'absolute', left: 0, bottom: 0, width: W, height: 6, backgroundImage: GRAD }),
  ]);
}

async function phoneCard({ title, description, path, picture }) {
  const size = sizeOf(title, false);
  const [a, b] = await Promise.all(picture.phones.map(dataUri));
  const phone = (src, left, top) =>
    el('div', { position: 'absolute', left, top, width: 232, height: 479, display: 'flex', borderRadius: 38, border: '7px solid #1c1c22', backgroundColor: '#000', overflow: 'hidden' }, [
      img(src, { width: 218, height: 465, borderRadius: 31, objectFit: 'cover' }),
    ]);
  return el('div', { width: W, height: H, display: 'flex', position: 'relative', overflow: 'hidden', backgroundColor: C.bg, fontFamily: 'SG' }, [
    el('div', { position: 'absolute', left: 620, top: -200, width: 760, height: 760, borderRadius: 380, backgroundImage: 'radial-gradient(circle, rgba(250,63,165,0.16), rgba(250,63,165,0) 70%)' }),
    el('div', { width: 690, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 0 58px 64px' }, [
      el('div', { display: 'flex', alignItems: 'center' }, [
        el('div', { width: 34, height: 34, borderRadius: 17, backgroundImage: `linear-gradient(135deg, ${C.cyan}, ${C.blue} 50%, ${C.pink})`, marginRight: 16 }),
        el('div', { fontSize: 28, fontWeight: 700, color: C.fg }, picture.label),
      ]),
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', { fontSize: size, fontWeight: 700, lineHeight: 1.1, color: C.fg, letterSpacing: -1 }, clip(title, 100)),
        description ? el('div', { fontSize: 25, lineHeight: 1.38, color: C.muted, marginTop: 24 }, clip(description, 130)) : el('div', {}, ''),
      ]),
      el('div', { fontSize: 22, color: C.muted }, `life2film.com${path === '/' ? '' : path.replace(/\/$/, '')}`),
    ]),
    phone(a, 712, 118),
    phone(b, 946, 58),
    el('div', { position: 'absolute', left: 0, bottom: 0, width: W, height: 6, backgroundImage: GRAD }),
  ]);
}

async function fonts() {
  const f = (pkg, file) => readFile(join(ROOT, 'node_modules/@fontsource', pkg, 'files', file));
  const [sg4, sg7, sgx4, sgx7, in4, in7] = await Promise.all([
    f('space-grotesk', 'space-grotesk-latin-400-normal.woff'), f('space-grotesk', 'space-grotesk-latin-700-normal.woff'),
    f('space-grotesk', 'space-grotesk-latin-ext-400-normal.woff'), f('space-grotesk', 'space-grotesk-latin-ext-700-normal.woff'),
    f('inter', 'inter-cyrillic-400-normal.woff'), f('inter', 'inter-cyrillic-700-normal.woff'),
  ]);
  return [
    { name: 'SG', data: sg4, weight: 400 }, { name: 'SG', data: sg7, weight: 700 },
    { name: 'SGX', data: sgx4, weight: 400 }, { name: 'SGX', data: sgx7, weight: 700 },
    { name: 'Inter', data: in4, weight: 400 }, { name: 'Inter', data: in7, weight: 700 },
  ];
}

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

/** Draw every card the built pages in `dist` name; returns [written, drawn]. */
export async function drawCards(dist, log = console.log) {
  const wanted = new Map(); // card path → the page to draw it from
  for await (const file of htmlFiles(dist)) {
    const html = await readFile(file, 'utf8');
    const page = readPage(html);
    if (!page.image?.startsWith(`${SITE}/og/`)) continue;
    const card = page.image.slice(SITE.length);
    const path = `/${file.slice(dist.length).replace(/^\//, '').replace(/index\.html$/, '').replace(/\.html$/, '/')}`;
    const prior = wanted.get(card);
    // An Arabic page shares the English page's card; its own text is used only if nothing else names it.
    if (!prior || (prior.lang === 'ar' && page.lang !== 'ar')) wanted.set(card, { ...page, path });
  }
  await mkdir(CACHE, { recursive: true });
  const fontList = await fonts();
  let drawn = 0;
  for (const [card, page] of wanted) {
    const picture = pictureOf(page.path);
    const pictureBytes = await Promise.all((picture.wide ? [picture.wide] : picture.phones).map((f) => readFile(join(IMG, f))));
    const hash = createHash('sha256').update(JSON.stringify([DESIGN, page.title, page.description, page.path, picture])).update(Buffer.concat(pictureBytes)).digest('hex').slice(0, 20);
    const cached = join(CACHE, `${hash}.jpg`);
    if (!existsSync(cached)) {
      const shape = await sharp(pictureBytes[0]).metadata();
      const tree = picture.wide ? await wideCard({ ...page, picture, ratio: shape.height / shape.width }) : await phoneCard({ ...page, picture });
      const svg = await satori(tree, { width: W, height: H, fonts: fontList });
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
      await writeFile(cached, await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer());
      drawn++;
    }
    const out = join(dist, card);
    await mkdir(dirname(out), { recursive: true });
    await copyFile(cached, out);
  }
  for (const card of wanted.keys()) if (!existsSync(join(dist, card))) throw new Error(`og-cards: ${card} is named by a page and was not written`);
  log(`og-cards: ${wanted.size} cards, ${drawn} drawn, ${wanted.size - drawn} from the cache`);
  return [wanted.size, drawn];
}

/** The Astro integration: runs after every `astro build`, the deploy's included. */
export default function ogCards() {
  return {
    name: 'og-cards',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        await drawCards(fileURLToPath(dir).replace(/\/$/, ''), (s) => logger.info(s));
      },
    },
  };
}
