import { SubpageVenueCard } from "@/app/neighborhood/components/SubpageVenueCard"
import { museumsTiers } from "@/app/config/neighborhood-museums-data"

export function MuseumDistrictSection() {
  const tier = museumsTiers[1]

  return (
    <section className="py-20 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-4 text-center uppercase tracking-wide">
          {tier.title}
        </h2>
        <p className="text-mvl-espresso/80 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
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
