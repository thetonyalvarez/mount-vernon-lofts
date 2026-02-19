import Image from "@/components/ui/image"
import Link from "next/link"
import { ScrollReveal, ParallaxImage } from "@/components/animations"
import { fadeInUp, scaleIn } from "@/lib/animations"
import { motion } from "framer-motion"

export function LifestyleSection() {
  return (
    <section className="relative bg-background w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="lg:w-1/2 flex flex-col justify-center h-full space-y-8 lg:space-y-10 lg:pr-24">
          <ScrollReveal>
            <div className="flex items-center space-x-6 mb-2">
              <motion.div
                className="flex-1 h-px bg-mvl-coral max-w-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformOrigin: "right" }}
              />
              <span className="text-sm font-medium uppercase tracking-widest text-mvl-coral">
                Lifestyle
              </span>
              <motion.div
                className="flex-1 h-px bg-mvl-coral max-w-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
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
            <Link href="/neighborhood" className="flex items-center space-x-6 pt-6 group">
              <span className="text-mvl-espresso font-medium uppercase tracking-wider text-sm">
                Experience the Lifestyle
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