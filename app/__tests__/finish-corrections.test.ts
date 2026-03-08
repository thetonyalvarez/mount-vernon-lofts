/**
 * Finish Description Corrections — Regression Tests
 *
 * Photo verification confirmed:
 * 1. "European-style cabinetry" is wrong — units have classic shaker cabinetry
 * 2. "Tile backsplash" does not exist — remove all mentions
 */
import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const readFile = (relativePath: string): string =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf-8')

/** All files that contain user-facing finish descriptions */
const FINISH_FILES = [
  'app/config/unit-type-data.ts',
  'app/config/features-finishes.ts',
  'app/config/architecture-interiors.ts',
  'app/config/gallery-data.ts',
  'app/residences/sections/HandcraftedLegacySection.tsx',
  'app/open-house/page.tsx',
]

/** Schema / structured data files */
const SCHEMA_FILES = [
  'app/residences/[slug]/sections/UnitSchema.tsx',
  'app/components/metadata/EnhancedMetadata.tsx',
]

describe('Cabinetry description — no "European-style"', () => {
  for (const file of [...FINISH_FILES, ...SCHEMA_FILES]) {
    it(`${file} does not contain "European-style cabinetry"`, () => {
      const source = readFile(file)
      expect(source.toLowerCase()).not.toContain('european-style cabinetry')
    })
  }
})

describe('Cabinetry description — uses "classic shaker"', () => {
  const FILES_THAT_MUST_MENTION_CABINETRY = [
    'app/config/unit-type-data.ts',
    'app/config/features-finishes.ts',
    'app/config/architecture-interiors.ts',
    'app/residences/sections/HandcraftedLegacySection.tsx',
  ]

  for (const file of FILES_THAT_MUST_MENTION_CABINETRY) {
    it(`${file} contains "classic shaker cabinetry"`, () => {
      const source = readFile(file)
      expect(source.toLowerCase()).toContain('classic shaker cabinetry')
    })
  }
})

describe('Tile backsplash — fully removed', () => {
  for (const file of [...FINISH_FILES, ...SCHEMA_FILES]) {
    it(`${file} does not contain "tile backsplash"`, () => {
      const source = readFile(file)
      expect(source.toLowerCase()).not.toContain('tile backsplash')
    })
  }
})

describe('Schema structured data corrections', () => {
  it('UnitSchema uses "Classic Shaker Cabinetry"', () => {
    const source = readFile('app/residences/[slug]/sections/UnitSchema.tsx')
    expect(source).toContain('Classic Shaker Cabinetry')
  })

  it('EnhancedMetadata uses "Classic Shaker Cabinetry"', () => {
    const source = readFile('app/components/metadata/EnhancedMetadata.tsx')
    expect(source).toContain('Classic Shaker Cabinetry')
  })

  it('EnhancedMetadata does not contain Tile Backsplash schema entry', () => {
    const source = readFile('app/components/metadata/EnhancedMetadata.tsx')
    expect(source).not.toContain('"Tile Backsplash"')
  })
})
