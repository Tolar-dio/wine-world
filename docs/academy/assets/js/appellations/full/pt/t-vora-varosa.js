// Full encyclopedia entries: Távora-Varosa DO and IG Terras de Cister. Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function tv(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const TVU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const TVCVR=["Comissão Vitivinícola Regional Távora-Varosa","https://www.cvrtavoravarosa.pt/"];
const TVAM="IVV copy published February 2026";
const TVPLACE="A small, high region between the Paiva and Távora rivers at the foot of the Serra da Nave, just south of the Douro around Lamego, Tarouca and Moimenta da Beira. Vines sit at 500 to 800 m, mostly facing south, on poor, acidic granite soils with some schist. The climate is temperate continental and dry, with very cold, damp winters and fog rising from the Távora valley. Cool nights and high acidity make it Portugal's leading region for traditional-method sparkling wine.";

APXF["pt-tavora-varosa"] = tv({
  lede: "Portugal's sparkling-wine heartland, on granite at 500 to 800 m between Lamego and Moimenta da Beira, where Cistercian monks founded the first monastery of their order in Iberia.",
  cat: "DO (DOP): white, red and rosé wine; white, red and rosé traditional-method sparkling", rec: "First demarcated as Varosa; now DO Távora-Varosa",
  src: ["Caderno de especificações DO Távora-Varosa (IVV copy)", TVU+"DO_Tavora-Varosa.pdf"], sources: [TVCVR], amended: TVAM,
  facts: [["Area", "Parishes of Armamar, Lamego (outside the Douro), Moimenta da Beira, Penedono, São João da Pesqueira (part), Sernancelhe, Tabuaço (part) and Tarouca"], ["Altitude", "500 to 800 m"], ["Minimum alcohol", "Red 11.5%; sparkling 11%"], ["Natural alcohol", "Red 10.5%; white, rosé and sparkling base 10%"], ["Sparkling", "Traditional method; at least 9 months in bottle before dosage; 5 to 7 bar"], ["Yields", "Red 80 hl/ha; white and rosé 90 hl/ha"], ["Grapes", "Malvasia Fina, Gouveio, Cercial, Bical, Arinto, Chardonnay, Pinot Blanc, Pinot Gris; Pinot Noir, Touriga Nacional, Touriga Franca, Aragonez, Tinta Barroca and others"]],
  place: TVPLACE,
  rules: "Sparkling wine must be traditional method with at least nine months in bottle before the expedition liqueur. Native and French varieties, including Chardonnay and the Pinots, are permitted.",
  history: "The caderno records proto-historic settlement, then Romans, Suevi and Visigoths, and the Cistercians, who built the monastery of São João de Tarouca in the twelfth century, the first of their order in the Iberian Peninsula, along with Salzedas. Raposeira and Murganheira made Lamego the centre of Portuguese sparkling wine in the twentieth century.",
  glass: "Crisp, fine sparkling wines with citrus, green apple and brioche from lees age, and good longevity; still whites are fresh, reds light.",
  exam: "Sparkling focus; Lamego; Murganheira and Raposeira; São João de Tarouca; 500 to 800 m.",
  producers: ["Murganheira", "Raposeira", "Cooperativa Agrícola do Távora"]
});

APXF["pt-terras-de-cister"] = tv({
  lede: "The regional wine of the Távora-Varosa area, a traditional name honouring the Cistercian monks who planted the first vines here.",
  cat: "IG (IGP), Vinho Regional (traditional name)", rec: "Vinho Regional; IG under EU rules",
  src: ["Caderno de especificações IG Terras de Cister (IVV copy)", TVU+"IG_Terras-de-Cister.pdf"], sources: [TVCVR], amended: TVAM,
  facts: [["Area", "Parts of Armamar, Lamego, Moimenta da Beira and others, and the whole of Tarouca (Viseu district)"], ["Yield", "120 hl/ha"], ["Soils", "Granite and schist lithosols; acidic transition soils"]],
  place: TVPLACE,
  rules: "Higher yields and wider grape choice than the DO; vineyards low-trained as gobelet or cordon.",
  glass: "Fresh whites, light reds and sparkling base wines.",
  exam: "Terras de Cister is a traditional name used as an IGP.",
  producers: []
});
