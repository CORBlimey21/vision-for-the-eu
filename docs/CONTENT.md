# Content and data guide

## Add researched material

1. Register an actual source in `src/data/sources.ts`, including its URL and the date someone checked it.
2. Add or revise a `Topic` in `src/content/topics.ts`. Use plain text: content is rendered as React text, never HTML.
3. Keep measured statistics in the `present.statistics` or country `statistics` slots. Every statistic needs a year, unit, source ID and `verified`/`illustrative` status. Empty is preferable to invented.
4. Put policy deltas in `src/data/scenarios.ts`. A value is an authored ordinal point, not a claim about GDP, temperature, emissions or costs. Explain benefits and trade-offs in `consequences`.
5. Reuse a named visual effect. New links belong in `src/globe/networks.ts`, not in the topic's prose. A new visual effect must have an explicit conceptual meaning.
6. Only add `teamVision` after the four-person team agrees its position. Mark working content `draft`; do not silently promote it to approved.
7. Run `npm run check` and view the changed scene.

The energy topic keeps an illustrative effect model while linking factual background to sources. No topic statistics have been added. Four topics share the same choice schema and navigation; transport and repair explain trade-offs without numeric effects. Check factual copy and source scope before competition use.

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

## Updating effect semantics

`investment: +2` means greater spending is required. It is intentionally shown in amber. Do not change all positive scores to green “benefits”. Any new dimension needs a label, explanation, visual treatment and test. Baseline choices return zero additional effects; the absence of conceptual lines does not mean real Europe has no electricity connections.

## Optional voting explanation

Set `illustration: 'council-vote'` on a topic and supply `visual.votingRule` (`unanimity` or `qualified-majority`) for its choices. This selects a bounded visual explanation, not a topic-specific page. Never reuse it for arbitrary coalitions: its logic only covers 26 supporters and one other participating government. Edit its copy in `content/voting.ts`; source and scope must remain visible.

The team ending automatically compares each visitor choice with `teamVision.choiceId`. Missing choices display as unanswered, not as agreement or disagreement.

## Qualitative topics

Set `evaluation: 'qualitative'` for a choice supported by narrative trade-offs without a numerical model. Keep effect entries empty in `data/scenarios.ts`; the app omits numerical controls/readouts for that topic. Add optional `backgroundNotes` for context, with the supporting source IDs registered on the topic. Team approval does not verify statistics or convert aspirations into forecasts. See `VOICE_NOTES.md` for the October 2026 integration.
