import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';

/**
 * The skill file, downloadable.
 *
 * Served from the same source the npm package ships, read at build time — a second copy that could
 * drift is worse than no copy at all.
 */
const skill = readFileSync(
  new URL('../../../../life2film/video-analyzer/npm-package/SKILL.md', import.meta.url),
  'utf-8',
);

export const GET: APIRoute = () =>
  new Response(skill, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
