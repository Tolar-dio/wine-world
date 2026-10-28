import sys, re, unicodedata; sys.path.insert(0, '/home/claude/winesite/scripts/fr_a')
from common import S, A, R, dump

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

SRC = [
    {"title": "Vins de Provence: Chiffres clés 2025", "url": "https://www.vinsdeprovence.com/files/19a1acb2/brochure_chiffres_cles_2025_fr.pdf"},
    {"title": "Wikipedia (fr): Côtes-de-provence (crus classés 1955, dénominations de terroir)", "url": "https://fr.wikipedia.org/wiki/Côtes-de-provence"},
    {"title": "The Buyer: Provence rosé additional terroir designations", "url": "https://the-buyer.net/wine/provence-rose-additional-terroir-designations"},
    {"title": "Vins de Provence: Côtes de Provence Notre-Dame des Anges", "url": "https://vinsdeprovence.com/en/les-appellations/cotes-de-provence/dgc-cotes-de-provence-notre-dame-des-anges"},
    {"title": "Visit Corsica: De nombreuses appellations dont 9 AOP", "url": "https://www.visit-corsica.com/La-destination-Corse/Inspirations-corses/Inspirations-autour-du-vin/De-nombreuses-appellations-dont-9-AOP"},
    {"title": "EU geospatial inventory of wine PDOs (Candiago et al. 2022)", "url": "https://doi.org/10.6084/m9.figshare.c.5877659"},
]

regions = [
R("Provence", ["Provence"], None, 43.40, 6.10, 8.0,
  "France's oldest vineyard and the capital of pale rosé, with a few fiercely individual red and white appellations hidden among the pines.",
  """Provence, between the Rhône and the Italian border, is where French wine began: Greek settlers from Phocaea founded Massalia (Marseille) around 600 BC and planted vines. Today it is the world capital of pale, dry rosé. The three main appellations (Côtes de Provence, Coteaux d'Aix-en-Provence and Coteaux Varois en Provence) covered 27,428 ha in 2025 and produced about 1.24 million hl, of which roughly 89% was rosé. Provence makes 40 to 45% of France's AOP rosé and about 5% of the world's rosé. More than 550 producers share the three AOPs; exports take 42% of the volume, and the United States is the biggest foreign market.

The rosé boom since the 2000s, driven by Château d'Esclans's Whispering Angel (Sacha Lichine, from 2006; majority-owned by LVMH since 2019), Miraval (Brad Pitt and Angelina Jolie, from 2008) and the image of the Riviera, made Provence one of France's most profitable wine regions and drew luxury and drinks investors such as LVMH and Pernod Ricard. It also created a standardised style, pale salmon, dry, light, which the smaller appellations deliberately avoid. Bandol (Mourvèdre reds), Cassis (whites), Palette (Château Simone), Bellet (above Nice) and Les Baux-de-Provence are the region's specialists.""",
  """The Phocaeans brought vines to Massalia around 600 BC, and the Romans made Provincia (hence Provence) their first province beyond the Alps in the second century BC. Monasteries such as the Cistercian Le Thoronet and the abbey of Saint-Victor in Marseille kept vineyards. Bandol shipped its sturdy Mourvèdre reds from its port in barrels marked with a 'B', since Mourvèdre stood up to sea voyages. In 1955 the Côtes de Provence (then a VDQS, created in 1951) classified 23 estates as crus classés, a unique and now frozen list; 18 still use the title. Côtes de Provence became an AOC in 1977. Since 2000 the rosé boom has transformed the economy of the Var.""",
  """A Mediterranean climate with 2,700 to 3,000 hours of sun, hot dry summers and mild winters; the mistral wind from the north-west dries and cleans the vineyards. Geology splits Provence in two: a limestone Provence in the north and west (Sainte-Victoire, Coteaux d'Aix, Coteaux Varois, Bandol, Cassis) and a crystalline Provence in the south-east, the Maures and Esterel massifs, with schist, granite, gneiss and red volcanic rhyolite (La Londe, Fréjus, Notre-Dame des Anges).""",
  """Grenache, Cinsault, Syrah, Mourvèdre, Tibouren and Carignan for rosés and reds, with Cabernet Sauvignon in Aix and Les Baux. Whites: Vermentino (Rolle), Clairette, Ugni Blanc, Sémillon, Marsanne, Bourboulenc. Bellet keeps Braquet and Folle Noire.""",
  """Pale, dry rosé dominates; some powerful reds (Bandol, Les Baux) and characterful whites (Cassis, Palette, Bellet).""",
  """Côtes de Provence has five 'dénominations de terroir' (Sainte-Victoire and Fréjus from 2005, La Londe from 2008, Pierrefeu from 2013, Notre-Dame des Anges from 2019) and 18 surviving crus classés from 1955.""",
  ["Côtes de Provence", "Coteaux d'Aix-en-Provence", "Coteaux Varois en Provence", "Bandol", "Cassis", "Bellet", "Palette", "Les Baux de Provence", "Pierrevert"],
  SRC[:4]),
R("Corsica", ["Corse"], None, 42.15, 9.10, 8.0,
  "A granite mountain in the sea, with Italian grapes, French law and its own language of wine.",
  """Corsica, 180 km from the French coast and 80 km from Tuscany, is a mountain in the Mediterranean, and its wines are closer to Italy than to France: the main grapes are Nielluccio (Sangiovese), Sciaccarellu (a Tuscan grape, Mammolo) and Vermentinu. The island has roughly 5,750 to 6,000 ha of vines, of which about 2,800 to 2,900 ha are in nine AOPs: Patrimonio, Ajaccio, the regional Corse (Vin de Corse) with five named sub-areas (Calvi, Coteaux du Cap Corse, Figari, Porto-Vecchio and Sartène), and Muscat du Cap Corse. Rosé is the largest share of AOP production, as in Provence; reds make up about 17% and whites about 13%.""",
  """Greeks from Phocaea founded Alalia (Aléria) on the east coast around 565 BC and planted vines. The island was Genoese from the thirteenth century until it was sold to France in 1768, a year before Napoleon was born in Ajaccio. In the 1960s and 1970s, French settlers ('pieds-noirs') from Algeria planted large vineyards of high-yielding grapes on the eastern plain, and fraud scandals over sugared wine led to the Aléria affair of August 1975, when Corsican nationalists led by Edmond Simeoni occupied a settler's wine cellar, a founding moment of modern Corsican nationalism. Since the 1980s Corsica has turned to quality and its own grapes.""",
  """Granite dominates the west and south (Ajaccio, Sartène, Figari, Porto-Vecchio), schist the north-east (Cap Corse), and limestone and clay the north around Patrimonio. Mountains, sea breezes and altitude temper the heat.""",
  """Nielluccio (Sangiovese), Sciaccarellu, Vermentinu, Grenache, Carcajolu Neru, Minustellu, Biancu Gentile, Muscat à Petits Grains, Aleatico.""",
  """Rosé, red, white and the vin doux naturel Muscat du Cap Corse.""",
  """Nine AOPs. Vin de Corse sub-areas (Calvi, Coteaux du Cap Corse, Figari, Porto-Vecchio, Sartène) are 'dénominations géographiques complémentaires'.""",
  ["Patrimonio", "Ajaccio", "Vin de Corse", "Muscat du Cap Corse"],
  SRC[4:]),
]

