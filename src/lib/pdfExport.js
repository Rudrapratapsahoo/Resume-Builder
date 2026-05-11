import jsPDF from "jspdf";

// A4 dimensions in mm
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const MARGIN_LEFT = 20;
const MARGIN_RIGHT = 20;
const MARGIN_TOP = 15;
const CONTENT_WIDTH = A4_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

// Colors
const COLOR_BLACK = [0, 0, 0];
const COLOR_DARK = [50, 50, 50];
const COLOR_MEDIUM = [100, 100, 100];
const COLOR_LIGHT = [150, 150, 150];
const COLOR_ACCENT = [30, 80, 160];

class ResumePDF {
  constructor() {
    this.doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    this.y = MARGIN_TOP;
    this.pageNumber = 1;
  }

  // ── Check if need new page ──
  checkPage(neededSpace = 15) {
    if (this.y + neededSpace > A4_HEIGHT - 20) {
      this.addPageNumber();
      this.doc.addPage();
      this.y = MARGIN_TOP;
      this.pageNumber++;
    }
  }

  // ── Page Number ──
  addPageNumber() {
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(8);
    this.doc.setTextColor(...COLOR_LIGHT);
    this.doc.text(`Page ${this.pageNumber}`, A4_WIDTH / 2, A4_HEIGHT - 10, { align: "center" });
  }

  // ── Horizontal Line ──
  drawLine(y, color = COLOR_LIGHT, width = 0.3) {
    this.doc.setDrawColor(...color);
    this.doc.setLineWidth(width);
    this.doc.line(MARGIN_LEFT, y, A4_WIDTH - MARGIN_RIGHT, y);
  }

  // ── Section Title ──
  addSectionTitle(title) {
    this.checkPage(20);
    this.y += 6;
    this.drawLine(this.y, COLOR_ACCENT, 0.6);
    this.y += 5;
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(11);
    this.doc.setTextColor(...COLOR_ACCENT);
    this.doc.text(title.toUpperCase(), MARGIN_LEFT, this.y);
    this.y += 6;
  }

  // ── Wrap text ──
  addWrappedText(text, fontSize, fontStyle, color, maxWidth, lineHeight) {
    if (!text || text.toString().trim() === "") return;
    this.doc.setFont("helvetica", fontStyle);
    this.doc.setFontSize(fontSize);
    this.doc.setTextColor(...color);
    const lines = this.doc.splitTextToSize(text.toString(), maxWidth);
    for (const line of lines) {
      this.checkPage(lineHeight);
      this.doc.text(line, MARGIN_LEFT, this.y);
      this.y += lineHeight;
    }
  }

  // ── Left + Right aligned on same line ──
  addLeftRight(leftText, rightText, fontStyle, fontSize, rightSize = 9) {
    if (!leftText && !rightText) return;
    if (leftText) {
      this.doc.setFont("helvetica", fontStyle);
      this.doc.setFontSize(fontSize);
      this.doc.setTextColor(...COLOR_BLACK);
      this.doc.text(leftText, MARGIN_LEFT, this.y);
    }
    if (rightText) {
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(rightSize);
      this.doc.setTextColor(...COLOR_LIGHT);
      this.doc.text(rightText, A4_WIDTH - MARGIN_RIGHT, this.y, { align: "right" });
    }
    this.y += 5;
  }

  // ════════════════════════════════════════
  // ── HEADER: personal info ──
  // ════════════════════════════════════════
  addHeader(personal) {
    // Name
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(24);
    this.doc.setTextColor(...COLOR_BLACK);
    const name = personal.name || "Your Name";
    this.doc.text(name, MARGIN_LEFT, this.y);
    this.y += 9;

    // Title
    if (personal.title) {
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(13);
      this.doc.setTextColor(...COLOR_MEDIUM);
      this.doc.text(personal.title, MARGIN_LEFT, this.y);
      this.y += 7;
    }

    // Contact line 1: email | phone | location
    const line1 = [];
    if (personal.email) line1.push(personal.email);
    if (personal.phone) line1.push(personal.phone);
    if (personal.location) line1.push(personal.location);

    if (line1.length > 0) {
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(9);
      this.doc.setTextColor(...COLOR_MEDIUM);
      this.doc.text(line1.join("  |  "), MARGIN_LEFT, this.y);
      this.y += 4.5;
    }

    // Contact line 2: website | portfolio
    const line2 = [];
    if (personal.website) line2.push(personal.website);
    if (personal.portfolio) line2.push(personal.portfolio);

    if (line2.length > 0) {
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(8);
      this.doc.setTextColor(...COLOR_ACCENT);
      this.doc.text(line2.join("  |  "), MARGIN_LEFT, this.y);
      this.y += 4;
    }

    // Divider
    this.y += 2;
    this.drawLine(this.y, COLOR_BLACK, 0.8);
    this.y += 4;
  }

