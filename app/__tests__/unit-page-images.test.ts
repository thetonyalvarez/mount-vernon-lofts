/**
 * Tests for unit type page images, embeds, and pricing restrictions
 * Verifies: hero image, Matterport CSP, floor plan paths, compare layout images,
 * no list prices or $/SF in user-facing content
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const NEXT_CONFIG_FILE = path.resolve(__dirname, '../../next.config.ts')
const VERCEL_JSON_FILE = path.resolve(__dirname, '../../vercel.json')
const UNIT_TYPE_DATA_FILE = path.resolve(__dirname, '../config/unit-type-data.ts')
const HERO_FILE = path.resolve(__dirname, '../residences/[slug]/sections/UnitHeroSection.tsx')
const FLOOR_PLAN_DATA_FILE = path.resolve(__dirname, '../config/floor-plan-data.ts')
const COMPARE_SECTION_FILE = path.resolve(__dirname, '../residences/[slug]/sections/CompareLayoutsSection.tsx')
const FLOOR_PLAN_SECTION_FILE = path.resolve(__dirname, '../residences/[slug]/sections/FloorPlanSection.tsx')
const GALLERY_SECTION_FILE = path.resolve(__dirname, '../residences/[slug]/sections/UnitGallerySection.tsx')
const SCHEMA_FILE = path.resolve(__dirname, '../residences/[slug]/sections/UnitSchema.tsx')

// List prices that must NOT appear in body copy, SEO, headlines, or rendered UI
const BANNED_PRICES = [
  '$237,585', '$252,033', '$252,736', '$271,522', '$278,851',
  '$237K', '$252K', '$271K', '$278K',
  // Note: $175,000 and $175K intentionally NOT banned — S1 Investor Special pricing is used in body copy
]
// Price-per-SF patterns that must NOT appear in body copy or rendered UI
const BANNED_PSF = ['$286/SF', '$337/SF', '$352/SF', '$349/SF', '$286 per square foot']

describe('Matterport CSP', () => {
  const configSource = fs.readFileSync(NEXT_CONFIG_FILE, 'utf-8')
  const vercelSource = fs.readFileSync(VERCEL_JSON_FILE, 'utf-8')

  it('next.config.ts allows my.matterport.com in frame-src directive', () => {
    expect(configSource).toContain('my.matterport.com')
  })

  it('next.config.ts frame-src includes matterport domain', () => {
    const frameSrcMatch = configSource.match(/frame-src\s+([^;]+);/)
    expect(frameSrcMatch).not.toBeNull()
    const frameSrc = frameSrcMatch![1]
    expect(frameSrc).toMatch(/matterport/)
  })

  it('vercel.json frame-src includes matterport domains', () => {
    // vercel.json headers override next.config.ts — both must have Matterport
    expect(vercelSource).toContain('my.matterport.com')
    expect(vercelSource).toContain('*.matterport.com')
  })
})

describe('Hero section image rendering', () => {
  const heroSource = fs.readFileSync(HERO_FILE, 'utf-8')

  it('uses Next.js Image component, not CSS backgroundImage', () => {
    // CSS backgroundImage bypasses the S3 URL transformation in production.
    // The hero must use the Image component to render correctly in all environments.
    expect(heroSource).not.toContain('backgroundImage')
    expect(heroSource).not.toContain('background-image')
  })

  it('imports Image from @/components/ui/image', () => {
    expect(heroSource).toMatch(/import\s+.*Image.*from\s+['"]@\/components\/ui\/image['"]/)
  })

  it('renders an <Image component for the hero photo', () => {
    // Should contain <Image with fill prop for the hero background
    expect(heroSource).toContain('<Image')
    expect(heroSource).toContain('fill')
  })
})

describe('Floor plan image paths', () => {
  const dataSource = fs.readFileSync(FLOOR_PLAN_DATA_FILE, 'utf-8')

  it('floor plan image paths do not contain unencoded spaces', () => {
    // Extract all image path strings from floor-plan-data.ts
    const imageMatches = dataSource.match(/image:\s*['"]([^'"]+)['"]/g) ?? []
    expect(imageMatches.length).toBeGreaterThan(0)

    for (const match of imageMatches) {
      const pathValue = match.match(/['"]([^'"]+)['"]/)![1]
      // Path should not contain raw spaces — use hyphens or URL encoding
      expect(pathValue, `Image path "${pathValue}" contains spaces`).not.toMatch(/ /)
    }
  })

  it('all floor plan images exist on disk', () => {
    const imageMatches = dataSource.match(/image:\s*['"]([^'"]+)['"]/g) ?? []

    for (const match of imageMatches) {
      const imagePath = match.match(/['"]([^'"]+)['"]/)![1]
      const fullPath = path.resolve(__dirname, '../../public', imagePath.replace(/^\//, ''))
      expect(fs.existsSync(fullPath), `Missing floor plan image: ${fullPath}`).toBe(true)
    }
  })
})

describe('Section components use Image from @/components/ui/image', () => {
  const sections = [
    { name: 'FloorPlanSection', file: FLOOR_PLAN_SECTION_FILE },
    { name: 'CompareLayoutsSection', file: COMPARE_SECTION_FILE },
    { name: 'UnitGallerySection', file: GALLERY_SECTION_FILE },
  ]

  for (const { name, file } of sections) {
    it(`${name} imports Image from @/components/ui/image`, () => {
      const source = fs.readFileSync(file, 'utf-8')
      expect(source).toMatch(/import\s+.*Image.*from\s+['"]@\/components\/ui\/image['"]/)
    })
  }
})

describe('No list prices or $/SF in user-facing content', () => {
  const unitDataSource = fs.readFileSync(UNIT_TYPE_DATA_FILE, 'utf-8')

  // Extract only body copy paragraphs, headlines, and SEO fields — NOT data fields like priceFormatted
  const bodyParagraphs = unitDataSource.match(/paragraphs:\s*\[([\s\S]*?)\]/g) ?? []
  const headlines = unitDataSource.match(/headline:\s*'([^']+)'/g) ?? []
  const seoTitles = unitDataSource.match(/title:\s*'([^']+)'/g) ?? []
  const seoDescriptions = unitDataSource.match(/description:\s*'([^']+)'/g) ?? []
  const ogTitles = unitDataSource.match(/ogTitle:\s*'([^']+)'/g) ?? []
  const ogDescriptions = unitDataSource.match(/ogDescription:\s*'([^']+)'/g) ?? []

  const allContent = [
    ...bodyParagraphs,
    ...headlines,
    ...seoTitles,
    ...seoDescriptions,
    ...ogTitles,
    ...ogDescriptions,
  ].join('\n')

  for (const price of BANNED_PRICES) {
    it(`body/SEO content does not contain list price "${price}"`, () => {
      expect(allContent, `Found banned price ${price} in body/SEO content`).not.toContain(price)
    })
  }

  for (const psf of BANNED_PSF) {
    it(`body/SEO content does not contain price-per-SF "${psf}"`, () => {
      expect(allContent, `Found banned $/SF ${psf} in body/SEO content`).not.toContain(psf)
    })
  }

  it('hero section does not render priceFormatted', () => {
    const heroSource = fs.readFileSync(HERO_FILE, 'utf-8')
    expect(heroSource).not.toContain('priceFormatted')
    expect(heroSource).not.toContain('pricePerSF')
  })

  it('compare layouts section does not render priceFormatted', () => {
    const compareSource = fs.readFileSync(COMPARE_SECTION_FILE, 'utf-8')
    expect(compareSource).not.toContain('priceFormatted')
    expect(compareSource).not.toContain('pricePerSF')
  })

  it('schema does not include price or priceCurrency', () => {
    const schemaSource = fs.readFileSync(SCHEMA_FILE, 'utf-8')
    expect(schemaSource).not.toContain('priceCurrency')
    expect(schemaSource).not.toMatch(/price:\s*String/)
  })
})
