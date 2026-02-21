'use client'

import { useEffect } from 'react'

/**
 * Client component that pushes an event to the dataLayer on mount.
 * Use in server component pages where useEffect isn't available.
 *
 * GTM picks up these events and forwards them to Meta Pixel as
 * standard events (ViewContent, Lead, CompleteRegistration, etc.)
 */
export function DataLayerEvent({
  event,
  data,
}: Readonly<{
  event: string
  data?: Record<string, string | number | boolean>
}>) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push({
        event,
        ...data,
      })
    }
  }, [event, data])

  return null
}

export default DataLayerEvent
