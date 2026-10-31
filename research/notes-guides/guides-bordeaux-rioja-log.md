# Guides log: bordeaux, rioja

Files: `site/data/guides/bordeaux.json`, `site/data/guides/rioja.json`.
Builders (not part of the site): scratchpad `build_bordeaux.py`, `build_rioja.py`.

Validator (final): both files 0 errors, 0 warnings.
- bordeaux: 12 chapters (7 intro, 5 deeper), 2,931 + 1,754 words. minutes 18, deeper_minutes 11.
- rioja: 12 chapters (7 intro, 5 deeper), 2,448 + 1,636 words. minutes 15, deeper_minutes 10.
Every step is 97–149 words. No em dashes; en dashes only in ranges.

## Atlas data used
- `site/data/content/fr.json` regions (Bordeaux, Médoc, Graves, Sauternais, Libournais, Entre-Deux-Mers, Blaye and Bourg) and profiles for all main Bordeaux AOCs; `es.json` region and zone profiles, es-rioja, es-ribera-del-duero, site texts for the Haro houses and modern estates.
- Timeline: eleanor-claret, castillon-1453, haut-brion-pepys, bordeaux-1855, mouton-1973, jefferson-bordeaux, bordeaux-new-varieties-2021, bordeaux-grubbing-2023, rioja-french-boom, phylloxera-rioja.
- `site/data/ageing/vintages.json` (region-fr-medoc, region-fr-libournais, region-fr-sauternais, es-rioja): 5-rated vintages, status as of Oct 2026.
- `site/data/ageing/profiles.json` drinking windows (fr-pauillac, fr-saint-emilion-grand-cru, fr-pomerol, fr-sauternes, fr-bordeaux, es-rioja).
- `site/data/vintage/_drift.json` and `fr.json`: Pauillac GST 16.5 → 17.8°C, GDD 1,387 → 1,675; Saint-Émilion 16.6 → 18.2°C; Pauillac 2022 GST 19.4°C; climate twins (Alsace / Offida); Rioja 15.8 → 18.0°C, twins Dundee Hills / Cannonau di Sardegna. GST = Apr–Oct mean (scripts/climate_enrich.py).
- `site/data/vintage/_events.json` (fr-bordeaux, fr-sauternes, es-rioja).

## Facts checked on the web (beyond the atlas)
- Crus Bourgeois 2025: 170 wines, 14 Exceptionnels, 36 Supérieurs, valid for vintages 2023–2027 (enprimeurclub.com guide; Decanter).
- Graves classification: 1953, adjusted 1959, 16 originally, 14 today after two merged into La Mission Haut-Brion (bordeaux.com).
- Saint-Émilion 2022: approved 8 Sept 2022, 14 Premiers (2 A: Figeac, Pavie) + 71 GCC = 85; revisable every ten years (INAO).
- Climate varieties: INAO national approval announced 26 Jan 2021; 5% of vineyard, 10% of blend; not on label (Wine Industry Advisor).
- En primeur: 2024 release prices down ~16% on average, some 30–40% (Rue Pinard, June 2026); 2025 releases "cheapest top wines in about 15 years" (Vinetur, June 2026). I did not quote individual 2025 release prices because sources disagreed (Mouton €300 ex-négoce per En Primeur Club vs €423.60 "incl. tax" per Vinetur).
- Gironde estuary: ~75 km long, 3–12 km wide (Wikipedia).
- 1855 list date 18 April 1855; brokers ranked by reputation and trading price; Lynch-Bages and Cantemerle fifth growths (Wikipedia).
- Haro: Tudela–Bilbao railway inaugurated 1863 through Haro; founding dates LdH 1877, CVNE 1879, Gómez Cruzado 1886, La Rioja Alta 1890, Bilbaínas 1901; Roda 1987 (Foods & Wines from Spain).
- Rioja Oriental name ratified by the Consejo, April 2018 (nuevecuatrouno).
- Viñedos singulares: 167 as of 24 Sept 2026 (91 La Rioja, 73 Álava, 3 Navarra), 270 ha, 101 wineries (MAPA press note).
- Documento único: red max yield 6,500 kg/ha; viñedo singular 5,000 kg/ha red; vines ≥35 years; village wine 15% neighbour allowance with ≥10 years' exclusive access.
- Viñedos de Álava: TSJPV annulment Nov 2024 (El Derecho); Basque government would not appeal (nuevecuatrouno, Dec 2024); Supreme Court "definitive door slam" (nuevecuatrouno headline, 18 June 2025; article itself not fetchable, so I wrote only that the court closed the case).
- La Montesa: ~94% Garnacha, organic estate vineyards in Alfaro, ~550 m, 12 months barrique 85% French (Skurnik sheet). Artuke: carbonic maceration, Baños de Ebro, 420–480 m (Wine Dispensary).

