"""Part 6: Lisboa (Bucelas, Colares, Carcavelos, Alenquer, Arruda, Óbidos, Torres Vedras, Lourinhã, Encostas d'Aire), Tejo (DoTejo),
Península de Setúbal (Setúbal / Moscatel de Setúbal, Palmela). Writes work/pt/p6_centre.json"""
import json

OUT = "/home/claude/winesite/work/pt/p6_centre.json"
SRC_DN = {"title": "Diário de Notícias: area by region (IVV), 2025", "url": "https://www.dn.pt/economia/portugal-perdeu-50-mil-hectares-de-vinha-numa-década-mas-os-excedentes-de-vinho-continuam-a-preocupar"}
SRC_EU = {"title": "EU PDO inventory (Candiago et al. 2022)", "url": "https://doi.org/10.6084/m9.figshare.c.5877659"}
SRC_EURONEWS = {"title": "Euronews: The resurrection of Carcavelos (Oct 2024)", "url": "https://www.euronews.com/culture/2024/10/12/starting-history-again-how-the-resurrection-of-carcavelos-is-saving-a-lost-culture"}
SRC_WFW = {"title": "World of Fine Wine: Colares on the beach", "url": "https://worldoffinewine.com/news-features/colares-on-the-beach"}
SRC_WOP_M = {"title": "Wines of Portugal: Moscatel", "url": "https://winesofportugal.com/en/portuguese-wines/wine-styles/vinho-moscatel/"}
SRC_WP_BUC = {"title": "Wikipedia: Bucelas DOC", "url": "https://en.wikipedia.org/wiki/Bucelas_DOC"}
SRC_CVRL = {"title": "Comissão Vitivinícola Regional de Lisboa", "url": "https://www.vinhosdelisboa.pt"}
SRC_CVRT = {"title": "Comissão Vitivinícola Regional do Tejo", "url": "https://www.cvrtejo.pt"}
SRC_CVRPS = {"title": "Comissão Vitivinícola Regional da Península de Setúbal", "url": "https://www.vinhosdapeninsuladesetubal.pt"}

def S(id_, name, kind, cls, app, lat, lon, cq, text, producers):
    return {"id": id_, "country": "pt", "name": name, "kind": kind, "class": cls, "appellation": app,
            "lat": lat, "lon": lon, "coord_quality": cq, "text": text, "producers": producers}

def IGP(name, region, lat, lon, summary, match=None, styles=None, dom="red"):
    return {"country": "pt", "name": name, "match": match or [name, "IGP " + name, "Vinho Regional " + name], "cat": "IGP", "subcat": "Vinho Regional",
            "region": region, "subregion": None, "created": "IGP", "area_ha": None, "styles": styles or ["red", "white", "rose", "sparkling"], "dominant_style": dom,
            "lat": lat, "lon": lon, "coord_quality": "approx", "grapes": "Regional and international varieties", "summary": summary,
            "terroir": "", "producers": [], "nerd_note": ""}

