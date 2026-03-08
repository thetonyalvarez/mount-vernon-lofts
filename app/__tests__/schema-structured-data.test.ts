import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * RED-GREEN TDD tests for schema/structured data SEO improvements.
 *
 * Fixes: ApartmentComplex (not Residence), ContactPoint phone/email,
 * BreadcrumbList validity, Event schema on open house, missing canonicals,
 * and metadata-utils.ts corrections.
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("Schema: ApartmentComplex (not Residence)", () => {
  it("EnhancedMetadata uses ApartmentComplex instead of Residence", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"ApartmentComplex"')
    expect(source).not.toMatch(/"Residence"/)
  })

  it("uses numberOfAccommodationUnits instead of numberOfRooms", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain("numberOfAccommodationUnits")
    expect(source).not.toContain("numberOfRooms")
  })

  it("does NOT use priceRange $$$", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).not.toContain('"$$$"')
  })

  it("includes tourBookingPage", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain("tourBookingPage")
  })
})

describe("Schema: ContactPoint has phone and email", () => {
  it("ContactPoint includes telephone", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"telephone"')
    expect(source).toMatch(/713/)
  })

  it("ContactPoint includes email", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"email"')
    expect(source).toMatch(/mtvernonlofts\.com/)
  })
})

describe("Schema: BreadcrumbList is valid", () => {
  it("breadcrumb items do NOT all point to the same URL", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    // The old bug: all 3 items had "item": baseUrl — should be at most 1
    const matches = source.match(/"item":\s*baseUrl\b/g) ?? []
    expect(matches.length).toBeLessThanOrEqual(1)
  })

  it("breadcrumb uses pageType or canonicalUrl for dynamic items", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    // The breadcrumb construction should reference pageType or finalCanonicalUrl
    expect(source).toMatch(/breadcrumb[\s\S]*?(pageType|finalCanonicalUrl)/i)
  })
})

describe("Schema: Event on open house page", () => {
  it("OpenHouseSchema component file exists", () => {
    const schemaFile = path.join(process.cwd(), "app/open-house/OpenHouseSchema.tsx")
    expect(fs.existsSync(schemaFile)).toBe(true)
  })

  it("OpenHouseSchema contains Event type", () => {
    const source = readFile("app/open-house/OpenHouseSchema.tsx")
    expect(source).toContain('"Event"')
  })

  it("OpenHouseSchema includes required Event properties", () => {
    const source = readFile("app/open-house/OpenHouseSchema.tsx")
    expect(source).toContain("startDate")
    expect(source).toContain("endDate")
    expect(source).toContain("eventStatus")
    expect(source).toContain("eventAttendanceMode")
    expect(source).toContain("location")
    expect(source).toContain("organizer")
  })

  it("OpenHouseSchema imports from open-house-data config", () => {
    const source = readFile("app/open-house/OpenHouseSchema.tsx")
    expect(source).toContain("open-house-data")
  })

  it("open-house page renders OpenHouseSchema", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).toContain("OpenHouseSchema")
  })
})

describe("Missing canonical URLs", () => {
  it("floor-plans page has alternates.canonical", () => {
    const source = readFile("app/floor-plans/page.tsx")
    expect(source).toContain("alternates")
    expect(source).toMatch(/canonical.*floor-plans/)
  })

  it("brochure page has alternates.canonical", () => {
    const source = readFile("app/brochure/page.tsx")
    expect(source).toContain("alternates")
    expect(source).toMatch(/canonical.*brochure/)
  })
})

describe("Schema: Residences page structured data", () => {
  it("ResidencesSchema component file exists", () => {
    const schemaFile = path.join(process.cwd(), "app/residences/ResidencesSchema.tsx")
    expect(fs.existsSync(schemaFile)).toBe(true)
  })

  it("ResidencesSchema contains RealEstateListing type", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain('"RealEstateListing"')
  })

  it("ResidencesSchema contains Accommodation entries for all 6 floor plan types", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain('"Accommodation"')
    for (const planId of ["studio-s1", "studio-s2", "1bed-a1", "1bed-a2", "1bed-a3", "1bed-a4"]) {
      expect(source, `Missing Accommodation for ${planId}`).toContain(planId)
    }
  })

  it("ResidencesSchema contains AggregateOffer with price range", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain('"AggregateOffer"')
    expect(source).toContain('"lowPrice"')
    expect(source).toContain('"highPrice"')
  })

  it("ResidencesSchema contains BreadcrumbList", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain('"BreadcrumbList"')
    expect(source).toContain("Residences")
  })

  it("ResidencesSchema contains RealEstateAgent", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    expect(source).toContain('"RealEstateAgent"')
    expect(source).toContain("Nan & Company Properties")
  })

  it("residences page renders ResidencesSchema", () => {
    const source = readFile("app/residences/page.tsx")
    expect(source).toContain("ResidencesSchema")
  })
})

describe("Schema: Homepage ApartmentComplex structured data", () => {
  it("EnhancedMetadata contains comprehensive ApartmentComplex with amenities", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"ApartmentComplex"')
    expect(source).toContain('"Granite Countertops"')
    expect(source).toContain('"Classic Shaker Cabinetry"')
    expect(source).toContain('"Recreational Lounge"')
  })

  it("EnhancedMetadata contains Person schema for sales agent", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"Person"')
    expect(source).toContain("Jeffrey Winans")
  })

  it("EnhancedMetadata ApartmentComplex includes containsPlace with unit types", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"containsPlace"')
    expect(source).toContain("Studio S1")
    expect(source).toContain("1-Bedroom A4")
  })

  it("EnhancedMetadata ApartmentComplex includes additionalProperty", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"additionalProperty"')
    expect(source).toContain("HOA Fee")
    expect(source).toContain("Year Built")
  })

  it("EnhancedMetadata ApartmentComplex includes sameAs social links", () => {
    const source = readFile("app/components/metadata/EnhancedMetadata.tsx")
    expect(source).toContain('"sameAs"')
    expect(source).toContain("instagram.com/mountvernonlofts")
  })
})

describe("metadata-utils.ts uses correct schema types", () => {
  it("uses ApartmentComplex instead of Residence", () => {
    const source = readFile("lib/metadata-utils.ts")
    expect(source).not.toMatch(/"Residence"/)
    expect(source).toContain('"ApartmentComplex"')
  })

  it("uses numberOfAccommodationUnits instead of numberOfRooms", () => {
    const source = readFile("lib/metadata-utils.ts")
    expect(source).not.toContain("numberOfRooms")
    expect(source).toContain("numberOfAccommodationUnits")
  })
})
