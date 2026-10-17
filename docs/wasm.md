# public/wasm — the engine build the website ships

Build output, not source. The source is `crates/va-wasm` in the `life2film` repository.

## It is the SITE build, on purpose

`public/` is downloadable by anyone who opens a tool page, so it holds only what the pages call:

| Function | Used by |
|---|---|
| `detect_beats(samples, rate, config)` → `{beats, bpm}` | bpm-detector |
| `detect_scenes_slick(json)` → `{scenes}` | scene-detector, video-splitter (centre-column detector) |
| `detect_scenes_features(json)` → `{scenes}` | scene-detector, video-splitter (`feature_cosine` over the per-frame vectors; a cut needs both detectors, see `src/lib/shots.ts`) |
| `score_frame(w, h, rgb24, ts, genre)` → `{score, vector, …}` | scene-detector, video-splitter; `vector` feeds `detect_scenes_features` |

The full engine (selection, montage composition, OTIO, weights) is the `full` cargo feature and
is never built for the web. Until October 2026 it was: eighteen exports, 1.26 MB, with symbol
names. Now 479 KB, symbol names stripped, local paths remapped.

## Updating

The npm package `life2film-engine` (0.2.2 and later) IS the site build, so it is the source:

```bash
pnpm add -D life2film-engine@latest && pnpm wasm   # copies its js + wasm into public/wasm/
```

To build a new version of it: `make wasm-site` in `life2film/video-analyzer` (must print exactly
the four exports above), copy `pkg-site/*` into `npm-package/`, bump, `npm publish --auth-type=web`
from a real terminal (the account's second factor is a security key).

Committed rather than fetched at build time: the site deploys as static files, and a tool page
that breaks when a sibling repository moves is not a tool page.