# ---------------- Lisboa
r_lis = {
    "country": "pt", "name": "Lisboa", "alt": ["Estremadura", "Lisbon"], "parent_region": None, "lat": 39.15, "lon": -9.15, "zoom": 8.4,
    "tagline": "Windswept Atlantic hills north of the capital: once Portugal's bulk-wine engine, now a home of fresh whites, value reds and three historic oddities.",
    "summary": "The Lisboa region (called Estremadura until 2008) runs along the Atlantic coast from Lisbon north to Leiria, about 18,000 ha of vines in 2024. Cool Atlantic winds and fog make it fresher than its latitude suggests. For centuries it supplied cheap wine to the capital and the colonies; today it is Portugal's biggest producer of Vinho Regional, with modern estates around Alenquer and a growing name for crisp whites and supple reds. On the Lisbon fringe survive three of Europe's most remarkable historic appellations: Bucelas (Arinto whites, 'Lisbon Hock'), Colares (ungrafted vines in Atlantic sand) and Carcavelos (a fortified wine nearly swallowed by suburbs).",
    "history": "Bucelas, Colares and Carcavelos were demarcated in 1907 and 1908, among the first in Portugal. The rest of the region was a sea of cooperatives until the 1980s and 1990s, when estates such as Quinta do Monte d'Oiro, Quinta de Chocapalha, Quinta da Romeira and Casa Santos Lima showed what the Atlantic hills could do.",
    "terroir": "Limestone, clay and sandstone hills, rarely above 400 m (Serra de Montejunto at 666 m is the highest point), whipped by Atlantic winds that cool the vines and limit disease. Colares is pure dune sand over clay; Bucelas is limestone and clay in a sheltered valley; Carcavelos is limestone and clay by the Tejo estuary.",
    "grapes": "Arinto, Fernão Pires, Vital, Seara Nova, Malvasia, Chardonnay; Castelão, Tinta Roriz (Aragonez), Touriga Nacional, Syrah, Alicante Bouschet, Tinta Miúda; Ramisco in Colares.",
    "styles": "Fresh whites, medium-bodied reds, rosé, sparkling, fortified (Carcavelos), and aguardente (Lourinhã).",
    "classification": "Nine DOCs: Bucelas, Colares, Carcavelos, Alenquer, Arruda, Óbidos, Torres Vedras, Lourinhã (aguardente only) and Encostas d'Aire (shared with the Tejo border area). IGP Lisboa covers the wider area, with mentions such as Estremadura, Alta Estremadura and Lisboa Estremadura.",
    "appellations": ["Bucelas", "Colares", "Carcavelos", "Alenquer", "Arruda", "Óbidos", "Torres Vedras", "Lourinhã", "Encostas d’Aire", "Lisboa"],
    "sources": [SRC_CVRL, SRC_DN, SRC_EU, SRC_WP_BUC, SRC_WFW, SRC_EURONEWS]
}
buc = {"country": "pt", "id": "pt-bucelas", "name": "Bucelas", "match": ["Bucelas", "DOC Bucelas"],
       "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "1907 to 1911 (one of the first demarcations)", "area_ha": None,
       "styles": ["white", "sparkling"], "dominant_style": "white", "grapes": "Arinto (dominant), Sercial (Esgana Cão), Rabo de Ovelha",
       "summary": "A small valley 25 km north of Lisbon whose DOC is for white wine only, built on Arinto: a grape with lemon, green apple and lime-blossom aromas and a ramrod of acidity that lets the wine age for a decade. The Duke of Wellington took a liking to it during the Peninsular War, and in Regency London it was sold as 'Portuguese Hock' or 'Lisbon Hock', compared to the Rhine Rieslings of the day. By the 1980s almost all vineyards belonged to a single estate and the name had nearly vanished; Quinta da Romeira, Quinta da Murta and newcomers revived it from the 1990s. There is also a little traditional-method sparkling Bucelas.",
       "terroir": "Limestone and clay marls in the sheltered valley of the Trancão river, with Atlantic winds funnelling through.",
       "producers": ["Quinta da Romeira", "Quinta da Murta", "Caves Velhas", "Quinta do Boição"],
       "nerd_note": "Bucelas is a white-only DOC built on one grape: Arinto must dominate every blend, with Sercial (Esgana Cão) and Rabo de Ovelha in support.",
       "contains": []}
col = {"country": "pt", "id": "pt-colares", "name": "Colares", "match": ["Colares", "Collares", "DOC Colares"],
       "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "1908", "area_ha": None,
       "styles": ["red", "white"], "dominant_style": "red", "grapes": "Ramisco (red), Malvasia de Colares (white)",
       "summary": "Colares is one of the strangest and most romantic wine places in Europe. On the Atlantic coast below Sintra, its DOC vines grow in deep beach sand (chão de areia) on their own roots, because phylloxera cannot survive in sand; when the louse destroyed Europe's vineyards in the late 19th century, Colares boomed. To plant, growers dig trenches several metres down through the sand until they reach clay, lay the cuttings in, and fill back. The vines sprawl along the ground, propped on small canes to keep the grapes off the hot sand, behind fences of woven cane that break the ocean wind.\n\nThe red, Ramisco, is ferociously tannic and acidic when young and needs decades; old Colares (Viúva Gomes or the Adega Regional bottlings from the 1930s to 1970s) turns into something like old Nebbiolo crossed with the sea: dried cherry, tea, mushroom, iodine. The white, Malvasia de Colares, is saline and fresh. Production has fallen from over a million litres a year around 1950 to a few tens of thousands, as holiday homes replaced vineyards, and only a handful of producers remain.",
       "terroir": "Deep Atlantic dune sand over clay (chão de areia) for DOC wines; a few vines on the clay (chão rijo) nearby must be grafted and do not qualify for the classic style. Fog, salt wind, cool summers.",
       "producers": ["Adega Regional de Colares", "Viúva Gomes", "Fundação Oriente", "Casal Santa Maria", "Ramilo", "Monte Cascas"],
       "nerd_note": "The cooperative, Adega Regional de Colares, held a legal monopoly on vinifying Colares wine from 1931 until the 1990s; its cask hall, fitted with tropical-wood vats of uneven sizes, still holds the region's stocks.",
       "contains": []}
