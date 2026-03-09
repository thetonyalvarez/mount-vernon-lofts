import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * RED-GREEN TDD tests for 5 neighborhood subpages:
 * /neighborhood/restaurants, /neighborhood/parks, /neighborhood/museums,
 * /neighborhood/coffee, /neighborhood/transit
 *
 * Tests validate file existence, metadata, schema, and data structure.
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

const fileExists = (relativePath: string): boolean => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.existsSync(filePath)
}

// ─── All 5 Subpages ──────────────────────────────────────────────────
const SUBPAGES = [
  { slug: "restaurants", name: "Restaurants", schemaPrefix: "Restaurants" },
  { slug: "parks", name: "Parks", schemaPrefix: "Parks" },
  { slug: "museums", name: "Museums", schemaPrefix: "Museums" },
  { slug: "coffee", name: "Coffee", schemaPrefix: "Coffee" },
  { slug: "transit", name: "Transit", schemaPrefix: "Transit" },
] as const

// ─── Venue-based pages (NOT transit) ─────────────────────────────────
const VENUE_SUBPAGES = SUBPAGES.filter((s) => s.slug !== "transit")

describe("Neighborhood subpages: shared types", () => {
  it("neighborhood-subpage-types.ts exists", () => {
    expect(fileExists("app/config/neighborhood-subpage-types.ts")).toBe(true)
  })

  it("exports SubpageVenue interface", () => {
    const source = readFile("app/config/neighborhood-subpage-types.ts")
    expect(source).toContain("SubpageVenue")
  })

  it("exports SubpageFAQItem interface", () => {
    const source = readFile("app/config/neighborhood-subpage-types.ts")
    expect(source).toContain("SubpageFAQItem")
  })

  it("exports SubpageMVLCallout interface", () => {
    const source = readFile("app/config/neighborhood-subpage-types.ts")
    expect(source).toContain("SubpageMVLCallout")
  })

  it("exports TransitRoute interface for transit page", () => {
    const source = readFile("app/config/neighborhood-subpage-types.ts")
    expect(source).toContain("TransitRoute")
  })
})

describe("Neighborhood subpages: shared components", () => {
  const SHARED_COMPONENTS = [
    "SubpageVenueCard",
    "SubpageQuickStats",
    "SubpageMapEmbed",
    "SubpageMVLCallout",
    "SubpageCrossLinks",
    "SubpageFAQ",
    "SubpageCTA",
    "SubpageDisclaimers",
  ]

  for (const component of SHARED_COMPONENTS) {
    it(`${component}.tsx exists`, () => {
      expect(
        fileExists(`app/neighborhood/components/${component}.tsx`)
      ).toBe(true)
    })
  }
})

describe.each(SUBPAGES)(
  "Neighborhood subpage: /neighborhood/$slug",
  ({ slug, name, schemaPrefix }) => {
    it("page.tsx exists", () => {
      expect(fileExists(`app/neighborhood/${slug}/page.tsx`)).toBe(true)
    })

    it("page.tsx contains metadata with title", () => {
      const source = readFile(`app/neighborhood/${slug}/page.tsx`)
      expect(source).toContain("title")
      expect(source).toContain("Metadata")
    })

    it("page.tsx contains canonical URL", () => {
      const source = readFile(`app/neighborhood/${slug}/page.tsx`)
      expect(source).toContain("alternates")
      expect(source).toContain(`/neighborhood/${slug}`)
    })

    it("page.tsx renders Schema component", () => {
      const source = readFile(`app/neighborhood/${slug}/page.tsx`)
      expect(source).toContain(`${schemaPrefix}Schema`)
    })

    it("page.tsx renders DataLayerEvent", () => {
      const source = readFile(`app/neighborhood/${slug}/page.tsx`)
      expect(source).toContain("DataLayerEvent")
    })

    it("page.tsx renders HeroSection", () => {
      const source = readFile(`app/neighborhood/${slug}/page.tsx`)
      expect(source).toContain("HeroSection")
    })

    it("Schema file exists", () => {
      expect(
        fileExists(`app/neighborhood/${slug}/${schemaPrefix}Schema.tsx`)
      ).toBe(true)
    })

    it("Schema contains WebPage type", () => {
      const source = readFile(
        `app/neighborhood/${slug}/${schemaPrefix}Schema.tsx`
      )
      expect(source).toContain('"WebPage"')
    })

    it("Schema contains BreadcrumbList", () => {
      const source = readFile(
        `app/neighborhood/${slug}/${schemaPrefix}Schema.tsx`
      )
      expect(source).toContain('"BreadcrumbList"')
      expect(source).toContain("Neighborhood")
    })

    it("Schema contains FAQPage type", () => {
      const source = readFile(
        `app/neighborhood/${slug}/${schemaPrefix}Schema.tsx`
      )
      expect(source).toContain('"FAQPage"')
    })

    it("sections/index.ts barrel export exists", () => {
      expect(
        fileExists(`app/neighborhood/${slug}/sections/index.ts`)
      ).toBe(true)
    })

    it("data file exists in app/config/", () => {
      expect(
        fileExists(`app/config/neighborhood-${slug}-data.ts`)
      ).toBe(true)
    })
  }
)

describe.each(VENUE_SUBPAGES)(
  "Venue subpage schema: /neighborhood/$slug",
  ({ slug, schemaPrefix }) => {
    it("Schema contains LocalBusiness or a schema.org subtype", () => {
      const source = readFile(
        `app/neighborhood/${slug}/${schemaPrefix}Schema.tsx`
      )
      const hasLocalBusinessType =
        source.includes('"LocalBusiness"') ||
        source.includes('"Restaurant"') ||
        source.includes('"CafeOrCoffeeShop"') ||
        source.includes('"Museum"') ||
        source.includes('"Park"')
      expect(hasLocalBusinessType).toBe(true)
    })
  }
)

describe("Transit subpage: unique structure", () => {
  it("TransitSchema does NOT contain LocalBusiness", () => {
    const source = readFile("app/neighborhood/transit/TransitSchema.tsx")
    expect(source).not.toContain('"LocalBusiness"')
  })

  it("transit data file exports transit routes", () => {
    const source = readFile("app/config/neighborhood-transit-data.ts")
    expect(source).toContain("transitRoutes")
  })

  it("transit has TransitFromMVL section", () => {
    const source = readFile(
      "app/neighborhood/transit/sections/index.ts"
    )
    expect(source).toContain("TransitFromMVLSection")
  })

  it("transit has METRORail section", () => {
    const source = readFile(
      "app/neighborhood/transit/sections/index.ts"
    )
    expect(source).toContain("METRORailSection")
  })

  it("transit has BusRoutes section", () => {
    const source = readFile(
      "app/neighborhood/transit/sections/index.ts"
    )
    expect(source).toContain("BusRoutesSection")
  })
})

describe("Neighborhood parent page links to subpages", () => {
  it("neighborhood/page.tsx contains NeighborhoodSubpagesSection", () => {
    const source = readFile("app/neighborhood/page.tsx")
    expect(source).toContain("NeighborhoodSubpagesSection")
  })
})

describe("Sitemap includes neighborhood subpages", () => {
  it("sitemap route contains all 5 subpage paths", () => {
    const source = readFile("app/sitemap.xml/route.ts")
    for (const { slug } of SUBPAGES) {
      expect(
        source,
        `Missing sitemap entry for /neighborhood/${slug}`
      ).toContain(`/neighborhood/${slug}`)
    }
  })
})
