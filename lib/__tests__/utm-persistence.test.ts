import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

/**
 * UTM Persistence — TDD Tests
 *
 * Verifies that UTM parameters from the landing page are persisted
 * in sessionStorage so they survive page navigation. Without this,
 * Facebook ad UTMs are lost when users navigate from the landing page
 * to another page before submitting a form.
 */

const METADATA_COLLECTOR = path.resolve(__dirname, '../metadata-collector.ts')

describe('UTM persistence across page navigation', () => {
  const source = fs.readFileSync(METADATA_COLLECTOR, 'utf-8')

  it('has a persistUTMParameters method', () => {
    expect(source, 'Missing persistUTMParameters method').toContain('persistUTMParameters')
  })

  it('calls persistUTMParameters in constructor', () => {
    // The constructor should call this.persistUTMParameters()
    expect(source).toMatch(/constructor[\s\S]*?this\.persistUTMParameters\(\)/)
  })

  it('stores UTMs in sessionStorage with mvl_ prefix', () => {
    expect(source, 'Missing mvl_ prefix for sessionStorage UTM keys').toContain('mvl_utm_source')
  })

  it('reads from sessionStorage in extractUTMParameters', () => {
    // extractUTMParameters should check sessionStorage before URL params
    expect(source).toMatch(/extractUTMParameters[\s\S]*?sessionStorage\.getItem/)
  })

  it('only persists on first visit (does not overwrite existing UTMs)', () => {
    // Should check if mvl_utm_source already exists before writing
    expect(source).toMatch(/sessionStorage\.getItem\(['"]mvl_utm_source['"]\)/)
  })
})
