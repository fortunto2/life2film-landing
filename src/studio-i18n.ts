import type { Lang } from './i18n';

/** Copy for /studio, kept apart from the main bundle — it is long and page-specific. */
export const studio = {
  en: {
    metaTitle: 'Life2Film Studio — desktop video analyser (beta)',
    metaDesc:
      'Analyse large video archives on your Mac: 30 per-frame features, automatic scene segmentation, montage assembly, and direct import from Apple Photos. Runs entirely on your machine.',
    badge: 'Public beta',
    title: 'Studio',
    lede:
      'The desktop half of Life2Film. Point it at an archive of raw footage and it scores every frame, finds where the scenes actually change, and assembles a montage from the segments worth keeping. Built for the case the phone struggles with: hundreds of clips at once.',
    ctaDownload: 'Download for Mac',
    ctaReleases: 'All releases',
    ctaNote: 'Apple Silicon · macOS 13+ · free while in beta',
    shotCaption: 'Per-frame feature scores on the right, segment timeline and audio energy below the preview.',

    installTitle: 'Install',
    installBrew: 'With Homebrew:',
    installDmg:
      'Or download the DMG and drag the app into Applications. It is signed with a Developer ID and notarised by Apple, so it opens without Gatekeeper warnings, and ffmpeg is linked statically, so there is nothing to install first.',

    doesTitle: 'What it does',
    d1t: 'Scores every frame',
    d1d: 'Thirty measurements per frame, from sharpness and stability to face quality and aesthetic score. Each becomes a signal you can see and sort by.',
    d2t: 'Finds the segments',
    d2d: 'An ensemble of detectors decides where a scene genuinely changes, instead of cutting whenever the camera moves. Shots are classified by scale, close-up through wide.',
    d3t: 'Assembles the montage',
    d3d: 'Segments are ranked, trimmed and laid out to a target duration. Audio energy and beat positions shape where the cuts land.',

    photosTitle: 'Straight from Apple Photos',
    photosBody:
      'No exporting to a folder first. Studio reads your macOS Photos library directly, in two ways: a picker with the Photos sidebar when you want to choose visually, and a PhotoKit export when you want to pull a whole batch. The library stays untouched: files are copied out for analysis, never modified in place.',

    measuresTitle: 'What it measures',
    measuresSub: 'Every number below is computed locally, per frame, and exposed in the interface.',
    g1t: 'Is the shot usable',
    g1n: 'Shaky handoffs, out-of-focus starts and blown-out frames are scored down before anything else is considered.',
    g2t: 'Who and what is in it',
    g2n: 'Faces are detected with a YOLO model; quality combines detector confidence, landmark visibility and how much of the frame the face occupies, so a sharp face filling the shot outranks a distant one.',
    g3t: 'Is it composed well',
    g3n: 'Framing, subject placement and depth separation, so a deliberate shot wins over an accidental one.',
    g4t: 'How it looks',
    g4n: 'Colour and texture signatures also tell the segmenter when the scene has actually changed rather than the camera merely moving.',

    archivesTitle: 'Built for big archives',
    archivesBody:
      'A phone is fine for a day or a trip. Studio is for the folder that has been accumulating for years: it runs the analysis in a native engine, keeps the scores so a re-cut does not re-analyse anything, and lets you work through hundreds of files in one pass rather than one clip at a time.',

    betaTitle: 'Still a beta',
    betaBody:
      'The analysis engine is the mature part; the interface around it is not. Expect rough edges, missing polish and the occasional dead end. It does not touch your originals: nothing is overwritten, nothing is uploaded. Even so, do not make it the only copy of anything.',
    betaContact: 'Found something broken?',
  },

  ru: {
    metaTitle: 'Life2Film Studio — десктопный анализатор видео (бета)',
    metaDesc:
      'Разбор больших видеоархивов на Mac: 30 признаков на кадр, автоматическая нарезка на сцены, сборка монтажа и импорт прямо из Apple Photos. Всё работает на вашей машине.',
    badge: 'Открытая бета',
    title: 'Studio',
    lede:
      'Десктопная половина Life2Film. Укажите ей архив исходников — она оценит каждый кадр, найдёт, где действительно меняются сцены, и соберёт монтаж из сегментов, которые стоит оставить. Сделано для случая, с которым телефону тяжело: сотни клипов сразу.',
    ctaDownload: 'Скачать для Mac',
    ctaReleases: 'Все релизы',
    ctaNote: 'Apple Silicon · macOS 13+ · бесплатно, пока бета',
    shotCaption: 'Справа — оценки признаков по кадру, под превью — таймлайн сегментов и энергия звука.',

    installTitle: 'Установка',
    installBrew: 'Через Homebrew:',
    installDmg:
      'Или скачайте DMG и перетащите приложение в Applications. Оно подписано Developer ID и заверено у Apple, поэтому открывается без предупреждений Gatekeeper, а ffmpeg вшит статически — ставить заранее ничего не нужно.',

    doesTitle: 'Что она делает',
    d1t: 'Оценивает каждый кадр',
    d1d: 'Тридцать измерений на кадр: от резкости и стабильности до качества лица и эстетической оценки. Каждое становится сигналом, который видно и по которому можно сортировать.',
    d2t: 'Находит сегменты',
    d2d: 'Ансамбль детекторов решает, где сцена действительно сменилась, а не режет каждый раз, когда двинулась камера. Планы классифицируются по крупности — от крупного до общего.',
    d3t: 'Собирает монтаж',
    d3d: 'Сегменты ранжируются, подрезаются и раскладываются под нужную длительность. Энергия звука и позиции битов задают, куда попадут склейки.',

    photosTitle: 'Прямо из Apple Photos',
    photosBody:
      'Не нужно сначала выгружать всё в папку. Studio читает медиатеку Photos на macOS напрямую, двумя способами: пикер с боковой панелью Photos, когда хочется выбрать глазами, и экспорт через PhotoKit, когда нужно забрать пачку целиком. Медиатека остаётся нетронутой: файлы копируются для анализа, а не правятся на месте.',

    measuresTitle: 'Что она измеряет',
    measuresSub: 'Каждое число ниже считается локально, покадрово, и видно в интерфейсе.',
    g1t: 'Годится ли кадр',
    g1n: 'Тряские переходы, расфокус в начале и выбитые света отбраковываются раньше, чем оценивается всё остальное.',
    g2t: 'Кто и что в кадре',
    g2n: 'Лица находит модель YOLO; качество складывается из уверенности детектора, видимости точек лица и доли кадра, которую лицо занимает — резкое лицо крупным планом обходит далёкое.',
    g3t: 'Хорошо ли построен кадр',
    g3n: 'Композиция, положение объекта и разделение по глубине: осознанный кадр выигрывает у случайного.',
    g4t: 'Как он выглядит',
    g4n: 'Цветовые и текстурные сигнатуры заодно подсказывают сегментатору, что сцена действительно сменилась, а не просто поехала камера.',

    archivesTitle: 'Сделано под большие архивы',
    archivesBody:
      'Для одного дня или поездки хватит телефона. Studio — для папки, которая копится годами: анализ идёт в нативном движке, оценки сохраняются, поэтому пересборка монтажа не запускает разбор заново, и сотни файлов проходят за один заход, а не по клипу за раз.',

    betaTitle: 'Это всё ещё бета',
    betaBody:
      'Зрелая часть здесь — движок анализа, интерфейс вокруг него пока нет. Будут шероховатости, недоделки и тупики. Оригиналы не трогаются: ничего не перезаписывается и никуда не загружается — но единственной копией чего-либо это делать не стоит.',
    betaContact: 'Нашли поломку?',
  },

  tr: {
    metaTitle: 'Life2Film Studio — masaüstü video analiz aracı (beta)',
    metaDesc:
      "Mac'inizde büyük video arşivlerini analiz edin: kare başına 30 özellik, otomatik sahne bölümleme, kurgu birleştirme ve Apple Photos'tan doğrudan içe aktarma. Tamamı cihazınızda çalışır.",
    badge: 'Herkese açık beta',
    title: 'Studio',
    lede:
      'Life2Film’in masaüstü yarısı. Ham görüntü arşivinizi gösterin; her kareyi puanlar, sahnelerin gerçekten nerede değiştiğini bulur ve saklamaya değer bölümlerden bir kurgu çıkarır. Telefonun zorlandığı durum için yapıldı: aynı anda yüzlerce klip.',
    ctaDownload: 'Mac için indir',
    ctaReleases: 'Tüm sürümler',
    ctaNote: 'Apple Silicon · macOS 13+ · beta boyunca ücretsiz',
    shotCaption: 'Sağda kare başına özellik puanları, önizlemenin altında bölüm zaman çizelgesi ve ses enerjisi.',

    installTitle: 'Kurulum',
    installBrew: 'Homebrew ile:',
    installDmg:
      "Ya da DMG dosyasını indirip uygulamayı Applications klasörüne sürükleyin. Developer ID ile imzalı ve Apple tarafından onaylı olduğu için Gatekeeper uyarısı çıkmaz; ffmpeg statik olarak gömülüdür, önceden kurmanız gereken bir şey yok.",

    doesTitle: 'Ne yapar',
    d1t: 'Her kareyi puanlar',
    d1d: 'Kare başına otuz ölçüm: keskinlik ve sabitlikten yüz kalitesine ve estetik puana kadar. Her biri görebileceğiniz ve sıralayabileceğiniz bir sinyale dönüşür.',
    d2t: 'Bölümleri bulur',
    d2d: 'Bir dedektör topluluğu, kamera her kımıldadığında kesmek yerine sahnenin gerçekten değiştiği yeri belirler. Çekimler yakın plandan genel plana ölçeğe göre sınıflandırılır.',
    d3t: 'Kurguyu birleştirir',
    d3d: 'Bölümler sıralanır, kırpılır ve hedef süreye göre dizilir. Ses enerjisi ve vuruş konumları kesmelerin nereye düşeceğini belirler.',

    photosTitle: "Doğrudan Apple Photos'tan",
    photosBody:
      "Önce bir klasöre aktarmanıza gerek yok. Studio macOS Photos kitaplığınızı doğrudan okur, iki yolla: gözle seçmek istediğinizde Photos kenar çubuğuyla bir seçici, toplu almak istediğinizde PhotoKit dışa aktarımı. Kitaplığa dokunulmaz — dosyalar analiz için kopyalanır, yerinde değiştirilmez.",

    measuresTitle: 'Neleri ölçer',
    measuresSub: 'Aşağıdaki her sayı cihazınızda, kare başına hesaplanır ve arayüzde görünür.',
    g1t: 'Çekim kullanılabilir mi',
    g1n: 'Sallantılı geçişler, odaksız başlangıçlar ve patlamış kareler, başka hiçbir şeye bakılmadan önce elenir.',
    g2t: 'Karede kim ve ne var',
    g2n: 'Yüzler bir YOLO modeliyle bulunur; kalite, dedektör güveni, yüz noktalarının görünürlüğü ve yüzün kareyi ne kadar kapladığından oluşur — kareyi dolduran net bir yüz, uzaktakini geçer.',
    g3t: 'Kadraj iyi mi',
    g3n: 'Kompozisyon, öznenin yerleşimi ve derinlik ayrımı: bilinçli çekim, tesadüfi olanı geçer.',
    g4t: 'Nasıl görünüyor',
    g4n: 'Renk ve doku imzaları ayrıca bölümleyiciye sahnenin gerçekten değiştiğini mi yoksa kameranın mı hareket ettiğini söyler.',

    archivesTitle: 'Büyük arşivler için',
    archivesBody:
      'Bir gün ya da bir tatil için telefon yeter. Studio, yıllardır birikmiş klasör için: analiz yerel bir motorda çalışır, puanlar saklanır, böylece yeniden kurgu analizi baştan başlatmaz ve yüzlerce dosya tek seferde işlenir, klip klip değil.',

    betaTitle: 'Hâlâ beta',
    betaBody:
      'Olgun olan kısım analiz motoru; etrafındaki arayüz değil. Pürüzler, eksik cilalar ve ara sıra çıkmaz sokaklar olacak. Orijinallerinize dokunulmaz — hiçbir şeyin üzerine yazılmaz, hiçbir şey yüklenmez — ama yine de tek kopyanız burası olmasın.',
    betaContact: 'Bozuk bir şey mi buldunuz?',
  },
} as const;

export function useStudio(lang: Lang) {
  return function s(key: keyof (typeof studio)['en']): string {
    return (studio[lang] as Record<string, string>)[key] ?? studio.en[key];
  };
}
