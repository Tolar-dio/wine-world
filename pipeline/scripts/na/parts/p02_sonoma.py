import sys; sys.path.insert(0, "/home/claude/winesite/scripts/na")
from na_lib import ava, site, region, save_part
R = "Sonoma County"
SRC = [("TTB: Established American Viticultural Areas", "https://www.ttb.gov/wine/established-avas"),
       ("UC Davis Library AVA Digitizing Project", "https://github.com/UCDavisLibrary/ava"),
       ("Federal Register, West Sonoma Coast final rule (2022)", "https://www.federalregister.gov/documents/2022/05/23/2022-10590/establishment-of-the-west-sonoma-coast-viticultural-area"),
       ("Federal Register, Petaluma Gap final rule (2017)", "https://www.federalregister.gov/documents/2017/12/07/2017-26410/establishment-of-the-petaluma-gap-viticultural-area-and-modification-of-the-north-coast-viticultural-area"),
       ("Wikipedia: Agoston Haraszthy", "https://en.wikipedia.org/wiki/Agoston_Haraszthy")]
regions = [region("us", R, 38.52, -122.85, 9.0,
 "Coast, fog and redwoods on one side, Zinfandel benchland and Cabernet valleys on the other: California's most varied county.",
 "Sonoma County has roughly three times Napa's land area and close to 60,000 acres of vines, and it behaves less like one region than like a dozen. The Pacific is the organising force. Cold ocean air and fog push inland through gaps in the coastal hills (the Petaluma Gap, the Russian River corridor, the Estero Lowlands), so a 30-minute drive can take you from vineyards that struggle to ripen Pinot Noir to valleys where Zinfandel and Cabernet Sauvignon bake.\n\nThe cool west (Sonoma Coast, West Sonoma Coast, Fort Ross-Seaview, Russian River Valley, Green Valley, Petaluma Gap) is some of the best Pinot Noir and Chardonnay ground in the New World. The warm north and east (Dry Creek, Alexander, Knights valleys, Rockpile, Sonoma Valley's mountain sides) give old-vine Zinfandel, Cabernet and Rhône varieties. Northern Sonoma ties most of the northern AVAs together.",
 "Russian colonists of the Russian-American Company founded Fort Ross on the coast in 1812 and are said to have planted vines there by 1817. Franciscans founded Mission San Francisco Solano at Sonoma in 1823, the last and northernmost of California's 21 missions, and General Mariano Vallejo took over its vineyards after secularisation. The Hungarian adventurer Agoston Haraszthy bought land near Sonoma in 1856, renamed it Buena Vista and in 1857 began building the first stone cellars in California; in 1861 he brought back more than 100,000 cuttings of over 350 European varieties. Italian Swiss Colony at Asti (1881) and families like the Simis, Foppianos, Pedroncellis and Seghesios made the north county a Zinfandel and jug-wine powerhouse.\n\nAfter Prohibition the county lagged behind Napa until a wave of Burgundy-minded growers arrived. James Zellerbach planted Hanzell in 1953 and brought French oak barrels to California. In the 1970s and 1980s Joseph Swan, Rochioli, Williams Selyem, Dehlinger and Kistler built the Russian River Valley's reputation, and from 1980 David Hirsch and others pushed vines onto the ridges above the coastal fog. The October 2017 Tubbs Fire burned from Calistoga into Santa Rosa through the Fountaingrove District.",
 "Geology is a jumble along the San Andreas fault zone: Franciscan marine sediments, Sonoma Volcanics in the Mayacamas and Sonoma Mountain, and the fine, sandy Goldridge loam of the Russian River Valley and Green Valley, an ancient sea-bottom sandstone that drains well and is prized for Pinot Noir. Climate depends on fog and wind penetration: the coastal ridges above about 300 m sit in sun while fog fills the valleys below, the Russian River Valley gets fog on most summer mornings, and the northern valleys are warm and dry.",
 "Pinot Noir and Chardonnay dominate the cool south and west; Zinfandel (including some of California's oldest vines), Cabernet Sauvignon, Merlot, Sauvignon Blanc, Syrah and Petite Sirah dominate the north and east. Sonoma also grows Gewürztraminer, Grenache, Carignan and the field blends of old vineyards.",
 "Chardonnay and Pinot Noir with bright acidity from the coast; plush, spicy Zinfandel from Dry Creek and Rockpile; fleshy Alexander Valley Cabernet; traditional-method sparkling from Green Valley and Russian River.",
 "The county name 'Sonoma County' is a legal appellation in its own right. There are 18 AVAs wholly or partly in the county, nested in layers: North Coast contains Northern Sonoma and Sonoma Coast, which contain many smaller AVAs. California law requires wines labeled with a Sonoma County AVA to also carry 'Sonoma County' (conjunctive labeling, in force since 2014).",
 ["Sonoma Coast", "West Sonoma Coast", "Fort Ross-Seaview", "Petaluma Gap", "Russian River Valley", "Green Valley of Russian River Valley", "Chalk Hill", "Northern Sonoma", "Dry Creek Valley", "Alexander Valley", "Knights Valley", "Rockpile", "Fountaingrove District", "Pine Mountain-Cloverdale Peak", "Sonoma Valley", "Sonoma Mountain", "Bennett Valley", "Moon Mountain District Sonoma County", "Los Carneros"],
 SRC, parent="California")]

