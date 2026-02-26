/**
 * Enhanced webhook payload types for form submissions
 * Includes comprehensive metadata for sales team insights
 */

export interface FormContactData {
  name: string
  email: string
  phone: string
  message: string
  isBroker?: string
  preferredFloor?: string
}

export interface UTMParameters {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface SessionData {
  pageUrl: string
  referrer: string | null
  timeOnSite: number // milliseconds
  pagesVisited: number
  utmParams: UTMParameters
  landingPage: string
  sessionId: string
}

export interface DeviceInfo {
  userAgent: string
  screenWidth: number
  screenHeight: number
  viewportWidth: number
  viewportHeight: number
  language: string
  timezone: string
  platform: string
  isMobile: boolean
  isTablet: boolean
  cookiesEnabled: boolean
}

export interface FormInteractionMetrics {
  timeToComplete: number // milliseconds from modal open to submit
  fieldInteractionCount: number
  fieldFocusOrder: string[]
  hasTypingPauses: boolean
  formAbandonments: number // times started but didn't submit
  retryAttempts: number
}

export interface GeographicData {
  anonymizedIp: string // e.g., "192.168.1.XXX"
  country?: string
  region?: string
  city?: string
  timezone: string
  estimatedLocation?: {
    latitude?: number
    longitude?: number
    accuracy?: 'country' | 'region' | 'city'
  }
}

export interface SubmissionMetadata {
  modalId: string
  modalTriggerSource: string // e.g., 'header_button', 'hero_cta', 'footer_link'
  siteUrl: string
  submissionId: string
  sessionData: SessionData
  deviceInfo: DeviceInfo
  geographicData: GeographicData
  interactionMetrics: FormInteractionMetrics
  leadScore?: number // 0-100 calculated score
  conversionValue?: number // estimated value for sales team
}

export interface WebhookPayload {
  // Core form data
  contact: FormContactData
  
  // Rich metadata
  metadata: SubmissionMetadata
  
  // System timestamps
  timestamp: string
  submittedAt: string
  processedAt: string
  
  // Source identification
  source: string
  version: string
}

export interface WebhookResponse {
  success: boolean
  submissionId: string
  message?: string
  webhookDelivered: boolean
  processingTime?: number
}

export interface WebhookError {
  error: string
  code: string
  submissionId?: string
  retryable: boolean
  details?: Record<string, unknown>
}

// Configuration types
export interface WebhookConfig {
  url: string
  timeout: number
  retryAttempts: number
  retryDelay: number
  headers?: Record<string, string>
}

export interface ModalConfig {
  modalId: string
  triggerSource: string
  trackingEnabled: boolean
  collectDeviceInfo: boolean
  collectGeographic: boolean
  leadScoringEnabled: boolean
}

// Utility types for metadata collection
export interface BrowserCapabilities {
  localStorage: boolean
  sessionStorage: boolean
  webGL: boolean
  canvas: boolean
  touchSupport: boolean
  geolocation: boolean
  notifications: boolean
}

export interface PerformanceMetrics {
  pageLoadTime: number
  domContentLoaded: number
  timeToInteractive: number
  connectionType?: string
  effectiveType?: string
}

// Type guards
export function isValidWebhookPayload(data: unknown): data is WebhookPayload {
  if (!data || typeof data !== 'object') return false
  
  const payload = data as WebhookPayload
  
  return !!(
    payload.contact &&
    payload.metadata &&
    payload.timestamp &&
    payload.source &&
    typeof payload.contact.name === 'string' &&
    typeof payload.contact.email === 'string' &&
    typeof payload.metadata.modalId === 'string' &&
    typeof payload.metadata.siteUrl === 'string'
  )
}

// ─── Open House Form Types ────────────────────────────────────

export type OpenHouseFormType =
  | 'broker_open_house_signin'
  | 'public_open_house_signin'
  | 'broker_open_house_feedback'
  | 'public_open_house_feedback'

export interface OpenHouseSignInData {
  name: string
  brokerage: string
  email: string
  phone: string
  visitedBefore: 'yes' | 'no'
  hasActiveBuyer: 'yes' | 'no' | 'maybe'
}

export interface OpenHouseFeedbackData {
  email: string
  standoutUnits: string[]
  likedMost: string[]
  buyerConcerns: string[]
  pricingComparison: 'below_market' | 'about_right' | 'above_market'
  likelihoodToBring: number // 1-5
  additionalComments?: string
}

export interface OpenHouseEventMeta {
  eventId: string
  eventType: 'public' | 'broker'
  eventDate: string
  formType: OpenHouseFormType
}

export function isValidContactData(data: unknown): data is FormContactData {
  if (!data || typeof data !== 'object') return false
  
  const contact = data as FormContactData
  
  return !!(
    contact.name &&
    contact.email &&
    contact.phone &&
    contact.message &&
    typeof contact.name === 'string' &&
    typeof contact.email === 'string' &&
    typeof contact.phone === 'string' &&
    typeof contact.message === 'string'
  )
}