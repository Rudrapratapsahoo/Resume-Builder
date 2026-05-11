'use client';

import { forwardRef } from 'react';
import Modern from '@/templates/Modern';
import Minimal from '@/templates/Minimal';
import Professional from '@/templates/Professional';
import Creative from '@/templates/Creative';

const templateMap = {
  modern: Modern,
  minimal: Minimal,
  professional: Professional,
  creative: Creative,
};

const PreviewSection = forwardRef(function PreviewSection({ data, template }, ref) {
  const Template = templateMap[template] || Modern;

  return (
    <div ref={ref} className="terminal-panel overflow-hidden p-3 sm:p-4">
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-emerald-400/10 bg-black/35 px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-emerald-400/70">output stream</div>
          <div className="mt-1 text-sm text-emerald-100/65">Live resume rendering in terminal mode.</div>
        </div>
        <div className="terminal-badge">{template}</div>
      </div>

      <div className="rounded-[24px] border border-emerald-400/10 bg-[#080808] p-3 sm:p-4">
        <Template data={data} />
      </div>
    </div>
  );
});

export default PreviewSection;