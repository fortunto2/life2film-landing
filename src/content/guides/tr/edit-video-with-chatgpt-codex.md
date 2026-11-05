---
title: "ChatGPT video düzenleme yapıyor mu? Evet, bilgisayarınızda Codex ile"
description: "Tarayıcıdaki ChatGPT kliplerinizi kesemez. Codex modundaki ChatGPT masaüstü uygulaması kesebilir. ChatGPT ile video düzenleme nasıl yapılır, adım adım."
date: 2026-11-05
---

Dürüst cevabın iki kısmı var. Tarayıcıdaki veya telefondaki ChatGPT, bilgisayarınızdaki video dosyalarını düzenleyemez. Senaryo, altyazı ve çekim listesi yazabilir. Codex modundaki ChatGPT masaüstü uygulaması ve Codex komut satırı aracı düzenleyebilir: seçtiğiniz bir klasörde çalışırlar ve ffmpeg gibi programları çalıştırırlar. Bu sayfa [tam rehberin](/tr/guides/edit-video-with-ai-agents/) ChatGPT bölümüdür.

Codex içeren bir ChatGPT planına ihtiyacınız var.

## Her seçenek neler yapabilir

| Seçenek | Yerel klipleri keser mi? |
|---|---|
| Tarayıcıdaki veya telefon uygulamasındaki ChatGPT | Hayır. Yalnızca planlama ve yazma |
| ChatGPT masaüstü uygulaması, Chat veya Work modu | Yalnızca klasör için yerel çalışmayı açarsanız. Tarayıcıdaki Work bir bulut ortamında çalışır |
| ChatGPT masaüstü uygulaması, Codex modu | Evet. Bir klasör açar, komut çalıştırır |
| Terminalde Codex CLI | Evet |

"Yerel çalışma" hesabınıza ve çalışma alanı ayarlarına bağlıdır, bu yüzden göremeyebilirsiniz. Kesin yol Codex modudur.

## 1. Masaüstü uygulamasını kurun

macOS, Windows veya Linux için ChatGPT'yi OpenAI'dan indirin, açın ve giriş yapın. Ürün seçiciden **Codex**'i seçin. Sonra klip klasörünüzü proje olarak açın.

Terminali seviyorsanız, komut satırı sürümü tek satırla kurulur:

```bash
npm install -g @openai/codex
```

ya da Mac'te `brew install --cask codex`. `codex` komutunu çalıştırın ve **Sign in with ChatGPT** seçeneğini seçin.

## 2. ffmpeg'i kurun

```bash
brew install ffmpeg
```

Windows'ta: `winget install Gyan.FFmpeg`. Ya da Codex'e söyleyin: "ffmpeg'i benim için kur". Çalıştırmadan önce onay ister.

## 3. Becerileri ekleyin

Codex, becerileri klasörünüzdeki `.agents/skills` içinden ya da ana klasörünüzdeki `~/.agents/skills` içinden okur. İki video becerisini [solo-factory](https://github.com/fortunto2/solo-factory) içinden kurun:

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Bunun için [Node.js](https://nodejs.org) gerekir. Sorduğunda Codex'i seçin. Başka bir yol: Codex'te `$skill-installer` yazın ve bu iki beceriyi o GitHub deposundan kurmasını isteyin. Görünmezlerse Codex'i yeniden başlatın. Bir mesajda beceriyi çağırmak için `$` ve adını yazın. Beceri dosyalarını elle kopyalamayın.

## 4. Filmi isteyin

> Klasörde bir güne ait 40 klip var. Hepsinde $solo-transcribe kullan, transkripti oku ve beş satırda bir hikaye öner. Kesmeden önce cevabımı bekle.

Sonra:

> Bu hikayede 3 dakikalık bir fragman kes, altında music.mp3 olsun, kesmeler ritme göre. Render etmeden önce bana senaryoyu ve bir kontak sayfası göster.

Codex yazıya döker, ritmi bulur, kesimi senaryo olarak yazar, ffmpeg ile render eder ve sonucu kontrol eder. Üç tur bekleyin. İlk kesim nadiren saklayacağınız olandır.

## ChatGPT'nin zayıf olduğu yerler

- Masaüstü uygulaması veya Codex olmadan kliplerinize erişimi yoktur. 2 GB'lık bir videoyu sohbete yapıştırıp kesim beklemeyin.
- Windows ve Linux'ta yazıya dökme işlemcide çalışır ve Apple Silicon'lu bir Mac'ten yavaştır.
- Onaylamadan önce Codex'in ne çalıştırmak istediğini kontrol edin. Güvenlik ağınız budur.

Zaten Claude için ödüyorsanız, [Claude Code](/tr/guides/edit-video-with-claude-code/) aynı işi yapar. İkisi de aynı becerileri okur.

## Sıradaki

- Genel akış ve kötü kesimi önleyen kurallar: [Yapay zeka ile video düzenleme](/tr/guides/edit-video-with-ai-agents/).
- Gerçek filmler nasıl kesildi: [rustman.org yazısı](https://rustman.org/wiki/creative-video-agent-cut/).
- Pencereli hazır uygulama mı istiyorsunuz: Mac'te [Life2Film Studio](/tr/studio/).
