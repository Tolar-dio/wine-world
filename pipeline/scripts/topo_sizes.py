"""HEAD every needed Copernicus GLO-30 tile to get its byte size (planning only)."""
import json, concurrent.futures as cf, requests
W='/home/claude/winesite'
d=json.load(open(f'{W}/work/topo/tiles_need.json'))
avail=set(l.strip() for l in open(f'{W}/raw/copdem30/tileList.txt'))
tiles=[t for t in d['need'] if t in avail]
S=requests.Session()
def head(t):
    u=f'https://copernicus-dem-30m.s3.amazonaws.com/{t}/{t}.tif'
    for _ in range(3):
        try:
            r=S.head(u,timeout=30); return t,int(r.headers.get('Content-Length',0))
        except Exception as e: err=e
    return t,-1
with cf.ThreadPoolExecutor(32) as ex: res=dict(ex.map(head,tiles))
json.dump(res,open(f'{W}/work/topo/tile_sizes.json','w'))
print(len(res), sum(v for v in res.values() if v>0)/1e9,'GB', sum(1 for v in res.values() if v<0))
