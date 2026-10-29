# Grape structural tasting profiles and sommelier study decks (Vitis Mundi)

Deliverables (validated JSON, contract of V2_PLAN.md "study"):
- `site/data/study/tasting.json`: 250 grape ids, 316 style profiles, 638 classic-region links, all resolved to atlas ids.
- `site/data/study/decks.json`: 39 decks, 1,665 cards; 1,562 cards carry a target (873 appellation or fine-unit ids, 480 sites, 11 regions, 75 grapes, 76 timeline events, 47 soils); 103 are text flashcards.
- Sources and build scripts: `work/study/tasting_src/t0*.py`, `work/study/decks_src/d0*.py`, `work/study/scripts/` (`build_tasting.py`, `build_decks.py`, `ids.py`, `clusters.py`, `content.py`). Rebuild with `python3 build_tasting.py --write` then `python3 build_decks.py --write`. Copies in `work/study/*.out.json`.

## Structural norms per grape and style (deductive grid)

### Takeaway
Each grape has 1 to 5 profiles by style (dry red, dry white, off-dry, rosé, sparkling, sweet, botrytis, fortified, orange, oxidative). Some styles have a variant (for example `white_oaked`, `red_warm`, `white_rich`, `red_dried`). Each profile gives WSET-style 1 to 5 ranges for acid, tannin, body, alcohol, sweetness and aroma intensity, plus colour, WSET-lexicon aroma clusters, oak practice and classic regional expressions. These follow the WSET SAT scale vocabulary. The WSET L3 SAT gives no alcohol percentage thresholds, so the project defines its own bands; that convention is documented in `_meta`.

