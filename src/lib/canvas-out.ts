/**
 * The two ends every canvas renderer here shares (redraw, ranges, split-screen, boomerang): open a
 * video for decoding, and an MP4 that a 2D canvas (and optionally 48 kHz stereo) is encoded into.
 * Each renderer keeps only its own frame loop. The error texts live here once.
 */
import type { AudioBufferSource, CanvasSource, Input, InputAudioTrack, InputVideoTrack } from 'mediabunny';
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';
import { RATE } from './audio-io';

export const FPS = 30;

export interface OpenedVideo {
  input: Input;
  video: InputVideoTrack;
  /** Null when the file has no sound or this browser cannot decode it. */
  audio: InputAudioTrack | null;
  duration: number;
  /** Display size rounded down to even numbers, as encoders want. */
  width: number;
  height: number;
}

/** Open `file` for decoding. `named` prefixes errors with the file name (for multi-file tools). */
export async function openVideo(file: File, named = false): Promise<OpenedVideo> {
  const { Input, BlobSource, ALL_FORMATS } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const video = await input.getPrimaryVideoTrack();
  if (!video) throw new Error(named ? `${file.name}: no picture.` : 'That file has no picture.');
  if (!(await video.canDecode())) throw new Error(`${named ? `${file.name}: this browser cannot decode it.` : 'This browser cannot decode that video.'} Chrome or Edge usually can.`);
  const track = await input.getPrimaryAudioTrack();
  const audio = track && (await track.canDecode().catch(() => false)) ? track : null;
  const width = video.displayWidth - (video.displayWidth % 2), height = video.displayHeight - (video.displayHeight % 2);
  return { input, video, audio, duration: await input.computeDuration(), width, height };
}

export interface CanvasMp4 {
  ctx: OffscreenCanvasRenderingContext2D;
  vsource: CanvasSource;
  /** Null when no sound was asked for or no audio codec can encode it. */
  asource: AudioBufferSource | null;
  /** Finalize the file; throws when nothing was written. Close the sources first. */
  finish: () => Promise<Blob>;
}

/** An MP4 being written from a `width`x`height` canvas at FPS, with a stereo track when `withAudio`. */
export async function canvasMp4(width: number, height: number, withAudio: boolean): Promise<CanvasMp4> {
  const { Output, StreamTarget, Mp4OutputFormat, CanvasSource, AudioBufferSource, getFirstEncodableAudioCodec, QUALITY_HIGH } = await loadMediabunny();
  const format = new Mp4OutputFormat();
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const acodec = withAudio ? await getFirstEncodableAudioCodec(format.getSupportedAudioCodecs(), { numberOfChannels: 2, sampleRate: RATE, bitrate: 192_000 }) : null;
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
  return {
    ctx, vsource, asource,
    finish: async () => {
      await output.finalize();
      if (!sink.size) throw new Error('Nothing was written.');
      return sink.blob('video/mp4');
    },
  };
}
