import sys
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import A, R, S, save

SRC = [
    ("EU eAmbrosia register (Lombardy PDOs)", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, EU wine PDO geospatial inventory", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("Wikipedia: Franciacorta (wine)", "https://en.wikipedia.org/wiki/Franciacorta_(wine)"),
    ("Linkiesta: Il Consorzio Franciacorta compie 35 anni (May 2025)", "https://www.linkiesta.it/2025/05/il-consorzio-franciacorta-compie-35-anni-di-cambiamenti/"),
    ("Wine with Seth: Valtellina Superiore DOCG", "https://www.winewithseth.com/winewiki/lombardy-valtellina-superiore-docg/"),
]

regions = [
R("Lombardy", ["Lombardia"], None, 45.55, 9.9, 7.8,
  "Italy's richest region hides its wine in plain sight: Champagne-method fizz by a glacial lake, Alpine Nebbiolo on 2,500 km of terraces, and Pinot Noir in the Apennine hills.",
  "Lombardy is Italy's economic engine, with Milan at its centre, and its wine is scattered across four very different landscapes. Franciacorta, on the morainic hills south of Lake Iseo near Brescia, makes Italy's most prestigious metodo classico sparkling wine. Valtellina, an east-west Alpine valley near the Swiss border, grows Nebbiolo (locally Chiavennasca) on vertiginous stone terraces and makes Sforzato from dried grapes. The Oltrepò Pavese, the hilly triangle south of the Po in Pavia province, is Italy's largest source of Pinot Noir and a historic supplier of sparkling base wine to Piedmont's houses, along with Bonarda and Barbera. Around Lake Garda, Lugana's Turbiana whites and the Valtènesi's Groppello and Chiaretto rosé complete the picture, with small zones around Bergamo (Valcalepio, Moscato di Scanzo), Brescia (Botticino, Cellatica, Capriano del Colle) and Milan (San Colombano).",
  "Wine has been made in Valtellina since at least Roman times, and the terraces largely date from the medieval period, when monks and later the Swiss Grisons (who ruled Valtellina from 1512 to 1797) shipped its wines north over the Alps; Leonardo da Vinci noted in the Codex Atlanticus that the valley made 'very potent wines'. Franciacorta's name appears in 1277 as *Franzacurta*, from the *curtes francae* (tax-exempt monastic lands). The modern Franciacorta story begins in 1961, when Franco Ziliani persuaded Guido Berlucchi to let him make 3,000 bottles of Pinot di Franciacorta by the Champagne method; within decades Bellavista, Ca' del Bosco and others had built Italy's answer to Champagne. The Oltrepò, meanwhile, supplied Milan's taverns and much of Italy's sparkling base wine for over a century.",
  "Franciacorta's soils are glacial moraine left by the Iseo glacier, tempered by the lake. Valtellina is an east-west trench whose north flank faces due south, with granite, gneiss and schist soils, sandy and acidic, on terraces between 300 and 800 m; the Orobie Alps to the south block cold winds and the Breva lake wind from Como brings warmth. Oltrepò is limestone, marl and clay on Apennine foothills. Lugana sits on heavy white-grey clays south of Lake Garda.",
  "Chardonnay, Pinot Noir and Pinot Blanc (Franciacorta, Oltrepò), Erbamat (Franciacorta's rediscovered native), Nebbiolo/Chiavennasca (Valtellina), Croatina (sold as Bonarda), Barbera, Uva Rara, Turbiana (Lugana; related to Verdicchio), Groppello, Marzemino, Moscato di Scanzo.",
  "Metodo classico sparkling, mountain Nebbiolo, dried-grape Sforzato, Bonarda frizzante, lake whites and Chiaretto rosé.",
  "Five DOCGs (Franciacorta, Oltrepò Pavese metodo classico, Scanzo/Moscato di Scanzo, Sforzato di Valtellina, Valtellina Superiore) and about 21 DOCs, plus IGTs such as Provincia di Pavia and Sebino.",
  ["Franciacorta", "Curtefranca", "Valtellina Superiore", "Sforzato di Valtellina", "Rosso di Valtellina", "Oltrepò Pavese metodo classico", "Oltrepò Pavese", "Pinot nero dell'Oltrepò Pavese", "Bonarda dell'Oltrepò Pavese", "Buttafuoco dell'Oltrepò Pavese", "Sangue di Giuda", "Casteggio", "Lugana", "San Martino della Battaglia", "Riviera del Garda Classico", "Valtènesi", "Garda Colli Mantovani", "Lambrusco Mantovano", "Botticino", "Cellatica", "Capriano del Colle", "Valcalepio", "Moscato di Scanzo", "Terre del Colleoni", "San Colombano al Lambro"],
  SRC),
]

L = "Lombardy"
apps = []
apps.append(A("Franciacorta", "DOCG", L, "Franciacorta", "DOC 1967, DOCG 1995", 3634, ["sparkling"], "Chardonnay, Pinot Nero, Pinot Bianco (max 50%), Erbamat (max 10%)",
 "Franciacorta is Italy's most prestigious traditional-method sparkling wine and the first Italian sparkling DOCG to require bottle fermentation. The zone covers 19 communes on the hills south of Lake Iseo, west of Brescia, with 3,634 hectares of vineyard in 2025 and about 19 million bottles shipped in 2024, overwhelmingly to Italian customers (only about 12% is exported).\n\nThe modern story begins in 1961, when the young winemaker Franco Ziliani convinced Guido Berlucchi, a local nobleman who made a dull still white, to let him try a Champagne-method sparkler: 3,000 bottles of 'Pinot di Franciacorta' went on sale and sold out. Franciacorta became a DOC in 1967, Maurizio Zanella founded Ca' del Bosco in the 1970s, Vittorio Moretti founded Bellavista, and in 1995 Franciacorta became a DOCG. Since 2003 the name 'Franciacorta' alone on the label (no 'metodo classico', no 'spumante') is the denomination, a deliberate imitation of Champagne.\n\nRules are stricter than Champagne's in places: non-vintage wines age at least 18 months on the lees (25 months from harvest), Satèn (a blanc de blancs of Chardonnay and Pinot Bianco at lower pressure, under 5 atmospheres) 24 months, Millesimato 30 months and Riserva 60 months. Rosé must include at least 35% Pinot Nero. Erbamat, an ancient late-ripening local white recorded since the 16th century, was admitted in 2017 to bring acidity as summers warm. The consortium has since halted new vineyard plantings until 2028 to protect prices.",
 "The hills are an amphitheatre of glacial moraine, left by the glacier that carved Lake Iseo, with six soil types identified in a 1992 University of Milan zoning: deep fluvio-glacial gravels, fine colluvial soils, and calcareous rock on Monte Orfano. The lake moderates temperatures and the Alps to the north block cold air, so the grapes ripen fully but keep acidity; warming summers are pushing harvests into early August.",
 ["Ca' del Bosco", "Bellavista", "Guido Berlucchi", "Cavalleri", "Monte Rossa", "Uberti", "Mosnel", "Barone Pizzini", "Arcari + Danesi", "Enrico Gatti", "Il Pendio", "Camossi", "Ferghettina"],
 "Franciacorta was the first wine region in Italy whose consortium made the denomination name alone mandatory, banning the word 'spumante' from the label to put itself on a par with Champagne.",
 official="Franciacorta"))
apps.append(A("Curtefranca", "DOC", L, "Franciacorta", "2008 (formerly Terre di Franciacorta DOC 1995)", None, ["white", "red"], "Chardonnay and Pinot Bianco (white); Cabernet Franc, Carmenère, Cabernet Sauvignon, Merlot (red)",
 "The still-wine DOC of the Franciacorta zone, renamed from Terre di Franciacorta in 2008 to avoid confusion with the sparkling DOCG. Bordeaux-style reds and Chardonnay whites; Ca' del Bosco's Maurizio Zanella red started here.",
 "Moraine hills south of Lake Iseo.", ["Ca' del Bosco", "Bellavista", "Uberti"],
 "Franciacorta's Cabernet Franc plantings include old vines later identified as Carmenère, as happened in north-east Italy.", official="Curtefranca"))

apps.append(A("Valtellina Superiore", "DOCG", L, "Valtellina", "DOC 1968, DOCG 1998", None, ["red"], "Nebbiolo (Chiavennasca) min 90%",
 "Valtellina is Nebbiolo's mountain home, an Alpine valley along the Adda river just south of Switzerland where vines grow on about 2,500 km of dry-stone terraces stacked up the south-facing slope of the Rhaetian Alps, between 300 and 800 metres. Valtellina Superiore ages at least 24 months (12 in wood) and 36 for Riserva, and is lighter, more transparent and more mineral than Barolo, with rose, red currant, herbs and a slatey bite.\n\nFive historic subzones run west to east along the valley and may appear on the label: Maroggia (the smallest, near Berbenno), Sassella (west of Sondrio around the Santuario della Madonna della Sassella, warm and rocky, often called the finest), Grumello (named after the ruined Castel Grumello above Montagna), Inferno (a small, steep, hot 'inferno' of rock east of Sondrio around Poggiridenti) and Valgella (the largest, around Teglio and Chiuro). Wine bottled in Switzerland may carry the name 'Stagafassli', a legacy of the centuries when Valtellina belonged to the Grisons.\n\nTotal vineyard area in the valley is about 850 hectares today, versus roughly 6,000 in the mid-19th century. Producers such as Arpepe, Nino Negri, Sandro Fay, Mamete Prevostini, Aldo Rainoldi, Dirupi and Barbacàn have made it one of the most exciting Nebbiolo zones in Italy.",
 "Granite, gneiss and schist weathered into thin sandy soils (often carried up the terraces by hand), with high acidity and excellent drainage. The south-facing slope and the reflected heat from the stone walls let Nebbiolo ripen at latitude 46 N; the Breva wind from Lake Como warms afternoons.",
 ["Arpepe", "Nino Negri", "Sandro Fay", "Mamete Prevostini", "Aldo Rainoldi", "Dirupi", "Barbacàn", "Conti Sertoli Salis", "Triacca"],
 "Working these terraces takes around 1,200 to 1,500 hours per hectare per year, and some grapes are still lowered by cable or helicopter.",
 official="Valtellina Superiore", match=["Sassella", "Grumello", "Inferno", "Valgella", "Maroggia", "Stagafassli"],
 contains=["Sassella", "Grumello", "Inferno", "Valgella", "Maroggia"]))
apps.append(A("Sforzato di Valtellina", "DOCG", L, "Valtellina", "DOCG 2003", None, ["red"], "Nebbiolo (Chiavennasca) min 90%",
 "Sforzato (in dialect Sfursat, 'forced') is Valtellina's answer to Amarone: Nebbiolo grapes picked in October and dried in airy lofts (*fruttai*) until at least December or January, losing around 30 to 40% of their weight, then fermented dry. The result is a powerful red of 14 to 16% alcohol with dried cherry, fig, tar and spice, but still with Nebbiolo's acidity and tannin. It ages at least 20 months (12 in wood). Nino Negri's 5 Stelle Sfursat, first made by Casimiro Maule in the 1980s, made the category famous.",
 "Grapes come from the best terraces of the Valtellina Superiore subzones; the drying lofts use the cold, dry Alpine air.",
 ["Nino Negri", "Mamete Prevostini", "Aldo Rainoldi", "Triacca", "Sandro Fay", "Arpepe"],
 "Sforzato was the first dried-grape dry red to win DOCG status in Italy (2003), six years ahead of Amarone (2009).",
 official="Sforzato di Valtellina / Sfursat di Valtellina", match=["Sfursat di Valtellina", "Sfursat"]))
apps.append(A("Rosso di Valtellina", "DOC", L, "Valtellina", "1968 (as Valtellina; renamed 2011)", None, ["red"], "Nebbiolo (Chiavennasca) min 90%",
 "The entry-level Valtellina Nebbiolo, with six months' minimum ageing; bright, light and alpine.",
 "Terraced granite and schist slopes.", ["Arpepe", "Nino Negri", "Dirupi"], "Arpepe's Rosso di Valtellina is a cult value pick.",
 official="Valtellina rosso / Rosso di Valtellina", match=["Valtellina Rosso"]))

apps.append(A("Oltrepò Pavese metodo classico", "DOCG", L, "Oltrepò Pavese", "DOCG 2007", None, ["sparkling"], "Pinot Nero (min 70%), Chardonnay, Pinot Bianco, Pinot Grigio",
 "Oltrepò Pavese has more Pinot Noir than anywhere else in Italy, about 3,000 hectares, and for a century it supplied base wine to the sparkling houses of Piedmont and beyond. Its own metodo classico DOCG requires at least 70% Pinot Nero and 15 months on the lees (24 for vintage), and the 'Cruasé' brand denotes Pinot Nero rosé. The zone around Santa Maria della Versa, Montalto and Rocca de' Giorgi grows its best sparkling grapes. Conte Vistarino, Monsupello, Ballabio, Calatroni and Mazzolino lead.",
 "Clay, limestone and marl hills of the northern Apennines, 150 to 500 m, cooler in the upper valleys (Versa, Scuropasso).",
 ["Conte Vistarino", "Monsupello", "Ballabio", "Calatroni", "Tenuta Mazzolino", "Giorgi"],
 "The Giorgi di Vistarino counts planted Pinot Noir cuttings from France at Rocca de' Giorgi in the 1850s and supplied grapes for some of the first Italian sparkling wines made with Carlo Gancia.",
 official="Oltrepò Pavese metodo classico", match=["Cruasé"]))
apps.append(A("Oltrepò Pavese", "DOC", L, "Oltrepò Pavese", "1970", 13500, ["red", "white", "rose", "sparkling", "sweet"], "Barbera, Croatina, Uva Rara, Pinot Nero, Riesling, Moscato and others",
 "The 'beyond the Po' hills of Pavia province, Lombardy's largest wine zone with about 13,500 hectares, form a triangle wedged between Piedmont and Emilia. The umbrella DOC covers Rosso, Barbera, Riesling (Italian Riesling and Rhine Riesling), Moscato and more. Historically this was Milan's wine cellar, much of it sold in bulk or as sparkling base.",
 "Apennine foothills of marl, clay and limestone.", ["Le Fracce", "Frecciarossa", "Monsupello", "Bruno Verdi", "Castello di Cigognola"],
 "For decades Oltrepò Pinot Noir went anonymously into the sparkling wines of big Piedmontese houses, which is why the zone's own name is still little known abroad.",
 official="Oltrepò Pavese"))
apps.append(A("Pinot nero dell'Oltrepò Pavese", "DOC", L, "Oltrepò Pavese", "2010", None, ["red", "white", "rose"], "Pinot Nero (min 95%)",
 "Still Pinot Noir from the Oltrepò, red or vinified as white or rosé. Tenuta Mazzolino's Noir and Conte Vistarino's Pernice single vineyard show its Burgundian ambitions.",
 "Cool upper valleys of the Oltrepò.", ["Tenuta Mazzolino", "Conte Vistarino", "Frecciarossa", "Calatroni"], "Frecciarossa's Giorgio Odero bottled Pinot Nero in the 1930s.",
 official="Pinot nero dell'Oltrepò Pavese"))
apps.append(A("Oltrepò Pavese Pinot grigio", "DOC", L, "Oltrepò Pavese", "2010", None, ["white", "sparkling"], "Pinot Grigio (min 85%)",
 "A separate DOC for Pinot Grigio in the Oltrepò hills.", "", [], "", official="Oltrepò Pavese Pinot grigio"))
apps.append(A("Bonarda dell'Oltrepò Pavese", "DOC", L, "Oltrepò Pavese", "2010", None, ["red", "sparkling"], "Croatina (min 85%)",
 "The Oltrepò's signature everyday red, usually lightly sparkling (frizzante), purple-black, juicy and gently tannic: made from Croatina, which locals call Bonarda (not to be confused with Piedmont's Bonarda grape). It is the classic match for salame di Varzi and Lombard cooking.",
 "Clay-limestone hills.", ["Bruno Verdi", "Castello di Luzzano", "Vercesi del Castellazzo"], "Croatina's local name Bonarda leads to endless confusion with the Bonarda Piemontese grape and Argentina's Bonarda (Douce Noir).",
 official="Bonarda dell'Oltrepò Pavese", match=["Bonarda"]))
apps.append(A("Buttafuoco dell'Oltrepò Pavese", "DOC", L, "Oltrepò Pavese", "2010", None, ["red", "sparkling"], "Barbera, Croatina, Uva Rara, Ughetta di Canneto",
 "'Spark of fire': a powerful red blend from seven communes around Canneto Pavese and Broni. The Buttafuoco Storico association bottles single-vineyard versions with long ageing.",
 "Steep hills between the Versa and Scuropasso streams.", ["Fiamberti", "Bruno Verdi"], "The name is said to come from Austrian sailors on the Po who were 'set on fire' by the wine.",
 official="Buttafuoco dell'Oltrepò Pavese / Buttafuoco", match=["Buttafuoco"]))
apps.append(A("Sangue di Giuda", "DOC", L, "Oltrepò Pavese", "2010", None, ["red", "sweet", "sparkling"], "Barbera, Croatina, Uva Rara",
 "'Blood of Judas': a sweet, lightly sparkling red from the same area as Buttafuoco, low in alcohol and drunk with desserts.",
 "Hills around Broni and Canneto.", ["Fiamberti", "Bruno Verdi"], "Legend says Judas, resurrected in the Oltrepò, cured the vines of disease and the wine was named for him.",
 official="Sangue di Giuda / Sangue di Giuda dell'Oltrepò Pavese", match=["Sangue di Giuda dell'Oltrepò Pavese"]))
apps.append(A("Casteggio", "DOC", L, "Oltrepò Pavese", "2010", None, ["red"], "Barbera (min 85%)",
 "A small DOC for structured Barbera from the hills around Casteggio, the Roman Clastidium.", "", ["Frecciarossa"], "Clastidium was the site of a famous Roman victory over the Gauls in 222 BC.", official="Casteggio"))

apps.append(A("Lugana", "DOC", L, "Lake Garda", "1967", None, ["white", "sparkling"], "Turbiana (min 90%)",
 "Lugana is the white wine of the southern shore of Lake Garda, straddling Lombardy (Sirmione, Desenzano, Pozzolengo, Lonato) and Veneto (Peschiera). It is made from Turbiana, a local grape related to Verdicchio (and once called Trebbiano di Lugana), and grown on heavy, chalky white-grey clays left by the Garda glacier. The wines have citrus, almond and saline depth and age surprisingly well; Superiore, Riserva, Vendemmia Tardiva and Spumante versions exist. Lugana has been one of Italy's commercial success stories of the 2010s and 2020s, with plantings expanding fast.",
 "Compact white and grey calcareous clays (marl-clay) from the morainic amphitheatre south of the lake; the lake moderates frosts and summer heat.",
 ["Ca' dei Frati", "Ottella", "Zenato", "Selva Capuzza", "Le Morette", "Citari", "Pasini San Giovanni"],
 "Ca' dei Frati's Brolettino and I Frati, and Ottella's Molceo, showed in the 1980s and 1990s that Lugana could age ten years.",
 official="Lugana"))
apps.append(A("San Martino della Battaglia", "DOC", L, "Lake Garda", "1970", None, ["white", "sweet"], "Friulano (Tuchì) min 80%",
 "A tiny DOC south of Lake Garda for Friulano, here called Tuchì, dry or as a liqueur wine. It overlaps Lugana's zone around the Risorgimento battlefield of San Martino (1859).",
 "Morainic clays.", [], "The battle of Solferino and San Martino in 1859 inspired Henry Dunant to found the Red Cross.", official="San Martino della Battaglia"))
apps.append(A("Riviera del Garda Classico", "DOC", L, "Lake Garda", "1977 (Garda Bresciano), renamed 2017", None, ["red", "rose", "white"], "Groppello, Marzemino, Sangiovese, Barbera",
 "The DOC of the western shore of Lake Garda in Brescia province (formerly Garda Bresciano), for Groppello reds and Chiaretto.",
 "Moraine and limestone on the lake's western shore.", ["Pasini San Giovanni", "Costaripa"], "The DOC was formerly Riviera del Garda Bresciano / Garda Bresciano.",
 official="Riviera del Garda Bresciano / Garda Bresciano", match=["Riviera del Garda Classico", "Garda Bresciano"]))
apps.append(A("Valtènesi", "DOC", L, "Lake Garda", "2011", None, ["rose", "red"], "Groppello (min 50%), Marzemino, Barbera, Sangiovese",
 "The hills between Desenzano and Salò on Garda's western shore, the home of Groppello and of Valtènesi Chiaretto, a pale, delicate rosé that Pompeo Molmenti, a Venetian senator, made famous from his estate at Moniga in 1896. It has become one of Italy's most fashionable rosés.",
 "Morainic hills with lake breezes.", ["Costaripa", "Pasini San Giovanni", "Cantine Selva Capuzza"], "Molmenti's 1896 Chiaretto is often cited as the first modern Italian rosé, made by short skin contact in the manner of the Bordeaux clairet.",
 official="Valtènesi", match=["Valtenesi", "Valtènesi Chiaretto"]))
apps.append(A("Garda Colli Mantovani", "DOC", L, "Lake Garda", "1976", None, ["white", "red", "rose"], "Garganega, Trebbiano, Chardonnay, Merlot, Cabernet, Rondinella",
 "Morainic hills south of Lake Garda in Mantua province, making light whites, reds and Chiaretto.", "Moraine.", [], "", official="Garda Colli Mantovani"))
apps.append(A("Lambrusco Mantovano", "DOC", L, "Mantova", "1987", None, ["red", "rose", "sparkling"], "Lambrusco Viadanese, Maestri, Marani, Salamino, Ruberti",
 "Lombardy's own Lambrusco from the flat lands of Mantua province south of the Po, lightly sparkling and dry or off-dry, with subzones Viadanese-Sabbionetano and Oltre Po Mantovano.",
 "Alluvial plain of the Po.", ["Cantina di Quistello"], "Lambrusco Viadanese is a local Lambrusco variety found almost only here.",
 official="Lambrusco Mantovano"))
apps.append(A("Botticino", "DOC", L, "Brescia", "1968", 50, ["red"], "Barbera, Marzemino, Sangiovese, Schiava gentile",
 "A small red DOC on the hills east of Brescia, in the village famous for its marble (Botticino marble was used for Rome's Vittoriano monument). The blend of Barbera, Marzemino, Sangiovese and Schiava gives fresh, medium reds.",
 "Limestone slopes beside the marble quarries.", ["Noventa"], "The Vittoriano 'wedding cake' in Rome is built of Botticino marble from the same hills.", official="Botticino"))
apps.append(A("Cellatica", "DOC", L, "Brescia", "1968", 20, ["red"], "Marzemino, Barbera, Schiava gentile, Incrocio Terzi",
 "Tiny red DOC in the hills north-west of Brescia, one of Lombardy's oldest delimited wines.", "Hills above Brescia.", [], "Incrocio Terzi No. 1, a Barbera x Cabernet Franc cross, was bred in Brescia province.", official="Cellatica"))
apps.append(A("Capriano del Colle", "DOC", L, "Brescia", "1980", 20, ["red", "white"], "Sangiovese, Marzemino, Barbera; Trebbiano (Trebbiano di Lugana)",
 "Small DOC on Monte Netto, an isolated hill south-west of Brescia.", "An isolated loess and gravel hill rising from the plain.", [], "", official="Capriano del Colle"))
apps.append(A("Valcalepio", "DOC", L, "Bergamo", "1976", 200, ["red", "white", "sweet"], "Merlot and Cabernet Sauvignon (red); Pinot Bianco, Chardonnay, Pinot Grigio (white); Moscato di Scanzo (passito)",
 "Bergamo's main DOC, on the foothills between Lake Iseo and Bergamo, making Bordeaux-blend reds aged at least two years and a Moscato Passito.",
 "Calcareous marls of the Bergamo pre-Alps.", ["Il Calepino", "Medolago Albani"], "", official="Valcalepio"))
apps.append(A("Moscato di Scanzo", "DOCG", L, "Bergamo", "DOC 2002, DOCG 2009", 31, ["sweet", "red"], "Moscato di Scanzo (100%)",
 "Italy's smallest DOCG, about 31 hectares in the single commune of Scanzorosciate near Bergamo. Moscato di Scanzo is a red Muscat whose grapes are dried for at least 21 days, giving an aromatic sweet red with rose, sage, cherry jam and spice, aged at least two years. Local tradition holds that it was shipped to London and the Russian court in the 18th and 19th centuries and fetched prices to rival the finest wines.",
 "Sass del Luna, a local friable marly limestone, on south-facing hills at 250 to 500 m.", ["La Brugherata", "Biava", "Il Cipresso", "De Toma"],
 "Moscato di Scanzo is a distinct red Muscat variety found only here; it is not Moscato Rosa or Moscato Nero.",
 official="Scanzo / Moscato di Scanzo", match=["Scanzo"]))
apps.append(A("Terre del Colleoni", "DOC", L, "Bergamo", "2011", None, ["red", "white", "sparkling"], "Schiava, Marzemino, Incrocio Manzoni, Franconia, Merlot, Cabernet",
 "Named after the condottiero Bartolomeo Colleoni, this Bergamo DOC covers the hills around Bergamo with a range of varietals including Franconia (Blaufränkisch).", "", [], "",
 official="Terre del Colleoni / Colleoni", match=["Colleoni"]))
apps.append(A("San Colombano al Lambro", "DOC", L, "Milan", "1984", 100, ["red", "white"], "Croatina, Barbera, Uva Rara; Chardonnay, Pinot Nero",
 "The only DOC in Milan's metropolitan province, on an isolated hill rising above the Po plain near Lodi. Light reds of Croatina and Barbera.",
 "An isolated hill of marine sediments and loess in the flat plain.", ["Panizzari"], "The hill is named after the Irish monk Saint Columbanus, who passed by on his way to found the abbey of Bobbio in 614.",
 official="San Colombano al Lambro / San Colombano", match=["San Colombano"]))

sites = [
S("guido-berlucchi", "Guido Berlucchi (Palazzo Lana)", "house", "Producer, birthplace of Franciacorta (1961)", "Franciacorta", 45.6208, 10.0131, "precise",
  "The historic Palazzo Lana in Borgonato, where in 1961 Franco Ziliani made the first 3,000 bottles of Pinot di Franciacorta by the traditional method for Guido Berlucchi. Still the zone's largest producer.", ["Guido Berlucchi"]),
S("ca-del-bosco", "Ca' del Bosco", "house", "Producer", "Franciacorta", 45.5947, 9.9908, "precise",
  "Maurizio Zanella's estate in Erbusco, founded in the 1960s by his mother Annamaria Clementi; its Cuvée Annamaria Clementi Riserva is one of Italy's greatest sparkling wines, and its gate is a giant bronze sun by Arnaldo Pomodoro.", ["Ca' del Bosco"]),
S("bellavista", "Bellavista", "house", "Producer", "Franciacorta", 45.6128, 9.9760, "precise",
  "Founded by Vittorio Moretti in 1977 on the Bellavista hill at Erbusco; with Ca' del Bosco it built Franciacorta's reputation, and its Vittorio Moretti Riserva is a benchmark.", ["Bellavista"]),
S("monte-rossa", "Monte Rossa", "house", "Producer", "Franciacorta", 45.5735, 10.0590, "precise",
  "Cazzago San Martino estate founded by Paolo Rabotti and Paola Rovetta in 1972, early champions of Franciacorta's quality rules.", ["Monte Rossa"]),
S("sassella-santuario", "Sassella (Santuario della Madonna della Sassella)", "cru", "Subzone, Valtellina Superiore DOCG", "Valtellina Superiore", 46.1624, 9.8354, "precise",
  "The 15th-century sanctuary perched on a rock spur among the Sassella terraces west of Sondrio, the emblem of Valtellina's most famous subzone, warm and rocky, giving the most complete wines.", ["Arpepe", "Nino Negri", "Aldo Rainoldi"]),
S("grumello-castello", "Grumello (Castel Grumello)", "cru", "Subzone, Valtellina Superiore DOCG", "Valtellina Superiore", 46.1737, 9.8972, "precise",
  "The ruined 13th-century twin castle above Montagna in Valtellina that gives the Grumello subzone its name; the terraces below give fragrant, mid-weight Nebbiolo.", ["Arpepe", "Nino Negri"]),
S("inferno-valtellina", "Inferno", "cru", "Subzone, Valtellina Superiore DOCG", "Valtellina Superiore", 46.1760, 9.9300, "approx",
  "The smallest of the main subzones, a stack of terraces on bare rock east of Sondrio around Poggiridenti and Tresivio, so steep and hot it was named 'hell'. Its wines are dense, mineral and long-lived.", ["Arpepe", "Nino Negri", "Mamete Prevostini"]),
S("valgella", "Valgella", "cru", "Subzone, Valtellina Superiore DOCG", "Valtellina Superiore", 46.1690, 10.0400, "approx",
  "The largest subzone, centred on Teglio and Chiuro in the eastern valley, at higher altitudes, giving lighter, perfumed Nebbiolo.", ["Sandro Fay", "Nino Negri"]),
S("maroggia", "Maroggia", "cru", "Subzone, Valtellina Superiore DOCG", "Valtellina Superiore", 46.1812, 9.7042, "approx",
  "The smallest subzone, near Berbenno at the western end of the Valtellina Superiore zone and the most recent of the five to be named on labels.", ["Aldo Rainoldi"]),
S("nino-negri", "Nino Negri (Castello Quadrio)", "estate", "Producer", "Sforzato di Valtellina", 46.1672, 9.9858, "approx",
  "Valtellina's best-known house, founded in 1897 and based in the 15th-century Castello Quadrio at Chiuro; its 5 Stelle Sfursat, created by Casimiro Maule, defined Sforzato.", ["Nino Negri"]),
S("arpepe", "Arpepe", "estate", "Producer", "Valtellina Superiore", 46.1640, 9.8460, "approx",
  "The Pelizzatti Perego family's estate at the foot of the Sassella, with a cellar dug into the rock; its long-aged Sassella, Grumello and Inferno Riservas are reference wines for traditional Valtellina.", ["Arpepe"]),
S("ca-dei-frati", "Ca' dei Frati", "estate", "Producer", "Lugana", 45.4547, 10.6177, "precise",
  "The Dal Cero family's estate at Lugana di Sirmione, which did more than anyone to make Lugana a serious, age-worthy white.", ["Ca' dei Frati"]),
S("conte-vistarino", "Conte Vistarino", "estate", "Producer", "Oltrepò Pavese metodo classico", 45.0182, 9.2524, "precise",
  "The Giorgi di Vistarino family estate at Rocca de' Giorgi, where the counts planted Pinot Noir from France in the 1850s; today it makes single-vineyard Pinot Nero (Pernice, Bertone, Tavernetto) and metodo classico.", ["Conte Vistarino"]),
S("frecciarossa", "Frecciarossa", "estate", "Producer", "Oltrepò Pavese", 45.0003, 9.1430, "precise",
  "Casteggio estate whose Giorgio Odero exported bottled Oltrepò wine to the US in the 1930s, a pioneer of estate bottling in the region.", ["Frecciarossa"]),
S("scanzo-vineyards", "Moscato di Scanzo vineyards", "vineyard", "Smallest DOCG in Italy", "Moscato di Scanzo", 45.7108, 9.7743, "precise",
  "The terraced hills of Scanzorosciate above Bergamo, the entire 31-hectare world of Moscato di Scanzo.", ["La Brugherata", "Biava"]),
]

if __name__ == '__main__':
    save('p4_lombardy', regions, apps, sites)
