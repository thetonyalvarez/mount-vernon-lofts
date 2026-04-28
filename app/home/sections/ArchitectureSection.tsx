import Image from "@/components/ui/image"
import { ScrollReveal, ParallaxImage } from "@/components/animations"
import { scaleIn } from "@/lib/animations"
import { SectionEyebrow } from "@/app/components/SectionEyebrow"
import { ArrowCTA } from "@/app/components/ArrowCTA"

export function ArchitectureSection() {
  return (
    <section className="relative bg-background w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="lg:w-1/2 flex flex-col justify-center h-full space-y-8 lg:space-y-10 lg:pr-24">
          <ScrollReveal>
            <SectionEyebrow label="Architecture" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-montserrat text-mvl-coral leading-tight font-light">
              Modern Building, Smart Design
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-mvl-espresso leading-relaxed text-lg lg:text-xl max-w-2xl">
              Mount Vernon Lofts is a modern 2018-built building with clean design and thoughtful finishes. Each unit features an open floor plan with quality materials, designed for comfortable everyday living in the heart of Montrose.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <ArrowCTA href="/architecture">Explore the Building</ArrowCTA>
          </ScrollReveal>
        </div>
      </div>
      {/* Image absolutely positioned on the right half, extends above and below text */}
      <ScrollReveal variant={scaleIn} className="hidden lg:block absolute inset-y-0 right-0 w-1/2 py-32 -mt-16 -mb-16">
        <ParallaxImage
          src="/images/unit-8_1-bed/8-4.jpg"
          alt="Modern building design at Mount Vernon Lofts"
          fill
          className="object-cover"
          priority
          style={{ objectPosition: 'center' }}
          containerClassName="relative w-full h-full"
        />
      </ScrollReveal>
      {/* Mobile image below text */}
      <ScrollReveal className="lg:hidden w-full mt-8">
        <Image
          src="/images/unit-8_1-bed/8-4.jpg"
          alt="Modern building design at Mount Vernon Lofts"
          width={900}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </ScrollReveal>
    </section>
  )
}