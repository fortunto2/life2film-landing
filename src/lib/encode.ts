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

export type Container = 'mp4' | 'webm' | 'mov' | 'wav' | 'mp3' | 'ogg';

export interface Probe {
  duration: number;
  width: number;
  height: number;
  /** Bytes of the source file, for showing what the change actually bought. */
  size: number;
  videoCodec: string | null;
  audioCodec: string | null;
  hasAudio: boolean;
  /** Needed to predict an uncompressed size honestly — mono weighs half what stereo does. */
  channels: number;
  sampleRate: number;
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
  /**
   * Re-encode even when the track could have been copied.
   *
   * mediabunny copies whenever the requested settings do not actually require a transcode — which
   * is usually what you want, and is exactly wrong when trimming: a copied cut can only begin at a
   * keyframe. Forcing the transcode is what buys a frame-accurate in-point.
   */
  forceTranscode?: boolean;
  /** Drop the picture — used by "extract the audio". */
  discardVideo?: boolean;
  /** Drop the sound — used to make a file smaller when nobody will hear it. */
  discardAudio?: boolean;
  mono?: boolean;
  sampleRate?: number;
  onProgress?: (fraction: number) => void;
}

export interface EncodeResult {
  blob: Blob;
  /**
   * True when the video track was copied through rather than re-encoded.
   *
   * This is the difference between a trim that is bit-for-bit identical to the source and one that
   * has been through a generation of compression — worth telling the user, since it is the whole
   * reason to prefer one over the other.
   */
  copiedVideo: boolean;
}

const CONTAINER_MIME: Record<Container, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  wav: 'audio/wav',
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg',
};

export const CONTAINER_EXTENSION: Record<Container, string> = {
  mp4: 'mp4',
  webm: 'webm',
  mov: 'mov',
  wav: 'wav',
  mp3: 'mp3',
  ogg: 'ogg',
};

/** Containers that hold no picture — asking for video options with these is a contradiction. */
const AUDIO_ONLY = new Set<Container>(['wav', 'mp3', 'ogg']);

export const isAudioOnly = (container: Container) => AUDIO_ONLY.has(container);

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
    channels: audioTrack?.numberOfChannels ?? 2,
    sampleRate: audioTrack?.sampleRate ?? 44100,
  };
}

export async function encode(file: File, options: EncodeOptions): Promise<Blob> {
  return (await encodeDetailed(file, options)).blob;
}

export async function encodeDetailed(file: File, options: EncodeOptions): Promise<EncodeResult> {
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
    Mp3OutputFormat,
    OggOutputFormat,
  } = library;

  // LAME, loaded only when someone asks for MP3 — no reason to ship an encoder to people
  // converting to WAV.
  if (options.container === 'mp3') {
    const { registerMp3Encoder } = await import('@mediabunny/mp3-encoder');
    registerMp3Encoder();
  }

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
    mp3: () => new Mp3OutputFormat(),
    ogg: () => new OggOutputFormat(),
  }[options.container]();

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const output = new Output({ format, target: new BufferTarget() });

  const dropVideo = options.discardVideo || isAudioOnly(options.container);
  const audioOnlyContainer = isAudioOnly(options.container);

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

  if (options.forceTranscode && !dropVideo) {
    Object.assign(video, { forceTranscode: true });
  }

  // Ask for the hardware encoder explicitly. Measured on an M5: 180 fps against 34 fps for the
  // software path at 1080p — and the software encoder also overshot the requested bitrate more
  // than threefold, so this is about output size as much as speed.
  const wantsTranscode = Object.keys(video).length > 0 && !dropVideo;
  if (wantsTranscode) {
    Object.assign(video, { hardwareAcceleration: 'prefer-hardware' as const });
  }

  const audio = options.discardAudio
    ? { discard: true as const }
    : {
        ...(options.audioBitrate && !audioOnlyContainer
          ? { bitrate: options.audioBitrate }
          : options.quality && !audioOnlyContainer
            ? { bitrate: quality }
            : {}),
        ...(options.audioBitrate && options.container === 'mp3' ? { bitrate: options.audioBitrate } : {}),
        ...(options.mono ? { numberOfChannels: 1 } : {}),
        ...(options.sampleRate ? { sampleRate: options.sampleRate } : {}),
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

  if (!conversion.isValid) {
    const reasons = conversion.discardedTracks
      .map((track: { reason?: string }) => track.reason)
      .filter(Boolean)
      .join(', ');
    throw new Error(
      reasons
        ? `This file cannot be converted that way (${reasons}).`
        : 'This file cannot be converted to that format in your browser.',
    );
  }

  if (options.onProgress) conversion.onProgress = options.onProgress;

  await conversion.execute();

  const buffer = output.target.buffer;
  if (!buffer) throw new Error('The encoder produced no data.');

  return {
    blob: new Blob([buffer], { type: CONTAINER_MIME[options.container] }),
    copiedVideo: !wantsTranscode && !dropVideo,
  };
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
