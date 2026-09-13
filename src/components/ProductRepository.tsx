import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { InspectionRecord } from "../types";
import { generateInspectionPdf } from "../utils/pdfGenerator";

interface ProductRepositoryProps {
  inspections: InspectionRecord[];
  onViewInspection: (record: InspectionRecord) => void;
}

export const ProductRepository: React.FC<ProductRepositoryProps> = ({
  inspections,
  onViewInspection,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "score-asc" | "score-desc">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filtering & Sorting
  const filteredRecords = useMemo(() => {
    return inspections
      .filter((item) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.productName.toLowerCase().includes(query) ||
          item.brandName.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          (item.barcode && item.barcode.includes(query)) ||
          item.location.toLowerCase().includes(query) ||
          item.inspectorName.toLowerCase().includes(query);

        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        const matchesStatus = selectedStatus === "all" || item.overallStatus === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        if (sortBy === "oldest") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        if (sortBy === "score-desc") return b.complianceScore - a.complianceScore;
        if (sortBy === "score-asc") return a.complianceScore - b.complianceScore;
        return 0;
      });
  }, [inspections, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Export repository CSV
  const handleExportAllCsv = () => {
    const headers = [
      "ID",
      "Timestamp",
      "Product Name",
      "Brand",
      "Category",
      "Barcode",
      "Location",
      "Inspector",
      "Status",
      "Score",
      "Violations Count",
      "Estimated Penalty (INR)",
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${r.productName.replace(/"/g, '""')}"`,
      `"${r.brandName.replace(/"/g, '""')}"`,
      `"${r.category}"`,
      `"${r.barcode || ""}"`,
      `"${r.location.replace(/"/g, '""')}"`,
      `"${r.inspectorName}"`,
      `"${r.overallStatus}"`,
      r.complianceScore,
      r.violationsCount,
      r.estimatedPenaltyInr,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `DoCA_Packaging_Repository_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Statutory Packaged Commodities Repository
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Central audit archive of scanned commodities, labels, and enforcement histories
          </p>
        </div>

        <button
          onClick={handleExportAllCsv}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          Export Repository (CSV)
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, brand, barcode (EAN), inspection ref, location..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Product Categories</option>
              <option value="Packaged Food">Packaged Food</option>
              <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
              <option value="Imported Commodity">Imported Commodity</option>
              <option value="Household Chemicals">Household Chemicals</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Compliance Statuses</option>
              <option value="Compliant">Compliant Only</option>
              <option value="Non-Compliant">Non-Compliant Only</option>
              <option value="Warning Issued">Warning Issued</option>
            </select>
          </div>
        </div>

        {/* View Toggle & Count */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">{filteredRecords.length}</strong> recorded commodities in central repository
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="newest">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="score-desc">Highest Score</option>
                <option value="score-asc">Lowest Score</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                }`}
              >
                Card View
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                  viewMode === "table" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecords.map((record) => {
            const isCompliant = record.overallStatus === "Compliant";
            const isWarning = record.overallStatus === "Warning Issued";

            return (
              <div
                key={record.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-5">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                      {record.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isCompliant
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : isWarning
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                      }`}
                    >
                      {isCompliant ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                      )}
                      {record.overallStatus}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2">
                    {record.productName}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Brand: <strong className="text-slate-700">{record.brandName}</strong>
                  </div>

                  {/* Metadata pills */}
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {record.category}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      PDP: {record.pdpAreaCm2} cm²
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">
                      Score: {record.complianceScore}%
                    </span>
                  </div>

                  {/* Findings Snippet */}
                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {record.summary}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500">
                    {new Date(record.timestamp).toLocaleDateString("en-IN")}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewInspection(record)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3 text-indigo-600" />
                      Audit
                    </button>
                    <button
                      onClick={() => generateInspectionPdf(record)}
                      className="p-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table Mode */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Ref ID & Date</th>
                  <th className="px-6 py-3.5">Product & Brand</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Score</th>
                  <th className="px-6 py-3.5">Violations</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-slate-900">
                      <div>{item.id}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {new Date(item.timestamp).toLocaleDateString("en-IN")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{item.productName}</div>
                      <div className="text-[11px] text-slate-500">Brand: {item.brandName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.overallStatus === "Compliant"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {item.overallStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-900">
                      {item.complianceScore}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.violationsCount === 0 ? (
                        <span className="text-emerald-700 font-medium">None</span>
                      ) : (
                        <span className="text-rose-600 font-bold">{item.violationsCount} items</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => onViewInspection(item)}
                        className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => generateInspectionPdf(item)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
