"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import BackgroundAnimation from "./BackgroundAnimation";
import SpaceHeading from "./SpaceHeading";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const fade = {
  hidden: { opacity: 0, y: 25 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#030810] text-white">

      {/* Animated background */}
      <BackgroundAnimation />

      {/* Deep blue ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0066ff]/8 blur-[200px]" />
      <div className="pointer-events-none absolute bottom-[-150px] right-[20%] h-[400px] w-[400px] rounded-full bg-[#0088ff]/5 blur-[180px]" />
      <div className="pointer-events-none absolute left-[10%] top-[30%] h-[200px] w-[200px] rounded-full bg-[#00aaff]/4 blur-[120px]" />

      {/* 3D Scene */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <Scene />
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
            <div className="flex items-center justify-between border-b border-[#0088ff]/10 px-8 py-3 bg-[#0088ff]/[0.02]">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff4444]/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#ffaa00]/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#00aaff]/60" />
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.4em] text-[#0088ff]/40"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                quantum://home
              </span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00ff88]/50 animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#00ff88]/30">online</span>
              </div>
            </div>

            {/* Body */}
            <div className="px-10 py-10 sm:px-16 sm:py-12">

              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={0}
                className="mb-6 flex items-center gap-3"
              >
                <div className="h-px w-8 bg-[#0088ff]/30" />
                <span
                  className="text-[11px] uppercase tracking-[0.4em] text-[#0088ff]/40"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  &gt; Welcome To Resume Builder
                </span>
              </motion.div>

              {/* ── Space Heading with Orbiting Particles ── */}
              <div className="relative mb-6" style={{ height: "clamp(200px, 35vh, 320px)" }}>
                <SpaceHeading />

                {/* Central glow behind text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[120px] w-[300px] rounded-full bg-[#0066ff]/10 blur-[80px] sm:h-[160px] sm:w-[500px]" />
                </div>

                {/* The heading text centered */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                  <motion.h1
                    variants={fade}
                    initial="hidden"
                    animate="show"
                    custom={1}
                    className="text-7xl font-extralight leading-[0.9] tracking-tight sm:text-8xl lg:text-9xl xl:text-[10rem]"
                  >
                    <span className="text-white/90">Resume</span>
                  </motion.h1>

                  <motion.h1
                    variants={fade}
                    initial="hidden"
                    animate="show"
                    custom={2}
                    className="text-7xl font-extralight leading-[0.9] tracking-tight sm:text-8xl lg:text-9xl xl:text-[10rem]"
                  >
                    <span className="bg-gradient-to-r from-[#0088ff] to-[#00ccff] bg-clip-text text-transparent">
                      Builder
                    </span>
                  </motion.h1>
                </div>
              </div>

              {/* Divider */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={2.5}
                className="mb-5 flex items-center justify-center gap-3"
              >
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#0088ff]/40" />
                <div className="h-1 w-1 rounded-full bg-[#0088ff]/40" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0088ff]/40" />
              </motion.div>

              {/* Subtext */}
              <motion.p
                variants={fade}
                initial="hidden"
                animate="show"
                custom={3}
                className="mb-8 text-center text-base leading-relaxed text-[#8ab4d8]/60 font-light"
              >
                Create Resumes in Minutes.
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={4}
                className="mb-10 flex justify-center gap-14"
              >
                {[
                  { v: "4", l: "templates" },
                  { v: "PDF", l: "export" },
                  { v: "Live", l: "preview" },
                ].map((s) => (
                  <div key={s.l} className="group cursor-default">
                    <div className="text-xl font-light text-[#0088ff]/70 transition-colors group-hover:text-[#00ccff]">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-[#8ab4d8]/25 group-hover:text-[#8ab4d8]/40 transition-colors">
                      {s.l}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={5}
                className="flex justify-center gap-4"
              >
                <Link href="/signup">
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,136,255,0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    className="terminal-button-primary min-w-[180px] justify-center py-3.5"
                  >
                    build resume
                  </motion.div>
                </Link>
                <Link href="/login">
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,136,255,0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    className="terminal-button min-w-[180px] justify-center py-3.5"
                  >
                    sign in
                  </motion.div>
                </Link>
              </motion.div>

            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={6}
            className="mt-4 flex items-center justify-center gap-4"
          >
            <div className="h-px w-10 bg-[#0088ff]/10" />
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#0088ff]/15">
              powered by Rudra & Omm
            </span>
            <div className="h-px w-10 bg-[#0088ff]/10" />
          </motion.div>

        </div>
      </main>
    </div>
  );
}
