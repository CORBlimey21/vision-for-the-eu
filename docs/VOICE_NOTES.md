# Subtitle wording corrections — 8 October 2026

Corrected retained subtitle cues against the user-supplied draft, including punctuation, recognition errors and programme names. The user explicitly selected “punctual”, the Portugal–Poland comparison and “The European Union will succeed if all parts work together”, and retained the team wording “In our view” and “Overall, it is essential that…”. Spoken EU/European Union/It variations are retained where they remain clear.

Both `src/data/narration.json` and the matching public VTT captions use the corrections. `scripts/caption-corrections.json` records each exact before/after cue; `scripts/caption_corrections.py` applies it without re-encoding audio, and the audio exporter reuses the same correction layer. Regeneration fails if an edited cue no longer matches its reviewed text. Caption provenance names the supplied draft and distinguishes these corrections from listening certification.

Audio files, source ranges, cue boundaries, original recordings and raw machine transcripts are unchanged. Held passages remain excluded; the missing “Should the EU always act as one?” section is not added to audio or subtitles. No listening-based certification is claimed.

---

# Additional recordings — 6 October 2026

All eleven new recordings were transcribed with the existing small.en workflow, bringing the preserved input inventory to 32. Eleven additional public excerpts bring the presentation to 31 points across six chapters. These remain agreed team positions; factual qualifications and primary sources are separate from the decisions.

| Recording                 | Integration                                                                                                                   | Selected original seconds            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Funding1                  | Funding: contribute to shared goals                                                                                           | Full                                 |
| Funding2                  | Funding: what makes funding fair?                                                                                             | 0–6.05; 7.28–12.10                   |
| Funding3                  | Funding: invest in future opportunity                                                                                         | 0–38.60                              |
| Rogue member states       | Decision-making: shared rules need accountability                                                                             | 7.43–13.51; 38.31–54.75; 58.61–68.19 |
| What Ireland should do1–7 | Seven-point Ireland chapter: membership, funding access, research, smaller businesses, offshore wind, Erasmus and cooperation | Full                                 |

