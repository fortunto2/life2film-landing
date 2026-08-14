import type { Lang } from '../../i18n';
import type { ToolTranslations } from '../tools-i18n';
import { es } from './es';
import { ru } from './ru';

/**
 * Which locales have which tools.
 *
 * A locale appears here only once its translation exists. `hreflang` is emitted from this map, so
 * the site cannot advertise a page it does not have — the mistake that previously pointed crawlers
 * at /ru/tools/ 404s.
 */
export const TRANSLATIONS: Partial<Record<Lang, ToolTranslations>> = { es, ru };

/** Locales that have this tool translated, English always included. */
export const localesFor = (slug: string): Lang[] =>
  (['en', ...(Object.keys(TRANSLATIONS) as Lang[]).filter((lang) => TRANSLATIONS[lang]?.[slug])] as Lang[]);
