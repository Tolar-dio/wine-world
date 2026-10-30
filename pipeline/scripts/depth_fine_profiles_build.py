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


def trad_adj(village):
    v = village.strip()
    if v.endswith("ingen"):
        return v[:-2] + "er"
    if v.endswith("hausen"):
        return v[:-6] + "häuser"
    if v.endswith("er"):
        return v
    return v + "er"


EXTRA_MATCH = {"de-ahrweiler-krauterberg": ["Walporzheimer Kräuterberg"], "de-ahrweiler-garkammer": ["Walporzheimer Gärkammer"],
               "de-rummelsheim-schlossberg": ["Burg Layener Schlossberg"], "de-brauneberg-juffer-sonnenuhr": ["Brauneberger Juffer-Sonnenuhr"],
               "de-oberotterbach-sonnenberg": ["Schweigener Sonnenberg"], "de-bacharach-st-jost": ["Steeger St. Jost"],
               "de-oberwesel-bernstein": ["Engehöller Bernstein"], "de-filzen-altenberg": ["Kanzemer Altenberg"],
               "de-dhron-goldtropfchen": ["Piesporter Goldtröpfchen"], "de-kobern-uhlen": ["Winninger Uhlen"],
               "de-guls-rottgen": ["Winninger Röttgen"], "de-bremm-calmont": ["Bremmer Calmont"]}


def trad_labels(p):
    """Traditional label forms (Wiltinger, Niederhäuser, Birkweiler) where the geo label uses a different adjective."""
    out = list(EXTRA_MATCH.get(p["id"], []))
    gem = [g.strip() for g in ((p.get("reg") or {}).get("gemarkungen") or "").split(",") if g.strip()]
    if len(gem) == 1 and " " in p["name"]:
        lab = f"{trad_adj(gem[0])} {p['name'].split(' ', 1)[1]}"
        if lab.lower() != p["name"].lower():
            out.append(lab)
    return out


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
                match = uniq([name] + list(p.get("alt") or []) + list(d.get("match", [])) + trad_labels(p))
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
                land = "Burgenland" if reg in ("Leithaberg", "Mittelburgenland", "Eisenberg", "Neusiedlersee", "Rosalia", "Ruster Ausbruch") else "Niederösterreich"
                rec = {"id": fid, "country": "at", "name": name, "match": match, "cat": "Ried",
                       "subcat": "Ried", "region": land, "subregion": reg, "village": d["sub"]}
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


SUB_NOTE = {
    "at-weissenkirchen-achleiten-himmelreich": "Himmelreich ('kingdom of heaven') is the uppermost part of the Achleiten, where gneiss dominates and the wines are at their most taut.",
    "at-mautern-silberbichl-vom-stein": "This is the source of Nikolaihof's Riesling 'Vom Stein', one of the longest-lived dry whites of Austria.",
    "at-mautern-alte-point-im-weingebirge": "This is the source of Nikolaihof's Grüner Veltliner and Riesling 'Im Weingebirge'.",
    "at-zobing-heiligenstein-heiligenstein-rotfels": "Rotfels means 'red rock', after the reddish Permian sandstone that surfaces here.",
    "at-zobing-heiligenstein-heiligenstein-steinwand": "Steinwand ('stone wall') names the rocky, terraced flank of the hill.",
    "at-prellenkirchen-spitzerberg-obere-roterd": "Roterd means 'red earth', after the iron-rich soil over the limestone; Muhr-van der Niepoort bottles a Blaufränkisch from it.",
    "at-krems-obere-sandgrube-frechau": "Frechau is a historic parcel name within the famous Kremser Sandgrube loess area.",
    "at-senftenberg-hochacker-felsengarten": "Felsengarten ('rock garden') names the stoniest, most rock-strewn part of the Hochäcker.",
}


SENT = r"(?<=[a-z0-9%)'][.!?])\s+"


