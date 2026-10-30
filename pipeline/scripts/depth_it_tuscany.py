# Tuscany official wine-zone lines (Regione Toscana "Zone di produzione vini", geoscopio rt107, 2026-05, CC BY 4.0).
#  A. The 8 Chianti DOCG subzones (sottozone of layer sz_vin_2026_05, incl. Terre di Vinci, DM 13.04.2026)
#     -> site/data/geo/it.geojson (cat DOCG, subcat Subzone, parent it-chianti, bq official), EXACT ids below.
#  B. Every Tuscan DOC/DOCG of it.geojson: the EU commune-union geometry is replaced by the official zone line
#     (layer zo_vin_nom_zon_2026_05). Ids and other properties are kept; src/bq/area/lp/bbox/parent updated.
#     Colli di Luni (Liguria + Toscana): Ligurian part from the EU file + Tuscan part from the region (bq commune).
#     The old geometries stay in work/fine_backup/it.geojson.
#  C. Valdarno di Sopra DOC sottozone Pratomagno and Pietraviva -> it_fine.geojson.
# Usage: python3 -I scripts/depth_it_tuscany.py [--plot]
import sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_it_common import *
import geopandas as gpd
from shapely.geometry import shape

SRC = 'rtvini'
T_3003_4326 = Transformer.from_crs(3003, 4326, always_xy=True)
T_4326_3003 = Transformer.from_crs(4326, 3003, always_xy=True)
RTV = RAW + '/rt_zone_vini/x'

SUBZ = {  # RT NOM_SZO -> (id, name, alt, reg)
    'CHIANTI RUFINA': ('it-chianti-rufina', 'Chianti Rùfina', ['Chianti Rufina', 'Rùfina', 'Rufina'],
                       {'delim': 'DM 31.07.1932 (G.U. 209, 09.09.1932)', 'max_t_ha': 9.5, 'max_hl_ha': 66.5,
                        'min_alc_nat': 11.5, 'release': '1 September after the harvest',
                        'riserva': '2 years, at least 6 months in wood', 'min_vines_ha_new': 4500}),
    'CHIANTI COLLI FIORENTINI': ('it-chianti-colli-fiorentini', 'Chianti Colli Fiorentini', ['Colli Fiorentini'],
                                 {'delim': 'DM 31.07.1932 (G.U. 209, 09.09.1932)', 'max_t_ha': 9, 'max_hl_ha': 63,
                                  'min_alc_nat': 11.0, 'release': '1 September after the harvest',
                                  'riserva': '2 years, at least 6 months in wood'}),
    'CHIANTI COLLI SENESI': ('it-chianti-colli-senesi', 'Chianti Colli Senesi', ['Colli Senesi'],
                             {'delim': 'DM 31.07.1932 (G.U. 209, 09.09.1932)', 'max_t_ha': 9, 'max_hl_ha': 63,
                              'min_alc_nat': 11.5, 'release': '1 March after the harvest',
                              'riserva': '2 years, at least 8 months in wood and 4 in bottle',
                              'sangiovese_min_pct': 75, 'cabernet_max_pct': 10}),
    'CHIANTI COLLI ARETINI': ('it-chianti-colli-aretini', 'Chianti Colli Aretini', ['Colli Aretini'],
                              {'delim': 'DM 31.07.1932 (G.U. 209, 09.09.1932)', 'max_t_ha': 9.5, 'max_hl_ha': 66.5,
                               'min_alc_nat': 11.0, 'release': '1 March after the harvest'}),
    'CHIANTI COLLINE PISANE': ('it-chianti-colline-pisane', 'Chianti Colline Pisane', ['Colline Pisane'],
                               {'delim': 'DM 31.07.1932 (G.U. 209, 09.09.1932)', 'max_t_ha': 9.5, 'max_hl_ha': 66.5,
                                'min_alc_nat': 11.0, 'release': '1 March after the harvest'}),
    'CHIANTI MONTALBANO': ('it-chianti-montalbano', 'Chianti Montalbano', ['Montalbano'],
                           {'delim': 'DM 31.07.1932 (G.U. 209, 09.09.1932)', 'max_t_ha': 9.5, 'max_hl_ha': 66.5,
                            'min_alc_nat': 11.0, 'release': '1 March after the harvest'}),
    'CHIANTI MONTESPERTOLI': ('it-chianti-montespertoli', 'Chianti Montespertoli', ['Montespertoli'],
                              {'delim': 'DM 08.09.1997', 'max_t_ha': 9.5, 'max_hl_ha': 66.5,
                               'min_alc_nat': 11.0, 'release': '1 June after the harvest'}),
    'TERRE DI VINCI': ('it-chianti-terre-di-vinci', 'Chianti Terre di Vinci', ['Terre di Vinci'],
                       {'delim': 'DM 13.04.2026 (Chianti disciplinare revision)',
                        'note': 'Newest Chianti subzone, around Leonardo\'s birthplace: Vinci, Cerreto Guidi, Fucecchio and Capraia e Limite. Region line drawn from the consortium perimeter.'}),
}
RULES = ('Chianti DOCG disciplinare art. 3-7 (consolidated text before the 2026 revision, AIS copy); the 2026 '
         'revision (DM 13.04.2026) adds Terre di Vinci, a rosato and lowers the Chianti Sangiovese minimum to 60%')


