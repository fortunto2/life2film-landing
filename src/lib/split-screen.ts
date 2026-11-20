/**
 * Two videos in one frame: side by side (16:9) or one above the other (9:16), each filling its half
 * (cropped to cover, never stretched), playing together for as long as the shorter one lasts. Sound
 * from the first, the second, or both mixed. In the browser.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';
import { cover, type Rect } from './blur-fill';

export type Layout = 'side' | 'stack' | 'pip';
export type SoundFrom = 'a' | 'b' | 'both';
const FPS = 30;

/** Output size and the two cells for a layout, with a `gap` px divider. */
export function cells(layout: Layout, gap = 8): { width: number; height: number; a: Rect; b: Rect } {
  if (layout === 'side') {
    const width = 1920, height = 1080, cw = (width - gap) / 2;
    return { width, height, a: { x: 0, y: 0, w: cw, h: height }, b: { x: cw + gap, y: 0, w: cw, h: height } };
  }
  if (layout === 'pip') {
    // The first fills a 16:9 frame; the second sits in the bottom-right quarter-width corner.
    const width = 1920, height = 1080, w = 480, h = 270, m = 32;
    return { width, height, a: { x: 0, y: 0, w: width, h: height }, b: { x: width - w - m, y: height - h - m, w, h } };
  }
  const width = 1080, height = 1920, ch = (height - gap) / 2;
  return { width, height, a: { x: 0, y: 0, w: width, h: ch }, b: { x: 0, y: ch + gap, w: width, h: ch } };
}

/** Mix two mono-or-stereo channel sets to stereo at equal weight, clamped. */
export function mixStereo(a: Float32Array[] | null, b: Float32Array[] | null, length: number): [Float32Array, Float32Array] {
  const L = new Float32Array(length), R = new Float32Array(length);
  const sets = [a, b].filter((s): s is Float32Array[] => !!s);
  const k = sets.length > 1 ? 0.7 : 1;
  for (const s of sets) {
    const l = s[0], r = s[1] ?? s[0];
    for (let i = 0; i < length; i++) { L[i] += (l[i] ?? 0) * k; R[i] += (r[i] ?? 0) * k; }
  }
  for (let i = 0; i < length; i++) { L[i] = Math.max(-1, Math.min(1, L[i])); R[i] = Math.max(-1, Math.min(1, R[i])); }
  return [L, R];
}

/**
 * Up to four clips side by side in a 2x2 grid (1920x1080); three put the first on the left half and
 * the other two stacked on the right. Gap 8 px.
 */
export function gridCells(n: number, gap = 8): { width: number; height: number; cells: Rect[] } {
  const width = 1920, height = 1080, cw = (width - gap) / 2, ch = (height - gap) / 2;
  const tl = { x: 0, y: 0, w: cw, h: ch }, tr = { x: cw + gap, y: 0, w: cw, h: ch };
  const bl = { x: 0, y: ch + gap, w: cw, h: ch }, br = { x: cw + gap, y: ch + gap, w: cw, h: ch };
  if (n <= 2) { const c = cells('side', gap); return { width, height, cells: [c.a, c.b] }; }
  if (n === 3) return { width, height, cells: [{ x: 0, y: 0, w: cw, h: height }, tr, br] };
  return { width, height, cells: [tl, tr, bl, br] };
}

export function splitScreen(fa: File, fb: File, layout: Layout, sound: SoundFrom, onProgress?: (f: number) => void) {
  const { width, height, a, b } = cells(layout);
  return compose([fa, fb], { width, height, cells: [a, b] }, sound === 'a' ? [0] : sound === 'b' ? [1] : [0, 1], onProgress);
}

/** 2 to 4 clips in a grid; sound from the first. */
export function collage(files: File[], onProgress?: (f: number) => void) {
  if (files.length < 2) throw new Error('Choose two to four videos.');
  const list = files.slice(0, 4);
  return compose(list, gridCells(list.length), [0], onProgress);
}

