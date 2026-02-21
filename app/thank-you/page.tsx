"use client"

import { useEffect } from "react"
import { CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "@/components/ui/image"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { fadeIn, fadeInUp } from "@/lib/animations"
import { contactInfo } from "@/app/config/navigation"


export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track thank you page view for analytics
      if (window.gtag) {
        window.gtag('event', 'contact_form_completion', {
          event_category: 'Form',
          event_label: 'Thank You Page View'
        })
      }

      // Push lead_conversion event for GTM → Meta Pixel (Lead)
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push({ event: 'lead_conversion', conversion_type: 'contact_form' })
    }
  }, [])

  const handleReturnHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-mvl-warm-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background pattern/texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-mvl-coral/10 to-transparent" />
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <StaggerContainer>
              {/* Logo */}
              <StaggerItem>
                <div className="mb-12">
                  <Image
                    src="/logos/logo_h_black.png"
                    alt="Mount Vernon Lofts Logo"
                    width={200}
                    height={80}
                    className="mx-auto opacity-80"
                  />
                </div>
              </StaggerItem>

              {/* Success Icon */}
              <StaggerItem>
                <ScrollReveal variant={fadeIn} delay={0.2}>
                  <div className="mb-8">
                    <CheckCircle className="w-20 h-20 text-mvl-coral mx-auto animate-pulse" />
                  </div>
                </ScrollReveal>
              </StaggerItem>

              {/* Thank You Message */}
              <StaggerItem>
                <ScrollReveal variant={fadeInUp} delay={0.3}>
                  <h1 className="font-montserrat text-mvl-espresso text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide mb-6">
                    Thank You
                  </h1>
                </ScrollReveal>
              </StaggerItem>

              <StaggerItem>
                <ScrollReveal variant={fadeInUp} delay={0.4}>
                  <h2 className="text-mvl-coral text-xl md:text-2xl font-light mb-8 tracking-wide">
                    Your Inquiry Has Been Received
                  </h2>
                </ScrollReveal>
              </StaggerItem>

              {/* Confirmation Message */}
              <StaggerItem>
                <ScrollReveal variant={fadeInUp} delay={0.5}>
                  <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 mb-12 max-w-2xl mx-auto">
                    <p className="text-mvl-espresso text-lg md:text-xl font-light leading-relaxed mb-6">
                      We appreciate your interest in Mount Vernon Lofts. Our team will review your inquiry and contact you within 24 hours to help you explore Montrose homeownership.
                    </p>
                    <p className="text-gray-600 text-base md:text-lg font-light">
                      In the meantime, feel free to explore more about our residences or contact us directly.
                    </p>
                  </div>
                </ScrollReveal>
              </StaggerItem>

              {/* Contact Information */}
              <StaggerItem>
                <ScrollReveal variant={fadeInUp} delay={0.6}>
                  <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
                    <a
                      href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-3 text-mvl-espresso hover:text-mvl-coral transition-colors duration-300 group"
                    >
                      <div className="p-3 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Call</div>
                        <div className="text-lg font-medium">{contactInfo.phone}</div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 text-mvl-espresso hover:text-mvl-coral transition-colors duration-300 group"
                    >
                      <div className="p-3 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Email</div>
                        <div className="text-lg font-medium">{contactInfo.email}</div>
                      </div>
                    </a>
                  </div>
                </ScrollReveal>
              </StaggerItem>

              {/* Return Home Button */}
              <StaggerItem>
                <ScrollReveal variant={fadeInUp} delay={0.7}>
                  <Button
                    onClick={handleReturnHome}
                    className="bg-mvl-coral text-white hover:bg-mvl-coral-dark transition-all duration-300 px-8 py-4 text-lg uppercase tracking-wider group"
                    size="lg"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    Return Home
                  </Button>
                </ScrollReveal>
              </StaggerItem>

              {/* Additional CTA */}
              <StaggerItem>
                <ScrollReveal variant={fadeIn} delay={0.8}>
                  <div className="mt-8 pt-8 border-t border-mvl-coral/20">
                    <p className="text-mvl-espresso/70 text-sm">
                      Discover more about{" "}
                      <button
                        onClick={() => router.push('/residences')}
                        className="text-mvl-coral hover:text-mvl-coral-dark underline transition-colors duration-300"
                      >
                        our residences
                      </button>
                      {" "}and{" "}
                      <button
                        onClick={() => router.push('/neighborhood')}
                        className="text-mvl-coral hover:text-mvl-coral-dark underline transition-colors duration-300"
                      >
                        the Montrose neighborhood
                      </button>
                    </p>
                  </div>
                </ScrollReveal>
              </StaggerItem>
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}