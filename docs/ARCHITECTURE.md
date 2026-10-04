# Architecture

## Decisions made

1. **One environment, no router.** The reducer owns the narrative stage, timeline position, selected country. Narration point, playback and presentation modes are local React state. The globe stays mounted across stages. No URL state or persistence yet.
2. **MapLibre owns all geography.** Globe projection, country polygons, hit testing, hillshade and camera movement are native MapLibre. Three.js adds no material benefit to this slice, so it is absent. No Cesium, deck.gl, custom projection, satellite layer, roads, external fonts or live map service.
3. **Small, explicit state.** React `useReducer` is sufficient. Hover is local to the globe; the MapLibre instance stays in a ref. One persistent native audio element owns both playback and subtitle time. No visitor policy selections or effect scores are shown.
4. **Local validated inputs.** Official GISCO geometry is a static snapshot. Low-resolution elevation tiles are vendored only for the Europe bounds and zooms 0–5. Negative elevation is clamped to zero for visually quiet oceans. No API is called at runtime.
5. **CSS rather than a utility framework.** This bespoke editorial layout benefits from named, reusable visual classes. Tailwind would add configuration without improving this slice.
6. **Motion owns editorial transitions; MapLibre owns the camera.** Reduced motion skips camera flights and membership fades, stops animated connections and automatic history. The timeline remains manually operable. History and audio pause when the document is hidden; audio requires a new Play action on return.
7. **Bounded illustrations.** Electricity points select the existing conceptual energy network. Floating point graphics are no longer rendered; their component and fictional voting example remain reference code. There are no measured effects, scores or visitor policy choices in this presentation.

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

`TopicScene` accepts a `NarratedTopic`, point index and the shared player. `src/content/narration.ts` holds editorial positions and graphic selections (used to choose globe energy links); `src/data/narration.json` holds generated media metadata and caption cues. `src/domain/narration.ts` defines their contracts and pure caption/mode logic. `src/app/useNarration.ts` owns the native media lifecycle. `ClosingScene` renders the team sign-off using names and copy from `src/content/project.ts`. Reuse these modules rather than adding one component per policy.

## Narrative and media

```text
INTRO → HISTORY → PRESENT ↔ EXPLORE
                       ↓
          narrated chapters / BUILD_FUTURE
                       ↔
            Our Europe 2050 / TEAM_VISION
                       ↓
              Thank you / ENDING
```

The final 2050 recording reaches `ENDING` when automatic continuation is enabled. With continuation off it stops for review, and a manual “Thank you” button reaches the same screen. Ending navigation deactivates and unloads the audio; the globe stays mounted. The twelve-star entrance runs once, skips motion when reduced or hidden, and uses no timer or repeating animation.

The four narrated chapters are ambition, electricity, decision-making and the 2050 vision. A click starts playback; ending an excerpt advances within its chapter when enabled, stopping at the last point. Manual point/chapter changes pause and reset playback. Opening sources pauses playback. Voice-off mutes the same media element so subtitles continue against its currentTime. Turning off the last enabled channel enables the other. Playback preferences are session-only.

Recording selection prepares absolute source URLs; `preload="none"` defers the first source assignment, load and play to one synchronous Play action (`app/mediaPlayback.ts`). Automatic continuation reuses the unlocked element. Manual navigation pauses and resets without starting another media request; seeks made before loading are applied after metadata arrives. Standard 44.1 kHz AAC-LC in a fast-start M4A container is preferred, with 44.1 kHz MPEG-1 MP3 as a bounded fallback. Versioned audio filenames avoid reusing the previous 16 kHz MPEG-2 exports from browser/CDN caches. Audio URLs resolve Vite's base against the document URL. Captions use the local cue data and shared media clock; exported VTT files remain available, but the unused native caption track is removed. A media error switches once to the alternate format, preserving playback intent; Play reloads failed media inside the user gesture. Navigation, pause and visibility loss invalidate pending playback. Rejected play promises and missing media expose a readable transcript fallback; cues come from local data and remain available independently of successful loading. Failures expose per-format native MediaError codes/messages and a link to the browser’s standalone recording player. No diagnostics are sent or stored. No Web Speech voice substitution or backend is used. Event handlers, visibility listeners and pending media promises are cleaned up or invalidated on selection/unmount.

