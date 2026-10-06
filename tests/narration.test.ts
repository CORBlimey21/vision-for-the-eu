import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { narratedTopics } from '../src/content/narration.ts';
import { sources } from '../src/data/sources.ts';
import { cueAt, togglePresentation } from '../src/domain/narration.ts';

const media = JSON.parse(
  readFileSync(new URL('../src/data/narration.json', import.meta.url), 'utf8'),
);
const provenance = JSON.parse(
  readFileSync(new URL('../public/audio/provenance.json', import.meta.url), 'utf8'),
);

test('presentation modes keep an available channel for every toggle sequence', () => {
  for (const initial of [
    { voice: true, subtitles: true },
    { voice: true, subtitles: false },
    { voice: false, subtitles: true },
  ]) {
    for (const mode of ['voice', 'subtitles'] as const) {
      const next = togglePresentation(initial, mode);
      assert.equal(next[mode], !initial[mode]);
      assert.ok(next.voice || next.subtitles);
    }
  }
});

test('caption boundaries, gaps and seeks follow media time', () => {
  const cues = [
    { start: 0.5, end: 2, text: 'First' },
    { start: 3, end: 4, text: 'Second' },
  ];
  assert.equal(cueAt(cues, 0), undefined);
  assert.equal(cueAt(cues, 0.5)?.text, 'First');
  assert.equal(cueAt(cues, 2), undefined);
  assert.equal(cueAt(cues, 3)?.text, 'Second');
  assert.equal(cueAt(cues, 1)?.text, 'First');
  assert.equal(cueAt(cues, 4), undefined);
});

test('every narrated point has sources, bounded cues and a matching exported audio asset', () => {
  const ids = new Set();
  const used = new Set();
  for (const topic of narratedTopics) {
    assert.ok(topic.sourceIds.every((id) => sources.some((source) => source.id === id)));
    for (const point of topic.points) {
      assert.ok(!ids.has(point.id));
      ids.add(point.id);
      const record = media.find((item: { id: string }) => item.id === point.recordingId);
      assert.ok(record);
      used.add(record.id);
      assert.ok(record.duration > 0 && record.cues.length > 0);
      let previousEnd = 0;
      for (const cue of record.cues) {
        assert.ok(cue.text.trim().length > 0);
        assert.ok(
          cue.start >= previousEnd - 0.001 &&
            cue.end > cue.start &&
            cue.end <= record.duration + 0.001,
        );
        previousEnd = cue.end;
      }
      const exported = provenance.recordings.find((item: { id: string }) => item.id === record.id);
      const bytes = readFileSync(new URL(`../public/audio/${record.file}`, import.meta.url));
      assert.equal(createHash('sha256').update(bytes).digest('hex'), exported.output_sha256);
      const fallback = readFileSync(
        new URL(`../public/audio/${record.fallbackFile}`, import.meta.url),
      );
      assert.equal(createHash('sha256').update(fallback).digest('hex'), exported.fallback_sha256);
      assert.ok(record.file.endsWith('-v2.m4a') && record.fallbackFile.endsWith('-v2.mp3'));
      // Guard the mobile-compatible export format, beyond checking filenames.
      assert.ok(bytes.indexOf('moov') > 0 && bytes.indexOf('moov') < bytes.indexOf('mdat'));
      const id3Size = fallback.subarray(6, 10).reduce((size, byte) => (size << 7) | byte, 0);
      const frame = 10 + id3Size;
      assert.equal(fallback[frame], 0xff);
      assert.equal(fallback[frame + 1] & 0xfe, 0xfa); // MPEG-1, Layer III
      assert.equal(fallback[frame + 2] & 0x0c, 0); // 44.1 kHz

      assert.ok(
        readFileSync(
          new URL(`../public/audio/${record.id}.vtt`, import.meta.url),
          'utf8',
        ).startsWith('WEBVTT\n'),
      );
    }
  }
  assert.equal(used.size, 31);
  assert.equal(media.length, used.size);
  const files = readdirSync(new URL('../public/audio/', import.meta.url));
  assert.equal(files.filter((name) => name.endsWith('.mp3')).length, used.size);
  assert.equal(files.filter((name) => name.endsWith('.m4a')).length, used.size);
  assert.ok(!files.some((name) => name.includes('decision-making3')));
  assert.equal(provenance.sample_rate, 44100);
});

test('flagged passages are outside the exported source ranges and captions', () => {
  const exclusions: Record<string, [number, number][]> = {
    'what-needs-to-stay-the-same4': [[25.66, 60]],
    'what-needs-to-change1': [
      [0, 18.12],
      [33.18, 37.18],
    ],
    'decision-making5': [[0, 4.32]],
    'decision-making6': [[19.98, 60]],
    'decision-making7': [
      [8.78, 17.22],
      [21.74, 26],
    ],
    'our-eu-20503': [[8.9, 19.04]],
    'our-eu-20504': [[8.85, 17.85]],
    funding2: [
      [6.05, 7.28],
      [12.1, 36],
    ],
    funding3: [[38.6, 70]],
    'rogue-member-states': [
      [54.75, 58.61],
      [68.19, 75],
    ],
  };
  for (const [id, ranges] of Object.entries(exclusions)) {
    const record = provenance.recordings.find((item: { id: string }) => item.id === id);
    for (const [a, b] of record.source_ranges_seconds) {
      assert.ok(
        ranges.every(([start, end]) => b <= start || a >= end),
        `${id}: held passage retained`,
      );
    }
  }
  assert.ok(provenance.held_recordings.includes('Decision making3.m4a'));
  assert.deepEqual(provenance.caption_edits, {});
  const text = media
    .flatMap((item: { cues: { text: string }[] }) => item.cues.map((cue) => cue.text))
    .join(' ');
  assert.ok(
    !/87\.5|38\.4|2\.4 billion|5\.25|Proof that this system|compromised|Greedlock|Passerel|internet connector|multi-seed|force true/.test(
      text,
    ),
  );
});
