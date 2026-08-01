import type { Lang } from './i18n';

/** Copy for /privacy and /support. English remains the authoritative version of the policy. */
export const legal = {
  en: {
    privTitle: 'Privacy Policy',
    privUpdated: 'Last updated: July 30, 2026',
    privIntro:
      'Life2Film turns videos you already have into a montage. Those videos are personal, so the app is built to keep them where they are: on your device.',
    privStaysT: 'What stays on your device',
    privStaysP:
      "Your videos and photos are read, analysed and edited locally. Scene detection, face grouping, quality scoring and the montage itself run on your iPhone using Apple's Vision framework and the app's own on-device engine.",
    privStays1: 'Original video and photo files are never uploaded.',
    privStays2: 'Rendered montages are saved to your device and shared only when you choose to.',
    privStays3: 'The photo-library index the app builds is stored locally and removed with the app.',
    privLeavesT: 'What leaves your device',
    privLeavesP:
      'When you ask the AI director for a cut, the app sends a text description of the clips (timings, short scene labels, and your instruction) to the language-model provider you configured. No video, no photos, no audio.',
    privLeavesList: 'Supported providers, chosen by you in Settings:',
    privLeavesP2:
      'Requests are made with your API key, directly from your device to that provider. We do not proxy them and never see their contents. Each provider processes the request under its own privacy policy and retention terms, so please review the one you use. If you configure no provider, the app runs its deterministic pipeline and sends nothing at all.',
    privKeyT: 'Your API key',
    privKeyP:
      'The key you enter is stored on your device and used only to authenticate requests to the provider you selected. It is never sent to us or to anyone else.',
    privNotT: 'What we do not do',
    privSiteT: 'This website',
    privSiteP:
      'The points above describe the app. This website is separate: it uses Google Analytics to count visits and see which pages people read, with IP anonymisation on and Google advertising signals off. It also runs our own counter, on infrastructure we operate rather than a third party’s — it sets no cookie and stores nothing in your browser, because the identifier it counts you by is derived at our edge from your IP address, browser type and today’s date, is never sent back to you, and changes at midnight UTC. Your IP address itself is never stored, and the code is public. That measurement applies to the site only. The app itself carries no analytics of any kind.',
    privNot1: 'No account or sign-in is required to use the app.',
    privNot2: 'No analytics, tracking or advertising SDKs inside the app (see the website note below).',
    privNot3: 'No selling or sharing of personal data. We do not receive it in the first place.',
    privNot4: 'No training of any model on your content.',
    privPermT: 'Permissions',
    privPermP:
      'Photo library, to read the videos and photos you want in a montage and to save the result. Without it the app has nothing to edit.',
    privKidsT: 'Children',
    privKidsP:
      'Life2Film is not directed at children under 13 and does not knowingly collect information from them.',
    privChangesT: 'Changes',
    privChangesP:
      'If this policy changes, the date above changes with it. Material changes are noted on this page.',
    privContactT: 'Contact',
    privContactP: 'Questions about privacy:',

    supTitle: 'Support',
    supIntro: 'Something broken, confusing, or missing? Write to us. A real person reads it.',
    supHow:
      'When reporting a problem, include your device model, iOS version, and what you were doing when it happened. If a montage came out wrong, say roughly how many clips were involved and what you asked for.',
    supFaq: 'Common questions',
    supQ1: 'Do I need an account?',
    supA1: 'No. The app works without signing in.',
    supQ2: 'Do my videos get uploaded?',
    supA2: 'No. Analysis and editing run on your device; originals never leave it. Details in the',
    supA2Link: 'privacy policy',
    supQ3: 'Do I need an API key?',
    supA3:
      'Only for the AI director. Without one the app still builds montages with its deterministic pipeline. With one, requests go straight from your device to the provider you chose.',
    supQ4: 'Why does the app ask for photo access?',
    supA4: 'It edits videos already in your library. Without access there is nothing to work with.',
  },

  ru: {
    privTitle: 'Политика конфиденциальности',
    privUpdated: 'Обновлено: 30 июля 2026',
    privIntro:
      'Life2Film собирает монтаж из видео, которые у вас уже есть. Эти записи личные, поэтому приложение устроено так, чтобы они оставались там, где лежат: на вашем устройстве.',
    privStaysT: 'Что остаётся на устройстве',
    privStaysP:
      'Ваши видео и фото читаются, анализируются и монтируются локально. Разбор сцен, группировка лиц, оценка качества и сама сборка идут на самом iPhone — через фреймворк Apple Vision и собственный движок приложения.',
    privStays1: 'Исходные видео и фотографии никуда не загружаются.',
    privStays2: 'Готовые монтажи сохраняются на устройстве и уходят дальше, только если вы сами их отправите.',
    privStays3: 'Индекс медиатеки, который строит приложение, хранится локально и удаляется вместе с ним.',
    privLeavesT: 'Что уходит с устройства',
    privLeavesP:
      'Когда вы просите ИИ-режиссёра собрать монтаж, приложение отправляет текстовое описание клипов — тайминги, короткие метки сцен и вашу формулировку — тому провайдеру языковой модели, которого вы настроили. Ни видео, ни фотографий, ни звука.',
    privLeavesList: 'Поддерживаемые провайдеры, которых вы выбираете в настройках:',
    privLeavesP2:
      'Запросы уходят с вашим API-ключом напрямую с устройства к провайдеру. Мы их не проксируем и содержимого не видим. Каждый провайдер обрабатывает запрос по собственной политике и своим срокам хранения — стоит прочитать ту, что относится к выбранному вами. Если провайдер не настроен, приложение работает по детерминированному пайплайну и не отправляет ничего.',
    privKeyT: 'Ваш API-ключ',
    privKeyP:
      'Введённый ключ хранится на устройстве и используется только для авторизации запросов к выбранному провайдеру. Нам или кому-то ещё он не передаётся.',
    privNotT: 'Чего мы не делаем',
    privSiteT: 'Про этот сайт',
    privSiteP:
      'Всё сказанное выше относится к приложению. Сайт — отдельная история: на нём стоит Google Analytics, чтобы считать визиты и видеть, какие страницы читают. IP анонимизируется, рекламные сигналы Google отключены. Ещё на сайте работает наш собственный счётчик — на нашей инфраструктуре, а не у стороннего сервиса. Он не ставит cookie и ничего не хранит в браузере: идентификатор вычисляется на нашем крае из IP-адреса, типа браузера и сегодняшней даты, вам он никогда не передаётся и меняется в полночь UTC. Сам IP-адрес нигде не сохраняется, а код счётчика открыт. Всё это касается только сайта — в самом приложении никакой аналитики нет.',
    privNot1: 'Аккаунт и вход не нужны.',
    privNot2: 'В приложении нет аналитики, трекинга и рекламных SDK (про сайт — ниже).',
    privNot3: 'Мы не продаём и не передаём персональные данные — мы их попросту не получаем.',
    privNot4: 'На вашем контенте не обучается никакая модель.',
    privPermT: 'Разрешения',
    privPermP:
      'Медиатека — чтобы прочитать видео и фото для монтажа и сохранить результат. Без доступа приложению не с чем работать.',
    privKidsT: 'Дети',
    privKidsP:
      'Life2Film не предназначен для детей младше 13 лет и не собирает намеренно информацию о них.',
    privChangesT: 'Изменения',
    privChangesP:
      'Если политика меняется, вместе с ней меняется дата выше. О существенных изменениях сообщаем на этой странице.',
    privContactT: 'Связаться',
    privContactP: 'Вопросы о приватности:',

    supTitle: 'Поддержка',
    supIntro: 'Что-то сломалось, непонятно или чего-то не хватает? Напишите — читает живой человек.',
    supHow:
      'Если сообщаете о проблеме, укажите модель устройства, версию iOS и что делали в этот момент. Если монтаж получился не таким, напишите примерно, сколько было клипов и о чём вы просили.',
    supFaq: 'Частые вопросы',
    supQ1: 'Нужен ли аккаунт?',
    supA1: 'Нет. Приложение работает без входа.',
    supQ2: 'Мои видео куда-то загружаются?',
    supA2: 'Нет. Анализ и монтаж идут на устройстве, оригиналы его не покидают. Подробности — в',
    supA2Link: 'политике конфиденциальности',
    supQ3: 'Нужен ли API-ключ?',
    supA3:
      'Только для ИИ-режиссёра. Без него приложение всё равно собирает монтаж по детерминированному пайплайну. С ключом запросы идут прямо с устройства к выбранному вами провайдеру.',
    supQ4: 'Зачем приложение просит доступ к фото?',
    supA4: 'Оно монтирует видео, которые уже лежат в вашей медиатеке. Без доступа работать не с чем.',
  },

  tr: {
    privTitle: 'Gizlilik Politikası',
    privUpdated: 'Son güncelleme: 30 Temmuz 2026',
    privIntro:
      'Life2Film hâlihazırda sahip olduğunuz videolardan bir kurgu çıkarır. Bu videolar kişiseldir; bu yüzden uygulama onları bulundukları yerde, yani cihazınızda tutacak şekilde tasarlandı.',
    privStaysT: 'Cihazınızda kalanlar',
    privStaysP:
      "Videolarınız ve fotoğraflarınız yerel olarak okunur, analiz edilir ve kurgulanır. Sahne algılama, yüz gruplama, kalite puanlaması ve kurgunun kendisi iPhone'unuzda çalışır: Apple'ın Vision çerçevesi ve uygulamanın kendi cihaz içi motoruyla.",
    privStays1: 'Orijinal video ve fotoğraf dosyaları hiçbir zaman yüklenmez.',
    privStays2: 'Oluşturulan kurgular cihazınıza kaydedilir ve yalnızca siz paylaşmayı seçerseniz dışarı çıkar.',
    privStays3: 'Uygulamanın oluşturduğu kitaplık dizini yerel olarak saklanır ve uygulamayla birlikte silinir.',
    privLeavesT: 'Cihazınızdan çıkanlar',
    privLeavesP:
      'Yapay zekâ yönetmenden bir kurgu istediğinizde uygulama, kliplerin metin açıklamasını — süreler, kısa sahne etiketleri ve sizin isteğiniz — yapılandırdığınız dil modeli sağlayıcısına gönderir. Video yok, fotoğraf yok, ses yok.',
    privLeavesList: 'Ayarlardan seçtiğiniz desteklenen sağlayıcılar:',
    privLeavesP2:
      'İstekler sizin API anahtarınızla, doğrudan cihazınızdan sağlayıcıya gider. Bunları biz aktarmayız ve içeriklerini görmeyiz. Her sağlayıcı isteği kendi gizlilik politikası ve saklama koşullarına göre işler; kullandığınızınkini incelemeniz iyi olur. Hiçbir sağlayıcı yapılandırmazsanız uygulama deterministik hattını çalıştırır ve hiçbir şey göndermez.',
    privKeyT: 'API anahtarınız',
    privKeyP:
      'Girdiğiniz anahtar cihazınızda saklanır ve yalnızca seçtiğiniz sağlayıcıya yapılan isteklerin kimlik doğrulaması için kullanılır. Bize ya da başka birine hiçbir zaman gönderilmez.',
    privNotT: 'Yapmadıklarımız',
    privSiteT: 'Bu web sitesi',
    privSiteP:
      'Yukarıdakiler uygulamayı anlatıyor. Bu web sitesi ayrı: ziyaretleri saymak ve hangi sayfaların okunduğunu görmek için Google Analytics kullanıyor; IP anonimleştirmesi açık, Google reklam sinyalleri kapalı. Ayrıca üçüncü bir tarafın değil, kendi altyapımızda çalışan kendi sayacımızı kullanıyoruz: çerez bırakmaz ve tarayıcınızda hiçbir şey saklamaz, çünkü sizi saydığı tanımlayıcı IP adresiniz, tarayıcı türünüz ve bugünün tarihinden uç sunucumuzda türetilir, size hiçbir zaman geri gönderilmez ve UTC gece yarısında değişir. IP adresinizin kendisi hiçbir yerde saklanmaz ve kodu açıktır. Bu ölçüm yalnızca siteyle ilgili — uygulamanın kendisinde hiçbir analitik yok.',
    privNot1: 'Uygulamayı kullanmak için hesap ya da giriş gerekmez.',
    privNot2: 'Uygulamanın içinde analitik, izleme veya reklam SDK’sı yok (site için aşağıya bakın).',
    privNot3: 'Kişisel veri satmıyor ya da paylaşmıyoruz — zaten bize ulaşmıyor.',
    privNot4: 'İçeriğiniz üzerinde hiçbir model eğitilmiyor.',
    privPermT: 'İzinler',
    privPermP:
      'Fotoğraf kitaplığı — kurguya girecek video ve fotoğrafları okumak ve sonucu kaydetmek için. Bu izin olmadan uygulamanın kurgulayacağı bir şey olmaz.',
    privKidsT: 'Çocuklar',
    privKidsP:
      "Life2Film 13 yaş altı çocuklara yönelik değildir ve onlardan bilerek bilgi toplamaz.",
    privChangesT: 'Değişiklikler',
    privChangesP:
      'Bu politika değişirse yukarıdaki tarih de değişir. Önemli değişiklikler bu sayfada belirtilir.',
    privContactT: 'İletişim',
    privContactP: 'Gizlilikle ilgili sorular:',

    supTitle: 'Destek',
    supIntro: 'Bozuk, kafa karıştırıcı ya da eksik bir şey mi var? Bize yazın — gerçek bir insan okuyor.',
    supHow:
      'Bir sorunu bildirirken cihaz modelinizi, iOS sürümünüzü ve o sırada ne yaptığınızı ekleyin. Kurgu yanlış çıktıysa kaç klip olduğunu ve ne istediğinizi kabaca yazın.',
    supFaq: 'Sık sorulanlar',
    supQ1: 'Hesap gerekiyor mu?',
    supA1: 'Hayır. Uygulama giriş yapmadan çalışır.',
    supQ2: 'Videolarım yükleniyor mu?',
    supA2: 'Hayır. Analiz ve kurgu cihazınızda çalışır; orijinaller cihazdan çıkmaz. Ayrıntılar',
    supA2Link: 'gizlilik politikasında',
    supQ3: 'API anahtarı gerekiyor mu?',
    supA3:
      'Yalnızca yapay zekâ yönetmen için. Anahtar olmadan da uygulama deterministik hattıyla kurgu yapar. Anahtarla istekler doğrudan cihazınızdan seçtiğiniz sağlayıcıya gider.',
    supQ4: 'Uygulama neden fotoğraf erişimi istiyor?',
    supA4: 'Kitaplığınızdaki videoları kurguluyor. Erişim olmadan çalışacağı bir şey yok.',
  },
} as const;

export function useLegal(lang: Lang) {
  return function l(key: keyof (typeof legal)['en']): string {
    return (legal[lang] as Record<string, string>)[key] ?? legal.en[key];
  };
}