A = []
A.append(ava("North Coast", "North Coast",
 "A vast umbrella AVA (1983) of about 3.3 million acres covering the wine country north of San Francisco: most of Napa, Sonoma, Mendocino and Lake counties plus parts of Solano and Marin. It contains dozens of smaller AVAs and is mostly used for blends that draw on several counties, much as 'Central Coast' is used farther south.",
 sub="California", styles=["red", "white", "sparkling"], dom="red",
 grapes="Cabernet Sauvignon, Chardonnay, Pinot Noir, Zinfandel, Sauvignon Blanc, Merlot",
 nerd="TTB modified the North Coast boundary when it created the Petaluma Gap AVA (2017) and again for Long Valley-Lake County (2023); the 2024 Comptche AVA was deliberately left outside it."))
A.append(ava("Sonoma Coast", R,
 "A huge AVA (1987) of more than half a million acres that runs from the Mendocino line to San Pablo Bay and reaches well inland. It was drawn so broadly that it lumps cold coastal ridges with warm inland flats, and its creation is usually traced to Sonoma-Cutrer, whose vineyards needed a single AVA to qualify for 'estate bottled' labels. For decades the name promised more coolness than many wines delivered, which is why growers on the true coast pushed for Fort Ross-Seaview (2011) and West Sonoma Coast (2022).\n\nAt its best Sonoma Coast Pinot Noir and Chardonnay are lean, saline and intensely perfumed.",
 sub="North Coast", styles=["red", "white", "sparkling"], dom="red", grapes="Pinot Noir, Chardonnay, Syrah",
 producers=["Sonoma-Cutrer", "Flowers", "Littorai", "Peay", "Failla", "Hirsch"],
 nerd="Sonoma Coast contains the Russian River Valley, Green Valley, Petaluma Gap, Fort Ross-Seaview and West Sonoma Coast AVAs."))
A.append(ava("West Sonoma Coast", R,
 "Approved in 2022, West Sonoma Coast (about 141,800 acres) is the 'true' Sonoma Coast that growers had wanted since the 1990s: the band nearest the Pacific, from the Gualala River to the Petaluma Gap area, including the ridges around Annapolis, Fort Ross, Freestone and Occidental. TTB accepted that topography, geology and the marine climate set it apart from the inland parts of the old Sonoma Coast AVA.\n\nVineyards sit on steep ridges between redwood forest, often above the fog, in cold, windy conditions with long hang time. Pinot Noir and Chardonnay are tense and aromatic, Syrah is peppery and lean.",
 sub="Sonoma Coast", styles=["red", "white"], dom="red", grapes="Pinot Noir, Chardonnay, Syrah",
 terroir="Marine sediments of the Franciscan complex and sandstone; strong marine influence with fog in the hollows and sun on ridgetops.",
 producers=["Flowers", "Hirsch", "Peay", "Littorai", "Wayfarer", "Marcassin", "Ceritas", "Red Car"],
 contains=["Fort Ross-Seaview"]))
