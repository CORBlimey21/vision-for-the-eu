import test from 'node:test';
import assert from 'node:assert/strict';
import { history, membersAt, currentMembers } from '../src/data/history.ts';
import { countries } from '../src/data/countries.ts';
import { topics } from '../src/content/topics.ts';
import { evaluateChoices } from '../src/domain/model.ts';
import { initialState, reducer } from '../src/app/state.ts';
test('enlargement counts and departure match accession chronology', () => {
  assert.deepEqual(
    history.map((_, i) => membersAt(i).length),
    [6, 9, 10, 12, 15, 25, 27, 28, 27, 27],
  );
  assert.equal(membersAt(1).includes('IE'), true);
  assert.equal(membersAt(7).includes('UK'), true);
  assert.equal(membersAt(8).includes('UK'), false);
  assert.deepEqual([...currentMembers].sort(), countries.map((c) => c.id).sort());
  assert.deepEqual(membersAt(-1), []);
});
test('choices are deterministic, reversible and do not accumulate', () => {
  const selected = { energy: 'shared-grid' };
  const result = evaluateChoices(topics, selected);
  assert.deepEqual(result.effects, {
    integration: 1,
    climate: 2,
    energySecurity: 2,
    investment: 2,
  });
  assert.deepEqual(result.networkIds, ['shared-grid']);
  assert.deepEqual(evaluateChoices(topics, selected), result);
  assert.deepEqual(evaluateChoices(topics, { energy: 'current-path' }).effects, {
    integration: 0,
    climate: 0,
    energySecurity: 0,
    investment: 0,
  });
  assert.deepEqual(evaluateChoices(topics, { energy: 'unknown' }).networkIds, []);
});
test('history ends at present; reduced motion starts paused; seeking clamps', () => {
  let state = reducer(initialState, { type: 'START', reduced: true });
  assert.equal(state.playing, false);
  for (let i = 0; i < history.length; i++) state = reducer(state, { type: 'TICK' });
  assert.equal(state.stage, 'PRESENT');
  assert.equal(state.playing, false);
  assert.equal(reducer(state, { type: 'HISTORY_AT', index: 100 }).historyIndex, history.length - 1);
});
test('country reset and policy revisit preserve the user choice', () => {
  let state = reducer(initialState, { type: 'SELECT', id: 'IE' });
  state = reducer(state, { type: 'OVERVIEW' });
  assert.equal(state.selectedCountry, null);
  assert.equal(state.stage, 'PRESENT');
  state = reducer(state, { type: 'BUILD' });
  state = reducer(state, { type: 'CHOOSE', topicId: 'energy', choiceId: 'shared-grid' });
  state = reducer(state, { type: 'RESULTS' });
  state = reducer(state, { type: 'BUILD' });
  assert.equal(state.selections.energy, 'shared-grid');
});

test('topic navigation and team reveal preserve independent visitor choices', () => {
  let state = reducer(initialState, { type: 'BUILD' });
  state = reducer(state, { type: 'CHOOSE', topicId: 'energy', choiceId: 'shared-grid' });
  state = reducer(state, { type: 'TOPIC', id: 'decision-making' });
  state = reducer(state, { type: 'CHOOSE', topicId: 'decision-making', choiceId: 'targeted-qmv' });
  assert.equal(evaluateChoices(topics, state.selections).effects.integration, 2);
  const saved = { ...state.selections };
  state = reducer(state, { type: 'TEAM_VISION' });
  state = reducer(state, { type: 'BUILD' });
  assert.deepEqual(state.selections, saved);
  state = reducer(state, {
    type: 'CHOOSE',
    topicId: 'decision-making',
    choiceId: 'retain-unanimity',
  });
  assert.equal(evaluateChoices(topics, state.selections).effects.integration, 1);
  assert.equal(state.selections.energy, 'shared-grid');
  for (const topic of topics)
    assert.ok(topic.choices.some((c) => c.id === topic.teamVision?.choiceId));
});

test('every published topic has valid sources, unique choices and a usable team reference', async () => {
  const { sources } = await import('../src/data/sources.ts');
  assert.equal(new Set(topics.map((t) => t.id)).size, topics.length);
  for (const topic of topics) {
    assert.equal(new Set(topic.choices.map((c) => c.id)).size, topic.choices.length);
    for (const id of topic.sourceIds) assert.ok(sources.some((s) => s.id === id));
    if (topic.teamVision) assert.ok(topic.choices.some((c) => c.id === topic.teamVision?.choiceId));
    if (topic.illustration === 'council-vote')
      assert.ok(topic.choices.every((c) => c.visual.votingRule));
  }
});
