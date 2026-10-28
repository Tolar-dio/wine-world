# Northern Italy wine regions (Piedmont, Valle d'Aosta, Liguria, Lombardy, Trentino-Alto Adige, Veneto, Friuli Venezia Giulia, Emilia-Romagna)

Deliverable: `/home/claude/winesite/data/content/it_a.json` (12 regions, 188 appellations: 43 DOCG + 145 DOC, 308 sites). Built from part files in `work/it_north/p1..p8_*.json` by scripts in `scripts/it_north/` (`merge_validate.py` merges, dedupes, checks text rules, site bounding boxes and coverage against the EU PDO register). Every northern-Italian PDO in the Candiago et al. EU dataset (`raw/eupdo`) is matched by an exact registered name in some appellation's `match` list.

## Piedmont in depth: Barolo, Barbaresco, MGAs, producers and the other DOC(G)s

### Takeaway
Barolo (DOC 1966, DOCG 1980) has 181 MGAs (170 vineyard areas + 11 commune names, 2010); Barbaresco has 66 (65 in 2007 + 1 in 2010). The atlas carries 70 Barolo and 28 Barbaresco MGA sites, each checked to fall inside its correct commune polygon, but all MGA coordinates are approximate (best-knowledge positions on the right hillside, not official centroids). Recent changes: Canelli DOCG (2023, Italy's 78th DOCG), Terre Alfieri DOCG (Oct 2020), Nizza DOCG (2014, independent 2019), Derthona Timorasso's planting freeze (2026).

### Cited Findings
- Barolo 2010 MGA system: 181 delimited, 170 vineyard + 11 village designations; DOC 1966, DOCG 1980; 38 months ageing (18 in wood), Riserva 62; Helvetian sandstone in Serralunga/Monforte vs Tortonian calcareous marl in Barolo/La Morra; Staglieno (Cavour's oenologist at Grinzane 1836 to 1841) credited with the dry style, Oudart account disputed: [Wikipedia: Barolo](https://en.wikipedia.org/wiki/Barolo)
- Barolo disciplinare: 11 communes (Barolo, Castiglione Falletto, Serralunga in full; others in part), vineyards 170 to 540 m, north-facing slopes (-45 to +45 degrees) excluded, Article 8 lists the MGAs but assigns them to communes only in an annex: [Regione Piemonte, Barolo disciplinare](https://www.regione.piemonte.it/web/media/6424/download)
- Barbaresco: DOC 1966, DOCG 1980; 733 ha in 2019 vs 484 early 1990s; 66 MGAs (65 in 2007 + 1 in 2010); Cavazza's Cantina Sociale 1894; Produttori founded by Don Fiorino Marengo: [Wikipedia: Barbaresco](https://en.wikipedia.org/wiki/Barbaresco)
- MGA labelling: one MGA per label, 'Vigna' names only with the MGA; Barolo allows commune mentions, Barbaresco does not; Masnaghetti's maps and BaroloMGA360 (2020): [Wein.plus](https://magazine.wein.plus/cru-in-piedmontese-the-vineyard-designations-of-barolo-and-barbaresco); [Wine & Spirits on BaroloMGA360](https://www.wineandspiritsmagazine.com/?p=28037)
- Cru details (Cannubi 15 ha core in 34 ha cluster, 250 to 320 m; Brunate 25 ha; Rocche dell'Annunziata ~30 ha; Monprivato 6 ha, ~93% Mascarello; Vigna Rionda 10 ha ~330 m; Lazzarito 8 ha; Bussia ~300 ha; Asili 14 ha 200 to 270 m; Rabajà 20 ha): [Decanter: 10 high-flying sites](https://www.decanter.com/premium/barolo-barbaresco-vineyards-10-high-flying-sites-451115)
- Consortium proposals (Jan/Feb 2024): bottling in zone, Barolo/Barbaresco reciprocity, lifting north-slope ban, Barbaresco commune names; still at consultation stage: [Linkiesta, Feb 2024](https://www.linkiesta.it/2024/02/consorzio-langhe-barolo-barbaresco-modifiche-disciplinare/); growers expected the north-slope proposal to fail; consortium = 568 wineries, 66 million bottles: [Il Sole 24 Ore, May 2024](https://en.ilsole24ore.com/art/siccita-vignaioli-prematuro-spostare-confini-barolo-AFGVILQD)
- Canelli DOCG: separated from Asti in 2023, 78th DOCG, 18 communes, ~100 ha, ~500,000 bottles, hand harvest, 165 to 500 m, 9.5 t/ha: [Wine Business International](https://www.wine-business-international.com/wine/news/canelli-gets-its-own-docg); [Italian Wine Central](https://italianwinecentral.com/denomination/canelli-docg/)
- Terre Alfieri DOCG approved Oct 2020, 11 communes listed, Arneis/Nebbiolo min 85%: [Decanter](https://www.decanter.com/wine-news/terre-alfieri-piedmont-new-docg-449610/)
- Derthona Timorasso: ~1.75 million bottles in 2025 (vs ~800,000 in 2024), >500 ha vs ~100 in 2016, wineries 40 to 120, consortium sets new-planting suitability to zero: [QdS, Sept 2026](https://qds.it/derthona-timorasso-175-mln-di-bottiglie-e-domanda-in-crescita/)
- Producer coordinates verified by geocoding (OSM/Nominatim, GeoNames VIN features, Wikidata): Bartolo Mascarello, Giuseppe Rinaldi, Brezza, Conterno Fantino, Elio Grasso, Ettore Germano, Gaja, Castello di Neive, Cigliuti, Ca' del Baio, Fontanafredda, Ceretto, Pio Cesare, Castello di Verduno, Elvio Cogno, Paolo Scavino, Sandrone, Borgogno, Vietti, Cavallotto (Tenuta Bricco Boschis), Marchesi di Barolo, Albino Rocca, Moccagatta, Marchesi di Grésy, Travaglini, Le Piane, Einaudi, Montalbera, Orsolani, La Scolca, Contratto, Carema co-op: [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/); [GeoNames IT dump](https://download.geonames.org/export/dump/IT.zip); [Wikidata](https://www.wikidata.org/)

### Inferences
- MGA sites: positions were placed from cru knowledge (hamlet anchors from GeoNames/Wikidata: Annunziata, Torriglione, Perno, Bussia, Ginestra, Mosconi, Cerretta, Baudana, Parafada, Ornato, Sorano, Panerole, Breri, Asili, Moccagatta, Tre Stelle, Gallina, Albesani, Starderi, Serraboella, Cottà, Bricco di Neive, Pertinace, Meruzzano, Marcarini) and then checked against OSM commune polygons; seven points that fell in the wrong commune were moved. They should be read as "on the right hill", not parcel centroids.
- Hectare figures for many Piedmont DOCs were left blank rather than guessed.

### Gaps
- No official MGA polygons: Regione Piemonte geoportal, ARPA toponym service and the Langhe consortium site were unreachable from the sandbox (connection resets / robots), and Overpass (OSM) timed out. A future pass with the official MGA shapefiles would allow `precise` coordinates.
- Could not confirm whether the 2024 north-slope and bottling-in-zone proposals were formally adopted or rejected by October 2026 (search budget exhausted); the text says the ban "still stands as of the latest reports".
- Roero MGA count and exact Barolo hectares for 2025 not verified.

## Valle d'Aosta and Liguria

### Takeaway
Valle d'Aosta has one DOC (1985) with seven subzones; Liguria eight DOCs, no DOCG. Coordinates for Morgex, Arvier, Donnas, Aymavilles (Les Crêtes), Quart (Grosjean), Aosta (Institut Agricole), Groppo (Cantina Cinque Terre), Dolceacqua and Castelnuovo Magra were verified via GeoNames/Nominatim.

### Cited Findings
- Registered names: "Valle d'Aosta / Vallée d'Aoste", "Cinque Terre / Cinque Terre Sciacchetrà", "Rossese di Dolceacqua / Dolceacqua", "Portofino / Golfo del Tigullio - Portofino", "Pornassio / Ormeasco di Pornassio", "Val Polcèvera", "Colline di Levanto", "Colli di Luni", "Riviera ligure di Ponente": [Candiago et al. 2022 EU PDO dataset](https://doi.org/10.6084/m9.figshare.c.5877659)
- Donnas terraces "Costa dei vigneti" coordinate: [Wikidata Q56451618](https://www.wikidata.org/wiki/Q56451618)

### Inferences
- Narrative facts (Prié Blanc ungrafted vines, Enfer d'Arvier, Sciacchetrà, Rossese–Tibouren link, Luni) are from expertise and standard references; not re-verified online this session.

### Gaps
- Current hectare totals for Valle d'Aosta and Liguria not re-checked against 2025 data.

## Lombardy

### Takeaway
Five DOCGs (Franciacorta, Oltrepò Pavese metodo classico, Moscato di Scanzo, Sforzato, Valtellina Superiore). Franciacorta: 3,634 ha, 19 communes, 19.1 million bottles shipped in 2024.

### Cited Findings
- Franciacorta: DOC 1967, DOCG 1995, Ziliani's 3,000 bottles for Berlucchi in 1961, Satèn rules, 19 communes: [Wikipedia: Franciacorta (wine)](https://en.wikipedia.org/wiki/Franciacorta_(wine))
- Franciacorta 2025 stats: 3,634 ha, >120 wineries, 19.1 million bottles 2024 (12% export), Erbamat admitted, 1992 University of Milan zoning (six soil types), Curtes Francae 1270, Napoleonic cadastre 1809: [Linkiesta, May 2025](https://www.linkiesta.it/2025/05/il-consorzio-franciacorta-compie-35-anni-di-cambiamenti/)
- Planting stop until 2028 (headline only, article not retrieved): [Gambero Rosso](https://www.gamberorosso.it/notizie/vino/franciacorta-docg-stop-nuovi-vigneti-fino-2028/)
- Valtellina Superiore DOC 1968, DOCG 1998, ~850 ha (vs ~6,000 mid-19th c.), ~2,500 km of dry-stone walls, 24 months/12 in wood: [Wine with Seth](https://www.winewithseth.com/winewiki/lombardy-valtellina-superiore-docg/)
- Coordinates: Berlucchi, Ca' del Bosco, Bellavista, Cavalleri, Monte Rossa, Frecciarossa, Ca' dei Frati, Conte Vistarino, Monsupello, Sassella sanctuary, Castel Grumello, Scanzo vineyards: [Nominatim](https://nominatim.openstreetmap.org/); [GeoNames](https://download.geonames.org/export/dump/IT.zip)

### Gaps
- Arpepe and Nino Negri coordinates are approximate (geocoding failed).

## Trentino-Alto Adige

### Takeaway
Alto Adige DOC (1975) has 86 UGAs approved in October 2024; 45 used in 2024 and 52 in 2025 (403 ha, 6.7% of DOC production), first UGA Riservas due late 2026. Official UGA and subzone polygons were downloaded from the Province of Bolzano WFS, so the 23 UGA sites carry precise representative-point coordinates.

### Cited Findings
- 86 UGAs, yields 25% below DOC, up to five varieties per UGA, Theresian Cadastre used, examples Gries, Mazon, Eppan Berg, Brenntal: [DoctorWine, Oct 2024](https://www.doctorwine.wine/pot-pourri-en/86-ugas-recognized-for-alto-adige-wines/?lang=en)
- UGA uptake 2024/2025 (45/52 UGAs, 396/403 ha, 42/60 producers, 6.2%/6.7%), first Riservas late autumn 2026: [Bevnet / Alto Adige Wines, Apr 2026](https://bevnet.com/pr/2026/04/23/alto-adige-wines-shares-latest-developments-on-uga-classification)
- Official polygons: layers AdditionalGeographicalLocations (90 features) and DOCAndIGTZones (25): [Provincia di Bolzano WFS](https://geoservices6.civis.bz.it/geoserver/p_bz-Agriculture/ows?service=WFS&version=2.0.0&request=GetCapabilities) (saved to `raw/bz_uga/`)
- Alto Adige DOC 50th anniversary at Vinitaly 2025: [Wine Industry Advisor](https://wineindustryadvisor.com/2025/04/16/alto-adige-doc-marks-50-years-of-excellence-at-vinitaly/)

### Inferences
- The UGA WFS layer may include sub-units or historical names (90 features vs 86 legal UGAs); site names used are the clearly established ones.

### Gaps
- Alto Adige hectares (~5,800) and Trentino hectares (~10,000) are from expertise, not re-verified.

## Veneto

### Takeaway
Valpolicella 2025: 8,614 ha, 57.5 million bottles (Ripasso 27.37m, Valpolicella 16.50m, Amarone+Recioto 13.58m). Prosecco DOC 2025: 667 million bottles (60.4m rosé); vineyard potential ~24,450 ha being raised by 6,050 ha to 30,500. Soave: 33 UGAs (2019 vintage) covering ~2,660 ha (38% of ~7,000 ha). Conegliano Valdobbiadene: 15 communes, 43 Rive, Cartizze 107 ha.

### Cited Findings
- Valpolicella figures, 19 communes, variety shares (Corvina 56%, Rondinella 19%, Corvinone 19%, Molinara 2%), 327,545 q to appassimento, UNESCO intangible heritage candidacy for grape-resting: [QdS, July 2026](https://qds.it/consorzio-valpolicella-nel-2025-sul-mercato-575-mln-bottiglie-3/)
- Amarone DOCG approved 4 Dec 2009 (in force 2010), DOC 1990, 14% minimum, Lucchese 1936 name story, not marketed before 1953: [Wikipedia: Amarone](https://en.wikipedia.org/wiki/Amarone)
- 33 Soave UGA names, 28 in Classico, west Broia/Paradiso/Monte di Colognola, east Duello/Roncà-Monte Calvarina, ~2,660 ha: [The Drinks Business, Sept 2020](https://www.thedrinksbusiness.com/2020/09/soave-approves-33-new-crus/); [Wine, Wit and Wisdom](https://winewitandwisdomswe.com/2020/03/17/dispatch-from-soave-and-33-new-crus/)
- Prosecco 2025: 667m bottles: [Wine Industry Advisor, Jan 2026](https://wineindustryadvisor.com/2026/01/19/prosecco-doc-keeps-growing-in-the-united-states-as-production-reaches-667-million-bottles-in-2025/); expansion to 30,500 ha in phases: [Il NordEst, Dec 2025](https://www.ilnordest.it/economia/imprese/prosecco-doc-ampliamento-ettari-veneto-fvg-2025-chcrh1zl)
- 43 Rive, Cartizze 107 ha in San Pietro di Barbozza, Santo Stefano, Saccol, 15 communes, Sui Lieviti: [Consorzio Conegliano Valdobbiadene](https://www.prosecco.it/en/conegliano-valdobbiadene-prosecco-superiore-docg/types-of-wine/)
- Coordinates verified: Allegrini, Bertani (Grezzana), Bussola, Pieropan, Villa della Torre, Bisol, Villa Sandi, Maculan, Vignalta, Castello di Soave, Castelcerino, Fittà, Duello, Monte Calvarina: [Nominatim](https://nominatim.openstreetmap.org/); [GeoNames](https://download.geonames.org/export/dump/IT.zip)

### Gaps
- Most Soave UGA points are approximate; Quintarelli, Dal Forno, Masi and Nino Franco coordinates approximate.
- Bardolino subzone date and Colli di Conegliano DOCG year given from memory.

## Friuli Venezia Giulia

### Takeaway
All 12 FVG PDOs in the EU register are covered, including the 2016 regional Friuli DOC. Oslavia producer coordinates (Gravner, Radikon, La Castellada, Il Carpino) and Collio/Colli Orientali/Carso estates were verified by geocoding.

### Cited Findings
- Registered names incl. "Collio Goriziano / Collio", "Carso / Carso - Kras", "Friuli Isonzo / Isonzo del Friuli", "Friuli / Friuli Venezia Giulia / Furlanija / Furlanija Julijska krajina" (2020 registration): [Candiago et al. 2022 EU PDO dataset](https://doi.org/10.6084/m9.figshare.c.5877659)
- Coordinates: Gravner, Radikon, La Castellada, Il Carpino, Schiopetto, Russiz Superiore, Villa Russiz, Castello di Spessa, Edi Keber, Jermann, Venica, Livio Felluga, Abbazia di Rosazzo, Rocca Bernarda, Ronchi di Cialla, Le Due Terre, Zidarich, Skerk, Vie di Romans, Basilica di Aquileia: [Nominatim](https://nominatim.openstreetmap.org/)

### Gaps
- Hectare figures for Friuli DOCs left blank; orange-wine history (Gravner 1997 maceration, 2001 qvevri) from expertise.

## Emilia-Romagna

### Takeaway
Two DOCGs (Romagna Albana, first white DOCG 1987; Colli Bolognesi Classico Pignoletto) and the Romagna DOC whose Sangiovese has 12 sottozone: Serra, Brisighella, Marzeno, Oriolo, Modigliana, Castrocaro, Predappio, Bertinoro, Cesena, San Vicino, Longiano, Meldola.

### Cited Findings
- 12 subzones with altitude/soil notes for Modigliana (180 to 570 m, marly sandstone), Predappio (120 to 400 m, calcareous Pliocene clays), Bertinoro (100 to 350 m, spungone) and producers: [WineAlign, Oct 2020](https://www.winealign.com/articles/2020/10/16/the-confidence-of-romagna-albana-and-sangiovese)
- Romagna Sangiovese rules (min 95%, 9 t/ha, Riserva 8 t/ha): [Enoteca Regionale Emilia Romagna](https://enotecaemiliaromagna.it/en/wines-and-wineries/dop-wines/romagna-dop/romagna-dop-sangiovese-con-una-delle-seguenti-menzioni-geografiche-aggiuntive-sottozone/)
- Coordinates: Cleto Chiarli (Castelvetro), Cantina di Sorbara, Fattoria Zerbina, Podere La Berta, Fattoria Paradiso, La Stoppa, Castello di Vigoleno, Rocca di Bertinoro: [Nominatim](https://nominatim.openstreetmap.org/)

### Gaps
- Subzone sites are placed at their namesake town or valley (approx). The broader Pignoletto DOC (2014) is included from expertise; it postdates the EU dataset's naming used for matching.

## Method notes and source list
- EU PDO dataset (local `raw/eupdo`), commune-to-region assignment via Natural Earth admin-1; each northern PDO was matched by exact registered name.
- Web search budget for the run was exhausted mid-session; after that, only already-surfaced URLs were fetched. Remaining text relies on expert knowledge, with uncertain numbers removed or softened.
- Unreachable from sandbox: geoportale.piemonte.it, dati.piemonte.it, ARPA Piemonte webgis, langhevini.it, consorziobarolobarbaresco.it, Overpass API, Wikipedia/Commons API (rate-limited).
