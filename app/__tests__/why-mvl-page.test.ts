/**
 * Tests for /why-mvl page
 * Verifies: page exists, sections created, nav + sitemap updated, brand compliance
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const readFile = (rel: string) =>
  fs.readFileSync(path.join(process.cwd(), rel), 'utf-8')

const PAGE_FILE = 'app/why-mvl/page.tsx'
const BARREL_FILE = 'app/why-mvl/sections/index.ts'
const NAV_FILE = 'app/config/navigation.ts'
const SITEMAP_FILE = 'app/sitemap.xml/route.ts'

const SECTIONS = [
  'WhyMvlIntroSection',
  'WhyMvlPillarsSection',
  'WhyMvlComparisonSection',
  'WhyMvlCTASection',
]

const BANNED_WORDS = [
  'exclusive', 'bespoke', 'curated', 'premier', 'prestigious',
  'elevated', 'refined', 'sophisticated', 'affordable', 'budget-friendly',
  'bargain', 'stunning', 'amazing', 'incredible',
]

describe('/why-mvl page structure', () => {
  it('page.tsx exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), PAGE_FILE))).toBe(true)
  })

  it('page.tsx has metadata with canonical URL', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('metadata')
    expect(source).toContain('/why-mvl')
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

describe('/why-mvl sections barrel export', () => {
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

describe('/why-mvl section files exist', () => {
  for (const section of SECTIONS) {
    it(`${section}.tsx exists`, () => {
      const filePath = path.join(process.cwd(), `app/why-mvl/sections/${section}.tsx`)
      expect(fs.existsSync(filePath), `Missing: ${section}.tsx`).toBe(true)
    })
  }
})

describe('/why-mvl navigation integration', () => {
  it('mainNavLinks includes /why-mvl', () => {
    const source = readFile(NAV_FILE)
    expect(source).toContain('/why-mvl')
  })

  it('footerNavLinks includes /why-mvl', () => {
    const source = readFile(NAV_FILE)
    expect(source).toMatch(/footerNavLinks[\s\S]*why-mvl/)
  })
})

describe('/why-mvl sitemap', () => {
  it('sitemap includes /why-mvl', () => {
    const source = readFile(SITEMAP_FILE)
    expect(source).toContain('/why-mvl')
  })
})

describe('/why-mvl brand compliance', () => {
  const contentFiles = [
    PAGE_FILE,
    ...SECTIONS.map((s) => `app/why-mvl/sections/${s}.tsx`),
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
