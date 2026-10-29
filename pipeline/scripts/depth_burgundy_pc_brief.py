import json, sys
W = '/home/claude/winesite'
U = json.load(open(f'{W}/work/depth_burgundy_pc/_units.json'))
T = json.load(open(f'{W}/work/depth_burgundy_pc/_terrain.json'))
N = json.load(open(f'{W}/work/depth_burgundy_pc/_neighbours.json'))
apps = sys.argv[1:]
for u in sorted(U, key=lambda u: u['short']):
    if u['app'] not in apps: continue
    t = T.get(u['id'], {})
    nb = '; '.join(f"{n['name']}{'['+n['kind']+']' if n['kind']!='PC' else ''}{'('+n['app'][:6]+')' if n['app'] and n['app']!=u['app'] else ''} {n['dir']} {('%+d' % n['dz']) if n['dz'] is not None else ''}" for n in N.get(u['id'], []))
    print(f"{u['short']} | {u['id'].replace('fr-','')} | par={u['parent'].replace('fr-','')} | {u['ha']}ha | {','.join(u['styles'])} | {t.get('zmin')}-{t.get('zmax')}m med{t.get('zmed')} {t.get('aspect_txt')} sl{t.get('slope_pct')}% | {nb}")
