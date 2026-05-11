"use client";

import { motion } from "framer-motion";
import { templateOptions } from "@/utils/constants";
import { cn } from "@/utils/helpers";

export default function TemplateSwitcher({ value, onChange }) {
  return (
    <div className="terminal-shell p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-[#0088ff]/50">
            template switcher
          </div>
          <div className="mt-1 text-sm text-[#8ab4d8]/40">
            Choose the resume rendering engine.
          </div>
        </div>
        <div className="terminal-badge">{templateOptions.length} layouts</div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {templateOptions.map((template) => {
          const active = value === template.key;
          return (
            <motion.button
              key={template.key}
              type="button"
              onClick={() => onChange(template.key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left transition-all duration-300",
                active
                  ? "border-[#0088ff]/30 bg-[#0088ff]/10 text-white shadow-[0_0_30px_rgba(0,136,255,0.08)]"
                  : "border-[#0088ff]/[0.06] bg-[#0088ff]/[0.02] text-[#8ab4d8]/60 hover:border-[#0088ff]/15 hover:bg-[#0088ff]/[0.04]"
              )}
            >
              <div className="text-sm font-semibold">{template.label}</div>
              <div className="mt-1 text-xs leading-5 text-[#8ab4d8]/35">
                {template.description}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
