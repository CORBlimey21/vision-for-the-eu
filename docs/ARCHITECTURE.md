# Architecture

## Decisions made

1. **One environment, no router.** The reducer owns the narrative stage, timeline position, selected country and policy selections. The globe stays mounted across stages. No URL state or persistence yet.
2. **MapLibre owns all geography.** Globe projection, country polygons, hit testing, hillshade and camera movement are native MapLibre. Three.js adds no material benefit to this slice, so it is absent. No Cesium, deck.gl, custom projection, satellite layer, roads, external fonts or live map service.
3. **Small, explicit state.** React `useReducer` is sufficient. Hover is local to the globe; the MapLibre instance stays in a ref. Policy scores are derived from selections, never incrementally mutated. A user can switch choices indefinitely without accumulating effects.
4. **Local validated inputs.** Official GISCO geometry is a static snapshot. Low-resolution elevation tiles are vendored only for the Europe bounds and zooms 0–5. Negative elevation is clamped to zero for visually quiet oceans. No API is called at runtime.
5. **CSS rather than a utility framework.** This bespoke editorial layout benefits from named, reusable visual classes. Tailwind would add configuration without improving this slice.
6. **Motion owns editorial transitions; MapLibre owns the camera.** Reduced motion skips camera flights and membership fades, stops animated connections and automatic history. The timeline remains manually operable. History pauses when the document is hidden.
7. **An honest consequence model.** Ordinal deltas are explanatory, not probabilities, percentages or projected real-world quantities. Positive investment denotes a requirement/cost. Narrative and map effects come from the same selected choice.

## File boundaries

| Area                            | Responsibility                                                  |
| ------------------------------- | --------------------------------------------------------------- |
| `src/app/state.ts`              | Narrative events and reducer; no map or network operations      |
| `src/app/App.tsx`               | Persistent shell and current slice orchestration                |
| `src/domain/types.ts`           | Shared content, statistics, policy and submission contracts     |
| `src/domain/model.ts`           | Pure deterministic evaluation and dimension labels              |
| `src/content/topics.ts`         | Editorial topic/choice copy, consequences and source references |
| `src/data/scenarios.ts`         | Authored policy effect values                                   |
| `src/data/history.ts`           | Accession/departure events and membership derivation            |
| `src/data/countries.ts`         | Country names, editorial camera anchors and fact slots          |
| `src/data/sources.ts`           | Source registry and retrieval dates                             |
| `src/globe/config.ts`           | Palette, camera and timing values                               |
| `src/globe/style.ts`            | MapLibre sources/layers and visual semantics                    |
| `src/globe/networks.ts`         | Illustrative network geometry and geographic graticule          |
| `src/globe/Globe.tsx`           | Map lifecycle and translation of app state into map commands    |
| `src/components/`               | Shared interface renderers and dialogs                          |
| `src/services/participation.ts` | Future anonymous aggregation interface; no implementation       |
| `public/data/`                  | Static runtime geography/elevation and provenance               |

`App.tsx` intentionally contains the few authored scenes in this slice. The generic `TopicScene` already accepts a `Topic`, selections and callbacks. `activeTopicId` and the topic selector now support four topics, preserving independent selections. Do not create an EnergyPage or one component per policy. The existing loop, statistics renderer and evaluator accept content objects. Results explain the active topic; the readout sums all choices. Before/after removes only the active topic contribution.

## Narrative

```text
INTRO → HISTORY → PRESENT ↔ EXPLORE
                       ↓
                 BUILD_FUTURE ↔ RESULTS
                                  ↓
                              TEAM_VISION
                         COMPARE (reserved)
```

`COMPARE` remains reserved. `TEAM_VISION` renders the agreed policy direction confirmed on 4 October 2026 from `content/teamVision.ts`, evaluating the topics’ approved choice references separately from visitor selections. `Topic.teamVision` provides a choice reference and approval state, so the eventual reveal can run through the same evaluator and network effects.

## Visual grammar

- Mint country illumination: historical/current membership.
- Brighter country edge and fill: hover or selection.
- Warm ivory/gold connections: a selected energy cooperation scenario.
- Travelling points on curved links: conceptual exchange, not measured power flow.
- A brief expanding ring: an accession or departure event.
- Numbered geographic annotations: inspect the idea at that location.
- Before/after switch: view-only comparison; never a change to the visitor's selected policy.
- Green ticks: increasing cooperation, sharing potential or resilience.
- Amber ticks: increased investment requirement.
- Camera movement: authored change of narrative focus.

No ambient particles. The energy scene has exactly 22 purposeful flow points (two per conceptual link). Graticules are deliberately faint. Typography uses native Georgia and Arial for immediate, offline rendering. The current title is “Vision for the EU”; the name is editable, not an external brand dependency.

## Camera and performance

Overview starts at `[13, 51]`, zoom 1.85, with a desktop canvas offset to make room for the narrative. Selected countries use editorial anchors rather than global multipolygon bounds (France's overseas territories would make `fitBounds` unsuitable). Zoom is bounded to 1.25–5.4; pitch/rotation are disabled; pan settles back inside Europe. This keeps ordinary navigation useful without street exploration. Membership illumination has a short bounded animation; network particles update at a capped 24 Hz only while active and visible. `animateWhileVisible` cancels frame requests on visibility loss and resumes without advancing the hidden time. Flow pause preserves the current phase. The energy scene has its own slightly closer camera preset. Canvas pixel ratio is capped at 2. Map events, intervals, observers and WebGL listeners are cleaned up, including React StrictMode's initial remount.

The map engine remains a large separate chunk (~274 kB gzip). Do not add more rendering frameworks merely to eliminate a cosmetic bundle warning. Measure on the actual competition laptop before promising a frame rate.

## Future participation

`ParticipationService` has `submit` and `aggregate`; the DTO contains only schema/model version and fixed topic/choice IDs. There is no Supabase client, anonymous login, network submission, local-storage persistence, fingerprinting or analytics. Before implementation, define server-side validation, abuse controls, aggregation thresholds and deletion/retention. Describe hosting/service request metadata honestly: “no names requested” is not the same as “no personal data ever processed”.

## Visual refinement pass

`SceneControls` compares the additional scenario effects with a zero-delta baseline without modifying selections. `SpatialGuide` and MapLibre DOM markers share `src/content/spatialNotes.ts`; mobile hides geographic labels and retains the same explanations below the controls. `flow.ts` produces curved conceptual link coordinates and samples their paths; MapLibre continues to own projection. `animation.ts` owns the small visibility-aware animation clock. No dependencies were added.

## Voting explanation and personal comparison

`Topic.illustration` and `Choice.visual.votingRule` configure the Council example independently of topic rendering. Its scope is deliberately fixed: all 27 participate, 26 support, and one opposes or abstains. It does not accept arbitrary coalitions or infer population weights. Source links and qualifications stay beside the diagram. The before/after switch changes its rule, not its fictional votes.

`ChoiceSummary` compares visitor choices with the team's approved references, without a score, persistence or submission. Unanswered topics remain explicit. It lives in the existing team ending and reuses the topic navigation action.

## Voice-note expansion

`Topic.evaluation` can select qualitative trade-offs: transport and repair use the shared choices/consequences renderer, with no numerical readout, baseline-effect switch or network. `backgroundNotes` supports optional contextual explanations without policy-specific components. Energy and voting keep their original illustration bounds. Full machine transcripts remain in the ignored input folder; `docs/VOICE_NOTES.md` maps every recording to the integration and records open research/design issues. Team approval is separate from factual evidence and future-outcome certainty.
