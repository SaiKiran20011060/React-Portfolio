import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import AnimatedCharacter from './AnimatedCharacter';

export default function Scene3D() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      zIndex: 0,
      pointerEvents: 'auto'
    }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#64ffda" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#50fa7b" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#64ffda"
        />
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
        
        {/* 3D Character */}
        <Suspense fallback={null}>
          <AnimatedCharacter />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
