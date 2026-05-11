"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import Link from "next/link";

function QuantumOrb() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          wireframe
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const ref = useRef();
  const count = 60;
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
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

const fade = {
  hidden: { opacity: 0, y: 25 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[180px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* 3D */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <QuantumOrb />
          <FloatingParticles />
          <Stars radius={50} depth={40} count={600} factor={2} fade speed={0.5} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <main className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="w-full max-w-4xl">

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="terminal-shell scanlines overflow-hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-8 py-3">
              <div className="flex gap-b border-white/[0.05] px-2">
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20" style={{ fontFamily: "'VT323', monospace" }}>
                quantum://home
              </span>
              <div className="w-6" />
            </div>

            {/* Body */}
            <div className="px-10 py-10 sm:px-16 sm:py-12">

              <motion.div variants={fade} initial="hidden" animate="show" custom={0} className="mb-6 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-white/25" style={{ fontFamily: "'VT323', monospace" }}>
                  system.online
                </span>
              </motion.div>

              <motion.h1 variants={fade} initial="hidden" animate="show" custom={1} className="text-7xl font-extralight leading-[0.9] tracking-tight sm:text-8xl lg:text-9xl">
                Quantum
              </motion.h1>

              <motion.h1 variants={fade} initial="hidden" animate="show" custom={2} className="mb-6 text-7xl font-extralight leading-[0.9] tracking-tight text-white/40 sm:text-8xl lg:text-9xl">
                Resume
              </motion.h1>

              <motion.div variants={fade} initial="hidden" animate="show" custom={2.5} className="mb-5 h-px w-20 bg-white/10" />

              <motion.p variants={fade} initial="hidden" animate="show" custom={3} className="mb-8 max-w-md text-base leading-relaxed text-white/30 font-light">
                Build, preview, and export terminal-grade resumes. One pipeline. Zero noise.
              </motion.p>

              <motion.div variants={fade} initial="hidden" animate="show" custom={4} className="mb-10 flex gap-14">
                {[
                  { v: "4", l: "templates" },
                  { v: "PDF", l: "export" },
                  { v: "Live", l: "preview" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-xl font-light text-white/60">{s.v}</div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/20">{s.l}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fade} initial="hidden" animate="show" custom={5} className="flex gap-4">
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="terminal-button-primary min-w-[180px] justify-center py-3.5">
                    build resume
                  </motion.div>
                </Link>
                <Link href="/login">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="terminal-button min-w-[180px] justify-center py-3.5">
                    sign in
                  </motion.div>
                </Link>
              </motion.div>

            </div>
          </motion.div>

          <motion.div variants={fade} initial="hidden" animate="show" custom={6} className="mt-4 text-center text-[9px] uppercase tracking-[0.35em] text-white/10">
            powered by quantum engine
          </motion.div>

        </div>
      </main>
    </div>
  );
}
