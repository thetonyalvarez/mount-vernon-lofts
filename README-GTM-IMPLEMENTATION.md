# Google Tag Manager Implementation Guide

This document describes the Google Tag Manager (GTM) implementation for the Mount Vernon Lofts website built with Next.js 14 App Router.

## Implementation Overview

The GTM system provides comprehensive analytics and event tracking with:
- ✅ **Environment-based configuration** 
- ✅ **TypeScript support** for type-safe event tracking
- ✅ **Performance optimized** with Next.js Script component
- ✅ **Automatic page view tracking** for SPA navigation
- ✅ **Development debugging tools**
- ✅ **Error handling and fallbacks**

## Architecture

```
lib/
├── gtm.ts                    # Core GTM utilities and event tracking
└── types/
    └── gtm.ts               # TypeScript definitions

app/
├── layout.tsx               # GTM integration point
└── components/
    └── analytics/
        ├── GoogleTagManager.tsx  # Main GTM component
        └── index.ts             # Export barrel

components/
├── ContactModal.tsx         # Contact form with tracking
└── navigation/
    └── Navigation.tsx       # Navigation with tracking
```

## Environment Configuration

### 1. Required Environment Variables

Add to your `.env.local` file:

```bash
# Google Tag Manager Configuration
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX
NEXT_PUBLIC_GTM_ENABLED=true
```

### 2. Optional Environment Variables

For GTM environments (workspace previews):

```bash
# Optional: GTM Environment (for GTM environments feature)
NEXT_PUBLIC_GTM_AUTH=your-auth-token
NEXT_PUBLIC_GTM_PREVIEW=env-preview-id
```

### 3. Environment Examples

**Development:**
```bash
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-DEV123
NEXT_PUBLIC_GTM_ENABLED=false
```

**Staging:**
```bash
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-STG456
NEXT_PUBLIC_GTM_ENABLED=true
NEXT_PUBLIC_GTM_AUTH=staging-auth-token
NEXT_PUBLIC_GTM_PREVIEW=env-2
```

**Production:**
```bash
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-PROD789
NEXT_PUBLIC_GTM_ENABLED=true
```

## Implementation Details

### 1. Core GTM Manager (`lib/gtm.ts`)

The GTM manager provides:
- Singleton instance for consistent state
- Environment-based initialization
- Type-safe event tracking methods
- Debug logging in development
- Automatic dataLayer initialization

```typescript
import { gtm } from '@/lib/gtm'

// Check if GTM is enabled
gtm.isEnabled() // boolean

// Get configuration
gtm.getConfig() // GTMConfig | null

// Track events
gtm.trackPageView({ page_title: 'Home' })
gtm.trackFormSubmit({ form_name: 'contact', form_location: 'header' })
```

### 2. React Components

**GoogleTagManager Component:**
```tsx
import { GoogleTagManager } from '@/app/components/analytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GoogleTagManager />
        {children}
      </body>
    </html>
  )
}
```

**Debug Component (Development only):**
```tsx
import { GTMDebugInfo } from '@/app/components/analytics'

// Shows GTM status in development
<GTMDebugInfo />
```

### 3. TypeScript Support

Full TypeScript support with interfaces for all event types:

```typescript
import type { 
  PageViewEvent, 
  FormSubmitEvent, 
  ContactSubmitEvent,
  NavigationClickEvent 
} from '@/lib/types/gtm'

// Type-safe event tracking
const pageViewEvent: PageViewEvent = {
  event: 'page_view',
  page_title: 'Amenities',
  page_location: '/amenities',
  page_path: '/amenities'
}
```

## Event Tracking Implementation

### 1. Automatic Page Views

Page views are tracked automatically for SPA navigation:

```typescript
// Automatic tracking is enabled by default
<GoogleTagManager enableAutoTracking={true} />

// Manual page view tracking
import { trackPageView } from '@/app/components/analytics'
trackPageView({ content_group1: 'amenities' })
```

### 2. Form Submissions

Contact form submissions are tracked with success/failure states:

```typescript
// In ContactModal.tsx
import { trackContactForm, trackError } from '@/app/components/analytics'

// Success tracking
trackContactForm('inquiry', 'contact_modal', true)

// Error tracking
trackContactForm('inquiry', 'contact_modal', false)
trackError('Contact form submission failed: Network error', false, 'form')
```

### 3. Navigation Interactions

Navigation clicks are tracked across header, footer, and mobile menu:

```typescript
// In Navigation.tsx
import { trackNavigation } from '@/app/components/analytics'

// Track menu interactions
trackNavigation('header', 'Menu', 'menu_toggle')
trackNavigation('header', 'Logo', '/')
trackNavigation('header', 'Inquire Button', 'contact_modal')
```

### 4. Custom Event Tracking

Easily add custom events throughout the application:

```typescript
import { gtm } from '@/lib/gtm'

// Gallery image views
gtm.trackGalleryEvent({
  image_name: 'exterior-main.jpg',
  image_category: 'exteriors',
  gallery_section: 'main_gallery'
})

// Download tracking
gtm.trackDownload({
  file_name: 'mvl-brochure.pdf',
  file_url: '/downloads/brochure.pdf',
  download_location: 'residences_page'
})

// Video interactions
gtm.trackVideo({
  event: 'video_start',
  video_title: 'MVL Tour',
  video_url: '/videos/tour.mp4'
})
```

## Available Event Types

### Core Events
- **Page Views**: Automatic SPA navigation tracking
- **Form Submissions**: Contact forms with success/error states
- **Click Tracking**: Navigation, buttons, links
- **Download Tracking**: PDFs, brochures, media files
- **Error Tracking**: JavaScript errors, API failures

