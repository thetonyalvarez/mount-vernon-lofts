import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * RED-GREEN TDD tests for March 2026 pricing, staffing, and pet policy updates.
 *
 * Changes:
 * - S1 Studio: $215,124 → $175,000 ($286/SF), marketed as "Investor Special"
 * - "Starting in the $215Ks" → "Starting in the $175Ks" across all references
 * - Down payment examples updated to $175K base
 * - 7-day staffing coverage details (Jeffrey Wed–Sun, Tamara Mon–Tue)
 * - Pet policy: ensure "per handler in common areas" (not "per unit")
 * - ResidencesSchema lowPrice updated
 * - Open house descriptions updated
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

// ─── S1 STUDIO PRICING ──────────────────────────────────────────────────────

describe("S1 Studio pricing update ($175,000)", () => {
  it("unit-type-data S1 price is 175000", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("price: 175000,")
  })

  it("unit-type-data S1 priceFormatted is $175,000", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("priceFormatted: '$175,000'")
  })

  it("unit-type-data S1 pricePerSF is $286/SF", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("pricePerSF: '$286/SF'")
  })

  it("unit-type-data S1 does NOT contain old price 215124", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).not.toContain("215124")
  })

  it("unit-type-data S1 does NOT contain old $351/SF", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).not.toContain("$351/SF")
  })

  it("unit-type-data S1 includes Investor Special marketing label", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("Investor Special")
  })

  it("1BR pricing is unchanged (A1-A4)", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("252033")
    expect(source).toContain("252736")
    expect(source).toContain("271522")
    expect(source).toContain("278851")
  })
})

// ─── "STARTING" PRICE REFERENCES ─────────────────────────────────────────────

describe("Starting price updated from $215K to $175K", () => {
  it("layout.tsx title uses $175K", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("from $175K")
    expect(source).not.toContain("from $215K")
  })

  it("layout.tsx description uses $175Ks", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("$175Ks")
    expect(source).not.toContain("$215Ks")
  })

  it("homepage FAQ schema uses $175Ks", () => {
    const source = readFile("app/page.tsx")
    expect(source).toContain("$175Ks")
    expect(source).not.toContain("$215Ks")
  })

  it("EnhancedMetadata description uses $175Ks", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain("$175Ks")
    expect(source).not.toContain("$215Ks")
  })

  it("residences page description uses $175Ks", () => {
    const source = readFile("app/residences/page.tsx")
    expect(source).toContain("$175Ks")
    expect(source).not.toContain("$215Ks")
  })

  it("ResidencesSchema lowPrice is 175000", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain('"lowPrice": "175000"')
    expect(source).not.toContain('"lowPrice": "215124"')
  })

  it("ResidencesSchema listing description uses $175K", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain("Studios from $175K")
    expect(source).not.toContain("studios from $215K")
  })

  it("ResidencesSchema S1 offer price is 175000", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain('"price": "175000"')
    expect(source).not.toContain('"price": "215124"')
  })

  it("metadata-utils uses $175Ks", () => {
    const source = readFile("lib/metadata-utils.ts")
    expect(source).toContain("$175Ks")
    expect(source).not.toContain("$215Ks")
  })

  it("open-house-data descriptions use $175K", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain("from $175K")
    expect(source).not.toContain("from $215K")
  })

  it("why-mvl page description uses $175K range", () => {
    const source = readFile("app/why-mvl/page.tsx")
    expect(source).not.toContain("under $220K")
  })
})

// ─── DOWN PAYMENT MESSAGING ─────────────────────────────────────────────────

describe("Down payment messaging updated for $175K", () => {
  it("BuyerDPASection HAP example uses $175,000", () => {
    const source = readFile(
      "app/first-time-buyer/sections/BuyerDPASection.tsx"
    )
    expect(source).toContain("$175,000")
    expect(source).not.toContain("$215,000")
  })

  it("BuyerDPASection TSAHC example uses $175,000", () => {
    const source = readFile(
      "app/first-time-buyer/sections/BuyerDPASection.tsx"
    )
    // TSAHC 5% of $175K = $8,750
    expect(source).toContain("$8,750")
    expect(source).not.toContain("$10,750")
  })

  it("BuyerDPASection HAP 10% down on $175K = $17,500", () => {
    const source = readFile(
      "app/first-time-buyer/sections/BuyerDPASection.tsx"
    )
    expect(source).toContain("$17,500")
    expect(source).not.toContain("$21,500")
  })
})

// ─── STAFFING / TOUR AVAILABILITY ────────────────────────────────────────────

describe("7-day staffing coverage details", () => {
  it("contact config or navigation includes Jeffrey schedule (Wed-Sun)", () => {
    // Check either contact.ts or navigation.ts for staffing details
    const contact = readFile("app/config/contact.ts")
    const nav = readFile("app/config/navigation.ts")
    const combined = contact + nav
    expect(combined).toContain("Jeffrey")
    expect(combined).toContain("Wed")
  })

  it("contact config or navigation includes Tamara schedule (Mon-Tue)", () => {
    const contact = readFile("app/config/contact.ts")
    const nav = readFile("app/config/navigation.ts")
    const combined = contact + nav
    expect(combined).toContain("Tamara")
    expect(combined).toContain("Mon")
  })
})

// ─── PET POLICY ──────────────────────────────────────────────────────────────

describe("Pet policy says 'per handler in common areas' (not 'per unit')", () => {
  it("unit-type-data pet text includes 'per handler'", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("per handler")
    expect(source).not.toMatch(/2\s*(?:dogs\s+)?per\s+unit/i)
  })

  it("features-finishes pet text includes 'per handler'", () => {
    const source = readFile("app/config/features-finishes.ts")
    expect(source).toContain("per handler")
    // Pet policy should never say "dogs per unit"
    expect(source).not.toMatch(/dogs?\s+per\s+unit/i)
  })

  it("amenities-data pet text includes 'per handler in common areas'", () => {
    const source = readFile("app/config/amenities-data.ts")
    expect(source).toContain("per handler in common areas")
  })

  it("EnhancedMetadata pet text includes 'per handler in common areas'", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain("per handler in common areas")
  })
})

// ─── EXISTING TESTS MUST STILL PASS (guard rails) ───────────────────────────

describe("Guard rails: unchanged data", () => {
  it("HOA fee is still $300/month", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("$300/month")
  })

  it("S2 studio pricing is unchanged at $237,585", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("237585")
    expect(source).toContain("$237,585")
  })

  it("phone number is unchanged", () => {
    const source = readFile("app/config/contact.ts")
    expect(source).toContain("713.986.9929")
  })

  it("STR policy language is unchanged", () => {
    const source = readFile("app/config/navigation.ts")
    expect(source).toContain("Short-term rentals")
  })
})
