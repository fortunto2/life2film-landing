---
title: "Cara edit video pakai ChatGPT: bisa, lewat Codex di komputermu"
description: "ChatGPT di browser tidak bisa memotong klipmu. Aplikasi desktop ChatGPT dalam mode Codex bisa. Ini cara memasangnya dan apa yang perlu kamu ketik."
date: 2026-11-05
---

Jawaban jujurnya ada dua bagian. ChatGPT di browser atau di ponsel tidak bisa mengedit file video yang ada di komputermu. Ia bisa menulis skrip, teks dan daftar shot. Aplikasi desktop ChatGPT dalam mode Codex, dan alat baris perintah Codex, bisa: keduanya bekerja di folder yang kamu pilih dan menjalankan program seperti ffmpeg. Halaman ini adalah bagian ChatGPT dari [panduan lengkap](/id/guides/edit-video-with-ai-agents/).

Kamu butuh paket ChatGPT yang menyertakan Codex.

## Apa yang bisa dilakukan tiap pilihan

| Pilihan | Memotong klip lokalmu? |
|---|---|
| ChatGPT di browser atau aplikasi ponsel | Tidak. Hanya merencanakan dan menulis |
| Aplikasi desktop ChatGPT, mode Chat atau Work | Hanya kalau kamu mengaktifkan kerja lokal untuk folder itu. Work di browser berjalan di lingkungan cloud |
| Aplikasi desktop ChatGPT, mode Codex | Ya. Membuka folder, menjalankan perintah |
| Codex CLI di terminal | Ya |

"Work locally" bergantung pada pengaturan akun dan workspace-mu, jadi mungkin tidak muncul. Mode Codex adalah jalur yang pasti.

## 1. Pasang aplikasi desktop

Unduh ChatGPT untuk macOS, Windows atau Linux dari OpenAI, buka, lalu masuk. Di pemilih produk, pilih **Codex**. Lalu buka folder klipmu sebagai proyek.

Kalau kamu suka terminal, versi baris perintah dipasang dengan satu baris:

```bash
npm install -g @openai/codex
```

atau `brew install --cask codex` di Mac. Jalankan `codex` dan pilih **Sign in with ChatGPT**.

## 2. Pasang ffmpeg

```bash
brew install ffmpeg
```

Di Windows: `winget install Gyan.FFmpeg`. Atau minta Codex: "pasangkan ffmpeg untukku". Codex meminta persetujuan sebelum menjalankannya.

## 3. Tambah skill

Codex membaca skill dari `.agents/skills` di foldermu atau `~/.agents/skills` di folder home. Pasang dua skill video dari [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Ini butuh [Node.js](https://nodejs.org). Pilih Codex saat ditanya. Cara lain: di Codex ketik `$skill-installer` dan minta ia memasang dua skill itu dari repositori GitHub tersebut. Restart Codex kalau skill belum muncul. Di dalam pesan, panggil skill dengan mengetik `$` lalu namanya. Jangan salin file skill dengan tangan.

## 4. Minta filmnya

> Folder ini berisi 40 klip dari satu hari. Pakai $solo-transcribe untuk semuanya, baca transkripnya dan usulkan cerita dalam lima baris. Tunggu jawabanku sebelum memotong.

Lalu:

> Potong trailer 3 menit dengan cerita itu, dengan music.mp3 di bawahnya, potongan mengikuti beat. Tunjukkan skrip dan contact sheet sebelum kamu render.

Codex mentranskripsi, mencari beat, menulis potongan sebagai skrip, merender dengan ffmpeg dan memeriksa hasilnya. Siap-siap tiga putaran. Potongan pertama jarang yang akhirnya kamu pakai.

## Kelemahan ChatGPT

- Tanpa aplikasi desktop atau Codex, ia tidak punya akses ke klipmu. Jangan tempel video 2 GB ke chat dan berharap dipotongkan.
- Transkripsi di Windows dan Linux berjalan di CPU dan lebih lambat daripada di Mac Apple Silicon.
- Periksa apa yang mau dijalankan Codex sebelum kamu setujui. Itu jaring pengamanmu.

Kalau kamu sudah berlangganan Claude, [Claude Code](/id/guides/edit-video-with-claude-code/) melakukan pekerjaan yang sama. Keduanya membaca skill yang sama.

## Selanjutnya

- Alur umum dan aturan yang mencegah potongan jelek: [Edit video dengan asisten AI](/id/guides/edit-video-with-ai-agents/).
- Cara film-film nyata dipotong: [tulisan di rustman.org](https://rustman.org/wiki/creative-video-agent-cut/).
- Mau aplikasi siap pakai dengan jendela: [Life2Film Studio](/studio/) di Mac.
