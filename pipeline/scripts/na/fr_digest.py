"""Digest key petition facts (acreage, vineyards, wineries, distinguishing features) from TTB AVA rules.
Run: python3 -I scripts/na/fr_digest.py > work/na_fr_digest.txt"""
import json, re, glob, os
D = "/home/claude/winesite/raw/fedreg_na"
rules = {r["document_number"]: r for r in json.load(open(f"{D}/all_rules.json"))}
KW = re.compile(r"(commercial(ly)?[- ]producing vineyards|acres of (commercial )?vineyards|wineries|bonded win|vineyards covering|vineyard acreage|Name Evidence|distinguishing feature)", re.I)
for fn in sorted(glob.glob(f"{D}/text/*.txt"), key=lambda f: rules.get(os.path.basename(f)[:-4], {}).get("publication_date", "")):
    dn = os.path.basename(fn)[:-4]
    r = rules.get(dn, {})
    t = re.sub(r"\s+", " ", open(fn, errors="ignore").read())
    sents = re.split(r"(?<=[.])\s+(?=[A-Z])", t)
    hits = []
    for i, s in enumerate(sents):
        if KW.search(s) and len(s) < 600:
            hits.append(s.strip())
        if len(" ".join(hits)) > 900:
            break
    # distinguishing features summary sentence
    m = re.search(r"distinguishing features of the [^.]{0,80}(?:AVA|viticultural area)[^.]{0,30} (?:are|include)[^.]{0,400}\.", t, re.I)
    print(f"## {r.get('publication_date')} {r.get('title','')[:100]} [{dn}]")
    if m:
        print("DF:", m.group(0)[:500])
    print(" | ".join(hits)[:1100])
    print()
