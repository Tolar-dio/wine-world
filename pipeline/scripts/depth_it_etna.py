# Etna DOC contrade (unità geografiche aggiuntive, disciplinare Allegato 1; consolidated text of 28.02.2023 published by
# the Consorzio Tutela Vini Etna DOC, 133 contrade in 9 comuni) -> it_fine.geojson (src "etnacontr", bq approx).
# No contrada boundary file is published, so each outline is reconstructed:
#  1. DOC band per comune from the disciplinare art. 3 zone description (lower and upper contour lines: the Alcantara
#     valley in the north, 400 m in the east, 600 m in the south-west; upper 800 m on the north slope, 900 m on the
#     north-east and east, 1,000 m in the south and south-west), on Copernicus DEM GLO-30, inside the comune (OSM).
#  2. Castiglione di Sicilia: each contrada is restricted to the cadastral sheets (fogli di mappa) the annex names
#     (Agenzia delle Entrate cadastral WFS, CC BY 4.0).
#  3. A seed point per contrada (OpenStreetMap place/locality, then Nominatim, then the centroid of its fogli);
#     the band is shared among the contrade of the comune (and of each sheet) by Voronoi cells of the seeds.
# Usage: python3 -I scripts/depth_it_etna.py [--write] [--plot]
import sys, glob, unicodedata, hashlib, subprocess, time, urllib.parse
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_it_common import *
from depth_it_overpass import overpass
from shapely.geometry import shape, Point, MultiPoint, box
import numpy as np

SRC = 'etnacontr'
TXT = RAW + '/etna_cons/disciplinare_2023.txt'
NOM = RAW + '/osm_nominatim_it_etna'
AE = RAW + '/ae_cadastre/etna'
T32 = Transformer.from_crs(4326, 32633, always_xy=True)
T23 = Transformer.from_crs(32633, 4326, always_xy=True)
COMUNI = {  # disciplinare header -> (OSM name, ISTAT-style Belfiore code, lower m, upper m)
    'CASTIGLIONE DI SICILIA': ('Castiglione di Sicilia', 'C297', None, 800),
    'LINGUAGLOSSA': ('Linguaglossa', 'E602', 450, 900),
    'MILO': ('Milo', 'F217', 400, 900),
    'RANDAZZO': ('Randazzo', 'H175', None, 800),
    'SANTA MARIA DI LICODIA': ('Santa Maria di Licodia', 'I240', 600, 1000),
    'TRECASTAGNI': ('Trecastagni', 'L355', 450, 1000),
    'VIAGRANDE': ('Viagrande', 'L828', 400, 1000),
    'BIANCAVILLA': ('Biancavilla', 'A841', 600, 1000),
    'ZAFFERANA': ('Zafferana Etnea', 'M139', 400, 950),
}


def norm(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    s = re.sub(r'^(contrada|c\.da|cda)\s+', '', s.strip())
    return re.sub(r'[^a-z]', '', s)


def nice(s):
    s = s.strip().rstrip('.').replace('’', "'").strip()
    if s.isupper():
        s = s.title()
    s = s.replace("D'Api", "d'Api").replace(" Di ", " di ").replace(" Del ", " del ").replace(" Della ", " della ")
    return s[0].upper() + s[1:]


def parse():
    t = open(TXT, encoding='utf-8').read()
    t = t[t.find('Elenco unità geografiche aggiuntive'):]
    t = re.sub(r'\n\s*\d{1,2}\s*\n', '\n', t)          # page numbers
    parts = re.split(r'Nel comune di ([A-Z\' ]+?)\s*:', t)
    out = []
    for i in range(1, len(parts), 2):
        com = parts[i].strip()
        body = parts[i + 1]
        ents = re.split(r'\n\s*(\d{1,2})\s*[\.\)]\s*', '\n' + body)
        for j in range(1, len(ents), 2):
            num, rest = int(ents[j]), ents[j + 1]
            m = re.match(r'(?:Contrada\s+)?([^:\n]+?)\s*(?::|\n|$)', rest)
            name = m.group(1)
            name = re.sub(r'\s*Confini.*$', '', name).strip()
            desc = ' '.join(rest[m.end():].split())
            fogli = []
            fm = re.search(r'(?:fogli?o?|f\.)\s+di\s+mappa\s+(?:n\.?\s*)?([\d\s,\-e]+)', rest)
            if fm and com == 'CASTIGLIONE DI SICILIA':
                fogli = [int(x) for x in re.findall(r'\d+', fm.group(1))]
            out.append({'comune': com, 'num': num, 'name': nice(name), 'desc': desc[:400], 'fogli': fogli})
    return out


def nominatim(q):
    os.makedirs(NOM, exist_ok=True)
    fn = os.path.join(NOM, hashlib.md5(q.encode()).hexdigest()[:12] + '.json')
    if os.path.exists(fn):
        return json.load(open(fn))
    url = 'https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode(
        {'q': q, 'format': 'json', 'limit': 5, 'countrycodes': 'it'})
    res = []
    for i in range(4):
        r = subprocess.run(['curl', '-sS', '-m', '40', '-A', UA, url], capture_output=True, text=True)
        if r.returncode == 0 and r.stdout.strip().startswith('['):
            res = json.loads(r.stdout)
            break
        time.sleep(3 + 2 * i)
    json.dump(res, open(fn, 'w'))
    time.sleep(1.2)
    return res


