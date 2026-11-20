import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
// Types only: vitest cannot load the package's code from pnpm's directory, whose name has a '#'.
// The package's own tests run validateRegistry over what is written here.
import type { Registry } from 'superduper-tools/registry';
import { registryRows } from './registry-rows';

// The package's own source checkout: the installed copy is a snapshot of it.
const SOURCE = `${process.env.HOME}/startups/shared/superduper-tools/registry/tools.json`;
const installed = createRequire(import.meta.url).resolve('superduper-tools/registry/tools.json');

describe('shared tool registry', () => {
  it('carries exactly this site’s tools, as TOOLS describes them', () => {
    const path = process.env.REGISTRY_WRITE ? SOURCE : installed;
    const reg = JSON.parse(readFileSync(path, 'utf8')) as Registry;
    const ours = reg.tools.filter((t) => t.canonical_site === 'life2film');
    const rows = registryRows(ours);
    if (process.env.REGISTRY_WRITE) {
      const others = reg.tools.filter((t) => t.canonical_site !== 'life2film');
      const next = { ...reg, tools: [...others, ...rows] };
      // The package keeps one line per category, site and tool, so a registry diff reads as rows.
      const block = (o: Record<string, unknown>) => Object.entries(o).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n');
      const text = `{\n  "$comment": ${JSON.stringify((reg as Registry & { $comment?: string }).$comment)},\n  "categories": {\n${block(reg.categories)}\n  },\n  "sites": {\n${block(reg.sites)}\n  },\n  "tools": [\n${next.tools.map((t) => `    ${JSON.stringify(t)}`).join(',\n')}\n  ]\n}\n`;
      writeFileSync(SOURCE, text);
      return;
    }
    expect(ours).toEqual(rows);
  });
});
