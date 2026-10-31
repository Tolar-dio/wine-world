# Fact-check log: burgundy, champagne

Checker: independent fact-check pass, 30 Oct 2026. Files edited in place: `site/data/guides/burgundy.json`, `site/data/guides/champagne.json`. Pre-edit copies kept in the session scratchpad.

Validator after edits:
```
site/data/guides/burgundy.json: 11 chapters, 2306 + 2035 words; 0 errors, 0 warnings
site/data/guides/champagne.json: 11 chapters, 2725 + 1659 words; 0 errors, 0 warnings
```
No em dashes in either file.

Web budget: 20 WebSearch calls used (the limit), plus WebFetch on retailer and reference pages.

## Atlas consistency (all confirmed, no change)
- Drinking windows quoted in both guides match `site/data/ageing/profiles.json`: fr-bourgogne red 2–6; fr-gevrey-chambertin village ready 4, peak 6–15, premier cru ready 7, peak 10–20; fr-chablis 2–6 / premier cru 5–12; fr-chablis-grand-cru 8–20; fr-meursault village ready 3, peak 4–10, premier cru 6–15; fr-montrachet 10–25; fr-chambertin / fr-romanee-conti 15–35 (closed years 4–10 in the profile text); fr-clos-de-vougeot 12–30; fr-corton-charlemagne 8–20; fr-pouilly-fuisse premier cru 5–12; fr-mercurey premier cru red 4–10; fr-morgon climat 5–12; fr-champagne NV 0–4 from disgorgement, rosé NV 0–3, vintage ready 7, peak 10–25, prestige ready 10, peak 12–30; fr-coteaux-champenois 4–10.
- Growing-season temperatures: `site/data/vintage/fr.json` fr-vosne-romanee n6190 14.8, n9120 16.1 °C; fr-champagne 14.0, 15.2 °C. Match.
- Vintage events (`_events.json`): Burgundy 2023 record crop, 2024 mildew up to 80% of reds in the north, 2025 picking from 19 August; Chablis 2021 about minus 7 °C and up to 95% loss; Champagne 1996/2002/2008 classics, 2020 harvest from 17 August. Match. Note: timeline event `event-frost-2021` says "as low as minus 6 degrees across France"; the Chablis event says minus 7 in Chablis. Not contradictory, but worth harmonising in the atlas.

