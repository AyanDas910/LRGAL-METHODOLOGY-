import React, { useState } from "react";
import { Ruler, CheckCircle2, AlertTriangle, Info, Calculator } from "lucide-react";
import { getMinimumRequiredFontSize } from "../data/legalMetrologyRules";

interface FontSizeCalculatorProps {
  onApplyPdpArea?: (width: number, height: number, area: number) => void;
}

export const FontSizeCalculator: React.FC<FontSizeCalculatorProps> = ({ onApplyPdpArea }) => {
  const [packageShape, setPackageShape] = useState<"rectangular" | "cylindrical">("rectangular");
  const [widthCm, setWidthCm] = useState<number>(12);
  const [heightCm, setHeightCm] = useState<number>(15);
  const [diameterCm, setDiameterCm] = useState<number>(6);
  const [cylinderHeightCm, setCylinderHeightCm] = useState<number>(14);
  const [measuredFontMm, setMeasuredFontMm] = useState<number>(2.2);
  const [isAbove200g, setIsAbove200g] = useState<boolean>(false);

  // Calculate PDP area based on Rule 2(h)
  const pdpArea = packageShape === "rectangular"
    ? Math.round(widthCm * heightCm * 10) / 10
    : Math.round(0.4 * Math.PI * diameterCm * cylinderHeightCm * 10) / 10;

  const minRequiredFont = getMinimumRequiredFontSize(pdpArea, isAbove200g);
  const isCompliant = measuredFontMm >= minRequiredFont;

  const handleApply = () => {
    if (onApplyPdpArea) {
      if (packageShape === "rectangular") {
        onApplyPdpArea(widthCm, heightCm, pdpArea);
      } else {
        onApplyPdpArea(diameterCm, cylinderHeightCm, pdpArea);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Rule 7 PDP & Font Size Analyzer
            </h3>
            <p className="text-xs text-slate-500">
              Statutory verification under Table 1, LMPC Rules 2011
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
          Rule 7 Table 1 Matrix
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Input parameters */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Packaging Shape / Geometry:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPackageShape("rectangular")}
                className={`py-1.5 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                  packageShape === "rectangular"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Rectangular / Pouch / Box
              </button>
              <button
                type="button"
                onClick={() => setPackageShape("cylindrical")}
                className={`py-1.5 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                  packageShape === "cylindrical"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Cylindrical / Bottle / Can
              </button>
            </div>
          </div>

          {packageShape === "rectangular" ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Width of PDP (cm):
                </label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  step="0.5"
                  value={widthCm}
                  onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Height of PDP (cm):
                </label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  step="0.5"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Diameter (cm):
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="0.5"
                  value={diameterCm}
                  onChange={(e) => setDiameterCm(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Cylinder Height (cm):
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.5"
                  value={cylinderHeightCm}
                  onChange={(e) => setCylinderHeightCm(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs text-slate-600 mb-1 font-medium">
                Measured Numeral Height (mm):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.5"
                  max="20"
                  step="0.1"
                  value={measuredFontMm}
                  onChange={(e) => setMeasuredFontMm(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
                <Ruler className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1 font-medium">
                Commodity Weight / Volume:
              </label>
              <div className="flex items-center gap-2 pt-1.5">
                <input
                  type="checkbox"
                  id="weightCheck"
                  checked={isAbove200g}
                  onChange={(e) => setIsAbove200g(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <label htmlFor="weightCheck" className="text-xs text-slate-700 cursor-pointer">
                  &gt; 200 g / 200 ml
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Statutory evaluation result */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Calculated PDP Area:</span>
              <span className="text-sm font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {pdpArea} cm²
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Statutory Min. Required Font:</span>
              <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {minRequiredFont} mm
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Current Measured Font:</span>
              <span className="text-sm font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {measuredFontMm} mm
              </span>
            </div>

            {/* Verdict Box */}
            <div
              className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                isCompliant
                  ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                  : "bg-rose-50/80 border-rose-200 text-rose-900"
              }`}
            >
              {isCompliant ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-xs">
                  {isCompliant
                    ? "Rule 7 Font Size: COMPLIANT"
                    : "Rule 7 Font Size: STATUTORY VIOLATION"}
                </div>
                <p className="text-[11px] mt-0.5 opacity-90 leading-relaxed">
                  {isCompliant
                    ? `Numeral height ${measuredFontMm} mm complies with Table 1 (requires minimum ${minRequiredFont} mm for PDP area of ${pdpArea} cm²).`
                    : `Numeral height ${measuredFontMm} mm is DEFICIENT by ${(minRequiredFont - measuredFontMm).toFixed(1)} mm. Liable to penalty under Section 36(1).`}
                </p>
              </div>
            </div>
          </div>

          {onApplyPdpArea && (
            <button
              type="button"
              onClick={handleApply}
              className="mt-3 w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              Apply this PDP ({pdpArea} cm²) to Active Scanner
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
