#!/usr/bin/env python3
"""Final, precision-first photo selection (v2 rules, owner feedback 2026-10-29).

A photo is accepted for a place only with strong evidence:
  (a) it is the P18 / P8592 / P948 image of a Wikidata item that is unambiguously this place:
      label match + country + coordinates within a few km (or an exact eAmbrosia id), and an
      appropriate item type (wine region / appellation for appellations and regions; the estate,
      vineyard, building or village itself for sites; never a namesake settlement);
  (b) it sits in a Commons category that is exactly this place ("Vineyards of Pauillac",
      "Pauillac (AOC)", "Château Margaux");
  (c) it is geotagged tightly (inside the appellation/region polygon, within 1.5 km of a site)
      AND its title/description/categories name the place or clearly show vineyards.
Always rejected: < 1000 px wide, non-free licences, generic town photos (churches, streets, cars,
people, events, interiors, signs, maps, bottles, food), art/documents for places, photos geotagged
outside the place. Regions and large appellations need vineyard evidence (no town shots); estates
need the estate itself; grapes need a photo in that variety's own category or of its Wikidata item.
Thumbnails: standard Wikimedia widths only (960 for `thumb`, 330 for `thumb_small`).

Outputs: site/data/photos/{iso2}.json, _global.json; work/photo_review/rejected.json,
work/photo_review/accepted_debug.json, work/photo_review/coverage_after.json
"""
import json, os, re, sys, glob, hashlib, collections, urllib.parse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import photos_select as P
from photos_common import haversine
from photos_select import (norm, ntext, strip_html, VINE, VINE_STRICT, LAND, REJECT, BAD_CATS, ART, ART_CATS, INTERIOR,
                           OTHER_SUBJ, BUILDING, CELLAR, GRAPES, OK_MIME, names_of, in_area, strict_site_match, core,
                           license_of, clean_author, describe, cat_vine_head, title_stem, Gazetteer)

ROOT = '/home/claude/winesite'
W = f'{ROOT}/work/photos'
R = f'{ROOT}/work/photo_review'
OUTDIR = f'{ROOT}/site/data/photos'
MIN_W = 1000
CNAME = {}
GAZ_SMALL = []
TITLE_OTHER = re.compile(r'\b(church|chapel|eglise|kirche|chiesa|iglesia|igreja|cathedral|dom|monastery|convento?|monastero|kloster|abbey|abbaye|'
                         r'castle|schloss|castello|castillo|burg|tower|turm|torre|bridge|pont|ponte|river|lake|lac|lago|street|rue|strasse|square|'
                         r'piazza|plaza|town hall|rathaus|municipio|museum|museo|musee|school|station|gare|harbour|harbor|beach|house|houses|'
                         r'mansion|homestead|tasting room|entrance|gate|portal|facade|fassade|courtyard|warehouses?|armazens|lodges?|'
                         r'statue|monument|memorial|cross|croix|kreuz|fountain|mill|moulin|ruins?|tank|press|pressoir|kelter|sign|tag|'
                         r'locomotive|comboio|carga|freight|zug|treno|train|tram)\b')
BIG_BUILDING = re.compile(r'\b(bodega|bodegas|winery|wineries|cantina|weingut|kellerei|cooperative|cave cooperative|adega|chateau|domaine|quinta|'
                          r'tenuta|fattoria|herdade|estate)\b')
STREET = re.compile(r'\b(rue|chemin|allee|route|impasse|avenue|via|vicolo|calle|camino|strasse|weg|gasse|schloss|burg|gasthof|gasthaus|'
                    r'hotel|restaurant|haus|villa|loiseau|companhia geral da agricultura)\s+(des |de |du |della |delle |dei |de la |de las |de los |der |zum |zur )?(vignes?|vigne|vinas?|reben|weinberg\w*|vinhas?)\b')
STD = (960, 330)
SETTLE = set(json.load(open(f'{W}/wd_settlement_classes.json')))
CQ = json.load(open(f'{W}/wd_countries.json'))
VINEYARD_KINDS = {'vineyard', 'cru', 'grand_cru', 'premier_cru', 'lieu_dit', 'mga'}
ESTATE_KINDS = {'chateau', 'estate', 'quinta', 'house', 'cellar'}
WINE_PREFIX = re.compile(r'^(vineyards? (of|in|at|near|around)|vignobles? (de|du|des|d)|vignes (de|du|des|d)|vigneti (di|del|della|dei|de)|'
                         r'vinedos (de|del)|vinhas (de|do|da)|vinhedos (de|do|da)|weinberge? (in|bei|von|um)|weinlagen? (in|von)|'
                         r'rebberge? (in|von)|wine regions? of|wineries in|viticulture in|winemaking in)\s+')
WINE_SUFFIX = re.compile(r'\s+(wine region|wine producing region|wine growing region|wine|wines|aoc|aop|doc|docg|do|doca|dop|ava|dac|igp|igt|'
                         r'pdo|pgi|vineyards?|winery|wine estate|estate|grand cru|premier cru|appellation|weinbaugebiet|weinlage|lage)$')
PAREN_WINE = re.compile(r'^(aoc|aop|doc|docg|do|doca|dop|ava|dac|igp|igt|pdo|pgi|wine|wines|wine region|appellation|vin|vino|wein|vineyard|grand cru|premier cru|cru)$')


def cat_exact(ent, cat, names):
    """Is this Commons category exactly the entity (not a broader area, not a bare town category)?"""
    typ = ent['type']
    raw = cat.replace('Category:', '')
    mpar = re.search(r'\(([^)]*)\)\s*$', raw)
    par = norm(mpar.group(1)) if mpar else ''
    base = norm(re.sub(r'\s*\([^)]*\)\s*$', '', raw))
    had_wine = bool(PAREN_WINE.match(par)) if par else False
    if par and not had_wine:
        ctx = norm(' '.join([P.COUNTRY_ALT.get(ent['country'], ''), ent.get('region') or '', ent.get('appellation') or '',
                             CNAME.get(ent['country'], '')]))
        if not any(tok in ctx.split() for tok in par.split() if len(tok) >= 4):
            return False  # e.g. "Vineyards in Faro (district)" is Portugal, not Sicily's Faro DOC
    m = WINE_PREFIX.match(base)
    if m:
        base = base[m.end():]
        had_wine = True
    m = WINE_SUFFIX.search(base)
    if m:
        base = base[:m.start()]
        had_wine = True
    base = base.strip()
    if typ == 'country':
        return had_wine and base in {norm(ent['name']), 'the ' + norm(ent['name'])}
    if base not in names:
        return False
    if typ == 'site':
        return True
    return had_wine


