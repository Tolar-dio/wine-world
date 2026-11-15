// Full encyclopedia entries: Douro Valley (Porto, Douro, Moscatel do Douro, the three subregions, Duriense). Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function dv(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const DVU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const DVIVDP=["Instituto dos Vinhos do Douro e do Porto (IVDP)","https://www.ivdp.pt/"];
const DVSTAT="Same demarcated area as Port: Decreto n.º 7934 of 1921 and the Douro statute, Decreto-Lei 173/2009";

APXF["pt-porto"] = dv({
  lede: "The world's most famous fortified wine: fermentation stopped with grape spirit to leave at least 17.5 g/L of sugar, from a schist valley demarcated in 1756, the first wine region in the world to have its boundaries and rules fixed by law.",
  cat: "DO (DOP), vinho licoroso (vinho generoso) only", rec: "Demarcated 1756; DO under the Douro statute (Decreto-Lei 173/2009)",
  src: ["Caderno de especificações DO Porto (IVV copy)", DVU+"DO_Porto.pdf"], sources: [DVIVDP],
  amended: "IVV copy published February 2026, citing IVDP Regulamento 242/2010 for categories",
  facts: [["Alcohol", "19 to 22% (light dry white Port from 16.5%); must at least 11% potential"], ["Residual sugar", "At least 17.5 g/L; extra-seco 17.5 to 40, seco 40 to 65, meio seco 65 to 85, doce 85 to 130, muito doce or lágrima over 130 g/L"], ["Colours", "Tinto (ruby and tawny styles), branco, rosé"], ["Fortifying spirit", "Aguardente vínica only, quantity fixed each year in the comunicado de vindima"], ["Yields", "55 hl/ha red and rosé; 65 hl/ha white, before the beneficio quota"], ["Planting density", "At least 4,000 vines/ha; terraces at least 3,000"], ["Subregions", "Baixo Corgo, Cima Corgo, Douro Superior"], ["Production and ageing", "Wine must be made in the demarcated region; ageing in Vila Nova de Gaia or the Douro"]],
  place: "The demarcated region covers about 250,000 ha of the Douro basin in north-east Portugal, of which roughly 43,000 ha is vineyard. The Marão and Montemuro ranges block the wet westerlies, so the valley is a rain shadow with very cold winters and very hot, dry summers; mean annual temperatures run from 11.8 to 16.5°C, warmest along the river and the lower side valleys. Port vineyards must be on schist, though granite patches occur. Every slope had to be built: pre-phylloxera socalcos on narrow stone walls (abandoned ones are the mortórios), post-phylloxera wider terraces at about 6,000 vines/ha, bulldozed earth patamares from the late 1960s at 3,000 to 3,500 vines/ha, and vinha ao alto planted straight up the slope at 4,500 to 5,000 vines/ha.",
  rules: "The caderno sets 19 to 22% alcohol, a minimum of 17.5 g/L sugar, maximum volatile acidity (0.39 g/L for wines up to five years old, 1.2 g/L for Old, 1.8 g/L for Very Old) and minimum total acidity. Fermentation is stopped with aguardente vínica that meets IVDP standards. How much each vineyard may turn into Port is set annually by the beneficio: every plot is scored A to F in the cadastro on altitude, yield, soil, gradient, aspect, variety, vine age and other factors, and the comunicado de vindima allocates the year's quota. Categories and ageing (Regulamento 242/2010) include Ruby, Reserve, Late Bottled Vintage, Vintage, Crusted, Tawny, Tawny with an indication of age (10, 20, 30, over 40 years), Colheita, White and Rosé. Vintage must be bottled in the second or third year after harvest and approved by the IVDP tasting chamber; LBV between the fourth and sixth year; Colheita after at least seven years in wood.",
  history: "In 1756 the Marquis of Pombal created the Companhia Geral da Agricultura das Vinhas do Alto Douro, which demarcated the region with granite posts (the marcos pombalinos, 1758 to 1761) and classified vineyards for export wine. English trade had grown since the 1703 Methuen Treaty, and the Gaia lodges still carry British names. Phylloxera arrived in 1862. Decreto n.º 7934 of 1921 fixed today's boundary, and the Alto Douro Wine Region became a UNESCO World Heritage cultural landscape in 2001.",
  glass: "Ruby styles keep the colour and blackberry, cherry and pepper of the Touriga Franca, Touriga Nacional, Tinta Roriz and Tinta Barroca blend; Vintage adds massive tannin and needs decades. Tawnies oxidise in old wooden casks to amber, with walnut, fig, orange peel and caramel; age-indicated tawnies are blends that show the style of a given age, while Colheita is a single year. White Port runs from light dry aperitif to very sweet lágrima.",
  exam: "1756 Pombal; beneficio and A to F cadastro; 19 to 22% (16.5% light dry white); 17.5 g/L sugar minimum; Vintage bottled in year two or three, LBV years four to six, Colheita minimum seven years in wood; age indications 10, 20, 30, over 40.",
  producers: ["Taylor's", "Fonseca", "Graham's", "Dow's", "Warre's", "Quinta do Noval", "Niepoort", "Ramos Pinto", "Ferreira", "Sandeman", "Croft", "Kopke", "Quinta do Vesuvio", "Cockburn's", "Real Companhia Velha"]
});

