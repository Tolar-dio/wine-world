# Barolo MGA cadastre job: incremental 30 m terrain for the changed MGA polygons only (as in work/italy-enrich-log.md).
#   step "run":   topo_run.py --incremental <tag> with GEO pointed at a scratch folder holding only it_fine.geojson and
#                 _sites.geojson (so no other country is recomputed); work/topo/prep.pkl backed up first.
#   step "merge": topo_merge.py with TOPO_OUT = scratch; the entries of the changed ids are copied into
#                 site/data/topo/it.json (replacing the old ones, order kept); prep.pkl / merge_summary.json restored.
# Usage: python3 -I scripts/bmc_topo.py run|merge <tag> <scratch dir> new_barolo.json new_barbaresco.json
import json, os, shutil, subprocess, sys

R = '/home/claude/winesite'
WT = R + '/work/topo'
W = R + '/work/barolo-mga'


def ids_of(files):
    out = []
    for fn in files:
        out += [f['properties']['id'] for f in json.load(open(os.path.join(W, fn)))['features']]
    return out


def main():
    step, tag, scratch = sys.argv[1], sys.argv[2], sys.argv[3]
    ids = ids_of(sys.argv[4:])
    geo = os.path.join(scratch, 'geo')
    if step == 'run':
        os.makedirs(geo, exist_ok=True)
        for fn in ('prep.pkl', 'merge_summary.json'):
            if not os.path.exists(f'{scratch}/{fn}.bak'):
                shutil.copy2(f'{WT}/{fn}', f'{scratch}/{fn}.bak')
        shutil.copy2(R + '/site/data/geo/it_fine.geojson', geo + '/it_fine.geojson')
        shutil.copy2(R + '/site/data/geo/_sites.geojson', geo + '/_sites.geojson')
        code = ("import sys; sys.argv=['topo_run.py','--incremental',%r,'--workers','2']; sys.path.insert(0,%r); "
                "import topo_run; topo_run.GEO=%r; topo_run.main()") % (tag, R + '/scripts', geo)
        subprocess.run(['nice', '-n', '15', sys.executable, '-I', '-c', code], check=True)
    elif step == 'merge':
        out = os.path.join(scratch, 'topo_out')
        os.makedirs(out, exist_ok=True)
        env = dict(os.environ, TOPO_OUT=out)
        subprocess.run([sys.executable, '-I', R + '/scripts/topo_merge.py'], check=True, env=env)
        new = json.load(open(out + '/it.json'))
        path = R + '/site/data/topo/it.json'
        cur = json.load(open(path, encoding='utf-8'))
        miss = [i for i in ids if i not in new]
        assert not miss, miss
        for i in ids:
            cur[i] = new[i]          # existing key: value replaced in place, order kept
        with open(path + '.tmp', 'w', encoding='utf-8') as fh:
            json.dump(cur, fh, separators=(',', ':'), ensure_ascii=False)
        os.replace(path + '.tmp', path)
        for fn in ('prep.pkl', 'merge_summary.json'):
            shutil.copy2(f'{scratch}/{fn}.bak', f'{WT}/{fn}')
        # unchanged others: check the scratch merge reproduces the live values of the untouched it_fine ids
        same = sum(1 for k, v in new.items() if k not in ids and k in cur and cur[k] == v)
        print(f'it.json: {len(ids)} entries replaced; scratch merge equals live for {same} untouched ids')


if __name__ == '__main__':
    main()
