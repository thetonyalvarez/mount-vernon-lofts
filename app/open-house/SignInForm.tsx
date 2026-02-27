"use client"

import { useState } from "react"
import type { OpenHouseEvent } from "@/app/config/open-house-data"

interface SignInFormProps {
  readonly event: OpenHouseEvent
}

export function SignInForm({ event }: SignInFormProps) {
  const isBroker = event.eventType === "broker"

  const [formData, setFormData] = useState({
    name: "",
    brokerage: "",
    email: "",
    phone: "",
    visitedBefore: "" as "" | "yes" | "no",
    hasActiveBuyer: "" as "" | "yes" | "no" | "maybe",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [_renderTimestamp] = useState<number>(() => Date.now())
  const [_honeypot, setHoneypot] = useState<string>("")

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const eventDate = event.startsAt.split("T")[0]
      const response = await fetch("/api/open-house/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: {
            name: formData.name,
            brokerage: formData.brokerage,
            email: formData.email,
            phone: formData.phone,
            visitedBefore: formData.visitedBefore,
            hasActiveBuyer: formData.hasActiveBuyer,
          },
          eventMeta: {
            eventId: event.id,
            eventType: event.eventType,
            eventDate,
            formType: isBroker ? "broker_open_house_signin" : "public_open_house_signin",
          },
          sourceUrl: window.location.href,
          _spamCheck: { website: _honeypot, _renderTimestamp },
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? "Submission failed")
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-montserrat text-2xl font-semibold text-mvl-espresso mb-2">
          You&apos;re checked in!
        </h2>
        <p className="text-mvl-espresso/70">
          Welcome to Mount Vernon Lofts. Enjoy the tour.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-montserrat text-2xl font-semibold text-mvl-espresso mb-1">
          Welcome
        </h1>
        <p className="text-mvl-espresso/70 text-sm">
          {event.title}
        </p>
        <p className="text-mvl-espresso/50 text-xs mt-1">
          {event.date} | {event.startTime} &ndash; {event.endTime}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from humans, filled by bots */}
        <input
          type="text"
          name="website"
          value={_honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
        />

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full name"
          required
          value={formData.name}
          onChange={e => handleChange("name", e.target.value)}
          className="w-full h-14 text-lg px-4 rounded-[4px] border border-mvl-beige bg-white text-mvl-espresso placeholder:text-mvl-espresso/40 focus:outline-none focus:border-mvl-coral transition-colors"
        />

        {/* Brokerage — broker events only */}
        {isBroker && (
          <input
            type="text"
            name="brokerage"
            placeholder="Brokerage"
            required
            value={formData.brokerage}
            onChange={e => handleChange("brokerage", e.target.value)}
            className="w-full h-14 text-lg px-4 rounded-[4px] border border-mvl-beige bg-white text-mvl-espresso placeholder:text-mvl-espresso/40 focus:outline-none focus:border-mvl-coral transition-colors"
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={e => handleChange("email", e.target.value)}
          className="w-full h-14 text-lg px-4 rounded-[4px] border border-mvl-beige bg-white text-mvl-espresso placeholder:text-mvl-espresso/40 focus:outline-none focus:border-mvl-coral transition-colors"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={e => handleChange("phone", e.target.value)}
          className="w-full h-14 text-lg px-4 rounded-[4px] border border-mvl-beige bg-white text-mvl-espresso placeholder:text-mvl-espresso/40 focus:outline-none focus:border-mvl-coral transition-colors"
        />

        {/* Visited Before */}
        <fieldset>
          <legend className="text-mvl-espresso font-medium text-sm mb-2">
            {isBroker
              ? "Have you toured Mount Vernon Lofts before?"
              : "Have you visited Mount Vernon Lofts before?"}
          </legend>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map(value => (
              <label
                key={value}
                className={`flex-1 flex items-center justify-center h-12 rounded-[4px] border cursor-pointer transition-colors text-sm font-medium ${
                  formData.visitedBefore === value
                    ? "border-mvl-coral bg-mvl-coral/10 text-mvl-coral"
                    : "border-mvl-beige bg-white text-mvl-espresso/70 hover:border-mvl-espresso/30"
                }`}
              >
                <input
                  type="radio"
                  name="visitedBefore"
                  value={value}
                  required
                  checked={formData.visitedBefore === value}
                  onChange={() => handleChange("visitedBefore", value)}
                  className="sr-only"
                />
                {value === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Has Active Buyer — broker events only */}
        {isBroker && (
        <fieldset>
          <legend className="text-mvl-espresso font-medium text-sm mb-2">
            Do you have an active buyer for this product type?
          </legend>
          <div className="flex gap-3">
            {(["yes", "no", "maybe"] as const).map(value => (
              <label
                key={value}
                className={`flex-1 flex items-center justify-center h-12 rounded-[4px] border cursor-pointer transition-colors text-sm font-medium ${
                  formData.hasActiveBuyer === value
                    ? "border-mvl-coral bg-mvl-coral/10 text-mvl-coral"
                    : "border-mvl-beige bg-white text-mvl-espresso/70 hover:border-mvl-espresso/30"
                }`}
              >
                <input
                  type="radio"
                  name="hasActiveBuyer"
                  value={value}
                  required
                  checked={formData.hasActiveBuyer === value}
                  onChange={() => handleChange("hasActiveBuyer", value)}
                  className="sr-only"
                />
                {value === "yes" ? "Yes" : value === "no" ? "No" : "Maybe"}
              </label>
            ))}
          </div>
        </fieldset>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-mvl-coral text-white font-semibold text-lg rounded-[4px] hover:bg-mvl-coral-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  )
}