apps = [
A("Côtes de Provence", ["Côtes de Provence", "Cotes de Provence", "Côtes de Provence Sainte-Victoire", "Côtes de Provence Fréjus", "Côtes de Provence La Londe", "Côtes de Provence Pierrefeu", "Côtes de Provence Notre-Dame des Anges"], "Provence", None, "1977", 20300, ["rose", "red", "white"], "rose", "Grenache, Cinsault, Syrah, Mourvèdre, Tibouren, Carignan, Cabernet Sauvignon; Vermentino (Rolle), Clairette, Sémillon, Ugni Blanc",
  """Côtes de Provence is the largest appellation of Provence, about 20,300 ha across 84 communes of the Var, the Bouches-du-Rhône and a corner of the Alpes-Maritimes, and the engine of the pale-rosé boom. Around 90% of its production is rosé: dry, light salmon-pink, made by direct pressing or short maceration, mostly from Grenache and Cinsault with Syrah and the local Tibouren. The appellation also makes reds and whites, often from the same estates.

It is a huge and diverse area. Five 'dénominations de terroir' highlight distinct zones: Sainte-Victoire (2005, limestone at the foot of Cézanne's mountain, east of Aix), Fréjus (2005, volcanic red rhyolite near the coast, known for Tibouren rosé), La Londe (2008, schist near the sea in the Maures, with whites and rosés), Pierrefeu (2013, between the Maures and the limestone hills) and Notre-Dame des Anges (2019, the inland Maures foothills near Pignans).

The 1955 crus classés are a curiosity: 23 estates were classified while the area was a VDQS, and 18 still use the title, including Château Minuty, Château Sainte-Roseline, Clos Mireille (Domaines Ott), Château de Selle (Ott), Château Roubine and Clos Cibonne, a champion of Tibouren. The classification has never been revised. Rosé's economics are spectacular: a well-branded Provence rosé sells at two to three times the price of a red Côtes du Rhône, and investors including LVMH, Pernod Ricard and the Pitt-Jolie partnership (Miraval) have bought in.""",
  """Two Provences: limestone hills in the north and west (Sainte-Victoire, the Haut-Var) and crystalline schist, gneiss and volcanic rock in the south-east (Maures, Esterel), plus the inland Permian depression of red sandstone and clay. Mistral and sea breezes.""",
  ["Château d'Esclans", "Château Minuty", "Château Miraval", "Domaines Ott (Clos Mireille, Château de Selle)", "Clos Cibonne", "Château Sainte-Roseline", "Château Léoube", "Domaine de la Croix"],
  "Clos Cibonne, near Toulon, ages its Tibouren rosé under a thin veil of yeast in old casks, a traditional technique that gives it nutty, savoury depth unlike any other Provence rosé."),
A("Coteaux d'Aix-en-Provence", ["Coteaux d'Aix-en-Provence", "Coteaux d'Aix en Provence"], "Provence", None, "1985", None, ["rose", "red", "white"], "rose", "Grenache, Cinsault, Syrah, Mourvèdre, Counoise, Cabernet Sauvignon, Carignan; Vermentino, Clairette, Grenache Blanc, Sauvignon Blanc, Ugni Blanc",
  """Coteaux d'Aix-en-Provence is the western part of Provence, between the Durance and the Mediterranean around Aix. It is cooler and windier than the Var, swept by the mistral. Cabernet Sauvignon has a long history here: Georges Brunet planted it at Château Vignelaure in the 1960s, which inspired Domaine de Trévallon. Rosé dominates, but the reds and whites are serious. Château La Coste, Château Vignelaure and Château Revelette are references.""",
  """Limestone and clay hills with gravel and marl, from the Étang de Berre to the Durance.""",
  ["Château La Coste", "Château Vignelaure", "Château Revelette", "Château de Beaupré", "Château Calissanne"],
  "Château La Coste mixes wine with contemporary architecture and art, with pavilions by Tadao Ando, Frank Gehry, Renzo Piano and Jean Nouvel among the vines."),
A("Coteaux Varois en Provence", ["Coteaux Varois en Provence", "Coteaux Varois"], "Provence", None, "1993", None, ["rose", "red", "white"], "rose", "Grenache, Cinsault, Syrah, Mourvèdre, Carignan, Cabernet Sauvignon; Vermentino, Clairette, Grenache Blanc, Ugni Blanc, Sémillon",
  """Coteaux Varois en Provence is the cooler heart of the Var, around Brignoles and Saint-Maximin-la-Sainte-Baume, at 350 to 500 m. Its rosés are fresher and more mineral than those of the coast. Château Miraval in Correns, a village that set out in the 1990s to become France's first fully organic commune, is the most famous estate, although most of Miraval's rosé is sold as Côtes de Provence. Domaine du Deffends and Château La Calisse are good names.""",
  """Limestone hills and plateaus of the Haut-Var, cooler at altitude.""",
  ["Château Miraval", "Domaine du Deffends", "Château La Calisse", "Domaine des Aspras"],
  "Correns, where Miraval is located, is known as the first French village to convert nearly all its farmland to organic agriculture."),
A("Bandol", ["Bandol"], "Provence", None, "1941", None, ["red", "rose", "white"], "red", "Mourvèdre (at least 50% of reds), Grenache, Cinsault; Clairette, Ugni Blanc, Bourboulenc",
  """Bandol is the great red wine of Provence, from a natural amphitheatre of terraced hills (restanques) above the fishing port of Bandol, between Marseille and Toulon. Its grape is Mourvèdre, which needs heat to ripen, and the sun-baked south-facing slopes, sheltered from the mistral, provide it. The rules require at least 50% Mourvèdre in the red (top wines often use 75 to 95%) and at least 18 months of ageing in wood before release. The wines are dark, structured and long-lived, with notes of black fruit, garrigue, liquorice, leather and game. Bandol rosé, also built on Mourvèdre, is one of the most serious rosés in France.

Bandol was a famous wine in the eighteenth and nineteenth centuries, exported through its port. After phylloxera it almost disappeared. Lucien Peyraud of Domaine Tempier, who married into the family in 1936, led the fight for the appellation (1941) and the return of Mourvèdre. Tempier, Château de Pibarnon, Château Pradeaux, Domaine de la Bégude and Château Vannières are among the leading estates.""",
  """Terraces (restanques) of limestone, marl and sandstone facing south toward the sea, sheltered by the Sainte-Baume massif; the sea moderates temperatures.""",
  ["Domaine Tempier", "Château de Pibarnon", "Château Pradeaux", "Domaine de la Bégude", "Château Vannières", "Domaine du Gros'Noré", "Château Sainte-Anne"],
  "Lucien Peyraud is called the 'father of Bandol'; his friend Richard Olney, the American food writer, made Tempier famous in the United States through Kermit Lynch and Alice Waters."),
A("Cassis", ["Cassis"], "Provence", None, "1936", None, ["white", "rose", "red"], "white", "Marsanne, Clairette, Ugni Blanc, Sauvignon Blanc, Bourboulenc; Grenache, Cinsault, Mourvèdre",
  """Cassis, a small fishing town east of Marseille, was one of the first French AOCs (1936) and is one of the few in Provence known for white wine. Its vines grow on terraces between the sea and Cap Canaille, among the highest sea cliffs in Europe. The whites, from Marsanne and Clairette, are fresh and saline, the classic partner for bouillabaisse. Urban growth and land prices put constant pressure on its small vineyard of around 200 ha. Clos Sainte-Magdeleine, on a promontory above the sea, Domaine du Bagnol and Clos Val Bruyère are references.""",
  """Limestone and marl terraces between the sea and the Cap Canaille cliffs.""",
  ["Clos Sainte-Magdeleine", "Domaine du Bagnol", "Clos Val Bruyère", "Château de Fontcreuse", "Domaine de la Ferme Blanche"],
  "The Provençal poet Frédéric Mistral praised Cassis wine in his 1859 epic *Mirèio* as shining like a clear diamond and smelling of the rosemary, heather and myrtle of its hills."),
A("Bellet", ["Bellet / Vin de Bellet", "Bellet", "Vin de Bellet"], "Provence", None, "1941", None, ["white", "red", "rose"], "white", "Vermentino (Rolle), Chardonnay; Braquet, Folle Noire, Grenache, Cinsault",
  """Bellet is a tiny appellation in the hills above Nice, one of the few vineyards inside a large French city. Only a few dozen hectares survive among the villas. It uses grapes found almost nowhere else in France: Braquet (Brachetto) and Folle Noire (Fuella) for reds and rosés, and Rolle (Vermentino) for whites. The whites are fresh and aromatic. Château de Bellet, Château de Crémat and Clos Saint-Vincent are the main producers.""",
  """Steep terraces of poudingue (conglomerate) and sand above the Var river, at 200 to 400 m.""",
  ["Château de Bellet", "Château de Crémat", "Clos Saint-Vincent", "Domaine de Toasc"],
  "Bellet's history reflects that Nice was part of the Kingdom of Sardinia until 1860, which explains its Italian grapes."),
A("Palette", ["Palette"], "Provence", None, "1948", None, ["red", "white", "rose"], "red", "Mourvèdre, Grenache, Cinsault and many others; Clairette, Grenache Blanc, Ugni Blanc, Muscat and others",
  """Palette is one of the smallest AOCs in France, a few dozen hectares on north-facing limestone slopes on the outskirts of Aix-en-Provence, and it is largely the creation of a single estate, Château Simone. The Rougier family has owned Simone since 1830, and its old vines, a mix of dozens of varieties including some pre-phylloxera survivors, give red, white and rosé wines of unusual depth and longevity. Château Simone's white, mostly Clairette, ages in old barrels and develops honey, herbs and resin over decades. Château Crémade and Château Henri Bonnaud are the other producers.""",
  """North-facing slopes of limestone scree (calcaire de Langesse) and clay, cooler than the surroundings, near the Arc river.""",
  ["Château Simone", "Château Crémade", "Château Henri Bonnaud"],
  "Château Simone's cellars were dug by Carmelite monks in the sixteenth century, and some of its vines are among the oldest in Provence."),
A("Les Baux de Provence", ["Les Baux de Provence", "Les Baux-de-Provence"], "Provence", None, "1995", None, ["red", "rose", "white"], "red", "Grenache, Syrah, Mourvèdre, Cinsault, Counoise, Cabernet Sauvignon, Carignan; Clairette, Grenache Blanc, Vermentino, Marsanne, Roussanne",
  """Les Baux-de-Provence is a small appellation around the limestone Alpilles hills and the medieval village of Les Baux. It is often called France's most organic appellation: most of its estates are organic or biodynamic, partly because the dry, mistral-swept climate makes it easy. The reds are spicy and herbal. Domaine de Trévallon, founded by Eloi Dürrbach in 1973, is the most famous estate, but it sells as IGP Alpilles because its blend of roughly equal Cabernet Sauvignon and Syrah exceeds the Cabernet limit set when the AOC was created in 1995. Domaine Hauvette, Château Romanin and Mas de la Dame are references.""",
  """Limestone scree and clay on the slopes of the Alpilles; windy, dry.""",
  ["Domaine Hauvette", "Château Romanin", "Mas de la Dame", "Domaine de Trévallon (IGP)", "Château d'Estoublon"],
  "Domaine de Trévallon, Provence's most famous red, is not allowed to use the appellation because it has too much Cabernet Sauvignon."),
A("Pierrevert", ["Pierrevert"], "Provence", None, "1998", None, ["red", "rose", "white"], "rose", "Grenache, Syrah, Cinsault, Mourvèdre, Carignan; Grenache Blanc, Vermentino, Clairette, Roussanne, Marsanne",
  """Pierrevert is a small appellation in the Alpes-de-Haute-Provence, along the Durance near Manosque, at the cool northern edge of Provence, with vineyards up to 600 m. It is the only appellation in the department. Its wines, mostly rosé, are fresh and mineral.""",
  """Clay-limestone and gravel terraces along the Durance, at altitude.""",
  ["Domaine La Blaque", "Château Régusse"],
  "Pierrevert's altitude makes it one of the coolest Mediterranean appellations in France, close to the lavender fields of Valensole."),
A("Patrimonio", ["Patrimonio"], "Corsica", None, "1968", None, ["red", "white", "rose"], "red", "Nielluccio (dominant in reds); Vermentinu (Vermentino) for white",
  """Patrimonio, at the base of Cap Corse near Saint-Florent, was Corsica's first AOC (1968) and is its most famous. It sits in an amphitheatre of limestone and schist facing the Gulf of Saint-Florent, and Nielluccio, Corsica's name for Sangiovese, gives firm, dark, spicy reds that age well. The Vermentinu whites are rich and saline. Antoine Arena (and his sons), Domaine Leccia, Yves Leccia, Domaine Gentile and Clos de Bernardi are leading producers.""",
  """Limestone (unusual in Corsica), clay and schist in an amphitheatre facing the sea.""",
  ["Domaine Antoine Arena", "Domaine Leccia", "Yves Leccia", "Domaine Gentile", "Clos de Bernardi", "Domaine Giudicelli"],
  "Patrimonio is the only part of Corsica with large limestone outcrops, which is why Nielluccio does particularly well there."),
A("Ajaccio", ["Ajaccio"], "Corsica", None, "1984", None, ["red", "rose", "white"], "red", "Sciaccarellu (dominant), Barbarossa, Nielluccio, Vermentinu, Grenache",
  """Ajaccio, around Napoleon's birthplace on the west coast, is the home of Sciaccarellu, a pale, fragrant red grape that grows best on granite. Its name is usually explained as 'crunchy', for its firm berries, and the wines are light in colour but intense, with notes of red fruit, pepper and maquis. Comte Abbatucci, Clos Capitoro and Domaine de Vaccelli are references.""",
  """Granite hills around the Gulf of Ajaccio, up to 500 m.""",
  ["Domaine Comte Abbatucci", "Clos Capitoro", "Domaine de Vaccelli", "Domaine Pero Longo"],
  "Sciaccarellu has been identified as Mammolo, a Tuscan variety, but it has developed a distinct Corsican identity on granite."),
A("Vin de Corse", ["Corse / Vin de Corse", "Vin de Corse", "Corse", "Vin de Corse Calvi", "Vin de Corse Figari", "Vin de Corse Porto-Vecchio", "Vin de Corse Sartène", "Vin de Corse Coteaux du Cap Corse", "Corse Calvi", "Corse Figari", "Corse Porto-Vecchio", "Corse Sartène", "Corse Coteaux du Cap Corse"], "Corsica", None, "1976", None, ["rose", "red", "white"], "rose", "Nielluccio, Sciaccarellu, Grenache, Carcajolu Neru, Minustellu, Aleatico; Vermentinu, Biancu Gentile, Codivarta, Genovese",
  """Vin de Corse, now often labelled simply Corse, is the island's regional AOP, and it has five named sub-areas. Calvi, in the north-west Balagne, makes elegant wines on granite (Clos Culombu, Domaine d'Alzipratu). Coteaux du Cap Corse, on the schist of the northern peninsula, makes mineral Vermentinu (Clos Nicrosi). Figari, the southernmost and windiest, uses granite and gives intense wines (Clos Canarelli, which revived the old Carcajolu Neru and Biancu Gentile grapes). Porto-Vecchio, on the south-east coast, has granitic soils and cooling sea breezes (Domaine de Torraccia). Sartène, in the south-west, is a land of granite and old family estates. Rosé is the largest category, and many estates make serious reds from Nielluccio and Sciaccarellu.""",
  """Granite in the west and south, schist in Cap Corse, alluvial plain in the east; altitude and sea breezes.""",
  ["Clos Canarelli", "Domaine de Torraccia", "Clos Culombu", "Domaine d'Alzipratu", "Clos Nicrosi", "Domaine Saparale"],
  "Clos Canarelli in Figari replanted Carcajolu Neru, a nearly forgotten Corsican grape that DNA work has matched to Parraleta, a variety of Aragon in Spain."),
A("Muscat du Cap Corse", ["Muscat du Cap Corse"], "Corsica", None, "1993", None, ["fortified", "sweet"], "fortified", "Muscat à Petits Grains",
  """Muscat du Cap Corse is a vin doux naturel from the narrow, mountainous northern peninsula of Corsica, made from Muscat à Petits Grains, often slightly raisined on the vine. The mutage keeps it sweet and aromatic, with notes of apricot, orange and honey, and the island's schist gives freshness. It is one of the finest Muscats in France. Clos Nicrosi, Domaine Antoine Arena and Domaine Leccia make it.""",
  """Schist slopes on the Cap Corse peninsula and around Patrimonio.""",
  ["Clos Nicrosi", "Domaine Antoine Arena", "Domaine Leccia", "Domaine Pieretti"],
  "It is the only Corsican vin doux naturel and one of the youngest VDN appellations in France."),
]

