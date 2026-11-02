# T02: Verify the price of every tasting pick in the guides

**Input:** `docs/data/guides/*.json` (not `_index.json`). Each chapter has `taste: [{wine, why, price, try: [producers], place}]`. Prices are rough US retail ranges in USD, 2026.

**Do:**
1. For every taste pick, find 1–3 current US retail listings for the named example producers' wine (in `try`) or, if none, a representative wine matching `wine`. Good sources: retailer product pages (Saratoga Wine Exchange, wine.com product pages, K&L, Astor, Flatiron, Total Wine product pages, Millesima USA, Sherry-Lehmann, Bottle Barn). Note the vintage, bottle size (750 ml unless stated) and price.
2. Do not edit the guide files.
3. Output `staging/T02/prices.csv` with columns: `guide,chapter_id,pick_index,wine,current_range,producer,listing_price,vintage,size_ml,retailer,url,date_checked,verdict` where verdict is `ok` (inside range), `low`, `high`, `not_found`, or `producer_wrong` (producer doesn't make that wine).
4. Add `suggested_range` per pick in a second file `staging/T02/summary.csv`: `guide,chapter_id,pick_index,current_range,suggested_range,n_listings,notes`. Suggest a change only with 2+ listings.

**Rules:** US prices only (convert nothing). Skip auction sites and marketplaces with third-party sellers. Never guess a price; `not_found` is fine.
**Report:** counts by verdict, the 20 biggest mismatches.
