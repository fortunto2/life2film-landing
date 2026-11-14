---
title: "Cara edit video dengan AI: Claude Code, ChatGPT dan Codex"
description: "Panduan pemula: pasang asisten AI, tambah dua skill gratis, lalu minta dengan kata biasa agar klipmu dipotong mengikuti beat. Tanpa upload, tanpa timeline."
date: 2026-11-05
---

Kamu bisa edit video otomatis dengan AI, cukup dengan mengobrol. Taruh klipmu di satu folder dan bilang film seperti apa yang kamu mau. Asisten membaca apa yang diucapkan di klip, memilih shot, memotong sesuai musik, lalu membuat file mp4. Kamu menonton, bilang apa yang kurang, dan asisten memperbaikinya.

Panduan ini untuk orang yang belum pernah membuka terminal. Siapkan 30 menit untuk pemasangan pertama. Setelah itu, film baru dimulai dengan satu pesan.

## Ringkasnya

1. Pasang **ffmpeg**, alat gratis yang melakukan pemotongan sebenarnya.
2. Pasang asisten yang bisa bekerja di folder komputermu: [Claude Code](/id/guides/edit-video-with-claude-code/), atau [aplikasi desktop ChatGPT dengan Codex](/id/guides/edit-video-with-chatgpt-codex/).
3. Pasang dua skill gratis: `solo-transcribe` dan `solo-video-edit`.
4. Taruh klipmu di satu folder dan minta dibuatkan film.

## Asisten AI mana yang bisa edit video

Asisten harus bisa menjalankan program di komputermu dan membaca file-mu. Tidak semua chat bisa.

| Alat | Bisa edit klip lokal | Catatan |
|---|---|---|
| Claude Code (terminal atau aplikasi desktop Claude) | Ya | Perlu paket Claude berbayar atau akun API |
| Aplikasi desktop ChatGPT, mode Codex | Ya | Perlu paket ChatGPT. Pilih folder, asisten bekerja di dalamnya |
| Codex CLI | Ya | Sama seperti di atas, tapi di terminal |
| ChatGPT di browser atau di ponsel | Tidak | Bisa menulis skrip, teks dan daftar shot. Tidak bisa menjalankan ffmpeg untuk 40 klip di disk-mu |

Kalau kamu hanya punya chat di browser, pakai itu untuk merencanakan film dan menulis teksnya. Pemotongannya kamu lakukan di salah satu alat di atas.

## Langkah 1. Pasang ffmpeg

