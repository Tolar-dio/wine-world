# Fine-unit profiles: Barolo and Barbaresco MGAs, Champagne crus, Rhône/Beaujolais/Loire lieux-dits, Chianti Classico UGAs, Chablis climats, Rioja, Priorat, Cava

Outputs: `data/content/depth_piemonte_mga.json` (236), `depth_champagne_crus.json` (324), `depth_lieux_dits.json` (143),
`depth_misc_fine.json` (184). Build: `scripts/depth_fine2_build.py --write` from `work/depth_fine2/parts/`. Process log:
`work/depth-fine2-log.md`. Every profile has an explicit `id` equal to the fine-unit id. An integration dry run on a
scratch copy joined every polygon (prof 1) with no name warnings.

## How should the 236 Barolo and Barbaresco MGAs be described, and what can be stated reliably?

### Takeaway
An MGA is a legally delimited place name, not a quality rank. The tell-tale case is Bussia, nearly 300 ha of every exposure. Elevation bands and approximate sizes can be measured from the digitised official map. Exposures, soils and producers need sources or first-hand knowledge, so the 197 minor MGAs got shorter, commune-level descriptions rather than guessed specifics.

### Cited Findings
- Barolo has 170 MGAs plus 11 village names; Barbaresco has 66. The ids follow the geo agent's reconstruction of the consortium's 2019 official maps. Median georeferencing misfit is 45 m for Barolo and 26 m for Barbaresco (work/depth-boundaries-log.md, internal).
- The Cannubi dispute: the 2010 ministerial act let wines from the whole 34-ha hill use "Barolo Cannubi", alone or hyphenated with Boschis, Muscatel, Valletta or San Lorenzo. The TAR Lazio upheld a group of growers who challenged this. The Consiglio di Stato reversed that ruling on 3 October 2013, which would otherwise have shrunk the name to about 15 ha. ([WineAlign, The Cannubi Affair](https://www.winealign.com/articles/2013/11/20/the-cannubi-affair-posted-by-john-szabo-ms))
- Masnaghetti's 2013 data, summarised by a blog: 2,426.83 ha under vine in the Barolo zone and 1,984.17 ha of Nebbiolo for Barolo. Per-MGA figures sit in image charts only. ([mowse blog, The Barolo zone by numbers](https://mowse.blogspot.com/2017/11/the-barolo-zone-by-numbers.html))
- Terrain from Copernicus DEM GLO-30 over the digitised outlines matches known values for the large MGAs. Bussia comes out at about 280 ha against 298 ha published. Francia is 14 ha at 375 to 445 m, facing west. Asili is 15 ha at 210 to 280 m, facing south-west. (work/depth_fine2/mga_terrain.json, computed)

### Inferences
- About 12 small outlines are digitisation artefacts, such as Cannubi San Lorenzo at 0.5 ha. Their areas are left out of the text. Aspect is suppressed where the digitised polygon contradicts the documented exposure, as at Vignarionda (computed WNW, documented S to SW).
- Producer lists come from the existing it_a site entries plus well-established bottlings. Lesser MGAs get no producer list rather than a guessed one.

### Gaps
- No per-MGA official hectares or vineyard area: the consortium's MGA data pages could not be fetched, and the Regione Piemonte geoportal was unreachable in the boundaries phase.
- Soils are generalised by commune (Tortonian Sant'Agata marls in the west and in Barbaresco; Serravallian Lequio marls and Diano sandstone in the east). Masnaghetti's per-MGA geology was not available.
- Conflicts with it_a sites: "Moccagatta" and "Pertinace" are not Barbaresco MGA names. "Santo Stefano di Perno" is now a vigna inside MGA Perno.

## What do the échelle des crus and sub-region say about each of the 324 Champagne cru villages?

### Takeaway
There are 17 grand crus (100%) and 42 premier crus (90 to 99%). The other 265 villages were rated 80 to 89% in the échelle's final form. The scale set grape prices for most of the twentieth century and was dropped in 2010. Specific premier cru percentages are documented. Village-level percentages for the autres crus are not, so they are not stated.

### Cited Findings
- Premier cru percentages: Mareuil-sur-Aÿ and Tauxières 99%. Bisseuil, Dizy, Trépail, Vaudemange, Vertus, Villeneuve-Renneville, Villers-Marmery, Voipreux and Billy-le-Grand 95%. Chigny-les-Roses, Cormontreuil, Ludes, Montbré, Rilly-la-Montagne, Taissy and Trois-Puits 94%. Avenay, Champillon, Cumières, Hautvillers and Mutigny 93%. Ten Petite Montagne and Reims-area villages plus Pierry 90%. Cuis, Grauves and Bergères-lès-Vertus 95% for white grapes and 90% for black. Coligny and Étréchy 90% for white only. Chouilly's black grapes were 95% and Tours-sur-Marne's white grapes 90%. ([Champagne Club](https://www.champagneclub.com/classification-of-the-villages-terroirs/); [The Finest Bubble](https://thefinestbubble.com/blog/champagne-grand-premier-cru-vineyards/))
- Five villages were promoted to grand cru in 1985: Chouilly, Le Mesnil-sur-Oger, Oger, Oiry and Verzy. The lowest rating was 80%. ([Wikipedia, Classification of Champagne vineyards](https://en.wikipedia.org/wiki/Classification_of_Champagne_vineyards))
- Sub-region and terroir sub-area for every village come from the fr_fine cru-village data (src `champ`), which is how the autres crus get their position and grape-mix paragraphs.

### Inferences
- Autres crus are described from the geology and planting of their sub-area. That means Meunier on clay and marl in the western Marne and the Ardre, Pinot Noir on Kimmeridgian marl in the Côte des Bar, and Chardonnay on chalk in the Sézanne, Vitryat and Montgueux areas. Named growers and history are added only where known.

### Gaps
- Exact échelle percentages for Sermiers, Coulommes-la-Montagne and Vrigny were not found.
- Per-commune grape plantings (CVI data) are not open at commune level. The grape lists are qualitative.
- champagne.fr was not reachable in the earlier phase, and no village data from the Comité Champagne was used.

## Which lieux-dits of the Rhône, Beaujolais and Loire deserve profiles, and what is known about each?

### Takeaway
143 of the 1,803 cadastral lieux-dits got profiles, chosen where a producer bottling, a soil story or a historic name exists. Several famous names (La Mouline, La Turque, Côte Blonde, La Grande Côte, La Coulée de Serrant) are not cadastral lieux-dits in this layer, so they are told inside neighbouring profiles.

### Cited Findings
- Michel et Stéphane Ogier bottled nine Côte-Rôtie lieux-dits separately in 2019: Montlis, Fongeant, Côte-Bodin, Leyat, Bertholon, Le Champon, Cognet, Montmain and La Viallière. ([Les Passionnés du Vin](https://en.lespassionnesduvin.com/domaine-michel-et-stephane-ogier-selection-de-9-lieux-dits-2019.html))
- La Viallière is bottled by René Rostaing, Domaine de Bonserine and Clusel-Roch. ([Rostaing La Viaillère](https://trialto.kork.ca/fr/nos-domaines/domaine-rostaing/cote-rotie-la-viaillere/2016); [Bonserine La Viallière](https://closdesspiritueux.com/29963-cote-rotie-domaine-de-bonserine---cte-rtie-la-viallire-2020.html); [Clusel-Roch La Viaillère](https://www.justerinis.com/fine-wines/france/rhone/clusel-roch/cote-rotie-la-viaillere/2022))
- AOC-delimited hectares and terrain for each lieu-dit come from fr_fine (src `cadastre`, `vine_ha`) and site/data/topo/fr.json. Examples: La Landonne 4.8 ha at about 185 to 270 m with a mean slope near 50% facing SE; Le Méal 16.9 ha facing S; Le Rayas facing NW to N, consistent with Rayas's cool north-facing sands.

### Inferences
- Thin units such as Les Plantiers, La Croix de Jamanot and Patou were dropped rather than padded.

### Gaps
- The producer associations are well established but were not individually re-verified online for every Châteauneuf, Beaujolais and Sancerre estate. Uncertain links were removed during review, for example Chave and Vercandières, Clape and Les Mazards, and Mellot and the Monts Damnés.
- Savennières: no profile, because the two famous sites are separate AOCs and none of the 8 cadastral lieux-dits has a well-documented producer story.

## What is the status and character of the 11 Chianti Classico UGAs and the remaining Chablis climats?

### Takeaway
Producers voted for all 11 UGAs together in June 2021, and the ministry approved them in 2023 (G.U. 1 July 2023). For now they appear only on Gran Selezione labels. 14 Chablis climats had no profile in depth_burgundy_pc.json and now do.

### Cited Findings
- 97% of producers voted for the subdivision in June 2021, and the ministry's approval was announced on 5 July 2023. UGA names can appear from the 2020 vintage. The Gran Selezione blend rises to at least 90% Sangiovese, with only native varieties, from the 2027 vintage. ([Grape Collective](https://grapecollective.com/articles/chianti-classico-uGA-classifications-approved); [Decanter](https://www.decanter.com/wine-news/unita-geografiche-aggiuntive-uga-approved-for-chianti-classico-gran-selezione-507159))
- Every UGA except Montefioralle and Vagliagli has historic significance. Lamole is the highest area, with historic bush vines. ([JancisRobinson.com](https://www.jancisrobinson.com/de/articles/chianti-classico-caves-subzones))
- Giovanni Manetti said the intention is to extend UGAs beyond Gran Selezione, but the project was limited to Gran Selezione at first. ([Falstaff](https://www.falstaff.com/en/nd/chianti-classico-giovanni-manetti-on-the-new-communal-appellations/))
- UGA elevation spans from the DEM: Lamole about 430 to 855 m and Radda 350 to 725 m (site/data/topo/it.json).

### Inferences
- it_b.json says Lamole, Montefioralle and Vagliagli become UGAs "from the 2027 vintage", with "eight in force". This looks like a confusion with the 2027 Gran Selezione blend rule. The new profiles do not repeat it.

### Gaps
- Vineyard hectares per UGA were not found, because chianticlassico.com blocks automated access.

## What should the Rioja zonas and municipios, Priorat villages and Cava zones say?

### Takeaway
Rioja's 140 municipios are profiled from geography, zona, local history and named viñedos singulares, the most concrete data available for each village. Priorat's 12 vi de vila zones and Cava's 4 zonas follow the published regulations.

### Cited Findings
- The BOE orders of 2019 to 2025 list each viñedo singular with its municipio. Examples: 13 in Laguardia, 9 in Elciego, 7 in Alfaro and 6 in Samaniego. ([BOE-A-2019-11186](https://boe.es/boe/dias/2019/07/30/pdfs/BOE-A-2019-11186.pdf); [BOE-A-2020-9446](https://boe.es/boe/dias/2020/08/08/pdfs/BOE-A-2020-9446.pdf); [BOE-A-2023-17245](https://www.boe.es/boe/dias/2023/07/26/pdfs/BOE-A-2023-17245.pdf); [BOE-A-2025-11177](https://boe.es/boe/dias/2025/06/04/pdfs/BOE-A-2025-11177.pdf))
- By September 2026 there were 167 viñedos singulares: 91 in La Rioja, 73 in Álava and 3 in Navarra. ([MAPA press note, 24 Sept 2026](https://www.mapa.gob.es/dam/mapa/contenido/prensa/notas-de-prensa/documentos/documentos-2026/26-09-24-vi-edos-singulares-2026.pdf))
- DOQ Priorat has 12 vi de vila zones. Vi de vila allows at most 5,000 kg/ha for red and requires at least 60% Garnatxa and/or Carinyena. The DOQ covers 2,010 ha and had 109 wineries at the end of 2018. ([DOQ Priorat dossier](https://www.doqpriorat.org/wp-content/uploads/2019/05/DOSSIERPREMSA-ENG.pdf))
- Cava zones and subzones: Comtats de Barcelona (Valls d'Anoia-Foix, Serra de Mar, Conca del Gaià, Serra de Prades, Pla de Ponent), Valle del Ebro (Alto Ebro, Valle del Cierzo), Viñedos de Almendralejo and Levante. They appear on labels from 1 January 2022. Cava covers more than 38,000 ha. ([cava.wine](https://www.cava.wine/en/news-articles/the-boe-certifies-the-strict-new-zoning-and-segmentation-of-the-cava-do/))

### Inferences
- About 44% of viñedos singulares are in Álava (73 of 167), which supports describing Rioja Alavesa as the zone pushing hardest for place-based labelling.

### Gaps
- The names of the approvals after June 2025 (at least 3 in September 2026) are not in the profiles.
- Vineyard hectares per zona and per municipio are not in open data that could be reached.
- Solanes del Molar has no polygon.
