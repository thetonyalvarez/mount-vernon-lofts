import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { NextRequest } from 'next/server'
import { _resetRateLimitStore } from '@/lib/spam-protection'

// ---- Module mocks (hoisted) ----

const mockSendMail = vi.fn().mockResolvedValue({ messageId: 'mock-msg-id' })

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: mockSendMail,
    }),
  },
}))

vi.mock('@/lib/email-fallback', () => ({
  emailFallback: {
    isConfigured: vi.fn().mockReturnValue(false),
    sendWebhookFailureNotification: vi.fn().mockResolvedValue(true),
  },
}))

vi.mock('@/app/config/contact', () => ({
  CONTACT_CONFIG: {
    subjects: {
      brochureLead: (name: string) => `Brochure Lead: ${name}`,
      brochureDelivery: () => 'Your Mount Vernon Lofts Brochure',
    },
    floorPlansPdfUrl: 'https://example.com/brochure.pdf',
    email: 'info@mtvernonlofts.com',
    phone: '555-000-0000',
    companyName: 'Mount Vernon Lofts',
    tagline: 'Montrose ownership, finally within reach.',
    location: '4509 Mount Vernon, Houston, TX 77006',
  },
}))

// ---- Helpers ----

function buildRequest(body: unknown): NextRequest {
  return new Request('http://localhost/api/brochure-download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }) as unknown as NextRequest
}

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    formData: {
      name: 'Chris Lee',
      email: 'chris@example.com',
      phone: '555-777-6666',
      brochureInterest: 'all',
      ...((overrides.formData as Record<string, unknown>) ?? {}),
    },
    metadata: {
      modalId: 'brochure_modal',
      modalTriggerSource: 'brochure_cta',
      siteUrl: 'https://mtvernonlofts.com',
      submissionId: 'br_sub_001',
      ...((overrides.metadata as Record<string, unknown>) ?? {}),
    },
  }
}

// ---- Tests ----

describe('POST /api/brochure-download', () => {
  beforeEach(() => {
    _resetRateLimitStore()
    vi.stubGlobal('fetch', vi.fn())
    vi.stubEnv('CONTACT_WEBHOOK_URL', '')
    vi.stubEnv('GMAIL_USER', '')
    vi.stubEnv('GMAIL_APP_PASSWORD', '')
    vi.stubEnv('EMAIL_FALLBACK_ENABLED', 'false')
    mockSendMail.mockClear()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  // ──────────── A: Validation ────────────

  describe('Validation — missing fields', () => {
    it('A1: returns 400 when name is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest(validPayload({ formData: { name: '' } })),
      )
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('Missing required fields')
    })

    it('A2: returns 400 when email is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest(validPayload({ formData: { email: '' } })),
      )
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('Missing required fields')
    })

    it('A3: returns 400 when phone is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest(validPayload({ formData: { phone: '' } })),
      )
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('Missing required fields')
    })

    it('A4: returns 400 when brochureInterest is missing', async () => {
      const { POST } = await import('../route')
      const res = await POST(
        buildRequest(validPayload({ formData: { brochureInterest: '' } })),
      )
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toBe('Missing required fields')
    })
  })

  // ──────────── B: Success path (email not configured) ────────────

  describe('Success — email not configured', () => {
    it('B1: returns 200 with success:true', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(validPayload()))
      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json.success).toBe(true)
    })

    it('B2: response message is correct', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(validPayload()))
      const json = await res.json()
      expect(json.message).toBe('Brochure request processed successfully')
    })

    it('B3: response includes submissionId from metadata', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(validPayload()))
      const json = await res.json()
      expect(json.submissionId).toBe('br_sub_001')
    })
  })

  // ──────────── C: Success path (email configured) ────────────

  describe('Success — email configured', () => {
    beforeEach(async () => {
      vi.stubEnv('GMAIL_USER', 'test@gmail.com')
      vi.stubEnv('GMAIL_APP_PASSWORD', 'test-password')
      vi.stubEnv('EMAIL_FALLBACK_ENABLED', 'true')

      // Make emailFallback.isConfigured return true for these tests
      const { emailFallback } = await import('@/lib/email-fallback')
      vi.mocked(emailFallback.isConfigured).mockReturnValue(true)
    })

    it('C1: returns 200 when email is configured and nodemailer succeeds', async () => {
      const { POST } = await import('../route')
      const res = await POST(buildRequest(validPayload()))
      expect(res.status).toBe(200)
    })

    it('C2: nodemailer sendMail called twice (lead notif + user delivery)', async () => {
      const { POST } = await import('../route')
      await POST(buildRequest(validPayload()))
      expect(mockSendMail).toHaveBeenCalledTimes(2)
    })
  })

  // ──────────── D: Webhook behaviour ────────────

  describe('Webhook delivery', () => {
    it('D1: no fetch call when webhook URL is not set', async () => {
      const mockFetch = vi.fn()
      vi.stubGlobal('fetch', mockFetch)

      const { POST } = await import('../route')
      await POST(buildRequest(validPayload()))
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('D2: returns 200 when webhook URL is set and fetch succeeds', async () => {
      vi.stubEnv('CONTACT_WEBHOOK_URL', 'https://hooks.example.com/catch')
      const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 200 })
      vi.stubGlobal('fetch', mockFetch)

      const { POST } = await import('../route')
      const res = await POST(buildRequest(validPayload()))
      expect(res.status).toBe(200)
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  // ──────────── E: Error handling ────────────

  describe('Error handling', () => {
    it('E1: returns 500 for malformed body (no formData key)', async () => {
      const { POST } = await import('../route')
      // payload missing formData → destructure blows up → catch → 500
      const res = await POST(
        buildRequest({ name: 'x', email: 'x@x.com', phone: '1', brochureInterest: 'all' }),
      )
      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json.error).toBe('Failed to process brochure request')
    })
  })
})
