'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import deferred components
// NOTE: GTM (script + noscript + debug) is mounted directly in app/layout.tsx
// so it loads as early as possible. Do NOT add it here to avoid duplicate mounts.
const TawkChat = dynamic(() =>
  import('@/app/components/TawkChat').then(mod => ({ default: mod.TawkChat })),
  { ssr: false }
)

export function DeferredScripts() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    let isLoaded = false

    const loadScripts = () => {
      if (!isLoaded) {
        isLoaded = true
        setScriptsLoaded(true)
      }
    }

    // Load after user interaction
    const events = ['click', 'scroll', 'touchstart', 'keydown']
    const handleInteraction = () => {
      events.forEach(event =>
        document.removeEventListener(event, handleInteraction)
      )
      loadScripts()
    }

    // Attach event listeners for user interactions
    events.forEach(event =>
      document.addEventListener(event, handleInteraction, {
        once: true,
        passive: true
      })
    )

    // Mobile: longer delay to avoid blocking critical rendering
    // Desktop: shorter delay for better UX
    const fallbackDelay = isMobile ? 5000 : 3000
    const timeout = setTimeout(loadScripts, fallbackDelay)

    return () => {
      clearTimeout(timeout)
      events.forEach(event =>
        document.removeEventListener(event, handleInteraction)
      )
    }
  }, [])

  if (!scriptsLoaded) {
    return null
  }

  return (
    <>
      {/* Tawk.to live chat — loads on all devices including mobile */}
      <TawkChat />
    </>
  )
}
