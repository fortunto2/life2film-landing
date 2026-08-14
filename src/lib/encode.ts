/**
 * Reading and re-encoding media in the browser.
 *
 * mediabunny drives WebCodecs — the same decoder and encoder the browser uses to play and record
 * video, hardware-accelerated where the machine allows. That is what makes trimming, compressing
 * and converting possible locally at all: no ffmpeg build shipped over the wire, no
 * SharedArrayBuffer headers, and nothing leaving the machine.
 *
 * It is ~670 KB, so every entry point here imports it dynamically. A page that only describes what
 * it can do should not pay for the machinery until someone uses it.
 */

export type Container = 'mp4' | 'webm' | 'mov' | 'wav';

export interface Probe {
  duration: number;
  width: number;
  height: number;
  /** Bytes of the source file, for showing what the change actually bought. */
  size: number;
  videoCodec: string | null;
  audioCodec: string | null;
  hasAudio: boolean;
}

export type QualityName = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

export interface EncodeOptions {
  container: Container;
  trim?: { start: number; end: number };
  /** Longest edge of the output, or the exact box when `fit` is given. */
  width?: number;
  height?: number;
  fit?: 'fill' | 'contain' | 'cover';
  quality?: QualityName;
  /** Explicit bits per second, used when aiming at a file size. Takes precedence over `quality`. */
  videoBitrate?: number;
  audioBitrate?: number;
  /** Drop the picture — used by "extract the audio". */
  discardVideo?: boolean;
  /** Drop the sound — used to make a file smaller when nobody will hear it. */
  discardAudio?: boolean;
  mono?: boolean;
  onProgress?: (fraction: number) => void;
}

const CONTAINER_MIME: Record<Container, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  wav: 'audio/wav',
};

export const CONTAINER_EXTENSION: Record<Container, string> = {
  mp4: 'mp4',
  webm: 'webm',
  mov: 'mov',
  wav: 'wav',
};

/** Loaded once and shared: two tools on one page must not fetch 670 KB twice. */
let libraryPromise: Promise<typeof import('mediabunny')> | null = null;

export function loadMediabunny() {
  libraryPromise ??= import('mediabunny');
  return libraryPromise;
}

/** What is actually in this file — shown before anything is changed. */
export async function probe(file: File): Promise<Probe> {
  const { Input, BlobSource, ALL_FORMATS } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });

  const [duration, videoTrack, audioTrack] = await Promise.all([
    input.computeDuration(),
    input.getPrimaryVideoTrack(),
    input.getPrimaryAudioTrack(),
  ]);

  return {
    duration,
    width: videoTrack?.displayWidth ?? 0,
    height: videoTrack?.displayHeight ?? 0,
    size: file.size,
    videoCodec: videoTrack?.codec ?? null,
    audioCodec: audioTrack?.codec ?? null,
    hasAudio: Boolean(audioTrack),
  };
}

export async function encode(file: File, options: EncodeOptions): Promise<Blob> {
  const library = await loadMediabunny();
  const {
    Input,
    Output,
    Conversion,
    BufferTarget,
    BlobSource,
    ALL_FORMATS,
    Mp4OutputFormat,
    WebMOutputFormat,
    MovOutputFormat,
    WavOutputFormat,
  } = library;

  const quality = {
    very_low: library.QUALITY_VERY_LOW,
    low: library.QUALITY_LOW,
    medium: library.QUALITY_MEDIUM,
    high: library.QUALITY_HIGH,
    very_high: library.QUALITY_VERY_HIGH,
  }[options.quality ?? 'medium'];

  const format = {
    mp4: () => new Mp4OutputFormat(),
    webm: () => new WebMOutputFormat(),
    mov: () => new MovOutputFormat(),
    wav: () => new WavOutputFormat(),
  }[options.container]();

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const output = new Output({ format, target: new BufferTarget() });

  // WAV holds no picture at all, so asking for one is a contradiction rather than a preference.
  const dropVideo = options.discardVideo || options.container === 'wav';

  const video = dropVideo
    ? { discard: true as const }
    : {
        ...(options.width ? { width: options.width } : {}),
        ...(options.height ? { height: options.height } : {}),
        ...(options.fit ? { fit: options.fit } : {}),
        // A number aims at a size; a quality name aims at a look. The number wins when both are
        // given, because a size target is a hard constraint and a quality preference is not.
        ...(options.videoBitrate
          ? { bitrate: options.videoBitrate }
          : options.quality
            ? { bitrate: quality }
            : {}),
      };

  const audio = options.discardAudio
    ? { discard: true as const }
    : {
        ...(options.audioBitrate && options.container !== 'wav'
          ? { bitrate: options.audioBitrate }
          : options.quality && options.container !== 'wav'
            ? { bitrate: quality }
            : {}),
        ...(options.mono ? { numberOfChannels: 1 } : {}),
      };

  const conversion = await Conversion.init({
    input,
    output,
    ...(options.trim ? { trim: options.trim } : {}),
    // An empty options object would still force a transcode; omitting it lets mediabunny copy
    // the track through untouched when nothing about it needs to change.
    ...(Object.keys(video).length ? { video } : {}),
    ...(Object.keys(audio).length ? { audio } : {}),
  });

  if (options.onProgress) conversion.onProgress = options.onProgress;

  await conversion.execute();

  const buffer = output.target.buffer;
  if (!buffer) throw new Error('The encoder produced no data.');

  return new Blob([buffer], { type: CONTAINER_MIME[options.container] });
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

/** `1:04.5` — clip lengths are chosen to the tenth, so the tenth is shown. */
export function preciseClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s.toFixed(1)}`;
}
