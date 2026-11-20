import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { TOOLS } from './tools';
import { TRANSLATIONS } from './tools/index';

// Every tool is a set of files that must agree; `npm run new-tool` writes the set, this keeps it whole.
const en = new Set(readdirSync('src/pages/tools').filter((f) => f.endsWith('.astro') && f !== 'index.astro').map((f) => f.slice(0, -6)));
const local = new Set(readdirSync('src/pages/[lang]/tools').filter((f) => f.endsWith('.astro') && f !== 'index.astro').map((f) => f.slice(0, -6)));
const slugs = new Set(TOOLS.map((t) => t.slug));

describe('tool structure', () => {
  it('every tool has its English page, and every page a tool', () => {
    expect([...slugs].filter((s) => !en.has(s))).toEqual([]);
    expect([...en].filter((s) => !slugs.has(s))).toEqual([]);
  });
  it('a translated tool has its locale page (else the translation is never built)', () => {
    const missing = Object.values(TRANSLATIONS).flatMap((t) => Object.keys(t ?? {})).filter((s) => slugs.has(s) && !local.has(s));
    expect([...new Set(missing)]).toEqual([]);
  });
  it('the component each page names exists', () => {
    const broken = [...en].filter((s) => {
      const m = readFileSync(`src/pages/tools/${s}.astro`, 'utf8').match(/components\/tools\/(\w+)\.astro/);
      return m && !existsSync(`src/components/tools/${m[1]}.astro`);
    });
    expect(broken).toEqual([]);
  });
  it('no scaffold TODO is left in a tool’s text', () => {
    expect(TOOLS.filter((t) => JSON.stringify(t).includes('TODO')).map((t) => t.slug)).toEqual([]);
  });
});
