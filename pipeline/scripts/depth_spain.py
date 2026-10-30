# Spain fine units -> site/data/geo/es_fine.geojson
#  Municipal boundaries: geoBoundaries ESP ADM3 (IGN Spain derived, CC BY 4.0), selected inside each DO's eupdo
#  commune polygon (Candiago et al. 2022) so homonyms resolve.
#  - Rioja (DOCa): the three zonas (Rioja Alta, Rioja Alavesa, Rioja Oriental) from the municipality lists of the
#    Reglamento de la DOCa Rioja (Orden APA/3465/2004, BOE 27.10.2004, art. 4; "Rioja Baja" renamed Rioja Oriental in
#    2018) and every municipality as a "Municipio" (vino de municipio, pliego de condiciones 2017+). bq commune.
#  - Priorat (DOQ): the 12 vi de vila villages. Eight are whole municipalities (bq commune); La Morera de Montsant /
#    Escaladei are split by the perpendicular bisector of the two villages, and Masos de Falset / Solanes del Molar
#    are the part of Falset / El Molar nearest the hamlet (bq approx; no open boundary of the DOQ part exists).
#  - Cava (DO): the four zonas of the 2020 zoning (Comtats de Barcelona, Valle del Ebro, Viñedos de Almendralejo,
#    Levante) as the Cava municipalities grouped by region (Catalonia; Aragón, Navarra, La Rioja, País Vasco;
#    Extremadura; Valencia). bq commune.
# Usage: python3 -I scripts/depth_spain.py
import sys, csv, collections
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
import geopandas as gpd, pandas as pd
from unidecode import unidecode
from shapely.geometry import Point, LineString

SRC = 'esmuni'
ADM3 = RAW + '/es_geoboundaries/geoBoundaries-ESP-ADM3.geojson'

RIOJA = {
    'Rioja Alta': """Ábalos, Alesanco, Alesón, Anguciana, Arenzana de Abajo, Arenzana de Arriba, Azofra, Badarán, Bañares,
Baños de Río Tobía, Baños de Rioja, Berceo, Bezares, Bobadilla, Briñas, Briones, Camprovín, Canillas de Río Tuerto, Cañas, Cárdenas,
Casalarreina, Castañares de Rioja, Cellorigo, Cenicero, Cidamón, Cihuri, Cirueña, Cordovín, Cuzcurrita de Río Tirón,
Daroca de Rioja, Entrena, Estollo, Foncea, Fonzaleche, Fuenmayor, Galbárruli, Gimileo, Haro, Hervías, Herramélluri,
Hormilla, Hormilleja, Hornos de Moncalvillo, Huércanos, Lardero, Leiva, Logroño, Manjarrés, Matute, Medrano, Nájera,
Navarrete, Ochánduri, Ollauri, Rodezno, Sajazarra, San Asensio, San Millán de Yécora, San Torcuato,
San Vicente de la Sonsierra, Santa Coloma, Sojuela, Sorzano, Sotés, Tirgo, Tormantos, Torrecilla sobre Alesanco,
Torremontalbo, Treviana, Tricio, Uruñuela, Ventosa, Villalba de Rioja, Villar de Torre, Villarejo, Zarratón""",
    'Rioja Oriental': """Agoncillo, Aguilar del Río Alhama, Albelda de Iregua, Alberite, Alcanadre, Aldeanueva de Ebro, Alfaro,
Arnedillo, Arnedo, Arrúbal, Ausejo, Autol, Bergasa, Bergasillas Bajera, Calahorra, Cervera del Río Alhama, Clavijo,
Corera, Cornago, El Redal, El Villar de Arnedo, Galilea, Grávalos, Herce, Igea, Lagunilla del Jubera, Leza de Río Leza,
Murillo de Río Leza, Muro de Aguas, Nalda, Ocón, Pradejón, Préjano, Quel, Ribafrecha, Rincón de Soto,
Santa Engracia del Jubera, Santa Eulalia Bajera, Tudelilla, Villamediana de Iregua, Villarroya, Andosilla, Aras,
Azagra, Bargota, Mendavia, San Adrián, Sartaguda, Viana""",
    'Rioja Alavesa': """Baños de Ebro, Kripan, Elciego, Elvillar, Labastida, Laguardia, Lanciego, Lapuebla de Labarca, Leza,
Moreda de Álava, Navaridas, Oyón, Samaniego, Villabuena de Álava, Yécora""",
}
RIOJA_NOTE = {'Santa Engracia del Jubera': 'Only the northern part of the municipality is in the DOCa (Reglamento 2004: "zona Norte"); polygon is the whole municipality.',
              'Oyón': 'Includes the former concejos Barriobusto and Labraza, listed separately in the Reglamento.',
              'Labastida': 'Includes Salinillas de Buradón, listed separately in the Reglamento.',
              'Ocón': 'Includes Molinos de Ocón, listed separately in the Reglamento (Ocón (La Villa) and Molinos de Ocón).'}