A.append(ava("Fort Ross-Seaview", R,
 "A ridgetop AVA (2011) of about 27,500 acres just inland from the ruins of the Russian colony at Fort Ross. The vineyards mostly sit above about 280 m (920 feet), above the marine layer, so they get sun while the valleys below are blanketed in fog, and cold air drains away at night. Yields are low and berries small.\n\nDavid Hirsch planted here in 1980, Walt and Joan Flowers in 1989, and Helen Turley and John Wetlaufer's Marcassin estate followed. The Pinot Noirs combine coastal brightness with surprising concentration.",
 sub="West Sonoma Coast", styles=["red", "white"], dom="red", grapes="Pinot Noir, Chardonnay",
 terroir="Steep ridges of Franciscan sandstone and shale along the San Andreas fault zone; above the fog line with large diurnal swings.",
 producers=["Hirsch", "Flowers", "Marcassin", "Fort Ross Vineyard", "Wild Hog"],
 nerd="The San Andreas fault runs right along the base of the ridges here, and Hirsch Vineyards straddles terrain on both tectonic plates."))
A.append(ava("Petaluma Gap", R,
 "One of the only AVAs defined by wind. Petaluma Gap (approved December 2017, effective 2018) covers about 202,500 acres in southern Sonoma and northern Marin, where a break in the coastal hills between Bodega Bay and San Pablo Bay funnels cold ocean air inland every afternoon. The petition cited afternoon wind speeds well above those of the surrounding areas.\n\nWind makes grape skins thicker and slows ripening while keeping acidity high, so the 4,000-odd acres of vines give Pinot Noir with deep colour and firm structure, and peppery cool-climate Syrah.",
 sub="Sonoma Coast", styles=["red", "white"], dom="red", grapes="Pinot Noir, Chardonnay, Syrah",
 producers=["Keller Estate", "Gap's Crown (vineyard)", "Sun Chase (vineyard)", "Kastania"],
 nerd="Wind was the main distinguishing feature in the petition, which made Petaluma Gap a test case for TTB's idea of what counts as terroir."))
A.append(ava("Russian River Valley", R,
 "California's most celebrated cool-climate Pinot Noir appellation (1983, expanded in 2005 and 2011), about 171,000 acres around the lower Russian River from Healdsburg south to Sebastopol. Fog rolls up the river and through the Petaluma Gap most summer nights and mornings, so days start cold, warm by mid-afternoon and cool again by evening. That pattern gives ripe red-berry and cola Pinot Noir with bright acidity, and rich, citrusy Chardonnay.\n\nThe Burgundian pioneers were Joseph Swan (first vintage 1969), the Rochioli family (Pinot from the late 1960s), Williams Selyem (first vintage 1981), Dehlinger and Kistler. Westside Road, along the river south of Healdsburg, is the Pinot Noir 'Golden Mile'. Old-vine Zinfandel and sparkling wine also thrive.",
 sub="Northern Sonoma", styles=["red", "white", "sparkling"], dom="red", grapes="Pinot Noir, Chardonnay, Zinfandel, Syrah, Sauvignon Blanc",
 terroir="Goldridge sandy loam (ancient marine sandstone), alluvial river terraces and some clay; fog-driven daily temperature swings.",
 producers=["Williams Selyem", "Rochioli", "Kistler", "Dehlinger", "Gary Farrell", "Merry Edwards", "Joseph Swan", "Marimar Estate", "DuMOL"],
 nerd="Burt Williams and Ed Selyem started as weekend garagistes; their 1987 Rochioli Vineyard Pinot Noir won the California State Fair's top prize and made the label a mailing-list sensation.",
 contains=["Green Valley of Russian River Valley", "Chalk Hill"]))
A.append(ava("Green Valley of Russian River Valley", R,
 "A small, foggy AVA (1983) in the southwestern corner of the Russian River Valley around Forestville, Graton and Occidental, one of the coolest parts of the larger valley. The soil is almost all Goldridge sandy loam. It is classic ground for sparkling wine and taut Chardonnay and Pinot Noir.\n\nIron Horse, founded by Barry and Audrey Sterling in 1976, made sparkling wines that were poured at the Reagan-Gorbachev summits from 1985 and at many White House dinners since.",
 sub="Russian River Valley", styles=["sparkling", "white", "red"], dom="red", grapes="Pinot Noir, Chardonnay",
 producers=["Iron Horse", "Marimar Estate", "Dutton-Goldfield", "Hartford Family"],
 nerd="Until 2007 the AVA was called 'Sonoma County Green Valley'; TTB renamed it to avoid confusion with Solano County Green Valley."))