  // ════════════════════════════════════════
  // ── SUMMARY ──
  // ════════════════════════════════════════
  addSummary(summary) {
    if (!summary || summary.trim() === "") return;
    this.addSectionTitle("Professional Summary");
    this.addWrappedText(summary, 10, "normal", COLOR_DARK, CONTENT_WIDTH, 5);
  }

  // ════════════════════════════════════════
  // ── EXPERIENCE ──
  // Fields: company, role, period, location, bullets[]
  // ════════════════════════════════════════
  addExperience(experience) {
    if (!experience || experience.length === 0) return;
    this.addSectionTitle("Work Experience");

    for (const exp of experience) {
      this.checkPage(25);

      // Role (left) + Period (right)
      const role = exp.role || exp.title || exp.position || "Role";
      const period = exp.period || exp.duration || "";
      this.addLeftRight(role, period, "bold", 11);

      // Company + Location
      const companyLine = [exp.company || exp.organization || ""];
      if (exp.location || exp.city) {
        companyLine.push(exp.location || exp.city);
      }
      const companyText = companyLine.filter(Boolean).join(", ");
      if (companyText) {
        this.doc.setFont("helvetica", "bolditalic");
        this.doc.setFontSize(10);
        this.doc.setTextColor(...COLOR_MEDIUM);
        this.doc.text(companyText, MARGIN_LEFT, this.y);
        this.y += 5;
      }

      // Bullets (array)
      if (exp.bullets && Array.isArray(exp.bullets)) {
        for (const bullet of exp.bullets) {
          if (bullet && bullet.trim() !== "") {
            const text = bullet.trim().startsWith("•") || bullet.trim().startsWith("-")
              ? bullet.trim()
              : `• ${bullet.trim()}`;
            this.addWrappedText(text, 9.5, "normal", COLOR_DARK, CONTENT_WIDTH - 5, 4.5);
          }
        }
      }

      // Description (fallback)
      if (exp.description && (!exp.bullets || exp.bullets.length === 0)) {
        const bullets = exp.description.split("\n").filter((l) => l.trim());
        for (const bullet of bullets) {
          const text = bullet.trim().startsWith("•") || bullet.trim().startsWith("-")
            ? bullet.trim()
            : `• ${bullet.trim()}`;
          this.addWrappedText(text, 9.5, "normal", COLOR_DARK, CONTENT_WIDTH - 5, 4.5);
        }
      }

      this.y += 3;
    }
  }

  // ════════════════════════════════════════
  // ── EDUCATION ──
  // Fields: school, degree, period, location, details
  // ════════════════════════════════════════
  addEducation(education) {
    if (!education || education.length === 0) return;
    this.addSectionTitle("Education");

    for (const edu of education) {
      this.checkPage(20);

      // Degree (left) + Period (right)
      const degree = edu.degree || edu.course || edu.qualification || "Degree";
      const period = edu.period || edu.duration || edu.year || "";
      this.addLeftRight(degree, period, "bold", 11);

      // School + Location
      const schoolLine = [edu.school || edu.institution || edu.college || edu.university || ""];
      if (edu.location || edu.city) {
        schoolLine.push(edu.location || edu.city);
      }
      const schoolText = schoolLine.filter(Boolean).join(", ");
      if (schoolText) {
        this.doc.setFont("helvetica", "bolditalic");
        this.doc.setFontSize(10);
        this.doc.setTextColor(...COLOR_MEDIUM);
        this.doc.text(schoolText, MARGIN_LEFT, this.y);
        this.y += 5;
      }

      // Details (text block)
      if (edu.details && edu.details.trim() !== "") {
        const bullets = edu.details.split("\n").filter((l) => l.trim());
        for (const bullet of bullets) {
          const text = bullet.trim().startsWith("•") || bullet.trim().startsWith("-")
            ? bullet.trim()
            : `• ${bullet.trim()}`;
          this.addWrappedText(text, 9.5, "normal", COLOR_DARK, CONTENT_WIDTH - 5, 4.5);
        }
      }

      this.y += 3;
    }
  }

