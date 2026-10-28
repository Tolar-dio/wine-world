# Germany fine units -> site/data/geo/de_fine.geojson
#  Einzellagen of Rheinland-Pfalz (Ahr, Mittelrhein (RLP part), Mosel, Nahe, Pfalz, Rheinhessen) from the
#  Weinbergsrolle of the Landwirtschaftskammer Rheinland-Pfalz (LGB-RLP "BFD5W: Weinlagen", dl-de/by-2.0),
#  vectorised from 10 m colour-coded WMS renders (europe_de_lagen_harvest.py). cat "Einzellage", bq "official"
#  (official boundary, resampled at 10 m). parent = the Anbaugebiet id in de.geojson.
# Usage: python3 -I scripts/europe_de_fine.py
import sys, glob, json, re
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import rasterio.features
from rasterio.transform import from_origin
from scipy import ndimage

TILES = RAW + '/de_rlp_lagen/tiles'
T_25832_3035 = Transformer.from_crs(25832, 3035, always_xy=True)
T_25832_4326 = Transformer.from_crs(25832, 4326, always_xy=True)
AG_ID = {'Mosel': 'de-mosel', 'Rheinhessen': 'de-rheinhessen', 'Pfalz': 'de-pfalz', 'Nahe': 'de-nahe',
         'Mittelrhein': 'de-mittelrhein', 'Ahr': 'de-ahr'}


ADJ_FIX = {'St.Aldegund': 'St. Aldegunder', 'Bad Kreuznach': 'Kreuznacher', 'Bad Dürkheim': 'Dürkheimer',
           'Bad Münster a. Stein': 'Münsterer', 'Bad Neuenahr': 'Neuenahrer', 'Forst an der Weinstr.': 'Forster',
           'Ürzig': 'Ürziger', 'ürzig': 'Ürziger', 'Bingen': 'Binger', 'Linz a. Rhein': 'Linzer'}


def adj(v):
    """German place adjective as used on labels: Wehlen -> Wehlener, Graach -> Graacher, Piesport -> Piesporter."""
    if v in ADJ_FIX:
        return ADJ_FIX[v]
    v = v[:1].upper() + v[1:]
    base = re.split(r' (?:a\.|am|an der|bei|i\.|im|ob der|in der) ', v)[0]
    if base.endswith('e'):
        return base + 'r'
    return base + 'er'


def main():
    attrs = json.load(open(RAW + '/de_rlp_lagen/lagen_attributes.json'))
    A = {f['properties']['Weinlage - Nr']: f['properties'] for f in attrs['features']}
    pieces = {}
    for f in sorted(glob.glob(TILES + '/wl_*.npz')):
        d = np.load(f)
        if not len(d['ids']):
            continue
        lab = d['lab'].astype(np.int32)
        x0, y0, x1, y1 = d['bbox']
        res = (x1 - x0) / lab.shape[1]
        tr = from_origin(x0, y1, res, res)
        # drop single-pixel antialias noise: majority filter on labelled pixels
        for geo, v in rasterio.features.shapes(lab, mask=lab >= 0, transform=tr, connectivity=4):
            pieces.setdefault(str(d['ids'][int(v)]), []).append(shapely.geometry.shape(geo))
    print('lagen with geometry', len(pieces), flush=True)
    feats, taken = [], set()
    for nr, polys in pieces.items():
        p = A.get(nr)
        if p is None:
            continue
        g = shapely.union_all(polys)
        g = shapely.make_valid(shapely.simplify(g, 0.5))
        # tidy: remove raster specks (< 3 px) and pinholes, then smooth staircase with a small simplify
        g = clean_projected(g, min_hole_km2=0.0005, min_part_km2=0.0003)
        if g is None or g.is_empty:
            continue
        g = polys_only(shapely.make_valid(shapely.simplify(g, 6.0)))
        g4326 = reproj(g, T_25832_4326)
        name = p['Weinlage - Name'].strip()
        gem = p.get('Gemeinde(n)', '').strip()
        gmk = [x.strip() for x in str(p.get('Gemarkung(en)', '')).split(',') if x.strip() and x.strip() != '-']
        try:
            rf = float(str(p.get('Refläche', '')).replace(',', '.'))
        except ValueError:
            rf = None
        reg = {'lage_nr': nr, 'grosslage': p.get('Großlage'), 'bereich': p.get('Bereich'), 'gemeinden': gem,
               'gemarkungen': p.get('Gemarkung(en)')}
        if rf:
            reg['vine_ha'] = rf
        reg = {k: v for k, v in reg.items() if v not in (None, '', '-')}
        sub = 'Einzellage'
        if name.lower().startswith('einzellagenfrei') or name.lower().startswith('lagenfrei'):
            sub = 'Lagenfrei'
        # label form: "<Gemarkung>er <Lage>" (Wehlener Sonnenuhr, Forster Jesuitengarten); name = label form when
        # the Lage lies in a single Gemarkung, else the bare Lage name with each village form in alt.
        alts = [adj(v) + ' ' + name for v in gmk]
        if len(gmk) == 1:
            disp, alt = alts[0], [name]
        else:
            disp, alt = name, alts
        fid = make_ids([f'{gmk[0] if gmk else gem} {name}'], 'de', taken)[0]
        feats.append({'id': fid, 'name': disp, 'alt': alt or None,
                      'country': 'de', 'cat': 'Einzellage', 'subcat': sub, 'src': 'lwkrlp', 'bq': 'official',
                      'area': round(g.area / 1e6, 2), 'reg': reg, '_g': g4326, '_ag': p.get('Anbaugebiet')})
    feats = [f for f in feats if f['subcat'] == 'Einzellage']
    print('features', len(feats), flush=True)
    for f in feats:
        f['_area_for_tier'] = max(f['area'], 0.6)
    out, iv, size = finalize(feats, 'de_fine', GEO + '/de_fine.geojson', 4_000_000, 5_000_000, [10, 12, 15, 20, 25, 30],
                             log=print, tier_fn=tier_mult_fine, min_interval_for_cap=10)
    # parent = Anbaugebiet in de.geojson (Einzellagen never nest in each other)
    for f in out:
        f['parent'] = AG_ID.get(f['_ag'])
    size = write_fc(GEO + '/de_fine.geojson', out)
    print('wrote de_fine', len(out), size)


if __name__ == '__main__':
    main()
