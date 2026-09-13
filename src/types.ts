export type UserRole = "inspector" | "controller" | "director" | "citizen";

export type ComplianceSeverity = "none" | "minor" | "major" | "critical";

export type InspectionStatus = "Compliant" | "Non-Compliant" | "Warning Issued";

export interface DeclarationItem {
  ruleId: string;
  title: string;
  extractedValue: string;
  requiredFormat: string;
  isCompliant: boolean;
  severity: ComplianceSeverity;
  remarks: string;
  legalSection: string;
  fontSizeMm?: number;
  minRequiredFontMm?: number;
  confidenceScore?: number; // 0-100
}

export interface InspectionRecord {
  id: string;
  timestamp: string;
  productName: string;
  brandName: string;
  category: string;
  barcode?: string;
  batchNumber?: string;
  location: string;
  inspectorName: string;
  inspectorBadge: string;
  inspectionType: "Market Surveillance" | "Port of Entry" | "Retail Store" | "E-commerce Listing" | "Consumer Complaint";
  overallStatus: InspectionStatus;
  complianceScore: number; // 0-100
  pdpAreaCm2: number;
  declarations: DeclarationItem[];
  violationsCount: number;
  summary: string;
  recommendedAction: string;
  estimatedPenaltyInr: number;
  imageUrl?: string;
  additionalImages?: string[];
  evidenceNotes?: string;
}

export interface SamplePackage {
  id: string;
  name: string;
  brand: string;
  category: string;
  pdpWidthCm: number;
  pdpHeightCm: number;
  pdpAreaCm2: number;
  tag: string;
  expectedStatus: InspectionStatus;
  description: string;
  imageUrl: string;
  barcode: string;
  defaultDeclarations: DeclarationItem[];
  summary: string;
  penaltyInr: number;
}
