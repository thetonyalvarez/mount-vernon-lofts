/**
 * Google Tag Manager Utilities
 * 
 * Centralized GTM event tracking and utilities for Mount Vernon Lofts website
 */

import type {
  GTMConfig,
  DataLayerEvent,
  PageViewEvent,
  FormSubmitEvent,
  ContactSubmitEvent,
  ClickEvent,
  NavigationClickEvent,
  GalleryEvent,
  DownloadEvent,
  VideoEvent,
  SearchEvent,
  ScrollEvent,
  ErrorEvent,
  FloorPlansRequestEvent,
  FloorPlanViewEvent,
  FloorPlanCompareEvent,
  FloorPlanDownloadEvent,
  GTMEventData
} from './types/gtm'

class GTMManager {
  private config: GTMConfig | null = null
  private isInitialized = false
  private debugMode = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeConfig()
      this.debugMode = process.env.NODE_ENV === 'development'
    }
  }

  /**
   * Initialize GTM configuration from environment variables
   */
  private initializeConfig(): void {
    const containerId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID
    const enabled = process.env.NEXT_PUBLIC_GTM_ENABLED === 'true'
    const auth = process.env.NEXT_PUBLIC_GTM_AUTH
    const preview = process.env.NEXT_PUBLIC_GTM_PREVIEW

    if (!containerId) {
      this.log('GTM Container ID not found in environment variables')
      return
    }

    this.config = {
      containerId,
      enabled,
      auth,
      preview,
      debug: this.debugMode
    }

    if (enabled) {
      this.initializeDataLayer()
      this.isInitialized = true
      this.log('GTM initialized with config:', this.config)
    } else {
      this.log('GTM disabled via environment variables')
    }
  }

  /**
   * Initialize the dataLayer array
   */
  private initializeDataLayer(): void {
    window.dataLayer = window.dataLayer || []
    
    // Push initial configuration
    this.pushToDataLayer({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    } as DataLayerEvent)
  }

  /**
   * Get current GTM configuration
   */
  getConfig(): GTMConfig | null {
    return this.config
  }

  /**
   * Check if GTM is enabled and initialized
   */
  isEnabled(): boolean {
    return !!(this.config?.enabled && this.isInitialized)
  }

  /**
   * Push event to dataLayer
   */
  private pushToDataLayer(event: DataLayerEvent | Record<string, unknown>): void {
    if (typeof window === 'undefined') return

    if (!window.dataLayer) {
      this.log('DataLayer not available, queuing event:', event)
      return
    }

    window.dataLayer.push(event as DataLayerEvent)
    this.log('Event pushed to dataLayer:', event)
  }

  /**
   * Generic event tracking method
   */
  trackEvent(event: DataLayerEvent): void {
    if (!this.isEnabled()) {
      this.log('GTM not enabled, skipping event:', event)
      return
    }

    // Add timestamp and session data
    const enrichedEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      page_referrer: document.referrer || 'direct'
    }

    this.pushToDataLayer(enrichedEvent)
  }

  /**
   * Track page view
   */
  trackPageView(data: GTMEventData<PageViewEvent>): void {
    const event = {
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...data
    } as PageViewEvent

    this.trackEvent(event)
  }

  /**
   * Track form submission
   */
  trackFormSubmit(data: GTMEventData<FormSubmitEvent>): void {
    const event = {
      ...data,
      event: 'form_submit'
    } as FormSubmitEvent

    this.trackEvent(event)
  }

  /**
   * Track contact form submission (specialized)
   */
  trackContactSubmit(data: GTMEventData<ContactSubmitEvent>): void {
    const event = {
      ...data,
      event: 'contact_submit',
      form_name: 'contact'
    } as ContactSubmitEvent

    this.trackEvent(event)
  }

  /**
   * Track click events
   */
  trackClick(data: GTMEventData<ClickEvent>): void {
    const event = {
      ...data,
      event: 'click'
    } as ClickEvent

    this.trackEvent(event)
  }

  /**
   * Track navigation clicks
   */
  trackNavigationClick(data: GTMEventData<NavigationClickEvent>): void {
    const event = {
      ...data,
      event: 'navigation_click'
    } as NavigationClickEvent

    this.trackEvent(event)
  }

  /**
   * Track gallery interactions
   */
  trackGalleryEvent(data: GTMEventData<GalleryEvent>): void {
    const event = {
      ...data,
      event: 'gallery_image_view'
    } as GalleryEvent

    this.trackEvent(event)
  }

  /**
   * Track file downloads
   */
  trackDownload(data: GTMEventData<DownloadEvent>): void {
    const event = {
      ...data,
      event: 'download'
    } as DownloadEvent

    this.trackEvent(event)
  }

  /**
   * Track video interactions
   */
  trackVideo(data: GTMEventData<VideoEvent>): void {
    this.trackEvent(data as VideoEvent)
  }

  /**
   * Track search events
   */
  trackSearch(data: GTMEventData<SearchEvent>): void {
    const event = {
      ...data,
      event: 'search'
    } as SearchEvent

    this.trackEvent(event)
  }

  /**
   * Track scroll depth
   */
  trackScroll(data: GTMEventData<ScrollEvent>): void {
    const event = {
      event: 'scroll',
      page_location: window.location.href,
      page_title: document.title,
      ...data
    } as ScrollEvent

    this.trackEvent(event)
  }

  /**
   * Track errors
   */
  trackError(data: GTMEventData<ErrorEvent>): void {
    const event = {
      event: 'exception',
      page_location: window.location.href,
      ...data
    } as ErrorEvent

    this.trackEvent(event)
  }

  /**
   * Track floor plans request
   */
  trackFloorPlansRequest(data: GTMEventData<FloorPlansRequestEvent>): void {
    const event = {
      event: 'floor_plans_request',
      ...data
    } as FloorPlansRequestEvent

    this.trackEvent(event)
  }

  /**
   * Track floor plan view
   */
  trackFloorPlanView(data: GTMEventData<FloorPlanViewEvent>): void {
    const event = {
      event: 'floor_plan_view',
      ...data
    } as FloorPlanViewEvent

    this.trackEvent(event)
  }

  /**
   * Track floor plan comparison
   */
  trackFloorPlanCompare(data: GTMEventData<FloorPlanCompareEvent>): void {
    const event = {
      event: 'floor_plan_compare',
      ...data
    } as FloorPlanCompareEvent

    this.trackEvent(event)
  }

  /**
   * Track floor plan download
   */
  trackFloorPlanDownload(data: GTMEventData<FloorPlanDownloadEvent>): void {
    const event = {
      event: 'floor_plan_download',
      ...data
    } as FloorPlanDownloadEvent

    this.trackEvent(event)
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, unknown>): void {
    if (!this.isEnabled()) return

    this.pushToDataLayer({
      event: 'user_properties',
      user_properties: properties
    })
  }

  /**
   * Set custom dimensions
   */
  setCustomDimensions(dimensions: Record<string, unknown>): void {
    if (!this.isEnabled()) return

    this.pushToDataLayer({
      event: 'custom_dimensions',
      custom_dimensions: dimensions
    })
  }

  /**
   * Debug logging
   */
  private log(...args: unknown[]): void {
    if (this.debugMode) {
      console.log('[GTM]', ...args)
    }
  }

  /**
   * Get GTM script URL
   */
  getScriptUrl(): string | null {
    if (!this.config?.containerId) return null

    let url = `https://www.googletagmanager.com/gtm.js?id=${this.config.containerId}`
    
    if (this.config.auth && this.config.preview) {
      url += `&gtm_auth=${this.config.auth}&gtm_preview=${this.config.preview}&gtm_cookies_win=x`
    }

    return url
  }

  /**
   * Get GTM noscript URL
   */
  getNoScriptUrl(): string | null {
    if (!this.config?.containerId) return null

    let url = `https://www.googletagmanager.com/ns.html?id=${this.config.containerId}`
    
    if (this.config.auth && this.config.preview) {
      url += `&gtm_auth=${this.config.auth}&gtm_preview=${this.config.preview}&gtm_cookies_win=x`
    }

    return url
  }
}

