"""Merge work/pt/p*.json into data/content/pt.json and run text/ID checks."""
import glob, json, re, os, sys

ROOT = "/home/claude/winesite/"
parts = sorted(glob.glob(ROOT + "work/pt/p*.json"))
out = {"countries": [], "regions": [], "appellations": [], "sites": []}
for p in parts:
    d = json.load(open(p, encoding="utf-8"))
    for k in out:
        out[k].extend(d.get(k, []))

BANNED = ["delve", "robust", "seamless", "game-changer", "unlock", "leverage", "comprehensive", "cutting-edge",
          "transformative", "innovative", "it's worth noting", "nestled", "boasts", "tapestry", "testament"]
problems = []

def walk(o, path=""):
    if isinstance(o, dict):
        for k, v in o.items():
            walk(v, path + "." + k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, f"{path}[{i}]")
    elif isinstance(o, str):
        if "—" in o or "–" in o:
            problems.append(f"dash at {path}: {o[:60]}")
        low = o.lower()
        for w in BANNED:
            if re.search(r"\b" + re.escape(w) + r"\b", low):
                problems.append(f"banned '{w}' at {path}: ...{low[max(0, low.find(w)-40):low.find(w)+40]}...")
walk(out)

ids = set()
for s in out["sites"]:
    if not re.fullmatch(r"site-[a-z]{2}-[a-z0-9-]+", s["id"]):
        problems.append("bad id " + s["id"])
    if s["id"] in ids:
        problems.append("dup id " + s["id"])
    ids.add(s["id"])
    if not s.get("text") or len(s["text"].split()) < 12:
        problems.append("short site text " + s["id"])
    if len(s["text"].split()) > 160:
        problems.append(f"long site text {s['id']} ({len(s['text'].split())} words)")
    if s.get("coord_quality") not in ("precise", "approx"):
        problems.append("cq " + s["id"])
names = [a["name"] for a in out["appellations"]]
dups = {n for n in names if names.count(n) > 1}
if dups:
    problems.append("dup appellations " + str(dups))
for a in out["appellations"]:
    if a.get("id") and not re.fullmatch(r"[a-z]{2}-[a-z0-9-]+", a["id"]):
        problems.append("bad app id " + a["id"])

os.makedirs(ROOT + "data/content", exist_ok=True)
json.dump(out, open(ROOT + "data/content/pt.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("countries", len(out["countries"]), "regions", len(out["regions"]), "appellations", len(out["appellations"]), "sites", len(out["sites"]))
wc = lambda s: len(s.split())
pt = out["countries"][0]
print("pt overview words", wc(pt["overview"]), "history entries", len(pt["history"]))
for a in out["appellations"]:
    if a["name"] in ("Porto", "Douro", "Madeira", "Vinho Verde", "Dão", "Bairrada", "Alentejo", "Colares", "Setúbal", "Pico", "Carcavelos"):
        print("  ", a["name"], wc(a["summary"]))
print("PROBLEMS:", len(problems))
for p in problems[:40]:
    print(" -", p)
