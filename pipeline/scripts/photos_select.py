#!/usr/bin/env python3
"""Select Commons photos for every atlas entity and write the photo sidecars.

  python3 scripts/photos_select.py shortlist   -> work/photos/shortlist.json + work/photos/fetch_titles.txt
  python3 scripts/photos_meta.py work/photos/fetch_titles.txt 2 1
  python3 scripts/photos_select.py pick        -> site/data/photos/{iso2}.json, _global.json, work/photos/picks_debug.json

Candidate sources (weights are preliminary; every candidate is re-checked against its Commons metadata):
  wd   P18 / P8592 / P3451 of the Wikidata item matched to the entity (photos_wikidata.py)
  wdp  the same for a matched *place* item (commune, valley): needs explicit vineyard evidence
  wdc  files in the Commons category (P373) of a matched wine/site item, as seen in the crawl pool
  cat  files in crawled categories whose name contains the entity's name (same country)
  geo  geotagged pool files inside the entity's polygon (or near its point), with vineyard evidence
  ts   Commons full-text search on the entity name (photos_textsearch.py)
  gcat files in a grape variety's Commons category
  manual  hand-picked soils and timeline events (work/photos/manual_*.json)
"""
import json, os, re, sys, collections, random, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import norm, strip_html, haversine, file_page

ROOT = '/home/claude/winesite'
D = f'{ROOT}/site/data'
W = f'{ROOT}/work/photos'
OUTDIR = f'{D}/photos'

VINE = re.compile(r'\b(vineyards?|vines?|grapevines?|vignobles?|vignes?|vigne|weinbergs?|weinberge|weinbau\w*|weinlagen?|'
                  r'reben|rebberg\w*|rebland\w*|rebhang\w*|weinhang\w*|vigneti?|vigna|vinedos?|vina|vinas|vinhas?|vinhedos?|vinya|vinyes|'
                  r'szolo\w*|vinograd\w*|vinohrad\w*|vinice|vinogorje|winnic\w*|grapes?|trauben?|raisins?|uvas?|'
                  r'vendang\w*|vendemmia|vendimia|weinlese|harvest|wine|wines|winery|wineries|wein|weingut|weinbaugebiet|vin|vins|vino|vini|vinho|vinos|'
                  r'cru|crus|terroir|aoc|doc|docg|ava|wijngaard\w*|vinicola|vitivinicol\w*|viticultur\w*|viticol\w*|'
                  r'αμπελ\w*|κρασ\w*|виноград\w*|винар\w*|ვენახ\w*|ღვინ\w*|խաղող\w*|葡萄\w*|ブドウ|ワイン|포도)\b', re.I)
VINE_STRICT = re.compile(r'\b(vineyards?|vines?|grapevines?|vignobles?|vignes?|vigne|weinbergs?|weinberge|weinlagen?|reben|rebberg\w*|rebhang\w*|'
                         r'weinhang\w*|weingarten|weinanbau|weinbau|vigneti?|vigneto|vignet[io]|vigna|vignes?|vinedos?|vina|vinas|vinhas?|vinhedos?|vinya|vinyes|szolo\w*|'
                         r'vinograd\w*|vinohrad\w*|vinice|winnic\w*|wijngaard\w*|terroir|harvest|vendang\w*|vendemmia|vendimia|weinlese|'
                         r'grapes|grape vines?|trauben|grappes?|uvas|'
                         r'αμπελ\w*|виноградник\w*|ვენახ\w*|葡萄园|ブドウ畑|포도밭)\b', re.I)
LAND = re.compile(r'\b(panoramas?|panoramic|view|views|vue|vues|veduta|blick|ansicht|vista|landscapes?|paysages?|landschaft|paesaggio|paisaje|'
                  r'paisagem|aerial|luftbild|luftaufnahme|from above|drone|valley|vallee|valle|vale|tal|hills?|hillside|slopes?|'
                  r'coteaux?|colline|collines|village|dorf|borgo|aldea|countryside|terraces?|terrasses?|terrazz\w*|socalcos|'
                  r'overview|scenery|plateau)\b', re.I)
AERIAL = re.compile(r'\b(aerial|luftbild|luftaufnahme|from above|drone|vue aerienne|veduta aerea|vista aerea|from the air|birds eye)\b', re.I)
HARVEST = re.compile(r'\b(harvest\w*|vendang\w*|vendemmia|vendimia|weinlese|lese|vindima|szuret|berba|picking)\b', re.I)
GRAPES = re.compile(r'\b(grapes?|grappes?|raisins?|uvas?|uve|trauben?|bunch\w*|cluster\w*|berries|beeren|fürt|furt|grozd\w*|szolofurt)\b', re.I)
TERRACE = re.compile(r'\b(terraces?|terrasses?|terrazz\w*|socalcos|terrassen\w*|bancales)\b', re.I)
CELLAR = re.compile(r'\b(cellars?|caves?|cave cooperative|cooperative|chais?|barrels?|barriques?|casks?|fass|fasser|botti|barricas?|keller|weinkeller|cantina|cantine|'
                    r'pince|cuverie|cave a vin|caves a vin|cellier)\b', re.I)
BUILDING = re.compile(r'\b(chateau|castle|schloss|castello|castillo|manor|manoir|mansion|villa|quinta|domaine|estate|weingut|'
                      r'winery|bodega|tenuta|fattoria|herdade|cellar door|house|maison|hof|abbey|abbaye|monastery|kloster|homestead|farmhouse|werf|'
                      r'facade|entrance|courtyard|building|tower|museum|musee|museo)\b', re.I)