// Create singleton instance
const gtm = new GTMManager()

// Export the instance and types
export default gtm
export { gtm }

// Convenience functions for common tracking scenarios
export const trackPageView = (data?: Partial<GTMEventData<PageViewEvent>>) => {
  gtm.trackPageView({
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...data
  })
}

export const trackFormSubmit = (formName: string, location: string, success = true, error?: string) => {
  gtm.trackFormSubmit({
    form_name: formName,
    form_location: location,
    success,
    error_message: error
  })
}

export const trackContactForm = (type: ContactSubmitEvent['contact_type'], source: string, success = true) => {
  gtm.trackContactSubmit({
    contact_type: type,
    contact_source: source,
    form_location: source,
    success
  })
}

export const trackNavigation = (section: NavigationClickEvent['nav_section'], item: string, destination: string) => {
  gtm.trackNavigationClick({
    nav_section: section,
    nav_item: item,
    nav_destination: destination,
    click_element: item,
    click_location: section
  })
}

export const trackDownload = (fileName: string, fileUrl: string, location: string) => {
  gtm.trackDownload({
    file_name: fileName,
    file_url: fileUrl,
    file_type: fileName.split('.').pop() || 'unknown',
    download_location: location
  })
}

export const trackError = (description: string, fatal = false, type: ErrorEvent['error_type'] = 'javascript') => {
  gtm.trackError({
    description,
    fatal,
    error_type: type
  })
}

// Floor plan tracking convenience functions
export const trackFloorPlansRequest = (
  floorPlansInterest: string, 
  formLocation: string, 
  success = true, 
  options?: {
    timeline?: string
    isBroker?: string
    leadScore?: number
    error?: string
  }
) => {
  gtm.trackFloorPlansRequest({
    form_name: 'floor_plans_request',
    form_location: formLocation,
    floor_plans_interest: floorPlansInterest,
    timeline: options?.timeline,
    is_broker: options?.isBroker,
    lead_score: options?.leadScore,
    success,
    error_message: options?.error
  })
}

export const trackFloorPlanView = (floorPlanId: string, floorPlanName: string, viewType: 'preview' | 'selector' | 'detail', location: string) => {
  gtm.trackFloorPlanView({
    floor_plan_id: floorPlanId,
    floor_plan_name: floorPlanName,
    view_type: viewType,
    section_location: location
  })
}

export const trackFloorPlanCompare = (floorPlans: string[], comparisonType: 'selector' | 'detail', location: string) => {
  gtm.trackFloorPlanCompare({
    floor_plans_compared: floorPlans,
    comparison_type: comparisonType,
    section_location: location
  })
}

export const trackFloorPlanDownload = (floorPlansType: string, downloadMethod: 'email' | 'direct', location: string, leadQualified = true) => {
  gtm.trackFloorPlanDownload({
    floor_plans_type: floorPlansType,
    download_method: downloadMethod,
    download_location: location,
    lead_qualified: leadQualified
  })
}

// Auto-track page views for SPA navigation
export const enableAutoPageTracking = () => {
  if (typeof window === 'undefined') return

  // Track initial page view
  trackPageView()

  // Listen for navigation changes (for SPA)
  let currentUrl = window.location.href
  
  const observer = new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href
      // Delay to ensure page title is updated
      setTimeout(() => trackPageView(), 100)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  return () => observer.disconnect()
}