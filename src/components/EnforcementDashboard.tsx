import React, { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  Scale,
  DollarSign,
  Filter,
  Eye,
  Download,
  Building2,
  Calendar,
  Layers,
} from "lucide-react";
import { InspectionRecord } from "../types";
import { generateInspectionPdf } from "../utils/pdfGenerator";

interface EnforcementDashboardProps {
  inspections: InspectionRecord[];
  onViewInspection: (inspection: InspectionRecord) => void;
}

export const EnforcementDashboard: React.FC<EnforcementDashboardProps> = ({
  inspections,
  onViewInspection,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const totalInspections = inspections.length;
  const nonCompliantCount = inspections.filter((i) => i.overallStatus === "Non-Compliant").length;
  const warningCount = inspections.filter((i) => i.overallStatus === "Warning Issued").length;
  const compliantCount = inspections.filter((i) => i.overallStatus === "Compliant").length;

  const totalPenalty = inspections.reduce((acc, curr) => acc + (curr.estimatedPenaltyInr || 0), 0);
  const nonComplianceRate = totalInspections > 0 ? Math.round((nonCompliantCount / totalInspections) * 100) : 0;

  // Filtered recent inspections
  const filteredList = inspections.filter((item) => {
    const matchesCat = filterCategory === "all" || item.category === filterCategory;
    const matchesStat = filterStatus === "all" || item.overallStatus === filterStatus;
    return matchesCat && matchesStat;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              National Legal Metrology Enforcement Monitor
            </h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              Live Field Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time surveillance analytics under Legal Metrology Act, 2009 & Packaged Commodities Rules, 2011
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="flex items-center gap-2.5 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Packaged Food">Packaged Food</option>
              <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
              <option value="Imported Commodity">Imported Commodity</option>
              <option value="Household Chemicals">Household Chemicals</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Verdicts</option>
              <option value="Non-Compliant">Non-Compliant Only</option>
              <option value="Warning Issued">Warnings Only</option>
              <option value="Compliant">Compliant Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inspections */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Inspected Units</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalInspections}</span>
            <span className="text-xs text-slate-500">commodities</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Across retail, ports & e-commerce channels
          </div>
        </div>

        {/* Non-Compliance Rate */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs bg-gradient-to-br from-white to-rose-50/30">
          <div className="flex items-center justify-between text-rose-700 text-xs font-semibold">
            <span>Non-Compliance Rate</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600">{nonComplianceRate}%</span>
            <span className="text-xs text-rose-700 font-semibold">{nonCompliantCount} Violations</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Notice issued under Section 36(1)
          </div>
        </div>

        {/* Compliant Rate */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-gradient-to-br from-white to-emerald-50/30">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Fully Compliant Units</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">{compliantCount}</span>
            <span className="text-xs text-emerald-800 font-semibold">Passed</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            100% adherence to Rule 6 & Rule 7
          </div>
        </div>

        {/* Estimated Compounding Sum */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs bg-gradient-to-br from-white to-amber-50/30">
          <div className="flex items-center justify-between text-amber-800 text-xs font-semibold">
            <span>Compounding Penalties</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-xs font-bold text-amber-900">₹</span>
            <span className="text-3xl font-black text-amber-900">
              {(totalPenalty / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-amber-800">INR</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Under Section 48 statutory schedule
          </div>
        </div>
      </div>

      {/* Analytics Chart & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Top Violated Declarations breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Most Frequent Statutory Contraventions
              </h3>
              <p className="text-xs text-slate-500">
                Categorized by specific clauses under LMPC Rules, 2011
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">DoCA Q3 Audit</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {/* Rule 7 Font Size */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Rule 7 & Table 1: Numeral Font Size below prescribed minimum</span>
                <span className="text-rose-600 font-bold">42% of violations</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: "42%" }}></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Net Quantity numerals printed in &lt;2.5mm or &lt;3.0mm heights on large pouches.
              </p>
            </div>

            {/* Rule 6(1)(e) MRP & USP */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Rule 6(1)(e): Missing &apos;incl. of all taxes&apos; or omitted Unit Sale Price</span>
                <span className="text-amber-600 font-bold">29% of violations</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "29%" }}></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Omission of mandatory Unit Sale Price (USP in ₹/g or ₹/ml) mandated in 2021.
              </p>
            </div>

            {/* Rule 6(1)(n) Consumer Care */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Rule 6(1)(n): Deficient Consumer Grievance Contact (Missing phone/PIN)</span>
                <span className="text-indigo-600 font-bold">18% of violations</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "18%" }}></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Packages providing email only without mandatory telephonic helpline or postal address.
              </p>
            </div>

            {/* Rule 6(10) / Rule 27 Import rules */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Rule 6(10) & Rule 27: Imported goods without Indian Importer Sticker</span>
                <span className="text-purple-600 font-bold">11% of violations</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "11%" }}></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Port-of-entry shipments lacking statutory domestic importer registration number.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Regional / State Enforcement Performance (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                State Enforcement Surveillance
              </h3>
              <p className="text-xs text-slate-500">
                Inspections logged by State Legal Metrology Directorates
              </p>
            </div>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3 pt-1">
            {[
              { state: "Uttar Pradesh", inspections: 412, compliance: "76%", badge: "LMI-UP" },
              { state: "Maharashtra", inspections: 388, compliance: "81%", badge: "LMI-MH" },
              { state: "Delhi - NCR", inspections: 345, compliance: "72%", badge: "LMI-DEL" },
              { state: "Karnataka", inspections: 290, compliance: "88%", badge: "LMI-KA" },
              { state: "Gujarat", inspections: 274, compliance: "84%", badge: "LMI-GJ" },
            ].map((st, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{st.state}</div>
                  <div className="text-[11px] text-slate-500">{st.badge} Field Division</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-800">{st.inspections} Audits</div>
                  <div className="text-[11px] text-emerald-700 font-bold">{st.compliance} Compliance</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Inspections Feed Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Live Field Audit & Seizure Register
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredList.length} recorded packaged commodity audits
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            Legal Metrology Act, 2009 Register
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Reference & Date</th>
                <th className="px-6 py-3.5">Commodity & Brand</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Inspector Badge</th>
                <th className="px-6 py-3.5">LMPC Verdict</th>
                <th className="px-6 py-3.5">Score</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-900">{item.id}</div>
                    <div className="text-[11px] text-slate-500">
                      {new Date(item.timestamp).toLocaleDateString("en-IN")}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 max-w-xs truncate">{item.productName}</div>
                    <div className="text-[11px] text-slate-500">Brand: {item.brandName}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{item.inspectorName}</div>
                    <div className="text-[10px] font-mono text-slate-500">{item.inspectorBadge}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.overallStatus === "Compliant"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : item.overallStatus === "Warning Issued"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                      }`}
                    >
                      {item.overallStatus === "Compliant" ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                      )}
                      {item.overallStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900">{item.complianceScore}%</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => onViewInspection(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      View Audit
                    </button>
                    <button
                      onClick={() => generateInspectionPdf(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3 h-3" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
