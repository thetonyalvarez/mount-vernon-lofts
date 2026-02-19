import Image from "@/components/ui/image"
import Link from "next/link"
import { ScrollReveal, ParallaxImage } from "@/components/animations"
import { fadeInUp, scaleIn } from "@/lib/animations"
import { motion } from "framer-motion"

export function AmenitiesSection() {
  return (
    <section className="relative bg-background w-full overflow-hidden">
      {/* Image absolutely positioned on the left half, extends above and below text */}
      <ScrollReveal variant={scaleIn} className="hidden lg:block absolute inset-y-0 left-0 w-1/2 py-32 -mt-16 -mb-16">
        <ParallaxImage
          src="/images/unit-8_1-bed/8-6.jpg"
          alt="Modern kitchen at Mount Vernon Lofts"
          fill
          className="object-cover"
          priority
          style={{ objectPosition: 'center' }}
          containerClassName="relative w-full h-full"
        />
      </ScrollReveal>
      <div id="home-amenities-section" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div id="home-amenities-section-content" className="lg:w-1/2 flex flex-col justify-center h-full space-y-8 lg:space-y-10 lg:pl-24 lg:ml-auto">
          <ScrollReveal>
            <div id="home-amenities-section-title" className="flex items-center space-x-6 mb-2">
              <motion.div
                className="flex-1 h-px bg-mvl-coral max-w-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
              <span id="home-amenities-section-overline-text" className="text-sm font-medium uppercase tracking-widest text-mvl-coral">
                Amenities
              </span>
              <motion.div
                className="flex-1 h-px bg-mvl-coral max-w-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformOrigin: "right" }}
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 id="home-amenities-section-title-text" className="text-4xl lg:text-5xl xl:text-6xl font-montserrat text-mvl-coral leading-tight font-light">
              Building Features That Matter
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p id="home-amenities-section-description-text" className="text-mvl-espresso leading-relaxed text-lg lg:text-xl max-w-2xl">
              Practical building features designed for everyday comfort. Covered parking, in-unit washer/dryer, and a walkable Montrose location make daily life simple.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link id="home-amenities-section-link" href="/amenities" className="flex items-center space-x-6 pt-6 group">
              <span id="home-amenities-section-link-text" className="text-mvl-espresso font-medium uppercase tracking-wider text-sm">
                See Building Features
              </span>
              <div className="flex-1 h-px bg-mvl-espresso max-w-20"></div>
              <div className="w-8 h-8 rounded-full border border-mvl-espresso flex items-center justify-center group-hover:bg-mvl-espresso group-hover:text-white transition-colors">
                <svg className="w-4 h-4 text-mvl-espresso group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
      {/* Mobile image above text */}
      <ScrollReveal className="lg:hidden w-full mb-8">
        <Image
          src="/images/unit-8_1-bed/8-6.jpg"
          alt="Modern kitchen at Mount Vernon Lofts"
          width={900}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </ScrollReveal>
    </section>
  )
}