// Full encyclopedia entries: Lombardy. Written from each disciplinare di produzione (AIS copies).
const LOD = "https://aisitalia.it/Disciplinari/";
function loSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", LOD + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function lom(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [loSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const LO_OP = "the Oltrepò Pavese hills south of the Po in the province of Pavia (Broni, Canneto Pavese, Casteggio, Montalto, Santa Maria della Versa and others)";
APXF["it-franciacorta"] = lom({
  lede: "Italy's leading traditional-method sparkling wine, from the moraine hills south of Lake Iseo near Brescia: a DOCG for bottle-fermented wine only.",
  cat: "DOCG, traditional-method sparkling (white, Satèn, rosé)", rec: "DOC 1967 (still and sparkling); DOCG 1995 (sparkling only)", d: "Lombardia/DOCG/Franciacorta",
  amended: "Text as amended by DM 7 May 2024",
  facts: [["Grapes", "Chardonnay and/or Pinot Nero; Pinot Bianco up to 50%; Erbamat up to 10%"], ["Rosé", "Pinot Nero at least 35%"], ["Satèn", "White grapes only (Chardonnay with up to 50% Pinot Bianco), Brut only, under 5 bar pressure"], ["Yield", "10 t/ha; 9.5% natural (Erbamat 9%)"], ["Grape to wine", "65%, including the liqueur de tirage"], ["Minimum time on lees", "Franciacorta 18 months; Rosé and Satèn 24; Millesimato 30; Riserva 60"], ["Millesimato", "At least 85% of the stated vintage"]],
  place: "Glacial moraine amphitheatre between Lake Iseo and Brescia: gravelly, well-drained soils, the lake tempering the climate.",
  rules: "Only bottle-fermented, disgorged sparkling wine. The still wines of the area are Curtefranca DOC. The label need not say 'metodo classico' or 'spumante'; the name alone signifies the method.",
  history: "Guido Berlucchi and oenologist Franco Ziliani released the first Franciacorta sparkling wine (Pinot di Franciacorta) in 1961. Ca' del Bosco and Bellavista built its luxury image from the 1970s.",
  glass: "Fine mousse, citrus, white peach, brioche; Satèn creamier.",
  exam: "Franciacorta 18 months, Satèn and Rosé 24, Millesimato 30, Riserva 60. Erbamat is a native late-ripening, high-acid grape allowed up to 10%.",
  producers: ["Ca' del Bosco", "Bellavista", "Berlucchi", "Cavalleri", "Uberti", "Barone Pizzini", "Arcari + Danesi"]
});
APXF["it-curtefranca"] = lom({
  lede: "The still red and white wines of the Franciacorta area, formerly Terre di Franciacorta.",
  cat: "DOC, white, red", rec: "DOC 1995 (as Terre di Franciacorta); renamed Curtefranca 2008", d: "Lombardia/DOC/Curtefranca",
  amended: "Text as amended by DM 14 March 2024",
  facts: [["Bianco", "Chardonnay at least 50%; Pinot Bianco and/or Pinot Nero up to 50%"], ["Rosso", "Cabernet Franc and/or Carmenère at least 20%; Merlot at least 25%; Cabernet Sauvignon 10 to 35%; others up to 15%"], ["Grape to wine", "68%"], ["Release", "Bianco 1 February after the harvest; Rosso 1 July"]],
  place: "The Franciacorta hills near Lake Iseo.",
  rules: "Vigna versions released later.",
  glass: "Clean Chardonnay; herbal Bordeaux blend.",
  exam: "Curtefranca is the still-wine partner of Franciacorta.",
  producers: []
});
APXF["it-valtellina-superiore"] = lom({
  lede: "Alpine Nebbiolo (Chiavennasca) from terraced south-facing slopes above the Adda in the Valtellina, with five historic subzones.",
  cat: "DOCG, red", rec: "DOC 1968; DOCG 1998", d: "Lombardia/DOCG/Valtellina superiore",
  facts: [["Grapes", "Nebbiolo (Chiavennasca) at least 90%"], ["Subzones", "Maroggia, Sassella, Grumello, Inferno, Valgella"], ["Yield", "56 hl/ha of wine (about 8 t/ha); 11% natural"], ["Ageing", "24 months, part in wood, from 1 December after the harvest; Riserva 3 years"], ["Total alcohol", "12%"]],
  place: "Some 2,500 km of dry-stone terraces on the Rhaetian Alps' south-facing slope, between 300 and 700 m, near Sondrio and Tirano; granite and schist soils.",
  rules: "The specification allows wine bottled in Switzerland to use the traditional name Stagafassli.",
  history: "The Valtellina belonged to the Swiss Grisons from 1512 to 1797, and its wines went north over the passes.",
  glass: "Pale garnet, red berries, rose, herbs, fine tannin and alpine acidity.",
  exam: "Chiavennasca = Nebbiolo. Subzones: Maroggia, Sassella, Grumello, Inferno, Valgella.",
  producers: ["Ar.Pe.Pe.", "Nino Negri", "Rainoldi", "Sandro Fay", "Mamete Prevostini", "Dirupi"]
});
APXF["it-sforzato-di-valtellina"] = lom({
  lede: "Dry red from Valtellina Nebbiolo dried after harvest until at least December: the Alpine cousin of Amarone, Italy's first dry passito DOCG.",
  cat: "DOCG, red (dry, from dried grapes)", rec: "DOC 1968 (as a Valtellina type); DOCG 2003", d: "Lombardia/DOCG/Sforzato di Valtellina o Sfursat di Valtellina",
  facts: [["Also labelled", "Sfursat di Valtellina"], ["Grapes", "Nebbiolo (Chiavennasca) at least 90%"], ["Drying", "Grapes 11% natural at harvest, dried in ventilated lofts to at least 14%; vinified not before 1 December"], ["Yield in wine", "No more than 40 hl/ha"], ["Ageing", "20 months including 12 in wood, from 1 April after the harvest"], ["Total alcohol", "14%"]],
  place: "The Valtellina terraces.",
  rules: "Drying rooms kept between 5 and 35°C with low humidity.",
  glass: "Dried cherry, fig, spice, with Nebbiolo's tannin and acidity.",
  exam: "Sforzato = 'forced'; dried-grape Nebbiolo.",
  producers: ["Nino Negri (5 Stelle)", "Rainoldi", "Mamete Prevostini"]
});
APXF["it-valtellina-rosso"] = lom({
  lede: "The base Nebbiolo of the Valtellina, from the same terraces as the Superiore at higher yields.",
  cat: "DOC, red", rec: "DOC 1968 (as Valtellina); renamed 2011", d: "Lombardia/DOC/Valtellina rosso o rosso di Valtellina",
  facts: [["Also labelled", "Rosso di Valtellina"], ["Grapes", "Nebbiolo (Chiavennasca) at least 90%"], ["Yield", "10 t/ha; 10% natural"], ["Release", "After at least 6 months from 1 December"], ["Total alcohol", "11%"]],
  place: "Slopes of the Adda valley in the province of Sondrio.",
  rules: "May be aged in wood.",
  glass: "Light, crunchy Nebbiolo.",
  exam: "The entry level under Valtellina Superiore.",
  producers: []
});
APXF["it-scanzo"] = lom({
  lede: "A tiny DOCG for sweet red passito from the rare Moscato di Scanzo grape, grown in one commune near Bergamo.",
  cat: "DOCG, sweet red (passito)", rec: "DOC 2002; DOCG 2009", d: "Lombardia/DOCG/Scanzo o Moscato di Scanzo",
  facts: [["Also labelled", "Scanzo"], ["Grape", "Moscato di Scanzo 100%"], ["Zone", "Part of the commune of Scanzorosciate (Bergamo)"], ["Yield", "7 t/ha; 12% natural"], ["Grape to wine", "30%"], ["Ageing", "At least two years; released from 1 November of the second year after the harvest"], ["At release", "Total alcohol at least 17%, 14% actual"]],
  place: "Steep slopes of 'sass de luna' marl near Bergamo.",
  rules: "Made from dried grapes.",
  glass: "Rose, cherry jam, spice, sweet.",
  exam: "One of Italy's smallest DOCGs.",
  producers: []
});
APXF["it-oltrepo-pavese-metodo-classico"] = lom({
  lede: "Traditional-method sparkling wine from Pinot Nero in the Oltrepò Pavese, Italy's largest Pinot Nero area.",
  cat: "DOCG, traditional-method sparkling", rec: "DOC 1970 (within Oltrepò Pavese); DOCG 2007", d: "Lombardia/DOCG/Oltrepo Pavese metodo classico",
  facts: [["Types", "Metodo classico, rosé, Pinot Nero, Pinot Nero rosé"], ["Grapes", "Pinot Nero at least 70% (85% for 'Pinot Nero'); Chardonnay, Pinot Grigio, Pinot Bianco for the rest"], ["Yield", "10 t/ha; 9.5% natural"], ["Grape to wine", "60%; rosé 65%"], ["Lees", "At least 15 months; millesimato 24 months"]],
  place: LO_OP + ".",
  rules: "Cruasé is a collective brand for the Pinot Nero rosé.",
  history: "The Oltrepò supplied Pinot Nero to Piedmont's sparkling houses from the 19th century.",
  glass: "Red-fruited, structured sparkling wine.",
  exam: "Cruasé = Oltrepò Pinot Nero rosé metodo classico.",
  producers: ["Monsupello", "Ca' di Frara", "Travaglino", "Conte Vistarino"]
});
APXF["it-oltrepo-pavese"] = lom({
  lede: "The umbrella DOC of the Oltrepò Pavese, for still, frizzante and sparkling wines from Barbera, Croatina, Pinot Nero, Riesling and more.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 1970", d: "Lombardia/DOC/Oltrepo Pavese",
  facts: [["Types", "Rosso, Rosato, Bianco, Barbera, Riesling, Cortese, Moscato (also passito and liquoroso), Malvasia, Pinot Nero vinified white or rosé, Chardonnay, Sauvignon and more"], ["Grape to wine", "70%; Moscato passito 45%"]],
  place: LO_OP + ".",
  rules: "Several former types became separate DOCs in 2010: Bonarda, Buttafuoco, Sangue di Giuda, Pinot Nero, Pinot Grigio, Casteggio.",
  glass: "From frothy reds to crisp Riesling.",
  exam: "Bonarda of the Oltrepò is Croatina, not Bonarda Piemontese.",
  producers: []
});
APXF["it-bonarda-dell-oltrepo-pavese"] = lom({
  lede: "Croatina-based red, usually frizzante, from the Oltrepò Pavese: the region's best-known everyday red.",
  cat: "DOC, red (still or frizzante)", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Bonarda dell'Oltrepo Pavese",
  facts: [["Grapes", "Croatina 85 to 100%; Barbera, Vespolina (Ughetta), Uva Rara up to 15%"], ["Grape to wine", "70%"], ["Total alcohol", "12% still; frizzante 11% (9% actual)"]],
  place: LO_OP + ".",
  rules: "Frizzante may be dry or off-dry.",
  glass: "Purple, frothy, black cherry and violet.",
  exam: "Here 'Bonarda' means Croatina.",
  producers: []
});
APXF["it-buttafuoco-dell-oltrepo-pavese"] = lom({
  lede: "A full red blend of Barbera and Croatina from seven communes south of the Via Emilia around Broni and Stradella.",
  cat: "DOC, red (still or frizzante)", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Buttafuoco dell'Oltrepo Pavese o Buttafuoco",
  facts: [["Also labelled", "Buttafuoco"], ["Grapes", "Barbera 25 to 65%; Croatina 25 to 65%; Uva Rara and Vespolina up to 45%"], ["Communes", "Stradella, Broni, Canneto Pavese, Montescano, Castana, Cigognola, Pietra de' Giorgi"], ["Release", "From 30 April after the harvest"], ["Total alcohol", "12%"]],
  place: "The hills between the Versa and Scuropasso streams.",
  rules: "Grape to wine 70%.",
  glass: "Dark, full, spicy red.",
  exam: "'Buttafuoco' means 'throws fire'.",
  producers: []
});
APXF["it-sangue-di-giuda"] = lom({
  lede: "A sweet, frothy red from Barbera and Croatina in the eastern Oltrepò, named 'Judas' blood'.",
  cat: "DOC, sweet red (still, frizzante, spumante)", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Sangue di Giuda dell'Oltrepo Pavese",
  facts: [["Also labelled", "Sangue di Giuda"], ["Grapes", "Barbera 25 to 65%; Croatina 25 to 65%; Uva Rara, Vespolina, Pinot Nero up to 45%"], ["Alcohol", "Total 12%, of which 5.5% (still) or 7% (frizzante) fermented"]],
  place: "The same hills as Buttafuoco around Broni and Canneto Pavese.",
  rules: "Fermentation stopped to keep sweetness.",
  glass: "Sweet, red-berried, gently fizzy.",
  exam: "A sweet red, unlike Buttafuoco.",
  producers: []
});
APXF["it-pinot-nero-dell-oltrepo-pavese"] = lom({
  lede: "Still red Pinot Nero from the Oltrepò Pavese.",
  cat: "DOC, red", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Pinot nero dell'Oltrepo Pavese",
  facts: [["Grapes", "Pinot Nero at least 95%"], ["Riserva", "24 months from 1 November"], ["Total alcohol", "12%; Riserva 12.5%"]],
  place: LO_OP + ".",
  rules: "Grape to wine 70%.",
  glass: "Red cherry, earth, light tannin.",
  exam: "Most Oltrepò Pinot Nero goes into sparkling wine.",
  producers: []
});
APXF["it-oltrepo-pavese-pinot-grigio"] = lom({
  lede: "Pinot Grigio from the Oltrepò Pavese hills, still or frizzante.",
  cat: "DOC, white", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Oltrepo Pavese Pinot grigio",
  facts: [["Grapes", "Pinot Grigio at least 85%"], ["Total alcohol", "11%"]],
  place: LO_OP + ".", rules: "Grape to wine 70%.", glass: "Light, pear-scented white.", exam: "Minor DOC.", producers: []
});
APXF["it-casteggio"] = lom({
  lede: "A Barbera-based red from the hills of Casteggio in the Oltrepò Pavese.",
  cat: "DOC, red", rec: "DOC 2010", d: "Lombardia/DOC/Casteggio",
  facts: [["Grapes", "Barbera at least 65%; Croatina, Uva Rara, Vespolina, Pinot Nero up to 35%"], ["Yield", "8.5 t/ha; 12.5% natural"], ["Riserva", "3 years from 1 November"], ["Total alcohol", "12.5%"]],
  place: "Casteggio and neighbouring communes.", rules: "Compulsory ageing before release; Riserva 3 years.", glass: "Firm Barbera.", exam: "Minor DOC.", producers: []
});
APXF["it-lugana"] = lom({
  lede: "Turbiana (Trebbiano di Soave) whites from the clay plain at the south end of Lake Garda, straddling Lombardy and Veneto.",
  cat: "DOC, white (also superiore, riserva, late harvest, sparkling)", rec: "DOC 1967", d: "Veneto/DOC/Lugana",
  amended: "Text as amended by DM 22 December 2014",
  facts: [["Provinces", "Brescia (Sirmione, Desenzano, Pozzolengo, Lonato) and Verona (Peschiera)"], ["Grapes", "Turbiana at least 90%"], ["Yield", "12.5 t/ha; Superiore 11 t/ha"], ["Superiore", "12 months from 1 October"], ["Riserva", "24 months including 6 in bottle"]],
  place: "Compact white and grey glacial clays south of the lake, cooled by lake breezes.",
  rules: "Released from 15 January after the harvest.",
  glass: "Citrus, almond, saline; ages well.",
  exam: "Turbiana = Trebbiano di Soave, genetically identical to Verdicchio.",
  producers: ["Ca' dei Frati", "Zenato", "Ottella", "Le Morette"]
});
APXF["it-san-martino-della-battaglia"] = lom({
  lede: "A Friulano-based white and a sweet liquoroso from the battlefield hills south of Lake Garda.",
  cat: "DOC, white and fortified", rec: "DOC 1970", d: "Veneto/DOC/San Martino della Battaglia",
  facts: [["Grapes", "Friulano (Tocai) at least 80%"], ["Communes", "Sirmione, Desenzano, Lonato, Pozzolengo (Brescia); Peschiera (Verona)"], ["Yield", "11.5 t/ha; liquoroso 8 t/ha"]],
  place: "The same zone as Lugana, scene of the 1859 battle of San Martino.", rules: "Grape to wine 70%.", glass: "Almondy white.", exam: "Friulano in Lombardy.", producers: []
});
APXF["it-riviera-del-garda-bresciano"] = lom({
  lede: "The western shore of Lake Garda, for Groppello reds and the Chiaretto rosé, with Valtènesi as a subzone.",
  cat: "DOC, red, rosé, white, sparkling rosé", rec: "DOC 1977 (as Garda Bresciano); renamed Riviera del Garda Classico 2017", d: "Lombardia/DOC/Riviera del Garda Classico",
  facts: [["Types", "Bianco (Riesling at least 50%), Rosso (also superiore), Groppello, Chiaretto, spumante rosé"], ["Subzone", "Valtènesi"]],
  place: "Moraine hills of the Brescian shore of Garda from Desenzano to Salò.", rules: "Grape to wine 70%.", glass: "Light, savoury Groppello reds; delicate Chiaretto.", exam: "Groppello is the local red grape.", producers: []
});
APXF["it-valtenesi"] = lom({
  lede: "Groppello-based red and Chiaretto rosé from the Valtènesi hills on Garda's western shore.",
  cat: "DOC, red and rosé", rec: "DOC 2011", d: "Lombardia/DOC/Valtenesi",
  facts: [["Grapes", "Groppello (Gentile and/or Mocasina) at least 50%"], ["Yield", "11 t/ha; 11.5% natural"], ["Grape to wine", "68%"], ["Release", "Rosso from 1 September; Chiaretto from 14 February after the harvest"]],
  place: "Moraine hills between Desenzano and Salò.", rules: "Chiaretto by short skin contact.", glass: "Pale, saline, red-berried Chiaretto.", exam: "Valtènesi Chiaretto is one of Italy's benchmark rosés.", producers: ["Costaripa", "Pratello"]
});
APXF["it-garda-colli-mantovani"] = lom({
  lede: "Wines from the moraine hills of Mantua province south of Lake Garda.",
  cat: "DOC, white, red, rosé", rec: "DOC 1976", d: "Lombardia/DOC/Garda Colli Mantovani",
  amended: "Text as amended by DM 22 November 2022",
  facts: [["Bianco", "Garganega up to 40%; Trebbiano and/or Chardonnay up to 60%"], ["Types", "Bianco (also passito, late harvest, riserva), Rosso (also superiore, riserva), Chiaretto"], ["Riserva", "2 years including 6 months in wood"]],
  place: "Hills around Monzambano and Volta Mantovana.", rules: "Passito from grapes dried to 13%.", glass: "Simple wines.", exam: "Minor DOC.", producers: []
});
APXF["it-lambrusco-mantovano"] = lom({
  lede: "Lombardy's Lambrusco, from the Mantua plain on both sides of the Po.",
  cat: "DOC, red and rosé (frizzante)", rec: "DOC 1987", d: "Lombardia/DOC/Lambrusco Mantovano",
  facts: [["Grapes", "Lambrusco Viadanese (Grappello Ruberti), Lambrusco Maestri, Marani, Salamino at least 85%"], ["Subzones", "Viadanese-Sabbionetano, Oltre Po Mantovano"], ["Yield", "17 t/ha; subzones 14 t/ha"]],
  place: "Alluvial Po plain near Viadana and Sabbioneta.", rules: "Grape to wine 70%.", glass: "Frothy, fruity red.", exam: "Lambrusco outside Emilia.", producers: []
});
APXF["it-botticino"] = lom({
  lede: "A red blend of Barbera, Marzemino, Schiava and Sangiovese from the hills just east of Brescia.",
  cat: "DOC, red", rec: "DOC 1968", d: "Lombardia/DOC/Botticino",
  facts: [["Grapes", "Barbera at least 30%; Marzemino (Berzemino) at least 20%; Schiava Gentile at least 10%; Sangiovese at least 10%"], ["Communes", "Brescia, Botticino, Rezzato"], ["Riserva", "2 years from 1 November"]],
  place: "Limestone hills known for Botticino marble.", rules: "Released from 1 June after the harvest.", glass: "Mid-weight, spicy red.", exam: "Minor Brescia DOC.", producers: []
});
APXF["it-cellatica"] = lom({
  lede: "A red blend from the hills north-west of Brescia, including the local crossing Incrocio Terzi.",
  cat: "DOC, red", rec: "DOC 1968", d: "Lombardia/DOC/Cellatica",
  facts: [["Grapes", "Marzemino at least 30%; Barbera at least 30%; Schiava Gentile at least 10%; Incrocio Terzi n.1 (Barbera x Cabernet Franc) at least 10%"], ["Communes", "Rodengo Saiano, Gussago, Cellatica, Collebeato, Brescia"], ["Yield", "11.5 t/ha; Superiore 10 t/ha"]],
  place: "Hills next to Franciacorta.", rules: "Superiore released after 30 September of the year after the harvest.", glass: "Light, fruity red.", exam: "Incrocio Terzi is a Brescian crossing.", producers: []
});
APXF["it-capriano-del-colle"] = lom({
  lede: "Reds from Marzemino, Merlot and Sangiovese and Trebbiano whites from a small hill south of Brescia.",
  cat: "DOC, red, white", rec: "DOC 1980", d: "Lombardia/DOC/Capriano del Colle",
  facts: [["Rosso", "Marzemino at least 40%; Merlot at least 20%; Sangiovese at least 10%"], ["Types", "Bianco, Trebbiano, Rosso, Marzemino, Novello, Riserva"]],
  place: "Monte Netto, an isolated hill in the Brescian plain.", rules: "Grape to wine 70%.", glass: "Light reds and whites.", exam: "Minor DOC.", producers: []
});
APXF["it-san-colombano-al-lambro"] = lom({
  lede: "The only DOC of the province of Milan, on an isolated hill near Lodi.",
  cat: "DOC, red, white", rec: "DOC 1984", d: "Lombardia/DOC/San Colombano al Lambro o San Colombano",
  facts: [["Also labelled", "San Colombano"], ["Rosso", "Croatina 30 to 50%; Barbera 25 to 50%; Uva Rara up to 15%"], ["Riserva", "24 months"]],
  place: "The San Colombano hill rising from the Po plain, spanning the provinces of Milan, Lodi and Pavia.", rules: "Frizzante versions allowed.", glass: "Fruity Croatina-Barbera red.", exam: "Milan's wine.", producers: []
});
APXF["it-terre-del-colleoni"] = lom({
  lede: "A Bergamo-province DOC named after the condottiero Bartolomeo Colleoni, for many varietals including Franconia and Incrocio Terzi.",
  cat: "DOC, white, red, sparkling, sweet", rec: "DOC 2011", d: "Lombardia/DOC/Terre del Colleoni o Colleoni",
  facts: [["Also labelled", "Colleoni"], ["Types", "Pinot Bianco, Pinot Grigio, Chardonnay, Manzoni, Moscato Giallo (also passito), Schiava, Merlot, Marzemino, Cabernet, Franconia, Incrocio Terzi, Novello, Spumante"], ["Yields", "12 to 13 t/ha"], ["Spumante", "At least 15 months on the lees"]],
  place: "The Bergamo hills.", rules: "Moscato Giallo passito: grape to wine 40%.", glass: "Simple varietals.", exam: "Minor DOC.", producers: []
});
APXF["it-valcalepio"] = lom({
  lede: "Bordeaux-blend reds and Pinot whites from the hills between Bergamo and Lake Iseo.",
  cat: "DOC, red, white, sweet", rec: "DOC 1976", d: "Lombardia/DOC/Valcalepio",
  facts: [["Rosso", "Cabernet Sauvignon 25 to 60%; Merlot 40 to 75%; aged 1 year including 3 months in wood; Riserva 3 years including 1 in oak"], ["Bianco", "Pinot Bianco and/or Chardonnay 55 to 80%; Pinot Grigio 20 to 45%"], ["Moscato passito", "Moscato di Scanzo and/or Moscato; 6.5 t/ha; total 17%"]],
  place: "Hills of the Bergamo province.", rules: "Grape to wine 70%; passito 40%.", glass: "Herbal Merlot-Cabernet.", exam: "Valcalepio Moscato passito overlaps Scanzo's grape.", producers: []
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
