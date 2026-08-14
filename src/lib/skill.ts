import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

/**
 * The agent skill, read from the published package at build time.
 *
 * It used to be read from a sibling checkout by relative path, which worked on the machine that
 * happened to have both repositories side by side and nowhere else — CI checks out this repository
 * alone, so the deploy would have failed with ENOENT.
 *
 * Reading it from `node_modules` makes the dependency real: the lockfile pins which version of the
 * skill the site shows, and `pnpm install` guarantees it is there.
 */
const require = createRequire(import.meta.url);

export const SKILL = readFileSync(require.resolve('life2film-engine/SKILL.md'), 'utf-8');

/** Kept beside the skill so the page cannot advertise a version the package does not have. */
export const ENGINE_VERSION: string = require('life2film-engine/package.json').version;
