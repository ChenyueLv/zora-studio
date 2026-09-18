"""Copy an MP3 unchanged and rebuild the player's real RMS waveform.

Usage: python scripts/build-music-demo.py /path/to/song.mp3
Requires soundfile and numpy. Title, artist, audio URL and timed lyrics live in
src/data/music-demo.json; this helper preserves them and updates duration/peaks.
"""
from pathlib import Path
import json
import shutil
import sys
import numpy as np
import soundfile as sf

root = Path(__file__).resolve().parents[1]
metadata = root / 'src/data/music-demo.json'
track = json.loads(metadata.read_text())
output = root / 'public' / track['src'].lstrip('/')
source = Path(sys.argv[1]).resolve()
output.parent.mkdir(parents=True, exist_ok=True)
if source != output.resolve():
    shutil.copyfile(source, output)
samples, rate = sf.read(output, dtype='float32', always_2d=True)
# RMS combines channel energy without cancelling out-of-phase stereo content.
energy = np.mean(samples ** 2, axis=1)
peaks = np.array([np.sqrt(np.mean(chunk)) for chunk in np.array_split(energy, 80)])
track['duration'] = round(len(samples) / rate, 3)
track['peaks'] = [round(float(value), 4) for value in peaks / max(peaks.max(), 1e-8)]
metadata.write_text(json.dumps(track, ensure_ascii=False, indent=2) + '\n')
print('Saved', output.name, 'duration', track['duration'], 'seconds;', len(peaks), 'audio-derived waveform bars')
