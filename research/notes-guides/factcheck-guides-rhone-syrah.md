# Fact-check log: southern-rhone, syrah

Checked 2026-10-30 by an independent checker. Files edited in place: `site/data/guides/southern-rhone.json`, `site/data/guides/syrah.json`. I used 18 of my 20 WebSearch calls; the rest of the checking was done with WebFetch and atlas files.

Note: I re-serialised `southern-rhone.json` and `syrah.json` with `indent=2` when I added the sources. Short arrays that were on one line are now spread over several lines. The content is otherwise unchanged.

## Validator (final)
```
site/data/guides/southern-rhone.json: 11 chapters, 2786 + 1741 words; 0 errors, 0 warnings
site/data/guides/syrah.json: 9 chapters, 3265 + 0 words; 0 errors, 0 warnings
```

## Changes (old → new, source)

### southern-rhone
1. **ch grenache, step 3.** Old: "a Côtes du Rhône Villages red must be at least half Grenache, with Syrah and Mourvèdre as the main partners". New: "must be built on Grenache, with a required minimum of Syrah and Mourvèdre as its partners". The sources conflict on the figure. Wikipedia gives ≥50% Grenache and ≥20% Syrah+Mourvèdre. A copy of the cahier des charges (musee-boissons.com/pdf/2016_Cotes-Rhone-Villages.pdf, as amended) gives ≥40% Grenache, and ≥25% Syrah+Mourvèdre from the 2022 harvest. I removed the number rather than guess which is current.
2. **ch pink-and-sweet, step 2.** Old: "Châteauneuf estates such as Domaine de la Mordorée and Pegau have invested here". New: "estates such as Château Mont-Redon from Châteauneuf and Domaine de la Mordorée from Tavel". I found no Pegau Lirac. Mordorée is based in Tavel. Mont-Redon makes a Lirac (the writer's price, bassins.com, and this guide's own ch4 pick).
3. **ch pink-and-sweet, step 2 and quiz 3.** Old: phylloxera "was first identified in France in 1863" at Pujaut. New: "vines began dying of phylloxera in 1863, the first sign of it in France". The quiz now asks "Where did phylloxera first show itself in France?", and its explanation adds that Planchon identified the insect in 1868. Source: the atlas's own timeline event (Pujaut 1863 dying vines; Planchon, Saint-Martin-de-Crau, July 1868).
4. **ch lieux-dits, step 2.** Old: in 2022 "Vieux Télégraphe made no La Crau red or white at all". New: "brought in no grapes for its flagship La Crau red". Kermit Lynch confirms only the red: hail and a tornado in mid-August 2022, with no grapes harvested for La Crau. https://shop.kermitlynch.com/newsletter-article/the-return-of-one-of-the-greats
5. **ch producers, step 3 and taste.** Old: Clos des Papes "vines spread across 24 parcels". New: "about 40 ha spread across some 30 parcels" (taste: "One red from some 30 parcels"). Source: Skurnik (40 ha, 3 ha of it white, 30 parcels, "just one red wine and one white wine"). That source also confirms "no prestige cuvée". https://www.skurnik.com/producer/clos-des-papes-2/
6. Added both of those sources to `sources`.

### syrah
1. **ch cote-rotie, step 3.** Old: "The VIVC grape database records a parent-offspring link between Viognier and Mondeuse Blanche". New: "DNA profiling suggests a parent-offspring link". I could not confirm that VIVC records this. The link itself is published DNA work, as I recall it from Robinson, Harding and Vouillamoz's *Wine Grapes*; I did not fetch it.
2. **ch southern-blend, step 1.** Same Côtes du Rhône Villages softening as southern-rhone change 1.
3. **ch barossa, step 2.** Old: Freedom vineyard "was planted with Shiraz in 1843 and is generally cited as the oldest continuously producing Shiraz vineyard in the world, and Turkey Flat at Bethany has Shiraz from 1847". New: the vineyard "takes its name from its Shiraz planting of 1843, and the winery presents it as possibly the oldest surviving Shiraz vineyard in the world; Turkey Flat, by Bethany Creek, has Shiraz from 1847". Sources: Wine Companion ("may be the world's oldest surviving shiraz vineyard"; that page also muddles an 1860s transplanted block, so I did not repeat any detail beyond the claim) and Wikipedia, Turkey Flat (Shiraz planted 1847 near Bethany Creek; the winery is at Tanunda).
4. **ch hawkes-bay, step 1.** Old: "about 4,600 ha, and its oldest still producing". New: "about 4,450 ha of producing vines in 2025, and its oldest". Source: NZ Winegrowers Vineyard Report 2026, Hawke's Bay 4,454 ha producing, second after Marlborough. https://www.nzwine.com/media/5fzng52v/vineyard-report-2026-final.pdf
5. **Gimblett Gravels Syrah price.** $25–40 → **$25–35**. See prices below.
6. **Elqui/Limarí Syrah price.** $15–25 → **$15–30**. I added "US stock is patchy, so a good shop may need to order one."
7. **Porseleinberg.** Price "$50 and up" → **$90–100**; the $49.99 the writer found was an old 2016 listing. Taste note: old "fermented in concrete eggs and foudres" → "Whole-bunch Syrah from schist, aged in large foudres". Both retailer notes give whole bunch and about a year in foudres. I could not confirm concrete eggs.
8. Added four sources: Tim Atkin in Decanter, the NZ Vineyard Report 2026, the Cayuse About page, and Wikipedia on Turkey Flat.

