'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Activity,
  FolderKanban,
  LayoutTemplate,
  NotebookText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import QuantumBackdrop from '@/components/QuantumBackdrop';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { templateOptions } from '@/utils/constants';

const stats = [
  { label: 'drafts saved', value: '12' },
  { label: 'templates ready', value: '4' },
  { label: 'exports', value: '08' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen">
        <Navbar />

        <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 opacity-60">
            <QuantumBackdrop />
          </div>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="terminal-badge mb-4">dashboard</div>
              <h1 className="terminal-heading">
                Welcome back, {user?.name || 'operator'}.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-100/75">
                Your workspace is online. Pick a template, update your sections, and export the
                cleanest version of your resume.
              </p>
            </div>

            <Link href="/resume" className="terminal-button-primary w-fit">
              open resume builder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-shell scanlines p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <Activity className="h-5 w-5 text-emerald-300" />
                <h2 className="text-lg font-semibold text-emerald-100">workspace telemetry</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-emerald-400/10 bg-black/40 p-5">
                    <div className="text-3xl font-['VT323'] text-emerald-300">{stat.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.22em] text-emerald-100/55">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-400/10 bg-black/40 p-5">
                  <div className="mb-3 flex items-center gap-2 text-emerald-200">
                    <NotebookText className="h-4 w-4" />
                    <span className="text-sm font-medium">resume pipeline</span>
                  </div>
                  <p className="text-sm leading-7 text-emerald-100/70">
                    Edit personal data, experience, projects, and skills through modular blocks.
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-400/10 bg-black/40 p-5">
                  <div className="mb-3 flex items-center gap-2 text-emerald-200">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm font-medium">protected flow</span>
                  </div>
                  <p className="text-sm leading-7 text-emerald-100/70">
                    Login state is isolated so the dashboard and builder can remain gated.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-shell scanlines p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <FolderKanban className="h-5 w-5 text-emerald-300" />
                <h2 className="text-lg font-semibold text-emerald-100">template vault</h2>
              </div>

              <div className="space-y-4">
                {templateOptions.map((template) => (
                  <div
                    key={template.key}
                    className="rounded-2xl border border-emerald-400/10 bg-black/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-emerald-100">{template.label}</div>
                        <div className="mt-1 text-xs text-emerald-100/60">{template.description}</div>
                      </div>
                      <LayoutTemplate className="h-5 w-5 text-emerald-300/80" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
                <div className="mb-2 flex items-center gap-2 text-emerald-200">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">next move</span>
                </div>
                <p className="text-sm leading-7 text-emerald-100/70">
                  Open the builder and fill the sections in command order. The live preview updates
                  as you type.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}