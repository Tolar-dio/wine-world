# Quick check plot: python3 -I scripts/itb_plot.py work/italy-bounds/t03_romagna.json zone[,zone] out.png [area_keys]
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import shapely
from shapely.geometry import shape
import itb_common as C
from itb_areas import AREAS

d = json.load(open(sys.argv[1]))
zones = sys.argv[2].split(',')
gs = [C.to3035(shape(d[z])) for z in zones]
u = shapely.union_all(gs)
w, s, e, n = u.bounds
pad = max(e - w, n - s) * 0.15
fig, ax = plt.subplots(figsize=(9, 9), dpi=80)
com = C.comuni()
sub = com[com.intersects(shapely.box(w - pad, s - pad, e + pad, n + pad))]
for _, r in sub.iterrows():
    for p in getattr(r.geometry, 'geoms', [r.geometry]):
        ax.plot(*p.exterior.xy, color='#999', lw=0.8, ls='--')
    c = r.geometry.representative_point()
    ax.text(c.x, c.y, r.COMUNE, fontsize=7, color='#666')
if len(sys.argv) > 4:
    import itb_trace as T
    D = T.Data(sys.argv[4].split(','), AREAS)
    bb = shapely.box(w - pad, s - pad, e + pad, n + pad)
    for t, g, k in D.ways:
        if not g.intersects(bb):
            continue
        if k == 'highway' and t.get('highway') in ('primary', 'secondary', 'tertiary', 'trunk', 'unclassified'):
            ax.plot(*g.xy, color='#c8a', lw=0.6)
        elif k == 'waterway' and t.get('waterway') in ('river', 'stream'):
            ax.plot(*g.xy, color='#59f', lw=0.6)
cols = ['#d22', '#2a2', '#22d', '#d80', '#808', '#088']
for i, g in enumerate(gs):
    for p in getattr(g, 'geoms', [g]):
        ax.fill(*p.exterior.xy, alpha=0.25, color=cols[i % 6])
        ax.plot(*p.exterior.xy, color=cols[i % 6], lw=1.5)
    c = g.representative_point()
    ax.text(c.x, c.y, zones[i], fontsize=10, weight='bold', color=cols[i % 6])
ax.set_xlim(w - pad, e + pad); ax.set_ylim(s - pad, n + pad); ax.set_aspect('equal')
ax.set_xticks([]); ax.set_yticks([])
plt.tight_layout(); plt.savefig(sys.argv[3])
