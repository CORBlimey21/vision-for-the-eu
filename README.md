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

- Persistent MapLibre globe with native atmosphere, dark physical geography, restrained land hillshade, continuous Europe-only camera-centre limits and bounded zoom.
- Data-driven integration sequence, 1957–2026, including Brexit, play/pause, timeline seeking, and reduced-motion stepping.
- Selection of all 27 members, with camera transitions, hover, contextual membership information, and a keyboard-accessible country index (including tiny states).
- Six narrated chapters: ambition, electricity, funding, decision-making, Ireland’s next steps and our 2050 vision. Thirty-one edited recording excerpts share one point → team decision renderer alongside the globe.
- Playback, pause, restart and seeking, with subtitles following the audio clock. Voice and subtitles default on; at least one remains enabled. Click Play to continue automatically through the current chapter, with a toggle for manual advancement.
- Large Next point/chapter controls directly beneath subtitles, with a brief completion lift and scroll into view when necessary. Reduced motion shows the completed control immediately.
- Media-timed illustrative wind turbines for Ireland and solar panels for Spain, with entrance/exit transitions, playback-linked motion and static reduced-motion views. These are schematic symbols, not actual installation locations or counts.
- Conceptual electricity links on the globe. The older policy-choice graphics, numerical readouts and visitor comparisons remain outside the current experience.
- Desktop narration gives the globe more space on the right, with a closer western-Europe framing for electricity and a quiet chapter/point progress marker. Mobile retains its existing framing.
- A closing thank-you from the four named team members, with a brief twelve-star entrance, replay and exploration controls. Automatic continuation reaches it after the final 2050 recording; manual readers can use “Thank you”.
- Flagged passages are physically omitted from the exported audio. Original M4A recordings and full transcripts remain preserved in the ignored input folder.
- Responsive layouts, reduced motion, no-WebGL content fallback, an about/sources dialog with an AI-assistance disclosure and privacy information.
- Static GISCO geometry and 92 bounded elevation tiles, preprocessing scripts, provenance, domain tests, asset validation, CI and a manually triggered GitHub Pages workflow.

## Read next

- [Architecture and decisions](docs/ARCHITECTURE.md)
- [Content guide](docs/CONTENT.md)
- [Handoff and verification](docs/HANDOFF.md)
- [Voice-note transcripts, integration and limitations](docs/VOICE_NOTES.md)

## Boundaries

Graphics and energy links are **authored illustrations**, not forecasts, infrastructure routes or verified policy findings. No economic/population figures have been invented. Historical views use modern country boundaries and explicitly say so. Terrain is visual hillshade, not an analytical elevation product.

Subtitles start from machine transcripts, with reviewed corrections against our supplied draft. Segment timings remain approximate; captions are not listening-certified quotations. The thirty-one AAC/MP3 recordings and VTT captions and their source ranges/hashes are under `public/audio/`; see `docs/VOICE_NOTES.md` for exclusions. Raw recordings are not shipped. Real topic statistics remain unimplemented. Original planning documents under `output/` and the existing Python blueprint remain untouched.

## GitHub Pages

The site is published at [corblimey21.github.io/vision-for-the-eu](https://corblimey21.github.io/vision-for-the-eu/). The Vite base is relative (`./`) so assets work under the repository path. CI validates pushes and pull requests. To publish later changes, manually run **Deploy to GitHub Pages** from the repository's Actions tab; deployment does not run on every push.

## Asset attribution

Administrative boundaries: © EuroGeographics, distributed through Eurostat GISCO (Countries 2024, 1:20 million). Terrain: Mapzen Terrain Tiles and underlying contributors. Full URLs, retrieval dates and processing notes are under `public/data/` and in the in-app source dialog. See `docs/CONTENT.md` for updating assets.
