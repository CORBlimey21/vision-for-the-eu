# Content and data guide

## Edit narrated points

1. Register factual background in `src/data/sources.ts`, with the source URL and actual retrieval date.
2. Edit positions, titles, qualifications, graphic labels and chapter structure in `src/content/narration.ts`. Approval describes team direction; extra safeguards remain questions unless agreed.
3. Reuse `TopicScene` and `NarrationGraphic`. A voting point supplies `votingRule` and optional `remainingVote`; the diagram stays a fictional 26-support example.
4. Audio excerpts and cues are generated in `src/data/narration.json` and `public/audio/`. Source ranges live in `scripts/prepare-narration.py`, with provenance under `public/audio/`. See `VOICE_NOTES.md` for exclusions. Keep original inputs untouched.
5. Use a separate local Python environment with PyAV 16 and NumPy to regenerate media. Do not install system-wide packages or add transcription dependencies to the web app.
6. Keep measured statistics in their existing factual slots; every statistic needs a year, unit, source and verification status. Empty is preferable to invented.
7. Run `npm run check`, inspect desktop/mobile, and verify production asset URLs after media changes.

The original choice content, scenario deltas and evaluator remain isolated reference modules. They are not used by the current narrated presentation.

## Historical data

History is an ordered list with `add` and optional `remove` country IDs. Membership is recomputed from the event stream. Correct dates/copy in one place. GISCO uses `EL` for Greece and `UK` for the United Kingdom; do not silently substitute ISO `GR` or `GB`.

1957 is the signing of the Treaties of Rome; 1958 is the EEC's start. Founding country facts show 1958. The historical geometry is explicitly schematic: modern Germany, modern borders, no reconstruction of overseas territorial membership changes. Do not describe it as a historically exact boundary map.

## Geographic updates

Ordinary builds use checked-in data. Refresh only deliberately:

```sh
node scripts/prepare-geography.mjs
python3 scripts/prepare-relief.py
# Pillow must be available in your chosen Python environment:
python3 scripts/flatten-bathymetry.py
npm run data:validate
```

The geography script accepts a downloaded original path as an optional argument. It retains all 263 world features for a recognisable physical globe, reduces properties and rounds coordinates to four decimals. Original-source SHA-256, URL and retrieval date are recorded. The unmodified 1.9 MB source can be reacquired from the recorded URL.

The relief script downloads only 92 tiles intersecting Europe at z0–5 and reuses existing tiles. Delete only the intended tile cache if deliberately refreshing the upstream snapshot. Flattening converts negative Terrarium elevations to zero; it is idempotent. For Pillow, use a local `.venv` or the supplied workspace runtime, not system-wide pip. The checked-in result is ~3.3 MB and is already ready to use.

Geography: © EuroGeographics for the administrative boundaries, distributed by Eurostat GISCO. Terrain: [Mapzen Terrain Tiles](https://registry.opendata.aws/terrain-tiles/); retain [underlying source attribution](https://github.com/tilezen/joerd/blob/master/docs/attribution.md). Preserve the visible credits and the source dialog when restyling.

## Evidence limits

Globe links are conceptual, not actual grid infrastructure. Caption timing is approximate and machine transcription remains fallible. Transcripts, sources and qualifications stay available beneath each point. Never turn team approval into a prediction or imply that unresolved neutrality, command, privacy or access safeguards were agreed.
