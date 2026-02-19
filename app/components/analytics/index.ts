/**
 * Analytics Components
 * 
 * Export all analytics-related components
 */

export { 
  default as GoogleTagManager,
  GTMScriptHead,
  GTMNoScriptBody,
  GTMDebugInfo
} from './GoogleTagManager'

// Re-export GTM utilities for convenience
export { 
  gtm,
  trackPageView,
  trackFormSubmit,
  trackContactForm,
  trackNavigation,
  trackDownload,
  trackError,
  trackFloorPlansRequest,
  trackFloorPlanView,
  trackFloorPlanCompare,
  trackFloorPlanDownload,
  enableAutoPageTracking
} from '@/lib/gtm'

// Re-export types
export type {
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
  FloorPlanDownloadEvent
} from '@/lib/types/gtm'