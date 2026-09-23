import type { Choice, Dimension, Topic } from './types';
export const MODEL_VERSION = 'illustrative-1';
export const dimensions: { id: Dimension; label: string; meaning: string }[] = [
  { id: 'integration', label: 'Cooperation', meaning: 'More coordination between countries' },
  { id: 'climate', label: 'Renewable sharing', meaning: 'More potential to share renewable power' },
  {
    id: 'energySecurity',
    label: 'Supply resilience',
    meaning: 'More options during local disruption',
  },
  {
    id: 'investment',
    label: 'Investment required',
    meaning: 'More infrastructure spending required',
  },
];
export function evaluateChoices(topics: Topic[], selections: Record<string, string>) {
  const effects: Record<Dimension, number> = {
    integration: 0,
    climate: 0,
    energySecurity: 0,
    investment: 0,
  };
  const choices: Choice[] = [];
  for (const topic of topics) {
    const choice = topic.choices.find((c) => c.id === selections[topic.id]);
    if (!choice) continue;
    choices.push(choice);
    for (const [id, value] of Object.entries(choice.effects)) effects[id as Dimension] += value;
  }
  return {
    effects,
    consequences: choices.flatMap((c) => c.consequences),
    networkIds: choices.flatMap((c) => (c.visual.networkId ? [c.visual.networkId] : [])),
  };
}
