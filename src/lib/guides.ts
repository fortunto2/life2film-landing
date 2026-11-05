import { getCollection, type CollectionEntry } from 'astro:content';
import { localePath, type Lang } from '../i18n';

export { GUIDES_UI } from './guides-ui';

/** The pillar first, then the spokes. Same slugs in every locale. */
export const GUIDE_SLUGS = [
  'edit-video-with-ai-agents',
  'edit-video-with-claude-code',
  'edit-video-with-chatgpt-codex',
] as const;
export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export type Guide = CollectionEntry<'guides'>;

export async function guidesFor(lang: Lang): Promise<Guide[]> {
  const all = await getCollection('guides', ({ data }: Guide) => !data.draft);
  return GUIDE_SLUGS.map((slug) => all.find((g: Guide) => g.id === `${lang}/${slug}`)).filter(
    (g): g is Guide => Boolean(g),
  );
}

/** Locales that have this guide. Hreflang is emitted from this, never from the locale list. */
export async function localesOf(slug: string): Promise<Lang[]> {
  const all = await getCollection('guides', ({ data }: Guide) => !data.draft);
  return all
    .filter((g: Guide) => g.id.endsWith(`/${slug}`))
    .map((g: Guide) => g.id.split('/')[0] as Lang);
}

export const guidePath = (lang: Lang, slug: string) => localePath(lang, `/guides/${slug}/`);
