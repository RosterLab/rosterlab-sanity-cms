import type { PDFGenerationOptions, PDFReportData } from "./types";

export class PDFGenerator {
  private static async loadJsPDF() {
    const { default: jsPDF } = await import("jspdf");
    return jsPDF;
  }

  private static async loadLogo(): Promise<string | null> {
    try {
      const logoUrl = "/images/rosterlab-logo.png";
      const logoResponse = await fetch(logoUrl);
      const logoBlob = await logoResponse.blob();

      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(logoBlob);
      });
    } catch (error) {
      console.warn("Failed to load logo:", error);
      return null;
    }
  }

  private static addHeader(
    doc: any,
    logoBase64: string | null,
    reportType: "savings" | "roi",
  ) {
    const primaryColor: [number, number, number] = [41, 98, 255];
    const lightGray: [number, number, number] = [128, 128, 128];

    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 20, 10, 45, 12);
    } else {
      doc.setFontSize(24);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(
        `RosterLab ${reportType === "savings" ? "Savings" : "ROI"} Report`,
        20,
        25,
      );
    }

    // Date
    doc.setFontSize(9);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      logoBase64 ? 28 : 35,
    );

    // Separator line
    doc.setLineWidth(0.5);
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.line(20, logoBase64 ? 30 : 40, 190, logoBase64 ? 30 : 40);
  }

  private static addExecutiveSummary(
    doc: any,
    data: PDFReportData,
    yPos: number,
  ): number {
    const primaryColor: [number, number, number] = [41, 98, 255];
    const textColor: [number, number, number] = [51, 51, 51];

    // Executive Summary Box
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(15, yPos, 180, 28, 3, 3, "F");

    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Executive Summary", 20, yPos + 8);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(
      `Total Annual Savings: $${data.results.totalAnnualSavings.toLocaleString()}`,
      20,
      yPos + 16,
    );
    doc.setTextColor(34, 139, 34);
    doc.text(`ROI in Year 1: ${data.results.roiMultiple}x`, 20, yPos + 23);
    doc.setFont("helvetica", "normal");

    return yPos + 35;
  }

  private static addOrganizationDetails(
    doc: any,
    data: PDFReportData,
    yPos: number,
  ): number {
    const primaryColor: [number, number, number] = [41, 98, 255];
    const textColor: [number, number, number] = [51, 51, 51];

    // Left border
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(3);
    doc.line(15, yPos, 15, yPos + 25);

    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("See how RosterLab can save", 20, yPos + 3);

    doc.setFontSize(10);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(`Roster Type: ${data.industryConfig.name}`, 25, yPos + 11);
    doc.text(`Number of Employees: ${data.inputs.employees}`, 25, yPos + 17);
    doc.text(
      `Rosterer Hourly Wage: $${data.inputs.avgHourlyWage}/hour`,
      110,
      yPos + 11,
    );
    doc.text(
      `Roster Cycle: Every ${data.inputs.rosterCycleWeeks} week${data.inputs.rosterCycleWeeks > 1 ? "s" : ""}`,
      110,
      yPos + 17,
    );
    doc.text(
      `Days Spent per Roster: ${data.inputs.scaledRosteringDays.toFixed(1)} day${data.inputs.scaledRosteringDays > 1 ? "s" : ""}`,
      25,
      yPos + 23,
    );

    return yPos + 35;
  }

  private static addSavingsBreakdown(
    doc: any,
    data: PDFReportData,
    yPos: number,
  ): number {
    const primaryColor: [number, number, number] = [41, 98, 255];
    const textColor: [number, number, number] = [51, 51, 51];
    let currentY = yPos;
    let categoryNum = 1;

    // Header
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(15, currentY, 180, 8, "F");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("Detailed Savings Breakdown (Estimated)", 20, currentY + 5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);

    currentY += 15;

    // Manual Time Spent Rostering
    if (data.industryConfig.hasManualTimeSaving) {
      currentY = this.addSavingCategory(
        doc,
        `${categoryNum}. Manual Time Spent Rostering`,
        data.results.timeSavingsCost,
        "We save you time from the very first roster. Based on our experience across healthcare rosters, we reduce time spent creating and managing rosters by 80–90%.",
        "Case study: Sydney Tertiary Hospital saves 300+ hours a year",
        "https://rosterlab.com/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering",
        currentY,
      );
      categoryNum++;
    }

    // Optimised Staffing
    if (data.industryConfig.hasStaffingEfficiency) {
      currentY = this.addSavingCategory(
        doc,
        `${categoryNum}. Optimised Staffing`,
        data.results.allocativeEfficiencySavings,
        "By allocating shifts with precision, we maximize efficiency, cutting overtime costs, reducing locum usage, and ensuring optimal staffing for every shift.",
        null,
        null,
        currentY,
      );
      categoryNum++;
    }

    // Skill Mix (if applicable)
    if (data.industryConfig.hasSkillMix) {
      currentY = this.addSavingCategory(
        doc,
        `${categoryNum}. Improved Skill Mix`,
        data.results.skillMixSavings,
        "15% reduction in temporary staff usage. Temp staff costs 50% more than permanent staff.",
        null,
        null,
        currentY,
        26,
      );
      categoryNum++;
    }

    // Reduced Turnover Costs
    if (data.industryConfig.hasTurnover) {
      currentY = this.addSavingCategory(
        doc,
        `${categoryNum}. Reduced Turnover Costs`,
        data.results.turnoverReductionSavings,
        "Reducing staff turnover delivers significant cost savings by avoiding recruitment, onboarding, and training expenses while improving team satisfaction.",
        "Case study: From 40% Short-Staffed to Fully Staffed",
        "https://rosterlab.com/case-studies/from-40-short-staffed-to-fully-staffed-how-rosterlab-helped-radiology-retain-staff",
        currentY,
      );
      categoryNum++;
    }

    return currentY;
  }

  private static addSavingCategory(
    doc: any,
    title: string,
    savings: number,
    description: string,
    caseStudyText: string | null,
    caseStudyUrl: string | null,
    yPos: number,
    boxHeight: number = 52,
  ): number {
    const primaryColor: [number, number, number] = [41, 98, 255];
    const textColor: [number, number, number] = [51, 51, 51];

    // Category box
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(18, yPos - 4, 174, boxHeight, 2, 2, "F");

    // Title and savings amount
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(title, 22, yPos + 2);

    doc.setTextColor(34, 139, 34);
    doc.text(`$${savings.toLocaleString()}/year`, 155, yPos + 2);

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const descriptionLines = doc.splitTextToSize(description, 155);

    let lineOffset = 11;
    descriptionLines.forEach((line: string) => {
      doc.text(line, 28, yPos + lineOffset);
      lineOffset += 4;
    });

    // Case study link
    if (caseStudyText && caseStudyUrl) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.textWithLink(caseStudyText, 28, yPos + lineOffset + 2, {
        url: caseStudyUrl,
      });
    }

    return yPos + boxHeight + 4;
  }

  private static addPage2Content(doc: any, data: PDFReportData): void {
    const primaryColor: [number, number, number] = [41, 98, 255];
    const textColor: [number, number, number] = [51, 51, 51];
    let yPos = 20;

    // Benefits section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Some other benefits:", 20, yPos);

    yPos += 10;

    // Add benefits
    const benefits = [
      {
        title: "Smarter workforce planning",
        text: "A streamlined rostering solution gives managers insights to allocate shifts strategically and prevent unused leave buildup.",
      },
      {
        title: "Stronger employee engagement",
        text: "Fair, transparent schedules that respect preferences boost morale and build a more committed team culture.",
      },
      {
        title: "Sustained performance and wellbeing",
        text: "Optimized shift structures ensure adequate rest, balanced workloads, and compliance with fatigue-management practices.",
      },
    ];

    benefits.forEach((benefit) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(benefit.title, 20, yPos);

      doc.setFont("helvetica", "normal");
      const benefitLines = doc.splitTextToSize(benefit.text, 165);
      let benefitOffset = 6;
      benefitLines.forEach((line: string) => {
        doc.text(line, 20, yPos + benefitOffset);
        benefitOffset += 4;
      });
      yPos += benefitOffset + 8;
    });

    // Investment section
    yPos += 5;
    doc.setFillColor(255, 245, 230);
    doc.roundedRect(15, yPos - 5, 180, 35, 3, 3, "F");

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("RosterLab Investment", 20, yPos + 2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(
      `Annual Subscription: $${data.results.annualSubscriptionCost.toLocaleString()}`,
      25,
      yPos + 9,
    );
    doc.text(`($20 per employee per month)`, 110, yPos + 9);
    doc.text(
      `One-off Implementation: $${data.results.oneOffImplementationCost.toLocaleString()}*`,
      25,
      yPos + 16,
    );
    doc.text(
      `(estimate: ${data.results.implementationDays} days × $1,500/day)`,
      110,
      yPos + 16,
    );

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 69, 0);
    doc.text(
      `First Year Total: $${data.results.firstYearTotalCost.toLocaleString()}`,
      25,
      yPos + 23,
    );

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "*Final implementation cost will be confirmed after demo and scoping session",
      20,
      yPos + 32,
    );

    // Next steps and contact info
    yPos += 50;
    this.addNextStepsAndContact(doc, yPos);
  }

  private static addNextStepsAndContact(doc: any, yPos: number): void {
    const primaryColor: [number, number, number] = [41, 98, 255];
    const textColor: [number, number, number] = [51, 51, 51];
    const lightGray: [number, number, number] = [128, 128, 128];

    // Next Steps section
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(15, yPos - 5, 180, 25, 3, 3, "F");

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Next Steps", 20, yPos + 2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);

    // Step circles
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(23, yPos + 10, 2, "F");
    doc.circle(23, yPos + 17, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("1", 22.3, yPos + 10.5);
    doc.text("2", 22.3, yPos + 17.5);

    doc.setFontSize(10);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);

    // Step 1 with link
    const step1Start = "Schedule a ";
    const step1End = " with our team";
    doc.text(step1Start, 28, yPos + 11);
    const step1Width = doc.getTextWidth(step1Start);

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.textWithLink("personalised demo", 28 + step1Width, yPos + 11, {
      url: "https://www.rosterlab.com/book-a-demo",
    });
    const linkWidth = doc.getTextWidth("personalised demo");

    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(step1End, 28 + step1Width + linkWidth, yPos + 11);

    doc.text(
      "Get a custom implementation plan for your organisation",
      28,
      yPos + 18,
    );

    // Contact Information
    yPos += 30;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, yPos - 3, 180, 15, 2, 2, "F");

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Contact Us:", 20, yPos + 4);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text("sales@rosterlab.com", 55, yPos + 4);
    doc.text("|", 115, yPos + 4);
    doc.text("www.rosterlab.com", 120, yPos + 4);

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text(
      "This ROI calculation is based on RosterLab research and industry data. Actual results may vary.",
      20,
      pageHeight - 15,
    );
  }

  private static generateTextFallback(data: PDFReportData): string {
    const { inputs, results, industryConfig } = data;

    return `
RosterLab ${data.reportType === "savings" ? "Savings" : "ROI"} Report
Generated for: ${data.companyName}

Your Inputs:
- Roster Type: ${industryConfig.name}
- Employees: ${inputs.employees}
- Rosterer Hourly Wage: $${inputs.avgHourlyWage}
- Roster Cycle: Every ${inputs.rosterCycleWeeks} week${inputs.rosterCycleWeeks > 1 ? "s" : ""}
- Days per Roster: ${inputs.scaledRosteringDays.toFixed(1)} day${inputs.scaledRosteringDays > 1 ? "s" : ""}

Your Potential Savings:
- Total Annual Savings: $${results.totalAnnualSavings.toLocaleString()}
- ROI in Year 1: ${results.roiMultiple}x

RosterLab Investment:
- Annual Subscription: $${results.annualSubscriptionCost.toLocaleString()} ($20 per employee per month)
- One-off Implementation: $${results.oneOffImplementationCost.toLocaleString()} (${results.implementationDays} days at $1,500/day)
- First Year Total Investment: $${results.firstYearTotalCost.toLocaleString()}

Savings Breakdown:
${
  industryConfig.hasManualTimeSaving
    ? `1. Manual Time Spent Rostering: $${results.timeSavingsCost.toLocaleString()}
   - 90% reduction in administrative time (${inputs.scaledRosteringDays.toFixed(1)} days every ${inputs.rosterCycleWeeks} weeks)
`
    : ""
}${
      industryConfig.hasStaffingEfficiency
        ? `${industryConfig.hasManualTimeSaving ? "2" : "1"}. Optimised Staffing Efficiency: $${results.allocativeEfficiencySavings.toLocaleString()}
   - By allocating shifts optimally, we increase efficiency, reducing overtime and locum needs.
`
        : ""
    }${
      industryConfig.hasSkillMix
        ? `${(() => {
            let num = 1;
            if (industryConfig.hasManualTimeSaving) num++;
            if (industryConfig.hasStaffingEfficiency) num++;
            return num;
          })()}. Improved Skill Mix: $${results.skillMixSavings.toLocaleString()}
   - 15% reduction in temporary staff usage
`
        : ""
    }${
      industryConfig.hasTurnover
        ? `${(() => {
            let num = 1;
            if (industryConfig.hasManualTimeSaving) num++;
            if (industryConfig.hasStaffingEfficiency) num++;
            if (industryConfig.hasSkillMix) num++;
            return num;
          })()}. Reduced Turnover Costs: $${results.turnoverReductionSavings.toLocaleString()}
   - Hiring and orientation savings through improved staff retention`
        : ""
    }
    `;
  }

  static async generatePDF(options: PDFGenerationOptions): Promise<boolean> {
    try {
      const jsPDF = await this.loadJsPDF();
      const doc = new jsPDF();
      const logoBase64 = await this.loadLogo();

      // Page 1
      this.addHeader(doc, logoBase64, options.data.reportType);
      let yPos = 42;

      yPos = this.addExecutiveSummary(doc, options.data, yPos);
      yPos = this.addOrganizationDetails(doc, options.data, yPos);
      this.addSavingsBreakdown(doc, options.data, yPos);

      // Page 1 footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("www.rosterlab.com", 20, pageHeight - 15);

      // Page 2
      doc.addPage();
      this.addPage2Content(doc, options.data);

      // Save PDF
      const filename =
        options.filename ||
        `RosterLab-${options.data.reportType === "savings" ? "Savings" : "ROI"}-Report-${options.data.companyName.replace(/[^a-z0-9]/gi, "_")}.pdf`;
      doc.save(filename);

      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);

      if (options.fallbackToText) {
        // Fallback to text download
        const textContent = this.generateTextFallback(options.data);
        const blob = new Blob([textContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rosterlab-report.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      return false;
    }
  }
}
