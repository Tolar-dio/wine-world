# France west and south: Bordeaux, Sud-Ouest, Loire, Champagne, Languedoc-Roussillon, Provence, Corsica

Deliverable: `/home/claude/winesite/data/content/fr_a.json` (29 regions, 179 appellations, 362 sites; validated with `python3 -m json.tool`). Build scripts: `/home/claude/winesite/scripts/fr_a/` (`p_*.py` write region part files to `work/fr_a/parts/`, `merge.py` merges them and runs the cross-checks). Site coordinates: `work/fr_a/geocode.json` (raw Nominatim results) and `work/fr_a/coords.json` (resolved values plus manual fixes). Appellation `match` names were taken from the EU PDO register as held in `raw/eupdo/PDO_EU_id.csv`. All 171 EU PDO names for the French regions in my scope are matched; the 190 unmatched names belong to other regions (Burgundy, Rhône, Alsace, Jura, Savoie, Beaujolais, Lorraine).

Method note: the web-search quota shared across agents ran out partway through the work, and three fr.wikipedia pages (Cahors AOC, Banyuls AOC, the 1907 revolt) were blocked at the permission prompt. The facts listed under Cited Findings below were verified against the sources given. Everything else in the JSON is written from expert knowledge and was cross-checked where possible. Wherever a hectare figure could not be verified, `area_ha` is left as null rather than guessed.

## Bordeaux: AOCs, classifications, recent changes, Sauternes-Barsac

### Takeaway
Bordeaux shrank sharply between 2023 and 2026. About 21,000 ha of vines were pulled up, leaving 91,543 ha in production in 2025. Its classifications remain the backbone of the content: the 1855 list (61 reds plus 27 Sauternes-Barsac, all mapped as sites), the 14 Graves crus, the 2022 Saint-Émilion list (Figeac promoted to A; Ausone, Cheval Blanc, Angélus and La Gaffelière gone) and the 2025 Crus Bourgeois.

