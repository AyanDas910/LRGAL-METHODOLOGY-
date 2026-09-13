import { SamplePackage, InspectionRecord } from "../types";

export const SAMPLE_PACKAGES: SamplePackage[] = [
  {
    id: "sample-food-chips",
    name: "Crispy Delight Potato Chips (Tangy Tomato)",
    brand: "Royal Munch",
    category: "Packaged Food",
    pdpWidthCm: 12,
    pdpHeightCm: 15,
    pdpAreaCm2: 180,
    tag: "Font Size & MRP Clause Violations",
    expectedStatus: "Non-Compliant",
    description: "Retail snack pouch featuring sub-statutory net quantity font size (1.8mm vs required 2.5mm) and omitted '(inclusive of all taxes)' on MRP.",
    barcode: "8901234567890",
    summary: "Multiple non-compliances identified: sub-statutory numeral font size under Rule 7 Table 1, missing statutory tax clause on MRP under Rule 6(1)(e), and missing PIN code.",
    penaltyInr: 25000,
    imageUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <defs>
          <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#dc2626" />
            <stop offset="60%" stop-color="#b91c1c" />
            <stop offset="100%" stop-color="#991b1b" />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="2" dy="5" stdDeviation="6" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="400" height="500" fill="#f8fafc"/>
        <g filter="url(#shadow)">
          <path d="M 60 40 Q 200 20 340 40 L 325 450 Q 200 470 75 450 Z" fill="url(#bagGrad)"/>
          <line x1="60" y1="50" x2="340" y2="50" stroke="#fca5a5" stroke-dasharray="4 2" stroke-width="2"/>
          <line x1="75" y1="440" x2="325" y2="440" stroke="#fca5a5" stroke-dasharray="4 2" stroke-width="2"/>
          
          <rect x="110" y="80" width="180" height="42" rx="6" fill="#fef08a" opacity="0.9"/>
          <text x="200" y="108" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="900" text-anchor="middle" fill="#991b1b">ROYAL MUNCH</text>
          
          <text x="200" y="155" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle" fill="#ffffff">CRISPY DELIGHT</text>
          <text x="200" y="175" font-family="sans-serif" font-size="13" font-weight="600" text-anchor="middle" fill="#fde047">POTATO WAFERS - TANGY TOMATO</text>
          
          <circle cx="200" cy="245" r="55" fill="#ea580c" opacity="0.8"/>
          <text x="200" y="252" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">POTATO CHIPS</text>

          <!-- Label Box with Violations -->
          <rect x="90" y="320" width="220" height="110" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="100" y="338" font-family="sans-serif" font-size="9" fill="#1e293b" font-weight="bold">Net Wt.: 85 g</text>
          <text x="180" y="338" font-family="sans-serif" font-size="8" fill="#dc2626" font-weight="bold">[Font: 1.8mm (FAIL)]</text>
          <text x="100" y="354" font-family="sans-serif" font-size="9" fill="#1e293b">MRP Rs 40.00</text>
          <text x="180" y="354" font-family="sans-serif" font-size="8" fill="#dc2626">[No 'incl. taxes']</text>
          <text x="100" y="370" font-family="sans-serif" font-size="8" fill="#475569">Mfd: 08/2026 | Batch: B-883A</text>
          <text x="100" y="386" font-family="sans-serif" font-size="8" fill="#475569">Mfd by: Royal Munch Foods, GIDC, Guj.</text>
          <text x="100" y="400" font-family="sans-serif" font-size="8" fill="#dc2626">[Missing PIN & Street]</text>
          <text x="100" y="416" font-family="sans-serif" font-size="7.5" fill="#475569">Care: care@royalmunch.com [No Tel]</text>
        </g>
      </svg>
    `),
    defaultDeclarations: [
      {
        ruleId: "RULE_6_1_A",
        title: "Manufacturer & Packer Address",
        extractedValue: "Mfd by Royal Munch Foods, Plot 14, GIDC Industrial Estate, Gujarat (No PIN code)",
        requiredFormat: "Full postal address with city, state, and 6-digit postal PIN code",
        isCompliant: false,
        severity: "major",
        remarks: "Postal PIN code is absent. Non-compliant under Rule 6(1)(a).",
        legalSection: "Rule 6(1)(a) read with Section 36(1) of LM Act 2009",
      },
      {
        ruleId: "RULE_6_1_B",
        title: "Generic / Common Name",
        extractedValue: "Potato Wafers / Chips",
        requiredFormat: "Common or generic name of commodity",
        isCompliant: true,
        severity: "none",
        remarks: "Clearly stated on Principal Display Panel.",
        legalSection: "Rule 6(1)(b)",
      },
      {
        ruleId: "RULE_6_1_C",
        title: "Net Quantity & Font Size",
        extractedValue: "Net Wt. 85 g (Detected font height: 1.8 mm)",
        requiredFormat: "Standard SI unit, minimum numeral font height 2.5 mm for PDP 180 cm²",
        isCompliant: false,
        severity: "critical",
        remarks: "Numeral height 1.8 mm violates statutory requirement of 2.5 mm under Rule 7 Table 1 for PDP 180 cm².",
        legalSection: "Rule 7(1) & Table 1 read with Rule 12",
        fontSizeMm: 1.8,
        minRequiredFontMm: 2.5,
      },
      {
        ruleId: "RULE_6_1_E",
        title: "MRP Declaration & Unit Sale Price",
        extractedValue: "MRP Rs 40.00 (Missing statutory tax clause & Unit Sale Price)",
        requiredFormat: "MRP ₹ ... (inclusive of all taxes) and Unit Sale Price: ₹ 0.47/g",
        isCompliant: false,
        severity: "major",
        remarks: "Omits mandatory phrase '(inclusive of all taxes)'. Unit Sale Price missing.",
        legalSection: "Rule 6(1)(e) & Rule 6(11)",
      },
      {
        ruleId: "RULE_6_1_D",
        title: "Date of Manufacture / Packing",
        extractedValue: "Mfd: 08/2026",
        requiredFormat: "Month and Year format",
        isCompliant: true,
        severity: "none",
        remarks: "Clearly legible.",
        legalSection: "Rule 6(1)(d)",
      },
      {
        ruleId: "RULE_6_1_N",
        title: "Consumer Care Details",
        extractedValue: "Email: care@royalmunch.com (No postal address or phone number)",
        requiredFormat: "Designation, address, active phone number, email address",
        isCompliant: false,
        severity: "major",
        remarks: "Lacks telephone number and grievance officer designation.",
        legalSection: "Rule 6(1)(n)",
      },
      {
        ruleId: "RULE_6_10",
        title: "Country of Origin",
        extractedValue: "Country of Origin: India",
        requiredFormat: "Country of origin clearly stated",
        isCompliant: true,
        severity: "none",
        remarks: "Present on back.",
        legalSection: "Rule 6(10)",
      },
    ],
  },
  {
    id: "sample-cosmetics-cleanser",
    name: "Herbal Glow Face Cleanser 200ml",
    brand: "Aura Botanics",
    category: "Cosmetics & Personal Care",
    pdpWidthCm: 10,
    pdpHeightCm: 12.5,
    pdpAreaCm2: 125,
    tag: "100% Fully Compliant Benchmark",
    expectedStatus: "Compliant",
    description: "Benchmark compliant cosmetic tube with complete statutory declarations, accurate Unit Sale Price, and verified 3.2mm font size.",
    barcode: "8906001234567",
    summary: "Exemplary compliance. All mandatory declarations under Rule 6, Rule 7, Rule 9, and Rule 12 verified. Font size exceeds 2.5mm minimum.",
    penaltyInr: 0,
    imageUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <defs>
          <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#059669" />
            <stop offset="50%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="#f8fafc"/>
        <g>
          <!-- Tube Body -->
          <path d="M 120 70 L 280 70 L 260 410 L 140 410 Z" fill="url(#tubeGrad)" rx="8"/>
          <!-- Cap -->
          <rect x="150" y="410" width="100" height="35" rx="5" fill="#e2e8f0" stroke="#cbd5e1"/>
          
          <text x="200" y="120" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#ffffff">AURA BOTANICS</text>
          <text x="200" y="145" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" fill="#ecfdf5">HERBAL GLOW</text>
          <text x="200" y="165" font-family="sans-serif" font-size="11" font-weight="500" text-anchor="middle" fill="#a7f3d0">FACIAL CLEANSER GEL</text>
          
          <!-- Green Compliant Badge -->
          <circle cx="200" cy="225" r="35" fill="#ffffff" opacity="0.95"/>
          <text x="200" y="222" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#047857">100%</text>
          <text x="200" y="235" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#047857">COMPLIANT</text>
          
          <!-- Mandatory Declarations Back Card -->
          <rect x="135" y="275" width="130" height="120" rx="4" fill="#ffffff" opacity="0.95"/>
          <text x="142" y="292" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#0f172a">Net Qty: 200 ml</text>
          <text x="142" y="306" font-family="sans-serif" font-size="7.5" fill="#15803d">Font: 3.2mm (OK > 2.5mm)</text>
          <text x="142" y="322" font-family="sans-serif" font-size="7.5" fill="#0f172a">MRP ₹ 299.00</text>
          <text x="142" y="334" font-family="sans-serif" font-size="6.5" fill="#475569">(incl. of all taxes)</text>
          <text x="142" y="347" font-family="sans-serif" font-size="6.5" fill="#0f172a">USP: ₹ 1.495 / ml</text>
          <text x="142" y="360" font-family="sans-serif" font-size="6.5" fill="#0f172a">Mfg: 09/2026 | Exp: 08/2028</text>
          <text x="142" y="373" font-family="sans-serif" font-size="6.5" fill="#0f172a">Origin: India | PIN 560058</text>
          <text x="142" y="386" font-family="sans-serif" font-size="6" fill="#047857">Care: 1800-425-9988</text>
        </g>
      </svg>
    `),
    defaultDeclarations: [
      {
        ruleId: "RULE_6_1_A",
        title: "Manufacturer & Packer Address",
        extractedValue: "Mfd & Pkd by: Aura Botanics India Pvt Ltd, Shed 4A, Peenya Industrial Area, Bengaluru, Karnataka - 560058",
        requiredFormat: "Full postal address with PIN code",
        isCompliant: true,
        severity: "none",
        remarks: "Complete postal address with 6-digit PIN code.",
        legalSection: "Rule 6(1)(a)",
      },
      {
        ruleId: "RULE_6_1_B",
        title: "Generic Name",
        extractedValue: "Facial Cleanser Gel",
        requiredFormat: "Generic name",
        isCompliant: true,
        severity: "none",
        remarks: "Prominently displayed.",
        legalSection: "Rule 6(1)(b)",
      },
      {
        ruleId: "RULE_6_1_C",
        title: "Net Quantity & Font Size",
        extractedValue: "Net Quantity: 200 ml (Font height 3.2 mm)",
        requiredFormat: "Standard unit 'ml', min 2.5 mm font height",
        isCompliant: true,
        severity: "none",
        remarks: "Exceeds required statutory minimum of 2.5 mm under Rule 7 Table 1.",
        legalSection: "Rule 7(1) & Table 1",
        fontSizeMm: 3.2,
        minRequiredFontMm: 2.5,
      },
      {
        ruleId: "RULE_6_1_E",
        title: "MRP & Unit Sale Price",
        extractedValue: "MRP ₹ 299.00 (inclusive of all taxes) | Unit Sale Price: ₹ 1.495 / ml",
        requiredFormat: "MRP with taxes and USP",
        isCompliant: true,
        severity: "none",
        remarks: "Complies with both statutory tax phrase and Unit Sale Price requirement.",
        legalSection: "Rule 6(1)(e) & 6(11)",
      },
      {
        ruleId: "RULE_6_1_D",
        title: "Date of Manufacture",
        extractedValue: "Mfg. Date: 09/2026 | Use Before: 08/2028",
        requiredFormat: "MM/YYYY format",
        isCompliant: true,
        severity: "none",
        remarks: "Clearly stamped.",
        legalSection: "Rule 6(1)(d)",
      },
      {
        ruleId: "RULE_6_1_N",
        title: "Consumer Care Details",
        extractedValue: "Grievance Officer: Ms. R. Nambiar, Aura Botanics, Peenya Bengaluru - 560058, Tel: 1800-425-9988, Email: care@aurabotanics.in",
        requiredFormat: "Full contact suite",
        isCompliant: true,
        severity: "none",
        remarks: "All 4 statutory contact attributes present.",
        legalSection: "Rule 6(1)(n)",
      },
      {
        ruleId: "RULE_6_10",
        title: "Country of Origin",
        extractedValue: "Country of Origin: India",
        requiredFormat: "Country of origin clearly stated",
        isCompliant: true,
        severity: "none",
        remarks: "Compliant.",
        legalSection: "Rule 6(10)",
      },
    ],
  },
  {
    id: "sample-imported-coffee",
    name: "Premium Arabica Coffee Beans 250g (Imported)",
    brand: "Milano Roast",
    category: "Imported Commodity",
    pdpWidthCm: 14,
    pdpHeightCm: 15,
    pdpAreaCm2: 210,
    tag: "Critical Port of Entry Violation",
    expectedStatus: "Non-Compliant",
    description: "Imported retail package missing Indian Importer Registration sticker, missing statutory MRP in INR, and lacking Indian consumer grievance redressal.",
    barcode: "8001234987654",
    summary: "Seizure / Detention candidate under Section 15 of LM Act, 2009. Critical omissions of Indian Importer details, MRP in INR with taxes, and local grievance cell.",
    penaltyInr: 50000,
    imageUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <defs>
          <linearGradient id="coffeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b1d11" />
            <stop offset="100%" stop-color="#1f0e08" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="#f8fafc"/>
        <!-- Coffee Bag -->
        <path d="M 90 60 L 310 60 L 320 440 L 80 440 Z" fill="url(#coffeeGrad)" rx="6"/>
        <rect x="110" y="80" width="180" height="30" fill="#d97706" rx="3"/>
        <text x="200" y="102" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#fff">MILANO ROAST</text>
        <text x="200" y="145" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" fill="#fef3c7">100% ARABICA COFFEE</text>
        <text x="200" y="170" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#f59e0b">PRODUCT OF ITALY</text>
        
        <!-- Red Alert Label -->
        <rect x="100" y="240" width="200" height="170" fill="#450a0a" stroke="#ef4444" stroke-width="2" rx="6"/>
        <text x="200" y="265" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#fca5a5">CRITICAL IMPORT VIOLATION</text>
        <text x="110" y="290" font-family="sans-serif" font-size="9" fill="#f87171">• Missing Indian Importer Details</text>
        <text x="110" y="310" font-family="sans-serif" font-size="9" fill="#f87171">• Rule 27 Registration Missing</text>
        <text x="110" y="330" font-family="sans-serif" font-size="9" fill="#f87171">• No MRP in INR printed</text>
        <text x="110" y="350" font-family="sans-serif" font-size="9" fill="#f87171">• No Indian Consumer Care</text>
        <text x="110" y="375" font-family="sans-serif" font-size="9" fill="#94a3b8">Net Wt. 8.8 oz / 250 g</text>
        <text x="110" y="395" font-family="sans-serif" font-size="9" fill="#facc15">Penalty: ₹ 50,000 + Detention</text>
      </svg>
    `),
    defaultDeclarations: [
      {
        ruleId: "RULE_6_1_A",
        title: "Importer Details & Registration",
        extractedValue: "Packed in Italy. (No Indian Importer sticker or Rule 27 registration found)",
        requiredFormat: "Name, address & registration of Indian Importer",
        isCompliant: false,
        severity: "critical",
        remarks: "Critical breach: No Indian importer name or address on package prior to retail offering.",
        legalSection: "Rule 6(1)(a) & Rule 27",
      },
      {
        ruleId: "RULE_6_1_B",
        title: "Generic Name",
        extractedValue: "Roasted Coffee Beans",
        requiredFormat: "Generic name",
        isCompliant: true,
        severity: "none",
        remarks: "Clear.",
        legalSection: "Rule 6(1)(b)",
      },
      {
        ruleId: "RULE_6_1_C",
        title: "Net Quantity",
        extractedValue: "Net Wt. 8.8 oz / 250 g",
        requiredFormat: "Standard metric unit primary",
        isCompliant: true,
        severity: "none",
        remarks: "Contains metric declaration 250 g.",
        legalSection: "Rule 12",
        fontSizeMm: 2.8,
        minRequiredFontMm: 2.5,
      },
      {
        ruleId: "RULE_6_1_E",
        title: "MRP Declaration",
        extractedValue: "No Indian MRP or Unit Sale Price sticker",
        requiredFormat: "MRP ₹ ... (inclusive of all taxes)",
        isCompliant: false,
        severity: "critical",
        remarks: "MRP absent entirely on packaging.",
        legalSection: "Rule 6(1)(e) & Section 36(1)",
      },
      {
        ruleId: "RULE_6_1_N",
        title: "Consumer Care Details",
        extractedValue: "Italian manufacturer contact only",
        requiredFormat: "Indian consumer grievance redressal cell",
        isCompliant: false,
        severity: "major",
        remarks: "No Indian consumer care mechanism provided.",
        legalSection: "Rule 6(1)(n)",
      },
      {
        ruleId: "RULE_6_10",
        title: "Country of Origin",
        extractedValue: "Product of Italy",
        requiredFormat: "Country of origin",
        isCompliant: true,
        severity: "none",
        remarks: "Origin declared.",
        legalSection: "Rule 6(10)",
      },
    ],
  },
  {
    id: "sample-detergent-powder",
    name: "Ultra Clean Detergent Powder 1 kg",
    brand: "Sparkle Wash",
    category: "Household Chemicals",
    pdpWidthCm: 18,
    pdpHeightCm: 25,
    pdpAreaCm2: 450,
    tag: "Missing USP & Incomplete Grievance Redressal",
    expectedStatus: "Non-Compliant",
    description: "1 kg detergent pouch lacking statutory Unit Sale Price (USP per kg) and missing consumer care telephone helpline.",
    barcode: "8902233445566",
    summary: "Non-compliant: Unit Sale Price (USP) omitted contrary to Rule 6(11) amendment; consumer care contact lacks mandatory telephone number.",
    penaltyInr: 25000,
    imageUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <defs>
          <linearGradient id="detGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1d4ed8" />
            <stop offset="100%" stop-color="#1e3a8a" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="#f8fafc"/>
        <path d="M 80 50 L 320 50 L 305 450 L 95 450 Z" fill="url(#detGrad)" rx="8"/>
        <text x="200" y="110" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="900" text-anchor="middle" fill="#ffffff">SPARKLE WASH</text>
        <text x="200" y="140" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" fill="#93c5fd">ULTRA CLEAN DETERGENT</text>
        
        <circle cx="200" cy="220" r="45" fill="#facc15"/>
        <text x="200" y="215" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1e3a8a">NET WT.</text>
        <text x="200" y="235" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#1e3a8a">1 kg</text>
        
        <rect x="105" y="295" width="190" height="120" fill="#ffffff" rx="4"/>
        <text x="115" y="320" font-family="sans-serif" font-size="9" font-weight="bold" fill="#0f172a">MRP ₹ 160.00 (incl. taxes)</text>
        <text x="115" y="338" font-family="sans-serif" font-size="8" fill="#dc2626">• Missing Unit Sale Price (USP)</text>
        <text x="115" y="356" font-family="sans-serif" font-size="8" fill="#0f172a">Mfd: Sparkle Chem, Vapi, Guj - 396195</text>
        <text x="115" y="374" font-family="sans-serif" font-size="8" fill="#0f172a">Pkd: 07/2026</text>
        <text x="115" y="392" font-family="sans-serif" font-size="8" fill="#dc2626">• Care: complaints@sparkle.in (NO TEL)</text>
      </svg>
    `),
    defaultDeclarations: [
      {
        ruleId: "RULE_6_1_A",
        title: "Manufacturer & Packer Address",
        extractedValue: "Mfd by: Sparkle Chem Products Ltd, Plot 89, GIDC Vapi, Gujarat - 396195",
        requiredFormat: "Full address with PIN",
        isCompliant: true,
        severity: "none",
        remarks: "Complete address with PIN.",
        legalSection: "Rule 6(1)(a)",
      },
      {
        ruleId: "RULE_6_1_B",
        title: "Generic Name",
        extractedValue: "Detergent Washing Powder",
        requiredFormat: "Generic name",
        isCompliant: true,
        severity: "none",
        remarks: "Conspicuous.",
        legalSection: "Rule 6(1)(b)",
      },
      {
        ruleId: "RULE_6_1_C",
        title: "Net Quantity & Font Size",
        extractedValue: "Net Quantity: 1 kg (Measured font: 4.5 mm)",
        requiredFormat: "Standard unit, min 3.0 mm font for PDP 450 cm²",
        isCompliant: true,
        severity: "none",
        remarks: "Font height 4.5 mm complies with Table 1.",
        legalSection: "Rule 7(1) & Table 1",
        fontSizeMm: 4.5,
        minRequiredFontMm: 3.0,
      },
      {
        ruleId: "RULE_6_1_E",
        title: "Unit Sale Price Declaration",
        extractedValue: "MRP ₹ 160.00 (inclusive of all taxes) | Unit Sale Price omitted",
        requiredFormat: "Mandatory Unit Sale Price (₹ 160.00 / kg or ₹ 0.16 / g)",
        isCompliant: false,
        severity: "major",
        remarks: "Unit Sale Price not declared on retail package greater than 100g.",
        legalSection: "Rule 6(11) of LMPC Rules, 2011",
      },
      {
        ruleId: "RULE_6_1_N",
        title: "Consumer Care Details",
        extractedValue: "Email: complaints@sparkle.in (No phone number or grievance officer)",
        requiredFormat: "Name, address, phone number, and email ID",
        isCompliant: false,
        severity: "major",
        remarks: "Active telephone number omitted.",
        legalSection: "Rule 6(1)(n)",
      },
    ],
  },
  {
    id: "sample-smart-gadget",
    name: "AeroTrack Smart Fitness Band",
    brand: "PulseTech",
    category: "Electronics",
    pdpWidthCm: 8,
    pdpHeightCm: 10,
    pdpAreaCm2: 80,
    tag: "Non-Standard Measurement Units",
    expectedStatus: "Warning Issued",
    description: "Electronic gadget carton using non-metric display size ('1.4-inch display' without metric equivalent in mm/cm) and missing importer registration details.",
    barcode: "8905544332211",
    summary: "Warning issued under Section 11 of Legal Metrology Act for declaring non-standard imperial units without primary metric equivalent.",
    penaltyInr: 10000,
    imageUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <rect width="400" height="500" fill="#f8fafc"/>
        <rect x="90" y="70" width="220" height="360" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <text x="200" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#38bdf8">PULSETECH</text>
        <text x="200" y="140" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#94a3b8">AEROTRACK SMART BAND</text>
        
        <rect x="150" y="160" width="100" height="100" rx="8" fill="#1e293b" stroke="#38bdf8"/>
        <text x="200" y="215" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">1.4" AMOLED</text>
        <text x="200" y="235" font-family="sans-serif" font-size="8" fill="#f87171">[No metric mm]</text>
        
        <rect x="105" y="280" width="190" height="130" fill="#1e293b" rx="4"/>
        <text x="115" y="305" font-family="sans-serif" font-size="8" fill="#f8fafc">Net Qty: 1 Unit (1 N)</text>
        <text x="115" y="325" font-family="sans-serif" font-size="8" fill="#f8fafc">MRP ₹ 1,999.00 (incl. all taxes)</text>
        <text x="115" y="345" font-family="sans-serif" font-size="8" fill="#f87171">• Dimension in non-SI unit only</text>
        <text x="115" y="365" font-family="sans-serif" font-size="8" fill="#f8fafc">Imp: PulseTech India, Gurugram - 122002</text>
        <text x="115" y="385" font-family="sans-serif" font-size="8" fill="#f8fafc">Origin: PR China | Care: support@pulse.in</text>
      </svg>
    `),
    defaultDeclarations: [
      {
        ruleId: "RULE_6_1_C",
        title: "Net Quantity",
        extractedValue: "Net Quantity: 1 N (1 Unit)",
        requiredFormat: "Standard unit 'N' or 'U'",
        isCompliant: true,
        severity: "none",
        remarks: "Complies with standard count units.",
        legalSection: "Rule 13",
      },
      {
        ruleId: "RULE_6_1_F",
        title: "Dimensions & Metric Standards",
        extractedValue: "Screen dimension declared as 1.4 inches without SI equivalent (35.5 mm)",
        requiredFormat: "Metric dimensions (mm, cm) mandatory under Section 11 of LM Act",
        isCompliant: false,
        severity: "minor",
        remarks: "Non-standard unit 'inches' without primary metric equivalent violates Section 11 of Legal Metrology Act, 2009.",
        legalSection: "Section 11 read with Section 29 of LM Act 2009",
      },
      {
        ruleId: "RULE_6_1_E",
        title: "MRP & Taxes",
        extractedValue: "MRP ₹ 1,999.00 (incl. of all taxes)",
        requiredFormat: "MRP with taxes",
        isCompliant: true,
        severity: "none",
        remarks: "Complies.",
        legalSection: "Rule 6(1)(e)",
      },
    ],
  },
];

export const INITIAL_INSPECTIONS: InspectionRecord[] = SAMPLE_PACKAGES.map((sample, idx) => ({
  id: `DOCA-INSP-2026-0${idx + 1}42`,
  timestamp: new Date(Date.now() - idx * 86400000 * 2).toISOString(),
  productName: sample.name,
  brandName: sample.brand,
  category: sample.category,
  barcode: sample.barcode || `890${Math.floor(1000000000 + idx * 123456)}`,
  batchNumber: `B-${204 + idx * 15}`,
  location: idx % 2 === 0 ? "Metro Wholesale Mart, Sector 18, Noida, UP" : "Reliance Smart Bazaar, Indiranagar, Bengaluru, KA",
  inspectorName: idx % 2 === 0 ? "Rajesh Kumar Sharma" : "Priya Sundaram",
  inspectorBadge: idx % 2 === 0 ? "LMI-UP-NOI-042" : "LMI-KA-BLR-019",
  inspectionType: idx === 2 ? "Port of Entry" : "Market Surveillance",
  overallStatus: sample.expectedStatus,
  complianceScore: sample.expectedStatus === "Compliant" ? 96 : sample.expectedStatus === "Warning Issued" ? 78 : 52,
  pdpAreaCm2: sample.pdpAreaCm2,
  declarations: sample.defaultDeclarations,
  violationsCount: sample.defaultDeclarations.filter((d) => !d.isCompliant).length,
  summary: sample.summary,
  recommendedAction:
    sample.expectedStatus === "Compliant"
      ? "Endorse compliant report and release package."
      : sample.expectedStatus === "Warning Issued"
      ? "Issue statutory rectification warning notice to packer."
      : "Issue Form VII Show Cause Notice under Section 36(1) and levy compounding fee.",
  estimatedPenaltyInr: sample.penaltyInr,
  imageUrl: sample.imageUrl,
}));
