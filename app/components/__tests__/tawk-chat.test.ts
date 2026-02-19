import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const TAWK_COMPONENT = path.resolve(__dirname, '../TawkChat.tsx')
const DEFERRED_SCRIPTS = path.resolve(__dirname, '../../../components/DeferredScripts.tsx')
const NEXT_CONFIG = path.resolve(__dirname, '../../../next.config.ts')
const VERCEL_JSON = path.resolve(__dirname, '../../../vercel.json')

const TAWK_EMBED_URL = 'https://embed.tawk.to/6997607e8e6a0f1c3404e03d/1jhrl1rmn'

describe('Tawk.to chat widget', () => {
  describe('TawkChat component', () => {
    it('TawkChat.tsx exists', () => {
      expect(fs.existsSync(TAWK_COMPONENT)).toBe(true)
    })

    it('loads the correct Tawk.to embed URL', () => {
      const source = fs.readFileSync(TAWK_COMPONENT, 'utf-8')
      expect(source).toContain(TAWK_EMBED_URL)
    })

    it('does NOT reference Reamaze or GoDaddy', () => {
      const source = fs.readFileSync(TAWK_COMPONENT, 'utf-8')
      expect(source).not.toContain('reamaze')
      expect(source).not.toContain('GoDaddy')
      expect(source).not.toContain('_support')
    })
  })

  describe('DeferredScripts loads Tawk.to on all devices', () => {
    it('imports TawkChat, not GoDaddyChat', () => {
      const source = fs.readFileSync(DEFERRED_SCRIPTS, 'utf-8')
      expect(source).toContain('TawkChat')
      expect(source).not.toContain('GoDaddyChat')
    })

    it('renders TawkChat without a mobile gate', () => {
      const source = fs.readFileSync(DEFERRED_SCRIPTS, 'utf-8')
      // Should render <TawkChat /> unconditionally — no !isMobile check wrapping it
      expect(source).toContain('<TawkChat />')
      expect(source).not.toMatch(/!isMobile\s*&&\s*<TawkChat/)
    })
  })

  describe('CSP rules allow Tawk.to and block Reamaze', () => {
    it('next.config.ts includes tawk.to domains in CSP', () => {
      const source = fs.readFileSync(NEXT_CONFIG, 'utf-8')
      expect(source).toContain('https://embed.tawk.to')
      expect(source).toContain('https://*.tawk.to')
      expect(source).toContain('wss://*.tawk.to')
    })

    it('next.config.ts does NOT reference reamaze domains', () => {
      const source = fs.readFileSync(NEXT_CONFIG, 'utf-8')
      expect(source).not.toContain('reamaze')
    })

    it('vercel.json includes tawk.to domains in CSP', () => {
      const source = fs.readFileSync(VERCEL_JSON, 'utf-8')
      expect(source).toContain('https://embed.tawk.to')
      expect(source).toContain('https://*.tawk.to')
      expect(source).toContain('wss://*.tawk.to')
    })

    it('vercel.json does NOT reference reamaze domains', () => {
      const source = fs.readFileSync(VERCEL_JSON, 'utf-8')
      expect(source).not.toContain('reamaze')
    })
  })

  describe('GoDaddyChat component is removed', () => {
    it('GoDaddyChat.tsx does not exist', () => {
      const oldComponent = path.resolve(__dirname, '../GoDaddyChat.tsx')
      expect(fs.existsSync(oldComponent)).toBe(false)
    })
  })
})
