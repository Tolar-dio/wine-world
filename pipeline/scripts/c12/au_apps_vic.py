"""Australia appellations: Victoria."""
A = []


def g(**k):
    A.append(k)


g(name="Victoria", sub="State", state="Victoria", zone=None, styles=["red", "white", "sparkling", "fortified"], dom="red",
  grapes="Shiraz, Chardonnay, Pinot Noir, Cabernet Sauvignon, Sauvignon Blanc, Muscat",
  summary="The state GI for Victoria, used for blends across its 21 regions. Victoria has more registered regions than any other state, reflecting a climate range from the hot Murray to the cold Macedon Ranges, and the family-scale, region-driven industry that rebuilt itself after phylloxera.",
  terroir="Cool maritime south, alpine centre and north-east, hot irrigated north-west.", producers=["Brown Brothers", "Tahbilk", "De Bortoli"], nerd="In the 1880s Victoria produced more wine than New South Wales and South Australia combined; phylloxera and the 1890s depression ended that.",
  contains=["Port Phillip", "Central Victoria", "North East Victoria", "North West Victoria", "Western Victoria", "Gippsland"])

g(name="Port Phillip", sub="Zone", state="Victoria", zone="Port Phillip", styles=["white", "red", "sparkling"], dom="red",
  grapes="Pinot Noir, Chardonnay, Shiraz, Cabernet Sauvignon",
  summary="The zone around Melbourne and Port Phillip Bay, containing the Yarra Valley, Mornington Peninsula, Geelong, Macedon Ranges and Sunbury. It is Victoria's cool-climate core and the centre of Australian Pinot Noir and Chardonnay.",
  terroir="Bay and Bass Strait moderate the coastal regions; the Great Dividing Range lifts Macedon.", producers=["Yarra Yering", "Mount Mary", "Bannockburn"], nerd="", contains=["Yarra Valley", "Mornington Peninsula", "Geelong", "Macedon Ranges", "Sunbury"])

g(name="Yarra Valley", sub="Region", state="Victoria", zone="Port Phillip", styles=["white", "red", "sparkling", "rose"], dom="red",
  grapes="Pinot Noir, Chardonnay, Cabernet Sauvignon, Shiraz, Sauvignon Blanc, Nebbiolo",
  summary="The Yarra Valley, an hour east of Melbourne, was Victoria's first wine region and is its most celebrated. Swiss settlers planted it from the 1840s: Paul de Castella at Yering Station, his brother Hubert at St Hubert's and Guillaume de Pury at Yeringberg. In 1889 a Yering wine won a grand prix at the Paris Exposition. Then fashion, phylloxera fears and the dairy industry wiped it out; the last vintage at Yeringberg in its first life was 1921.\n\nDoctors and scientists brought it back. Dr Reg Egan replanted Wantirna Estate in 1963, Dr Bailey Carrodus founded Yarra Yering in 1969 and Dr John Middleton Mount Mary in 1971, both making Bordeaux and Burgundy styles of rare finesse. Moët & Chandon chose the valley for Domaine Chandon in 1986, and since the 2000s producers such as Giant Steps, Oakridge, Mac Forbes, Yarra Yering under Sarah Crowe, and Timo Mayer have made it Australia's best-known source of elegant Pinot Noir and tight, struck-match Chardonnay, as well as perfumed, medium-bodied Shiraz and Cabernet.\n\nThe region is split by geology and altitude. The lower, warmer valley floor and northern slopes (Coldstream, Dixons Creek, Gruyere) suit Cabernet and Shiraz on grey sandy clay loams; the Upper Yarra (Hoddles Creek, Seville, Woori Yallock), on deep red volcanic soils at up to about 400 m, is cooler and wetter and makes taut Chardonnay and Pinot. Wine Australia records about 1,440 growing degree days, among the coolest of mainland Australia's major regions.",
  terroir="Rainfall around 1,080 mm a year and 550 mm in the growing season, high for Australia. Grey sandy loams over clay and sandstone on the valley floor and northern hillsides; red volcanic krasnozem in the Upper Yarra. Bushfires (2009) and smoke taint (2020) are recurring risks.",
  producers=["Mount Mary", "Yarra Yering", "Yeringberg", "De Bortoli", "Giant Steps", "Oakridge", "Coldstream Hills", "Domaine Chandon", "Hoddles Creek Estate", "Mac Forbes", "Timo Mayer", "Seville Estate", "Toolangi", "Punch", "Luke Lambert"],
  nerd="Mount Mary's Quintet is a blend of all five Bordeaux reds, and until 2008 the estate sold almost entirely by mailing list; Dr Middleton refused to enter wine shows.",
  contains=["Upper Yarra (informal)"])

