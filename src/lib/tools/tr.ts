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
    title: 'Video Bölme Online Ücretsiz — Reels ve Shorts olarak, sahne değişimlerinden',
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
