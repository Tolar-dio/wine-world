// Full encyclopedia entries: Burgundy. Rules from the official specifications (cahiers des charges).
const BG_BGN = ["INAO, AOC Bourgogne specification (homologated 6 January 2026; June 2026 modification project)", "https://extranet.inao.gouv.fr/fichier/pno-cdc-Bourgogne-cn260618.pdf"];
const BG_CHGC = ["Cahier des charges AOC Chablis Grand Cru, homologated 24 October 2024 (BO Agri)", "https://info.agriculture.gouv.fr/boagri/document_administratif-f26dd8c5-103a-488e-9bd8-069c6053f605/telechargement"];
const BG_CH = ["INAO, AOC Chablis specification, 2025 modification project", "https://extranet.inao.gouv.fr/fichier/CDC-Chablis-250623-PNO.pdf"];

// ===== Chablis and the Grand Auxerrois =====
APXF["fr-chablis"] = {
  lede: "Chardonnay grown on the cold limestone and marl of the Serein valley, a hundred miles north-west of the Côte d'Or: the most recognizable dry white name in the world, and the purest expression of Chardonnay without oak.",
  facts: [["Category", "AOC, white only; may carry 'premier cru' and a climat name"], ["Recognized", "Decree of 13 January 1938"], ["Communes", "17 communes in the Yonne, including Chablis, Béru, Courgis, Fleys and Viviers"], ["Grape", "Chardonnay only"], ["Planting density", "At least 5,500 vines/ha"], ["Base yields", "Chablis 60 hl/ha (ceiling 75); Chablis Premier Cru 58 hl/ha (ceiling 73)"], ["Ripeness", "Chablis at least 161 g/L sugar and 10% natural alcohol; Premier Cru at least 170 g/L and 10.5%"], ["Premiers crus", "40 climats, which may be grouped under 17 main names"]],
  sections: [
    ["The place", `<p>Chablis lies in the Yonne, at the northern edge of Burgundy, closer to Champagne's Aube vineyards than to Beaune. The small Serein river cuts a valley through a plateau of Upper Jurassic rocks, and the vineyards sit on the slopes on both sides. The rock that matters is Kimmeridgian: alternating beds of grey marl and limestone about 150 million years old, packed with the fossil shells of a small comma-shaped oyster, <i>Exogyra virgula</i>. The harder Portlandian limestone that caps the plateau above is where most Petit Chablis grows. The climate is semi-continental: cold winters, warm summers and spring frosts that can destroy a crop in one night, which is why growers light candles and braziers or spray water on the vines to protect the buds with a layer of ice.</p>`],
    ["The rules", `<p>Chablis is white only and Chardonnay only. The appellation covers 17 communes, with a base yield of 60 hectoliters per hectare. Premier cru wines need riper grapes (170 grams of sugar per liter against 161) and have a slightly lower yield. The premier cru vineyards are 40 climats, which the specification allows to be grouped under 17 main names. The best known on the right bank, facing south-west like the grands crus, are Fourchaume, Mont de Milieu, Montée de Tonnerre and Vaucoupin; on the left bank, facing south-east, Vaillons, Montmains, Côte de Léchet, Beauroy and Vosgros.</p><p>The appellation has grown enormously since the 1950s, when frost and the loss of the Paris market had cut it to a few hundred hectares. Its expansion onto new slopes in the 1970s set off a long dispute between growers who wanted to limit Chablis to Kimmeridgian soils and those who argued that exposure mattered more than geology; the expansionists won.</p>`],
    ["In the glass", `<p>Classic Chablis is pale, dry and taut, with green apple, lemon and white flowers, a high natural acidity and a saline, chalky finish often described as oyster shell or flint. Most is made in stainless steel or old barrels so that the fruit and acidity stay at the front; some producers, notably Raveneau and Dauvissat, use old oak for their premiers and grands crus. Premier cru adds depth and ages five to fifteen years. Warmer vintages since 2000 have made riper, rounder wines more common, a recurring debate in the region.</p>`],
    ["For the exam", `<p>Know the Kimmeridgian and Portlandian soils, the four tiers (Petit Chablis, Chablis, Chablis Premier Cru, Chablis Grand Cru), the seven grands crus, and frost protection methods. Know the main right-bank premiers crus (Fourchaume, Mont de Milieu, Montée de Tonnerre) and left-bank ones (Vaillons, Montmains, Côte de Léchet).</p>`]
  ],
  producers: ["Domaine François Raveneau", "Domaine Vincent Dauvissat", "Domaine William Fèvre", "Domaine Billaud-Simon", "Domaine Louis Michel", "Domaine Laroche", "Domaine Christian Moreau", "Domaine Moreau-Naudet", "Samuel Billaud", "Domaine Pattes Loup", "La Chablisienne (cooperative)"],
  sources: [BG_CH],
  checked: "2026-11-13"
};

const CHGC_RULES = "Chardonnay only; at least 5,500 vines/ha; base yield 54 hl/ha (ceiling 64); at least 178 g/L sugar and 11% natural alcohol; at most 13.5% total alcohol after chaptalization; aged until 15 March and sold from 31 March after harvest";
APXF["fr-chablis-grand-cru"] = {
  lede: "Seven climats on a single south-west-facing slope across the Serein from the town of Chablis, about a hundred hectares of Kimmeridgian marl that give the most intense and long-lived Chablis.",
  facts: [["Category", "AOC, white only, always labeled with one of seven climats"], ["Recognized", "Decree of 13 January 1938"], ["Area", "About 100 ha"], ["Commune", "Chablis"], ["Climats (north-west to south-east)", "Bougros, Preuses, Vaudésir, Grenouilles, Valmur, Les Clos, Blanchot"], ["Rules", CHGC_RULES]],
  sections: [
    ["The place", `<p>The grands crus form a continuous band of steep slopes on the right bank of the Serein, just north-east of the town, facing south and south-west, at roughly 100 to 250 meters. The soils are Kimmeridgian marl and limestone, the steepest and most exposed sites in the appellation. The climats differ by exposure and slope: Les Clos, the largest, is the most powerful; Blanchot, facing south-east at the end of the row, the most delicate; Vaudésir and Valmur sit in folds of the hill.</p>`],
    ["The rules", `<p>Chablis Grand Cru is a single appellation with seven climats, each named on the label, unlike the Côte d'Or, where each grand cru is its own appellation. It requires riper grapes than Chablis Premier Cru (178 grams of sugar per liter and 11% natural alcohol) and a lower yield (54 hectoliters per hectare), caps total alcohol at 13.5%, and must be aged until 15 March after the harvest. The specification was most recently homologated in October 2024.</p><p>La Moutonne, a parcel of about two and a half hectares straddling Vaudésir and Preuses, owned as a monopole by Domaine Long-Depaquit, is often called an eighth grand cru. It is not a separate climat; the wine is labeled Chablis Grand Cru with the name La Moutonne.</p>`],
    ["In the glass", `<p>More concentrated and textured than premier cru, with citrus, white peach, honey and smoke, a strong mineral line and great length. Many producers ferment or age part of the wine in barrel. Grand cru Chablis needs five years to open and the best last twenty or more.</p>`]
  ],
  producers: ["Domaine François Raveneau", "Domaine Vincent Dauvissat", "Domaine William Fèvre", "Domaine Billaud-Simon", "Domaine Louis Michel", "Domaine Long-Depaquit (La Moutonne)", "Domaine Christian Moreau", "Joseph Drouhin (Drouhin-Vaudon)"],
  sources: [BG_CHGC],
  checked: "2026-11-13"
};