REJECT = re.compile(r'\b(maps?|karte|karten|carte|cartes|mapa|mappa|locator|location map|relief map|logos?|labels?|etiquettes?|etiqueta|'
                    r'etikett\w*|bottles?|bouteilles?|flaschen?|botellas?|garrafas?|bottiglie|bottiglia|decanter|carafe|karaffe|'
                    r'coat of arms|wappen|blasons?|stemma|escudo|flags?|drapeau|diagrams?|charts?|graphs?|infographic|satellite|'
                    r'iss0\d\d|modis|landsat|sentinel|montage|collage|portraits?|selfie|stamps?|briefmarke|banknote|coins?|posters?|'
                    r'affiche|menus?|signature|screenshot|qr code|wine list|tasting|degustation|verkostung|sommeliers?|festival|'
                    r'festivals|fete des|marathon|race|rallye|rally|concert|wedding|mariage|conference|awards?|medals?|trophy|'
                    r'book cover|newspapers?|stained glass|vitrail|vitraux|altar|altarpiece|organ|orgue|gravestones?|tombstones?|tombs?|cemetery|'
                    r'cimetiere|friedhof|war memorial|monument aux morts|kriegerdenkmal|plaques?|road sign|panneaux?|traffic|'
                    r'trucks?|tractors?|traktor|trains?|railway|station|buses|airport|aircraft|ships?|boats?|people|men|women|'
                    r'girls?|boys?|children|kids|crowd|visitors|tourists|dinner|lunch|food|dish|cheese|bread|restaurant|'
                    r'glass of|wine glass|glasses|corks?|bouchon|capsules?|muselet|price|shop|store|supermarket|advertis\w*|'
                    r'chromosome|dna|microscop\w*|insect|insects|spider|beetle|bird|birds|owl|butterfl\w*|lizard|snake|dog|dogs|'
                    r'cat|cats|horse|horses|sheep|goats?|cows?|deer|boar|hare|rabbit|fireworks|selfie|wikimedians?|meetup|'
                    r'stammtisch|wikipedians?|editathon|tutorial|exhibition stand|trade fair|parade|procession|demonstration|'
                    r'protest|police|soldiers?|army|parking|car park|gas station|petrol|logo|sticker|graffiti|manhole|'
                    r'bench|toilet|interior design|bedroom|hotel room|swimming pool|pool|soil samples?|samples?|youtube|video|screenshot|'
                    r'costumes?|traditional dress|folk dance|dancers?|dance|carnival|karneval|ministers?|ministro|ministre|visita|visits?|visited|'
                    r'president|presidente|mayor|alcalde|party|parties|fiesta|blend|360|equirectangular|photosphere|fotosfera|'
                    r'talatat|relief|reliefs|artefacts?|artifacts?|gare|bahnhof|estacion|stazione|tournante|feria|sagra|weinfest|winzerfest|'
                    r'on sale|for sale|market|mercado|mercato|stall|selection|\w+karte|lageplan|uebersicht|infotafel|informationstafel|'
                    r'information board|lehrpfad|parcellaire|wagon|cart|disney|theme park|7e art|cinema|film|actors?|actress|actrice|acteur|'
                    r'singer|chanteur|politician|celebrity|nursery tag|receipt|invoice|locomotive|comboio|freight|festa|feast|cartaz|cartel|sold|selling|vendors?)\b', re.I)
ART = re.compile(r'\b(engraving|gravure|painting|peinture|gemalde|drawing|dessin|zeichnung|illustration|lithograph\w*|postcard|'
                 r'carte postale|ansichtskarte|cartolina|postal|woodcut|etching|fresco|mosaic|manuscript|codex|miniature|'
                 r'tapestry|watercolou?r|aquarelle|ampelograph\w*|herbarium|botanical|plate from|planche|tafel|viala|vermorel|'
                 r'scan|scanned|from the book|book page|page from|brevet|charter|diploma|certificate|letter|lettre|document|acte|deed|'
                 r'newspaper|journal|catalogue|catalog|advertisement|chromolitho\w*)\b', re.I)
OTHER_SUBJ = re.compile(r'\b(brunnen|brunndl|quelle|sauerbrunn|hotel|camara municipal|clock|reloj|horloge|komp|ferry|fahre|lakohaza|lakohaz|kuria|kastely|monastery|monastir|monastere|chapel|oratoire|oratory|dom|fassade|facade|pontoon|ponton|quay|pier|centro|center|centre|interpretation|visitors?|homestead|bikeway|cycleway|trail|church|chapel|eglise|kirche|chiesa|iglesia|igreja|cathedral|castle|schloss|castello|castillo|burg|ruins?|'
                        r'tower|turm|torre|bridge|pont|brucke|ponte|puente|river|riviere|fluss|fiume|lake|lac|lago|tank|tanks|press|pressoir|'
                        r'kelter|torchio|house|houses|street|rue|strasse|via|calle|square|piazza|plaza|monument|cross|croix|kreuz|'
                        r'wall|walls|fence|gate|door|portal|well|fountain|mill|moulin|muhle|mulino|road|path|museum|town hall|mairie|'
                        r'rathaus|municipio|school|ecole|harbour|harbor|beach|plage|spiaggia|forest|forets?|wald|olive|olives|'
                        r'orchard|cherry|apple|lavender|sunflower|wheat|field of)\b', re.I)
SOILW = re.compile(r'\b(soil|soils|boden|suelo|suelos|pebbles|galets|kies|gravel|stones|cailloux)\b', re.I)
VINE_HEAD = re.compile(r'^(vineyards?|vignobles?|vignes|weinberge?|weinlagen?|rebberge?|vigneti|vigne|vinedos|vinhas|vinhedos|vinyes|wijngaarden|vinohrady|vinogradi|szololtetveny\w*)\b')
ARTICLE_NAME = re.compile(r'(\b(valley|coast|hills|mountains|plains|islands|highlands|lakes|peninsula|riviera|basin|bench|range|foothills|'
                          r'heights|plateau|delta|downs|lowlands|uplands|isthmus|archipelago|wolds)$)', re.I)
INTERIOR = re.compile(r'\b(interior|interieur|innenansicht|innenraum|nave|choir|chancel|crypt|inside)\b', re.I)
BAD_CATS = re.compile(r'(wine bottles|wine labels|bottles of|labels of|maps of|locator maps|logos|coats of arms|portrait|people of|people in|'
                      r'men of|women of|men in|women in|wine tasting|cuisine|dishes|food of|interiors? of|information boards|'
                      r'plaques|advertisements|flags of|rally|marathon|tour de france|birds|insects|mammals|dogs|cats of|horses|'
                      r'animals|spiders|lepidoptera|reptiles|vehicles|tractors|trains|ships|aircraft|stamps of|selfies|wikimedians|'
                      r'festivals in|concerts|sports|cycling|road signs|signs in|graffiti|cemeteries|graves|war memorials|'
                      r'stained glass|organs|altars|sculptures|statues|wine glasses|corks|wine shops|supermarkets|restaurants|hotels|'
                      r'satellite pictures|iss expedition|maps|diagrams|charts|logos|wine bottles|bottles|meetups|wiki loves|'
                      r'protests|demonstrations|parades|processions|nightclubs|bars in)', re.I)
FREE = re.compile(r'^(cc0( 1\.0)?|cc[ -]?zero|public domain( mark)?|pd|pdm|pd-\w+.*|cc by(-sa)? \d\.\d( [a-z]{2,3}(-[a-z]{2})?)?|'
                  r'cc by(-sa)?( \d\.\d)?|cc-by(-sa)?-\d\.\d(-\w+)?)$', re.I)
SEASONS = [(re.compile(r'\b(autumn|fall colou?rs|herbst\w*|automne|autunno|otono|outono|osz|jesen|toamna)\b', re.I), 'autumn'),
           (re.compile(r'\b(winter|hiver|inverno|invierno|snow|neige|schnee|neve|nieve|zima|snowy|frost)\b', re.I), 'winter'),
           (re.compile(r'\b(spring|printemps|fruhling|primavera|tavasz|blossom\w*)\b', re.I), 'spring')]
