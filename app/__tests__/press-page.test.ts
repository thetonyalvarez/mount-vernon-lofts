/**
 * Tests for /press page (In The Press)
 * Verifies: page exists, sections created, schema, nav + sitemap updated, brand compliance
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const readFile = (rel: string) =>
  fs.readFileSync(path.join(process.cwd(), rel), 'utf-8')

const PAGE_FILE = 'app/press/page.tsx'
const SCHEMA_FILE = 'app/press/PressSchema.tsx'
const BARREL_FILE = 'app/press/sections/index.ts'
const DATA_FILE = 'app/config/press-data.ts'
const NAV_FILE = 'app/config/navigation.ts'
const SITEMAP_FILE = 'app/sitemap.xml/route.ts'

const SECTIONS = ['PressHeroSection', 'PressArticleList']

const BANNED_WORDS = [
  'exclusive', 'bespoke', 'curated', 'premier', 'prestigious',
  'elevated', 'refined', 'sophisticated', 'affordable', 'budget-friendly',
  'bargain', 'stunning', 'amazing', 'incredible',
]

describe('/press page structure', () => {
  it('page.tsx exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), PAGE_FILE))).toBe(true)
  })

  it('page.tsx has metadata with canonical URL', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('metadata')
    expect(source).toContain('/press')
    expect(source).toContain('canonical')
  })

  it('page.tsx renders DataLayerEvent', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('DataLayerEvent')
  })

  it('page.tsx renders PressSchema', () => {
    const source = readFile(PAGE_FILE)
    expect(source).toContain('PressSchema')
  })

  for (const section of SECTIONS) {
    it(`page.tsx renders <${section}`, () => {
      const source = readFile(PAGE_FILE)
      expect(source).toContain(`<${section}`)
    })
  }
})

describe('/press config data', () => {
  it('press-data.ts exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), DATA_FILE))).toBe(true)
  })

  it('exports PressArticle interface with required fields', () => {
    const source = readFile(DATA_FILE)
    expect(source).toContain('PressArticle')
    expect(source).toContain('id')
    expect(source).toContain('title')
    expect(source).toContain('publication')
    expect(source).toContain('author')
    expect(source).toContain('publishedDate')
    expect(source).toContain('description')
    expect(source).toContain('url')
    expect(source).toContain('thumbnailSrc')
    expect(source).toContain('thumbnailAlt')
  })

  it('exports pressArticles array', () => {
    const source = readFile(DATA_FILE)
    expect(source).toContain('pressArticles')
    expect(source).toContain('ReadonlyArray<PressArticle>')
  })

  it('uses null for optional author (not undefined)', () => {
    const source = readFile(DATA_FILE)
    expect(source).toContain('string | null')
  })
})

describe('/press schema structured data', () => {
  it('PressSchema.tsx exists', () => {
    expect(fs.existsSync(path.join(process.cwd(), SCHEMA_FILE))).toBe(true)
  })

  it('contains application/ld+json script', () => {
    const source = readFile(SCHEMA_FILE)
    expect(source).toContain('application/ld+json')
  })

  it('uses CollectionPage type', () => {
    const source = readFile(SCHEMA_FILE)
    expect(source).toContain('CollectionPage')
  })

  it('uses NewsArticle type', () => {
    const source = readFile(SCHEMA_FILE)
    expect(source).toContain('NewsArticle')
  })

  it('uses BreadcrumbList type', () => {
    const source = readFile(SCHEMA_FILE)
    expect(source).toContain('BreadcrumbList')
  })
})

describe('/press sections barrel export', () => {
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

describe('/press section files exist', () => {
  for (const section of SECTIONS) {
    it(`${section}.tsx exists`, () => {
      const filePath = path.join(process.cwd(), `app/press/sections/${section}.tsx`)
      expect(fs.existsSync(filePath), `Missing: ${section}.tsx`).toBe(true)
    })
  }
})

describe('/press navigation integration', () => {
  it('footerNavLinks includes /press', () => {
    const source = readFile(NAV_FILE)
    expect(source).toMatch(/footerNavLinks[\s\S]*\/press/)
  })
})

describe('/press sitemap', () => {
  it('sitemap includes /press', () => {
    const source = readFile(SITEMAP_FILE)
    expect(source).toContain('/press')
  })
})

describe('/press brand compliance', () => {
  // DATA_FILE excluded — it contains third-party article titles and descriptions
  const contentFiles = [
    PAGE_FILE,
    SCHEMA_FILE,
    ...SECTIONS.map((s) => `app/press/sections/${s}.tsx`),
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