sites = []
PS = [
("p-tempier", "Domaine Tempier", "estate", "Estate (Bandol)", "Bandol",
 "The Peyraud family estate in Le Plan-du-Castellet, the reference for Bandol. Lucien Peyraud, who married Lucie (Lulu) Tempier in 1936, led the creation of the appellation in 1941. Lulu's cooking, celebrated by Richard Olney and Alice Waters, made the estate a legend. Its single-vineyard reds La Tourtine, La Migoua and Cabassaou are deep Mourvèdre."),
("p-pibarnon", "Château de Pibarnon", "estate", "Estate (Bandol)", "Bandol",
 "Bought by Henri de Saint-Victor in 1977, Pibarnon sits on one of the highest points of Bandol, about 300 m, in an amphitheatre of terraces on Triassic limestone and blue marl. Its Mourvèdre reds are among the most elegant in Bandol."),
("p-pradeaux", "Château Pradeaux", "estate", "Estate (Bandol)", "Bandol",
 "An estate near the sea at Saint-Cyr-sur-Mer, owned by the descendants of Jean-Marie-Étienne Portalis, one of the authors of the Napoleonic Civil Code, famous for traditional, uncompromising Bandol: pure Mourvèdre, whole bunches, years in old foudres."),
("p-simone", "Château Simone", "chateau", "Estate (Palette)", "Palette",
 "The Rougier family has owned Château Simone since 1830; its cellars were dug by Carmelite monks in the sixteenth century. Its north-facing vineyard on the outskirts of Aix makes most of the Palette appellation, with old vines of dozens of varieties."),
("p-trevallon", "Domaine de Trévallon", "estate", "Estate (IGP Alpilles)", "Les Baux de Provence",
 "Eloi Dürrbach, son of a painter friend of Picasso, planted Cabernet Sauvignon and Syrah in 1973 on the north side of the Alpilles. His wine became Provence's most famous red, but in 1995 the Baux appellation limited Cabernet, so Trévallon is sold as IGP. Labels carry drawings by his father, René Dürrbach."),
("p-miraval", "Château Miraval", "chateau", "Estate (Côtes de Provence, Coteaux Varois)", "Coteaux Varois en Provence",
 "A large estate in Correns whose recording studio, Studio Miraval, hosted Pink Floyd during the making of *The Wall* in 1979. Brad Pitt and Angelina Jolie rented it from 2008 and bought it in 2011, and its rosé, made with the Perrin family of Beaucastel, became one of the world's best-known; the couple's legal dispute over the estate later made headlines."),
("p-esclans", "Château d'Esclans", "chateau", "Estate (Côtes de Provence)", "Côtes de Provence",
 "Sacha Lichine bought this estate in La Motte in 2006 and launched Whispering Angel, a pale rosé that became a global phenomenon and changed Provence's economy. LVMH took a majority stake in 2019. Its top rosé, Garrus, is fermented and aged in large barrels."),
("p-clos-mireille", "Clos Mireille", "estate", "Cru Classé (Côtes de Provence, 1955)", "Côtes de Provence",
 "Domaines Ott's estate on the coast at La Londe-les-Maures, on schist facing the sea. A 1955 cru classé, it is known for whites and rosés. The Ott family, from Alsace, came to Provence in 1896; Champagne Louis Roederer took control of the company in 2004."),
("p-sainte-roseline", "Château Sainte-Roseline", "chateau", "Cru Classé (Côtes de Provence, 1955)", "Côtes de Provence",
 "A former abbey in Les Arcs where Saint Roseline, a fourteenth-century prioress, is buried in a chapel with a mosaic by Marc Chagall. It is one of the 18 surviving crus classés of 1955."),
("p-minuty", "Château Minuty", "chateau", "Cru Classé (Côtes de Provence, 1955)", "Côtes de Provence",
 "A Second Empire château at Gassin, near Saint-Tropez, owned by the Matton-Farnet family since 1936 and a 1955 cru classé. Its pale rosés became fashionable on the Riviera, and in 2023 LVMH took a majority stake."),
("p-bellet", "Château de Bellet", "chateau", "Estate (Bellet)", "Bellet",
 "The historic estate that gave its name to the Bellet appellation in the hills above Nice, held for centuries by the de Charnacé family. It grows Rolle, Braquet and Folle Noire on steep terraces."),
("p-cremat", "Château de Crémat", "chateau", "Estate (Bellet)", "Bellet",
 "A château above Nice, one of the main Bellet producers, with vines on terraces of poudingue facing the Var valley and old cellars dug into the hillside."),
("p-clos-sainte-magdeleine", "Clos Sainte-Magdeleine", "estate", "Estate (Cassis)", "Cassis",
 "An estate on a promontory between the port of Cassis and the cliffs of Cap Canaille, with vines that run down to the sea. Its Marsanne and Clairette whites are the reference for Cassis."),
("p-la-coste", "Château La Coste", "chateau", "Estate (Coteaux d'Aix-en-Provence)", "Coteaux d'Aix-en-Provence",
 "Irish businessman Paddy McKillen bought this estate in Le Puy-Sainte-Réparade in 2002 and turned it into an art and architecture park with works by Tadao Ando, Frank Gehry, Renzo Piano and Louise Bourgeois among the biodynamic vines."),
("p-vignelaure", "Château Vignelaure", "chateau", "Estate (Coteaux d'Aix-en-Provence)", "Coteaux d'Aix-en-Provence",
 "Georges Brunet, former owner of Château La Lagune in Bordeaux, planted Cabernet Sauvignon here in Rians in the 1960s, at 350 to 480 m, and showed that Provence could make serious red wine."),
("p-thoronet", "Abbaye du Thoronet", "historic", "Cistercian abbey (twelfth century)", "Côtes de Provence",
 "One of three great Cistercian abbeys of Provence, built in the late twelfth century in the forest of the Var. Its pure, austere architecture influenced Le Corbusier. The monks planted vines in the surrounding valley."),
("p-romanin", "Château Romanin", "chateau", "Estate (Les Baux de Provence)", "Les Baux de Provence",
 "A biodynamic estate in Saint-Rémy-de-Provence with a cathedral-like cellar carved into the rock of the Alpilles. Its reds are among the reference wines of Les Baux."),
("p-sainte-victoire", "Montagne Sainte-Victoire", "landscape", "Landscape (Côtes de Provence Sainte-Victoire)", "Côtes de Provence",
 "The limestone ridge east of Aix that Paul Cézanne painted more than 80 times. Its southern slopes carry the vineyards of Côtes de Provence Sainte-Victoire, recognised in 2005, where cool nights and limestone give fresh rosés."),
]
for k, n, kind, cls, app, t in PS:
    q = 'approx' if k in ('p-pibarnon', 'p-vignelaure', 'p-pradeaux', 'p-clos-sainte-magdeleine', 'p-cremat') else None
    kw = {}
    if k == 'p-pradeaux': kw = dict(lat=43.1660, lon=5.7180, q='approx')
    if k == 'p-clos-sainte-magdeleine': kw = dict(lat=43.2095, lon=5.5420, q='approx')
    sites.append(S("p-" + slug(n), k, n, kind, cls, app, t, None, **(kw or {'q': q})))