A.append(ava("Chalk Hill", R,
 "A warm corner of the Russian River Valley (1983) east of Windsor, in hills above the fog. The 'chalk' is a misnomer: the pale soils are volcanic ash from Mount St. Helena's eruptions, mixed with river sediments. It is warmer than the rest of the Russian River Valley and better suited to Chardonnay, Sauvignon Blanc and Bordeaux varieties than to Pinot Noir.",
 sub="Russian River Valley", styles=["white", "red"], dom="white", grapes="Chardonnay, Sauvignon Blanc, Merlot, Cabernet Sauvignon",
 producers=["Chalk Hill Estate", "Verité (part sourced)", "Rodney Strong"]))
A.append(ava("Northern Sonoma", R,
 "An umbrella AVA (1985) covering most of northern Sonoma County, including the Russian River, Dry Creek, Alexander and Knights valleys, Chalk Hill and Rockpile. It was petitioned by E. & J. Gallo, whose estate vineyards span several of those valleys, and it is used mainly by producers blending across them.",
 sub="North Coast", styles=["red", "white"], dom="red", grapes="Cabernet Sauvignon, Chardonnay, Pinot Noir, Zinfandel",
 producers=["Gallo Family Vineyards", "Jordan (some bottlings)"]))
A.append(ava("Dry Creek Valley", R,
 "A narrow valley (1983) running 25 km northwest of Healdsburg, now dammed at its head by Lake Sonoma. Italian immigrant families planted Zinfandel and field blends here in the late 19th century, and many of those head-trained, dry-farmed vines survive on the gravelly benches. Dry Creek Zinfandel is the archetype: brambly blackberry, black pepper and spice, ripe but rarely jammy.\n\nThe valley floor's deep alluvial loam suits Sauvignon Blanc; David Stare's Dry Creek Vineyard (1972) was the first new winery here after Prohibition and championed the grape. Rhône varieties and Cabernet are increasingly important.",
 sub="Northern Sonoma", styles=["red", "white"], dom="red", grapes="Zinfandel, Sauvignon Blanc, Cabernet Sauvignon, Petite Sirah, Syrah, Grenache",
 terroir="Gravelly, iron-rich red benchland on both sides of a deep alluvial valley floor; warm days, with fog reaching the southern end.",
 producers=["Ridge (Lytton Springs)", "Quivira", "Preston", "Dry Creek Vineyard", "Pedroncelli", "Unti", "A. Rafanelli", "Nalle"],
 nerd="Ridge labels its Lytton Springs Zinfandel blend as Dry Creek Valley; the old vines there were planted around 1900 and include Petite Sirah, Carignan and Mataro."))
A.append(ava("Alexander Valley", R,
 "The upper Russian River valley (1984, expanded 1990s to 2008) from Healdsburg north to Cloverdale, named for Cyrus Alexander, who settled here in the 1840s. It is one of Sonoma's warmest areas, with less fog than the lower river, and it is the county's Cabernet Sauvignon heartland: round, plush and approachable, with soft tannin and notes of black cherry and cocoa.\n\nHillside vineyards on the Mayacamas side give darker, firmer wines. Jordan (1972) and Silver Oak's Alexander Valley Cabernet made the style famous; Simi has made wine at Healdsburg since 1876.",
 sub="Northern Sonoma", styles=["red", "white"], dom="red", grapes="Cabernet Sauvignon, Merlot, Chardonnay, Zinfandel, Sauvignon Blanc",
 terroir="Deep alluvial loams on the valley floor, gravelly benches and volcanic hillsides on the east.",
 producers=["Jordan", "Silver Oak (Alexander Valley)", "Stonestreet", "Simi", "Robert Young", "Hawkes"]))
A.append(ava("Knights Valley", R,
 "A small, elevated valley (1983) between Alexander Valley and Calistoga, at the southeast corner of northern Sonoma. Volcanic soils from Mount St. Helena and warm, sunny days give Cabernet Sauvignon of structure and depth, and Sauvignon Blanc. Beringer owns a large share of the vineyards; Peter Michael Winery, founded by British electronics entrepreneur Sir Peter Michael in 1982, is the star estate.",
 sub="Northern Sonoma", styles=["red", "white"], dom="red", grapes="Cabernet Sauvignon, Sauvignon Blanc, Chardonnay",
 producers=["Peter Michael", "Beringer (Knights Valley)", "Kendall-Jackson (Knights Valley vineyards)"]))
