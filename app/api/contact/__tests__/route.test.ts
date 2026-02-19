import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { NextRequest } from 'next/server'

// ---- Module mocks (hoisted) ----

vi.mock('@/lib/backup-manager', () => ({
  backupManager: {
    storeSubmission: vi.fn().mockResolvedValue(true),
    updateWebhookStatus: vi.fn().mockResolvedValue(true),
    getBackupSummary: vi.fn().mockResolvedValue({
      totalSubmissions: 0,
      pendingWebhooks: 0,
      failedWebhooks: 0,
      deliveredWebhooks: 0,
    }),
  },
}))

vi.mock('@/lib/email-fallback', () => ({
  emailFallback: {
    isConfigured: vi.fn().mockReturnValue(false),
    sendWebhookFailureNotification: vi.fn().mockResolvedValue(true),
    sendLeadNotification: vi.fn().mockResolvedValue(true),
  },
}))

vi.mock('@/lib/ip-anonymizer', () => ({
  default: {
    processIPForWebhook: vi.fn().mockResolvedValue({
      anonymizedIp: '127.0.0.XXX',
      timezone: 'UTC',
    }),
  },
}))

// ---- Helpers ----

function buildRequest(body: unknown): NextRequest {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }) as unknown as NextRequest
}

function buildLegacyBody(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-123-4567',
    message: 'I am interested in a studio.',
    ...overrides,
  }
}

function buildEnhancedBody(overrides: Record<string, unknown> = {}) {
  return {
    formData: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-123-4567',
      message: 'I am interested in a studio.',
    },
    metadata: {
      modalId: 'contact_modal',
      modalTriggerSource: 'hero_cta',
      siteUrl: 'https://mtvernonlofts.com',
      submissionId: 'test_sub_001',
    },
    ...overrides,
  }
}

// ---- Tests ----

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    vi.stubEnv('CONTACT_WEBHOOK_URL', '')
    vi.stubEnv('CONTACT_WEBHOOK_URL_TEST', '')
    vi.stubEnv('WEBHOOK_TEST_MODE', 'false')
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  // ──────────── A: Validation ────────────

  describe('Validation — missing fields', () => {
    it('A1: returns 400 when name is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody({ name: '' })))
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('All fields are required')
    })

    it('A2: returns 400 when email is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody({ email: '' })))
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('All fields are required')
    })

    it('A3: returns 400 when phone is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody({ phone: '' })))
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('All fields are required')
    })

    it('A4: returns 400 when message is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody({ message: '' })))
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('All fields are required')
    })

    it('A5: returns 400 when all fields are empty strings', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest({ name: '', email: '', phone: '', message: '' }),
      )
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('All fields are required')
    })
  })

  describe('Validation — email format', () => {
    it('A6: returns 400 for plain word "notanemail"', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest(buildLegacyBody({ email: 'notanemail' })),
      )
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('Invalid email format')
    })

    it('A7: returns 400 for "missing@domain" (no TLD)', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest(buildLegacyBody({ email: 'missing@domain' })),
      )
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('Invalid email format')
    })

    it('A8: accepts "user+tag@sub.domain.com" as valid', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest(buildLegacyBody({ email: 'user+tag@sub.domain.com' })),
      )
      expect(res.status).toBe(200)
    })
  })

  // ──────────── B: Legacy success path ────────────

  describe('Legacy payload — success', () => {
    it('B1: returns 200 with success:true for valid body (no webhook)', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody()))
      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json.success).toBe(true)
    })

    it('B2: response includes a submissionId string', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody()))
      const json = await res.json()
      expect(typeof json.submissionId).toBe('string')
      expect(json.submissionId.length).toBeGreaterThan(0)
    })

    it('B3: webhookDelivered is false when no webhook URL is set', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody()))
      const json = await res.json()
      expect(json.webhookDelivered).toBe(false)
    })
  })

  // ──────────── C: Enhanced payload ────────────

  describe('Enhanced payload — success', () => {
    it('C1: returns 200 with success:true for enhanced body', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildEnhancedBody()))
      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json.success).toBe(true)
    })

    it('C2: uses submissionId from metadata', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildEnhancedBody()))
      const json = await res.json()
      expect(json.submissionId).toBe('test_sub_001')
    })
  })

  // ──────────── D: Webhook delivery ────────────

  describe('Webhook delivery', () => {
    it('D1: webhookDelivered is true when fetch succeeds', async () => {
      vi.stubEnv('CONTACT_WEBHOOK_URL', 'https://hooks.example.com/catch')
      const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 200, statusText: 'OK' })
      vi.stubGlobal('fetch', mockFetch)

      const { POST } = await import('../route')
      const res = await POST(buildRequest(buildLegacyBody()))
      const json = await res.json()
      expect(json.webhookDelivered).toBe(true)
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('D2: webhookDelivered is false when fetch always fails (retries exhausted)', async () => {
      vi.stubEnv('CONTACT_WEBHOOK_URL', 'https://hooks.example.com/catch')
      const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
      vi.stubGlobal('fetch', mockFetch)

      const { POST } = await import('../route')

      // The route uses exponential backoff with setTimeout — advance timers
      const promise = POST(buildRequest(buildLegacyBody()))
      // Run all pending timers to flush the retry delays
      await vi.runAllTimersAsync()

      const res = await promise
      const json = await res.json()
      expect(json.webhookDelivered).toBe(false)
      // 5 retries
      expect(mockFetch).toHaveBeenCalledTimes(5)
    })

    it('D3: backupManager.storeSubmission is called on every request', async () => {
      const { backupManager } = await import('@/lib/backup-manager')
      // Clear accumulated calls from prior tests sharing the mock singleton
      vi.mocked(backupManager.storeSubmission).mockClear()

      const { POST } = await import('../route')
      await POST(buildRequest(buildLegacyBody()))
      expect(backupManager.storeSubmission).toHaveBeenCalledTimes(1)
    })
  })

  // ──────────── E: Error handling ────────────

  describe('Error handling', () => {
    it('E1: returns 500 for malformed JSON body', async () => {
      const { POST } = await import('../route')
      // Create a request whose .json() will throw
      const badReq = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{{invalid json',
      }) as unknown as NextRequest

      const res = await POST(badReq)
      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json.error).toBe('Internal server error')
    })
  })
})
