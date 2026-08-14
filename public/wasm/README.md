# va-wasm — the montage engine in the browser

These files are build output, not source. The source is the Rust workspace in the `life2film`
repository, which in turn depends on `video-generator-agent` sitting beside it.

## Rebuilding

```bash
cd ~/startups/active/life2film/video-analyzer
make wasm                       # wasm-pack build crates/va-wasm --target web --out-dir ../../pkg
cp pkg/va_wasm.js pkg/va_wasm_bg.wasm pkg/va_wasm.d.ts \
   ~/startups/active/life2film-landing/public/wasm/
```

They are committed here rather than fetched at build time because this site deploys as static files
with no build step of its own — and because a tool page that breaks when a sibling repository moves
is not a tool page.

## What the pages use

| Function | Used by |
|---|---|
| `detect_beats(samples, rate, config)` → `{beats, bpm}` | `/tools/bpm-detector/` |
| `detect_scenes_slick(json)` | planned — `/tools/scene-detector/` |
| `score_frame(w, h, rgb24, ts, genre)` | planned — `/tools/scene-detector/` |
| `beat_sync_timeline(json)` | planned — `/tools/beat-sync/` |

The full surface is in `va_wasm.d.ts` — nineteen exports covering scoring, scene detection,
selection, montage composition and OTIO.

## Size

1.2 MB uncompressed, ~410 KB over the wire once Cloudflare compresses it. It is fetched on first
use, not on page load, so it costs nothing to a visitor who only reads the page.

`wasm-opt` is disabled in `crates/va-wasm/Cargo.toml`; enabling it would take roughly a third off.
