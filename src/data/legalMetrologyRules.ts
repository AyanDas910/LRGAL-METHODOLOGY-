export interface RuleDefinition {
  id: string;
  ruleCode: string;
  actOrRule: string;
  title: string;
  category: string;
  description: string;
  mandatoryRequirements: string[];
  exemptions?: string[];
  penaltyProvision: string;
  firstOffencePenalty: string;
  subsequentOffencePenalty: string;
}

export const LEGAL_METROLOGY_RULES: RuleDefinition[] = [
  {
    id: "RULE_6_1_A",
    ruleCode: "Rule 6(1)(a)",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Manufacturer, Packer or Importer Identity & Address",
    category: "Identity & Traceability",
    description: "Every package shall bear the name and complete address of the manufacturer, or where the manufacturer is not the packer, the name and complete address of the manufacturer and packer, or for imported goods, the manufacturer and the importer.",
    mandatoryRequirements: [
      "Complete postal address including street, city, state, and 6-digit postal PIN code",
      "Prefix 'Manufactured by' or 'Mfd. by', 'Packed by' or 'Pkd. by', or 'Imported by' or 'Imp. by'",
      "In case of imported goods, the Indian Importer's name, registered address and registration number under Rule 27",
    ],
    penaltyProvision: "Section 36(1) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 (2nd offence) and up to ₹ 1,00,000 or imprisonment up to 1 year or both for subsequent offences",
  },
  {
    id: "RULE_6_1_B",
    ruleCode: "Rule 6(1)(b)",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Generic or Common Name of Commodity",
    category: "Product Identification",
    description: "The common or generic names of the commodity contained in the package and in case of packages with more than one product, the name and quantity of each product.",
    mandatoryRequirements: [
      "Unambiguous generic denomination (e.g. 'Potato Chips', 'Refined Sunflower Oil', 'Detergent Powder')",
      "Prominently displayed on the Principal Display Panel (PDP)",
      "Cannot be misleading or disguised behind fanciful trademark names alone",
    ],
    penaltyProvision: "Section 36(1) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
  {
    id: "RULE_6_1_C",
    ruleCode: "Rule 6(1)(c) & Rule 12",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Net Quantity Declaration in Standard SI Units",
    category: "Quantity Verification",
    description: "Net quantity in terms of the standard unit of weight or measure (metric system) or number. Must be declared conspicuously in the prescribed size and manner.",
    mandatoryRequirements: [
      "Standard units only: g, kg for mass; ml, l for volume; m, cm, mm for length; or numbers (N / U)",
      "Non-metric units (lbs, oz, pints, gallons) strictly prohibited unless accompanied by primary metric declaration",
      "No qualify words like 'approx', 'when packed', 'net wt. approx'",
      "Font height must satisfy Table 1 under Rule 7 based on Principal Display Panel area",
    ],
    penaltyProvision: "Section 36(1) & Section 30 of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
  {
    id: "RULE_7_TABLE_1",
    ruleCode: "Rule 7 & Table 1",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Minimum Height of Numerals & Letters (Font Size)",
    category: "Typography & Legibility",
    description: "Statutory matrix prescribing minimum height of numerals and letters for net quantity and mandatory declarations based on the area of the Principal Display Panel (PDP).",
    mandatoryRequirements: [
      "Area of PDP ≤ 50 cm²: Min height 1.0 mm (weight ≤ 200g/ml) or 1.5 mm (weight > 200g/ml)",
      "50 cm² < PDP ≤ 100 cm²: Min height 1.5 mm (weight ≤ 200g/ml) or 2.0 mm (weight > 200g/ml)",
      "100 cm² < PDP ≤ 500 cm²: Min height 2.5 mm (weight ≤ 200g/ml) or 3.0 mm (weight > 200g/ml)",
      "500 cm² < PDP ≤ 2500 cm²: Min height 4.0 mm (weight ≤ 200g/ml) or 6.0 mm (weight > 200g/ml)",
      "PDP > 2500 cm²: Min height 6.0 mm (all packages)",
    ],
    penaltyProvision: "Section 36(1) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
  {
    id: "RULE_6_1_E",
    ruleCode: "Rule 6(1)(e) & Rule 6(11)",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Maximum Retail Price (MRP) & Unit Sale Price",
    category: "Pricing Transparency",
    description: "Maximum retail price at which the commodity in packaged form may be sold to the consumer. Must clearly state that it is inclusive of all taxes. 2021 amendment requires declaration of Unit Sale Price (USP).",
    mandatoryRequirements: [
      "Format: 'Maximum Retail Price ₹ ... (inclusive of all taxes)' or 'MRP ₹ ... (incl. of all taxes)'",
      "Indian Rupee symbol (₹) mandatory",
      "Unit Sale Price (USP) in terms of ₹ per g/kg (for solid goods) or ₹ per ml/L (for liquids) or ₹ per piece",
      "Dual MRPs, smudged price stamps, or post-dated stickers without authorized sanction are severe violations",
    ],
    penaltyProvision: "Section 36(1) read with Section 18(2) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
  {
    id: "RULE_6_1_D",
    ruleCode: "Rule 6(1)(d)",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Month and Year of Manufacture / Packing / Import",
    category: "Freshness & Traceability",
    description: "The month and year in which the commodity is manufactured or pre-packed or imported shall be mentioned clearly.",
    mandatoryRequirements: [
      "Format: MM/YYYY or Month and Year (e.g. 09/2026 or Sept 2026)",
      "Post-dating manufacturing date is considered fraudulent and liable to penal seizure",
      "Best before or Use by date required for perishable products under FSSAI / Drugs & Cosmetics alignment",
    ],
    penaltyProvision: "Section 36(1) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
  {
    id: "RULE_6_1_N",
    ruleCode: "Rule 6(1)(n)",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Consumer Care & Grievance Redressal Mechanism",
    category: "Consumer Rights",
    description: "Name, address, telephone number and e-mail address of the person who can be or the office which can be contacted in case of consumer complaints.",
    mandatoryRequirements: [
      "Name and/or Designation of Grievance Redressal Officer",
      "Complete physical postal address with PIN code",
      "Active telephone number (Toll-free or standard landline/mobile)",
      "Functional official email ID for consumer care",
    ],
    penaltyProvision: "Section 36(1) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
  {
    id: "RULE_6_10",
    ruleCode: "Rule 6(10)",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Country of Origin / Manufacturing Origin",
    category: "Trade Transparency",
    description: "Mandatory declaration of the name of the country of origin or manufacture or assembly in case of imported products, and for all products sold on e-commerce marketplaces.",
    mandatoryRequirements: [
      "Clear declaration 'Country of Origin: [Name of Country]'",
      "Cannot disguise country of origin under vague geographic references",
      "E-commerce platforms must display country of origin on digital product detail pages prior to purchase",
    ],
    penaltyProvision: "Section 36(1) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
  {
    id: "RULE_9",
    ruleCode: "Rule 9(1) & 9(2)",
    actOrRule: "Legal Metrology (Packaged Commodities) Rules, 2011",
    title: "Manner, Placement & Conspicuousness of Declarations",
    category: "Legibility & Presentation",
    description: "Every declaration shall be conspicuous, legible, and clearly printed in contrasting color against the background.",
    mandatoryRequirements: [
      "High optical contrast between text and wrapper/package background",
      "Placed prominently on the Principal Display Panel (PDP) or designated declaration panel",
      "Must not be obscured by graphics, folds, perforations or seals",
    ],
    penaltyProvision: "Section 36(1) of Legal Metrology Act, 2009",
    firstOffencePenalty: "Fine up to ₹ 25,000",
    subsequentOffencePenalty: "Fine up to ₹ 50,000 / ₹ 1,00,000",
  },
];

export const MANDATORY_DECLARATIONS = LEGAL_METROLOGY_RULES;

export interface FontSizeTableRow {
  areaDescription: string;
  maxAreaCm2: number;
  minHeightNormalMm: number;
  minHeightAbove200gMm: number;
}

export const FONT_SIZE_TABLE_1: FontSizeTableRow[] = [
  { areaDescription: "A ≤ 50 cm²", maxAreaCm2: 50, minHeightNormalMm: 1.0, minHeightAbove200gMm: 1.5 },
  { areaDescription: "50 cm² < A ≤ 100 cm²", maxAreaCm2: 100, minHeightNormalMm: 1.5, minHeightAbove200gMm: 2.0 },
  { areaDescription: "100 cm² < A ≤ 500 cm²", maxAreaCm2: 500, minHeightNormalMm: 2.5, minHeightAbove200gMm: 3.0 },
  { areaDescription: "500 cm² < A ≤ 2500 cm²", maxAreaCm2: 2500, minHeightNormalMm: 4.0, minHeightAbove200gMm: 6.0 },
  { areaDescription: "A > 2500 cm²", maxAreaCm2: 99999, minHeightNormalMm: 6.0, minHeightAbove200gMm: 6.0 },
];

// Helper to determine minimum font size for given PDP area
export function getMinimumRequiredFontSize(pdpAreaCm2: number, isAbove200g: boolean = true): number {
  if (pdpAreaCm2 <= 50) {
    return isAbove200g ? 1.5 : 1.0;
  } else if (pdpAreaCm2 <= 100) {
    return isAbove200g ? 2.0 : 1.5;
  } else if (pdpAreaCm2 <= 500) {
    return isAbove200g ? 3.0 : 2.5;
  } else if (pdpAreaCm2 <= 2500) {
    return isAbove200g ? 6.0 : 4.0;
  } else {
    return 6.0;
  }
}
