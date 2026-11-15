// Full encyclopedia entries: Veneto. Written from each disciplinare di produzione (AIS copies of the official texts).
const VED = "https://aisitalia.it/Disciplinari/Veneto/";
function veSrc(d) {
  return ["Disciplinare di produzione (AIS copy of the official text)", VED + d.split("/").map(encodeURIComponent).join("/") + ".pdf"];
}
function ve(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [veSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const VE_VALPO_GRAPES = "Corvina and/or Corvinone 45 to 95%; Rondinella 5 to 30%; up to 25% others: non-aromatic red varieties of Verona up to 15% (10% each), plus Italian native red varieties for the remaining 10% (Oseleta, Molinara and others)";
const VE_VALPO_ZONE = "Marano, Fumane, Negrar, Sant'Ambrogio, San Pietro in Cariano, Dolcè, Verona, San Martino Buon Albergo, Lavagno, Mezzane, Tregnago, Illasi, Colognola ai Colli, Cazzano di Tramigna, Grezzana, Pescantina, Cerro Veronese, San Mauro di Saline, Montecchia di Crosara (all or part)";

// ---------- DOCG ----------
APXF["it-amarone-della-valpolicella"] = ve({
  lede: "The great dry red of Verona's hills, made from Corvina, Corvinone and Rondinella dried for months after harvest (appassimento), then fermented to at least 14% alcohol.",
  cat: "DOCG, red (dry, from dried grapes)", rec: "Recognized as a type within Valpolicella DOC 1968 (DOC 1990 as Amarone); DOCG 2010", d: "DOCG/Amarone della Valpolicella",
  amended: "Text as amended by DM 3 August 2023",
  facts: [["Zone", VE_VALPO_ZONE + "; 'Classico' for the historic western valleys, 'Valpantena' for the Valpantena valley"], ["Grapes", VE_VALPO_GRAPES], ["Yield", "12 t/ha; no more than 65% of the crop may be set aside to dry; 11% natural alcohol at harvest"], ["Drying", "Natural drying in fruttai; grapes must reach 14% potential alcohol; pressing not before 1 December unless the Region allows earlier"], ["Grape to wine", "40%"], ["Ageing", "At least 2 years from 1 January after the harvest; Riserva at least 4 years from 1 November of the harvest year"], ["At release", "At least 14% actual alcohol; residual sugar up to 9 g/L at 14%, rising slightly with higher alcohol"], ["Training", "Pergola veronese or pergoletta veronese common; densities set since 2010"]],
  place: "A fan of north-south valleys (Fumane, Marano, Negrar, Valpantena and the eastern valleys of Mezzane, Illasi and Tramigna) running down from the Lessini mountains to the Adige plain north of Verona. Soils are limestone, marl and basalt, with alluvial terraces lower down; the Classico area lies in the west.",
  rules: "The grapes are dried in lofts or warehouses (fruttai) for three to four months, losing 30 to 40% of their weight, which concentrates sugar, acid and flavour; long fermentation takes the wine dry. Vinification and ageing in the province of Verona. Wine left from the pomace is used for Ripasso.",
  history: "Recioto, the sweet wine of dried grapes, is the older tradition, praised by Cassiodorus in the 6th century. Amarone ('the big bitter one') emerged as a dry Recioto in the 1930s-50s; Bolla's first commercial label dates from 1950.",
  glass: "Deep ruby, dried cherry, plum, raisin, chocolate and spice; full body, high alcohol, velvety tannin, often a sweet impression from glycerol.",
  exam: "Appassimento, 14% minimum, 2 years (Riserva 4). Amarone is dry; Recioto della Valpolicella is the sweet counterpart; Ripasso refers wine over Amarone pomace.",
  producers: ["Giuseppe Quintarelli", "Romano Dal Forno", "Allegrini", "Bertani", "Masi", "Tommaso Bussola", "Speri", "Zýmē"]
});
APXF["it-recioto-della-valpolicella"] = ve({
  lede: "The sweet red of dried Valpolicella grapes, the ancestor of Amarone, still or sparkling.",
  cat: "DOCG, sweet red (also spumante)", rec: "DOC 1968; DOCG 2010", d: "DOCG/Recioto della Valpolicella",
  amended: "Text as amended by DM 3 August 2023",
  facts: [["Zone", "The Valpolicella zone; Classico and Valpantena allowed"], ["Grapes", VE_VALPO_GRAPES], ["Yield", "12 t/ha; up to 65% set aside to dry"], ["Drying", "To at least 14% potential alcohol; pressing normally not before 1 December"], ["Grape to wine", "40%"], ["At release", "At least 12% actual alcohol with at least 2.8% potential alcohol left as sugar"]],
  place: "The Valpolicella hills north of Verona.",
  rules: "Fermentation is stopped while sugar remains.",
  history: "The name may come from 'recie', the 'ears' or upper lobes of the bunch that ripen best and were dried; Cassiodorus described a sweet dried-grape wine of Verona (acinatico) in the 6th century.",
  glass: "Sweet, dense cherry, blackberry jam and spice with fresh acidity and tannin.",
  exam: "Sweet Recioto versus dry Amarone, same grapes and drying.",
  producers: ["Giuseppe Quintarelli", "Tommaso Bussola", "Allegrini"]
});
APXF["it-bardolino-superiore"] = ve({
  lede: "The aged, lower-yield version of Bardolino from the eastern shore of Lake Garda, a separate DOCG since 2001.",
  cat: "DOCG, red", rec: "DOCG 2001", d: "DOCG/Bardolino Superiore",
  facts: [["Grapes", "Corvina 35 to 80% (Corvinone may replace up to 20%); Rondinella 10 to 40%; Molinara up to 15%; other reds up to 20%"], ["Yield", "9 t/ha; 11% natural alcohol"], ["Ageing", "At least one year from 1 November of the harvest year"], ["Total alcohol", "12%"], ["Classico", "Allowed for the historic core"]],
  place: "Moraine hills along the Veronese shore of Lake Garda from Garda to Peschiera.",
  rules: "Vinification and ageing in the zone.",
  glass: "Light-bodied, cherry and spice, more depth than basic Bardolino.",
  exam: "Bardolino DOC is the base; Superiore is the DOCG.",
  producers: []
});
APXF["it-soave-superiore"] = ve({
  lede: "The hillside, lower-yield Soave, Garganega-based, with a Riserva; a DOCG since 2001.",
  cat: "DOCG, white", rec: "DOCG 2001", d: "DOCG/Soave Superiore",
  amended: "Text as amended by DM 24 October 2019",
  facts: [["Communes", "Hill parts of Soave, Monteforte d'Alpone, San Martino Buon Albergo, Mezzane di Sotto, Roncà, Montecchia di Crosara, San Giovanni Ilarione, Cazzano di Tramigna, Colognola ai Colli, Caldiero, Illasi, Lavagno"], ["Grapes", "Garganega at least 70%; Trebbiano di Soave and Chardonnay up to 30% (other whites up to 5% within that)"], ["Yield", "10 t/ha; 11% natural"], ["Grape to wine", "70%"], ["Release", "From 1 April of the year after the harvest; Riserva from 1 November of the year after"], ["Total alcohol", "12%; Riserva 12.5%"]],
  place: "Hills only, within the Soave zone east of Verona: volcanic basalt in the east (Monteforte) and limestone in the west.",
  rules: "Classico for the historic core around Soave and Monteforte.",
  glass: "Fuller Garganega: almond, pear, white flowers and a saline finish.",
  exam: "Soave Superiore DOCG versus Soave DOC (which includes the plain).",
  producers: ["Pieropan", "Inama", "Gini"]
});
APXF["it-recioto-di-soave"] = ve({
  lede: "Sweet white from dried Garganega, and Veneto's first DOCG (1998).",
  cat: "DOCG, sweet white (also spumante)", rec: "DOCG 1998", d: "DOCG/Recioto di Soave",
  amended: "Text as amended by DM 24 October 2019",
  facts: [["Grapes", "Garganega at least 70%; Trebbiano di Soave for the rest"], ["Yield", "9 t/ha"], ["Drying", "To at least 14% potential alcohol"], ["Grape to wine", "40% (spumante 42%)"], ["At release", "Total alcohol at least 14%, at least 11.5% actual"]],
  place: "The Soave hills.",
  rules: "Classico allowed for the historic zone.",
  glass: "Golden, apricot, honey and almond with lively acidity.",
  exam: "Recioto means a dried-grape sweet wine in Verona's tradition.",
  producers: ["Anselmi", "Pieropan", "Gini"]
});
APXF["it-recioto-di-gambellara"] = ve({
  lede: "Sweet dried-grape Garganega from Gambellara, on the Vicenza side of the Soave hills.",
  cat: "DOCG, sweet white (also spumante)", rec: "DOCG 2008", d: "DOCG/Recioto di Gambellara",
  facts: [["Grape", "Garganega 100%"], ["Communes", "Gambellara, Montebello Vicentino, Montorso, Zermeghedo (classico zone)"], ["Yield", "Up to 6.25 t/ha of the 12.5 t/ha Gambellara Classico yield can go to drying"], ["Drying", "To at least 14% potential alcohol"], ["Grape to wine", "40%"], ["At release", "Total alcohol 14%, at least 11 to 11.3% actual"]],
  place: "Volcanic hills next to Soave, in the province of Vicenza.",
  rules: "Classico and spumante types.",
  glass: "Honeyed, apricot, almond.",
  exam: "Gambellara is the Vicenza neighbour of Soave.",
  producers: []
});
APXF["it-conegliano-valdobbiadene-prosecco"] = ve({
  lede: "The hillside heart of Prosecco between Conegliano and Valdobbiadene: Glera from steep 'hogback' hills in 15 communes, with Rive single-village wines and the Cartizze cru.",
  cat: "DOCG, white sparkling, frizzante, still", rec: "DOC 1969; DOCG 2009", d: "DOCG/Conegliano Valdobbiadene - Prosecco",
  facts: [["Also labelled", "Conegliano - Prosecco or Valdobbiadene - Prosecco"], ["Communes", "Conegliano, San Vendemiano, Colle Umberto, Vittorio Veneto, Tarzo, Cison di Valmarino, San Pietro di Feletto, Refrontolo, Susegana, Pieve di Soligo, Farra di Soligo, Follina, Miane, Vidor, Valdobbiadene"], ["Grapes", "Glera at least 85%; Verdiso, Bianchetta Trevigiana, Perera, Glera Lunga up to 15%"], ["Yield", "13.5 t/ha"], ["Spumante", "Labelled 'Superiore'; may carry 'Rive' plus one of the listed village or hamlet names, or 'Superiore di Cartizze' from the Cartizze subzone"], ["Sui lieviti", "Bottle-refermented, released after at least 90 days on the lees, Brut Nature"], ["Hand harvest", "Compulsory for Cartizze, Rive and sui lieviti"]],
  place: "Steep glacial and marine ridges (hogbacks) in the province of Treviso, at the foot of the Prealps, with vines on gradients that need hand work. The Prosecco hills became a UNESCO World Heritage Site in 2019.",
  rules: "Most spumante is made by the tank (Martinotti) method. Base wine may be refreshed with a little wine from Pinot and Chardonnay grown in the zone as a traditional correction. Bottling in the zone, with exceptions for historic wineries in Treviso and Venice provinces.",
  history: "The Conegliano wine school (1876) and Carpenè Malvolti developed sparkling Glera. The 2009 reform moved the Prosecco name from the grape to a place, renamed the grape Glera and made this hill zone the DOCG.",
  glass: "Pear, green apple, acacia and wisteria; light, fine bubbles; dryness from Brut Nature to Dry.",
  exam: "Glera is the grape; Prosecco is the place. The DOCGs are Conegliano Valdobbiadene and Asolo; the DOC covers nine provinces. Rive = single villages (43); Cartizze is the top cru near Valdobbiadene.",
  producers: ["Bisol", "Nino Franco", "Adami", "Col Vetoraz", "Sorelle Bronca", "Casa Coste Piane", "Bortolomiol"]
});
APXF["it-colli-asolani-prosecco"] = ve({
  lede: "Prosecco from the hills around Asolo and the Montello, west of the Piave: the second Prosecco DOCG.",
  cat: "DOCG, white sparkling, frizzante, still", rec: "DOCG 2009", d: "DOCG/Asolo Prosecco o Asolo",
  amended: "Text as amended by DM 9 September 2024",
  facts: [["Also labelled", "Asolo"], ["Grapes", "Glera at least 85%; Verdiso, Bianchetta Trevigiana, Perera, Glera Lunga up to 15%"], ["Yield", "13.5 t/ha; 9.5% natural alcohol"], ["Spumante", "Labelled Superiore; 'sui lieviti' version Brut Nature, at least 90 days on the lees"]],
  place: "The Asolo hills and the Montello ridge in the province of Treviso.",
  rules: "Traditional correction with Pinot and Chardonnay from the zone allowed.",
  glass: "Fruity, floral Prosecco, often drier styles (Extra Brut is a local strength).",
  exam: "The smaller of the two Prosecco DOCGs.",
  producers: []
});
APXF["it-colli-di-conegliano"] = ve({
  lede: "Still wines from the Conegliano hills: a Manzoni-Pinot white, a Bordeaux blend red, sweet Refrontolo from Marzemino and the rare Torchiato di Fregona.",
  cat: "DOCG, white, red, sweet", rec: "DOC 1993; DOCG 2011", d: "DOCG/Colli di Conegliano",
  facts: [["Bianco", "Manzoni Bianco at least 30%; Pinot Bianco and/or Chardonnay at least 30%; Sauvignon and/or Riesling up to 10%"], ["Rosso", "Cabernet Franc, Cabernet Sauvignon, Marzemino and Merlot each at least 10% (Merlot no more than 40%); Incrocio Manzoni 2.15 and Refosco up to 20%"], ["Refrontolo", "Marzemino-based red, dry or passito"], ["Torchiato di Fregona", "Passito white of Glera, Verdiso and Boschera; grapes pressed not before 1 February; grape to wine 25%; total alcohol at least 18%"], ["Yield", "Bianco 10 t/ha; Rosso 9 t/ha"]],
  place: "The hills of the Conegliano Valdobbiadene area.",
  rules: "Refrontolo passito grape to wine 45%.",
  glass: "From fresh blends to honeyed Torchiato.",
  exam: "Refrontolo is a Marzemino wine; Torchiato di Fregona is one of Italy's rarest passiti.",
  producers: []
});
APXF["it-montello-rosso"] = ve({
  lede: "A Cabernet Sauvignon-led Bordeaux blend from the Montello and Asolo hills, home of the historic Venegazzù estate.",
  cat: "DOCG, red", rec: "DOCG 2011", d: "DOCG/Montello Rosso o Montello",
  facts: [["Also labelled", "Montello"], ["Grapes", "Cabernet Sauvignon 40 to 70%; Merlot, Cabernet Franc, Carmenère 30 to 60%"], ["Ageing", "18 months including 9 in oak and 6 in bottle; Superiore 24 months including 12 in oak and 6 in bottle, from 1 November"], ["Total alcohol", "12.5%; Superiore 13%"]],
  place: "The Montello, an isolated karst ridge by the Piave, and the hills of Asolo and Monte Grappa's foothills.",
  rules: "The DOC Asolo Montello covers other types.",
  history: "Count Piero Loredan made Venegazzù della Casa, a Bordeaux blend, from the 1950s, one of Italy's first.",
  glass: "Cassis, herbs, firm tannin.",
  exam: "A Bordeaux-blend DOCG in Veneto.",
  producers: ["Loredan Gasparini"]
});
APXF["it-piave-malanotte"] = ve({
  lede: "The Raboso Piave red of the Piave plain, partly from dried grapes, aged at least three years.",
  cat: "DOCG, red", rec: "DOCG 2010", d: "DOCG/Piave Malanotte Malanotte del Piave",
  amended: "Text as amended by DM 28 July 2017",
  facts: [["Also labelled", "Malanotte del Piave"], ["Grapes", "Raboso Piave at least 70%; Raboso Veronese up to 30% (up to 5% of other reds in its place)"], ["Dried grapes", "15 to 30% of the grapes dried"], ["Grape to wine", "65% fresh, 40% dried"], ["Ageing", "36 months including 12 in barrel and 4 in bottle, from 1 November"], ["Total alcohol", "12.5% actual"]],
  place: "The gravelly alluvial plain along the Piave in the provinces of Treviso and Venice.",
  rules: "Making and ageing in the zone.",
  glass: "Sour cherry, plum, spice; very high acidity and tannin softened by the dried grapes.",
  exam: "Raboso is famously tart ('raboso' = angry).",
  producers: []
});
APXF["it-bagnoli-friularo"] = ve({
  lede: "Raboso Piave from the plain south of Padua, traditionally picked late after St Martin's summer.",
  cat: "DOCG, red (also late-harvest and passito)", rec: "DOC 1995 (in Bagnoli); DOCG 2011", d: "DOCG/Bagnoli Friularo o Friularo di Bagnoli",
  facts: [["Also labelled", "Friularo di Bagnoli"], ["Grapes", "Raboso Piave at least 90%"], ["Communes", "Agna, Arre, Bagnoli di Sopra, Battaglia Terme, Bovolenta, Candiana, Due Carrare, Cartura, Conselve, Monselice, Pernumia, San Pietro Viminario, Terrassa, Tribano; Classico in Bagnoli di Sopra"], ["Ageing", "12 months; Riserva 24 months including 12 in barrel; passito 2 years in barrel"], ["Vendemmia tardiva", "At least 60% picked after 11 November"]],
  place: "Clay and silt soils of the Padua plain, worked historically by the Benedictines.",
  rules: "Dried grapes for passito not pressed before 8 December.",
  glass: "Tart, deep, tannic red.",
  exam: "Friularo is a local name for Raboso Piave.",
  producers: []
});
APXF["it-lison"] = ve({
  lede: "The Tai (Friulano) white of the eastern Veneto and western Friuli, formerly Tocai di Lison.",
  cat: "DOCG, white", rec: "DOC 1971 (as Tocai di Lison); DOCG 2010", d: "DOCG/Lison",
  facts: [["Grape", "Tai (Friulano) at least 85%"], ["Zone", "Communes of Venice (Annone Veneto, Pramaggiore, Portogruaro and others), Treviso (Meduna, part of Motta di Livenza) and Pordenone (Chions, Cordovado, Pravisdomini and others)"], ["Yield", "11 t/ha; Classico 10 t/ha (11.5% natural)"], ["Release", "From 1 January after the harvest"], ["Total alcohol", "12%; Classico 12.5%"]],
  place: "Flat, clay-rich land between the Livenza and Tagliamento rivers.",
  rules: "Spans two regions, Veneto and Friuli.",
  history: "The EU ruling that reserved 'Tokaji' for Hungary forced the renaming of Tocai to Tai in Veneto and Friulano in Friuli from 2007.",
  glass: "Almond, pear, herbs, round texture.",
  exam: "Tai = Friulano = formerly Tocai Friulano.",
  producers: []
});
APXF["it-colli-euganei-fior-d-arancio"] = ve({
  lede: "Aromatic Moscato Giallo from the volcanic Euganean Hills, sparkling, still or passito, smelling of orange blossom.",
  cat: "DOCG, aromatic white (still, spumante, passito)", rec: "DOCG 2010", d: "DOCG/Colli Euganei Fior d'Arancio o Fior d'Arancio Colli Euganei",
  facts: [["Grape", "Moscato Giallo at least 95%"], ["Communes", "All of Arquà Petrarca, Galzignano Terme, Torreglia; parts of 16 others near Padua"], ["Yield", "12 t/ha; 10% natural"], ["Passito", "Grape to wine 40%; total alcohol 15.5%"], ["Spumante", "Sweet, at least 6% actual alcohol"]],
  place: "Isolated volcanic cones south-west of Padua, with trachyte and limestone soils.",
  rules: "Vineyards planted after approval need at least 4,000 vines/ha.",
  glass: "Orange blossom, apricot, sage.",
  exam: "Fior d'Arancio means orange blossom.",
  producers: []
});

// ---------- DOC ----------
APXF["it-valpolicella"] = ve({
  lede: "The everyday red of the Valpolicella hills north of Verona, from Corvina, Corvinone and Rondinella, light and cherry-fresh or, as Superiore, more substantial.",
  cat: "DOC, red", rec: "DOC 1968", d: "DOC/Valpolicella",
  amended: "Text as amended by DM 3 August 2023",
  facts: [["Zone", VE_VALPO_ZONE], ["Mentions", "Classico (historic western valleys) and Valpantena; Superiore"], ["Grapes", VE_VALPO_GRAPES], ["Yield", "12 t/ha; 10% natural (11% for Superiore)"], ["Grape to wine", "70%"], ["Release", "From 1 January after the harvest; Superiore after at least one year of ageing"], ["Alcohol", "At least 11% actual; Superiore 12%"]],
  place: "The hill valleys between the Lessini mountains and the Adige.",
  rules: "The specification recognizes only 'Classico' and 'Valpantena' as geographic mentions.",
  glass: "Light ruby, sour cherry, almond and herbs; crisp acidity.",
  exam: "The base of the Valpolicella pyramid: Valpolicella, Ripasso, Amarone, Recioto.",
  producers: []
});
APXF["it-valpolicella-est"] = ve({
  lede: "'Valpolicella Est' is an informal name for the eastern valleys of the Valpolicella zone (Mezzane, Illasi, Tramigna and the hills towards Soave), not a legal subzone or label term.",
  cat: "Informal area within the Valpolicella DOC", rec: "Part of the zone extended in 1968; no separate recognition", d: "DOC/Valpolicella",
  facts: [["Parent appellation", "Valpolicella DOC (and Amarone, Recioto, Ripasso)"], ["Label mentions in the specification", "Only Classico and Valpantena"], ["Communes", "Includes Mezzane di Sotto, Illasi, Tregnago, Lavagno, Colognola ai Colli, Cazzano di Tramigna and others in the east of the zone"]],
  place: "Longer, wider valleys east of Verona with more alluvial and clay soils; Romano Dal Forno, in the Illasi valley, showed that these valleys can make world-class Amarone.",
  rules: "All Valpolicella rules apply; wines from here are labelled simply Valpolicella, Ripasso, Amarone or Recioto without 'Classico'.",
  glass: "Often riper and fuller than Classico wines.",
  exam: "There is no 'Valpolicella Est' DOC; only Classico and Valpantena are official mentions.",
  producers: ["Romano Dal Forno"]
});
APXF["it-valpolicella-ripasso"] = ve({
  lede: "Valpolicella re-fermented on the pomace left from Amarone or Recioto, a technique (ripasso) that adds body, alcohol and dried-fruit flavour.",
  cat: "DOC, red", rec: "DOC 2010 (practice long older)", d: "DOC/Valpolicella Ripasso",
  amended: "Text as amended by DM 3 August 2023",
  facts: [["Mentions", "Classico, Valpantena, Superiore"], ["Grapes", VE_VALPO_GRAPES], ["Method", "Valpolicella wine is refermented on unpressed Amarone or Recioto pomace from the same vintage; the pomace may contribute 10 to 15% of the volume"], ["Yield", "12 t/ha"], ["Release", "From 1 January of the second year after the harvest"], ["Alcohol", "At least 12.5% actual; Superiore 13%"]],
  place: "The Valpolicella zone.",
  rules: "Pomace must come from wineries' own Amarone and Recioto production.",
  history: "Masi's Campofiorin (1964) popularized the method commercially.",
  glass: "Cherry, plum, raisin and spice; between Valpolicella and Amarone in weight.",
  exam: "Ripasso = second fermentation on Amarone pomace.",
  producers: ["Zenato", "Speri", "Allegrini"]
});
APXF["it-soave"] = ve({
  lede: "Verona's famous white from Garganega, grown on volcanic and limestone hills and the plain east of the city, with Classico, Colli Scaligeri and 33 named sites (UGAs).",
  cat: "DOC, white (also spumante)", rec: "DOC 1968", d: "DOC/Soave",
  amended: "Text as amended by DM 24 October 2019 and a later EU implementing regulation",
  facts: [["Communes", "Soave, Monteforte d'Alpone, San Martino Buon Albergo, Mezzane di Sotto, Roncà, Montecchia di Crosara, San Giovanni Ilarione, San Bonifacio, Cazzano di Tramigna, Colognola ai Colli, Caldiero, Illasi, Lavagno"], ["Grapes", "Garganega at least 70%; Trebbiano di Soave and Chardonnay up to 30%"], ["Yield", "Soave, Classico and Colli Scaligeri 14 t/ha; 10% natural"], ["Release", "Soave from 1 December of the harvest year; Classico and Colli Scaligeri from 1 February after"], ["UGA", "33 named units, including Foscarino, Castelcerino, Monte Grande, Froscà, Fittà, Brognoligo, Rugate, Costeggiola"]],
  place: "Hills of basalt and volcanic tuff in the east (Monteforte, Roncà) and limestone in the west, with a large plain area added in the 20th century.",
  rules: "Classico for the historic hills around Soave and Monteforte; Colli Scaligeri for other hill areas. The UGA name may follow the denomination for wines from that unit.",
  glass: "Pale, almond, pear, white flowers, saline; the best age well.",
  exam: "Garganega at least 70%. Soave DOC, Soave Superiore DOCG, Recioto di Soave DOCG.",
  producers: ["Pieropan", "Inama", "Gini", "Suavia", "Coffele", "Filippi"]
});
APXF["it-bardolino"] = ve({
  lede: "Light red and pale Chiaretto rosé from Corvina on the eastern shore of Lake Garda, with three new subzones since 2021.",
  cat: "DOC, red, rosé (Chiaretto), sparkling", rec: "DOC 1968", d: "DOC/Bardolino",
  amended: "Text as amended by DM 2 April 2021",
  facts: [["Types", "Bardolino, Classico, Chiaretto (also spumante), Novello"], ["Subzones", "Montebaldo, La Rocca, Sommacampagna"], ["Grapes", "Corvina 35 to 95% (Corvinone may replace up to 20%); Rondinella 5 to 40%; others up to 20%, Molinara up to 15%"], ["Yield", "10 t/ha"], ["Novello", "100% carbonic maceration allowed"]],
  place: "Moraine amphitheatre hills along Garda's Veronese shore, with the lake moderating temperatures.",
  rules: "Chiaretto from short skin contact.",
  glass: "Pale ruby, red cherry, spice; Chiaretto delicate and citrusy.",
  exam: "Chiaretto di Bardolino is the rosé; the subzones date from 2021.",
  producers: ["Guerrieri Rizzardi", "Le Fraghe", "Zeni", "Corte Gardoni"]
});
APXF["it-bianco-di-custoza"] = ve({
  lede: "A blended white from the moraine hills south-east of Lake Garda, from Garganega, Trebbiano, Bianca Fernanda (Cortese) and Tai.",
  cat: "DOC, white (also superiore, riserva, spumante, passito)", rec: "DOC 1971 (as Bianco di Custoza)", d: "DOC/Custoza",
  facts: [["Grapes", "Bianca Fernanda (Cortese), Garganega, Trebbiano Toscano and Tai together at least 70%, none above 45%; up to 30% Malvasia, Riesling, Pinot Bianco, Chardonnay, Manzoni"], ["Communes", "Sommacampagna, Villafranca, Valeggio sul Mincio, Peschiera, Lazise, Castelnuovo del Garda, Pastrengo, Bussolengo, Sona"], ["Superiore", "At least 5 months from 1 November"], ["Riserva", "At least 12 months from 1 November"]],
  place: "The hills of the Garda moraine amphitheatre, scene of Risorgimento battles.",
  rules: "Released from 1 December of the harvest year.",
  glass: "Fresh, floral, almondy white.",
  exam: "Bianca Fernanda is the local name for Cortese.",
  producers: []
});
APXF["it-garda"] = ve({
  lede: "An inter-regional DOC around Lake Garda in Veneto and Lombardy, mostly for varietal and blended whites, sparkling and reds.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1996", d: "DOC/Garda",
  facts: [["Provinces", "Verona (Veneto); Brescia and Mantua (Lombardy)"], ["Types", "Bianco, rosso, rosato, many varietals (Garganega, Pinot Grigio, Chardonnay, Riesling, Cortese, Corvina, Merlot, Cabernet, Marzemino, Pinot Nero) and two-variety blends"]],
  place: "Hills around the southern half of Lake Garda.",
  rules: "Large yields; frizzante and spumante common.",
  glass: "Simple, fresh wines.",
  exam: "One of the DOCs crossing a regional boundary.",
  producers: []
});
APXF["it-delle-venezie"] = ve({
  lede: "The three-region Pinot Grigio DOC created in 2017 to bring Italy's biggest export white under appellation control.",
  cat: "DOC, white (Pinot Grigio), also bianco", rec: "DOC 2017", d: "DOC/Delle Venezie",
  facts: [["Zone", "Veneto, Friuli Venezia Giulia and the autonomous province of Trento"], ["Also labelled", "Beneških okolišev (Slovene)"], ["Grapes", "Pinot Grigio at least 85%; Chardonnay, Pinot Bianco, Müller-Thurgau, Garganega, Verduzzo, Friulano up to 15%"], ["Types", "Pinot Grigio (also ramato or rosato, frizzante, spumante); bianco"], ["Yield", "18 t/ha"]],
  place: "The plains and hills of north-east Italy.",
  rules: "Moved most Pinot Grigio out of the IGT category; IGT Pinot Grigio from the area was phased out.",
  glass: "Light, neutral, citrus and pear; ramato versions copper-tinged.",
  exam: "2017, Pinot Grigio, three regions.",
  producers: []
});
APXF["it-prosecco"] = ve({
  lede: "The large Prosecco DOC, from Glera grown in nine provinces of Veneto and Friuli, mostly as tank-method sparkling wine, and since 2020 also rosé.",
  cat: "DOC, white sparkling, frizzante, still; rosé spumante", rec: "DOC 2009", d: "DOC/Prosecco",
  amended: "Text as amended by DM 19 June 2023",
  facts: [["Provinces", "Treviso, Venice, Vicenza, Padua, Belluno (Veneto); Trieste, Gorizia, Udine, Pordenone (Friuli Venezia Giulia)"], ["Grapes", "Glera at least 85%; Verdiso, Bianchetta, Perera, Glera Lunga, Chardonnay, Pinot Bianco, Pinot Grigio, Pinot Nero (vinified white) up to 15%"], ["Rosé", "Glera 85 to 90%, Pinot Nero (vinified red) 10 to 15%; vintage-dated, Brut Nature to Extra Dry"], ["Yield", "18 t/ha; 9 to 9.5% natural"], ["Mentions", "Prosecco DOC Treviso and Prosecco DOC Trieste for wine from those provinces"]],
  place: "The plains and lower hills of north-east Italy; the village of Prosecco itself is near Trieste.",
  rules: "The 2009 reform tied the name to this area to protect it, renaming the grape Glera.",
  glass: "Pear, apple, white flowers; light and frothy.",
  exam: "The DOC is far larger than the two DOCGs; rosé is DOC only.",
  producers: []
});
APXF["it-lessini-durello"] = ve({
  lede: "Tank-method sparkling wine from the high-acid Durella grape on volcanic hills between Verona and Vicenza.",
  cat: "DOC, sparkling (Martinotti method)", rec: "DOC 1987 (within Monti Lessini); own DOC 2011", d: "DOC/Lessini Durello o Durello Lessini",
  amended: "Text as amended by DM 26 August 2024",
  facts: [["Also labelled", "Durello Lessini"], ["Grapes", "Durella at least 85%; Garganega, Pinot Bianco, Chardonnay, Pinot Nero up to 15%"], ["Zone", "Communes of Verona (Vestenanova, San Giovanni Ilarione and parts of others) and Vicenza (Arzignano, Chiampo and others)"], ["Natural alcohol", "9%"]],
  place: "Basalt hills of the Lessini mountains.",
  rules: "Traditional-method Durello is labelled Monti Lessini.",
  glass: "Very crisp, lemony sparkling wine.",
  exam: "Durella has extreme acidity, ideal for sparkling wine.",
  producers: []
});
APXF["it-monti-lessini"] = ve({
  lede: "The Lessini mountains DOC for traditional-method Durello sparkling wine, still Durello, Pinot Nero and a Chardonnay white.",
  cat: "DOC, sparkling, white, red", rec: "DOC 1987", d: "DOC/Monti Lessini",
  facts: [["Types", "Bianco, Durello (also passito), Pinot Nero, Spumante, Spumante Riserva, Spumante 'crémant'"], ["Grapes", "Durello and spumante: Durella at least 85%. Bianco: Chardonnay at least 50%"], ["Spumante", "Traditional method, at least 18 months on the lees; Riserva 36 months"]],
  place: "The same volcanic hills as Lessini Durello.",
  rules: "The crémant style has lower pressure and under 50 g/L sugar.",
  glass: "Steely, citrus and bread notes.",
  exam: "Monti Lessini = metodo classico Durello; Lessini Durello = Martinotti.",
  producers: []
});
APXF["it-gambellara"] = ve({
  lede: "Garganega from four communes on the Vicenza side of the Soave hills.",
  cat: "DOC, white, Vin Santo, sparkling", rec: "DOC 1970", d: "DOC/Gambellara",
  facts: [["Communes", "Gambellara, Montebello Vicentino, Montorso, Zermeghedo"], ["Grapes", "Garganega at least 80%; Pinot Bianco, Chardonnay, Trebbiano di Soave up to 20%"], ["Vin Santo", "Grapes dried to 16%; grape to wine 40%; two years from 1 January"], ["Classico yield", "12.5 t/ha"]],
  place: "Volcanic hills adjoining Soave.",
  rules: "Superiore and Classico types.",
  glass: "Almondy, mineral white.",
  exam: "Gambellara also has a Recioto DOCG.",
  producers: []
});
APXF["it-breganze"] = ve({
  lede: "A DOC in the foothills north of Vicenza, best known for Torcolato, a sweet wine from dried Vespaiola grapes.",
  cat: "DOC, white, red, sweet", rec: "DOC 1969", d: "DOC/Breganze",
  facts: [["Types", "Bianco, Rosso, Tai, Pinot Bianco, Pinot Grigio, Vespaiolo (also spumante), Torcolato, Chardonnay, Sauvignon, Pinot Nero, Marzemino, Merlot, Cabernet"], ["Torcolato", "Vespaiola grapes dried to at least 14% potential alcohol, pressed by the end of February; grape to wine 50% at most; total alcohol 14%"]],
  place: "Volcanic and moraine hills at the foot of the Asiago plateau.",
  rules: "Superiore versions from riper grapes.",
  history: "Torcolato takes its name from bunches twisted (torcolati) around strings to hang and dry.",
  glass: "Torcolato: honey, apricot, with Vespaiola's sharp acidity.",
  exam: "Vespaiola and Torcolato.",
  producers: ["Maculan"]
});
APXF["it-colli-berici"] = ve({
  lede: "The hills south of Vicenza, for many varietals, notably Tai Rosso (Grenache) and the Barbarano subzone.",
  cat: "DOC, white, red, sparkling", rec: "DOC 1973", d: "DOC/Colli Berici",
  facts: [["Types", "Bianco, Rosso, spumante metodo classico, Garganega, Tai, Sauvignon, Pinots, Chardonnay, Manzoni, Tai Rosso, Merlot, Cabernets, Carmenère"], ["Subzone", "Barbarano (Rosso, also spumante and riserva)"], ["Spumante", "At least 15 months on the lees; vintage-dated with 30 months"]],
  place: "Limestone hills with karst features south of Vicenza.",
  rules: "Rosso yield 15 t/ha; Superiore and Riserva lower.",
  glass: "Tai Rosso: light, red-fruited Grenache.",
  exam: "Tai Rosso = Grenache.",
  producers: []
});
APXF["it-colli-euganei"] = ve({
  lede: "The volcanic Euganean Hills near Padua, for Bordeaux-style reds and whites including Serprino (Glera).",
  cat: "DOC, white, red, sparkling", rec: "DOC 1969", d: "DOC/Colli Euganei",
  facts: [["Types", "Bianco, Rosso (also riserva), Garganega, Tai, Sauvignon, Pinot Bianco, Chardonnay, Manzoni, Pinello, Serprino, Merlot, Cabernets, Carmenère, Raboso, Moscato"], ["Riserva", "24 months from 1 November"]],
  place: "Trachyte and limestone volcanic hills.",
  rules: "Serprino is the local name for Glera; Pinello from Pinella.",
  glass: "Reds with herbal Cabernet character.",
  exam: "Fior d'Arancio is the DOCG of the same hills.",
  producers: ["Vignalta"]
});
APXF["it-asolo-montello"] = ve({
  lede: "The still-wine DOC of the Asolo and Montello hills, including Venegazzù and Recantina.",
  cat: "DOC, white, red, sparkling", rec: "DOC 1977", d: "DOC/Asolo Montello o Montello Asolo",
  facts: [["Also labelled", "Montello Asolo"], ["Types", "Bianco, Bianchetta, Chardonnay, Pinots, Manzoni, Rosso, Merlot, Cabernets, Carmenère, Recantina, Venegazzù"], ["Rosso", "Cabernet Sauvignon 40 to 70%; Merlot, Cabernet Franc, Carmenère 30 to 60%"]],
  place: "Hills of the province of Treviso west of the Piave.",
  rules: "Venegazzù released from 1 September after the harvest.",
  glass: "Herbal Bordeaux-style reds.",
  exam: "Recantina is a revived local red grape.",
  producers: []
});
APXF["it-piave"] = ve({
  lede: "The plain along the Piave river in Treviso and Venice, for Merlot, Cabernet, Raboso and Verduzzo.",
  cat: "DOC, red, white, passito", rec: "DOC 1971", d: "DOC/Piave",
  facts: [["Types", "Rosso (Merlot at least 50%), Cabernet, Carmenère, Merlot, Raboso (also passito), Tai, Verduzzo (also passito), Chardonnay, Manzoni"], ["Yields", "11 to 13 t/ha"], ["Raboso", "24 months from 1 November"]],
  place: "Alluvial gravels of the Piave plain.",
  rules: "Raboso Malanotte is the separate DOCG.",
  glass: "Herbaceous Bordeaux varieties; tart Raboso.",
  exam: "Piave DOC versus Piave Malanotte DOCG.",
  producers: []
});
APXF["it-lison-pramaggiore"] = ve({
  lede: "The DOC of the eastern Venetian plain bordering Friuli, for Bordeaux varieties, Refosco, Verduzzo and Malbech.",
  cat: "DOC, red, white, passito", rec: "DOC 1985 (Tocai di Lison 1971)", d: "DOC/Lison-Pramaggiore",
  facts: [["Provinces", "Venice, Treviso, Pordenone"], ["Types", "Bianco, Rosso, Chardonnay, Sauvignon, Verduzzo, Merlot, Malbech, Cabernet, Carmenère, Refosco, spumante"], ["Yields", "12 to 13 t/ha"]],
  place: "Clay plains between the Livenza and Tagliamento.",
  rules: "The Tai white is now Lison DOCG.",
  glass: "Soft reds, fresh whites.",
  exam: "One of the few Italian DOCs with Malbech.",
  producers: []
});
APXF["it-venezia"] = ve({
  lede: "A broad DOC for the provinces of Venice and Treviso created in 2011, for varietals, blends and sparkling wines.",
  cat: "DOC, red, white, rosé, sparkling", rec: "DOC 2010 (DM 22 December 2010)", d: "DOC/Venezia",
  facts: [["Types", "Rosso, Merlot, Cabernets, Carmenère, Malbech, Refosco, Pinot Nero, Chardonnay, Manzoni, Sauvignon, Verduzzo, Pinot Bianco, Traminer, Tai, Pinot Grigio, Bianco, spumante, rosato, Raboso"], ["Yields", "Reds 16 t/ha; whites 15 t/ha"]],
  place: "The plains around the Venetian lagoon.",
  rules: "Riserva versions with lower yields.",
  glass: "Light, simple wines.",
  exam: "A large regional catch-all.",
  producers: []
});
APXF["it-vicenza"] = ve({
  lede: "A province-wide DOC for Vicenza, covering varietals, blends and sparkling wines.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 2000", d: "DOC/Vicenza",
  amended: "Text as amended by DM 15 March 2024",
  facts: [["Types", "Bianco, rosso, rosato, Moscato spumante, Chardonnay, Garganega, Riesling, Sauvignon, Manzoni, Pinots, Cabernet, Merlot, Raboso"], ["Passito", "Grapes dried to 16%"]],
  place: "The plains and hills of Vicenza province.",
  rules: "Riserva reds aged two years from 1 November.",
  glass: "Simple, fresh wines.",
  exam: "Province-wide DOC.",
  producers: []
});
APXF["it-vigneti-della-serenissima"] = ve({
  lede: "A traditional-method sparkling DOC for the hill and mountain vineyards of five Veneto provinces.",
  cat: "DOC, traditional-method sparkling", rec: "DOC 2011", d: "DOC/Vigneti della Serenissima o Serenissima",
  facts: [["Also labelled", "Serenissima"], ["Grapes", "Chardonnay, Pinot Bianco, Pinot Nero"], ["Provinces", "Hills and mountains of Belluno, Treviso, Padua, Vicenza, Verona"], ["Lees ageing", "12 months; rosé 12; millesimato 24; riserva 36"], ["Grape to wine", "65%"]],
  place: "Higher-altitude vineyards across Veneto.",
  rules: "Second fermentation in bottle only.",
  glass: "Crisp, bready sparkling wine.",
  exam: "Veneto's metodo classico DOC.",
  producers: []
});
APXF["it-valdadige-terradeiforti"] = ve({
  lede: "A small DOC in the Adige valley on the Veneto-Trentino border for two rare reds, Enantio and Casetta.",
  cat: "DOC, red, white", rec: "DOC 2006", d: "DOC/Valdadige Terradeiforti o Terradeiforti",
  facts: [["Also labelled", "Terradeiforti"], ["Types", "Enantio (also riserva), Casetta (also riserva), Pinot Grigio (also superiore)"], ["Grapes", "Each at least 85% of the named variety"], ["Ageing", "Enantio and Casetta 10 months; Riserva 36 months; Pinot Grigio 4 months; superiore 10 months, from 1 November"]],
  place: "The narrow Adige valley near Brentino Belluno and Avio, guarded by Habsburg-era forts (hence Terra dei Forti).",
  rules: "Communes in the provinces of Verona and Trento.",
  history: "Enantio (Lambrusco a foglia frastagliata) is an ungrafted pre-phylloxera survivor in places.",
  glass: "Dark, wild, tannic reds.",
  exam: "Enantio and Casetta are native varieties found almost only here.",
  producers: []
});
APXF["it-arcole"] = ve({
  lede: "A plain DOC between Verona and Vicenza, for Garganega, Pinot Grigio, Merlot and a red from partly dried grapes, Arcole Nero.",
  cat: "DOC, white, red, rosé", rec: "DOC 2000", d: "DOC/Arcole",
  amended: "Text as amended by DM 3 July 2023",
  facts: [["Types", "Bianco, Rosso, Rosato, Pinot Grigio, Garganega, Chardonnay, Merlot, Nero"], ["Nero", "At least 50% of grapes naturally dried at least 30 days; grape to wine 45%; released from 1 November after the harvest"]],
  place: "Flat land near the town of Arcole, site of Napoleon's 1796 battle.",
  rules: "Varietals at least 85%.",
  glass: "Simple whites; richer Nero.",
  exam: "Named after Napoleon's battle of the bridge of Arcole.",
  producers: []
});
APXF["it-bagnoli-di-sopra"] = ve({
  lede: "A DOC south of Padua with rare local grapes and a fortified Vin da Viajo.",
  cat: "DOC, white, red, rosé, sparkling, fortified", rec: "DOC 1995", d: "DOC/Bagnoli di Sopra o Bagnoli",
  facts: [["Also labelled", "Bagnoli"], ["Types", "Bianco, Rosso, Rosato, Merlot, Cabernets, Carmenère, Turchetta, Refosco, Marzemina Bianca, Corbina, Cavrara, Vin da Viajo, Spumante"], ["Riserva", "24 months including 12 in oak"]],
  place: "The Padua plain around Bagnoli di Sopra.",
  rules: "Classico for the historic core.",
  glass: "Light reds; rustic local grapes.",
  exam: "Friularo became a DOCG of its own.",
  producers: []
});
APXF["it-corti-benedettine-del-padovano"] = ve({
  lede: "A DOC of the southern Padua and Venice plain named after Benedictine monastic estates.",
  cat: "DOC, white, red, sparkling, passito", rec: "DOC 2004", d: "DOC/Corti Benedettine del Padovano",
  facts: [["Types", "Bianco, Rosso, Merlot, Cabernet, Raboso (also passito), Refosco, Pinots, Chardonnay, Sauvignon, Tai, Moscato spumante, Passito (Moscato Giallo)"], ["Riserva", "2 years including 6 months in wood"]],
  place: "Reclaimed plain once farmed by monasteries.",
  rules: "Varietals at least 85%.",
  glass: "Simple, fresh wines.",
  exam: "Monastic history of the Po plain.",
  producers: []
});
APXF["it-riviera-del-brenta"] = ve({
  lede: "A DOC along the Brenta canal between Padua and Venice, land of Palladian villas.",
  cat: "DOC, white, red, sparkling", rec: "DOC 2004", d: "DOC/Riviera del Brenta",
  facts: [["Types", "Bianco, Rosso, spumante, Merlot, Cabernet, Raboso, Refosco, Pinots, Chardonnay, Tai"], ["Riserva", "At least 6 months in wood"]],
  place: "The plain of the Riviera del Brenta.",
  rules: "Varietals at least 85%.",
  glass: "Light wines.",
  exam: "Rarely seen outside the area.",
  producers: []
});
APXF["it-merlara"] = ve({
  lede: "A small DOC on the plain between Padua and Verona, for whites, reds and Marzemino frizzante.",
  cat: "DOC, white, red", rec: "DOC 2000", d: "DOC/Merlara",
  facts: [["Types", "Bianco, Tai, Malvasia, Chardonnay, Pinots, Riesling, Rosso, Merlot, Cabernets, Refosco, Raboso, Marzemino frizzante"]],
  place: "The Adige plain.",
  rules: "Rosso novello with carbonic maceration of at least 70% of grapes.",
  glass: "Light wines.",
  exam: "Minor DOC.",
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
"it-amarone-della-valpolicella":[`<p>${CASS} For centuries the prized wine was sweet Recioto. The famous story says that in 1936 Adelino Lucchese, cellar master of the new Cantina Sociale Valpolicella, tasted a forgotten barrel of Recioto that had fermented dry and declared it not 'amaro', bitter, but 'amarone'. Archive research published in 2026 complicates the legend: the cooperative, founded in 1933 by Pieralvise Serego Alighieri, a descendant of Dante, Giambattista Rizzardi and others, already listed Amarone from the 1933, 1934 and 1935 vintages in its inventory, so the dry wine was a deliberate project to give Valpolicella a typical wine in quantity. The oldest certified bottle is Bolla's 1950 vintage, bottled in 1953 for the eightieth birthday of Alberto Bolla, which began its commercial rise. Giuseppe Quintarelli and Romano Dal Forno later made it a cult wine. Amarone was a type within Valpolicella from 1968, gained its own name in 1990 and became a DOCG in 2010. Its rapid growth since the 1990s, when production doubled in a few years, led the consortium to debate yields and the spread of drying on the plains.</p>`,[["WineNews: Amarone, not a lucky mistake (2026)", "https://winenews.it/en/amarone-della-valpolicella-not-from-a-lucky-mistake-but-from-a-project-on-typicity_580898"], ["Corriere: oldest certified Amarone, 1950", "https://www.corriere.it/cook/vini/25_gennaio_28/consorzio-valpo-100anni-73f97622-db1e-11ef-b155-039ee730d6e4.shtml"]]],
"it-recioto-della-valpolicella":[`<p>${CASS} The name may come from 'recie', the 'ears', the upper lobes of the bunch that ripen best and were set aside for drying. Grapes are dried for months on racks in lofts (fruttai) before slow fermentation leaves a sweet, powerful red. It was recognised in 1968 and became a DOCG in 2010.</p>`,[]],
"it-valpolicella":[`<p>The name is often explained as 'valley of many cellars' (val polis cellae), though that is probably folk etymology. The historic Classico zone covers the valleys of Fumane, Marano and Negrar and the communes around them, where the della Scala lords of Verona and later Venetian nobles built villas. The DOC of 1968 added the Valpantena and eastern valleys, and the post-war boom in light, cheap Valpolicella damaged the name until Ripasso and Amarone restored its prestige.</p>`,[]],
"it-valpolicella-est":[`<p>The eastern valleys, such as Mezzane, Illasi and Tramigna, were added to Valpolicella in 1968. Producers such as Romano Dal Forno at Illasi showed they could rival the Classico zone.</p>`,[]],
"it-valpolicella-ripasso":[`<p>Ripasso, re-passing young Valpolicella over the pomace left from Amarone or Recioto, is an old farm practice. Masi's Campofiorin, first made in 1964, popularised it commercially, and it was recognised as its own DOC in 2010.</p>`,[]],
"it-soave":[`<p>Soave grew up below the castle of the della Scala lords of Verona. In 1931 a royal decree delimited the Soave Classico zone, one of the first such delimitations in Italy. The DOC of 1968 extended the zone to the plains, and the flood of cheap Soave that followed hurt its reputation. Leonildo Pieropan, who made Calvarino from 1971, the first Italian white named for a single vineyard, and Roberto Anselmi, who left the DOC in protest in 2000, led the revival. In 2019 Soave approved 33 named crus (unità geografiche aggiuntive) on its volcanic and limestone hills.</p>`,[["Soave DOC disciplinare (1931 Classico zone)", "https://www.ilsoave.com/wp-content/uploads/2020/11/Soave-DOC-consolidato-definitivo.pdf"], ["Pieropan: Calvarino", "https://www.pieropan.it/en/wines/calvarino"]]],
"it-soave-superiore":[`<p>Soave Superiore became a DOCG in 2001, limited to the hills, an attempt to separate the best Soave from the plains.</p>`,[]],
"it-recioto-di-soave":[`<p>Recioto di Soave, made from dried Garganega, has been praised since the Middle Ages and was the Veneto's first DOCG, in 1998.</p>`,[]],
"it-gambellara":[`<p>Gambellara, next to Soave on the border of the provinces of Vicenza and Verona, grows Garganega on dark volcanic soils. It became a DOC in 1970.</p>`,[]],
"it-recioto-di-gambellara":[`<p>Gambellara's growers have dried Garganega for sweet wine for centuries, and also made a rare Vin Santo. Recioto di Gambellara became a DOCG in 2008.</p>`,[]],
"it-bardolino":[`<p>Bardolino, on the eastern shore of Lake Garda, makes light reds and the pink Chiaretto from Corvina, wines once drunk by the Venetian and Austrian rulers who summered on the lake. It became a DOC in 1968, and rules published in 2021 recognised three subzones, La Rocca, Montebaldo and Sommacampagna, were recognised.</p>`,[]],
"it-bardolino-superiore":[`<p>Bardolino Superiore became a DOCG in 2001, the first red DOCG of the Veneto, for wines with more ageing and lower yields.</p>`,[]],
"it-bianco-di-custoza":[`<p>Custoza, south of Lake Garda, was the scene of two battles of the Risorgimento, in 1848 and 1866, both won by Austria; an ossuary marks the site. Its white wine became a DOC in 1971.</p>`,[]],
"it-garda":[`<p>The Garda DOC, created in 1996, crosses the border between the Veneto and Lombardy around Lake Garda, Italy's largest lake.</p>`,[]],
"it-conegliano-valdobbiadene-prosecco":[`<p>The name Prosecco comes from a village near Trieste, where a wine called Pucino was praised by Pliny. In the hills between Conegliano and Valdobbiadene, Antonio Carpenè founded Carpenè Malvolti in 1868 to make sparkling wine, and Italy's first school of oenology opened at Conegliano in 1876. The tank method developed by Federico Martinotti and Eugène Charmat made Prosecco possible on a large scale. In 2009 the government created a vast Prosecco DOC across the Veneto and Friuli, including the village of Prosecco, to protect the name, and made the original hills a DOCG. In 2019 the hills were inscribed as a UNESCO World Heritage site, with the steep Cartizze and the 'Rive' as their best sites.</p>`,[["Istituto Cerletti: la storia", "https://cerletti.edu.it/la-scuola/la-storia"]]],
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
