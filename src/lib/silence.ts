/**
 * Cut the pauses out of a talking video (a "jump cut"): the sound is measured in 20 ms windows, spans
 * quieter than a threshold for longer than `minSilence` are dropped, a little padding kept on both
 * sides of speech so words are not clipped. Picture and sound are rebuilt from the kept ranges.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';
import { RATE, pushStereo, trackStereo } from './audio-io';

const FPS = 30;
export const WINDOW = 0.02;

/** RMS of each WINDOW-second slice of a mono signal. */
export function windowRms(x: Float32Array, rate: number): Float32Array {
  const n = Math.max(1, Math.round(WINDOW * rate));
  const out = new Float32Array(Math.ceil(x.length / n));
  for (let w = 0; w < out.length; w++) {
    let s = 0;
    const end = Math.min(x.length, (w + 1) * n);
    for (let i = w * n; i < end; i++) s += x[i] * x[i];
    out[w] = Math.sqrt(s / Math.max(1, end - w * n));
  }
  return out;
}

/**
 * Ranges to keep, in seconds. A window is loud when its level is above `threshold` (linear RMS);
 * a quiet run shorter than `minSilence` is kept as part of the speech; every kept range is widened
 * by `pad` on both sides and overlapping ranges merge.
 */
export function keepRanges(rms: Float32Array, duration: number, threshold: number, minSilence = 0.5, pad = 0.12): [number, number][] {
  const loud: [number, number][] = [];
  let start = -1;
  for (let w = 0; w <= rms.length; w++) {
    const on = w < rms.length && rms[w] > threshold;
    if (on && start < 0) start = w;
    if (!on && start >= 0) { loud.push([start * WINDOW, w * WINDOW]); start = -1; }
  }
  const merged: [number, number][] = [];
  for (const [a, b] of loud) {
    const last = merged[merged.length - 1];
    if (last && a - last[1] < minSilence) last[1] = b;
    else merged.push([a, b]);
  }
  const out: [number, number][] = [];
  for (const [a, b] of merged) {
    const r: [number, number] = [Math.max(0, a - pad), Math.min(duration, b + pad)];
    const last = out[out.length - 1];
    if (last && r[0] <= last[1]) last[1] = r[1];
    else out.push(r);
  }
  return out;
}

/** dBFS (e.g. -40) to linear RMS. */
export const fromDb = (db: number) => 10 ** (db / 20);

/** The file's sound as 48 kHz stereo, read through mediabunny (the video itself is never loaded whole). */
async function decodeStereo(file: File): Promise<[Float32Array, Float32Array]> {
  const { Input, BlobSource, ALL_FORMATS } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const pcm = await trackStereo(await input.getPrimaryAudioTrack(), await input.computeDuration());
  if (!pcm) throw new Error('This browser cannot decode the sound of that file. MP4 and MOV usually work.');
  return pcm;
}

export async function removeSilence(file: File, thresholdDb: number, minSilence: number, onProgress?: (f: number) => void): Promise<{ blob: Blob; before: number; after: number; cuts: number }> {
  const [L, R] = await decodeStereo(file);
  const mono = new Float32Array(L.length);
  for (let i = 0; i < L.length; i++) mono[i] = (L[i] + R[i]) / 2;
  const before = L.length / RATE;
  const ranges = keepRanges(windowRms(mono, RATE), before, fromDb(thresholdDb), minSilence);
  if (!ranges.length) throw new Error('Nothing louder than the threshold was found. Try a lower threshold.');
  const r = await renderRanges(file, ranges, onProgress, [L, R]);
  return { blob: r.blob, before: r.before, after: r.after, cuts: Math.max(0, ranges.length - 1) };
}

/**
 * Keep only `ranges` (seconds, ascending, non-overlapping) of a video, joined in order: picture and
 * sound together, 5 ms ramps at every join. `pcm` skips decoding the sound again when the caller has it.
 */
export async function renderRanges(file: File, ranges: [number, number][], onProgress?: (f: number) => void, pcm?: [Float32Array, Float32Array]): Promise<{ blob: Blob; before: number; after: number }> {
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, CanvasSink, CanvasSource, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH } = await loadMediabunny();
  const rate = RATE;
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const video = await input.getPrimaryVideoTrack();
  if (!video) throw new Error('That file has no picture.');
  if (!(await video.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const before = await input.computeDuration();
  ranges = ranges.map(([a, b]) => [Math.max(0, a), Math.min(before, b)] as [number, number]).filter(([a, b]) => b - a > 1 / FPS);
  if (!ranges.length) throw new Error('Nothing would be left.');
  const audio = await input.getPrimaryAudioTrack();
  const [L, R] = pcm ?? (audio ? await decodeStereo(file) : [new Float32Array(0), new Float32Array(0)]);
  const after = ranges.reduce((s, [a, b]) => s + (b - a), 0);
  const width = video.displayWidth - (video.displayWidth % 2), height = video.displayHeight - (video.displayHeight % 2);
  const format = new Mp4OutputFormat();
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const acodec = L.length === 0 ? null : await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: 2, sampleRate: rate, bitrate: 192_000 });
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  const sink = new PieceSink();
  const output = new Output({ format, target: new StreamTarget(sink.stream(), { chunked: true }) });
  const vsource = new CanvasSource(canvas, { codec: vcodec, bitrate: QUALITY_HIGH, keyFrameInterval: 2 });
  output.addVideoTrack(vsource, { frameRate: FPS });
  const asource = acodec ? new AudioBufferSource({ codec: acodec, bitrate: 192_000 }) : null;
  if (asource) output.addAudioTrack(asource);
  await output.start();

  // Output frame k shows the source moment that maps to k/FPS on the cut timeline.
  const count = Math.max(1, Math.floor(after * FPS));
  const times: number[] = [];
  let ri = 0, acc = 0;
  for (let k = 0; k < count; k++) {
    const t = k / FPS;
    while (ri < ranges.length - 1 && t >= acc + (ranges[ri][1] - ranges[ri][0])) { acc += ranges[ri][1] - ranges[ri][0]; ri++; }
    times.push(Math.min(before - 1e-3, ranges[ri][0] + (t - acc)));
  }
  let k = 0;
  for await (const wrapped of new CanvasSink(video, { width, height, fit: 'fill', poolSize: 2 }).canvasesAtTimestamps(times)) {
    if (wrapped) ctx.drawImage(wrapped.canvas as OffscreenCanvas, 0, 0, width, height);
    await vsource.add(k / FPS, 1 / FPS);
    if (k % 15 === 0) onProgress?.(Math.min(0.9, (k / count) * 0.9));
    k++;
  }
  vsource.close();

  if (asource) {
    const n = Math.round(after * rate);
    const oL = new Float32Array(n), oR = new Float32Array(n);
    let o = 0;
    const fade = Math.round(0.005 * rate); // 5 ms ramps so the joins do not click
    for (const [a, b] of ranges) {
      const s0 = Math.round(a * rate), s1 = Math.min(L.length, Math.round(b * rate));
      const len = Math.min(s1 - s0, n - o);
      for (let i = 0; i < len; i++) {
        const g = Math.min(1, i / fade, (len - 1 - i) / fade);
        oL[o + i] = L[s0 + i] * g;
        oR[o + i] = R[s0 + i] * g;
      }
      o += len;
    }
    await pushStereo(asource, oL, oR);
  }
  await output.finalize();
  onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), before, after };
}
