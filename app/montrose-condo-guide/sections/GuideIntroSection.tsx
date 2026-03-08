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
              Montrose has long been one of Houston&#39;s most sought-after inner loop neighborhoods. Known for its walkable streets, independent restaurants, galleries, and proximity to both downtown and the Texas Medical Center, it attracts buyers who want urban living without the sprawl. The neighborhood&#39;s mix of historic bungalows, modern townhomes, and condo buildings gives it a character that newer developments outside the loop can&#39;t replicate.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              For condo buyers, Montrose offers something most Houston neighborhoods don&#39;t: a genuine walk-to-everything lifestyle. Residents can reach coffee shops, dining, museums, and parks on foot — a rarity in a city built around cars. That walkability, combined with strong demand from young professionals and Medical Center workers, has made Montrose one of the most active condo markets inside the loop.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              Whether you&#39;re a first-time buyer looking to stop renting, a Medical Center employee tired of commuting from the suburbs, or a parent buying near Rice or the University of Houston, the Montrose condo market deserves a close look.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed">
              This guide covers everything you need to know: current pricing and market trends, what makes Montrose walkable, what to look for in a condo building, how financing works for condos, and where Mount Vernon Lofts fits into the picture.
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
