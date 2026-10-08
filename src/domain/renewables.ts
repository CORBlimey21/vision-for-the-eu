export type RenewableKind = 'wind' | 'solar';
export interface RenewableCue {
  kind: RenewableKind;
  start: number;
  end: number;
}
/** Authored illustration windows follow the media clock, including paused seeks. */
export function renewableActive(cues: RenewableCue[], kind: RenewableKind, time: number) {
  return (
    Number.isFinite(time) &&
    cues.some((cue) => cue.kind === kind && time >= cue.start && time < cue.end)
  );
}
