import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#64ffda" transparent opacity={0.6} />
    </points>
  );
}

export default function AnimatedCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Character floating animation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    }

    // Head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      headRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }

    // Arms waving
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 2) * 0.3 + 0.5;
      leftArmRef.current.rotation.x = Math.sin(time * 1.5) * 0.2;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(time * 2) * 0.3 - 0.5;
      rightArmRef.current.rotation.x = Math.sin(time * 1.5) * 0.2;
    }

    // Laptop animation
    if (laptopRef.current) {
      laptopRef.current.position.y = Math.sin(time * 0.8) * 0.05;
    }
  });

  return (
    <>
      <FloatingParticles />
      
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Head with glow effect */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere ref={headRef} args={[0.6, 32, 32]} position={[0, 1.8, 0]}>
            <MeshDistortMaterial
              color="#64ffda"
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.2}
            />
          </Sphere>
        </Float>

        {/* Eyes */}
        <Sphere args={[0.1, 16, 16]} position={[-0.2, 1.9, 0.5]}>
          <meshStandardMaterial color="#0f0f23" emissive="#0f0f23" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.1, 16, 16]} position={[0.2, 1.9, 0.5]}>
          <meshStandardMaterial color="#0f0f23" emissive="#0f0f23" emissiveIntensity={0.5} />
        </Sphere>

        {/* Smile */}
        <Torus args={[0.2, 0.03, 16, 100, Math.PI]} position={[0, 1.6, 0.5]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#0f0f23" />
        </Torus>

        {/* Body */}
        <Box args={[1, 1.4, 0.6]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#8892b0" metalness={0.3} roughness={0.7} />
        </Box>

        {/* Shirt details */}
        <Box args={[0.3, 0.3, 0.1]} position={[0, 0.8, 0.35]}>
          <meshStandardMaterial color="#64ffda" />
        </Box>

        {/* Left Arm */}
        <Box ref={leftArmRef} args={[0.25, 1, 0.25]} position={[-0.75, 0.7, 0]}>
          <meshStandardMaterial color="#64ffda" metalness={0.2} roughness={0.8} />
        </Box>

        {/* Right Arm */}
        <Box ref={rightArmRef} args={[0.25, 1, 0.25]} position={[0.75, 0.7, 0]}>
          <meshStandardMaterial color="#64ffda" metalness={0.2} roughness={0.8} />
        </Box>

        {/* Left Leg */}
        <Box args={[0.3, 1, 0.3]} position={[-0.3, -0.7, 0]}>
          <meshStandardMaterial color="#2d3748" />
        </Box>

        {/* Right Leg */}
        <Box args={[0.3, 1, 0.3]} position={[0.3, -0.7, 0]}>
          <meshStandardMaterial color="#2d3748" />
        </Box>

        {/* Laptop */}
        <group ref={laptopRef} position={[1.5, 0, 0.5]}>
          {/* Screen */}
          <Box args={[1, 0.7, 0.05]} position={[0, 0.35, 0]} rotation={[0.2, -0.3, 0]}>
            <meshStandardMaterial color="#1a1a2e" emissive="#64ffda" emissiveIntensity={0.3} />
          </Box>
          {/* Keyboard */}
          <Box args={[1, 0.05, 0.7]} position={[0, 0, 0.35]}>
            <meshStandardMaterial color="#c0c0c0" metalness={0.5} />
          </Box>
        </group>

        {/* Floating code symbols */}
        <Float speed={3} rotationIntensity={1} floatIntensity={2}>
          <Box args={[0.3, 0.3, 0.1]} position={[-2, 1.5, 0]}>
            <meshStandardMaterial color="#64ffda" transparent opacity={0.7} />
          </Box>
        </Float>

        <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
          <Torus args={[0.2, 0.05, 16, 100]} position={[2, 0.5, -0.5]}>
            <meshStandardMaterial color="#50fa7b" transparent opacity={0.7} />
          </Torus>
        </Float>

        <Float speed={3.5} rotationIntensity={1} floatIntensity={2.5}>
          <Sphere args={[0.15, 16, 16]} position={[-1.5, -0.5, 0.5]}>
            <meshStandardMaterial color="#ff79c6" transparent opacity={0.7} />
          </Sphere>
        </Float>

        {/* Orbiting rings */}
        <Torus args={[2, 0.03, 16, 100]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#64ffda" transparent opacity={0.2} />
        </Torus>

        <Torus args={[2.3, 0.02, 16, 100]} position={[0, 0.5, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial color="#50fa7b" transparent opacity={0.15} />
        </Torus>
      </group>
    </>
  );
}
