import type { Lang } from './i18n';

/** Copy for /studio, kept apart from the main bundle — it is long and page-specific. */
export const studio: Record<string, Record<string, string>> = {
  en: {
    metaTitle: 'Life2Film Studio — the agent-first video editor for Mac (beta)',
    metaDesc:
      'A native Mac video editor that is a companion to Claude and other AI agents: the agent reads the film, looks at frames and proposes cuts you accept. Plays from the original files, mixes through live CLAP plugins, exports for YouTube and Reels.',
    badge: 'Public beta · 0.4',
    title: 'The agent-first video editor',
    kicker: 'Life2Film Studio',
    lede:
      'A native Mac editor that is a companion to Claude and other AI agents. Your agent reads the film, looks at frames, measures the sound and proposes cuts. Every proposal is drawn on the timeline and you play it before you accept it. The film plays from your original footage: no proxies, no import, no upload.',
    ctaDownload: 'Download for Mac',
    ctaAgent: 'Add to your agent',
    ctaReleases: 'All releases',
    ctaNote: 'Apple Silicon · macOS 15 or later · free while in beta',
    shotCaption: 'A 51-minute travel film, 1164 pieces over the original files, opened in 0.34 s.',
    shotSound: 'The Sound workspace: a strip per lane and one for the selected piece, each with its own chain of plugins, and the master.',
    shotWords: 'Every subtitle line in film order. Edit a line where it stands, or click it to go to its moment.',

    installTitle: 'Install',
    installBrew: 'With Homebrew:',
    installDmg:
      'Or download the DMG and drag the app into Applications. It is signed with a Developer ID and notarised by Apple, so it opens without Gatekeeper warnings. There is nothing to install first.',

    doesTitle: 'What it does',
    d1t: 'Plays the originals',
    d1d: 'A film is a small .otio file that points at your footage. Studio plays it as it is, MKV included, so an hour-long cut opens in under a second and nothing is copied or transcoded on a full disk.',
    d2t: 'Edits the file, not a project',
    d2d: 'Blade, ripple, slip, speed, dissolves, B-roll, voice-over, chapters and scenes. Every edit is written to the .otio at once and can be undone. The same file opens in other editors through an interchange copy.',
    d3t: 'Lets an agent in',
    d3d: 'An MCP door with twelve tools: read the film, look at frames, read loudness, propose edits. A proposal is drawn on the timeline and can be played before you accept it. The agent never writes the film itself.',

    featTitle: 'In the window',
    f1t: 'Sound like a DAW',
    f1d: 'CLAP plugins run in the playback path, on a lane, on the master or on one piece of sound. What you hear is what the export renders, and one click brings the mix to -16 LUFS by measurement.',
    pluginsNote: 'The effects are SuperDuper DSP: 36 free, open-source audio plugins in Rust (CLAP, VST3, AU) that also work in any DAW.',
    pluginsLink: 'Get the plugins',
    f2t: 'Words and subtitles',
    f2d: 'Subtitle, caption and title lanes follow the picture through every edit. Lines are edited in place, burned into the picture or written as .srt, per lane.',
    f3t: 'Inside a source',
    f3d: 'Open any shot to see its whole file, which stretches the film already uses and which are left, then insert a stretch or lay it over as B-roll.',
    f4t: 'Export places',
    f4d: 'YouTube, vertical, a small copy for a messenger, a master, a review copy with the clock burned in. Tick several and they are written one after another, with subtitles, chapters and a map of the film beside them.',
    f5t: 'Notes that stay put',
    f5d: 'Pin a note to a moment or paste a list of timecodes from a viewing. Each note stays on its frame through edits, and the agent reads them as its brief.',
    f6t: 'The iPhone app, soon',
    f6d: 'A private link to Life2Film on your iPhone is next: take a day of clips straight from the phone over your own network, with the analysis the phone already made, and no cloud in between.',

    agentTitle: 'Bring your own agent',
    agentBody:
      'Studio holds no model and no key. The door is a command-line program inside the app that speaks MCP over stdio, so there is no port and nothing listening. Register it with the agent you already use:',
    agentAfter:
      'Then ask it to review a cut or direct a film. It reads the timeline, looks at frames and proposes; only you accept. The Notes panel can also call the agent installed on your Mac with one click.',
    agentLink: 'The agent guide: tools, the skill, the working loop',

    betaTitle: 'Still a beta',
    betaBody:
      'This is version 0.4, a new native app that replaces the earlier Studio. It edits the .otio file and never your footage: originals are only read. Expect rough edges. The earlier app, which scored frames and assembled a montage from a folder, stays in the release list as 0.3; that analysis now lives in the Life2Film iPhone app and the command line.',
    betaContact: 'Found something broken?',
  },
  ru: {},
  tr: {},
};

export function useStudio(lang: Lang) {
  return function s(key: string): string {
    return studio[lang]?.[key] ?? studio.en[key] ?? key;
  };
}
