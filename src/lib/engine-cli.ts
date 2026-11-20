/**
 * Tools whose job the life2film-engine CLI does on an agent's own machine (0.3.0+). Only 1:1
 * mappings: the command must do what the page does. Goes into the registry row (`cli`) and the
 * tool's SKILL.md as step 1.
 */
export const ENGINE_CLI: Record<string, string> = {
  'auto-montage': 'npx life2film-engine montage ./clips --music song.mp3 --length 30 --out film.mp4',
  'bpm-detector': 'npx life2film-engine beats song.mp3',
  'scene-detector': 'npx life2film-engine scenes video.mp4',
  'video-splitter': 'npx life2film-engine split video.mp4 --out-dir shots/',
  // The editor is a timeline by hand; the CLI's honest part is a plan of shots (file, trim in/out) to edit and cut.
  'video-editor': 'npx life2film-engine montage ./clips --music song.mp3 --plan-only --plan plan.json',
};
