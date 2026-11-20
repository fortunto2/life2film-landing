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
    description: 'Make subtitles from a video automatically, online and free: Whisper runs in your browser and writes SRT or VTT with timing, or a plain transcript (.txt), in 99 languages. The video is not uploaded; the speech model downloads once and is cached.',
    heading: 'Auto',
    accent: 'subtitles',
    lede: 'Turn speech into timed subtitles without sending the video anywhere.',
    featureList: [
      'Whisper base (fast) or small (more accurate), running in the tab',
      'Language detected, or chosen from the list',
      'SRT and WebVTT with timing, lines split to a readable length; or a plain-text transcript',
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
  {
    // 20 Nov 2026: «диктофон онлайн», «online voice recorder» — the microphone straight to MP3.
    slug: 'voice-recorder',
    group: 'audio',
    name: 'Voice Recorder',
    appName: 'Voice Recorder',
    blurb: 'Record your voice from the microphone and save it as MP3 or WAV.',

    searchPhrase: 'Online Voice Recorder',
    title: 'Online Voice Recorder Free | record audio to MP3, no sign-up',
    description: 'Record your voice online for free: press record, speak, stop, and the browser saves an MP3 or WAV. No sign-up, no time limit, nothing is uploaded: the recording stays on your device.',
    heading: 'Online voice',
    accent: 'recorder',
    lede: 'Press record, speak, and get an MP3. The sound never leaves your computer.',
    featureList: [
      'MP3 (192 kbps) or WAV',
      'Level meter while recording, red when it clips',
      'Raw sound: no noise suppression or auto gain changing your voice',
      'Play it back on the page right after',
      'No sign-up, no limit, nothing uploaded',
    ],
    faq: [
      {
        q: 'Is the recording uploaded anywhere?',
        a: 'No. The browser records the microphone and encodes the MP3 itself; the file goes straight to your downloads.',
      },
      {
        q: 'The browser says it cannot get the microphone.',
        a: 'Click the camera or lock icon in the address bar and allow the microphone for this site, then press record again. On a Mac, System Settings → Privacy → Microphone must also allow the browser.',
      },
      {
        q: 'How long can I record?',
        a: 'There is no limit on our side; an hour of MP3 is about 85 MB in memory before it is saved.',
      },
    ],

    summary: 'Record the microphone in the browser and save MP3 or WAV, no upload.',
    facts: ['MediaRecorder gives WebM/Opus or MP4/AAC depending on the browser; re-encoding to MP3 makes the file open everywhere.'],
    agentJob: 'Recording a voice memo, locally',
  },
  {
    // 20 Nov 2026: «записать видео с веб-камеры онлайн», «webcam recorder» — camera + mic to a file.
    slug: 'webcam-recorder',
    group: 'everyday',
    name: 'Webcam Recorder',
    appName: 'Webcam Recorder',
    blurb: 'Record yourself from the webcam with sound and save the video.',

    searchPhrase: 'Online Webcam Recorder',
    title: 'Online Webcam Recorder Free | record video from your camera, no upload',
    description: 'Record video from your webcam online for free: turn on the camera, press record, stop, and the browser saves the video with sound (MP4 where the browser can, WebM otherwise). No sign-up, no watermark, no time limit, nothing uploaded.',
    heading: 'Webcam',
    accent: 'recorder',
    lede: 'See yourself, press record, keep the file. Nothing leaves your computer.',
    featureList: [
      'Camera and microphone together, 480p, 720p or 1080p',
      'MP4 in Safari and recent Chrome, WebM elsewhere',
      'Mirrored preview like a selfie camera; the file is saved unmirrored',
      'No sign-up, no watermark, no time limit',
      'Nothing is uploaded',
    ],
    faq: [
      {
        q: 'Is the video uploaded?',
        a: 'No. The browser records the camera into memory and saves the file to your downloads.',
      },
      {
        q: 'Why is the text in my video backwards?',
        a: 'It is not: only the preview is mirrored, like a phone\'s selfie camera. Untick «Mirror the preview» to see what the file looks like.',
      },
      {
        q: 'I got a WebM file. How do I make it MP4?',
        a: 'Open it in the Video Converter (/tools/video-converter/); it converts in the browser too.',
      },
    ],

    summary: 'Record webcam + microphone in the browser and save MP4/WebM, no upload.',
    facts: ['A mirrored preview is a CSS transform; MediaRecorder records the camera as it is.'],
    agentJob: 'Recording a webcam video, locally',
  },
  {
    // 20 Nov 2026: «изменить тональность песни онлайн», «change key of song» — pairs with key-finder.
    slug: 'change-key',
    group: 'audio',
    name: 'Change Key of a Song',
    appName: 'Change Key',
    blurb: 'Move a song up or down by semitones without changing its tempo.',

    searchPhrase: 'Change Key of a Song Online',
    title: 'Change Key of a Song Online Free | pitch shifter, same tempo, no upload',
    description: 'Change the key of a song online for free: move it up or down by up to 12 semitones and keep the tempo, then save MP3 or WAV. For singing in your range or playing along. Runs in your browser; the file is not uploaded.',
    heading: 'Change the key of',
    accent: 'a song',
    lede: 'Up or down by semitones, same tempo. The song stays on your device.',
    featureList: [
      '−12 to +12 semitones, one step at a time',
      'Tempo and length unchanged',
      'MP3 (192 kbps) or WAV out, listen on the page',
      'Works on the sound of a video too',
      'Nothing is uploaded',
    ],
    faq: [
      {
        q: 'How many semitones do I need?',
        a: 'One semitone per key step: C to D is +2, A minor to G minor is −2. Find the current key with the Key Finder (/tools/key-finder/), then count.',
      },
      {
        q: 'Does it sound like the original?',
        a: 'Within two or three semitones it stays natural; a big shift gives voices a chipmunk or giant colour, as with any pitch shifter that keeps the tempo.',
      },
      {
        q: 'Is the file uploaded?',
        a: 'No. Your browser decodes, shifts and encodes the song itself.',
      },
    ],

    summary: 'Pitch-shift a song by semitones keeping tempo (WSOLA + resample), in the browser.',
    facts: ['A semitone is a frequency ratio of 2^(1/12) ≈ 1.0595; twelve of them double the frequency.'],
    agentJob: 'Changing the key of a song, locally',
  },
  {
    // 20 Nov 2026: «добавить логотип на видео», «add watermark to video» — an image on every frame.
    slug: 'add-logo-to-video',
    group: 'everyday',
    name: 'Add Logo to Video',
    appName: 'Add Logo',
    blurb: 'Put your logo or watermark in a corner of a video, at the size and opacity you pick.',

    searchPhrase: 'Add Logo to Video Online',
    title: 'Add Logo or Watermark to Video Online Free | no upload',
    description: 'Add your logo or a watermark to a video online for free: pick a PNG (transparency kept), JPG or SVG, a corner, size and opacity, and get an MP4. Runs in your browser, nothing is uploaded, and we add no watermark of our own.',
    heading: 'Add a logo to',
    accent: 'video',
    lede: 'Your logo in the corner of every frame. The video stays on your device.',
    featureList: [
      'PNG with transparency, JPG, WebP or SVG',
      'Four corners or the centre, 4% from the edges',
      'Size and opacity sliders',
      'Sound copied untouched',
      'Nothing uploaded, no watermark of ours',
    ],
    faq: [
      {
        q: 'Will the background of my logo show?',
        a: 'Not if it is a PNG or SVG with transparency: transparent pixels stay transparent. A JPG has no transparency, so its background shows as a box.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser draws the logo on each frame and encodes the result.',
      },
    ],

    summary: 'Overlay a logo image on every frame of a video in the browser; sound copied.',
    facts: ['A logo sized by the shorter side of the frame looks the same on vertical and horizontal video.'],
    agentJob: 'Adding a logo to a video, locally',
  },
  {
    // 20 Nov 2026: «sped up song maker», «slowed and reverb», «ускорить песню онлайн» — the TikTok edits.
    slug: 'sped-up-slowed-reverb',
    group: 'audio',
    name: 'Sped Up & Slowed + Reverb',
    appName: 'Sped Up / Slowed',
    blurb: 'Make the sped up or slowed + reverb version of a song, or any speed in between.',

    searchPhrase: 'Sped Up & Slowed + Reverb Maker',
    title: 'Sped Up & Slowed + Reverb Song Maker Online Free | no upload',
    description: 'Make a sped up or slowed + reverb version of any song online for free: one-click presets, a speed slider from 0.5× to 2×, reverb, and an option to keep the pitch. Save MP3 or WAV. Runs in your browser; the song is not uploaded.',
    heading: 'Sped up &',
    accent: 'slowed + reverb',
    lede: 'The TikTok versions of a song, made on your own device.',
    featureList: [
      'Presets: sped up 1.25×, slowed 0.8× with reverb',
      'Any speed from 0.5× to 2×',
      'Turntable-style (pitch moves with speed) or keep the pitch',
      'Reverb from dry to 60% wet',
      'MP3 or WAV, nothing uploaded',
    ],
    faq: [
      {
        q: 'Why does the sped up version sound higher?',
        a: 'That is the sped up sound: like a record played faster, pitch rises with tempo. Tick «Keep the pitch» to change only the tempo.',
      },
      {
        q: 'Can I post the result?',
        a: 'The tool changes the sound; the rights stay with whoever owns the song. Use your own music or music you are allowed to edit.',
      },
      {
        q: 'Is the song uploaded?',
        a: 'No. Your browser decodes, changes and encodes it.',
      },
    ],

    summary: 'Sped up / slowed + reverb versions of a song (resample or WSOLA, convolution reverb) in the browser.',
    facts: ['A sped up edit at 1.25× raises the pitch by 12·log2(1.25) ≈ 3.9 semitones.'],
    agentJob: 'Making sped up or slowed versions of a song, locally',
  },
  {
    // 20 Nov 2026: «убрать шум из аудио онлайн», «remove background noise from audio» — RNNoise in WASM.
    slug: 'remove-background-noise',
    group: 'audio',
    name: 'Remove Background Noise',
    appName: 'Remove Noise',
    blurb: 'Clean fan hum, wind and room noise out of speech, in a video or a recording.',

    searchPhrase: 'Remove Background Noise from Audio Online',
    title: 'Remove Background Noise from Audio & Video Online Free | no upload',
    description: 'Remove background noise from a voice recording or a video online for free: fan, hum, wind, traffic and room tone are cleaned out of speech by RNNoise, a neural network for voice, running in your browser. Video keeps its picture; nothing is uploaded.',
    heading: 'Remove background',
    accent: 'noise',
    lede: 'Clean the noise out of speech. The file stays on your device.',
    featureList: [
      'RNNoise (Xiph), a neural noise suppressor built for voice',
      'Works on videos (picture copied, sound replaced) and recordings',
      'Strength slider to keep a little room sound',
      'Before / after players for audio',
      'Nothing is uploaded',
    ],
    faq: [
      {
        q: 'What noise does it remove?',
        a: 'Steady and semi-steady noise around a voice: fans, air conditioning, hum, wind, traffic, keyboard, room tone. It is not a vocal remover and not for music: on a song it thins the instruments.',
      },
      {
        q: 'Will my voice sound different?',
        a: 'At full strength a little drier, because the room around it goes too. Lower the strength to 60–80% to keep some of it.',
      },
      {
        q: 'Is my file uploaded?',
        a: 'No. The network runs in your browser through WebAssembly; the file never leaves your device.',
      },
    ],

    summary: 'Denoise speech in audio or video with RNNoise (WASM) in the browser; video picture copied.',
    facts: ['RNNoise answers two 480-sample frames late at 48 kHz (20 ms); mixing dry and clean without compensating comb-filters the voice.'],
    agentJob: 'Removing background noise from speech, locally',
  },
];
