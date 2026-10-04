# iOS audio compatibility, 2026-10-04

The user reported immediate load failure on Play in iOS Safari and Firefox, while desktop played successfully. The live MP3 returned HTTP 200, and byte-range requests returned 206. Existing exports were 16 kHz MPEG-2 Layer III; codec compatibility is a suspected cause, not a reproduced device diagnosis.

Regenerated all twenty excerpts from the unchanged originals as 44.1 kHz AAC-LC M4A (fast-start), plus standard MPEG-1 MP3 fallbacks. Versioned filenames bypass prior asset caches. Source cuts, durations and captions are unchanged. The player selects AAC when supported, switches once on native load failure, and reloads failed media when Play is pressed again. Pause/navigation/hidden-page handling invalidates pending requests. No dependencies or collection were added.

Validation: all forty audio assets decode, match expected durations within 60 ms, and use 44.1 kHz; every AAC stream is LC and places its metadata before media bytes. Original source hashes were checked by the exporter; existing cue arrays and declared durations remain identical. All 16 tests, data validation, TypeScript and the production build passed. Browser checks at desktop and 390px width verified AAC playback and subtitle progression; deliberately unavailable AAC switched to MP3, and a deliberately failed MP3 recovered on Play after restoring the file. Physical-iPhone confirmation remains required.

# Latest increment — desktop globe composition, 2026-10-04

Desktop narration (1100px+) expands the globe canvas and moves it right to balance the story. Broad EU and closer electricity presets live in visual configuration; the existing electricity selection changes the framing. No fabricated routes or country positions were added. A quiet lower-right chapter/point marker shows actual navigation progress. Smaller screens retain existing framing, with the marker hidden. Media-query and camera visibility listeners are cleaned up; reduced/hidden states skip flights and visibility loss stops an active flight.

Validation: `npm run check` passes all 16 tests, asset validation, strict TypeScript and production build. The camera invariant test now includes both new presets. Browser inspection covered 1440×900, 1280×720 and 390×844, broad/electricity views, the 2050 energy-to-transport transition, progress updates and reduced-motion navigation. Both narrated stages retain the globe without floating graphic panels. Mobile globe geometry remains 540px tall and document width is 390px; the desktop marker is hidden there.

---

# Europe camera and prominent continuation, 2026-10-04

Camera centres are continuously constrained to Europe (−12…36 longitude, 35…66 latitude) through MapLibre's transform constraint. Zoom is 1.85–5.4, rotation stays disabled, and all existing country/history anchors are preserved. The old delayed moveend correction is removed. Bounded navigation now works in the 2050 vision as well as the other interactive stages.

The Next point/chapter/Thank you button is full-width inside the player below subtitles. Completion brightens it, lifts it once and brings it into view if needed. Reduced motion skips the lift and uses an immediate scroll; hidden pages skip both. Completion is keyed to recording ID to avoid a stale completion flash during automatic advancement. Existing auto-continuation remains enabled by default.

Validation: `npm run check` passes 16 tests, data validation, strict TypeScript and a production build. The new camera test covers far-away centres/excessive zoom and confirms every country/history/preset anchor is unchanged. Browser inspection at 1440×900, 1280×720 and 390×844 covered large drag/zoom gestures in present and vision, voice-only and subtitles-only completion, chapter completion, manual next-point/chapter transitions, automatic continuation without a stale completed-button flash, reduced-motion behavior and the ending. Completed controls fit inside the compact story boundary; mobile document width remains 390px. No physical-device gesture claim.

---

# Uncluttered narration and team ending, 2026-10-04

Removed the floating graphic panel from both “03 Our decisions” and “04 Our vision”, preserving the globe, its conceptual energy links, audio and subtitles. `NarrationGraphic` remains isolated reference code. The voting qualification no longer refers to a visible fictional diagram.

Added `ENDING` and a shared closing screen with the existing full team names/fadas from `content/project.ts`, a thank-you, and a one-time twelve-star entrance. Reduced motion/hidden documents skip that entrance. The last 2050 recording moves to the ending with continuation on; otherwise the last point stops for review. A “Thank you” button also reaches the ending. Replay and Europe exploration remain available; audio deactivates on exit.

