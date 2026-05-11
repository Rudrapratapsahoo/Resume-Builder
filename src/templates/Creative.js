'use client';

import { ArrowUpRight, Orbit } from 'lucide-react';
import { initials } from '@/utils/helpers';

function Window({ title, children }) {
  return (
    <div className="rounded-[24px] border border-emerald-400/10 bg-black/35 p-4">
      <div className="mb-3 flex items-center justify-between border-b border-emerald-400/10 pb-3">
        <div className="text-xs uppercase tracking-[0.24em] text-emerald-400/70">{title}</div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/20" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Creative({ data }) {
  const { personal, summary, skills, education, experience, projects } = data;

  return (
    <div className="font-[Fira_Code] text-sm text-emerald-100">
      <div className="mb-4 rounded-[28px] border border-emerald-400/15 bg-black/70 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-18 w-18 items-center justify-center rounded-[28px] border border-emerald-400/15 bg-emerald-400/10 p-4 font-['VT323'] text-4xl text-emerald-300">
              {initials(personal.name)}
            </div>
            <div>
              <div className="font-['VT323'] text-5xl text-emerald-300">{personal.name || 'Your Name'}</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-emerald-200">
                <Orbit className="h-3.5 w-3.5" />
                {personal.title || 'Creative Technical Role'}
              </div>
            </div>
          </div>
          <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/55">
            { " > render --mode=creative"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <Window title="summary">
            <p className="leading-7 text-emerald-100/75">{summary || 'Summary content.'}</p>
          </Window>

          <Window title="skills matrix">
            <div className="flex flex-wrap gap-2">
              {(skills || []).map((skill) => (
                <span key={skill} className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                  {skill}
                </span>
              ))}
            </div>
          </Window>

          <Window title="education timeline">
            <div className="space-y-3">
              {(education || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                  <div className="text-sm font-semibold text-emerald-100">{item.school || 'School'}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-400/70">
                    {item.degree || 'Degree'} · {item.period || 'Period'}
                  </div>
                  <div className="mt-2 text-xs text-emerald-100/65">{item.details || 'Details.'}</div>
                </div>
              ))}
            </div>
          </Window>
        </div>

        <div className="space-y-4">
          <Window title="experience feed">
            <div className="space-y-3">
              {(experience || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-emerald-100">{item.role || 'Role'}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-400/70">
                        {item.company || 'Company'} · {item.period || 'Period'}
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-emerald-300/80" />
                  </div>
                  <div className="mt-3 space-y-2 text-xs leading-6 text-emerald-100/70">
                    {(item.bullets || []).filter(Boolean).map((bullet, i) => (
                      <div key={i}>• {bullet}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Window>

          <Window title="project viewport">
            <div className="space-y-3">
              {(projects || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                  <div className="text-sm font-semibold text-emerald-100">{item.name || 'Project'}</div>
                  <div className="mt-2 text-xs leading-6 text-emerald-100/70">{item.description || 'Description.'}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
                    {item.tech || 'Tech stack'}
                  </div>
                </div>
              ))}
            </div>
          </Window>
        </div>
      </div>
    </div>
  );
}