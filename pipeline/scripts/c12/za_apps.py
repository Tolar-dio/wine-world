"""South Africa Wine of Origin units (February 2026 list). Fields: name, subcat, region(profile name), parent district/unit, styles, dom, grapes, summary, terroir, producers, nerd, contains, extra match, point."""
A = []


def g(name, sub, region, parent, styles, dom, grapes, summary, terroir="", producers=(), nerd="", contains=(), match=(), pt=None):
    A.append(dict(name=name, sub=sub, region=region, parent=parent, styles=styles, dom=dom, grapes=grapes, summary=summary,
                  terroir=terroir, producers=list(producers), nerd=nerd, contains=list(contains), match=list(match), pt=pt))


R, W = ["red"], ["white"]
RW = ["red", "white"]
RWS = ["red", "white", "sparkling"]

# Geographical units and overarching units
g("Greater Cape", "Overarching geographical unit", None, None, RWS + ["fortified", "sweet"], "white", "All Cape varieties",
  "An overarching unit created after a 2019 proposal that groups the Western Cape, Northern Cape and Eastern Cape geographical units, so that wines blended across provincial lines (for example Western Cape and Orange River fruit) can carry a Cape origin.", match=["Groter Kaap"], pt=(-33.5, 20.5))
g("Western Cape", "Geographical Unit", None, "Greater Cape", RWS + ["fortified", "sweet"], "white", "Chenin Blanc, Cabernet Sauvignon, Colombard, Shiraz, Sauvignon Blanc, Pinotage, Chardonnay",
  "The Western Cape geographical unit holds almost all of South Africa's wine grapes. 'WO Western Cape' on a label means a blend from two or more of its regions, and many large brands use it.", producers=["KWV", "Distell / Heineken brands", "Kleine Zalze"], match=["Wes-Kaap"])
g("Northern Cape", "Geographical Unit", "Northern Cape", "Greater Cape", RW + ["sweet"], "white", "Colombard, Chenin Blanc, Muscat d'Alexandrie, Pinotage",
  "The Northern Cape geographical unit covers the irrigated vineyards of the Orange River and the high Karoo around Sutherland. Most fruit goes to large co-operative cellars.", match=["Noord-Kaap"])
g("Eastern Cape", "Geographical Unit", None, "Greater Cape", RW, "white", "Sauvignon Blanc, Chardonnay, Pinot Noir",
  "The Eastern Cape was designated a geographical unit in 2009. Its only ward is St Francis Bay, on the coast west of Port Elizabeth (Gqeberha).", match=["Oos-Kaap"])
g("KwaZulu-Natal", "Geographical Unit", None, None, RW, "red", "Shiraz, Cabernet Sauvignon, Sauvignon Blanc, Chardonnay",
  "KwaZulu-Natal, designated in 2005, stretches from Greytown to the Midlands at up to about 1,500 m. Its summer rainfall makes viticulture difficult; it contains the Lions River and Central Drakensberg districts.", match=["Kwazulu-Natal"])
g("Free State", "Geographical Unit", None, None, RW, "white", "Colombard, Chenin Blanc", "The Free State geographical unit has one ward, Rietrivier FS, on the Riet River near Jacobsdal.", match=["Vrystaat"])
g("Limpopo", "Geographical Unit", None, None, RW, "red", "", "A geographical unit covering South Africa's northernmost province; it has no regions, districts or wards on the February 2026 list.")
g("North West", "Geographical Unit", None, None, RW, "red", "", "A geographical unit covering the North West province; it has no regions, districts or wards on the February 2026 list.", pt=(-26.4, 25.8))
g("Cape Coast", "Overarching region", "Coastal Region", "Western Cape", RWS, "red", "Cabernet Sauvignon, Chenin Blanc, Shiraz, Sauvignon Blanc, Pinot Noir",
  "An overarching region that combines the Coastal Region and Cape South Coast, allowing blends of, say, Stellenbosch and Elgin fruit to name a coastal origin.", match=["Kaap Kus"])

# Regions
g("Coastal Region", "Region", "Coastal Region", "Cape Coast", RWS + ["fortified", "sweet"], "red", "Cabernet Sauvignon, Chenin Blanc, Shiraz, Pinotage, Merlot, Sauvignon Blanc",
  "The Coastal Region includes South Africa's best-known districts: Cape Town, Stellenbosch, Paarl, Franschhoek, Wellington, Swartland, Tulbagh, Darling and Lutzville Valley. 'WO Coastal Region' usually indicates a blend across several of them.", match=["Kusstreek"])
g("Cape South Coast", "Region", "Cape South Coast", "Cape Coast", RWS, "white", "Sauvignon Blanc, Chardonnay, Pinot Noir, Shiraz",
  "The cool southern coastal region from Elgin to Plettenberg Bay, home to Walker Bay and its Hemel-en-Aarde wards, Elim and Elgin.", match=["Kaap Suidkus"])
g("Breede River Valley", "Region", "Breede River Valley", "Western Cape", RWS + ["fortified"], "white", "Chenin Blanc, Colombard, Chardonnay, Shiraz",
  "The inland region of the Breedekloof, Worcester and Robertson districts, warm and irrigated, the source of a large share of South Africa's wine and brandy.", match=["Breërivier Vallei", "Breerivier Vallei"])
g("Klein Karoo", "Region", "Klein Karoo", "Western Cape", RW + ["fortified", "sweet"], "fortified", "Muscat, Touriga Nacional, Chenin Blanc, Colombard",
  "The semi-arid valley along Route 62 from Montagu to the Langkloof, known for Calitzdorp's fortified wines, Muscadel and potstill brandy.")
g("Olifants River", "Region", "Olifants River", "Western Cape", RW, "white", "Chenin Blanc, Colombard, Grenache, Pinotage",
  "The region along the Olifants River from Citrusdal to Lutzville, with old mountain vineyards at Piekenierskloof and large irrigated cellars at Vredendal.", match=["Olifantsrivier"])
g("Karoo-Hoogland", "Region", "Northern Cape", "Northern Cape", RW, "red", "Shiraz, Pinot Noir, Chardonnay",
  "A high-plateau region in the Northern Cape whose only district is Sutherland-Karoo, around one of South Africa's coldest towns.")
g("Cape West Coast", "Subregion", "Cape West Coast", "Coastal Region", RW, "white", "Sauvignon Blanc, Chenin Blanc, Pinotage",
  "A subregion grouping the Atlantic-facing Darling and Lutzville Valley districts, St Helena Bay and the Bamboes Bay and Lamberts Bay wards, all cooled by the Benguela current.", match=["Kaap Weskus"])

# Cape Town district
g("Cape Town", "District", "Coastal Region", "Coastal Region", RWS + ["sweet"], "white", "Sauvignon Blanc, Chardonnay, Cabernet Sauvignon, Merlot, Muscat de Frontignan",
  "A district named after the city, combining the wards of Constantia, Durbanville, Hout Bay and Philadelphia and the vineyards of the Cape Peninsula, including Cape Point. At its farthest point it is 36 km from the city centre. It replaced the former Cape Point and Tygerberg districts, which no longer appear on the February 2026 list.",
  terroir="Sea on three sides, Table Mountain sandstone and granite, and the cooling south-easter; one of the coolest districts in South Africa.", producers=["Groot Constantia", "Klein Constantia", "Cape Point Vineyards", "Diemersdal"], match=["Kaapstad"], contains=["Constantia", "Durbanville", "Hout Bay", "Philadelphia"])
