import type { Lang } from '../../i18n';
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

/** Locales that have this tool translated, English always included. */
export const localesFor = (slug: string): Lang[] =>
  (['en', ...(Object.keys(TRANSLATIONS) as Lang[]).filter((lang) => TRANSLATIONS[lang]?.[slug])] as Lang[]);
