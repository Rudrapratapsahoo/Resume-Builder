'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function SkillInput({ skills = [], onChange }) {
  const [value, setValue] = useState('');

  const addSkill = () => {
    const next = value.trim();
    if (!next) return;
    if (skills.includes(next)) {
      setValue('');
      return;
    }
    onChange([...skills, next]);
    setValue('');
  };

  const removeSkill = (skill) => {
    onChange(skills.filter((item) => item !== skill));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <input
          className="terminal-input flex-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a skill and press Enter"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill();
            }
          }}
        />
        <button type="button" onClick={addSkill} className="terminal-button">
          <Plus className="h-4 w-4" />
          add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="rounded-full p-1 text-emerald-300/80 hover:bg-emerald-400/10 hover:text-emerald-100"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}