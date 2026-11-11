import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AudiR8Model from './AudiR8Model';
import SceneLighting from './SceneLighting';
import CameraController from './CameraController';

export default function ConfiguratorScene({
  paint,
  wheel,
  lighting,
  cameraView,
  doorsOpen,
  spoilerUp,
  isTiltActive,
  onPartClick,
  controlsRef,
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [4.8, 2.2, 5.2], fov: 42 }}
    >
      <CameraController currentView={cameraView} controlsRef={controlsRef} />
      <SceneLighting preset={lighting} />
      <AudiR8Model
        paint={paint}
        wheelFinish={wheel}
        doorsOpen={doorsOpen}
        spoilerUp={spoilerUp}
        lighting={lighting}
        isTiltActive={isTiltActive}
        onPartClick={onPartClick}
      />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2 - 0.035}
        minDistance={2.6}
        maxDistance={10}
        enableDamping
        dampingFactor={0.07}
      />
    </Canvas>
  );
}
