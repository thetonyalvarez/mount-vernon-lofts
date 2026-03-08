/**
 * Tests for /first-time-buyer page
 * Verifies: page exists, sections created, schema, footer nav + sitemap, brand compliance
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const readFile = (rel: string) =>
  fs.readFileSync(path.join(process.cwd(), rel), 'utf-8')

const PAGE_FILE = 'app/first-time-buyer/page.tsx'
const BARREL_FILE = 'app/first-time-buyer/sections/index.ts'
const SCHEMA_FILE = 'app/first-time-buyer/FirstTimeBuyerSchema.tsx'
const NAV_FILE = 'app/config/navigation.ts'
const SITEMAP_FILE = 'app/sitemap.xml/route.ts'

const SECTIONS = [
  'BuyerStatStrip',
  'BuyerRentVsBuySection',
  'BuyerCondoVsHouseSection',
  'BuyerCostsSection',
  'BuyerDPASection',
  'BuyerStepsSection',
  'BuyerFinancingSection',
  'BuyerHomesteadSection',
  'BuyerFirstYearSection',
  'BuyerFAQSection',
  'BuyerCTASection',
  'BuyerDisclaimersSection',
]

const BANNED_WORDS = [
  'exclusive', 'bespoke', 'curated', 'premier', 'prestigious',
  'elevated', 'refined', 'sophisticated', 'affordable', 'budget-friendly',
  'bargain', 'stunning', 'amazing', 'incredible',
]

describe('/first-time-buyer page structure', () => {
  it('page.tsx exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), PAGE_FILE))).toBe(true)
  })

  it('page.tsx has metadata with canonical URL', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('metadata')
    expect(source).toContain('/first-time-buyer')
    expect(source).toContain('canonical')
  })

  it('page.tsx renders DataLayerEvent', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('DataLayerEvent')
  })

  it('page.tsx renders HeroSection', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('HeroSection')
  })

  it('page.tsx renders FirstTimeBuyerSchema', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('FirstTimeBuyerSchema')
  })

  for (const section of SECTIONS) {
    it(`page.tsx renders <${section}`, () => {
      const source = readFile(PAGE_FILE)
      expect(source).toContain(`<${section}`)
    })
  }
})

describe('/first-time-buyer schema', () => {
  it('schema file exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), SCHEMA_FILE))).toBe(true)
  })

  it('schema contains FAQPage type', () => {
    const source = readFile(SCHEMA_FILE)
    expect(source).toContain('"FAQPage"')
  })

  it('schema contains Article type', () => {
    const source = readFile(SCHEMA_FILE)
    expect(source).toContain('"Article"')
  })

  it('schema contains BreadcrumbList', () => {
    const source = readFile(SCHEMA_FILE)
    expect(source).toContain('"BreadcrumbList"')
  })
})

describe('/first-time-buyer sections barrel export', () => {
  it('barrel index.ts exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), BARREL_FILE))).toBe(true)
  })

  for (const section of SECTIONS) {
    it(`exports ${section}`, () => {
      const source = readFile(BARREL_FILE)
      expect(source).toContain(section)
    })
  }
})

describe('/first-time-buyer section files exist', () => {
  for (const section of SECTIONS) {
    it(`${section}.tsx exists`, () => {
      const filePath = path.join(process.cwd(), `app/first-time-buyer/sections/${section}.tsx`)
      expect(fs.existsSync(filePath), `Missing: ${section}.tsx`).toBe(true)
    })
  }
})

describe('/first-time-buyer navigation integration', () => {
  it('footerNavLinks includes /first-time-buyer', () => {
    const source = readFile(NAV_FILE)
    expect(source).toMatch(/footerNavLinks[\s\S]*first-time-buyer/)
  })
})

describe('/first-time-buyer sitemap', () => {
  it('sitemap includes /first-time-buyer', () => {
    const source = readFile(SITEMAP_FILE)
    expect(source).toContain('/first-time-buyer')
  })
})

describe('/first-time-buyer brand compliance', () => {
  const contentFiles = [
    PAGE_FILE,
    SCHEMA_FILE,
    ...SECTIONS.map((s) => `app/first-time-buyer/sections/${s}.tsx`),
  ]

  for (const banned of BANNED_WORDS) {
    it(`no content file uses banned word "${banned}"`, () => {
      for (const file of contentFiles) {
        if (fs.existsSync(path.join(process.cwd(), file))) {
          const source = readFile(file).toLowerCase()
          expect(source, `"${banned}" found in ${file}`).not.toContain(banned)
        }
      }
    })
  }
})
