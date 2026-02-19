/**
 * Metadata Collection Utility
 * Gathers comprehensive browser, session, and interaction data for webhook submissions
 */

import type {
  DeviceInfo,
  SessionData,
  UTMParameters,
  FormInteractionMetrics,
  BrowserCapabilities,
  PerformanceMetrics
} from '@/lib/types/webhook'

class MetadataCollector {
  private sessionStartTime: number = Date.now()
  private pageViews: number = 1
  private sessionId: string
  private landingPage: string
  private formInteractionData: Partial<FormInteractionMetrics> = {}
  private formTrackingActive: boolean = false

  constructor() {
    this.sessionId = this.generateSessionId()
    this.landingPage = typeof window !== 'undefined' ? window.location.href : ''
    
    if (typeof window !== 'undefined') {
      this.initializeSessionTracking()
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Initialize session tracking
   */
  private initializeSessionTracking(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.pageViews++
      }
    })

    // Track beforeunload for session duration
    window.addEventListener('beforeunload', () => {
      this.updateSessionDuration()
    })
  }

  /**
   * Update session duration
   */
  private updateSessionDuration(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const duration = Date.now() - this.sessionStartTime
      sessionStorage.setItem('sessionDuration', duration.toString())
    }
  }

  /**
   * Extract UTM parameters from URL
   */
  private extractUTMParameters(): UTMParameters {
    if (typeof window === 'undefined') return {}

    const urlParams = new URLSearchParams(window.location.search)
    return {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
    }
  }

  /**
   * Detect device capabilities
   */
  private getBrowserCapabilities(): BrowserCapabilities {
    if (typeof window === 'undefined') {
      return {
        localStorage: false,
        sessionStorage: false,
        webGL: false,
        canvas: false,
        touchSupport: false,
        geolocation: false,
        notifications: false
      }
    }

    return {
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,
      webGL: !!window.WebGLRenderingContext,
      canvas: !!window.HTMLCanvasElement,
      touchSupport: 'ontouchstart' in window,
      geolocation: 'geolocation' in navigator,
      notifications: 'Notification' in window
    }
  }

  /**
   * Get performance metrics
   */
  private getPerformanceMetrics(): PerformanceMetrics | null {
    if (typeof window === 'undefined' || !window.performance) return null

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (!navigation) return null

    const metrics: PerformanceMetrics = {
      pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      timeToInteractive: navigation.loadEventEnd - navigation.fetchStart, // Simplified
    }

    // Add connection info if available
    const connection = (navigator as unknown as Record<string, unknown>).connection || 
                      (navigator as unknown as Record<string, unknown>).mozConnection || 
                      (navigator as unknown as Record<string, unknown>).webkitConnection
    if (connection && typeof connection === 'object') {
      const conn = connection as Record<string, unknown>
      metrics.connectionType = conn.type as string
      metrics.effectiveType = conn.effectiveType as string
    }

    return metrics
  }

  /**
   * Collect device information
   */
  getDeviceInfo(): DeviceInfo {
    if (typeof window === 'undefined') {
      return {
        userAgent: 'Server-side',
        screenWidth: 0,
        screenHeight: 0,
        viewportWidth: 0,
        viewportHeight: 0,
        language: 'en-US',
        timezone: 'UTC',
        platform: 'unknown',
        isMobile: false,
        isTablet: false,
        cookiesEnabled: false
      }
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent)

    return {
      userAgent: navigator.userAgent,
      screenWidth: screen.width,
      screenHeight: screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform,
      isMobile,
      isTablet,
      cookiesEnabled: navigator.cookieEnabled
    }
  }

  /**
   * Collect session data
   */
  getSessionData(): SessionData {
    if (typeof window === 'undefined') {
      return {
        pageUrl: '',
        referrer: null,
        timeOnSite: 0,
        pagesVisited: 0,
        utmParams: {},
        landingPage: '',
        sessionId: this.sessionId
      }
    }

    return {
      pageUrl: window.location.href,
      referrer: document.referrer || null,
      timeOnSite: Date.now() - this.sessionStartTime,
      pagesVisited: this.pageViews,
      utmParams: this.extractUTMParameters(),
      landingPage: this.landingPage,
      sessionId: this.sessionId
    }
  }

  /**
   * Start tracking form interactions
   */
  startFormTracking(modalId: string): void {
    this.formInteractionData = {
      timeToComplete: Date.now(),
      fieldInteractionCount: 0,
      fieldFocusOrder: [],
      hasTypingPauses: false,
      formAbandonments: 0,
      retryAttempts: 0
    }

    // Store in sessionStorage for persistence across interactions
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const existingData = sessionStorage.getItem(`formTracking_${modalId}`)
      if (existingData) {
        const parsed = JSON.parse(existingData)
        this.formInteractionData.formAbandonments = (parsed.formAbandonments || 0) + 1
      }
    }
  }

  /**
   * Track field interaction
   */
  trackFieldInteraction(fieldName: string): void {
    if (!this.formInteractionData.fieldFocusOrder) return

    this.formInteractionData.fieldInteractionCount = (this.formInteractionData.fieldInteractionCount || 0) + 1
    
    if (!this.formInteractionData.fieldFocusOrder.includes(fieldName)) {
      this.formInteractionData.fieldFocusOrder.push(fieldName)
    }
  }

  /**
   * Complete form tracking and return metrics
   */
  completeFormTracking(modalId: string): FormInteractionMetrics {
    const timeToComplete = this.formInteractionData.timeToComplete 
      ? Date.now() - this.formInteractionData.timeToComplete 
      : 0

    const metrics: FormInteractionMetrics = {
      timeToComplete,
      fieldInteractionCount: this.formInteractionData.fieldInteractionCount || 0,
      fieldFocusOrder: this.formInteractionData.fieldFocusOrder || [],
      hasTypingPauses: timeToComplete > 30000, // Assume pauses if > 30 seconds
      formAbandonments: this.formInteractionData.formAbandonments || 0,
      retryAttempts: this.formInteractionData.retryAttempts || 0
    }

    // Clear sessionStorage tracking for this modal
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem(`formTracking_${modalId}`)
    }

    return metrics
  }

  /**
   * Calculate lead score based on engagement metrics
   */
  calculateLeadScore(sessionData: SessionData, deviceInfo: DeviceInfo, interactionMetrics: FormInteractionMetrics): number {
    let score = 0

    // Time on site scoring (0-25 points)
    const timeOnSiteMinutes = sessionData.timeOnSite / (1000 * 60)
    if (timeOnSiteMinutes > 10) score += 25
    else if (timeOnSiteMinutes > 5) score += 20
    else if (timeOnSiteMinutes > 2) score += 15
    else if (timeOnSiteMinutes > 1) score += 10
    else score += 5

    // Page engagement scoring (0-20 points)
    if (sessionData.pagesVisited >= 5) score += 20
    else if (sessionData.pagesVisited >= 3) score += 15
    else if (sessionData.pagesVisited >= 2) score += 10
    else score += 5

    // Form completion quality (0-25 points)
    const timeToCompleteMinutes = interactionMetrics.timeToComplete / (1000 * 60)
    if (timeToCompleteMinutes > 1 && timeToCompleteMinutes < 10) score += 25 // Thoughtful completion
    else if (timeToCompleteMinutes < 1) score += 10 // Very quick
    else score += 15 // Took time

    // Traffic source quality (0-15 points)
    if (sessionData.utmParams.utm_source) {
      if (sessionData.utmParams.utm_source === 'google' || sessionData.utmParams.utm_source === 'organic') score += 15
      else if (sessionData.utmParams.utm_source === 'referral') score += 12
      else score += 8
    } else if (sessionData.referrer) {
      score += 10
    } else {
      score += 15 // Direct traffic
    }

    // Device/engagement quality (0-15 points)
    if (!deviceInfo.isMobile) score += 10 // Desktop users often more serious
    if (interactionMetrics.fieldInteractionCount > 8) score += 5 // High engagement

    return Math.min(100, Math.max(0, score))
  }

  /**
   * Get comprehensive metadata for webhook
   */
  getMetadata(modalId: string, _triggerSource: string): {
    sessionData: SessionData
    deviceInfo: DeviceInfo
    interactionMetrics: FormInteractionMetrics
    leadScore: number
  } {
    const sessionData = this.getSessionData()
    const deviceInfo = this.getDeviceInfo()
    const interactionMetrics = this.completeFormTracking(modalId)
    const leadScore = this.calculateLeadScore(sessionData, deviceInfo, interactionMetrics)

    return {
      sessionData,
      deviceInfo,
      interactionMetrics,
      leadScore
    }
  }
}

// Create singleton instance
const metadataCollector = new MetadataCollector()

export default metadataCollector
export { MetadataCollector }