// Full encyclopedia entries: Tuscany. Written from each disciplinare di produzione (AIS copies of the
// official texts), with later amendments checked where noted.
const TSD = "https://aisitalia.it/Disciplinari/Toscana/";
function tsSrc(d) {
  return ["Disciplinare di produzione (AIS copy of the official text)", TSD + d.split("/").map(encodeURIComponent).join("/") + ".pdf"];
}
function ts(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [tsSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const TS_CHIANTI_2026 = ["Vinetur: EU approves the new Chianti rules (Sangiovese 60%, rosé, Terre di Vinci), November 2026", "https://www.vinetur.com/en/amp/20261105110433/european-union-approves-chianti-rules-allowing-rose-wines.html"];
const TS_CHIANTI_IT = ["Vinetur: Italy approves the new Chianti production code, June 2026", "https://www.vinetur.com/en/20260615102642/italy-approves-chianti-rose-docg-under-new-production-code.html"];
const TS_CHIANTI_RULES = "Under the text in force until 2026 (the AIS copy, amended by Regulation (EU) 2024/2741), Chianti needed 70 to 100% Sangiovese, with white grapes capped at 10% and Cabernet Sauvignon and Cabernet Franc together at 15%. The 2026 revision, approved in Italy in June and published by the EU at the end of October 2026, lowers the Sangiovese minimum to 60%, keeps those caps, and adds a dry Chianti rosé (released from 1 December of the harvest year; no fiasco, no governo). Governo all'uso toscano, a slow refermentation with lightly dried grapes, remains allowed for the red. Riserva needs at least 2 years of ageing from 1 January after the harvest.";
function tsChiantiSub(o) {
  return ts({
    lede: o.lede, cat: "Subzone of the Chianti DOCG, red (also Riserva)", rec: o.rec, d: "DOCG/Chianti",
    amended: "AIS text amended by Regulation (EU) 2024/2741; 2026 revision noted",
    facts: [["Parent appellation", "Chianti DOCG"]].concat(o.facts),
    place: o.place,
    rules: "A subzone name may be used only for wine from grapes grown and made inside that subzone (with exceptions for established cellars elsewhere in the Chianti provinces). " + TS_CHIANTI_RULES + (o.rules ? " " + o.rules : ""),
    history: o.history, glass: o.glass, exam: o.exam, producers: o.producers || [],
    sources: [TS_CHIANTI_2026]
  });
}

// ---------- DOCG ----------
APXF["it-brunello-di-montalcino"] = ts({
  lede: "Sangiovese alone from the commune of Montalcino, south of Siena, aged two years in oak and released in the fifth year after the harvest: one of the first four DOCGs and Tuscany's most valuable red.",
  cat: "DOCG, red", rec: "DOC 1966; DOCG 1980 (with Barolo, Barbaresco and Vino Nobile, the first DOCGs)", d: "DOCG/Brunello di Montalcino",
  amended: "AIS text, consolidated 30 November 2011 and amended to 2014",
  facts: [["Zone", "The commune of Montalcino as it stood on 30 November 2011 (so not the former San Giovanni d'Asso, merged into Montalcino in 2017)"], ["Grape", "Sangiovese 100%"], ["Yield", "8 t/ha (54.4 hl/ha); 7 t/ha with 'vigna'"], ["Minimum natural alcohol", "12%; 12.5% with vigna. Total at release 12.5%"], ["Grape to wine", "68%"], ["Oak", "At least 24 months in oak of any size"], ["Bottle", "At least 4 months; Riserva 6 months"], ["Release", "1 January of the fifth year after the harvest, counting the harvest year (a 2021 is released in January 2026); Riserva a year later"], ["New vineyards", "At least 4,000 vines/ha since 2016"], ["Enrichment", "Only with concentrated must from Brunello vineyards or rectified concentrated must; none with vigna"]],
  place: "A hill town above the Orcia, Ombrone and Asso valleys, with vineyards from about 120 to over 500 m. The north (around the town and Torrenieri) is cooler, with galestro and marl; the south (Sant'Angelo, Castelnuovo dell'Abate, Camigliano) is warmer and drier, sheltered by Monte Amiata from storms. These differences matter more than any official subzone, since Montalcino has none.",
  rules: "Making, oak ageing, bottling and bottle ageing must all happen in Montalcino. Up to 6% of the vintage may be kept in non-oak vessels during the oak period. Wine that does not make Brunello can be declassified to Rosso di Montalcino.",
  history: "Ferruccio Biondi Santi isolated a Sangiovese clone (Brunello, 'little dark one') and bottled long-aged wines in the late 19th century. In 1960 there were only a handful of producers; Villa Banfi's investment from 1978 and the DOCG in 1980 turned it into a global name. In 2008 the 'Brunellopoli' investigation into the use of grapes other than Sangiovese was followed by a producers' vote in 2011 to keep Brunello 100% Sangiovese.",
  glass: "Garnet, red cherry, dried herbs, leather and tobacco with age; high acidity and firm tannin; the best need 10 to 20 years.",
  exam: "100% Sangiovese, 2 years in oak, released 1 January of year five (Riserva year six). No subzones. Its younger sibling is Rosso di Montalcino.",
  producers: ["Biondi Santi (Tenuta Greppo)", "Soldera (Case Basse)", "Il Poggione", "Poggio di Sotto", "Fuligni", "Castello Banfi", "Salvioni (La Cerbaiola)", "Stella di Campalto"]
});
APXF["it-vino-nobile-di-montepulciano"] = ts({
  lede: "Sangiovese (Prugnolo Gentile) from the hills of Montepulciano, aged two years, now topped by single-area 'Pieve' wines from twelve historic parish zones.",
  cat: "DOCG, red", rec: "DOC 1966; DOCG 1980 (one of the first four); Pieve units published in 2025, valid from the 2021 vintage", d: "DOCG/Vino Nobile di Montepulciano",
  amended: "AIS text amended by DM 9 June 2022; Pieve rules from the consortium and the 2025 EU publication",
  sources: [["Consorzio del Vino Nobile di Montepulciano, press kit 2025", "https://www.consorziovinonobile.it/wp-content/uploads/2025/01/CARTELLA-STAMPA-2025-ITA.pdf"], ["Rivista di Agraria: Ministry approves the Pieve rules", "https://www.rivistadiagraria.org/vino-e-dintorni/vino-nobile-montepulciano-pieve-ministero-approva-disciplinare/?print=pdf"]],
  facts: [["Zone", "Part of the commune of Montepulciano (Siena)"], ["Grapes", "Sangiovese at least 70%; up to 30% other Tuscan varieties, with white grapes no more than 5%; aromatic varieties banned except Malvasia Bianca Lunga"], ["Yield", "8 t/ha; 12% natural alcohol (Riserva 12.5%)"], ["Grape to wine", "70%"], ["Vineyards", "Well exposed, 250 to 600 m; new plantings at least 3,330 vines/ha"], ["Ageing", "At least 2 years from 1 January after the harvest, choosing: 24 months in wood; or at least 18 in wood and the rest in other vessels; or at least 12 in wood, 6 in bottle and the rest in other vessels"], ["Riserva", "3 years, including 6 months in bottle"], ["Pieve", "12 units named after ancient parish churches; Sangiovese at least 85% with only native red varieties (Canaiolo, Colorino, Mammolo, Ciliegiolo); vines at least 15 years old; 7 t/ha; 36 months including 12 in wood and 12 in bottle; estate-grown grapes only; 13% minimum alcohol"], ["Label", "'Toscana' must follow 'Vino Nobile di Montepulciano DOCG' in the same style"]],
  place: "A ridge town between the Val d'Orcia and the Val di Chiana, east of Montalcino. Soils run from Pliocene marine sands and clays to stonier ground; Lake Trasimeno to the east tempers the climate. About 1,200 ha are registered for Vino Nobile.",
  rules: "Vinification and compulsory ageing in Montepulciano, with exceptions for long-standing wineries within 3.8 km of the commune boundary. Vineyards can be registered for both Vino Nobile and Rosso di Montepulciano.",
  history: "Called 'nobile' since at least the 17th century, praised by Francesco Redi in his 1685 poem Bacco in Toscana. In 1980 it was among the first four DOCGs. The Pieve project, debated from 2021, aims to show Montepulciano's subzones at the top of the pyramid.",
  glass: "Ruby to garnet, cherry, plum, violets and spice; a little softer and earthier than Brunello, firm tannin.",
  exam: "Montepulciano is the town, not the grape: the wine is Sangiovese, here called Prugnolo Gentile. Not to be confused with Montepulciano d'Abruzzo. Know the three ageing options and the new Pieve tier.",
  producers: ["Avignonesi", "Poliziano", "Boscarelli", "Salcheto", "Dei", "Contucci"]
});
APXF["it-chianti-classico"] = ts({
  lede: "The historic Chianti between Florence and Siena, separated from Chianti in 1996: Sangiovese at least 80%, the Black Rooster, and a pyramid of Annata, Riserva and Gran Selezione, the last with eleven village units.",
  cat: "DOCG, red (Annata, Riserva, Gran Selezione)", rec: "Zone drawn 1932; DOC 1967 (as part of Chianti); DOCG 1984; separate DOCG from the 1996 harvest", d: "DOCG/Chianti Classico",
  amended: "AIS text amended by DM 22 June 2023",
  facts: [["Communes", "All of Castellina in Chianti, Gaiole in Chianti, Greve in Chianti, Radda in Chianti; parts of Barberino Tavarnelle, Castelnuovo Berardenga, Poggibonsi, San Casciano in Val di Pesa"], ["Grapes (Annata and Riserva)", "Sangiovese 80 to 100%; up to 20% other red Tuscan varieties; no white grapes"], ["Grapes (Gran Selezione)", "Sangiovese 90 to 100%; up to 10% only of Colorino, Canaiolo, Ciliegiolo, Mammolo, Pugnitello, Malvasia Nera, Foglia Tonda, Sanforte. In full force from the fifth harvest after the 2023 change"], ["Yield", "7.5 t/ha; 11.5% natural alcohol"], ["Vineyards", "Hillsides up to 700 m; new plantings at least 4,400 vines/ha"], ["Grape to wine", "70%"], ["Release", "Annata from 1 October of the year after the harvest; Riserva after 24 months including 3 in bottle; Gran Selezione after 30 months including 3 in bottle (from 1 January after the harvest)"], ["Gran Selezione", "Estate-grown grapes only"], ["Total alcohol", "12%; Riserva 12.5%; Gran Selezione 13%"], ["UGA (Gran Selezione)", "Castellina, Castelnuovo Berardenga, Gaiole, Greve, Lamole, Montefioralle, Panzano, Radda, San Casciano, San Donato in Poggio, Vagliagli"]],
  place: "Wooded hills between the Pesa and Arbia rivers, mostly 250 to 600 m. Galestro (flaky clay schist) and alberese (hard limestone) dominate; macigno sandstone in the higher west (Lamole, Radda) and Pliocene sands near San Casciano give lighter, more aromatic wines.",
  rules: "Vinification and ageing in the zone or in pre-2008 cellars within 10 km of it; bottling in the zone. The vintage must appear on every bottle. The UGA names may appear only on Gran Selezione, in letters no larger than the denomination.",
  history: "Grand Duke Cosimo III's edict of 1716 drew Chianti's boundaries, one of the first legal wine zones. Baron Bettino Ricasoli set out a Sangiovese-based formula in the 1870s. The 1932 decree named this core 'Classico'; the 1960s-90s blew it open with Super Tuscans; the separate DOCG (1996), the end of white grapes (2006) and Gran Selezione (2014) rebuilt its prestige.",
  glass: "Ruby, sour cherry, violet, dried herbs and earth, high acidity, firm but fine tannin; Gran Selezione deeper and more structured.",
  exam: "Chianti Classico is not a Chianti subzone. 80% Sangiovese (Gran Selezione 90% with natives only). Release: Annata 1 October, Riserva 24 months, Gran Selezione 30 months. 11 UGAs.",
  producers: ["Montevertine", "Castello di Ama", "Fontodi", "Isole e Olena", "Badia a Coltibuono", "Felsina", "Querciabella", "Castello dei Rampolla", "Istine"]
});
APXF["it-chianti"] = ts({
  lede: "Italy's best-known red, a Sangiovese blend from a huge area across six Tuscan provinces, with eight named subzones and, since 2026, a rosé and a 60% Sangiovese minimum.",
  cat: "DOCG, red and (from 2026) rosé", rec: "DOC 1967; DOCG 1984; major revision approved 2026", d: "DOCG/Chianti",
  amended: "AIS text amended by Regulation (EU) 2024/2741; 2026 revision from published reports",
  sources: [TS_CHIANTI_IT, TS_CHIANTI_2026],
  facts: [["Provinces", "Arezzo, Florence, Pisa, Pistoia, Prato, Siena"], ["Types", "Chianti, Chianti Superiore, Riserva; rosé from 2026"], ["Subzones", "Colli Aretini, Colli Fiorentini, Colli Senesi, Colline Pisane, Montalbano, Montespertoli, Rufina; Terre di Vinci added in 2026"], ["Grapes", "Sangiovese at least 60% (70% before 2026); white grapes up to 10%; Cabernet Sauvignon and Franc together up to 15%"], ["Yield", "Chianti 11 t/ha (10.5% natural); Superiore 9.5 t/ha (11.5%); subzones 9 to 9.5 t/ha"], ["Release", "Chianti 1 March after the harvest; Superiore 1 September"], ["Riserva", "At least 2 years from 1 January after the harvest"]],
  place: "A wide arc of hills around the Chianti Classico core, from the Arno valley near Pisa to the Valdichiana and Siena.",
  rules: TS_CHIANTI_RULES + " Chianti Superiore cannot carry a subzone name.",
  history: "When the Chianti name was extended in 1932 to the surrounding hills, the original zone became 'Classico'. The fiasco straw flask made Chianti famous, and then cheap; the DOCG of 1984 started the recovery.",
  glass: "Light to medium ruby, red cherry and violet, high acidity; Riserva and the stricter subzones more structured.",
  exam: "Chianti DOCG and Chianti Classico DOCG are separate appellations. Know the subzones and the 2026 changes (60% Sangiovese, rosé, Terre di Vinci).",
  producers: []
});
APXF["it-chianti-rufina"] = tsChiantiSub({
  lede: "The smallest and highest of the classic Chianti subzones, east of Florence in the Sieve valley: cool, long-lived Sangiovese.",
  rec: "Named in the 1932 decree; part of the Chianti DOC 1967 and DOCG 1984",
  facts: [["Communes", "Rufina, Pontassieve, Pelago, Londa, Dicomano (province of Florence)"], ["Yield", "9.5 t/ha; 11.5% natural alcohol"], ["New vineyards", "At least 4,500 vines/ha"], ["Release", "1 September of the year after the harvest"], ["Riserva", "2 years, at least 6 months in wood"]],
  place: "Hills of the lower Sieve valley rising towards the Apennines, with vineyards up to about 500 m and cold air from the mountains, giving the highest acidity of any Chianti.",
  history: "Rufina appears in the 1716 edict through Pomino, its high enclave, and its estates (Selvapiana, Frescobaldi's Nipozzano) are among the oldest in Tuscany.",
  glass: "Taut, high-acid Sangiovese with red cherry, iris and spice; ages for decades.",
  exam: "Rufina is a Chianti subzone, not Chianti Classico. Pomino DOC lies within the commune of Rufina.",
  producers: ["Fattoria Selvapiana", "Frescobaldi (Nipozzano)", "Colognole", "Frascole"]
});
APXF["it-chianti-colli-fiorentini"] = tsChiantiSub({
  lede: "The Chianti subzone of the hills around Florence, along the Arno, Pesa and Greve valleys.",
  rec: "Named in the 1932 decree; part of the Chianti DOC 1967 and DOCG 1984",
  facts: [["Province", "Florence"], ["Yield", "9 t/ha; 11% natural alcohol"], ["Release", "1 September of the year after the harvest"], ["Riserva", "2 years, at least 6 months in wood"]],
  place: "Hills ringing Florence to the south, east and west, on galestro, alberese and sandy soils, bordering Chianti Classico to the south.",
  glass: "Medium-bodied, fragrant Sangiovese.",
  exam: "One of two subzones (with Rufina) requiring 6 months in wood for Riserva and release from 1 September.",
  producers: []
});
APXF["it-chianti-colli-senesi"] = tsChiantiSub({
  lede: "The largest Chianti subzone, in the province of Siena around Siena, Montalcino, Montepulciano and San Gimignano, with stricter blending rules.",
  rec: "Named in the 1932 decree; part of the Chianti DOC 1967 and DOCG 1984",
  facts: [["Province", "Siena"], ["Grapes (text in force before 2026)", "Sangiovese 75 to 100%; Cabernet up to 10%; white grapes up to 10%. The 2026 revision adapts the Sangiovese minimum but keeps Cabernet at 10%"], ["Yield", "9 t/ha; 11.5% natural (Riserva 12.5%)"], ["Riserva", "At least 8 months in wood and then 4 months in bottle"]],
  place: "Three separate blocks around Siena itself, Montalcino and Montepulciano, and San Gimignano.",
  rules: "Brunello and Vino Nobile growers often use it for wine from younger vines.",
  glass: "Riper, rounder Sangiovese than the northern subzones.",
  exam: "The only subzone with its own lower Cabernet cap (10%).",
  producers: []
});
APXF["it-chianti-colli-aretini"] = tsChiantiSub({
  lede: "The Chianti subzone of the province of Arezzo, on the hills along the upper Arno west of Arezzo.",
  rec: "Named in the 1932 decree; part of the Chianti DOC 1967 and DOCG 1984",
  facts: [["Province", "Arezzo"], ["Yield", "9.5 t/ha; 11% natural alcohol"], ["Release", "1 March after the harvest"]],
  place: "The western slopes of the Pratomagno and the hills of the Valdarno and Valdichiana edges.",
  glass: "Fresh, fruity Sangiovese.",
  exam: "Arezzo province's Chianti subzone.",
  producers: []
});
APXF["it-chianti-colline-pisane"] = tsChiantiSub({
  lede: "The westernmost Chianti subzone, in the hills of the province of Pisa.",
  rec: "Named in the 1932 decree; part of the Chianti DOC 1967 and DOCG 1984",
  facts: [["Province", "Pisa"], ["Yield", "9.5 t/ha; 11% natural alcohol"], ["Release", "1 March after the harvest"]],
  place: "Low, sandy hills south-east of Pisa around Casciana Terme, Terricciola and Crespina, with sea influence.",
  glass: "Soft, early-drinking Sangiovese.",
  exam: "The coastal-influenced subzone.",
  producers: []
});
APXF["it-chianti-montalbano"] = tsChiantiSub({
  lede: "The Chianti subzone of the Montalbano ridge west of Florence, around Carmignano and Vinci.",
  rec: "Named in the 1932 decree; part of the Chianti DOC 1967 and DOCG 1984",
  facts: [["Provinces", "Florence, Prato, Pistoia"], ["Yield", "9.5 t/ha; 11% natural alcohol"], ["Release", "1 March after the harvest"]],
  place: "The Montalbano hills between the Arno and the Pistoia plain; Carmignano DOCG sits on its eastern slopes.",
  glass: "Light, fruity Sangiovese.",
  exam: "Carmignano DOCG shares the Montalbano hills; the new Terre di Vinci subzone (2026) covers neighbouring communes to the south-west.",
  producers: []
});
APXF["it-chianti-montespertoli"] = tsChiantiSub({
  lede: "The newest of the original Chianti subzones, carved from the Colli Fiorentini in 1997 for the commune of Montespertoli.",
  rec: "Subzone created by ministerial decree of 8 September 1997",
  facts: [["Commune", "Montespertoli (Florence)"], ["Yield", "9.5 t/ha; 11% natural alcohol"], ["Release", "1 June after the harvest"]],
  place: "Rolling hills between the Pesa and Elsa valleys south-west of Florence.",
  glass: "Medium-bodied Sangiovese with soft tannin.",
  exam: "The only subzone released from 1 June.",
  producers: []
});
APXF["it-chianti-terre-di-vinci"] = tsChiantiSub({
  lede: "Chianti's eighth subzone, approved in 2026, for the hills around Vinci, Leonardo's birthplace, west of Florence.",
  rec: "Subzone added by the 2026 revision of the Chianti specification (Italian approval June 2026; EU publication October 2026)",
  facts: [["Communes", "Vinci, Cerreto Guidi, Fucecchio, Capraia e Limite"], ["Specific rules", "Not yet reviewed here from the new official text"]],
  place: "The south-western slopes of the Montalbano and the hills towards the lower Arno.",
  glass: "Expected to be in the fresh, fruity Montalbano style.",
  exam: "The newest Chianti subzone (2026), alongside the new rosé and the 60% Sangiovese minimum.",
  sources: [TS_CHIANTI_2026]
});
APXF["it-carmignano"] = ts({
  lede: "A small Sangiovese and Cabernet blend from the hills west of Florence, where Cabernet ('uva francesca') has been grown since the Medici: Cabernet is compulsory here.",
  cat: "DOCG, red", rec: "DOC 1975; DOCG 1990", d: "DOCG/Carmignano",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Communes", "Hills of Carmignano and Poggio a Caiano (province of Prato)"], ["Grapes", "Sangiovese at least 50%; Canaiolo Nero up to 20%; Cabernet Franc and/or Cabernet Sauvignon 10 to 20%; Trebbiano, Canaiolo Bianco, Malvasia up to 10%; other reds up to 10%"], ["Yield", "8 t/ha; 12% natural alcohol"], ["Grape to wine", "70%"], ["Oak", "At least 8 months in oak or chestnut; Riserva at least 12 months"], ["Release", "1 June of the second year after the harvest; Riserva later"], ["Total alcohol", "12.5%"]],
  place: "The eastern slopes of the Montalbano, on galestro and alberese, protected from northern winds.",
  rules: "Vinification, ageing and bottling within Carmignano and Poggio a Caiano.",
  history: "Named in Cosimo III's 1716 edict with Chianti, Pomino and the Val d'Arno di Sopra. The Medici planted French grapes here; Ugo Contini Bonacossi of Capezzana led the DOC.",
  glass: "Red cherry and cassis, more structure than many Chiantis, elegant tannin.",
  exam: "The one Tuscan DOCG that requires Cabernet (10 to 20%). Its second wine is Barco Reale di Carmignano DOC.",
  producers: ["Capezzana", "Piaggia", "Ambra", "Artimino"]
});
APXF["it-vernaccia-di-san-gimignano"] = ts({
  lede: "Tuscany's white DOCG from the towered hill town of San Gimignano: Vernaccia, a mineral, almond-edged white, and Italy's first DOC.",
  cat: "DOCG, white (also Riserva)", rec: "DOC 1966 (the first Italian DOC); DOCG 1993", d: "DOCG/Vernaccia di San Gimignano",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Zone", "Hills of the commune of San Gimignano (Siena)"], ["Grapes", "Vernaccia di San Gimignano at least 85%; up to 15% other non-aromatic whites, with Sauvignon and Riesling together at most 10%; Traminer, Moscato, Müller-Thurgau, Malvasia di Candia, Malvasia Istriana and Incrocio Bruni 54 banned"], ["Minimum natural alcohol", "10.5%; Riserva 12%"], ["Grape to wine", "70%"], ["Riserva", "At least 11 months from 1 January after the harvest, including time in bottle"], ["Total alcohol", "11.5%; Riserva 12.5%"], ["Residual sugar", "No more than 4 g/L"]],
  place: "Sandy marine Pliocene soils with fossil shells around the medieval town in the Val d'Elsa.",
  rules: "Vinification and bottling in the zone.",
  history: "Vernaccia is recorded at San Gimignano from 1276; Dante placed Pope Martin IV in Purgatory for his love of eels drowned in Vernaccia.",
  glass: "Pale lemon, green apple, citrus, almond and a bitter, saline finish; Riserva fuller and nuttier.",
  exam: "Italy's first DOC (1966). Not related to the Vernaccias of Oristano or Serrapetrona.",
  producers: ["Montenidoli", "Panizzi", "Teruzzi", "Il Colombaio di Santa Chiara", "Cesani"]
});
APXF["it-morellino-di-scansano"] = ts({
  lede: "The Sangiovese (locally Morellino) of the Maremma hills around Scansano, between the Ombrone and Albegna rivers.",
  cat: "DOCG, red (also Riserva)", rec: "DOC 1978; DOCG 2006", d: "DOCG/Morellino di Scansano",
  amended: "Text as amended by DM 2 March 2021",
  facts: [["Communes", "All of Scansano; parts of Manciano, Magliano in Toscana, Grosseto, Campagnatico, Semproniano, Roccalbegna"], ["Grapes", "Sangiovese at least 85%; up to 15% other non-aromatic reds"], ["Yield", "9 t/ha, at most 3 kg per vine"], ["Grape to wine", "70%"], ["Release", "1 March after the harvest"], ["Riserva", "12% natural alcohol; ageing counted from 1 January after the harvest"], ["Total alcohol", "12.5%; Riserva 13%"]],
  place: "Warm, dry hills of the inland Maremma up to about 500 m, on sandstone, clay and limestone, open to sea breezes from the Tyrrhenian.",
  rules: "Riserva requires longer ageing including wood.",
  glass: "Riper, softer Sangiovese than Chianti: cherry, plum and Mediterranean herbs.",
  exam: "Morellino is a local synonym for Sangiovese.",
  producers: ["Moris Farms", "Fattoria Le Pupille", "Poggio Argentiera"]
});
APXF["it-montecucco-sangiovese"] = ts({
  lede: "Sangiovese from the lower western slopes of Monte Amiata in the province of Grosseto, between Montalcino and the Maremma.",
  cat: "DOCG, red (also Riserva)", rec: "Montecucco DOC 1998; DOCG 2011", d: "DOCG/Montecucco Sangiovese",
  amended: "Text as amended by DM 12 December 2017",
  facts: [["Communes", "Cinigiano, Civitella Paganico, Campagnatico, Castel del Piano, Roccalbegna, Arcidosso, Seggiano (Grosseto)"], ["Grapes", "Sangiovese at least 90%; no Malvasia Nera or Aleatico"], ["Yield", "7 t/ha; 12% natural (Riserva 12.5%)"], ["Ageing", "At least 12 months in wood; released from 1 April of the second year after the harvest. Riserva 30 months including 24 in wood and 6 in bottle, from 1 November; released from 1 September of the third year"], ["Total alcohol", "13%; Riserva 13.5%"]],
  place: "Volcanic and marine soils on the flanks of the extinct Monte Amiata, across the Orcia river from Montalcino; many growers farm organically.",
  rules: "Making and ageing in the zone.",
  glass: "Brunello-like fruit and herbs at a lower price, with sun-ripened warmth.",
  exam: "Montecucco DOC (blends, 60% Sangiovese) versus Montecucco Sangiovese DOCG (90%).",
  producers: ["Salustri", "ColleMassari", "Basile"]
});
APXF["it-suvereto"] = ts({
  lede: "Bordeaux varieties and Sangiovese from the commune of Suvereto on the Etruscan Coast, a former subzone of Val di Cornia promoted to its own DOCG.",
  cat: "DOCG, red", rec: "Subzone of Val di Cornia 1989; separate DOCG 2011 (DM 18 November 2011)", d: "DOCG/Suvereto",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Zone", "Commune of Suvereto (Livorno)"], ["Types", "Suvereto (Cabernet Sauvignon and/or Merlot up to 100%), Suvereto Sangiovese, Suvereto Merlot, Suvereto Cabernet Sauvignon (each at least 85%); Riserva"], ["Yield", "9 t/ha; 12.5% natural"], ["Grape to wine", "68%"], ["Release", "1 June of the second year after the harvest; Riserva 1 January of the third"], ["Total alcohol", "12.5%; Riserva 13%"]],
  place: "A medieval hill town in the Cornia valley inland from Piombino, with warm, dry, mineral-rich soils from the Colline Metallifere.",
  rules: "Riserva: at most 8 t/ha and 13% natural alcohol, aged 24 months including 18 in oak, from 1 November of the harvest year.",
  glass: "Dense, ripe Merlot and Cabernet with Mediterranean scrub notes.",
  exam: "Suvereto and Val di Cornia Rosso are both DOCGs carved from the Val di Cornia DOC in 2011.",
  producers: ["Tua Rita", "Petra", "Gualdo del Re", "Bulichella"]
});
APXF["it-val-di-cornia-rosso"] = ts({
  lede: "The red blend of the Val di Cornia on the southern Etruscan Coast: Sangiovese with Cabernet Sauvignon and Merlot.",
  cat: "DOCG, red (also Riserva)", rec: "DOCG 2011 (DM 18 November 2011)", d: "DOCG/Val di Cornia Rosso o Rosso della Val di Cornia",
  facts: [["Also labelled", "Rosso della Val di Cornia"], ["Grapes", "Sangiovese at least 40%; Cabernet Sauvignon and Merlot up to 60%; other reds up to 20%, no Aleatico"], ["Yield", "9 t/ha; 12.5% natural"], ["Grape to wine", "70%"], ["Release", "1 May of the second year after the harvest; Riserva 1 January of the third"], ["Total alcohol", "12.5%; Riserva 13%"]],
  place: "The Cornia valley and hills inland from Piombino and San Vincenzo, provinces of Livorno and Pisa.",
  rules: "Making and ageing in the zone.",
  glass: "Ripe, round blend with dark fruit and herbs.",
  exam: "One of Tuscany's least-known DOCGs.",
  producers: []
});
APXF["it-elba-aleatico-passito"] = ts({
  lede: "A sweet red passito from Aleatico grapes dried on the island of Elba, the island's only DOCG.",
  cat: "DOCG, sweet red (passito)", rec: "DOC 1967 (within Elba); DOCG 2011 (DM 17 May 2011)", d: "DOCG/Elba Aleatico Passito o Aleatico Passito dell'Elba",
  facts: [["Also labelled", "Aleatico Passito dell'Elba"], ["Zone", "All communes of the island of Elba"], ["Grape", "Aleatico"], ["Yield", "7 t/ha; 11.5% natural"], ["Drying", "Grapes dried in air or in rooms (ventilation allowed) to at least 30% sugar"], ["Grape to wine", "No more than 35%"], ["Release", "From 1 March of the year after the harvest"], ["At release", "Total alcohol at least 19%, of which 12% fermented"]],
  place: "Granite and schist slopes of the Tuscan island where Napoleon spent his first exile.",
  rules: "Drying, making and bottling on the island.",
  glass: "Ruby, rose, cherry jam and spice; sweet with fine tannin.",
  exam: "Aleatico is an aromatic red grape related to Muscat.",
  producers: ["Acquabona", "Arrighi", "Tenuta delle Ripalte"]
});

// ---------- DOC ----------
APXF["it-bolgheri"] = ts({
  lede: "The coastal plain and hills of Castagneto Carducci where Sassicaia began: Bordeaux-variety reds, Superiore aged two years, and Vermentino and Sauvignon whites.",
  cat: "DOC, red, rosé, white", rec: "DOC 1983 (white and rosé); reds added 1994", d: "DOC/Bolgheri",
  amended: "Text as amended by DM 3 November 2021",
  facts: [["Zone", "The commune of Castagneto Carducci east of the old Aurelia road (Livorno)"], ["Types", "Bianco, Vermentino, Sauvignon, rosato, rosso, rosso Superiore"], ["Red grapes", "Cabernet Sauvignon, Merlot, Cabernet Franc each 0 to 100%; Syrah and Sangiovese each 0 to 50%; other reds up to 30%"], ["White grapes", "Bianco: Vermentino, Sauvignon, Viognier each 0 to 100%. Varietals at least 85%"], ["Yield", "Whites 12 t/ha; rosso and rosato 9 t/ha"], ["Minimum natural alcohol", "Whites 10.5%; rosso 11.5%; Superiore 12%"], ["Superiore", "At least 2 years from 1 January after the harvest, one of them in oak"], ["Total alcohol", "Superiore 12.5%"]],
  place: "A strip between the Tyrrhenian and the Colline Metallifere, from alluvial gravels near the sea to clays and limestone up to about 400 m, cooled by sea breezes.",
  rules: "Making, ageing and bottling in Castagneto Carducci. The Sassicaia estate has its own DOC since 2013.",
  history: "Marchese Mario Incisa della Rocchetta planted Cabernet at Tenuta San Guido in the 1940s; Sassicaia was released commercially with the 1968 vintage. Ornellaia, Guado al Tasso and Grattamacco followed, and red Bolgheri got its DOC in 1994.",
  glass: "Ripe cassis, plum, Mediterranean herbs and graphite; supple tannin.",
  exam: "Bolgheri rosso has no minimum for any single grape. Superiore: 2 years, 1 in oak.",
  producers: ["Tenuta dell'Ornellaia", "Grattamacco", "Le Macchiole", "Tenuta Guado al Tasso", "Ca' Marcanda (Gaja)", "Michele Satta"]
});
APXF["it-bolgheri-sassicaia"] = ts({
  lede: "Italy's best-known single-estate DOC: Tenuta San Guido's Cabernet Sauvignon-led Sassicaia, the original Super Tuscan.",
  cat: "DOC, red", rec: "Subzone of Bolgheri 1994; separate DOC 2013", d: "DOC/Bolgheri Sassicaia",
  amended: "Text as amended by DM 30 March 2015",
  facts: [["Zone", "A delimited area of Castagneto Carducci around Tenuta San Guido"], ["Grapes", "Cabernet Sauvignon at least 80%; up to 20% other red varieties"], ["Yield", "7 t/ha, about 2 kg per vine; new vineyards at least 4,000 vines/ha"], ["Minimum natural alcohol", "11.5%"], ["Grape to wine", "70%"], ["Ageing", "At least 2 years from 1 January after the harvest, including 18 months in oak barrels of 225 litres or less"], ["Total alcohol", "12%"]],
  place: "Stony ('sassi', hence the name) vineyards between the San Guido cypress avenue and the hills.",
  rules: "Making, ageing and bottling in Castagneto Carducci.",
  history: "First made for family use in the 1940s, sold from the 1968 vintage, and famous after a 1978 Decanter tasting. For years it was labelled vino da tavola because Cabernet was not allowed in Tuscan DOCs.",
  glass: "Cassis, cedar, tobacco and herbs; firm, fine tannin, long-ageing.",
  exam: "A DOC for one estate. Cabernet Sauvignon 80% minimum, 18 months in barrique.",
  producers: ["Tenuta San Guido"]
});
APXF["it-rosso-di-montalcino"] = ts({
  lede: "The younger Sangiovese of Montalcino, from the same grape and zone as Brunello but released after less than a year.",
  cat: "DOC, red", rec: "DOC 1983", d: "DOC/Rosso di Montalcino",
  facts: [["Zone", "Commune of Montalcino as of 30 November 2011"], ["Grape", "Sangiovese 100%"], ["Yield", "8 t/ha (56 hl/ha)"], ["Minimum natural alcohol", "11.5%; 12% with vigna"], ["Grape to wine", "70%"], ["Release", "From 1 September of the year after the harvest"], ["Total alcohol", "12%"]],
  place: "The Brunello zone; producers choose which vineyards or lots go to Rosso.",
  rules: "Brunello may be declassified to Rosso.",
  glass: "Fresh cherry, herbs, lively acidity, lighter tannin than Brunello.",
  exam: "Released 1 September of the year after the harvest; no oak requirement.",
  producers: []
});
APXF["it-rosso-di-montepulciano"] = ts({
  lede: "The early-release Sangiovese of Montepulciano, from vineyards that can also produce Vino Nobile.",
  cat: "DOC, red", rec: "DOC 1988", d: "DOC/Rosso di Montepulciano",
  amended: "Text as amended by DM 8 April 2020",
  facts: [["Grapes", "Sangiovese (Prugnolo Gentile) at least 70%; up to 30% other Tuscan varieties, whites no more than 5%"], ["Yield", "10 t/ha; 11% natural"], ["Grape to wine", "70%"], ["Release", "From 1 March after the harvest"], ["Total alcohol", "11.5%"]],
  place: "The Vino Nobile zone in the commune of Montepulciano.",
  rules: "Aromatic varieties banned except Malvasia Bianca Lunga.",
  glass: "Bright cherry and violet, soft tannin.",
  exam: "Released 1 March, much earlier than Rosso di Montalcino.",
  producers: []
});
APXF["it-moscadello-di-montalcino"] = ts({
  lede: "Montalcino's historic white: sweet Moscato Bianco, still, frizzante or late-harvest, from part of the commune.",
  cat: "DOC, sweet white (still, frizzante, vendemmia tardiva)", rec: "DOC 1984", d: "DOC/Moscadello di Montalcino",
  amended: "Text as amended by DM 16 October 2020",
  facts: [["Zone", "Part of the commune of Montalcino"], ["Grapes", "Moscato Bianco at least 85%"], ["Grape to wine", "65% (still and frizzante); 45% (vendemmia tardiva)"], ["Vendemmia tardiva", "Grapes at least 15% potential alcohol, partial drying allowed; aged a year from 1 January, released from 1 January of the second year after the harvest; total 15%, at least 11.5% fermented"]],
  place: "Lower slopes in the north and east of Montalcino.",
  rules: "Making and bottling in the zone.",
  history: "Montalcino was known for Moscadello long before Brunello.",
  glass: "Peach, orange blossom and honey.",
  exam: "Montalcino's sweet white tradition.",
  producers: ["Castello Banfi", "Col d'Orcia"]
});
APXF["it-sant-antimo"] = ts({
  lede: "A catch-all DOC for the commune of Montalcino, for wines other than Brunello and Rosso, named after the Romanesque abbey.",
  cat: "DOC, red, white, Vin Santo", rec: "DOC 1996", d: "DOC/Sant'Antimo",
  facts: [["Zone", "Commune of Montalcino"], ["Types", "Rosso, Bianco (any suitable Tuscan varieties); Cabernet Sauvignon, Merlot, Pinot Nero, Chardonnay, Sauvignon, Pinot Grigio; Vin Santo and Vin Santo Occhio di Pernice"], ["Vin Santo", "Trebbiano and Malvasia at least 70%; released from 1 November of the third year after the harvest (Riserva the fourth)"], ["Occhio di Pernice", "Sangiovese 50 to 70%, Malvasia Nera 30 to 50%"]],
  place: "Montalcino's hills.",
  rules: "Allows international varieties and blends that Brunello and Rosso do not.",
  glass: "Varies by type.",
  exam: "Montalcino's DOC for everything except Sangiovese varietal wines.",
  producers: []
});
APXF["it-orcia"] = ts({
  lede: "Sangiovese-based wines from the Val d'Orcia between Montalcino and Montepulciano, a UNESCO landscape.",
  cat: "DOC, red, rosé, white, Vin Santo", rec: "DOC 2000", d: "DOC/Orcia",
  facts: [["Communes", "Including Castiglione d'Orcia, Pienza, Radicofani, San Giovanni d'Asso, San Quirico d'Orcia, Buonconvento, Trequanda (Siena)"], ["Grapes", "Orcia (rosso) and rosato: Sangiovese at least 60%; Orcia Sangiovese at least 90%; bianco Trebbiano at least 50%"], ["Riserva", "Orcia Riserva 24 months including 12 in wood; Sangiovese Riserva 30 months including 24 in wood"], ["Release", "1 March after the harvest; Riserva later"]],
  place: "Rolling clay hills of the Val d'Orcia, famous for its cypress-lined roads.",
  rules: "Vin Santo released from 1 November of the third year.",
  glass: "Medium-bodied, fragrant Sangiovese.",
  exam: "Between the Brunello and Vino Nobile zones.",
  producers: []
});
APXF["it-maremma-toscana"] = ts({
  lede: "The DOC covering the whole province of Grosseto, from the coast to Monte Amiata, for a long list of reds, whites and sweet wines.",
  cat: "DOC, red, white, rosé, sweet", rec: "IGT 1995; DOC 2011", d: "DOC/Maremma toscana",
  amended: "Text as amended by DM 8 May 2023",
  facts: [["Zone", "Province of Grosseto"], ["Types", "Rosso, bianco, rosato, Vin Santo and more than 20 varietals including Vermentino, Ansonica, Alicante (Grenache), Ciliegiolo, Sangiovese, Cabernet, Merlot, Syrah, Pugnitello"], ["Riserva", "Reds 24 months, at least 6 in wood; whites 12 months"]],
  place: "The Maremma, once malarial marshland drained in the 19th and 20th centuries, now Tuscany's warm frontier for vines.",
  rules: "Vermentino Superiore and passito and late-harvest types also exist.",
  glass: "Ripe, sunny wines; Vermentino is the signature white.",
  exam: "Province-wide DOC; Morellino and Montecucco Sangiovese are the DOCGs inside it.",
  producers: []
});
APXF["it-montecucco"] = ts({
  lede: "The broader Montecucco DOC on the slopes of Monte Amiata, for Sangiovese-based reds, whites and Vin Santo.",
  cat: "DOC, red, rosé, white, Vin Santo", rec: "DOC 1998", d: "DOC/Montecucco",
  amended: "Text as amended by DM 8 April 2024",
  facts: [["Communes", "Cinigiano, Civitella Paganico, Campagnatico, Castel del Piano, Roccalbegna, Arcidosso, Seggiano"], ["Grapes", "Rosso: Sangiovese at least 60%. Rosato: Sangiovese and Ciliegiolo at least 60%. Bianco: Trebbiano and Vermentino at least 40%"], ["Yield", "Reds 9 t/ha"], ["Release", "Rosso 1 September after the harvest; Riserva 1 November of the second year"]],
  place: "The Amiata foothills of inland Grosseto.",
  rules: "Vin Santo Occhio di Pernice must reach 20% total alcohol.",
  glass: "Mid-weight Sangiovese blends.",
  exam: "DOC at 60% Sangiovese; the DOCG at 90%.",
  producers: []
});
APXF["it-pomino"] = ts({
  lede: "A small high-altitude enclave in the commune of Rufina, named in the 1716 edict, where French varieties have long been grown alongside Sangiovese.",
  cat: "DOC, white, red, sparkling, Vin Santo", rec: "DOC 1983", d: "DOC/Pomino",
  facts: [["Zone", "Part of the commune of Rufina (Florence)"], ["Grapes", "Bianco: Pinot Bianco, Pinot Grigio, Chardonnay at least 70%. Rosso: Sangiovese at least 50%, Pinot Nero and Merlot up to 50%"], ["Yield", "9 t/ha; sparkling 15 t/ha"], ["Spumante", "At least 15 months on the lees; Riserva 36 months"]],
  place: "High vineyards in the Apennine foothills above the Sieve, among the highest in Tuscany.",
  rules: "Varietal Pinot Nero, Merlot, Chardonnay and Sauvignon also allowed.",
  history: "One of four zones named in Cosimo III's 1716 edict. The Frescobaldi family's Castello di Pomino introduced French varieties in the 19th century.",
  glass: "Fresh, Burgundy-leaning whites and Pinot Nero.",
  exam: "Pomino is inside Rufina; known for Pinot and Chardonnay.",
  producers: ["Frescobaldi (Castello di Pomino)"]
});
APXF["it-barco-reale-di-carmignano"] = ts({
  lede: "The younger wine of Carmignano, with the same blend rules, named after the Medici hunting park.",
  cat: "DOC, red and rosé", rec: "Within Carmignano DOC 1975; Barco Reale name 1994", d: "DOC/Barco Reale di Carmignano",
  facts: [["Communes", "Carmignano and Poggio a Caiano"], ["Grapes", "Sangiovese at least 50%; Canaiolo up to 20%; Cabernet Franc and Sauvignon 10 to 20%; white grapes up to 10%"], ["Yield", "10 t/ha; 10% natural"], ["Total alcohol", "11%"]],
  place: "The Carmignano hills.",
  rules: "The rosé (formerly Vin Ruspo) is also allowed.",
  history: "The Barco Reale was a Medici walled hunting reserve on the Montalbano.",
  glass: "Bright, fruity red.",
  exam: "Carmignano's DOC second label.",
  producers: ["Capezzana"]
});
APXF["it-vin-santo-di-carmignano"] = ts({
  lede: "The Vin Santo of Carmignano, from dried Trebbiano and Malvasia, and an Occhio di Pernice from Sangiovese.",
  cat: "DOC, sweet (Vin Santo)", rec: "Within Carmignano DOC 1975; separate DOC 2013", d: "DOC/Vin Santo di Carmignano",
  facts: [["Grapes", "Trebbiano and Malvasia at least 75%; Occhio di Pernice: Sangiovese at least 50%"], ["Yield", "10 t/ha"], ["Drying", "Pressed between 1 December and 31 March, at least 26.6% sugar"], ["Grape to wine", "35%"], ["Release", "1 November of the third year after the harvest; Riserva the fourth"], ["Total alcohol", "16%, of which 13% fermented"]],
  place: "The Carmignano hills.",
  rules: "Aged in small sealed barrels (caratelli).",
  glass: "Amber, dried fruit, nuts and honey.",
  exam: "Occhio di Pernice ('partridge eye') is the pink Vin Santo from red grapes.",
  producers: ["Capezzana"]
});
APXF["it-vin-santo-del-chianti-classico"] = ts({
  lede: "Vin Santo from dried grapes grown in the Chianti Classico zone, aged at least two years in small barrels.",
  cat: "DOC, sweet (Vin Santo)", rec: "DOC 1995", d: "DOC/Vin Santo del Chianti Classico",
  amended: "Text as amended by DM 22 March 2022",
  facts: [["Grapes", "Trebbiano, Malvasia Bianca Lunga, Malvasia di Candia at least 60%. Occhio di Pernice: Sangiovese at least 80%"], ["Yield", "8 t/ha"], ["Drying", "At least 27% sugar; no enrichment"], ["Ageing", "At least 24 months from 1 January after the harvest; released from 1 November of the third year"], ["Total alcohol", "16%, of which 10.5% fermented"]],
  place: "The Chianti Classico zone.",
  rules: "Grape to wine 35% of fresh grapes.",
  glass: "Amber, apricot, walnut, honey and caramel.",
  exam: "Separate DOC from Chianti Classico DOCG.",
  producers: ["Isole e Olena", "Badia a Coltibuono", "Felsina"]
});
APXF["it-vin-santo-del-chianti"] = ts({
  lede: "The Vin Santo of the wider Chianti zone, with the same subzone names as Chianti.",
  cat: "DOC, sweet (Vin Santo)", rec: "DOC 1997", d: "DOC/Vin Santo del Chianti",
  facts: [["Grapes", "Trebbiano and Malvasia Bianca Lunga at least 70%. Occhio di Pernice: Sangiovese at least 50%"], ["Drying", "At least 26% sugar (27% for Occhio di Pernice)"], ["Release", "1 November of the third year after the harvest; Riserva the fourth"], ["Total alcohol", "15.5% to 17% depending on type and subzone"]],
  place: "The Chianti zone and its subzones.",
  rules: "Subzone names allowed only for wine from that subzone.",
  glass: "Dried fruit and nuts, sweet or off-dry.",
  exam: "Distinct from Vin Santo del Chianti Classico.",
  producers: ["Fattoria Selvapiana"]
});
APXF["it-vin-santo-di-montepulciano"] = ts({
  lede: "Montepulciano's Vin Santo, including Occhio di Pernice, one of the most concentrated in Tuscany, aged in barrels of 300 litres or less.",
  cat: "DOC, sweet (Vin Santo)", rec: "DOC 1996", d: "DOC/Vin Santo di Montepulciano",
  amended: "Text as amended by DM 8 April 2020",
  facts: [["Grapes", "Malvasia Bianca, Grechetto (locally Pulcinculo), Trebbiano at least 70%. Occhio di Pernice: Sangiovese at least 50%"], ["Drying", "At least 28% sugar; 33% for Riserva and Occhio di Pernice"], ["Barrels", "Up to 300 litres; Riserva in caratelli of 125 litres or less"], ["Ageing", "At least 3 years for the base type; longer for Riserva and Occhio di Pernice"], ["Total alcohol", "17%; Riserva 20%; Occhio di Pernice 21%"]],
  place: "The commune of Montepulciano.",
  rules: "Bottled only in bordeaux-type bottles of 0.75 l or less with a cork.",
  glass: "Dark amber to mahogany, figs, dates, coffee and spice.",
  exam: "Pulcinculo is the local name for Grechetto.",
  producers: ["Avignonesi"]
});
APXF["it-san-gimignano"] = ts({
  lede: "The red, rosé and Vin Santo DOC of San Gimignano, alongside its white Vernaccia DOCG.",
  cat: "DOC, red, rosé, Vin Santo", rec: "DOC 1996", d: "DOC/San Gimignano",
  facts: [["Grapes", "Rosso and rosato: Sangiovese at least 50%, Cabernet Sauvignon, Merlot, Syrah, Pinot Nero up to 40%. Varietals at least 85%"], ["Yield", "Reds 8 t/ha; rosato and Vin Santo 10 t/ha"], ["Riserva", "24 months"], ["Vin Santo", "Released from 1 November of the third year; total 16.5%"]],
  place: "The commune of San Gimignano.",
  rules: "Varietal Sangiovese, Cabernet Sauvignon, Merlot, Syrah and Pinot Nero also allowed.",
  glass: "Medium-bodied reds.",
  exam: "San Gimignano DOC is red; the white is Vernaccia DOCG.",
  producers: []
});
APXF["it-cortona"] = ts({
  lede: "A DOC around Cortona in the Valdichiana, best known for Syrah.",
  cat: "DOC, red, white, Vin Santo", rec: "DOC 1999", d: "DOC/Cortona",
  facts: [["Zone", "Commune of Cortona (Arezzo)"], ["Types", "Rosso (Syrah 50 to 60%, Merlot 10 to 20%), Syrah, Sangiovese, Merlot, Cabernet Sauvignon, Chardonnay, Grechetto, Sauvignon; Vin Santo and Vin Santo Occhio di Pernice"], ["Riserva", "24 months, including 12 in wood and 4 in bottle"], ["Vin Santo", "Grapes dried to 28% sugar (35% for Occhio di Pernice)"]],
  place: "Slopes below the Etruscan hill town above the Valdichiana plain; warm days and cool nights suit Syrah.",
  rules: "Grape to wine 70%; Vin Santo 35%.",
  glass: "Peppery, dark-fruited Syrah.",
  exam: "Tuscany's Syrah DOC.",
  producers: ["Stefano Amerighi", "Tenimenti d'Alessandro", "Baracchi"]
});
APXF["it-valdichiana-toscana"] = ts({
  lede: "A broad DOC in the Valdichiana of Arezzo and Siena, historically for the white Bianco Vergine.",
  cat: "DOC, white, red, rosé, sparkling, Vin Santo", rec: "DOC 1972 (as Bianco Vergine Valdichiana)", d: "DOC/Valdichiana toscana",
  facts: [["Communes", "Parts of Arezzo, Castiglion Fiorentino, Cortona, Foiano, Lucignano, Marciano and others, plus Siena communes"], ["Grapes", "Bianco or Bianco Vergine: Trebbiano at least 20% with Chardonnay, Pinot Bianco, Grechetto, Pinot Grigio up to 80%. Rosso: Sangiovese at least 50%"], ["Vin Santo", "Released from 1 November of the third year (Riserva the fourth)"]],
  place: "The wide reclaimed valley between Arezzo, Cortona and Montepulciano.",
  rules: "Frizzante and spumante whites allowed.",
  glass: "Light, crisp whites; simple reds.",
  exam: "'Vergine' meant a white fermented off the skins.",
  producers: []
});
APXF["it-val-d-arno-di-sopra"] = ts({
  lede: "The upper Arno valley between Florence and Arezzo, one of the four zones of the 1716 edict, now a DOC for a wide range of varietals and a long-aged sparkling rosé.",
  cat: "DOC, red, white, rosé, sparkling, Vin Santo", rec: "DOC 2011", d: "DOC/Val d'Arno di Sopra o Valdarno di Sopra",
  amended: "AIS text amended by DM 26 June 2014; a later revision is reported and has not been reviewed here",
  facts: [["Also labelled", "Valdarno di Sopra"], ["Communes", "All of Cavriglia, Montevarchi, Bucine, Civitella in Val di Chiana, Castelfranco-Piandiscò, Terranuova Bracciolini, Loro Ciuffenna, San Giovanni Valdarno, Castiglion Fibocchi, Laterina and others"], ["Types", "Bianco, Rosso, Vendemmia tardiva, Vin Santo and many varietals including Sangiovese, Merlot, Cabernet Franc, Syrah, Pugnitello, Foglia Tonda, Malvasia Nera, Chardonnay, Orpicchio"], ["Sparkling rosé", "48 months on the lees before disgorging"], ["Riserva", "Reds released after 24 months; whites after 12"]],
  place: "Terraces between the Pratomagno massif and the Chianti hills along the upper Arno.",
  rules: "Grape to wine 70%; Vin Santo 35%.",
  history: "Named in Cosimo III's 1716 edict. The modern DOC was driven by organic estates of the valley.",
  glass: "Fresh Sangiovese and varied varietals.",
  exam: "One of the four historic 1716 zones, with Chianti, Pomino and Carmignano.",
  producers: ["Petrolo", "Il Borro"]
});
APXF["it-colli-dell-etruria-centrale"] = ts({
  lede: "An overlay DOC for the Chianti provinces, for wines that do not fit Chianti: whites, rosés, novello and Vin Santo.",
  cat: "DOC, red, rosé, white, Vin Santo", rec: "DOC 1990", d: "DOC/Colli dell'Etruria Centrale",
  facts: [["Zone", "The Chianti production area in the provinces of Arezzo, Florence, Pisa, Pistoia, Prato and Siena"], ["Grapes", "Rosso and rosato: Sangiovese at least 50%. Bianco: Trebbiano at least 50%"], ["Vin Santo", "Grapes dried to 26% sugar; released from 1 November of the third year (Riserva and Occhio di Pernice later)"], ["Density", "At least 3,300 vines/ha"]],
  place: "Central Tuscany's Chianti hills.",
  rules: "Novello released early.",
  glass: "Varies by type.",
  exam: "An umbrella for non-Chianti styles in the Chianti zone.",
  producers: []
});
APXF["it-grance-senesi"] = ts({
  lede: "A small DOC south-east of Siena named after the medieval farm estates (grance) of the Santa Maria della Scala hospital.",
  cat: "DOC, red, white, sweet", rec: "DOC 2010", d: "DOC/Grance Senesi",
  facts: [["Communes", "Rapolano Terme, Murlo, Asciano, Monteroni d'Arbia; part of Sovicille"], ["Grapes", "Rosso: Sangiovese at least 60%. Bianco: Trebbiano and Malvasia Bianca Lunga at least 60%"], ["Types", "Also Canaiolo, Sangiovese, Merlot, Cabernet Sauvignon, Malvasia Bianca Lunga, passito, vendemmia tardiva"]],
  place: "The Crete Senesi clay hills.",
  rules: "Grape to wine 70%; passito 35%.",
  glass: "Light reds and whites.",
  exam: "Grance were fortified farms of the Siena hospital.",
  producers: []
});
APXF["it-val-d-arbia"] = ts({
  lede: "A white, rosé and Vin Santo DOC along the Arbia river south-east of Siena.",
  cat: "DOC, white, rosé, Vin Santo", rec: "DOC 1985", d: "DOC/Val d'Arbia",
  facts: [["Grapes", "Bianco: Trebbiano and Malvasia Bianca Lunga 30 to 50% each. Rosato: Sangiovese at least 50%. Varietals Chardonnay, Grechetto, Pinot Bianco, Sauvignon, Trebbiano, Vermentino"], ["Grape to wine", "65%"], ["Vin Santo", "Released from 1 December of the third year (Riserva the fourth)"]],
  place: "The Arbia valley, overlapping the southern Chianti Classico communes and the Crete Senesi.",
  rules: "Vin Santo total at least 16%.",
  glass: "Light, simple whites.",
  exam: "A white DOC in Chianti country.",
  producers: []
});
APXF["it-terre-di-casole"] = ts({
  lede: "A small DOC around Casole d'Elsa, west of Siena, for Sangiovese reds and Chardonnay-based whites.",
  cat: "DOC, red, white, passito", rec: "DOC 2007", d: "DOC/Terre di Casole",
  facts: [["Grapes", "Bianco: Chardonnay at least 50%. Rosso: Sangiovese 60 to 80%. Sangiovese: at least 85%"], ["Yield", "Bianco 9 t/ha; rosso 8; Superiore and Sangiovese 7"]],
  place: "Hills around Casole d'Elsa near the Colline Metallifere.",
  rules: "Passito from grapes dried to 28% sugar.",
  glass: "Medium-bodied Sangiovese.",
  exam: "Tiny and rarely seen.",
  producers: []
});
APXF["it-montecarlo"] = ts({
  lede: "A small DOC east of Lucca with an unusual white blend that includes Sémillon, Pinot and Roussanne.",
  cat: "DOC, white, red, Vin Santo", rec: "DOC 1969", d: "DOC/Montecarlo",
  facts: [["Communes", "Parts of Montecarlo, Altopascio, Capannori, Porcari (Lucca)"], ["Bianco", "Trebbiano 30 to 60%; at least three of Sémillon, Pinot Grigio, Pinot Bianco, Vermentino, Sauvignon, Roussanne for 40 to 70%"], ["Rosso", "Sangiovese 50 to 75%; Canaiolo, Merlot, Syrah 15 to 40%; Ciliegiolo, Colorino, Malvasia Nera, Cabernet 10 to 30%"], ["Yield", "Blends 10 t/ha; Cabernet, Merlot, Syrah 7.5 t/ha"]],
  place: "Hills between Lucca and the Valdinievole.",
  rules: "Vin Santo released from 1 November of the third year.",
  history: "French varieties were brought here in the 19th century.",
  glass: "Fragrant, rounded whites.",
  exam: "Roussanne and Sémillon in a Tuscan DOC.",
  producers: []
});
APXF["it-colline-lucchesi"] = ts({
  lede: "The hills north and east of Lucca, for Sangiovese blends, Merlot, Vermentino and Vin Santo.",
  cat: "DOC, red, white, Vin Santo", rec: "DOC 1968", d: "DOC/Colline Lucchesi",
  facts: [["Communes", "Lucca, Capannori, Porcari"], ["Rosso", "Sangiovese 45 to 80%; Canaiolo, Ciliegiolo, Merlot, Syrah 10 to 50%"], ["Yield", "Blends 10 t/ha"], ["Vin Santo", "Grapes dried to 27% sugar; released from 1 November of the third year"]],
  place: "Hills of the Serchio valley around Lucca.",
  rules: "Riserva for rosso, Sangiovese and Merlot.",
  glass: "Light, fresh reds and whites.",
  exam: "Lucca's DOC.",
  producers: ["Tenuta di Valgiano"]
});
APXF["it-valdinievole"] = ts({
  lede: "A small DOC in the Nievole valley around Montecatini, for Trebbiano whites, Sangiovese-Canaiolo reds and Vin Santo.",
  cat: "DOC, white, red, Vin Santo", rec: "DOC 1976", d: "DOC/Valdinievole",
  facts: [["Zone", "Valdinievole, province of Pistoia"], ["Grapes", "Bianco: Trebbiano at least 70%. Rosso: Sangiovese at least 35%, Canaiolo at least 20%, together at least 70%"], ["Vin Santo", "Released from 1 December of the third year"]],
  place: "Hills of the Nievole valley.",
  rules: "Superiore versions exist.",
  glass: "Light wines.",
  exam: "One of Tuscany's smallest DOCs.",
  producers: []
});
APXF["it-bianco-dell-empolese"] = ts({
  lede: "A Trebbiano white and Vin Santo DOC around Empoli in the lower Arno valley.",
  cat: "DOC, white and Vin Santo", rec: "DOC 1989", d: "DOC/Bianco dell'Empolese",
  facts: [["Grapes", "Trebbiano at least 60%"], ["Vin Santo", "Grape to wine 35%; released from 1 December of the third year after the harvest; total 17%"]],
  place: "The lower Arno valley around Empoli.",
  rules: "Bianco released from 1 December of the harvest year.",
  glass: "Light, neutral white.",
  exam: "Rarely seen.",
  producers: []
});
APXF["it-candia-dei-colli-apuani"] = ts({
  lede: "Steep terraces between the Apuan Alps and the sea above Massa and Carrara, for Vermentino whites and rare local reds.",
  cat: "DOC, white, red, rosé, Vin Santo", rec: "DOC 1981", d: "DOC/Candia dei Colli Apuani",
  facts: [["Grapes", "Bianco: Vermentino at least 70%. Rosso: Sangiovese 60 to 80%, Merlot up to 20%. Also Vermentino Nero and Barsaglina (Massaretta)"], ["Vin Santo", "Released from 1 November of the third year"]],
  place: "Marble-country terraces near the Ligurian border.",
  rules: "Bianco may be dry or amabile, still or frizzante.",
  glass: "Saline Vermentino.",
  exam: "Barsaglina and Vermentino Nero are local reds.",
  producers: []
});
APXF["it-montescudaio"] = ts({
  lede: "A DOC in the hills of the lower Cecina valley, province of Pisa, for Sangiovese and Bordeaux varieties.",
  cat: "DOC, red, white, Vin Santo", rec: "DOC 1976", d: "DOC/Montescudaio",
  facts: [["Communes", "Including Casale Marittima, Castellina Marittima, Guardistallo, Montecatini Val di Cecina, Montescudaio, Riparbella"], ["Grapes", "Rosso: Sangiovese at least 50%. Varietals at least 85%"], ["Riserva", "24 months"]],
  place: "Hills inland from Cecina, north of Bolgheri.",
  rules: "Vin Santo grape to wine 35%.",
  glass: "Ripe reds.",
  exam: "Near the Etruscan Coast.",
  producers: []
});
APXF["it-terratico-di-bibbona"] = ts({
  lede: "A DOC on the coast north of Bolgheri, for Sangiovese-Merlot reds and Vermentino whites.",
  cat: "DOC, red, white, rosé", rec: "DOC 2006", d: "DOC/Terratico di Bibbona",
  facts: [["Communes", "Rosignano Marittimo, Cecina, Bibbona, Collesalvetti (Livorno)"], ["Grapes", "Rosso: Sangiovese at least 35%, Merlot at least 35%. Bianco: Vermentino at least 50%"], ["Superiore", "18 months including 12 in wood"]],
  place: "The coast between Livorno and Bolgheri.",
  rules: "Varietal types also allowed.",
  glass: "Ripe, soft reds.",
  exam: "Bolgheri's northern neighbour.",
  producers: []
});
APXF["it-terre-di-pisa"] = ts({
  lede: "A DOC for Sangiovese and blends in the hills of the province of Pisa.",
  cat: "DOC, red, white, rosé", rec: "DOC 2011", d: "DOC/Terre di Pisa",
  amended: "Text as amended by DM 26 June 2024",
  facts: [["Communes", "Fauglia, Crespina Lorenzana, Chianni, Capannoli, Palaia, Peccioli, Terricciola, Casciana Terme Lari, Ponsacco, Pontedera and others"], ["Grapes", "Sangiovese: at least 95%. Rosso: Sangiovese, Cabernet Sauvignon, Merlot, Syrah at least 70%"], ["Ageing", "Rosso 18 months from 1 November; Sangiovese 12 months"], ["Total alcohol", "12.5%"]],
  place: "The Pisan hills south-east of Pisa.",
  rules: "Bianco, rosato and Vermentino types also exist.",
  glass: "Ripe, structured Sangiovese.",
  exam: "Sangiovese at 95%, one of Tuscany's strictest varietal rules.",
  producers: []
});
APXF["it-san-torpe"] = ts({
  lede: "A white-focused DOC in the Pisan hills, named after Saint Torpes, a Pisan martyr.",
  cat: "DOC, white, rosé, Vin Santo", rec: "DOC 1980 (as Bianco Pisano di San Torpè)", d: "DOC/San Torpe",
  facts: [["Communes", "Casciana Terme, Capannoli, Chianni, Crespina, Lari, Palaia, Ponsacco, Terricciola and others"], ["Grapes", "Bianco: Trebbiano at least 50%. Rosato: Sangiovese at least 50%"], ["Vin Santo", "Released from 1 November of the third year (Riserva the fourth)"]],
  place: "The Pisan hills.",
  rules: "Varietal Chardonnay, Sauvignon, Trebbiano and Vermentino allowed.",
  glass: "Light whites.",
  exam: "Same area as Terre di Pisa.",
  producers: []
});
APXF["it-monteregio-di-massa-marittima"] = ts({
  lede: "A DOC in the northern Maremma around Massa Marittima, for Sangiovese reds, Vermentino and Vin Santo.",
  cat: "DOC, red, white, rosé, Vin Santo", rec: "DOC 1994", d: "DOC/Monteregio di Massa Marittima",
  facts: [["Zone", "Massa Marittima and neighbouring communes in northern Grosseto"], ["Types", "Rosso, Sangiovese, Syrah, Vermentino, Viognier, Bianco, Rosato, Novello, Vin Santo, Occhio di Pernice"], ["Vin Santo", "Released from 1 November of the third year (Riserva the fourth)"]],
  place: "The Colline Metallifere, mining hills inland from Follonica.",
  rules: "Grape to wine 70%.",
  glass: "Medium-bodied reds.",
  exam: "Northern Maremma.",
  producers: []
});
APXF["it-val-di-cornia"] = ts({
  lede: "The wider DOC of the Cornia valley on the southern Etruscan Coast, for whites, rosé, varietals and passito, whose best reds now have DOCGs.",
  cat: "DOC, white, rosé, red, passito", rec: "DOC 1989", d: "DOC/Val di Cornia",
  facts: [["Zone", "All of Suvereto and Sassetta and parts of Piombino, San Vincenzo and Campiglia Marittima (Livorno), plus a part of the province of Pisa"], ["Types", "Bianco (Vermentino at least 50%), rosato, Ansonica, Vermentino, Cabernet Sauvignon, Ciliegiolo, Merlot, Sangiovese, Aleatico passito, Ansonica passito"]],
  place: "Hills and plain inland from Piombino.",
  rules: "Superiore for Sangiovese, Cabernet Sauvignon and Merlot.",
  glass: "Mediterranean whites and ripe reds.",
  exam: "Val di Cornia DOC; Val di Cornia Rosso and Suvereto are DOCGs.",
  producers: []
});
APXF["it-elba"] = ts({
  lede: "The island DOC of Elba, for Sangiovese reds, Ansonica and Vermentino whites, and passito and Vin Santo.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 1967", d: "DOC/Elba",
  facts: [["Zone", "The island of Elba"], ["Types", "Rosso, Riserva, Rosato, Sangiovese, Bianco, Bianco Spumante, Ansonica, Vermentino, Trebbiano (Procanico), Ansonica Passito, Moscato Passito, Bianco Passito, Vin Santo, Occhio di Pernice"], ["Grapes", "Rosso: Sangiovese at least 60%"]],
  place: "Granite and schist slopes in the Tuscan Archipelago.",
  rules: "Aleatico passito became a separate DOCG in 2011.",
  glass: "Saline whites and sweet passiti.",
  exam: "Elba DOC versus Elba Aleatico Passito DOCG.",
  producers: []
});
APXF["it-ansonica-costa-dell-argentario"] = ts({
  lede: "Ansonica (Sicily's Inzolia) from the Argentario promontory, the island of Giglio and the southern Maremma coast.",
  cat: "DOC, white", rec: "DOC 1995", d: "DOC/Ansonica Costa dell'Argentario",
  facts: [["Zone", "All of Monte Argentario and Isola del Giglio; parts of Manciano, Orbetello, Capalbio"], ["Grape", "Ansonica at least 85%"], ["Total alcohol", "11.5%"]],
  place: "Coastal hills and granite island terraces.",
  rules: "Grape to wine 70%.",
  glass: "Saline, nutty white.",
  exam: "Ansonica equals Inzolia.",
  producers: []
});
APXF["it-capalbio"] = ts({
  lede: "A southern Maremma DOC near the Lazio border for Sangiovese reds, Vermentino and Vin Santo.",
  cat: "DOC, red, white, rosé, Vin Santo", rec: "DOC 1999", d: "DOC/Capalbio",
  facts: [["Grapes", "Rosso: Sangiovese at least 50%, no Aleatico. Bianco: Trebbiano at least 50%. Vermentino at least 85%"], ["Riserva", "24 months including 6 in wood; released from 1 June of the third year"], ["Vin Santo", "Released from 1 November of the third year"]],
  place: "Hills and plain near the coast in southern Grosseto.",
  rules: "Whites released from 31 December of the harvest year.",
  glass: "Fresh Vermentino.",
  exam: "Southern Maremma.",
  producers: []
});
APXF["it-parrina"] = ts({
  lede: "A small DOC named after the Parrina estate near Orbetello in the southern Maremma.",
  cat: "DOC, red, white, rosé, Vin Santo", rec: "DOC 1971", d: "DOC/Parrina",
  facts: [["Grapes", "Rosso: Sangiovese at least 70%. Bianco: Trebbiano 10 to 30%, Ansonica 30 to 50%, Vermentino 20 to 40%"], ["Yield", "Sangiovese, Cabernet Sauvignon and Merlot 9 t/ha; others 10"]],
  place: "Hills behind the Orbetello lagoon.",
  rules: "Vin Santo released from 1 November of the third year.",
  glass: "Light reds and coastal whites.",
  exam: "Essentially one estate's name.",
  producers: ["La Parrina"]
});
APXF["it-bianco-di-pitigliano"] = ts({
  lede: "A Trebbiano-based white from the tufa country around Pitigliano and Sorano in southern Tuscany.",
  cat: "DOC, white (also Superiore, sparkling, Vin Santo)", rec: "DOC 1966", d: "DOC/Bianco di Pitigliano",
  facts: [["Communes", "All of Pitigliano and Sorano; parts of Scansano and Manciano"], ["Grapes", "Trebbiano 40 to 100%; Greco, Malvasia, Verdello, Grechetto, Ansonica, Chardonnay, Sauvignon, Viognier, Pinot Bianco, Riesling Italico up to 60%"], ["Vin Santo", "18 months from 1 January; released from 1 March of the third year; total 16%"]],
  place: "Volcanic tufa plateaus cut by gorges, with cellars dug into the rock.",
  rules: "Superiore from riper grapes (11.5% natural).",
  glass: "Light, fresh white.",
  exam: "Volcanic soils in southern Tuscany.",
  producers: []
});
APXF["it-sovana"] = ts({
  lede: "Reds from the tufa hills around Pitigliano, Sorano and Sovana, including Aleatico and Ciliegiolo.",
  cat: "DOC, red, rosé, sweet", rec: "DOC 1999", d: "DOC/Sovana",
  facts: [["Communes", "All of Pitigliano and Sorano; part of Manciano"], ["Grapes", "Rosso: Sangiovese at least 50%. Varietals (Aleatico, Cabernet Sauvignon, Ciliegiolo, Merlot, Sangiovese) at least 85%"], ["Release", "Rosso 1 March; Superiore 1 June after the harvest; Riserva after 24 months from 1 November"]],
  place: "The same volcanic area as Bianco di Pitigliano.",
  rules: "Aleatico Passito also allowed.",
  glass: "Ripe reds; aromatic Aleatico.",
  exam: "Ciliegiolo is a southern Tuscan speciality.",
  producers: []
});
