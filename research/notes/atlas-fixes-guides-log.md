# Atlas fixes from the guide writers' notes (followups items 12 to 18)

Date: 2026-10-30. Scope: work/followups.md items 12 to 18; writers' notes in work/guides-*-log.md.
Backups of every file touched (pre-edit copies): `work/atlas_fixes_guides_backup/` (same relative paths).
integrate.py and the climate/topo scripts were NOT run. site/data/guides/* and the front end were not edited.
Every edited JSON file was re-serialised in its original style (site files minified with `ensure_ascii=False, separators=(',',':')`; data/content files `indent=1`; work/geo_src/fr.geojson untouched) and re-parsed after writing.
Text fixes were applied to both the site file and the research source it came from (data/content/*.json, data/content/global/*.json, work/ageing/parts/*.py); the change list shows each file.

## Changes made (file, id, field: old -> new; source)

### 12 southernmost
- `data/content/c12_oceania_africa_asia.json` id `None` field `countries/1/tagline`
  - old: The world's most southerly wine country, which turned
  - new: One of the world's most southerly wine countries, which turned
  - source: Sarmiento, Chubut (Argentina) lies at about 45.6 S, south of Central Otago (Alexandra about 45.25 S); Bubbly Professor 'Mind your Latitude' / writer log
- `site/data/content/nz.json` id `nz` field `country/tagline`
  - same edit as above
- `data/content/c12_oceania_africa_asia.json` id `None` field `countries/1/overview`
  - old: Central Otago (the world's most southerly commercial wine region, at around 45 degrees south)
  - new: Central Otago (long billed as the world's most southerly commercial wine region, at around 45 degrees south, a title now contested by Patagonian vineyards near Sarmiento)
  - source: Sarmiento, Chubut (Argentina) lies at about 45.6 S, south of Central Otago (Alexandra about 45.25 S); Bubbly Professor 'Mind your Latitude' / writer log
- `site/data/content/nz.json` id `nz` field `country/overview`
  - same edit as above
- `data/content/c12_oceania_africa_asia.json` id `None` field `appellations/134/summary`
  - old: Central Otago is the world's most southerly commercial wine region, at around 45 degrees south,
  - new: Central Otago is often called the world's most southerly commercial wine region, at around 45 degrees south (vineyards near Sarmiento in Argentine Patagonia, at about 45.6 degrees, now contest the title),
  - source: Sarmiento, Chubut (Argentina) lies at about 45.6 S, south of Central Otago (Alexandra about 45.25 S); Bubbly Professor 'Mind your Latitude' / writer log
- `site/data/content/nz.json` id `nz-central-otago` field `profiles/nz-central-otago/summary`
  - same edit as above
- `site/data/study/decks.json` id `nz-regions-002` field `decks/30/cards/1/a`
  - same edit as above
- `site/data/ageing/profiles.json` id `nz-central-otago` field `nz-central-otago/why`
  - old: The world's southernmost wine region has a continental climate
  - new: Often billed as the world's southernmost wine region, Central Otago has a continental climate
  - source: Sarmiento, Chubut (Argentina) lies at about 45.6 S, south of Central Otago (Alexandra about 45.25 S); Bubbly Professor 'Mind your Latitude' / writer log
- `site/data/ageing/profiles.json` id `nz-bannockburn` field `nz-bannockburn/why`
  - same edit as above
- `work/ageing/parts/p06_newworld.py` id `None` field `python source`
  - same edit as above

### 12 Sonoma AVAs
- `data/content/c10_north_america.json` id `None` field `regions/1/classification`
  - old: There are 18 AVAs wholly or partly in the county
  - new: There are 19 AVAs wholly or partly in the county
  - source: Wikipedia 'Sonoma County wine' (19 AVAs listed, incl. West Sonoma Coast); the region's own appellation list has 19
- `site/data/content/us.json` id `region-us-sonoma-county` field `regions/1/classification`
  - same edit as above

### 13 GS 2027
- `site/data/ageing/profiles.json` id `it-chianti-classico` field `it-chianti-classico/tiers/gran_selezione/label`
  - old: Gran Selezione (estate fruit, 90% Sangiovese from 2021)
  - new: Gran Selezione (estate fruit, 90% Sangiovese from the 2027 vintage)
  - source: Decanter 'UGAs approved for Chianti Classico Gran Selezione' (2023): 90% Sangiovese from the 2027 vintage; Italian Wine Central Chianti Classico DOCG; atlas regs/it.json (MASAF disciplinare)
- `work/ageing/parts/p03_italy.py` id `None` field `python source`
  - same edit as above

### 13 UGA timing
- `data/content/it_b.json` id `None` field `regions/0/classification`
  - old: all approved together and in the rules since July 2023: Castellina, Castelnuovo Berardenga, Gaiole, Greve, Lamole, Montefioralle, Panzano, Radda, San Casciano, San Donato in Poggio and Vagliagli.
  - new: all written into the rules in July 2023: Castellina, Castelnuovo Berardenga, Gaiole, Greve, Lamole, Montefioralle, Panzano, Radda, San Casciano, San Donato in Poggio and Vagliagli. Eight could be used at once; Lamole, Montefioralle and Vagliagli only become usable from 2027.
  - source: Italian Wine Central, Chianti Classico DOCG ('Eight UGAs ... now in effect'; Lamole, Montefioralle and Vagliagli 'will become available with the 2027 vintage'); atlas regs/it.json (disciplinare: usable from the end of the third year after the 2023 amendment)
- `site/data/content/it.json` id `region-it-tuscany` field `regions/12/classification`
  - same edit as above
- `site/data/content/it_fine.json` id `it-chianti-classico-lamole` field `created`
  - old: UGA of Chianti Classico (approved June 2021; effective 2023 rules)
  - new: UGA of Chianti Classico (approved June 2021; in the 2023 rules, usable on labels from 2027)
  - source: Italian Wine Central, Chianti Classico DOCG ('Eight UGAs ... now in effect'; Lamole, Montefioralle and Vagliagli 'will become available with the 2027 vintage'); atlas regs/it.json (disciplinare: usable from the end of the third year after the 2023 amendment)
- `site/data/content/it_fine.json` id `it-chianti-classico-lamole` field `classification`
  - old: The UGA name may appear on Gran Selezione labels;
  - new: The UGA name may appear on Gran Selezione labels, but this is one of three deferred UGAs (with Montefioralle and Vagliagli) usable only from 2027;
  - source: Italian Wine Central, Chianti Classico DOCG ('Eight UGAs ... now in effect'; Lamole, Montefioralle and Vagliagli 'will become available with the 2027 vintage'); atlas regs/it.json (disciplinare: usable from the end of the third year after the 2023 amendment)
- `site/data/content/it_fine.json` id `it-chianti-classico-montefioralle` field `created`
  - same edit as above
- `site/data/content/it_fine.json` id `it-chianti-classico-montefioralle` field `classification`
  - old: The UGA name may appear on Gran Selezione labels;
  - new: The UGA name may appear on Gran Selezione labels, but this is one of three deferred UGAs (with Lamole and Vagliagli) usable only from 2027;
  - source: Italian Wine Central, Chianti Classico DOCG ('Eight UGAs ... now in effect'; Lamole, Montefioralle and Vagliagli 'will become available with the 2027 vintage'); atlas regs/it.json (disciplinare: usable from the end of the third year after the 2023 amendment)
- `site/data/content/it_fine.json` id `it-chianti-classico-vagliagli` field `created`
  - same edit as above
- `site/data/content/it_fine.json` id `it-chianti-classico-vagliagli` field `classification`
  - old: The UGA name may appear on Gran Selezione labels;
  - new: The UGA name may appear on Gran Selezione labels, but this is one of three deferred UGAs (with Lamole and Montefioralle) usable only from 2027;
  - source: Italian Wine Central, Chianti Classico DOCG ('Eight UGAs ... now in effect'; Lamole, Montefioralle and Vagliagli 'will become available with the 2027 vintage'); atlas regs/it.json (disciplinare: usable from the end of the third year after the 2023 amendment)
- `data/content/it_b.json` id `Lamole` field `created`
  - same edit as above
- `data/content/it_b.json` id `Montefioralle` field `created`
  - same edit as above
- `data/content/it_b.json` id `Vagliagli` field `created`
  - same edit as above
- `data/content/depth_misc_fine.json` id `it-chianti-classico-vagliagli` field `classification`
  - same edit as above
- `data/content/depth_misc_fine.json` id `it-chianti-classico-montefioralle` field `classification`
  - same edit as above
- `data/content/depth_misc_fine.json` id `it-chianti-classico-lamole` field `classification`
  - same edit as above

### 13 term-uga
- `data/content/global/glossary.json` id `None` field `terms/184/definition`
  - old: From the 2020 vintage, Gran Selezione wines may show the UGA on the label,
  - new: Since the rules took effect in 2023, Gran Selezione wines may show the UGA on the label (Lamole, Montefioralle and Vagliagli only from 2027), including earlier vintages that meet the criteria,
  - source: Italian Wine Central, Chianti Classico DOCG ('Eight UGAs ... now in effect'; Lamole, Montefioralle and Vagliagli 'will become available with the 2027 vintage'); atlas regs/it.json (disciplinare: usable from the end of the third year after the 2023 amendment)
- `site/data/content/global/glossary.json` id `None` field `terms/184/definition`
  - same edit as above

### 13 Sassicaia cuttings
- `data/content/it_b.json` id `None` field `appellations/31/summary`
  - old: planted Cabernet cuttings (said to come from Château Lafite) at Tenuta San Guido
  - new: planted Cabernet cuttings from a friend's estate near Pisa (by the estate's account the Salviati property at Migliarino; the often-told Château Lafite origin is a legend) at Tenuta San Guido
  - source: Wikipedia 'Tenuta San Guido' (cuttings 'from 50-year-old vines from a friend's estate near Pisa', per Nicolò Incisa via Kerin O'Keefe, World of Fine Wine 23; the Lafite claim is dismissed); Tenuta San Guido history (Salviati, Migliarino) per writer log
- `site/data/content/it.json` id `it-bolgheri-sassicaia` field `profiles/it-bolgheri-sassicaia/summary`
  - same edit as above

### 13 Bolgheri DOC date
- `data/content/it_b.json` id `None` field `appellations/30/created`
  - old: 1984 (white and rosé); reds 1994
  - new: 1983 (white and rosé; DPR of 1 August 1983, published January 1984); reds 1994
  - source: Bolgheri DOC disciplinare header (aisitalia.it): 'Approvato con DPR 01.08.1983 GU 30 - 31.01.1984'; Sassicaia subzone DM 05.11.1994
- `site/data/content/it.json` id `it-bolgheri` field `profiles/it-bolgheri/created`
  - same edit as above

### 13 Produttori ha
- `data/content/it_a.json` id `None` field `appellations/1/summary`
  - old: which today farms roughly 100 hectares through its members, about an eighth of the appellation,
  - new: which today farms about 120 hectares through its more than 50 member families, about a sixth of the appellation,
  - source: produttoridelbarbaresco.com: 'oggi conta oltre 50 membri con 120 ettari di vigneti a Nebbiolo'; appellation 733 ha (atlas profile)
- `site/data/content/it.json` id `it-barbaresco` field `profiles/it-barbaresco/summary`
  - same edit as above

### 14 Mosel rank/area
- `data/content/c7_central_nw_europe.json` id `None` field `regions/0/summary`
  - old: It is Germany's oldest wine region and its third largest, with about 8,500 hectares,
  - new: It is Germany's oldest wine region and its fifth largest, with about 8,300 hectares (2025),
  - source: Deutsches Weininstitut, Anbaugebiet Mosel (ch.deutscheweine.de/regionen/anbaugebiet/72/mosel): 'fifth largest wine-growing region of Germany'; facts box 8,287 ha (2025)
- `site/data/content/de.json` id `region-de-mosel` field `regions/0/summary`
  - same edit as above

### 16 Mosel area
- `data/content/c7_central_nw_europe.json` id `None` field `appellations/0/summary`
  - old: about 8,500 hectares in 131 municipalities
  - new: about 8,300 hectares (2025) in 131 municipalities
  - source: Deutsches Weininstitut, Anbaugebiet Mosel (ch.deutscheweine.de/regionen/anbaugebiet/72/mosel): 'fifth largest wine-growing region of Germany'; facts box 8,287 ha (2025)
- `site/data/content/de.json` id `de-mosel` field `profiles/de-mosel/summary`
  - same edit as above
- `site/data/content/de.json` id `de-mosel` field `area_ha`
  - old: 8536
  - new: 8287
  - source: Deutsches Weininstitut Mosel facts box: 8,287 ha (2025)
- `data/content/c7_central_nw_europe.json` id `de-mosel` field `area_ha`
  - same edit as above

### 14 law event
- `data/content/global/timeline.json` id `germany-law-reform-2021` field `events/139/text`
  - old: Gutswein (estate), Ortswein (village), Erste Lage and Grosse Lage at the top, with smaller origins having stricter rules. Grosslagen names must be shown more clearly as regional, and the changes are being phased in over the 2020s.
  - new: Gutswein (estate), Ortswein (village) and Lagenwein (single vineyard) at the top, with smaller origins having stricter rules; protection associations may add an optional Erste Lage tier, while 'Grosse Lage' remains a private VDP term. From the 2026 harvest former Grosslage names may only appear as regional names (with the word 'Region'), and the changes were phased in over the 2020s.
  - source: German wine law 2021 (Weingesetz): national pyramid Gutswein/Ortswein/Lagenwein, Grosse Lage is a VDP (private) term; RP Darmstadt 'Weinbezeichnungsrecht ab Ernte 2026' (via writer log): former Grosslagen labelled 'Region ...' from the 2026 harvest
- `site/data/content/global/timeline.json` id `germany-law-reform-2021` field `events/139/text`
  - same edit as above
- `site/data/study/decks.json` id `timeline-059` field `decks/38/cards/58/a`
  - old: Gutswein (estate), Ortswein (village), Erste Lage and Grosse Lage at the top, with smaller origins having stricter rules.
  - new: Gutswein (estate), Ortswein (village) and Lagenwein (single vineyard) at the top, with smaller origins having stricter rules; 'Grosse Lage' remains a private VDP term.
  - source: same as timeline event germany-law-reform-2021 (study deck card copy)

### 14 Doctor owners
- `data/content/c7_central_nw_europe.json` id `site-de-bernkasteler-doctor` field `sites/0/text`
  - old: Thanisch, Lauerburg and Kesselstatt are owners.
  - new: the main owners are Wegeler, the two Thanisch estates and Lauerburg.
  - source: de.wikipedia 'Bernkasteler Doctor': Wegeler 1.1 ha; Thanisch (two estates) and Lauerburg among owners; 'Reichsgraf von Kesselstatt hatte bis Ende 2014 0,06 ha von Wegeler gepachtet'
- `site/data/content/de.json` id `site-de-bernkasteler-doctor` field `sites/0/text`
  - same edit as above

### 14 Prädikat origin
- `data/content/global/glossary.json` id `None` field `terms/140/definition`
  - old: The concept dates from the 1971 German law.
  - new: Terms such as Spätlese and Auslese were in use long before, but the 1971 German law fixed the modern ladder and its definitions.
  - source: Wikipedia 'Spätlese': Spätlese tradition from 1775 (legend), 'In the 1971 German wine law, the Spätlese Prädikat was given its present interpretation'
- `site/data/content/global/glossary.json` id `None` field `terms/140/definition`
  - same edit as above

### 14 Braune Kupp coords
- `data/content/c7_central_nw_europe.json` id `site-de-wiltinger-braune-kupp` field `sites/98/text`
  - old: it gives slightly broader Riesling than the Scharzhofberg. Coordinates mark Wiltingen and are approximate.
  - new: it gives slightly broader Riesling than the Scharzhofberg.
  - source: Point moved to the label point of the official register polygon de-wiltingen-braune-kupp (bq official)
- `site/data/content/de.json` id `site-de-wiltinger-braune-kupp` field `sites/98/text`
  - same edit as above
- `site/data/content/de.json` id `site-de-wiltinger-braune-kupp` field `lat/lon/coord_quality`
  - old: [49.6597, 6.5919, "approx"]
  - new: [49.6746, 6.5897, "precise"]
  - source: Official register polygon de-wiltingen-braune-kupp (bq official), label point [6.5897, 49.6746]; old point marked Wiltingen village
- `data/content/c7_central_nw_europe.json` id `site-de-wiltinger-braune-kupp` field `lat/lon/coord_quality`
  - same edit as above
- `site/data/geo/_sites.geojson` id `site-de-wiltinger-braune-kupp` field `geometry/cq`
  - old: [[6.5919, 49.6597], "approx"]
  - new: [[6.5897, 49.6746], "precise"]
  - source: Official register polygon de-wiltingen-braune-kupp (bq official), label point [6.5897, 49.6746]; old point marked Wiltingen village

### 15 Burgundy area
- `data/content/fr_b.json` id `None` field `regions/0/summary`
  - old: the region strings together about 30,000 hectares of vines,
  - new: the region strings together about 32,000 hectares of vines (32,301 ha, BIVB 2024),
  - source: BIVB Chiffres clés, Sept 2024 (info-beaune.com PDF): '32301 hectares'
- `site/data/content/fr.json` id `region-fr-burgundy` field `regions/29/summary`
  - same edit as above

### 17 Bordeaux climate grapes
- `data/content/fr_a.json` id `None` field `regions/0/terroir`
  - old: and in 2019 the INAO let Bordeaux and Bordeaux Supérieur use
  - new: and in 2021 the INAO (after a growers' vote in 2019) let Bordeaux and Bordeaux Supérieur use
  - source: Atlas timeline event bordeaux-new-varieties-2021; Wine Industry Advisor (INAO national approval announced Jan 2021) via writer log; growers' vote 2019
- `site/data/content/fr.json` id `region-fr-bordeaux` field `regions/0/terroir`
  - same edit as above
- `data/content/fr_a.json` id `None` field `appellations/41/summary`
  - old: In 2019 the INAO approved six climate-adaptation varieties for Bordeaux and Bordeaux Supérieur:
  - new: In January 2021, after a vote by the growers in 2019, the INAO approved six climate-adaptation varieties for Bordeaux and Bordeaux Supérieur:
  - source: Atlas timeline event bordeaux-new-varieties-2021; Wine Industry Advisor (INAO national approval announced Jan 2021) via writer log; growers' vote 2019
- `site/data/content/fr.json` id `fr-bordeaux` field `profiles/fr-bordeaux/summary`
  - same edit as above

### 17 1855 wording
- `data/content/global/timeline.json` id `bordeaux-1855` field `events/64/text`
  - old: It has been changed only twice: Cantemerle was added in September 1855, and Mouton Rothschild was promoted to first growth in 1973.
  - new: Its rankings have changed only once, when Mouton Rothschild was promoted to first growth in 1973; Cantemerle was added to the list soon after publication.
  - source: Wikipedia 'Bordeaux Wine Official Classification of 1855' (Cantemerle added after publication, 1855/1856 accounts differ; Mouton promoted 1973)
- `site/data/content/global/timeline.json` id `bordeaux-1855` field `events/64/text`
  - same edit as above
- `data/content/fr_a.json` id `None` field `regions/0/classification`
  - old: it has changed only once, with Mouton Rothschild's promotion in 1973.
  - new: its rankings have changed only once, with Mouton Rothschild's promotion in 1973 (Cantemerle was added to the list soon after publication).
  - source: Wikipedia 'Bordeaux Wine Official Classification of 1855' (Cantemerle added after publication, 1855/1856 accounts differ; Mouton promoted 1973)
- `site/data/content/fr.json` id `region-fr-bordeaux` field `regions/0/classification`
  - same edit as above

### 17 Rioja zone wines
- `data/content/es.json` id `None` field `regions/0/classification`
  - old: which requires 100 percent of the grapes from that zone;
  - new: made from that zone's grapes, though up to 15 percent may come from vineyards in neighbouring municipalities held under exclusive contract for at least ten years;
  - source: Consejo Regulador DOCa Rioja, Oficio circular 2017/07 'Acuerdos en materia de vinos con indicación de zona' (riojawine.com): zone wines may include at most 15% grapes from registered vineyards in neighbouring municipalities with 10 years' exclusive access
- `site/data/content/es.json` id `region-es-rioja` field `regions/0/classification`
  - same edit as above

### 17 Priorat DOQ
- `data/content/global/glossary.json` id `None` field `terms/56/definition`
  - old: Priorat (2000, as DOQ, Denominació d'Origen Qualificada in Catalan)
  - new: Priorat (DOQ, Denominació d'Origen Qualificada in Catalan: approved by the Catalan government in 2000, confirmed nationally in 2009)
  - source: Wikipedia 'Priorat (DOQ)': 'The Catalan authorities approved of Priorat's elevation from DO to DOQ status in 2000'; 'national level confirmation ... came only on 6 July 2009'
- `site/data/content/global/glossary.json` id `None` field `terms/56/definition`
  - same edit as above

### 18 La Crau dates
- `data/content/depth_lieux_dits.json` id `fr-chateauneuf-du-pape-la-crau` field `appellations/20/summary`
  - old: named after the optical telegraph tower built on the plateau in the 1790s,
  - new: named after the optical telegraph tower Claude Chappe built on the plateau in 1821,
  - source: vieux-telegraphe.fr history: 'in 1821, Claude Chappe ... built one of his signal towers'; in 1891 Henri 'gifted to his son Hippolyte some plots of land on La Crau'
- `site/data/content/fr_fine.json` id `fr-chateauneuf-du-pape-la-crau` field `fine_profiles/fr-chateauneuf-du-pape-la-crau/summary`
  - same edit as above
- `data/content/depth_lieux_dits.json` id `fr-chateauneuf-du-pape-la-crau` field `appellations/20/nerd_note`
  - old: The Brunier family of Vieux Télégraphe have farmed the plateau since 1898;
  - new: The Brunier family of Vieux Télégraphe have farmed the plateau since 1891;
  - source: vieux-telegraphe.fr history: 'in 1821, Claude Chappe ... built one of his signal towers'; in 1891 Henri 'gifted to his son Hippolyte some plots of land on La Crau'
- `site/data/content/fr_fine.json` id `fr-chateauneuf-du-pape-la-crau` field `fine_profiles/fr-chateauneuf-du-pape-la-crau/nerd_note`
  - same edit as above

### 18 Rayas
- `data/content/depth_lieux_dits.json` id `fr-chateauneuf-du-pape-le-rayas` field `appellations/85/summary`
  - old: and since 1997 his nephew Emmanuel Reynaud has run it, also making Château des Tours and Château de Fonsalette.
  - new: and his nephew Emmanuel Reynaud ran it from 1997 until his death in November 2025, also making Château des Tours and Château de Fonsalette.
  - source: chateauneuf.com 'Passing of Emmanuel Reynaud, owner of Château Rayas' (news received 25 Nov 2025); Decanter obituary (died aged 61)
- `site/data/content/fr_fine.json` id `fr-chateauneuf-du-pape-le-rayas` field `fine_profiles/fr-chateauneuf-du-pape-le-rayas/summary`
  - same edit as above
- `data/content/fr_b.json` id `site-fr-chateau-rayas` field `sites/252/text`
  - old: Emmanuel Reynaud's mythical estate in a wooded clearing on sandy soil in the north of the appellation, making pure Grenache from low-yielding old vines. Its unusual, ethereal, almost Burgundian Châteauneuf is one of the world's most sought-after wines.
  - new: The Reynaud family's mythical estate in a wooded clearing on sandy soil in the north of the appellation, making pure Grenache from low-yielding old vines. Its unusual, ethereal, almost Burgundian Châteauneuf is one of the world's most sought-after wines. Emmanuel Reynaud, who ran it from 1997, died in November 2025.
  - source: chateauneuf.com 'Passing of Emmanuel Reynaud, owner of Château Rayas' (news received 25 Nov 2025); Decanter obituary (died aged 61)
- `site/data/content/fr.json` id `site-fr-chateau-rayas` field `sites/614/text`
  - same edit as above

### 18 Muscat BdV sugar
- `data/content/fr_b.json` id `None` field `appellations/113/summary`
  - old: at about 15 percent alcohol and at least 110 g/l of sugar.
  - new: at about 15 percent alcohol and at least 100 g/l of sugar.
  - source: INAO cahier des charges AOP Muscat de Beaumes-de-Venise (PNO 2026): fermentable sugars 'Supérieure ou égale à 100' g/l; acquired alcohol >= 15%
- `site/data/content/fr.json` id `fr-muscat-de-beaumes-de-venise` field `profiles/fr-muscat-de-beaumes-de-venise/summary`
  - same edit as above

### 18 Tavel maceration
- `data/content/fr_b.json` id `None` field `appellations/118/nerd_note`
  - old: Tavel's colour comes from several days of maceration, longer than most rosés, which is why it has tannin and ages.
  - new: Tavel's colour comes from a longer skin maceration than most rosés get, which is why it has tannin and ages.
  - source: Wikipedia 'Tavel AOC': rosé generally 'a short period of maceration (10-36 hours)'; for Tavel 'some of the must is kept with the skins longer' (no source supports 'several days')
- `site/data/content/fr.json` id `fr-tavel` field `profiles/fr-tavel/nerd_note`
  - same edit as above

### 18 Gigondas white
- `data/content/fr_b.json` id `None` field `appellations/110/summary`
  - old: and since September 2022 white Gigondas, based on Clairette, has also been allowed.
  - new: and white Gigondas, based on Clairette, has been allowed from the 2023 vintage (approved by the INAO in September 2022).
  - source: The Drinks Business, Sept 2022 'Gigondas AOC extended to white wines from 2023 vintage' (INAO national committee vote 8 September 2022)
- `site/data/content/fr.json` id `fr-gigondas` field `profiles/fr-gigondas/summary`
  - same edit as above

### 18 La Roquette text
- `data/content/depth_lieux_dits.json` id `fr-chateauneuf-du-pape-la-roquette` field `appellations/80/summary`
  - old: A small lieu-dit on the plateau east of the village, on galets over clay.
  - new: A small lieu-dit north-east of the village, next to Rayas and Pignan, where sandy soils dominate.
  - source: Cadastral lieu-dit polygon fr-chateauneuf-du-pape-la-roquette (label point 4.8404, 44.0745, next to Rayas and Pignan); chateauneuf.com soil map (sand in the north-east of the appellation) via writer log
- `site/data/content/fr_fine.json` id `fr-chateauneuf-du-pape-la-roquette` field `fine_profiles/fr-chateauneuf-du-pape-la-roquette/summary`
  - same edit as above

### 12 NZ parents
- `site/data/geo/_index.json` id `nz-new-zealand` field `parent`
  - old: nz-marlborough
  - new: null
  - source: IPONZ: New Zealand, North Island, South Island are national/island 'enduring' GIs that contain the regions (atlas profiles list them in contains); the old parents came from point-in-polygon of approximate label points
- `site/data/geo/_index.json` id `nz-new-zealand` field `lvl`
  - old: 1
  - new: 0
  - source: IPONZ: New Zealand, North Island, South Island are national/island 'enduring' GIs that contain the regions (atlas profiles list them in contains); the old parents came from point-in-polygon of approximate label points
- `site/data/geo/_index.json` id `nz-new-zealand` field `ctx`
  - old: Marlborough
  - new: New Zealand
  - source: IPONZ: New Zealand, North Island, South Island are national/island 'enduring' GIs that contain the regions (atlas profiles list them in contains); the old parents came from point-in-polygon of approximate label points
- `site/data/geo/_extra_points.geojson` id `nz-new-zealand` field `properties/ctx`
  - same edit as above
- `site/data/geo/_index.json` id `nz-north-island` field `parent`
  - old: nz-hawkes-bay
  - new: null
  - source: IPONZ: New Zealand, North Island, South Island are national/island 'enduring' GIs that contain the regions (atlas profiles list them in contains); the old parents came from point-in-polygon of approximate label points
- `site/data/geo/_index.json` id `nz-north-island` field `lvl`
  - same edit as above
- `site/data/geo/_index.json` id `nz-north-island` field `ctx`
  - old: Hawke's Bay
  - new: North Island
  - source: IPONZ: New Zealand, North Island, South Island are national/island 'enduring' GIs that contain the regions (atlas profiles list them in contains); the old parents came from point-in-polygon of approximate label points
- `site/data/geo/_extra_points.geojson` id `nz-north-island` field `properties/ctx`
  - same edit as above
- `site/data/geo/_index.json` id `nz-south-island` field `parent`
  - same edit as above
- `site/data/geo/_index.json` id `nz-south-island` field `lvl`
  - same edit as above
- `site/data/geo/_index.json` id `nz-south-island` field `ctx`
  - old: Marlborough
  - new: South Island
  - source: IPONZ: New Zealand, North Island, South Island are national/island 'enduring' GIs that contain the regions (atlas profiles list them in contains); the old parents came from point-in-polygon of approximate label points
- `site/data/geo/_extra_points.geojson` id `nz-south-island` field `properties/ctx`
  - same edit as above

### 12 Waitaki parent
- `site/data/geo/_index.json` id `nz-waitaki-valley-north-otago` field `parent`
  - old: nz-canterbury
  - new: null
  - source: Wikipedia 'Waitaki Valley wine region': a registered GI 'in northern Otago' that 'extends along the southern bank of the Waitaki River' (the river is the Canterbury/Otago boundary); registered 2018 as its own Region GI
- `site/data/geo/_index.json` id `nz-waitaki-valley-north-otago` field `lvl`
  - old: 1
  - new: 0
  - source: Wikipedia 'Waitaki Valley wine region': a registered GI 'in northern Otago' that 'extends along the southern bank of the Waitaki River' (the river is the Canterbury/Otago boundary); registered 2018 as its own Region GI

### 12 Wild Horse Valley parent
- `site/data/geo/_index.json` id `us-wild-horse-valley` field `parent`
  - old: us-solano-county-green-valley
  - new: us-north-coast
  - source: Geometry check on official UC Davis/TTB polygons: Wild Horse Valley lies 34.1% in Napa Valley AVA and 65.9% in Solano County Green Valley AVA, 100% in North Coast; SPEC parent rule (smallest appellation containing >= 85%) gives us-north-coast, not us-napa-valley
- `site/data/geo/_index.json` id `us-wild-horse-valley` field `lvl`
  - old: 2
  - new: 1
  - source: Geometry check on official UC Davis/TTB polygons: Wild Horse Valley lies 34.1% in Napa Valley AVA and 65.9% in Solano County Green Valley AVA, 100% in North Coast; SPEC parent rule (smallest appellation containing >= 85%) gives us-north-coast, not us-napa-valley
- `site/data/geo/us.geojson` id `us-wild-horse-valley` field `properties/parent`
  - same edit as above
- `site/data/geo/us.geojson` id `us-wild-horse-valley` field `properties/lvl`
  - same edit as above
- `work/geo_src/us.geojson` id `us-wild-horse-valley` field `properties/parent`
  - same edit as above
- `work/geo_src/us.geojson` id `us-wild-horse-valley` field `properties/lvl`
  - old: null
  - new: 1
  - source: Geometry check on official UC Davis/TTB polygons: Wild Horse Valley lies 34.1% in Napa Valley AVA and 65.9% in Solano County Green Valley AVA, 100% in North Coast; SPEC parent rule (smallest appellation containing >= 85%) gives us-north-coast, not us-napa-valley

### 12 ageing CHB
- `site/data/ageing/profiles.json` id `nz-central-hawkes-bay` field `tiers/default_tier/why`
  - old: {"tiers": {"bordeaux_blend": {"label": "Bordeaux blend (Gimblett Gravels)", "ready": 4, "peak": [6, 15], "limit": 20}, "syrah": {"label": "Syrah", "ready": 3, "peak": [4, 10], "limit": 15}, "chardonnay": {"label": "Chardonnay", "ready": 2, "peak": [3, 8], "limit": 12}}, "default_tier": "bordeaux_blend", "why": "The Gimblett Gravels' heat-retaining stones ripen Cabernet, Merlot and Syrah in a marit …
  - new: {"tiers": {"pinot": {"label": "Pinot Noir", "ready": 2, "peak": [3, 8], "limit": 12}, "chardonnay": {"label": "Chardonnay", "ready": 2, "peak": [3, 8], "limit": 12}, "aromatic": {"label": "Sauvignon Blanc and Pinot Gris", "ready": 0, "peak": [1, 3], "limit": 5}}, "default_tier": "pinot", "why": "Cooler, more continental hill country south of the Heretaunga Plains, with limestone and clay soils, gr …
  - source: Atlas nz.json profile nz-central-hawkes-bay (cool, limestone; Pinot Noir, Chardonnay, Sauvignon Blanc, Pinot Gris; Lime Rock); tiers mirror the atlas's other cool NZ Pinot/Chardonnay profiles
- `work/ageing/parts/p06_newworld.py` id `nz-central-hawkes-bay` field `python source`
  - old: shared P([nz-hawkes-bay, nz-central-hawkes-bay]) Bordeaux tiers
  - new: separate P("nz-central-hawkes-bay") Pinot/Chardonnay/aromatic tiers
  - source: Atlas nz.json profile nz-central-hawkes-bay (cool, limestone; Pinot Noir, Chardonnay, Sauvignon Blanc, Pinot Gris; Lime Rock); tiers mirror the atlas's other cool NZ Pinot/Chardonnay profiles

### 17 Château Margaux ctx
- `site/data/geo/_sites.geojson` id `site-fr-chateau-margaux` field `properties/ctx`
  - old: Haut-Médoc
  - new: Margaux
  - source: Château Margaux lies in the Margaux AOC (its own app is fr-margaux; neighbours Palmer and Rauzan-Ségla have ctx Margaux)
- `site/data/content/fr.json` id `site-fr-chateau-margaux` field `ctx`
  - same edit as above

### 15 Vosne contains_ids
- `site/data/content/fr.json` id `fr-vosne-romanee` field `contains_ids[3]`
  - old: site-fr-chassagne-montrachet-la-romanee
  - new: site-fr-la-romanee
  - source: La Romanée is the Vosne-Romanée grand cru (site-fr-la-romanee, app fr-la-romanee); the old id is the Chassagne-Montrachet premier cru

### 15 Tours-sur-Marne
- `site/data/content/fr.json` id `region-fr-montagne-de-reims / region-fr-vallee-de-la-marne` field `app_ids`
  - old: in Montagne de Reims
  - new: moved to Vallée de la Marne
  - source: Wikipedia 'Vallée de la Marne': the sub-region 'contains only two Grands Crus villages: Aÿ and Tours-sur-Marne'; the atlas's own Vallée de la Marne region text lists it, the Montagne text does not
- `site/data/content/fr_fine.json` id `fr-champagne-tours-sur-marne` field `subregion`
  - old: Montagne de Reims
  - new: Vallée de la Marne
  - source: Wikipedia 'Vallée de la Marne': the sub-region 'contains only two Grands Crus villages: Aÿ and Tours-sur-Marne'; the atlas's own Vallée de la Marne region text lists it, the Montagne text does not
- `site/data/content/fr_fine.json` id `fr-champagne-tours-sur-marne` field `subregion_id`
  - old: region-fr-montagne-de-reims
  - new: region-fr-vallee-de-la-marne
  - source: Wikipedia 'Vallée de la Marne': the sub-region 'contains only two Grands Crus villages: Aÿ and Tours-sur-Marne'; the atlas's own Vallée de la Marne region text lists it, the Montagne text does not
- `data/content/depth_champagne_crus.json` id `fr-champagne-tours-sur-marne` field `subregion`
  - same edit as above
- `site/data/geo/_index.json` id `fr-champagne-tours-sur-marne` field `ctx`
  - same edit as above
- `site/data/geo/fr_fine.geojson` id `fr-champagne-tours-sur-marne` field `properties/ctx`
  - same edit as above

### 16 Petits Monts name
- `site/data/geo/_index.json` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `name`
  - old: Vosne-Romanée premier cru Les Petis Monts
  - new: Vosne-Romanée premier cru Les Petits Monts
  - source: Climat is Les Petits Monts on labels and in BIVB lists; the INAO parcel register spells it 'Les Petis Monts' (kept as alt). Id unchanged per instructions
- `site/data/geo/_index.json` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `alt`
  - old: []
  - new: ["Vosne-Romanée premier cru Les Petis Monts", "Les Petis Monts", "Les Petits Monts"]
  - source: Climat is Les Petits Monts on labels and in BIVB lists; the INAO parcel register spells it 'Les Petis Monts' (kept as alt). Id unchanged per instructions
- `site/data/geo/fr_fine.geojson` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `properties/name`
  - same edit as above
- `site/data/geo/fr_fine.geojson` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `properties/alt`
  - old: null
  - new: ["Vosne-Romanée premier cru Les Petis Monts", "Les Petis Monts", "Les Petits Monts"]
  - source: Climat is Les Petits Monts on labels and in BIVB lists; the INAO parcel register spells it 'Les Petis Monts' (kept as alt). Id unchanged per instructions
- `work/geo_src/fr_fine.geojson` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `properties/name`
  - same edit as above
- `work/geo_src/fr_fine.geojson` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `properties/alt`
  - same edit as above
- `site/data/content/fr_fine.json` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `name`
  - same edit as above
- `data/content/depth_burgundy_pc.json` id `fr-vosne-romanee-premier-cru-les-petis-monts` field `name`
  - same edit as above

### 16 Gadachrili event
- `site/data/content/global/timeline.json` id `gadachrili-gora` field `lat/lon`
  - old: [41.46, 44.83]
  - new: [41.3904, 44.821]
  - source: Wikipedia 'Gadachrili Gora' (near Imiri, south of Marneuli) and 'Imiri' (about 10 km from Marneuli; the hillfort lies south-west of the village); event moved onto the atlas site record site-ge-gadachrili-gora (41.3904, 44.821); 41.46/44.83 was Marneuli town
- `data/content/global/timeline.json` id `gadachrili-gora` field `lat/lon`
  - same edit as above

### 18 Syrah offspring
- `site/data/content/global/grapes.json` id `syrah` field `offspring`
  - old: ["Petite Sirah", "Mondeuse Noire"]
  - new: ["Petite Sirah"]
  - source: Wikipedia 'Mondeuse noire': parent-offspring relationship with Mondeuse blanche (Syrah's mother), making it 'either a grandparent or half-sibling to Syrah', not Syrah's offspring; atlas mondeuse-blanche and mondeuse-noire entries already say half-sibling
- `data/content/global/grapes.json` id `syrah` field `offspring`
  - same edit as above

### 13 Barbera d'Asti stray polygon
- `site/data/geo/it.geojson` id `it-barbera-d-asti` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - old: {"bbox": [7.8917, 44.5194, 11.1468, 45.9754], "area": 2229.0}
  - new: {"bbox": [7.8917, 44.5194, 8.5998, 45.1811], "area": 2218.9}
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `work/geo_src/it.geojson` id `it-barbera-d-asti` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - same edit as above
- `site/data/geo/_index.json` id `it-barbera-d-asti` field `bbox, area`
  - same edit as above
- `site/data/geo/_overview.geojson` id `it-barbera-d-asti` field `properties/area`
  - old: 2229.0
  - new: 2218.9
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `site/data/geo/it.geojson` id `it-barbera-del-monferrato` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - old: {"bbox": [7.8917, 44.465, 11.1468, 45.9754], "area": 3097.4}
  - new: {"bbox": [7.8917, 44.465, 8.8164, 45.1811], "area": 3087.3}
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `work/geo_src/it.geojson` id `it-barbera-del-monferrato` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - same edit as above
- `site/data/geo/_index.json` id `it-barbera-del-monferrato` field `bbox, area`
  - same edit as above
- `site/data/geo/_overview.geojson` id `it-barbera-del-monferrato` field `properties/area`
  - old: 3097.4
  - new: 3087.3
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `site/data/geo/it.geojson` id `it-barbera-del-monferrato-superiore` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - old: {"bbox": [7.8917, 44.465, 11.1468, 45.9754], "area": 3109.8}
  - new: {"bbox": [7.8917, 44.465, 8.8164, 45.1811], "area": 3099.7}
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `work/geo_src/it.geojson` id `it-barbera-del-monferrato-superiore` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - same edit as above
- `site/data/geo/_index.json` id `it-barbera-del-monferrato-superiore` field `bbox, area`
  - same edit as above
- `site/data/geo/_overview.geojson` id `it-barbera-del-monferrato-superiore` field `properties/area`
  - old: 3109.8
  - new: 3099.7
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `site/data/geo/it.geojson` id `it-monferrato` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - old: {"bbox": [7.8917, 44.465, 11.1468, 45.9754], "area": 3376.8}
  - new: {"bbox": [7.8917, 44.465, 8.8895, 45.1811], "area": 3366.7}
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `work/geo_src/it.geojson` id `it-monferrato` field `geometry (dropped parts [[11.0865, 45.901, 11.1258, 45.9468], [11.1096, 45.9529, 11.1468, 45.9754]]), bbox, area`
  - same edit as above
- `site/data/geo/_index.json` id `it-monferrato` field `bbox, area`
  - same edit as above
- `site/data/geo/_overview.geojson` id `it-monferrato` field `properties/area`
  - old: 3376.8
  - new: 3366.7
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)

### 13 Barbera d'Asti stray polygon (mirror)
- `site/data/geo/it.geojson` id `it-valdadige` field `geometry (dropped parts [[8.2096, 44.979, 8.2914, 45.0234]]), bbox, area`
  - old: {"bbox": [8.2096, 44.979, 11.6073, 46.7974], "area": 2189.9}
  - new: {"bbox": [10.7621, 45.526, 11.6073, 46.7974], "area": 2172.6}
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `work/geo_src/it.geojson` id `it-valdadige` field `geometry (dropped parts [[8.2096, 44.979, 8.2914, 45.0234]]), bbox, area`
  - same edit as above
- `site/data/geo/_index.json` id `it-valdadige` field `bbox, area`
  - same edit as above
- `site/data/geo/_overview.geojson` id `it-valdadige` field `properties/area`
  - old: 2189.9
  - new: 2172.6
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `site/data/geo/_regions.geojson` id `region-it-trentino-alto-adige` field `geometry (dropped parts [[8.2096, 44.979, 8.2914, 45.0233]]), bbox, area`
  - old: {"bbox": [8.2096, 44.979, 11.8083, 46.7969], "area": null}
  - new: {"bbox": [10.4522, 45.526, 11.8083, 46.7969], "area": null}
  - source: Region outline is the union of member polygons; it carried the Calliano (AT) copy from it-valdadige

### 13 related homonym stray (Garda)
- `site/data/geo/it.geojson` id `it-garda` field `geometry (dropped parts [[7.4761, 45.039, 7.5799, 45.0957]]), bbox, area`
  - old: {"bbox": [7.4761, 45.039, 11.461, 45.8431], "area": 2387.4}
  - new: {"bbox": [10.3699, 45.2801, 11.461, 45.8431], "area": 2358.1}
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)
- `work/geo_src/it.geojson` id `it-garda` field `geometry (dropped parts [[7.4761, 45.039, 7.5799, 45.0957]]), bbox, area`
  - same edit as above
- `site/data/geo/_index.json` id `it-garda` field `bbox, area`
  - same edit as above
- `site/data/geo/_overview.geojson` id `it-garda` field `properties/area`
  - old: 2387.4
  - new: 2358.1
  - source: Calliano (TN, Vallagarina) was joined to the Asti-province Barbera/Monferrato zones and Calliano (AT) to Valdadige; Rivoli (TO) was joined to Garda instead of Rivoli Veronese. Calliano AT is already inside the main Barbera d'Asti polygon and Calliano TN inside Valdadige/Trentino, so the stray copies were dropped and bbox/area recomputed (GEOD WGS84, as integrate.py)

### 14 Côte de Beaune bbox
- `site/data/geo/_regions.geojson` id `region-fr-cote-de-beaune` field `geometry (dropped parts [[-0.6873, 47.3091, -0.6518, 47.3228], [-0.7013, 47.3247, -0.6453, 47.3465]]), bbox, area`
  - old: {"bbox": [-0.7013, 46.8808, 4.898, 47.3465], "area": null}
  - new: {"bbox": [4.6003, 46.8808, 4.898, 47.1732], "area": null}
  - source: fr-coteaux-du-layon-saint-aubin-de-luigne (Loire, Anjou, lon -0.7) was listed in region-fr-burgundy and region-fr-cote-de-beaune app_ids because its alt name 'Saint-Aubin' matched the Burgundy village (followups item 11); its two polygons were dropped from the Côte de Beaune outline
- `site/data/geo/_regions.geojson` id `region-fr-cote-de-beaune` field `properties/n`
  - old: 31
  - new: 30
  - source: fr-coteaux-du-layon-saint-aubin-de-luigne (Loire, Anjou, lon -0.7) was listed in region-fr-burgundy and region-fr-cote-de-beaune app_ids because its alt name 'Saint-Aubin' matched the Burgundy village (followups item 11); its two polygons were dropped from the Côte de Beaune outline
- `site/data/content/fr.json` id `region-fr-burgundy` field `app_ids`
  - old: included fr-coteaux-du-layon-saint-aubin-de-luigne
  - new: removed
  - source: fr-coteaux-du-layon-saint-aubin-de-luigne (Loire, Anjou, lon -0.7) was listed in region-fr-burgundy and region-fr-cote-de-beaune app_ids because its alt name 'Saint-Aubin' matched the Burgundy village (followups item 11); its two polygons were dropped from the Côte de Beaune outline
- `site/data/content/fr.json` id `region-fr-cote-de-beaune` field `app_ids`
  - same edit as above

### 18 Southern Rhône bbox
- `site/data/geo/_regions.geojson` id `region-fr-southern-rhone` field `geometry (dropped parts [[4.7068, 44.9159, 4.9515, 45.5195]]), bbox, area`
  - old: {"bbox": [3.837, 43.6199, 5.7336, 45.5195], "area": null}
  - new: {"bbox": [3.837, 43.6199, 5.7336, 44.5317], "area": null}
  - source: region-fr-southern-rhone outline is the union of its members, which include fr-cotes-du-rhone (an AOC that also covers the northern Rhône up to Vienne); polygon parts lying wholly north of 44.6 N (the northern Côtes du Rhône pieces) were dropped and the bbox recomputed

## Claims checked and left unchanged (claimed error not upheld, or no data error)

- **12 NZ GDD (Martinborough > Hawke's Bay):** investigated only, no climate numbers changed. `site/data/vintage/nz.json` nz-martinborough is a **point** feature (single TerraClimate cell on the valley floor), while nz-hawkes-bay (approx outline, 14,166 km²) and nz-marlborough (admin outline, 10,477 km²) are **polygon averages over whole regional outlines** that include hill country: in `nz.geojson` clim, mean elevation is 344 m (Hawke's Bay, elev_max 1,657 m) and 360 m (Marlborough, elev_max 2,648 m), against vineyards close to sea level. The vf weights (0.88 and 0.60) do not remove that. So the ordering is a method artefact (point vs region-wide polygon average on coarse outlines), not a copy or a bug. Fix options for the climate owner: compute NZ regions over a vineyard mask or over the vineyard sub-areas (Heretaunga Plains/Gimblett Gravels, Wairau/Awatere), or treat region-wide NZ values as "region average" only.
- **16 us-los-carneros clim "copied" from us-napa-valley:** not a copy. Only gst (18.8) and gdd (1884) coincide; hi (2432 vs 2436), prec (731 vs 816), gsp, mjt (21.2 vs 21.9), elevation (45 vs 268 m) and dz all differ, and `scripts/climate_enrich.py` computes each feature independently (lapse-downscaled TerraClimate cells weighted per feature; no parent inheritance). The equal gst/gdd is a coincidence of a warm-biased Carneros value: the ~4 km grid does not resolve the bay wind and fog that make Carneros cooler than the Napa Valley average. Reported only; no climate values changed.
- **12 Wild Horse Valley:** the old parent (us-solano-county-green-valley) was wrong, but the suggested us-napa-valley is wrong too under the SPEC rule: the official polygon lies 34.1% in Napa Valley and 65.9% in Solano County Green Valley. Parent set to us-north-coast (100% containment). Profile text ("straddles the Napa-Solano county line, with most of it in Solano County") already matches.
- **13 Vino Nobile Pievi dates:** the writer's "National Wine Committee 10 Oct 2024" (Il Sole 24 Ore, 2025 anniversary piece) conflicts with a contemporary report: Rivista di Agraria, 5 Aug 2023, "Vino Nobile Montepulciano Pieve: il ministero approva il disciplinare" (final approval by the Comitato Nazionale Vini at its plenary of **3 August 2023**; first vintage 2021, on sale from 1 Jan 2025). The atlas sequence (approved 2023, published 2024, EU publication May 2025, from the 2021 vintage) is consistent with that, so it was left unchanged.
- **13 term-super-tuscan "Bolgheri DOC (1983)":** correct. The disciplinare header (aisitalia.it) reads "Approvato con DPR 01.08.1983 GU 30 - 31.01.1984". The it-bolgheri profile's "1984" (gazette date) was changed instead (see 13 Bolgheri DOC date).
- **13 it-barbera-d-asti parent (it-barbera-del-monferrato):** geometrically correct after removing the stray (99.5% of Barbera d'Asti lies in Barbera del Monferrato in the EU commune layer). Left unchanged. The stray polygon itself was fixed (see above).
- **13 it-canelli point only:** a profiled DOCG with no polygon in the source layers; nothing to fix in data. A polygon would need the Canelli DOCG commune list.
- **14 de-bremm-calmont "gradients of up to 65 degrees":** no authoritative source gives "60%". DWI's Mosel page gives no Calmont figure (it says some Mosel sites are planted at "about 70 degrees"), and deutschland.de says "bis zu 68 Grad". Sources quote degrees, so the atlas wording matches the published claims. Left unchanged. A physically careful rewording ("often quoted as") is optional.
- **14 Heymann-Löwenstein sold 2025:** no atlas text says who owns or manages the estate now (only producer lists and "Reinhard Löwenstein argued for decades ..."), so there was nothing to correct. The sale itself was not verified.
- **15 Champagne lieux-dits / 324 vs 319 villages:** the "1,803 Champagne lieux-dits" claim is not in the atlas data (it was in the guide brief). The 324 village shapes vs 319 official crus is a known modelling choice (historic crus split back out). No data change.
- **15 Champagne 2026 yield 8,800 kg/ha and the area revision dropped in October 2026:** both verified, so no change. Sources: Vinetur, 14 Aug 2026 "Comité Champagne Sets 2026 Harvest Limit at 8,800 Kilograms per Hectare"; glassofbubbly.com "Champagne sets 2026 harvest yield" (8,800 kg/ha); pleinchamp.com / linfodurable.fr "Le projet d'étendre l'aire de l'appellation Champagne définitivement enterré" and Vinetur, 22 Oct 2026 "French Wine Authority Keeps Champagne Appellation Borders Unchanged".
- **16 fr-chablis parent fr-petit-chablis:** geometrically consistent. In the INAO parcel layers, 98.9% of the Chablis aire lies inside the Petit Chablis aire. Left unchanged.
- **16 Chablis premier cru Morein parent Les Fourneaux:** correct. Morein is a climat of the Les Fourneaux premier cru, and its polygon is 99.7% inside Les Fourneaux. Left unchanged. (Its ctx label "Petit Chablis" is odd but derived; integrate.py would recompute it.)
- **17 Muga 1970 vs 1971:** not verified (the bodegasmuga.com family page and the riojawine.com Muga page give no move date). Left unchanged.
- **17 1855 "twice" vs "once":** not a factual error, but the two texts were reworded to agree (see 17 1855 wording).

## Notes for the next integration (things integrate.py may undo)

- **Parents, lvl and ctx in `_index.json`** are derived by integrate.py. The NZ enduring-GI and Waitaki parents came from point-in-polygon on approximate points. A re-run will bring back nz-marlborough / nz-hawkes-bay / nz-canterbury unless integrate.py gets an override: no parent for subcat "Enduring GI", and nz-waitaki-valley-north-otago kept parent-less. The same goes for ctx (Tours-sur-Marne, Château Margaux).
- **Côte de Beaune / Burgundy membership of fr-coteaux-du-layon-saint-aubin-de-luigne** comes from its alt name "Saint-Aubin" matching the Burgundy village (followups item 11). I removed it from region-fr-burgundy and region-fr-cote-de-beaune app_ids in `site/data/content/fr.json` and dropped its two polygons from the Côte de Beaune outline, but the root cause sits in integrate.py's region matching (or the alt). It will come back on re-integration until that is fixed.
- **region-fr-southern-rhone:** the outline is the union of members, and fr-cotes-du-rhone is a member. That AOC covers the whole valley up to Vienne. I clipped the outline parts wholly north of 44.6°N, which gives the new bbox [3.837, 43.6199, 5.7336, 44.5317]. A re-run will restore the northern parts unless the region outline excludes or clips fr-cotes-du-rhone.
- **Italian homonym communes:** the EU PDO commune layer joined Calliano (TN) to the Asti zones and Calliano (AT) to Valdadige. Rivoli (TO) was joined to Garda, which needs Rivoli Veronese. I fixed the geometry in `site/data/geo/it.geojson` and `work/geo_src/it.geojson` (it-barbera-d-asti, it-barbera-del-monferrato, it-barbera-del-monferrato-superiore, it-monferrato, it-valdadige, it-garda), recomputed bbox and area, and synced `_index.json`, `_overview.geojson` and the region-it-trentino-alto-adige outline in `_regions.geojson`. The clim values of these features still include the dropped slivers, but those are under 1.4% of each feature's area and were not recomputed (no climate scripts run). Other EU-layer homonyms may exist.
- **Ageing profiles:** `site/data/ageing/profiles.json` was edited directly, and so were its sources in `work/ageing/parts/p03_italy.py` and `p06_newworld.py` (nz-central-hawkes-bay now has its own P(...) entry). The build scripts were not run.
- **Study decks:** `site/data/study/decks.json` carries copies of some profile and timeline texts. The Central Otago card and the German law card were updated to match.
- **Petits Monts:** only the display name changed. The id stays `fr-vosne-romanee-premier-cru-les-petis-monts`, and alt now holds "Vosne-Romanée premier cru Les Petis Monts", "Les Petis Monts" and "Les Petits Monts". The source match list in depth_burgundy_pc.json already had both spellings.

## Web lookups used (WebSearch: 20 of 20)
Bolgheri DOC disciplinare (aisitalia.it); Wikipedia: Tenuta San Guido, Bolgheri, Mondeuse noire, Gadachrili Gora, Imiri, Spätlese, Priorat (DOQ), Tavel AOC, Sonoma County wine, Waitaki Valley wine region, Vallée de la Marne, Gigondas AOC, de: Bernkasteler Doctor; Decanter (UGA approval 2023); Italian Wine Central (Chianti Classico DOCG); Rivista di Agraria and Il Sole 24 Ore (Pievi); produttoridelbarbaresco.com; DWI Mosel page; deutschland.de (Calmont); BIVB Chiffres clés Sept 2024; Vinetur and glassofbubbly (Champagne 2026); riojawine.com oficio circular 2017/07; bodegasmuga.com and riojawine.com (Muga); chateauneuf.com (Reynaud); vieux-telegraphe.fr; INAO cahier des charges Muscat de Beaumes-de-Venise; The Drinks Business (white Gigondas).
