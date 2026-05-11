"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Save, Wand2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumeForm from "@/components/ResumeForm";
import PreviewSection from "@/components/PreviewSection";
import TemplateSwitcher from "@/components/TemplateSwitcher";
import DownloadButton from "@/components/DownloadButton";
import { defaultResumeData } from "@/utils/constants";
import { loadResume, saveResume } from "@/lib/saveResume";
import ResumeBackground from "./ResumeBackground";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
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

  const headerLabel = useMemo(() => {
    const map = {
      modern: "terminal://modern",
      minimal: "terminal://minimal",
      professional: "terminal://professional",
      creative: "terminal://creative",
    };
    return map[template] || "terminal://modern";
  }, [template]);

  return (
    <ProtectedRoute>
      <main className="relative min-h-screen bg-[#030810] text-white overflow-hidden">

        {/* Animated background */}
        <ResumeBackground />

        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#0066ff]/5 blur-[180px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#0088ff]/3 blur-[150px]" />

        {/* Grid overlay */}
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(0,136,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.008)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10">
          <Navbar />

          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

            {/* ── Header ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
            >
              <div>
                <div className="terminal-badge mb-4">resume builder</div>
                <h1 className="terminal-heading">Command the resume pipeline.</h1>
                <p className="mt-3 max-w-xl text-sm text-[#8ab4d8]/40 font-light leading-relaxed">
                  Build sections on the left, preview on the right, then export a polished layout.
                </p>
              </div>

              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={0.5}
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,136,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="terminal-button py-3"
                  onClick={() => setData(defaultResumeData)}
                >
                  <Wand2 className="h-4 w-4" />
                  reset draft
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="terminal-button py-3"
                >
                  <Save className="h-4 w-4" />
                  {headerLabel}
                </motion.button>

                <DownloadButton data={data} filename={data.personal?.name || "Resume"} />
              </motion.div>
            </motion.div>

            {/* ── Template Switcher ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={1}
              className="mb-6"
            >
              <TemplateSwitcher value={template} onChange={setTemplate} />
            </motion.div>

            {/* ── Main Grid ── */}
            <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">

              {/* Left: Form */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={2}
                className="terminal-shell scanlines p-4 sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-[#0088ff]/50">
                      input console
                    </div>
                    <div
                      className="mt-1 text-3xl text-[#0088ff]/70"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {"> edit --module=resume"}
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-5 w-5 text-[#0088ff]/40" />
                  </motion.div>
                </div>

                <ResumeForm data={data} setData={setData} template={template} />
              </motion.div>

              {/* Right: Preview */}
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                custom={3}
                className="terminal-shell scanlines p-4 sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-[#0088ff]/50">
                      live preview
                    </div>
                    <div
                      className="mt-1 text-3xl text-[#0088ff]/70"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {"> render --module=template"}
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                    className="terminal-badge"
                  >
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mr-2 h-1.5 w-1.5 rounded-full bg-[#00ff88]/70"
                    />
                    sync live
                  </motion.div>
                </div>

                <PreviewSection ref={previewRef} data={data} template={template} />
              </motion.div>
            </div>

            {/* ── Bottom Status ── */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-6 flex items-center justify-center gap-4"
            >
              <div className="h-px w-10 bg-[#0088ff]/10" />
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#0088ff]/15">
                quantum resume engine v1.0
              </span>
              <div className="h-px w-10 bg-[#0088ff]/10" />
            </motion.div>

          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