Di Mac, dengan [Homebrew](https://brew.sh):

```bash
brew install ffmpeg
```

Di Windows:

```powershell
winget install Gyan.FFmpeg
```

Cek hasilnya: ketik `ffmpeg -version` dan nomor versi akan muncul. Kalau tidak mau mengetik perintah, pasang asisten dulu lalu bilang "pasangkan ffmpeg untukku". Asisten akan menjalankan perintahnya dan meminta izinmu.

## Langkah 2. Pasang asisten

Pilih salah satu. Keduanya dibahas langkah demi langkah di halamannya masing-masing:

- [Claude Code](/id/guides/edit-video-with-claude-code/): satu perintah, lalu `claude` di folder klipmu.
- [Aplikasi desktop ChatGPT dan Codex](/id/guides/edit-video-with-chatgpt-codex/): unduh aplikasinya, pilih Codex, buka folder klipmu.

## Langkah 3. Tambah dua skill

Skill adalah file teks berisi instruksi yang dimuat asisten saat dibutuhkan. Dua skill ini menyimpan aturan editing yang ditulis dari kerja nyata: sembilan hari di Chicago, 40 sampai 70 klip per hari, dipotong jadi trailer dan satu film 55 menit.

- `solo-transcribe` mengubah ucapan di klipmu jadi teks beserta waktunya. Berjalan di komputermu, tidak ada yang diunggah.
- `solo-video-edit` berisi aturan editing dan resep ffmpeg.

Keduanya terbuka untuk umum di [solo-factory di GitHub](https://github.com/fortunto2/solo-factory). Jangan salin dengan tangan. Pasang lewat alat skills, yang butuh [Node.js](https://nodejs.org):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Alat ini akan bertanya untuk asisten mana skill dipasang. Pilih asisten yang kamu pakai. Setelah itu restart asisten supaya skill barunya terbaca.

## Langkah 4. Bilang apa yang kamu mau

Taruh semua klip dari satu hari di satu folder, lalu buka asisten di sana. Tulis seperti kepada editor manusia:

> Hari baru: folder ini berisi 40 klip dari perjalananku ke Lisbon. Transkripsikan semuanya, baca, lalu usulkan ceritanya. Setelah itu potong trailer 3 menit. Pasang lagu music.mp3 di bawahnya dan potong mengikuti beat.

Yang terjadi selanjutnya:

1. **Transkripsi.** Asisten menjalankan `solo-transcribe` pada setiap klip. Di Mac Apple Silicon kecepatannya sekitar empat kali lebih cepat dari waktu nyata. Di Windows atau Linux, prosesnya memakai CPU dan lebih lama.
2. **Membaca satu hari sebagai teks.** Semua ucapan masuk ke satu file sesuai urutan syuting. Asisten membacanya seperti penulis skenario dan mengusulkan cerita. Kamu bisa bilang "bukan, buat yang soal makanan".
3. **Mencari beat.** Asisten mendeteksi tempo dan downbeat lagumu, jadi potongan jatuh tepat di musik. Bagian ini bisa kamu coba sendiri dengan [BPM detector](/id/tools/bpm-detector/) gratis.
4. **Menulis potongan sebagai skrip.** Bukan timeline. Hanya file pendek yang menyebut kalimat mana dari klip mana yang diputar, dan shot mana yang menutupinya. Keluhan seperti "kamu menyebut Bean tapi tidak pernah menunjukkannya" jadi perbaikan satu baris.
5. **Render.** ffmpeg membuat mp4. Asisten memeriksa bahwa durasi, codec dan suara sesuai rencana.

## Siap-siap tiga kali coba

Potongan pertama biasanya membosankan atau sedikit tidak sinkron. Yang ketiga sudah bagus. Itu tetap lebih cepat daripada edit manual, karena bagian yang paling lambat hilang: menonton setiap klip, mencari beat, menyinkronkan subtitle.

Hal berguna yang bisa kamu katakan setelah potongan pertama:

- "Tunjukkan contact sheet dari seluruh film."
- "Cutaway di menit 1:20 tidak cocok dengan yang kuucapkan. Ganti."
- "Buka dengan 8 detik shot terbaik, baru hook-nya."
- "Tambahkan subtitle bahasa Inggris dan Spanyol."
- "Buat versi vertikal 9:16 untuk Reels."

## Aturan yang menyelamatkanmu dari potongan jelek

- Cutaway menunjukkan apa yang sedang dibicarakan. Kalau kamu menyebut jembatan, jembatannya ada di layar.
- Jangan tutup shot saat bibir bergerak. Penonton menganggapnya suara tidak sinkron.
- Pilih sendiri 8 sampai 10 detik pertama. Mesin memilih yang tajam dan berwarna, bukan yang menarik.
- Musik yang terdengar di latar klip bisa memicu klaim hak cipta. Satu hari footage pernah kena 10 klaim. Pasang lagumu sendiri di bawahnya.
- Beri tahu asisten nama orang dan tempat. Pengenalan suara mengubah nama yang tidak dikenal jadi nama selebritas.

## Yang tidak bisa dilakukan

- Tidak membuat footage. Asisten hanya memotong apa yang kamu rekam.
- Tidak memilih cerita untukmu. Asisten mengusulkan, kamu yang memutuskan.
- File besar butuh waktu. Analisis pertama untuk 66 klip memakan sekitar 20 menit.
- Skill ini ditulis untuk orang yang mau mencoba beberapa kali. Kalau kamu mau satu tombol, pakai editor dengan timeline.

## Lebih suka jendela daripada chat?

[Life2Film Studio](/studio/) adalah aplikasi Mac gratis (beta): editor timeline yang Anda pakai bersama asisten. Film dibuka langsung dari file aslinya, asisten mengusulkan potongan di timeline, dan Anda menonton tiap usulan sebelum menerimanya. Untuk alat di browser, lihat [alat gratis](/id/tools/): beat detector, scene detector, trimmer dan lainnya, semua berjalan di browsermu tanpa upload. Untuk developer, mesin analisisnya ada di [halaman Engine](/engine/).

## Detail teknis

Cara film Chicago dipotong, aturan persisnya dan angka di baliknya ada di rustman.org: [Edit video with an AI assistant: a day of footage to a film](https://rustman.org/wiki/creative-video-with-claude/) dan how the cut is written as a script.

## Pertanyaan

**Bisakah ChatGPT edit video?** Chat di browser tidak bisa mengedit file di komputermu. Aplikasi desktop ChatGPT dalam mode Codex bisa, karena bekerja di sebuah folder dan menjalankan perintah. Lihat [halaman ChatGPT dan Codex](/id/guides/edit-video-with-chatgpt-codex/).

**Apakah footage-ku diunggah?** Skill berjalan di komputermu. Asisten sendiri melihat teks transkrip dan perintah yang dijalankannya. Ia tidak butuh file videomu diunggah untuk menjawab.

**Apakah bisa di Windows?** Bisa. Pasang ffmpeg dengan winget. Transkripsi di sana berjalan di CPU.

**Apakah aku harus bisa coding?** Tidak. Kamu mengetik kalimat. Kamu menyetujui perintah yang mau dijalankan.
