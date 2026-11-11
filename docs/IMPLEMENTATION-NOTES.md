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
- FPS and draw-call counters read live renderer values rather than displaying fixed claims.
- Animation-frame loops, shader resources and audio resources are cleaned up.
- Camera transitions animate the OrbitControls target as well as camera position.
- Shader normals and view vectors use world-space coordinates consistently.
- Audio is started only after user interaction and uses conservative synthesized levels.
- The supplied tilt toggle is retained as a placeholder; pointer/device parallax is not wired yet.

## Known limitations / next QA
1. Replace placeholder geometry with a properly licensed, optimized R8 GLB/GLTF asset.
2. Verify shader compilation and appearance on desktop and mobile WebGL.
3. Implement real pointer/device parallax or remove its placeholder toggle.
4. Test touch gestures, keyboard access, reduced motion, modal focus management and small-screen layouts.
5. Verify technical specifications and paint codes for the selected model year and market.
6. Add automated lint/unit/browser tests and a preview deployment pipeline when desired.

## Privacy
No analytics, accounts, database, payment collection, remote API or persistent user data is included.
