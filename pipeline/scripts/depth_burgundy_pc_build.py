"""Merge the per-village part files in work/depth_burgundy_pc/part_*.json into
data/content/depth_burgundy_pc.json (SPEC content shape, appellations carry explicit fine-unit ids).

Part entry keys: id (fine unit id), s (summary), t (terroir), p (producers), n (nerd note),
optional: ha (published area to prefer), dom (dominant style), styles, grapes, created, alt (extra match names).
Placeholders in s/t/n: {z} elevation band from Copernicus GLO-30, {asp} mean downslope aspect, {ha} delimited area
measured on the INAO polygon, {slope} median slope in percent."""
import glob, json, re, sys
W = '/home/claude/winesite'
D = f'{W}/work/depth_burgundy_pc'
U = {u['id']: u for u in json.load(open(f'{D}/_units.json'))}
T = json.load(open(f'{D}/_terrain.json'))
N = json.load(open(f'{D}/_neighbours.json'))
INAO = json.load(open(f'{D}/_inao.json'))
for _uid, _u in U.items():
    if _uid in INAO:
        _u['ha_poly'] = _u['ha']
        _u['ha'] = INAO[_uid]['ha_inao']
        _u['communes'] = INAO[_uid]['communes']


def join(xs):
    return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' and ' + xs[-1]


def nb_sentence(uid):
    """'It lies below X, above Y and beside Z.' from polygon adjacency and DEM median elevations."""
    me = U[uid]
    below, above, beside, seen = [], [], [], {me['short']}
    for n in N.get(uid, []):
        if n['shared'] <= 0 or n['name'] in seen:
            continue
        seen.add(n['name'])
        if n['kind'] == 'GC':
            label = f"the grand cru {n['name']}"
        elif n['kind'] == 'GCc':
            label = n['name']
        elif n['app'] and n['app'] != me['app']:
            label = f"{n['app']}'s {n['name']}"
        else:
            label = n['name']
        label = label.replace(' - ', ' ')
        dz = n['dz']
        (below if dz is not None and dz >= 6 else above if dz is not None and dz <= -6 else beside).append(label)
        if len(below) + len(above) + len(beside) >= 4:
            break
    parts = []
    if below:
        parts.append('below ' + join(below))
    if above:
        parts.append('above ' + join(above))
    if beside:
        parts.append(('beside ' if parts else 'beside ') + join(beside))
    if not parts:
        return ''
    return 'On the map it lies ' + join(parts) + '.'

COTE = {
    'Fixin': 'Côte de Nuits', 'Gevrey-Chambertin': 'Côte de Nuits', 'Morey-Saint-Denis': 'Côte de Nuits',
    'Chambolle-Musigny': 'Côte de Nuits', 'Vougeot': 'Côte de Nuits', 'Vosne-Romanée': 'Côte de Nuits',
    'Nuits-Saint-Georges': 'Côte de Nuits',
    'Ladoix': 'Côte de Beaune', 'Aloxe-Corton': 'Côte de Beaune', 'Corton': 'Côte de Beaune',
    'Pernand-Vergelesses': 'Côte de Beaune', 'Savigny-lès-Beaune': 'Côte de Beaune', 'Beaune': 'Côte de Beaune',
    'Pommard': 'Côte de Beaune', 'Volnay': 'Côte de Beaune', 'Monthélie': 'Côte de Beaune',
    'Auxey-Duresses': 'Côte de Beaune', 'Meursault': 'Côte de Beaune', 'Blagny': 'Côte de Beaune',
    'Puligny-Montrachet': 'Côte de Beaune', 'Chassagne-Montrachet': 'Côte de Beaune', 'Saint-Aubin': 'Côte de Beaune',
    'Santenay': 'Côte de Beaune', 'Maranges': 'Côte de Beaune',
    'Rully': 'Côte Chalonnaise', 'Mercurey': 'Côte Chalonnaise', 'Givry': 'Côte Chalonnaise', 'Montagny': 'Côte Chalonnaise',
    'Pouilly-Fuissé': 'Mâconnais', 'Pouilly-Loché': 'Mâconnais', 'Pouilly-Vinzelles': 'Mâconnais',
    'Chablis': 'Chablis',
}
RED_ONLY_GRAPES = 'Pinot Noir'
GRAPES = {
    'Côte de Nuits': 'Pinot Noir; Chardonnay and Pinot Blanc for the rare whites',
    'Côte de Beaune': 'Pinot Noir for red; Chardonnay (Pinot Blanc permitted) for white',
    'Côte Chalonnaise': 'Pinot Noir for red; Chardonnay for white',
    'Mâconnais': 'Chardonnay', 'Chablis': 'Chardonnay',
}
ASP = dict(N='north', NNE='north-northeast', NE='northeast', ENE='east-northeast', E='east', ESE='east-southeast',
           SE='southeast', SSE='south-southeast', S='south', SSW='south-southwest', SW='southwest', WSW='west-southwest',
           W='west', WNW='west-northwest', NW='northwest', NNW='north-northwest')
BANNED = ['delve', 'robust', 'seamless', 'game-changer', 'unlock', 'leverage', 'comprehensive', 'cutting-edge',
          'transformative', 'innovative', "it's worth noting", 'nestled', 'boasts', 'tapestry', 'testament']


def r5(x):
    return int(5 * round(x / 5.0))


