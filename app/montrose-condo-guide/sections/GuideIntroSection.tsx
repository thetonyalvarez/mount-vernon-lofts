import Image from '@/components/ui/image'

export function GuideIntroSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-4">
              Why Montrose Is One of Houston&#39;s Top Condo Markets
            </h2>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              Montrose has long been one of Houston&#39;s most sought-after inner loop neighborhoods. Known for its walkable streets, independent restaurants, galleries, and proximity to both downtown and the Texas Medical Center, it attracts buyers who want urban living without the sprawl.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              For condo buyers, Montrose offers something most Houston neighborhoods don&#39;t: a genuine walk-to-everything lifestyle. Residents can reach coffee shops, dining, museums, and parks on foot — a rarity in a city built around cars.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed">
              Whether you&#39;re a first-time buyer looking to stop renting or an investor seeking strong rental demand, the Montrose condo market deserves a close look. This guide covers what you need to know before buying.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/images/neighborhood/coffee.jpg"
              alt="Coffee shop in Montrose neighborhood, Houston"
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
