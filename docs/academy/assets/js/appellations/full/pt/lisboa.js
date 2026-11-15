// Full encyclopedia entries: Lisboa region (Colares, Carcavelos, Bucelas, Alenquer, Arruda, Torres Vedras, Óbidos, Encostas d'Aire, Lourinhã, IG Lisboa). Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function lx(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const LXU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const LXCVR=["Comissão Vitivinícola da Região de Lisboa","https://www.vinhosdelisboa.com/"];
const LXAM="IVV copy published February 2026";
function lsrc(name,file){return {src:["Caderno de especificações "+name+" (IVV copy)",LXU+file],sources:[LXCVR],amended:LXAM};}

APXF["pt-colares"] = lx(Object.assign({
  lede: "Europe's most extreme vineyard: ungrafted Ramisco and Malvasia vines dug into deep sand dunes on the Atlantic coast below Sintra, protected by cane windbreaks, untouched by phylloxera.",
  cat: "DO (DOP): red and white", rec: "Demarcated 1908",
  facts: [["Area", "Parishes of Colares, São Martinho and São João das Lampas (Sintra)"], ["Soils", "Chão de areia (sand over clay or rock) and chão rijo (calcareous marls)"], ["Grapes", "Ramisco (red) and Malvasia de Colares (white) traditionally; also Arinto, Fernão Pires, Galego Dourado, Jampal, Vital, Castelão, Molar, Parreira Matias, Tinta Miúda"], ["Minimum alcohol", "10%; natural 9.5%"], ["Ageing", "Red 18 months in vessel plus 6 in bottle; white 6 months plus 3 in bottle"], ["Yields", "Red 55 hl/ha; white 70 hl/ha"], ["Training", "Low; lowest wire no higher than 30 cm; vines at least four years from grafting"]],
  place: "Between the Serra de Sintra and the Atlantic, with a strongly maritime climate, cool and humid in summer. On the chão de areia, growers dig through several metres of sand to reach the clay beneath and plant ungrafted cuttings there; the caderno preserves the traditional practice of 'unhar', setting the own-rooted cane into the stratum below the sand. Vines sprawl along the ground behind cane fences (paliçadas) and low walls that shelter them from salt wind. Phylloxera cannot survive in sand, so these are among the few ungrafted vineyards in Europe.",
  rules: "Long minimum ageing before sale: two years for reds, nine months for whites. Training must be very low. Wine may come from sand or from the harder calcareous chão rijo, but the sand vineyards make the region's name.",
  history: "Colares was demarcated in 1908. The caderno notes that its fame grew because phylloxera, which devastated Europe's vineyards in the late nineteenth century, could not touch the sand vines. Urban expansion around Sintra has since shrunk the area to a few dozen hectares, and the Adega Regional de Colares, founded in 1931, long held exclusive rights to make the wine.",
  glass: "Ramisco is pale, tart and very tannic young, softening over decades into a fragrant, brick-coloured wine of red fruit, forest floor and salt. Malvasia de Colares is citrus, saline and fresh.",
  exam: "Ungrafted vines in sand; Ramisco; Malvasia de Colares; 1908; cane windbreaks; 18 plus 6 months for reds.",
  producers: ["Adega Regional de Colares", "Viúva Gomes", "Fundação Oriente", "Casal Santa Maria", "Ramilo", "Monte Cascas"]
}, lsrc("DO Colares","DO_Colares.pdf")));

APXF["pt-carcavelos"] = lx(Object.assign({
  lede: "A fortified wine from a coastline now almost swallowed by Lisbon's suburbs, kept alive by the municipality of Oeiras in the vineyards Pombal once owned.",
  cat: "DO (DOP), vinho licoroso (vinho generoso)", rec: "Demarcated 1908",
  facts: [["Area", "Parishes of Carcavelos, Parede and São Domingos de Rana and parts of Alcabideche and Estoril (Cascais); part of Oeiras"], ["Alcohol", "Total at least 17.5%; actual 15 to 22%"], ["Sugar", "No more than 150 g/L"], ["Ageing", "At least 2 years in wood and 6 months in bottle"], ["Natural alcohol of must", "11%"], ["Yield", "55 hl/ha"], ["Grapes", "Boal Branco, Malvasia Fina, Ratinho, Seara Nova, Arinto, Rabo de Ovelha; Trincadeira, Castelão, Amostrinha"], ["Planting", "Low gobelet or cordon, canopy starting no higher than 60 cm; new vineyards at least 3,300 vines/ha"]],
  place: "A strip of coast west of Lisbon between the Porto Salvo and Bicesse streams, with mild maritime climate. Housing has replaced almost every vineyard; the main survivor is the Villa Oeiras project in the gardens of the Marquis of Pombal's palace.",
  rules: "The wine is fortified during fermentation and must spend at least two years in wood. It can be white or red in colour terms, though most is amber. Production must take place inside the region except where the CVR allows.",
  history: "Carcavelos was famous in the eighteenth and nineteenth centuries, promoted by Pombal and shipped to England. Demarcated in 1908, it nearly disappeared in the twentieth century as Lisbon grew.",
  glass: "Topaz to amber, off-dry to sweet, with nuts, dried fruit, orange peel and a fresh, saline finish; less sweet than most Port.",
  exam: "Fortified; 2 years in wood; Oeiras and Cascais; Pombal; 150 g/L maximum sugar.",
  producers: ["Villa Oeiras (Municipality of Oeiras)", "Casal da Manteiga"]
}, lsrc("DO Carcavelos","DO_Carcavelos.pdf")));