car = {"country": "pt", "id": "pt-carcavelos", "name": "Carcavelos", "match": ["Carcavelos", "DOC Carcavelos"],
       "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "1908", "area_ha": 32,
       "styles": ["fortified", "sweet", "white"], "dominant_style": "fortified",
       "grapes": "Galego Dourado, Ratinho, Arinto, Boal, Seara Nova; Castelão, Preto Martinho, Negra Mole",
       "summary": "Carcavelos is a fortified wine from the coast between Lisbon and Cascais, made by stopping fermentation with grape spirit and then ageing the wine for years in wood: amber, off-dry to medium-sweet, with notes of dried apricot, almond and orange peel and a salty finish from the Atlantic. In the 18th century it was a celebrated export; the Marquis of Pombal owned a vineyard estate in Oeiras and pushed Carcavelos into the English market, and shipments are recorded as far as the courts of Europe.\n\nThen the suburbs came. Phylloxera, war, economic crisis and above all urban sprawl along the Lisbon to Cascais railway reduced the vineyards to almost nothing by the late 20th century. Revival began in 1983, when the Oeiras municipality and the Ministry of Agriculture replanted 5 ha at the Marquis's former estate under the Villa Oeiras project; by October 2024 about 32 ha were growing Carcavelos, with more planned. It remains one of the smallest DOCs in Europe.",
       "terroir": "Limestone and clay, sea-facing slopes beside the Tejo estuary, warm and windy with salt air.",
       "producers": ["Villa Oeiras (Municipality of Oeiras)", "Casal da Manteiga"],
       "nerd_note": "Villa Oeiras is a rare case of a city council running a winery: its cellar under the Marquis of Pombal's estate ages the wine, and the project's stated goal is eventually a 100-year-old Carcavelos.",
       "contains": []}
ale = {"country": "pt", "id": "pt-alenquer", "name": "Alenquer", "match": ["Alenquer", "DOC Alenquer"],
       "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "DOP registered 1991 (former IPR)", "area_ha": None,
       "styles": ["red", "white"], "dominant_style": "red", "grapes": "Touriga Nacional, Tinta Roriz, Castelão, Syrah, Alicante Bouschet; Arinto, Fernão Pires, Vital",
       "summary": "The most prestigious of the Lisboa table-wine DOCs, in a valley sheltered from the ocean by the Serra de Montejunto, which makes it warmer and drier than the coast. Quinta do Monte d'Oiro (whose Syrah, from Hermitage cuttings, put the region on the map in the 1990s) and Quinta de Chocapalha lead a group of estates making supple, well-built reds and fresh whites.",
       "terroir": "Clay-limestone hills behind the Montejunto range, rain shadow, warm days.",
       "producers": ["Quinta do Monte d'Oiro", "Quinta de Chocapalha", "Quinta da Boavista (Casa Santos Lima)", "Quinta de Pancas"],
       "nerd_note": "Quinta do Monte d'Oiro's owner José Bento dos Santos planted Syrah cuttings sourced from Hermitage, and its Reserva is often cited as Portugal's best Syrah.", "contains": []}
arr = {"country": "pt", "id": "pt-arruda", "name": "Arruda", "match": ["Arruda", "DOC Arruda", "Arruda dos Vinhos"],
       "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "DOP registered 1991 (former IPR)", "area_ha": None,
       "styles": ["red", "white"], "dominant_style": "red", "grapes": "Castelão, Tinta Roriz, Touriga Nacional; Arinto, Fernão Pires, Vital",
       "summary": "Around Arruda dos Vinhos ('Arruda of the wines'), just north of Lisbon. A historic source of rustic red for the capital, dominated by its cooperative; easy, fruity reds and whites. The lines of Torres Vedras, Wellington's defensive forts of 1810, cross the area.",
       "terroir": "Clay-limestone hills just inland from the Atlantic.", "producers": ["Adega Cooperativa de Arruda dos Vinhos"], "nerd_note": "", "contains": []}
obi = {"country": "pt", "id": "pt-obidos", "name": "Óbidos", "match": ["Óbidos", "Obidos", "DOC Óbidos"],
       "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "DOP registered 1991 (former IPR)", "area_ha": None,
       "styles": ["white", "red", "sparkling"], "dominant_style": "white", "grapes": "Arinto, Fernão Pires, Vital, Seara Nova; Castelão, Touriga Nacional, Tinta Roriz",
       "summary": "Around the walled medieval town of Óbidos (and its cherry liqueur, ginjinha). Cool, Atlantic-exposed hills give fresh whites and the region's best traditional-method sparkling base wines.",
       "terroir": "Clay and limestone, strong Atlantic influence.", "producers": ["Companhia Agrícola do Sanguinhal"], "nerd_note": "", "contains": []}
