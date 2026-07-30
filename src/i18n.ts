export const languages = { en: 'EN', ru: 'RU', tr: 'TR' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** Prefix a root-relative path with the locale (en has no prefix). */
export function localePath(lang: Lang, path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? p : `/${lang}${p === '/' ? '' : p}`;
}

export const ui = {
  en: {
    metaTitle: 'Life2Film — your camera roll, cut into a film',
    metaDesc:
      'AI montage from the videos already on your phone. Analysis runs on device; your footage never leaves it. Ask for the cut you want in plain language.',
    navPrivacy: 'Privacy',
    navSupport: 'Support',

    heroBadge: 'on-device AI montage',
    heroTitle: 'Your camera roll,<br>cut into a film.',
    heroLede:
      'Hours of clips from a trip, a birthday, a year of a kid growing up. Life2Film watches every frame, keeps the moments that carry the story, and cuts them into something worth watching.',
    ctaPrimary: 'Coming to the App Store',
    ctaNote: 'iPhone · works without an account · your videos stay on your device',

    howTitle: 'Three steps',
    h1t: 'Pick a stretch of time',
    h1d: 'Spin the wheel to a day, a month, a trip. Life2Film pulls everything you shot then.',
    h2t: 'Say what you want',
    h2d: '“Two minutes, keep the beach, skip the drive.” Plain language — no timeline, no dragging clips.',
    h3t: 'Watch it back',
    h3d: 'A cut with deliberate pacing. Not liked? Ask again and it re-cuts.',

    featTitle: 'What it actually does',
    f1t: 'Finds the moments',
    f1d: 'Scores every clip on motion, faces, framing and sound — then drops the shaky starts and the forty seconds of pavement.',
    f2t: 'Cuts to the beat',
    f2d: 'Beat detection lines the edits up with the music instead of cutting at random.',
    f3t: 'Knows who is who',
    f3d: 'Groups faces on device, so “the film about the kids” means the one about your kids.',
    f4t: 'Re-cuts on request',
    f4d: 'Change the length, the mood, what stays in. The agent recuts in seconds — no re-editing.',

    privTitle: 'Privacy is the architecture',
    privLede:
      'Your footage is personal, so it stays where it is. Scene detection, face grouping and scoring run on your iPhone. Originals are never uploaded, nothing trains a model, and there is no feed to post to.',
    privNote:
      'When the AI director plans a cut, it sees a text description of the clips — timings and short labels. Never the video itself.',
    privLink: 'Read the privacy policy',

    screensTitle: 'Inside the app',
    s1: 'Spin the year to any day you filmed',
    s2: 'Set length, style and music, then ask for changes',
    s3: 'Your whole library, filtered to what matters',
    s4: 'Trim and reorder by hand when you want to',
    macCta: 'Also on Mac',
    macNote: 'Desktop beta · Apple Silicon · free',
    footerTag: 'Made by SuperDuperAI',
    footerRights: 'All rights reserved.',

    navAbout: 'About',
    aboutTitle: 'About Life2Film',
    aboutQuote:
      'Collect experiences, not things. One day you wake up and realise your possessions carry no meaning. Only memories keep their value.',
    aboutP1:
      'Every day people record video. Almost all of it ends up in an archive nobody opens. Storage runs out, recording stops, and years quietly go missing.',
    aboutP2:
      'From a whole holiday, a few photos survive. Children grow up as if they were never small. Friends fade out of the frame entirely.',
    aboutH2: 'The editor you never have to learn',
    aboutP3:
      'Point Life2Film at an event, a trip, a month of your kid — it picks the moments worth keeping, orders them, and cuts a film. No editing skills, no timeline. What survives is not just the footage but the feeling of being there.',
    aboutH3: 'A film made of films',
    aboutP4:
      'Once you have several films, they can become one. Take a fragment from each and you get a film about a month; from months, a year; from years, a life. The calendar wheel is that idea made usable — spin to any point in time and see what is there.',
    aboutH4: 'Why it stays on your device',
    aboutP5:
      'This only works if you can trust it with everything — the unflattering takes, the family, the home. So the analysis runs on your iPhone and the footage never leaves it. Not a policy we could change later: there is no server to send it to.',
  },

  ru: {
    metaTitle: 'Life2Film — плёнка из вашей камеры',
    metaDesc:
      'ИИ-монтаж из видео, которые уже лежат в телефоне. Анализ идёт на устройстве, записи никуда не уходят. Просите нужный монтаж обычными словами.',
    navPrivacy: 'Приватность',
    navSupport: 'Поддержка',

    heroBadge: 'ИИ-монтаж на устройстве',
    heroTitle: 'Ваша галерея —<br>смонтированный фильм.',
    heroLede:
      'Часы роликов из поездки, с дня рождения, за год жизни ребёнка. Life2Film просматривает каждый кадр, оставляет то, что держит историю, и собирает из этого фильм, который хочется пересматривать.',
    ctaPrimary: 'Скоро в App Store',
    ctaNote: 'iPhone · без регистрации · видео остаются на устройстве',

    howTitle: 'Три шага',
    h1t: 'Выберите отрезок времени',
    h1d: 'Крутите круг до дня, месяца или поездки — Life2Film соберёт всё, что вы тогда снимали.',
    h2t: 'Скажите, что хотите',
    h2d: '«Две минуты, оставь пляж, убери дорогу». Обычными словами — без таймлайна и перетаскивания клипов.',
    h3t: 'Смотрите',
    h3d: 'Монтаж с продуманным ритмом. Не понравилось — попросите иначе, и он пересоберёт.',

    featTitle: 'Что он делает',
    f1t: 'Находит моменты',
    f1d: 'Оценивает каждый клип по движению, лицам, композиции и звуку — и выбрасывает тряские начала и сорок секунд асфальта.',
    f2t: 'Режет под бит',
    f2d: 'Определяет ритм и ставит склейки в музыку, а не куда придётся.',
    f3t: 'Различает людей',
    f3d: 'Группирует лица на устройстве, поэтому «фильм про детей» — это фильм именно про ваших детей.',
    f4t: 'Пересобирает по просьбе',
    f4d: 'Другая длина, другое настроение, другой набор сцен. Агент пересоберёт за секунды.',

    privTitle: 'Приватность заложена в архитектуру',
    privLede:
      'Ваши записи личные, поэтому они остаются на месте. Разбор сцен, группировка лиц и оценка кадров идут на самом iPhone. Оригиналы никуда не загружаются, на них не обучают модели, и никакой публичной ленты нет.',
    privNote:
      'Когда ИИ-режиссёр планирует монтаж, он видит текстовое описание клипов — тайминги и короткие метки. Само видео — никогда.',
    privLink: 'Политика конфиденциальности',

    screensTitle: 'Как это выглядит',
    s1: 'Крутите год до любого дня, когда снимали',
    s2: 'Задайте длину, стиль и музыку, потом просите изменить',
    s3: 'Вся библиотека, отфильтрованная до нужного',
    s4: 'Подрезать и переставить вручную, когда хочется',
    macCta: 'Ещё есть версия для Mac',
    macNote: 'Бета для десктопа · Apple Silicon · бесплатно',
    footerTag: 'Сделано в SuperDuperAI',
    footerRights: 'Все права защищены.',

    navAbout: 'О проекте',
    aboutTitle: 'О Life2Film',
    aboutQuote:
      'Собирайте впечатления, а не вещи. Однажды вы проснётесь и поймёте, что имущество не имеет значения. Ценность со временем сохраняют только воспоминания.',
    aboutP1:
      'Люди снимают видео каждый день. Почти всё это оседает в архиве, который никто не открывает. Место заканчивается, съёмка прекращается, и годы тихо пропадают.',
    aboutP2:
      'От целого отпуска остаётся пара фотографий. Дети вырастают так, будто никогда не были маленькими. Друзья просто исчезают из кадра.',
    aboutH2: 'Монтаж, которому не нужно учиться',
    aboutP3:
      'Укажите Life2Film событие, поездку или месяц из жизни ребёнка — он выберет моменты, которые стоит сохранить, расставит их по местам и соберёт фильм. Без навыков монтажа и без таймлайна. Остаётся не просто запись, а ощущение того дня.',
    aboutH3: 'Фильм из фильмов',
    aboutP4:
      'Когда фильмов становится несколько, из них получается один. Берём фрагмент из каждого — выходит фильм о месяце; из месяцев — о годе; из лет — о жизни. Круглый календарь и есть эта идея в рабочем виде: крутите к любой точке во времени и смотрите, что там.',
    aboutH4: 'Почему всё остаётся на устройстве',
    aboutP5:
      'Это работает, только если приложению можно доверить всё — неудачные дубли, семью, дом. Поэтому анализ идёт на самом iPhone, а записи никуда не уходят. Это не обещание, которое можно потом изменить: отправлять их просто некуда, сервера нет.',
  },

  tr: {
    metaTitle: 'Life2Film — galeriniz, bir filme dönüşüyor',
    metaDesc:
      'Telefonunuzdaki videolardan yapay zekâ montajı. Analiz cihazda çalışır, kayıtlarınız cihazdan çıkmaz. İstediğiniz kurguyu gündelik dille söyleyin.',
    navPrivacy: 'Gizlilik',
    navSupport: 'Destek',

    heroBadge: 'cihazda yapay zekâ montajı',
    heroTitle: 'Galeriniz,<br>kurgulanmış bir film.',
    heroLede:
      'Bir tatilden, bir doğum gününden, bir çocuğun büyüdüğü yıldan kalan saatlerce görüntü. Life2Film her kareyi izler, hikâyeyi taşıyan anları seçer ve izlemeye değer bir film çıkarır.',
    ctaPrimary: "Yakında App Store'da",
    ctaNote: 'iPhone · hesap gerekmez · videolarınız cihazınızda kalır',

    howTitle: 'Üç adım',
    h1t: 'Bir zaman aralığı seçin',
    h1d: 'Çarkı bir güne, aya ya da tatile çevirin — Life2Film o dönemde çektiğiniz her şeyi toplar.',
    h2t: 'Ne istediğinizi söyleyin',
    h2d: '"İki dakika olsun, sahil kalsın, yol çıksın." Gündelik dille — zaman çizelgesi yok, klip sürüklemek yok.',
    h3t: 'İzleyin',
    h3d: 'Temposu düşünülmüş bir kurgu. Beğenmediniz mi, yeniden isteyin; baştan kurar.',

    featTitle: 'Gerçekte ne yapıyor',
    f1t: 'Anları bulur',
    f1d: 'Her klibi hareket, yüzler, kadraj ve sese göre puanlar; sallantılı başlangıçları ve kırk saniyelik asfaltı atar.',
    f2t: 'Ritme göre keser',
    f2d: 'Vuruşları algılar ve kesmeleri rastgele değil, müziğe oturtur.',
    f3t: 'Kimin kim olduğunu bilir',
    f3d: 'Yüzleri cihazda gruplar; böylece "çocukların filmi" gerçekten sizin çocuklarınızın filmi olur.',
    f4t: 'İstek üzerine yeniden kurar',
    f4d: 'Farklı süre, farklı ton, farklı sahneler. Ajan saniyeler içinde yeniden kurar.',

    privTitle: 'Gizlilik mimarinin kendisi',
    privLede:
      'Görüntüleriniz size ait, bu yüzden yerinde kalır. Sahne analizi, yüz gruplama ve puanlama iPhone’unuzda çalışır. Orijinaller hiçbir zaman yüklenmez, hiçbir model üzerinde eğitilmez ve paylaşılacak bir akış yoktur.',
    privNote:
      'Yapay zekâ yönetmen kurguyu planlarken kliplerin metin açıklamasını görür — süreler ve kısa etiketler. Videonun kendisini asla.',
    privLink: 'Gizlilik politikasını okuyun',

    screensTitle: 'Uygulamanın içi',
    s1: 'Yılı çevirip çekim yaptığınız güne gidin',
    s2: 'Süreyi, stili ve müziği seçin, sonra değişiklik isteyin',
    s3: 'Tüm kütüphaneniz, işinize yarayana göre süzülmüş',
    s4: 'İsterseniz elle kırpın ve sırayı değiştirin',
    macCta: "Mac sürümü de var",
    macNote: 'Masaüstü beta · Apple Silicon · ücretsiz',
    footerTag: 'SuperDuperAI tarafından yapıldı',
    footerRights: 'Tüm hakları saklıdır.',

    navAbout: 'Hakkında',
    aboutTitle: 'Life2Film hakkında',
    aboutQuote:
      'Eşya değil, deneyim biriktirin. Bir gün uyanır ve sahip olduklarınızın bir anlam taşımadığını fark edersiniz. Zamanla değerini koruyan tek şey anılardır.',
    aboutP1:
      'İnsanlar her gün video çekiyor. Neredeyse tamamı kimsenin açmadığı bir arşivde kalıyor. Yer doluyor, çekim duruyor ve yıllar sessizce kayboluyor.',
    aboutP2:
      'Koca bir tatilden geriye birkaç fotoğraf kalıyor. Çocuklar hiç küçük olmamış gibi büyüyor. Arkadaşlar kareden tamamen çıkıyor.',
    aboutH2: 'Öğrenmeniz gerekmeyen kurgu',
    aboutP3:
      "Life2Film'e bir etkinliği, bir tatili ya da çocuğunuzun bir ayını gösterin; saklamaya değer anları seçsin, sıraya koysun ve bir film çıkarsın. Kurgu bilgisi yok, zaman çizelgesi yok. Geriye yalnızca görüntü değil, o günün duygusu kalır.",
    aboutH3: 'Filmlerden yapılmış bir film',
    aboutP4:
      'Elinizde birkaç film olunca hepsi tek bir filme dönüşebilir. Her birinden bir parça alın: bir ayın filmi çıkar; aylardan bir yılın; yıllardan bir ömrün. Takvim çarkı bu fikrin çalışan hâli — zamanda istediğiniz noktaya çevirin ve orada ne varsa görün.',
    aboutH4: 'Neden her şey cihazınızda kalıyor',
    aboutP5:
      'Bu ancak uygulamaya her şeyi emanet edebiliyorsanız işe yarar — kötü çekimleri, aileyi, evi. Bu yüzden analiz iPhone’unuzda çalışır ve görüntüler cihazdan çıkmaz. Sonradan değiştirilebilecek bir vaat değil: gönderilecek bir sunucu zaten yok.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}