def area_km2(ent):
    return ent.get('area') or 0


def wd_item_ok(ent, r, G):
    """Is the matched Wikidata item unambiguously this place?"""
    typ = ent['type']
    cls = set(r.get('cls') or [])
    settle = bool(cls & SETTLE)
    if typ in ('appellation', 'region'):
        if r.get('kind') != 'wine' or settle:
            return False
        if r.get('score', 0) >= 6:  # exact eAmbrosia identifier
            return True
        in_country = CQ.get(ent['country']) in (r.get('ctry') or [])
        co = r.get('coord')
        if co:
            return in_area(ent, co[0], co[1], G, slack_km=5.0) is not False
        return in_country
    if typ == 'site':
        if r.get('kind') != 'site':
            return False
        d = r.get('dist_km')
        lim = 1.5 if ent.get('cq') == 'precise' else 3.0
        if d is None or d > lim:
            return False
        if not strict_site_match(ent, r.get('label') or '', d):
            return False
        kind = ent.get('kind') or ''
        if kind in ESTATE_KINDS and settle:
            return False
        if kind in VINEYARD_KINDS and settle and norm(r.get('label') or '') != norm(ent['name']):
            return False
        return True
    if typ == 'grape':
        return r.get('kind') == 'grape'
    return False


def thumbs(m):
    """Standard-width thumbnail URLs (960 hero, 330 tile) on upload.wikimedia.org /thumb/ paths."""
    name = m['title'][5:].replace(' ', '_')
    h = hashlib.md5(name.encode('utf-8')).hexdigest()
    w0, h0 = int(m['w']), int(m['h'])
    api = (m.get('thumb') or '').split('?')[0].replace('https://thumb.wikimedia.org/', 'https://upload.wikimedia.org/')
    mm = re.match(r'^https://upload\.wikimedia\.org/wikipedia/commons/thumb/([0-9a-f])/([0-9a-f]{2})/([^/]+)/(lossy-page1-)?(\d+)px-([^/]+)$', api)
    out = {}
    if mm and mm.group(1) == h[0] and mm.group(2) == h[:2]:
        for wd in STD:
            out[wd] = re.sub(r'/(lossy-page1-)?\d+px-', lambda x: '/' + (x.group(1) or '') + f'{wd}px-', api)
    else:
        q = urllib.parse.quote(name, safe="(),'!*$;:@&=+-._~")
        mime = m.get('mime', '')
        for wd in STD:
            if mime == 'image/tiff':
                fn = f'lossy-page1-{wd}px-{q}.jpg'
            else:
                fn = f'{wd}px-{q}'
            out[wd] = f'https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{fn}'
    ok = all(re.match(r'^https://upload\.wikimedia\.org/wikipedia/commons/thumb/[0-9a-f]/[0-9a-f]{2}/[^/]+/(lossy-page1-)?(960|330)px-[^/]+$', u)
             for u in out.values())
    if not ok or w0 < 960:
        return None
    return {'thumb': out[960], 'w': 960, 'h': round(960 * h0 / w0),
            'thumb_small': out[330], 'w_small': 330, 'h_small': round(330 * h0 / w0)}


# ---------------------------------------------------------------- QA round 2 (live-site findings, 30 Oct)
HIER = {'anc': {}, 'desc': collections.defaultdict(set), 'byid': {}, 'gaz': {}, 'specific': {}, 'ambig': set(), 'place_tokens': set()}
REJECT2 = re.compile(r'\b(stadium|stadion|stade|estadio|stadio|arena|sports? ground|football|soccer|rugby|hotel|motel|resort|'
                     r'battle|war|wars|fallen|soldiers?|military|bombing|papaya|banana|mango|lizards?|geckos?|iguanas?|signs?|signpost|'
                     r'signboard|panneaux?|cartel|schild|tabla|insegna|players?|team|match day|lieferwagen|delivery van|transporter|'
                     r'nativita|nativity|presepe|presepio|creche|krippe|courthouse|court house|post office|prison|hospital)\b')
STREET_T = re.compile(r'\b(street|utca|ulica|strasse|str|gasse|rue|calle|rua|avenue|avenida|viale|vicolo|road|lane|ut|utcai)\b')
MOUNT = re.compile(r'\b(mount|mountain|mountains|volcano|volcanic|cones?|peak|summit|glacier|mont blanc|ararat)\b')
MIXED = re.compile(r'\b(orchards?|olive|olives|olivar|oliveto|apple|apples|cherry|cherries|lavender|sunflowers?|wheat|rapeseed)\b')
GENERIC_TOK = set('img dsc dscn dscf jpg jpeg panoramio cropped photo foto picture pic view vista vue blick image file copy '
                  'de la le les du des di del della dei degli da do dos das the of in at on and et und y e el il lo near from by with '
                  'province provincia county district department departement region regione comune gemeinde municipality '
                  'north south east west nord sud est ouest norte sur oeste'.split())
GAZ_STOP = set(['graves', 'castello', 'salon', 'bourg', 'rive droite', 'right bank', 'left bank', 'rive gauche', 'marino', 'centro', 'valle',
                'north coast', 'south coast', 'central coast', 'interior', 'highlands', 'lowlands', 'islands', 'mountains', 'riviera'])
