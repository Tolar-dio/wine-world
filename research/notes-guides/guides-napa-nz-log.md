# Guides log: napa-sonoma, new-zealand

Files: `site/data/guides/napa-sonoma.json`, `site/data/guides/new-zealand.json` (written 2026-10-30).

Validator (`python3 -I scripts/guides_validate.py`):
- napa-sonoma: 11 chapters (7 intro, 4 deeper), 2,351 + 1,522 words; 0 errors, 0 warnings.
- new-zealand: 11 chapters (7 intro, 4 deeper), 2,280 + 1,514 words; 0 errors, 0 warnings.
Counts are step text only. Taste notes and quizzes add roughly another 1,500 words per guide.

## Sources checked (facts)
Napa / Sonoma
- TTB appellation-of-origin page: AVA 85%, county 75%, state 75%; no variety or yield rules.
- NVV Napa Valley fast facts PDF: 47,216 acres under cultivation; 4% of the California crush (the PDF header also says 2%, so it contradicts itself); about 475 wineries; 95% family-owned; Ag Preserve 1968; 18 AVAs (Napa Valley plus 17); Cabernet 54% (25,414 acres). The atlas region profile says "about 45,000 acres". The guide avoids giving an acreage figure.
- Sonoma County Winegrape Commission fact sheet (May 2026): about 60,000 acres, 1,800+ growers, 99% certified sustainable, Chardonnay 15,000+ acres, Pinot Noir 12,500+ acres. SonomaCounty.com lists 19 AVAs and gives "twice the size of Napa".
- Wikipedia Judgment of Paris: 24 May 1976; 11 judges, of which only the 9 French judges' scores counted; full rankings (Mayacamas 1971 finished 7th, Heitz Martha's 9th); 2006 rematch: Ridge 1st, Stag's Leap 2nd, Mayacamas and Heitz tied 3rd. NapaValley.com's page claimed Mayacamas finished 2nd in 1976. That is wrong, so I did not use it.
- Wikipedia Napa Valley AVA: Yount 1838, Krug 1861, Inglenook 1879, Tchelistcheff 1938, AVA 1981. This page dates Mondavi's departure to 1965; the guide uses 1966, the year the winery opened, which matches the atlas event.
- Wikipedia Beaulieu: founded 1900; sacramental wine during Prohibition.
- Wikipedia Haraszthy: bought the land in 1856; in 1861 brought back 100,000+ cuttings of 350+ varieties.
- Wikipedia Sonoma County wine: 256 wineries in the 1920s, fewer than 50 left by 1933.
- Wikipedia Jack London SHP: London bought the ranch in 1905; Kohler & Frohling winery ruins on the property.
- Napa Valley Register: Napa County production fell almost 40% in 2020.
- Atlas vintage events (`_events.json`): Napa 2011–2025 vintages, the 2017 and 2020 fires, and Sonoma's 2017, 2019 and 2020 fire seasons.
- Atlas climate layer (`vintage/us.json`, average GDD over the last 10 years): Napa Valley 2,042, Carneros 2,006, Russian River Valley 1,721, Sonoma Coast 1,550, West Sonoma Coast 1,132. I used these as rounded figures.
- Atlas ageing profiles: Napa standard, premium and cult tiers; Russian River Valley Pinot; Dry Creek Zinfandel. I quoted these directly.

