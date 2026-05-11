'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Sphere, TorusKnot } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CoreMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.28;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.2}>
      <group ref={meshRef}>
        <TorusKnot args={[1, 0.32, 180, 24]} scale={1.25}>
          <meshStandardMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={0.35}
            roughness={0.35}
            metalness={0.9}
          />
        </TorusKnot>
        <Sphere args={[0.28, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#d9fdd3"
            emissive="#39ff14"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </group>
    </Float>
  );
}

export default function QuantumBackdrop() {
  return (
    <div className="h-[420px] w-full opacity-90 sm:h-[520px]">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
        <color attach="background" args={['#0d0d0d']} />
        <fog attach="fog" args={['#0d0d0d', 5, 12]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 4, 4]} intensity={1.3} color="#39ff14" />
        <pointLight position={[-4, -2, 3]} intensity={0.8} color="#d9fdd3" />
        <CoreMesh />
        <Sparkles count={60} scale={[8, 5, 8]} size={1.6} speed={0.5} color="#39ff14" />
      </Canvas>
    </div>
  );
}