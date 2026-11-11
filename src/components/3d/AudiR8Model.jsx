import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CarPaintShaderMaterial } from '../../shaders/carPaintShader';
import { sound } from '../../utils/audioEngine';

function createBodyGeometry() {
  const profile = new THREE.Shape();
  profile.moveTo(-2.12, 0.34);
  profile.bezierCurveTo(-2.08, 0.48, -1.82, 0.58, -1.48, 0.62);
  profile.bezierCurveTo(-1.22, 0.67, -1.02, 1.04, -0.67, 1.13);
  profile.bezierCurveTo(-0.34, 1.23, 0.24, 1.23, 0.57, 1.12);
  profile.bezierCurveTo(0.91, 1.00, 1.12, 0.68, 1.48, 0.59);
  profile.bezierCurveTo(1.82, 0.55, 2.04, 0.48, 2.10, 0.34);
  profile.lineTo(1.98, 0.22);
  profile.lineTo(-1.96, 0.22);
  profile.close();
  const geometry = new THREE.ExtrudeGeometry(profile, {
    depth: 1.82,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.045,
    bevelThickness: 0.035,
    curveSegments: 12,
  });
  geometry.translate(0, 0, -0.91);
  geometry.computeVertexNormals();
  return geometry;
}

function createCanopyGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-1.02, 0.72);
  shape.lineTo(-0.67, 1.08);
  shape.quadraticCurveTo(-0.48, 1.19, -0.12, 1.20);
  shape.quadraticCurveTo(0.34, 1.20, 0.62, 1.08);
  shape.lineTo(1.02, 0.72);
  shape.close();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1.34,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.018,
    bevelThickness: 0.02,
    curveSegments: 12,
  });
  geometry.translate(0, 0, -0.67);
  geometry.computeVertexNormals();
  return geometry;
}

function createSideBladeGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.92, 0.43);
  shape.lineTo(0.22, 0.41);
  shape.lineTo(0.08, 0.91);
  shape.lineTo(-0.57, 0.96);
  shape.close();
  return new THREE.ShapeGeometry(shape, 16);
}

function createGrilleGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.43, 0.25);
  shape.lineTo(-0.31, 0.55);
  shape.lineTo(0.31, 0.55);
  shape.lineTo(0.43, 0.25);
  shape.close();
  return new THREE.ShapeGeometry(shape);
}

function createHeadlightGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.34, 0.02);
  shape.lineTo(0.34, 0.09);
  shape.lineTo(0.27, 0.17);
  shape.lineTo(-0.26, 0.13);
  shape.close();
  return new THREE.ShapeGeometry(shape);
}

function Wheel({ position, finish, onClick }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.365, 0.365, 0.245, 48]} />
        <meshStandardMaterial color="#101114" roughness={0.88} />
      </mesh>
      <mesh castShadow onPointerDown={onClick}>
        <cylinderGeometry args={[0.258, 0.258, 0.255, 40]} />
        <meshStandardMaterial color={finish.hex} metalness={finish.metalness} roughness={finish.roughness} />
      </mesh>
      {Array.from({ length: 10 }, (_, index) => (
        <mesh key={index} position={[0, 0, 0.145]} rotation={[0, (index * Math.PI * 2) / 10, 0]}>
          <boxGeometry args={[0.035, 0.035, 0.19]} />
          <meshStandardMaterial color={finish.hex} metalness={0.92} roughness={0.22} />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.075, 0.075, 0.27, 24]} />
        <meshStandardMaterial color="#aeb3b9" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.225, 0.012, 8, 40]} />
        <meshStandardMaterial color="#c7cbd0" metalness={0.95} roughness={0.18} />
      </mesh>
    </group>
  );
}

