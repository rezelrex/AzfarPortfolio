# AzfarPortfolio

Personal portfolio for **Azfar Yusri** — Fintech × AI engineer (SUTD, Computer Science & Design).

## Design direction

**Tactical Telemetry / Industrial Brutalism** — inspired by declassified military terminals, aerospace HUDs, and experimental halftone poster design.

- **Substrate:** deactivated-CRT dark (`#0A0A0A`), white phosphor foreground (`#EAEAEA`)
- **Accent:** hazard red (`#FF2A2A`); terminal green (`#4AF626`) reserved for the single status indicator
- **Type:** Archivo Black (macro/display) · IBM Plex Mono (telemetry/metadata) · Inter (body prose)
- **Devices:** 1px compartment grids, crosshair registration marks, SVG barcode, scanline + noise overlays, ASCII framing (`[ CASE FILES ]`, `>>>`)
- **Motion:** GSAP + ScrollTrigger — hero load sequence, batched scroll reveals, red marquee conveyor. Fully disabled under `prefers-reduced-motion`.

## Structure

```
index.html        — single-page site (hero / profile / case files / service record / contact)
css/style.css     — full design system
js/main.js        — GSAP animations
assets/           — resume PDF (linked as "DOSSIER")
```

## Run

No build step. Open `index.html` directly, or serve locally:

```
python -m http.server 8000
```

## Content sources

- Resume (2026)
- https://azfaryusri.framer.website/
- https://www.linkedin.com/in/azfar-yusri/
