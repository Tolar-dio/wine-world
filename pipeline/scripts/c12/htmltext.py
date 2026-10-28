import re, html, sys
def text(fn):
    t = open(fn, encoding="utf-8", errors="ignore").read()
    t = re.sub(r"<script.*?</script>|<style.*?</style>|<noscript.*?</noscript>", "", t, flags=re.S)
    t = re.sub(r"<br\s*/?>|</p>|</li>|</h\d>|</tr>|</div>", "\n", t)
    t = re.sub(r"<[^>]+>", " ", t)
    t = html.unescape(t)
    lines = [re.sub(r"[ \t]+", " ", l).strip() for l in t.split("\n")]
    return "\n".join(l for l in lines if len(l) > 2)
if __name__ == "__main__":
    s = text(sys.argv[1])
    if len(sys.argv) > 2:
        pat = re.compile(sys.argv[2], re.I)
        for l in s.split("\n"):
            if pat.search(l): print(l[:600])
    else:
        print(s[:int(sys.argv[3]) if len(sys.argv) > 3 else 8000])