export default function AudiR8Model({
  paint,
  wheelFinish,
  doorsOpen,
  spoilerUp,
  onPartClick,
  lighting,
  isTiltActive,
}) {
  const leftDoor = useRef();
  const rightDoor = useRef();
  const wing = useRef();
  const root = useRef();
  const { pointer } = useThree();

  const shader = useMemo(() => new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(CarPaintShaderMaterial.uniforms),
    vertexShader: CarPaintShaderMaterial.vertexShader,
    fragmentShader: CarPaintShaderMaterial.fragmentShader,
  }), []);

  const bodyGeometry = useMemo(createBodyGeometry, []);
  const canopyGeometry = useMemo(createCanopyGeometry, []);
  const bladeGeometry = useMemo(createSideBladeGeometry, []);
  const grilleGeometry = useMemo(createGrilleGeometry, []);
  const headlightGeometry = useMemo(createHeadlightGeometry, []);

  useEffect(() => () => {
    shader.dispose();
    bodyGeometry.dispose();
    canopyGeometry.dispose();
    bladeGeometry.dispose();
    grilleGeometry.dispose();
    headlightGeometry.dispose();
  }, [shader, bodyGeometry, canopyGeometry, bladeGeometry, grilleGeometry, headlightGeometry]);

  useFrame((_, delta) => {
    if (root.current) {
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, isTiltActive ? -pointer.y * 0.025 : 0, 5, delta);
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, isTiltActive ? pointer.x * 0.04 : 0, 5, delta);
    }
    shader.uniforms.uBaseColor.value.set(paint.hex);
    shader.uniforms.uFlakeIntensity.value = paint.flakeIntensity;
    shader.uniforms.uRoughness.value = paint.roughness;
    shader.uniforms.uClearcoat.value = paint.clearcoat;
    shader.uniforms.uRimColor.value.set(lighting.rimColor);
    shader.uniforms.uTime.value += delta;
    if (leftDoor.current) leftDoor.current.rotation.y = THREE.MathUtils.damp(leftDoor.current.rotation.y, doorsOpen ? -0.68 : 0, 7, delta);
    if (rightDoor.current) rightDoor.current.rotation.y = THREE.MathUtils.damp(rightDoor.current.rotation.y, doorsOpen ? 0.68 : 0, 7, delta);
    if (wing.current) wing.current.position.y = THREE.MathUtils.damp(wing.current.position.y, spoilerUp ? 1.03 : 0.78, 7, delta);
  });

  const click = (event, part) => {
    event.stopPropagation();
    sound.playMechanicalClick(pointer.x);
    onPartClick?.(part);
  };

  const wheelPositions = [
    [-0.96, 0.37, 1.31],
    [0.96, 0.37, 1.31],
    [-0.96, 0.37, -1.31],
    [0.96, 0.37, -1.31],
  ];

  return (
    <group ref={root}>
      {/* Low, wide Type 42 body with a long front deck and compact rear */}
      <mesh geometry={bodyGeometry} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow material={shader} />

      {/* Dark glass canopy and rear mid-engine window */}
      <mesh geometry={canopyGeometry} rotation={[0, Math.PI / 2, 0]}>
        <meshPhysicalMaterial color="#101820" metalness={0.42} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh position={[0, 0.755, -1.02]} rotation={[-0.02, 0, 0]}>
        <boxGeometry args={[1.12, 0.025, 0.58]} />
        <meshPhysicalMaterial color="#111820" metalness={0.45} roughness={0.18} clearcoat={1} />
      </mesh>

      {/* The R8's distinctive contrasting side blades and side air intakes */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            geometry={bladeGeometry}
            position={[side * 0.925, 0, 0]}
            rotation={[0, side * Math.PI / 2, 0]}
          >
            <meshStandardMaterial color="#171b20" metalness={0.72} roughness={0.3} />
          </mesh>
          <mesh position={[side * 0.925, 0.49, -0.88]} rotation={[0, side * Math.PI / 2, 0]}>
            <boxGeometry args={[0.42, 0.12, 0.025]} />
            <meshStandardMaterial color="#080a0d" metalness={0.45} roughness={0.36} />
          </mesh>
          <mesh position={[side * 0.99, 0.9, 0.46]} rotation={[0, side * 0.22, side * -0.08]}>
            <boxGeometry args={[0.16, 0.08, 0.22]} />
            <meshStandardMaterial color="#171b20" metalness={0.7} roughness={0.24} />
          </mesh>
          <mesh position={[side * 0.91, 0.31, -0.03]}>
            <boxGeometry args={[0.12, 0.13, 2.25]} />
            <meshStandardMaterial color="#171a1e" metalness={0.65} roughness={0.34} />
          </mesh>
          <group ref={side < 0 ? leftDoor : rightDoor} position={[side * 0.89, 0.61, 0.12]}>
            <mesh castShadow onPointerDown={(event) => click(event, 'doors')}>
              <boxGeometry args={[0.055, 0.31, 0.98]} />
              <primitive object={shader} attach="material" />
            </mesh>
            <mesh position={[side * 0.035, 0.12, -0.18]}>
              <boxGeometry args={[0.018, 0.025, 0.17]} />
              <meshStandardMaterial color="#b9bec5" metalness={0.8} roughness={0.22} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Front single-frame grille, angular LED lamps and lower splitter */}
      <mesh geometry={grilleGeometry} position={[0, 0, 2.105]}>
        <meshStandardMaterial color="#090b0e" metalness={0.35} roughness={0.4} />
      </mesh>
      {[-0.61, 0.61].map((x) => (
        <group key={x}>
          <mesh geometry={headlightGeometry} position={[x, 0.53, 2.075]} scale={[x < 0 ? -1 : 1, 1, 1]}>
            <meshPhysicalMaterial color="#dce8f2" emissive="#8fb8d8" emissiveIntensity={0.22} metalness={0.35} roughness={0.18} />
          </mesh>
          <mesh position={[x, 0.25, 1.99]}>
            <boxGeometry args={[0.42, 0.055, 0.18]} />
            <meshStandardMaterial color="#101317" roughness={0.32} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.235, 1.98]}>
        <boxGeometry args={[1.72, 0.075, 0.22]} />
        <meshStandardMaterial color="#111419" metalness={0.55} roughness={0.3} />
      </mesh>

      {/* Rear LED signature, diffuser and twin exhaust outlets */}
      {[-0.58, 0.58].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.57, -2.075]}>
            <boxGeometry args={[0.48, 0.065, 0.045]} />
            <meshBasicMaterial color="#d22a38" />
          </mesh>
          <mesh position={[x * 1.12, 0.31, -2.08]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.105, 0.025, 10, 28]} />
            <meshStandardMaterial color="#777e87" metalness={0.95} roughness={0.2} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.235, -1.98]}>
        <boxGeometry args={[1.52, 0.13, 0.2]} />
        <meshStandardMaterial color="#101317" metalness={0.6} roughness={0.34} />
      </mesh>

      {/* Rear engine-cover louvers */}
      {Array.from({ length: 6 }, (_, index) => (
        <mesh key={index} position={[0, 0.79, -1.18 + index * 0.12]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[0.82, 0.018, 0.035]} />
          <meshStandardMaterial color="#252a30" metalness={0.65} roughness={0.28} />
        </mesh>
      ))}

      {/* Subtle wheel-arch lips and detailed ten-spoke wheels */}
      {wheelPositions.map((position, index) => (
        <group key={index}>
          <mesh
            position={[position[0], position[1], position[2]]}
            rotation={[0, (index % 2 === 0 ? 1 : -1) * Math.PI / 2, 0]}
          >
            <torusGeometry args={[0.405, 0.035, 10, 48, Math.PI]} />
            <primitive object={shader} attach="material" />
          </mesh>
          <Wheel
            position={position}
            finish={wheelFinish}
            onClick={(event) => click(event, 'wheels')}
          />
        </group>
      ))}

      {/* Raised rear wing remains interactive */}
      <group ref={wing} position={[0, 0.78, -1.92]}>
        <mesh castShadow onPointerDown={(event) => click(event, 'spoiler')}>
          <boxGeometry args={[1.72, 0.045, 0.28]} />
          <meshStandardMaterial color="#171a1e" metalness={0.78} roughness={0.24} />
        </mesh>
        {[-0.55, 0.55].map((x) => (
          <mesh key={x} position={[x, -0.12, 0]}>
            <boxGeometry args={[0.035, 0.22, 0.08]} />
            <meshStandardMaterial color="#171a1e" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
