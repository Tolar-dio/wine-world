import json, time, urllib.request, urllib.parse
UA={"User-Agent":"VitisMundiResearch/1.0 (wine atlas; low volume)"}
Q={"suau":"Château Suau, Barsac","ch-urville":"Urville, Aube","h-ay-riots":"Hôtel de ville, Aÿ-Champagne","lr-pinet":"Pinet, Hérault","lr-faugeres":"Faugères, Hérault",
   "carbonnieux":"Château Carbonnieux, Léognan","r-jau":"Château de Jau, Cases-de-Pène","lynch-moussas":"Château Lynch-Moussas, Pauillac","sw-buzet":"Les Vignerons de Buzet, Buzet-sur-Baïse"}
C=json.load(open('/home/claude/winesite/work/fr_a/coords.json'))
for k,q in Q.items():
    u="https://nominatim.openstreetmap.org/search?"+urllib.parse.urlencode({"q":q,"format":"jsonv2","limit":1,"countrycodes":"fr"})
    try: h=json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=40))
    except Exception as e: h=[]
    time.sleep(1.1)
    if h:
        print(k,'|',h[0]['display_name'][:90],'|',h[0]['lat'][:8],h[0]['lon'][:8],'| old',C.get(k))
        C[k]=[round(float(h[0]['lat']),4),round(float(h[0]['lon']),4),'precise' if k in('carbonnieux','lynch-moussas','sw-buzet','r-jau','suau') else 'approx']
    else: print(k,'NONE')
json.dump(C,open('/home/claude/winesite/work/fr_a/coords.json','w'),indent=0)