# Not drawn: the El Ternero enclave of Miranda de Ebro (Burgos), part of Rioja Alta, has no open boundary.

PRIORAT_WHOLE = ['Bellmunt del Priorat', 'Gratallops', 'El Lloar', 'Poboleda', 'Porrera', 'Torroja del Priorat',
                 'La Vilella Alta', 'La Vilella Baixa']
# village / hamlet points (OpenStreetMap via Nominatim, ODbL) for the split municipalities
PRI_PTS = {'La Morera de Montsant': (0.84199, 41.2650), 'Escaladei': (0.81112, 41.2481),
           'Falset': (0.81962, 41.1450), 'Masos de Falset': (0.80706, 41.1736),
           'El Molar': (0.70580, 41.1629)}

CAVA_ZONES = {'Comtats de Barcelona': ['08', '17', '25', '43'], 'Valle del Ebro': ['50', '31', '26', '01', '22'],
              'Viñedos de Almendralejo': ['06'], 'Levante': ['46']}


def norm(s):
    s = unidecode(s).lower()
    s = re.sub(r"\b(la|el|los|las|l|les|de|del|d)\b", ' ', s.replace("'", ' '))
    return re.sub(r'[^a-z]', '', s)


def keys(adm_name):
    parts = re.split(r'\s*/\s*|\s*-\s*', adm_name)
    ks = {norm(adm_name)} | {norm(p) for p in parts if p}
    m = re.match(r'^(.*), (L\'|La|El|Los|Las|Les)$', adm_name)
    if m:
        ks.add(norm(m.group(2) + ' ' + m.group(1)))
    return ks


def eupdo(pid):
    e = gpd.read_file(RAW + '/eupdo/EU_PDO.gpkg', where=f"PDOid='{pid}'")
    return shapely.make_valid(e.geometry.iloc[0])


def select(adm, poly, thr=0.5):
    cand = adm[adm.intersects(poly)].copy()
    cand['ov'] = cand.geometry.intersection(poly).area / cand.geometry.area
    return cand[cand.ov > thr]


def feat(fid, name, alt, cat, subcat, bq, parent, g3035, reg, styles=None, varieties=None):
    g4 = polys_only(shapely.make_valid(reproj(g3035, T_3035_4326)))
    return {'id': fid, 'name': name, 'alt': alt or None, 'country': 'es', 'cat': cat, 'subcat': subcat, 'src': SRC,
            'bq': bq, 'area': round(g3035.area / 1e6, 1), 'parent': parent, 'styles': styles, 'varieties': varieties,
            'reg': reg, '_g': g4}