STRIP_GEO = re.compile(r'\b(saone et loire|indre et loire|maine et loire|loire atlantique|haute loire|loir et cher|eure et loir|cote dor|'
                       r'bouches du rhone|haut rhin|bas rhin|alpes de haute provence|provence alpes cote dazur|pyrenees orientales|'
                       r'lot et garonne|tarn et garonne|charente maritime|haute savoie|haute marne|meurthe et moselle|haute garonne|'
                       r'haute vienne|haute saone|rhineland palatinate|rheinland pfalz|saxony anhalt|sachsen anhalt|'
                       r'nouvelle aquitaine|auvergne rhone alpes|bourgogne franche comte|grand est|occitanie|hauts de france|'
                       r'(?:lake|lac|lago|lac de|lago di|river|rio|fleuve|canal|airport|aeroport|university|universite|gare de|station)\s+\w+)\b')
ENGLISH = set('the of in and a an with from at on near view looking towards toward is are was its this to over by along between '
              'above below behind into across vineyard vineyards vines wine winery village town hill hills valley river'.split())


def _rid(country, name):
    return HIER['region_by_name'].get((country, norm(name or '')))


def build_hierarchy(T, G):
    byid = {t['id']: t for t in T}
    HIER['byid'] = byid
    HIER['region_by_name'] = {(t['country'], norm(t['name'])): t['id'] for t in T if t['type'] == 'region'}
    anc = {}
    region_apps = collections.defaultdict(set)
    app_regions = collections.defaultdict(set)
    for t in T:
        if t['type'] == 'region':
            for a in t.get('apps') or []:
                region_apps[t['id']].add(a)
                app_regions[a].add(t['id'])

    def region_chain(rid, seen):
        out = set()
        while rid and rid not in seen:
            seen.add(rid)
            out.add(rid)
            r = byid.get(rid)
            rid = _rid(r['country'], r.get('parent')) if r else None
        return out

    def app_anc(aid, seen=None):
        seen = seen or set()
        out = set()
        cur = aid
        while cur and cur in byid and cur not in seen:
            seen.add(cur)
            a = byid[cur]
            if cur == aid:  # broad parent appellations (e.g. Bourgogne AOC) must not pull in every region that lists them
                for r in (a.get('region_id'), a.get('subregion_id')):
                    if r in byid:
                        out |= region_chain(r, set())
                for r in app_regions.get(cur, ()):
                    out |= region_chain(r, set())
            par = a.get('parent')
            if par and par in byid and par != cur:
                out.add(par)
            cur = par
        return out

    for t in T:
        typ = t['type']
        if typ == 'region':
            a = region_chain(_rid(t['country'], t.get('parent')), set())
        elif typ == 'appellation':
            a = app_anc(t['id'])
        elif typ == 'site':
            a = set()
            if t.get('app') in byid:
                a = {t['app']} | app_anc(t['app'])
        else:
            a = set()
        if typ in ('region', 'appellation', 'site'):
            a.add(t['country'])
        a.discard(t['id'])
        anc[t['id']] = a
    HIER['anc'] = anc
    for k, a in anc.items():
        for x in a:
            HIER['desc'][x].add(k)
    # gazetteer of wine places per country, longest names first
    gz = collections.defaultdict(lambda: collections.defaultdict(set))
    for t in T:
        if t['type'] in ('region', 'appellation', 'site'):
            alts = {norm(a) for a in (t.get('alt') or []) if a and len(norm(a)) >= 6}
            for n in {norm(t['name'])} | alts:
                if n in GAZ_STOP:
                    continue
                n = re.sub(r'\s*\(.*?\)\s*', ' ', n).strip()
                if len(n) >= 5 and n not in GENERIC_TOK and n != norm(CNAME.get(t['country'], '')):
                    gz[t['country']][n].add(t['id'])
    HIER['gaz'] = {c: sorted(d.items(), key=lambda x: -len(x[0])) for c, d in gz.items()}
    subject = set('village villages town city dorf borgo paese aldea pueblo vila ville valley vallee valle tal hill hills colline '
                  'castle castello chateau schloss castillo church chiesa eglise kirche iglesia river riviere fiume rio lake lac lago '
                  'mount monte mont berg view vista estate winery vineyard vineyards vigneto vigneti vignoble vignes cellar cellars '
                  'house casa maison villa farm farms fattoria quinta tower torre bridge ponte pont harbour port porto beach coast '
                  'island isola ile isla garden gardens park'.split())
    for t in T:
        for w in norm(t['name']).split():
            if w not in subject and len(w) > 2:
                HIER['place_tokens'].add(w)
    for v in P.COUNTRY_ALT.values():
        HIER['place_tokens'] |= set(v.split())
    # region specificity: an app is specific to a region if no unrelated region lists it
    desc_apps = collections.defaultdict(set)
    for k, a in anc.items():
        if byid[k]['type'] == 'appellation':
            for x in a:
                if x in byid and byid[x]['type'] == 'appellation':
                    desc_apps[x].add(k)
    for rid, apps in region_apps.items():
        spec = []
        unrelated = lambda r: r != rid and r not in anc.get(rid, ()) and rid not in anc.get(r, ())
        for a in apps:
            if any(unrelated(r) for r in app_regions[a]):
                continue
            if any(unrelated(r) for d in desc_apps.get(a, ()) for r in app_regions.get(d, ())):
                continue  # a regional umbrella appellation whose children belong to other regions
            spec.append(a)
        if len(spec) > 1:
            areas = {a: (byid[a].get('area') or 0) for a in spec}
            tot = sum(areas.values())
            spec = [a for a in spec if areas[a] <= 2 * (tot - areas[a]) or len(spec) == 1]
        HIER['specific'][rid] = spec
    for t in T:
        if t['type'] == 'region' and not region_apps.get(t['id']):
            g = G.get(t['id'])
            if g is None:
                continue
            for u in T:
                if u['type'] == 'region' and u['id'] != t['id'] and u['country'] == t['country'] and not related(t['id'], u['id']):
                    h = G.get(u['id'])
                    if h is not None and g.intersects(h):
                        try:
                            if g.intersection(h).area / min(g.area, h.area) > 0.5:
                                HIER['ambig'].add(t['id'])
                                break
                        except Exception:
                            pass


_SAME = {}


