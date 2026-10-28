import sys, json
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import A, R, S, save

SRC = [
    ("EU eAmbrosia register (Trentino-Alto Adige PDOs)", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, EU wine PDO geospatial inventory", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("Provincia autonoma di Bolzano: Unità geografiche aggiuntive and DOC zones (WFS, geoservices6.civis.bz.it)", "https://geoservices6.civis.bz.it/geoserver/p_bz-Agriculture/ows?service=WFS&version=2.0.0&request=GetCapabilities"),
    ("DoctorWine: 86 UGAs recognized for Alto Adige wines (Oct 2024)", "https://www.doctorwine.wine/pot-pourri-en/86-ugas-recognized-for-alto-adige-wines/?lang=en"),
    ("Bevnet / Alto Adige Wines: latest developments on UGA classification (Apr 2026)", "https://bevnet.com/pr/2026/04/23/alto-adige-wines-shares-latest-developments-on-uga-classification"),
]

regions = [
R("Trentino-Alto Adige", ["Trentino-Südtirol"], None, 46.4, 11.2, 8.4,
  "Two autonomous provinces, two languages, one Adige valley: Alpine whites, Lagrein and Schiava in the north, Teroldego and Champagne-method Trento in the south.",
  "Trentino-Alto Adige is Italy's northernmost wine region, a deep Alpine corridor following the Adige river from the Austrian border south toward Lake Garda. It is really two regions. Alto Adige (Südtirol), the province of Bolzano, is German-speaking for two-thirds of its people, was Austrian until 1919, and makes some of Italy's most precise whites (Pinot Bianco, Sauvignon, Gewürztraminer, Kerner, Sylvaner) alongside Lagrein and Schiava reds on roughly 5,800 hectares. Trentino, the province of Trento, is Italian-speaking, larger in volume, and best known for Trento DOC sparkling wine, Teroldego Rotaliano and a mass of Pinot Grigio and Chardonnay.\n\nBoth provinces run on cooperatives: in Alto Adige about 70% of the grapes go to a dozen co-ops (Cantina Terlano, Cantina Tramin, Kellerei Kaltern, San Michele Appiano, Cantina Bolzano, Colterenzio, Girlan and others), several of which rank among Italy's best producers. Trentino's big co-ops (Mezzacorona, Cavit, La-Vis) dominate volume.",
  "The Raeti were making wine in these valleys before Rome; Roman authors praised Raetic wine and the wooden cask may have come to Italy from these Alpine peoples. In the Middle Ages, Bavarian and Tyrolean monasteries (the Augustinians at Novacella from 1142, the Benedictines at Muri-Gries) owned vineyards around Bolzano and Bressanone. Under the Habsburgs, Südtirol supplied Schiava to Vienna and Switzerland, and the first cooperatives formed from 1893 (Andriano), followed by Terlano (1893), San Michele Appiano (1907) and many others. In 1874 the Tyrolean Diet founded the agricultural school at San Michele all'Adige, today the Fondazione Edmund Mach, one of Europe's great vine-research institutes.\n\nAfter 1919 the region passed to Italy and was forcibly Italianised under fascism. Since the 1980s, Alto Adige has switched from bulk Schiava to high-quality whites and Pinot Noir, and in 2024 the Ministry approved 86 UGAs (Unità Geografiche Aggiuntive) for the Alto Adige DOC, a cru map drawn partly from the 18th-century Theresian Cadastre; 45 were used in the 2024 vintage and 52 in 2025, and the first UGA Riservas are due in late 2026. In Trentino, Giulio Ferrari founded his sparkling house in 1902 after studying in Champagne, and the Trento DOC (1993) was Italy's first DOC for metodo classico.",
  "The Adige and Isarco valleys cut through the Alps, so vineyards sit on valley floors at 200 m and terraced slopes up to 1,000 m and more. The climate is surprisingly warm: Bolzano is one of Italy's hottest cities in summer, with the Alps blocking cold northern air while southern air flows up the valley from Lake Garda (the Ora wind). Soils vary enormously: volcanic porphyry (the Bolzano quartz porphyry) around Bolzano, Terlano and the Oltradige; dolomitic limestone in the Bassa Atesina and Trentino; glacial moraine and schist in the Isarco and Venosta valleys; alluvial gravels in the Campo Rotaliano.",
  "Alto Adige: Schiava (Vernatsch), Lagrein, Pinot Noir (Blauburgunder), Pinot Bianco, Pinot Grigio, Chardonnay, Sauvignon, Gewürztraminer, Müller-Thurgau, Sylvaner, Kerner, Riesling, Moscato Giallo and Rosa. Trentino: Teroldego, Marzemino, Nosiola, Chardonnay, Pinot Grigio, Müller-Thurgau, Lagrein, Enantio.",
  "Aromatic and mineral whites, light Schiava reds, dark Lagrein, Pinot Noir, metodo classico sparkling, Vino Santo Trentino.",
  "In Alto Adige one DOC (Alto Adige / Südtirol) with subzones (Santa Maddalena, Terlano, Valle Isarco, Val Venosta, Meranese, Colli di Bolzano, Lago di Caldaro classico) and, since 2024, 86 UGAs. Trentino has Trento, Trentino, Teroldego Rotaliano, Casteller and Lago di Caldaro (shared). Valdadige crosses into Veneto.",
  ["Alto Adige", "Santa Maddalena", "Terlano", "Valle Isarco", "Val Venosta", "Meranese", "Colli di Bolzano", "Lago di Caldaro", "Trento", "Trentino", "Teroldego Rotaliano", "Casteller", "Valdadige", "Valdadige Terradeiforti"],
  SRC),
]

T = "Trentino-Alto Adige"
apps = []
apps.append(A("Alto Adige", "DOC", T, "Alto Adige", "1975", 5800, ["white", "red", "rose", "sparkling", "sweet"],
 "Schiava, Lagrein, Pinot Nero, Pinot Bianco, Pinot Grigio, Chardonnay, Sauvignon, Gewürztraminer, Müller-Thurgau, Sylvaner, Kerner, Riesling, Moscato Giallo, Moscato Rosa and others",
 "The Alto Adige / Südtirol DOC covers almost all the vineyards of the province of Bolzano, about 5,800 hectares, and is one of the few Italian denominations where whites outnumber reds (around 60% white). It is a varietal-led DOC with a large cast of grapes, unusually high average quality and a dominant cooperative sector that produces many of its top wines.\n\nThe DOC was created in 1975 (its 50th anniversary was celebrated at Vinitaly 2025), and it contains subzones that can appear on the label: Santa Maddalena (St. Magdalener) and Colli di Bolzano (Bozner Leiten) around Bolzano, Terlano (Terlaner), Meranese (Meraner), Valle Isarco (Eisacktaler) with its Bressanone (Brixner) and Klausen sections, Val Venosta (Vinschgau) and Lago di Caldaro classico. Since 2024 the DOC also has 86 UGAs, small named areas each with up to five permitted varieties and yields 25% lower than the DOC; a UGA symbol on the label marks these wines, which covered about 403 hectares and 6.7% of DOC production in 2025.\n\nThe white benchmarks are Terlano's long-lived Pinot Bianco and Sauvignon (some vintages released after decades on the lees), Tramin's Gewürztraminer Nussbaumer and Epokale, and San Michele Appiano's Sanct Valentin range. Lagrein, a dark native red, is grown on the hot gravels of Gries in Bolzano; Pinot Noir is at its best on the Mazon plateau above Egna and in Appiano Monte (Eppan Berg).",
 "Vineyards climb from about 200 m on the Adige valley floor to over 1,000 m in Val Venosta and Valle Isarco. Porphyry around Bolzano and Terlano gives mineral, long-lived wines; dolomitic limestone and moraine in the Bassa Atesina (Termeno, Cortaccia, Magrè) suit Gewürztraminer and Pinot Noir; schist, quartz-phyllite and moraine in the Isarco valley give taut Sylvaner, Kerner and Riesling. Summer heat in the valley bottom contrasts with cool nights from the mountains.",
 ["Cantina Terlano", "Cantina Tramin", "Kellerei Kaltern", "San Michele Appiano", "Cantina Bolzano", "Colterenzio", "Girlan", "Elena Walch", "J. Hofstätter", "Alois Lageder", "Manincor", "Abbazia di Novacella", "Gottardi", "Franz Haas", "Peter Dipoli", "Nals Margreid"],
 "The 86 UGAs were drawn using, among other evidence, place names from the Theresian Cadastre of the 1770s; Gries, Mazon, Eppan Berg and Brenntal are among the best known.",
 official="Alto Adige / dell'Alto Adige / Südtirol / Südtiroler", match=["Südtirol", "Sudtirol", "Alto Adige Südtirol"],
 contains=["Santa Maddalena", "Terlano", "Valle Isarco", "Val Venosta", "Meranese", "Colli di Bolzano"]))

def sub(name, de, created, styles, grapes, summary, terroir, prods, nerd):
    apps.append(A(name, "DOC", T, "Alto Adige subzone", created, None, styles, grapes, summary, terroir, prods, nerd,
                  official=name, match=[de, f"Alto Adige {name}", f"Südtiroler {de}"]))

sub("Santa Maddalena", "St. Magdalener", "1975 (subzone; historic DOC 1971)", ["red"], "Schiava (min 85%), Lagrein up to 15%",
 "The hillside vineyards around the little church of St. Magdalena on the north-eastern edge of Bolzano make Alto Adige's classic Schiava: pale ruby, fragrant with violets, almond and cherry, a touch of Lagrein for colour. Local lore holds that in the 1930s it was ranked among Italy's three great reds, alongside Barolo and Barbaresco. The Classico core is on the steep slopes of Rencio and St. Magdalena.",
 "Morainic and porphyry slopes rising behind Bolzano, very warm and sunny.", ["Cantina Bolzano", "Thomas Pichler", "Glögglhof Franz Gojer", "Unterganzner", "Hans Rottensteiner"],
 "The UGAs inside the classico area include St. Justina, Leitach, Rentsch and Prazöll, all small hillside hamlets of Bolzano.")
sub("Terlano", "Terlaner", "1975 (subzone)", ["white"], "Pinot Bianco, Chardonnay, Sauvignon, Pinot Grigio, Riesling, Müller-Thurgau",
 "Terlano is the most famous white-wine village of Alto Adige, between Bolzano and Merano. Its cooperative, the Cantina Terlano (1893), holds back wines for 10 to 30 years before release, proving that Pinot Bianco and Sauvignon from porphyry soils can age like great Burgundy. Terlaner Classico comes from the steep porphyry slopes above the village.",
 "Red quartz porphyry, sandy and mineral, on south-facing slopes up to about 900 m.", ["Cantina Terlano", "Nals Margreid"],
 "Cantina Terlano's 'Rarity' series releases wines that have spent more than a decade on fine lees in steel tanks.")
sub("Valle Isarco", "Eisacktaler", "1975 (subzone)", ["white", "red"], "Sylvaner, Kerner, Müller-Thurgau, Grüner Veltliner, Riesling, Gewürztraminer, Pinot Grigio, Zweigelt",
 "The Isarco (Eisack) valley north of Bolzano toward Bressanone and the Brenner Pass is Italy's northernmost wine zone, a land of steep terraces, monasteries and crisp, aromatic whites. Kerner, Sylvaner and Grüner Veltliner are specialities; Bressanone (Brixner) and Klausen are sub-areas. The Abbazia di Novacella (founded 1142) and the Cantina Valle Isarco co-op dominate, with growers like Kuenhof (Peter Pliger), Manni Nössing and Köfererhof.",
 "Schist, quartz-phyllite and glacial moraine at 500 to 900 m; cool, with strong day-night swings.", ["Abbazia di Novacella", "Cantina Valle Isarco", "Kuenhof", "Manni Nössing", "Köfererhof", "Strasserhof"],
 "Kerner, a Schiava x Riesling cross bred in Württemberg in 1929, found its best home in Italy here.")
sub("Val Venosta", "Vinschgau", "1995 (subzone)", ["white", "red"], "Riesling, Pinot Bianco, Pinot Nero, Müller-Thurgau, Kerner, Gewürztraminer",
 "The dry, high Vinschgau west of Merano, famous for apples, has a small number of vineyards at 500 to 900 m that make taut Riesling and Pinot Noir. Castel Juval, owned by the mountaineer Reinhold Messner, and Falkenstein (Franz Pratzner) are its best-known estates.",
 "Gneiss and schist on the sunny northern side of a rain-shadow valley with very low rainfall.", ["Falkenstein", "Castel Juval Unterortl", "Befehlhof"],
 "Reinhold Messner, the first man to climb all 14 eight-thousanders, owns Castel Juval and its vineyard.")
sub("Meranese", "Meraner", "1975 (subzone)", ["red"], "Schiava (min 85%)",
 "Light Schiava from the hills around Merano, the old Habsburg spa town, including the Burgraviato area. Fresh, fruity and meant for drinking young.",
 "Moraine and gneiss slopes of the Merano basin.", ["Cantina Merano", "Castel Rametz"],
 "Meranese is also called Meraner Hügel (Merano hill) on older labels.")
sub("Colli di Bolzano", "Bozner Leiten", "1975 (subzone)", ["red"], "Schiava (min 90%)",
 "Schiava from the slopes around Bolzano outside the St. Magdalener zone, slightly lighter in style.",
 "Porphyry and moraine around the Bolzano basin.", ["Cantina Bolzano"], "")

apps.append(A("Lago di Caldaro", "DOC", T, "Alto Adige and Trentino", "1970", None, ["red"], "Schiava (min 85%)",
 "Kalterersee, a light, soft Schiava from around Lake Caldaro (Kaltern) south of Bolzano, was once the most exported Italian red to Austria, Germany and Switzerland, drunk by the litre. The DOC is unusual in crossing the provincial border into Trentino. The Classico zone around the lake itself, often labelled Kalterersee Auslese with higher ripeness, has seen a quality revival led by Kellerei Kaltern and Manincor.",
 "Limestone and moraine slopes around the warm basin of Lake Caldaro.", ["Kellerei Kaltern", "Manincor", "Ritterhof", "Erste+Neue"],
 "Lake Caldaro is the warmest lake in the Alps, and its microclimate also ripens Cabernet and Merlot on the shores.",
 official="Lago di Caldaro / Kalterersee / Caldaro / Kalterer", match=["Kalterersee", "Caldaro", "Kalterer", "Kalterersee Auslese"]))

apps.append(A("Trento", "DOC", T, "Trentino", "1993", None, ["sparkling"], "Chardonnay, Pinot Nero, Pinot Bianco, Pinot Meunier",
 "Trento DOC was Italy's first DOC dedicated to metodo classico sparkling wine (1993) and is the second most important Italian traditional-method appellation after Franciacorta. Vineyards on the slopes of the Adige valley and its side valleys, often at 300 to 800 m, give Chardonnay with high acidity and a mountain freshness. Rules require at least 15 months on the lees (24 for millesimato, 36 for Riserva). The brand 'TrentoDOC' groups about 60 houses.\n\nGiulio Ferrari, who studied in Montpellier and Geisenheim and worked in Champagne, founded his company in 1902 and planted Chardonnay in Trentino; in 1952 he sold it to Bruno Lunelli, whose family built Ferrari into Italy's leading sparkling-wine brand. Giulio Ferrari Riserva del Fondatore is one of Italy's great wines. Rotari (Mezzacorona), Cesarini Sforza, Letrari, Revì, Maso Martis, Abate Nero and Altemasi (Cavit) are other names.",
 "Limestone, dolomite and porphyry slopes on the hills around Trento, the Valle di Cembra, Valsugana and Vallagarina; mountain altitude preserves acidity.",
 ["Ferrari", "Rotari", "Cesarini Sforza", "Letrari", "Maso Martis", "Revì", "Abate Nero", "Altemasi (Cavit)"],
 "Giulio Ferrari Riserva del Fondatore comes from the Lunelli family's Maso Pianizza Chardonnay vineyard at around 550 to 600 m and spends about a decade on the lees.",
 official="Trento", match=["TrentoDOC", "Trento DOC"]))
apps.append(A("Trentino", "DOC", T, "Trentino", "1971", 10000, ["white", "red", "rose", "sweet"], "Chardonnay, Pinot Grigio, Müller-Thurgau, Nosiola, Marzemino, Teroldego, Lagrein, Merlot, Cabernet and many others",
 "The umbrella DOC for the province of Trento, mostly varietal wines from the Adige valley, the Valle dei Laghi and Vallagarina. Most volume comes from big cooperatives (Cavit, Mezzacorona, La-Vis). Its gems include Marzemino from Isera (the wine Don Giovanni orders in Mozart's opera), Nosiola, the native white, and Vino Santo Trentino, a rare sweet wine from Nosiola grapes dried until Holy Week in the Valle dei Laghi, aged for several years before release.",
 "Alluvial valley floors and limestone, porphyry and moraine slopes.", ["Pojer e Sandri", "Pravis", "Cesconi", "Francesco Poli", "Maxentia", "San Leonardo", "Eugenio Rosi"],
 "Trentino's Vino Santo grapes are dried on racks (*arele*) until Easter week, and the wine spends years in small casks before release.",
 official="Trentino", match=["Vino Santo Trentino", "Trentino Superiore"]))
apps.append(A("Teroldego Rotaliano", "DOC", T, "Trentino", "1971", None, ["red", "rose"], "Teroldego (100%)",
 "Teroldego is the 'prince of Trentino', a dark, juicy red grown almost exclusively on the Campo Rotaliano, a triangular gravel plain where the Noce river meets the Adige between Mezzolombardo, Mezzocorona and San Michele all'Adige. It is deep purple, with blackberry, violet and tar, and lively acidity.\n\nIts modern reputation is the work of Elisabetta Foradori, who took over her family estate in Mezzolombardo in 1984, spent years selecting old clones from the vineyards to restore diversity lost to productive modern clones, converted to biodynamics in the 2000s and now ferments single-vineyard Teroldegos (Sgarzon, Morei) in clay amphorae from Spain. DNA work in the 2000s showed that Lagrein is probably Teroldego's offspring, that Marzemino belongs to the same family, and that Teroldego is closely related to Dureza, one of Syrah's parents.",
 "Deep alluvial gravels and sands of the Noce fan, well-drained, warm, sheltered by mountain walls on three sides.",
 ["Foradori", "Mezzacorona", "Dorigati", "De Vescovi Ulzbach", "Zeni", "Endrizzi"],
 "Through its close kinship with Dureza, a parent of Syrah, Teroldego is a distant Alpine cousin of the great Rhône grape.",
 official="Teroldego Rotaliano"))
apps.append(A("Casteller", "DOC", T, "Trentino", "1974", None, ["red"], "Schiava, Merlot, Lambrusco a foglia frastagliata (Enantio) and others",
 "A light red blend from the hills of Trento and Vallagarina, named after the Casteller hill above Trento.", "", ["Cantina Aldeno"], "", official="Casteller"))
apps.append(A("Valdadige", "DOC", T, "Adige valley", "1975", None, ["white", "red", "rose", "sparkling"], "Pinot Grigio, Chardonnay, Schiava, Enantio, Merlot and others",
 "A cross-regional DOC (Etschtaler in German) running down the Adige valley from Alto Adige through Trentino into the province of Verona, used mostly for Pinot Grigio and light reds.",
 "Valley floor alluvium and lower slopes of the Adige.", ["Cantina Valdadige"], "One of the few Italian DOCs spanning two regions and three provinces.",
 official="Valdadige / Etschtaler", match=["Etschtaler"]))

# Alto Adige UGA sites from official polygons (Provincia di Bolzano WFS)
pts = json.load(open('/home/claude/winesite/raw/bz_uga/AdditionalGeographicalLocations_pts.json'))
P = {p[0]: (p[3], p[4]) for p in pts if p[3]}
UGA = {
 "GRIES": ("Gries", "The historic Lagrein heartland on the alluvial gravels of the Talfer fan in western Bolzano, around the Benedictine Muri-Gries abbey. Hot, sandy and stony, it gives the deepest Lagrein in Alto Adige.", ["Cantina Bolzano", "Muri-Gries", "Josephus Mayr Erbhof Unterganzner", "Thomas Pichler"]),
 "MAZON": ("Mazon", "A gently sloping plateau above Egna/Neumarkt at 300 to 450 m, Alto Adige's most famous site for Pinot Noir, with Hofstätter's Barthenau Vigna Sant'Urbano as the benchmark.", ["J. Hofstätter", "Gottardi", "Bruno Gottardi", "Brunnenhof Mazzon"]),
 "EPPAN BERG": ("Eppan Berg", "The upper slopes of Appiano (Eppan) at 450 to 600 m in the Oltradige, a cool, calcareous-moraine site famous for Pinot Bianco, Sauvignon and Pinot Noir, the backyard of San Michele Appiano and Girlan.", ["San Michele Appiano", "Girlan", "Stroblhof"]),
 "BRENNTAL": ("Brenntal", "A 'burnt valley' amphitheatre near Cortaccia (Kurtatsch) famous for warm, ripe Cabernet and Merlot and Cantina Kurtatsch's Brenntal Merlot Riserva.", ["Cantina Kurtatsch"]),
 "TRAMIN-SOELL": ("Tramin-Söll", "The terraced slopes above Termeno (Tramin) around the hamlet of Söll, Gewürztraminer's spiritual home: the variety takes its name from this village, and Cantina Tramin's Nussbaumer comes from these parts.", ["Cantina Tramin", "Elena Walch", "J. Hofstätter"]),
 "TRAMIN-RUNGG": ("Tramin-Rungg", "Ronchi, the hillside hamlet south of Termeno, home of Elena Walch and of old Gewürztraminer pergolas.", ["Elena Walch", "Cantina Tramin"]),
 "ST. JUSTINA": ("St. Justina", "The steep hamlet of Santa Giustina on Bolzano's eastern slopes, a classic core site of St. Magdalener Schiava.", ["Cantina Bolzano", "Glögglhof Franz Gojer"]),
 "LEITACH": ("Leitach", "Leitach on the hillside above Bolzano's Rencio district, part of the St. Magdalener classico area, known for Schiava and Lagrein on porphyry and moraine.", ["Cantina Bolzano"]),
 "PRAZOELL": ("Prazöll", "A St. Magdalener classico hamlet on the slopes above Bolzano, among the steepest of the subzone, with old pergola-trained Schiava and a little Lagrein giving fragrant, almond-scented reds.", ["Cantina Bolzano"]),
 "RENTSCH": ("Rentsch", "Rencio, on Bolzano's eastern edge, a historic Lagrein and Schiava hamlet at the foot of St. Magdalena.", ["Cantina Bolzano", "Josephus Mayr Erbhof Unterganzner"]),
 "GRIES-MORITZING": ("Gries-Moritzing", "San Maurizio on the western edge of Bolzano, where Cantina Bolzano built its new winery in 2018 into the hillside.", ["Cantina Bolzano"]),
 "GIRLAN": ("Girlan", "Cornaiano in the Oltradige, the Schiava and Pinot Noir village of the Girlan cooperative, on moraine slopes at about 400 to 500 m.", ["Girlan", "Colterenzio"]),
 "MONTIGGL": ("Montiggl", "Monticolo between the two Monticolo lakes above Appiano, on porphyry and moraine, a cool white-wine site.", ["San Michele Appiano"]),
 "ST. JOSEF": ("St. Josef", "San Giuseppe al Lago on the shore of Lake Caldaro, warm and sheltered, the core of Kalterersee Classico; Manincor's estate lies here.", ["Manincor", "Kellerei Kaltern"]),
 "SIEBENEICH": ("Siebeneich", "Settequerce between Bolzano and Terlano on the floor of the Adige valley, hot alluvium suited to Lagrein and red Bordeaux varieties.", ["Cantina Terlano"]),
 "SIRMIAN": ("Sirmian", "Sirmiano above Nalles on the west side of the valley, cool porphyry slopes for whites.", ["Nals Margreid"]),
 "VORBERG": ("Vorberg", "The porphyry hillside above Terlano that gives the Cantina Terlano's famous Pinot Bianco Riserva Vorberg.", ["Cantina Terlano"]),
 "KREUTH": ("Kreuth", "A Terlano hillside site whose name appears on Cantina Terlano's Chardonnay Kreuth.", ["Cantina Terlano"]),
 "NAFEN": ("Nafen", "A steep, high site near Bressanone in the Valle Isarco, on schist and moraine, giving taut, aromatic whites such as Kerner, Sylvaner and Grüner Veltliner.", ["Abbazia di Novacella"]),
 "BRIXNER": ("Brixner", "The vineyards around Bressanone (Brixen), including those of the Abbazia di Novacella, the northernmost UGA cluster in Italy.", ["Abbazia di Novacella", "Köfererhof", "Kuenhof"]),
 "TIROL": ("Tirol", "The hillside of Tirolo above Merano, beneath Castel Tirolo, the castle that gave its name to the whole Tyrol.", ["Cantina Merano"]),
 "NATURNSER": ("Naturnser", "The south-facing slopes of Naturno at the mouth of Val Venosta, a dry rain-shadow valley where Pinot Noir and Riesling ripen slowly on gneiss and schist.", ["Falkenstein"]),
 "KASTELBELLER": ("Kastelbeller", "Castelbello in Val Venosta, home of Falkenstein's taut Riesling and Pinot Noir.", ["Falkenstein"]),
}
sites = []
for k, (nm, txt, prods) in UGA.items():
    if k in P:
        lat, lon = P[k]
        sites.append(S('uga-aa-' + nm.lower().replace(' ', '-').replace('ö', 'o').replace('.', ''), nm, "cru", "UGA (Alto Adige DOC, 2024)", "Alto Adige", lat, lon, "precise", txt, prods))

sites += [
S("cantina-terlano", "Cantina Terlano", "cellar", "Cooperative (1893)", "Terlano", 46.5307, 11.2515, "precise",
  "Founded in 1893, one of the great white-wine producers of Europe. Its legendary Pinot Bianco and Sauvignon from porphyry soils age for decades, and the 'Rarity' releases have spent ten or more years on the lees.", ["Cantina Terlano"]),
S("cantina-tramin", "Cantina Tramin", "cellar", "Cooperative (1898)", "Alto Adige", 46.3452, 11.2518, "precise",
  "Termeno's cooperative, housed since 2010 in a striking green-steel building by Werner Tscholl; its Nussbaumer and Epokale Gewürztraminers are reference wines for the grape in its namesake village.", ["Cantina Tramin"]),
S("termeno-tramin", "Termeno / Tramin", "village", "Birthplace of the Traminer name", "Alto Adige", 46.3415, 11.2423, "precise",
  "The village that gave its name to the Traminer family of grapes, including Gewürztraminer; documents from the 13th century mention Traminer wine.", ["J. Hofstätter", "Elena Walch", "Cantina Tramin"]),
S("abbazia-di-novacella", "Abbazia di Novacella (Kloster Neustift)", "historic", "Augustinian abbey (1142) and winery", "Valle Isarco", 46.7437, 11.6484, "precise",
  "Augustinian canons' abbey founded in 1142 near Bressanone, with vineyards and a winery that is the reference for Valle Isarco Sylvaner, Kerner and Grüner Veltliner.", ["Abbazia di Novacella"]),
S("muri-gries", "Abbazia Muri-Gries", "historic", "Benedictine abbey winery", "Alto Adige", 46.5000, 11.3390, "approx",
  "Benedictine monastery in Bolzano's Gries district since 1845, whose monks make some of the finest Lagrein from the surrounding gravels.", ["Muri-Gries"]),
S("san-michele-appiano", "Cantina San Michele Appiano", "cellar", "Cooperative (1907)", "Alto Adige", 46.4523, 11.2694, "precise",
  "Founded in 1907, made famous by winemaker Hans Terzer from 1977 with the Sanct Valentin line, especially Sauvignon.", ["San Michele Appiano"]),
S("kellerei-kaltern", "Kellerei Kaltern", "cellar", "Cooperative", "Lago di Caldaro", 46.4205, 11.2521, "precise",
  "Caldaro's merged cooperative, formed from the village's historic co-ops, which leads the quality revival of Kalterersee Schiava and also makes the Quintessenz range of sweet and still wines.", ["Kellerei Kaltern"]),
S("lago-di-caldaro", "Lake Caldaro (Kalterer See)", "landscape", "Classico zone of Lago di Caldaro DOC", "Lago di Caldaro", 46.3793, 11.2629, "precise",
  "The warmest bathing lake in the Alps, ringed by Schiava vineyards that give the Kalterersee Classico.", ["Manincor", "Kellerei Kaltern"]),
S("santa-maddalena-chiesa", "St. Magdalena church, Bolzano", "landscape", "Heart of the Santa Maddalena Classico zone", "Santa Maddalena", 46.5067, 11.3713, "approx",
  "The little Gothic church on the hill above Bolzano surrounded by Schiava pergolas, symbol of the Santa Maddalena subzone.", ["Glögglhof Franz Gojer", "Hans Rottensteiner"]),
S("castel-juval", "Castel Juval", "estate", "Producer", "Val Venosta", 46.6516, 10.9680, "precise",
  "Reinhold Messner's castle at the mouth of the Val Senales, with terraced vineyards farmed by the Aurich family under the Unterortl label.", ["Castel Juval Unterortl"]),
S("hofstatter", "J. Hofstätter", "estate", "Producer", "Alto Adige", 46.3417, 11.2396, "precise",
  "Termeno estate founded in 1907, owner of the Barthenau estate in Mazon (Pinot Noir Vigna Sant'Urbano) and the Kolbenhof Gewürztraminer.", ["J. Hofstätter"]),
S("ferrari-trento", "Ferrari (Cantine Ferrari)", "house", "Producer, founded 1902", "Trento", 46.0440, 11.1132, "precise",
  "Founded by Giulio Ferrari in 1902 and owned by the Lunelli family since 1952; Italy's best-known metodo classico house, with cellars at Ravina south of Trento.", ["Ferrari"]),
S("villa-margon", "Villa Margon (Ferrari)", "historic", "Renaissance villa", "Trento", 46.0420, 11.1000, "approx",
  "Lunelli family's 16th-century villa above Ravina with frescoes of Charles V, now Ferrari's hospitality house among its vineyards.", ["Ferrari"]),
S("foradori", "Foradori", "estate", "Producer", "Teroldego Rotaliano", 46.2155, 11.0948, "precise",
  "Elisabetta Foradori's biodynamic estate in Mezzolombardo, where she restored Teroldego's clonal diversity and makes amphora-fermented Teroldego and Nosiola.", ["Foradori"]),
S("campo-rotaliano", "Campo Rotaliano", "landscape", "Teroldego Rotaliano DOC zone", "Teroldego Rotaliano", 46.2000, 11.1150, "approx",
  "The flat gravel triangle between Mezzolombardo, Mezzocorona and San Michele, where the Noce meets the Adige; Teroldego's only true home, walled by cliffs on three sides.", ["Foradori", "Mezzacorona", "Dorigati"]),
S("fondazione-edmund-mach", "Fondazione Edmund Mach (Istituto Agrario San Michele all'Adige)", "historic", "Research institute (1874)", "Trentino", 46.1942, 11.1366, "precise",
  "Founded in 1874 in an Augustinian monastery by the Tyrolean Diet, with Edmund Mach as first director; one of Europe's leading vine-research centres, whose researchers published one of the first draft sequences of the grapevine (Pinot Noir) genome in 2007.", []),
S("san-leonardo", "Tenuta San Leonardo", "estate", "Producer", "Trentino", 45.7044, 10.9340, "precise",
  "The Guerrieri Gonzaga family's estate near Avio in the Vallagarina, whose Bordeaux-blend San Leonardo is one of Italy's classic reds.", ["San Leonardo"]),
S("pojer-e-sandri", "Pojer e Sandri", "estate", "Producer", "Trentino", 46.1929, 11.1556, "precise",
  "Faedo estate founded in 1975 by Mario Pojer and Fiorentino Sandri, pioneers of mountain Müller-Thurgau and sparkling wine.", ["Pojer e Sandri"]),
]

if __name__ == '__main__':
    save('p5_trentino_aa', regions, apps, sites)
