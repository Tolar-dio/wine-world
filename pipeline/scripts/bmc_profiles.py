# Barolo MGA cadastre job: rewrite the one data-driven sentence of the MGA profiles that the new geometry contradicts
# ("On the official MGA map the digitised outline covers about N ha at roughly A to B m, facing ... (Approximate
# outline; ...)"), from the new outline and its terrain (work/barolo-mga/mga_terrain_new.json). Nothing else in the
# profiles changes. Applied to site/data/content/it_fine.json and to the research source
# data/content/depth_piemonte_mga.json (so scripts/integrate.py keeps it). Same wording rules as
# scripts/depth_fine2_build.py (mga_line, aspect_words).
# Usage: python3 -I scripts/bmc_profiles.py [--dry] new_barolo.json new_barbaresco.json
import json, os, re, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_fine2_build import aspect_words, rnd

R = '/home/claude/winesite'
W = R + '/work/barolo-mga'
SITE = R + '/site/data/content/it_fine.json'
SRC = R + '/data/content/depth_piemonte_mga.json'
OLD = re.compile(r"On the official MGA map the digitised outline ((?:[^.]|\.\d)*)\. \(Approximate outline; total area, not vines; elevations from the Copernicus DEM\.\)")


def new_sentence(old_inner, t, props):
    has_area = old_inner.startswith('covers about')
    has_elev = 'at roughly' in old_inner
    has_asp = ', ' in old_inner or old_inner.startswith('is ')
    ha = t['ha']
    asp = aspect_words(t['a'], t['ar']) if has_asp else None
    bar = props['parent'] == 'it-barolo'
    if bar:
        s = 'In the cadastre the parcels listed for this MGA in the disciplinare '
        verb_area, verb_elev = 'cover about', 'lie at roughly'
    else:
        s = "Drawn on the cadastral parcels that the disciplinare's boundary description gives it, the MGA "
        verb_area, verb_elev = 'covers about', 'lies at roughly'
    if has_area:
        s += f"{verb_area} {ha:.0f} ha" if ha >= 10 else f"{verb_area} {ha:.1f} ha"
        if has_elev:
            s += f" at roughly {rnd(t['e5'])} to {rnd(t['e95'])} m"
    elif has_elev:
        s += f"{verb_elev} {rnd(t['e5'])} to {rnd(t['e95'])} m"
    if asp:
        s += ', ' + asp
    if bar and props['bq'] == 'official':
        tail = '(Total area, not vines; elevations from the Copernicus DEM.)'
    elif bar:
        tail = ('(Some listed parcels have been renumbered since 2010, so the outline is approximate; total area, '
                'not vines; elevations from the Copernicus DEM.)')
    else:
        tail = '(Approximate outline; total area, not vines; elevations from the Copernicus DEM.)'
    return s + '. ' + tail


def main():
    dry = '--dry' in sys.argv
    T = json.load(open(f'{W}/mga_terrain_new.json'))
    props = {}
    for fn in [a for a in sys.argv[1:] if not a.startswith('--')]:
        for f in json.load(open(os.path.join(W, fn)))['features']:
            props[f['properties']['id']] = f['properties']
    site = json.load(open(SITE, encoding='utf-8'))
    src = json.load(open(SRC, encoding='utf-8'))
    src_by = {a['id']: a for a in src['appellations']}
    changed, log = 0, []
    for fid, p in props.items():
        for where, pr in (('site', site['fine_profiles'].get(fid)), ('src', src_by.get(fid))):
            if not pr or not isinstance(pr.get('terroir'), str):
                continue
            m = OLD.search(pr['terroir'])
            if not m:
                continue
            ns = new_sentence(m.group(1), T[fid], p)
            pr['terroir'] = pr['terroir'][:m.start()] + ns + pr['terroir'][m.end():]
            changed += 1
            if where == 'site':
                log.append({'id': fid, 'old': m.group(0), 'new': ns})
    print('sentences rewritten', changed, '(site + source)')
    json.dump(log, open(f'{W}/profile_changes.json', 'w'), ensure_ascii=False, indent=1)
    if dry:
        for x in log[:6]:
            print(x)
        return
    with open(SITE + '.tmp', 'w', encoding='utf-8') as fh:
        json.dump(site, fh, separators=(',', ':'), ensure_ascii=False)
    os.replace(SITE + '.tmp', SITE)
    with open(SRC + '.tmp', 'w', encoding='utf-8') as fh:
        json.dump(src, fh, ensure_ascii=False, indent=1)
    os.replace(SRC + '.tmp', SRC)
    print('written')


if __name__ == '__main__':
    main()
