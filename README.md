# Vision for the EU

A local-data-first exploration of the European project by Darragh Ó Súilleabháin, Cillian Ó Ríordáin, Jake Varley and Thomas Myers at CBC Cork. Built for an Irish Transition Year competition. This repository contains the **first vertical slice, visual refinement and voice-note integration**, not the whole planned experience.

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
- Four narrated chapters: ambition, electricity, decision-making and our 2050 vision. Twenty edited recording excerpts share one point → team decision → graphic renderer.
- Playback, pause, restart and seeking, with subtitles following the audio clock. Voice and subtitles default on; at least one remains enabled. Click Play to continue automatically through the current chapter, with a toggle for manual advancement.
- Conceptual electricity links and a fictional 26-to-1 voting explanation alongside the globe. Policy choices, numerical readouts and visitor comparisons are removed from the current experience.
- Flagged passages are physically omitted from the exported audio. Original M4A recordings and full transcripts remain preserved in the ignored input folder.
- Responsive layouts, reduced motion, no-WebGL content fallback, a source/method dialog, and a transparent statement that no responses are collected.
- Static GISCO geometry and 92 bounded elevation tiles, preprocessing scripts, provenance, domain tests, asset validation, CI and a manually triggered GitHub Pages workflow.

## Read next

- [Architecture and decisions](docs/ARCHITECTURE.md)
- [Content guide](docs/CONTENT.md)
- [Handoff and verification](docs/HANDOFF.md)
- [Voice-note transcripts, integration and limitations](docs/VOICE_NOTES.md)

## Boundaries

Graphics and energy links are **authored illustrations**, not forecasts, infrastructure routes or verified policy findings. No economic/population figures have been invented. Historical views use modern country boundaries and explicitly say so. Terrain is visual hillshade, not an analytical elevation product.

Subtitles are machine transcriptions with approximate segment timing, not listening-certified quotations. The twenty MP3/VTT pairs and their source ranges/hashes are under `public/audio/`; see `docs/VOICE_NOTES.md` for exclusions. Raw recordings are not shipped. Aggregate comparison and real topic statistics remain unimplemented. Original planning documents under `output/` and the existing Python blueprint remain untouched.

## GitHub Pages

The site is published at [corblimey21.github.io/vision-for-the-eu](https://corblimey21.github.io/vision-for-the-eu/). The Vite base is relative (`./`) so assets work under the repository path. CI validates pushes and pull requests. To publish later changes, manually run **Deploy to GitHub Pages** from the repository's Actions tab; deployment does not run on every push.

## Asset attribution

Administrative boundaries: © EuroGeographics, distributed through Eurostat GISCO (Countries 2024, 1:20 million). Terrain: Mapzen Terrain Tiles and underlying contributors. Full URLs, retrieval dates and processing notes are under `public/data/` and in the in-app source dialog. See `docs/CONTENT.md` for updating assets.
