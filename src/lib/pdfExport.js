import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = async (elementOrId, filename = "resume.pdf") => {
  // Accept either a DOM element directly or a string element ID
  const input =
    typeof elementOrId === "string"
      ? document.getElementById(elementOrId)
      : elementOrId;

  if (!input) {
    console.error("PDF export: element not found");
    return;
  }

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#0d0d0d",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  // If content is taller than one page, split across multiple pages
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position -= pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  // Ensure filename ends with .pdf
  const safeFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  pdf.save(safeFilename);
};
