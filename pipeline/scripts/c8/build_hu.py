import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c8")
from common import write
from hu_country import COUNTRY
from hu_regions import REGIONS
from hu_apps import APPS
import hu_sites_tokaj, hu_sites_other
write("hu", {"countries": [COUNTRY], "regions": REGIONS, "appellations": APPS,
             "sites": hu_sites_tokaj.SITES + hu_sites_other.SITES})
