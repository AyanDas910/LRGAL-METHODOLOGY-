import React from "react";
import {
  Cpu,
  Shield,
  Layers,
  Server,
  Code,
  Scale,
  GitBranch,
  Lock,
  Database,
  Eye,
  CheckCircle2,
  FileCode,
} from "lucide-react";

export const ArchitectureDoc: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          <Cpu className="w-3.5 h-3.5" />
          Technical Specification & Architecture Blueprint
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          System Architecture & Deployment Framework
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Technical design of the automated packaging compliance and label analysis system under Legal Metrology Act, 2009 & Packaged Commodities Rules, 2011 (DoCA).
        </p>
      </div>

      {/* High-Level Architecture Diagram */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            End-to-End System Pipeline Architecture
          </h3>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            v2.4 Production Specification
          </span>
        </div>

        {/* 4-Tier Visual Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Tier 1 */}
          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 space-y-2">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              Tier 1: Ingestion
            </div>
            <div className="font-bold text-slate-100 text-sm">Edge Capture & UI</div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>• HTML5 MediaStream Camera Capture</li>
              <li>• Multi-angle label drag & drop</li>
              <li>• Rule 7 PDP Geometry Calculator</li>
              <li>• Responsive mobile/desktop PWA UI</li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 space-y-2">
            <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
              Tier 2: Backend API
            </div>
            <div className="font-bold text-slate-100 text-sm">Express 4 Gateway</div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>• REST endpoints (/api/analyze-package)</li>
              <li>• High-throughput base64 payload handling</li>
              <li>• Server-side API key containment</li>
              <li>• Vite dev & production SPA middleware</li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 space-y-2">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Tier 3: Vision & NLP
            </div>
            <div className="font-bold text-slate-100 text-sm">Multimodal AI Vision</div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>• Google Gemini 3.8 Flash Engine</li>
              <li>• Structured JSON Schema extraction</li>
              <li>• Optical OCR & contrast analysis</li>
              <li>• Fallback rule-based deterministic parser</li>
            </ul>
          </div>

          {/* Tier 4 */}
          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 space-y-2">
            <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
              Tier 4: Statutory Logic
            </div>
            <div className="font-bold text-slate-100 text-sm">LMPC Rules Engine</div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>• Rule 6 Mandatory Declaration checks</li>
              <li>• Rule 7 Table 1 font size matrix</li>
              <li>• Sec 36 Show Cause Notice drafting</li>
              <li>• Sec 48 compounding fee calculator</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance Decision Tree & Flow */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <GitBranch className="w-4 h-4 text-indigo-600" />
          Statutory Verification Workflow & Decision Engine
        </h3>

        <div className="space-y-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              Package Ingestion & Principal Display Panel (PDP) Geometry
            </div>
            <p className="text-slate-600 mt-1 pl-7 leading-relaxed">
              Image input is uploaded or acquired via camera. If dimensions are supplied, PDP area (cm²) is calculated mathematically as per Rule 2(h) (rectangular: length × height; cylindrical: 40% of height × circumference).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                2
              </span>
              Multimodal Vision Extraction (Gemini 3.8 Flash)
            </div>
            <p className="text-slate-600 mt-1 pl-7 leading-relaxed">
              Server-side `@google/genai` calls `gemini-3.8-flash` with strict response schema. It scans text zones for: Manufacturer address, common name, Net quantity numeral, MRP clause, manufacturing date, consumer care phone/email, and country of origin.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                3
              </span>
              Rule-Based Statutory Compliance Audit
            </div>
            <p className="text-slate-600 mt-1 pl-7 leading-relaxed">
              Extracted values are tested against statutory rules:
              <br />• <strong>Rule 6(1)(a):</strong> Must contain complete postal address and 6-digit PIN code.
              <br />• <strong>Rule 7 & Table 1:</strong> Numeral height is verified against the statutory threshold for the calculated PDP area.
              <br />• <strong>Rule 6(1)(e):</strong> Must contain &quot;(inclusive of all taxes)&quot; and Unit Sale Price (₹/g or ₹/ml).
              <br />• <strong>Rule 6(1)(n):</strong> Mandatory 4-part consumer care contact (name, address, telephone, email).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                4
              </span>
              Enforcement Output Generation
            </div>
            <p className="text-slate-600 mt-1 pl-7 leading-relaxed">
              The engine assigns compliance verdict (Compliant / Non-Compliant / Warning). For non-compliant packages, it calculates statutory compounding sum under Section 48, generates Form VII Show Cause Notice, and enables instant PDF & CSV export.
            </p>
          </div>
        </div>
      </div>

      {/* Legal Metrology Act & Rule Mapping Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600" />
            Statutory Legal Metrology Mapping Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Direct correlation between Indian statutory provisions and software validation algorithms
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Statutory Provision</th>
                <th className="px-5 py-3">Mandated Declaration</th>
                <th className="px-5 py-3">Validation Rule Engine Logic</th>
                <th className="px-5 py-3">Penal Section</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">Rule 6(1)(a)</td>
                <td className="px-5 py-3">Manufacturer / Packer / Importer</td>
                <td className="px-5 py-3 text-slate-600">Regex & entity verification for street, city, state, and 6-digit postal PIN code.</td>
                <td className="px-5 py-3 text-rose-700 font-mono">Sec 36(1)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">Rule 6(1)(c) & Rule 12</td>
                <td className="px-5 py-3">Standard Net Quantity Unit</td>
                <td className="px-5 py-3 text-slate-600">Metric standard SI units only (g, kg, ml, l). Imperial units without metric flagged as violation.</td>
                <td className="px-5 py-3 text-rose-700 font-mono">Sec 30 & 36(1)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">Rule 7 & Table 1</td>
                <td className="px-5 py-3">Numeral Font Size Height</td>
                <td className="px-5 py-3 text-slate-600">Table 1 threshold lookup based on PDP area (&le;50cm²: 1.5mm; 50-100cm²: 2mm; 100-500cm²: 2.5/3mm; &gt;500cm²: 4/6mm).</td>
                <td className="px-5 py-3 text-rose-700 font-mono">Sec 36(1)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">Rule 6(1)(e) & 6(11)</td>
                <td className="px-5 py-3">MRP & Unit Sale Price (USP)</td>
                <td className="px-5 py-3 text-slate-600">Verification of &quot;(inclusive of all taxes)&quot; clause and ₹/g or ₹/ml Unit Sale Price on packages &gt; 100g/ml.</td>
                <td className="px-5 py-3 text-rose-700 font-mono">Sec 18(2) & 36(1)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">Rule 6(1)(n)</td>
                <td className="px-5 py-3">Consumer Grievance Care</td>
                <td className="px-5 py-3 text-slate-600">Checks presence of all 4 attributes: Name/Designation, Postal Address, Active Telephone, and Email ID.</td>
                <td className="px-5 py-3 text-rose-700 font-mono">Sec 36(1)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">Rule 6(10) & Rule 27</td>
                <td className="px-5 py-3">Country of Origin & Importer Registration</td>
                <td className="px-5 py-3 text-slate-600">Mandatory for all imported items and e-commerce listings before clearance or sale.</td>
                <td className="px-5 py-3 text-rose-700 font-mono">Sec 15 & 36(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Security & Deployment Framework */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Lock className="w-4 h-4 text-emerald-600" />
          Deployment Framework & Security Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-indigo-600" />
              Cloud Run Microservice
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Stateless Node.js container listening strictly on port 3000 behind reverse proxy. Automatically scales on inspection demand.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Secret & Key Isolation
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Gemini API keys and credentials are kept exclusively server-side in `process.env.GEMINI_API_KEY`. Zero browser bundle exposure.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-600" />
              Evidence & Audit Integrity
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Each inspection record generates an immutable UUID with timestamp, badge number, optical image hash, and statutory citation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
