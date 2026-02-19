"use client"

import Image from "@/components/ui/image"
import { interiorFeatures } from "@/app/config/architecture-interiors"
import { useContactModal } from "@/lib/contact-modal-context"
import { ScrollReveal, SplitText, StaggerContainer, StaggerItem } from "@/components/animations"
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations"

export function InteriorsSection() {
  const { openModal } = useContactModal()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        {/* Section Header */}
        <ScrollReveal className="overflow-hidden">
          <div className="text-center mb-20 overflow-hidden">
            <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-4 overflow-hidden">
              <SplitText letterDelay={0.05}>
                Interiors
              </SplitText>
            </h2>
            <p className="text-lg md:text-xl text-mvl-espresso/70 max-w-3xl mx-auto">
              Every detail designed to create homes that transcend the ordinary
            </p>
          </div>
        </ScrollReveal>

        {/* Interior Features */}
        <StaggerContainer className="space-y-32">
          {interiorFeatures.map((feature, index) => (
            <StaggerItem key={feature.title} index={index}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Image */}
                <ScrollReveal variant={index % 2 === 0 ? slideInLeft : slideInRight}>
                  <div className={`relative h-[400px] md:h-[500px] lg:h-[600px] ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}>
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal variant={index % 2 === 0 ? slideInRight : slideInLeft} delay={0.2} className="overflow-hidden">
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} overflow-hidden`}>
                    <h3 className="font-montserrat text-3xl md:text-4xl lg:text-5xl text-mvl-espresso mb-6 leading-tight overflow-hidden">
                      <SplitText letterDelay={0.1}>
                        {feature.title}
                      </SplitText>
                    </h3>
                    <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollReveal variant={fadeInUp} delay={0.3}>
          <div id="interiors-cta" className="text-center mt-20">
            <p className="text-mvl-espresso/70 mb-6">
              Experience the architectural excellence and thoughtful design in person.
            </p>
            <button
              id="interiors-cta-link"
              onClick={() => openModal('interiors_cta_button', 'contact_modal_interiors')}
              className="inline-flex items-center border-2 border-mvl-espresso text-mvl-espresso px-8 py-3 hover:bg-mvl-espresso hover:text-white transition-all duration-300 uppercase tracking-wider"
            >
              Schedule a Private Tour
              <span className="ml-2">→</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