tv = {"country": "pt", "id": "pt-torres-vedras", "name": "Torres Vedras", "match": ["Torres Vedras", "DOC Torres Vedras"],
      "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "DOP registered 1996 (former IPR)", "area_ha": None,
      "styles": ["white", "red"], "dominant_style": "white", "grapes": "Arinto, Fernão Pires, Vital, Seara Nova; Castelão, Tinta Roriz, Touriga Nacional",
      "summary": "One of Portugal's largest wine-producing municipalities, long the source of light 'vinho de consumo' for Lisbon. Its DOC wines are fresh whites and light reds; the biggest producers are cooperatives and Casa Santos Lima's neighbouring estates. The town gave its name to Wellington's Lines of Torres Vedras, which stopped Masséna's invasion in 1810.",
      "terroir": "Clay-limestone, Atlantic winds and fog.", "producers": ["Adega Cooperativa de Torres Vedras"], "nerd_note": "", "contains": []}
lou = {"country": "pt", "name": "Lourinhã", "match": ["Lourinhã", "Lourinha", "Aguardente DOC Lourinhã", "Aguardente Vínica Lourinhã"],
       "cat": "DOC", "subcat": "Aguardente (brandy) appellation", "region": "Lisboa", "subregion": None, "created": "1990s (brandy appellation)",
       "area_ha": None, "styles": [], "dominant_style": "brandy", "lat": 39.2417, "lon": -9.3117, "coord_quality": "approx",
       "grapes": "Alicante Branco, Boal Espinho, Malvasia Rei, Tália; Cabinda, Marufo, Tinta Miúda",
       "summary": "Lourinhã is a demarcated region for grape brandy (aguardente vínica), one of only a handful of brandy appellations in Europe alongside Cognac, Armagnac and Jerez. Thin, very acidic base wines from the windy coast north of Lisbon are double-distilled and aged at least two years in oak; the best are aged far longer. Production is tiny, led by the local cooperative.",
       "terroir": "Coastal clay and sandstone, cool Atlantic winds that keep base wines low in alcohol and high in acid, ideal for distillation.",
       "producers": ["Adega Cooperativa da Lourinhã"],
       "nerd_note": "Because it covers brandy, not wine, Lourinhã does not appear in the EU register of wine PDOs; it is protected as a spirit drink geographical indication."}
ea = {"country": "pt", "id": "pt-encostas-d-aire", "name": "Encostas d’Aire", "match": ["Encostas d’Aire", "Encostas d'Aire", "Encostas de Aire", "DOC Encostas d'Aire", "Alcobaça", "Ourém"],
      "cat": "DOC", "region": "Lisboa", "subregion": None, "created": "DOP registered 1991 (former IPR)", "area_ha": None,
      "styles": ["red", "white", "rose"], "dominant_style": "red",
      "grapes": "Baga, Castelão, Trincadeira, Touriga Nacional, Tinta Roriz; Arinto, Fernão Pires, Vital",
      "summary": "A large DOC on the limestone foothills of the Serra de Aire and Serra dos Candeeiros, around Leiria, Batalha, Alcobaça, Fátima and Ourém. It has two subregions, Alcobaça and Ourém; the latter is home to Medieval de Ourém, a traditional blend of white Fernão Pires with a little red Trincadeira, fermented separately and blended, now a recognised style within the DOC. The Cistercian abbey of Alcobaça, whose monks planted vines here from the 12th century, has a wine museum.",
      "terroir": "Limestone and clay, karst hills, Atlantic-influenced to the west and warmer inland toward the Tejo.",
      "producers": ["Adega Cooperativa de Ourém"],
      "nerd_note": "Medieval de Ourém revives a style mentioned in medieval charters: about 80% white must and 20% red, fermented apart and blended in spring.",
      "contains": []}
lisboa_igp = IGP("Lisboa", "Lisboa", 39.15, -9.15, "The regional (IGP) designation for the Lisboa region, called Estremadura until 2008, used by much of the region's production including many of its best-known estates.", match=["Lisboa", "IGP Lisboa", "Vinho Regional Lisboa", "Estremadura", "Vinho Regional Estremadura"])

