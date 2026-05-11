"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, FolderKanban, LayoutTemplate, NotebookText, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import QuantumBackdrop from "@/components/QuantumBackdrop";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { templateOptions } from "@/utils/constants";

const stats = [
  { label: "drafts saved", value: "12" },
  { label: "templates ready", value: "4" },
  { label: "exports", value: "08" },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="relative mx-auto max-w-7xl px-6 py-10">
          <div className="absolute inset-0 -z-10 opacity-40">
            <QuantumBackdrop />
          </div>

          {/* Header */}
          <motion.div variants={fade} initial="hidden" animate="show" custom={0} className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="terminal-badge mb-4">dashboard</div>
              <h1 className="terminal-heading">Welcome back, {user?.name || "operator"}.</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/30 font-light">
                Your workspace is online. Pick a template, update sections, and export.
              </p>
            </div>
            <Link href="/resume" className="terminal-button-primary w-fit py-3">
              open builder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Telemetry */}
            <motion.div variants={fade} initial="hidden" animate="show" custom={1} className="terminal-shell scanlines p-6">
              <div className="mb-5 flex items-center gap-3">
                <Activity className="h-4 w-4 text-white/40" />
                <h2 className="text-sm font-medium text-white/70">workspace telemetry</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                    <div className="text-3xl font-extralight text-white/70" style={{ fontFamily: "'VT323', monospace" }}>{stat.value}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/25">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                  <div className="mb-2 flex items-center gap-2 text-white/50">
                    <NotebookText className="h-4 w-4" />
                    <span className="text-sm font-medium">resume pipeline</span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/25">Edit personal data, experience, projects, and skills.</p>
                </div>
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                  <div className="mb-2 flex items-center gap-2 text-white/50">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm font-medium">protected flow</span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/25">Login state is isolated. Dashboard and builder remain gated.</p>
                </div>
              </div>
            </motion.div>

            {/* Templates */}
            <motion.div variants={fade} initial="hidden" animate="show" custom={2} className="terminal-shell scanlines p-6">
              <div className="mb-5 flex items-center gap-3">
                <FolderKanban className="h-4 w-4 text-white/40" />
                <h2 className="text-sm font-medium text-white/70">template vault</h2>
              </div>

              <div className="space-y-3">
                {templateOptions.map((template, index) => (
                  <div key={template.id || template.label || index} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-white/70">{template.label}</div>
                        <div className="mt-1 text-xs text-white/25">{template.description}</div>
                      </div>
                      <LayoutTemplate className="h-4 w-4 text-white/20" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                <div className="mb-2 flex items-center gap-2 text-white/50">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">next move</span>
                </div>
                <p className="text-xs leading-relaxed text-white/25">Open the builder and fill sections in order. Live preview updates as you type.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
