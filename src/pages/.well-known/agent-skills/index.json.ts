import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { skillsIndex } from 'superduper-tools/agent';
import { TOOLS } from '../../../lib/tools';
import { BASE, skillOf, skillPathOf } from '../../../lib/skills';

/** Agent Skills Discovery index: one entry per tool, sha256 over the exact text served. */
export const GET: APIRoute = () => {
  const body = skillsIndex('life2film', TOOLS.map((t) => {
    const md = skillOf(t);
    return { name: t.slug, description: t.blurb, url: `${BASE}${skillPathOf(t.slug)}`, sha256: createHash('sha256').update(md).digest('hex') };
  }));
  return new Response(JSON.stringify(body, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } });
};
