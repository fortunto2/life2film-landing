---
title: "Yapay zeka ile video düzenleme: Claude Code, ChatGPT ve Codex"
description: "Programcı olmayanlar için adım adım video düzenleme yapay zeka rehberi: asistanı kurun, iki ücretsiz beceri ekleyin, klipleri müziğin ritmine kestirin."
date: 2026-11-05
---

Bir yapay zeka asistanıyla konuşarak video düzenleyebilirsiniz. Klipleri bir klasöre koyarsınız ve nasıl bir film istediğinizi söylersiniz. Asistan kliplerdeki konuşmaları okur, çekimleri seçer, müziğe göre keser ve bir mp4 oluşturur. Siz izlersiniz, neyin yanlış olduğunu söylersiniz, o da düzeltir.

Bu rehber hiç terminal açmamış kişiler için. İlk kurulum için 30 dakika ayırın. Sonrasında yeni bir film tek mesajla başlar.

## Kısa özet

1. Asıl kesme işini yapan ücretsiz araç **ffmpeg**'i kurun.
2. Bilgisayarınızdaki bir klasörde çalışabilen bir asistan kurun: [Claude Code](/tr/guides/edit-video-with-claude-code/) ya da [Codex'li ChatGPT masaüstü uygulaması](/tr/guides/edit-video-with-chatgpt-codex/).
3. İki ücretsiz beceri kurun: `solo-transcribe` ve `solo-video-edit`.
4. Klipleri tek bir klasöre koyun ve bir film isteyin.

## Hangi asistan bunu yapabilir

Asistanın bilgisayarınızda program çalıştırabilmesi ve dosyalarınızı okuyabilmesi gerekir. Her sohbet bunu yapamaz.

| Araç | Yerel klipleri düzenler mi | Not |
|---|---|---|
| Claude Code (terminal veya Claude masaüstü uygulaması) | Evet | Ücretli Claude planı veya API hesabı gerekir |
| ChatGPT masaüstü uygulaması, Codex modu | Evet | ChatGPT planı gerekir. Bir klasör seçersiniz, asistan onun içinde çalışır |
| Codex CLI | Evet | Yukarıdakiyle aynı, terminalde |
| Tarayıcıdaki veya telefondaki ChatGPT | Hayır | Senaryo, altyazı ve çekim listesi yazabilir. Diskinizdeki 40 klip üzerinde ffmpeg çalıştıramaz |

Elinizde yalnızca tarayıcı sohbeti varsa, filmi planlamak ve metni yazmak için kullanın. Kesimi yukarıdaki araçlardan biriyle yapın.

## 1. Adım: ffmpeg'i kurun

Mac'te, [Homebrew](https://brew.sh) ile:

```bash
brew install ffmpeg
```

Windows'ta:

```powershell
winget install Gyan.FFmpeg
```

Çalıştığını kontrol edin: `ffmpeg -version` yazın, bir sürüm numarası görmelisiniz. Komut yazmak istemiyorsanız önce asistanı kurun ve "ffmpeg'i benim için kur" deyin. Komutu çalıştırır ve izninizi ister.

## 2. Adım: Asistanı kurun

Birini seçin. İkisi de kendi sayfasında adım adım anlatılıyor:

- [Claude Code](/tr/guides/edit-video-with-claude-code/): tek komut, sonra klip klasörünüzde `claude`.
- [ChatGPT masaüstü uygulaması ve Codex](/tr/guides/edit-video-with-chatgpt-codex/): uygulamayı indirin, Codex'i seçin, klip klasörünüzü açın.

## 3. Adım: İki beceriyi ekleyin

Beceri (skill), asistanın ihtiyaç duyduğunda yüklediği bir talimat metin dosyasıdır. Bu ikisi, gerçek işten çıkan kurallardan oluşuyor: Chicago'da dokuz gün, günde 40 ila 70 klip, fragmanlara ve 55 dakikalık bir filme kesildi.

- `solo-transcribe` kliplerdeki konuşmayı zamanlamalarıyla metne çevirir. Bilgisayarınızda çalışır, hiçbir şey yüklenmez.
- `solo-video-edit` kurgu kurallarını ve ffmpeg tariflerini içerir.

İkisi de [GitHub'daki solo-factory](https://github.com/fortunto2/solo-factory) içinde herkese açık. Elle kopyalamayın. Beceri aracıyla kurun, bunun için [Node.js](https://nodejs.org) gerekir:

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Hangi asistanlar için kurulacağını sorar. Kendinizinkini seçin. Sonra asistanı yeniden başlatın, yeni becerileri görsün.

## 4. Adım: Ne istediğinizi söyleyin

Bir günün tüm kliplerini tek klasöre koyun ve asistanı orada açın. Sonra bir insan kurgucuya yazar gibi yazın:

> Yeni gün: klasörde Lizbon gezimden 40 klip var. Hepsini yazıya dök, oku ve bir hikaye öner. Sonra 3 dakikalık bir fragman kes. Altına music.mp3 parçamı koy ve ritme göre kes.

Sonra olanlar:

1. **Yazıya dökme.** Asistan her klipte `solo-transcribe` çalıştırır. Apple Silicon'lu bir Mac'te bu, gerçek süreden yaklaşık dört kat hızlıdır. Windows veya Linux'ta işlemcide çalışır ve daha uzun sürer.
2. **Günü metin olarak okuma.** Tüm konuşmalar çekim sırasıyla tek dosyaya girer. Asistan bunu senaristin okuduğu gibi okur ve hikaye önerir. "Hayır, yemekle ilgili olsun" diyebilirsiniz.
3. **Ritmi bulma.** Parçanızın temposunu ve ana vuruşlarını bulur, böylece kesmeler müziğe oturur. Bu kısmı tek başına, ücretsiz [BPM bulucu](/tr/tools/bpm-detector/) ile deneyebilirsiniz.
4. **Kesimi senaryo olarak yazma.** Zaman çizelgesi değil. Hangi klibin hangi cümlesinin çalacağını ve onu hangi çekimin örteceğini söyleyen kısa bir dosya. "Bean'den bahsediyorsun ama hiç göstermiyorsun" gibi bir şikayet tek satırlık bir düzeltmeye dönüşür.
5. **Render.** ffmpeg mp4'ü oluşturur. Asistan süre, kodek ve sesin plana uyduğunu kontrol eder.

## Üç deneme bekleyin

İlk kesim genelde sıkıcıdır ya da biraz senkron dışıdır. Üçüncüsü iyidir. Bu yine de elle düzenlemekten hızlıdır, çünkü yavaş kısımlar ortadan kalkar: her klibi izlemek, ritmi bulmak, altyazıyı senkronlamak.

İlk kesimden sonra söylenecek işe yarar şeyler:

- "Tüm filmin kontak sayfasını göster."
- "1:20'deki ara plan söylediğimle uyuşmuyor. Değiştir."
- "En iyi çekimlerden 8 saniyeyle aç, sonra giriş cümlesi gelsin."
- "İngilizce ve İspanyolca altyazı ekle."
- "Reels için dikey 9:16 sürümünü yap."

## Kötü kesimden koruyan kurallar

- Ara plan, konuşulan şeyi gösterir. Köprüden bahsediyorsanız ekranda köprü olur.
- Dudakların oynadığı bir çekimi asla örtmeyin. İzleyici bunu bozuk senkron olarak okur.
- İlk 8 ila 10 saniyeyi kendiniz seçin. Makine keskin ve renkli olanı seçer, ilginç olanı değil.
- Klibin arka planında çalan müzik telif iddiasına yol açabilir. Bir günlük çekimde 10 iddia geldi. Altına kendi parçanızı koyun.
- Asistana kişi ve yer adlarını söyleyin. Konuşma tanıma, bilmediği isimleri ünlülere çevirir.

## Yapmadıkları

- Görüntü üretmez. Çektiğinizi keser.
- Hikayeyi sizin yerinize seçmez. Önerir, siz karar verirsiniz.
- Büyük dosyalar zaman alır. 66 klibi ilk seferde analiz etmek yaklaşık 20 dakika sürdü.
- Beceriler birkaç deneme kabul eden kişiler için yazıldı. Tek tuş istiyorsanız zaman çizelgeli bir editör kullanın.

## Sohbet yerine pencere mi istiyorsunuz?

[Life2Film Studio](/tr/studio/) ücretsiz bir Mac uygulamasıdır (beta): asistanınızla paylaştığınız bir zaman çizelgesi editörü. Filmi özgün dosyalardan açar, asistan zaman çizelgesinde kesmeler önerir, siz de her öneriyi kabul etmeden önce izlersiniz. Tarayıcı araçları için [Ücretsiz araçlar](/tr/tools/) sayfasına bakın: ritim bulucu, sahne bulucu, kırpıcı ve daha fazlası, hepsi yükleme yapmadan tarayıcınızda çalışır. Geliştiriciler için analiz motoru [Engine sayfasında](/engine/).

## Teknik ayrıntılar

Chicago filmlerinin nasıl kesildiği, kesin kurallar ve arkasındaki sayılar rustman.org'da: [Edit video with an AI assistant: a day of footage to a film](https://rustman.org/wiki/creative-video-with-claude/) ve how the cut is written as a script.

## Sık sorulan sorular

**ChatGPT video düzenleyebilir mi?** Tarayıcıdaki sohbet bilgisayarınızdaki dosyaları düzenleyemez. Codex modundaki ChatGPT masaüstü uygulaması düzenleyebilir, çünkü bir klasörde çalışır ve komut çalıştırır. [ChatGPT ve Codex sayfasına](/tr/guides/edit-video-with-chatgpt-codex/) bakın.

**Görüntülerim yükleniyor mu?** Beceriler bilgisayarınızda çalışır. Asistanın kendisi transkriptin metnini ve çalıştırdığı komutları görür. Cevap vermek için video dosyalarının yüklenmesine ihtiyaç duymaz.

**Windows'ta çalışır mı?** Evet. ffmpeg'i winget ile kurun. Yazıya dökme orada işlemcide çalışır.

**Kod yazmayı bilmem gerekir mi?** Hayır. Cümle yazarsınız. Çalıştırmak istediği komutları siz onaylarsınız.
