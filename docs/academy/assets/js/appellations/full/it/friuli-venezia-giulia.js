// Full encyclopedia entries: Friuli Venezia Giulia. Written from each disciplinare di produzione (AIS copies).
const FVD = "https://aisitalia.it/Disciplinari/Friuli%20Venezia%20Giulia/";
function fvSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", FVD + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function fv(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [fvSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-colli-orientali-del-friuli-picolit"] = fv({
  lede: "Sweet white from the low-yielding Picolit grape in the eastern hills of Udine, one of Italy's most prized dessert wines.",
  cat: "DOCG, sweet white", rec: "DOC 1970 (within Colli Orientali del Friuli); DOCG 2006", d: "DOCG/Colli Orientali del Friuli Picolit",
  facts: [["Grape", "Picolit at least 85%; other whites up to 15%, no Traminer"], ["Subzone", "Cialla"], ["Yield", "4 t/ha; 13% natural alcohol"], ["Grape to wine", "55%"], ["Release", "From 1 September of the year after the harvest"], ["Total alcohol", "15%"]],
  place: "The Friuli Colli Orientali hills from Tarcento to the Slovenian border, on ponca (marl and sandstone flysch).",
  rules: "Grapes may be late-harvested or dried. Picolit suffers floral abortion, so bunches set few berries.",
  history: "Count Fabio Asquini sold Picolit to European courts in the 18th century; it was revived after phylloxera by the Perusini family at Rocca Bernarda.",
  glass: "Golden, apricot, acacia honey and almond, sweet but elegant.",
  exam: "Picolit's natural low yield comes from poor fruit set (aborted flowers).",
  producers: ["Livio Felluga", "Ronchi di Cialla", "Perusini"]
});
APXF["it-ramandolo"] = fv({
  lede: "Sweet Verduzzo Friulano from the steep hills of Ramandolo near Nimis, at the northern end of the Colli Orientali.",
  cat: "DOCG, sweet white", rec: "Subzone of Colli Orientali del Friuli 1970; DOCG 2001", d: "DOCG/Ramandolo",
  amended: "Text as amended by DM 22 July 2024",
  facts: [["Grape", "Verduzzo Friulano (locally Verduzzo Giallo) 100%"], ["Types", "Ramandolo, Ramandolo Riserva"], ["Yield", "8 t/ha; 11% natural"], ["Grape to wine", "65%"], ["Release", "From November of the year after the harvest; Riserva later"], ["Total alcohol", "14%"]],
  place: "Steep terraces around Ramandolo, Nimis and Tarcento below Monte Bernadia, the coolest part of the Colli Orientali.",
  rules: "Ramandolo vineyards may also declassify to Friuli Colli Orientali Verduzzo.",
  glass: "Golden, honey, dried apricot, chestnut; slightly tannic for a white.",
  exam: "Verduzzo is a white grape with noticeable tannin.",
  producers: ["Dario Coos", "Anna Berra"]
});
APXF["it-rosazzo"] = fv({
  lede: "A white blend led by Friulano from the hills around the Abbey of Rosazzo, a former Colli Orientali subzone.",
  cat: "DOCG, white", rec: "Subzone of Colli Orientali del Friuli 1970; DOCG 2011", d: "DOCG/Rosazzo",
  facts: [["Grapes", "Friulano at least 50%; Sauvignon 20 to 30%; Pinot Bianco and/or Chardonnay 20 to 30%; Ribolla Gialla up to 10%; others up to 5%"], ["Communes", "Parts of Manzano, San Giovanni al Natisone, Corno di Rosazzo (Udine)"], ["Natural alcohol", "11.5%"], ["Total alcohol", "12%"]],
  place: "Ponca hills around the medieval Abbey of Rosazzo.",
  rules: "A blended white, unusual in a varietal region.",
  history: "Walter Filiputti and the abbey estate championed the blend.",
  glass: "Rich, almondy, herbal white with good structure.",
  exam: "Rosazzo is a white-blend DOCG; Ribolla Gialla di Rosazzo and Pignolo di Rosazzo are subzones of Friuli Colli Orientali.",
  producers: ["Livio Felluga (Abbazia di Rosazzo)", "Ronco delle Betulle"]
});
APXF["it-friuli-colli-orientali"] = fv({
  lede: "The eastern hills of Udine province along the Slovenian border: Friulano, Ribolla, Sauvignon, native reds like Schioppettino, Pignolo and Refosco, and five subzones.",
  cat: "DOC, white, red, sweet", rec: "DOC 1970 (as Colli Orientali del Friuli)", d: "DOC/Friuli Colli Orientali",
  amended: "Text as amended by DM 14 October 2011",
  facts: [["Grapes", "Chardonnay, Malvasia, Pinots, Ribolla Gialla, Riesling, Sauvignon, Friulano, Traminer, Verduzzo, Cabernets, Merlot, Pignolo, Pinot Nero, Refosco, Schioppettino, Tazzelenghe; Bianco, Rosso, Dolce"], ["Subzones", "Cialla, Ribolla Gialla di Rosazzo, Pignolo di Rosazzo, Schioppettino di Prepotto, Refosco di Faedis"], ["Yield", "11 t/ha; 10% natural"]],
  place: "Ponca (Eocene flysch of marl and sandstone) hills from Tarcento to Corno di Rosazzo, sheltered by the Julian Prealps.",
  rules: "Riserva versions exist. The name now carries 'Friuli' first.",
  glass: "Aromatic, structured whites; peppery Schioppettino; tannic Pignolo.",
  exam: "Ponca soils; native Schioppettino, Pignolo, Tazzelenghe; DOCGs Picolit, Ramandolo, Rosazzo sit within it.",
  producers: ["Miani", "Ronchi di Cialla", "Livio Felluga", "Le Vigne di Zamò", "Moschioni", "Ronco del Gnemiz"]
});
APXF["it-collio-goriziano"] = fv({
  lede: "The hills of Gorizia on the Slovenian border (Brda across it), Italy's most celebrated white-wine hills, for varietals and the blended Collio Bianco.",
  cat: "DOC, white, red", rec: "DOC 1968", d: "DOC/Collio Goriziano o Collio",
  facts: [["Also labelled", "Collio"], ["Types", "Bianco, Chardonnay, Malvasia, Müller-Thurgau, Picolit, Pinot Bianco, Pinot Grigio, Ribolla Gialla, Riesling, Riesling Italico, Sauvignon, Friulano, Traminer; Rosso, Cabernets, Merlot, Pinot Nero"], ["Grape to wine", "70%; Picolit 60%"], ["Natural alcohol", "10.5%; Picolit 13%"], ["Riserva", "Allowed for all types with longer ageing"]],
  place: "A crescent of hills between the Isonzo and the Judrio, on ponca flysch, with the Adriatic to the south and the Alps to the north.",
  rules: "Collio Bianco may blend local and international white varieties.",
  history: "Mario Schiopetto pioneered modern, temperature-controlled white winemaking here in the 1960s; Josko Gravner and Stanko Radikon later led the orange-wine revival.",
  glass: "Mineral, textured whites: Friulano (almond), Ribolla (citrus, often skin-macerated), Sauvignon.",
  exam: "Collio and Friuli Colli Orientali are the hill DOCs on ponca; Isonzo and Grave are plains.",
  producers: ["Schiopetto", "Gravner", "Radikon", "Venica & Venica", "Russiz Superiore", "Edi Keber", "Primosic"]
});
APXF["it-carso"] = fv({
  lede: "The limestone plateau above Trieste, for Terrano (a Refosco), Vitovska and Malvasia Istriana.",
  cat: "DOC, red, white", rec: "DOC 1985", d: "DOC/Carso o Carso-Kras",
  facts: [["Also labelled", "Carso-Kras"], ["Types", "Rosso, Terrano (also Classico), Refosco, Cabernets, Merlot, Chardonnay, Glera, Malvasia, Pinot Grigio, Sauvignon, Traminer, Vitovska"], ["Riserva", "For Rosso, Malvasia, Sauvignon, Vitovska, Merlot, Refosco, Terrano"]],
  place: "Thin red soil (terra rossa) over karst limestone, windswept by the bora; cellars cut into rock.",
  rules: "Terrano Classico from the oldest zone.",
  glass: "Terrano: very high acid, tart red; Vitovska: saline, often skin-contact.",
  exam: "Karst gave its name to the geology term; Terrano is a Refosco.",
  producers: ["Edi Kante", "Paolo Vodopivec", "Zidarich", "Skerk"]
});
APXF["it-friuli"] = fv({
  lede: "The regional DOC for the whole of Friuli Venezia Giulia, created in 2016, for varietals, blends and sparkling Ribolla Gialla.",
  cat: "DOC, white, red, sparkling", rec: "DOC 2016 (EU implementing regulation)", d: "DOC/Friuli o Friuli Venezia Giulia - Furlanija o Furlanija Julijska Krajina",
  facts: [["Also labelled", "Friuli Venezia Giulia, Furlanija, Furlanija Julijska Krajina"], ["Types", "Bianco, Rosso, Chardonnay, Friulano, Malvasia, Pinots, Riesling, Sauvignon, Traminer, Verduzzo, Cabernets, Merlot, Refosco; Spumante and Ribolla Gialla Spumante (tank or metodo classico)"], ["Yields", "Mostly 14 t/ha"], ["Metodo classico", "At least 9 months on the lees; millesimato with longer ageing"]],
  place: "All the region's DOC areas.",
  rules: "Tank-method spumante at least 90 days on the lees; released from 1 February after the harvest.",
  glass: "Simple, fresh varietals and sparkling Ribolla.",
  exam: "Regional umbrella DOC from 2016.",
  producers: []
});
APXF["it-friuli-grave"] = fv({
  lede: "The largest Friulian DOC, on the stony gravel plain (grave) of the Tagliamento and Meduna in Pordenone and Udine.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1970", d: "DOC/Friuli Grave",
  facts: [["Types", "Bianco, Rosso, Chardonnay, Pinots, Riesling, Sauvignon, Friulano, Traminer, Verduzzo, Cabernets, Merlot, Refosco, Novello, Rosato; Superiore versions"], ["Natural alcohol", "10%; Superiore 11%"]],
  place: "Alluvial gravels, well drained and warm by day.",
  rules: "Superiore from riper grapes.",
  glass: "Fruity, easy varietals; Merlot and Pinot Grigio dominate.",
  exam: "Grave = gravel.",
  producers: []
});
APXF["it-friuli-isonzo"] = fv({
  lede: "The gravel plain of the Isonzo river south of Collio, for structured whites and reds.",
  cat: "DOC, white, red, rosé, sweet, sparkling", rec: "DOC 1974", d: "DOC/Friuli Isonzo o Isonzo del Friuli",
  facts: [["Also labelled", "Isonzo del Friuli"], ["Types", "Bianco, Rosso, Rosato, Vendemmia tardiva, Chardonnay, Malvasia, Moscato Giallo and Rosa, Pinots, Riesling, Sauvignon, Friulano, Traminer, Verduzzo, Cabernets, Merlot, Refosco, Schioppettino, Franconia, spumante"], ["Natural alcohol", "9.5%"], ["Vendemmia tardiva", "Picked at least 30 days after harvest start; grape to wine 60%"]],
  place: "Red, iron-rich gravels (rive rosse) and white limestone gravels on either side of the Isonzo, with warm days and sea breezes.",
  rules: "Many varietal types.",
  glass: "Riper, rounder whites than Collio.",
  exam: "Isonzo is a plain DOC, but its best wines rival the hills.",
  producers: ["Vie di Romans", "Lis Neris", "Ronco del Gelso"]
});
APXF["it-friuli-aquileia"] = fv({
  lede: "A coastal-plain DOC around the Roman city of Aquileia, for varietal whites and reds.",
  cat: "DOC, white, red, rosé", rec: "DOC 1975", d: "DOC/Friuli Aquileia",
  facts: [["Types", "Bianco, Rosso, Merlot, Cabernets, Refosco, Friulano, Pinots, Riesling, Sauvignon, Traminer, Chardonnay, Verduzzo, Malvasia, Müller-Thurgau; Superiore"]],
  place: "Flat alluvial land near the Grado lagoon.",
  rules: "Refosco may include up to 10% Refosco Nostrano.",
  glass: "Light, fresh wines.",
  exam: "Named for the Roman colony of Aquileia.",
  producers: []
});
APXF["it-friuli-latisana"] = fv({
  lede: "A plain DOC near the mouth of the Tagliamento, with Franconia (Blaufränkisch) among its reds.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1975", d: "DOC/Friuli Latisana",
  facts: [["Types", "Merlot, Cabernets, Carmenère, Franconia, Refosco, Pinot Nero, Rosato, Rosso, Pinot Bianco and other whites; Superiore and Riserva"]],
  place: "The lower Tagliamento plain.",
  rules: "Riserva aged in wood or other vessels from 11 November.",
  glass: "Soft, fruity reds.",
  exam: "Franconia = Blaufränkisch.",
  producers: []
});
APXF["it-friuli-annia"] = fv({
  lede: "A small coastal-plain DOC named after the Roman Via Annia, for varietal and blended wines.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1995", d: "DOC/Friuli Annia",
  facts: [["Grapes", "Varietals at least 90%: Merlot, Cabernets, Refosco, Friulano, Pinots, Verduzzo, Traminer, Sauvignon, Chardonnay, Malvasia"], ["Natural alcohol", "10%"]],
  place: "Lowlands between Aquileia and Latisana.",
  rules: "Frizzante and spumante allowed.",
  glass: "Simple, fresh wines.",
  exam: "Minor plain DOC.",
  producers: []
});
// HISTORY-PASS-START
(function(){
const CASS=`In the sixth century Cassiodorus, minister to the Ostrogothic king Theodoric, described a sweet wine of dried grapes from the Verona hills called Acinatico, the ancestor of Recioto.`;
const TAI=`The European ruling that reserved the name Tokaji for Hungary forced Italy to drop 'Tocai' from 2007; the grape became Tai in the Veneto and Friulano in Friuli.`;
const PICO=`In the eighteenth century Count Fabio Asquini of Fagagna made Picolit famous, shipping it in Murano glass bottles to the courts of Europe; the grape's poor flowering, which leaves few berries on each bunch, nearly ended it after phylloxera.`;
const COL=`Livio Felluga, who came to the hills of eastern Friuli from Istria after the Second World War, put an old map of the hills on his labels from 1956, and with a few others helped turn the area from farm wine to fine white wine.`;
const OLT=`The Oltrepò Pavese, 'beyond the Po' from Pavia, was for centuries Milan's wine cellar, part of the duchy of Milan until it passed to the House of Savoy in the eighteenth century.`;
const HX={
// Veneto
"it-amarone-della-valpolicella":[`<p>${CASS} For centuries the prized wine was sweet Recioto. The famous story says that in 1936 Adelino Lucchese, cellar master of the new Cantina Sociale Valpolicella, tasted a forgotten barrel of Recioto that had fermented dry and declared it not 'amaro', bitter, but 'amarone'. Archive research published in 2026 complicates the legend: the cooperative, founded in 1933 by Pieralvise Serego Alighieri, a descendant of Dante, Giambattista Rizzardi and others, already listed Amarone from the 1933, 1934 and 1935 vintages in its inventory, so the dry wine was a deliberate project to give Valpolicella a typical wine in quantity. The oldest certified bottle is Bolla's 1950 vintage, bottled in 1953 for the eightieth birthday of Alberto Bolla, which began its commercial rise. Giuseppe Quintarelli and Romano Dal Forno later made it a cult wine. Amarone was a type within Valpolicella from 1968, gained its own name in 1990 and became a DOCG in 2010. Its rapid growth since the 1990s, when production doubled in a few years, led the consortium to debate yields and the spread of drying on the plains.</p>`,[]],
"it-recioto-della-valpolicella":[`<p>${CASS} The name may come from 'recie', the 'ears', the upper lobes of the bunch that ripen best and were set aside for drying. Grapes are dried for months on racks in lofts (fruttai) before slow fermentation leaves a sweet, powerful red. It was recognised in 1968 and became a DOCG in 2010.</p>`,[]],
"it-valpolicella":[`<p>The name is often explained as 'valley of many cellars' (val polis cellae), though that is probably folk etymology. The historic Classico zone covers the valleys of Fumane, Marano and Negrar and the communes around them, where the della Scala lords of Verona and later Venetian nobles built villas. The DOC of 1968 added the Valpantena and eastern valleys, and the post-war boom in light, cheap Valpolicella damaged the name until Ripasso and Amarone restored its prestige.</p>`,[]],
"it-valpolicella-est":[`<p>The eastern valleys, such as Mezzane, Illasi and Tramigna, were added to Valpolicella in 1968. Producers such as Romano Dal Forno at Illasi showed they could rival the Classico zone.</p>`,[]],
"it-valpolicella-ripasso":[`<p>Ripasso, re-passing young Valpolicella over the pomace left from Amarone or Recioto, is an old farm practice. Masi's Campofiorin, first made in 1964, popularised it commercially, and it was recognised as its own DOC in 2010.</p>`,[]],
"it-soave":[`<p>Soave grew up below the castle of the della Scala lords of Verona. In 1931 a royal decree delimited the Soave Classico zone, one of the first such delimitations in Italy. The DOC of 1968 extended the zone to the plains, and the flood of cheap Soave that followed hurt its reputation. Leonildo Pieropan, who made Calvarino from 1971, the first Italian white named for a single vineyard, and Roberto Anselmi, who left the DOC in protest in 2000, led the revival. In 2019 Soave approved 33 named crus (unità geografiche aggiuntive) on its volcanic and limestone hills.</p>`,[]],
"it-soave-superiore":[`<p>Soave Superiore became a DOCG in 2001, limited to the hills, an attempt to separate the best Soave from the plains.</p>`,[]],
"it-recioto-di-soave":[`<p>Recioto di Soave, made from dried Garganega, has been praised since the Middle Ages and was the Veneto's first DOCG, in 1998.</p>`,[]],
"it-gambellara":[`<p>Gambellara, next to Soave on the border of the provinces of Vicenza and Verona, grows Garganega on dark volcanic soils. It became a DOC in 1970.</p>`,[]],
"it-recioto-di-gambellara":[`<p>Gambellara's growers have dried Garganega for sweet wine for centuries, and also made a rare Vin Santo. Recioto di Gambellara became a DOCG in 2008.</p>`,[]],
"it-bardolino":[`<p>Bardolino, on the eastern shore of Lake Garda, makes light reds and the pink Chiaretto from Corvina, wines once drunk by the Venetian and Austrian rulers who summered on the lake. It became a DOC in 1968, and rules published in 2021 recognised three subzones, La Rocca, Montebaldo and Sommacampagna, were recognised.</p>`,[]],
"it-bardolino-superiore":[`<p>Bardolino Superiore became a DOCG in 2001, the first red DOCG of the Veneto, for wines with more ageing and lower yields.</p>`,[]],
"it-bianco-di-custoza":[`<p>Custoza, south of Lake Garda, was the scene of two battles of the Risorgimento, in 1848 and 1866, both won by Austria; an ossuary marks the site. Its white wine became a DOC in 1971.</p>`,[]],
"it-garda":[`<p>The Garda DOC, created in 1996, crosses the border between the Veneto and Lombardy around Lake Garda, Italy's largest lake.</p>`,[]],
"it-conegliano-valdobbiadene-prosecco":[`<p>The name Prosecco comes from a village near Trieste, where a wine called Pucino was praised by Pliny. In the hills between Conegliano and Valdobbiadene, Antonio Carpenè founded Carpenè Malvolti in 1868 to make sparkling wine, and Italy's first school of oenology opened at Conegliano in 1876. The tank method developed by Federico Martinotti and Eugène Charmat made Prosecco possible on a large scale. In 2009 the government created a vast Prosecco DOC across the Veneto and Friuli, including the village of Prosecco, to protect the name, and made the original hills a DOCG. In 2019 the hills were inscribed as a UNESCO World Heritage site, with the steep Cartizze and the 'Rive' as their best sites.</p>`,[]],
"it-colli-asolani-prosecco":[`<p>Asolo, the hill town where Caterina Cornaro, deposed Queen of Cyprus, held court from 1489, gives its name to the Asolo Prosecco DOCG, created in 2009.</p>`,[]],
"it-colli-di-conegliano":[`<p>The Colli di Conegliano became a DOC in 1993 and a DOCG in 2011, for still wines, including the sweet Refrontolo Passito and Torchiato di Fregona.</p>`,[]],
"it-prosecco":[`<p>The Prosecco DOC, created in 2009, covers nine provinces of the Veneto and Friuli. It includes the village of Prosecco near Trieste so that the grape, renamed Glera, could no longer be planted elsewhere as Prosecco. Its explosive growth made it one of the world's most popular sparkling wines; a rosé version was approved in 2020.</p>`,[]],
"it-montello-rosso":[`<p>The Montello hill was a forest reserved by the Venetian Republic for oak for the Arsenal's ships. In the 1950s Count Piero Loredan, a descendant of doges, made Venegazzù della Casa, a Bordeaux blend, one of the first in Italy. The hill was a front line on the Piave in 1918. Montello Rosso became a DOCG in 2011.</p>`,[]],
"it-asolo-montello":[`<p>The Montello e Colli Asolani DOC, created in 1977, covers the hills of Asolo and the Montello, where Bordeaux grapes have grown since the nineteenth century.</p>`,[]],
"it-piave":[`<p>The Piave river was the line where the Italian army held the Austro-Hungarian advance in 1917 and 1918. The Piave DOC, from 1971, is home to Raboso, a sour red grape whose name is often linked to 'rabbioso', angry.</p>`,[]],
"it-piave-malanotte":[`<p>Malanotte, a hamlet near Tezze di Piave, gives its name to the DOCG for Raboso from partly dried grapes, created in 2010.</p>`,[]],
"it-bagnoli-friularo":[`<p>Raboso is called Friularo around Bagnoli di Sopra, where the Benedictine monks who owned the land from the eleventh century grew it. The DOCG for Friularo dates from 2011.</p>`,[]],
"it-bagnoli-di-sopra":[`<p>The estate of Bagnoli di Sopra, owned by Benedictine monks and later the Venetian Widmann family, gives its name to a DOC created in 1995.</p>`,[]],
"it-corti-benedettine-del-padovano":[`<p>The 'corti benedettine' were farms of the Benedictine monasteries of Padua, which drained and planted the plains south of the city. The DOC dates from 2004.</p>`,[]],
"it-lison":[`<p>${TAI} Lison, a village near Portogruaro, was the heart of Tocai in eastern Veneto, and Lison became a DOCG in 2010 for Tai.</p>`,[]],
"it-lison-pramaggiore":[`<p>${TAI} The DOC of Lison-Pramaggiore, formed in 1985, joined Tocai di Lison with the reds of Pramaggiore.</p>`,[]],
"it-colli-euganei":[`<p>The Euganean hills, old volcanoes rising out of the plain south of Padua, have long attracted visitors to their spas; the poet Petrarch spent his last years at Arquà and died there in 1374. The DOC dates from 1969.</p>`,[]],
"it-colli-euganei-fior-d-arancio":[`<p>Fior d'Arancio, 'orange blossom', is the local name for Moscato Giallo in the Euganean hills, grown here since the nineteenth century. It became a DOCG in 2010.</p>`,[]],
"it-lessini-durello":[`<p>Durella, a high-acid grape of the volcanic Monti Lessini north of Verona and Vicenza, was long a farm wine; producers turned it into a sparkling wine, and Lessini Durello became its own DOC in 2011.</p>`,[]],
"it-monti-lessini":[`<p>The Monti Lessini, a plateau of limestone and volcanic rock settled in the Middle Ages by Bavarian-speaking 'Cimbri', became a DOC in 1987.</p>`,[]],
"it-breganze":[`<p>Breganze, below the Asiago plateau, is home to Torcolato, from Vespaiola grapes twisted (torcolati) around strings and hung to dry. Fausto Maculan made it famous from the 1980s. The DOC dates from 1969.</p>`,[]],
"it-colli-berici":[`<p>The Colli Berici rise south of Vicenza, the city of Andrea Palladio, whose villas dot these hills and are part of a UNESCO site. The DOC, from 1973, includes Tai Rosso, a local form of Grenache, at Barbarano.</p>`,[]],
"it-vicenza":[`<p>The Vicenza DOC, created in 2000, covers the province of Andrea Palladio's city.</p>`,[]],
"it-venezia":[`<p>The Venezia DOC, created in 2010, covers the mainland provinces of Venice and Treviso. In the lagoon, the Bisol family revived Dorona, an old Venetian grape, on the island of Mazzorbo.</p>`,[]],
"it-vigneti-della-serenissima":[`<p>Named after the 'Most Serene' Republic of Venice, this DOC was created in 2011 for sparkling wine.</p>`,[]],
"it-delle-venezie":[`<p>The Delle Venezie DOC was created in 2017 to bring the huge Pinot Grigio production of the Veneto, Friuli and Trentino under one set of rules and control its volume and prices.</p>`,[]],
"it-arcole":[`<p>At the Battle of Arcole in November 1796 Napoleon led a charge across a bridge over the Alpone against the Austrians, an image made famous by Antoine-Jean Gros's painting. The DOC dates from 2000.</p>`,[]],
"it-merlara":[`<p>Merlara, on the plain south of Padua, became a DOC in 2000.</p>`,[]],
"it-riviera-del-brenta":[`<p>The Brenta canal between Padua and Venice is lined with the summer villas of Venetian nobles, among them Palladio's Villa Foscari (La Malcontenta) and Villa Pisani. The DOC dates from 2004.</p>`,[]],
"it-valdadige-terradeiforti":[`<p>The Terra dei Forti takes its name from the forts Austria built along the Adige valley in the nineteenth century to defend its border with Italy. Enantio, a local grape, survives here in places on its own roots.</p>`,[]],
// Friuli
"it-colli-orientali-del-friuli-picolit":[`<p>${PICO} It was revived after the war and became a DOCG in 2006.</p>`,[]],
"it-ramandolo":[`<p>Ramandolo, a hamlet above Nimis, makes sweet wine from Verduzzo Giallo on steep slopes under the Prealps. It became Friuli's first DOCG in 2001.</p>`,[]],
"it-rosazzo":[`<p>The Abbey of Rosazzo, founded around the year 800 and later held by Benedictines, has been a centre of viticulture for a thousand years. Walter Filiputti, who ran the abbey's estate, and others championed a white blend based on Friulano, and Rosazzo became a DOCG in 2011. In the 1970s the Nonino family, distillers of grappa, created the Risit d'Aur prize to reward growers who saved native grapes such as Schioppettino and Pignolo; Pignolo was rediscovered in the abbey's vineyards.</p>`,[]],
"it-friuli-colli-orientali":[`<p>${COL} In the 1970s Paolo Rapuzzi of Ronchi di Cialla saved Schioppettino from extinction, winning the first Nonino prize in 1975, and the grape was legalised soon after. The DOC dates from 1970.</p>`,[]],
"it-collio-goriziano":[`<p>The Collio's hills were divided by the border drawn in 1947, which left part of them in Yugoslavia, now Slovenia's Brda. Mario Schiopetto pioneered clean, temperature-controlled white winemaking here in the 1960s, setting the model for modern Italian whites. In the 1990s Josko Gravner and Stanko Radikon turned the other way, fermenting white grapes on their skins, Gravner in clay amphorae from Georgia, and led the orange wine revival. The DOC dates from 1968.</p>`,[]],
"it-carso":[`<p>The Carso (Karst), the limestone plateau above Trieste, gave its name to the geological term for landscapes of sinkholes and caves. Growers such as Edi Kante and Benjamin Zidarich dug cellars into the rock and revived Vitovska and Terrano. The DOC dates from 1985.</p>`,[]],
"it-friuli":[`<p>The Friuli DOC, created in 2016, covers the whole region, a regional umbrella similar to Alto Adige's.</p>`,[]],
"it-friuli-grave":[`<p>The Grave, the gravel plain of the Tagliamento and its tributaries, is Friuli's largest DOC, created in 1970.</p>`,[]],
"it-friuli-isonzo":[`<p>The Isonzo river was the scene of twelve battles between Italy and Austria-Hungary from 1915 to 1917, ending with Caporetto. Its gravel plain became a DOC in 1974.</p>`,[]],
"it-friuli-aquileia":[`<p>Aquileia, founded by Rome in 181 BC, was one of the empire's greatest cities and wine ports; its basilica's mosaic floor is a UNESCO site. The DOC dates from 1975.</p>`,[]],
"it-friuli-latisana":[`<p>Latisana, on the lower Tagliamento near the sea, became a DOC in 1975.</p>`,[]],
"it-friuli-annia":[`<p>Annia takes its name from the Via Annia, the Roman road that linked Aquileia with Padua. The DOC dates from 1995.</p>`,[]],
// Trentino-Alto Adige
"it-alto-adige":[`<p>South Tyrol was part of the Austrian Tyrol until 1919, when the Treaty of Saint-Germain gave it to Italy, and most of its people still speak German. Its grapes carry local names: Gewürztraminer takes its name from Tramin (Termeno), and Lagrein may come from the Lagarina valley. Cooperatives (Kellereien) founded from the 1890s, such as Terlan in 1893, still make most of the wine. In the 1980s the region moved away from large volumes of light Schiava for export and toward the whites that made its name.</p>`,[]],
"it-lago-di-caldaro":[`<p>The Kalterersee (Lago di Caldaro) gives its name to light reds from Schiava (Vernatsch), which for decades were the region's best-known export, mostly to Austria, Germany and Switzerland. It became a DOC in 1970.</p>`,[]],
"it-trentino":[`<p>In 1874 the Tyrolean Diet founded the agricultural institute at San Michele all'Adige, directed by Edmund Mach, which made Trentino a centre of wine research. Trentino became a DOC in 1971, and its cooperatives, such as Cavit and Mezzacorona, grew into major producers.</p>`,[]],
"it-trento":[`<p>Giulio Ferrari, who studied in France, founded his sparkling wine house in Trento in 1902 and planted Chardonnay in Trentino. In 1952, with no heir, he sold the company to Bruno Lunelli, whose family built it into Italy's best-known sparkling wine. Trento became one of Italy's first DOCs for traditional method sparkling wine in 1993, and the name Trentodoc has been used since 2007.</p>`,[]],
"it-teroldego-rotaliano":[`<p>Teroldego grows on the Campo Rotaliano, a gravel plain where the Noce meets the Adige. Elisabetta Foradori, who took over her family estate in the 1980s, replanted it from massal selections and showed its potential. The DOC dates from 1971.</p>`,[]],
"it-casteller":[`<p>The Casteller, a hill south of Trento, gives its name to a DOC created in 1974 for light reds.</p>`,[]],
"it-valdadige":[`<p>The Valdadige DOC, created in 1975, follows the Adige valley from Bolzano to Verona, crossing three provinces and two regions.</p>`,[]],
// Lombardy
"it-franciacorta":[`<p>The name comes from the 'curtes francae', medieval monastic estates exempt (franche) from taxes. In 1961 Guido Berlucchi and the young oenologist Franco Ziliani released the first traditional method sparkling wine of the area, called Pinot di Franciacorta. Others followed, among them Maurizio Zanella of Ca' del Bosco, and in 1995 Franciacorta became Italy's first DOCG for traditional method sparkling wine. Its producers chose to label it simply 'Franciacorta', without 'spumante' or 'metodo classico', to make the place name stand for the style, as Champagne does.</p>`,[]],
"it-curtefranca":[`<p>When Franciacorta became a DOCG for sparkling wine, the still wines of the area were given the name Terre di Franciacorta (1995), changed to Curtefranca in 2008.</p>`,[]],
"it-valtellina-superiore":[`<p>The Valtellina belonged to the Swiss Grisons from 1512 to 1797, and its wines went north over the Alpine passes. Its Nebbiolo, called Chiavennasca, grows on some 2,500 kilometres of dry-stone terraces facing south across the valley. The subzones Sassella, Grumello, Inferno, Valgella and Maroggia take their names from local landmarks. The DOC dates from 1968 and the DOCG from 1998.</p>`,[]],
"it-sforzato-di-valtellina":[`<p>Sforzato (Sfursat), from Nebbiolo grapes dried for months in airy lofts, was in 2003 the first DOCG for a dry red from dried grapes.</p>`,[]],
"it-valtellina-rosso":[`<p>The basic Valtellina red, recognised in 1968, took the name Rosso di Valtellina in 2011.</p>`,[]],
"it-scanzo":[`<p>Moscato di Scanzo, a sweet red from a local Moscato grown on a few dozen hectares near Bergamo, is one of Italy's smallest DOCGs (2009). Local tradition holds that it was sold in eighteenth-century London at high prices.</p>`,[]],
"it-oltrepo-pavese":[`<p>${OLT} From the nineteenth century, growers such as the Giorgi di Vistarino family planted Pinot Nero, and the area supplied grapes to the sparkling houses of Piedmont. The DOC dates from 1970.</p>`,[]],
"it-oltrepo-pavese-metodo-classico":[`<p>${OLT} Pinot Nero planted from the nineteenth century, at the initiative of families such as the Giorgi di Vistarino, made the area a source for Piedmont's sparkling houses. The traditional method wines gained a DOCG in 2007, with a rosé version called Cruasé.</p>`,[]],
"it-bonarda-dell-oltrepo-pavese":[`<p>${OLT} Its lightly sparkling red Bonarda, made from Croatina, is the everyday wine of Milan's trattorias. It became its own DOC in 2010.</p>`,[]],
"it-buttafuoco-dell-oltrepo-pavese":[`<p>Buttafuoco, 'it throws fire', is a red blend from a small area of the Oltrepò and its fiery character. It became its own DOC in 2010.</p>`,[]],
"it-sangue-di-giuda":[`<p>Sangue di Giuda, 'Judas's blood', a sweet, lightly sparkling red, carries a name explained by several local legends linking the wine to Judas and to redemption. It became its own DOC in 2010.</p>`,[]],
"it-pinot-nero-dell-oltrepo-pavese":[`<p>${OLT} The Oltrepò holds the largest area of Pinot Nero in Italy, planted from the nineteenth century. Its still Pinot Nero became its own DOC in 2010.</p>`,[]],
"it-oltrepo-pavese-pinot-grigio":[`<p>${OLT} Its Pinot Grigio became its own DOC in 2010.</p>`,[]],
"it-casteggio":[`<p>Casteggio, the Roman Clastidium, where Marcus Claudius Marcellus defeated the Gauls in 222 BC, gives its name to a DOC created in 2010.</p>`,[]],
"it-lugana":[`<p>Lugana's clay soils on the southern shore of Lake Garda were once a marshy forest called Lucana. Its white wine from Turbiana, a local form of Trebbiano, became a DOC in 1967, one of Lombardy's first. The area also borders the battlefields of 1859.</p>`,[]],
"it-san-martino-della-battaglia":[`<p>On 24 June 1859 the battles of Solferino and San Martino, where French and Piedmontese armies defeated Austria, left tens of thousands dead or wounded; the Swiss businessman Henri Dunant, horrified by the scene, went on to found the Red Cross. The DOC, from 1970, covers white wine from Tuchì (Friulano).</p>`,[]],
"it-riviera-del-garda-bresciano":[`<p>The western shore of Lake Garda became a DOC as Garda Bresciano in 1977 and was renamed Riviera del Garda Classico in 2017. Its Chiaretto rosé is credited to Pompeo Molmenti, a Venetian senator who made it at Moniga in the 1890s.</p>`,[]],
"it-valtenesi":[`<p>The Valtenesi, the hills of the western shore of Lake Garda, is home to Groppello and to Chiaretto, credited to Pompeo Molmenti, a Venetian senator who made it at Moniga del Garda in the 1890s. The DOC dates from 2011.</p>`,[]],
"it-garda-colli-mantovani":[`<p>The morainic hills south of Lake Garda, near Mantua, the city of the Gonzaga, became a DOC in 1976.</p>`,[]],
"it-lambrusco-mantovano":[`<p>Lambrusco was grown on the plains of Mantua long before modern borders separated it from Emilia's; the Lambrusco Mantovano DOC dates from 1987.</p>`,[]],
"it-botticino":[`<p>Botticino, east of Brescia, is famous for its marble, used to build the Vittoriano monument in Rome. Its red wine became a DOC in 1968.</p>`,[]],
"it-cellatica":[`<p>Cellatica, in the hills just west of Brescia, became a DOC in 1968.</p>`,[]],
"it-capriano-del-colle":[`<p>Capriano del Colle, on a lone hill south of Brescia, became a DOC in 1980.</p>`,[]],
"it-san-colombano-al-lambro":[`<p>San Colombano, the only DOC in the province of Milan, is named after Saint Columbanus, the Irish monk who, according to legend, taught the locals to plant vines in the seventh century on his way to Bobbio. The DOC dates from 1984.</p>`,[]],
"it-terre-del-colleoni":[`<p>Bartolomeo Colleoni, the fifteenth-century condottiere of Bergamo, whose equestrian statue by Verrocchio stands in Venice, gives his name to a DOC created in 2011.</p>`,[]],
"it-valcalepio":[`<p>The Valcalepio, near Bergamo, takes its name from the Counts of Calepio and their castle. The DOC dates from 1976 and includes a sweet Moscato Passito.</p>`,[]],
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
})();
// HISTORY-PASS-END
