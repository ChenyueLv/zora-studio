"""Build the faculty quote's small OFL webfont from the upstream WenKai TTF.

Usage: python scripts/build-faculty-font.py /path/to/LXGWWenKaiLite-Regular.ttf
Requires fonttools and brotli. This is an optional asset-authoring step, not a
runtime/build dependency. Re-run when adding Chinese copy to FacultySection.
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
source = (root / "src/components/FacultySection.tsx").read_text()
# Include punctuation and ASCII too; unsupported future copy falls back to MiSans.
characters = set(source) | {chr(i) for i in range(32, 127)}
font = TTFont(sys.argv[1])
options = subset.Options()
options.name_IDs = ["*"]
options.name_legacy = True
options.name_languages = ["*"]
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=[ord(c) for c in characters])
subsetter.subset(font)

# Rename the derivative; preserve the upstream copyright and OFL name records.
names = {
    1: "Zora Faculty Hand", 2: "Regular", 3: "ZoraFacultyHand-Regular-1.522",
    4: "Zora Faculty Hand Regular", 6: "ZoraFacultyHand-Regular",
    16: "Zora Faculty Hand", 17: "Regular",
}
for record in list(font["name"].names):
    if record.nameID in names:
        font["name"].setName(names[record.nameID], record.nameID,
                            record.platformID, record.platEncID, record.langID)
font.flavor = "woff2"
output = root / "public/fonts/ZoraFacultyHand-Regular.woff2"
font.save(output)
print(f"{output.name}: {output.stat().st_size:,} bytes")
