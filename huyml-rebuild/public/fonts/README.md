# Course website typography

The course website uses **MiSans** by Xiaomi for section headings, body/UI text and upright numerals, **Smiley Sans / 得意黑** by atelierAnchor for the hero, closing headlines and faculty quote. MiSans and Smiley Sans remain original, unmodified publisher WOFF2 files.

- `SmileySans-Oblique.woff2`: publisher file `SmileySans-Oblique.ttf.woff2` from [v2.0.1](https://github.com/atelier-anchor/smiley-sans/releases/tag/v2.0.1). Distributed with `SmileySans-OFL.txt` (SIL OFL 1.1).
- `MiSans-{Light,Regular,Medium}.woff2`: original files from `MiSans/woff2/` in Xiaomi's [official download archive](https://hyperos.mi.com/font-download/MiSans.zip), downloaded 2026-09-19. Light (300) is for large section headings and numerals; Regular (400) for reading; Medium (500) for subheadings and actions. Used as embedded resources of this website. Distributed with `MiSans-License.pdf`; see the [official font website](https://hyperos.mi.com/font/en/download/).

The website self-hosts these assets under `/fonts/` and uses `font-display: swap`. No third-party font CDN is required. MiSans retains full character coverage for course text and user input. Font licenses are separate from the website code; the files are not offered as a standalone font product.