CS = [
("c-arena", "Domaine Antoine Arena", "estate", "Estate (Patrimonio)", "Patrimonio",
 "Antoine Arena, a former law student, returned to his family's vines in 1975 and became the leader of Patrimonio's quality revolution, with organic farming and wines from Nielluccio, Vermentinu and the rare Biancu Gentile, which he helped rescue. His sons Antoine-Marie and Jean-Baptiste continue."),
("c-leccia", "Domaine Leccia", "estate", "Estate (Patrimonio)", "Patrimonio",
 "A family estate in Poggio-d'Oletta, one of the best in Patrimonio, making firm, dark Nielluccio reds on clay-limestone, saline Vermentinu and Muscat du Cap Corse. Annette Leccia runs it; her brother Yves Leccia has his own estate nearby."),
("c-gentile", "Domaine Gentile", "estate", "Estate (Patrimonio)", "Patrimonio",
 "Dominique Gentile's family estate near Saint-Florent, a pioneer of quality in Patrimonio since the 1970s, known for structured Nielluccio reds, Vermentinu whites and rich Muscat du Cap Corse."),
("c-nicrosi", "Clos Nicrosi", "estate", "Estate (Coteaux du Cap Corse, Muscat du Cap Corse)", "Muscat du Cap Corse",
 "A tiny estate in Rogliano at the northern tip of Cap Corse, on schist terraces above the sea. Its Vermentinu and Muscat du Cap Corse are among the island's most sought-after wines."),
("c-abbatucci", "Domaine Comte Abbatucci", "estate", "Estate (Ajaccio)", "Ajaccio",
 "Jean-Charles Abbatucci, descendant of a Corsican general of the Revolutionary era, farms biodynamically on granite in the Taravo valley. His father Antoine collected dozens of nearly extinct Corsican grapes from old vineyards, and the estate keeps them in a conservatory vineyard."),
("c-capitoro", "Clos Capitoro", "estate", "Estate (Ajaccio)", "Ajaccio",
 "The Bianchetti family's estate south-east of Ajaccio, a reference for Sciaccarellu on granite: pale, fragrant reds with red fruit, pepper and maquis notes. The family also makes a traditional, oxidative-style dessert wine, a rarity on the island."),
("c-canarelli", "Clos Canarelli", "estate", "Estate (Vin de Corse Figari)", "Vin de Corse",
 "Yves Canarelli's biodynamic estate in Figari, in the windswept far south, revived Carcajolu Neru and Biancu Gentile and makes some of Corsica's most refined wines."),
("c-torraccia", "Domaine de Torraccia", "estate", "Estate (Vin de Corse Porto-Vecchio)", "Vin de Corse",
 "Christian Imbert, a former adventurer, founded this estate near Porto-Vecchio in 1964, replanting Corsican grapes on granite at a time when much of the island was planting French varieties. His son Marc now runs it."),
("c-calvi", "Calvi", "village", "Village (Vin de Corse Calvi)", "Vin de Corse",
 "A citadel town in the Balagne, north-west Corsica, which gives its name to the Calvi sub-area of Vin de Corse, with granite soils and elegant wines."),
("c-sartene", "Sartène", "village", "Village (Vin de Corse Sartène)", "Vin de Corse",
 "A granite town in the south-west, called 'the most Corsican of Corsican towns' by Prosper Mérimée, which gives its name to a Vin de Corse sub-area."),
]
for k, n, kind, cls, app, t in CS:
    q = 'approx' if k in ('c-gentile', 'c-nicrosi', 'c-abbatucci', 'c-calvi', 'c-sartene', 'c-capitoro', 'c-leccia') else None
    sites.append(S("c-" + slug(n), k, n, kind, cls, app, t, None, q=q))

dump('provence_corsica', regions, apps, sites)