function chgc(name, ha, lede, place, glass, producers) {
  return { lede, facts: [["Category", "Climat of AOC Chablis Grand Cru, white only"], ["Area", ha], ["Commune", "Chablis"], ["Rules", CHGC_RULES]], sections: [["The place", `<p>${place}</p>`], ["In the glass", `<p>${glass}</p>`], ["The rules", `<p>${name} is one of the seven climats of the single Chablis Grand Cru appellation, created by the decree of 13 January 1938, and follows its rules: Chardonnay only, a yield of 54 hectoliters per hectare, and grapes with at least 178 grams of sugar per liter. See Chablis Grand Cru for the appellation as a whole.</p>`]], producers, sources: [BG_CHGC], checked: "2026-11-13" };
}
APXF["fr-chablis-grand-cru-bougros"] = chgc("Bougros", "About 15 ha", "The north-western end of the grand cru slope, the lowest and most accessible of the seven, giving broad, generous Chablis.", "Bougros sits at the north-western end of the grand cru hillside, next to Preuses, on slopes that run down almost to the road along the Serein. Part of it is very steep, notably William Fèvre's Côte Bouguerots, a section of the climat with a slope so steep that it is worked by hand; the lower part is gentler and more fertile.", "Round and ripe, with yellow fruit and less tension than Les Clos or Valmur; usually approachable earlier than the other grands crus.", ["Domaine William Fèvre (Côte Bouguerots)"]);
APXF["fr-chablis-grand-cru-preuses"] = chgc("Preuses", "About 11 ha", "A high, gently sloping climat facing south-west at the northern end of the hill, prized for fine, aromatic grand cru.", "Preuses lies high on the hill between Bougros and Vaudésir, on a gentler slope than its neighbors, which gives good sun exposure into the evening. Part of La Moutonne, Long-Depaquit's monopole, extends into Preuses.", "Elegant and perfumed, with ripe citrus, flowers and a fine, long mineral finish; less muscular than Les Clos.", ["Domaine Vincent Dauvissat", "Domaine William Fèvre", "Domaine Billaud-Simon"]);
APXF["fr-chablis-grand-cru-vaudesir"] = chgc("Vaudésir", "About 15 ha", "A steep, sheltered amphitheater in the middle of the grand cru hill, giving some of the most aromatic and intense Chablis.", "Vaudésir occupies a fold in the hillside between Preuses and Grenouilles, with slopes facing south and south-east as well as south-west; the bowl traps heat. Most of La Moutonne lies inside Vaudésir.", "Expressive and floral, with ripe citrus and a powerful mineral finish; considered one of the most complete grands crus.", ["Domaine Billaud-Simon", "Domaine Louis Michel", "Domaine William Fèvre", "Joseph Drouhin (Drouhin-Vaudon)", "Domaine Long-Depaquit"]);
APXF["fr-chablis-grand-cru-grenouilles"] = chgc("Grenouilles", "About 9 ha", "The smallest grand cru, at the foot of the hill closest to the Serein, named for the frogs of the riverbank.", "Grenouilles lies low on the hill between Vaudésir and Valmur, nearest the river. The proximity of the Serein moderates temperatures, and the climat is reliably ripe. The cooperative La Chablisienne owns the largest share, through Château Grenouilles.", "Rich, aromatic and full, with yellow fruit and a firm mineral backbone.", ["La Chablisienne (Château Grenouilles)", "Domaine Louis Michel", "Domaine Testut"]);
APXF["fr-chablis-grand-cru-valmur"] = chgc("Valmur", "About 13 ha", "A valley-shaped climat between Grenouilles and Les Clos, with slopes facing in two directions, giving structured, long-lived grand cru.", "Valmur, 'valley wall', follows a small side valley cutting into the hill, so its vines face in two directions on either side of the combe rather than along the main slope. The steepness and the mix of exposures give wines of tension and density.", "Taut and structured, with citrus, white flowers and a long mineral finish; needs time.", ["Domaine François Raveneau", "Domaine William Fèvre", "Domaine Christian Moreau", "Domaine Moreau-Naudet"]);
APXF["fr-chablis-grand-cru-les-clos"] = chgc("Les Clos", "About 26 ha", "The largest and most famous grand cru, a broad south-west-facing slope above the town, giving the most powerful and long-lived Chablis.", "Les Clos covers the central part of the hill, between Valmur and Blanchot, on steep Kimmeridgian marl with a stony surface. Its name recalls a walled vineyard of the Cistercian monks of Pontigny, who developed the Chablis vineyard in the Middle Ages.", "Dense, powerful and mineral, with citrus, smoke and honey; the slowest grand cru to open, often needing ten years and lasting several decades.", ["Domaine François Raveneau", "Domaine Vincent Dauvissat", "Domaine William Fèvre", "Domaine Christian Moreau (Clos des Hospices)", "Joseph Drouhin (Drouhin-Vaudon)", "Domaine Louis Michel"]);
APXF["fr-chablis-grand-cru-blanchot"] = chgc("Blanchot", "About 13 ha", "The south-eastern end of the grand cru hill, facing south-east, the most delicate and floral of the seven.", "Blanchot sits at the southern end of the row, next to Les Clos, on steep slopes facing south-east, so it gets morning sun and less afternoon heat than the others. Its name is said to refer to the pale color of the soil.", "Fine and floral, with lighter body and fine acidity; the most approachable grand cru and the closest in style to the best premiers crus.", ["Domaine François Raveneau", "Domaine Laroche (Réserve de l'Obédience)", "Domaine Vocoret"]);

APXF["fr-petit-chablis"] = {
  lede: "The bottom tier of Chablis, mostly from the Portlandian limestone of the plateaus above the valley: light, crisp Chardonnay to drink young.",
  facts: [["Category", "AOC, white only"], ["Recognized", "Decree of 5 January 1944"], ["Communes", "17 communes in the Yonne"], ["Grape", "Chardonnay only"], ["Planting density", "At least 5,500 vines/ha"], ["Base yield", "60 hl/ha (ceiling 75)"], ["Ripeness", "At least 153 g/L sugar and 9.5% natural alcohol"]],
  sections: [
    ["The place", `<p>Petit Chablis comes from the same 17 communes as Chablis, mostly from vineyards on the plateaus, where the rock is the harder Portlandian limestone that sits above the Kimmeridgian marl, and from cooler, less exposed slopes.</p>`],
    ["The rules", `<p>The ripeness minimum, 153 grams of sugar per liter and 9.5% natural alcohol, is the lowest in Chablis. The appellation was created in 1944 and was long considered almost a declassification; its reputation improved as warmer vintages made the plateau sites ripen reliably.</p>`],
    ["In the glass", `<p>Light, lemony and saline, with high acidity, best within two or three years.</p>`]
  ],
  producers: ["Domaine Jean Dauvissat", "Domaine Pattes Loup", "La Chablisienne", "Domaine Laroche"],
  sources: [["Cahier des charges AOC Petit Chablis, December 2023 (BO Agri)", "https://info.agriculture.gouv.fr/boagri/document_administratif-580ac589-2817-4f2f-85ee-35292c4b5057/telechargement"]],
  checked: "2026-11-13"
};

