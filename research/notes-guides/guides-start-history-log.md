# Guides log: start-here and wines-long-road

Files: `site/data/guides/start-here.json`, `site/data/guides/wines-long-road.json`.
Builder scripts (not part of the site): scratchpad `guides_sh/build_start.py`, `guides_sh/build_history.py`.

## Validator output (final)

```
site/data/guides/start-here.json: 6 chapters, 2597 + 0 words (~13 + 0 min at 200 wpm); 0 errors, 0 warnings
site/data/guides/wines-long-road.json: 9 chapters, 3805 + 0 words (~19 + 0 min at 200 wpm); 0 errors, 0 warnings
```

No em dashes in either file.

## Start here: structure

1. map (globe, belts, appellations, colours, nesting: Côtes du Rhône > Villages > Gigondas, Châteauneuf)
2. warmth (Chablis 15.5 °C vs Napa Valley 18.8 °C, Oakville/Rutherford 19.1 °C; Chablis Grand Cru 15.7 °C)
3. slope (Mosel 14.6 °C; Wehlener Sonnenuhr 15.2 °C, slope 45 %, aspect 207°, in 3D; Bernkasteler Doctor in satellite)
4. soil (Bordeaux: Pauillac 17.4 °C vs Pomerol 17.7 °C; Left Bank communes; Latour satellite; Right Bank)
5. names (US 75 % varietal / 85 % AVA rules; Burgundy pyramid on Vosne-Romanée, premier crus at z13.3, grands crus in 3D looking west)
6. next (look/smell/taste/think; Sancerre vs Marlborough blind pair; Cellar journal, Passport, Bottle / Log a bottle buttons, Study modes, Compare; links to region guides)

Climate figures quoted from `site/data/topo/_attrs.json` (`_cols`: country, gst, gdd, hi, prec, gsp, dtr, mjt, elev_mean, slope_mean, aspect_mean, area_km2, fine). The site labels gst as 1991–2020 TerraClimate normals, April–October north.
UI names checked in `site/index.html`: legend title "Colour of the wine", panel "Layers and colour", modes Wine style / Climate / Elevation / Country, layer "Wine belts, 30° to 50°", journal tabs Tasted / Cellar / Wishlist / Passport / Notes, profile "Bottle" button, guide "Log a bottle" button, Study modes (find it on the map, name it, flashcards; SM-2 spaced repetition; deductive tasting trainer; Blind practice), Compare (up to three places).
Counts: `_index.json` has 12,573 shapes; `_sites.geojson` 2,713 sites.

## Facts checked (source)

