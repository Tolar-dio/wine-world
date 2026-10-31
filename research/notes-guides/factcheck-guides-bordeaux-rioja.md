# Fact-check log: bordeaux, rioja

Checker: independent fact-check pass, Oct 2026. Files edited in place: `site/data/guides/bordeaux.json`, `site/data/guides/rioja.json`.
Validator after edits: bordeaux 0 errors, 0 warnings (2,931 + 1,758 words); rioja 0 errors, 0 warnings (2,464 + 1,636 words).
Web searches used: 19 of 20.

## Writer's open items
| Item | Result | Source |
|---|---|---|
| Pontet-Canet first classed growth certified biodynamic, 2010 | Confirmed: "the first grand cru classé to be certified biodynamic", certification due end of July 2010. Text kept. | https://www.thedrinksbusiness.com/2010/07/pontet-canet-leads-classed-growths-in-green-approach/ |
| Grand Corbin-Despagne GCC in 2022 | Confirmed, listed as Grand Cru Classé in the 2022 list (14 Premiers, 2 A + 12 B, and 71 GCC). | https://wikiwand.com/en/articles/Classification_of_Saint-%C3%89milion_wine |
| Muga Reserva blend | 70% Tempranillo, 20% Garnacha, 5% Graciano, 5% Mazuelo, 24 months in barrel. The guide's wording ("mostly Tempranillo with Garnacha and smaller amounts of Mazuelo and Graciano") is right. | Mövenpick tech sheet PDF (moevenpick-wein.com, 2021 Muga Reserva) |
| LZ blend | Tempranillo, Graciano and Garnacha from Lanciego (Vinous via Houston Wines, wine.com). "Mostly Tempranillo" is right. | houstonwines.com LZ 2022; wine.com product 1988612 |
| Lanessan blend | Not checked on the web. The guide says only "a Cabernet and Merlot blend", which is safe. | (none) |
| Rioja zone-wine rules | The Consejo's labelling requirements (17 June 2025) say a zone name may be used only when the wine comes from that zone's grapes and is made, aged and bottled there. The 15% neighbouring-municipality allowance (with ≥10 years' exclusive use) is written for village wines only. So the atlas line "requires 100 percent of the grapes from that zone" agrees with this document (writer's atlas item 4 is probably not an error). The guide gives no percentage; no change. | https://riojawine.com/wp-content/uploads/2025/07/requisitos-minimo-de-etiquetado-17062025.pdf |
| Priorat DOQ date | The guide gives no date; no change. Atlas glossary "2000" not verified here (the Catalan grant is usually dated 2000 and Spanish state recognition 2009). Left as an open atlas item. | (none) |