Validation: `npm run check` passes all 15 tests, static-data validation, strict TypeScript and the production build. Browser inspection at 1440×900, 1280×720 and 390×844 confirmed that neither narrated tab renders the floating panel; mobile document width remains 390px. Checked manual ending, automatic transition after actual final-clip completion, continuation-off stopping on the last point, audio unloading, heading focus, replay resetting to paused point one, and return to Europe. The compact ending's controls fit inside the story boundary. Reduced motion renders the star ring at its final position immediately.

---

# Narrated presentation, 2026-10-04

The user chose a point → recorded team decision → graphic presentation, with click Play to start and automatic continuation within the current chapter. They asked to skip flagged/unsupported passages. The current app replaces policy choices, visitor comparisons and numerical readouts with four narrated chapters and twenty physically edited MP3 excerpts. Original inputs/transcripts and all planning artifacts remain preserved.

One persistent native audio element drives playback and subtitle timing. Voice/subtitles start on; turning the last active channel off enables the other. Voice-off keeps silent playback moving. Seeking, restart, point/chapter navigation and a continuation toggle are available. Manual navigation resets and pauses; the last point stops. Sources/hidden-page handling pauses playback. No storage, collection, backend or web dependencies were added.

`content/narration.ts` contains editorial positions/graphic references; `data/narration.json` contains media/cues. `useNarration` owns playback; `TopicScene` and `NarrationGraphic` serve every point. The existing bounded voting component supports fixed opposition/abstention without choice controls. Electricity points show conceptual globe links; playback pause/reduced motion stops travelling points. Older choice modules remain isolated reference code.

Exports live in `public/audio/`, with VTT captions and source-range/hash provenance. `scripts/prepare-narration.py` regenerates them in a separate PyAV 16/NumPy environment. Selected audio totals about 4 MB; only the current clip loads. Decision making3 is held entirely; other flagged sections are excluded from the files themselves. See `VOICE_NOTES.md`. Caption timing and transcription remain approximate and have no listening-based certification.

Validation: `npm run check` passes 15 tests, static data validation, strict TypeScript and production build. Every exported MP3 was decoded and checked against its duration; original-recording hashes still match. Browser inspection covered 1440×900, 1280×720 and 390×844: native playback/caption progression, channel switching, automatic advancement, manual reset/pause, seeking, chapter-end stop, source-dialog pause, correct 2050 media mapping and fixed abstention/QMV illustrations. The globe rendered; no policy-choice/readout controls remained; mobile document width equalled 390px. The production build played audio and used VTT URLs under `/vision-for-the-eu/`, with no captured browser console errors.

A final desktop spacing adjustment keeps longer headings and subtitles in the visible panel. The production 2050 scene’s subtitle block ended at 779px within the 795px story boundary at 1440×900; the compact energy scene also fit at 1280×720. Mobile remained 390px wide.

The previous choice-based release was published as `bb7223c`. Publishing still uses the manually triggered GitHub Pages workflow. No physical-device audio quality, exhaustive browser compatibility, performance or word-level caption accuracy claim is made. A listening review of edits/captions and a rehearsal on the exhibition laptop remain useful.

Earlier increments below are historical and superseded where they describe policy choices or raw audio exclusion.

---

# Latest increment — 2026-10-04

Transcribed all 21 voice recordings locally (about 13 minutes), preserving their SHA-256 hashes and saving timestamped Markdown/JSON plus a complete inventory in `EU Voice Notes/transcripts/`. These are machine transcripts; exact quotations still need audio review. Raw inputs/transcripts are Git-ignored and are not bundled in the app. See [VOICE_NOTES.md](VOICE_NOTES.md) for the per-recording integration map, probable recognition errors and factual exclusions.

The user confirmed agreed team positions and the independent-EU defence direction. The ending now has eight pillars covering ambition, electricity, public transport, circularity, voting, digital independence, defence and trust. Approval is separate from factual validation; safeguards and delivery details remain explicit questions. Four approved topic references drive the visitor comparison.

Two new topics reuse `TopicScene`: public transport and repair/reuse, each with two choices and qualitative consequences. `Topic.evaluation: 'qualitative'` suppresses numeric effects and baseline controls; no new score, route or forecast was invented. Decision-making adds optional sourced explanations for constructive abstention, Article 31 passerelle and the scope of budget unanimity. The existing 26-to-1 illustration remains unchanged.