# ---------------- Tejo
r_tejo = {
    "country": "pt", "name": "Tejo", "alt": ["Ribatejo", "DoTejo"], "parent_region": None, "lat": 39.3, "lon": -8.55, "zoom": 8.4,
    "tagline": "Portugal's breadbasket on the banks of the Tagus, where fertile floodplains meet sandy heaths and limestone hills.",
    "summary": "The Tejo region (Ribatejo until 2009) follows the river Tagus north-east of Lisbon through Santarém, Almeirim, Cartaxo, Chamusca and Tomar. About 12,000 ha of vines in 2024 grow in three very different landscapes: the fertile alluvial floodplain (lezíria or campo), the sandy heaths south of the river (charneca), and the clay-limestone hills north of it (bairro). Historically a source of bulk wine, the Tejo now makes good-value reds and whites, with a few serious estates.",
    "history": "Royal estates and religious orders farmed the Tagus valley since the Middle Ages; the Templars at Tomar and the kings at Almeirim had vineyards. The Ribatejo was demarcated as an IPR in the 1980s with six subregions (Almeirim, Cartaxo, Chamusca, Coruche, Santarém, Tomar), merged into a single DOC Do Tejo (EU name DoTejo, 2011).",
    "terroir": "Campo: fertile alluvium, high yields, lighter wines. Bairro: clay-limestone hills, the best reds. Charneca: poor, sandy soils, hot and dry, good for concentrated reds and Fernão Pires.",
    "grapes": "Fernão Pires (the regional white), Arinto, Talia, Verdelho; Castelão, Trincadeira, Touriga Nacional, Tinta Roriz, Alicante Bouschet, Syrah, Cabernet Sauvignon.",
    "styles": "Aromatic Fernão Pires whites, fruity reds, rosé, sparkling, late-harvest and fortified.",
    "classification": "DOC DoTejo (registered 2011; the six former subregions are no longer used); IGP Tejo for the wider area.",
    "appellations": ["DoTejo", "Tejo"],
    "sources": [SRC_CVRT, SRC_DN, SRC_EU]
}
tejo = {"country": "pt", "id": "pt-dotejo", "name": "DoTejo", "match": ["DoTejo", "Do Tejo", "DOC do Tejo", "Tejo DOC", "Ribatejo DOC", "Ribatejo"],
        "cat": "DOC", "region": "Tejo", "subregion": None, "created": "2011 (as DoTejo; formerly Ribatejo IPR/DOC)", "area_ha": 12000,
        "styles": ["white", "red", "rose", "sparkling", "fortified"], "dominant_style": "red",
        "grapes": "Fernão Pires, Arinto, Talia; Castelão, Trincadeira, Touriga Nacional, Tinta Roriz, Alicante Bouschet",
        "summary": "A big DOC along the Tagus valley. Its signature white is Fernão Pires: aromatic, citrus-and-flower scented, sometimes barrel-fermented or late-harvested. Reds range from light, fruity Castelão from the floodplain to dense Touriga and Alicante blends from the sandy charneca. Most of the region's wine is sold as IGP Tejo; the DOC is used for more traditional, regionally typical wines.",
        "terroir": "Alluvial floodplain, sandy heath and clay-limestone hills; Mediterranean climate with Atlantic influence up the river.",
        "producers": ["Quinta da Alorna", "Casal Branco", "Quinta da Lagoalva", "Falua", "Casa Cadaval", "Fiuza"],
        "nerd_note": "The EU register writes the name as one word, DoTejo, a contraction of 'do Tejo' (of the Tagus), so the label does not read as plain 'Tejo', which is the IGP.",
        "contains": []}
tejo_igp = IGP("Tejo", "Tejo", 39.3, -8.55, "The regional (IGP) designation for the Tagus valley, called Ribatejano until 2009; it covers most of the region's production.", match=["Tejo", "IGP Tejo", "Vinho Regional Tejo", "Ribatejano"])

