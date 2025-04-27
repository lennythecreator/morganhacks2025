'use client';

import { Canvas } from '@react-three/fiber';

import { OrbitControls, useGLTF } from '@react-three/drei';


export default function ModelViewer() {
    const earth = useGLTF("/tripo_pbr_model_f9c4224e-f097-4255-bb8d-517c4b307613.glb");
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}> 
      <ambientLight intensity={1} />
      <directionalLight position={[3, 3, 3]} intensity={2} />
      <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
        <primitive object= {earth.scene} scale={2.5}/>
      </Canvas>


    </div>
  );
}
