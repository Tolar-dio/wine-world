// Full encyclopedia entries: Madeira (DO Madeira, DO Madeirense, IG Terras Madeirenses). Written from the IVV copies of the IVBAM cadernos de especificações and Portaria 40/2015, checked 14 November 2026.
function ma(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const MAU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const MAIVBAM=["Instituto do Vinho, do Bordado e do Artesanato da Madeira (IVBAM)","https://ivbam.gov-madeira.pt/"];
const MAPORT=["Portaria 40/2015 and related regional rules (Jornal Oficial da Madeira, IVV copy)",MAU+"Alteracao-ao-Caderno-de-Especificacoes-da-DOP-Madeira-Madeirense-e-IGP-Terras-Madeirenses-1.pdf"];
const MAPLACE="Madeira lies in the Atlantic between 30° and 33° N, 978 km south-west of Lisbon and about 700 km from Africa, almost level with Casablanca. The Região Demarcada covers Madeira island (740.7 km²) and Porto Santo (42.5 km²). Vines grow on poios, narrow terraces cut into very steep volcanic slopes, mostly on pergolas (latada) that keep grapes off the humid ground, with some vertical trellis; nearly all work is by hand. Altitude and aspect create sharp microclimates: the warmer south coast around Câmara de Lobos and the cooler, wetter north around São Vicente and Seixal.";

APXF["pt-madeira"] = ma({
  lede: "The most indestructible wine on earth: fortified, then deliberately heated and oxidised, so that a century-old bottle can still be opened and kept for months. Four noble grapes mark the sweetness scale, from dry Sercial to rich Malvasia, while Tinta Negra makes most of the volume.",
  cat: "DO (DOP), vinho licoroso (vinho generoso); also wine vinegar", rec: "Regulated 1913; current recognition Portaria 40/2015; Decreto Regulamentar Regional 16/2002/M",
  src: ["Caderno de especificações DOP Madeira (IVBAM, IVV copy)", MAU+"DO_Madeira.pdf"], sources: [MAPORT, MAIVBAM], amended: "IVBAM caderno of March 2012 with 2015 regional rules",
  facts: [["Alcohol", "17 to 22% (exceptionally 15.5% for export with IVBAM approval)"], ["Sweetness by Baumé", "Sercial/seco under 1.5; Verdelho/meio-seco 1 to 2.5; Boal/meio-doce 2.5 to 3.5; Malvasia/doce over 3.5; Rainwater 1 to 2.5"], ["Fortification", "Neutral grape spirit of at least 96%, during or after fermentation"], ["Canteiro", "At least 2 consecutive years in wood; sale 36 months after fortification"], ["Estufagem", "Heated to no more than 50°C for at least 90 days; sale at least 12 months later and not before 31 October of the second year after harvest"], ["Yield", "80 hl of must per hectare"], ["Natural alcohol", "At least 9%"], ["Ages", "5, 10, 15, 20, 30, over 40 years; Colheita; Frasqueira (Garrafeira)"], ["Grapes", "Sercial, Verdelho, Boal (Malvasia Fina), Malvasia (Malvasia Cândida, Malvasia de São Jorge and others), Terrantez, Bastardo; Tinta Negra"]],
  place: MAPLACE,
  rules: "Two ageing routes. Canteiro wines rest in cask, often in warm lofts, for at least two years and may be sold only 36 months after fortification. Estufagem wines are heated in tanks to no more than 50°C for at least 90 days, then rested. The noble-variety names, when used, also signal sweetness: Sercial dry, Verdelho medium-dry, Boal medium-sweet, Malvasia sweet. Age-indicated wines are blends showing the character of that age; Colheita is a single vintage aged at least five years, and Frasqueira a single-vintage wine of exceptional quality aged at least 20 years in wood. Rainwater is a light, medium-dry traditional style.",
  history: "Madeira was discovered in 1419 and settled soon after, and wine soon became its main export. Casks carried as ballast through the tropics came back improved, giving rise to vinho da roda and, later, the estufa and canteiro methods that imitate the voyage. The wine was the drink of colonial America; the caderno cites Decreto 218 of 1913 and the 1934 law among its legal foundations. Oidium in 1852 and phylloxera from 1872 wiped out many noble vines, and Tinta Negra replaced them. IVBAM now controls production.",
  glass: "Amber to mahogany, with searing acidity that balances even the sweetest styles. Sercial: almonds, citrus peel, salt. Verdelho: smoke, dried fruit, tangy. Boal: caramel, raisin, coffee. Malvasia: toffee, figs, marmalade. Old wines add rancio, walnut, iodine and an endless finish.",
  exam: "Canteiro vs estufagem (50°C, 90 days); Sercial, Verdelho, Boal, Malvasia sweetness ladder; Tinta Negra; Colheita 5 years; Frasqueira 20 years; 17 to 22%.",
  producers: ["Blandy's (Madeira Wine Company)", "Cossart Gordon", "Henriques & Henriques", "Barbeito", "Justino's", "Pereira d'Oliveira (D'Oliveiras)", "H.M. Borges", "J. Faria & Filhos"]
});

APXF["pt-madeirense"] = ma({
  lede: "Madeira's DO for unfortified wine: fresh, saline whites, often from Verdelho and Sercial, and reds from Tinta Negra and others, grown on the same terraces as the fortified wine.",
  cat: "DO (DOP): white, red and rosé wine, sparkling, quality sparkling; also wine brandy and vinegar", rec: "Portaria 40/2015 (regional recognition)",
  src: ["Caderno de especificações DOP Madeirense (IVV copy)", MAU+"DO_Madeirense.pdf"], sources: [MAPORT, MAIVBAM], amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "White and rosé 10.5%; red 11.5%"], ["Natural alcohol", "10%"], ["Red ageing", "At least 6 months before sale, usually in barrel"], ["Yields", "Red 90 hl/ha; white and rosé 100 hl/ha"], ["Area", "Madeira and Porto Santo"], ["Grapes", "Verdelho, Sercial, Malvasia Fina, Malvasia Cândida, Arnsburger, Malvasia de São Jorge; Tinta Negra, Touriga Franca, Bastardo, Merlot and others"], ["Training", "Pergola (latada) and vertical trellis"]],
  place: MAPLACE + " Porto Santo, low and dry with sandy soils, makes distinctive Caracol-based whites.",
  rules: "Grapes must be grown in the region; harvest is by hand. Unlike DO Madeira, these wines are not fortified.",
  glass: "Crisp, saline whites with citrus and volcanic minerality; light, fresh reds.",
  exam: "Unfortified Madeira DO; 6 months for reds; Porto Santo included.",
  producers: ["Barbeito", "Blandy's (Atlantis)", "Quinta do Barbusano"]
});

APXF["pt-terras-madeirenses"] = ma({
  lede: "The regional wine of Madeira and Porto Santo, for unfortified wines with broader grape choice than the Madeirense DO.",
  cat: "IG (IGP), Vinho Regional: wine, sparkling; also wine brandy and vinegar", rec: "Portaria 40/2015 (regional recognition)",
  src: ["Caderno de especificações IGP Terras Madeirenses (IVV copy)", MAU+"IG_Terras-Madeirenses.pdf"], sources: [MAPORT, MAIVBAM], amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "10%; natural 10%"], ["Red ageing", "At least 4 months (none for carbonic maceration)"], ["Yields", "Red 90 hl/ha; white and rosé 100 hl/ha"], ["Area", "Madeira and Porto Santo"]],
  place: MAPLACE,
  rules: "Lower alcohol and shorter red ageing than the DO; the grape list includes Arinto and international varieties.",
  glass: "Light, fresh whites and reds for local drinking.",
  exam: "Madeira IGP; 4 months for reds.",
  producers: []
});
