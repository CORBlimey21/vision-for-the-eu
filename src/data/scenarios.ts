import type { Dimension } from '../domain/types';
// Authored ordinal deltas. These are not measurements, probabilities or forecasts.
// Positive investment means a cost requirement, not an economic benefit.
export const scenarioEffects: Record<string, Partial<Record<Dimension, number>>> = {
  'current-path': {},
  'retain-unanimity': {},
  'targeted-qmv': { integration: 1 },
  'shared-grid': { integration: 1, climate: 2, energySecurity: 2, investment: 2 },
  // Qualitative topics have no numerical model; these are not zero-impact claims.
  'transport-local-path': {},
  'reliable-public-transport': {},
  'existing-repair-rules': {},
  'repair-first': {},
};