A.append(ava("Rockpile", R,
 "A rugged, remote AVA (2002) of ridges above the west arm of Lake Sonoma, limited to land above about 240 m (800 feet). Thin, rocky soils, wind and sun above the fog give concentrated, spicy Zinfandel and Petite Sirah with firm structure. The name comes from Rockpile Ranch, homesteaded in the 1850s by an ancestor of the Mauritson family.",
 sub="Northern Sonoma", styles=["red"], dom="red", grapes="Zinfandel, Petite Sirah, Cabernet Sauvignon, Syrah",
 producers=["Mauritson", "Rockpile Vineyard (grower)", "Carol Shelton", "Paradise Ridge"]))
A.append(ava("Fountaingrove District", R,
 "A hilly AVA (2015) of about 38,000 acres in the Mayacamas foothills northeast of Santa Rosa, with around 500 acres of vines. It is named for Fountaingrove, the utopian Brotherhood of the New Life founded by Thomas Lake Harris in 1875. Kanaye Nagasawa, a young Japanese samurai who came with Harris, ran its winery and became one of California's leading winemakers before Prohibition.\n\nVolcanic soils and elevation suit Cabernet Sauvignon, Merlot and Syrah. The October 2017 Tubbs Fire swept through the district, destroying Fountaingrove's famous 1899 Round Barn and hundreds of homes.",
 sub="North Coast", styles=["red", "white"], dom="red", grapes="Cabernet Sauvignon, Merlot, Syrah, Zinfandel, Chardonnay",
 producers=["Paradise Ridge", "Pride Mountain (part)", "Fisher (part)"],
 nerd="Nagasawa (1852 to 1934) is often called California's 'Wine King'; land laws against Japanese ownership meant his estate was lost after his death."))
A.append(ava("Pine Mountain-Cloverdale Peak", R,
 "A small mountain AVA (2011) of about 4,570 acres around Pine Mountain, a 900 m peak on the western flank of the Mayacamas above Cloverdale, straddling the Sonoma-Mendocino line. Vineyards sit roughly from 490 to 900 m, above the Alexander Valley heat and fog, in thin, rocky volcanic and sedimentary soils. Cabernet Sauvignon and Cabernet Franc are dark, firm and mineral.",
 sub="Northern Sonoma", styles=["red"], dom="red", grapes="Cabernet Sauvignon, Cabernet Franc, Merlot",
 producers=["Miro (sourcing)", "Silver Oak (Pine Mountain sourcing)", "Sonoma Coast Vineyards (sourcing)"],
 nerd="The petitioners first asked for 'Pine Mountain-Mayacmas'; the name was changed after objections that it could be confused with Mayacamas Vineyards on Mt. Veeder."))
A.append(ava("Sonoma Valley", R,
 "The 'Valley of the Moon' (1982), running from Carneros north to Santa Rosa between the Mayacamas and Sonoma Mountain. This is where Sonoma wine began: Mission San Francisco Solano (1823), General Vallejo's vineyards, Haraszthy's Buena Vista (1857) and Gundlach Bundschu's Rhinefarm (1858). Jack London ranched at Glen Ellen.\n\nThe south is cooled by San Pablo Bay; the north around Kenwood is warm, and its hillsides grow powerful Cabernet and Zinfandel. Old vineyards such as Old Hill Ranch (planted in the 1880s) carry Zinfandel field blends; Hanzell (planted 1953) is a Chardonnay and Pinot Noir landmark.",
 sub="North Coast", styles=["red", "white"], dom="red", grapes="Cabernet Sauvignon, Zinfandel, Merlot, Chardonnay, Pinot Noir, Syrah",
 producers=["Hanzell", "Gundlach Bundschu", "Buena Vista", "Kamen", "Arrowood", "Kunde", "Ravenswood", "Bedrock"],
 contains=["Sonoma Mountain", "Bennett Valley", "Moon Mountain District Sonoma County"]))
A.append(ava("Sonoma Mountain", R,
 "A mountain AVA (1985) on the western side of the Sonoma Valley, above Glen Ellen, including Jack London's Beauty Ranch. Vineyards above the fog get sun and a long season, and thin volcanic soils keep yields low. Cabernet Sauvignon is fine-grained and savoury; Patrick Campbell's Laurel Glen (from 1981) defined it.",
 sub="Sonoma Valley", styles=["red", "white"], dom="red", grapes="Cabernet Sauvignon, Pinot Noir, Zinfandel, Chardonnay",
 producers=["Laurel Glen", "Benziger", "Kamen (nearby)", "Repris"]))
