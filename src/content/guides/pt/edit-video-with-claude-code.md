---
title: "Como editar vídeo com o Claude Code, passo a passo"
description: "Instale o Claude Code, adicione as skills de edição de vídeo e monte um filme a partir de uma pasta de clipes conversando. Para quem nunca usou o terminal."
date: 2026-11-05
---

O Claude Code é um assistente da Anthropic que trabalha dentro de uma pasta do seu computador. Ele lê arquivos, executa programas como o ffmpeg e escreve scripts. É disso que a edição de vídeo com IA precisa. Esta página é a parte do Claude Code do [guia completo](/pt/guides/edit-video-with-ai-agents/).

Você precisa de um plano pago do Claude ou de uma conta de API da Anthropic. O Claude Code roda no macOS 13 ou mais novo, no Windows 10 ou mais novo e no Linux, com 4 GB de RAM ou mais.

## 1. Abra um terminal

- **Mac:** aperte Cmd+Espaço, digite "Terminal" e aperte Enter.
- **Windows:** aperte a tecla Windows, digite "PowerShell" e aperte Enter.

A Anthropic também mantém um [guia do terminal](https://code.claude.com/docs/en/terminal-guide) para quem está começando. Prefere não usar o terminal? Existe um [app Claude para desktop](https://code.claude.com/docs/en/desktop-quickstart.md) com o Claude Code dentro. Os passos abaixo continuam valendo para as skills.

## 2. Instale o Claude Code

Mac, Linux ou WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Ou com um gerenciador de pacotes: `brew install --cask claude-code` no Mac, `winget install Anthropic.ClaudeCode` no Windows.

O instalador não mostra nada enquanto baixa. Quando ele parar, abra uma janela nova do terminal e rode:

```bash
claude --version
```

Se aparecer um número de versão, deu certo.

## 3. Instale o ffmpeg e as duas skills

```bash
brew install ffmpeg
```

No Windows use `winget install Gyan.FFmpeg`. Depois as skills, do [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Isso precisa do [Node.js](https://nodejs.org). Escolha o Claude Code quando ele perguntar onde instalar. Se preferir não usar o Node, abra o `claude` e diga: "Instale as skills solo-transcribe e solo-video-edit de github.com/fortunto2/solo-factory". Não copie arquivos de skill à mão. Uma cópia deixa de receber correções.

## 4. Comece na pasta dos seus clipes

```bash
cd ~/Movies/lisbon-day1
claude
```

Na primeira vez, ele pede login. Depois, pergunta antes de executar qualquer coisa. Leia o que ele quer executar. Aprove o que parecer certo.

## 5. Peça o filme

> A pasta tem 40 clipes de um dia. Transcreva todos com a skill de transcrição, depois leia a transcrição e proponha uma história em cinco linhas. Espere a minha resposta antes de cortar.

Responda com a sua escolha e depois:

> Corte um trailer de 3 minutos nessa história. Use ~/Music/score.mp3 e corte no ritmo. Antes de renderizar, mostre o roteiro e uma folha de contato dos planos.

O Claude Code vai:

1. rodar a transcrição, com um arquivo de texto para o dia inteiro;
2. detectar o ritmo da sua faixa;
3. escrever o corte como um pequeno arquivo de roteiro;
4. renderizar um mp4 com o ffmpeg e conferir se duração e som batem.

O Claude Code também pode trabalhar dentro do app Life2Film Studio em um Mac: ele lê a linha do tempo, olha os quadros e propõe mudanças que você aceita na janela. A conexão é um comando, veja [Connect an agent](/studio/agent/).

## Quando algo dá errado

- **`claude: command not found`.** Feche o terminal e abra um novo. Se ainda falhar, rode `claude doctor` ou veja a [solução de problemas de instalação](https://code.claude.com/docs/en/troubleshoot-install.md) da Anthropic.
- **A transcrição tem nomes estranhos.** Dê uma lista de palavras: "Anna é minha irmã, o café se chama Oficina". Ele corrige o texto uma vez, antes de as legendas o usarem.
- **Um clipe não tem fala.** Multidões e música podem gerar frases inventadas. Diga "trate o clipe 17 como sem fala".
- **O corte está sem graça.** Diga o que está errado em palavras simples. "Planos abertos demais em sequência." "Abra no melhor momento."

## Próximos passos

- O fluxo geral e as regras: [Edição de vídeo com IA](/pt/guides/edit-video-with-ai-agents/).
- Quer usar o ChatGPT: [ChatGPT e Codex](/pt/guides/edit-video-with-chatgpt-codex/).
