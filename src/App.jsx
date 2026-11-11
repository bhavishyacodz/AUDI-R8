import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { PAINTS, WHEELS, LIGHTING_PRESETS } from './constants/configuratorData';
import UIOverlay from './components/ui/UIOverlay';
import SpecsModal from './components/ui/SpecsModal';
import { sound } from './utils/audioEngine';

const ConfiguratorScene = lazy(() => import('./components/3d/ConfiguratorScene'));

export default function App() {
  const [paint, setPaint] = useState(PAINTS[0]);
  const [wheel, setWheel] = useState(WHEELS[0]);
  const [lighting, setLighting] = useState(LIGHTING_PRESETS[0]);
  const [cameraView, setCameraView] = useState('EXTERIOR');
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [spoilerUp, setSpoilerUp] = useState(false);
  const [isTiltActive, setIsTiltActive] = useState(false);
  const [isEngineRunning, setIsEngineRunning] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const controlsRef = useRef();

  useEffect(() => () => sound.dispose(), []);

  const partClick = (part) => {
    if (part === 'doors') setDoorsOpen((value) => !value);
    if (part === 'spoiler') setSpoilerUp((value) => !value);
    if (part === 'wheels') {
      setWheel((value) => WHEELS[(WHEELS.findIndex((item) => item.id === value.id) + 1) % WHEELS.length]);
    }
  };

  return (
    <main className="app-shell">
      <Suspense fallback={<div className="scene-loading" role="status">Loading 3D experience…</div>}>
        <ConfiguratorScene
          paint={paint}
          wheel={wheel}
          lighting={lighting}
          cameraView={cameraView}
          doorsOpen={doorsOpen}
          spoilerUp={spoilerUp}
          isTiltActive={isTiltActive}
          onPartClick={partClick}
          controlsRef={controlsRef}
        />
      </Suspense>
      <UIOverlay
        paint={paint}
        setPaint={setPaint}
        wheel={wheel}
        setWheel={setWheel}
        lighting={lighting}
        setLighting={setLighting}
        cameraView={cameraView}
        setCameraView={setCameraView}
        isTiltActive={isTiltActive}
        setIsTiltActive={setIsTiltActive}
        isEngineRunning={isEngineRunning}
        setIsEngineRunning={setIsEngineRunning}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />
      <SpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        selectedPaint={paint}
        selectedWheel={wheel}
      />
    </main>
  );
}
