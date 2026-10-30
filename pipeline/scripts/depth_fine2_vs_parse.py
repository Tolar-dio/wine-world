"""Parse the BOE orders recognising Rioja viñedos singulares (raw/boe_vs/*.txt, pdftotext -layout) into
work/depth_fine2/vs_list.json: [{vs, name, prov, muni, src}]. Rough parser; output reviewed by hand.
Usage: python3 -I scripts/depth_fine2_vs_parse.py"""
import re, json, glob
R = '/home/claude/winesite'
PROV = r'(Álava|La Rioja|Navarra)'
out = []
for fn in sorted(glob.glob(R + '/raw/boe_vs/*.txt')):
    lines = open(fn, encoding='utf-8').read().split('\n')
    for i, l in enumerate(lines):
        m = re.match(r'^\s*(VS[\s\-]*[\d\-/]+(?:/\d{4})?)\.?\s+(.*)$', l)
        if not m:
            continue
        rest = m.group(2)
        pm = re.search(PROV + r'\.?\s+(.+?)(?:\s{2,}|\.\s|$)', rest)
        name = rest[:pm.start()].strip(' .') if pm else rest.strip()
        prov = pm.group(1) if pm else None
        muni = pm.group(2).strip(' .') if pm else None
        out.append(dict(vs=re.sub(r'\s+', ' ', m.group(1)), name=name, prov=prov, muni=muni,
                        src=fn.split('/')[-1][:-4], line=i + 1))
json.dump(out, open(R + '/work/depth_fine2/vs_list.json', 'w'), ensure_ascii=False, indent=0)
print(len(out))
