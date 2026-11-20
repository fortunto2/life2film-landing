import type { ToolTranslations } from '../tools-i18n';

/** Portuguese. Brazilian search wording: "online" and "grátis" carry the query. */
export const pt: ToolTranslations = {
  'video-compressor': {
    searchPhrase: 'Comprimir vídeo online',
    title: 'Comprimir Vídeo Online Grátis — para 10MB no Discord, 25MB no email',
    description:
      'Compressor de vídeo online e gratuito que atinge um tamanho exato: 10 MB para o Discord, 16 MB para o WhatsApp, 25 MB para email. Funciona no seu navegador: sem enviar nada, sem limite de tamanho, sem marca d\'água e sem cadastro.',
    heading: 'Comprimir',
    accent: 'Vídeo',
    lede: 'Mire num tamanho — 10 MB para o Discord, 25 MB para email — ou simplesmente baixe a qualidade. Roda na sua máquina, então não há limite de tamanho nem fila.',
    blurb: 'Deixe o arquivo menor e veja exatamente o que isso custou. Sem limite, porque não existe servidor.',
    featureList: [
      'Mira um tamanho de arquivo exato',
      'Predefinições para os limites do Discord, WhatsApp e email',
      'Estimativa do tamanho antes de codificar',
      'Uma segunda passagem corrige qualquer desvio',
      'Tudo no navegador — sem envio e sem marca d\'água',
    ],
    faq: [
      {
        q: 'Ele consegue atingir um tamanho exato?',
        a: 'É para isso que serve o modo «caber num tamanho». O peso de um arquivo é o seu bitrate multiplicado pela duração, então, sabendo a duração, o bitrate necessário é aritmética pura. Os codificadores não obedecem a um bitrate com precisão — o controle de taxa varia conforme o material —, de modo que, se a primeira passagem erra por mais do que alguns por cento, o erro é medido e o arquivo é recodificado uma vez com o número corrigido. Na prática, fica a poucos por cento do alvo.',
      },
      {
        q: 'Por que 10 MB, 16 MB, 25 MB?',
        a: 'São os muros em que as pessoas realmente batem: 10 MB é o limite gratuito do Discord, 16 MB o do WhatsApp, 25 MB o do Gmail e da maioria dos servidores de email, e 50 MB o do Discord Nitro Basic. A ferramenta mira logo abaixo do limite, e não exatamente nele, porque um arquivo de 10,0 MB ainda é recusado por um limite de 10 MB.',
      },
      {
        q: 'E se o alvo for impossível?',
        a: 'Ele avisa antes de começar e diz qual é o menor tamanho honesto para aquele vídeo. Espremer uma hora de material em 10 MB exigiria um bitrate que nenhuma resolução sobrevive: uma ferramenta que entregasse um arquivo impossível de assistir e chamasse isso de sucesso seria pior do que uma que recusa.',
      },
      {
        q: 'Quanto o meu arquivo vai diminuir?',
        a: 'A estimativa aparece antes de você clicar em qualquer coisa, a partir das opções e da duração. Material direto do celular ou da câmera costuma ser gravado muito acima do necessário, e reduções de 60–90% são rotina. O que já foi comprimido uma vez tem pouco a dar, e a ferramenta compara o seu arquivo com o que a resolução dele razoavelmente exige e avisa quando recodificar só o deixaria maior.',
      },
      {
        q: 'O que realmente deixa um vídeo menor?',
        a: 'Menos pixels e menos bits por pixel. A resolução é a alavanca bruta e confiável: passar de 4K para 1080p elimina três quartos dos pixels antes mesmo de falar em qualidade. O bitrate decide depois quanto detalhe sobrevive. Remover o áudio ajuda pouco: ele raramente passa de alguns por cento de um arquivo de vídeo.',
      },
      {
        q: 'É enviado para algum lugar?',
        a: 'Não. Tudo roda com WebCodecs no seu navegador, e é isso que torna a coisa prática: enviar um gigabyte para um servidor devolver 200 MB é mais lento do que fazer localmente, e ainda deixa o seu material no disco de outra pessoa. Sem limite de tamanho, sem fila e sem marca d\'água — porque não há servidor para impô-los.',
      },
    ],
  },

  'video-trimmer': {
    searchPhrase: 'Cortar vídeo online',
    title: 'Cortar Vídeo Online Grátis — sem recodificar, sem perder qualidade',
    description:
      'Cortador de vídeo online e gratuito que mantém a qualidade original: a imagem é copiada, não recodificada. Funciona no seu navegador — sem enviar nada, sem marca d\'água e sem cadastro.',
    heading: 'Cortar',
    accent: 'Vídeo',
    lede: 'Arraste as alças até o trecho que você quer e salve — com a imagem copiada intacta, sem perda alguma. Seu arquivo nunca sai da sua máquina.',
    blurb: 'Arraste as alças até o trecho que você quer, veja a prévia e salve. O áudio continua sincronizado.',
    featureList: [
      'Corte sem perdas — copia o vídeo sem recodificar',
      'Recodificação exata no quadro quando o ponto de corte importa',
      'Corte ajustado a um tamanho de arquivo',
      'Prévia ao vivo da seleção',
      'Tudo no navegador — sem envio e sem marca d\'água',
    ],
    faq: [
      {
        q: 'Cortar perde qualidade?',
        a: 'No modo padrão, não. «Mesma qualidade — sem recodificar» deixa a imagem passar intacta, então não há perda de geração e termina várias vezes mais rápido: 0,20 s contra 0,60 s ao recodificar os mesmos três segundos. O preço é o tamanho: o vídeo é comprimido em grupos que começam num quadro-chave, então, se o seu ponto de entrada cai no meio de um grupo, o arquivo carrega os quadros até o anterior. A reprodução ainda começa exatamente onde você marcou, mas o arquivo pode ficar maior do que uma recodificação do mesmo trecho.',
      },
      {
        q: 'Quando vale recodificar?',
        a: 'Quando você quer o menor arquivo possível, ou outro formato. Recodificando, só os quadros selecionados são escritos, então um corte no meio do grupo sai bem mais leve: nos testes, 4,1 MB contra 6,7 MB para os mesmos três segundos. Custa uma geração de compressão, que na qualidade usada aqui não se percebe.',
      },
      {
        q: 'Dá para cortar ajustando a um tamanho?',
        a: 'Sim: escolha «caber num tamanho» e um limite, por exemplo 10 MB para o Discord ou 25 MB para email. O bitrate necessário decorre da duração da sua seleção, então uma seleção mais curta comporta mais qualidade dentro do mesmo limite. Se a primeira passagem errar, há correção e uma repetição.',
      },
      {
        q: 'O áudio é mantido?',
        a: 'Sim, sincronizado e cortado no mesmo trecho. Você pode removê-lo de propósito na caixa «remover áudio» — útil quando o clipe vai para onde o som não é bem-vindo, e ainda deixa o arquivo menor.',
      },
      {
        q: 'Quais arquivos funcionam?',
        a: 'MP4 e MOV com H.264, e WebM — o que o seu navegador conseguir decodificar e codificar. Formatos nativos de câmera como ProRes ou raw normalmente nem abrem num navegador; faça antes um proxy.',
      },
    ],
  },

  'video-to-mp3': {
    searchPhrase: 'Conversor de vídeo para MP3',
    title: 'Vídeo para MP3 — conversor online grátis, sem enviar nada',
    description:
      'Conversor de vídeo para MP3 online e gratuito. Extraia o áudio de MP4, MOV ou WebM como MP3, WAV ou OGG inteiramente no seu navegador: sem envio, sem limite de tamanho, sem marca d\'água e sem cadastro.',
    heading: 'Vídeo para',
    accent: 'MP3',
    lede: 'Tire o som de um vídeo e guarde como MP3, WAV ou OGG. Nada é enviado — a conversão acontece na sua máquina.',
    blurb: 'Extraia o áudio de um vídeo e guarde como MP3, WAV ou OGG.',
    featureList: [
      'Extrai áudio de MP4, MOV e WebM',
      'Saída em MP3, WAV e OGG',
      'Escolha de bitrate e mono',
      'Tudo no navegador — sem envio e sem marca d\'água',
    ],
    faq: [
      {
        q: 'Meu vídeo é enviado?',
        a: 'Não. O navegador decodifica o arquivo e codifica o áudio localmente, então nada sai daqui. Isso importa mais do que em outras conversões: o motivo para extrair o áudio de um vídeo costuma ser que o vídeo é pessoal — uma aula, uma entrevista, uma gravação sua — e ele não tem por que passar pelo servidor de ninguém para responder algo que o seu notebook responde sozinho.',
      },
      {
        q: 'Qual formato escolher?',
        a: 'MP3 se for para qualquer lugar: tudo toca, e a 192 kbps é transparente para voz e quase para música. WAV se o áudio vai para um editor ou para transcrição, porque não é comprimido e não perde nada. OGG (Vorbis) é menor que MP3 na mesma qualidade, mas menos aceito fora de navegadores e Android.',
      },
      {
        q: 'De que bitrate eu preciso?',
        a: 'Para voz, 96–128 kbps sobram e reduzem o arquivo à metade do padrão. Para música, 192 kbps é o ponto habitual e 320 é o máximo do MP3. Pedir mais do que foi gravado não recupera nada: converter um podcast de 128 kbps para 320 kbps gera um arquivo duas vezes e meia maior que soa idêntico.',
      },
      {
        q: 'Por que meu WAV ficou tão grande?',
        a: 'Porque não é comprimido — cerca de 10 MB por minuto em estéreo a 44,1 kHz, seja qual for o conteúdo. É justamente o propósito dele: nada é descartado. Se o tamanho incomoda e o áudio não vai para um editor, o MP3 ocupa um vigésimo e você não vai ouvir diferença.',
      },
      {
        q: 'Posso converter só um trecho?',
        a: 'Nesta página não: ela converte o arquivo inteiro. Corte antes o vídeo com o cortador e converta o resultado, ou converta tudo e corte o áudio na ferramenta para onde você o levar.',
      },
    ],
  },

  'remove-audio-from-video': {
    searchPhrase: 'Remover áudio de vídeo online',
    title: 'Remover o áudio de um vídeo online grátis — sem recodificar',
    description:
      'Tire o som de um vídeo online e grátis: a faixa de áudio é removida e a imagem é copiada sem recodificar, com a mesma qualidade. Tudo no navegador, sem upload nem marca d’água.',
    heading: 'Remover áudio',
    accent: 'do vídeo',
    lede: 'Tire a faixa de som e deixe a imagem intacta. Nada é enviado nem recodificado.',
    blurb: 'Vídeo sem som: a faixa sai e a imagem é copiada sem perder qualidade.',
    featureList: [
      'Remove o áudio de MP4, MOV e WebM',
      'Copia a imagem sem recodificar: mesma qualidade, em segundos',
      'Tudo no navegador: sem upload, sem marca d’água, sem limite de tamanho',
    ],
    faq: [
      {
        q: 'O vídeo perde qualidade?',
        a: 'Não. A imagem vai para o novo arquivo quadro a quadro; só a faixa de som fica de fora. Se o navegador não conseguir copiar esse codec no contêiner, a ferramenta recodifica a imagem e avisa.',
      },
      {
        q: 'Meu vídeo é enviado para algum lugar?',
        a: 'Não. O navegador lê e grava o arquivo com WebCodecs; nada sai do seu aparelho. Por isso não há limite de tamanho além da memória do navegador.',
      },
      {
        q: 'Posso guardar o áudio separado?',
        a: 'Sim, com a ferramenta de vídeo para MP3 deste site: ela faz o contrário, mantém o som e tira a imagem.',
      },
    ],
  },
  'rotate-video': {
    searchPhrase: 'Girar vídeo online',
    title: 'Girar vídeo online grátis — 90° ou espelhar, sem recodificar',
    description:
      'Gire um vídeo 90°, 180° ou 270°, ou espelhe, online e grátis. A rotação é gravada no arquivo sem recodificar, com a mesma qualidade; ou desenhe-a nos quadros para players que ignoram a rotação. No navegador, sem upload.',
    heading: 'Girar',
    accent: 'vídeo',
    lede: 'Endireite um vídeo gravado de lado em segundos. Nada é enviado e, por padrão, nada é recodificado.',
    blurb: 'Gire um vídeo gravado de lado ou espelhe, sem recodificar.',
    featureList: [
      'Gira 90° à direita, 90° à esquerda ou 180°, e espelha na horizontal',
      'Sem perdas por padrão: a rotação fica no arquivo e os quadros são copiados',
      'Opcional: desenhar a rotação nos quadros para players que a ignoram',
    ],
    faq: [
      {
        q: 'Como mudar o ângulo de um vídeo gravado de lado?',
        a: 'Abra o vídeo aqui, escolha 90° à direita ou à esquerda (ou 180° se estiver de cabeça para baixo) e salve. O vídeo fica em pé sem perder qualidade, e nada precisa ser instalado nem enviado.',
      },
      {
        q: 'Girar perde qualidade?',
        a: 'Por padrão, não. O arquivo tem uma marca de rotação que os players leem: a ferramenta define essa marca e copia os quadros como estão. Se marcar «desenhar nos quadros», a imagem é recodificada e perde um pouco de qualidade uma vez.',
      },
      {
        q: 'Por que em algum app continua de lado?',
        a: 'Alguns players e formulários de upload ignoram a marca de rotação. Para eles, gire de novo com «desenhar nos quadros» marcado.',
      },
      {
        q: 'Meu vídeo é enviado?',
        a: 'Não. O navegador lê e grava o arquivo com WebCodecs; nada sai do seu aparelho.',
      },
    ],
  },
  'video-info': {
    searchPhrase: 'Ver bitrate de vídeo online',
    title: 'Ver o bitrate de vídeo e áudio online grátis — codec, FPS, resolução',
    description:
      'Descubra o bitrate, o codec, os quadros por segundo, a resolução, o HDR e a taxa de amostragem de um vídeo ou áudio, online e grátis. Lido no navegador: o arquivo não é enviado.',
    heading: 'Informações',
    accent: 'do vídeo',
    lede: 'Solte um arquivo e veja o que há dentro: bitrate, codec, FPS, resolução, áudio. Nada é enviado.',
    blurb: 'Bitrate, codec, FPS, resolução e dados de áudio de qualquer arquivo.',
    featureList: [
      'Bitrate total, de vídeo e de áudio',
      'Codec, resolução, FPS, rotação e HDR',
      'Canais e taxa de amostragem do áudio',
      'Tudo no navegador: sem upload',
    ],
    faq: [
      {
        q: 'Como o bitrate é medido?',
        a: 'Pelo próprio arquivo: o tamanho dos pacotes de cada faixa dividido pela duração, com até 600 pacotes. O bitrate total é o tamanho do arquivo pela duração e inclui o contêiner.',
      },
      {
        q: 'Meu arquivo é enviado?',
        a: 'Não. O navegador lê só as partes de que precisa; nada sai do seu aparelho.',
      },
    ],
  },
  'crop-video': {
    searchPhrase: 'Recortar vídeo online',
    title: 'Recortar vídeo online grátis — 9:16 para Reels e TikTok, 1:1, 4:5',
    description:
      'Recorte um vídeo para 9:16 para Reels, TikTok e Shorts, ou para 1:1, 4:5 ou 16:9, online e grátis. Deslize o quadro para manter o que importa. No navegador, sem upload nem marca d’água.',
    heading: 'Recortar',
    accent: 'vídeo',
    lede: 'Transforme um vídeo horizontal em vertical ou quadrado e escolha qual parte fica. Nada é enviado.',
    blurb: 'Recorte um vídeo horizontal para 9:16 para Reels, TikTok e Shorts, ou quadrado.',
    featureList: [
      'Formatos 9:16, 1:1, 4:5 e 16:9',
      'Deslize o quadro para manter o assunto em cena',
      'Mantém a resolução original da área recortada',
      'Tudo no navegador: sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'Como deixar um vídeo horizontal na vertical para Reels ou TikTok?',
        a: 'Escolha 9:16, deslize o quadro sobre a parte que quer manter e recorte. Você recebe a maior área 9:16 do vídeo no tamanho dela; o Instagram e o TikTok a ampliam para tela cheia.',
      },
      {
        q: 'Perde qualidade?',
        a: 'Os pixels mantidos não são ampliados, mas recortar sempre recodifica a imagem, o que custa um pouco de qualidade uma vez.',
      },
      {
        q: 'Meu vídeo é enviado?',
        a: 'Não. O navegador decodifica, recorta e codifica o vídeo com WebCodecs; nada sai do seu aparelho.',
      },
    ],
  },
  'video-to-gif': {
    searchPhrase: 'Vídeo para GIF online',
    title: 'Vídeo para GIF online grátis — MP4 para GIF sem upload nem marca d’água',
    description:
      'Converta um vídeo em GIF online e grátis: escolha o início, a duração, os quadros por segundo e a largura. MP4, MOV e WebM. Feito no navegador: nada é enviado e não há marca d’água.',
    heading: 'Vídeo',
    accent: 'para GIF',
    lede: 'Escolha um momento e transforme em GIF. O vídeo fica no seu aparelho.',
    blurb: 'Alguns segundos de vídeo em GIF: início, duração, FPS e largura.',
    featureList: [
      'MP4, MOV e WebM para GIF',
      'Início, até 15 s, 10–20 FPS, 320–640 px de largura',
      'Uma paleta por quadro: as cores se mantêm',
      'Tudo no navegador: sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'Como deixar o GIF menor?',
        a: 'Mais curto, mais estreito e com menos FPS, nessa ordem. Um GIF de 4 s a 480 px e 15 FPS costuma ter 2–6 MB; a 320 px e 10 FPS, um terço disso.',
      },
      {
        q: 'Meu vídeo é enviado?',
        a: 'Não. O navegador lê os quadros e grava o GIF; nada sai do seu aparelho.',
      },
    ],
  },
  'add-music-to-video': {
    searchPhrase: 'Colocar música em vídeo online',
    title: 'Colocar música em vídeo online grátis — sem marca d’água nem upload',
    description:
      'Adicione música a um vídeo online e grátis: escolha um MP3 ou M4A, em que segundo a música começa e um fade no final. A imagem é copiada sem recodificar e a música é cortada no tamanho do vídeo. No navegador.',
    heading: 'Colocar música',
    accent: 'no vídeo',
    lede: 'Coloque sua música sob o vídeo, cortada no tamanho e com fade no final. Nada é enviado.',
    blurb: 'Uma música sob o vídeo, no tamanho certo e com fade, sem recodificar a imagem.',
    featureList: [
      'Música de MP3, M4A, WAV, OGG ou o som de outro vídeo',
      'Escolha onde a música começa; fade de 0–4 s',
      'A imagem é copiada intacta: mesma qualidade, rápido',
      'Tudo no navegador: sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'O som original do vídeo continua?',
        a: 'Não: a música o substitui.',
      },
      {
        q: 'E se a música for mais curta que o vídeo?',
        a: 'A música toca uma vez e o resto fica em silêncio; a ferramenta mostra onde ela acabou.',
      },
      {
        q: 'Dá para editar o vídeo no ritmo da música?',
        a: 'Não nesta página: ela coloca a música sob um clipe como está. Editar vários clipes no ritmo é o que o app Life2Film para iPhone faz.',
      },
    ],
  },
  'merge-videos': {
    searchPhrase: 'Juntar vídeos online',
    title: 'Juntar vídeos online grátis — unir clipes MP4 e MOV sem upload nem marca d’água',
    description:
      'Junte vídeos online e grátis: una dois ou mais clipes MP4, MOV ou WebM num só arquivo, na ordem que escolher. Tamanhos diferentes se encaixam num só quadro. No navegador, sem upload nem marca d’água.',
    heading: 'Juntar',
    accent: 'vídeos',
    lede: 'Coloque os clipes um após o outro e receba um só vídeo. Nada sai do seu aparelho.',
    blurb: 'Una dois ou mais vídeos num arquivo, na ordem que quiser.',
    featureList: [
      'Junta qualquer número de clipes MP4, MOV e WebM',
      'Mude a ordem antes de juntar',
      'Clipes de outro formato entram com faixas pretas',
      'Clipes sem som entram com silêncio: imagem e som não se desencontram',
      'Tudo no navegador: sem upload nem marca d’água',
    ],
    faq: [
      {
        q: 'Posso juntar vídeos de tamanhos ou celulares diferentes?',
        a: 'Sim. Cada quadro é encaixado no quadro do primeiro clipe (com faixas pretas se o formato muda) e o filme é codificado uma vez.',
      },
      {
        q: 'Dá para escolher as melhores partes e editar com música?',
        a: 'Não nesta página: ela junta clipes inteiros. Escolher os melhores momentos e editar com uma música é o que o app Life2Film para iPhone faz.',
      },
    ],
  },
  'video-converter': {
    searchPhrase: 'Conversor de vídeo online',
    title: 'Conversor de Vídeo Online Grátis — MP4, WebM, MOV sem enviar nada',
    description:
      'Conversor de vídeo online e gratuito para MP4, WebM e MOV, ou extraia o áudio como WAV. Converte no seu navegador com WebCodecs: sem envio, sem limite de tamanho, sem marca d\'água e sem cadastro.',
    heading: 'Converter',
    accent: 'Vídeo',
    lede: 'Mude de formato sem entregar o arquivo a ninguém. MP4, WebM, MOV — ou tire só o áudio.',
    blurb: 'MP4, WebM e MOV em qualquer direção — ou extraia o áudio como WAV.',
    featureList: [
      'Conversão entre MP4, WebM e MOV',
      'Extrai o áudio como WAV',
      'Redimensionamento opcional ao converter',
      'Tudo no navegador — sem envio e sem marca d\'água',
    ],
    faq: [
      {
        q: 'Quais conversões são possíveis?',
        a: 'Entre MP4, WebM e MOV, e de qualquer um deles para áudio WAV. O que realmente funciona depende do seu navegador, porque é ele quem codifica: Chrome e Edge cobrem mais, o Safari lida bem com MP4 e MOV. A ferramenta verifica antes de começar e avisa quando uma combinação não está disponível, em vez de falhar no meio do caminho.',
      },
      {
        q: 'Por que meu navegador não abre um MOV da câmera?',
        a: 'Um .mov é um contêiner, e o que importa é o codec lá dentro. Navegadores lidam com H.264 e, cada vez mais, HEVC — mas não com ProRes, DNxHD ou formatos raw de câmera, que é o que câmeras profissionais costumam gravar num .mov. Esses precisam de uma transcodificação de verdade num programa de desktop.',
      },
      {
        q: 'Converter perde qualidade?',
        a: 'Trocar o contêiner entre MP4 e MOV muitas vezes é feito sem tocar no vídeo. Trocar o codec — para WebM, por exemplo — obriga a recodificar, e recodificar sempre custa alguma coisa. Costuma ser invisível numa geração, e acumula se você converter o mesmo arquivo várias vezes.',
      },
      {
        q: 'Alguma coisa é enviada?',
        a: 'Não. A conversão usa WebCodecs no seu navegador. É esse o ponto: converter um arquivo grande enviando, esperando fila e baixando de volta é mais lento do que fazer localmente, e no caminho ele acaba no disco de um desconhecido.',
      },
    ],
  },

  'video-splitter': {
    searchPhrase: 'Dividir vídeo online',
    title: 'Dividir Vídeo em Partes Online Grátis — partes iguais ou nas cenas',
    description:
      'Divisor de vídeo online e gratuito que corta um vídeo longo em partes nas mudanças de plano, em vez de a cada 30 segundos, ordenadas por qualidade de imagem. Corte 9:16 opcional para Reels, Shorts e TikTok. Nada é enviado.',
    heading: 'Dividir',
    accent: 'Vídeo',
    lede: 'Corte um vídeo longo em clipes que começam onde o vídeo muda — e não a cada trinta segundos. Tudo acontece na sua máquina.',
    blurb: 'Corte um vídeo longo em Reels ou Shorts que começam numa mudança de plano, ordenados por qualidade de imagem.',
    featureList: [
      'Corta nas mudanças de plano, não num intervalo fixo',
      'Clipes ordenados por qualidade de imagem',
      'Corte 9:16 opcional para Reels, Shorts e TikTok',
      'Tudo no navegador — sem envio e sem marca d\'água',
    ],
    faq: [
      {
        q: 'Qual a diferença para outros divisores de vídeo?',
        a: 'A maioria corta a cada N segundos, então um clipe pode começar no meio de uma frase e terminar no meio de um gesto. Este acha os cortes que o vídeo já tem — as mudanças de plano — e monta os clipes com planos inteiros. Você continua escolhendo a duração aproximada; os limites é que caem na mudança real mais próxima, em vez de num cronômetro.',
      },
      {
        q: 'O que são as estrelas de cada clipe?',
        a: 'O motor pontua cada quadro amostrado por nitidez, exposição, contraste, cor e detalhe, e cada clipe recebe a média ponderada pela duração dos planos que contém. As estrelas são relativas ao melhor clipe daquele vídeo, não uma escala absoluta: sugerem por onde olhar primeiro, não decretam o que é interessante.',
      },
      {
        q: 'O corte vertical vai cortar pessoas fora?',
        a: 'Ele pega o centro do quadro, o que acerta na maioria das vezes e erra quando o assunto está de lado. Ainda não há rastreamento de rostos aqui, então confira as prévias antes de publicar. Se o plano for muito aberto, geralmente sai melhor cortar à mão.',
      },
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador decodifica, o WebAssembly analisa os quadros e os clipes são recodificados localmente com WebCodecs — o mesmo caminho de hardware que o navegador usa para reproduzir vídeo. Nada é enviado a lugar nenhum, e é por isso que também não há limites de plano, filas ou marca d\'água.',
      },
    ],
  },

  'bpm-detector': {
    searchPhrase: 'Detector de BPM online',
    title: 'Detector de BPM Online Grátis — o andamento e cada tempo de uma música',
    description:
      'Detector de BPM online e gratuito: descubra o andamento de uma faixa e o momento exato de cada tempo, no seu navegador. Exporte a grade para DaVinci Resolve, Premiere, Final Cut ou Audacity. Nada é enviado.',
    heading: 'Detector de',
    accent: 'BPM',
    lede: 'Solte uma faixa. Receba o andamento e o momento exato de cada tempo — calculado na sua própria máquina, sem enviar nada.',
    blurb: 'Descubra o andamento de uma faixa e o momento de cada tempo, e mande a grade como marcadores para Resolve, Premiere, Final Cut ou Audacity.',
    featureList: [
      'Detecção de andamento (BPM)',
      'Marca de tempo de cada batida',
      'Tudo no navegador — sem envio',
      'Exporta para EDL, OTIO, FCPXML, rótulos do Audacity, CSV e JSON',
      'Timecode conforme os quadros por segundo do projeto',
    ],
    faq: [
      {
        q: 'Meu áudio é enviado para algum lugar?',
        a: 'Não. A análise roda dentro do seu navegador como WebAssembly. O arquivo é lido do disco para a memória e nunca sai pela rede: dá para conferir abrindo a aba de rede, ou desconectando depois que a página carregou.',
      },
      {
        q: 'Qual a precisão?',
        a: 'Usa análise de força de ataques com rastreamento de batidas por programação dinâmica — a mesma abordagem das ferramentas consagradas de recuperação de informação musical e o mesmo código que move o motor de montagem do Life2Film. Em música de pulso estável, acerta dentro de uma batida. Em rubato, gravações ao vivo sem clique ou material muito sincopado, trate o número como ponto de partida.',
      },
      {
        q: 'O que significa «metade ou dobro do andamento»?',
        a: 'O andamento é ambíguo por natureza: uma faixa a 140 BPM também é, corretamente, 70 BPM contada em tempo pela metade. Os detectores escolhem o que for mais forte no sinal. Se o número parecer exatamente o dobro ou a metade, foi isso que aconteceu — e as duas leituras aparecem para você pegar a que precisa.',
      },
      {
        q: 'Posso usar os tempos no meu editor?',
        a: 'É para isso que serve a exportação. EDL é a escolha para DaVinci Resolve ou Premiere: cada tempo chega como um marcador nomeado na linha do tempo. O Final Cut aceita o FCPXML. OTIO funciona em Resolve, Avid e Premiere, e é o certo quando os tempos vão para um pipeline em vez de direto para a linha do tempo. O Audacity lê a exportação de rótulos, e CSV ou JSON cobrem planilhas e scripts.',
      },
      {
        q: 'Por que os quadros por segundo importam?',
        a: 'Os tempos caem em frações de segundo; linhas do tempo contam quadros inteiros. Cada marcador é arredondado para o quadro mais próximo do projeto de destino, então uma grade exportada a 25 fps fica até 20 ms deslocada numa sequência a 30 fps. Ajuste a taxa à do seu projeto e os marcadores caem exatamente onde está a batida. Não afeta CSV nem JSON, que trazem também os segundos brutos.',
      },
    ],
  },

  'scene-detector': {
    searchPhrase: 'Detecção de cenas online',
    title: 'Detector de Cenas Online Grátis — ache cada corte de um vídeo',
    description:
      'Detecção de cenas online e gratuita: encontre cada mudança de plano de um vídeo com miniaturas e timecodes, e exporte como EDL, OTIO, FCPXML ou CSV. Funciona no seu navegador — nada é enviado.',
    heading: 'Detector de',
    accent: 'Cenas',
    lede: 'Solte um vídeo. Receba cada corte, com uma miniatura e um timecode por plano — encontrado na sua própria máquina, sem enviar nada.',
    blurb: 'Encontre cada corte de um vídeo e receba a lista de planos com miniaturas, timecodes e nota de qualidade.',
    featureList: [
      'Detecção de mudanças de plano',
      'Nota de qualidade por plano',
      'Miniaturas de cada plano',
      'Tudo no navegador — sem envio',
      'Exporta para EDL, OTIO, FCPXML, rótulos do Audacity, CSV e JSON',
    ],
    faq: [
      {
        q: 'O vídeo é enviado?',
        a: 'Não. O navegador decodifica localmente, um canvas lê os pixels e o WebAssembly os compara. Nada é enviado a lugar nenhum: esta página não tem servidor para onde enviar. É também por isso que não há limite de tamanho nem fila.',
      },
      {
        q: 'Como ele acha os cortes?',
        a: 'Ele amostra quadros ao longo do vídeo e observa o quanto a imagem muda de uma amostra para a seguinte. Um corte é uma descontinuidade: cor e luminância saltam de uma vez, em vez de derivar como num movimento de câmera ou numa transição. O detector procura esses saltos e devolve as fronteiras entre eles.',
      },
      {
        q: 'Ele pega fusões e fades?',
        a: 'Em parte. Um corte seco é inequívoco e é achado com confiança. Uma fusão lenta é, por construção, uma mudança gradual — a mesma forma de um movimento de câmera —, então pode aparecer um pouco antes, um pouco depois ou fundida com a vizinha. Panorâmicas rápidas também podem ser lidas como cortes. Trate o resultado como uma lista de planos para conferir, não como um veredito.',
      },
      {
        q: 'O que é a nota de qualidade de cada plano?',
        a: 'A mesma pontuação por quadro que o app do Life2Film usa para decidir o que manter: nitidez, exposição, contraste, cor e entropia combinados num número. É uma ordenação aproximada de quais planos merecem um segundo olhar, não um julgamento sobre o que é interessante.',
      },
      {
        q: 'Quanto tempo demora?',
        a: 'Ele percorre o vídeo saltando para cada ponto de amostragem, e cada salto custa dezenas de milissegundos. Um clipe de um minuto leva alguns segundos. Vídeos longos são amostrados de forma mais grossa para a espera continuar razoável: a lista de planos mantém precisão de cerca de meio segundo.',
      },
    ],
  },
};
