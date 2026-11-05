# Barolo MGA cadastre job, Barbaresco part. The Barbaresco annex (DM 21.02.2007) has no parcel lists: it describes
# each MGA in words (fogli, roads, streams, comune borders) and names boundary parcels with the MGA on each side.
# Method (no hand editing): every current cadastral parcel (Agenzia delle Entrate INSPIRE, CC BY 4.0) of the
# Barbaresco, Neive, Treiso and Alba fogli is given to one MGA or to none:
#   1. a parcel named in the annex with an MGA in brackets ("65, 134 e 155 del foglio n. 6 (Asili)") goes to that MGA
#      (to none for the non-MGA neighbours Niccolini and Cortini); "/p" parcels are not used;
#   2. otherwise it may only go to an MGA of its comune (the foglio lists of the 2007 text are checked, not enforced:
#      they disagree with the consortium map in places), and not to an MGA whose text says it
#      "confina con" that parcel; among those it goes to the MGA whose consortium-map polygon (src consmap, shifted by
#      the translation that best fits the named parcels, see shift_fit) covers most of it, if that MGA covers >= 50%.
# The result follows parcel edges (field edges, roads and ditches, which are gaps in the cadastre) instead of the
# printed colour fills. bq approx throughout.
# Usage: python3 -I scripts/bmc_build_barbaresco.py -> work/barolo-mga/new_barbaresco.json
import json, re, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import numpy as np
import itb_common as C
import itb_write as Wr
import shapely
from shapely import affinity
from shapely.geometry import shape
from europe_common import label_point, slug

W = '/home/claude/winesite/work/barolo-mga'
NON_MGA = {'Niccolini', 'Cortini'}
OLD = '/home/claude/winesite/work/fine_backup/geo_it_fine.2026-11-05.pre-barolo-mga.geojson'
RULE = ('Barbaresco DOCG disciplinare, art. 1.2 and art. 7, "Allegato delle menzioni geografiche aggiuntive" '
        '(boundary descriptions), as published with DM 21.02.2007 in GU serie generale n. 51 of 2 Mar 2007')
NUM = r"\d+(?:/p|p)?"
LIST = rf"{NUM}(?:\s*,\s*{NUM})*(?:\s+e\s+{NUM})?"


def uid_of(name):
    return 'it-barbaresco-' + slug(name.replace("Ca'Grossa", "Ca' Grossa"))


def negatives(T):
    """'confina con i mappali numeri ...' (Treiso, Neive texts): parcels the MGA borders, i.e. outside it."""
    out = {}
    for name, v in T.items():
        coms = [c for c, _ in v['fogli'] if c != 'Alba'] or ['Alba']
        com = coms[0]
        fs = [f for c, f in v['fogli'] if c == com]
        neg = set()
        for m in re.finditer(rf"confina (?:con (?:i mappali numeri|il mappale n\.|le particelle n\.)|con i mappali)\s+({LIST})", v['text']):
            for p in re.findall(NUM, m.group(1)):
                if not p.endswith('p'):
                    for f in fs:
                        neg.add((com, f, p))
        out[uid_of(name)] = neg
    return out


