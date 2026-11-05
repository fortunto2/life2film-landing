---
title: "Edição de vídeo com IA: Claude Code, ChatGPT e Codex, passo a passo"
description: "Passo a passo para quem não programa: instale um assistente de IA, adicione duas skills grátis e peça em palavras simples a montagem no ritmo da música."
date: 2026-11-05
---

Você pode fazer edição de vídeo com IA conversando com um assistente. Você coloca seus clipes em uma pasta e diz que filme quer. O assistente lê o que as pessoas falam nos clipes, escolhe os planos, corta no ritmo da música e gera um mp4. Você assiste, diz o que está errado, e ele corrige.

Este guia é para quem nunca abriu um terminal. Reserve 30 minutos para a configuração na primeira vez. Depois disso, um filme novo começa com uma mensagem.

## Resumo rápido

1. Instale o **ffmpeg**, a ferramenta grátis que faz o corte de verdade.
2. Instale um assistente que consiga trabalhar em uma pasta do seu computador: o [Claude Code](/pt/guides/edit-video-with-claude-code/) ou o [app do ChatGPT para desktop com Codex](/pt/guides/edit-video-with-chatgpt-codex/).
3. Instale duas skills grátis: `solo-transcribe` e `solo-video-edit`.
4. Coloque seus clipes em uma pasta e peça um filme.

## Qual assistente consegue editar vídeo

O assistente precisa executar programas no seu computador e ler seus arquivos. Nem todo chat faz isso.

| Ferramenta | Edita seus clipes locais | Observações |
|---|---|---|
| Claude Code (terminal ou app Claude para desktop) | Sim | Exige um plano pago do Claude ou uma conta de API |
| App do ChatGPT para desktop, modo Codex | Sim | Exige um plano do ChatGPT. Você escolhe uma pasta e ele trabalha dentro dela |
| Codex CLI | Sim | Igual ao anterior, no terminal |
| ChatGPT no navegador ou no celular | Não | Ele escreve roteiro, legendas e lista de planos. Não consegue rodar o ffmpeg em 40 clipes que estão no seu disco |

Se você só tem o chat no navegador, use-o para planejar o filme e escrever os textos. Depois faça o corte em uma das ferramentas acima.

## Passo 1. Instale o ffmpeg

