export type Stage =
  | 'INTRO'
  | 'HISTORY'
  | 'PRESENT'
  | 'EXPLORE'
  | 'BUILD_FUTURE'
  | 'RESULTS'
  | 'COMPARE'
  | 'TEAM_VISION';
export type Dimension = 'integration' | 'climate' | 'energySecurity' | 'investment';
export interface Source {
  id: string;
  title: string;
  url: string;
  retrievedAt: string;
}
export interface Statistic {
  label: string;
  value: number;
  unit: string;
  year: number;
  sourceId: string;
  status: 'verified' | 'illustrative';
}
export interface Country {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
  joined: number;
  founding?: boolean;
  statistics: Statistic[];
}
export interface HistoryMoment {
  year: number;
  label: string;
  headline: string;
  description: string;
  add: string[];
  remove?: string[];
  sourceId: string;
  center: [number, number];
}
export interface Choice {
  resultHeadline?: string;
  id: string;
  title: string;
  description: string;
  effects: Partial<Record<Dimension, number>>;
  consequences: string[];
  visual: { networkId?: string; votingRule?: 'unanimity' | 'qualified-majority' };
}
export interface Topic {
  id: string;
  title: string;
  eyebrow: string;
  illustration?: 'council-vote';
  evaluation?: 'qualitative';
  backgroundNotes?: { title: string; text: string }[];
  present: { headline: string; explanation: string; statistics: Statistic[] };
  choices: Choice[];
  sourceIds: string[];
  status: 'illustrative' | 'reviewed';
  teamVision?: { choiceId: string; explanation: string; status: 'draft' | 'approved' };
}
export interface Submission {
  schemaVersion: 1;
  modelVersion: string;
  choices: Record<string, string>;
}