Validation: `npm run check` passes 11 tests, static asset validation, strict TypeScript and the production build. Transcript integrity check verified all 21 original hashes, non-empty segments and Markdown files. Browser inspection at 1440×900 and 390×844 covered the two new topics, results, approved vision, unanswered comparisons, preserved visitor choices and voting context; mobile document width was 390px with no horizontal overflow. The persistent globe rendered; no performance or physical-device claim.

Local changes only; no commit, push or Pages deployment. Next useful extensions: a bounded digital-identity choice, defence safeguards and deployment authority, and a sourced differentiated-cooperation example. Public narration would need a separate voice/quality/consent decision.

Earlier increments below are historical; draft-status and two-topic descriptions are superseded by this entry.

---

# Latest increment — 2026-09-18

Decision-making now has a bounded, sourced voting illustration alongside the globe: 26 supporters and one opposing/abstaining government. The chosen policy selects unanimity or proposed wider QMV; before/after restores unanimity without replacing the saved choice. No population dataset, invented country position, forecast or general-purpose voting calculator is implied. Council QMV and unanimity guidance rechecked on 2026-09-18. The illustration explicitly explains the four-state blocking-minority condition.

`Topic.illustration` selects the explanation; `Choice.visual.votingRule` supplies the rule. Editorial copy lives in `content/voting.ts`, bounded logic in `domain/voting.ts`, and SVG/controls in `components/VotingIllustration.tsx`. The illustration uses 27 static SVG marks and no animation loop or new dependency. On narrow screens it follows the story. It replaces the generic effect readout in this chapter; combined effects remain available in energy.

`ChoiceSummary` in the team ending compares visitor selections with draft choice references, handles unanswered topics, and links back to edit. It is not an aggregate comparison. Topic headings now use the actual policy question. Inactive flow controls are omitted.

Validation: `npm run check` passes ten tests, static assets, strict TypeScript and production build. Browser checked at 1440×900 and 390×844: veto/abstention outcomes, QMV choice, baseline restoration, team summary with an unanswered topic, and return to the preserved decision choice. Mobile document/viewport both 390px. No performance benchmark or physical-device claim.

Next: editorial agreement on the draft, richer but equally bounded policy explanations, and complete demo rehearsal. Aggregate responses remain unimplemented.

---

# Latest increment — 2026-09-15

Integrated the expanded team draft through the existing reusable TopicScene. Energy copy now includes the proposed investment deal and a sourced Celtic reference; decision-making adds two alternatives and explicit trade-offs. Topic navigation preserves choices. Active-topic consequences are separate from combined ordinal effects; before/after removes only the active choice.

TEAM_VISION now renders four expandable draft pillars from `content/teamVision.ts`. Draft topic choice references drive its energy network without overwriting visitor choices. No approval or consensus is implied. Review `TEAM_INPUT.md` for omissions and unresolved questions.

Validation: eight tests, asset validation, strict TypeScript and production build pass. Browser inspected at 1440×900 and 390×844: two choices, decision consequences, draft ending, expanded technology/defence copy and return preserving the decision choice. Mobile document width was 390px. Desktop story scroll resets on scene changes. No physical-device/performance claim.

Next: team editorial review and safeguards, a better visual explanation of decision-making, and further sourced topic content. Anonymous comparison remains absent. Earlier notes below describe previous increments and are superseded where noted above.

---

# Handoff — current implementation

The code is a working foundation, not a finished competition entry. Start with `README.md`, then `ARCHITECTURE.md` and `CONTENT.md`.

## Visual refinement pass — 2026-09-12

The energy scene now includes curved conceptual routes, 22 travelling exchange points, gentle node pulses, three geographic explanation pins, and a closer camera preset. History adds brief accession/departure rings and a clear change count. No additional dependencies were introduced.

`SceneControls` provides before/after viewing and flow pause/resume. Comparing against the unchanged scenario does not alter the selected policy. The map and indicator deltas change together; returning restores the same choice. `SpatialGuide` provides the same annotation content independently of pointer access. Mobile retains it below the scenario controls.

New modules: `globe/animation.ts` (visibility-aware clock), `globe/flow.ts` (bounded conceptual paths/points), `content/spatialNotes.ts` (annotation copy), `components/SceneControls.tsx`, `components/SpatialGuide.tsx`, and `styles/refinements.css`.

