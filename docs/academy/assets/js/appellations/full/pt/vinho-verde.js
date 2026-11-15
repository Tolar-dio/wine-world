// Full encyclopedia entries: Vinho Verde DO, its nine subregions and IG Minho. Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function vv(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const VVSRC=["Caderno de especificações DO Vinho Verde (IVV copy)","https://www.ivv.gov.pt/wp-content/uploads/2026/02/DO_Vinho-Verde.pdf"];
const VVCVR=["Comissão de Viticultura da Região dos Vinhos Verdes","https://www.vinhoverde.pt/"];
const VVSUBRULE="Subregion wines must be grown and made entirely in the subregion, only from its listed grapes, with at least 9% natural alcohol, and must show the vintage on the label.";
function vsub(o){return vv(Object.assign({cat:"Subregion of DO Vinho Verde (DOP)",rec:"DO Vinho Verde 1908; subregion recognized in the caderno",src:VVSRC,sources:[VVCVR],amended:"IVV copy published February 2026"},o));}

APXF["pt-vinho-verde"] = vv({
  lede: "Portugal's largest DO by number of growers: a green, rainy, granite amphitheatre facing the Atlantic between the Minho and Douro rivers, making fresh, aromatic, moderate-alcohol whites from Alvarinho, Loureiro, Arinto and Avesso, plus inky Vinhão reds.",
  cat: "DO (DOP): white, rosé and red wine; sparkling and quality sparkling", rec: "Demarcated 1908",
  src: VVSRC, sources: [VVCVR], amended: "IVV copy published February 2026",
  facts: [["Vineyard area", "About 16,000 ha below 700 m"], ["Rainfall", "About 1,200 mm a year on average"], ["Subregions", "Amarante, Ave, Baião, Basto, Cávado, Lima, Monção e Melgaço, Paiva, Sousa"], ["Natural alcohol minimum", "8.5%; 9% for subregion wines; 11.5% for Alvarinho; 15% for late harvest"], ["Alcohol cap", "11.5% for basic wines (14% late harvest); no cap with a variety, subregion or quality term"], ["Yields", "10,666 kg/ha, up to 13,500 kg/ha for Alvarinho or 15,000 kg/ha for other grapes if quality criteria are met; 7,500 kg/ha if the vineyard register is over 10 years old"], ["Must yield", "75 l per 100 kg; 65 l for Alvarinho"], ["Reds", "Red grapes only, or up to 15% white grapes with the term Palhete or Palheto"], ["Late harvest", "At least 45 g/L residual sugar"], ["Packaging", "Glass up to 5 litres or cans up to 0.25 litres"]],
  place: "The region fills north-west Portugal: the Minho river to the north, the Douro and the Freita, Arada and Montemuro ranges to the south, the Peneda, Gerês, Cabreira and Marão ranges to the east and the Atlantic to the west. The land rises as an amphitheatre from the coast, cut by river valleys (Minho, Lima, Cávado, Ave, Sousa, Tâmega, Paiva) that let ocean air far inland. Soils are shallow and mostly granitic, with two narrow schist bands running south-east to north-west. The climate is mild and wet, with rain concentrated in winter and spring. Coastal subregions are cooler and more even; the interior ones (Amarante, Baião, Basto) are warmer, higher and more sheltered; Monção e Melgaço, in the north-east, is sheltered from the sea with wide temperature swings.",
  rules: "Basic Vinho Verde may not exceed 11.5% alcohol, which defines the light, often slightly spritzy commercial style; the cap disappears for wines labelled with a variety, a subregion or a quality term. Alvarinho needs 11.5% natural alcohol and lower must yields. Training must be traditional (uveiras up trees, arjões between trees, bordadura around fields, granite-post ramadas) or modern medium or high systems (bardo, cordão). The full list has about 50 varieties, nearly all Portuguese and, the caderno says, half native to the region itself. Since the current rules Alvarinho may be used across the DO, not only in Monção e Melgaço.",
  history: "The caderno claims Vinho Verde as the first Portuguese wine known in European markets, shipped to England, Flanders and Germany. The region was demarcated in 1908, and the CVRVV has managed it since 1926. High vine training on trees and pergolas let farmers grow food crops underneath, which shaped the landscape of small plots still seen today.",
  glass: "Whites are pale lemon with citrus, green apple, white flowers and high, mouth-watering acidity; Loureiro adds bay leaf and lime blossom, Alvarinho stone fruit and more body, Avesso and Azal a riper, firmer profile inland. Vinhão reds are almost black, with sour cherry, high acidity and rustic tannin, traditionally drunk from white bowls. Rosés are light and fruity.",
  exam: "Demarcated 1908; nine subregions; 11.5% cap for basic wines; Alvarinho needs 11.5% natural alcohol; Palhete red with up to 15% white grapes; granite; Vinhão.",
  producers: ["Soalheiro", "Anselmo Mendes", "Quinta do Ameal", "Aveleda", "Palácio da Brejoeira", "Quinta de Covela", "Quinta da Lixa", "Casa de Vilacetinho", "Adega de Monção", "Afros", "Márcio Lopes"]
});