### MVL-Specific Events
- **Contact Submissions**: Lead qualification and source tracking
- **Navigation Clicks**: Header, footer, mobile menu interactions
- **Gallery Events**: Image views, category filtering
- **Video Events**: Video start, complete, pause, resume

### Custom Events
- **Search Events**: Site search functionality
- **Scroll Tracking**: Engagement depth measurement
- **User Properties**: Custom user attributes
- **E-commerce Events**: Future purchase tracking

## GTM Container Setup

### 1. Recommended Tags

**Page View Enhanced - GA4:**
```
Trigger: Page View
Tag: GA4 Event
Event Name: page_view
Parameters:
- page_title: {{Page Title}}
- page_location: {{Page URL}}
- content_group1: {{DLV - content_group1}}
```

**Form Submissions - GA4:**
```
Trigger: Custom Event - form_submit
Tag: GA4 Event  
Event Name: form_submit
Parameters:
- form_name: {{DLV - form_name}}
- form_location: {{DLV - form_location}}
- success: {{DLV - success}}
```

**Contact Lead Tracking - GA4:**
```
Trigger: Custom Event - contact_submit
Tag: GA4 Event
Event Name: generate_lead
Parameters:
- contact_type: {{DLV - contact_type}}
- contact_source: {{DLV - contact_source}}
- value: 100 (estimated lead value)
```

### 2. Custom Variables

Create these GTM variables:
- `DLV - form_name` (Data Layer Variable)
- `DLV - form_location` (Data Layer Variable)
- `DLV - contact_type` (Data Layer Variable)
- `DLV - nav_section` (Data Layer Variable)
- `DLV - success` (Data Layer Variable)

### 3. Triggers

Set up these custom triggers:
- **All Pages** (Page View)
- **Form Submit** (Custom Event: form_submit)
- **Contact Submit** (Custom Event: contact_submit)
- **Navigation Click** (Custom Event: navigation_click)
- **Download** (Custom Event: download)
- **Error** (Custom Event: exception)

## Development & Debugging

### 1. Development Mode

In development, GTM provides debug information:
- Console logging for all events
- Visual debug panel (bottom-right corner)
- GTM configuration display
- DataLayer event count

### 2. Debug Panel

The `GTMDebugInfo` component shows:
- ✅ GTM Status (Enabled/Disabled)
- 📦 Container ID
- 🔑 Auth token (if using environments)
- 📊 DataLayer event count

### 3. Testing Events

Use browser console to test events:

```javascript
// Check if GTM is loaded
window.dataLayer

// View all dataLayer events
console.table(window.dataLayer)

// Test custom event
window.dataLayer.push({
  event: 'test_event',
  test_parameter: 'test_value'
})
```

### 4. GTM Preview Mode

Use GTM's built-in preview mode:
1. Set up environment variables with auth/preview tokens
2. Connect to GTM workspace preview
3. Navigate the site to see real-time event firing

## Performance Considerations

### 1. Script Loading

- Uses Next.js `Script` component with `strategy="afterInteractive"`
- GTM scripts load after page becomes interactive
- No blocking of initial page render
- Proper error handling for script failures

### 2. Event Buffering

- Events are queued if dataLayer isn't ready
- Automatic retry for failed events
- Minimal impact on user interactions

### 3. Bundle Size

- GTM utilities are tree-shakeable
- TypeScript types have zero runtime cost
- Analytics components are lazily loaded

## Privacy & Compliance

### 1. Environment Control

- GTM can be completely disabled via environment variables
- Easy to disable for development/testing
- Supports different containers per environment

### 2. Consent Management

Ready for consent management integration:

```typescript
// Future consent management
gtm.setUserProperties({
  consent_analytics: true,
  consent_marketing: false
})
```

### 3. Data Collection

Current implementation collects:
- Page views and navigation
- Form submissions (no PII stored in GTM)
- User interactions and engagement
- Technical errors for debugging

## Troubleshooting

### Common Issues

**GTM not loading:**
1. Check environment variables are set correctly
2. Verify `NEXT_PUBLIC_GTM_ENABLED=true`
3. Check browser console for script errors
4. Verify GTM container ID format (GTM-XXXXXXX)

**Events not firing:**
1. Check GTM debug panel shows events in dataLayer
2. Verify triggers are set up correctly in GTM container
3. Use browser network tab to confirm GTM requests
4. Check GTM preview mode for real-time debugging

**TypeScript errors:**
1. Ensure all event interfaces are properly imported
2. Check event data matches interface requirements
3. Verify GTM utilities are imported correctly

### Debug Commands

```bash
# Check GTM configuration
console.log(window.gtm?.getConfig())

# View dataLayer events
console.table(window.dataLayer)

# Test if GTM is enabled
console.log(window.gtm?.isEnabled())
```

## Future Enhancements

### Planned Features
- 🎯 Enhanced e-commerce tracking for future booking system
- 📊 Advanced user journey tracking
- 🔄 A/B testing integration
- 📱 Enhanced mobile app event tracking
- 🍪 Cookie consent management integration

### Extension Points
- Additional event types for new features
- Integration with CRM systems
- Custom dashboard for real-time analytics
- Automated reporting and alerts

## Support & Maintenance

### Updates
- Monitor GTM container changes
- Update event interfaces as needed
- Review tracking data quality monthly
- Update documentation for new features

### Monitoring
- Check GTM debug panel regularly during development
- Monitor GTM workspace for tag firing health
- Review analytics data for tracking gaps
- Test event tracking after deployments

This implementation provides a robust, scalable foundation for comprehensive analytics tracking while maintaining excellent performance and developer experience.