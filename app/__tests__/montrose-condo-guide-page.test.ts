/**
 * Tests for /montrose-condo-guide page
 * Verifies: page exists, sections created, footer nav + sitemap updated, brand compliance
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const readFile = (rel: string) =>
  fs.readFileSync(path.join(process.cwd(), rel), 'utf-8')

const PAGE_FILE = 'app/montrose-condo-guide/page.tsx'
const BARREL_FILE = 'app/montrose-condo-guide/sections/index.ts'
const NAV_FILE = 'app/config/navigation.ts'
const SITEMAP_FILE = 'app/sitemap.xml/route.ts'

const SECTIONS = [
  'GuideIntroSection',
  'GuideMarketSection',
  'GuideLifestyleSection',
  'GuideChecklistSection',
  'GuideFinancingSection',
  'GuideMvlSection',
  'GuideCTASection',
]

const BANNED_WORDS = [
  'exclusive', 'bespoke', 'curated', 'premier', 'prestigious',
  'elevated', 'refined', 'sophisticated', 'affordable', 'budget-friendly',
  'bargain', 'stunning', 'amazing', 'incredible',
]

describe('/montrose-condo-guide page structure', () => {
  it('page.tsx exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), PAGE_FILE))).toBe(true)
  })

  it('page.tsx has metadata with canonical URL', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('metadata')
    expect(source).toContain('/montrose-condo-guide')
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

  for (const section of SECTIONS) {
    it(`page.tsx renders <${section}`, () => {
      const source = readFile(PAGE_FILE)
      expect(source).toContain(`<${section}`)
    })
  }
})

describe('/montrose-condo-guide sections barrel export', () => {
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

describe('/montrose-condo-guide section files exist', () => {
  for (const section of SECTIONS) {
    it(`${section}.tsx exists`, () => {
      const filePath = path.join(process.cwd(), `app/montrose-condo-guide/sections/${section}.tsx`)
      expect(fs.existsSync(filePath), `Missing: ${section}.tsx`).toBe(true)
    })
  }
})

describe('/montrose-condo-guide navigation integration', () => {
  it('footerNavLinks includes /montrose-condo-guide', () => {
    const source = readFile(NAV_FILE)
    expect(source).toMatch(/footerNavLinks[\s\S]*montrose-condo-guide/)
  })
})

describe('/montrose-condo-guide sitemap', () => {
  it('sitemap includes /montrose-condo-guide', () => {
    const source = readFile(SITEMAP_FILE)
    expect(source).toContain('/montrose-condo-guide')
  })
})

describe('/montrose-condo-guide brand compliance', () => {
  const contentFiles = [
    PAGE_FILE,
    ...SECTIONS.map((s) => `app/montrose-condo-guide/sections/${s}.tsx`),
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