`public/audio/provenance.json` records original hashes, selected source ranges and exported hashes. The original recordings/full transcripts remain ignored; flagged sections are cut out of exported files, not merely skipped by JavaScript. `scripts/prepare-narration.py` regenerates assets with a separate local PyAV/NumPy environment; ordinary app builds need neither Python nor transcription tooling. Timings are approximate machine segments.

The older choice/effect modules and tests remain as isolated reference code, with no current app controls or participation flow. Their prior schema is not an instruction to reintroduce choices.

## Visual grammar

- Mint country illumination: historical/current membership.
- Brighter edge and fill: hover/selection.
- Gold electricity links and travelling points: potential cooperation, not infrastructure or measured power.
- Accession/departure rings: membership events.
- Point diagrams and the fixed 26-to-1 voting example: illustrations, not measured outcomes.
- Playback pause also pauses travelling electricity points; reduced motion keeps them static.

Typography uses native Georgia and Arial. The MapLibre globe stays mounted while narration changes. No per-point editorial animation delays subtitle updates.

## Camera and performance

At widths of 1100px and above, narration expands and shifts the canvas to the right. `camera.narration.union` provides a broad EU view; `camera.narration.electricity` provides a slightly closer western-Europe view for electricity points. The existing energy selection determines the framing, so points with the same view do not trigger unnecessary flights. These are editorial camera presets, not geographic evidence. Smaller screens retain their existing canvas and camera. The media-query listener is cleaned up. Camera flights skip motion when reduced/hidden and stop on visibility loss. A desktop-only chapter/point marker uses the actual chapter count; it has no panel background or animation loop.

Overview starts at `[13, 51]`, zoom 1.85, with a desktop canvas offset to make room for the narrative. Selected countries use editorial anchors rather than global multipolygon bounds (France's overseas territories would make `fitBounds` unsuitable). Zoom is bounded to 1.85–5.4; pitch/rotation are disabled. MapLibre's `transformConstrain` clamps the camera centre continuously to longitude −12…36 and latitude 35…66, using the pure `constrainEuropeCamera` helper in visual configuration. This replaces the post-drag return animation. It preserves all member-country/history anchors and the globe view without `maxBounds` forcing a viewport fit. Present, decisions and vision allow bounded pan/zoom; introduction, history and ending retain their authored camera. Membership illumination has a short bounded animation; network particles update at a capped 24 Hz only while active and visible. `animateWhileVisible` cancels frame requests on visibility loss and resumes without advancing the hidden time. Flow pause preserves the current phase. The energy scene has its own slightly closer camera preset. Canvas pixel ratio is capped at 2. Map events, intervals, observers and WebGL listeners are cleaned up, including React StrictMode's initial remount.

The full-width narration Next button sits directly below subtitles. Completed recordings brighten it and trigger a single lift; it scrolls into view if clipped. Reduced motion uses an immediate scroll and no lift; hidden pages skip both. Completion belongs to the recording ID so automatic advancement cannot flash the previous clip's completed state on the next point. Automatic continuation and manual navigation behavior are unchanged.

The map engine remains a large separate chunk (~274 kB gzip). Do not add more rendering frameworks merely to eliminate a cosmetic bundle warning. Measure on the actual competition laptop before promising a frame rate.

## Future participation

`ParticipationService` has `submit` and `aggregate`; the DTO contains only schema/model version and fixed topic/choice IDs. There is no Supabase client, anonymous login, network submission, local-storage persistence, fingerprinting or analytics. Before implementation, define server-side validation, abuse controls, aggregation thresholds and deletion/retention. Describe hosting/service request metadata honestly: “no names requested” is not the same as “no personal data ever processed”.

## Historical modules

Earlier choice-based components (`SceneControls`, `ChoiceSummary`, `SpatialGuide`) are preserved but are not rendered in the current narration experience. The source registry and static factual data remain separate from agreed team views. Approval does not establish factual claims or future outcomes.