APXF["pt-moncao-e-melgaco"] = vsub({
  lede: "The home of Portuguese Alvarinho: two municipalities on the south bank of the Minho opposite Spain's Rías Baixas, sheltered from the sea, where the grape gains more body and ripeness than anywhere else in the region.",
  facts: [["Municipalities", "Monção and Melgaço"], ["Subregion grapes", "Alvarinho, Loureiro, Trajadura, Pedral; Alvarelhão, Borraçal, Vinhão"], ["Climate", "Protected from sea winds; wide daily and seasonal temperature range; intermediate rainfall"], ["Minimum natural alcohol", "11.5% for Alvarinho; 9% otherwise"]],
  place: "The north-eastern corner of the region, where hills shield the Minho valley from Atlantic wind and rain. The caderno describes a microclimate with high temperature ranges and moderate rainfall, ideal for early-ripening Alvarinho, Pedral and Alvarelhão, planted mostly on mid-slopes on the south bank. Soils are granite with alluvial terraces near the river.",
  rules: VVSUBRULE + " Alvarinho was once reserved to this subregion; it is now permitted across Vinho Verde, so the subregion name is what signals origin.",
  history: "Palácio da Brejoeira's Alvarinho, launched in the 1970s, first made the subregion's name. Monção e Melgaço producers fought hard against opening Alvarinho to the whole DO.",
  glass: "Fuller, riper whites than elsewhere in Vinho Verde: peach, grapefruit, passion fruit, sometimes honeyed, with firm acidity and a saline finish, often 12.5 to 13.5%. The best age for a decade; producers such as Soalheiro and Anselmo Mendes also make lees-aged, barrel and skin-contact versions.",
  exam: "Alvarinho heartland; opposite Rías Baixas; 11.5% natural alcohol for Alvarinho.",
  producers: ["Soalheiro", "Anselmo Mendes", "Palácio da Brejoeira", "Adega de Monção", "Quinta de Santiago", "Quintas de Melgaço", "Luís Seabra (Granito Cru)"]
});

APXF["pt-lima"] = vsub({
  lede: "The Lima valley, from Viana do Castelo inland past Ponte de Lima: wet, Atlantic and the heartland of floral Loureiro.",
  facts: [["Main towns", "Ponte de Lima, Ponte da Barca, Arcos de Valdevez, Viana do Castelo"], ["Subregion grapes", "Loureiro, Arinto, Trajadura; Borraçal, Espadeiro, Padeiro, Vinhão"], ["Climate", "Intermediate temperature range, strong ocean exposure, high rainfall"]],
  place: "The caderno describes a valley open to the sea, with altitude rising from the coast inland and high rainfall, favouring varieties suited to mild maritime climates: Loureiro, Arinto and Trajadura. Reds come mostly from the higher, warmer interior.",
  rules: VVSUBRULE,
  glass: "Elegant, fresh whites with intense floral and citrus aromas, bay leaf and lime blossom from Loureiro; reds riper than the coast would suggest because they come from inland sites.",
  exam: "Loureiro subregion; Ponte de Lima.",
  producers: ["Quinta do Ameal", "Adega Cooperativa de Ponte de Lima", "Casa de Paço d'Anha"]
});

