"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, MeshDistortMaterial } from "@react-three/drei";

function QuantumOrb() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.004;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#0088ff"
          emissive="#00aaff"
          emissiveIntensity={1.2}
          wireframe
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, speed, tilt, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.004, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef();
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.06) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00aaff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function FloatingShapes() {
  const shapes = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    shapes.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y = Math.sin(t * 0.5 + i * 2) * 0.5;
        mesh.rotation.x = t * 0.3 + i;
        mesh.rotation.z = t * 0.2 + i * 0.5;
      }
    });
  });

  const items = [
    { pos: [4.5, 1, -2], scale: 0.12 },
    { pos: [-4.5, -1.5, -1], scale: 0.1 },
    { pos: [3, -2, -3], scale: 0.08 },
    { pos: [-3.5, 2, -2], scale: 0.1 },
  ];

  return (
    <>
      {items.map((item, i) => (
        <mesh key={i} ref={(el) => (shapes.current[i] = el)} position={item.pos} scale={item.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#0099ff" emissive="#0099ff" emissiveIntensity={2} wireframe transparent opacity={0.25} />
        </mesh>
      ))}
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#0088ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#00ccff" />
      <QuantumOrb />
      <OrbitRing radius={3.2} speed={0.4} tilt={[0.3, 0, 0]} color="#0088ff" />
      <OrbitRing radius={3.8} speed={-0.25} tilt={[0.8, 0.5, 0]} color="#00bbff" />
      <OrbitRing radius={4.3} speed={0.15} tilt={[1.2, 0.2, 0.5]} color="#0066ff" />
      <FloatingParticles />
      <FloatingShapes />
      <Stars radius={50} depth={40} count={1000} factor={3} fade speed={0.5} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
