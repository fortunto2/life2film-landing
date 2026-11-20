import type { APIRoute, GetStaticPaths } from 'astro';
import { TOOLS, TOOL } from '../../../lib/tools';
import { skillOf } from '../../../lib/skills';

/** /tools/<slug>/skill.md: the tool as an installable agent skill (SKILL.md format). */
export const getStaticPaths: GetStaticPaths = () => TOOLS.map((t) => ({ params: { tool: t.slug } }));

export const GET: APIRoute = ({ params }) => {
  const t = TOOL[params.tool as string];
  if (!t) return new Response('Not found', { status: 404 });
  return new Response(skillOf(t), { headers: { 'content-type': 'text/markdown; charset=utf-8', 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' } });
};
