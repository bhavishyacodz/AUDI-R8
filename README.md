# AUDI R8 Interactive Configurator

React + Three.js interactive Audi R8 V10-inspired configurator. Work is developed on feature branches; `main` is the stable integration branch.

## Run locally
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Cloudflare Workers deployment
This repository is configured for Cloudflare Workers Static Assets through `wrangler.jsonc`.

In Cloudflare Workers Builds, connect the repository and select the branch you intend to preview (currently `feat/audi-r8-configurator-foundation`). Use:
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Build variables: none required for the current frontend

The Wrangler config publishes the Vite `dist/` output and enables SPA fallback routing. Keep the feature branch selected until its preview has been tested; do not merge to `main solely to trigger a deployment.

## Features
- Interactive 3D vehicle scene with orbit, zoom, camera presets and optional pointer parallax.
- Six paint finishes, four wheel finishes and three studio lighting environments.
- Clickable door, spoiler and wheel interactions.
- Synthesized UI / engine audio initiated only by user interaction.
- Build specification modal and a non-misleading scene-status HUD.
- Responsive desktop and mobile controls.

## Accuracy note
The current vehicle is a procedural R8-inspired placeholder mesh, not a photorealistic licensed Audi asset. Verify technical specifications and paint codes against the exact model year and market before commercial use. See [implementation notes](docs/IMPLEMENTATION-NOTES.md) and the [desktop/mobile QA checklist](docs/QA-CHECKLIST.md).
