export const languages = { en: 'EN', es: 'ES', pt: 'PT', id: 'ID', ar: 'AR', ru: 'RU', tr: 'TR' } as const;

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

    heroBadge: 'on-device AI montage',
    heroTitle: 'Your camera roll,<br>cut into a film.',
    heroLede:
      'Hours of clips from a trip, a birthday, a year of a kid growing up. Life2Film watches every frame, keeps the moments that carry the story, and cuts them into something worth watching.',
    ctaPrimary: 'Download on the App Store',
    ctaNote: 'iPhone · works without an account · your videos stay on your device',

    howTitle: 'Three steps',
    h1t: 'Pick a stretch of time',
    h1d: 'Spin the wheel to a day, a month, a trip. Life2Film pulls everything you shot then.',
    h2t: 'Say what you want',
    h2d: '“Two minutes, keep the beach, skip the drive.” Plain language. No timeline, no dragging clips.',
    h3t: 'Watch it back',
    h3d: 'A cut with deliberate pacing. Not liked? Ask again and it re-cuts.',

    featTitle: 'What it actually does',
    f1t: 'Finds the moments',
    f1d: 'Scores every clip on motion, faces, framing and sound, then drops the shaky starts and the forty seconds of pavement.',
    f2t: 'Cuts to the beat',
    f2d: 'Beat detection lines the edits up with the music instead of cutting at random.',
    f3t: 'Knows who is who',
    f3d: 'Groups faces on device, so “the film about the kids” means the one about your kids.',
    f4t: 'Re-cuts on request',
    f4d: 'Change the length, the mood, what stays in. The agent recuts in seconds, with no re-editing.',

    privTitle: 'Privacy is the architecture',
    privLede:
      'Your footage is personal, so it stays where it is. Scene detection, face grouping and scoring run on your iPhone. Originals are never uploaded, nothing trains a model, and there is no feed to post to.',
    privNote:
      'When the AI director plans a cut, it sees a text description of the clips: timings and short labels. Never the video itself.',
    privLink: 'Read the privacy policy',

    screensTitle: 'Inside the app',
    s1: 'Spin the year to any day you filmed',
    s2: 'Set length, style and music, then ask for changes',
    s3: 'Your whole library, filtered to what matters',
    s4: 'Trim and reorder by hand when you want to',
    navBlog: 'Blog',
    navStudio: 'Studio',
    macCta: 'Also on Mac',
    macNote: 'Desktop beta · Apple Silicon · free',
    footerLlms: 'For AI assistants',
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

    heroBadge: 'IA en el dispositivo',
    heroTitle: 'Tu galería,<br>convertida en película.',
    heroLede:
      'Horas de clips de un viaje, un cumpleaños, un año de tu hijo creciendo. Life2Film mira cada fotograma, se queda con los momentos que sostienen la historia y los monta en algo que vale la pena ver.',
    ctaPrimary: 'Descargar en el App Store',
    ctaNote: 'iPhone · sin cuenta · tus videos no salen del teléfono',
    macCta: 'También para Mac',
    macNote: 'Beta de escritorio · Apple Silicon · gratis',

    howTitle: 'Tres pasos',
    h1t: 'Elige un momento del tiempo',
    h1d: 'Gira la rueda hasta un día, un mes, un viaje. Life2Film reúne todo lo que grabaste entonces.',
    h2t: 'Di lo que quieres',
    h2d: '“Dos minutos, deja la playa, quita la carretera.” Lenguaje normal. Sin línea de tiempo, sin arrastrar clips.',
    h3t: 'Míralo',
    h3d: 'Un montaje con ritmo pensado. ¿No te convence? Pídelo distinto y lo vuelve a montar.',

    featTitle: 'Qué hace en concreto',
    f1t: 'Encuentra los momentos',
    f1d: 'Puntúa cada clip por movimiento, caras, encuadre y sonido, y descarta los arranques temblorosos y los cuarenta segundos de asfalto.',
    f2t: 'Corta al ritmo',
    f2d: 'Detecta el tempo y coloca los cortes donde gira la música, en vez de cortar al azar.',
    f3t: 'Sabe quién es quién',
    f3d: 'Agrupa caras en el propio teléfono, así “la película de los niños” es la de tus niños.',
    f4t: 'Rehace el montaje',
    f4d: 'Cambia la duración, el tono, lo que se queda. El agente vuelve a montar en segundos.',

    screensTitle: 'Por dentro',
    s1: 'Gira el año hasta cualquier día que grabaste',
    s2: 'Elige duración, estilo y música, y luego pide cambios',
    s3: 'Toda tu galería, filtrada a lo que importa',
    s4: 'Recorta y reordena a mano cuando quieras',

    privTitle: 'La privacidad es la arquitectura',
    privLede:
      'Tus grabaciones son personales, así que se quedan donde están. La detección de escenas, el agrupado de caras y la puntuación se ejecutan en tu iPhone. Los originales nunca se suben, nada entrena a ningún modelo y no hay ningún muro donde publicar.',
    privNote:
      'Cuando el director de IA planea un montaje, ve una descripción en texto de los clips: tiempos y etiquetas cortas. Nunca el video.',
    privLink: 'Leer la política de privacidad',

    footerLlms: 'Para asistentes de IA',
    footerTag: 'Hecho por SuperDuperAI',
    footerRights: 'Todos los derechos reservados.',

    aboutTitle: 'Sobre Life2Film',
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

    heroBadge: 'IA no próprio aparelho',
    heroTitle: 'Sua galeria,<br>virada filme.',
    heroLede:
      'Horas de clipes de uma viagem, de um aniversário, de um ano do seu filho crescendo. O Life2Film assiste cada quadro, guarda os momentos que sustentam a história e monta algo que vale rever.',
    ctaPrimary: 'Baixar na App Store',
    ctaNote: 'iPhone · sem conta · seus vídeos não saem do aparelho',
    macCta: 'Também para Mac',
    macNote: 'Beta para desktop · Apple Silicon · grátis',

    howTitle: 'Três passos',
    h1t: 'Escolha um trecho do tempo',
    h1d: 'Gire a roda até um dia, um mês, uma viagem. O Life2Film junta tudo o que você gravou naquele período.',
    h2t: 'Diga o que você quer',
    h2d: '“Dois minutos, mantenha a praia, tire a estrada.” Em linguagem comum. Sem linha do tempo, sem arrastar clipes.',
    h3t: 'Assista',
    h3d: 'Uma montagem com ritmo pensado. Não gostou? Peça diferente e ele remonta.',

    featTitle: 'O que ele faz de fato',
    f1t: 'Acha os momentos',
    f1d: 'Pontua cada clipe por movimento, rostos, enquadramento e som, e descarta os começos tremidos e os quarenta segundos de asfalto.',
    f2t: 'Corta no ritmo',
    f2d: 'Detecta o andamento e coloca os cortes onde a música vira, em vez de cortar a esmo.',
    f3t: 'Sabe quem é quem',
    f3d: 'Agrupa rostos no próprio aparelho, então “o filme das crianças” é o das suas crianças.',
    f4t: 'Remonta quando você pede',
    f4d: 'Mude a duração, o clima, o que fica. O agente remonta em segundos.',

    screensTitle: 'Por dentro',
    s1: 'Gire o ano até qualquer dia em que filmou',
    s2: 'Defina duração, estilo e música, depois peça mudanças',
    s3: 'Sua biblioteca inteira, filtrada no que importa',
    s4: 'Corte e reordene na mão quando quiser',

    privTitle: 'A privacidade é a arquitetura',
    privLede:
      'Suas gravações são pessoais, então elas ficam onde estão. Detecção de cenas, agrupamento de rostos e pontuação rodam no seu iPhone. Os originais nunca são enviados, nada treina modelo nenhum e não existe feed para publicar.',
    privNote:
      'Quando o diretor de IA planeja um corte, ele vê uma descrição em texto dos clipes: tempos e rótulos curtos. Nunca o vídeo.',
    privLink: 'Ler a política de privacidade',

    footerLlms: 'Para assistentes de IA',
    footerTag: 'Feito pela SuperDuperAI',
    footerRights: 'Todos os direitos reservados.',

    aboutTitle: 'Sobre o Life2Film',
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

    heroBadge: 'AI langsung di perangkat',
    heroTitle: 'Galeri Anda,<br>jadi sebuah film.',
    heroLede:
      'Berjam-jam klip dari liburan, ulang tahun, satu tahun anak tumbuh besar. Life2Film menonton tiap frame, menyimpan momen yang membangun cerita, dan merangkainya jadi sesuatu yang layak ditonton lagi.',
    ctaPrimary: 'Unduh di App Store',
    ctaNote: 'iPhone · tanpa akun · video Anda tetap di perangkat',
    macCta: 'Ada juga untuk Mac',
    macNote: 'Beta desktop · Apple Silicon · gratis',

    howTitle: 'Tiga langkah',
    h1t: 'Pilih rentang waktunya',
    h1d: 'Putar roda ke satu hari, satu bulan, satu perjalanan. Life2Film mengumpulkan semua yang Anda rekam saat itu.',
    h2t: 'Katakan mau seperti apa',
    h2d: '“Dua menit, simpan bagian pantai, buang perjalanannya.” Bahasa biasa. Tanpa timeline, tanpa menyeret klip.',
    h3t: 'Tonton hasilnya',
    h3d: 'Rangkaian dengan tempo yang dipikirkan. Kurang cocok? Minta versi lain, dia menyusun ulang.',

    featTitle: 'Apa yang sebenarnya dikerjakan',
    f1t: 'Menemukan momennya',
    f1d: 'Menilai tiap klip dari gerakan, wajah, komposisi dan suara, lalu membuang awalan goyang dan empat puluh detik aspal.',
    f2t: 'Memotong mengikuti ketukan',
    f2d: 'Mendeteksi tempo dan meletakkan potongan di titik musik berbelok, bukan asal potong.',
    f3t: 'Tahu siapa siapa',
    f3d: 'Mengelompokkan wajah di perangkat, jadi “film tentang anak-anak” memang tentang anak Anda.',
    f4t: 'Menyusun ulang sesuai permintaan',
    f4d: 'Ubah durasi, suasana, isi yang dipakai. Agen menyusun ulang dalam hitungan detik.',

    screensTitle: 'Isi aplikasinya',
    s1: 'Putar tahunnya ke hari mana pun Anda merekam',
    s2: 'Atur durasi, gaya dan musik, lalu minta perubahan',
    s3: 'Seluruh galeri, disaring ke yang penting',
    s4: 'Potong dan susun manual kalau mau',

    privTitle: 'Privasi ada di arsitekturnya',
    privLede:
      'Rekaman Anda bersifat pribadi, jadi tetap di tempatnya. Deteksi adegan, pengelompokan wajah dan penilaian kualitas berjalan di iPhone Anda. File asli tidak pernah diunggah, tidak ada model yang dilatih dari itu, dan tidak ada feed untuk diposting.',
    privNote:
      'Saat sutradara AI menyusun rencana potongan, yang dilihatnya adalah deskripsi teks klip: durasi dan label singkat. Bukan videonya.',
    privLink: 'Baca kebijakan privasi',

    footerLlms: 'Untuk asisten AI',
    footerTag: 'Dibuat oleh SuperDuperAI',
    footerRights: 'Seluruh hak dilindungi.',

    aboutTitle: 'Tentang Life2Film',
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

    heroBadge: 'ذكاء اصطناعي على الجهاز',
    heroTitle: 'مكتبتك،<br>تتحول إلى فيلم.',
    heroLede:
      'ساعات من المقاطع من رحلة، من عيد ميلاد، من سنة كاملة في حياة طفلك. يشاهد Life2Film كل إطار، يبقي اللحظات التي تحمل الحكاية، ويركّبها في شيء يستحق المشاهدة من جديد.',
    ctaPrimary: 'حمّله من App Store',
    ctaNote: 'آيفون · بدون حساب · فيديوهاتك تبقى على جهازك',
    macCta: 'متوفر أيضًا لنظام Mac',
    macNote: 'نسخة تجريبية للحاسوب · Apple Silicon · مجانًا',

    howTitle: 'ثلاث خطوات',
    h1t: 'اختر فترة زمنية',
    h1d: 'أدر العجلة إلى يوم أو شهر أو رحلة، فيجمع Life2Film كل ما صوّرته حينها.',
    h2t: 'قل ما تريده',
    h2d: '«دقيقتان، أبقِ الشاطئ، احذف الطريق.» بلغة عادية. بلا مسار زمني وبلا سحب مقاطع.',
    h3t: 'شاهد النتيجة',
    h3d: 'تركيب بإيقاع مدروس. لم يعجبك؟ اطلبه بشكل آخر فيعيد التركيب.',

    featTitle: 'ما الذي يفعله فعليًا',
    f1t: 'يعثر على اللحظات',
    f1d: 'يقيّم كل مقطع من حيث الحركة والوجوه والتكوين والصوت، ثم يستبعد البدايات المهتزة وأربعين ثانية من الأسفلت.',
    f2t: 'يقطع على الإيقاع',
    f2d: 'يكتشف الإيقاع ويضع القطع عند منعطفات الموسيقى بدل القطع العشوائي.',
    f3t: 'يعرف من في الصورة',
    f3d: 'يجمّع الوجوه على الجهاز نفسه، فيكون «فيلم الأطفال» عن أطفالك أنت.',
    f4t: 'يعيد التركيب عند الطلب',
    f4d: 'غيّر المدة أو المزاج أو ما يبقى في الفيلم، فيعيد التركيب خلال ثوانٍ.',

    screensTitle: 'من داخل التطبيق',
    s1: 'أدر السنة إلى أي يوم صوّرت فيه',
    s2: 'اضبط المدة والأسلوب والموسيقى ثم اطلب التعديل',
    s3: 'مكتبتك كاملة، مصفّاة إلى ما يهم',
    s4: 'قصّ ورتّب يدويًا متى أردت',

    privTitle: 'الخصوصية هي البنية نفسها',
    privLede:
      'تسجيلاتك شخصية، لذلك تبقى مكانها. اكتشاف المشاهد وتجميع الوجوه وتقييم الجودة كلها تعمل على الآيفون. الملفات الأصلية لا تُرفع أبدًا، ولا يُدرَّب عليها أي نموذج، ولا توجد صفحة عامة للنشر.',
    privNote:
      'حين يخطط المخرج الذكي للتركيب، فإنه يرى وصفًا نصيًا للمقاطع: التوقيتات وعناوين قصيرة. لا يرى الفيديو نفسه أبدًا.',
    privLink: 'اقرأ سياسة الخصوصية',

    footerLlms: 'لمساعدي الذكاء الاصطناعي',
    footerTag: 'من صنع SuperDuperAI',
    footerRights: 'جميع الحقوق محفوظة.',

    aboutTitle: 'عن Life2Film',
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
  },

  ru: {
    metaTitle: 'Life2Film — офлайн ИИ-монтаж видео на iPhone',
    metaDesc:
      'Приложение для ИИ-монтажа видео без интернета: собирает ролик из записей на iPhone, режет под бит и ничего не загружает в облако. Без регистрации.',
    navPrivacy: 'Приватность',
    navSupport: 'Поддержка',

    heroBadge: 'ИИ-монтаж на устройстве',
    heroTitle: 'Ваша галерея —<br>смонтированный фильм.',
    heroLede:
      'Часы роликов из поездки, с дня рождения, за год жизни ребёнка. Life2Film просматривает каждый кадр, оставляет то, что держит историю, и собирает из этого фильм, который хочется пересматривать.',
    ctaPrimary: 'Загрузить в App Store',
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
    navBlog: 'Блог',
    navStudio: 'Studio',
    macCta: 'Ещё есть версия для Mac',
    macNote: 'Бета для десктопа · Apple Silicon · бесплатно',
    footerLlms: 'Для ИИ-ассистентов',
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
    aboutH5: 'Кто делает',
    aboutP6:
      'Life2Film делает SuperDuperAi, Corp., компания из штата Делавэр. Ошибки, вопросы и пожелания идут в один и тот же ящик, и их читает человек.',
  },

  tr: {
    metaTitle: 'Life2Film — iPhone için çevrimdışı yapay zekâ video montaj',
    metaDesc:
      'Çevrimdışı çalışan yapay zekâ video montaj uygulaması: iPhone videolarınızı kurgular, ritme göre keser ve hiçbir görüntüyü yüklemez. Hesap gerekmez.',
    navPrivacy: 'Gizlilik',
    navSupport: 'Destek',

    heroBadge: 'cihazda yapay zekâ montajı',
    heroTitle: 'Galeriniz,<br>kurgulanmış bir film.',
    heroLede:
      'Bir tatilden, bir doğum gününden, bir çocuğun büyüdüğü yıldan kalan saatlerce görüntü. Life2Film her kareyi izler, hikâyeyi taşıyan anları seçer ve izlemeye değer bir film çıkarır.',
    ctaPrimary: "App Store'dan İndirin",
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
    navBlog: 'Blog',
    navStudio: 'Studio',
    macCta: "Mac sürümü de var",
    macNote: 'Masaüstü beta · Apple Silicon · ücretsiz',
    footerLlms: 'Yapay zekâ asistanları için',
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
    aboutH5: 'Kim yapıyor',
    aboutP6:
      'Life2Film, Delaware merkezli SuperDuperAi, Corp. tarafından geliştiriliyor. Hatalar, sorular ve istekler aynı posta kutusuna gidiyor ve hepsini bir insan okuyor.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}
