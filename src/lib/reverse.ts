/**
 * Play a video backwards. Frames are read at the clip's own frame rate (capped at 30) from the last
 * to the first and written forwards; the sound, if kept, is decoded whole and reversed sample by
 * sample. Both need the clip in memory, hence the 60-second limit.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

export const REVERSE_LIMIT = 60;
const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);

export async function reverseVideo(
  file: File,
  keepSound: boolean,
  onProgress?: (fraction: number) => void,
): Promise<{ blob: Blob; duration: number }> {
  const {
    Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, CanvasSink, CanvasSource,
    AudioBufferSink, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH,
  } = await loadMediabunny();

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const video = await input.getPrimaryVideoTrack();
  if (!video) throw new Error('That file has no picture.');
  if (!(await video.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const duration = await input.computeDuration();
  if (duration > REVERSE_LIMIT + 0.5) throw new Error(`Reversing works on clips up to ${REVERSE_LIMIT} seconds; trim this one first.`);

  const stats = await video.computePacketStats(300).catch(() => null);
  const fps = Math.min(30, Math.max(1, Math.round(stats?.averagePacketRate ?? 30)));
  const count = Math.max(1, Math.floor(duration * fps));

  const scale = Math.min(1, 1920 / Math.max(video.displayWidth, video.displayHeight));
  const width = even(video.displayWidth * scale);
  const height = even(video.displayHeight * scale);
  const format = new Mp4OutputFormat();
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');

  const audio = keepSound ? await input.getPrimaryAudioTrack() : null;
  const rate = audio?.sampleRate ?? 48_000;
  const acodec = audio && (await audio.canDecode().catch(() => false))
    ? await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: 2, sampleRate: rate, bitrate: 192_000 })
    : null;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  const sink = new PieceSink();
  const output = new Output({ format, target: new StreamTarget(sink.stream(), { chunked: true }) });
  const vsource = new CanvasSource(canvas, { codec: vcodec, bitrate: QUALITY_HIGH, keyFrameInterval: 2 });
  output.addVideoTrack(vsource);
  const asource = acodec ? new AudioBufferSource({ codec: acodec, bitrate: 192_000 }) : null;
  if (asource) output.addAudioTrack(asource);
  await output.start();

  const times = Array.from({ length: count }, (_, i) => Math.max(0, duration - (i + 0.5) / fps));
  let i = 0;
  for await (const wrapped of new CanvasSink(video, { width, height, fit: 'fill', poolSize: 2 }).canvasesAtTimestamps(times)) {
    if (wrapped) ctx.drawImage(wrapped.canvas as CanvasImageSource, 0, 0);
    await vsource.add(i / fps, 1 / fps);
    i++;
    onProgress?.(Math.min(0.95, (i / count) * (asource ? 0.8 : 0.95)));
  }
  vsource.close();

  if (asource && audio) {
    // Gather the whole sound as stereo at `rate`, then write it reversed in one-second pieces.
    const left: Float32Array[] = [];
    const right: Float32Array[] = [];
    for await (const { buffer } of new AudioBufferSink(audio).buffers(0, duration)) {
      left.push(buffer.getChannelData(0).slice());
      right.push(buffer.getChannelData(Math.min(1, buffer.numberOfChannels - 1)).slice());
    }
    const join = (parts: Float32Array[]) => {
      const all = new Float32Array(parts.reduce((s, p) => s + p.length, 0));
      let o = 0;
      for (const p of parts) { all.set(p, o); o += p.length; }
      return all.reverse();
    };
    const L = join(left);
    const R = join(right);
    for (let o = 0; o < L.length; o += rate) {
      const n = Math.min(rate, L.length - o);
      const b = new AudioBuffer({ length: n, numberOfChannels: 2, sampleRate: rate });
      b.getChannelData(0).set(L.subarray(o, o + n));
      b.getChannelData(1).set(R.subarray(o, o + n));
      await asource.add(b);
    }
    asource.close();
  }
  await output.finalize();
  onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), duration: count / fps };
}
