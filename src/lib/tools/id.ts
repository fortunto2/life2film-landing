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
    title: 'Bagi Video Online Gratis — jadi Reels dan Shorts, dipotong di pergantian adegan',
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
