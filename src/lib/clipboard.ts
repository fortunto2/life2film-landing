/**
 * Copy to clipboard, with the fallback that makes it work everywhere.
 *
 * `navigator.clipboard` is refused outside a secure context and in some embedded browsers. Selecting
 * the text is not as good, but it is never worse than a button that silently does nothing — which is
 * what the second implementation of this on the engine page used to do.
 */
export async function copyText(
  text: string,
  button: HTMLButtonElement,
  restoreLabel: string,
  selectable?: Element | null,
) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = 'Copied';
    button.classList.add('done');
  } catch {
    if (selectable) {
      const range = document.createRange();
      range.selectNodeContents(selectable);
      getSelection()?.removeAllRanges();
      getSelection()?.addRange(range);
      button.textContent = 'Selected — press ⌘C';
    } else {
      button.textContent = 'Press ⌘C';
    }
  }

  setTimeout(() => {
    button.textContent = restoreLabel;
    button.classList.remove('done');
  }, 2500);
}
