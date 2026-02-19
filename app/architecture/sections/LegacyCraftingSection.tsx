import Image from "@/components/ui/image"
import { ScrollReveal, SplitText } from "@/components/animations"
import { slideInLeft, slideInRight } from "@/lib/animations"

export function LegacyCraftingSection() {
  return (
    <section className="py-24 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-hidden">
          {/* Image */}
          <ScrollReveal variant={slideInLeft} className="overflow-hidden">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
              <Image
                src="/images/gallery/exteriors/terrace.jpg"
                alt="Building details at Mount Vernon Lofts"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Text Content */}
          <ScrollReveal variant={slideInRight} delay={0.2} className="overflow-hidden">
            <div className="overflow-hidden">
              <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-8 leading-tight overflow-hidden">
                <SplitText letterDelay={0.1}>
                  Built to Last
                </SplitText>
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Mount Vernon Lofts was built with quality materials and modern construction standards -- a building designed to hold its value and serve its owners well for years to come.
                </p>
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Clean lines, modern finishes, and open floor plans make each unit feel larger than its footprint. Smart design choices prioritize livability and low maintenance.
                </p>
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Studios range from 612 to 705 sq ft and 1-bedrooms from 717 to 799 sq ft. Every unit includes covered parking and benefits from a well-funded HOA with reserves above the Fannie Mae requirement.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
