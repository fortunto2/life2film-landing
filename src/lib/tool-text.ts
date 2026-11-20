/**
 * Speech and text tools added 20 Nov 2026 (auto subtitles, add text). Apart from tool-edits.ts so
 * each registry file stays under 1000 lines.
 */
import type { Tool } from './tools';

export const TEXT_TOOLS: Tool[] = [
  {
    // 20 Nov 2026: «автоматические субтитры онлайн», «auto subtitle generator», «video to text» —
    // Whisper in the tab, SRT out, and burn-subtitles right after.
    slug: 'auto-subtitles',
    group: 'everyday',
    name: 'Auto Subtitles',
    appName: 'Auto Subtitles',
    blurb: 'Speech to SRT or VTT in your browser with Whisper, then burn them in with one more click.',

    searchPhrase: 'Auto Subtitle Generator Online',
    title: 'Auto Subtitle Generator Online Free | video to SRT with Whisper, no upload',
    description: 'Make subtitles from a video automatically, online and free: Whisper runs in your browser and writes SRT or VTT with timing, in 99 languages. The video is not uploaded; the speech model downloads once and is cached.',
    heading: 'Auto',
    accent: 'subtitles',
    lede: 'Turn speech into timed subtitles without sending the video anywhere.',
    featureList: [
      'Whisper base (fast) or small (more accurate), running in the tab',
      'Language detected, or chosen from the list',
      'SRT and WebVTT with timing, lines split to a readable length',
      'GPU through WebGPU where the browser has it, CPU otherwise',
      'The video is not uploaded; the model downloads once',
    ],
    faq: [
      {
        q: 'How accurate is it?',
        a: 'It is Whisper, the same family most caption tools use, at its small sizes. Clear speech in English, Spanish or Russian comes out nearly clean; noisy rooms, overlapping voices and names need a read-through. The «Accurate» model is noticeably better and three times larger to download.',
      },
      {
        q: 'How long does it take?',
        a: 'The first run downloads the model (about 80 MB for the fast one), which is most of the wait on a short clip; after that it is cached. Transcription itself is faster with WebGPU (recent Chrome or Edge) than on the CPU.',
      },
      {
        q: 'Is my video uploaded?',
        a: 'No. Only the model files come from the internet (Hugging Face); the sound is decoded and transcribed on your machine.',
      },
    ],

    summary: 'Transcribe a video\'s speech to SRT/VTT in the browser with Whisper (transformers.js), no upload.',
    facts: ['Whisper leaves the last chunk\'s end open; close it at the audio\'s end or the final cue is lost.'],
    agentJob: 'Making subtitles from speech, locally',
  },
  {
    // 20 Nov 2026: «add text to video», «добавить текст на видео» — one caption, the burner's drawing.
    slug: 'add-text-to-video',
    group: 'everyday',
    name: 'Add Text to Video',
    appName: 'Add Text',
    blurb: 'Put a caption on a video, top or bottom, readable on any background.',

    searchPhrase: 'Add Text to Video Online',
    title: 'Add Text to Video Online Free | caption on a video, no upload',
    description: 'Add text to a video online for free: type a caption, pick the size and top or bottom, get an MP4 with the text in the picture, white with a dark outline so it reads on any background. In your browser: nothing is uploaded, no watermark.',
    heading: 'Add text to',
    accent: 'video',
    lede: 'Type a caption and get it in the picture. The video stays on your device.',
    featureList: [
      'One caption for the whole video, up to 200 characters, wrapped to the width',
      'White with a dark outline: readable on light and dark footage',
      'Three sizes, top or bottom',
      'Sound copied untouched',
      'Runs fully client-side: no upload, no watermark',
    ],
    faq: [
      {
        q: 'Can the text change during the video?',
        a: 'Not here: this puts one caption on the whole clip. For text that changes with time, write an SRT file (or make one with Auto Subtitles) and use Add Subtitles to Video.',
      },
      {
        q: 'Is my video uploaded?',
        a: 'No. Your browser draws every frame and encodes the result.',
      },
    ],

    summary: 'Add one text caption to a whole video in the browser; sound copied.',
    facts: ['A white fill with a dark stroke about 18% of the font size stays legible on both bright and dark frames.'],
    agentJob: 'Adding text to a video, locally',
  },
];
