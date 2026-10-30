"""Build site/data/guides/_index.json from the guide files: the list for the Paths view and, for each atlas id a
guide shows, where it appears (so profiles can say "In the guides").  python3 -I scripts/guides_index.py"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from guides_lib import DATA, load_entities  # noqa: E402

GD = DATA / "guides"
ORDER = ["start-here", "burgundy", "bordeaux", "champagne", "southern-rhone", "tuscany", "piedmont", "mosel", "rioja",
         "napa-sonoma", "new-zealand", "pinot-noir", "syrah", "wines-long-road"]
LINK = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")
WORD = re.compile(r"[A-Za-zÀ-ÿĀ-žḀ-ỿ0-9']+")
REF_TYPES = {"appellation", "site", "region", "grape"}


def main():
    only = set(a for a in sys.argv[1:] if not a.startswith("-"))  # publish just these guide ids (others stay drafts)
    E = load_entities()
    guides, refs = [], {}
    files = sorted(p for p in GD.glob("*.json") if not p.name.startswith("_") and (not only or p.stem in only))
    for p in files:
        g = json.loads(p.read_text(encoding="utf-8"))
        chs = g.get("chapters", [])
        w = {"intro": 0, "deeper": 0}
        for ci, ch in enumerate(chs):
            part = ch.get("part", "intro")
            seen = set()
            for st in ch.get("steps", []):
                w[part if part in w else "intro"] += len(WORD.findall(LINK.sub(r"\1", st.get("text", ""))))
                m = st.get("map") or {}
                for i in ([m["fly"]] if isinstance(m.get("fly"), str) else []) + list(m.get("highlight", [])) + [x for _, x in LINK.findall(st.get("text", ""))]:
                    seen.add(i)
            seen.update(ch.get("deeper", []))
            for i in seen:
                e = E.get(i)
                if not e or e["type"] not in REF_TYPES:
                    continue
                r = refs.setdefault(i, [])
                if not any(x[0] == g["id"] for x in r):
                    r.append([g["id"], ch["id"], ci])
        guides.append({
            "id": g["id"], "kind": g["kind"], "title": g["title"], "subtitle": g.get("subtitle", ""), "tagline": g.get("tagline", ""),
            "minutes": g.get("minutes") or round(w["intro"] / 200), "deeper_minutes": g.get("deeper_minutes", round(w["deeper"] / 200)),
            "cover": g.get("cover"), "countries": g.get("countries", []),
            "chapters": [{"id": c["id"], "title": c["title"], "part": c.get("part", "intro")} for c in chs],
            "words": w["intro"] + w["deeper"],
        })
    rank = {k: i for i, k in enumerate(ORDER)}
    guides.sort(key=lambda x: (rank.get(x["id"], 99), x["title"]))
    out = {"guides": guides, "refs": refs}
    (GD / "_index.json").write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{len(guides)} guides, {len(refs)} referenced places -> {GD / '_index.json'}")


if __name__ == "__main__":
    main()
