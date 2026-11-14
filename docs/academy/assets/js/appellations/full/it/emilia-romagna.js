// Full encyclopedia entries: Emilia-Romagna. Written from each disciplinare di produzione (AIS copies).
function erSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function er(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [erSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-romagna-albana"] = er({
  lede: "Albana from the Romagna hills, Italy's first white DOCG (1987), made dry, off-dry, sweet and, at its best, as a passito.",
  cat: "DOCG, white (secco, amabile, dolce, passito)", rec: "DOC 1967; DOCG 1987 (first white DOCG)", d: "Romagna/DOCG/Romagna Albana",
  amended: "Text as amended by DM 20 March 2018 and a 2019 ordinary amendment",
  facts: [["Grape", "Albana at least 95%"], ["Types", "Secco, amabile, dolce, passito, passito riserva"], ["Yield", "10 t/ha; 11.5% natural"], ["Passito", "Grapes dried until as late as 30 March after the harvest, to at least 284 g/l sugar; grape to wine 50%; released from 1 September of the year after (Riserva from 1 December); total alcohol 17%, Riserva 24%"], ["Riserva and botrytis", "Passito riserva may come from grapes shrivelled on the vine with noble rot"]],
  place: "Hills of the provinces of Forlì-Cesena, Ravenna and Bologna between Imola and Cesena, on clay, sandstone and the chalky 'spungone' near Bertinoro.",
  rules: "The DOCG was renamed 'Romagna Albana' (formerly Albana di Romagna) in 2011.",
  history: "Its 1987 DOCG, Italy's first for a white wine, was controversial because the wine was then little known.",
  glass: "Dry: golden, apricot, almond, a slight tannic grip. Passito: honey, dried apricot, saffron, with botrytis in some.",
  exam: "First white DOCG (1987). Albana is a tannic white grape.",
  producers: ["Fattoria Zerbina", "Tre Monti", "Celli", "Leone Conti"]
});
APXF["it-colli-bolognesi-classico-pignoletto"] = er({
  lede: "The hill version of Pignoletto (Grechetto Gentile) from the Colli Bolognesi, still, frizzante or sparkling.",
  cat: "DOCG, white (still, frizzante, spumante)", rec: "Type of Colli Bolognesi DOC 1997; DOCG 2010 (DM 8 November 2010)", d: "Emilia/DOCG/Colli Bolognesi Pignoletto",
  amended: "Text as amended by Regulation (EU) 2023/445",
  facts: [["Grapes", "Grechetto Gentile (locally Alionzina or Pignoletto) at least 85%"], ["Types", "Frizzante, spumante, Superiore, Classico Superiore"], ["Classico", "Still Superiore from the oldest zone; grape to wine 65%; total alcohol 13%"], ["Superiore", "Released from 4 October of the year after the harvest"]],
  place: "Clay and sandstone hills south-west of Bologna along the Reno, Samoggia and Lavino valleys.",
  rules: "Bottling within the zone, with established exceptions.",
  glass: "Fresh, lightly bitter-almond white; often lightly sparkling.",
  exam: "Pignoletto is genetically Grechetto di Todi (Grechetto Gentile).",
  producers: []
});
APXF["it-pignoletto"] = er({
  lede: "The plain and hill Pignoletto DOC created in 2014; since the 2024 harvest it is called Emilia-Romagna DOC, reserved for Pignoletto wines.",
  cat: "DOC, white (still, frizzante, spumante, passito, late harvest)", rec: "DOC 2014 (Pignoletto); renamed Emilia-Romagna DOC by EU implementing regulation, from the 2024 harvest", d: "Emilia/DOC/Emilia-Romagna",
  sources: [["Italian Wine Central: Pignoletto DOC (renamed Emilia-Romagna DOC)", "https://italianwinecentral.com/denomination/pignoletto-doc"]],
  facts: [["Grapes", "Pignoletto at least 85%; Pinot Nero and Pinot Grigio vinified white may be among the other 15%"], ["Zone", "Communes of the provinces of Bologna and Modena (and the Imola area)"], ["Natural alcohol", "9%"], ["Grape to wine", "70%"], ["Passito", "Grapes to 15% potential alcohol; total 15%, at least 12% actual"], ["Late harvest", "9 t/ha; 14% potential; total 14%, 12% actual"]],
  place: "The Reno and Panaro plains and foothills between Bologna and Modena.",
  rules: "Most is sold as frizzante or tank-method spumante.",
  history: "Producers pushed for the region's name to protect Pignoletto as a place rather than a grape.",
  glass: "Light, citrus and green apple, gently sparkling.",
  exam: "The DOC once called Pignoletto is now Emilia-Romagna DOC; Colli Bolognesi Pignoletto is the hill DOCG.",
  producers: []
});
APXF["it-lambrusco-di-sorbara"] = er({
  lede: "The palest, most fragrant Lambrusco, from the Sorbara variety on the sandy plain north of Modena between the Secchia and Panaro.",
  cat: "DOC, red and rosé (frizzante, spumante)", rec: "DOC 1970", d: "Emilia/DOC/Lambrusco di Sorbara",
  amended: "Text as amended by DM 8 October 2018",
  facts: [["Grapes", "Lambrusco di Sorbara at least 60%; Lambrusco Salamino up to 40%; other Lambruschi up to 15%"], ["Yield", "18 t/ha; 9.5% natural"], ["Total alcohol", "Spumante 11%; frizzante 10.5%"]],
  place: "Alluvial sandy soils near Sorbara and Bomporto.",
  rules: "Sorbara has a female-functional flower and needs Salamino as pollinator, hence the blend. Second fermentation in tank or bottle (including the ancestral 'rifermentato in bottiglia').",
  glass: "Pale ruby-pink, violet and strawberry, sharp acidity, dry and frothy.",
  exam: "Sorbara is the lightest Lambrusco; Grasparossa the darkest.",
  producers: ["Cleto Chiarli", "Paltrinieri", "Cantina della Volta", "Francesco Bellei"]
});
APXF["it-lambrusco-grasparossa-di-castelvetro"] = er({
  lede: "The darkest, most tannic Lambrusco, from Grasparossa on the foothills south of Modena around Castelvetro.",
  cat: "DOC, red and rosé (frizzante, spumante)", rec: "DOC 1970", d: "Emilia/DOC/Lambrusco Grasparossa di Castelvetro",
  amended: "Text as amended by DM 8 October 2018",
  facts: [["Grapes", "Lambrusco Grasparossa at least 85%; other Lambruschi and Malbo Gentile up to 15%"], ["Yield", "18 t/ha; 9.5% natural"], ["Total alcohol", "Spumante 11%; frizzante 10.5%"]],
  place: "Clay foothills of the Apennines south of Modena.",
  rules: "Dry to sweet styles.",
  glass: "Deep purple, black cherry, firm tannin, often off-dry.",
  exam: "Grasparossa = red-stemmed, dark, tannic Lambrusco.",
  producers: ["Vittorio Graziano", "Cleto Chiarli", "Fattoria Moretto"]
});
APXF["it-lambrusco-salamino-di-santa-croce"] = er({
  lede: "Mid-weight Lambrusco from the Salamino variety around Santa Croce near Carpi, north of Modena.",
  cat: "DOC, red and rosé (frizzante, spumante)", rec: "DOC 1970", d: "Emilia/DOC/Lambrusco Salamino di Santa Croce",
  amended: "Text as amended by DM 8 October 2018",
  facts: [["Grapes", "Lambrusco Salamino at least 85%; other Lambruschi, Ancellotta, Fortana up to 15%"], ["Yield", "19 t/ha; 9.5% natural"]],
  place: "The plain around Carpi.",
  rules: "The name comes from the salami-shaped bunch.",
  glass: "Ruby, red berries, moderate tannin.",
  exam: "Between Sorbara and Grasparossa in colour and body.",
  producers: ["Cavicchioli"]
});
APXF["it-modena"] = er({
  lede: "A province-wide DOC for Lambrusco and other sparkling wines of Modena.",
  cat: "DOC, red, rosé, white (frizzante, spumante)", rec: "DOC 2009 (DM 27 July 2009)", d: "Emilia/DOC/Modena o di Modena",
  facts: [["Also labelled", "di Modena"], ["Types", "Lambrusco, Rosso, Rosato, Bianco, also novello"], ["Yield", "23 t/ha; 9.5% natural"]],
  place: "The whole province of Modena.", rules: "High-yield regional DOC.", glass: "Simple, frothy wines.", exam: "Catch-all Modena DOC.", producers: []
});
APXF["it-reggiano"] = er({
  lede: "The Lambrusco DOC of the province of Reggio Emilia, using many Lambrusco varieties, including the dark Ancellotta.",
  cat: "DOC, red, white (frizzante, spumante)", rec: "DOC 1971", d: "Emilia/DOC/Reggiano",
  facts: [["Types", "Lambrusco, Lambrusco Salamino, Rosso, Bianco spumante, novello"], ["Yield", "18 t/ha; 9.5% natural"]],
  place: "The plain and foothills of Reggio Emilia.", rules: "Dry to sweet styles; some partly fermented musts allowed.", glass: "Fruity, purple Lambrusco.", exam: "Reggio's Lambrusco DOC.", producers: ["Medici Ermete", "Lini 910"]
});
APXF["it-colli-di-scandiano-e-di-canossa"] = er({
  lede: "Hills of Reggio Emilia for Spergola whites, Lambruschi including Montericco, Malbo Gentile and Marzemino.",
  cat: "DOC, white, red, sparkling, passito", rec: "DOC 1976 (DPR 25 November 1976, as Bianco di Scandiano)", d: "Emilia/DOC/Colli di Scandiano e di Canossa",
  facts: [["Types", "Sauvignon, Malvasia, Pinot, Chardonnay, Spergola (also spumante, passito), Lambrusco Grasparossa, Lambrusco Montericco, Marzemino, Malbo Gentile, Cabernet Sauvignon, bianco, rosso"], ["Yields", "15 to 16 t/ha; passito 10 t/ha"]],
  place: "Apennine foothills around Scandiano and the Matilda of Canossa castles.", rules: "Passito grape to wine 50%.", glass: "Crisp Spergola; frothy reds.", exam: "Spergola is a local white once confused with Sauvignon.", producers: []
});
APXF["it-colli-di-parma"] = er({
  lede: "Hills of Parma, for frizzante Malvasia and a Barbera-Croatina red.",
  cat: "DOC, white, red, sparkling", rec: "DOC 1982", d: "Emilia/DOC/Colli di Parma",
  facts: [["Types", "Rosso, Malvasia, Sauvignon, Chardonnay, Pinots, Spumante, Merlot, Cabernets, Barbera, Bonarda, Lambrusco"], ["Malvasia", "11 t/ha; grape to wine 65%"]],
  place: "Foothills of the Taro and Baganza valleys.", rules: "Many frizzante types.", glass: "Aromatic Malvasia di Candia frizzante.", exam: "Malvasia di Candia Aromatica dominates.", producers: []
});
APXF["it-colli-piacentini"] = er({
  lede: "Hills of Piacenza on the Lombardy border, for Malvasia, Barbera-Croatina reds and Vin Santo di Vigoleno.",
  cat: "DOC, white, red, sparkling, sweet", rec: "DOC 1967", d: "Emilia/DOC/Colli Piacentini",
  facts: [["Types", "Monterosso Val d'Arda, Trebbianino Val Trebbia, Valnure, Barbera, Bonarda, Malvasia (also passito), Pinot Grigio, Pinot Nero, Sauvignon, Cabernet Sauvignon, Chardonnay, Novello, Vin Santo, Vin Santo di Vigoleno"], ["Vin Santo di Vigoleno", "Grapes dried to 30% sugar; total alcohol 18%"]],
  place: "Valleys of the Tidone, Trebbia, Nure and Arda.", rules: "Gutturnio and Ortrugo became separate DOCs.", glass: "Frizzante whites; Barbera-Croatina reds.", exam: "Vin Santo di Vigoleno is one of Italy's rarest sweet wines.", producers: ["La Stoppa"]
});
APXF["it-gutturnio"] = er({
  lede: "The Barbera-Croatina red of the Piacenza hills, frizzante or still and aged.",
  cat: "DOC, red", rec: "Type of Colli Piacentini 1967; own DOC 2010", d: "Emilia/DOC/Gutturnio",
  amended: "Text as amended by DM 26 October 2017 and a ministerial provision of 12 July 2019",
  facts: [["Grapes", "Barbera 55 to 70%; Croatina (Bonarda) 30 to 45%"], ["Types", "Frizzante, Superiore, Classico Superiore, Riserva, Classico Riserva"], ["Total alcohol", "12%; Superiore 12.5%; Riserva 13%"]],
  place: "The Piacenza hills including Ziano Piacentino; Classico for the historic core.", rules: "Grape to wine 70%.", history: "Named after a Roman silver drinking vessel (gutturnium) found nearby.", glass: "Juicy, cherry-fruited, sometimes frothy.", exam: "Gutturnio = Barbera + Croatina.", producers: ["La Stoppa", "Luretta"]
});
APXF["it-ortrugo-dei-colli-piacentini"] = er({
  lede: "Ortrugo, a native white of Piacenza, still, frizzante or sparkling.",
  cat: "DOC, white", rec: "DOC 2010", d: "Emilia/DOC/Ortrugo dei Colli Piacentini o Ortrugo-Colli Piacentini",
  facts: [["Grape", "Ortrugo at least 90%"], ["Total alcohol", "11%"]],
  place: "The Piacenza hills.", rules: "Grape to wine 70%.", glass: "Light, bitter-almond, often frizzante.", exam: "Ortrugo is native to Piacenza.", producers: []
});
APXF["it-colli-bolognesi"] = er({
  lede: "Hills south-west of Bologna, for Barbera, Bordeaux varieties and whites, with a Bologna subzone.",
  cat: "DOC, red, white", rec: "DOC 1975", d: "Emilia/DOC/Colli Bolognesi",
  facts: [["Types", "Barbera (also riserva), Merlot, Cabernet Sauvignon, Chardonnay, Sauvignon, Riesling Italico, Pinot Bianco"], ["Yields", "10 to 12 t/ha"], ["Subzone", "Bologna"]],
  place: "Clay and sandstone hills along the Reno, Samoggia and Lavino.", rules: "Pignoletto became a DOCG of its own.", glass: "Fresh Barbera; Cabernet with herbal notes.", exam: "Pignoletto is the hill DOCG.", producers: []
});
APXF["it-reno"] = er({
  lede: "A plain DOC north of Bologna, now chiefly for Montuni, a local white.",
  cat: "DOC, white", rec: "DOC 1987 (DPR 22 June 1987)", d: "Emilia/DOC/Reno",
  facts: [["Types", "Montuni (Montù at least 85%), Bianco (Albana and Trebbiano), frizzante, spumante"], ["Yield", "18 t/ha; 10% natural"]],
  place: "The Reno plain.", rules: "Grape to wine 70%.", glass: "Neutral, light whites.", exam: "Montù = Montuni.", producers: []
});
APXF["it-bosco-eliceo"] = er({
  lede: "Coastal sandy vineyards near Ferrara and Ravenna, home of Fortana, a red often called 'uva d'oro'.",
  cat: "DOC, red, white", rec: "DOC 1989", d: "Emilia/DOC/Bosco Eliceo",
  amended: "Text as amended by DM 23 October 2018",
  facts: [["Types", "Fortana (also frizzante), Merlot, Sauvignon, Bianco"], ["Yield", "15 t/ha"]],
  place: "Sand dunes and pine woods of the Po delta coast, where ungrafted vines survive in sand.", rules: "Grape to wine 70%.", glass: "Fortana: tart, light red, often off-dry and fizzy.", exam: "Sandy soils kept phylloxera out.", producers: []
});
APXF["it-romagna"] = er({
  lede: "The DOC of Romagna, centred on Sangiovese (Romagna Sangiovese), with 16 subzones, plus Trebbiano, Pagadebit, Cagnina and sparkling Albana.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 2011 (uniting the earlier Romagna DOCs)", d: "Romagna/DOC/Romagna",
  amended: "Text as amended by DM 26 May 2022",
  facts: [["Types", "Sangiovese (also novello, riserva, superiore, passito), Trebbiano, Pagadebit (Bombino Bianco), Cagnina (Refosco/Terrano, sweet), Albana spumante dolce, Bianco, Rosato, Rosso"], ["Subzones", "Bertinoro, Brisighella, Castrocaro, Cesena, Longiano, Meldola, Modigliana, Marzeno, Oriolo, Predappio, Mercato Saraceno, Serra, Imola, Coriano, San Clemente, Verucchio"], ["Yields", "Sangiovese 12 t/ha; Superiore 10.5 t/ha; Bianco and Rosato 18"], ["Release", "Sangiovese 1 December of the harvest year; Superiore 1 April after; Riserva after 24 months from 1 December; Cagnina from 10 October"]],
  place: "Apennine foothills from Imola to Rimini: clay and the yellow sands and 'spungone' (fossil limestone) around Bertinoro; Modigliana's sandstone at altitude.",
  rules: "Subzone names carry stricter rules; Riserva 24 months.",
  glass: "Sangiovese: cherry, violet, softer than Tuscan; Modigliana fresher and more mineral.",
  exam: "Romagna Sangiovese plus 16 subzones; Pagadebit = Bombino Bianco; Cagnina = sweet Terrano.",
  producers: ["Fattoria Zerbina", "Villa Papiano", "Il Pratello", "Tre Monti", "Noelia Ricci", "Torre San Martino"]
});
APXF["it-colli-di-rimini"] = er({
  lede: "The Rimini hills DOC, for Sangiovese, Cabernet, Biancame and the sweet or dry Rebola (Pignoletto).",
  cat: "DOC, red, white, passito", rec: "DOC 1996", d: "Romagna/DOC/Rimini",
  amended: "Text as amended by DM 6 August 2020 and an EU implementing regulation",
  facts: [["Also labelled", "Rimini"], ["Types", "Rosso, Bianco, Cabernet Sauvignon, Biancame, Sangiovese (superiore, riserva), Rebola secco, Rebola passito"], ["Riserva", "24 months from 1 December"]],
  place: "Hills inland from Rimini.", rules: "Rebola passito total alcohol 17%.", glass: "Rebola: aromatic, sometimes sweet white.", exam: "Rebola is the Rimini name for Grechetto Gentile.", producers: []
});
APXF["it-colli-d-imola"] = er({
  lede: "A small DOC in the Imola hills for blends and varietals.",
  cat: "DOC, red, white", rec: "DOC 1997", d: "Romagna/DOC/Colli d'Imola",
  facts: [["Types", "Rosso (also novello, riserva), Bianco (also frizzante, superiore), Sangiovese, Cabernet Sauvignon, Barbera, Trebbiano, Chardonnay, Pignoletto"]],
  place: "Foothills between Bologna and Romagna.", rules: "Grape to wine 70%.", glass: "Simple wines.", exam: "Minor DOC; Imola is also a Romagna subzone.", producers: []
});
APXF["it-colli-di-faenza"] = er({
  lede: "Hills around Faenza for Sangiovese, blends and Pinot Bianco.",
  cat: "DOC, red, white", rec: "DOC 1997", d: "Romagna/DOC/Colli di Faenza",
  facts: [["Types", "Bianco (Chardonnay 40 to 60%), Rosso, Pinot Bianco, Sangiovese, Trebbiano"], ["Yields", "8.5 to 11.5 t/ha"]],
  place: "Foothills of the Lamone valley.", rules: "Grape to wine 70%.", glass: "Medium-bodied reds.", exam: "Minor DOC.", producers: []
});
APXF["it-colli-romagna-centrale"] = er({
  lede: "A DOC for the central Romagna hills around Cesena and Forlì, for Sangiovese, Cabernet and Chardonnay-based blends.",
  cat: "DOC, red, white", rec: "DOC 2001 (DM 29 September 2001)", d: "Romagna/DOC/Colli Romagna Centrale",
  facts: [["Types", "Bianco (Chardonnay 50 to 60%), Rosso, Chardonnay, Cabernet Sauvignon, Sangiovese, Trebbiano; riserva"]],
  place: "Hills of the Savio and Bidente valleys.", rules: "Released from 30 April of the year after the harvest; sold only in glass or ceramic containers.", glass: "Structured reds.", exam: "Minor DOC.", producers: []
});
