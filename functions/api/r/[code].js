/**
 * GET /api/r/<CODE> → {"code":"ANNA","clicks":12,"since":"2026-10-17"}
 *
 * What came through an invite link, by code — the founder's and a creator's
 * one-line answer. Public on purpose: it holds a counter and a date and
 * nothing about anyone. Installs and proceeds per code are App Analytics'
 * (campaign `r-<CODE>`), which this does not duplicate.
 */
const CODE = /^[A-Za-z0-9_-]{3,24}$/;

export async function onRequestGet(context) {
  const code = String(context.params.code ?? '');
  if (!CODE.test(code)) {
    return Response.json({ error: 'bad_code' }, { status: 400 });
  }
  const kv = context.env.REFERRALS;
  if (!kv) return Response.json({ error: 'no_store' }, { status: 503 });
  const [clicks, since] = await Promise.all([kv.get(`clicks:${code}`), kv.get(`since:${code}`)]);
  return Response.json(
    { code, clicks: Number(clicks ?? '0'), since: since ?? null },
    { headers: { 'cache-control': 'no-store', 'access-control-allow-origin': '*' } },
  );
}
