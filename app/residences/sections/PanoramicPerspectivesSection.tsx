import Image from "@/components/ui/image"
import { ScrollReveal, SplitText } from "@/components/animations"
import { slideInLeft, slideInRight } from "@/lib/animations"

export function PanoramicPerspectivesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-hidden">
          {/* Text Content */}
          <ScrollReveal variant={slideInRight} className="overflow-hidden">
            <div className="order-2 lg:order-1 overflow-hidden">
              <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-8 leading-tight overflow-hidden">
                <SplitText letterDelay={0.1}>
                  Bright, Open Living
                </SplitText>
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Natural light fills every unit at Mount Vernon Lofts, with open floor plans designed for comfortable daily living in the heart of Montrose.
                </p>
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Modern finishes and thoughtful layouts make the most of every square foot -- proof that smart design and attainable pricing can go hand in hand.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal variant={slideInLeft} delay={0.2}>
            <div className="order-1 lg:order-2">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                <Image
                  src="/images/unit-26_studio/26-1.jpg"
                  alt="Interior views at Mount Vernon Lofts in Montrose"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