def build_at_subs(parents):
    F = feats("at_fine")
    by = {r["id"]: r for r in parents}
    recs = []
    for r in parents:
        p = F[r["id"]]
        base = p["name"].replace("Ried ", "")
        kg = (p.get("reg") or {}).get("kg")
        for q in F.values():
            if q["id"] in by or q.get("src") != "noe" or not kg:
                continue
            if not (q["name"].startswith("Ried " + base + " ") and (q.get("reg") or {}).get("kg") == kg):
                continue
            sub = q["name"].replace("Ried " + base + " ", "").lstrip("- ").strip()
            first = re.split(SENT, r["summary"])
            lead = " ".join(first[:2]) if len(" ".join(first[:2]).split()) < 60 else first[0]
            rec = {"id": q["id"], "country": "at", "name": q["name"],
                   "match": uniq([q["name"], f"{kg} {base} {sub}"]), "cat": "Ried", "subcat": "Ried",
                   "region": r["region"], "subregion": r["subregion"], "village": r.get("village"), "styles": r["styles"],
                   "dominant_style": r["dominant_style"], "grapes": r["grapes"],
                   "summary": f"{sub} is a named subdivision (Subried) of the Ried {base} at {kg}, mapped separately on the official Lower Austrian Ried map. " + lead,
                   "terroir": re.split(SENT, r.get("terroir", ""))[0]}
            if r.get("producers"):
                rec["producers"] = r["producers"]
            rec["nerd_note"] = SUB_NOTE.get(q["id"]) or f"See the Ried {base} profile for the site's history and growers."
            if r.get("classification"):
                rec["classification"] = r["classification"] + " (as part of the Ried " + base + ")"
            qa(rec)
            recs.append(rec)
    return recs


# ------------------------------------------------------------------ Alto Adige
UGA_RULE = ("UGA wines must come entirely from the named site, at yields at least 25 percent below the DOC maximum, "
            "with one to five permitted varieties per UGA, and must carry the Consorzio's UGA symbol on the label.")
UGA_CLASS = ("UGA (Unità Geografica Aggiuntiva) of Alto Adige / Südtirol DOC, one of 86 recognised by ministerial decree "
             "of 8 October 2024; first vintage 2024")
COMMUNES = json.load(open(f"{OUTW}/uga_communes.json")) if os.path.exists(f"{OUTW}/uga_communes.json") else {}


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
               "subregion": "Alto Adige", "village": d.get("sub")}
        rec.update({"styles": st, "dominant_style": dom, "grapes": d["g"], "summary": d["s"]})
        for k_in, k_out in (("t", "terroir"), ("p", "producers"), ("n", "nerd_note"), ("c", "classification")):
            if d.get(k_in):
                rec[k_out] = d[k_in]
        is_uga = (p.get("subcat") == "UGA")
        cm = COMMUNES.get(fid) or []
        c = p.get("clim") or {}
        e0, e1, ez = c.get("elev_min"), c.get("elev_max"), c.get("elev")
        alt = ""
        if e0 is not None and e1 is not None and e1 - e0 >= 40:
            alt = f"reaches from about {round(e0, -1):.0f} to {round(e1, -1):.0f} m"
        elif ez:
            alt = f"lies at about {round(ez, -1):.0f} m"
        def short(n):
            for x in (" sulla strada del vino", " an der Weinstraße", " Atesino"):
                n = n.replace(x, "")
            return n
        names = [short(n) for a, n in cm if a >= 0.1][:4]
        if names and alt:
            where = names[0] if len(names) == 1 else ", ".join(names[:-1]) + " and " + names[-1]
            sent = f"The official boundary, in {where}, {alt} (terrain model)."
            rec["terroir"] = (rec.get("terroir", "") + " " + sent).strip()
        if is_uga:
            if d.get("v"):
                rec["terroir"] += " Varieties permitted under the UGA name: " + ", ".join(d["v"]) + "."
            if not rec.get("nerd_note"):
                rec["nerd_note"] = UGA_RULE
            rec["classification"] = UGA_CLASS
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
            rec.update({"styles": st, "dominant_style": dom, "grapes": d["g"],
                        "summary": (d["s"] + " " + load("extras").EXTRA_GAP.get(fid, "")).strip()})
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
        at_sub = build_at_subs(at)
        stats("DE", de); stats("AT", at); stats("AT subrieden", at_sub)
        at = at + at_sub
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
