import Image from "@/components/ui/image"

export function AmenitiesIntroSection() {
  return (
    <section id="amenities-intro" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-8 leading-tight">
              Designed for Comfortable Living
            </h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                With 42 modern condos, Mount Vernon Lofts offers thoughtful building features without the fuss of a large tower.
              </p>
              <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                MVL offers practical conveniences -- covered parking, a recreational lounge, and outdoor common areas -- so residents enjoy easy, lock-and-leave living.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/images/gallery/amenities/lobby-close-up.jpg"
              alt="Building amenities at Mount Vernon Lofts in Montrose"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
