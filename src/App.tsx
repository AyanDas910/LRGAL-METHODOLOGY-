import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ScannerView } from "./components/ScannerView";
import { EnforcementDashboard } from "./components/EnforcementDashboard";
import { ProductRepository } from "./components/ProductRepository";
import { ArchitectureDoc } from "./components/ArchitectureDoc";
import { RulesReferenceModal } from "./components/RulesReferenceModal";
import { AuditDetailModal } from "./components/AuditDetailModal";
import { InspectionRecord, UserRole } from "./types";
import { INITIAL_INSPECTIONS } from "./data/samplePackages";
import { Scale, Shield, PhoneCall, Globe, CheckCircle2, AlertCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("scanner");
  const [userRole, setUserRole] = useState<UserRole>("inspector");
  const [inspections, setInspections] = useState<InspectionRecord[]>(INITIAL_INSPECTIONS);
  const [selectedAuditInspection, setSelectedAuditInspection] = useState<InspectionRecord | null>(null);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [savedIds, setSavedIds] = useState<string[]>(INITIAL_INSPECTIONS.map((i) => i.id));
  const [notification, setNotification] = useState<string | null>(null);

  // Load server inspections on mount
  useEffect(() => {
    fetch("/api/inspections")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setInspections(data);
          setSavedIds(data.map((d: InspectionRecord) => d.id));
        }
      })
      .catch((err) => {
        console.warn("Using bundled initial inspections data:", err);
      });
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSaveInspection = (record: InspectionRecord) => {
    if (!savedIds.includes(record.id)) {
      setInspections((prev) => [record, ...prev]);
      setSavedIds((prev) => [record.id, ...prev]);
      triggerNotification(`Inspection ${record.id} saved to Central Enforcement Repository.`);
    }
  };

  const handleViewInspection = (inspection: InspectionRecord) => {
    setSelectedAuditInspection(inspection);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{notification}</span>
        </div>
      )}

      {/* Official Government Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenRules={() => setShowRulesModal(true)}
      />

      {/* Role Banner Notification */}
      {userRole !== "inspector" && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 px-4 py-1.5 text-xs text-center">
          <span className="font-semibold">Active Session Mode: </span>
          {userRole === "controller" && "District Controller View — Authorized for Statutory Compounding & Seizure orders."}
          {userRole === "director" && "State Director View — State-level analytics & supervisory enforcement oversight."}
          {userRole === "citizen" && "Citizen / Consumer View — Transparency mode for verifying packaged commodity MRP & authenticity."}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "scanner" && (
          <ScannerView
            onSaveInspection={handleSaveInspection}
            savedIds={savedIds}
          />
        )}

        {activeTab === "dashboard" && (
          <EnforcementDashboard
            inspections={inspections}
            onViewInspection={handleViewInspection}
          />
        )}

        {activeTab === "repository" && (
          <ProductRepository
            inspections={inspections}
            onViewInspection={handleViewInspection}
          />
        )}

        {activeTab === "architecture" && <ArchitectureDoc />}
      </main>

      {/* Audit Detail Modal */}
      {selectedAuditInspection && (
        <AuditDetailModal
          inspection={selectedAuditInspection}
          onClose={() => setSelectedAuditInspection(null)}
          onSave={handleSaveInspection}
          isSaved={savedIds.includes(selectedAuditInspection.id)}
        />
      )}

      {/* Statutory Rules Compendium Modal */}
      {showRulesModal && (
        <RulesReferenceModal onClose={() => setShowRulesModal(false)} />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Scale className="w-4 h-4 text-amber-400" />
              National Legal Metrology Compliance & Inspection System
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-lg">
              Statutory verification portal under the Legal Metrology Act, 2009 (Act 1 of 2010) and Legal Metrology (Packaged Commodities) Rules, 2011. Developed for Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution, Government of India.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
              Statutory References
            </h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <button
                  onClick={() => setShowRulesModal(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • Rule 6: Mandatory Declarations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowRulesModal(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • Rule 7 Table 1: Numeral Heights
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowRulesModal(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • Section 36 & 48: Compounding
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • Architecture Specification
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
              Public Assistance
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>National Consumer Helpline: <strong>1915</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>e-Daakhil / consumerhelpline.gov.in</span>
              </div>
              <div className="text-[10px] text-slate-500 pt-1">
                Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} Department of Consumer Affairs, Government of India. All rights reserved.</span>
          <span>Official Enforcement Use Only | Security Cleared</span>
        </div>
      </footer>
    </div>
  );
}