def rt_layer(name):
    g = gpd.read_file(f'{RTV}/{name}.shp')
    return g.set_crs(3003, allow_override=True)


def to4326(g):
    return polys_only(shapely.make_valid(reproj(g, T_3003_4326)))


def comuni_list(g, com):
    out = comuni_overlap(g, com, 'NOME', min_km2=0.3)
    return [title_it(n) + ('' if w == 'whole' else ' (part)') for n, w in out]


def main():
    plot = '--plot' in sys.argv
    zv = rt_layer('zo_vin_nom_zon_2026_05')
    sz = rt_layer('sz_vin_2026_05')
    com = gpd.read_file(RAW + '/rt_ambiti/y/shapefile/am_com_multipart.shp').set_crs(3003, allow_override=True)
    com['geometry'] = com.geometry.make_valid()
    reg_ = gpd.read_file(RAW + '/rt_ambiti/y/shapefile/am_reg_multipart.shp').set_crs(3003, allow_override=True)
    toscana = shapely.make_valid(shapely.union_all(list(reg_.geometry)))
    Z = {}
    for r in zv.itertuples():
        Z.setdefault(r.NOM_ZON, []).append(r)
    ZG = {k: shapely.make_valid(shapely.union_all([shapely.make_valid(x.geometry) for x in v])) for k, v in Z.items()}
    fc = json.load(open(GEO + '/it.geojson'))
    main_by_id = {f['properties']['id']: f for f in fc['features']}

    # ---------- A. Chianti subzones
    sub_feats = []
    for r in sz.itertuples():
        if r.NOM_ZON != 'CHIANTI':
            continue
        fid, name, alt, reg = SUBZ[r.NOM_SZO]
        g = clean_projected(shapely.make_valid(r.geometry), min_hole_km2=0.05, min_part_km2=0.05)
        reg = dict(reg)
        reg['comuni'] = comuni_list(g, com)
        reg['rule'] = RULES
        reg['rt_layer'] = f'sz_vin_2026_05 {r.NOM_SZO} ({r.DIS_VIG.split(",")[0]})'
        sub_feats.append({'id': fid, 'name': name, 'alt': alt, 'country': 'it', 'cat': 'DOCG', 'subcat': 'Subzone',
                          'src': SRC, 'bq': 'official', 'area': round(g.area / 1e6, 1), 'parent': 'it-chianti',
                          'varieties': ['Sangiovese'], 'styles': ['red'], 'reg': reg, '_g': to4326(g),
                          '_file': 'it.geojson', '_action': 'polygon added (was a point)'})
        print(f'  {fid}: {g.area/1e6:.1f} km2, {len(reg["comuni"])} comuni')
    assert len(sub_feats) == 8, len(sub_feats)

    # ---------- B. Tuscan zone replacements
    def k(s):
        return re.sub(r'[^a-z]', '', unidecode(s).lower())
    zkey = {k(n): n for n in ZG}
    zkey[k('Val di Cornia Rosso')] = 'ROSSO DELLA VALDICORNIA'
    zkey[k("Val d'Arno di Sopra")] = 'VALDARNO DI SOPRA'
    repl = {}
    for fid, f in main_by_id.items():
        p = f['properties']
        if p.get('subcat'):
            continue
        cands = [k(p['name'])] + [k(a) for a in p.get('alt', [])]
        zn = next((zkey[c] for c in cands if c in zkey), None)
        if zn is None:
            continue
        g = ZG[zn]
        old = shape(f['geometry'])
        bq = 'official'
        note = f'Regione Toscana official zone line (rt107 {zn.title()}, 1:10,000); replaces the EU commune union ({p["area"]} km2).'
        if fid == 'it-colli-di-luni':
            # Liguria part stays the EU commune union, Toscana part becomes the official line
            old3 = shapely.make_valid(reproj(old, T_4326_3003))
            lig = old3.difference(toscana.buffer(30))
            g = shapely.union_all([lig, g])
            bq = 'commune'
            note = ('Tuscan part: Regione Toscana official zone line (1:10,000); Ligurian part: EU commune union '
                    '(La Spezia province comuni).')
        g = clean_projected(shapely.make_valid(g), min_hole_km2=0.05, min_part_km2=0.02)
        reg = dict(p.get('reg') or {})
        reg['geom_note'] = note
        repl[fid] = {'id': fid, 'name': p['name'], 'area': round(g.area / 1e6, 1), 'bq': bq, 'src': SRC,
                     'reg': reg, '_g': to4326(g), '_old_area': p['area'], '_zone': zn}
    print('  Tuscan zones to replace:', len(repl))

    # ---------- simplify (subzones + replacements together, 35 m base, tiered by size)
    allf = sub_feats + list(repl.values())
    done = {f['id']: f for f in finish_feats(allf, 'it_tosc', 35, tier_fn=tier_mult)}

    # ---------- parents for replaced zones: smallest main feature containing >= 85% (new geometries)
    pool = []
    for fid, f in main_by_id.items():
        g = done[fid]['_g'] if fid in done else shape(f['geometry'])
        pool.append({'id': fid, '_g': g, 'area': done[fid]['area'] if fid in done else f['properties']['area']})
    pars = dict(zip([x['id'] for x in pool], compute_parents(pool)))
    pchanges = []
    for fid in repl:
        oldp = main_by_id[fid]['properties'].get('parent')
        if pars[fid] != oldp:
            pchanges.append((fid, oldp, pars[fid]))
    # children of replaced zones outside the replaced set whose parent is no longer containing
    for fid, f in main_by_id.items():
        par = f['properties'].get('parent')
        if fid not in repl and par in repl and pars[fid] != par:
            pchanges.append((fid, par, pars[fid]))
    for c in pchanges:
        print('  parent change', c)
    pch = {c[0]: c[2] for c in pchanges}

    replace = {}
    for fid, f in repl.items():
        d = done[fid]
        upd = {'src': SRC, 'bq': f['bq'], 'area': f['area'], 'lp': d['lp'], 'bbox': d['bbox'], 'reg': f['reg']}
        if fid in pch:
            upd['parent'] = pch[fid]
        replace[fid] = (upd, d['_g'])
    for fid, newp in pch.items():
        if fid not in repl:
            f = main_by_id[fid]
            replace[fid] = ({'parent': newp}, shape(f['geometry']))
    subs = [done[f['id']] for f in sub_feats]
    write_main('it', replace=replace, add=subs)

    # ---------- C. Valdarno di Sopra sottozone -> it_fine
    vds = []
    for r in sz.itertuples():
        if r.NOM_ZON != 'VALDARNO DI SOPRA':
            continue
        nm = r.NOM_SZO.title()
        g = clean_projected(shapely.make_valid(r.geometry), min_hole_km2=0.05, min_part_km2=0.05)
        vds.append({'id': f'it-val-d-arno-di-sopra-{slug(nm)}', 'name': nm,
                    'alt': [f'Valdarno di Sopra {nm}', f"Val d'Arno di Sopra {nm}"], 'country': 'it', 'cat': 'DOC',
                    'subcat': 'Sottozona', 'src': SRC, 'bq': 'official', 'area': round(g.area / 1e6, 1),
                    'parent': 'it-val-d-arno-di-sopra',
                    'reg': {'doc': 'Valdarno di Sopra', 'comuni': comuni_list(g, com),
                            'delim': 'DOC Valdarno di Sopra disciplinare (DM 2011; zone revised DM 26.06.2024)',
                            'note': 'Region line drawn from the consortium perimeter (Regione Toscana metadata).'},
                    '_g': to4326(g)})
    vds = finish_feats(vds, 'it_vds', 15, tier_fn=tier_mult_fine)
    append_fine('it', vds, replace_src=None) if not any(
        f['properties']['id'] == vds[0]['id'] for f in json.load(open(GEO + '/it_fine.geojson'))['features']) else \
        _replace_fine_ids(vds)

    # ---------- id records
    rows = [dict(f, _file='it.geojson') for f in subs]
    for fid in replace:
        p = main_by_id[fid]['properties']
        rows.append({'id': fid, 'name': p['name'], 'parent': pch.get(fid, p.get('parent')), 'subcat': p.get('subcat'),
                     'cat': p['cat'], '_file': 'it.geojson',
                     '_action': 'geometry replaced (official line)' if fid in repl else 'parent changed'})
    rows += [dict(f, _file='it_fine.geojson') for f in vds]
    record_ids('tuscany', rows)
    # areas table for the log
    with open(DWORK + '/it_tuscany_areas.tsv', 'w') as fh:
        for fid, f in sorted(repl.items(), key=lambda x: -x[1]['_old_area']):
            fh.write(f'{fid}\t{f["_zone"]}\t{f["_old_area"]}\t{f["area"]}\t{f["bq"]}\n')
    if plot:
        import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(10, 12))
        for f in subs + vds:
            for p in getattr(f['_g'], 'geoms', [f['_g']]):
                ax.fill(*p.exterior.xy, alpha=0.45)
            ax.text(*f['lp'], f['name'], fontsize=7)
        cc = done['it-chianti-classico']['_g']
        for p in getattr(cc, 'geoms', [cc]):
            ax.plot(*p.exterior.xy, 'k-', lw=0.8)
        ax.set_aspect(1.37)
        fig.savefig(DWORK + '/it_chianti_subzones.png', dpi=100)


def _replace_fine_ids(new):
    """re-run: replace the features with the same ids in it_fine (src rtvini is shared with the CC UGAs)."""
    path = GEO + '/it_fine.geojson'
    old = json.load(open(path))['features']
    ids = {f['id'] for f in new}
    keep = [f for f in old if f['properties']['id'] not in ids]
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as fh:
        fh.write('{"type":"FeatureCollection","features":[\n')
        fh.write(',\n'.join([json.dumps(x, ensure_ascii=False, separators=(',', ':')) for x in keep] +
                            [json.dumps(feature_json(x), ensure_ascii=False, separators=(',', ':')) for x in new]))
        fh.write('\n]}\n')
    os.replace(tmp, path)
    print(f'  {path}: {len(keep)} kept + {len(new)} replaced')


if __name__ == '__main__':
    main()
