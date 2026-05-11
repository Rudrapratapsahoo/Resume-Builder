'use client';

import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm({ education = [], onChange }) {
  const addItem = () => {
    onChange([
      ...education,
      {
        school: '',
        degree: '',
        period: '',
        location: '',
        details: '',
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const next = [...education];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const removeItem = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {education.map((item, index) => (
        <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
          <div className="field-grid">
            <div>
              <label className="terminal-label">school</label>
              <input
                className="terminal-input"
                value={item.school}
                onChange={(e) => updateItem(index, 'school', e.target.value)}
              />
            </div>
            <div>
              <label className="terminal-label">degree</label>
              <input
                className="terminal-input"
                value={item.degree}
                onChange={(e) => updateItem(index, 'degree', e.target.value)}
              />
            </div>
            <div>
              <label className="terminal-label">period</label>
              <input
                className="terminal-input"
                value={item.period}
                onChange={(e) => updateItem(index, 'period', e.target.value)}
              />
            </div>
            <div>
              <label className="terminal-label">location</label>
              <input
                className="terminal-input"
                value={item.location}
                onChange={(e) => updateItem(index, 'location', e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="terminal-label">details</label>
            <textarea
              className="terminal-textarea"
              value={item.details}
              onChange={(e) => updateItem(index, 'details', e.target.value)}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button type="button" onClick={() => removeItem(index)} className="terminal-button">
              <Trash2 className="h-4 w-4" />
              remove
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addItem} className="terminal-button">
        <Plus className="h-4 w-4" />
        add education
      </button>
    </div>
  );
}