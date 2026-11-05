# Barolo MGA cadastre job: parse the Barbaresco MGA annex (DM 21.02.2007, GU serie generale n. 51 of 2 Mar 2007,
# "Allegato delle menzioni geografiche aggiuntive della docg barbaresco"). The annex describes each MGA in words:
# the comune and fogli it lies in, roads / streams / comune borders, and boundary parcels tagged with the MGA they
# belong to, e.g. "tra i mappali numeri 65, 134 e 155 del foglio n. 6 (Asili) ed i mappali numeri 180 e 182 del
# foglio n. 6 (Pora)". Output: work/barolo-mga/mga_barbaresco_text.json
#   {mga: {"text", "fogli": [[comune, foglio], ...], "tags": [[comune, foglio, parcel, tagged_mga], ...]}}
# Parcels marked "/p" (partly) are not used as tags. Usage: python3 -I scripts/bmc_parse_barbaresco.py
import json, re, subprocess, sys

PDF = '/home/claude/winesite/raw/barolo_mga_src/gu_2007-03-02_51.pdf'
COLS = '/home/claude/winesite/work/barolo-mga/barbaresco_2007_cols.txt'
OUT = '/home/claude/winesite/work/barolo-mga/mga_barbaresco_text.json'
NUM = r"\d+(?:/p|p)?"
LIST = rf"{NUM}(?:\s*,\s*{NUM})*(?:\s+e\s+{NUM})?"


def clean_text():
    lines = open(COLS, encoding='utf-8').read().splitlines()
    i0 = next(i for i, l in enumerate(lines) if l.startswith('Allegato delle menzioni geografiche aggiuntive'))
    i1 = next(i for i, l in enumerate(lines) if '07A01979' in l)
    keep = []
    for l in lines[i0 + 3:i1]:
        if l.startswith('--- p') or 'GAZZETTA UFFICIALE' in l or 'REPUBBLICA ITALIANA' in l or re.fullmatch(r'(ö ?\d+|\d+ ?ö)', l.strip()):
            continue
        keep.append(l.rstrip())
    t = ''
    for l in keep:
        if t.endswith('-') and l[:1].islower():
            t = t[:-1] + l
        else:
            t += ('\n' if t else '') + l
    t = t.replace('ß', '«').replace('ý', '»').replace('« ', '').replace('Muncago« ta', 'Muncagota').replace("'", "'")
    t = re.sub(r'Muncago\S* ?ta', 'Muncagota', t)
    t = re.sub(r'(?<=\d)l(?=\d)|(?<=\s)l(?=\d)|(?<=\d)l(?=/p)', '1', t)   # OCR "2l6/p" -> 216/p, "l54/p" -> 154/p
    t = re.sub(r'\s*\n\s*', ' ', t)
    return t


def canon(name):
    n = name.replace('’', "'").replace("' ", "'").strip()
    n = re.sub(r"\s+", ' ', n)
    fix = {"Rabaja'-Bass": "Rabaja'-Bas", "Rabaja' -Bass": "Rabaja'-Bas", "Rabaja' -Bas": "Rabaja'-Bas",
           "Rabaja' - Bas": "Rabaja'-Bas", "Paie'": "Paje'", 'Bric-Micca': 'Bric Micca', 'Bernardot': 'Bernadot',
           'Asili e Muncagota': None}
    return fix.get(n, n)


def nums(s):
    return re.findall(NUM, s)


def main():
    t = clean_text()
    parts = re.split(r'Zona di produzione delle uve (?:della menzione geografica )?«([^»]+)»', t)
    out = {}
    for k in range(1, len(parts), 2):
        name = canon(parts[k].replace('della menzione geografica ', ''))
        body = parts[k + 1].strip()
        # comuni and fogli
        fogli = []
        for m in re.finditer(r'(?:nei|nel) (?:comuni? di (\w[\w\' ]*?) )?(?:ai |al )?fogli?o? di mappa (?:numeri|n\.) ([\d, e]+?) (?:del comune di ([A-Z]\w+)|e nel)', body[:400]):
            com = m.group(1) or m.group(3)
            for f in re.findall(r'\d+', m.group(2)):
                fogli.append([com, int(f)])
        m2 = re.search(r'e nel comune di (\w+) al foglio di mappa n\. (\d+)', body[:400])
        if m2:
            fogli.append([m2.group(1), int(m2.group(2))])
        coms = sorted({c for c, _ in fogli})
        single_f = fogli[0][1] if len(fogli) == 1 else None
        main_com = coms[0] if len(coms) == 1 else None
        if main_com is None and coms:   # Treiso + Alba: tags refer to Treiso unless stated
            main_com = [c for c in coms if c != 'Alba'][0] if [c for c in coms if c != 'Alba'] else coms[0]
        tags = []
        for m in re.finditer(rf'(?:mappal[ei]|particell[ae]|numeri|n\.)\s+(?:numeri\s+|n\.\s*)?({LIST})((?:\s+del foglio (?:n\.\s*)?(\d+))?)\s*\(([^)]+)\)((?:\s+del foglio (?:n\.\s*)?(\d+))?)', body):
            lab = canon(m.group(4))
            if lab is None or not re.match(r"[A-Z]", lab):
                continue
            fg = m.group(3) or m.group(6)
            if not fg:
                before = body[max(0, m.start() - 160):m.start()]
                fb = re.findall(r'foglio (?:n\.\s*)?(\d+)', before)
                fg = fb[-1] if fb else single_f
            if fg is None:
                continue
            for p in nums(m.group(1)):
                if p.endswith('p'):
                    continue
                tags.append([main_com, int(fg), p, lab])
        # "della presente sottozona"
        for m in re.finditer(rf'numeri\s+({LIST})\s+della presente sottozona', body):
            if single_f:
                for p in nums(m.group(1)):
                    if not p.endswith('p'):
                        tags.append([main_com, single_f, p, name])
        out[name] = {'text': body, 'fogli': fogli, 'tags': tags}
    json.dump(out, open(OUT, 'w'), ensure_ascii=False, indent=1)
    print(len(out), 'MGA texts;', sum(len(v['tags']) for v in out.values()), 'tags')
    for n, v in out.items():
        print(f"{n:22s} fogli {v['fogli']} tags {len(v['tags'])} {sorted({x[3] for x in v['tags']})}")


if __name__ == '__main__':
    main()
