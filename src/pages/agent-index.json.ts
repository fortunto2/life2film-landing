/**
 * The index the read-only MCP server (functions/mcp.ts) searches: every guide in every locale, every
 * blog post, every browser tool. Built from the content collections and the tools registry, so it
 * cannot drift from the pages. Bodies are cut to an excerpt: whole texts come from the .md twins.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { TOOLS } from '../lib/tools';
import { localesFor } from '../lib/tools/index';
import { BASE } from '../lib/agent';

const EXCERPT = 4000;
const plain = (md: string) => md.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, EXCERPT);

export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).map((g) => {
    const [lang, slug] = g.id.split('/');
    const path = lang === 'en' ? `/guides/${slug}/` : `/${lang}/guides/${slug}/`;
    return { kind: 'guide', lang, slug, title: g.data.title, description: g.data.description, url: `${BASE}${path}`, markdown: `${BASE}${path.replace(/\/$/, '')}.md`, excerpt: plain(g.body ?? '') };
  });
  const blog = (await getCollection('blog', ({ data }) => !data.draft)).map((p) => ({
    kind: 'blog', lang: 'en', slug: p.id, title: p.data.title, description: p.data.description, url: `${BASE}/blog/${p.id}/`, markdown: `${BASE}/blog/${p.id}.md`, excerpt: plain(p.body ?? ''),
  }));
  const tools = TOOLS.map((t) => ({
    slug: t.slug, name: t.name, group: t.group, blurb: t.blurb, summary: t.summary, facts: t.facts,
    url: `${BASE}/tools/${t.slug}/`, markdown: `${BASE}/tools/${t.slug}.md`, languages: localesFor(t.slug),
    runs: 'in the visitor\'s browser (WebCodecs, WebAssembly); nothing is uploaded',
  }));
  return new Response(JSON.stringify({ documents: [...guides, ...blog], tools }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=3600' },
  });
};
