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
