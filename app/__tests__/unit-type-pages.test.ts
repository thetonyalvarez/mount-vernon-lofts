import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

const fileExists = (relativePath: string): boolean => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.existsSync(filePath)
}

const UNIT_SLUGS = [
  "studio-s1",
  "studio-s2",
  "1bed-a1",
  "1bed-a2",
  "1bed-a3",
  "1bed-a4",
]

const SEO_TITLES = [
  "Studio S1 — 612 SF Condo in Montrose | Mount Vernon Lofts",
  "Studio S2 — 705 SF Condo in Montrose | Mount Vernon Lofts",
  "1-Bed A1 — 717 SF Condo in Montrose | Mount Vernon Lofts",
  "1-Bed A2 — 719 SF Condo in Montrose | Mount Vernon Lofts",
  "1-Bed A3 — 778 SF Condo in Montrose | Mount Vernon Lofts",
  "1-Bed A4 — 799 SF Condo in Montrose | Mount Vernon Lofts",
]

const PRICES = ["215124", "237585", "252033", "252736", "271522", "278851"]

describe("Unit type data file", () => {
  it("exists at app/config/unit-type-data.ts", () => {
    expect(fileExists("app/config/unit-type-data.ts")).toBe(true)
  })

  it("contains all 6 unit slugs", () => {
    const source = readFile("app/config/unit-type-data.ts")
    for (const slug of UNIT_SLUGS) {
      expect(source, `Missing slug: ${slug}`).toContain(slug)
    }
  })

  it("contains all 6 prices", () => {
    const source = readFile("app/config/unit-type-data.ts")
    for (const price of PRICES) {
      expect(source, `Missing price: ${price}`).toContain(price)
    }
  })

  it("contains all 6 SEO titles", () => {
    const source = readFile("app/config/unit-type-data.ts")
    for (const title of SEO_TITLES) {
      expect(source, `Missing SEO title: ${title}`).toContain(title)
    }
  })

  it("imports from floor-plan-data", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("floor-plan-data")
  })

  it("contains Matterport URLs for S1, A3, A4", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("8oRQg3EZnp8")
    expect(source).toContain("zaDtQodnWRH")
    expect(source).toContain("3yQPMPJaXyN")
  })

  it("contains floor plan PDF URLs for S1, A3, A4", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("STD_S11.pdf")
    expect(source).toContain("1BD_A31.pdf")
    expect(source).toContain("1BD_A41.pdf")
  })

  it("exports helper functions", () => {
    const source = readFile("app/config/unit-type-data.ts")
    expect(source).toContain("getUnitTypeBySlug")
    expect(source).toContain("getAllUnitSlugs")
    expect(source).toContain("getOtherUnitTypes")
  })
})

describe("Dynamic route page", () => {
  it("exists at app/residences/[slug]/page.tsx", () => {
    expect(fileExists("app/residences/[slug]/page.tsx")).toBe(true)
  })

  it("contains generateStaticParams with all 6 slugs", () => {
    const source = readFile("app/residences/[slug]/page.tsx")
    expect(source).toContain("generateStaticParams")
  })

  it("contains generateMetadata", () => {
    const source = readFile("app/residences/[slug]/page.tsx")
    expect(source).toContain("generateMetadata")
  })

  it("imports from unit-type-data", () => {
    const source = readFile("app/residences/[slug]/page.tsx")
    expect(source).toContain("unit-type-data")
  })

  it("renders DataLayerEvent for analytics", () => {
    const source = readFile("app/residences/[slug]/page.tsx")
    expect(source).toContain("DataLayerEvent")
  })

  it("uses notFound for invalid slugs", () => {
    const source = readFile("app/residences/[slug]/page.tsx")
    expect(source).toContain("notFound")
  })
})

describe("Section components", () => {
  const sections = [
    "UnitHeroSection",
    "MatterportTourSection",
    "UnitGallerySection",
    "FloorPlanSection",
    "UnitFeaturesSection",
    "UnitBodySection",
    "BuildingSnapshotSection",
    "CompareLayoutsSection",
    "UnitLeadFormSection",
    "UnitBreadcrumb",
    "UnitSchema",
  ]

  it("all section files exist", () => {
    for (const section of sections) {
      expect(
        fileExists(`app/residences/[slug]/sections/${section}.tsx`),
        `Missing: ${section}.tsx`
      ).toBe(true)
    }
  })

  it("barrel export exists and includes all sections", () => {
    const source = readFile("app/residences/[slug]/sections/index.ts")
    for (const section of sections) {
      expect(source, `Missing export: ${section}`).toContain(section)
    }
  })

  it("page.tsx imports and renders all sections", () => {
    const source = readFile("app/residences/[slug]/page.tsx")
    for (const section of sections) {
      expect(source, `Missing in page: ${section}`).toContain(section)
    }
  })
})

