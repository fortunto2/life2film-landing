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

    footerTag: 'Made by SuperDuperAI',
    footerRights: 'All rights reserved.',
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

    footerTag: 'Сделано в SuperDuperAI',
    footerRights: 'Все права защищены.',
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

    footerTag: 'SuperDuperAI tarafından yapıldı',
    footerRights: 'Tüm hakları saklıdır.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}