g("Constantia", "Ward", "Coastal Region", "Cape Town", ["white", "red", "sweet", "sparkling"], "white", "Sauvignon Blanc, Sémillon, Chardonnay, Cabernet Sauvignon, Merlot, Muscat de Frontignan",
  "Constantia is the cradle of Cape wine and the source of one of history's most famous sweet wines. Simon van der Stel was granted the land in 1685 and planted a large vineyard on the eastern slopes of the Constantiaberg; after his death in 1712 the estate was split into Groot Constantia, Klein Constantia and Bergvliet. From 1778 Hendrik Cloete made an unfortified wine from late-picked Muscat de Frontignan (with some Pontac, Muscadel and Chenin) that European kings, Napoleon on St Helena, Jane Austen's characters and Baudelaire's verse all celebrated. Phylloxera and the end of imperial preference ended it in the late nineteenth century; Klein Constantia revived it as Vin de Constance in 1986, followed by Groot Constantia (Grand Constance) and Buitenverwachting.\n\nToday the ward's handful of estates, now surrounded by expensive suburbs, make some of South Africa's best Sauvignon Blanc and Sauvignon-Sémillon blends, aided by sea air from False Bay a few kilometres away. The ward also carries a modern history: under the Group Areas Act, Constantia was declared a white area in 1961 and families of colour were forcibly removed; the Solomon family won back its land through a restitution claim in 2010.",
  terroir="East- and south-east-facing slopes of the Constantiaberg on decomposed granite and sandstone, about 1,000 mm of rain a year, and a mean February temperature of about 20.6 degrees C; cool sea breezes from False Bay.",
  producers=["Klein Constantia", "Groot Constantia", "Buitenverwachting", "Steenberg", "Constantia Glen", "Eagles' Nest", "Constantia Uitsig", "Beau Constantia", "Silvermist"],
  nerd="Klein Constantia's Vin de Constance bottle reproduces a squat, hand-blown 18th-century design, and it is aged about four years before release.")
g("Durbanville", "Ward", "Coastal Region", "Cape Town", RW, "white", "Sauvignon Blanc, Merlot, Cabernet Sauvignon, Chardonnay, Pinotage",
  "Rolling wheat-and-vine country on the northern edge of Cape Town, whose hills catch Atlantic breezes and night-time mist. Durbanville made its name for pungent, green-fruited Sauvignon Blanc and soft Merlot, and many farms (Diemersdal, Meerendal, Altydgedacht) have been in the same families for generations.",
  terroir="Deep, red, decomposed granite and shale soils that hold water, allowing dry farming; vineyards up to about 380 m.", producers=["Diemersdal", "Durbanville Hills", "Nitida", "Altydgedacht", "Meerendal", "De Grendel"])
g("Philadelphia", "Ward", "Coastal Region", "Cape Town", RW, "red", "Cabernet Sauvignon, Merlot, Sauvignon Blanc",
  "A small ward north of Durbanville around the village of Philadelphia, on hills up to about 260 m within sight of the Atlantic, known for structured Bordeaux-style reds.",
  terroir="Weathered shale and granite; cool Atlantic influence with large day-night differences.", producers=["Capaia", "Havana Hills"])
g("Hout Bay", "Ward", "Coastal Region", "Cape Town", RWS, "white", "Sauvignon Blanc, Chardonnay, Pinot Noir",
  "One of South Africa's smallest wards, in the steep valley behind Hout Bay harbour on the Cape Peninsula, with a few hectares of vines.", terroir="Steep granite and sandstone slopes facing the Atlantic.", producers=["Hout Bay Vineyards"], match=["Houtbaai"])

# Stellenbosch
g("Stellenbosch", "District", "Coastal Region", "Coastal Region", RWS + ["sweet"], "red", "Cabernet Sauvignon, Shiraz, Merlot, Pinotage, Chenin Blanc, Sauvignon Blanc, Chardonnay, Cabernet Franc",
  "Stellenbosch is South Africa's most famous wine district and its intellectual centre. The town, founded by Simon van der Stel in 1679 and shaded by oaks, has the country's only university degree in viticulture and oenology, the Elsenburg agricultural college and the Nietvoorbij research institute. More than 200 producers farm the district's slopes, from historic estates to modern wineries.\n\nIts strength is red wine, above all Cabernet Sauvignon and Bordeaux-style blends, which gain structure and freshness from the district's granite mountains and the cooling south-easter off False Bay. Meerlust Rubicon (first made in 1980), Kanonkop Paul Sauer, Vergelegen V and Rust en Vrede's estate blend are classics, and Kanonkop's Pinotage, from vines planted in the 1950s, is the reference for the country's own grape. Old-vine Chenin Blanc from the Bottelary and Helderberg areas and Chardonnay from the higher slopes are equally serious.\n\nThe district is divided into eight wards: Banghoek, Bottelary, Devon Valley, Jonkershoek Valley, Papegaaiberg, Polkadraai Hills, Simonsberg-Stellenbosch and Vlottenburg. Much of the best-known land, including the Helderberg slopes around Somerset West (Vergelegen, Rust en Vrede, Waterford, Ernie Els), lies outside any ward and is labelled simply 'Stellenbosch'. The Stellenbosch Wine Route, founded in 1971, was South Africa's first.",
  terroir="Mountains on three sides (Simonsberg, Jonkershoek, Helderberg) and False Bay to the south; about 600 to 800 mm of rain in the valley, more on the mountains. Decomposed granite on the higher slopes, Table Mountain sandstone higher still, and Malmesbury shale and alluvium on the lower ground to the west.",
  producers=["Kanonkop", "Meerlust", "Rustenberg", "Vergelegen", "Rust en Vrede", "Thelema", "Tokara", "Warwick", "Delheim", "Jordan", "Waterford", "De Toren", "Ken Forrester", "Kleine Zalze", "Simonsig", "Reyneke", "Alheit (sources)", "Mvemve Raats", "Raats", "Keermont", "Le Riche"],
  nerd="Stellenbosch's oak-lined streets are a result of Van der Stel's order to plant oaks in the 1680s; the university's experimental farm at Welgevallen is where Perold bred Pinotage in 1925.",
  contains=["Banghoek", "Bottelary", "Devon Valley", "Jonkershoek Valley", "Papegaaiberg", "Polkadraai Hills", "Simonsberg-Stellenbosch", "Vlottenburg"])
g("Simonsberg-Stellenbosch", "Ward", "Coastal Region", "Stellenbosch", RW + ["sparkling"], "red", "Cabernet Sauvignon, Pinotage, Merlot, Shiraz, Chardonnay, Sauvignon Blanc",
  "The southern and western slopes of the granite Simonsberg (1,390 m) north-east of Stellenbosch, one of the most prestigious wards in South Africa and among the first to be demarcated. Its well-drained, red decomposed-granite soils, altitude and afternoon sea breezes give structured, long-lived Cabernet and Bordeaux blends and the country's most famous Pinotage. Kanonkop, Rustenberg, Thelema, Tokara, Warwick, Delheim and Uitkyk are all here.",
  terroir="Decomposed granite (red Hutton and Clovelly soils) at about 150 to 500 m; south- and west-facing slopes catch the False Bay breeze.", producers=["Kanonkop", "Rustenberg", "Thelema", "Tokara", "Warwick", "Delheim", "Uitkyk", "Morgenhof", "Le Bonheur"],
  nerd="The official schedule of February 2026 misspells the ward as 'Simonsberg-Stellenbosh'.", match=["Simonsberg-Stellenbosh"])
g("Jonkershoek Valley", "Ward", "Coastal Region", "Stellenbosch", RW, "red", "Cabernet Sauvignon, Merlot, Syrah, Chardonnay",
  "A narrow, steep-sided valley running south-east from Stellenbosch town into the Jonkershoek mountains, one of the wettest and most enclosed parts of the district. Morning shade and late sun give long, slow ripening; Stark-Condé and Neil Ellis's Jonkershoek vineyards make fine, fresh Cabernet.",
  terroir="Decomposed granite and sandstone colluvium on steep slopes; about 1,000 mm or more of rain.", producers=["Stark-Condé", "Neil Ellis", "Lanzerac", "Oldenburg (nearby)"], match=["Jonkershoek Vallei"])
