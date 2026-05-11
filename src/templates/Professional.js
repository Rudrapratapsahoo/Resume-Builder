'use client';

import { Mail, MapPin, Phone, Shield } from 'lucide-react';
import { initials } from '@/utils/helpers';

function Block({ title, children }) {
  return (
    <div className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
      <div className="mb-3 text-xs uppercase tracking-[0.24em] text-emerald-400/70">{title}</div>
      {children}
    </div>
  );
}

export default function Professional({ data }) {
  const { personal, summary, skills, education, experience, projects } = data;

  return (
    <div className="font-[Fira_Code] text-sm text-emerald-100">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-3xl border border-emerald-400/15 bg-black/65 p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-400/15 bg-emerald-400/10 font-['VT323'] text-4xl text-emerald-300">
              {initials(personal.name)}
            </div>
            <div>
              <div className="font-['VT323'] text-5xl text-emerald-300">{personal.name || 'Your Name'}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.24em] text-emerald-100/55">
                {personal.title || 'Professional Role'}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-emerald-100/70">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald-300" /> {personal.email || 'email@domain.com'}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-300" /> {personal.phone || '+91 00000 00000'}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-300" /> {personal.location || 'Location'}</div>
          </div>

          <div className="mt-6">
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-emerald-400/70">skills</div>
            <div className="flex flex-wrap gap-2">
              {(skills || []).map((skill) => (
                <span key={skill} className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
            <div className="flex items-center gap-2 text-emerald-200">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">summary</span>
            </div>
            <p className="mt-3 leading-7 text-emerald-100/75">{summary || 'Professional summary.'}</p>
          </div>
        </aside>

        <section className="space-y-4">
          <Block title="experience">
            <div className="space-y-3">
              {(experience || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-emerald-100">{item.role || 'Role'}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-400/70">
                        {item.company || 'Company'} · {item.period || 'Period'}
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/70">
                      {item.location || 'Location'}
                    </div>
                  </div>
                  <div className="mt-3 space-y-2 text-xs leading-6 text-emerald-100/70">
                    {(item.bullets || []).filter(Boolean).map((bullet, i) => (
                      <div key={i}>• {bullet}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <div className="grid gap-4 md:grid-cols-2">
            <Block title="education">
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
            </Block>

            <Block title="projects">
              <div className="space-y-3">
                {(projects || []).map((item, index) => (
                  <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                    <div className="font-semibold text-emerald-100">{item.name || 'Project'}</div>
                    <div className="mt-2 text-xs leading-6 text-emerald-100/70">{item.description || 'Description'}</div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
                      {item.tech || 'Tech Stack'}
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          </div>
        </section>
      </div>
    </div>
  );
}