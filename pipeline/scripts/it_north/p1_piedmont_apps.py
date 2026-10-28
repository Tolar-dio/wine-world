import sys, json
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import A, R, save

SRC_P = [
    ("EU eAmbrosia geographical indications register", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, geospatial inventory of EU wine PDOs (Scientific Data 9:394)", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("Disciplinare di produzione Barolo DOCG (Regione Piemonte)", "https://www.regione.piemonte.it/web/media/6424/download"),
    ("Wikipedia: Barolo", "https://en.wikipedia.org/wiki/Barolo"),
    ("Wikipedia: Barbaresco", "https://en.wikipedia.org/wiki/Barbaresco"),
    ("Wein.plus: Cru in Piedmontese, the vineyard designations of Barolo and Barbaresco", "https://magazine.wein.plus/cru-in-piedmontese-the-vineyard-designations-of-barolo-and-barbaresco"),
    ("Decanter: Barolo and Barbaresco vineyards, 10 high-flying sites", "https://www.decanter.com/premium/barolo-barbaresco-vineyards-10-high-flying-sites-451115"),
    ("Linkiesta: Barolo e Barbaresco, come cambia il disciplinare (Feb 2024)", "https://www.linkiesta.it/2024/02/consorzio-langhe-barolo-barbaresco-modifiche-disciplinare/"),
    ("Il Sole 24 Ore: north-facing Barolo vineyard proposal (May 2024)", "https://en.ilsole24ore.com/art/siccita-vignaioli-prematuro-spostare-confini-barolo-AFGVILQD"),
    ("Italian Wine Central: Canelli DOCG", "https://italianwinecentral.com/denomination/canelli-docg/"),
    ("Wine Business International: Canelli gets its own DOCG", "https://www.wine-business-international.com/wine/news/canelli-gets-its-own-docg"),
    ("Decanter: Piedmont gets new DOCG Terre Alfieri (Dec 2020)", "https://www.decanter.com/wine-news/terre-alfieri-piedmont-new-docg-449610/"),
    ("QdS: Derthona Timorasso 1.75 million bottles (Sept 2026)", "https://qds.it/derthona-timorasso-175-mln-di-bottiglie-e-domanda-in-crescita/"),
]

regions = [
R("Piedmont", ["Piemonte"], None, 44.85, 8.1, 7.6,
  "Fog, Nebbiolo and the Alps on the horizon: Italy's most Burgundian wine region, where single hillsides carry names wine lovers know by heart.",
  "Piedmont, \"the foot of the mountains\", is wrapped on three sides by the Alps and the Ligurian Apennines, and that ring of peaks is the key to its wines. Air pools in the basin, autumn fogs (*nebbia*) settle in the valleys, and the late, slow ripening season suits a grape that hates to be hurried: Nebbiolo. The region has no IGT at all, a sign of how thoroughly it has organised itself into DOCs and DOCGs, and it holds more DOCGs (19 in 2026, after Canelli in 2023) than any other Italian region.\n\nThe heart is the Langhe, the tangle of steep marl ridges south of Alba where Barolo and Barbaresco are made, and across the Tanaro the sandier Roero. North and east of Asti lies the Monferrato, a softer sea of hills given over to Barbera, Grignolino, Ruchè, Freisa and Moscato. In the far north, below Monte Rosa, the Alto Piemonte (Gattinara, Ghemme, Boca, Lessona, Bramaterra) grows Nebbiolo on volcanic porphyry and glacial moraine, and at Carema on the Aosta border vines climb pergolas on stone pillars. To the south-east, Gavi makes Cortese and the Colli Tortonesi have turned the near-extinct Timorasso into the hottest white grape in Italy.\n\nPiedmont is a country of small growers who for most of the 20th century sold grapes to merchant houses in Alba and Asti. The shift to estate bottling from the 1960s onward, the arguments between traditionalists and modernists, and finally the mapping of the crus into official MGAs (Barbaresco 2007, Barolo 2010) turned it into the most terroir-obsessed region in Italy. UNESCO listed the vineyard landscapes of Langhe-Roero and Monferrato as World Heritage in 2014.",
  "Wine in Piedmont goes back at least to the Romans (Alba was *Alba Pompeia*), and Nebbiolo is named in documents from the 13th century: a 1268 record from Rivoli mentions *nibiol*, and the 1511 statutes of La Morra punished anyone who cut down a Nebbiolo vine. For centuries the wines were sweetish and often slightly fizzy, because fermentation stopped in the cold cellars of November.\n\nThe modern era began in the Savoy kingdom of the 1830s to 1860s. Giulia (Juliette) Colbert, the French-born Marchesa Falletti di Barolo, Camillo Benso di Cavour at Grinzane, and the royal estate of Fontanafredda under Vittorio Emanuele II took Nebbiolo to a fully fermented, dry, cellar-aged style. In 1881 the Royal Oenological School opened in Alba under Domizio Cavazza, who went on to found the Cantina Sociale di Barbaresco in 1894. Asti, meanwhile, became the centre of a sparkling-wine industry after Carlo Gancia returned from Champagne and made Italy's first metodo classico at Canelli in 1865, later pivoting to sweet Moscato.\n\nPhylloxera, two world wars and emigration hollowed out the hills. Recovery came with the DOC law of 1963: Barolo and Barbaresco were among the first DOCs (1966) and, with Brunello, the first DOCGs (1980). The 1980s and 1990s brought the Barolo wars between the slow, large-cask traditionalists and the barrique-loving modernists; today the debate has mellowed into a shared obsession with site. Recent changes include Nizza DOCG (2014, own denomination 2019), Terre Alfieri DOCG (2020), Canelli DOCG (2023) and the rise of Derthona Timorasso, whose consortium froze new plantings in 2026 after the area grew from about 100 to over 500 hectares in a decade.",
  "The Langhe and Monferrato hills are uplifted seabed of the Tertiary Piedmont Basin: layered marls, sandstones and sands laid down between about 20 and 5 million years ago, then pushed up and cut by the Tanaro and Belbo rivers. Calcareous marls (*tufo* locally) hold water and give structure; sands drain fast and give perfume and early charm. Across the Tanaro, the Roero is younger Pliocene sand, so its Nebbiolo is lighter and more floral.\n\nThe Alps block Atlantic weather and the Apennines block Mediterranean warmth, so the climate is continental with cold, foggy winters, hot summers and long autumns. Hail is the great enemy. Altitude and aspect decide everything: the *sorì* (south-facing slopes where snow melts first) went to Nebbiolo, east and west to Barbera and Dolcetto, north faces to woods and hazelnuts. Climate change is reshuffling this; Nebbiolo now ripens weeks earlier than in the 1980s, and higher, cooler sites in Alta Langa and the north are gaining value.\n\nIn Alto Piemonte the soils are completely different: acidic volcanic porphyries from the 280-million-year-old Sesia supervolcano at Boca and Gattinara, glacial moraine at Ghemme, and yellow marine sands at Lessona.",
  "Nebbiolo is the noble grape: tannic, high in acid, pale, smelling of roses, tar and red cherry, and sensitive to every change of soil. Barbera is the everyday red and the most planted black grape: low tannin, high acidity, juicy dark fruit, at its most serious in Nizza and Barbera d'Alba. Dolcetto is the early-ripening dinner wine of Dogliani, Diano and Ovada. The cast of rarer reds includes Grignolino (pale, peppery, tannic), Freisa (a Nebbiolo relative with raspberry and bite), Ruchè (aromatic, rose and spice), Pelaverga (pepper, Verduno), Brachetto (sweet and red-fruited), Vespolina, Croatina and Uva Rara (Alto Piemonte blending partners).\n\nWhites: Moscato Bianco (Asti, Canelli), Cortese (Gavi), Arneis (Roero, the white that Alfredo Currado of Vietti and Bruno Giacosa rescued in the 1960s and 1970s), Erbaluce (Caluso), Timorasso (Tortona) and Nascetta (a rare Langhe white revived at Novello). Chardonnay and Pinot Noir go into Alta Langa sparkling wine.",
  "Barolo and Barbaresco: long-lived, dry, tannic Nebbiolo. Roero, Gattinara, Ghemme and Carema: lighter or mountain-styled Nebbiolo. Barbera in every weight from crunchy to oaked and powerful. Dolcetto, Grignolino, Freisa, Ruchè: lighter reds for the table. Whites from Gavi, Roero Arneis, Timorasso and Erbaluce. Sparkling: Asti Spumante and Moscato d'Asti (sweet, low alcohol, from partially fermented Moscato), Alta Langa (dry metodo classico), Brachetto d'Acqui (sweet red). Sweet passito wines from Caluso, Loazzolo and Strevi.",
  "Piedmont uses the national DOCG > DOC pyramid but has no IGT, so declassified wine falls to the regional DOC Piemonte or to Langhe, Monferrato and Alba. Barolo and Barbaresco are subdivided into MGAs (Menzioni Geografiche Aggiuntive): 66 in Barbaresco (2007, plus one in 2010) and 181 in Barolo (2010: 170 vineyard areas plus 11 commune names). An MGA is a delimited place name, not a quality ranking, and only one may appear on a label. Roero has its own MGAs, Nizza and Dogliani allow 'Vigna' names, and the Langhe DOC is the catch-all for Nebbiolo, Chardonnay and blends from the Langhe hills.",
  ["Barolo", "Barbaresco", "Roero", "Langhe", "Alba", "Nebbiolo d'Alba", "Dogliani", "Dolcetto di Diano d'Alba", "Verduno Pelaverga", "Barbera d'Alba", "Barbera d'Asti", "Nizza", "Asti", "Canelli", "Alta Langa", "Brachetto d'Acqui", "Gavi", "Colli Tortonesi", "Gattinara", "Ghemme", "Carema", "Erbaluce di Caluso", "Ruchè di Castagnole Monferrato", "Grignolino d'Asti", "Terre Alfieri", "Piemonte"],
  SRC_P),
R("Langhe", ["Langa"], "Piedmont", 44.62, 8.0, 10.2,
  "The ridges south of Alba where Barolo and Barbaresco are made, and where a single hillside can be worth more than a whole valley elsewhere.",
  "The Langhe (singular Langa) are the steep, parallel ridges of marl and sandstone that rise south of the Tanaro around Alba. The lower Langhe hold Barolo on the left bank of the Talloria and Barbaresco to the north-east, Dolcetto in Dogliani and Diano, Barbera and Nebbiolo everywhere; the higher Alta Langa to the south is a land of hazelnuts, woods and, increasingly, sparkling-wine vineyards at 500 to 800 metres. Alba is the market town and the home of the white truffle fair each autumn.",
  "The Langhe were poor peasant country well into the 1960s, the world of Beppe Fenoglio's novels, when men left for the factories of Turin and Ferrero's chocolate plant in Alba. Wine was sold in bulk to merchant houses. The rise of estate bottling, export success from the 1980s and the 2014 UNESCO listing transformed it into one of the richest farming landscapes in Europe, where top Barolo vineyard land now trades at well over a million euros per hectare.",
  "Marls of the Tortonian (calcareous, bluish Sant'Agata marls) in the west around La Morra and Barolo, and the older Serravallian (once called Helvetian) Lequio formation and Diano sandstones in the east around Serralunga and Monforte. Elevations run from about 200 to over 500 metres in the Barolo zone and up to 800 in Alta Langa.",
  "Nebbiolo, Barbera, Dolcetto, plus Arneis, Nascetta, Chardonnay, Pinot Noir, Freisa and Pelaverga.",
  "Barolo, Barbaresco, Langhe Nebbiolo, Barbera d'Alba, Dolcetto, Alta Langa sparkling.",
  "Barolo and Barbaresco MGAs; Langhe DOC as catch-all.",
  ["Barolo", "Barbaresco", "Langhe", "Alba", "Dogliani", "Dolcetto di Diano d'Alba", "Verduno Pelaverga", "Dolcetto d'Alba", "Barbera d'Alba", "Nebbiolo d'Alba", "Alta Langa"],
  SRC_P[:6]),
R("Roero", [], "Piedmont", 44.79, 7.98, 11.0,
  "Sandy, crumbling hills on the left bank of the Tanaro: Nebbiolo with perfume instead of muscle, and the home of Arneis.",
  "Across the Tanaro from the Langhe, the Roero is cut by deep ravines (*rocche*) in soft Pliocene sands. Its Nebbiolo ripens earlier and is lighter in tannin than Barolo, all rose and raspberry, and its signature white is Arneis, which was down to a few rows in the 1960s. Roero DOCG (2004) covers both.",
  "Named after the Roero family of Asti bankers who held the castles here from the 13th century. Long a land of fruit orchards and strawberries, it was rescued as a wine region by Arneis in the 1980s.",
  "Marine sands and sandy marls of the Pliocene (Astian sands), less calcareous and much younger than the Langhe marls, eroding into dramatic gullies.",
  "Nebbiolo, Arneis, Barbera, Favorita.", "Roero rosso, Roero Arneis, Barbera d'Alba.", "Roero DOCG (with its own list of MGA vineyard names) above the Langhe-wide DOCs Nebbiolo d'Alba and Barbera d'Alba.",
  ["Roero", "Nebbiolo d'Alba", "Barbera d'Alba", "Terre Alfieri"], SRC_P[:2]),
R("Monferrato", [], "Piedmont", 44.95, 8.3, 9.0,
  "Gentle hills of Barbera, Grignolino and Moscato between Asti and Casale, with UNESCO-listed 'infernot' cellars dug into the sandstone.",
  "The Monferrato is a wide, rolling hill country north and south of the Tanaro around Asti, Nizza and Casale. It is Barbera's homeland and the source of Asti and Moscato d'Asti, along with Grignolino, Ruchè, Freisa, Malvasia di Casorzo and Brachetto.",
  "Ruled by the Aleramici marquises and later the Gonzaga of Mantua before passing to Savoy in 1708. The Canelli cathedral-like cellars of Gancia, Bosca, Contratto and Coppo, dug in the 19th century, are part of the UNESCO site, as are the *infernot*, small cellars carved into the Pietra da Cantoni sandstone of the Casalese.",
  "Marls, sands and the calcareous sandstone called Pietra da Cantoni; Nizza and Canelli have white marls similar to the Langhe.",
  "Barbera, Moscato Bianco, Grignolino, Freisa, Ruchè, Dolcetto, Cortese, Brachetto, Malvasia di Casorzo.",
  "Barbera d'Asti and Nizza, Asti/Moscato d'Asti, Grignolino, Ruchè.", "Monferrato DOC as catch-all; Nizza and Canelli as top tiers.",
  ["Barbera d'Asti", "Nizza", "Asti", "Canelli", "Ruchè di Castagnole Monferrato", "Grignolino d'Asti", "Grignolino del Monferrato Casalese", "Monferrato", "Barbera del Monferrato", "Freisa d'Asti", "Dolcetto d'Acqui", "Brachetto d'Acqui"], SRC_P[:2]),
R("Alto Piemonte", ["Northern Piedmont"], "Piedmont", 45.6, 8.3, 9.5,
  "Nebbiolo on a fossil supervolcano: the cool, acid-soil hills below Monte Rosa that once had more vines than the Langhe.",
  "The hills of Novara, Vercelli and Biella provinces, on either side of the Sesia river, grow Nebbiolo (here also called Spanna) blended with Vespolina, Croatina and Uva Rara. Gattinara and Ghemme are DOCG; Boca, Bramaterra, Lessona, Fara, Sizzano, Coste della Sesia and Colline Novaresi are DOC. The wines are paler, more aromatic and more acid-driven than Barolo, with iron and mountain-herb notes.",
  "In the 19th century there were said to be tens of thousands of hectares of vineyard here. Phylloxera, the 1905 hailstorm, and the pull of the Biella textile mills emptied the hills; Gattinara fell to under 100 hectares. A revival since the 2000s, led by producers such as Antoniolo, Travaglini, Le Piane (Christoph Kunzli, Boca) and Proprietà Sperino (the De Marchi family, Lessona) and by outside investors, has made it one of Italy's most exciting Nebbiolo zones.",
  "The Sesia Valley exposes a collapsed Permian supervolcano (about 280 million years old), giving acidic porphyry and volcanic soils at Gattinara, Boca and Bramaterra. Ghemme sits on glacial moraine; Lessona on Pliocene marine sands. Cooler and wetter than the Langhe, with breezes off Monte Rosa.",
  "Nebbiolo (Spanna), Vespolina, Croatina, Uva Rara, Erbaluce.", "Nebbiolo-based reds of high acidity and fine tannin.", "Two DOCGs and several tiny DOCs.",
  ["Gattinara", "Ghemme", "Boca", "Bramaterra", "Lessona", "Fara", "Sizzano", "Coste della Sesia", "Colline Novaresi", "Valli Ossolane"], SRC_P[:2]),
]

apps = []
P = "Piedmont"

apps.append(A("Barolo", "DOCG", P, "Langhe", "DOC 1966, DOCG 1980", 2300, ["red"],
 "Nebbiolo (100%)",
 "Barolo is Italy's most argued-over and most collectable red, made from Nebbiolo grown on eleven communes in the hills south-west of Alba. It is a wine of paradox: pale garnet in the glass yet ferociously tannic, smelling of roses, dried cherries, tar, licorice and truffle, and built to age for decades. Its fame rests on two things, the grape's sensitivity to soil and the patchwork of steep, differently oriented slopes on which it grows, which is why Barolo talk is always about places: Cannubi, Brunate, Rocche dell'Annunziata, Monprivato, Villero, Vignarionda, Francia.\n\nThe modern dry style dates from the mid-19th century, when Juliette Colbert, Marchesa di Barolo, and Cavour's Grinzane estate began fermenting Nebbiolo fully dry and ageing it in cask. King Vittorio Emanuele II's Fontanafredda estate followed, and Barolo became 'the wine of kings and the king of wines'. In the 1980s and 1990s it was the battlefield of Italy's wine wars: modernists (Elio Altare, Roberto Voerzio, Paolo Scavino, Domenico Clerico, Luciano Sandrone) cut macerations short and used new French barriques for fruit and early charm, while traditionalists (Bartolo Mascarello, Giuseppe Rinaldi, Giacomo Conterno, Cappellano, Giuseppe Mascarello) kept long maceration and large Slavonian oak *botti*. Today most producers sit somewhere in between and the argument has moved to site.\n\nRules: 100% Nebbiolo, at least 38 months of ageing from 1 November of the harvest year with 18 months in wood (Riserva 62 months), minimum 13% alcohol, vineyards between 170 and 540 metres and never on north-facing slopes. The zone covers roughly 2,200 to 2,300 hectares of Nebbiolo, up from about 1,200 in 1990, and produces on the order of 14 million bottles a year. Since 2010 the label may carry one of 181 MGAs: 170 vineyard areas plus 11 commune names such as 'Barolo del Comune di Serralunga d'Alba'.",
 "The Barolo zone is a horseshoe of ridges open to the north, drained by the Talloria dell'Annunziata and Talloria di Castiglione streams that flow north to the Tanaro. A geological line runs roughly north-south through Castiglione Falletto: to the west, La Morra and Barolo sit on Tortonian Sant'Agata Fossil Marls, bluish calcareous marls that give perfume, elegance and earlier approachability; to the east, Serralunga d'Alba and much of Monforte sit on older Serravallian (formerly called Helvetian) Lequio Formation marls and Diano sandstones, poorer and more compact, giving firmer, longer-lived wines. Castiglione Falletto, on the dividing ridge, blends both.\n\nThe Tanaro matters too: it once flowed north past Bra toward the Po near Carmagnola, until, in the late Pleistocene, it was captured by a stream draining east toward Alessandria. The sudden drop in base level made every tributary cut down hard, carving the steep gullies and amphitheatres that shape today's slopes. Altitude, aspect and the cooling air from the Alps decide ripeness: south and south-west amphitheatres (*sorì*) like Cannubi and Vignarionda ripen best, while higher sites in Novello, Monforte and La Morra are prized in hot years.",
 ["Giacomo Conterno", "Bartolo Mascarello", "Giuseppe Rinaldi", "Giuseppe Mascarello e Figlio", "Bruno Giacosa", "Vietti", "Cavallotto", "G.B. Burlotto", "Roberto Voerzio", "Elio Altare", "Luciano Sandrone", "G.D. Vajra", "Brovia", "Oddero", "Massolino", "Paolo Scavino", "Aldo Conterno", "Marchesi di Barolo", "Fontanafredda", "Cappellano", "Ettore Germano", "Elio Grasso", "Renato Ratti", "Produttori di Terre del Barolo"],
 "In 2024 the consortium floated letting Nebbiolo for Barolo be planted on north-facing slopes, citing climate change; growers resisted and, as of the latest reports, the ban (slopes between -45 and +45 degrees of north) still stands in the disciplinare.",
 official="Barolo",
 contains=["Cannubi", "Brunate", "Cerequio", "Rocche dell'Annunziata", "Monprivato", "Villero", "Rocche di Castiglione", "Bussia", "Ginestra", "Falletto", "Vignarionda", "Lazzarito", "Francia", "Ravera", "Monvigliero"]))

apps.append(A("Barbaresco", "DOCG", P, "Langhe", "DOC 1966, DOCG 1980", 733, ["red"], "Nebbiolo (100%)",
 "Barbaresco is Barolo's smaller neighbour, made from Nebbiolo grown in the communes of Barbaresco, Neive and Treiso plus the San Rocco Seno d'Elvio hamlet of Alba, on hills north-east of Alba that sit closer to the Tanaro and slightly lower. The wines are often described as more graceful and earlier to open than Barolo, with finer tannin and more red fruit and violet, but the best (Asili, Rabajà, Montestefano, Martinenga, Pajè, Montefico) are every bit as long-lived.\n\nThe story of Barbaresco as a separate wine begins in 1894, when Domizio Cavazza, director of the Alba wine school, gathered nine growers into the Cantina Sociale di Barbaresco to make and sell wine under the village name instead of selling grapes to Barolo merchants. Fascism closed it, but in 1958 the parish priest Don Fiorino Marengo founded the Produttori del Barbaresco, which today farms roughly 100 hectares through its members, about an eighth of the appellation, and bottles nine single-MGA Riservas in good years. Angelo Gaja and Bruno Giacosa then made Barbaresco world-famous from the 1960s, Gaja with single-vineyard bottlings (Sorì San Lorenzo, Sorì Tildin, Costa Russi) and barriques, Giacosa with classic large-cask wines from bought-in crus like Santo Stefano and Asili.\n\nRules: 100% Nebbiolo, 26 months of ageing from 1 November after harvest with 9 months in wood (Riserva 50 months), minimum 12.5% alcohol. There are 66 MGAs, created in 2007 (65) with one added in 2010; unlike Barolo there is no commune-level mention, though the consortium proposed adding one in 2024. Vineyard area was 733 hectares in 2019, up from 484 in the early 1990s.",
 "Barbaresco's soils are mostly Tortonian Sant'Agata Fossil Marls, blue-grey and calcareous, similar to La Morra, with sandier lenses in parts of Neive and Treiso. The vineyards lie at 200 to about 400 metres; Treiso is highest and coolest. The Tanaro's influence makes the zone slightly warmer and earlier-ripening than Barolo, which, together with the shorter legal ageing, explains Barbaresco's reputation for approachability.",
 ["Produttori del Barbaresco", "Gaja", "Bruno Giacosa", "Roagna", "Bruno Rocca", "Sottimano", "Marchesi di Grésy", "Albino Rocca", "Cigliuti", "Castello di Neive", "Ca' del Baio", "Cascina delle Rose", "Paitin", "Piero Busso", "Ada Nada", "Fiorenzo Nada"],
 "In 1996 Angelo Gaja took his three famous single-vineyard Barbarescos out of the DOCG and sold them as Langhe Nebbiolo so he could add a little Barbera; from the 2013 vintage he returned them to Barbaresco DOCG as 100% Nebbiolo.",
 official="Barbaresco",
 contains=["Asili", "Rabajà", "Montestefano", "Pajè", "Martinenga", "Montefico", "Ovello", "Pora", "Rio Sordo", "Starderi", "Gallina", "Santo Stefano", "Pajoré", "Albesani"]))

apps.append(A("Roero", "DOCG", P, "Roero", "DOC 1985, DOCG 2004", None, ["red", "white"], "Nebbiolo (min 95%) for Roero; Arneis (min 95%) for Roero Arneis",
 "Roero is the Langhe's mirror image across the Tanaro: Nebbiolo grown on loose Pliocene sands that make a lighter, more perfumed, earlier-drinking wine, and Arneis, the white grape that the region's growers saved from near extinction. Arneis means something like 'little rascal' in Piedmontese, a nod to its awkward habits in the vineyard; it was traditionally planted among Nebbiolo to attract birds and bees away from the red grapes and sometimes added to soften them. In the late 1960s Alfredo Currado at Vietti and Bruno Giacosa bottled it as a varietal, and by the 1990s Roero Arneis was a fashionable white with pear, chamomile and almond notes.\n\nRoero rosso needs 20 months of ageing (Riserva 32), with six months in wood; the white comes as still, spumante and Riserva. Matteo Correggia, who died in a tractor accident in 2001, did more than anyone to show that Roero Nebbiolo could age, and estates like Malvirà, Cascina Ca' Rossa, Monchiero Carbone, Giovanni Almondo and Cascina Val del Prete followed. The consortium has mapped MGAs, and Roero is increasingly seen as a source of value-priced, elegant Nebbiolo.",
 "Pliocene marine sands (Sabbie d'Asti) over marls, crumbling into dramatic ravines called *rocche*. The sands warm quickly and drain freely, ripening Nebbiolo earlier and giving softer tannins; Arneis gets its freshness from the cooler, north-facing parcels and higher sites.",
 ["Matteo Correggia", "Malvirà", "Cascina Ca' Rossa", "Monchiero Carbone", "Giovanni Almondo", "Cascina Val del Prete", "Vietti", "Bruno Giacosa", "Negro Angelo"],
 "The *rocche* ravines also mark a geological watershed: the sandy slopes are full of marine fossils, and in places you can pick scallop shells out of the vineyard soil.",
 official="Roero", match=["Roero Arneis"]))

apps.append(A("Langhe", "DOC", P, "Langhe", "1994", None, ["red", "white", "rose", "sweet"],
 "Nebbiolo, Dolcetto, Barbera, Freisa, Arneis, Favorita, Chardonnay, Nascetta, Sauvignon Blanc, Riesling, Pinot Nero, Cabernet Sauvignon, Merlot and others",
 "The Langhe DOC is the umbrella denomination for the hills of the Langhe, covering most of the province of Cuneo south of the Tanaro. For wine lovers its most important wine is Langhe Nebbiolo, which can be declassified Barolo or Barbaresco, younger-vine fruit or deliberately fresher wine from outside the DOCG zones, and is often the best value in Piedmont. The DOC also allows varietal Chardonnay (Gaja's Gaia & Rey, planted in 1979, put Langhe Chardonnay on the map), Nascetta (the rare aromatic white of Novello, with a 'Nas-cëtta del Comune di Novello' mention), Freisa, Arneis, and blends labelled Langhe Rosso or Bianco.",
 "Everything from the Tortonian and Serravallian marls of the Barolo and Barbaresco zones to the sandstone ridges of the Alta Langa at up to 800 metres.",
 ["Gaja", "G.D. Vajra", "Elvio Cogno", "Aldo Conterno", "Pio Cesare", "Giuseppe Rinaldi", "Bartolo Mascarello"],
 "Gaja's famous Sorì San Lorenzo, Sorì Tildin and Costa Russi were labelled Langhe Nebbiolo from 1996 to 2012 because they contained a few per cent of Barbera, which Barbaresco DOCG forbids.",
 official="Langhe"))

apps.append(A("Alba", "DOC", P, "Langhe", "2011", None, ["red"], "Nebbiolo (70 to 85%) and Barbera (15 to 30%)",
 "One of Italy's newer DOCs and a rare case of an official blend of Piedmont's two great reds: Nebbiolo for perfume and tannin, Barbera for colour and acidity. It codifies a farmer tradition of mixing the two and covers communes in both the Langhe and Roero. It remains a niche, with only a handful of producers using it.",
 "Langhe marls and Roero sands around Alba.", ["Poderi Colla", "Pio Cesare"],
 "Its creation in 2011 caused friction: producers of Barbera d'Alba and Nebbiolo d'Alba objected to a new wine using the town's name alone.",
 official="Alba"))

apps.append(A("Nebbiolo d'Alba", "DOC", P, "Langhe and Roero", "1970", None, ["red", "sparkling", "sweet"], "Nebbiolo (100%)",
 "Nebbiolo grown in a ring of communes around Alba, mostly in the Roero and the northern Langhe, outside or overlapping with the Barolo and Barbaresco zones. It is a step up from Langhe Nebbiolo in ambition and ages for a minimum of 12 months (Superiore 18). Many Barolo houses make one from younger vines or the Roero side, and the style is fragrant, medium-bodied and approachable within three to five years.",
 "Mostly sandy Roero soils plus Langhe marls around Diano, Monticello and Vezza.",
 ["Giacomo Ascheri", "Bruno Giacosa", "Prunotto", "Sandrone", "Produttori del Barbaresco"],
 "The legal zone includes Barolo-area communes such as Diano and Grinzane, but not the parts already inside the Barolo or Barbaresco boundaries.",
 official="Nebbiolo d'Alba"))

apps.append(A("Barbera d'Alba", "DOC", P, "Langhe and Roero", "1970", None, ["red"], "Barbera (min 85%), Nebbiolo up to 15%",
 "Barbera grown around Alba, often on the slopes that were too cool or not south-facing enough for Nebbiolo. It tends to be richer and darker than Barbera d'Asti because the Langhe's calcareous marls and the Barolo producers' attention give it more structure. In the 1980s and 1990s modernists such as Elio Altare, Roberto Voerzio and Giacomo Conterno (Cascina Francia) showed that Barbera aged in barrique or large cask could be a serious, age-worthy wine. Superiore requires 12 months' ageing with four in wood.",
 "Tortonian and Serravallian marls of the Barolo and Barbaresco hills plus Roero sands.",
 ["Giacomo Conterno", "Vietti", "Giuseppe Rinaldi", "Bartolo Mascarello", "Roberto Voerzio", "Elio Altare", "G.D. Vajra"],
 "Giacomo Conterno's Barbera from Cascina Francia is grown on the same Serralunga hill as its Barolo, and Monfortino's maker ferments it in the same old casks.",
 official="Barbera d'Alba"))

apps.append(A("Dogliani", "DOCG", P, "Langhe", "DOCG 2005 (Superiore), 2011 single DOCG", None, ["red"], "Dolcetto (100%)",
 "Dogliani is the one place where Dolcetto is treated as a grand wine. On the high, cool hills south of Monforte, the grape gives deeply coloured, violet-scented reds with grip and bitter-almond finish, built to age three to eight years. The town's most famous son was Luigi Einaudi, economist and first elected president of the Italian Republic (1948 to 1955), whose estate Poderi Luigi Einaudi still makes Dogliani. Anna Maria Abbona, San Fereolo, Pecchenino and Chionetti (whose Briccolero and San Luigi were benchmarks) are other key names. The Superiore requires a year of ageing.",
 "Marls and sandstones at 300 to 600 metres, cooler and higher than the Barolo zone, which preserves acidity in an otherwise low-acid grape.",
 ["Poderi Luigi Einaudi", "Chionetti", "Anna Maria Abbona", "Pecchenino", "San Fereolo", "Marziano Abbona"],
 "Dolcetto means 'little sweet one', but the wine is dry: the name refers to the grape's sweetness at table and possibly to the gentle (*dolci*) hills where it grows.",
 official="Dogliani"))

apps.append(A("Dolcetto di Diano d'Alba", "DOCG", P, "Langhe", "DOC 1974, DOCG 2010", None, ["red"], "Dolcetto (100%)",
 "A tiny Dolcetto DOCG on the hill town of Diano d'Alba, just east of Serralunga. Diano mapped its best slopes as *sorì* (the dialect word for a sunny slope) long before Barolo had MGAs, and labels can carry those names. The wines are a little fuller and riper than Dolcetto d'Alba.",
 "Diano sandstone and marls; the town also sits partly inside the Barolo zone.", ["Abrigo Fratelli", "Bricco Maiolica", "Claudio Alario"],
 "Diano d'Alba registered more than 70 *sorì* names, among the earliest official vineyard mentions in Piedmont.",
 official="Dolcetto di Diano d'Alba / Diano d'Alba", match=["Diano d'Alba"]))

apps.append(A("Dolcetto d'Alba", "DOC", P, "Langhe", "1974", None, ["red"], "Dolcetto (100%)",
 "The everyday red of the Langhe, drunk young with tajarin and vitello tonnato while the Barolo ages. Soft acidity, dark cherry and almond-bitter finish. Producers increasingly grub it up for Nebbiolo, so good Dolcetto d'Alba is getting rarer.",
 "Same marls as Barolo and Barbaresco, usually on cooler or east-facing slopes.", ["Giuseppe Mascarello", "Bartolo Mascarello", "G.D. Vajra", "Brovia"],
 "Because it ripens weeks before Nebbiolo, Dolcetto was the cash-flow grape that paid Langhe farmers before the Barolo was sold.",
 official="Dolcetto d'Alba"))

apps.append(A("Verduno Pelaverga", "DOC", P, "Langhe", "1995", 30, ["red"], "Pelaverga Piccolo (min 85%)",
 "A micro-DOC in Verduno and parts of La Morra and Roddi for Pelaverga Piccolo, a pale, low-tannin red that smells of white pepper, strawberry and rose. Fewer than 30 hectares exist. Castello di Verduno, G.B. Burlotto and Fratelli Alessandria are the key producers, and the wine is a favourite of Langhe sommeliers as a chilled aperitivo red.",
 "Tortonian marls on the north-western edge of the Barolo zone near the Tanaro.", ["G.B. Burlotto", "Castello di Verduno", "Fratelli Alessandria", "Diego Morra"],
 "Pelaverga Piccolo is unrelated to the Pelaverga of Saluzzo, a different variety grown in the Colline Saluzzesi.",
 official="Verduno Pelaverga / Verduno", match=["Verduno"]))

apps.append(A("Barbera d'Asti", "DOCG", P, "Monferrato", "DOC 1970, DOCG 2008", None, ["red"], "Barbera (min 90%)",
 "The largest red DOCG of Piedmont and Barbera's home ground. On the Monferrato hills around Asti, Barbera gives juicy, high-acid, low-tannin wines tasting of sour cherry and plum, ideal with food and usually better value than Barbera d'Alba. The modern reputation dates from 1982, when Giacomo Bologna of Braida released Bricco dell'Uccellone, a barrique-aged Barbera from Rocchetta Tanaro that showed the grape could be grand. The Superiore requires 14 months' ageing with six in wood. Its former subzones Tinella and Colli Astiani remain, while the former Nizza subzone became its own DOCG.",
 "Calcareous marls and sands of the Monferrato hills, 200 to 400 metres.",
 ["Braida", "Coppo", "Vietti", "Prunotto", "Michele Chiarlo", "Cascina Castlèt", "Tenuta Olim Bauda", "Scarpa"],
 "The 1986 methanol scandal, in which cheap Barbera was laced with methanol and killed more than 20 people, nearly destroyed Barbera's reputation; the quality revolution of Braida and its peers is the story of its rebirth.",
 official="Barbera d'Asti"))

apps.append(A("Nizza", "DOCG", P, "Monferrato", "Subzone 2000, DOCG 2014 (separately registered 2019)", None, ["red"], "Barbera (100%)",
 "Nizza is the summit of Barbera: 100% Barbera from 18 communes around Nizza Monferrato, at least 18 months of ageing with six in wood (Riserva 30 months with 12 in wood), and lower yields than Barbera d'Asti. The wines are dark, dense and high in acid, with the balance to age ten years. It began as a subzone of Barbera d'Asti, was promoted to DOCG in 2014 and registered as an independent denomination in 2019. 'Vigna' names are allowed.",
 "Calcareous marls and sandstones; south- to south-west-facing hills at 150 to 400 metres. Vineyards must be on hillside slopes with good exposure.",
 ["Michele Chiarlo", "Tenuta Olim Bauda", "Bersano", "Cascina La Barbatella", "Braida", "Coppo", "Tenuta Garetto"],
 "The name causes confusion with Nice, which in Italian is also Nizza; producers lobbied for the full name 'Nizza Monferrato' but the DOCG is simply 'Nizza'.",
 official="Nizza"))

apps.append(A("Asti", "DOCG", P, "Monferrato", "DOC 1967, DOCG 1993", 9700, ["sparkling", "sweet", "white"], "Moscato Bianco (100%)",
 "Asti is the sweet, aromatic sparkling wine of the Monferrato and Langhe hills, and one of Italy's largest denominations, with tens of millions of bottles a year. It comes in two styles. Asti Spumante (now usually just 'Asti') is fully sparkling, made by fermenting chilled Moscato must in pressurised tanks (the Martinotti or charmat method) and stopping at around 7% alcohol. Moscato d'Asti is *frizzante*, sealed with a regular cork, lighter in bubbles and alcohol (around 5%), and often from more careful growers. Both taste of fresh grapes, peach, sage and orange blossom.\n\nThe story begins with Carlo Gancia, who learned in Reims and in 1865 made Italy's first sparkling wine at Canelli by the traditional method, then developed the sweet Moscato Champagne that became Asti Spumante. In 2017 a dry 'Asti Secco' style was added. Small growers like Saracco, Vietti, La Spinetta and Ca' d'Gal make Moscato d'Asti of real finesse. The Canelli subzone left to become its own DOCG in 2023.",
 "White calcareous marls (Sant'Agata Fossil Marls) and sandstones in the Belbo and Bormida valleys, on steep slopes up to 500 metres.",
 ["Gancia", "Bosca", "Saracco", "Vietti", "La Spinetta", "Ca' d'Gal", "Elio Perrone", "Marenco"],
 "Moscato d'Asti is one of the few wines whose fermentation is stopped by chilling and filtration rather than fortification, so the residual sugar is pure grape sugar.",
 official="Asti", match=["Moscato d'Asti", "Asti Spumante"]))

apps.append(A("Canelli", "DOCG", P, "Monferrato", "2023", 100, ["white", "sweet", "sparkling"], "Moscato Bianco (100%)",
 "Italy's 78th DOCG and Piedmont's most recent, split off from Asti in 2023 after almost twenty years of lobbying. Canelli covers 18 communes in Asti and Cuneo provinces around the town that invented Italian sparkling wine, with about 100 hectares and roughly 500,000 bottles. Rules are stricter than for Asti: hand harvesting only, vineyards at 165 to 500 metres and a maximum yield of 9.5 tonnes per hectare (Asti allows 10). The style is Moscato d'Asti-like frizzante, often with more intensity and saline length, plus Riserva.",
 "White calcareous marls of the Belbo valley, steep and often terraced, with famous slopes around Canelli, Calosso and Santo Stefano Belbo.",
 ["Coppo", "Bosca", "Contratto", "Gancia", "Paolo Saracco", "Ca' d'Gal"],
 "The 'underground cathedrals' of Canelli (the cellars of Gancia, Bosca, Contratto and Coppo, dug into the hill in the 19th century) form a core zone of the UNESCO Langhe-Roero and Monferrato site.",
 official="Canelli"))

apps.append(A("Alta Langa", "DOCG", P, "Alta Langa", "DOC 2002, DOCG 2011", None, ["sparkling"], "Pinot Nero and Chardonnay (min 90% together)",
 "Piedmont's answer to Champagne and Franciacorta: metodo classico sparkling wine from Pinot Nero and Chardonnay grown in the high Langhe, Roero and Monferrato at 250 metres or more. Every wine is vintage-dated and spends at least 30 months on the lees (Riserva 36). The project goes back to 1990, when the big Asti houses (Gancia, Fontanafredda, Martini & Rossi and others) planted experimental vineyards to bring sparkling-wine grapes back to Piedmont, reviving the tradition that Carlo Gancia started in 1865.",
 "Marls and sandstones of the upper Langhe, often at 400 to 700 metres where the cool nights keep acidity high.",
 ["Ettore Germano", "Enrico Serafino", "Fontanafredda", "Gancia", "Coppo", "Cocchi", "Marcalberto"],
 "Alta Langa is the only Italian sparkling DOCG that requires every bottle to carry a vintage.",
 official="Alta Langa"))

apps.append(A("Brachetto d'Acqui", "DOCG", P, "Monferrato", "DOC 1969, DOCG 1996", None, ["sweet", "sparkling", "red"], "Brachetto (min 97%)",
 "A sweet, rose-scented red fizz from around Acqui Terme, low in alcohol (about 5 to 6.5%) and tasting of strawberries and roses. It is made spumante or frizzante, and there is also a sweet passito. Banfi's investment in the 1990s made it fashionable in America as a Valentine's Day wine.",
 "Calcareous marls of the Bormida valleys.", ["Banfi (Vigne Regali)", "Braida", "Marenco"],
 "Local legend claims Cleopatra seduced Antony and Caesar with Brachetto, a story that turns up on many back labels.",
 official="Brachetto d'Acqui / Acqui", match=["Acqui"]))

apps.append(A("Gavi", "DOCG", P, "Alto Monferrato", "DOC 1974, DOCG 1998", None, ["white", "sparkling"], "Cortese (100%)",
 "Gavi is Piedmont's best-known white, made from Cortese in eleven communes around the hill town of Gavi near the Ligurian border. It is crisp, lemony and almond-finishing, a classic with the seafood of Genoa, the city whose nobles owned estates here. Wines from the commune of Gavi itself may be labelled 'Gavi del Comune di Gavi'. Villa Sparina, La Scolca (whose Gavi dei Gavi black label was the first prestige Gavi in the 1960s) and Broglia are reference producers; Riserva and spumante versions exist.",
 "White marls and red clays: the north has white calcareous marls, the south redder, iron-rich clays. The Ligurian sea air arrives through the Apennine passes.",
 ["La Scolca", "Villa Sparina", "Broglia", "Nicola Bergaglio", "Castellari Bergaglio", "La Raia"],
 "Gavi del Comune di Gavi is often mislabelled 'Gavi di Gavi', the name La Scolca registered as a trademark.",
 official="Gavi / Cortese di Gavi", match=["Cortese di Gavi", "Gavi del Comune di Gavi"]))

apps.append(A("Colli Tortonesi", "DOC", P, "Tortonese", "1973", None, ["white", "red", "sparkling", "sweet"], "Timorasso, Barbera, Cortese, Croatina, Dolcetto, Freisa, Moscato and others",
 "The hills around Tortona, in the far south-east of Piedmont toward Lombardy and Liguria, are now famous for one grape: Timorasso. Nearly extinct by the 1980s, it was revived by Walter Massa of Monleale from 1987, and its wines, labelled Derthona (the Roman name of Tortona), are powerful whites with honey, petrol and stone, compared to Riesling and capable of ageing a decade. Growth has been explosive: the area under the grape rose from about 100 hectares in 2016 to more than 500 by 2026, and about 1.75 million bottles were released in 2025, more than double the year before. In 2026 the consortium set new planting permissions to zero to protect prices. Barbera and Croatina reds are traditional.",
 "Grey-white calcareous marls of the Val Curone, Val Grue and Val Borbera (Sant'Agata Fossil Marls), at 200 to 500 metres.",
 ["Vigneti Massa", "Luigi Boveri", "Claudio Mariotto", "La Colombera", "Vietti", "Borgogno", "Giovanni Daglio"],
 "Langhe heavyweights like Vietti, Borgogno and Roagna bought into Timorasso in the 2010s, a sign of how seriously Barolo producers take it.",
 official="Colli Tortonesi", match=["Derthona", "Colli Tortonesi Timorasso"]))

apps.append(A("Gattinara", "DOCG", P, "Alto Piemonte", "DOC 1967, DOCG 1990", 100, ["red"], "Nebbiolo (Spanna) min 90%, Vespolina and Uva Rara up to 10%",
 "The flagship of northern Piedmont. Gattinara is Nebbiolo grown on steep slopes of volcanic porphyry above the Sesia river, aged at least 35 months (Riserva 47) and famous for its iron, rose and orange-peel aromatics and racy acidity. In the 19th century this was one of Piedmont's most important wines; by the 1990s it had shrunk to under 100 hectares. Antoniolo, Travaglini (with its distinctive curved bottle), Nervi (bought by Roberto Conterno of Giacomo Conterno in 2018) and Torraccia del Piantavigna lead the revival.",
 "Acidic, mineral soils from the Permian Sesia supervolcano (rhyolites and porphyries), rich in iron and poor in calcium, giving high acidity and fine but firm tannins.",
 ["Antoniolo", "Travaglini", "Nervi-Conterno", "Torraccia del Piantavigna", "Paride Iaretti", "Giancarlo Travaglini"],
 "Roberto Conterno's purchase of Nervi in 2018 was the clearest sign that Barolo's elite now regard Alto Piemonte as Nebbiolo's next frontier.",
 official="Gattinara"))

apps.append(A("Ghemme", "DOCG", P, "Alto Piemonte", "DOC 1969, DOCG 1997", None, ["red"], "Nebbiolo (min 85%), Vespolina and Uva Rara",
 "Ghemme faces Gattinara across the Sesia on the Novara side. Its soils are glacial moraine rather than volcanic rock, which gives a slightly rounder, softer Nebbiolo. It ages for at least 34 months (Riserva 46) with 18 in wood. Antichi Vigneti di Cantalupo, Ioppa and Torraccia del Piantavigna are the main names.",
 "Glacial moraine of the Monte Rosa glacier: pebbly, acidic clays and sands with good drainage.",
 ["Antichi Vigneti di Cantalupo", "Ioppa", "Torraccia del Piantavigna", "Rovellotti"],
 "The Romans recorded vines on the Ghemme moraine hill, and the village's medieval *ricetto* (fortified storage hamlet) still holds wine cellars.",
 official="Ghemme"))

apps.append(A("Carema", "DOC", P, "Canavese", "1967", 17, ["red"], "Nebbiolo (min 85%)",
 "Carema is Nebbiolo in the mountains: a single village at the mouth of the Aosta Valley where vines grow on stone-and-lime pillars (*pilun*) supporting pergolas (*topie*), on terraces cut from the rock between 300 and 700 metres. The pillars soak up daytime heat and release it at night, letting Nebbiolo ripen at the edge of its range. The wines are pale, fragrant and long-lived. Ferrando's black-label Carema and the Cantina dei Produttori Nebbiolo di Carema (a co-op founded in 1960) produce almost all of it.",
 "Thin, sandy, acidic morainic and granitic soils over rock, on steep terraces.",
 ["Ferrando", "Produttori Nebbiolo di Carema", "Monte Maletto"],
 "Carema is one of the smallest DOCs in Italy, with about 17 hectares, and the area under vine has shrunk by roughly 80% since the 1950s.",
 official="Carema"))

apps.append(A("Erbaluce di Caluso", "DOCG", P, "Canavese", "DOC 1967, DOCG 2010", None, ["white", "sparkling", "sweet"], "Erbaluce (100%)",
 "Erbaluce is a high-acid white grape grown on the morainic amphitheatre of Ivrea north of Turin. Dry Erbaluce is citrusy and saline; sparkling Caluso Spumante is metodo classico; and Caluso Passito, from grapes dried until spring, is an amber sweet wine of real distinction. Orsolani and Ferrando are reference houses.",
 "The Morainic Amphitheatre of Ivrea, one of the best-preserved glacial moraines in Europe: sandy, stony, acidic soils.",
 ["Orsolani", "Ferrando", "Cieck", "Favaro", "La Masera"],
 "Legend says the grape is named after Albaluce, a nymph born of the dawn whose tears made the vines grow.",
 official="Erbaluce di Caluso / Caluso", match=["Caluso"]))

apps.append(A("Ruchè di Castagnole Monferrato", "DOCG", P, "Monferrato", "DOC 1987, DOCG 2010", None, ["red"], "Ruchè (min 90%)",
 "A tiny DOCG for Ruchè, an aromatic red grape grown in seven communes around Castagnole Monferrato. It smells of rose petals, violets, white pepper and cinnamon, with moderate tannin. Its revival is credited to the parish priest Don Giacomo Cauda, who replanted it in the 1960s and 1970s. Montalbera and Luca Ferraris are the main producers.",
 "Calcareous clay and sandy marls in the hills north-east of Asti.", ["Montalbera", "Luca Ferraris", "Bersano", "Crivelli"],
 "Don Cauda's parish vineyard is still known as the 'Vigna del Parroco'.",
 official="Ruchè di Castagnole Monferrato"))

apps.append(A("Terre Alfieri", "DOCG", P, "Roero and Asti", "DOC 2009, DOCG 2020", None, ["white", "red"], "Arneis (min 85%) or Nebbiolo (min 85%)",
 "A small DOCG approved in October 2020 for Arneis and Nebbiolo from eleven communes straddling Asti and Cuneo provinces: Antignano, Celle Enomondo, Cisterna d'Asti, Revigliasco, San Damiano, San Martino Alfieri and Tigliole in Asti, and Castellinaldo, Govone, Magliano Alfieri and Priocca in Cuneo. Named after the Alfieri family (the poet Vittorio Alfieri's line), it extends the Roero style eastward.",
 "Sandy marine soils similar to the eastern Roero.", ["Bricco Gallo", "San Martino Alfieri"],
 "It was one of the last DOCGs approved before Canelli in 2023.",
 official="Terre Alfieri"))

apps.append(A("Grignolino d'Asti", "DOC", P, "Monferrato", "1973", None, ["red"], "Grignolino (min 90%)",
 "Grignolino is the Monferrato's idiosyncratic pale red: almost rosé in colour but with surprising tannin from its many seeds (*grignole* in dialect), and aromas of white pepper, wild strawberry and orange peel. Drink it young and cool. Luigi Veronelli called it 'anarchic and individualist'.",
 "Sandy-calcareous hills north of the Tanaro.", ["Braida", "Cascina Tavijn", "Crivelli", "Montalbera"],
 "The grape's name probably comes from *grignole*, the dialect word for its pips.", official="Grignolino d'Asti"))

apps.append(A("Grignolino del Monferrato Casalese", "DOC", P, "Monferrato", "1974", None, ["red"], "Grignolino (min 90%)",
 "Grignolino from the Casale side of the Monferrato, where it may be at its finest. Accornero, Bricco Mondalino and Castello di Gabiano are key producers.",
 "Pietra da Cantoni sandstone and marls of the Casalese.", ["Accornero", "Bricco Mondalino", "Castello di Gabiano"],
 "The Casalese hills are dotted with *infernot*, little cellars cut into soft sandstone, protected by UNESCO since 2014.",
 official="Grignolino del Monferrato Casalese"))

apps.append(A("Freisa d'Asti", "DOC", P, "Monferrato", "1972", None, ["red", "sparkling"], "Freisa (100%)",
 "Freisa, a close relative of Nebbiolo, makes wines with raspberry fruit, bitter tannin and often a light fizz. It can be still, frizzante, spumante or sweet.",
 "Monferrato hills of Asti.", ["Cascina Gilli"], "DNA shows Freisa is a parent or offspring of Nebbiolo.", official="Freisa d'Asti"))

apps.append(A("Freisa di Chieri", "DOC", P, "Collina Torinese", "1973", None, ["red", "sparkling", "sweet"], "Freisa (min 90%)",
 "Freisa grown in the hills east of Turin around Chieri, historically the Turin aristocracy's everyday red, often lightly sparkling and sometimes sweet.",
 "Sandy marls of the Turin hills.", ["Balbiano", "Martini & Sola"], "Chieri's Freisa was the house wine of the Savoy court in Turin.", official="Freisa di Chieri"))

apps.append(A("Dolcetto di Ovada", "DOC", P, "Alto Monferrato", "1972", None, ["red"], "Dolcetto (100%)",
 "The DOC for Dolcetto from the Ovada hills near the Ligurian border. The higher-quality 'Ovada' or Dolcetto di Ovada Superiore is a separate DOCG. Ovada Dolcetto is darker and more tannic than the Alba version.",
 "Red clays and marls of the Orba and Stura valleys.", ["Rocco di Carpeneto", "Cascina Gentile"], "Dolcetto from Ovada was once called the 'Dolcetto of the Genoese'.",
 official="Dolcetto di Ovada"))

apps.append(A("Ovada", "DOCG", P, "Alto Monferrato", "2008", None, ["red"], "Dolcetto (100%)",
 "DOCG Dolcetto from Ovada, requiring at least a year of ageing (Riserva and Vigna versions two). The strong red clays give deeply coloured, age-worthy wines quite unlike the light Dolcetto of popular imagination.",
 "Iron-rich red clays (terre rosse) and marls on hills that catch the Ligurian sea air.", ["Rocco di Carpeneto", "Tacchino", "Forti del Vento"],
 "Ovada producers fought for the shorter name 'Ovada' to escape the image of Dolcetto as a light quaffer.", official="Dolcetto di Ovada Superiore / Ovada", match=["Dolcetto di Ovada Superiore"]))

apps.append(A("Boca", "DOC", P, "Alto Piemonte", "1969", 20, ["red"], "Nebbiolo (70 to 90%), Vespolina and/or Uva Rara",
 "Boca is tiny (about 20 hectares) and mountainous, on porphyry soils of the Sesia supervolcano at 400 to 550 metres. The Swiss Christoph Künzli of Le Piane, mentored by local veteran Antonio Cerri, revived it from near abandonment from 1998, and the wines (with maggiorina-trained old vines) are some of the most thrilling in Alto Piemonte.",
 "Acidic volcanic porphyry, the most dramatic outcrop of the Sesia Supervolcano geopark.", ["Le Piane", "Davide Carlone", "Castello Conti"],
 "Old Boca vineyards use the *maggiorina* system, three vines trained together on a single post into a kind of tree.", official="Boca"))

apps.append(A("Bramaterra", "DOC", P, "Alto Piemonte", "1979", None, ["red"], "Nebbiolo (50 to 80%), Croatina, Uva Rara and/or Vespolina",
 "Hill wine from seven communes in Biella and Vercelli provinces on volcanic porphyry, blending Nebbiolo with Croatina and Vespolina. Colombera & Garella and Le Pianelle are leading names.",
 "Volcanic porphyries and marine sands.", ["Colombera & Garella", "Le Pianelle", "Antoniotti Odilio"],
 "Antoniotti's Bramaterra is still made in an old wooden press and cement tanks from the 1900s.", official="Bramaterra"))

apps.append(A("Lessona", "DOC", P, "Alto Piemonte", "1976", 20, ["red"], "Nebbiolo (min 85%)",
 "A small DOC near Biella on marine yellow sands, making delicate, saline Nebbiolo. Proprietà Sperino (Paolo De Marchi of Tuscany's Isole e Olena returned to his family's roots here) and Tenute Sella, family of the 19th-century statesman Quintino Sella, lead.",
 "Pliocene yellow marine sands, acidic and full of fossil shells.", ["Proprietà Sperino", "Tenute Sella", "La Prevostura"],
 "Tenute Sella has been bottling Lessona since 1671.", official="Lessona"))

apps.append(A("Fara", "DOC", P, "Alto Piemonte", "1969", 10, ["red"], "Nebbiolo (50 to 70%), Vespolina up to 50%",
 "A tiny DOC on the moraine hills of Fara Novarese and Briona, Nebbiolo softened with peppery Vespolina.",
 "Glacial moraine.", ["Castello Conti", "Dessilani"], "Vespolina gives the wine a striking white-pepper note from the compound rotundone.", official="Fara"))

apps.append(A("Sizzano", "DOC", P, "Alto Piemonte", "1969", 10, ["red"], "Nebbiolo (50 to 70%), Vespolina and/or Uva Rara",
 "One of the smallest DOCs in Italy, on the moraine between Ghemme and Fara. Cavour reportedly compared it to Burgundy.",
 "Glacial moraine.", ["Dessilani", "Bianchi"], "Only a handful of producers bottle Sizzano.", official="Sizzano"))

apps.append(A("Coste della Sesia", "DOC", P, "Alto Piemonte", "1996", None, ["red", "white", "rose"], "Nebbiolo, Croatina, Vespolina, Bonarda, Erbaluce",
 "The umbrella DOC for the Vercelli and Biella hills of Alto Piemonte, used for Nebbiolo (Spanna) and blends that fall outside Gattinara, Lessona and Bramaterra.",
 "Volcanic and sandy soils west of the Sesia.", ["Proprietà Sperino", "Travaglini", "Le Pianelle"], "Many of Alto Piemonte's best values hide under this name.", official="Coste della Sesia"))

apps.append(A("Colline Novaresi", "DOC", P, "Alto Piemonte", "1994", None, ["red", "white", "rose"], "Nebbiolo, Vespolina, Croatina, Uva Rara, Erbaluce",
 "The umbrella DOC for the Novara side of Alto Piemonte, covering Nebbiolo, Vespolina and Erbaluce outside Ghemme, Boca, Fara and Sizzano.",
 "Moraine and porphyry hills east of the Sesia.", ["Le Piane", "Ioppa", "Mazzoni"], "Vespolina varietals labelled Colline Novaresi are a peppery cult curiosity.", official="Colline Novaresi"))

apps.append(A("Valli Ossolane", "DOC", P, "Alto Piemonte", "2009", 10, ["red", "white"], "Nebbiolo (Prünent), Croatina, Merlot, Chardonnay",
 "Alpine vineyards in the Ossola valleys near Domodossola, on the way to the Simplon Pass. Nebbiolo here is called Prünent and grows on stone pergolas.",
 "Gneiss and granite soils on steep terraces.", ["Cantine Garrone"], "Prünent is one of the oldest documented local names for Nebbiolo, recorded in 1309.", official="Valli Ossolane"))

apps.append(A("Canavese", "DOC", P, "Canavese", "1996", None, ["red", "white", "rose"], "Nebbiolo, Barbera, Erbaluce, Uva Rara, Neretto",
 "The umbrella DOC for the Canavese north of Turin, around Ivrea and Caluso, covering Nebbiolo and Barbera reds and Erbaluce whites outside Carema and Caluso.",
 "Glacial moraine of the Ivrea amphitheatre.", ["Orsolani", "Cieck"], "Ivrea's moraine is so large that geologists use it as a textbook example of a glacial amphitheatre.", official="Canavese"))

apps.append(A("Barbera del Monferrato Superiore", "DOCG", P, "Monferrato", "2008", None, ["red"], "Barbera (min 85%)",
 "DOCG Barbera from the Monferrato Casalese and Alessandria hills, aged 14 months with six in wood. Less known than Barbera d'Asti but often good value.",
 "Calcareous marls and sandstones.", ["Accornero", "Iuli", "Vicara"], "Iuli's Barbera from Montaldo, near Cerrina, has a cult following among natural-wine drinkers.",
 official="Barbera del Monferrato Superiore"))

apps.append(A("Barbera del Monferrato", "DOC", P, "Monferrato", "1970", None, ["red", "sparkling"], "Barbera (min 85%)",
 "The everyday Monferrato Barbera, sometimes lightly fizzy (*vivace*), the wine of Piedmontese osterie.",
 "Monferrato marls and sands.", ["Accornero", "Vicara"], "The frizzante versions recall the way Barbera was drunk in the 19th century.", official="Barbera del Monferrato"))

apps.append(A("Monferrato", "DOC", P, "Monferrato", "1994", None, ["red", "white", "rose"], "Barbera, Dolcetto, Freisa, Nebbiolo, Cortese, Chiaretto and others",
 "The umbrella DOC for the provinces of Asti and Alessandria, used for blends and international grapes (Monferrato Rosso, Bianco, Chiaretto) and for Dolcetto and Freisa outside their own DOCs.",
 "Rolling Monferrato hills.", ["Braida", "Michele Chiarlo", "Vietti"], "Braida's Il Bacialé, a Barbera-based blend, is one of the best-known Monferrato Rosso wines.", official="Monferrato"))

apps.append(A("Piemonte", "DOC", P, None, "1994", None, ["red", "white", "rose", "sparkling", "sweet"], "Barbera, Bonarda, Brachetto, Chardonnay, Cortese, Dolcetto, Grignolino, Moscato, Pinot Nero and many others",
 "The regional DOC covering the hills of Asti, Alessandria and Cuneo and parts of Turin province. Because Piedmont has no IGT, it is the safety net for varietal and blended wines that do not fit a local DOC, including Piemonte Moscato and Piemonte Barbera.",
 "Varies across Piedmont's hill country.", [], "Piedmont is the only major Italian region with no IGT, so Piemonte DOC does the job an IGT does elsewhere.",
 official="Piemonte"))

def small(name, cat, sub, created, styles, grapes, summary, producers=(), nerd="", official=None, match=()):
    apps.append(A(name, cat, P, sub, created, None, styles, grapes, summary, "", producers, nerd, official=official or name, match=match))

small("Dolcetto d'Acqui", "DOC", "Monferrato", "1972", ["red"], "Dolcetto (100%)", "Dolcetto from the hills around Acqui Terme, lighter than Dogliani and Ovada. Often fresh and perfumed.", nerd="Acqui's thermal springs have been used since Roman times.")
small("Dolcetto d'Asti", "DOC", "Monferrato", "1974", ["red"], "Dolcetto (100%)", "Dolcetto from the south of Asti province, fruity and meant for early drinking.", nerd="Most Dolcetto d'Asti comes from the Langa Astigiana around Canelli and Calosso.")
small("Cortese dell'Alto Monferrato", "DOC", "Alto Monferrato", "1979", ["white", "sparkling"], "Cortese (min 85%)", "Cortese from a wide zone in Asti and Alessandria provinces outside Gavi; light, fresh whites and sparklers.")
small("Loazzolo", "DOC", "Langa Astigiana", "1992", ["sweet"], "Moscato Bianco (100%)", "One of Italy's smallest DOCs: a passito of late-harvested, often botrytised Moscato Bianco from terraces around Loazzolo, aged two years. Forteto della Luja and Borgo Maragliano are the reference producers.", ["Forteto della Luja", "Borgo Maragliano"], "Forteto della Luja's vineyards are also a WWF oasis for wild orchids.")
small("Strevi", "DOC", "Monferrato", "2005", ["sweet"], "Moscato Bianco (100%)", "A tiny DOC for passito Moscato from the commune of Strevi near Acqui Terme, separated from Asti in 2005.", ["Marenco"], "Strevi is one of only a few Italian communes with a DOC solely for dried-grape Moscato.")
small("Calosso", "DOC", "Langa Astigiana", "2011", ["red"], "Gamba di Pernice (min 90%)", "A micro-DOC for Gamba di Pernice ('partridge's leg', after its red stalks), a spicy red grape found only around Calosso.", nerd="Fewer than 20 hectares of Gamba di Pernice exist.")
small("Cisterna d'Asti", "DOC", "Roero", "2002", ["red", "sweet"], "Croatina (min 80%)", "A small DOC on the Roero-Asti border for Croatina reds, still or frizzante.", nerd="Cisterna's castle houses a museum of peasant arts and trades.")
small("Albugnano", "DOC", "Monferrato", "1997", ["red", "rose"], "Nebbiolo (min 85%)", "Nebbiolo from four communes on the high hills of north Asti, near the Romanesque abbey of Vezzolano. Light, fresh and acid-driven.", nerd="Albugnano is the highest village in the province of Asti, at about 550 metres.")
small("Malvasia di Casorzo", "DOC", "Monferrato", "1968", ["sweet", "sparkling", "red"], "Malvasia Nera di Casorzo (min 90%)", "Sweet, aromatic red or rosé fizz from Malvasia Nera di Casorzo, around Casorzo and Grana in the north Monferrato.", official="Malvasia di Casorzo d'Asti / Malvasia di Casorzo / Casorzo", match=["Malvasia di Casorzo d'Asti", "Casorzo"])
small("Malvasia di Castelnuovo Don Bosco", "DOC", "Monferrato", "1973", ["sweet", "sparkling", "red"], "Malvasia di Schierano (min 85%)", "Sweet red fizz from Malvasia di Schierano in the hills around the birthplace of Saint John Bosco.", nerd="Castelnuovo is also the birthplace of Saint Joseph Cafasso, earning it the nickname 'town of saints'.")
small("Rubino di Cantavenna", "DOC", "Monferrato", "1970", ["red"], "Barbera (75 to 90%), Grignolino and/or Freisa", "A historic blend from three communes near the Po in the Casalese, now made by very few producers.", nerd="One of the rarest DOC wines in Italy; production is tiny.")
small("Gabiano", "DOC", "Monferrato", "1983", ["red"], "Barbera (90 to 95%), Freisa and/or Grignolino", "A one-estate-dominated DOC around the castle of Gabiano above the Po, for Barbera-based reds.", ["Castello di Gabiano"], "Castello di Gabiano has been in the Cattaneo Adorno family since the 17th century.")
small("Collina Torinese", "DOC", "Collina Torinese", "1999", ["red"], "Barbera, Bonarda, Malvasia, Pelaverga", "Light reds from the hills around Turin, including Collina Torinese Bonarda and Malvasia.")
small("Colline Saluzzesi", "DOC", "Cuneo", "1996", ["red", "white"], "Pelaverga, Quagliano, Barbera, Nebbiolo", "Hill wines around Saluzzo at the foot of Monviso, including the rare Pelaverga and the sweet sparkling Quagliano.", nerd="Pelaverga di Saluzzo is a different variety from Verduno's Pelaverga Piccolo.")
small("Pinerolese", "DOC", "Pinerolese", "1996", ["red", "rose"], "Barbera, Bonarda, Dolcetto, Freisa, Avanà, Doux d'Henry, Ramìe", "Mountain reds from the Pinerolo valleys west of Turin, including the rare Ramìe and Doux d'Henry.", nerd="Doux d'Henry is said to be named after Henry IV of France.")
small("Valsusa", "DOC", "Valle di Susa", "1997", ["red"], "Avanà, Barbera, Dolcetto, Neretta Cuneese", "Alpine reds from the Susa valley on the road to France, based on the local Avanà.", nerd="Some vineyards sit above 1,000 metres near the Montcenis road.")

if __name__ == '__main__':
    save('p1_piedmont_apps', regions, apps, [])
