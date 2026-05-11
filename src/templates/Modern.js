'use client';

import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { initials, splitTextToList } from '@/utils/helpers';

function Prompt({ command, children }) {
  return (
    <div className="mb-4 rounded-2xl border border-emerald-400/10 bg-black/45 p-4">
      <div className="mb-3 text-xs uppercase tracking-[0.24em] text-emerald-400/65">{command}</div>
      {children}
    </div>
  );
}

export default function Modern({ data }) {
  const { personal, summary, skills, education, experience, projects } = data;

  return (
    <div className="font-[Fira_Code] text-sm text-emerald-100">
      <div className="mb-5 rounded-3xl border border-emerald-400/15 bg-black/70 p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10 font-['VT323'] text-4xl text-emerald-300">
              {initials(personal.name)}
            </div>
            <div>
              <div className="font-['VT323'] text-5xl leading-none text-emerald-300">
                {personal.name || 'Your Name'}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.24em] text-emerald-100/60">
                {personal.title || 'Role / Specialization'}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-emerald-100/70">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-300" /> {personal.email || 'email@domain.com'}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-300" /> {personal.phone || '+91 00000 00000'}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-300" /> {personal.location || 'Location'}
            </div>
          </div>
        </div>
      </div>

      <Prompt command="> load --module=summary">
        <p className="leading-7 text-emerald-100/75">{summary || 'A concise summary will appear here.'}</p>
      </Prompt>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <Prompt command="> load --module=skills">
            <div className="flex flex-wrap gap-2">
              {(skills || []).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Prompt>

          <Prompt command="> load --module=education">
            <div className="space-y-3">
              {(education || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                  <div className="text-sm font-semibold text-emerald-100">{item.school || 'School / College'}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-400/70">
                    {item.degree || 'Degree'} · {item.period || 'Period'}
                  </div>
                  <div className="mt-2 text-xs leading-6 text-emerald-100/65">{item.details || 'Education details.'}</div>
                </div>
              ))}
            </div>
          </Prompt>
        </div>

        <div className="space-y-4">
          <Prompt command="> load --module=experience">
            <div className="space-y-3">
              {(experience || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                  <div className="flex items-start justify-between gap-4">
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
          </Prompt>

          <Prompt command="> load --module=projects">
            <div className="space-y-3">
              {(projects || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
                  <div className="text-sm font-semibold text-emerald-100">{item.name || 'Project Name'}</div>
                  <div className="mt-2 text-xs leading-6 text-emerald-100/70">
                    {item.description || 'Project description.'}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
                    {(item.tech || '').split(',').map((t) => t.trim()).filter(Boolean).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </Prompt>
        </div>
      </div>
    </div>
  );
}