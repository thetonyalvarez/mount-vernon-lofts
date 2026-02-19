import Image from "@/components/ui/image"
import { montroseTimeline } from "@/app/config/neighborhood-timeline"

export function DayInMontroseSection() {
  return (
    <section className="py-24 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl text-mvl-espresso mb-4 uppercase tracking-wide">
            Where Leafy Streets Meet Urban Energy
          </h2>
          <h3 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso/80 mb-8">
            A Day in Houston&apos;s Most Walkable Neighborhood
          </h3>

          {/* Timeline Navigation */}
          <div className="flex justify-center items-center gap-8 md:gap-12">
            {montroseTimeline.map((item, index) => (
              <div key={item.time} className="flex items-center">
                <span className="text-mvl-coral text-lg md:text-xl font-medium">
                  {item.time}
                </span>
                {index < montroseTimeline.length - 1 && (
                  <div className="w-8 md:w-12 h-px bg-mvl-coral/30 ml-8 md:ml-12" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-32">
          {montroseTimeline.map((item, index) => (
            <div
              key={item.time}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative h-[400px] md:h-[500px] lg:h-[600px] ${
                index % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-mvl-coral text-2xl md:text-3xl font-medium">
                      {item.time}
                    </span>
                    <div className="w-12 h-px bg-mvl-coral/50" />
                  </div>
                  <h4 className="font-montserrat text-3xl md:text-4xl text-mvl-espresso mb-6">
                    {item.title}
                  </h4>
                  <p className="text-lg text-mvl-espresso/80 leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                {/* Venues */}
                <div className="space-y-3">
                  {item.venues.map((venue, venueIndex) => (
                    <div key={venue.name} className="flex items-center">
                      {venue.link ? (
                        <a
                          href={venue.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-mvl-coral hover:text-mvl-coral-dark transition-colors text-sm uppercase tracking-widest"
                        >
                          {venue.name}
                        </a>
                      ) : (
                        <span className="text-mvl-coral text-sm uppercase tracking-widest">
                          {venue.name}
                        </span>
                      )}
                      {venueIndex < item.venues.length - 1 && (
                        <span className="mx-3 text-mvl-coral/50">•</span>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
