"""Local, timestamped machine transcripts; audio inputs are never modified.

Requires faster-whisper in a separate Python environment. Model weights are
downloaded separately; recognition itself runs locally. See docs/VOICE_NOTES.md.
"""

import argparse
import hashlib
import importlib.metadata
import json
import re
from pathlib import Path

from faster_whisper import WhisperModel


def timestamp(seconds):
    return f"{int(seconds) // 60:02d}:{seconds % 60:06.3f}"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=Path("EU Voice Notes"))
    parser.add_argument("--model", default="small.en")
    parser.add_argument("--model-cache", type=Path, required=True)
    args = parser.parse_args()
    files = sorted(args.input.glob("*.m4a"), key=lambda p: [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", p.name)])
    output = args.input / "transcripts"
    output.mkdir(exist_ok=True)
    model = WhisperModel(args.model, device="cpu", compute_type="int8", cpu_threads=6, download_root=str(args.model_cache))
    inventory = []
    for path in files:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        json_path = output / f"{path.stem}.json"
        if json_path.exists() and (output / f"{path.stem}.md").exists():
            previous = json.loads(json_path.read_text())
            if previous["sha256"] == digest and previous["model"] == args.model:
                inventory.append(previous)
                continue
        print(f"Transcribing {path.name}", flush=True)
        segments, info = model.transcribe(str(path), language="en", beam_size=5, vad_filter=True, condition_on_previous_text=False)
        rows = [{"start": s.start, "end": s.end, "text": s.text.strip(), "avg_logprob": s.avg_logprob, "no_speech_prob": s.no_speech_prob} for s in segments]
        record = {"file": path.name, "sha256": digest, "bytes": path.stat().st_size, "duration_seconds": info.duration, "model": args.model, "engine": f"faster-whisper {importlib.metadata.version('faster-whisper')}", "status": "machine transcript; not verbatim-certified or speaker-identified", "segments": rows}
        json_path.write_text(json.dumps(record, indent=2) + "\n")
        text = f"# {path.name}\n\nMachine transcript, {args.model}, English. Review against the recording before quoting. Speakers are not identified.\n\n"
        text += "\n\n".join(f"[{timestamp(s['start'])}–{timestamp(s['end'])}] {s['text']}" for s in rows) + "\n"
        (output / f"{path.stem}.md").write_text(text)
        inventory.append(record)
        print(f"Saved {path.name}: {info.duration:.1f}s, {len(rows)} segments", flush=True)
    (output / "inventory.json").write_text(json.dumps([{k: v for k, v in r.items() if k != "segments"} for r in inventory], indent=2) + "\n")
    (output / "ALL_TRANSCRIPTS.md").write_text("# EU voice notes — machine transcripts\n\n" + "\n\n".join((output / f"{Path(r['file']).stem}.md").read_text() for r in inventory))
    print(f"Complete: {len(inventory)}/{len(files)} files", flush=True)


if __name__ == "__main__":
    main()