def same_territory(a, b, G):
    key = (a, b) if a < b else (b, a)
    if key in _SAME:
        return _SAME[key]
    byid = HIER['byid']
    g, h = G.get(a), G.get(b)
    r = False
    if byid.get(a, {}).get('type') != 'appellation' or byid.get(b, {}).get('type') != 'appellation':
        g = None
    if g is not None and h is not None and g.intersects(h):
        try:
            inter = g.intersection(h).area
            r = inter / g.area > 0.6 and inter / h.area > 0.6
        except Exception:
            r = False
    _SAME[key] = r
    return r


def related(a, b, G=None):
    if a == b:
        return True
    A = HIER['anc']
    if b in A.get(a, ()) or a in A.get(b, ()):
        return True
    if G is not None and same_territory(a, b, G):
        return True
    return False


def core_geom(eid, G):
    """Regions: union of their own (unshared) appellations; others: own polygon."""
    if eid in _CORE:
        return _CORE[eid]
    byid = HIER['byid']
    e = byid.get(eid)
    g = G.get(eid)
    if e and e['type'] == 'region':
        spec = HIER['specific'].get(eid)
        if spec:
            from shapely.ops import unary_union
            parts = [G[a] for a in spec if G.get(a) is not None]
            if parts:
                try:
                    g = unary_union(parts)
                except Exception:
                    pass
    _CORE[eid] = g
    return g


_CORE = {}
_OVL = {}


def overlaps(a, b, G):
    key = (a, b) if a < b else (b, a)
    if key not in _OVL:
        ga, gb = core_geom(a, G), core_geom(b, G)
        r = False
        if ga is not None and gb is not None:
            try:
                if ga.intersects(gb):
                    inter = ga.intersection(gb).area
                    r = inter / max(1e-12, min(ga.area, gb.area)) > 0.3
            except Exception:
                r = False
        _OVL[key] = r
    return _OVL[key]


def point_only_approx(e, G):
    return G.get(e['id']) is None and (e.get('bq') == 'approx' or e.get('cq') == 'approx')


def related_mention(ent, oid, G):
    """Is a mention of place `oid` consistent with a photo of `ent`?"""
    byid = HIER['byid']
    o = byid[oid]
    if ent['type'] == 'country':
        return True
    if o['type'] == 'site':
        app = o.get('app') if o.get('app') in byid else None
        if ent['type'] == 'site':
            return oid == ent['id'] or haversine(ent['lat'], ent['lon'], o['lat'], o['lon']) < 2.0
        if app:
            if ent['type'] == 'appellation':
                # an estate or cru belongs to its own appellation (or a broader one), not to a sibling or a parent zone
                return app == ent['id'] or app in HIER['anc'].get(ent['id'], ()) or same_territory(ent['id'], app, G)
            return related(ent['id'], app, G)
        return in_area(ent, o['lat'], o['lon'], G, slack_km=1.0) is True and not point_only_approx(ent, G)
    if related(ent['id'], oid, G):
        return True
    if ent['type'] == 'site':
        if G.get(oid) is not None:
            return in_area(o, ent['lat'], ent['lon'], G, slack_km=1.0) is True
        return haversine(ent['lat'], ent['lon'], o['lat'], o['lon']) < 8.0 and not point_only_approx(o, G)
    ge, go = core_geom(ent['id'], G), core_geom(oid, G)
    if ge is not None and go is not None:
        return overlaps(ent['id'], oid, G)
    if point_only_approx(ent, G) or point_only_approx(o, G):
        return False
    if go is not None:
        return in_area(o, ent['lat'], ent['lon'], G, slack_km=5.0) is True
    if ge is not None:
        return in_area(ent, o['lat'], o['lon'], G, slack_km=5.0) is True
    return haversine(ent['lat'], ent['lon'], o['lat'], o['lon']) < 15.0


def other_places(ent, text, names, G):
    """Wine places of this country named in `text` that are not where this entity is."""
    if ent['type'] == 'country':
        return []
    t = ' ' + STRIP_GEO.sub(' ', text) + ' '
    for n in sorted(names, key=len, reverse=True):
        t = t.replace(' ' + n + ' ', '  ')
    own = ' ' + norm(re.sub(r'\(.*?\)', ' ', ent['name'])) + ' '
    found = []
    for n, ids in HIER['gaz'].get(ent['country'], []):
        if ' ' + n + ' ' not in t:
            continue
        t = t.replace(' ' + n + ' ', '  ')
        if own.startswith(' ' + n + ' '):
            continue  # village prefix of a cru name (Puligny-Montrachet Les Folatieres)
        if any(related_mention(ent, i, G) for i in ids):
            continue
        found.append((n, all(HIER['byid'][i]['type'] == 'site' for i in ids)))
    return found


def region_point_specific(ent, lat, lon, G):
    """For regions: is the point inside one of the region's own (unshared) appellations?"""
    from shapely.geometry import Point
    if ent['id'] in HIER['ambig']:
        return False
    spec = HIER['specific'].get(ent['id'])
    if spec is None:
        return True  # region without appellation list: its own hull decides
    pt = Point(lon, lat)
    for a in spec:
        g = G.get(a)
        if g is not None:
            try:
                if g.buffer(1.0 / 111).contains(pt):
                    return True
            except Exception:
                pass
    return False


