import React, { useState } from "react";
import { X, Printer, Copy, Check, ShieldAlert, Download } from "lucide-react";
import { InspectionRecord } from "../types";

interface LegalNoticeModalProps {
  inspection: InspectionRecord;
  onClose: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ inspection, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [recipientCompany, setRecipientCompany] = useState(inspection.brandName + " Foods / Manufacturing Pvt Ltd");
  const [recipientAddress, setRecipientAddress] = useState(
    inspection.declarations.find((d) => d.ruleId === "RULE_6_1_A")?.extractedValue ||
      "Plot No. 12-14, Industrial Area, Noida, UP"
  );
  const [compoundingFee, setCompoundingFee] = useState(inspection.estimatedPenaltyInr || 25000);

  const noticeDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const violationsList = inspection.declarations.filter((d) => !d.isCompliant);

  const noticeContent = `
GOVERNMENT OF INDIA
MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION
DEPARTMENT OF CONSUMER AFFAIRS
OFFICE OF THE CONTROLLER OF LEGAL METROLOGY

FORM VII - SHOW CAUSE & STATUTORY COMPOUNDING NOTICE
(Issued under Section 36(1) read with Section 48 of the Legal Metrology Act, 2009)

NOTICE REF: DOCA/LMI/SCN/${inspection.id}
DATE OF ISSUE: ${noticeDate}

TO:
M/s ${recipientCompany}
${recipientAddress}

SUBJECT: NOTICE UNDER SECTION 36(1) OF THE LEGAL METROLOGY ACT, 2009 FOR CONTRAVENTION OF LEGAL METROLOGY (PACKAGED COMMODITIES) RULES, 2011 IN RESPECT OF COMMODITY: "${inspection.productName}".

1. Whereas, during market surveillance / statutory verification conducted at "${inspection.location}" on ${new Date(
    inspection.timestamp
  ).toLocaleDateString("en-IN")}, the undersigned Legal Metrology Inspector (${inspection.inspectorName}, Badge: ${
    inspection.inspectorBadge
  }) inspected the pre-packaged commodity bearing identification:
   - Product Description: ${inspection.productName}
   - Barcode / EAN: ${inspection.barcode || "N/A"}
   - Batch / Lot No: ${inspection.batchNumber || "N/A"}
   - Principal Display Panel (PDP) Area: ${inspection.pdpAreaCm2} cm²

2. Whereas, examination of the container / packaging revealed the following statutory violations:
${violationsList
  .map(
    (v, i) =>
      `   (${i + 1}) Contravention of ${v.legalSection}:
       Observed: ${v.extractedValue}
       Deficiency: ${v.remarks}`
  )
  .join("\n\n")}

3. Now therefore, you are hereby given notice that under Section 36(1) of the Legal Metrology Act, 2009:
   "Whoever manufactures, packs, imports, sells, distributes, delivers, offers, exposes or possesses for sale, any pre-packaged commodity which does not conform to the declarations on the package as provided under this Act, shall be punished with fine which may extend to twenty-five thousand rupees, for the second offence to fifty thousand rupees and for the subsequent offence, with fine which may extend to one lakh rupees or with imprisonment for a term which may extend to one year or with both."

4. In accordance with Section 48 of the Act, you are hereby offered an opportunity to compound the said offence by remitting the compounding fee of ₹ ${compoundingFee.toLocaleString(
    "en-IN"
  )}/- (Rupees ${compoundingFee === 25000 ? "Twenty Five Thousand" : "Fifty Thousand"} only) to the State Treasury within fifteen (15) days of the receipt of this notice.

5. Take further notice that in case of non-compliance or failure to show cause within the stipulated period, criminal prosecution shall be lodged before the designated Court of Judicial Magistrate under Section 36 of the Act.

SEAL OF THE CONTROLLER
Legal Metrology Enforcement Wing
Department of Consumer Affairs, Government of India
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide text-white">
                Statutory Compounding Show Cause Notice
              </h3>
              <p className="text-xs text-slate-400">
                Section 36(1) & 48, Legal Metrology Act, 2009
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

        {/* Action Toolbar */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Notice Ref:</span>
            <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
              DOCA/LMI/SCN/{inspection.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Notice Text"}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save Notice
            </button>
          </div>
        </div>

        {/* Form Body / Preview */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Recipient Company / Brand:
              </label>
              <input
                type="text"
                value={recipientCompany}
                onChange={(e) => setRecipientCompany(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Compounding Fine Amount (INR):
              </label>
              <input
                type="number"
                value={compoundingFee}
                onChange={(e) => setCompoundingFee(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Render Notice Layout */}
          <div className="bg-amber-50/40 p-6 rounded-xl border border-amber-200/80 font-mono text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap selection:bg-amber-200">
            {noticeContent}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500">
            Authorized by Ministry of Consumer Affairs, Legal Metrology Wing
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