APXF["fr-irancy"] = {
  lede: "The red wine village of the Auxerrois, a bowl of south-facing slopes above the Yonne river planted with Pinot Noir and a little of the rare local grape César.",
  facts: [["Category", "AOC, red only"], ["Recognized", "Decree of 26 February 1999 (previously Bourgogne Irancy)"], ["Communes", "Irancy, Cravant, Vincelottes"], ["Grapes", "Pinot Noir; accessory César and Pinot Gris, 10% at most of plantings together"], ["Planting density", "At least 7,000 vines/ha"], ["Base yield", "52 hl/ha (ceiling 56)"], ["Ripeness", "At least 180 g/L sugar and 10.5% natural alcohol"], ["Release", "Aged until 15 June and sold from 30 June of the year after harvest"], ["Climat names", "May be added to the label"]],
  sections: [
    ["The place", `<p>Irancy lies about 15 kilometers south-west of Chablis, near the Yonne. Its vineyards form an amphitheater around the village on Kimmeridgian marl and limestone, facing mostly south, which gives the warmth needed to ripen red grapes this far north. Cherry orchards share the slopes. The best-known slopes are Palotte and Côte du Moutier.</p>`],
    ["The rules", `<p>Irancy is red only. It was Bourgogne Irancy until 1999, when it became a village appellation. Pinot Noir is the main grape, with César, an old Yonne variety that gives dark color and firm tannin, and Pinot Gris allowed together up to 10% of an estate's vines. The wine must age until mid-June after the harvest, later than most Burgundy reds of this level.</p>`],
    ["In the glass", `<p>Bright cherry and red berry fruit, high acidity and firmer tannin than most northern Pinot, especially with César in the blend. Good Irancy ages ten years.</p>`]
  ],
  producers: ["Domaine Thierry Richoux", "Domaine Colinot", "Domaine Christophe Ferrari", "Domaine Benoît Cantin"],
  sources: [["INAO, Irancy specification modification project", "https://extranet.inao.gouv.fr/fichier/PNOCDC-Irancy.pdf"], ["Décret du 26 février 1999, AOC Irancy (Légifrance)", "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000759335"]],
  checked: "2026-11-13"
};

APXF["fr-saint-bris"] = {
  lede: "The only appellation in Burgundy for Sauvignon Blanc: crisp, aromatic whites from five villages south of Auxerre.",
  facts: [["Category", "AOC, white only"], ["Recognized", "Decree of 10 January 2003 (previously VDQS Sauvignon de Saint-Bris)"], ["Communes", "Saint-Bris-le-Vineux, Chitry, Irancy, Quenne, Vincelottes"], ["Grapes", "Sauvignon Blanc and Sauvignon Gris only"], ["Planting density", "At least 7,000 vines/ha"], ["Base yield", "68 hl/ha (ceiling 70)"], ["Ripeness", "At least 161 g/L sugar and 10% natural alcohol"], ["Release", "Aged until 15 December; sold from 1 January after harvest"]],
  sections: [
    ["The place", `<p>Saint-Bris-le-Vineux sits on Kimmeridgian and Portlandian limestone between Auxerre and Chablis. Sauvignon has been grown here for well over a century, unusually for Burgundy, where white wine means Chardonnay and Aligoté.</p>`],
    ["The rules", `<p>Saint-Bris was a VDQS, Sauvignon de Saint-Bris, until it became an AOC in 2003. It is the only Burgundy appellation where Sauvignon Blanc and Sauvignon Gris are allowed, and the only grapes allowed. Its specification was revised in June 2026.</p>`],
    ["In the glass", `<p>Crisp and aromatic, with citrus, gooseberry, cut grass and a chalky finish, closer to Sancerre than to Chablis; best young.</p>`]
  ],
  producers: ["Domaine Goisot", "Clotilde Davenne", "Domaine Bersan", "Domaine Verret", "Caves de Bailly Lapierre"],
  sources: [["Cahier des charges AOC Saint-Bris, June 2026 (BO Agri)", "https://info.agriculture.gouv.fr/boagri/document_administratif-9753b9fd-cc2c-48f4-bfb5-b6178e3c9113/telechargement"]],
  checked: "2026-11-13"
};

APXF["fr-vezelay"] = {
  lede: "A small revived vineyard below the hilltop basilica of Vézelay, in the far south of the Yonne, for crisp Chardonnay.",
  facts: [["Category", "AOC, white only"], ["Recognized", "Village appellation since 2017; previously Bourgogne Vézelay (geographic name from 1998)"], ["Communes", "Vézelay, Asquins, Saint-Père, Tharoiseau"], ["Grape", "Chardonnay only"], ["Planting density", "At least 6,400 vines/ha"], ["Base yield", "55 hl/ha (ceiling 64)"], ["Ripeness", "At least 178 g/L sugar and 11% natural alcohol"], ["Release", "Aged until 1 March; sold from 15 March after harvest"]],
  sections: [
    ["The place", `<p>Vézelay is a hilltop town known for the Basilica of Sainte-Marie-Madeleine, a starting point of the pilgrimage to Santiago and a UNESCO site. The vineyards lie on limestone slopes below it, at the southern edge of the Yonne vineyards near the Morvan hills.</p>`],
    ["History", `<p>Vines have grown here since Gallo-Roman times, but phylloxera, which reached the Auxerrois in 1884, nearly wiped them out. Replanting began in the 1970s, a growers' syndicate formed in 1974, and a cooperative followed in 1990. The communes joined the Bourgogne area in 1989, received the geographic name Bourgogne Vézelay in 1998, and became a village appellation in 2017.</p>`],
    ["In the glass", `<p>Light, crisp, citrusy Chardonnay with a mineral finish, similar to Petit Chablis or lighter Chablis.</p>`]
  ],
  producers: ["Domaine de la Cadette", "Domaine Elise Villiers", "Domaine Montanet-Thoden"],
  sources: [["INAO, AOC Vézelay specification project", "https://extranet.inao.gouv.fr/fichier/PNOCDCAOCVezelay.pdf"]],
  checked: "2026-11-13"
};