g("Banghoek", "Ward", "Coastal Region", "Stellenbosch", RW, "red", "Cabernet Sauvignon, Cabernet Franc, Merlot, Chardonnay",
  "A high mountain bowl at the top of the Helshoogte Pass between Stellenbosch and Franschhoek, surrounded by the Simonsberg, Jonkershoek and Groot Drakenstein ranges. Cooler and wetter than the valley below, it gives fresh, elegant Bordeaux varieties and Chardonnay.",
  terroir="Granite and sandstone soils at about 400 to 600 m; high rainfall.", producers=["Delaire Graff", "Oldenburg Vineyards", "Zorgvliet", "Thelema (Banghoek holdings)"])
g("Bottelary", "Ward", "Coastal Region", "Stellenbosch", RW, "red", "Pinotage, Chenin Blanc, Shiraz, Cabernet Sauvignon",
  "The Bottelary Hills north-west of Stellenbosch, a ridge of granite with views to Table Mountain, is old-vine Chenin and Pinotage country. Bellevue, in these hills, made the Pinotage that won the 1959 Cape Wine Show, and Kaapzicht, Hartenberg, Mooiplaas and Bellevue still farm old bush vines.",
  terroir="Decomposed granite on the upper slopes and shale lower down; open to Atlantic breezes from the west.", producers=["Kaapzicht", "Hartenberg", "Bellevue", "Mooiplaas", "Groenland"])
g("Devon Valley", "Ward", "Coastal Region", "Stellenbosch", RW, "red", "Merlot, Pinotage, Cabernet Sauvignon, Sauvignon Blanc",
  "A small, sheltered valley north-west of Stellenbosch town between the Bottelary Hills and Papegaaiberg, known for Merlot and Pinotage on granite and shale soils.",
  terroir="Granite-derived soils, sheltered from wind.", producers=["Clos Malverne", "Louisvale", "Meinert"], match=["Devon Vallei"])
g("Papegaaiberg", "Ward", "Coastal Region", "Stellenbosch", RW, "red", "Cabernet Sauvignon, Shiraz, Chenin Blanc",
  "A small hill just west of Stellenbosch town, the 'parrot mountain' where early settlers practised shooting at a wooden parrot. The Bergkelder, Distell's (now Heineken Beverages') maturation cellar, is tunnelled into its slopes.",
  terroir="Granite and shale on a low ridge.", producers=["Bergkelder"])
g("Polkadraai Hills", "Ward", "Coastal Region", "Stellenbosch", RW, "red", "Shiraz, Chenin Blanc, Cabernet Sauvignon, Sauvignon Blanc",
  "Hills west of Stellenbosch near the R310 and Polkadraai Road, open to cool breezes from both False Bay and the Atlantic. Johan Reyneke farms biodynamically here, and the ward's sandy granite soils give fresh, fragrant Syrah and Chenin.",
  terroir="Sandy, decomposed granite over clay at about 100 to 300 m.", producers=["Reyneke", "Stellenbosch Hills", "Mooiplaas (nearby)"], match=["Polkadraai Heuwels"])
g("Vlottenburg", "Ward", "Coastal Region", "Stellenbosch", RW, "red", "Cabernet Sauvignon, Merlot, Chenin Blanc, Sauvignon Blanc",
  "A ward south-west of Stellenbosch town around the Vlottenburg railway halt and the Eerste River, where cooling False Bay winds reach the vines in the afternoon.", terroir="Alluvial and shale-derived soils on gentle slopes.", producers=["Stellenbosch Hills (Vlottenburg cellar)", "Spier (nearby)"])

# Paarl, Franschhoek, Wellington
g("Paarl", "District", "Coastal Region", "Coastal Region", RWS + ["fortified"], "red", "Cabernet Sauvignon, Shiraz, Pinotage, Chenin Blanc, Chardonnay",
  "Paarl, named after the pearl-like granite domes of Paarl Mountain, lies north of Stellenbosch along the Berg River. It was the seat of the KWV from 1918, which made it the administrative capital of the industry for most of the twentieth century, and home to Nederburg, whose annual auction (from 1975) became the country's most important wine sale. The district is warmer than Stellenbosch and its Shiraz, Cabernet, Pinotage and Chenin are generous and ripe. Its wards are Simonsberg-Paarl, Voor-Paardeberg and Agter-Paarl.",
  terroir="Granite domes and slopes, with alluvial soils along the Berg River; the valley needs supplementary irrigation in hot summers while the eastern slopes hold water.",
  producers=["Nederburg", "KWV", "Fairview", "Glen Carlou", "Backsberg", "Avondale", "Rupert & Rothschild", "Plaisir de Merle"], contains=["Simonsberg-Paarl", "Voor-Paardeberg", "Agter-Paarl"])
g("Simonsberg-Paarl", "Ward", "Coastal Region", "Paarl", RW, "red", "Cabernet Sauvignon, Shiraz, Chardonnay, Merlot",
  "The north-eastern slopes of the Simonsberg facing Paarl, on decomposed granite. Glen Carlou, Plaisir de Merle, Backsberg and Rupert & Rothschild make Bordeaux blends and Chardonnay here.", terroir="Granite-derived soils on north- and east-facing slopes; warmer than the Stellenbosch side of the mountain.",
  producers=["Glen Carlou", "Plaisir de Merle", "Backsberg", "Rupert & Rothschild", "Noble Hill"])
g("Voor-Paardeberg", "Ward", "Coastal Region", "Paarl", RW, "red", "Shiraz, Chenin Blanc, Pinotage, Cinsault",
  "The southern and eastern side ('voor', in front of) the Paardeberg, the granite massif between Paarl and the Swartland. Old dry-land bush vines of Chenin, Cinsault and Shiraz supply many of the Cape's new-wave winemakers.",
  terroir="Decomposed granite over clay, dry farmed; warm and windy.", producers=["Scali", "Vondeling", "Seven Springs (sources)"], match=["Voor Paardeberg"])
g("Agter-Paarl", "Ward", "Coastal Region", "Paarl", RW, "red", "Shiraz, Pinotage, Chenin Blanc, Cabernet Sauvignon",
  "The country 'behind' (agter) Paarl Mountain to the west, towards the Swartland, where Fairview's Charles Back farms goats and vines and makes Rhône-style wines and cheese.", terroir="Granite-derived soils and shale on gentle slopes; warm and dry.", producers=["Fairview", "Spice Route (sources)"])
g("Franschhoek", "District", "Coastal Region", "Coastal Region", RWS, "white", "Sémillon, Chardonnay, Cabernet Sauvignon, Chenin Blanc, Pinot Noir",
  "Franschhoek, the 'French corner', is the valley where the VOC settled Huguenot refugees after 1688. It is enclosed on three sides by the Groot Drakenstein and Franschhoek mountains, with the Berg River rising at its head. The district holds some of South Africa's oldest vineyards, including Sémillon (and the rare Sémillon Gris) planted in the early twentieth century, and it is a centre of Cap Classique and of the Cape's restaurant culture. The Huguenot Monument (1948) stands at the head of the town.",
  terroir="Sandy alluvium on the valley floor and decomposed sandstone and granite on the slopes; enclosed, warmer by day and colder at night than Stellenbosch, with snow on the peaks in winter.",
  producers=["Boekenhoutskloof", "La Motte", "Chamonix", "Haute Cabrière", "Mont Rochelle", "Leeu Passant", "Boschendal (nearby)", "Graham Beck (historic cellar)"],
  nerd="Boekenhoutskloof's Sémillon comes from vines planted in 1902 and 1942, among the oldest Sémillon in the world.", match=["Franschhoek Valley", "Franschhoek Vallei"])
