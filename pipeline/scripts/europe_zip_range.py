# Extract selected members from a large remote zip using HTTP range requests (no full download).
# Usage: python3 -I europe_zip_range.py URL OUTDIR SUBSTRING [SUBSTRING...]
import sys, os, io, zipfile, urllib.request, shutil
url, outdir, subs = sys.argv[1], sys.argv[2], sys.argv[3:]
class HttpFile(io.RawIOBase):
    def __init__(s, url):
        s.url = url; s.pos = 0
        with urllib.request.urlopen(urllib.request.Request(url, method='HEAD'), timeout=60) as r:
            s.size = int(r.headers['Content-Length'])
    def seekable(s): return True
    def readable(s): return True
    def tell(s): return s.pos
    def seek(s, off, wh=0):
        s.pos = off if wh == 0 else s.pos + off if wh == 1 else s.size + off
        return s.pos
    def readinto(s, b):
        n = len(b)
        if n == 0 or s.pos >= s.size: return 0
        end = min(s.size, s.pos + n) - 1
        for attempt in range(6):
            try:
                req = urllib.request.Request(s.url, headers={'Range': f'bytes={s.pos}-{end}'})
                with urllib.request.urlopen(req, timeout=300) as r: d = r.read()
                break
            except Exception as e:
                if attempt == 5: raise
        b[:len(d)] = d; s.pos += len(d); return len(d)
z = zipfile.ZipFile(io.BufferedReader(HttpFile(url), buffer_size=8 << 20))
os.makedirs(outdir, exist_ok=True)
for i in z.infolist():
    if any(x.lower() in i.filename.lower() for x in subs) and not i.filename.endswith('.lock'):
        name = os.path.basename(i.filename.replace('\\', '/'))
        with z.open(i) as src, open(os.path.join(outdir, name), 'wb') as dst:
            shutil.copyfileobj(src, dst, 8 << 20)
        print('extracted', name, i.file_size, flush=True)
