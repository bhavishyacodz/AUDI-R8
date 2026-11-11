# 3D viewport black-screen diagnostic fix

- Removed the custom GLSL ShaderMaterial from the car body, door and wheel-arch material path.
- Replaced it with Three.js MeshPhysicalMaterial using selected paint color, roughness and clearcoat.
- Explicitly set the WebGL renderer clear color and scene background to a light neutral studio color at Canvas creation.
- Android Chrome visual QA remains required; a successful build alone does not establish device rendering.