g("Wellington", "District", "Coastal Region", "Coastal Region", RW + ["sparkling"], "red", "Pinotage, Shiraz, Chenin Blanc, Cabernet Sauvignon",
  "A district north of Paarl at the foot of the Hawequa mountains, about 45 minutes from Cape Town. It supplies more than 85 percent of South Africa's vine cuttings from its nurseries, and its 30 or so producers range from historic estates to Diemersfontein, which created 'coffee Pinotage' in 2001. Its five wards (Blouvlei, Bovlei, Groenberg, Limietberg and Mid-Berg River) were added recently.",
  terroir="Alluvial terraces along the Berg River and granite and sandstone foothills; snow on the peaks in winter, cooler nights than the coast.", producers=["Diemersfontein", "Bosman Family Vineyards", "Mont du Toit", "Andreas"],
  contains=["Blouvlei", "Bovlei", "Groenberg", "Limietberg", "Mid-Berg River"])
for nm, txt in [("Blouvlei", "A ward of the Wellington district on the slopes and plain below the Hawequa mountains."),
                ("Bovlei", "A ward of Wellington in the upper Bovlei valley towards the Bainskloof Pass, home of the historic Bovlei co-operative cellar (1907)."),
                ("Groenberg", "A ward around the Groenberg hill north of Wellington town, with granite soils."),
                ("Limietberg", "A ward on the lower slopes of the Limietberg (Hawequa) range east of Wellington, where mountain foothills create cooler mesoclimates."),
                ("Mid-Berg River", "A ward on the alluvial terraces of the middle Berg River between Wellington and Paarl.")]:
    g(nm, "Ward", "Coastal Region", "Wellington", RW, "red", "Pinotage, Shiraz, Chenin Blanc, Cabernet Sauvignon",
      txt + " It is one of five Wellington wards on the February 2026 Wine of Origin list; most producers still label their wine WO Wellington.", match=(["Mid-Bergrivier"] if nm == "Mid-Berg River" else []))

# Swartland
g("Swartland", "District", "Coastal Region", "Coastal Region", RW + ["fortified", "orange"], "red", "Chenin Blanc, Shiraz, Grenache, Cinsault, Pinotage, Mourvèdre, Palomino",
  "The Swartland, the 'black land', takes its name from the renosterbos (rhino bush) that once darkened its rolling wheatfields north of Cape Town. For most of its history it grew grain and supplied big co-operatives with high-yielding grapes. That changed when Charles Back of Fairview and Spice Route began buying land here in the late 1990s and a young winemaker, Eben Sadie, found old, dry-farmed bush vines of Chenin Blanc, Grenache, Cinsault and Syrah on the Paardeberg. His Columella (2000) and Palladius (2002) showed what they could do.\n\nA generation followed: Chris and Andrea Mullineux, Adi Badenhorst at Kalmoesfontein, Callie Louw at Porseleinberg, Craig Hawkins (Testalonga), Lammershoek, David and Nadia Sadie, Donovan Rall. Their Swartland Revolution festival (2010 to 2015) and the Swartland Independent Producers association, which sets rules on natural winemaking and regional sourcing, made the district shorthand for South Africa's new wave: whole-bunch Syrah, old-vine Chenin blends aged in old foudres and concrete, and skin-contact whites. The district also has eight wards, from the Paardeberg granite to the schist of the Riebeek and Porseleinberg slopes.",
  terroir="Warm and dry (400 to 600 mm of rain), with mostly dry-farmed bush vines. Soils include decomposed granite (Paardeberg), Malmesbury shale and schist (Kasteelberg, Porseleinberg) and iron-rich koffieklip.", producers=["Sadie Family", "Mullineux", "A.A. Badenhorst", "Porseleinberg", "Lammershoek", "David & Nadia", "Testalonga", "Rall", "Spice Route", "Swartland Winery", "Kloovenburg"],
  nerd="Sadie's 'Old Vineyard Series' bottles single old vineyards from across the Cape, each label naming the site, such as Skerpioen, Mev. Kirsten and 'T Voetpad.",
  contains=["Malmesbury", "Paardeberg/Perdeberg", "Paardeberg South", "Piket-Bo-Berg", "Porseleinberg", "Riebeekberg", "Riebeeksrivier", "St Helena Bay"])
g("Paardeberg/Perdeberg", "Ward", "Coastal Region", "Swartland", RW, "white", "Chenin Blanc, Shiraz, Grenache, Cinsault, Mourvèdre",
  "The granite massif of the Paardeberg (Perdeberg in Afrikaans), on the border of the Swartland and Paarl, is the spiritual home of the Swartland revival. Eben Sadie's farm and cellar, A.A. Badenhorst's Kalmoesfontein and many old Chenin and Cinsault vineyards are here. Its decomposed granite holds winter rain, so old bush vines survive without irrigation.",
  terroir="Decomposed granite over clay on rounded hills; warm, dry and windy.", producers=["Sadie Family", "A.A. Badenhorst", "Perdeberg Wines", "Lammershoek (nearby)"], match=["Paardeberg", "Perdeberg"])
g("Paardeberg South", "Ward", "Coastal Region", "Swartland", RW, "white", "Chenin Blanc, Shiraz, Pinotage", "The southern foothills of the Paardeberg, separated as their own ward, with granite soils similar to the main Paardeberg ward.", match=["Paardeberg-Suid", "Perdeberg-Suid"])
g("Piket-Bo-Berg", "Ward", "Coastal Region", "Swartland", RW, "white", "Chenin Blanc, Sauvignon Blanc, Shiraz",
  "A high plateau on top of the Piketberg mountain, north of the Swartland at about 600 to 700 m, cooler than the valleys below; the WOSA text calls it Piketberg-Bo-Berg.", match=["Piketberg-Bo-Berg"])
g("Porseleinberg", "Ward", "Coastal Region", "Swartland", R, "red", "Syrah",
  "A ward named after the 'porcelain mountain' between Riebeek-Kasteel and the Berg River, whose blue-grey schist soils Boekenhoutskloof chose for its Porseleinberg Syrah, farmed organically by Callie Louw since the first vintage in 2010.", terroir="Malmesbury schist with very little topsoil; warm and dry.", producers=["Porseleinberg (Boekenhoutskloof)"])
g("Riebeekberg", "Ward", "Coastal Region", "Swartland", RW, "red", "Shiraz, Chenin Blanc, Grenache, Mourvèdre",
  "The slopes of the Kasteelberg around the villages of Riebeek-Kasteel and Riebeek-West, where the Mullineuxs farm their Roundstone vineyard on schist and iron-rich soils.", terroir="Schist, shale and koffieklip (iron-rich ferricrete).", producers=["Mullineux", "Kloovenburg", "Riebeek Cellars"])
g("Riebeeksrivier", "Ward", "Coastal Region", "Swartland", RW, "red", "Shiraz, Chenin Blanc", "A newer ward along the Riebeeks River valley below the Kasteelberg, on shale and alluvial soils.")
g("Malmesbury", "Ward", "Coastal Region", "Swartland", RW, "red", "Pinotage, Shiraz, Chenin Blanc", "The ward around Malmesbury, the Swartland's main town, among wheatfields on Malmesbury shale.", producers=["Swartland Winery"])
g("St Helena Bay", "Ward", "Cape West Coast", "Swartland", W, "white", "Sauvignon Blanc, Chenin Blanc",
  "A coastal ward on St Helena Bay on the Atlantic, the fishing coast north of Saldanha, now grouped in the Cape West Coast subregion though listed under the Swartland district.", terroir="Sandy soils, cold Benguela fog and wind.", match=["St Helenabaai"])

# Tulbagh, Darling, Lutzville
g("Tulbagh", "District", "Coastal Region", "Coastal Region", RWS, "red", "Shiraz, Chenin Blanc, Mourvèdre, Pinotage",
  "A horseshoe-shaped valley enclosed by the Groot Winterhoek, Witzenberg and Obiekwaberg mountains, about 90 minutes north of Cape Town. Cold air pools on the valley floor at night (a 'cold trap'), giving large day-night temperature swings. Tulbagh's Church Street has 32 national monuments, many restored after the 1969 earthquake. The valley is known for Shiraz and Rhône blends and for Cap Classique pioneer Krone (Twee Jonge Gezellen).",
  terroir="A former lake basin with varied alluvial and sandstone soils.", producers=["Saronsberg", "Krone (Twee Jonge Gezellen)", "Waverley Hills", "Rijk's", "Fable Mountain", "Montpellier"])