New Zealand
- NZW Vineyard Report 2026: producing area 42,404 ha in 2025 (43,321 ha forecast for 2026); planted area 44,229 ha forecast for 2026. Marlborough has 30,741 producing ha (72%) and 32,191 planted ha (73%). Sauvignon Blanc 68.8%, Pinot Noir 11.9%, Chardonnay 6.8%, Pinot Gris 6.3%. Hawke's Bay 4,454 ha; Central Otago 2,036 ha.
- NZW Sustainability Report 2025 fact sheet: SWNZ certifies 98% of producing vineyard area. The SWNZ start year ("mid-1990s") comes from the atlas, not from this sheet.
- IPONZ register entry for Bannockburn: registered 1 February 2022, IP number 1028.
- Wine With Seth: the 85% rule (Wine Regulations 2021); the Act in force from 27 July 2017.
- Wine Marlborough history page: Montana planting began 11 August 1973; it bought 1,173 ha at about $1,146/ha. Cloudy Bay's first vintage was 1985. Hunter's won Sunday Times Vintage Festival gold in 1986, three years running. Vavasour planted the Awatere in 1986. The vine pull was in the "mid-1980s" (Wikipedia says 1984, the atlas says 1986), so the guide says "mid-1980s".
- Jancis Robinson and Wine Anorak on the screwcap initiative: established early 2001; Ross Lawson called the first meeting; 25 founding members per JR, 33 per Wine Anorak (the guide says "a couple of dozen"); over 90% of NZ wine under screwcap by 2011.
- Gimblett Gravels Winegrowers Association: formed 2001; registered trademark; 95% fruit rule and 95% defined soils.
- Méthode Marlborough site: traditional method only; Chardonnay, Pinot Noir and Meunier only; everything grown, made and disgorged in Marlborough; at least 18 months on lees; members average 36 months.
- Bubbly Professor: Sarmiento, Chubut, at about 45°S, planted since 2011, is a rival to Central Otago's "most southerly" claim. The guide words this as a claim that is now disputed.
- Atlas vintage events (`_events.json`) for Marlborough and Central Otago; atlas ageing profiles for Marlborough, Central Otago, Martinborough and Hawke's Bay.

