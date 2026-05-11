'use client';

import { Download } from 'lucide-react';
import { downloadPDF } from '@/lib/pdfExport';

export default function DownloadButton({ targetRef, filename = 'quantum-terminal-resume' }) {
  const handleDownload = async () => {
    await downloadPDF(targetRef?.current, filename);
  };

  return (
    <button type="button" onClick={handleDownload} className="terminal-button-primary">
      <Download className="h-4 w-4" />
      download pdf
    </button>
  );
}
