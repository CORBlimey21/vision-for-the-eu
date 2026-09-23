"""Vendor bounded, low-resolution Terrarium elevation tiles. No runtime tile API.
Run manually: python3 scripts/prepare-relief.py. Python standard library only.
Source: AWS Open Data Terrain Tiles (Mapzen), attribution in relief-source.json.
"""
import concurrent.futures, datetime, json, math, pathlib, urllib.request
root=pathlib.Path('public/data/relief')
def tile(lon,lat,z):
    n=2**z
    return int((lon+180)/360*n), int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n)
work=[]
for z in range(6):
    a,b=tile(-25,73,z); c,d=tile(45,32,z)
    work.extend((z,x,y) for x in range(a,c+1) for y in range(b,d+1))
def download(t):
    z,x,y=t; p=root/str(z)/str(x)/f'{y}.png'
    if p.exists(): return p.stat().st_size
    p.parent.mkdir(parents=True,exist_ok=True)
    with urllib.request.urlopen(f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',timeout=40) as r: data=r.read()
    p.write_bytes(data); return len(data)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: sizes=list(pool.map(download,work))
(root.parent/'relief-source.json').write_text(json.dumps({'title':'Terrain Tiles / Mapzen elevation, Terrarium encoding','url':'https://registry.opendata.aws/terrain-tiles/','retrievedAt':str(datetime.date.today()),'bounds':[-25,32,45,73],'maxZoom':5,'tiles':len(work),'bytes':sum(sizes),'attribution':'Terrain Tiles © Mapzen; underlying sources include USGS, NASA and other contributors','notes':'Low-resolution elevation used only for visual hillshade, not analysis. See source registry for underlying dataset attribution.'},indent=2))
print(f'{len(work)} relief tiles, {sum(sizes)/1e6:.2f} MB')
