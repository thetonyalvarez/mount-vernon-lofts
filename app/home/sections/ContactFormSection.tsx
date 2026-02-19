"use client"

import { useState, useEffect, useId } from "react"
import { Phone, Mail, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { fadeInUp, fadeIn } from "@/lib/animations"
import { contactModalConfig } from "@/app/config/contact-modal"
import { contactInfo } from "@/app/config/navigation"
import { trackContactForm, trackError } from "@/app/components/analytics"
import metadataCollector from "@/lib/metadata-collector"
import type { FormData, EnhancedFormData } from "@/app/types"

export function ContactFormSection() {
  const router = useRouter()
  const uniqueId = useId()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    isBroker: "",
    preferredFloor: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submissionId, setSubmissionId] = useState<string>("")

  useEffect(() => {
    const id = `submission_${uniqueId.replace(/:/g, '_')}_${Date.now()}`
    setSubmissionId(id)
    metadataCollector.startFormTracking("contact_form_section")
  }, [uniqueId])

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    metadataCollector.trackFieldInteraction(field)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      isBroker: "",
      preferredFloor: "",
    })
    setSubmitStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const metadata = metadataCollector.getMetadata("contact_form_section", "on_page_form")

      const enhancedFormData: EnhancedFormData = {
        ...formData,
        modalId: "contact_form_section",
        triggerSource: "on_page_form",
        submissionId
      }

      const payload = {
        formData: enhancedFormData,
        metadata: {
          modalId: "contact_form_section",
          modalTriggerSource: "on_page_form",
          siteUrl: window.location.origin,
          submissionId,
          sessionData: metadata.sessionData,
          deviceInfo: metadata.deviceInfo,
          interactionMetrics: metadata.interactionMetrics,
          leadScore: metadata.leadScore
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      trackContactForm('inquiry', "contact_form_section", true)

      // Redirect to thank you page
      router.push('/thank-you')
    } catch (error) {
      console.error("Form submission error:", error)

      trackContactForm('inquiry', "contact_form_section", false)
      trackError(`Contact form submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false, 'form')

      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form-section" className="w-full bg-mvl-warm-white py-20 md:py-32">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <ScrollReveal className="max-w-4xl mx-auto">
          <StaggerContainer>
            <div className="text-center mb-12">
              <StaggerItem>
                <h2 className="font-montserrat text-mvl-coral text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide mb-4">
                  Begin Your Journey
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-mvl-espresso text-lg md:text-xl font-light">
                  Connect with our team to learn more about modern condos in Montrose
                </p>
              </StaggerItem>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === "error" && (
                    <ScrollReveal variant={fadeInUp}>
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700 text-sm">
                          {contactModalConfig.messages.error.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  )}

                  <ScrollReveal variant={fadeInUp} delay={0.1}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder={contactModalConfig.form.fields.name.placeholder}
                        value={formData.name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                        className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                        required
                        disabled={isSubmitting}
                      />
                      <Input
                        type="email"
                        placeholder={contactModalConfig.form.fields.email.placeholder}
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
                      placeholder={contactModalConfig.form.fields.phone.placeholder}
                      value={formData.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </ScrollReveal>

                  <ScrollReveal variant={fadeInUp} delay={0.3}>
                    <Textarea
                      placeholder={contactModalConfig.form.fields.message.placeholder}
                      value={formData.message}
                      onChange={(e) => handleFormChange("message", e.target.value)}
                      className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral min-h-[120px] transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </ScrollReveal>

                  <ScrollReveal variant={fadeInUp} delay={0.4}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Select
                        value={formData.isBroker ?? ""}
                        onChange={(e) => handleFormChange("isBroker", e.target.value)}
                        className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        <option value="">Are you an agent/broker? (Optional)</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Select>
                      <Select
                        value={formData.preferredFloor ?? ""}
                        onChange={(e) => handleFormChange("preferredFloor", e.target.value)}
                        className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        <option value="">What are you looking for? (Optional)</option>
                        <option value="studio">Studio</option>
                        <option value="1-bedroom">1-Bedroom</option>
                        <option value="not-sure">Not Sure Yet</option>
                      </Select>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal variant={fadeInUp} delay={0.5}>
                    <Button
                      type="submit"
                      className="w-full bg-mvl-coral text-white hover:bg-mvl-coral-dark transition-all duration-300 uppercase tracking-wider disabled:opacity-50"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          {contactModalConfig.form.submitButton.loading}
                        </>
                      ) : (
                        contactModalConfig.form.submitButton.default
                      )}
                    </Button>
                  </ScrollReveal>

                  <ScrollReveal variant={fadeIn} delay={0.6}>
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