g(name="Mornington Peninsula", sub="Region", state="Victoria", zone="Port Phillip", styles=["white", "red", "sparkling"], dom="red",
  grapes="Pinot Noir, Chardonnay, Pinot Gris, Shiraz",
  summary="A boot-shaped peninsula between Port Phillip Bay and Western Port, an hour south of Melbourne, surrounded by water on three sides. Vines arrived in the 1880s, but the modern industry dates from the 1970s, when Baillieu Myer (Elgee Park, 1972) and Nat and Rosalie White (Main Ridge, 1975) planted. Today about 200 small vineyards make Pinot Noir, Chardonnay and Pinot Gris (often labelled Pinot Grigio in a nod to the peninsula's Italian heritage) with a tense, saline freshness. Producers such as Paringa Estate, Kooyong, Stonier, Yabby Lake, Ten Minutes by Tractor, Eldridge and Moorooduc have built an international reputation for Pinot that varies vineyard by vineyard.",
  terroir="Maritime and cool (about 1,560 growing degree days). Red Hill and Main Ridge, at 150 to 300 m on deep red volcanic soils, are the coolest; Moorooduc and Tuerong, lower and on sandier soils over clay, are warmer and riper. Strong winds at flowering reduce yields.",
  producers=["Paringa Estate", "Kooyong", "Port Phillip Estate", "Stonier", "Yabby Lake", "Ten Minutes by Tractor", "Main Ridge Estate", "Moorooduc Estate", "Eldridge Estate", "Crittenden Estate", "Quealy"],
  nerd="Kathleen Quealy and Kevin McCarthy at T'Gallant made Pinot Grigio fashionable in Australia in the 1990s.", contains=[])

g(name="Geelong", sub="Region", state="Victoria", zone="Port Phillip", styles=["red", "white"], dom="red",
  grapes="Pinot Noir, Chardonnay, Shiraz",
  summary="Geelong was one of Australia's biggest wine districts in the 1860s and 1870s, planted by Swiss vignerons, and it was where phylloxera was found in 1877: the government ordered the vines uprooted, and the region vanished for 90 years. Revived from 1966 by Daryl and Nini Sefton at Idyll, it now makes some of Victoria's most distinctive Pinot, Chardonnay and Shiraz, from Gary Farr's By Farr and Bannockburn on the Moorabool Valley's limestone and basalt, and from the Bellarine Peninsula and Surf Coast.",
  terroir="Dry and windy (518 mm a year), with about 1,570 growing degree days. Three sub-areas: the Moorabool Valley (volcanic basalt and limestone), the Bellarine Peninsula (maritime) and the Surf Coast.",
  producers=["By Farr", "Bannockburn Vineyards", "Clyde Park", "Lethbridge", "Scotchmans Hill", "Provenance", "Austin's"],
  nerd="Bannockburn's Serré Pinot Noir comes from a close-planted block of about 9,000 vines per hectare, rare in Australia, planted on Burgundian lines in 1984.", contains=[])

