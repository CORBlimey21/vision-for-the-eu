"""Create bounded MP3 excerpts and caption assets; original recordings stay untouched.
Run with the separate PyAV 16 / NumPy environment used for transcription.
"""
import hashlib
import json
import re
from pathlib import Path
import av
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / 'EU Voice Notes'
OUTPUT = ROOT / 'public/audio'
# Times refer to the original audio. Decision making3 is held pending sourced revision.
EXCERPTS = {
    'What needs to stay the same1': None,
    'What needs to stay the same2': None,
    'What needs to stay the same3': None,
    'What needs to stay the same4': [(0, 25.66)],
    'What needs to change1': [(18.12, 33.18)],
    'What needs to change2': [(1.33, 7.33), (28.33, 35.89)],
    'What needs to change3': [(16.74, 33.1)],
    'Decision making1': [(31.3, 43.3)],
    'Decision making2': None,
    'Decision making4': [(0, 20.22)],
    'Decision making5': [(4.32, 44.86)],
    'Decision making6': [(1.14, 19.98)],
    'Decision making7': [(0, 8.78), (17.22, 21.74)],
    'Our EU 20501': [(0, 10.35), (14.11, 35.95)],
    'Our EU 20502': [(5.59, 25.59)],
    'Our EU 20503': [(6.16, 8.9), (19.04, 47.16)],
    'Our Eu 20504': [(0, 8.85), (17.85, 39.05)],
    'Our EU 20505': None,
    'Our EU 20506': None,
    'Our EU 20507': None,
}
# Flagged wording is excluded from the audio, rather than silently corrected.
EDITS = {}

def vtt_time(seconds):
    ms = round(seconds * 1000)
    return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d}.{ms % 1000:03d}'


def main():
    OUTPUT.mkdir(exist_ok=True)
    records, provenance = [], []
    for stem, ranges in EXCERPTS.items():
        source = INPUT / f'{stem}.m4a'
        transcript = json.loads((INPUT / 'transcripts' / f'{stem}.json').read_text())
        assert hashlib.sha256(source.read_bytes()).hexdigest() == transcript['sha256']
        samples = []
        with av.open(str(source)) as container:
            resampler = av.AudioResampler(format='s16', layout='mono', rate=16000)
            for frame in container.decode(audio=0):
                for output in resampler.resample(frame): samples.append(output.to_ndarray())
            for output in resampler.resample(None): samples.append(output.to_ndarray())
        signal = np.concatenate(samples, axis=1)
        source_duration = signal.shape[1] / 16000
        ranges = ranges or [(0, source_duration)]
        ranges = [(start, min(end, source_duration)) for start, end in ranges]
        selected = np.concatenate([signal[:, round(a*16000):round(b*16000)] for a,b in ranges], axis=1)
        identity = re.sub(r'[^a-z0-9]+', '-', stem.lower()).strip('-')
        target = OUTPUT / f'{identity}.mp3'
        with av.open(str(target), 'w') as container:
            stream = container.add_stream('libmp3lame', rate=16000)
            stream.bit_rate = 64000
            stream.layout = 'mono'
            for start in range(0, selected.shape[1], 1152):
                chunk = np.ascontiguousarray(selected[:, start:start+1152])
                frame = av.AudioFrame.from_ndarray(chunk, format='s16p', layout='mono')
                frame.sample_rate = 16000
                for packet in stream.encode(frame): container.mux(packet)
            for packet in stream.encode(None): container.mux(packet)
        cues, offset = [], 0
        for start, end in ranges:
            for cue in transcript['segments']:
                a, b = max(start, cue['start']), min(end, cue['end'])
                if a >= b: continue
                text = cue['text']
                for original, corrected in EDITS.items(): text = text.replace(original, corrected)
                cues.append({'start': round(offset+a-start, 3), 'end': round(offset+b-start, 3), 'text': text})
            offset += end-start
        duration = selected.shape[1] / 16000
        assert all(0 <= c['start'] < c['end'] <= duration + .001 for c in cues)
        records.append({'id': identity, 'file': target.name, 'duration': duration, 'cues': cues})
        vtt = 'WEBVTT\n\n' + '\n\n'.join(f"{vtt_time(c['start'])} --> {vtt_time(c['end'])}\n{c['text']}" for c in cues) + '\n'
        (OUTPUT / f'{identity}.vtt').write_text(vtt)
        provenance.append({'id': identity, 'source_file': source.name, 'source_sha256': transcript['sha256'], 'source_ranges_seconds': ranges, 'output_sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'caption_status': 'edited machine transcript; approximate segment timing'})
        print(f'{target.name}: {duration:.2f}s', flush=True)
    (ROOT / 'src/data/narration.json').write_text(json.dumps(records, indent=2, ensure_ascii=False) + '\n')
    (OUTPUT / 'provenance.json').write_text(json.dumps({'sample_rate': 16000, 'codec': 'MP3 mono 64 kbps', 'recordings': provenance, 'held_recordings': ['Decision making3.m4a'], 'caption_edits': EDITS}, indent=2, ensure_ascii=False) + '\n')

if __name__ == '__main__': main()
