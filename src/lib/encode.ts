import type { VideoCodec } from 'mediabunny';
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
  /**
   * Longest edge of the output, or the exact box when `fit` is given.
   *
   * Honoured as written: mediabunny's `width` is the horizontal edge after rotation, so a portrait
   * source is sized by `height` instead, and nothing is ever scaled UP past the source.
   */
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
  /** Seconds the cut begins before the asked in-point: a copy can only start on a keyframe. */
  startedEarly?: number;
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

const isAudioOnly = (container: Container) => AUDIO_ONLY.has(container);

/** Loaded once and shared: two tools on one page must not fetch 670 KB twice. */
let libraryPromise: Promise<typeof import('mediabunny')> | null = null;

export function loadMediabunny() {
  // A failed fetch is not cached: a dropped connection used to leave the promise rejected for the
  // life of the page, so every later click failed without trying again.
  libraryPromise ??= import('mediabunny').catch((error) => {
    libraryPromise = null;
    throw error;
  });
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

/**
 * Which video codecs to ask for, best first, per container.
 *
 * mediabunny takes the first codec the browser can encode, and Chrome offers VP9 for MP4. The
 * result was an .mp4 holding VP9: played in Chrome, refused by QuickTime and by Photos on the very
 * iPhone it was converted for (production, Oct 2026). H.264 is what "MP4" means to a person.
 */
export function codecPreference(container: Container): VideoCodec[] {
  switch (container) {
    case 'mp4':
    case 'mov':
      return ['avc', 'hevc', 'vp9', 'av1'];
    case 'webm':
      return ['vp9', 'vp8', 'av1'];
    default:
      return [];
  }
}

/**
 * Which codecs may be COPIED into a container without re-encoding.
 *
 * Narrower than what the container can technically hold: MP4 can carry VP9, and mediabunny will
 * happily remux it, but QuickTime and Photos will not play it. "MP4" to a person means a file that
 * opens everywhere, so only H.264 and HEVC pass through untouched; anything else is transcoded.
 */
export function copyableCodecs(container: Container): VideoCodec[] {
  switch (container) {
    case 'mp4':
    case 'mov':
      return ['avc', 'hevc'];
    case 'webm':
      return ['vp8', 'vp9', 'av1'];
    default:
      return [];
  }
}

/**
 * How one encode attempt is configured, and what the next one changes after a failure.
 *
 * Measured on production, Oct 2026: 30 of the ~60 tool failures in four weeks were one sentence,
 * "This specific encoder configuration (avc1.640028 … 1920x1080, hardware acceleration:
 * prefer-hardware) is not supported by this browser". The codec had been chosen by a check that
 * asked about neither the frame size nor the hardware, and the encode then insisted on both. On a
 * machine without a hardware encoder for that size the browser refuses, and the person got an
 * error instead of a slower file. Seven more were MP3 extractions dying on a timestamp of
 * −0.0000023 s — rounding in the resampler, one sample before zero.
 */
export interface Attempt {
  acceleration: 'prefer-hardware' | 'no-preference';
  /** Start a millisecond in, so a sample rounded to just below zero is dropped, not fatal. */
  nudgeStart: boolean;
  /**
   * Copy the packets instead of decoding them: no decoder, no encoder. The cut begins at the
   * keyframe at or before the in-point, so the clip may start a moment early.
   */
  copy?: boolean;
}

/** The browser accepted a hardware configuration and then refused to run it. */
const HARDWARE_REFUSAL = /not supported by this browser|failed to initialize video encode accelerator/i;
/**
 * A codec that said yes to `isConfigSupported` and failed on the first real frame. Chrome words it
 * "Unsupported configuration. Check isConfigSupported() prior to calling configure()" (an
 * OperationError, raised by a decoder or encoder after the probe passed); mid-stream it is
 * "Decoding error". Measured: 109 `tool_failed` events in 28 days, from two people.
 */
const CODEC_REFUSAL = /unsupported configuration|decoding error/i;

/**
 * The attempt to make after `error`, or null when another try would fail the same way.
 * `canCopy`: the request needs no pixel changed, so a keyframe-snapped copy is a valid last resort.
 */
export function nextAttempt(error: unknown, current: Attempt, canCopy = false): Attempt | null {
  const message = error instanceof Error ? error.message : String(error);
  if (current.acceleration === 'prefer-hardware' && HARDWARE_REFUSAL.test(message)) {
    return { ...current, acceleration: 'no-preference' };
  }
  if (!current.nudgeStart && /timestamps must be non-negative/i.test(message)) {
    return { ...current, nudgeStart: true };
  }
  if (CODEC_REFUSAL.test(message)) {
    // The encoder may be the one that refused: software is one cheap try (it fails in the first
    // second). A decoder error mid-stream says nothing about the encoder, so it skips that.
    if (current.acceleration === 'prefer-hardware' && /unsupported configuration/i.test(message)) {
      return { ...current, acceleration: 'no-preference' };
    }
    if (canCopy && !current.copy) return { ...current, copy: true };
  }
  return null;
}

/**
 * Whether the request could be met by copying packets: nothing about the picture or sound is
 * asked to change, the container takes the source codecs as they are, and there is a video track
 * to cut. Pure, so the choice is testable without a browser.
 */
export function canCopyTrim(
  options: Pick<
    EncodeOptions,
    'container' | 'width' | 'height' | 'fit' | 'videoBitrate' | 'audioBitrate' | 'mono' | 'quality' | 'discardVideo'
  >,
  source: { videoCodec: string | null; audioCodec: string | null; audioSupported: (codec: string) => boolean },
): boolean {
  if (isAudioOnly(options.container) || options.discardVideo) return false;
  if (options.width || options.height || options.fit || options.videoBitrate || options.audioBitrate) return false;
  if (options.mono || options.quality) return false;
  if (!source.videoCodec || !(copyableCodecs(options.container) as string[]).includes(source.videoCodec)) return false;
  return !source.audioCodec || source.audioSupported(source.audioCodec);
}

/** What the person is told when every attempt was refused: no codec jargon, one thing to try. */
export const CODEC_REFUSED_MESSAGE =
  'This browser cannot process that video (its codec or settings are not supported here). ' +
  'Try desktop Chrome, or convert the video to a standard H.264 MP4 first.';

export const isCodecRefusal = (error: unknown) =>
  CODEC_REFUSAL.test(error instanceof Error ? error.message : String(error));

/** One line for the `tool_failed` event: what was attempted, never a name or a byte of content. */
export function describeAttempt(
  attempt: Attempt,
  facts: { src?: string; out?: string },
): string {
  const how = attempt.copy ? 'copy' : `enc/${attempt.acceleration === 'prefer-hardware' ? 'hw' : 'sw'}`;
  return [how, facts.src && `src=${facts.src}`, facts.out && `out=${facts.out}`].filter(Boolean).join(' ');
}

/** The size the encoder will actually be asked for, so the capability check asks the same thing. */
export function outputSize(
  source: { width: number; height: number },
  box: { width?: number; height?: number },
): { width: number; height: number } | undefined {
  if (!source.width || !source.height) return undefined;
  const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);
  if (box.width && box.height) return { width: even(box.width), height: even(box.height) };
  if (box.width) return { width: even(box.width), height: even((source.height * box.width) / source.width) };
  if (box.height) return { width: even((source.width * box.height) / source.height), height: even(box.height) };
  return { width: even(source.width), height: even(source.height) };
}

