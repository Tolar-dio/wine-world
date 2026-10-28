import sys; sys.path.insert(0, "/home/claude/winesite/scripts/na")
from na_lib import ava, site, region, save_part
R = "Napa Valley"
SRC = [("TTB: Established American Viticultural Areas", "https://www.ttb.gov/wine/established-avas"),
       ("UC Davis Library AVA Digitizing Project", "https://github.com/UCDavisLibrary/ava"),
       ("Federal Register, Crystal Springs of Napa Valley final rule (2024)", "https://www.federalregister.gov/documents/2024/10/16/2024-23655/establishment-of-the-crystal-springs-of-napa-valley-viticultural-area-modification-of-the-calistoga"),
       ("Wikipedia: Judgment of Paris (wine)", "https://en.wikipedia.org/wiki/Judgment_of_Paris_(wine)"),
       ("Wikipedia: Stag's Leap Wine Cellars", "https://en.wikipedia.org/wiki/Stag%27s_Leap_Wine_Cellars"),
       ("Wikipedia: Chateau Montelena", "https://en.wikipedia.org/wiki/Chateau_Montelena")]

regions = [region("us", R, 38.43, -122.40, 10.0,
 "Fifty kilometres of valley floor and mountain that taught the world to take American Cabernet seriously.",
 "Napa Valley is small by California standards: about 45,000 acres (roughly 18,000 ha) of vines, around 4 percent of the state's wine grapes, yet it earns a share of the value and prestige out of all proportion to its size. The valley runs about 50 km from the tidal marshes of San Pablo Bay north to the volcanic bulk of Mount St. Helena, squeezed between the Mayacamas Mountains on the west and the Vaca Range on the east.\n\nCabernet Sauvignon is the crown, and the land under it is sliced into 17 nested AVAs inside the Napa Valley AVA. The logic of the map follows two gradients. North to south, the valley warms as you move away from the cool bay: Los Carneros and Coombsville get the fog and wind, Calistoga the heat. Valley floor to mountain, the alluvial benches of Rutherford and Oakville give generous, polished Cabernet while the mountain AVAs (Howell Mountain, Spring Mountain District, Mt. Veeder, Diamond Mountain District, Atlas Peak) sit above the fog in thin, rocky soils and give tighter, more tannic wines that age for decades.",
 "George C. Yount, the first American settler in the valley, planted Mission vines around 1838. Charles Krug opened a commercial winery at St. Helena in 1861, and by the 1880s the valley had well over a hundred wineries, among them Gustave Niebaum's Inglenook and the Beringer brothers' Rhine House. Phylloxera in the 1890s and Prohibition (1920 to 1933) nearly erased that first golden age; Beaulieu survived on sacramental wine and, from 1938, the winemaking of André Tchelistcheff.\n\nThe modern era began in 1966, when Robert Mondavi built the first major new winery in the valley since Prohibition, at Oakville. Two years later Napa County created the Agricultural Preserve (1968), the first of its kind in the United States, which zoned the valley floor for farming and saved it from suburban sprawl. In 1976, at Steven Spurrier's blind tasting in Paris, Stag's Leap Wine Cellars 1973 Cabernet and Chateau Montelena 1973 Chardonnay beat top Bordeaux and Burgundy, and Napa became a global name. Napa Valley was approved as an AVA in 1981, the first in California. The 1990s brought a forced replanting when phylloxera biotype B overwhelmed the widely used AXR1 rootstock; growers used the moment to replant at higher density with better clones. Wildfires in 2017 (Atlas Fire) and 2020 (Glass Fire) burned wineries on Atlas Peak, Spring Mountain and Howell Mountain, and smoke cost many producers their 2020 reds.",
 "Napa is a geological jumble: volcanic ash and lava from the Sonoma Volcanics, uplifted marine sediments, and gravelly alluvial fans washed down from both ranges. Wine writers like to repeat the claim, popular with the vintners' association, that half of the world's soil orders occur here. Climate is Mediterranean, with dry summers and wet winters. Fog and wind from San Pablo Bay cool the south; the narrow north end around Calistoga is several degrees warmer by afternoon. On the mountains, vines above the fog line (roughly 300 to 450 m) get more hours of sun but cooler nights and less vigour, which is why mountain Cabernet has smaller berries, firmer tannin and higher natural acidity.",
 "Cabernet Sauvignon dominates both plantings and prices, with Merlot, Cabernet Franc, Petit Verdot and Malbec for blending. Chardonnay and Pinot Noir are concentrated in Los Carneros and Oak Knoll; Sauvignon Blanc is the main white. Old Zinfandel, Petite Sirah and Charbono survive in pockets, especially around Calistoga.",
 "Full-bodied Cabernet Sauvignon and Bordeaux blends are the headline: ripe cassis and dark plum, cedar and mocha from new French oak, and a velvety mouthfeel on the valley floor. Mountain wines are more structured. Chardonnay ranges from buttery to tense; Carneros makes serious traditional-method sparkling wine.",
 "Labels carry the Napa Valley AVA or one of its 17 sub-AVAs. California law (the Napa conjunctive labeling rule) requires any wine labeled with a Napa sub-AVA to also state Napa Valley on the label. The federal 85 percent AVA rule applies; there is no official vineyard classification, though names like To Kalon, Martha's Vineyard and Stags Leap's S.L.V. work as unofficial grands crus.",
 ["Napa Valley", "Calistoga", "Diamond Mountain District", "Spring Mountain District", "St. Helena", "Rutherford", "Oakville", "Yountville", "Stags Leap District", "Oak Knoll District of Napa Valley", "Mt. Veeder", "Atlas Peak", "Howell Mountain", "Chiles Valley", "Coombsville", "Wild Horse Valley", "Los Carneros", "Crystal Springs of Napa Valley"],
 SRC, parent="California")]

