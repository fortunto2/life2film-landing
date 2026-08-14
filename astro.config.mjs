// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site → dist/ for Cloudflare Pages. Localized routes: / (en), /ru, /tr.
export default defineConfig({
  build: {
    /*
     * The localised tool routes resolve their component dynamically, so Astro cannot tell which
     * tool's styles a page needs and inlines all seven: a Russian trimmer page carried 16.3 KB of
     * <style> against the English page's 8.9 KB, with selectors for the BPM detector and the
     * splitter in it. Inline styles are also re-sent on every page rather than cached.
     *
     * One external stylesheet is fetched once and reused across all 84 pages.
     */
    inlineStylesheets: 'never',
  },
  site: 'https://life2film.com',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', pt: 'pt', id: 'id', ar: 'ar', ru: 'ru', tr: 'tr' },
      },
    }),
  ],
  i18n: {
    locales: ['en', 'es', 'pt', 'id', 'ar', 'ru', 'tr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
