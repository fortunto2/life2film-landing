/**
 * Join several videos into one, in the order given.
 *
 * Clips from different phones rarely share a codec configuration, so packets cannot simply be
 * concatenated: every frame is decoded, fitted into the first clip's frame (letterboxed when the
 * shape differs) and encoded once. Sound is carried at the first clip's sample rate in stereo; a clip
 * without sound contributes silence of its own length, so picture and sound stay together.
 */
import { loadMediabunny, encodableCodec } from './encode';

export interface MergeResult {
  blob: Blob;
  width: number;
  height: number;
  duration: number;
}

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);

export async function mergeVideos(files: File[], onProgress?: (fraction: number) => void): Promise<MergeResult> {
  const mb = await loadMediabunny();
  const {
    Input, BlobSource, ALL_FORMATS, Output, BufferTarget, Mp4OutputFormat, CanvasSink, CanvasSource,
    AudioBufferSink, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH,
  } = mb;

  const inputs = files.map((f) => new Input({ source: new BlobSource(f), formats: ALL_FORMATS }));
  const clips = await Promise.all(
    inputs.map(async (input, i) => {
      const video = await input.getPrimaryVideoTrack();
      if (!video) throw new Error(`${files[i].name} has no picture.`);
      if (!(await video.canDecode())) throw new Error(`This browser cannot decode ${files[i].name} (${video.codec ?? 'unknown codec'}).`);
      const audio = await input.getPrimaryAudioTrack();
      const audible = audio && (await audio.canDecode().catch(() => false)) ? audio : null;
      return { video, audio: audible, duration: await input.computeDuration() };
    }),
  );
  const total = clips.reduce((s, c) => s + c.duration, 0);

  // The first clip decides the frame, its long edge capped at 1920.
  const first = clips[0].video;
  const scale = Math.min(1, 1920 / Math.max(first.displayWidth, first.displayHeight));
  const width = even(first.displayWidth * scale);
  const height = even(first.displayHeight * scale);

  const format = new Mp4OutputFormat({ fastStart: 'in-memory' });
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const rate = clips.find((c) => c.audio)?.audio?.sampleRate ?? 48_000;
  const acodec = clips.some((c) => c.audio)
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

  /** Stereo at `rate`, whatever came in. Resampling goes through an OfflineAudioContext. */
  async function normalise(buffer: AudioBuffer): Promise<AudioBuffer> {
    if (buffer.sampleRate === rate && buffer.numberOfChannels === 2) return buffer;
    const ctxA = new OfflineAudioContext(2, Math.max(1, Math.round(buffer.duration * rate)), rate);
    const node = ctxA.createBufferSource();
    node.buffer = buffer;
    node.connect(ctxA.destination);
    node.start();
    return ctxA.startRendering();
  }

  let offset = 0;
  for (const clip of clips) {
    // Picture.
    const sink = new CanvasSink(clip.video, { width, height, fit: 'contain', poolSize: 2 });
    for await (const { canvas: frame, timestamp, duration } of sink.canvases(0, clip.duration)) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(frame as CanvasImageSource, 0, 0);
      const t = Math.max(0, timestamp);
      await vsource.add(offset + t, Math.min(duration, Math.max(0.001, clip.duration - t)));
      onProgress?.(Math.min(0.99, (offset + t) / total));
    }
    // Sound, or silence of the clip's length.
    if (asource) {
      let written = 0;
      if (clip.audio) {
        for await (const { buffer } of new AudioBufferSink(clip.audio).buffers(0, clip.duration)) {
          const room = clip.duration - written;
          if (room <= 0) break;
          let b = await normalise(buffer);
          if (b.duration > room) {
            const keep = Math.max(1, Math.floor(room * rate));
            const cut = new AudioBuffer({ length: keep, numberOfChannels: 2, sampleRate: rate });
            for (let c = 0; c < 2; c++) cut.getChannelData(c).set(b.getChannelData(c).subarray(0, keep));
            b = cut;
          }
          await asource.add(b);
          written += b.duration;
        }
      }
      while (clip.duration - written > 0.001) {
        const len = Math.min(1, clip.duration - written);
        await asource.add(new AudioBuffer({ length: Math.max(1, Math.round(len * rate)), numberOfChannels: 2, sampleRate: rate }));
        written += len;
      }
    }
    offset += clip.duration;
  }
  vsource.close();
  asource?.close();
  await output.finalize();
  onProgress?.(1);

  const bytes = (output.target as InstanceType<typeof BufferTarget>).buffer;
  if (!bytes) throw new Error('Nothing was written.');
  return { blob: new Blob([bytes], { type: 'video/mp4' }), width, height, duration: total };
}
