import test from 'node:test';
import assert from 'node:assert/strict';
import { renewableActive } from '../src/domain/renewables.ts';
import { narratedTopics } from '../src/content/narration.ts';
import { readFileSync } from 'node:fs';

test('renewable illustrations follow clock boundaries, seeks and navigation', () => {
  const cues = narratedTopics.find((topic) => topic.id === 'vision-2050')!.points[0].renewableCues!;
  assert.equal(renewableActive(cues, 'wind', 18.48), false);
  assert.equal(renewableActive(cues, 'wind', 18.49), true);
  assert.equal(renewableActive(cues, 'wind', 22.07), false);
  assert.equal(renewableActive(cues, 'solar', 22.07), true);
  assert.equal(renewableActive(cues, 'solar', 25.99), false);
  assert.equal(renewableActive(cues, 'wind', 19), true); // seek backwards
  assert.equal(renewableActive([], 'wind', 19), false); // leave the point
  assert.equal(renewableActive(cues, 'solar', NaN), false);
});

test('authored renewable windows fit recordings and align with relevant captions', () => {
  const recordings = JSON.parse(
    readFileSync(new URL('../src/data/narration.json', import.meta.url), 'utf8'),
  );
  const points = narratedTopics
    .flatMap((topic) => topic.points)
    .filter((point) => point.renewableCues);
  assert.equal(points.length, 2);
  for (const point of points) {
    const recording = recordings.find((item: { id: string }) => item.id === point.recordingId);
    for (const cue of point.renewableCues!) {
      assert.ok(cue.start >= 0 && cue.end > cue.start && cue.end <= recording.duration);
      const text = recording.cues
        .filter(
          (caption: { start: number; end: number }) =>
            caption.end > cue.start && caption.start < cue.end,
        )
        .map((caption: { text: string }) => caption.text)
        .join(' ');
      assert.match(text, cue.kind === 'wind' ? /wind/i : /solar panels/i);
    }
  }
});
