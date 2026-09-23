import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
const geo = JSON.parse(await readFile('public/data/countries.geojson', 'utf8'));
assert.equal(geo.type, 'FeatureCollection');
assert.equal(geo.features.length, 263);
const ids = new Set();
function coordinates(value) {
  if (typeof value[0] === 'number') {
    assert(value.every(Number.isFinite));
    assert(value[0] >= -180 && value[0] <= 180);
    assert(value[1] >= -90 && value[1] <= 90);
  } else value.forEach(coordinates);
}
for (const f of geo.features) {
  assert(!ids.has(f.id));
  ids.add(f.id);
  assert(f.id === f.properties.id);
  coordinates(f.geometry.coordinates);
}
for (const id of ['IE', 'UK', 'EL', 'DE', 'CY', 'MT', 'LU']) assert(ids.has(id), `Missing ${id}`);
const source = JSON.parse(await readFile('public/data/geography-source.json', 'utf8'));
assert(source.sha256.length === 64);
const relief = JSON.parse(await readFile('public/data/relief-source.json', 'utf8'));
const files = await readdir('public/data/relief', { recursive: true });
assert.equal(files.filter((p) => p.endsWith('.png')).length, relief.tiles);
for (const file of files.filter((p) => p.endsWith('.png'))) {
  const bytes = await readFile(`public/data/relief/${file}`);
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
}
console.log(`Validated ${ids.size} countries, provenance and ${relief.tiles} PNG relief tiles.`);
