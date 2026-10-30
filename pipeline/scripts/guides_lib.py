"""Shared helpers for the guide pipeline: every valid atlas id, with names, for validation and lookup."""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "site" / "data"


def fold(s):
    s = str(s or "").lower()
    for a, b in (("ß", "ss"), ("æ", "ae"), ("œ", "oe"), ("ø", "o"), ("ł", "l"), ("đ", "d"), ("ı", "i")):
        s = s.replace(a, b)
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = re.sub(r"['’‘`]", "", s)
    s = re.sub(r"[^a-z0-9Ͱ-ϿЀ-ӿႠ-ჿ]+", " ", s).strip()
    return s


def slug(s):
    return fold(s).replace(" ", "-")


def load_entities():
    """id -> {type, name, country, lp:[lon,lat] or None, bbox or None, extra}"""
    E = {}
    J = lambda p: json.loads((DATA / p).read_text(encoding="utf-8"))
    for c_id, c in J("geo/_countries.json").items():
        E[c_id] = {"type": "country", "name": c.get("name", c_id), "country": c_id, "bbox": c.get("bbox"), "lp": None}
    for a in J("geo/_index.json"):
        E[a["id"]] = {"type": "appellation", "name": a["name"], "country": a["country"], "lp": a.get("lp"),
                      "bbox": a.get("bbox"), "cat": a.get("cat"), "subcat": a.get("subcat"), "fine": a.get("lvl", 0) > 0 or bool(a.get("fine")),
                      "parent": a.get("parent"), "ctx": a.get("ctx")}
    for f in J("geo/_extra_points.geojson")["features"]:
        p = f["properties"]
        if p.get("id") and p["id"] not in E:
            E[p["id"]] = {"type": "appellation", "name": p.get("name"), "country": p.get("country"),
                          "lp": f["geometry"]["coordinates"], "bbox": None, "cat": p.get("cat"), "pt": True}
    for f in J("geo/_sites.geojson")["features"]:
        p = f["properties"]
        E[p["id"]] = {"type": "site", "name": p["name"], "country": p.get("country"), "lp": f["geometry"]["coordinates"],
                      "bbox": None, "kind": p.get("kind"), "app": p.get("app"), "ctx": p.get("ctx")}
    for f in J("geo/_regions.geojson")["features"]:
        p = f["properties"]
        E[p["id"]] = {"type": "region", "name": p["name"], "country": p.get("country"), "lp": p.get("lp"), "bbox": p.get("bbox")}
    for g in J("content/global/grapes.json")["grapes"]:
        E["grape-" + g["id"]] = {"type": "grape", "name": g["name"], "country": None, "lp": None, "bbox": None}
    for t in J("content/global/timeline.json")["events"]:
        lp = [t["lon"], t["lat"]] if t.get("lon") is not None and t.get("lat") is not None else None
        E["event-" + t["id"]] = {"type": "event", "name": t["title"], "country": t.get("country"), "lp": lp, "bbox": None, "year": t.get("year")}
    for t in J("content/global/glossary.json")["terms"]:
        E["term-" + slug(t["term"])] = {"type": "term", "name": t["term"], "country": None, "lp": None, "bbox": None}
    for s in J("content/global/soils.json")["soils"]:
        E["soil-" + slug(s["id"])] = {"type": "soil", "name": s["name"], "country": None, "lp": None, "bbox": None}
    return E