COUNTRY_ALT = {'fr': 'france frankreich francia', 'it': 'italy italia italien italie', 'es': 'spain espana spanien espagne',
               'pt': 'portugal', 'de': 'germany deutschland allemagne germania', 'at': 'austria osterreich autriche',
               'ch': 'switzerland schweiz suisse svizzera', 'hu': 'hungary magyarorszag ungarn hongrie', 'gr': 'greece hellas griechenland',
               'us': 'united states usa california oregon washington new york virginia', 'au': 'australia', 'nz': 'new zealand',
               'za': 'south africa', 'ar': 'argentina', 'cl': 'chile', 'uy': 'uruguay', 'br': 'brazil brasil', 'ca': 'canada',
               'ro': 'romania', 'bg': 'bulgaria', 'hr': 'croatia hrvatska', 'si': 'slovenia slovenija', 'rs': 'serbia srbija',
               'cz': 'czech czechia moravia bohemia', 'sk': 'slovakia', 'ge': 'georgia sakartvelo kakheti', 'am': 'armenia',
               'md': 'moldova', 'cy': 'cyprus', 'gb': 'england united kingdom wales', 'mx': 'mexico', 'cn': 'china', 'jp': 'japan',
               'lb': 'lebanon', 'il': 'israel', 'ma': 'morocco maroc', 'tn': 'tunisia tunisie', 'dz': 'algeria algerie',
               'tr': 'turkey turkiye', 'al': 'albania shqiperia', 'me': 'montenegro', 'mk': 'macedonia', 'lu': 'luxembourg',
               'be': 'belgium belgique', 'nl': 'netherlands nederland', 'dk': 'denmark', 'pe': 'peru', 'bo': 'bolivia', 'in': 'india',
               'mt': 'malta', 'ru': 'russia', 'ua': 'ukraine crimea'}
KEEP_ART_TYPES = {'event', 'grape'}
GRAPE_NAMES = []
ART_CATS = re.compile(r'(artworks|museum of art|metropolitan museum|objects in the|archaeological artefacts|reliefs|postcards|engravings|lithographs|drawings|paintings|illustrations|documents|manuscripts|letters|'
                      r'costumes|dances|videos|screenshots|book scans|scans|newspapers|advertising)', re.I)
OK_MIME = ('image/jpeg', 'image/png', 'image/webp', 'image/tiff')


def ntext(*parts):
    return norm(' '.join(p for p in parts if p))


def load_pool():
    st = json.load(open(f'{W}/crawl_state.json'))
    return st['files']


def load_geoms():
    from shapely.geometry import shape
    G = {}
    for f in glob.glob(f'{D}/geo/*.geojson'):
        b = os.path.basename(f)
        if b.startswith('_') or '_fine' in b:
            continue
        for ft in json.load(open(f))['features']:
            if ft.get('geometry'):
                G[ft['properties']['id']] = shape(ft['geometry'])
    for ft in json.load(open(f'{D}/geo/_regions.geojson'))['features']:
        if ft.get('geometry'):
            G[ft['properties']['id']] = shape(ft['geometry'])
    if FINE_GEOMS[0]:
        for f in glob.glob(f'{D}/geo/*_fine.geojson'):
            for ft in json.load(open(f))['features']:
                i = ft['properties']['id']
                if ft.get('geometry') and i not in G:
                    try:
                        G[i] = shape(ft['geometry'])
                    except Exception:
                        pass
    return G


FINE_GEOMS = [False]


