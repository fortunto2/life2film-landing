import type { ToolTranslations } from '../tools-i18n';

/** Speech, text, recording and sound tools (20 Nov 2026), apart so id.ts stays under 1000 lines. */
export const idText: ToolTranslations = {
  'auto-subtitles': {
    searchPhrase: 'Pembuat subtitle otomatis online',
    title: 'Subtitle Otomatis Online Gratis — video ke SRT dengan Whisper, tanpa unggah',
    description:
      'Buat subtitle video secara otomatis, online dan gratis: Whisper berjalan di browser dan menulis SRT atau VTT berwaktu, dalam 99 bahasa. Video tidak diunggah; model diunduh sekali.',
    heading: 'Subtitle',
    accent: 'otomatis',
    lede: 'Ubah ucapan menjadi subtitle berwaktu tanpa mengirim video ke mana pun.',
    blurb: 'Ucapan ke SRT atau VTT di browser dengan Whisper, lalu tanamkan sekali klik.',
    featureList: [
      'Whisper base (cepat) atau small (lebih akurat) di tab',
      'Bahasa terdeteksi atau dipilih',
      'SRT dan WebVTT berwaktu, baris mudah dibaca',
      'Video tidak diunggah; model diunduh sekali',
    ],
    faq: [
      {
        q: 'Seberapa akurat?',
        a: 'Ini Whisper ukuran kecil: ucapan jelas hampir bersih; ruang bising, suara tumpang tindih dan nama perlu dicek.',
      },
      {
        q: 'Apakah video saya diunggah?',
        a: 'Tidak. Hanya file model dari internet (Hugging Face); suara ditranskripsi di komputer Anda.',
      },
    ],
  },
  'add-text-to-video': {
    searchPhrase: 'Tambah teks ke video online',
    title: 'Tambah Teks ke Video Online Gratis — tulisan di video, tanpa unggah',
    description:
      'Tambahkan teks ke video secara online dan gratis: ketik tulisan, pilih ukuran dan atas atau bawah, dapatkan MP4 dengan teks di gambar, putih bergaris tepi gelap. Di browser, tanpa unggah.',
    heading: 'Tambah teks ke',
    accent: 'video',
    lede: 'Ketik tulisan dan ia muncul di gambar. Video tetap di perangkat Anda.',
    blurb: 'Tulisan di video, atas atau bawah, terbaca di latar apa pun.',
    featureList: [
      'Satu tulisan untuk seluruh video, hingga 200 karakter',
      'Putih bergaris tepi gelap, terbaca di latar apa pun',
      'Tiga ukuran, atas atau bawah',
      'Semua di browser: tanpa unggah',
    ],
    faq: [
      {
        q: 'Apakah video saya diunggah?',
        a: 'Tidak. Browser menggambar setiap frame dan meng-encode hasilnya.',
      },
    ],
  },
  'voice-recorder': {
    searchPhrase: 'Perekam suara online',
    title: 'Perekam Suara Online Gratis — rekam audio ke MP3 tanpa daftar',
    description:
      'Rekam suara Anda secara online dan gratis: tekan rekam, bicara, berhenti, dan browser menyimpan MP3 atau WAV. Tanpa daftar dan tanpa batas waktu; tidak ada yang diunggah.',
    heading: 'Perekam suara',
    accent: 'online',
    lede: 'Tekan rekam, bicara, dan dapatkan MP3. Suara tidak meninggalkan komputer Anda.',
    blurb: 'Rekam suara dari mikrofon dan simpan sebagai MP3 atau WAV.',
    featureList: [
      'MP3 (192 kbps) atau WAV',
      'Meter level, merah saat clipping',
      'Suara mentah: tanpa peredam bising atau gain otomatis',
      'Tanpa daftar, tanpa batas, tanpa unggah',
    ],
    faq: [
      {
        q: 'Apakah rekaman diunggah?',
        a: 'Tidak. Browser merekam mikrofon dan meng-encode MP3; file langsung ke unduhan.',
      },
      {
        q: 'Browser tidak mendapat mikrofon.',
        a: 'Klik ikon gembok di bilah alamat dan izinkan mikrofon untuk situs ini.',
      },
    ],
  },
  'webcam-recorder': {
    searchPhrase: 'Rekam webcam online',
    title: 'Rekam Video Webcam Online Gratis — tanpa unggah dan watermark',
    description:
      'Rekam video dari webcam secara online dan gratis: nyalakan kamera, tekan rekam, berhenti, dan browser menyimpan video bersuara (MP4 atau WebM). Tanpa daftar, watermark, atau batas; tidak ada yang diunggah.',
    heading: 'Rekam',
    accent: 'webcam',
    lede: 'Lihat diri Anda, tekan rekam, simpan filenya. Tidak ada yang keluar dari komputer.',
    blurb: 'Rekam diri Anda dari webcam dengan suara dan simpan videonya.',
    featureList: [
      'Kamera dan mikrofon, 480p, 720p atau 1080p',
      'MP4 di Safari dan Chrome terbaru, WebM di lainnya',
      'Pratinjau dicerminkan; file disimpan tanpa cermin',
      'Tanpa daftar, tanpa watermark, tanpa unggah',
    ],
    faq: [
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Browser merekam kamera ke memori dan menyimpan file ke unduhan.',
      },
    ],
  },
  'change-key': {
    searchPhrase: 'Ubah nada dasar lagu online',
    title: 'Ubah Nada Dasar Lagu Online Gratis — tempo tetap, tanpa unggah',
    description:
      'Ubah nada dasar lagu secara online dan gratis: naikkan atau turunkan hingga 12 semitone dengan tempo tetap, lalu simpan MP3 atau WAV. Untuk bernyanyi di jangkauan Anda. Di browser, tanpa unggah.',
    heading: 'Ubah nada dasar',
    accent: 'lagu',
    lede: 'Naik atau turun per semitone, tempo sama. Lagu tetap di perangkat Anda.',
    blurb: 'Naikkan atau turunkan lagu per semitone tanpa mengubah tempo.',
    featureList: [
      '−12 hingga +12 semitone',
      'Tempo dan durasi tetap',
      'MP3 atau WAV, dengarkan di halaman',
      'Tidak ada yang diunggah',
    ],
    faq: [
      {
        q: 'Berapa semitone yang saya perlukan?',
        a: 'Satu semitone per langkah: C ke D adalah +2. Cari nada sekarang dengan Pendeteksi nada dasar (/id/tools/key-finder/).',
      },
      {
        q: 'Apakah file diunggah?',
        a: 'Tidak. Browser Anda yang mendekode, menggeser dan meng-encode lagu.',
      },
    ],
  },
  'add-logo-to-video': {
    searchPhrase: 'Tambah logo ke video online',
    title: 'Tambah Logo atau Watermark ke Video Online Gratis — tanpa unggah',
    description:
      'Tambahkan logo atau watermark ke video secara online dan gratis: pilih PNG (transparansi tetap), JPG atau SVG, sudut, ukuran dan opasitas, lalu dapatkan MP4. Di browser, tanpa unggah.',
    heading: 'Tambah logo ke',
    accent: 'video',
    lede: 'Logo Anda di sudut setiap frame. Video tetap di perangkat Anda.',
    blurb: 'Logo atau watermark Anda di sudut video.',
    featureList: [
      'PNG transparan, JPG, WebP atau SVG',
      'Empat sudut atau tengah',
      'Ukuran dan opasitas bisa diatur',
      'Tanpa unggah, tanpa watermark kami',
    ],
    faq: [
      {
        q: 'Apakah latar logo terlihat?',
        a: 'Tidak jika PNG atau SVG transparan. JPG tidak punya transparansi.',
      },
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Browser menggambar logo di setiap frame.',
      },
    ],
  },
  'sped-up-slowed-reverb': {
    searchPhrase: 'Lagu sped up dan slowed + reverb online',
    title: 'Sped Up & Slowed + Reverb Online Gratis — percepat atau perlambat lagu tanpa unggah',
    description:
      'Buat versi sped up atau slowed + reverb dari lagu secara online dan gratis: preset sekali klik, kecepatan 0,5× hingga 2×, reverb dan opsi pertahankan nada. MP3 atau WAV. Di browser, tanpa unggah.',
    heading: 'Sped up &',
    accent: 'slowed + reverb',
    lede: 'Versi TikTok dari sebuah lagu, dibuat di perangkat Anda.',
    blurb: 'Versi sped up atau slowed + reverb dari lagu.',
    featureList: [
      'Preset: sped up 1,25×, slowed 0,8× dengan reverb',
      'Kecepatan apa pun 0,5× hingga 2×',
      'Seperti piringan hitam atau pertahankan nada',
      'MP3 atau WAV, tanpa unggah',
    ],
    faq: [
      {
        q: 'Kenapa versi sped up terdengar lebih tinggi?',
        a: 'Itulah suara sped up: nada naik bersama tempo. Centang «Pertahankan nada» untuk hanya mengubah tempo.',
      },
      {
        q: 'Apakah lagu diunggah?',
        a: 'Tidak. Browser Anda yang memprosesnya.',
      },
    ],
  },
  'remove-background-noise': {
    searchPhrase: 'Hapus bising latar dari audio online',
    title: 'Hapus Bising Latar dari Audio & Video Online Gratis — tanpa unggah',
    description:
      'Hapus bising latar dari rekaman suara atau video secara online dan gratis: kipas, dengung, angin dan lalu lintas dibersihkan dari ucapan oleh RNNoise, jaringan saraf untuk suara yang berjalan di browser. Gambar video tetap; tidak ada yang diunggah.',
    heading: 'Hapus bising',
    accent: 'latar',
    lede: 'Bersihkan bising dari ucapan. File tetap di perangkat Anda.',
    blurb: 'Hapus dengung kipas, angin dan bising ruangan dari ucapan.',
    featureList: [
      'RNNoise (Xiph), peredam bising neural untuk suara',
      'Untuk video dan rekaman',
      'Pengatur kekuatan',
      'Tidak ada yang diunggah',
    ],
    faq: [
      {
        q: 'Bising apa yang dihapus?',
        a: 'Bising tetap di sekitar suara: kipas, AC, dengung, angin, lalu lintas. Bukan untuk musik.',
      },
      {
        q: 'Apakah file saya diunggah?',
        a: 'Tidak. Jaringan berjalan di browser lewat WebAssembly.',
      },
    ],
  },
  'audio-to-video': {
    searchPhrase: 'Ubah audio ke video online',
    title: 'Audio ke Video Online Gratis — MP3 ke MP4 dengan gambar untuk YouTube',
    description:
      'Ubah audio menjadi video secara online dan gratis: MP3, M4A atau WAV plus gambar sampul menjadi MP4 untuk YouTube, Shorts atau Reels, dengan bar level opsional. Di browser, tanpa unggah.',
    heading: 'Audio ke',
    accent: 'video',
    lede: 'Lagu, podcast atau pesan suara, siap untuk YouTube.',
    blurb: 'MP3 ke MP4 untuk YouTube: sampul, suara Anda dan bar yang bergerak.',
    featureList: [
      'Sampul di atas salinan buram, atau latar gelap',
      'Bar level bergerak (opsional)',
      '16:9, 1:1 atau 9:16',
      'Tidak ada yang diunggah',
    ],
    faq: [
      {
        q: 'Kenapa MP3 tidak bisa diunggah ke YouTube?',
        a: 'YouTube hanya menerima video. Ini membungkus suara dalam MP4 bergambar.',
      },
      {
        q: 'Apakah file saya diunggah?',
        a: 'Tidak. Browser yang membuat videonya.',
      },
    ],
  },
  'blur-background-video': {
    searchPhrase: 'Video vertikal dengan latar blur',
    title: 'Jadikan Video Vertikal dengan Latar Blur Online Gratis — 9:16 tanpa potong',
    description:
      'Ubah video horizontal menjadi 9:16 untuk Reels, TikTok dan Shorts (atau 4:5, 1:1) tanpa memotong: seluruh frame tetap di tengah dan salinan blur mengisi pita. Online, gratis, di browser; tanpa unggah.',
    heading: 'Video vertikal dengan',
    accent: 'latar blur',
    lede: 'Tidak ada yang terpotong, tanpa bar hitam.',
    blurb: 'Video horizontal jadi vertikal tanpa dipotong: latar blur mengisi sisanya.',
    featureList: [
      '9:16, 4:5, 1:1 atau 16:9',
      'Seluruh frame, di tengah',
      'Pita diisi salinan blur',
      'Tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Apa bedanya dengan memotong?',
        a: 'Memotong membuang sisi. Ini mempertahankan semuanya dan mengisi ruang dengan blur.',
      },
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Browser yang memprosesnya.',
      },
    ],
  },
  'video-filters': {
    searchPhrase: 'Filter video online',
    title: 'Filter Video Online Gratis — terangkan video gelap, hitam putih, tanpa unggah',
    description:
      'Terapkan filter ke video secara online dan gratis: terangkan video gelap, jadikan hitam putih, cerah, hangat, dingin atau vintage, atau atur kecerahan, kontras, saturasi dan kehangatan dengan pratinjau langsung. Di browser, tanpa unggah.',
    heading: 'Filter',
    accent: 'video',
    lede: 'Lihat hasilnya di klip Anda sebelum menyimpan.',
    blurb: 'Terangkan video gelap, hitam putih, lebih hangat atau cerah, dengan pratinjau.',
    featureList: [
      'Preset: terangkan, hitam putih, cerah, hangat, dingin, vintage',
      'Kecerahan, kontras, saturasi, kehangatan',
      'Pratinjau langsung',
      'Tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Bagaimana menerangkan video yang terlalu gelap?',
        a: 'Tekan «Terangkan» lalu naikkan kecerahan sampai wajah terlihat.',
      },
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Browser Anda yang menerapkan filter.',
      },
    ],
  },
  'split-screen-video': {
    searchPhrase: 'Dua video dalam satu layar online',
    title: 'Split Screen Video Online Gratis — dua video berdampingan, tanpa unggah',
    description:
      'Taruh dua video dalam satu frame secara online dan gratis: berdampingan (16:9) atau atas bawah (9:16 untuk Reels dan TikTok), bersamaan, dengan suara salah satu atau keduanya. Di browser, tanpa unggah.',
    heading: 'Split screen',
    accent: 'video',
    lede: 'Dua klip, satu frame, sinkron.',
    blurb: 'Dua video berdampingan atau atas bawah, diputar bersamaan.',
    featureList: [
      'Berdampingan (1920x1080) atau atas bawah (1080x1920)',
      'Setiap klip mengisi setengahnya tanpa melar',
      'Suara pertama, kedua atau keduanya',
      'Tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Bagaimana jika durasinya berbeda?',
        a: 'Hasilnya sepanjang klip yang lebih pendek.',
      },
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Browser Anda yang memprosesnya.',
      },
    ],
  },
  'tiktok-captions': {
    searchPhrase: 'Caption gaya TikTok',
    title: 'Caption Gaya TikTok Online Gratis — caption besar per kata, tanpa unggah',
    description:
      'Tambahkan caption gaya TikTok dan Reels ke video secara otomatis, online dan gratis: Whisper mendengar ucapan di browser dan menanamkan caption tebal besar, 1–4 kata, di tengah frame. Tanpa unggah, tanpa watermark.',
    heading: 'Caption',
    accent: 'gaya TikTok',
    lede: 'Dari ucapan ke caption besar dalam satu langkah.',
    blurb: 'Caption tebal besar beberapa kata di tengah, dari ucapan.',
    featureList: [
      'Waktu per kata dari Whisper, 1–4 kata',
      'Putih tebal bergaris tepi, di tengah',
      '99 bahasa',
      'Tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Bisakah memperbaiki kata yang salah dengar?',
        a: 'Tidak di sini. Untuk kontrol, buat SRT dengan Subtitle otomatis, perbaiki, lalu tanamkan.',
      },
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Semuanya di browser.',
      },
    ],
  },
  'fade-video': {
    searchPhrase: 'Fade in dan fade out video online',
    title: 'Fade Video Online Gratis — muncul dan hilang ke hitam, tanpa unggah',
    description:
      'Tambahkan fade in dari hitam dan fade out ke hitam pada video secara online dan gratis, suaranya ikut memudar. 0,5 sampai 3 detik tiap ujung. Di browser, tanpa unggah.',
    heading: 'Fade in, fade out',
    accent: 'video',
    lede: 'Awal yang lembut dan akhir yang bersih.',
    blurb: 'Fade dari hitam dan ke hitam, suara ikut memudar.',
    featureList: [
      'Fade 0,5–3 detik tiap ujung',
      'Suara memudar bersama gambar',
      'Tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Apakah suara ikut memudar?',
        a: 'Ya, dalam detik yang sama.',
      },
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Browser Anda yang memprosesnya.',
      },
    ],
  },
  'resize-video': {
    searchPhrase: 'Ubah resolusi video online',
    title: 'Ubah Ukuran Video Online Gratis — 4K ke 1080p, 720p, tanpa unggah',
    description:
      'Ubah resolusi video secara online dan gratis: 4K ke 1080p, 1080p ke 720p, 480p atau 360p, vertikal atau horizontal, bentuk tetap. Di browser, tanpa unggah.',
    heading: 'Ubah ukuran',
    accent: 'video',
    lede: 'Resolusi lebih kecil dalam satu langkah.',
    blurb: 'Ubah resolusi: 4K ke 1080p, 1080p ke 720p…',
    featureList: [
      'Dari 2160p sampai 360p',
      'Vertikal atau horizontal, bentuk tetap',
      'Tidak pernah diperbesar',
      'Tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Apa arti 720p untuk video vertikal?',
        a: '720x1280: yang dipilih sisi panjangnya.',
      },
      {
        q: 'Apakah video diunggah?',
        a: 'Tidak. Browser Anda yang memprosesnya.',
      },
    ],
  },
};
