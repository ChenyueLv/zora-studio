# HUYML reference reconstruction

Reference: https://huyml.co/ — inspected 2026-09-15.

The visual direction is the original portfolio: pale gray paper, tiny editorial metadata, a generous empty canvas, a folding 3D image stack, contrasting Glyphius display type, and a black-and-white interactive Rive illustration. Fidelity to the reference takes precedence over inventing a new visual direction.

## Tokens

- Background: #ececec; ink: #181818; secondary: #858585.
- Accent: #ec6061; oversized decorative numerals: #ffffff.
- UI text: BT Grotesk Regular / Medium, 10px at 1280px, 12px on large desktop, 13px on mobile.
- Display: BT Glyphius Regular; desktop nav 19px; project labels 16px; about text 24px.
- Desktop margins: 20px; mobile margins: 16px.
- Persistent nav left edge: 13.85vw. Project gallery left edge: 27.5vw; width: 45vw.
- At widths below 1200px: mobile hamburger, centered horizontal logo, one-column content.

## Routes and behavior

- `/`: 19 projects, infinite scroll/drag, inertia + snap, hover lift, image zoom, selected metadata, counter and palette, project navigation, showreel.
- `/project/:slug`: all 19 detail routes, original editorial content and galleries, fixed desktop info, scroll-aware thumbnail navigation, media lightbox and next project.
- `/about`: original Rive artboard and its view-model triggers, 9 hobby cards, approach/process panel, awards, publications, capabilities and clients.
- `/playground`: all 83 experiments, four columns on desktop, one on mobile, original Vimeo embeds, keyboard/touch-aware lightbox.
- Shared: desktop navigation, mobile full-screen menu, contact/credits cards, email copy feedback, live HCMC clock, opt-in audio, black curtain transitions.

## Implementation decisions

React + TypeScript + Vite, Three.js, GSAP, Rive Canvas. Site content is editable in `src/data`; layout in `src/styles.css`; behavior in separate components and pages. The original publicly delivered gallery shader and Rive artwork are reused with source attribution to retain their distinctive animation. Other application code is a new implementation, not a Framer runtime mirror. Original images/fonts/audio are local; Vimeo media needs a network connection.

## Verification limits

The original is a Framer site and its original authoring project is not available. Rebuilt browser interactions are comparable implementations; exact timing, loader choreography and shader image-atlas resampling can differ. External websites and Vimeo availability remain controlled by their respective services.