A.append(ava("Bennett Valley", R,
 "A small AVA (2003) in the hills southeast of Santa Rosa, cooled by marine air that flows through the Crane Canyon gap from the Petaluma side. That coolness suits Merlot, Syrah, Sauvignon Blanc and Pinot Noir. Matanzas Creek (1977), known for Merlot and Sauvignon Blanc and its lavender fields, is the best-known winery.",
 sub="Sonoma Valley", styles=["red", "white"], dom="red", grapes="Merlot, Syrah, Sauvignon Blanc, Pinot Noir, Chardonnay",
 producers=["Matanzas Creek", "Bennett Valley Cellars"]))
A.append(ava("Moon Mountain District Sonoma County", R,
 "A steep mountain AVA (2013) of about 17,600 acres on the western face of the Mayacamas above the Sonoma Valley, with 40 commercial vineyards at the time of the petition. Volcanic rock and red soils on west-facing slopes give dense Cabernet Sauvignon and Zinfandel.\n\nMonte Rosso, planted in the 1880s by Emmanuel Goldstein and bought by Louis M. Martini in 1938, is its most famous vineyard, with Zinfandel and Cabernet vines more than a century old.",
 sub="Sonoma Valley", styles=["red"], dom="red", grapes="Cabernet Sauvignon, Zinfandel, Merlot, Syrah",
 producers=["Louis M. Martini (Monte Rosso)", "Kamen", "Repris", "Hanzell (Moon Mountain parcels)", "Bedrock (Monte Rosso)"],
 nerd="'Sonoma County' is part of the official AVA name to keep it from being confused with other Moon Mountains."))

S = []
S.append(site("buena-vista", "us", "Buena Vista Winery", "historic", "Sonoma Valley", 38.2995, -122.4226,
 "Agoston Haraszthy bought this land in 1856 and from 1857 dug tunnels and built the first stone wine cellars in California. In 1861 he returned from Europe with more than 100,000 vine cuttings of over 350 varieties. The 1862 Press House still stands. Jean-Charles Boisset bought and restored the estate in 2011.",
 cls="California Historical Landmark", producers=["Buena Vista"]))
S.append(site("mission-san-francisco-solano", "us", "Mission San Francisco Solano", "historic", "Sonoma Valley", 38.2939, -122.4561,
 "Founded on 4 July 1823, the last and northernmost of California's 21 Franciscan missions. Its vineyard of Mission grapes was the start of wine in Sonoma; after secularisation in the 1830s General Mariano Vallejo took over the vines.",
 cls="Founded 1823", producers=[]))
S.append(site("gundlach-bundschu", "us", "Gundlach Bundschu (Rhinefarm)", "estate", "Sonoma Valley", 38.2809, -122.4172,
 "Jacob Gundlach planted the Rhinefarm vineyard in 1858; Charles Bundschu joined later. The family survived the 1906 earthquake and Prohibition and still farms the land, making it one of California's oldest family-run wineries.",
 cls="Founded 1858", producers=["Gundlach Bundschu"]))
S.append(site("hanzell", "us", "Hanzell Vineyards", "estate", "Sonoma Valley", 38.3118, -122.4710,
 "James D. Zellerbach, a paper magnate and US ambassador to Italy, planted Chardonnay and Pinot Noir here in 1953 and built a small winery modelled on Clos de Vougeot. Hanzell is credited with introducing French oak barrels and temperature-controlled stainless steel to California winemaking. Its Pinot Noir vineyard is among the oldest in the state.",
 cls="Planted 1953", q="approx", producers=["Hanzell"]))
S.append(site("monte-rosso", "us", "Monte Rosso Vineyard", "vineyard", "Moon Mountain District Sonoma County", 38.3370, -122.4720,
 "A red-soiled vineyard high on the Mayacamas above the Sonoma Valley, planted in the 1880s by Emmanuel Goldstein and bought by Louis M. Martini in 1938. Its own-rooted Zinfandel and old Cabernet supply Martini and a string of small producers.",
 cls="Historic single vineyard", q="approx", producers=["Louis M. Martini", "Bedrock", "Biale"]))