def main():
    adm = gpd.read_file(ADM3).to_crs(3035)
    adm['geometry'] = adm.geometry.make_valid()
    taken = all_ids(SRC)
    feats = []
    # ---------------- Rioja
    rp = eupdo('PDO-ES-A0117')
    sel = select(adm, rp)
    kmap = {}
    for r in sel.itertuples():
        for k in keys(r.shapeName):
            kmap.setdefault(k, []).append(r)
    zone_of, used = {}, set()
    for z, txt in RIOJA.items():
        for n in [x.strip() for x in txt.replace('\n', ' ').split(',')]:
            rows = kmap.get(norm(n))
            if not rows:
                print('  Rioja: no municipality for', n)
                continue
            r = rows[0]
            zone_of[r.shapeID] = (z, n)
            used.add(r.shapeID)
    extra = [r.shapeName for r in sel.itertuples() if r.shapeID not in used]
    print('  Rioja selected', len(sel), 'assigned', len(used), 'unassigned:', extra)
    zgeom = collections.defaultdict(list)
    for r in sel.itertuples():
        if r.shapeID not in zone_of:
            continue
        z, n = zone_of[r.shapeID]
        zgeom[z].append(r.geometry)
    zid = {}
    for z, gs in zgeom.items():
        g = clean_projected(shapely.union_all(gs), 0.05, 0.05)
        zid[z] = unique_id(f'es-{slug(z)}', taken)
        feats.append(feat(zid[z], z, [z.replace('Rioja Oriental', 'Rioja Baja')] if z == 'Rioja Oriental' else None, 'DOCa',
                          'Zona', 'commune', 'es-rioja', g,
                          {'municipios': len(gs), 'rule': 'Reglamento DOCa Rioja (Orden APA/3465/2004) art. 4; zonas named on labels since 2018 (Rioja Baja renamed Rioja Oriental)'},
                          ['red', 'white', 'rose', 'sparkling']))
    for r in sel.itertuples():
        if r.shapeID not in zone_of:
            continue
        z, n = zone_of[r.shapeID]
        alt = [x for x in re.split(r'\s*/\s*', r.shapeName) if x != n] or None
        reg = {'zona': z, 'rule': 'Vino de municipio (pliego de condiciones DOCa Rioja, 2017+): 100% grapes from the municipality, wine made there'}
        if n in RIOJA_NOTE:
            reg['note'] = RIOJA_NOTE[n]
        feats.append(feat(unique_id(f'es-rioja-{slug(n)}', taken), n, alt, 'DOCa', 'Municipio', 'commune', zid[z],
                          r.geometry, reg, ['red', 'white', 'rose']))
    # ---------------- Priorat
    pp = eupdo('PDO-ES-A1560')
    psel = select(adm, pp)
    pk = {}
    for r in psel.itertuples():
        for k in keys(r.shapeName):
            pk[k] = r
    T = Transformer.from_crs(4326, 3035, always_xy=True)
    P = {k: Point(*T.transform(*v)) for k, v in PRI_PTS.items()}
    vil = []
    for n in PRIORAT_WHOLE:
        r = pk[norm(n)]
        vil.append((n, r.geometry, 'commune', None))

    def bisect_split(g, a, b):
        """part of g closer to a than to b"""
        mx, my = (a.x + b.x) / 2, (a.y + b.y) / 2
        dx, dy = b.x - a.x, b.y - a.y
        L = 1e5
        half = shapely.Polygon([(mx - dy * L, my + dx * L), (mx + dy * L, my - dx * L),
                                (mx + dy * L - dx * L, my - dx * L - dy * L), (mx - dy * L - dx * L, my + dx * L - dy * L)])
        return g.intersection(half)
    mor = pk[norm('La Morera de Montsant')].geometry
    vil.append(('La Morera de Montsant', bisect_split(mor, P['La Morera de Montsant'], P['Escaladei']), 'approx',
                'Municipality split between its two villages by the perpendicular bisector of La Morera and Escaladei (no open boundary of the vi de vila).'))
    vil.append(('Escaladei', bisect_split(mor, P['Escaladei'], P['La Morera de Montsant']), 'approx',
                'Part of La Morera de Montsant nearest the hamlet of Escaladei (Cartoixa d\'Escaladei); approximate.'))
    fal = pk[norm('Falset')].geometry
    vil.append(('Masos de Falset', bisect_split(fal, P['Masos de Falset'], P['Falset']), 'approx',
                'The DOQ covers only the Masos de Falset part of Falset (the rest is DO Montsant); drawn as the part of the municipality nearer the Masos than the town. Approximate.'))
    # Solanes del Molar: no open boundary and no gazetteer point for the hamlet; not drawn (a whole-municipality
    # polygon of El Molar would overstate it badly).
    for n, g, bq, note in vil:
        g = clean_projected(polys_only(shapely.make_valid(g)), 0.05, 0.05)
        reg = {'rule': 'Vi de vila (DOQ Priorat, 2009 regulation): wine from a single village area'}
        if note:
            reg['note'] = note
        feats.append(feat(unique_id(f'es-priorat-{slug(n)}', taken), n, [f'Priorat {n}', f'Vi de Vila {n}'], 'DOQ', 'Vi de vila', bq,
                          'es-priorat', g, reg, ['red', 'white']))
    # ---------------- Cava zones (by region of the Cava municipalities)
    cp = eupdo('PDO-ES-A0735')
    lau = gpd.read_file(RAW + '/gisco_lau/LAU_RG_01M_2021_3035.gpkg', where="CNTR_CODE = 'ES'")
    lau['prov'] = lau.LAU_ID.str[:2]
    for z, provs in CAVA_ZONES.items():
        pv = shapely.union_all(list(lau[lau.prov.isin(provs)].geometry.buffer(200)))
        g = cp.intersection(pv)
        g = clean_projected(polys_only(shapely.make_valid(g)), 0.05, 0.05)
        if g is None or g.is_empty:
            print('  Cava zone empty', z)
            continue
        feats.append(feat(unique_id(f'es-cava-{slug(z)}', taken), z, [f'Cava {z}'], 'DO', 'Zona', 'commune', 'es-cava', g,
                          {'rule': 'Cava zoning approved 2020 (pliego de condiciones DOP Cava): zonas and subzonas by municipality',
                           'provinces': provs}, ['sparkling']))
    for f in feats:
        print('  ', f['id'], f['name'], f['area'], f['bq'])
    out = finish_feats(feats, 'esfine', 25)
    append_fine('es', out, replace_src=SRC)


if __name__ == '__main__':
    main()
