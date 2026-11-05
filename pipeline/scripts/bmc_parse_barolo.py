# Barolo MGA cadastre job: parse the "Allegato delle Menzioni geografiche aggiuntive della docg Barolo"
# (GU serie generale n. 31 of 8 Feb 2010, pp. 54-93, proposta di modifica del disciplinare; the annex lists
# each MGA as Comune / Foglio / Particelle, "parte" after a number = parcel only partly in the MGA).
# Output rows in the T04 format: [{"mga","comune","foglio","allegato","particelle":[...],"parte":[...]}]
# Usage: python3 -I scripts/bmc_parse_barolo.py
import json, re
import pdfplumber

SRC = '/home/claude/winesite/raw/barolo_mga_src/gu_2010-02-08_p54.pdf'
OUT = '/home/claude/winesite/work/barolo-mga/mga_barolo.json'
KEY = {'Comune', 'Foglio', 'Particelle', 'Particella', 'parte'}
# The GU text of Rocchettevino reads "Foglio 11 Particelle 7 9 10 11 12 604 612 3 4 7 8 9 ...": the list restarts and a
# second "Foglio N Particelle" header is missing. The 151 numbers after 612 were tried against every La Morra foglio:
# only foglio 14 puts them on the consortium map's Rocchettevino (135 of 151 found, 76% of their area inside it;
# every other foglio 0 to 4%). They are read as foglio 14. (bmc log, section "Annex reading").
ROW_SPLIT = {('Rocchettevino', 'La Morra', 11): (7, 14)}
COMUNI = ["Barolo", "Castiglione Falletto", "Cherasco", "Diano d'Alba", "Grinzane Cavour", "La Morra",
          "Monforte d'Alba", "Novello", "Roddi", "Serralunga d'Alba", "Verduno"]


def is_label(tok):
    return bool(re.fullmatch(r'\d+[a-zA-Z]?|[A-Z]|X\d+[a-z]?|\d+/\d+', tok))


def main():
    pdf = pdfplumber.open(SRC)
    lines, started = [], False
    for pg in pdf.pages:
        for ln in (pg.extract_text() or '').splitlines():
            ln = ln.strip()
            if 'Allegato delle Menzioni' in ln:
                started = True
                continue
            if not started or not ln or 'GAZZETTA UFFICIALE' in ln or re.fullmatch(r'— \d+ —', ln) \
                    or re.fullmatch(r'\d+A\d+', ln):
                continue
            lines.append(ln)
    rows, cur, mga, comune, unknown = [], None, None, None, []
    for ln in lines:
        toks = ln.replace('’', "'").split()
        first = toks[0]
        if first not in KEY and not is_label(first):
            mga, cur, comune = ' '.join(toks), None, None
            continue
        i = 0
        while i < len(toks):
            t = toks[i]
            if t == 'Comune':
                j = toks.index('Foglio', i) if 'Foglio' in toks[i:] else len(toks)
                comune = ' '.join(toks[i + 1:j])
                if comune not in COMUNI:
                    unknown.append((mga, comune))
                i = j
                continue
            if t == 'Foglio':
                fg = toks[i + 1]
                m = re.fullmatch(r'(\d+)([A-Z]?)', fg)
                cur = {'mga': mga, 'comune': comune, 'foglio': int(m.group(1)), 'allegato': m.group(2),
                       'particelle': [], 'parte': []}
                rows.append(cur)
                i += 2
                continue
            if t in ('Particelle', 'Particella'):
                i += 1
                continue
            if t == 'parte':
                if cur and cur['particelle']:
                    cur['parte'].append(cur['particelle'][-1])
                i += 1
                continue
            if is_label(t) and cur is not None:
                cur['particelle'].append(t)
            else:
                unknown.append((mga, t))
            i += 1
    for (m, c, f), (k, f2) in ROW_SPLIT.items():
        r = next(r for r in rows if (r['mga'], r['comune'], r['foglio']) == (m, c, f))
        tail = r['particelle'][k:]
        r['particelle'] = r['particelle'][:k]
        rows.insert(rows.index(r) + 1, {'mga': m, 'comune': c, 'foglio': f2, 'allegato': '', 'particelle': tail,
                                        'parte': [x for x in r['parte'] if x in tail], 'note': 'foglio header missing in GU'})
        r['parte'] = [x for x in r['parte'] if x in r['particelle']]
    json.dump(rows, open(OUT, 'w'), ensure_ascii=False, indent=0)
    names = sorted({r['mga'] for r in rows})
    print(len(rows), 'rows', len(names), 'mga', sum(len(r['particelle']) for r in rows), 'parcels',
          sum(len(r['parte']) for r in rows), 'parte')
    print('unknown tokens', unknown[:40])
    print(names)


if __name__ == '__main__':
    main()