def fogli_geoms(code):
    out = {}
    for fn in glob.glob(AE + '/*.gml'):
        t = open(fn, encoding='utf-8', errors='replace').read()
        for m in t.split('<wfs:member>')[1:]:
            mid = re.search(r'CadastralZoning\.IT\.AGE\.MAP\.([A-Z0-9_]+)"', m)
            if not mid or not mid.group(1).startswith(code + '_'):
                continue
            rings = []
            for pl in re.findall(r'<gml:posList[^>]*>([^<]+)</gml:posList>', m):
                v = [float(x) for x in pl.split()]
                rings.append([(v[i + 1], v[i]) for i in range(0, len(v) - 1, 2)])
            if not rings:
                continue
            from shapely.geometry import Polygon
            g = shapely.make_valid(Polygon(rings[0], rings[1:]))
            fid = mid.group(1)
            fnum = int(fid.split('_')[1][:4])
            out.setdefault(fnum, []).append(g)
    return {k: shapely.union_all(v) for k, v in out.items()}


def dem_band(bounds4326):
    import rasterio
    from rasterio.merge import merge
    srcs = []
    for lat in (37,):
        for lon in (14, 15):
            u = f'/vsicurl/https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N{lat:02d}_00_E{lon:03d}_00_DEM/Copernicus_DSM_COG_10_N{lat:02d}_00_E{lon:03d}_00_DEM.tif'
            srcs.append(rasterio.open(u))
    arr, tr = merge(srcs, bounds=bounds4326)
    return arr[0], tr


def band_poly(arr, tr, lo, hi):
    from rasterio import features
    m = np.ones(arr.shape, bool)
    if lo is not None:
        m &= arr >= lo
    if hi is not None:
        m &= arr <= hi
    polys = [shape(g) for g, v in features.shapes(m.astype('uint8'), mask=m, transform=tr) if v == 1]
    return shapely.make_valid(shapely.union_all(polys))


