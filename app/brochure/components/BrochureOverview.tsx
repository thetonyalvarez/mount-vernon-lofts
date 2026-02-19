"use client"

import { Download, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"

export function BrochureOverview() {
  const scrollToForm = () => {
    const formElement = document.getElementById('brochure-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const brochureContents = [
    "Detailed floor plans for all three residence designs",
    "High-resolution architectural renderings",
    "Complete amenities and features overview",
    "Finishes and materials specifications",
    "Building location and neighborhood guide",
    "Investment and pricing information"
  ] as const

  return (
    <section className="relative w-full bg-gradient-to-b from-mvl-espresso to-mvl-espresso-dark text-white py-20 md:py-32 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <ScrollReveal>
          <StaggerContainer>
            <div className="text-center mb-16">
              <StaggerItem>
                <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide mb-6">
                  Your Path to Montrose Living
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xl md:text-2xl font-light text-mvl-beige mb-4 max-w-3xl mx-auto">
                  Discover everything that makes Mount Vernon Lofts your path to Montrose homeownership
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-lg text-mvl-beige/80 max-w-2xl mx-auto">
                  Download our brochure and explore the details of modern condo living in Montrose.
                </p>
              </StaggerItem>
            </div>

            {/* What's Included Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-montserrat font-light text-center mb-8">
                  Inside the Brochure
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {brochureContents.map((item, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-mvl-beige flex-shrink-0 mt-0.5" />
                        <p className="text-mvl-beige/90 text-lg">{item}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <StaggerItem>
              <div className="text-center">
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-mvl-coral hover:bg-mvl-coral-dark text-white px-8 py-4 text-lg font-medium tracking-wide transition-all duration-300 group"
                >
                  <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Download Brochure
                </Button>
                <p className="text-mvl-beige/70 text-sm mt-4">
                  Receive your complimentary brochure instantly via email
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  )
}
