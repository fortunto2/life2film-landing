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
    group: 'create',
    name: 'Auto Subtitles',
    appName: 'Auto Subtitles',
    blurb: 'Speech to SRT or VTT in your browser with Whisper, then burn them in with one more click.',

    searchPhrase: 'Auto Subtitle Generator Online',
    title: 'Auto Subtitle Generator Online Free | video to SRT with Whisper',
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
    group: 'create',
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
    group: 'create',
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
    title: 'Change Key of a Song Online Free | pitch changer, same tempo',
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
    group: 'create',
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
  {
    // 20 Nov 2026: «mp3 to mp4», «audio to video for youtube», «аудио в видео» — a cover + level bars.
    slug: 'audio-to-video',
    group: 'audio',
    name: 'Audio to Video',
    appName: 'Audio to Video',
    blurb: 'Turn an MP3 into an MP4 for YouTube: a cover image, your sound, and bars that move with it.',

    searchPhrase: 'Convert Audio to Video Online',
    title: 'Audio to Video Online Free | MP3 to MP4 with a cover image for YouTube',
    description: 'Convert audio to video online for free: an MP3, M4A or WAV plus a cover image becomes an MP4 for YouTube, Shorts or Reels, with optional level bars that move with the sound. Runs in your browser; nothing is uploaded.',
    heading: 'Audio to',
    accent: 'video',
    lede: 'A song, a podcast or a voice note, ready for YouTube. Nothing leaves your device.',
    featureList: [
      'Cover image fitted over a blurred copy of itself, or a dark background',
      'Level bars that move with the sound (optional)',
      '16:9 for YouTube, 1:1, or 9:16 for Shorts and Reels',
      'Sound encoded at 192 kbps AAC',
      'Nothing is uploaded',
    ],
    faq: [
      {
        q: 'Why can I not upload an MP3 to YouTube?',
        a: 'YouTube takes only video files. This wraps the sound in an MP4 with a picture, which YouTube accepts.',
      },
      {
        q: 'How long does it take?',
        a: 'The browser draws and encodes every frame (24 per second), so a song takes a while; with the bars off the picture barely changes and the file stays small.',
      },
      {
        q: 'Is my file uploaded?',
        a: 'No. Your browser builds the video itself.',
      },
    ],

    summary: 'MP3/M4A/WAV + cover image -> MP4 with optional level bars, in the browser.',
    facts: ['YouTube accepts only video uploads; a still image with the sound is the usual way to post audio there.'],
    agentJob: 'Turning audio into a video for YouTube, locally',
  },
  {
    // 20 Nov 2026: «make video vertical without cropping», «вертикальное видео с размытым фоном».
    slug: 'blur-background-video',
    group: 'create',
    name: 'Blurred Background Video',
    appName: 'Blur Fill',
    blurb: 'Make a horizontal video vertical (or square) without cutting it: blurred background fills the rest.',

    searchPhrase: 'Make Video Vertical with Blurred Background',
    title: 'Make a Video Vertical with Blurred Background Online Free | 9:16, no crop',
    description: 'Turn a horizontal video into 9:16 for Reels, TikTok and Shorts (or 4:5, 1:1) without cropping: the whole frame stays in the middle and a blurred copy of it fills the bands. Online, free, in your browser; nothing is uploaded, no watermark.',
    heading: 'Vertical video with',
    accent: 'blurred background',
    lede: 'Nothing cut off, no black bars. The video stays on your device.',
    featureList: [
      '9:16, 4:5, 1:1 or 16:9 output',
      'The whole frame kept, centred',
      'Bands filled with a blurred, darkened copy of the same frame',
      'Sound copied untouched',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'How is this different from cropping?',
        a: 'Cropping cuts the sides off to fill the frame (Crop Video does that). This keeps everything and fills the empty space with a blur, so nobody at the edge of the shot disappears.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser draws every frame and encodes the result.',
      },
    ],

    summary: 'Fit a video into 9:16/4:5/1:1/16:9 with a blurred copy filling the bands, in the browser.',
    facts: ['Blurring a 1/8-size copy and scaling it up looks the same as blurring full size and costs about 64x less.'],
    agentJob: 'Making a video vertical with a blurred background, locally',
  },
  {
    // 20 Nov 2026: «осветлить тёмное видео», «сделать видео чёрно-белым», «video filters online».
    slug: 'video-filters',
    group: 'create',
    name: 'Video Filters',
    appName: 'Video Filters',
    blurb: 'Brighten a dark video, make it black and white, warmer or more vivid, with a live preview.',

    searchPhrase: 'Video Filters Online',
    title: 'Video Filters Online Free | brighten a dark video, black and white',
    description: 'Apply filters to a video online for free: brighten a dark video, make it black and white, vivid, warm, cool or vintage, or set brightness, contrast, saturation and warmth yourself with a live preview. Runs in your browser; nothing is uploaded, no watermark.',
    heading: 'Video',
    accent: 'filters',
    lede: 'See the look on your own clip before you save it. The video stays on your device.',
    featureList: [
      'Presets: brighten, black & white, vivid, warm, cool, vintage',
      'Brightness, contrast, saturation and warmth sliders',
      'Live preview on your clip, exactly what gets saved',
      'Sound copied untouched',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'How do I brighten a video that is too dark?',
        a: 'Press «Brighten», then raise Brightness until faces read; add a little Contrast if it looks washed out. The preview shows the result before you save.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser applies the filter to every frame and encodes the result.',
      },
    ],

    summary: 'Brightness/contrast/saturation/warmth and B&W filters on a video, live preview, in the browser.',
    facts: ['The same CSS filter string drives the preview element and the canvas that encodes, so the preview is the result.'],
    agentJob: 'Applying a colour filter to a video, locally',
  },
  {
    // 20 Nov 2026: «два видео в одном кадре», «side by side video maker», «split screen video».
    slug: 'split-screen-video',
    group: 'create',
    name: 'Split Screen Video',
    appName: 'Split Screen',
    blurb: 'Put two videos side by side or one above the other, playing together.',

    searchPhrase: 'Split Screen Video Maker Online',
    title: 'Split Screen Video Maker Online Free | two videos side by side',
    description: 'Put two videos in one frame online for free: side by side (16:9) or one above the other (9:16 for Reels and TikTok), playing together, with the sound of either or both. Runs in your browser; nothing is uploaded, no watermark.',
    heading: 'Split screen',
    accent: 'video',
    lede: 'Two clips, one frame, in sync. The videos stay on your device.',
    featureList: [
      'Side by side (1920x1080), stacked (1080x1920) or picture in picture',
      'Each clip fills its half, cropped to cover, never stretched',
      'Sound from the first, the second, or both',
      'Plays for as long as the shorter clip',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'What if the videos have different lengths?',
        a: 'The result is as long as the shorter one. Trim the longer clip first (Video Trimmer) to choose which part plays.',
      },
      {
        q: 'Are the videos uploaded?',
        a: 'No. Your browser decodes both, draws them into one frame and encodes the result.',
      },
    ],

    summary: 'Two videos side by side or stacked in one MP4, sound from either or both, in the browser.',
    facts: ['A reaction or before/after video is the common use; stacked 9:16 fits a phone feed.'],
    agentJob: 'Putting two videos in one frame, locally',
  },
  {
    // 20 Nov 2026: «субтитры как в TikTok», «auto captions for reels», «tiktok captions generator».
    slug: 'tiktok-captions',
    group: 'create',
    name: 'TikTok-style Captions',
    appName: 'Short Captions',
    blurb: 'Big bold captions, a few words at a time in the middle of the frame, made from the speech.',

    searchPhrase: 'TikTok Captions Generator',
    title: 'TikTok-style Auto Captions Online Free | big word-by-word captions',
    description: 'Add TikTok and Reels style captions to a video automatically, online and free: Whisper hears the speech in your browser and burns big bold captions, 1 to 4 words at a time, in the middle of the frame. No upload, no watermark.',
    heading: 'TikTok-style',
    accent: 'captions',
    lede: 'Speech to big punchy captions in one step. The video stays on your device.',
    featureList: [
      'Word-level timing from Whisper, 1 to 4 words per caption',
      'Bold white captions with a dark outline, centred',
      'New caption at every sentence end or pause',
      '99 languages, detected or chosen',
      'No upload, no watermark',
    ],
    faq: [
      {
        q: 'Can I fix a misheard word?',
        a: 'Not here: this one goes straight to the video. For control, make an SRT with Auto Subtitles, fix it in any text editor, then burn it with Add Subtitles to Video.',
      },
      {
        q: 'How long does it take?',
        a: 'The first run downloads the speech model (about 80 MB for the fast one); then recognition plus drawing every frame, faster with WebGPU in recent Chrome or Edge.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Recognition and drawing both run in your browser.',
      },
    ],

    summary: 'Word-timed Whisper captions burned big and centred (TikTok/Reels style), in the browser.',
    facts: ['Short captions read best broken at sentence ends and pauses, not at a fixed word count alone.'],
    agentJob: 'Adding TikTok-style captions to a video, locally',
  },
  {
    // 20 Nov 2026: «fade in video online», «fade out video», «затемнение в начале видео».
    slug: 'fade-video',
    group: 'everyday',
    name: 'Fade In / Fade Out Video',
    appName: 'Fade Video',
    blurb: 'Fade a video in from black and out to black, the sound fading with it.',

    searchPhrase: 'Fade In Fade Out Video Online',
    title: 'Fade In / Fade Out Video Online Free | fade to black, no upload',
    description: 'Add a fade in from black and a fade out to black to a video online for free, with the sound fading along. Pick 0.5 to 3 seconds for each end. Runs in your browser; nothing is uploaded, no watermark.',
    heading: 'Fade in, fade out',
    accent: 'video',
    lede: 'A soft start and a clean ending. The video stays on your device.',
    featureList: [
      'Fade in from black and out to black, 0.5 to 3 s each',
      'The sound fades with the picture',
      'Original size kept, MP4 out',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'Does the sound fade too?',
        a: 'Yes, over the same seconds as the picture, so the end does not cut off mid-word.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser decodes it, darkens the frames and encodes the result.',
      },
    ],

    summary: 'Fade in from black and out to black, with the sound, in the browser.',
    facts: ['A one- or two-second fade out is the usual way to end a clip without an abrupt cut.'],
    agentJob: 'Fading a video in and out, locally',
  },
  {
    // 20 Nov 2026: «resize video», «change video resolution», «4k to 1080p», «изменить разрешение видео».
    slug: 'resize-video',
    group: 'everyday',
    name: 'Resize Video',
    appName: 'Resize Video',
    blurb: 'Change a video’s resolution: 4K to 1080p, 1080p to 720p and so on, shape kept.',

    searchPhrase: 'Resize Video Online',
    title: 'Resize Video Online Free | change resolution (4K, 1080p, 720p)',
    description: 'Change a video’s resolution online for free: 4K to 1080p, 1080p to 720p, 480p or 360p, vertical or horizontal, with its shape kept. Runs in your browser; nothing is uploaded, no watermark.',
    heading: 'Resize',
    accent: 'video',
    lede: 'A smaller resolution in one step. The video stays on your device.',
    featureList: [
      '2160p, 1440p, 1080p, 720p, 480p or 360p',
      'Vertical and horizontal videos, shape kept',
      'Never scaled up past the original',
      'Sound copied as is',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'What does 720p mean for a vertical video?',
        a: 'The same thing turned on its side: 720x1280. The longer edge is what the setting chooses.',
      },
      {
        q: 'I need a smaller file, not a smaller picture.',
        a: 'Video Compressor aims at a file size directly; a lower resolution is one of the things it may use.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser decodes, scales and encodes it.',
      },
    ],

    summary: 'Change a video’s resolution (2160p to 360p), shape kept, in the browser.',
    facts: ['A 1080p phone clip at 720p has about 44% of the pixels.'],
    agentJob: 'Changing a video’s resolution, locally',
  },
  {
    // 20 Nov 2026: «remove silence from video», «jump cut», «вырезать паузы из видео».
    slug: 'remove-silence-from-video',
    group: 'everyday',
    name: 'Remove Silence from Video',
    appName: 'Remove Silence',
    blurb: 'Cut the pauses out of a talking video (jump cut), picture and sound together.',

    searchPhrase: 'Remove Silence from Video Online',
    title: 'Remove Silence from Video Online Free | automatic jump cuts, no upload',
    description: 'Cut the pauses out of a talking video automatically, online and free: choose how quiet counts as silence and how long a pause may be, get a tighter MP4 with picture and sound cut together. Runs in your browser; nothing is uploaded.',
    heading: 'Remove silence',
    accent: 'from video',
    lede: 'Automatic jump cuts for talking videos. The video stays on your device.',
    featureList: [
      'Silence threshold from -50 to -30 dB',
      'Pauses longer than 0.3 to 1.2 s are cut',
      'A little air kept around every word; 5 ms ramps so joins do not click',
      'Shows how much shorter the result is',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'It cut into my words.',
        a: 'Lower the threshold (for example to -45 or -50 dB) so quieter speech counts as sound, or raise the pause length.',
      },
      {
        q: 'It cut nothing.',
        a: 'Background noise is louder than the threshold. Raise it to -35 or -30 dB, or clean the sound first with Remove Background Noise.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. The sound is measured and the cut is rendered in your browser.',
      },
    ],

    summary: 'Automatic jump cuts: pauses below a dB threshold removed from a talking video, in the browser.',
    facts: ['Quiet runs are measured in 20 ms windows; speech keeps 0.12 s of padding on each side.'],
    agentJob: 'Cutting the pauses out of a talking video, locally',
  },
  {
    // 20 Nov 2026: «boomerang video maker», «make a boomerang from a video», «бумеранг из видео».
    slug: 'boomerang-video',
    group: 'create',
    name: 'Boomerang Video Maker',
    appName: 'Boomerang',
    blurb: 'Turn a short clip into a boomerang: forward, backward, again.',

    searchPhrase: 'Boomerang Video Maker Online',
    title: 'Boomerang Video Maker Online Free | from any video, no upload',
    description: 'Make a boomerang from any video online for free: the first seconds play forward, then backward, looped 1 to 5 times at 1x to 2x speed. Runs in your browser; nothing is uploaded, no watermark.',
    heading: 'Boomerang',
    accent: 'video maker',
    lede: 'Forward, back, again, from a clip you already have. The video stays on your device.',
    featureList: [
      'Forward then backward, with no stall at the turn',
      '1 to 5 loops, 1x, 1.5x or 2x',
      'Uses the first 6 seconds of the clip',
      'Silent MP4, ready for Stories and Reels',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'Which part of the clip is used?',
        a: 'The first 6 seconds. To use another moment, cut it out first with Video Trimmer.',
      },
      {
        q: 'Why is there no sound?',
        a: 'Sound played backwards is noise; boomerangs are silent. Add a song afterwards with Add Music to Video.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser decodes and encodes it.',
      },
    ],

    summary: 'Forward-then-backward loop (boomerang) from the first 6 s of a clip, in the browser.',
    facts: ['A seamless boomerang skips the two turnaround frames, so the motion never pauses.'],
    agentJob: 'Making a boomerang from a video, locally',
  },
  {
    // 20 Nov 2026: «add progress bar to video», «video progress bar overlay».
    slug: 'video-progress-bar',
    group: 'create',
    name: 'Add Progress Bar to Video',
    appName: 'Progress Bar',
    blurb: 'A thin bar along the edge that fills as the video plays.',

    searchPhrase: 'Add Progress Bar to Video Online',
    title: 'Add Progress Bar to Video Online Free | for Shorts, Reels, TikTok',
    description: 'Add a progress bar to a video online for free: a thin bar along the top or bottom edge that fills as it plays, in white, red, yellow, green or blue. Keeps viewers watching to the end. Runs in your browser; nothing is uploaded.',
    heading: 'Progress bar',
    accent: 'for video',
    lede: 'Show how much is left, so people stay to the end. The video stays on your device.',
    featureList: [
      'A bar that fills from left to right over the whole video',
      'Top or bottom edge, five colours, a dark track behind it',
      'Sound and size kept',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'Why add one when the player has its own?',
        a: 'Short-video players hide theirs. A bar in the picture tells a viewer the clip is nearly over, which is when most of them swipe away.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser redraws the frames and encodes the result.',
      },
    ],

    summary: 'A progress bar drawn into the video (top or bottom, five colours), sound kept, in the browser.',
    facts: ['The bar is about 0.8% of the short edge: 9 px on a 1080x1920 video.'],
    agentJob: 'Adding a progress bar to a video, locally',
  },
  {
    // 20 Nov 2026: «remove part of video», «cut out middle of video», «вырезать кусок из видео».
    slug: 'cut-part-of-video',
    group: 'everyday',
    name: 'Remove Part of a Video',
    appName: 'Cut Out a Part',
    blurb: 'Take a section out of the middle of a video; the rest joins up.',

    searchPhrase: 'Remove Part of a Video Online',
    title: 'Remove Part of a Video Online Free | cut out the middle, no upload',
    description: 'Cut a section out of the middle of a video online for free: mark where it starts and ends while watching, and the parts before and after are joined, picture and sound together. Runs in your browser; nothing is uploaded.',
    heading: 'Remove part',
    accent: 'of a video',
    lede: 'Mark the bit you do not want; the rest is joined. The video stays on your device.',
    featureList: [
      'Mark the start and end while watching, or type the times',
      'The parts before and after are joined, frame-accurate',
      'Sound cut with the picture, no click at the join',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'How is this different from trimming?',
        a: 'Video Trimmer keeps one part and drops both ends. This drops one part and keeps both ends.',
      },
      {
        q: 'Can I remove several parts?',
        a: 'Run it again on the saved file for each part, or let Remove Silence take out every pause at once.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser decodes it and joins the two parts.',
      },
    ],

    summary: 'Cut one section out of a video and join the rest, frame-accurate, in the browser.',
    facts: ['Times can be typed as 75, 1:15 or 0:01:15.'],
    agentJob: 'Cutting a section out of a video, locally',
  },
  {
    // 20 Nov 2026: «video collage maker», «put 4 videos in one screen», «коллаж из видео».
    slug: 'video-collage',
    group: 'create',
    name: 'Video Collage Maker',
    appName: 'Video Collage',
    blurb: 'Two to four videos in one frame, in a grid, playing together.',

    searchPhrase: 'Video Collage Maker Online',
    title: 'Video Collage Maker Online Free | 2 to 4 videos in one frame',
    description: 'Make a video collage online for free: two to four clips in one 16:9 frame, in a grid, playing together, with the sound of the first. Runs in your browser; nothing is uploaded, no watermark.',
    heading: 'Video collage',
    accent: 'maker',
    lede: 'Several moments in one frame. The videos stay on your device.',
    featureList: [
      '2, 3 or 4 clips in a 1920x1080 grid (three: one large, two small)',
      'Each clip fills its cell, cropped to cover, never stretched',
      'Sound from the first clip',
      'As long as the shortest clip',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'Which clip gets the big cell with three?',
        a: 'The first one you chose. Choose them again in another order to change it.',
      },
      {
        q: 'Are the videos uploaded?',
        a: 'No. Your browser decodes all of them, draws them into one frame and encodes the result.',
      },
    ],

    summary: '2–4 videos in a 1920x1080 grid, playing together, sound from the first, in the browser.',
    facts: ['For two clips side by side, stacked or picture-in-picture, Split Screen has more choices.'],
    agentJob: 'Making a collage of several videos, locally',
  },
  {
    // 20 Nov 2026: «normalize audio online», «make audio louder without clipping», «нормализовать звук».
    slug: 'normalize-audio',
    group: 'audio',
    name: 'Normalize Audio',
    appName: 'Normalize Audio',
    blurb: 'Bring a recording to a standard loudness, or as loud as it goes without clipping.',

    searchPhrase: 'Normalize Audio Online',
    title: 'Normalize Audio Online Free | louder without clipping, MP3 or WAV',
    description: 'Normalize an audio file online for free: bring a voice note, podcast or song to a standard loudness (-16 dB) or to the loudest it can be without clipping, saved as MP3 or WAV. Runs in your browser; nothing is uploaded.',
    heading: 'Normalize',
    accent: 'audio',
    lede: 'One level for every recording. The file stays on your device.',
    featureList: [
      'Standard loudness (-16 dB RMS) or peak to -1 dB',
      'Never clips: the gain stops at the peak ceiling',
      'Tells you how many dB it changed',
      'MP3 or WAV out; the sound of a video works too',
      'Nothing uploaded',
    ],
    faq: [
      {
        q: 'Why did it not get louder?',
        a: 'Its loudest moment is already near the top; raising it further would clip. A compressor would be needed, which this does not do.',
      },
      {
        q: 'Is the file uploaded?',
        a: 'No. Your browser measures and re-encodes it.',
      },
    ],

    summary: 'Normalize audio to -16 dB RMS or a -1 dB peak, never clipping, MP3/WAV, in the browser.',
    facts: ['Loudness mode stops at the -1 dB peak ceiling, so a spiky recording may stay below -16 dB.'],
    agentJob: 'Normalizing the loudness of a recording, locally',
  },
  {
    // 20 Nov 2026: «add border to video», «video frame border», «рамка для видео».
    slug: 'add-border-to-video',
    group: 'create',
    name: 'Add Border to Video',
    appName: 'Video Border',
    blurb: 'A coloured border around the video, the picture kept whole inside it.',

    searchPhrase: 'Add Border to Video Online',
    title: 'Add Border to Video Online Free | white or coloured frame, no upload',
    description: 'Add a border to a video online for free: a white, black or coloured frame, thin, medium or thick, with the whole picture kept inside. Size and sound stay the same. Runs in your browser; nothing is uploaded.',
    heading: 'Add a border',
    accent: 'to video',
    lede: 'A clean frame around the picture. The video stays on your device.',
    featureList: [
      'Six colours, three thicknesses',
      'The whole picture kept, scaled inside the frame',
      'Same size and sound as the original',
      'Nothing uploaded, no watermark',
    ],
    faq: [
      {
        q: 'Is anything cut off?',
        a: 'No. The picture is scaled down to fit inside the border, so every edge stays visible.',
      },
      {
        q: 'Is the video uploaded?',
        a: 'No. Your browser redraws the frames and encodes the result.',
      },
    ],

    summary: 'A coloured border (2–9% of the short edge) around a video, picture kept whole, in the browser.',
    facts: ['A medium border is 5% of the short edge: 54 px on a 1080x1920 video.'],
    agentJob: 'Adding a border to a video, locally',
  },
  {
    slug: 'tap-tempo',
    group: 'audio',
    name: 'Tap Tempo',
    appName: 'Tap Tempo BPM Counter',
    blurb: 'Tap along to any song and read its BPM, no file needed.',

    searchPhrase: 'Tap Tempo Online',
    title: 'Tap Tempo Online Free | tap BPM counter, no file needed',
    description: 'Tap tempo online for free: tap the space bar or the button along to a song and read its BPM. The median of your taps, so one sloppy tap does not move it. Nothing to upload.',
    heading: 'Tap',
    accent: 'tempo',
    lede: 'Tap along to the beat. The BPM settles after a few taps.',
    featureList: [
      'Space bar, Enter or the button',
      'Median of the last 12 taps: one late tap does not move it',
      'A two-second pause starts over',
      'Works offline, nothing uploaded',
    ],
    faq: [
      { q: 'How many taps do I need?', a: 'Three give a first number; eight to twelve make it steady.' },
      { q: 'I have the audio file. Can it find the BPM itself?', a: 'Yes: the BPM finder on this site reads the file and marks every beat.' },
    ],

    summary: 'Tap tempo: BPM from the median gap of the last 12 taps; a pause over 2 s resets. In the browser.',
    facts: ['Median of the last 12 tap gaps; one tap 150 ms late moves the result by less than 1 BPM at 100 BPM.'],
    agentJob: 'Counting a song’s tempo by tapping',
  },
  {
    slug: 'auto-montage',
    group: 'create',
    name: 'Auto Montage to the Beat',
    appName: 'Life2Film Auto Montage',
    blurb: 'Clips and a song in; the best moments cut to the beat out. The Life2Film engine, in your browser.',

    searchPhrase: 'Auto Edit Video to the Beat Online',
    title: 'Auto Edit Video to the Beat Online Free | clips + song, no upload',
    description: 'Automatic video editor online, free: drop up to 10 clips and a song, get the best moments cut on the beats of the music. The same engine as the Life2Film app, running in your browser; nothing is uploaded.',
    heading: 'Auto montage',
    accent: 'to the beat',
    lede: 'Your clips and a song. The engine watches every clip, finds the beats and cuts the best moments onto them.',
    featureList: [
      'Up to 10 clips and one song, 15 s, 30 s or 1 min',
      'Every clip scored frame by frame: sharpness, exposure, colour, composition',
      'Cuts land on the beats the engine finds in the song',
      '9:16 or 16:9, picked from your clips; nothing uploaded, no watermark',
    ],
    faq: [
      { q: 'How does it choose the moments?', a: 'It scores two frames a second of every clip (sharpness, exposure, colour, composition, noise), keeps the best two-second stretches and places them on the beats of your song, the same way the Life2Film app does on an iPhone.' },
      { q: 'Is my video uploaded?', a: 'No. The engine is WebAssembly that runs in this tab; the clips and the song never leave your device.' },
      { q: 'How is this different from adding music to a video?', a: 'Adding music lays a track under the footage you already cut. This makes the cut: it chooses which moments to keep and where each one starts, so the edit follows the music.' },
      { q: 'Can I get a longer film or 4K?', a: 'The browser version makes up to a minute in 720p. The Life2Film app for iPhone and Mac makes full-length films in 4K, with titles and photos.' },
    ],

    summary: 'Automatic montage in the browser: up to 10 clips + a song -> best 2 s moments (frame scores at 2 fps) cut on the song’s beats by the Life2Film planner (music-video profile), 720p MP4.',
    facts: ['Frames are scored at 2 fps on a 160 px picture; segments are 2 s; output 720p at 30 fps, the song faded over its last 1.5 s.'],
    agentJob: 'Making a beat-synced montage from clips and a song, locally',
  },
];
