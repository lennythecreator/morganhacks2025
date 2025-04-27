'use client';

import { Canvas } from '@react-three/fiber';

import { OrbitControls} from '@react-three/drei';
import { useMemo } from 'react';


export default function ModelViewer({ model}) {
  const clonedModel = useMemo(() => model.scene.clone(), [model]);
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}> 
      <ambientLight intensity={1} />
      <directionalLight position={[3, 3, 3]} intensity={2} />
      <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
        <primitive object= {clonedModel} scale={2.5}/>
      </Canvas>
    </div>
  );
}
