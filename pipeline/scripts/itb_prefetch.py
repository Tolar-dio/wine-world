# Prefetch Overpass area data for the T03/T05 zones (cached in raw/italy-bounds/overpass).
import sys, time
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
from itb_areas import AREAS
for k in sys.argv[1:] or AREAS:
    t = time.time()
    try:
        js = C.area_data(AREAS[k])
        print(k, len(js['elements']), round(time.time() - t), flush=True)
    except Exception as e:
        print(k, 'FAIL', e, flush=True)