def title_stem(t):
    s = norm(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', t[5:], flags=re.I))
    s = re.sub(r'\b(img|dsc|dscn|dscf|p|pict|photo|imgp|sam|cimg|panoramio|cropped|edit|jpg|\d+\w*)\b', ' ', s)
    return ' '.join(s.split()[:5])


def load_textsearch():
    """{entity_id: {title: file_record}} from all general text-search shards."""
    out = collections.defaultdict(dict)
    for fn in glob.glob(f'{W}/textsearch*.jsonl'):
        if fn.endswith(('_soils.jsonl', '_events.jsonl')):
            continue
        for line in open(fn, encoding='utf-8'):
            try:
                d = json.loads(line)
            except Exception:
                continue
            for f in d['files']:
                out[d['id']].setdefault(f['t'], f)
    return out


def names_of(ent):
    ns = {norm(ent['name'])} | {norm(a) for a in (ent.get('alt') or []) if a}
    # drop category suffixes so "Barolo DOCG" also matches "Barolo"
    ns |= {re.sub(r'\b(aoc|aop|doc|docg|do|doca|igp|igt|ava|dac|pdo|pgi|wine region|wine)\b', '', n).strip() for n in list(ns)}
    return {n for n in ns if len(n) >= 4}


SITE_GENERIC = set(norm('chateau château domaine domaines weingut bodega bodegas quinta tenuta cantina cantine azienda agricola '
                        'fattoria castello castle castillo castelo schloss burg villa winery wines wine vineyards vineyard estate estates '
                        'cellars cellar cave caves maison house the de du des la le les di del della dei degli do da dos das y e et and of '
                        'vinicola vinos vins vini kellerei hof herdade adega casa mas cascina podere sa srl ltd inc co '
                        'unesco site archaeological ruins abbey abbaye abbazia abadia monastery monastere kloster stift church eglise '
                        'chiesa iglesia cathedral cathedrale palace palais palazzo museum musee museo royal royale real old ancient '
                        'temple tower').split())


def core(sn):
    sn = re.sub(r'\(.*?\)', ' ', sn)
    return {w for w in norm(sn).split() if w not in SITE_GENERIC and len(w) > 1}


def strict_site_match(ent, label, dist_km=None):
    """Stricter than the matcher's similarity: the Wikidata label may not add distinctive words (a vineyard
    'Musigny' is not the commune 'Chambolle-Musigny'); partial overlaps need the item to be very close."""
    names = [ent['name']]
    m = re.search(r'\((.*?)\)', ent['name'])
    if m and ent.get('kind') == 'historic':
        names.append(m.group(1))
    b = core(label)
    close = dist_km is not None and dist_km < 0.3 and ent.get('cq') == 'precise' and ent.get('kind') in ('historic', 'landscape', 'village', 'museum')
    for n in names:
        a = core(n)
        if not a or not b:
            if norm(re.sub(r'\(.*?\)', ' ', n)) == norm(label) or (not b and close):
                return True
            continue
        inter = len(a & b)
        if inter == 0:
            continue
        if ent.get('kind') in ('vineyard', 'cru', 'grand_cru', 'premier_cru', 'lieu_dit', 'mga'):
            if inter == len(b) and inter / len(a) >= 0.5:
                return True
            continue
        if inter == len(b) and (inter / len(a) >= 0.6 or close):
            return True
        if inter == len(a) and inter / len(b) >= 0.6:
            return True
    return False


def in_area(ent, lat, lon, G, slack_km=None):
    """True/False/None (None = cannot judge). Polygon with buffer, else distance from label point."""
    from shapely.geometry import Point
    typ = ent['type']
    if lat is None or lon is None:
        return None
    if typ in ('grape', 'soil', 'event'):
        return None
    if typ == 'country':
        b = ent.get('bbox')
        if not b:
            return None
        return b[0] - 0.3 <= lon <= b[2] + 0.3 and b[1] - 0.3 <= lat <= b[3] + 0.3
    if typ == 'site':
        lim = slack_km if slack_km is not None else (1.5 if ent.get('cq') == 'precise' else 5.0)
        return haversine(ent['lat'], ent['lon'], lat, lon) <= lim
    g = G.get(ent['id'])
    if g is not None:
        buf = (slack_km if slack_km is not None else (3.0 if typ == 'appellation' else 8.0)) / 111.0
        try:
            return g.buffer(buf).contains(Point(lon, lat)) if buf > 0 else g.contains(Point(lon, lat))
        except Exception:
            pass
    lim = slack_km if slack_km is not None else (8.0 if typ == 'appellation' else 40.0)
    if ent.get('bbox') and typ == 'region':
        b = ent['bbox']
        return b[0] - 0.15 <= lon <= b[2] + 0.15 and b[1] - 0.15 <= lat <= b[3] + 0.15
    return haversine(ent['lat'], ent['lon'], lat, lon) <= lim


# ---------------------------------------------------------------------------------- shortlist
def shortlist():
    from shapely.strtree import STRtree
    from shapely.geometry import Point
    T = json.load(open(f'{W}/targets.json'))
    M = json.load(open(f'{W}/wd_match.json'))
    pool = load_pool()
    TS = load_textsearch()
    GP = json.load(open(f'{W}/grape_pool.json')) if os.path.exists(f'{W}/grape_pool.json') else {}
    qi = json.load(open(f'{W}/qi.json')) if os.path.exists(f'{W}/qi.json') else {}
    G = load_geoms()
    print('pool', len(pool), 'geoms', len(G), 'ts entities', len(TS), flush=True)

    def usable(f):
        return f.get('mime', '') in OK_MIME and f.get('w', 0) >= 800 and 0.38 <= (f['h'] / f['w'] if f.get('w') else 0) <= 1.7

    P = {t: f for t, f in pool.items() if usable(f)}
    catfiles = collections.defaultdict(list)
    for t, f in P.items():
        for c in f['cats']:
            catfiles[c].append(t)
    catnorm = {c: norm(c[9:]) for c in catfiles}
    geo = [(t, f) for t, f in P.items() if 'lat' in f]
    pts = [Point(f['lon'], f['lat']) for t, f in geo]
    tree = STRtree(pts)

    def vine_ev(t, cats, kind=None):
        return bool(VINE.search(ntext(t[5:], ' '.join(c.replace('Category:', '') for c in cats)))) or kind == 'v'

    def bad(t, cats):
        return bool(REJECT.search(norm(t[5:]))) or any(BAD_CATS.search(c) for c in cats)

    SL = {}
    for ent in T:
        tid, typ, iso = ent['id'], ent['type'], ent['country']
        cand = collections.defaultdict(float)
        why = collections.defaultdict(list)

        def add(title, w, src):
            if not title.startswith('File:'):
                return
            if src not in why[title]:
                cand[title] = max(cand[title], w) + (0.3 if cand[title] else 0)
                why[title].append(src)
        for k, r in enumerate(M.get(tid, [])[:4]):
            strong = r['kind'] in ('wine', 'site', 'grape', 'event')
            if typ == 'site' and strong and not strict_site_match(ent, r.get('label') or '', r.get('dist_km')):
                strong = False
            tag = 'wd' if strong else 'wdp'
            base = (6 if strong else 2.5) - k * 0.8
            for x in r.get('p18', [])[:3]:
                add(x, base, f"{tag}:{r['qid']}:P18")
            for x in r.get('p8592', [])[:2]:
                add(x, base - 0.3, f"{tag}:{r['qid']}:P8592")
            for x in r.get('p3451', [])[:1]:
                add(x, base - 2, f"{tag}:{r['qid']}:P3451")
            c = r.get('cat')
            if c and strong:
                for x in catfiles.get('Category:' + c, [])[:60]:
                    add(x, 3.5 - k * 0.5 + (0.5 if vine_ev(x, P[x]['cats']) else 0), 'wdc:' + c)
        if typ == 'grape':
            gn = {norm(ent['name'])} | {norm(x) for x in ent.get('syn') or [] if len(x) >= 5}
            if ent.get('vivc_name'):
                gn.add(norm(ent['vivc_name']))
            for t, f in TS.get(tid, {}).items():
                tn = ' ' + norm(t[5:]) + ' '
                if usable(f) and any(' ' + n + ' ' in tn for n in gn) and not bad(t, ['Category:' + c for c in f['cats']]):
                    w = 2.0 + (1.5 if GRAPES.search(tn) else 0) - (1.5 if ART.search(tn) else 0)
                    add(t, w, 'ts')
            for f in GP.get(tid, []):
                if usable(f) and not REJECT.search(norm(f['t'][5:])):
                    w = 2.5 + (1.5 if GRAPES.search(norm(f['t'][5:])) else 0) - (1.5 if ART.search(norm(f['t'][5:])) else 0)
                    add(f['t'], w, 'gcat:' + f['cat'])
        if typ in ('appellation', 'region', 'site'):
            names = names_of(ent)
            names = {n for n in names if len(n) >= 5}
            for c, cn in catnorm.items():
                for n in names:
                    if (' ' + n + ' ') in (' ' + cn + ' '):
                        fl = [x for x in catfiles[c] if P[x].get('iso') == iso]
                        if not fl:
                            continue
                        winecat = bool(VINE.search(cn)) or cn == n
                        w = 3.0 if winecat else 1.2
                        if typ == 'site' and not winecat:
                            w = 2.0
                        for x in fl[:80]:
                            add(x, w + (0.6 if vine_ev(x, P[x]['cats']) else 0), 'cat:' + c[9:])
                        break
            g = G.get(tid)
            if typ == 'site':
                rad = 0.35 if ent.get('cq') == 'precise' else 1.2
                q = Point(ent['lon'], ent['lat']).buffer(rad / 111.0)
                for i in tree.query(q):
                    t, f = geo[i]
                    d = haversine(ent['lat'], ent['lon'], f['lat'], f['lon'])
                    if d > rad:
                        continue
                    txt = ntext(t[5:], ' '.join(c[9:] for c in f['cats']))
                    if names and any(n in txt for n in names):
                        add(t, 3.0 - d, 'geo-name')
                    elif ent.get('kind') in ('vineyard', 'cru', 'grand_cru', 'premier_cru', 'lieu_dit', 'mga', 'landscape', 'village') \
                            and vine_ev(t, f['cats'], f.get('kind')) and not bad(t, f['cats']):
                        add(t, 1.5 - d, 'geo-vine')
            else:
                if g is not None:
                    hits = [geo[i] for i in tree.query(g) if g.contains(pts[i])]
                else:
                    rad = 4.0 if typ == 'appellation' else 15.0
                    q = Point(ent['lon'], ent['lat']).buffer(rad / 111.0)
                    hits = [geo[i] for i in tree.query(q) if haversine(ent['lat'], ent['lon'], geo[i][1]['lat'], geo[i][1]['lon']) <= rad]
                hv = [(t, f) for t, f in hits if vine_ev(t, f['cats'], f.get('kind')) and not bad(t, f['cats'])]
                random.Random(tid).shuffle(hv)
                hv.sort(key=lambda x: (-(x[0] in qi), -(x[1].get('kind') == 'v'), -min(x[1]['w'], 4000)))
                for t, f in hv[:25]:
                    add(t, 2.0 + (1 if t in qi else 0) + (0.5 if f.get('kind') == 'v' else 0), 'geo')
            # full-text search hits
            for t, f in TS.get(tid, {}).items():
                if not usable(f) or bad(t, ['Category:' + c for c in f['cats']]):
                    continue
                txt = ntext(t[5:], ' '.join(f['cats']))
                named = any(n in txt for n in names) if names else False
                loc = in_area(ent, f.get('lat'), f.get('lon'), G)
                if loc is False:
                    continue
                if typ == 'site':
                    if not named:
                        continue
                    add(t, 2.6 + (1 if loc else 0), 'ts')
                else:
                    if not (VINE.search(txt) or loc):
                        continue
                    add(t, 1.8 + (0.8 if named else 0) + (1.2 if loc else 0) + (0.5 if VINE_STRICT.search(txt) else 0), 'ts')
        if typ == 'country':
            cname = norm(ent['name'])
            for t, f in TS.get(tid, {}).items():
                if not usable(f) or bad(t, ['Category:' + c for c in f['cats']]):
                    continue
                txt = ntext(t[5:], ' '.join(f['cats']))
                if cname in txt and (VINE_STRICT.search(txt) or re.search(r'\b(winery|wineries|bodega|vinedo)\b', txt)) \
                        and in_area(ent, f.get('lat'), f.get('lon'), G) is not False:
                    add(t, 2.2 + (0.8 if VINE_STRICT.search(txt) else 0), 'ts')
            fl = [(t, f) for t, f in P.items() if f.get('iso') == iso and f.get('kind') == 'v' and not bad(t, f['cats'])]
            bycat = collections.defaultdict(list)
            for t, f in fl:
                bycat[f['cats'][0]].append((t, f))
            order = []
            for c, lst in bycat.items():
                lst.sort(key=lambda x: (-(x[0] in qi), -min(x[1]['w'], 5000)))
                order.append(lst)
            k = 0
            while len(cand) < 45 and any(order) and k < 60:
                for lst in order:
                    if lst:
                        t, f = lst.pop(0)
                        add(t, 2.0 + (2 if t in qi else 0) + (0.5 if f['w'] >= 2500 else 0) + (1 if f.get('lat') else 0), 'country')
                order = [l for l in order if l]
                k += 1
        ranked = sorted(cand.items(), key=lambda x: -x[1])
        keep = {'country': 45, 'region': 14, 'appellation': 10, 'site': 8, 'grape': 8, 'soil': 0, 'event': 0}[typ]
        SL[tid] = [[t, round(w, 2), why[t]] for t, w in ranked[:keep]]
    json.dump(SL, open(f'{W}/shortlist.json', 'w'), ensure_ascii=False)
    allt = {x[0] for v in SL.values() for x in v}
    for fn in ('manual_soils.json', 'manual_events.json'):
        if os.path.exists(f'{W}/{fn}'):
            for v in json.load(open(f'{W}/{fn}')).values():
                allt |= {'File:' + t for t, _ in v}
    allt = sorted(allt)
    open(f'{W}/fetch_titles.txt', 'w').write('\n'.join(allt) + '\n')
    cnt = collections.Counter()
    for ent in T:
        cnt[(ent['type'], bool(SL.get(ent['id'])))] += 1
    print(sorted(cnt.items()))
    print('titles to fetch', len(allt))


# ---------------------------------------------------------------------------------- pick
def load_meta():
    M = {}
    for line in open(f'{W}/meta.jsonl', encoding='utf-8'):
        try:
            d = json.loads(line)
        except Exception:
            continue
        if d.get('missing') and d['title'] in M:
            continue
        M[d['title']] = d
    return M


def clean_author(m):
    a = strip_html(m.get('Artist', ''))
    a = re.sub(r'\s*\(?(talk|discussion|diskussion|discussione|contribs)\)?\s*$', '', a, flags=re.I)
    a = re.sub(r'^(photo(graph)?( by)?|foto|author)\s*:\s*', '', a, flags=re.I)
    a = a.replace('No machine-readable author provided.', '').strip()
    a = re.sub(r'\s*assumed \(based on copyright claims\)\.?', '', a, flags=re.I).strip()
    if not a or a.lower() in ('unknown', 'unknown author', 'anonymous'):
        cr = strip_html(m.get('Credit', ''))
        a = 'Unknown author' if not cr or len(cr) > 80 else cr
    if len(a) > 90:
        a = re.split(r'[;\n]| - |, ', a)[0][:90]
    return a.strip(' .,;')


def license_of(m):
    ls = strip_html(m.get('LicenseShortName', '')).strip()
    if not ls or not FREE.match(ls):
        return None, None
    url = m.get('LicenseUrl', '')
    if not url:
        if re.match(r'cc0', ls, re.I):
            url = 'https://creativecommons.org/publicdomain/zero/1.0/'
        else:
            url = m.get('page') or ''
    url = url.replace('http://', 'https://')
    return ls, url


def thumb_of(m):
    u = (m.get('thumb') or '').split('?')[0]
    u = u.replace('https://thumb.wikimedia.org/', 'https://upload.wikimedia.org/')
    return u


def gps(m, pool_f=None, ts_f=None):
    try:
        if m.get('GPSLatitude') and m.get('GPSLongitude'):
            return float(m['GPSLatitude']), float(m['GPSLongitude'])
    except ValueError:
        pass
    for f in (pool_f, ts_f):
        if f and f.get('lat') is not None and f.get('lon') is not None:
            return f['lat'], f['lon']
    return None, None


def season_of(txt):
    for rx, s in SEASONS:
        if rx.search(txt):
            return s
    return None


class Gazetteer:
    """Known place names per country (appellations, regions, sites) for caption context."""

    def __init__(self, T):
        self.by = collections.defaultdict(list)
        for t in T:
            if t['type'] in ('appellation', 'region', 'site'):
                n = norm(t['name'])
                if len(n) >= 5 and n not in ('vin de pays', 'vino de la tierra'):
                    self.by[t['country']].append((n, t))
        for k in self.by:
            self.by[k].sort(key=lambda x: -len(x[0]))

    def find(self, iso, text, exclude_ids=(), types=('site', 'appellation')):
        t = ' ' + text + ' '
        for n, ent in self.by.get(iso, []):
            if ent['id'] in exclude_ids or ent['type'] not in types:
                continue
            if ' ' + n + ' ' in t:
                return ent
        return None


def describe(ent, m, txt_title_desc, txt_all, src, gaz, names_cache):
    """Build a short factual caption from the file's own evidence and our match."""
    typ = ent['type']
    name = ent['name']
    if typ == 'grape':
        if ART.search(txt_title_desc):
            if re.search(r'viala|vermorel', txt_title_desc):
                return f"{name} in Viala and Vermorel's Ampélographie (1901 to 1910)"
            return f'{name} in a historical ampelography plate'
        if re.search(r'\b(leaf|leaves|blatt|blatter|feuille|feuilles|foglia|foglie|hoja|hojas)\b', txt_title_desc) and not GRAPES.search(txt_title_desc):
            return f'A leaf of {name}'
        if re.search(r'\b(flower\w*|bloom\w*|blute|fioritura|floraison|inflorescence)\b', txt_title_desc):
            return f'{name} vine in flower'
        if re.search(r'\b(plant|whole vine|vine stock|rebstock|cep|ceps|pianta|cepa|stock)\b', txt_title_desc) and not GRAPES.search(txt_title_desc):
            return f'{name} vine'
        if GRAPES.search(txt_title_desc):
            return f'{name} grapes'
        if VINE_STRICT.search(txt_title_desc):
            return f'{name} vines'
        return name
    # place-like
    ctx = ''
    if typ == 'appellation':
        reg = ent.get('region') or ''
        ctx = reg if reg and norm(reg) != norm(name) else ''
    elif typ == 'site':
        ap = ent.get('appellation') or ''
        ctx = ap if ap and norm(ap) not in norm(name) else ''
    elif typ == 'region':
        ctx = ''
    place = name
    near = None
    if typ in ('country', 'region', 'appellation'):
        near = gaz.find(ent['country'], txt_title_desc, exclude_ids={ent['id']}, types=('site',) if typ == 'appellation' else ('site', 'appellation'))
        if near is not None and typ == 'appellation' and (norm(near['name']) in norm(name) or norm(name) in norm(near['name'])):
            near = None
    season = season_of(txt_title_desc)
    aerial = bool(AERIAL.search(txt_title_desc))
    if typ == 'site':
        # the estate itself
        kind = ent.get('kind') or ''
        vy = re.search(r'\b(vineyards?|vines|vignobles?|vignes|vigne|weinberge?|weinlagen?|rebberge?|vigneti|vigna|vinedos?|vinhas?|'
                       r'vinhedos?|vinyes|szolo\w*|vinograd\w*|vinohrad\w*)\b', txt_title_desc)
        own_cellar = bool(CELLAR.search(norm(name)))
        vkinds = ('vineyard', 'cru', 'grand_cru', 'premier_cru', 'lieu_dit', 'mga')
        if aerial:
            base = f'Aerial view of {name}'
        elif re.search(r'\b(museum|musee|museo|muzeum)\b', txt_title_desc) and kind != 'museum':
            base = f'The museum at {name}'
        elif re.search(r'\bcellar door\b', txt_title_desc):
            base = f'The cellar door at {name}'
        elif CELLAR.search(txt_title_desc) and not own_cellar and kind not in ('village', 'landscape') and not vy:
            base = f'Cellar at {name}'
        elif vy and kind in ('chateau', 'estate', 'quinta', 'house', 'cellar', 'museum', 'historic'):
            base = f'{name} and its vineyards'
        elif BUILDING.search(txt_title_desc) and not vy:
            base = name
        elif vy or kind in vkinds:
            base = f'The {name} vineyard' if kind in vkinds and not re.match(r'(the|le|la|les|il|el|der|die|das|clos|chateau|domaine)\b', norm(name)) else f'Vineyards of {name}'
        elif kind == 'village' and LAND.search(txt_title_desc):
            base = f'View of {name}'
        else:
            base = name
        if base.startswith('Vineyards of ') and kind == 'village':
            base = f'Vineyards at {name}'
        return f'{base}, {ctx}' if ctx else base
    # subject: say "vineyards" only when the title/description says so, or when the file sits in a
    # "Vineyards in/of ..." category and its title names no other subject
    where = with_article(place)
    if near is not None:
        prep = 'at' if near['type'] == 'site' and near.get('kind') not in ('village', 'landscape') else ('near' if near['type'] == 'site' else 'in')
        loc_phrase = f'{prep} {with_article(near["name"])}'
        tail = ctx if typ == 'appellation' else name
    else:
        loc_phrase = f'in {where}'
        tail = ctx
    vine_td = bool(VINE_STRICT.search(txt_title_desc))
    other = bool(OTHER_SUBJ.search(txt_title_desc)) or bool(BUILDING.search(txt_title_desc))
    vine_cat = cat_vine_head(m) and not other and not CELLAR.search(txt_title_desc)
    vine = vine_td or vine_cat
    title_only = norm(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', m['title'][5:], flags=re.I))
    if CELLAR.search(title_only) and not VINE_STRICT.search(title_only):
        cap = f'A wine cellar {loc_phrase}'
    elif aerial:
        cap = f'Aerial view of vineyards {loc_phrase}' if vine else f'Aerial view of {with_article(near["name"]) if near is not None else where}'
    elif SOILW.search(txt_title_desc) and (vine_td or VINE.search(txt_title_desc)):
        cap = f'Vineyard soil {loc_phrase}'
    elif HARVEST.search(txt_title_desc) and vine_td:
        cap = f'Harvest {loc_phrase}'
    elif vine_td and TERRACE.search(txt_title_desc):
        cap = f'Terraced vineyards {loc_phrase}'
    elif GRAPES.search(txt_title_desc) and re.search(r'\b(baskets?|crates?|boxes|bins?|lugs?|harvested|picked|cagettes?|caisses?|cassette)\b', txt_title_desc):
        cap = f'Harvested grapes {loc_phrase}'
    elif vine_td and GRAPES.search(txt_title_desc) and not re.search(r'\b(vineyards?|vignobles?|weinberge?|vigneti|vinedos|vinhas|vinhedos)\b', txt_title_desc):
        cap = f'Grapes on the vine {loc_phrase}'
    elif vine:
        cap = f'Vineyards {loc_phrase}'
        if season == 'autumn':
            cap = f'Autumn vineyards {loc_phrase}'
        elif season in ('winter', 'spring'):
            cap = f'{cap} in {season}'
    elif CELLAR.search(txt_title_desc):
        cap = f'A wine cellar {loc_phrase}'
    elif LAND.search(txt_title_desc) and not other:
        cap = f'View of {with_article(near["name"]) if near is not None else where}'
    else:
        cap = near['name'] if near is not None else place
    if tail and norm(tail) not in norm(cap):
        cap = f'{cap}, {tail}'
    return cap[0].upper() + cap[1:]


def with_article(n):
    return f'the {n}' if ARTICLE_NAME.search(n.strip()) and not n.lower().startswith('the ') else n


def cat_vine_head(m):
    return any(VINE_HEAD.match(norm(c)) for c in (m.get('Categories') or '').split('|'))


def pick():
    T = json.load(open(f'{W}/targets.json'))
    GRAPE_NAMES[:] = sorted({norm(t['name']) for t in T if t['type'] == 'grape' and len(norm(t['name'])) >= 5})
    SL = json.load(open(f'{W}/shortlist.json'))
    MD = load_meta()
    pool = load_pool()
    TS = load_textsearch()
    G = load_geoms()
    gaz = Gazetteer(T)
    manual = {}
    for fn in ('manual_soils.json', 'manual_events.json'):
        if os.path.exists(f'{W}/{fn}'):
            manual.update(json.load(open(f'{W}/{fn}')))
    country_names = {t['id']: t['name'] for t in T if t['type'] == 'country'}
    out = collections.defaultdict(dict)
    debug = {}
    used_first = collections.Counter()
    rej = collections.Counter()
    order = {'country': 0, 'region': 1, 'appellation': 2, 'site': 3, 'grape': 4, 'soil': 5, 'event': 6}
    for ent in sorted(T, key=lambda e: order[e['type']]):
        tid, typ = ent['id'], ent['type']
        dest = '_global' if typ in ('grape', 'soil', 'event') else ent['country']
        picks = []
        if tid in manual:
            for t, cap in manual[tid]:
                m = MD.get('File:' + t)
                if not m or m.get('missing'):
                    rej['manual-missing'] += 1
                    continue
                lic, lurl = license_of(m)
                if not lic or m.get('mime') not in OK_MIME or int(m['w']) < 800 and int(m['h']) < 800:
                    rej['manual-licence/size'] += 1
                    continue
                picks.append(entry(m, cap, lic, lurl))
                debug.setdefault(tid, []).append({'file': m['title'], 'src': 'manual', 'cap': cap})
            if picks:
                out[dest][tid] = picks[:4]
            continue
        names = names_of(ent) if typ != 'country' else {norm(ent['name'])}
        cands = []
        for title, w0, why in SL.get(tid, []):
            m = MD.get(title)
            if not m or m.get('missing'):
                rej['no-meta'] += 1
                continue
            r = judge(ent, m, w0, why, pool.get(title), TS.get(tid, {}).get(title), G, names, country_names)
            if isinstance(r, str):
                rej[r] += 1
                continue
            cands.append(r)
        cands.sort(key=lambda x: -x['score'])
        chosen, stems, authors = [], set(), collections.Counter()
        for c in cands:
            st = title_stem(c['m']['title'])
            au = clean_author(c['m'])
            if st in stems or authors[au] >= 2:
                continue
            if not chosen and used_first[c['m']['title']] and len(cands) > 1:
                # prefer a picture not already leading another profile
                alt = [x for x in cands if not used_first[x['m']['title']] and x['score'] >= c['score'] - 1.5]
                if alt and alt[0] is not c:
                    continue
            chosen.append(c)
            stems.add(st)
            authors[au] += 1
            if len(chosen) == 4:
                break
        if not chosen and cands:
            chosen = cands[:1]
        if chosen:
            used_first[chosen[0]['m']['title']] += 1
        res = []
        for c in chosen:
            m = c['m']
            lic, lurl = license_of(m)
            cap = describe(ent, m, c['ttd'], c['tall'], c['src'], gaz, names)
            if typ == 'country' and norm(ent['name']) not in norm(cap):
                cap = f"{cap}, {ent['name']}"
            res.append(entry(m, cap, lic, lurl))
            debug.setdefault(tid, []).append({'file': m['title'], 'src': c['src'], 'score': round(c['score'], 2), 'cap': cap,
                                              'desc': strip_html(m.get('ImageDescription', ''))[:160],
                                              'cats': (m.get('Categories') or '')[:200]})
        if res:
            out[dest][tid] = res
    # fallbacks: a region without its own pictures borrows the lead pictures of its appellations,
    # a country without any borrows from its regions and appellations (captions name the place shown)
    byid = {t['id']: t for t in T}
    nfb = collections.Counter()
    for ent in T:
        if ent['type'] != 'region' or ent['id'] in out.get(ent['country'], {}):
            continue
        got, seen = [], set()
        for aid in ent.get('apps') or []:
            for e in out.get(ent['country'], {}).get(aid, [])[:1]:
                if e['file'] not in seen:
                    got.append(dict(e)); seen.add(e['file'])
        if got:
            out[ent['country']][ent['id']] = got[:3]
            nfb['region'] += 1
            debug[ent['id']] = [{'file': e['file'], 'src': 'fallback-apps', 'cap': e['caption']} for e in got[:3]]
    for ent in T:
        if ent['type'] != 'country' or ent['id'] in out.get(ent['id'], {}):
            continue
        d = out.get(ent['id'], {})
        pool_e = []
        for k in sorted(d, key=lambda k: (0 if k.startswith('region-') else 1, k)):
            if byid.get(k, {}).get('type') in ('region', 'appellation'):
                pool_e += d[k][:1]
        got, seen = [], set()
        for e in pool_e:
            if e['file'] not in seen:
                e = dict(e)
                if norm(ent['name']) not in norm(e['caption']):
                    e['caption'] = f"{e['caption']}, {ent['name']}"
                got.append(e); seen.add(e['file'])
        if got:
            out.setdefault(ent['id'], {})[ent['id']] = got[:4]
            nfb['country'] += 1
            debug[ent['id']] = [{'file': e['file'], 'src': 'fallback-children', 'cap': e['caption']} for e in got[:4]]
    print('fallbacks', dict(nfb))
    os.makedirs(OUTDIR, exist_ok=True)
    for f in glob.glob(f'{OUTDIR}/*.json'):
        os.remove(f)
    for dest, d in out.items():
        json.dump(dict(sorted(d.items())), open(f'{OUTDIR}/{dest}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    json.dump(debug, open(f'{W}/picks_debug.json', 'w'), ensure_ascii=False, indent=0)
    cnt = collections.Counter()
    for ent in T:
        dest = '_global' if ent['type'] in ('grape', 'soil', 'event') else ent['country']
        cnt[(ent['type'], ent['id'] in out.get(dest, {}))] += 1
    print(sorted(cnt.items()))
    print('rejections', rej.most_common(30))


def entry(m, cap, lic, lurl):
    tw, th = int(m.get('tw') or 0), int(m.get('th') or 0)
    if not tw:
        w, h = int(m['w']), int(m['h'])
        tw, th = 640, round(640 * h / w)
    return {'file': m['title'], 'thumb': thumb_of(m), 'w': tw, 'h': th, 'author': clean_author(m), 'license': lic,
            'license_url': lurl, 'page': m.get('page') or file_page(m['title']), 'caption': cap}


def judge(ent, m, w0, why, pool_f, ts_f, G, names, country_names):
    """Return a candidate dict, or a rejection reason string."""
    typ = ent['type']
    src = why[0] if why else ''
    srcs = ' '.join(why)
    if m.get('mime') not in OK_MIME:
        return 'mime'
    w, h = int(m['w']), int(m['h'])
    if w < 800:
        return 'small'
    ar = h / w
    if ar < 0.38 or ar > (1.7 if typ in ('site', 'event', 'grape') else 1.5):
        return 'aspect'
    lic, _ = license_of(m)
    if not lic:
        return 'licence'
    if not thumb_of(m):
        return 'nothumb'
    title = m['title'][5:]
    desc = strip_html(m.get('ImageDescription', ''))
    cats = m.get('Categories') or ''
    ttd = ntext(re.sub(r'\.(jpe?g|png|tiff?|webp)$', '', title, flags=re.I), desc)
    tall = ntext(ttd, cats.replace('|', ' '))
    if REJECT.search(ttd):
        return 'reject-words'
    catlist = cats.split('|')
    if any(BAD_CATS.search(c) for c in catlist):
        return 'reject-cats'
    is_art = bool(ART.search(ttd))
    if is_art and typ not in KEEP_ART_TYPES:
        return 'art'
    if typ not in KEEP_ART_TYPES and any(ART_CATS.search(c) for c in catlist):
        return 'art-cats'
    if INTERIOR.search(ttd) and not (typ == 'site' and ent.get('kind') in ('cellar', 'house', 'museum', 'estate', 'chateau', 'quinta', 'historic')):
        return 'interior'
    lat, lon = gps(m, pool_f, ts_f)
    loc = in_area(ent, lat, lon, G)
    strong = any(s.startswith('wd:') for s in why)
    if loc is False and not (typ == 'site' and strong and in_area(ent, lat, lon, G, slack_km=8.0)):
        return 'far'
    named = any(n in tall for n in names)
    if not named and typ == 'site':
        ct = core(ent['name'])
        tw_ = set(tall.split())
        named = bool(ct) and all(x in tw_ for x in ct) and sum(len(x) for x in ct) >= 5
    vine_s = bool(VINE_STRICT.search(tall))
    vine_td = bool(VINE_STRICT.search(ttd))
    land = bool(LAND.search(ttd))
    score = w0
    if typ == 'grape':
        if not (strong or any(s.startswith(('gcat', 'ts')) for s in why)):
            return 'grape-src'
        if not strong and not any(s.startswith('gcat') for s in why) and not GRAPES.search(ttd) and not VINE_STRICT.search(ttd):
            return 'grape-ts-weak'
        if re.search(r'\b(wine|wines|vin|vino|wein)\b', ttd) and not GRAPES.search(ttd):
            return 'grape-wine'
        own = {norm(ent['name'])} | {norm(x) for x in ent.get('syn') or []}
        tnorm = ' ' + norm(title) + ' '
        others = [n for n in GRAPE_NAMES if ' ' + n + ' ' in tnorm and not any(n in o or o in n for o in own)]
        if others and not any(' ' + o + ' ' in tnorm for o in own):
            return 'grape-other-variety'
        score += (1.5 if GRAPES.search(ttd) else 0) - (3.5 if is_art else 0)
    elif typ == 'site':
        bld = bool(BUILDING.search(ttd))
        if not (strong or named or (loc and vine_s and ent.get('kind') in ('vineyard', 'cru', 'grand_cru', 'premier_cru', 'lieu_dit', 'mga', 'landscape', 'village'))):
            return 'site-noevidence'
        if 'ts' in srcs and not strong and not loc:
            # text-search only, no coordinates: require the name in title/description and some context
            if not any(n in ttd for n in names):
                return 'site-ts-weak'
            ctxw = norm(' '.join([ent.get('appellation') or '', country_names.get(ent['country'], ''), COUNTRY_ALT.get(ent['country'], '')]))
            if not any(x in tall for x in ctxw.split() if len(x) >= 5) and not (pool_f and pool_f.get('iso') == ent['country']):
                return 'site-ts-nocontext'
        score += (1.0 if loc else 0) + (0.8 if named else 0) + (0.4 if bld else 0) + (0.4 if vine_s else 0)
    else:
        # country / region / appellation: must show vineyards, or a landscape tied to the place
        other = bool(OTHER_SUBJ.search(ttd)) or bool(BUILDING.search(ttd))
        cathead = cat_vine_head(m) and not other
        ev_strong = vine_td or cathead
        wdp_only = all(s.startswith('wdp') for s in why)
        if wdp_only:
            small = ent.get('area') and ent['area'] < 300
            if not (ev_strong or (land and small and loc and not other)):
                return 'place-noevidence'
        elif not (ev_strong or ((vine_s or land) and (loc or named or strong))):
            return 'noevidence'
        if 'ts' in srcs and not (strong or loc or any(s.startswith(('cat', 'wdc', 'geo', 'country')) for s in why)):
            if not named:
                return 'ts-unnamed'
            ctxw = norm(' '.join([ent.get('region') or '', country_names.get(ent['country'], ''), COUNTRY_ALT.get(ent['country'], '')]))
            if not any(x in tall for x in ctxw.split() if len(x) >= 5) and not (pool_f and pool_f.get('iso') == ent['country']):
                return 'ts-nocontext'
        if CELLAR.search(ttd) and not vine_td:
            score -= 1.0
        if other and not vine_td:
            score -= 1.5
        score += (1.5 if vine_td else (0.8 if cathead else (0.4 if vine_s else 0))) + (0.4 if land else 0) + (0.8 if loc else 0) + (0.3 if named else 0)
        if w >= h * 1.2:
            score += 0.5
    ass = m.get('Assessments') or ''
    score += (3 if 'featured' in ass else 0) + (2 if 'quality' in ass else 0) + (1 if 'valued' in ass else 0)
    score += min(w, 4000) / 4000 * 0.5
    return {'m': m, 'score': score, 'src': src, 'ttd': ttd, 'tall': tall}


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'shortlist':
        shortlist()
    elif cmd == 'pick':
        pick()
