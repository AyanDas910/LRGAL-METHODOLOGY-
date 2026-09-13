import React, { useState } from "react";
import { X, Scale, Search, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { MANDATORY_DECLARATIONS, FONT_SIZE_TABLE_1 } from "../data/legalMetrologyRules";

interface RulesReferenceModalProps {
  onClose: () => void;
}

export const RulesReferenceModal: React.FC<RulesReferenceModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState("");

  const filteredDeclarations = MANDATORY_DECLARATIONS.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.ruleCode.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.mandatoryRequirements.some((r) => r.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Legal Metrology (Packaged Commodities) Rules, 2011
              </h3>
              <p className="text-xs text-slate-400">
                Department of Consumer Affairs, Government of India — Statutory Enforcement Compendium
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

        {/* Search & Overview Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by rule clause, e.g., 'MRP', 'font size', 'consumer care'..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>

          <span className="text-xs text-slate-500 font-mono">
            Act No. 1 of 2010 | GSR 202(E)
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Table 1: Font Size Matrix */}
          <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                Table 1: Minimum Height of Numerals in Declaration of Net Quantity (Rule 7)
              </div>
              <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                Mandatory Statutory Schedule
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Under Rule 7(1), the height of any numeral in the declaration of net quantity on the principal display panel shall not be less than the minimum height specified in Table 1 below:
            </p>

            <div className="overflow-x-auto bg-white rounded-lg border border-amber-200">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-amber-100/70 text-slate-800 font-bold border-b border-amber-200">
                  <tr>
                    <th className="px-3.5 py-2">Area of Principal Display Panel (A)</th>
                    <th className="px-3.5 py-2">Standard Minimum Height</th>
                    <th className="px-3.5 py-2">Commodities &gt; 200g / 200ml</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 font-mono">
                  {FONT_SIZE_TABLE_1.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40">
                      <td className="px-3.5 py-2 font-medium text-slate-800">
                        {row.areaDescription}
                      </td>
                      <td className="px-3.5 py-2 font-bold text-indigo-700">
                        {row.minHeightNormalMm} mm
                      </td>
                      <td className="px-3.5 py-2 font-bold text-amber-800">
                        {row.minHeightAbove200gMm} mm
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rule 6 Mandatory Declarations */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Rule 6(1): Declarations to be Made on Every Package
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredDeclarations.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                    <span className="text-[10px] font-mono font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {item.ruleCode}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-800 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mandatory Requirements:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-600">
                      {item.mandatoryRequirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Penal Provisions: Section 36 & 48 */}
          <div className="bg-rose-50 rounded-xl p-5 border border-rose-200 space-y-2">
            <h4 className="font-bold text-xs text-rose-900 uppercase tracking-wider">
              Statutory Penal Consequences (Legal Metrology Act, 2009)
            </h4>
            <div className="space-y-2 text-[11px] text-slate-700 leading-relaxed">
              <p>
                <strong>Section 36(1): Penalty for selling, etc., of non-standard packages —</strong> Whoever manufactures, packs, imports, sells, distributes, delivers, offers, exposes or possesses for sale, any pre-packaged commodity which does not conform to the declarations on the package as provided under this Act, shall be punished with fine which may extend to <strong>twenty-five thousand rupees</strong>, for the second offence to <strong>fifty thousand rupees</strong> and for the subsequent offence, with fine which may extend to <strong>one lakh rupees</strong> or with imprisonment for a term which may extend to one year or with both.
              </p>
              <p>
                <strong>Section 48: Compounding of Offence —</strong> Any offence punishable under section 36 may, either before or after the institution of the prosecution, be compounded by a Director or Controller or such Legal Metrology Officer authorized on payment for credit to the Government.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Statutory Reference
          </button>
        </div>
      </div>
    </div>
  );
};