Validation: `npm run check` passes with seven tests. Added coverage for view-only comparison, particle bounds/repeatability and cancellation/resumption/cleanup of the animation clock. Browser checked at 1440×900, 1024×768, 1280×720 and 390×844; tested comparison restore, annotation selection, pause control and reduced-motion history. The compact 1280×720 layout was corrected after detecting footer/indicator overlap; final geometry checks show the story and guide end before the footer and indicators respectively. Mobile document width equals its 390px viewport.

The team draft was read but not adopted as verified or approved content. See `TEAM_INPUT.md`. Continue to distinguish the illustrative energy model from actual infrastructure, measurements and team consensus.

## Next bounded increment

Add a second researched topic using `TopicScene`. Introduce `activeTopicId` and a compact spatial/topic navigation treatment, feed both topics into the existing evaluator, and verify switching topics preserves choices. Avoid adding aggregate responses or more rendering frameworks in the same increment.

After topic content stabilises, add the approved team vision through the same choice IDs and evaluator. Comparison should follow a separate privacy/service design decision. No current UI button promises unfinished comparison or team content.

## Verification completed

- TypeScript strict compilation and Vite production build.
- Four focused domain tests: accession/departure membership counts, deterministic/reversible model evaluation, history completion/reduced-motion start/seek bounds, and preservation of choices on revisit.
- Static asset validation: 263 unique country features, required GISCO IDs, coordinate ranges, provenance hash, 92 PNG elevation tiles.
- Dependency audit after updating to MapLibre 6.9.0: zero reported vulnerabilities at installation on 2026-09-11.
- Browser checks and remaining limitations are recorded in the final browser pass below.

## Integration details not to lose

- MapLibre 6 is ESM-only and has a separate module worker. `Globe.tsx` explicitly imports `maplibre-gl-worker.mjs?worker&url` and calls `setWorkerUrl`. Omitting this produced an empty globe in Vite's optimised dependency cache. The production build must include the emitted worker asset.
- Remove the WebGL context listeners before `map.remove()`. MapLibre deliberately loses the context when disposing; React StrictMode otherwise causes a false failure message.
- Use the geography source IDs (`EL`, `UK`). Current members and history must agree.
- Keep all visual geography local. The current app does not depend on external map tiles or fonts.
- Original planning documents were preserved. Git was initialised locally for review. All files remain uncommitted; no remote or publication was created.

## Intentional limits

- No measured real-world energy, demographic, financial or country statistical dataset yet; only membership facts.
- The world geometry is contemporary and schematic in history. Country anchors focus European territory, not overseas possessions.
- Relief is deliberately coarse and bounded to Europe. It is hillshade, not mesh extrusion.
- No mobile-device/GPU performance claim. Test the actual exhibition laptop before committing to a smooth-frame-rate guarantee.
- Browser refresh resets choices. There is no local persistence or anonymous response backend.
- Production assets must be served over HTTP. A local server works without external internet after installation; this is not a service-worker offline-installable PWA.
- The current dimension readout has a three-tick visual scale suitable for the single policy. Generalise the scale before aggregating multiple nonzero policies; numeric totals already sum correctly.

## Final browser pass — 2026-09-12

Verified in the Codex browser:

- Desktop at 1440×900: physical globe, membership illumination and conceptual energy links rendered. Ireland selected from the index with an appropriate close framing; France selected directly from its globe polygon.
- History in reduced-motion mode starts paused; seeking 2013 shows 28 members, and seeking 2020 shows 27. Manual controls remain available.
- Shared-grid choice changes the displayed effects to 1/2/2/2, enables the consequence view and shows three explanations including investment. Revisiting and choosing the baseline resets the four deltas to zero.
- Mobile at 390×844: globe, readable consequences, revisit control, effects and footer fit the scrolling layout. Document width equals viewport width (390 px).
- Sources dialog opens, exposes the provenance and explanatory-model/privacy limits, and closes with Escape.
- Production output served at `/eu-project/`: HTML, JS, CSS, emitted map worker, country GeoJSON and requested relief tiles returned HTTP 200; the globe and direct France selection worked. This tests repository-relative deployment paths, not a real GitHub deployment.

The build emits an expected large-chunk warning for the map engine. No frame-time benchmark, exhaustive browser matrix, simulated WebGL-loss test or real-device mobile test was performed. The code includes the fallback but that failure mode is not claimed as tested. Keep those evidence boundaries in later reports.
