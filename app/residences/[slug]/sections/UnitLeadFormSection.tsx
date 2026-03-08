"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface UnitLeadFormSectionProps {
  readonly unitType: UnitTypePageData
}

export function UnitLeadFormSection({ unitType }: UnitLeadFormSectionProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // honeypot and timing for spam protection
  const renderTimestamp = useRef(Date.now())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const honeypot = formData.get('_honeypot') as string

    // Spam check: honeypot field should be empty
    if (honeypot) {
      setIsSubmitting(false)
      return
    }

    // Spam check: submission too fast (under 3 seconds)
    const elapsed = Date.now() - renderTimestamp.current
    if (elapsed < 3000) {
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: message || `Interested in the ${unitType.unitType} ${unitType.layoutName} layout`,
          preferredFloor: unitType.cta.formPreFill,
          unitType: unitType.cta.hiddenUnitType,
          _honeypot: honeypot,
          _renderTimestamp: renderTimestamp.current,
          metadata: {
            pageUrl: window.location.href,
            referrer: document.referrer,
            unitType: unitType.cta.hiddenUnitType,
            unitSlug: unitType.slug,
          },
        }),
      })

      if (response.ok) {
        // Push analytics event
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'generate_lead',
            event_category: 'Unit Inquiry',
            event_label: unitType.slug,
            value: unitType.price,
          })
        }
        router.push('/thank-you')
      } else {
        setSubmitError('Something went wrong. Please try again or call us directly.')
      }
    } catch {
      setSubmitError('Unable to submit. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-3 text-center">
          {unitType.cta.buttonText}
        </h2>
        <p className="text-mvl-espresso/60 text-center mb-8">
          Fill out the form below and we&apos;ll be in touch within 24 hours.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/* honeypot — hidden from users */}
          <input
            type="text"
            name="_honeypot"
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="hidden"
            name="_renderTimestamp"
            value={renderTimestamp.current}
          />

          {/* Hidden unitType field */}
          <input
            type="hidden"
            name="unitType"
            value={unitType.cta.hiddenUnitType}
          />

          <div>
            <label htmlFor="unit-form-name" className="block text-sm font-medium text-mvl-espresso mb-1">
              Name *
            </label>
            <input
              id="unit-form-name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded bg-mvl-warm-white border border-mvl-beige text-mvl-espresso focus:outline-none focus:ring-2 focus:ring-mvl-coral/50"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="unit-form-email" className="block text-sm font-medium text-mvl-espresso mb-1">
              Email *
            </label>
            <input
              id="unit-form-email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded bg-mvl-warm-white border border-mvl-beige text-mvl-espresso focus:outline-none focus:ring-2 focus:ring-mvl-coral/50"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="unit-form-phone" className="block text-sm font-medium text-mvl-espresso mb-1">
              Phone *
            </label>
            <input
              id="unit-form-phone"
              name="phone"
              type="tel"
              required
              className="w-full px-4 py-3 rounded bg-mvl-warm-white border border-mvl-beige text-mvl-espresso focus:outline-none focus:ring-2 focus:ring-mvl-coral/50"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="unit-form-message" className="block text-sm font-medium text-mvl-espresso mb-1">
              Message (optional)
            </label>
            <textarea
              id="unit-form-message"
              name="message"
              rows={3}
              className="w-full px-4 py-3 rounded bg-mvl-warm-white border border-mvl-beige text-mvl-espresso focus:outline-none focus:ring-2 focus:ring-mvl-coral/50 resize-none"
              placeholder={`I'm interested in the ${unitType.unitType} ${unitType.layoutName} layout...`}
            />
          </div>

          {submitError && (
            <p className="text-red-600 text-sm">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-mvl-coral hover:bg-mvl-coral-dark text-white font-semibold py-3 px-6 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : unitType.cta.buttonText}
          </button>
        </form>

        <p className="text-center text-sm text-mvl-espresso/50 mt-8">
          713.986.9929 · INFO@MTVERNONLOFTS.COM · Tours available 7 days a week
        </p>
      </div>
    </section>
  )
}
