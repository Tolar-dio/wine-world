# Fact-check log: mosel, pinot-noir, wines-long-road

Checker: independent fact-check pass, 30 Oct 2026. Backups of the pre-check files: scratchpad `fc_backup/`.
WebSearch used: 13 of 25. Validator after edits: all three files 0 errors, 0 warnings
(mosel 2699 + 1573 words; pinot-noir 3462; wines-long-road 3825). No em dashes.

## Changes (old -> new, source)

### mosel.json
1. Vintages: "2023: Germany's warmest year on record" -> "at the time Germany's warmest year on record (2024 has since beaten it)". DWD annual review 2024 (2024 the warmest year since records began, 10.9 °C), e.g. https://www.spektrum.de/news/2024-war-das-waermste-jahr-in-deutschland-seit-messbeginn/2260243. The atlas event `de-mosel` 2023 says "warmest year on record", which is now out of date (atlas note below).
2. Terrassenmosel: "a name coined by Reinhard Löwenstein" -> "popularised by"; quiz "Who coined…" -> "Which grower popularised…". Could not find a source for who coined the term.
3. Calmont: "a wall of slate and greywacke" -> "a wall of slate". Greywacke is not confirmed for the Calmont.
4. Egon Müller: "also farms the Kupp and Braune Kupp" -> "also farms about 6.5 hectares in the Kupp and Braune Kupp". Best of Wines (7 ha of Scharzhofberg, 6.5 ha in Kupp and Braune Kupp, 1797).

### pinot-noir.json
5. Pommard clone: "traditionally traced to Château de Pommard" -> "grown from cuttings that Harold Olmo of UC Davis brought from a vineyard in Pommard in the 1940s". Prince of Pinot article 2261 (Olmo, 1940s, recorded as "Les Croix Vineyard", Pommard; entered FPMS in 1956 as 820 Pommard, later UCD 04). It does not mention Château de Pommard.
6. Dijon clones: "selected in Burgundy … arrived in Oregon in the 1980s" -> "selected in Burgundy by Raymond Bernard … reached Oregon State University in 1984". Prince of Pinot article 219 (Heatherbell/OSU 1984; clone numbers 113, 114, 115, 667, 777 confirmed).
7. Alsace Hengst Pinot: removed Josmeyer (I could not confirm it as a Hengst Pinot Noir producer); Albert Mann kept.
8. Yarra: "planted by Swiss settlers from the 1840s" -> "first planted in 1838 and built up by Swiss settlers from the 1840s" (the Ryrie brothers planted at Yering in 1838; the Swiss de Castella and de Pury families came later). From standard references, not freshly fetched.
9. Friedrich Becker: added "about two thirds of the estate" and "under a 1955 Franco-German accord". Schiller's wine blog, 2015 tasting at Weingut Friedrich Becker.
10. Bollinger Special Cuvée: "(Pinot Noir is the majority grape)" -> "(about 60 percent Pinot Noir, 25 percent Chardonnay, 15 percent Meunier)". Hedonism product page.
11. Hemel-en-Aarde quiz: "Who founded Pinot Noir in…" (unclear wording) -> "Who bought land in the Hemel-en-Aarde in 1975 to make Burgundy-style wine?"

### wines-long-road.json
12. Vienne: the claim that Pliny praised Vienne's pitch wine "made from a hardy local vine they called *allobrogica*" -> Pliny describes a recently discovered vine whose wine tasted naturally of pitch and made the Vienne district famous; Roman writers named a vine *allobrogica* after the tribe. Also "steep granite slopes" -> "schist and granite slopes", and added "across the river". Pliny NH 14 ch. 3 (Bostock/Riley translation, peterburk.github.io mirror); wein.plus "Allobrogica" (Pliny and Columella name the vine).
13. Tutankhamun labels: "the world's first wine labels, and the first sign" -> "among the world's earliest wine labels, and an early sign" (older jar dockets exist).
14. Munson/Jaeger: "in 1888 both received the Legion of Honour" -> "France honoured both; Munson was made a Chevalier du Mérite Agricole in 1888". Wikipedia, Thomas Volney Munson (Mérite Agricole 1888, not the Legion of Honour). I did not verify Jaeger's own award, so it is not named.
15. Taittinger: "bought farmland at Chilham in 2014" -> 2015, in the step text and the quiz explanation. Wine Anorak, 9 Dec 2015 (69 ha at Stone Stile Farm announced that day).
16. English sparkling pick: removed Nyetimber from "try". I found no fetchable US retail price for the Classic Cuvée; the only US listing is Cask Cartel at $249.99, which is not representative. Digby ($56.40) and Henners ($45.60), confirmed at Saratoga by the writer, remain. The step text still names Nyetimber as history.