g("Darling", "District", "Cape West Coast", "Cape West Coast", RW, "white", "Sauvignon Blanc, Shiraz, Pinotage, Cabernet Sauvignon",
  "Darling, an hour north of Cape Town on the west coast, is famous for spring wild flowers and for cool Sauvignon Blanc. Its Groenekloof ward is one of the closest in South Africa to the cold Atlantic.", terroir="Decomposed granite hills catching Atlantic fog and wind.", producers=["Groote Post", "Darling Cellars", "Ormonde", "Cloof"], contains=["Groenekloof"])
g("Groenekloof", "Ward", "Cape West Coast", "Darling", RW, "white", "Sauvignon Blanc, Pinot Noir, Shiraz",
  "The Darling ward nearest the Atlantic, whose Sauvignon Blanc, cooled by sea breezes and fog, spearheaded the area's development. Groote Post's Peter Pentz farms here.", terroir="Granite-derived soils on hills a few kilometres from the sea.", producers=["Groote Post", "Neil Ellis (Groenekloof Sauvignon)"])
g("Lutzville Valley", "District", "Cape West Coast", "Cape West Coast", RW, "white", "Chenin Blanc, Sauvignon Blanc, Colombard", "A district near the mouth of the Olifants River with large irrigated vineyards, including the Lutzville co-operative.", producers=["Lutzville Vineyards"], match=["Lutzville Vallei"], contains=["Koekenaap"])
g("Koekenaap", "Ward", "Cape West Coast", "Lutzville Valley", RW, "white", "Sauvignon Blanc, Chenin Blanc", "A cool, sea-influenced ward close to the Atlantic in the Lutzville Valley, where grapes ripen slowly in coastal fog.")
g("Bamboes Bay", "Ward", "Cape West Coast", "Cape West Coast", W, "white", "Sauvignon Blanc",
  "One of South Africa's smallest wards, on the Atlantic coast north of Lamberts Bay, where Fryer's Cove's vineyards lie a few hundred metres from the ocean. Its Sauvignon Blanc is lean and saline.", terroir="Sandy and limestone soils, cold Benguela fog.", producers=["Fryer's Cove"], match=["Bamboesbaai"])
g("Lamberts Bay", "Ward", "Cape West Coast", "Cape West Coast", W, "white", "Sauvignon Blanc", "A coastal ward around the fishing town of Lamberts Bay, cooled by the Benguela current.", match=["Lambertsbaai"])

# Cape South Coast
g("Elgin", "District", "Cape South Coast", "Cape South Coast", RWS, "white", "Sauvignon Blanc, Chardonnay, Pinot Noir, Riesling, Shiraz",
  "Elgin is a high basin about an hour east of Cape Town, ringed by the Hottentots Holland mountains, which grew most of South Africa's apples before its farmers began planting vines in the late 1980s. Its altitude (200 to 800 m), cloud and proximity to the sea make it one of the coolest districts in South Africa, and its Chardonnay, Sauvignon Blanc and Pinot Noir are taut and fine. Paul Cluver, Oak Valley, Iona, Richard Kershaw and Shannon lead.",
  terroir="Table Mountain sandstone and Bokkeveld shale; cool summers, about 1,000 mm of rain.", producers=["Paul Cluver", "Oak Valley", "Iona", "Richard Kershaw", "Shannon", "Almenkerk", "Elgin Vintners"])
g("Walker Bay", "District", "Cape South Coast", "Cape South Coast", RW + ["sparkling"], "red", "Pinot Noir, Chardonnay, Sauvignon Blanc, Pinotage, Shiraz",
  "The district around the whale-watching town of Hermanus, best known for the Hemel-en-Aarde ('heaven and earth') valley, where Tim Hamilton Russell planted Pinot Noir and Chardonnay in 1975 and made the Cape's first serious Burgundy-style wines. Walker Bay now has seven wards: Hemel-en-Aarde Valley, Upper Hemel-en-Aarde Valley, Hemel-en-Aarde Ridge, Bot River, Stanford Foothills, Springfontein Rim and Sunday's Glen. Its Pinotage is also highly regarded.",
  terroir="Weathered Bokkeveld shale and decomposed granite; strong maritime influence and wind from Walker Bay.", producers=["Hamilton Russell", "Bouchard Finlayson", "Newton Johnson", "Creation", "Ataraxia", "Southern Right", "Storm", "Restless River", "Crystallum", "Alheit"],
  contains=["Hemel-en-Aarde Valley", "Upper Hemel-en-Aarde Valley", "Hemel-en-Aarde Ridge", "Bot River", "Stanford Foothills", "Springfontein Rim", "Sunday's Glen"])
g("Hemel-en-Aarde Valley", "Ward", "Cape South Coast", "Walker Bay", RW, "red", "Pinot Noir, Chardonnay, Pinotage, Sauvignon Blanc",
  "The lowest of the three Hemel-en-Aarde wards, closest to the sea at Hermanus. Hamilton Russell Vineyards (1975) and Bouchard Finlayson (1989, a venture between Peter Finlayson and Burgundy's Paul Bouchard) established South African Pinot Noir and Chardonnay here; the clay-rich shale soils give wines of structure and minerality.",
  terroir="Bokkeveld shale with high clay content, stony; cool sea breezes, about 750 mm of rain.", producers=["Hamilton Russell", "Bouchard Finlayson", "Southern Right", "Whalehaven"], match=["Hemel-en-Aarde Vallei"])
g("Upper Hemel-en-Aarde Valley", "Ward", "Cape South Coast", "Walker Bay", RW, "red", "Pinot Noir, Chardonnay, Sauvignon Blanc, Syrah",
  "The middle section of the Hemel-en-Aarde, further inland and slightly warmer, on lighter granite-derived and shale soils. Newton Johnson, La Vierge, Restless River and Storm make some of the country's most elegant Pinot Noir.",
  terroir="Decomposed granite and shale; more sheltered than the lower valley.", producers=["Newton Johnson", "Restless River", "Storm", "La Vierge", "Sumaridge"], match=["Bo Hemel-en-Aarde Vallei"])
g("Hemel-en-Aarde Ridge", "Ward", "Cape South Coast", "Walker Bay", RW, "red", "Pinot Noir, Chardonnay, Syrah",
  "The highest and furthest inland of the three Hemel-en-Aarde wards, at the top of the valley around 300 m and above, with cooler nights. Creation and Domaine des Dieux are here, and Chris and Suzaan Alheit's Hemelrand farm is nearby.", terroir="Shale and sandstone with some granite; cool and windy.", producers=["Creation", "Domaine des Dieux", "Ataraxia"])
g("Bot River", "Ward", "Cape South Coast", "Walker Bay", RW, "red", "Chenin Blanc, Pinotage, Shiraz, Sauvignon Blanc",
  "The gateway to Walker Bay, from the Bot River lagoon into the foothills of the Groenlandberg and Babylonstoren ranges, bordering the Kogelberg Biosphere. Beaumont, in the village, has old Chenin and Pinotage; Gabrielskloof, Wildekrans and Barton are nearby. Afternoon winds blow up the valley off the sea.", terroir="Mainly Bokkeveld shale (Glen Rosa and Klapmuts soils) and Table Mountain sandstone.", producers=["Beaumont", "Gabrielskloof", "Wildekrans", "Barton", "Luddite"], match=["Botrivier"])
