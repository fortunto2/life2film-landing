import type { Lang } from './i18n';

/** Copy for /privacy and /support. English remains the authoritative version of the policy. */
export const legal = {
  en: {
    privTitle: 'Privacy Policy',
    privUpdated: 'Last updated: October 17, 2026',
    privIntro:
      'Life2Film turns videos you already have into a montage. Those videos are personal, so the app is built to keep them where they are: on your device.',
    privStaysT: 'What stays on your device',
    privStaysP:
      "Your videos and photos are read, analysed and edited locally. Scene detection, face detection, quality scoring, speech recognition and the montage itself run on your iPhone using Apple's frameworks and the app's own on-device engine.",
    privStays1: 'Original video and photo files are never uploaded. Neither are frames or sound.',
    privStays2: 'Rendered films are saved to your device and shared only when you choose to.',
    privStays3: 'The photo-library index and the analysis cache are stored locally and removed with the app. Words the app recognised in your clips stay on the phone.',
    privLeavesT: 'The chat agent',
    privLeavesP:
      'The chat agent is optional and off until you open it. When it answers, the app sends text only — the question you typed and the agent’s own notes about your library (counts, dates, file names). Never your footage, frames or sound.',
    privLeavesList: 'It can answer in one of three ways, chosen in Settings:',
    privWay1:
      'Apple’s on-device model (Apple Intelligence, where the phone has it). Nothing leaves the device.',
    privWay2:
      'Our model, included with Pro Monthly and Pro Yearly. The request goes to agent.life2film.com with your subscription’s signed App Store transaction, so our server can check it is live. We keep a daily request count under a one-way hash of it and nothing that identifies you — no Apple ID, no device id, no IP address. If usage analytics is on (below), we also keep the question you typed, cut to 500 characters, with no identifier, for 30 days, to learn what people ask the agent; switch analytics off and nothing is kept. The model runs on Cloudflare Workers AI, which does not train on it, and the gateway in front of it keeps no prompt and no reply.',
    privWay3:
      'Your own API key — OpenAI, Google Gemini, OpenRouter, a Cloudflare gateway or any OpenAI-compatible endpoint. Requests go with your key, directly from your device to that provider. We do not proxy them and never see their contents; each provider processes the request under its own privacy policy, so please review the one you use.',
    privLeavesP2:
      'Payment for Pro goes through your Apple ID; we never learn who bought. The only thing our server ever sees is the subscription’s signed transaction described above, and only when you use the agent on our model.',
    privKeyT: 'Your API key',
    privKeyP:
      'The key you enter is stored on your device and used only to authenticate requests to the provider you selected. It is never sent to us or to anyone else.',
    privNotT: 'What we do not do',
    privSiteT: 'This website',
    privSiteP:
      'The points above describe the app. This website is separate: it uses Google Analytics to count visits and see which pages people read, with IP anonymisation on and Google advertising signals off. It also runs our own counter, on infrastructure we operate rather than a third party’s — it sets no cookie and stores nothing in your browser, because the identifier it counts you by is derived at our edge from your IP address, browser type and today’s date, is never sent back to you, and changes at midnight UTC. Your IP address itself is never stored, and the code is public. That measurement applies to the site only; the app’s own usage counter is described above.',
    privNot1: 'No account or sign-in is required to use the app.',
    privNot2:
      'No advertising, no tracking across apps or sites, no third-party SDKs for those purposes. The app’s own usage counter — a film started, a film saved, which preset — is anonymous: no footage, no words, no identifiers that could link the events to you, never used for ads, and Settings → About → Analytics switches it off.',
    privNot3: 'No selling or sharing of personal data.',
    privNot4: 'No training of any model on your content.',
    privPermT: 'Permissions',
    privPermP:
      'Photo library, to read the videos and photos you want in a film and to save the result — without it the app has nothing to edit. Speech recognition, for the Vlog preset, on the device, only when you choose it. Bluetooth and local network, only when you connect a DJI Osmo Pocket camera from the gallery.',
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
      'No. The montage needs nothing. The chat agent answers on Apple’s on-device model where the phone has it, or on our model with Pro Monthly or Pro Yearly — the first week is free. Your own API key is a third option, under Settings → Agent → Advanced.',
    supQ4: 'Why does the app ask for photo access?',
    supA4: 'It edits videos already in your library. Without access there is nothing to work with.',
  },

  ru: {
    privTitle: 'Политика конфиденциальности',
    privUpdated: 'Обновлено: 17 октября 2026',
    privIntro:
      'Life2Film собирает монтаж из видео, которые у вас уже есть. Эти записи личные, поэтому приложение устроено так, чтобы они оставались там, где лежат: на вашем устройстве.',
    privStaysT: 'Что остаётся на устройстве',
    privStaysP:
      'Ваши видео и фото читаются, анализируются и монтируются локально. Разбор сцен, поиск лиц, оценка качества, распознавание речи и сама сборка идут на самом iPhone — через фреймворки Apple и собственный движок приложения.',
    privStays1: 'Исходные видео и фотографии никуда не загружаются. Кадры и звук — тоже.',
    privStays2: 'Готовые фильмы сохраняются на устройстве и уходят дальше, только если вы сами их отправите.',
    privStays3: 'Индекс медиатеки и кэш анализа хранятся локально и удаляются вместе с приложением. Слова, которые приложение распознало в ваших клипах, остаются на телефоне.',
    privLeavesT: 'Чат-агент',
    privLeavesP:
      'Чат-агент необязателен и выключен, пока вы его не откроете. Когда он отвечает, приложение отправляет только текст — ваш вопрос и собственные заметки агента о вашей медиатеке (количества, даты, имена файлов). Никогда не видео, не кадры и не звук.',
    privLeavesList: 'Отвечать он может одним из трёх способов, выбор — в настройках:',
    privWay1:
      'Модель Apple на самом устройстве (Apple Intelligence, где телефон её поддерживает). С устройства не уходит ничего.',
    privWay2:
      'Наша модель — входит в Pro на месяц и на год. Запрос уходит на agent.life2film.com вместе с подписанной транзакцией App Store вашей подписки, чтобы сервер проверил, что она действует. Мы храним дневной счётчик запросов под односторонним хэшем этой транзакции и ничего, что вас идентифицирует: ни Apple ID, ни идентификатора устройства, ни IP-адреса. Если включена аналитика использования (ниже), мы также храним набранный вами вопрос, обрезанный до 500 символов, без идентификатора, 30 дней — чтобы понимать, о чём люди спрашивают агента; выключите аналитику, и не хранится ничего. Модель работает на Cloudflare Workers AI, которая на этом не обучается, а шлюз перед ней не сохраняет ни запрос, ни ответ.',
    privWay3:
      'Ваш собственный API-ключ — OpenAI, Google Gemini, OpenRouter, шлюз Cloudflare или любой OpenAI-совместимый адрес. Запросы уходят с вашим ключом напрямую с устройства к провайдеру. Мы их не проксируем и содержимого не видим; каждый провайдер обрабатывает запрос по собственной политике — стоит прочитать ту, что относится к выбранному вами.',
    privLeavesP2:
      'Оплата Pro идёт через ваш Apple ID; мы никогда не узнаём, кто купил. Единственное, что видит наш сервер, — описанная выше подписанная транзакция подписки, и только когда вы пользуетесь агентом на нашей модели.',
    privKeyT: 'Ваш API-ключ',
    privKeyP:
      'Введённый ключ хранится на устройстве и используется только для авторизации запросов к выбранному провайдеру. Нам или кому-то ещё он не передаётся.',
    privNotT: 'Чего мы не делаем',
    privSiteT: 'Про этот сайт',
    privSiteP:
      'Всё сказанное выше относится к приложению. Сайт — отдельная история: на нём стоит Google Analytics, чтобы считать визиты и видеть, какие страницы читают. IP анонимизируется, рекламные сигналы Google отключены. Ещё на сайте работает наш собственный счётчик — на нашей инфраструктуре, а не у стороннего сервиса. Он не ставит cookie и ничего не хранит в браузере: идентификатор вычисляется на нашем крае из IP-адреса, типа браузера и сегодняшней даты, вам он никогда не передаётся и меняется в полночь UTC. Сам IP-адрес нигде не сохраняется, а код счётчика открыт. Всё это касается только сайта; собственный счётчик приложения описан выше.',
    privNot1: 'Аккаунт и вход не нужны.',
    privNot2:
      'Никакой рекламы, никакого трекинга между приложениями и сайтами, никаких сторонних SDK для этого. Собственный счётчик приложения — фильм начат, фильм сохранён, какой пресет — анонимный: без видео, без слов, без идентификаторов, по которым события можно связать с вами; для рекламы не используется; выключается в Настройки → О приложении → Аналитика.',
    privNot3: 'Мы не продаём и не передаём персональные данные.',
    privNot4: 'На вашем контенте не обучается никакая модель.',
    privPermT: 'Разрешения',
    privPermP:
      'Медиатека — чтобы прочитать видео и фото для фильма и сохранить результат; без доступа приложению не с чем работать. Распознавание речи — для пресета «Влог», на устройстве и только когда вы его выбрали. Bluetooth и локальная сеть — только когда вы подключаете камеру DJI Osmo Pocket из галереи.',
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
      'Нет. Монтажу не нужно ничего. Чат-агент отвечает на модели Apple прямо на устройстве, где телефон её поддерживает, или на нашей модели с Pro на месяц или на год — первая неделя бесплатно. Собственный API-ключ — третий вариант, в Настройки → Агент → Дополнительно.',
    supQ4: 'Зачем приложение просит доступ к фото?',
    supA4: 'Оно монтирует видео, которые уже лежат в вашей медиатеке. Без доступа работать не с чем.',
  },

  tr: {
    privTitle: 'Gizlilik Politikası',
    privUpdated: 'Son güncelleme: 17 Ekim 2026',
    privIntro:
      'Life2Film hâlihazırda sahip olduğunuz videolardan bir kurgu çıkarır. Bu videolar kişiseldir; bu yüzden uygulama onları bulundukları yerde, yani cihazınızda tutacak şekilde tasarlandı.',
    privStaysT: 'Cihazınızda kalanlar',
    privStaysP:
      "Videolarınız ve fotoğraflarınız yerel olarak okunur, analiz edilir ve kurgulanır. Sahne algılama, yüz algılama, kalite puanlaması, konuşma tanıma ve kurgunun kendisi iPhone'unuzda çalışır: Apple'ın çerçeveleri ve uygulamanın kendi cihaz içi motoruyla.",
    privStays1: 'Orijinal video ve fotoğraf dosyaları hiçbir zaman yüklenmez. Kareler ve ses de yüklenmez.',
    privStays2: 'Oluşturulan filmler cihazınıza kaydedilir ve yalnızca siz paylaşmayı seçerseniz dışarı çıkar.',
    privStays3: 'Kitaplık dizini ve analiz önbelleği yerel olarak saklanır ve uygulamayla birlikte silinir. Uygulamanın kliplerinizde tanıdığı sözler telefonda kalır.',
    privLeavesT: 'Sohbet asistanı',
    privLeavesP:
      'Sohbet asistanı isteğe bağlıdır ve siz açana kadar kapalıdır. Yanıt verirken uygulama yalnızca metin gönderir: yazdığınız soru ve asistanın kitaplığınız hakkındaki kendi notları (sayılar, tarihler, dosya adları). Görüntüleriniz, kareler ya da ses asla gönderilmez.',
    privLeavesList: 'Üç şekilde yanıt verebilir; seçim Ayarlar’da:',
    privWay1:
      'Apple’ın cihaz içi modeli (Apple Intelligence, telefonun desteklediği yerde). Cihazdan hiçbir şey çıkmaz.',
    privWay2:
      'Bizim modelimiz — Aylık ve Yıllık Pro’ya dahildir. İstek, aboneliğinizin imzalı App Store işlemiyle birlikte agent.life2film.com adresine gider; sunucumuz böylece aboneliğin geçerli olduğunu doğrular. Bu işlemin tek yönlü özeti altında günlük bir istek sayacı tutarız ve sizi tanımlayan hiçbir şey tutmayız: Apple ID yok, cihaz kimliği yok, IP adresi yok. Kullanım analitiği açıksa (aşağıda), yazdığınız soruyu 500 karaktere kısaltılmış hâlde, kimliksiz, 30 gün boyunca da saklarız — insanların asistana ne sorduğunu öğrenmek için; analitiği kapatın, hiçbir şey saklanmaz. Model Cloudflare Workers AI üzerinde çalışır, bununla eğitilmez ve önündeki ağ geçidi ne isteği ne de yanıtı saklar.',
    privWay3:
      'Kendi API anahtarınız — OpenAI, Google Gemini, OpenRouter, bir Cloudflare ağ geçidi ya da OpenAI uyumlu herhangi bir uç nokta. İstekler sizin anahtarınızla doğrudan cihazınızdan sağlayıcıya gider. Bunları biz aktarmayız ve içeriklerini görmeyiz; her sağlayıcı isteği kendi gizlilik politikasına göre işler, kullandığınızınkini incelemeniz iyi olur.',
    privLeavesP2:
      'Pro ödemesi Apple Kimliğiniz üzerinden geçer; kimin aldığını asla öğrenmeyiz. Sunucumuzun gördüğü tek şey, yukarıda anlatılan imzalı abonelik işlemidir — o da yalnızca asistanı bizim modelimizle kullandığınızda.',
    privKeyT: 'API anahtarınız',
    privKeyP:
      'Girdiğiniz anahtar cihazınızda saklanır ve yalnızca seçtiğiniz sağlayıcıya yapılan isteklerin kimlik doğrulaması için kullanılır. Bize ya da başka birine hiçbir zaman gönderilmez.',
    privNotT: 'Yapmadıklarımız',
    privSiteT: 'Bu web sitesi',
    privSiteP:
      'Yukarıdakiler uygulamayı anlatıyor. Bu web sitesi ayrı: ziyaretleri saymak ve hangi sayfaların okunduğunu görmek için Google Analytics kullanıyor; IP anonimleştirmesi açık, Google reklam sinyalleri kapalı. Ayrıca üçüncü bir tarafın değil, kendi altyapımızda çalışan kendi sayacımızı kullanıyoruz: çerez bırakmaz ve tarayıcınızda hiçbir şey saklamaz, çünkü sizi saydığı tanımlayıcı IP adresiniz, tarayıcı türünüz ve bugünün tarihinden uç sunucumuzda türetilir, size hiçbir zaman geri gönderilmez ve UTC gece yarısında değişir. IP adresinizin kendisi hiçbir yerde saklanmaz ve kodu açıktır. Bu ölçüm yalnızca siteyle ilgilidir; uygulamanın kendi kullanım sayacı yukarıda anlatıldı.',
    privNot1: 'Uygulamayı kullanmak için hesap ya da giriş gerekmez.',
    privNot2:
      'Reklam yok, uygulamalar ve siteler arasında izleme yok, bu amaçlarla üçüncü taraf SDK yok. Uygulamanın kendi kullanım sayacı — bir film başlatıldı, bir film kaydedildi, hangi ön ayar — anonimdir: görüntü yok, söz yok, olayları size bağlayabilecek kimlik yok; reklam için kullanılmaz ve Ayarlar → Hakkında → Analitik’ten kapatılır.',
    privNot3: 'Kişisel veri satmıyor ya da paylaşmıyoruz.',
    privNot4: 'İçeriğiniz üzerinde hiçbir model eğitilmiyor.',
    privPermT: 'İzinler',
    privPermP:
      'Fotoğraf kitaplığı — filme girecek video ve fotoğrafları okumak ve sonucu kaydetmek için; bu izin olmadan uygulamanın kurgulayacağı bir şey olmaz. Konuşma tanıma — Vlog ön ayarı için, cihazda ve yalnızca siz seçtiğinizde. Bluetooth ve yerel ağ — yalnızca galeriden bir DJI Osmo Pocket kamera bağladığınızda.',
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
      'Hayır. Kurgu için hiçbir şey gerekmez. Sohbet asistanı, telefonun desteklediği yerde Apple’ın cihaz içi modeliyle, ya da Aylık veya Yıllık Pro ile bizim modelimizle yanıt verir — ilk hafta ücretsiz. Kendi API anahtarınız üçüncü seçenektir: Ayarlar → Asistan → Gelişmiş.',
    supQ4: 'Uygulama neden fotoğraf erişimi istiyor?',
    supA4: 'Kitaplığınızdaki videoları kurguluyor. Erişim olmadan çalışacağı bir şey yok.',
  },
} as const;

export function useLegal(lang: Lang) {
  return function l(key: keyof (typeof legal)['en']): string {
    return (legal[lang] as Record<string, string>)[key] ?? legal.en[key];
  };
}
