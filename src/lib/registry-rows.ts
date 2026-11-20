/**
 * This site's rows of the shared tool registry (`superduper-tools/registry/tools.json`), derived
 * from TOOLS so the two cannot drift: superduperai.co builds its hub from that registry, and this
 * site reads the other sites' tools from it. `registry.test.ts` fails when the package is stale;
 * `REGISTRY_WRITE=1 npx vitest run src/lib/registry.test.ts` rewrites this site's rows in place.
 */
import type { ToolCategory, ToolEntry } from 'superduper-tools/registry';
import { TOOLS, type ToolGroup } from './tools';
import { TRANSLATIONS, localesFor, toolName } from './tools/index';
import type { Lang } from '../i18n';

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
    // Other sites list this tool in their reader's language, so the names travel with the row.
    const l10n: Record<string, { name: string; blurb: string }> = {};
    for (const l of row.languages.slice(1)) {
      const tr = TRANSLATIONS[l as Lang]?.[t.slug];
      if (tr) l10n[l] = { name: toolName(t.slug, l as Lang, t.name), blurb: tr.blurb ?? t.blurb };
    }
    if (Object.keys(l10n).length) row.l10n = l10n;
    if (old?.core) row.core = old.core;
    if (old?.related?.length) row.related = old.related;
    return row;
  });
}