The [Department of Finance’s 2022 report](https://www.gov.ie/en/department-of-finance/publications/annual-report-on-irelands-transactions-with-the-eu-in-2022/) supports the recorded approximately €3.6 billion Irish contribution. That sentence is included. The rest of Funding2’s Ireland–Portugal comparison is omitted: the Irish cash report gives receipts of €2.009 billion, while Commission accounting uses a different basis. The [Commission spending and revenue dataset](https://commission.europa.eu/strategy-and-policy/eu-budget/long-term-eu-budget/2021-2027/spending-and-revenue_en) does not support the complete recorded comparison on a consistent basis. A source hash, worksheet cells and units are preserved in `FUNDING_REVIEW.json`. Budget flows alone do not measure the benefits of membership.

Funding3’s 38.4% Portugal GDP claim and assertion of causal proof are omitted. The [Banco de Portugal December 2023 bulletin](https://www.bportugal.pt/sites/default/files/documents/2024-01/be_dez23_e_0.pdf) reported 2022 real GDP growth of 6.8%; aggregate GDP growth cannot establish the effect of EU funding. The retained passage presents an investment rationale, with no promised economic outcome.

The enforcement excerpt omits the institution-composition wording and unconditional fines claim. Source notes distinguish infringement proceedings from Article 7, identify the CJEU’s two courts, and explain that political disagreement alone is not a breach. Ireland’s proposals retain programme eligibility, environmental/planning constraints and uncertain outcomes. Funding notes explain that GNI is only one revenue stream.

Raw transcripts remain unchanged in the ignored input folder. Funding2 and Funding3 also have supplementary `*.words.json` files generated with the same model and word timestamps; the exporter uses only words fully inside the selected intervals. Captions remain machine-generated and approximate, rather than certified verbatim transcripts. Existing twenty audio exports and cues are preserved, including the user-confirmed iPhone playback startup path.

The following sections document earlier increments and decisions.

---

# Narrated presentation — 4 October 2026

The user requested point → team decision as recorded audio → graphic, replacing visitor policy choices. They chose click Play to start and automatic continuation within the current chapter, and asked to **skip flagged wording/unsupported passages for now**.

Twenty edited excerpts now appear in four chapters. Original M4A files and full machine transcripts remain untouched. Exported mono MP3s, matching VTT captions and a hash/range manifest are under `public/audio/`; app cue metadata is in `src/data/narration.json`. No complete raw recording is exposed where it contains a held passage. Decision making3 is held entirely. Captions retain machine wording for included passages and approximate timing; no listening-based certification is implied.

Selected ranges are reproducible in `scripts/prepare-narration.py`. Notable omissions:

- Drinking-water figure and claimed improvement; unsupported Irish hydro and claims that smaller/landlocked states cannot produce renewables.
- The Celtic recognition-error sentence; clipped arguments-against heading; passerelle/multi-speed recognition-error passages; gridlock and force-through wording errors.
- Claims that no fossil fuel or waste will remain, and the unsupported external-technology majority claim.
- The circular-economy sentence with a probable missing word. Repair, durability and reuse remain in the excerpt and approved editorial position.

Discounted surplus power remains explicitly a proposed investment deal, not an existing entitlement. Future-tense vision recordings are presented as agreed aspirations. Current-rule and legal qualifications remain in the editorial/source layer. Defence keeps the user's confirmed independent-EU direction; Irish neutrality and command/parliamentary oversight remain unresolved.

Voice and subtitles start on. Muting voice retains the media clock so subtitles continue silently. Turning the last channel off enables the other. Manual navigation resets/pauses; hidden pages and the source dialog pause; chapter endings wait for the visitor. Missing/rejected media leaves the full selected transcript readable. No preferences or responses are stored.

Earlier integration notes below describe the preceding choice-based version and its full transcript inventory.

---

# Voice notes — integration, 4 October 2026

All **21 M4A recordings (about 13 minutes)** were transcribed locally with faster-whisper 1.2.1 / `small.en` in English. Inputs were preserved. Each recording has timestamped Markdown and JSON segments, with its filename, duration, byte count and SHA-256 in the inventory. These are machine transcripts, without speaker identification or listening-based certification. Review the audio before quoting wording verbatim.

The user confirmed that the recordings represent **agreed team positions**, and separately confirmed the independent-EU direction on defence. Approval describes the team's policy direction; it does not validate factual assertions, approve additional editorial safeguards, or guarantee future outcomes. Privacy, voluntary identity use and parliamentary oversight are questions to resolve, not agreements inferred from the recordings.

## Transcript files

Full transcripts are under `EU Voice Notes/transcripts/`, including `ALL_TRANSCRIPTS.md` and `inventory.json`. The recordings and full transcripts are ignored by Git and are not imported into the public app. The original filenames remain intact, including the `Our Eu 20504` capitalisation. Public content is an editorial adaptation, not a verbatim transcript.

| Recordings                     | Content                                                                            | Integration                                                                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Decision making1–7             | Current rules; arguments for/against reform; alternatives; targeted QMV conclusion | Existing decision-making topic, with sourced abstention/passerelle explanations and narrower budget wording; approved `targeted-qmv` reference |
| What needs to change1–3        | Renewable investment, interconnection, proposed discounted surplus-power deal      | Existing energy topic and 2050 electricity pillar; retain the deal as a proposal, without guaranteed discounts                                 |
| What needs to stay the same1–4 | Ambition, sustainability goals, climate action, drinking-water claim               | New ambition pillar; source links for SDGs/climate; water statistic held back                                                                  |
| Our EU 20501                   | Clean generation and cross-border sharing                                          | Electricity pillar and existing energy choice                                                                                                  |
| Our EU 20502                   | Reliable buses, trains and trams                                                   | New public-transport topic, two choices, consequences and team comparison                                                                      |
| Our EU 20503                   | Durability, repair, reuse, consumer behaviour                                      | New repair/reuse topic, two choices, consequences and team comparison                                                                          |
| Our Eu 20504; Our EU 20505     | Chips, cloud, AI, digital identity, essential services                             | Expanded digital-independence pillar; privacy/access safeguards remain design questions                                                        |
| Our EU 20506                   | Independent European force, unified command, national armies                       | Separate defence pillar retaining the confirmed independent-EU position; neutrality/deployment authority unresolved                            |
| Our EU 20507                   | Trust and willingness to share power                                               | Dedicated trust pillar                                                                                                                         |

## Transcription review points

The machine output is preserved rather than silently corrected. Likely recognition errors include `Greedlock` (Decision making7, 00:08), `Passerel` and `multi-seed Europe` (Decision making6, 00:20 and 00:32), `Celtic internet connector` (What needs to change1, 00:33), and the clipped heading `case against rapid` (Decision making5, 00:00). Context suggests “gridlock”, “passerelle”, “multi-speed Europe”, “Celtic Interconnector” and a heading about arguments against reform, respectively; these are proposed readings, not audio-verified corrections. Our EU 20503 at 00:08 may omit “circular” before “economy”. Some end timestamps slightly exceed container duration; segmentation is approximate.

## Claims bounded during adaptation

- Decision making1, 00:18–00:31: do not say every EU budget decision needs unanimity or that abstention blocks unanimity. Council guidance identifies own resources and the multiannual framework; [unanimity guidance](https://www.consilium.europa.eu/en/council-eu/how-does-the-council-vote/unanimity/) explains abstention. Council voting is not the whole EU legislative procedure.
- Decision making3–4: named-country motives, the length of particular negotiations and a guaranteed 35-plus-member EU were not inserted. They need event-specific primary evidence or explicit scenario treatment.
- Decision making6: [Article 31 TEU](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12016M031) supports the bounded constructive-abstention/passerelle explanation. The optional multi-speed-Europe discussion remains future work; it needs a defined policy and legal basis, not a generic opt-out claim.
- What needs to change1–3: Irish hydro potential, landlocked/small states being unable to generate renewables, and guaranteed discounts are not established. The real [Celtic project](https://www.eirgrid.ie/celticinterconnector) is distinct from conceptual globe lines.
- What needs to stay the same4, 00:35–00:49: the **87.5% drinking-water figure and claimed later increase** remain excluded. No dataset, geographical denominator or comparable time series was supplied.
- Our EU 20501–03: no guaranteed elimination of fuels or waste, no quantified transport effect. The [climate-law objective](https://www.consilium.europa.eu/en/press/press-releases/2021/06/28/council-adopts-european-climate-law/) is distinguished from certainty of delivery. [Existing repair rules](https://www.consilium.europa.eu/en/policies/right-to-repair-products/) have a defined product scope.
- Our EU 20504–06: complete digital self-sufficiency, identical healthcare access and a current EU army are not asserted. The agreed direction is retained as an aspiration; the legal and institutional design is open.

## Architecture and next extensions

Four topics now reuse `TopicScene`. Transport and repair use `evaluation: 'qualitative'`; no score or mapped route is assigned, and their empty effect objects do not mean “no real-world impact”. Their scenes omit numerical readouts and numerical baseline controls. The existing energy/voting illustrations remain bounded. Team comparison retains unanswered choices and never overwrites the visitor's selections.

Next useful additions are a carefully scoped digital-identity choice (convenience, privacy, voluntary access), a defence choice after agreeing neutrality/command safeguards, and a sourced worked example of differentiated cooperation. These should use the same content model. Audio playback/narration would need a separate editorial choice about which voice, recording quality and consent for public distribution. No audio is published in this increment.

## Reproduce local transcription

Use a separate Python 3.12 environment with `faster-whisper==1.2.1` and `av==16.1.0`; PyAV 19 was incompatible with this decoder. No app dependency was added. The initial run used a temporary environment and model cache under `/private/tmp/eu-voice-*`.

```sh
python scripts/transcribe-voice-notes.py --model small.en --model-cache /path/to/local-model-cache
```

The model needs a first download; recognition runs locally. Matching filename/hash/model outputs are reused. The script does not modify audio. Temporary environment/model files are not durable prerequisites: recreate them when needed.