APXF["pt-bucelas"] = lx(Object.assign({
  lede: "Arinto's home, in the Trancão valley just north of Lisbon: steely, long-lived whites with at least 75% Arinto, once called 'Lisbon hock' in Britain.",
  cat: "DO (DOP): white and traditional-method sparkling", rec: "Demarcated 1911",
  facts: [["Area", "Parishes of Bucelas and parts of Fanhões and Santo Antão do Tojal (Loures)"], ["Grapes", "Arinto (at least 75%), Sercial (Esgana Cão), Rabo de Ovelha"], ["Minimum alcohol", "10.5%; natural 10.5%"], ["Minimum fixed acidity", "4.0 g/L"], ["Yield", "70 hl/ha"], ["Planting", "At least 3,300 vines/ha; vines at least three years from grafting"], ["Sparkling", "Traditional method"]],
  place: "Slopes of the Trancão valley with a local microclimate, cold in winter and temperate in summer. Soils are poor, from marls and hard limestone (the local caeiras), often deep and stony.",
  rules: "Only three white varieties may be used and Arinto must dominate. Bica aberta vinification (free-run juice without skins) is the rule. Sparkling must be traditional method from wine fit for the DO.",
  history: "The caderno recalls that Wellington knew and liked Bucelas, which became popular in England in the nineteenth century, where it was sold as Lisbon hock. Demarcated in 1911, it is one of Portugal's oldest white-wine appellations.",
  glass: "Pale lemon, with lemon, green apple and flint, high acidity and a dry, saline finish; with age it turns golden and complex, with honey and wax.",
  exam: "Arinto minimum 75%; Lisbon hock; 1911; Trancão valley.",
  producers: ["Quinta da Romeira", "Quinta da Murta", "Caves Velhas", "Quinta do Boição"]
}, lsrc("DO Bucelas","DO_Bucelas.pdf")));

APXF["pt-alenquer"] = lx(Object.assign({
  lede: "Sheltered by the Montejunto range from Atlantic wind, Alenquer is the warmest corner of the Lisbon region and the source of some of its most ambitious reds, from Touriga Nacional to Syrah.",
  cat: "DO (DOP): red and white", rec: "DO (former IPR)",
  facts: [["Area", "Parishes of Alenquer municipality (some for white wine only)"], ["Minimum alcohol", "Red 11.5%; white 11%"], ["Natural alcohol", "Red 11%; white 10.5%"], ["Ageing", "Reds bottled after at least 8 months"], ["Yields", "Red 80 hl/ha; white 90 hl/ha"], ["Grapes", "Touriga Nacional, Touriga Franca, Aragonez, Castelão, Tinta Miúda, Trincadeira, Alicante Bouschet, Syrah, Cabernet Sauvignon and others; Arinto, Fernão Pires, Vital, Viosinho, Chardonnay, Sauvignon Blanc, Alvarinho and others"], ["Soils", "Brown or red Mediterranean soils on sandstone, sand or clay; calcareous soils on marl"]],
  place: "The caderno credits Alenquer's character to the mountain barrier to the north and west, which blocks Atlantic influence and lets in Mediterranean warmth, while still allowing summer mists and breezes. Vines grow on hills and slopes of clay-limestone and Mediterranean soils.",
  rules: "Standard Lisbon DO rules with an 8-month minimum for reds. Some parishes may produce only white wine.",
  glass: "Ripe, structured reds with dark fruit and spice; Syrah has a notable reputation here. Whites are fuller than on the coast.",
  exam: "Montejunto shelter; warmest Lisbon DO; Monte d'Oiro Syrah.",
  producers: ["Quinta do Monte d'Oiro", "Quinta de Chocapalha", "Quinta da Boavista (Casa Santos Lima)", "Quinta de Pancas"]
}, lsrc("DO Alenquer","DO_Alenquer.pdf")));