def main():
    T = json.load(open(f'{W}/mga_barbaresco_text.json'))
    B = json.load(open(f'{W}/bb_parcels.json'))
    idx = {e['id']: e for e in json.load(open(C.GEO + '/_index.json'))}
    ids = sorted(i for i, e in idx.items() if e.get('parent') == 'it-barbaresco' and e.get('subcat') == 'MGA')
    # prior: the consortium-map polygons as they were before this job (backup, so a rerun after writing is stable)
    old = {f['properties']['id']: C.to3035(shapely.make_valid(shape(f['geometry'])))
           for f in json.load(open(OLD))['features'] if f['properties'].get('parent') == 'it-barbaresco'}
    # parcels
    keys, labs, geoms = [], [], []
    for k, P in B['parcels'].items():
        com, fg = k.rsplit(' ', 1)
        fgn = int(re.match(r'\d+', fg).group(0))
        for lab, g in P.items():
            keys.append((com, fgn)); labs.append(lab); geoms.append(C.to3035(shapely.make_valid(shape(g))))
    print('parcels', len(geoms), flush=True)
    area = np.array([g.area for g in geoms])
    pos = {(c, f, l): i for i, ((c, f), l) in enumerate(zip(keys, labs))}
    # candidates by foglio from the texts; Ronchi has no text in the 2007 annex: fogli where its map polygon lies
    cand = {}
    for name, v in T.items():
        for c, f in v['fogli']:
            cand.setdefault((c, f), set()).add(uid_of(name))
    fog_geom = {}
    for k, v in B['fogli'].items():
        com, fg = k.rsplit(' ', 1)
        fgn = int(re.match(r'\d+', fg).group(0))
        g = C.to3035(shapely.make_valid(shape(v['geom'])))
        fog_geom[(com, fgn)] = fog_geom[(com, fgn)].union(g) if (com, fgn) in fog_geom else g
    extra_fogli = []
    for uid in ids:
        if uid not in old:
            continue
        listed = {cf for cf, s in cand.items() if uid in s}
        for cf, fg in fog_geom.items():
            x = old[uid].intersection(fg).area
            if cf not in listed and x > 0.2 * old[uid].area:
                cand.setdefault(cf, set()).add(uid); extra_fogli.append((uid, cf, round(x / old[uid].area, 2)))
    cand_com = {}
    for (c, f), us in cand.items():
        cand_com.setdefault(c, set()).update(us)
    # tags
    tags, tag_conf = {}, []
    for name, v in T.items():
        for c, f, p, lab in v['tags']:
            i = pos.get((c, f, p))
            if i is None:
                continue
            t = None if lab in NON_MGA else uid_of(lab)
            if t is not None and t not in ids:
                continue
            if i in tags and tags[i] != t:
                tag_conf.append((c, f, p, tags[i], t))
            tags[i] = t
    for c, f, p, a, b in tag_conf:   # the annex contradicts itself on these parcels: use neither, the map decides
        tags.pop(pos[(c, f, p)], None)
    # sanity: a named parcel more than 200 m from its MGA on the consortium map is probably renumbered since 2007
    far = []
    for i, t in list(tags.items()):
        if t is not None and t in old and geoms[i].distance(old[t]) > 200:
            far.append((keys[i][0], keys[i][1], labs[i], t, round(geoms[i].distance(old[t]))))
            tags.pop(i)
    neg = negatives(T)
    # shift fit on the named parcels (Barbaresco comune only has them)
    tagged = [(i, t) for i, t in tags.items()]
    rp = [geoms[i].representative_point() for i, _ in tagged]
    oldu = {u: shapely.prepared.prep(g) for u, g in old.items()}

    def agree(dx, dy):
        n = 0
        for (i, t), p in zip(tagged, rp):
            q = affinity.translate(p, -dx, -dy)
            if t is None:
                n += not any(oldu[u].contains(q) for u in oldu)
            else:
                n += oldu[t].contains(q)
        return n
    best = (agree(0, 0), 0, 0)
    base = best[0]
    for dx in range(-80, 81, 5):
        for dy in range(-80, 81, 5):
            a = agree(dx, dy)
            if a > best[0]:
                best = (a, dx, dy)
    print('shift fit: tags', len(tagged), 'agree at 0', base, 'best', best, flush=True)
    dx, dy = best[1], best[2]
    gain = best[0] - base
    use_shift = gain >= max(5, 0.05 * len(tagged))
    if not use_shift:
        dx = dy = 0
    sh = {u: affinity.translate(g, dx, dy) for u, g in old.items()}
    # Barbaresco comune shift only (named parcels exist there); Neive and Treiso keep the map position
    barb = C.comune('Barbaresco').buffer(200)  # ISTAT comuni are already EPSG:3035
    prior = {u: (sh[u] if old[u].centroid.within(barb) else old[u]) for u in old}
    ptree_keys = list(prior)
    ptree = shapely.STRtree([prior[u] for u in ptree_keys])
    assign = [None] * len(geoms)
    how = [''] * len(geoms)
    for i, g in enumerate(geoms):
        if i in tags:
            assign[i] = tags[i]; how[i] = 'tag'; continue
        cs = cand_com.get(keys[i][0], set())   # comune constraint; the 2007 foglio lists are checked, not enforced
        if not cs:
            continue
        best_u, best_x = None, 0
        for j in ptree.query(g):
            u = ptree_keys[j]
            if u not in cs or (keys[i][0], keys[i][1], labs[i]) in neg.get(u, ()):
                continue
            x = prior[u].intersection(g).area
            if x > best_x:
                best_u, best_x = u, x
        if best_u and best_x >= 0.5 * area[i]:
            assign[i] = best_u; how[i] = 'map'
    feats, report = [], {}
    by = {}
    for i, u in enumerate(assign):
        if u:
            by.setdefault(u, []).append(i)
    raw = {u: shapely.union_all([geoms[i] for i in v]) for u, v in by.items()}
    for uid in ids:
        if uid not in raw:
            continue
        others = [raw[u] for u in raw if u != uid and raw[u].distance(raw[uid]) < 20]
        oth = shapely.union_all(others) if others else shapely.Polygon()
        g3 = raw[uid].buffer(8, join_style=2).buffer(-8, join_style=2).difference(oth)
        g4, a = Wr.finish(g3, 8, min_hole=2000, min_part=300)
        mem = by[uid]
        ntag = sum(1 for i in mem if how[i] == 'tag')
        fogli = sorted({f'{keys[i][0]} {keys[i][1]}' for i in mem})
        name_t = next((n for n in T if uid_of(n) == uid), None)
        p = {'id': uid, 'src': 'aecadtext', 'bq': 'approx', 'area': round(a, 2), 'parent': 'it-barbaresco',
             'lp': label_point(g4), 'bbox': [round(x, 4) for x in g4.bounds],
             'reg': {'docg': 'Barbaresco', 'rule': RULE, 'comuni': sorted({keys[i][0] for i in mem}), 'fogli': fogli,
                     'parcels': len(mem), 'parcels_named_in_text': ntag,
                     'geom_note': ('Current cadastral parcels (Agenzia delle Entrate INSPIRE WFS) assigned to the MGA: parcels the '
                                   'annex names with this MGA, then parcels of the fogli the annex lists that the consortium map '
                                   'puts mostly inside it' + (f' (map shifted {dx} m E, {dy} m N to fit the named parcels)' if use_shift and old[uid].centroid.within(barb) else '') +
                                   '; gaps under roads and ditches closed by 8 m. Approximate.' +
                                   ('' if name_t else ' The 2007 annex has no description of this MGA (it is named only as a neighbour), so it rests on the map and the parcels named for it.'))}}
        feats.append({'type': 'Feature', 'properties': p, 'geometry': Wr.r5(g4)})
        listed = {cf for cf, us in cand.items() if uid in us}
        off = sum(area[i] for i in mem if keys[i] not in listed) / max(1, sum(area[i] for i in mem))
        report[uid] = {'area_km2': round(a, 4), 'parcels': len(mem), 'tagged': ntag, 'outside_text_fogli': round(off, 3),
                       'fogli_outside': sorted({f'{keys[i][0]} {keys[i][1]}' for i in mem if keys[i] not in listed})}
    # tag agreement of the plain (unshifted) consortium map, for the record
    plain_ok = sum(1 for (i, t), p in zip(tagged, rp) if (t is None and not any(oldu[u].contains(p) for u in oldu)) or (t is not None and oldu[t].contains(p)))
    summary = {'drawn': len(feats), 'ids_without_polygon': sorted(set(ids) - set(raw)), 'parcels_total': len(geoms),
               'parcels_assigned': sum(1 for u in assign if u), 'by_tag': sum(1 for h in how if h == 'tag'),
               'by_map': sum(1 for h in how if h == 'map'), 'tags_usable': len(tagged),
               'tags_inside_old_map_polygon': plain_ok, 'shift_fit': {'dx': best[1], 'dy': best[2], 'agree': best[0], 'agree_at_0': base,
                                                                     'applied': use_shift},
               'tag_conflicts': tag_conf, 'tags_dropped_far': far, 'extra_fogli_from_map': extra_fogli,
               'negatives': sum(len(v) for v in neg.values())}
    json.dump({'features': feats, 'report': report, 'summary': summary}, open(f'{W}/new_barbaresco.json', 'w'), ensure_ascii=False)
    print(json.dumps(summary, ensure_ascii=False)[:3000])


if __name__ == '__main__':
    main()
