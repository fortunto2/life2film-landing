/**
 * Counts what agents do with this site's MCP, through our own counter (superduper-analytics), as
 * platform "server": a client connecting (its name, one word) and a tool called (the tool, and the
 * tool slug it asked about, which is a public page id). Never the query, never a word the agent
 * sent. Fire and forget: a counter that is down never slows or fails an answer.
 */
const ENDPOINT = 'https://analytics.superduperai.co/e';

export function countMcp(body: string, waitUntil: (p: Promise<unknown>) => void): void {
  let msg: { method?: string; params?: { name?: string; arguments?: Record<string, unknown>; clientInfo?: { name?: string } } };
  try { msg = JSON.parse(body); } catch { return; }
  if (Array.isArray(msg) || !msg?.method) return;
  const word = (s: unknown) => String(s ?? '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) || 'unknown';
  let name: string, props: Record<string, string>;
  if (msg.method === 'initialize') { name = 'mcp_connected'; props = { client: word(msg.params?.clientInfo?.name) }; }
  else if (msg.method === 'tools/call') {
    name = 'mcp_tool_called';
    props = { tool: word(msg.params?.name) };
    const a = msg.params?.arguments ?? {};
    const slug = a.slug ?? a.id;
    if (typeof slug === 'string' && /^[a-z0-9-]{1,60}$/.test(slug)) props.slug = slug;
  } else return;
  waitUntil(fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://life2film.com' },
    body: JSON.stringify({ events: [{ source: 'life2film', platform: 'server', name, path: '/mcp', props }] }),
  }).catch(() => undefined));
}