def bare_title(title, ent):
    toks = [w for w in norm(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', title, flags=re.I)).split()
            if not re.fullmatch(r'\d+\w*|\w\d+\w*', w)]
    rest = [w for w in toks if w not in GENERIC_TOK and w not in HIER['place_tokens'] and len(w) > 2]
    return len(rest) == 0


def desc_caption(ent, m, place):
    d = strip_html(m.get('ImageDescription', ''))
    d = re.sub(r'https?://\S+', '', d)
    d = re.split(r'(?<=[.!?])\s', d)[0].strip(' .;:-')
    d = d.replace('\u2014', ',').replace('\u2013', '-')
    if not (12 <= len(d) <= 95):
        return None
    words = norm(d).split()
    strong_en = {'the', 'and', 'with', 'from', 'near', 'view', 'of', 'looking', 'towards', 'over', 'between', 'above', 'below',
                 'behind', 'across', 'along', 'its', 'this', 'at', 'on'}
    if not words or not (set(words) & strong_en) or sum(1 for w in words if w in ENGLISH) < max(1, len(words) // 5):
        return None
    if re.search(r'\b(img|dsc|jpg|file|own work|uploaded|photograph(ed)? by|camera|taken with)\b', d, re.I):
        return None
    if sum(1 for ch in d if ord(ch) > 0x24f) > 0:
        return None
    d = d[0].upper() + d[1:]
    if norm(ent['name']) not in norm(d):
        d = f'{d}, {place}'
    return d


VINE_CLAIM = re.compile(r'\b(vineyards?|vines|vineyard soil)\b', re.I)
GRAPE_CLAIM = re.compile(r'\b(grapes on the vine|harvested grapes|harvest in|harvest at)\b', re.I)


def fix_caption(ent, m, cap, ttd, cathead, gaz_names):
    """Only claim vineyards/grapes when the file's title or description (or a vineyard category on a bare title) says so."""
    typ = ent['type']
    cap = re.sub(r'\s/\s[^,]+', '', cap)
    cap = re.sub(r'\b(vineyards?)\s+\1\b', r'\1', cap, flags=re.I)
    if typ in ('grape', 'soil', 'event'):
        return cap
    vine_ok = bool(VINE_STRICT.search(ttd))  # say "vineyards" only when the file's own title or description does
    grape_ok = bool(GRAPES.search(ttd)) or bool(P.HARVEST.search(ttd))
    claim_v = bool(VINE_CLAIM.search(cap)) and not (typ == 'site' and ent.get('kind') in VINEYARD_KINDS
                                                   and re.match(r'^(The .* vineyard|Vineyards of )', cap))
    claim_g = bool(GRAPE_CLAIM.search(cap))
    if (claim_v and not vine_ok) or (claim_g and not grape_ok) or (claim_v and MIXED.search(ttd)):
        place = ent['name']
        tail = ''
        if typ == 'appellation' and ent.get('region') and norm(ent['region']) != norm(place):
            tail = ent['region']
        elif typ == 'site' and ent.get('appellation') and norm(ent['appellation']) not in norm(place):
            tail = re.sub(r'\s/\s.*$', '', ent['appellation'])
        full = f'{place}, {tail}' if tail else place
        if typ == 'country':
            full = place
        dc = desc_caption(ent, m, full)
        if dc:
            cap = dc
        elif LAND.search(ttd) and not OTHER_SUBJ.search(ttd):
            cap = f'View of {P.with_article(place)}' + (f', {tail}' if tail else '')
        else:
            cap = full
    return cap[0].upper() + cap[1:]


def clean_sig(a):
    a = re.sub(r'^This (illustration|image|photo\w*) was (made|taken|created) by \(?\s*(?:User:)?\s*([^)\s]+)\)?.*$', r'\3', a)
    a = re.sub(r'^(?:w:\w+:|\w\w:)?User:\s*', '', a)
    a = re.sub(r'^\(WT-shared\)\s*', '', a.strip())
    a = re.sub(r'\s*\(\s*talk\b.*$', '', a)
    a = re.sub(r'\s*\d{1,2}:\d{2},\s*\d{1,2}\s+\w+\s+\d{4}\s*\(UTC\).*$', '', a)
    a = re.sub(r'~\w*wiki\b', '', a)
    a = a.replace('_', ' ').strip(' .,;:')
    return a or 'Unknown author'


def judge(ent, m, why, pool_f, ts_f, G, wd_by_qid, names):
    typ = ent['type']
    if m.get('mime') not in OK_MIME:
        return 'mime'
    w, h = int(m['w']), int(m['h'])
    if w < MIN_W:
        return 'under-1000px'
    ar = h / w
    if ar < 0.38 or ar > (1.6 if typ in ('site', 'grape', 'event') else 1.34):
        return 'aspect'
    lic, _ = license_of(m)
    if not lic:
        return 'licence'
    title = m['title'][5:]
    desc = strip_html(m.get('ImageDescription', ''))
    cats = [c for c in (m.get('Categories') or '').split('|') if c]
    ttd = ntext(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', title, flags=re.I), desc)
    ttd = STREET.sub(' ', ttd)
    tall = ntext(ttd, ' '.join(cats))
    if typ in ('country', 'region', 'appellation', 'site') and m.get('mime') == 'image/png':
        return 'png-not-photo'
    if REJECT.search(ttd):
        return 'reject-words'
    if typ != 'grape':
        t2 = ' ' + ttd + ' '
        for n in names:
            t2 = t2.replace(' ' + n + ' ', ' ')
        if REJECT2.search(t2):
            return 'reject-words-2'
    tnorm0 = norm(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', title, flags=re.I))
    if typ in ('country', 'region', 'appellation') or (typ == 'site' and ent.get('kind') not in ('village', 'historic')):
        if STREET_T.search(tnorm0) and not (typ == 'site' and any(n in tnorm0 for n in names)):
            return 'street-photo'
    if any(BAD_CATS.search(c) for c in cats):
        return 'reject-cats'
    is_art = bool(ART.search(ttd))
    if typ != 'grape' and (is_art or any(ART_CATS.search(c) for c in cats)):
        return 'art-or-document'
    lat, lon = P.gps(m, pool_f, ts_f)
    # where we know where the photo was taken, it must be in the place
    if lat is not None and typ != 'grape':
        slack = {'site': 2.0 if ent.get('cq') == 'precise' else 4.0, 'appellation': 2.0, 'region': 5.0}.get(typ)
        if in_area(ent, lat, lon, G, slack_km=slack) is False:
            return 'geotag-outside'
    vine_td = bool(VINE_STRICT.search(ttd))
    cathead = cat_vine_head(m)
    site_named = typ == 'site' and any(n in norm(title) for n in names)
    if typ in ('country', 'region', 'appellation', 'site') and not vine_td and not site_named and \
            re.search(r'\b(wines?|weine?|vins?|vini|vinos?|vinhos?)\b', norm(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', title, flags=re.I))):
        return 'wine-not-vineyard'
    if typ in ('region', 'appellation'):
        for n, o in GAZ_SMALL:
            if o['id'] == ent['id'] or o['country'] != ent['country'] or (' ' + n + ' ') not in (' ' + ttd + ' '):
                continue
            if n in names or any(n in x or x in n for x in names):
                continue
            if in_area(ent, o['lat'], o['lon'], G, slack_km=10.0) is False and in_area(o, ent['lat'], ent['lon'], G) is not True:
                return 'names-other-place'
    land = bool(LAND.search(ttd))
    other = bool(OTHER_SUBJ.search(ttd))
    named_td = any(n in ttd for n in names)
    named = any(n in tall for n in names)
    if not named and typ == 'site':
        ct = core(ent['name'])
        tw_ = set(tall.split())
        named = bool(ct) and all(x in tw_ for x in ct) and sum(len(x) for x in ct) >= 5
        named_td = named and all(x in set(ttd.split()) for x in ct)
    # ---- evidence classes
    ev = []
    for s in why:
        if s.startswith('wd:'):
            _, qid, prop = s.split(':')
            r = wd_by_qid.get(qid)
            if r and prop in ('P18', 'P8592', 'P948') and wd_item_ok(ent, r, G):
                ev.append('a')
    exact = [c for c in cats if cat_exact(ent, c, names)]
    if pool_f:
        exact += [c for c in pool_f.get('cats', []) if cat_exact(ent, c, names)]
    if exact:
        ev.append('b')
    tight = None
    if lat is not None and typ in ('appellation', 'region', 'site', 'country'):
        if typ == 'site':
            tight = in_area(ent, lat, lon, G, slack_km=1.5)
        elif typ == 'country':
            tight = in_area(ent, lat, lon, G)
        else:
            tight = in_area(ent, lat, lon, G, slack_km=0.0 if G.get(ent['id']) is not None else 2.0)
    if typ in ('region', 'appellation', 'site'):
        op = other_places(ent, ttd, names, G)
        if any(is_site for _, is_site in op):
            return 'names-other-estate-or-village'
        if op and not ('a' in ev or named_td):
            return 'names-other-place'
    if tight and typ in ('appellation', 'region') and not named and point_only_approx(ent, G):
        tight = False  # approximate label point and no boundary: a nearby geotag proves nothing
    if tight and typ == 'region' and not named and not region_point_specific(ent, lat, lon, G):
        tight = False  # shared or overlapping region geometry: a geotag alone does not say which sibling it is
    if tight:
        if typ == 'site' and named:
            ev.append('c')
        elif typ != 'site' and (named or vine_td or (cathead and not other)):
            ev.append('c')
    if typ == 'country' and pool_f and pool_f.get('iso') == ent['country'] and pool_f.get('kind') == 'v' and cathead:
        ev.append('d')  # in this country's "Vineyards in ..." category tree and itself in a vineyard category
    # ---- type-specific content rules
    if typ == 'grape':
        own = {norm(ent['name'])} | {norm(x) for x in ent.get('syn') or [] if len(x) >= 4}
        if ent.get('vivc_name'):
            own.add(norm(ent['vivc_name']))
        tn = ' ' + norm(title) + ' '
        others = [n for n in P.GRAPE_NAMES if ' ' + n + ' ' in tn and not any(n in o or o in n for o in own)]
        if others and not any(' ' + o + ' ' in tn for o in own):
            return 'grape-other-variety'
        cluster = re.search(r'\b(bunch\w*|cluster\w*|berries|beeren|grappes?|grappol\w*|trauben?|racimos?|cachos?|uvas?|uve|raisins?|'
                            r'grapes?|grozd\w*|szolofurt|on the vine|weinsberg|geilweilerhof|vivc|in the field)\b', ttd)
        if re.search(r'\b(wines?|wijn|weine?|vins?|vino|vini|vinho|bottles?|glass|вино|made from)\b', ttd) and not \
                re.search(r'\b(bunch\w*|cluster\w*|berries|grappes?|grappol\w*|trauben?|racimos?|on the vine|vineyard|vigne|vigneto)\b', ttd):
            return 'grape-wine-not-grapes'
        if TITLE_OTHER.search(norm(title)) or re.search(r'\b(monument\w*|poster|cartaz|board|tafel|journal|newspaper|advert\w*)\b', ttd):
            return 'grape-not-a-cluster-photo'
        if is_art and not re.search(r'viala|vermorel|ampelograph\w*|ampelographie|planche|illustrated descriptive catalogue|grapes of new york|pomona', ttd):
            return 'grape-art-not-ampelography'
        if re.search(r'\b(leaf|leaves|blatt|blatter|feuille|feuilles|foglia|foglie|hoja|hojas)\b', ttd) and not GRAPES.search(ttd):
            return 'grape-leaf'
        own_cat = any(any(o in norm(c) for o in own) for c in cats)
        a = 'a' in ev
        if not a:
            # grape items: check every wd source
            for s in why:
                if s.startswith('wd:'):
                    r = wd_by_qid.get(s.split(':')[1])
                    if r and r.get('kind') == 'grape' and (r.get('score', 0) >= 5 or own_cat):
                        a = True
        g = any(s.startswith('gcat') for s in why) and (own_cat or any(' ' + o + ' ' in tn for o in own)) and (cluster or is_art)
        t = 'ts' in why and own_cat and any(' ' + o + ' ' in tn for o in own) and GRAPES.search(ttd)
        if not (a or g or t):
            return 'grape-not-this-variety'
        if VINE_STRICT.search(ttd) and not GRAPES.search(ttd) and re.search(r'\b(vineyards?|vignobles?|weinberge?|landscape)\b', ttd):
            return 'grape-landscape-not-cluster'
        score = (3 if a else 2) + (1.5 if GRAPES.search(ttd) else 0) - (4 if is_art else 0)
        ev = ['a' if a else ('b' if g else 'ts')]
    elif typ == 'site':
        kind = ent.get('kind') or ''
        if ev == ['a'] and not (named or tight):
            return 'wd-image-not-of-site'
        if not ev:
            return 'no-strong-evidence'
        if INTERIOR.search(ttd) and kind not in ('cellar', 'house', 'museum', 'estate', 'chateau', 'quinta', 'historic'):
            return 'interior'
        if other and not vine_td and (kind in ('village', 'landscape') or kind in VINEYARD_KINDS or kind in ESTATE_KINDS or not named_td):
            return 'generic-town-photo'
        if kind in ESTATE_KINDS and not (named or 'a' in ev):
            return 'estate-not-shown'
        full = norm(re.sub(r'\(.*?\)', ' ', ent['name']))
        if kind in ESTATE_KINDS and ev == ['c'] and full not in tall:
            return 'estate-only-village-named'
        if kind in VINEYARD_KINDS and not (vine_td or cathead):
            return 'vineyard-not-shown'
        if kind == 'village' and not (vine_td or (land and not other)):
            return 'village-not-vineyard-or-view'
        score = {'a': 3.0, 'b': 2.6, 'c': 2.2}[sorted(ev)[0]] + (0.8 if named_td else 0) + (0.4 if vine_td else 0)
    else:
        if not ev:
            return 'no-strong-evidence'
        if INTERIOR.search(ttd) or CELLAR.search(norm(title)):
            return 'interior-or-cellar'
        if other and not vine_td:
            return 'generic-town-photo'
        tnorm = STREET.sub(' ', norm(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', title, flags=re.I)))
        t_vine = bool(VINE_STRICT.search(tnorm))
        if TITLE_OTHER.search(tnorm) and not t_vine:
            return 'title-other-subject'
        big = typ in ('region', 'country') or area_km2(ent) >= 100
        if not vine_td and (MOUNT.search(ttd) or not bare_title(title, ent)) and 'a' not in ev:
            cathead = False  # a vineyard category alone is not enough when the title describes something else
        if big and BIG_BUILDING.search(tnorm) and not t_vine:
            return 'building-not-landscape'
        if big and not (vine_td or cathead):
            return 'not-vineyard-landscape'
        if not big and not (vine_td or cathead or (land and named)):
            return 'not-vineyard-or-named-view'
        score = {'a': 3.0, 'b': 2.6, 'c': 2.2, 'd': 2.0}[sorted(ev)[0]] + (1.5 if vine_td else 0.8) + (0.4 if land else 0) + (0.5 if named else 0)
        if MIXED.search(ttd):
            score -= 2.0
        if w >= h * 1.2:
            score += 0.5
    ass = m.get('Assessments') or ''
    score += (3 if 'featured' in ass else 0) + (2 if 'quality' in ass else 0) + (1 if 'valued' in ass else 0)
    score += min(w, 4000) / 4000 * 0.5
    return {'m': m, 'score': score, 'ev': ev, 'src': why[0] if why else '', 'ttd': ttd, 'tall': tall,
            'exact_cats': exact[:3], 'is_art': is_art, 'cathead': cathead, 'named_td': named_td, 'latlon': (lat, lon)}


def main():
    P.FINE_GEOMS[0] = True
    T = json.load(open(f'{W}/targets.json'))
    CNAME.update({t['id']: t['name'] for t in T if t['type'] == 'country'})
    GAZ_SMALL[:] = [(norm(t['name']), t) for t in T if t['type'] in ('site', 'appellation') and len(norm(t['name'])) >= 6
                    and (t['type'] == 'site' or 0 < (t.get('area') or 0) < 1000)]
    P.GRAPE_NAMES[:] = sorted({norm(t['name']) for t in T if t['type'] == 'grape' and len(norm(t['name'])) >= 5})
    SL = json.load(open(f'{W}/shortlist.json'))
    WD = json.load(open(f'{W}/wd_match.json'))
    MD = P.load_meta()
    pool = P.load_pool()
    TS = P.load_textsearch()
    G = P.load_geoms()
    gaz = Gazetteer(T)
    manual = {}
    for fn in ('manual_soils.json', 'manual_events.json'):
        manual.update(json.load(open(f'{W}/{fn}')))
    build_hierarchy(T, G)
    byid = {t['id']: t for t in T}
    rc = collections.Counter()
    order = {'country': 0, 'region': 1, 'appellation': 2, 'site': 3, 'grape': 4, 'soil': 5, 'event': 6}
    judged = {}
    base_rej = collections.defaultdict(list)
    for ent in T:
        tid, typ = ent['id'], ent['type']
        if tid in manual:
            continue
        names = names_of(ent) if typ != 'country' else {norm(ent['name'])}
        wd_by_qid = {r['qid']: r for r in WD.get(tid, [])}
        cands = []
        for title, w0, why in SL.get(tid, []):
            m = MD.get(title)
            if not m or m.get('missing'):
                base_rej[tid].append({'file': title, 'reason': 'no-metadata'}); continue
            r = judge(ent, m, why, pool.get(title), TS.get(tid, {}).get(title), G, wd_by_qid, names)
            if isinstance(r, str):
                base_rej[tid].append({'file': title, 'reason': r, 'src': why[0] if why else ''})
                rc[r] += 1
                continue
            cands.append(r)
        cands.sort(key=lambda x: -x['score'])
        if typ == 'grape':
            photos = [c for c in cands if not c['is_art']]
            cands = photos if photos else cands[:1]
        judged[tid] = (names, cands)

    banned = {}
    for it in range(6):
        out = collections.defaultdict(dict)
        rejected = collections.defaultdict(list, {k: list(v) for k, v in base_rej.items()})
        debug = {}
        chosen_by = {}
        for ent in sorted(T, key=lambda e: order[e['type']]):
            tid, typ = ent['id'], ent['type']
            dest = '_global' if typ in ('grape', 'soil', 'event') else ent['country']
            if tid in manual:
                res = []
                for t, cap in manual[tid]:
                    m = MD.get('File:' + t)
                    if not m or m.get('missing'):
                        rejected[tid].append({'file': 'File:' + t, 'reason': 'no-metadata'}); continue
                    lic, lurl = license_of(m)
                    th = thumbs(m) if m.get('mime') in OK_MIME else None
                    if not lic:
                        rejected[tid].append({'file': m['title'], 'reason': 'licence'}); continue
                    if int(m['w']) < MIN_W or not th:
                        rejected[tid].append({'file': m['title'], 'reason': 'under-1000px'}); continue
                    res.append(entry(m, cap, lic, lurl, th))
                    debug.setdefault(tid, []).append({'file': m['title'], 'ev': 'manual', 'cap': cap})
                if res:
                    out[dest][tid] = res[:4]
                continue
            if tid not in judged:
                continue
            names, cands = judged[tid]
            chosen, stems, authors = [], set(), collections.Counter()
            for c in cands:
                ft = c['m']['title']
                if (tid, ft) in banned:
                    rejected[tid].append({'file': ft, 'reason': banned[(tid, ft)]}); continue
                st = title_stem(ft)
                au = clean_author(c['m'])
                if st in stems or authors[au] >= 2:
                    rejected[tid].append({'file': ft, 'reason': 'near-duplicate'}); continue
                chosen.append(c); stems.add(st); authors[au] += 1
                if len(chosen) == 4:
                    break
            res = []
            for c in chosen:
                m = c['m']
                lic, lurl = license_of(m)
                th = thumbs(m)
                if not th:
                    rejected[tid].append({'file': m['title'], 'reason': 'no-standard-thumb'}); continue
                cap = describe(ent, m, c['ttd'], c['tall'], c['src'], gaz, names)
                cap = fix_caption(ent, m, cap, c['ttd'], c.get('cathead'), None)
                if typ == 'country' and norm(ent['name']) not in norm(cap):
                    cap = f"{cap}, {ent['name']}"
                res.append(entry(m, cap, lic, lurl, th))
                chosen_by.setdefault(m['title'], []).append((tid, c))
                debug.setdefault(tid, []).append({'file': m['title'], 'ev': ''.join(c['ev']), 'src': c['src'], 'score': round(c['score'], 2),
                                                  'cap': res[-1]['caption'], 'exact_cats': c['exact_cats'],
                                                  'desc': strip_html(m.get('ImageDescription', ''))[:160]})
            if res:
                out[dest][tid] = res
        # one photo on unrelated places (siblings): keep it only where it is named, else on the most specific place
        new_bans = 0
        for ft, users in chosen_by.items():
            places = [(tid, c) for tid, c in users if byid[tid]['type'] in ('region', 'appellation', 'site', 'country')]
            if len(places) < 2:
                continue
            conflicted = [(tid, c) for tid, c in places if any(not related(tid, o, G) for o, _ in places if o != tid)]
            if not conflicted:
                continue
            named = [(tid, c) for tid, c in conflicted if c.get('named_td')]
            if named:
                keep = {tid for tid, _ in named}
            else:
                def spec(x):
                    e = byid[x[0]]
                    if e['type'] == 'site':
                        la, lo = x[1].get('latlon') or (None, None)
                        return (0, haversine(e['lat'], e['lon'], la, lo) if la is not None else 99)
                    return ({'appellation': 1, 'region': 2, 'country': 3}[e['type']], e.get('area') or 1e9)
                keep = {sorted(conflicted, key=spec)[0][0]}
            for tid, c in conflicted:
                if tid not in keep and (tid, ft) not in banned:
                    banned[(tid, ft)] = 'shared-with-unrelated-place'
                    new_bans += 1
        print(f'pass {it + 1}: banned {new_bans} sibling reuses', flush=True)
        if not new_bans:
            break
    for k, v in banned.items():
        rc[v] += 1
    os.makedirs(OUTDIR, exist_ok=True)
    for f in glob.glob(f'{OUTDIR}/*.json'):
        os.remove(f)
    for dest, d in out.items():
        json.dump(dict(sorted(d.items())), open(f'{OUTDIR}/{dest}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    os.makedirs(R, exist_ok=True)
    json.dump(rejected, open(f'{R}/rejected.json', 'w'), ensure_ascii=False, indent=0)
    json.dump(debug, open(f'{R}/accepted_debug.json', 'w'), ensure_ascii=False, indent=0)
    ent_c, ph_c, tot = collections.Counter(), collections.Counter(), collections.Counter(t['type'] for t in T)
    byid = {t['id']: t for t in T}
    for dest, d in out.items():
        for k, v in d.items():
            ent_c[byid[k]['type']] += 1
            ph_c[byid[k]['type']] += len(v)
    json.dump({'entities': ent_c, 'photos': ph_c, 'total': tot}, open(f'{R}/coverage_after.json', 'w'), indent=1)
    print({k: (ent_c[k], tot[k], ph_c[k]) for k in tot})
    print('rejections', rc.most_common(25))


def entry(m, cap, lic, lurl, th):
    cap = re.sub(r'^(.*\b(?:vineyards?|winery|wines|estate|cellars?)\b[^,]*) and its vineyards', r'\1', cap, flags=re.I)
    cap = re.sub(r'^(?:Vineyards (?:at|in|of)|The) ((?:[^,]*\b)(?:Vineyards?|Winery|Wines|Estate)\b[^,]*?)(?: vineyard)?(,|$)', r'\1\2', cap)
    cap = cap.replace(' \u2013 ', ' - ').replace(' \u2014 ', ', ').replace('\u2013', '-').replace('\u2014', '-')
    au = clean_author(m)
    au = re.sub(r'\.?\s*archive copy at the Wayback Mach\w*.*$', '', au)
    au = re.sub(r'Adom\w*/Donor:\s*', 'donor ', au)
    au = re.sub(r'\.?\s*archive( copy)?\b.*$', '', au)
    au = clean_sig(au)
    au = au.replace(' \u2014 ', ', ').replace(' \u2013 ', ', ').replace('\u2014', '-').replace('\u2013', '-').strip(' .,;:')
    return {'file': m['title'], 'thumb': th['thumb'], 'w': th['w'], 'h': th['h'],
            'thumb_small': th['thumb_small'], 'w_small': th['w_small'], 'h_small': th['h_small'],
            'author': au, 'license': lic, 'license_url': lurl,
            'page': m.get('page') or P.file_page(m['title']), 'caption': cap}


if __name__ == '__main__':
    main()
