// POST /api/waitlist — one address, one reason (android | studio).
//
// Stored under `email:<sha256(address)>`, so sending twice updates one row instead of
// adding a second; a per-reason counter is kept beside it. Nothing else is recorded: no
// IP, no cookie, no user agent — the address is the whole identity, and it is there
// because the person typed it to be written to. GET answers the two counts and nothing
// about any address.
//
// The `website` field is a honeypot: a bot that fills it gets a 204 and nothing stored.

const REASONS = new Set(['android', 'studio']);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env }) {
  const type = request.headers.get('content-type') || '';
  const wantsJson = type.includes('application/json');
  const data = wantsJson
    ? await request.json().catch(() => ({}))
    : Object.fromEntries((await request.formData()).entries());

  if (data.website) return new Response(null, { status: 204 });

  const email = String(data.email || '').trim().toLowerCase();
  const reason = REASONS.has(data.reason) ? data.reason : 'android';
  const lang = String(data.lang || 'en').slice(0, 5);
  if (!EMAIL.test(email) || email.length > 254) {
    return new Response('an email address is needed', { status: 400 });
  }
  if (!env.WAITLIST) return new Response('waitlist store not bound', { status: 503 });

  const key = `email:${await sha256(email)}`;
  const now = new Date().toISOString();
  const prior = await env.WAITLIST.get(key, 'json');
  await env.WAITLIST.put(
    key,
    JSON.stringify({ email, reason, lang, since: prior?.since ?? now, updated: now }),
  );
  if (!prior || prior.reason !== reason) {
    const counter = `count:${reason}`;
    const n = Number(await env.WAITLIST.get(counter)) || 0;
    await env.WAITLIST.put(counter, String(n + 1));
  }

  if (wantsJson) return new Response(null, { status: 204 });
  const back = (request.headers.get('referer') || '/').split('#')[0];
  return Response.redirect(`${back}#waitlist`, 303);
}

export async function onRequestGet({ env }) {
  if (!env.WAITLIST) return new Response('waitlist store not bound', { status: 503 });
  const [android, studio] = await Promise.all([
    env.WAITLIST.get('count:android'),
    env.WAITLIST.get('count:studio'),
  ]);
  return Response.json({ android: Number(android) || 0, studio: Number(studio) || 0 });
}
