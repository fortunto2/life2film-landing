/* tslint:disable */
/* eslint-disable */

/**
 * Analyze audio: silence, content type, structure.
 *
 * Input: PCM samples (mono f32) + sample_rate.
 * Returns: JSON `{ duration, content_type, regions, sections, leading_silence, trailing_silence, spectral_flatness }`
 */
export function analyze_audio(samples: Float32Array, sample_rate: number, config_json?: string | null): string;

/**
 * Build a montage timeline from scored segments and configuration.
 *
 * Unified CRF-based entry point. Profile defaults to quality-only.
 *
 * Input: JSON `{ segments: [SegmentScore], beats?: [f64], config?: BeatSyncConfig, profile?: string, target_duration?: f64 }`
 * - `profile`: `"film"` | `"music-video"` | `"transcript"` | `"travel"` | `"family"` | `"documentary"` (default: quality-only)
 * - `target_duration`: target output length in seconds (default: 0 = unlimited)
 * Returns: Timeline JSON `{ shots: [...], total_duration, mode }`
 *
 * JS usage:
 * ```js
 * const segments = analysisResult.segments.map(s => ({
 *     start: s.start,
 *     end: s.end,
 *     segment_id: s.segment_id,
 *     source_id: s.source_id ?? 0,
 *     score: s.score,
 *     is_garbage: s.is_garbage,
 *     best_frame_ts: s.best_frame_ts,
 * }));
 * const json = wasm.beat_sync_timeline(JSON.stringify({
 *     segments,
 *     beats: beatTimestamps,  // optional: empty = film mode
 *     profile: "film",
 *     target_duration: 60.0,
 * }));
 * ```
 */
export function beat_sync_timeline(input_json: string): string;

/**
 * Build OTIO JSON from analysis results.
 *
 * Input: JSON matching OtioInput structure.
 */
export function build_otio(input_json: string): string;

/**
 * Compute cache fingerprint from file head bytes + total file size.
 *
 * JS usage (File API → WASM → IndexedDB key):
 * ```js
 * const file = inputElement.files[0];
 * const head = await file.slice(0, 65536).arrayBuffer();
 * const fingerprint = wasm.cache_fingerprint(new Uint8Array(head), BigInt(file.size));
 * ```
 */
export function cache_fingerprint(head_bytes: Uint8Array, file_size: bigint): string;

/**
 * Inject fingerprint into OTIO JSON for caching. Returns enriched JSON.
 *
 * JS usage:
 * ```js
 * const otio = wasm.build_otio(input);
 * const cached = wasm.cache_prepare(otio, fingerprint);
 * localStorage.setItem(`va-cache:${fingerprint}`, cached);
 * ```
 */
export function cache_prepare(otio_json: string, fingerprint: string): string;

/**
 * Check if OTIO JSON has a matching fingerprint. Returns `true` if valid.
 *
 * JS usage:
 * ```js
 * const cached = localStorage.getItem(`va-cache:${fingerprint}`);
 * if (cached && wasm.cache_validate(cached, fingerprint)) { ... }
 * ```
 */
export function cache_validate(otio_json: string, fingerprint: string): boolean;

/**
 * Compose a montage Timeline (from va-director) into OTIO JSON.
 *
 * Input: JSON `{ timeline: Timeline, media: { path, duration_secs, fps } }`
 * Returns: OTIO JSON string.
 *
 * JS usage:
 * ```js
 * const timelineJson = wasm.beat_sync_timeline(input);
 * const timeline = JSON.parse(timelineJson);
 * const otio = wasm.compose_montage(JSON.stringify({
 *     timeline,
 *     media: { path: "video.mp4", duration_secs: 120.0, fps: 30.0 }
 * }));
 * ```
 */
export function compose_montage(input_json: string): string;

/**
 * Detect beats in PCM audio samples (mono f32, any sample rate).
 *
 * Input: JSON `{ samples: Float32Array (base64 or array), sample_rate: u32, config?: { min_bpm?, max_bpm?, tightness?, trim? } }`
 * Returns: JSON `{ beats: [f64], bpm: f64 }`
 *
 * JS usage (Web Audio API decode → Float32Array → WASM):
 * ```js
 * const audioCtx = new AudioContext({ sampleRate: 22050 });
 * const resp = await fetch(audioUrl);
 * const buf = await audioCtx.decodeAudioData(await resp.arrayBuffer());
 * const mono = buf.getChannelData(0); // Float32Array
 * const json = wasm.detect_beats(mono, 22050);
 * ```
 */
