# AUDI R8 Configurator — QA Checklist

This checklist is for the feature branch preview. It is not evidence that these checks have already passed.

## Desktop smoke test
- [ ] App loads without console errors or WebGL shader compilation errors.
- [ ] Exterior, Interior, Engine and Wheel camera presets reach the intended framing.
- [ ] Orbit and zoom remain responsive after changing camera presets.
- [ ] Each paint finish updates the body shader without stale colors.
- [ ] Each wheel finish updates all four wheel faces.
- [ ] Lighting presets update the background, key light and rim light.
- [ ] Door and spoiler interactions animate smoothly.
- [ ] Engine ignition starts audio only after a user click; Rev changes pitch; Stop silences it.
- [ ] Pointer parallax toggle subtly tilts the model and returns it to neutral when disabled.
- [ ] Specification modal opens, closes and displays the selected finishes.

## Mobile / accessibility
- [ ] Touch orbit and pinch zoom work without blocking UI controls.
- [ ] Layout fits narrow screens without horizontal overflow.
- [ ] All controls have accessible names and visible focus states.
- [ ] Modal can be operated by keyboard and returns focus to its trigger.
- [ ] Reduced-motion preference is respected by scene and UI transitions.
- [ ] Audio behavior is understandable and does not autoplay.

## Release gates
- [ ] `npm run build` passes on a clean install.
- [ ] Browser smoke test passes on current Chrome desktop and Android Chrome.
- [ ] Verify specs and paint-code claims for the exact model year/market.
- [ ] Replace procedural placeholder car geometry only with an appropriately licensed optimized asset.
- [ ] Review the feature branch and PR before any merge.


## Android / Type 42 visual pass
- [ ] Verify 320px, 360px, 390px and 430px viewport layouts.
- [ ] Verify safe-area spacing with Android browser chrome expanded and collapsed.
- [ ] Verify one-finger orbit and two-finger pinch/rotate.
- [ ] Verify camera preset buttons remain reachable and do not overlap swatches.
- [ ] Verify Android low-power renderer path stays responsive during paint changes.
- [ ] Inspect first-generation Type 42 silhouette from front, rear, side and three-quarter views.
- [ ] Verify wheel spokes, side blades, headlights, grille and rear lamps visually.
- [ ] Replace procedural approximation only after an exact-generation licensed GLB is verified.
