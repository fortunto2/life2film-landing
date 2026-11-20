/**
 * Automatic montage in the browser: several clips and a song in, the best moments cut to the beat
 * out, nothing uploaded. The same planner as the Life2Film app (`beat_sync_timeline`, profile
 * music-video), loaded on first use from /wasm/montage/ (the full engine, 1.3 MB) — only this page
 * fetches it, and only when someone presses the button.
 *
 * Steps: score frames at 2 fps per clip (score_frame on a 160 px picture) → 2-second segments, scored
 * by the mean of their frames → the song's beats (detect_beats at 22.05 kHz mono) → the plan → each
 * shot decoded from its clip at 30 fps onto one canvas, cover-fit → the song under it, faded out.
 */
import { loadMediabunny } from './encode';
import { openVideo, type OpenedVideo } from './canvas-out';
import { frameSchedule, renderShots, type Shot } from './render-shots';

export { frameSchedule, type Shot };

export interface Segment { segment_id: number; source_id: number; source_file: string; start: number; end: number; score: number; is_garbage: boolean; best_frame_ts: number }

interface Planner {
  default: (o: { module_or_path: string }) => Promise<unknown>;
  score_frame: (w: number, h: number, rgb: Uint8Array, t: number, genre: string | null) => string;
  detect_beats: (samples: Float32Array, rate: number, config: string | null) => string;
  beat_sync_timeline: (input: string) => string;
}
const URL_JS = '/wasm/montage/va_wasm.js';
const URL_WASM = '/wasm/montage/va_wasm_bg.wasm';
let loading: Promise<Planner> | null = null;
function loadPlanner(): Promise<Planner> {
  loading ??= (async () => {
    const m = (await import(/* @vite-ignore */ URL_JS)) as Planner;
    await m.default({ module_or_path: URL_WASM });
    return m;
  })().catch((e: unknown) => { loading = null; throw e; });
  return loading;
}

export const SEGMENT = 2;
export const SAMPLE_FPS = 2;

/**
 * Frame scores (one per 1/SAMPLE_FPS s) into SEGMENT-long windows: mean score, best frame, garbage
 * below 0.25. `clip` is the 0-based clip index; the planner wants `source_id` from 1 and a distinct
 * `source_file` per clip — without `source_file` it treats every segment as one file and fills the
 * film from the first clip (seen 20 Nov 2026: 15 of 15 shots from clip 1 of 3).
 */
export function toSegments(frames: { t: number; score: number }[], duration: number, clip: number, firstId: number): Segment[] {
  const out: Segment[] = [];
  for (let start = 0, k = 0; start < duration - 0.5; start += SEGMENT, k++) {
    const end = Math.min(duration, start + SEGMENT);
    const inside = frames.filter((f) => f.t >= start && f.t < end);
    if (!inside.length) continue;
    const score = inside.reduce((s, f) => s + f.score, 0) / inside.length;
    const best = inside.reduce((a, b) => (b.score > a.score ? b : a));
    out.push({ segment_id: firstId + k, source_id: clip + 1, source_file: `clip-${clip + 1}`, start, end, score, is_garbage: score < 0.25, best_frame_ts: best.t });
  }
  return out;
}

async function scoreClip(p: Planner, clip: OpenedVideo, onFrame: () => void): Promise<{ t: number; score: number }[]> {
  const { CanvasSink } = await loadMediabunny();
  const w = 160, h = Math.max(2, Math.round((160 * clip.height) / clip.width / 2) * 2);
  const times: number[] = [];
  for (let t = 0.25; t < clip.duration; t += 1 / SAMPLE_FPS) times.push(t);
  const frames: { t: number; score: number }[] = [];
  const rgb = new Uint8Array(w * h * 3);
  let i = 0;
  for await (const c of new CanvasSink(clip.video, { width: w, height: h, fit: 'fill', poolSize: 1 }).canvasesAtTimestamps(times)) {
    const t = times[i++];
    onFrame();
    if (!c) continue;
    const ctx = (c.canvas as OffscreenCanvas).getContext('2d')!;
    const rgba = ctx.getImageData(0, 0, w, h).data;
    for (let a = 0, b = 0; a < rgba.length; a += 4, b += 3) { rgb[b] = rgba[a]; rgb[b + 1] = rgba[a + 1]; rgb[b + 2] = rgba[a + 2]; }
    const r = JSON.parse(p.score_frame(w, h, rgb, t, null)) as { score: number };
    frames.push({ t, score: r.score });
  }
  return frames;
}

async function songBeats(p: Planner, song: File): Promise<{ beats: number[]; bpm: number; duration: number }> {
  const ac = new AudioContext();
  let raw: AudioBuffer;
  try { raw = await ac.decodeAudioData(await song.arrayBuffer()); } catch { throw new Error(`${song.name}: this browser cannot decode it. MP3, M4A and WAV work.`); } finally { void ac.close(); }
  const off = new OfflineAudioContext(1, Math.max(1, Math.round(raw.duration * 22_050)), 22_050);
  const n = off.createBufferSource();
  n.buffer = raw; n.connect(off.destination); n.start();
  const mono = (await off.startRendering()).getChannelData(0);
  const r = JSON.parse(p.detect_beats(mono, 22_050, null)) as { beats: number[]; bpm: number };
  return { beats: r.beats, bpm: r.bpm, duration: raw.duration };
}

export interface MontageResult { blob: Blob; duration: number; shots: number; clipsUsed: number; bpm: number }

export async function autoMontage(
  clips: File[], song: File, target: number, shape: 'auto' | '9:16' | '16:9',
  onStage: (stage: 'engine' | 'analyze' | 'music' | 'render', fraction: number) => void,
): Promise<MontageResult> {
  if (!clips.length) throw new Error('Add at least one clip.');
  onStage('engine', 0);
  const p = await loadPlanner();
  const opened = await Promise.all(clips.map((f) => openVideo(f, true)));
  const totalFrames = opened.reduce((s, c) => s + Math.ceil(c.duration * SAMPLE_FPS), 0);
  let done = 0;
  const segments: Segment[] = [];
  for (const [i, c] of opened.entries()) {
    const frames = await scoreClip(p, c, () => onStage('analyze', ++done / totalFrames));
    segments.push(...toSegments(frames, c.duration, i, segments.length));
  }
  onStage('music', 0);
  const music = await songBeats(p, song);
  const ask = Math.min(target, music.duration);
  const plan = JSON.parse(p.beat_sync_timeline(JSON.stringify({ segments, beats: music.beats, profile: 'music-video', target_duration: ask }))) as { shots?: Shot[]; total_duration?: number; error?: string };
  if (plan.error || !plan.shots?.length) throw new Error(plan.error ?? 'The planner found nothing worth keeping. Try brighter or longer clips.');
  const shots = plan.shots;
  const duration = plan.total_duration ?? ask;

  // Output shape: the majority of the clips, ties portrait (the app's rule).
  const portrait = shape === '9:16' || (shape === 'auto' && opened.filter((c) => c.height > c.width).length * 2 >= opened.length);
  const [W, H] = portrait ? [720, 1280] : [1280, 720];
  const { blob } = await renderShots(opened, shots, { W, H, song, onProgress: (f) => onStage('render', f) });
  return { blob, duration, shots: shots.length, clipsUsed: new Set(shots.map((s) => s.source_id)).size, bpm: music.bpm };
}

