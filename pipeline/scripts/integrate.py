#!/usr/bin/env python3
"""Vitis Mundi integration step: research JSON + geodata -> the site data contract.

Run:    python3 -I /home/claude/winesite/scripts/integrate.py [--root DIR] [--no-clim] [--force-clim] [--no-topo] [-v]

Reads   site/data/geo/{iso2}.geojson, {iso2}_fine.geojson   (agent outputs; pristine copies kept in
                                                             work/geo_src/, outputs always rebuilt from them)
        site/data/base/countries.geojson                     (country names + coordinate validation)
        data/content/*.json, data/content/global/*.json      (research JSON, never modified)
        scripts/climate_enrich.py, scripts/topo_merge.py     (optional; climate for features lacking a cached value)
        work/*-log.md, work/*/*log*                          (geodata source citations)
Writes  site/data/geo/{iso2}[_fine].geojson + _countries/_index/_overview/_regions/_sites/
        _extra_points/_varieties/_climrefs, site/data/content/{iso2}.json + global/, site/data/meta.json,
        work/integration-report.md

Rerunnable and idempotent. Geo refresh rules (work/geo_src/_manifest.json, _outprints.json):
  * site file unchanged since our last write -> use the pristine copy;
  * changed and carrying no derived keys (style/prof/lvl) -> a fresh agent delivery, copied;
  * changed but built from our output: if features were appended, removed or had name/geometry edited
    (V2 depth agents append to {iso2}_fine.geojson in place), the pristine copy is rebuilt from it.
Climate: `clim` is derived data. It is never taken from geo inputs or pristine copies; it comes from the
versioned cache work/geo_src/_clim_v.json (key = id + geometry + lp + area + 30 m topo target; the cache is
dropped when climate_enrich.py / climate_downscale.py / work/climate_lapse.json change), and missing values
are computed by running climate_enrich.py on temporary files of just those features. Values written into our
outputs by a direct climate_enrich.py run are accepted when that file is newer than the climate code.
scripts/topo_merge.py (if present) runs first; site/data/topo/_attrs.json clim columns are re-synced at the end.
Profiles join polygons and fine units by explicit `id` first (V2 depth files), then by name. Fine-unit profiles
go to site/data/content/{iso2}_fine.json (`fine_profiles`), or inline with --inline-fine-profiles. Missing,
partial or malformed inputs are skipped with a warning. Tests: work/fixtures/make_fixtures.py (v1) and
work/fixtures/test_v2.py (V2 depth cases, asserts).
"""
import argparse
import glob
import hashlib
import json
import math
import os
import re
import shutil
import subprocess
import sys
import time
import unicodedata
from collections import Counter, OrderedDict, defaultdict
from datetime import datetime, timezone

import shapely
from shapely.geometry import MultiPoint, MultiPolygon, Point, Polygon, box, shape
from shapely.geometry.polygon import orient
from shapely.strtree import STRtree

try:
    from shapely.ops import polylabel
except Exception:  # pragma: no cover
    polylabel = None
try:
    from rapidfuzz import fuzz, process as rf_process
except Exception:  # pragma: no cover
    fuzz = rf_process = None
try:
    from pyproj import Geod
    GEOD = Geod(ellps="WGS84")
except Exception:  # pragma: no cover
    GEOD = None

DEFAULT_ROOT = "/home/claude/winesite"
STYLES = ("red", "white", "rose", "sparkling", "sweet", "fortified", "orange")
ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
GEO_FILE_RE = re.compile(r"^([a-z]{2})(_fine)?\.geojson$")
CONTENT_KEYS = ("countries", "regions", "appellations", "sites")
DERIVED_KEYS = ("style", "prof", "lvl", "fine", "pref", "ctx")
BQ_RANK = {"official": 0, "commune": 1, "admin": 2, "approx": 3}
METHOD_RANK = {"id": 0, "exact": 1, "variant": 2, "translit": 3, "fuzzy": 4}
TRANSLIT_COUNTRIES = {"gr", "cy", "bg", "mk", "rs", "me", "ru", "ua", "by", "ge", "am", "kz", "md"}
ISO_ALIASES = {"uk": "gb", "el": "gr", "en": "gb"}
NAME_ISO_EXTRA = {"usa": "us", "united states": "us", "england": "gb", "great britain": "gb",
                  "czech republic": "cz", "czechia": "cz", "macedonia": "mk", "north macedonia": "mk",
                  "south africa": "za", "new zealand": "nz", "russia": "ru", "moldova": "md",
                  "georgia": "ge", "kosovo": "xk", "turkey": "tr", "turkiye": "tr", "china": "cn",
                  "south korea": "kr", "bosnia and herzegovina": "ba", "holland": "nl"}
BANNED = ["delve", "robust", "seamless", "game-changer", "unlock", "leverage", "comprehensive",
          "cutting-edge", "transformative", "innovative", "it's worth noting", "nestled", "boasts",
          "tapestry", "testament"]
FIRST_WINS = {"name", "iso2", "country", "id", "cat", "subcat", "tier", "created", "dominant_style",
              "region", "subregion", "kind", "class", "appellation", "coord_quality", "parent_region",
              "tagline", "lat", "lon", "zoom", "area_ha"}
NO_CLEAN_KEYS = {"url", "id", "match"}

SOURCE_REGISTRY = {
    "eupdo": {"title": "Candiago S, Tscholl S, Bassani L, Fraga H, Egarter Vigl L (2022). A geospatial inventory "
                       "of regulatory information for wine protected designations of origin in Europe. "
                       "Scientific Data 9:394", "licence": "CC BY 4.0",
              "url": "https://doi.org/10.6084/m9.figshare.c.5877659"},
    "inao": {"title": "INAO, Délimitation parcellaire des AOC viticoles (data.gouv.fr)",
             "licence": "Licence Ouverte / Open Licence 2.0",
             "url": "https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/"},
    "ucdavis": {"title": "UC Davis Library AVA Digitizing Project (TTB American Viticultural Area boundaries)",
                "licence": "CC0 1.0", "url": "https://github.com/UCDavisLibrary/ava"},
    "wineaus": {"title": "Wine Australia, Geographical Indication boundaries (data.gov.au)",
                "licence": "CC BY 4.0", "url": "https://data.gov.au/"},
    "ne": {"title": "Natural Earth, 1:10m and 1:50m cultural vectors", "licence": "Public domain",
           "url": "https://www.naturalearthdata.com/"},
    "gb": {"title": "geoBoundaries (William & Mary geoLab), administrative units used as proxies (Chile, Argentina, "
                    "Moldova, New Zealand, Japan, Uruguay, Sussex)",
           "licence": "Per country: CC BY 3.0 IGO (CHL, ARG, MDA), CC BY 4.0 (NZL), OGL v3 (GBR), ODbL via OSM (JPN, URY)",
           "url": "https://www.geoboundaries.org/"},
    "osm": {"title": "OpenStreetMap contributors", "licence": "ODbL 1.0",
            "url": "https://www.openstreetmap.org/copyright"},
    "vinpro": {"title": "VinPro / SAWIS, Wine of Origin System (Wine and Spirits Board units), ArcGIS feature service "
                        "WINE_OF_ORIGIN_SYSTEM_20260626", "licence": "No licence stated; attribution VinPro/SAWIS",
               "url": "https://services-eu1.arcgis.com/u4YTgbzxcollBKYL/arcgis/rest/services/WINE_OF_ORIGIN_SYSTEM_20260626/FeatureServer"},
    "idemza": {"title": "IDE Mendoza, Distritos (Dirección General de Catastro, 2024)",
               "licence": "Public service, licence not stated", "url": "https://www.mendoza.gov.ar/"},
    "omafra": {"title": "OMAFRA, ON_VQA_Areas (credit: Ontario Wine Appellation Authority)",
               "licence": "Ontario Open Data (companion layers)",
               "url": "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/ON_VQA_Areas/FeatureServer/0"},
    "brock": {"title": "Brock University Map, Data & GIS Library, Niagara sub-appellations (L. Gasparotto, T. Shaw, 2024)",
              "licence": "No restrictions; citation requested",
              "url": "https://services.arcgis.com/3wgo1qnFL7YLB8lT/arcgis/rest/services/NiagaraSubAppellations_Updated/FeatureServer/0"},
    "agol-bcgi": {"title": "S123 Geographical Indication layer (ArcGIS Online, 2023), BC Wine Authority regions, names "
                           "corrected to the BC Wine Authority list", "licence": "Public layer, licence not stated",
                  "url": "https://services3.arcgis.com/VJAoNmKUVLefv1ve/arcgis/rest/services/Geographical_Indication/FeatureServer/0"},
    "embrapa": {"title": "Embrapa Uva e Vinho, Brazilian GI delimitations (Embrapa GeoInfo)",
                "licence": "Licence not specified; attribution Embrapa", "url": "https://geoinfo.dados.embrapa.br/"},
    "swisstopo": {"title": "swisstopo swissTLM3D 2026 (vineyard land use) and swissBOUNDARIES3D 2026, with cantonal "
                           "Rebbaukataster (geodienste.ch MGDM 151.1: VS, GE, GR, SH, AG, BE, TG, BL, FR, JU, LU, SG, SO, SZ, "
                           "UR, ZG); AOC list from OFAG/BLW Répertoire suisse des AOC (2026)",
                  "licence": "swisstopo open data (free use with attribution); cantonal open geodata",
                  "url": "https://www.swisstopo.admin.ch/"},
    "lwkrlp": {"title": "Landwirtschaftskammer Rheinland-Pfalz / LGB-RLP, Weinbergsrolle Einzellagen (layer Weinlagen). "
                        "No vector data is published: boundaries were reconstructed by rendering each Lage in a unique "
                        "colour from the official map service at 10 m/pixel and vectorising the result, so edges are "
                        "a 10 m approximation of the official lines",
               "licence": "dl-de/by-2.0, ©LGB-RLP / Landwirtschaftskammer RLP",
               "url": "https://www.lwk-rlp.de/"},
    "noe": {"title": "Amt der NÖ Landesregierung, Weinbau Rieden Niederösterreich (OGD RLF_WEINBAU_RIEDEN)",
            "licence": "CC BY 4.0", "url": "https://sdi.noe.gv.at/"},
    "bgld": {"title": "Amt der Burgenländischen Landesregierung, Weinbauriede Burgenland (INSPIRE land use)",
             "licence": "CC BY 4.0", "url": "https://geodaten.bgld.gv.at/"},
    "bz": {"title": "Autonome Provinz Bozen-Südtirol, Unità geografiche aggiuntive and Zone DOC (p_bz-Agriculture WFS)",
           "licence": "CC0 1.0", "url": "https://data.civis.bz.it/"},
    "terraclimate": {"title": "Abatzoglou JT, Dobrowski SZ, Parks SA, Hegewisch KC (2018). TerraClimate, "
                              "1991-2020 monthly climatology. Scientific Data 5:170191",
                     "licence": "CC0 1.0", "url": "https://www.climatologylab.org/terraclimate.html"},
    "worldclim": {"title": "Fick SE, Hijmans RJ (2017). WorldClim 2, 30 arc-second elevation",
                  "licence": "Free for research and non-commercial use", "url": "https://www.worldclim.org/"},
}

# subcat labels of fine units (V2_DEPTH.md); an explicit-id profile whose unit is not in the geo files yet is
# treated as a fine profile when its subcat is one of these
FINE_SUBCATS = {"mga", "uga", "pieve", "zona", "municipio", "lieu dit", "lieudit", "cru village", "vi de vila",
                "einzellage", "ried", "climat", "premier cru", "premier cru climat", "grand cru climat", "subzone",
                "sottozona", "menzione geografica aggiuntiva", "unita geografica aggiuntiva", "vinedo singular",
                "paraje", "contrada", "lage", "grosse lage", "erste lage", "monopole", "village", "commune"}

# Site `appellation` values that are place labels rather than appellations.
NON_APP_LABEL = re.compile(r"\(\s*no\b|\bno (ava|appellation|aoc|do|doc|gi|pdo|wo)\b|\bnone\b|^n/?a$|\bvarious\b|"
                           r"\bmultiple\b|\bunclassified\b|\btable wine\b|^-+$", re.I)
VINEYARD_KINDS = {"grand_cru", "premier_cru", "cru", "vineyard", "mga", "lieu_dit", "ried", "einzellage", "uga",
                  "climat", "single_vineyard", "parcel"}
# Clear name variants the research and geodata spell differently, keyed (iso2, normalised profile/region name)
# -> extra names to try. Only add entries checked against both files.
CURATED_ALIASES = {
    ("fr", "anjou villages brissac"): ["Anjou Brissac"],  # INAO AOC 'Anjou Villages Brissac', polygon label shortened
}

# Credits that are not polygon src keys (always listed in meta.json).
EXTRA_CREDITS = {
    "osm": {"title": "© OpenStreetMap contributors (added rivers, lakes and places via Nominatim; Swiss grand cru "
                     "vineyard outlines Dézaley and Calamin)", "licence": "ODbL 1.0",
            "url": "https://www.openstreetmap.org/copyright"},
    "cl-wiki": {"title": "Chile DO comuna lists transcribed from Spanish Wikipedia (Anexo: Regiones vitícolas de Chile), "
                         "which cites LeyChile Decreto 464/1994 and amendments",
                "licence": "CC BY-SA 4.0 (Wikipedia text)",
                "url": "https://es.wikipedia.org/wiki/Anexo:Regiones_vit%C3%ADcolas_de_Chile"},
    "gisco": {"title": "Eurostat GISCO Local Administrative Units (village names for Burgenland Rieden), © EuroGeographics",
              "licence": "Eurostat GISCO terms (attribution)", "url": "https://ec.europa.eu/eurostat/web/gisco"},
    "fonts": {"title": "Literata (The Literata Project Authors, TypeTogether) and IM FELL (Igino Marini), via Google Fonts",
              "licence": "SIL Open Font License 1.1", "url": "https://github.com/google/fonts"},
}

CLIMREF_PRIMARY = [("de", ["Mosel"]), ("fr", ["Champagne"]), ("fr", ["Chablis"]),
                   ("fr", ["Gevrey-Chambertin"]), ("it", ["Barolo"]), ("fr", ["Pauillac"]),
                   ("es", ["Rioja"]), ("fr", ["Châteauneuf-du-Pape"]), ("us", ["Napa Valley"]),
                   ("au", ["Barossa Valley"]), ("nz", ["Marlborough"]), ("ar", ["Luján de Cuyo", "Mendoza"]),
                   ("pt", ["Douro", "Porto"])]
CLIMREF_BACKUP = [("za", ["Stellenbosch"]), ("us", ["Willamette Valley"]), ("au", ["Margaret River"]),
                  ("de", ["Rheingau"]), ("at", ["Wachau"]), ("es", ["Ribera del Duero"]),
                  ("it", ["Chianti Classico"]), ("cl", ["Valle de Colchagua", "Colchagua Valley", "Colchagua"]),
                  ("gr", ["Σαντορίνη", "Santorini"]), ("es", ["Jerez-Xérès-Sherry", "Jerez"]),
                  ("hu", ["Tokaj"]), ("au", ["Coonawarra"]), ("us", ["Sonoma Coast"])]
CLIMREF_MAX = 13

# Name keywords (normalised, whole words) used as a style heuristic when nothing better is known.
STYLE_KEYWORDS = {
    "sparkling": ["cremant", "cava", "sekt", "spumante", "franciacorta", "trento", "alta langa", "mousseux",
                  "petillant", "blanquette", "clairette de die", "prosecco", "asti", "lambrusco", "champagne",
                  "conegliano valdobbiadene", "oltrepo pavese metodo classico", "cap classique"],
    "fortified": ["porto", "port", "madeira", "madere", "marsala", "jerez", "xeres", "sherry", "manzanilla",
                  "montilla moriles", "malaga", "banyuls", "maury", "rivesaltes", "muscat de", "pineau des charentes",
                  "floc de gascogne", "macvin", "moscatel de setubal", "carcavelos", "rutherglen", "mavrodafni",
                  "mavrodaphne", "vin doux naturel"],
    "sweet": ["sauternes", "barsac", "loupiac", "cadillac", "sainte croix du mont", "cerons", "monbazillac",
              "coteaux du layon", "bonnezeaux", "quarts de chaume", "vin santo", "passito", "recioto", "ramandolo",
              "picolit", "aleatico", "commandaria", "ausbruch", "eiswein", "tokaji aszu", "moscato di",
              "jurancon", "saussignac", "haut montravel", "pacherenc", "vin de paille"],
}
EU_SPARKLING = {"quality sparkling wine", "sparkling wine", "semi sparkling wine", "aerated semi sparkling wine",
                "quality aromatic sparkling wine", "aerated sparkling wine"}
EU_SWEET = {"wine from raisined grapes", "wine of overripe grapes", "wine from overripe grapes",
            "partially fermented grape must", "partially fermented grape must extracted from raisined grapes"}
EU_FORTIFIED = {"liqueur wine", "liquer wine"}
STYLE_ALIASES = {"red": "red", "rouge": "red", "tinto": "red", "rosso": "red", "rot": "red", "white": "white",
                 "blanc": "white", "bianco": "white", "blanco": "white", "weiss": "white", "branco": "white",
                 "rose": "rose", "rosado": "rose", "rosato": "rose", "pink": "rose", "sparkling": "sparkling",
                 "mousseux": "sparkling", "spumante": "sparkling", "espumoso": "sparkling", "sweet": "sweet",
                 "dessert": "sweet", "doux": "sweet", "dolce": "sweet", "fortified": "fortified",
                 "liqueur": "fortified", "vdn": "fortified", "orange": "orange", "amber": "orange",
                 "skin contact": "orange", "mixed": "mixed"}

# Variety colour codes used in EU registers ("Pinot noir N", "Chardonnay B", "Gewürztraminer Rs").
COLOR_CODES = {"n": "red", "b": "white", "rs": "white", "g": "white", "gr": "white", "rg": "white", "r": "red"}
COLOR_WORDS = {"blauer": "red", "blaue": "red", "tinta": "red", "tinto": "red", "noir": "red", "nero": "red",
               "nera": "red", "negra": "red", "negro": "red", "preto": "red", "rouge": "red", "rosso": "red",
               "weisser": "white", "weiser": "white", "weisse": "white", "blanca": "white", "blanco": "white",
               "blanc": "white", "bianco": "white", "bianca": "white", "branco": "white", "branca": "white",
               "grauer": "white", "gris": "white", "grigio": "white"}
GRAPE_STOP = {"black", "white", "blanc", "noir", "nero", "bianco", "rouge", "rosso", "tinto", "tinta", "blanco",
              "negro", "negra", "weiss", "weisser", "blauer", "roter", "grauer", "gris", "grey", "gray", "rose",
              "red", "early", "grand", "petit", "petite", "gros", "grosse", "mission", "port", "sweet", "table",
              "vin", "vino", "wine", "muscat", "moscato", "malvasia", "malvazija", "muskat", "moscatel", "pinot",
              "cabernet", "sauvignon", "trebbiano", "burgunder", "traminer", "vernaccia", "lambrusco",
              "alicante", "black muscat", "tinta roja", "uva", "grape", "spanish", "italian", "french",
              "german", "portugal", "espagne", "bordeaux", "burgundy", "champagne", "chianti"}