g(name="Macedon Ranges", sub="Region", state="Victoria", zone="Port Phillip", styles=["sparkling", "white", "red"], dom="sparkling",
  grapes="Pinot Noir, Chardonnay, Riesling, Shiraz",
  summary="The coldest wine region on mainland Australia by Wine Australia's measure (about 1,390 growing degree days), high on the Great Dividing Range north-west of Melbourne around Kyneton, Gisborne, Lancefield and Woodend. It is marginal country, where a cold spring can cut a crop in half, but its traditional-method sparkling and taut Pinot and Chardonnay are among Australia's most elegant. Bindi (Michael Dhillon), Curly Flat, Hanging Rock and Granite Hills are the reference producers.",
  terroir="Altitudes of about 300 to 800 m; granite, sandstone and volcanic soils; windy, with frost risk.", producers=["Bindi", "Curly Flat", "Hanging Rock", "Granite Hills", "Lyons Will"],
  nerd="Hanging Rock Winery's 'Macedon' non-vintage sparkling uses a solera-style reserve system started in the late 1980s.", contains=[])

g(name="Sunbury", sub="Region", state="Victoria", zone="Port Phillip", styles=["red", "white"], dom="red",
  grapes="Shiraz, Chardonnay, Cabernet Sauvignon",
  summary="A small region just north-west of Melbourne airport, with a nineteenth-century heritage: Craiglee's bluestone winery was built in 1864, and its 1872 Hermitage was still being opened in the twentieth century. Today Craiglee and Galli Estate make peppery Shiraz and Chardonnay.",
  terroir="Dry (about 530 mm), windy plains with volcanic soils.", producers=["Craiglee", "Galli Estate"], nerd="Goona Warra, also at Sunbury, has a bluestone winery from 1863.", contains=[])

g(name="Central Victoria", sub="Zone", state="Victoria", zone="Central Victoria", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Marsanne, Chardonnay",
  summary="The zone of central Victorian goldfields and river country, containing Bendigo, Heathcote, Goulburn Valley (with Nagambie Lakes), Strathbogie Ranges and Upper Goulburn.", terroir="", producers=["Tahbilk", "Jasper Hill"], nerd="", contains=["Bendigo", "Heathcote", "Goulburn Valley", "Strathbogie Ranges", "Upper Goulburn"])

g(name="Heathcote", sub="Region", state="Victoria", zone="Central Victoria", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Tempranillo, Nebbiolo, Fiano",
  summary="Heathcote's fame rests on a band of deep red soil derived from Cambrian greenstone, volcanic rock about 500 million years old, that runs north-south along the Mount Camel Range for about 60 km. On it Shiraz is dense yet fresh, with dark fruit, spice and fine tannin. Ron and Elva Laughton planted Jasper Hill in 1975 and their dry-grown, own-rooted Georgia's Paddock and Emily's Paddock Shiraz made the region famous; Wild Duck Creek, Paul Wilson and Tellurian followed. The GI was registered in 2002 after a dispute with Bendigo over the boundary.",
  terroir="About 1,880 growing degree days and only 521 mm of annual rain. Altitude 110 to 600 m. The Cambrian red soils hold water well, allowing dry-farming.",
  producers=["Jasper Hill", "Wild Duck Creek", "Tellurian", "Heathcote Estate", "Greenstone Vineyards", "Sanguine Estate", "Paul Osicka"],
  nerd="Jasper Hill's Emily's Paddock is co-planted with a little Cabernet Franc, which goes into the Shiraz.", contains=[])

