import type { ToolTranslations } from '../tools-i18n';

/** Indonesian. Searches carry "online" and "gratis". */
export const id: ToolTranslations = {
  'video-compressor': {
    searchPhrase: 'Kompres video online',
    title: 'Kompres Video Online Gratis — jadi 10MB untuk Discord, 25MB untuk email',
    description:
      'Pengompres video online gratis yang mengenai ukuran persis: 10 MB untuk Discord, 16 MB untuk WhatsApp, 25 MB untuk email. Berjalan di peramban Anda: tanpa unggah, tanpa batas ukuran, tanpa watermark dan tanpa pendaftaran.',
    heading: 'Kompres',
    accent: 'Video',
    lede: 'Bidik sebuah ukuran — 10 MB untuk Discord, 25 MB untuk email — atau cukup turunkan kualitasnya. Berjalan di mesin Anda, jadi tidak ada batas ukuran maupun antrean.',
    blurb: 'Perkecil berkas dan lihat persis apa harganya. Tanpa batas, karena memang tidak ada server.',
    featureList: [
      'Membidik ukuran berkas yang persis',
      'Prasetel untuk batas Discord, WhatsApp dan email',
      'Perkiraan ukuran sebelum pengodean',
      'Lintasan kedua memperbaiki meleset',
      'Semua di peramban — tanpa unggah dan tanpa watermark',
    ],
    faq: [
      {
        q: 'Benarkah bisa mengenai ukuran persis?',
        a: 'Untuk itulah mode «pas ke sebuah ukuran» dibuat. Bobot berkas adalah bitrate dikali durasi, jadi begitu durasinya diketahui, bitrate yang dibutuhkan tinggal aritmetika. Pengode tidak menuruti bitrate yang diminta dengan tepat — kendali laju bergeser mengikuti materi — sehingga bila lintasan pertama meleset lebih dari beberapa persen, selisihnya diukur dan berkas dikodekan ulang sekali dengan angka yang sudah dikoreksi. Dalam praktik hasilnya berada beberapa persen dari sasaran.',
      },
      {
        q: 'Mengapa 10 MB, 16 MB, 25 MB?',
        a: 'Itu tembok yang benar-benar orang tabrak: 10 MB batas unggah gratis Discord, 16 MB WhatsApp, 25 MB Gmail dan sebagian besar server surel, dan 50 MB Discord Nitro Basic. Alat ini membidik tepat di bawah batas, bukan pas di batas, karena berkas 10,0 MB tetap ditolak oleh batas 10 MB.',
      },
      {
        q: 'Bagaimana kalau sasarannya mustahil?',
        a: 'Ia mengatakannya sebelum mulai, dan menyebut ukuran terkecil yang jujur untuk video itu. Memeras satu jam rekaman ke 10 MB menuntut bitrate yang tidak sanggup ditanggung resolusi mana pun: alat yang menghasilkan berkas tak tertonton lalu menyebutnya berhasil lebih buruk daripada alat yang menolak.',
      },
      {
        q: 'Seberapa kecil berkas saya nanti?',
        a: 'Perkiraan muncul sebelum Anda menekan apa pun, dari pengaturan dan durasinya. Rekaman langsung dari ponsel atau kamera biasanya direkam jauh di atas kebutuhannya, dan penyusutan 60–90% adalah hal lumrah. Yang sudah pernah dikompres tidak punya banyak sisa, dan alat ini membandingkan berkas Anda dengan yang wajar dibutuhkan resolusinya, lalu memperingatkan bila pengodean ulang justru membesarkannya.',
      },
      {
        q: 'Apa yang sebenarnya mengecilkan video?',
        a: 'Lebih sedikit piksel dan lebih sedikit bit per piksel. Resolusi adalah tuas kasar yang bisa diandalkan: turun dari 4K ke 1080p membuang tiga perempat piksel bahkan sebelum kualitas dibicarakan. Bitrate lalu menentukan seberapa banyak detail yang bertahan. Membuang audio hanya menolong sedikit; ia jarang lebih dari beberapa persen sebuah berkas video.',
      },
      {
        q: 'Apakah diunggah ke suatu tempat?',
        a: 'Tidak. Semuanya berjalan dengan WebCodecs di peramban Anda, dan itulah yang membuatnya masuk akal: mengunggah satu gigabyte agar server mengembalikan 200 MB lebih lambat daripada mengerjakannya secara lokal, dan sepanjang jalan rekaman Anda mendarat di cakram orang lain. Tanpa batas ukuran, tanpa antrean, tanpa watermark — sebab tidak ada server yang memberlakukannya.',
      },
    ],
  },

  'video-trimmer': {
    searchPhrase: 'Potong video online',
    title: 'Potong Video Online Gratis — tanpa pengodean ulang, tanpa turun kualitas',
    description:
      'Pemotong video online gratis yang mempertahankan kualitas asli: gambarnya disalin, bukan dikodekan ulang. Berjalan di peramban Anda — tanpa unggah, tanpa watermark dan tanpa pendaftaran.',
    heading: 'Potong',
    accent: 'Video',
    lede: 'Seret pegangan ke bagian yang Anda mau lalu simpan — gambarnya disalin utuh, tidak ada yang hilang. Berkas Anda tidak pernah meninggalkan mesin Anda.',
    blurb: 'Seret pegangan ke bagian yang Anda mau, lihat pratinjaunya, simpan. Audio tetap selaras.',
    featureList: [
      'Pemotongan tanpa kehilangan — menyalin video tanpa mengode ulang',
      'Pengodean ulang setepat bingkai bila titik potong penting',
      'Memotong agar pas ke ukuran berkas tertentu',
      'Pratinjau langsung dari pilihan',
      'Semua di peramban — tanpa unggah dan tanpa watermark',
    ],
    faq: [
      {
        q: 'Apakah memotong menurunkan kualitas?',
        a: 'Pada mode bawaan, tidak. «Kualitas sama — tanpa pengodean ulang» melewatkan gambar apa adanya, jadi tidak ada kehilangan generasi dan selesainya beberapa kali lebih cepat: 0,20 detik berbanding 0,60 detik untuk tiga detik yang sama. Harganya adalah ukuran: video dikompres dalam kelompok yang dimulai dari bingkai kunci, sehingga bila titik masuk Anda jatuh di tengah kelompok, berkas ikut membawa bingkai sampai ke kunci sebelumnya. Pemutaran tetap mulai persis di tempat yang Anda tandai, tetapi berkasnya bisa lebih besar daripada hasil pengodean ulang untuk rentang yang sama.',
      },
      {
        q: 'Kapan sebaiknya mengode ulang?',
        a: 'Ketika Anda ingin berkas sekecil mungkin, atau format yang berbeda. Saat mengode ulang, hanya bingkai yang Anda pilih yang ditulis, jadi potongan di tengah kelompok keluar jauh lebih ringan: dalam pengujian, 4,1 MB berbanding 6,7 MB untuk tiga detik yang sama. Harganya satu generasi kompresi, yang pada kualitas di sini tidak terlihat.',
      },
      {
        q: 'Bisakah memotong sesuai ukuran tertentu?',
        a: 'Bisa — pilih «pas ke sebuah ukuran» lalu tentukan batas, misalnya 10 MB untuk Discord atau 25 MB untuk email. Bitrate yang dibutuhkan mengikuti panjang pilihan Anda, jadi pilihan yang lebih pendek memuat lebih banyak kualitas dalam batas yang sama. Bila lintasan pertama meleset, ada koreksi dan satu pengulangan.',
      },
      {
        q: 'Apakah audionya disimpan?',
        a: 'Ya, selaras dan dipotong pada rentang yang sama. Anda bisa membuangnya dengan sengaja lewat kotak «hapus audio» — berguna ketika klip akan dibawa ke tempat yang tidak memerlukan suara, dan berkasnya pun jadi lebih kecil.',
      },
      {
        q: 'Berkas apa saja yang bisa?',
        a: 'MP4 dan MOV dengan H.264, serta WebM — apa pun yang bisa peramban Anda dekode sekaligus kodekan. Format asli kamera seperti ProRes atau raw biasanya tidak bisa dibuka peramban sama sekali; buat berkas proksi lebih dulu.',
      },
    ],
  },

  'video-to-mp3': {
    searchPhrase: 'Konverter video ke MP3',
    title: 'Video ke MP3 — konverter online gratis, tanpa unggah',
    description:
      'Konverter video ke MP3 online dan gratis. Ekstrak audio dari MP4, MOV atau WebM menjadi MP3, WAV atau OGG sepenuhnya di peramban Anda: tanpa unggah, tanpa batas ukuran, tanpa watermark dan tanpa pendaftaran.',
    heading: 'Video ke',
    accent: 'MP3',
    lede: 'Ambil suara dari sebuah video dan simpan sebagai MP3, WAV atau OGG. Tidak ada yang diunggah — konversinya terjadi di mesin Anda.',
    blurb: 'Ambil audio dari sebuah video dan simpan sebagai MP3, WAV atau OGG.',
    featureList: [
      'Mengekstrak audio dari MP4, MOV dan WebM',
      'Keluaran MP3, WAV dan OGG',
      'Pilihan bitrate dan mono',
      'Semua di peramban — tanpa unggah dan tanpa watermark',
    ],
    faq: [
      {
        q: 'Apakah video saya diunggah?',
        a: 'Tidak. Peramban mendekode berkasnya dan mengodekan audionya secara lokal, jadi tidak ada yang keluar. Di sini hal itu lebih penting daripada pada konversi lain: alasan orang mengambil audio dari video biasanya karena videonya bersifat pribadi — kuliah, wawancara, rekaman Anda sendiri — dan itu tidak perlu singgah di server siapa pun untuk menjawab hal yang bisa dijawab laptop Anda sendiri.',
      },
      {
        q: 'Format mana yang sebaiknya dipilih?',
        a: 'MP3 kalau akan dibawa ke mana pun: semua alat memutarnya, dan pada 192 kbps ia transparan untuk suara dan nyaris untuk musik. WAV kalau audionya masuk ke penyunting atau alat transkripsi, sebab tidak terkompres dan tidak kehilangan apa pun. OGG (Vorbis) lebih kecil daripada MP3 pada kualitas sama, tetapi kurang didukung di luar peramban dan Android.',
      },
      {
        q: 'Bitrate berapa yang saya perlukan?',
        a: 'Untuk suara, 96–128 kbps sudah lebih dari cukup dan memangkas berkas jadi separuh dari nilai bawaan. Untuk musik, 192 kbps titik manis yang lazim dan 320 adalah maksimum MP3. Meminta lebih tinggi daripada saat sumbernya direkam tidak menghasilkan apa-apa: mengubah podcast 128 kbps ke 320 kbps menghasilkan berkas dua setengah kali lebih besar yang terdengar sama persis.',
      },
      {
        q: 'Kenapa berkas WAV saya sebesar itu?',
        a: 'Karena tidak terkompres — sekitar 10 MB per menit dalam stereo 44,1 kHz, apa pun isinya. Justru itu tujuannya: tidak ada yang dibuang. Bila ukurannya jadi masalah dan audionya tidak masuk penyunting, MP3 memakan seperdua puluhnya dan Anda tidak akan mendengar bedanya.',
      },
      {
        q: 'Bisakah mengonversi sebagian videonya saja?',
        a: 'Di halaman ini tidak — ia mengonversi seluruh berkas. Potong dulu videonya dengan alat pemotong lalu konversikan hasilnya, atau konversikan semuanya lalu potong audionya di tempat Anda membawanya.',
      },
    ],
  },

  'remove-audio-from-video': {
    searchPhrase: 'Hapus audio dari video online',
    title: 'Hapus Audio dari Video Online Gratis — tanpa encode ulang',
    description:
      'Hapus suara dari video secara online dan gratis: trek audio dibuang dan gambar disalin tanpa encode ulang, kualitas tetap sama. Semua di browser, tanpa unggah dan tanpa watermark.',
    heading: 'Hapus audio',
    accent: 'dari video',
    lede: 'Buang trek suara dan biarkan gambar apa adanya. Tidak ada yang diunggah atau di-encode ulang.',
    blurb: 'Video tanpa suara: trek dibuang, gambar disalin tanpa kehilangan kualitas.',
    featureList: [
      'Menghapus audio dari MP4, MOV, dan WebM',
      'Menyalin gambar tanpa encode ulang: kualitas sama, dalam hitungan detik',
      'Semua di browser: tanpa unggah, tanpa watermark, tanpa batas ukuran',
    ],
    faq: [
      {
        q: 'Apakah kualitas video turun?',
        a: 'Tidak. Gambar dipindahkan ke file baru bingkai demi bingkai; hanya trek suaranya yang ditinggalkan. Jika browser tidak bisa menyalin codec itu ke kontainer, alat ini meng-encode ulang gambar dan memberi tahu Anda.',
      },
      {
        q: 'Apakah video saya diunggah?',
        a: 'Tidak. Browser Anda membaca dan menulis file lewat WebCodecs; tidak ada yang keluar dari perangkat. Karena itu tidak ada batas ukuran selain memori browser.',
      },
      {
        q: 'Bisakah audionya disimpan terpisah?',
        a: 'Bisa, dengan alat video ke MP3 di situs ini: kebalikannya, menyimpan suara dan membuang gambar.',
      },
    ],
  },
  'rotate-video': {
    searchPhrase: 'Putar video online',
    title: 'Putar Video Online Gratis — 90° atau balik, tanpa encode ulang',
    description:
      'Putar video 90°, 180° atau 270°, atau balik, secara online dan gratis. Putaran disimpan di file tanpa encode ulang, kualitas sama; atau gambar ke dalam frame untuk pemutar yang mengabaikan rotasi. Di browser, tanpa unggah.',
    heading: 'Putar',
    accent: 'video',
    lede: 'Luruskan video yang terekam miring dalam hitungan detik. Tidak ada yang diunggah dan, secara bawaan, tidak di-encode ulang.',
    blurb: 'Putar video yang miring atau balik, tanpa encode ulang.',
    featureList: [
      'Putar 90° ke kanan, 90° ke kiri atau 180°, dan balik horizontal',
      'Tanpa kehilangan kualitas: putaran disimpan di file, frame disalin',
      'Opsional: gambar putaran ke frame untuk pemutar yang mengabaikannya',
    ],
    faq: [
      {
        q: 'Apakah memutar menurunkan kualitas?',
        a: 'Secara bawaan tidak. File video punya penanda rotasi yang dibaca pemutar: alat ini mengaturnya dan menyalin frame apa adanya. Jika Anda mencentang «gambar ke frame», gambar di-encode ulang dan sedikit kehilangan kualitas sekali.',
      },
      {
        q: 'Kenapa di aplikasi tertentu masih miring?',
        a: 'Beberapa pemutar dan formulir unggah mengabaikan penanda rotasi. Untuk itu, putar lagi dengan «gambar ke frame» dicentang.',
      },
      {
        q: 'Apakah video saya diunggah?',
        a: 'Tidak. Browser Anda membaca dan menulis file lewat WebCodecs; tidak ada yang keluar dari perangkat.',
      },
    ],
  },
  'video-info': {
    searchPhrase: 'Cek bitrate video online',
    title: 'Cek Bitrate Video dan Audio Online Gratis — codec, FPS, resolusi',
    description:
      'Lihat bitrate, codec, frame rate, resolusi, HDR, dan sample rate audio dari file video atau audio, online dan gratis. Dibaca di browser: file tidak diunggah.',
    heading: 'Info',
    accent: 'video',
    lede: 'Jatuhkan file dan lihat isinya: bitrate, codec, FPS, resolusi, audio. Tidak ada yang diunggah.',
    blurb: 'Bitrate, codec, FPS, resolusi, dan detail audio dari file apa pun.',
    featureList: [
      'Bitrate total, video, dan audio',
      'Codec, resolusi, FPS, rotasi, dan HDR',
      'Kanal dan sample rate audio',
      'Semua di browser: tanpa unggah',
    ],
    faq: [
      {
        q: 'Bagaimana bitrate diukur?',
        a: 'Dari file itu sendiri: ukuran paket tiap trek dibagi durasinya, hingga 600 paket. Bitrate total adalah ukuran file dibagi durasi, termasuk kontainer.',
      },
      {
        q: 'Apakah file saya diunggah?',
        a: 'Tidak. Browser hanya membaca bagian yang diperlukan; tidak ada yang keluar dari perangkat.',
      },
    ],
  },
  'crop-video': {
    searchPhrase: 'Crop video online',
    title: 'Crop Video Online Gratis — 9:16 untuk Reels dan TikTok, 1:1, 4:5',
    description:
      'Crop video ke 9:16 untuk Reels, TikTok dan Shorts, atau ke 1:1, 4:5 atau 16:9, online dan gratis. Geser bingkai untuk menyimpan bagian penting. Di browser, tanpa unggah dan tanpa watermark.',
    heading: 'Crop',
    accent: 'video',
    lede: 'Ubah klip horizontal menjadi vertikal atau persegi dan pilih bagian yang tersisa. Tidak ada yang diunggah.',
    blurb: 'Crop video horizontal ke 9:16 untuk Reels, TikTok dan Shorts, atau persegi.',
    featureList: [
      'Format 9:16, 1:1, 4:5 dan 16:9',
      'Geser bingkai agar subjek tetap di dalam',
      'Resolusi asli area yang di-crop tetap terjaga',
      'Semua di browser: tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Bagaimana membuat video horizontal jadi vertikal untuk Reels atau TikTok?',
        a: 'Pilih 9:16, geser bingkai ke bagian yang ingin disimpan, lalu crop. Hasilnya area 9:16 tertinggi dari video dalam ukurannya sendiri; Instagram dan TikTok memperbesarnya ke layar penuh.',
      },
      {
        q: 'Apakah kualitas turun?',
        a: 'Piksel yang tersisa tidak diperbesar, tetapi crop selalu meng-encode ulang gambar, yang sedikit mengurangi kualitas sekali.',
      },
      {
        q: 'Apakah video saya diunggah?',
        a: 'Tidak. Browser mendekode, meng-crop dan meng-encode video lewat WebCodecs; tidak ada yang keluar dari perangkat.',
      },
    ],
  },
  'video-to-gif': {
    searchPhrase: 'Video ke GIF online',
    title: 'Video ke GIF Online Gratis — MP4 ke GIF tanpa unggah dan watermark',
    description:
      'Ubah video menjadi GIF secara online dan gratis: pilih awal, durasi, frame per detik dan lebar. MP4, MOV dan WebM. Dibuat di browser: tidak ada yang diunggah dan tanpa watermark.',
    heading: 'Video',
    accent: 'ke GIF',
    lede: 'Pilih satu momen dan jadikan GIF. Video tetap di perangkat Anda.',
    blurb: 'Beberapa detik video menjadi GIF: awal, durasi, FPS dan lebar.',
    featureList: [
      'MP4, MOV dan WebM ke GIF',
      'Awal, hingga 15 dtk, 10–20 FPS, lebar 320–640 px',
      'Palet per frame: warna tetap bagus',
      'Semua di browser: tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Bagaimana membuat GIF lebih kecil?',
        a: 'Lebih pendek, lebih sempit, dan FPS lebih rendah, urut seperti itu. GIF 4 detik 480 px 15 FPS biasanya 2–6 MB; 320 px 10 FPS sepertiganya.',
      },
      {
        q: 'Apakah video saya diunggah?',
        a: 'Tidak. Browser membaca frame dan menulis GIF sendiri; tidak ada yang keluar dari perangkat.',
      },
    ],
  },
  'add-music-to-video': {
    searchPhrase: 'Tambah musik ke video online',
    title: 'Tambah Musik ke Video Online Gratis — tanpa watermark dan unggah',
    description:
      'Tambahkan musik ke video secara online dan gratis: pilih MP3 atau M4A, detik mulai lagu, dan fade-out. Gambar disalin tanpa encode ulang, lagu dipotong sesuai durasi video. Di browser.',
    heading: 'Tambah musik',
    accent: 'ke video',
    lede: 'Taruh lagu Anda di bawah klip, dipotong pas dan memudar di akhir. Tidak ada yang diunggah.',
    blurb: 'Lagu di bawah video, sesuai durasi dan memudar, tanpa encode ulang gambar.',
    featureList: [
      'Musik dari MP3, M4A, WAV, OGG atau suara video lain',
      'Pilih detik mulai lagu; fade-out 0–4 dtk',
      'Gambar disalin utuh: kualitas sama, cepat',
      'Semua di browser: tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Apakah suara asli video tetap ada?',
        a: 'Tidak: musik menggantikannya.',
      },
      {
        q: 'Bagaimana jika lagu lebih pendek dari video?',
        a: 'Musik diputar sekali dan sisanya hening; alat ini memberi tahu kapan musik habis.',
      },
      {
        q: 'Bisakah memotong video sesuai ketukan lagu?',
        a: 'Tidak di halaman ini: lagu dipasang di bawah satu klip apa adanya. Memotong beberapa klip sesuai ketukan dilakukan aplikasi Life2Film untuk iPhone.',
      },
    ],
  },
  'merge-videos': {
    searchPhrase: 'Gabung video online',
    title: 'Gabung Video Online Gratis — satukan klip MP4 dan MOV tanpa unggah dan watermark',
    description:
      'Gabungkan video secara online dan gratis: satukan dua klip MP4, MOV atau WebM atau lebih menjadi satu file sesuai urutan pilihan Anda. Ukuran berbeda dimasukkan ke satu bingkai. Di browser, tanpa unggah dan watermark.',
    heading: 'Gabung',
    accent: 'video',
    lede: 'Taruh klip berurutan dan dapatkan satu video. Tidak ada yang keluar dari perangkat.',
    blurb: 'Satukan dua video atau lebih menjadi satu file, sesuai urutan.',
    featureList: [
      'Menggabungkan klip MP4, MOV dan WebM berapa pun',
      'Ubah urutan sebelum digabung',
      'Klip berbentuk lain dimasukkan dengan bilah hitam',
      'Klip tanpa suara diisi hening: gambar dan suara tetap sinkron',
      'Semua di browser: tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Bisakah menggabungkan video berbeda ukuran atau dari ponsel berbeda?',
        a: 'Bisa. Setiap frame dimasukkan ke bingkai klip pertama (dengan bilah hitam bila bentuknya beda), lalu film di-encode sekali.',
      },
      {
        q: 'Bisakah memilih bagian terbaik dan memotongnya dengan musik?',
        a: 'Tidak di halaman ini: halaman ini menggabungkan klip utuh. Memilih momen terbaik dan memotongnya dengan lagu dilakukan aplikasi Life2Film untuk iPhone.',
      },
    ],
  },
  'video-speed': {
    searchPhrase: 'Percepat video online',
    title: 'Ubah Kecepatan Video Online Gratis — percepat atau slow motion',
    description:
      'Percepat video (1,25× hingga 8×) atau perlambat (0,25× hingga 0,75×) secara online dan gratis. Pertahankan suara, ikut dipercepat bersama gambar, atau buang. Di browser: tidak ada yang diunggah, tanpa watermark.',
    heading: 'Kecepatan',
    accent: 'video',
    lede: 'Buat video lebih cepat atau lebih lambat dalam beberapa klik. Tidak ada yang keluar dari perangkat.',
    blurb: 'Percepat video hingga 8× atau perlambat hingga 0,25×, dengan atau tanpa suara.',
    featureList: [
      'Dari slow motion 0,25× hingga cepat 8×',
      'Suara dipertahankan dan disesuaikan, atau dibuang',
      'Setiap frame tetap gambarnya: tidak ada yang dicampur atau dibuat-buat',
      'Semua di browser: tanpa unggah dan watermark',
    ],
    faq: [
      {
        q: 'Apakah slow motion jadi halus?',
        a: 'Setiap frame asli ditampilkan lebih lama: klip 30 fps pada 0,5× menjadi 15 fps. Slow motion halus berasal dari video yang direkam 120 atau 240 fps.',
      },
      {
        q: 'Bagaimana dengan suaranya?',
        a: 'Dengan «pertahankan suara», suara ikut lebih cepat atau lambat dan nadanya naik atau turun, seperti kaset.',
      },
    ],
  },
  'screen-recorder': {
    searchPhrase: 'Rekam layar online',
    title: 'Perekam Layar Online Gratis — tanpa instal, tanpa watermark dan batas waktu',
    description:
      'Rekam layar Anda secara online dan gratis: seluruh layar, satu jendela atau tab browser, dengan suara sistem dan mikrofon. Tanpa instal, tanpa watermark, tanpa batas waktu dan tanpa unggah: rekaman disimpan di komputer Anda sebagai MP4 atau WebM.',
    heading: 'Rekam',
    accent: 'layar',
    lede: 'Rekam layar di browser dan dapatkan filenya di komputer. Tidak ada yang diinstal atau diunggah.',
    blurb: 'Rekam layar, jendela atau tab, dengan suara dan mikrofon, langsung ke file.',
    featureList: [
      'Seluruh layar, satu jendela atau tab',
      'Suara tab atau sistem dan mikrofon dalam satu trek',
      'MP4 bila browser mendukung (Chrome, Edge, Safari), selain itu WebM',
      'Tanpa batas waktu dan watermark',
    ],
    faq: [
      {
        q: 'Apakah ada batas waktu atau watermark?',
        a: 'Tidak ada. Rekaman dibuat browser dan disimpan di komputer Anda.',
      },
      {
        q: 'Bisakah merekam suara komputer?',
        a: 'Di Chrome dan Edge bisa: bagikan tab dengan «Bagikan audio tab» atau, di Windows, seluruh layar dengan «Bagikan audio sistem».',
      },
      {
        q: 'Apakah bisa di ponsel?',
        a: 'Tidak. Browser ponsel tidak bisa membagikan layar.',
      },
    ],
  },
  'audio-cutter': {
    searchPhrase: 'Potong MP3 online',
    title: 'Potong MP3 Online Gratis — potong lagu, buat nada dering, tanpa unggah',
    description:
      'Potong MP3, M4A, WAV, OGG atau FLAC secara online dan gratis: dengarkan, tandai awal dan akhir, tambahkan fade lembut, simpan sebagai MP3 atau WAV. Cocok untuk nada dering dan reel. Di browser: tidak ada yang diunggah.',
    heading: 'Potong',
    accent: 'audio',
    lede: 'Dengarkan, tandai awal dan akhir, simpan potongannya. Lagu tidak keluar dari perangkat.',
    blurb: 'Potong bagian lagu untuk nada dering, reel atau editan, dengan fade lembut.',
    featureList: [
      'MP3, M4A, WAV, OGG, FLAC atau suara video',
      'Awal dan akhir dari pemutar',
      'Fade setengah detik di kedua ujung, tanpa bunyi klik',
      'Simpan sebagai MP3 (192 kbps) atau WAV',
    ],
    faq: [
      {
        q: 'Bagaimana membuat nada dering dari lagu?',
        a: 'Potong 20–30 detik dengan fade dan simpan sebagai MP3. Di Android, taruh di folder Ringtones atau pilih di Pengaturan.',
      },
      {
        q: 'Apakah lagu saya diunggah?',
        a: 'Tidak. Browser mendekode dan meng-encode audio sendiri.',
      },
    ],
  },
  'audio-converter': {
    searchPhrase: 'Konverter audio online',
    title: 'Konverter Audio Online Gratis — M4A, WAV, FLAC ke MP3 tanpa unggah',
    description:
      'Konversi audio secara online dan gratis: M4A, WAV, FLAC, OGG, AAC atau suara video ke MP3, WAV atau OGG dengan bitrate pilihan. Di browser, tanpa unggah dan tanpa batas ukuran.',
    heading: 'Konverter',
    accent: 'audio',
    lede: 'Ubah format file audio tanpa mengirimnya ke mana pun.',
    blurb: 'M4A, WAV, FLAC, OGG dan lainnya ke MP3, WAV atau OGG, dengan bitrate pilihan.',
    featureList: [
      'Masukan: M4A, WAV, FLAC, OGG, AAC, MP3 dan video',
      'Keluaran: MP3, WAV atau OGG dengan pilihan bitrate',
      'Semua di browser: tanpa unggah dan batas',
    ],
    faq: [
      {
        q: 'Bagaimana mengonversi M4A ke MP3?',
        a: 'Jatuhkan M4A, pilih MP3 dan bitrate (192 kbps pilihan yang baik), lalu konversi. Memo suara iPhone juga M4A.',
      },
      {
        q: 'Apakah bitrate lebih tinggi membuat suara lebih baik?',
        a: 'Tidak. File tidak mendapatkan kembali detail yang hilang saat dikompresi; hanya jadi lebih besar.',
      },
    ],
  },
  'video-converter': {
    searchPhrase: 'Konverter video online',
    title: 'Konverter Video Online Gratis — MP4, WebM, MOV tanpa unggah',
    description:
      'Konverter video online gratis untuk MP4, WebM dan MOV, atau ekstrak audionya sebagai WAV. Mengonversi di peramban Anda memakai WebCodecs: tanpa unggah, tanpa batas ukuran, tanpa watermark dan tanpa pendaftaran.',
    heading: 'Konverter',
    accent: 'Video',
    lede: 'Ganti format tanpa menyerahkan berkas kepada siapa pun. MP4, WebM, MOV — atau ambil audionya saja.',
    blurb: 'MP4, WebM dan MOV ke segala arah — atau ambil audionya sebagai WAV.',
    featureList: [
      'Konversi antara MP4, WebM dan MOV',
      'Ekstraksi audio sebagai WAV',
      'Pengubahan ukuran opsional saat mengonversi',
      'Semua di peramban — tanpa unggah dan tanpa watermark',
    ],
    faq: [
      {
        q: 'Konversi apa saja yang didukung?',
        a: 'Antara MP4, WebM dan MOV, serta dari semuanya ke audio WAV. Apa yang benar-benar berhasil bergantung pada peramban Anda, sebab dialah yang mengodekan: Chrome dan Edge menjangkau lebih banyak, Safari menangani MP4 dan MOV dengan baik. Alat ini memeriksanya sebelum mulai dan memberi tahu bila suatu kombinasi tidak tersedia, alih-alih gagal di tengah jalan.',
      },
      {
        q: 'Kenapa peramban tidak bisa membuka MOV dari kamera saya?',
        a: 'Berkas .mov adalah wadah, dan yang menentukan adalah kodek di dalamnya. Peramban menangani H.264 dan makin sering HEVC, tetapi bukan ProRes, DNxHD atau format mentah kamera — dan itulah yang biasanya ditulis kamera profesional ke dalam .mov. Yang seperti itu perlu transkode sungguhan lebih dulu dari aplikasi desktop.',
      },
      {
        q: 'Apakah konversi menurunkan kualitas?',
        a: 'Mengganti wadah antara MP4 dan MOV sering bisa dilakukan tanpa menyentuh videonya. Mengganti kodek — ke WebM misalnya — mengharuskan pengodean ulang, dan pengodean ulang selalu ada harganya. Untuk satu generasi biasanya tidak terlihat, dan menumpuk bila Anda mengonversi berkas yang sama berulang kali.',
      },
      {
        q: 'Apakah ada yang diunggah?',
        a: 'Tidak. Konversi memakai WebCodecs di peramban Anda. Itulah maksudnya: mengonversi berkas besar dengan mengunggah, menunggu antrean, lalu mengunduhnya kembali lebih lambat daripada mengerjakannya secara lokal, dan di tengah jalan berkas itu berada di cakram orang asing.',
      },
    ],
  },

  'video-splitter': {
    searchPhrase: 'Membagi video online',
    title: 'Bagi Video Jadi Beberapa Bagian Online Gratis — sama rata atau per adegan',
    description:
      'Pembagi video online gratis yang memotong video panjang menjadi bagian-bagian pada pergantian shot, bukan setiap 30 detik, lalu mengurutkannya berdasarkan kualitas gambar. Pemangkasan 9:16 opsional untuk Reels, Shorts dan TikTok. Tidak ada yang diunggah.',
    heading: 'Bagi',
    accent: 'Video',
    lede: 'Potong video panjang menjadi klip yang dimulai di tempat videonya berubah — bukan setiap tiga puluh detik. Semuanya terjadi di mesin Anda.',
    blurb: 'Potong video panjang menjadi Reels atau Shorts yang dimulai pada pergantian shot, diurutkan menurut kualitas gambar.',
    featureList: [
      'Memotong pada pergantian shot, bukan pada selang tetap',
      'Klip diurutkan menurut kualitas gambar',
      'Pemangkasan 9:16 opsional untuk Reels, Shorts dan TikTok',
      'Semua di peramban — tanpa unggah dan tanpa watermark',
    ],
    faq: [
      {
        q: 'Apa bedanya dengan pembagi video lain?',
        a: 'Kebanyakan memotong setiap N detik, sehingga sebuah klip bisa mulai di tengah kalimat dan berakhir di tengah gerakan. Yang ini mencari potongan yang sudah ada di videonya — pergantian shot — dan menyusun klip dari shot-shot utuh. Anda tetap memilih perkiraan durasinya; batasnya yang jatuh pada perubahan nyata terdekat, bukan pada stopwatch.',
      },
      {
        q: 'Bintang di tiap klip itu apa?',
        a: 'Mesin menilai setiap bingkai contoh dari ketajaman, pencahayaan, kontras, kekayaan warna dan detail, lalu tiap klip mendapat rata-rata berbobot durasi dari shot di dalamnya. Bintangnya relatif terhadap klip terbaik pada video itu, bukan skala mutlak: ia menyarankan ke mana harus melihat lebih dulu, bukan memutuskan apa yang menarik.',
      },
      {
        q: 'Apakah pemangkasan vertikal memotong orang keluar bingkai?',
        a: 'Ia mengambil bagian tengah bingkai, yang benar pada sebagian besar kasus dan salah ketika subjeknya berada di sisi. Di sini belum ada pelacakan wajah, jadi periksa pratinjaunya sebelum diunggah. Bila shot-nya lebar, memangkasnya secara manual biasanya lebih baik.',
      },
      {
        q: 'Apakah videonya diunggah?',
        a: 'Tidak. Peramban mendekodenya, WebAssembly menganalisis bingkainya, dan klipnya dikodekan ulang secara lokal dengan WebCodecs — jalur perangkat keras yang sama yang dipakai peramban Anda untuk memutar video. Tidak ada yang dikirim ke mana pun, dan karena itu pula tidak ada batas paket, antrean atau watermark.',
      },
    ],
  },

  'bpm-detector': {
    searchPhrase: 'Pendeteksi BPM online',
    title: 'Pendeteksi BPM Online Gratis — tempo lagu dan setiap ketukannya',
    description:
      'Pendeteksi BPM online gratis: dapatkan tempo sebuah lagu dan waktu persis setiap ketukan, di peramban Anda. Ekspor kisi ketukannya ke DaVinci Resolve, Premiere, Final Cut atau Audacity. Tidak ada yang diunggah.',
    heading: 'Pendeteksi',
    accent: 'BPM',
    lede: 'Jatuhkan sebuah lagu. Dapatkan temponya dan waktu persis setiap ketukan — dihitung di mesin Anda sendiri, tanpa mengunggah apa pun.',
    blurb: 'Temukan tempo sebuah lagu dan waktu setiap ketukan, lalu kirim kisinya sebagai penanda ke Resolve, Premiere, Final Cut atau Audacity.',
    featureList: [
      'Deteksi tempo (BPM)',
      'Cap waktu setiap ketukan',
      'Semua di peramban — tanpa unggah',
      'Ekspor ke EDL, OTIO, FCPXML, label Audacity, CSV dan JSON',
      'Kode waktu mengikuti frame rate proyek',
    ],
    faq: [
      {
        q: 'Apakah audio saya diunggah?',
        a: 'Tidak. Analisisnya berjalan di dalam peramban Anda sebagai WebAssembly. Berkas dibaca dari cakram ke memori dan tidak pernah keluar lewat jaringan: Anda bisa memeriksanya dengan membuka tab jaringan, atau mencabut koneksi setelah halamannya termuat.',
      },
      {
        q: 'Seberapa akurat?',
        a: 'Ia memakai analisis kekuatan onset dengan pelacakan ketukan berbasis pemrograman dinamis — pendekatan yang sama dengan perkakas music information retrieval yang sudah mapan, dan kode yang sama yang menggerakkan mesin montase Life2Film. Pada musik berdenyut stabil, ia meleset kurang dari satu ketukan. Pada rubato, rekaman langsung tanpa klik, atau materi yang sangat sinkopasi, anggap angkanya sebagai titik awal.',
      },
      {
        q: 'Apa arti «tempo separuh atau ganda»?',
        a: 'Tempo memang ambigu: lagu 140 BPM juga, secara benar, 70 BPM bila dihitung setengah. Pendeteksi memilih yang paling kuat dalam sinyalnya. Bila angkanya terasa meleset tepat dua kali lipat, itulah yang terjadi, dan kedua pembacaan ditampilkan agar Anda mengambil yang Anda perlukan.',
      },
      {
        q: 'Bisakah ketukannya dipakai di penyunting saya?',
        a: 'Untuk itulah ekspornya ada. EDL adalah pilihan untuk DaVinci Resolve atau Premiere: setiap ketukan datang sebagai penanda bernama di lini masa. Final Cut menerima FCPXML. OTIO juga bekerja di Resolve, Avid dan Premiere, dan tepat bila ketukannya menuju sebuah alur produksi alih-alih langsung ke lini masa. Audacity membaca ekspor label, sedangkan CSV atau JSON menutup kebutuhan lembar sebar dan skrip.',
      },
      {
        q: 'Kenapa frame rate penting?',
        a: 'Ketukan jatuh pada pecahan detik; lini masa menghitung bingkai utuh. Setiap penanda dibulatkan ke bingkai terdekat pada proyek tujuannya, jadi kisi yang diekspor pada 25 fps akan meleset sampai 20 md di rangkaian 30 fps. Setel lajunya sesuai proyek Anda dan penanda jatuh persis di tempat ketukannya. Ini tidak memengaruhi CSV maupun JSON, yang juga membawa detik mentahnya.',
      },
    ],
  },

  'scene-detector': {
    searchPhrase: 'Deteksi adegan online',
    title: 'Pendeteksi Adegan Online Gratis — temukan setiap potongan dalam video',
    description:
      'Deteksi adegan online gratis: temukan setiap pergantian shot dalam sebuah video lengkap dengan gambar mini dan kode waktu, lalu ekspor sebagai EDL, OTIO, FCPXML atau CSV. Berjalan di peramban Anda — tidak ada yang diunggah.',
    heading: 'Pendeteksi',
    accent: 'Adegan',
    lede: 'Jatuhkan sebuah video. Dapatkan setiap potongan, dengan gambar mini dan kode waktu untuk tiap shot — ditemukan di mesin Anda sendiri, tanpa mengunggah apa pun.',
    blurb: 'Temukan setiap potongan dalam video dan dapatkan daftar shot dengan gambar mini, kode waktu dan nilai kualitas.',
    featureList: [
      'Deteksi batas shot',
      'Nilai kualitas per shot',
      'Gambar mini untuk setiap shot',
      'Semua di peramban — tanpa unggah',
      'Ekspor ke EDL, OTIO, FCPXML, label Audacity, CSV dan JSON',
    ],
    faq: [
      {
        q: 'Apakah videonya diunggah?',
        a: 'Tidak. Peramban mendekodenya secara lokal, sebuah kanvas membaca pikselnya, dan WebAssembly membandingkannya. Tidak ada yang dikirim ke mana pun: halaman ini tidak punya server tujuan. Karena itu pula tidak ada batas ukuran maupun antrean.',
      },
      {
        q: 'Bagaimana ia menemukan potongannya?',
        a: 'Ia mencuplik bingkai di sepanjang video dan mengamati seberapa besar gambarnya berubah dari satu cuplikan ke cuplikan berikutnya. Sebuah potongan adalah diskontinuitas: warna dan luminansi melompat sekaligus, alih-alih bergeser perlahan seperti pada panning atau transisi. Pendeteksi mencari lompatan itu dan melaporkan batas di antaranya.',
      },
      {
        q: 'Apakah ia menangkap dissolve dan fade?',
        a: 'Sebagian. Potongan tegas tidak ambigu dan ditemukan dengan andal. Dissolve yang lambat, menurut sifatnya, adalah perubahan bertahap — bentuk yang sama dengan gerakan kamera — sehingga bisa dilaporkan sedikit lebih awal, sedikit lebih lambat, atau menyatu dengan tetangganya. Panning cepat juga bisa terbaca sebagai potongan. Anggap hasilnya sebagai daftar shot untuk diperiksa, bukan vonis.',
      },
      {
        q: 'Nilai kualitas di tiap shot itu apa?',
        a: 'Penilaian per bingkai yang sama dengan yang dipakai aplikasi Life2Film untuk memutuskan apa yang disimpan: ketajaman, pencahayaan, kontras, kekayaan warna dan entropi digabung menjadi satu angka. Itu urutan kasar tentang shot mana yang layak dilihat sekali lagi, bukan penilaian tentang apa yang menarik.',
      },
      {
        q: 'Berapa lama prosesnya?',
        a: 'Ia menyusuri video dengan melompat ke tiap titik cuplikan, dan tiap lompatan memakan puluhan milidetik. Klip satu menit selesai dalam beberapa detik. Video panjang dicuplik lebih jarang agar waktu tunggunya tetap wajar: daftar shot-nya tetap akurat sekitar setengah detik.',
      },
    ],
  },
};
