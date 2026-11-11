import React from 'react';

export default function SceneLighting({ preset }) {
  return (
    <>
      <color attach="background" args={['#e8edf2']} />
      <fog attach="fog" args={['#e8edf2', 18, 42]} />
      <hemisphereLight args={['#ffffff', '#9ba8b6', 1.65]} />
      <ambientLight intensity={1.15} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={2.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 4, -5]} intensity={1.8} color="#dcecff" />
      <directionalLight position={[0, 3, 5]} intensity={1.1} color="#fff0dc" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#cbd5df" roughness={0.82} metalness={0.04} />
      </mesh>
    </>
  );
}