export function detect_beats(samples: Float32Array, sample_rate: number, config_json?: string | null): string;

/**
 * Detect scene boundaries from content deltas (HSV frame-to-frame differences).
 *
 * Input: JSON `{ deltas: [{ timestamp, delta_hue, delta_sat, delta_lum }], duration, threshold?, method? }`
 * method: "content" (default) or "adaptive"
 */
export function detect_scenes_content(input_json: string): string;

/**
 * Detect scene boundaries from N-dim feature vectors (L2 or cosine distance).
 *
 * Input: JSON `{ features: [[f32; N]], timestamps: [f64], duration, method?, threshold_k?, min_gap? }`
 * method: "feature_l2" (default) or "feature_cosine"
 */
export function detect_scenes_features(input_json: string): string;

/**
 * Detect scene boundaries from center pixel diffs (slick algorithms).
 *
 * Input: JSON `{ pixels: [{ r, g, b }], timestamps: [f64], duration, algo?, config? }`
 */
export function detect_scenes_slick(input_json: string): string;

/**
 * Get all feature names in canonical order.
 */
export function feature_names(): string;

/**
 * Get scoring weights for a genre. Returns JSON `{ weights: { name: value }, bias }`.
 */
export function get_weights(genre: string): string;

/**
 * Parse OTIO JSON back to analysis data.
 */
export function parse_otio(otio_json: string): string;

/**
 * Get all available scene detection algorithm names.
 */
export function scene_algorithms(): string;

/**
 * Score a single RGB24 frame. Returns FrameFeatures as JSON.
 *
 * JS usage:
 * ```js
 * const ctx = canvas.getContext('2d');
 * ctx.drawImage(video, 0, 0, w, h);
 * const rgba = ctx.getImageData(0, 0, w, h).data;
 * // Convert RGBA → RGB24 (drop alpha)
 * const rgb = new Uint8Array(w * h * 3);
 * for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
 *     rgb[j] = rgba[i]; rgb[j+1] = rgba[i+1]; rgb[j+2] = rgba[i+2];
 * }
 * const json = wasm.score_frame(w, h, rgb, 1.5, "default");
 * ```
 */
export function score_frame(w: number, h: number, rgb24: Uint8Array, timestamp: number, genre?: string | null): string;

/**
 * Score multiple pre-computed FrameFeatures and return segment scores.
 *
 * Input: JSON array of `{ segments: [...], features: [...], genre?: string }`
 * - segments: `[{ id, start, end }]`
 * - features: `[{ timestamp, scores: { sharpness: 0.5, ... } }]`
 */
export function score_segments(input_json: string): string;

/**
 * Select best segments for target duration using knapsack algorithms.
 *
 * Input: JSON `{ segments: [{ id, start, end, score, is_garbage }], target, mode? }`
 * mode: "greedy" (default), "dp", "graph"
 */
export function select_segments(input_json: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly analyze_audio: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly beat_sync_timeline: (a: number, b: number) => [number, number];
    readonly build_otio: (a: number, b: number) => [number, number];
    readonly cache_fingerprint: (a: number, b: number, c: bigint) => [number, number];
    readonly cache_prepare: (a: number, b: number, c: number, d: number) => [number, number];
    readonly cache_validate: (a: number, b: number, c: number, d: number) => number;
    readonly compose_montage: (a: number, b: number) => [number, number];
    readonly detect_beats: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly detect_scenes_content: (a: number, b: number) => [number, number];
    readonly detect_scenes_features: (a: number, b: number) => [number, number];
    readonly detect_scenes_slick: (a: number, b: number) => [number, number];
    readonly feature_names: () => [number, number];
    readonly get_weights: (a: number, b: number) => [number, number];
    readonly parse_otio: (a: number, b: number) => [number, number];
    readonly scene_algorithms: () => [number, number];
    readonly score_frame: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly score_segments: (a: number, b: number) => [number, number];
    readonly select_segments: (a: number, b: number) => [number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