  // ════════════════════════════════════════
  // ── PROJECTS ──
  // ════════════════════════════════════════
  addProjects(projects) {
    if (!projects || projects.length === 0) return;
    this.addSectionTitle("Projects");

    for (const proj of projects) {
      this.checkPage(20);

      // Name (left) + Tech (right)
      const name = proj.name || proj.title || "Project";
      const tech = proj.tech || proj.technologies || proj.tools || proj.stack || "";
      this.addLeftRight(name, tech, "bold", 11);

      // Date / Duration
      if (proj.startDate || proj.endDate || proj.date || proj.duration || proj.period) {
        const dateText = proj.period || proj.duration || proj.date || [proj.startDate, proj.endDate].filter(Boolean).join(" - ");
        if (dateText) {
          this.doc.setFont("helvetica", "normal");
          this.doc.setFontSize(8);
          this.doc.setTextColor(...COLOR_LIGHT);
          this.doc.text(dateText, MARGIN_LEFT, this.y);
          this.y += 4;
        }
      }

      // Link
      const link = proj.link || proj.url || proj.github || proj.demo || "";
      if (link) {
        this.doc.setFont("helvetica", "normal");
        this.doc.setFontSize(8);
        this.doc.setTextColor(...COLOR_ACCENT);
        try {
          this.doc.textWithLink(link, MARGIN_LEFT, this.y, { url: link });
        } catch {
          this.doc.text(link, MARGIN_LEFT, this.y);
        }
        this.y += 4;
      }

      // Bullets (array)
      if (proj.bullets && Array.isArray(proj.bullets)) {
        for (const bullet of proj.bullets) {
          if (bullet && bullet.trim() !== "") {
            const text = bullet.trim().startsWith("•") || bullet.trim().startsWith("-")
              ? bullet.trim()
              : `• ${bullet.trim()}`;
            this.addWrappedText(text, 9.5, "normal", COLOR_DARK, CONTENT_WIDTH - 5, 4.5);
          }
        }
      }

      // Description (fallback)
      if (proj.description && (!proj.bullets || proj.bullets.length === 0)) {
        const bullets = proj.description.split("\n").filter((l) => l.trim());
        for (const bullet of bullets) {
          const text = bullet.trim().startsWith("•") || bullet.trim().startsWith("-")
            ? bullet.trim()
            : `• ${bullet.trim()}`;
          this.addWrappedText(text, 9.5, "normal", COLOR_DARK, CONTENT_WIDTH - 5, 4.5);
        }
      }

      this.y += 3;
    }
  }

  // ════════════════════════════════════════
  // ── SKILLS ──
  // ════════════════════════════════════════
  addSkills(skills) {
    if (!skills || skills.length === 0) return;
    this.addSectionTitle("Skills");

    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(10);
    this.doc.setTextColor(...COLOR_DARK);

    const skillNames = skills.map((s) => {
      if (typeof s === "string") return s;
      return s.name || s.skill || s.title || JSON.stringify(s);
    });

    const skillText = skillNames.join("  •  ");
    const lines = this.doc.splitTextToSize(skillText, CONTENT_WIDTH);
    for (const line of lines) {
      this.checkPage(5);
      this.doc.text(line, MARGIN_LEFT, this.y);
      this.y += 5;
    }
  }

  // ════════════════════════════════════════
  // ── GENERATE FULL PDF ──
  // ════════════════════════════════════════
  generate(data, filename) {
    this.addHeader(data.personal || {});
    this.addSummary(data.summary);
    this.addExperience(data.experience);
    this.addEducation(data.education);
    this.addProjects(data.projects);
    this.addSkills(data.skills);
    this.addPageNumber();

    const safeFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    this.doc.save(safeFilename);
  }
}

// ── Main Export ──
export const downloadPDF = async (elementOrData, filename = "resume.pdf") => {
  if (elementOrData && typeof elementOrData === "object" && !elementOrData.tagName) {
    const pdf = new ResumePDF();
    pdf.generate(elementOrData, filename);
    return;
  }
  console.warn("PDF export: pass resume data object instead of DOM element");
};
