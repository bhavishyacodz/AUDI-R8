import {useEffect} from 'react';
import {useThree} from '@react-three/fiber';
import gsap from 'gsap';
import {CAMERA_VIEWS} from '../../constants/configuratorData';

export default function CameraController({currentView,controlsRef}) {
  const {camera} = useThree();
  useEffect(() => {
    const view = CAMERA_VIEWS[currentView] || CAMERA_VIEWS.EXTERIOR;
    const positionTween = gsap.to(camera.position, {
      x: view.pos[0], y: view.pos[1], z: view.pos[2],
      duration: 1.35, ease: 'power3.inOut'
    });
    const fovTween = gsap.to(camera, {
      fov: view.fov, duration: 1.2, ease: 'power2.inOut',
      onUpdate: () => camera.updateProjectionMatrix()
    });
    const target = controlsRef.current?.target;
    const targetTween = target ? gsap.to(target, {
      x: view.target[0], y: view.target[1], z: view.target[2],
      duration: 1.35, ease: 'power3.inOut'
    }) : null;
    return () => {
      positionTween.kill();
      fovTween.kill();
      targetTween?.kill();
    };
  }, [currentView, camera, controlsRef]);
  return null;
}
