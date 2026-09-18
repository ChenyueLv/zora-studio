# Course website typography

The course website uses **MiSans** by Xiaomi for body/UI text and **Smiley Sans / 得意黑** by atelierAnchor for display headings. These files are original, unmodified WOFF2 files supplied by their publishers; no subsetting, glyph changes or renaming has been applied to the font binaries.

- `SmileySans-Oblique.woff2`: publisher file `SmileySans-Oblique.ttf.woff2` from [v2.0.1](https://github.com/atelier-anchor/smiley-sans/releases/tag/v2.0.1). Distributed with `SmileySans-OFL.txt` (SIL OFL 1.1).
- `MiSans-Regular.woff2`: `MiSans/woff2/MiSans-Regular.woff2` from Xiaomi's [official download archive](https://hyperos.mi.com/font-download/MiSans.zip), downloaded 2026-09-19. Used as an embedded resource of this website. Distributed with the publisher's `MiSans-License.pdf`; see the [official font website](https://hyperos.mi.com/font/en/download/).

The website self-hosts these assets under `/fonts/` and uses `font-display: swap`. No third-party font CDN is required. The full character coverage is retained for course text and user input. Font licenses are separate from the website code; the files are not offered as a standalone font product.
