# T05: locate the 26 Etna DOC contrade (disciplinare Allegato 1, consolidated text 28.02.2023) that had no location.
# Sources: IGM 1:25,000 toponyms ("Toponimi Tavolette 25000") and CTR 2013 1:10,000 toponyms (DBTRS), Regione Siciliana
# SITR ArcGIS REST services (map.sitr.regione.sicilia.it/gis/rest/services); OpenStreetMap places for inferred ones.
# Output: work/italy-bounds/t05_etna_points.json and the misplacement check of the mapped contrade.
import json, math, re, sys, unicodedata
sys.path.insert(0, '/home/claude/winesite/scripts')
import depth_it_etna as E

T = json.load(open('/home/claude/winesite/work/italy-bounds/etna_toponyms.json'))


def norm(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    s = re.sub(r'^(contr\.?a|contrada|c\.da)\s+', '', s.strip())
    return re.sub(r'[^a-z]', '', s)


def dist(a, b):
    k = math.cos(math.radians(a[1]))
    return math.hypot((a[0] - b[0]) * k, a[1] - b[1]) * 111.2


def topo(name, comune):
    """IGM 'Contr.a X' / area entries of the right comune first, then CTR area labels near them."""
    n = norm(name)
    igm = [t for t in T if t[0] == 'IGM' and norm(t[1]) == n and t[2] and norm(t[2])[:8] == norm(comune)[:8]]
    igm_any = [t for t in T if t[0] == 'IGM' and norm(t[1]) == n and 'Area' in (t[3] or '')]
    ctr = [t for t in T if t[0] == 'CTR' and norm(t[1]) == n and 'Valle' in (t[3] or '')]
    return igm, igm_any, ctr


# Inferred positions for contrade with no toponym: from the roads and neighbours the annex names.
INFER = {
    ('LINGUAGLOSSA', 'Martinella'): ((15.1310, 37.8310), 'west of SP 59/IV between Via S. Giuseppe and the Piano Arrigo road, between the mapped Arrigo and the IGM Vaccarile toponym'),
    ('LINGUAGLOSSA', 'Alboretto - Chiuse del Signore'): None,   # IGM Alboretto
    ('LINGUAGLOSSA', 'Panella - Petto Dragone'): None,          # IGM Panella
    ('MILO', 'Villagrande'): ((15.1250, 37.7130), 'between the Petrulli - Miscarello road (south-east), the Zafferana - Milo road (west) and the stream below the first houses of Milo (north)'),
    ('MILO', 'Volpare'): ((15.1180, 37.7255), 'inside Milo, between Via Etnea, Via Mazzini, the Cacocciola stream, Via Salice and Via Madonna delle Grazie'),
    ('RANDAZZO', 'Scimonetta'): ((14.9850, 37.8520), 'below SP 230 between the Marzarola road and the Sciambratta road and 1981 lava flow, above the 800 m DOC limit'),
    ('RANDAZZO', 'Pignatone'): ((14.9980, 37.8840), 'between SP 89 (north), the Taccione road (south and east) and the Statella farm road (west); between the IGM Statella and Taccione toponyms'),
    ('RANDAZZO', 'Croce Monaci'): ((15.0180, 37.8680), 'south of SS 120 against the Castiglione di Sicilia boundary, along the Collabasso - Croce Monaci road (east of IGM Calderara)'),
    ('VIAGRANDE', 'Cannarozzo'): ((15.0960, 37.6320), 'north of the Blandano stream, between Via Garibaldi and the Lavinaio stream, below the Monte Rosso junction; north of the IGM Monaci toponym'),
}
OVERRIDE_TOPO = {('LINGUAGLOSSA', 'Alboretto - Chiuse del Signore'): 'Alboretto', ('LINGUAGLOSSA', 'Panella - Petto Dragone'): 'Panella',
                 ('RANDAZZO', 'Sciara Nuova'): 'Sciara Nuova', ('RANDAZZO', 'San Lorenzo'): 'S. Lorenzo'}

MISSING = ['Martinella', 'Vaccarile', 'Valle Galfina', 'Alboretto - Chiuse del Signore', 'Panella - Petto Dragone',
           'Villagrande', 'Volpare', 'Ciarambella', 'San Lorenzo', 'Scimonetta', "Bocca d'Orzo", 'Arena', 'Pignatuni',
           'Chiusa Politi', 'Pianodario', 'Pignatone', 'Pino', 'Sciara Nuova', 'Croce Monaci', 'Cannarozzo', 'Monaci',
           'Maiorca', 'Torretta', 'Rapilli', 'Spadatrappo', 'Pisanello']

COMUNE_NICE = {k: v[0] for k, v in E.COMUNI.items()}


def main():
    L = E.parse()
    out = []
    for c in L:
        if c['name'] not in MISSING:
            continue
        com = COMUNE_NICE[c['comune']]
        key = (c['comune'], c['name'])
        tname = OVERRIDE_TOPO.get(key, c['name'])
        if key == ('VIAGRANDE', 'Monaci'):
            igm = [t for t in T if t[0] == 'IGM' and t[1] == 'MONACI' and t[2] == 'Viagrande']; ia = []; ctr = []
        else:
            igm, ia, ctr = topo(tname, com)
        if key == ('RANDAZZO', 'Sciara Nuova'):
            igm = [t for t in T if t[0] == 'IGM' and t[1] == 'Contr.a Sciara Nuova']
        rec = {'comune': com, 'annex_no': c['num'], 'name': c['name'], 'desc': c['desc']}
        if igm:
            t = igm[0]
            near = [x for x in ctr if dist((x[4], x[5]), (t[4], t[5])) < 1.5]
            rec.update(lon=round(t[4], 5), lat=round(t[5], 5), confidence='medium', src='sitrtopo',
                       how=f"IGM 1:25,000 toponym '{t[1]}' ({t[2]})" + (f"; CTR 2013 label '{near[0][1]}' {dist((near[0][4], near[0][5]), (t[4], t[5])):.2f} km away" if near else ''))
        elif INFER.get(key):
            (lon, lat), why = INFER[key]
            rec.update(lon=lon, lat=lat, confidence='low', src='sitrtopo', how='inferred: ' + why)
        else:
            rec.update(lon=None, lat=None, confidence=None, how='not found')
        out.append(rec)
        print(c['comune'], c['num'], c['name'], rec.get('lon'), rec.get('lat'), rec.get('confidence'), '|', rec['how'][:90])
    json.dump(out, open('/home/claude/winesite/work/italy-bounds/t05_etna_points.json', 'w'), ensure_ascii=False, indent=1)
    # misplacement check of mapped contrade
    idx = json.load(open('/home/claude/winesite/site/data/geo/_index.json'))
    fine = {f['properties']['id']: f for f in json.load(open('/home/claude/winesite/site/data/geo/it_fine.geojson'))['features']}
    rows = []
    for e in idx:
        if e.get('parent') != 'it-etna' or e['id'] not in fine:
            continue
        com = e.get('ctx') or ''
        igm, ia, ctr = topo(e['name'], com)
        if not igm:
            continue
        t = igm[0]
        d = dist(tuple(e['lp']), (t[4], t[5]))
        from shapely.geometry import shape, Point
        inside = shape(fine[e['id']]['geometry']).contains(Point(t[4], t[5]))
        rows.append((round(d, 2), e['id'], e['name'], com, e['lp'], [round(t[4], 4), round(t[5], 4)], inside))
    rows.sort(reverse=True)
    far = [r for r in rows if r[0] > 1.0]
    print('\nchecked', len(rows), 'mapped contrade with an IGM toponym;', len(far), 'with label point > 1 km from it')
    for r in far:
        print('  ', r)
    json.dump({'checked': len(rows), 'far': far}, open('/home/claude/winesite/work/italy-bounds/t05_misplaced.json', 'w'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