A = []
A.append(ava("Napa Valley", R,
 "The most famous wine address in the Americas, approved in 1981 as California's first AVA and the second in the country after Augusta, Missouri. The AVA covers almost all of Napa County apart from the area around Lake Berryessa, so it includes the valley floor, both mountain ranges and the side valleys, and it contains 17 smaller AVAs.\n\nNapa's reputation rests on Cabernet Sauvignon. The style that made it famous is ripe and dense, with blackcurrant, plum, cocoa and sweet tannin, often lifted by new French oak. Thoughtful producers have moved toward earlier picking and less oak since the 2010s, but generosity of fruit is the house signature. A Napa Valley label alone usually means a blend of sites, while the sub-AVAs and named vineyards tell you where on the map the wine comes from.\n\nThe valley is also a lesson in land politics. The Agricultural Preserve of 1968 forbade subdivision of the valley floor into lots smaller than 20 acres (later 40), which is why the valley still looks like farmland rather than the Silicon Valley sprawl a few miles south. Land values are now among the highest for any vineyard outside Burgundy and Champagne, and a ton of Napa Cabernet costs several times the California average.",
 sub="North Coast", styles=["red", "white", "sparkling", "sweet"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, Malbec, Chardonnay, Sauvignon Blanc, Pinot Noir, Zinfandel",
 terroir="Mediterranean climate with a strong north-south temperature gradient: cool and foggy near San Pablo Bay, warm toward Calistoga. Soils mix volcanic material from the Sonoma Volcanics, uplifted marine sediments and gravelly alluvial fans. Mountain vineyards above the fog line give smaller berries and firmer tannin.",
 producers=["Robert Mondavi Winery", "Stag's Leap Wine Cellars", "Chateau Montelena", "Inglenook", "Beaulieu Vineyard", "Heitz Cellar", "Opus One", "Harlan Estate", "Screaming Eagle", "Dominus Estate", "Spottswoode", "Corison"],
 nerd="Napa Valley was the first AVA approved in California (1981). Wines from any of its 17 sub-AVAs must also show 'Napa Valley' on the label under California's conjunctive labeling law.",
 contains=["Calistoga", "Diamond Mountain District", "Spring Mountain District", "St. Helena", "Rutherford", "Oakville", "Yountville", "Stags Leap District", "Oak Knoll District of Napa Valley", "Mt. Veeder", "Atlas Peak", "Howell Mountain", "Chiles Valley", "Coombsville", "Wild Horse Valley", "Los Carneros", "Crystal Springs of Napa Valley"]))

A.append(ava("Calistoga", R,
 "Napa's northernmost and warmest valley-floor AVA, approved in late 2009 after a long fight over the use of the name by a brand that sourced grapes elsewhere. It sits at the head of the valley under Mount St. Helena, where the valley floor narrows and is ringed by the Mayacamas and Vaca ranges.\n\nDays are hot, but cool air spills in at night through the Knights Valley gap from the Russian River side, so the daily temperature swing is among the largest in Napa. The wines are bold and dark: Cabernet Sauvignon with real tannic grip, plus Zinfandel, Petite Sirah and Charbono from old vineyards that never got replanted to Cabernet. Chateau Montelena, whose 1973 Chardonnay won the white half of the 1976 Paris tasting, is the most famous estate; Araujo's former Eisele Vineyard, now Eisele Vineyard estate, is its cult Cabernet.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Zinfandel, Petite Sirah, Charbono, Cabernet Franc, Chardonnay, Sauvignon Blanc",
 terroir="Volcanic soils derived from Mount St. Helena and the Sonoma Volcanics, plus alluvial fans; hot afternoons and cold nights.",
 producers=["Chateau Montelena", "Eisele Vineyard (formerly Araujo)", "Larkmead", "Tofanelli", "Storybook Mountain"],
 nerd="The town's name is a slip of the tongue: founder Sam Brannan meant to promise 'the Saratoga of California' and is said to have blurted 'the Calistoga of Sarafornia'. In 2024 TTB adjusted Calistoga's boundary when it created the neighbouring Crystal Springs of Napa Valley AVA."))

A.append(ava("Diamond Mountain District", R,
 "A steep, small mountain AVA (2001) on the Mayacamas slopes just southwest of Calistoga, rising from about 120 to 670 m. The soils are volcanic ash and weathered lava, light and fast-draining, and the vines sit above much of the valley's heat. Cabernet Sauvignon here is dense, mineral and tannic in youth, and it is among the longest-lived in Napa.\n\nDiamond Creek defined the place. Al Brounstein planted it in 1968 and from 1972 bottled separate Cabernets from neighbouring blocks with different soils (Volcanic Hill, Red Rock Terrace, Gravelly Meadow), an early and very Burgundian statement that site matters in California. Schramsberg's caves are dug into the same mountainside.",
 sub="Napa Valley", styles=["red", "sparkling"], dom="red",
 grapes="Cabernet Sauvignon, Cabernet Franc, Merlot, Petit Verdot",
 terroir="Volcanic ash, tuff and red lava soils on steep, mostly northeast-facing slopes; cooler and less foggy than the valley floor.",
 producers=["Diamond Creek", "Schramsberg", "Von Strasser", "Reverie"],
 nerd="Brounstein reportedly brought his first Bordeaux cuttings in by way of Mexico, and Diamond Creek's block-by-block bottlings were among the first vineyard-parcel Cabernets in the United States."))

A.append(ava("Spring Mountain District", R,
 "Mountain AVA (1993) on the Mayacamas slopes directly west of St. Helena, from about 120 m to almost 800 m. Steep, terraced vineyards on a mix of volcanic and sedimentary soils give Cabernet Sauvignon with firm tannin, bright acidity and a herbal, forest-floor note, and they hold some of Napa's most interesting whites: Stony Hill's taut, unoaked Chardonnay (first vintage 1952) and Smith-Madrone's dry Riesling.\n\nThe district has deep history (Tiburcio Parrott's Miravalle mansion of the 1880s later starred as the house in the TV soap Falcon Crest) and recent scars: the 2020 Glass Fire destroyed or damaged several estates here, including Newton and Cain.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Chardonnay, Riesling",
 terroir="Volcanic and uplifted marine sedimentary soils, steep slopes, fog-free afternoons and cool mountain nights.",
 producers=["Stony Hill", "Smith-Madrone", "Pride Mountain", "Cain", "Spring Mountain Vineyard", "Keenan", "Ritchie Creek"],
 nerd="Pride Mountain Vineyards straddles the Napa-Sonoma county line, so it keeps separate records for grapes grown on each side. Spring Mountain Vineyard's 1973 Chardonnay finished fourth among the whites at the 1976 Paris tasting."))

A.append(ava("St. Helena", R,
 "Mid-valley AVA (1995) around the town of St. Helena, where the valley floor is narrowest and the heat of the north meets the last of the bay's influence. It is the historic heart of Napa: Charles Krug founded the valley's first commercial winery here in 1861, Beringer followed in 1876, and Heitz, Spottswoode, Duckhorn and Corison all sit within a few kilometres.\n\nCabernet Sauvignon from St. Helena tends to be plush and ripe, with the warmth of the upper valley, while the benchland vineyards on the west side (Spottswoode, Corison's Kronos) give more perfume and finesse. Merlot and Sauvignon Blanc also do well.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Sauvignon Blanc, Zinfandel",
 terroir="Alluvial fans from the Mayacamas on the west, heavier clay and volcanic soils toward the Vaca side; warm days with modest fog.",
 producers=["Spottswoode", "Corison", "Beringer", "Charles Krug", "Heitz Cellar", "Duckhorn", "Grace Family"],
 nerd="Beringer made sacramental wine through Prohibition and claims to be Napa's oldest continuously operating winery; its 1884 Rhine House is a Victorian copy of the family home on the Rhine."))

A.append(ava("Rutherford", R,
 "Rutherford (1993) is classic Napa Cabernet country, a band across the valley floor between Oakville and St. Helena. Its fame rests on the Rutherford Bench, gravelly alluvial fans on the west side where Beaulieu and Inglenook built the reputation of California Cabernet before and after Prohibition. André Tchelistcheff, Beaulieu's winemaker from 1938, summed up the place in a line every Napa guide quotes: it takes Rutherford dust to grow great Cabernet.\n\nThe 'dust' is a texture as much as a taste: a fine, cocoa-powder tannin and a savoury, dusty, dried-herb note over ripe blackcurrant. Inglenook's 1941 Cabernet and Beaulieu's Georges de Latour Private Reserve (from the 1936 vintage) are touchstones of American wine history.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, Sauvignon Blanc",
 terroir="Deep, well-drained gravelly loam on the western bench; heavier, more volcanic soils toward the Silverado Trail. Moderately warm with morning fog.",
 producers=["Inglenook", "Beaulieu Vineyard", "Caymus", "Quintessa", "Staglin Family", "Frog's Leap", "Hall Rutherford"],
 nerd="Gustave Niebaum, a Finnish sea captain who made his fortune in the Alaska fur trade, founded Inglenook around 1880. Francis Ford Coppola bought the estate in 1975 and, in 2011, bought back the Inglenook name and restored it."))

A.append(ava("Oakville", R,
 "Oakville (1993) is the richest square mile in American wine. The western bench below the Mayacamas holds To Kalon, the vineyard H.W. Crabb planted in the 1860s and named from the Greek for 'the highest beauty'; Robert Mondavi built his winery on it in 1966, the first major new winery in Napa since Prohibition. Opus One stands across Highway 29, Harlan Estate is on the western hills above, and Screaming Eagle, Dalla Valle and the old Heitz Martha's Vineyard are minutes away.\n\nOakville Cabernet combines the depth of Rutherford with a little more freshness and polish: cassis, violets, graphite and long, fine-grained tannin. Vineyards on the western alluvial fans give the most perfumed wines; the eastern side toward the Silverado Trail has heavier soils and more muscular reds.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Cabernet Franc, Merlot, Petit Verdot, Sauvignon Blanc",
 terroir="Gravelly alluvial fans from the Mayacamas on the west; volcanic-derived soils from the Vaca Range on the east; moderately warm, with fog burning off by late morning.",
 producers=["Robert Mondavi Winery", "Opus One", "Harlan Estate", "Screaming Eagle", "Dalla Valle", "Far Niente", "Heitz Cellar (Martha's Vineyard)", "Silver Oak", "Groth", "PlumpJack"],
 nerd="To Kalon today is divided among several owners (Mondavi/Constellation, Beckstoffer, Opus One, the Detert and MacDonald families), and Constellation's trademark on the name has been the subject of lawsuits."))

A.append(ava("Yountville", R,
 "Named for George C. Yount, who planted the valley's first vines in the late 1830s, Yountville (1999) sits where the valley floor starts to feel the bay: cooler and windier than Oakville, with clay-rich and gravelly soils around a few low volcanic knolls. Cabernet here is firmer and more savoury, and Merlot does well.\n\nDominus Estate is the flagship: Christian Moueix of Pomerol leased and later bought the historic Napanook vineyard (once owned by Inglenook's John Daniel Jr.), made his first Dominus in 1983, and in 1997 built a winery by Herzog & de Meuron whose walls are wire cages filled with local basalt. Domaine Chandon, Moët & Chandon's California outpost (1973), is also here.",
 sub="Napa Valley", styles=["red", "white", "sparkling"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, Chardonnay",
 terroir="Mixed alluvial and clay soils with volcanic knolls; marine air from San Pablo Bay moderates afternoons.",
 producers=["Dominus Estate", "Domaine Chandon", "Kapcsándy", "Cliff Lede (Yountville vineyards)"],
 nerd="Dominus's gabion walls let air and light filter through the stones, cooling the cellar without much air conditioning."))

A.append(ava("Stags Leap District", R,
 "A tiny AVA (1989) of about 1,200 ha below the rocky palisades of the Vaca Range on the Silverado Trail. The bare volcanic cliffs soak up and radiate heat, while afternoon wind from San Pablo Bay funnels through and cools the vines, a combination that gives Cabernet Sauvignon of ripe, silky texture over a firm core, the 'iron fist in a velvet glove' of local cliché.\n\nThis is where Warren Winiarski planted the S.L.V. vineyard in 1970, next to Nathan Fay's pioneering Cabernet. His 1973 S.L.V. Cabernet won the red flight at the Paris tasting of 1976. Stag's Leap Wine Cellars (S.L.V., FAY, Cask 23) has been wholly owned by Marchesi Antinori since 2023. Shafer's Hillside Select, Clos du Val (founded 1972) and Pine Ridge are also here.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Petit Verdot, Cabernet Franc, Sauvignon Blanc",
 terroir="Volcanic rock and gravelly loam fans at the foot of the palisades; heat reflected from bare rock, cooled by afternoon bay breezes.",
 producers=["Stag's Leap Wine Cellars", "Shafer", "Clos du Val", "Pine Ridge", "Chimney Rock", "Stags' Leap Winery", "Cliff Lede", "Quixote"],
 nerd="The AVA name carries no apostrophe at all: Stag's Leap Wine Cellars and Stags' Leap Winery fought for years over the name, a settlement let each keep its own punctuation, and TTB sidestepped the issue."))

A.append(ava("Oak Knoll District of Napa Valley", R,
 "The southernmost valley-floor AVA (2004) apart from Carneros, between the city of Napa and Yountville. Cool, foggy mornings and a long, even season suit Chardonnay, Riesling and Merlot as well as a more restrained, savoury style of Cabernet Sauvignon.\n\nTrefethen is the anchor. Its 1886 Eshcol winery, one of Napa's surviving 19th-century wooden 'ghost wineries', was badly damaged in the magnitude 6.0 South Napa earthquake of 2014 and rebuilt. Trefethen's 1976 Chardonnay was judged best Chardonnay at the 1979 Gault-Millau 'Wine Olympics' in Paris.",
 sub="Napa Valley", styles=["white", "red"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Chardonnay, Riesling, Sauvignon Blanc",
 terroir="Alluvial fans from the Mayacamas and Dry Creek, deep gravelly and clay loams; marine-cooled.",
 producers=["Trefethen Family Vineyards", "Silver Trident", "Robert Biale (Black Chicken Zinfandel sourced nearby)"],
 nerd="Oak Knoll is one of the few Napa sub-AVAs whose official name includes 'of Napa Valley', a compromise to avoid clashing with other Oak Knolls."))

A.append(ava("Mt. Veeder", R,
 "Mountain AVA (1990) in the southern Mayacamas, west of the city of Napa, with vineyards from about 150 to 750 m on steep, forested slopes. Unlike the volcanic north, much of Mt. Veeder is uplifted ancient seabed: shallow, acidic sandstone and shale soils that keep yields tiny. The wines are taut and powerful, Cabernet Sauvignon and Malbec with firm acid and dusty tannin that need years in bottle.\n\nMayacamas Vineyards, built around an 1889 stone winery, is the reference. Its 1971 Cabernet was in the 1976 Paris red flight and tied for third place at the 30th-anniversary rematch in 2006. The Hess Collection pairs mountain Cabernet with a museum of contemporary art.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Malbec, Merlot, Syrah, Zinfandel, Chardonnay",
 terroir="Shallow, sedimentary marine soils (sandstone, shale) with some volcanic intrusions; steep slopes, cooler marine-influenced climate.",
 producers=["Mayacamas Vineyards", "The Hess Collection", "Mount Veeder Winery", "Lokoya", "Mount Brave"],
 nerd="Mayacamas's 1970s Cabernets were famously hard in youth; bottles from the Travers era (1968 to 2013) are now prized for how slowly they evolved."))

A.append(ava("Atlas Peak", R,
 "High mountain AVA (1992) in the Vaca Range northeast of Napa city, with vineyards from about 230 to 800 m. The elevation keeps summer afternoons cooler than on the valley floor, nights are cold, and the red volcanic soils are thin and rocky. Cabernet Sauvignon is fresh, dark-fruited and firmly built.\n\nAtlas Peak Vineyards was founded in the 1980s by a partnership that included Piero Antinori, who planted Sangiovese here before it was fashionable; Antinori's Antica estate continues the link. On 8 October 2017 the Atlas Fire started on these slopes and burned through vineyards and homes across the district.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Sangiovese, Chardonnay",
 terroir="Shallow volcanic soils, red and rocky, on a high plateau and slopes; above the fog with cool nights.",
 producers=["Antica Napa Valley (Antinori)", "Stagecoach Vineyard (grower)", "Acumen", "Elan"],
 nerd="Atlas Peak was one of the early AVAs defined largely by elevation and is a source of Sangiovese that pre-dates the 1990s 'Cal-Ital' boom."))

A.append(ava("Howell Mountain", R,
 "The first sub-AVA lying wholly inside Napa Valley, approved in late 1983 and effective in January 1984, and still one of the most distinctive. It is a high plateau in the Vaca Range above St. Helena, and the boundary follows the 1,400-foot (about 430 m) contour, roughly the top of the summer fog layer. Vines above the fog get longer sun and cooler nights, in thin red volcanic soils and white volcanic ash (tufa).\n\nThe result is mountain Cabernet at its most monumental: deep colour, blue and black fruit, iron and graphite, and tannin that can take a decade to unwind. Randy Dunn's Howell Mountain Cabernet set the style from 1979. The stone wineries of Ladera (built 1886 for Brun and Chaix) and La Jota recall a 19th-century reputation for Zinfandel.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Zinfandel, Petite Sirah, Viognier",
 terroir="Above 430 m: red volcanic soils and white tufa ash, low fertility, sunny days above the fog and cool nights.",
 producers=["Dunn Vineyards", "La Jota", "Ladera", "O'Shaughnessy", "Outpost", "Cade", "Robert Craig"],
 nerd="Howell Mountain was one of the first AVAs anywhere defined by elevation; the 2024 Crystal Springs of Napa Valley AVA was drawn to stop exactly at Howell Mountain's 1,400-foot line."))

A.append(ava("Chiles Valley", R,
 "A small, high side valley (1999) tucked into the Vaca Range east of the main Napa Valley, at about 250 to 370 m. Cold air drains into it at night, so it is cooler than the valley floor, with a long season and a later harvest. Cabernet Sauvignon and Zinfandel are firm and fresh.\n\nThe valley takes its name from Joseph Ballinger Chiles, an early overland pioneer who received the Catacula land grant in 1844. Volker Eisele, who farmed here organically from the 1970s, was one of the leaders who defended Napa's Agricultural Preserve.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Zinfandel, Merlot, Sauvignon Blanc",
 terroir="Alluvial valley floor and surrounding slopes, cooler nights from cold-air pooling.",
 producers=["Brown Estate", "Volker Eisele Family Estate", "Kuleto Estate", "RustRidge"],
 nerd="Brown Estate, known for Zinfandel, is widely cited as the first Black-owned estate winery in Napa Valley."))

A.append(ava("Coombsville", R,
 "Coombsville (2011) is a horseshoe of hills east of the city of Napa, often described as the eroded rim of an ancient volcanic caldera. Close to the bay, it is one of Napa's coolest Cabernet areas, with fog and afternoon wind; harvest comes later and the wines show fresh acidity, red and black fruit and less overt alcohol.\n\nGrowers such as Tom Farella planted here in the 1970s, but the area was a secret source for valley wineries until the AVA gave it its own name. Syrah, Chardonnay and Pinot Noir also grow well.",
 sub="Napa Valley", styles=["red", "white"], dom="red",
 grapes="Cabernet Sauvignon, Merlot, Cabernet Franc, Syrah, Chardonnay, Pinot Noir",
 terroir="Volcanic tuff and ash on the slopes, alluvial fans below; cool marine influence from San Pablo Bay.",
 producers=["Farella", "Favia", "Palmaz", "Ancien", "Arietta"],
 nerd="The name honours Nathan Coombs, who laid out the town of Napa in 1847."))

A.append(ava("Wild Horse Valley", R,
 "A small, cool upland valley (1988) on the ridge east of Napa city that straddles the Napa-Solano county line, with most of it in Solano County. At around 300 to 600 m and open to wind from the bay, it is one of the coolest corners of the Napa Valley AVA, suited to Pinot Noir and Chardonnay. Plantings are tiny and the name rarely appears on labels.",
 sub="Napa Valley", styles=["red", "white"], dom="red", grapes="Pinot Noir, Chardonnay",
 terroir="Volcanic soils on a windy upland; cool, marine-influenced climate.",
 nerd="It is one of the few Napa sub-AVAs that lies mostly outside Napa County."))

A.append(ava("Los Carneros", R,
 "Los Carneros (1983) straddles the southern ends of Napa and Sonoma counties along San Pablo Bay, and it was one of the first AVAs drawn by climate rather than county lines. Its name means 'the rams', for the sheep that once grazed its low, rolling hills. Fog and a near-daily wind off the bay keep it cool, and the shallow, dense clay soils restrain vigour.\n\nThat made it the natural home for Pinot Noir and Chardonnay, first planted seriously by Louis M. Martini and Beaulieu (with Tchelistcheff) in the 1930s and 1940s, and later by Saintsbury (1981). Champagne and Cava houses followed: Domaine Carneros (Taittinger), Gloria Ferrer (Freixenet) and Artesa (Codorníu). Hyde and Hudson are its most famous grower vineyards; Larry Hyde's partnership with Aubert de Villaine of Domaine de la Romanée-Conti produces HdV.",
 sub="Napa Valley and Sonoma County", styles=["red", "white", "sparkling"], dom="white",
 grapes="Chardonnay, Pinot Noir, Merlot, Syrah",
 terroir="Shallow, heavy clay loams over hardpan; persistent wind and fog from San Pablo Bay; one of the coolest parts of the North Coast.",
 producers=["Domaine Carneros", "Saintsbury", "Gloria Ferrer", "Artesa", "Hyde de Villaine (HdV)", "Truchard", "Etude"],
 nerd="Carneros wines can be labeled with Napa Valley or Sonoma Valley as well as Los Carneros, depending on which side of the county line the grapes grew."))

A.append(ava("Crystal Springs of Napa Valley", R,
 "Napa's newest sub-AVA (effective November 2024) covers about 4,000 acres of the western face of the Vaca Range between St. Helena and Calistoga. TTB describes it as an all-hillside region: every slope is between 15 and 40 percent, mostly facing west to southwest, and the boundary runs from the 400-foot contour (where the foothills meet the frost-prone valley floor) up to the 1,400-foot contour where Howell Mountain begins.\n\nAbout 30 vineyards cover some 230 acres. Afternoon sun and warm air draining off the slopes make it a warm Cabernet Sauvignon site with less frost risk than the floor below. The name comes from Crystal Springs Road and the springs that gave the road its name.",
 sub="Napa Valley", styles=["red"], dom="red", grapes="Cabernet Sauvignon, Merlot, Cabernet Franc",
 terroir="All hillside, 120 to 430 m, volcanic soils on west and southwest slopes; less frost than the valley floor and less elevation cooling than Howell Mountain above.",
 nerd="Creating it also moved Calistoga's boundary, after a grower showed that one 17-acre vineyard on North Fork Crystal Springs Road would otherwise have been split between two AVAs."))

S = []
S.append(site("chateau-montelena", "us", "Chateau Montelena", "estate", "Calistoga", 38.6030, -122.5988,
 "Alfred L. Tubbs, a San Francisco rope maker, built this stone château under Mount St. Helena in 1882. Revived in 1972 by Jim Barrett, with Mike Grgich as winemaker, it made the 1973 Chardonnay that beat four white Burgundies at the 1976 Paris tasting and became the subject of the film Bottle Shock.",
 cls="Judgment of Paris winner (white), 1976", q="precise", producers=["Chateau Montelena"]))
S.append(site("stags-leap-wine-cellars", "us", "Stag's Leap Wine Cellars (S.L.V. and FAY)", "estate", "Stags Leap District", 38.3993, -122.3255,
 "Warren Winiarski bought land next to Nathan Fay's Cabernet vineyard in 1970 and planted S.L.V.; its 1973 Cabernet, from three-year-old vines, won the red flight in Paris in 1976. The estate bought FAY in 1986. Cask 23 is a blend of the two. Antinori has owned it outright since 2023.",
 cls="Judgment of Paris winner (red), 1976", producers=["Stag's Leap Wine Cellars"]))
S.append(site("to-kalon", "us", "To Kalon Vineyard", "vineyard", "Oakville", 38.4400, -122.4135,
 "Hamilton W. Crabb planted these western Oakville benchlands from 1868 and called them To Kalon, 'the highest beauty'. Robert Mondavi built his 1966 winery on its edge. Today the vineyard is split among Mondavi (Constellation), Beckstoffer, Opus One and the Detert and MacDonald families, and its Cabernets fetch some of the highest grape prices in the country.",
 cls="Historic single vineyard (1868)", q="approx", producers=["Robert Mondavi Winery", "Beckstoffer To Kalon growers", "Opus One", "MacDonald", "Detert"]))
S.append(site("robert-mondavi-winery", "us", "Robert Mondavi Winery", "estate", "Oakville", 38.4413, -122.4090,
 "Cliff May's mission-style arch on Highway 29 marks the first major winery built in Napa after Prohibition (1966). Mondavi pushed cold fermentation, French oak, varietal labels and the dry, oaked 'Fumé Blanc', and he opened his doors to visitors when tasting rooms were rare.",
 cls="Founded 1966", producers=["Robert Mondavi Winery"]))
S.append(site("opus-one", "us", "Opus One", "estate", "Oakville", 38.4369, -122.4027,
 "The joint venture of Robert Mondavi and Baron Philippe de Rothschild of Château Mouton Rothschild, announced in 1980 with the 1979 vintage. The half-buried limestone winery opened in 1991 opposite the Mondavi winery, and the wine is a single Bordeaux-style blend sold, in part, through the Bordeaux négociant system.",
 producers=["Opus One"]))
S.append(site("inglenook", "us", "Inglenook", "estate", "Rutherford", 38.4543, -122.4312,
 "Gustave Niebaum founded Inglenook around 1880 and built the ivy-covered château in 1887. Under his great-nephew John Daniel Jr. it made Cabernets such as the 1941 that are still counted among the greatest American wines. Francis Ford Coppola bought it in 1975 and restored the Inglenook name in 2011.",
 cls="Founded c. 1880", producers=["Inglenook"]))
S.append(site("beaulieu-vineyard", "us", "Beaulieu Vineyard", "estate", "Rutherford", 38.4601, -122.4234,
 "Georges de Latour founded Beaulieu in 1900 and kept it alive through Prohibition with sacramental wine for the Catholic Church. From 1938 André Tchelistcheff introduced cold fermentation, malolactic control and small French oak here, and the Georges de Latour Private Reserve (first vintage 1936) set the template for Napa Cabernet.",
 cls="Founded 1900", producers=["Beaulieu Vineyard"]))
S.append(site("schramsberg", "us", "Schramsberg Vineyards", "estate", "Diamond Mountain District", 38.5502, -122.5380,
 "Jacob Schram, a German barber, planted here in 1862 and dug caves with Chinese labourers; Robert Louis Stevenson visited in 1880 and wrote of wine as 'bottled poetry'. Jack and Jamie Davies revived the estate in 1965 for traditional-method sparkling wine, and their Blanc de Blancs was poured at Nixon's 'Toast to Peace' in Beijing in 1972.",
 cls="Founded 1862", producers=["Schramsberg"]))
S.append(site("harlan-estate", "us", "Harlan Estate", "estate", "Oakville", 38.4216, -122.4151,
 "Bill Harlan planted terraced hillside vineyards in the western Oakville hills from 1984; the first vintage was 1990. With tiny production and near-perfect scores, Harlan became one of the defining 'cult Cabernets' of the 1990s.",
 q="approx", producers=["Harlan Estate"]))
S.append(site("screaming-eagle", "us", "Screaming Eagle", "estate", "Oakville", 38.4440, -122.3870,
 "Jean Phillips bought a small vineyard on the eastern side of Oakville in 1986 and released her first Cabernet, the 1992, by mailing list. It became the archetype of the cult Napa wine. Stan Kroenke and Charles Banks bought the estate in 2006.",
 q="approx", producers=["Screaming Eagle"]))
S.append(site("dominus-napanook", "us", "Dominus Estate (Napanook)", "estate", "Yountville", 38.4090, -122.3820,
 "Christian Moueix of Château Pétrus made his first Dominus in 1983 from the Napanook vineyard, once owned by Inglenook's John Daniel Jr. The 1997 winery by Herzog & de Meuron is built of basalt-filled steel gabions.",
 q="approx", producers=["Dominus Estate"]))
S.append(site("diamond-creek", "us", "Diamond Creek Vineyards", "estate", "Diamond Mountain District", 38.5560, -122.5690,
 "Al Brounstein planted 8 ha on Diamond Mountain in 1968 and from 1972 bottled Volcanic Hill, Red Rock Terrace and Gravelly Meadow separately, the first block-by-block Cabernets in Napa. The Henriot family's Maisons & Domaines bought the estate in 2020.",
 q="approx", producers=["Diamond Creek"]))
S.append(site("heitz-marthas-vineyard", "us", "Martha's Vineyard (Heitz)", "vineyard", "Oakville", 38.4330, -122.4150,
 "Tom and Martha May's vineyard on the western edge of Oakville gave Joe Heitz a single-vineyard Cabernet from 1966, one of the first in California. Its mint and eucalyptus note made it famous; the 1974 is a legend.",
 q="approx", producers=["Heitz Cellar"]))
S.append(site("heitz-cellar", "us", "Heitz Cellar", "estate", "St. Helena", 38.4907, -122.4509,
 "Joe and Alice Heitz founded their winery in 1961 and made Martha's Vineyard Cabernet one of the first famous single-vineyard wines in America. The Heitz 1970 Martha's Vineyard topped one of the 1986 Paris rematch tastings.",
 producers=["Heitz Cellar"]))
S.append(site("mayacamas", "us", "Mayacamas Vineyards", "estate", "Mt. Veeder", 38.3710, -122.4195,
 "John Henry Fisher built the stone winery high on Mt. Veeder in 1889. Under Bob and Elinor Travers (1968 to 2013) it made slow-ageing Cabernet; the 1971 was in the 1976 Paris tasting and tied for third in the 2006 rematch.",
 q="approx", producers=["Mayacamas Vineyards"]))
S.append(site("charles-krug", "us", "Charles Krug Winery", "historic", "St. Helena", 38.5178, -122.4795,
 "Founded in 1861 by Prussian immigrant Charles Krug, Napa's first commercial winery. Cesare Mondavi bought it in 1943; a family quarrel there in 1965 sent his son Robert off to build his own winery at Oakville.",
 cls="Founded 1861", q="approx", producers=["Charles Krug"]))
S.append(site("beringer-rhine-house", "us", "Beringer Rhine House", "historic", "St. Helena", 38.5107, -122.4823,
 "Jacob and Frederick Beringer founded the winery in 1876 and dug tunnels into the hillside; Frederick's 1884 Rhine House copies the family home in Mainz. Beringer stayed open through Prohibition with sacramental wine.",
 cls="Founded 1876", q="approx", producers=["Beringer"]))
S.append(site("trefethen-eshcol", "us", "Trefethen (Eshcol winery)", "historic", "Oak Knoll District of Napa Valley", 38.3548, -122.3263,
 "The three-storey wooden Eshcol winery was built in 1886 for the Goodman brothers to a design by Hamden McIntyre. The Trefethens bought it in 1968; their 1976 Chardonnay was named best Chardonnay at the 1979 Gault-Millau tasting in Paris. The building leaned badly after the 2014 earthquake and was restored.",
 q="approx", producers=["Trefethen Family Vineyards"]))
S.append(site("far-niente", "us", "Far Niente", "estate", "Oakville", 38.4257, -122.4032,
 "John Benson built Far Niente ('without a care') in 1885 with architect Hamden McIntyre. Abandoned after Prohibition, it was restored from 1979 by Gil Nickel and is known for Oakville Cabernet and Chardonnay.",
 cls="Founded 1885", producers=["Far Niente"]))
S.append(site("domaine-carneros", "us", "Domaine Carneros", "house", "Los Carneros", 38.2537, -122.3445,
 "Champagne Taittinger's California sparkling house (1987), built as a copy of the 18th-century Château de la Marquetterie in Champagne and sitting on a knoll above Carneros vineyards.",
 q="approx", producers=["Domaine Carneros"]))

save_part("p01_napa", regions=regions, appellations=A, sites=S)
