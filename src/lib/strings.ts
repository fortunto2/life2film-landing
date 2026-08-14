import type { ToolStatus } from './tools-i18n';

/**
 * Reading the tool's strings inside a client script.
 *
 * The words are chosen at build time but needed at run time, and Astro's `define:vars` would make
 * the script inline — which breaks the imports these tools rely on. So the strings ride along in a
 * data attribute and are read back here.
 *
 * English is the fallback in the type, not in the data: every locale ships a complete set, and a
 * missing key would be a build error rather than a silent English word in a Turkish sentence.
 */
export function toolStrings(): ToolStatus {
  const holder = document.getElementById('i18n');
  const raw = holder?.dataset.strings;
  if (!raw) throw new Error('Tool strings missing — the page did not render the #i18n element.');
  return JSON.parse(raw) as ToolStatus;
}

/** `say('Encoding — {n}%', { n: 42 })`. Values are substituted verbatim. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key) =>
    key in values ? String(values[key]) : whole,
  );
}