# ---------------- Península de Setúbal
r_set = {
    "country": "pt", "name": "Península de Setúbal", "alt": ["Setúbal Peninsula", "Terras do Sado"], "parent_region": None, "lat": 38.58, "lon": -8.85, "zoom": 9.2,
    "tagline": "Muscat country south of Lisbon: amber Moscatel de Setúbal from the Arrábida hills and supple Castelão from the sandy plain.",
    "summary": "Across the Tagus from Lisbon, the Setúbal Peninsula has two faces. The limestone Serra da Arrábida, rising straight from the sea, shelters vineyards around Azeitão and Palmela that grow Muscat for Moscatel de Setúbal, Portugal's great sweet fortified white. Inland, the vast sandy plain toward Pegões and Poceirão is Castelão country, producing soft, red-fruited reds in large volumes. The region is home to two of Portugal's biggest family wine companies, José Maria da Fonseca and Bacalhôa, and to Casa Ermelinda Freitas.",
    "history": "Moscatel from Setúbal was exported from the 14th century, and the Setúbal DOC is among Portugal's oldest (demarcated 1907). José Maria da Fonseca, founded in 1834 in Vila Nogueira de Azeitão, made the Periquita red one of Portugal's first wine brands and still ages Moscatel stocks back to the 19th century. Bacalhôa takes its name from a 15th-century palace and estate bought by the Berardo group, whose collection of modern art and tiles is shown at the winery.",
    "terroir": "Arrábida: limestone and clay slopes, protected from Atlantic winds, warm and humid near the sea. The plain: deep, poor, sandy soils (podzols) with hot summers, where Castelão ripens easily.",
    "grapes": "Moscatel de Setúbal (Muscat of Alexandria, Moscatel Graúdo), Moscatel Roxo; Castelão; Fernão Pires, Arinto, Antão Vaz; Syrah, Alicante Bouschet, Touriga Nacional, Aragonez.",
    "styles": "Moscatel de Setúbal and Moscatel Roxo (fortified), Castelão reds, whites, rosés and sparkling wines.",
    "classification": "DOC Setúbal (fortified Moscatel), DOC Palmela (table wines and fortified), IGP Península de Setúbal.",
    "appellations": ["Setúbal", "Palmela", "Península de Setúbal"],
    "sources": [SRC_CVRPS, SRC_WOP_M, SRC_EU]
}
setu = {"country": "pt", "id": "pt-setubal", "name": "Setúbal", "match": ["Setúbal", "Setubal", "Moscatel de Setúbal", "Moscatel Roxo", "Moscatel Roxo de Setúbal", "DOC Setúbal"],
        "cat": "DOC", "region": "Península de Setúbal", "subregion": None, "created": "1907", "area_ha": None,
        "styles": ["fortified", "sweet", "white"], "dominant_style": "fortified",
        "grapes": "Moscatel de Setúbal (Muscat of Alexandria); Moscatel Roxo; Antão Vaz, Arinto, Fernão Pires, Malvasia Fina and others in minor shares",
        "summary": "Moscatel de Setúbal is one of the world's great fortified Muscats. Muscat of Alexandria grapes are fermented briefly, fortified with grape spirit to stop the fermentation, and then left to macerate on their skins for months (often five or six), so the wine draws out apricot, orange blossom, honey and spice (at least three months, often longer). It then ages at least 18 months in wood, where it turns from gold to amber and, after decades, to a deep mahogany with notes of dried figs, coffee and burnt orange, always balanced by fresh acidity. To be labelled Moscatel de Setúbal the wine must contain at least 85% Moscatel; blends with less are simply Setúbal.\n\nMoscatel Roxo, a rare pink-skinned Muscat mutation that nearly disappeared in the 20th century, was saved largely by José Maria da Fonseca and makes a more intense, spicy wine. Most are sold at two to five years old; a small share is released at 10 or 20 years or more, and single-vintage bottlings from José Maria da Fonseca's 19th- and 20th-century stocks are among Portugal's rarest wines.",
        "terroir": "Limestone and clay slopes of the Serra da Arrábida around Azeitão and Palmela, warm and sheltered; also sandy plains inland.",
        "producers": ["José Maria da Fonseca", "Bacalhôa", "Horácio Simões", "Casa Ermelinda Freitas", "Adega de Pegões"],
        "nerd_note": "The long skin contact after fortification is what sets Setúbal apart from most other fortified Muscats: the alcohol extracts aroma compounds from the skins for months.",
        "contains": []}
palm = {"country": "pt", "id": "pt-palmela", "name": "Palmela", "match": ["Palmela", "DOC Palmela"],
        "cat": "DOC", "region": "Península de Setúbal", "subregion": None, "created": "DOP registered 1991", "area_ha": None,
        "styles": ["red", "white", "rose", "sparkling", "fortified"], "dominant_style": "red",
        "grapes": "Castelão (dominant in reds), Alicante Bouschet, Touriga Nacional, Aragonez, Syrah; Fernão Pires, Arinto, Moscatel",
        "summary": "Palmela is Castelão's home appellation, on the same ground as the Setúbal DOC but for table wines (and a fortified Moscatel too). On the sandy plain, Castelão gives soft, juicy reds with red cherry and a touch of spice; on the limestone of the Arrábida it is firmer. The castle of Palmela, a former seat of the Order of Santiago, looks over the vineyards.",
        "terroir": "Sands of the plain and limestone of the Arrábida hills.",
        "producers": ["Casa Ermelinda Freitas", "José Maria da Fonseca", "Bacalhôa", "Adega de Pegões"],
        "nerd_note": "Periquita, the José Maria da Fonseca red launched in the 1850s, was so successful that Periquita became a synonym for the Castelão grape across Portugal.", "contains": []}
