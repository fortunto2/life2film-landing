# CLAUDE.md — life2film.com (landing + free browser tools)

Astro site: the Life2Film app's landing, blog, guides and 49 free tools that run in the browser
(mediabunny/WebCodecs, Whisper via transformers.js, nothing uploaded). Languages: en (root), ru,
es, pt, id, tr, ar. Deploys from this Mac to Cloudflare Pages, not from GitHub.

Rules here, not measurements. Findings with numbers go to the brain (solograph `capture`) and the
traffic journal in video-analyzer `DirectorOS/docs/plan/traffic_20261120/plan.md`.

## Commands

```sh
npx astro check && npx vitest run      # types + tests (both must be green before a commit)
npx astro build && npx astro preview --port 4392
npm run deploy                         # build + check-links (refuses a broken internal href) + wrangler
npm run new-tool -- <slug> <Component> <everyday|create|audio|engine>
npm run bump-tools                     # pin superduper-tools to its HEAD (package.json, pnpm-workspace, lock)
REGISTRY_WRITE=1 npx vitest run src/lib/registry.test.ts   # write this site's rows into the shared registry
seo reindex <url>                      # after a title/H1 change on a live page
```

pnpm install needs `CI=true … --config.confirmModulesPurge=false` from a script (it asks otherwise);
`pnpm-workspace.yaml` must keep `packages: ['.']` or every pnpm command refuses.

## A tool is a set of files that must agree

`npm run new-tool` writes the set; `src/lib/tool-structure.test.ts` keeps it whole:
- `src/pages/tools/<slug>.astro` (en) and `src/pages/[lang]/tools/<slug>.astro` (built **only** for
  languages with a translation in `src/lib/tools/<lang>*.ts`, so no English duplicate under /ru/);
- `src/components/tools/<Component>.astro`, client half on `mountTool` from `superduper-tools/shell`;
- the text in `TOOLS` (`src/lib/tools.ts`, `tool-edits.ts`, `tool-text.ts`), no TODO left;
- the core in `src/lib/<slug>.ts` with a test that a mutation turns red.

After adding or renaming a tool: registry write → commit + push superduper-tools → `npm run
bump-tools` here → deploy → `pnpm update superduper-tools`, build, deploy on superduperai-site.
A site shows the registry as of the commit it pins.

## Shared code (do not copy it again)

- `superduper-tools` (`~/startups/shared/superduper-tools`): registry, `mountTool`, dropzone, copy,
  SEO helpers. Its README is the spec.
- `src/lib/canvas-out.ts`: `openVideo` + `canvasMp4` — every canvas renderer opens and encodes here.
- `src/lib/audio-io.ts`: `trackStereo` (decode a track to 48 kHz stereo) + `pushStereo`.
- `src/lib/redraw.ts` (`redrawVideo`: fade, border, progress bar), `silence.ts` `renderRanges`
  (remove silence, cut part), `split-screen.ts` `compose` (split screen, collage).
- `toolName(slug, lang, fallback)` for a tool's name in a language; never rebuild heading+accent.
- vitest cannot load the package's code (pnpm keeps it in a directory with `#`): tests import its
  types and read its JSON only.

## SEO rules

- One canonical page per search intent across all our sites; another site links to it, never
  copies it. Each hub's JSON-LD lists only its own tools; the «On our other sites» group comes from
  the registry's `externalFor('life2film')`.
- Titles say the query people type (Google Autocomplete), key phrase first, ≤ 70 characters; H1 is
  a verb phrase in RU («Определить BPM песни»), not a noun. Description says it runs in the browser.
- A page in a language exists only with its translation; blog, 404 and Studio pass their real
  `locales` to `Base.astro` (hreflang must never point at a page that is not built).
- `MobileApplication` in `Base.astro` is the iOS app entity, correct on every page; the tool's own
  node is `WebApplication`. HowTo markup: not used (no rich result since 2023).
- Honest growth only: no review asks, no doorway pages, comparisons only on checkable facts.

## Verifying a change

Walk the tool in real Chrome (Playwright `chromium.launch({ channel: 'chrome' })`) on the preview,
with a fixture made by ffmpeg, and measure the output (ffprobe, volumedetect, frame checks) — not
"it saved a file". Then the same on prod after deploy. Mutations are reverted by copy + sha256,
never `git checkout`.

## Commits

`git add -N` new files, `git commit --only <files>`; push with
`env -u LLM_PROVIDER -u LLM_BASE_URL -u LLM_MODEL -u LLM_USE_CHAT_API -u OPENAI_API_KEY git push`.
Analytics is superduper-analytics (`src/lib/track.ts`), not PostHog.
