'use client';

import { Plus, Trash2 } from 'lucide-react';

export default function ExperienceForm({ experience = [], onChange }) {
  const addItem = () => {
    onChange([
      ...experience,
      {
        company: '',
        role: '',
        period: '',
        location: '',
        bullets: [''],
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const next = [...experience];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    const next = [...experience];
    const bullets = [...(next[expIndex].bullets || [])];
    bullets[bulletIndex] = value;
    next[expIndex] = { ...next[expIndex], bullets };
    onChange(next);
  };

  const addBullet = (expIndex) => {
    const next = [...experience];
    next[expIndex] = {
      ...next[expIndex],
      bullets: [...(next[expIndex].bullets || []), ''],
    };
    onChange(next);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const next = [...experience];
    next[expIndex] = {
      ...next[expIndex],
      bullets: next[expIndex].bullets.filter((_, i) => i !== bulletIndex),
    };
    onChange(next);
  };

  const removeItem = (index) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {experience.map((item, index) => (
        <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
          <div className="field-grid">
            <div>
              <label className="terminal-label">company</label>
              <input
                className="terminal-input"
                value={item.company}
                onChange={(e) => updateItem(index, 'company', e.target.value)}
              />
            </div>
            <div>
              <label className="terminal-label">role</label>
              <input
                className="terminal-input"
                value={item.role}
                onChange={(e) => updateItem(index, 'role', e.target.value)}
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
            <label className="terminal-label">highlights</label>
            <div className="space-y-3">
              {(item.bullets || []).map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-3">
                  <input
                    className="terminal-input flex-1"
                    value={bullet}
                    onChange={(e) => updateBullet(index, bulletIndex, e.target.value)}
                    placeholder="Achievement or impact statement"
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(index, bulletIndex)}
                    className="terminal-button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addBullet(index)} className="terminal-button">
                <Plus className="h-4 w-4" />
                add highlight
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button type="button" onClick={() => removeItem(index)} className="terminal-button">
              <Trash2 className="h-4 w-4" />
              remove experience
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addItem} className="terminal-button">
        <Plus className="h-4 w-4" />
        add experience
      </button>
    </div>
  );
}