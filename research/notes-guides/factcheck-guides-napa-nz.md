# Fact-check log: napa-sonoma, new-zealand

Checker pass on 2026-10-30. I edited only `site/data/guides/napa-sonoma.json` and `site/data/guides/new-zealand.json`. Backups of the pre-check files are in the session scratchpad. Validator after edits: both files 0 errors, 0 warnings.

I used 23 of the 25 WebSearch calls. Most prices came from free WebFetch calls on the Shopify `search/suggest.json` endpoints of US retailers: buywinesonline.com, winechateau.com (NJ) and bottlebarn.com (Santa Rosa). These return live titles and prices.

## Facts the writer flagged
| Claim | Result | Source |
|---|---|---|
| Marsden planted vines on 25 Sept 1819 at Kerikeri, about a hundred vines | Confirmed (about 100 vines brought from Sydney) | https://nzhistory.govt.nz/first-grape-vines-planted-in-new-zealand-at-kerikeri |
| Deutz partnered with Montana from the late 1980s | Confirmed: 1988 partnership; first Deutz Marlborough Cuvée 1990 | https://en.wikipedia.org/wiki/Deutz_(wine) ; https://www.methodemarlborough.org/post/meet-deutz-for-the-first-time-again |
| Opus One first vintage 1979 | Confirmed (JV announced 1980) | https://en.wikipedia.org/wiki/Opus_One_Winery |
| Heitz Martha's Vineyard bottled separately from 1966 | Confirmed ("from the 1966 vintage") | https://en.wikipedia.org/wiki/Heitz_Wine_Cellars |
| Paris 1976: Mayacamas 7th, Mouton 2nd, three Californian whites in the top four; 2006 rematch: Mayacamas and Heitz tied 3rd | Confirmed | https://en.wikipedia.org/wiki/Judgment_of_Paris_(wine) |
| NZ vine pull | Wikipedia says 1984; the guide's "mid-1980s" stays | Wikipedia NZ wine |
| Montana planted 1973; first SB 1979 | Confirmed | Wikipedia NZ wine |

I also checked the atlas ageing figures quoted in both guides against `site/data/ageing/profiles.json`. The figures checked were Marlborough SB (standard and barrel), Central Otago and Bannockburn Pinot (standard and top), Martinborough, Hawke's Bay Bordeaux blends and Syrah, Waipara Riesling, Napa standard, premium and cult, Russian River Pinot and Dry Creek Zinfandel. All match. One wording was tightened (see below).

## Text changes
- napa-sonoma, Ag Preserve step: "while 80 km south, Silicon Valley" became "about 110 km south". From Yountville to Palo Alto is about 110 km in a straight line (computed from coordinates); 80 km was too short.
- napa-sonoma, ageing step: "old-vine field blends like Lytton Springs go 10 to 15" became "peak up to about year 10 and keep to 15". This matches the atlas `old_vine` tier: peak 4–10, limit 15.
- napa-sonoma, styles step: "Bedrock or Ridge ... for $25–45" became "$20–45". Bedrock is $20.87 at Wine Library, per the writer's log.
- napa-sonoma, Fumé Blanc taste note: "A cheap way" became "An affordable way", because the price range is now $25–35.
- new-zealand, Te Mata pick: the wine is now labelled Merlot/Cabernets. The heading changed from "Cabernet-Merlot blend" to "Merlot-Cabernet blend", the try changed to "Te Mata Estate Vineyards Merlot/Cabernets", and the note now says it is Merlot-led.
- new-zealand, Waiheke note: rewritten for the new range. Ironclad is the affordable bottle; Larose costs two to three times as much and is scarce in the US.
- new-zealand, Southern Valleys Pinot note: "A good-value Pinot for the table" became "Easier to enjoy young than the Central Otago bottles to come", because the price rose.
- Sources: added NZHistory, Wikipedia Deutz, Opus One and Heitz, and three retailer pages.

