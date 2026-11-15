// Full encyclopedia entries: Trás-os-Montes DO, its three subregions and IG Transmontano. Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function tm(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const TMU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const TMSRC=["Caderno de especificações DO Trás-os-Montes (IVV copy)",TMU+"DO_Tras-os-Montes.pdf"];
const TMCVR=["Comissão Vitivinícola Regional de Trás-os-Montes","https://www.cvrtm.pt/"];
const TMAM="IVV copy published February 2026";
const TMSUB="Subregion wines follow DO Trás-os-Montes rules: red 11.5%, white and rosé 11%, sparkling 10%, licoroso 16.5%; 55 hl/ha; rosé by bica aberta or short maceration.";
function tsub(o){return tm(Object.assign({cat:"Subregion of DO Trás-os-Montes (DOP)",rec:"Former IPR; subregion of the DO (2006)",src:TMSRC,sources:[TMCVR],amended:TMAM},o));}

APXF["pt-tras-os-montes"] = tm({
  lede: "The remote north-east of Portugal, 'behind the mountains' of Marão and Alvão, outside the Douro demarcation: three scattered subregions of granite and schist making concentrated reds, fresh whites and some sparkling and fortified wine.",
  cat: "DO (DOP): wine, sparkling and vinho licoroso", rec: "DO 2006, from the former Chaves, Valpaços and Planalto Mirandês IPRs",
  src: TMSRC, sources: [TMCVR], amended: TMAM,
  facts: [["Subregions", "Chaves, Valpaços, Planalto Mirandês"], ["Minimum alcohol", "Red 11.5%; white and rosé 11%; sparkling 10%; licoroso 16.5%"], ["Natural alcohol", "Red 11.5%; white and rosé 11%; sparkling base 10%; licoroso 11%"], ["Yield", "55 hl/ha"], ["Sparkling terms", "Reserva 12 to 24 months on lees in bottle; Super-reserva 24 to 36; Velha reserva or Grande reserva over 36"], ["Rosé", "Bica aberta or light maceration"]],
  place: "Trás-os-Montes is the high, isolated plateau north of the Douro valley, cut off from the Atlantic by the Marão and Alvão ranges. The climate is continental: very hot, dry summers that ripen grapes fully and long, freezing winters. Soils are mainly Precambrian schist with granite patches. The three subregions are far apart: Chaves in the Tâmega valley near Spain, Valpaços on the Tua and Rabaçal plateau, Planalto Mirandês on the high plain above the Douro International canyon.",
  rules: "The DO sets soil types per subregion and caps yields at 55 hl/ha, the same as the Douro. Sparkling ageing terms are defined by time on lees in bottle before disgorgement.",
  glass: "Reds are dense in colour and alcohol, with black fruit and rustic tannin from Tinta Roriz, Touriga Nacional, Trincadeira, Bastardo and old field blends; whites from Côdega do Larinho, Síria, Gouveio, Viosinho and Malvasia Fina are fresh at altitude.",
  exam: "Three subregions; outside the Douro; continental; 55 hl/ha.",
  producers: ["Valle Pradinhos", "Adega Cooperativa de Valpaços", "Menina d'Uva", "Arribas Wine Company"]
});

APXF["pt-chaves"] = tsub({
  lede: "The Tâmega valley around the spa town of Chaves near the Galician border, the coolest and wettest of the three subregions.",
  facts: [["Area", "Parishes of Chaves and Vila Pouca de Aguiar (Capeludos, Valoura)"], ["Soils", "Granite lithosols; brown or red soils on clay schist and gneiss"]],
  place: "A broad, fertile valley opening toward Galicia's Monterrei, granite-based, with cold winters and more rain than the eastern subregions.",
  rules: TMSUB,
  glass: "Lighter, fresher reds and whites than Valpaços.",
  exam: "Tâmega valley; borders Monterrei; granite.",
  producers: []
});

APXF["pt-valpacos"] = tsub({
  lede: "The largest and most productive subregion, on the plateau between the Tua and Rabaçal rivers around Valpaços, Mirandela and Macedo de Cavaleiros.",
  facts: [["Area", "Valpaços; parishes of Macedo de Cavaleiros, Mirandela and others"], ["Soils", "Granite lithosols; brown or red soils on schist"]],
  place: "A hot, continental plateau on granite and schist, close to the northern edge of the Douro Superior.",
  rules: TMSUB,
  glass: "Ripe, structured reds; the cooperative of Valpaços dominates volume.",
  exam: "Largest subregion; Valpaços cooperative.",
  producers: ["Adega Cooperativa de Valpaços", "Valle Pradinhos"]
});

APXF["pt-planalto-mirandes"] = tsub({
  lede: "The high plain of Miranda do Douro, Mogadouro and Vimioso above the Douro International gorge, with old vineyards of field blends on granite and schist.",
  facts: [["Area", "Miranda do Douro, Mogadouro, Vimioso; parishes of Freixo de Espada à Cinta and Torre de Moncorvo"], ["Soils", "Granite lithosols; brown or red soils on schist"]],
  place: "An exposed upland on the Spanish border, extreme in temperature, where the Douro runs in a deep canyon (Arribes del Duero on the Spanish side). Old bush vines of Bastardo, Tinta Roriz, Touriga Nacional, Marufo and white grapes survive in small plots.",
  rules: TMSUB,
  glass: "Fresh, mineral, often lighter reds from old field blends; aromatic whites.",
  exam: "Miranda do Douro; Arribes border; old field blends.",
  producers: ["Arribas Wine Company"]
});

APXF["pt-transmontano"] = tm({
  lede: "The regional wine of Trás-os-Montes, covering the whole district including the high, cold Barroso and the areas between the DO subregions.",
  cat: "IG (IGP), Vinho Regional", rec: "Vinho Regional; IG under EU rules",
  src: ["Caderno de especificações IG Transmontano (IVV copy)", TMU+"IG_Transmontano.pdf"], sources: [TMCVR], amended: TMAM,
  facts: [["Minimum alcohol", "10%"], ["Area", "Municipalities of Bragança and Vila Real districts outside the Douro, including Boticas, Chaves, Montalegre, Valpaços, Vila Pouca de Aguiar and parts of Murça, Sabrosa and Vila Real"], ["Soils", "Precambrian schist with granite patches, small areas of limestone, gneiss and alluvium"]],
  place: "The whole north-eastern plateau outside the Douro demarcation, with very hot, dry summers that give full ripeness.",
  rules: "Freer than the DO in yields and varieties, allowing new plantings of noble varieties alongside old local grapes.",
  glass: "Concentrated, deeply coloured reds with high alcohol; fresh whites from altitude.",
  exam: "Transmontano IGP.",
  producers: ["Valle Pradinhos", "Arribas Wine Company"]
});
