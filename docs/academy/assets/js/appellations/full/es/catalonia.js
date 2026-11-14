// Full encyclopedia entries: Catalonia. Written from the plecs de condicions published by INCAVI (Catalan Wine and Vine Institute), checked 14 November 2026.
function ct(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-cataluna"] = ct({
  lede: "A region-wide DO covering vineyards across Catalonia, created so producers can blend grapes from different Catalan DOs. It carries big brands such as Torres alongside estates that left their local DO.",
  cat: "DO (DOP), white, rosé, red, semi-sparkling (vi d'agulla), liqueur wine and a low-alcohol 'xispejant' style", rec: "DO 1999 (regulation Orden ARP/149/2005)",
  src: ["Plec de condicions DO Catalunya, April 2026 version (INCAVI)", "https://gencat.cat/agricultura/incavi/plecs/do-catalunya/plec-condicions-do-catalunya.pdf"],
  amended: "April 2026 amendment text; the Ministry's list of 2026 still carries the March 2024 version (AM07)",
  sources: [["INCAVI: DO Catalunya rules and amendments", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-catalunya"]],
  facts: [["Zone", "Several hundred municipalities across all four Catalan provinces, wherever the vineyard is registered"], ["Recommended white grapes", "Chardonnay, Garnatxa Blanca, Macabeo, Moscatel de Alejandría, Parellada, Picapoll, Riesling, Sauvignon Blanc, Xarel·lo (Pansa Blanca)"], ["Recommended red grapes", "Cabernet Franc, Cabernet Sauvignon, Garnatxa (and Peluda), Merlot, Monastrell, Pinot Noir, Samsó (Cariñena), Syrah, Trepat, Ull de Llebre (Tempranillo)"], ["Minimum alcohol", "White 10%; rosé 10.5%; red 11.5%; xispejant low-alcohol wines 9.5% potential, 4.5% actual"], ["Yields", "White 12,000 kg/ha (88.8 hl/ha); red 10,000 kg/ha (74 hl/ha); at most 74 l per 100 kg"], ["Ageing", "Crianza red 24 months with 6 in oak; reserva red 36 with 12; gran reserva red 60 with 24; barrels of at most 330 l"], ["Bottling", "Glass only"]],
  place: "Everything from the Pyrenean foothills to the coast and the dry interior plains, sea level to nearly 800 m, with 350 to over 600 mm of rain. The common thread is the Mediterranean climate, not one terroir.",
  rules: "If a vineyard can also supply another DO, the stricter yield applies. Trepat, Xarel·lo Rosat and Garnatxa Roja, though counted as red grapes, take the higher white-grape yield.",
  history: "The DO was created in 1999 to give a legal home to wines blended across Catalan boundaries, which large houses had made for decades.",
  glass: "Varies by style: fresh Mediterranean whites and rosés; reds from Garnatxa, Tempranillo, Cabernet and Merlot.",
  exam: "Region-wide DO for cross-Catalan blends (1999); Torres; stricter yield applies when a vineyard is also in another DO.",
  producers: ["Familia Torres", "Codorníu", "Raventós i Blanc"]
});
APXF["es-alella"] = ct({
  lede: "One of Spain's smallest and oldest DOs, squeezed between the suburbs of Barcelona and the coastal hills, known for whites from Pansa Blanca (the local Xarel·lo) grown on decomposed granite.",
  cat: "DO (DOP), white, rosé, red, quality sparkling, semi-sparkling and liqueur wine (rancio, mistela, vi dolç natural)", rec: "DO in the 1950s, one of the oldest in Spain",
  src: ["Plec de condicions DOP Alella, March 2020 (INCAVI)", "https://incavi.gencat.cat/content/dam/incavi/home/normativa/plecs-de-condicions-de-les-do-catalanes/do-alella/plec-condicions-dop-alella-marc-2020-pdo-es-a1423.pdf"],
  amended: "March 2020 version, the one in the Ministry's 2026 list (temporary vintage rules were adopted for 2025 to 2026)",
  sources: [["INCAVI: DO Alella", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-alella"]],
  facts: [["Zone", "31 municipalities in the Maresme and Vallès Oriental, from Badalona and Alella to Mataró, Granollers and Sant Pol de Mar"], ["Recommended grapes", "Pansa Blanca (Xarel·lo), Garnatxa Blanca, Garnatxa Tinta"], ["Authorised grapes", "Chardonnay, Chenin, Macabeo, Malvasía, Moscatel de grano menudo, Parellada, Picapoll Blanc, Sauvignon Blanc; Cabernet Sauvignon, Garnatxa Peluda, Merlot, Monastrell, Pinot Noir, Samsó, Sumoll, Syrah, Ull de Llebre"], ["Alcohol", "White 10.5 to 14.5%; rosé 10.5 to 13.5%; red 11.5 to 14.5%; sparkling 10.8 to 12.8%; liqueur wines 15 to 20%"], ["Yields", "White 12,000 kg/ha (78 hl/ha); red 10,000 kg/ha (60 hl/ha)"], ["Sparkling", "Traditional method, at least 9 months from tirage to disgorging"], ["Rancio", "Oxidative 'sol i serena' ageing and at least 1 year in oak; 4 years (3 in oak) for the crianza mention"], ["Ageing", "Crianza red 24 months with 6 in oak; reserva red 36 with 12 plus 24 in bottle; gran reserva 60 months with 36 in bottle; barrels up to 330 l"]],
  place: "About 320 ha in two parts: the seaward Maresme slopes and, over the coastal range, the inland Vallès Oriental. Upper slopes are granite (sauló, decomposed granite sand), lower land alluvial; rainfall is 550 to 800 mm and the frost-free season only May to September inland.",
  rules: "Alella sets maximum as well as minimum alcohol levels, unusual in Spain, to protect the freshness of its whites.",
  history: "Pliny and Martial praised the Laietanian wines of this coast. Phylloxera wiped out the vineyard at the end of the 19th century; today urban sprawl is the main threat, and the DO is one of the smallest in Spain.",
  glass: "Pansa Blanca: pale, white peach, apricot, fennel, a salty, mineral finish; whites from the coast are rounder, from the Vallès crisper.",
  exam: "Pansa Blanca = Xarel·lo; sauló granite; one of Spain's smallest DOs, hemmed in by Barcelona.",
  producers: ["Alta Alella", "Alella Vinícola (Marfil)", "Bouquet d'Alella"]
});
APXF["es-conca-de-barbera"] = ct({
  lede: "A cool inland basin around Montblanc, in the shadow of Poblet monastery, home of the native rosé grape Trepat and of some of Torres's finest single-vineyard wines.",
  cat: "DO (DOP), white (incl. skin-contact brisat), rosé, red, sparkling (traditional and ancestral), semi-sparkling and liqueur wine", rec: "DO 1985 (provisional), regulation in force from 1989",
  src: ["Plec de condicions DO Conca de Barberà, 2024 version (AM05, INCAVI)", "https://incavi.gencat.cat/content/dam/incavi/home/normativa/plecs-de-condicions-de-les-do-catalanes/do-conca-barbera/Conca-de-Barbera-modificacio-PC-AM05-2024.pdf"],
  amended: "AM05 (2024), published by the Ministry in October 2024; vintage rules for 2026 to 2027 adopted in July 2026",
  sources: [["INCAVI: DO Conca de Barberà", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-conca-de-barbera"]],
  facts: [["Zone", "Barberà de la Conca, Blancafort, Conesa, L'Espluga de Francolí, Forès, Montblanc, Pira, Rocafort de Queralt, Sarral, Senan, Solivella, Vallclara, Vilaverd, Vimbodí, plus parts of Vilanova de Prades, Cabra del Camp and Aiguamúrcia"], ["White grapes", "Chardonnay, Chenin, Garnatxa Blanca, Macabeo, Moscatells, Parellada, Sauvignon Blanc, Sumoll Blanc, Viognier"], ["Red grapes", "Trepat, Garnatxa, Samsó, Ull de Llebre, Cabernet Franc and Sauvignon, Garró (Mandó), Merlot, Monastrell, Pinot Noir, Querol, Sumoll, Syrah"], ["Minimum alcohol", "White and rosé 10%; red 10.5%; sparkling 9.5 to 12.5%; liqueur wines 15 to 22%"], ["Yields", "12,000 kg/ha (84 hl/ha) for all grapes"], ["Sparkling", "Traditional or ancestral method, at least 9 months on the lees"], ["Ageing", "Crianza red 24 months with 6 in oak; reserva red 36 with 12 plus 24 in bottle; gran reserva red 60 with 24 plus 36 in bottle"]],
  place: "A basin enclosed by the Prades mountains and the Serra de Miramar. Sea breezes slip through the pass at La Riba, but winter temperature inversions bring frost to the valley floor and wide day-night swings, keeping acidity high.",
  rules: "Trepat, a pale, low-alcohol local red, is the DO's emblem, used mostly for rosé and sparkling wine.",
  history: "Cistercian monks of Poblet and the Knights Templar spread the vine here in the Middle Ages. In the early 20th century the cooperative movement built cathedral-like wine cellars at Barberà (1903), L'Espluga and elsewhere.",
  glass: "Trepat rosé: pale, strawberry, red currant, crisp; Trepat red: light, spicy, Pinot-like. Torres's Milmanda Chardonnay and Grans Muralles red come from here.",
  exam: "Trepat; Poblet monastery; modernist cooperative 'wine cathedrals'; Torres Milmanda and Grans Muralles.",
  producers: ["Torres (Grans Muralles, Milmanda)", "Carles Andreu", "Celler Escoda-Sanahuja", "Abadia de Poblet"]
});
APXF["es-costers-del-segre"] = ct({
  lede: "A scattered DO along the Segre river in Lleida province, from the Pyrenean foothills at Pallars to the dry plains of Les Garrigues, made famous by the Raventós family's Raimat estate.",
  cat: "DO (DOP), white, rosé, red, sparkling, liqueur, semi-sparkling, overripe and dried-grape wines", rec: "DO 1986 (pushed by INCAVI and Codorníu's Manuel Raventós from 1983)",
  src: ["Plec de condicions DO Costers del Segre, consolidated April 2026 version (amendment 5, INCAVI)", "https://gencat.cat/agricultura/incavi/plecs/costers-segre/modificacio-05.pdf"],
  amended: "Amendment 5 (April 2026); the Ministry's 2026 list carries the January 2025 version",
  sources: [["INCAVI: DO Costers del Segre", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-costers-del-segre"]],
  facts: [["Subzones", "Seven smaller geographical units: Artesa de Segre, Urgell, Les Garrigues, Pallars, Raimat, Segrià, Valls del Riu Corb"], ["Recommended grapes", "Macabeo, Xarel·lo, Parellada, Garnatxa Blanca; Garnatxa Tinta, Ull de Llebre (Tempranillo), Carinyena, Garnatxa Tintorera"], ["Authorised grapes", "Chardonnay, Riesling, Sauvignon Blanc, Albariño, Godello, Verdejo and others; Cabernet Sauvignon and Franc, Merlot, Monastrell, Trepat, Pinot Noir, Syrah, Malbec, Petit Verdot, Marselan and others"], ["Minimum alcohol", "9% for still and sparkling wines; liqueur wines 15 to 22%; overripe-grape wines 15% total; dried-grape wines 16% total"], ["Yields", "16,000 kg/ha (120 hl/ha) for all grapes; at most 75 l per 100 kg"], ["Special wines", "Vi de uves sobremadurades (overripe) and vi de panses (sun- or shade-dried grapes)"]],
  place: "About 4,000 ha in 71 municipalities of western Catalonia, on calcareous soils covered with sand or clay. Vineyards run from 200 to 1,100 m. The climate is dry continental: about 240 mm of rain at Lleida and 450 mm elsewhere, high sunshine and winter fogs.",
  rules: "The DO allows high yields on paper; quality is set by subzone and estate. Its seven named units can appear on labels.",
  history: "Raimat, bought by the Raventós family of Codorníu in 1914 and irrigated with a canal, was the first place in Catalonia to plant Cabernet Sauvignon, Merlot and Chardonnay and to adopt Californian techniques. In 1983 INCAVI's Jaume Siurana and Manuel Raventós proposed the DO, approved in 1986.",
  glass: "From fresh Macabeo and Chardonnay to ripe Tempranillo and Cabernet blends; Pallars and Artesa give lighter, mountain-fresh wines.",
  exam: "Raimat (Codorníu); seven subzones; Lleida's dry continental climate; first Catalan home of Cabernet and Chardonnay.",
  producers: ["Raimat", "Castell del Remei", "Tomàs Cusiné", "Clos Pons", "Castell d'Encús"]
});
APXF["es-emporda"] = ct({
  lede: "The far north-east corner of Catalonia, by the French border and the Costa Brava, swept by the Tramuntana wind. Known for Garnatxa and Carinyena reds and the sweet, oxidative Garnatxa de l'Empordà.",
  cat: "DO (DOP), white (incl. brisat), rosé, red, rancio, semi-sparkling, traditional-method sparkling, liqueur wines and overripe-grape wine", rec: "DO 1975 as Empordà-Costa Brava",
  src: ["Pliego de condiciones DOP Empordà, July 2025 version (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/emporda_2025_07_24.pdf"],
  amended: "Version published by the Ministry in July 2025",
  sources: [["INCAVI: DO Empordà", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-emporda"]],
  facts: [["Zone", "55 municipalities: 35 in the Alt Empordà and 20 in the Baix Empordà, two separate areas"], ["Recommended grapes", "Garnatxa Blanca, Carinyena Blanca and Gris, Macabeo, Moscatel de Alejandría; Carinyena (Samsó), Garnatxa Roja, Garnatxa Negra (Lledoner)"], ["Authorised grapes", "Chardonnay, Gewürztraminer, Malvasía, Moscatel de grano menudo, Picapoll Blanc, Sauvignon Blanc, Xarel·lo; Cabernet Sauvignon and Franc, Merlot, Monastrell, Tempranillo, Syrah, Lledoner Pelut"], ["Minimum alcohol", "White and rosé 11%; red and rancio 12%; sparkling 10.5 to 13.5%; Garnatxa de l'Empordà 15 to 20%"], ["Yields", "White 12,000 kg/ha (88.8 hl/ha); red 10,000 kg/ha (74 hl/ha); at most 74 l per 100 kg"], ["Garnatxa de l'Empordà", "At least 90% Garnatxa; vi dolç natural from must above 252 g/l sugar; crianza 3 years (1 in oak), reserva 5 (4), gran reserva 8 (6), vieja reserva over 10"], ["Moscatel de l'Empordà", "At least 90% Moscatel"], ["Ageing (still wines)", "Guarda at least 12 months in oak; crianza red 24 months with 6 in oak; reserva red 36 with 12; gran reserva red 60 with 18"]],
  place: "Granite and slate (schist) hills of the Albera and Rodes ranges, sloping to alluvial sandy plains near the sea; vineyards from sea level to about 260 m. Mean temperature 14 to 16°C, about 600 mm of rain, and the Tramuntana, a north wind gusting above 120 km/h, keeps the vines dry and healthy.",
  rules: "The DO protects a family of traditional sweet and oxidative wines alongside dry wines, with its own ageing ladder for Garnatxa de l'Empordà.",
  history: "Greek traders at Empúries and Benedictine monks at Sant Pere de Rodes planted vines here. The Catalan government supported the region around 1930, the DO process began in the early 1960s, and Empordà-Costa Brava was defined in 1975.",
  glass: "Reds: ripe black fruit, garrigue herbs, a granite or schist freshness; Garnatxa de l'Empordà: amber to mahogany, raisin, caramel, walnut.",
  exam: "Tramuntana wind; Garnatxa and Carinyena on granite and slate; sweet Garnatxa de l'Empordà; Perelada.",
  producers: ["Perelada", "Martí Fabra", "Celler Espelt", "Masia Serra", "Vinyes dels Aspres", "Terra Remota"]
});
APXF["es-montsant"] = ct({
  lede: "The ring of land around Priorat, under the Montsant cliffs, making rich Garnatxa and Carinyena reds on a mix of limestone, granite sand and some llicorella slate, at friendlier prices than its famous neighbour.",
  cat: "DO (DOP), white (incl. brisat), rosé, red and liqueur wine (rancio, mistela, Garnatxa, vi dolç natural, vimblanc)", rec: "DO 2001 (formerly the Falset subzone of DO Tarragona)",
  src: ["Plec de condicions DO Montsant, amendment AM06, May 2026 text (INCAVI)", "https://incavi.gencat.cat/content/dam/incavi/home/normativa/plecs-de-condicions-de-les-do-catalanes/do-montsant/1_AM06-PC-DO-Montsant-version%20modificaci%C3%B3n%20normal.pdf"],
  amended: "AM06 (May 2026) amendment text; the Ministry's 2026 list carries the September 2022 version, and a further change on rosé was filed in October 2026",
  sources: [["INCAVI: DO Montsant", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-montsant"]],
  facts: [["Zone", "Municipalities of the Priorat comarca around the Priorat DOQ, including Cornudella de Montsant, Cabacés, Capçanes, La Bisbal de Falset, La Figuera, Els Guiamets, Falset, Marçà and El Masroig"], ["Grapes", "Garnatxa Tinta and Peluda, Samsó (Cariñena), Cabernet Sauvignon, Merlot, Monastrell, Picapoll Negre, Syrah, Ull de Llebre; Garnatxa Blanca and Gris, Chardonnay, Macabeo, Moscatel, Pansal, Parellada, Picapoll Blanc"], ["Minimum alcohol", "May 2026 text: white 11%, rosé 11.5%, red 12% (previously 11.5, 12 and 12.5); liqueur wines 15%, Garnatxa 15.5%"], ["Yields", "White 12,000 kg/ha (88.8 hl/ha); red 10,000 kg/ha (74 hl/ha); at most 74 l per 100 kg"], ["Ageing", "Crianza red 24 months with 6 in oak; reserva red 36 with 12 plus 18 in bottle; gran reserva red 60 with 24 plus 36 in bottle; vi de guarda at least 12 months in oak; barrels up to 330 l"]],
  place: "A half-circle of mountains (Montsant, La Llena, Prades) around Priorat, cut by the Siurana river and Capçanes stream. Soils include calcareous clays, red clays, granite sand and llicorella slate; rainfall is 500 to 600 mm with many microclimates.",
  rules: "The 2026 amendment lowers the minimum alcohol and adds brisat (skin-contact) whites; the traditional liqueur wines include vimblanc, a white made from red Garnatxa.",
  history: "Montsant's wines went to Bordeaux merchants in the 19th century. The area belonged to DO Tarragona, regulated from 1945, later as its Falset subzone, and became a separate DO in 2001.",
  glass: "Ripe red cherry and plum, liquorice, herbs and spice; softer and earlier-drinking than Priorat.",
  exam: "Surrounds Priorat; former Falset subzone of Tarragona; DO 2001; Garnatxa and Carinyena.",
  producers: ["Celler de Capçanes", "Acústic Celler", "Joan d'Anguera", "Venus La Universal", "Celler Laurona", "Mas Perinet"]
});
APXF["es-pla-de-bages"] = ct({
  lede: "An inland basin around Manresa, below Montserrat, reviving its own grapes, the white Picapoll and the red Mandó (Garró) and Sumoll, among dry-stone wine huts and old stone vats.",
  cat: "DO (DOP), white (incl. brisat), rosé, red, semi-sparkling, quality sparkling (traditional and ancestral) and liqueur wine", rec: "DO 1995",
  src: ["Plec de condicions DO Pla de Bages, July 2026 version with tracked changes (INCAVI)", "https://incavi.gencat.cat/content/dam/incavi/home/normativa/plecs-de-condicions-de-les-do-catalanes/do-pla-de-bages/Plec%20de%20condicions%20DO%20Pla%20de%20Bages%20amb%20control%20de%20canvis%20juny%202026_c.pdf"],
  amended: "July 2026 amendment text; the Ministry's 2026 list carries the September 2024 version",
  sources: [["INCAVI: DO Pla de Bages", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-pla-de-bages"]],
  facts: [["Recommended grapes", "Picapoll Blanc, Macabeo, Parellada; Mandó (Garró), Sumoll, Garnatxa, Picapoll Negre, Samsó"], ["Authorised grapes", "Sauvignon Blanc, Chardonnay, Malvasia de Sitges, Gewürztraminer, Malvasia Roja; Merlot, Cabernet Sauvignon and Franc, Syrah, Ull de Llebre"], ["Minimum alcohol", "White 10.5%; rosé 11.5%; red 12% (11% for Mandó); sparkling 10.5%"], ["Yields", "White 10,000 kg/ha (70 hl/ha); red 9,000 kg/ha (63 hl/ha); at most 70 l per 100 kg"], ["Sparkling", "Traditional method at least 15 months from tirage to disgorging, all in one bottle and one registered cellar; ancestral method at least 9 months"], ["Ageing", "Crianza red 24 months with 6 in oak; reserva red 36 with 12; gran reserva red 60 with 24"]],
  place: "The Bages comarca in central Catalonia, on Tertiary conglomerates, sandstones, limestones and marls with river terraces of the Cardener and Llobregat. Altitude runs from about 200 m to 1,200 m at Montserrat; rainfall is 500 to 550 mm in the centre, more at the edges, giving a cooler, more continental climate than the coast.",
  rules: "The DO's identity rests on local grapes: Picapoll in whites and Mandó, Sumoll and Picapoll Negre in reds, which naturally ripen at lower alcohol.",
  history: "In the 19th century Bages was one of Catalonia's biggest vineyards, exporting brandy from Manresa. Phylloxera arrived in 1892 and the vineyard shrank to cereal and forest. Replanting from the 1960s led to the DO in 1995.",
  glass: "Picapoll: citrus, white flowers, fennel, crisp acidity; Mandó and Sumoll reds: light, peppery, red-fruited.",
  exam: "Picapoll; Manresa and Montserrat; DO 1995.",
  producers: ["Abadal", "Artium", "Oller del Mas", "Collbaix"]
});
APXF["es-tarragona"] = ct({
  lede: "One of Catalonia's oldest DOs, covering the Camp de Tarragona behind the port city and part of the Ribera d'Ebre, historically famous for fortified 'Tarragona Clásico' and altar wine.",
  cat: "DO (DOP), white, rosé, red, brisat, liqueur wines (mistela, moscatel, Garnatxa, rancio, Clásico, vi de missa), dried-grape wine, quality sparkling and semi-sparkling", rec: "DO 1942; first regulation 1947",
  src: ["Plec de condicions DO Tarragona, amendment 6 with tracked changes, May 2026 text (INCAVI)", "https://incavi.gencat.cat/content/dam/incavi/home/normativa/plecs-de-condicions-de-les-do-catalanes/do-tarragona/0_DEFINITIU_plec-condicions-dop-tarragona-modificacio-6_controlcanvis_28102026_RV.pdf"],
  amended: "Amendment 6 (AM08), May 2026 text posted by INCAVI in October 2026; the Ministry's 2026 list carries the September 2023 version",
  sources: [["INCAVI: DO Tarragona", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-tarragona"]],
  facts: [["Zone", "Vineyards of the Alt Camp, Baix Camp and Tarragonès, part of the Ribera d'Ebre, and Masllorenç (Baix Penedès); Salou was added in a recent revision"], ["White grapes", "Macabeo, Xarel·lo, Parellada, Garnatxa Blanca, Chardonnay, Moscatells, Sauvignon Blanc, Subirat Parent, Sumoll Blanc, Vinyater, Malvasia de Sitges, Xarel·lo Rosat"], ["Red grapes", "Garnatxa, Samsó, Ull de Llebre, Cabernet Sauvignon, Merlot, Monastrell, Pinot Noir, Sumoll, Syrah, Trepat"], ["Minimum alcohol", "Still and sparkling wines 9.5%; liqueur wines 15 to 22%"], ["Yields", "White 12,000 kg/ha (84 hl/ha); red 10,000 kg/ha (70 hl/ha); at most 70 l per 100 kg"], ["Tarragona Clásico", "Fortified liqueur wine (15 to 22%) aged in oak, sweet, semi-dry or dry"], ["Ageing", "Crianza red 2 years with 6 in oak; reserva red 3 years with 12; gran reserva red 5 years with 24; barrels up to 330 l; sparkling reserva 15 months"]],
  place: "Calcareous clays, marls and limestone on the Camp de Tarragona plain, with direct sea influence; drier, more continental conditions and different soils in the Ribera d'Ebre.",
  rules: "The list of traditional liqueur wines, including vi de missa (altar wine) and Clásico, is the longest of any Catalan DO.",
  history: "Roman Tarraco shipped wine across the empire. The DO dates from 1942 and at first protected only Tarragona Clásico; table wines followed in 1959. Reus's wine station opened Spain's first school of oenology, ancestor of the Rovira i Virgili university faculty (1997).",
  glass: "Mostly fresh whites and Garnatxa-based reds; Clásico and rancio are amber, nutty and oxidative.",
  exam: "DO 1942; Tarragona Clásico; former Falset subzone became Montsant (2001).",
  producers: ["De Muller", "Vinícola de Nulles"]
});
APXF["es-terra-alta"] = ct({
  lede: "High, windswept country between the Ebro and Aragón, where Garnatxa Blanca reaches its greatest expression. The DO claims about a third of the world's Garnacha Blanca.",
  cat: "DO (DOP), white, rosé, red, liqueur wines (incl. rancio and vi dolç natural), quality sparkling and semi-sparkling", rec: "DO provisionally 1972; first regulation 1982",
  src: ["Plec de condicions DO Terra Alta, March 2020 (INCAVI)", "https://incavi.gencat.cat/content/dam/incavi/home/normativa/plecs-de-condicions-de-les-do-catalanes/do-terra-alta/dop-terra-alta-modificacio-plec-condicions.pdf"],
  amended: "March 2020 version, the one in the Ministry's 2026 list (temporary vintage rules for 2025)",
  sources: [["INCAVI: DO Terra Alta", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-terra-alta"]],
  facts: [["Zone", "The 12 municipalities of the Terra Alta comarca: Arnes, Batea, Bot, Caseres, Corbera d'Ebre, La Fatarella, Gandesa, Horta de Sant Joan, El Pinell de Brai, La Pobla de Massaluca, Prat de Comte, Vilalba dels Arcs"], ["Recommended grapes", "Garnatxa Blanca, Macabeo, Parellada; Garnatxa Negra, Garnatxa Peluda, Samsó (Cariñena)"], ["Authorised grapes", "Chardonnay, Chenin, Moscatells, Pedro Ximénez, Sauvignon Blanc, Viognier; Cabernet Franc and Sauvignon, Garnatxa Tintorera, Morenillo, Merlot, Syrah, Ull de Llebre"], ["Alcohol", "White 12.5 to 15% (Parellada from 11%); rosé 12 to 15%; red 12.5 to 15%; liqueur wines 15 to 20%; sparkling 11 to 12.5%"], ["Yields", "White 10,000 kg/ha (70 hl/ha); red 8,000 kg/ha (56 hl/ha); at most 70 l per 100 kg"], ["Ageing", "Crianza red 24 months, white 18, with 6 in oak; reserva red 36 with 12; gran reserva red 60 with 24; rancio crianza 48 months with 36 in oak"]],
  place: "A plateau at 250 to 1,000 m, with vines mostly at 350 to 550 m among almonds and olives. Soils are loamy and of low fertility; the best are the balanced 'panal' soils. The climate is Mediterranean, moderated by altitude.",
  rules: "Its alcohol floors (12.5% for whites and reds) are among the highest in Catalonia. Varietal Garnatxa Blanca whites have their own tasting profile in the rules.",
  history: "Terra Alta was provisionally recognised in 1972 with Alella and Conca de Barberà. Its modernist cooperative cellars at Gandesa and El Pinell de Brai, by César Martinell, are landmarks.",
  glass: "Garnatxa Blanca: pale gold, fennel, white flowers, ripe pear, herbs, a broad, saline texture; reds are ripe and Mediterranean.",
  exam: "Garnatxa Blanca capital; Gandesa; Martinell's 'wine cathedrals'; high alcohol minimums.",
  producers: ["Edetària", "Celler Piñol", "Herència Altés", "Celler Frisach", "Bàrbara Forés", "Lafou"]
});
