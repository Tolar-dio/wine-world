import sys
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import A, R, S, save

SRC = [
    ("EU eAmbrosia register (Emilia-Romagna PDOs)", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, EU wine PDO geospatial inventory", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("WineAlign: The confidence of Romagna Albana and Sangiovese (Oct 2020)", "https://www.winealign.com/articles/2020/10/16/the-confidence-of-romagna-albana-and-sangiovese"),
    ("Enoteca Regionale Emilia Romagna: Romagna DOC Sangiovese with MGA", "https://enotecaemiliaromagna.it/en/wines-and-wineries/dop-wines/romagna-dop/romagna-dop-sangiovese-con-una-delle-seguenti-menzioni-geografiche-aggiuntive-sottozone/"),
]

regions = [
R("Emilia-Romagna", [], None, 44.5, 11.2, 7.9,
  "Two regions joined by a Roman road: fizzy Lambrusco for Emilia's prosciutto and Parmigiano, and Sangiovese and Albana in the hills of Romagna.",
  "Emilia-Romagna stretches from Piacenza to the Adriatic along the Via Aemilia, the Roman road built in 187 BC, with the Apennines to the south and the flat Po plain to the north. It is one of Italy's largest wine producers, and it is really two wine cultures. Emilia, in the west (Piacenza, Parma, Reggio Emilia, Modena, Bologna), is the land of sparkling reds: Lambrusco in its many forms, frothy and purple, cutting through the richest food in Italy, plus the Gutturnio and Ortrugo of the Piacenza hills and the Pignoletto of Bologna. Romagna, in the east (Imola, Faenza, Forlì, Cesena, Rimini), drinks Sangiovese, grown on the Apennine foothills facing the Adriatic, and Albana, which in 1987 became Italy's first white DOCG.\n\nRecent decades have brought a revolution in quality: Lambrusco di Sorbara made by the traditional method (Cleto Chiarli, Paltrinieri, Vittorio Graziano), Romagna Sangiovese mapped into 12 subzones such as Modigliana, Predappio, Bertinoro and Brisighella, and dry and orange Albana from producers like Tre Monti, Fattoria Zerbina and Vigne dei Boschi.",
  "Etruscans and Celts cultivated wild Lambrusca vines (*Vitis labrusca* in Latin, the wild grapes of field margins, not the American species) before the Romans, and Cato, Varro and Pliny all mention them. Romagna's Sangiovese may be named after Mons Jovis near Santarcangelo, and the medieval hill town of Bertinoro is famous for its 'Column of Hospitality' (1300), whose rings told visitors which family would host them. Albana's legend has Galla Placidia, daughter of Emperor Theodosius, exclaiming in the fifth century that the wine deserved to be drunk 'in gold' (*berti in oro*), giving Bertinoro its name.\n\nIn the 1970s and 1980s, sweet, screw-capped Lambrusco (Riunite) became the best-selling imported wine in the United States, making Emilia's co-ops rich and its image cheap. The region's modern story is about recovering the dry, characterful Lambrusco of Modena's hills and plains and showing that Romagna Sangiovese can rival Tuscany's.",
  "Emilia's Lambrusco grows mostly on the flat, fertile alluvial plain of the Po and its tributaries (Secchia, Panaro), on sandy or clay soils, with high-trained vines. Castelvetro's Grasparossa grows on the first Apennine foothills. Romagna's Sangiovese is on the Apennine hills between 100 and 500 m, with a band of 'spungone' (yellow Pliocene calcareous sandstone) near Bertinoro and Brisighella, red clays (*terre rosse*) at Predappio, and marl-sandstone (*marnoso-arenacea*) higher up at Modigliana. The climate is continental, with hot summers and foggy winters on the plain; the Adriatic tempers Romagna.",
  "Lambrusco (di Sorbara, Grasparossa, Salamino, Maestri, Marani, Montericco), Ancellotta, Malvasia di Candia Aromatica, Ortrugo, Barbera and Croatina (Gutturnio), Pignoletto (Grechetto Gentile), Sangiovese, Albana, Trebbiano Romagnolo, Spergola, Fortana, Centesimino, Famoso.",
  "Sparkling dry and off-dry reds (Lambrusco), sparkling whites (Pignoletto, Ortrugo), Sangiovese reds, Albana dry, sweet and passito.",
  "Two DOCGs (Romagna Albana, Colli Bolognesi Pignoletto) and about 18 DOCs, with Romagna Sangiovese divided into 12 sottozone (MGAs).",
  ["Lambrusco di Sorbara", "Lambrusco Grasparossa di Castelvetro", "Lambrusco Salamino di Santa Croce", "Modena", "Reggiano", "Colli di Scandiano e di Canossa", "Colli Piacentini", "Gutturnio", "Ortrugo dei Colli Piacentini", "Colli di Parma", "Colli Bolognesi", "Colli Bolognesi Pignoletto", "Romagna Albana", "Romagna", "Colli di Faenza", "Colli d'Imola", "Colli di Rimini", "Colli Romagna Centrale", "Bosco Eliceo", "Reno"],
  SRC),
]

E = "Emilia-Romagna"
apps = []
apps.append(A("Lambrusco di Sorbara", "DOC", E, "Modena", "1970", None, ["red", "rose", "sparkling"], "Lambrusco di Sorbara (min 60%), Lambrusco Salamino",
 "The palest, most elegant Lambrusco, from the plain north of Modena around Sorbara and Bomporto between the Secchia and Panaro rivers. Lambrusco di Sorbara has a flower that often fails to set (it needs Salamino nearby as a pollinator), giving small bunches of light-coloured grapes; the wine is coral pink to pale ruby, with violet, strawberry and razor acidity. It is made by tank, by the ancestral method (rifermented in bottle and left cloudy) or by metodo classico. Cleto Chiarli, Paltrinieri (Radice, Leclisse), Cavicchioli (Vigna del Cristo), Vittorio Graziano and Cantina di Sorbara are references.",
 "Sandy alluvial soils between two rivers, whose sandiness gives perfume and lightness.", ["Paltrinieri", "Cleto Chiarli", "Cavicchioli", "Vittorio Graziano", "Cantina di Sorbara", "Francesco Bellei"],
 "Sorbara's poor fruit set (*acinellatura*) is why growers interplant Salamino as a pollinator, a rare case of a classic wine grape that needs a partner.",
 official="Lambrusco di Sorbara"))
apps.append(A("Lambrusco Grasparossa di Castelvetro", "DOC", E, "Modena", "1970", None, ["red", "rose", "sparkling"], "Lambrusco Grasparossa (min 85%)",
 "The darkest and most tannic Lambrusco, from the foothills south of Modena around Castelvetro, Maranello and Vignola. Grasparossa (named for its stems that turn red in autumn) gives deep purple, foaming wines with blackberry and a dry, slightly bitter finish, perfect with zampone and cotechino.",
 "Clay and limestone foothills of the Apennines.", ["Cleto Chiarli", "Manicardi", "Fattoria Moretto", "Vittorio Graziano", "Corte Manzini"],
 "Castelvetro's medieval checkerboard square inspired the town's Dama Vivente (living chess) festival, held every two years.",
 official="Lambrusco Grasparossa di Castelvetro"))
apps.append(A("Lambrusco Salamino di Santa Croce", "DOC", E, "Modena", "1970", None, ["red", "rose", "sparkling"], "Lambrusco Salamino (min 85%)",
 "From the plain around Santa Croce near Carpi, Salamino (its cylindrical bunch resembles a small salami) is the most widely planted Lambrusco and gives a balance between Sorbara's fragrance and Grasparossa's body.",
 "Clay and silt plain of the Secchia.", ["Cantina di Santa Croce", "Medici Ermete"], "", official="Lambrusco Salamino di Santa Croce"))
apps.append(A("Modena", "DOC", E, "Modena", "2009", None, ["red", "rose", "white", "sparkling"], "Lambrusco varieties, Ancellotta, Pignoletto, Trebbiano",
 "The umbrella DOC for the province of Modena, used mostly for Lambrusco di Modena blends.", "Plain and foothills.", ["Cleto Chiarli", "Cavicchioli"], "", official="Modena / di Modena", match=["Lambrusco di Modena", "di Modena"]))
apps.append(A("Reggiano", "DOC", E, "Reggio Emilia", "1996", None, ["red", "rose", "white", "sparkling"], "Lambrusco Salamino, Maestri, Marani, Montericco, Ancellotta",
 "The Lambrusco of Reggio Emilia, typically darker and softer than Modena's thanks to Ancellotta and the Maestri and Marani varieties; most volume of 'Lambrusco Reggiano' comes from here, including much of the sweet export style. Medici Ermete's single-vineyard Concerto (from Salamino) helped show the zone's potential for dry, serious Lambrusco.",
 "Alluvial plain of Reggio Emilia.", ["Medici Ermete", "Lini 910", "Venturini Baldini", "Cantine Riunite"], "Lini 910 is known for a long-aged metodo classico Lambrusco, a rarity in a zone dominated by the tank method.",
 official="Reggiano", match=["Lambrusco Reggiano"]))
apps.append(A("Colli di Scandiano e di Canossa", "DOC", E, "Reggio Emilia", "1977", None, ["white", "red", "sparkling"], "Spergola, Malvasia, Sauvignon, Lambrusco Grasparossa, Marzemino",
 "Hill wines south of Reggio Emilia around the castle of Canossa (where Emperor Henry IV knelt before Pope Gregory VII in 1077), notably Spergola, a high-acid white now made as sparkling and still wine.",
 "Clay and marl foothills.", ["Vigneto Saetti", "Ca' de Noci"], "Spergola was long confused with Sauvignon until DNA showed it is a distinct local grape.",
 official="Colli di Scandiano e di Canossa"))
apps.append(A("Colli Piacentini", "DOC", E, "Piacenza", "1984", None, ["white", "red", "sparkling", "sweet", "orange"], "Barbera, Croatina (Bonarda), Malvasia di Candia, Ortrugo, Trebbiano, Pinot Nero",
 "The hills of Piacenza province, continuing the Oltrepò Pavese, form four valleys (Tidone, Trebbia, Nure, Arda). The DOC has subzones Vigoleno (for a rare Vin Santo), Val Trebbia, Val Nure and Val d'Arda. Malvasia di Candia Aromatica makes aromatic whites still, sparkling or passito; La Stoppa's Ageno, a skin-macerated Malvasia blend by Elena Pantaleoni, is one of Italy's most influential orange wines.",
 "Clay and marl Apennine foothills.", ["La Stoppa", "Luretta", "Il Poggio di Vicobarone", "La Tosa", "Castello di Luzzano"],
 "Vin Santo di Vigoleno is made in tiny quantities from grapes dried for months in the medieval borgo of Vigoleno.",
 official="Colli Piacentini", match=["Vin Santo di Vigoleno"]))
apps.append(A("Gutturnio", "DOC", E, "Piacenza", "1967 (as Colli Piacentini type), registered separately 2011", None, ["red", "sparkling"], "Barbera (55 to 70%), Croatina (30 to 45%)",
 "Piacenza's signature red, Barbera blended with Croatina (Bonarda), made still or frizzante; Gutturnio Riserva and Superiore are the serious versions. Named after a Roman silver drinking vessel (*gutturnium*) found near Veleia.",
 "Clay and limestone hills of the Val Tidone and Val Nure.", ["La Stoppa", "Luretta", "La Tosa", "Torre Fornello"], "The Roman silver jug that inspired the name was found at the Roman town of Veleia in the Piacenza hills.",
 official="Gutturnio"))
apps.append(A("Ortrugo dei Colli Piacentini", "DOC", E, "Piacenza", "2011", None, ["white", "sparkling"], "Ortrugo (min 90%)",
 "Ortrugo, a native white grape (its name means 'other grape'), makes light, almondy sparkling and still wines in the Piacenza hills.",
 "Clay foothills.", ["Luretta", "Castello di Luzzano"], "", official="Ortrugo dei Colli Piacentini / Ortrugo – Colli Piacentini", match=["Ortrugo"]))
apps.append(A("Colli di Parma", "DOC", E, "Parma", "1982", None, ["white", "red", "sparkling"], "Malvasia di Candia Aromatica, Sauvignon, Barbera, Bonarda, Lambrusco",
 "The hills around Langhirano and Sala Baganza, famous for prosciutto, make Malvasia frizzante and light red sparklers to match.", "Clay and marl hills.", ["Monte delle Vigne", "Lamoretti"], "", official="Colli di Parma"))
apps.append(A("Colli Bolognesi Pignoletto", "DOCG", E, "Bologna", "DOCG 2011", None, ["white", "sparkling", "sweet"], "Grechetto Gentile (Pignoletto) min 85%",
 "Pignoletto is a crisp, lightly aromatic white from the hills south-west of Bologna, made still, frizzante, spumante and passito; the grape is the same as Umbria's Grechetto Gentile. A broader Pignoletto DOC covers the plain and surrounding provinces, while the hill DOCG is registered as Colli Bolognesi Classico Pignoletto. Orsi San Vito's col fondo and Gaggioli and Manaresi's still wines are references.",
 "Clay, sand and limestone hills of the Reno, Lavino and Samoggia valleys.", ["Vigneto San Vito (Orsi)", "Manaresi", "Gaggioli", "Tenuta Bonzara", "Isola"],
 "Pliny mentioned 'Pino Laeto' wines from the Bologna area, which some link to Pignoletto.",
 official="Colli Bolognesi Classico Pignoletto", match=["Colli Bolognesi Pignoletto", "Pignoletto"]))
apps.append(A("Colli Bolognesi", "DOC", E, "Bologna", "1975", None, ["white", "red", "sparkling"], "Barbera, Cabernet Sauvignon, Merlot, Pignoletto, Sauvignon, Chardonnay",
 "The hills south of Bologna, home to Bordeaux varieties since the 19th century; Enrico Vallania's Terre Rosse estate was an early pioneer of Cabernet in these hills.", "Clay and sandstone hills.", ["Tenuta Bonzara", "Isola", "Terre Rosse Vallania"], "", official="Colli Bolognesi"))
apps.append(A("Romagna Albana", "DOCG", E, "Romagna", "DOC 1967, DOCG 1987", None, ["white", "sweet", "orange"], "Albana (min 95%)",
 "Albana became Italy's first white DOCG in 1987, a decision widely mocked at the time because most Albana was dull and the promotion looked political. Since then producers have made the case: Albana is a thick-skinned, tannic white grape with apricot, almond and saffron notes, made dry (secco), amabile, sweet (dolce) and above all passito from dried or botrytised grapes. Fattoria Zerbina's Scacco Matto passito and Tre Monti's skin-contact Vitalba helped change minds. The zone covers hills of Bologna, Forlì-Cesena, Ravenna and Rimini provinces, centred on Bertinoro, Dozza and Faenza.",
 "Calcareous clays and spungone sandstone of the Romagna foothills.", ["Fattoria Zerbina", "Tre Monti", "Vigne dei Boschi", "Giovanna Madonia", "Celli", "Tenuta La Viola", "Ancarani"],
 "Legend says Galla Placidia, daughter of Emperor Theodosius, tasted Albana at Bertinoro and said it should be drunk 'in gold', which supposedly gave the hill town its name.",
 official="Romagna Albana", match=["Albana di Romagna"]))
apps.append(A("Romagna", "DOC", E, "Romagna", "2011", None, ["red", "white", "sparkling", "sweet"], "Sangiovese (min 95% for Romagna Sangiovese), Trebbiano, Cagnina (Refosco), Pagadebit (Bombino Bianco)",
 "The Romagna DOC unites the region's historic denominations: Romagna Sangiovese (formerly Sangiovese di Romagna, DOC 1967), Romagna Trebbiano, Romagna Cagnina (a sweet red from Refosco, drunk with roast chestnuts in autumn) and Romagna Pagadebit ('pays the debts', a hardy white). Sangiovese is the core: the hills are divided into 12 sottozone (MGAs) that may appear on the label: Serra, Brisighella, Marzeno, Oriolo, Modigliana, Castrocaro, Predappio, Bertinoro, Cesena, San Vicino, Longiano and Meldola. Each has a distinct character: Modigliana on high, cool marl-sandstone at 180 to 570 m gives tense, pale wines; Predappio's red clays give silky tannin; Bertinoro's spungone gives power. Riserva ages two years. Romagna Sangiovese Superiore is the standard bearer; producers include Fattoria Zerbina, Torre San Martino, Villa Papiano, Il Pratello, Fattoria Nicolucci, Noelia Ricci, Tenuta La Viola and Giovanna Madonia.",
 "Apennine foothills from Imola to Rimini: spungone, calcareous clays, red clays and marl-sandstone, at 100 to 600 m, with sea breezes from the Adriatic.",
 ["Fattoria Zerbina", "Torre San Martino", "Villa Papiano", "Il Pratello", "Fattoria Nicolucci", "Noelia Ricci", "Tenuta La Viola", "Giovanna Madonia", "Drei Donà", "San Patrignano", "Castelluccio", "Stefano Ferrucci", "Paolo Francesconi"],
 "Modigliana's growers formed their own association, Modigliana Stella dell'Appennino, and argue that their cool, high, marl-sandstone valleys make Sangiovese closer to Chianti Classico than to the rest of Romagna.",
 official="Romagna", match=["Romagna Sangiovese", "Sangiovese di Romagna", "Romagna Cagnina", "Romagna Pagadebit", "Romagna Trebbiano"],
 contains=["Serra", "Brisighella", "Marzeno", "Oriolo", "Modigliana", "Castrocaro", "Predappio", "Bertinoro", "Cesena", "San Vicino", "Longiano", "Meldola"]))

def small(name, created, styles, grapes, summary, official=None, match=(), nerd=""):
    apps.append(A(name, "DOC", E, None, created, None, styles, grapes, summary, "", [], nerd, official=official or name, match=match))
small("Colli di Faenza", "1997", ["red", "white"], "Sangiovese, Cabernet, Merlot, Ciliegiolo, Pinot Bianco, Chardonnay, Trebbiano", "Hill blends around Faenza, the ceramics town.")
small("Colli d'Imola", "1997", ["red", "white", "sparkling"], "Sangiovese, Cabernet, Barbera, Trebbiano, Pignoletto, Chardonnay", "Varietal and blended wines from the Imola hills, home of the Formula One circuit.")
small("Colli di Rimini", "1996", ["red", "white", "sweet"], "Sangiovese, Cabernet, Rebola (Pignoletto), Biancame", "Hill wines behind Rimini, including the sweet Rebola.", nerd="Rebola is a local name for Grechetto Gentile, the same grape as Pignoletto.")
small("Colli Romagna Centrale", "2001", ["red", "white"], "Sangiovese, Cabernet, Merlot, Chardonnay, Trebbiano", "Hill blends from the central Romagna Apennines around Cesena and Forlì.", official="Colli Romagna centrale", match=["Colli Romagna Centrale"])
small("Bosco Eliceo", "1989", ["red", "white", "sparkling"], "Fortana (Uva d'Oro), Trebbiano, Sauvignon, Merlot", "The DOC of the sandy coastal dunes and pine woods of the Po delta near Ferrara and Ravenna, famous for Fortana, an acidic, lightly sparkling red often ungrafted on the sand.", nerd="Fortana grows on its own roots in the delta sands, where phylloxera cannot survive.")
small("Pignoletto", "2014", ["white", "sparkling", "sweet"], "Grechetto Gentile (Pignoletto) min 85%", "The broad DOC created in 2014 for Pignoletto from the plain and hills of Bologna, Modena and Ravenna provinces, mostly frizzante and spumante; the hill classic is the Colli Bolognesi Classico Pignoletto DOCG.", nerd="Creating the DOC made Pignoletto a protected place name, so the grape must now be called Grechetto Gentile on labels elsewhere.")
small("Reno", "1987", ["white", "sparkling"], "Albana, Trebbiano, Montuni, Pignoletto", "A plain DOC north of Bologna along the Reno river, known for the local Montuni white grape.")

sites = []
def sz(slug, name, lat, lon, text, prods):
    sites.append(S("romagna-" + slug, name, "cru", "Sottozona (MGA), Romagna Sangiovese", "Romagna", lat, lon, "approx", text, prods))
sz("modigliana", "Modigliana", 44.1595, 11.7929, "The highest, coolest and most forested subzone (180 to 570 m), on the marnoso-arenacea (marl-sandstone) of three valleys, the Ibola, Acerreta and Tramazzo; its pale, tense, perfumed Sangiovese has become the cult corner of Romagna.", ["Torre San Martino", "Villa Papiano", "Il Pratello", "Castelluccio", "Mutiliana"])
sz("predappio", "Predappio", 44.1032, 11.9841, "Calcareous Pliocene clays (red and grey) at 120 to 400 m in the Rabbi valley, giving silky, ripe tannins; Fattoria Nicolucci (estate since 1880) and Noelia Ricci are references.", ["Fattoria Nicolucci", "Noelia Ricci", "Condé", "Stefano Berti"])
sz("bertinoro", "Bertinoro", 44.1487, 12.1365, "The 'balcony of Romagna' above Forlì and Cesena, 100 to 350 m, on light clay-loam with limestone and the yellow spungone sandstone; powerful, structured Sangiovese and Albana.", ["Celli", "Tenuta La Viola", "Giovanna Madonia", "Raffaella Bissoni", "Fattoria Paradiso"])
sz("brisighella", "Brisighella", 44.2223, 11.7736, "Spungone and gypsum ridges around the medieval town of three hills (rocca, clock tower and sanctuary), giving fresh, salty Sangiovese.", ["Podere La Berta"])
sz("marzeno", "Marzeno", 44.2337, 11.8606, "The Marzeno valley south of Faenza, home of Fattoria Zerbina, whose Pietramora Riserva and Albana passito made Romagna famous.", ["Fattoria Zerbina"])
sz("oriolo", "Oriolo", 44.2550, 11.9050, "The hills around the hexagonal 15th-century Torre di Oriolo south-east of Faenza, on clays and spungone, giving fresh, mid-weight Sangiovese.", ["Ancarani"])
sz("serra", "Serra", 44.2900, 11.6900, "The westernmost subzone in the Imola hills of Bologna province around Serra and Castel del Rio.", ["Tre Monti"])
sz("castrocaro", "Castrocaro", 44.1756, 11.9495, "Hills around the spa town of Castrocaro Terme and Terra del Sole, on spungone and clay.", ["Stefano Ferrucci"])
sz("meldola", "Meldola", 44.1278, 12.0626, "The Bidente valley around Meldola, south of Forlì, a cooler inland subzone of clay and sandstone hills.", ["Tenuta Pertinello"])
sz("cesena", "Cesena", 44.1200, 12.2300, "Hills south of Cesena in the Savio valley on clays and sands, near the Adriatic, giving rounder, riper Sangiovese.", ["Tenuta Santa Lucia"])
sz("san-vicino", "San Vicino", 44.0450, 12.3050, "The small hills between the Savio and Rubicone around San Vicinio, near the coast.", [])
sz("longiano", "Longiano", 44.0745, 12.3297, "The easternmost subzone, the hills around the castle of Longiano near the Rubicon.", ["Drei Donà"])

sites += [
S("bertinoro-colonna", "Colonna dell'Ospitalità, Bertinoro", "historic", "Medieval monument (c. 1300)", "Romagna Albana", 44.1484, 12.1357, "approx",
  "The 'Column of Hospitality' in Bertinoro's main square, where noble families competed to host travellers: the ring a traveller tied his horse to decided which family would host him. Bertinoro calls itself the 'city of wine and hospitality'.", []),
S("rocca-bertinoro", "Rocca di Bertinoro", "historic", "Medieval fortress", "Romagna", 44.1474, 12.1331, "precise",
  "The hilltop fortress of Bertinoro with views from the Apennines to the Adriatic, overlooking the Albana and Sangiovese vineyards.", []),
S("fattoria-zerbina", "Fattoria Zerbina", "estate", "Producer", "Romagna Albana", 44.2337, 11.8606, "precise",
  "Cristina Geminiani's Marzeno estate, whose botrytised Albana passito Scacco Matto and Sangiovese Pietramora helped prove Romagna's quality from the late 1980s.", ["Fattoria Zerbina"]),
S("tre-monti", "Tre Monti", "estate", "Producer", "Romagna Albana", 44.3099, 11.7203, "approx",
  "The Navacchia family's estate in the Imola hills, known for skin-contact Albana and organic Sangiovese.", ["Tre Monti"]),
S("cleto-chiarli", "Cleto Chiarli", "estate", "Producer, founded 1860", "Lambrusco Grasparossa di Castelvetro", 44.5307, 10.9675, "precise",
  "Founded in Modena in 1860 by Cleto Chiarli, often called the oldest Lambrusco house; its Tenuta Cialdini at Castelvetro and Sorbara Vecchia Modena Premium are references.", ["Cleto Chiarli"]),
S("cantina-di-sorbara", "Cantina di Sorbara", "cellar", "Cooperative", "Lambrusco di Sorbara", 44.7404, 11.0266, "precise",
  "The cooperative of Lambrusco di Sorbara's home village between the Secchia and Panaro.", ["Cantina di Sorbara"]),
S("paltrinieri", "Paltrinieri", "estate", "Producer", "Lambrusco di Sorbara", 44.7450, 11.0200, "approx",
  "Alberto Paltrinieri's estate at Cristo di Sorbara, a leader in serious dry Sorbara (Radice ancestral method, Leclisse).", ["Paltrinieri"]),
S("la-stoppa", "La Stoppa", "estate", "Producer", "Colli Piacentini", 44.9032, 9.6339, "precise",
  "Elena Pantaleoni's estate at Rivergaro in the Trebbia valley, whose skin-macerated Ageno and long-aged Barbera and Bonarda (Macchiona) are natural-wine landmarks.", ["La Stoppa"]),
S("castello-vigoleno", "Castello di Vigoleno", "historic", "Medieval borgo", "Colli Piacentini", 44.8167, 9.9014, "precise",
  "The walled medieval village in the Arda valley that gives its name to the rare Vin Santo di Vigoleno.", []),
S("castelvetro-piazza", "Castelvetro di Modena", "village", "Heart of Lambrusco Grasparossa", "Lambrusco Grasparossa di Castelvetro", 44.5042, 10.9467, "precise",
  "The hill village whose checkerboard piazza and Rangoni castle overlook the Grasparossa vineyards.", []),
]

if __name__ == '__main__':
    save('p8_emilia', regions, apps, sites)
