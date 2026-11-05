# Barolo MGA cadastre job: spot-check renders. Draws the old (consortium map, red) and new (cadastre, yellow)
# outline of an MGA, plus the new outlines of its neighbours (thin cyan), over AGEA 2024 orthophoto tiles
# (geoportale.agea.gov.it ImageServer, web mercator z17, about 1.2 m/px; tiles cached in raw/agea_tiles/).
# Usage: python3 -I scripts/bmc_render.py <id> [<id> ...]   -> work/barolo-mga/spot/<id>.png
import io, json, math, os, subprocess, sys
from PIL import Image, ImageDraw
from shapely.geometry import shape

R = '/home/claude/winesite'
OLD = R + '/work/fine_backup/geo_it_fine.2026-11-05.pre-barolo-mga.geojson'
NEW = R + '/site/data/geo/it_fine.geojson'
TILES = R + '/raw/agea_tiles'
URL = 'https://geoportale.agea.gov.it/image/rest/services/AgEA/Ortofoto_AgEA_2024/ImageServer/tile/{z}/{y}/{x}'
OUT = R + '/work/barolo-mga/spot'
Z = 17


def merc(lon, lat, z=Z):
    n = 2 ** z * 256
    x = (lon + 180) / 360 * n
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
    return x, y


def tile(z, x, y):
    fn = f'{TILES}/{z}/{y}/{x}.img'
    if not os.path.exists(fn):
        os.makedirs(os.path.dirname(fn), exist_ok=True)
        r = subprocess.run(['curl', '-sS', '-m', '60', '-o', fn + '.part', URL.format(z=z, y=y, x=x)], capture_output=True)
        if r.returncode != 0:
            return None
        os.replace(fn + '.part', fn)
    try:
        return Image.open(fn).convert('RGB')
    except Exception:
        return None


def rings(g):
    for p in getattr(g, 'geoms', [g]):
        yield p.exterior.coords
        for i in p.interiors:
            yield i.coords


def main():
    old = {f['properties']['id']: f for f in json.load(open(OLD))['features']}
    new = {f['properties']['id']: f for f in json.load(open(NEW))['features']}
    for fn in filter(None, os.environ.get('BMC_NEW', '').split(',')):   # preview builds not yet written
        for f in json.load(open(fn))['features']:
            f['properties'] = {**new[f['properties']['id']]['properties'], **f['properties']}
            new[f['properties']['id']] = f
    os.makedirs(OUT, exist_ok=True)
    for fid in sys.argv[1:]:
        go, gn = shape(old[fid]['geometry']), shape(new[fid]['geometry'])
        w, s, e, n = go.union(gn).bounds
        x0, y1 = merc(w, s); x1, y0 = merc(e, n)
        pad = 60
        x0, y0, x1, y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
        tx0, ty0, tx1, ty1 = int(x0 // 256), int(y0 // 256), int(x1 // 256), int(y1 // 256)
        img = Image.new('RGB', ((tx1 - tx0 + 1) * 256, (ty1 - ty0 + 1) * 256), (40, 40, 40))
        for tx in range(tx0, tx1 + 1):
            for ty in range(ty0, ty1 + 1):
                t = tile(Z, tx, ty)
                if t:
                    img.paste(t, ((tx - tx0) * 256, (ty - ty0) * 256))
        img = img.crop((int(x0 - tx0 * 256), int(y0 - ty0 * 256), int(x1 - tx0 * 256), int(y1 - ty0 * 256)))
        ox, oy = x0, y0
        d = ImageDraw.Draw(img)
        par = new[fid]['properties']['parent']
        bb = shape(new[fid]['geometry']).buffer(0.01)
        for oid, f in new.items():
            if oid != fid and f['properties'].get('parent') == par:
                g = shape(f['geometry'])
                if g.intersects(bb):
                    for r in rings(g):
                        d.line([(merc(*c)[0] - ox, merc(*c)[1] - oy) for c in r], fill=(0, 230, 255), width=1)
        for g, col in ((go, (255, 40, 40)), (gn, (255, 230, 0))):
            for r in rings(g):
                d.line([(merc(*c)[0] - ox, merc(*c)[1] - oy) for c in r], fill=col, width=2)
        d.rectangle((0, 0, 330, 34), fill=(0, 0, 0))
        d.text((6, 4), f"{new[fid]['properties']['name']}  red: consortium map  yellow: cadastre", fill=(255, 255, 255))
        d.text((6, 18), f"AGEA ortho 2024 z{Z}; cyan: neighbouring MGAs (new)", fill=(200, 200, 200))
        if max(img.size) < 700:
            k = 700 / max(img.size)
            img = img.resize((int(img.size[0] * k), int(img.size[1] * k)), Image.LANCZOS)
        img.save(f'{OUT}/{fid}.png')
        print(fid, img.size)


if __name__ == '__main__':
    main()
