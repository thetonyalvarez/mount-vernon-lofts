import { SubpageVenueCard } from "@/app/neighborhood/components/SubpageVenueCard"
import { coffeeData } from "@/app/config/neighborhood-coffee-data"

export function WalkingDistanceSection() {
  const tier = coffeeData.tiers[0]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          {tier.title}
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          {tier.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tier.venues.map((venue) => (
            <SubpageVenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </section>
  )
}