function bgnY(lede, comm, colors, rules, place, glass, producers) {
  return { lede, facts: [["Category", "AOC Bourgogne with a geographic name: " + colors], ["Communes", comm], ["Planting density", "At least 7,000 vines/ha"], ["Rules", rules]], sections: [["The place", `<p>${place}</p>`], ["The rules", `<p>This is not a separate appellation but a "dénomination géographique complémentaire" of the Bourgogne appellation: the village or area name follows "Bourgogne" on the label. It requires a higher planting density than plain Bourgogne (7,000 vines per hectare against 5,000) and lower yields.</p>`], ["In the glass", `<p>${glass}</p>`]], producers, sources: [BG_BGN], checked: "2026-11-13" };
}
const BGY_STD = "White 66 hl/ha, red and rosé 58 hl/ha; white at least 170 g/L sugar and 10.5% natural alcohol, red at least 180 g/L and 10.5%";
APXF["fr-bourgogne-chitry"] = bgnY("Bourgogne from the village of Chitry, between Chablis and Saint-Bris, known for crisp whites close in style to Chablis.", "Chitry", "white, red, rosé", BGY_STD, "Chitry lies just south-west of the Chablis appellation on the same Kimmeridgian limestone, and its whites are often compared to Chablis.", "Mostly whites: lemony, chalky Chardonnay, with some light Pinot Noir.", ["Alice et Olivier De Moor", "Domaine Giraudon"]);
APXF["fr-bourgogne-cotes-d-auxerre"] = bgnY("Bourgogne from the slopes around Auxerre, the old capital of the Yonne wine trade.", "Augy, Auxerre, Quenne, Saint-Bris-le-Vineux, Vincelottes", "white, red, rosé", BGY_STD, "The hills around Auxerre on the Yonne river, on Kimmeridgian and Portlandian limestone. Before phylloxera the Auxerrois was one of the largest vineyards in France, supplying Paris by river.", "Crisp Chardonnay and light, red-fruited Pinot Noir.", ["Domaine Goisot", "Domaine Bersan", "Clotilde Davenne"]);
APXF["fr-bourgogne-coulanges-la-vineuse"] = bgnY("Bourgogne from Coulanges-la-Vineuse and six neighboring villages south of Auxerre, mostly for red Pinot Noir.", "Charentenay, Coulanges-la-Vineuse, Escolives-Sainte-Camille, Jussy, Migé, Mouffy, Val-de-Mercy", "white, red, rosé", BGY_STD, "The 'vinous' village of Coulanges sits on limestone hills south of Auxerre, near Irancy. Red wine dominates here.", "Light, fruity Pinot Noir with bright acidity, and some white.", ["Domaine du Clos du Roi", "Domaine Maltoff"]);
APXF["fr-bourgogne-cote-saint-jacques"] = bgnY("Bourgogne from a single slope above the town of Joigny on the Yonne, the northernmost geographic name of Burgundy, once famous for its pale vin gris.", "Joigny", "white, red, rosé", BGY_STD, "The Côte Saint-Jacques is a south-facing limestone slope above Joigny, north-west of Chablis, where the Yonne flows toward Paris.", "Pale, light Pinot Noir and rosé, and fresh Chardonnay. Joigny's historic specialty was vin gris, a very pale wine from Pinot Gris and Pinot Noir.", ["Domaine Alain Vignot"]);
APXF["fr-bourgogne-epineuil"] = bgnY("Bourgogne red and rosé from the village of Épineuil near Tonnerre, in the north-eastern Yonne.", "Épineuil", "red and rosé only", "Red and rosé 58 hl/ha; red at least 180 g/L sugar and 10.5% natural alcohol", "Épineuil lies on south-facing limestone slopes above the Armançon valley near Tonnerre, close to the Aube. It is red and rosé only; whites from the area are labeled Bourgogne Tonnerre.", "Light, crunchy Pinot Noir with red cherry and high acidity, and pale rosé.", ["Domaine de l'Abbaye du Petit Quincy (Dominique Gruhier)"]);
APXF["fr-bourgogne-tonnerre"] = bgnY("Bourgogne white from six villages around Tonnerre, east of Chablis, on the same Kimmeridgian limestone.", "Dannemoine, Épineuil, Junay, Molosmes, Tonnerre, Vézinnes", "white only", "White 63 hl/ha; at least 170 g/L sugar and 10.5% natural alcohol", "The Tonnerrois, on the Armançon river east of Chablis, shares Chablis's Kimmeridgian geology. It is white only; reds from Épineuil carry their own name.", "Crisp, mineral Chardonnay very similar to Chablis and usually cheaper.", ["Domaine de l'Abbaye du Petit Quincy (Dominique Gruhier)"]);

// ===== Mâconnais, Côte Chalonnaise, regional =====
const BG_Y23 = ["Burgundy production conditions for the 2023 harvest, CRINAO 31 August 2023 (via Burgundy Report)", "https://www.burgundy-report.com/wp/wp-content/uploads/2023/09/20230831_CRINAO_conditions_productions_V1.pdf"];

