import type { APIRoute, GetStaticPaths } from 'astro';

/**
 * Markdown twins of the tool pages.
 *
 * An agent handed a link to one of these tools should not have to parse HTML and guess which text
 * was navigation and which was the answer. `…/video-compressor.md` returns the same page as plain
 * markdown: what it does, how to call it from code, and the constraints that matter.
 *
 * The tool pages themselves are hand-written Astro, so this is not generated from them — it is a
 * deliberate second surface, written for a reader who wants the facts without the interface. Kept
 * next to the pages so the two are edited together.
 */

interface Doc {
  title: string;
  summary: string;
  facts: string[];
  code: string;
  notes?: string[];
}

const DOCS: Record<string, Doc> = {
  'video-compressor': {
    title: 'Compress Video',
    summary:
      'Compress a video to a target file size, or by quality, entirely in the browser. Nothing is uploaded.',
    facts: [
      'Target a size (10 MB Discord, 16 MB WhatsApp, 25 MB email, 50 MB Nitro Basic) or pick a quality.',
      'Size = bitrate x duration, so the required bitrate follows from the length of the video.',
      'Aims at 96% of the limit: a file of exactly 10.00 MB is still rejected by a 10 MB limit.',
      'Measures the first pass and re-encodes once with a correction if it missed by over 4%.',
      'Refuses impossible targets and reports the smallest honest size instead.',
      'Warns when the source is already below the bitrate its resolution needs — re-encoding would enlarge it.',
      'Measured: a 17.7 MB 1080p file at 12 Mbps came out 9.4 MB against a 10 MB target.',
    ],
    code: `import { Input, Output, Conversion, BlobSource, BufferTarget, Mp4OutputFormat, ALL_FORMATS } from 'mediabunny';

const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
const duration = await input.computeDuration();

const AUDIO = 128_000;
const aim = targetBytes * 0.96;
const videoBitrate = Math.max(90_000,
  Math.round((aim * 8 * 0.96 - AUDIO * duration) / duration));

const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
const conversion = await Conversion.init({
  input, output,
  video: { bitrate: videoBitrate, hardwareAcceleration: 'prefer-hardware' },
  audio: { bitrate: AUDIO },
});
await conversion.execute();
const blob = new Blob([output.target.buffer], { type: 'video/mp4' });`,
  },

  'video-trimmer': {
    title: 'Trim Video',
    summary:
      'Cut a section out of a video, optionally without re-encoding it, in the browser. Nothing is uploaded.',
    facts: [
      'Three modes: copy (no re-encode), re-encode (smaller file), and fit a target size.',
      'Copying passes the picture through untouched: measured 0.20s against 0.60s for a re-encode of the same 3 seconds.',
      'Playback always starts exactly where you set it — a copied cut does NOT snap to a keyframe.',
      'A copied mid-group cut carries frames back to the previous keyframe, so it is larger: 6.7 MB copied against 4.1 MB re-encoded on a file with keyframes 8 seconds apart.',
      'Re-encoding requires forceTranscode: true, or mediabunny will correctly decide the transcode is unnecessary and copy instead.',
      'Accepts times as 12.5, 1:04 or 1:04.5.',
    ],
    code: `import { Input, Output, Conversion, BlobSource, BufferTarget, Mp4OutputFormat, ALL_FORMATS } from 'mediabunny';

const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });

const conversion = await Conversion.init({
  input, output,
  trim: { start: 20, end: 35 },
  // Omit \`video\` entirely to copy the track through; add
  // { forceTranscode: true } to re-encode for a smaller file.
});
await conversion.execute();`,
  },

  'video-to-mp3': {
    title: 'Video to MP3',
    summary: 'Extract the audio from a video as MP3, WAV or OGG, in the browser. Nothing is uploaded.',
    facts: [
      'MP3 uses LAME compiled to WebAssembly, loaded only when MP3 is chosen.',
      'WAV size is sampleRate x 2 bytes x channels — there is no bitrate to pick.',
      'Vorbis lands about 30% under its nominal bitrate, being variable-rate.',
      'Size predictions read the real channel count and sample rate from the file; assuming stereo doubles the estimate for a mono source.',
      'A bitrate higher than the source was recorded at enlarges the file without improving it.',
    ],
    code: `import { Input, Output, Conversion, BlobSource, BufferTarget, Mp3OutputFormat, ALL_FORMATS } from 'mediabunny';
import { registerMp3Encoder } from '@mediabunny/mp3-encoder';

registerMp3Encoder();

const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
const output = new Output({ format: new Mp3OutputFormat(), target: new BufferTarget() });

const conversion = await Conversion.init({
  input, output,
  video: { discard: true },
  audio: { bitrate: 192_000 },
});
await conversion.execute();`,
  },

  'video-converter': {
    title: 'Convert Video',
    summary: 'Convert between MP4, WebM and MOV, or extract audio as WAV, in the browser.',
    facts: [
      'Encoding support is per-browser: check with getFirstEncodableVideoCodec before starting, not after 70% of a long encode.',
      'A container (.mov) is not a codec. Browsers handle H.264 and often HEVC, but never ProRes or camera raw.',
      'MP4 to MOV can often be done without touching the video; changing codec cannot.',
    ],
    code: `import { getFirstEncodableVideoCodec, WebMOutputFormat } from 'mediabunny';

const format = new WebMOutputFormat();
const codec = await getFirstEncodableVideoCodec(format.getSupportedVideoCodecs());
if (!codec) throw new Error('This browser cannot encode WebM video');`,
  },

  'video-splitter': {
    title: 'Video Splitter',
    summary:
      'Cut a long video into clips that begin at shot changes rather than on a fixed interval, ranked by picture quality.',
    facts: [
      'Shot boundaries come from the Life2Film engine (Rust compiled to WebAssembly), not from a timer.',
      'Sampling rate dominates accuracy: at 2 samples/second boundaries land 1-3 seconds out; at 10/second they land on the frame. All sixteen detection algorithms were wrong the same way at the low rate.',
      'Uses a coarse pass to find candidates, then a tight pass at ten times the resolution around each one.',
      'Clips never cut inside a shot; short tails are absorbed into the previous clip.',
      'Optional 9:16 crop takes the centre of the frame — there is no face tracking.',
    ],
    code: `// Shot detection uses the Life2Film engine:
// https://life2film.com/wasm/va_wasm.js
const engine = await import('https://life2film.com/wasm/va_wasm.js');
await engine.default({ module_or_path: 'https://life2film.com/wasm/va_wasm_bg.wasm' });

// pixels: centre-column mean RGB per sampled frame, timestamps in seconds
const { scenes } = JSON.parse(engine.detect_scenes_slick(JSON.stringify({
  pixels, timestamps, duration, algo: 'adjacent_diffs',
})));`,
  },

  'scene-detector': {
    title: 'Scene Detector',
    summary: 'Find every cut in a video and get the shot list with timecodes and quality scores.',
    facts: [
      'Exports to EDL (Resolve, Premiere), OTIO (Resolve, Avid, Premiere), FCPXML, Audacity labels, CSV and JSON.',
      'Markers land on whole frames, so the export frame rate changes where they sit — a grid at 25 fps sits up to 20 ms off in a 30 fps sequence.',
      'Ten-minute ceiling: each sample is a seek, costing tens of milliseconds.',
    ],
    code: `const engine = await import('https://life2film.com/wasm/va_wasm.js');
await engine.default({ module_or_path: 'https://life2film.com/wasm/va_wasm_bg.wasm' });

// 31 features per frame, from RGB24 pixels
const scored = JSON.parse(engine.score_frame(width, height, rgb24, timestamp, null));`,
  },

  'bpm-detector': {
    title: 'BPM Detector',
    summary: "Find a track's tempo and the position of every beat, in the browser.",
    facts: [
      'Takes mono f32 PCM, which is exactly what AudioContext.decodeAudioData gives you.',
      'Analyse at 22050 Hz: the onset envelope lives far below that, and the source rate costs several times the memory for the same answer.',
      'Exports the beat grid as EDL, OTIO, FCPXML, Audacity labels, CSV or JSON.',
      'Tempo is genuinely ambiguous — 140 BPM is also 70 in half time — so both readings are shown.',
      'Verified against a synthetic 120 BPM file: reads 120.0 and finds 24 beats in 12 seconds.',
    ],
    code: `const engine = await import('https://life2film.com/wasm/va_wasm.js');
await engine.default({ module_or_path: 'https://life2film.com/wasm/va_wasm_bg.wasm' });

const ctx = new AudioContext();
const buffer = await ctx.decodeAudioData(await file.arrayBuffer());

// Down-mix to mono at 22050 Hz first (OfflineAudioContext), then:
const { bpm, beats } = JSON.parse(engine.detect_beats(mono, 22050, null));`,
  },
};

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(DOCS).map((tool) => ({ params: { tool } }));

export const GET: APIRoute = ({ params }) => {
  const tool = params.tool as string;
  const doc = DOCS[tool];

  if (!doc) return new Response('Not found', { status: 404 });

  const body = `# ${doc.title}

${doc.summary}

Runs entirely in the browser through WebCodecs and WebAssembly. No upload, no account, no size limit
imposed by a plan, no watermark — because there is no server involved.

Page: https://life2film.com/tools/${tool}/

## What matters

${doc.facts.map((fact) => `- ${fact}`).join('\n')}

## From code

\`\`\`js
${doc.code}
\`\`\`

## Related

- All tools: https://life2film.com/tools/
- Engine and site overview for agents: https://life2film.com/llms.txt
- Every tool page is available as markdown by appending \`.md\` to its address.

---
Life2Film — on-device video montage. https://life2film.com/
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