## Prices (US retail, checked Oct 2026)
| Pick | Price used | Evidence |
|---|---|---|
| Château Recougne Bordeaux Supérieur | $15–20 | Liquorama $16.99 (MSRP $18.99); Vintus SRP $19 |
| Château Bonnet Rouge / Blanc | $15–20 / $14–18 | Wine.com Bonnet Blanc 2021–2025 $15.97–16.97; Rouge older vintages $17.99–18.99 (sold out) |
| Château Lanessan | $22–30 | Millesima USA 2020 and 2021 $22 (case price) |
| Sociando-Mallet | $40–50 | Millesima USA 2020 $42 |
| La Fleur de Boüard | $30–40 | Millesima USA 2020 $31 |
| Grand Corbin-Despagne | $35–45 | Millesima USA 2020 $39 |
| Cantemerle | $35–45 | Millesima USA 2020 $39; 2015 $44.80 |
| Chasse-Spleen | $35–45 | Millesima USA 2020 $39.99 |
| Les Fiefs de Lagrange | $30–40 | Millesima USA 2020 $31.99 |
| Clos Floridène Blanc | $30–35 | Flatiron $29.99; Domaine Franey $34.99 |
| Sauternes/Barsac 375 ml | $22–35 | Carmes de Rieussec 2022 $24.99; Doisy-Daëne 2020 $35; Doisy-Védrines 2020 $29.99 (Total Wine) |
| Puygueraud | $20–25 | Wine.com 2019 shows "22.97" (format ambiguous) |
| d'Aiguilhe | $27–35 | Millesima USA 2020 $27.20 (was $34) |
| de la Dauphine | $25–35 | Millesima USA 2020 $26 |
| Potensac | $30–35 | Millesima USA 2020 $32 |
| Grand-Puy-Lacoste | $85–100 | Millesima USA 2020 $89 |
| Larcis Ducasse | $90–105 | Millesima USA 2020 $99 |
| La Pointe | $50–60 | Millesima USA 2020 $54 |
| Lynch-Bages | $140–160 | Millesima USA 2020 $149.99 |
| Back-vintage classed growth/Cru Bourgeois | $40–60 | Cantemerle 2015 $44.80 (one data point; range is an estimate) |
| Artuke | $17–22 | Wine Dispensary 2024 $17 |
| La Montesa | $20–25 | Liquors Inc 2020 $22.99 |
| LZ | $20–28 | Houston Wines 2022 $27.99 (I set the low end from general knowledge; one data point only) |
| Muga Reserva | $30–35 | Bassins 2021 $34.99 |
| Cune Crianza / Reserva | $14–18 / $20–30 | Wine.com Crianza 2022 $15.97; Reserva 2020 $19.97 (was $29.03) |
| Cune Gran Reserva | $37–45 | Wine Chateau 2016 $36.97 (was $41.97) |
| CVNE Imperial Gran Reserva | $100–125 | Wine.com 2018 $114.99 |
| Viña Cubillo / Tondonia Reserva | $29–32 / $44–55 | PJ Wine $28.97; $43.97–51.97 |
| Viña Tondonia Reserva 2005/2006 | $80–100 | PJ Wine $79.97 / $99.97 |
| Viña Ardanza | $38–45 | PJ Wine 2019 $37.97 ($44.99); SommSelect 2017 $45 |
| La Rioja Alta 904 | $100–115 | PJ Wine 2016 $99.97 ($114.99) |
| Roda Sela | $32–38 | Wine Watch 2021 $34.25 |
| Lanzaga | $40–46 | Kakaako Wine 2020 $41.99 ($45.99) |
| Remelluri Reserva | $55–65 | Chapel Hill Wine 2016 $59.99 |
| Muga Rosado / Blanco | $14–16 / $17–19 | PJ Wine $13.97 ($15.99) / $16.97 ($18.99) |
| Viña Gravonia | $40–52 | PJ Wine 2017 $51.97 (I set the low end from general knowledge) |
| Tinto Pesquera Crianza | $30–43 | Lincoln Fine Wines 2021 $42.99 (low end from general knowledge) |

