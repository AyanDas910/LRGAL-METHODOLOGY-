import jsPDF from "jspdf";
import { InspectionRecord } from "../types";

export function generateInspectionPdf(inspection: InspectionRecord): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 16;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setTextColor(248, 250, 252);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("GOVERNMENT OF INDIA | MINISTRY OF CONSUMER AFFAIRS", pageWidth / 2, 11, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("DEPARTMENT OF CONSUMER AFFAIRS — LEGAL METROLOGY DIVISION", pageWidth / 2, 17, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text("STATUTORY INSPECTION REPORT UNDER LEGAL METROLOGY (PACKAGED COMMODITIES) RULES, 2011", pageWidth / 2, 23, { align: "center" });

  y = 36;

  // Title Box
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`INSPECTION CERTIFICATE: ${inspection.id}`, 14, y);

  // Status Badge
  const isCompliant = inspection.overallStatus === "Compliant";
  const isWarning = inspection.overallStatus === "Warning Issued";
  if (isCompliant) {
    doc.setFillColor(22, 163, 74); // green
  } else if (isWarning) {
    doc.setFillColor(217, 119, 6); // amber
  } else {
    doc.setFillColor(220, 38, 38); // red
  }
  doc.roundedRect(pageWidth - 55, y - 6, 41, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(inspection.overallStatus.toUpperCase(), pageWidth - 34.5, y - 0.5, { align: "center" });

  y += 10;

  // Metadata Panel
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 34, 3, 3, "F");
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, pageWidth - 28, 34, 3, 3, "S");

  doc.setTextColor(51, 65, 85);
  doc.setFontSize(8.5);

  const col1 = 18;
  const col2 = 105;

  doc.setFont("helvetica", "bold");
  doc.text("Product Name:", col1, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(inspection.productName.substring(0, 42), col1 + 24, y + 6);

  doc.setFont("helvetica", "bold");
  doc.text("Brand / Mfr:", col1, y + 13);
  doc.setFont("helvetica", "normal");
  doc.text(inspection.brandName, col1 + 24, y + 13);

  doc.setFont("helvetica", "bold");
  doc.text("Category:", col1, y + 20);
  doc.setFont("helvetica", "normal");
  doc.text(inspection.category, col1 + 24, y + 20);

  doc.setFont("helvetica", "bold");
  doc.text("Barcode / EAN:", col1, y + 27);
  doc.setFont("helvetica", "normal");
  doc.text(inspection.barcode || "N/A", col1 + 24, y + 27);

  doc.setFont("helvetica", "bold");
  doc.text("Date & Time:", col2, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(new Date(inspection.timestamp).toLocaleString("en-IN"), col2 + 22, y + 6);

  doc.setFont("helvetica", "bold");
  doc.text("Inspector / Badge:", col2, y + 13);
  doc.setFont("helvetica", "normal");
  doc.text(`${inspection.inspectorName} (${inspection.inspectorBadge})`, col2 + 28, y + 13);

  doc.setFont("helvetica", "bold");
  doc.text("Location:", col2, y + 20);
  doc.setFont("helvetica", "normal");
  doc.text(inspection.location.substring(0, 45), col2 + 16, y + 20);

  doc.setFont("helvetica", "bold");
  doc.text("PDP Area / Score:", col2, y + 27);
  doc.setFont("helvetica", "normal");
  doc.text(`${inspection.pdpAreaCm2} cm² | Score: ${inspection.complianceScore}% (${inspection.violationsCount} Violations)`, col2 + 28, y + 27);

  y += 42;

  // Declarations Table Header
  doc.setFillColor(30, 41, 59);
  doc.rect(14, y, pageWidth - 28, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("STATUTORY DECLARATION (LMPC RULES 2011)", 18, y + 5.5);
  doc.text("EXTRACTED LABEL VALUES", 85, y + 5.5);
  doc.text("STATUS", pageWidth - 35, y + 5.5);

  y += 8;

  // Declarations Rows
  inspection.declarations.forEach((item, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(14, y, pageWidth - 28, 14, "F");
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y + 14, pageWidth - 14, y + 14);

    // Title & Rule
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(item.title, 18, y + 4.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(item.legalSection, 18, y + 9);

    // Extracted Value
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7);
    const splitText = doc.splitTextToSize(item.extractedValue, 85);
    doc.text(splitText.slice(0, 2), 85, y + 4.5);

    // Status Pill
    if (item.isCompliant) {
      doc.setTextColor(22, 163, 74);
      doc.setFont("helvetica", "bold");
      doc.text("COMPLIANT", pageWidth - 35, y + 6);
    } else {
      doc.setTextColor(220, 38, 38);
      doc.setFont("helvetica", "bold");
      doc.text("VIOLATION", pageWidth - 35, y + 6);
      doc.setFontSize(6);
      doc.text(`[${item.severity.toUpperCase()}]`, pageWidth - 35, y + 10);
    }

    y += 14;
  });

  y += 6;

  // Executive Summary & Penal Provisions
  doc.setFillColor(254, 242, 242);
  if (isCompliant) doc.setFillColor(240, 253, 244);
  doc.roundedRect(14, y, pageWidth - 28, 32, 3, 3, "F");
  doc.setDrawColor(isCompliant ? 187 : 254, isCompliant ? 247 : 202, isCompliant ? 208 : 202);
  doc.roundedRect(14, y, pageWidth - 28, 32, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(isCompliant ? 22 : 153, isCompliant ? 101 : 27, isCompliant ? 52 : 27);
  doc.text("EXECUTIVE ENFORCEMENT SUMMARY & LEGAL PROVISIONS:", 18, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(inspection.summary, pageWidth - 38);
  doc.text(summaryLines, 18, y + 12);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(`Recommended Action: ${inspection.recommendedAction}`, 18, y + 22);
  if (!isCompliant) {
    doc.setTextColor(185, 28, 28);
    doc.text(`Statutory Compounding Penalty Estimated: ₹ ${inspection.estimatedPenaltyInr.toLocaleString("en-IN")}/- under Section 48 of LM Act 2009`, 18, y + 27);
  }

  y += 40;

  // Signatures
  doc.setDrawColor(148, 163, 184);
  doc.line(18, y + 15, 75, y + 15);
  doc.line(pageWidth - 75, y + 15, pageWidth - 18, y + 15);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.text("Inspecting Legal Metrology Officer", 18, y + 19);
  doc.setFont("helvetica", "normal");
  doc.text(`Digital Sign ID: ${inspection.inspectorBadge}`, 18, y + 23);

  doc.setFont("helvetica", "bold");
  doc.text("Authorized Controller / Seizure Officer", pageWidth - 75, y + 19);
  doc.setFont("helvetica", "normal");
  doc.text("Department of Consumer Affairs (DoCA)", pageWidth - 75, y + 23);

  // Footer
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Generated by National Legal Metrology Packaged Commodities Portal | For Official Enforcement Use Only", pageWidth / 2, 288, { align: "center" });

  doc.save(`${inspection.id}_DoCA_Report.pdf`);
}
