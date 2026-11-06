// ===== DATA: shopping guide, label lab, matching =====
// Shopping guide for the Tasting Night planner: [what to ask for, example bottles, typical US price]
const BUY = {
alb:["Albariño from Rías Baixas, recent vintage, no oak","Martín Códax, Pazo de Señoráns, Do Ferreiro","$15-30"],
chab:["Chablis (village or Premier Cru), unoaked","William Fèvre, Domaine Laroche, Jean-Marc Brocard","$25-45"],
cdb:["Meursault or a Côte de Beaune white (oaked Chardonnay)","Louis Jadot, Joseph Drouhin, Bouchard Père & Fils","$40-80"],
calch:["Napa or Sonoma Chardonnay, rich and oaky","Rombauer, Cakebread, La Crema","$22-50"],
vouv:["Vouvray Demi-Sec (off-dry Chenin Blanc)","Domaine Huet, Champalou, Vincent Carême","$22-45"],
gewz:["Alsace Gewurztraminer","Trimbach, Hugel, Zind-Humbrecht","$20-40"],
pgrig:["Pinot Grigio from Alto Adige or Friuli","Alois Lageder, Elena Walch, Jermann","$15-28"],
rkab:["Mosel Riesling Kabinett","Dr. Loosen, J.J. Prüm, Selbach-Oster","$20-35"],
sanc:["Sancerre or Pouilly-Fumé (white)","Pascal Jolivet, Henri Bourgeois, Lucien Crochet","$25-45"],
nzsb:["Marlborough Sauvignon Blanc","Cloudy Bay, Dog Point, Kim Crawford","$15-35"],
torr:["Torrontés from Salta","Susana Balbo Crios, Colomé, El Esteco","$12-20"],
chin:["Chinon or Bourgueil (Cabernet Franc)","Charles Joguet, Bernard Baudry, Olga Raffault","$20-35"],
hmed:["Haut-Médoc or Pauillac/Saint-Julien red, 6-12 years old","Château Sociando-Mallet, Château Lanessan, a classed-growth second wine","$30-70"],
napcab:["Napa Valley Cabernet Sauvignon","Louis M. Martini Napa, Frank Family, Stag's Leap Wine Cellars Artemis","$40-70"],
beauj:["A Beaujolais cru (Morgon, Fleurie, Moulin-à-Vent)","Marcel Lapierre, Jean Foillard, Château Thivin","$20-35"],
cdp:["Châteauneuf-du-Pape or Gigondas red","Vieux Télégraphe, Château de Saint Cosme, Domaine Santa Duc","$35-70"],
malb:["Mendoza Malbec","Catena, Achaval-Ferrer, Zuccardi","$15-30"],
pom:["Pomerol, Lalande-de-Pomerol or Saint-Émilion Grand Cru","Christian Moueix Pomerol, a Saint-Émilion Grand Cru from a good shop","$35-70"],
napmer:["Napa or Sonoma Merlot","Duckhorn, Markham, Rombauer","$25-60"],
barolo:["Barolo or Barbaresco, 6-10 years old if possible","G.D. Vajra, Produttori del Barbaresco, Fontanafredda","$40-70"],
bourg:["Red Burgundy, village level from the Côte de Nuits or Côte de Beaune","Joseph Drouhin, Louis Jadot, Faiveley","$40-80"],
wpn:["Willamette Valley Pinot Noir","Domaine Drouhin Oregon, Eyrie, Bergström, A to Z","$22-50"],
capn:["Sonoma Coast, Carneros or Santa Barbara Pinot Noir","La Crema Sonoma Coast, Au Bon Climat, Sanford","$22-45"],
sang:["Chianti Classico Riserva or Brunello di Montalcino","Fontodi, Fèlsina, Castello di Ama; Col d'Orcia for Brunello","$30-75"],
nrh:["Crozes-Hermitage, Saint-Joseph or Côte-Rôtie","Alain Graillot, E. Guigal, Domaine Combier","$25-80"],
shz:["Barossa or McLaren Vale Shiraz","Torbreck Woodcutter's, Penfolds Bin 28, d'Arenberg","$20-40"],
rioja:["Rioja Reserva or Gran Reserva (traditional style)","La Rioja Alta Viña Ardanza, CVNE Imperial, Muga, López de Heredia","$25-60"],
zin:["Sonoma or Napa Zinfandel","Ridge, Seghesio, Turley","$25-45"],
cond:["Condrieu (Viognier)","E. Guigal, Yves Cuilleron, Georges Vernay","$55-90"],
gruv:["Wachau or Kamptal Grüner Veltliner (Smaragd or Erste Lage)","Domäne Wachau, Hirsch, Bründlmayer","$20-55"],
clare:["Dry Riesling from Clare or Eden Valley","Pewsey Vale, Jim Barry Watervale, Grosset","$15-45"],
assy:["Santorini Assyrtiko","Domaine Sigalas, Gaia Thalassitis, Santo Wines","$25-45"],
hunt:["Hunter Valley Sémillon, ideally 8+ years old","Tyrrell's, Brokenwood, Mount Pleasant","$25-70"],
amar:["Amarone della Valpolicella","Masi Costasera, Tommasi, Allegrini","$45-75"],
menc:["Bierzo or Ribeira Sacra Mencía","Descendientes de J. Palacios Pétalos, Raúl Pérez, Guímaro","$20-40"],
taur:["Taurasi (Aglianico)","Mastroberardino Radici, Feudi di San Gregorio","$40-65"]
};