## Prices: Napa / Sonoma
| Pick | Old → new | Evidence |
|---|---|---|
| Sonoma Coast Pinot (try) | Meiomi removed | Meiomi carries a California appellation now, not Sonoma Coast (Bottle Barn title shows no AVA). La Crema alone stays (writer verified $21). |
| Robert Mondavi Napa Cab | $35–45 → $38–55 | wine.com $41.99; buywinesonline $52.95; Wine Library $39.09 (writer) |
| Napa Fumé Blanc / SB | $18–28 → $25–35 | Mondavi Fumé Blanc Napa at Costco $28.99–29.99 (app.warehouserunner.com/costco/8494-...); Frog's Leap Napa SB 2025 $28.95 buywinesonline / $28.99 Bottle Barn |
| Montelena Napa Chardonnay | $60–70 → $65–80 | buywinesonline 2023 $77.95; Pogo's $69.99 (writer) |
| Oakville/Rutherford Cab | $60–90 kept; try "Beaulieu Vineyard Rutherford" → "Beaulieu Vineyard Rutherford Reserve" | BV Rutherford Reserve 2021 $84.95; Frog's Leap Rutherford 2021 $68.95 (buywinesonline); Groth $62.33 (writer) |
| Carneros sparkling | $28–45 → $25–40 | Domaine Carneros Brut 2022 $36.99; Gloria Ferrer Sonoma Brut $24.99 (Bottle Barn) |
| Sonoma Valley blend | $20–28 → $17–28 | Gundlach Bundschu Mountain Cuvée 2023 $17.99 (Bottle Barn) |
| Dry Creek Zinfandel | $20–28 → $18–28; heading now "Dry Creek Valley or Sonoma County Zinfandel" (Seghesio and Bedrock are not Dry Creek-labelled) | DCV Heritage Vines 2022 $27.99 (Bottle Barn); Seghesio Sonoma 2024 $19.95 (buywinesonline) |
| Spring Mountain Cab | $65–80 → $55–80; Keenan removed | Smith-Madrone 2022 $58.99 (Bottle Barn), $74 Princeton Corkscrew (writer). Keenan's listing is a Napa Valley Cab ($63.99), not Spring Mountain District. |
| Ridge-top Sonoma Coast Pinot | $45–60 kept; Littorai removed | Littorai Sonoma Coast 2023 $89 (ny.vervewine.com); Flowers $49.99 (writer) |
| Classic-style Napa Cab | $55–75 → $55–90 | Montelena Napa Valley Cab 2022 $87.95; Frog's Leap Estate Napa Cab $55.95 (buywinesonline) |
| BV Georges de Latour | $150–180 kept | buywinesonline 2021 $174.95 |