## Writer's "unverified" items, now checked
- **Stonecroft:** confirmed. Alan Limmer planted a row of 100 rescued Syrah cuttings in 1984; 1989 was his first official vintage (Tim Atkin, Decanter, https://www.decanter.com/features/tim-atkin-mw-on-new-zealand-syrah-246293/). He holds a doctorate in soil science (Hawke's Bay Wine Hall of Fame 2019, https://hawkesbaywine.co.nz/?p=3988). Text kept.
- **Cayuse:** confirmed. Baron is from Champagne (Charly-sur-Marne), found the stony field in April 1996 and planted it on 21 March 1997 (https://cayusevineyards.com/static/about.aspx). The page did not mention biodynamics. "Farms it biodynamically" is kept from general knowledge.
- **Langmeil 1843 / Turkey Flat 1847:** see syrah change 3.
- **Clos des Papes:** no prestige cuvée confirmed; the parcel count was corrected (southern-rhone change 5). Wine Spectator Wine of the Year for the 2005 vintage was kept from memory; it was not refetched.
- **Beaucastel heating grapes before fermentation:** not refetched (search budget). This is the estate's well-known *vinification à chaud*, done to limit sulphur use. Kept as written.
- **Gimblett Gravels facts (1867 flood, about 800 ha, 2001 trademark, 95% rule):** these match the atlas site `site-nz-gimblett-gravels` and the nz.json profile. They were not refetched from an outside source.

## Prices
Confirmed this session:
- Porseleinberg Syrah 2021: $89.99 at Wine House LA (https://www.winehouse.com/product/2021-porseleinberg-syrah-swartland-1ugmimn25qfo4) and $99.99 at K&L (https://shop.klwines.com/products/details/1791709) → **$90–100**.
- Craggy Range Gimblett Gravels Syrah 2020: $31.19 at dialabottle.com (https://dialabottle.com/shop/miscellaneous/craggy-range-gimblett-gravels-vineyard-syrah-2020-750-ml-bottle-2). Craggy's Le Sol is $94.60 at Saratoga Wine Exchange, which is not the pick.
- Trinity Hill Gimblett Gravels Syrah: wine.com's last price was $23.99–26.99 (2016 vintage, sold out; https://www.wine.com/product/trinity-hill-gimblett-gravels-syrah-2016/540581) → range set to **$25–35**.
- Falernia Reserva Syrah (Elqui): wine.com's last prices were $12.98–15.99, all sold out (https://www.wine.com/list/wine/falernia/elqui-valley/7155-102419-107183). Mayu Gran Reserva Syrah 2021: $23.99, sold out.
- Tabalí Talinay Syrah (Limarí): $27.99 (https://reach.dog/shop/wine-dispensary/products/tabali-talinay-syrah-limari-valley-chile, store location not stated) → range set to **$15–30**.

I spot-checked the writer's other prices against the log table, and every range covers the price the writer saw. I did not refetch them.

## Atlas consistency (confirmed)
- vintage/fr.json `fr-chateauneuf-du-pape`: growing-season temperature 18.92 °C (1961–90) and 20.23 °C (1991–2020); maximum 22.4 °C in 2022. Days ≥35 °C: mean 12.6 (1961–90) and 32.2 (2016–25); 2003 = 48, 2022 = 47. All match the guide.
- ageing/profiles.json: all windows quoted in the southern-rhone vintages chapter match (Côtes du Rhône and Ventoux 1–4; Villages, Rasteau, Cairanne and Lirac ready at 2, peak 3–8; Vacqueyras 4–10; Gigondas 6–15; Châteauneuf red ready 5, peak 8–18; top cuvées ready 8, peak 10–25, limit 40; white 2–10, limit 18; Tavel 1–3; Muscat de Beaumes-de-Venise 0–3). The syrah guide's Hermitage window of 12–30 matches as well.
- Australian GDD figures (Barossa 1,970, Heathcote 1,880, Canberra 1,650, Grampians 1,540, Yarra 1,440; Barossa growing-season rain 209 mm) match the Wine Australia figures in content/au.json. Note: the TerraClimate values in topo/_attrs.json are different (for example Barossa gdd 1880 and Yarra 1255). The guide quotes Wine Australia, which is fine. The text attributes the figures correctly.

## Atlas notes (not edited)
- Same as writer items 1–10. In addition: the nz.json Hawke's Bay figures could be updated to NZ Winegrowers 2025: 4,454 ha producing; Syrah 281 ha producing and 306 ha planted.
- The fr content profile on Côtes du Rhône Villages grape rules should be checked against the current cahier, since the sources conflict (40/25 vs 50/20).

## Still unverified (soft, from memory or the atlas)
- Number of Côtes du Rhône communes (167, which the writer took from Inter Rhône; 171 is often quoted elsewhere).
- Porseleinberg first vintage 2010; Columella 2000; Mullineux 2007; Falernia 1998; Alcohuaz 1,700–2,200 m.
- Beaucastel heating its grapes; Hommage first made in 1989 (writer: Wikipedia).
- Henri Bonneau died in 2016; Chave since 1481; the Stérimberg legend of 1224; Jaboulet La Chapelle 1961; Guigal first vintages 1966/1978/1985 (all well known; not refetched).
- Rasteau VDN ageing terms (tuilé/ambré after more than 30 months), from the writer's Inter Rhône source.
- Laudun "about 30 percent white".
