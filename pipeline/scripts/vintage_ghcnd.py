#!/usr/bin/env python3
"""Parse GHCN-Daily station CSVs (raw/ghcnd/csv, NOAA NCEI, public domain) into tidy daily arrays
and monthly aggregates used to calibrate/validate the vintage proxies.
Values with a non-blank GHCN quality flag are dropped. A month counts only with >= 25 valid days.
Output: work/vintage/ghcnd_monthly.json  {sid: {"lat","lon","elev","name","tag","app",
   "months": {"YYYY-MM": [tmin_mean, tmax_mean, prcp_sum, frost_nights(Tmin<=0), tmin_abs, ndays_tmin,
   n_tmin_le_m2, hot_days(Tmax>=35), ndays_tmax, warm_days(Tmax>=30)]}}}
Run: python3 -I scripts/vintage_ghcnd.py
"""
import csv
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path("/home/claude/winesite")


def val(row, k):
    v = row.get(k)
    if v is None or v.strip() == "":
        return None
    att = (row.get(k + "_ATTRIBUTES") or ",,").split(",")
    if len(att) > 1 and att[1].strip():
        return None   # failed a quality check
    return int(v) / 10.0


def main():
    out = {}
    for line in open(ROOT / "work/vintage/ghcnd_list.txt"):
        sid, tag, app = line.split()
        p = ROOT / "raw/ghcnd/csv" / f"{sid}.csv"
        days = defaultdict(list)
        meta = None
        with open(p, newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                d = row["DATE"]
                if meta is None:
                    meta = {"lat": float(row["LATITUDE"]), "lon": float(row["LONGITUDE"]),
                            "elev": float(row["ELEVATION"]), "name": row["NAME"], "tag": tag, "app": app}
                if int(d[:4]) < 1950:
                    continue
                days[d[:7]].append((val(row, "TMIN"), val(row, "TMAX"), val(row, "PRCP")))
        months = {}
        for ym, L in days.items():
            tn = [a for a, b, c in L if a is not None]
            tx = [b for a, b, c in L if b is not None]
            pr = [c for a, b, c in L if c is not None]
            rec = [None] * 10
            if len(tn) >= 25:
                rec[0] = round(sum(tn) / len(tn), 2)
                rec[3] = sum(1 for a in tn if a <= 0)
                rec[4] = min(tn)
                rec[5] = len(tn)
                rec[6] = sum(1 for a in tn if a <= -2)
            if len(tx) >= 25:
                rec[1] = round(sum(tx) / len(tx), 2)
                rec[7] = sum(1 for b in tx if b >= 35)
                rec[8] = len(tx)
                rec[9] = sum(1 for b in tx if b >= 30)
            if len(pr) >= 28:
                rec[2] = round(sum(pr) * len(L) / len(pr), 1) if len(pr) < len(L) else round(sum(pr), 1)
            months[ym] = rec
        meta["months"] = months
        out[sid] = meta
    json.dump(out, open(ROOT / "work/vintage/ghcnd_monthly.json", "w"))
    print(len(out), "stations")


if __name__ == "__main__":
    main()
