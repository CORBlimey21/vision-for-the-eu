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
