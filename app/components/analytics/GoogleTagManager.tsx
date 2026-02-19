'use client'

/**
 * Google Tag Manager Component
 * 
 * Handles GTM script loading and initialization for Next.js 14 App Router
 */

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { gtm, enableAutoPageTracking } from '@/lib/gtm'

interface GoogleTagManagerProps {
  /**
   * Whether to enable automatic page view tracking for SPA navigation
   * @default true
   */
  enableAutoTracking?: boolean
}

export function GoogleTagManager({ enableAutoTracking = true }: GoogleTagManagerProps) {
  const config = gtm.getConfig()
  const scriptUrl = gtm.getScriptUrl()
  const noScriptUrl = gtm.getNoScriptUrl()

  useEffect(() => {
    // Enable auto page tracking if requested and GTM is enabled
    if (enableAutoTracking && gtm.isEnabled()) {
      const cleanup = enableAutoPageTracking()
      return cleanup
    }
  }, [enableAutoTracking])

  // Don't render anything if GTM is not configured or disabled
  if (!config?.enabled || !scriptUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GTM] Not rendering - GTM disabled or not configured')
    }
    return null
  }

  return (
    <>
      {/* GTM Script */}
      <Script
        id="gtm-script"
        src={scriptUrl}
        strategy="afterInteractive"
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[GTM] Script loaded successfully')
          }
        }}
        onError={(error) => {
          console.error('[GTM] Script failed to load:', error)
        }}
      />

      {/* GTM NoScript Fallback */}
      {noScriptUrl && (
        <noscript>
          <iframe
            src={noScriptUrl}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
    </>
  )
}

/**
 * GTM Script Head Component
 * 
 * For manual placement in document head if needed
 */
export function GTMScriptHead() {
  const config = gtm.getConfig()
  const containerId = config?.containerId

  if (!config?.enabled || !containerId) {
    return null
  }

  // GTM script to be placed in <head>
  const gtmScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl${
      config.auth && config.preview 
        ? `+'&gtm_auth=${config.auth}&gtm_preview=${config.preview}&gtm_cookies_win=x'` 
        : ''
    };f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${containerId}');
  `

  return (
    <Script
      id="gtm-head-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: gtmScript }}
    />
  )
}

/**
 * GTM NoScript Body Component
 * 
 * For manual placement right after opening <body> tag if needed
 */
export function GTMNoScriptBody() {
  const noScriptUrl = gtm.getNoScriptUrl()

  if (!noScriptUrl) {
    return null
  }

  return (
    <noscript>
      <iframe
        src={noScriptUrl}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}


/**
 * Development GTM Debug Component
 * 
 * Shows GTM status in development mode
 */
export function GTMDebugInfo() {
  const [dataLayerInfo, setDataLayerInfo] = useState<string>('Not available')
  const [isMounted, setIsMounted] = useState(false)

  const config = gtm.getConfig()
  const isEnabled = gtm.isEnabled()

  // Handle hydration and dataLayer info after client-side mount
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return
    }
    
    setIsMounted(true)
    if (typeof window !== 'undefined' && window.dataLayer) {
      setDataLayerInfo(`${window.dataLayer.length} events`)
    } else {
      setDataLayerInfo('Not available')
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        maxWidth: '300px'
      }}
    >
      <div><strong>GTM Debug Info</strong></div>
      <div>Status: {isEnabled ? '✅ Enabled' : '❌ Disabled'}</div>
      <div>Container: {config?.containerId || 'Not set'}</div>
      {config?.auth && <div>Auth: {config.auth}</div>}
      {config?.preview && <div>Preview: {config.preview}</div>}
      <div>
        DataLayer: {isMounted ? dataLayerInfo : 'Not available'}
      </div>
    </div>
  )
}

export default GoogleTagManager