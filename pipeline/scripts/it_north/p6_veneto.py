import sys
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import A, R, S, save

SRC = [
    ("EU eAmbrosia register (Veneto PDOs)", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, EU wine PDO geospatial inventory", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("QdS: Consorzio Valpolicella, 57.5 million bottles in 2025 (July 2026)", "https://qds.it/consorzio-valpolicella-nel-2025-sul-mercato-575-mln-bottiglie-3/"),
    ("Wikipedia: Amarone", "https://en.wikipedia.org/wiki/Amarone"),
    ("The Drinks Business: Soave approves 33 new crus (Sept 2020)", "https://www.thedrinksbusiness.com/2020/09/soave-approves-33-new-crus/"),
    ("Wine Industry Advisor: Prosecco DOC production reaches 667 million bottles in 2025", "https://wineindustryadvisor.com/2026/01/19/prosecco-doc-keeps-growing-in-the-united-states-as-production-reaches-667-million-bottles-in-2025/"),
    ("Il NordEst: Prosecco DOC, 6,050 new hectares (Dec 2025)", "https://www.ilnordest.it/economia/imprese/prosecco-doc-ampliamento-ettari-veneto-fvg-2025-chcrh1zl"),
    ("Consorzio Conegliano Valdobbiadene: types of wine", "https://www.prosecco.it/en/conegliano-valdobbiadene-prosecco-superiore-docg/types-of-wine/"),
]

regions = [
R("Veneto", [], None, 45.6, 11.8, 7.8,
  "Italy's biggest wine producer: Prosecco by the ocean-load, but also Amarone from raisined grapes, volcanic Soave and the lagoon light of Venice.",
  "Veneto makes more wine than any other Italian region, around 11 to 13 million hectolitres a year, more than many entire countries, and it is the engine of Italy's export success. Prosecco alone, shared with Friuli, now exceeds 660 million bottles a year. But volume hides extraordinary diversity. In the west, around Verona, the hills of Valpolicella make Amarone and Recioto from grapes dried for months in lofts, and Soave's volcanic and limestone hills make one of Italy's great white wines from Garganega. Lake Garda's eastern shore gives Bardolino's light reds and Chiaretto and the whites of Custoza and Lugana. To the east, the steep hills between Conegliano and Valdobbiadene, a UNESCO World Heritage site since 2019, are the historic core of Prosecco; the Colli Euganei and Colli Berici are volcanic and limestone islands near Padua and Vicenza; and the flat Piave and Lison plains toward Venice grow Raboso, Merlot and Tai.",
  "The Venetic peoples and then the Romans grew vines here; the Valpolicella's raisined wines descend from the *Acinatico* that Cassiodorus, minister to the Gothic king Theodoric, described around AD 500. For centuries the Republic of Venice (to 1797) dominated the wine trade of the eastern Mediterranean, importing Malvasia from Crete and Monemvasia while drinking local wines from the *terraferma*. In 1876 Italy's first school of oenology opened at Conegliano, and its graduates shaped the modern Prosecco industry, from Antonio Carpenè's early sparkling wines to the tank method perfected by the school's teachers.\n\nThe 20th century saw Valpolicella and Soave industrialised by large cooperatives and merchants, and their reputations suffered in the 1970s and 1980s from overproduction. The revival came through growers like Giuseppe Quintarelli and Romano Dal Forno in Valpolicella and Leonildo Pieropan and Roberto Anselmi in Soave. Prosecco exploded after 2009, when the DOC was extended to nine provinces across Veneto and Friuli and the grape was renamed Glera to protect the name. Today Prosecco is the world's best-selling sparkling wine.",
  "Veneto stretches from the Dolomites to the Adriatic lagoon. The Lessini Mountains, a limestone and basalt plateau north of Verona, send long ridges south that form the valleys of Valpolicella and Soave; the eastern ridges are volcanic, with dark basalts and tuffs from Eocene eruptions, while the western ones are limestone and marl. The Prosecco hills are steep 'hogbacks' (*ciglioni*) of marine sandstone and conglomerate in the Pre-Alps. The plains are alluvial gravels and clays. The climate is continental with warm summers; the Alps shelter the north from cold winds, and the Adriatic brings humidity to the east.",
  "Glera (Prosecco), Garganega (Soave, Gambellara), Corvina, Corvinone, Rondinella and Molinara (Valpolicella, Bardolino), Trebbiano di Soave, Durella (Lessini), Vespaiola (Breganze), Raboso (Piave), Tai (Friulano), Moscato Giallo (Fior d'Arancio), Pinot Grigio (the delle Venezie DOC), Merlot, Cabernet and Carmenère.",
  "Sparkling Prosecco; dried-grape reds and sweet wines (Amarone, Recioto, Torcolato); mineral whites (Soave); light reds and rosé from Garda.",
  "Fourteen DOCGs and around 29 DOCs. Soave has 33 UGAs (2019); Conegliano Valdobbiadene has 43 Rive and the Cartizze subzone; Valpolicella has the Classico, Valpantena and eastern zones.",
  ["Amarone della Valpolicella", "Recioto della Valpolicella", "Valpolicella", "Valpolicella Ripasso", "Soave", "Soave Superiore", "Recioto di Soave", "Conegliano Valdobbiadene Prosecco", "Asolo Prosecco", "Prosecco", "Bardolino", "Bardolino Superiore", "Custoza", "Lugana", "Gambellara", "Recioto di Gambellara", "Lessini Durello", "Breganze", "Colli Euganei", "Colli Euganei Fior d'Arancio", "Colli Berici", "Piave", "Piave Malanotte", "Lison", "Lison-Pramaggiore", "Montello Rosso", "Bagnoli Friularo", "delle Venezie", "Venezia"],
  SRC),
]

V = "Veneto"
apps = []
apps.append(A("Amarone della Valpolicella", "DOCG", V, "Valpolicella", "DOC 1990, DOCG 2010", 8614, ["red"], "Corvina and Corvinone (45 to 95%), Rondinella (5 to 30%), plus up to 25% other local reds such as Molinara and Oseleta",
 "Amarone is one of the world's most distinctive red wines: dry, powerful (often 15 to 16.5% alcohol) and opulent, made from grapes that have spent three to four months drying (*appassimento*) in airy lofts called *fruttai* until they have lost 30 to 45% of their weight. The concentrated sugars ferment fully dry, giving flavours of dried cherry, fig, chocolate, tobacco and spice with a bitter twist on the finish (*amaro* means bitter, and Amarone means 'big bitter').\n\nIt was born almost by accident. Valpolicella's traditional dried-grape wine was the sweet Recioto, and Amarone was originally a Recioto that had fermented all the way to dryness, a fault. The name is said to have been coined in 1936 by Adelino Lucchese, cellar master at the Cantina Sociale Valpolicella, when he tasted such a cask, and Bolla, Bertani and others began selling it commercially in the 1950s. It became a DOC within Recioto della Valpolicella in 1968, a separate DOC in 1990 and a DOCG in 2010 (approved December 2009).\n\nThe production zone covers 19 communes and 8,614 hectares of Valpolicella vineyard (2025). In 2025 about 13.6 million bottles of Amarone and Recioto were released, with 327,545 quintals of grapes set aside for drying. Ageing is at least two years from 1 January after harvest (Riserva four), and minimum alcohol is 14%. Giuseppe Quintarelli and Romano Dal Forno make the most sought-after, long-aged versions; Bertani's Classico, released after years in large casks, is the benchmark of the traditional style.",
 "Valpolicella is a fan of north-south valleys running down from the Lessini Mountains to the Adige: in the Classico zone the Fumane, Marano and Negrar valleys, then Valpantena, then the eastern valleys of Illasi and Mezzane. Soils are limestone, marl and clay on the hills (red clays on the *marogne*, dry-stone terraces), with volcanic basalt in the east. Higher hillside sites at 300 to 500 m give fresher, more aromatic grapes, while the drying process itself, regulated by humidity and airflow in the fruttai, shapes the wine as much as the vineyard.",
 ["Giuseppe Quintarelli", "Romano Dal Forno", "Bertani", "Allegrini", "Masi", "Tommaso Bussola", "Speri", "Tedeschi", "Zenato", "Musella", "Marion", "Corte Sant'Alda", "Monte dei Ragni", "Le Ragose"],
 "Before drying became mechanised in some cellars, grapes were dried on bamboo racks (*arele*) or hung from rafters; Quintarelli still dries on racks in his attic, and the consortium has proposed the ritual of 'grape-resting' for UNESCO intangible heritage.",
 official="Amarone della Valpolicella", match=["Amarone"]))
apps.append(A("Recioto della Valpolicella", "DOCG", V, "Valpolicella", "DOC 1968, DOCG 2010", None, ["sweet", "red"], "Corvina, Corvinone, Rondinella (same as Amarone)",
 "The original dried-grape wine of Valpolicella: sweet, red, rich in cherry and chocolate, made from dried grapes whose fermentation is stopped while sugar remains. It is the direct descendant of the *Acinatico* praised by Cassiodorus around AD 500. The name comes from *recie*, dialect for the 'ears' or upper lobes of the bunch that got the most sun and were selected for drying. Today Recioto is a rarity, a fraction of Amarone's volume, but Quintarelli, Dal Forno and Bussola make thrilling ones.",
 "Same hillsides as Amarone.", ["Giuseppe Quintarelli", "Romano Dal Forno", "Tommaso Bussola", "Allegrini"],
 "Recioto Spumante, a sweet sparkling red, is still permitted and occasionally made.", official="Recioto della Valpolicella"))
apps.append(A("Valpolicella", "DOC", V, "Valpolicella", "1968", 8614, ["red"], "Corvina and Corvinone (45 to 95%), Rondinella (5 to 30%), others up to 25%",
 "The everyday red of Verona: light to medium-bodied, with sour cherry, almond and herbs, made from fresh (undried) grapes. Valpolicella Classico comes from the historic heart (Fumane, Marano, Negrar, San Pietro in Cariano, Sant'Ambrogio), Valpantena from the valley north of Verona, and the eastern zone extends to Illasi and Mezzane. Superiore requires a year of ageing. In 2025, 16.5 million bottles of Valpolicella DOC were released. The best (Quintarelli, Bussola, Monte dei Ragni) show that unadorned Corvina can be as compelling as Amarone.",
 "Hills of limestone, marl and basalt; the Classico zone sits on limestone, the east more volcanic.",
 ["Giuseppe Quintarelli", "Allegrini", "Corte Sant'Alda", "Monte dei Ragni", "Speri", "Brigaldara", "Tedeschi"],
 "The name may come from Latin *vallis polis cellae*, 'valley of many cellars', or from the Greek-Latin for 'valley of many'; scholars disagree.",
 official="Valpolicella", match=["Valpolicella Classico", "Valpolicella Valpantena", "Valpolicella Superiore"],
 contains=["Valpolicella Classico", "Valpantena"]))
apps.append(A("Valpolicella Ripasso", "DOC", V, "Valpolicella", "2010", None, ["red"], "Corvina, Corvinone, Rondinella",
 "Ripasso ('re-passed') is Valpolicella refermented on the pomace of Amarone or Recioto, picking up extra alcohol, body, glycerol and dried-fruit flavours. It was popularised by Masi, whose Campofiorin (1964) made the technique famous, and it became its own DOC in 2010. Ripasso is now the biggest seller of the Valpolicella family: 27.4 million bottles in 2025, nearly half the total. Styles range from simple and sweetish to serious, age-worthy wines.",
 "Same vineyards as Valpolicella.", ["Masi", "Zenato", "Speri", "Tommaso Bussola", "Brigaldara"],
 "Masi markets Campofiorin as 'IGT Rosso del Veronese' rather than Ripasso, partly because it uses a modified double-fermentation method with dried grapes.",
 official="Valpolicella Ripasso", match=["Ripasso"]))

apps.append(A("Soave", "DOC", V, "Soave", "1968", 7000, ["white"], "Garganega (min 70%), Trebbiano di Soave and Chardonnay",
 "Soave is one of Italy's great white wines and, after its 1970s and 1980s reputation as a cheap supermarket staple, one of its great comeback stories. It is made mainly from Garganega, a late-ripening, thick-skinned grape that gives almond, chamomile, yellow plum and a saline, smoky mineral finish, especially from the volcanic hills. The DOC covers about 7,000 hectares east of Verona, but the heart is Soave Classico, the hills around the medieval walled town of Soave and Monteforte d'Alpone.\n\nIn 2019 the consortium mapped 33 UGAs (Unità Geografiche Aggiuntive), covering about 2,660 hectares (38% of the area): 28 in the Classico zone, three in the limestone west (Broia, Paradiso, Monte di Colognola) and two volcanic sites in the east (Duello, Roncà-Monte Calvarina). The names, which can appear on labels from the 2019 vintage, include Foscarino, Froscà, Castelcerino, Fittà, Monte Grande, Pressoni, Carbonare, Volpare and Costalunga. Pieropan (Calvarino, La Rocca), Anselmi, Inama, Gini, Prà, Coffele, Suavia, Filippi and Cantina di Soave are key producers. The Soave hills were also recognised in 2018 by the FAO as a Globally Important Agricultural Heritage System for their traditional pergola training.",
 "Two very different soils meet in the Classico zone. East of the Alpone and on the Monte Foscarino and Castelcerino ridges are dark volcanic basalts and tuffs from Eocene eruptions, giving smoky, saline, structured wines; west, toward Soave and Colognola, are white limestones (Calvarino, La Rocca) giving finer, more floral wines. The vines are traditionally trained on the Veronese pergola, which shades the grapes from summer heat.",
 ["Pieropan", "Inama", "Gini", "Graziano Prà", "Coffele", "Suavia", "Filippi", "Cantina di Soave", "Ca' Rugate", "Anselmi (IGT)", "Monte Tondo"],
 "Roberto Anselmi left the DOC in 2000 in protest at its rules and now sells his famous Capitel Foscarino and I Capitelli as IGT Veneto.",
 official="Soave", match=["Soave Classico"],
 contains=["Foscarino", "Froscà", "Castelcerino", "Fittà", "Monte Grande", "Pressoni", "Carbonare", "Volpare", "Costalunga", "Brognoligo", "Duello", "Roncà - Monte Calvarina", "Broia", "Paradiso", "Monte di Colognola"]))
apps.append(A("Soave Superiore", "DOCG", V, "Soave", "2001", None, ["white"], "Garganega (min 70%), Trebbiano di Soave",
 "The DOCG tier of Soave, with lower yields and longer ageing (Riserva a year). In practice most top producers bottle their best wines as Soave Classico DOC rather than Superiore, so the DOCG remains marginal.",
 "Hill vineyards only.", ["Cantina di Soave"], "One of the few cases in Italy where the DOCG is less prestigious in practice than the DOC beneath it.", official="Soave Superiore"))
apps.append(A("Recioto di Soave", "DOCG", V, "Soave", "1998", None, ["sweet", "sparkling"], "Garganega (min 70%)",
 "Italy's first DOCG for a white sweet wine (1998), from Garganega grapes dried on racks until spring, giving a golden, apricot and almond-scented wine with bright acidity. A sparkling version also exists.",
 "Same volcanic and limestone hills as Soave Classico.", ["Pieropan", "Coffele", "Gini", "Anselmi (I Capitelli, IGT)"],
 "Recioto di Soave was a favourite of the Venetian court and the papal households in the 18th century.", official="Recioto di Soave"))

apps.append(A("Conegliano Valdobbiadene Prosecco", "DOCG", V, "Prosecco hills", "DOC 1969, DOCG 2009", None, ["sparkling", "white"], "Glera (min 85%), Verdiso, Bianchetta Trevigiana, Perera, Glera lunga",
 "The steep hills between Conegliano and Valdobbiadene in the province of Treviso are the historic heart of Prosecco and its top tier: Conegliano Valdobbiadene Prosecco Superiore DOCG. Fifteen communes on a ribbon of ridges at 100 to 500 m, many slopes so steep (the *ciglioni*, grassy terraces) that everything is done by hand, about 600 hours per hectare a year. The landscape became a UNESCO World Heritage site in 2019.\n\nProsecco is made mostly by the Martinotti (tank or charmat) method, a second fermentation in pressurised tanks that preserves Glera's fresh pear, apple, wisteria and acacia aromas. Styles range from Extra Brut to Brut, Extra Dry (the traditional and most popular) and Dry, plus Sui Lieviti, the old *col fondo* style refermented in bottle and left cloudy on its lees. The 43 Rive are single-commune or single-hamlet wines from steep slopes with lower yields (13 tonnes/ha) and a vintage on the label; at the summit is Superiore di Cartizze, 107 hectares of steep hills in San Pietro di Barbozza, Santo Stefano and Saccol in Valdobbiadene, traditionally made Dry.\n\nThe Scuola Enologica in Conegliano, founded in 1876, and the sparkling wines of Antonio Carpenè, who founded his house in 1868, laid the foundations; Nino Franco, Bisol, Adami, Ruggeri, Bortolomiol, Col Vetoraz and Villa Sandi are leading houses.",
 "Marine and glacial conglomerates, sandstones and marls folded into steep east-west hogbacks; the Pre-Alps shelter the hills from cold winds, and the Piave river and Adriatic breezes temper summer heat. Valdobbiadene, to the west, is higher, steeper and cooler; Conegliano, to the east, is gentler and warmer.",
 ["Nino Franco", "Bisol", "Adami", "Ruggeri", "Bortolomiol", "Col Vetoraz", "Villa Sandi", "Carpenè Malvolti", "Silvano Follador", "Casa Coste Piane", "Malibràn"],
 "Cartizze vineyard land is among the most expensive in Italy, regularly quoted at well over a million euros per hectare, on a par with top Barolo crus.",
 official="Conegliano Valdobbiadene - Prosecco / Valdobbiadene - Prosecco / Conegliano - Prosecco",
 match=["Conegliano Valdobbiadene Prosecco Superiore", "Prosecco Superiore", "Valdobbiadene Prosecco", "Conegliano Prosecco", "Cartizze", "Superiore di Cartizze"],
 contains=["Cartizze"]))
apps.append(A("Asolo Prosecco", "DOCG", V, "Prosecco hills", "DOCG 2009", None, ["sparkling"], "Glera (min 85%)",
 "The second Prosecco Superiore DOCG, on the Asolo and Montello hills west of the Piave around the hill town of Asolo, once home of Caterina Cornaro, Queen of Cyprus. It grew rapidly in the 2010s and is known for pioneering the drier Extra Brut style and allowing Brut Nature.",
 "Gentler, sunnier slopes of sandy marl and limestone around Asolo and on the Montello.", ["Bele Casel", "Montelvini", "Villa Sandi", "Martignago"],
 "Asolo was one of the first Prosecco zones to embrace bone-dry Extra Brut.",
 official="Colli Asolani - Prosecco / Asolo - Prosecco", match=["Asolo Prosecco", "Asolo Prosecco Superiore", "Colli Asolani Prosecco"]))
apps.append(A("Prosecco", "DOC", V, "Veneto and Friuli Venezia Giulia", "2009", 24450, ["sparkling", "white", "rose"], "Glera (min 85%); Pinot Nero (10 to 15%) for rosé",
 "The Prosecco DOC is the world's best-selling sparkling wine and Italy's largest wine appellation by value. Created in 2009, it spans nine provinces in Veneto (Treviso, Venezia, Vicenza, Padova, Belluno) and Friuli Venezia Giulia (Trieste, Gorizia, Udine, Pordenone), a defensive move: the grape was renamed Glera and the name Prosecco, taken from the village of Prosecco near Trieste, became a protected place name that no one outside the zone could use.\n\nProduction reached 667 million bottles in 2025 (607 million white and 60 million rosé, a category introduced in 2020), with the United States the largest export market. The vineyard potential of about 24,450 hectares is being raised by 6,050 hectares to 30,500, in two phases approved by both regions in late 2025. Treviso and Trieste provinces may add their names to the label ('Prosecco DOC Treviso', 'Prosecco DOC Trieste').",
 "Mostly flat alluvial plains of the Piave, Livenza and Tagliamento, with fertile gravels and clays allowing high yields (18 tonnes/ha).",
 ["Mionetto", "La Marca", "Zonin", "Villa Sandi", "Bisol", "Ca' di Rajo"],
 "The village of Prosecco that gave its name to the wine is a suburb of Trieste in Friuli, not in the Treviso hills where the wine is most associated.",
 official="Prosecco", match=["Prosecco DOC", "Prosecco Rosé"]))

apps.append(A("Bardolino", "DOC", V, "Lake Garda", "1968", None, ["red", "rose", "sparkling"], "Corvina (35 to 95%), Rondinella (5 to 40%), Molinara and others",
 "Bardolino is the light, fragrant red of Lake Garda's eastern shore: pale, cherry-and-spice scented, the sort of red you chill slightly and drink with lake fish. Bardolino Chiaretto, its pink sibling, is one of Italy's most popular rosés and has been reinvented since 2014 as a pale, Provence-style wine. Three subzones, La Rocca, Montebaldo and Sommacampagna, were added in the early 2020s to recognise different soils and exposures.",
 "Glacial moraine hills around the lake; the lake moderates temperatures.", ["Guerrieri Rizzardi", "Le Fraghe", "Zeni", "Gorgo", "Le Tende"],
 "The Bardolino Chiaretto 'Rosé Revolution' of 2014 reduced skin contact to give a paler, lighter wine, reversing decades of darker rosé.",
 official="Bardolino", match=["Bardolino Chiaretto", "Chiaretto di Bardolino"]))
apps.append(A("Bardolino Superiore", "DOCG", V, "Lake Garda", "2001", None, ["red"], "Corvina (35 to 80%), Rondinella",
 "The DOCG tier of Bardolino with lower yields and a year of ageing; a small category.", "Moraine hills east of Garda.", ["Guerrieri Rizzardi", "Le Fraghe"], "", official="Bardolino Superiore"))
apps.append(A("Custoza", "DOC", V, "Lake Garda", "1971", None, ["white", "sparkling", "sweet"], "Garganega, Trebbiano Toscano, Bianca Fernanda (Cortese), Friulano, Malvasia, Riesling, Chardonnay, Manzoni",
 "Bianco di Custoza is a light, aromatic white blend from the moraine hills south-east of Lake Garda, between Verona and Peschiera. Fresh, floral and slightly almondy; Monte del Frà, Cavalchina and Gorgo are leading names.",
 "Glacial moraine of the Garda amphitheatre.", ["Monte del Frà", "Cavalchina", "Gorgo", "Albino Piona"],
 "Custoza was the site of two battles of the Risorgimento (1848 and 1866), and a war ossuary stands among the vineyards.",
 official="Bianco di Custoza / Custoza", match=["Bianco di Custoza"]))
apps.append(A("Gambellara", "DOC", V, "Vicenza", "1970", None, ["white", "sparkling", "sweet"], "Garganega (min 80%)",
 "Soave's volcanic neighbour across the provincial border in Vicenza, making Garganega whites on dark basalt; Angiolino Maule's La Biancara made it a natural-wine reference. Recioto di Gambellara (DOCG) and Vin Santo di Gambellara are its sweet wines.",
 "Volcanic basalt hills.", ["La Biancara", "Zonin", "Davide Vignato", "Cavazza"], "", official="Gambellara"))
apps.append(A("Recioto di Gambellara", "DOCG", V, "Vicenza", "DOCG 2008", None, ["sweet", "sparkling"], "Garganega (100%)",
 "Sweet dried-grape Garganega from the Gambellara hills, still or sparkling.", "Volcanic hills.", ["La Biancara", "Cavazza"], "", official="Recioto di Gambellara"))
apps.append(A("Lessini Durello", "DOC", V, "Lessini", "1987", None, ["sparkling", "white"], "Durella (min 85%)",
 "Durella is a fiercely acidic white grape from the volcanic Lessini hills north of Soave, perfect for sparkling wine. Lessini Durello is made by tank or traditional method; the long-aged Monti Lessini metodo classico versions (36+ months on lees) are among Italy's most underrated sparklers.",
 "Volcanic basalts and tuffs of the Alpone and Chiampo valleys up to 600 m.", ["Fongaro", "Casa Cecchin", "Marcato", "Corte Moschina"],
 "Durella's name is thought to come from its tough (*dura*) skin.", official="Lessini Durello / Durello Lessini", match=["Durello Lessini", "Monti Lessini"]))
apps.append(A("Monti Lessini", "DOC", V, "Lessini", "1987", None, ["sparkling", "white"], "Durella, Chardonnay, Pinot Bianco, Pinot Nero",
 "Companion DOC to Lessini Durello for still whites and long-aged metodo classico from the Lessini mountains.", "Volcanic hills.", ["Fongaro"], "", official="Monti Lessini"))
apps.append(A("Breganze", "DOC", V, "Vicenza", "1969", None, ["white", "red", "sweet"], "Vespaiola, Friulano (Tai), Pinot Bianco, Cabernet, Merlot",
 "Breganze, on the foothills of the Asiago plateau north of Vicenza, is famous for Torcolato, a golden sweet wine from Vespaiola grapes twisted (*torcolati*) onto strings and hung from rafters to dry until January. Fausto Maculan made Torcolato and his botrytised Acininobili internationally known from the 1980s.",
 "Volcanic and morainic soils on south-facing foothills.", ["Maculan", "Vitacchio"], "Vespaiola is named after the wasps (*vespe*) attracted to its sweet, ripe grapes.",
 official="Breganze", match=["Breganze Torcolato", "Torcolato"]))
apps.append(A("Colli Euganei", "DOC", V, "Padova", "1969", None, ["red", "white", "sparkling", "sweet"], "Merlot, Cabernet, Carmenère, Raboso; Garganega, Pinella, Serprina (Glera), Moscato",
 "The Euganean Hills south-west of Padua are a cluster of extinct volcanic cones rising from the plain, where Petrarch spent his last years at Arquà. They make Bordeaux-style reds of surprising depth (Vignalta's Gemola, Ca' Lustra) on trachyte and volcanic soils, plus whites from local grapes like Pinella.",
 "Volcanic trachyte, rhyolite and latite cones with marine limestone on the lower slopes.", ["Vignalta", "Ca' Lustra Zanovello", "Il Filò delle Vigne", "Castello di Lispida"],
 "Castello di Lispida in Monselice was one of the first Italian estates to ferment in amphorae, in the 2000s.", official="Colli Euganei"))
apps.append(A("Colli Euganei Fior d'Arancio", "DOCG", V, "Padova", "DOCG 2010", None, ["sweet", "sparkling", "white"], "Moscato Giallo (min 95%)",
 "'Orange blossom': Moscato Giallo from the Euganean Hills, made as a sweet sparkling wine, still, or passito. It tastes literally of orange flowers and apricot.",
 "Volcanic hills.", ["Vignalta", "Ca' Lustra Zanovello", "Conte Emo Capodilista"], "The DOCG is unusual for being dedicated to Moscato Giallo, the yellow Muscat more common in Alto Adige.",
 official="Colli Euganei Fior d'Arancio / Fior d'Arancio Colli Euganei", match=["Fior d'Arancio Colli Euganei", "Fior d'Arancio"]))
apps.append(A("Colli Berici", "DOC", V, "Vicenza", "1973", None, ["red", "white"], "Tai Rosso (Grenache), Cabernet, Carmenère, Merlot, Garganega",
 "Limestone hills south of Vicenza, home of Tai Rosso, a local form of Grenache (Cannonau), especially around Barbarano Vicentino. Inama's Carmenère and Piú show the area's Bordeaux side.",
 "Karstic limestone and marl hills with red clays.", ["Inama (Colli Berici)", "Piovene Porto Godi", "Pegoraro"], "Tai Rosso was called Tocai Rosso until the EU banned the 'Tocai' name in 2007.",
 official="Colli Berici", match=["Barbarano"]))
apps.append(A("Piave", "DOC", V, "Piave", "1971", None, ["red", "white"], "Raboso Piave, Merlot, Cabernet, Carmenère, Tai, Verduzzo",
 "The flat plain along the Piave river in Treviso and Venice provinces, the homeland of Raboso, a tough, high-acid red grape, and of easy Merlot and Cabernet.",
 "Alluvial gravels and clays of the Piave plain.", ["Bonotto delle Tezze", "Cecchetto"], "Raboso is said to take its name from the river Raboso, a tributary of the Piave, or from *rabbioso* ('angry'), describing its acidity.",
 official="Piave"))
apps.append(A("Piave Malanotte", "DOCG", V, "Piave", "DOCG 2010", None, ["red"], "Raboso Piave (min 70%)",
 "A DOCG for Raboso from the Piave, in which 15 to 30% of the grapes are dried before fermentation to tame the grape's fierce acidity and tannin. Aged at least 36 months. Named after the Malanotte borgo at Vazzola.",
 "Gravel and clay of the Piave plain.", ["Cecchetto", "Bonotto delle Tezze", "Cantina Pizzolato"], "Raboso was historically shipped to Venice because its acidity let it survive long sea voyages.",
 official="Piave Malanotte / Malanotte del Piave", match=["Malanotte del Piave", "Malanotte"]))
apps.append(A("Lison", "DOCG", V, "Lison-Pramaggiore", "DOCG 2010", None, ["white"], "Friulano (Tai) min 85%",
 "A DOCG for Friulano, called Tai here, from the plain on the Veneto-Friuli border around Lison and Portogruaro: floral, almondy whites. Lison Classico is the historic core.",
 "Clay and calcareous alluvium ('caranto' hardpan).", ["Santa Margherita", "Ornella Molon"], "", official="Lison"))
apps.append(A("Lison-Pramaggiore", "DOC", V, "Lison-Pramaggiore", "1985", None, ["red", "white"], "Merlot, Cabernet, Refosco, Malbech, Pinot Grigio, Chardonnay, Verduzzo",
 "Varietal DOC across the Veneto-Friuli border, with Refosco and Malbech among its curiosities.", "Alluvial plain.", ["Santa Margherita"], "", official="Lison-Pramaggiore"))
apps.append(A("Montello Rosso", "DOCG", V, "Montello", "DOCG 2011", None, ["red"], "Cabernet Sauvignon, Cabernet Franc, Merlot, Carmenère",
 "A DOCG for Bordeaux-style reds from the Montello hill near Treviso. Loredan Gasparini's Venegazzù della Casa, a Bordeaux blend first made in the 1950s, was one of the earliest Italian Cabernet-based reds of ambition.",
 "Red clays over karst on the Montello hill.", ["Loredan Gasparini", "Serafini & Vidotto"], "", official="Montello Rosso / Montello", match=["Montello"]))
apps.append(A("Asolo Montello", "DOC", V, "Montello", "1977", None, ["red", "white"], "Cabernet, Merlot, Manzoni Bianco, Chardonnay", "Varietal DOC for the Asolo and Montello hills.", "", [], "", official="Asolo Montello / Montello Asolo", match=["Montello Asolo", "Montello e Colli Asolani"]))
apps.append(A("Bagnoli Friularo", "DOCG", V, "Padova", "DOCG 2011", None, ["red", "sweet"], "Raboso Piave (Friularo) min 90%",
 "Raboso, here called Friularo, from the plain around Bagnoli di Sopra south of Padua, dry or as a passito. The Borletti family's Dominio di Bagnoli, an estate founded on Benedictine lands, is the reference.",
 "Clay plain.", ["Dominio di Bagnoli"], "Bagnoli's great estate was a Benedictine property before passing to Venetian nobility, and the Friularo name recalls the grape's reputed Friulian origin.", official="Bagnoli Friularo / Friularo di Bagnoli", match=["Friularo di Bagnoli"]))

def small(name, created, styles, grapes, summary, nerd="", official=None, match=(), cat="DOC", sub=None):
    apps.append(A(name, cat, V, sub, created, None, styles, grapes, summary, "", [], nerd, official=official or name, match=match))

small("Bagnoli di Sopra", "1995", ["red", "white", "rose"], "Raboso, Merlot, Cabernet, Friulano", "Varietal and blended wines from the Bagnoli plain south of Padua.", official="Bagnoli di Sopra / Bagnoli")
small("Arcole", "2000", ["red", "white"], "Garganega, Merlot, Cabernet, Chardonnay", "A plain-land DOC south of Soave, named after Napoleon's 1796 victory at the bridge of Arcole.", nerd="Napoleon's charge across the Arcole bridge is depicted in Antoine-Jean Gros's famous painting.")
small("Colli di Conegliano", "DOC 1993, DOCG 2011", ["red", "white", "sweet"], "Cabernet, Merlot, Marzemino; Manzoni Bianco, Pinot Bianco; Verdiso; Torchiato di Fregona", "A small DOCG (since 2011) for still wines from the Prosecco hills: Bordeaux-variety reds and Manzoni Bianco whites, the rare sweet Torchiato di Fregona from dried grapes, and the red Refrontolo Passito from Marzemino.", nerd="Refrontolo's Marzemino passito is said to be the Marzemino Mozart's Don Giovanni toasts.", cat="DOCG")
small("Corti Benedettine del Padovano", "2004", ["red", "white", "sweet"], "Raboso, Merlot, Cabernet, Moscato", "Plain wines from lands once farmed by Benedictine monasteries south of Padua.", nerd="The name recalls the *corti* (farm courtyards) of the Benedictine abbey of Santa Giustina.")
small("Garda", "1996", ["white", "red", "sparkling"], "Garganega, Chardonnay, Pinot Grigio, Corvina, Merlot and many others", "A large inter-regional varietal DOC around Lake Garda spanning Veneto and Lombardy.")
small("Merlara", "2000", ["red", "white"], "Merlot, Cabernet, Malvasia, Friulano", "A small plain DOC on the Adige near the Padua-Verona border.")
small("Riviera del Brenta", "2004", ["red", "white"], "Merlot, Cabernet, Raboso, Pinot Bianco, Tai", "Wines from the Brenta canal country between Padua and Venice, lined with Palladian villas.")
small("Venezia", "2011", ["white", "red", "sparkling"], "Pinot Grigio, Merlot, Cabernet, Raboso, Manzoni Bianco", "Umbrella DOC for the provinces of Venice and Treviso, used for Pinot Grigio and varietals; includes vineyards on the lagoon islands.", nerd="Venissa's walled vineyard on the island of Mazzorbo revived Dorona, a golden lagoon grape almost lost to floods and abandonment.")
small("Vicenza", "2000", ["red", "white", "sparkling"], "Garganega, Pinot, Cabernet, Merlot and others", "Umbrella DOC for the province of Vicenza.")
small("Vigneti della Serenissima", "2011", ["sparkling"], "Chardonnay, Pinot Bianco, Pinot Nero, Pinot Grigio", "A Veneto-wide DOC for metodo classico sparkling wine, named for the Most Serene Republic of Venice.", official="Vigneti della Serenissima / Serenissima", match=["Serenissima"])
small("Valdadige Terradeiforti", "2006", ["red", "white"], "Enantio, Casetta, Pinot Grigio", "A small DOC in the narrow Adige gorge between Verona and Trento, home of the rare Enantio (Lambrusco a foglia frastagliata) and Casetta reds.", official="Valdadige Terradeiforti / Terradeiforti", match=["Terradeiforti"], nerd="The 'land of forts' is named for the Austrian fortifications guarding the Adige valley.")
apps.append(A("delle Venezie", "DOC", V, "Triveneto", "2017", None, ["white", "rose", "sparkling"], "Pinot Grigio (min 85%), plus other varietals",
 "Created in 2017 (registered in the EU in 2020) to regulate Pinot Grigio from Veneto, Friuli Venezia Giulia and the province of Trento, which together make most of the world's Italian Pinot Grigio. It covers tens of thousands of hectares and is by far the largest Pinot Grigio appellation in the world.",
 "Plains and foothills across three regions.", ["Santa Margherita", "Cavit", "Zonin"], "It is one of the few Italian DOCs that also has a Slovene name, Beneških okolišev, for the Slovene-speaking areas of Friuli.",
 official="delle Venezie / Beneških okolišev", match=["DOC delle Venezie", "Pinot Grigio delle Venezie"]))

sites = []
def soave(slug, name, lat, lon, q, text, prods=()):
    sites.append(S("soave-" + slug, name, "cru", "UGA (Soave DOC, 2019)", "Soave", lat, lon, q, text, prods))
soave("foscarino", "Foscarino", 45.4440, 11.2800, "approx",
 "The volcanic hill north of Monteforte d'Alpone, crowned by the Monte Foscarino, the most famous name in Soave: black basalt soils give smoky, saline, structured Garganega. Anselmi's Capitel Foscarino, Inama's Vigneti di Foscarino and Gini's Contrada Salvarenza come from here.", ["Inama", "Gini", "Anselmi"])
soave("frosca", "Froscà", 45.4325, 11.2560, "approx",
 "Volcanic slopes between Soave and Monteforte, where Gini's 1900s-planted vines give one of the zone's deepest wines.", ["Gini", "Ca' Rugate"])
soave("castelcerino", "Castelcerino", 45.4612, 11.2403, "precise",
 "The highest village of the Soave Classico zone at about 400 m, cooler and windswept, on mixed volcanic and limestone soils.", ["Filippi", "Pieropan"])
soave("fitta", "Fittà", 45.4533, 11.2533, "precise",
 "A hamlet high in the Classico zone north of Soave, on volcanic soils, where Suavia and Filippi have vineyards.", ["Suavia", "Filippi"])
soave("monte-grande", "Monte Grande", 45.4310, 11.2650, "approx",
 "A volcanic hill east of Soave, the source of Graziano Prà's acclaimed Monte Grande Soave, partly made with dried grapes.", ["Graziano Prà"])
soave("pressoni", "Pressoni", 45.4380, 11.2470, "approx",
 "Steep slopes north of Soave on volcanic and limestone soils; Cantina di Soave's Rocca Sveva line and several growers bottle it.", ["Cantina di Soave"])
soave("carbonare", "Carbonare", 45.4490, 11.2660, "approx",
 "A high volcanic site in the Classico zone known through Suavia's Monte Carbonare, a benchmark of saline, long-lived Garganega.", ["Suavia"])
soave("volpare", "Volpare", 45.4450, 11.2470, "approx",
 "Hillside slopes near Castelcerino in the north of the Classico zone, cooler and higher than the valley floor, giving fine, fragrant Garganega.", ["Coffele"])
soave("costalunga", "Costalunga", 45.4487, 11.2938, "approx",
 "Volcanic hills around the hamlets of Brognoligo and Costalunga east of Monteforte d'Alpone, with dark basalt soils that give smoky, saline Soave.", ["Graziano Prà"])
soave("brognoligo", "Brognoligo", 45.4460, 11.2880, "approx",
 "A hamlet in the Alpone valley north-east of Monteforte, on dark volcanic soils.", ["Gini"])
soave("duello", "Duello", 45.4765, 11.2832, "approx",
 "One of the two eastern UGAs near Roncà, on volcanic basalt outside the Classico zone.", [])
soave("ronca-calvarina", "Roncà - Monte Calvarina", 45.5000, 11.2810, "approx",
 "The eastern volcanic UGA rising to the Monte Calvarina, an Eocene volcanic peak north of Roncà; cool and high.", [])
soave("monte-di-colognola", "Monte di Colognola", 45.4380, 11.1900, "approx",
 "One of the three western UGAs on limestone above Colognola ai Colli, outside the Classico zone.", [])
soave("calvarino", "Calvarino (Pieropan)", 45.4290, 11.2460, "approx",
 "Not an official UGA name but the most famous single vineyard of Soave: Pieropan's Calvarino ('little Calvary', for how hard it is to work), first bottled separately in 1971 and one of Italy's great white wines, on basalt and tuff north of Soave.", ["Pieropan"])

sites += [
S("castello-di-soave", "Castello di Soave", "historic", "Medieval castle", "Soave", 45.4230, 11.2508, "precise",
  "The Scaliger castle of the 10th to 14th centuries and the walls enclosing the town of Soave, overlooking the Classico vineyards.", []),
S("pieropan", "Pieropan", "estate", "Producer", "Soave", 45.4223, 11.2486, "precise",
  "Founded in 1880 in the centre of Soave; Leonildo Pieropan made the first single-vineyard Soave (Calvarino 1971, La Rocca 1978) and helped restore Soave's reputation.", ["Pieropan"]),
S("quintarelli", "Giuseppe Quintarelli", "estate", "Producer", "Amarone della Valpolicella", 45.5160, 10.9300, "approx",
  "The Cerè estate above Negrar where Giuseppe 'Bepi' Quintarelli (1927 to 2012) made the most revered Amarone and Recioto, dried on racks in the attic and aged up to eight years in old casks. His handwritten labels are icons. The family continues his work.", ["Giuseppe Quintarelli"]),
S("dal-forno", "Romano Dal Forno", "estate", "Producer", "Amarone della Valpolicella", 45.4690, 11.1720, "approx",
  "Romano Dal Forno's estate at Lodoletta in the Val d'Illasi, outside the Classico zone. After apprenticing with Quintarelli he created a monumental, ultra-concentrated Amarone, dried in a ventilated fruttaio and aged in new barriques.", ["Romano Dal Forno"]),
S("bertani-grezzana", "Bertani (Villa Mosconi Bertani)", "estate", "Producer", "Amarone della Valpolicella", 45.5167, 11.0236, "precise",
  "Founded in 1857 by the Bertani brothers; its Amarone Classico, aged six years or more in large casks, is the benchmark of the traditional style. The company's Grezzana site and the 18th-century Villa Mosconi Bertani at Arbizzano anchor its history.", ["Bertani"]),
S("masi-serego-alighieri", "Serego Alighieri and Masi (Gargagnago)", "estate", "Producer and historic estate", "Valpolicella", 45.5305, 10.8613, "approx",
  "The estate at Gargagnago bought in 1353 by Pietro, son of Dante Alighieri, still owned by his descendants the Counts Serego Alighieri and made in partnership with Masi, whose headquarters are in the same village. Masi revived Ripasso with Campofiorin in 1964.", ["Masi", "Serego Alighieri"]),
S("allegrini", "Allegrini", "estate", "Producer", "Valpolicella", 45.5404, 10.8839, "precise",
  "Fumane family estate whose La Poja (1983, pure Corvina from a hilltop vineyard) and Amarone helped modernise Valpolicella; the family also restored the Renaissance Villa della Torre.", ["Allegrini"]),
S("villa-della-torre", "Villa della Torre", "historic", "Renaissance villa", "Valpolicella", 45.5399, 10.8767, "precise",
  "A 16th-century Mannerist villa at Fumane with grotesque fireplaces attributed to Giulio Romano's circle, now owned by the Allegrini family.", ["Allegrini"]),
S("pieve-san-giorgio", "Pieve di San Giorgio di Valpolicella", "historic", "Romanesque church, Lombard ciborium", "Valpolicella", 45.5350, 10.8496, "approx",
  "The Romanesque parish church at San Giorgio di Valpolicella, built on early-medieval foundations and containing a Lombard-era ciborium inscription from the 8th century, a reminder of how old the valley's Christian and winemaking communities are.", []),
S("tommaso-bussola", "Tommaso Bussola", "estate", "Producer", "Recioto della Valpolicella", 45.5321, 10.9544, "precise",
  "Self-taught grower in San Peretto di Negrar, famous for opulent Recioto and Amarone TB.", ["Tommaso Bussola"]),
S("valdobbiadene-cartizze", "Cartizze", "cru", "Superiore di Cartizze subzone (107 ha)", "Conegliano Valdobbiadene Prosecco", 45.8975, 12.0290, "approx",
  "107 hectares of very steep slopes between San Pietro di Barbozza, Santo Stefano and Saccol in Valdobbiadene: the grand cru of Prosecco, traditionally made Dry, with ripe pear and floral richness.", ["Bisol", "Nino Franco", "Ruggeri", "Col Vetoraz"]),
S("prosecco-unesco-hills", "Le Colline del Prosecco di Conegliano e Valdobbiadene", "landscape", "UNESCO World Heritage (2019)", "Conegliano Valdobbiadene Prosecco", 45.9180, 12.1500, "approx",
  "The hogback hills between Valdobbiadene and Vittorio Veneto, with grassy *ciglioni* terraces and a patchwork of woods and vines, inscribed as a cultural landscape in 2019.", []),
S("scuola-enologica-conegliano", "Scuola Enologica G.B. Cerletti, Conegliano", "historic", "Italy's first school of oenology (1876)", "Conegliano Valdobbiadene Prosecco", 45.8870, 12.2900, "approx",
  "Founded in 1876, Italy's first school of viticulture and oenology; its teachers shaped modern Prosecco technique, and its headmaster Luigi Manzoni bred the Manzoni crossings, including Incrocio Manzoni 6.0.13, in the 1920s and 1930s.", []),
S("nino-franco", "Nino Franco", "house", "Producer", "Conegliano Valdobbiadene Prosecco", 45.8990, 11.9990, "approx",
  "Founded in Valdobbiadene in 1919; Primo Franco's Rustico and Grave di Stecca made it one of the first Prosecco houses with an international reputation for quality.", ["Nino Franco"]),
S("bisol", "Bisol", "house", "Producer", "Conegliano Valdobbiadene Prosecco", 45.8992, 12.0403, "precise",
  "A family growing grapes in Valdobbiadene since 1542, with the largest share of Cartizze; with a majority stake owned since 2014 by the Lunelli family of Ferrari.", ["Bisol"]),
S("villa-sandi", "Villa Sandi", "house", "Producer and Palladian-style villa", "Asolo Prosecco", 45.8200, 12.0377, "precise",
  "A 17th-century villa in Palladian style at Crocetta del Montello with kilometres of underground tunnels from the First World War, now the Moretti Polegato family's Prosecco house.", ["Villa Sandi"]),
S("prosecco-village", "Prosecco (Trieste)", "village", "Village that gave its name to the wine", "Prosecco", 45.7081, 13.7338, "precise",
  "The Karst village above Trieste, in Friuli Venezia Giulia, that gave its name to Prosecco; its inclusion in the 2009 DOC is what allowed Italy to protect the name as a geographical indication.", []),
S("maculan", "Maculan", "estate", "Producer", "Breganze", 45.7083, 11.5624, "precise",
  "Fausto Maculan's Breganze estate, maker of Torcolato and the botrytised Acininobili from Vespaiola.", ["Maculan"]),
S("vignalta", "Vignalta", "estate", "Producer", "Colli Euganei", 45.2773, 11.7047, "precise",
  "Arquà Petrarca estate whose Gemola Merlot-Cabernet showed the volcanic Euganean Hills' potential.", ["Vignalta"]),
S("arqua-petrarca", "Arquà Petrarca", "historic", "Petrarch's house", "Colli Euganei", 45.2691, 11.7205, "precise",
  "The hill village where the poet Petrarch spent his last years and died in 1374; he kept a vineyard and praised the Euganean wines.", []),
]

if __name__ == '__main__':
    save('p6_veneto', regions, apps, sites)