// Label lab: fictional producers, real label conventions. style drives the label design.
const LABELS = [
{style:"burg",top:"Domaine Valcourt",name:"Chambertin",sub:"Grand Cru",ap:"Appellation Chambertin Grand Cru Contrôlée",yr:"2018",foot:"Mis en bouteille au domaine · 13% vol · 750 ml",qs:[
["Which grape is in the bottle?","Pinot Noir",["Chardonnay","Gamay","Syrah"],"Red Côte de Nuits Grand Cru: Pinot Noir."],
["Which village is this Grand Cru in?","Gevrey-Chambertin",["Vosne-Romanée","Chambolle-Musigny","Nuits-Saint-Georges"],"Gevrey has nine Chambertin Grand Crus."],
["Why is no village named on the label?","Grand Crus are labeled with the vineyard name alone",["It's a generic Bourgogne","The producer forgot","It's a négociant wine"],"The smaller the name, the higher the level."]]},
{style:"burg",top:"Maison Arnaud-Delorme",name:"Puligny-Montrachet",sub:"1er Cru · Les Pucelles",ap:"Appellation Puligny-Montrachet 1er Cru Contrôlée",yr:"2020",foot:"Négociant-éleveur à Beaune · 13.5% vol",qs:[
["Grape?","Chardonnay",["Pinot Noir","Aligoté","Sauvignon Blanc"],"Puligny is white Burgundy country."],
["Quality level?","Premier Cru",["Grand Cru","Village","Regional"],"Village + vineyard + 1er Cru."],
["'Négociant-éleveur' means the company:","Buys grapes or wine and raises it before bottling",["Owns all its vineyards","Is a cooperative","Only distributes"],"Common in Beaune."]]},
{style:"bdx",top:"Château Lune-Belair",name:"Saint-Émilion Grand Cru",sub:"Grand Vin",ap:"Appellation Saint-Émilion Grand Cru Contrôlée",yr:"2016",foot:"Mis en bouteille au château · 14% vol",qs:[
["Main grape you'd expect?","Merlot",["Cabernet Sauvignon","Malbec","Syrah"],"Right Bank: Merlot with Cabernet Franc."],
["'Saint-Émilion Grand Cru' on this label is:","An appellation, not the classification",["The top Premier Grand Cru Classé A","An 1855 growth","A Burgundy-style vineyard rank"],"Many wines carry the AOC; few are classified."],
["'Mis en bouteille au château' means:","Estate bottled",["Aged in new oak","Old vines","Organic"],"Bottled where it was made."]]},
{style:"de",top:"Weingut Steinhof",name:"Wehlener Sonnenuhr",sub:"Riesling Spätlese",ap:"Mosel · Qualitätswein mit Prädikat",yr:"2021",foot:"Gutsabfüllung · A.P.Nr. 2 576 041 12 22 · 8% vol",qs:[
["'Wehlener Sonnenuhr' means:","The Sonnenuhr vineyard in the village of Wehlen",["A grape variety","A sweetness level","The producer's name"],"Village + 'er' + vineyard."],
["8% alcohol and Spätlese suggest the wine is:","Noticeably sweet (fruity style)",["Bone dry","Fortified","Sparkling"],"Low alcohol means unfermented sugar remains."],
["The A.P.Nr. shows the wine:","Passed official testing",["Is organic","Is a Grosses Gewächs","Was late disgorged"],"Amtliche Prüfungsnummer."]]},
{style:"de",top:"Weingut Kranich",name:"Kirchenberg",sub:"Riesling · Grosses Gewächs",ap:"Pfalz · VDP.Grosse Lage",yr:"2020",foot:"Trocken · 13% vol",qs:[
["Grosses Gewächs means:","A dry wine from a VDP Grosse Lage",["A sweet Auslese","A generic blend","Ice wine"],"GG is always dry."],
["Pfalz Riesling is typically, compared with Mosel:","Fuller and riper",["Lighter and sweeter","Always sparkling","Red"],"Warmer, drier region."]]},
{style:"it",top:"Tenuta Collealto",name:"Barbaresco",sub:"Riserva",ap:"Denominazione di Origine Controllata e Garantita",yr:"2016",foot:"Imbottigliato all'origine · 14% vol",qs:[
["Grape?","Nebbiolo",["Barbera","Dolcetto","Sangiovese"],"Barbaresco is 100% Nebbiolo."],
["Minimum aging for Barbaresco Riserva:","50 months",["26 months","38 months","62 months"],"Barolo Riserva is 62."],
["Which region?","Piedmont",["Tuscany","Veneto","Lombardy"],"Langhe hills near Alba."]]},
{style:"it",top:"Castello di Rocca Nera",name:"Chianti Classico",sub:"Gran Selezione",ap:"Denominazione di Origine Controllata e Garantita",yr:"2019",foot:"Gallo Nero seal · 14.5% vol",qs:[
["Gran Selezione requires:","Estate-grown grapes and the longest aging",["Botrytis","White grapes","Carbonic maceration"],"Top tier since 2014."],
["Main grape?","Sangiovese",["Cabernet Sauvignon","Montepulciano","Merlot"],"At least 90% for Gran Selezione."]]},
{style:"it",top:"Fattoria del Grifone",name:"Il Grifone",sub:"Toscana",ap:"Indicazione Geografica Tipica",yr:"2019",foot:"Cabernet Sauvignon · Merlot · Sangiovese",qs:[
["IGT means:","A regional PGI wine with flexible rules",["Italy's top DOCG tier","Table wine with no place","A sweet wine"],"Home of many Super Tuscans."],
["Why might a top producer choose IGT?","To use grapes or methods outside DOC rules",["It's required for Cabernet","For lower taxes","To avoid aging"],"The Super Tuscan story."]]},
{style:"es",top:"Bodegas Arandilla",name:"Rioja",sub:"Gran Reserva",ap:"Denominación de Origen Calificada",yr:"2015",foot:"Embotellado en origen · 14% vol",qs:[
["Minimum aging for red Rioja Gran Reserva:","60 months: 24 in oak, 24 in bottle",["24 months","36 months","12 months"],"Blue back-label seal."],
["Most likely main grape?","Tempranillo",["Garnacha Blanca","Monastrell","Bobal"],"With Garnacha, Graciano, Mazuelo."]]},
{style:"ch",top:"Champagne",name:"Lemoine-Fils",sub:"Blanc de Blancs · Grand Cru",ap:"Avize · Extra Brut",yr:"NV",foot:"RM-51234-001 · Dégorgé en mars 2024 · Dosage 3 g/l",qs:[
["'RM' tells you:","A grower made it from their own grapes",["It's from a big house","It's a cooperative","It's a buyer's brand"],"Récoltant-manipulant."],
["Blanc de Blancs here is almost certainly:","Chardonnay",["Pinot Noir","Meunier","Pinot Gris"],"Avize is in the Côte des Blancs."],
["Extra Brut means:","Very dry (0-6 g/L)",["Sweeter than Brut","Medium-sweet","Rosé"],"Here 3 g/L."]]},
{style:"pt",top:"Quinta do Vale Escuro",name:"Vintage Port",sub:"2017",ap:"Porto · Denominação de Origem Controlada",yr:"2017",foot:"Bottled 2019 · Unfiltered · 20% vol",qs:[
["How should you serve it?","Stand upright, decant off the sediment",["Chill to 40°F","Serve straight from the bottle","Add tonic"],"Vintage Port throws a heavy crust."],
["Vintage Port is bottled after about:","2 years",["6 years","20 years","3 months"],"Then ages in bottle for decades."]]},
{style:"hu",top:"Szőlőbirtok Hegyalja",name:"Tokaji Aszú",sub:"6 Puttonyos",ap:"Tokaj · Oltalom alatt álló eredetmegjelölés",yr:"2017",foot:"Furmint · Hárslevelű · 11% vol",qs:[
["What makes this wine sweet?","Botrytized aszú berries",["Freezing","Fortification","Added sugar"],"Noble rot."],
["Since 2013, Aszú must have at least:","120 g/L residual sugar",["45 g/L","200 g/L","450 g/L"],"Equal to the old 5 puttonyos."]]},
{style:"fr",top:"Domaine Kessler",name:"Gewurztraminer",sub:"Vendanges Tardives",ap:"Alsace Grand Cru Brand",yr:"2018",foot:"Bouteille flûte · 13% vol",qs:[
["Vendanges Tardives means:","Late harvest, typically sweet",["Botrytized selection of berries","Dry","Sparkling"],"SGN is the botrytis tier."],
["Which grapes may make Alsace Grand Cru (generally)?","Riesling, Gewurztraminer, Pinot Gris, Muscat",["Any grape","Pinot Noir only","Sylvaner only"],"With a few exceptions."]]},
{style:"es",top:"Bodega La Marisma",name:"Manzanilla",sub:"En Rama",ap:"D.O. Manzanilla-Sanlúcar de Barrameda",yr:"Saca de primavera",foot:"15% vol · Palomino",qs:[
["Where must Manzanilla be aged?","Sanlúcar de Barrameda",["Jerez de la Frontera","Montilla","Málaga"],"Thick flor from sea humidity."],
["'En rama' means:","Bottled with minimal filtration",["Sweetened","Aged 30 years","Sparkling"],"Closer to the cask."],
["How should you treat an opened bottle?","Like white wine: refrigerate and finish within days",["Keep for months","Store warm","Decant for hours"],"Biological Sherries are fragile."]]},
{style:"us",top:"Ridgecrest Cellars",name:"Cabernet Sauvignon",sub:"Oakville · Napa Valley",ap:"Estate Bottled",yr:"2019",foot:"Alc. 14.8% by vol.",qs:[
["Minimum Cabernet Sauvignon by US federal law:","75%",["85%","95%","100%"],"Oregon's rule for most grapes is 90%."],
["Minimum grapes from the Oakville AVA:","85%",["75%","95%","100%"],"And 95% from the 2019 vintage."]]},
{style:"fr",top:"Domaine de la Tuffière",name:"Vouvray",sub:"Demi-Sec",ap:"Appellation Vouvray Contrôlée",yr:"2019",foot:"Loire · 12% vol",qs:[
["Grape?","Chenin Blanc",["Sauvignon Blanc","Melon de Bourgogne","Chardonnay"],"Touraine."],
["Demi-Sec here means:","Off-dry to medium-sweet",["Bone dry","Sparkling","Fortified"],"Vouvray ranges from sec to moelleux."]]},
{style:"at",top:"Weingut Donaublick",name:"Grüner Veltliner",sub:"Smaragd",ap:"Wachau · Ried Achleiten",yr:"2021",foot:"13.5% vol · Österreich",qs:[
["Smaragd means the wine has at least:","12.5% alcohol",["11.5%","10%","15%"],"Vinea Wachau category."],
["'Ried' on an Austrian label means:","A single vineyard",["Reserve","Dry","Late harvest"],"Riedenwein tier."]]}
];

