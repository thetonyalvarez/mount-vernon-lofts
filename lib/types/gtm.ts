/**
 * Google Tag Manager TypeScript Definitions
 * 
 * Provides type safety for GTM events and dataLayer operations
 */

// Global GTM interface extension
declare global {
  interface Window {
    dataLayer?: DataLayerEvent[]
    gtag?: (...args: unknown[]) => void
  }
}

// Base GTM event structure
export interface GTMEvent {
  event: string
  [key: string]: unknown
}

// DataLayer event type
export interface DataLayerEvent extends GTMEvent {
  // Standard GTM events
  event: 
    | 'page_view'
    | 'form_submit'
    | 'click'
    | 'scroll'
    | 'video_start'
    | 'video_complete'
    | 'download'
    | 'search'
    | 'contact_submit'
    | 'navigation_click'
    | 'gallery_image_view'
    | 'brochure_download'
    | 'phone_click'
    | 'email_click'
    | 'floor_plans_request'
    | 'floor_plan_view'
    | 'floor_plan_compare'
    | 'floor_plan_download'
    | string // Allow custom events
}

// Page view event
export interface PageViewEvent extends GTMEvent {
  event: 'page_view'
  page_title: string
  page_location: string
  page_path: string
  content_group1?: string // Section (e.g., 'amenities', 'gallery')
  content_group2?: string // Subsection
}

// Form submission event
export interface FormSubmitEvent extends GTMEvent {
  event: 'form_submit'
  form_name: string
  form_location: string
  form_method?: string
  form_id?: string
  success?: boolean
  error_message?: string
}

// Contact form specific event
export interface ContactSubmitEvent extends GTMEvent {
  event: 'contact_submit'
  form_name: string
  form_location: string
  form_method?: string
  form_id?: string
  success?: boolean
  error_message?: string
  contact_type: 'inquiry' | 'brochure' | 'tour_request' | 'general' | 'floor_plans'
  contact_source: string // Where the form was submitted from
  lead_score?: number
}

// Floor plans specific events
export interface FloorPlansRequestEvent extends GTMEvent {
  event: 'floor_plans_request'
  form_name: string
  form_location: string
  floor_plans_interest: string // Which floor plans requested
  timeline?: string
  is_broker?: string
  lead_score?: number
  success?: boolean
  error_message?: string
}

export interface FloorPlanViewEvent extends GTMEvent {
  event: 'floor_plan_view'
  floor_plan_id: string
  floor_plan_name: string
  view_type: 'preview' | 'selector' | 'detail'
  section_location: string
}

export interface FloorPlanCompareEvent extends GTMEvent {
  event: 'floor_plan_compare'
  floor_plans_compared: string[]
  comparison_type: 'selector' | 'detail'
  section_location: string
}

export interface FloorPlanDownloadEvent extends GTMEvent {
  event: 'floor_plan_download'
  floor_plans_type: string // Which floor plans downloaded
  download_method: 'email' | 'direct'
  download_location: string
  lead_qualified: boolean
}

// Click tracking event
export interface ClickEvent extends GTMEvent {
  event: 'click'
  click_element: string
  click_text?: string
  click_url?: string
  click_location: string
  link_type?: 'internal' | 'external' | 'download' | 'email' | 'phone'
}

// Navigation specific click event
export interface NavigationClickEvent extends GTMEvent {
  event: 'navigation_click'
  click_element: string
  click_text?: string
  click_url?: string
  click_location: string
  link_type?: 'internal' | 'external' | 'download' | 'email' | 'phone'
  nav_section: 'header' | 'footer' | 'mobile' | 'sidebar'
  nav_item: string
  nav_destination: string
}

// Gallery interaction event
export interface GalleryEvent extends GTMEvent {
  event: 'gallery_image_view'
  image_name: string
  image_category: string
  image_position?: number
  gallery_section: string
}

// Video interaction events
export interface VideoEvent extends GTMEvent {
  event: 'video_start' | 'video_complete' | 'video_pause' | 'video_resume'
  video_title: string
  video_url?: string
  video_duration?: number
  video_current_time?: number
  video_percent?: number
}

// Download event
export interface DownloadEvent extends GTMEvent {
  event: 'download'
  file_name: string
  file_url: string
  file_type: string
  download_location: string
}

// Search event
export interface SearchEvent extends GTMEvent {
  event: 'search'
  search_term: string
  search_results?: number
  search_location: string
}

// Scroll tracking event
export interface ScrollEvent extends GTMEvent {
  event: 'scroll'
  scroll_depth: number
  page_location: string
  page_title: string
}

// E-commerce events (for future use)
export interface EcommerceEvent extends GTMEvent {
  event: 'purchase' | 'begin_checkout' | 'add_to_cart' | 'view_item'
  currency?: string
  value?: number
  items?: EcommerceItem[]
}

export interface EcommerceItem {
  item_id: string
  item_name: string
  category: string
  price?: number
  quantity?: number
}

// User engagement events
export interface EngagementEvent extends GTMEvent {
  event: 'engagement'
  engagement_time_msec: number
  page_title: string
  page_location: string
}

// Error tracking
export interface ErrorEvent extends GTMEvent {
  event: 'exception'
  description: string
  fatal: boolean
  page_location: string
  error_type: 'javascript' | 'network' | 'form' | 'api'
}

// GTM Configuration
export interface GTMConfig {
  containerId: string
  enabled: boolean
  auth?: string
  preview?: string
  debug?: boolean
}

// GTM Context type for React context
export interface GTMContextType {
  config: GTMConfig | null
  isInitialized: boolean
  trackEvent: (event: DataLayerEvent) => void
  trackPageView: (data: Omit<PageViewEvent, 'event'>) => void
  trackFormSubmit: (data: Omit<FormSubmitEvent, 'event'>) => void
  trackClick: (data: Omit<ClickEvent, 'event'>) => void
}

// Utility types
export type GTMEventData<T extends GTMEvent> = Omit<T, 'event'>

// Event builder type helpers
export type EventBuilder<T extends string> = T extends 'page_view'
  ? PageViewEvent
  : T extends 'form_submit'
  ? FormSubmitEvent
  : T extends 'contact_submit'
  ? ContactSubmitEvent
  : T extends 'click'
  ? ClickEvent
  : T extends 'navigation_click'
  ? NavigationClickEvent
  : T extends 'gallery_image_view'
  ? GalleryEvent
  : T extends 'download'
  ? DownloadEvent
  : GTMEvent