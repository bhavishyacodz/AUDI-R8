import React, { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)}
      gl={{
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'high-performance',
        alpha: false,
      }}
      camera={{ position: [4.8, 2.2, 5.2], fov: 42 }}
      style={{ touchAction: 'none' }}
      performance={{ min: 0.55 }}
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
        enableRotate
        enableZoom
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2 - 0.035}
        minDistance={2.6}
        maxDistance={10}
        enableDamping
        dampingFactor={0.07}
        rotateSpeed={isMobile ? 0.72 : 1}
        zoomSpeed={isMobile ? 0.78 : 1}
        touches={{ ONE: 0, TWO: 2 }}
      />
    </Canvas>
  );
}
