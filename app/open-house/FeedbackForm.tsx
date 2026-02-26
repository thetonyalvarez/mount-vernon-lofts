"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import type { OpenHouseEvent } from "@/app/config/open-house-data"
import { units, floorPlanTypes } from "@/app/config/floor-plan-data"

interface FeedbackFormProps {
  readonly event: OpenHouseEvent
  readonly prefillEmail: string | null
}

function getUnitLabel(unitId: string): string {
  const unit = units.find(u => u.unitNumber === unitId)
  if (!unit) return `Unit ${unitId}`
  const plan = floorPlanTypes.find(fp => fp.id === unit.floorPlan)
  if (!plan) return `Unit ${unitId}`
  const unitNum = unitId.split("-")[1]
  return `Unit ${unitNum} — ${plan.label} (${plan.sqft} SF)`
}

const LIKED_OPTIONS = [
  "Location",
  "Price point",
  "Unit finishes",
  "Building amenities",
  "Montrose neighborhood",
  "Other",
]

const CONCERN_OPTIONS = [
  "HOA fees",
  "No short-term rentals",
  "Unit size",
  "Parking",
  "Finishes",
  "Price",
  "Other",
]

export function FeedbackForm({ event, prefillEmail }: FeedbackFormProps) {
  const searchParams = useSearchParams()
  const emailFromParams = prefillEmail ?? searchParams.get("email") ?? ""

  const [formData, setFormData] = useState({
    email: emailFromParams,
    standoutUnits: [] as string[],
    likedMost: [] as string[],
    buyerConcerns: [] as string[],
    pricingComparison: "" as "" | "below_market" | "about_right" | "above_market",
    likelihoodToBring: 0,
    additionalComments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleCheckbox = (field: "standoutUnits" | "likedMost" | "buyerConcerns", value: string) => {
    setFormData(prev => {
      const arr = prev[field]
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
      return { ...prev, [field]: next }
    })
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!formData.pricingComparison) {
      setError("Please select a pricing comparison.")
      setIsSubmitting(false)
      return
    }
    if (formData.likelihoodToBring === 0) {
      setError("Please rate your likelihood to bring a buyer.")
      setIsSubmitting(false)
      return
    }

    try {
      const eventDate = event.startsAt.split("T")[0]
      const response = await fetch("/api/open-house/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: {
            email: formData.email,
            standoutUnits: formData.standoutUnits,
            likedMost: formData.likedMost,
            buyerConcerns: formData.buyerConcerns,
            pricingComparison: formData.pricingComparison,
            likelihoodToBring: formData.likelihoodToBring,
            additionalComments: formData.additionalComments || undefined,
          },
          eventMeta: {
            eventId: event.id,
            eventType: event.eventType,
            eventDate,
            formType: event.eventType === "broker" ? "broker_open_house_feedback" : "public_open_house_feedback",
          },
          sourceUrl: window.location.href,
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
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-montserrat text-2xl font-semibold text-mvl-espresso mb-2">
          Thank you for your feedback!
        </h2>
        <p className="text-mvl-espresso/70">
          Your input helps us better serve the Houston brokerage community.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-montserrat text-2xl font-semibold text-mvl-espresso mb-1">
          Post-Event Feedback
        </h1>
        <p className="text-mvl-espresso/70 text-sm">
          {event.title}
        </p>
        <p className="text-mvl-espresso/50 text-xs mt-1">
          {event.date}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email (pre-filled or editable) */}
        <div>
          <label className="block text-mvl-espresso font-medium text-sm mb-1">Your email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            disabled={!!emailFromParams}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full h-12 px-4 rounded-[4px] border border-mvl-beige bg-white text-mvl-espresso placeholder:text-mvl-espresso/40 focus:outline-none focus:border-mvl-coral transition-colors disabled:bg-mvl-beige/50 disabled:text-mvl-espresso/60"
          />
        </div>

        {/* Standout Units */}
        <fieldset>
          <legend className="text-mvl-espresso font-medium text-sm mb-3">
            Which unit(s) stood out to you?
          </legend>
          <div className="space-y-2">
            {event.featuredUnits.map(unitId => (
              <label
                key={unitId}
                className={`flex items-center gap-3 p-3 rounded-[4px] border cursor-pointer transition-colors ${
                  formData.standoutUnits.includes(unitId)
                    ? "border-mvl-coral bg-mvl-coral/10"
                    : "border-mvl-beige bg-white hover:border-mvl-espresso/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.standoutUnits.includes(unitId)}
                  onChange={() => toggleCheckbox("standoutUnits", unitId)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  formData.standoutUnits.includes(unitId)
                    ? "border-mvl-coral bg-mvl-coral"
                    : "border-mvl-espresso/30"
                }`}>
                  {formData.standoutUnits.includes(unitId) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-mvl-espresso text-sm">{getUnitLabel(unitId)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Liked Most */}
        <fieldset>
          <legend className="text-mvl-espresso font-medium text-sm mb-3">
            What did you like most about the property?
          </legend>
          <div className="flex flex-wrap gap-2">
            {LIKED_OPTIONS.map(option => (
              <label
                key={option}
                className={`px-4 py-2 rounded-[4px] border cursor-pointer transition-colors text-sm ${
                  formData.likedMost.includes(option)
                    ? "border-mvl-coral bg-mvl-coral/10 text-mvl-coral font-medium"
                    : "border-mvl-beige bg-white text-mvl-espresso/70 hover:border-mvl-espresso/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.likedMost.includes(option)}
                  onChange={() => toggleCheckbox("likedMost", option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Buyer Concerns */}
        <fieldset>
          <legend className="text-mvl-espresso font-medium text-sm mb-3">
            What concerns would your buyers have?
          </legend>
          <div className="flex flex-wrap gap-2">
            {CONCERN_OPTIONS.map(option => (
              <label
                key={option}
                className={`px-4 py-2 rounded-[4px] border cursor-pointer transition-colors text-sm ${
                  formData.buyerConcerns.includes(option)
                    ? "border-mvl-coral bg-mvl-coral/10 text-mvl-coral font-medium"
                    : "border-mvl-beige bg-white text-mvl-espresso/70 hover:border-mvl-espresso/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.buyerConcerns.includes(option)}
                  onChange={() => toggleCheckbox("buyerConcerns", option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Pricing Comparison */}
        <fieldset>
          <legend className="text-mvl-espresso font-medium text-sm mb-3">
            How does the pricing compare to what you&apos;d expect?
          </legend>
          <div className="flex gap-3">
            {([
              { value: "below_market", label: "Below market" },
              { value: "about_right", label: "About right" },
              { value: "above_market", label: "Above market" },
            ] as const).map(({ value, label }) => (
              <label
                key={value}
                className={`flex-1 flex items-center justify-center h-12 rounded-[4px] border cursor-pointer transition-colors text-sm font-medium ${
                  formData.pricingComparison === value
                    ? "border-mvl-coral bg-mvl-coral/10 text-mvl-coral"
                    : "border-mvl-beige bg-white text-mvl-espresso/70 hover:border-mvl-espresso/30"
                }`}
              >
                <input
                  type="radio"
                  name="pricingComparison"
                  value={value}
                  checked={formData.pricingComparison === value}
                  onChange={() => setFormData(prev => ({ ...prev, pricingComparison: value }))}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Likelihood to Bring Buyer (1-5) */}
        <fieldset>
          <legend className="text-mvl-espresso font-medium text-sm mb-3">
            How likely are you to bring a buyer to Mount Vernon Lofts?
          </legend>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, likelihoodToBring: n }))}
                className={`flex-1 h-12 rounded-[4px] border font-semibold transition-colors ${
                  formData.likelihoodToBring === n
                    ? "border-mvl-coral bg-mvl-coral text-white"
                    : "border-mvl-beige bg-white text-mvl-espresso/70 hover:border-mvl-espresso/30"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-mvl-espresso/40 mt-1 px-1">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>
        </fieldset>

        {/* Additional Comments */}
        <div>
          <label className="block text-mvl-espresso font-medium text-sm mb-2">
            Anything else we should know?
          </label>
          <textarea
            name="additionalComments"
            rows={3}
            value={formData.additionalComments}
            onChange={e => setFormData(prev => ({ ...prev, additionalComments: e.target.value }))}
            placeholder="Optional"
            className="w-full px-4 py-3 rounded-[4px] border border-mvl-beige bg-white text-mvl-espresso placeholder:text-mvl-espresso/40 focus:outline-none focus:border-mvl-coral transition-colors resize-none"
          />
        </div>

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
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  )
}
