"""Validate guide files.  python3 -I scripts/guides_validate.py site/data/guides/*.json  [--quiet]"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from guides_lib import load_entities  # noqa: E402

KINDS = {"start", "region", "grape", "history"}
BASES = {"standard", "satellite", "topo"}
LINK = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")
WORD = re.compile(r"[A-Za-zÀ-ÿĀ-žḀ-ỿ0-9']+")


def words(s):
    return len(WORD.findall(LINK.sub(r"\1", s or "")))


def check(path, E, quiet=False):
    errs, warns = [], []
    E_ = lambda m: errs.append(m)
    W_ = lambda m: warns.append(m)
    try:
        g = json.loads(Path(path).read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        print(f"{path}: JSON error {e}")
        return 1
    raw = Path(path).read_text(encoding="utf-8")
    if "—" in raw:
        E_(f"em dash found {raw.count(chr(0x2014))}×")
    for k in ("id", "kind", "title", "tagline", "minutes", "intro", "chapters", "sources"):
        if k not in g:
            E_(f"missing top-level '{k}'")
    if g.get("id") and Path(path).stem != g["id"]:
        E_(f"file name {Path(path).stem} != id {g['id']}")
    if g.get("kind") not in KINDS:
        E_(f"kind {g.get('kind')!r}")

    def idok(i, where):
        if not isinstance(i, str) or i not in E:
            E_(f"{where}: unknown id {i!r}")
            return False
        return True

    if g.get("cover"):
        idok(g["cover"], "cover")
    for c in g.get("countries", []):
        idok(c, "countries")
    ids_seen = set()
    total = {"intro": 0, "deeper": 0}
    for ci, ch in enumerate(g.get("chapters", [])):
        w = f"ch{ci + 1} {ch.get('id')}"
        if not ch.get("id") or ch["id"] in ids_seen:
            E_(f"{w}: missing or duplicate chapter id")
        ids_seen.add(ch.get("id"))
        part = ch.get("part", "intro")
        if part not in total:
            E_(f"{w}: part {part!r}")
            part = "intro"
        if not ch.get("title"):
            E_(f"{w}: no title")
        steps = ch.get("steps", [])
        if not 1 <= len(steps) <= 6:
            W_(f"{w}: {len(steps)} steps")
        for si, st in enumerate(steps):
            sw = f"{w} step{si + 1}"
            n = words(st.get("text"))
            total[part] += n
            if n < 40 or n > 200:
                W_(f"{sw}: {n} words")
            for lab, lid in LINK.findall(st.get("text", "")):
                idok(lid, f"{sw} link [{lab}]")
            m = st.get("map")
            if not m:
                W_(f"{sw}: no map move")
                continue
            f = m.get("fly")
            if isinstance(f, str):
                idok(f, f"{sw} fly")
            elif isinstance(f, dict):
                try:
                    lon, lat, z = float(f["lon"]), float(f["lat"]), float(f.get("zoom", 8))
                    if not (-180 <= lon <= 180 and -85 <= lat <= 85 and 0 <= z <= 17):
                        E_(f"{sw}: fly out of range {f}")
                except Exception:  # noqa: BLE001
                    E_(f"{sw}: bad fly {f}")
            elif f is not None:
                E_(f"{sw}: bad fly {f!r}")
            hl = m.get("highlight", [])
            if not isinstance(hl, list):
                E_(f"{sw}: highlight must be a list")
                hl = []
            for h in hl:
                idok(h, f"{sw} highlight")
            if len(hl) > 60:
                W_(f"{sw}: {len(hl)} highlights (slow on phones)")
            if hl and not m.get("label"):
                W_(f"{sw}: highlight without label")
            if m.get("base") and m["base"] not in BASES:
                E_(f"{sw}: base {m['base']!r}")
            if m.get("terrain"):
                z = f.get("zoom") if isinstance(f, dict) else None
                if z is None:
                    W_(f"{sw}: terrain with an id fly (use coordinates + zoom for 3D framing)")
                elif z < 9:
                    E_(f"{sw}: terrain at zoom {z} (< 9)")
            p = m.get("pitch")
            if p is not None and not 0 <= p <= 70:
                E_(f"{sw}: pitch {p}")
            # coordinates should sit near the highlighted shapes
            if isinstance(f, dict) and hl:
                near = False
                for h in hl:
                    e = E.get(h) or {}
                    bb = e.get("bbox")
                    lp = e.get("lp")
                    if bb and bb[0] - 0.5 <= f["lon"] <= bb[2] + 0.5 and bb[1] - 0.5 <= f["lat"] <= bb[3] + 0.5:
                        near = True
                    if lp and abs(lp[0] - f["lon"]) < 1 and abs(lp[1] - f["lat"]) < 1:
                        near = True
                if not near:
                    W_(f"{sw}: fly coordinates far from every highlighted place")
        tst = ch.get("taste", [])
        if not tst:
            W_(f"{w}: no taste")
        for t in tst:
            for k in ("wine", "why", "price"):
                if not t.get(k):
                    E_(f"{w} taste: missing {k}")
            if t.get("place"):
                idok(t["place"], f"{w} taste.place")
        dp = ch.get("deeper", [])
        if not 2 <= len(dp) <= 10:
            W_(f"{w}: {len(dp)} deeper links")
        for d in dp:
            idok(d, f"{w} deeper")
        qs = ch.get("check", [])
        if len(qs) != 3:
            W_(f"{w}: {len(qs)} questions")
        for qi, q in enumerate(qs):
            o = q.get("options", [])
            if not q.get("q") or not 3 <= len(o) <= 4 or not isinstance(q.get("answer"), int) or not 0 <= q["answer"] < len(o) or not q.get("why"):
                E_(f"{w} q{qi + 1}: malformed")
            if len(set(o)) != len(o):
                E_(f"{w} q{qi + 1}: duplicate options")
    for n in g.get("next", []):
        if not re.fullmatch(r"[a-z0-9-]+", n):
            E_(f"next: bad guide id {n!r}")
    if not g.get("sources"):
        W_("no sources")
    tot = total["intro"] + total["deeper"]
    print(f"{path}: {len(g.get('chapters', []))} chapters, {total['intro']} + {total['deeper']} words "
          f"(~{round(total['intro'] / 200)} + {round(total['deeper'] / 200)} min at 200 wpm); {len(errs)} errors, {len(warns)} warnings")
    for m in errs:
        print("  ERROR", m)
    if not quiet:
        for m in warns:
            print("  warn ", m)
    return 1 if errs else 0


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    E = load_entities()
    rc = 0
    for p in args:
        rc |= check(p, E, "--quiet" in sys.argv)
    sys.exit(rc)
