---
title: "Dá para editar vídeo com o ChatGPT? Sim, com o Codex no seu computador"
description: "O ChatGPT no navegador não corta seus clipes. O app do ChatGPT para desktop em modo Codex corta. Veja como configurar e o que dizer, passo a passo."
date: 2026-11-05
---

A resposta honesta tem duas partes. O ChatGPT no navegador ou no celular não consegue editar arquivos de vídeo que estão no seu computador. Ele escreve roteiro, legendas e lista de planos. O app do ChatGPT para desktop em modo Codex e a ferramenta de linha de comando Codex conseguem: eles trabalham dentro de uma pasta que você escolhe e executam programas como o ffmpeg. Esta página é a parte do ChatGPT do [guia completo](/pt/guides/edit-video-with-ai-agents/).

Você precisa de um plano do ChatGPT que inclua o Codex.

## O que cada opção faz

| Opção | Corta seus clipes locais? |
|---|---|
| ChatGPT no navegador ou no app do celular | Não. Só planejar e escrever |
| App do ChatGPT para desktop, modo Chat ou Work | Só se você ativar o trabalho local para a pasta. O Work no navegador roda em um ambiente na nuvem |
| App do ChatGPT para desktop, modo Codex | Sim. Abre uma pasta e executa comandos |
| Codex CLI em um terminal | Sim |

"Trabalhar localmente" depende da sua conta e das configurações do espaço de trabalho, então você pode não ver essa opção. O modo Codex é o caminho certo.

## 1. Instale o app para desktop

Baixe o ChatGPT para macOS, Windows ou Linux no site da OpenAI, abra e faça login. No seletor de produto escolha **Codex**. Depois abra a pasta dos seus clipes como projeto.

Se você gosta do terminal, a versão de linha de comando se instala com uma linha:

```bash
npm install -g @openai/codex
```

ou `brew install --cask codex` no Mac. Rode `codex` e escolha **Sign in with ChatGPT**.

## 2. Instale o ffmpeg

```bash
brew install ffmpeg
```

No Windows: `winget install Gyan.FFmpeg`. Ou peça ao Codex: "instale o ffmpeg para mim". Ele pede aprovação antes de executar.

## 3. Adicione as skills

O Codex lê skills de `.agents/skills` na sua pasta ou de `~/.agents/skills` na sua pasta pessoal. Instale as duas skills de vídeo do [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Isso precisa do [Node.js](https://nodejs.org). Escolha o Codex quando ele perguntar. Outro jeito: no Codex digite `$skill-installer` e peça para instalar essas duas skills desse repositório do GitHub. Reinicie o Codex se elas não aparecerem. Em uma mensagem, chame uma skill digitando `$` e o nome dela. Não copie arquivos de skill à mão.

## 4. Peça o filme

> A pasta tem 40 clipes de um dia. Use $solo-transcribe em todos, leia a transcrição e proponha uma história em cinco linhas. Espere a minha resposta antes de cortar.

Depois:

> Corte um trailer de 3 minutos nessa história, com music.mp3 por baixo, cortes no ritmo. Mostre o roteiro e uma folha de contato antes de renderizar.

O Codex transcreve, acha o ritmo, escreve o corte como um roteiro, renderiza com o ffmpeg e confere o resultado. Espere três rodadas. O primeiro corte raramente é o que você mantém.

## Onde o ChatGPT é mais fraco

- Sem o app para desktop ou o Codex, ele não tem acesso aos seus clipes. Não cole um vídeo de 2 GB em um chat esperando um corte.
- A transcrição no Windows e no Linux roda na CPU e é mais lenta que em um Mac com Apple Silicon.
- Confira o que o Codex quer executar antes de aprovar. Essa é a sua rede de segurança.

Se você já paga pelo Claude, o [Claude Code](/pt/guides/edit-video-with-claude-code/) faz o mesmo trabalho. Os dois leem as mesmas skills.

## Próximos passos

- O fluxo geral e as regras que evitam cortes ruins: [Edição de vídeo com IA](/pt/guides/edit-video-with-ai-agents/).
- Como os filmes reais foram cortados: [texto no rustman.org](https://rustman.org/wiki/creative-video-agent-cut/).
- Quer um app pronto, com janela: [Life2Film Studio](/studio/) em um Mac.
