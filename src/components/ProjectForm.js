'use client';

import { Plus, Trash2 } from 'lucide-react';

export default function ProjectForm({ projects = [], onChange }) {
  const addItem = () => {
    onChange([
      ...projects,
      {
        name: '',
        description: '',
        tech: '',
        link: '',
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const next = [...projects];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const removeItem = (index) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {projects.map((item, index) => (
        <div key={index} className="rounded-2xl border border-emerald-400/10 bg-black/35 p-4">
          <div className="field-grid">
            <div>
              <label className="terminal-label">project name</label>
              <input
                className="terminal-input"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="terminal-label">link</label>
              <input
                className="terminal-input"
                value={item.link}
                onChange={(e) => updateItem(index, 'link', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="terminal-label">description</label>
            <textarea
              className="terminal-textarea"
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="terminal-label">tech stack</label>
            <input
              className="terminal-input"
              value={item.tech}
              onChange={(e) => updateItem(index, 'tech', e.target.value)}
              placeholder="React, Tailwind, Node.js"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button type="button" onClick={() => removeItem(index)} className="terminal-button">
              <Trash2 className="h-4 w-4" />
              remove project
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addItem} className="terminal-button">
        <Plus className="h-4 w-4" />
        add project
      </button>
    </div>
  );
}