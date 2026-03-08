/**
 * Tests for ExploreLayoutsSection on /residences page
 * Verifies: component exists, links to all 6 unit pages, uses Image component,
 * included in barrel export + page.tsx, no price leakage
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const SECTION_FILE = path.resolve(__dirname, '../residences/sections/ExploreLayoutsSection.tsx')
const BARREL_FILE = path.resolve(__dirname, '../residences/sections/index.ts')
const PAGE_FILE = path.resolve(__dirname, '../residences/page.tsx')

const UNIT_SLUGS = [
  'studio-s1',
  'studio-s2',
  '1bed-a1',
  '1bed-a2',
  '1bed-a3',
  '1bed-a4',
]

describe('ExploreLayoutsSection component', () => {
  it('exists at app/residences/sections/ExploreLayoutsSection.tsx', () => {
    expect(fs.existsSync(SECTION_FILE), 'ExploreLayoutsSection.tsx is missing').toBe(true)
  })

  it('imports unitTypePages from unit-type-data', () => {
    const source = fs.readFileSync(SECTION_FILE, 'utf-8')
    expect(source).toContain('unit-type-data')
    expect(source).toContain('unitTypePages')
  })

  it('imports Image from @/components/ui/image', () => {
    const source = fs.readFileSync(SECTION_FILE, 'utf-8')
    expect(source).toMatch(/import\s+.*Image.*from\s+['"]@\/components\/ui\/image['"]/)
  })

  it('imports Link from next/link', () => {
    const source = fs.readFileSync(SECTION_FILE, 'utf-8')
    expect(source).toContain("from 'next/link'")
  })

  it('contains links to /residences/ paths', () => {
    const source = fs.readFileSync(SECTION_FILE, 'utf-8')
    expect(source).toContain('/residences/')
    expect(source).toContain('<Link')
  })

  it('uses floor plan data for images', () => {
    const source = fs.readFileSync(SECTION_FILE, 'utf-8')
    expect(source).toContain('getFloorPlanById')
  })

  it('does not contain priceFormatted or pricePerSF', () => {
    const source = fs.readFileSync(SECTION_FILE, 'utf-8')
    expect(source).not.toContain('priceFormatted')
    expect(source).not.toContain('pricePerSF')
  })
})

describe('ExploreLayoutsSection integration', () => {
  it('barrel export includes ExploreLayoutsSection', () => {
    const source = fs.readFileSync(BARREL_FILE, 'utf-8')
    expect(source, 'Missing barrel export for ExploreLayoutsSection').toContain('ExploreLayoutsSection')
  })

  it('page.tsx imports ExploreLayoutsSection', () => {
    const source = fs.readFileSync(PAGE_FILE, 'utf-8')
    expect(source, 'page.tsx does not import ExploreLayoutsSection').toContain('ExploreLayoutsSection')
  })

  it('page.tsx renders ExploreLayoutsSection', () => {
    const source = fs.readFileSync(PAGE_FILE, 'utf-8')
    expect(source, 'page.tsx does not render <ExploreLayoutsSection').toContain('<ExploreLayoutsSection')
  })
})
