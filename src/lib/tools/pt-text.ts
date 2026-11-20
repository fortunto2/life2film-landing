import type { ToolTranslations } from '../tools-i18n';

/** Speech, text, recording and sound tools (20 Nov 2026), apart so pt.ts stays under 1000 lines. */
export const ptText: ToolTranslations = {
  'auto-subtitles': {
    searchPhrase: 'Gerador de legendas automáticas online',
    title: 'Legendas automáticas online grátis — vídeo para SRT com Whisper, sem upload',
    description:
      'Crie legendas de um vídeo automaticamente, online e grátis: o Whisper roda no navegador e escreve SRT ou VTT com tempos, em 99 idiomas. O vídeo não é enviado; o modelo é baixado uma vez.',
    heading: 'Legendas',
    accent: 'automáticas',
    lede: 'Transforme a fala em legendas com tempo sem enviar o vídeo a lugar nenhum.',
    blurb: 'Fala para SRT ou VTT no navegador com Whisper, e depois embutir com um clique.',
    featureList: [
      'Whisper base (rápido) ou small (mais preciso) na aba',
      'Idioma detectado ou escolhido',
      'SRT e WebVTT com tempos e linhas legíveis',
      'O vídeo não é enviado; o modelo baixa uma vez',
    ],
    faq: [
      {
        q: 'É preciso?',
        a: 'É o Whisper em tamanhos pequenos: fala clara sai quase limpa; ruído, vozes sobrepostas e nomes precisam de revisão.',
      },
      {
        q: 'Meu vídeo é enviado?',
        a: 'Não. Só os arquivos do modelo vêm da internet (Hugging Face); o som é transcrito no seu computador.',
      },
    ],
  },
  'add-text-to-video': {
    searchPhrase: 'Colocar texto em vídeo online',
    title: 'Colocar texto em vídeo online grátis — legenda fixa, sem upload',
    description:
      'Coloque texto num vídeo online e grátis: escreva a frase, escolha tamanho e em cima ou embaixo, e receba um MP4 com o texto na imagem, branco com contorno escuro. No navegador, sem upload.',
    heading: 'Colocar texto no',
    accent: 'vídeo',
    lede: 'Escreva uma frase e ela aparece na imagem. O vídeo fica no seu aparelho.',
    blurb: 'Uma frase no vídeo, em cima ou embaixo, legível em qualquer fundo.',
    featureList: [
      'Uma frase para o vídeo todo, até 200 caracteres',
      'Branco com contorno escuro, legível em qualquer fundo',
      'Três tamanhos, em cima ou embaixo',
      'Tudo no navegador: sem upload',
    ],
    faq: [
      {
        q: 'Meu vídeo é enviado?',
        a: 'Não. O navegador desenha cada quadro e codifica o resultado.',
      },
    ],
  },
  'voice-recorder': {
    searchPhrase: 'Gravador de voz online',
    title: 'Gravador de voz online grátis — grave áudio em MP3 sem cadastro',
    description:
      'Grave sua voz online e grátis: aperte gravar, fale, pare e o navegador salva um MP3 ou WAV. Sem cadastro nem limite de tempo; nada é enviado.',
    heading: 'Gravador de voz',
    accent: 'online',
    lede: 'Aperte gravar, fale e receba um MP3. O som não sai do seu computador.',
    blurb: 'Grave a voz do microfone e salve em MP3 ou WAV.',
    featureList: [
      'MP3 (192 kbps) ou WAV',
      'Medidor de nível, vermelho quando satura',
      'Som cru: sem supressão de ruído nem ganho automático',
      'Sem cadastro, sem limite, sem upload',
    ],
    faq: [
      {
        q: 'A gravação é enviada?',
        a: 'Não. O navegador grava o microfone e codifica o MP3; o arquivo vai direto para os downloads.',
      },
      {
        q: 'O navegador não consegue o microfone.',
        a: 'Clique no ícone de cadeado na barra de endereço e permita o microfone para este site.',
      },
    ],
  },
  'webcam-recorder': {
    searchPhrase: 'Gravar da webcam online',
    title: 'Gravar vídeo da webcam online grátis — sem upload nem marca d’água',
    description:
      'Grave vídeo da webcam online e grátis: ligue a câmera, aperte gravar, pare e o navegador salva o vídeo com som (MP4 ou WebM). Sem cadastro, marca d’água ou limite; nada é enviado.',
    heading: 'Gravar da',
    accent: 'webcam',
    lede: 'Você se vê, aperta gravar e fica com o arquivo. Nada sai do computador.',
    blurb: 'Grave-se pela webcam e salve o vídeo com som.',
    featureList: [
      'Câmera e microfone, 480p, 720p ou 1080p',
      'MP4 no Safari e Chrome recente, WebM nos outros',
      'Prévia espelhada; o arquivo é salvo sem espelho',
      'Sem cadastro, sem marca d’água, sem upload',
    ],
    faq: [
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador grava a câmera na memória e salva o arquivo nos downloads.',
      },
    ],
  },
  'change-key': {
    searchPhrase: 'Mudar o tom de uma música online',
    title: 'Mudar o tom de uma música online grátis — sem mudar o andamento',
    description:
      'Mude o tom de uma música online e grátis: suba ou desça até 12 semitons mantendo o andamento e salve MP3 ou WAV. Para cantar na sua extensão ou tocar junto. No navegador, sem upload.',
    heading: 'Mudar o tom de',
    accent: 'uma música',
    lede: 'Para cima ou para baixo em semitons, mesmo andamento. A música fica no seu aparelho.',
    blurb: 'Suba ou desça uma música em semitons sem mudar o andamento.',
    featureList: [
      'De −12 a +12 semitons',
      'Andamento e duração iguais',
      'MP3 ou WAV, ouça na página',
      'Nada é enviado',
    ],
    faq: [
      {
        q: 'Quantos semitons eu preciso?',
        a: 'Um semitom por passo: de Dó para Ré é +2. Descubra o tom atual com o Detector de tom (/pt/tools/key-finder/).',
      },
      {
        q: 'O arquivo é enviado?',
        a: 'Não. O navegador decodifica, muda e codifica a música.',
      },
    ],
  },
  'add-logo-to-video': {
    searchPhrase: 'Colocar logo em vídeo online',
    title: 'Colocar logo ou marca d’água em vídeo online grátis — sem upload',
    description:
      'Coloque seu logo ou marca d’água num vídeo online e grátis: escolha PNG (com transparência), JPG ou SVG, um canto, tamanho e opacidade, e receba um MP4. No navegador, sem upload.',
    heading: 'Colocar logo no',
    accent: 'vídeo',
    lede: 'Seu logo no canto de cada quadro. O vídeo fica no seu aparelho.',
    blurb: 'Seu logo ou marca d’água num canto do vídeo.',
    featureList: [
      'PNG com transparência, JPG, WebP ou SVG',
      'Quatro cantos ou o centro',
      'Tamanho e opacidade ajustáveis',
      'Sem upload nem marca d’água nossa',
    ],
    faq: [
      {
        q: 'O fundo do logo aparece?',
        a: 'Não se for PNG ou SVG com transparência. JPG não tem transparência.',
      },
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador desenha o logo em cada quadro.',
      },
    ],
  },
  'sped-up-slowed-reverb': {
    searchPhrase: 'Música sped up e slowed + reverb online',
    title: 'Sped up e slowed + reverb online grátis — acelerar ou desacelerar músicas sem upload',
    description:
      'Crie a versão sped up ou slowed + reverb de uma música online e grátis: presets de um clique, velocidade de 0,5× a 2×, reverb e opção de manter o tom. MP3 ou WAV. No navegador, sem upload.',
    heading: 'Sped up e',
    accent: 'slowed + reverb',
    lede: 'As versões de TikTok de uma música, feitas no seu aparelho.',
    blurb: 'Versão sped up ou slowed + reverb de uma música.',
    featureList: [
      'Presets: sped up 1,25×, slowed 0,8× com reverb',
      'Qualquer velocidade de 0,5× a 2×',
      'Como um toca-discos ou mantendo o tom',
      'MP3 ou WAV, sem upload',
    ],
    faq: [
      {
        q: 'Por que fica mais agudo?',
        a: 'É o som do sped up: o tom sobe com o andamento. Marque «Manter o tom» para mudar só o andamento.',
      },
      {
        q: 'A música é enviada?',
        a: 'Não. O navegador a processa.',
      },
    ],
  },
  'remove-background-noise': {
    searchPhrase: 'Remover ruído de fundo do áudio online',
    title: 'Remover ruído de fundo de áudio e vídeo online grátis — sem upload',
    description:
      'Remova o ruído de fundo de uma gravação de voz ou vídeo online e grátis: ventilador, zumbido, vento e trânsito saem da voz com o RNNoise, uma rede neural para voz que roda no navegador. O vídeo mantém a imagem; nada é enviado.',
    heading: 'Remover ruído',
    accent: 'de fundo',
    lede: 'Limpe o ruído da voz. O arquivo fica no seu aparelho.',
    blurb: 'Tire zumbido, vento e ruído de sala da voz.',
    featureList: [
      'RNNoise (Xiph), supressor de ruído neural para voz',
      'Funciona com vídeos e gravações',
      'Controle de intensidade',
      'Nada é enviado',
    ],
    faq: [
      {
        q: 'Que ruído ele remove?',
        a: 'Ruído constante em volta da voz: ventiladores, ar-condicionado, zumbido, vento, trânsito. Não é para música.',
      },
      {
        q: 'Meu arquivo é enviado?',
        a: 'Não. A rede roda no navegador via WebAssembly.',
      },
    ],
  },
  'audio-to-video': {
    searchPhrase: 'Converter áudio em vídeo online',
    title: 'Áudio para vídeo online grátis — MP3 para MP4 com imagem para o YouTube',
    description:
      'Converta áudio em vídeo online e grátis: um MP3, M4A ou WAV mais uma capa viram um MP4 para YouTube, Shorts ou Reels, com barras de nível opcionais. No navegador, sem upload.',
    heading: 'Áudio para',
    accent: 'vídeo',
    lede: 'Uma música, um podcast ou um áudio, prontos para o YouTube.',
    blurb: 'MP3 para MP4 para o YouTube: capa, seu som e barras que se movem com ele.',
    featureList: [
      'Capa sobre uma cópia desfocada, ou fundo escuro',
      'Barras de nível animadas (opcional)',
      '16:9, 1:1 ou 9:16',
      'Nada é enviado',
    ],
    faq: [
      {
        q: 'Por que não posso enviar MP3 ao YouTube?',
        a: 'O YouTube só aceita vídeo. Isto coloca o som num MP4 com imagem.',
      },
      {
        q: 'Meu arquivo é enviado?',
        a: 'Não. O navegador cria o vídeo.',
      },
    ],
  },
  'blur-background-video': {
    searchPhrase: 'Vídeo vertical com fundo desfocado',
    title: 'Deixar vídeo vertical com fundo desfocado online grátis — 9:16 sem cortar',
    description:
      'Transforme um vídeo horizontal em 9:16 para Reels, TikTok e Shorts (ou 4:5, 1:1) sem cortar: o quadro inteiro fica no centro e uma cópia desfocada preenche as faixas. Online, grátis, no navegador; sem upload.',
    heading: 'Vídeo vertical com',
    accent: 'fundo desfocado',
    lede: 'Nada cortado, sem barras pretas.',
    blurb: 'Vídeo horizontal em vertical sem cortar: um fundo desfocado preenche o resto.',
    featureList: [
      '9:16, 4:5, 1:1 ou 16:9',
      'O quadro inteiro, centralizado',
      'Faixas com cópia desfocada',
      'Sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'Qual a diferença para cortar?',
        a: 'Cortar tira as laterais. Isto mantém tudo e preenche o espaço com desfoque.',
      },
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador processa.',
      },
    ],
  },
  'video-filters': {
    searchPhrase: 'Filtros de vídeo online',
    title: 'Filtros de vídeo online grátis — clarear vídeo escuro, preto e branco, sem upload',
    description:
      'Aplique filtros num vídeo online e grátis: clareie um vídeo escuro, deixe preto e branco, vívido, quente, frio ou vintage, ou ajuste brilho, contraste, saturação e calor com prévia ao vivo. No navegador, sem upload.',
    heading: 'Filtros de',
    accent: 'vídeo',
    lede: 'Veja o resultado no seu clipe antes de salvar.',
    blurb: 'Clarear vídeo escuro, preto e branco, mais quente ou vívido, com prévia.',
    featureList: [
      'Presets: clarear, preto e branco, vívido, quente, frio, vintage',
      'Brilho, contraste, saturação e calor',
      'Prévia ao vivo',
      'Sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'Como clareio um vídeo muito escuro?',
        a: 'Clique em «Clarear» e aumente o brilho até os rostos aparecerem.',
      },
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador aplica o filtro.',
      },
    ],
  },
  'split-screen-video': {
    searchPhrase: 'Dois vídeos na mesma tela online',
    title: 'Tela dividida online grátis — dois vídeos lado a lado, sem upload',
    description:
      'Coloque dois vídeos no mesmo quadro online e grátis: lado a lado (16:9) ou um sobre o outro (9:16 para Reels e TikTok), sincronizados, com o som de um ou dos dois. No navegador, sem upload.',
    heading: 'Tela',
    accent: 'dividida',
    lede: 'Dois clipes, um quadro, sincronizados.',
    blurb: 'Dois vídeos lado a lado ou um sobre o outro, ao mesmo tempo.',
    featureList: [
      'Lado a lado (1920x1080) ou empilhados (1080x1920)',
      'Cada clipe preenche sua metade sem distorcer',
      'Som do primeiro, do segundo ou dos dois',
      'Sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'E se tiverem durações diferentes?',
        a: 'O resultado dura o mesmo que o mais curto.',
      },
      {
        q: 'Os vídeos são enviados?',
        a: 'Não. O navegador os processa.',
      },
    ],
  },
  'tiktok-captions': {
    searchPhrase: 'Legendas estilo TikTok',
    title: 'Legendas estilo TikTok online grátis — legendas grandes palavra por palavra, sem upload',
    description:
      'Adicione legendas estilo TikTok e Reels a um vídeo automaticamente, online e grátis: o Whisper ouve a fala no navegador e grava legendas grandes em negrito, de 1 a 4 palavras, no centro. Sem upload, sem marca d’água.',
    heading: 'Legendas',
    accent: 'estilo TikTok',
    lede: 'Da fala a legendas grandes em um passo.',
    blurb: 'Legendas grandes de poucas palavras no centro, a partir da fala.',
    featureList: [
      'Tempo por palavra com Whisper, 1–4 palavras',
      'Branco em negrito com contorno, centralizado',
      '99 idiomas',
      'Sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'Posso corrigir uma palavra?',
        a: 'Aqui não. Para controlar, crie um SRT em Legendas automáticas, corrija e grave com Embutir legendas.',
      },
      {
        q: 'O vídeo é enviado?',
        a: 'Não. Tudo roda no navegador.',
      },
    ],
  },
  'fade-video': {
    searchPhrase: 'Fade in e fade out em vídeo online',
    title: 'Fade em vídeo online grátis — entrada e saída do preto, sem upload',
    description:
      'Adicione fade in do preto e fade out para o preto a um vídeo online e grátis, com o som acompanhando. De 0,5 a 3 s em cada ponta. No navegador, sem upload.',
    heading: 'Fade in e fade out',
    accent: 'em vídeo',
    lede: 'Um começo suave e um final limpo.',
    blurb: 'Fade do preto e para o preto, com o som.',
    featureList: [
      'Fade de 0,5 a 3 s em cada ponta',
      'O som acompanha a imagem',
      'Sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'O som também?',
        a: 'Sim, nos mesmos segundos.',
      },
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador o processa.',
      },
    ],
  },
  'resize-video': {
    searchPhrase: 'Mudar a resolução de um vídeo online',
    title: 'Redimensionar vídeo online grátis — 4K para 1080p, 720p, sem upload',
    description:
      'Mude a resolução de um vídeo online e grátis: 4K para 1080p, 1080p para 720p, 480p ou 360p, vertical ou horizontal, mantendo o formato. No navegador, sem upload.',
    heading: 'Redimensionar',
    accent: 'vídeo',
    lede: 'Resolução menor em um passo.',
    blurb: 'Mude a resolução: 4K para 1080p, 1080p para 720p…',
    featureList: [
      'De 2160p a 360p',
      'Vertical ou horizontal, formato mantido',
      'Nunca amplia',
      'Sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'O que é 720p na vertical?',
        a: '720x1280: escolhe-se o lado maior.',
      },
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador o processa.',
      },
    ],
  },
};