g("Stanford Foothills", "Ward", "Cape South Coast", "Walker Bay", RW, "white", "Sauvignon Blanc, Chenin Blanc, Pinot Noir", "A ward on the foothills of the Kleinrivier mountains above the village of Stanford, east of the Hemel-en-Aarde.", match=["Stanford Voetheuwels"])
g("Springfontein Rim", "Ward", "Cape South Coast", "Walker Bay", RW, "red", "Chenin Blanc, Pinotage, Pinot Noir", "A small coastal ward near Stanford around the Springfontein estate, close to the sea on limestone-influenced soils.", producers=["Springfontein"])
g("Sunday's Glen", "Ward", "Cape South Coast", "Walker Bay", RW, "red", "Pinot Noir, Sauvignon Blanc", "The easternmost Walker Bay ward, beyond Stanford, a cool coastal site.", match=["Sondagskloof", "Sundays Glen"])
g("Cape Agulhas", "District", "Cape South Coast", "Cape South Coast", RW, "white", "Sauvignon Blanc, Sémillon, Shiraz", "The district at Africa's southern tip; almost all its vines are in the Elim ward.", match=["Kaap Agulhas"], contains=["Elim"])
g("Elim", "Ward", "Cape South Coast", "Cape Agulhas", RW, "white", "Sauvignon Blanc, Sémillon, Shiraz, Pinot Noir",
  "Elim's vineyards lie near Cape Agulhas, Africa's southernmost point, around the Moravian mission village of Elim, founded in 1824 and a national monument. Strong summer winds and a very cool ripening season give pungent, mineral Sauvignon Blanc and Sémillon and peppery Shiraz.", terroir="Ferricrete, shale and sandstone soils; constant wind off the sea.", producers=["Strandveld", "The Berrio", "Black Oystercatcher", "Trizanne Signature (sources)"])
g("Overberg", "District", "Cape South Coast", "Cape South Coast", RW, "white", "Chardonnay, Sauvignon Blanc, Pinot Noir", "A broad district of wheatfields and mountains east of Elgin, with wards at Elandskloof/Kaaimansgat, Greyton, Klein River, Shaw's Mountain and Theewater.", contains=["Elandskloof/Kaaimansgat", "Greyton", "Klein River", "Shaw's Mountain", "Theewater"])
g("Elandskloof/Kaaimansgat", "Ward", "Cape South Coast", "Overberg", W, "white", "Chardonnay, Pinot Noir", "A high, cool ward in the mountains near Villiersdorp. Bouchard Finlayson's Kaaimansgat ('crocodile's lair') Chardonnay comes from vineyards here at around 700 m.", match=["Elandskloof", "Kaaimansgat"])
g("Greyton", "Ward", "Cape South Coast", "Overberg", RW, "white", "Chardonnay, Pinot Noir, Syrah", "A ward around the village of Greyton below the Riviersonderend mountains, where Samantha O'Keefe's Lismore Estate makes Chardonnay and Syrah.", producers=["Lismore"])
g("Klein River", "Ward", "Cape South Coast", "Overberg", RW, "red", "Sauvignon Blanc, Shiraz, Pinotage", "A ward near Stanford along the Klein River, where award-winning wines (Raka) have emerged.", producers=["Raka"], match=["Kleinrivier"])
g("Shaw's Mountain", "Ward", "Cape South Coast", "Overberg", RW, "white", "Sauvignon Blanc, Chardonnay", "A recently added Overberg ward on the mountain slopes between Caledon and the Hemel-en-Aarde.")
g("Theewater", "Ward", "Cape South Coast", "Overberg", RW, "white", "Sauvignon Blanc, Chardonnay", "A ward near the Theewaterskloof Dam and Villiersdorp, at the edge of the Overberg's mountains.")
g("Swellendam", "District", "Cape South Coast", "Cape South Coast", RW, "red", "Shiraz, Chenin Blanc, Sauvignon Blanc", "A district around the historic town of Swellendam (1743), the third-oldest in South Africa, with wards Buffeljags, Malgas and Stormsvlei.", contains=["Buffeljags", "Malgas", "Stormsvlei"])
g("Malgas", "Ward", "Cape South Coast", "Swellendam", RW, "red", "Syrah, Mourvèdre, Touriga Nacional, Chenin Blanc",
  "A pioneering ward on a stony plateau 80 km east of Cape Agulhas, about 70 m above the Breede River. David and Rita Trafford's Sijnn planted drought-tolerant Mediterranean varieties here; rainfall is only about 350 mm, moderated by sea breezes from the coast 15 km away.", terroir="Complex stony soils of shale and quartzite gravel.", producers=["Sijnn"])
g("Buffeljags", "Ward", "Cape South Coast", "Swellendam", RW, "white", "Chenin Blanc, Colombard", "A ward around the Buffeljags River and dam east of Swellendam.")
g("Stormsvlei", "Ward", "Cape South Coast", "Swellendam", RW, "red", "Shiraz, Chenin Blanc", "A ward west of Swellendam near the Riviersonderend, on the road between Robertson and the coast.")
g("Plettenberg Bay", "District", "Cape South Coast", "Cape South Coast", W + ["sparkling"], "white", "Sauvignon Blanc, Chardonnay, Pinot Noir",
  "The newest and furthest-east district on the Cape South Coast, in mountainous terrain about 20 km east of Plettenberg Bay. The first vines were planted in 2000 (Bramon, known for Cap Classique). Cool coastal climate and high-carbon soils suit Sauvignon Blanc and sparkling.", producers=["Bramon", "Packwood", "Kay & Monty"], match=["Plettenbergbaai"])
g("Still Bay", "District", "Cape South Coast", "Cape South Coast", RW, "white", "Sauvignon Blanc, Pinot Noir", "A coastal district around Stilbaai on the Garden Route, with the Goukou River Valley ward.", match=["Stilbaai"], contains=["Goukou River Valley"])
g("Goukou River Valley", "Ward", "Cape South Coast", "Still Bay", RW, "white", "Sauvignon Blanc", "A ward along the Goukou River inland from Stilbaai.")
g("Lower Duivenhoks River", "District", "Cape South Coast", "Cape South Coast", RW, "white", "Sauvignon Blanc", "A small district along the lower Duivenhoks River between Heidelberg and the coast at Witsand.", match=["Benede Duivenhoksrivier"])
g("Herbertsdale", "Ward", "Cape South Coast", "Cape South Coast", RW, "white", "Sauvignon Blanc", "A stand-alone ward near the village of Herbertsdale inland from Mossel Bay.")
g("Napier", "Ward", "Cape South Coast", "Cape South Coast", RW, "red", "Shiraz, Sauvignon Blanc", "A stand-alone ward around the Overberg village of Napier, between Bredasdorp and Caledon.")

# Breede River Valley
g("Breedekloof", "District", "Breede River Valley", "Breede River Valley", RW, "white", "Chenin Blanc, Colombard, Pinotage, Shiraz",
  "A district around Rawsonville in the upper Breede River and its tributaries, below the Du Toitskloof mountains. Its large co-operatives once sent most fruit to distillers; now cellars such as Badsberg, Slanghoek and Goudini bottle good-value Chenin, and its old vineyards are sought by Stellenbosch winemakers.", terroir="Alluvial valley soils on a bed of river stones; varied mesoclimates in side valleys.", producers=["Badsberg", "Slanghoek", "Goudini", "Merwida", "Opstal"], contains=["Goudini", "Slanghoek"])
g("Goudini", "Ward", "Breede River Valley", "Breedekloof", RW, "white", "Chenin Blanc, Colombard", "A ward around Rawsonville in the Breedekloof.", producers=["Goudini Wines"])
g("Slanghoek", "Ward", "Breede River Valley", "Breedekloof", RW, "white", "Chenin Blanc, Muscat", "The Slanghoek valley north-west of Rawsonville, under the Slanghoek mountains.", producers=["Slanghoek"])
g("Worcester", "District", "Breede River Valley", "Breede River Valley", RW + ["fortified"], "white", "Chenin Blanc, Colombard, Shiraz, Muscadel",
  "The Worcester district is the brandy capital of South Africa, with the largest distillery of its kind in the Southern Hemisphere, and a major source of bulk and branded wine. It has seven wards: Hex River Valley, Keeromsberg, Moordkuil, Nuy, Rooikrans, Scherpenheuvel and Stettyn.", producers=["Nuy", "Stettyn", "Alvi's Drift"], contains=["Hex River Valley", "Keeromsberg", "Moordkuil", "Nuy", "Rooikrans", "Scherpenheuvel", "Stettyn"])