APXF["pt-douro"] = dv({
  lede: "The unfortified half of the Douro: dense, schist-grown reds from Touriga Nacional, Touriga Franca and old field blends, and high-altitude whites from Rabigato, Viosinho and Gouveio, made in the same terraced valley as Port.",
  cat: "DO (DOP): white, rosé and red wine, bottle-fermented sparkling, and Moscatel do Douro vinho licoroso", rec: "Region demarcated 1756; DO for unfortified wine under the Douro statute (Decreto-Lei 173/2009)",
  src: ["Caderno de especificações DO Douro (IVV copy, PDO-PT-A1539)", DVU+"DO_Douro.pdf"], sources: [DVIVDP],
  amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "White and rosé 10.5%, red 11%; 11.5% and 12% for wines of very good and high quality"], ["Yields", "55 hl/ha red and rosé; 65 hl/ha white"], ["Release", "Reds 6 months from 15 November (12 months from 1 October for higher grades); whites without wait (6 months for higher grades)"], ["Sparkling", "Second fermentation in bottle; at least 9 months on lees, Reserva 12 months; 11% before dosage"], ["Traditional terms", "Reserva, Colheita Tardia, Colheita Selecionada, Reserva Especial, Grande Reserva, Garrafeira, Vinho de missa"], ["Grapes", "About 115 permitted varieties, almost all native"], ["Area", DVSTAT]],
  place: "Same valley, climate and three subregions as Port. Table-wine growers look for what the Port beneficio rewards less: altitude, cooler north and east aspects, the granite edges of the region and old mixed plantings. Whites increasingly come from 500 to 700 m on the plateaus above the river, notably around Alijó, Murça and the Douro Superior uplands. Soils are mainly schist; the caderno distinguishes soils deeply reworked by terracing from those that keep their original profile.",
  rules: "The caderno sets two quality levels by alcohol and tasting score, with release dates tied to each. Yields are 55 hl/ha for red and 65 hl/ha for white. Vineyards must be low-trained on wires, at 4,000 vines/ha or 3,000 on terraces, with exemptions for vines planted before August 1998. Sparkling wine must use base wine fit for the DO and ferment a second time in bottle. Moscatel do Douro, a vinho licoroso, sits inside this DO (see its own entry).",
  history: "Unfortified Douro was long a by-product of Port. Ferreira's Barca Velha, first made in 1952 by Fernando Nicolau de Almeida, proved the valley could make long-lived table wine. A wave of quintas, the Douro Boys group among them, made Douro reds internationally known from the 1990s. The caderno notes that the region's mix of quality wines is why it needed rules for choosing which musts became which wine.",
  glass: "Reds are usually blends: black fruit, rockrose, violet from Touriga Nacional, floral lift from Touriga Franca, firm schist tannin, alcohol often 14% and above. Old field blends give more layered, savoury wines. Whites, often barrel-fermented, have citrus, white flower and a mineral, phenolic grip; rosés from light maceration are aromatic and soft.",
  exam: "Same area as Port; 55/65 hl/ha; minimum 11% red; Barca Velha 1952; whites from altitude; Moscatel do Douro is part of this DO.",
  producers: ["Casa Ferreirinha (Barca Velha)", "Quinta do Crasto", "Quinta do Vale Meão", "Niepoort", "Quinta do Vallado", "Quinta Vale Dona Maria", "Wine & Soul", "Alves de Sousa", "Prats & Symington (Chryseia)", "Quinta Nova", "Luis Seabra", "Mateus Nicolau de Almeida"]
});

