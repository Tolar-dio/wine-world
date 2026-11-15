// Full encyclopedia entries: Algarve (Lagoa, Lagos, Portimão, Tavira, IG Algarve). Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function ag(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const AGU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const AGCVR=["Comissão Vitivinícola do Algarve","https://www.vinhosdoalgarve.pt/"];
const AGAM="IVV copy published February 2026";
const AGRULE="All four Algarve DOs share the same core rules: red at least 12% and white 11.5% (natural and actual), 60 hl/ha for red and white, low-trained single-crop vineyards at least four years from grafting, cordon or gobelet pruning. Only still wine is covered; fortified and sparkling Algarve wines are sold under the IG.";
const AGHIST="The caderno says quality wine production in the Algarve was first recognized in 1980. The region was long dominated by cooperatives and by the pale, high-alcohol Negra Mole; private estates, many founded by newcomers since the 2000s, have since diversified the style.";
function ado(o,name,file){return ag(Object.assign({cat:"DO (DOP): red and white wine",rec:"Quality wine first recognized 1980; DO",src:["Caderno de especificações "+name+" (IVV copy)",AGU+file],sources:[AGCVR],amended:AGAM,history:AGHIST},o));}

APXF["pt-lagoa"] = ado({
  lede: "The largest Algarve DO, stretching from Silves and Lagoa to Albufeira and western Loulé on sandstone and sandy soils behind the tourist coast.",
  facts: [["Area", "Albufeira, Lagoa, parts of Loulé (Almancil, Boliqueime, Quarteira and others) and Silves"], ["Grapes", "Negra Mole, Castelão, Aragonez, Touriga Nacional, Touriga Franca, Syrah, Alicante Bouschet, Cabernet Sauvignon, Monvedro, Moreto; Arinto, Síria, Manteúdo, Rabo de Ovelha, Moscatel Graúdo, Sauvignon Blanc"], ["Soils", "Silves sandstone (grés de Silves), sands, red and yellow Mediterranean soils on sandstone and raña"]],
  place: "Between the Serra de Monchique and the coast, with a hot, dry Mediterranean climate tempered by sea breezes. The red Silves sandstone is the signature soil.",
  rules: AGRULE,
  glass: "Ripe, warm reds, from light, pale Negra Mole to fuller Touriga and Syrah blends; whites soft and aromatic.",
  exam: "Largest Algarve DO; grés de Silves; Negra Mole; still wine only.",
  producers: ["Adega de Lagoa", "Morgado do Quintão", "Quinta dos Vales", "Adega do Cantor (Vida Nova)", "Quinta do Francês"]
}, "DO Lagoa", "DO_Lagoa.pdf");

APXF["pt-lagos"] = ado({
  lede: "The windswept western tip of the Algarve, from Lagos to Sagres and north into Aljezur on the Atlantic coast.",
  facts: [["Area", "Lagos, Vila do Bispo (Sagres, Raposeira), parts of Aljezur north to the Odeceixe stream"], ["Grapes", "Negra Mole, Castelão, Aragonez, Touriga Nacional, Alicante Bouschet, Bastardo, Monvedro, Cabernet Sauvignon; Arinto, Síria, Manteúdo, Perrum, Moscatel Graúdo"], ["Training", "Low, about 30 to 40 cm"]],
  place: "The coolest and windiest Algarve DO, exposed to the Atlantic on two sides; the Odeceixe stream marks its northern limit in Aljezur.",
  rules: AGRULE,
  glass: "Fresher reds and whites than the eastern Algarve, with saline lift.",
  exam: "Atlantic-exposed; Sagres; Odeceixe as northern limit.",
  producers: ["Monte da Casteleja"]
}, "DO Lagos", "DO_Lagos.pdf");

APXF["pt-portimao"] = ado({
  lede: "The smallest Algarve DO: Alvor and parts of Mexilhoeira Grande and Portimão, between Lagos and Lagoa.",
  facts: [["Area", "Parish of Alvor and parts of Mexilhoeira Grande and Portimão"], ["Grapes", "Negra Mole, Castelão, Trincadeira, Aragonez, Touriga Nacional, Syrah, Alicante Bouschet, Cabernet Sauvignon, Monvedro; Arinto, Síria, Manteúdo, Perrum, Rabo de Ovelha, Moscatel Graúdo"], ["Training", "Wire-trained bardo, about 0.5 to 1 m"]],
  place: "Coastal hills around the Arade estuary, between the Monchique range and the sea.",
  rules: AGRULE,
  glass: "Warm, soft reds and rounded whites.",
  exam: "Smallest Algarve DO; Alvor.",
  producers: []
}, "DO Portimão", "DO_Portimao.pdf");

APXF["pt-tavira"] = ado({
  lede: "The eastern Algarve, from Faro to the Guadiana: the driest, least windy and most sheltered of the four DOs.",
  facts: [["Area", "Faro, Olhão, parts of São Brás de Alportel, Tavira and Castro Marim"], ["Grapes", "Negra Mole, Castelão, Aragonez, Touriga Nacional, Syrah, Alicante Bouschet, Cabernet Sauvignon; Síria, Arinto, Diagalves, Manteúdo, Tamarez, Moscatel Graúdo"], ["Climate", "Less rain, little wind, smaller temperature range"]],
  place: "The caderno describes sandier soils at low elevation, without strong relief and sheltered from wind, with less rainfall and a smaller temperature range than the west.",
  rules: AGRULE,
  glass: "Ripe, soft reds; whites with exotic fruit.",
  exam: "Eastern Algarve; Faro to Castro Marim; Diagalves.",
  producers: []
}, "DO Tavira", "DO_Tavira.pdf");

APXF["pt-algarve"] = ag({
  lede: "The regional wine of the Algarve, used by most of the region's estates and covering the fortified and sparkling styles that the DOs exclude.",
  cat: "IG (IGP), Vinho Regional: wine, licoroso and sparkling", rec: "Vinho Regional; IG under EU rules",
  src: ["Caderno de especificações IG Algarve (IVV copy)", AGU+"IG_Algarve.pdf"], sources: [AGCVR], amended: AGAM,
  facts: [["Minimum alcohol", "Red 11.5%; licoroso 15.5%; sparkling 10%"], ["Natural alcohol", "10%"], ["Licoroso styles", "Dry amber whites with nutty aromas; sweet golden whites; red licoroso"], ["Area", "The whole Faro district"]],
  place: "Covers the whole southern coast and its hinterland, inside and outside the four DOs.",
  rules: "Freer than the DOs in grapes and yields. The licoroso category preserves the Algarve's old dry fortified white tradition, aged to an amber, nutty style.",
  glass: "From light rosé to international-style reds; dry fortified whites recall Sherry or old Madeira.",
  exam: "Algarve IGP; includes licoroso and sparkling.",
  producers: ["Quinta dos Vales", "Morgado do Quintão", "Adega do Cantor (Vida Nova)", "Adega de Lagoa"]
});
