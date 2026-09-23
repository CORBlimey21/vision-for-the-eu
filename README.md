# Vision for the EU

A local-data-first exploration of the European project by Darragh Ó Súilleabháin, Cillian Ó Ríordáin, Jake Varley and Thomas Myers at CBC Cork. Built for an Irish Transition Year competition. This repository contains the **first vertical slice, visual refinement and initial team-content integration**, not the whole planned experience.

## Run

Node 22.6+ (Node 22 LTS recommended), npm.

```sh
npm ci
npm run dev
npm run check
```

`npm run build` produces `dist/`. `npm run preview` serves that build. No API keys, backend, accounts or environment variables are needed. Internet is needed for installation, not for runtime geographic data. Serve the files over HTTP; opening `index.html` directly from disk will not work.

## Implemented

- Persistent MapLibre globe with native atmosphere, dark physical geography, restrained land hillshade, and a limited Europe-focused camera.
- Data-driven integration sequence, 1957–2026, including Brexit, play/pause, timeline seeking, and reduced-motion stepping.
- Selection of all 27 members, with camera transitions, hover, contextual membership information, and a keyboard-accessible country index (including tiny states).
- One end-to-end illustrative energy decision: choose → curved globe connections and travelling exchange points → qualitative effects → trade-offs → revise.
- Geographic explanation pins, a before/after comparison that preserves the policy choice, flow pause/resume, and accession/departure pulses.
- Decision-making chapter with an interactive, fictional 26-to-1 voting explanation and source links.
- Draft team-vision ending with a comparison to the visitor’s own choices.
- Responsive layouts, reduced motion, no-WebGL content fallback, a source/method dialog, and a transparent statement that no responses are collected.
- Static GISCO geometry and 92 bounded elevation tiles, preprocessing scripts, provenance, domain tests, asset validation, CI and a manually triggered GitHub Pages workflow.

## Read next

- [Architecture and decisions](docs/ARCHITECTURE.md)
- [Content guide](docs/CONTENT.md)
- [Handoff and verification](docs/HANDOFF.md)

## Boundaries

Energy deltas and links are **authored illustrations**, not forecasts, infrastructure routes or verified policy findings. No economic/population figures have been invented. Historical views use modern country boundaries and explicitly say so. Terrain is visual hillshade, not an analytical elevation product.

Two topics (energy and decision-making) and an editable draft team-vision ending are implemented. Aggregate comparison, an approved team vision and real topic statistics are not built. Their schema/service boundaries are established. The original planning documents under `output/` and the existing Python script remain untouched.

## GitHub Pages

The Vite base is relative (`./`), so a repository subpath works. Once this directory is placed in a GitHub repository, enable **Settings → Pages → GitHub Actions** and manually run **Deploy to GitHub Pages**. No deployment or remote repository has been created by this implementation. CI validates pushes and pull requests; deployment is deliberately manual.

## Asset attribution

Administrative boundaries: © EuroGeographics, distributed through Eurostat GISCO (Countries 2024, 1:20 million). Terrain: Mapzen Terrain Tiles and underlying contributors. Full URLs, retrieval dates and processing notes are under `public/data/` and in the in-app source dialog. See `docs/CONTENT.md` for updating assets.
