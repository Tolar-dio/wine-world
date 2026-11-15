// Full encyclopedia entries: Trentino-Alto Adige. Written from each disciplinare di produzione (AIS copies).
const TAD = "https://aisitalia.it/Disciplinari/";
function taSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", TAD + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function ta(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [taSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-alto-adige"] = ta({
  lede: "The German-speaking province of Bolzano (Südtirol): one DOC for dozens of varietals, six historic subzones and, since 2024, 86 vineyard units (UGA).",
  cat: "DOC, white, red, rosé, sparkling, sweet", rec: "DOC 1975", d: "Alto Adige/Alto Adige",
  amended: "AIS text amended by DM 18 September 2014; UGA classification from the consortium (2024 to 2026)",
  sources: [["Wine Industry Advisor: Alto Adige UGA update, April 2026", "https://wineindustryadvisor.com/2026/04/23/alto-adige-wines-shares-latest-developments-on-uga-classification/"]],
  facts: [["Also labelled", "Südtirol, Südtiroler, dell'Alto Adige"], ["Types", "Spumante (also riserva and rosé); Bianco, Chardonnay, Kerner, Moscato Giallo, Müller-Thurgau, Pinot Bianco, Pinot Grigio, Riesling, Sauvignon, Sylvaner, Gewürztraminer; Cabernets, Lagrein, Malvasia, Merlot, Moscato Rosa, Pinot Nero, Schiava and blends; passito, vendemmia tardiva, riserva"], ["Subzones", "Colli di Bolzano (Bozner Leiten), Meranese (Meraner), Santa Maddalena (St. Magdalener), Terlano (Terlaner), Valle Isarco (Eisacktaler), Valle Venosta (Vinschgau)"], ["Riserva", "Two years from 1 October of the harvest year, with 11.5% natural alcohol"], ["Spumante riserva", "Not released before 42 months from 1 October of the harvest"], ["UGA", "86 vineyard units; first used with the 2024 vintage, first UGA Riserva wines released from late 2026"]],
  place: "Steep slopes from 200 m near Salorno to over 1,000 m in the Valle Isarco and Venosta, between the Dolomites and the Ötztal Alps; porphyry around Bolzano, limestone and dolomite in the south, schist and gneiss in the north.",
  rules: "Grape to wine 70% for all wines. Passito from grapes dried to 16%.",
  history: "Part of the Austrian Tyrol until 1919. Cooperatives (Kellereien) such as Terlano, San Michele Appiano and Kaltern still make most of the wine.",
  glass: "Precise, aromatic whites; Lagrein dark and plummy; Schiava light and almondy; Pinot Nero from Mazzon and Gewürztraminer from Tramin (its likely namesake).",
  exam: "Know the six subzones, Lagrein, Schiava (Vernatsch), and the new 86 UGAs.",
  producers: ["Cantina Terlano", "Cantina San Michele Appiano", "Elena Walch", "J. Hofstätter", "Manincor", "Abbazia di Novacella", "Kuenhof", "Franz Haas", "Alois Lageder"]
});
APXF["it-lago-di-caldaro"] = ta({
  lede: "Light Schiava reds from the hills around Lake Kaltern south of Bolzano, extending into Trentino.",
  cat: "DOC, red", rec: "DOC 1970", d: "Alto Adige/Lago di Caldaro",
  facts: [["Also labelled", "Caldaro, Kalterersee, Kalterer"], ["Grapes", "Schiava Grossa, Schiava Gentile, Schiava Grigia; up to 15% other reds"], ["Mentions", "Scelto (Auslese), Classico, Classico Superiore"], ["Natural alcohol", "10%; scelto 11%"]],
  place: "Slopes around Lake Kaltern and the wider Oltradige, in the provinces of Bolzano and Trento; the classico zone was drawn in 1931.",
  rules: "Grape to wine 70%.",
  glass: "Pale, light-bodied, strawberry, almond, low tannin.",
  exam: "Schiava = Vernatsch; Kalterersee is its classic expression.",
  producers: ["Kellerei Kaltern", "Manincor"]
});
APXF["it-trento"] = ta({
  lede: "Traditional-method sparkling wine from the mountain vineyards of Trentino (Trentodoc), billed by its producers as the first Italian DOC reserved for metodo classico.",
  cat: "DOC, traditional-method sparkling (white and rosé)", rec: "DOC 1993", d: "Trentino/Trento",
  facts: [["Grapes", "Chardonnay, Pinot Bianco, Pinot Nero, Meunier"], ["Yield", "15 t/ha; base wine 9% natural (riserva 10%)"], ["Lees ageing", "At least 15 months; Riserva at least 36 months"], ["Alcohol", "At least 11.5% (riserva 12%)"]],
  place: "Hill and mountain vineyards in about 70 communes of the province of Trento, many at 300 to 800 m.",
  rules: "Second fermentation in bottle only.",
  history: "Giulio Ferrari, trained in Champagne, founded Ferrari in 1902 and planted Chardonnay in Trentino.",
  glass: "Fine bubbles, citrus, apple, brioche; mountain freshness.",
  exam: "Trentodoc is the collective brand; one of Italy's three key metodo classico DOCs with Franciacorta and Alta Langa.",
  producers: ["Ferrari", "Cesarini Sforza", "Rotari", "Letrari", "Revì", "Maso Martis"]
});
APXF["it-trentino"] = ta({
  lede: "The province-wide DOC of Trentino for dozens of varietals, Marzemino, the native Nosiola, and the rare Vino Santo from dried Nosiola.",
  cat: "DOC, white, red, rosé, sweet", rec: "DOC 1971", d: "Trentino/Trentino",
  facts: [["Types", "Bianco, Rosso, Kretzer, Chardonnay, Kerner, Manzoni, Moscato Giallo and Rosa, Müller-Thurgau, Nosiola, Pinots, Rieslings, Sauvignon, Traminer, Cabernets, Lagrein, Marzemino, Merlot, Pinot Nero, Rebo, Schiava, Vino Santo"], ["Superiore and subzones", "Trentino Superiore (stricter rules) and the subzones Sorni, Isera (d'Isera), Ziresi (dei Ziresi), Castel Beseno (Beseno), Valle di Cembra (Cembra)"], ["Riserva", "Whites aged one year, reds two years from 1 November"], ["Vino Santo", "Nosiola dried until at least 1 February; grape to wine 30%; released from 1 November of the third year after the harvest; total 16% (at least 10% actual)"]],
  place: "The Adige valley and its side valleys from Lake Garda to Salorno.",
  rules: "Grape to wine 70% for most types; Moscato Rosa 60%.",
  glass: "From crisp Müller-Thurgau and Nosiola to plummy Marzemino and Teroldego-like reds.",
  exam: "Vino Santo Trentino (dried Nosiola) is not Tuscan Vin Santo. Rebo is a Merlot x Teroldego crossing.",
  producers: ["Pojer e Sandri", "Pravis", "Cantina Toblino", "Eugenio Rosi", "Letrari"]
});
APXF["it-teroldego-rotaliano"] = ta({
  lede: "Teroldego from the flat Campo Rotaliano gravel plain between Mezzolombardo and Mezzocorona, Trentino's signature red.",
  cat: "DOC, red, rosé", rec: "DOC 1971", d: "Trentino/Teroldego Rotaliano",
  amended: "Text as amended by DM 14 January 2020",
  facts: [["Grape", "Teroldego 100%"], ["Zone", "The Campo Rotaliano in Mezzolombardo, Mezzocorona and Grumo (San Michele all'Adige)"], ["Types", "Rosso (Rubino), Rosato (Kretzer), Superiore, Superiore Riserva"], ["Natural alcohol", "10.5%"], ["Total alcohol", "11.5%; Superiore 12%"]],
  place: "An alluvial fan of gravel and sand where the Noce meets the Adige, ringed by cliffs that trap afternoon heat.",
  rules: "Grape to wine 70%.",
  history: "Elisabetta Foradori replanted massal Teroldego selections from the 1980s and showed its potential.",
  glass: "Deep purple, black cherry, violet and tar, juicy acidity, soft tannin.",
  exam: "One of the few great Italian reds from a flat valley floor.",
  producers: ["Foradori", "Dorigati", "De Vescovi Ulzbach", "Mezzacorona"]
});
APXF["it-casteller"] = ta({
  lede: "A Merlot-led light red blend from the hills of Trentino, named after the hill of Casteller near Trento.",
  cat: "DOC, red", rec: "DOC 1974", d: "Trentino/Casteller",
  facts: [["Grapes", "Merlot at least 50%; Schiava, Enantio, Lagrein, Teroldego for the rest"], ["Yield", "15 t/ha; 10% natural"], ["Total alcohol", "11%"]],
  place: "Hill communes across the Adige valley of Trentino.",
  rules: "Grape to wine 70%.",
  glass: "Light, fruity red.",
  exam: "Minor Trentino DOC.",
  producers: []
});
APXF["it-valdadige"] = ta({
  lede: "An inter-regional DOC along the Adige valley through Bolzano, Trento and Verona provinces, for simple whites and reds.",
  cat: "DOC, white, red, rosé", rec: "DOC 1975", d: "Trentino/Valdadige o Etschtaler",
  amended: "Text as amended by DM 15 September 2023",
  facts: [["Also labelled", "Etschtaler"], ["Types", "Bianco, Rosso, Rosato, Pinot Grigio, Pinot Bianco, Chardonnay, Schiava, Frizzante"], ["Rosso", "Enantio and/or Schiava at least 50%; Merlot, Pinot Nero, Lagrein, Teroldego, Cabernets for the rest"], ["Bianco", "Pinot Bianco, Pinot Grigio, Riesling Italico, Müller-Thurgau, Chardonnay at least 20%"]],
  place: "The valley floor and lower slopes of the Adige from South Tyrol to Verona.",
  rules: "Valdadige Terradeiforti is a separate DOC.",
  glass: "Light, simple wines.",
  exam: "Crosses three provinces and two regions.",
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
"it-amarone-della-valpolicella":[`<p>${CASS} For centuries the prized wine was sweet Recioto. A widely told story credits Adelino Lucchese, cellar master of the Valpolicella cooperative, who in 1936 tasted a barrel of Recioto that had fermented dry and declared it not 'amaro', bitter, but 'amarone'. Bolla and Bertani sold the first wines labelled Amarone around 1950s vintages, and Giuseppe Quintarelli and Romano Dal Forno later made it a cult wine. Amarone was a type within Valpolicella from 1968, gained its own name in 1990 and became a DOCG in 2010. Its rapid growth since the 1990s led the consortium to debate yields and the spread of drying on the plains.</p>`,[]],
"it-recioto-della-valpolicella":[`<p>${CASS} The name may come from 'recie', the 'ears', the upper lobes of the bunch that ripen best and were set aside for drying. Grapes are dried for months on racks in lofts (fruttai) before slow fermentation leaves a sweet, powerful red. It was recognised in 1968 and became a DOCG in 2010.</p>`,[]],
"it-valpolicella":[`<p>The name is often explained as 'valley of many cellars' (val polis cellae), though that is probably folk etymology. The historic Classico zone covers the valleys of Fumane, Marano and Negrar and the communes around them, where the della Scala lords of Verona and later Venetian nobles built villas. The DOC of 1968 added the Valpantena and eastern valleys, and the post-war boom in light, cheap Valpolicella damaged the name until Ripasso and Amarone restored its prestige.</p>`,[]],
"it-valpolicella-est":[`<p>The eastern valleys, such as Mezzane, Illasi and Tramigna, were added to Valpolicella in 1968. Producers such as Romano Dal Forno at Illasi showed they could rival the Classico zone.</p>`,[]],
"it-valpolicella-ripasso":[`<p>Ripasso, re-passing young Valpolicella over the pomace left from Amarone or Recioto, is an old farm practice. Masi's Campofiorin, first made in 1964, popularised it commercially, and it was recognised as its own DOC in 2010.</p>`,[]],
"it-soave":[`<p>Soave grew up below the castle of the della Scala lords of Verona. In 1931 a royal decree delimited the Soave Classico zone, one of the first such delimitations in Italy. The DOC of 1968 extended the zone to the plains, and the flood of cheap Soave that followed hurt its reputation. Leonildo Pieropan, who bottled Italy's early single-vineyard wine, Calvarino, from 1971, and Roberto Anselmi, who left the DOC in protest in 2000, led the revival. In 2019 Soave approved 33 named crus (unità geografiche aggiuntive) on its volcanic and limestone hills.</p>`,[]],
"it-soave-superiore":[`<p>Soave Superiore became a DOCG in 2001, limited to the hills, an attempt to separate the best Soave from the plains.</p>`,[]],
"it-recioto-di-soave":[`<p>Recioto di Soave, made from dried Garganega, has been praised since the Middle Ages and was the Veneto's first DOCG, in 1998.</p>`,[]],
"it-gambellara":[`<p>Gambellara, next to Soave on the border of the provinces of Vicenza and Verona, grows Garganega on dark volcanic soils. It became a DOC in 1970.</p>`,[]],
"it-recioto-di-gambellara":[`<p>Gambellara's growers have dried Garganega for sweet wine for centuries, and also made a rare Vin Santo. Recioto di Gambellara became a DOCG in 2008.</p>`,[]],
"it-bardolino":[`<p>Bardolino, on the eastern shore of Lake Garda, makes light reds and the pink Chiaretto from Corvina, wines once drunk by the Venetian and Austrian rulers who summered on the lake. It became a DOC in 1968, and in 2021 three subzones, La Rocca, Montebaldo and Sommacampagna, were recognised.</p>`,[]],
"it-bardolino-superiore":[`<p>Bardolino Superiore became a DOCG in 2001, for wines with more ageing and lower yields.</p>`,[]],
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
