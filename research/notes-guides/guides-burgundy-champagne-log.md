# Guides log: burgundy, champagne

Files: `site/data/guides/burgundy.json`, `site/data/guides/champagne.json`.
Builders (not part of the site): scratchpad `build_burgundy.py`, `build_champagne.py` (Python dicts dumped to JSON).

## Validator (final)
```
site/data/guides/burgundy.json: 11 chapters, 2301 + 2028 words (~12 + 10 min at 200 wpm); 0 errors, 0 warnings
site/data/guides/champagne.json: 11 chapters, 2707 + 1629 words (~14 + 8 min at 200 wpm); 0 errors, 0 warnings
```
Including taste notes and quiz text: Burgundy 3,586 intro + 3,036 deeper words; Champagne 4,063 + 2,336. `minutes` set to 20/16 (Burgundy) and 20/13 (Champagne) on that basis plus map time.

## Sources checked (facts)
- BIVB key figures, Sept 2024 (info-beaune.com PDF): 32,301 ha, 84 AOCs, 201.9 m bottles; grands crus 1%, villages+premiers crus 46%, regional 53%; white 61%, red/rosé 27%, Crémant 12%; Chardonnay 57%, Pinot Noir 34%, Aligoté 6%; 3,489 domaines, 316 négociants, 16 co-ops.
- Clos de Vougeot: Wikipedia EN (50.6 ha, 80+ owners, wall by 1336, Ouvrard 1818, soil top/middle/bottom, 1944 Société civile), Wikipédia FR (1889 sale to fifteen merchants of Beaune, Dijon, Nuits; 50.9654 ha), iDealwine (1889 to 15 merchants, ~80 growers). EN Wikipedia says six merchants in 1889: conflict, so the guide says "a group of merchants". The "Jean Foçard 1791" buyer could not be confirmed and was left out.
- Labbé et al. 2019 via ScienceDaily: Beaune harvest dates 1354–2018, 13 days earlier since 1988.
- Premox: Jasper Morris, World of Fine Wine (1995/96 first vintages; Tanzer 2002, Burghound 2005; causes and remedies; "not yet eradicated").
- Champagne: Comité Champagne 2021 sector PDF (34,300 ha, 319 crus, 16,200 growers, 360 houses, 130 co-ops, growers farm ~90%, houses ship >70%); 2025 shipments press release (≈266 m, export ≈152 m, France ≈114 m; 2024 271.4 m); Wine Industry Advisor (US 26.4 m bottles in 2025); champagne.education method sheet (4,000 kg marc, 2,050 L cuvée + 500 L taille, 6 bar, 15 months NV / 36 months vintage); champagne.education dosage page; Pernod Ricard terroir page (38/32/30 variety split, 17 GC); Wine Spectator (Mme Pommery widowed 1858, cellars from 1868, Nature 1874); LVMH (Clicquot blended rosé 1818); Wikipedia Champagne Riots (Jan 1911 Damery/Hautvillers, Aÿ fire, 40,000+ troops, Aube second zone); Lyndhurst Wine (Clos du Mesnil 1.84 ha, walled since 1698, 1979 first vintage; Clos d'Ambonnay 0.68 ha, bought 1994, first vintage 1995).
- Atlas data used and cited as such: Vosne and Champagne growing-season temperatures 1961–1990 vs 1991–2020 (`site/data/vintage/fr.json` n6190/n9120: Vosne 14.8 → 16.1 °C, Champagne 14.0 → 15.2 °C); vintage events (`_events.json`, fr-bourgogne-cote-d-or, fr-chablis, fr-champagne); drinking windows (`site/data/ageing/profiles.json`).

## Prices (US retail, checked Oct 2026)
- Louis Jadot Gevrey-Chambertin village: $73.74 (Mid Valley Wine), CellarTracker avg $74 → "$65–100".
- Louis Jadot Gevrey 1er Cru Petite Chapelle: $199.99 (K&D); Faiveley Gevrey 1er Les Cazetiers 2022: $265 (Morrell) → "$130–250".
- William Fèvre Chablis 2023: $41.99 (Millesima USA) → "$25–45".
- Domaine Matrot Meursault 2022: $98.99 (Houston Wine Merchant); Matrot Les Chevalières $134.99 (Total Wine) → "$75–120".
- Joseph Drouhin Laforêt Bourgogne: $16.99–20.99 last listed (Wine.com, older vintages) → "$20–35" range allows for 2025–26 tariff increases.
- Louis Bouillot Crémant de Bourgogne Perle d'Ivoire: $25.95 (Wine On Sale) → "$20–28".
- Moët Impérial: $59.99 (Wooden Cork) → in "$55–75".
- Pierre Gimonnet Cuis 1er Cru: $79 (Champion Wine Cellars) → "$60–80".
- Pierre Péters Cuvée de Réserve: $79.99 (Houston Wine Merchant) → "$75–95".
- Charles Heidsieck Brut Réserve: $84.99 (Wooden Cork) → "$70–90".
- Bollinger Special Cuvée: $69.99 (Total Wine, K&D) → "$65–80".
- Krug Grande Cuvée 173ème: $259 (Millesima USA) → "$230–280".
- Paul Bara Brut Réserve Grand Cru: $64.99–74.99 (Hudson Lights) → "$60–75".
- NOT checked against a live listing (the session's shared web-search budget ran out mid-pricing): Héritiers du Comte Lafon Mâcon-Villages, Marsannay (Bruno Clair, Pataille), Volnay, Savigny (Chandon de Briailles, Bize), Olivier Leflaive Les Sétilles, Domaine Leflaive Bourgogne Blanc, Clos de Vougeot, Corton, Corton-Charlemagne, Pernand blanc, famous-domaine Bourgogne (Méo-Camuzet, Fourrier), Mercurey 1er, Pouilly-Fuissé, Morgon, aged Chablis 1er, Taittinger/Veuve Clicquot NV, Chartogne-Taillet, demi-sec, Pol Roger/Roederer vintage, Billecart and Laurent-Perrier rosé, Crémant rosé, Larmandier-Bernier, Egly-Ouriet, Selosse Initial, Coteaux Champenois, Rosé des Riceys, Dom Pérignon, La Grande Dame, English sparkling. These ranges are estimates from prior knowledge, widened and nudged up for 2025–26 tariff pricing (the verified bottles ran 10–20% above pre-tariff levels). Re-check before launch.

## Atlas errors / inconsistencies found (not fixed; not my files)
1. `fr.json` profile fr-vosne-romanee `contains_ids` maps "La Romanée" to `site-fr-chassagne-montrachet-la-romanee` (a Chassagne premier cru). Should be `site-fr-la-romanee`.
2. Champagne lieux-dits: the brief says the atlas has 1,803 Champagne lieux-dits. It does not: the 1,803 cadastral lieux-dits (work/depth-boundaries-log.md §2) are in Côte-Rôtie, Hermitage, Cornas, Condrieu, Château-Grillet, Saint-Joseph, Châteauneuf, Morgon, Moulin-à-Vent, Fleurie, Savennières, Sancerre and Vouvray. Champagne has only the 324 cru-village polygons (`src: champ`). The Champagne guide uses village shapes plus sites (Clos du Mesnil, houses).
3. Champagne village count: the atlas draws 324 cru villages (312 current communes split back into historical crus); the official figure is 319 crus. The guide gives 319 and explains the 324.
4. `fr-champagne-tours-sur-marne` has ctx "Montagne de Reims", but the atlas's own Vallée de la Marne region text lists Tours-sur-Marne as a Vallée grand cru (and the Montagne text lists nine grand crus without it). One of the two is inconsistent; the Comité usually places Tours-sur-Marne in the Grande Vallée de la Marne.
5. Burgundy region text says "about 30,000 hectares"; BIVB Sept 2024 gives 32,301 ha. The guide uses 32,000.
6. Clos de Vougeot 1889: EN Wikipedia "six merchants", FR Wikipédia and iDealwine "fifteen". The atlas profile does not give a number; flagging for anyone who adds one.
7. Champagne region text and fr-champagne profile state the 2026 yield as 8,800 kg/ha and that the 2003 area revision was "abandoned in October 2026". Neither could be verified: the cited Winelabs digest gives no kg/ha figure (only "fourth consecutive reduction", "250 m bottle cap"). The guide avoids both claims.
8. Chablis is attached to `region-fr-chablis-and-the-grand-auxerrois` but its premier cru ids have parent `fr-chablis` (no aggregate premier cru polygon), as the boundaries log notes; not an error, just a limit (no single id for "Chablis Premier Cru").

## Places wanted but without an id
- Abbeys of Cluny and Cîteaux (no site).
- Clos des Goisses (Philipponnat) in Mareuil-sur-Aÿ: no site or lieu-dit; used the village and `site-fr-champagne-philipponnat`.
- Krug Clos d'Ambonnay: no site.
- Combe Lavaux / Combe d'Orveau as features (used neighbouring premier crus).
- Obédiencerie in Chablis.
- Taittinger Domaine Evremond (Kent): no site; used the event `event-champagne-buys-england`.

## Judgement calls
- Burgundy flight: Bourgogne Rouge (ch1) → Marsannay (ch2, cheapest village) → Gevrey village (ch3) → Gevrey premier cru (ch4); whites Mâcon-Villages (ch1) → Chablis → Meursault village (ch5). Domaine vs négociant tasted via Olivier Leflaive vs Domaine Leflaive Bourgogne Blanc (ch6).
- 3D pyramid shot on Vosne (bearing 280, pitch 62) with Gevrey as the "exception" slope; satellite on Romanée-Conti and the Clos de Vougeot wall.
- Ch9 and ch11 Burgundy and several Champagne deeper chapters have no under-$30 pick; the brief allows splurges in the deeper part, and nothing honest exists under $30 at those levels.
- Champagne ch11 tasting pick "English sparkling" uses `place: "gb"` (country id) because no English appellation id fits.
