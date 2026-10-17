import { localePath, type Lang } from '../../i18n';
import type { ToolTranslations } from '../tools-i18n';
import { ar } from './ar';
import { es } from './es';
import { id } from './id';
import { pt } from './pt';
import { ru } from './ru';
import { tr } from './tr';

/**
 * Which locales have which tools.
 *
 * A locale appears here only once its translation exists. `hreflang` is emitted from this map, so
 * the site cannot advertise a page it does not have — the mistake that previously pointed crawlers
 * at /ru/tools/ 404s.
 */
export const TRANSLATIONS: Partial<Record<Lang, ToolTranslations>> = { ar, es, id, pt, ru, tr };

/**
 * The path to a tool's page in `lang`, falling back to the English page when that locale has no
 * translation. `localePath` alone linked /es/tools/video-to-frames/ from every Spanish tool page the
 * day the frames tool shipped in en and ru only: 35 links to pages that were never generated.
 */
export const toolPath = (lang: Lang, slug: string): string =>
  localePath(TRANSLATIONS[lang]?.[slug] || lang === 'en' ? lang : 'en', `/tools/${slug}/`);

/** Locales that have this tool translated, English always included. */
export const localesFor = (slug: string): Lang[] =>
  (['en', ...(Object.keys(TRANSLATIONS) as Lang[]).filter((lang) => TRANSLATIONS[lang]?.[slug])] as Lang[]);
