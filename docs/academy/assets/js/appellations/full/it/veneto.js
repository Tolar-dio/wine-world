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
