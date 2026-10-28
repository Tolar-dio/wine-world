import sys
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import A, R, S, save

SRC = [
    ("EU eAmbrosia register (Friuli Venezia Giulia PDOs)", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, EU wine PDO geospatial inventory", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("Regione FVG IRDAT: Vigneti CTRN dataset", "https://irdat.regione.fvg.it/"),
]

regions = [
R("Friuli Venezia Giulia", ["Friuli", "Furlanija Julijska krajina"], None, 46.0, 13.2, 8.4,
  "Italy's white-wine frontier between the Alps, the Adriatic and Slovenia, where modern Italian white wine was invented and orange wine was reborn.",
  "Friuli Venezia Giulia sits in Italy's north-east corner, bordered by Austria and Slovenia, a meeting point of Latin, Germanic and Slavic cultures where many villages have Italian, Friulian and Slovene names. It produces some of Italy's finest whites, and its history explains why: in the 1960s and 1970s producers like Mario Schiopetto, Livio Felluga and Silvio Jermann pioneered temperature-controlled fermentation and clean, aromatic varietal whites at a time when most Italian whites were oxidised and flat. The so-called 'Friulian white revolution' shaped Italian winemaking for a generation.\n\nThe hills are the quality heartland. Collio (Brda in Slovene) and Friuli Colli Orientali, on the Slovenian border, grow Friulano, Ribolla Gialla, Malvasia Istriana, Sauvignon, Pinot Grigio and native reds like Schioppettino, Pignolo and Refosco on flysch marl-sandstone called *ponca*. The Carso (Karst) plateau above Trieste is limestone and red earth. The larger, flatter zones (Friuli Grave, Isonzo, Aquileia, Latisana, Annia) make most of the volume, including a large share of Prosecco DOC and Pinot Grigio delle Venezie. Oslavia, a hamlet of Gorizia on the border, is where Josko Gravner and Stanko Radikon revived skin-macerated, amphora-aged white wine in the 1990s, launching the global orange-wine movement.",
  "Aquileia, founded by the Romans in 181 BC, was one of the largest cities of the empire and a wine port; Pucinum wine from the Karst near Trieste was drunk by the Empress Livia, who credited it with her long life, according to Pliny. Through the Middle Ages the Patriarchate of Aquileia, then Venice, then (from 1500 in Gorizia and 1797 elsewhere) the Habsburgs ruled the area; Gorizia and Trieste supplied wine to Vienna until 1918. Picolit was a fashionable sweet wine in 18th-century European courts thanks to Count Fabio Asquini, who exported it in Murano glass bottles.\n\nThe 20th century was brutal: front lines of the First World War ran through Collio (Oslavia's ossuary holds 57,000 soldiers), and after 1947 the border with Yugoslavia split vineyards and families. Growers often own plots on both sides of the line. Since the 1960s the region has been a laboratory of Italian white winemaking, and since the 1990s of natural and skin-contact wine. The Friuli DOC (2016) and delle Venezie DOC (2017) were created to manage the region's volume wines.",
  "The region rises from the Adriatic lagoons through gravelly plains (the Grave, formed by the Tagliamento and other rivers) to the Collio and Colli Orientali hills and then to the Julian and Carnic Alps. Cold air from the Alps and warm air from the Adriatic meet over the hills, giving large day-night swings that preserve aromatics. The hills' *ponca* (Eocene flysch of alternating marl and sandstone layers) crumbles into mineral-rich soils and is the key to Collio's whites. The Isonzo plain has red, iron-rich gravels; the Carso is karst limestone with thin red *terra rossa*. Rainfall is high, especially in the north (Ramandolo is one of Italy's wettest wine zones), and the Bora wind can be fierce near Trieste.",
  "Whites: Friulano (formerly Tocai Friulano, Sauvignonasse), Ribolla Gialla, Malvasia Istriana, Pinot Grigio, Pinot Bianco, Sauvignon, Chardonnay, Verduzzo Friulano, Picolit, Vitovska (Carso). Reds: Refosco dal Peduncolo Rosso, Schioppettino (Ribolla Nera), Pignolo, Tazzelenghe, Terrano (Carso), Merlot, Cabernet Franc (much of which proved to be Carmenère).",
  "Aromatic and mineral whites, white blends, skin-macerated orange wines, native reds, sweet Picolit and Ramandolo.",
  "Four DOCGs (Colli Orientali del Friuli Picolit, Ramandolo, Rosazzo, Lison shared with Veneto) and about 12 DOCs, including the regional Friuli DOC (2016), plus Prosecco and delle Venezie.",
  ["Collio", "Friuli Colli Orientali", "Colli Orientali del Friuli Picolit", "Ramandolo", "Rosazzo", "Carso", "Friuli Isonzo", "Friuli Grave", "Friuli Aquileia", "Friuli Latisana", "Friuli Annia", "Friuli"],
  SRC),
]

F = "Friuli Venezia Giulia"
apps = []
apps.append(A("Collio", "DOC", F, "Collio", "1968", None, ["white", "red", "orange"], "Friulano, Ribolla Gialla, Malvasia Istriana, Pinot Grigio, Pinot Bianco, Sauvignon, Chardonnay, Merlot, Cabernet Franc, Pinot Nero",
 "Collio Goriziano, usually just Collio, is a crescent of hills between Gorizia and the Slovenian border, around Cormons, Capriva, San Floriano, Oslavia and Dolegna. With roughly 1,300 to 1,500 hectares it is small, but it has the best claim to be Italy's greatest white-wine zone. Its wines are aromatic yet structured and saline, from Friulano (pear, almond, meadow herbs), Ribolla Gialla (citrus, high acid), Malvasia Istriana, Sauvignon and Pinot Grigio, and especially from the field blend that Collio's growers call Collio Bianco, made from native grapes.\n\nThe zone was the cradle of the 1960s white revolution: Mario Schiopetto at Capriva, inspired by German and Alsatian cellars, used stainless steel and cool fermentation to make clean varietal whites; Josko Gravner and Stanko Radikon at Oslavia later went the other way, back to long skin maceration and amphorae. The Collio continues across the border as Goriška Brda in Slovenia, where growers like Movia and Marjan Simčič farm the same hills. The DOC was among the first in Italy (1968) and its consortium has spent the 2020s promoting Collio Bianco, a blend from local grapes, as the zone's signature wine.",
 "Ponca: layers of Eocene marl and sandstone that weather into friable, calcareous, mineral soils on terraced slopes of 100 to 300 m. The Julian Alps shelter the hills from the north, the Adriatic is 25 km south, and wide day-night temperature swings sharpen aromatics.",
 ["Schiopetto", "Gravner", "Radikon", "La Castellada", "Edi Keber", "Venica & Venica", "Jermann", "Russiz Superiore", "Villa Russiz", "Primosic", "Il Carpino", "Raccaro", "Borgo del Tiglio", "Fiegl", "Toros"],
 "Edi Keber convinced his neighbours to make a single Collio white blend from native grapes, and his estate now makes essentially only that one wine.",
 official="Collio Goriziano / Collio", match=["Collio Goriziano", "Collio Bianco"]))
apps.append(A("Friuli Colli Orientali", "DOC", F, "Colli Orientali", "1970", None, ["white", "red", "sweet", "orange"], "Friulano, Ribolla Gialla, Sauvignon, Verduzzo, Picolit, Refosco, Schioppettino, Pignolo, Tazzelenghe, Merlot, Cabernet",
 "The eastern hills of the province of Udine, from Tarcento in the north through Cividale, Prepotto, Corno di Rosazzo and Buttrio to Manzano, continuing the Collio toward the north-west. Larger and more varied than Collio, the Colli Orientali are the home of Friuli's great native reds: Schioppettino (peppery, cool-climate, revived by Paolo Rapuzzi of Ronchi di Cialla in the 1970s), Pignolo (dark, tannic, rescued from the Abbey of Rosazzo's vineyards) and Refosco, as well as some of the finest Friulano and sweet Verduzzo and Picolit. Subzones include Cialla, Prepotto (for Schioppettino), Rosazzo (now a separate DOCG) and Ramandolo (DOCG). Miani, Le Due Terre, Ronchi di Cialla, Bastianich, Ronco del Gnemiz, Dorigo and Livio Felluga are leading names.",
 "Ponca flysch on terraced hills, with cooler, wetter conditions toward the north near the Alps.",
 ["Miani", "Le Due Terre", "Ronchi di Cialla", "Livio Felluga", "Ronco del Gnemiz", "Dorigo", "Bastianich", "La Viarte", "Vignai da Duline", "Ronco Severo", "Rocca Bernarda"],
 "Schioppettino's name refers to the 'little shots' or pops of its crisp berries, or to the faint prickle the wine once had; the variety was not even officially authorised until the late 1970s, after the Rapuzzis' campaign.",
 official="Friuli Colli Orientali", match=["Colli Orientali del Friuli", "COF"]))
apps.append(A("Colli Orientali del Friuli Picolit", "DOCG", F, "Colli Orientali", "DOCG 2006", None, ["sweet", "white"], "Picolit (min 85%)",
 "Picolit is one of Italy's rarest and most romantic sweet wines, from a grape whose flowers are largely sterile, so it sets only a few berries per bunch ('picolit' means 'little'). Grapes are dried on the vine or on mats to make a delicate, honeyed wine with apricot and acacia. In the 18th century Count Fabio Asquini of Fagagna sold it to the courts of Europe in hand-blown Murano bottles; it was revived in the 20th century by Giuseppe Perusini of Rocca Bernarda. The Cialla subzone has its own label.",
 "Ponca hills of the Colli Orientali.", ["Rocca Bernarda", "Ronchi di Cialla", "Livio Felluga", "Girolamo Dorigo", "Marco Sara"],
 "Picolit's natural floral abortion (it sets as few as a dozen berries per bunch) keeps yields so low that it was nearly abandoned in the 19th century.",
 official="Colli Orientali del Friuli Picolit", match=["Picolit"]))
apps.append(A("Ramandolo", "DOCG", F, "Colli Orientali", "DOCG 2001", None, ["sweet"], "Verduzzo Friulano (Verduzzo Giallo) 100%",
 "Friuli's first DOCG (2001): sweet Verduzzo from the steep, wet hills around Ramandolo and Nimis north of Udine, where the Alps rise abruptly. The grapes are late-harvested or dried; the wine is golden, honeyed and almondy, with a tannic grip unusual in a sweet white. The Dri family (Il Roncat) and Anna Berra are reference producers.",
 "Steep ponca terraces at 350 to 500 m in one of the wettest wine zones of Italy, below Monte Bernadia.", ["Giovanni Dri (Il Roncat)", "Anna Berra", "Dario Coos"],
 "Verduzzo's tannin comes from its thick skins, making Ramandolo one of the few sweet whites with noticeable grip.",
 official="Ramandolo"))
apps.append(A("Rosazzo", "DOCG", F, "Colli Orientali", "DOCG 2011", None, ["white"], "Friulano (min 50%), Sauvignon, Chardonnay, Pinot Bianco, Ribolla Gialla",
 "A DOCG for white blends from the hills around the Abbey of Rosazzo in Manzano, Corno di Rosazzo, Premariacco, San Giovanni al Natisone and Buttrio. Livio Felluga's Terre Alte, first made in 1981, is the archetypal Rosazzo blend. Rosazzo Pignolo, though famous, falls under Colli Orientali rules.",
 "Ponca hills around the abbey, well ventilated, with a warm microclimate.", ["Livio Felluga", "Ronchi di Manzano", "Le Vigne di Zamò", "Ermacora", "Torre Rosazza"],
 "The Abbey of Rosazzo, founded around 1070, preserved the last Pignolo vines through the 20th century.", official="Rosazzo"))
apps.append(A("Carso", "DOC", F, "Carso", "1985", None, ["white", "red", "orange"], "Vitovska, Malvasia Istriana, Terrano (Refosco), Sauvignon",
 "The Karst plateau that runs from Trieste into Slovenia is a land of limestone, sinkholes, caves and the fierce Bora wind, where small growers carve vineyards out of rock and dig cellars into the stone. Native Vitovska and Malvasia Istriana make saline, mineral whites, often skin-macerated in amphorae; Terrano, a local Refosco, gives a sharp, iron-rich red. Edi Kante, Paolo Vodopivec, Benjamin Zidarich and Sandi Skerk have made the Carso a pilgrimage site for natural-wine lovers.",
 "Karst limestone with thin red *terra rossa* soils, often bulldozed and crushed by hand to make vineyards; strong winds and Adriatic influence.",
 ["Kante", "Vodopivec", "Zidarich", "Skerk", "Castelvecchio", "Lupinc"],
 "Pliny wrote that the Empress Livia attributed her 86 years to Pucinum, a wine from the rocky coast near Trieste, often identified with today's Prosecco and Carso area.",
 official="Carso / Carso - Kras", match=["Carso - Kras", "Kras"]))
apps.append(A("Friuli Isonzo", "DOC", F, "Isonzo", "1974", None, ["white", "red", "sparkling", "sweet"], "Friulano, Pinot Grigio, Sauvignon, Chardonnay, Malvasia, Merlot, Cabernet, Refosco",
 "The plain along the Isonzo river south of the Collio, from Gradisca to Mariano and Romans, on red, iron-rich gravels. Gianfranco Gallo's Vie di Romans proved that this flat land could make whites as powerful as any in the hills, and Lis Neris and Ronco del Gelso followed.",
 "Ferrous red gravels and clays of the Isonzo terraces on the right bank; whiter calcareous gravels on the left.",
 ["Vie di Romans", "Lis Neris", "Ronco del Gelso", "Tenuta Villanova", "Drius"],
 "Isonzo's 'rive alte' (high banks) and 'rive basse' have different soils, which producers label separately.",
 official="Friuli Isonzo / Isonzo del Friuli", match=["Isonzo del Friuli", "Isonzo"]))
apps.append(A("Friuli Grave", "DOC", F, "Grave", "1970", None, ["white", "red", "rose", "sparkling"], "Pinot Grigio, Friulano, Chardonnay, Sauvignon, Merlot, Cabernet, Refosco",
 "The largest DOC in Friuli, on the vast gravel plain of the Tagliamento and Cellina rivers in Pordenone and Udine provinces. Most of Friuli's volume Pinot Grigio, Merlot and Prosecco base comes from here. The village of Rauscedo hosts the world's largest grapevine nursery cooperative (Vivai Cooperativi Rauscedo), which supplies tens of millions of grafted vines a year worldwide.",
 "Deep, stony gravels (*grave*) that drain quickly and heat up, with strong day-night swings near the mountains.", ["Borgo Magredo", "Pitars", "Vigneti Le Monde"],
 "Rauscedo's nurseries produce a large share of all grafted vines planted in Italy, and many in the world.",
 official="Friuli Grave", match=["Grave del Friuli"]))
apps.append(A("Friuli Aquileia", "DOC", F, "Aquileia", "1975", None, ["white", "red", "rose"], "Refosco, Merlot, Cabernet, Friulano, Pinot Grigio, Chardonnay",
 "The plain around the Roman city of Aquileia toward the lagoon of Grado. Refosco dal Peduncolo Rosso is the local specialty. The Basilica of Aquileia, with its fourth-century mosaic floor, is a UNESCO site.",
 "Alluvial clays and sands near the lagoon.", ["Ca' Bolani", "Tarlao"], "Aquileia was a major wine port in Roman times and amphorae from its trade fill the local museum.",
 official="Friuli Aquileia", match=["Aquileia"]))
apps.append(A("Friuli Latisana", "DOC", F, "Latisana", "1975", None, ["white", "red"], "Friulano, Pinot Grigio, Refosco, Merlot, Cabernet",
 "A plain DOC on the lower Tagliamento near the Venetian border, making light varietal wines.", "Alluvial plain.", [], "", official="Friuli Latisana", match=["Latisana"]))
apps.append(A("Friuli Annia", "DOC", F, "Annia", "1995", None, ["white", "red"], "Friulano, Pinot Grigio, Refosco, Merlot",
 "A small DOC near the lagoon of Marano, named after the Roman Via Annia that ran from Aquileia to Padua.", "Clay and sandy soils by the lagoon.", [], "", official="Friuli Annia", match=["Annia"]))
apps.append(A("Friuli", "DOC", F, None, "2016", None, ["white", "red", "rose", "sparkling"], "All regional varieties",
 "The regional DOC Friuli / Friuli Venezia Giulia (with Friulian and Slovene names Furlanija / Furlanija Julijska krajina), created in 2016 to give the whole region a single, recognisable name for exported varietal wines.",
 "", [], "It is one of the only Italian DOCs with names in four languages: Italian, Friulian and two Slovene forms.",
 official="Friuli / Friuli Venezia Giulia / Furlanija / Furlanija Julijska krajina", match=["Friuli Venezia Giulia"]))

sites = [
S("gravner", "Gravner", "estate", "Producer", "Collio", 45.9826, 13.6066, "precise",
  "Josko Gravner's estate at Lenzuolo Bianco, Oslavia, on the Slovenian border. After fame for modern barrel-fermented whites, he turned in 1997 to long skin maceration and, from 2001, to Georgian clay *qvevri* buried in his cellar, making amber Ribolla Gialla that ages seven years before release. He is the godfather of modern orange wine.", ["Gravner"]),
S("radikon", "Radikon", "estate", "Producer", "Collio", 45.9828, 13.6028, "precise",
  "Stanko Radikon (1953 to 2016) and now his son Saša made Oslavia's other legendary skin-contact whites: Ribolla, Jakot (Tokaj spelled backwards, after the EU banned the Tocai name) and Oslavje, macerated for months, aged in large casks, bottled without sulphur in 500 ml bottles with narrow corks he designed.", ["Radikon"]),
S("la-castellada", "La Castellada", "estate", "Producer", "Collio", 45.9725, 13.6119, "precise",
  "The Bensa brothers' Oslavia estate, another pillar of the skin-contact Ribolla tradition.", ["La Castellada"]),
S("oslavia-ossuary", "Oslavia", "village", "Orange-wine capital", "Collio", 45.9708, 13.6147, "precise",
  "The hamlet of Gorizia on the Slovenian border, a First World War battlefield whose ossuary holds about 57,000 Italian soldiers. Its families (Gravner, Radikon, La Castellada, Primosic, Il Carpino, Fiegl, Dario Prinčič) form an association of Ribolla producers and turned the village into the world capital of orange wine.", ["Gravner", "Radikon", "La Castellada", "Primosic", "Il Carpino", "Fiegl", "Dario Prinčič"]),
S("schiopetto", "Schiopetto", "estate", "Producer", "Collio", 45.9517, 13.5072, "precise",
  "Mario Schiopetto (1930 to 2003) started bottling in 1965 at Capriva and, inspired by German technology, created the clean, varietal Friulian white style that changed Italian winemaking.", ["Schiopetto"]),
S("russiz-superiore", "Russiz Superiore", "estate", "Producer", "Collio", 45.9582, 13.5175, "precise",
  "The Marco Felluga family's Capriva estate, on hills once owned by the Counts Strassoldo.", ["Russiz Superiore"]),
S("villa-russiz", "Villa Russiz", "estate", "Producer and foundation", "Collio", 45.9492, 13.5125, "precise",
  "Founded in 1869 by the French count Théodore de La Tour and his Austrian wife Elvine Ritter, who brought French varieties to Collio; since 1919 run by a charitable foundation for orphaned children.", ["Villa Russiz"]),
S("castello-di-spessa", "Castello di Spessa", "historic", "Castle and winery", "Collio", 45.9477, 13.5049, "precise",
  "A castle at Capriva where Giacomo Casanova is said to have stayed in 1773, now a hotel and winery with an 18th-century cellar under the ramparts.", ["Castello di Spessa"]),
S("edi-keber", "Edi Keber", "estate", "Producer", "Collio", 45.9772, 13.5021, "precise",
  "Zegla estate near Cormons that makes only one wine, Collio Bianco, from Friulano, Malvasia and Ribolla; Keber championed the idea of a single native-grape Collio white.", ["Edi Keber"]),
S("jermann", "Jermann", "estate", "Producer", "Collio", 45.9891, 13.4698, "precise",
  "Silvio Jermann's Vintage Tunina (first made in 1975), a white blend named after Casanova's maid-lover in his memoirs, became one of Italy's first cult whites. The winery at Ruttars, Dolegna del Collio.", ["Jermann"]),
S("venica", "Venica & Venica", "estate", "Producer", "Collio", 46.0348, 13.4852, "precise",
  "The Venica family estate at Cerò, Dolegna del Collio, farming since 1930; its Sauvignon Ronco delle Mele became one of the most celebrated Italian Sauvignons.", ["Venica & Venica"]),
S("livio-felluga", "Livio Felluga", "estate", "Producer", "Rosazzo", 45.9725, 13.4578, "precise",
  "Livio Felluga (1914 to 2016), 'the patriarch of Friulian wine', replanted the abandoned hills of Rosazzo after the war; his Terre Alte white blend (1981) and his map labels are icons.", ["Livio Felluga"]),
S("abbazia-di-rosazzo", "Abbazia di Rosazzo", "historic", "Abbey (11th century)", "Rosazzo", 46.0079, 13.4210, "precise",
  "Benedictine abbey on a hilltop above Manzano, a centre of viticulture since the Middle Ages where the last Pignolo vines survived; the Rosazzo DOCG takes its name from it.", ["Livio Felluga"]),
S("rocca-bernarda", "Rocca Bernarda", "historic", "Castle estate", "Colli Orientali del Friuli Picolit", 46.0248, 13.4287, "precise",
  "A 16th-century castle estate near Premariacco where Giuseppe Perusini revived Picolit in the 20th century; later left to the Sovereign Military Order of Malta, which owns it today.", ["Rocca Bernarda"]),
S("ronchi-di-cialla", "Ronchi di Cialla", "estate", "Producer", "Friuli Colli Orientali", 46.0772, 13.4772, "precise",
  "Paolo and Dina Rapuzzi's estate in the Cialla valley, where from 1970 they rescued Schioppettino, helping get it officially authorised in the late 1970s.", ["Ronchi di Cialla"]),
S("le-due-terre", "Le Due Terre", "estate", "Producer", "Friuli Colli Orientali", 46.0389, 13.4782, "precise",
  "Flavio Basilicata and Silvana Forte's tiny Prepotto estate, cult makers of Sacrisassi red and white blends.", ["Le Due Terre"]),
S("miani", "Miani", "estate", "Producer", "Friuli Colli Orientali", 46.0160, 13.3316, "approx",
  "Enzo Pontoni's tiny Buttrio estate, whose extremely low-yield Friulano and Ribolla are among Italy's most sought-after whites.", ["Miani"]),
S("vodopivec", "Vodopivec", "estate", "Producer", "Carso", 45.7348, 13.7442, "approx",
  "Paolo Vodopivec's Vitovska-only estate at Sgonico on the Carso, fermented in buried Georgian amphorae.", ["Vodopivec"]),
S("zidarich", "Zidarich", "estate", "Producer", "Carso", 45.7618, 13.6947, "precise",
  "Benjamin Zidarich's estate at Prepotto (Praprot) in Duino Aurisina, with a multi-level cellar carved 20 m into the karst rock.", ["Zidarich"]),
S("skerk", "Skerk", "estate", "Producer", "Carso", 45.7623, 13.6952, "precise",
  "Sandi Skerk's Prepotto estate on the Carso, maker of skin-contact Vitovska and Malvasia from cellars cut into the limestone.", ["Skerk"]),
S("vie-di-romans", "Vie di Romans", "estate", "Producer", "Friuli Isonzo", 45.9069, 13.4522, "precise",
  "Gianfranco Gallo's Mariano del Friuli estate, which showed that the Isonzo plain could make whites of great power and age-worthiness.", ["Vie di Romans"]),
S("basilica-aquileia", "Basilica di Aquileia", "historic", "UNESCO World Heritage (1998)", "Friuli Aquileia", 45.7696, 13.3709, "precise",
  "The patriarchal basilica of the Roman city of Aquileia, whose fourth-century mosaic floor, one of the largest in the Christian world, includes scenes of vine harvesting.", []),
S("ramandolo-village", "Ramandolo", "village", "DOCG zone", "Ramandolo", 46.2270, 13.2620, "approx",
  "The hamlet above Nimis at the foot of Monte Bernadia where steep terraces of Verduzzo give the region's oldest sweet-wine DOCG.", ["Giovanni Dri (Il Roncat)", "Anna Berra"]),
S("rauscedo-nurseries", "Vivai Cooperativi Rauscedo", "historic", "Vine nursery cooperative", "Friuli Grave", 46.0408, 12.8247, "approx",
  "The village of Rauscedo in Pordenone province, home of one of the world's largest grapevine nurseries, a cooperative founded in the 1930s that supplies grafted vines to vineyards worldwide.", []),
]

if __name__ == '__main__':
    save('p7_friuli', regions, apps, sites)