APXF["pt-cavado"] = vsub({
  lede: "The Cávado valley around Braga and Barcelos: low, mild, close to the ocean, making fresh blends of Loureiro, Arinto and Trajadura.",
  facts: [["Main towns", "Braga, Barcelos, Esposende, Vila Verde, Amares"], ["Subregion grapes", "Loureiro, Arinto, Trajadura; Amaral, Borraçal, Espadeiro, Padeiro, Vinhão"], ["Climate", "Low temperature range, maritime winds, moderate rainfall"]],
  place: "One of the three low-range zones in the caderno (with Ave and Sousa): vines sit in irregular river basins at low altitude, exposed to sea winds, favouring medium-ripening Arinto and Loureiro and early Trajadura.",
  rules: VVSUBRULE,
  glass: "Moderate acidity, great freshness, floral, citrus and white-fleshed fruit aromas; blends often combine Loureiro and Arinto with Trajadura.",
  exam: "Maritime, low-altitude subregion; Braga.",
  producers: []
});

APXF["pt-ave"] = vsub({
  lede: "The Ave basin around Guimarães and Vila Nova de Famalicão, a mild, low-lying subregion of Loureiro, Arinto and Trajadura blends.",
  facts: [["Main towns", "Guimarães, Vila Nova de Famalicão, Fafe, Santo Tirso, Póvoa de Lanhoso"], ["Subregion grapes", "Loureiro, Arinto, Trajadura; Amaral, Borraçal, Espadeiro, Padeiro, Vinhão"], ["Climate", "Low temperature range, maritime influence"]],
  place: "Low altitude and maritime exposure along the Ave and its tributaries; granite soils. The caderno groups it with Cávado and Sousa as zones of low temperature range.",
  rules: VVSUBRULE + " Alvarinho is not on the Ave subregion list, though it may be used for Vinho Verde without the subregion name.",
  glass: "Fresh, floral, citrus whites of moderate acidity; light reds.",
  exam: "Guimarães; low-range maritime zone.",
  producers: []
});

APXF["pt-sousa"] = vsub({
  lede: "The Sousa valley east of Porto, around Felgueiras, Lousada and Penafiel, where Loureiro and Arinto meet the later Azal and Avesso of the interior.",
  facts: [["Main towns", "Felgueiras, Lousada, Paços de Ferreira, Paredes, Penafiel"], ["Subregion grapes", "Loureiro, Arinto, Avesso, Azal, Trajadura; Amaral, Borraçal, Espadeiro, Vinhão"], ["Climate", "Low temperature range, mild"]],
  place: "A transition zone: still low and mild like Ave and Cávado, but close enough to the interior to ripen Azal and Avesso. Granite soils along the Sousa, a tributary of the Douro.",
  rules: VVSUBRULE,
  glass: "Fresh, floral and citrus whites; blends of medium and early varieties with firmer Avesso and Azal.",
  exam: "Felgueiras and Penafiel; Aveleda's home area.",
  producers: ["Aveleda"]
});

APXF["pt-basto"] = vsub({
  lede: "The high, sheltered Tâmega valley around Cabeceiras, Celorico and Mondim de Basto, a late-ripening interior subregion of Azal and Rabo-de-Anho.",
  facts: [["Main towns", "Cabeceiras de Basto, Celorico de Basto, Mondim de Basto, Ribeira de Pena"], ["Subregion grapes", "Azal, Arinto, Batoca, Trajadura; Amaral, Borraçal, Espadeiro, Padeiro, Rabo-de-Anho, Vinhão"], ["Climate", "Wide temperature range, protected from Atlantic winds, higher average altitude"]],
  place: "Inland behind the Cabreira and Marão foothills. The caderno groups Basto with Amarante and Baião: greater daily and seasonal temperature swings, more shelter from Atlantic wind and higher altitude, which allow later varieties such as Azal, Amaral, Espadeiro, Rabo-de-Anho and Vinhão to ripen.",
  rules: VVSUBRULE,
  glass: "Whites with higher alcohol than the regional average, moderate acidity, citrus and tropical fruit and a mineral, structured feel; Azal brings green apple and lemon sharpness.",
  exam: "Interior, late-ripening zone; Azal; Rabo-de-Anho red grape.",
  producers: []
});