- AOC decree-law 30 July 1935 (Wikipedia AOC; atlas event aoc-1935).
- 27 CFR 4.23(b) 75 % varietal; 27 CFR 4.25(e)(3)(ii) 85 % AVA (eCFR fetched).
- Burgundy production split 2019–2023: regional 53 %, village + premier cru 46 %, grand cru 1 % (BIVB chiffres clés Sept 2024 PDF; the reader's mapping of labels was inferred, consistent with BBR figures).
- 1,247 climats, inscribed 2015 (UNESCO decision 39 COM).
- Mosel: 8,287 ha in 2025, Riesling about 62 % (DWI page). Atlas profile de-mosel gives 8,536 ha (a 2023 figure): not wrong but dated; I wrote "roughly 8,300".
- Judgment of Paris: 24 May 1976, 9 of 11 judges French, Montelena 1973 Chardonnay, Stag's Leap 1973 Cabernet, George Taber/Time (Wikipedia).
- Clos de Vougeot: donations 1109–1115, wall by 1336, 50.6 ha, more than 80 owners (Wikipedia).
- Areni-1: excavated 2007–2010, about 4100–4000 BC, ~1 m press, ~60 cm vat, Gasparyan (Wikipedia).
- Phylloxera: first noted 1863 at Pujaut, identified 1868 by Planchon's commission (Wikipedia Great French Wine Blight). I avoided the "40 %" figure, which Wikipedia flags.
- UNESCO qvevri inscription 2013 (ich.unesco.org fetched).
- 1855 list: Wikipedia says Cantemerle was added in 1856; the atlas glossary and event say September 1855. I wrote "the late addition of Cantemerle" without a date. Today 61 reds and 27 sweet wines (atlas glossary).
- Other history facts (Dong 2023, Gadachrili 2017, Mago, Massalia/Lattara, Thasos, Domitian, Probus, Ausonius, Piesport press, Neumagen ship, Gamay edict 1395, Eberbach 1136, Dom Pérignon 1668–1715, Eleanor 1152, Castillon 1453, Bradley 1599, Pepys 1663, Methuen 1703, Pombal 1756, Merret 1662, Clicquot 1816, Riley, Munson/Jaeger 1888, Viala 1887, first AOCs 1936, Cortés 1524, Mission San Juan Capistrano, Haraszthy 1857/1861, Prohibition, Mondavi 1966, Hambledon 1952, Nyetimber 1988, Evremond, frost 2021, OIV 2024) follow the atlas timeline events and site texts, whose own sources are Wikipedia and the cited papers; I re-fetched the most error-prone ones above. The web search budget for the session ran out early (shared limit), so the rest were cross-checked against the atlas and my own knowledge rather than fresh searches.

## Prices (US retail, Saratoga Wine Exchange listings, fetched 30 Oct 2026)

- Village Chablis $25–35: W. Fèvre 2023 $33.95; Simonnet-Febvre $27–31; Albert Bichot $29.99.
- Napa Chardonnay $25–40: Cakebread 2024 $34.92; Sequoia Grove $29.92; Freemark Abbey $29.60.
- Mosel Kabinett $18–28: Selbach-Oster 2024 $19.94; Merkelbach Würzgarten $26.94; Dr. Loosen (Blue Slate) not listed, Dr. Loosen Wehlener Sonnenuhr Kabinett 2025 $24.93.
- J.J. Prüm Wehlener Sonnenuhr Kabinett $62.95–65.95 (2016/2018 listings).
- Côtes du Rhône $13–18: Guigal $13.74–16.92; Kermit Lynch $14.88; Perrin CdR Villages $17.
- Haut-Médoc $20–30: Lanessan 2017 $24.94; Sénéjac 2023 $21.81; d'Agassac $27.94.
- Lalande-de-Pomerol $22–32: Siaurac $23.89–28.94; Tournefeuille $31.92; La Maréchaude $21.94.
- Bourgogne Rouge $20–30: Drouhin $27.81; Jadot $25.64; Louis Latour $25.20.
- Marsannay $35–50: Louis Latour $34.84; Geantet-Pansiot $43.41; Roty $48.90.
- Sancerre $30–40: Jolivet $34.94; Baudry $33.60; Château de Sancerre $40.36.
- Marlborough SB $14–22: Kim Crawford $13.99; Astrolabe $16.39; Greywacke $19.89.
- Georgian amber $20–30: Kapistoni amber $22.40–26.40. Pheasant's Tears and Orgo not found at this retailer (could not verify their current price; they are usually in this range).
- Areni $20–30: Zulal $19.94; NOA $28.95; Oshin Reserve $30.80.
- Santorini Assyrtiko $40–70: Sigalas $57.90; Gaia Thalassitis $69.93; Estate Argyros basic Santorini not listed (only pricier cuvées).
- Mainland Assyrtiko $17–22: Papagiannakos $20.74; Kir-Yianni $17.93; Alexakis $16.94.
- Crozes-Hermitage $25–35: Guigal $28.40; Entrefaux $29.94; Les Alexandrins $24.94.
- Piesporter Goldtröpfchen Kabinett: A.J. Adam 2024 $35.94.
- Morgon $20–32: Foillard $30.94; Descombes $28.94; Duboeuf $19.37–26.92.
- Clos de Vougeot: Jadot 2011 $157.70 (case listing). Range $150–300 is an estimate.
- Médoc Cru Bourgeois $15–28: Patache d'Aux $21.20–26.95; Pey de Pont $24.94; Tour du Haut Moulin $16.25.
- LBV Port $22–30: Taylor's $27.28; Dow's $24.94; Niepoort $27.94.
- NV Champagne $45–65: Veuve Clicquot Yellow Label $64.89; Deutz $52.94; Piper-Heidsieck 375 ml $29.73 (750 ml not listed).
- Chilean Cabernet $15–25: Cousiño-Macul Dama de Plata $24.92; Odfjell Orzada $18.92; Undurraga Terroir Hunter $27.92 / Reserva $14.34.
- Napa Cabernet $45–75: Duckhorn $49.94 (sale); Hall $56.40; Matthiasson $74.92.
- English sparkling $45–65: Digby $56.40; Henners $45.60. Nyetimber Classic Cuvée not listed (only $170 prestige bottlings); not verified.
- Wine-Searcher, wine.com and Total Wine refused fetches.

## Atlas errors and oddities found (not edited)

- `fr-vosne-romanee` profile `contains_ids` maps "La Romanée" to `site-fr-chassagne-montrachet-la-romanee` (the Chassagne premier cru) instead of `site-fr-la-romanee`.
- Id and name typo: `fr-vosne-romanee-premier-cru-les-petis-monts` ("Petis" for "Petits").
- `us-los-carneros` climate attrs are identical to `us-napa-valley` (gst 18.8, gdd 1884), which is implausible for cool Carneros; looks like the parent's values were copied. I avoided Carneros.
- `fr-chablis` has parent `fr-petit-chablis`, and `fr-chablis-premier-cru-morein` has parent `fr-chablis-premier-cru-les-fourneaux` with context "Petit Chablis": odd hierarchy.
- Wehlener Sonnenuhr aspect: site text says "facing south-west", profile says "south to south-west"; attrs give 207° (SSW).
- Bordeaux grape-adaptation dates: region profile says the INAO allowed the six varieties "in 2019"; timeline event says INAO approved them in 2021. The growers' vote was 2019; I wrote "voted in 2019 ... the INAO confirmed them in 2021". Worth a check by whoever owns fr.json.
- Gadachrili Gora: event coordinates (41.46 N, 44.83 E) sit about 8 km from the site record (41.3904 N, 44.821 E).
- 1855 event says "58 red wines from the Médoc plus Haut-Brion"; glossary says 61 reds (60 Médoc + Haut-Brion) today. The event's original count is hard to reconcile with Wikipedia (about 57 entries incl. Cantemerle); worth a check.
- Mosel profile area 8,536 ha is a 2023 figure; DWI gives 8,287 ha for 2025.

## Not verified / judgment calls

- Pliny on Vienne's pitch-flavoured wine and the *allobrogica* vine: from my knowledge of Pliny NH book 14; could not fetch a source (no Wikipedia page).
- Alaverdi cellar "more than 40 qvevri": from the atlas site text only.
- Pheasant's Tears, Orgo and Nyetimber Classic Cuvée prices: not found at a fetchable US retailer.
- Napa "picked from late August", Chablis "12.5 percent", Napa Chardonnay "14 percent or more": general, typical values.

## Places wanted without an id

- No appellation polygon for Piesporter Goldtröpfchen (only the site), none for Armenian appellations (used `region-am-vayots-dzor`), no site for Lattara, Godin Tepe, Abydos or Akrotiri (used event coordinates or wide views).