/** Draw each clip into its cell (cropped to cover) for as long as the shortest; mix the chosen sounds. */
async function compose(files: File[], frame: { width: number; height: number; cells: Rect[] }, soundFrom: number[], onProgress?: (f: number) => void): Promise<{ blob: Blob; duration: number }> {
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, CanvasSink, CanvasSource, AudioBufferSink, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH } = await loadMediabunny();
  const open = async (f: File) => {
    const input = new Input({ source: new BlobSource(f), formats: ALL_FORMATS });
    const video = await input.getPrimaryVideoTrack();
    if (!video) throw new Error(`${f.name}: no picture.`);
    if (!(await video.canDecode())) throw new Error(`${f.name}: this browser cannot decode it. Chrome or Edge usually can.`);
    return { input, video, audio: await input.getPrimaryAudioTrack(), duration: await input.computeDuration() };
  };
  const clips: Awaited<ReturnType<typeof open>>[] = [];
  for (const f of files) clips.push(await open(f));
  const duration = Math.min(...clips.map((c) => c.duration));
  const { width, height } = frame;
  const format = new Mp4OutputFormat();
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const rate = 48_000;
  const acodec = await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: 2, sampleRate: rate, bitrate: 192_000 });

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

  const count = Math.max(1, Math.floor(duration * FPS));
  const times = Array.from({ length: count }, (_, i) => i / FPS);
  const iters = clips.map((c) => new CanvasSink(c.video, { poolSize: 2 }).canvasesAtTimestamps(times)[Symbol.asyncIterator]());
  const draw = (c: OffscreenCanvas | HTMLCanvasElement, cell: Rect) => {
    const r = cover(c.width, c.height, cell.w, cell.h);
    ctx.save();
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, cell.w, cell.h);
    ctx.clip();
    ctx.drawImage(c, cell.x + r.x, cell.y + r.y, r.w, r.h);
    ctx.restore();
  };
  ctx.fillStyle = '#000';
  for (let i = 0; i < count; i++) {
    const got = await Promise.all(iters.map((it) => it.next()));
    ctx.fillRect(0, 0, width, height);
    got.forEach((g, k) => { if (!g.done && g.value) draw(g.value.canvas as OffscreenCanvas, frame.cells[k]); });
    await vsource.add(i / FPS, 1 / FPS);
    if (i % 15 === 0) onProgress?.(Math.min(0.9, (i / count) * 0.9));
  }
  vsource.close();

  if (asource) {
    const grab = async (t: (typeof clips)[number]): Promise<Float32Array[] | null> => {
      if (!t.audio || !(await t.audio.canDecode().catch(() => false))) return null;
      const parts: AudioBuffer[] = [];
      for await (const { buffer } of new AudioBufferSink(t.audio).buffers(0, duration)) parts.push(buffer);
      if (!parts.length) return null;
      const off = new OfflineAudioContext(2, Math.round(duration * rate), rate);
      let at = 0;
      for (const p of parts) {
        const s = off.createBufferSource();
        s.buffer = p;
        s.connect(off.destination);
        s.start(at);
        at += p.duration;
      }
      const r = await off.startRendering();
      return [r.getChannelData(0), r.getChannelData(1)];
    };
    const sa = soundFrom[0] !== undefined ? await grab(clips[soundFrom[0]]) : null;
    const sb = soundFrom[1] !== undefined ? await grab(clips[soundFrom[1]]) : null;
    const n = Math.round(duration * rate);
    const [L, R] = mixStereo(sa, sb, n);
    for (let o = 0; o < n; o += rate) {
      const len = Math.min(rate, n - o);
      const buf = new AudioBuffer({ length: len, numberOfChannels: 2, sampleRate: rate });
      buf.getChannelData(0).set(L.subarray(o, o + len));
      buf.getChannelData(1).set(R.subarray(o, o + len));
      await asource.add(buf);
    }
    asource.close();
  }
  await output.finalize();
  onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), duration };
}
