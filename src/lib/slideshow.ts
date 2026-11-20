/**
 * Photos (and an optional song) into a video: each photo held for a few seconds with a slow zoom,
 * half-second crossfades between them, the song trimmed to the film and faded out. Only two photos
 * are decoded at a time, each scaled down to the frame on arrival, so a hundred 12-megapixel phone
 * shots do not need gigabytes of memory.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

export type Shape = '9:16' | '16:9' | '1:1';
export const SHAPES: Record<Shape, [number, number]> = { '9:16': [1080, 1920], '16:9': [1920, 1080], '1:1': [1080, 1080] };
const FPS = 30;
const FADE = 0.5;
const ZOOM = 0.08;

export interface SlideshowOptions {
  shape: Shape;
  /** Seconds each photo is on screen, crossfade included. */
  perPhoto: number;
  music?: File | null;
  onProgress?: (fraction: number) => void;
}

/** Where a photo sits at local time `u` (0..1 of its slot): cover-fit, zoomed by up to ZOOM. */
export function zoomAt(u: number): number {
  return 1 + ZOOM * Math.min(1, Math.max(0, u));
}

/** Which photo(s) show at time t, and the incoming one's opacity during a crossfade. */
export function slideAt(t: number, per: number, count: number): { index: number; local: number; next: number; alpha: number } {
  const index = Math.min(count - 1, Math.floor(t / per));
  const local = t - index * per;
  const into = local - (per - FADE);
  if (index + 1 < count && into > 0) return { index, local, next: index + 1, alpha: Math.min(1, into / FADE) };
  return { index, local, next: -1, alpha: 0 };
}

async function prepare(file: File, w: number, h: number): Promise<OffscreenCanvas> {
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error(`${file.name}: this browser cannot open it. JPG, PNG and WebP work everywhere; HEIC only in Safari.`);
  });
  // Cover the frame at full zoom, then forget the full-size bitmap.
  const s = Math.max((w * (1 + ZOOM)) / bitmap.width, (h * (1 + ZOOM)) / bitmap.height);
  const c = new OffscreenCanvas(Math.ceil(bitmap.width * s), Math.ceil(bitmap.height * s));
  const g = c.getContext('2d');
  if (!g) throw new Error('Canvas is unavailable in this browser.');
  g.imageSmoothingQuality = 'high';
  g.drawImage(bitmap, 0, 0, c.width, c.height);
  bitmap.close();
  return c;
}

function draw(ctx: OffscreenCanvasRenderingContext2D, img: OffscreenCanvas, w: number, h: number, u: number, alpha: number) {
  const z = zoomAt(u) / (1 + ZOOM);
  const dw = img.width * z;
  const dh = img.height * z;
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  ctx.globalAlpha = 1;
}

export async function makeSlideshow(photos: File[], o: SlideshowOptions): Promise<{ blob: Blob; duration: number }> {
  if (!photos.length) throw new Error('Add at least one photo.');
  const { Output, StreamTarget, Mp4OutputFormat, CanvasSource, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH } = await loadMediabunny();
  const [w, h] = SHAPES[o.shape];
  const per = Math.max(1, o.perPhoto);
  const duration = photos.length * per;
  const format = new Mp4OutputFormat();
  const vcodec = await encodableCodec('mp4', { width: w, height: h });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');

  // The song, decoded once, rendered to the film's length at 48 kHz stereo, faded over its last 2 s.
  let song: AudioBuffer | null = null;
  if (o.music) {
    const ctx = new AudioContext();
    try {
      const raw = await ctx.decodeAudioData(await o.music.arrayBuffer());
      const off = new OfflineAudioContext(2, Math.round(duration * 48_000), 48_000);
      const node = off.createBufferSource();
      node.buffer = raw;
      const gain = off.createGain();
      gain.gain.setValueAtTime(1, Math.max(0, duration - 2));
      gain.gain.linearRampToValueAtTime(0, duration);
      node.connect(gain).connect(off.destination);
      node.start();
      song = await off.startRendering();
    } catch {
      throw new Error(`${o.music.name}: this browser cannot decode it. Try MP3 or M4A.`);
    } finally {
      void ctx.close();
    }
  }
  const acodec = song ? await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: 2, sampleRate: 48_000, bitrate: 192_000 }) : null;

  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  const sink = new PieceSink();
  const output = new Output({ format, target: new StreamTarget(sink.stream(), { chunked: true }) });
  const vsource = new CanvasSource(canvas, { codec: vcodec, bitrate: QUALITY_HIGH, keyFrameInterval: 2 });
  output.addVideoTrack(vsource, { frameRate: FPS });
  const asource = song && acodec ? new AudioBufferSource({ codec: acodec, bitrate: 192_000 }) : null;
  if (asource) output.addAudioTrack(asource);
  await output.start();

  // Two photos in memory at most: the one on screen and the one fading in.
  const ready = new Map<number, OffscreenCanvas>();
  const get = async (i: number) => {
    let c = ready.get(i);
    if (!c) { c = await prepare(photos[i], w, h); ready.set(i, c); }
    return c;
  };

  const frames = Math.round(duration * FPS);
  for (let f = 0; f < frames; f++) {
    const t = f / FPS;
    const s = slideAt(t, per, photos.length);
    for (const k of [...ready.keys()]) if (k < s.index) ready.delete(k);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    draw(ctx, await get(s.index), w, h, s.local / per, 1);
    if (s.next >= 0) draw(ctx, await get(s.next), w, h, 0, s.alpha);
    await vsource.add(t, 1 / FPS);
    o.onProgress?.(Math.min(0.97, (f / frames) * (asource ? 0.9 : 0.97)));
  }
  vsource.close();

  if (asource && song) {
    for (let off = 0; off < song.length; off += 48_000) {
      const n = Math.min(48_000, song.length - off);
      const b = new AudioBuffer({ length: n, numberOfChannels: 2, sampleRate: 48_000 });
      b.getChannelData(0).set(song.getChannelData(0).subarray(off, off + n));
      b.getChannelData(1).set(song.getChannelData(1).subarray(off, off + n));
      await asource.add(b);
    }
    asource.close();
  }
  await output.finalize();
  o.onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), duration };
}
