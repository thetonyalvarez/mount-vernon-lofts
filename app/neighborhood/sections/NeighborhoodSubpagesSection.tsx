import Link from "next/link"

const subpages = [
  {
    title: "Restaurants",
    description: "From James Beard winners to Michelin-starred dining — 9+ restaurants within walking distance.",
    href: "/neighborhood/restaurants",
    stat: "2 Michelin-recognized",
  },
  {
    title: "Parks & Dog Parks",
    description: "Off-leash dog parks, neighborhood green spaces, and hike-and-bike trails.",
    href: "/neighborhood/parks",
    stat: "Dog park: 0.3 mi",
  },
  {
    title: "Museums & Culture",
    description: "The Menil Collection, Rothko Chapel, and 20+ museums in the Museum District.",
    href: "/neighborhood/museums",
    stat: "3 museums within 0.8 mi",
  },
  {
    title: "Coffee Shops",
    description: "Matcha bars, late-night coffee, and neighborhood staples — all within walking distance.",
    href: "/neighborhood/coffee",
    stat: "3 shops within 0.5 mi",
  },
  {
    title: "Getting Around",
    description: "Bus routes, METRORail, rideshare, and biking — Transit Score 61.",
    href: "/neighborhood/transit",
    stat: "Transit Score: 61",
  },
] as const

export function NeighborhoodSubpagesSection() {
  return (
    <section className="py-24 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl text-mvl-espresso mb-4 uppercase tracking-wide">
            Explore the Neighborhood
          </h2>
          <p className="text-lg text-mvl-espresso/80 max-w-2xl mx-auto">
            Dive deeper into what makes Montrose one of Houston&apos;s most walkable neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subpages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group bg-white border border-mvl-beige rounded-md p-6 hover:shadow-md hover:border-mvl-coral/30 transition-all"
            >
              <div className="flex flex-col h-full">
                <h3 className="font-montserrat text-xl text-mvl-espresso font-semibold mb-2 group-hover:text-mvl-coral transition-colors">
                  {page.title}
                </h3>
                <p className="text-mvl-espresso/70 text-sm leading-relaxed mb-4 flex-grow">
                  {page.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-mvl-coral text-sm font-medium">
                    {page.stat}
                  </span>
                  <span className="text-mvl-coral group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
