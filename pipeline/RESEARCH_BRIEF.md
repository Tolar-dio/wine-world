# Brief for content research agents (Vitis Mundi wine atlas)

You are writing the text and point data for a wine-nerd atlas website (interactive globe with real appellation boundaries). Read `/home/claude/winesite/SPEC.md` first, especially "Content output". Your JSON is joined to map polygons by appellation name, so official names matter.

Deliverables:
1. JSON file(s) in `/home/claude/winesite/data/content/` exactly in the SPEC content shape (top-level keys `countries`, `regions`, `appellations`, `sites`; any may be empty). Validate with `python3 -m json.tool <file> > /dev/null`. Write incrementally (e.g. build a Python dict in a script, or write per-region part files and merge them at the end into the single file named in your prompt). Do not leave a half-written invalid file at the end.
2. A research log in `/home/claude/winesite/research_notes/Wine atlas geography and history/{your topic}.md`: what you covered, open questions, and the sources you relied on (title + URL).

Method: you already know a great deal about wine. Write from expertise, but verify with web searches and fetches anything that could be stale or that you are unsure of: hectares and production figures, dates of recognition, current classification lists, new appellations, producer facts, and site coordinates. Prefer primary sources: national registers (eAmbrosia for EU names, INAO, TTB, Wine Australia), consortia and interprofessions, OIV, and well-regarded references. Don't stall on exhaustive verification of every sentence: budget your searches for the facts most likely to be wrong.

Coverage: aim to cover every protected appellation in your area that a serious wine reference would list (all AOC/DOC/DO etc.), with depth proportional to importance. Famous places get the full treatment; obscure ones still get a few informative sentences rather than being skipped. Add `sites` generously where they help a nerd explore: grand/premier crus, classified estates, famous single vineyards, MGAs/UGAs/contrade, quintas, Port lodges, Champagne houses, historic cellars, monasteries, archaeological wine sites, wine museums, UNESCO wine landscapes. Each site needs accurate coordinates.

Voice: knowledgeable, warm, story-driven, direct. Explain why each fact matters (what the slope, soil, river or law does to the wine; what history did to the place). Concrete nouns, real names, real dates. No em dashes anywhere (use commas, colons, parentheses or full stops). Avoid filler and these words: delve, robust, seamless, game-changer, unlock, leverage, comprehensive, cutting-edge, transformative, innovative, "it's worth noting", "nestled", "boasts", "tapestry", "testament".

Text formatting inside JSON strings: plain text; paragraphs separated by "\n\n"; you may use *italic* for foreign terms and wine names. No HTML.

When done, reply with a short summary: files written, counts of countries/regions/appellations/sites, notable gaps.