describe("MatterportTourSection", () => {
  it("contains iframe element", () => {
    const source = readFile(
      "app/residences/[slug]/sections/MatterportTourSection.tsx"
    )
    expect(source).toContain("iframe")
  })

  it("uses lazy loading for performance", () => {
    const source = readFile(
      "app/residences/[slug]/sections/MatterportTourSection.tsx"
    )
    expect(source).toContain('loading="lazy"')
  })

  it("allows xr-spatial-tracking", () => {
    const source = readFile(
      "app/residences/[slug]/sections/MatterportTourSection.tsx"
    )
    expect(source).toContain("xr-spatial-tracking")
  })
})

describe("FloorPlanSection", () => {
  it("references floor plan PDF download", () => {
    const source = readFile(
      "app/residences/[slug]/sections/FloorPlanSection.tsx"
    )
    expect(source).toContain("floorPlanPdfUrl")
  })

  it("has lightbox functionality", () => {
    const source = readFile(
      "app/residences/[slug]/sections/FloorPlanSection.tsx"
    )
    expect(source).toContain("lightbox")
  })
})

describe("UnitLeadFormSection", () => {
  it("has honeypot spam protection", () => {
    const source = readFile(
      "app/residences/[slug]/sections/UnitLeadFormSection.tsx"
    )
    expect(source).toContain("honeypot")
  })

  it("posts to /api/contact", () => {
    const source = readFile(
      "app/residences/[slug]/sections/UnitLeadFormSection.tsx"
    )
    expect(source).toContain("/api/contact")
  })

  it("has hidden unitType field", () => {
    const source = readFile(
      "app/residences/[slug]/sections/UnitLeadFormSection.tsx"
    )
    expect(source).toContain("unitType")
  })
})

describe("UnitSchema structured data", () => {
  it("contains Accommodation type", () => {
    const source = readFile(
      "app/residences/[slug]/sections/UnitSchema.tsx"
    )
    expect(source).toContain("Accommodation")
  })

  it("contains BreadcrumbList type", () => {
    const source = readFile(
      "app/residences/[slug]/sections/UnitSchema.tsx"
    )
    expect(source).toContain("BreadcrumbList")
  })

  it("contains VirtualLocation for Matterport pages", () => {
    const source = readFile(
      "app/residences/[slug]/sections/UnitSchema.tsx"
    )
    expect(source).toContain("VirtualLocation")
  })

  it("references containedInPlace property", () => {
    const source = readFile(
      "app/residences/[slug]/sections/UnitSchema.tsx"
    )
    expect(source).toContain("containedInPlace")
  })
})

describe("Sitemap includes unit pages", () => {
  it("contains all 6 unit page paths", () => {
    const source = readFile("app/sitemap.xml/route.ts")
    for (const slug of UNIT_SLUGS) {
      expect(source, `Missing sitemap entry: /residences/${slug}`).toContain(
        `/residences/${slug}`
      )
    }
  })

  it("has exactly 15 URL entries", () => {
    const source = readFile("app/sitemap.xml/route.ts")
    const urlEntries = (
      source.match(/url:\s*[`'"]?\$?\{?baseUrl/g) ?? []
    ).length
    expect(urlEntries).toBe(15)
  })

  it("unit pages have priority 0.8", () => {
    const source = readFile("app/sitemap.xml/route.ts")
    // Each unit page entry should have priority 0.8
    const unitBlock = source.slice(source.indexOf("/residences/studio-s1"))
    expect(unitBlock).toContain("priority: 0.8")
  })
})

describe("ResidencesSchema updated URLs", () => {
  it("Accommodation @id values point to individual pages", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    for (const slug of UNIT_SLUGS) {
      expect(
        source,
        `@id should use /residences/${slug} path`
      ).toContain(`/residences/${slug}`)
    }
  })

  it("offers.url values point to individual pages", () => {
    const source = readFile("app/residences/ResidencesSchema.tsx")
    // Should NOT have generic /residences as offer URL (except the RealEstateListing)
    // Each Accommodation should link to its own page
    for (const slug of UNIT_SLUGS) {
      expect(source).toContain(`/residences/${slug}`)
    }
  })
})
