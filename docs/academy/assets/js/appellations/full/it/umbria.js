// Full encyclopedia entries: Umbria. Written from each disciplinare di produzione (AIS copies).
function umSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Umbria/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function um(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [umSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const UM_SPOLETO_2025 = ["Wine Industry Advisor: Spoleto DOC amendments (December 2025)", "https://wineindustryadvisor.com/2025/12/04/spoleto-doc-the-consorzio-tutela-vini-montefalco-formalises-the-amendments-to-the-production-regulations-and-works-on-expanding-the-production-area/"];
const UM_ORVIETO_2025 = ["Doctor Wine: Orvieto DOC at 10% (2025)", "https://www.doctorwine.wine/pot-pourri-en/orvieto-doc-at-10-degrees/?lang=en"];
APXF["it-montefalco-sagrantino"] = um({
  lede: "Pure Sagrantino from the hills around Montefalco: one of the most tannic red wines in the world, made dry (Secco) or as a sweet passito, the older style.",
  cat: "DOCG, red (Secco and Passito)", rec: "DOC 1979; DOCG 1992 (DM 5 November 1992)", d: "DOCG/Montefalco Sagrantino",
  amended: "Text as amended by DM 3 July 2023",
  facts: [["Grape", "Sagrantino 100%"], ["Zone", "All of Montefalco and parts of Bevagna, Gualdo Cattaneo, Castel Ritaldi and Giano dell'Umbria (province of Perugia)"], ["Yield", "8 t/ha; 12.5% natural (Passito grapes 13.5% before drying)"], ["Grape to wine", "Secco 65% (52 hl/ha); Passito 35% of fresh grapes (28 hl/ha)"], ["Ageing", "At least 33 months from 1 December of the harvest, including 12 months in wood for the Secco, then at least 4 months in bottle"], ["Total alcohol", "Secco 13% (13.5% with a 'Vigna' name); Passito 18%"], ["Bottling", "Vinification, ageing and bottling inside the zone, with named exceptions for historic bottlers"]],
  place: "A hill town in the Valle Umbra between Assisi and Spoleto: clay, limestone and sand at 220 to 470 m, with hot dry summers.",
  rules: "The 33-month rule (from 1 December) means the Secco reaches the market about three years after the vintage.",
  history: "Sagrantino was long made only as a sweet passito for feast days. The dry style became the standard from the 1970s and 1980s, led by producers such as Arnaldo Caprai.",
  glass: "Opaque purple, blackberry, plum, clove and earth, huge tannin and grip that needs years or a meal; the Passito is red, sweet and still tannic.",
  exam: "Sagrantino is often cited as the most tannic grape; 100% varietal; 33 months minimum ageing.",
  producers: ["Arnaldo Caprai", "Paolo Bea", "Antonelli San Marco", "Tabarrini", "Perticaia", "Scacciadiavoli", "Adanti"]
});
APXF["it-montefalco"] = um({
  lede: "The DOC around Montefalco for a Sangiovese-Sagrantino red (Montefalco Rosso), its Riserva, and whites from Trebbiano Spoletino and Grechetto.",
  cat: "DOC, red and white", rec: "DOC 1979 (DPR 30 October 1979)", d: "DOC/Montefalco",
  amended: "Text as amended by DM 3 July 2023",
  facts: [["Rosso", "Sangiovese 60 to 80%; Sagrantino 10 to 25%; other non-aromatic reds"], ["Bianco", "Trebbiano Spoletino at least 50%"], ["Grechetto", "Grechetto at least 85%; 12 t/ha"], ["Rosso release", "From 1 May of the second year after the harvest, after at least 18 months"], ["Riserva", "From 1 May of the third year, after at least 30 months including 12 in wood"], ["Ageing count", "From 1 November of the harvest year"]],
  place: "The same hills as Montefalco Sagrantino, extending over neighbouring communes.",
  rules: "Rosso is the producers' earlier-drinking wine; the Sagrantino share adds tannin and colour.",
  glass: "Cherry, plum, spice; firmer than most Sangiovese blends.",
  exam: "Montefalco Rosso = Sangiovese 60 to 80% plus Sagrantino 10 to 25%.",
  producers: ["Arnaldo Caprai", "Antonelli San Marco", "Tabarrini", "Paolo Bea"]
});
APXF["it-spoleto"] = um({
  lede: "The DOC for Trebbiano Spoletino, a distinct, late-ripening, high-acid white of the Spoleto area, now allowed skin maceration and a Riserva.",
  cat: "DOC, white (still, passito, sparkling)", rec: "DOC 2011 (DM 27 June 2011)", d: "DOC/Spoleto",
  amended: "Text as amended by DM 2 February 2015; further amended in 2025 (see below)",
  sources: [UM_SPOLETO_2025],
  facts: [["Grape", "Trebbiano Spoletino at least 85% for the varietal types"], ["Types (AIS text)", "Bianco, Trebbiano Spoletino, Superiore, Passito, Spumante"], ["2025 changes", "Bianco and Superiore removed; Riserva added (at least 85% Trebbiano Spoletino, 11 t/ha); 400 m altitude cap removed; skin maceration allowed; 'Umbria' may appear on the label"], ["Passito", "Grape to wine 40%; total alcohol 17%, 14% actual"], ["Total alcohol", "11% to 12.5% by type"]],
  place: "Hills and plain of the Valle Umbra from Spoleto toward Montefalco and Trevi, where old Trebbiano Spoletino vines were traditionally trained high on maples (vite maritata).",
  rules: "A further amendment to extend the zone into parts of Bevagna, Gualdo Cattaneo and Giano dell'Umbria was begun in 2025; its status was unclear at the date checked.",
  glass: "Bright acidity, citrus, green herbs, almond; gains texture and petrol-like notes with age.",
  exam: "Trebbiano Spoletino is not Trebbiano Toscano; skin contact now permitted.",
  producers: ["Tabarrini", "Antonelli San Marco", "Collecapretta", "Cantina Fratelli Pardi"]
});
APXF["it-torgiano-rosso-riserva"] = um({
  lede: "The aged Sangiovese of the single commune of Torgiano south of Perugia, the wine that made Lungarotti's name and gained DOCG status in 1990.",
  cat: "DOCG, red", rec: "DOC 1968 (as Torgiano); DOCG 1990 (DPR 20 October 1990)", d: "DOCG/Torgiano Rosso Riserva",
  amended: "Text as amended by DM 3 July 2023",
  facts: [["Grapes", "Sangiovese 70 to 100%; other non-aromatic reds up to 30%"], ["Zone", "The commune of Torgiano (province of Perugia)"], ["Yield", "8 t/ha; 12% natural; grape to wine 65%"], ["Ageing", "At least 36 months from 1 November of the harvest, including 12 in wood and 6 in bottle"], ["Total alcohol", "12.5%"], ["Bottle", "Burgundy-shaped bottles"]],
  place: "Low hills where the Tiber meets the Chiascio, below Perugia.",
  rules: "One of Italy's smallest DOCGs by area, a single commune; Lungarotti's Rubesco Vigna Monticchio is its benchmark.",
  glass: "Garnet, dried cherry, leather, tobacco, firm acidity; ages decades.",
  exam: "Torgiano Rosso Riserva DOCG: Sangiovese at least 70%, 3 years ageing.",
  producers: ["Lungarotti", "Terre Margaritelli"]
});
APXF["it-torgiano"] = um({
  lede: "The DOC of the commune of Torgiano for red, white, rosé, varietals, sparkling, late harvest and Vin Santo.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 1968 (DPR 20 March 1968)", d: "DOC/Torgiano",
  amended: "Text as amended by DM 3 July 2023",
  facts: [["Rosso di Torgiano", "Sangiovese 50 to 100%"], ["Bianco di Torgiano", "Trebbiano Toscano 20 to 70%"], ["Types", "Bianco, Rosso, Rosato, Merlot, Chardonnay, Pinot Grigio, Riesling Italico, Cabernet Sauvignon, Pinot Nero, Spumante, Spumante Rosé, Vendemmia Tardiva, Vin Santo"], ["Vin Santo", "Grape to wine 35%; total alcohol 16%; released from 1 November of the third year after harvest"], ["Vendemmia Tardiva", "14% natural; total 14%, 11.5% actual"]],
  place: "The commune of Torgiano, province of Perugia.", rules: "Spumante rests on the lees within the province of Perugia.", glass: "Fresh Sangiovese reds; light Trebbiano-based whites.", exam: "Its Riserva red is a separate DOCG.", producers: ["Lungarotti"]
});
APXF["it-orvieto"] = um({
  lede: "Umbria's best-known white, from Grechetto and Procanico (Trebbiano Toscano) on the tuff around Orvieto, made dry to sweet, including a noble-rot 'muffa nobile'.",
  cat: "DOC, white (secco to dolce, late harvest, muffa nobile)", rec: "DOC 1971 (DPR 7 August 1971)", d: "DOC/Orvieto",
  amended: "Text as amended by DM 3 July 2023",
  sources: [UM_ORVIETO_2025],
  facts: [["Grapes", "Trebbiano Toscano (Procanico) and Grechetto together at least 60%; others up to 40%"], ["Subzone", "Orvieto Classico (the historic core)"], ["Zone", "Orvieto, Allerona, Alviano, Baschi, Castel Giorgio, Castel Viscardo, Ficulle, Guardea, Montecchio, Fabro, Montegabbione, Monteleone d'Orvieto, Porano (Terni) and Castiglione in Teverina, Civitella d'Agliano, Graffignano, Lubriano, Bagnoregio (Viterbo, Lazio)"], ["Styles", "Secco, abboccato, amabile, dolce; Superiore; Vendemmia tardiva (Superiore only); Muffa nobile"], ["Yields", "11 t/ha; Superiore 8; late harvest 7; muffa nobile 5"], ["Natural alcohol", "10%; Superiore 11.5% and released after 1 March"], ["2025", "Italy approved lowering the minimum alcohol to 10% (published 15 May 2025), pending EU approval at last report"]],
  place: "Volcanic tuff cliffs around Orvieto and the clay and sand of the Paglia valley; mists from Lake Corbara favour botrytis.",
  rules: "Vinification is allowed in Umbria and Lazio cellars under a 1992 decree; grape to wine 70%.",
  history: "Orvieto was historically an abboccato (lightly sweet) wine aged in tuff caves; most is now dry.",
  glass: "Pale, pear, almond, gentle; Muffa Nobile golden, apricot and honey.",
  exam: "Crosses into Lazio; Procanico = Trebbiano Toscano; Muffa nobile = botrytis.",
  producers: ["Barberani", "Palazzone", "Decugnano dei Barbi", "Castello della Sala (Antinori)", "Bigi"]
});
APXF["it-rosso-orvietano"] = um({
  lede: "Reds and varietals from the Orvieto area of Umbria.",
  cat: "DOC, red", rec: "DOC 1998 (DM 31 August 1998)", d: "DOC/Rosso Orvietano o Orvietano Rosso",
  amended: "Text as amended by DM 3 July 2023",
  facts: [["Also labelled", "Orvietano Rosso"], ["Rosso", "Aleatico, Cabernet Franc, Cabernet Sauvignon, Canaiolo, Ciliegiolo, Merlot, Montepulciano, Pinot Nero, Sangiovese, alone or together at least 70%"], ["Varietals", "Aleatico, Cabernet, Cabernet Franc, Cabernet Sauvignon, Canaiolo, Ciliegiolo, Merlot, Pinot Nero, Sangiovese"], ["Total alcohol", "11.5%"]],
  place: "The Orvieto hills (Umbrian side).", rules: "Grape to wine 70%.", glass: "Medium-bodied reds.", exam: "Red counterpart to Orvieto.", producers: []
});
APXF["it-lago-di-corbara"] = um({
  lede: "Reds and whites from the hills around the Corbara reservoir on the Tiber, between Baschi and Orvieto.",
  cat: "DOC, red, white, sweet", rec: "DOC 1998 (DM 1 July 1998)", d: "DOC/Lago di Corbara",
  facts: [["Zone", "All of Baschi and part of Orvieto (Corbara, Fossatello and nearby)"], ["Rosso", "Cabernet Sauvignon, Merlot, Pinot Nero, Sangiovese at least 70%"], ["Types", "Rosso, varietals and Riserva versions; Vendemmia Tardiva; Passito (grape to wine 40%; total 16%)"], ["Red Riserva", "Two years including at least 12 months in wood"]],
  place: "Slopes above the Lago di Corbara, where autumn mists help botrytis.", rules: "Late harvest and passito released from 31 January after the harvest.", glass: "Bordeaux-style reds of some weight.", exam: "Minor DOC near Orvieto.", producers: ["Barberani", "Castello di Corbara"]
});
APXF["it-todi"] = um({
  lede: "The Todi hills DOC, centred on Grechetto di Todi (the Pignoletto grape) and Sangiovese.",
  cat: "DOC, white, red, passito", rec: "DOC 2010 (DM 31 May 2010)", d: "DOC/Todi",
  facts: [["Bianco", "Grechetto at least 50%"], ["Rosso", "Sangiovese at least 50%"], ["Types", "Bianco, Rosso (also Superiore), Grechetto (also Superiore, Passito), Sangiovese and Merlot (also Superiore)"], ["Rosso Superiore", "12 months from 1 November"], ["Passito", "Grape to wine 40%; total 16%, 12% actual"]],
  place: "Hills around Todi in the middle Tiber valley.", rules: "Grape to wine 70%.", glass: "Grechetto: textured, nutty white.", exam: "Grechetto di Todi = Pignoletto.", producers: ["Roccafiore", "Todini"]
});
APXF["it-colli-martani"] = um({
  lede: "Hills between Todi and Spoleto for Grechetto, Sangiovese, international varieties and the sweet red Vernaccia di Cannara.",
  cat: "DOC, white, red, sparkling, sweet", rec: "DOC 1988 (DPR 21 December 1988)", d: "DOC/Colli Martani",
  facts: [["Types", "Rosso, Bianco, Trebbiano, Grechetto, Grechetto di Todi, Sangiovese, Cabernet Sauvignon and Merlot (also Riserva), Sauvignon, Chardonnay, Riesling, Spumante, Vernaccia (Vernaccia Nera)"], ["Trebbiano", "Trebbiano Toscano at least 85%"], ["Vernaccia", "Sweet red from dried grapes; 17% natural after drying; total 17%, 11.5% actual"]],
  place: "The Monti Martani foothills.", rules: "Grape to wine 70%.", glass: "Fresh Grechetto; sweet, tannic Vernaccia.", exam: "Vernaccia di Cannara is a sweet red here.", producers: []
});
APXF["it-colli-del-trasimeno"] = um({
  lede: "Hills around Lake Trasimeno for reds, whites, sparkling, Vin Santo and Gamay del Trasimeno, which is Grenache.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 1972 (DPR 13 January 1972)", d: "DOC/Colli del Trasimeno o Trasimeno",
  facts: [["Also labelled", "Trasimeno"], ["Types", "Bianco (also frizzante, scelto, Vin Santo), Rosso (also frizzante, novello, scelto, riserva), Rosato, Spumante metodo classico (bianco and rosé), Grechetto, Merlot, Cabernet Sauvignon, Gamay (riserva for the reds)"], ["Riserva", "24 months from 1 November, including 4 in wood"], ["Vin Santo", "Grapes dried until 30 March; total 16%, 14% actual"]],
  place: "Gentle hills on the shores of Italy's fourth-largest lake.", rules: "Grape to wine 70%.", glass: "Gamay del Trasimeno: warm, red-fruited Grenache.", exam: "Gamay del Trasimeno = Grenache, not Gamay.", producers: ["Duca della Corgna", "Pucciarella"]
});
APXF["it-colli-perugini"] = um({
  lede: "Hills between Perugia and Todi for Trebbiano-based whites, Sangiovese reds, varietals and Vin Santo.",
  cat: "DOC, white, red, rosé, sparkling, sweet", rec: "DOC 1981 (DPR 21 October 1981)", d: "DOC/Colli Perugini",
  facts: [["Bianco and Vin Santo", "Trebbiano Toscano at least 50%"], ["Varietals", "Chardonnay, Grechetto, Pinot Grigio, Trebbiano, Cabernet Sauvignon, Merlot, Sangiovese"], ["Yields", "12 t/ha; Chardonnay and spumante 11"], ["Vin Santo", "Grapes dried until 31 March; grape to wine 40%; total 16%, 13% actual"]],
  place: "Hills south and west of Perugia.", rules: "Grape to wine generally 70%; Vin Santo grapes may be dried with unheated ventilated air.", glass: "Simple wines.", exam: "Minor DOC.", producers: []
});
APXF["it-colli-altotiberini"] = um({
  lede: "The upper Tiber valley north of Perugia, toward Città di Castello and Umbertide.",
  cat: "DOC, white, red, rosé", rec: "DOC 1980 (DPR 22 January 1980)", d: "DOC/Colli Altotiberini",
  facts: [["Types", "Bianco (also spumante, superiore), Rosso (also novello, riserva), Rosato, Grechetto, Trebbiano, Cabernet Sauvignon, Merlot, Sangiovese (riserva for the reds)"], ["Riserva", "24 months from 1 November"], ["Yields", "9 to 12 t/ha"]],
  place: "Cool northern valley of the Tiber.", rules: "Red Riserva types need two years of ageing.", glass: "Light, fresh wines.", exam: "Minor DOC.", producers: []
});
APXF["it-assisi"] = um({
  lede: "Hills below Assisi for Grechetto, blends and international reds.",
  cat: "DOC, white, red, rosé", rec: "DOC 1997 (DM 5 May 1997)", d: "DOC/Assisi",
  facts: [["Bianco", "Trebbiano 50 to 70%; Grechetto at least 10%"], ["Types", "Bianco, Grechetto, Rosso, Rosato, Novello, Cabernet Sauvignon, Merlot, Pinot Nero (Riserva for the varietal reds)"], ["Yields", "Bianco 12 t/ha; Grechetto 8.5; reds 10"], ["Riserva", "24 months from 1 November, including 12 in wood and 3 in bottle"]],
  place: "Slopes of Monte Subasio below Assisi.", rules: "Grape to wine 70%.", glass: "Fresh whites, supple reds.", exam: "Minor DOC.", producers: ["Sportoletti"]
});
APXF["it-amelia"] = um({
  lede: "Southern Umbria near Terni, for Ciliegiolo, Sangiovese, Grechetto and Vin Santo, including Occhio di Pernice.",
  cat: "DOC, white, red, rosé, sweet", rec: "DOC 1989 (DPR 25 November 1989)", d: "DOC/Amelia",
  facts: [["Types", "Bianco, Rosso (also Riserva), Grechetto, Ciliegiolo (also Riserva), Rosato, Novello, Malvasia, Merlot (also Riserva), Sangiovese (also Riserva), Vin Santo, Vin Santo Occhio di Pernice"], ["Bianco and Vin Santo", "Trebbiano Toscano at least 50%"], ["Riserva", "Two years, at least six months in wood"], ["Vin Santo", "Grapes pressed 1 December to 31 March; 26.6% sugar; grape to wine 35%; released from 1 November of the third year; total 16%"]],
  place: "Hills of the Narni and Amelia area in the province of Terni.", rules: "Yields 11 to 12 t/ha.", glass: "Ciliegiolo: bright cherry, soft.", exam: "Ciliegiolo is a local speciality.", producers: ["Zanchi", "Sandonna"]
});
