"""Apply reviewed subtitle wording without changing audio, ranges or cue timings."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORRECTIONS = json.loads((Path(__file__).parent / 'caption-corrections.json').read_text())


def apply_caption_corrections(identity, cues):
    result = [dict(cue) for cue in cues]
    for edit in CORRECTIONS['recordings'].get(identity, []):
        matches = [cue for cue in result if cue['text'] in (edit['original'], edit['corrected'])]
        if len(matches) != 1:
            raise ValueError(f'{identity}: subtitle correction no longer matches exactly one cue: {edit["original"]!r}')
        matches[0]['text'] = edit['corrected']
    return result


def caption_status(identity):
    if identity in CORRECTIONS['recordings']:
        return CORRECTIONS['status']
    return 'edited machine transcript; approximate segment timing'


def vtt_text(cues):
    def stamp(seconds):
        ms = round(seconds * 1000)
        return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d}.{ms % 1000:03d}'
    return 'WEBVTT\n\n' + '\n\n'.join(
        f'{stamp(cue["start"])} --> {stamp(cue["end"])}\n{cue["text"]}' for cue in cues
    ) + '\n'


def main():
    media_path = ROOT / 'src/data/narration.json'
    provenance_path = ROOT / 'public/audio/provenance.json'
    records = json.loads(media_path.read_text())
    assert set(CORRECTIONS['recordings']).issubset({record['id'] for record in records})
    for record in records:
        record['cues'] = apply_caption_corrections(record['id'], record['cues'])
        (ROOT / 'public/audio' / f'{record["id"]}.vtt').write_text(vtt_text(record['cues']))
    media_path.write_text(json.dumps(records, indent=2, ensure_ascii=False) + '\n')
    provenance = json.loads(provenance_path.read_text())
    for record in provenance['recordings']:
        record['caption_status'] = caption_status(record['id'])
    provenance['caption_edits'] = CORRECTIONS['recordings']
    provenance['caption_reference'] = CORRECTIONS['reference']
    provenance_path.write_text(json.dumps(provenance, indent=2, ensure_ascii=False) + '\n')


if __name__ == '__main__':
    main()
