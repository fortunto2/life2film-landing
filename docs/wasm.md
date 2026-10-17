# public/wasm — the engine build the website ships

Build output, not source. The source is `crates/va-wasm` in the `life2film` repository.

## It is the SITE build, on purpose

`public/` is downloadable by anyone who opens a tool page, so it holds only what the pages call:

| Function | Used by |
|---|---|
| `detect_beats(samples, rate, config)` → `{beats, bpm}` | bpm-detector |
| `detect_scenes_slick(json)` → `{scenes}` | scene-detector, video-splitter |
| `score_frame(w, h, rgb24, ts, genre)` | scene-detector, video-splitter |

The full engine (selection, montage composition, OTIO, weights) is the `full` cargo feature and
is never built for the web. Until October 2026 it was: eighteen exports, 1.26 MB, with symbol
names. Now 479 KB, symbol names stripped, local paths remapped.

## Rebuilding

```bash
cd ~/startups/active/life2film/video-analyzer
make wasm-site            # prints the exports; must be exactly the three above
cp pkg-site/va_wasm.js pkg-site/va_wasm_bg.wasm ~/startups/active/life2film-landing/public/wasm/
```

The same build is the npm package `life2film-engine` from 0.2.0 (`npm-package/` in that repo).

Committed rather than fetched at build time: the site deploys as static files, and a tool page
that breaks when a sibling repository moves is not a tool page.
