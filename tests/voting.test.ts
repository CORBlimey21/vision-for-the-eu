import test from 'node:test';
import assert from 'node:assert/strict';
import { explainVote } from '../src/domain/voting.ts';
test('bounded 26-support example distinguishes opposition from abstention', () => {
  assert.equal(explainVote('unanimity', 'oppose').passes, false);
  assert.equal(explainVote('unanimity', 'abstain').passes, true);
  assert.equal(explainVote('qualified-majority', 'oppose').passes, true);
  assert.equal(explainVote('qualified-majority', 'abstain').passes, true);
});
