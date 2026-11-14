export const languages = { en: 'EN', es: 'ES', pt: 'PT', id: 'ID', ar: 'AR', ru: 'RU', tr: 'TR' } as const;

/** Each language in its own name, for the header menu: a reader looks for the word they can read. */
export const languageNames: Record<keyof typeof languages, string> = {
  en: 'English', es: 'Español', pt: 'Português', id: 'Bahasa Indonesia', ar: 'العربية', ru: 'Русский', tr: 'Türkçe',
};

/** Right-to-left locales — the <html dir> attribute depends on this. */
export const rtl = new Set<string>(['ar']);
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** Prefix a root-relative path with the locale (en has no prefix). */
export function localePath(lang: Lang, path = '/'): string {
  const raw = path.startsWith('/') ? path : `/${path}`;
  const p = raw.endsWith('/') ? raw : `${raw}/`;            // avoid a 308 on every internal link
  return lang === defaultLang ? p : `/${lang}${p === '/' ? '/' : p}`;
}

export const ui = {
  en: {
    metaTitle: 'Life2Film — offline AI video montage app for iPhone',
    metaDesc:
      'AI video montage maker that works offline: it edits the videos already on your iPhone, cuts them to the beat, and never uploads your footage. No account needed.',
    navPrivacy: 'Privacy',
    navSupport: 'Support',

    heroTitle: 'Your camera roll,<br>cut into a film.',
    heroLede: 'Hours of clips from a trip or a year of your kid. Life2Film keeps the moments that matter and cuts them into a film, right on your iPhone.',
    ctaPrimary: 'Download on the App Store',

    heroProof: 'Free, no account · first version 2014, over a million installs',
    waitTitle: 'Not on iPhone yet?',
    waitLede: 'One email when it is ready. Nothing else.',
    waitAndroid: 'Android',
    waitStudio: 'Studio for Mac out of beta',
    waitEmail: 'Email',
    waitSend: 'Tell me',
    waitDone: 'Noted. One email, when it is ready.',
    waitFail: 'That did not go through. Try again, or write to info@life2film.com.',
    howTitle: 'Three steps',
    h1t: 'Pick a stretch of time',
    h1d: 'Spin the wheel to a day, a month, a trip.',
    h2t: 'Say what you want',
    h2d: '“Two minutes, keep the beach.” No timeline, no dragging clips.',
    h3t: 'Watch it back',
    h3d: 'Not right? Ask again and it re-cuts.',

    featTitle: 'What it actually does',
    f1t: 'Finds the moments',
    f1d: 'Drops the shaky starts and the forty seconds of pavement.',
    f2t: 'Cuts to the beat',
    f2d: 'Edits land on the beat, not at random.',
    f3t: 'Knows who is who',
    f3d: 'Groups faces on device, so “the kids” means your kids.',
    f4t: 'Re-cuts on request',
    f4d: 'New length, new mood, a new cut in seconds.',

    privTitle: 'Privacy is the architecture',
    privLede: 'Scene detection, face grouping and scoring run on your iPhone. Originals are never uploaded, and nothing trains a model.',
    privNote: 'The AI director plans the cut from a text description of the clips (timings, short labels), never from the video.',
    privLink: 'Read the privacy policy',

    screensTitle: 'Inside the app',
    s1: 'Spin the year to any day you filmed',
    s2: 'Set length, style and music, then ask for changes',
    s3: 'Your whole library, filtered to what matters',
    s4: 'Trim and reorder by hand when you want to',
    navBlog: 'Blog',
    navStudio: 'Studio',
    macCta: 'On Mac: the agent-first editor',
    footerLlms: 'For AI assistants',
    footerTag: 'Made by SuperDuperAI',
    footerRights: 'All rights reserved.',

    navAbout: 'About',
    aboutTitle: 'About Life2Film',
    aboutMetaTitle: 'About Life2Film — why the montage runs on your iPhone',
    aboutMetaDesc:
      'Why we built an editor that picks the moments for you, and why the analysis stays on your iPhone: there is no server to send your footage to.',
    aboutQuote:
      'Collect experiences, not things. One day you wake up and realise your possessions carry no meaning. Only memories keep their value.',
    aboutP1:
      'Every day people record video. Almost all of it ends up in an archive nobody opens. Storage runs out, recording stops, and years quietly go missing.',
    aboutP2:
      'From a whole holiday, a few photos survive. Children grow up as if they were never small. Friends fade out of the frame entirely.',
    aboutH2: 'The editor you never have to learn',
    aboutP3:
      'Point Life2Film at an event, a trip, a month of your kid, and it picks the moments worth keeping, orders them, and cuts a film. No editing skills, no timeline. What survives is not just the footage but the feeling of being there.',
    aboutH3: 'A film made of films',
    aboutP4:
      'Once you have several films, they can become one. Take a fragment from each and you get a film about a month; from months, a year; from years, a life. The calendar wheel is that idea made usable. Spin to any point in time and see what is there.',
    aboutH4: 'Why it stays on your device',
    aboutP5:
      'This only works if you can trust it with everything: the unflattering takes, the family, the home. So the analysis runs on your iPhone and the footage never leaves it. Not a policy we could change later: there is no server to send it to.',
    aboutH5: 'Who makes it',
    aboutP6:
      'Life2Film is built by SuperDuperAi, Corp., a Delaware company. Bugs, questions and feature requests all go to the same inbox, and a person reads them.',
    aboutH6: 'Twelve years, one idea',
    aboutP7:
      'The first Life2Film came out in 2014: an iPhone app that cut your clips into a film by itself, back when nobody called that AI. More than a million people installed it. The technology of the time could not keep the promise, and the app closed in 2021. The idea has not moved since; the form has. What once needed a server now runs on the phone in your hand. This is the film we made about it then.',
    aboutVideoPlay: 'Play the 2014 film',
    aboutVideoNote: 'The video is on YouTube and loads only when you press play.',
  },

  es: {
    metaTitle: 'Life2Film — editor de video con IA, offline, para iPhone',
    metaDesc:
      'Editor de video con IA que funciona sin internet: monta los videos que ya tienes en el iPhone, corta al ritmo de la música y nunca sube tus grabaciones. Sin cuenta.',
    navPrivacy: 'Privacidad',
    navSupport: 'Soporte',
    navAbout: 'Acerca de',
    navStudio: 'Studio',
    navBlog: 'Blog',

    heroTitle: 'Tu galería,<br>convertida en película.',
    heroLede: 'Horas de clips de un viaje o de un año de tu hijo. Life2Film se queda con lo que importa y lo monta en una película, en tu iPhone.',
    ctaPrimary: 'Descargar en el App Store',
    macCta: 'También para Mac',

    heroProof: 'Gratis, sin cuenta · primera versión en 2014, más de un millón de instalaciones',
    waitTitle: '¿Todavía sin iPhone?',
    waitLede: 'Un correo cuando esté listo. Nada más.',
    waitAndroid: 'Android',
    waitStudio: 'Studio para Mac fuera de beta',
    waitEmail: 'Correo',
    waitSend: 'Avísame',
    waitDone: 'Anotado. Un correo, cuando esté listo.',
    waitFail: 'No se pudo enviar. Inténtalo de nuevo o escribe a info@life2film.com.',
    howTitle: 'Tres pasos',
    h1t: 'Elige un momento del tiempo',
    h1d: 'Gira la rueda hasta un día, un mes, un viaje.',
    h2t: 'Di lo que quieres',
    h2d: '“Dos minutos, deja la playa.” Sin línea de tiempo, sin arrastrar clips.',
    h3t: 'Míralo',
    h3d: '¿No te convence? Pídelo distinto y lo vuelve a montar.',

    featTitle: 'Qué hace en concreto',
    f1t: 'Encuentra los momentos',
    f1d: 'Descarta los arranques temblorosos y los cuarenta segundos de asfalto.',
    f2t: 'Corta al ritmo',
    f2d: 'Los cortes caen en el ritmo, no al azar.',
    f3t: 'Sabe quién es quién',
    f3d: 'Agrupa caras en el teléfono, así “los niños” son tus niños.',
    f4t: 'Rehace el montaje',
    f4d: 'Otra duración, otro tono, un montaje nuevo en segundos.',

    screensTitle: 'Por dentro',
    s1: 'Gira el año hasta cualquier día que grabaste',
    s2: 'Elige duración, estilo y música, y luego pide cambios',
    s3: 'Toda tu galería, filtrada a lo que importa',
    s4: 'Recorta y reordena a mano cuando quieras',

    privTitle: 'La privacidad es la arquitectura',
    privLede: 'La detección de escenas, el agrupado de caras y la puntuación se ejecutan en tu iPhone. Los originales nunca se suben y nada entrena a ningún modelo.',
    privNote: 'El director de IA planea el montaje con una descripción en texto de los clips (tiempos, etiquetas cortas), nunca con el video.',
    privLink: 'Leer la política de privacidad',

    footerLlms: 'Para asistentes de IA',
    footerTag: 'Hecho por SuperDuperAI',
    footerRights: 'Todos los derechos reservados.',

    aboutTitle: 'Sobre Life2Film',
    aboutMetaTitle: 'Sobre Life2Film — por qué el montaje se hace en tu iPhone',
    aboutMetaDesc:
      'Por qué creamos un editor que elige los momentos por ti y por qué el análisis se queda en tu iPhone: no hay servidor al que enviar tus vídeos.',
    aboutQuote:
      'Colecciona experiencias, no cosas. Un día despiertas y te das cuenta de que lo que posees no significa nada. Solo los recuerdos conservan su valor.',
    aboutP1:
      'La gente graba video todos los días. Casi todo acaba en un archivo que nadie abre. Se acaba el espacio, se deja de grabar, y los años desaparecen sin ruido.',
    aboutP2:
      'De unas vacaciones enteras sobreviven cuatro fotos. Los niños crecen como si nunca hubieran sido pequeños. Los amigos salen del cuadro del todo.',
    aboutH2: 'El montaje que no hay que aprender',
    aboutP3:
      'Señálale un evento, un viaje o un mes de tu hijo: elige los momentos que merecen quedarse, los ordena y monta una película. Sin saber editar, sin línea de tiempo. Lo que sobrevive no es solo la grabación, sino la sensación de haber estado ahí.',
    aboutH3: 'Una película hecha de películas',
    aboutP4:
      'Cuando tienes varias películas, pueden volverse una. Toma un fragmento de cada una y sale la película de un mes; de los meses, la de un año; de los años, la de una vida. La rueda del calendario es esa idea hecha usable: gira a cualquier punto del tiempo y mira qué hay.',
    aboutH4: 'Por qué todo se queda en tu dispositivo',
    aboutP5:
      'Esto solo funciona si puedes confiarle todo: las tomas poco favorecedoras, la familia, la casa. Por eso el análisis se ejecuta en tu iPhone y las grabaciones no salen de ahí. No es una política que podamos cambiar después: no hay servidor al que enviarlas.',
    aboutH5: 'Quién lo hace',
    aboutP6:
      'Life2Film lo desarrolla SuperDuperAi, Corp., una empresa de Delaware. Errores, preguntas y peticiones llegan al mismo buzón, y los lee una persona.',
    aboutH6: 'Doce años, una sola idea',
    aboutP7:
      'El primer Life2Film salió en 2014: una app para iPhone que convertía tus clips en una película por sí sola, cuando nadie llamaba a eso IA. Más de un millón de personas la instalaron. La tecnología de entonces no pudo cumplir la promesa y la app cerró en 2021. La idea no ha cambiado desde entonces; la forma sí. Lo que antes necesitaba un servidor ahora funciona en el teléfono que tienes en la mano. Esta es la película que hicimos sobre ella en aquel momento.',
    aboutVideoPlay: 'Ver la película de 2014',
    aboutVideoNote: 'El vídeo está en YouTube y solo se carga cuando pulsas reproducir.',
  },

  pt: {
    metaTitle: 'Life2Film — editor de vídeo automático com IA para iPhone',
    metaDesc:
      'Editor de vídeo automático que funciona sem internet: monta os vídeos que já estão no iPhone, corta no ritmo da música e nunca envia suas gravações. Sem conta, grátis.',
    navPrivacy: 'Privacidade',
    navSupport: 'Suporte',
    navAbout: 'Sobre',
    navStudio: 'Studio',
    navBlog: 'Blog',

    heroTitle: 'Sua galeria,<br>virada filme.',
    heroLede: 'Horas de clipes de uma viagem ou de um ano do seu filho. O Life2Film guarda o que importa e monta um filme, no seu iPhone.',
    ctaPrimary: 'Baixar na App Store',
    macCta: 'Também para Mac',

    heroProof: 'Grátis, sem conta · primeira versão em 2014, mais de um milhão de instalações',
    waitTitle: 'Ainda sem iPhone?',
    waitLede: 'Um e-mail quando estiver pronto. Nada mais.',
    waitAndroid: 'Android',
    waitStudio: 'Studio para Mac fora do beta',
    waitEmail: 'E-mail',
    waitSend: 'Me avise',
    waitDone: 'Anotado. Um e-mail, quando estiver pronto.',
    waitFail: 'Não foi enviado. Tente de novo ou escreva para info@life2film.com.',
    howTitle: 'Três passos',
    h1t: 'Escolha um trecho do tempo',
    h1d: 'Gire a roda até um dia, um mês, uma viagem.',
    h2t: 'Diga o que você quer',
    h2d: '“Dois minutos, mantenha a praia.” Sem linha do tempo, sem arrastar clipes.',
    h3t: 'Assista',
    h3d: 'Não gostou? Peça diferente e ele remonta.',

    featTitle: 'O que ele faz de fato',
    f1t: 'Acha os momentos',
    f1d: 'Descarta os começos tremidos e os quarenta segundos de asfalto.',
    f2t: 'Corta no ritmo',
    f2d: 'Os cortes caem no ritmo, não a esmo.',
    f3t: 'Sabe quem é quem',
    f3d: 'Agrupa rostos no aparelho, então “as crianças” são as suas crianças.',
    f4t: 'Remonta quando você pede',
    f4d: 'Outra duração, outro clima, uma montagem nova em segundos.',

    screensTitle: 'Por dentro',
    s1: 'Gire o ano até qualquer dia em que filmou',
    s2: 'Defina duração, estilo e música, depois peça mudanças',
    s3: 'Sua biblioteca inteira, filtrada no que importa',
    s4: 'Corte e reordene na mão quando quiser',

    privTitle: 'A privacidade é a arquitetura',
    privLede: 'Detecção de cenas, agrupamento de rostos e pontuação rodam no seu iPhone. Os originais nunca são enviados e nada treina modelo nenhum.',
    privNote: 'O diretor de IA planeja o corte a partir de uma descrição em texto dos clipes (tempos, rótulos curtos), nunca do vídeo.',
    privLink: 'Ler a política de privacidade',

    footerLlms: 'Para assistentes de IA',
    footerTag: 'Feito pela SuperDuperAI',
    footerRights: 'Todos os direitos reservados.',

    aboutTitle: 'Sobre o Life2Film',
    aboutMetaTitle: 'Sobre o Life2Film — por que a montagem roda no seu iPhone',
    aboutMetaDesc:
      'Por que criamos um editor que escolhe os momentos sozinho e por que a análise fica no seu iPhone: não há servidor para onde enviar seus vídeos.',
    aboutQuote:
      'Junte experiências, não coisas. Um dia você acorda e percebe que o que você tem não significa nada. Só as lembranças mantêm o valor.',
    aboutP1:
      'As pessoas gravam vídeo todo dia. Quase tudo acaba num arquivo que ninguém abre. O espaço acaba, a gravação para, e anos somem em silêncio.',
    aboutP2:
      'De férias inteiras sobram quatro fotos. As crianças crescem como se nunca tivessem sido pequenas. Os amigos saem de quadro por completo.',
    aboutH2: 'A montagem que não precisa ser aprendida',
    aboutP3:
      'Aponte para um evento, uma viagem, um mês do seu filho: ele escolhe os momentos que merecem ficar, coloca em ordem e monta um filme. Sem saber editar, sem linha do tempo. O que sobrevive não é só a imagem, é a sensação de ter estado ali.',
    aboutH3: 'Um filme feito de filmes',
    aboutP4:
      'Quando você tem vários filmes, eles podem virar um. Pegue um trecho de cada e sai o filme de um mês; dos meses, o de um ano; dos anos, o de uma vida. A roda do calendário é essa ideia em forma usável: gire até qualquer ponto do tempo e veja o que tem lá.',
    aboutH4: 'Por que tudo fica no seu aparelho',
    aboutP5:
      'Isso só funciona se você puder confiar tudo a ele: as tomadas ruins, a família, a casa. Por isso a análise roda no seu iPhone e as gravações não saem dali. Não é uma política que possamos mudar depois: não existe servidor para onde enviar.',
    aboutH5: 'Quem faz',
    aboutP6:
      'O Life2Film é desenvolvido pela SuperDuperAi, Corp., empresa de Delaware. Erros, dúvidas e pedidos chegam na mesma caixa, e uma pessoa lê.',
    aboutH6: 'Doze anos, uma única ideia',
    aboutP7:
      'O primeiro Life2Film saiu em 2014: um app para iPhone que transformava os seus clipes num filme sozinho, quando ninguém chamava isso de IA. Mais de um milhão de pessoas o instalaram. A tecnologia da época não conseguiu cumprir a promessa, e o app fechou em 2021. A ideia não mudou desde então; a forma, sim. O que antes precisava de um servidor agora roda no telefone na sua mão. Este é o filme que fizemos sobre ele naquela altura.',
    aboutVideoPlay: 'Assistir ao filme de 2014',
    aboutVideoNote: 'O vídeo está no YouTube e só é carregado quando você aperta play.',
  },

  id: {
    metaTitle: 'Life2Film — aplikasi edit video AI offline untuk iPhone',
    metaDesc:
      'Aplikasi edit video AI yang jalan tanpa internet: merangkai video yang sudah ada di iPhone, memotong mengikuti ketukan musik, dan tidak pernah mengunggah rekaman Anda. Tanpa akun.',
    navPrivacy: 'Privasi',
    navSupport: 'Bantuan',
    navAbout: 'Tentang',
    navStudio: 'Studio',
    navBlog: 'Blog',

    heroTitle: 'Galeri Anda,<br>jadi sebuah film.',
    heroLede: 'Berjam-jam klip dari liburan atau setahun anak Anda. Life2Film menyimpan momen yang penting dan merangkainya jadi film, langsung di iPhone.',
    ctaPrimary: 'Unduh di App Store',
    macCta: 'Ada juga untuk Mac',

    heroProof: 'Gratis, tanpa akun · versi pertama 2014, lebih dari sejuta pemasangan',
    waitTitle: 'Belum pakai iPhone?',
    waitLede: 'Satu email saat sudah siap. Tidak ada yang lain.',
    waitAndroid: 'Android',
    waitStudio: 'Studio untuk Mac keluar dari beta',
    waitEmail: 'Email',
    waitSend: 'Kabari saya',
    waitDone: 'Dicatat. Satu email, saat sudah siap.',
    waitFail: 'Gagal terkirim. Coba lagi, atau tulis ke info@life2film.com.',
    howTitle: 'Tiga langkah',
    h1t: 'Pilih rentang waktunya',
    h1d: 'Putar roda ke satu hari, satu bulan, satu perjalanan.',
    h2t: 'Katakan mau seperti apa',
    h2d: '“Dua menit, simpan bagian pantai.” Tanpa timeline, tanpa menyeret klip.',
    h3t: 'Tonton hasilnya',
    h3d: 'Kurang cocok? Minta versi lain, dia menyusun ulang.',

    featTitle: 'Apa yang sebenarnya dikerjakan',
    f1t: 'Menemukan momennya',
    f1d: 'Membuang awalan goyang dan empat puluh detik aspal.',
    f2t: 'Memotong mengikuti ketukan',
    f2d: 'Potongan jatuh di ketukan, bukan asal potong.',
    f3t: 'Tahu siapa siapa',
    f3d: 'Mengelompokkan wajah di perangkat, jadi “anak-anak” berarti anak Anda.',
    f4t: 'Menyusun ulang sesuai permintaan',
    f4d: 'Durasi lain, suasana lain, susunan baru dalam hitungan detik.',

    screensTitle: 'Isi aplikasinya',
    s1: 'Putar tahunnya ke hari mana pun Anda merekam',
    s2: 'Atur durasi, gaya dan musik, lalu minta perubahan',
    s3: 'Seluruh galeri, disaring ke yang penting',
    s4: 'Potong dan susun manual kalau mau',

    privTitle: 'Privasi ada di arsitekturnya',
    privLede: 'Deteksi adegan, pengelompokan wajah dan penilaian berjalan di iPhone Anda. File asli tidak pernah diunggah dan tidak melatih model apa pun.',
    privNote: 'Sutradara AI menyusun potongan dari deskripsi teks klip (durasi, label singkat), bukan dari videonya.',
    privLink: 'Baca kebijakan privasi',

    footerLlms: 'Untuk asisten AI',
    footerTag: 'Dibuat oleh SuperDuperAI',
    footerRights: 'Seluruh hak dilindungi.',

    aboutTitle: 'Tentang Life2Film',
    aboutMetaTitle: 'Tentang Life2Film — kenapa proses editing berjalan di iPhone',
    aboutMetaDesc:
      'Kenapa kami membuat editor yang memilih momen sendiri, dan kenapa analisisnya tetap di iPhone Anda: tidak ada server tempat mengirim rekaman.',
    aboutQuote:
      'Kumpulkan pengalaman, bukan barang. Suatu hari Anda bangun dan sadar bahwa harta yang dimiliki tidak berarti apa-apa. Hanya kenangan yang nilainya bertahan.',
    aboutP1:
      'Orang merekam video setiap hari. Hampir semuanya berakhir di arsip yang tidak pernah dibuka. Penyimpanan habis, perekaman berhenti, dan bertahun-tahun hilang begitu saja.',
    aboutP2:
      'Dari satu liburan penuh yang tersisa cuma beberapa foto. Anak-anak tumbuh seolah tidak pernah kecil. Teman-teman hilang sama sekali dari bingkai.',
    aboutH2: 'Editing yang tidak perlu dipelajari',
    aboutP3:
      'Arahkan ke satu acara, satu perjalanan, satu bulan kehidupan anak Anda: ia memilih momen yang layak disimpan, menatanya, dan menyusun sebuah film. Tanpa keahlian editing, tanpa timeline. Yang tersisa bukan cuma rekamannya, tapi rasa pernah ada di sana.',
    aboutH3: 'Film yang tersusun dari film',
    aboutP4:
      'Begitu Anda punya beberapa film, semuanya bisa jadi satu. Ambil sepotong dari tiap film dan jadilah film satu bulan; dari bulan-bulan itu, film satu tahun; dari tahun-tahun itu, film satu kehidupan. Roda kalender adalah gagasan itu dalam bentuk yang bisa dipakai: putar ke titik waktu mana pun dan lihat apa yang ada di sana.',
    aboutH4: 'Kenapa semuanya tetap di perangkat Anda',
    aboutP5:
      'Ini hanya berhasil kalau Anda bisa mempercayakan semuanya: take yang jelek, keluarga, rumah. Karena itu analisisnya berjalan di iPhone Anda dan rekamannya tidak keluar dari sana. Ini bukan kebijakan yang bisa kami ubah nanti: tidak ada server untuk mengirimnya.',
    aboutH5: 'Siapa yang membuat',
    aboutP6:
      'Life2Film dibuat oleh SuperDuperAi, Corp., perusahaan asal Delaware. Laporan bug, pertanyaan dan permintaan fitur masuk ke kotak surat yang sama, dan dibaca oleh manusia.',
    aboutH6: 'Dua belas tahun, satu gagasan',
    aboutP7:
      'Life2Film pertama rilis pada 2014: aplikasi iPhone yang memotong klip Anda menjadi film dengan sendirinya, saat belum ada yang menyebutnya AI. Lebih dari satu juta orang memasangnya. Teknologi masa itu tidak sanggup menepati janjinya, dan aplikasi ditutup pada 2021. Gagasannya tidak berubah sejak itu; bentuknya yang berubah. Yang dulu butuh server kini berjalan di ponsel di tangan Anda. Inilah film yang kami buat tentangnya waktu itu.',
    aboutVideoPlay: 'Putar film tahun 2014',
    aboutVideoNote: 'Video ini ada di YouTube dan baru dimuat setelah Anda menekan putar.',
  },

  ar: {
    metaTitle: 'Life2Film — تطبيق تعديل الفيديوهات والصور بالذكاء الاصطناعي دون إنترنت',
    metaDesc:
      'تطبيق تعديل فيديو بالذكاء الاصطناعي يعمل دون إنترنت: يركّب الفيديوهات والصور الموجودة على الآيفون، يقطع على إيقاع الموسيقى، ولا يرفع تسجيلاتك إلى أي خادم. بدون حساب.',
    navPrivacy: 'الخصوصية',
    navSupport: 'الدعم',
    navAbout: 'عن التطبيق',
    navStudio: 'Studio',
    navBlog: 'المدونة',

    heroTitle: 'مكتبتك،<br>تتحول إلى فيلم.',
    heroLede: 'ساعات من المقاطع من رحلة أو من سنة في حياة طفلك. يبقي Life2Film اللحظات المهمة ويركّبها في فيلم، على الآيفون نفسه.',
    ctaPrimary: 'حمّله من App Store',
    macCta: 'متوفر أيضًا لنظام Mac',

    heroProof: 'مجاني وبدون حساب · الإصدار الأول 2014، أكثر من مليون تثبيت',
    waitTitle: 'ليس لديك آيفون بعد؟',
    waitLede: 'رسالة واحدة عندما يجهز. لا شيء غير ذلك.',
    waitAndroid: 'أندرويد',
    waitStudio: 'Studio لماك خارج النسخة التجريبية',
    waitEmail: 'البريد الإلكتروني',
    waitSend: 'أخبرني',
    waitDone: 'تم التسجيل. رسالة واحدة عندما يجهز.',
    waitFail: 'لم يتم الإرسال. حاول مرة أخرى أو اكتب إلى info@life2film.com.',
    howTitle: 'ثلاث خطوات',
    h1t: 'اختر فترة زمنية',
    h1d: 'أدر العجلة إلى يوم أو شهر أو رحلة.',
    h2t: 'قل ما تريده',
    h2d: '«دقيقتان، أبقِ الشاطئ.» بلا مسار زمني وبلا سحب مقاطع.',
    h3t: 'شاهد النتيجة',
    h3d: 'لم يعجبك؟ اطلبه بشكل آخر فيعيد التركيب.',

    featTitle: 'ما الذي يفعله فعليًا',
    f1t: 'يعثر على اللحظات',
    f1d: 'يستبعد البدايات المهتزة وأربعين ثانية من الأسفلت.',
    f2t: 'يقطع على الإيقاع',
    f2d: 'القطع يقع على الإيقاع، لا عشوائيًا.',
    f3t: 'يعرف من في الصورة',
    f3d: 'يجمّع الوجوه على الجهاز، فيكون «الأطفال» أطفالك أنت.',
    f4t: 'يعيد التركيب عند الطلب',
    f4d: 'مدة أخرى، مزاج آخر، تركيب جديد خلال ثوانٍ.',

    screensTitle: 'من داخل التطبيق',
    s1: 'أدر السنة إلى أي يوم صوّرت فيه',
    s2: 'اضبط المدة والأسلوب والموسيقى ثم اطلب التعديل',
    s3: 'مكتبتك كاملة، مصفّاة إلى ما يهم',
    s4: 'قصّ ورتّب يدويًا متى أردت',

    privTitle: 'الخصوصية هي البنية نفسها',
    privLede: 'اكتشاف المشاهد وتجميع الوجوه والتقييم كلها تعمل على الآيفون. الملفات الأصلية لا تُرفع أبدًا ولا يُدرَّب عليها أي نموذج.',
    privNote: 'يخطط المخرج الذكي للتركيب من وصف نصي للمقاطع (توقيتات وعناوين قصيرة)، لا من الفيديو نفسه.',
    privLink: 'اقرأ سياسة الخصوصية',

    footerLlms: 'لمساعدي الذكاء الاصطناعي',
    footerTag: 'من صنع SuperDuperAI',
    footerRights: 'جميع الحقوق محفوظة.',

    aboutTitle: 'عن Life2Film',
    aboutMetaTitle: 'عن Life2Film — لماذا يجري المونتاج على جهاز iPhone نفسه',
    aboutMetaDesc:
      'لماذا صنعنا محرّرًا يختار اللحظات بنفسه، ولماذا يبقى التحليل على جهاز iPhone: لا يوجد خادم تُرسل إليه مقاطعك.',
    aboutQuote:
      'اجمع التجارب لا الأشياء. في يوم ما تستيقظ فتدرك أن ما تملكه بلا معنى. الذكريات وحدها تحتفظ بقيمتها.',
    aboutP1:
      'الناس يصوّرون كل يوم، وينتهي أغلب ما يصوّرونه في أرشيف لا يفتحه أحد. تمتلئ الذاكرة، فيتوقف التصوير، وتضيع سنوات بلا ضجيج.',
    aboutP2:
      'من إجازة كاملة تبقى بضع صور. يكبر الأطفال كأنهم لم يكونوا صغارًا قط. ويختفي الأصدقاء من الكادر تمامًا.',
    aboutH2: 'مونتاج لا يحتاج إلى تعلّم',
    aboutP3:
      'وجّهه إلى مناسبة أو رحلة أو شهر من عمر طفلك: يختار اللحظات التي تستحق البقاء، ويرتّبها، ويخرج بفيلم. بلا خبرة مونتاج وبلا مسار زمني. ما يبقى ليس التسجيل فقط، بل الإحساس بأنك كنت هناك.',
    aboutH3: 'فيلم مصنوع من أفلام',
    aboutP4:
      'حين تجتمع لديك عدة أفلام يمكن أن تصير فيلمًا واحدًا. خذ مقطعًا من كل واحد فيخرج فيلم عن شهر، ومن الشهور فيلم عن سنة، ومن السنوات فيلم عن حياة. عجلة التقويم هي هذه الفكرة في صورة عملية: أدرها إلى أي نقطة في الزمن وانظر ماذا هناك.',
    aboutH4: 'لماذا يبقى كل شيء على جهازك',
    aboutP5:
      'هذا لا ينجح إلا إذا كان بإمكانك أن تأتمنه على كل شيء: اللقطات غير الموفقة، والعائلة، والبيت. لذلك يجري التحليل على الآيفون ولا تغادره التسجيلات. وهذه ليست سياسة يمكننا تغييرها لاحقًا: لا يوجد أصلًا خادم تُرسل إليه.',
    aboutH5: 'من يصنعه',
    aboutP6:
      'يطوّر Life2Film شركة SuperDuperAi, Corp. المسجّلة في ديلاوير. تصل البلاغات والأسئلة والاقتراحات إلى البريد نفسه، ويقرأها إنسان.',
    aboutH6: 'اثنا عشر عامًا، فكرة واحدة',
    aboutP7:
      'صدر أول Life2Film عام 2014: تطبيق لآيفون يقصّ مقاطعك إلى فيلم من تلقاء نفسه، قبل أن يسمّي أحد ذلك ذكاءً اصطناعيًا. ثبّته أكثر من مليون شخص. لم تستطع تقنية ذلك الوقت الوفاء بالوعد، فأُغلق التطبيق عام 2021. الفكرة لم تتغير منذ ذلك الحين، وتغيّر الشكل: ما كان يحتاج إلى خادم صار يعمل على الهاتف الذي في يدك. هذا هو الفيلم الذي صنعناه عنه آنذاك.',
    aboutVideoPlay: 'شاهد فيلم 2014',
    aboutVideoNote: 'الفيديو على YouTube ولا يُحمَّل إلا عند الضغط على التشغيل.',
  },

  ru: {
    metaTitle: 'Life2Film — офлайн ИИ-монтаж видео на iPhone',
    metaDesc:
      'Приложение для ИИ-монтажа видео без интернета: собирает ролик из записей на iPhone, режет под бит и ничего не загружает в облако. Без регистрации.',
    navPrivacy: 'Приватность',
    navSupport: 'Поддержка',

    heroTitle: 'Ваша галерея —<br>смонтированный фильм.',
    heroLede: 'Часы роликов из поездки или за год жизни ребёнка. Life2Film оставляет главное и монтирует из этого фильм прямо на iPhone.',
    ctaPrimary: 'Загрузить в App Store',

    heroProof: 'Бесплатно, без регистрации · первая версия в 2014, больше миллиона установок',
    waitTitle: 'Пока не на iPhone?',
    waitLede: 'Одно письмо, когда будет готово. Больше ничего.',
    waitAndroid: 'Android',
    waitStudio: 'Studio для Mac выходит из беты',
    waitEmail: 'Почта',
    waitSend: 'Сообщить мне',
    waitDone: 'Записали. Одно письмо, когда будет готово.',
    waitFail: 'Не отправилось. Попробуйте ещё раз или напишите на info@life2film.com.',
    howTitle: 'Три шага',
    h1t: 'Выберите отрезок времени',
    h1d: 'Крутите круг до дня, месяца или поездки.',
    h2t: 'Скажите, что хотите',
    h2d: '«Две минуты, оставь пляж». Без таймлайна и перетаскивания клипов.',
    h3t: 'Смотрите',
    h3d: 'Не то? Попросите иначе, и он пересоберёт.',

    featTitle: 'Что он делает',
    f1t: 'Находит моменты',
    f1d: 'Выбрасывает тряские начала и сорок секунд асфальта.',
    f2t: 'Режет под бит',
    f2d: 'Склейки ложатся в музыку, а не куда придётся.',
    f3t: 'Различает людей',
    f3d: 'Группирует лица на устройстве, так что «дети» значит ваши дети.',
    f4t: 'Пересобирает по просьбе',
    f4d: 'Другая длина, другое настроение, новый монтаж за секунды.',

    privTitle: 'Приватность заложена в архитектуру',
    privLede: 'Разбор сцен, группировка лиц и оценка кадров идут на самом iPhone. Оригиналы никуда не загружаются, на них не обучают модели.',
    privNote: 'ИИ-режиссёр планирует монтаж по текстовому описанию клипов (тайминги, короткие метки), а не по видео.',
    privLink: 'Политика конфиденциальности',

    screensTitle: 'Как это выглядит',
    s1: 'Крутите год до любого дня, когда снимали',
    s2: 'Задайте длину, стиль и музыку, потом просите изменить',
    s3: 'Вся библиотека, отфильтрованная до нужного',
    s4: 'Подрезать и переставить вручную, когда хочется',
    navBlog: 'Блог',
    navStudio: 'Studio',
    macCta: 'Ещё есть версия для Mac',
    footerLlms: 'Для ИИ-ассистентов',
    footerTag: 'Сделано в SuperDuperAI',
    footerRights: 'Все права защищены.',

    navAbout: 'О проекте',
    aboutTitle: 'О Life2Film',
    aboutMetaTitle: 'О Life2Film — почему монтаж идёт на самом iPhone',
    aboutMetaDesc:
      'Зачем монтаж, который сам выбирает моменты, и почему анализ идёт на iPhone: записи никуда не уходят, отправлять их просто некуда.',
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
    aboutH5: 'Кто делает',
    aboutP6:
      'Life2Film делает SuperDuperAi, Corp., компания из штата Делавэр. Ошибки, вопросы и пожелания идут в один и тот же ящик, и их читает человек.',
    aboutH6: 'Двенадцать лет, одна идея',
    aboutP7:
      'Первый Life2Film вышел в 2014 году: приложение для iPhone, которое само резало ваши клипы в фильм, когда это ещё никто не называл ИИ. Его установили больше миллиона человек. Технологии того времени обещание не вытянули, и в 2021 году приложение закрылось. Идея с тех пор не сдвинулась, изменилась форма: то, для чего раньше нужен был сервер, теперь работает на телефоне у вас в руке. Это фильм, который мы тогда о нём сняли.',
    aboutVideoPlay: 'Смотреть фильм 2014 года',
    aboutVideoNote: 'Видео лежит на YouTube и загружается только после нажатия.',
  },

  tr: {
    metaTitle: 'Life2Film — iPhone için çevrimdışı yapay zekâ video montaj',
    metaDesc:
      'Çevrimdışı çalışan yapay zekâ video montaj uygulaması: iPhone videolarınızı kurgular, ritme göre keser ve hiçbir görüntüyü yüklemez. Hesap gerekmez.',
    navPrivacy: 'Gizlilik',
    navSupport: 'Destek',

    heroTitle: 'Galeriniz,<br>kurgulanmış bir film.',
    heroLede: 'Bir tatilden ya da çocuğunuzun bir yılından saatlerce görüntü. Life2Film önemli anları seçer ve iPhone’unuzda bir filme dönüştürür.',
    ctaPrimary: "App Store'dan İndirin",

    heroProof: 'Ücretsiz, hesap gerekmez · ilk sürüm 2014, bir milyondan fazla yükleme',
    waitTitle: 'Henüz iPhone yok mu?',
    waitLede: 'Hazır olduğunda tek bir e-posta. Başka hiçbir şey.',
    waitAndroid: 'Android',
    waitStudio: 'Mac için Studio betadan çıkınca',
    waitEmail: 'E-posta',
    waitSend: 'Haber ver',
    waitDone: 'Not edildi. Hazır olunca tek bir e-posta.',
    waitFail: 'Gönderilemedi. Yeniden deneyin ya da info@life2film.com adresine yazın.',
    howTitle: 'Üç adım',
    h1t: 'Bir zaman aralığı seçin',
    h1d: 'Çarkı bir güne, aya ya da tatile çevirin.',
    h2t: 'Ne istediğinizi söyleyin',
    h2d: '"İki dakika olsun, sahil kalsın." Zaman çizelgesi yok, klip sürüklemek yok.',
    h3t: 'İzleyin',
    h3d: 'Beğenmediniz mi? Yeniden isteyin, baştan kurar.',

    featTitle: 'Gerçekte ne yapıyor',
    f1t: 'Anları bulur',
    f1d: 'Sallantılı başlangıçları ve kırk saniyelik asfaltı atar.',
    f2t: 'Ritme göre keser',
    f2d: 'Kesmeler rastgele değil, ritme oturur.',
    f3t: 'Kimin kim olduğunu bilir',
    f3d: 'Yüzleri cihazda gruplar; "çocuklar" sizin çocuklarınız olur.',
    f4t: 'İstek üzerine yeniden kurar',
    f4d: 'Farklı süre, farklı ton, saniyeler içinde yeni kurgu.',

    privTitle: 'Gizlilik mimarinin kendisi',
    privLede: 'Sahne analizi, yüz gruplama ve puanlama iPhone’unuzda çalışır. Orijinaller hiçbir zaman yüklenmez ve hiçbir model eğitilmez.',
    privNote: 'Yapay zekâ yönetmen kurguyu kliplerin metin açıklamasından (süreler, kısa etiketler) planlar, videonun kendisinden asla.',
    privLink: 'Gizlilik politikasını okuyun',

    screensTitle: 'Uygulamanın içi',
    s1: 'Yılı çevirip çekim yaptığınız güne gidin',
    s2: 'Süreyi, stili ve müziği seçin, sonra değişiklik isteyin',
    s3: 'Tüm kütüphaneniz, işinize yarayana göre süzülmüş',
    s4: 'İsterseniz elle kırpın ve sırayı değiştirin',
    navBlog: 'Blog',
    navStudio: 'Studio',
    macCta: "Mac sürümü de var",
    footerLlms: 'Yapay zekâ asistanları için',
    footerTag: 'SuperDuperAI tarafından yapıldı',
    footerRights: 'Tüm hakları saklıdır.',

    navAbout: 'Hakkında',
    aboutTitle: 'Life2Film hakkında',
    aboutMetaTitle: "Life2Film hakkında — kurgu neden iPhone'unuzda çalışır",
    aboutMetaDesc:
      "Anları kendi seçen bir kurgu aracını neden yaptık ve analiz neden iPhone'unuzda kalıyor: görüntülerinizi göndereceğimiz bir sunucu yok.",
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
    aboutH5: 'Kim yapıyor',
    aboutP6:
      'Life2Film, Delaware merkezli SuperDuperAi, Corp. tarafından geliştiriliyor. Hatalar, sorular ve istekler aynı posta kutusuna gidiyor ve hepsini bir insan okuyor.',
    aboutH6: 'On iki yıl, tek bir fikir',
    aboutP7:
      'İlk Life2Film 2014’te çıktı: kliplerinizi kendi başına filme dönüştüren bir iPhone uygulamasıydı; o zamanlar kimse buna yapay zekâ demiyordu. Bir milyondan fazla kişi yükledi. O günün teknolojisi sözü tutamadı ve uygulama 2021’de kapandı. Fikir o günden beri yerinde duruyor; değişen biçim oldu. Eskiden sunucu gerektiren iş artık elinizdeki telefonda çalışıyor. Bu, o zaman onun hakkında çektiğimiz film.',
    aboutVideoPlay: '2014 filmini izle',
    aboutVideoNote: 'Video YouTube’da ve yalnızca oynata bastığınızda yüklenir.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}
