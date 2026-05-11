"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LayoutTemplate, FileText, Download, Sparkles, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { templateOptions } from "@/utils/constants";
import DashboardBackground from "./DashboardBackground";

const fade = {
  hidden: { opacity: 0, y: 25 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ── Animated Counter ──
function AnimatedCounter({ target, duration = 1500, delay = 0, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return <>{count}{suffix}</>;
}

// ── Typing Effect ──
function TypeWriter({ text, speed = 60, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span className="animate-pulse text-[#0088ff]">|</span>
      )}
    </span>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName = user?.user_metadata?.name
    || user?.user_metadata?.full_name
    || user?.email?.split("@")[0]
    || "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const quickActions = [
    {
      icon: FileText,
      title: "Build Resume",
      desc: "Fill sections, add experience, skills, and projects.",
      label: "open builder",
      href: "/resume",
    },
    {
      icon: LayoutTemplate,
      title: "Templates",
      desc: "Choose from 4 professional resume templates.",
      label: "view templates",
      href: "/resume",
    },
    {
      icon: Download,
      title: "Export PDF",
      desc: "Download your finished resume as a clean PDF.",
      label: "export now",
      href: "/resume",
    },
  ];

  const steps = [
    { step: "01", text: "Fill your personal details and experience" },
    { step: "02", text: "Choose a template from the vault" },
    { step: "03", text: "Preview in real-time as you type" },
    { step: "04", text: "Export as PDF with one click" },
  ];

  return (
    <ProtectedRoute>
      <main className="relative min-h-screen bg-[#030810] text-white overflow-hidden">

        {/* Animated background */}
        <DashboardBackground />

        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#0066ff]/5 blur-[180px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#0088ff]/3 blur-[150px]" />

        {/* Grid overlay */}
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(0,136,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.008)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10">
          <Navbar />

          <section className="mx-auto max-w-6xl px-6 py-8">

            {/* ── Greeting Section ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-10"
            >
              <div className="flex items-center gap-5">

                {/* Animated Avatar */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  {/* Pulsing ring */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(0, 136, 255, 0.2)",
                        "0 0 0 12px rgba(0, 136, 255, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0088ff]/20 bg-gradient-to-br from-[#0066ff]/20 to-[#0088ff]/5 text-2xl font-light text-[#0088ff]"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    {avatarLetter}
                  </motion.div>
                </motion.div>

                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-sm text-[#8ab4d8]/40 mb-1"
                  >
                    {greeting}
                  </motion.p>
                  <h1 className="text-3xl font-extralight tracking-tight text-white/90 sm:text-4xl">
                    {mounted ? (
                      <TypeWriter text={`Hello, ${displayName}`} speed={70} delay={400} />
                    ) : (
                      `Hello, ${displayName}`
                    )}
                  </h1>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-4 ml-[84px] text-sm text-[#8ab4d8]/35 font-light"
              >
                Your workspace is ready. Build, preview, and export your resume.
              </motion.p>
            </motion.div>

            {/* ── Quick Action Cards ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={1}
              className="mb-8 grid gap-4 sm:grid-cols-3"
            >
              {quickActions.map((action, index) => (
                <Link key={action.title} href={action.href} className="group">
                  <motion.div
                    variants={scaleFade}
                    initial="hidden"
                    animate="show"
                    custom={index + 2}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    className="terminal-shell p-5 transition-all duration-300 hover:border-[#0088ff]/25 hover:bg-[#0088ff]/[0.04] hover:shadow-[0_0_40px_rgba(0,136,255,0.06)]"
                  >
                    {/* Animated icon container */}
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#0088ff]/10 bg-gradient-to-br from-[#0088ff]/[0.08] to-[#0066ff]/[0.03]"
                    >
                      <action.icon className="h-5 w-5 text-[#0088ff]/60" />
                    </motion.div>

                    <h3 className="text-base font-medium text-white/80 mb-1">{action.title}</h3>
                    <p className="text-xs text-[#8ab4d8]/35 leading-relaxed">{action.desc}</p>

                    <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#0088ff]/35 group-hover:text-[#0088ff]/70 transition-colors">
                      <span>{action.label}</span>
                      <motion.div
                        className="inline-flex"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronRight className="h-3 w-3" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* ── Templates + Right Column ── */}
            <div className="grid gap-6 lg:grid-cols-[1fr_0.5fr]">

              {/* Templates Grid */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={5}
                className="terminal-shell scanlines p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <LayoutTemplate className="h-4 w-4 text-[#0088ff]/50" />
                    </motion.div>
                    <h2 className="text-sm font-medium text-white/60">available templates</h2>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                    className="terminal-badge"
                  >
                    {templateOptions.length} layouts
                  </motion.div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {templateOptions.map((template, index) => (
                    <motion.div
                      key={template.key || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      whileHover={{
                        x: 4,
                        backgroundColor: "rgba(0, 136, 255, 0.06)",
                        borderColor: "rgba(0, 136, 255, 0.2)",
                      }}
                      className="group flex items-center justify-between rounded-2xl border border-[#0088ff]/[0.06] bg-[#0088ff]/[0.02] p-4 cursor-pointer transition-all"
                    >
                      <div>
                        <div className="text-sm font-medium text-white/65 group-hover:text-white/85 transition-colors">
                          {template.label}
                        </div>
                        <div className="mt-1 text-xs text-[#8ab4d8]/30 leading-relaxed">
                          {template.description}
                        </div>
                      </div>
                      <motion.div
                        className="text-[#0088ff]/15 group-hover:text-[#0088ff]/50"
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="space-y-5">

                {/* CTA Card */}
                <motion.div
                  variants={scaleFade}
                  initial="hidden"
                  animate="show"
                  custom={6}
                  className="terminal-shell p-6 relative overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 50%, rgba(0,136,255,0.05) 0%, transparent 70%)",
                        "radial-gradient(circle at 80% 50%, rgba(0,136,255,0.05) 0%, transparent 70%)",
                        "radial-gradient(circle at 20% 50%, rgba(0,136,255,0.05) 0%, transparent 70%)",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles className="h-4 w-4 text-[#0088ff]/60" />
                      </motion.div>
                      <span className="text-sm font-medium text-white/60">ready to start?</span>
                    </div>
                    <p className="text-xs text-[#8ab4d8]/30 leading-relaxed mb-5">
                      Open the resume builder, fill in your details, choose a template, and export as PDF.
                    </p>
                    <Link href="/resume">
                      <motion.div
                        whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,136,255,0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        className="terminal-button-primary w-full justify-center py-3.5 text-sm"
                      >
                        open resume builder
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>

                {/* How it works */}
                <motion.div
                  variants={scaleFade}
                  initial="hidden"
                  animate="show"
                  custom={7}
                  className="terminal-shell p-6"
                >
                  <h3 className="text-sm font-medium text-white/60 mb-4">how it works</h3>
                  <div className="space-y-4">
                    {steps.map((item, index) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.15, duration: 0.4 }}
                        className="flex items-start gap-3 group"
                      >
                        {/* Step number with glow */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#0088ff]/10 bg-[#0088ff]/[0.05] text-[10px] text-[#0088ff]/60 flex-shrink-0"
                          style={{ fontFamily: "'VT323', monospace" }}
                        >
                          {item.step}
                        </motion.div>
                        <span className="text-xs text-[#8ab4d8]/35 leading-relaxed group-hover:text-[#8ab4d8]/55 transition-colors">
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Live Status */}
                <motion.div
                  variants={scaleFade}
                  initial="hidden"
                  animate="show"
                  custom={8}
                  className="terminal-shell p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-2 w-2 rounded-full bg-[#00ff88]/70"
                      />
                      <span className="text-xs text-[#8ab4d8]/35">system status</span>
                    </div>
                    <span className="text-xs text-[#00ff88]/50 font-mono" style={{ fontFamily: "'VT323', monospace" }}>
                      online
                    </span>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* ── Bottom Stats ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={9}
              className="mt-8 flex justify-center gap-16"
            >
              {[
                { value: 4, label: "templates", suffix: "" },
                { value: 100, label: "responsive", suffix: "%" },
                { value: 0, label: "cost", suffix: "free" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.15 }}
                  className="text-center group cursor-default"
                >
                  <div className="text-2xl font-extralight text-[#0088ff]/60 group-hover:text-[#00ccff] transition-colors">
                    {stat.suffix === "free" ? (
                      <span>free</span>
                    ) : (
                      <AnimatedCounter target={stat.value} delay={1500 + index * 200} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-[#8ab4d8]/20 group-hover:text-[#8ab4d8]/35 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
