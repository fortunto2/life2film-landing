/**
 * What the splitter does when the mode select changes.
 *
 * It used to ignore every change while `busy`, and the scene analysis keeps `busy` for as long as
 * it takes to read the whole file, so choosing "every 15 s" during it did nothing: the page stayed
 * on "Placing cut" and the person waited for a pass they had just declined. A change away from
 * scenes now cancels the analysis and cuts on the clock at once.
 */
export type ModeChange = 'ignore' | 'analyse' | 'regroup' | 'cancel-then-regroup';

export function modeChangeAction(state: {
  mode: 'scenes' | 'parts' | 'every';
  hasFile: boolean;
  busy: boolean;
  /** The busy state is the scene analysis, not an export or a reopen. */
  analysing: boolean;
  hasShots: boolean;
}): ModeChange {
  if (!state.hasFile) return 'ignore';
  if (state.busy) return state.analysing && state.mode !== 'scenes' ? 'cancel-then-regroup' : 'ignore';
  if (state.mode === 'scenes' && !state.hasShots) return 'analyse';
  return 'regroup';
}

/** A run is current until a newer one starts or it is cancelled; long loops ask before each step. */
export function runToken() {
  let current = 0;
  return {
    begin: () => ++current,
    cancel: () => void ++current,
    isCurrent: (id: number) => id === current,
  };
}
