/**
 * The home page, for a reader that asked for markdown.
 *
 * An agent requesting `/` with `Accept: text/markdown` wants the site in a form it can use. That
 * document already exists and is better than a converted home page: llms.txt is written for exactly
 * this reader — what the products are, what the tools do, how to call the engine, and the
 * constraints worth knowing.
 */
export async function onRequest(context) {
  const { request, next, env } = context;
  const accept = request.headers.get('accept') ?? '';

  // Browsers list */* alongside text/html; only an explicit markdown preference counts.
  const wantsMarkdown = /text\/(markdown|x-markdown|plain)/i.test(accept) && !accept.includes('text/html');

  if (!wantsMarkdown) return next();

  const overview = await env.ASSETS.fetch(new Request(new URL('/llms.txt', request.url), request));
  if (!overview.ok) return next();

  return new Response(overview.body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
      vary: 'Accept',
    },
  });
}
