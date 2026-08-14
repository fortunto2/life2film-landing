import type { APIRoute } from 'astro';
import { SKILL } from '../../lib/skill';

/**
 * The skill file, downloadable.
 *
 * Same bytes the npm package ships — read from `node_modules` at build time, so this and the engine
 * page cannot show different versions of it.
 */
export const GET: APIRoute = () =>
  new Response(SKILL, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
