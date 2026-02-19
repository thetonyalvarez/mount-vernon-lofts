"use client";

import Image from '@/components/ui/image';
import { ScrollReveal, SplitText } from '@/components/animations';
import { slideInLeft, slideInRight } from '@/lib/animations';

export default function TheExperienceSection() {
  return (
    <section id="residences-the-experience-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-[30px] md:gap-[60px] md:grid-cols-[0.9fr_1.2fr] md:grid-rows-[auto_515px] xl:gap-[92px_135px]">

          {/* Middle Panel - Text Content */}
          <ScrollReveal variant={slideInLeft} className="flex flex-col justify-center col-start-1 col-end-2 row-start-1 row-end-2 text-left">
              <div>
                <h2 className="font-montserrat text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-wide">
                  <SplitText letterDelay={0.05}>
                    Your First Home, Done Right
                  </SplitText>
                </h2>
              <p className="text-base lg:text-lg font-light text-gray-700 leading-relaxed max-w-md mx-auto lg:mx-0">
                Mount Vernon Lofts brings attainable homeownership to Montrose. With 42 modern condos -- studios and 1-bedrooms -- in a 2018 building with quality finishes, this is where smart buyers stop renting and start building equity. Covered parking, low HOA fees that include water, and a walkable location make daily life simple and comfortable.
              </p>
              <p className="text-base lg:text-lg font-light text-gray-700 leading-relaxed max-w-md mx-auto lg:mx-0 mt-6 italic">
                &ldquo;Montrose ownership, finally within reach.&rdquo;
              </p>
            </div>
          </ScrollReveal>

          {/* Left Panel - Kitchen */}
          <ScrollReveal variant={slideInRight} delay={0.2} className="col-start-2 col-end-3 row-start-1 row-end-3">
            <div>
              <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
                <Image
                  src="/images/unit-26_studio/26-3.jpg"
                  alt="Modern kitchen with granite countertops"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* <p className="mt-6 text-sm font-light text-gray-700 leading-relaxed max-w-xs">
                CUSTOM-DESIGNED CHEF&apos;S KITCHENS FLOW EASILY INTO LOUNGE AREAS FOR EFFORTLESS ENTERTAINING.
              </p> */}
            </div>
          </ScrollReveal>

          {/* Right Panel - Bedroom */}
          <ScrollReveal variant={slideInLeft} delay={0.4} className="col-start-1 col-end-2 row-start-2 row-end-3 max-h-[515px] pl-0">
            <div className="relative h-[500px] w-full overflow-hidden">
              <Image
                src="/images/unit-9_1-bed/9-4.jpg"
                alt="Living room with natural light"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Full-Width Image Slider */}
      {/* <div className="w-full h-[600px] lg:h-[700px] relative">
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            <CarouselItem className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/living-dining-balcony.jpg"
                  alt="Luxurious open-plan living and dining area with panoramic city view"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/bedroom-suite.jpg"
                  alt="Master bedroom suite with city views"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/kitchen-detail.jpg"
                  alt="Kitchen detail with premium finishes"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/bathroom-luxury.jpg"
                  alt="Luxury bathroom with premium materials"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/terrace-view.jpg"
                  alt="Private terrace with city panorama"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            <CarouselPrevious className="static h-8 w-8 bg-white/20 hover:bg-white/30 border-none text-white translate-y-0 translate-x-0" />
            <span className="text-white text-sm font-light">4 / 5</span>
            <CarouselNext className="static h-8 w-8 bg-white/20 hover:bg-white/30 border-none text-white translate-y-0 translate-x-0" />
          </div>
        </Carousel>
      </div> */}
    </section>
  );
}
