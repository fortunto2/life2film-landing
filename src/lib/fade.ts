/**
 * Redraw every frame of a video on a canvas (fade, progress bar…) and keep its sound, optionally
 * faded with the picture. In the browser.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

const FPS = 30;

/** Opacity of the picture at time t: 0→1 over `fin`, 1→0 over the last `fout` seconds. */
export function fadeGain(t: number, duration: number, fin: number, fout: number): number {
  const a = fin > 0 ? Math.min(1, Math.max(0, t / fin)) : 1;
  const b = fout > 0 ? Math.min(1, Math.max(0, (duration - t) / fout)) : 1;
  return Math.min(a, b);
}

export type Decorate = (ctx: OffscreenCanvasRenderingContext2D, t: number, duration: number, width: number, height: number) => void;

export function fadeVideo(file: File, fin: number, fout: number, onProgress?: (f: number) => void) {
  return redrawVideo(file, { fin, fout }, onProgress);
}

export async function redrawVideo(file: File, o: { fin?: number; fout?: number; decorate?: Decorate }, onProgress?: (f: number) => void): Promise<{ blob: Blob; duration: number }> {
  const fin = o.fin ?? 0, fout = o.fout ?? 0;
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, CanvasSink, CanvasSource, AudioBufferSink, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const video = await input.getPrimaryVideoTrack();
  if (!video) throw new Error('That file has no picture.');
  if (!(await video.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const audio = await input.getPrimaryAudioTrack();
  const duration = await input.computeDuration();
  const width = video.displayWidth - (video.displayWidth % 2), height = video.displayHeight - (video.displayHeight % 2);
  const format = new Mp4OutputFormat();
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const rate = 48_000;
  const hasAudio = !!audio && (await audio.canDecode().catch(() => false));
  const acodec = hasAudio ? await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: 2, sampleRate: rate, bitrate: 192_000 }) : null;

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
  let i = 0;
  for await (const wrapped of new CanvasSink(video, { width, height, fit: 'fill', poolSize: 2 }).canvasesAtTimestamps(times)) {
    const t = i / FPS;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    if (wrapped) {
      ctx.globalAlpha = fadeGain(t, duration, fin, fout);
      ctx.drawImage(wrapped.canvas as OffscreenCanvas, 0, 0, width, height);
      ctx.globalAlpha = 1;
    }
    o.decorate?.(ctx, t, duration, width, height);
    await vsource.add(t, 1 / FPS);
    if (i % 15 === 0) onProgress?.(Math.min(0.9, (i / count) * 0.9));
    i++;
  }
  vsource.close();

  if (asource && audio) {
    const off = new OfflineAudioContext(2, Math.round(duration * rate), rate);
    const gain = off.createGain();
    gain.gain.setValueAtTime(fin > 0 ? 0 : 1, 0);
    if (fin > 0) gain.gain.linearRampToValueAtTime(1, fin);
    if (fout > 0) { gain.gain.setValueAtTime(1, Math.max(fin, duration - fout)); gain.gain.linearRampToValueAtTime(0, duration); }
    gain.connect(off.destination);
    let at = 0;
    for await (const { buffer } of new AudioBufferSink(audio).buffers(0, duration)) {
      const s = off.createBufferSource();
      s.buffer = buffer;
      s.connect(gain);
      s.start(at);
      at += buffer.duration;
    }
    const r = await off.startRendering();
    for (let o = 0; o < r.length; o += rate) {
      const len = Math.min(rate, r.length - o);
      const b = new AudioBuffer({ length: len, numberOfChannels: 2, sampleRate: rate });
      b.getChannelData(0).set(r.getChannelData(0).subarray(o, o + len));
      b.getChannelData(1).set(r.getChannelData(1).subarray(o, o + len));
      await asource.add(b);
    }
    asource.close();
  }
  await output.finalize();
  onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), duration };
}
