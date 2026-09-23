import { history } from '../data/history.ts';
import type { Stage } from '../domain/types';
export interface ExperienceState {
  stage: Stage;
  activeTopicId: string;
  historyIndex: number;
  playing: boolean;
  selectedCountry: string | null;
  selections: Record<string, string>;
  cameraRevision: number;
  compareBaseline: boolean;
}
export const initialState: ExperienceState = {
  stage: 'INTRO',
  activeTopicId: 'energy',
  historyIndex: -1,
  playing: false,
  selectedCountry: null,
  selections: {},
  cameraRevision: 0,
  compareBaseline: false,
};
export type Action =
  | { type: 'START'; reduced: boolean }
  | { type: 'HISTORY_AT'; index: number }
  | { type: 'TICK' }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'PRESENT' }
  | { type: 'SELECT'; id: string }
  | { type: 'OVERVIEW' }
  | { type: 'BUILD' }
  | { type: 'TOPIC'; id: string }
  | { type: 'TEAM_VISION' }
  | { type: 'CHOOSE'; topicId: string; choiceId: string }
  | { type: 'RESULTS' }
  | { type: 'REPLAY' }
  | { type: 'COMPARE_BASELINE'; enabled: boolean };
export function reducer(state: ExperienceState, action: Action): ExperienceState {
  if (action.type === 'COMPARE_BASELINE') {
    return ['BUILD_FUTURE', 'RESULTS'].includes(state.stage)
      ? { ...state, compareBaseline: action.enabled }
      : state;
  }
  // Comparison changes the view only; navigation and new choices restore the scenario.
  state = { ...state, compareBaseline: false };
  switch (action.type) {
    case 'START':
      return {
        ...state,
        stage: 'HISTORY',
        historyIndex: 0,
        playing: !action.reduced,
        selectedCountry: null,
      };
    case 'HISTORY_AT':
      return {
        ...state,
        stage: 'HISTORY',
        historyIndex: Math.max(0, Math.min(history.length - 1, action.index)),
        playing: false,
        selectedCountry: null,
      };
    case 'TICK':
      return state.historyIndex >= history.length - 1
        ? { ...state, stage: 'PRESENT', playing: false }
        : { ...state, historyIndex: state.historyIndex + 1 };
    case 'TOGGLE_PLAY':
      return { ...state, playing: !state.playing };
    case 'PRESENT':
      return {
        ...state,
        stage: 'PRESENT',
        historyIndex: history.length - 1,
        playing: false,
        selectedCountry: null,
        cameraRevision: state.cameraRevision + 1,
      };
    case 'SELECT':
      return { ...state, stage: 'EXPLORE', selectedCountry: action.id, playing: false };
    case 'OVERVIEW':
      return {
        ...state,
        stage: state.stage === 'EXPLORE' ? 'PRESENT' : state.stage,
        selectedCountry: null,
        cameraRevision: state.cameraRevision + 1,
      };
    case 'TOPIC':
      return {
        ...state,
        activeTopicId: action.id,
        stage: 'BUILD_FUTURE',
        selectedCountry: null,
        playing: false,
      };
    case 'TEAM_VISION':
      return { ...state, stage: 'TEAM_VISION', selectedCountry: null, playing: false };
    case 'BUILD':
      return { ...state, stage: 'BUILD_FUTURE', selectedCountry: null, playing: false };
    case 'CHOOSE':
      return { ...state, selections: { ...state.selections, [action.topicId]: action.choiceId } };
    case 'RESULTS':
      return { ...state, stage: 'RESULTS' };
    case 'REPLAY':
      return { ...state, stage: 'HISTORY', historyIndex: 0, playing: false, selectedCountry: null };
  }
}
