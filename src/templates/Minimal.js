'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { initials } from '@/utils/helpers';

export default function Minimal({ data }) {
  const { personal, summary, skills, education, experience, projects } = data;

  return (
    <div className="font-[Fira_Code] text-sm text-emerald-100">
      <div className="rounded-3xl border border-emerald-400/15 bg-black/60 p-6">
        <div className="flex flex-col gap-4 border-b border-emerald-400/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10 font-['VT323'] text-4xl text-emerald-300">
              {initials(personal.name)}
            </div>
            <div>
              <div className="font-['VT323'] text-5xl text-emerald-300">{personal.name || 'Your Name'}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.24em] text-emerald-100/55">
                {personal.title || 'Role / Title'}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-emerald-100/70">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald-300" /> {personal.email || 'email@domain.com'}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-300" /> {personal.phone || '+91 00000 00000'}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-300" /> {personal.location || 'Location'}</div>
          </div>
        </div>

        <div className="mt-5 grid gap-5">
          <section>
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-emerald-400/70">summary</div>
            <p className="leading-7 text-emerald-100/75">{summary || 'Summary content.'}</p>
          </section>

          <section>
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-emerald-400/70">skills</div>
            <div className="flex flex-wrap gap-2">
              {(skills || []).map((skill) => (
                <span key={skill} className="rounded-full border border-emerald-400/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.24em] text-emerald-400/70">experience</div>
              <div className="space-y-3">
                {(experience || []).map((item, index) => (
                  <div key={index} className="border-l border-emerald-400/20 pl-4">
                    <div className="font-semibold text-emerald-100">{item.role || 'Role'}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/70">
                      {item.company || 'Company'} · {item.period || 'Period'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.24em] text-emerald-400/70">education</div>
              <div className="space-y-3">
                {(education || []).map((item, index) => (
                  <div key={index} className="border-l border-emerald-400/20 pl-4">
                    <div className="font-semibold text-emerald-100">{item.school || 'School'}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/70">
                      {item.degree || 'Degree'} · {item.period || 'Period'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-emerald-400/70">projects</div>
            <div className="grid gap-3 md:grid-cols-2">
              {(projects || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/40 p-4">
                  <div className="font-semibold text-emerald-100">{item.name || 'Project'}</div>
                  <div className="mt-2 text-xs leading-6 text-emerald-100/70">{item.description || 'Description'}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}