/** The codec this browser will actually use for `container`, or null when it can encode none. */
export async function encodableCodec(container: Container, size?: { width: number; height: number }) {
  const library = await loadMediabunny();
  const wanted = codecPreference(container);
  if (!wanted.length) return null;
  return library.getFirstEncodableVideoCodec(wanted, size);
}

/** Every attempt refused for a codec reason becomes one readable sentence; the raw text rides in `context`. */
function describeFailure(error: unknown, tried: string[]): Error {
  const raw = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const out = isCodecRefusal(error) ? new Error(CODEC_REFUSED_MESSAGE, { cause: error }) : error instanceof Error ? error : new Error(raw);
  (out as Error & { context?: string }).context = `${tried.join(' > ')} | ${raw}`.slice(0, 190);
  return out;
}

/**
 * The cut without decoding: packets from the keyframe at or before the in-point to the out-point,
 * moved to time zero. It runs when this browser's decoder or encoder refuses the file — a copy
 * needs neither. The clip may begin a moment early (the length of the group of pictures).
 */
async function copyTrimmed(
  file: File,
  options: EncodeOptions,
  format: () => InstanceType<typeof import('mediabunny').OutputFormat>,
  library: typeof import('mediabunny'),
): Promise<{ buffer: ArrayBuffer; startedEarly: number }> {
  const { Input, Output, BufferTarget, BlobSource, ALL_FORMATS, EncodedPacketSink, EncodedVideoPacketSource, EncodedAudioPacketSource } = library;
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const output = new Output({ format: format(), target: new BufferTarget() });
  const video = await input.getPrimaryVideoTrack();
  const audio = options.discardAudio ? null : await input.getPrimaryAudioTrack();
  if (!video) throw new Error('That file has no video track.');
  const start = options.trim?.start ?? 0;
  const end = options.trim?.end ?? Infinity;

  const videoSink = new EncodedPacketSink(video);
  const key = (await videoSink.getKeyPacket(start, { verifyKeyPackets: true })) ?? (await videoSink.getFirstPacket());
  if (!key) throw new Error('That file has no video track.');
  const origin = key.timestamp;

  const videoSource = new EncodedVideoPacketSource(video.codec as VideoCodec);
  output.addVideoTrack(videoSource);
  const audioSource = audio ? new EncodedAudioPacketSource(audio.codec as never) : null;
  if (audio && audioSource) output.addAudioTrack(audioSource);
  await output.start();

  const videoMeta = { decoderConfig: (await video.getDecoderConfig()) ?? undefined };
  for await (const packet of videoSink.packets(key)) {
    if (packet.timestamp >= end) break;
    await videoSource.add(packet.clone({ timestamp: packet.timestamp - origin }), videoMeta);
    options.onProgress?.(Math.min(0.9, (packet.timestamp - origin) / Math.max(0.001, end - origin)));
  }
  videoSource.close();

  if (audio && audioSource) {
    const audioSink = new EncodedPacketSink(audio);
    const audioMeta = { decoderConfig: (await audio.getDecoderConfig()) ?? undefined };
    const first = (await audioSink.getPacket(origin)) ?? (await audioSink.getFirstPacket());
    if (first) {
      for await (const packet of audioSink.packets(first)) {
        if (packet.timestamp >= end) break;
        if (packet.timestamp < origin) continue;
        await audioSource.add(packet.clone({ timestamp: packet.timestamp - origin }), audioMeta);
      }
    }
    audioSource.close();
  }

  await output.finalize();
  if (!output.target.buffer) throw new Error('The encoder produced no data.');
  options.onProgress?.(1);
  return { buffer: output.target.buffer, startedEarly: Math.max(0, start - origin) };
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

  const quality = options.quality
    ? {
        very_low: library.QUALITY_VERY_LOW,
        low: library.QUALITY_LOW,
        medium: library.QUALITY_MEDIUM,
        high: library.QUALITY_HIGH,
        very_high: library.QUALITY_VERY_HIGH,
      }[options.quality]
    : undefined;

  const format = {
    mp4: () => new Mp4OutputFormat(),
    webm: () => new WebMOutputFormat(),
    mov: () => new MovOutputFormat(),
    wav: () => new WavOutputFormat(),
    mp3: () => new Mp3OutputFormat(),
    ogg: () => new OggOutputFormat(),
  }[options.container];

  // Only for reading what the file holds; each attempt opens its own.
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });

  const dropVideo = options.discardVideo || isAudioOnly(options.container);

  // A number aims at a size; a quality name aims at a look. The number wins when both are given,
  // because a size target is a hard constraint and a quality preference is not.
  const videoBitrate = options.videoBitrate ?? quality;

  // Decided once, up front. This was previously inferred from `Object.keys(video).length` after the
  // object had been mutated twice — order-dependent, and silently wrong the moment a video key that
  // does not imply a transcode gets added.
  const transcode =
    !dropVideo &&
    Boolean(options.width || options.height || options.fit || videoBitrate || options.forceTranscode);

  const sourceTrack = dropVideo ? null : await input.getPrimaryVideoTrack();
  // A source codec the container should not carry (VP9 into MP4) forces a transcode even when
  // nothing else asked for one; otherwise the "conversion" is a remux that plays only in Chrome.
  const sourceCodec = sourceTrack?.codec ?? null;
  const foreign = Boolean(sourceCodec && !copyableCodecs(options.container).includes(sourceCodec));
  // mediabunny 1.54 cannot copy a trim whose in-point is past the first packet (conversion.js:
  // `needsTranscode` when `firstTimestamp < trim.start`), so it re-encodes, silently and without
  // our codec and hardware hints. Knowing that up front lets us pass the hints and tell the truth.
  const trimmedStart = (options.trim?.start ?? 0) > 0.001;
  const reencode = transcode || foreign || (trimmedStart && !dropVideo);
  // "Longest edge", literally, and never upward. A 1080×1920 Reel asked for "720p" used to come out
  // 1280×2276: 2.8× the pixels, a forced transcode, a larger file.
  const srcW = sourceTrack?.displayWidth ?? 0;
  const srcH = sourceTrack?.displayHeight ?? 0;
  const portrait = srcH > srcW;
  const box: { width?: number; height?: number } = options.fit
    ? { width: options.width, height: options.height }
    : options.width
      ? portrait
        ? { height: Math.min(options.width, srcH || options.width) }
        : { width: Math.min(options.width, srcW || options.width) }
      : {};

  const size = outputSize({ width: srcW, height: srcH }, box);
  const codec = reencode && !dropVideo ? await encodableCodec(options.container, size) : null;
  // Hardware where this exact configuration is accepted — 180 fps against 34 on an M5 at 1080p,
  // and the software encoder overshot the bitrate threefold — and whatever the browser has where
  // it is not. Asking first is cheaper than failing; `nextAttempt` covers a browser that says yes
  // and then refuses anyway.
  const hardware =
    codec !== null &&
    (await library
      .canEncodeVideo(codec, {
        ...size,
        ...(typeof videoBitrate === 'number' ? { bitrate: videoBitrate } : {}),
        hardwareAcceleration: 'prefer-hardware',
      })
      .catch(() => false));

  const videoFor = (attempt: Attempt) =>
    dropVideo
      ? { discard: true as const }
      : reencode
        ? {
            ...(codec && { codec }),
            ...(box.width && { width: box.width }),
            ...(box.height && { height: box.height }),
            ...(options.fit && { fit: options.fit }),
            ...(videoBitrate && { bitrate: videoBitrate }),
            ...(options.forceTranscode && { forceTranscode: true }),
            hardwareAcceleration: attempt.acceleration,
          }
        : {};

  // WAV is uncompressed: sample rate × bit depth × channels, with no bitrate to choose. Every other
  // container here has one. Testing `isAudioOnly` instead used to lump MP3 and OGG in with WAV, and
  // a second spread bolted the bitrate back on for MP3 only — leaving OGG silently unset while the
  // page that offers an OGG bitrate predicted a size based on it.
  // Only an explicit audio bitrate re-encodes the sound. Inheriting the VIDEO quality name here made
  // mediabunny transcode AAC into AAC on every "pick a quality" compression: slower, lossy, pointless.
  const audioBitrate = options.container === 'wav' ? undefined : options.audioBitrate;

  const audio = options.discardAudio
    ? { discard: true as const }
    : {
        ...(audioBitrate && { bitrate: audioBitrate }),
        ...(options.mono && { numberOfChannels: 1 }),
      };

  const run = async (attempt: Attempt) => {
    // A fresh input and output per attempt: a failed conversion leaves both half-consumed.
    const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
    const output = new Output({ format: format(), target: new BufferTarget() });
    const video = videoFor(attempt);
    const trim = attempt.nudgeStart
      ? { start: (options.trim?.start ?? 0) + 0.001, ...(options.trim && { end: options.trim.end }) }
      : options.trim;

    const conversion = await Conversion.init({
      input,
      output,
      ...(trim ? { trim } : {}),
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
    return output.target.buffer;
  };

  const audioTrack = dropVideo || options.discardAudio ? null : await input.getPrimaryAudioTrack().catch(() => null);
  const canCopy =
    Boolean(options.trim) &&
    canCopyTrim(options, {
      videoCodec: sourceCodec,
      audioCodec: audioTrack?.codec ?? null,
      audioSupported: (codec) => (format().getSupportedAudioCodecs() as string[]).includes(codec),
    });

  // What failed, for the next regression to be diagnosable. Codec strings and sizes only.
  const facts = {
    src: sourceCodec
      ? `${(await sourceTrack?.getCodecParameterString().catch(() => null)) ?? sourceCodec} ${srcW}x${srcH}` +
        (audioTrack ? ` a=${audioTrack.codec}` : '')
      : undefined,
    out: codec ? `${codec} ${size ? `${size.width}x${size.height}` : ''}`.trim() : undefined,
  };

  let attempt: Attempt | null = { acceleration: hardware ? 'prefer-hardware' : 'no-preference', nudgeStart: false };
  let buffer: ArrayBuffer | null = null;
  let startedEarly: number | undefined;
  const tried: string[] = [];
  while (attempt) {
    tried.push(describeAttempt(attempt, facts));
    try {
      if (attempt.copy) {
        const copied = await copyTrimmed(file, options, format, library);
        buffer = copied.buffer;
        startedEarly = copied.startedEarly;
      } else {
        buffer = await run(attempt);
      }
      break;
    } catch (error) {
      const next = nextAttempt(error, attempt, canCopy);
      if (next) {
        attempt = next;
        continue;
      }
      throw describeFailure(error, tried);
    }
  }
  if (!buffer) throw new Error('The encoder produced no data.');

  return {
    blob: new Blob([buffer], { type: CONTAINER_MIME[options.container] }),
    copiedVideo: (!reencode && !dropVideo) || startedEarly !== undefined,
    ...(startedEarly !== undefined && { startedEarly }),
  };
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  // The download resolves the blob URL asynchronously; revoking it on the next line raced that in
  // browsers that do not snapshot the blob at click time.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
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
