'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    _support: {
      account?: string
      ui?: {
        contactMode?: string
        enableKb?: string
        mailbox?: string
        styles?: {
          widgetColor?: string
          gradient?: boolean
        }
        shoutboxFacesMode?: string
        widget?: {
          allowBotProcessing?: string
          slug?: string
          label?: {
            text?: string
            mode?: string
            delay?: number
            duration?: number
            primary?: string
            secondary?: string
            sound?: boolean
          }
          position?: string
        }
        overrides?: {
          confirmationMessage?: string
        }
      }
      user?: Record<string, unknown>
      apps?: {
        recentConversations?: Record<string, unknown>
        faq?: {
          enabled?: boolean
        }
      }
    }
  }
}

export function GoDaddyChat() {
  useEffect(() => {
    // Initialize the _support object
    if (typeof window !== 'undefined') {
      window._support = window._support || { ui: {}, user: {} }
      window._support.account = '73853174-d077-4979-9ac2-eb90bb803ed9'
      window._support.ui = window._support.ui || {}
      window._support.ui.contactMode = 'mixed'
      window._support.ui.enableKb = 'true'
      window._support.ui.mailbox = '76787345'
      window._support.ui.styles = {
        widgetColor: '#fffcf7', // MVL Cream
        gradient: true,
      }
      window._support.ui.shoutboxFacesMode = ''
      window._support.ui.widget = {
        allowBotProcessing: 'false',
        slug: 'mount-vernon-website',
        label: {
          text: 'Hi, how can we help?',
          mode: 'notification',
          delay: 3,
          duration: 30,
          primary: '',
          secondary: '',
          sound: true,
        },
        position: 'bottom-right'
      }
      window._support.ui.overrides = window._support.ui.overrides || {}
      window._support.ui.overrides.confirmationMessage = ''
      window._support.apps = {
        recentConversations: {},
        faq: { enabled: true }
      }
    }
  }, [])

  return (
    <>
      <Script
        id="godaddy-chat"
        src="https://cdn.reamaze.com/assets/reamaze-loader.js"
        strategy="lazyOnload"
        async
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[GoDaddy Chat] Script loaded successfully')
          }
        }}
        onError={(error) => {
          console.error('[GoDaddy Chat] Failed to load script:', error)
        }}
      />
    </>
  )
}

export default GoDaddyChat