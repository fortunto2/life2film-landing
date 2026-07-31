// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site → dist/ for Cloudflare Pages. Localized routes: / (en), /ru, /tr.
export default defineConfig({
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
