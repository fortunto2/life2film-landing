/**
 * Single-job editing tools added 20 Nov 2026 (remove audio, rotate, info, crop), each a job people
 * search for by name. Kept apart from tools.ts so that file stays under 1000 lines.
 */
import type { Tool } from './tools';

export const EDIT_TOOLS: Tool[] = [
  {
    // 20 Nov 2026: a job people search for by name («remove audio from video», «mute video
    // online»), done here without re-encoding: the video track is copied, the sound is dropped.
    slug: 'remove-audio-from-video',
    group: 'everyday',
    name: 'Remove Audio',
    appName: 'Remove Audio from Video',
    blurb: 'Mute a video by dropping its sound track. The picture is copied as it is, so nothing is lost.',

    searchPhrase: 'Remove Audio from Video Online',
    title: 'Remove Audio from Video Online Free | mute a video, no re-encoding',
    description: 'Remove the sound from a video online for free: the audio track is dropped and the picture is copied without re-encoding, so quality stays exactly the same. Runs in your browser, no upload, no watermark.',
    heading: 'Remove audio',
    accent: 'from video',
    lede: 'Drop the sound track and keep the picture untouched. Nothing is uploaded and nothing is re-encoded.',
    featureList: [
      'Removes the audio track from MP4, MOV and WebM',
      'Copies the video without re-encoding: same quality, done in seconds',
      'Runs fully client-side: no upload, no watermark, no size limit',
    ],
    faq: [
      {
        q: 'Does removing the audio lower the video quality?',
        a: 'No. The picture is copied into the new file as it is, frame for frame; only the sound track is left out. If your browser cannot copy that codec into the chosen container, the tool re-encodes the picture instead and says so.',
      },
      {
        q: 'Is my video uploaded?',
        a: 'No. The file is read and written by your browser through WebCodecs. Nothing leaves your device, which is also why there is no size limit beyond your browser\'s memory.',
      },
      {
        q: 'Can I keep the audio as a separate file?',
        a: 'Yes, with the video to MP3 tool on this site: it does the opposite job, keeping the sound and dropping the picture.',
      },
      {
        q: 'Can I mute only part of a video?',
        a: 'Not here: this tool removes the whole sound track. To silence a stretch, cut the video into parts with the splitter, mute the part you need, and join them in an editor.',
      },
    ],

    summary: 'Remove the audio track from a video in the browser, copying the picture without re-encoding.',
    facts: [
      'Dropping a track is a remux, not a transcode: the video packets are copied, so quality and length are unchanged.',
      'A copy needs the codec to be allowed in the output container (H.264 in MP4 and MOV, VP8/VP9 in WebM); otherwise the picture must be re-encoded.',
    ],
    code: `import { Input, Output, Conversion, BlobSource, BufferTarget, Mp4OutputFormat, ALL_FORMATS } from 'mediabunny';

const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
const conversion = await Conversion.init({ input, output, audio: { discard: true } });
await conversion.execute(); // video is copied when the codec allows it
const muted = new Blob([output.target.buffer!], { type: 'video/mp4' });`,
    prompt: `Add "remove the audio from a video" to my project, running entirely in the browser.

Requirements:
- Use "mediabunny" (WebCodecs). Discard the audio track and let the video be copied, not
  re-encoded, whenever the codec fits the output container; say when it had to re-encode.
- Keep the source container when possible (MP4 stays MP4, MOV stays MOV, WebM stays WebM).
- Results over ~2 GB must be written in pieces (StreamTarget), not one ArrayBuffer: Chrome refuses
  a single buffer that large.
- Fail clearly when the file has no audio to remove: say the file is already silent.

Reference implementation: https://life2film.com/tools/remove-audio-from-video/`,
    agentJob: 'Muting a video, locally',
  },
  {
    // 20 Nov 2026: «rotate video», «flip video» — a job searched by name. Done as rotation metadata
    // by default (lossless, instant), with an opt-in to draw the turn into the frames.
    slug: 'rotate-video',
    group: 'everyday',
    name: 'Rotate Video',
    appName: 'Rotate Video',
    blurb: 'Turn a sideways video upright or mirror it, without re-encoding.',

    searchPhrase: 'Rotate Video Online',
    title: 'Rotate Video Online Free | turn 90° or flip, no re-encoding',
    description: 'Rotate a video 90°, 180° or 270°, or flip it, online and free. The turn is written into the file without re-encoding, so quality stays the same; or draw it into the frames for players that ignore rotation. In your browser, no upload.',
    heading: 'Rotate',
    accent: 'video',
    lede: 'Fix a sideways video in seconds. Nothing is uploaded, and by default nothing is re-encoded.',
    featureList: [
      'Rotate 90° right, 90° left or 180°, and mirror horizontally',
      'Lossless by default: the turn is stored in the file, the frames are copied',
      'Optional: draw the turn into the frames for players that ignore rotation',
      'Runs fully client-side: no upload, no watermark',
    ],
    faq: [
      {
        q: 'Does rotating lose quality?',
        a: 'Not by default. Video files carry a rotation flag that players read, so the tool sets that flag and copies the frames untouched: same quality, done in seconds. If you tick «draw the turn into the frames», the picture is re-encoded, which costs a little quality once.',
      },
      {
        q: 'Why is my rotated video still sideways in some apps?',
        a: 'A few players and upload forms ignore the rotation flag and show the frames as they are stored. For those, rotate again with «draw the turn into the frames» ticked: the turn then is part of the picture and every player shows it upright.',
      },
      {
        q: 'Is my video uploaded?',
        a: 'No. Your browser reads and writes the file through WebCodecs; nothing leaves your device.',
      },
    ],

    summary: 'Rotate or mirror a video in the browser, losslessly through rotation metadata or by redrawing the frames.',
    facts: [
      'MP4 and MOV store a rotation matrix; setting it turns the video for every player that reads it, with the frames copied untouched.',
      'Some players and uploaders ignore that matrix; baking the turn into the frames needs a re-encode.',
    ],
    code: `import { Input, Output, Conversion, BlobSource, BufferTarget, Mp4OutputFormat, ALL_FORMATS } from 'mediabunny';

const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
// Metadata when possible (lossless); allowTransformationMetadata: false draws it into the frames.
const conversion = await Conversion.init({ input, output, video: { rotate: 90 } });
await conversion.execute();`,
    prompt: `Add "rotate or flip a video" to my project, running entirely in the browser.

Requirements:
- Use "mediabunny" (WebCodecs). Offer 90° right, 90° left, 180° and a horizontal mirror.
- Default to rotation metadata so the frames are copied untouched; offer an explicit option to
  draw the turn into the frames (allowTransformationMetadata: false) for players that ignore it,
  and say that this re-encodes.
- Keep the source container (MP4 stays MP4, MOV stays MOV).
- Write results in pieces (StreamTarget), not one ArrayBuffer: Chrome refuses buffers over ~2 GB.

Reference implementation: https://life2film.com/tools/rotate-video/`,
    agentJob: 'Rotating a video, locally',
  },
  {
    // 20 Nov 2026: «узнать битрейт аудио онлайн» had 42 impressions and no page that answers it.
    slug: 'video-info',
    group: 'everyday',
    name: 'Video Info',
    appName: 'Video Info and Bitrate Checker',
    blurb: 'Bitrate, codec, frame rate, resolution and audio details of any video or audio file.',

    searchPhrase: 'Check Video Bitrate Online',
    title: 'Check Video and Audio Bitrate Online Free | codec, FPS, resolution',
    description: 'Find the bitrate, codec, frame rate, resolution, HDR and audio sample rate of a video or audio file, online and free. Read in your browser: the file is not uploaded, so large files are fine.',
    heading: 'Video',
    accent: 'info',
    lede: 'Drop a file and see what is inside it: bitrate, codec, frame rate, resolution, audio. Nothing is uploaded.',
    featureList: [
      'Overall, video and audio bitrate',
      'Codec, resolution, frame rate, rotation and HDR',
      'Audio channels and sample rate',
      'Copy the whole report as text',
      'Runs fully client-side: no upload',
    ],
    faq: [
      {
        q: 'How is the bitrate measured?',
        a: 'From the file itself: the size of the packets of each track over their duration, read from up to 600 packets, so long files stay fast. The overall bitrate is the file size over its length and includes the container overhead.',
      },
      {
        q: 'Is my file uploaded?',
        a: 'No. Your browser reads only the parts of the file it needs; nothing leaves your device, so a several-gigabyte file works as well as a small one.',
      },
      {
        q: 'Which files can it read?',
        a: 'MP4, MOV, WebM, MKV, MP3, M4A, WAV, OGG and FLAC. Reading the details does not need a decoder, so it works even for codecs your browser cannot play, such as ProRes.',
      },
    ],

    summary: 'Read the bitrate, codec, frame rate, resolution and audio details of a media file in the browser.',
    facts: [
      'Track bitrate and frame rate can be computed from packet sizes and timestamps without decoding a single frame.',
      'Overall bitrate (size × 8 / duration) includes container overhead and is always a little above the sum of the tracks.',
    ],
    code: `import { Input, BlobSource, ALL_FORMATS } from 'mediabunny';

const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
const video = await input.getPrimaryVideoTrack();
const stats = await video.computePacketStats(600); // averageBitrate, averagePacketRate (fps)`,
    prompt: `Add "show what is inside a media file" to my project, running entirely in the browser.

Requirements:
- Use "mediabunny". Show container, size, duration, overall bitrate; per video track codec,
  display resolution, frame rate, bitrate, rotation and HDR; per audio track codec, bitrate,
  channels and sample rate.
- Compute bitrate and frame rate with computePacketStats on a bounded number of packets, so a
  multi-gigabyte file answers in a second. No decoding is needed.
- Offer the report as copyable text.

Reference implementation: https://life2film.com/tools/video-info/`,
    agentJob: 'Reading a media file\'s details, locally',
  },
  {
    // 20 Nov 2026: «crop video to 9:16» — reformatting a landscape clip for Reels/TikTok/Shorts.
    slug: 'crop-video',
    group: 'everyday',
    name: 'Crop Video',
    appName: 'Crop Video to 9:16, 1:1 or 4:5',
    blurb: 'Crop a landscape video to 9:16 for Reels, TikTok and Shorts, or to a square.',

    searchPhrase: 'Crop Video Online',
    title: 'Crop Video Online Free | 9:16 for Reels and TikTok, 1:1, 4:5',
    description: 'Crop a video to 9:16 for Reels, TikTok and Shorts, to 1:1, 4:5 or 16:9, online and free. Slide the frame to keep what matters. Runs in your browser: no upload, no watermark.',
    heading: 'Crop',
    accent: 'video',
    lede: 'Turn a wide clip into a vertical one, or a square, and choose which part stays. Nothing is uploaded.',
    featureList: [
      '9:16, 1:1, 4:5 and 16:9 presets',
      'Slide the frame to keep the subject in shot',
      'Keeps the original resolution of the cropped area: nothing is upscaled',
      'Runs fully client-side: no upload, no watermark',
    ],
    faq: [
      {
        q: 'How do I make a horizontal video vertical for Reels or TikTok?',
        a: 'Choose 9:16, slide the frame onto the part you want to keep, and crop. The result is the tallest 9:16 area of your video at its own pixel size; Instagram and TikTok scale it to full screen.',
      },
      {
        q: 'Does cropping lower the quality?',
        a: 'The kept pixels are not scaled, but cropping always re-encodes the picture, which costs a little quality once. From a 1080p landscape clip a 9:16 crop is 606×1080, which is fine on a phone screen.',
      },
      {
        q: 'Is my video uploaded?',
        a: 'No. Your browser decodes, crops and encodes the video through WebCodecs; nothing leaves your device.',
      },
    ],

    summary: 'Crop a video to 9:16, 1:1, 4:5 or 16:9 in the browser, with the frame placed by hand.',
    facts: [
      'A crop is applied after rotation, so a phone clip with rotation metadata must be cropped in display coordinates.',
      'Encoders want even dimensions: round the crop down to even numbers.',
    ],
    code: `import { Input, Output, Conversion, BlobSource, BufferTarget, Mp4OutputFormat, ALL_FORMATS } from 'mediabunny';

const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
// 1920x1080 -> centred 9:16
const conversion = await Conversion.init({ input, output, video: { crop: { left: 656, top: 0, width: 606, height: 1080 } } });
await conversion.execute();`,
    prompt: `Add "crop a video to 9:16 / 1:1 / 4:5" to my project, running entirely in the browser.

Requirements:
- Use "mediabunny" (WebCodecs) with the video crop option. Compute the largest rectangle of the
  chosen shape inside the displayed picture, with even width and height.
- Let the user slide it along the free axis over a live preview, with the outside dimmed.
- Crop in display coordinates (after rotation) and draw the rotation into the frames.
- Write results in pieces (StreamTarget), not one ArrayBuffer.

Reference implementation: https://life2film.com/tools/crop-video/`,
    agentJob: 'Cropping a video to a shape, locally',
  },
  {
    // 20 Nov 2026: «video to gif» — one of the most searched single jobs, and gifenc is 9 KB.
    slug: 'video-to-gif',
    group: 'everyday',
    name: 'Video to GIF',
    appName: 'Video to GIF Converter',
    blurb: 'Turn a few seconds of a video into a GIF: pick the start, length, frame rate and width.',

    searchPhrase: 'Video to GIF Online',
    title: 'Video to GIF Online Free | MP4 to GIF, no upload, no watermark',
    description: 'Convert a video to a GIF online and free: choose the start, length, frames per second and width. MP4, MOV and WebM. Made in your browser, so nothing is uploaded and there is no watermark.',
    heading: 'Video',
    accent: 'to GIF',
    lede: 'Pick a moment and make it a GIF. The video stays on your device.',
    featureList: [
      'MP4, MOV and WebM to GIF',
      'Start, length up to 15 s, 10–20 fps, 320–640 px wide',
      'A palette per frame, so colour holds up',
      'Runs fully client-side: no upload, no watermark',
    ],
    faq: [
      {
        q: 'How do I make a GIF smaller?',
        a: 'Shorter, narrower and fewer frames per second, in that order. A 4-second GIF at 480 px and 15 fps is usually 2–6 MB; at 320 px and 10 fps it is a third of that. GIF has no real compression for video, so a long GIF is always large.',
      },
      {
        q: 'Is my video uploaded?',
        a: 'No. Your browser reads the frames and writes the GIF itself; nothing leaves your device.',
      },
      {
        q: 'Why is the GIF limited to 15 seconds?',
        a: 'Because past that the file stops being shareable: most chats and sites cap GIFs at 10–25 MB. For anything longer, a short MP4 plays everywhere a GIF does and is ten times smaller.',
      },
    ],

    summary: 'Convert part of a video to an animated GIF in the browser, with start, length, fps and width.',
    facts: [
      'GIF is 256 colours per frame; quantizing each frame separately keeps colour far better than one palette for the clip.',
      'GIF size grows with width × height × fps × seconds; halving the width cuts it by about four.',
    ],
    code: `import { GIFEncoder, quantize, applyPalette } from 'gifenc';

const gif = GIFEncoder();
for (const rgba of frames) { // Uint8Array RGBA, one per frame
  const palette = quantize(rgba, 256);
  gif.writeFrame(applyPalette(rgba, palette), width, height, { palette, delay: 66 });
}
gif.finish();
const blob = new Blob([gif.bytes()], { type: 'image/gif' });`,
    prompt: `Add "video to GIF" to my project, running entirely in the browser.

Requirements:
- Read frames at the chosen fps from a <video> or WebCodecs, scaled to the chosen width.
- Encode with "gifenc": quantize each frame to its own 256-colour palette.
- Cap the length (15 s) and say why: GIFs past ~20 MB cannot be shared.
- Show the GIF on the page and save it.

Reference implementation: https://life2film.com/tools/video-to-gif/`,
    agentJob: 'Making a GIF from a video, locally',
  },
  {
    // 20 Nov 2026: «add music to video» — the job closest to the app (a film cut to music).
    slug: 'add-music-to-video',
    group: 'everyday',
    name: 'Add Music to Video',
    appName: 'Add Music to Video',
    blurb: 'Put a song under a video, trimmed to its length and faded out, without re-encoding the picture.',

    searchPhrase: 'Add Music to Video Online',
    title: 'Add Music to Video Online Free | no watermark, no upload',
    description: 'Add music to a video online and free: choose an MP3 or M4A, where the song starts, and a fade-out. The picture is copied without re-encoding, the song is cut to the video\'s length. In your browser, no upload, no watermark.',
    heading: 'Add music',
    accent: 'to video',
    lede: 'Put your song under your clip, cut to fit and faded out at the end. Nothing is uploaded.',
    featureList: [
      'MP3, M4A, WAV, OGG or the sound of another video as the music',
      'Choose where the song starts, fade-out of 0–4 s',
      'The picture is copied untouched: same quality, quick',
      'Runs fully client-side: no upload, no watermark',
    ],
    faq: [
      {
        q: 'Does it keep the original sound of the video?',
        a: 'No: the music replaces it. To keep only the video\'s own sound, there is nothing to do; to remove it without adding music, use the remove-audio tool on this site.',
      },
      {
        q: 'What if the song is shorter than the video?',
        a: 'The music plays once and the rest of the video is silent; the tool tells you where it ran out. Start the song earlier, or pick a longer one.',
      },
      {
        q: 'Can it cut the video to the beat of the song?',
        a: 'Not this page: it lays the song under one clip as it is. Cutting several clips to the beat is what the Life2Film iPhone app does: it picks the best moments from your clips and places the cuts on the beats.',
      },
      {
        q: 'Is anything uploaded?',
        a: 'No. Your browser reads both files and writes the result itself; nothing leaves your device.',
      },
    ],

    summary: 'Lay a music track under a video in the browser: video packets copied, music cut to length, faded and encoded to AAC.',
    facts: [
      'Replacing a soundtrack needs no video re-encode: copy the video packets and encode only the new audio.',
      'Cut the music to the video length and fade the last seconds; an abrupt stop is the commonest tell of a home edit.',
    ],
    code: `import { Input, Output, BlobSource, BufferTarget, Mp4OutputFormat, ALL_FORMATS,
  EncodedPacketSink, EncodedVideoPacketSource, AudioBufferSink, AudioBufferSource } from 'mediabunny';

const v = await new Input({ source: new BlobSource(video), formats: ALL_FORMATS }).getPrimaryVideoTrack();
const a = await new Input({ source: new BlobSource(music), formats: ALL_FORMATS }).getPrimaryAudioTrack();
const out = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
const vs = new EncodedVideoPacketSource(v.codec); out.addVideoTrack(vs);
const as = new AudioBufferSource({ codec: 'aac', bitrate: 192e3 }); out.addAudioTrack(as);
await out.start();
let first = true;
for await (const p of new EncodedPacketSink(v).packets()) { await vs.add(p, first ? { decoderConfig: await v.getDecoderConfig() } : undefined); first = false; }
for await (const { buffer } of new AudioBufferSink(a).buffers(0, await v.computeDuration())) await as.add(buffer);
vs.close(); as.close(); await out.finalize();`,
    prompt: `Add "add music to a video" to my project, running entirely in the browser.

Requirements:
- Use "mediabunny". Copy the video packets as they are (EncodedPacketSink -> EncodedVideoPacketSource,
  decoderConfig on the first packet); never re-encode the picture.
- Decode the music with AudioBufferSink from a chosen offset, cut it at the video's length, apply a
  linear fade-out over the last seconds, and encode with AudioBufferSource (AAC in MP4).
- Pick the audio codec with getFirstEncodableAudioCodec for the container; say so when none exists.
- When the music is shorter than the video, say where it ran out.

Reference implementation: https://life2film.com/tools/add-music-to-video/`,
    agentJob: 'Laying music under a video, locally',
  },
  {
    // 20 Nov 2026: «merge videos» / «объединить видео» — joining clips is the step before a film.
    slug: 'merge-videos',
    group: 'everyday',
    name: 'Merge Videos',
    appName: 'Merge Videos',
    blurb: 'Join two or more videos into one file, in the order you set.',

    searchPhrase: 'Merge Videos Online',
    title: 'Merge Videos Online Free | join MP4, MOV clips, no upload, no watermark',
    description: 'Merge videos online for free: join two or more MP4, MOV or WebM clips into one file in the order you choose. Different sizes are fitted into one frame. Runs in your browser, nothing is uploaded, no watermark.',
    heading: 'Merge',
    accent: 'videos',
    lede: 'Put clips one after another and get a single video. Nothing leaves your device.',
    featureList: [
      'Joins any number of MP4, MOV and WebM clips',
      'Reorder before joining',
      'Clips of different shapes are letterboxed into the first one\'s frame',
      'Clips without sound get silence, so picture and sound stay in step',
      'Runs fully client-side: no upload, no watermark',
    ],
    faq: [
      {
        q: 'Can I merge videos of different sizes or from different phones?',
        a: 'Yes. Every frame is decoded and placed into the first clip\'s frame (with black bars when the shape differs), then the whole film is encoded once. That is slower than gluing files together, and it is what makes clips from different cameras play as one.',
      },
      {
        q: 'Is there a size limit?',
        a: 'Only your device\'s memory: the merged file is held in memory before it is saved, so a few hundred megabytes is comfortable on a laptop, several gigabytes is not.',
      },
      {
        q: 'Can it pick the best parts and cut them to music?',
        a: 'Not this page: it joins whole clips as they are. Picking the best moments from many clips and cutting them to a song is what the Life2Film iPhone app does.',
      },
      {
        q: 'Is anything uploaded?',
        a: 'No. Decoding and encoding run in your browser through WebCodecs.',
      },
    ],

    summary: 'Join several videos into one in the browser, re-encoding into the first clip\'s frame so clips from different cameras play as one.',
    facts: [
      'Packet-level concatenation only works when every clip shares codec, profile and size; phones rarely agree, so a decode + encode pass is the general answer.',
      'A clip with no audio must contribute silence of its own length, or every later clip\'s sound drifts ahead of its picture.',
    ],
    code: `import { CanvasSink, CanvasSource, Output, Mp4OutputFormat, BufferTarget } from 'mediabunny';

const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext('2d');
const video = new CanvasSource(canvas, { codec: 'avc', bitrate: 5e6 });
// output.addVideoTrack(video); await output.start();
let offset = 0;
for (const clip of clips) {
  for await (const f of new CanvasSink(clip.track, { width, height, fit: 'contain' }).canvases()) {
    ctx.drawImage(f.canvas, 0, 0);
    await video.add(offset + f.timestamp, f.duration);
  }
  offset += clip.duration;
}`,
    prompt: `Add "merge several videos into one" to my project, running entirely in the browser.

Requirements:
- Use "mediabunny" (WebCodecs). Decode every clip with CanvasSink fitted ('contain') into the first
  clip's display size, draw onto one canvas and encode with CanvasSource, offsetting timestamps.
- Sound: one stereo track at the first clip's sample rate; resample others through
  OfflineAudioContext; a clip without sound adds silence of its own length.
- Let the user reorder the clips before joining.

Reference implementation: https://life2film.com/tools/merge-videos/`,
    agentJob: 'Joining videos into one, locally',
  },
];