GRAPE_CURATED = {
    "Pinot Noir": ["Spätburgunder", "Blauburgunder", "Blauer Spätburgunder", "Blauer Burgunder", "Pinot Nero",
                   "Rulandské modré", "Modri pinot", "Pinot Crni", "Pinot noir"],
    "Pinot Gris": ["Grauburgunder", "Grauer Burgunder", "Ruländer", "Pinot Grigio", "Szürkebarát"],
    "Pinot Blanc": ["Weissburgunder", "Weißburgunder", "Weißer Burgunder", "Pinot Bianco"],
    "Grenache": ["Garnacha", "Garnacha Tinta", "Grenache Noir", "Cannonau", "Garnatxa", "Garnatxa Negra"],
    "Grenache Blanc": ["Garnacha Blanca", "Garnatxa Blanca"],
    "Tempranillo": ["Tinta Roriz", "Aragonez", "Tinto Fino", "Tinta del País", "Tinta de Toro", "Cencibel",
                    "Ull de Llebre"],
    "Mourvèdre": ["Monastrell", "Mataro"],
    "Syrah": ["Shiraz"],
    "Zinfandel": ["Primitivo", "Tribidrag", "Crljenak Kaštelanski"],
    "Malbec": ["Côt", "Cot", "Malbech"],
    "Carignan": ["Cariñena", "Mazuelo", "Carignano", "Samsó"],
    "Ugni Blanc": ["Trebbiano Toscano"],
    "Muscat Blanc à Petits Grains": ["Moscato Bianco", "Muscat de Frontignan", "Gelber Muskateller",
                                     "Muskateller", "Moscatel de Grano Menudo"],
    "Riesling": ["Weißer Riesling", "Rheinriesling", "Riesling Renano", "White Riesling", "Johannisberg Riesling"],
    "Silvaner": ["Sylvaner", "Grüner Silvaner"],
    "Blaufränkisch": ["Lemberger", "Kékfrankos", "Frankovka", "Frankovka modrá", "Modra frankinja"],
    "Chardonnay": ["Morillon"],
    "Nebbiolo": ["Spanna", "Chiavennasca"],
    "Sangiovese": ["Brunello", "Prugnolo Gentile", "Morellino", "Nielluccio"],
    "Albariño": ["Alvarinho"],
    "Macabeo": ["Viura", "Macabeu"],
    "Xarel-lo": ["Xarel·lo", "Xarello", "Pansa Blanca"],
    "Welschriesling": ["Graševina", "Olaszrizling", "Laški rizling", "Riesling Italico", "Ryzlink vlašský"],
    "Müller-Thurgau": ["Rivaner", "Mueller Thurgau", "Mueller-Thurgau"],
    "Chenin Blanc": ["Steen", "Pineau de la Loire"],
    "Mencía": ["Jaen"],
    "Cabernet Franc": ["Bouchet", "Breton"],
    "Gamay": ["Gamay Noir", "Gamay noir à jus blanc"],
    "Furmint": ["Šipon", "Moslavac"],
    "Gewürztraminer": ["Traminer Aromatico", "Tramini"],
    "Zweigelt": ["Blauer Zweigelt", "Rotburger"],
    "Grüner Veltliner": ["Weißgipfler"],
    "Sauvignon Blanc": ["Fumé Blanc", "Muskat-Silvaner"],
    "Sémillon": ["Semillon"],
    "Touriga Franca": ["Touriga Francesa"],
    "Cinsault": ["Cinsaut"],
    "Vermentino": ["Rolle", "Pigato", "Favorita"],
    "Glera": ["Prosecco"],
}


# ====================================================================== text helpers
_GREEK_DI = [("ου", "ou"), ("αυ", "av"), ("ευ", "ev"), ("ηυ", "iv"), ("αι", "ai"), ("ει", "ei"), ("οι", "oi"),
             ("μπ", "mp"), ("ντ", "nt"), ("γγ", "ng"), ("γκ", "gk"), ("γχ", "nch"), ("τσ", "ts"), ("τζ", "tz")]
_GREEK = str.maketrans({"α": "a", "β": "v", "γ": "g", "δ": "d", "ε": "e", "ζ": "z", "η": "i", "θ": "th", "ι": "i",
                        "κ": "k", "λ": "l", "μ": "m", "ν": "n", "ξ": "x", "ο": "o", "π": "p", "ρ": "r", "σ": "s",
                        "ς": "s", "τ": "t", "υ": "y", "φ": "f", "χ": "ch", "ψ": "ps", "ω": "o"})
_CYR = str.maketrans({"а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e", "ж": "zh", "з": "z",
                      "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r",
                      "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh",
                      "щ": "sht", "ъ": "a", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya", "і": "i", "ї": "yi",
                      "є": "ye", "ґ": "g", "ђ": "dj", "ј": "j", "љ": "lj", "њ": "nj", "ћ": "c", "џ": "dz",
                      "ѓ": "gj", "ќ": "kj", "ѕ": "dz", "ў": "u"})
_GEORG = str.maketrans({"ა": "a", "ბ": "b", "გ": "g", "დ": "d", "ე": "e", "ვ": "v", "ზ": "z", "თ": "t", "ი": "i",
                        "კ": "k", "ლ": "l", "მ": "m", "ნ": "n", "ო": "o", "პ": "p", "ჟ": "zh", "რ": "r", "ს": "s",
                        "ტ": "t", "უ": "u", "ფ": "p", "ქ": "k", "ღ": "gh", "ყ": "q", "შ": "sh", "ჩ": "ch",
                        "ც": "ts", "ძ": "dz", "წ": "ts", "ჭ": "ch", "ხ": "kh", "ჯ": "j", "ჰ": "h"})
_NONLATIN = re.compile(r"[\u0370-\u03ff\u0400-\u04ff\u10a0-\u10ff]")
_SPECIAL = str.maketrans({"œ": "oe", "æ": "ae", "ø": "o", "ł": "l", "đ": "d", "ð": "d", "þ": "th", "ı": "i",
                          "ß": "ss", "ŀ": "l", "·": ""})
_TOKMAP = {"st": "saint", "ste": "sainte", "sankt": "saint", "mt": "mount", "mtn": "mountain"}
_PREFIXES = ["alsace grand cru ", "vino de pago ", "pago de ", "pago ", "vins de ", "vin de ", "vin d ", "vin du ",
             "denominacion de origen calificada ", "denominacion de origen ",
             "denominazione di origine controllata e garantita ", "denominazione di origine controllata ",
             "appellation ", "wine of origin ", "aoc ", "aop ", "docg ", "doca ", "doc ", "dop ", "do ", "wo ",
             "ava "]
_SUFFIXES = [" american viticultural area", " viticultural area", " wine region", " doc ar", " aoc", " aop",
             " ac", " docg", " doca", " doc", " doq", " dop", " do", " pdo", " dac", " ava", " gi", " wo",
             " igp", " pgi", " vqa", " ig"]
_SQUASH = [("ph", "f"), ("th", "t"), ("kh", "h"), ("ch", "h"), ("y", "i"), ("ei", "i"), ("oi", "i"), ("ai", "e"),
           ("ou", "u"), ("mp", "b"), ("nt", "d"), ("nd", "d"), ("gk", "g"), ("ck", "k"), ("c", "k"), ("w", "v"),
           ("j", "i")]


def fold(s):
    s = unicodedata.normalize("NFKD", str(s))
    s = "".join(c for c in s if not unicodedata.combining(c)).casefold()
    if _NONLATIN.search(s):
        for a, b in _GREEK_DI:
            s = s.replace(a, b)
        s = s.translate(_GREEK).translate(_CYR).translate(_GEORG)
    return s.translate(_SPECIAL)


def norm(s):
    """Matching key: casefold, no diacritics, transliterated, punctuation -> space, St./Ste. -> saint(e)."""
    if s is None:
        return ""
    s = fold(s)
    s = re.sub(r"[’'`´ʼ‘]", " ", s).replace("&", " and ")
    s = re.sub(r"[^a-z0-9]+", " ", s).strip()
    return " ".join(_TOKMAP.get(t, t) for t in s.split())


def squash(k):
    for a, b in _SQUASH:
        k = k.replace(a, b)
    return re.sub(r"(.)\1+", r"\1", k)


def slugify(s):
    s = fold(s).replace("&", " and ")
    s = re.sub(r"[’'`ʼ‘]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = re.sub(r"-+", "-", s)
    if not s:
        s = "x" + hashlib.md5(str(s).encode()).hexdigest()[:6]
    return s


def strip_affixes(k):
    out, cur, changed = set(), k, True
    while changed:
        changed = False
        for p in _PREFIXES:
            if cur.startswith(p) and len(cur) > len(p) + 2:
                cur = cur[len(p):]
                out.add(cur)
                changed = True
                break
        for s in _SUFFIXES:
            if cur.endswith(s) and len(cur) > len(s) + 2:
                cur = cur[:-len(s)]
                out.add(cur)
                changed = True
                break
    return out


def name_keys(raw):
    """(tier0, tier1) normalised keys for one name. tier0: the name and its ' / ' parts; tier1: variants
    with parentheses, category labels and prefixes such as 'Alsace grand cru ' or 'Vin de ' removed."""
    raw = str(raw or "").strip()
    if not raw:
        return set(), set()
    parts = [raw] + [p for p in re.split(r"\s*/\s*", raw) if p.strip()]
    t0, t1 = set(), set()
    for p in parts:
        k = norm(p)
        if k:
            t0.add(k)
        k2 = norm(re.sub(r"\([^)]*\)", " ", p))
        if k2:
            t1.add(k2)
    for k in list(t0 | t1):
        t1 |= strip_affixes(k)
    # word-order-free key ("Blaye Côtes de Bordeaux" = "Côtes de Bordeaux Blaye"), only for 3+ words
    for k in list(t0 | t1):
        toks = k.split()
        if len(toks) >= 3:
            t1.add("~" + " ".join(sorted(toks)))
    return t0, t1 - t0


def as_list(v):
    if v is None:
        return []
    if isinstance(v, (list, tuple)):
        return [x for x in v if x is not None and x != ""]
    return [v]


def str_list(v):
    out = []
    for x in as_list(v):
        if isinstance(x, dict):
            x = x.get("name")
        if isinstance(x, (str, int, float)) and str(x).strip():
            out.append(str(x).strip())
    return out


def clean_text(s, stats):
    """Remove em dashes (and spaced en dashes / double hyphens used as dashes), tidy whitespace."""
    if not isinstance(s, str) or not s:
        return s
    s = s.replace("\r\n", "\n").replace("\r", "\n").replace("\u00a0", " ").replace("\u202f", " ")
    n_em = s.count("\u2014") + s.count("\u2015")
    n_en = len(re.findall(r"[ \t]\u2013[ \t]", s)) + len(re.findall(r"[ \t]--[ \t]", s))
    if n_em or n_en:
        s = re.sub(r"(\d)\s*[\u2014\u2015]\s*(\d)", "\\1\u2013\\2", s)
        s = re.sub(r"(\d)[ \t]+\u2013[ \t]+(\d)", "\\1\u2013\\2", s)
        s = re.sub(r"(^|\n)[ \t]*[\u2014\u2015\u2013][ \t]*", r"\1", s)
        s = re.sub(r"[ \t]*[\u2014\u2015][ \t]*", ", ", s)
        s = re.sub(r"[ \t]+(\u2013|--)[ \t]+", ", ", s)
        s = re.sub(r",[ \t]*,", ",", s)
        s = re.sub(r",[ \t]*([.;:!?)\]])", r"\1", s)
        s = re.sub(r"([(\[])[ \t]*,[ \t]*", r"\1", s)
        s = re.sub(r"([:;])[ \t]*,", r"\1", s)
        s = re.sub(r",[ \t]*(\n|$)", r"\1", s)
        stats["em_dashes"] += n_em
        stats["spaced_en_dashes"] += n_en
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r" *\n *", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s).strip()
    if len(s) > 60:
        low = s.lower()
        for w in BANNED:
            if w in low:
                stats["banned:" + w] += len(re.findall(r"\b" + re.escape(w) + r"\b", low))
    return s


def deep_clean(obj, stats, key=None):
    if isinstance(obj, str):
        return obj.strip() if key in NO_CLEAN_KEYS else clean_text(obj, stats)
    if isinstance(obj, list):
        return [deep_clean(x, stats, key) for x in obj]
    if isinstance(obj, dict):
        return {k: deep_clean(v, stats, k) for k, v in obj.items()}
    return obj


def to_float(v):
    try:
        f = float(v)
        return f if math.isfinite(f) else None
    except (TypeError, ValueError):
        return None


