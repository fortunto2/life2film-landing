/**
 * Put a music track under a video: the picture is copied packet for packet, the music is decoded,
 * cut to the video's length from a chosen offset, faded out at the end, and encoded to AAC (or
 * whatever audio codec the browser can encode for the container). The video's own sound is dropped.
 */
import { PieceSink } from './sink';
import { loadMediabunny } from './encode';

export interface AddMusicOptions {
  /** Seconds into the music where the film's sound begins. */
  musicStart: number;
  /** Seconds of fade-out at the end; 0 for none. */
  fadeOut: number;
  onProgress?: (fraction: number) => void;
}

export interface AddMusicResult {
  blob: Blob;
  extension: 'mp4' | 'webm';
  /** Seconds of the video with music under it (shorter than the video when the music runs out). */
  covered: number;
  duration: number;
}

export async function addMusic(video: File, music: File, options: AddMusicOptions): Promise<AddMusicResult> {
  const mb = await loadMediabunny();
  const {
    Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, WebMOutputFormat,
    EncodedPacketSink, EncodedVideoPacketSource, AudioBufferSink, AudioBufferSource, getFirstEncodableAudioCodec,
  } = mb;

  const vin = new Input({ source: new BlobSource(video), formats: ALL_FORMATS });
  const min = new Input({ source: new BlobSource(music), formats: ALL_FORMATS });
  const vtrack = await vin.getPrimaryVideoTrack();
  if (!vtrack) throw new Error('That video file has no picture.');
  const atrack = await min.getPrimaryAudioTrack();
  if (!atrack) throw new Error('That music file has no sound.');
  if (!(await atrack.canDecode())) throw new Error(`This browser cannot decode ${atrack.codec ?? 'that audio'}. Try MP3 or M4A.`);

  const duration = await vin.computeDuration();
  const vcodec = vtrack.codec;
  if (!vcodec) throw new Error('The video codec is not one this tool can copy.');
  // VP8 only lives in WebM; everything else goes into MP4, which plays everywhere.
  const webm = vcodec === 'vp8';
  const format = webm ? new WebMOutputFormat() : new Mp4OutputFormat();
  const acodec = await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), {
    numberOfChannels: Math.min(2, atrack.numberOfChannels),
    sampleRate: atrack.sampleRate,
    bitrate: 192_000,
  });
  if (!acodec) throw new Error('This browser cannot encode audio for this file. Chrome or Edge usually can.');

  // Written in pieces, not one ArrayBuffer: Chrome refuses a single buffer past ~2 GB (see sink.ts).
  const sink = new PieceSink();
  const output = new Output({ format, target: new StreamTarget(sink.stream(), { chunked: true }) });
  const vsource = new EncodedVideoPacketSource(vcodec);
  output.addVideoTrack(vsource, { rotation: vtrack.rotation });
  const asource = new AudioBufferSource({ codec: acodec, bitrate: 192_000 });
  output.addAudioTrack(asource);
  await output.start();

  // Picture: copied as is, so quality and length are untouched.
  const decoderConfig = (await vtrack.getDecoderConfig()) ?? undefined;
  let first = true;
  for await (const packet of new EncodedPacketSink(vtrack).packets()) {
    await vsource.add(packet, first && decoderConfig ? { decoderConfig } : undefined);
    first = false;
    options.onProgress?.(Math.min(0.5, (packet.timestamp / duration) * 0.5));
  }
  vsource.close();

  // Sound: the music from `musicStart`, as long as the video, faded out at the end.
  const from = Math.max(0, options.musicStart);
  const until = from + duration;
  let covered = 0;
  for await (const { buffer, timestamp } of new AudioBufferSink(atrack).buffers(from, until)) {
    const local = timestamp - from;
    if (local + buffer.duration <= 0) continue;
    const end = Math.min(buffer.duration, duration - local);
    if (end <= 0) break;
    const frames = Math.max(1, Math.floor(end * buffer.sampleRate));
    const channels = Math.min(2, buffer.numberOfChannels);
    const out = new AudioBuffer({ length: frames, numberOfChannels: channels, sampleRate: buffer.sampleRate });
    for (let c = 0; c < channels; c++) {
      const src = buffer.getChannelData(c).subarray(0, frames);
      const dst = out.getChannelData(c);
      dst.set(src);
      if (options.fadeOut > 0) {
        for (let i = 0; i < frames; i++) {
          const t = local + i / buffer.sampleRate;
          const left = duration - t;
          if (left < options.fadeOut) dst[i] *= Math.max(0, left / options.fadeOut);
        }
      }
    }
    await asource.add(out);
    covered = Math.max(covered, local + end);
    options.onProgress?.(0.5 + Math.min(0.5, (covered / duration) * 0.5));
  }
  asource.close();
  await output.finalize();

  if (!sink.size) throw new Error('Nothing was written.');
  return {
    blob: sink.blob(webm ? 'video/webm' : 'video/mp4'),
    extension: webm ? 'webm' : 'mp4',
    covered,
    duration,
  };
}