## Prices: New Zealand
| Pick | Old → new | Evidence |
|---|---|---|
| Kumeu River Estate Chardonnay | $30–38 → $35–42 | K&L 2023 $39.99; Tacoma Wine Merchants $40 |
| Kumeu River Village | $18–24 kept | buywinesonline 2025 $21.95 |
| Big-brand Marlborough SB | $12–18 → $13–20 | Brancott $13.95, Kim Crawford $15.95, Whitehaven $18.95 (buywinesonline) |
| Cloudy Bay SB | $30–38 → $35–40 | buywinesonline $35.95; winechateau $38.97 |
| Dog Point / Greywacke SB | $22–30 → $20–28 | Dog Point $20.95 (buywinesonline), $22.99 (Pinnacle Liquor), $24.95–26.97 (winechateau); Greywacke $22.95–27.97 (winechateau), $25.95 (buywinesonline) |
| Awatere (Vavasour, Yealands) | $16–24 → $15–24 | Yealands SB 2025 $15.95 (buywinesonline). Vavasour has no US price. |
| Gimblett Gravels Syrah | $28–40 → $28–45 | Not seen at a US shop. Craggy GG Syrah: NZD 36.99–42.99 (vinofino), CAD 49.99 (Vessel). Trinity Hill GG: NZD 45 (finewinedelivery). Winereviewonline lists Craggy 2019 at "$90", which looks like an error. |
| Te Mata Merlot/Cabernets | $20–28 → $18–25 | AUD 25 (differentdrop.com). No US listing. Te Mata Syrah is $25.97 at winechateau. |
| Martinborough Pinot | $30–40 → $30–45; try "Craggy Range Te Muna Road" → "Craggy Range Martinborough" | Craggy Martinborough Pinot 2025 $32.97; Te Muna Road $53.97 (winechateau) and $46.95 (buywinesonline), too dear for the range. Ata Rangi Crimson: AUD 45 only. |
| Ata Rangi Pinot | $80–100 → $65–90 | K&L 2022 $69.99 |
| Bannockburn Pinot (Mt Difficulty, Carrick) | $38–50 kept | No US listing. Mt Difficulty Bannockburn AUD 57; Carrick AUD 68 (differentdrop). Still an estimate. |
| Felton Road Bannockburn | $70–90 → $55–75 | winechateau 2024/2025 $58.97 |
| Millton Te Arai Chenin | $25–35 kept | AUD 39 (differentdrop). Estimate. |
| Pegasus Bay Riesling | $28–35 → $24–35 | NZ $27.99 (vinofino). The off-dry wording is confirmed there. US price is an estimate. |
| Wild/barrel SB | $35–45 → $32–45 | Greywacke Wild $33.97 (winechateau); Section 94 2020 $36.98 (wineworksonline) and $39.99 (Westgate) |
| Southern Valleys Pinot | $28–40 → $35–50; Te Whare Ra removed (its estate is at Renwick, not clearly Southern Valleys, and has no price) | Dog Point Pinot 2019 $49.99 (Chapel Hill Wine Co); winereviewonline SRP $42 |
| Te Koko | $75–95 → $65–85 | winechateau 2023 $68.97 |
| Neudorf | $55–75 → $60–85; try now "Neudorf Home Block Moutere" (the current name) | NZD 99.99 (vinofino); HKD 698 (Watson's). No US listing, so this is converted and still an estimate. |
| NC Pinot Gris (Pegasus Bay, Greystone) | $22–30 kept | Still an estimate; not found. |
| Marlborough sparkling (No. 1, Nautilus, Pelorus) | $28–40 kept | Still an estimate. Nautilus Brut "6 Cs" $47.97 at winechateau is ambiguous (possibly a case-price line). Pelorus had only NZ, AU and UK results. |
| Waiheke blend | $100–150 → $50–150; try order is now Ironclad, Larose | Ironclad 2021 NZD 55.50 (finewinedelivery). There is no current US Larose listing; a cask-cartel 2008 at $899.99 is collector stock. |
| Te Mata Coleraine | $90–120 kept | buywinesonline 2022 $114.95; winechateau $109.97 |
| Single-block Central Otago | $90–140 → $70–100 | Felton Road Block 5 2024 $91.97; Burn Cottage Vineyard 2022 $70.97 (winechateau) |

## Still unverified
- NZ prices that are still estimates, or converted from NZD/AUD: Vavasour, Trinity Hill and Craggy GG Syrah, Te Mata Merlot/Cabernets, Ata Rangi Crimson, Mt Difficulty and Carrick Bannockburn, Millton Te Arai, Pegasus Bay Riesling and Pinot Gris, Greystone, Neudorf, No. 1, Nautilus, Pelorus, Stonyridge Larose.
- Napa: Buena Vista (Sonoma Valley blend try), Screaming Eagle and Harlan (the guide gives these only as "well over $1,000"). Not re-checked: machine harvesting raising thiol precursors, and Montelena Chardonnay "without full malolactic".
- Opus One: "within three years" of 1976 is fine for the 1979 first vintage, though the JV was announced only in 1980.

## Atlas notes
The writer's list of 10 atlas issues is still valid. I found no new atlas errors; the ageing data matches the guides.
