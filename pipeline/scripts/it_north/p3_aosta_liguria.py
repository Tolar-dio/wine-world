import sys
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import A, R, S, save

SRC_VDA = [
    ("EU eAmbrosia register: Valle d'Aosta / Vallée d'Aoste", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, EU wine PDO geospatial inventory", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("Wikidata: Costa dei vigneti, Donnas terraces", "https://www.wikidata.org/wiki/Q56451618"),
]
SRC_LIG = [
    ("EU eAmbrosia register (Ligurian DOCs)", "https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"),
    ("Candiago et al. 2022, EU wine PDO geospatial inventory", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    ("Parco Nazionale delle Cinque Terre", "https://www.parconazionale5terre.it/"),
]

regions = [
R("Valle d'Aosta", ["Vallée d'Aoste", "Aosta Valley"], None, 45.72, 7.35, 9.3,
  "Italy's smallest wine region: terraces under Mont Blanc, ungrafted vines at 1,200 metres and grapes nobody else grows.",
  "The Aosta Valley is a single glacial trench running about 100 km from Mont Blanc down to the Piedmont border at Pont-Saint-Martin, following the Dora Baltea. It is officially bilingual (Italian and French), and its one DOC, Valle d'Aosta / Vallée d'Aoste, is subdivided into seven named subzones and a long list of varietal wines, almost all made on tiny, terraced plots. With roughly 400 to 450 hectares under vine, it is the smallest wine region in Italy by area and output, and most of the wine comes from six cooperatives.\n\nWhat makes it thrilling for a wine nerd is diversity at extreme altitude. At the top end, Blanc de Morgex et de La Salle is made from the Prié Blanc grape on ungrafted vines at up to about 1,200 metres, among the highest vineyards in Europe. In the warm, sheltered central valley around Aosta, Chambave and Torrette, native reds like Petit Rouge, Fumin, Cornalin and Vuillermin grow alongside Pinot Noir, Gamay and the famously rich Petite Arvine whites of Les Crêtes. At the bottom of the valley, Donnas and Arnad-Montjovet grow Nebbiolo (here called Picotendro) on granite terraces that continue into Piedmont's Carema.",
  "Vines arrived with the Salassi Celts and the Romans, who founded Augusta Praetoria (Aosta) in 25 BC on the road to the Great and Little St Bernard passes; at Donnas the Roman road is cut through the rock between the vineyards. Medieval monasteries and the Challant lords kept viticulture alive, and in the 19th century the valley had several thousand hectares of vines. Phylloxera, emigration and the 20th-century move to industry and tourism reduced that to a few hundred.\n\nThe revival came through cooperatives founded from the 1970s (Caves Coopératives de Donnas 1971, Cave du Vin Blanc de Morgex et de La Salle 1983, Crotta di Vegneron at Chambave 1980) and the Institut Agricole Régional in Aosta, which since 1982 has bottled experimental varietals and led the rescue of native grapes. The single regional DOC was created in 1985, replacing the older Donnas (1971) and Enfer d'Arvier (1972) DOCs, which became subzones.",
  "The valley runs east-west, so its north side (the *adret*) faces south and catches sun from dawn to dusk, while the south side (*envers*) is mostly forest. Rainfall is very low, around 500 to 600 mm a year in the central valley, one of the driest places in the Alps, and the dry föhn wind keeps disease away. Soils are sandy, stony glacial moraines and decomposed granite, gneiss and schist; vines grow on dry-stone terraces, often on low pergolas (*topie*) near the bottom of the valley and low single-guyot higher up. At Morgex the risk of frost and the short season define everything: vines are trained low on stone-pillared pergolas to use the heat radiated by the ground.",
  "Native: Prié Blanc (Blanc de Morgex), Petit Rouge (the main red, base of Torrette and Enfer d'Arvier), Fumin (dark, spicy), Cornalin, Vuillermin, Mayolet, Prëmetta, and Petite Arvine (from neighbouring Valais). Nebbiolo (Picotendro) at Donnas and Arnad. International: Pinot Noir, Gamay, Chardonnay, Pinot Gris, Müller-Thurgau, Syrah. Moscato Bianco (Muscat de Chambave) for the famous passito.",
  "Crisp, mountain whites and sparklers; light-to-medium reds with pepper and berry fruit; Nebbiolo from granite; tiny volumes of passito (Chambave Moscato Flétri, Nus Malvoisie Flétri).",
  "One DOC, Valle d'Aosta / Vallée d'Aoste (1985), with seven subzones: Blanc de Morgex et de La Salle, Enfer d'Arvier, Torrette, Nus, Chambave, Arnad-Montjovet and Donnas, plus about 20 varietal labels.",
  ["Valle d'Aosta", "Blanc de Morgex et de La Salle", "Enfer d'Arvier", "Torrette", "Chambave", "Nus", "Arnad-Montjovet", "Donnas"],
  SRC_VDA),
R("Liguria", [], None, 44.2, 8.7, 8.3,
  "A crescent of cliffs between the Alps and the sea, where vineyards are carved into terraces and reached by monorail.",
  "Liguria is a thin arc of coast from the French border at Ventimiglia to the Tuscan border at Sarzana, backed by mountains that drop almost straight into the sea. Flat land barely exists, so vines grow on narrow dry-stone terraces (*fasce*) clinging to the slopes; the region has only about 1,500 hectares of DOC vineyard, and output is tiny. It divides into the Riviera di Ponente (west of Genoa), the land of Pigato, Vermentino, Rossese and Ormeasco, and the Riviera di Levante (east), home of the Cinque Terre and Colli di Luni.\n\nThe Cinque Terre's terraces, about 7,000 km of dry-stone walls built over a thousand years, are a UNESCO World Heritage landscape (1997) and the source of Sciacchetrà, a rare dried-grape sweet wine. Rossese di Dolceacqua, a perfumed red from the far west, was Liguria's first DOC (1972) and a favourite of Napoleon, according to local legend. The best Ligurian whites taste of herbs, salt and sea air, perfect with pesto and fish.",
  "The Etruscans and Greeks traded wine along this coast, and the Roman port of Luna (Luni) near Sarzana shipped wine and marble. Genoa's republic dominated the medieval and early modern trade. The Cinque Terre terraces were built from around the 11th century as the villages grew; by the 19th century much of the coast was vineyard. Phylloxera, the arrival of the railway (1874) and the flight to cities collapsed this agriculture, and today most terraces are abandoned forest; the Cinque Terre national park (1999) and cooperatives such as the Cantina Cinque Terre (1982) are trying to hold on to what remains.",
  "Mediterranean climate on the coast with mild winters, but sharp altitude gradients inland; the mountains shelter the coast from northern cold and channel sea breezes. Soils are shallow and stony: sandstones and shales in the Levante, limestone and clay in the Ponente valleys around Albenga. Heroic viticulture means 1,000 to 1,500 working hours per hectare a year in the Cinque Terre, versus a few hundred in flat country.",
  "Vermentino and Pigato (genetically the same as Vermentino and as Favorita in Piedmont, though locals insist on their differences), Bosco and Albarola (Cinque Terre), Rossese, Ormeasco (Dolcetto), Granaccia (Grenache), Ciliegiolo, Bianchetta Genovese, Lumassina.",
  "Saline, herbal whites; light, perfumed reds; Sciacchetrà sweet wine.",
  "Eight DOCs, no DOCG. Riviera Ligure di Ponente includes subzones (Albenga/Albenganese, Finale/Finalese, Riviera dei Fiori, Quiliano, Taggia for Moscato).",
  ["Cinque Terre", "Colli di Luni", "Colline di Levanto", "Golfo del Tigullio - Portofino", "Val Polcèvera", "Riviera ligure di Ponente", "Rossese di Dolceacqua", "Pornassio"],
  SRC_LIG),
]

apps = []
V = "Valle d'Aosta"
apps.append(A("Valle d'Aosta", "DOC", V, None, "1985", 400, ["white", "red", "rose", "sparkling", "sweet"],
 "Petit Rouge, Fumin, Cornalin, Mayolet, Prëmetta, Vuillermin, Nebbiolo (Picotendro), Pinot Noir, Gamay, Syrah, Prié Blanc, Petite Arvine, Chardonnay, Pinot Gris, Müller-Thurgau, Moscato Bianco and others",
 "The Aosta Valley's single DOC covers the whole region's vineyards, from Mont Blanc to the Piedmont border, under a bilingual name. It is unusual in Italy for combining a regional umbrella with seven named subzones (sottozone) and a long list of varietal wines, so the label on a bottle can read 'Vallée d'Aoste Fumin', 'Valle d'Aosta Torrette Supérieur' or 'Valle d'Aosta Blanc de Morgex et de La Salle'.\n\nFor curious drinkers the valley is a museum of Alpine grapes. Fumin, smoky and peppery with dark berries; Petit Rouge, light and cherry-fruited; Cornalin and Vuillermin; and whites such as Petite Arvine, which the valley shares with Swiss Valais and which Les Crêtes and Grosjean make in a rich, salty style. Production is tiny (roughly 2 million bottles a year) and most of it is drunk in the valley's ski resorts.",
 "Stony glacial moraines, granite and schist on the sunny north side of the Dora Baltea valley, from about 300 m at Pont-Saint-Martin to around 1,200 m at Morgex. Very dry, with the föhn wind and huge day-night swings.",
 ["Les Crêtes", "Grosjean", "Ottin", "Institut Agricole Régional", "Cave Mont Blanc de Morgex et La Salle", "Caves Coopératives de Donnas", "Lo Triolet", "Feudo di San Maurizio", "Ermes Pavese", "Château Feuillet", "La Crotta di Vegneron"],
 "The valley is one of the few places in Europe where ungrafted (franc de pied) vines are still the norm in some sites, because phylloxera cannot survive the cold, sandy, high-altitude soils at Morgex.",
 official="Valle d'Aosta / Vallée d'Aoste", match=["Vallée d'Aoste", "Valle d'Aosta"],
 contains=["Blanc de Morgex et de La Salle", "Enfer d'Arvier", "Torrette", "Chambave", "Nus", "Arnad-Montjovet", "Donnas"]))

def sub(name, created, styles, grapes, summary, terroir, prods, nerd, match=()):
    apps.append(A(name, "DOC", V, "Valle d'Aosta subzone", created, None, styles, grapes, summary, terroir, prods, nerd, official=name, match=list(match)+[f"Valle d'Aosta {name}", f"Vallée d'Aoste {name}"]))

sub("Blanc de Morgex et de La Salle", "1985 (subzone)", ["white", "sparkling"], "Prié Blanc (100%)",
 "The highest-altitude subzone in the valley, below Mont Blanc in the communes of Morgex and La Salle, at roughly 900 to 1,200 metres. Prié Blanc is an ancient, early-ripening local grape grown on ungrafted roots and trained on low pergolas supported by stone pillars, so the vines can catch the heat stored in the ground. The wine is pale, light (often under 11.5%), with green apple, alpine herbs and a salty, almost glacial freshness. It is also made as metodo classico sparkling wine. The Cave Mont Blanc cooperative makes most of it; Ermes Pavese is the leading independent grower.",
 "Sandy, stony morainic soils at the foot of Mont Blanc; extreme frost risk and a season of barely five months.",
 ["Cave Mont Blanc de Morgex et La Salle", "Ermes Pavese", "Albert Vevey", "Marziano Vevey"],
 "Some growers harvest a few rows in winter for an ice wine (Chaudelune) when temperatures fall below -8 C.")
sub("Enfer d'Arvier", "DOC 1972, subzone 1985", ["red"], "Petit Rouge (min 85%)",
 "'Hell of Arvier': a steep, rocky, south-facing bowl near the village of Arvier, west of Aosta, so called because the rock walls trap the summer heat. It gives a deeper, riper Petit Rouge than elsewhere. Its own DOC from 1972 to 1985, it is one of the oldest named wines of the Alps.",
 "A natural amphitheatre of rock and moraine at 650 to 900 m with intense reflected heat.", ["Coopérative de l'Enfer", "Danilo Thomain"],
 "The Enfer covers only a few hectares, making it one of the smallest named wine areas in Italy.")
sub("Torrette", "1985 (subzone)", ["red"], "Petit Rouge (min 70%), plus Fumin, Cornalin, Mayolet, Vien de Nus and others",
 "The most important red subzone, covering several communes west of Aosta (Saint-Pierre, Aymavilles, Sarre, Quart and others). Torrette is Petit Rouge-based, light to medium-bodied, with cherry, violet and almond; the Supérieur has more alcohol and ageing.",
 "Moraine and schist on the sunny side of the central valley.", ["Les Crêtes", "Grosjean", "Feudo di San Maurizio", "Château Feuillet"],
 "The name comes from the Torrette hamlet near Saint-Pierre, close to the medieval castle of Saint-Pierre.")
sub("Chambave", "1985 (subzone)", ["red", "white", "sweet"], "Moscato Bianco (Muscat de Chambave), Petit Rouge, Gamay, Pinot Noir",
 "Best known for Chambave Muscat, dry or as the honeyed Moscato Flétri passito from dried grapes, and for Petit Rouge-based reds. The cooperative La Crotta di Vegneron is the main producer.",
 "Warm, dry slopes in the central valley around Chambave and Saint-Denis.", ["La Crotta di Vegneron", "Elio Ottin"],
 "Chambave's Moscato Flétri was historically served to the Savoy kings when they hunted in the valley.")
sub("Nus", "1985 (subzone)", ["red", "white", "sweet"], "Vien de Nus, Pinot Gris (Malvoisie de Nus)",
 "A small subzone east of Aosta for the red Vien de Nus and the 'Malvoisie de Nus', which is actually a local Pinot Gris, made dry or as a passito Flétri.",
 "Granite and moraine on the adret of the valley.", ["La Crotta di Vegneron"], "Malvoisie de Nus is not Malvasia at all but a local Pinot Gris clone.")
sub("Arnad-Montjovet", "1985 (subzone)", ["red"], "Nebbiolo (min 70%), plus Dolcetto, Vien de Nus, Pinot Noir, Freisa",
 "Nebbiolo-based reds from the lower valley around Arnad and Montjovet, near the Fort of Bard. Light, fragrant and mountain-edged.",
 "Granite terraces on steep slopes.", ["Caves Coopératives de Donnas", "Kiuva"], "Arnad is also famous for its lard (Lardo d'Arnad DOP), cured in chestnut-wood tubs.")
sub("Donnas", "DOC 1971, subzone 1985", ["red"], "Nebbiolo (Picotendro) min 85%",
 "The first DOC of the valley (1971) and the gateway from Piedmont. Nebbiolo here, called Picotendro, grows on pergolas over granite terraces that continue straight into Carema. The wines are pale, firm and fragrant, aged at least two years. The Caves Coopératives de Donnas, founded in 1971, makes nearly all of it.",
 "Granite and gneiss terraces at 300 to 600 m, with stone pillars and pergolas like Carema's.", ["Caves Coopératives de Donnas"],
 "The vineyards line the Roman Via delle Gallie, which was hacked through the rock at Donnas around the first century BC; a Roman milestone arch still stands in the cutting.")

L = "Liguria"
apps.append(A("Cinque Terre", "DOC", L, "Riviera di Levante", "1973", 80, ["white", "sweet"], "Bosco (min 40%), Albarola and/or Vermentino (up to 40%)",
 "The five fishing villages of Monterosso, Vernazza, Corniglia, Manarola and Riomaggiore cling to cliffs on the coast west of La Spezia, and above them rises one of the most dramatic vineyard landscapes in the world: about 7,000 km of dry-stone terraces built over a thousand years. The UNESCO World Heritage listing (1997, with Portovenere and the islands) recognises this landscape, and the national park works to stop it collapsing back into scrub.\n\nThe dry white Cinque Terre DOC, mostly Bosco with Albarola and Vermentino, is herbal, saline and crisp. The treasure is Sciacchetrà: the same grapes dried on racks for about two months, then pressed into a tiny quantity of amber, apricot-and-honey sweet wine aged at least a year (Riserva three). Grapes are carried down by hand or by small monorail trains (*trenini a cremagliera*). Production is tiny, under 100 hectares in total, and the Cantina Cinque Terre cooperative at Groppo makes much of it, alongside growers like Possa (Heydi Bonanini), Walter De Batté and Buranco.",
 "Sandstone (macigno) and shale on slopes up to 45 degrees, often dropping straight to the sea; terraces face south-west into the sun and sea breeze.",
 ["Cantina Cinque Terre", "Possa", "Walter De Batté", "Buranco", "Arrigoni", "Forlini Cappellini"],
 "Sciacchetrà's name is often explained as dialect for 'crush' (*sciacca*) and 'set aside' (*tra*), describing pressing the dried grapes and keeping the precious wine.",
 official="Cinque Terre / Cinque Terre Sciacchetrà", match=["Sciacchetrà", "Cinque Terre Sciacchetrà"]))
apps.append(A("Rossese di Dolceacqua", "DOC", L, "Riviera di Ponente", "1972", 90, ["red"], "Rossese (min 95%)",
 "Liguria's first DOC and its most distinctive red, from the Nervia and Verbone valleys behind Ventimiglia near the French border. Rossese (which DNA links to Tibouren of Provence) gives a pale, perfumed, spicy red with wild strawberry, rose and sea-salt notes, sometimes compared to a Mediterranean Pinot Noir. Steep terraces and old alberello vines are the norm, and in 2012 the disciplinare recognised named vineyard sites (menzioni geografiche) such as Posaú, Galeae, Beragna and Arcagna. Maccario Dringenberg, Terre Bianche, Ka*Manciné and Testalonga are reference producers.",
 "Steep terraces of marl and sandstone (flysch) at 150 to 600 m in the hinterland of the Riviera dei Fiori.",
 ["Maccario Dringenberg", "Terre Bianche", "Ka*Manciné", "Testalonga", "Tenuta Anfosso", "Foresti"],
 "Legend says Napoleon tasted Rossese at Dolceacqua and declared it fit for an emperor, and Pope Paul III is also said to have praised it in the 16th century.",
 official="Rossese di Dolceacqua / Dolceacqua", match=["Dolceacqua"]))
apps.append(A("Riviera ligure di Ponente", "DOC", L, "Riviera di Ponente", "1988", 300, ["white", "red"], "Pigato, Vermentino, Rossese, Ormeasco (Dolcetto), Granaccia, Moscato",
 "The umbrella DOC for the western Riviera from Ventimiglia to Genoa, best known for Pigato and Vermentino. Pigato, whose name refers to the freckles (*pighe*) on its ripe skins, is especially at home in the Albenga plain and its valleys (Arroscia, Lerrone, Neva), where it makes rich, herbal, slightly bitter whites with notes of peach, rosemary and resin; genetically it is the same as Vermentino, but growers stand by its distinct character. Subzones include Riviera dei Fiori, Albenganese, Finalese and Quiliano, plus Taggia for Moscato and Granaccia from Quiliano.",
 "Alluvial and clay-limestone soils in the Albenga valleys; terraced flysch and limestone near Finale and Imperia.",
 ["Bio Vio", "Bruna", "Laura Aschero", "Lupi", "Cascina delle Terre Rosse", "Punta Crena", "Durin"],
 "Albenga's plain is an island of flat land in Liguria, and Pigato from Ortovero and Ranzo is where the variety's reputation was built from the 1980s.",
 official="Riviera ligure di Ponente", match=["Riviera Ligure di Ponente", "Pigato"]))
apps.append(A("Colli di Luni", "DOC", L, "Riviera di Levante", "1989", 300, ["white", "red"], "Vermentino (min 90% for Vermentino), Sangiovese, Ciliegiolo, Canaiolo",
 "A DOC straddling the Liguria-Tuscany border around Sarzana and the Magra valley, named after the Roman port of Luna. Its Vermentino is the richest and most structured in Liguria, with ripe citrus, almond and Mediterranean herbs, closer to the Tuscan coastal style. Vermentino 'Superiore' and reds based on Sangiovese and Ciliegiolo exist. Lunae Bosoni, Ottaviano Lambruschi (Costa Marina, Sarticola), La Baia del Sole and Giacomelli are leaders.",
 "Alluvial terraces of the Magra plus hillside clays and marls around Castelnuovo Magra and Ortonovo; warm and protected by the Apuan Alps.",
 ["Lunae Bosoni", "Ottaviano Lambruschi", "La Baia del Sole", "Giacomelli", "Il Monticello"],
 "Luni's Roman wine was praised by Pliny the Elder; the ruins of the Roman town, abandoned in the Middle Ages because of malaria, lie a few kilometres from today's vineyards.",
 official="Colli di Luni"))
apps.append(A("Colline di Levanto", "DOC", L, "Riviera di Levante", "1995", 20, ["white", "red"], "Vermentino, Bosco, Albarola; Sangiovese, Ciliegiolo",
 "A tiny DOC on the terraces just north of the Cinque Terre around Levanto, Bonassola and Framura, making light coastal Vermentino-based whites and Sangiovese reds.",
 "Shale and sandstone terraces above the sea.", ["Cà du Ferrà"], "Levanto's terraces are the northern continuation of the Cinque Terre landscape.", official="Colline di Levanto"))
apps.append(A("Golfo del Tigullio - Portofino", "DOC", L, "Riviera di Levante", "1997", 100, ["white", "red", "sparkling", "sweet"], "Vermentino, Bianchetta Genovese, Moscato, Ciliegiolo, Dolcetto",
 "The DOC of the Tigullio gulf from Portofino to Sestri Levante and inland valleys. Bianchetta Genovese, a delicate local white, and Ciliegiolo reds are its specialities.",
 "Shale and sandstone hills behind the gulf.", ["Bisson", "Pino Gino"],
 "Bisson ages a sparkling wine, Abissi, at the bottom of the sea in the Portofino marine park.",
 official="Portofino / Golfo del Tigullio - Portofino", match=["Portofino", "Golfo del Tigullio"]))
apps.append(A("Val Polcèvera", "DOC", L, "Genova", "1999", 20, ["white", "red", "sparkling", "sweet"], "Vermentino, Bianchetta Genovese, Albarola; Dolcetto, Sangiovese, Ciliegiolo",
 "A small DOC in the valley behind Genoa. The Coronata subzone, once a famous suburban vineyard of the city, survives in fragments among the industrial outskirts.",
 "Clay and serpentine slopes behind the port of Genoa.", [], "Coronata white was a classic match for Genoese fish dishes in the 19th century.", official="Val Polcèvera", match=["Val Polcevera"]))
apps.append(A("Pornassio", "DOC", L, "Riviera di Ponente", "2003", 15, ["red", "rose", "sweet"], "Ormeasco (Dolcetto) min 95%",
 "The DOC of Ormeasco, Liguria's name for Dolcetto, in the mountains around Pornassio in the upper Arroscia valley. The grape reportedly arrived from Piedmont in the 14th century. Reds, Superiore, a rosé called Sciac-trà (not to be confused with Sciacchetrà) and passito are made.",
 "Mountain slopes at 400 to 800 m on the border with Piedmont.", ["Lorenzo Ramò", "Tenuta Maffone"],
 "The Ormeasco Sciac-trà rosé shares its dialect name, meaning 'crush and draw off', with the Cinque Terre's sweet wine.",
 official="Pornassio / Ormeasco di Pornassio", match=["Ormeasco di Pornassio"]))

sites = [
S("blanc-de-morgex-vineyards", "Morgex and La Salle vineyards", "landscape", "Highest vineyards of the DOC", "Blanc de Morgex et de La Salle", 45.7560, 7.0420, "approx",
  "The Prié Blanc vineyards between Morgex and La Salle, at up to about 1,200 m below Mont Blanc's south face. Low pergolas on stone pillars, ungrafted vines and the Cave Mont Blanc cooperative's winery (founded 1983) make this one of Europe's most extreme vineyard landscapes.",
  ["Cave Mont Blanc de Morgex et La Salle", "Ermes Pavese"]),
S("enfer-d-arvier", "Enfer d'Arvier", "cru", "Subzone, Valle d'Aosta DOC", "Enfer d'Arvier", 45.7040, 7.1610, "approx",
  "The 'hell' of Arvier: a rocky south-facing amphitheatre just above the village where heat reflects off the cliffs, making Petit Rouge ripen far above its usual altitude.", ["Coopérative de l'Enfer"]),
S("donnas-terraces", "Donnas terraces and Roman road", "landscape", "Subzone, Valle d'Aosta DOC", "Donnas", 45.6030, 7.7862, "precise",
  "The Costa dei vigneti of Donnas: granite terraces of Picotendro (Nebbiolo) on stone-pillared pergolas lining the Roman Via delle Gallie, cut through the rock with a carved milestone arch. The Caves Coopératives de Donnas (1971) vinifies the growers' grapes.",
  ["Caves Coopératives de Donnas"]),
S("les-cretes", "Les Crêtes", "estate", "Producer", "Valle d'Aosta", 45.7046, 7.2476, "precise",
  "Costantino Charrère's estate at Aymavilles, the valley's most famous private winery. Its barrel-fermented Chardonnay Cuvée Bois and Petite Arvine set the standard; Charrère also rescued Fumin and Prëmetta.", ["Les Crêtes"]),
S("institut-agricole-regional", "Institut Agricole Régional", "estate", "Agricultural school and winery", "Valle d'Aosta", 45.7370, 7.2997, "precise",
  "The agricultural institute in Aosta, run for decades by the Canons of the Great St Bernard, whose experimental cellar since 1982 has preserved native grapes like Mayolet, Vuillermin and Cornalin and trained the valley's winemakers.", ["Institut Agricole Régional"]),
S("grosjean", "Grosjean", "estate", "Producer", "Valle d'Aosta", 45.7510, 7.3689, "precise",
  "Family estate at Ollignan in Quart, one of the first organic producers in the valley, known for Fumin, Cornalin and Petite Arvine.", ["Grosjean"]),
S("cinque-terre-terraces", "Cinque Terre terraces (Manarola to Corniglia)", "landscape", "UNESCO World Heritage (1997)", "Cinque Terre", 44.1120, 9.7200, "approx",
  "The terraced slopes between Manarola and Corniglia, the heart of the Cinque Terre wine landscape: dry-stone *fasce* climbing from the sea to about 400 m, with monorails for the harvest. Part of the UNESCO site of Portovenere, Cinque Terre and the islands.", []),
S("cantina-cinque-terre", "Cantina Cinque Terre", "cellar", "Cooperative (1982)", "Cinque Terre", 44.1153, 9.7371, "precise",
  "The growers' cooperative at Groppo above Manarola, founded in 1982 to save the terraces; it makes a large share of the DOC's white and Sciacchetrà.", ["Cantina Cinque Terre"]),
S("dolceacqua-castello", "Castello dei Doria, Dolceacqua", "historic", "Historic castle", "Rossese di Dolceacqua", 43.8522, 7.6228, "approx",
  "The ruined castle of the Doria family above Dolceacqua and its humpbacked medieval bridge, painted by Monet in 1884. The town is the heart of Rossese country.", []),
S("terre-bianche", "Terre Bianche", "estate", "Producer", "Rossese di Dolceacqua", 43.8680, 7.6370, "approx",
  "Hilltop estate at Arcagna above Dolceacqua, named for its white marly soils, making benchmark Rossese and Pigato.", ["Terre Bianche"]),
S("luni-roman-port", "Luni (Roman Luna)", "historic", "Archaeological site", "Colli di Luni", 44.0640, 10.0190, "approx",
  "The ruins of Luna, a Roman colony founded in 177 BC that exported Carrara marble and wine; Pliny praised the wine of Luna. Its name lives on in the Colli di Luni DOC and the Lunigiana.", []),
S("lunae-bosoni", "Lunae Bosoni", "estate", "Producer", "Colli di Luni", 44.0980, 10.0170, "approx",
  "The Bosoni family's estate at Castelnuovo Magra, the largest and most influential in Colli di Luni, with Vermentino Etichetta Nera as its flagship.", ["Cantine Lunae Bosoni"]),
S("albenga-pigato", "Albenga valleys (Ortovero, Ranzo)", "landscape", "Pigato heartland", "Riviera ligure di Ponente", 44.0550, 8.0950, "approx",
  "The Arroscia and Lerrone valleys inland from Albenga, around Ortovero and Ranzo, the historic home of Pigato.", ["Bio Vio", "Bruna", "Cascina Feipu"]),
]

if __name__ == '__main__':
    save('p3_aosta_liguria', regions, apps, sites)