for nm, txt, m in [("Hex River Valley", "The Hex River Valley around De Doorns, South Africa's largest table-grape area, also grows wine grapes.", ["Hexrivier Vallei"]),
                   ("Keeromsberg", "A ward named after the Keeromsberg mountain north of Worcester.", []),
                   ("Moordkuil", "A ward of the Worcester district.", []),
                   ("Nuy", "A small valley east of Worcester whose Nuy cellar is famous for fortified Muscadel.", []),
                   ("Rooikrans", "A ward of the Worcester district.", []),
                   ("Scherpenheuvel", "A ward on the road between Worcester and Robertson near the Brandvlei Dam.", []),
                   ("Stettyn", "A ward in the Stettynskloof west of Worcester, home of the Stettyn cellar.", [])]:
    g(nm, "Ward", "Breede River Valley", "Worcester", RW, "white", "Chenin Blanc, Colombard, Shiraz", txt + " It is one of seven wards in the Worcester district, a warm, irrigated area whose fruit goes largely to wine and brandy.", match=m)
g("Robertson", "District", "Breede River Valley", "Breede River Valley", RWS + ["fortified"], "white", "Chardonnay, Sauvignon Blanc, Colombard, Shiraz, Cabernet Sauvignon, Muscadel",
  "The 'valley of vines and roses' along the Breede River is the only part of the Cape with significant lime-rich soils, which also suit its many racehorse studs. Hot summers are tempered by south-easterly winds that bring moist air up the valley. Danie de Wet of De Wetshof pioneered Chardonnay here in the 1970s, and Graham Beck's Madeba farm built South Africa's leading Cap Classique house in the 1990s. The district has 14 wards.",
  terroir="Calcareous soils over limestone along the Breede, with alluvium; about 400 mm of rain, irrigation needed.", producers=["Graham Beck", "De Wetshof", "Springfield", "Bon Courage", "Van Loveren", "Robertson Winery", "Rietvallei"],
  contains=["Agterkliphoogte", "Ashton", "Boesmansrivier", "Bonnievale", "Eilandia", "Goedemoed", "Goree", "Goudmyn", "Hoopsrivier", "Klaasvoogds", "Le Chasseur", "McGregor", "Vinkrivier", "Zandrivier"])
for nm, txt in [("Agterkliphoogte", "A ward in the Agterkliphoogte valley near Robertson."), ("Ashton", "A ward around the town of Ashton at the foot of the Langeberg."),
                ("Boesmansrivier", "A ward along the Boesmans River near Bonnievale."), ("Bonnievale", "A ward around Bonnievale on the Breede River, known for dairy and wine co-operatives."),
                ("Eilandia", "A ward on low-lying land along the Breede River between Robertson and Ashton."), ("Goedemoed", "A ward of the Robertson district."),
                ("Goree", "A ward west of Robertson town."), ("Goudmyn", "A ward of the Robertson district."), ("Hoopsrivier", "A ward of the Robertson district."),
                ("Klaasvoogds", "A ward in the foothills of the Langeberg north-east of Robertson."), ("Le Chasseur", "A ward of the Robertson district north of the town."),
                ("McGregor", "A ward around the village of McGregor, south of Robertson below the Riviersonderend mountains, cooler and drier than the valley floor."),
                ("Vinkrivier", "A ward along the Vink River near McGregor."), ("Zandrivier", "A ward of the Robertson district.")]:
    g(nm, "Ward", "Breede River Valley", "Robertson", RW, "white", "Chardonnay, Colombard, Sauvignon Blanc, Shiraz, Cabernet Sauvignon", txt + " Robertson's wards share its lime-rich soils and warm, dry, wind-cooled climate.")

# Klein Karoo
g("Calitzdorp", "District", "Klein Karoo", "Klein Karoo", ["fortified", "red", "white"], "fortified", "Touriga Nacional, Tinta Barocca, Souzão, Muscat, Chenin Blanc",
  "A small Klein Karoo town that calls itself South Africa's port capital. The Nel cousins at Boplaas and De Krans, and Axe Hill, make fortified wines from Portuguese varieties in Cape Vintage, Cape Tawny and Cape Ruby styles, the names used since 'port' was retired under the EU agreement in 2012. Hot days, cold nights and low rainfall concentrate the grapes. Its ward is Groenfontein.", terroir="Alluvial and shale soils along the Gamka River; about 200 to 300 mm of rain.", producers=["Boplaas", "De Krans", "Axe Hill", "Calitzdorp Cellar"], contains=["Groenfontein"])
g("Groenfontein", "Ward", "Klein Karoo", "Calitzdorp", RW + ["fortified"], "fortified", "Touriga Nacional, Muscat", "A ward in the Groenfontein valley north of Calitzdorp, below the Swartberg.")
g("Langeberg-Garcia", "District", "Klein Karoo", "Klein Karoo", RW, "red", "Shiraz, Cabernet Sauvignon", "A district along the Langeberg range around the Garcia Pass near Riversdale.")
g("Montagu", "Ward", "Klein Karoo", "Klein Karoo", RW + ["fortified"], "fortified", "Muscadel, Chenin Blanc, Colombard", "A ward around the spa town of Montagu at the western gateway of the Klein Karoo, famous for its fortified Muscadel.")
g("Tradouw", "Ward", "Klein Karoo", "Klein Karoo", RW, "red", "Shiraz, Chardonnay", "A ward around Barrydale below the Tradouw Pass.")
g("Tradouw Highlands", "Ward", "Klein Karoo", "Klein Karoo", RW, "red", "Pinot Noir, Chardonnay, Shiraz", "A higher, cooler ward in the mountains above Barrydale, whose growers make fresh whites and Pinot Noir.", match=["Tradouw Hoogland", "Tradouw-Hoogland"])
g("Upper Langkloof", "Ward", "Klein Karoo", "Klein Karoo", RW, "red", "Pinot Noir, Sauvignon Blanc", "A high, cool ward in the apple-growing Langkloof valley around Haarlem in the far east of the Klein Karoo.", match=["Bo Langkloof", "Bo-Langkloof"])
g("Outeniqua", "Ward", "Klein Karoo", "Klein Karoo", RW, "red", "Pinot Noir, Sauvignon Blanc, Shiraz", "A ward in the Outeniqua mountains north of George, where vineyards on the Montagu Pass reach about 700 m.", producers=["Herold"])
g("Cango Valley", "Ward", "Klein Karoo", "Klein Karoo", RW + ["fortified"], "red", "Shiraz, Muscadel", "A ward north of Oudtshoorn in the valley of the Cango Caves.", match=["Kango Vallei"])
g("Koo Plateau", "Ward", "Klein Karoo", "Klein Karoo", RW, "white", "Chenin Blanc, Pinot Noir", "A high plateau north of Montagu at about 1,000 m, apple and pear country with a cool climate.", match=["Koo Plato"])

# Olifants River
g("Citrusdal Mountain", "District", "Olifants River", "Olifants River", RW, "red", "Grenache, Chenin Blanc, Palomino, Pinotage",
  "The mountain district above the Citrusdal valley, whose old, dry-farmed bush vines on sandstone are among the most prized in the new South Africa. Its ward is Piekenierskloof, and its high Skurfberg vineyards supply Chenin to Sadie, Alheit and others.", terroir="Sandy, Table Mountain sandstone soils at up to 1,000 m; dry and hot by day, cold at night.", producers=["Alheit (Magnetic North)", "Sadie Family (Skurfberg)"], match=["Citrusdalberg"], contains=["Piekenierskloof"])
