import Image from "@/components/ui/image"
import { ScrollReveal, SplitText, StaggerContainer, StaggerItem } from "@/components/animations"
import { slideInLeft, slideInRight } from "@/lib/animations"

export function HandcraftedLegacySection() {
  return (
    <section className="py-24 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-hidden">
          {/* Text Content */}
          <ScrollReveal variant={slideInLeft} className="overflow-hidden">
            <div className="overflow-hidden">
              <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-8 leading-tight overflow-hidden">
                <SplitText letterDelay={0.1}>
                  Quality That Lasts
                </SplitText>
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  Built in 2018 with modern materials and construction standards, Mount Vernon Lofts features quality finishes throughout -- granite countertops, European-style cabinetry, and in-unit washer and dryer in every unit.
                </p>
                <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                  This is your first home done right -- a modern building where you can build equity and put down roots in one of Houston&apos;s best neighborhoods.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Images Grid */}
          <ScrollReveal variant={slideInRight} delay={0.2}>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StaggerItem index={0}>
                <div className="relative h-[300px] md:h-[350px]">
                  <Image
                    src="/images/unit-8_1-bed/8-10.jpg"
                    alt="Bathroom with subway tile at Mount Vernon Lofts"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </StaggerItem>
              <StaggerItem index={1}>
                <div className="relative h-[300px] md:h-[350px]">
                  <Image
                    src="/images/unit-8_1-bed/8-9.jpg"
                    alt="Walk-in closet with built-in shelving"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </StaggerItem>
            </StaggerContainer>
          </ScrollReveal>
        </div>


      </div>
    </section>
  )
}
