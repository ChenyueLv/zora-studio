# Course website typography

The course website uses **MiSans** by Xiaomi for section headings, body/UI text and upright numerals, **Smiley Sans / 得意黑** by atelierAnchor for the hero and closing headlines, and a small **LXGW WenKai Lite / 霞鹜文楷轻便版** derivative for the faculty quote. MiSans and Smiley Sans remain original, unmodified publisher WOFF2 files.

- `SmileySans-Oblique.woff2`: publisher file `SmileySans-Oblique.ttf.woff2` from [v2.0.1](https://github.com/atelier-anchor/smiley-sans/releases/tag/v2.0.1). Distributed with `SmileySans-OFL.txt` (SIL OFL 1.1).
- `MiSans-{Light,Regular,Medium}.woff2`: original files from `MiSans/woff2/` in Xiaomi's [official download archive](https://hyperos.mi.com/font-download/MiSans.zip), downloaded 2026-09-19. Light (300) is for large section headings and numerals; Regular (400) for reading; Medium (500) for subheadings and actions. Used as embedded resources of this website. Distributed with `MiSans-License.pdf`; see the [official font website](https://hyperos.mi.com/font/en/download/).
- `ZoraFacultyHand-Regular.woff2`: web-only subset of `LXGWWenKaiLite-Regular.ttf` from [v1.522](https://github.com/lxgw/LxgwWenKai-Lite/releases/tag/v1.522), downloaded 2026-09-19. Renamed **Zora Faculty Hand** to avoid reserved font names. Distributed under SIL OFL 1.1 with `LXGWWenKai-OFL.txt`; original copyright/license records remain embedded. Used only for the faculty quote, with MiSans fallback for missing characters.

The website self-hosts these assets under `/fonts/` and uses `font-display: swap`. No third-party font CDN is required. MiSans retains full character coverage for course text and user input. Font licenses are separate from the website code; the files are not offered as a standalone font product.

To rebuild the faculty subset after copy changes, install `fonttools` and `brotli` in a temporary Python environment, then run `python scripts/build-faculty-font.py /path/to/LXGWWenKaiLite-Regular.ttf`. The script gathers characters from `FacultySection.tsx`, preserves license records, renames the derivative and writes WOFF2. Normal website builds do not require Python or the original TTF.
