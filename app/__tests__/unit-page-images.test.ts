/**
 * Tests for unit type page images and embeds
 * Verifies: hero image, Matterport CSP, floor plan paths, compare layout images
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const NEXT_CONFIG_FILE = path.resolve(__dirname, '../../next.config.ts')
const VERCEL_JSON_FILE = path.resolve(__dirname, '../../vercel.json')
const HERO_FILE = path.resolve(__dirname, '../residences/[slug]/sections/UnitHeroSection.tsx')
const FLOOR_PLAN_DATA_FILE = path.resolve(__dirname, '../config/floor-plan-data.ts')
const COMPARE_SECTION_FILE = path.resolve(__dirname, '../residences/[slug]/sections/CompareLayoutsSection.tsx')
const FLOOR_PLAN_SECTION_FILE = path.resolve(__dirname, '../residences/[slug]/sections/FloorPlanSection.tsx')
const GALLERY_SECTION_FILE = path.resolve(__dirname, '../residences/[slug]/sections/UnitGallerySection.tsx')

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
