import type { RenewableCue } from './renewables';
export interface CaptionCue {
  start: number;
  end: number;
  text: string;
}
export interface Recording {
  id: string;
  file: string;
  fallbackFile: string;
  duration: number;
  cues: CaptionCue[];
}
export type Graphic =
  'ambition' | 'energy' | 'vote' | 'transport' | 'circular' | 'digital' | 'defence' | 'trust';
export interface NarratedPoint {
  id: string;
  recordingId: string;
  title: string;
  position: string;
  graphic: Graphic;
  graphicLabels: string[];
  renewableCues?: RenewableCue[];
  qualification?: string;
  votingRule?: 'unanimity' | 'qualified-majority';
  remainingVote?: 'oppose' | 'abstain';
}
export interface NarratedTopic {
  id: string;
  title: string;
  introduction: string;
  sourceIds: string[];
  points: NarratedPoint[];
}
export interface PresentationModes {
  voice: boolean;
  subtitles: boolean;
}
/** Keep one route to the spoken content available when a visitor changes modes. */
export function togglePresentation(
  modes: PresentationModes,
  mode: keyof PresentationModes,
): PresentationModes {
  const next = { ...modes, [mode]: !modes[mode] };
  if (!next.voice && !next.subtitles) next[mode === 'voice' ? 'subtitles' : 'voice'] = true;
  return next;
}
export function cueAt(cues: CaptionCue[], time: number): CaptionCue | undefined {
  return cues.find((cue) => time >= cue.start && time < cue.end);
}
export function formatMediaTime(seconds: number): string {
  const safe = Math.max(0, Number.isFinite(seconds) ? seconds : 0);
  return `${Math.floor(safe / 60)}:${String(Math.floor(safe % 60)).padStart(2, '0')}`;
}
