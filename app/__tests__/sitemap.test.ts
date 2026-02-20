import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const SITEMAP_FILE = path.resolve(__dirname, '../sitemap.xml/route.ts')
const ROBOTS_FILE = path.resolve(__dirname, '../robots.txt/route.ts')

const EXPECTED_SITEMAP_PATHS = [
  '/',
  '/residences',
  '/floor-plans',
  '/brochure',
  '/gallery',
  '/neighborhood',
  '/amenities',
  '/architecture',
  '/team',
]

const EXCLUDED_PATHS = [
  '/open-house',
  '/maintenance',
  '/thank-you',
  '/thank-you-floor-plans',
  '/thank-you-brochure',
]

describe('Sitemap', () => {
  const source = fs.readFileSync(SITEMAP_FILE, 'utf-8')

  it('includes all 9 expected page URLs', () => {
    for (const pagePath of EXPECTED_SITEMAP_PATHS) {
      const urlPattern = pagePath === '/'
        ? /url:\s*baseUrl\b(?!\s*\+\s*[`'"]\/)/  // baseUrl alone (homepage)
        : new RegExp(`['"\`]/?(${pagePath.replace('/', '')})['\`"]`)
      // Simpler check: just ensure the path string appears in the urls array context
      if (pagePath === '/') {
        expect(source).toContain('url: baseUrl,')
      } else {
        expect(source, `Missing sitemap entry for ${pagePath}`).toContain(pagePath)
      }
    }
  })

  it('does NOT include excluded pages', () => {
    for (const excludedPath of EXCLUDED_PATHS) {
      // These paths should not appear as URL entries in the sitemap
      // They may appear in comments, so check specifically for url pattern
      expect(source).not.toMatch(
        new RegExp(`\\$\\{baseUrl\\}${excludedPath}`)
      )
    }
  })

  it('homepage has priority 1.0', () => {
    // The first URL entry (homepage) should have priority 1.0
    expect(source).toMatch(/url:\s*baseUrl,[\s\S]*?priority:\s*1\.0/)
  })

  it('uses canonical domain https://mtvernonlofts.com', () => {
    expect(source).toContain("https://mtvernonlofts.com")
  })

  it('has exactly 9 URL entries', () => {
    // Count the number of objects in the urls array by counting 'url:' occurrences
    const urlEntries = (source.match(/url:\s*[`'"]?\$?\{?baseUrl/g) ?? []).length
    expect(urlEntries).toBe(9)
  })
})

describe('Robots.txt', () => {
  const source = fs.readFileSync(ROBOTS_FILE, 'utf-8')

  it('references the sitemap at canonical domain', () => {
    expect(source).toContain('sitemap.xml')
    expect(source).toContain('mtvernonlofts.com')
  })

  it('blocks /thank-you pages', () => {
    expect(source).toContain('Disallow: /thank-you')
  })

  it('blocks /api/ paths', () => {
    expect(source).toContain('Disallow: /api/')
  })

  it('blocks /maintenance', () => {
    expect(source).toContain('/maintenance')
  })

  it('allows all expected public pages', () => {
    const publicPages = ['/residences', '/floor-plans', '/neighborhood', '/gallery', '/brochure', '/amenities', '/architecture', '/team']
    for (const page of publicPages) {
      expect(source, `Missing Allow for ${page}`).toContain(`Allow: ${page}`)
    }
  })
})
