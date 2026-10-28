#!/bin/bash
# Download Swiss Rebbaukataster (vineyard cadastre, MGDM 151.1) per canton from geodienste.ch WFS.
# Free cantons only. Output: raw/ch_rebbau/{KT}_{n}.geojson (EPSG:2056)
OUT=/home/claude/winesite/raw/ch_rebbau
mkdir -p $OUT
URL="https://geodienste.ch/db/lwb_rebbaukataster_v2_0_0/deu"
for KT in "$@"; do
  F="<Filter><PropertyIsEqualTo><PropertyName>kanton</PropertyName><Literal>$KT</Literal></PropertyIsEqualTo></Filter>"
  start=0; step=10000
  while :; do
    f=$OUT/${KT}_${start}.geojson
    if [ ! -s "$f" ]; then
      for i in 1 2 3 4; do
        curl -sS -m 600 -G "$URL" --data-urlencode "SERVICE=WFS" --data-urlencode "VERSION=2.0.0" \
          --data-urlencode "REQUEST=GetFeature" --data-urlencode "TYPENAMES=ms:rebbaukataster" \
          --data-urlencode "OUTPUTFORMAT=application/json; subtype=geojson" --data-urlencode "COUNT=$step" \
          --data-urlencode "STARTINDEX=$start" --data-urlencode "FILTER=$F" -o "$f" && break
        sleep 5
      done
    fi
    n=$(grep -o '"type": "Feature"' "$f" | wc -l)
    echo "$KT start=$start n=$n"
    if [ "$n" -lt "$step" ]; then break; fi
    start=$((start+step))
  done
done
