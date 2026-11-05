import { describe, expect, test } from 'vitest';
import { modeChangeAction, runToken } from './mode-switch';

const base = { mode: 'every' as const, hasFile: true, busy: false, analysing: false, hasShots: false };

describe('the mode select during and after the scene analysis', () => {
  test('"every 15 s" while the scene pass runs cancels it and cuts on the clock (was: ignored)', () => {
    expect(modeChangeAction({ ...base, busy: true, analysing: true })).toBe('cancel-then-regroup');
    expect(modeChangeAction({ ...base, mode: 'parts', busy: true, analysing: true })).toBe('cancel-then-regroup');
  });
  test('an export in progress is never interrupted', () => {
    expect(modeChangeAction({ ...base, busy: true, analysing: false })).toBe('ignore');
  });
  test('scenes chosen while the scene pass already runs changes nothing', () => {
    expect(modeChangeAction({ ...base, mode: 'scenes', busy: true, analysing: true })).toBe('ignore');
  });
  test('idle: scenes without shots analyses, anything else regroups; no file, nothing', () => {
    expect(modeChangeAction({ ...base, mode: 'scenes' })).toBe('analyse');
    expect(modeChangeAction({ ...base, mode: 'scenes', hasShots: true })).toBe('regroup');
    expect(modeChangeAction(base)).toBe('regroup');
    expect(modeChangeAction({ ...base, hasFile: false })).toBe('ignore');
  });
});

describe('runToken', () => {
  test('a cancelled or superseded run stops being current', () => {
    const t = runToken();
    const a = t.begin();
    expect(t.isCurrent(a)).toBe(true);
    t.cancel();
    expect(t.isCurrent(a)).toBe(false);
    const b = t.begin();
    const c = t.begin();
    expect(t.isCurrent(b)).toBe(false);
    expect(t.isCurrent(c)).toBe(true);
  });
});
