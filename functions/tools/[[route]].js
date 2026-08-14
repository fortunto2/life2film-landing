/**
 * Serve markdown to agents that ask for it.
 *
 * The `.md` twin of every tool page already exists as a static file. This adds the other half of
 * the contract: an agent that requests the ordinary URL with `Accept: text/markdown` gets the
 * markdown, without having to know the convention or parse HTML to find out.
 *
 * Scoped to /tools/ deliberately. A site-wide middleware would run on every request to a site that
 * is otherwise pure static files, and the rest of the pages have no markdown twin to serve.
 */
export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get('accept') ?? '';

  // Browsers send `*/*` in their Accept list, so a bare wildcard must not count — only an explicit
  // preference for markdown or plain text does.
  const wantsMarkdown = /text\/(markdown|x-markdown|plain)/i.test(accept) && !accept.includes('text/html');

  if (!wantsMarkdown) return next();

  const url = new URL(request.url);
  // /tools/video-compressor/ and /tools/video-compressor both map to /tools/video-compressor.md
  const slug = url.pathname.replace(/^\/tools\/?/, '').replace(/\/$/, '');

  if (!slug) return next();

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