### Cited Findings
- WSET L3 SAT (May 2022) scales: acidity, tannin, body, flavour intensity and finish run low, medium(-), medium, medium(+), high (or light to pronounced). Alcohol is low, medium, high, and fortified wines are judged on their own scale with no % thresholds given. Colour is lemon-green, lemon, gold, amber, brown for whites; pink, salmon, orange for rosé; purple, ruby, garnet, tawny, brown for reds. Sweetness runs dry to luscious. — [WSET L3 SAT](https://www.WSETglobal.com/media/11766/wset_l3wines_sat_en_may2022_issue2.pdf)
- WSET Wine-Lexicon cluster names used for the `clusters` field. Primary: floral, green fruit, citrus, stone, tropical, red, black, dried/cooked fruit, herbaceous, herbal, pungent spice, other. Secondary: yeast, malolactic conversion, oak. Tertiary: deliberate oxidation, fruit development, bottle age. — [WSET L3 SAT](https://www.WSETglobal.com/media/11766/wset_l3wines_sat_en_may2022_issue2.pdf)
- CMS keeps a Deductive Tasting Grid, a Deductive Tasting Workbook and a "Classic Grape Markers" document in its Toolbox. The public Toolbox does not reproduce the grape-and-region lists. — [CMS Toolbox 26.1](https://courtofmastersommeliers.org/wp-content/uploads/2026/02/CMS-Toolbox-26.1.pdf); [CMS Deductive Tasting Grid](https://courtofmastersommeliers.org/other/deductive-tasting-grid/)
- CMS initial conclusions use climate (cool, moderate, warm) and age bands (1 to 3, 3 to 5, 5 to 10, 10+ years). Quality levels include Village, Premier Cru, Grand Cru, Reserva, Gran Reserva, Classico, Riserva, Kabinett, Spätlese. — [CMS 2024 Initial and Final Conclusions](https://www.mastersommeliers.org/wp-content/uploads/2024/03/2024-Deductive-Tasting-Initial-and-Final-Conclusions-KL.pdf)
- Grüner Veltliner's white pepper is rotundone. Mattivi et al. (2011) report it for the first time in a white variety, Grüner Veltliner, at up to 17 times its sensory threshold. Levels were very high in Schioppettino and Vespolina, and the compound sits almost entirely in the skin. — [Mattivi et al. 2011](https://openpub.fmach.it/handle/10449/20040)
- Carmenère wines carried 5.0 to 44.4 ng/l of IBMP (green pepper methoxypyrazine), much higher than most Cabernet Sauvignon. Clone and climate drove the levels. — [Belancic and Agosin, AJEV 2007](https://www.ing.uc.cl/publicaciones/methoxypyrazines-in-grapes-and-wines-of-vitis-vinifera-ev-carmenere/)
- Pinotage's distinctive young bouquet is driven by high isoamyl acetate, formed during fermentation. It fades with age, oxygen and heat. — [AJEV 1979 abstract](https://scilit.com/publications/82a9663207173d9fa830853d05891cbf)
- Riesling's petrol note is TDN. Riesling averaged 6.4 ug/l against 1.3 ug/l for other varietals, with an odour threshold around 2 ug/l. Sun exposure above about 20% of full sun raises it. — [Jamie Goode, Wine Anorak](https://wineanorak.com/2020/08/29/introducing-tdn-a-compound-responsible-for-petrol-aromas-in-riesling-and-other-white-wines/)
- Gewürztraminer and lychee share cis-rose oxide among key odorants (study title found; full text not read). — [ASEV abstract](https://www.asev.org/abstract/aroma-sensory-interactions-between-cis-rose-oxide-linalool-and-terpineol-gewurztraminer)
- Wachau categories: Steinfeder up to 11.5% abv, Federspiel up to 12.5%, Smaragd at least 12.5%. All are dry and unoaked. — [Vinea Wachau](https://vinea-wachau.at/en/vinea-wachau/the-brandnames)
- Barolo: 38 months minimum (18 in wood), riserva 62, min 13% abv. Barbaresco: 26 months (9 in wood), riserva 50, 12.5%. Both DOCG 1980. — [Wine with Seth](https://www.winewithseth.com/winewiki/compare/barolo-vs-barbaresco/)
- Tokaji Aszú: min 120 g/l sugar since 2013, 6 puttonyos from 150 g/l, 18 months in oak. Eszencia: min 450 g/l and 1.2 to 8% abv. Dry Szamorodni: max 9 g/l. Six permitted grapes. — [Wine with Seth, Tokaj PDO](https://www.winewithseth.com/winewiki/tokaj-pdo/)

### Inferences
- Markers encoded per grape follow the briefing examples:
  - Nebbiolo: pale garnet, A4-5, T5, tar and roses.
  - Gewürztraminer: A1-2, lychee and rose, I5.
  - Chenin: A5, wet wool and lanolin.
  - Grüner: white pepper (rotundone), lentil and green bean.
  - Pinotage: banana and acetone.
  - Carmenère: pyrazine.
  - Mencía: violet, red fruit and slate.
  - Assyrtiko: A5 with X4-5, saline and smoky.
  - Furmint: A5, smoke and quince.
- Regional contrasts are encoded as `classic_regions[].markers`:
  - Nebbiolo: Barolo MGAs (Cannubi, Brunate, Vignarionda, Monprivato, Ginestra), Barbaresco, Valtellina, Gattinara, Ghemme, Roero.
  - Syrah: Côte-Rôtie, Hermitage, Cornas, Saint-Joseph, Crozes, Walla Walla/Rocks District, Gimblett Gravels, and a separate warm Barossa profile.
  - Riesling: a Mosel Kabinett profile against a dry profile covering Clare, Eden, Alsace, Wachau Smaragd, Kamptal, Rheingau and Pfalz GG.
  - Sauvignon Blanc: Sancerre, Pouilly-Fumé, Marlborough, Elgin, Casablanca, Südsteiermark, and an oaked Pessac-Léognan Sémillon blend.
- `confused_with` gives the classic blind-tasting pairs, each with one "tell". This lets the deductive grid explain why a candidate drops out.
- The alcohol scale needs a project convention because WSET gives no thresholds. I used under 11, 11 to 12, 12 to 13.5, 13.5 to 14 and over 14% for steps 1 to 5. This is my own choice and is labelled as such in `_meta`.

### Gaps
- No public CMS list of exam-eligible grape-and-region pairs was retrievable (the Toolbox only names the internal documents). Region choices therefore follow common WSET Diploma and CMS benchmark lists from training knowledge plus the atlas content, not an official list.
- Typical analyses (TA g/l, pH) were not gathered per producer, so the ranges are on the 1 to 5 scales only. The `alcohol` ranges are approximate.
- The Nebbiolo pigment explanation could not be confirmed: the PMC article did not load. The note is worded generally ("relatively low in the more stable anthocyanins").
- 16 grape ids are omitted: collection, table-grape or extinct vines with no current wine style. They are listed in `_meta.coverage`.
- Marker text for minor hybrids and Balkan, Caucasian and Turkish grapes is short and less detailed, and rests on general knowledge rather than per-grape research.

## Study decks (exam knowledge on the map and in flashcards)

### Takeaway
There are 39 decks covering every requested topic. Each place card targets a real atlas id: appellation, fine unit (Burgundy premier cru polygons, MGAs, UGAs, Rieden, Einzellagen) or site. Grape, timeline and soil cards target those global ids. Where no id exists, the card is a plain text flashcard. Many place answers reuse the first sentences of the atlas's own profile text, so map and quiz stay consistent.

### Cited Findings
- Saint-Émilion 2022: Premiers Grands Crus Classés A are Figeac and Pavie. The 12 B estates are Beau-Séjour Bécot, Beauséjour (Duffau-Lagarrosse), Bélair-Monange, Canon, Canon-la-Gaffelière, Larcis Ducasse, Pavie Macquin, Troplong Mondot, Trottevieille, Valandraud, Clos Fourtet and La Mondotte. INAO states 71 Grands Crus Classés, but its own printed list implies 72 unique names. — [INAO](https://www.inao.gouv.fr/en/saint-emilion-grand-cru-classement-next-decade)
- Champagne has 17 grand crus and 42 premiers crus. Chouilly, Le Mesnil-sur-Oger, Oger, Oiry and Verzy were promoted in 1985. The échelle des crus ended in 2010, and the 1990 change ended fixed prices. — [Tom Stevenson, GuildSomm](https://www.guildsomm.com/public_content/features/articles/b/tom_stevenson/posts/champagne-classifications-and-pricing)
- Sherry reform, published 13 September 2021:
  - Unfortified Fino and Manzanilla allowed.
  - Ageing allowed across the whole zone.
  - Six old varieties re-authorised.
  - Manzanilla Pasada and Fino Antiguo need a 7-year minimum.
  - The 2-year minimum and 15% minimum are unchanged.

  — [Decanter](https://www.decanter.com/wine-news/sherry-do-regulations-to-see-historical-changes-464747/). A July 2025 update extends unfortified status to more styles reaching 15% naturally. — [CSW 2026 addendum](https://winewitandwisdomswe.com/wp-content/uploads/2025/12/Addendum-CSW-Study-Guide-2026.pdf)
- Port:
  - Crusted: at least 3 years in bottle.
  - Vintage: bottled 2 to 3 years after harvest.
  - LBV: 4 to 6 years in wood.
  - Colheita: at least 7 years in cask.
  - Aged tawny and white: 10, 20, 30 and 40 years.

  — [IVDP](https://ivdp.pt/en/wines/port-wines/special-categories/). The 50-year category was announced in July 2021. — [Decanter](https://www.decanter.com/wine-reviews-tastings/new-50-year-old-port-category-468981). Reserve Tawny needs at least 6 years in oak (2025 update). — [CSW 2026 addendum](https://winewitandwisdomswe.com/wp-content/uploads/2025/12/Addendum-CSW-Study-Guide-2026.pdf)
- Madeira age categories run from Seleccionado (3 years) through 5, 10, 15, 20, 30, 40 and over 40 years. Rainwater is up to 5 years. Colheita needs at least 5 years; Frasqueira at least 20 years in cask. — [Wines of Portugal](https://winesofportugal.com/en/portuguese-wines/wine-styles/vinho-da-madeira/)
- Chianti Classico has 11 UGAs: Castellina, Castelnuovo Berardenga, Gaiole, Greve, Lamole, Montefioralle, Panzano, Radda, San Casciano, San Donato in Poggio and Vagliagli. They were published 1 July 2023. Gran Selezione must be min 90% Sangiovese from the 2027 vintage, with up to 10% native varieties. — [Decanter](https://www.decanter.com/wine-news/unita-geografiche-aggiuntive-uga-approved-for-chianti-classico-gran-selezione-507159)
- Italy had 78 DOCGs and just over 330 DOCs as of December 2025. New DOCGs include Casauria and Cirò Classico (July 2025, min 90% Gaglioppo, 36 months ageing). Graves Supérieures was declassified in 2025. — [CSW 2026 addendum](https://winewitandwisdomswe.com/wp-content/uploads/2025/12/Addendum-CSW-Study-Guide-2026.pdf)
- Austria has 18 DACs; Thermenregion was the last, in 2023. Weinviertel was the first (2002 vintage). — [Wine with Seth](https://www.winewithseth.com/winewiki/dac-austria/)
- Willamette Valley has 11 nested AVAs, the newest being McMinnville (2025 listing), Mount Pisgah (2022) and Lower Long Tom (2021). — [Willamette Valley Wineries](https://www.willamettewines.com/about-the-valley/ava-overviews/)
- Napa Valley AVA (1981) has 17 nested AVAs, including Crystal Springs. — [Napa Valley Vintners](https://napavintners.com/napa_valley/appellations.asp)
- Washington had 21 AVAs as of 2024, with Beverly the newest then. The atlas adds Columbia Hills (2026) as the 22nd. — [Wine with Seth](https://www.winewithseth.com/winewiki/washington-state/)
- Wikipedia lists 19 Vinos de Pago (to 2020) but says 20 in its text. The atlas has 30 VP ids, including newer ones (Urbezo 2024, Río Negro 2025, Rosalejo 2024, Tharsys 2025) from its own content research. — [Wikipedia](https://en.wikipedia.org/wiki/Vino_de_Pago)

### Inferences
- Deck list:
  - France: 1855 Médoc (65 cards: all 61 classed reds plus 4 rules cards), 1855 Sauternes-Barsac (29), Saint-Émilion 2022 (21), Burgundy grand crus (36), Côte d'Or villages (28), Chablis climats (13), Beaujolais crus (14), Rhône crus (22), Alsace grands crus (56: all 51 plus rules), Champagne crus and sub-regions (41), Loire AOCs (32).
  - Italy: DOCGs by region (83), Barolo MGAs (75), Barbaresco MGAs (32), Tuscany and Chianti UGAs (27).
  - Spain and Portugal: Spain DOCa/DOQ/Pago (40), Sherry (20), Port (50), Madeira (12).
  - Germany and Austria: Anbaugebiete (18), Einzellagen (47), Austria DACs (22), Wachau Rieden (14).
  - Central Europe and Greece: Tokaj (78), Greek PDOs (36).
  - USA: Napa (21), Sonoma (20), Willamette (14), Washington (17).
  - Southern hemisphere: Australia GIs by state (105), NZ (21), South Africa (66), Chile (63), Argentina (60).
  - Cross-cutting: grape-to-region (74), region-to-grape (143), soils (66), wine law terms (24), timeline ordering (60 events, `order` = year, `ordered: true`).
- Card fields beyond the contract are `kind` (appellation, site, region, grape, event, soil) and `order` (timeline). Deck fields beyond it are `ordered` and `_meta`. The `find` mode is dropped automatically for decks with no map targets.
- The front end should treat `kind: grape|event|soil` targets as profile links (`VM.open('grape'|'event'|'soil', id)`), not map polygons.

### Gaps
- No Champagne échelle percentages are carried per premier cru village; the atlas sites hold only 12 premier cru villages.
- Côte d'Or premiers crus are not a separate deck. Their polygons and sites exist, so a "Burgundy premiers crus" deck could be generated later from the `Premier Cru` fine units.
- Sonoma's AVA count is phrased as "19 or so", because the exact current count was not confirmed from TTB.
- Saint-Émilion's Grands Crus Classés (71 or 72) are not individual cards: the atlas has no site ids for most of them.
- Some atlas-derived answers inherit atlas wording, such as Sonoma Valley "(1982)" in the summary while the profile says created 1981. The atlas content was not edited (v1 files are out of scope).