g("Piekenierskloof", "Ward", "Olifants River", "Citrusdal Mountain", RW, "red", "Grenache, Chenin Blanc, Palomino, Pinotage, Cinsault",
  "A high plateau above the Piekenierskloof Pass south of Citrusdal, with some of South Africa's oldest Grenache and Palomino vineyards. Dry-farmed bush vines on deep sand give perfumed, light-coloured Grenache and textured whites prized by Swartland and Stellenbosch winemakers.", terroir="Deep, sandy soils derived from sandstone at 600 to 750 m.", producers=["Piekenierskloof Wine Company", "Sadie (Soldaat Grenache)", "Org de Rac (nearby)"])
g("Citrusdal Valley", "District", "Olifants River", "Olifants River", RW, "white", "Chenin Blanc, Colombard, Pinotage", "The citrus-growing southern Olifants River valley around Citrusdal and Clanwilliam, irrigated from the Clanwilliam Dam.", match=["Citrusdal Vallei"])
g("Vredendal", "Ward", "Olifants River", "Olifants River", RW, "white", "Chenin Blanc, Colombard, Sauvignon Blanc, Pinotage", "The ward around Vredendal in the lower Olifants River, home to Namaqua Wines, one of the largest cellars in South Africa.", producers=["Namaqua Wines"])
g("Spruitdrift", "Ward", "Olifants River", "Olifants River", RW, "white", "Chenin Blanc, Colombard", "An irrigated ward on the lower Olifants River near Vredendal.")

# Western Cape, no region
g("Ceres Plateau", "District", None, "Western Cape", RW, "white", "Chenin Blanc, Sauvignon Blanc, Pinot Noir", "A high plateau north-east of Ceres at about 1,000 m, apple and pear country whose cool vineyards supply sought-after Chenin and Pinot to Cape producers.", match=["Ceres Plato"], contains=["Ceres"])
g("Ceres", "Ward", None, "Ceres Plateau", RW, "white", "Chenin Blanc, Sauvignon Blanc", "A ward in the Ceres valley and plateau, high and cold in winter.")
g("Nuveld-Karoo", "District", None, "Western Cape", RW, "red", "", "A district on the high Karoo plateau inland of the Cape fold mountains, listed on the February 2026 schedule with no wards.")
g("Prince Albert", "District", None, "Western Cape", RW, "red", "Shiraz, Cabernet Sauvignon", "A district around the Karoo town of Prince Albert below the Swartberg, with the wards Kweekvallei, Prince Albert Valley and Swartberg.", match=["Prins Albert"], contains=["Kweekvallei", "Prince Albert Valley", "Swartberg"])
g("Kweekvallei", "Ward", None, "Prince Albert", RW, "red", "Shiraz", "A small ward near Prince Albert in the Karoo.")
g("Prince Albert Valley", "Ward", None, "Prince Albert", RW, "red", "Shiraz, Pinot Noir", "A ward in the valley around Prince Albert, a hot, dry Karoo town at the foot of the Swartberg Pass.", match=["Prince Albert Vallei", "Prins Albert Vallei"])
g("Swartberg", "Ward", None, "Prince Albert", RW, "red", "Shiraz", "A ward in the Swartberg mountains above Prince Albert.")
g("Cederberg", "Ward", None, "Western Cape", RW, "white", "Sauvignon Blanc, Chenin Blanc, Shiraz, Chardonnay",
  "A stand-alone ward in the Cederberg wilderness, with some of South Africa's highest and remotest vineyards at about 950 to 1,100 m. The Nieuwoudt family's Cederberg Private Cellar at Dwarsrivier, planted in the 1970s, makes crisp Sauvignon, Chenin and Shiraz.", terroir="Sandy soils from Table Mountain sandstone; cold winters with snow, hot dry summers.", producers=["Cederberg Private Cellar"])
g("Nieuwoudtville", "Ward", None, "Western Cape", RW, "white", "Chenin Blanc", "A ward around the town of Nieuwoudtville on the Bokkeveld plateau, known for spring wild flowers, at the north-western edge of the Cape.")
g("Leipoldtville-Sandveld", "Ward", None, "Western Cape", RW, "white", "Sauvignon Blanc, Chenin Blanc", "A ward in the sandy coastal plain (Sandveld) around Leipoldtville, west of Clanwilliam.")

# Northern Cape and others
g("Sutherland-Karoo", "District", "Northern Cape", "Karoo-Hoogland", RW, "red", "Shiraz, Pinot Noir, Chardonnay", "A high-altitude, semi-arid district around Sutherland, South Africa's coldest town and home of the national astronomical observatory, with vineyards at about 1,500 m, the highest in the country.", terroir="Dolerite and shale soils; extreme cold in winter.", producers=["Super Single Vineyards (Mount Sutherland)"])
g("Central Orange River", "District", "Northern Cape", "Northern Cape", RW + ["sweet"], "white", "Chenin Blanc, Colombard, Muscat d'Alexandrie, Pinotage, Shiraz",
  "The most northerly winegrowing area of the Cape, along about 350 km of the Orange River around Upington, Keimoes and Kakamas. Changed from a ward to a district after a 2019 proposal, it has five wards. About 6,000 ha are planted, largely for white wine, using high hut, gable and T-trellises that shade the grapes; vineyards on river islands are cooled by the water.", terroir="Alluvial river soils; very hot and arid, fully irrigated.", producers=["Orange River Cellars"], match=["Sentraal-Oranjerivier"], contains=["Groblershoop", "Grootdrink", "Kakamas", "Keimoes", "Upington"])
for nm in ["Groblershoop", "Grootdrink", "Kakamas", "Keimoes", "Upington"]:
    g(nm, "Ward", "Northern Cape", "Central Orange River", RW, "white", "Colombard, Chenin Blanc, Muscat", "A ward on the Orange River around the town of %s in the Central Orange River district, an irrigated desert-oasis vineyard area." % nm)
g("Douglas", "District", "Northern Cape", "Northern Cape", RW, "white", "Colombard, Chenin Blanc", "A district around Douglas, near the confluence of the Orange and Vaal rivers, with irrigated vineyards.")
g("Hartswater", "Ward", "Northern Cape", "Northern Cape", RW, "white", "Colombard, Chenin Blanc", "A ward in the Vaalharts irrigation scheme in the far north of the Northern Cape.")
g("Prieska", "Ward", "Northern Cape", "Northern Cape", RW, "white", "Colombard, Chenin Blanc", "A ward around Prieska on the Orange River.")
g("St Francis Bay", "Ward", None, "Eastern Cape", RW, "white", "Sauvignon Blanc, Pinot Noir", "The Eastern Cape's only ward, near the coastal resort of St Francis Bay.")
g("Central Drakensberg", "District", None, "KwaZulu-Natal", RW, "red", "Shiraz, Cabernet Sauvignon", "A district in the foothills of the Drakensberg near Winterton.", match=["Sentraal Drakensberg", "Sentraal-Drakensberg"])
g("Lions River", "District", None, "KwaZulu-Natal", RW, "white", "Sauvignon Blanc, Chardonnay, Shiraz", "A district in the KwaZulu-Natal Midlands near Howick, at about 1,000 to 1,200 m.")
g("Rietrivier FS", "Ward", None, "Free State", RW, "white", "Colombard, Chenin Blanc", "A ward on the Riet River near Jacobsdal in the Free State, home of the Landzicht cellar.", match=["Rietrivier VS"])
g("Lanseria", "Ward", None, None, RW, "red", "Shiraz, Cabernet Sauvignon", "A ward near Lanseria, north-west of Johannesburg in Gauteng, listed under no geographical unit on the February 2026 schedule; it is one of the few demarcated wine areas in South Africa's interior highveld.")