// CMS-style matching: [appellation, grape, country]
const MATCH = [
["Valpolicella","Corvina","Italy"],["Bandol","Mourvèdre","France"],["Tokaj","Furmint","Hungary"],["Gigondas","Grenache","France"],["Barolo","Nebbiolo","Italy"],
["Taurasi","Aglianico","Italy"],["Soave","Garganega","Italy"],["Gavi","Cortese","Italy"],["Brunello di Montalcino","Sangiovese","Italy"],["Cerasuolo di Vittoria","Nero d'Avola","Italy"],
["Rías Baixas","Albariño","Spain"],["Rueda","Verdejo","Spain"],["Bierzo","Mencía","Spain"],["Toro","Tinta de Toro","Spain"],["Jumilla","Monastrell","Spain"],
["Utiel-Requena","Bobal","Spain"],["Valdeorras","Godello","Spain"],["Priorat","Garnacha","Spain"],["Naoussa","Xinomavro","Greece"],["Nemea","Agiorgitiko","Greece"],
["Santorini","Assyrtiko","Greece"],["Muscadet","Melon de Bourgogne","France"],["Savennières","Chenin Blanc","France"],["Chinon","Cabernet Franc","France"],["Cahors","Malbec","France"],
["Madiran","Tannat","France"],["Condrieu","Viognier","France"],["Cornas","Syrah","France"],["Beaujolais","Gamay","France"],["Jurançon","Petit Manseng","France"],
["Château-Chalon","Savagnin","France"],["Wachau","Grüner Veltliner","Austria"],["Mittelburgenland","Blaufränkisch","Austria"],["Vaud","Chasselas","Switzerland"],["Kakheti","Saperavi","Georgia"],
["Dingač","Plavac Mali","Croatia"],["Bairrada","Baga","Portugal"],["Dão","Touriga Nacional","Portugal"],["Vinho Verde","Loureiro","Portugal"],["Franken","Silvaner","Germany"],
["Mosel","Riesling","Germany"],["Ahr","Spätburgunder","Germany"],["Montefalco","Sagrantino","Italy"],["Etna","Nerello Mascalese","Italy"],["Prosecco","Glera","Italy"],
["Lugana","Turbiana","Italy"],["Vermentino di Gallura","Vermentino","Italy"],["Walker Bay","Pinot Noir","South Africa"],["Swartland","Chenin Blanc","South Africa"],["Stellenbosch","Pinotage","South Africa"],
["Marlborough","Sauvignon Blanc","New Zealand"],["Central Otago","Pinot Noir","New Zealand"],["Hawke's Bay","Syrah","New Zealand"],["Coonawarra","Cabernet Sauvignon","Australia"],["Clare Valley","Riesling","Australia"],
["Hunter Valley","Sémillon","Australia"],["Barossa Valley","Shiraz","Australia"],["McLaren Vale","Grenache","Australia"],["Salta","Torrontés","Argentina"],["Mendoza","Malbec","Argentina"],
["Colchagua","Carmenère","Chile"],["Maipo","Cabernet Sauvignon","Chile"],["Canelones","Tannat","Uruguay"],["Yamanashi","Koshu","Japan"],["Willamette Valley","Pinot Noir","USA"],
["Ribbon Ridge","Pinot Noir","USA"],["Dry Creek Valley","Zinfandel","USA"],["Finger Lakes","Riesling","USA"],["Red Mountain","Cabernet Sauvignon","USA"],["Niagara Peninsula","Vidal (Icewine)","Canada"]
];
