---
title: "Cara edit video dengan Claude Code, langkah demi langkah"
description: "Pasang Claude Code, tambah skill editing video, lalu buat film dari satu folder klip lewat chat. Ditulis untuk orang yang belum pernah memakai terminal."
date: 2026-11-05
---

Claude Code adalah asisten dari Anthropic yang bekerja di dalam folder komputermu. Ia bisa membaca file, menjalankan program seperti ffmpeg, dan menulis skrip. Itu yang dibutuhkan untuk edit video. Halaman ini adalah bagian Claude Code dari [panduan lengkap](/id/guides/edit-video-with-ai-agents/).

Kamu butuh paket Claude berbayar atau akun API Anthropic. Claude Code berjalan di macOS 13 atau lebih baru, Windows 10 atau lebih baru, dan Linux, dengan RAM 4 GB atau lebih.

## 1. Buka terminal

- **Mac:** tekan Cmd+Space, ketik "Terminal", tekan Enter.
- **Windows:** tekan tombol Windows, ketik "PowerShell", tekan Enter.

Anthropic juga punya [panduan terminal](https://code.claude.com/docs/en/terminal-guide) untuk pemula. Tidak mau pakai terminal? Ada [aplikasi desktop Claude](https://code.claude.com/docs/en/desktop-quickstart.md) dengan Claude Code di dalamnya. Langkah untuk skill di bawah tetap berlaku.

## 2. Pasang Claude Code

Mac, Linux atau WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Atau lewat package manager: `brew install --cask claude-code` di Mac, `winget install Anthropic.ClaudeCode` di Windows.

Installer tidak menampilkan apa pun saat mengunduh. Setelah berhenti, buka jendela terminal baru dan jalankan:

```bash
claude --version
```

Kalau muncul nomor versi, berarti berhasil.

## 3. Pasang ffmpeg dan dua skill

```bash
brew install ffmpeg
```

Di Windows pakai `winget install Gyan.FFmpeg`. Lalu skill-nya, dari [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Ini butuh [Node.js](https://nodejs.org). Pilih Claude Code saat ditanya mau dipasang di mana. Kalau tidak mau pakai Node, jalankan `claude` dan bilang: "Pasang skill solo-transcribe dan solo-video-edit dari github.com/fortunto2/solo-factory". Jangan salin file skill dengan tangan. Salinan tidak ikut menerima perbaikan.

## 4. Mulai di folder klipmu

```bash
cd ~/Movies/lisbon-day1
claude
```

Pertama kali, kamu diminta login. Setelah itu, Claude Code bertanya dulu sebelum menjalankan apa pun. Baca apa yang mau dijalankan. Setujui yang tampak benar.

## 5. Minta filmnya

> Folder ini berisi 40 klip dari satu hari. Transkripsikan semuanya dengan skill transcribe, lalu baca transkripnya dan usulkan cerita dalam lima baris. Tunggu jawabanku sebelum memotong.

Jawab dengan pilihanmu, lalu:

> Potong trailer 3 menit dengan cerita itu. Pakai ~/Music/score.mp3 dan potong mengikuti beat. Sebelum render, tunjukkan skrip dan contact sheet dari shot-nya.

Claude Code akan:

1. menjalankan transkripsi, satu file teks untuk seluruh hari;
2. mendeteksi beat dari lagumu;
3. menulis potongan sebagai file skrip kecil;
4. merender mp4 dengan ffmpeg dan memeriksa bahwa durasi dan suaranya sesuai.

Claude Code juga bisa terhubung ke aplikasi Life2Film Studio di Mac. Dengan itu, ia mendapat analisis shot dan kualitas dari aplikasi. Perintahnya ada di [tulisan teknis](https://rustman.org/wiki/creative-video-with-claude/).

## Kalau ada yang salah

- **`claude: command not found`.** Tutup terminal, buka yang baru. Kalau masih gagal, jalankan `claude doctor` atau lihat [troubleshooting instalasi](https://code.claude.com/docs/en/troubleshoot-install.md) dari Anthropic.
- **Transkrip berisi nama aneh.** Beri daftar kata: "Anna adalah adikku, kafenya bernama Oficina". Teksnya diperbaiki sekali, sebelum dipakai untuk subtitle.
- **Klip tanpa ucapan.** Keramaian dan musik bisa menghasilkan kalimat karangan. Bilang "anggap klip 17 tanpa ucapan".
- **Potongannya terasa datar.** Bilang apa yang salah dengan kata biasa. "Terlalu banyak shot lebar berturut-turut." "Buka dengan momen terbaik."

## Selanjutnya

- Alur umum dan aturannya: [Edit video dengan asisten AI](/id/guides/edit-video-with-ai-agents/).
- Pakai ChatGPT saja: [ChatGPT dan Codex](/id/guides/edit-video-with-chatgpt-codex/).
