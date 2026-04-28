import Image from "@/components/ui/image"
import { ScrollReveal, ParallaxImage } from "@/components/animations"
import { scaleIn } from "@/lib/animations"
import { SectionEyebrow } from "@/app/components/SectionEyebrow"
import { ArrowCTA } from "@/app/components/ArrowCTA"

export function LifestyleSection() {
  return (
    <section className="relative bg-background w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="lg:w-1/2 flex flex-col justify-center h-full space-y-8 lg:space-y-10 lg:pr-24">
          <ScrollReveal>
            <SectionEyebrow label="Lifestyle" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-montserrat text-mvl-coral leading-tight font-light">
              Live in the Heart of Montrose
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-mvl-espresso leading-relaxed text-lg lg:text-xl max-w-2xl">
              Located in Houston&apos;s Montrose neighborhood, Mount Vernon Lofts puts you steps from local coffee shops, restaurants, bars, parks, and museums. Walk to everything you love about inner loop living -- this is one of the most walkable neighborhoods in Houston.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <ArrowCTA href="/neighborhood">Experience the Lifestyle</ArrowCTA>
          </ScrollReveal>
        </div>
      </div>
      {/* Image absolutely positioned on the right half, extends above and below text */}
      <ScrollReveal variant={scaleIn} className="hidden lg:block absolute inset-y-0 right-0 w-1/2 py-32 -mt-16 -mb-16">
        <ParallaxImage
          src="/images/unit-26_studio/26-12.jpg"
          alt="Montrose neighborhood lifestyle near Mount Vernon Lofts"
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
          src="/images/unit-26_studio/26-12.jpg"
          alt="Montrose neighborhood lifestyle near Mount Vernon Lofts"
          width={900}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </ScrollReveal>
    </section>
  )
}