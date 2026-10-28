# Merge Spain part files into data/content/es.json and run coverage/consistency checks.
import json, glob, csv, sys
sys.path.insert(0, '/home/claude/winesite/scripts/es')
from common import check_text
parts = sorted(glob.glob('/home/claude/winesite/work/es/parts/*.json'))
out = {'countries': [], 'regions': [], 'appellations': [], 'sites': []}
for p in parts:
    d = json.load(open(p, encoding='utf-8'))
    for k in out: out[k] += d.get(k, [])
# dedupe sites by id
seen = set(); sites = []
for s in out['sites']:
    if s['id'] in seen: print('dup site', s['id']); continue
    seen.add(s['id']); sites.append(s)
out['sites'] = sites
# coverage vs EU dataset
eu = [r for r in csv.DictReader(open('/home/claude/winesite/raw/eupdo/PDO_EU_id.csv', encoding='utf-8-sig')) if r['Country'] == 'ES']
allmatch = {m for a in out['appellations'] for m in a['match']}
missing = [r['PDOnam'] for r in eu if r['PDOnam'] not in allmatch]
print('EU names not matched:', missing)
mapa = ['Rioja','Priorat / Priorato','Cava','Jumilla','Condado de Huelva','Granada','Jerez-Xérès-Sherry / Jerez / Xérès / Sherry','Málaga','Manzanilla-Sanlúcar de Barrameda / Manzanilla','Montilla-Moriles','Sierras de Málaga','Calatayud','Campo de Borja','Cariñena','Somontano','Urbezo','Binissalem','Pla i Llevant','Abona','El Hierro','Gran Canaria','La Gomera','La Palma','Lanzarote','Tacoronte-Acentejo','Valle de Güímar','Valle de la Orotava','Ycoden-Daute-Isora','Arlanza','Arribes','Bierzo','Cigales','León','Ribera del Duero','Rueda','Tierra del Vino de Zamora','Toro','Almansa','Campo de Calatrava','La Mancha','Manchuela','Méntrida','Mondéjar','Ribera del Júcar','Uclés','Valdepeñas','Alella','Cataluña / Catalunya','Conca de Barberà','Costers del Segre','Empordà','Montsant','Penedès','Pla de Bages','Tarragona','Terra Alta','Ribera del Guadiana','Monterrei','Rías Baixas','Ribeira Sacra','Ribeiro','Valdeorras','Vinos de Madrid','Bullas','Yecla','Navarra','Arabako Txakolina / Txakolí de Álava / Chacolí de Álava','Bizkaiko Txakolina / Chacolí de Bizkaia / Txakolí de Bizkaia','Getariako Txakolina / Chacolí de Getaria / Txakolí de Getaria','Alicante','Utiel-Requena','Valencia','Aylés','Abadía Retuerta','Dehesa Peñalba','Urueña','Calzadilla','Campo de La Guardia','Casa del Blanco','Dehesa del Carrizal','Dominio de Valdepusa','El Vicario','Finca Élez','Guijoso','La Jaraba','Los Cerrillos','Pago Florentino','Río Negro','Rosalejo','Vallegarcía','Bolandin','Pago de Arínzano','Pago de Otazu','Prado de Irache','Chozas Carrascal','El Terrerazo','Los Balagueses','Tharsys','Vera de Estenas','Lebrija','Cangas','Islas Canarias','Cebreros','Sierra de Salamanca','Valles de Benavente','Valtiendas']
print('MAPA count', len(mapa), 'not matched:', [m for m in mapa if m not in allmatch])
names = [a['name'] for a in out['appellations']]
print('dup appellation names:', {n for n in names if names.count(n) > 1})
regnames = {r['name'] for r in out['regions']}
print('appellation regions not in regions:', {a['region'] for a in out['appellations'] if a['region'] not in regnames})
print('regions parent not found:', {r['parent_region'] for r in out['regions'] if r['parent_region'] and r['parent_region'] not in regnames})
appn = set(names)
print('site appellation not found:', {s['appellation'] for s in out['sites'] if s['appellation'] not in appn and s['appellation'] not in regnames})
print('text problems:', check_text(out, 'es')[:20])
# word counts for famous summaries
for a in out['appellations']:
    w = len(a['summary'].split())
    if w < 25: print('short summary', a['name'], w)
json.dump(out, open('/home/claude/winesite/data/content/es.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print({k: len(v) for k, v in out.items()})
