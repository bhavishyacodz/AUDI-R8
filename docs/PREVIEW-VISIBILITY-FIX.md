# Second visibility correction

- The prior light override did not comprehensively override all original dark-theme selectors.
- Replaced it with authoritative high-specificity light palette rules using !important for the page shell, controls, typography and modal.
- Rebuilt scene lighting with a fixed light neutral studio background, hemisphere/ambient illumination and three directional studio lights.
- Lighting preset selection remains available in the UI, but this baseline ensures the car is not rendered against a near-black environment.
- Preview build success is not visual QA. Verify actual Android Chrome rendering before closing this issue.