def main():
    write = '--write' in sys.argv
    C = parse()
    from collections import Counter
    print('contrade parsed:', len(C), Counter(c['comune'] for c in C))
    # --- comuni (OSM)
    q = '[out:json][timeout:240];(' + ''.join(
        f'relation[boundary=administrative][admin_level=8]["name"="{v[0]}"](37.4,14.6,38.1,15.4);' for v in COMUNI.values()) + ');out geom;'
    js = overpass(q)
    from shapely.ops import polygonize, linemerge
    COM = {}
    for e in js['elements']:
        ls = []
        for mbr in e.get('members', []):
            if mbr['type'] == 'way' and mbr.get('role') in ('outer', '') and 'geometry' in mbr:
                ls.append(shapely.LineString([(p['lon'], p['lat']) for p in mbr['geometry']]))
        polys = list(polygonize(shapely.union_all(ls)))
        COM[e['tags']['name']] = shapely.make_valid(shapely.union_all(polys))
    print('comuni:', {k: round(area_km2_4326(v), 1) for k, v in COM.items()})
    # --- DEM bands
    arr, tr = dem_band((14.75, 37.55, 15.30, 37.97))
    bands = {}
    for key, (cn, code, lo, hi) in COMUNI.items():
        b = band_poly(arr, tr, lo, hi).intersection(COM[cn])
        bands[key] = polys_only(shapely.make_valid(b))
    # --- seeds
    idx = {}
    js2 = overpass('''[out:json][timeout:240];
(
 node[place](37.55,14.75,37.97,15.30);
 way[place](37.55,14.75,37.97,15.30);
 node[name~"^[Cc]ontrada"](37.55,14.75,37.97,15.30);
 way[name~"^[Cc]ontrada"](37.55,14.75,37.97,15.30);
);
out tags center;''')
    for e in js2['elements']:
        n = e.get('tags', {}).get('name')
        if not n:
            continue
        c = e.get('center') or {'lat': e.get('lat'), 'lon': e.get('lon')}
        idx.setdefault(norm(n), []).append((n, c['lon'], c['lat']))
    fogli = fogli_geoms('C297')
    print('Castiglione fogli:', len(fogli))
    ALIAS = {'diciasettesalme': ['diciassettesalme'], 'zucconero': ['zucconero', 'zucconer'],
             'mantramurata': ['mandramurata', 'fontanamurata'], 'dagalagualtieri': ['dagalagualtieri'],
             'piccolo': [], 'zottorinotto': ['zottorinoto'], 'piricoco': ['piricoco'],
             'roccadapi': ['roccadapi', 'pianodapi'], 'pianofilici': ['pianofilici', 'pianodellefelci']}
    for c in C:
        cn, code, lo, hi = COMUNI[c['comune']]
        band = bands[c['comune']]
        key = norm(c['name'])
        cands = []
        for kk in [key] + ALIAS.get(key, []) + [norm(x) for x in re.split(r'\s*[-–]\s*', c['name']) if len(x) > 3]:
            for n, lon, lat in idx.get(kk, []):
                p = Point(lon, lat)
                if COM[cn].buffer(0.01).contains(p):
                    cands.append((n, p, 'osm'))
        if not cands:
            for qq in [f'Contrada {c["name"]}, {cn}', f'{c["name"]}, {cn}']:
                for r in nominatim(qq):
                    p = Point(float(r['lon']), float(r['lat']))
                    if COM[cn].buffer(0.01).contains(p) and norm(c['name'])[:5] in norm(r.get('display_name', ''))[:60]:
                        cands.append((r['display_name'][:40], p, 'nominatim'))
                if cands:
                    break
        fg = None
        if c['fogli']:
            fg = [fogli[f] for f in c['fogli'] if f in fogli]
            fg = shapely.union_all(fg) if fg else None
        if cands:
            # prefer a candidate inside the fogli / band
            def score(cd):
                p = cd[1]
                return (0 if fg is None or fg.buffer(0.002).contains(p) else 1, 0 if band.buffer(0.005).contains(p) else 1)
            cands.sort(key=score)
            c['seed'], c['seed_src'] = cands[0][1], cands[0][2]
            if fg is not None and not fg.buffer(0.002).contains(c['seed']):
                c['seed'], c['seed_src'] = fg.intersection(band).representative_point() if not fg.intersection(band).is_empty else fg.representative_point(), 'fogli'
        elif fg is not None:
            gb = fg.intersection(band)
            c['seed'] = (gb if not gb.is_empty else fg).representative_point()
            c['seed_src'] = 'fogli'
        else:
            c['seed'], c['seed_src'] = None, None
        c['fg'] = fg
    miss = [(c['comune'], c['name']) for c in C if c['seed'] is None]
    print('seeds:', Counter(c['seed_src'] for c in C), 'missing:', miss)
    # --- cells
    feats = []
    taken = all_ids(SRC)
    for com, (cn, code, lo, hi) in COMUNI.items():
        band = bands[com]
        cs = [c for c in C if c['comune'] == com and c['seed'] is not None]
        band32 = shapely.make_valid(reproj(band, T32))
        # Voronoi in UTM over all seeds of the comune
        pts = [reproj(c['seed'], T32) for c in cs]
        # de-duplicate identical seeds by a small offset
        seen = {}
        for i, p in enumerate(pts):
            kk = (round(p.x), round(p.y))
            if kk in seen:
                pts[i] = Point(p.x + 15 * (seen[kk] + 1), p.y + 15)
                seen[kk] += 1
            else:
                seen[kk] = 0
        env = band32.envelope.buffer(3000)
        for i, c in enumerate(cs):
            if c['fg'] is not None:
                # within its fogli: Voronoi among the contrade sharing any of those sheets
                fg32 = shapely.make_valid(reproj(c['fg'], T32))
                share = [j for j, d in enumerate(cs) if d['fg'] is not None and d['fg'].intersects(c['fg'].buffer(-0.0003))]
                vor = shapely.voronoi_polygons(MultiPoint([pts[j] for j in share]), extend_to=env) if len(share) > 1 else env
                cell = next((v for v in getattr(vor, 'geoms', [vor]) if v.contains(pts[i])), env) if len(share) > 1 else env
                g = fg32.intersection(cell).intersection(band32)
                if g.area < 0.02e6:   # sheet outside the band (contour data): keep the sheet part
                    g = fg32.intersection(cell)
            else:
                others = [j for j, d in enumerate(cs) if d['fg'] is None]
                vor = shapely.voronoi_polygons(MultiPoint([pts[j] for j in others]), extend_to=env) if len(others) > 1 else env
                cell = next((v for v in getattr(vor, 'geoms', [vor]) if v.contains(pts[i])), env) if len(others) > 1 else env
                # contrade without fogli only take land not claimed by fogli-defined contrade
                claimed = shapely.union_all([reproj(d['fg'], T32) for d in cs if d['fg'] is not None]) if any(d['fg'] is not None for d in cs) else None
                g = band32.intersection(cell)
                if claimed is not None:
                    g = g.difference(claimed)
                # keep cells compact: at most 3 km from the seed
                g = g.intersection(pts[i].buffer(3000))
            g = clean_projected(shapely.make_valid(g), min_hole_km2=0.02, min_part_km2=0.02)
            if g is None or g.is_empty:
                print('  empty', com, c['name'])
                continue
            # keep the part holding the seed (or the largest)
            parts = list(getattr(g, 'geoms', [g]))
            near = [p for p in parts if p.distance(pts[i]) < 400]
            g = shapely.union_all(near or [max(parts, key=lambda p: p.area)])
            g4 = polys_only(shapely.make_valid(reproj(g, T23)))
            nm = c['name']
            fid = unique_id(f'it-etna-{slug(nm)}', taken, alt_suffix=slug(cn))
            reg = {'doc': 'Etna', 'comuni': [cn], 'annex_no': c['num'],
                   'rule': 'DOC Etna disciplinare art. 7 and Allegato 1 (contrade as unità geografiche aggiuntive, since 2011)',
                   'method': ('Approximate: DOC contour band per comune (Copernicus DEM) shared among the contrade of the comune '
                              'by Voronoi cells of their locations' + (', inside the cadastral sheets named by the annex' if c['fg'] is not None else '')
                              + f'; location from {c["seed_src"]}.')}
            if c['fogli']:
                reg['fogli'] = c['fogli']
            if c['desc']:
                reg['limits'] = c['desc'][:300]
            feats.append({'id': fid, 'name': nm, 'alt': [f'Contrada {nm}', f'Etna {nm}'], 'country': 'it', 'cat': 'DOC',
                          'subcat': 'Contrada', 'src': SRC, 'bq': 'approx', 'area': round(g.area / 1e6, 2),
                          'parent': 'it-etna', 'reg': reg, '_g': g4})
    print('features:', len(feats))
    out = finish_feats(feats, 'it_etna', 12, tier_fn=tier_mult_fine)
    if '--plot' in sys.argv:
        import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(14, 14))
        for f in out:
            for p in getattr(f['_g'], 'geoms', [f['_g']]):
                ax.fill(*p.exterior.xy, alpha=0.45)
            ax.text(*f['lp'], f['name'], fontsize=5)
        for c in C:
            if c['seed'] is not None:
                ax.plot(c['seed'].x, c['seed'].y, 'k.', ms=2)
        ax.set_aspect(1.26)
        fig.savefig(DWORK + '/it_etna_contrade.png', dpi=100, bbox_inches='tight')
    if write:
        append_fine('it', out, replace_src=SRC)
        record_ids('etna', [dict(f, _file='it_fine.geojson') for f in out])


if __name__ == '__main__':
    main()
