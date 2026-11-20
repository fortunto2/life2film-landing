/**
 * Play a video faster or slower: every frame keeps its picture and gets a new time (t / speed), so
 * nothing is invented or blended; slow motion shows each frame longer. Sound is either dropped or
 * resampled with the picture (pitch moves with speed, like a tape), through OfflineAudioContext.
 */
import { loadMediabunny, encodableCodec } from './encode';

export interface SpeedResult {
  blob: Blob;
  duration: number;
}

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);

export async function changeSpeed(
  file: File,
  speed: number,
  keepSound: boolean,
  onProgress?: (fraction: number) => void,
): Promise<SpeedResult> {
  const {
    Input, BlobSource, ALL_FORMATS, Output, BufferTarget, Mp4OutputFormat, CanvasSink, CanvasSource,
    AudioBufferSink, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH,
  } = await loadMediabunny();

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const video = await input.getPrimaryVideoTrack();
  if (!video) throw new Error('That file has no picture.');
  if (!(await video.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const audio = keepSound ? await input.getPrimaryAudioTrack() : null;
  const duration = await input.computeDuration();
  const out = duration / speed;

  const scale = Math.min(1, 1920 / Math.max(video.displayWidth, video.displayHeight));
  const width = even(video.displayWidth * scale);
  const height = even(video.displayHeight * scale);
  const format = new Mp4OutputFormat({ fastStart: 'in-memory' });
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');

  const rate = audio?.sampleRate ?? 48_000;
  const acodec = audio && (await audio.canDecode().catch(() => false))
    ? await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: 2, sampleRate: rate, bitrate: 192_000 })
    : null;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  const output = new Output({ format, target: new BufferTarget() });
  const vsource = new CanvasSource(canvas, { codec: vcodec, bitrate: QUALITY_HIGH, keyFrameInterval: 2 });
  output.addVideoTrack(vsource);
  const asource = acodec ? new AudioBufferSource({ codec: acodec, bitrate: 192_000 }) : null;
  if (asource) output.addAudioTrack(asource);
  await output.start();

  // At high speed most frames would land on top of each other: keep at most 60 per output second.
  let lastOut = -Infinity;
  for await (const { canvas: frame, timestamp, duration: d } of new CanvasSink(video, { width, height, fit: 'fill', poolSize: 2 }).canvases()) {
    const t = Math.max(0, timestamp) / speed;
    if (t - lastOut < 1 / 60 - 1e-6) continue;
    ctx.drawImage(frame as CanvasImageSource, 0, 0);
    await vsource.add(t, Math.max(1 / 60, d / speed));
    lastOut = t;
    onProgress?.(Math.min(0.95, (timestamp / duration) * (asource ? 0.7 : 0.95)));
  }
  vsource.close();

  if (asource && audio) {
    for await (const { buffer } of new AudioBufferSink(audio).buffers()) {
      const len = Math.max(1, Math.round((buffer.duration / speed) * rate));
      const ctxA = new OfflineAudioContext(2, len, rate);
      const node = ctxA.createBufferSource();
      node.buffer = buffer;
      node.playbackRate.value = speed;
      node.connect(ctxA.destination);
      node.start();
      await asource.add(await ctxA.startRendering());
    }
    asource.close();
  }
  await output.finalize();
  onProgress?.(1);

  const bytes = (output.target as InstanceType<typeof BufferTarget>).buffer;
  if (!bytes) throw new Error('Nothing was written.');
  return { blob: new Blob([bytes], { type: 'video/mp4' }), duration: out };
}
