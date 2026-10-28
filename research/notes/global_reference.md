# Global reference layers: grapes, timeline, glossary, soils, quality systems

Deliverables (all validated with `python3 -m json.tool`, no em/en dashes, no banned words), in `/home/claude/winesite/data/content/global/`:
- `grapes.json`: 266 varieties (231 vinifera, 25 hybrids, 5 labrusca, 3 aestivalis, 2 rotundifolia). 246 linked to a VIVC passport (`vivc.id/url`). 124 have named parents; `parent_ids`/`offspring_ids` resolve to grape ids (null when the relative has no entry). Colour and clonal mutations (Pinot Gris, Pinot Blanc, Meunier, Frühburgunder, Grenache Blanc, Garnacha Peluda, Gewürztraminer) are marked `mutation_of`/`mutations` rather than as parent-offspring links. Origin confidence: 102 documented, 150 likely, 14 debated.
- `timeline.json`: 148 events, 9000 BC to July 2026, in 40 countries, sorted by year, each with sources.
- `glossary.json`: 204 terms (67 with an example place); every `related` link resolves to another term.
- `soils.json`: 33 soil types with 90 exemplar sites.
- `systems.json`: 22 systems (EU, FR, IT, ES, PT, DE, AT, HU, GR, CH, GE, MD, US, CA, AU, NZ, ZA, CL, AR, BR, CN, JP).

Reproducibility: the content lives in Python part files in `work/global/{grapes,timeline,glossary,soils,systems}_parts/` (profile extensions in `zz_*.json`). `scripts/build_global.py` merges them, resolves coordinates from cached lookups, enforces word counts, banned words and dashes, and writes the JSON. `scripts/vivc_fetch.py` and `scripts/wiki_fetch.py` produced the caches in `work/global/` (`vivc_raw.json`, `vivc_compact.txt`, `wiki_*.json`, `wd_coords*.json`). Coordinates come from Wikipedia/Wikidata geodata, except a few hand-entered village centres (flagged `"hand": true` in `work/global/wiki_extra.json`). Every grape, event and soil pin was checked against Natural Earth 10m country polygons; the only remaining mismatch is the Massandra event in Crimea, deliberately kept as `ua`.

## Grape varieties and DNA parentage (grapes.json)

### Takeaway
Parentage is anchored on VIVC's marker-confirmed pedigrees, queried for about 400 accessions in October 2026, and cross-checked with the original papers. Every DNA relationship the brief listed is confirmed, with three nuances: VIVC lists "different propositions" for Sangiovese and Carmenère, Mondeuse Blanche's role as Syrah's mother is now questioned by long-read genome data, and Koshu is a vinifera hybrid with Vitis davidii introgression.

