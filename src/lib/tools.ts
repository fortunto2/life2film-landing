/**
 * Every tool, described once.
 *
 * These facts used to be written three times over: in the page, in its markdown twin for agents,
 * and again in llms.txt. They drifted — /engine/ was missing from llms.txt three commits after it
 * shipped, and the same measured numbers appeared with different wording in each copy. The pages,
 * the `.md` route and llms.txt now all read from here.
 *
 * The prose stays in the pages. Only the restated facts belong in one place: a generated page reads
 * worse than a written one, and that was never the problem.
 */

export interface FaqEntry {
  q: string;
  a: string;
}

export type ToolGroup = 'everyday' | 'engine';

export interface Tool {
  slug: string;
  group: ToolGroup;
  /** Short name, used on the hub card. */
  name: string;
  /** Name in the schema.org record. */
  appName: string;
  /** One line on the hub card. */
  blurb: string;

  // --- page ---
  /**
   * How people actually search for this, from Google Autocomplete.
   *
   * Every one of these queries is dominated by "online" and "free" — the wording our titles avoided
   * in favour of "in your browser", which is more accurate and matches nothing anyone types. The
   * phrase belongs in the title; the accuracy belongs in the page.
   */
  searchPhrase: string;
  title: string;
  description: string;
  /** H1, split so the second half picks up the gradient. */
  heading: string;
  accent: string;
  lede: string;
  featureList: string[];
  faq: FaqEntry[];

  // --- for agents ---
  /** One sentence opening the markdown twin. */
  summary: string;
  /** What is worth carrying away, including anything measured. */
  facts: string[];
  /** Runnable snippet — must work as pasted. */
  code?: string;
  /** Instruction for a coding agent, shown beside the snippet. */
  prompt?: string;
  /** How the job is phrased above the snippet. */
  agentJob?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: 'video-trimmer',
    group: 'everyday',
    name: 'Trim Video',
    appName: 'Video Trimmer',
    blurb: 'Drag the handles to the part you want, preview it, save it. Audio stays in sync.',

    searchPhrase: 'Trim Video Online',
    title: 'Trim Video Online — free, without re-encoding | Life2Film',
    description: 'Free online video trimmer that keeps the original quality: the picture is copied, not re-encoded. Runs in your browser — nothing uploaded, no watermark, no sign-up. Or trim to fit 10 MB for Discord.',
    heading: 'Trim',
    accent: 'Video',
    lede: 'Drag the handles to the part you want and save it — with the picture copied through untouched, so nothing is lost. Your file never leaves the machine.',
    featureList: [
    'Lossless trimming — copies the video without re-encoding',
    'Frame-accurate re-encode when the cut point matters',
    'Trim to a target file size',
    'Live preview of the selection',
    'Runs fully client-side — no upload, no watermark',
  ],
    faq: [
  {
    q: 'Is my video uploaded?',
    a: 'No. The browser decodes and re-encodes it locally through WebCodecs — the same pipeline it uses to play video. Nothing is sent anywhere, so there is no size limit imposed by a plan, no queue, and no watermark.',
  },
  {
    q: 'Does trimming lose quality?',
    a: 'Not in the default mode. "Same quality — no re-encode" passes the picture through untouched, so there is no generation loss and it finishes several times faster — measured at 0.2 seconds against 0.6 for a re-encode of the same clip. The trade is size: video is compressed in groups that begin at a keyframe, so when your in-point falls mid-group the file has to carry the frames back to the previous one. Playback still starts exactly where you set it, but the file can be larger than a re-encode of the same range.',
  },
  {
    q: 'When should I re-encode instead?',
    a: 'When you want the smallest file, or a different format. Re-encoding writes only the frames you selected, so a mid-group cut comes out considerably smaller — in testing, 4.1 MB against 6.7 MB for the same three seconds. It costs one generation of compression, which is not visible at the quality used here.',
  },
  {
    q: 'Can it trim to a target file size?',
    a: 'Yes — choose "Fit a size" and pick a limit, such as 10 MB for Discord or 25 MB for email. The needed bitrate follows from the length of your selection, so a shorter selection can hold more quality within the same limit. If the first pass misses, it corrects and re-encodes once.',
  },
  {
    q: 'Is the audio kept?',
    a: 'Yes, in sync, and trimmed to the same range. You can drop it deliberately with the "remove audio" box — useful when a clip is going somewhere the sound is not wanted, and it makes the file smaller.',
  },
  {
    q: 'Which files work?',
    a: 'MP4 and MOV with H.264, and WebM — whatever your browser can both decode and encode. Camera-native formats such as ProRes or raw usually cannot be opened by a browser at all; transcode a proxy first.',
  },
  {
    q: 'How long can the video be?',
    a: 'There is no hard cap, but everything happens in a browser tab, so memory is the real limit — the encoded result is held there before it is saved. Files up to a few hundred megabytes are comfortable on a normal laptop; very large ones are better trimmed in passes.',
  },
],

