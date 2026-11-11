# Implementation Notes

## Imported foundation
This repository contains a modular React, Vite, React Three Fiber and Three.js configurator. It is self-contained and does not connect to Company-001 or an external backend.

## Runtime design
- `src/constants/configuratorData.js`: paint, wheel, lighting, camera and specification data.
- `src/shaders/carPaintShader.js`: procedural metallic paint shader.
- `src/utils/audioEngine.js`: user-initiated Web Audio synthesis.
- `src/components/3d`: procedural vehicle scene, studio lighting and camera transitions.
- `src/components/ui`: responsive controls, renderer telemetry and specification modal.
- `src/App.jsx`: local state and scene composition.

## Corrections to the supplied draft
- The HUD avoids presenting a standalone animation-loop estimate as actual renderer FPS or draw-call telemetry.
- Animation-frame loops, shader resources and audio resources are cleaned up.
- Camera transitions animate the OrbitControls target as well as camera position.
- Shader normals and view vectors use world-space coordinates consistently.
- Audio is started only after user interaction and uses conservative synthesized levels.
- The tilt toggle drives subtle pointer-based model parallax; it does not request device-motion permissions.
- Engine control now separates ignition, rev and stop actions so a rev click cannot accidentally toggle the engine off.
- Camera position, field-of-view and OrbitControls-target tweens are all cancelled during view changes/unmount.
- The paint shader uses the view-space normal matrix so non-uniformly scaled body panels receive more correct lighting.

## Known limitations / next QA
1. Replace placeholder geometry with a properly licensed, optimized R8 GLB/GLTF asset.
2. Verify shader compilation and appearance on desktop and mobile WebGL.
3. Tune pointer parallax sensitivity and verify pointer/touch behavior across devices.
4. Test touch gestures, keyboard access, reduced motion, modal focus management and small-screen layouts.
5. Verify technical specifications and paint codes for the selected model year and market.
6. Add automated lint/unit/browser tests and a preview deployment pipeline; no Vercel project is currently connected for this repository.

## Privacy
No analytics, accounts, database, payment collection, remote API or persistent user data is included.
