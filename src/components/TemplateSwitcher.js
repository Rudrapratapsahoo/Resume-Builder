'use client';

import { templateOptions } from '@/utils/constants';
import { cn } from '@/utils/helpers';

export default function TemplateSwitcher({ value, onChange }) {
  return (
    <div className="terminal-shell p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-emerald-400/70">template switcher</div>
          <div className="mt-1 text-sm text-emerald-100/70">Choose the resume rendering engine.</div>
        </div>
        <div className="terminal-badge">4 layouts</div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {templateOptions.map((template) => {
          const active = value === template.key;
          return (
            <button
              key={template.key}
              type="button"
              onClick={() => onChange(template.key)}
              className={cn(
                'rounded-2xl border px-4 py-4 text-left transition',
                active
                  ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100 shadow-[0_0_24px_rgba(57,255,20,0.08)]'
                  : 'border-emerald-400/10 bg-black/35 text-emerald-100/70 hover:border-emerald-400/20 hover:bg-black/45'
              )}
            >
              <div className="text-sm font-semibold">{template.label}</div>
              <div className="mt-1 text-xs leading-5 text-emerald-100/55">{template.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}