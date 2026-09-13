import React from "react";
import { X, ShieldCheck } from "lucide-react";
import { InspectionRecord } from "../types";
import { AnalysisResults } from "./AnalysisResults";

interface AuditDetailModalProps {
  inspection: InspectionRecord;
  onClose: () => void;
  onSave?: (record: InspectionRecord) => void;
  isSaved?: boolean;
}

export const AuditDetailModal: React.FC<AuditDetailModalProps> = ({
  inspection,
  onClose,
  onSave,
  isSaved,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Statutory Inspection Audit Record: {inspection.id}
              </h3>
              <p className="text-xs text-slate-400">
                Department of Consumer Affairs — Legal Metrology Division
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          <AnalysisResults
            inspection={inspection}
            onSaveToRepository={onSave}
            isSaved={isSaved}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Audit View
          </button>
        </div>
      </div>
    </div>
  );
};
