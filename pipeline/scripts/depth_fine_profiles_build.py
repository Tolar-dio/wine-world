#!/usr/bin/env python3
"""Build V2 depth content files for fine units (DE Einzellagen, AT Rieden, Alto Adige UGAs) and
gap profiles for main polygons, from the hand-written part modules in work/depth_fine_profiles/parts/.

Outputs (SPEC content shape):
  data/content/depth_de_at_einzellagen.json
  data/content/depth_altoadige_uga.json
  data/content/depth_gap_profiles.json
Also writes intermediate JSON per group to work/depth_fine_profiles/ and prints QA stats.
"""
import importlib.util, json, os, re, sys, unicodedata
from collections import Counter, defaultdict

ROOT = "/home/claude/winesite"
PARTS = f"{ROOT}/work/depth_fine_profiles/parts"
OUTW = f"{ROOT}/work/depth_fine_profiles"
GEO = f"{ROOT}/site/data/geo"
BANNED = ["delve", "robust", "seamless", "game-changer", "unlock", "leverage", "comprehensive",
          "cutting-edge", "transformative", "innovative", "it's worth noting", "nestled", "boasts",
          "tapestry", "testament"]


def load(name):
    spec = importlib.util.spec_from_file_location(name, f"{PARTS}/{name}.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def feats(f):
    return {ft["properties"]["id"]: ft["properties"] for ft in json.load(open(f"{GEO}/{f}.geojson"))["features"]}


def words(*xs):
    return sum(len(str(x).split()) for x in xs if x)


def uniq(xs):
    out = []
    for x in xs:
        if x and x not in out:
            out.append(x)
    return out


def text_fields(rec):
    return [rec.get(k, "") for k in ("summary", "terroir", "nerd_note", "classification")]


problems = []
EXTRA = None


def extra(fid):
    global EXTRA
    if EXTRA is None:
        EXTRA = load("extras").EXTRA
    return EXTRA.get(fid, "")


def qa(rec):
    for t in text_fields(rec):
        if "—" in t or " – " in t:
            problems.append(f"dash in {rec.get('id') or rec.get('name')}")
        low = t.lower()
        for b in BANNED:
            if re.search(r"\b" + re.escape(b) + r"\b", low):
                problems.append(f"banned '{b}' in {rec.get('id') or rec.get('name')}")


def styles_dom(st):
    st = list(st)
    return st, (st[0] if st else None)


# ------------------------------------------------------------------ register context (data-driven)
def clean_bereich(b):
    b = (b or "").replace("Ber. ", "Bereich ").strip()
    return b if b.startswith("Bereich") else ("Bereich " + b if b else "")


def de_context(p, F, profiled):
    r = p.get("reg") or {}
    gl, ber, gem = r.get("grosslage"), clean_bereich(r.get("bereich")), r.get("gemarkungen") or ""
    vha = r.get("vine_ha")
    bits = []
    if gl and gl.lower().startswith("großlagenfrei"):
        s1 = f"In the Rhineland-Palatinate vineyard register (Weinbergsrolle) it sits in the {ber} and belongs to no Grosslage"
    elif gl:
        s1 = (f"In the Rhineland-Palatinate vineyard register (Weinbergsrolle) it sits in the {ber} and the Grosslage {gl} "
              f"(a 1971 collective name for blends from several villages)")
    else:
        s1 = ""
    if s1:
        if vha:
            s1 += f"; about {round(vha, 1):g} ha are registered under vine"
        bits.append(s1 + ".")
    g0 = gem.split(",")[0].strip()
    if g0:
        nb = [q["name"] for i, q in F.items() if i != p["id"] and i in profiled
              and ((q.get("reg") or {}).get("gemarkungen") or "").split(",")[0].strip() == g0]
        nb = [n.split(" ", 1)[1] if " " in n and n.split(" ", 1)[0].endswith("er") else n for n in nb][:4]
        if nb:
            bits.append(f"Neighbouring sites in {g0} include " + ", ".join(nb[:-1]) + (" and " if len(nb) > 1 else "") + nb[-1] + ".")
    return " ".join(bits)


def at_context(p, F, profiled, known=""):
    r = p.get("reg") or {}
    kg = r.get("kg") or (p.get("alt") or [""])[0].replace(p["name"].replace("Ried ", ""), "").strip()
    gem = r.get("gemeinde") or ""
    base = p["name"].replace("Ried ", "")
    pref = p["id"].rsplit("-", 0)[0]
    kgslug = p["id"][3:].split("-" + base.lower()[:3])[0] if False else None
    area = p.get("area") or 0
    if p.get("src") == "bgld":
        loc = f"the municipality of {gem}" if gem else ""
    else:
        loc = f"the cadastral village of {kg}" + (f" (municipality {gem})" if gem and gem != kg else "") if kg else (f"the municipality of {gem}" if gem else "")
    src = "Lower Austrian" if p.get("src") == "noe" else "Burgenland"
    s1 = f"The official {src} Ried map places it in {loc}" if loc else f"It appears on the official {src} Ried map"
    if area >= 0.05:
        s1 += f", with about {round(area * 100):g} ha delimited"
    s1 += "."
    subs = sorted({q["name"].replace("Ried " + base + " ", "") for q in F.values()
                   if q["name"].startswith("Ried " + base + " ") and (q.get("reg") or {}).get("gemeinde") == gem
                   and ((q.get("reg") or {}).get("kg") or "") == (r.get("kg") or "")})
    subs += sorted({q["name"].split("Subriedname: ")[1] for q in F.values()
                    if "Subriedname" in q["name"] and q["name"].split("|")[0].replace("Ried Riedname: ", "").strip() == base
                    and (q.get("reg") or {}).get("gemeinde") == gem})
    bits = [s1]
    if subs and not any(x in (known or "") for x in subs):
        bits.append("Named subrieden: " + ", ".join(subs[:6]) + ".")
    return " ".join(bits)


# ------------------------------------------------------------------ Germany
def build_de():
    global PROF_DE
    F = feats("de_fine")
    PROF_DE = set()
    for mod in ("de_mosel", "de_nahe", "de_rheinhessen", "de_pfalz", "de_ahr_mrh"):
        PROF_DE |= {"de-" + d["k"] for d in load(mod).E}
    recs = []
    for mod, region in (("de_mosel", "Mosel"), ("de_nahe", "Nahe"), ("de_rheinhessen", "Rheinhessen"),
                        ("de_pfalz", "Pfalz"), ("de_ahr_mrh", None)):
        m = load(mod)
        for d in m.E:
            fid = "de-" + d["k"]
            reg = d.get("region") or region
            st, dom = styles_dom(d["st"])
            if fid in F:
                p = F[fid]
                name = p["name"]
                match = uniq([name] + list(p.get("alt") or []) + list(d.get("match", [])))
                vha = (p.get("reg") or {}).get("vine_ha")
                area = d.get("area_ha") or vha
            elif d.get("missing"):
                name = d.get("name") or "Scharzhofberg"
                match = uniq([name, "Scharzhofberger", "Wiltinger Scharzhofberg"])
                area = d.get("area_ha")
                p = None
            else:
                problems.append(f"DE id not in geo: {fid}")
                continue
            rec = {"id": fid, "country": "de", "name": name, "match": match, "cat": "Einzellage",
                   "subcat": "Einzellage", "region": reg, "subregion": d["sub"]}
            if area:
                rec["area_ha"] = round(float(area), 1)
            rec.update({"styles": st, "dominant_style": dom, "grapes": d["g"], "summary": (d["s"] + " " + extra(fid)).strip()})
            tt = d.get("t") or ""
            if p is not None:
                cx = de_context(p, F, PROF_DE)
                if cx:
                    tt = (tt + " " + cx).strip()
            if tt:
                rec["terroir"] = tt
            if d.get("p"):
                rec["producers"] = d["p"]
            if d.get("n"):
                rec["nerd_note"] = d["n"]
            if d.get("c"):
                rec["classification"] = d["c"]
            if d.get("missing"):
                rec["lat"], rec["lon"], rec["coord_quality"] = d["lat"], d["lon"], "approx"
                rec["subcat"] = "Einzellage"
            qa(rec)
            recs.append(rec)
    return recs


# ------------------------------------------------------------------ Austria
DAC_NOTE = {
    "Wachau": "Under Wachau DAC rules (from the 2020 vintage) a Ried name may only appear on hand-harvested wines, while the Vinea Wachau terms Steinfeder, Federspiel and Smaragd still signal rising ripeness.",
    "Kamptal": "Kamptal DAC (since 2008) puts Ried-designated Grüner Veltliner and Riesling at the top of its origin pyramid, above village and regional wines.",
    "Kremstal": "Kremstal DAC (since 2007) is reserved for Grüner Veltliner and Riesling; single-Ried wines form the top tier of its pyramid.",
    "Traisental": "Traisental DAC (since 2006) covers Grüner Veltliner and Riesling from one of the smallest wine areas of Lower Austria, on the south side of the Danube.",
    "Wagram": "The Wagram's loess bank runs for some 30 km along the north side of the Danube; its DAC rules put Ried wines at the top of the pyramid, with Grüner Veltliner and the local Roter Veltliner as signature grapes.",
    "Carnuntum": "Carnuntum DAC (since 2019) is built on Zweigelt and Blaufränkisch reds and on white wines from Grüner Veltliner, Chardonnay and Pinot Blanc.",
    "Thermenregion": "The Thermenregion, south of Vienna, is the home of Zierfandler and Rotgipfler on the limestone slopes near Gumpoldskirchen and of Pinot Noir and St. Laurent on the warm gravel plain around Tattendorf.",
    "Leithaberg": "Leithaberg DAC is reserved for Blaufränkisch-based reds and for whites from Pinot Blanc, Chardonnay, Neuburger and Grüner Veltliner grown on the limestone and schist of the Leitha hills.",
    "Mittelburgenland": "Mittelburgenland DAC (since 2005) is dedicated to Blaufränkisch, the grape that covers about half of the district's vineyards.",
    "Eisenberg": "Eisenberg DAC (since 2010) covers Blaufränkisch from the green schist and iron-rich loam of southern Burgenland.",
    "Neusiedlersee": "Neusiedlersee DAC (since 2012) is built on Zweigelt for dry reds and on botrytised sweet wines from the lake's mists.",
}
def build_at():
    F = feats("at_fine")
    attrs = json.load(open(f"{OUTW}/at_sel_attrs.json"))
    recs = []
    for mod, region in (("at_wachau", "Wachau"), ("at_danube", None), ("at_burgenland", None)):
        m = load(mod)
        for d in m.E:
            reg = d.get("region") or region
            hits = attrs.get(d["key"])
            if not hits:
                problems.append(f"AT key not resolved: {d['key']}")
                continue
            st, dom = styles_dom(d["st"])
            for h in hits:
                fid = h["id"]
                p = F.get(fid)
                if not p:
                    problems.append(f"AT id missing in geo: {fid}")
                    continue
                name = p["name"]
                match = uniq([name] + list(p.get("alt") or []) + [name.replace("Ried ", "")])
                rec = {"id": fid, "country": "at", "name": name, "match": match, "cat": "Ried",
                       "subcat": "Ried", "region": reg, "subregion": d["sub"]}
                if p.get("area") and p["area"] >= 0.05:
                    rec["area_ha"] = round(p["area"] * 100)
                rec.update({"styles": st, "dominant_style": dom, "grapes": d["g"], "summary": (d["s"] + " " + extra(fid)).strip()})
                tt = ((d.get("t") or "") + " " + at_context(p, F, None, (d.get("t") or "") + d["s"])).strip()
                if words(d["s"], tt, d.get("n")) < 45 and DAC_NOTE.get(reg) and not d.get("n"):
                    rec["nerd_note"] = DAC_NOTE[reg]
                rec["terroir"] = tt
                if d.get("p"):
                    rec["producers"] = d["p"]
                if d.get("n"):
                    rec["nerd_note"] = d["n"]
                if d.get("c"):
                    rec["classification"] = d["c"]
                qa(rec)
                recs.append(rec)
    return recs


# ------------------------------------------------------------------ Alto Adige
def build_uga():
    F = feats("it_fine")
    m = load("it_uga")
    recs = []
    for d in m.E:
        fid = d["id"]
        p = F.get(fid)
        if not p:
            problems.append(f"UGA id missing: {fid}")
            continue
        st, dom = styles_dom(d["st"])
        name = p["name"]
        rec = {"id": fid, "country": "it", "name": name, "match": uniq([name] + list(p.get("alt") or []) + d.get("match", [])),
               "cat": "DOC", "subcat": p.get("subcat") or "UGA", "region": "Trentino-Alto Adige",
               "subregion": d.get("sub", "Alto Adige")}
        if p.get("area") and p["area"] >= 0.05:
            rec["area_ha"] = round(p["area"] * 100)
        rec.update({"styles": st, "dominant_style": dom, "grapes": d["g"], "summary": d["s"]})
        for k_in, k_out in (("t", "terroir"), ("p", "producers"), ("n", "nerd_note"), ("c", "classification")):
            if d.get(k_in):
                rec[k_out] = d[k_in]
        if d.get("created"):
            rec["created"] = d["created"]
        qa(rec)
        recs.append(rec)
    return recs


# ------------------------------------------------------------------ gap profiles
def build_gap():
    idx = {e["id"]: e for e in json.load(open(f"{GEO}/_index.json"))}
    recs = []
    for mod in ("gap_fr", "gap_ch", "gap_uy"):
        m = load(mod)
        for d in m.E:
            fid = d["id"]
            e = idx.get(fid)
            if not e:
                problems.append(f"gap id not in index: {fid}")
                continue
            st, dom = styles_dom(d["st"])
            rec = {"id": fid, "country": e["country"], "name": e["name"],
                   "match": uniq([e["name"]] + list(e.get("alt") or []) + d.get("match", [])),
                   "cat": e.get("cat")}
            if e.get("subcat"):
                rec["subcat"] = e["subcat"]
            for k in ("region", "subregion", "created", "area_ha"):
                if d.get(k) is not None:
                    rec[k] = d[k]
            rec.update({"styles": st, "dominant_style": dom, "grapes": d["g"], "summary": d["s"]})
            for k_in, k_out in (("t", "terroir"), ("p", "producers"), ("n", "nerd_note"), ("c", "classification")):
                if d.get(k_in):
                    rec[k_out] = d[k_in]
            qa(rec)
            recs.append(rec)
    return recs


def stats(label, recs):
    wc = [words(r.get("summary"), r.get("terroir"), r.get("nerd_note")) for r in recs]
    big = sum(1 for w in wc if w >= 120)
    small = sum(1 for w in wc if w < 40)
    ids = Counter(r["id"] for r in recs)
    dup = [i for i, c in ids.items() if c > 1]
    print(f"{label}: {len(recs)} records, {len(set(ids))} ids, words total {sum(wc)}, >=120w {big}, <40w {small}, dup ids {dup[:5]}")


def write(path, payload):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(payload, fh, ensure_ascii=False, indent=1)
    json.load(open(tmp))
    os.replace(tmp, path)


if __name__ == "__main__":
    which = sys.argv[1:] or ["deat", "uga", "gap"]
    if "deat" in which:
        de, at = build_de(), build_at()
        stats("DE", de); stats("AT", at)
        write(f"{OUTW}/part_de.json", de); write(f"{OUTW}/part_at.json", at)
        write(f"{ROOT}/data/content/depth_de_at_einzellagen.json",
              {"countries": [], "regions": [], "appellations": de + at, "sites": []})
    if "uga" in which:
        u = build_uga(); stats("UGA", u)
        write(f"{OUTW}/part_uga.json", u)
        write(f"{ROOT}/data/content/depth_altoadige_uga.json",
              {"countries": [], "regions": [], "appellations": u, "sites": []})
    if "gap" in which:
        g = build_gap(); stats("GAP", g)
        write(f"{OUTW}/part_gap.json", g)
        write(f"{ROOT}/data/content/depth_gap_profiles.json",
              {"countries": [], "regions": [], "appellations": g, "sites": []})
    print("problems:", len(problems))
    for p in problems[:60]:
        print("  ", p)