def fill(txt, uid):
    if not txt:
        return txt
    t = T.get(uid, {})
    u = U[uid]
    if t:
        a, b = r5(t['zmin']), r5(t['zmax'])
        z = f'about {r5(t["zmed"])} m' if b - a < 10 else f'{a} to {b} m'
        txt = txt.replace('{z}', z).replace('{asp}', ASP[t['aspect_txt']]).replace('{slope}', f"{t['slope_pct']:.0f}%")
    ha = u['ha']
    txt = txt.replace('{ha}', (f'{ha:.1f}' if ha >= 1 else f'{ha:.2f}') + ' ha')
    txt = re.sub(r'(^|[.!?]\s+|\n\n)([a-z])', lambda m: m.group(1) + m.group(2).upper(), txt)
    return txt


def short_label(u):
    nm = u['name']
    if ' premier cru ' in nm:
        app, cl = nm.split(' premier cru ', 1)
        return [f'{app} 1er Cru {cl}', f'{app} Premier Cru {cl}']
    return []


def main():
    entries, seen, problems = [], set(), []
    parts = sorted(glob.glob(f'{D}/part_*.json'))
    for pf in parts:
        try:
            data = json.load(open(pf))
        except Exception as e:
            sys.exit(f'{pf}: {e}')
        for e in data:
            uid = e['id']
            if uid not in U:
                problems.append(f'unknown id {uid} in {pf}')
                continue
            if uid in seen:
                problems.append(f'duplicate {uid} in {pf}')
                continue
            seen.add(uid)
            u = U[uid]
            app = u['app']
            cote = COTE[app]
            styles = e.get('styles') or u['styles']
            dom = e.get('dom') or ('white' if styles == ['white'] else 'red' if 'red' in styles and cote in ('Côte de Nuits',) else styles[0])
            rec = {
                'id': uid, 'country': 'fr', 'name': u['name'],
                'match': [u['name']] + short_label(u) + e.get('alt', []),
                'cat': 'AOC', 'subcat': u['subcat'],
                'region': 'Chablis and the Grand Auxerrois' if cote == 'Chablis' else cote,
                'subregion': app,
            }
            if e.get('created'):
                rec['created'] = e['created']
            rec['area_ha'] = e.get('ha', round(u['ha'], 2))
            rec['styles'] = styles
            rec['dominant_style'] = dom
            rec['grapes'] = e.get('grapes') or ('Chardonnay' if styles == ['white'] else 'Pinot Noir' if styles == ['red'] else GRAPES[cote])
            rec['summary'] = fill(e['s'], uid)
            if e.get('t'):
                rec['terroir'] = fill(e['t'], uid)
            words0 = sum(len(fill(e.get(k) or '', uid).split()) for k in ('s', 't', 'n'))
            if e.get('nb') or (words0 < 55 and not e.get('nonb')):
                sent = nb_sentence(uid)
                if sent:
                    rec['terroir'] = (rec.get('terroir', '') + ' ' + sent).strip()
            for k in ('summary', 'terroir', 'nerd_note'):
                if rec.get(k):
                    rec[k] = re.sub(r'(^|[.!?]\s+|\n\n)([a-z])', lambda m: m.group(1) + m.group(2).upper(), rec[k])
            if e.get('p'):
                rec['producers'] = e['p']
            if e.get('n'):
                rec['nerd_note'] = fill(e['n'], uid)
            if e.get('contains'):
                rec['contains'] = e['contains']
            for k in ('summary', 'terroir', 'nerd_note'):
                v = rec.get(k) or ''
                if '—' in v or '–' in v:
                    problems.append(f'dash in {uid}.{k}')
                if re.search(r'\{[a-z]+\}', v):
                    problems.append(f'placeholder left in {uid}.{k}')
                low = v.lower()
                for b in BANNED:
                    if b in low:
                        problems.append(f'banned "{b}" in {uid}.{k}')
            for pname in rec.get('producers', []):
                if '—' in pname:
                    problems.append(f'dash in producer {uid}')
            rec['_words'] = sum(len((rec.get(k) or '').split()) for k in ('summary', 'terroir', 'nerd_note'))
            entries.append(rec)
    missing = sorted(set(U) - seen)
    order = {uid: i for i, uid in enumerate(sorted(U, key=lambda x: (U[x]['app'], U[x]['short'])))}
    entries.sort(key=lambda r: order[r['id']])
    wc = [r.pop('_words') for r in entries]
    out = {'countries': [], 'regions': [], 'appellations': entries, 'sites': []}
    final = len(sys.argv) > 1 and sys.argv[1] == 'final'
    path = f'{W}/data/content/depth_burgundy_pc.json' if final else f'{D}/_merged_preview.json'
    json.dump(out, open(path, 'w'), ensure_ascii=False, indent=1)
    json.load(open(path))
    print(f'parts={len(parts)} entries={len(entries)} missing={len(missing)} words total={sum(wc)} '
          f'min={min(wc) if wc else 0} max={max(wc) if wc else 0} -> {path}')
    short = [(r['id'], w) for r, w in zip(entries, wc) if w < 40]
    if short:
        print('under 40 words:', short[:40])
    long_ = [(r['id'], w) for r, w in zip(entries, wc) if w > 260]
    if long_:
        print('over 260 words:', long_)
    if '--wc' in sys.argv:
        for r, w in zip(entries, wc):
            print(w, r['id'])
    for p in problems:
        print('PROBLEM', p)
    if missing and '--list-missing' in sys.argv:
        print('\n'.join(missing))


if __name__ == '__main__':
    main()
