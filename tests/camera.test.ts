import test from 'node:test';
import assert from 'node:assert/strict';
import { camera, constrainEuropeCamera } from '../src/globe/config.ts';
import { countries } from '../src/data/countries.ts';
import { history } from '../src/data/history.ts';

test('camera prevents world travel and excessive zoom without moving EU anchors', () => {
  for (const [lng, lat, zoom] of [
    [151, -34, -10],
    [-180, 90, 30],
    [540, -90, 0],
    [-500, 10, 5],
  ]) {
    const result = constrainEuropeCamera({ lng, lat }, zoom);
    assert(result.center[0] >= camera.centerBounds.west);
    assert(result.center[0] <= camera.centerBounds.east);
    assert(result.center[1] >= camera.centerBounds.south);
    assert(result.center[1] <= camera.centerBounds.north);
    assert(result.zoom >= camera.minZoom && result.zoom <= camera.maxZoom);
  }
  for (const target of [
    ...countries,
    ...history.map((entry) => ({ ...entry, zoom: camera.overview.zoom })),
    camera.overview,
    camera.energy,
    ...Object.values(camera.narration),
  ]) {
    const [lng, lat] = target.center;
    assert.deepEqual(constrainEuropeCamera({ lng, lat }, target.zoom), {
      center: target.center,
      zoom: target.zoom,
    });
  }
});

test('zooming out from an outlying member returns to the Europe overview limits', () => {
  const result = constrainEuropeCamera({ lng: 33.2, lat: 35 }, -2);
  assert.equal(result.zoom, camera.minZoom);
  assert.deepEqual(result.center, [camera.overviewBounds.east, camera.overviewBounds.south]);
  assert.deepEqual(constrainEuropeCamera({ lng: -120, lat: 85 }, camera.minZoom).center, [
    camera.overviewBounds.west,
    camera.overviewBounds.north,
  ]);
});

test('panning within Europe remains available at overview and country scale', () => {
  assert.deepEqual(constrainEuropeCamera({ lng: 8, lat: 50 }, camera.minZoom).center, [8, 50]);
  assert.deepEqual(constrainEuropeCamera({ lng: -8, lat: 53.3 }, 4.4).center, [-8, 53.3]);
});
