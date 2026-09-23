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