S.append(site("williams-selyem", "us", "Williams Selyem", "estate", "Russian River Valley", 38.5209, -122.8708,
 "Burt Williams and Ed Selyem made their first Pinot Noir in 1981 in a garage, buying grapes from Rochioli and others along Westside Road. Their single-vineyard Pinots became the cult wines of the Russian River Valley; John Dyson bought the winery in 1998.",
 producers=["Williams Selyem"]))
S.append(site("rochioli", "us", "Rochioli Vineyards", "vineyard", "Russian River Valley", 38.5180, -122.8640,
 "The Rochioli family has farmed on Westside Road since the 1930s and planted Pinot Noir in the late 1960s. Its East Block, West Block and other parcels supplied the wines that built Williams Selyem's and Gary Farrell's reputations.",
 q="approx", producers=["Rochioli", "Williams Selyem", "Gary Farrell"]))
S.append(site("kistler", "us", "Kistler Vineyards", "estate", "Russian River Valley", 38.4600, -122.8370,
 "Steve Kistler and Mark Bixler made their first wines in 1979; from the Vine Hill Road winery in the Russian River Valley they produced dense, single-vineyard Chardonnays and Pinot Noirs that became benchmarks.",
 q="approx", producers=["Kistler"]))
S.append(site("hirsch", "us", "Hirsch Vineyards", "vineyard", "Fort Ross-Seaview", 38.5360, -123.2190,
 "David Hirsch planted vines on a remote ridge above the Pacific in 1980, astride the San Andreas fault. Fruit sold to Kistler, Littorai, Williams Selyem and others proved that the extreme coast could ripen Pinot Noir; the family now makes its own wines.",
 q="approx", producers=["Hirsch", "Littorai"]))
S.append(site("fort-ross", "us", "Fort Ross", "historic", "West Sonoma Coast", 38.5145, -123.2443,
 "The Russian-American Company's outpost on the Sonoma coast (1812 to 1841), where Russian settlers are said to have planted some of the first vines in northern California by 1817. Now a state historic park; the AVA above it borrows its name.",
 cls="Founded 1812", q="approx"))
S.append(site("ridge-lytton-springs", "us", "Ridge Lytton Springs", "estate", "Dry Creek Valley", 38.6591, -122.8855,
 "Ridge bought Lytton Springs in 1991, after making wine from its century-old Zinfandel, Petite Sirah and Carignan since 1972. The straw-bale winery and its field-blend Lytton Springs bottling are a lesson in how old California mixed plantings work.",
 producers=["Ridge Vineyards"]))
S.append(site("korbel", "us", "Korbel Champagne Cellars", "house", "Russian River Valley", 38.5088, -122.9626,
 "The Czech Korbel brothers cleared redwoods here for lumber and turned to wine; from 1882 they made bottle-fermented sparkling wine. Korbel still uses the term 'California Champagne', allowed for brands grandfathered under the 2006 US-EU wine agreement.",
 cls="Founded 1882", producers=["Korbel"]))
S.append(site("simi", "us", "Simi Winery", "estate", "Alexander Valley", 38.6380, -122.8710,
 "Giuseppe and Pietro Simi from Tuscany founded the winery in 1876 and built the stone cellar at Healdsburg in 1890. Isabelle Simi ran it for decades and kept it going through Prohibition.",
 cls="Founded 1876", q="approx", producers=["Simi"]))
S.append(site("iron-horse", "us", "Iron Horse Vineyards", "house", "Green Valley of Russian River Valley", 38.4320, -122.8620,
 "Barry and Audrey Sterling bought this foggy Green Valley ranch in 1976. Its traditional-method sparkling wines were served at the Reagan-Gorbachev summits and have been poured at White House state dinners ever since.",
 q="approx", producers=["Iron Horse"]))
S.append(site("fountaingrove-round-barn", "us", "Fountaingrove Round Barn site", "historic", "Fountaingrove District", 38.4779, -122.7180,
 "Site of the Fountaingrove community founded by Thomas Lake Harris in 1875, where Kanaye Nagasawa, a samurai-born Japanese immigrant, made some of California's most admired wines before Prohibition. The 1899 Round Barn survived for more than a century until the Tubbs Fire destroyed it in October 2017.",
 q="approx"))

save_part("p02_sonoma", regions=regions, appellations=A, sites=S)