## Prices (US retail, checked 2026-10-30)
Verified on a retailer page:
- Stag's Leap Artemis 2022: $55 (Wine Library, sale) and $74.95 (K&L). Guide: $55–80.
- La Crema Sonoma Coast Pinot 2023: $21 (Allendale, list $27.99). Guide: $20–28.
- Sonoma-Cutrer Russian River Ranches 2023: $21.50 (Westgate, MSRP $25).
- Prati by Louis M. Martini Sonoma County Cab 2022: $18.99 (Mission Liquor).
- Louis M. Martini Napa Valley Cab 2021: $53.99 (Wine and Cheese Place). Winereviewonline gives the 2022 SRP as $49.
- Robert Mondavi Napa Valley Cab 2022: $39.09 (Wine Library, list $69.99).
- Chateau Montelena Napa Valley Chardonnay 2022: $69.99 (Pogo's).
- Groth Oakville Cab 2021: $62.33 (Wine Library, list $88.99).
- BV Napa Valley Cab 2022: $36.99 (67 Wine). BV Georges de Latour 2022: $154.99 (Hi-Time).
- Gary Farrell Russian River Selection Pinot 2022: $59.99 (wine.com).
- Ridge Lytton Springs 2022: $40 (Allendale, list $52.99).
- Bedrock Old Vine Zinfandel 2023: $20.87 (Wine Library, list $34.99).
- Dry Creek Vineyard Old Vine Zinfandel 2022: $39.99; DCV Fumé Blanc: $17.97 (wine.com).
- Jordan Cabernet 2021: $49 (Allendale, list $75.99). Silver Oak Alexander Valley 2021: $74.99 (wine.com).
- Smith-Madrone Cab 2021: $74 (Princeton Corkscrew).
- Mayacamas Cab 2021: $184.99 (Wine Library). Dunn Howell Mountain 2021: $249.94 (JJ Buckley).
- Flowers Sonoma Coast Pinot 2023: $49.99 (Wine Library, list $74.99).
- Hirsch San Andreas Fault Pinot 2022: $86 (Pogo's).
- Caymus Napa Valley 2023: $79.99 (wine.com). Corison Napa Valley 2022: $139.95 (buywinesonline). Opus One 2022: $348.74 (Saratoga Wine).

Not verified on a retailer page. These prices are my own estimates (ranges are deliberately wide), because the shared web-search budget ran out partway through and wine.com, Total Wine, K&L and Astor blocked searches or product pages:
- Napa / Sonoma: Robert Mondavi Napa Fumé Blanc ($18–28; the Vessel Liquor page gave only a Canadian price). Frog's Leap Sauvignon Blanc and Napa Cabernet. BV Rutherford. Domaine Carneros Brut and Gloria Ferrer. Gundlach Bundschu Mountain Cuvée. DCV Heritage Vines Zinfandel (the Bottle Barn page showed no price). Seghesio. Littorai. Keenan. Montelena Napa Cabernet. Meiomi. Screaming Eagle and Harlan (the guide only says "well over $1,000" and "several thousand").
- New Zealand: **every NZ price is an estimate and none was checked against a retailer.** The picks are Kumeu River Estate and Village, Brancott, Kim Crawford, Whitehaven, Cloudy Bay, Dog Point, Greywacke, Vavasour, Yealands, Trinity Hill and Craggy Range Gimblett Gravels Syrah, Te Mata Cabernet/Merlot and Coleraine, Craggy Te Muna, Ata Rangi Crimson and Pinot Noir, Mt Difficulty, Carrick, Felton Road Bannockburn and Block 5, Burn Cottage, Millton Te Arai Chenin, Pegasus Bay Riesling and Pinot Gris, Greystone, Neudorf Moutere, Te Koko, Section 94, Te Whare Ra, No. 1 Family Estate, Nautilus, Pelorus, Stonyridge Larose and Man O' War Ironclad. These need a pass against Wine-Searcher before publication.

## Stated from memory, not re-verified this session
- Marsden's journal date of 25 September 1819 (the atlas gives only the year 1819).
- Deutz's partnership with Montana from the late 1980s (Deutz Marlborough Cuvée).
- Jack London's novel *The Valley of the Moon* (1913).
- Opus One's first vintage in 1979; Heitz Martha's Vineyard first bottled separately in 1966.
- The research showing machine harvesting raises thiol precursors (the atlas glossary entry for thiol says the same).
- That Montelena makes its Chardonnay without full malolactic fermentation (the guide words this loosely).

## Atlas issues found (for the owners; I did not edit any data files)
1. `nz-new-zealand` (the national enduring GI) is indexed with parent `nz-marlborough`, ctx "Marlborough" and a label point in Marlborough. In the same way, `nz-north-island` has parent `nz-hawkes-bay` and `nz-south-island` has parent `nz-marlborough`. These parents run the wrong way: the enduring GIs contain the regions, not the other way round.
2. `nz-waitaki-valley-north-otago` is indexed with parent `nz-canterbury`, but its profile calls it a separate Region GI. Waitaki straddles Canterbury and Otago and is not inside the Canterbury GI.
3. In `ageing/profiles.json`, `nz-central-hawkes-bay` copies the Hawke's Bay tiers ("Bordeaux blend (Gimblett Gravels)"). Its own profile describes a cool, limestone area for Pinot Noir and Chardonnay, so the default tier is wrong.
4. The atlas NZ climate layer (`vintage/nz.json`, average GDD over the last 10 years) gives Martinborough 1,337 against Hawke's Bay 1,169 and Marlborough 972. In reality Hawke's Bay is warmer than Martinborough, and Marlborough is usually quoted at about 1,100–1,250. The cause is probably polygon-averaged gridded data (the Hawke's Bay and Marlborough GIs include hill country). I did not quote any NZ GDD figures.
5. `nz-central-otago` and `nz-bannockburn` ageing "why" text calls Central Otago "the world's southernmost wine region" as fact. Patagonian vineyards at Sarmiento (about 45.6°S) dispute that. The country tagline repeats the claim too.
6. `region-us-sonoma-county` classification text says "18 AVAs wholly or partly in the county", but its own appellations list has 19, and Sonoma County Tourism also says 19.
7. The US Napa region profile says "about 45,000 acres", while NVV fast facts says 47,216 acres under cultivation. This is minor.
8. The `us-mt-veeder` profile says Mayacamas 1971 "tied for third place" in the 2006 rematch, which is correct per Wikipedia. Check it against any page that copies NapaValley.com's wrong "2nd in 1976" claim.
9. The `us-wild-horse-valley` index parent is `us-solano-county-green-valley`, but its profile puts it in the Napa Valley AVA. That parent looks wrong.
10. The `nz` profile describes the 1986 vine pull as a single year; Wikipedia says 1984. Sources disagree, so "mid-1980s" is safer.

## Places wanted that have no id
- No site for Stony Hill, Smith-Madrone, Dunn or Jordan (I used AVA ids instead).
- No NZ GI or site ids for Rapaura, Te Muna Road, Waikari or Kurow beyond what the guide links. The Gibbston, Bendigo, Alexandra, Wairau, Awatere and Southern Valleys sites exist and are used.
- No term ids for "smoke taint", "field blend", "Rutherford dust" or "kauri gum"; these are explained inline instead.
