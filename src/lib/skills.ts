/**
 * Each tool's SKILL.md, built by superduper-tools/agent from this site's own text (TOOLS): the
 * blurb, the measured facts, the snippet, the search phrase as the trigger. Served at
 * /tools/<slug>/skill.md, listed in /.well-known/agent-skills/index.json, read by the MCP's get_tool.
 */
import { toolSkill } from 'superduper-tools/agent';
import { TOOLS, type Tool } from './tools';
import { ENGINE_CLI } from './engine-cli';

export const BASE = 'https://life2film.com';
export const skillPathOf = (slug: string) => `/tools/${slug}/skill.md`;

export function skillOf(t: Tool): string {
  return toolSkill({
    slug: t.slug,
    name: t.name,
    blurb: t.summary || t.blurb,
    url: `${BASE}/tools/${t.slug}/`,
    site: 'life2film',
    triggers: [t.searchPhrase.toLowerCase(), t.name.toLowerCase()].filter((x, i, a) => x && a.indexOf(x) === i),
    facts: t.facts,
    code: t.code,
    cli: ENGINE_CLI[t.slug],
    engine: t.group === 'engine' ? { name: 'life2film-engine, the Rust core as an npm package', url: `${BASE}/engine/`, install: 'npm i life2film-engine' } : undefined,
    related: TOOLS.filter((o) => o.slug !== t.slug && o.group === t.group).slice(0, 6).map((o) => ({ name: o.name, url: `${BASE}/tools/${o.slug}/` })),
  });
}
