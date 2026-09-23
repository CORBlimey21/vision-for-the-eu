"""Clamp negative Terrarium elevations to zero for a quiet ocean.
Numeric elevation preprocessing, not a new terrain/projection engine.
Requires Pillow (use a local venv or the provided workspace Python runtime).
Run after prepare-relief.py; safe to run again.
"""
import json, pathlib
from PIL import Image
root=pathlib.Path('public/data/relief')
for path in root.rglob('*.png'):
    with Image.open(path) as image:
        rgb=image.convert('RGB')
        rgb.putdata([(128,0,0) if r<128 else (r,g,b) for r,g,b in rgb.getdata()])
        rgb.save(path,optimize=True)
meta=root.parent/'relief-source.json'
data=json.loads(meta.read_text());data['processing']='Negative elevations clamped to sea level; visual hillshade only.';data['bytes']=sum(p.stat().st_size for p in root.rglob('*.png'));meta.write_text(json.dumps(data,indent=2))
print(f'Prepared land-only elevation shading: {data["bytes"]/1e6:.2f} MB')
