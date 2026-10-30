"""Find atlas ids by name.  python3 -I scripts/guides_find.py "vosne" [--type appellation|site|region|grape|event|term|soil|country] [--country fr] [--limit 30]
Also: --id fr-vosne-romanee prints the full record (with bbox and label point)."""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from guides_lib import load_entities, fold  # noqa: E402

ap = argparse.ArgumentParser()
ap.add_argument("q", nargs="?", default="")
ap.add_argument("--type")
ap.add_argument("--country")
ap.add_argument("--limit", type=int, default=30)
ap.add_argument("--id")
a = ap.parse_args()
E = load_entities()
if a.id:
    print(json.dumps({a.id: E.get(a.id)}, ensure_ascii=False, indent=1))
    sys.exit(0)
q = fold(a.q)
hits = []
for i, e in E.items():
    if a.type and e["type"] != a.type:
        continue
    if a.country and e.get("country") != a.country:
        continue
    n = fold(e.get("name"))
    if q and q not in n and q not in i:
        continue
    score = (0 if n == q else 1 if n.startswith(q) else 2, len(n))
    hits.append((score, i, e))
hits.sort(key=lambda h: h[0])
for _, i, e in hits[: a.limit]:
    extra = " · ".join(str(x) for x in (e.get("cat"), e.get("subcat"), e.get("kind"), e.get("ctx"), e.get("parent") and "parent " + e["parent"]) if x)
    lp = e.get("lp")
    print(f"{i:58s} {e['type']:11s} {e.get('name')}  [{extra}]" + (f"  @{lp[0]:.4f},{lp[1]:.4f}" if lp else ""))
print(f"({len(hits)} matches)")
