'use client';

import { motion } from 'framer-motion';
import { UserRound, FileText, BriefcaseBusiness, GraduationCap, FolderGit2 } from 'lucide-react';
import SkillInput from '@/components/SkillInput';
import EducationForm from '@/components/EducationForm';
import ExperienceForm from '@/components/ExperienceForm';
import ProjectForm from '@/components/ProjectForm';

function Section({ icon: Icon, title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-emerald-400/10 bg-black/35 p-4 sm:p-5"
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-3">
          <Icon className="h-5 w-5 text-emerald-300" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-emerald-100">{title}</h3>
          <p className="mt-1 text-xs leading-6 text-emerald-100/60">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function ResumeForm({ data, setData }) {
  const updatePersonal = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-5">
      <Section
        icon={UserRound}
        title="personal packet"
        subtitle="Core identity fields used in the terminal header."
      >
        <div className="field-grid">
          <div>
            <label className="terminal-label">full name</label>
            <input
              className="terminal-input"
              value={data.personal.name}
              onChange={(e) => updatePersonal('name', e.target.value)}
            />
          </div>
          <div>
            <label className="terminal-label">title</label>
            <input
              className="terminal-input"
              value={data.personal.title}
              onChange={(e) => updatePersonal('title', e.target.value)}
            />
          </div>
          <div>
            <label className="terminal-label">email</label>
            <input
              className="terminal-input"
              value={data.personal.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
            />
          </div>
          <div>
            <label className="terminal-label">phone</label>
            <input
              className="terminal-input"
              value={data.personal.phone}
              onChange={(e) => updatePersonal('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="terminal-label">location</label>
            <input
              className="terminal-input"
              value={data.personal.location}
              onChange={(e) => updatePersonal('location', e.target.value)}
            />
          </div>
          <div>
            <label className="terminal-label">portfolio link</label>
            <input
              className="terminal-input"
              value={data.personal.website}
              onChange={(e) => updatePersonal('website', e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Section
        icon={FileText}
        title="summary block"
        subtitle="A compact, high-signal summary that reads well in terminal form."
      >
        <label className="terminal-label">summary</label>
        <textarea
          className="terminal-textarea"
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
        />
      </Section>

      <Section
        icon={BriefcaseBusiness}
        title="experience module"
        subtitle="Stacked work history with impact-driven bullet outputs."
      >
        <ExperienceForm experience={data.experience} onChange={(value) => updateField('experience', value)} />
      </Section>

      <Section
        icon={GraduationCap}
        title="education module"
        subtitle="Academic history and technical foundations."
      >
        <EducationForm education={data.education} onChange={(value) => updateField('education', value)} />
      </Section>

      <Section
        icon={FolderGit2}
        title="project module"
        subtitle="Use project cards to show proof of work and implementation."
      >
        <ProjectForm projects={data.projects} onChange={(value) => updateField('projects', value)} />
      </Section>

      <Section
        icon={FileText}
        title="skills array"
        subtitle="Add technologies as chips for fast parsing in the preview."
      >
        <SkillInput skills={data.skills} onChange={(value) => updateField('skills', value)} />
      </Section>
    </div>
  );
}