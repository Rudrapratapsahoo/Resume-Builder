"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Save, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumeForm from "@/components/ResumeForm";
import PreviewSection from "@/components/PreviewSection";
import TemplateSwitcher from "@/components/TemplateSwitcher";
import DownloadButton from "@/components/DownloadButton";
import { defaultResumeData } from "@/utils/constants";
import { loadResume, saveResume } from "@/lib/saveResume";
import ResumeBackground from "./ResumeBackground";
import { useRef } from "react";

const fade = {
  hidden: { opacity: 0, y: 15 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function ResumePage() {
  const previewRef = useRef(null);
  const [template, setTemplate] = useState("modern");
  const [data, setData] = useState(defaultResumeData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = loadResume();
    if (saved) {
      setData(saved.data || defaultResumeData);
      setTemplate(saved.template || "modern");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveResume({ data, template });
  }, [data, template, ready]);

  return (
    <ProtectedRoute>
      <main className="relative min-h-screen bg-[#030810] text-white overflow-hidden">

        {/* Calm background */}
        <ResumeBackground />
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(0,136,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.005)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10">
          <Navbar />

          <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            {/* ── Simple Header ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-2xl font-light tracking-tight text-white/90">
                  Resume Builder
                </h1>
                <p className="mt-1 text-sm text-[#8ab4d8]/35 font-light">
                  Fill the form, preview live, export as PDF.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="terminal-button py-2.5 px-4 text-sm"
                  onClick={() => setData(defaultResumeData)}
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  Reset
                </motion.button>
                <DownloadButton data={data} filename={data.personal?.name || "Resume"} />
              </div>
            </motion.div>

            {/* ── Template Switcher ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={1}
              className="mb-5"
            >
              <TemplateSwitcher value={template} onChange={setTemplate} />
            </motion.div>

            {/* ── Two Column: Form + Preview ── */}
            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">

              {/* Form Side */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={2}
                className="terminal-shell p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#0088ff]/40" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#0088ff]/40">
                    Edit Details
                  </span>
                </div>
                <ResumeForm data={data} setData={setData} template={template} />
              </motion.div>

              {/* Preview Side */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={3}
                className="terminal-shell p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#00ff88]/40" />
                    <span className="text-xs uppercase tracking-[0.2em] text-[#0088ff]/40">
                      Live Preview
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00ff88]/50 animate-pulse" />
                    <span className="text-[10px] text-[#8ab4d8]/30">syncing</span>
                  </div>
                </div>
                <PreviewSection ref={previewRef} data={data} template={template} />
              </motion.div>
            </div>

            {/* ── Footer: Made in India ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-16 bg-[#0088ff]/10" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#0088ff]/15">
                  quantum resume engine v1.0
                </span>
                <div className="h-px w-16 bg-[#0088ff]/10" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base">🇮🇳</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8ab4d8]/25 font-light">
                  Made in India
                </span>
              </div>

              <span className="text-[9px] text-[#8ab4d8]/15">
                Built with care by Rudra & Omm
              </span>
            </motion.div>

          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
