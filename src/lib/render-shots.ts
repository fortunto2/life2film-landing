/**
 * Render a list of shots from several clips onto one canvas, cover-fit, 30 fps, with an optional
 * song under the whole film (faded over its last 1.5 s) and optionally each shot's own sound.
 * Shared by the auto montage (shots from the planner) and the video editor (shots from the timeline).
 */
import { loadMediabunny } from './encode';
import { RATE, pushStereo, trackStereo } from './audio-io';
import { FPS, canvasMp4, type OpenedVideo } from './canvas-out';
import { cover } from './blur-fill';

export interface Shot { trim_start: number; trim_end: number; output_start: number; speed: number; segment_id: number; source_id: number }

/** Output frame times of a planned film: for each frame, which clip (0-based) and which moment in it. */
export function frameSchedule(shots: Shot[], fps = FPS): { source: number; t: number }[] {
  const out: { source: number; t: number }[] = [];
  for (const s of shots) {
    const n = shotFrames(s, fps);
    for (let i = 0; i < n; i++) out.push({ source: s.source_id - 1, t: s.trim_start + (i / fps) * (s.speed || 1) });
  }
  return out;
}

export const shotFrames = (s: Shot, fps = FPS) => Math.max(1, Math.round(((s.trim_end - s.trim_start) / (s.speed || 1)) * fps));

/** Song gain under kept clip sound: -12 dB. */
export const SONG_UNDER = 10 ** (-12 / 20);
export const FADE_OUT = 1.5;

export interface RenderOptions {
  W: number;
  H: number;
  song?: File | null;
  /** Keep each shot's own sound (speed-1 shots only); the song then plays at SONG_UNDER. */
  keepClipSound?: boolean;
  onProgress?: (fraction: number) => void;
}

export async function renderShots(opened: OpenedVideo[], shots: Shot[], o: RenderOptions): Promise<{ blob: Blob; duration: number }> {
  const { W, H } = o;
  const clipSound = !!o.keepClipSound && shots.some((s) => opened[s.source_id - 1]?.audio);
  const out = await canvasMp4(W, H, !!o.song || clipSound);
  const { ctx, vsource, asource } = out;
  const { CanvasSink } = await loadMediabunny();
  const schedule = frameSchedule(shots);
  // One decoder per clip, fed only that clip's times, in output order.
  const iters = opened.map((c, i) => {
    const ts = schedule.filter((f) => f.source === i).map((f) => Math.min(c.duration - 1e-3, f.t));
    return ts.length ? new CanvasSink(c.video, { poolSize: 2 }).canvasesAtTimestamps(ts)[Symbol.asyncIterator]() : null;
  });
  for (const [k, f] of schedule.entries()) {
    const next = await iters[f.source]!.next();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    const c = next.value?.canvas as OffscreenCanvas | undefined;
    if (c) { const r = cover(c.width, c.height, W, H); ctx.drawImage(c, r.x, r.y, r.w, r.h); }
    await vsource.add(k / FPS, 1 / FPS);
    if (k % 15 === 0) o.onProgress?.(k / schedule.length);
  }
  vsource.close();
  const duration = schedule.length / FPS;
  if (asource) {
    const N = Math.max(1, Math.round(duration * RATE));
    const L = new Float32Array(N), R = new Float32Array(N);
    let any = false;
    if (clipSound) {
      let at = 0;
      for (const s of shots) {
        const frames = shotFrames(s);
        const a = opened[s.source_id - 1]?.audio;
        if (a && (s.speed || 1) === 1) {
          const pcm = await trackStereo(a, frames / FPS, undefined, s.trim_start);
          if (pcm) { mixInto(L, pcm[0], Math.round((at / FPS) * RATE)); mixInto(R, pcm[1], Math.round((at / FPS) * RATE)); any = true; }
        }
        at += frames;
      }
    }
    if (o.song) {
      const { Input, BlobSource, ALL_FORMATS } = await loadMediabunny();
      const track = await new Input({ source: new BlobSource(o.song), formats: ALL_FORMATS }).getPrimaryAudioTrack();
      const level = clipSound ? SONG_UNDER : 1;
      const pcm = await trackStereo(track, duration, (off) => {
        const g = off.createGain();
        g.gain.setValueAtTime(level, 0);
        g.gain.setValueAtTime(level, Math.max(0, duration - FADE_OUT));
        g.gain.linearRampToValueAtTime(0, duration);
        g.connect(off.destination);
        return g;
      });
      if (pcm) { mixInto(L, pcm[0], 0); mixInto(R, pcm[1], 0); any = true; }
    }
    if (any) await pushStereo(asource, L, R);
    else asource.close();
  }
  return { blob: await out.finish(), duration };
}

/** Add `src` into `dst` from sample `at`, clipped to dst's length. */
export function mixInto(dst: Float32Array, src: Float32Array, at: number): void {
  const n = Math.min(src.length, dst.length - at);
  for (let i = 0; i < n; i++) dst[at + i] += src[i];
}
