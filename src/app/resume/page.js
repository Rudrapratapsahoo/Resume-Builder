'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Save, Wand2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import QuantumBackdrop from '@/components/QuantumBackdrop';
import ProtectedRoute from '@/components/ProtectedRoute';
import ResumeForm from '@/components/ResumeForm';
import PreviewSection from '@/components/PreviewSection';
import TemplateSwitcher from '@/components/TemplateSwitcher';
import DownloadButton from '@/components/DownloadButton';
import { defaultResumeData } from '@/utils/constants';
import { loadResume, saveResume } from '@/lib/saveResume';

export default function ResumePage() {
  const previewRef = useRef(null);
  const [template, setTemplate] = useState('modern');
  const [data, setData] = useState(defaultResumeData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = loadResume();
    if (saved) {
      setData(saved.data || defaultResumeData);
      setTemplate(saved.template || 'modern');
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveResume({ data, template });
  }, [data, template, ready]);

  const headerLabel = useMemo(() => {
    const map = {
      modern: 'terminal://modern',
      minimal: 'terminal://minimal',
      professional: 'terminal://professional',
      creative: 'terminal://creative',
    };
    return map[template] || 'terminal://modern';
  }, [template]);

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
              <div className="terminal-badge mb-4">resume builder</div>
              <h1 className="terminal-heading">Command the resume pipeline.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-100/75">
                Build sections on the left, preview on the right, then export a polished layout.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="terminal-button"
                onClick={() => setData(defaultResumeData)}
              >
                <Wand2 className="h-4 w-4" />
                reset draft
              </button>
              <button type="button" className="terminal-button">
                <Save className="h-4 w-4" />
                {headerLabel}
              </button>
              <DownloadButton targetRef={previewRef} filename="quantum-terminal-resume" />
            </div>
          </div>

          <div className="mb-6">
            <TemplateSwitcher value={template} onChange={setTemplate} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-shell scanlines p-4 sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-emerald-400/70">
                    input console
                  </div>
                  <div className="mt-1 font-['VT323'] text-3xl text-emerald-300">
                    > edit --module=resume
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-emerald-300/80" />
              </div>

              <ResumeForm data={data} setData={setData} template={template} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="terminal-shell scanlines p-4 sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-emerald-400/70">
                    live preview
                  </div>
                  <div className="mt-1 font-['VT323'] text-3xl text-emerald-300">
                    > render --module=template
                  </div>
                </div>
                <div className="terminal-badge">sync live</div>
              </div>

              <PreviewSection ref={previewRef} data={data} template={template} />
            </motion.div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}