import { Metadata } from "next"
import { CheckCircle, Download, Mail, Phone, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { CONTACT_CONFIG } from "@/app/config/contact"

export const metadata: Metadata = {
  title: "Brochure Delivered | Mount Vernon Lofts — Montrose Condos",
  description: "Your brochure has been sent to your email. Thank you for your interest in Mount Vernon Lofts, modern condos in Montrose, Houston.",
  robots: "noindex, nofollow"
}

export default function ThankYouBrochurePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-mvl-warm-white to-white">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-20 md:py-32">
        <ScrollReveal>
          <StaggerContainer>
            <div className="max-w-4xl mx-auto text-center">
              {/* Success Icon and Title */}
              <StaggerItem>
                <div className="mb-8">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h1 className="font-montserrat text-mvl-coral text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-wide mb-4">
                    Brochure Delivered
                  </h1>
                  <p className="text-mvl-espresso text-xl md:text-2xl font-light">
                    Your brochure is on its way to your inbox
                  </p>
                </div>
              </StaggerItem>

              {/* Email Delivery Status */}
              <StaggerItem>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-mvl-coral" />
                    <h2 className="text-xl font-medium text-mvl-espresso">
                      Check Your Email
                    </h2>
                  </div>
                  <p className="text-mvl-espresso/80 mb-6">
                    Your comprehensive brochure has been sent to your email address.
                    The PDF includes unit layouts, building details, neighborhood highlights,
                    and pricing information.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-mvl-espresso/70">
                      <Download className="w-4 h-4" />
                      <span>PDF with download link included</span>
                    </div>
                    <div className="flex items-center gap-2 text-mvl-espresso/70">
                      <CheckCircle className="w-4 h-4" />
                      <span>Delivery within 5 minutes</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-mvl-beige rounded-lg">
                    <p className="text-sm text-mvl-espresso/80">
                      <strong>Didn&apos;t receive it?</strong> Check your spam folder or contact us directly at{" "}
                      <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-mvl-coral hover:underline">
                        {CONTACT_CONFIG.email}
                      </a>
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* What's Next Section */}
              <StaggerItem>
                <div className="bg-mvl-espresso text-white rounded-lg p-8 mb-12">
                  <h2 className="font-montserrat text-3xl md:text-4xl font-light mb-6">
                    What&apos;s Next?
                  </h2>
                  <p className="text-mvl-beige text-lg mb-8 max-w-2xl mx-auto">
                    Now that you have the complete information, let our team help you
                    discover how Mount Vernon Lofts can become your first home.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mvl-coral rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-medium mb-2">Talk to Our Team</h3>
                      <p className="text-sm text-mvl-beige/80">
                        Discuss your options with our sales team
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mvl-coral rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-medium mb-2">Schedule a Tour</h3>
                      <p className="text-sm text-mvl-beige/80">
                        See the units in person by appointment
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mvl-coral rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-medium mb-2">Additional Materials</h3>
                      <p className="text-sm text-mvl-beige/80">
                        Receive detailed pricing and availability information
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-mvl-coral hover:bg-mvl-coral-dark text-white transition-all duration-300"
                    >
                      <a href={`mailto:${CONTACT_CONFIG.email}?subject=Schedule a Tour - Brochure Follow-up`}>
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule a Tour
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-mvl-espresso transition-all duration-300"
                    >
                      <a href={`tel:${CONTACT_CONFIG.phone.replace(/\D/g, '')}`}>
                        <Phone className="w-5 h-5 mr-2" />
                        Call {CONTACT_CONFIG.phone}
                      </a>
                    </Button>
                  </div>
                </div>
              </StaggerItem>

              {/* Additional Resources */}
              <StaggerItem>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-medium text-mvl-espresso mb-4">
                      Explore Mount Vernon Lofts
                    </h3>
                    <p className="text-mvl-espresso/80 mb-6">
                      Discover the location, neighborhood, and lifestyle that make Mount Vernon Lofts a great place to call home.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="border-mvl-coral text-mvl-coral hover:bg-mvl-coral hover:text-white"
                    >
                      <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Homepage
                      </Link>
                    </Button>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-medium text-mvl-espresso mb-4">
                      Have Questions?
                    </h3>
                    <p className="text-mvl-espresso/80 mb-6">
                      Our team is here to help you understand every detail about your future home.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="border-mvl-coral text-mvl-coral hover:bg-mvl-coral hover:text-white"
                    >
                      <Link href="/contact">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </StaggerItem>

              {/* Availability Reminder */}
              <StaggerItem>
                <div className="bg-gradient-to-r from-mvl-coral to-mvl-coral-dark text-white rounded-lg p-8">
                  <h3 className="font-montserrat text-2xl md:text-3xl font-light mb-4">
                    Montrose Ownership, Finally Within Reach
                  </h3>
                  <p className="text-mvl-beige text-lg max-w-2xl mx-auto">
                    Mount Vernon Lofts offers 42 modern condos in one of Houston&apos;s most walkable neighborhoods.
                    Starting in the $215Ks -- units are available now for immediate closing.
                  </p>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </main>
  )
}