g(name="Bendigo", sub="Region", state="Victoria", zone="Central Victoria", styles=["red", "white"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Chardonnay",
  summary="Gold-rush Bendigo had more than 100 vineyards by 1880 until phylloxera arrived in 1893 and the government ordered vineyards destroyed. Stuart Anderson revived it at Balgownie in 1969, and the region now makes rich, minty Shiraz and Cabernet from small family producers.",
  terroir="Warm and dry (about 1,880 growing degree days, 496 mm of rain), on gravelly quartz soils over clay.", producers=["Balgownie Estate", "Sutton Grange", "Water Wheel", "Passing Clouds"], nerd="", contains=[])

g(name="Goulburn Valley", sub="Region", state="Victoria", zone="Central Victoria", styles=["red", "white"], dom="red",
  grapes="Shiraz, Marsanne, Cabernet Sauvignon, Riesling",
  summary="The Goulburn River valley in north-central Victoria, from Seymour to Shepparton. Its heart is the Nagambie Lakes subregion, where Tahbilk has made wine since 1860; elsewhere irrigated orchards dominate.", terroir="Warm (about 2,100 growing degree days) and dry, on alluvial soils.",
  producers=["Tahbilk", "Mitchelton"], nerd="", contains=["Nagambie Lakes"])

g(name="Nagambie Lakes", sub="Subregion", state="Victoria", zone="Central Victoria", styles=["red", "white"], dom="red",
  grapes="Shiraz, Marsanne, Cabernet Sauvignon, Viognier, Roussanne",
  summary="A subregion registered in 2001, defined by the lagoons and billabongs of the Goulburn River near Nagambie, the only Australian GI defined by its water bodies. It holds Tahbilk, whose 1860 Shiraz block survived phylloxera on sandy soils, and whose Marsanne vineyard (planted from 1927) is one of the largest and oldest in the world. Mitchelton, founded in 1969 with a tower overlooking the river, is the other landmark.",
  terroir="Wine Australia's description points to the influence of the lakes and the region's red sandy loams with ironstone gravel; the water moderates temperatures at night.", producers=["Tahbilk", "Mitchelton", "Box Grove"],
  nerd="Tahbilk's Marsanne is unoaked and built to age: at ten years old it tastes of honeysuckle and lanolin.", contains=[])

g(name="Strathbogie Ranges", sub="Region", state="Victoria", zone="Central Victoria", styles=["white", "red", "sparkling"], dom="white",
  grapes="Riesling, Chardonnay, Shiraz, Pinot Noir",
  summary="A granite plateau between the Goulburn Valley and the Upper Goulburn at roughly 150 to 1,000 m, registered in 2002, supplying cool-climate Riesling, Chardonnay and sparkling base as well as some fine Shiraz.",
  terroir="Granite-derived sandy soils; about 1,620 growing degree days.", producers=["Fowles Wine", "Maygars Hill", "Elgo Estate"], nerd="", contains=[])

g(name="Upper Goulburn", sub="Region", state="Victoria", zone="Central Victoria", styles=["white", "red", "sparkling"], dom="white",
  grapes="Chardonnay, Pinot Noir, Riesling, Sauvignon Blanc",
  summary="Hilly country around Mansfield, Alexandra and Lake Eildon at the foot of the Victorian Alps, registered in 2003. Delatite, founded by the Ritchie family in 1968, is its best-known estate, with aromatic whites and biodynamic farming.",
  terroir="Elevations up to about 1,000 m, cool (about 1,540 growing degree days).", producers=["Delatite", "Mount Cathedral"], nerd="", contains=[])

g(name="North East Victoria", sub="Zone", state="Victoria", zone="North East Victoria", styles=["fortified", "red", "white", "sparkling"], dom="fortified",
  grapes="Muscat, Muscadelle, Shiraz, Durif, Prosecco, Sangiovese",
  summary="The zone of the Ovens and King valleys, the Victorian Alps and the Murray around Rutherglen: Rutherglen, Glenrowan, Beechworth, King Valley and Alpine Valleys.", terroir="", producers=["Brown Brothers", "Chambers Rosewood", "Giaconda"], nerd="", contains=["Rutherglen", "Glenrowan", "Beechworth", "King Valley", "Alpine Valleys"])

g(name="Rutherglen", sub="Region", state="Victoria", zone="North East Victoria", styles=["fortified", "red", "white"], dom="fortified",
  grapes="Muscat à Petits Grains Rouge ('Rutherglen Brown Muscat'), Muscadelle, Durif, Shiraz",
  summary="Rutherglen, on the Murray River in north-east Victoria, makes one of the world's great fortified wines, and it does so from grapes ripened to raisins on the vine. Gold was found here in 1860; the gold ran out within a decade, but many miners stayed and planted vines, and by the 1880s the region was exporting to London. Phylloxera arrived in 1899 and the region shrank, but a handful of families (Chambers, Morris, Campbell, Sutherland Smith at All Saints, Stanton & Killeen) kept their soleras of fortified wine going, some for more than 140 years.\n\nRutherglen Muscat is made from a dark-skinned clone of Muscat à Petits Grains, left on the vine until the berries shrivel and reach 17 to 20 degrees Baumé. Fermentation is stopped early with grape spirit, and the wine then ages for years in old casks stacked in hot iron sheds, where heat concentrates it and the 'angels' share' takes about half the volume over 20 years. The result is dark brown, viscous and tastes of raisin, toffee, coffee and rose petal. Topaque, made the same way from Muscadelle, was called Tokay until EU agreements retired the name in 2010; it tastes of malt, tea leaf and butterscotch.\n\nThe producers' Muscat of Rutherglen network classifies these wines on four tiers by richness and age: Rutherglen (an average age of about 3 to 5 years), Classic (6 to 10), Grand (11 to 19) and Rare (more than 20 years). Only a few hundred bottles of the Rare wines are released each year; Chambers Rosewood and Morris have barrels from the 1890s and earlier in their blends. The region also makes dense, inky Durif, a red grape that found its best Australian home here.",
  terroir="Warm and continental (about 2,080 growing degree days), with hot days, cool nights and a long dry autumn that lets fruit shrivel safely on the vine. Soils are red loams and alluvial sands along the Murray; vineyards sit at about 120 to 590 m.",
  producers=["Chambers Rosewood", "Morris", "Campbells", "All Saints Estate", "Stanton & Killeen", "Pfeiffer", "Buller", "Cofield"],
  nerd="Bill Chambers' blends of Rare Muscat include wine from casks started by his great-grandfather; the oldest material in the Chambers solera is thought to date to the 1890s.", contains=[])

g(name="Glenrowan", sub="Region", state="Victoria", zone="North East Victoria", styles=["fortified", "red"], dom="red",
  grapes="Shiraz, Durif, Muscat, Muscadelle, Cabernet Sauvignon",
  summary="Ned Kelly's last stand took place at Glenrowan in 1880, and Baileys of Glenrowan, founded in 1870, still makes thick, dry-grown Shiraz and fortified Muscat and Topaque on the red granite soils of the Warby Ranges.",
  terroir="Warm (about 2,020 growing degree days), on deep red loam derived from granite.", producers=["Baileys of Glenrowan", "Taminick Cellars"], nerd="Baileys' 1920s Block Shiraz is still dry-grown.", contains=[])

g(name="Beechworth", sub="Region", state="Victoria", zone="North East Victoria", styles=["white", "red"], dom="white",
  grapes="Chardonnay, Shiraz, Nebbiolo, Pinot Noir",
  summary="A gold-rush town in the foothills of the Victorian Alps that became a cult wine region thanks to Rick Kinzbrunner, who planted Giaconda at Everton Upper in 1982. Giaconda's Chardonnay, fermented with wild yeast and aged in a granite cave cellar, is one of Australia's most sought-after whites, and Kinzbrunner's Nebbiolo and Shiraz are equally serious. Sorrenberg (1985), Castagna (biodynamic Syrah and Sangiovese), Savaterre and A. Rodda followed.",
  terroir="About 1,720 growing degree days. Altitudes from about 200 to 1,000 m, on granite and on sandy, quartz-rich soils over decomposed granite; cool nights.", producers=["Giaconda", "Sorrenberg", "Castagna", "Savaterre", "A. Rodda", "Fighting Gully Road"],
  nerd="Giaconda blasted its cellar into the granite hillside so the wines age at a natural cool temperature.", contains=[])

g(name="King Valley", sub="Region", state="Victoria", zone="North East Victoria", styles=["sparkling", "white", "red"], dom="white",
  grapes="Prosecco (Glera), Pinot Grigio, Sangiovese, Nebbiolo, Chardonnay, Riesling",
  summary="A narrow valley rising into the Alps from Milawa, settled after the Second World War by Italian families who grew tobacco. When tobacco collapsed in the 1990s they planted vines, and the Pizzini, Dal Zotto and Brown families made the King Valley Australia's Prosecco capital. Otto Dal Zotto planted the first Prosecco vines in 1999. Since an EU challenge, Australia has defended 'Prosecco' as a grape variety name. Brown Brothers, founded at Milawa in 1889, is the region's oldest producer.",
  terroir="Vineyards from about 150 m at Milawa to over 800 m at Whitlands; about 1,710 growing degree days, wetter (970 mm) than most.", producers=["Brown Brothers", "Pizzini", "Dal Zotto", "Chrismont"],
  nerd="Brown Brothers runs a small 'Kindergarten' winery where it has trialled more than 100 grape varieties.", contains=[])

g(name="Alpine Valleys", sub="Region", state="Victoria", zone="North East Victoria", styles=["white", "red", "sparkling"], dom="white",
  grapes="Chardonnay, Pinot Gris, Tempranillo, Prosecco, Shiraz, Saperavi",
  summary="The Ovens, Kiewa, Buckland and Buffalo river valleys around Bright and Myrtleford, registered in 1999, with vineyards up to about 1,000 m among former tobacco and hop farms. Producers such as Billy Button, Mayford and Gapsted experiment widely.", terroir="About 1,580 growing degree days; alluvial soils; cold winters.",
  producers=["Billy Button", "Mayford", "Gapsted"], nerd="", contains=[])

g(name="North West Victoria", sub="Zone", state="Victoria", zone="North West Victoria", styles=["red", "white"], dom="white",
  grapes="Chardonnay, Shiraz, Cabernet Sauvignon, Sauvignon Blanc",
  summary="The Victorian bank of the Murray, from Swan Hill to Mildura. Its regions, Murray Darling and Swan Hill, cross the river into New South Wales.", terroir="Hot and irrigated.", producers=["Lindeman's (Karadoc)"], nerd="", contains=["Murray Darling", "Swan Hill"])

g(name="Murray Darling", sub="Region", state="Victoria", zone="North West Victoria", styles=["white", "red"], dom="white",
  grapes="Chardonnay, Shiraz, Cabernet Sauvignon, Sauvignon Blanc, Colombard",
  summary="One of the three great irrigated regions, straddling the Murray around Mildura, Robinvale and Wentworth in both Victoria and New South Wales, with about 13,500 ha of vines. In 2026 it crushed about 237,000 tonnes. The Chaffey brothers began irrigation at Mildura in 1887. Lindeman's Karadoc winery made the region's best-known export, Bin 65 Chardonnay, launched in 1985; at its peak several million cases a year were sold.",
  terroir="About 2,550 growing degree days and 284 mm of rain a year: entirely irrigated. Sandy red mallee soils.", producers=["Lindeman's", "Trentham Estate", "Deakin Estate"], nerd="The GI is registered in both Victoria and New South Wales because it crosses the state line along the river.", contains=[])

g(name="Swan Hill", sub="Region", state="Victoria", zone="North West Victoria", styles=["white", "red"], dom="white",
  grapes="Chardonnay, Shiraz, Colombard",
  summary="An irrigated Murray River region around Swan Hill and Robinvale, straddling Victoria and New South Wales, producing about 35,000 to 47,000 tonnes a year for branded and bulk wine.",
  terroir="Hot (about 2,360 growing degree days), very dry (329 mm), irrigated.", producers=["Andrew Peace Wines"], nerd="", contains=[])

g(name="Western Victoria", sub="Zone", state="Victoria", zone="Western Victoria", styles=["red", "sparkling", "white"], dom="red",
  grapes="Shiraz, Riesling, Cabernet Sauvignon, Chardonnay",
  summary="The zone of western Victoria's ranges and plains: Grampians (with Great Western), Pyrenees and Henty.", terroir="", producers=["Best's", "Seppelt"], nerd="", contains=["Grampians", "Pyrenees", "Henty"])

g(name="Grampians", sub="Region", state="Victoria", zone="Western Victoria", styles=["red", "sparkling", "white"], dom="red",
  grapes="Shiraz, Riesling, Cabernet Sauvignon, Pinot Meunier",
  summary="The region around the sandstone Grampians ranges, Ararat and Great Western, whose cool, peppery, medium-bodied Shiraz is among Australia's most elegant. Its history is gold-rush: Henry Best planted Concongella in 1866, and Hans Irvine's Great Western winery (later Seppelt) dug kilometres of tunnels ('drives') to age traditional-method sparkling wine from 1868 onward. Mount Langi Ghiran, Best's and The Story make the reference Shiraz today.",
  terroir="About 1,540 growing degree days; altitudes up to about 500 m on vineyards; soils of sandy loam over clay and granite-derived gravels.", producers=["Best's", "Seppelt", "Mount Langi Ghiran", "The Story", "Grampians Estate"], nerd="Seppelt's Great Western also made sparkling Shiraz, a uniquely Australian style, from the 1890s.", contains=["Great Western"])

g(name="Great Western", sub="Subregion", state="Victoria", zone="Western Victoria", styles=["red", "sparkling", "white"], dom="red",
  grapes="Shiraz, Pinot Meunier, Riesling, Chardonnay",
  summary="A subregion of the Grampians registered in 2007 around the village of Great Western. Its name had long been used on cheap sparkling wine made elsewhere by Seppelt, and its registration came with legally enforceable conditions on use. It contains Best's Concongella vineyard, planted from 1866, whose Nursery Block holds about 40 varieties, several of them unidentified, and some of the oldest Pinot Meunier and Dolcetto vines in the world.",
  terroir="Granite-derived sandy loams over clay, cool and dry.", producers=["Best's", "Seppelt"], nerd="Wine Australia notes that the use of 'Great Western' is subject to legally enforceable conditions because of the history of the name on sparkling wine.", contains=[])

g(name="Pyrenees", sub="Region", state="Victoria", zone="Western Victoria", styles=["red", "white", "sparkling"], dom="red",
  grapes="Shiraz, Cabernet Sauvignon, Sauvignon Blanc, Chardonnay",
  summary="Rolling hills around Avoca and Moonambel, named after the Pyrenees by the explorer Thomas Mitchell. Rémy Martin planted Chateau Remy (now Blue Pyrenees) for brandy and sparkling in 1963, and Taltarni and Dalwhinnie built the reputation for firm, minty Shiraz and Cabernet.",
  terroir="About 1,710 growing degree days; 507 mm of rain; quartz-gravel and clay loams at 200 to 800 m.", producers=["Dalwhinnie", "Taltarni", "Blue Pyrenees", "Summerfield", "Mount Avoca"], nerd="", contains=[])

g(name="Henty", sub="Region", state="Victoria", zone="Western Victoria", styles=["white", "sparkling", "red"], dom="white",
  grapes="Riesling, Chardonnay, Pinot Noir, Cabernet Sauvignon",
  summary="A huge, sparsely planted region in Victoria's far south-west near Portland and Hamilton, one of the coolest in mainland Australia (about 1,430 growing degree days). Crawford River's Rieslings (John Thomson, from 1975) are among the country's best, and Seppelt once sourced Drumborg fruit here for sparkling and Riesling.",
  terroir="Maritime, windy and cool, on volcanic basalt soils near the coast.", producers=["Crawford River", "Seppelt (Drumborg)", "Pierrepoint"], nerd="", contains=[])

g(name="Gippsland", sub="Zone", state="Victoria", zone="Gippsland", styles=["red", "white"], dom="red",
  grapes="Pinot Noir, Chardonnay",
  summary="A zone covering eastern Victoria from Phillip Island to the New South Wales border, with no registered regions and fewer than 200 ha of vines. It is famous for one estate: Bass Phillip, where Phillip Jones planted dense, unirrigated Pinot Noir at Leongatha South from 1979 and made wines that were compared with Burgundy grand crus. Burgundian Jean-Marie Fourrier became a partner in the estate in 2020.",
  terroir="South Gippsland is cool and wet, on deep, fertile red soils; East Gippsland is warmer.", producers=["Bass Phillip", "William Downie", "Lightfoot & Sons", "Narkoojee"],
  nerd="Bass Phillip's Premium Pinot comes from vines planted at about 9,000 per hectare, very dense by Australian standards.", contains=[])
