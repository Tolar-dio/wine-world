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
