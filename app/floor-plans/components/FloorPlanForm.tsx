"use client"

import { useState, useEffect, useId } from "react"
import { Download, Phone, Mail, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { fadeInUp, fadeIn } from "@/lib/animations"
import { contactInfo } from "@/app/config/navigation"
import metadataCollector from "@/lib/metadata-collector"
import { trackFloorPlansRequest } from "@/app/components/analytics"
import { floorPlanTypes } from "@/app/config/floor-plan-data"

interface FloorPlanFormData {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly message: string
  readonly isBroker?: string
  readonly preferredFloor?: string
  readonly floorPlansInterest: string
  readonly timeframe?: string
}

interface EnhancedFloorPlanFormData extends FloorPlanFormData {
  readonly modalId: string
  readonly triggerSource: string
  readonly submissionId: string
}

export function FloorPlanForm() {
  const router = useRouter()
  const uniqueId = useId()
  const [formData, setFormData] = useState<FloorPlanFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    isBroker: "",
    preferredFloor: "",
    floorPlansInterest: "all_plans",
    timeframe: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submissionId, setSubmissionId] = useState<string>("")
  const [_renderTimestamp] = useState<number>(() => Date.now())
  const [_honeypot, setHoneypot] = useState<string>("")

  useEffect(() => {
    const id = `floor_plans_${uniqueId.replace(/:/g, '_')}_${Date.now()}`
    setSubmissionId(id)
    metadataCollector.startFormTracking("floor_plans_form")
  }, [uniqueId])

  const handleFormChange = (field: keyof FloorPlanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    metadataCollector.trackFieldInteraction(field)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const metadata = metadataCollector.getMetadata("floor_plans_form", "floor_plans_page")

      const enhancedFormData: EnhancedFloorPlanFormData = {
        ...formData,
        modalId: "floor_plans_form",
        triggerSource: "floor_plans_page",
        submissionId
      }

      const payload = {
        formData: enhancedFormData,
        metadata: {
          modalId: "floor_plans_form",
          modalTriggerSource: "floor_plans_page",
          siteUrl: window.location.origin,
          submissionId,
          sessionData: metadata.sessionData,
          deviceInfo: metadata.deviceInfo,
          interactionMetrics: metadata.interactionMetrics,
          leadScore: metadata.leadScore + 25 // Floor plans interest adds 25 points
        }
      }

      const response = await fetch("/api/floor-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, _spamCheck: { website: _honeypot, _renderTimestamp } }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      // Track successful floor plan request
      trackFloorPlansRequest(
        formData.floorPlansInterest,
        'floor_plans_page',
        true,
        {
          timeline: formData.timeframe,
          isBroker: formData.isBroker,
          leadScore: metadata.leadScore + 25
        }
      )

      // Redirect to thank you page
      router.push('/thank-you-floor-plans')
    } catch (error) {
      console.error("Floor plan form submission error:", error)

      // Track failed floor plan request
      trackFloorPlansRequest(
        formData.floorPlansInterest,
        'floor_plans_page',
        false,
        {
          timeline: formData.timeframe,
          isBroker: formData.isBroker,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      )

      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="floor-plan-form" className="w-full bg-mvl-warm-white py-20 md:py-32">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <ScrollReveal className="max-w-4xl mx-auto">
          <StaggerContainer>
            <div className="text-center mb-12">
              <StaggerItem>
                <h2 className="font-montserrat text-mvl-espresso text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
                  Request Floor Plans
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-mvl-espresso/70 text-lg md:text-xl">
                  Get detailed layouts and specifications sent to your inbox
                </p>
              </StaggerItem>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                {submitStatus === "error" && (
                  <ScrollReveal variant={fadeInUp}>
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-red-700 text-sm">
                        Unable to process your request. Please try again or contact us directly.
                      </p>
                    </div>
                  </ScrollReveal>
                )}

                <ScrollReveal variant={fadeInUp} delay={0.1}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal variant={fadeInUp} delay={0.2}>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </ScrollReveal>

                <ScrollReveal variant={fadeInUp} delay={0.3}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Select
                      value={formData.floorPlansInterest ?? ""}
                      onChange={(e) => handleFormChange("floorPlansInterest", e.target.value)}
                      className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Floor Plan Interest</option>
                      <option value="all_plans">All Floor Plans</option>
                      <option value="studios">All Studios</option>
                      <option value="1_bedrooms">All 1-Bedrooms</option>
                      {floorPlanTypes.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.label} ({plan.sqft} SF)
                        </option>
                      ))}
                    </Select>
                    <Select
                      value={formData.timeframe ?? ""}
                      onChange={(e) => handleFormChange("timeframe", e.target.value)}
                      className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      <option value="">Timeline (Optional)</option>
                      <option value="immediate">Ready to Move</option>
                      <option value="3_months">Within 3 Months</option>
                      <option value="6_months">Within 6 Months</option>
                      <option value="1_year">Within 1 Year</option>
                      <option value="exploring">Just Exploring</option>
                    </Select>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant={fadeInUp} delay={0.4}>
                  <Textarea
                    placeholder="Message (Optional) - Tell us about what you're looking for or any specific questions"
                    value={formData.message}
                    onChange={(e) => handleFormChange("message", e.target.value)}
                    className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral min-h-[100px] transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </ScrollReveal>

                <ScrollReveal variant={fadeInUp} delay={0.5}>
                  <Select
                    value={formData.isBroker ?? ""}
                    onChange={(e) => handleFormChange("isBroker", e.target.value)}
                    className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <option value="">Are you an agent/broker? (Optional)</option>
                    <option value="yes">Yes, I am a real estate professional</option>
                    <option value="no">No, I am a prospective buyer</option>
                  </Select>
                </ScrollReveal>

                <ScrollReveal variant={fadeInUp} delay={0.6}>
                  <Button
                    type="submit"
                    className="w-full bg-mvl-coral text-white hover:bg-mvl-coral-dark transition-all duration-300 uppercase tracking-wider disabled:opacity-50"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Sending Floor Plans...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Get Floor Plans Now
                      </>
                    )}
                  </Button>
                </ScrollReveal>

                <ScrollReveal variant={fadeIn} delay={0.7}>
                  <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 pt-6 border-t border-gray-200 text-gray-600 text-sm">
                    <a
                      href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                      className="flex items-center justify-center gap-2 hover:text-mvl-coral transition-colors duration-200"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{contactInfo.phone}</span>
                    </a>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center justify-center gap-2 hover:text-mvl-coral transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{contactInfo.email}</span>
                    </a>
                  </div>
                </ScrollReveal>
              </form>
            </div>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  )
}