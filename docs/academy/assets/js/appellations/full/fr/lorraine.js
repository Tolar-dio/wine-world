// Full encyclopedia entries: Lorraine.
function lor(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources: o.sources || [], checked: "2026-11-14" };
}
APXF["fr-cotes-de-toul"] = lor({ lede: "A small Lorraine appellation west of Nancy, known for vin gris, a very pale rosé from Gamay.", cat: "AOC, gris (pale rosé), red and white", rec: "1998", facts: [["Area", "About 110 ha"], ["Grapes", "Gamay, Pinot Noir; white Auxerrois"]], place: "The vineyards lie on limestone and marl slopes around Toul, on the Moselle.", rules: "Vin gris must include Gamay and Pinot Noir.", glass: "Pale, light, crisp gris.", producers: ["Domaine Laroppe", "Domaine Lelièvre"] });
APXF["fr-moselle"] = lor({ lede: "A small appellation of the French Moselle near Metz and the Luxembourg border, promoted from VDQS in 2010.", cat: "AOC, white, red and gris", rec: "2010", facts: [["Grapes", "Auxerrois, Pinot Gris, Pinot Blanc, Riesling, Müller-Thurgau, Gewurztraminer; red Pinot Noir"]], place: "Scattered vineyards along the Moselle around Metz and in the Seille valley.", rules: "All colors, mostly white.", glass: "Light, crisp whites.", producers: ["Château de Vaux", "Domaine Molozay"] });
