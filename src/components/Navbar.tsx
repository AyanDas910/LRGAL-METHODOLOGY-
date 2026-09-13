import React from "react";
import { ShieldCheck, Scale, FileText, LayoutDashboard, Database, Cpu, Sparkles, UserCheck } from "lucide-react";
import { UserRole } from "../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenRules: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenRules,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white shadow-lg border-b border-slate-800">
      {/* Top Government of India Bar */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              GOVERNMENT OF INDIA
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Ministry of Consumer Affairs, Food & Public Distribution</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">Department of Consumer Affairs (DoCA)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Enforcement Network Active
            </span>
            <button
              onClick={onOpenRules}
              className="text-[11px] text-amber-300 hover:text-amber-200 underline font-medium cursor-pointer"
            >
              Legal Metrology Act, 2009 & Rules 2011
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 ring-2 ring-amber-400/30">
            <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                LMPC Compliance & Enforcement Portal
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Industry Grade
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Automated Label Inspection under Legal Metrology (Packaged Commodities) Rules, 2011
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab("scanner")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "scanner"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Package Scanner
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "dashboard"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Enforcement Dashboard
          </button>

          <button
            onClick={() => setActiveTab("repository")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "repository"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            Product Repository
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "architecture"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Cpu className="w-4 h-4" />
            Architecture & Framework
          </button>
        </nav>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-lg p-1">
          <span className="text-[11px] text-slate-400 pl-2 pr-1 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            Role:
          </span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="bg-slate-900 text-xs font-semibold text-amber-300 rounded px-2.5 py-1 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
          >
            <option value="inspector">Legal Metrology Inspector (LMI)</option>
            <option value="controller">District Controller</option>
            <option value="director">State Director (DoCA)</option>
            <option value="citizen">Consumer / Public View</option>
          </select>
        </div>
      </div>
    </header>
  );
};
