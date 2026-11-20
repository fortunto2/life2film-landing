import type { ToolTranslations } from '../tools-i18n';

/** Speech, text, recording and sound tools (20 Nov 2026), apart so tr.ts stays under 1000 lines. */
export const trText: ToolTranslations = {
  'auto-subtitles': {
    searchPhrase: 'Otomatik altyazı oluşturucu online',
    title: 'Otomatik Altyazı Online Ücretsiz — Whisper ile videodan SRT, yükleme yok',
    description:
      'Bir videonun altyazısını otomatik, online ve ücretsiz oluşturun: Whisper tarayıcınızda çalışır ve zamanlamalı SRT veya VTT yazar, 99 dilde. Video yüklenmez; model bir kez iner.',
    heading: 'Otomatik',
    accent: 'altyazı',
    lede: 'Konuşmayı, videoyu hiçbir yere göndermeden zamanlamalı altyazıya çevirin.',
    blurb: 'Whisper ile tarayıcıda konuşmadan SRT veya VTT, sonra tek tıkla videoya gömün.',
    featureList: [
      'Sekmede Whisper base (hızlı) veya small (daha doğru)',
      'Dil algılanır ya da seçilir',
      'Zamanlamalı, okunur satırlı SRT ve WebVTT',
      'Video yüklenmez; model bir kez iner',
    ],
    faq: [
      {
        q: 'Ne kadar doğru?',
        a: 'Küçük boyutlarda Whisper: net konuşma neredeyse temiz çıkar; gürültü, üst üste sesler ve isimler kontrol ister.',
      },
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. İnternetten yalnızca model dosyaları gelir (Hugging Face); ses bilgisayarınızda yazıya dökülür.',
      },
    ],
  },
  'add-text-to-video': {
    searchPhrase: 'Videoya yazı ekleme online',
    title: 'Videoya Yazı Ekle Online Ücretsiz — yükleme yok',
    description:
      'Videoya online ve ücretsiz yazı ekleyin: metni yazın, boyutu ve üst ya da alt konumu seçin, metni görüntüde olan bir MP4 alın; koyu kenarlı beyaz. Tarayıcıda, yükleme yok.',
    heading: 'Videoya',
    accent: 'yazı ekle',
    lede: 'Bir yazı girin, görüntüde belirsin. Video cihazınızda kalır.',
    blurb: 'Videoya üstte ya da altta, her zeminde okunan bir yazı.',
    featureList: [
      'Tüm video için tek yazı, 200 karaktere kadar',
      'Koyu kenarlı beyaz, her zeminde okunur',
      'Üç boyut, üst veya alt',
      'Her şey tarayıcıda: yükleme yok',
    ],
    faq: [
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Tarayıcınız her kareyi çizer ve sonucu kodlar.',
      },
    ],
  },
  'voice-recorder': {
    searchPhrase: 'Online ses kaydedici',
    title: 'Online Ses Kaydedici Ücretsiz — kayıt olmadan MP3 ses kaydı',
    description:
      'Sesinizi online ve ücretsiz kaydedin: kayda basın, konuşun, durdurun; tarayıcı MP3 veya WAV kaydeder. Kayıt ve süre sınırı yok; hiçbir şey yüklenmez.',
    heading: 'Online ses',
    accent: 'kaydedici',
    lede: 'Kayda basın, konuşun ve MP3 alın. Ses bilgisayarınızdan çıkmaz.',
    blurb: 'Mikrofondan sesinizi kaydedin, MP3 veya WAV olarak saklayın.',
    featureList: [
      'MP3 (192 kbps) veya WAV',
      'Seviye göstergesi, kırpılınca kırmızı',
      'Ham ses: gürültü bastırma veya otomatik kazanç yok',
      'Kayıt yok, sınır yok, yükleme yok',
    ],
    faq: [
      {
        q: 'Kayıt bir yere yükleniyor mu?',
        a: 'Hayır. Tarayıcı mikrofonu kaydeder ve MP3’ü kendisi kodlar; dosya doğrudan indirilenlere gider.',
      },
      {
        q: 'Tarayıcı mikrofonu alamıyor.',
        a: 'Adres çubuğundaki kilit simgesine tıklayın ve bu site için mikrofona izin verin.',
      },
    ],
  },
  'webcam-recorder': {
    searchPhrase: 'Online webcam kaydedici',
    title: 'Online Webcam Video Kaydı Ücretsiz — yükleme ve filigran yok',
    description:
      'Webcam’den online ve ücretsiz video kaydedin: kamerayı açın, kayda basın, durdurun; tarayıcı videoyu sesle kaydeder (MP4 veya WebM). Kayıt, filigran ve süre sınırı yok; hiçbir şey yüklenmez.',
    heading: 'Online webcam',
    accent: 'kaydedici',
    lede: 'Kendinizi görün, kayda basın, dosyayı alın. Hiçbir şey bilgisayardan çıkmaz.',
    blurb: 'Webcam’den kendinizi sesli kaydedin ve videoyu saklayın.',
    featureList: [
      'Kamera ve mikrofon, 480p, 720p veya 1080p',
      'Safari ve yeni Chrome’da MP4, diğerlerinde WebM',
      'Aynalı önizleme; dosya aynasız kaydedilir',
      'Kayıt yok, filigran yok, yükleme yok',
    ],
    faq: [
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Tarayıcı kamerayı belleğe kaydeder ve dosyayı indirilenlere kaydeder.',
      },
    ],
  },
  'change-key': {
    searchPhrase: 'Şarkının tonunu değiştir online',
    title: 'Şarkının Tonunu Değiştir Online Ücretsiz — tempo aynı kalır',
    description:
      'Bir şarkının tonunu online ve ücretsiz değiştirin: tempoyu koruyarak 12 yarım sese kadar yükseltin veya alçaltın, MP3 ya da WAV kaydedin. Kendi aralığınızda söylemek için. Tarayıcıda, yükleme yok.',
    heading: 'Şarkının tonunu',
    accent: 'değiştir',
    lede: 'Yarım seslerle yukarı veya aşağı, tempo aynı. Şarkı cihazınızda kalır.',
    blurb: 'Bir şarkıyı tempoyu değiştirmeden yarım seslerle kaydırın.',
    featureList: [
      '−12 ile +12 yarım ses arası',
      'Tempo ve süre değişmez',
      'MP3 veya WAV, sayfada dinleyin',
      'Hiçbir şey yüklenmez',
    ],
    faq: [
      {
        q: 'Kaç yarım ses gerekir?',
        a: 'Her adım bir yarım ses: Do’dan Re’ye +2. Mevcut tonu Ton bulucu ile öğrenin (/tr/tools/key-finder/).',
      },
      {
        q: 'Dosya yükleniyor mu?',
        a: 'Hayır. Tarayıcınız şarkıyı kendisi çözer, kaydırır ve kodlar.',
      },
    ],
  },
  'add-logo-to-video': {
    searchPhrase: 'Videoya logo ekle online',
    title: 'Videoya Logo veya Filigran Ekle Online Ücretsiz — yükleme yok',
    description:
      'Videoya online ve ücretsiz logonuzu veya filigranınızı ekleyin: PNG (şeffaflık korunur), JPG ya da SVG, köşe, boyut ve opaklık seçin, MP4 alın. Tarayıcıda, yükleme yok.',
    heading: 'Videoya',
    accent: 'logo ekle',
    lede: 'Logonuz her karenin köşesinde. Video cihazınızda kalır.',
    blurb: 'Logonuzu veya filigranınızı videonun köşesine koyun.',
    featureList: [
      'Şeffaf PNG, JPG, WebP veya SVG',
      'Dört köşe veya orta',
      'Boyut ve opaklık ayarı',
      'Yükleme yok, bizim filigranımız yok',
    ],
    faq: [
      {
        q: 'Logonun arka planı görünür mü?',
        a: 'Şeffaf PNG veya SVG ise görünmez. JPG’de şeffaflık yoktur.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Tarayıcı logoyu her kareye çizer.',
      },
    ],
  },
  'sped-up-slowed-reverb': {
    searchPhrase: 'Sped up ve slowed + reverb şarkı online',
    title: 'Sped Up ve Slowed + Reverb Online Ücretsiz — şarkıyı hızlandır veya yavaşlat, yükleme yok',
    description:
      'Bir şarkının sped up veya slowed + reverb versiyonunu online ve ücretsiz yapın: tek tık ön ayarlar, 0,5×–2× hız, yankı ve ses perdesini koruma seçeneği. MP3 veya WAV. Tarayıcıda, yükleme yok.',
    heading: 'Sped up ve',
    accent: 'slowed + reverb',
    lede: 'Bir şarkının TikTok versiyonları, kendi cihazınızda.',
    blurb: 'Bir şarkının sped up veya slowed + reverb versiyonu.',
    featureList: [
      'Ön ayarlar: sped up 1,25×, yankılı slowed 0,8×',
      '0,5× ile 2× arası her hız',
      'Plak gibi ya da perdeyi koruyarak',
      'MP3 veya WAV, yükleme yok',
    ],
    faq: [
      {
        q: 'Hızlı versiyon neden daha ince?',
        a: 'Sped up sesi budur: perde tempoyla yükselir. Yalnızca tempoyu değiştirmek için «Ses perdesini koru»yu işaretleyin.',
      },
      {
        q: 'Şarkı yükleniyor mu?',
        a: 'Hayır. Tarayıcınız işler.',
      },
    ],
  },
  'remove-background-noise': {
    searchPhrase: 'Sesten arka plan gürültüsünü kaldır online',
    title: 'Ses ve Videodan Arka Plan Gürültüsünü Kaldır Online Ücretsiz — yükleme yok',
    description:
      'Bir ses kaydından veya videodan arka plan gürültüsünü online ve ücretsiz kaldırın: fan, uğultu, rüzgâr ve trafik, tarayıcıda çalışan ses için bir sinir ağı olan RNNoise ile konuşmadan temizlenir. Video görüntüsü korunur; hiçbir şey yüklenmez.',
    heading: 'Arka plan',
    accent: 'gürültüsünü kaldır',
    lede: 'Konuşmadaki gürültüyü temizleyin. Dosya cihazınızda kalır.',
    blurb: 'Konuşmadan fan uğultusunu, rüzgârı ve oda gürültüsünü kaldırın.',
    featureList: [
      'RNNoise (Xiph), ses için sinirsel gürültü bastırıcı',
      'Video ve kayıtlarla çalışır',
      'Güç ayarı',
      'Hiçbir şey yüklenmez',
    ],
    faq: [
      {
        q: 'Hangi gürültüyü kaldırır?',
        a: 'Sesin etrafındaki sabit gürültü: fan, klima, uğultu, rüzgâr, trafik. Müzik için değildir.',
      },
      {
        q: 'Dosyam yükleniyor mu?',
        a: 'Hayır. Ağ tarayıcıda WebAssembly ile çalışır.',
      },
    ],
  },
  'audio-to-video': {
    searchPhrase: 'Sesi videoya dönüştür online',
    title: 'Sesten Videoya Online Ücretsiz — YouTube için resimli MP3’ten MP4’e',
    description:
      'Sesi online ve ücretsiz videoya dönüştürün: MP3, M4A veya WAV ile bir kapak görseli, isteğe bağlı hareketli seviye çubuklarıyla YouTube, Shorts veya Reels için MP4 olur. Tarayıcıda, yükleme yok.',
    heading: 'Sesten',
    accent: 'videoya',
    lede: 'Bir şarkı, podcast veya sesli not, YouTube’a hazır.',
    blurb: 'YouTube için MP3’ten MP4’e: kapak, sesiniz ve onunla hareket eden çubuklar.',
    featureList: [
      'Bulanık kopyası üzerinde kapak veya koyu zemin',
      'Hareketli seviye çubukları (isteğe bağlı)',
      '16:9, 1:1 veya 9:16',
      'Hiçbir şey yüklenmez',
    ],
    faq: [
      {
        q: 'YouTube’a neden MP3 yüklenemiyor?',
        a: 'YouTube yalnızca video kabul eder. Bu, sesi resimli bir MP4’e sarar.',
      },
      {
        q: 'Dosyam yükleniyor mu?',
        a: 'Hayır. Videoyu tarayıcınız oluşturur.',
      },
    ],
  },
  'blur-background-video': {
    searchPhrase: 'Bulanık arka planlı dikey video',
    title: 'Videoyu Bulanık Arka Planla Dikey Yap Online Ücretsiz — kırpmadan 9:16',
    description:
      'Yatay bir videoyu Reels, TikTok ve Shorts için kırpmadan 9:16’ya (ya da 4:5, 1:1) çevirin: karenin tamamı ortada kalır, boşlukları bulanık bir kopyası doldurur. Online, ücretsiz, tarayıcıda; yükleme yok.',
    heading: 'Bulanık arka planlı',
    accent: 'dikey video',
    lede: 'Hiçbir şey kesilmez, siyah bant yok.',
    blurb: 'Yatay videoyu kırpmadan dikeye çevirin: kalanı bulanık arka plan doldurur.',
    featureList: [
      '9:16, 4:5, 1:1 veya 16:9',
      'Karenin tamamı ortada',
      'Bantlar bulanık kopyayla dolar',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Kırpmaktan farkı ne?',
        a: 'Kırpma kenarları keser. Bu her şeyi korur, boşluğu bulanıklıkla doldurur.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Tarayıcınız işler.',
      },
    ],
  },
  'video-filters': {
    searchPhrase: 'Video filtreleri online',
    title: 'Video Filtreleri Online Ücretsiz — karanlık videoyu aydınlat, siyah beyaz, yükleme yok',
    description:
      'Bir videoya online ve ücretsiz filtre uygulayın: karanlık videoyu aydınlatın, siyah beyaz, canlı, sıcak, soğuk veya vintage yapın ya da canlı önizlemeyle parlaklık, kontrast, doygunluk ve sıcaklığı ayarlayın. Tarayıcıda, yükleme yok.',
    heading: 'Video',
    accent: 'filtreleri',
    lede: 'Kaydetmeden önce sonucu kendi klibinizde görün.',
    blurb: 'Karanlık videoyu aydınlatın, siyah beyaz, daha sıcak veya canlı yapın.',
    featureList: [
      'Ön ayarlar: aydınlat, siyah beyaz, canlı, sıcak, soğuk, vintage',
      'Parlaklık, kontrast, doygunluk, sıcaklık',
      'Canlı önizleme',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Çok karanlık bir videoyu nasıl aydınlatırım?',
        a: '«Aydınlat»a basın, yüzler görünene kadar parlaklığı artırın.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Filtreyi tarayıcınız uygular.',
      },
    ],
  },
  'split-screen-video': {
    searchPhrase: 'İki video tek ekranda online',
    title: 'Bölünmüş Ekran Video Online Ücretsiz — iki video yan yana, yükleme yok',
    description:
      'İki videoyu online ve ücretsiz tek karede birleştirin: yan yana (16:9) veya üst üste (Reels ve TikTok için 9:16), eşzamanlı, birinin ya da ikisinin sesiyle. Tarayıcıda, yükleme yok.',
    heading: 'Bölünmüş ekran',
    accent: 'video',
    lede: 'İki klip, tek kare, eşzamanlı.',
    blurb: 'İki videoyu yan yana veya üst üste, aynı anda oynatın.',
    featureList: [
      'Yan yana (1920x1080) veya üst üste (1080x1920)',
      'Her klip yarısını esnemeden doldurur',
      'İlkinin, ikincinin veya ikisinin sesi',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Süreleri farklıysa?',
        a: 'Sonuç kısa olanın süresi kadardır.',
      },
      {
        q: 'Videolar yükleniyor mu?',
        a: 'Hayır. Tarayıcınız işler.',
      },
    ],
  },
  'tiktok-captions': {
    searchPhrase: 'TikTok tarzı altyazı',
    title: 'TikTok Tarzı Altyazı Online Ücretsiz — kelime kelime büyük altyazı, yükleme yok',
    description:
      'Bir videoya TikTok ve Reels tarzı altyazıyı otomatik, online ve ücretsiz ekleyin: Whisper konuşmayı tarayıcıda dinler, karenin ortasına 1–4 kelimelik büyük kalın altyazılar gömer. Yükleme ve filigran yok.',
    heading: 'TikTok tarzı',
    accent: 'altyazı',
    lede: 'Konuşmadan büyük altyazıya tek adımda.',
    blurb: 'Konuşmadan, ortada birkaç kelimelik büyük kalın altyazılar.',
    featureList: [
      'Whisper ile kelime zamanlaması, 1–4 kelime',
      'Kenarlı kalın beyaz, ortada',
      '99 dil',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Yanlış duyulan kelimeyi düzeltebilir miyim?',
        a: 'Burada hayır. Kontrol için Otomatik altyazı ile SRT yapın, düzeltin ve videoya gömün.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Her şey tarayıcıda çalışır.',
      },
    ],
  },
  'fade-video': {
    searchPhrase: 'Videoya belirme ve kararma online',
    title: 'Video Kararma Online Ücretsiz — siyahtan belirme ve siyaha kararma, yükleme yok',
    description:
      'Bir videoya siyahtan belirme ve siyaha kararma geçişini online ve ücretsiz ekleyin, ses de birlikte azalır. Her uç için 0,5–3 saniye. Tarayıcıda, yükleme yok.',
    heading: 'Belirme ve kararma',
    accent: 'video',
    lede: 'Yumuşak bir başlangıç, temiz bir son.',
    blurb: 'Siyahtan belirme ve siyaha kararma, sesle birlikte.',
    featureList: [
      'Her uçta 0,5–3 s geçiş',
      'Ses görüntüyle birlikte azalır',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Ses de azalıyor mu?',
        a: 'Evet, aynı saniyelerde.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Tarayıcınız işler.',
      },
    ],
  },
  'resize-video': {
    searchPhrase: 'Video çözünürlüğünü online değiştir',
    title: 'Video Boyutlandırma Online Ücretsiz — 4K’dan 1080p, 720p, yükleme yok',
    description:
      'Bir videonun çözünürlüğünü online ve ücretsiz değiştirin: 4K’dan 1080p’ye, 1080p’den 720p, 480p veya 360p’ye, dikey ya da yatay, oranı korunarak. Tarayıcıda, yükleme yok.',
    heading: 'Video',
    accent: 'boyutlandır',
    lede: 'Tek adımda daha düşük çözünürlük.',
    blurb: 'Çözünürlüğü değiştirin: 4K’dan 1080p’ye, 1080p’den 720p’ye…',
    featureList: [
      '2160p’den 360p’ye',
      'Dikey veya yatay, oran korunur',
      'Asla büyütmez',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Dikey videoda 720p ne demek?',
        a: '720x1280: uzun kenar seçilir.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Tarayıcınız işler.',
      },
    ],
  },
  'remove-silence-from-video': {
    searchPhrase: 'Videodaki sessizlikleri online kes',
    title: 'Videodan Sessizliği Kaldır Online Ücretsiz — otomatik jump cut, yükleme yok',
    description:
      'Konuşmalı bir videodaki duraklamaları otomatik, online ve ücretsiz kesin: neyin sessizlik sayılacağını ve duraklama uzunluğunu seçin, daha akıcı bir MP4 alın. Tarayıcıda, yükleme yok.',
    heading: 'Sessizliği kaldır',
    accent: 'videodan',
    lede: 'Konuşmalı videolar için otomatik jump cut.',
    blurb: 'Konuşmalı videodaki duraklamaları kesin (jump cut).',
    featureList: [
      '-50 ile -30 dB arası eşik',
      '0,3–1,2 sn’den uzun duraklamalar kesilir',
      'Tıkırtısız birleşimler',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Kelimelerimi kesiyor.',
        a: 'Eşiği -45 veya -50 dB’ye düşürün.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Her şey tarayıcıda.',
      },
    ],
  },
  'boomerang-video': {
    searchPhrase: 'Videodan boomerang online',
    title: 'Boomerang Yap Online Ücretsiz — her videodan, yükleme yok',
    description:
      'Herhangi bir videodan online ve ücretsiz boomerang yapın: ilk saniyeler ileri sonra geri, 1–5 kez, 1x–2x. Tarayıcıda, yükleme yok.',
    heading: 'Boomerang',
    accent: 'yap',
    lede: 'İleri, geri, yeniden.',
    blurb: 'Kısa bir klibi boomerang’a çevirin.',
    featureList: [
      'Duraksamadan ileri ve geri',
      '1–5 tekrar, 1x–2x',
      'İlk 6 saniye',
      'Yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Neden ses yok?',
        a: 'Ters ses gürültüdür; boomerang sessizdir.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır.',
      },
    ],
  },
};