### Cited Findings
- Gironde vineyard in production in 2025: 91,543 ha, 86,600 of them AOP. That is down 9% (9,200 ha) in one year and down about 27,000 ha (23%) since 2010. The 2025 harvest was 3.2 million hl, and sales from the cellars fell 43% between 2011 and 2025. — [Agreste NA Essentiel n°80, June 2026](https://draaf.nouvelle-aquitaine.agriculture.gouv.fr/IMG/pdf/essentiel_no80_-_la_filiere_viticole_girondine___chiffres_cles.pdf)
- Grubbing-up from August 2023 to May 2026: 12,284 ha with state or interprofession aid (5,711 ha state renaturation, 2,672 ha CIVB diversification, 3,900 ha Ukraine-crisis plan) plus about 8,700 ha without aid, about 21,000 ha in total. Another ~8,000 ha are expected in 2026 and 2027. — [Agreste NA Essentiel n°80](https://draaf.nouvelle-aquitaine.agriculture.gouv.fr/IMG/pdf/essentiel_no80_-_la_filiere_viticole_girondine___chiffres_cles.pdf)
- Crus Bourgeois 2025: 170 estates, down from 249 in 2020 (14 Exceptionnel, 36 Supérieur, 120 Cru Bourgeois), valid five years from the 2025 vintage. The 14 Exceptionnels are La Cardonne, Castéra and Laujac (Médoc); Malescasse, de Malleret, Paloumey, Reysson and du Taillan (Haut-Médoc); Reverdi (Listrac); d'Arsac, Mongravey and Paveil de Luze (Margaux); Le Crock and Lafitte Carcasset (Saint-Estèphe). The jury was chaired by Philippe Faure-Brac and HVE environmental certification is required. — [Decanter](https://www.decanter.com/wine-news/eight-new-estates-upgraded-to-top-of-cru-bourgeois-classification-as-2025-results-revealed-550748/); the list was unveiled on 10 Feb 2025 at Wine Paris — [Vert de Vin](https://vertdevin.com/en/the-new-2025-classification-of-the-crus-bourgeois-du-medoc/)
- Saint-Émilion 2022 classification. Premier Grand Cru Classé A: Pavie and Figeac, with Figeac the only promotion to A. Premier Grand Cru Classé B (12): Beau-Séjour Bécot, Beauséjour, Bélair-Monange, Canon, Canon-la-Gaffelière, Larcis Ducasse, Pavie Macquin, Troplong Mondot, Trottevieille, Valandraud, Clos Fourtet, La Mondotte. 71 Grands Crus Classés. Ausone, Cheval Blanc, Angélus and La Gaffelière withdrew. — [Vinfolio](https://www.vinfolio.com/editorial/new-2022-saint-emilion-classification)
- Angélus withdrew in January 2022 after a court ruling against Hubert de Boüard for undue influence over the 2012 classification. Ausone and Cheval Blanc left in 2021. — [Laguna Cellar](https://www.lagunacellar.com/blog/post/chateau-angelus-exits-saint-emilion-aoc)
- On 15 March 2024 the Conseil d'État upheld the 2012 Saint-Émilion classification, ending 11 years of litigation brought by Corbin Michotte's owner. — [INAO](https://www.inao.gouv.fr/en/cp-classement-aop-saint-emilion-grand-cru-conseil-etat-15-mars-2024)
- Graves classification: originally 16 crus, now 14 (6 for red only, 2 for white only, 6 for both). La Tour Haut-Brion was merged into La Mission Haut-Brion in 2006 and Laville Haut-Brion in 2009. — [fr.wikipedia, Classement des vins de Graves](https://fr.wikipedia.org/wiki/Classement_des_vins_de_Graves)
- Sauternes rules: five communes (Barsac, Bommes, Fargues, Preignac, Sauternes); over 2,200 ha in 2010 and about 41,000 hl a year from ~190 estates. Must of at least 221 g/l sugar, at least 15% potential and 12% actual alcohol, at least 45 g/l residual sugar, maximum yield 25 hl/ha (ceiling 28). Grapes must be noble-rotted and hand-picked in successive tries, and anti-botrytis sprays are banned. AOC decree 30 Sept 1936; current specification decree 2011-1820. — [Origin-GI Sauternes dossier](https://www.origin-gi.com/wp-content/uploads/2014/08/france_sauternes.pdf)
- Château Climens: in July 2022 Bérénice Lurton sold a majority stake to Jean-Hubert Moitry and stayed on as consultant. The estate has 30 ha in one block and has been biodynamic since 2010. — [fr.wikipedia, Château Climens](https://fr.wikipedia.org/wiki/Château_Climens)
- Yquem: about 100 ha planted. Vintages not released include 1992 and 2012 among others. Y (Ygrec) was first made in 1959 and is sold as Bordeaux. LVMH share purchases are given as 1996 and later years. — [Wine Cellar Insider](https://www.thewinecellarinsider.com/bordeaux-wine-producer-profiles/bordeaux/sauternesbarsac/dyquem/). The sources disagree on the LVMH dates, so the JSON says "end of the 1990s".
- Entre-deux-Mers rouge: approved by INAO, first vintage 2023, first releases January 2025. Rules: at least 4,500 vines/ha, 21 months of ageing, thermovinification banned. — [Jane Anson](https://janeanson.com/entre-deux-mers-introduces-red-as-well-as-white-wines-under-the-aoc)

### Inferences
- The JSON's 1855 site set has 61 Médoc and Graves reds (Mouton marked as 1973 first growth; Cantemerle noted as added in September 1855) and 27 Sauternes-Barsac (Yquem Supérieur, 11 Premiers, 15 Deuxièmes). This is the standard current count and was checked by script.
- Bordeaux Haut-Benauge is included as its own entry because it appears as a name in the Bordeaux AOC register; it is a minor label.

### Gaps
- The 36 Crus Bourgeois Supérieurs of 2025 were not obtained; the official PDF on crus-bourgeois.com failed to load. Only the Exceptionnels are mapped.
- I could not check whether de Boüard's conviction was appealed or what the outcome was. The JSON says "late 2021, guilty of prise illégale d'intérêts".
- The 2019 Bordeaux climate-adaptation varieties (Arinarnoa, Castets, Marselan, Touriga Nacional, Alvarinho, Liliorila; 5% of plantings and 10% of blends) come from memory. The Meininger source failed to load, though the EU register's variety list for Bordeaux AOC does include Alvarinho, Arinarnoa, Castets, Liliorila and Marselan.
- Appellation hectares for most Bordeaux AOCs are left null or rounded from memory; no 2025 per-AOC CIVB figures were found.

## Champagne

### Takeaway
Champagne has 34,200 ha in 319 crus. Shipments fell to about 266 million bottles in 2025, the 2026 yield was cut to 8,800 kg/ha, and the 2003 project to revise the appellation area was abandoned on 21 October 2026.

### Cited Findings
- 34,200 ha; 319 crus; about 16,200 growers working 90% of the vines; about 370 houses shipping more than two thirds of the volume; 130 cooperatives. — [Comité Champagne factsheet](https://champagne.education/sites/default/files/2024-05/Factsheet-Key-Figures-Champagne-EN.pdf)
- 2025 shipments were about 266 million bottles (2024: 271.4 million): exports about 152 million, France about 114 million. — [Wine Industry Advisor / Comité Champagne](https://wineindustryadvisor.com/2026/01/21/champagne-266-million-bottles-shipped-in-2025/)
- 2026 marketable yield was set at 8,800 kg/ha, enough for about 250 million bottles. Earlier limits: 2025 9,000; 2024 10,000; 2023 11,400; 2022 12,000; 2020 8,000 kg/ha. First-half 2026 shipments rose 1.2% to 107.1 million bottles. — [Vinetur, Aug 2026](https://www.vinetur.com/en/20260814105654/comite-champagne-sets-2026-harvest-limit-at-8800-kilograms-per-hectare.html)
- The SGV (president Maxime Toubart) abandoned the appellation-area revision on 21 Oct 2026, citing climate, economy, geopolitics and falling consumption. — [L'Info Durable](https://www.linfodurable.fr/le-projet-detendre-laire-de-lappellation-champagne-definitivement-enterre-59504)
- Échelle des crus: an informal scale from 1911 and an agreed one from 1919. Price-fixing ended in 1990, an indicative price ran until 2001, and the scale was abandoned in the 2000s. There are 17 grand cru and 42 premier cru villages, and the terms survive as a tolerated label usage. — [BKWine](https://www.bkwine.com/?p=411812)
- 2023 harvest labour scandal: in November 2025 the Châlons-en-Champagne court jailed the head of the contractor Anavim for human trafficking of about 50 workers lodged at Nesle-le-Repons. A cooperative was fined €75,000. — [Brut](https://www.brut.media/fr/articles/france/justice-faits-divers/vendanges-en-champagne-prison-ferme-pour-traite-detres-humains)
- The Champagne AOC in the EU register allows Arbane, Chardonnay, Meunier, Petit Meslier, Pinot Blanc, Pinot Gris and Pinot Noir, with a 15,500 kg/ha maximum (EU PDO dataset, local `raw/eupdo`).

### Inferences
- The Merret 1662 paper, the Dom Pérignon myth, the 1911 riots, the 1927 admission of the Aube, the 2015 UNESCO listing and the house histories are written from established knowledge.

### Gaps
- No current per-variety planting percentages were confirmed. The JSON uses the commonly cited ~38% Pinot Noir, ~32% Meunier and ~30% Chardonnay.
- The number of pickers who died in the 2023 heat is not given, because no source was confirmed.
- The house coordinates for Taittinger, Roederer, Henriot, Mercier and Ruinart are approximate (street level), and the grand and premier cru sites are village centroids.

## Loire Valley

### Takeaway
InterLoire covers about 42,000 ha and produced 1.75 million hl in 2024 (36% white, 28% rosé, 19% red, 17% sparkling). Muscadet has seven official crus communaux; three more (Vallet, La Haye-Fouassière, Champtoceaux) were put to consultation in 2025 and had still not been ratified as of February 2026.

### Cited Findings
- About 42,000 ha in 14 departments; 34 AOP plus 1 IGP under InterLoire (more than 50 AOP in the wider basin per INAO); 1,745,193 hl in 2024; colour split white 36%, rosé 28%, red 19%, sparkling 17%; about 20% exported. — [InterLoire activity report](https://www.vinsdeloire.fr/sites/interloire/files/2025-06/rapport-d-activite-interloire.pdf)
- Crus communaux: Clisson, Gorges and Le Pallet (2011); Château-Thébaud, Monnières-Saint-Fiacre, Mouzillon-Tillières and Goulaine (2019). — [The Wine Doctor, Feb 2026](https://www.thewinedoctor.com/tastingsformal/muscadet2026_02_crucommunal.shtml)
- The INAO public consultation on Champtoceaux, La Haie-Fouassière and Vallet ran from 25 August to 25 October 2025. — [Meininger](https://www.meininger.de/wein/erzeuger/drei-neue-dgcs-fuer-muscadet). The Wine Doctor (Feb 2026) says they were not yet ratified, which conflicts with [Vins de Loire](https://vinsdeloire.fr/en/loire-wines/muscadet-sevre-et-maine-crus-communaux), whose page lists all ten without dates. The JSON treats the three as proposed.
- Saumur AOC: about 1,400 ha, created 1936. Saumur Puy-Notre-Dame red is Cabernet Franc with at most 15% Cabernet Sauvignon and lower yields. — [fr.wikipedia, Saumur (AOC)](https://fr.wikipedia.org/wiki/Saumur_(AOC))

### Inferences
- Savennières Roche aux Moines and Coulée de Serrant appear as separate EU PDOs, so each got its own entry. Quarts de Chaume is entered as "Grand Cru (2011)" from established knowledge.

### Gaps
- The date Saumur Puy-Notre-Dame was recognised (2009 is used) is unverified.
- Per-AOC hectares for most Loire appellations come from memory and are approximate.

## Southwest (Sud-Ouest)

### Takeaway
All 30 Sud-Ouest AOCs in the EU register are covered, plus Floc de Gascogne and Pineau des Charentes, which are liqueur-wine PDOs.

### Cited Findings
- EU register names and dates, including Entraygues - Le Fel, Estaing, Brulhois, Saint-Mont, Coteaux du Quercy, Saint-Sardos, Gaillac premières côtes, Haut-Montravel and Côtes de Montravel (EU PDO dataset, local). The Cahors specification allows Côt, Merlot and Tannat; Jurançon's yield comes from the same dataset.

### Inferences
- Cahors' 70% minimum Malbec, the Madiran Tannat share (60 to 80%), Henri IV's Jurançon baptism, the Sarragachies Monument Historique (2012) and micro-oxygenation (Ducournau, early 1990s) are written from established knowledge.

### Gaps
- No interprofession hectare figures were fetched (the Cahors fr.wikipedia page was blocked), so most `area_ha` values are approximate.

## Languedoc-Roussillon, including the vins doux naturels and the 1907 revolt

### Takeaway
Languedoc AOPs cover nearly 46,000 ha. Pic Saint-Loup became an AOP in its own right (EU registration July 2023), and Montpeyroux became a communal AOC in 2026, with Cabrières and Cazelles in progress. Roussillon's five Villages names were verified.

### Cited Findings
- Nearly 46,000 ha; 36 AOP and IGP; about 2,000 estates, 150 cooperatives and 500 négociants. — [CIVL press release Feb 2025](https://languedoc-wines.com/wp-content/uploads/2025/02/CIVL_CP-Wine-Paris-2025.pdf)
- Pic Saint-Loup AOP: EU implementing regulation published 7 July 2023; 17 communes; 1,473 ha (2022); red and rosé; Syrah is the core variety. — [INAO](https://inao.gouv.fr/sites/default/files/2024-10/CP%20INAO_Viticulture_Pic%20Saint-Loup_reconnu_AOP.pdf)
- At the June 2025 CNAOV, Montpeyroux's specification was approved and public consultation was opened for Cabrières (a future AOP) and Cazelles (a Minervois DGC). Muscat de Lunel's specification revision added controlled irrigation. — [INAO CNAOV 12 June 2025](https://inao.gouv.fr/en/cnaov-12-06-2025)
- AOC Montpeyroux was confirmed in March 2026. It replaces Languedoc-Montpeyroux and covers Montpeyroux, Arboras, Lagamas and Saint-Jean-de-Fos; 35 producers (16 independent) campaigned for it, and the first INAO visit was in 1996. — [Vinetur, 30 Mar 2026](https://www.vinetur.com/fr/2026033098328/montpeyroux-wine-region-secures-official-aoc-status-after-decades-long-campaign.html). Area of about 500 ha — [Wine with Seth](https://www.winewithseth.com/winewiki/montpeyroux-aoc/) (secondary source).
- AOC Languedoc was approved by INAO on 9 Nov 2006, replacing Coteaux du Languedoc and covering all Languedoc-Roussillon AOC areas. — [Réussir, 2006](https://www.reussir.fr/lesmarches/lappellation-regionale-languedoc-est-nee)
- The five Côtes du Roussillon Villages names are Caramany, Latour-de-France, Les Aspres, Lesquerde and Tautavel; the appellation dates from 1977 and the names were added between 1977 and 2017. — [INAO](https://www.inao.gouv.fr/node/37824/printable/pdf)
- Minervois has terroir zones and a grape-share rule (Grenache, Syrah and Mourvèdre at least 60%). The sources give its area as 4,400 or 5,000 ha. — [fr.wikipedia, Minervois (AOC)](https://fr.wikipedia.org/wiki/Minervois_(AOC))

### Inferences
- The VDN content (mutage at about 96% spirit, 252 g/l minimum must, Arnau de Vilanova around 1285, the 1898 Pams law, grenat/tuilé/ambré/rimage/hors d'âge/rancio, bonbonnes in the sun, solera-like topping up, Banyuls Grand Cru with 30 months in wood) is written from established knowledge. The 1907 revolt facts (Marcellin Albert, Argeliers, Montpellier on 9 June with 500,000 to 800,000 people, the Narbonne shootings of 19 to 20 June, the 17e mutiny, the law of 29 June 1907) are also from memory, because the fr.wikipedia page was blocked.
- The Limoux "1531" claim is presented as a local claim, not a proven fact.

### Gaps
- Whether Montpeyroux's EU registration is final is not confirmed. The INAO consultation reports described recognition as "pending" in mid-2025, and Vinetur reports official status in March 2026.
- No current Roussillon area figure was confirmed, so the JSON avoids giving a number.

## Provence and Corsica

### Takeaway
The three main Provence AOPs covered 27,428 ha in 2025 and produced 1.24 million hl, about 89% of it rosé. Côtes de Provence has five terroir DGCs and 18 surviving 1955 crus classés. Corsica has nine AOPs.

### Cited Findings
- 27,428 ha; 1,238,862 hl; rosé about 89%; 40 to 45% of French AOP rosé and about 5% of world rosé; 42% exported; the USA is the top export market at 127,934 hl; more than 550 producers. — [Vins de Provence key figures 2025](https://www.vinsdeprovence.com/files/19a1acb2/brochure_chiffres_cles_2025_fr.pdf)
- Côtes de Provence: 20,300 ha; Sainte-Victoire and Fréjus (2005), La Londe (2008), Pierrefeu (2013) and Notre-Dame des Anges (2019); 23 crus classés in 1955, of which 18 remain (list in source); VDQS from 1951, with 84 communes in the AOC. — [fr.wikipedia, Côtes-de-provence](https://fr.wikipedia.org/wiki/Côtes-de-provence); DGC dates also in [The Buyer](https://the-buyer.net/wine/provence-rose-additional-terroir-designations)
- Corsica's nine AOPs are Patrimonio, Ajaccio, Corse, Corse Calvi, Corse Coteaux du Cap Corse, Corse Figari, Corse Porto-Vecchio, Corse Sartène and Muscat du Cap Corse. Figures given: 2,905 ha (and "2,800 ha for the 9 AOPs"), a total surface of 5,750 ha, red 17% and white 13% of production. — [Visit Corsica](https://www.visit-corsica.com/La-destination-Corse/Inspirations-corses/Inspirations-autour-du-vin/De-nombreuses-appellations-dont-9-AOP). The source's figures are internally inconsistent.

### Gaps
- The exact date and size of the LVMH stake in Minuty (2023) is from memory.

## Site coordinates

### Takeaway
362 sites: 236 marked precise (an OSM node or polygon for the named estate) and 126 approx (village centroid, street-level match, or interpolated from a neighbour).

### Cited Findings
- Geocoding used the OpenStreetMap Nominatim API (ODbL), queried at 1 request per second with a commune check, and retried with name variants. Mismatches were corrected by hand: Vallet (first matched to the wrong département), Le Pin (a homonym), Suau and Salon (wrong matches), and Pommery and Gosset (re-geocoded by street).

### Gaps
- Interpolated positions, offset from a known neighbour on the same plateau and marked approx: Léoville Las Cases, Léoville Poyferré, Léoville Barton, the three Doisys, Romer and Romer du Hayot, Couhins-Lurton, Bélair-Monange, Tertre Rôteboeuf, Trotanoy, La Fleur-Pétrus, Le Pin, Le Crock, Lafitte Carcasset, Mercier, Ruinart, Henriot, Salon, Pierre Péters, Egly-Ouriet and Larmandier-Bernier. They sit in the right commune and on the right slope but are not on the exact building.
- The Champagne grand and premier cru sites are village points, not vineyard polygons.

## Sources relied on (other than those above)
- Candiago S. et al. (2022), "A geospatial inventory of regulatory information for wine protected designations of origin in Europe", Scientific Data 9:394, local copy `raw/eupdo`: https://doi.org/10.6084/m9.figshare.c.5877659
- OpenStreetMap Nominatim: https://nominatim.openstreetmap.org
- Blocked or failed URLs (not used): https://fr.wikipedia.org/wiki/Cahors_(AOC), https://fr.wikipedia.org/wiki/Banyuls_(AOC), https://fr.wikipedia.org/wiki/Révolte_des_vignerons_du_Languedoc_en_1907, https://www.crus-bourgeois.com/en/classification-2025, https://www.meininger.de/wein/erzeuger/bordeaux-aoc-laesst-neue-traubensorten-zu, https://www.thedrinksbusiness.com/2026/05/bordeaux-unveils-modernisation-drive/