## Confirmed without change (source)
- Mosel 2026 labelling: former Grosslagen take "Region" directly before the name, in the same colour, font and size; Leitgemeinde no longer allowed; 85% from the named unit; Einzellage wines not sold before 1 March of the following year. RP Darmstadt PDF "Weinbezeichnungsrecht ab Ernte 2026". The guide's wording is correct.
- Marlborough grows more Pinot Noir than Central Otago: 2,490 ha vs 1,765 ha producing (NZ Winegrowers Vineyard Report 2024). Central Otago total 2,163 ha, so Pinot is about 82%, consistent with "three quarters to four fifths" (the upper end).
- Bollinger Special Cuvée is Pinot-led: about 60% (Hedonism).
- Bernhard Huber: Malterdingen, run by Julian Huber (with Barbara), weathered Muschelkalk (VDP producer page).
- Friedrich Becker: vineyards across the border in France (Schiller).
- Alaverdi cellar: "over 40" qvevri, 11th-century cellar restored in 2006 (Badagoni, https://badagoni.com/alaverdi-wine-cellar/).
- Pliny on the Vienne pitch-tasting vine (see change 12).
- Cantemerle: the guide gives no date ("late addition"), so it is safe whatever the 1855 or 1856 dispute.
- Atlas consistency: Mosel ageing windows match `site/data/ageing/profiles.json` de-mosel (Kab 3/5–15/25, Spät 5/8–25/40, Ausl 8/10–35/50, BA/TBA 10/15–50/80, Eiswein 8/10–40, GG 4/6–15, trocken peak to 6). Mosel climate matches `site/data/vintage/de.json` (n6190 13.6 °C / 842 GDD; n9120 14.6 / 1038; 2018 at 16.5 is the series maximum). Vintage notes 1921–2025 match `_events.json`. Yarra 1,440 GDD, Tasmania under 800 GDD and Willamette AVA (1983) match the atlas `au`/`us` content.
- Other claims I re-read and judged correct from standard knowledge: Mosel Prädikat minimums, Eiswein at minus 7 °C, trocken/halbtrocken limits, A.P. number, VDP 1910 and GG release, 30,000 -> 2,600 Einzellagen, Doctor 1984 settlement, Sonnenuhr 1842, Dusemond 1925, Grünhaus 966/1882, Karthäuserhof 1335/1811, Prüm 1911, Loosen 1988, Haag 1605/2005, Christoffel 2001, Müller 1991; Pinot genetics, 1395 edict, Clos de Vougeot, Eyrie and Drouhin, Jory, Sonoma AVAs 1987/2011/2022, Carneros 1983, Sta. Rita 2001/2005, Milne 1979, Abel clone, Felton Road 1991–92, Casablanca 1982, Hamilton Russell 1975; history dates (Dong 2023, Gadachrili, Areni-1, Scorpion I, Mago, Massalia, Lattara, Domitian 92, Probus, Ausonius, Cîteaux 1098, 1395, Eberbach 1136, Pérignon 1668–1715, 1152, 1453, Bradley 1599, Pepys 1663, Methuen 1703, Pombal 1756, Merret 1662, Clicquot 1816, oidium 1845, phylloxera 1863/1868, Viala 1887, AOC 1935/1936, Cortés 1524, Haraszthy, Prohibition, Mondavi 1966, AVA 1980/1981, Paris 1976, Hambledon 1952, Nyetimber 1988, Sussex PDO 2022, April 2021 frost, Bordeaux grapes 2019/2021, OIV 2024 lowest since 1961).

## Prices
Newly confirmed (URL):
- Pheasant's Tears Bodbiskhevi Rkatsiteli 2024: $22.99, K&L (out of stock), https://shop.klwines.com/products/details/1952104. Inside the $20–30 range.
- Orgo Rkatsiteli Kakheti Dry Amber 2024: $29.99, Flatiron NYC, https://nyc.flatiron-wines.com/products/orgo-rkatsiteli-kakheti-dry-amber-2024-750ml. Inside the $20–30 range.
- Nyetimber Classic Cuvée: not confirmed (Cask Cartel $249.99 is an outlier), so it was removed from "try".
I did not re-fetch the other prices. They rest on the writers' logged listings: wine.com for Pinot; Bottle Barn, Saratoga, Flatiron and others for Mosel; Saratoga for history. All guide ranges match those logged figures. The Clos de Vougeot range of $150–300 is still an estimate, backed by one Jadot 2011 listing at $157.70.

## Still unverified / doubts
- Tasmania "under 800 GDD" (atlas, citing Wine Australia) seems low against the 1,000+ often quoted for the Tamar and Coal River; it may depend on Wine Australia's method. Worth checking by the owner of au.json.
- Hermann Jaeger's French honour (name and year) was not checked.
- Willamette Valley AVA year: the final rule was late 1983, effective January 1984. Guide and atlas say 1983, which is defensible.
- Bannockburn GI "February 2022" was not re-checked (atlas).

## Atlas notes (not edited)
- `site/data/vintage/_events.json` de-mosel 2023: "The warmest year on record in Germany". 2024 has since beaten it (DWD).
- I did not edit the Pommard-clone origin anywhere else. If any atlas grape or glossary text says "Château de Pommard", it is unsupported: the Olmo cuttings were recorded from "Les Croix Vineyard", Pommard.
