/**
 * Audio into a video people can post: a cover image (or a plain colour) with the sound under it, and
 * optionally live level bars that move with the music. For YouTube, which takes no bare MP3, and for
 * podcasts and demos. The picture changes only as much as the bars do, so it encodes small.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

export type Shape = '16:9' | '1:1' | '9:16';
export const SHAPES: Record<Shape, [number, number]> = { '16:9': [1280, 720], '1:1': [1080, 1080], '9:16': [1080, 1920] };
const FPS = 24;

/**
 * Bar heights 0..1 for the frame at time `t`: `count` bands over the 1/FPS window, each the RMS of
 * its slice of samples (a cheap stand-in for a spectrum that still reads as «the music moving»),
 * scaled so the loudest frame of the song reaches 1.
 */
export function barsAt(x: Float32Array, sampleRate: number, t: number, count: number, peakRms: number): number[] {
  const win = Math.round(sampleRate / FPS);
  const start = Math.round(t * sampleRate);
  const per = Math.max(1, Math.floor(win / count));
  const out: number[] = [];
  for (let b = 0; b < count; b++) {
    let s = 0;
    const from = start + b * per;
    for (let i = 0; i < per; i++) {
      const v = x[from + i] ?? 0;
      s += v * v;
    }
    out.push(Math.min(1, Math.sqrt(s / per) / (peakRms || 1)));
  }
  return out;
}

/** The loudest per-frame RMS of the song, for scaling the bars. */
export function peakFrameRms(x: Float32Array, sampleRate: number): number {
  const win = Math.round(sampleRate / FPS);
  let peak = 0;
  for (let a = 0; a + win <= x.length; a += win) {
    let s = 0;
    for (let i = a; i < a + win; i++) s += x[i] * x[i];
    peak = Math.max(peak, Math.sqrt(s / win));
  }
  return peak;
}

export interface AudioToVideoOptions {
  shape: Shape;
  image: File | null;
  bars: boolean;
  onProgress?: (fraction: number) => void;
}

export async function audioToVideo(audio: File, o: AudioToVideoOptions): Promise<{ blob: Blob; duration: number }> {
  const { Output, StreamTarget, Mp4OutputFormat, CanvasSource, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_MEDIUM } = await loadMediabunny();
  const ctx = new AudioContext();
  let song: AudioBuffer;
  try {
    song = await ctx.decodeAudioData(await audio.arrayBuffer());
  } catch {
    throw new Error('This browser cannot decode that file. MP3, M4A and WAV work everywhere.');
  } finally {
    void ctx.close();
  }
  const [w, h] = SHAPES[o.shape];
  const format = new Mp4OutputFormat();
  const vcodec = await encodableCodec('mp4', { width: w, height: h });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const channels = Math.min(2, song.numberOfChannels);
  const acodec = await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: channels, sampleRate: song.sampleRate, bitrate: 192_000 });
  if (!acodec) throw new Error('This browser cannot encode audio for MP4.');

  const canvas = new OffscreenCanvas(w, h);
  const g = canvas.getContext('2d');
  if (!g) throw new Error('Canvas is unavailable in this browser.');
  // The still background, drawn once: the cover fitted inside the frame over a blurred copy of itself.
  const bg = new OffscreenCanvas(w, h);
  const bgc = bg.getContext('2d')!;
  bgc.fillStyle = '#111';
  bgc.fillRect(0, 0, w, h);
  if (o.image) {
    const bmp = await createImageBitmap(o.image).catch(() => {
      throw new Error(`${o.image!.name}: this browser cannot open that image. JPG, PNG and WebP work.`);
    });
    const cover = Math.max(w / bmp.width, h / bmp.height);
    bgc.filter = 'blur(30px) brightness(0.5)';
    bgc.drawImage(bmp, (w - bmp.width * cover) / 2, (h - bmp.height * cover) / 2, bmp.width * cover, bmp.height * cover);
    bgc.filter = 'none';
    const fit = Math.min((w * 0.8) / bmp.width, (h * (o.bars ? 0.62 : 0.8)) / bmp.height);
    const dw = bmp.width * fit;
    const dh = bmp.height * fit;
    bgc.drawImage(bmp, (w - dw) / 2, (h * (o.bars ? 0.42 : 0.5)) - dh / 2, dw, dh);
    bmp.close();
  }

  const mono = song.getChannelData(0);
  const peak = peakFrameRms(mono, song.sampleRate);
  const sink = new PieceSink();
  const output = new Output({ format, target: new StreamTarget(sink.stream(), { chunked: true }) });
  const vsource = new CanvasSource(canvas, { codec: vcodec, bitrate: QUALITY_MEDIUM, keyFrameInterval: 4 });
  output.addVideoTrack(vsource, { frameRate: FPS });
  const asource = new AudioBufferSource({ codec: acodec, bitrate: 192_000 });
  output.addAudioTrack(asource);
  await output.start();

  const count = 48;
  const frames = Math.ceil(song.duration * FPS);
  for (let f = 0; f < frames; f++) {
    const t = f / FPS;
    g.drawImage(bg, 0, 0);
    if (o.bars) {
      const levels = barsAt(mono, song.sampleRate, t, count, peak);
      const area = w * 0.8;
      const bw = area / count;
      const base = h * 0.88;
      const maxH = h * 0.14;
      g.fillStyle = 'rgba(255,255,255,0.9)';
      levels.forEach((v, i) => {
        const bh = Math.max(3, v * maxH);
        g.fillRect((w - area) / 2 + i * bw + bw * 0.15, base - bh, bw * 0.7, bh);
      });
    }
    await vsource.add(t, 1 / FPS);
    if (f % 24 === 0) o.onProgress?.(Math.min(0.95, (f / frames) * 0.95));
  }
  vsource.close();
  const sr = song.sampleRate;
  for (let off = 0; off < song.length; off += sr) {
    const n = Math.min(sr, song.length - off);
    const b = new AudioBuffer({ length: n, numberOfChannels: channels, sampleRate: sr });
    for (let c = 0; c < channels; c++) b.getChannelData(c).set(song.getChannelData(c).subarray(off, off + n));
    await asource.add(b);
  }
  asource.close();
  await output.finalize();
  o.onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), duration: song.duration };
}