APXF["pt-moscatel-do-douro"] = dv({
  lede: "A fortified Muscat from the high granite plateau of Favaios and Alijó, made only from Moscatel Galego Branco and sold young, as a vintage or as an aged blend up to over 40 years.",
  cat: "Vinho licoroso within DO Douro (DOP)", rec: "Part of DO Douro under Decreto-Lei 173/2009",
  src: ["Caderno de especificações DO Douro (IVV copy)", DVU+"DO_Douro.pdf"], sources: [DVIVDP],
  amended: "IVV copy published February 2026",
  facts: [["Grape", "Moscatel Galego Branco (Muscat Blanc à Petits Grains), obligatory"], ["Alcohol", "16.5 to 22%"], ["Sulphur", "Maximum 160 mg/L"], ["Age terms", "Reserva; 10, 20, 30 and over 40 years; vintage with at least 6 months in wood"], ["Fortification", "Aguardente vínica added to fermenting must; amount fixed in the annual comunicado de vindima"]],
  place: "Moscatel Galego does best on the cooler plateau north of Pinhão, around Favaios, Alijó and Sanfins do Douro, at 500 to 700 m, where granite meets schist. Nights are cooler than in the river valley, which keeps aroma and acidity in a grape that burns easily lower down.",
  rules: "The caderno makes Moscatel Galego Branco obligatory and allows only one traditional term per wine. Fortification stops fermentation at the sweetness the producer wants, by adding wine spirit to must drawn from the various pressings until alcohol reaches the legal range. Wines without age may be released at once; aged blends of several years are labelled 10, 20, 30 or over 40 years.",
  glass: "Young wines smell of orange blossom, grape and honey; aged ones turn amber with dried apricot, marmalade, nuts and a long, sweet, spirity finish.",
  exam: "Moscatel Galego Branco only; 16.5 to 22%; Favaios cooperative; ages 10 to over 40 years.",
  producers: ["Adega Cooperativa de Favaios", "Quinta da Avessada", "Poças", "Quinta do Portal"]
});

APXF["pt-baixo-corgo"] = dv({
  lede: "The western and wettest third of the Douro, from Mesão Frio and Régua to the Corgo river, where Atlantic air through the Marão gap gives the most productive vineyards and much of the region's ruby and young tawny Port.",
  cat: "Subregion of DO Porto and DO Douro", rec: "Area within the 1756 demarcation; defined in Decreto-Lei 173/2009",
  src: ["Caderno de especificações DO Porto (IVV copy)", DVU+"DO_Porto.pdf"], sources: [["Caderno de especificações DO Douro (IVV copy)", DVU+"DO_Douro.pdf"], DVIVDP],
  facts: [["Communes", "Mesão Frio, Peso da Régua, Santa Marta de Penaguião; parishes of Vila Real, Armamar, Lamego and Resende"], ["Area under vine", "About 14,000 ha"], ["Climate", "Coolest and wettest of the three subregions"], ["Wines", "Port, Douro DO, Moscatel do Douro, Duriense IG"]],
  place: "The Baixo Corgo runs from the western edge of the region to the Corgo tributary at Régua, on both banks. It sits closest to the Marão and Montemuro ranges, so it gets the most rain and the least heat of the valley. Soils are schist with granite patches, and slopes are often gentler, allowing patamares and vinha ao alto. Régua was the river port where Port casks were loaded onto rabelo boats.",
  rules: "There are no separate rules: Baixo Corgo vineyards follow the Port and Douro cadernos. In the beneficio its plots tend to score lower on the climate and yield factors, so the subregion supplies more DO Douro and lighter Port styles.",
  glass: "Fresher, lighter Port, often for ruby and young tawny blends; table wines with brighter acidity than those upriver.",
  exam: "Wettest and most productive subregion; Régua; boundary at the Corgo river.",
  producers: ["Quinta do Vallado", "Alves de Sousa (Quinta da Gaivosa)", "Quinta do Côtto", "Quinta da Pacheca"]
});

APXF["pt-cima-corgo"] = dv({
  lede: "The heart of Port: the schist amphitheatres around Pinhão and the Pinhão, Torto and Tua valleys, home to most of the great Vintage quintas.",
  cat: "Subregion of DO Porto and DO Douro", rec: "Core of the 1756 to 1761 demarcation; defined in Decreto-Lei 173/2009",
  src: ["Caderno de especificações DO Porto (IVV copy)", DVU+"DO_Porto.pdf"], sources: [["Caderno de especificações DO Douro (IVV copy)", DVU+"DO_Douro.pdf"], DVIVDP],
  facts: [["Communes", "Alijó, Murça (part), Sabrosa, São João da Pesqueira, Tabuaço, Carrazeda de Ansiães (part)"], ["Area under vine", "About 19,000 ha, the largest subregion"], ["Climate", "Hot and dry; more continental than the Baixo Corgo"], ["Wines", "Port, Douro DO, Moscatel do Douro, Duriense IG"]],
  place: "From the Corgo at Régua east to the Cachão da Valeira gorge near São João da Pesqueira. Hard, deep schist on steep slopes carries every era of terracing, from pre-phylloxera walls to modern vinha ao alto. South-facing slopes along the main river are the hottest; the side valleys of the Pinhão, Torto and Tua give cooler, later sites. The Favaios and Alijó plateau above is the home of Moscatel do Douro.",
  rules: "No separate rules beyond the Port and Douro cadernos. Its vineyards dominate the A and B grades of the cadastro, so the beneficio quota per hectare is highest here.",
  glass: "The benchmark Vintage Port: concentrated, structured, violet and black fruit with ageing over decades. Douro reds are ripe and powerful.",
  exam: "Pinhão; Vintage quintas; largest subregion; Cachão da Valeira as the old upstream limit of navigation.",
  producers: ["Quinta do Noval", "Graham's (Quinta dos Malvedos)", "Taylor's", "Fonseca", "Dow's", "Warre's", "Croft (Quinta da Roêda)", "Quinta do Crasto", "Quinta de la Rosa", "Quinta Vale Dona Maria", "Wine & Soul", "Niepoort"]
});

