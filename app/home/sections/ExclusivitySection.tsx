import Image from "@/components/ui/image"
import Link from "next/link"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { scaleIn, slideInLeft, slideInRight } from "@/lib/animations"

export function ExclusivitySection() {
  return (
    <section id="home-exclusivity-section" className="w-full bg-mvl-beige py-20 md:py-32">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <ScrollReveal className="mb-16 overflow-hidden">
          <StaggerContainer className="overflow-hidden">
            <h2 className="font-montserrat text-mvl-coral text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide max-w-4xl overflow-hidden">
              <StaggerItem>
                <span className="block overflow-hidden">Montrose ownership,</span>
              </StaggerItem>
              <StaggerItem>
                <span className="block overflow-hidden">finally within reach.</span>
              </StaggerItem>
              <StaggerItem>
                <span className="block overflow-hidden">42 modern condos</span>
              </StaggerItem>
              <StaggerItem>
                <span className="block overflow-hidden">starting in the $215Ks.</span>
              </StaggerItem>
            </h2>
          </StaggerContainer>
        </ScrollReveal>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <ScrollReveal variant={slideInLeft} className="relative w-full md:w-3/4 h-72 md:h-96 overflow-hidden">
            <Image
              src="/images/unit-9_1-bed/9-3.jpg"
              alt="Modern condo kitchen at Mount Vernon Lofts in Montrose"
              fill
              className="object-cover"
              loading="lazy"
            />
          </ScrollReveal>
          <ScrollReveal variant={slideInRight} delay={0.2} className="relative w-full md:w-1/4 h-72 md:h-96 overflow-hidden">
            <Image
              src="/images/unit-8_1-bed/8-8.jpg"
              alt="Bathroom at Mount Vernon Lofts in Montrose"
              fill
              className="object-cover"
              loading="lazy"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}