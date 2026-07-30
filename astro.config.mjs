// @ts-check
import { defineConfig } from 'astro/config';

// Static site → dist/ for Cloudflare Pages. Localized routes: / (en), /ru, /tr.
export default defineConfig({
  site: 'https://life2film.com',
  i18n: {
    locales: ['en', 'ru', 'tr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
