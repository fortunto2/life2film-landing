/**
 * Serve markdown to agents that ask for it.
 *
 * The `.md` twin of every tool page already exists as a static file. This adds the other half of
 * the contract: an agent that requests the ordinary URL with `Accept: text/markdown` gets the
 * markdown, without having to know the convention or parse HTML to find out.
 *
 * Scoped to /tools/ deliberately. A site-wide function would run on every request to a site that is
 * otherwise pure static files — including the home page, where it would add a Worker invocation to
 * the critical path of every visit to serve a minority of requests. The home page is covered by
 * /llms.txt instead, which is the conventional discovery path and costs nothing.
 */
export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get('accept') ?? '';

  // Browsers send `*/*` in their Accept list, so a bare wildcard must not count — only an explicit
  // preference for markdown or plain text does.
  const wantsMarkdown = /text\/(markdown|x-markdown|plain)/i.test(accept) && !accept.includes('text/html');

  if (!wantsMarkdown) return next();

  const url = new URL(request.url);
  const slug = url.pathname.replace(/^\/tools\/?/, '').replace(/\/$/, '');

  // `/tools/` itself has no twin, and `/tools/x.md` is already the markdown — asking for its own
  // `.md.md` would 404 and fall through, costing two asset lookups to serve a static file that
  // needed none.
  if (!slug || slug.endsWith('.md')) return next();

  const markdown = await context.env.ASSETS.fetch(
    new Request(new URL(`/tools/${slug}.md`, url), request),
  );

  // No twin for this path — hand back the HTML rather than a 404 for a page that does exist.
  if (!markdown.ok) return next();

  return new Response(markdown.body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
      vary: 'Accept',
    },
  });
}
