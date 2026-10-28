"""Fetch full text of every TTB viticultural-area final rule (1994+) from govinfo.gov (GPO).
Run: python3 -I scripts/na/fetch_fr_text.py"""
import json, os, subprocess, time, re, html
D = "/home/claude/winesite/raw/fedreg_na"
rules = json.load(open(f"{D}/all_rules.json"))
for r in rules:
    t = r["title"]
    if not any(k in t for k in ("Establish", "Expan", "Modif", "Realign", "Name", "Renam")):
        continue
    dn = r["document_number"]
    out = f"{D}/text/{dn}.txt"
    if os.path.exists(out) and os.path.getsize(out) > 1000 and "Request Access" not in open(out, errors="ignore").read(3000):
        continue
    d = r["publication_date"]
    url = f"https://www.govinfo.gov/content/pkg/FR-{d}/html/{dn}.htm"
    res = subprocess.run(["curl", "-sS", "-L", "-m", "90", url], capture_output=True, text=True)
    txt = html.unescape(re.sub(r"<[^>]+>", "", res.stdout))
    open(out, "w").write(txt)
    print(dn, len(txt), t[:70])
    time.sleep(0.2)