## Changes: Burgundy (old → new, source)
1. Chablis "about 130 km northwest of Beaune" → "about 120 km". Straight-line from coordinates (Beaune 47.02N 4.84E, Chablis 47.81N 3.80E ≈ 118 km).
2. "jump 130 km north to Chablis" (from Puligny) → "about 120 km". Same calculation.
3. Chablis taste note "200 km further north" (than Mâcon) → "nearly 200 km" (≈ 184 km).
4. Vosne grand crus "about 27 hectares" → "about 28". Wikipedia, Vosne-Romanée wine: 6.06 + 1.65 + 0.85 + 1.81 + 9.44 + 8.03 = 27.84 ha. https://en.wikipedia.org/wiki/Vosne-Roman%C3%A9e_wine
5. "A local doctor, Denis Morelot, wrote in 1831 that there were no common wines in Vosne" → "An old local saying, still quoted by growers, holds that there are no common wines in Vosne." I could not confirm the Morelot attribution; the line is usually credited to the Abbé Courtépée (1770s), which I also could not confirm in a primary source. Removed the attribution.
6. "Burgundy has several unrelated domaines named Gros or Mugnier" → "Vosne alone has four separate Gros domaines, run by branches of one family." The Gros domaines (Anne Gros, Michel Gros, Gros Frère et Sœur, A.F. Gros) belong to one family, so "unrelated" was wrong.
7. Marsannay "still priced close to a Bourgogne" → "still priced well below its famous neighbours" (see price below; Bruno Clair's Longeroies is $80).
8. Bouzeron: Aubert de Villaine "has made wine there since 1973" → "bought an estate there in 1971 and made his first vintage in 1973". Corney & Barrow producer page. https://www.corneyandbarrow.com/de-villaine
9. Côte d'Or road: "the N74 road" → "the old N74 road (now the D974)" on first mention (renumbered after it became a departmental road in 2006); later mentions keep N74, as growers and books do.

## Changes: Champagne (old → new, source)
1. "about 150 km east of Paris" → "about 130 to 150 km". Reims is about 130 km and Épernay about 140 km from Paris in a straight line.
2. Côte des Bar: "since the 1990s growers such as Cédric Bouchard, Vouette et Sorbée and Drappier" → "since the 2000s growers such as Cédric Bouchard and Vouette et Sorbée, alongside old Aube houses such as Drappier". Drappier is a house founded in 1808, not a new grower; Bouchard and Vouette et Sorbée made their first wines around 2000–2001.
3. "Along the Avenue de Champagne" → "Along and just off the Avenue de Champagne" (Pol Roger's cellars are on rue Henri-Lelarge, beside the avenue).
4. Meunier growers given their villages ("Jérôme Prévost in Gueux, Laherte Frères in Chavot and Christophe Mignon in Festigny"), because the paragraph implied all three are in the western Vallée; Prévost is on the Montagne de Reims, Laherte in the Coteaux Sud d'Épernay.
5. Échelle des crus "took shape in 1911 and was agreed between growers and houses in 1919" → "took shape in the years after the 1911 riots as a way for growers and houses to set the price of grapes"; "retired in the 2000s" → "later retired". Could not confirm the 1919 date or the exact year of abolition (usually given as 2010) within budget, so softened.
6. Harvest dates: "in 2025 the first grapes came in on 19 August" → 2026 official opening dates 8 to 22 August, the earliest ever set, with first picking at Montgueux (Aube) on 6 August. 2025 actually began on 20 August in the Aube (L'Info Durable/AFP, https://www.linfodurable.fr/champagne-une-vendange-2025-de-qualite-mais-des-vignerons-tres-inquiets-53098); 2026 dates from La Gazette France/AFP, 12 Aug 2026, https://www.lagazettefrance.fr/article/champagne-les-dates-d-ouverture-des-vendanges-publiees-precocite-record
7. Voltis: "now permits trials of new varieties, including the disease-resistant hybrid Voltis" → "has admitted Voltis, a disease-resistant hybrid, for limited, trial-scale planting, the first such variety accepted in any French appellation". https://magazine.wein.plus/news/piwi-grape-variety-voltis-approved-in-champagne-first-resistant-grape-variety-to-be-included-in-a-french-appellation ; trial planting (five hectares by 2033): https://magazine.wein.plus/news/piwi-grape-variety-voltis-is-planted-out-in-champagne-test-cultivation-on-five-hectares-by-2033
8. Quiz explanation for the Clos des Goisses: "steep, south-facing walled slope" → "steep, south-facing slope" (I could not confirm that it is walled).

## Facts confirmed (no change)
- Clos des Goisses about 5.5 ha, bought by Pierre Philipponnat in 1935, steep, south-facing. Wine Anorak. https://wineanorak.com/champagne/philipponnat.htm
- Anselme Selosse took over in 1980 after the Lycée viticole de Beaune. https://en.wikipedia.org/wiki/Jacques_Selosse
- From memory and standard references, consistent with the writer's sources (not re-fetched): Cluny 910, Cîteaux 1098; Valois dukes 1363–1477; Gamay edict 31 July 1395; Gevrey 1847, Chambolle 1878, Puligny and Chassagne 1879; Marsannay village AOC 1987; 84 AOCs (44 village, 33 grand cru); 24 of 32 Côte d'Or grand crus in the Côte de Nuits, 8 in the Côte de Beaune, Corton the only red; Romanée-Conti 1.81 ha, Conti 1760; Montrachet about 8 ha split almost evenly; Échezeaux about 37 ha in eleven lieux-dits; Chambertin under 13 ha; Les Clos the largest Chablis grand cru; Pouilly-Fuissé 22 premiers crus from 2020; UNESCO 4 July 2015 (1,247 climats); Henri Jayer died 2006; Champagne 4,000 kg marc, 2,550 L; 15/12 months NV, 3 years vintage; dosage bands; 17 grand cru / 42 premier cru villages; Clicquot riddling 1816 and blended rosé 1818; Barbe-Nicole widowed at 27 in 1805; Pommery 1858/1868/1874; Lily Bollinger 1941–1971; Merret 17 Dec 1662; Dom Pérignon 1668–1715; Ruinart 1729, Moët 1743; phylloxera 1890; riots 1911, Aube full membership 1927; AOC 1936; Dom Pérignon 1921 released 1936; Cristal 1876, commercial from 1945; Coteaux Champenois 1974, Rosé des Riceys 1947; Clos du Mesnil 1.84 ha, 1698, 1979; Clos d'Ambonnay 0.68 ha, 1994; Verzenay lighthouse 1909; yields 12,000 / 11,400 / 10,000 / 9,000 kg/ha for 2022–2025 (2025 figure: https://www.vinetur.com/en/2025072590016/champagne-region-sets-2025-harvest-yield-at-9000-kilograms-per-hectare-amid-market-uncertainty.html).

## Prices
Confirmed (US retail, live listings Oct 2026):
- Héritiers du Comte Lafon Mâcon-Villages 2023: $29.99, Flatiron NYC. https://nyc.flatiron-wines.com/products/les-heritiers-du-comte-lafon-macon-villages-2023-750ml → "$15–30" kept.
- Bruno Clair Marsannay Les Longeroies 2022: $80, Morrell. https://morrellwine.com/wines/Bruno-Clair-Marsannay-Rouge-Les-Longeroies-2022-w6566676cr → range "$30–50" changed to "$40–80".
- Château de la Tour Clos de Vougeot 2021: US listings $167–209 per 750 ml, average about $203 (WineDecider). https://www.winedecider.com/en/find/chateau-de-la-tour-clos-de-vougeot-gc/2021/us/USD → "$150–300" kept.
- Marcel Lapierre Morgon 2023: $38.94 (list $49.99), Wine Library. https://winelibrary.com/wines/gamay/2023-domaine-marcel-lapierre-morgon-141934 → "$30–55" widened to "$30–60" (Foillard Côte du Py runs higher).
- Chartogne-Taillet Sainte Anne NV: $59, Morrell. https://store.morrellwine.com/wines/Chartogne-Taillet-Cuvee-Sainte-Anne-Brut-Champagne-NV-w9346905k2 → RM pick "$60–85" changed to "$55–85".
- Larmandier-Bernier Longitude (Extra Brut): $69.99 sale / $84.99 list, Hudson Lights https://hudsonlights.linwood.wine/wines/Larmandier-Bernier-Blanc-de-Blancs-Longitude-Premier-Cru-w6032950ux ; $117 Champion Wine Cellars https://www.championwinecellars.com/products/nv-champagne-larmandier-bernier-longitude-blanc-de-blancs-extra-brut-1er-cru → "$70–95" changed to "$70–120".
- Egly-Ouriet Brut Tradition Grand Cru: $109.90 Saratoga https://www.saratogawine.com/product/egly-ouriet-champagne-brut-tradition-grand-cru-nv-750ml/ ; $111.99 Hudson Lights https://hudsonlights.linwood.wine/wines/Egly-Ouriet-Brut-Champagne-Tradition-Grand-Cru-w7406586zr → "$120–160" changed to "$100–140".
- Jacques Selosse Initial: $549.99 D&B Fine Wines https://dbfinewines.com/wines/Jacques-Selosse-Brut-Initial-Grand-Cru-Champagne-w6354386z7 ; $575 JJ Buckley https://www.jjbuckley.com/wine/nv-jacques-selosse-blanc-de-blancs-brut-initiale/9998-14608-750 → "$300–450" (well short) changed to "$500–650".
- Dom Pérignon 2015: $249.98 sale / $355.99 list, Hudson Lights https://hudsonlights.linwood.wine/wines/Moet-and-Chandon-Dom-Perignon-Brut-2015-w6920921h3 ; $239.94 SF Wine Trading Co https://www.sfwtc.com/wine/2015-moet-chandon-dom-perignon/2015-680-750 → "$250–330" changed to "$240–360".
- Veuve Clicquot La Grande Dame 2018: $157.98 sale / $262.99 list, Wine Library. https://winelibrary.com/wines/pinot-noir/2018-veuve-clicquot-la-grande-dame-147755 → "$200–260" changed to "$160–260".
- Veuve Clicquot Yellow Label NV: $69.99 (regular $74.99), Wooden Cork. https://woodencork.com/products/veuve-clicquot-brut-nv → big-house NV "$55–75" widened to "$55–80".
- The writer's confirmed prices (Jadot Gevrey, Fèvre Chablis, Matrot Meursault, Bouillot Crémant, Moët, Gimonnet, Péters, Charles Heidsieck, Bollinger, Krug, Paul Bara) were not re-checked.

Still estimated (not checked against a live listing; ranges look plausible from my knowledge of the market but should be re-checked before launch): Taittinger Brut Réserve; Pouilly-Fuissé (widened to $30–60 as a precaution); Volnay village ($60–110); Savigny ($40–65); Olivier Leflaive Les Sétilles; Domaine Leflaive Bourgogne Blanc; Corton rouge ($90–160); Corton-Charlemagne; Pernand blanc; famous-domaine Bourgogne (Méo-Camuzet, Fourrier); Mercurey premier cru; aged Chablis premier cru; mature village red; demi-sec; Pol Roger/Roederer/Charles Heidsieck vintage; Billecart-Salmon and Laurent-Perrier rosé; Crémant rosé; Coteaux Champenois; Rosé des Riceys; English sparkling; Prosecco.

## Remaining doubts
- Vosne "no common wines" saying: attribution unresolved (now unattributed).
- Échelle des crus dates (1919 agreement, abolition year) unverified; text softened.
- Clos de Vougeot 1889 buyers: the writer already softened the six-versus-fifteen conflict to "a group of merchants"; not re-checked.
- Corton "about 160 hectares" and "28 climats": standard figures, not re-fetched.
- Atlas note: `event-frost-2021` (minus 6 °C nationally) and the fr-chablis 2021 event (minus 7 °C in Chablis) could be harmonised. The writer's atlas notes (fr-vosne-romanee contains_ids for La Romanée, Tours-sur-Marne context, Burgundy area 30,000 vs 32,301 ha, Champagne 2026 yield 8,800 kg/ha unverified) still stand; I did not edit atlas files.
