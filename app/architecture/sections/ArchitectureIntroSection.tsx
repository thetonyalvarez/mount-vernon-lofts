import Image from "@/components/ui/image"
import { ScrollReveal, SplitText } from "@/components/animations"
import { slideInLeft, slideInRight } from "@/lib/animations"

export function ArchitectureIntroSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-hidden">
          {/* Text Content */}
          <ScrollReveal variant={slideInLeft} className="overflow-hidden">
            <div className="overflow-hidden">
              <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-8 leading-tight overflow-hidden">
                <SplitText letterDelay={0.1}>
                  A Modern Montrose Building
                </SplitText>
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Mount Vernon Lofts is a 42-unit condo building at 4509 Mount Vernon in the heart of Montrose. Built in 2018, it offers a modern living experience with clean design and quality construction in one of Houston&apos;s most walkable neighborhoods.
                </p>
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Studios and 1-bedroom units are thoughtfully designed to maximize space and natural light. Covered parking, a recreational lounge, and outdoor common areas make everyday living comfortable and hassle-free.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal variant={slideInRight} delay={0.2}>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src="/images/gallery/exteriors/exterior-2.jpg"
                alt="Mount Vernon Lofts building in Montrose"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
