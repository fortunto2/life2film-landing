import type { ToolTranslations } from '../tools-i18n';

/** Turkish. Searches lean on "online" and "ücretsiz". */
export const tr: ToolTranslations = {
  'video-compressor': {
    searchPhrase: 'Video sıkıştırma online',
    title: 'Video Sıkıştırma Online Ücretsiz — Discord için 10MB, e-posta için 25MB',
    description:
      'Tam olarak istediğiniz boyuta ulaşan ücretsiz çevrimiçi video sıkıştırıcı: Discord için 10 MB, WhatsApp için 16 MB, e-posta için 25 MB. Tarayıcınızda çalışır: hiçbir şey yüklenmez, boyut sınırı yok, filigran ve kayıt yok.',
    heading: 'Video',
    accent: 'Sıkıştırma',
    lede: 'Bir boyut hedefleyin — Discord için 10 MB, e-posta için 25 MB — ya da yalnızca kaliteyi düşürün. Kendi makinenizde çalışır, bu yüzden ne boyut sınırı ne de kuyruk vardır.',
    blurb: 'Dosyayı küçültün ve bunun tam olarak neye mal olduğunu görün. Sunucu olmadığı için sınır da yok.',
    featureList: [
      'Tam bir dosya boyutunu hedefler',
      'Discord, WhatsApp ve e-posta sınırları için hazır ayarlar',
      'Kodlamadan önce boyut tahmini',
      'İkinci geçiş sapmayı düzeltir',
      'Tümü tarayıcıda — yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Gerçekten tam boyutu tutturuyor mu?',
        a: '«Bir boyuta sığdır» kipi tam olarak bunun içindir. Bir dosyanın ağırlığı, bit hızının süreyle çarpımıdır; süre bilindiğinde gereken bit hızı aritmetikten ibarettir. Kodlayıcılar istenen bit hızına birebir uymaz — hız denetimi malzemeye göre kayar — bu yüzden ilk geçiş birkaç yüzdeden fazla saparsa, sapma ölçülür ve dosya düzeltilmiş değerle bir kez yeniden kodlanır. Pratikte hedefin birkaç yüzdesi içinde kalır.',
      },
      {
        q: 'Neden 10 MB, 16 MB, 25 MB?',
        a: 'Bunlar insanların gerçekten çarptığı duvarlar: 10 MB Discord\'un ücretsiz yükleme sınırı, 16 MB WhatsApp, 25 MB Gmail ve çoğu e-posta sunucusu, 50 MB ise Discord Nitro Basic. Araç sınırın tam üstüne değil, hemen altına nişan alır; çünkü tam 10,0 MB\'lık bir dosya, 10 MB sınırı tarafından yine reddedilir.',
      },
      {
        q: 'Hedef imkânsızsa ne olur?',
        a: 'Başlamadan önce söyler ve o video için en küçük dürüst boyutu bildirir. Bir saatlik görüntüyü 10 MB\'a sıkıştırmak, hiçbir çözünürlüğün kaldıramayacağı bir bit hızı demektir: izlenemez bir dosya üretip buna başarı diyen bir araç, reddeden bir araçtan daha kötüdür.',
      },
      {
        q: 'Dosyam ne kadar küçülür?',
        a: 'Tahmin, siz hiçbir şeye basmadan önce ayarlardan ve süreden hesaplanır. Telefondan ya da kameradan yeni çıkmış görüntü genellikle gerekenin çok üstünde kaydedilir ve %60–90 küçülme olağandır. Bir kez sıkıştırılmış olanın verecek pek bir şeyi kalmamıştır; araç dosyanızı, çözünürlüğünün makul olarak gerektirdiğiyle karşılaştırır ve yeniden kodlamanın onu yalnızca büyüteceği durumlarda uyarır.',
      },
      {
        q: 'Videoyu asıl küçülten nedir?',
        a: 'Daha az piksel ve piksel başına daha az bit. Çözünürlük kaba ama güvenilir koldur: 4K\'dan 1080p\'ye inmek, kaliteden söz etmeye başlamadan önce piksellerin dörtte üçünü siler. Bit hızı ise kalanın ne kadar ayrıntısının hayatta kalacağını belirler. Sesi atmak az yardım eder; bir video dosyasının nadiren yüzde birkaçından fazlasıdır.',
      },
      {
        q: 'Bir yere yükleniyor mu?',
        a: 'Hayır. Her şey tarayıcınızda WebCodecs ile çalışır; bunu pratik kılan da budur: bir gigabaytı yükleyip sunucunun 200 MB geri vermesini beklemek, yerelde yapmaktan yavaştır ve yol boyunca görüntünüzü başkasının diskinde bırakır. Boyut sınırı, kuyruk ve filigran yok — çünkü bunları dayatacak bir sunucu yok.',
      },
    ],
  },

  'video-trimmer': {
    searchPhrase: 'Video kesme online',
    title: 'Video Kesme Online Ücretsiz — yeniden kodlamadan, kalite kaybı olmadan',
    description:
      'Özgün kaliteyi koruyan ücretsiz çevrimiçi video kesici: görüntü yeniden kodlanmaz, kopyalanır. Tarayıcınızda çalışır — hiçbir şey yüklenmez, filigran ve kayıt yok.',
    heading: 'Video',
    accent: 'Kesme',
    lede: 'Tutamaçları istediğiniz bölüme sürükleyin ve kaydedin — görüntü olduğu gibi kopyalanır, hiçbir şey kaybolmaz. Dosyanız makinenizden çıkmaz.',
    blurb: 'Tutamaçları istediğiniz bölüme sürükleyin, önizleyin, kaydedin. Ses eşzamanlı kalır.',
    featureList: [
      'Kayıpsız kesme — videoyu yeniden kodlamadan kopyalar',
      'Kesme noktası önemliyse kare hassasiyetinde yeniden kodlama',
      'Belirli bir dosya boyutuna göre kesme',
      'Seçimin canlı önizlemesi',
      'Tümü tarayıcıda — yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Kesmek kaliteyi düşürür mü?',
        a: 'Varsayılan kipte hayır. «Aynı kalite — yeniden kodlama yok» görüntüyü olduğu gibi geçirir; nesil kaybı olmaz ve birkaç kat daha hızlı biter: aynı üç saniye için 0,20 s\'ye karşı 0,60 s. Bedeli boyuttur: video, anahtar kareyle başlayan gruplar hâlinde sıkıştırılır, dolayısıyla giriş noktanız grubun ortasına düşerse dosya, kareleri bir önceki anahtar kareye kadar taşır. Oynatma yine tam işaretlediğiniz yerden başlar, ama dosya aynı aralığın yeniden kodlanmışından büyük olabilir.',
      },
      {
        q: 'Ne zaman yeniden kodlamalı?',
        a: 'Mümkün olan en küçük dosyayı ya da farklı bir biçimi istediğinizde. Yeniden kodlarken yalnızca seçtiğiniz kareler yazılır, bu yüzden grup ortasındaki bir kesme belirgin biçimde hafifler: testlerde aynı üç saniye için 6,7 MB\'a karşı 4,1 MB. Bedeli bir nesil sıkıştırmadır ve burada kullanılan kalitede fark edilmez.',
      },
      {
        q: 'Belirli bir boyuta göre kesebilir mi?',
        a: 'Evet — «bir boyuta sığdır» seçin ve bir sınır belirleyin, örneğin Discord için 10 MB ya da e-posta için 25 MB. Gereken bit hızı seçiminizin uzunluğundan çıkar, dolayısıyla daha kısa bir seçim aynı sınıra daha çok kalite sığdırır. İlk geçiş şaşarsa düzeltilip bir kez yinelenir.',
      },
      {
        q: 'Ses korunuyor mu?',
        a: 'Evet, eşzamanlı ve aynı aralığa kesilmiş olarak. «Sesi kaldır» kutusuyla bilerek atabilirsiniz — klip sesin istenmediği bir yere gidiyorsa işe yarar ve dosyayı da küçültür.',
      },
      {
        q: 'Hangi dosyalar çalışır?',
        a: 'H.264\'lü MP4 ve MOV ile WebM — tarayıcınızın hem çözebildiği hem kodlayabildiği her şey. ProRes ya da ham gibi kamera biçimlerini tarayıcı genellikle hiç açamaz; önce bir vekil dosya oluşturun.',
      },
    ],
  },

  'video-to-mp3': {
    searchPhrase: 'Video MP3 dönüştürücü',
    title: 'Video MP3 Dönüştürücü — ücretsiz, çevrimiçi, hiçbir şey yüklenmeden',
    description:
      'Ücretsiz çevrimiçi video-MP3 dönüştürücü. MP4, MOV veya WebM içindeki sesi MP3, WAV ya da OGG olarak tamamen tarayıcınızda çıkarın: yükleme yok, boyut sınırı yok, filigran ve kayıt yok.',
    heading: 'Video',
    accent: 'MP3',
    lede: 'Videodaki sesi çıkarın ve MP3, WAV ya da OGG olarak saklayın. Hiçbir şey yüklenmez — dönüştürme sizin makinenizde olur.',
    blurb: 'Videodaki sesi çıkarın ve MP3, WAV ya da OGG olarak saklayın.',
    featureList: [
      'MP4, MOV ve WebM içinden ses çıkarır',
      'MP3, WAV ve OGG çıktısı',
      'Bit hızı ve mono seçimi',
      'Tümü tarayıcıda — yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Tarayıcı dosyayı çözer ve sesi yerelde kodlar, dolayısıyla hiçbir şey dışarı çıkmaz. Burada bu, çoğu dönüştürmeden daha önemlidir: bir videodan sesi çıkarmanın nedeni çoğu zaman videonun kişisel olmasıdır — bir ders, bir söyleşi, kendi kaydınız — ve dizüstünüzün kendi başına yanıtladığı bir soru için kimsenin sunucusuna uğraması gerekmez.',
      },
      {
        q: 'Hangi biçimi seçmeliyim?',
        a: 'Bir yere gidecekse MP3: her şey oynatır ve 192 kbps\'de konuşma için şeffaf, müzik için buna yakındır. Ses bir kurgu programına ya da deşifre aracına gidiyorsa WAV, çünkü sıkıştırılmamıştır ve hiçbir şey kaybetmez. OGG (Vorbis) aynı kalitede MP3\'ten küçüktür ama tarayıcılar ve Android dışında daha az desteklenir.',
      },
      {
        q: 'Hangi bit hızı gerekir?',
        a: 'Konuşma için 96–128 kbps fazlasıyla yeter ve dosyayı varsayılanın yarısına indirir. Müzik için 192 kbps alışılmış tatlı noktadır, 320 ise MP3\'ün üst sınırı. Kaynağın kaydedildiğinden fazlasını istemek hiçbir şey kazandırmaz: 128 kbps\'lik bir podcast\'i 320 kbps\'ye çevirmek, kulağa birebir aynı gelen iki buçuk kat büyük bir dosya üretir.',
      },
      {
        q: 'WAV dosyam neden bu kadar büyük?',
        a: 'Çünkü sıkıştırılmamıştır — içeriği ne olursa olsun 44,1 kHz stereoda dakikada yaklaşık 10 MB. Amacı da budur: hiçbir şey atılmaz. Boyut sorun oluyorsa ve ses bir kurgu programına gitmiyorsa, MP3 yirmide bir yer kaplar ve farkı duymazsınız.',
      },
      {
        q: 'Videonun yalnızca bir bölümünü dönüştürebilir miyim?',
        a: 'Bu sayfada hayır — dosyanın tamamını dönüştürür. Videoyu önce kesiciyle kırpıp çıkanı dönüştürün ya da hepsini dönüştürüp sesi götürdüğünüz yerde kesin.',
      },
    ],
  },

  'remove-audio-from-video': {
    searchPhrase: 'Videodan ses silme online',
    title: 'Videodan Sesi Kaldır Online Ücretsiz — yeniden kodlama yok',
    description:
      'Videonun sesini online ve ücretsiz kaldırın: ses parçası çıkarılır, görüntü yeniden kodlanmadan kopyalanır, kalite aynı kalır. Her şey tarayıcıda, yükleme ve filigran yok.',
    heading: 'Sesi kaldır',
    accent: 'videodan',
    lede: 'Ses parçasını çıkarın, görüntüye dokunmayın. Hiçbir şey yüklenmez, yeniden kodlanmaz.',
    blurb: 'Sessiz video: ses parçası çıkarılır, görüntü kalite kaybı olmadan kopyalanır.',
    featureList: [
      'MP4, MOV ve WebM dosyalarından sesi kaldırır',
      'Görüntüyü yeniden kodlamadan kopyalar: aynı kalite, saniyeler içinde',
      'Her şey tarayıcıda: yükleme yok, filigran yok, boyut sınırı yok',
    ],
    faq: [
      {
        q: 'Video kalitesi düşer mi?',
        a: 'Hayır. Görüntü yeni dosyaya kare kare aktarılır; yalnızca ses parçası dışarıda kalır. Tarayıcı bu codec’i kapsayıcıya kopyalayamazsa araç görüntüyü yeniden kodlar ve bunu söyler.',
      },
      {
        q: 'Videom bir yere yükleniyor mu?',
        a: 'Hayır. Dosyayı tarayıcınız WebCodecs ile okur ve yazar; cihazınızdan hiçbir şey çıkmaz. Bu yüzden tarayıcı belleği dışında boyut sınırı yoktur.',
      },
      {
        q: 'Sesi ayrı bir dosya olarak saklayabilir miyim?',
        a: 'Evet, bu sitedeki videodan MP3 aracıyla: tersini yapar, sesi tutar ve görüntüyü atar.',
      },
    ],
  },
  'rotate-video': {
    searchPhrase: 'Video döndürme online',
    title: 'Video Döndür Online Ücretsiz — 90° veya ayna, yeniden kodlama yok',
    description:
      'Videoyu online ve ücretsiz olarak 90°, 180° veya 270° döndürün ya da aynalayın. Dönüş dosyaya yeniden kodlamadan yazılır, kalite aynı kalır; ya da dönüşü tanımayan oynatıcılar için karelere işleyin. Tarayıcıda, yükleme yok.',
    heading: 'Döndür',
    accent: 'video',
    lede: 'Yan çekilmiş bir videoyu saniyeler içinde düzeltin. Hiçbir şey yüklenmez ve varsayılan olarak yeniden kodlanmaz.',
    blurb: 'Yan çekilmiş videoyu döndürün veya aynalayın, yeniden kodlamadan.',
    featureList: [
      '90° sağa, 90° sola veya 180° döndürme ve yatay aynalama',
      'Varsayılan olarak kayıpsız: dönüş dosyada saklanır, kareler kopyalanır',
      'İsteğe bağlı: dönüşü tanımayan oynatıcılar için karelere işleme',
    ],
    faq: [
      {
        q: 'Döndürmek kaliteyi düşürür mü?',
        a: 'Varsayılan olarak hayır. Video dosyası oynatıcıların okuduğu bir dönüş işareti taşır: araç bu işareti ayarlar ve kareleri olduğu gibi kopyalar. «Karelere işle» seçilirse görüntü yeniden kodlanır ve bir kez biraz kalite kaybeder.',
      },
      {
        q: 'Neden bazı uygulamalarda hâlâ yan?',
        a: 'Bazı oynatıcılar ve yükleme formları dönüş işaretini yok sayar. Onlar için «karelere işle» seçili olarak tekrar döndürün.',
      },
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Dosyayı tarayıcınız WebCodecs ile okur ve yazar; cihazınızdan hiçbir şey çıkmaz.',
      },
    ],
  },
  'video-info': {
    searchPhrase: 'Video bit hızı öğrenme online',
    title: 'Video ve Ses Bit Hızını Online Öğren Ücretsiz — codec, FPS, çözünürlük',
    description:
      'Bir video veya ses dosyasının bit hızını, codec’ini, kare hızını, çözünürlüğünü, HDR’sini ve örnekleme hızını online ve ücretsiz öğrenin. Tarayıcıda okunur: dosya yüklenmez.',
    heading: 'Video',
    accent: 'bilgisi',
    lede: 'Bir dosya bırakın ve içinde ne olduğunu görün: bit hızı, codec, FPS, çözünürlük, ses. Hiçbir şey yüklenmez.',
    blurb: 'Her dosyanın bit hızı, codec’i, FPS’i, çözünürlüğü ve ses bilgisi.',
    featureList: [
      'Toplam, video ve ses bit hızı',
      'Codec, çözünürlük, FPS, dönüş ve HDR',
      'Ses kanalları ve örnekleme hızı',
      'Her şey tarayıcıda: yükleme yok',
    ],
    faq: [
      {
        q: 'Bit hızı nasıl ölçülüyor?',
        a: 'Dosyanın kendisinden: her parçanın paket boyutları süresine bölünür, en fazla 600 paket okunur. Toplam bit hızı dosya boyutunun süreye bölümüdür ve kapsayıcıyı da içerir.',
      },
      {
        q: 'Dosyam yükleniyor mu?',
        a: 'Hayır. Tarayıcı yalnızca gereken kısımları okur; cihazınızdan hiçbir şey çıkmaz.',
      },
    ],
  },
  'crop-video': {
    searchPhrase: 'Video kırpma online',
    title: 'Video Kırp Online Ücretsiz — Reels ve TikTok için 9:16, 1:1, 4:5',
    description:
      'Videoyu Reels, TikTok ve Shorts için 9:16’ya ya da 1:1, 4:5 veya 16:9’a online ve ücretsiz kırpın. Önemli kısmı tutmak için çerçeveyi kaydırın. Tarayıcıda, yükleme ve filigran yok.',
    heading: 'Kırp',
    accent: 'video',
    lede: 'Yatay bir klibi dikey ya da kare yapın ve hangi kısmın kalacağını seçin. Hiçbir şey yüklenmez.',
    blurb: 'Yatay videoyu Reels, TikTok ve Shorts için 9:16’ya ya da kareye kırpın.',
    featureList: [
      '9:16, 1:1, 4:5 ve 16:9 biçimleri',
      'Konuyu kadrajda tutmak için çerçeveyi kaydırın',
      'Kırpılan alanın özgün çözünürlüğü korunur',
      'Her şey tarayıcıda: yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Yatay videoyu Reels veya TikTok için nasıl dikey yaparım?',
        a: '9:16’yı seçin, çerçeveyi tutmak istediğiniz kısma kaydırın ve kırpın. Videonuzun en yüksek 9:16 alanını kendi boyutunda alırsınız; Instagram ve TikTok onu tam ekrana büyütür.',
      },
      {
        q: 'Kalite düşer mi?',
        a: 'Kalan pikseller büyütülmez, ama kırpma her zaman görüntüyü yeniden kodlar; bu bir kez biraz kaliteye mal olur.',
      },
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Tarayıcınız videoyu WebCodecs ile çözer, kırpar ve kodlar; cihazınızdan hiçbir şey çıkmaz.',
      },
    ],
  },
  'video-to-gif': {
    searchPhrase: 'Videoyu GIF yapma online',
    title: 'Videodan GIF Yap Online Ücretsiz — yükleme ve filigran olmadan MP4’ten GIF',
    description:
      'Videoyu online ve ücretsiz GIF’e dönüştürün: başlangıcı, süreyi, saniyedeki kare sayısını ve genişliği seçin. MP4, MOV ve WebM. Tarayıcıda yapılır: hiçbir şey yüklenmez, filigran yok.',
    heading: 'Videodan',
    accent: 'GIF',
    lede: 'Bir anı seçin ve GIF yapın. Video cihazınızda kalır.',
    blurb: 'Birkaç saniyelik videoyu GIF yapın: başlangıç, süre, FPS ve genişlik.',
    featureList: [
      'MP4, MOV ve WebM’den GIF',
      'Başlangıç, en fazla 15 sn, 10–20 FPS, 320–640 px genişlik',
      'Her kareye ayrı palet: renkler bozulmaz',
      'Her şey tarayıcıda: yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'GIF’i nasıl küçültürüm?',
        a: 'Daha kısa, daha dar ve daha az FPS, bu sırayla. 480 px ve 15 FPS’lik 4 saniyelik GIF genelde 2–6 MB’dır; 320 px ve 10 FPS’te üçte biri.',
      },
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Tarayıcınız kareleri okur ve GIF’i kendisi yazar; cihazınızdan hiçbir şey çıkmaz.',
      },
    ],
  },
  'add-music-to-video': {
    searchPhrase: 'Videoya müzik ekleme online',
    title: 'Videoya Müzik Ekle Online Ücretsiz — filigran ve yükleme yok',
    description:
      'Videoya online ve ücretsiz müzik ekleyin: bir MP3 veya M4A seçin, şarkının başlayacağı saniyeyi ve sondaki kısılmayı belirleyin. Görüntü yeniden kodlanmadan kopyalanır, şarkı video süresine kesilir. Tarayıcıda.',
    heading: 'Videoya',
    accent: 'müzik ekle',
    lede: 'Şarkınızı klibin altına koyun: süreye göre kesilmiş ve sonda kısılan. Hiçbir şey yüklenmez.',
    blurb: 'Videonun altına şarkı: süresine göre, sonda kısılarak, görüntü yeniden kodlanmadan.',
    featureList: [
      'MP3, M4A, WAV, OGG ya da başka bir videonun sesi',
      'Şarkının başlangıcını seçin; 0–4 sn kısılma',
      'Görüntü olduğu gibi kopyalanır: aynı kalite, hızlı',
      'Her şey tarayıcıda: yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Videonun orijinal sesi kalır mı?',
        a: 'Hayır: müzik onun yerini alır.',
      },
      {
        q: 'Şarkı videodan kısaysa?',
        a: 'Müzik bir kez çalar, videonun kalanı sessiz olur; araç müziğin nerede bittiğini söyler.',
      },
      {
        q: 'Videoyu şarkının ritmine göre kesebilir mi?',
        a: 'Bu sayfa değil: şarkıyı tek bir klibin altına olduğu gibi koyar. Birden çok klibi ritme göre kesmek Life2Film iPhone uygulamasının işidir.',
      },
    ],
  },
  'merge-videos': {
    searchPhrase: 'Video birleştirme online',
    title: 'Video Birleştir Online Ücretsiz — MP4 ve MOV klipleri yükleme ve filigran olmadan',
    description:
      'Videoları online ve ücretsiz birleştirin: iki veya daha fazla MP4, MOV ya da WebM klibi seçtiğiniz sırayla tek dosyada toplayın. Farklı boyutlar tek kadraja oturtulur. Tarayıcıda, yükleme ve filigran yok.',
    heading: 'Videoları',
    accent: 'birleştir',
    lede: 'Klipleri art arda dizin ve tek bir video alın. Cihazınızdan hiçbir şey çıkmaz.',
    blurb: 'İki veya daha fazla videoyu istediğiniz sırayla tek dosyada birleştirin.',
    featureList: [
      'Sınırsız sayıda MP4, MOV ve WebM klip',
      'Birleştirmeden önce sırayı değiştirin',
      'Farklı biçimdeki klipler siyah bantlarla oturtulur',
      'Sessiz klipler sessizlik ekler: görüntü ve ses kaymaz',
      'Her şey tarayıcıda: yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Farklı boyutlarda veya telefonlardan videolar birleşir mi?',
        a: 'Evet. Her kare ilk klibin kadrajına oturtulur (biçim farklıysa siyah bantlarla) ve film bir kez kodlanır.',
      },
      {
        q: 'En iyi kısımları seçip müziğe göre kesebilir mi?',
        a: 'Bu sayfa değil: klipleri bütün olarak birleştirir. En iyi anları seçip bir şarkıya göre kesmek Life2Film iPhone uygulamasının işidir.',
      },
    ],
  },
  'video-speed': {
    searchPhrase: 'Video hızlandırma online',
    title: 'Video Hızını Değiştir Online Ücretsiz — hızlandır veya ağır çekim',
    description:
      'Videoyu online ve ücretsiz hızlandırın (1,25×–8×) ya da yavaşlatın (0,25×–0,75×). Sesi görüntüyle birlikte hızlandırarak tutun ya da kaldırın. Tarayıcıda: hiçbir şey yüklenmez, filigran yok.',
    heading: 'Video',
    accent: 'hızı',
    lede: 'Bir videoyu birkaç tıklamayla hızlandırın ya da yavaşlatın. Cihazınızdan hiçbir şey çıkmaz.',
    blurb: 'Videoyu 8×’e kadar hızlandırın ya da 0,25×’e kadar yavaşlatın, sesli veya sessiz.',
    featureList: [
      '0,25× ağır çekimden 8× hızlıya',
      'Ses görüntüyle birlikte ayarlanır ya da kaldırılır',
      'Her kare kendi görüntüsünü korur: hiçbir şey karıştırılmaz',
      'Her şey tarayıcıda: yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Ağır çekim akıcı olur mu?',
        a: 'Her gerçek kare daha uzun gösterilir: 30 fps klip 0,5×’te 15 fps olur. Akıcı ağır çekim 120 veya 240 fps çekilmiş videodan çıkar.',
      },
      {
        q: 'Sese ne olur?',
        a: '«Sesi koru» seçiliyse görüntüyle birlikte hızlanır ya da yavaşlar ve tonu bir kaset gibi yükselir ya da alçalır.',
      },
    ],
  },
  'screen-recorder': {
    searchPhrase: 'Ekran kaydı online',
    title: 'Online Ekran Kaydedici Ücretsiz — kurulum, filigran ve süre sınırı yok',
    description:
      'Ekranınızı online ve ücretsiz kaydedin: tüm ekran, bir pencere ya da bir tarayıcı sekmesi, sistem sesi ve mikrofonla. Kurulum, filigran ve süre sınırı yok, hiçbir şey yüklenmez: kayıt bilgisayarınıza MP4 veya WebM olarak kaydedilir.',
    heading: 'Ekran',
    accent: 'kaydı',
    lede: 'Ekranınızı tarayıcıda kaydedin, dosya bilgisayarınıza gelsin. Hiçbir şey kurulmaz ya da yüklenmez.',
    blurb: 'Ekranı, bir pencereyi ya da sekmeyi ses ve mikrofonla doğrudan dosyaya kaydedin.',
    featureList: [
      'Tüm ekran, bir pencere ya da sekme',
      'Sekme veya sistem sesi ile mikrofon tek parçada',
      'Tarayıcı destekliyorsa MP4 (Chrome, Edge, Safari), değilse WebM',
      'Süre sınırı ve filigran yok',
    ],
    faq: [
      {
        q: 'Süre sınırı ya da filigran var mı?',
        a: 'Hiçbiri yok. Kaydı tarayıcınız yapar ve bilgisayarınıza kaydeder.',
      },
      {
        q: 'Bilgisayarın sesini kaydedebilir mi?',
        a: 'Chrome ve Edge’de evet: bir sekmeyi «Sekme sesini paylaş» ile ya da Windows’ta tüm ekranı «Sistem sesini paylaş» ile paylaşın.',
      },
      {
        q: 'Telefonda çalışır mı?',
        a: 'Hayır. Mobil tarayıcılar ekranı paylaşamaz.',
      },
    ],
  },
  'audio-cutter': {
    searchPhrase: 'MP3 kesme online',
    title: 'MP3 Kes Online Ücretsiz — şarkı kes, zil sesi yap, yükleme yok',
    description:
      'MP3, M4A, WAV, OGG veya FLAC dosyasını online ve ücretsiz kesin: dinleyin, başlangıcı ve sonu işaretleyin, yumuşak geçiş ekleyin, MP3 veya WAV olarak kaydedin. Zil sesi ve reels için uygun. Tarayıcıda: hiçbir şey yüklenmez.',
    heading: 'Ses',
    accent: 'kes',
    lede: 'Dinleyin, başı ve sonu işaretleyin, parçayı kaydedin. Şarkı cihazınızdan çıkmaz.',
    blurb: 'Zil sesi, reels ya da kurgu için şarkıdan parça kesin, yumuşak geçişle.',
    featureList: [
      'MP3, M4A, WAV, OGG, FLAC ya da bir videonun sesi',
      'Başlangıç ve son oynatıcıdan',
      'İki uçta yarım saniyelik geçiş, tıkırtı yok',
      'MP3 (192 kbps) veya WAV olarak kaydet',
    ],
    faq: [
      {
        q: 'Şarkıdan zil sesi nasıl yapılır?',
        a: '20–30 saniyeyi geçişle kesip MP3 olarak kaydedin. Android’de Ringtones klasörüne koyun ya da Ayarlar’dan seçin.',
      },
      {
        q: 'Şarkım yükleniyor mu?',
        a: 'Hayır. Tarayıcınız sesi kendisi çözer ve kodlar.',
      },
    ],
  },
  'audio-converter': {
    searchPhrase: 'Ses dönüştürücü online',
    title: 'Ses Dönüştürücü Online Ücretsiz — M4A, WAV, FLAC’tan MP3’e, yükleme yok',
    description:
      'Sesi online ve ücretsiz dönüştürün: M4A, WAV, FLAC, OGG, AAC ya da bir videonun sesini seçtiğiniz bit hızında MP3, WAV veya OGG’ye. Tarayıcıda, yükleme ve boyut sınırı yok.',
    heading: 'Ses',
    accent: 'dönüştürücü',
    lede: 'Bir ses dosyasının biçimini hiçbir yere göndermeden değiştirin.',
    blurb: 'M4A, WAV, FLAC, OGG ve diğerlerini MP3, WAV veya OGG’ye, istediğiniz bit hızında.',
    featureList: [
      'Giriş: M4A, WAV, FLAC, OGG, AAC, MP3 ve videolar',
      'Çıkış: bit hızı seçimiyle MP3, WAV veya OGG',
      'Her şey tarayıcıda: yükleme ve sınır yok',
    ],
    faq: [
      {
        q: 'M4A nasıl MP3’e dönüştürülür?',
        a: 'M4A dosyasını bırakın, MP3 ve bit hızını seçin (192 kbps iyi bir varsayılan) ve dönüştürün. iPhone sesli notları da M4A’dır.',
      },
      {
        q: 'Daha yüksek bit hızı sesi iyileştirir mi?',
        a: 'Hayır. Dosya sıkıştırılırken kaybettiğini geri kazanamaz; yalnızca büyür.',
      },
    ],
  },
  'reverse-video': {
    searchPhrase: 'Videoyu tersine çevirme online',
    title: 'Videoyu Tersine Çevir Online Ücretsiz — geriye oynat, yükleme yok',
    description:
      'Videoyu online ve ücretsiz tersine çevirin: klip geriye oynar, ses de ters çevrilebilir. 60 saniyeye kadar klipler. Tarayıcıda, yükleme yok.',
    heading: 'Videoyu',
    accent: 'tersine çevir',
    lede: 'Bir klibi geriye oynatın. Cihazınızdan hiçbir şey çıkmaz.',
    blurb: 'Klip geriye, sesi ters çevrilmiş ya da sessiz.',
    featureList: [
      '60 saniyeye kadar klipler',
      'Ses de ters çevrilir ya da kaldırılır',
      'Her şey tarayıcıda: yükleme yok',
    ],
    faq: [
      {
        q: 'Neden yalnızca 60 saniye?',
        a: 'Ters çevirmek için sonucun ilk karesinden önce tüm klibin çözülmesi gerekir; bir sekmeye bir dakika rahatça sığar.',
      },
    ],
  },
  'video-volume-booster': {
    searchPhrase: 'Video sesini yükseltme online',
    title: 'Video Sesini Yükselt Online Ücretsiz — daha yüksek, yükleme yok',
    description:
      'Sessiz bir videoyu online ve ücretsiz yükseltin: bozulmadan en yükseğe otomatik, ya da ×1.5–×4, ya da kısın. Görüntü olduğu gibi kopyalanır. Tarayıcıda, yükleme yok.',
    heading: 'Video sesini',
    accent: 'yükselt',
    lede: 'Sessiz bir klibin sesini, görüntüyü yeniden kodlamadan ve hiçbir yere göndermeden yükseltin.',
    blurb: 'Sessiz videoyu cızırtısız yükseltin ya da yüksek olanı kısın. Görüntüye dokunulmaz.',
    featureList: [
      'Otomatik: en yüksek an tam sınırın altına çıkar',
      'Ya da ×1.5, ×2, ×3, ×4 veya kısmak için ×0.5',
      'Sert kırpma yerine yumuşak sınırlayıcı, cızırtı yok',
      'Görüntü kayıpsız kopyalanır',
    ],
    faq: [
      {
        q: 'Video kalite kaybeder mi?',
        a: 'Hayır. Yalnızca ses yeniden kodlanır; görüntü olduğu gibi kopyalanır.',
      },
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Hepsini tarayıcınız yapar.',
      },
    ],
  },
  'loop-video': {
    searchPhrase: 'Video döngü online',
    title: 'Videoyu Döngüye Al Online Ücretsiz — 2-10 kez tekrarla, yükleme yok',
    description:
      'Videoyu online ve ücretsiz döngüye alın: bir klibi sesiyle birlikte tek MP4 içinde 2, 3, 4, 5 veya 10 kez tekrarlayın. Tarayıcıda, yükleme yok.',
    heading: 'Videoyu',
    accent: 'döngüye al',
    lede: 'Kısa bir klibi tekrar eden daha uzun bir klibe dönüştürün. Cihazınızdan hiçbir şey çıkmaz.',
    blurb: 'Bir klibi tek dosyada 2–10 kez, sesiyle tekrarlayın.',
    featureList: [
      '2, 3, 4, 5 veya 10 kez tekrar',
      'Ses görüntüyle birlikte tekrarlanır',
      'Her şey tarayıcıda: yükleme yok',
    ],
    faq: [
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Tarayıcınız kendisi çözer ve kodlar.',
      },
    ],
  },
  'key-finder': {
    searchPhrase: 'Şarkının tonunu bulma online',
    title: 'Şarkı Tonu Bulucu Online Ücretsiz — ton ve Camelot, yükleme yok',
    description:
      'Bir şarkının tonunu online ve ücretsiz bulun: majör ya da minör, DJ’lerin kullandığı Camelot kodu ve sonuç yakınsa ikinci tahmin. MP3, M4A, WAV, FLAC. Tarayıcıda: şarkı yüklenmez.',
    heading: 'Şarkı',
    accent: 'tonu',
    lede: 'Bir parçayı bırakın, tonunu ve Camelot kodunu alın. Analiz bilgisayarınızda yapılır.',
    blurb: 'Armonik miks için şarkının tonu ve Camelot kodu.',
    featureList: [
      'Nota adlarıyla majör ya da minör',
      'Armonik miks için Camelot kodu (8A, 8B…)',
      'İkinci tahmin ve yakın olduklarında açık uyarı',
      'Her şey tarayıcıda: yükleme yok',
    ],
    faq: [
      {
        q: 'Ne kadar doğru?',
        a: '120 parçada djay Pro’nun analiziyle karşılaştırıldı: 76’sında (%63) aynı ton, 97’sinde (%81) djay’in tonu burada gösterilen iki tondan biriydi. Hatalar çoğunlukla beşli uzaklık ya da aynı adlı majör/minör.',
      },
      {
        q: 'Şarkım yükleniyor mu?',
        a: 'Hayır. Tarayıcınız çözer ve hesaplar.',
      },
    ],
  },
  'audio-joiner': {
    searchPhrase: 'MP3 birleştirme online',
    title: 'MP3 Birleştir Online Ücretsiz — şarkıları tek dosyada topla, yükleme yok',
    description:
      'MP3, M4A, WAV, OGG veya FLAC dosyalarını online ve ücretsiz tek parçada birleştirin: sırayı belirleyin, 1-5 sn geçiş ekleyin, MP3 veya WAV olarak kaydedin. Tarayıcıda, yükleme yok.',
    heading: 'Ses',
    accent: 'birleştir',
    lede: 'Şarkıları ya da kayıtları sıraya koyun, tek dosya alın. Cihazınızdan hiçbir şey çıkmaz.',
    blurb: 'Şarkıları ya da kayıtları sırayla tek MP3 veya WAV’da birleştirin, isterseniz geçişle.',
    featureList: [
      'Sıraladığınız iki veya daha fazla dosya',
      'İsteğe bağlı 1, 3 veya 5 sn geçiş',
      'Farklı biçim ve örnekleme hızları uyumlanır',
      'Her şey tarayıcıda: yükleme yok',
    ],
    faq: [
      {
        q: 'Sesim yükleniyor mu?',
        a: 'Hayır. Tarayıcınız çözer, birleştirir ve kodlar.',
      },
    ],
  },
  'burn-subtitles': {
    searchPhrase: 'Videoya altyazı ekleme online',
    title: 'Videoya Altyazı Ekle Online Ücretsiz — SRT’yi MP4’e göm, yükleme yok',
    description:
      'Altyazıyı videoya online ve ücretsiz gömün: bir MP4 ile SRT veya VTT dosyası bırakın, boyutu ve konumu seçin, metni görüntünün içinde olan bir MP4 alın. Instagram, TikTok ve WhatsApp için. Tarayıcıda, yükleme yok.',
    heading: 'Videoya',
    accent: 'altyazı ekle',
    lede: 'SRT veya VTT’yi görüntünün içine koyun. Video ve metin cihazınızda kalır.',
    blurb: 'SRT veya VTT’yi videoya gömün, altyazı her yerde görünsün.',
    featureList: [
      'Zamanlamasıyla SRT ve WebVTT',
      'Koyu kenarlı beyaz metin, genişliğe göre kaydırılır',
      'Üç boyut, alt veya üst',
      'Her şey tarayıcıda: yükleme yok',
    ],
    faq: [
      {
        q: 'Neden gömülü altyazı?',
        a: 'Instagram, TikTok ve WhatsApp ayrı altyazı parçasını yok sayar; gömülü altyazı görüntünün parçasıdır ve her yerde görünür.',
      },
      {
        q: 'Videom yükleniyor mu?',
        a: 'Hayır. Tarayıcınız her kareyi çizer ve sonucu kodlar.',
      },
    ],
  },
  'photos-to-video': {
    searchPhrase: 'Fotoğraflardan müzikli video yapma online',
    title: 'Fotoğraftan Müzikli Video Online Ücretsiz — slayt gösterisi, yükleme yok',
    description:
      'Fotoğraflardan müzikli video yapın, online ve ücretsiz: sıra, fotoğraf başına 2, 3 veya 5 sn, yavaş yakınlaştırma ve yumuşak geçişler, Reels ve hikâyeler için 9:16, 16:9 ya da kare. Şarkı kesilir ve sonda kısılır. Tarayıcıda, yükleme yok.',
    heading: 'Fotoğraftan',
    accent: 'video',
    lede: 'Fotoğrafları sıralayın, şarkı ekleyin, MP4 alın. Cihazınızdan hiçbir şey çıkmaz.',
    blurb: 'Fotoğraflar ve bir şarkı Reels, hikâye ya da YouTube için videoya, yavaş yakınlaştırmayla.',
    featureList: [
      'Reels ve TikTok için 9:16; YouTube için 16:9; 1:1',
      'Fotoğraf başına 2, 3 veya 5 sn, yavaş yakınlaştırma, yarım saniyelik geçişler',
      'İsteğe bağlı şarkı, kesilir ve kısılır',
      'Her şey tarayıcıda: yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Video ne kadar uzun olur?',
        a: 'Fotoğraf × fotoğraf başına saniye: 3 saniyelik 20 fotoğraf bir dakika eder.',
      },
      {
        q: 'Bir şey yükleniyor mu?',
        a: 'Hayır. Tarayıcınız videoyu çizer ve kodlar.',
      },
    ],
  },
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
  'video-converter': {
    searchPhrase: 'Video dönüştürücü online',
    title: 'Video Dönüştürücü Online Ücretsiz — MP4, WebM, MOV, yükleme yok',
    description:
      'MP4, WebM ve MOV için ücretsiz çevrimiçi video dönüştürücü; sesi WAV olarak da çıkarabilirsiniz. WebCodecs ile tarayıcınızda dönüştürür: yükleme yok, boyut sınırı yok, filigran ve kayıt yok.',
    heading: 'Video',
    accent: 'Dönüştürücü',
    lede: 'Dosyayı kimseye vermeden biçim değiştirin. MP4, WebM, MOV — ya da yalnızca sesi çıkarın.',
    blurb: 'MP4, WebM ve MOV her yöne — ya da sesi WAV olarak çıkarın.',
    featureList: [
      'MP4, WebM ve MOV arasında dönüştürme',
      'Sesi WAV olarak çıkarma',
      'Dönüştürürken isteğe bağlı yeniden boyutlandırma',
      'Tümü tarayıcıda — yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Hangi dönüştürmeler destekleniyor?',
        a: 'MP4, WebM ve MOV arasında, ayrıca bunların herhangi birinden WAV sese. Gerçekte neyin çalışacağı tarayıcınıza bağlıdır, çünkü kodlamayı o yapar: Chrome ve Edge daha geniş alan kaplar, Safari MP4 ve MOV\'u iyi kotarır. Araç başlamadan önce denetler ve bir birleşim yoksa yarı yolda çökmek yerine bunu söyler.',
      },
      {
        q: 'Kameramdan çıkan MOV\'u tarayıcı neden açmıyor?',
        a: 'Bir .mov kapsayıcıdır; önemli olan içindeki kodektir. Tarayıcılar H.264 ve giderek HEVC ile başa çıkar, ama ProRes, DNxHD ya da ham kamera biçimleriyle çıkamaz — profesyonel kameraların bir .mov içine genellikle yazdığı da bunlardır. Bunlar önce bir masaüstü programında gerçek bir dönüştürme ister.',
      },
      {
        q: 'Dönüştürmek kaliteyi düşürür mü?',
        a: 'MP4 ile MOV arasında kapsayıcı değiştirmek çoğu zaman videoya hiç dokunmadan yapılabilir. Kodek değiştirmek — örneğin WebM\'e — yeniden kodlamayı gerektirir ve yeniden kodlamanın her zaman bir bedeli vardır. Tek nesilde genellikle görünmez, ama aynı dosyayı üst üste dönüştürürseniz birikir.',
      },
      {
        q: 'Bir şey yükleniyor mu?',
        a: 'Hayır. Dönüştürme tarayıcınızda WebCodecs ile yapılır. Bunun anlamı şudur: büyük bir dosyayı yükleyip kuyrukta bekleyip geri indirmek, yerelde yapmaktan yavaştır ve yol boyunca dosya bir yabancının diskinde durur.',
      },
    ],
  },

  'video-splitter': {
    searchPhrase: 'Video bölme online',
    title: 'Videoyu Parçalara Bölme Online Ücretsiz — eşit parçalar ya da sahne değişimleri',
    description:
      'Uzun bir videoyu her 30 saniyede bir yerine plan değişimlerinden parçalara bölen ve görüntü kalitesine göre sıralayan ücretsiz çevrimiçi video bölücü. Reels, Shorts ve TikTok için isteğe bağlı 9:16 kırpma. Hiçbir şey yüklenmez.',
    heading: 'Video',
    accent: 'Bölme',
    lede: 'Uzun bir videoyu, videonun kendisinin değiştiği yerden başlayan kliplere bölün — her otuz saniyede bir değil. Her şey sizin makinenizde olur.',
    blurb: 'Uzun bir videoyu, plan değişiminde başlayan ve görüntü kalitesine göre sıralanan Reels ya da Shorts kliplerine bölün.',
    featureList: [
      'Sabit aralıkla değil, plan değişimlerinde keser',
      'Klipler görüntü kalitesine göre sıralanır',
      'Reels, Shorts ve TikTok için isteğe bağlı 9:16 kırpma',
      'Tümü tarayıcıda — yükleme ve filigran yok',
    ],
    faq: [
      {
        q: 'Diğer video bölücülerden farkı ne?',
        a: 'Çoğu her N saniyede bir keser, dolayısıyla bir klip cümlenin ortasında başlayıp hareketin ortasında bitebilir. Bu araç videonun zaten sahip olduğu kesmeleri — plan değişimlerini — bulur ve klipleri bütün planlardan kurar. Yaklaşık süreyi yine siz seçersiniz; sınırlar kronometre yerine en yakın gerçek değişime oturur.',
      },
      {
        q: 'Kliplerin yanındaki yıldızlar ne?',
        a: 'Motor, örneklenen her kareyi keskinlik, pozlama, kontrast, renklilik ve ayrıntı bakımından puanlar; her klip de içindeki planların süreye göre ağırlıklı ortalamasını alır. Yıldızlar o videonun en iyi klibine görelidir, mutlak bir ölçek değil: önce nereye bakmak gerektiğini önerirler, neyin ilginç olduğuna karar vermezler.',
      },
      {
        q: 'Dikey kırpma insanları kadraj dışında bırakır mı?',
        a: 'Karenin merkezini alır; çoğu zaman doğrudur, özne bir kenardaysa yanlıştır. Burada henüz yüz takibi yok, bu yüzden paylaşmadan önce önizlemelere bakın. Plan genişse elle kırpmak genellikle daha iyi sonuç verir.',
      },
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Tarayıcı videoyu çözer, WebAssembly kareleri çözümler ve klipler WebCodecs ile yerelde kodlanır — tarayıcınızın video oynatırken kullandığı donanım yolunun aynısı. Hiçbir şey hiçbir yere gönderilmez; plan sınırları, kuyruklar ve filigranlar da bu yüzden yoktur.',
      },
    ],
  },

  'bpm-detector': {
    searchPhrase: 'BPM bulucu online',
    title: 'BPM Bulucu Online Ücretsiz — bir şarkının temposu ve her vuruşu',
    description:
      'Ücretsiz çevrimiçi BPM bulucu: bir parçanın temposunu ve her vuruşun tam zamanını tarayıcınızda öğrenin. Vuruş ızgarasını DaVinci Resolve, Premiere, Final Cut ya da Audacity\'ye aktarın. Hiçbir şey yüklenmez.',
    heading: 'BPM',
    accent: 'Bulucu',
    lede: 'Bir parça bırakın. Temposunu ve her vuruşun tam zamanını alın — kendi makinenizde hesaplanır, hiçbir yere yüklenmeden.',
    blurb: 'Bir parçanın temposunu ve her vuruşun zamanını bulun, ızgarayı Resolve, Premiere, Final Cut ya da Audacity\'ye işaret olarak gönderin.',
    featureList: [
      'Tempo (BPM) tespiti',
      'Her vuruşun zaman damgası',
      'Tümü tarayıcıda — yükleme yok',
      'EDL, OTIO, FCPXML, Audacity etiketleri, CSV ve JSON dışa aktarımı',
      'Projenin kare hızına göre zaman kodu',
    ],
    faq: [
      {
        q: 'Sesim bir yere yükleniyor mu?',
        a: 'Hayır. Çözümleme tarayıcınızın içinde WebAssembly olarak çalışır. Dosya diskten belleğe okunur ve ağ üzerinden hiç çıkmaz: ağ sekmesini açarak ya da sayfa yüklendikten sonra bağlantıyı keserek doğrulayabilirsiniz.',
      },
      {
        q: 'Ne kadar isabetli?',
        a: 'Atak gücü çözümlemesini dinamik programlamayla vuruş takibiyle birlikte kullanır — yerleşik müzik bilgisi erişimi araçlarındaki yaklaşımın ve Life2Film\'in kurgu motorunu çalıştıran kodun aynısı. Nabzı düzenli müzikte bir vuruş içinde isabet eder. Rubatoda, metronomsuz canlı kayıtlarda ya da yoğun senkoplu malzemede sayıyı bir başlangıç noktası sayın.',
      },
      {
        q: '«Yarım ya da iki katı tempo» ne demek?',
        a: 'Tempo doğası gereği belirsizdir: 140 BPM\'lik bir parça, yarım zamanda sayıldığında doğru biçimde 70 BPM\'dir de. Bulucular sinyalde hangisi güçlüyse onu seçer. Sayı tam iki katı kadar yanlış geliyorsa olan budur ve ihtiyacınız olanı alabilmeniz için iki okuma da gösterilir.',
      },
      {
        q: 'Vuruşları kurgu programımda kullanabilir miyim?',
        a: 'Dışa aktarma tam da bunun için. DaVinci Resolve ya da Premiere için EDL seçin: her vuruş zaman çizelgesine adlandırılmış bir işaret olarak gelir. Final Cut FCPXML alır. OTIO da Resolve, Avid ve Premiere\'de çalışır ve vuruşlar doğrudan zaman çizelgesi yerine bir üretim hattına gidiyorsa doğru seçimdir. Audacity etiket dışa aktarımını okur; CSV ve JSON ise tabloları ve betikleri karşılar.',
      },
      {
        q: 'Kare hızı neden önemli?',
        a: 'Vuruşlar saniyenin kesirlerine düşer; zaman çizelgeleri ise tam kare sayar. Her işaret, gideceği projenin en yakın karesine yuvarlanır, dolayısıyla 25 fps\'de dışa aktarılmış bir ızgara 30 fps\'lik bir dizide 20 ms\'ye kadar kayar. Hızı projenizinkine ayarlayın, işaretler tam vuruşun olduğu yere otursun. CSV ve JSON\'u etkilemez; onlarda ham saniyeler de vardır.',
      },
    ],
  },

  'scene-detector': {
    searchPhrase: 'Sahne tespiti online',
    title: 'Sahne Bulucu Online Ücretsiz — bir videodaki her kesmeyi bulun',
    description:
      'Ücretsiz çevrimiçi sahne tespiti: bir videodaki her plan değişimini küçük resimler ve zaman koduyla bulun, sonra EDL, OTIO, FCPXML ya da CSV olarak dışa aktarın. Tarayıcınızda çalışır — hiçbir şey yüklenmez.',
    heading: 'Sahne',
    accent: 'Bulucu',
    lede: 'Bir video bırakın. Her kesmeyi, her plan için bir küçük resim ve zaman koduyla alın — kendi makinenizde bulunur, hiçbir şey yüklenmeden.',
    blurb: 'Bir videodaki her kesmeyi bulun; küçük resimler, zaman kodları ve kalite puanlarıyla plan listesini alın.',
    featureList: [
      'Plan sınırı tespiti',
      'Plan başına kalite puanı',
      'Her plan için küçük resim',
      'Tümü tarayıcıda — yükleme yok',
      'EDL, OTIO, FCPXML, Audacity etiketleri, CSV ve JSON dışa aktarımı',
    ],
    faq: [
      {
        q: 'Video yükleniyor mu?',
        a: 'Hayır. Tarayıcı videoyu yerelde çözer, bir tuval pikselleri okur ve WebAssembly bunları karşılaştırır. Hiçbir şey hiçbir yere gönderilmez: bu sayfanın gönderecek bir sunucusu yok. Boyut sınırı ve kuyruk da bu yüzden yok.',
      },
      {
        q: 'Kesmeleri nasıl buluyor?',
        a: 'Video boyunca kareler örnekler ve görüntünün bir örnekten diğerine ne kadar değiştiğine bakar. Kesme bir süreksizliktir: renk ve parlaklık, bir kaydırma ya da geçişteki gibi süzülmek yerine tek adımda sıçrar. Bulucu bu sıçramaları arar ve aralarındaki sınırları bildirir.',
      },
      {
        q: 'Geçişleri ve kararmaları yakalar mı?',
        a: 'Kısmen. Sert kesme apaçıktır ve güvenilir biçimde bulunur. Yavaş bir geçiş, yapısı gereği kademeli bir değişimdir — kamera hareketiyle aynı biçim — dolayısıyla biraz erken, biraz geç görünebilir ya da komşusuyla birleşebilir. Hızlı kaydırmalar da kesme gibi okunabilir. Sonucu denetlenecek bir plan listesi sayın, bir hüküm değil.',
      },
      {
        q: 'Her planın yanındaki kalite puanı ne?',
        a: 'Life2Film uygulamasının neyi tutacağına karar verirken kullandığı kare başına puanın aynısı: keskinlik, pozlama, kontrast, renklilik ve entropi tek bir sayıda birleşir. Hangi planlara ikinci kez bakmaya değeceğine dair kaba bir sıralamadır, neyin ilginç olduğuna dair bir yargı değil.',
      },
      {
        q: 'Ne kadar sürer?',
        a: 'Her örnekleme noktasına atlayarak videoyu tarar ve her atlama onlarca milisaniyeye mal olur. Bir dakikalık klip birkaç saniye sürer. Uzun videolar, bekleme makul kalsın diye daha seyrek örneklenir: plan listesi yaklaşık yarım saniyelik bir isabeti korur.',
      },
    ],
  },
};
