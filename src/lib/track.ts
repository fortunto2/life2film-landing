/**
 * Goals on the tools, sent from the code rather than from markup.
 *
 * Markup (`data-sda-event`) reports a CLICK, and on these pages the click is not the goal:
 *  - The dropzone is a <label> around a hidden <input>. One click on it is two click events (the
 *    label's, then the synthetic one on the input bubbling back through the label), so markup
 *    counted every pick twice. It also counted a cancelled file dialog, and missed drag-and-drop.
 *  - The converter and video-to-mp3 save automatically after encoding; there is no button to
 *    click, so `result_saved` could not exist there at all.
 *  - A click on "Save" is not a saved file when encoding can still fail after it.
 *
 * So the tools call `track` at the moment the thing actually happened. The snippet stays the
 * only transport; this is a typed doorway to `window.sda`.
 *
 * Events, the same names on every tool so the tools can be compared:
 *   file_chosen    a file actually reached the tool (picker or drop), with its kind and size
 *   result_shown   analysis finished and the result is on screen (splitter, bpm, scenes)
 *   result_saved   a file was handed to the user
 *   tool_failed    with `stage` and `reason` — silence after a step looks the same for someone
 *                  who changed their mind, someone whose browser failed, and a lost event
 */

type Props = Record<string, string>;
type Metrics = Record<string, number>;
type Sda = ((name: string, props?: Props, metrics?: Metrics) => void) & { q?: unknown[] };

/** The ingest caps a prop value at 200 characters. */
const MAX_REASON = 160;

export function track(name: string, props?: Props, metrics?: Metrics): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { sda?: Sda };
  try {
    if (!w.sda) {
      // The snippet is `defer`red and drains `sda.q` when it starts.
      const stub = function (...args: unknown[]) { (stub.q ??= []).push(args); } as Sda;
      w.sda = stub;
    }
    w.sda(name, props, metrics);
    // The page reacts to a finished result (ToolPage shows the app offer then), without every tool
    // having to know about it.
    if (name === 'result_saved') window.dispatchEvent(new CustomEvent('tool:saved'));
  } catch {
    // Analytics never breaks a tool.
  }
}

/** What is worth knowing about a file without knowing anything about the person: kind and size. */
export function fileFacts(file: File, via: 'picker' | 'drop'): { props: Props; metrics: Metrics } {
  const dot = file.name.lastIndexOf('.');
  const ext = dot > 0 ? file.name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) : '';
  return {
    props: { placement: 'dropzone', via, ext: ext || 'none', mime: (file.type || 'unknown').slice(0, 60) },
    metrics: { size_mb: Math.round((file.size / 1_048_576) * 10) / 10 },
  };
}

/** An error as a short reason, with the file's name taken out — names are personal. */
export function failureReason(error: unknown, fileName?: string): string {
  let text: string;
  if (error instanceof Error || (typeof DOMException !== 'undefined' && error instanceof DOMException)) {
    const e = error as Error;
    const generic = !e.name || e.name === 'Error';
    text = generic ? e.message : `${e.name}: ${e.message}`;
  } else if (typeof error === 'string') {
    text = error;
  } else {
    text = '';
  }
  if (fileName) text = text.split(fileName).join('<file>');
  return text.trim().slice(0, MAX_REASON) || 'unknown';
}

export function fileChosen(file: File, via: 'picker' | 'drop'): void {
  const { props, metrics } = fileFacts(file, via);
  track('file_chosen', props, metrics);
}

export function toolFailed(stage: 'open' | 'analyse' | 'run' | 'save', error: unknown, file?: File | null): void {
  track('tool_failed', { stage, reason: failureReason(error, file?.name) });
}