APXF["pt-arruda"] = lx(Object.assign({
  lede: "Arruda dos Vinhos, 'Arruda of the wines', a hilly, cooperative-led DO north of Lisbon making mostly red wine.",
  cat: "DO (DOP): red and white", rec: "DO (former IPR)",
  facts: [["Area", "Arruda dos Vinhos; parts of Sobral de Monte Agraço and Vila Franca de Xira"], ["Minimum alcohol", "Red 11.5%; white 11%"], ["Ageing", "Reds 14 months, whites 3 months before bottling"], ["Yields", "Red 80 hl/ha; white 90 hl/ha"], ["Soils", "Brown calcareous soils and parabarros on marl and fine sandstone"]],
  place: "Steep hills with an Atlantic-influenced climate; the caderno ties the relief to aromatic whites and structured reds.",
  rules: "The longest minimum ageing among the Lisbon table-wine DOs: 14 months for reds.",
  glass: "Medium-bodied reds of Castelão, Aragonez and Touriga Nacional; fresh Arinto and Fernão Pires whites.",
  exam: "Arruda dos Vinhos; 14 months for reds.",
  producers: ["Adega Cooperativa de Arruda dos Vinhos"]
}, lsrc("DO Arruda","DO_Arruda.pdf")));

APXF["pt-torres-vedras"] = lx(Object.assign({
  lede: "Once Portugal's great bulk-wine district, Torres Vedras makes fresh, Atlantic-tinged whites and reds on clay-limestone hills near the coast.",
  cat: "DO (DOP): red and white", rec: "DO (former IPR)",
  facts: [["Area", "Parishes of Torres Vedras; for white only, parts of Mafra, Sobral de Monte Agraço and Torres Vedras"], ["Minimum alcohol", "Red 11.5%; white 11%"], ["Ageing", "Reds 8 months, whites 3 months before bottling"], ["Yields", "Red 80 hl/ha; white 90 hl/ha"], ["Soils", "Clay-limestone and brown and red Mediterranean soils"]],
  place: "Close to the Atlantic, with Mediterranean climate and marked ocean influence; vines on slopes and the várzeas along streams. The caderno says methodical vine growing took hold in the mid-eighteenth century.",
  rules: "Standard Lisbon DO rules; some parishes for white wine only.",
  glass: "Light, fresh whites with a citrus bite; reds firm when young, softening with age.",
  exam: "Atlantic influence; former bulk-wine centre; 8 months for reds.",
  producers: ["Adega Cooperativa de Torres Vedras"]
}, lsrc("DO Torres Vedras","DO_Torres-Vedras.pdf")));

APXF["pt-obidos"] = lx(Object.assign({
  lede: "Rolling hills from the Montejunto range to the walled town of Óbidos, close to the sea and suited to fresh whites and sparkling wine.",
  cat: "DO (DOP): red, white, rosé and sparkling", rec: "DO (former IPR)",
  facts: [["Area", "Parishes of Bombarral, Cadaval, Caldas da Rainha and Óbidos"], ["Minimum alcohol", "Red 12%; white and rosé 11%"], ["Natural alcohol", "11%; sparkling base 10%"], ["Yields", "Red 70 hl/ha; white, rosé and sparkling 90 hl/ha"], ["Grapes", "Broad list including Arinto, Fernão Pires, Vital, Encruzado, Riesling, Chardonnay, Viognier; Castelão, Touriga Nacional, Baga, Pinot Noir, Syrah, Merlot"]],
  place: "From the north-west slopes of the Serra de Montejunto toward Óbidos stretches a patchwork of hills and vineyards, with strong Atlantic influence and frequent mist.",
  rules: "Higher red minimum (12%) than neighbouring DOs; sparkling allowed.",
  glass: "Crisp whites and sparkling; reds lighter and fresher.",
  exam: "Bombarral and Cadaval; sparkling; Montejunto.",
  producers: ["Companhia Agrícola do Sanguinhal"]
}, lsrc("DO Óbidos","DO_Obidos.pdf")));

