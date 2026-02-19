"use client"

import { useState, useEffect, useId } from "react"
import { Phone, Mail, AlertCircle, Wifi, WifiOff, RefreshCw, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "@/components/ui/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useContactModal } from "@/lib/contact-modal-context"
import { contactModalConfig, contactDisplayConfig } from "@/app/config/contact-modal"
import { contactInfo } from "@/app/config/navigation"
import { trackContactForm, trackError } from "@/app/components/analytics"
import metadataCollector from "@/lib/metadata-collector"
import { formQueue, formatTimeAgo, formatNextRetry } from "@/lib/form-queue"
import type { FormData, EnhancedFormData } from "@/app/types"
import type { QueueStats } from "@/lib/form-queue"

export function ContactModal() {
  const { isOpen, modalId, triggerSource, closeModal } = useContactModal()
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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "queued">("idle")
  const [submissionId, setSubmissionId] = useState<string>("")
  const [isOnline, setIsOnline] = useState(true)
  const [queueStats, setQueueStats] = useState<QueueStats>({ total: 0, pending: 0, retrying: 0, failed: 0, succeeded: 0 })
  const [showQueueStatus, setShowQueueStatus] = useState(false)

  // Generate unique submission ID
  useEffect(() => {
    if (isOpen && !submissionId) {
      const id = `submission_${uniqueId.replace(/:/g, '_')}_${Date.now()}`
      setSubmissionId(id)

      // Start form tracking when modal opens
      metadataCollector.startFormTracking(modalId)
    }
  }, [isOpen, modalId, uniqueId, submissionId])

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Track field interaction for metadata
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
      // Collect comprehensive metadata
      const metadata = metadataCollector.getMetadata(modalId, triggerSource)

      // Create enhanced form data with metadata
      const enhancedFormData: EnhancedFormData = {
        ...formData,
        modalId,
        triggerSource,
        submissionId
      }

      // Prepare payload with metadata
      const payload = {
        formData: enhancedFormData,
        metadata: {
          modalId,
          modalTriggerSource: triggerSource,
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

      // Track successful form submission
      trackContactForm('inquiry', modalId, true)

      // Close modal and redirect to thank you page
      closeModal()
      resetForm()

      // Redirect to thank you page
      router.push('/thank-you')
    } catch (error) {
      console.error("Form submission error:", error)

      // Track form submission error
      trackContactForm('inquiry', modalId, false)
      trackError(`Contact form submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false, 'form')

      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closeModal()
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white">
        {/* Header with logo and title */}
        <div className="bg-mvl-espresso px-8 py-6">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logos/logo_v_white.png"
              alt="Mount Vernon Lofts Logo"
              width={contactDisplayConfig.logoSize.width}
              height={contactDisplayConfig.logoSize.height}
              className="opacity-90"
            />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl md:text-3xl font-montserrat text-white font-light">
              {contactModalConfig.title}
            </DialogTitle>
            <p className="text-white/80 mt-2">
              {contactModalConfig.subtitle}
            </p>
          </DialogHeader>
        </div>

        {/* Form content */}
        <div className="px-8 py-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
              {submitStatus === "error" && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 text-sm">
                    {contactModalConfig.messages.error.description}
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-3 duration-500 delay-100">
                <Input
                  placeholder={contactModalConfig.form.fields.name.placeholder}
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300 focus:scale-105"
                  required
                  disabled={isSubmitting}
                />
                <Input
                  type="email"
                  placeholder={contactModalConfig.form.fields.email.placeholder}
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300 focus:scale-105"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="animate-in slide-in-from-bottom-3 duration-500 delay-200">
                <Input
                  type="tel"
                  placeholder={contactModalConfig.form.fields.phone.placeholder}
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300 focus:scale-105"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="animate-in slide-in-from-bottom-3 duration-500 delay-300">
                <Textarea
                  placeholder={contactModalConfig.form.fields.message.placeholder}
                  value={formData.message}
                  onChange={(e) => handleFormChange("message", e.target.value)}
                  className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral min-h-[120px] transition-all duration-300 focus:scale-105"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-3 duration-500 delay-350">
                <Select
                  value={formData.isBroker ?? ""}
                  onChange={(e) => handleFormChange("isBroker", e.target.value)}
                  className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300 focus:scale-105"
                  disabled={isSubmitting}
                >
                  <option value="">Are you an agent/broker? (Optional)</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
                <Select
                  value={formData.preferredFloor ?? ""}
                  onChange={(e) => handleFormChange("preferredFloor", e.target.value)}
                  className="border-gray-300 focus:border-mvl-coral focus:ring-mvl-coral transition-all duration-300 focus:scale-105"
                  disabled={isSubmitting}
                >
                  <option value="">What are you looking for? (Optional)</option>
                  <option value="studio">Studio</option>
                  <option value="1-bedroom">1-Bedroom</option>
                  <option value="not-sure">Not Sure Yet</option>
                </Select>
              </div>

              <div className="animate-in slide-in-from-bottom-3 duration-500 delay-400">
                <Button
                  type="submit"
                  className="w-full bg-mvl-coral text-white hover:bg-mvl-coral-dark hover:scale-105 transition-all duration-300 uppercase tracking-wider disabled:opacity-50 relative"
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
              </div>
            </form>

          {/* Contact information */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 pt-6 border-t border-gray-200 text-gray-600 text-sm animate-in fade-in duration-500 delay-500">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{contactInfo.email}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}