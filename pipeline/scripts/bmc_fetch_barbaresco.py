# Barolo MGA cadastre job: fetch every Agenzia delle Entrate INSPIRE parcel (CC BY 4.0) of the fogli named in the
# Barbaresco MGA annex (Barbaresco, Neive, Treiso; Alba fogli 69 and 70). Same WFS client and cache as T04.
# Usage: python3 -I scripts/bmc_fetch_barbaresco.py  -> work/barolo-mga/bb_parcels.json
#   {"codes": {comune: code}, "fogli": {"Neive 10": {"ref", "geom"}}, "parcels": {"Neive 10": {label: geom}}}
import json, sys, time
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_cadastre as K
import shapely
from bmc_fetch import comune_codes

W = '/home/claude/winesite/work/barolo-mga'


def main():
    T = json.load(open(f'{W}/mga_barbaresco_text.json'))
    need = sorted({(c, f) for v in T.values() for c, f in v['fogli']})
    # Rabaja' etc. only cite fogli of their own comune; add neighbours' fogli of the same comuni (whole comuni)
    coms = sorted({c for c, _ in need})
    t = time.time()
    Z, codes = comune_codes(coms)
    print('codes', codes, 'fogli', len(Z), round(time.time() - t), 's', flush=True)
    fogli, parcels = {}, {}
    for com in coms:
        code = codes[C.norm(com)]
        want = sorted({f for c, f in need if c == com})
        if com != 'Alba':  # all fogli of the three DOCG comuni, so parcels outside the cited fogli are known too
            want = sorted({int(r.split('_')[1][:4]) for r in Z if r.startswith(code + '_')})
        for f in want:
            refs = sorted(r for r in Z if r.startswith(f'{code}_{f:04d}'))
            for ref in refs:
                key = f'{com} {f}' + (ref[len(code) + 5:].rstrip('0') if len(refs) > 1 else '')
                P = K.parcels_in(Z[ref], ref)
                fogli[key] = {'ref': ref, 'geom': shapely.geometry.mapping(Z[ref])}
                parcels[key] = {lab: shapely.geometry.mapping(g) for lab, g in P.items()}
                print(key, ref, len(P), round(time.time() - t), flush=True)
    json.dump({'codes': codes, 'fogli': fogli, 'parcels': parcels, 'failed_tiles': K.FAILED},
              open(f'{W}/bb_parcels.json', 'w'))
    print('done', len(fogli), 'fogli', sum(len(v) for v in parcels.values()), 'parcels', 'failed', len(K.FAILED))


if __name__ == '__main__':
    main()
