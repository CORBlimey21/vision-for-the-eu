import test from 'node:test';
import assert from 'node:assert/strict';
import { startMedia } from '../src/app/mediaPlayback.ts';

function media() {
  const calls: string[] = [];
  return {
    calls,
    src: '',
    error: null as MediaError | null,
    ended: false,
    currentTime: 0,
    load() {
      calls.push(`load:${this.src}`);
      this.error = null;
    },
    play() {
      calls.push(`play:${this.src}`);
      return Promise.resolve();
    },
  };
}

test('first start loads its absolute source and invokes play before yielding', async () => {
  const audio = media();
  const result = startMedia(audio, 'https://example.test/eu/audio/clip.m4a');
  assert.deepEqual(audio.calls, [
    'load:https://example.test/eu/audio/clip.m4a',
    'play:https://example.test/eu/audio/clip.m4a',
  ]);
  await result;
  audio.currentTime = 7;
  await startMedia(audio, audio.src);
  assert.equal(audio.currentTime, 7);
  assert.equal(audio.calls.filter((call) => call.startsWith('load:')).length, 1);
});

test('failed requests retry loading; replay resets; changing clips loads before playing', async () => {
  const audio = media();
  audio.src = 'https://example.test/one.m4a';
  audio.error = { code: 4 } as MediaError;
  await startMedia(audio, audio.src);
  assert.deepEqual(audio.calls, [`load:${audio.src}`, `play:${audio.src}`]);
  audio.ended = true;
  audio.currentTime = 20;
  await startMedia(audio, audio.src);
  assert.equal(audio.currentTime, 0);
  await startMedia(audio, 'https://example.test/two.mp3');
  assert.deepEqual(audio.calls.slice(-2), [
    'load:https://example.test/two.mp3',
    'play:https://example.test/two.mp3',
  ]);
});