Note: Millesima USA prices are case prices before tariffs and duties.

## Possible atlas errors / inconsistencies (not edited)
1. `fr.json` profile `fr-bordeaux` and region `region-fr-bordeaux` (terroir): say the INAO approved the six climate varieties "in 2019". The 2019 vote was by the Bordeaux / Bordeaux Supérieur growers; INAO national approval came in January 2021 (the timeline event `bordeaux-new-varieties-2021` has it right). The guide uses 2021.
2. Cantemerle: the atlas (fr-haut-medoc nerd_note, timeline bordeaux-1855, glossary "1855 Classification") says it was added in September 1855; Wikipedia says 1856 and notes conflicting accounts. The guide says only "soon afterwards".
3. The timeline `bordeaux-1855` says the list "has been changed only twice" (Cantemerle and Mouton); `region-fr-bordeaux` classification says "only once". The wording is inconsistent, though both can be defended.
4. Rioja zone wines: `region-es-rioja` classification says a zone wine "requires 100 percent of the grapes from that zone". The documento único as summarised suggests zone names follow the same 15% neighbouring-municipality allowance as village wines. Needs checking against the pliego. The guide gives no percentage for zone wines.
5. Wikipedia gives red Gran Reserva as "24 months in barrel and 36 in bottle"; the atlas (es-rioja ageing profile and region styles) says five years with ≥2 in oak and ≥2 in bottle, which matches my understanding of current Consejo rules. The guide follows the atlas.
6. Site `site-fr-chateau-margaux` has ctx "Haut-Médoc" in `_sites.geojson` (it is in the Margaux AOC); `site-es-la-rioja-alta-s-a` has an empty ctx.
7. Muga's move to the Barrio de la Estación: the atlas site says 1971, Foods & Wines from Spain says 1970. The guide says "early 1970s".
8. Glossary "DOCa" says Priorat got DOQ status in 2000. I couldn't verify this; I recall the Spanish state recognising it in 2009. The guide gives no date.

## Places I wanted that have no id
- No ids for individual viñedos singulares, the Conchas de Haro, Monte Yerga, the Bec d'Ambès or the Ciron (I used coordinates).
- No grape ids for Viura (I used grape-macabeo), Mazuelo (grape-carignan), Maturana, Tempranillo Blanco, Malvasía Riojana, Castets, Arinarnoa, Alvarinho (the grape-albarino id exists but I didn't link it), Liliorila.

## Not verified (search budget ran out)
- Blends of Muga Reserva, LZ and Château Lanessan (described only loosely).
- Pontet-Canet as the first Médoc classed growth certified biodynamic (2010); Lynch-Bages "poor man's Latour" (well-known trade nickname); Grand Corbin-Despagne's Grand Cru Classé status in 2022.
- The history of when crianza/reserva/gran reserva became legal categories (the guide avoids giving a date).
