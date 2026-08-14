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
    title: 'Dividir Vídeo Online Grátis — em Reels e Shorts, cortando nas cenas',
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