APXF["pt-encostas-d-aire"] = lx(Object.assign({
  lede: "The limestone foothills of the Serra de Aire and Candeeiros around Leiria, Batalha and Ourém, with two named areas, Alcobaça and Ourém, and the unique Medieval de Ourém blend of white and red.",
  cat: "DO (DOP): red, white and rosé", rec: "DO (former IPR)",
  facts: [["Area", "Batalha, Porto de Mós, Ourém; parishes of Alcobaça, Caldas da Rainha, Leiria and Pombal"], ["Named areas", "Alcobaça; Ourém"], ["Minimum alcohol", "Red 11.5%; white and rosé 11%; Medieval de Ourém 11.5%"], ["Yields", "Red and rosé 70 hl/ha; white 80 hl/ha"], ["Medieval de Ourém", "White must at least 12% natural, red at least 10%; red fermented 4 to 10 days on skins, then unpressed red must added to white in wood under 3,000 l; total must yield 67%"]],
  place: "Slopes facing west from the limestone massif of Aire and Candeeiros toward the coast, between the Atlantic-influenced west and the Ribatejo.",
  rules: "Medieval de Ourém is a protected traditional method: white grapes (mainly Fernão Pires) are crushed and the must put in wooden vessels within 24 hours; separately, destemmed red grapes (mainly Trincadeira) ferment on skins, and the unpressed red must is then added to the white, which carries on fermenting. Vineyards for it need at least 4,000 vines/ha (6,000 advised).",
  history: "The Medieval de Ourém method is traced by its producers to the Cistercian monks of Alcobaça, who introduced it in the Middle Ages.",
  glass: "Light, fresh reds and whites; Medieval de Ourém is pale red, fresh and slightly tannic.",
  exam: "Medieval de Ourém (white must plus red must); Alcobaça; limestone.",
  producers: ["Adega Cooperativa de Ourém"]
}, lsrc("DO Encostas d'Aire","DO_Encostas-dAire.pdf")));

APXF["pt-lourinha"] = lx({
  lede: "A grape-brandy appellation on the coast north of Lisbon, one of very few in Europe, distilled from thin, acidic, sulphur-free wine and aged at least two years in oak.",
  cat: "DO (DOP) for aguardente vínica (wine brandy)", rec: "Delimited region for brandy",
  src: ["Caderno de especificações Aguardente Vínica DOP Lourinhã (IVV copy)", LXU+"Aguardente-Vinica-Lourinha.pdf"], sources: [LXCVR], amended: LXAM,
  facts: [["Area", "Parishes of Lourinhã municipality and neighbours"], ["Base wine", "At most 10% natural alcohol; no added sulphur; red grapes vinified as white"], ["Distillation", "Inside the region; column still to 78% maximum, pot still to 72% maximum"], ["Ageing", "In oak casks up to 800 l, inside the region; at least 24 months before sale"], ["Minimum alcohol", "38%"]],
  place: "A cool, windy Atlantic strip around Lourinhã where grapes struggle to ripen. That makes low-alcohol, high-acid wine, ideal for distilling, as in Cognac.",
  rules: "The caderno sets base wine at no more than 10% alcohol and bans sulphur dioxide in vinification. Distillate goes into oak immediately; research cited in the caderno found French Limousin oak gives the best results, and Portuguese chestnut casks are under study.",
  glass: "Amber, with vanilla, toasted wood, spice, dried fruit, smoke and a dry, firm finish; the caderno notes more wood and spice and less caramel and sweetness than other aged brandies.",
  exam: "Brandy DO; base wine maximum 10%; no SO2; 2 years in oak.",
  producers: ["Adega Cooperativa da Lourinhã"]
});

APXF["pt-lisboa"] = lx({
  lede: "The regional wine of the Lisbon region (formerly Estremadura), Portugal's most productive area, with two subregions and a yield cap of 200 hl/ha.",
  cat: "IG (IGP), Vinho Regional: wine, licoroso, sparkling, quality sparkling, frisante", rec: "Vinho Regional Estremadura, renamed Lisboa in 2009",
  src: ["Caderno de especificações IG Lisboa (IVV copy)", LXU+"IG_Lisboa.pdf"], sources: [LXCVR], amended: LXAM,
  facts: [["Subregions", "Estremadura (Lisbon district except Azambuja, plus western Leiria district); Alta Estremadura (Alcobaça, Batalha, Leiria, Marinha Grande, Nazaré, Pombal, Porto de Mós)"], ["Natural alcohol", "9% for wine and sparkling"], ["Yield", "200 hl/ha"]],
  place: "A long Atlantic strip from Lisbon north to Leiria, with clay-limestone hills, sea winds and cool, cloudy summers on the coast, warmer conditions behind the Montejunto and Aire ranges.",
  rules: "Very permissive: high yields and a long list of Portuguese and international varieties. Most Lisbon-region wine, including much export volume, is sold as Vinho Regional Lisboa.",
  glass: "Fresh, fruity, good-value whites and reds; leading estates also release premium wines under this label.",
  exam: "Lisboa IGP (ex-Estremadura); 200 hl/ha; Estremadura and Alta Estremadura subregions.",
  producers: ["Casa Santos Lima", "Quinta do Monte d'Oiro", "Quinta de Chocapalha"]
});