No Mac, com o [Homebrew](https://brew.sh):

```bash
brew install ffmpeg
```

No Windows:

```powershell
winget install Gyan.FFmpeg
```

Confira se funcionou: digite `ffmpeg -version` e você deve ver um número de versão. Se não quiser digitar comandos, instale o assistente primeiro e diga "instale o ffmpeg para mim". Ele roda o comando e pede a sua permissão.

## Passo 2. Instale o assistente

Escolha um. Os dois têm passo a passo nas próprias páginas:

- [Claude Code](/pt/guides/edit-video-with-claude-code/): um comando, depois `claude` na pasta dos seus clipes.
- [App do ChatGPT para desktop e Codex](/pt/guides/edit-video-with-chatgpt-codex/): baixe o app, escolha o Codex, abra a pasta dos seus clipes.

## Passo 3. Adicione as duas skills

Uma skill é um arquivo de texto com instruções que o assistente carrega quando precisa. Estas duas guardam as regras de edição, escritas a partir de trabalho real: nove dias em Chicago, de 40 a 70 clipes por dia, transformados em trailers e em um filme de 55 minutos.

- `solo-transcribe` transforma a fala dos seus clipes em texto com marcação de tempo. Roda na sua máquina, nada é enviado.
- `solo-video-edit` guarda as regras de edição e as receitas de ffmpeg.

Elas são públicas no [solo-factory no GitHub](https://github.com/fortunto2/solo-factory). Não copie à mão. Instale com a ferramenta de skills, que precisa do [Node.js](https://nodejs.org):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Ela pergunta para quais assistentes instalar. Escolha o seu. Depois reinicie o assistente para ele enxergar as skills novas.

## Passo 4. Diga o que você quer

Coloque todos os clipes de um dia em uma pasta e abra o assistente nela. Depois escreva como se falasse com um editor de verdade:

> Dia novo: a pasta tem 40 clipes da minha viagem a Lisboa. Transcreva tudo, leia e proponha uma história. Depois corte um trailer de 3 minutos. Coloque a minha faixa music.mp3 por baixo e corte no ritmo.

O que acontece em seguida:

1. **Transcrição.** O assistente roda o `solo-transcribe` em cada clipe. Em um Mac com Apple Silicon isso é cerca de quatro vezes mais rápido que o tempo real. No Windows ou no Linux roda na CPU e demora mais.
2. **Ler o dia como texto.** Toda a fala vai para um arquivo, na ordem da filmagem. O assistente lê como um roteirista e propõe a história. Você pode dizer "não, faça sobre a comida".
3. **Achar o ritmo.** Ele detecta o andamento e os tempos fortes da sua faixa, para os cortes caírem na música. Você pode testar só essa parte com o [detector de BPM](/pt/tools/bpm-detector/) grátis.
4. **Escrever o corte como um roteiro.** Não é uma linha do tempo. É um arquivo curto que diz qual frase de qual clipe entra e qual plano a cobre. Uma reclamação como "você fala da Bean mas nunca mostra" vira um ajuste de uma linha.
5. **Renderizar.** O ffmpeg gera o mp4. O assistente confere se duração, codec e som batem com o plano.

## Espere três tentativas

O primeiro corte costuma ser chato ou um pouco fora de sincronia. O terceiro fica bom. Mesmo assim é mais rápido que editar à mão, porque as partes lentas somem: assistir a cada clipe, achar o ritmo, sincronizar legendas.

Coisas úteis para dizer depois do primeiro corte:

- "Mostre uma folha de contato do filme inteiro."
- "O plano de cobertura em 1:20 não combina com o que eu digo. Troque."
- "Abra com 8 segundos dos melhores planos, depois o gancho."
- "Adicione legendas em inglês e em espanhol."
- "Faça uma versão vertical 9:16 para Reels."

## Regras que evitam um corte ruim

- Um plano de cobertura mostra o que está sendo falado. Se você cita a ponte, a ponte aparece na tela.
- Nunca cubra um plano em que os lábios estão se mexendo. Quem assiste lê isso como falha de sincronia.
- Escolha você mesmo os primeiros 8 a 10 segundos. A máquina escolhe o que é nítido e colorido, não o que é interessante.
- Música tocando ao fundo de um clipe pode gerar reivindicação de direitos autorais. Um dia de material recebeu 10. Coloque a sua própria faixa por baixo.
- Diga ao assistente os nomes de pessoas e lugares. O reconhecimento de fala transforma nomes desconhecidos em celebridades.

## O que ele não faz

- Não cria imagens. Ele corta o que você filmou.
- Não escolhe a história por você. Ele propõe, você decide.
- Arquivos grandes levam tempo. 66 clipes levaram cerca de 20 minutos para analisar na primeira vez.
- As skills foram escritas para quem aceita algumas tentativas. Se você quer um botão só, use um editor com linha do tempo.

## Prefere uma janela a um chat?

O [Life2Film Studio](/studio/) é um app grátis para Mac (beta) que faz a análise e a montagem de vídeo em uma janela, e também pode ser controlado pelo Claude Code. Para ferramentas no navegador, veja as [ferramentas grátis](/pt/tools/): detector de batida, detector de cenas, cortador e mais, tudo rodando no seu navegador sem envio de arquivos. Para desenvolvedores, o motor de análise está na [página Engine](/engine/).

## Os detalhes técnicos

Como os filmes de Chicago foram cortados, as regras exatas e os números por trás delas estão no rustman.org: [Edit video with an AI assistant: a day of footage to a film](https://rustman.org/wiki/creative-video-with-claude/) e how the cut is written as a script.

## Perguntas

**O ChatGPT consegue editar vídeo?** O chat no navegador não edita arquivos do seu computador. O app do ChatGPT para desktop em modo Codex edita, porque trabalha em uma pasta e executa comandos. Veja a [página do ChatGPT e Codex](/pt/guides/edit-video-with-chatgpt-codex/).

**Meu material é enviado para a internet?** As skills rodam no seu computador. O assistente em si vê o texto da transcrição e os comandos que executa. Ele não precisa que os arquivos de vídeo sejam enviados para responder.

**Funciona no Windows?** Sim. Instale o ffmpeg com o winget. A transcrição roda na CPU.

**Preciso saber programar?** Não. Você digita frases. Você aprova os comandos que ele quer executar.
