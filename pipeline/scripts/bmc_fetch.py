# Barolo MGA cadastre job: fetch the Agenzia delle Entrate INSPIRE parcels (CC BY 4.0) of every foglio listed in
# the parsed Barolo annex and match them by parcel number (same method and cache as scripts/itb_t04_fetch.py).
# Usage: python3 -I scripts/bmc_fetch.py   -> work/barolo-mga/mga_barolo_geom.json
import json, sys, time
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_cadastre as K
import shapely

W = '/home/claude/winesite/work/barolo-mga'


def comune_codes(coms):
    cg = {C.norm(c): C.to4326(C.comune(c)) for c in coms}
    allc = shapely.union_all(list(cg.values()))
    Z = K.zoning(allc.bounds, allc)
    code_com = {}
    for ref, g in Z.items():
        code = ref[:4]   # 'A671_000800' or, for comuni with sezioni (Monforte d'Alba), 'F358A000700'
        for ck, gg in cg.items():
            if g.representative_point().within(gg):
                code_com.setdefault(code, {}).setdefault(ck, 0)
                code_com[code][ck] += 1
    com_code = {}
    for code, d in code_com.items():
        ck = max(d, key=d.get)
        if d[ck] >= 2:
            if ck in com_code:  # keep the code with more fogli
                if d[ck] <= code_com[com_code[ck]][ck]:
                    continue
            com_code[ck] = code
    return Z, com_code


def main():
    rows = json.load(open(f'{W}/mga_barolo.json'))
    coms = sorted({r['comune'] for r in rows}, key=C.norm)
    t = time.time()
    Z, com_code = comune_codes(coms)
    print('fogli', len(Z), 'codes', com_code, round(time.time() - t), 's', flush=True)
    out, miss_f = [], []
    cache = {}
    for i, r in enumerate(rows):
        code = com_code.get(C.norm(r['comune']))
        if not code:
            miss_f.append((r['mga'], r['comune'], r['foglio'], 'no code')); continue
        pref = f"{code}_{r['foglio']:04d}"
        if not any(ref.startswith(code + '_') for ref in Z):   # sezioni: Foglio 16A = sezione A, foglio 16
            pref = f"{code}{r.get('allegato') or 'A'}{r['foglio']:04d}"
        cands = sorted(ref for ref in Z if ref.startswith(pref))
        if r.get('allegato') and '_' in pref:
            cands = [c for c in cands if c[len(pref):].startswith(r['allegato'])] or cands
        if not cands:
            miss_f.append((r['mga'], r['comune'], r['foglio'], 'no foglio')); continue
        got_full, got_part, found, ref = [], [], set(), None
        for ref in cands:
            if ref not in cache:
                cache[ref] = K.parcels_in(Z[ref], ref)
            P = cache[ref]
            found = set(r['particelle']) & set(P)
            if found:
                for lab in sorted(found):
                    (got_part if lab in r['parte'] else got_full).append(P[lab])
                break
        lost = [lab for lab in r['particelle'] if lab not in found]
        gf = shapely.union_all(got_full) if got_full else None
        gp = shapely.union_all(got_part) if got_part else None
        out.append({'mga': r['mga'], 'comune': r['comune'], 'foglio': r['foglio'], 'allegato': r.get('allegato', ''),
                    'ref': ref, 'n': len(set(r['particelle'])), 'found': len(found), 'lost': lost[:80],
                    'n_parte': len(r['parte']),
                    'geom': shapely.geometry.mapping(gf) if gf is not None else None,
                    'geom_parte': shapely.geometry.mapping(gp) if gp is not None else None,
                    'foglio_geom': shapely.geometry.mapping(Z[ref]) if ref else None})
        print(i, r['mga'], r['comune'], r['foglio'], f"{len(found)}/{len(set(r['particelle']))}",
              round(time.time() - t), flush=True)
    json.dump({'rows': out, 'missing_fogli': miss_f, 'codes': com_code, 'failed_tiles': K.FAILED},
              open(f'{W}/mga_barolo_geom.json', 'w'))
    print('done', len(out), 'missing fogli', miss_f, 'failed tiles', len(K.FAILED))


if __name__ == '__main__':
    main()