APXF["pt-amarante"] = vsub({
  lede: "The interior Tâmega valley around Amarante and Marco de Canaveses, where warmer, more sheltered sites ripen Avesso, Azal and the red Amaral.",
  facts: [["Main towns", "Amarante, Marco de Canaveses"], ["Subregion grapes", "Arinto, Avesso, Azal, Trajadura; Amaral, Borraçal, Espadeiro, Vinhão"], ["Climate", "Wide temperature range, sheltered from the ocean"]],
  place: "On the Tâmega below the Marão. Granite soils; altitude and shelter give the interior profile the caderno describes for Amarante, Baião and Basto.",
  rules: VVSUBRULE,
  glass: "Riper, more structured whites with citrus and tropical notes; deeper-coloured reds than near the coast.",
  exam: "Interior zone; Tâmega; Avesso and Azal.",
  producers: []
});

APXF["pt-baiao"] = vsub({
  lede: "The north bank of the Douro at the region's south-eastern edge, Avesso's home, where Vinho Verde borders the Douro.",
  facts: [["Main town", "Baião"], ["Subregion grapes", "Arinto, Avesso, Azal; Alvarelhão, Amaral, Borraçal, Vinhão"], ["Climate", "Warmest and most sheltered part of the region"]],
  place: "Granite slopes running down to the Douro, close to the start of the Douro demarcation. Warm and sheltered, with the interior features the caderno assigns to Amarante, Baião and Basto, so late-ripening Avesso reaches full ripeness.",
  rules: VVSUBRULE,
  glass: "Avesso gives full, textured whites with peach, citrus and nutty notes and moderate acidity, often over 12%.",
  exam: "Avesso; Douro border; warm interior.",
  producers: ["Quinta de Covela", "Quinta de Santa Cristina"]
});

APXF["pt-paiva"] = vsub({
  lede: "South of the Douro around Castelo de Paiva: drier and protected from the sea, where Amaral and Vinhão ripen well and Avesso joins Arinto and Loureiro.",
  facts: [["Main town", "Castelo de Paiva"], ["Subregion grapes", "Arinto, Avesso, Loureiro, Trajadura; Amaral, Borraçal, Vinhão"], ["Climate", "Intermediate temperature range, low rainfall, medium altitude"]],
  place: "The caderno singles out Paiva for low rainfall and medium altitude, sheltered from marine influence, conditions that ripen red Amaral and Vinhão fully and suit temperate white varieties alongside later Avesso.",
  rules: VVSUBRULE,
  glass: "Elegant, fruity whites and rosés with more alcohol than the regional average; reds of deep colour and good structure.",
  exam: "South of the Douro; red-friendly subregion.",
  producers: []
});

APXF["pt-minho"] = vv({
  lede: "The regional wine of the Vinho Verde area, used for wines that break DO rules: higher yields, international grapes, frisante styles and fortified wine.",
  cat: "IG (IGP), Vinho Regional: wine, liqueur wine, sparkling, quality sparkling, frisante and carbonated frisante", rec: "Vinho Regional, IG under EU rules",
  src: ["Caderno de especificações IG Minho (IVV copy)", "https://www.ivv.gov.pt/wp-content/uploads/2026/02/IG_Minho.pdf"], sources: [VVCVR], amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "8.5% for wine; 7% natural alcohol in the must"], ["Yields", "20,000 kg/ha; Alvarinho 10,666 kg/ha (13,500 kg/ha under conditions)"], ["Must yield", "75 l per 100 kg; 65 l for Alvarinho"], ["Area", "The whole of north-west Portugal, same zone as Vinho Verde"], ["Styles", "Includes frisante and Palhete red"]],
  place: "The same granite, Atlantic north-west as the DO. Wine may be made in nearby facilities outside the area, which the DO does not allow.",
  rules: "Much more permissive than the DO: double the base yield and a longer list of varieties, including international grapes. Producers use Minho for varietal Sauvignon Blanc, Chardonnay or red blends, for wines above the DO's 11.5% cap without a quality term, or for declassified lots.",
  glass: "Varies widely; many are fresh whites like the DO, others riper or international in style.",
  exam: "Minho is the IGP for the Vinho Verde area; 20,000 kg/ha.",
  producers: []
});
