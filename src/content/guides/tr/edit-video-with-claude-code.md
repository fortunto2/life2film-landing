---
title: "Claude Code ile video düzenleme nasıl yapılır? Adım adım"
description: "Claude Code'u kurun, video düzenleme becerilerini ekleyin ve sohbet ederek bir klip klasöründen film kesin. Hiç terminal kullanmamış kişiler için yazıldı."
date: 2026-11-05
---

Claude Code, Anthropic'in bilgisayarınızdaki bir klasörde çalışan asistanıdır. Dosyaları okuyabilir, ffmpeg gibi programları çalıştırabilir ve betik yazabilir. Video düzenleme tam olarak bunu gerektirir. Bu sayfa [tam rehberin](/tr/guides/edit-video-with-ai-agents/) Claude Code bölümüdür.

Ücretli bir Claude planına veya Anthropic API hesabına ihtiyacınız var. Claude Code, macOS 13 ve üstünde, Windows 10 ve üstünde ve Linux'ta, 4 GB veya daha fazla RAM ile çalışır.

## 1. Terminali açın

- **Mac:** Cmd+Boşluk tuşlarına basın, "Terminal" yazın, Enter'a basın.
- **Windows:** Windows tuşuna basın, "PowerShell" yazın, Enter'a basın.

Anthropic ilk kez kullananlar için bir [terminal rehberi](https://code.claude.com/docs/en/terminal-guide) de sunuyor. Terminal istemiyor musunuz? İçinde Claude Code olan bir [Claude masaüstü uygulaması](https://code.claude.com/docs/en/desktop-quickstart.md) var. Aşağıdaki adımlar beceriler için yine geçerlidir.

## 2. Claude Code'u kurun

Mac, Linux veya WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Ya da bir paket yöneticisiyle: Mac'te `brew install --cask claude-code`, Windows'ta `winget install Anthropic.ClaudeCode`.

Kurulum aracı indirirken bir şey yazdırmaz. Durduğunda yeni bir terminal penceresi açın ve şunu çalıştırın:

```bash
claude --version
```

Bir sürüm numarası görmek, kurulumun tamam olduğu anlamına gelir.

## 3. ffmpeg'i ve iki beceriyi kurun

```bash
brew install ffmpeg
```

Windows'ta `winget install Gyan.FFmpeg` kullanın. Sonra becerileri [solo-factory](https://github.com/fortunto2/solo-factory) içinden kurun:

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Bunun için [Node.js](https://nodejs.org) gerekir. Nereye kurulacağını sorduğunda Claude Code'u seçin. Node kullanmak istemiyorsanız `claude` komutunu başlatın ve şunu söyleyin: "github.com/fortunto2/solo-factory içinden solo-transcribe ve solo-video-edit becerilerini kur". Beceri dosyalarını elle kopyalamayın. Kopya düzeltme almaz.

## 4. Klip klasörünüzde başlayın

```bash
cd ~/Movies/lisbon-day1
claude
```

İlk seferde giriş yapmanızı ister. Sonra bir şey çalıştırmadan önce size sorar. Çalıştırmak istediği şeyi okuyun. Doğru görünenleri onaylayın.

## 5. Filmi isteyin

> Klasörde bir güne ait 40 klip var. Hepsini transcribe becerisiyle yazıya dök, sonra transkripti oku ve beş satırda bir hikaye öner. Kesmeden önce cevabımı bekle.

Seçiminizi söyleyin, sonra:

> Bu hikayede 3 dakikalık bir fragman kes. ~/Music/score.mp3 dosyasını kullan ve ritme göre kes. Render etmeden önce bana senaryoyu ve çekimlerin kontak sayfasını göster.

Claude Code şunları yapar:

1. yazıya dökmeyi çalıştırır, tüm gün için tek bir metin dosyası çıkar;
2. parçanızın ritmini bulur;
3. kesimi küçük bir senaryo dosyası olarak yazar;
4. ffmpeg ile mp4 oluşturur ve sürenin ve sesin uyduğunu kontrol eder.

Claude Code, bir Mac'teki Life2Film Studio uygulamasının içinde de çalışabilir: zaman çizelgesini okur, karelere bakar ve pencerede sizin kabul ettiğiniz değişiklikler önerir. Bağlantı tek komut, bkz. [Connect an agent](/studio/agent/).

## Bir şey ters giderse

- **`claude: command not found`.** Terminali kapatın, yenisini açın. Hâlâ olmuyorsa `claude doctor` çalıştırın veya Anthropic'in [kurulum sorun giderme](https://code.claude.com/docs/en/troubleshoot-install.md) sayfasına bakın.
- **Transkriptte garip isimler var.** Ona bir kelime listesi verin: "Anna kız kardeşim, kafenin adı Oficina". Altyazılar kullanmadan önce metni bir kez düzeltir.
- **Bir klipte konuşma yok.** Kalabalık ve müzik uydurma cümleler üretebilir. "17. klibi konuşmasız say" deyin.
- **Kesim yavan geliyor.** Neyin yanlış olduğunu düz kelimelerle söyleyin. "Arka arkaya çok fazla geniş plan var." "En iyi anla aç."

## Sıradaki

- Genel akış ve kurallar: [Yapay zeka ile video düzenleme](/tr/guides/edit-video-with-ai-agents/).
- Bunun yerine ChatGPT kullanın: [ChatGPT ve Codex](/tr/guides/edit-video-with-chatgpt-codex/).
