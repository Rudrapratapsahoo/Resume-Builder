"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { downloadPDF } from "@/lib/pdfExport";

export default function DownloadButton({ data, filename = "Resume" }) {
  const handleDownload = async () => {
    if (!data) {
      console.error("No resume data provided");
      return;
    }
    await downloadPDF(data, filename);
  };

  return (
    <motion.button
      type="button"
      onClick={handleDownload}
      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,136,255,0.12)" }}
      whileTap={{ scale: 0.98 }}
      className="terminal-button-primary py-3"
    >
      <Download className="h-4 w-4" />
      export pdf
    </motion.button>
  );
}