APXF["fr-macon"] = {
  lede: "The broad regional appellation of the Mâconnais, between the Saône and the hills west of Mâcon, for fresh Chardonnay and Gamay-based reds, often with a village name attached.",
  facts: [["Category", "AOC: white, red and rosé; may add one of about two dozen village names"], ["Recognized", "1937"], ["Grapes", "White: Chardonnay. Red and rosé: Gamay, with Pinot Noir"], ["Base yields (2023 conditions)", "Mâcon: white 70 hl/ha, red 64. Mâcon + village: white 66, red 60"], ["Minimum natural alcohol", "Mâcon 10%; Mâcon + village 10.5% (red) and 11% (white)"]],
  sections: [
    ["The place", `<p>The Mâconnais stretches about 50 kilometers along the west bank of the Saône from Tournus to the Beaujolais border, a hilly country of limestone ridges, clay and sandy soils, with mixed farming between the vineyards. It is warmer and sunnier than the Côte d'Or, and its whites are riper and rounder. Chardonnay dominates, and the village of Chardonnay, near Tournus, is often cited as the possible origin of the grape's name.</p>`],
    ["The rules", `<p>Mâcon may be white, red or rosé. Red Mâcon is usually Gamay, which grows well on the granite and sandier soils of the south. Many villages may add their name to Mâcon, for example Mâcon-Lugny, Mâcon-Chardonnay, Mâcon-Pierreclos or Mâcon-La Roche-Vineuse, with lower yields and riper grapes than plain Mâcon. Mâcon-Villages is a separate white appellation from a wider list of communes.</p>`],
    ["In the glass", `<p>White Mâcon is round and fruity, with apple, citrus and sometimes melon, usually unoaked; the best village wines approach Côte d'Or quality at a fraction of the price. Red Mâcon is light, juicy Gamay.</p>`]
  ],
  producers: ["Domaine Guillot-Broux", "Domaine de la Bongran (Thévenet)", "Domaine des Héritiers du Comte Lafon", "Domaine Leflaive (Mâcon-Verzé)", "Cave de Lugny"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-macon-villages"] = {
  lede: "A white-only appellation for Chardonnay from a wide list of Mâconnais communes, the region's most exported name.",
  facts: [["Category", "AOC, white only"], ["Grape", "Chardonnay"], ["Base yield (2023 conditions)", "66 hl/ha"], ["Minimum natural alcohol", "10.5%"]],
  sections: [
    ["The rules", `<p>Mâcon-Villages can be made from any of the communes entitled to add their name to Mâcon, and blended across them. It is white only, with a lower yield than plain Mâcon. Large cooperatives, such as those of Lugny, Viré and Prissé, and the big Beaune merchants make most of it.</p>`],
    ["In the glass", `<p>Unoaked, fruity Chardonnay with apple, pear and citrus, made to drink within two or three years; one of the best-value white Burgundies.</p>`]
  ],
  producers: ["Cave de Lugny", "Louis Jadot", "Joseph Drouhin", "Domaine Verget"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-pouilly-fuisse"] = {
  lede: "The Mâconnais's leading white appellation, beneath the limestone cliffs of Solutré and Vergisson, and since the 2020 vintage the only one in the south of Burgundy with premiers crus.",
  facts: [["Category", "AOC, white only; may carry 'premier cru' and a climat name"], ["Recognized", "1936; premiers crus approved by INAO on 3 September 2020"], ["Communes", "Fuissé, Solutré-Pouilly, Vergisson, Chaintré"], ["Grape", "Chardonnay"], ["Base yields (2023 conditions)", "Pouilly-Fuissé 60 hl/ha; premier cru 56 hl/ha"], ["Minimum natural alcohol", "11%; premier cru 12%"], ["Premiers crus", "22 climats, about 194 ha, around a quarter of the appellation"]],
  sections: [
    ["The place", `<p>Two great limestone outcrops, the Roche de Solutré and the Roche de Vergisson, rise above the vineyards west of Mâcon. Their slopes and the valleys between them combine limestone, clay and, in places, schist and granite, with exposures ranging from east to south and west. The site of Solutré gave its name to the Solutrean period of the Paleolithic, and the bones of thousands of horses lie at the foot of the rock.</p>`],
    ["The rules", `<p>Pouilly-Fuissé is white and Chardonnay only, from four communes. After more than a decade of work by the growers, INAO approved 22 premier cru climats in September 2020, covering about 194 hectares, roughly a quarter of the appellation, effective from the 2020 vintage. Among them are Le Clos, Les Crays, Les Ménétrières, Vers Cras, Sur la Roche, Les Chevrières, Aux Quarts and Les Vignes Blanches. Premier cru wines need riper grapes (12% natural alcohol) and a lower yield.</p>`],
    ["In the glass", `<p>Richer and more structured than other Mâconnais whites, with ripe citrus, white peach, hazelnut and a mineral finish, often barrel-fermented. Top wines from Vergisson, the coolest commune, are taut; those from Chaintré and Fuissé fuller. The best age ten years.</p>`],
    ["For the exam", `<p>Do not confuse Pouilly-Fuissé (Chardonnay, Mâconnais) with Pouilly-Fumé (Sauvignon Blanc, Loire). Know the four communes, the 2020 premier cru recognition and the 22 climats.</p>`]
  ],
  producers: ["Château de Fuissé (Vincent)", "Domaine Ferret", "Domaine Barraud", "Domaine Guffens-Heynen", "Domaine Valette", "Domaine Saumaize-Michelin", "Domaine Bret Brothers"],
  sources: [["INAO press release, premier cru recognition for Pouilly-Fuissé, 2020", "https://inao.gouv.fr/en/premier-cru-label-pouilly-fuisse-pdo-cp"], BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-pouilly-loche"] = {
  lede: "The smallest of the three Pouilly appellations next to Pouilly-Fuissé, from the single commune of Loché, which may also sell as Pouilly-Vinzelles.",
  facts: [["Category", "AOC, white only; may add a climat name"], ["Recognized", "1940"], ["Commune", "Loché (now part of Mâcon)"], ["Grape", "Chardonnay"], ["Base yield (2023 conditions)", "60 hl/ha; 58 with a climat"], ["Minimum natural alcohol", "11%; 12% with a climat"]],
  sections: [
    ["The place", `<p>Loché lies on clay-limestone slopes east of Fuissé, toward the Saône; the commune has been merged into the city of Mâcon. Its wines may be labeled Pouilly-Loché or Pouilly-Vinzelles.</p>`],
    ["In the glass", `<p>Similar to a lighter Pouilly-Fuissé, with citrus and white fruit and good freshness. The cooperative Cave des Grands Crus Blancs makes much of it.</p>`]
  ],
  producers: ["Cave des Grands Crus Blancs", "Domaine Bret Brothers", "Domaine Tripoz"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-pouilly-vinzelles"] = {
  lede: "Chardonnay from Vinzelles and Loché, just east of Pouilly-Fuissé, with the best sites on the slope of Les Quarts.",
  facts: [["Category", "AOC, white only; may add a climat name"], ["Recognized", "1940"], ["Communes", "Vinzelles and Loché"], ["Grape", "Chardonnay"], ["Base yield (2023 conditions)", "60 hl/ha; 58 with a climat"], ["Minimum natural alcohol", "11%; 12% with a climat"]],
  sections: [
    ["The place", `<p>Vinzelles borders Chaintré and Fuissé to the west. Its finest slope, Les Quarts, continues the Aux Quarts premier cru of Pouilly-Fuissé across the commune boundary.</p>`],
    ["In the glass", `<p>Fresh, citrus-led Chardonnay with some of Pouilly-Fuissé's depth from the best sites, at a lower price.</p>`]
  ],
  producers: ["Domaine Bret Brothers", "Domaine Valette", "Cave des Grands Crus Blancs", "Château de Fuissé"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-saint-veran"] = {
  lede: "A white appellation on both sides of Pouilly-Fuissé, from limestone in the north and the granite edge of the Beaujolais in the south.",
  facts: [["Category", "AOC, white only; may add a climat name"], ["Recognized", "1971"], ["Communes", "Chânes, Chasselas, Davayé, Leynes, Prissé, Saint-Amour-Bellevue, Saint-Vérand, Solutré-Pouilly"], ["Grape", "Chardonnay"], ["Base yield (2023 conditions)", "64 hl/ha; 62 with a climat"], ["Minimum natural alcohol", "11%; 12% with a climat"]],
  sections: [
    ["The place", `<p>Saint-Véran is in two parts: Davayé and Prissé to the north of Pouilly-Fuissé, on limestone, and the southern villages of Chânes, Chasselas, Leynes, Saint-Amour-Bellevue and Saint-Vérand, where the soils turn to the granite and schist of the Beaujolais. Solutré-Pouilly also has parcels in it. The appellation's name is spelled without the final d of the village of Saint-Vérand.</p>`],
    ["The rules", `<p>Created in 1971, partly to give a name to white wines of the southern villages that had been sold as Beaujolais Blanc, Saint-Véran is white only. Wines from named climats need riper grapes and a slightly lower yield.</p>`],
    ["In the glass", `<p>Fresh, fruity Chardonnay, fuller from the limestone north, leaner and more floral from the southern granite; good value next to Pouilly-Fuissé.</p>`]
  ],
  producers: ["Domaine des Deux Roches", "Domaine Guffens-Heynen", "Domaine Corsin", "Domaine Saumaize-Michelin", "Château de Fuissé"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-vire-clesse"] = {
  lede: "A white appellation in the north of the Mâconnais, created in 1999 from two of the region's best village names, known for rich, ripe Chardonnay.",
  facts: [["Category", "AOC, white only; may add a climat name"], ["Recognized", "1999 (previously Mâcon-Viré and Mâcon-Clessé)"], ["Communes", "Viré, Clessé, Laizé, Montbellet"], ["Grape", "Chardonnay"], ["Base yield (2023 conditions)", "64 hl/ha; 62 with a climat"], ["Minimum natural alcohol", "11.5%; 12% with a climat"]],
  sections: [
    ["The place", `<p>Viré and Clessé lie on limestone and clay hills north of Mâcon, between the Saône and the Mâconnais ridges. The appellation replaced the village names Mâcon-Viré and Mâcon-Clessé.</p>`],
    ["The rules", `<p>The appellation requires 11.5% natural alcohol, the highest base requirement in the Mâconnais. Its first specification excluded wines with residual sugar, which caused a famous dispute with Jean Thévenet of Domaine de la Bongran, whose late-picked, slightly sweet wines from botrytized grapes were refused the appellation in some vintages.</p>`],
    ["In the glass", `<p>Ripe, round Chardonnay with yellow fruit, honey and good acidity. The Viré cooperative makes a large share.</p>`]
  ],
  producers: ["Domaine de la Bongran (Thévenet)", "Domaine André Bonhomme", "Domaine Michel", "Cave de Viré", "Domaine Guillemot-Michel"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-bouzeron"] = {
  lede: "The only village appellation in Burgundy for Aligoté, from one small village at the northern tip of the Côte Chalonnaise.",
  facts: [["Category", "AOC, white only"], ["Recognized", "1998 (previously Bourgogne Aligoté Bouzeron, from 1979)"], ["Commune", "Bouzeron"], ["Grape", "Aligoté"], ["Base yield (2023 conditions)", "65 hl/ha"], ["Minimum natural alcohol", "10%"]],
  sections: [
    ["The place", `<p>Bouzeron is a narrow valley just south-west of Chagny, with limestone and marl slopes facing south and east. Its growers kept and selected the golden-berried form of the grape, Aligoté doré, which ripens better than the more common green form.</p>`],
    ["The rules", `<p>Bouzeron is the only Burgundy village appellation for Aligoté. The name Bourgogne Aligoté Bouzeron was created in 1979, and the village received its own appellation in 1998. Aubert de Villaine of the Domaine de la Romanée-Conti, who has owned the Domaine A. et P. de Villaine here since 1971, led the campaign.</p>`],
    ["In the glass", `<p>Crisp but rounder than most Aligoté, with lemon, white flowers and a mineral finish; ages several years.</p>`]
  ],
  producers: ["Domaine A. et P. de Villaine", "Domaine Chanzy", "Domaine Briday", "Maison Bouchard Père et Fils"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-rully"] = {
  lede: "The northernmost village of the Côte Chalonnaise, on limestone slopes near Chagny: crisp whites, light reds and the base of Burgundy's sparkling wine trade.",
  facts: [["Category", "AOC, white and red; may carry 'premier cru'"], ["Recognized", "1939"], ["Communes", "Rully and Chagny"], ["Grapes", "Chardonnay; Pinot Noir"], ["Base yields (2023 conditions)", "White 60 hl/ha; red 58"], ["Minimum natural alcohol", "10.5%"]],
  sections: [
    ["The place", `<p>Rully lies just south of Chagny and the southern end of the Côte de Beaune, on limestone and marl slopes facing east and south-east. White wine dominates.</p>`],
    ["The rules", `<p>White and red are allowed, with numerous premier cru climats. Rully became an early center of sparkling Burgundy in the nineteenth century, and several crémant houses are still based here.</p>`],
    ["In the glass", `<p>Fresh, citrus and apple whites that resemble a lighter Côte de Beaune, and light, red-fruited Pinot Noir.</p>`]
  ],
  producers: ["Domaine Vincent Dureuil-Janthial", "Domaine Jacqueson", "Domaine de la Folie", "Domaine Leflaive (Rully premier cru)", "Domaine Faiveley"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-mercurey"] = {
  lede: "The largest and best-known village of the Côte Chalonnaise, mostly red: structured Pinot Noir often compared with the lesser villages of the Côte de Beaune.",
  facts: [["Category", "AOC, red and white; may carry 'premier cru'"], ["Recognized", "1936"], ["Communes", "Mercurey and Saint-Martin-sous-Montaigu"], ["Grapes", "Pinot Noir; Chardonnay"], ["Base yields (2023 conditions)", "Red 54 hl/ha; white 61"], ["Minimum natural alcohol", "Red 10.5%; white 11%"]],
  sections: [
    ["The place", `<p>Mercurey lies south-west of Rully on limestone and marl slopes, with many south- and east-facing sites. It produces more wine than any other Côte Chalonnaise village, most of it red.</p>`],
    ["The rules", `<p>Red and white are allowed, with many premier cru climats; Clos du Roy, Clos des Myglands and Clos l'Évêque are among the best known. The Beaune merchant Faiveley is the largest landowner, and Château de Chamirey and Domaine Michel Juillot built the village's reputation.</p>`],
    ["In the glass", `<p>Firmer and darker than most Chalonnaise reds, with cherry, plum and earthy notes and enough tannin to age five to ten years.</p>`]
  ],
  producers: ["Domaine Faiveley", "Château de Chamirey", "Domaine Michel Juillot", "Domaine François Raquillet", "Domaine Lorenzon", "Domaine de Suremain"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-givry"] = {
  lede: "A mostly red village south of Mercurey, said to have been Henri IV's favorite wine, with silky Pinot Noir and a little white.",
  facts: [["Category", "AOC, red and white; may carry 'premier cru'"], ["Recognized", "1946"], ["Communes", "Givry, Dracy-le-Fort, Jambles"], ["Grapes", "Pinot Noir; Chardonnay"], ["Base yields (2023 conditions)", "Red 56 hl/ha; white 64"], ["Minimum natural alcohol", "Red 10.5%; white 11%"]],
  sections: [
    ["The place", `<p>Givry lies west of Chalon-sur-Saône on limestone slopes facing east and south-east. It is a red-wine village, with white a small share.</p>`],
    ["The rules", `<p>Red and white are allowed, with many premier cru climats, among them Clos Salomon, Clos Jus and Clos du Cellier aux Moines. The local story that Henri IV preferred Givry, possibly because his mistress lived nearby, has been retold for centuries.</p>`],
    ["In the glass", `<p>Supple, aromatic Pinot Noir with red cherry and a silky texture, generally softer than Mercurey.</p>`]
  ],
  producers: ["Domaine Joblot", "Domaine François Lumpp", "Clos Salomon", "Domaine du Cellier aux Moines", "Domaine Ragot"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-montagny"] = {
  lede: "The white-only village of the southern Côte Chalonnaise, around Buxy, where an unusually large share of the vineyard is classified premier cru.",
  facts: [["Category", "AOC, white only; may carry 'premier cru'"], ["Recognized", "1936"], ["Communes", "Montagny-lès-Buxy, Buxy, Jully-lès-Buxy, Saint-Vallerin"], ["Grape", "Chardonnay"], ["Base yields (2023 conditions)", "62 hl/ha; premier cru 60"], ["Minimum natural alcohol", "11%; premier cru 11.5%"]],
  sections: [
    ["The place", `<p>Montagny lies at the south of the Côte Chalonnaise on limestone and marl hills around Buxy. It makes only white wine.</p>`],
    ["The rules", `<p>Until 1989 any Montagny reaching 11.5% alcohol could be called premier cru. Since then premier cru has been limited to named climats, but they still cover a large share of the appellation, so premier cru is the normal level here. The Buxy cooperative, Vignerons de Buxy, makes much of the wine.</p>`],
    ["In the glass", `<p>Crisp, citrus and nutty Chardonnay, lean and mineral; good-value white Burgundy.</p>`]
  ],
  producers: ["Domaine Stéphane Aladame", "Château de la Saule", "Vignerons de Buxy", "Domaine Feuillat-Juillot", "Louis Latour"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-bourgogne-cote-chalonnaise"] = {
  lede: "Regional Bourgogne from the Côte Chalonnaise, in all three colors, at a higher density and lower yield than plain Bourgogne.",
  facts: [["Category", "AOC Bourgogne with the geographic name Côte Chalonnaise: white, red, rosé"], ["Communes", "Communes of the Côte Chalonnaise in Saône-et-Loire, including Givry, Mercurey, Rully, Bouzeron, Buxy and Chagny"], ["Planting density", "At least 7,000 vines/ha"], ["Base yields", "White 66 hl/ha; red and rosé 58"], ["Ripeness", "White at least 170 g/L sugar and 10.5% natural alcohol; red at least 180 g/L and 10.5%"]],
  sections: [
    ["The rules", `<p>A geographic name attached to the Bourgogne appellation for wine from the Côte Chalonnaise outside, or declassified from, its village appellations. It requires 7,000 vines per hectare against Bourgogne's 5,000 and riper grapes for red.</p>`],
    ["In the glass", `<p>Light Pinot Noir and fresh Chardonnay, usually good value.</p>`]
  ],
  producers: ["Domaine A. et P. de Villaine", "Domaine Michel Juillot", "Vignerons de Buxy"],
  sources: [BG_BGN],
  checked: "2026-11-13"
};

APXF["fr-bourgogne-cotes-du-couchois"] = {
  lede: "A small geographic name for red and white Bourgogne from six villages around Couches, between the Côte Chalonnaise and the Morvan.",
  facts: [["Category", "AOC Bourgogne with the geographic name Côtes du Couchois: white and red (no rosé)"], ["Communes", "Couches, Dracy-lès-Couches, Saint-Jean-de-Trézy, Saint-Maurice-lès-Couches, Saint-Pierre-de-Varennes, Saint-Sernin-du-Plain"], ["Planting density", "At least 7,000 vines/ha"], ["Ripeness", "White at least 170 g/L sugar and 10.5%; red at least 180 g/L and 10.5%"]],
  sections: [
    ["The place", `<p>The Couchois lies west of the Côte Chalonnaise and south-west of the Maranges, on limestone and clay hills around the town of Couches, dominated by its medieval castle. It was historically a red-wine area.</p>`],
    ["In the glass", `<p>Mostly Pinot Noir: light, red-fruited and fresh.</p>`]
  ],
  producers: [],
  sources: [BG_BGN],
  checked: "2026-11-13"
};

APXF["fr-bourgogne-cote-d-or"] = {
  lede: "A geographic name for regional Bourgogne from the Côte d'Or itself, created to set wines from the famous slope apart from Bourgogne made elsewhere.",
  facts: [["Category", "AOC Bourgogne with the geographic name Côte d'Or: white and red (no rosé)"], ["Recognized", "First vintage 2017"], ["Communes", "19 whole communes of the Côte d'Or, from Marsannay to Santenay, plus parts of others and four communes in Saône-et-Loire"], ["Planting density", "At least 9,000 vines/ha"], ["Base yields", "White 66 hl/ha; red 58"], ["Ripeness", "White at least 178 g/L sugar and 11% natural alcohol; red at least 180 g/L and 10.5%"]],
  sections: [
    ["The rules", `<p>Bourgogne Côte d'Or requires the same high density as the village appellations of the Côte (9,000 vines per hectare), riper white grapes than plain Bourgogne, and lower yields. It allows growers on the Côte de Nuits and Côte de Beaune to distinguish their regional wine from Bourgogne made in the Yonne, the Chalonnaise or the Mâconnais.</p>`],
    ["In the glass", `<p>Pinot Noir and Chardonnay from the flatter land below the villages, often from top producers, and the best value in their ranges.</p>`]
  ],
  producers: ["Domaine Roulot", "Domaine Leflaive", "Domaine Lafarge", "Domaine Sylvain Cathiard", "Domaine Faiveley"],
  sources: [BG_BGN],
  checked: "2026-11-13"
};

APXF["fr-bourgogne"] = {
  lede: "The regional appellation of all Burgundy, from the Yonne to the Beaujolais crus: white, red and rosé, and the base of the region's hierarchy.",
  facts: [["Category", "AOC: white, red, rosé (clairet allowed for rosé); many geographic names may be added"], ["Recognized", "Decree of 31 July 1937 (current specification homologated 6 January 2026)"], ["White grapes", "Chardonnay and Pinot Blanc; Pinot Gris as accessory (30% at most)"], ["Red grapes", "Pinot Noir; accessory Chardonnay, Pinot Blanc, Pinot Gris, César (Yonne only), Gamay (only in parts of the Beaujolais crus area, and 30% at most)"], ["Planting density", "At least 5,000 vines/ha"], ["Base yields", "White 68 hl/ha (ceiling 77); red and rosé 60 (ceiling 69)"], ["Ripeness", "White at least 170 g/L sugar and 10.5%; red at least 175 g/L and 10.2%; rosé at least 165 g/L and 10.2%"], ["Geographic names", "Chitry, Côte Saint-Jacques, Côtes d'Auxerre, Coulanges-la-Vineuse, Épineuil, Tonnerre, Côte d'Or, Côte Chalonnaise, Côtes du Couchois, Hautes-Côtes de Beaune, Hautes-Côtes de Nuits, La Chapelle Notre-Dame, Le Chapitre, Montrecul"]],
  sections: [
    ["The place", `<p>The Bourgogne appellation covers vineyards in the Yonne, Côte-d'Or, Saône-et-Loire and parts of the Rhône department, including the Beaujolais crus. Most comes from land below or between the village appellations and from the Mâconnais and Chalonnaise.</p>`],
    ["The rules", `<p>White Bourgogne is Chardonnay with Pinot Blanc; red is Pinot Noir, with limited accessory grapes. Gamay may be included only from the area of the Beaujolais crus, at most 30%, or at least 85% with the word Gamay on the label (Bourgogne Gamay). César, an old Yonne grape, is allowed in the Yonne. Fourteen geographic names may be added to the label, each with its own density and yields; each has its own entry here. In 2017 Bourgogne Côte d'Or was created for regional wine from the Côte d'Or.</p>`],
    ["In the glass", `<p>Simple, fresh Pinot Noir and Chardonnay from merchants and cooperatives, and, from top growers, wines that show their style at the lowest price.</p>`],
    ["For the exam", `<p>Know the hierarchy: regional (Bourgogne and its geographic names, Bourgogne Aligoté, Coteaux Bourguignons, Crémant), village, premier cru, grand cru. Regional wines make up about half of production.</p>`]
  ],
  producers: ["Domaine Roulot", "Domaine Leflaive", "Domaine Leroy", "Louis Jadot", "Joseph Drouhin", "Bouchard Père et Fils"],
  sources: [BG_BGN],
  checked: "2026-11-13"
};

APXF["fr-bourgogne-aligote"] = {
  lede: "Burgundy's second white grape has its own regional appellation, long used for kir and now taken seriously by a new generation of growers.",
  facts: [["Category", "AOC, white only"], ["Recognized", "1937"], ["Grape", "Aligoté"], ["Base yield (2023 conditions)", "70 hl/ha"], ["Minimum natural alcohol", "10%"]],
  sections: [
    ["The rules", `<p>Bourgogne Aligoté may come from anywhere in Burgundy. Aligoté is a cross of Pinot and Gouais Blanc, a sibling of Chardonnay, and was once planted widely on the best slopes before Chardonnay replaced it. Bouzeron is the only village appellation for the grape.</p>`],
    ["Why it matters", `<p>Kir, white wine with blackcurrant liqueur, was named after Canon Félix Kir, mayor of Dijon after the Second World War, who served it at receptions; it was traditionally made with Aligoté. Since the 2010s, growers such as Alice and Olivier De Moor, Domaine Roulot and others have made old-vine Aligoté a sought-after wine, and the growers' association Les Aligoteurs has promoted it.</p>`],
    ["In the glass", `<p>High acidity, lemon, green apple and a little white pepper; old vines give more texture and salinity.</p>`]
  ],
  producers: ["Alice et Olivier De Moor", "Domaine Roulot", "Domaine A. et P. de Villaine", "Domaine Sylvain Pataille"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-bourgogne-passe-tout-grains"] = {
  lede: "A traditional Burgundian blend of Pinot Noir and Gamay, once the everyday red of the region.",
  facts: [["Category", "AOC, red and rosé"], ["Recognized", "1937"], ["Grapes", "Pinot Noir (at least 30%) and Gamay"], ["Base yields (2023 conditions)", "Red 62 hl/ha; rosé 66"], ["Minimum natural alcohol", "10%"]],
  sections: [
    ["The rules", `<p>Passe-Tout-Grains is a blend, often co-fermented, of Pinot Noir and Gamay, with at least 30% Pinot Noir. The name suggests putting all the grapes through together. It may come from anywhere in Burgundy.</p>`],
    ["In the glass", `<p>Light, juicy, red-fruited wine to drink young and cool. A few top domaines still make it from old vines.</p>`]
  ],
  producers: ["Domaine Michel Lafarge", "Domaine Leroy", "Domaine Sylvain Pataille"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-coteaux-bourguignons"] = {
  lede: "The broadest Burgundy appellation, created in 2011 to replace Bourgogne Grand Ordinaire, for blends of any Burgundy grapes, including Gamay from the Beaujolais.",
  facts: [["Category", "AOC: white, red, rosé"], ["Recognized", "2011 (replacing Bourgogne Grand Ordinaire)"], ["Grapes", "Red and rosé: Pinot Noir, Gamay and others; white: Chardonnay, Aligoté, Melon, Pinot Blanc, Pinot Gris"], ["Base yields (2023 conditions)", "White 70 hl/ha; red 62; rosé 66"], ["Minimum natural alcohol", "10%"]],
  sections: [
    ["The rules", `<p>Coteaux Bourguignons covers all of Burgundy and the Beaujolais. Reds may be Pinot Noir, Gamay or a blend in any proportion, which gives Beaujolais producers an outlet with the Burgundy name. It replaced the old Bourgogne Grand Ordinaire, whose name did little for sales.</p>`],
    ["In the glass", `<p>Simple, fruity wines for early drinking.</p>`]
  ],
  producers: ["Louis Jadot", "Georges Duboeuf", "Albert Bichot"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-cremant-de-bourgogne"] = {
  lede: "Burgundy's traditional-method sparkling wine, from Chardonnay and Pinot Noir grown across the region, with two aged categories at the top.",
  facts: [["Category", "AOC, sparkling white and rosé"], ["Recognized", "1975"], ["Grapes", "Mainly Chardonnay and Pinot Noir, with Pinot Blanc, Pinot Gris, Gamay, Aligoté and others in limited proportions"], ["Base yields (2023 conditions)", "65 to 90 hl/ha depending on vine spacing and parcels dedicated to crémant"], ["Minimum natural alcohol", "9%"], ["Ageing", "At least 9 months on the lees; Éminent at least 24 months; Grand Éminent at least 36 months"]],
  sections: [
    ["The rules", `<p>Crémant de Bourgogne replaced Bourgogne Mousseux for white and rosé sparkling wine in 1975. It is made by second fermentation in the bottle, with hand harvest and whole-bunch pressing. Since 2016 two higher categories exist: Éminent, aged at least 24 months, and Grand Éminent, at least 36 months, with stricter grape and dosage rules. Yields depend on vine spacing and on whether parcels are declared in advance for crémant.</p>`],
    ["Where it comes from", `<p>Much comes from the Yonne (around Chablis and Auxerre, where the cooperative Bailly Lapierre ages its wines in old quarries), the Côte Chalonnaise around Rully, and the Mâconnais. It is one of the fastest-growing categories in Burgundy.</p>`],
    ["In the glass", `<p>Fresh, citrus and apple with some brioche; Blanc de Blancs from Chardonnay, rosé from Pinot Noir. Éminent and Grand Éminent wines have more depth.</p>`]
  ],
  producers: ["Caves de Bailly Lapierre", "Louis Picamelot", "Veuve Ambal", "Maison Parigot-Richard", "Vitteaut-Alberti"],
  sources: [BG_Y23],
  checked: "2026-11-13"
};

APXF["fr-bourgogne-mousseux"] = {
  lede: "Now reserved for sparkling red Burgundy, a rare relic of a nineteenth-century fashion.",
  facts: [["Category", "AOC, sparkling red only"], ["Grapes", "Pinot Noir and Gamay, with César in the Yonne; accessory white grapes 10% at most of plantings"], ["Planting density", "At least 5,000 vines/ha"], ["Base yield", "64 hl/ha (ceiling 69)"], ["Ripeness", "At least 171 g/L sugar and 10% natural alcohol"], ["Ageing", "At least 9 months on the lees; sold 9 months after tirage"]],
  sections: [
    ["The rules", `<p>After Crémant de Bourgogne took over white and rosé sparkling wine in 1975, Bourgogne Mousseux came to be used only for sparkling red. Tirage may begin from 1 December after the harvest, and the wine must spend at least nine months on its lees.</p>`],
    ["In the glass", `<p>Fruity, slightly sweet or dry red sparkling wine, very rarely seen; sparkling red Burgundy was fashionable in Britain and the United States in the nineteenth century.</p>`]
  ],
  producers: [],
  sources: [["Bourgogne Mousseux specification (BO Agri)", "https://info.agriculture.gouv.fr/gedei/site/bo-agri/document_administratif-1fbaf2c5-d402-4eae-87ac-c9f35fdd144a/telechargement"]],
  checked: "2026-11-13"
};
