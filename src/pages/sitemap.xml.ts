import type { APIRoute } from 'astro';

/**
 * `/sitemap.xml`, pointing at the index Astro generates.
 *
 * The integration writes `sitemap-index.xml` and robots.txt names it correctly, but crawlers and
 * audit tools try the conventional path first and were getting a 404. Cheaper to answer than to
 * explain.
 */
export const GET: APIRoute = ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://life2film.com';
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/sitemap-0.xml</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
