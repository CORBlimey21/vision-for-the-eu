import test from 'node:test';
import assert from 'node:assert/strict';
import { connectionCurve, pointOnPath, flowParticles } from '../src/globe/flow.ts';
import { grid } from '../src/globe/networks.ts';
import { initialState, reducer } from '../src/app/state.ts';

test('comparison is view-only, resets on navigation and preserves policy choices', () => {
  let state = reducer(initialState, { type: 'BUILD' });
  state = reducer(state, { type: 'CHOOSE', topicId: 'energy', choiceId: 'shared-grid' });
  state = reducer(state, { type: 'COMPARE_BASELINE', enabled: true });
  assert.equal(state.compareBaseline, true);
  assert.equal(state.selections.energy, 'shared-grid');
  state = reducer(state, { type: 'COMPARE_BASELINE', enabled: false });
  assert.equal(state.selections.energy, 'shared-grid');
  state = reducer(state, { type: 'COMPARE_BASELINE', enabled: true });
  state = reducer(state, { type: 'PRESENT' });
  assert.equal(state.compareBaseline, false);
  assert.equal(reducer(state, { type: 'COMPARE_BASELINE', enabled: true }).compareBaseline, false);
});
test('conceptual paths preserve endpoints and particles remain bounded and repeatable', () => {
  const path = connectionCurve([-8, 53], [3, 46]);
  assert.deepEqual(path[0], [-8, 53]);
  assert.deepEqual(path.at(-1), [3, 46]);
  const beginning = flowParticles(grid, 0),
    later = flowParticles(grid, 1200);
  assert.equal(beginning.features.length, 22);
  assert.notDeepEqual(beginning, later);
  assert.deepEqual(beginning, flowParticles(grid, 0));
  for (const collection of [beginning, later])
    for (const feature of collection.features) {
      const [lng, lat] = feature.geometry.coordinates;
      assert(lng >= -9 && lng <= 27);
      assert(lat >= 38 && lat <= 65);
    }
  assert.deepEqual(pointOnPath(path, 0), pointOnPath(path, 1));
});

test('animation clock cancels hidden frames, resumes once and cleans up', async () => {
  const { animateWhileVisible } = await import('../src/globe/animation.ts');
  const original = {
    document: globalThis.document,
    requestAnimationFrame: globalThis.requestAnimationFrame,
    cancelAnimationFrame: globalThis.cancelAnimationFrame,
  };
  let hidden = false,
    id = 0;
  const frames = new Map<number, (time: number) => void>();
  const listeners = new Set<() => void>();
  Object.assign(globalThis, {
    document: {
      get hidden() {
        return hidden;
      },
      addEventListener: (_type: string, fn: () => void) => listeners.add(fn),
      removeEventListener: (_type: string, fn: () => void) => listeners.delete(fn),
    },
    requestAnimationFrame: (fn: (time: number) => void) => {
      frames.set(++id, fn);
      return id;
    },
    cancelAnimationFrame: (key: number) => frames.delete(key),
  });
  try {
    let updates = 0;
    const dispose = animateWhileVisible(() => {
      updates++;
    });
    assert.equal(frames.size, 1);
    hidden = true;
    listeners.forEach((fn) => fn());
    assert.equal(frames.size, 0);
    assert.equal(updates, 0);
    hidden = false;
    listeners.forEach((fn) => fn());
    assert.equal(frames.size, 1);
    const [frame, fn] = [...frames][0];
    frames.delete(frame);
    fn(100);
    assert.equal(updates, 1);
    assert.equal(frames.size, 1);
    dispose();
    assert.equal(frames.size, 0);
    assert.equal(listeners.size, 0);
  } finally {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) Reflect.deleteProperty(globalThis, key);
      else Reflect.set(globalThis, key, value);
    }
  }
});
