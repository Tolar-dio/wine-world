#!/usr/bin/env python3
"""Upload docs/data/depth/**/*.pmtiles to R2 under content-hashed keys, verify each one through the public
URL with a cross-origin range request, merge them into docs/data/depth/remote.json, then delete the uploaded
files from docs/ (the Pages copy is no longer read; R2 is the only copy served):

  {"base": "https://pub-<id>.r2.dev/",
   "files": {"data/depth/<pack>/terrain.pmtiles": {"key": "depth/<pack>/terrain.<sha12>.pmtiles", "size": n}}}

Run by .github/workflows/terrain-r2.yml (needs BUCKET, PUBLIC_BASE, WRANGLER, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID).
"""
import hashlib
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

DOCS = Path("docs")
DEPTH = DOCS / "data" / "depth"
BUCKET = os.environ["BUCKET"]
BASE = os.environ["PUBLIC_BASE"]
WRANGLER = os.environ.get("WRANGLER", "wrangler@4")
ORIGIN = "https://vitismundi.app"
UA = "VitisMundiDeploy/1.0 (+https://vitismundi.app)"


def sha(p):
    h = hashlib.sha256()
    with p.open("rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def probe(url, rng="bytes=0-6"):
    """cross-origin range read through the public URL: (status, body, allow-origin header)"""
    req = urllib.request.Request(url, headers={"Range": rng, "Origin": ORIGIN, "User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, r.read(), r.headers.get("Access-Control-Allow-Origin")
    except urllib.error.HTTPError as e:
        return e.code, b"", None


def main():
    files = sorted(DEPTH.rglob("*.pmtiles"))
    rj = DEPTH / "remote.json"
    out = json.loads(rj.read_text()) if rj.exists() else {"files": {}}
    out["base"] = BASE
    out.setdefault("files", {})
    if not files:
        print("no new terrain packs under docs/data/depth; remote.json kept")
    for p in files:
        rel = p.relative_to(DOCS).as_posix()                      # data/depth/<pack>/terrain.pmtiles
        h = sha(p)[:12]
        key = "depth/" + p.relative_to(DEPTH).with_suffix("").as_posix() + f".{h}.pmtiles"
        size = p.stat().st_size
        status, body, _ = probe(BASE + key)
        if status == 206 and body == b"PMTiles":
            print(f"unchanged  {rel} -> {key}")
        else:
            print(f"uploading  {rel} ({size / 1e6:.1f} MB) -> {key}", flush=True)
            for attempt in range(3):
                r = subprocess.run(["npx", "--yes", WRANGLER, "r2", "object", "put", f"{BUCKET}/{key}", "--file", str(p),
                                    "--remote", "--content-type", "application/octet-stream",
                                    "--cache-control", "public, max-age=31536000, immutable"])
                if r.returncode == 0:
                    break
                time.sleep(10 * (attempt + 1))
            else:
                sys.exit(f"upload failed: {rel}")
        # the site reads these with Range requests from vitismundi.app: check exactly that
        for attempt in range(6):
            status, body, acao = probe(BASE + key)
            if status == 206 and body == b"PMTiles" and acao in (ORIGIN, "*"):
                break
            time.sleep(5)
        else:
            sys.exit(f"verification failed for {key}: status {status}, allow-origin {acao!r}")
        out["files"][rel] = {"key": key, "size": size}
    rj.write_text(json.dumps(out, indent=1, sort_keys=True) + "\n")
    print(f"wrote {rj} ({len(out['files'])} files)")
    for p in files:            # verified on R2 and listed in remote.json: drop the Pages copy
        p.unlink()
        print(f"removed    {p}")


if __name__ == "__main__":
    main()
