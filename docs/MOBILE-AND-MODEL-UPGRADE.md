# First-generation R8 visual and Android pass

## Target
- First-generation Audi R8 Type 42 V10 (2007–2015).
- The current in-repository model remains an original procedural approximation, not an OEM scan or licensed factory mesh.
- The new silhouette adds the low wide Type 42 stance, compact glass canopy, contrasting side blades, mid-engine deck, angular front lamps, single-frame grille, rear LED signature, twin exhausts and ten-spoke wheel faces.
- Preserve this distinction in product copy until a verified model asset is integrated.

## Android / touch changes
- Use a lower pixel ratio and disable real-time shadows/antialiasing on coarse-pointer or narrow-screen devices.
- Keep desktop rendering quality separate from mobile quality.
- Add dynamic viewport and safe-area handling for Android browser chrome and display cutouts.
- Put camera presets and actions into a compact touch-friendly layout.
- Preserve one-finger orbit and two-finger zoom/rotate through OrbitControls.

## Remaining model-fidelity gate
A genuinely accurate production model still requires a downloadable, licensed Type 42 V10 GLB/GLTF whose exact generation, textures and commercial-use terms have been verified. Do not silently substitute a later-generation R8 or an unlicensed model. Before shipping an external asset, inspect its front, rear, side, interior, mesh names, material names, texture sizes and triangle count; then map paint and wheel controls to the actual materials.

## Validation
- Vercel Preview build is the first automated integration check for this pass.
- Android Chrome device QA is still required for touch gestures, safe areas, thermal/performance behavior and narrow viewport fit.
- Visual inspection is still required to judge the new procedural body from front, rear, side and three-quarter camera angles.
