// Usage: node scripts/prepare-geography.mjs /path/to/original.geojson
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const url =
  'https://gisco-services.ec.europa.eu/distribution/v2/countries/geojson/CNTR_RG_20M_2024_4326.geojson';
const raw = process.argv[2]
  ? await readFile(process.argv[2], 'utf8')
  : await (await fetch(url)).text();
const source = JSON.parse(raw);
const round = (coordinates) =>
  typeof coordinates[0] === 'number'
    ? coordinates.map((n) => +n.toFixed(4))
    : coordinates.map(round);
const features = source.features.map((f) => ({
  type: 'Feature',
  id: f.properties.CNTR_ID,
  properties: { id: f.properties.CNTR_ID, name: f.properties.NAME_ENGL },
  geometry: { ...f.geometry, coordinates: round(f.geometry.coordinates) },
}));
await mkdir('public/data', { recursive: true });
await writeFile(
  'public/data/countries.geojson',
  JSON.stringify({ type: 'FeatureCollection', features }),
);
await writeFile(
  'public/data/geography-source.json',
  JSON.stringify(
    {
      title: 'GISCO Countries 2024, 1:20 million',
      url,
      retrievedAt: new Date().toISOString().slice(0, 10),
      sha256: createHash('sha256').update(raw).digest('hex'),
      attribution: '© EuroGeographics for the administrative boundaries',
      processing:
        'Properties reduced; coordinates rounded to four decimal places. Contemporary geometry used schematically across historical dates; not historical boundaries.',
      license: 'https://ec.europa.eu/eurostat/web/gisco/geodata/administrative-units/countries',
    },
    null,
    2,
  ),
);
console.log(`Prepared ${features.length} country features.`);
