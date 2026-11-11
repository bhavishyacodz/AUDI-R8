# Preview visibility correction

## Report
The previous preview used a near-black app shell, near-black overlay controls, and three dark environment presets. This made the configurator appear black and reduced visibility on mobile screens.

## Changes
- Changed the default environment to a bright neutral studio.
- Added brighter studio/softbox/warm studio lighting presets and neutral backgrounds.
- Added a light, high-contrast interface palette for controls, labels, buttons and spec modal.
- Kept paint and wheel swatches, controls and model interactions intact.
- Applied the palette through the stylesheet loaded after the original theme.

## QA still required
- Confirm actual car visibility and material response in Android Chrome.
- Check all three environment presets and all six paint colors.
- Check desktop and 320–430px mobile widths.
- Confirm there is no WebGL context failure or shader compile error.
- This correction is a Preview-only change; do not merge to main until inspected.