APXF["pt-douro-superior"] = dv({
  lede: "The hot, dry, continental east of the Douro, from the Cachão da Valeira to the Spanish border, once beyond the reach of river boats and now the source of some of the valley's most powerful Port and red wine.",
  cat: "Subregion of DO Porto and DO Douro", rec: "Added progressively; boundary fixed by Decreto n.º 7934 (1921); defined in Decreto-Lei 173/2009",
  src: ["Caderno de especificações DO Porto (IVV copy)", DVU+"DO_Porto.pdf"], sources: [["Caderno de especificações DO Douro (IVV copy)", DVU+"DO_Douro.pdf"], DVIVDP],
  facts: [["Communes", "Vila Nova de Foz Côa, Torre de Moncorvo, Vila Flor, Freixo de Espada à Cinta, Meda (part), Figueira de Castelo Rodrigo (Escalhão), named estates in Mirandela"], ["Area under vine", "About 8,700 ha"], ["Climate", "Driest and hottest; widest temperature range, greatest at Barca d'Alva"], ["Wines", "Port, Douro DO, Duriense IG"]],
  place: "The Douro Superior has the largest share of unplanted land. Flatter ground on some sites allows mechanised vineyards, though Vargellas and Vesuvio are classic steep quintas. The caderno notes the widest daily and annual temperature swings at Barca d'Alva, the farthest point from the sea. The Côa joins the Douro here; its valley holds Palaeolithic rock art.",
  rules: "No separate rules. The Mirandela estates of Clemente Meneres and D. Maria Angélica de Sousa Pinto Barroso are included by name, a sign of how the boundary was drawn around existing quintas.",
  glass: "Ripe, dense, high-alcohol reds and Ports with dark fruit and baked earth; higher sites and the Côa valley give fresher whites.",
  exam: "Most continental; Barca d'Alva; Foz Côa; Vargellas, Vesuvio, Vale Meão, Ervamoira.",
  producers: ["Taylor's (Quinta de Vargellas)", "Quinta do Vesuvio", "Quinta do Vale Meão", "Casa Ferreirinha (Quinta da Leda)", "Ramos Pinto (Quinta da Ervamoira)", "Cockburn's (Quinta dos Canais)"]
});

APXF["pt-duriense"] = dv({
  lede: "The regional wine of the Douro: the same terraced valley as Port and DO Douro, with lower alcohol minimums and room for varieties and styles outside the DO.",
  cat: "IG (IGP), Vinho Regional: wine and bottle-fermented sparkling", rec: "Under the Douro statute, Decreto-Lei 173/2009",
  src: ["Caderno de especificações IG Duriense (IVV copy)", DVU+"IG_Duriense.pdf"], sources: [DVIVDP],
  amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "10% (10.5% for wines of very good quality)"], ["Sparkling", "11% before dosage; second fermentation in bottle"], ["Traditional terms", "Vinho Regional; Reserva; Reserva Velha (Grande Reserva)"], ["Area", DVSTAT], ["Control", "IVDP tasting chamber"]],
  place: "Identical to the DO area, across the Baixo Corgo, Cima Corgo and Douro Superior.",
  rules: "Vineyards must meet the same training and density rules as the DO, but alcohol minimums are lower and the grape list is broader. Producers use Duriense for wines that fall outside DO rules, for international varieties, or for declassified lots.",
  glass: "From simple fruity reds and whites to ambitious wines from producers who prefer its freedom.",
  exam: "Douro IGP name is Duriense; minimum 10%; controlled by the IVDP.",
  producers: ["Casa de Mateus (Sogrape)", "Douro cooperatives"]
});
