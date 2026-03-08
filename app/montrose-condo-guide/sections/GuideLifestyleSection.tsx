import Image from '@/components/ui/image'

export function GuideLifestyleSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-4">
              Walk Score, Dining, and the Montrose Lifestyle
            </h2>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              Montrose consistently ranks among Houston&#39;s most walkable neighborhoods. Depending on the block, walk scores range from the mid-70s to high 80s — well above Houston&#39;s citywide average. Bike scores are similarly strong, making it one of the few Houston neighborhoods where a car-optional lifestyle is realistic.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              The neighborhood&#39;s density of restaurants, coffee shops, and bars is a major draw. Westheimer Road and Montrose Boulevard serve as the main commercial corridors, with everything from Vietnamese restaurants to craft cocktail bars within walking distance. Weekend brunch is a neighborhood tradition.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              Cultural institutions set Montrose apart from other Houston neighborhoods. The Menil Collection — a world-class art museum with free admission — sits in the heart of the neighborhood. The Rothko Chapel, Byzantine Fresco Chapel, and numerous galleries add depth. Buffalo Bayou Park, with its running trails and kayak launches, is a short bike ride away.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed">
              For commuters, Montrose is roughly 15 minutes from downtown Houston and the Texas Medical Center — two of the city&#39;s largest employment centers. Inner loop access via Montrose Boulevard, Shepherd Drive, and Allen Parkway makes getting around straightforward.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/images/neighborhood/restaurant.jpg"
              alt="Restaurant dining in Montrose neighborhood, Houston"
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
