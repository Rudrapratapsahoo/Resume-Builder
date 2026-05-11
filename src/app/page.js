"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import Link from "next/link";

function QuantumOrb() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial
          color="#39ff14"
          emissive="#39ff14"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d] text-[#d7ffd0]">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-[-250px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#39ff14]/10 blur-[140px]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.04)_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#39ff14" />
          <QuantumOrb />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="quantum-shell w-full max-w-7xl overflow-hidden"
        >

          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-[#39ff14]/10 bg-black/40 px-6 py-4 backdrop-blur-xl">

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-[#39ff14]" />
            </div>

            <div className="terminal-code text-xs tracking-[0.3em]">
              QUANTUM_TERMINAL_v1.0
            </div>

            <div className="terminal-badge">
              SYSTEM ACTIVE
            </div>
          </div>

          {/* Hero Section */}
          <div className="grid gap-16 px-8 py-16 lg:grid-cols-2 lg:px-16">

            {/* Left Side */}
            <div className="flex flex-col justify-center">

              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >

                <div className="terminal-command mb-6">
                  &gt; initialize --resume-builder
                </div>

                <h1 className="quantum-heading mb-8 leading-[0.9]">
                  QUANTUM
                  <br />
                  RESUME
                  <br />
                  TERMINAL
                </h1>

                <p className="quantum-subheading max-w-xl leading-8">
                  A futuristic AI-powered resume builder engineered like a
                  developer terminal. Build stunning resumes through an
                  immersive cyberpunk inspired interface with real-time
                  previews, animated transitions, and dynamic layouts.
                </p>

                {/* Terminal Stats */}
                <div className="mt-10 grid grid-cols-3 gap-4">

                  <div className="terminal-card">
                    <h3 className="font-terminal text-3xl text-[#39ff14]">
                      4+
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#d7ffd0]/50">
                      Templates
                    </p>
                  </div>

                  <div className="terminal-card">
                    <h3 className="font-terminal text-3xl text-[#39ff14]">
                      AI
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#d7ffd0]/50">
                      Assisted
                    </p>
                  </div>

                  <div className="terminal-card">
                    <h3 className="font-terminal text-3xl text-[#39ff14]">
                      PDF
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#d7ffd0]/50">
                      Export
                    </p>
                  </div>

                </div>

                {/* Buttons */}
                <div className="mt-12 flex flex-col gap-5 sm:flex-row">

                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="terminal-button terminal-button-primary min-w-[210px]"
                    >
                      &gt; CREATE_RESUME
                    </motion.button>
                  </Link>

                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="terminal-button min-w-[210px]"
                    >
                      &gt; ACCESS_TERMINAL
                    </motion.button>
                  </Link>

                </div>

              </motion.div>
            </div>

            {/* Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center"
            >

              <div className="relative w-full max-w-xl">

                {/* Glow */}
                <div className="absolute inset-0 rounded-[30px] bg-[#39ff14]/10 blur-[70px]" />

                {/* Resume Preview */}
                <div className="relative terminal-border-glow overflow-hidden rounded-[28px] bg-black/70 backdrop-blur-xl">

                  {/* Top */}
                  <div className="border-b border-[#39ff14]/10 px-6 py-4">
                    <div className="terminal-code text-sm">
                      &gt; render --template=quantum
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6 p-8 font-mono">

                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#39ff14]/50">
                        PROFILE
                      </p>

                      <h2 className="mt-3 font-terminal text-5xl text-[#39ff14]">
                        ALEX.exe
                      </h2>

                      <p className="mt-2 text-sm text-[#d7ffd0]/70">
                        Full Stack AI Engineer
                      </p>
                    </div>

                    <div className="space-y-3 border-t border-[#39ff14]/10 pt-6">

                      <div className="terminal-code text-sm">
                        &gt; load --module=skills
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {[
                          "React",
                          "Three.js",
                          "AI",
                          "Node.js",
                          "Python",
                          "Tailwind",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5 px-3 py-1 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 border-t border-[#39ff14]/10 pt-6">

                      <div className="terminal-code text-sm">
                        &gt; load --module=experience
                      </div>

                      <div className="space-y-4">

                        <div className="rounded-2xl border border-[#39ff14]/10 bg-[#39ff14]/[0.03] p-4">
                          <h3 className="text-sm text-[#39ff14]">
                            Quantum UI Architect
                          </h3>

                          <p className="mt-1 text-xs text-[#d7ffd0]/60">
                            Neural Systems Inc. | 2024
                          </p>
                        </div>

                        <div className="rounded-2xl border border-[#39ff14]/10 bg-[#39ff14]/[0.03] p-4">
                          <h3 className="text-sm text-[#39ff14]">
                            Creative Frontend Developer
                          </h3>

                          <p className="mt-1 text-xs text-[#d7ffd0]/60">
                            Cyber Dynamics | 2023
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Cursor */}
                    <div className="pt-4 terminal-code blinking-cursor">
                      system.ready
                    </div>

                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </motion.div>

      </main>
    </div>
  );
}