# ====================================================================== io helpers
def sha_file(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def read_json(path, ctx=None, lenient=True):
    """Parse JSON; with lenient=True try small repairs (BOM, trailing commas, control chars)."""
    try:
        with open(path, encoding="utf-8-sig") as f:
            txt = f.read()
    except Exception as e:
        if ctx:
            ctx.warn(f"cannot read {rel(ctx, path)}: {e}")
        return None
    try:
        return json.loads(txt)
    except json.JSONDecodeError as e:
        first = e
    if lenient:
        fixed = re.sub(r",(\s*[}\]])", r"\1", txt)
        for strict in (True, False):
            try:
                obj = json.loads(fixed, strict=strict)
                if ctx:
                    ctx.warn(f"{rel(ctx, path)}: malformed JSON repaired ({first.msg} line {first.lineno})")
                return obj
            except json.JSONDecodeError:
                pass
    if ctx:
        ctx.warn(f"{rel(ctx, path)}: invalid JSON, skipped ({first.msg} at line {first.lineno} col {first.colno})")
    return None


def write_json(path, obj, pretty=False):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        if pretty:
            json.dump(obj, f, ensure_ascii=False, indent=1)
        else:
            json.dump(obj, f, ensure_ascii=False, separators=(",", ":"))
    os.replace(tmp, path)
    return os.path.getsize(path)


def rel(ctx, p):
    return os.path.relpath(p, ctx.root)


# ====================================================================== geometry helpers
def round_ring(r):
    out = []
    for c in r:
        try:
            p = [round(float(c[0]), 4), round(float(c[1]), 4)]
        except (TypeError, ValueError, IndexError):
            continue
        if not out or p != out[-1]:
            out.append(p)
    if out and out[0] != out[-1]:
        out.append(out[0])
    return out if len(out) >= 4 else None


def round_geometry(g):
    """Round a GeoJSON Polygon/MultiPolygon to 4 decimals; None if nothing valid remains."""
    t = g.get("type")
    polys = [g.get("coordinates") or []] if t == "Polygon" else (g.get("coordinates") or [])
    out = []
    for poly in polys:
        if not poly:
            continue
        ext = round_ring(poly[0])
        if ext is None:
            continue
        rings = [ext] + [r for r in (round_ring(x) for x in poly[1:]) if r]
        out.append(rings)
    if not out:
        return None
    if t == "Polygon" and len(out) == 1:
        return {"type": "Polygon", "coordinates": out[0]}
    return {"type": "MultiPolygon", "coordinates": out} if len(out) > 1 else {"type": "Polygon", "coordinates": out[0]}


def polygonal(g):
    if g is None or g.is_empty:
        return None
    if isinstance(g, (Polygon, MultiPolygon)):
        return g
    if hasattr(g, "geoms"):
        ps = []
        for x in g.geoms:
            x = polygonal(x)
            if x is not None:
                ps.extend(x.geoms if isinstance(x, MultiPolygon) else [x])
        return (ps[0] if len(ps) == 1 else MultiPolygon(ps)) if ps else None
    return None


def fix_geom(g):
    if g is None:
        return None
    if not g.is_valid:
        try:
            g = shapely.make_valid(g)
        except Exception:
            g = g.buffer(0)
    return polygonal(g)


def geom_json(g):
    def ring(r):
        return round_ring(list(r.coords))

    def poly(p):
        ext = ring(p.exterior)
        return [ext] + [x for x in (ring(i) for i in p.interiors) if x] if ext else None

    ps = [g] if isinstance(g, Polygon) else list(g.geoms)
    out = [x for x in (poly(p) for p in ps) if x]
    if not out:
        return None
    return {"type": "Polygon", "coordinates": out[0]} if len(out) == 1 else {"type": "MultiPolygon", "coordinates": out}


def area_km2(g):
    if GEOD is None:
        lat = g.centroid.y
        return g.area * (111.32 ** 2) * math.cos(math.radians(lat))
    if isinstance(g, Polygon):
        g = orient(g, 1.0)
    elif isinstance(g, MultiPolygon):
        g = MultiPolygon([orient(p, 1.0) for p in g.geoms])
    a, _ = GEOD.geometry_area_perimeter(g)
    return abs(a) / 1e6


def label_point(g):
    poly = max(g.geoms, key=lambda p: p.area) if isinstance(g, MultiPolygon) else g
    try:
        pt = polylabel(poly, tolerance=max(math.sqrt(poly.area) / 200.0, 1e-5))
        if not poly.contains(pt):
            pt = poly.representative_point()
    except Exception:
        pt = poly.representative_point()
    return [round(pt.x, 4), round(pt.y, 4)]


def bbox4(bounds):
    return [round(b, 4) for b in bounds]


def valid_pair(v):
    return isinstance(v, (list, tuple)) and len(v) == 2 and all(to_float(x) is not None for x in v)


# ====================================================================== context
class Ctx:
    def __init__(self, root, args):
        self.root = root
        self.args = args
        self.site_data = os.path.join(root, "site", "data")
        self.geo = os.path.join(self.site_data, "geo")
        self.base = os.path.join(self.site_data, "base")
        self.content_out = os.path.join(self.site_data, "content")
        self.content_in = os.path.join(root, "data", "content")
        self.work = os.path.join(root, "work")
        self.geo_src = os.path.join(self.work, "geo_src")
        self.report_path = os.path.join(self.work, "integration-report.md")
        self.clim_script = args.clim_script or os.path.join(root, "scripts", "climate_enrich.py")
        self.warnings = []
        self.rep = defaultdict(list)
        self.stat = defaultdict(Counter)
        self.notes = []
        self.t0 = time.time()

    def warn(self, msg):
        self.warnings.append(msg)
        if self.args.verbose:
            print("WARN", msg, file=sys.stderr)


# ====================================================================== basemap / countries
class Countries:
    def __init__(self, ctx):
        self.names, self.geoms, self.name_to_iso, self.parts = {}, {}, {}, defaultdict(list)
        path = os.path.join(ctx.base, "countries.geojson")
        fc = read_json(path, ctx, lenient=False) if os.path.exists(path) else None
        if not fc:
            ctx.warn("site/data/base/countries.geojson missing: coordinate checks fall back to polygon bboxes")
            fc = {"features": []}
        for f in fc.get("features") or []:
            p = (f or {}).get("properties") or {}
            iso = str(p.get("iso2") or "").lower()
            if not re.fullmatch(r"[a-z]{2}", iso):
                continue
            try:
                g = fix_geom(shape(f["geometry"]))
            except Exception:
                continue
            if g is None:
                continue
            self.parts[iso].extend(g.geoms if isinstance(g, MultiPolygon) else [g])
            if p.get("name") and iso not in self.names:
                self.names[iso] = p["name"]
            for k in ("name", "name_long"):
                if p.get(k):
                    self.name_to_iso.setdefault(norm(p[k]), iso)
        best = {}
        for f in fc.get("features") or []:
            p = (f or {}).get("properties") or {}
            iso = str(p.get("iso2") or "").lower()
            try:
                a = shape(f["geometry"]).area
            except Exception:
                continue
            if p.get("name") and a > best.get(iso, (0, None))[0]:
                best[iso] = (a, p["name"])
        self.names.update({k: v[1] for k, v in best.items()})
        lab = read_json(os.path.join(ctx.base, "country_labels.geojson"), ctx, lenient=False) \
            if os.path.exists(os.path.join(ctx.base, "country_labels.geojson")) else None
        lab_best = {}
        for f in (lab or {}).get("features") or []:
            p = (f or {}).get("properties") or {}
            iso = str(p.get("iso2") or "").lower()
            if re.fullmatch(r"[a-z]{2}", iso) and p.get("name"):
                rank = to_float(p.get("rank"))
                rank = 99 if rank is None else rank
                if iso not in lab_best or rank < lab_best[iso][0]:
                    lab_best[iso] = (rank, p["name"])
        for iso, (_, nm) in lab_best.items():
            self.names[iso] = nm
            self.name_to_iso.setdefault(norm(nm), iso)
        # Crimea: research files follow the internationally recognised status (ua); Natural Earth's default
        # worldview draws it under ru. Accept points on the peninsula for ua whatever the basemap says.
        crimea = box(32.4, 44.35, 36.7, 46.25)
        extra_ua = [p for p in self.parts.get("ru", []) if p.intersects(crimea) and p.area < 10]
        if extra_ua:
            self.parts["ua"] = list(self.parts.get("ua", [])) + [p.intersection(crimea) for p in extra_ua]
        elif "ua" in self.parts:
            self.parts["ua"] = list(self.parts["ua"]) + [crimea]
        for iso, ps in self.parts.items():
            ps = [p for p in (fix_geom(x) for x in ps) if p is not None]
            flat = [q for p in ps for q in (p.geoms if isinstance(p, MultiPolygon) else [p])]
            if not flat:
                continue
            self.parts[iso] = flat
            g = MultiPolygon(flat) if len(flat) > 1 else flat[0]
            shapely.prepare(g)
            self.geoms[iso] = g
        for k, v in NAME_ISO_EXTRA.items():
            self.name_to_iso.setdefault(k, v)

    def load_places(self, ctx):
        self.places = defaultdict(dict)
        path = os.path.join(ctx.base, "places.geojson")
        fc = read_json(path, ctx, lenient=False) if os.path.exists(path) else None
        for f in (fc or {}).get("features") or []:
            p = (f or {}).get("properties") or {}
            c = (f.get("geometry") or {}).get("coordinates")
            iso = str(p.get("country") or "").lower()
            if p.get("name") and valid_pair(c) and iso:
                self.places[iso].setdefault(norm(p["name"]), (p["name"], (round(c[0], 4), round(c[1], 4))))

    def place_in(self, iso, texts, whole=False):
        """Longest gazetteer place name (same country) found as a word run in one of texts (whole=True: the
        text must be the place name itself)."""
        pl = getattr(self, "places", {}).get(iso) or {}
        best = None
        for t in texts:
            if whole:
                k = norm(t or "")
                if len(k) >= 4 and k in pl:
                    return pl[k]
                continue
            toks = norm(t or "").split()
            for L in (4, 3, 2, 1):
                for i in range(len(toks) - L + 1):
                    k = " ".join(toks[i:i + L])
                    if len(k) >= 4 and k in pl and (best is None or len(k) > len(best[0])):
                        best = (k, pl[k])
            if best:
                break
        return (best[1][0], best[1][1]) if best else None

    def resolve_iso(self, v):
        if not isinstance(v, str) or not v.strip():
            return None
        s = v.strip().lower()
        if re.fullmatch(r"[a-z]{2}", s):
            return ISO_ALIASES.get(s, s)
        return self.name_to_iso.get(norm(v))

    def bbox(self, iso):
        ps = self.parts.get(iso)
        if not ps:
            return None
        big = max(p.area for p in ps)
        sel = [p for p in ps if p.area >= 0.1 * big]
        b = MultiPolygon(sel).bounds if len(sel) > 1 else sel[0].bounds
        return bbox4(b)

    def check(self, iso, lat, lon, fallback_bbox=None):
        """-> (status, lat, lon). status: ok | near | swapped | far | invalid | nocheck."""
        lat, lon = to_float(lat), to_float(lon)
        if lat is None or lon is None:
            return "invalid", None, None
        g = self.geoms.get(iso)
        if g is None and fallback_bbox:
            w, s, e, n = fallback_bbox
            g = box(w - 1, s - 1, e + 1, n + 1)
        inrange = abs(lat) <= 90 and abs(lon) <= 180
        if g is None:
            return ("nocheck" if inrange else "invalid"), lat, lon

        def near(la, lo, d):
            return abs(la) <= 90 and abs(lo) <= 180 and shapely.dwithin(g, Point(lo, la), d)

        if near(lat, lon, 0.3):
            return "ok", round(lat, 4), round(lon, 4)
        if near(lon, lat, 0.3):
            return "swapped", round(lon, 4), round(lat, 4)
        if near(lat, lon, 1.5):
            return "near", round(lat, 4), round(lon, 4)
        return ("far" if inrange else "invalid"), lat, lon


# ====================================================================== geo sources (pristine copies)
def is_integrated(fc):
    feats = fc.get("features") or []
    head = [f.get("properties") or {} for f in feats[:25] if isinstance(f, dict)]
    return bool(head) and all("lvl" in p and "prof" in p and "style" in p for p in head)


def carries_derived(fc):
    """True if any feature carries keys only integrate.py writes, i.e. the file was built from our output
    (possibly with features appended or edited by an agent)."""
    for f in fc.get("features") or []:
        p = (f or {}).get("properties") if isinstance(f, dict) else None
        if isinstance(p, dict) and "lvl" in p and "prof" in p and "style" in p:
            return True
    return False


def feature_print(p, g):
    """Fingerprint of what an agent controls in a feature: name + geometry (+ parent/cat/subcat)."""
    s = json.dumps([p.get("name"), p.get("parent"), p.get("cat"), p.get("subcat"), g], ensure_ascii=False,
                   separators=(",", ":"), sort_keys=True)
    return hashlib.md5(s.encode("utf-8")).hexdigest()[:12]


def rebuild_from_integrated(ctx, n, fc, cp, m):
    """The site file still looks like our output but changed. If an agent appended, removed or edited
    features (V2 depth agents append to {iso2}_fine.geojson in place), rebuild the pristine copy from it:
    derived keys stripped, `clim` kept except on features whose geometry changed. Returns True if rebuilt;
    False means only in-place property edits (e.g. climate_enrich.py), handled by clim harvesting."""
    prints = ctx.outprints.get(n)
    site = {}
    raw_new = []
    for f in fc["features"]:
        if not isinstance(f, dict):
            continue
        p = f.get("properties") if isinstance(f.get("properties"), dict) else {}
        fid = p.get("id")
        if not isinstance(fid, str):
            raw_new.append("(no id)")
            continue
        site[fid] = f
        if not all(k in p for k in ("style", "prof", "lvl")):
            raw_new.append(fid)
    if prints:
        new = sorted(set(raw_new) | (set(site) - set(prints)))
        changed = sorted(i for i in set(site) & set(prints)
                         if i not in new and feature_print(site[i]["properties"], site[i].get("geometry")) != prints[i])
        removed = sorted(set(prints) - set(site))
    else:  # no fingerprints yet (first run after upgrade): compare ids with the pristine copy
        old = read_json(cp, ctx, lenient=True) or {}
        old_ids = {(x.get("properties") or {}).get("id") for x in old.get("features") or [] if isinstance(x, dict)}
        new = sorted(set(raw_new) | (set(site) - old_ids))
        changed = []
        removed = sorted(i for i in old_ids - set(site) if i)
    if not (new or changed or removed):
        return False
    stale = set(changed)
    feats = []
    for f in fc["features"]:
        if not isinstance(f, dict):
            continue
        p = dict(f.get("properties") or {})
        for k in DERIVED_KEYS:
            p.pop(k, None)
        p.pop("clim", None)  # derived: recomputed or taken from the versioned cache, never from inputs
        feats.append({"type": "Feature", "properties": p, "geometry": f.get("geometry")})
    with open(cp + ".tmp", "w", encoding="utf-8") as fh:
        json.dump({"type": "FeatureCollection", "features": feats}, fh, ensure_ascii=False, separators=(",", ":"))
    os.replace(cp + ".tmp", cp)
    m["src_sha"] = sha_file(cp)
    m["src_mtime"] = os.path.getmtime(os.path.join(ctx.geo, n))
    m["copied"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    m["_status"] = (f"agent edited our output in place: +{len(new)} new, ~{len(changed)} changed, "
                    f"-{len(removed)} removed; pristine copy rebuilt from it")
    ctx.rep["geo_append"].append(f"- {n}: +{len(new)} new ({', '.join(new[:5])}{' ...' if len(new) > 5 else ''}), "
                                 f"~{len(changed)} changed, -{len(removed)} removed"
                                 + (f" ({', '.join(removed[:5])})" if removed else ""))
    return True


def sync_geo_sources(ctx):
    os.makedirs(ctx.geo_src, exist_ok=True)
    ctx.manifest_path = os.path.join(ctx.geo_src, "_manifest.json")
    ctx.manifest = (read_json(ctx.manifest_path, ctx) or {}) if os.path.exists(ctx.manifest_path) else {}
    ctx.outclim_path = os.path.join(ctx.geo_src, "_outclim.json")
    ctx.outclim = (read_json(ctx.outclim_path, ctx) or {}) if os.path.exists(ctx.outclim_path) else {}
    ctx.clim_external = []
    ctx.outprints_path = os.path.join(ctx.geo_src, "_outprints.json")
    ctx.outprints = (read_json(ctx.outprints_path, ctx) or {}) if os.path.exists(ctx.outprints_path) else {}
    names = set()
    for d in (ctx.geo, ctx.geo_src):
        if os.path.isdir(d):
            names |= {n for n in os.listdir(d) if GEO_FILE_RE.match(n)}
            if d == ctx.geo:
                odd = [n for n in os.listdir(d) if n.endswith(".geojson") and not n.startswith("_")
                       and not GEO_FILE_RE.match(n)]
                for n in sorted(odd):
                    ctx.warn(f"geo {n}: name is not {{iso2}}.geojson or {{iso2}}_fine.geojson, ignored")
    srcs = []
    for n in sorted(names):
        sp, cp = os.path.join(ctx.geo, n), os.path.join(ctx.geo_src, n)
        m = ctx.manifest.setdefault(n, {})
        cur = sha_file(sp) if os.path.exists(sp) else None
        have_copy = os.path.exists(cp)
        status = None
        if cur is None:
            if not have_copy:
                continue
            status = "copy only (site file missing)"
            ctx.warn(f"geo {n}: site file missing, using work/geo_src copy")
        elif have_copy and cur in (m.get("out_sha"), m.get("src_sha")):
            status = "unchanged"
        else:
            fc = read_json(sp, ctx, lenient=False)
            ok = isinstance(fc, dict) and isinstance(fc.get("features"), list)
            if not ok:
                ctx.warn(f"geo {n}: unreadable (agent still writing?)" + (", using previous copy" if have_copy else ", skipped"))
                if not have_copy:
                    continue
                status = "unreadable, previous copy used"
            elif carries_derived(fc) and have_copy:
                note_external_clim(ctx, n, fc, sp)
                if rebuild_from_integrated(ctx, n, fc, cp, m):
                    status = m.pop("_status")
                else:
                    status = "output modified in place (properties only)"
            else:
                shutil.copyfile(sp, cp + ".tmp")
                os.replace(cp + ".tmp", cp)
                m["src_sha"] = cur
                m["src_mtime"] = os.path.getmtime(sp)
                m["copied"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
                status = "refreshed from new agent output" if have_copy else "new (copied)"
                if is_integrated(fc):
                    status += " [carried derived keys; manifest was lost]"
        if not m.get("src_sha") and os.path.exists(cp):
            m["src_sha"] = sha_file(cp)
        mm = GEO_FILE_RE.match(n)
        srcs.append({"name": n, "iso2": mm.group(1), "fine": bool(mm.group(2)), "src_path": cp,
                     "site_path": sp, "seen_sha": cur, "src_sha": m.get("src_sha"), "status": status})
        ctx.rep["geo_files"].append(f"| {n} | {status} |")
    return srcs


def load_geo(ctx, srcs):
    feats = defaultdict(lambda: {"main": [], "fine": []})
    used = set()
    for s in sorted(srcs, key=lambda s: (s["iso2"], s["fine"])):
        fc = read_json(s["src_path"], ctx, lenient=True)
        if not isinstance(fc, dict) or not isinstance(fc.get("features"), list):
            ctx.warn(f"geo {s['name']}: not a FeatureCollection, skipped")
            continue
        n_ok = 0
        for i, f in enumerate(fc["features"]):
            rec = normalize_feature(ctx, f, s, used, i)
            if rec is None:
                continue
            feats[s["iso2"]]["fine" if s["fine"] else "main"].append(rec)
            n_ok += 1
        s["n"] = n_ok
    # parents must exist in the same country; nesting level from the parent chain
    for iso, d in feats.items():
        allf = {r["p"]["id"]: r for r in d["main"] + d["fine"]}
        for r in allf.values():
            par = r["p"].get("parent")
            if par is not None and (not isinstance(par, str) or par not in allf or par == r["p"]["id"]):
                ctx.warn(f"geo {iso}: {r['p']['id']} parent {par!r} unknown, set to null")
                r["p"]["parent"] = None
            else:
                r["p"]["parent"] = par
        for r in allf.values():
            lvl, cur, seen = 0, r["p"]["parent"], {r["p"]["id"]}
            while cur and cur in allf and cur not in seen:
                seen.add(cur)
                lvl += 1
                cur = allf[cur]["p"].get("parent")
            if cur in seen:
                ctx.warn(f"geo {iso}: parent cycle at {r['p']['id']}")
            r["p"]["lvl"] = lvl
    return feats


def normalize_feature(ctx, f, s, used, i):
    iso, tag = s["iso2"], f"geo {s['name']}#{i}"
    if not isinstance(f, dict):
        return None
    g = f.get("geometry") or {}
    p = f.get("properties") if isinstance(f.get("properties"), dict) else {}
    if g.get("type") not in ("Polygon", "MultiPolygon"):
        ctx.warn(f"{tag} ({p.get('id')}): {g.get('type')} geometry skipped")
        return None
    name = str(p.get("name") or "").strip()
    if not name:
        ctx.warn(f"{tag}: no name, skipped")
        return None
    gj = round_geometry(g)
    if gj is None:
        ctx.warn(f"{tag} ({name}): empty geometry, skipped")
        return None
    try:
        shp = shape(gj)
        if not shp.is_valid:
            ctx.stat[iso]["invalid_geom_fixed_for_analysis"] += 1
            shp = fix_geom(shp)
    except Exception as e:
        ctx.warn(f"{tag} ({name}): bad geometry ({e}), skipped")
        return None
    if shp is None or shp.is_empty:
        ctx.warn(f"{tag} ({name}): empty after repair, skipped")
        return None
    props = {k: v for k, v in p.items() if k not in DERIVED_KEYS and k != "clim"}
    fid = p.get("id")
    if not (isinstance(fid, str) and ID_RE.match(fid) and fid.startswith(iso + "-")):
        new = f"{iso}-{slugify(name)}"
        ctx.warn(f"{tag}: id {fid!r} invalid, using {new}")
        fid = new
    if fid in used:
        k = 2
        while f"{fid}-{k}" in used:
            k += 1
        ctx.warn(f"{tag}: duplicate id {fid}, renamed {fid}-{k}")
        fid = f"{fid}-{k}"
    used.add(fid)
    if p.get("country") and str(p.get("country")).lower() != iso:
        ctx.warn(f"{tag}: country {p.get('country')!r} != file {iso}, using {iso}")
    props.update(id=fid, name=name, country=iso)
    props["alt"] = [a for a in str_list(p.get("alt")) if a != name]
    if not props["alt"]:
        props.pop("alt")
    if to_float(p.get("area")) is None:
        props["area"] = round(area_km2(shp), 1)
    else:
        props["area"] = round(float(p["area"]), 1)
    if not valid_pair(p.get("lp")):
        props["lp"] = label_point(shp)
    else:
        props["lp"] = [round(float(x), 4) for x in p["lp"]]
    b = p.get("bbox")
    props["bbox"] = [round(float(x), 4) for x in b] if isinstance(b, list) and len(b) == 4 and all(
        to_float(x) is not None for x in b) else bbox4(shp.bounds)
    if not isinstance(props.get("parent"), str):
        props["parent"] = None
    for k in ("cat", "bq", "src"):
        if not props.get(k):
            props[k] = {"bq": "approx"}.get(k, "")
    return {"p": props, "g": gj, "shp": shp, "fine": s["fine"], "file": s["name"]}


# ====================================================================== content loading and merging
def item_key(x):
    if isinstance(x, dict):
        u = x.get("url")
        if isinstance(u, str) and u.strip():
            return ("u", u.strip().rstrip("/").lower())
        return ("t", norm(str(x.get("when") or "")),
                norm(str(x.get("title") or x.get("name") or x.get("text") or "")[:80]))
    if isinstance(x, str):
        return ("s", norm(x) or x)
    return ("j", json.dumps(x, sort_keys=True, ensure_ascii=False))


def merge_into(a, b):
    """Merge record b into a (in place). Lists union, dicts recurse, strings: identity fields keep the
    first value, narrative fields keep the longer one."""
    for k, v in b.items():
        if k == "_src":
            a.setdefault("_src", [])
            a["_src"] = sorted(set(a["_src"]) | set(v))
            continue
        cur = a.get(k)
        if cur in (None, "", [], {}):
            a[k] = v
        elif v in (None, "", [], {}):
            continue
        elif isinstance(cur, list) or isinstance(v, list):
            cur_l, v_l = as_list(cur), as_list(v)
            seen = {item_key(x) for x in cur_l}
            for x in v_l:
                kx = item_key(x)
                if kx not in seen:
                    cur_l.append(x)
                    seen.add(kx)
            a[k] = cur_l
        elif isinstance(cur, dict) and isinstance(v, dict):
            merge_into(cur, v)
        elif isinstance(cur, str) and isinstance(v, str):
            if k not in FIRST_WINS and len(v) > len(cur):
                a[k] = v
    return a


NAME_STOP = {"le", "la", "les", "de", "du", "des", "ried", "clos", "en", "aux", "di", "del", "della", "premier", "cru",
             "grand", "saint", "sainte", "am", "im", "der", "die", "das", "an", "auf", "berg", "lage"}


def name_words(s):
    """Content words of a vineyard name, with German adjectival -er stripped (Zöbinger -> zobing)."""
    out = set()
    for w in norm(s).split():
        if w in NAME_STOP or len(w) < 3:
            continue
        out.add(w)
        if len(w) > 5 and w.endswith("er"):
            out.add(w[:-2])
    return out


def merge_keep_longer(keep, other):
    """Merge two profiles of one appellation into `keep` (whose join fields, _id/_poly/_how, survive): the
    record with more text supplies the fields, the other fills what it lacks."""
    a = {k: v for k, v in keep.items() if not k.startswith("_")}
    b = {k: v for k, v in other.items() if not k.startswith("_")}
    if text_len(b) > text_len(a):
        a, b = b, a
        if keep.get("id"):
            a["id"] = keep["id"]
    fill_missing(a, b)
    for k in [k for k in keep if not k.startswith("_")]:
        del keep[k]
    keep.update(a)
    keep["_src"] = sorted(set(keep.get("_src", [])) | set(other.get("_src", [])))
    return keep


def text_len(rec):
    n = 0
    for k, v in rec.items():
        if k.startswith("_"):
            continue
        if isinstance(v, str):
            n += len(v)
        elif isinstance(v, list):
            n += sum(len(x) if isinstance(x, str) else len(json.dumps(x, ensure_ascii=False)) for x in v)
    return n


def fill_missing(a, b):
    for k, v in b.items():
        if k.startswith("_"):
            continue
        if a.get(k) in (None, "", [], {}) and v not in (None, "", [], {}):
            a[k] = v
    return a


def file_iso(fname):
    m = re.match(r"^([a-z]{2})(?:[_.-]|$)", fname)
    return m.group(1) if m and not re.match(r"^c\d", fname) else None


def load_content(ctx, countries):
    merged = defaultdict(lambda: {"country": None, "regions": OrderedDict(), "apps": OrderedDict(), "sites": []})
    files = sorted(glob.glob(os.path.join(ctx.content_in, "*.json")))
    for path in files:
        fname = os.path.basename(path)
        data = read_json(path, ctx, lenient=True)
        stats = ctx.stat["_text:" + fname]
        counts = Counter()
        if not isinstance(data, dict):
            if data is not None:
                ctx.warn(f"{fname}: top level is not an object, skipped")
            ctx.rep["content_files"].append(f"| {fname} | skipped |")
            continue
        fiso = file_iso(fname)
        for key in CONTENT_KEYS:
            items = data.get(key)
            if items is None:
                continue
            if isinstance(items, dict):
                items = list(items.values())
            if not isinstance(items, list):
                ctx.warn(f"{fname}: '{key}' is not a list, skipped")
                continue
            for j, rec in enumerate(items):
                if not isinstance(rec, dict):
                    ctx.warn(f"{fname}: {key}[{j}] not an object, skipped")
                    continue
                rec = deep_clean(rec, stats)
                if key == "countries":
                    iso = countries.resolve_iso(rec.get("iso2")) or countries.resolve_iso(rec.get("id")) \
                        or countries.resolve_iso(rec.get("country")) or countries.resolve_iso(rec.get("name"))
                else:
                    iso = countries.resolve_iso(rec.get("country")) or fiso
                if not iso:
                    ctx.warn(f"{fname}: {key}[{j}] ({rec.get('name')}) has no resolvable country, skipped")
                    continue
                name = str(rec.get("name") or "").strip()
                if key != "countries" and not name:
                    ctx.warn(f"{fname}: {key}[{j}] has no name, skipped")
                    continue
                rec["_src"] = [fname]
                rec["country"] = iso
                M = merged[iso]
                if key == "countries":
                    rec["iso2"] = iso
                    rec.pop("country", None)
                    M["country"] = merge_into(M["country"], rec) if M["country"] else rec
                elif key == "regions":
                    k = norm(name)
                    if k in M["regions"]:
                        merge_into(M["regions"][k], rec)
                        counts["merged"] += 1
                    else:
                        M["regions"][k] = rec
                elif key == "appellations":
                    pid = rec.get("id")
                    if pid is not None and not (isinstance(pid, str) and ID_RE.match(pid) and pid.startswith(iso + "-")):
                        ctx.warn(f"{fname}: appellation '{name}' id {pid!r} is not a valid {iso}- id, ignored")
                        rec.pop("id", None)
                        pid = None
                    # explicit ids (V2 fine-unit profiles) key the record, so two "Les Charmes" in different
                    # villages stay apart; name keys merge duplicates written without ids
                    k = ("id", pid) if pid else norm(name)
                    if k in M["apps"]:
                        # duplicate profile (e.g. fr_a and fr_b both write Clairette de Bellegarde): keep the
                        # longer one whole, only fill fields it lacks from the other
                        old = M["apps"][k]
                        keep, other = (rec, old) if text_len(rec) > text_len(old) else (old, rec)
                        fill_missing(keep, other)
                        M["apps"][k] = keep
                        ctx.rep["dedupe"].append(f"- {iso}: profile '{name}' in {', '.join(other['_src'])} and "
                                                 f"{', '.join(keep['_src'][:1])}: kept the longer ({text_len(keep)} vs {text_len(other)} chars)")
                        keep["_src"] = sorted(set(keep["_src"]) | set(other["_src"]))
                        counts["merged"] += 1
                    else:
                        M["apps"][k] = rec
                else:
                    M["sites"].append(rec)
                counts[key] += 1
        ctx.rep["content_files"].append(
            f"| {fname} | " + ", ".join(f"{k} {counts[k]}" for k in CONTENT_KEYS) +
            (f", merged dup {counts['merged']}" if counts["merged"] else "") + " |")
    # sites: merge exact duplicates (same id, or same name within 2 km)
    for iso, M in merged.items():
        out = []
        by_id, by_name = {}, defaultdict(list)
        for s in M["sites"]:
            sid = s.get("id") if isinstance(s.get("id"), str) else None
            tgt = by_id.get(sid) if sid else None
            if tgt is None:
                for o in by_name[norm(s["name"])]:
                    if close_points(o, s, 2.0):
                        tgt = o
                        break
            if tgt is not None and tgt is not s:
                merge_into(tgt, s)
                continue
            out.append(s)
            if sid:
                by_id[sid] = s
            by_name[norm(s["name"])].append(s)
        M["sites"] = out
    return merged


def close_points(a, b, km):
    la, lo, lb, lob = to_float(a.get("lat")), to_float(a.get("lon")), to_float(b.get("lat")), to_float(b.get("lon"))
    if None in (la, lo, lb, lob):
        return True
    dx = (lo - lob) * 111.32 * math.cos(math.radians((la + lb) / 2))
    dy = (la - lb) * 110.57
    return math.hypot(dx, dy) <= km


# ====================================================================== name indexes / matching
class NameIndex:
    """key -> set(ids), tier0 (names) and tier1 (variants), lazy squash index, strict fuzzy."""

    def __init__(self, translit=False):
        self.i0, self.i1 = defaultdict(set), defaultdict(set)
        self.translit = translit
        self._sq = None
        self._choices = None

    def add(self, oid, names):
        for n in names:
            a, b = name_keys(n)
            for k in a:
                self.i0[k].add(oid)
            for k in b:
                self.i1[k].add(oid)
        self._sq = self._choices = None

    def squashed(self):
        if self._sq is None:
            self._sq = defaultdict(set)
            for idx in (self.i0, self.i1):
                for k, ids in idx.items():
                    if len(k) >= 4:
                        self._sq[squash(k)] |= ids
        return self._sq

    def lookup(self, k0, k1, step):
        if step == "exact":
            return set().union(*[self.i0.get(k, set()) for k in k0]) if k0 else set()
        if step == "variant":
            ks = k0 | k1
            return set().union(*[self.i1.get(k, set()) for k in ks], *[self.i0.get(k, set()) for k in k1]) if ks else set()
        if step == "translit":
            if not self.translit:
                return set()
            sq = self.squashed()
            return set().union(*[sq.get(squash(k), set()) for k in (k0 | k1) if len(k) >= 4]) if (k0 | k1) else set()
        if step == "fuzzy":
            return self.fuzzy(k0)[0]
        return set()

    def fuzzy(self, keys):
        """Strict fuzzy match: ratio >= 92 (>= 95 for keys under 12 chars), digits equal, clear winner."""
        if rf_process is None or not self.i0:
            return set(), None
        if self._choices is None:
            self._choices = list(self.i0.keys())
        best = None
        for k in keys:
            if len(k) < 6:
                continue
            thr = 92 if len(k) >= 12 else 95
            res = rf_process.extract(k, self._choices, scorer=fuzz.ratio, limit=5, score_cutoff=80)
            if not res:
                continue
            top_choice, top_score, _ = res[0]
            if top_score < thr or re.findall(r"\d+", top_choice) != re.findall(r"\d+", k):
                continue
            top_ids = self.i0[top_choice]
            rivals = [sc for ch, sc, _ in res[1:] if not (self.i0[ch] <= top_ids)]
            if rivals and top_score - rivals[0] < 3:
                continue
            if best is None or top_score > best[1]:
                best = (set(top_ids), top_score, k, top_choice)
        if best is None:
            return set(), None
        return best[0], best[1:]


def build_pool(feats, translit):
    idx = NameIndex(translit)
    for r in feats:
        idx.add(r["p"]["id"], [r["p"]["name"]] + str_list(r["p"].get("alt")))
    return idx


def profile_names(prof):
    return ([prof["name"]] + str_list(prof.get("match")) + str_list(prof.get("alt"))
            + CURATED_ALIASES.get((prof.get("country"), norm(prof["name"])), []))


def keys_of(names):
    k0, k1 = set(), set()
    for n in names:
        a, b = name_keys(n)
        k0 |= a
        k1 |= b
    return k0, k1 - k0


def pick_candidate(cands, k0, cat, by_id):
    def rank(fid):
        p = by_id[fid]["p"]
        return (0 if norm(p["name"]) in k0 else 1,
                0 if cat and norm(p.get("cat") or "") == norm(cat) else 1,
                BQ_RANK.get(p.get("bq"), 4), -(p.get("area") or 0), fid)
    s = sorted(cands, key=rank)
    return s[0], (len(s) > 1 and rank(s[0])[:2] == rank(s[1])[:2]), s


# ====================================================================== grapes / varieties
def grape_color(c):
    c = norm(c or "")
    if not c:
        return None
    if c in ("red", "black", "noir", "n", "rouge", "nero", "tinto", "negra", "blue", "red black", "dark"):
        return "red"
    return "white"


class Grapes:
    def __init__(self, ctx, grapes_obj):
        self.ok = False
        self.list = []
        self.exact, self.scan, self.color, self.ids = {}, {}, {}, []
        self.unmatched = Counter()
        gl = grapes_obj
        if isinstance(gl, dict):
            gl = gl.get("grapes") if isinstance(gl.get("grapes"), list) else [
                dict(v, id=v.get("id", k)) for k, v in gl.items() if isinstance(v, dict)]
        if not isinstance(gl, list):
            return
        exact = defaultdict(set)
        primary = {}
        for g in gl:
            if not isinstance(g, dict) or not g.get("name"):
                continue
            gid = g.get("id") if isinstance(g.get("id"), str) and g["id"].strip() else slugify(g["name"])
            self.ids.append(gid)
            self.color[gid] = grape_color(g.get("color") or g.get("colour"))
            primary[norm(g["name"])] = gid
            exact[norm(g["name"])].add(gid)
            syns = g.get("synonyms")
            if isinstance(syns, str):
                syns = re.split(r"[;,]", syns)
            for sname in str_list(syns):
                if norm(sname):
                    exact[norm(sname)].add(gid)
        curated = set()
        for canon, syns in GRAPE_CURATED.items():
            ids = exact.get(norm(canon), set())
            cid = primary.get(norm(canon)) or (next(iter(ids)) if len(ids) == 1 else None)
            if not cid:
                continue
            for sname in syns:
                k = norm(sname)
                if k in primary and primary[k] != cid:
                    continue
                exact[k] = {cid}
                curated.add(k)
        for k, ids in exact.items():
            if len(ids) > 1:
                if k in primary:
                    ids = {primary[k]}
                else:
                    continue
            gid = next(iter(ids))
            self.exact[k] = gid
            if k in GRAPE_STOP or len(k) < 4:
                continue
            if k in primary or k in curated or len(k) >= 7:
                self.scan[tuple(k.split())] = gid
        self.ok = bool(self.ids)

    def resolve_variety(self, v):
        toks = norm(v).split()
        if len(toks) > 1 and toks[-1] in COLOR_CODES:
            toks = toks[:-1]
        k = " ".join(toks)
        if not k:
            return None
        if k in self.exact:
            return self.exact[k]
        for i in (0, -1):
            if len(toks) > 1 and toks[i] in COLOR_WORDS:
                want = COLOR_WORDS[toks[i]]
                rest = " ".join(toks[1:] if i == 0 else toks[:-1])
                gid = self.exact.get(rest)
                if gid and self.color.get(gid) in (None, want):
                    return gid
        self.unmatched[str(v).strip()] += 1
        return None

    def scan_text(self, text):
        toks = norm(text).split()
        found, i = [], 0
        while i < len(toks):
            for L in (4, 3, 2, 1):
                t = tuple(toks[i:i + L])
                if len(t) == L and t in self.scan:
                    found.append(self.scan[t])
                    i += L
                    break
            else:
                i += 1
        return found


def variety_colour_style(varieties):
    """All EU colour codes N -> red; all light -> white (from 'Pinot noir N', 'Chardonnay B')."""
    cols = []
    for v in varieties or []:
        toks = norm(v).split()
        if len(toks) > 1 and toks[-1] in COLOR_CODES:
            cols.append(COLOR_CODES[toks[-1]])
    if len(cols) < max(1, len(varieties or []) // 2):
        return None
    s = set(cols)
    return s.pop() if len(s) == 1 else None


# ====================================================================== style
def norm_style(v):
    k = norm(v)
    if not k:
        return None
    if k in STYLE_ALIASES:
        return STYLE_ALIASES[k]
    for frag, st in (("sparkl", "sparkling"), ("fortif", "fortified"), ("sweet", "sweet"), ("dessert", "sweet"),
                     ("rose", "rose"), ("orange", "orange"), ("red", "red"), ("white", "white")):
        if frag in k:
            return st
    return None


def style_from_set(styles):
    st = {s for s in (norm_style(x) for x in styles) if s and s != "mixed"}
    if not st:
        return None
    if len(st) == 1:
        return next(iter(st))
    if "fortified" in st and st <= {"fortified", "sweet", "red", "white", "rose"} and len(st) <= 3:
        return "fortified"
    if st <= {"sweet", "white"}:
        return "sweet"
    if "sparkling" in st and st <= {"sparkling", "white", "rose"}:
        return "sparkling"
    return None


def style_from_eu_categories(p):
    cats = set()
    for v in [p.get("products"), p.get("categories")] + list((p.get("reg") or {}).values()):
        for x in as_list(v):
            if isinstance(x, str):
                for part in re.split(r"[/;,]", x):
                    k = norm(part)
                    if k in EU_SPARKLING or k in EU_SWEET or k in EU_FORTIFIED or k == "wine":
                        cats.add(k)
    if not cats or "wine" in cats:
        return None
    if cats <= EU_SPARKLING:
        return "sparkling"
    if cats <= EU_FORTIFIED:
        return "fortified"
    if cats <= EU_SWEET:
        return "sweet"
    if cats <= EU_FORTIFIED | EU_SWEET:
        return "fortified"
    return None


def style_from_name(names):
    for n in names:
        k = " " + norm(n) + " "
        for st, words in STYLE_KEYWORDS.items():
            if any(" " + w + " " in k for w in words):
                return st
    return None


def derive_style(prof, p, grapes, grape_ids):
    """profile dominant_style > profile styles > source styles > heuristics > mixed. Returns (style, how)."""
    if prof:
        s = norm_style(prof.get("dominant_style"))
        if s:
            return s, "profile"
        s = style_from_set(as_list(prof.get("styles")))
        if s:
            return s, "profile styles"
    if p is not None:
        s = style_from_set(as_list(p.get("styles")))
        if s:
            return s, "source styles"
        s = style_from_eu_categories(p)
        if s:
            return s, "categories"
    names = ([p["name"]] + str_list(p.get("alt"))) if p is not None else [prof["name"]]
    s = style_from_name(names)
    if s:
        return s, "name"
    if p is not None:
        s = variety_colour_style(p.get("varieties"))
        if s:
            return s, "variety colours"
    if grapes and grapes.ok and grape_ids:
        cols = {grapes.color.get(g) for g in grape_ids}
        if len(cols) == 1 and None not in cols:
            return cols.pop(), "grape colours"
    return "mixed", "default"


# ====================================================================== region outlines
def outline_union(geoms):
    try:
        u = shapely.union_all([g for g in geoms if g is not None], grid_size=1e-4)
    except Exception:
        u = shapely.union_all([g.buffer(0) for g in geoms if g is not None])
    u = fix_geom(u)
    if u is None:
        return None
    side = math.sqrt(u.area) if u.area > 0 else 0.01
    u = fix_geom(u.simplify(min(max(side / 120, 0.003), 0.03), preserve_topology=True))
    if u is None:
        return None
    parts = list(u.geoms) if isinstance(u, MultiPolygon) else [u]
    total = sum(p.area for p in parts)
    keep = []
    for p in parts:
        if len(parts) > 1 and p.area < 0.003 * total:
            continue
        holes = [r for r in p.interiors if Polygon(r).area >= (side / 15) ** 2]
        keep.append(Polygon(p.exterior, holes))
    if not keep:
        keep = [max(parts, key=lambda p: p.area)]
    return fix_geom(MultiPolygon(keep) if len(keep) > 1 else keep[0])


def outline_hull(pts):
    uniq = sorted(set((round(x, 4), round(y, 4)) for x, y in pts))
    if not uniq:
        return None
    if len(uniq) == 1:
        return Point(uniq[0]).buffer(0.15, quad_segs=8)
    h = MultiPoint(uniq).convex_hull
    return fix_geom(h.buffer(0.08 if isinstance(h, Polygon) else 0.1, quad_segs=8))


# ====================================================================== per-country build
def build_country(ctx, iso, F, M, countries, grapes, out):
    st = ctx.stat[iso]
    main, fine = F["main"], F["fine"]
    by_id = {r["p"]["id"]: r for r in main + fine}
    tl = iso in TRANSLIT_COUNTRIES
    pools = [("main", build_pool(main, tl)), ("fine", build_pool(fine, tl))] if (main or fine) else []
    st["polygons"], st["fine"] = len(main), len(fine)
    country_bbox = merge_bboxes([r["p"]["bbox"] for r in main or fine]) or countries.bbox(iso)

    # ---- 1. profiles -> polygons
    profs = list(M["apps"].values()) if M else []
    main_name_idx = build_pool(main, tl)  # for region-compatibility checks of fine candidates

    def ancestors(fid):
        out, cur, seen = [], by_id[fid]["p"].get("parent"), set()
        while cur and cur in by_id and cur not in seen:
            seen.add(cur)
            out.append(cur)
            cur = by_id[cur]["p"].get("parent")
        return out

    def fine_ok(pr, cands):
        """A profile may take a fine unit only if exactly one unit fits and it sits under the profile's
        region/subregion appellation when those resolve (stops Bereich 'Johannisberg' (Rheingau) landing
        on one of six Rheinhessen Einzellagen called Johannisberg)."""
        if len(cands) != 1:
            return False
        fid = next(iter(cands))
        ctx_ids = set()
        for key in ("subregion", "region"):
            if pr.get(key):
                k0, k1 = keys_of([str(pr[key])])
                ctx_ids |= main_name_idx.lookup(k0, k1, "exact") | main_name_idx.lookup(k0, k1, "variant")
        return not ctx_ids or bool(ctx_ids & set(ancestors(fid)))

    for pr in profs:
        pr["_k0"], pr["_k1"] = keys_of(profile_names(pr))
        pr["_poly"], pr["_how"], pr["_also"] = None, None, []
        pid = pr.get("id")
        if isinstance(pid, str) and pid in by_id:
            pr["_poly"], pr["_how"] = pid, "id"
            pk0 = keys_of([by_id[pid]["p"]["name"]] + str_list(by_id[pid]["p"].get("alt")))
            if not ((pk0[0] | pk0[1]) & (pr["_k0"] | pr["_k1"])):
                ctx.rep["id_names"].append(f"- {iso}: profile '{pr['name']}' joined by id to {pid} "
                                           f"('{by_id[pid]['p']['name']}'): names differ, check the id")
            continue
        if isinstance(pid, str) and pid:
            # explicit id for a unit that is not in the geo files (yet): no name matching, keep the id so a
            # later rerun joins it once the polygon arrives
            pr["_explicit_missing"] = True
            ctx.rep["id_missing"].append(f"- {iso}: '{pr['name']}' id {pid} ({pr.get('subcat') or pr.get('cat') or ''})")
            st["explicit_id_missing"] += 1
            continue
        # c10 `point_only`: the profile knows no polygon exists yet; take one only on an exact name hit
        steps = ("exact",) if pr.get("point_only") else ("exact", "variant", "translit", "fuzzy")
        for step in steps:
            for pname, pool in pools:
                c = pool.lookup(pr["_k0"], pr["_k1"], step)
                if not c:
                    continue
                if pname == "fine" and not fine_ok(pr, c):
                    if pr.get("_fine_logged"):
                        continue
                    pr["_fine_logged"] = 1
                    ctx.rep["ambiguous"].append(f"- {iso}: profile '{pr['name']}' ({step}) not joined to fine units "
                                                + ", ".join(sorted(c)[:6]) + (" (several)" if len(c) > 1 else " (outside its region)"))
                    continue
                best, amb, ranked = pick_candidate(c, pr["_k0"], pr.get("cat"), by_id)
                pr["_poly"], pr["_how"] = best, step
                # other polygons named in the profile's own match list (e.g. Languedoc's subzones)
                if step == "exact":
                    pr["_also"] = [x for x in ranked[1:] if not by_id[x]["fine"] or pname == "fine"]
                if step == "fuzzy":
                    info = pool.fuzzy(pr["_k0"])[1]
                    ctx.rep["fuzzy"].append(f"| {iso} | {pr['name']} | {by_id[best]['p']['name']} ({best}) | {info[0]:.0f} |")
                if amb and step != "exact":
                    ctx.rep["ambiguous"].append(
                        f"- {iso}: profile '{pr['name']}' ({step}) -> {best}; also " + ", ".join(ranked[1:6]))
                break
            if pr["_poly"]:
                break
    # one profile per polygon. Distinct profiles are never merged (Wien vs Wiener Gemischter Satz): the one whose
    # name is the polygon's own name (then the strongest method) keeps it, the others become points.
    claims = defaultdict(list)
    for i, pr in enumerate(profs):
        if pr["_poly"]:
            pk0, pk1 = keys_of([by_id[pr["_poly"]]["p"]["name"]])
            own = 0 if (pr["_k0"] & pk0) else 1
            claims[pr["_poly"]].append((0 if pr["_how"] == "id" else 1, own, METHOD_RANK[pr["_how"]], i, pr))
    drop = set()
    for fid, lst in claims.items():
        if len(lst) < 2:
            continue
        lst.sort(key=lambda t: t[:4])
        keep = lst[0][4]
        for byid, own, rank, i, pr in lst[1:]:
            same = bool(keep["_k0"] & (pr["_k0"] | pr["_k1"]) or pr["_k0"] & (keep["_k0"] | keep["_k1"])) \
                or (keep["_how"] == "id" and pr["_how"] == "id")
            if same:  # the same appellation written twice (v1 by name, V2 by id): one profile, longer text wins
                merge_keep_longer(keep, pr)
                drop.add(i)
                ctx.rep["ambiguous"].append(f"- {iso}: profiles '{keep['name']}' and '{pr['name']}' are the same "
                                            f"appellation ({fid}): merged, longer text kept")
            else:
                ctx.rep["ambiguous"].append(f"- {iso}: '{pr['name']}' ({pr['_how']}) and '{keep['name']}' both match "
                                            f"{fid}: polygon kept by '{keep['name']}', '{pr['name']}' placed as a point")
                pr["_poly"], pr["_how"], pr["_also"] = None, None, []
    profs = [pr for i, pr in enumerate(profs) if i not in drop]
    used_ids = set(by_id)
    for pr in profs:
        if pr["_poly"]:
            pr["_id"] = pr["_poly"]
            st["matched_" + pr["_how"]] += 1
        else:
            base = pr["id"] if pr.get("_explicit_missing") else f"{iso}-{slugify(pr['name'])}"
            pid, k = base, 2
            while pid in used_ids:
                pid, k = f"{base}-{k}", k + 1
            pr["_id"] = pid
        used_ids.add(pr["_id"])
    for pr in profs:
        pr["_fine"] = bool(pr["_poly"] and by_id[pr["_poly"]]["fine"]) or bool(
            pr.get("_explicit_missing") and norm(pr.get("subcat") or "") in FINE_SUBCATS)
    st["profiles"] = len(profs)
    st["fine_profiles"] = sum(1 for pr in profs if pr["_fine"])
    prof_by_id = {pr["_id"]: pr for pr in profs}
    # secondary polygons: named in a profile's match list but carrying no profile of their own
    pref = {}
    for pr in profs:
        for fid in pr.get("_also") or []:
            if fid not in prof_by_id and fid not in pref:
                pref[fid] = pr["_id"]
    # DGC-style polygons whose label omits the parent name ("Boutenac" under Corbières): try
    # "{parent} {name}" against unmatched profiles
    unmatched_idx = NameIndex(tl)
    for pr in profs:
        if not pr["_poly"] and not pr.get("_explicit_missing"):
            unmatched_idx.add(pr["_id"], profile_names(pr))
    if unmatched_idx.i0:
        for r in main + fine:
            p = r["p"]
            par = by_id.get(p.get("parent"))
            if p["id"] in prof_by_id or par is None:
                continue
            pn, nm = par["p"]["name"], p["name"]
            if norm(nm).startswith(norm(pn)):
                continue
            k0, k1 = keys_of([f"{pn} {nm}", f"{pn}-{nm}", f"{nm} {pn}"])
            c = unmatched_idx.lookup(k0, k1, "exact") or unmatched_idx.lookup(k0, k1, "variant")
            if len(c) == 1:
                pid = next(iter(c))
                pr = next(x for x in profs if x["_id"] == pid)
                if pr["_poly"]:
                    continue
                pr["_poly"], pr["_how"] = p["id"], "variant"
                pr["_fine"] = bool(r["fine"])
                st["matched_variant"] += 1
                del prof_by_id[pid]
                pr["_id"] = p["id"]
                prof_by_id[p["id"]] = pr
                pref.pop(p["id"], None)
                ctx.rep["parentname"].append(f"- {iso}: profile '{pr['name']}' -> {p['id']} ('{nm}' under '{pn}')")
    pidx = NameIndex(tl)
    for pr in profs:
        pidx.add(pr["_id"], profile_names(pr))
    main_pool = pools[0][1] if pools else NameIndex(tl)

    def resolve(name):
        k0, k1 = keys_of([name])
        if not k0:
            return None, None
        for step in ("exact", "variant", "translit", "fuzzy"):
            for idx in (pidx, main_pool):
                c = idx.lookup(k0, k1, step)
                if c:
                    return sorted(c, key=lambda i: (-(by_id[i]["p"]["area"] if i in by_id else 0), i))[0], step
        return None, None

    # ---- 2. grapes per appellation (for styles and _varieties)
    gmap = {}
    if grapes and grapes.ok:
        for r in main + fine:
            ids = [g for g in (grapes.resolve_variety(v) for v in str_list(r["p"].get("varieties"))) if g]
            if ids:
                gmap[r["p"]["id"]] = set(ids)
        for pr in profs:
            txt = " ; ".join(str_list(pr.get("grapes"))) if isinstance(pr.get("grapes"), list) else str(pr.get("grapes") or "")
            ids = grapes.scan_text(txt) if txt else []
            if ids:
                gmap.setdefault(pr["_id"], set()).update(ids)

    # ---- 3. polygon derived props
    style_how = Counter()
    for r in main + fine:
        p = r["p"]
        pr = prof_by_id.get(p["id"])
        p["style"], how = derive_style(pr, p, grapes, gmap.get(p["id"]))
        p["prof"] = 1 if pr else 0
        if not pr and p["id"] in pref:
            p["pref"] = pref[p["id"]]  # profile to open for this polygon (named in that profile's match list)
            if how == "default":
                p["style"], how = derive_style(prof_by_id[pref[p["id"]]], None, grapes, None)[0], "pref profile"
        style_how[how] += 1
    # fine units and DGC-like children without their own information inherit the parent's style
    for r in sorted(main + fine, key=lambda r: r["p"]["lvl"]):
        p = r["p"]
        par = by_id.get(p.get("parent"))
        if p["style"] == "mixed" and not p["prof"] and par is not None and par["p"]["style"] != "mixed" \
                and (r["fine"] or p.get("subcat") in ("DGC", "Premier Cru", "Grand Cru", "UGA", "Subzone")):
            p["style"] = par["p"]["style"]
            style_how["inherited"] += 1
            style_how["default"] -= 1
    st.update({"style:" + k: v for k, v in style_how.items()})

    # ---- 4. sites
    sites = M["sites"] if M else []
    main_geoms = [r["shp"] for r in main]
    tree = STRtree(main_geoms) if main_geoms else None

    def pip(lon, lat):
        if tree is None:
            return None
        pt = Point(lon, lat)
        hits = [main[j] for j in tree.query(pt, predicate="intersects")]
        return min(hits, key=lambda r: (r["p"]["area"], r["p"]["id"]))["p"]["id"] if hits else None

    ftree = STRtree([r["shp"] for r in fine]) if fine else None

    def fine_pip(lon, lat, sname, app):
        """Smallest fine unit containing the point that is compatible with app (app is the unit or one of its
        ancestors). With several hits, prefer one whose name shares a word with the site name."""
        pt = Point(lon, lat)
        sw = name_words(sname)

        def ok(r):
            return not app or r["p"]["id"] == app or app in ancestors(r["p"]["id"])

        def shares(r):
            return bool(sw & (name_words(r["p"]["name"]) | {w for a in str_list(r["p"].get("alt")) for w in name_words(a)}))

        hits = [r for r in (fine[j] for j in ftree.query(pt, predicate="intersects")) if ok(r)]
        named = [r for r in (fine[j] for j in ftree.query(pt.buffer(0.003), predicate="intersects")) if ok(r) and shares(r)]
        if named:  # the site's own Lage/Ried/climat within ~250 m beats whatever unit the pin happens to sit in
            return min(named, key=lambda r: (r["shp"].distance(pt), r["p"]["area"], r["p"]["id"]))["p"]["id"]
        if not hits:
            hits = [r for r in (fine[j] for j in ftree.query(pt.buffer(0.0008), predicate="intersects")) if ok(r)]
        return min(hits, key=lambda r: (r["p"]["area"], r["p"]["id"]))["p"]["id"] if hits else None

    region_names = NameIndex(tl)
    for rg in (M["regions"].values() if M else []):
        region_names.add("r:" + rg["name"], [rg["name"]] + str_list(rg.get("alt")))

    def resolve_region_early(label):
        k0, k1 = keys_of([label])
        c = region_names.lookup(k0, k1, "exact") or region_names.lookup(k0, k1, "variant")
        return f"region-{iso}-{slugify(sorted(c)[0][2:])}" if c else None

    # name-based unit for a site: an appellation or fine unit with exactly the site's name within ~1 km
    # ("Chambertin" grand cru, "Ried Loibenberg", "Bernkasteler Doctor")
    unit_pools = [build_pool(main, tl)] + ([build_pool(fine, tl)] if fine else [])

    def named_unit(sname, lon, lat):
        k0, k1 = keys_of([sname])
        if not k0 or min(len(k) for k in k0) < 4:
            return None
        pt = Point(lon, lat)
        best = None
        for pool in unit_pools:
            for fid in pool.lookup(k0, k1, "exact"):
                d = by_id[fid]["shp"].distance(pt)
                if d <= 0.012 and (best is None or (d, by_id[fid]["p"]["area"]) < best[:2]):
                    best = (d, by_id[fid]["p"]["area"], fid)
        return best[2] if best else None

    for s in sites:
        stt, la, lo = countries.check(iso, s.get("lat"), s.get("lon"), country_bbox)
        s["_coord"] = stt
        if stt in ("ok", "near", "swapped", "nocheck"):
            s["lat"], s["lon"] = round(la, 4), round(lo, 4)
            if stt in ("near", "swapped"):
                ctx.rep["coords"].append(f"- {iso} site '{s['name']}': {stt}" + (" (lat/lon swapped back)" if stt == "swapped" else " (within 1.5° of the border)"))
        else:
            ctx.rep["coords"].append(f"- {iso} site '{s['name']}': {stt} ({s.get('lat')}, {s.get('lon')}), left off the map")
            s["lat"] = s["lon"] = None
        st["site_coord_" + stt] += 1
    site_ids = out["site_ids"]
    for s in sites:
        sid = s.get("id")
        if not (isinstance(sid, str) and ID_RE.match(sid) and sid.startswith("site-")):
            sid = f"site-{iso}-{slugify(s['name'])}"
        base, k = sid, 2
        while sid in site_ids:
            sid, k = f"{base}-{k}", k + 1
        site_ids.add(sid)
        s["id"] = sid
        app, how = None, None
        label = str(s.get("appellation") or "").strip()
        for cand in (s.get("app"), s.get("app_id"), label):
            if isinstance(cand, str) and (cand in by_id or cand in prof_by_id):
                app, how, label = cand, "id", ""  # explicit id (V2 depth sites)
                break
        if label and (NON_APP_LABEL.search(label) or (countries.resolve_iso(label) and len(label) > 2
                                                       and not keys_of([label])[0] & set(main_pool.i0))):
            # "Texas (no AVA)", "Canada", "Burgundy": a place label, not an appellation
            s["app_label"] = label
            ctx.rep["site_label"].append(f"- {iso} site '{s['name']}': '{label}' treated as a label, not an appellation")
            label = ""
        if label:
            app, how = resolve(label)
            if app is None and s.get("lat") is not None and fine:
                # the named unit may be a fine unit without a profile: nearest same-named fine polygon (~1 km)
                fid = named_unit(label, s["lon"], s["lat"])
                if fid and by_id[fid]["fine"]:
                    app, how = fid, "fine"
            if app is None:
                rid = resolve_region_early(label)
                if rid:
                    s["region_hint"] = rid
                ctx.rep["site_app"].append(f"- {iso} site '{s['name']}': appellation '{label}' not found"
                                           + (" (matches a region name)" if rid else ""))
            elif app in by_id and s.get("lat") is not None:
                d = by_id[app]["shp"].distance(Point(s["lon"], s["lat"]))
                if d > 0.25:
                    ctx.rep["coords"].append(f"- {iso} site '{s['name']}' is {d:.2f}° from its appellation {app}")
        if app is None and s.get("lat") is not None:
            app = pip(s["lon"], s["lat"])
            how = "pip" if app else None
        # finer unit: first a unit carrying the site's own name close by (Chambertin, Ried Loibenberg), then for
        # vineyard-type sites a premier cru climat / Einzellage / Ried / UGA polygon containing the point, under
        # the named appellation (or anywhere when none was named)
        # an explicit id is kept as given, except that a main appellation id may still be refined to a fine unit
        if s.get("lat") is not None and not (how == "id" and (app not in by_id or by_id[app]["fine"])):
            nu = named_unit(s["name"], s["lon"], s["lat"])
            if nu and nu != app and (app is None or app in ancestors(nu)
                                     or by_id[nu]["shp"].intersects(Point(s["lon"], s["lat"]))):
                s["app_main"] = app
                app, how = nu, ("fine" if by_id[nu]["fine"] else "name")
            elif ftree is not None and str(s.get("kind") or "") in VINEYARD_KINDS and not (app and by_id.get(app, {}).get("fine")):
                fhit = fine_pip(s["lon"], s["lat"], s["name"], app)
                if fhit:
                    s["app_main"] = app
                    app, how = fhit, "fine"
        s["app"] = app
        if app and app in by_id and by_id[app]["fine"]:
            how = "fine"
        st["site_app_" + ({"pip": "pip", "fine": "fine"}.get(how, "name") if app else "none")] += 1

    # ---- 5. regions: ids, membership, parent/child
    regions = list(M["regions"].values()) if M else []
    ridx, rids = NameIndex(tl), set()
    for rg in regions:
        base = f"region-{iso}-{slugify(rg['name'])}"
        rid, k = base, 2
        while rid in rids:
            rid, k = f"{base}-{k}", k + 1
        rids.add(rid)
        rg["_id"] = rid
        ridx.add(rid, [rg["name"]] + str_list(rg.get("alt")))
        stt, la, lo = countries.check(iso, rg.get("lat"), rg.get("lon"), country_bbox)
        if stt in ("ok", "near", "swapped", "nocheck"):
            rg["lat"], rg["lon"] = la, lo
            if stt == "swapped":
                ctx.rep["coords"].append(f"- {iso} region '{rg['name']}': lat/lon swapped back")
        elif rg.get("lat") is not None or rg.get("lon") is not None:
            ctx.rep["coords"].append(f"- {iso} region '{rg['name']}': {stt} coordinates dropped")
            rg["lat"] = rg["lon"] = None

    def resolve_region(name):
        if not name:
            return None
        k0, k1 = keys_of([str(name)])
        for step in ("exact", "variant", "translit"):
            c = ridx.lookup(k0, k1, step)
            if c:
                return sorted(c)[0]
        return None

    rg_by_id = {rg["_id"]: rg for rg in regions}
    members = {rg["_id"]: [] for rg in regions}
    children = defaultdict(list)
    for rg in regions:
        rg["_parent"] = resolve_region(rg.get("parent_region")) if rg.get("parent_region") else None
        if rg["_parent"] == rg["_id"]:
            rg["_parent"] = None
        if rg.get("parent_region") and not rg["_parent"]:
            ctx.rep["regions"].append(f"- {iso} region '{rg['name']}': parent_region '{rg['parent_region']}' unknown")
        if rg["_parent"]:
            children[rg["_parent"]].append(rg["_id"])
        unresolved = []
        for nm in str_list(rg.get("appellations")):
            aid, how = resolve(nm)
            if aid:
                members[rg["_id"]].append(aid)
                if how == "fuzzy":
                    ctx.rep["fuzzy"].append(f"| {iso} | region {rg['name']}: {nm} | {aid} | region list |")
                continue
            cr = resolve_region(nm)
            if cr and cr != rg["_id"]:
                if rg_by_id[cr].get("_parent") is None and cr not in children[rg["_id"]]:
                    children[rg["_id"]].append(cr)
                continue
            unresolved.append(nm)
        if unresolved:
            ctx.rep["regions"].append(f"- {iso} region '{rg['name']}': {len(unresolved)} unresolved: " + ", ".join(unresolved[:12]) + (" ..." if len(unresolved) > 12 else ""))
            st["region_names_unresolved"] += len(unresolved)
    for pr in profs:
        for key in ("subregion", "region"):
            rid = resolve_region(pr.get(key))
            if rid:
                members[rid].append(pr["_id"])
                pr["_" + key + "_id"] = rid

    def closure(rid, seen=None):
        seen = seen or set()
        if rid in seen:
            return []
        seen.add(rid)
        acc = list(members.get(rid, []))
        for c in children.get(rid, []):
            acc += closure(c, seen)
        return acc

    for rg in regions:
        ids = list(dict.fromkeys(closure(rg["_id"])))
        ids.sort(key=lambda i: (0 if i in by_id else 1, -(by_id[i]["p"]["area"] if i in by_id else 0), i))
        rg["_app_ids"] = ids

    # ---- 6. extra points for profiles without polygons
    sites_by_name = defaultdict(list)
    sites_by_app = defaultdict(list)
    for s in sites:
        if s.get("lat") is not None:
            sites_by_name[norm(s["name"])].append(s)
            if s.get("app"):
                sites_by_app[s["app"]].append(s)
    extra = []
    group_units = defaultdict(list)
    for r in fine:
        b = (r["p"].get("reg") or {}).get("bereich")
        if isinstance(b, str) and b:
            b = re.sub(r"\bBer\.", "Bereich", b).replace("Dt.", "Deutsche").replace("Südl.", "Südliche")
            group_units[frozenset(name_words(b))].append(r)
    for pr in profs:
        pr["_map"] = "poly" if pr["_poly"] else None
        if pr["_poly"]:
            continue
        pt, cq, how = None, None, None
        stt, la, lo = countries.check(iso, pr.get("lat"), pr.get("lon"), country_bbox)
        if stt in ("ok", "near", "swapped", "nocheck"):
            pt, cq, how = (lo, la), (pr.get("coord_quality") or "precise"), "profile lat/lon"
        elif pr.get("lat") is not None:
            ctx.rep["coords"].append(f"- {iso} profile '{pr['name']}': {stt} coordinates ignored")
        if pt is None:
            for k in pr["_k0"]:
                if sites_by_name.get(k):
                    s = sites_by_name[k][0]
                    pt, cq, how = (s["lon"], s["lat"]), "approx", "site of same name"
                    break
        if pt is None and sites_by_app.get(pr["_id"]):
            ss = sites_by_app[pr["_id"]]
            pt = (sum(s["lon"] for s in ss) / len(ss), sum(s["lat"] for s in ss) / len(ss))
            cq, how = "approx", f"centroid of {len(ss)} sites"
        if pt is None and group_units:
            # German Bereich: the Einzellagen whose reg.bereich carries the profile's name
            pw = name_words(pr["name"])
            grp = [r for b, rs in group_units.items() if pw and pw <= b for r in rs]
            if grp:
                mx = sum(r["p"]["lp"][0] for r in grp) / len(grp)
                my = sum(r["p"]["lp"][1] for r in grp) / len(grp)
                med = min(grp, key=lambda r: (r["p"]["lp"][0] - mx) ** 2 + (r["p"]["lp"][1] - my) ** 2)
                pt, cq, how = tuple(med["p"]["lp"]), "approx", f"central Einzellage of {len(grp)} in the Bereich"
        if pt is None:
            hit = countries.place_in(iso, [pr["name"]], whole=True)
            if hit:
                pt, cq, how = hit[1], "approx", f"gazetteer town '{hit[0]}'"
        if pt is None:
            # the label point of the polygon of its subregion/region appellation (Velkopavlovická for Modré Hory)
            for key in ("subregion", "region"):
                if not pr.get(key):
                    continue
                k0, k1 = keys_of([str(pr[key])])
                c = main_pool.lookup(k0, k1, "exact") or main_pool.lookup(k0, k1, "variant")
                if c and pr[key] != pr["name"]:
                    fid = sorted(c, key=lambda i: by_id[i]["p"]["area"])[0]
                    lp = by_id[fid]["p"]["lp"]
                    pt, cq, how = (lp[0], lp[1]), "approx", f"label point of {key} polygon {fid}"
                    break
        if pt is None:
            for key in ("_subregion_id", "_region_id"):
                rg = rg_by_id.get(pr.get(key))
                if rg and rg.get("lat") is not None:
                    pt, cq, how = (rg["lon"], rg["lat"]), "approx", f"region centroid ({rg['name']})"
                    break
        if pt is None:
            hit = countries.place_in(iso, [pr["name"], pr.get("subregion"), pr.get("region")])
            if hit:
                pt, cq, how = hit[1], "approx", f"gazetteer place '{hit[0]}'"
        if pt is None:
            ctx.rep["unplaced"].append(f"- {iso}: {pr['name']}")
            st["profiles_unplaced"] += 1
            continue
        pr["_map"] = "point"
        pr["_pt"] = (round(pt[0], 4), round(pt[1], 4))
        pr["_cq"] = "approx" if cq not in ("precise", "approx") else cq
        style, _ = derive_style(pr, None, grapes, gmap.get(pr["_id"]))
        parent = pip(*pr["_pt"])
        par_lvl = by_id[parent]["p"]["lvl"] + 1 if parent else 0
        extra.append({"id": pr["_id"], "name": pr["name"], "country": iso, "cat": pr.get("cat") or "",
                      "subcat": pr.get("subcat"), "style": style, "cq": pr["_cq"], "parent": parent,
                      "lvl": par_lvl, "pt": pr["_pt"], "fine": 1 if pr["_fine"] else 0})
        ctx.rep["noprof_poly"].append(f"| {iso} | {pr['name']} | point: {how} |")
        st["extra_points"] += 1
    for pr in profs:
        if not pr["_poly"] and pr["_map"] is None:
            ctx.rep["noprof_poly"].append(f"| {iso} | {pr['name']} | not placed (content only) |")
    # spread approximate points that landed on the same spot (several profiles on one region centroid) on a
    # small ring so each stays tappable
    stacks = defaultdict(list)
    for e in extra:
        stacks[e["pt"]].append(e)
    for pt0, lst in stacks.items():
        if len(lst) < 2:
            continue
        movable = [e for e in lst if e["cq"] == "approx"] or lst[1:]
        n = len(movable)
        rad = 0.03 + 0.004 * n
        for j, e in enumerate(sorted(movable, key=lambda e: e["id"])):
            a = 2 * math.pi * j / n
            e["pt"] = (round(pt0[0] + rad * math.cos(a) / max(math.cos(math.radians(pt0[1])), 0.2), 4),
                       round(pt0[1] + rad * math.sin(a), 4))
            prof_by_id[e["id"]]["_pt"] = e["pt"]
            e["cq"] = "approx"
            prof_by_id[e["id"]]["_cq"] = "approx"
        st["points_spread"] += n

    # ---- 7. region outlines
    extra_by_id = {e["id"]: e for e in extra}
    region_feats = []
    for rg in regions:
        polys = [by_id[i] for i in rg["_app_ids"] if i in by_id and not by_id[i]["fine"]]
        src = None
        geom = None
        if polys:
            big = [r for r in polys if r["p"]["area"] > 60000]
            rest = [r for r in polys if r["p"]["area"] <= 60000]
            if big and rest:
                ctx.rep["regions"].append(f"- {iso} region '{rg['name']}': outline ignores very large members " + ", ".join(r["p"]["id"] for r in big))
                polys = rest
            if len(polys) >= 4:
                areas = sorted(r["p"]["area"] for r in polys)
                med = areas[len(areas) // 2]
                member_ids = {r["p"]["id"] for r in polys}
                out_l = [r for r in polys if r["p"]["area"] > 25 * max(med, 1) * len(polys)
                         and not any(r["p"]["id"] in ancestors(m) for m in member_ids)]
                if out_l and len(out_l) < len(polys):
                    ctx.rep["regions"].append(f"- {iso} region '{rg['name']}': outline ignores outlier members " + ", ".join(r["p"]["id"] for r in out_l))
                    polys = [r for r in polys if r not in out_l]
            geom = outline_union([r["shp"] for r in polys])
            src = "union"
        if geom is None:
            pts = [(s["lon"], s["lat"]) for i in rg["_app_ids"] for s in sites_by_app.get(i, [])]
            pts += [extra_by_id[i]["pt"] for i in rg["_app_ids"] if i in extra_by_id]
            if not pts and rg.get("lat") is not None:
                pts = [(rg["lon"], rg["lat"])]
            geom = outline_hull(pts)
            src = "hull" if geom is not None else None
        rg["_outline"] = src
        if geom is None:
            continue
        gj = geom_json(geom)
        if gj is None:
            continue
        lp = None
        if rg.get("lat") is not None and geom.buffer(0.05).contains(Point(rg["lon"], rg["lat"])):
            lp = [round(rg["lon"], 4), round(rg["lat"], 4)]
        region_feats.append({"type": "Feature", "properties": {
            "id": rg["_id"], "name": rg["name"], "country": iso, "lp": lp or label_point(geom),
            "bbox": bbox4(geom.bounds), "src": src, "n": len(polys) if src == "union" else 0},
            "geometry": gj})
        st["region_outlines_" + src] += 1
    st["regions"] = len(regions)

    # ---- 8. report material: polygons without profiles
    nop = sorted((r for r in main if not r["p"]["prof"] and not r["p"].get("pref")), key=lambda r: -r["p"]["area"])
    st["polygons_with_pref"] = sum(1 for r in main + fine if r["p"].get("pref"))
    st["polygons_without_profile"] = len(nop)
    if M and profs:
        for r in nop[:15]:
            ctx.rep["noprof"].append(f"| {iso} | {r['p']['name']} | {r['p']['area']} | {r['p'].get('cat', '')} |")
    elif nop:
        ctx.rep["noprof"].append(f"| {iso} | (no research profiles for this country yet: {len(nop)} polygons) | | |")

    # ---- 9. assemble outputs
    out["varieties_src"][iso] = gmap
    out["extra"].extend(extra)
    out["regions"].extend(region_feats)
    for s in sites:
        if s.get("lat") is None:
            continue
        out["sites"].append({"type": "Feature", "properties": {
            "id": s["id"], "name": s["name"], "kind": s.get("kind"), "country": iso, "class": s.get("class"),
            "app": s.get("app"), "cq": s.get("coord_quality") if s.get("coord_quality") in ("precise", "approx") else "approx"},
            "geometry": {"type": "Point", "coordinates": [s["lon"], s["lat"]]}})
    st["sites"] = len(sites)
    if M:
        out["content"][iso] = assemble_content(ctx, iso, M, profs, regions, sites, countries, country_bbox, resolve, sites_by_name)
    for pr in profs:
        out["prof_ctx"][pr["_id"]] = (pr.get("subregion"), pr.get("region"))
    return extra


def merge_bboxes(bbs):
    bbs = [b for b in bbs if b]
    if not bbs:
        return None
    return [min(b[0] for b in bbs), min(b[1] for b in bbs), max(b[2] for b in bbs), max(b[3] for b in bbs)]


def public(rec):
    return {k: v for k, v in rec.items() if not k.startswith("_")}


def assemble_content(ctx, iso, M, profs, regions, sites, countries, country_bbox, resolve, sites_by_name):
    c = public(M["country"]) if M["country"] else {"iso2": iso, "name": countries.names.get(iso, iso.upper())}
    c.pop("country", None)
    c = {"id": iso, **c}
    c["iso2"] = iso
    if not M["country"]:
        ctx.warn(f"content {iso}: no country entry, minimal stub written")
    hist = []
    for h in as_list(c.get("history")):
        if not isinstance(h, dict):
            continue
        h = dict(h)
        if h.get("lat") is not None or h.get("lon") is not None:
            stt, la, lo = countries.check(iso, h.get("lat"), h.get("lon"), country_bbox)
            if stt in ("ok", "near", "swapped", "nocheck"):
                h["lat"], h["lon"] = la, lo
            elif stt == "far":
                # history can legitimately happen abroad (e.g. English Bordeaux in gb's timeline)
                h["lat"], h["lon"] = round(la, 4), round(lo, 4)
                h["abroad"] = 1
                ctx.rep["coords"].append(f"- {iso} history '{h.get('title')}': outside the country, kept (abroad:1)")
            else:
                ctx.rep["coords"].append(f"- {iso} history '{h.get('title')}': {stt} coordinates dropped")
                h.pop("lat", None)
                h.pop("lon", None)
        hist.append(h)
    if hist:
        c["history"] = hist
    regs = []
    for rg in regions:
        r = public(rg)
        r.pop("country", None)
        r = {"id": rg["_id"], **r, "app_ids": rg["_app_ids"]}
        if rg.get("_parent"):
            r["parent_id"] = rg["_parent"]
        r["outline"] = rg.get("_outline")
        regs.append(r)
    profiles, fine_profiles = OrderedDict(), OrderedDict()
    site_ids_by_name = {norm(s["name"]): s["id"] for s in sites}
    for pr in sorted(profs, key=lambda p: p["_id"]):
        d = public(pr)
        for k in ("match", "country", "id"):
            d.pop(k, None)
        d["map"] = pr["_map"]
        if pr.get("_region_id"):
            d["region_id"] = pr["_region_id"]
        if pr.get("_subregion_id"):
            d["subregion_id"] = pr["_subregion_id"]
        if pr["_map"] == "point":
            d["lp"] = list(pr["_pt"])
        if d.get("contains"):
            ids = []
            for nm in str_list(d["contains"]):
                sid = site_ids_by_name.get(norm(nm))
                ids.append(sid or resolve(nm)[0])
            d["contains_ids"] = ids
        if pr.get("_fine"):
            d["fine"] = 1
            fine_profiles[pr["_id"]] = d
        else:
            profiles[pr["_id"]] = d
    out_sites = []
    for s in sites:
        d = public(s)
        d.pop("country", None)
        out_sites.append({"id": s["id"], **{k: v for k, v in d.items() if k != "id"}, "app": s.get("app")})
    return {"country": c, "regions": regs, "profiles": profiles, "sites": out_sites, "fine_profiles": fine_profiles}


# ====================================================================== ctx (search disambiguation)
CTX_MAX = 30
# reg keys that name the place a fine unit belongs to, by unit type (normalised subcat); first usable wins
CTX_REG_KEYS = {
    "einzellage": ["gemarkungen", "gemeinden"],
    "ried": ["kg", "weinbauflur", "gemeinde"],
    "mga": ["communes", "comuni"],
    "uga": ["comuni", "communes"],
    "pieve": ["comuni", "communes"],
    "premier cru": ["dgc_of"], "grand cru": ["dgc_of"], "dgc": ["dgc_of"],
    "cru village": ["subregion", "terroir"],
    "lieu dit": ["aoc", "communes"],
    "municipio": ["zona"],
}
CTX_REG_DEFAULT = ["kg", "gemarkungen", "gemeinde", "gemeinden", "communes", "comuni", "commune", "village",
                   "dgc_of", "aoc", "subregion", "zona"]
CTX_REG_LATE = ["bereich", "grosslage", "bezirk", "doc", "county", "province", "state"]
US_STATES = {"AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
             "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii",
             "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky",
             "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan",
             "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska",
             "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
             "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon",
             "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota",
             "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington",
             "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
             "NSW": "New South Wales", "VIC": "Victoria", "SA": "South Australia",
             "TAS": "Tasmania", "QLD": "Queensland", "ACT": "Australian Capital Territory", "NT": "Northern Territory",
             "ON": "Ontario", "BC": "British Columbia", "QC": "Quebec", "NS": "Nova Scotia"}
AU_STATES = {"WA": "Western Australia", "SA": "South Australia"}


def ctx_values(v):
    """reg value -> list of place strings (handles lists, "['A', 'B']" reprs and "A, B")."""
    if v is None:
        return []
    if isinstance(v, (int, float)):
        return []
    if isinstance(v, list):
        items = v
    else:
        t = str(v).strip()
        if t.startswith("[") and t.endswith("]"):
            items = [a or b for a, b in re.findall(r"'([^']*)'|\"([^\"]*)\"", t)]
        else:
            items = re.split(r"\s*[,;|]\s*", t)
    return [str(x).strip() for x in items if str(x).strip() and not re.fullmatch(r"[\d .-]+", str(x).strip())]


def ctx_short(vals):
    vals = [v for v in dict.fromkeys(vals) if v]
    if not vals:
        return None
    if len(vals) > 1:
        j = ", ".join(vals)
        if len(j) <= CTX_MAX:
            return j
        first = vals[0] if len(vals[0]) <= CTX_MAX - 4 else ctx_short([vals[0]])[:CTX_MAX - 4].rstrip("… ") + "…"
        return f"{first} +{len(vals) - 1}"
    v = re.sub(r"\s+", " ", vals[0]).strip()
    if len(v) <= CTX_MAX:
        return v
    cut = v[:CTX_MAX - 1].rsplit(" ", 1)[0].rstrip(",;:/-( ")
    return (cut if len(cut) >= 8 else v[:CTX_MAX - 1]) + "…"


class Admin1:
    """Natural Earth admin-1 units (raw/ne_10m), loaded lazily per country, for a last-resort ctx."""

    def __init__(self, ctx):
        self.path = os.path.join(ctx.root, "raw", "ne_10m", "ne_10m_admin_1_states_provinces",
                                 "ne_10m_admin_1_states_provinces.shp")
        self.reader, self.by_iso, self.trees = None, None, {}
        try:
            import shapefile  # pyshp
            if os.path.exists(self.path):
                self.reader = shapefile.Reader(self.path, encoding="utf-8")
                names = [f[0] for f in self.reader.fields[1:]]
                self.by_iso = defaultdict(list)
                for i, rec in enumerate(self.reader.iterRecords(fields=["iso_a2", "name", "region"])):
                    self.by_iso[str(rec[0]).lower()].append((i, (rec[1], rec[2])))
        except Exception as e:  # pragma: no cover
            ctx.warn(f"ctx: admin-1 units unavailable ({e})")
            self.reader = None

    def lookup(self, iso, lon, lat):
        if self.reader is None or lon is None or lat is None:
            return None
        if iso not in self.trees:
            geoms, labels = [], []
            for i, nm in self.by_iso.get(iso, []):
                try:
                    g = fix_geom(shape(self.reader.shape(i).__geo_interface__))
                except Exception:
                    g = None
                if g is not None and nm:
                    geoms.append(g)
                    labels.append(nm)
            self.trees[iso] = (STRtree(geoms), geoms, labels) if geoms else None
        t = self.trees[iso]
        if t is None:
            return None
        pt = Point(lon, lat)
        hits = [j for j in t[0].query(pt, predicate="intersects")]
        if not hits:
            hits = [j for j in t[0].query(pt.buffer(0.05), predicate="intersects")]
        return t[2][min(hits, key=lambda j: t[1][j].distance(pt))] if hits else None


def assign_ctx(ctx, feats, out, countries):
    """Short `ctx` string per appellation, fine unit, extra point and site, so same-named units can be told apart
    in search ("Ried Goldberg · Langenlois"). Candidates are tried in order, skipping ones the name already
    contains; same-named units that still collide get a second qualifier."""
    recs = {}
    for iso, d in feats.items():
        for r in d["main"] + d["fine"]:
            recs[r["p"]["id"]] = r["p"]
    names = {i: p["name"] for i, p in recs.items()}
    for e in out["extra"]:
        names.setdefault(e["id"], e["name"])
    region_names = {f["properties"]["id"]: f["properties"]["name"] for f in out["regions"]}
    pctx = out["prof_ctx"]
    member_region = {}
    for c in out["content"].values():
        for rg in c.get("regions", []):
            for aid in rg.get("app_ids") or []:
                cur = member_region.get(aid)
                if cur is None or len(rg["app_ids"]) < cur[0]:
                    member_region[aid] = (len(rg["app_ids"]), rg["name"])
    admin1 = Admin1(ctx)

    def adm(iso, ll):
        if not ll:
            return []
        hit = admin1.lookup(iso, ll[0], ll[1])
        return [[x] for x in (hit or ()) if isinstance(x, str) and x.strip()]

    def member(pid):
        return [[member_region[pid][1]]] if pid in member_region else []

    def place_names(p, keys):
        reg = p.get("reg") or {}
        outv = []
        for k in keys:
            vals = ctx_values(reg.get(k))
            if k == "state":
                vals = [US_STATES.get(v.upper(), v) if p.get("country") in ("us", "ca") else
                        AU_STATES.get(v.upper(), US_STATES.get(v.upper(), v)) for v in vals]
            if k == "bereich":
                vals = [re.sub(r"^(Bereich|Ber\.)\s*", "Bereich ", v).replace("Dt.", "Deutsche") for v in vals]
            if vals:
                outv.append(vals)
        return outv

    def ancestors_names(pid, depth=3):
        res, cur, seen = [], recs.get(pid, {}).get("parent"), set()
        while cur and cur in recs and cur not in seen and len(res) < depth:
            seen.add(cur)
            res.append([names[cur]])
            cur = recs[cur].get("parent")
        return res

    def prof_regions(pid):
        sub, reg = pctx.get(pid, (None, None))
        return [[x] for x in (sub, reg) if isinstance(x, str) and x.strip()]

    def cands_poly(p, fine):
        sc = norm(p.get("subcat") or "")
        c = []
        if fine:
            c += place_names(p, CTX_REG_KEYS.get(sc, CTX_REG_DEFAULT))
            anc = ancestors_names(p["id"])
            par = p.get("parent")
            c += anc[:1] + prof_regions(p["id"]) + (prof_regions(par) if par else []) + anc[1:]
            c += place_names(p, CTX_REG_LATE)
            c += adm(p["country"], p.get("lp"))
        else:
            sub, reg = pctx.get(p["id"], (None, None))
            if sub:
                c.append([sub])
            c += ancestors_names(p["id"], depth=1)
            if reg:
                c.append([reg])
            c += member(p["id"])
            c += place_names(p, ["state", "province", "county"])
            c += ancestors_names(p["id"])[1:]
            par = p.get("parent")
            c += prof_regions(par) if par else []
            c += adm(p["country"], p.get("lp"))
            c += place_names(p, ["comunas", "gu"])
        return c

    def usable(name, cands):
        nk = " " + norm(name) + " "
        res = []
        for vals in cands:
            vals = [v for v in vals if (" " + norm(v) + " ") not in nk and nk.strip() not in norm(v)]
            if not vals:
                continue
            sh = ctx_short(vals)
            if sh and sh not in res:
                res.append(sh)
        return res

    items = []  # (kind, country, name, cand list, setter)
    for iso, d in feats.items():
        for r in d["main"] + d["fine"]:
            p = r["p"]
            items.append(("app", iso, p["name"], usable(p["name"], cands_poly(p, r["fine"])), p))
    for e in out["extra"]:
        c = prof_regions(e["id"]) + ([[names[e["parent"]]]] if e.get("parent") in names else [])
        if e.get("parent"):
            c += ancestors_names(e["parent"], depth=1)
        c += member(e["id"]) + adm(e["country"], e.get("pt"))
        items.append(("app", e["country"], e["name"], usable(e["name"], c), e))
    site_props, f_coords = {}, {}
    for f in out["sites"]:
        sp = f["properties"]
        site_props[sp["id"]] = sp
        f_coords[sp["id"]] = f["geometry"]["coordinates"]
    content_sites = {s["id"]: s for c in out["content"].values() for s in c.get("sites", [])}
    for sid, sp in site_props.items():
        s = content_sites.get(sid, {})
        c = []
        for k in ("app", "app_main"):
            if s.get(k) in names:
                c.append([names[s[k]]])
        if s.get("app_label"):
            c.append([re.sub(r"\s*\(.*?\)", "", s["app_label"]).strip()])
        if s.get("region_hint") in region_names:
            c.append([region_names[s["region_hint"]]])
        if s.get("app") in recs:
            c += ancestors_names(s["app"], depth=2)
        if s.get("app"):
            c += prof_regions(s["app"])
        c += adm(sp["country"], (f_coords.get(sid)))
        items.append(("site", sp["country"], sp["name"], usable(sp["name"], c), sp))

    # primary choice: first candidate that fits, else the first one shortened (ctx_short already shortens)
    for kind, iso, name, cands, obj in items:
        whole = [c for c in cands if not c.endswith("…")]
        obj["ctx"] = (whole or cands or [None])[0]
        if whole and cands and whole[0] != cands[0]:
            cands.remove(whole[0])
            cands.insert(0, whole[0])
    # same-named units of one kind in one country that still share a ctx get a second qualifier
    groups = defaultdict(list)
    for it in items:
        groups[(it[0], it[1], norm(it[2]))].append(it)
    items = [it[1:] for it in items]
    groups = {k: [it[1:] for it in v] for k, v in groups.items()}
    st = Counter()
    for key, lst in groups.items():
        if len(lst) < 2:
            continue
        st["groups"] += 1
        st["members"] += len(lst)
        def sig(it):
            o = it[3]
            return (o.get("ctx"), o.get("cat"), o.get("subcat"), o.get("kind"))
        by = defaultdict(list)
        for it in lst:
            by[sig(it)].append(it)
        for sg, sub in by.items():
            cv = sg[0]
            if len(sub) < 2:
                continue
            # try a single later candidate that separates them, else a combination of the first two
            for j in range(1, 4):
                alt = [it[2][j] if len(it[2]) > j else None for it in sub]
                if None not in alt and len(set(alt)) == len(alt):
                    for it, a in zip(sub, alt):
                        it[3]["ctx"] = a
                    break
            else:
                for it in sub:
                    extra_c = [c for c in it[2][1:] if c != cv]
                    if cv and extra_c:
                        comb = f"{cv}, {extra_c[0]}"
                        it[3]["ctx"] = comb if len(comb) <= CTX_MAX else ctx_short([cv])[:14].rstrip("… ") + "…, " + \
                            ctx_short([extra_c[0]])[:CTX_MAX - 17]
        final = Counter(sig(it) for it in lst)
        dup = sum(n for n in final.values() if n > 1)
        if dup:
            st["unresolved"] += dup
            ctx.rep["ctx_dups"].append(f"- {key[1]} {key[0]} '{lst[0][1]}' x{len(lst)}: " +
                                       ", ".join(f"{k[0] or '(none)'} x{n}" for k, n in final.items() if n > 1))
    for it in items:
        if it[3].get("ctx") is None:
            it[3].pop("ctx", None)
            st["no_ctx"] += 1
        elif len(it[3]["ctx"]) > CTX_MAX:
            it[3]["ctx"] = ctx_short([it[3]["ctx"]])
    for c in out["content"].values():
        for s in c.get("sites", []):
            if site_props.get(s["id"], {}).get("ctx"):
                s["ctx"] = site_props[s["id"]]["ctx"]
    ctx.notes.append(f"ctx: {len(items)} entries, {st['groups']} same-name groups ({st['members']} entries), "
                     f"{st['unresolved']} still ambiguous, {st['no_ctx']} without ctx")


# ====================================================================== geo output writing + climate
PROP_FIRST = ["id", "name", "ctx", "alt", "country", "cat", "subcat", "src", "bq", "area", "parent", "lp", "bbox",
              "varieties", "styles", "reg", "style", "prof", "pref", "lvl", "clim"]


def feature_out(r):
    p = r["p"]
    props = {k: p[k] for k in PROP_FIRST if k in p}
    props.update({k: v for k, v in p.items() if k not in props})
    return {"type": "Feature", "properties": props, "geometry": r["g"]}


def write_geo_outputs(ctx, srcs, feats):
    written = {}
    for s in srcs:
        recs = feats.get(s["iso2"], {}).get("fine" if s["fine"] else "main", [])
        if not recs:
            continue
        recs.sort(key=lambda r: (-r["p"]["area"], r["p"]["id"]))
        sp = s["site_path"]
        now = sha_file(sp) if os.path.exists(sp) else None
        if now is not None and now != s["seen_sha"]:
            ctx.warn(f"geo {s['name']}: changed while integrating; not overwritten (rerun integrate.py)")
            written[s["name"]] = os.path.getsize(sp)
            continue
        fc = {"type": "FeatureCollection", "features": [feature_out(r) for r in recs]}
        written[s["name"]] = write_json(sp, fc)
        ctx.outprints[s["name"]] = {f["properties"]["id"]: feature_print(f["properties"], f["geometry"])
                                    for f in fc["features"]}
        ctx.outclim[s["name"]] = {f["properties"]["id"]: clim_hash(f["properties"]["clim"])
                                  for f in fc["features"] if isinstance(f["properties"].get("clim"), dict)}
        ctx.manifest[s["name"]]["out_sha"] = sha_file(sp)
        s["seen_sha"] = ctx.manifest[s["name"]]["out_sha"]
    return written


# ---------------------------------------------------------------------- climate (derived data, versioned cache)
# `clim` is never taken from geo inputs. It is reused only from work/geo_src/_clim_v.json, whose entries are
# keyed by a hash of everything climate_enrich.py reads for a feature (id, geometry, lp, area, the feature's
# 30 m topo e/e5/e95/w) and which is discarded as a whole when the climate code version changes (hash of
# climate_enrich.py, climate_downscale.py, work/climate_lapse.json). Features without an entry are computed by
# running climate_enrich.py on temporary files (work/clim_tmp/) holding only those features; site files are
# never handed to it. clim written in place into our outputs by someone else (a manual climate_enrich run) is
# accepted only if that file is newer than the climate code and the value differs from what we last wrote.
CLIM_CODE = ("scripts/climate_enrich.py", "scripts/climate_downscale.py", "work/climate_lapse.json")


def clim_version(ctx):
    if not os.path.exists(ctx.clim_script):
        return None, 0.0
    h, newest = hashlib.sha256(), 0.0
    paths = [ctx.clim_script] + [os.path.join(ctx.root, x) for x in CLIM_CODE[1:]]
    paths += [os.path.join(os.path.dirname(ctx.clim_script), "climate_downscale.py")]
    for path in dict.fromkeys(paths):
        if os.path.exists(path):
            h.update(os.path.basename(path).encode())
            with open(path, "rb") as f:
                h.update(f.read())
            newest = max(newest, os.path.getmtime(path))
    return h.hexdigest()[:16], newest


def load_topo_targets(ctx):
    """The topo fields climate_enrich.py uses per feature id (site/data/topo/*.json, like climate_downscale)."""
    out = {}
    d = os.path.join(ctx.site_data, "topo")
    if not os.path.isdir(d):
        return out
    for n in sorted(os.listdir(d)):
        if not n.endswith(".json") or (n.startswith("_") and n != "_sites.json"):
            continue
        obj = read_json(os.path.join(d, n), ctx, lenient=False)
        if isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, dict):
                    out[k] = [v.get("e"), v.get("e5"), v.get("e95"), v.get("w")]
    return out


def clim_key(ctx, fid, geom, lp, area):
    s = json.dumps([fid, geom, lp, area, ctx.topo_targets.get(fid)], ensure_ascii=False, separators=(",", ":"),
                   sort_keys=True)
    return hashlib.md5(s.encode("utf-8")).hexdigest()


def clim_hash(c):
    return hashlib.md5(json.dumps(c, sort_keys=True, separators=(",", ":")).encode()).hexdigest()[:12]


def note_external_clim(ctx, n, fc, site_path):
    """Remember clim values that someone wrote into our output after our last write (validated later)."""
    ours = ctx.outclim.get(n) or {}
    got = []
    for f in fc.get("features") or []:
        p = (f or {}).get("properties") if isinstance(f, dict) else None
        if not isinstance(p, dict) or not isinstance(p.get("clim"), dict) or p.get("id") not in ours:
            continue
        if clim_hash(p["clim"]) != ours[p["id"]]:
            got.append((p["id"], f.get("geometry"), p.get("lp"), p.get("area"), p["clim"]))
    if got:
        ctx.clim_external.append((n, os.path.getmtime(site_path), got))


def init_clim(ctx):
    ctx.clim_ver, ctx.clim_code_mtime = clim_version(ctx)
    path = os.path.join(ctx.geo_src, "_clim_v.json")
    ctx.clim_cache_path = path
    old = read_json(path, ctx, lenient=False) if os.path.exists(path) else None
    if isinstance(old, dict) and old.get("version") == ctx.clim_ver and isinstance(old.get("entries"), dict):
        ctx.clim_entries = old["entries"]
    else:
        ctx.clim_entries = {}
        if isinstance(old, dict) and old.get("entries"):
            ctx.notes.append(f"climate: code version changed ({old.get('version')} -> {ctx.clim_ver}), "
                             f"{len(old['entries'])} cached values dropped")
    if ctx.args.force_clim:
        ctx.clim_entries = {}
    ctx.topo_targets = load_topo_targets(ctx)
    # external in-place climate runs: accept only if newer than the climate code
    acc = rej = 0
    for n, mtime, got in ctx.clim_external:
        if ctx.clim_ver is None or mtime <= ctx.clim_code_mtime or ctx.args.force_clim:
            rej += len(got)
            continue
        for fid, geom, lp, area, c in got:
            ctx.clim_entries[clim_key(ctx, fid, geom, lp, area)] = c
            acc += 1
    if acc or rej:
        ctx.notes.append(f"climate: {acc} values written into outputs by a climate run accepted, {rej} rejected "
                         f"(older than the climate code)")


def apply_clim(ctx, feats):
    """Set p['clim'] from the versioned cache; return the records still lacking an entry."""
    missing = []
    for d in feats.values():
        for r in d["main"] + d["fine"]:
            p = r["p"]
            r["ck"] = clim_key(ctx, p["id"], r["g"], p.get("lp"), p.get("area"))
            if r["ck"] in ctx.clim_entries:
                c = ctx.clim_entries[r["ck"]]
                if c:
                    p["clim"] = c
                else:
                    p.pop("clim", None)
            else:
                p.pop("clim", None)
                missing.append(r)
    return missing


def climate_step(ctx, srcs, feats):
    missing = apply_clim(ctx, feats)
    total = sum(len(d["main"]) + len(d["fine"]) for d in feats.values())
    if not missing:
        ctx.notes.append(f"climate: all {total} features from the cache (version {ctx.clim_ver})")
        return
    if ctx.clim_ver is None:
        ctx.notes.append(f"climate: {rel(ctx, ctx.clim_script)} not present; {len(missing)} features without clim")
        return
    if ctx.args.no_clim:
        ctx.notes.append(f"climate: skipped (--no-clim); {len(missing)} of {total} features without clim")
        return
    tmp = os.path.join(ctx.work, "clim_tmp")
    shutil.rmtree(tmp, ignore_errors=True)
    os.makedirs(tmp, exist_ok=True)
    groups = defaultdict(list)
    for r in missing:
        groups[r["file"]].append(r)
    paths, by_ck = [], {}
    for n, recs in sorted(groups.items()):
        for i in range(0, len(recs), 2000):
            part = recs[i:i + 2000]
            path = os.path.join(tmp, f"{n[:-8]}_{i // 2000}.geojson")
            fc = {"type": "FeatureCollection", "features": [
                {"type": "Feature", "properties": {"id": r["p"]["id"], "lp": r["p"].get("lp"), "area": r["p"].get("area")},
                 "geometry": r["g"]} for r in part]}
            with open(path, "w", encoding="utf-8") as f:
                json.dump(fc, f, ensure_ascii=False, separators=(",", ":"))
            paths.append(path)
            for r in part:
                by_ck.setdefault(r["p"]["id"], []).append(r)
    t = time.time()
    ok = False
    try:
        res = subprocess.run([sys.executable, "-I", ctx.clim_script] + paths, capture_output=True, text=True,
                             timeout=ctx.args.clim_timeout)
        ok = res.returncode == 0
        if not ok:
            ctx.warn(f"climate_enrich failed (rc {res.returncode}): {(res.stderr or '').strip()[-400:]}")
    except subprocess.TimeoutExpired:
        ctx.warn("climate_enrich timed out")
    got = nodata = 0
    if ok:
        for path in paths:
            fc = read_json(path, ctx, lenient=False) or {}
            for f in fc.get("features") or []:
                p = f.get("properties") or {}
                for r in by_ck.get(p.get("id"), []):
                    c = p.get("clim") if isinstance(p.get("clim"), dict) else None
                    ctx.clim_entries[r["ck"]] = c
                    if c:
                        r["p"]["clim"] = c
                        got += 1
                    else:
                        nodata += 1
    shutil.rmtree(tmp, ignore_errors=True)
    ctx.notes.append(f"climate: computed {got} features ({nodata} without data) with {os.path.basename(ctx.clim_script)} "
                     f"in {time.time() - t:.0f}s, {total - len(missing)} from the cache, ok={ok}")


def save_clim_cache(ctx, feats):
    if ctx.clim_ver is None:
        return
    used = {r["ck"] for d in feats.values() for r in d["main"] + d["fine"] if r.get("ck")}
    entries = {k: v for k, v in ctx.clim_entries.items() if k in used}
    write_json(ctx.clim_cache_path, {"version": ctx.clim_ver, "entries": entries})


# ---------------------------------------------------------------------- terrain sidecars (topo_merge.py)
def topo_step(ctx):
    script = os.path.join(ctx.root, "scripts", "topo_merge.py")
    wt = os.path.join(ctx.work, "topo")
    if ctx.args.no_topo or not os.path.exists(script) or not os.path.exists(os.path.join(wt, "prep.pkl")):
        if os.path.exists(script) and not ctx.args.no_topo:
            ctx.notes.append("topo: work/topo/prep.pkl missing, topo_merge.py not run")
        return
    loader = ("import sys, importlib.util as u; s = u.spec_from_file_location('topo_merge', %r); "
              "m = u.module_from_spec(s); s.loader.exec_module(m); m.W = %r; m.WORK = %r; m.OUT = %r; m.main()"
              % (script, ctx.root, wt, os.path.join(ctx.site_data, "topo")))
    t = time.time()
    try:
        r = subprocess.run([sys.executable, "-I", "-c", loader], capture_output=True, text=True, timeout=1800)
        if r.returncode:
            ctx.warn(f"topo_merge.py failed (rc {r.returncode}): {(r.stderr or '').strip()[-300:]}")
        else:
            ctx.notes.append(f"topo: topo_merge.py ran in {time.time() - t:.0f}s")
    except subprocess.TimeoutExpired:
        ctx.warn("topo_merge.py timed out")


ATTR_CLIM = ("gst", "gdd", "hi", "prec", "gsp", "dtr", "mjt")


def sync_attrs(ctx, feats):
    """site/data/topo/_attrs.json: rewrite the climate columns (and country/area/fine) from the clim we just
    wrote, add rows for polygons topo has not seen yet, drop rows of polygons that no longer exist."""
    path = os.path.join(ctx.site_data, "topo", "_attrs.json")
    if not os.path.exists(path):
        return
    a = read_json(path, ctx, lenient=False)
    if not isinstance(a, dict) or not isinstance(a.get("_cols"), list):
        ctx.warn("topo/_attrs.json unreadable, not synced")
        return
    cols = a["_cols"]
    ix = {c: i for i, c in enumerate(cols)}
    out = {"_cols": cols}
    added = changed = 0
    for iso in sorted(feats):
        for r in feats[iso]["main"] + feats[iso]["fine"]:
            p = r["p"]
            row = list(a.get(p["id"]) or [None] * len(cols))
            row += [None] * (len(cols) - len(row))
            old = list(row)
            c = p.get("clim") or {}
            for k in ATTR_CLIM:
                if k in ix:
                    row[ix[k]] = c.get(k)
            if "country" in ix:
                row[ix["country"]] = iso
            if "fine" in ix:
                row[ix["fine"]] = 1 if r["fine"] else 0
            if "area_km2" in ix and row[ix["area_km2"]] is None:
                row[ix["area_km2"]] = p.get("area")
            if p["id"] not in a:
                added += 1
            elif row != old:
                changed += 1
            out[p["id"]] = row
    dropped = sum(1 for k in a if k != "_cols" and k not in out)
    write_json(path, out)
    ctx.notes.append(f"topo: _attrs.json synced ({changed} rows updated, {added} added, {dropped} dropped)")


# ====================================================================== global files, sources
def copy_globals(ctx):
    src_dir = os.path.join(ctx.content_in, "global")
    out_dir = os.path.join(ctx.content_out, "global")
    loaded = {}
    if not os.path.isdir(src_dir):
        ctx.notes.append("global: data/content/global/ not present")
        return loaded
    for path in sorted(glob.glob(os.path.join(src_dir, "*.json"))):
        name = os.path.basename(path)
        obj = read_json(path, ctx, lenient=True)
        if obj is None:
            continue
        obj = deep_clean(obj, ctx.stat["_text:global/" + name])
        write_json(os.path.join(out_dir, name), obj)
        loaded[name] = obj
    for want in ("grapes.json", "timeline.json", "glossary.json", "soils.json", "systems.json"):
        if want not in loaded:
            ctx.notes.append(f"global: {want} missing")
    return loaded


def collect_sources(ctx, used_keys, clim_present, grapes_present):
    srcs = {}
    keys = set(used_keys) | {"ne"}
    if clim_present:
        keys |= {"terraclimate", "worldclim"}
    logs = sorted(set(glob.glob(os.path.join(ctx.work, "*-log.md")) + glob.glob(os.path.join(ctx.work, "*log*.md")) +
                      glob.glob(os.path.join(ctx.work, "*", "*log*.md")) + glob.glob(os.path.join(ctx.work, "*", "*log*.txt"))))
    lines = []
    for lp in logs:
        try:
            with open(lp, encoding="utf-8", errors="replace") as f:
                lines += [ln.strip() for ln in f.read().splitlines()[:4000]]
        except Exception:
            pass
    lic_re = re.compile(r"(CC[ -]BY(?:[ -]SA)?[ -]?\d\.\d|CC0(?: 1\.0)?|ODbL[ \d.]*|Licence Ouverte[^,;)]*|Open Government Licen[cs]e[^,;)]*|[Pp]ublic domain)")
    for k in sorted(keys):
        ent = dict(SOURCE_REGISTRY.get(k, {}))
        if not ent or not ent.get("url") or not ent.get("licence"):
            pat = re.compile(r"(`%s`|\bsrc[ =:]+%s\b|^[-*]\s*%s\s*[:=])" % (re.escape(k), re.escape(k), re.escape(k)))
            for ln in lines:
                if pat.search(ln):
                    url = re.search(r"https?://[^\s)>\]]+", ln)
                    lic = lic_re.search(ln)
                    if url and not ent.get("url"):
                        ent["url"] = url.group(0).rstrip(".,")
                    if lic and not ent.get("licence"):
                        ent["licence"] = lic.group(0).strip()
                    if not ent.get("title"):
                        t = re.sub(r"https?://\S+", "", ln)
                        t = re.sub(r"^[-*#\s]*`?%s`?\s*[:=-]?\s*" % re.escape(k), "", t).strip(" -:;,")
                        ent["title"] = t[:200] or k
        if not ent:
            ent = {"title": k}
            ctx.warn(f"meta: no citation found for src key '{k}' (add it to a work/*-log.md)")
        srcs[k] = {"key": k, "title": ent.get("title") or k, "licence": ent.get("licence") or "", "url": ent.get("url") or ""}
    if grapes_present:
        srcs["vivc"] = {"key": "vivc", "title": "Vitis International Variety Catalogue (VIVC), Julius Kühn-Institut",
                        "licence": "Reference use", "url": "https://www.vivc.de/"}
    for k, ent in EXTRA_CREDITS.items():
        if (k == "cl-wiki" and "cl" not in ctx.geo_isos) or (k == "gisco" and "bgld" not in used_keys):
            continue
        if k not in srcs:
            srcs[k] = {"key": k, **ent}
    # licences the geodata agents could not confirm: flag them in the report for a human check
    for s in srcs.values():
        if re.search(r"not (stated|specified)", s["licence"], re.I):
            ctx.rep["licence"].append(f"- `{s['key']}`: {s['title'][:90]} ({s['licence']})")
    return [srcs[k] for k in sorted(srcs)]


# ====================================================================== main
def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--root", default=DEFAULT_ROOT)
    ap.add_argument("--no-clim", action="store_true", help="do not run scripts/climate_enrich.py")
    ap.add_argument("--force-clim", action="store_true", help="recompute clim for every feature (ignore the cache)")
    ap.add_argument("--clim-script", default=None)
    ap.add_argument("--no-topo", action="store_true", help="do not run scripts/topo_merge.py")
    ap.add_argument("--clim-timeout", type=int, default=3600)
    ap.add_argument("-v", "--verbose", action="store_true")
    ap.add_argument("--inline-fine-profiles", action="store_true",
                    help="put fine-unit profiles in {iso2}.json under fine_profiles instead of {iso2}_fine.json")
    args = ap.parse_args()
    root = os.path.abspath(args.root)
    ctx = Ctx(root, args)
    os.makedirs(ctx.geo, exist_ok=True)
    os.makedirs(ctx.content_out, exist_ok=True)

    countries = Countries(ctx)
    countries.load_places(ctx)
    srcs = sync_geo_sources(ctx)
    ctx.geo_isos = {x['iso2'] for x in srcs}
    feats = load_geo(ctx, srcs)
    merged = load_content(ctx, countries)
    globals_ = copy_globals(ctx)
    grapes = Grapes(ctx, globals_.get("grapes.json")) if globals_.get("grapes.json") is not None else None
    if globals_.get("grapes.json") is not None and not (grapes and grapes.ok):
        ctx.warn("grapes.json present but no usable grapes found")

    isos = sorted(set(k for k, v in feats.items() if v["main"] or v["fine"]) | set(merged))
    out = {"site_ids": set(), "extra": [], "regions": [], "sites": [], "content": {}, "varieties_src": {},
           "prof_ctx": {}}
    for iso in isos:
        F = feats.get(iso) or {"main": [], "fine": []}
        build_country(ctx, iso, F, merged.get(iso), countries, grapes, out)
    assign_ctx(ctx, feats, out, countries)

    # geo outputs, then climate enrichment on them, then rewrite with harvested clim
    topo_step(ctx)
    init_clim(ctx)
    climate_step(ctx, srcs, feats)
    sizes = write_geo_outputs(ctx, srcs, feats)
    write_json(ctx.manifest_path, ctx.manifest, pretty=True)
    save_clim_cache(ctx, feats)
    write_json(ctx.outclim_path, ctx.outclim)
    write_json(ctx.outprints_path, ctx.outprints)

    # ---- derived geo files
    G = ctx.geo
    index, overview = [], []
    for iso in isos:
        F = feats.get(iso) or {"main": [], "fine": []}
        for r in sorted(F["main"] + F["fine"], key=lambda r: (r["fine"], -r["p"]["area"], r["p"]["id"])):
            p = r["p"]
            e = {"id": p["id"], "name": p["name"], "alt": str_list(p.get("alt")), "country": iso, "cat": p.get("cat"),
                 "subcat": p.get("subcat"), "area": p["area"], "parent": p.get("parent"), "lp": p["lp"],
                 "bbox": p["bbox"], "bq": p.get("bq"), "style": p["style"], "prof": p["prof"], "lvl": p["lvl"]}
            if p.get("ctx"):
                e["ctx"] = p["ctx"]
            if p.get("pref"):
                e["pref"] = p["pref"]
            if r["fine"]:
                e["fine"] = 1
            else:
                overview.append({"type": "Feature", "properties": {"id": p["id"], "name": p["name"], "country": iso,
                                 "area": p["area"], "style": p["style"], "cat": p.get("cat")},
                                 "geometry": {"type": "Point", "coordinates": p["lp"]}})
            index.append(e)
    for e in out["extra"]:
        x, y = e["pt"]
        index.append({"id": e["id"], "name": e["name"], "alt": [], "country": e["country"], "cat": e["cat"],
                      "subcat": None, "area": 0, "parent": e["parent"], "lp": [x, y], "bbox": [x, y, x, y],
                      "bq": "approx", "style": e["style"], "prof": 1, "lvl": e["lvl"], "pt": 1, "cq": e["cq"]})
        if e.get("subcat"):
            index[-1]["subcat"] = e["subcat"]
        if e.get("ctx"):
            index[-1]["ctx"] = e["ctx"]
        if e.get("fine"):
            index[-1]["fine"] = 1
    write_json(os.path.join(G, "_index.json"), index)
    write_json(os.path.join(G, "_overview.geojson"), {"type": "FeatureCollection", "features": overview})
    write_json(os.path.join(G, "_regions.geojson"), {"type": "FeatureCollection", "features": out["regions"]})
    write_json(os.path.join(G, "_sites.geojson"), {"type": "FeatureCollection", "features": out["sites"]})
    write_json(os.path.join(G, "_extra_points.geojson"), {"type": "FeatureCollection", "features": [
        {"type": "Feature", "properties": {**{k: e[k] for k in ("id", "name", "country", "cat", "style", "cq")},
                                           **({"ctx": e["ctx"]} if e.get("ctx") else {}),
                                           **({"fine": 1} if e.get("fine") else {})},
         "geometry": {"type": "Point", "coordinates": list(e["pt"])}} for e in out["extra"]]})

    # _countries.json
    cmeta = {}
    for iso in isos:
        F = feats.get(iso) or {"main": [], "fine": []}
        M = merged.get(iso)
        cobj = (M or {}).get("country") or {}
        bb = merge_bboxes([r["p"]["bbox"] for r in F["main"]]) or merge_bboxes([r["p"]["bbox"] for r in F["fine"]]) \
            or countries.bbox(iso)
        if bb is None:
            pts = [f["geometry"]["coordinates"] for f in out["sites"] if f["properties"]["country"] == iso]
            pts += [list(e["pt"]) for e in out["extra"] if e["country"] == iso]
            if pts:
                bb = [min(p[0] for p in pts), min(p[1] for p in pts), max(p[0] for p in pts), max(p[1] for p in pts)]
        main_name, fine_name = f"{iso}.geojson", f"{iso}_fine.geojson"
        cmeta[iso] = {"name": cobj.get("name") or countries.names.get(iso) or iso.upper(), "bbox": bb,
                      "count": len(F["main"]), "file": main_name if F["main"] else None,
                      "bytes": sizes.get(main_name, 0) if F["main"] else 0,
                      "fine": fine_name if F["fine"] else None, "fine_count": len(F["fine"]),
                      "tier": cobj.get("tier") if cobj.get("tier") in ("major", "notable", "emerging", "minor") else None,
                      "has_content": iso in out["content"],
                      "fine_content": (f"{iso}_fine.json" if (out["content"].get(iso) or {}).get("fine_profiles")
                                       and not ctx.args.inline_fine_profiles else None),
                      "fine_profiles": len((out["content"].get(iso) or {}).get("fine_profiles") or {}),
                      "points": sum(1 for e in out["extra"] if e["country"] == iso),
                      "sites": sum(1 for f in out["sites"] if f["properties"]["country"] == iso)}
    write_json(os.path.join(G, "_countries.json"), cmeta)

    # _varieties.json
    vmap = {}
    if grapes and grapes.ok:
        area_of = {e["id"]: e["area"] for e in index}
        acc = defaultdict(set)
        for iso, gm in out["varieties_src"].items():
            for aid, gids in gm.items():
                for g in gids:
                    acc[g].add(aid)
        vmap = {g: sorted(acc.get(g, ()), key=lambda a: (-area_of.get(a, 0), a)) for g in grapes.ids}
    write_json(os.path.join(G, "_varieties.json"), vmap)

    # _climrefs.json
    refs, seen = [], set()
    by_id_all = {r["p"]["id"]: r for d in feats.values() for r in d["main"]}
    pools = {}
    for group in (CLIMREF_PRIMARY, CLIMREF_BACKUP):
        for iso, names in group:
            if len(refs) >= CLIMREF_MAX or (group is CLIMREF_BACKUP and len(refs) >= 12):
                break
            F = feats.get(iso)
            if not F or not F["main"]:
                continue
            pool = pools.setdefault(iso, build_pool(F["main"], iso in TRANSLIT_COUNTRIES))
            for nm in names:
                k0, k1 = keys_of([nm])
                c = pool.lookup(k0, k1, "exact") or pool.lookup(k0, k1, "variant")
                if not c:
                    continue
                fid, _, _ = pick_candidate(c, k0, None, by_id_all)
                cl = by_id_all[fid]["p"].get("clim") or {}
                if fid in seen or to_float(cl.get("gst")) is None or to_float(cl.get("gdd")) is None:
                    continue
                seen.add(fid)
                refs.append({"id": fid, "name": by_id_all[fid]["p"]["name"], "country": iso,
                             "gst": cl.get("gst"), "gdd": cl.get("gdd"), "hi": cl.get("hi")})
                break
    refs.sort(key=lambda r: (to_float(r["gdd"]) or 0, r["id"]))
    write_json(os.path.join(G, "_climrefs.json"), refs)
    if not refs:
        ctx.notes.append("climrefs: no reference appellation carries clim yet (empty list written)")

    # ---- content files (+ remove stale ones this script wrote before)
    written_content = []
    for iso, c in sorted(out["content"].items()):
        fp = c.pop("fine_profiles", None) or {}
        c["fine_content"] = None
        c["fine_profile_count"] = len(fp)
        if fp and ctx.args.inline_fine_profiles:
            c["fine_profiles"] = fp
        elif fp:
            c["fine_content"] = f"{iso}_fine.json"
            write_json(os.path.join(ctx.content_out, c["fine_content"]), {"country": iso, "fine_profiles": fp})
            written_content.append(c["fine_content"])
        write_json(os.path.join(ctx.content_out, f"{iso}.json"), c)
        written_content.append(f"{iso}.json")
    prev = ctx.manifest.get("_content_files", [])
    for name in prev:
        if name not in written_content and os.path.exists(os.path.join(ctx.content_out, name)):
            os.remove(os.path.join(ctx.content_out, name))
            ctx.notes.append(f"content: removed stale {name}")
    ctx.manifest["_content_files"] = written_content
    write_json(ctx.manifest_path, ctx.manifest, pretty=True)

    # ---- meta.json
    used_src = sorted({r["p"].get("src") for d in feats.values() for r in d["main"] + d["fine"] if r["p"].get("src")})
    clim_present = any("clim" in r["p"] for d in feats.values() for r in d["main"] + d["fine"])
    counts = {
        "countries": len(cmeta), "countries_with_polygons": sum(1 for v in cmeta.values() if v["file"]),
        "countries_with_content": len(out["content"]),
        "appellations": sum(len(d["main"]) for d in feats.values()),
        "fine_units": sum(len(d["fine"]) for d in feats.values()),
        "profiles": sum(len(c["profiles"]) + c.get("fine_profile_count", 0) for c in out["content"].values()),
        "fine_profiles": sum(c.get("fine_profile_count", 0) for c in out["content"].values()),
        "fine_units_with_profile": sum(1 for e in index if e.get("fine") and e.get("prof") and not e.get("pt")),
        "profiles_on_polygons": sum(1 for e in index if e.get("prof") and not e.get("pt")),
        "extra_points": len(out["extra"]), "regions": sum(len(c["regions"]) for c in out["content"].values()),
        "region_outlines": len(out["regions"]), "sites": len(out["sites"]),
        "sites_total": sum(len(c["sites"]) for c in out["content"].values()),
        "grapes": len(grapes.ids) if grapes and grapes.ok else 0,
        "with_clim": sum(1 for d in feats.values() for r in d["main"] + d["fine"] if "clim" in r["p"]),
    }
    for name in ("timeline.json", "glossary.json", "soils.json", "systems.json"):
        o = globals_.get(name)
        if o is not None:
            counts[name[:-5]] = len(o) if isinstance(o, list) else len(next((v for v in o.values() if isinstance(v, list)), o)) if isinstance(o, dict) else 0
    meta = {"built": datetime.now(timezone.utc).isoformat(timespec="seconds"), "counts": counts,
            "sources": collect_sources(ctx, used_src, clim_present, bool(grapes and grapes.ok))}
    write_json(os.path.join(ctx.site_data, "meta.json"), meta, pretty=True)

    sync_attrs(ctx, feats)

    # ---- sizes, report, summary
    total, big, nfiles = 0, [], 0
    for dp, _, fns in os.walk(ctx.site_data):
        for fn in fns:
            sz = os.path.getsize(os.path.join(dp, fn))
            total += sz
            nfiles += 1
            if sz > 12e6:
                big.append(f"{os.path.relpath(os.path.join(dp, fn), ctx.site_data)} {sz / 1e6:.1f} MB")
    site_files = sum(len(fns) for _, _, fns in os.walk(os.path.join(root, "site")))
    for b in big:
        ctx.warn(f"size: {b} exceeds 12 MB")
    if total > 60e6:
        ctx.warn(f"size: site/data totals {total / 1e6:.1f} MB (> 60 MB)")
    if site_files > 250:
        ctx.warn(f"size: site/ holds {site_files} files (> 250)")
    write_report(ctx, isos, cmeta, counts, grapes, total, nfiles, site_files)

    print(f"integrate.py: {counts['countries']} countries ({counts['countries_with_polygons']} with polygons, "
          f"{counts['countries_with_content']} with content) in {time.time() - ctx.t0:.0f}s")
    print(f"  appellations {counts['appellations']} + fine {counts['fine_units']}; profiles {counts['profiles']} "
          f"({counts['profiles_on_polygons']} on polygons, {counts['extra_points']} as points); regions {counts['regions']} "
          f"({counts['region_outlines']} outlines); sites {counts['sites']}/{counts['sites_total']} mapped; clim on {counts['with_clim']}")
    for n in ctx.notes:
        print("  " + n)
    print(f"  site/data: {nfiles} files, {total / 1e6:.2f} MB" + (f"; LARGE: {', '.join(big)}" if big else ""))
    print(f"  {len(ctx.warnings)} warnings; report: {rel(ctx, ctx.report_path)}")
    for w in ctx.warnings[:8]:
        print("  WARN " + w)


def write_report(ctx, isos, cmeta, counts, grapes, total, nfiles, site_files):
    L = [f"# Integration report", "", f"Built {datetime.now(timezone.utc).isoformat(timespec='seconds')} by scripts/integrate.py "
         f"(root `{ctx.root}`).", "", "## Summary", ""]
    L += [f"- {k}: {v}" for k, v in counts.items()]
    L += [f"- site/data: {nfiles} files, {total / 1e6:.2f} MB; site/ total files: {site_files}"] + [f"- {n}" for n in ctx.notes]
    L += ["", "## Per country", "",
          "| iso2 | polys | fine | profiles (fine) | exact | variant | translit | fuzzy | points | unplaced | no-profile polys | regions | outlines | sites | site app by name/fine/pip/none | coords dropped |",
          "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for iso in isos:
        s = ctx.stat[iso]
        L.append(f"| {iso} | {s['polygons']} | {s['fine']} | {s['profiles']} ({s['fine_profiles']}) | {s['matched_exact'] + s['matched_id']} | {s['matched_variant']} | "
                 f"{s['matched_translit']} | {s['matched_fuzzy']} | {s['extra_points']} | {s['profiles_unplaced']} | {s['polygons_without_profile']} | "
                 f"{s['regions']} | {s['region_outlines_union'] + s['region_outlines_hull']} | {s['sites']} | "
                 f"{s['site_app_name']}/{s['site_app_fine']}/{s['site_app_pip']}/{s['site_app_none']} | {s['site_coord_far'] + s['site_coord_invalid']} |")
    styles = Counter()
    for iso in isos:
        for k, v in ctx.stat[iso].items():
            if k.startswith("style:"):
                styles[k[6:]] += v
    L += ["", "Style derivation sources (polygons): " + ", ".join(f"{k} {v}" for k, v in styles.most_common()), ""]
    sections = [
        ("geo_files", "Geo inputs", "| file | status |\n|---|---|"),
        ("content_files", "Research files", "| file | records |\n|---|---|"),
        ("fuzzy", "Fuzzy matches (review these)", "| iso2 | profile | polygon | score |\n|---|---|---|---|"),
        ("ambiguous", "Ambiguous matches", ""),
        ("parentname", "Profiles joined via parent + polygon name (DGC labels)", ""),
        ("id_missing", "Explicit profile ids not found in the geo files (kept as points/content; rerun joins them)", ""),
        ("id_names", "Explicit id joins whose names differ from the polygon (check the id)", ""),
        ("geo_append", "Geo outputs edited in place by agents (pristine copies rebuilt)", ""),
        ("ctx_dups", "Same-named units whose ctx still collides", ""),
        ("dedupe", "Duplicate profiles across research files (longer kept)", ""),
        ("noprof_poly", "Profiles without polygons", "| iso2 | profile | placement |\n|---|---|---|"),
        ("unplaced", "Profiles that could not be placed (content only)", ""),
        ("noprof", "Polygons without profiles (largest 15 per country)", "| iso2 | polygon | km² | cat |\n|---|---|---|---|"),
        ("regions", "Region resolution", ""),
        ("site_app", "Site appellation names not resolved (fell back to point-in-polygon)", ""),
        ("site_label", "Site appellation values treated as place labels (app null unless inside a polygon)", ""),
        ("licence", "Sources whose licence is not stated (confirm before public release)", ""),
        ("coords", "Coordinates flagged", ""),
    ]
    for key, title, head in sections:
        rows = ctx.rep.get(key) or []
        L += [f"## {title} ({len(rows)})", ""]
        if rows:
            if head:
                L.append(head)
            L += rows[:400] + ([f"... {len(rows) - 400} more"] if len(rows) > 400 else [])
        else:
            L.append("None.")
        L.append("")
    L += ["## Text cleaning", ""]
    any_t = False
    for k in sorted(ctx.stat):
        if k.startswith("_text:") and ctx.stat[k]:
            any_t = True
            L.append(f"- {k[6:]}: " + ", ".join(f"{a} {b}" for a, b in sorted(ctx.stat[k].items())))
    if not any_t:
        L.append("No em dashes or banned words found.")
    if grapes and grapes.ok:
        L += ["", "## Variety strings not matched to grapes.json (top 40)", ""]
        L += [f"- {v} ({n})" for v, n in grapes.unmatched.most_common(40)] or ["None."]
    L += ["", f"## Warnings ({len(ctx.warnings)})", ""] + [f"- {w}" for w in ctx.warnings[:500]]
    os.makedirs(os.path.dirname(ctx.report_path), exist_ok=True)
    with open(ctx.report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")


if __name__ == "__main__":
    main()
