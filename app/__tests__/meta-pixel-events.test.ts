import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Meta Pixel Event Tracking — TDD Tests
 *
 * Verifies that key pages push dataLayer events for GTM to forward
 * to Meta Pixel as standard events (ViewContent, Lead, CompleteRegistration, Contact).
 *
 * The Meta Pixel itself is configured in GTM (not hardcoded). These tests ensure
 * the codebase pushes the right dataLayer events that GTM will map to fbq() calls.
 */

// --- File paths ---
const RESIDENCES_PAGE = path.resolve(__dirname, '../residences/page.tsx')
const FLOOR_PLANS_PAGE = path.resolve(__dirname, '../floor-plans/page.tsx')
const GALLERY_PAGE = path.resolve(__dirname, '../gallery/page.tsx')
const NEIGHBORHOOD_PAGE = path.resolve(__dirname, '../neighborhood/page.tsx')
const THANK_YOU_PAGE = path.resolve(__dirname, '../thank-you/page.tsx')
const THANK_YOU_FLOOR_PLANS = path.resolve(__dirname, '../thank-you-floor-plans/page.tsx')
const THANK_YOU_BROCHURE = path.resolve(__dirname, '../thank-you-brochure/page.tsx')
const CONTACT_MODAL = path.resolve(__dirname, '../../components/ContactModal.tsx')
const NEXT_CONFIG = path.resolve(__dirname, '../../next.config.ts')

describe('Meta Pixel — ViewContent events on key pages', () => {
  const viewContentPages = [
    { name: 'Residences', file: RESIDENCES_PAGE, contentName: 'Residences' },
    { name: 'Floor Plans', file: FLOOR_PLANS_PAGE, contentName: 'Floor Plans' },
    { name: 'Gallery', file: GALLERY_PAGE, contentName: 'Gallery' },
    { name: 'Neighborhood', file: NEIGHBORHOOD_PAGE, contentName: 'Neighborhood' },
  ]

  for (const { name, file, contentName } of viewContentPages) {
    it(`${name} page pushes view_content event to dataLayer`, () => {
      const source = fs.readFileSync(file, 'utf-8')
      expect(source, `${name} page missing view_content dataLayer push`).toContain('view_content')
    })
  }
})

describe('Meta Pixel — Conversion events on thank-you pages', () => {
  it('thank-you page pushes lead_conversion event to dataLayer', () => {
    const source = fs.readFileSync(THANK_YOU_PAGE, 'utf-8')
    expect(source, 'Missing lead_conversion dataLayer push on /thank-you').toContain('lead_conversion')
  })

  it('thank-you-floor-plans pushes floor_plans_conversion event to dataLayer', () => {
    const source = fs.readFileSync(THANK_YOU_FLOOR_PLANS, 'utf-8')
    expect(source, 'Missing floor_plans_conversion dataLayer push on /thank-you-floor-plans').toContain('floor_plans_conversion')
  })

  it('thank-you-brochure pushes brochure_conversion event to dataLayer', () => {
    const source = fs.readFileSync(THANK_YOU_BROCHURE, 'utf-8')
    expect(source, 'Missing brochure_conversion dataLayer push on /thank-you-brochure').toContain('brochure_conversion')
  })
})

describe('Meta Pixel — Contact intent tracking', () => {
  it('ContactModal pushes contact_intent event when modal opens', () => {
    const source = fs.readFileSync(CONTACT_MODAL, 'utf-8')
    expect(source, 'Missing contact_intent dataLayer push on ContactModal open').toContain('contact_intent')
  })
})

describe('Meta Pixel — CSP allows Facebook domains', () => {
  it('next.config.ts allows connect.facebook.net in script-src', () => {
    const source = fs.readFileSync(NEXT_CONFIG, 'utf-8')
    expect(source).toContain('connect.facebook.net')
  })

  it('next.config.ts allows facebook.com domains in connect-src', () => {
    const source = fs.readFileSync(NEXT_CONFIG, 'utf-8')
    expect(source).toContain('facebook.com')
  })
})
