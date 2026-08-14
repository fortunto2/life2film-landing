/**
 * The Life2Film engine as the browser sees it.
 *
 * `va-wasm` is built from the same Rust that drives the app and the desktop Studio; `public/wasm/`
 * holds the output (see the README there for how to rebuild it). Only the exports the tool pages
 * call are typed here — the full surface is in `va_wasm.d.ts`.
 */

export interface Engine {
  /** PCM in, `{ beats: number[], bpm: number }` out. */
  detect_beats: (samples: Float32Array, rate: number, config: string | null) => string;

  /** RGB24 frame in, `{ score, features, is_garbage }` out. */
  score_frame: (
    width: number,
    height: number,
    rgb24: Uint8Array,
    timestamp: number,
    genre: string | null,
  ) => string;

  /** `{ pixels, timestamps, duration, algo }` in, `{ scenes: [start, end][] }` out. */
  detect_scenes_slick: (inputJson: string) => string;
}

interface Module extends Engine {
  default: (options: { module_or_path: string }) => Promise<unknown>;
}

// The module is 1.2 MB (about 410 KB compressed), so it loads on first use rather than on page
// load: a page that costs a megabyte before it can be read would rank worse than one that answers
// a moment later.
//
// The URL lives in a variable because it points into `public/`, which exists only at runtime —
// written inline, Rollup tries to resolve it during the build and fails.
const URL_JS = '/wasm/va_wasm.js';
const URL_WASM = '/wasm/va_wasm_bg.wasm';

let loading: Promise<Engine> | null = null;

export function loadEngine(): Promise<Engine> {
  // Cache the promise, not the result: two tools starting at once must not fetch it twice.
  loading ??= (async () => {
    const module = (await import(/* @vite-ignore */ URL_JS)) as Module;
    await module.default({ module_or_path: URL_WASM });
    return module;
  })();

  return loading;
}
