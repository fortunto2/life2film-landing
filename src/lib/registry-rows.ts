/**
 * This site's rows of the shared tool registry (`superduper-tools/registry/tools.json`), derived
 * from TOOLS so the two cannot drift: superduperai.co builds its hub from that registry, and this
 * site reads the other sites' tools from it. `registry.test.ts` fails when the package is stale;
 * `REGISTRY_WRITE=1 npx vitest run src/lib/registry.test.ts` rewrites this site's rows in place.
 */
import type { ToolCategory, ToolEntry } from 'superduper-tools/registry';
import { TOOLS, type ToolGroup } from './tools';
import { localesFor } from './tools/index';

/** Our hub groups onto the registry's shared categories. */
const CATEGORY: Record<ToolGroup, ToolCategory> = { everyday: 'edit', create: 'publish', audio: 'edit', engine: 'analyze' };

export function registryRows(previous: readonly ToolEntry[] = []): ToolEntry[] {
  const before = new Map(previous.map((t) => [t.id, t]));
  return TOOLS.map((t) => {
    const old = before.get(t.slug);
    const row: ToolEntry = {
      id: t.slug,
      category: CATEGORY[t.group],
      canonical_site: 'life2film',
      path: `/tools/${t.slug}/`,
      languages: ['en', ...localesFor(t.slug).filter((l) => l !== 'en').sort()],
      schema: 'WebApplication',
      name: t.name,
      blurb: t.blurb,
    };
    if (old?.core) row.core = old.core;
    if (old?.related?.length) row.related = old.related;
    return row;
  });
}