### Cited Findings
- Cabernet Sauvignon = Cabernet Franc × Sauvignon Blanc (VIVC, confirmed by markers; Bowers & Meredith 1997) — [VIVC passport 1929](https://www.vivc.de/index.php?r=passport%2Fview&id=1929); [Wikipedia: Cabernet Sauvignon](https://en.wikipedia.org/wiki/Cabernet_Sauvignon)
- Merlot = Magdeleine Noire des Charentes × Cabernet Franc; Malbec (Côt) = Magdeleine Noire × Prunelard — [VIVC 7657](https://www.vivc.de/index.php?r=passport%2Fview&id=7657); [VIVC 2889](https://www.vivc.de/index.php?r=passport%2Fview&id=2889)
- Chardonnay, Gamay, Aligoté, Melon and Auxerrois = Heunisch Weiss (Gouais Blanc) × Pinot (VIVC; Bowers et al., Science 1999) — [VIVC 2455](https://www.vivc.de/index.php?r=passport%2Fview&id=2455)
- Syrah = Mondeuse Blanche × Dureza (VIVC). Wikipedia notes that recent long-read sequencing of Shiraz (Onetto et al.) suggests the Mondeuse Blanche relationship "may be more complex than parent-offspring" — [VIVC 11748](https://www.vivc.de/index.php?r=passport%2Fview&id=11748); [Wikipedia: Mondeuse blanche](https://en.wikipedia.org/wiki/Mondeuse_blanche)
- Riesling = ? × Heunisch Weiss in VIVC; the other parent is described as a Traminer × wild-vine seedling (Regner) — [VIVC 10077](https://www.vivc.de/index.php?r=passport%2Fview&id=10077); [Wikipedia: Riesling](https://en.wikipedia.org/wiki/Riesling)
- Tempranillo = Albillo Mayor × Benedicto (VIVC; Ibáñez, Martínez-Zapater et al. 2012) — [VIVC 12350](https://www.vivc.de/index.php?r=passport%2Fview&id=12350)
- Durif (Petite Sirah) = Syrah × Peloursin; Müller-Thurgau = Riesling × Madeleine Royale; Pinotage = Cinsaut × Pinot; Zweigelt = St. Laurent × Blaufränkisch — VIVC passports 3738, 8141, 9286, 13484
- Blaufränkisch = Zimmettraube Blau × Heunisch Weiss (VIVC; Wikipedia cites Blaue Zimmettraube as female parent) — [VIVC 1459](https://www.vivc.de/index.php?r=passport%2Fview&id=1459); [Wikipedia: Blaufränkisch](https://en.wikipedia.org/wiki/Blaufr%C3%A4nkisch)
- Grüner Veltliner = ? × Savagnin (VIVC); second parent St. Georgener-Rebe, found as a single vine near Eisenstadt — [VIVC 12930](https://www.vivc.de/index.php?r=passport%2Fview&id=12930); [Wikipedia: Grüner Veltliner](https://en.wikipedia.org/wiki/Gr%C3%BCner_Veltliner)
- Touriga Franca and Tinta Barroca = Marufo (Mourisco Tinto) × Touriga Nacional — VIVC 12593, 12462
- Furmint = Alba Imputotato × Heunisch Weiss; Hárslevelű = Furmint × Tzimliansky Belyi — VIVC 4292, 5314
- Zinfandel = Primitivo (VIVC prime name; origin "Balkan"); VIVC records a parent-offspring link with Plavac Mali, which is Crljenak Kaštelanski × Dobričić — [VIVC 9703](https://www.vivc.de/index.php?r=passport%2Fview&id=9703); [Wikipedia: Plavac Mali](https://en.wikipedia.org/wiki/Plavac_Mali)
- Mission/País/Criolla Chica = Listán Prieto (CNB Madrid 2007); Torrontés Riojano = Criolla Chica × Muscat of Alexandria; Cereza and Criolla Grande = Mission × Muscat of Alexandria; Quebranta = Mission × Negra Mole — [Wikipedia: Listán Prieto](https://en.wikipedia.org/wiki/List%C3%A1n_Prieto); VIVC 15162, 2390, 3241, 9840
- Mencía (Jaen) = Alfrocheiro × Patorra; Castelão = Cayetana Blanca × Alfrocheiro; Verdejo and Godello (Gouveio) = Castellana Blanca × Savagnin — VIVC 7623, 2324, 12949, 12953
- Hebén is recorded by VIVC as a parent of Airén, Albillo Mayor, Cayetana Blanca, Macabeo (Viura), Parellada, Pedro Ximénez and Malvasia Fina — VIVC 157, 12581, 5648, 13127, 8938, 9080, 715
- Nerello Mascalese and Gaglioppo = Sangiovese × Mantonico Bianco; Catarratto = Garganega × Mantonico Bianco; Grillo = Catarratto × Muscat of Alexandria; Lagrein = Schiava Gentile × Teroldego — VIVC 8480, 4306, 2341, 5021, 6666
- Sangiovese: VIVC lists "different propositions". Vouillamoz et al. (2007) proposed Ciliegiolo × Calabrese di Montenuovo, but VIVC's own entries give Ciliegiolo = Moscato Violetto × Sangiovese and Calabrese di Montenuovo = Sangiovese × ?, which reverses the direction — [VIVC 10680](https://www.vivc.de/index.php?r=passport%2Fview&id=10680); VIVC 2660, 22315
- Carmenère: VIVC lists "different propositions"; Gros Cabernet (VIVC: Txakoli × ?) is the second parent proposed by Boursiquot et al. 2009 — [VIVC 2109](https://www.vivc.de/index.php?r=passport%2Fview&id=2109)
- Teroldego is a full sibling of Dureza, which makes it an uncle of Syrah — [Wikipedia: Teroldego](https://en.wikipedia.org/wiki/Teroldego)
- Koshu is "a hybrid (probably naturally occurring) of Vitis vinifera and one or more East Asian Vitis species"; VIVC classes it as interspecific — [Wikipedia: Koshu (grape)](https://en.wikipedia.org/wiki/Koshu_(grape)); VIVC 6427
- American and hybrid pedigrees: Norton/Cynthiana = V. aestivalis × ((Bland × V. aestivalis) × vinifera); Concord = Catawba × V. labrusca; Catawba = V. labrusca × Sémillon; Isabella = labrusca × Meslier Petit; Vidal = Ugni Blanc × Rayon d'Or; Chambourcin = Joannès Seyve 11369 × Plantet; Seyval = Seibel 5656 × Rayon d'Or; Baco Noir = Folle Blanche × riparia; Marquette = MN 1094 × Ravat 262 (1989); Frontenac = ? × Landot 4511 (1978); L'Acadie Blanc = Cascade × Seyve-Villard 14-287 (Bradt, 1953) — VIVC 3304, 2801, 2346, 5560, 13047, 2436, 11558, 870, 22714, 15904, 17638
- World areas in 2015: Cabernet Sauvignon 341,000 ha; Merlot 266,000; Tempranillo 231,000; Airén 218,000; Chardonnay 210,000; Syrah 190,000; Grenache 163,000; Sauvignon Blanc 123,000; Pinot Noir 112,000; Ugni Blanc 111,000; Kyoho 365,000 (mostly table grapes in China); Sultanina 273,000 — [OIV Focus 2017](https://www.oiv.int/public/medias/5888/en-distribution-of-the-worlds-grapevine-varieties.pdf)
- 13 varieties cover more than a third of world vineyard area and 33 cover half — [OIV Focus 2017](https://www.oiv.int/public/medias/5888/en-distribution-of-the-worlds-grapevine-varieties.pdf)

### Inferences
- VIVC sometimes records a "parent-offspring relationship" without a direction (for example Cabernet Franc with Morenoa and Hondarrabi Beltza, Nebbiolo with Freisa and Vespolina). Where direction is unsettled I left `parents` empty and explained it in `parentage_note`, rather than inventing a direction.
- Riesling's second parent is entered as the unresolved string "Traminer × wild vine seedling (unidentified)", so the family-tree UI shows it as a node without an entry.

### Gaps
- Hectares mix sources and years: OIV 2015 for the 13 big varieties; VIVC's area tables (often 2000 to 2010) and figures cited by Wikipedia for the rest. I could not download the Anderson and Nelgen 2016 megafile (the University of Adelaide page returned 503), so figures cited "2016, Anderson and Nelgen" are approximate recollections of that dataset and should be re-checked against it.
- No VIVC accession was linked for Peloursin, Sciaccarellu (VIVC calls it Mammolo), Lambrusco (a family of varieties), Greco, Tinta Negra, Frühburgunder, St. Georgener-Rebe, Petite Arvine, Žametovka, Shiroka Melnishka or Hondarrabi Zuri; I blacklisted or skipped those where the name match was doubtful.
- 67 parents have no entry of their own (breeding numbers such as Seibel 5656, MN 1094; obscure varieties such as Alba Imputotato, Coccalona Nera, Roter Veltliner). They are listed in `meta.notes`.

## Timeline of wine history (timeline.json)

### Takeaway
148 events run from the c. 9000 BC dual domestication to Champagne's July 2026 yield cut. Recent events (2023 to 2026) were verified against primary or news sources. Ancient and early-modern facts rest on Wikipedia and Penn Museum material and stated knowledge, with uncertain figures softened.

### Cited Findings
- Dong et al. (Science, 3 March 2023): two domestication centres (Caucasus and Near East) separating about 11,000 years ago, with later introgression from western European wild vines — [CIRAD](https://umr-agap.cirad.fr/en/news/domestication-of-the-grapevine-revisited-two-centres-of-domestication-for-grapes); [Dong et al. PDF](https://boa.unimib.it/bitstream/10281/405955/2/Dong-2023-Science-VoR.pdf)
- Gadachrili Gora and Shulaveris Gora, about 50 km south of Tbilisi, near Imiri (Marneuli): earliest grape wine residues, about 6000 BC (PNAS, 13 Nov 2017, McGovern) — [Sci.News](https://www.sci.news/archaeology/worlds-oldest-wine-georgia-05427.html); [Wikipedia: Gadachrili Gora](https://en.wikipedia.org/wiki/Gadachrili_Gora)
- Jiahu settled c. 7000 BC — [Wikipedia: Jiahu](https://en.wikipedia.org/wiki/Jiahu)
- Areni-1 winery uncovered in January 2011 — [Wikipedia: Areni-1 cave](https://en.wikipedia.org/wiki/Areni-1_cave)
- About 700 imported Canaanite wine jars in tomb U-j at Abydos, about 6 litres each — [Wikipedia: Umm El Qa'ab](https://en.wikipedia.org/wiki/Umm_El_Qa%27ab)
- Carmona (Seville): wine found in 2019, published 16 June 2024 in J. Archaeological Science: Reports 57:104636; originally white; about 300 years older than the Speyer bottle (1867 find) — [Scientific American](https://www.scientificamerican.com/article/the-oldest-wine-in-the-world-title-goes-to-a-2-000-year-old-white-found-in/)
- Tokaji aszú mentioned in 1571 and in Sziksai's 1576 Nomenklatura; Szepsi legend 1630 — [Wikipedia: Tokaji](https://en.wikipedia.org/wiki/Tokaji)
- Methuen Treaty 1703, under which Portuguese wine paid no more than a set share of the duty on French wine — [Wikipedia: Methuen Treaty](https://en.wikipedia.org/wiki/Methuen_Treaty)
- Chianti first defined in 1716; Ricasoli later fixed the blend — [Wikipedia: Chianti](https://en.wikipedia.org/wiki/Chianti)
- Pombal's Companhia established 1756 and delimited the Douro — [Wikipedia](https://en.wikipedia.org/wiki/Companhia_Geral_da_Agricultura_das_Vinhas_do_Alto_Douro)
- Phylloxera first recorded in France in 1863 (Languedoc) — [Wikipedia: Great French Wine Blight](https://en.wikipedia.org/wiki/Great_French_Wine_Blight)
- Spread by country: Portugal (Douro) 1865, Austria (Klosterneuburg) 1872, Switzerland (Pregny) 1871, Germany (near Bonn) 1874, Australia 1875, Spain (Málaga and Girona) 1877, Italy (Valmadrera) 1879, South Africa 1880, Peru 1888 — [Techno-Science](https://www.techno-science.net/fr/definitions/phylloxera); Australia: undetected entry 1875 at Geelong, first diagnosis 1877, SA Phylloxera Act 1899 — [Vinehealth Australia](https://vinehealth.com.au/news/125th-gallery/)
- Millardet noticed that roadside Médoc vines sprayed with copper sulphate and lime had no mildew (Bordeaux mixture) — [Wikipedia: Bordeaux mixture](https://en.wikipedia.org/wiki/Bordeaux_mixture)
- Munson moved to Denison, Texas, in 1876; Jaeger settled at Neosho, Missouri, in 1865 — [Wikipedia: T. V. Munson](https://en.wikipedia.org/wiki/Thomas_Volney_Munson); [Wikipedia: Hermann Jaeger](https://en.wikipedia.org/wiki/Hermann_Jaeger)
- Le Roy married into Château Fortia in 1919 and co-founded the national AOC system with Capus in 1935 — [Wikipedia](https://en.wikipedia.org/wiki/Pierre_Le_Roy_de_Boiseaumari%C3%A9)
- The first Grange (1951) was experimental; Schubert visited Europe in 1950 — [Wikipedia: Penfolds Grange](https://en.wikipedia.org/wiki/Penfolds_Grange)
- Qvevri listed as Georgian national heritage in 2011 and by UNESCO in 2013 — [Wikipedia: Qvevri](https://en.wikipedia.org/wiki/Qvevri)
- Bordeaux grubbing up (announced 22 Dec 2023): 8,000 ha (half CIVB diversification, half state sanitary) at 6,000 €/ha; original plan 9,500 ha — [Réussir Vigne](https://www.reussir.fr/vigne/bordeaux-va-arracher-8-000-hectares)
- Taittinger bought land at Chilham, Kent, in 2014 and planted from 2017; Domaine Evremond's first release, Edition 1, came out in January 2025 — [Wine Anorak](https://wineanorak.com/2025/01/28/taittingers-foray-into-england-domaine-evremond-releases-its-first-wine/); Pommery's first English sparkling with Hattingley Valley in 2017 — [The Drinks Business](https://www.thedrinksbusiness.com/2017/03/champagne-pommery-to-launch-english-and-californian-sparkling-this-year/)
- China lifted its tariffs on Australian wine on 29 March 2024 — [RTHK](https://news.rthk.hk/rthk/en/component/k2/1746664-20240328.htm)
- OIV: 2024 world production was the lowest since 1961 (per Vinetur, Oct 2025); first 2025 estimate 232 mhl (228 to 235), 7 percent below the five-year average; France 35.9, Italy 47.3, Spain 29.4 mhl — [Wein.plus](https://magazine.wein.plus/news/global-wine-production-slightly-increases-in-2025-oiv-presents-first-estimates); [Vinetur](https://www.vinetur.com/2025101592228/global-wine-production-hits-63-year-low-as-2025-harvests-fall-short-across-major-regions.html)
- EU-US deal: a 15 percent tariff with no wine or spirits carve-out (1 Aug 2025) — [Shanken News Daily](https://www.shankennewsdaily.com/2025/08/01/38010/european-wines-and-spirits-face-15-tariffs/)
- The LCBO pulled US products on 4 March 2025; the ban was still in place in July 2026 amid a new 50 percent tariff threat — [Global News](https://globalnews.ca/news/11974154/lcbo-tariff-threat/)
- Learning Resources v. Trump (20 Feb 2026), 6 to 3, struck down the IEEPA tariffs; Section 122 tariffs from 24 Feb 2026 for 150 days — [Thomson Reuters](https://www.thomsonreuters.com/en-us/help/onesource-global-trade/regulatory-insights/2026/february-20th/supreme-court-rejects-ieepa-as-a-tariff-statute); [Big Hammer Wines](https://www.bighammerwines.com/blogs/vine-blog/wine-tariffs-2026-what-they-mean-for-your-next-bottle)
- EU wine package: provisional agreement 4 Dec 2025; EP plenary 10 Feb 2026 (625 to 15, with 11 abstentions); grubbing up eligible for EU funds; "alcohol-free 0.0%" at no more than 0.05 percent; "alcohol reduced" at least 30 percent below the category's normal strength; Council approval still pending at the time of the release — [European Parliament](https://www.europarl.europa.eu/news/en/press-room/20260205IPR33615/)
- Champagne 2026: fourth consecutive cut in the commercial yield, with the production cap headlined at about 250 million bottles (headline-level sources only) — [Winelabs digest, 24 Jul 2026](https://winelabs.ai/insights/news_digest/champagne-yields-plummet-us-tariffs-regional-growth-july-24-2026)

### Inferences
- The 2026 Champagne entry relies on headlines aggregated in a digest. I avoided giving a kg/ha figure because Terre de Vins framed it as "stabilising" while others reported a cut.
- Some ancient dates use conventional framing (for example Hammurabi c. 1754 BC, Uluburun c. 1300 BC) from general knowledge plus Wikipedia, and are labelled "c.".

### Gaps
- I could not confirm whether the Council formally adopted the EU wine package after February 2026, or the final Section 122 outcome after July 2026. Both events describe the state as of their source dates.
- No reliable source was found for an exact 2026 Champagne yield in kg/ha.
- The shared web-search budget ran out mid-session, so several historical figures (the size of Algeria's vineyard, the Languedoc crowd sizes, Málaga's pre-phylloxera hectares) were softened to qualitative statements instead of being verified.

## Glossary (glossary.json)

### Takeaway
204 terms cover every term the brief required, plus extras (for example Échelle des crus, En primeur, Garagiste, Tinaja, Manzanilla, TDN, Rotundone). All related links resolve, and 67 terms carry an example place with coordinates.

### Cited Findings
- Japan's 2018 standard: "Japan Wine" means 100 percent Japanese grapes; a place name requires 85 percent of grapes from the region with production there; variety and vintage require 85 percent; the Yamanashi (2013) and Hokkaido (2018) GIs require 100 percent local grapes — [USDA FAS Japan](https://www.usdajapan.org/wpusda/wp-content/uploads/2018/11/New-Wine-Labeling-Standards-Become-Effective_Tokyo_Japan_11-2-2018.pdf)
- Gimblett Gravels: about 800 ha defined by the Omahu gravels — [Wikipedia](https://en.wikipedia.org/wiki/Gimblett_Gravels)
- Colares: phylloxera cannot survive in sand; local co-op monopoly on the appellation from 1934 to 1994 — [Wikipedia: Colares DOC](https://en.wikipedia.org/wiki/Colares_DOC)
- Hermitage: about 140 ha on a granite hill; Bessards, L'Hermite, Le Méal and other lieux-dits — [Wikipedia: Hermitage AOC](https://en.wikipedia.org/wiki/Hermitage_AOC)

### Inferences
- Many definitions draw on standard reference knowledge (Oxford Companion level) rather than per-term citations. Numbers that change (counts of DOCGs, DACs and appellations) are stated approximately.

### Gaps
- Not separately verified this session: the exact current count of Italian DOCGs (stated as close to 80) and of Rioja viñedos singulares.

## Soils (soils.json)

### Takeaway
33 soil types, from Kimmeridgian marl to caliche, each with 2 to 4 exemplar vineyards (90 in total). Coordinates come from Wikipedia/Wikidata or are hand-placed vineyard points, and all were checked against country polygons.

### Cited Findings
- Kimmeridgian stage named after Kimmeridge, Dorset; term introduced by d'Orbigny (1842) — [Wikipedia: Kimmeridgian](https://en.wikipedia.org/wiki/Kimmeridgian)
- Terra rossa covers limestone and dolomite in karst regions; neutral pH; good internal drainage — [Wikipedia: Terra rossa](https://en.wikipedia.org/wiki/Terra_rossa_(soil))
- Côte-Rôtie: Côte Brune on dark iron-rich schist, Côte Blonde on pale granite and schist — [Wikipedia: Côte-Rôtie AOC](https://en.wikipedia.org/wiki/C%C3%B4te-R%C3%B4tie_AOC)
- Santorini's volcanic soils contain almost no clay, which keeps phylloxera away; koulara/kouloura bush training — [Wikipedia: Santorini (wine)](https://en.wikipedia.org/wiki/Santorini_(wine))
- Missoula floods: catastrophic glacial outburst floods across eastern Washington and northern Oregon — [Wikipedia: Missoula floods](https://en.wikipedia.org/wiki/Missoula_floods)
- Caliche: calcium carbonate accumulating at depth, binding gravel, sand and clay, in arid regions — [Wikipedia: Caliche](https://en.wikipedia.org/wiki/Caliche)
- Tuffeau: chalky or sandy, fine-grained, micaceous Loire limestone — [Wikipedia: Tuffeau](https://en.wikipedia.org/wiki/Tuffeau)

### Inferences
- Geological ages given loosely ("Miocene", "Eocene") where I could not verify specific numbers.

### Gaps
- No primary geological survey sources (BRGM, ISPRA) were consulted. Soil descriptions are expert synthesis checked against Wikipedia.

## National quality systems (systems.json)

### Takeaway
22 systems, each with a tier ladder, labelling rules, history and quirks. EU-wide changes (the 2023 ingredient labelling and the 2026 wine package) are included, and Japan, Chile and Argentina rules were verified against primary or official documents.

### Cited Findings
- Argentina: Law 25.163 (1999) and Decree 57/2004 define IP (at least 80 percent from the area), IG and DOC; INV reports 2 DOCs, with only Luján de Cuyo in use in 2022 — [Argentina.gob.ar INV report](https://www.argentina.gob.ar/sites/default/files/2018/12/vinos_con_denominacion_de_origen_0.pdf)
- Chile: Decreto 464 (1995) DO system with a 75 percent rule; the 2011 Costa / Entre Cordilleras / Andes overlays — [Wine with Seth](https://www.winewithseth.com/winewiki/chilean-do-system/)
- Georgia: the Wikipedia list states 44 appellations registered with Sakpatenti "as of October 2026" (its table lists 28) — [Wikipedia](https://en.wikipedia.org/wiki/List_of_Georgian_wine_appellations)
- Austria: Styria's three DACs began with the 2018 vintage, bringing the total to 13 at the time; three-tier regional, Ortswein, Riedenwein pyramid — [The Drinks Business](https://www.thedrinksbusiness.com/2018/07/stryia-joins-austrian-dac-system/)
- South Africa: Wine of Origin since 1973, with about 60 appellations in a hierarchy of regions, districts and wards; single-vineyard wines from under 6 ha — [Wikipedia: South African wine](https://en.wikipedia.org/wiki/South_African_wine)
- Canada: International Canadian Blend replaced 'Cellared in Canada' (CFIA, March 2018) — [Wikipedia: Canadian wine](https://en.wikipedia.org/wiki/Canadian_wine)
- US: 276 AVA boundary files in the UC Davis repository, the latest approved in late 2024 (Crystal Springs of Napa Valley) — [UC Davis AVA project](https://github.com/UCDavisLibrary/ava) (local copy `raw/ucdavis_ava`)

### Inferences
- In the Georgia entry I wrote "well over 30 registered by the mid-2020s", because the Wikipedia count of 44 could not be independently confirmed.

### Gaps
- Not verified this session: the current number of Austrian DACs (stated as 18), French AOCs (about 360), Spanish DOs (about 70), Australian GI regions (about 65), and the full list of Japanese GIs after 2018.
- I found no reliable source on whether the US Section 122 tariffs were extended after July 2026.
