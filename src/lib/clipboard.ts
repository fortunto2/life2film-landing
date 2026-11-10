/**
 * Copy to clipboard, with the cascade that makes it work in in-app browsers too (X, Telegram,
 * Instagram): the clipboard API, then a hidden textarea + execCommand, then the text is selected
 * and the button says "long-press, Copy". The mechanics live in superduper-tools/shell.
 * Counts the copy as `code_copied`.
 */
import { flashCopy } from 'superduper-tools/shell';
import { track } from './track';

export async function copyText(
  text: string,
  button: HTMLButtonElement,
  restoreLabel: string,
  selectable?: Element | null,
  placement = 'code',
) {
  const ok = await flashCopy(button, text, { label: restoreLabel, select: selectable });
  button.classList.toggle('done', ok);
  if (ok) track('code_copied', { path: location.pathname, placement });
  return ok;
}
