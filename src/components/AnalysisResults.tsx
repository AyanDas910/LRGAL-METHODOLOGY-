import React, { useState } from "react";
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Download,
  FileSpreadsheet,
  FileText,
  Scale,
  ShieldCheck,
  BookmarkPlus,
  Send,
  Eye,
  Ruler,
} from "lucide-react";
import { InspectionRecord } from "../types";
import { generateInspectionPdf } from "../utils/pdfGenerator";
import { LegalNoticeModal } from "./LegalNoticeModal";

interface AnalysisResultsProps {
  inspection: InspectionRecord;
  onSaveToRepository?: (record: InspectionRecord) => void;
  isSaved?: boolean;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  inspection,
  onSaveToRepository,
  isSaved = false,
}) => {
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "violations" | "compliant">("all");

  const isCompliant = inspection.overallStatus === "Compliant";
  const isWarning = inspection.overallStatus === "Warning Issued";

  const violations = inspection.declarations.filter((d) => !d.isCompliant);
  const compliantItems = inspection.declarations.filter((d) => d.isCompliant);

  const displayedDeclarations =
    activeFilter === "violations"
      ? violations
      : activeFilter === "compliant"
      ? compliantItems
      : inspection.declarations;

  // Export JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inspection, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${inspection.id}_DoCA_Data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ["Rule ID", "Statutory Declaration", "Legal Section", "Compliant", "Severity", "Extracted Value", "Remarks"];
    const rows = inspection.declarations.map((d) => [
      `"${d.ruleId}"`,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.legalSection.replace(/"/g, '""')}"`,
      d.isCompliant ? "PASS" : "FAIL",
      `"${d.severity}"`,
      `"${d.extractedValue.replace(/"/g, '""')}"`,
      `"${d.remarks.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `${inspection.id}_Declarations.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Status */}
      <div
        className={`rounded-2xl border p-6 shadow-sm transition-all ${
          isCompliant
            ? "bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-300"
            : isWarning
            ? "bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-300"
            : "bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 border-rose-300"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                isCompliant
                  ? "bg-emerald-600 text-white"
                  : isWarning
                  ? "bg-amber-600 text-white"
                  : "bg-rose-600 text-white"
              }`}
            >
              {isCompliant ? (
                <ShieldCheck className="w-7 h-7" />
              ) : isWarning ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <AlertOctagon className="w-7 h-7" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isCompliant
                      ? "bg-emerald-200/80 text-emerald-900 border border-emerald-400"
                      : isWarning
                      ? "bg-amber-200/80 text-amber-900 border border-amber-400"
                      : "bg-rose-200/80 text-rose-900 border border-rose-400"
                  }`}
                >
                  Verdict: {inspection.overallStatus}
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Ref: {inspection.id}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {inspection.productName}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Brand: <strong className="text-slate-800">{inspection.brandName}</strong> | Category:{" "}
                <strong className="text-slate-800">{inspection.category}</strong> | Location:{" "}
                <strong className="text-slate-800">{inspection.location}</strong>
              </p>
            </div>
          </div>

          {/* Compliance Score Pill */}
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-center pr-3 border-r border-slate-200">
              <div className="text-2xl font-black text-slate-900">
                {inspection.complianceScore}%
              </div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                LMPC Score
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800">
                {inspection.violationsCount === 0
                  ? "Zero Violations"
                  : `${inspection.violationsCount} Statutory Deficiencies`}
              </div>
              <div className="text-[11px] text-slate-500">
                PDP Area: <strong>{inspection.pdpAreaCm2} cm²</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Description */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-700 leading-relaxed">
          <strong className="font-semibold text-slate-900">Official Finding: </strong>
          {inspection.summary}
        </div>

        {/* Penal action reminder if non compliant */}
        {!isCompliant && (
          <div className="mt-3 p-3 bg-rose-100/80 border border-rose-300 rounded-xl text-xs text-rose-900 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-rose-700 shrink-0" />
              <span>
                <strong>Statutory Action:</strong> {inspection.recommendedAction} (Est. Compounding Fee:{" "}
                <strong>₹ {inspection.estimatedPenaltyInr.toLocaleString("en-IN")}/-</strong>)
              </span>
            </div>
            <button
              onClick={() => setShowNoticeModal(true)}
              className="px-3 py-1 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Draft Compounding Notice
            </button>
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Declarations ({inspection.declarations.length})
          </button>
          <button
            onClick={() => setActiveFilter("violations")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === "violations"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-rose-700 hover:bg-rose-50"
            }`}
          >
            Violations ({violations.length})
          </button>
          <button
            onClick={() => setActiveFilter("compliant")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === "compliant"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            Compliant ({compliantItems.length})
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {onSaveToRepository && (
            <button
              onClick={() => onSaveToRepository(inspection)}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
              }`}
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              {isSaved ? "Saved in Repository" : "Save Inspection"}
            </button>
          )}

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
            title="Download structured inspection schema"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            JSON
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
            title="Download CSV spreadsheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            CSV
          </button>

          <button
            onClick={() => generateInspectionPdf(inspection)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            Export Official PDF Report
          </button>
        </div>
      </div>

      {/* Declarations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedDeclarations.map((item, index) => {
          return (
            <div
              key={index}
              className={`rounded-xl p-4 border transition-all ${
                item.isCompliant
                  ? "bg-white border-slate-200 hover:border-emerald-300 shadow-xs"
                  : item.severity === "critical"
                  ? "bg-rose-50/50 border-rose-300 shadow-xs"
                  : "bg-amber-50/40 border-amber-300 shadow-xs"
              }`}
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    {item.legalSection}
                  </span>
                </div>

                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    item.isCompliant
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : item.severity === "critical"
                      ? "bg-rose-100 text-rose-800 border border-rose-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {item.isCompliant ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                  )}
                  {item.isCompliant ? "COMPLIANT" : `VIOLATION (${item.severity})`}
                </span>
              </div>

              {/* Extracted Label Value */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Extracted from Label / Packaging:
                  </div>
                  <div className="mt-0.5 p-2 bg-slate-50 rounded-lg border border-slate-200 font-mono text-slate-800 text-[11px] leading-relaxed break-words">
                    {item.extractedValue}
                  </div>
                </div>

                {/* Font Size specifics if available */}
                {item.fontSizeMm !== undefined && (
                  <div className="flex items-center gap-2 text-[11px] bg-indigo-50/70 p-2 rounded-lg border border-indigo-200 text-indigo-900">
                    <Ruler className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      Detected Font Height: <strong>{item.fontSizeMm} mm</strong> | Table 1 Requirement:{" "}
                      <strong>&ge; {item.minRequiredFontMm} mm</strong>
                      {item.isCompliant ? " (Pass)" : " (Deficient by " + ((item.minRequiredFontMm || 0) - item.fontSizeMm).toFixed(1) + " mm)"}
                    </span>
                  </div>
                )}

                {/* Statutory Requirement */}
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Statutory Rule Mandate:
                  </div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    {item.requiredFormat}
                  </div>
                </div>

                {/* Remarks & Legal implication */}
                <div
                  className={`p-2.5 rounded-lg text-[11px] leading-relaxed ${
                    item.isCompliant
                      ? "bg-emerald-50/60 text-emerald-800 border border-emerald-200/80"
                      : "bg-rose-100/70 text-rose-900 border border-rose-200"
                  }`}
                >
                  <strong className="font-semibold">Analysis: </strong>
                  {item.remarks}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice Modal */}
      {showNoticeModal && (
        <LegalNoticeModal
          inspection={inspection}
          onClose={() => setShowNoticeModal(false)}
        />
      )}
    </div>
  );
};
