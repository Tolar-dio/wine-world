"""Australia appellations: South Australia (state GI, super zone, zones, regions, subregions)."""

# fields: name, sub (Zone/Region/Subregion/State/Super zone), state, zone, styles, dom, grapes, summary, terroir, producers, nerd, contains
A = []


def g(**k):
    A.append(k)


g(name="South Australia", sub="State", state="South Australia", zone=None, styles=["red", "white", "sparkling", "fortified"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Chardonnay, Grenache, Riesling, Merlot",
  summary="The state GI covers every vineyard in South Australia and appears on blends drawn from several regions, such as multi-regional Shiraz from the big companies. South Australia crushes roughly half of Australia's grapes, and as a phylloxera-free state with tight quarantine on vine material it holds most of the country's pre-1900 plantings.",
  terroir="From the hot, irrigated Riverland to the cool Limestone Coast and the elevated Mount Lofty Ranges; the common thread is winter rainfall and dry summers.",
  producers=["Penfolds", "Yalumba", "Hardys", "Jacob's Creek"],
  nerd="Vinehealth Australia (originally the Phylloxera Board of South Australia, created under an 1899 act) still controls the movement of vines, used machinery and even grape bins into the state.",
  contains=["Adelaide", "Barossa", "Mount Lofty Ranges", "Fleurieu", "Limestone Coast", "Lower Murray", "Far North", "The Peninsulas"])

g(name="Adelaide", sub="Super zone", state="South Australia", zone=None, styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Grenache, Chardonnay",
  summary="A 'super zone' wrapping the Mount Lofty Ranges, Fleurieu and Barossa zones, created so that wines blended across the hills and plains near the city can carry a place name more specific than South Australia. It is used mainly for multi-regional blends; its value is that it guarantees the fruit is from the cooler, older vineyards near the capital rather than the irrigated Riverland.",
  terroir="Includes everything from Barossa's valley floor to the Adelaide Hills at 700 m and the coastal Fleurieu.",
  producers=["Penfolds", "Hardys"], nerd="Adelaide is the only super zone inside a single state; South Eastern Australia, the other super zone, straddles five.",
  contains=["Barossa", "Mount Lofty Ranges", "Fleurieu"], lat=-34.9, lon=138.75)

g(name="Barossa", sub="Zone", state="South Australia", zone="Barossa", styles=["red", "white", "fortified", "sparkling"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Grenache, Mourvèdre, Riesling, Semillon",
  summary="The Barossa zone joins the warm valley floor of the Barossa Valley with the cooler, higher Eden Valley to the east. Wines labelled simply 'Barossa' are usually blends across both, a historic practice: Barossa winemakers have long balanced the density of valley-floor Shiraz with the acidity and perfume of Eden Valley fruit. The two regions share a history of Silesian settlement, Lutheran churches and family growers whose names (Hoffmann, Kalleske, Lindner, Henschke) recur on labels and vineyard registers.",
  terroir="A single zone of about 1,690 square kilometres with 13,500 ha of vines, rising from about 110 m on the North Para River to over 600 m on the Barossa Range.",
  producers=["Penfolds", "Yalumba", "Henschke", "Seppeltsfield", "Torbreck"],
  nerd="The Barossa Old Vine Charter applies across the zone, so an Ancestor vineyard (125 years or older) can be in either the valley or Eden Valley.",
  contains=["Barossa Valley", "Eden Valley"])

g(name="Barossa Valley", sub="Region", state="South Australia", zone="Barossa", styles=["red", "white", "fortified", "rose"], dom="red",
  grapes="Shiraz (about half the vineyard), Cabernet Sauvignon, Grenache, Mourvèdre (Mataro), Semillon, Riesling",
  summary="The Barossa Valley is the heartland of Australian Shiraz and holds some of the oldest producing vines on earth. A shallow valley 25 km long, drained by the North Para River 60 km north-east of Adelaide, it was settled from 1842 by Lutheran farmers from Prussian Silesia, who called it 'Neu-Schlesien'. They planted mixed farms with a few rows of vines; when the fortified-wine boom came in the late nineteenth century the vines became the crop. Because South Australia kept phylloxera out, many of those own-rooted, dry-grown bush vines still crop: Langmeil's Freedom Shiraz (1843), Cirillo's Grenache at Light Pass (1848), Turkey Flat's Shiraz at Bethany, Hewitson's Old Garden Mourvèdre (1853) and Penfolds' Block 42 Cabernet at Kalimna (1888).\n\nFor decades this fruit went into fortified wine and then into anonymous blends; in the 1980s, with a government vine-pull scheme paying growers to grub up old vines, much was lost. Peter Lehmann, who guaranteed to buy growers' grapes during the crisis, Robert O'Callaghan at Rockford and Charlie Melton saved what remained, and in the 1990s American critics fell for the ripe, dense, chocolate-and-blackberry style. Since the 2010s the style has moved toward earlier picking, less new oak and more whole-bunch Grenache and Mataro, without losing the region's generosity.\n\nThe Barossa Old Vine Charter registers vines by age (Old 35+, Survivor 70+, Centenarian 100+, Ancestor 125+). The Barossa Grounds project grouped the valley's soils and climates into broad zones (commonly called the Northern Grounds around Moppa, Ebenezer and Greenock, which give the darkest, most tannic Shiraz; the Central Grounds around Marananga, Seppeltsfield and Tanunda; the warmer, sandier Southern Grounds around Rowland Flat and Lyndoch; and the cooler Eastern Edge and Western Ridge), which producers now cite on labels as informal sub-districts.",
  terroir="Warm and dry: Wine Australia records about 1,970 growing degree days and 209 mm of growing-season rain, so most of the oldest vines are dry-grown and rely on deep soils that hold winter rain. Soils change over short distances, from red-brown clay loams and ironstone in the north and west (Marananga, Greenock, Ebenezer) to deep sand over clay at Light Pass and Vine Vale and grey sandy loams in the south. Altitude runs from about 110 m on the valley floor to almost 600 m on the western ridge.",
  producers=["Penfolds", "Torbreck", "Rockford", "Langmeil", "Turkey Flat", "Seppeltsfield", "Yalumba", "Peter Lehmann", "Charles Melton", "Two Hands", "Kalleske", "John Duval", "Greenock Creek", "Hentley Farm", "Sami-Odi", "St Hallett", "Elderton", "Saltram"],
  nerd="Penfolds' Block 42 at Kalimna, planted around 1888, is thought to be the oldest continuously producing Cabernet Sauvignon vineyard in the world; it is bottled alone only in exceptional years.",
  contains=["Northern Grounds (informal)", "Central Grounds (informal)", "Southern Grounds (informal)", "Eastern Edge (informal)", "Western Ridge (informal)"])

g(name="Eden Valley", sub="Region", state="South Australia", zone="Barossa", styles=["white", "red", "sparkling"], dom="white",
  grapes="Riesling, Shiraz, Chardonnay, Cabernet Sauvignon, Viognier",
  summary="Eden Valley is the high, cool eastern half of the Barossa: rolling granite and schist country at 400 to 600 m, with gum trees, sheep paddocks and widely spaced vineyards. It makes two of Australia's greatest wines. Its Riesling is fine, floral and lime-scented, more delicate than Clare's and capable of decades in bottle (Pewsey Vale, Heggies, Henschke Julius, Mesh). And its old Shiraz, above all Henschke's Hill of Grace and Mount Edelstone, shows that Australian Shiraz can be about perfume, spice and silk rather than weight.\n\nSettlement began in the 1840s: Joseph Gilbert planted Pewsey Vale in 1847, and Johann Christian Henschke, a Silesian, started making wine at Keyneton in 1868. The Hill of Grace vineyard, named after the Gnadenberg (Hill of Grace) Lutheran church opposite, holds Shiraz planted in the 1860s; Cyril Henschke first bottled it alone with the 1958 vintage, a pioneering single-vineyard release. Yalumba revived Eden Valley Riesling and planted Viognier there in 1980, one of the first serious plantings in the New World.",
  terroir="About 1,800 growing degree days on Wine Australia's measure, but cold nights and wind make it feel cooler than the figure. Soils are thin and stony, derived from weathered granite, schist, ironstone and quartz, giving low yields. Altitude runs from about 220 m to over 630 m.",
  producers=["Henschke", "Pewsey Vale", "Heggies", "Mountadam", "Eden Hall", "Mesh", "Flaxman", "Poonawatta", "Yalumba", "Torzi Matthews"],
  nerd="The 'Grandfathers' in Hill of Grace are Shiraz vines planted in the 1860s by Nicolaus Stanitzki; Henschke propagates new plantings from them using its own massal selection.",
  contains=["High Eden"])

g(name="High Eden", sub="Subregion", state="South Australia", zone="Barossa", styles=["white", "red", "sparkling"], dom="white",
  grapes="Riesling, Chardonnay, Shiraz, Pinot Noir",
  summary="The highest part of Eden Valley, registered as a subregion in 2001, around the Barossa Range above Springton and Flaxman Valley. It was championed by David Wynn, who left the family's Wynns business to plant Mountadam here in 1972 and made one of Australia's early cool-climate Chardonnays. Riesling is tight and slow to open; Chardonnay and sparkling base are crisp.",
  terroir="Altitudes up to about 630 m, on quartzite, schist and sandy soils, cooler and windier than the rest of Eden Valley.",
  producers=["Mountadam", "Pewsey Vale", "Eden Hall"], nerd="At 46 square kilometres, High Eden is one of the smallest registered GIs in Australia.", contains=[])

g(name="Mount Lofty Ranges", sub="Zone", state="South Australia", zone="Mount Lofty Ranges", styles=["white", "red", "sparkling"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Riesling, Chardonnay, Sauvignon Blanc",
  summary="The zone that follows the Mount Lofty Ranges north and south of Adelaide, grouping three very different regions: the cool Adelaide Hills, the warm Clare Valley 100 km north, and the flat Adelaide Plains. It is rarely seen on labels; its regions do the work.",
  terroir="Elevations rise to over 700 m in the Adelaide Hills; the ranges catch more rain than the plains and the Barossa.", producers=["Petaluma", "Grosset", "Shaw + Smith"], nerd="The Clare Valley sits in this zone, not in the Barossa zone, even though Clare and Barossa are often discussed together.", contains=["Adelaide Hills", "Clare Valley", "Adelaide Plains"])

g(name="Adelaide Hills", sub="Region", state="South Australia", zone="Mount Lofty Ranges", styles=["white", "red", "sparkling", "orange"], dom="white",
  grapes="Sauvignon Blanc, Chardonnay, Pinot Noir, Shiraz, Pinot Gris, Grüner Veltliner, Nebbiolo",
  summary="A long, narrow region of hills, orchards and stringybark forest running about 70 km along the Mount Lofty Ranges east of Adelaide. Vineyards sit at roughly 300 to 700 m, which makes it one of the coolest regions in mainland South Australia, and it has become the state's centre for Sauvignon Blanc, Chardonnay, Pinot Noir, cool-climate Shiraz and traditional-method sparkling.\n\nGerman settlers planted vines at Hahndorf and Lobethal in the nineteenth century, but by the 1930s the Hills were orchard country. The modern era began with Brian Croser's Petaluma, whose Piccadilly Valley Chardonnay (from 1976 onward) and Croser sparkling proved the site, followed by Henschke at Lenswood, Stephen George's Ashton Hills (Pinot Noir) and Shaw + Smith, whose 1989 Sauvignon Blanc became a benchmark. In the 2000s and 2010s the Basket Range area became the heart of Australia's natural-wine movement, with Lucy Margaux, BK Wines, Ochota Barrels and Commune of Buttons making skin-contact whites, light reds and pét-nats.",
  terroir="About 1,710 growing degree days on Wine Australia's data, with 740 mm of annual rain, more than the Barossa or McLaren Vale. Soils are mostly ancient sandstones, schist, quartzite and siltstone, often weathered to grey-brown loam over clay. The northern end (Gumeracha, Birdwood) is warmer; the central Piccadilly Valley and Lenswood are the coolest and wettest.",
  producers=["Petaluma", "Shaw + Smith", "Ashton Hills", "Tapanappa", "Henschke", "Ochota Barrels", "Lucy Margaux", "BK Wines", "Murdoch Hill", "Hahndorf Hill", "Deviation Road", "Bird in Hand", "Sidewood"],
  nerd="Hahndorf Hill planted Grüner Veltliner in 2006 from Austrian clones imported through quarantine, and the Hills now grow most of Australia's Grüner.",
  contains=["Lenswood", "Piccadilly Valley"])

g(name="Lenswood", sub="Subregion", state="South Australia", zone="Mount Lofty Ranges", styles=["white", "red"], dom="white",
  grapes="Chardonnay, Pinot Noir, Sauvignon Blanc, Riesling",
  summary="A high, apple-growing valley in the central Adelaide Hills, registered in 1998 as one of Australia's first subregions. Henschke's Lenswood vineyard (Croft Chardonnay, Giles Pinot Noir), Knappstein Lenswood and Pike & Joyce showed its Chardonnay and Pinot have the acidity for long ageing.",
  terroir="Steep slopes at roughly 400 to 560 m, on podzolic soils over sandstone and schist; cooler and wetter than most of the Hills.",
  producers=["Henschke", "Pike & Joyce", "Anvers", "Geoff Weaver"], nerd="Lenswood is only about 39 square kilometres, among the smallest GIs in Australia.", contains=[])

g(name="Piccadilly Valley", sub="Subregion", state="South Australia", zone="Mount Lofty Ranges", styles=["white", "sparkling", "red"], dom="white",
  grapes="Chardonnay, Pinot Noir, Sauvignon Blanc",
  summary="A small, cool valley beneath Mount Lofty, registered in 2000. Brian Croser planted Petaluma's Tiers vineyard here in 1979, and the Tiers Chardonnay (now under Croser's Tapanappa label) is one of Australia's most precise. It is also prime country for sparkling base wine.",
  terroir="Among the highest and wettest vineyards in the Hills, at about 500 to 700 m, on brown loam over clay and sandstone.",
  producers=["Tapanappa", "Petaluma", "Nepenthe"], nerd="At about 42 square kilometres with 221 ha of vines, Piccadilly Valley produces less than a single big Riverland vineyard but some of the country's most expensive Chardonnay.", contains=[])

g(name="Clare Valley", sub="Region", state="South Australia", zone="Mount Lofty Ranges", styles=["white", "red"], dom="white",
  grapes="Riesling, Shiraz, Cabernet Sauvignon, Grenache, Semillon, Malbec",
  summary="The Clare Valley, 120 km north of Adelaide, is not one valley but a series of narrow north-south valleys on a plateau between about 300 and 500 m, and it is Australia's most famous source of dry Riesling. Clare Riesling is bone dry, smells of lime juice and lime blossom when young, and turns to toast, honey and kerosene over ten to twenty years. The region also makes structured Shiraz and Cabernet, from estates such as Wendouree and Jim Barry, that need years to soften.\n\nSettlement was varied: the Austrian Jesuits founded Sevenhill in 1851 to make altar wine (they still do), Polish immigrants settled the Polish Hill River valley from 1856, and English and Cornish miners worked the copper mines at nearby Burra. Two sub-areas define Clare Riesling. Watervale, in the south, has red-brown loam over limestone and gives more floral, generous, earlier-drinking wines; Polish Hill, in a side valley to the east, has hard slate and shale and gives austere, tightly wound wines that need time.\n\nClare also changed how the world closes bottles. In August 2000, fourteen producers including Grosset, Mount Horrocks, Taylors, Leasingham, Mitchell and Knappstein announced they would bottle Riesling together under screwcap, with bottles from Saverglass and caps from Pechiney, because cork taint was ruining at least one bottle in twenty. It worked: aromatic Riesling ages slowly and predictably under screwcap, and within a decade most of Australia and New Zealand had switched.",
  terroir="Wine Australia records about 1,950 growing degree days, warmer than its reputation suggests, but cool nights, altitude and afternoon breezes preserve acidity. Soils are a patchwork: terra rossa and red loam over limestone at Watervale and Auburn, slate and shale at Polish Hill, sandy loam around Sevenhill and Penwortham.",
  producers=["Grosset", "Wendouree", "Jim Barry", "Kilikanoon", "Mount Horrocks", "Pikes", "Tim Adams", "Taylors (Wakefield)", "Sevenhill Cellars", "Skillogalee", "Leo Buring", "O'Leary Walker", "Mitchell", "Koerner"],
  nerd="Jim Barry's Florita vineyard at Watervale was bought from Leo Buring in 1986; John Vickery's Leo Buring Rieslings made from it in the 1960s and 1970s are among the oldest Australian Rieslings still drinking well.",
  contains=["Watervale (informal)", "Polish Hill River (informal)", "Sevenhill (informal)", "Auburn (informal)"])

g(name="Adelaide Plains", sub="Region", state="South Australia", zone="Mount Lofty Ranges", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Merlot, Colombard, Nero d'Avola",
  summary="Flat, hot market-garden country north of Adelaide around Virginia and Angle Vale, registered in 2002. Much of the fruit goes into blends, but Primo Estate (Joe Grilli, who first made Colombard famous here and created the amarone-style Joseph Moda) and Ceravolo show the region can make characterful wine.",
  terroir="About 2,250 growing degree days and under 400 mm of annual rain; flat alluvial soils near Gulf St Vincent, irrigated.",
  producers=["Primo Estate", "Ceravolo", "Old Plains"], nerd="Primo Estate's Joseph Moda Cabernet Merlot uses partially dried grapes, an Australian take on the Veneto's appassimento.", contains=[])

g(name="Fleurieu", sub="Zone", state="South Australia", zone="Fleurieu", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Grenache, Chardonnay",
  summary="The zone covering the Fleurieu Peninsula south of Adelaide and Kangaroo Island. It includes McLaren Vale, Langhorne Creek, Currency Creek, Southern Fleurieu and Kangaroo Island, and together these crush around 15,000 hectares' worth of fruit, much of it red.",
  terroir="Strong maritime influence from Gulf St Vincent, the Southern Ocean and Lake Alexandrina.", producers=["Hardys", "d'Arenberg", "Bleasdale"], nerd="Langhorne Creek's high yields make the Fleurieu one of the biggest-volume zones outside the irrigated inland.", contains=["McLaren Vale", "Langhorne Creek", "Currency Creek", "Southern Fleurieu", "Kangaroo Island"])

g(name="McLaren Vale", sub="Region", state="South Australia", zone="Fleurieu", styles=["red", "white", "rose", "fortified"], dom="red",
  grapes="Shiraz, Grenache, Cabernet Sauvignon, Mourvèdre, Fiano, Nero d'Avola, Vermentino, Tempranillo",
  summary="McLaren Vale is a Mediterranean pocket between the Mount Lofty Ranges and Gulf St Vincent, 40 minutes south of Adelaide, and it makes some of Australia's most interesting warm-climate reds. It was planted almost as soon as South Australia was settled: John Reynell put in vines at Reynella in 1838, and Thomas Hardy, who bought Tintara in 1876, built the business that became the country's biggest wine company. Old dry-grown Shiraz and Grenache survive across the region, many over 80 years old.\n\nThe style of the region changed after 2000. Shiraz remains the main grape, but Grenache from the deep sands of Blewitt Springs, picked earlier and made with whole bunches, has become its signature: pale, perfumed and fine, from producers such as Yangarra, SC Pannell, Bekkers, Ox Hardy and Clarendon Hills. Hot, dry summers and limited water have pushed growers toward Mediterranean varieties: Coriole was among the first to plant Sangiovese and Fiano, and Fiano, Vermentino, Nero d'Avola, Montepulciano and Tempranillo are spreading. The region also leads Australia in organic and biodynamic certification.\n\nMcLaren Vale's growers mapped their geology in 2010 and found around 40 rock and soil units, ranging from recent sands to rocks more than 500 million years old. The region now uses an informal district map with names such as Blewitt Springs, Clarendon, Kangarilla, McLaren Flat, Seaview, Willunga and Sellicks Foothills, so drinkers can tell a sandy, perfumed Blewitt Springs Grenache from a dense, ironstone-grown Seaview Shiraz.",
  terroir="About 1,940 growing degree days and only 211 mm of growing-season rain. Afternoon sea breezes off Gulf St Vincent moderate the heat. Soils vary sharply: deep, white-grey sands over clay at Blewitt Springs, ironstone and red clay at Seaview, terra rossa and limestone in the south around Willunga, and older siltstones and quartzites near the hills at Clarendon (up to about 400 m).",
  producers=["d'Arenberg", "Yangarra", "SC Pannell", "Wirra Wirra", "Coriole", "Clarendon Hills", "Hardys", "Kay Brothers", "Chapel Hill", "Samuel's Gorge", "Bekkers", "Ox Hardy", "Hither & Yon", "Mitolo", "Paxton", "Gemtree", "Brash Higgins", "Ministry of Clouds"],
  nerd="d'Arenberg still uses open fermenters and basket presses for its reds, foot-treading the fruit; in 2017 it opened the d'Arenberg Cube, a five-storey glass Rubik's-cube-shaped cellar door.",
  contains=["Blewitt Springs (informal district)", "Clarendon (informal district)", "Seaview (informal district)", "McLaren Flat (informal district)", "Kangarilla (informal district)", "Willunga (informal district)", "Sellicks Foothills (informal district)"])

g(name="Langhorne Creek", sub="Region", state="South Australia", zone="Fleurieu", styles=["red", "white", "fortified"], dom="red",
  grapes="Cabernet Sauvignon, Shiraz, Merlot, Malbec, Chardonnay",
  summary="A flat, quiet region on the floodplains of the Bremer and Angas rivers near Lake Alexandrina, and one of Australia's great unsung sources of soft, fleshy red. It has about 6,100 ha of vines, more than McLaren Vale's area of land would suggest, and much of its fruit disappears into famous blends: Wolf Blass's Black Label and many big-company Cabernet Shiraz blends rely on it.\n\nFrank Potts founded Bleasdale here in 1850 and the family still runs it; Potts cut red gum from the riverbanks to build a huge lever press that still stands. Growers historically flooded their vineyards in winter by diverting the rivers, and the 'Lake Doctor', an afternoon breeze off Lake Alexandrina, cools ripening fruit. Saltram's Metala vineyard dates from 1891.",
  terroir="Low-lying (under 65 m), with deep alluvial sandy loams over clay. About 1,970 growing degree days but only 389 mm of annual rain, so water from the lake and rivers matters.",
  producers=["Bleasdale", "Bremerton", "Lake Breeze", "Heartland", "Saltram (Metala)", "Wolf Blass", "Kimbolton"],
  nerd="Bleasdale's red gum lever press, built in 1892 from a single tree trunk, worked until 1960 and is still on site.", contains=[])

g(name="Currency Creek", sub="Region", state="South Australia", zone="Fleurieu", styles=["red", "white"], dom="red",
  grapes="Cabernet Sauvignon, Shiraz, Chardonnay, Sauvignon Blanc",
  summary="A small region near Goolwa and the Murray Mouth, registered in 2001, with vineyards planted mostly since the 1990s. Its maritime climate and sandy soils give fruit-forward reds and fresh whites, much of it sold to larger wineries.",
  terroir="Close to Lake Alexandrina and the Southern Ocean; about 1,870 growing degree days and 460 mm of rain.", producers=["Ballast Stone", "Currency Creek Estate"], nerd="The region's name comes from a creek named in 1837 after the cutter 'Currency Lass'.", contains=[])

g(name="Kangaroo Island", sub="Region", state="South Australia", zone="Fleurieu", styles=["red", "white"], dom="red",
  grapes="Cabernet Sauvignon, Shiraz, Chardonnay, Sauvignon Blanc",
  summary="Australia's third-largest island, 13 km off the Fleurieu Peninsula, has about 144 ha of vines spread among small family producers. The bushfires of December 2019 and January 2020 burnt about half the island and damaged several vineyards.",
  terroir="Cool and maritime (about 1,625 growing degree days), with laterite and ironstone soils.", producers=["The Islander Estate", "Dudley Wines", "False Cape"], nerd="The Islander Estate was founded by Jacques Lurton of the Bordeaux family.", contains=[])

g(name="Southern Fleurieu", sub="Region", state="South Australia", zone="Fleurieu", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Sauvignon Blanc, Pinot Noir",
  summary="The hilly tip of the Fleurieu Peninsula, from Mount Compass to Cape Jervis and Victor Harbor, registered in 2001. Cooler and wetter than McLaren Vale next door, it suits Sauvignon Blanc, Chardonnay and medium-bodied reds.",
  terroir="About 1,640 growing degree days and 700 mm of annual rain, with Southern Ocean winds.", producers=["Salomon Estate", "Mosquito Hill"], nerd="Salomon Estate's founder Bert Salomon is an Austrian winemaker who works vintages in both hemispheres.", contains=[])

g(name="Limestone Coast", sub="Zone", state="South Australia", zone="Limestone Coast", styles=["red", "white", "sparkling"], dom="red",
  grapes="Cabernet Sauvignon, Shiraz, Merlot, Chardonnay, Sauvignon Blanc",
  summary="The flat south-east corner of South Australia, a former seabed of limestone ridges and swamps that runs from Padthaway to Mount Gambier. Its regions (Coonawarra, Wrattonbully, Padthaway, Mount Benson, Robe and Mount Gambier) share cool maritime air and soils of terra rossa or sand over limestone, and together grow about 15,400 ha of vines.",
  terroir="Low relief, high water tables and a cool climate moderated by the Southern Ocean.", producers=["Wynns Coonawarra Estate", "Majella", "Tapanappa"], nerd="'Limestone Coast' on a label often means a blend from Coonawarra, Wrattonbully and Padthaway.", contains=["Coonawarra", "Wrattonbully", "Padthaway", "Mount Benson", "Robe", "Mount Gambier"])

g(name="Coonawarra", sub="Region", state="South Australia", zone="Limestone Coast", styles=["red", "white"], dom="red",
  grapes="Cabernet Sauvignon (more than half the vineyard), Shiraz, Merlot, Chardonnay",
  summary="Coonawarra is Australia's most famous Cabernet Sauvignon region, and its fame rests on a strip of soil. A narrow band of bright red terra rossa over soft white limestone, about 15 km long and rarely more than 2 km wide, runs north from Penola across flat country otherwise covered by black, poorly drained clays. Vines on the red strip ripen Cabernet with intense blackcurrant fruit, a mint and eucalyptus lift and firm but fine tannins.\n\nThe district was invented by John Riddoch, a Scottish pastoralist who in 1890 subdivided part of his property into small blocks for his Penola Fruit Colony and in 1891 built a stone winery with three gables. Bill Redman made the wine from 1901 and kept Coonawarra going through the lean decades; in 1951 the Wynn family bought Riddoch's winery and launched Wynns Coonawarra Estate, whose triple-gabled label is still the region's emblem. Mildara, Lindemans, Penfolds and others followed in the 1960s and 1970s.\n\nBecause the soil made the name, the boundary became a decade-long legal fight in the 1990s and early 2000s, as growers on black soil, those just outside and those on the terra rossa argued over what Coonawarra meant. The final boundary (registered in 2003) is broader than the red strip, so the best producers name the soil and the vineyard. The region's water table is high, so vines need little irrigation and suffer little from drought, but spring frost is a real risk.",
  terroir="Cool for its latitude: Wine Australia records about 1,570 growing degree days and a mean January temperature near 20.6 degrees C. Terra rossa (iron-rich red clay loam 20 to 50 cm deep) sits on calcrete and porous limestone; outside the strip are rendzina black soils and sandy flats. Altitude barely varies (about 50 to 130 m).",
  producers=["Wynns Coonawarra Estate", "Majella", "Balnaves", "Katnook", "Parker Coonawarra Estate", "Bowen Estate", "Zema", "Hollick", "Rymill", "Penley", "Leconfield", "Redman", "Lindeman's"],
  nerd="Wynns made its first Black Label Cabernet Sauvignon in 1954; the flagship John Riddoch Cabernet, named after the founder, followed with the 1982 vintage.",
  contains=[])

g(name="Wrattonbully", sub="Region", state="South Australia", zone="Limestone Coast", styles=["red", "white"], dom="red",
  grapes="Cabernet Sauvignon, Shiraz, Merlot, Cabernet Franc, Tempranillo",
  summary="Wrattonbully sits just north of Coonawarra and shares its terra rossa over limestone, but its land is more undulating and less prone to frost, and it ripens grapes a little earlier. Most vineyards date from the 1990s, many owned by big companies whose fruit goes into Coonawarra-style blends. Brian Croser's Tapanappa makes its Whalebone Vineyard Cabernet Shiraz here from vines planted in 1974, named for a 35-million-year-old whale skeleton found in a cave beneath it.",
  terroir="About 1,650 growing degree days; terra rossa and sandy loam over limestone, at 75 to 150 m, with caves and sinkholes in the karst below.",
  producers=["Tapanappa", "Terre à Terre", "Smith & Hooper", "Ruckus Estate", "Yalumba"], nerd="The Naracoorte Caves, a World Heritage fossil site, lie at the region's edge in the same limestone.", contains=[])

g(name="Padthaway", sub="Region", state="South Australia", zone="Limestone Coast", styles=["white", "red", "sparkling"], dom="red",
  grapes="Chardonnay, Shiraz, Cabernet Sauvignon, Sauvignon Blanc",
  summary="Planted from the 1960s by Seppelt and Lindemans, who were looking for cheap land with good water and a cool climate, Padthaway (originally called Keppoch) became a major source of Chardonnay for national brands; Hardys' Eileen Hardy Chardonnay long relied on it. Today it supplies Shiraz and Cabernet too, with a few local labels.",
  terroir="Terra rossa and sandy loams over limestone, on a low ridge; about 1,700 growing degree days and 480 mm of rain, warmer than Coonawarra.",
  producers=["Henry's Drive", "Browns of Padthaway", "Padthaway Estate"], nerd="Padthaway Estate operates in a former homestead built in 1882 and was one of the first to make traditional-method sparkling in the region.", contains=[])

g(name="Mount Benson", sub="Region", state="South Australia", zone="Limestone Coast", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Sauvignon Blanc, Chardonnay",
  summary="A coastal region near Kingston SE, planted from the late 1980s, notable for investment from the Rhône: Michel Chapoutier planted biodynamic Shiraz here in the late 1990s. The climate is cool and windy, giving peppery Shiraz.",
  terroir="Terra rossa and sand over limestone within sight of the ocean; about 1,520 growing degree days.", producers=["M. Chapoutier Australia", "Cape Jaffa", "Norfolk Rise"], nerd="Chapoutier's Mount Benson vineyard was one of the first biodynamic plantings in South Australia.", contains=[])

g(name="Robe", sub="Region", state="South Australia", zone="Limestone Coast", styles=["red", "white", "sparkling"], dom="red",
  grapes="Cabernet Sauvignon, Shiraz, Chardonnay, Pinot Noir",
  summary="A cool coastal region around the fishing town of Robe, registered in 2006. Large vineyards supply fruit to Treasury Wine Estates and others; local sparkling and Pinot show the climate.",
  terroir="One of the coolest Limestone Coast regions (about 1,485 growing degree days), on limestone ridges and sand.", producers=["Woodsoak", "Karatta"], nerd="Robe was a landing point for thousands of Chinese gold seekers in the 1850s, who walked from here to the Victorian goldfields to avoid a landing tax.", contains=[])

g(name="Mount Gambier", sub="Region", state="South Australia", zone="Limestone Coast", styles=["white", "red", "sparkling"], dom="white",
  grapes="Pinot Noir, Sauvignon Blanc, Chardonnay, Riesling",
  summary="South Australia's coolest region, around the extinct volcano and Blue Lake at Mount Gambier, registered in 2010. Small vineyards make crisp whites, Pinot Noir and sparkling base.",
  terroir="About 1,450 growing degree days, volcanic and limestone soils, frequent cloud and wind.", producers=["Herbert Vineyard", "Coola Road"], nerd="The Blue Lake in the volcano's crater turns cobalt blue every November.", contains=[])

g(name="Lower Murray", sub="Zone", state="South Australia", zone="Lower Murray", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Chardonnay, Merlot",
  summary="The zone covering South Australia's stretch of the Murray River, whose only region is the Riverland. It is the largest wine-producing zone in the state by volume.", terroir="Hot, dry and irrigated from the Murray.",
  producers=["Angove", "Accolade"], nerd="", contains=["Riverland"])

g(name="Riverland", sub="Region", state="South Australia", zone="Lower Murray", styles=["red", "white", "fortified"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Chardonnay, Merlot, Colombard, Petit Verdot, Nero d'Avola, Montepulciano, Fiano",
  summary="The Riverland, along the Murray around Renmark, Berri, Loxton and Waikerie, is Australia's largest wine region by tonnage, with about 21,800 ha of vines. In 2026 it crushed about 389,000 tonnes, roughly 30 percent of the national total, even in a short year. The Canadian Chaffey brothers began irrigation at Renmark in 1887, and soldier-settler blocks after both world wars filled it with family growers. Its fruit makes cask, bulk and branded wine for the world.\n\nThe Riverland is also where Australia is rethinking warm-climate wine. Growers such as Ashley Ratcliff (Ricca Terra), 919 Wines, Bassham and Delinquente have planted Nero d'Avola, Montepulciano, Fiano, Vermentino and Touriga Nacional, varieties that hold acidity in the heat and need less water. The falling demand for cheap red since 2020 has hit the region hardest: many growers have left grapes unpicked or pulled out vines.",
  terroir="Hot and dry: about 2,350 growing degree days, 148 mm of growing-season rain and 254 mm a year. Every vine depends on Murray water allocations. Sandy loams over limestone (mallee country).",
  producers=["Angove", "Banrock Station", "Berri Estates", "Ricca Terra", "919 Wines", "Delinquente", "Bassham"],
  nerd="Angove's, founded in 1886 near Adelaide, moved to Renmark in 1910 and later invented one of the first commercial wine casks with a tap in the 1960s.", contains=[])

g(name="Far North", sub="Zone", state="South Australia", zone="Far North", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Riesling",
  summary="A vast zone covering the north of South Australia, from the Flinders Ranges to the deserts, whose only region is the Southern Flinders Ranges. Almost all of its 858,000 square kilometres are desert with no vines.", terroir="", producers=[], nerd="", contains=["Southern Flinders Ranges"])

g(name="Southern Flinders Ranges", sub="Region", state="South Australia", zone="Far North", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Riesling, Grenache",
  summary="Small vineyards in the hills around Wirrabara, Port Pirie and Laura, registered in 2003, mostly making full, warm-climate reds and some Riesling for local producers.", terroir="Warm (about 2,220 growing degree days) but with cooler pockets at altitude up to about 950 m.", producers=["Bundaleer Wines", "Belalie Bend"], nerd="", contains=[])

g(name="The Peninsulas", sub="Zone", state="South Australia", zone="The Peninsulas", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Chardonnay",
  summary="A zone covering the Eyre and Yorke peninsulas west of Adelaide, with about 70 ha of scattered vineyards, notably around Boston Bay near Port Lincoln and on Yorke Peninsula. It has no registered regions.", terroir="Maritime, on limestone and sand.", producers=["Boston Bay Wines", "Barley Stacks"], nerd="", contains=[])
