import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF =
  async (elementId) => {
    const input =
      document.getElementById(
        elementId
      );

    if (!input) return;

    const canvas =
      await html2canvas(input, {
        scale: 2,
      });

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const width =
      pdf.internal.pageSize.getWidth();

    const height =
      (canvas.height * width) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      width,
      height
    );

    pdf.save("resume.pdf");
  };