## Changes (old → new, source)
### bordeaux.json
1. Vintages step 2: "The hot, dry 2003 that stressed the reds gave little botrytis, so that year's Sauternes concentrated mainly through heat rather than rot." → "The heatwave of 2003, which stressed the reds, brought an early harvest of very rich, heavy Sauternes with low acidity; the best still taste surprisingly fresh." Reason: the "little botrytis" claim is unsupported. The atlas (`vintages.json` region-fr-sauternais 2003) says "early, very rich, heavy wines with low acidity".
2. Grand Corbin-Despagne price $35–45 → $38–50. Millesima USA 2020 $39 (writer); 2022 12×75cl $552 = $46/bottle before tariffs (https://www.millesima-usa.com/chateau-grand-corbin-despagne-2022-d-cb-6.html).
3. Puygueraud $20–25 → $18–25. Saratoga 2022 $18.94 (https://www.saratogawine.com/product/chateau-puygueraud-cotes-de-francs-rouge-2022-750ml/); wine.com 2019 $22.97 (writer).
4. Lynch-Bages $140–160 → $130–160. Wine Decider US average for 2020 is $140.36; Saratoga $133.37, K&L $140.43, Total Wine $155.46 (https://www.winedecider.com/en/find/chateau-lynch-bages-pauillac/2020/us/USD).

### rioja.json
5. Modern step 0: "[Contino] (1973) was the first single-estate bodega in the modern sense, and [Remelluri], bought by the Rodríguez family in 1967, another early one." → "[Remelluri], bought by the Rodríguez family in 1967, and [Contino], founded by CVNE and local partners in 1973, pioneered the single estate in the modern sense." Reason: Remelluri's own story calls its 1971 vintage the first single-estate Rioja of the modern era (Wine & Cheese Place listing), so "first" was disputed.
6. Quiz (modern): "Which estate was the first single-estate bodega in the modern sense, in 1973?" → "Which single estate did CVNE found with local partners on a loop of the Ebro in 1973?" (answer still Contino). The explanation was updated to match. Reason: the answer has to be unambiguous.
7. Modern step 1: "first made in 1991" → "first bottled on its own in the early 1990s". The year was not verified, so I softened it.
8. Place step 0: "renamed *vino de pueblo* (village wine) in 2022" → "since renamed *vino de pueblo*". The rename is confirmed by the Consejo labelling document; the year is not.
9. Time step 1: "since 2019 a wine ... may say *madurado en bodega*" → "may now say". The term is confirmed (Consejo labelling document, p. 8); the start year is not.
10. Place step 2: "old vines (at least 35 years)" → "old vines (today, planted in 1980 or earlier, rising to a 50-year minimum from 2030)". Source: Consejo labelling requirements 2025, p. 9. The 550 m altitude term (≥90% of the wine), centenarian vines (100 years) and pre-phylloxera vines (before 1900) are confirmed as written.
11. Haro step 1: "every June the Barrio de la Estación opens..." → "once a year". The month was not verified.
12. Prices:
   - Artuke $17–22 → $17–25: Wine Dispensary $17 (writer), cellar.com 2024 $19.99, Chapel Hill 2025 $24.99. Also confirmed as 95% Tempranillo / 5% Viura, carbonic, unoaked (https://cellar.com/products/artuke-rioja-2024-750ml; https://www.chapelhillwinecompany.com/wines/Artuke-Rioja-Red-2024-w55446473d).
   - LZ $20–28 → $25–30: wine.com 2022 $25.97, Houston Wines $27.99, Chain Bridge Cellars $28.99 (https://www.wine.com/product/bodega-lanzaga-lz-2022/1988612; https://www.cbcwine.com/wines/Bodega-Lanzaga-Tempranillo-Rioja-Lz-2022-w29466893j).
   - Roda Sela $32–38 → $30–38: WHWC 2021 $29.95 (list $35), Wine Watch $34.25 (writer). WHWC also gives 89% Tempranillo / 7% Garnacha / 4% Graciano and 12 months in French oak, consistent with the text (https://whwc.com/roda-rioja-sela-2021).
   - Lanzaga $40–46 → $40–50: Kakaako $41.99 (writer), Saratoga 2021 $49.95 (https://www.saratogawine.com/product/telmo-rodriguez-rioja-lanzaga-2021-750ml/).
   - Remelluri Reserva $55–65 → $50–60: Wine & Cheese Place $53.99, PlumpJack $58.99, Chapel Hill $59.99 (writer) (https://www.wineandcheeseplace.com/collections/wine-searcher-feed-wine/products/remelluri-rioja-reserva; https://plumpjackwines.com/products/remelluri-reserva-rioja).
   - Viña Gravonia $40–52 → $50–65: PJ Wine 2017 $51.97 sale ($69.99 regular), K&L $62.99. Lincoln Fine Wines $89.99 is an outlier (https://pjwine.com/products/lopez-de-heredia-vina-gravonia-crianza-blanco-rioja-2017; https://shop.klwines.com/products/details/1966057).
   - Tinto Pesquera Crianza $30–43 → $30–40: Saratoga 2021 $29.94, Hudson Lights $38.99, Lincoln $42.99 (writer), Costco $25.99 (Jan 2025) (https://www.saratogawine.com/product/tinto-pesquera-crianza-2021-750ml/).

## Prices confirmed without change
- La Montesa $20–25: Saratoga 2022 $22.93 and 2020 $19.92 (https://www.saratogawine.com/product/palacios-remondo-rioja-la-montesa-2022-750ml/).
- All other prices were left as the writer set them, from the retailer listings in the writer's log. The Lynch-Bages check suggests Millesima USA prices sit close to the US market average, so the Millesima-based Bordeaux ranges look reasonable.

## Other facts confirmed
- Saint-Émilion 2012 classification litigation: the Conseil d'État on 15 March 2024 dismissed the last appeal (Corbin Michotte), ending 11 years of proceedings. The guide's "fought in the courts until March 2024" is right (https://inao.gouv.fr/en/classement-aop-saint-emilion-grand-cru-conseil-etat-15-mars-2024).
- Entre-deux-Mers rouge from the 2023 vintage; white-only AOC from 1937 (https://janeanson.com/entre-deux-mers-introduces-red-as-well-as-white-wines-under-the-aoc).
- Rioja red ageing: Reserva 36 months (≥12 oak, ≥6 bottle); Gran Reserva 60 months (≥24 oak, ≥24 bottle), effective 2019 (https://www.winewithseth.com/winewiki/compare/rioja-reserva-vs-gran-reserva/).
- Viñedo de altura from 550 m (Consejo labelling document). Vino de pueblo 15% neighbour allowance with 10 years' exclusive use (same document).
- Atlas figures quoted in both guides match the atlas data:
  - Pauillac growing-season temperature (GST) 16.47 → 17.82°C, GDD 1,387 → 1,675, 2022 19.4°C (the highest since 1950).
  - Saint-Émilion 16.64 → 18.19°C.
  - Rioja 15.79 → 18.0°C, rain 288 → 253 mm.
  - Climate twins: Alsace and Offida for Pauillac, Dundee Hills and Cannonau di Sardegna for Rioja (`_drift.json`).
  - Ageing windows (`profiles.json`) and the 5-rated and Excelente vintage lists and statuses (`vintages.json`).
  - Rioja 2017 earliest harvest and 2022 hottest year (`_events.json`).
  - Bordeaux 91,543 ha and 21,000 ha grubbed up (fr.json); Rioja 66,500 ha, 12,704 growers, 719 wineries, 27% (es.json).
- Many other claims were checked against my own knowledge and look right: 1855 details, the Sauternes count of 27, Graves 1953/1959, Libourne 1270, UNESCO 1999, Pepys 1663, Latour leaving en primeur after 2011, Mouton château bottling from 1924, Dillon 1935, Laguardia 1164, Ysios 2001, Gehry 2006, the eight Navarra villages, the 15 Alavesa municipalities, Ribera DO 1982 and Vega Sicilia 1864. None of these were checked on the web this pass.

## Still unverified / estimates
- Back-vintage classed growth or Cru Bourgeois $40–60 (one data point, Cantemerle 2015 $44.80). CVNE Imperial GR $100–125 (one listing, wine.com $114.99). Both kept as estimates.
- Crus Bourgeois 2025 figures (170 / 14 / 36), taken from the writer's sources; not rechecked.
- "Lynch-Bages, poor man's Latour" (trade lore, uncontroversial). Bordeaux 2013 "smallest crop since 1991" (the atlas says "weakest since 1992"; not contradictory). Tempranillo Blanco 1988 and the 2008 authorisation of Chardonnay, Sauvignon Blanc and Verdejo in Rioja. Espumoso de Calidad 2017 rules (15 / 36 months).
- Atlas notes: the writer's items 1–3 and 5–8 stand as he logged them. For item 4 (zone wines), the Consejo labelling document supports the atlas "100 percent" wording.