ps_igp = IGP("Península de Setúbal", "Península de Setúbal", 38.6, -8.8, "The regional (IGP) designation for the Setúbal Peninsula, used for most of its table wine.", match=["Península de Setúbal", "IGP Península de Setúbal", "Vinho Regional Península de Setúbal", "Terras do Sado"])

sites = [
    # Lisboa
    S("site-pt-adega-regional-de-colares", "Adega Regional de Colares", "cellar", "Colares cooperative (1931)", "Colares", 38.8054, -9.4494, "precise",
      "The cooperative that held a legal monopoly on Colares wine from 1931 until the 1990s. Its long cask hall, lined with vats of Brazilian hardwoods of irregular sizes from 1931, holds the stocks of Ramisco and Malvasia, and old vintages are still sold.", ["Adega Regional de Colares"]),
    S("site-pt-viuva-gomes", "Adega Viúva Gomes", "cellar", "Colares producer (1808)", "Colares", 38.7956, -9.4705, "precise",
      "A tiled 19th-century cellar in Almoçageme with the date 1808 over the door (the founding of the company). Viúva Gomes is the best-known name in old Colares, whose reds from the 1960s and earlier are prized for their mineral, tea-and-mushroom complexity.", ["Viúva Gomes"]),
    S("site-pt-colares-sand-vineyards", "Colares sand vineyards (chão de areia)", "landscape", "Ungrafted vines in dune sand", "Colares", 38.7990, -9.4470, "approx",
      "Low, sprawling Ramisco and Malvasia vines on their own roots in Atlantic dune sand, behind cane windbreaks, between Colares and the sea. Planting means digging through metres of sand to the clay below. The point marks the village; vineyards lie scattered toward Azenhas do Mar and Praia das Maçãs.", []),
    S("site-pt-villa-oeiras", "Villa Oeiras (Marquês de Pombal estate)", "estate", "Carcavelos revival project (1983)", "Carcavelos", 38.7011, -9.3148, "approx",
      "The Marquis of Pombal's former estate in Oeiras, whose vineyards supplied 18th-century Carcavelos. Since 1983 the municipality and the Ministry of Agriculture have replanted Carcavelos here and age it in the estate's old cellars, producing most of today's Carcavelos.", ["Villa Oeiras"]),
    S("site-pt-quinta-do-barao-carcavelos", "Quinta do Barão", "historic", "Historic Carcavelos estate", "Carcavelos", 38.6942, -9.3304, "precise",
      "An 18th-century quinta with manor, gardens and cellar at Carcavelos, one of the historic producers of the fortified wine before suburbs swallowed the vineyards; classified as a heritage site.", []),
    S("site-pt-quinta-da-romeira", "Quinta da Romeira", "quinta", "Bucelas estate", "Bucelas", 38.9020, -9.1180, "approx",
      "The historic Bucelas estate that for decades owned most of the DOC's vineyards; its Arinto whites (Morgado de Santa Catherina, Prova Régia) relaunched Bucelas in the 1990s. Point near the village.", ["Quinta da Romeira"]),
    S("site-pt-quinta-da-murta", "Quinta da Murta", "quinta", "Bucelas Arinto estate", "Bucelas", 38.9309, -9.1239, "precise",
      "A small estate on the slopes of the Serra de Alrota making taut, saline Arinto and a sparkling Bucelas.", ["Quinta da Murta"]),
    S("site-pt-quinta-de-chocapalha", "Quinta de Chocapalha", "quinta", "Alenquer estate", "Alenquer", 39.0763, -9.1067, "precise",
      "The Tavares da Silva family estate, with winemaker Sandra Tavares da Silva (also of Wine & Soul in the Douro): elegant Arinto, Touriga Nacional and Castelão, and one of the best Lisboa wineries.", ["Quinta de Chocapalha"]),
    S("site-pt-quinta-do-monte-d-oiro", "Quinta do Monte d'Oiro", "quinta", "Syrah pioneer, Alenquer", "Alenquer", 39.1069, -9.1115, "approx",
      "José Bento dos Santos's estate near Ventosa, Alenquer, where Syrah from Hermitage cuttings and Viognier made some of the most acclaimed Portuguese wines of the 2000s. Point at Monte d'Oiro locality.", ["Quinta do Monte d'Oiro"]),
    S("site-pt-mosteiro-de-alcobaca", "Mosteiro de Alcobaça and Museu do Vinho", "historic", "Cistercian abbey and wine museum", "Encostas d’Aire", 39.5486, -8.9786, "precise",
      "The great Cistercian abbey founded in 1153 (UNESCO), whose monks drained the valleys and planted vines and orchards. The nearby Museu do Vinho de Alcobaça, in an old wine warehouse, holds one of Portugal's largest collections on wine history.", []),
    # Tejo
    S("site-pt-quinta-da-alorna", "Quinta da Alorna", "quinta", "Historic Tejo estate (1723)", "DoTejo", 39.2012, -8.6404, "precise",
      "A royal-era estate at Almeirim founded in 1723 and later owned by the Marquis of Alorna, one of the Tejo's best-known producers of Fernão Pires and Touriga blends.", ["Quinta da Alorna"]),
    S("site-pt-casal-branco", "Casal Branco", "estate", "Almeirim family estate", "DoTejo", 39.1697, -8.6612, "approx",
      "A large family estate (also a stud farm for Lusitano horses) near Almeirim, known for Falcoaria wines.", ["Casal Branco"]),
    S("site-pt-quinta-da-lagoalva", "Quinta da Lagoalva de Cima", "quinta", "Alpiarça estate", "DoTejo", 39.2971, -8.5604, "precise",
      "A 19th-century estate near Alpiarça owned by the Holstein Campilho family, known for whites from Fernão Pires, Arinto and Talia and for Lusitano horses.", ["Quinta da Lagoalva"]),
    # Setúbal
    S("site-pt-jose-maria-da-fonseca", "José Maria da Fonseca (Casa Museu)", "house", "Wine house founded 1834", "Setúbal", 38.5179, -9.0157, "precise",
      "The family company's historic house and cellars in Vila Nogueira de Azeitão. Founded in 1834 by José Maria da Fonseca, a mathematician, it created Periquita (from the 1850s), Lancers rosé (1944, for the US market, in a crock-style bottle) and a library of Moscatel de Setúbal reaching back to the 19th century. Still run by the Soares Franco family.", ["José Maria da Fonseca"]),
    S("site-pt-bacalhoa-palace", "Palácio e Quinta da Bacalhôa", "historic", "15th-century palace and vineyard", "Setúbal", 38.5261, -8.9939, "precise",
      "A Renaissance palace and garden at Vila Fresca de Azeitão, with some of the oldest azulejo panels in Portugal. Its Quinta da Bacalhôa vineyard, planted with Cabernet Sauvignon and Merlot in the 1970s by its then American owners, produced one of Portugal's first Bordeaux-style reds.", ["Bacalhôa"]),
    S("site-pt-bacalhoa-vinhos", "Bacalhôa Vinhos (Azeitão winery)", "cellar", "Winery, art collection", "Setúbal", 38.5246, -9.0165, "precise",
      "Bacalhôa's winery in Azeitão, combining Moscatel cellars with displays from the art and tile collections associated with its long-time controlling shareholder, José Berardo. Bacalhôa is one of Portugal's largest wine groups, with estates in the Alentejo, Bairrada (Aliança) and Douro.", ["Bacalhôa"]),
    S("site-pt-casa-ermelinda-freitas", "Casa Ermelinda Freitas", "estate", "Family estate, Fernando Pó", "Palmela", 38.6345, -8.6958, "precise",
      "A family estate on the Palmela sands run by Leonor Freitas since the 1990s; once a supplier of bulk wine, it became one of Portugal's most awarded producers, known for Castelão and Moscatel.", ["Casa Ermelinda Freitas"]),
    S("site-pt-castelo-de-palmela", "Castelo de Palmela", "historic", "Castle of the Order of Santiago", "Palmela", 38.5690, -8.9013, "approx",
      "The hill-top castle that gives the Palmela DOC its name, seat of the Order of Santiago from the 15th century, with views over the vineyards of the plain and the Arrábida.", []),
]

data = {"countries": [], "regions": [r_lis, r_tejo, r_set],
        "appellations": [buc, col, car, ale, arr, obi, tv, lou, ea, lisboa_igp, tejo, tejo_igp, setu, palm, ps_igp], "sites": sites}
json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", OUT, len(sites), "sites")
