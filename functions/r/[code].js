/**
 * life2film.com/r/<CODE> — the page an invite link opens.
 *
 * Every install of the app carries a code (random, or a creator's own), and
 * the only thing the app ever does with it is put it in this link. This page
 * shows the pitch, the code, and one button to the App Store whose campaign
 * token is `r-<CODE>`, so App Analytics counts installs and proceeds per code;
 * and it counts the visit itself in KV, per code, so «how many came through
 * ANNA's link» is one request (GET /api/r/ANNA) rather than a dashboard.
 *
 * Nothing about the visitor is kept: no IP, no cookie, no user agent — a
 * counter and the day it started.
 */
const CODE = /^[A-Za-z0-9_-]{3,24}$/;
const APP_ID = '6761656888';
const PROVIDER_TOKEN = '128499174';

export function appStoreURL(code) {
  return `https://apps.apple.com/app/id${APP_ID}?pt=${PROVIDER_TOKEN}&ct=r-${encodeURIComponent(code)}&mt=8`;
}

async function count(env, code) {
  if (!env.REFERRALS) return;
  const key = `clicks:${code}`;
  const current = Number((await env.REFERRALS.get(key)) ?? '0');
  await env.REFERRALS.put(key, String(current + 1));
  const since = `since:${code}`;
  if (!(await env.REFERRALS.get(since))) {
    await env.REFERRALS.put(since, new Date().toISOString().slice(0, 10));
  }
}

function page(code) {
  const store = appStoreURL(code);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Life2Film — invite ${code}</title>
<meta name="description" content="A personal video director for your memories. Invite code ${code}.">
<meta name="robots" content="noindex">
<style>
  :root{color-scheme:dark}
  body{margin:0;background:#09090C;color:#F5F5F7;font-family:-apple-system,"SF Pro Text",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  main{min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:40px 24px;box-sizing:border-box;text-align:center}
  .mark{width:84px;height:84px;border-radius:22px;background:linear-gradient(135deg,#22D3EE,#7C5CDC 38%,#EC4899 70%,#F59E0B);display:flex;align-items:center;justify-content:center}
  h1{margin:0;font-size:32px;font-weight:800;letter-spacing:-.4px}
  .tag{font-size:18px;font-weight:700;background:linear-gradient(90deg,#22D3EE,#7C5CDC,#EC4899,#F59E0B);-webkit-background-clip:text;background-clip:text;color:transparent}
  p{margin:0;max-width:34em;font-size:16px;line-height:1.4;color:#D4D4D8}
  .code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:15px;letter-spacing:.12em;color:#A1A1AA;border:1px solid #27272A;border-radius:999px;padding:6px 14px}
  .get{display:inline-flex;align-items:center;gap:10px;margin-top:6px;padding:16px 26px;border-radius:22px;background:linear-gradient(90deg,#22D3EE,#7C5CDC 40%,#EC4899 72%,#F59E0B);color:#fff;font-size:17px;font-weight:700;text-decoration:none}
  .more{font-size:14px;color:#A78BFA;text-decoration:none}
</style>
</head>
<body>
<main>
  <div class="mark" aria-hidden="true"><svg width="46" height="46" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#fff" stroke-width="2.6" stroke-dasharray="62 26" stroke-linecap="round"/><path d="M17 14.5v11l9-5.5z" fill="#fff"/></svg></div>
  <h1>Life2Film</h1>
  <div class="tag">A personal video director for your memories</div>
  <p>Pick a day you filmed. The phone watches every second, keeps the best moments and cuts a short film to music in about a minute. Nothing leaves the phone.</p>
  <div class="code" aria-label="Invite code">${code}</div>
  <a class="get" href="${store}">Get Life2Film on the App Store</a>
  <a class="more" href="/">life2film.com</a>
</main>
<script defer src="https://analytics.superduperai.co/sda.js" data-source="life2film"></script>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const code = String(context.params.code ?? '');
  if (!CODE.test(code)) {
    return Response.redirect(new URL('/', context.request.url).toString(), 302);
  }
  context.waitUntil(count(context.env, code));
  return new Response(page(code), {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}