    summary: 'Cut a section out of a video, optionally without re-encoding it, in the browser. Nothing is uploaded.',
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
    prompt: `Add "trim a video" to my project. It must run in the browser — no upload, no server.

Requirements:
- Use the "mediabunny" npm package (WebCodecs). Not ffmpeg.wasm: ~30 MB and needs SharedArrayBuffer,
  which requires COOP/COEP headers that break third-party scripts.
- Offer two modes. Default: copy the video through untouched — pass NO video options to
  Conversion.init and mediabunny will not re-encode. Measured 0.20s against 0.60s for a re-encode of
  the same three seconds.
- Explain the trade honestly: video is stored in groups starting at a keyframe, so a copied cut whose
  in-point falls mid-group carries the frames back to that keyframe. Playback still starts exactly
  where the user set it, but the file is larger — 6.7 MB copied against 4.1 MB re-encoded in testing.
- The re-encode mode needs forceTranscode: true. Without it mediabunny correctly notices the
  transcode is unnecessary and copies anyway, which makes the two modes identical.
- Give the user handles on a timeline with a live preview, not two number fields. Accept typed times
  in any of 12.5, 1:04 or 1:04.5.
- Keep audio in sync and trimmed to the same range, with an option to drop it.

Reference implementation: https://life2film.com/tools/video-trimmer/`,
    agentJob: 'Trimming video without re-encoding it',
  },
  {
    slug: 'video-compressor',
    group: 'everyday',
    name: 'Compress Video',
    appName: 'Video Compressor',
    blurb: 'Make a file smaller and see exactly what it cost. No size limit, because there is no server.',

    searchPhrase: 'Compress Video Online',
    title: 'Compress Video Online Free — to 10MB for Discord, 25MB for email',
    description: 'Free online video compressor that hits an exact file size — 10 MB for Discord, 16 MB for WhatsApp, 25 MB for email. Runs in your browser: no upload, no size limit, no watermark, no sign-up.',
    heading: 'Compress',
    accent: 'Video',
    lede: 'Aim at a size — 10 MB for Discord, 25 MB for email — or just turn the quality down. Runs on your machine, so there is no size limit and no queue.',
    featureList: [
    'Target an exact file size',
    'Presets for Discord, WhatsApp and email limits',
    'Size estimate before encoding',
    'Second pass corrects any miss',
    'Runs fully client-side — no upload, no watermark',
  ],
    faq: [
  {
    q: 'Can it hit an exact file size?',
    a: 'That is what the "fit a size" mode does. A file\'s size is its bitrate multiplied by its length, so once the length is known the required bitrate is arithmetic. Encoders do not obey a requested bitrate perfectly — rate control drifts with the material — so if the first pass misses by more than a few percent, it measures the miss and re-encodes once with a corrected figure. In practice it lands within a couple of percent of the target.',
  },
  {
    q: 'Why 10 MB, 16 MB, 25 MB?',
    a: 'They are the walls people actually hit: 10 MB is the free Discord upload limit, 16 MB is WhatsApp, 25 MB is Gmail and most mail servers, and 50 MB is Discord Nitro Basic. The tool aims just under the limit rather than exactly at it, because a file that is 10.0 MB is still rejected by a 10 MB limit.',
  },
  {
    q: 'What if the target is impossible?',
    a: 'It says so before starting, and tells you the smallest honest size for that video. Squeezing an hour of footage into 10 MB would mean a bitrate no resolution survives — a tool that produced an unwatchable file and called it success would be worse than one that refuses.',
  },
  {
    q: 'How much smaller will my file get?',
    a: 'The estimate is shown before you press anything, from the settings and the length. Footage straight from a phone or camera is usually recorded far above what it needs, and 60–90% reductions are routine. Something already compressed once has little left to give, and the tool compares your file against what its resolution reasonably needs and warns you when re-encoding would only make it bigger.',
  },
  {
    q: 'What actually makes a video smaller?',
    a: 'Fewer pixels and fewer bits per pixel. Resolution is the blunt, reliable lever — 4K to 1080p removes three quarters of the pixels before quality enters into it. Bitrate then decides how much detail survives in what remains. Dropping audio helps a little; it is rarely more than a few percent of a video file.',
  },
  {
    q: 'Is it uploaded anywhere?',
    a: 'No. It runs through WebCodecs in your browser, which is what makes this practical: uploading a gigabyte so a server can hand back 200 MB is slower than doing the work locally, and it puts your footage on someone else\'s disk in the process. No size limit, no queue, no watermark — because there is no server to impose them.',
  },
],

    summary: 'Compress a video to a target file size, or by quality, entirely in the browser. Nothing is uploaded.',
    facts: [
      'Target a size (10 MB Discord, 16 MB WhatsApp, 25 MB email, 50 MB Nitro Basic) or pick a quality.',
      'Size = bitrate x duration, so the required bitrate follows from the length of the video.',
      'Aims at 96% of the limit: a file of exactly 10.00 MB is still rejected by a 10 MB limit.',
      'Measures the first pass and re-encodes once with a correction if it missed by over 4%.',
      'Refuses impossible targets and reports the smallest honest size instead.',
      'Warns when the source is already below the bitrate its resolution needs — re-encoding would enlarge it.',
      'Measured: a 17.7 MB 1080p file at 12 Mbps came out 9.4 MB against a 10 MB target.',
    ],
    code: `// npm i mediabunny
import { Input, Output, Conversion, BlobSource, BufferTarget, Mp4OutputFormat, ALL_FORMATS } from 'mediabunny';

// Size is bitrate x duration, so a target size fixes the bitrate.
const OVERHEAD = 0.04;               // container headers and packaging
const AUDIO_BITRATE = 128_000;

export async function compressToSize(file, targetBytes, { width } = {}) {
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const duration = await input.computeDuration();

  // Aim under the wall: a file of exactly 10.00 MB is still refused by a 10 MB limit.
  const aim = targetBytes * 0.96;
  const videoBitrate = Math.max(
    90_000,
    Math.round((aim * 8 * (1 - OVERHEAD) - AUDIO_BITRATE * duration) / duration),
  );

  const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
  const conversion = await Conversion.init({
    input,
    output,
    video: {
      ...(width ? { width } : {}),
      bitrate: videoBitrate,
      hardwareAcceleration: 'prefer-hardware',  // 180 fps vs 34 on an M5 at 1080p
    },
    audio: { bitrate: AUDIO_BITRATE },
  });

  if (!conversion.isValid) throw new Error('Cannot convert this file');
  await conversion.execute();

  return new Blob([output.target.buffer], { type: 'video/mp4' });
}

// Encoders drift, so measure and correct once if the first pass missed.
const blob = await compressToSize(file, 10 * 1024 * 1024);
console.log(blob.size / 1048576, 'MB');`,
    prompt: `Build me a video compressor that runs entirely in the browser — no upload, no server.

Requirements:
- Use the "mediabunny" npm package, which wraps WebCodecs. Do not use ffmpeg.wasm: it is ~30 MB and
  needs SharedArrayBuffer, which requires COOP/COEP headers that break third-party scripts.
- Let the user target a file size (presets: 10 MB Discord, 16 MB WhatsApp, 25 MB email) as well as
  picking a quality.
- To hit a size: size = bitrate x duration, so videoBitrate = (targetBytes * 8 * 0.96 - audioBitrate
  * duration) / duration. Aim at 96% of the limit, because a file of exactly 10.00 MB is still
  rejected by a 10 MB limit.
- Encoders do not obey a requested bitrate exactly. Measure the result; if it missed by more than 4%
  or broke the limit, re-encode once with bitrate * (target / actual), damped to at most a halving
  or doubling. Stop at two passes.
- Pass hardwareAcceleration: 'prefer-hardware'. Measured on an M5 at 1080p: 180 fps against 34 fps
  for software, and the software encoder also overshot the requested bitrate by 3.5x.
- Show the estimated output size before encoding, and the real before/after afterwards.
- Refuse impossible targets up front: below about 90 kbps video is unwatchable, so if the target
  cannot be met at that floor, say so and give the smallest honest size instead of producing junk.
- Warn when the source is already compressed below what its resolution needs — re-encoding it will
  make it larger, and only reducing the resolution will help.

Reference implementation: https://life2film.com/tools/video-compressor/`,
    agentJob: 'Compressing video to a target file size',
  },
  {
    slug: 'video-to-mp3',
    group: 'everyday',
    name: 'Video to MP3',
    appName: 'Video to MP3 Converter',
    blurb: 'Pull the audio out of a video and keep it as MP3, WAV or OGG.',

    searchPhrase: 'Video to MP3 Converter',
    title: 'Video to MP3 Converter — free, online, nothing uploaded',
    description: 'Free online video to MP3 converter. Extract audio from MP4, MOV or WebM as MP3, WAV or OGG, entirely in your browser — no upload, no size limit, no watermark, no sign-up.',
    heading: 'Video to',
    accent: 'MP3',
    lede: 'Take the sound out of a video and keep it as MP3, WAV or OGG. Nothing is uploaded — the conversion happens on your machine.',
    featureList: [
    'Extract audio from MP4, MOV and WebM',
    'MP3, WAV and OGG output',
    'Choose bitrate and mono',
    'Runs fully client-side — no upload, no watermark',
  ],
    faq: [
  {
    q: 'Is my video uploaded?',
    a: 'No. The browser decodes the file and encodes the audio locally, so nothing is sent anywhere. That matters more here than for most conversions: the reason to pull audio out of a video is often that the video is personal — a lecture, an interview, a recording of your own — and it has no business on someone else\'s server to answer a question your laptop can answer.',
  },
  {
    q: 'Which format should I choose?',
    a: 'MP3 if it is going anywhere at all — every device and app plays it, and at 192 kbps it is transparent for speech and close to it for music. WAV if the audio is going into an editor or a transcription tool, since it is uncompressed and loses nothing. OGG (Vorbis) is smaller than MP3 at the same quality but less widely supported outside browsers and Android.',
  },
  {
    q: 'What bitrate do I need?',
    a: 'For speech, 96–128 kbps is plenty and halves the file against the default. For music, 192 kbps is the usual sweet spot and 320 is the most MP3 offers. Higher than the source was recorded at gains nothing: converting a 128 kbps podcast to 320 kbps produces a file two and a half times larger that sounds identical.',
  },
  {
    q: 'Why is my WAV file so large?',
    a: 'Because it is uncompressed — roughly 10 MB per minute in stereo at 44.1 kHz, regardless of what it contains. That is the point of it: nothing is thrown away. If the size is a problem and the audio is not going into an editor, MP3 is a twentieth of the size and you will not hear the difference.',
  },
  {
    q: 'Can I convert just part of the video?',
    a: 'Not on this page — it converts the whole file. Trim the video first with the trimmer, then convert what comes out, or convert everything and cut the audio in whatever you are taking it into.',
  },
  {
    q: 'Which files work?',
    a: 'Anything your browser can open: MP4, MOV and WebM video, and most audio files if you are converting between audio formats. Camera-native formats like ProRes, and DRM-protected files, cannot be read by a browser at all.',
  },
],

    summary: 'Extract the audio from a video as MP3, WAV or OGG, in the browser. Nothing is uploaded.',
    facts: [
      'MP3 uses LAME compiled to WebAssembly, loaded only when MP3 is chosen.',
      'WAV size is sampleRate x 2 bytes x channels — there is no bitrate to pick.',
      'Vorbis lands about 30% under its nominal bitrate, being variable-rate.',
      'Size predictions read the real channel count and sample rate from the file; assuming stereo doubles the estimate for a mono source.',
      'A bitrate higher than the source was recorded at enlarges the file without improving it.',
    ],
    code: `// npm i mediabunny @mediabunny/mp3-encoder
import { Input, Output, Conversion, BlobSource, BufferTarget, Mp3OutputFormat, ALL_FORMATS } from 'mediabunny';
import { registerMp3Encoder } from '@mediabunny/mp3-encoder';

registerMp3Encoder();   // LAME compiled to WASM; only needed for MP3 output

export async function extractAudio(file, { bitrate = 192_000, mono = false } = {}) {
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const output = new Output({ format: new Mp3OutputFormat(), target: new BufferTarget() });

  const conversion = await Conversion.init({
    input,
    output,
    video: { discard: true },                      // leave the picture behind
    audio: { bitrate, ...(mono ? { numberOfChannels: 1 } : {}) },
  });

  if (!conversion.isValid) throw new Error('No audio track, or it cannot be decoded');
  await conversion.execute();

  return new Blob([output.target.buffer], { type: 'audio/mpeg' });
}

const mp3 = await extractAudio(file, { bitrate: 192_000 });`,
    prompt: `Add "extract the audio from a video" to my project. It must run entirely in the browser — the
files are personal (lectures, interviews, recordings) and must not be uploaded anywhere.

Requirements:
- Use "mediabunny" for decoding and "@mediabunny/mp3-encoder" for MP3 (LAME compiled to WASM).
  Import the MP3 encoder lazily — only load it when the user actually picks MP3.
- Support MP3, WAV and OGG output. Set video: { discard: true } so only the audio is written.
- WAV has no bitrate to choose: hide that control when WAV is selected, because its size is
  sampleRate x 2 bytes x channels and nothing else.
- Predict the output size before converting, and read the real channel count and sample rate off the
  file to do it — assuming stereo doubles the estimate for a mono source. For Vorbis apply about 0.7
  to the nominal bitrate, since it runs variable-rate and lands under.
- Tell the user when a requested bitrate exceeds what the source was recorded at: it makes the file
  bigger without making it sound better.
- Fail clearly when the file has no audio track at all, before doing any work.

Reference implementation: https://life2film.com/tools/video-to-mp3/`,
    agentJob: 'Pulling audio out of a video, locally',
  },
  {
    slug: 'video-converter',
    group: 'everyday',
    name: 'Convert Video',
    appName: 'Video Converter',
    blurb: 'MP4, WebM and MOV in any direction — or pull the audio out as WAV.',

    searchPhrase: 'Video Converter Online',
    title: 'Video Converter Online Free — MP4, WebM, MOV, no upload',
    description: 'Free online video converter for MP4, WebM and MOV, or extract the audio as WAV. Converts in your browser using WebCodecs — no upload, no size limit, no watermark, no sign-up.',
    heading: 'Convert',
    accent: 'Video',
    lede: 'Change format without handing your file to anyone. MP4, WebM, MOV — or pull out just the audio.',
    featureList: [
    'MP4, WebM and MOV conversion',
    'Extract audio as WAV',
    'Optional resize during conversion',
    'Runs fully client-side — no upload, no watermark',
  ],
    faq: [
  {
    q: 'Which conversions are supported?',
    a: 'Between MP4, WebM and MOV, and from any of them to WAV audio. What actually works depends on your browser, because the encoding is done by the browser itself — Chrome and Edge cover the most ground, Safari handles MP4 and MOV well. The tool checks before it starts and says so if a combination is not available rather than failing halfway through.',
  },
  {
    q: 'Can I extract just the audio?',
    a: 'Yes — choose WAV and the picture is discarded, leaving the sound as an uncompressed file any editor or transcription tool will accept. WAV is deliberately large; if you need something small, convert and then compress, or keep the original.',
  },
  {
    q: 'Is anything uploaded?',
    a: 'No. Conversion runs through WebCodecs in your browser. That is the point of doing it this way: converting a large file by uploading it, waiting on a queue and downloading it back is slower than doing it locally, and it puts your footage on a stranger\'s disk in between.',
  },
  {
    q: 'Why can my browser not open a MOV from my camera?',
    a: 'A .mov file is a container, and what matters is the codec inside it. Browsers handle H.264 and, increasingly, HEVC — but not ProRes, DNxHD or camera-raw formats, which is what professional cameras usually write into a .mov. Those need a real transcode from a desktop tool first.',
  },
  {
    q: 'Does converting lose quality?',
    a: 'Changing container between MP4 and MOV can often be done without touching the video at all. Changing codec — to WebM, for example — means re-encoding, and re-encoding always costs a little. It is generally invisible for one generation, and it accumulates if you convert the same file repeatedly.',
  },
],

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
    prompt: `Add "convert a video between formats" to my project, running entirely in the browser.

Requirements:
- Use "mediabunny" (WebCodecs). Support MP4, WebM and MOV, plus WAV for audio-only output.
- Check what the browser can actually encode BEFORE starting, with getFirstEncodableVideoCodec on the
  chosen output format. Finding out by failing at 70% of a long encode is the worst possible way to
  learn it. Say which codec will be used when it succeeds.
- A container is not a codec. Read what is inside the file and show it: browsers handle H.264 and
  often HEVC, but never ProRes or camera raw, and a .mov from a professional camera will not open.
  Say that in the error rather than "unsupported file".
- Hide the resolution control for audio-only output — it is meaningless without a picture.
- MP4 to MOV can often be done without touching the video; changing codec cannot.

Reference implementation: https://life2film.com/tools/video-converter/`,
    agentJob: 'Converting video between formats in the browser',
  },
  {
    slug: 'video-splitter',
    group: 'engine',
    name: 'Video Splitter',
    appName: 'Video Splitter',
    blurb: 'Cut a long video into Reels or Shorts that start on a shot change instead of every 30 seconds, ranked by picture quality.',

    searchPhrase: 'Split Video Online',
    title: 'Split Video Online Free — into Reels and Shorts, cut at the scene changes',
    description: 'Free online video splitter that cuts a long video into parts at its shot changes instead of every 30 seconds, ranked by picture quality. Optional 9:16 crop for Reels, Shorts and TikTok. Nothing is uploaded.',
    heading: 'Video',
    accent: 'Splitter',
    lede: 'Cut a long video into clips that start where the video changes — not every thirty seconds. Everything happens on your machine.',
    featureList: [
        'Cuts on scene changes, not on a fixed interval',
        'Clips ranked by picture quality',
        'Optional 9:16 crop for Reels, Shorts and TikTok',
        'Runs fully client-side — no upload, no watermark',
      ],
    faq: [
  {
    q: 'How is this different from other video splitters?',
    a: 'Most cut every N seconds, so a clip can start halfway through a sentence and end mid-gesture. This one finds the cuts the video already has — the shot changes — and builds clips out of whole shots. You still choose roughly how long a clip should be; the boundaries land on the nearest real change instead of on a stopwatch.',
  },
  {
    q: 'Is my video uploaded?',
    a: 'No. The browser decodes it, WebAssembly analyses the frames, and the clips are re-encoded locally with WebCodecs — the same hardware path your browser uses to play video. Nothing is sent anywhere, which is also why there is no length limit imposed by a plan, no queue and no watermark.',
  },
  {
    q: 'What are the stars next to each clip?',
    a: 'The engine scores every sampled frame for sharpness, exposure, contrast, colourfulness and detail, and each clip gets the duration-weighted average of the shots inside it. The stars are relative to the best clip in this video, not an absolute scale — they are a suggestion of where to look first, not a verdict on what is interesting.',
  },
  {
    q: 'Will the vertical crop cut people out of frame?',
    a: 'It takes the centre of the frame, which is right most of the time and wrong when the subject is off to one side. There is no face tracking here yet, so check the previews before posting. If a clip is framed wide, it is usually better to crop it by hand.',
  },
  {
    q: 'How long does it take?',
    a: 'Analysis takes a few seconds per minute of video. Encoding is the slow part and depends on your machine — expect roughly real time or better for 1080p on a recent laptop, since it uses the GPU where available. Clips are written one at a time so you can start downloading before the rest finish.',
  },
  {
    q: 'Which files work?',
    a: 'MP4 and MOV with H.264, and WebM — whatever your browser can both decode and encode. Camera-native formats like ProRes or raw usually cannot be opened by a browser; transcode a proxy first.',
  },
],

    summary: 'Cut a long video into clips that begin at shot changes rather than on a fixed interval, ranked by picture quality.',
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
    prompt: `Build a video splitter that cuts at the shot changes instead of every N seconds, in the browser.

Requirements:
- Every other splitter cuts on a fixed interval, so clips open mid-gesture. Find the cuts the video
  already has and build clips out of whole shots.
- Detect shots with the "life2film-engine" npm package (WebAssembly): sample frames, take the mean RGB
  of the centre column, pass pixels + timestamps to detect_scenes_slick.
- Sampling rate decides accuracy, not the algorithm. At 2 samples/second boundaries land 1-3 seconds
  out and all sixteen algorithms are wrong the same way; at 10/second they land on the frame. Use a
  coarse pass to find candidates, then re-sample tightly around each one at ten times the resolution.
- Group whole shots into clips near the target length; never cut inside a shot. A shot longer than the
  target becomes its own clip. Absorb a short tail into the previous clip rather than leaving a
  two-second orphan.
- Rank clips by picture quality using score_frame, taking the MEDIAN score per shot (one bad frame
  should not sink a good shot) and weighting by duration when combining shots.
- Encode with "mediabunny", trim: {start, end} per clip, and offer a 9:16 crop via
  video: { width: 1080, height: 1920, fit: 'cover' }.
- Cap the input length — every sample is a seek costing tens of milliseconds.

Reference implementation: https://life2film.com/tools/video-splitter/`,
    agentJob: 'Splitting video at its shot changes',
  },
  {
    slug: 'bpm-detector',
    group: 'engine',
    name: 'BPM Detector',
    appName: 'BPM Detector',
    blurb: 'Find a track’s tempo and the time of every beat, then send the grid to Resolve, Premiere, Final Cut or Audacity as markers.',

    searchPhrase: 'BPM Detector Online',
    title: 'BPM Detector Online Free — find a song’s tempo and every beat',
    description: 'Free online BPM finder: get a track’s tempo and the exact time of every beat, in your browser. Export the beat grid to DaVinci Resolve, Premiere, Final Cut or Audacity. Nothing is uploaded.',
    heading: 'BPM',
    accent: 'Detector',
    lede: 'Drop in a track. Get its tempo and the exact time of every beat — computed on your own machine, with nothing uploaded.',
    featureList: [
        'Tempo (BPM) detection',
        'Per-beat timestamps',
        'Runs fully client-side — no upload',
        'Export to EDL, OTIO, FCPXML, Audacity labels, CSV and JSON',
        'Frame-rate aware timecode',
      ],
    faq: [
  {
    q: 'Does my audio get uploaded anywhere?',
    a: 'No. The analysis runs inside your browser as WebAssembly. The file is read from disk into memory and never sent over the network — you can check by opening the network tab, or by pulling the plug once the page has loaded.',
  },
  {
    q: 'How accurate is it?',
    a: 'It uses onset-strength analysis with dynamic-programming beat tracking — the same approach behind established music-information-retrieval tooling, and the same code that drives Life2Film’s montage engine. On music with a steady pulse it lands within a beat of the truth. On rubato, live recordings without a click, or heavily syncopated material, treat the number as a starting point.',
  },
  {
    q: 'What does “half or double tempo” mean?',
    a: 'Tempo is ambiguous by nature: a track at 140 BPM is also, correctly, 70 BPM counted in half time. Detectors pick whichever is stronger in the signal. If the number feels off by exactly 2×, that is what happened, and both answers are shown so you can take the one you need.',
  },
  {
    q: 'Which formats work?',
    a: 'Whatever your browser can decode: MP3, WAV, M4A, AAC, FLAC and OGG in current Chrome, Edge, Safari and Firefox. Video files work too — the audio track is what gets read.',
  },
  {
    q: 'Can I use the beat times in my editor?',
    a: 'That is what the export is for. EDL is the one to pick for DaVinci Resolve or Premiere Pro — each beat arrives as a named marker on the timeline. Final Cut takes the FCPXML. OTIO works in Resolve, Avid and Premiere too, and is the right choice if the beats are heading into a pipeline rather than straight onto a timeline. Audacity reads the label export, and CSV or JSON cover spreadsheets and scripts.',
  },
  {
    q: 'Why does the frame rate matter?',
    a: 'Beats fall on fractions of a second; timelines count whole frames. Every marker has to be rounded to the nearest frame of the project it is going into, so a grid exported at 25 fps will sit up to 20 ms off in a 30 fps sequence. Set the rate to match your project and the markers land exactly where the beat is. It does not affect CSV or JSON, which carry raw seconds as well.',
  },
],

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
    prompt: `Add beat detection to my project. It must run in the browser with no upload and no API key.

Requirements:
- Use the "life2film-engine" npm package (WebAssembly). detect_beats takes mono f32 PCM, which is
  exactly what AudioContext.decodeAudioData gives you.
- Down-mix to mono at 22050 Hz with an OfflineAudioContext before analysing. The onset envelope lives
  far below that, so the source rate costs several times the memory and time for an identical answer.
- Tempo is genuinely ambiguous: 140 BPM is also 70 in half time. Show both readings rather than
  treating a 2x difference as an error.
- Draw the beats over a waveform so the user can check them, but show a WINDOW of a few seconds, not
  the whole track — 400 beats across 1000 pixels is a solid block that proves nothing.
- Let the user play the track with a click on every beat. It is the fastest way to verify a grid.
- Export the grid for editors: EDL for Resolve and Premiere, FCPXML for Final Cut, OTIO for
  pipelines, Audacity labels, CSV, JSON. Markers land on whole frames, so ask for the project frame
  rate — a grid at 25 fps sits up to 20 ms off in a 30 fps sequence.

Reference implementation: https://life2film.com/tools/bpm-detector/`,
    agentJob: 'Finding the tempo and beat grid of a track',
  },
  {
    slug: 'scene-detector',
    group: 'engine',
    name: 'Scene Detector',
    appName: 'Scene Detector',
    blurb: 'Find every cut in a video and get the shot list with thumbnails, timecodes and quality scores.',

    searchPhrase: 'Scene Detection Online',
    title: 'Scene Detector Online Free — find every cut in a video',
    description: 'Free online scene detection: find every shot change in a video with thumbnails and timecodes, then export as EDL, OTIO, FCPXML or CSV. Runs in your browser — nothing uploaded.',
    heading: 'Scene',
    accent: 'Detector',
    lede: 'Drop in a video. Get every cut, with a thumbnail and a timecode for each shot — found on your own machine, with nothing uploaded.',
    featureList: [
        'Shot boundary detection',
        'Per-shot quality scoring',
        'Thumbnails for every shot',
        'Runs fully client-side — no upload',
        'Export to EDL, OTIO, FCPXML, Audacity labels, CSV and JSON',
      ],
    faq: [
  {
    q: 'Does the video get uploaded?',
    a: 'No. The browser decodes it locally, a canvas reads the pixels, and WebAssembly compares them. Nothing is sent anywhere — the page has no endpoint to send it to. That is also why there is no file-size limit and no queue.',
  },
  {
    q: 'How does it find the cuts?',
    a: 'It samples frames across the video and watches how much the picture changes from one sample to the next. A cut is a discontinuity — colour and luminance jump in a single step, rather than drifting the way they do during a pan or a fade. The detector looks for those steps and reports the boundaries between them.',
  },
  {
    q: 'Will it catch dissolves and fades?',
    a: 'Partly. A hard cut is unambiguous and gets found reliably. A slow dissolve is, by construction, a gradual change — the same shape as a camera move — so it may be reported a little early, a little late, or merged with its neighbour. Fast whip-pans can also read as cuts. Treat the result as a shot list to check, not a verdict.',
  },
  {
    q: 'What is the quality score next to each shot?',
    a: 'The same per-frame scoring the Life2Film app uses when deciding what to keep: sharpness, exposure, contrast, colourfulness and entropy, combined into one number. It is a rough ranking of which shots are worth a second look, not a judgement of what is interesting.',
  },
  {
    q: 'Which files work?',
    a: 'Anything the browser can play — MP4 and MOV with H.264, and WebM. Formats a browser cannot decode, such as most ProRes or raw camera files, will not open here; transcode a proxy first.',
  },
  {
    q: 'How long does it take?',
    a: 'It steps through the video seeking to each sample point, which costs tens of milliseconds each time. A one-minute clip takes a few seconds. Long videos are sampled more coarsely so the wait stays reasonable — the shot list stays accurate to roughly half a second either way.',
  },
],

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
    prompt: `Add shot-boundary detection to my project, running in the browser without uploading the video.

Requirements:
- Use the "life2film-engine" npm package (WebAssembly) for detection and the browser's own decoder for
  frames: <video> plus a canvas works everywhere and needs no WebCodecs.
- Sample frames at ~64 px wide, take the mean RGB of the centre column, and pass pixels + timestamps
  to detect_scenes_slick.
- Sampling rate decides accuracy far more than the algorithm does. Measured against a video with cuts
  at known times: 2 samples/second put boundaries 1-3 seconds out and all sixteen algorithms failed
  the same way; 10/second put them on the frame. Do a coarse pass, then refine around each candidate
  at ten times the resolution and take the largest frame-to-frame change.
- Show a thumbnail per shot. The fastest way to check a shot list is to look at it, and a boundary
  that is wrong is obvious in a picture and invisible in a number.
- Score each shot with score_frame and take the median, not the mean.
- Export as EDL, OTIO, FCPXML, Audacity labels, CSV or JSON, at a frame rate the user chooses.
- Cap the input length: each sample is a seek costing tens of milliseconds.

Reference implementation: https://life2film.com/tools/scene-detector/`,
    agentJob: 'Finding every cut in a video',
  },
];

/** Lookup by slug — the `.md` route and the pages both need it. */
export const TOOL = Object.fromEntries(TOOLS.map((tool) => [tool.slug, tool])) as Record<string, Tool>;

export const GROUPS: { id: ToolGroup; name: string; note: string }[] = [
  { id: 'everyday', name: 'Everyday', note: 'The things footage usually needs before anything else.' },
  {
    id: 'engine',
    name: 'Made with the engine',
    note: 'These read what is in the video, which is the part other tools skip.',
  },
];

export const byGroup = (group: ToolGroup) => TOOLS.filter((tool) => tool.group === group);
