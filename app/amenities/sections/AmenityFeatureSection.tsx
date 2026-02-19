import Image from "@/components/ui/image"
import type { AmenitySection } from "@/app/config/amenities-data"

interface AmenityFeatureSectionProps {
  amenity: AmenitySection
}

export function AmenityFeatureSection({ amenity }: AmenityFeatureSectionProps) {
  const bgClass = amenity.backgroundColor === "beige" ? "bg-mvl-warm-white" : "bg-white"
  const isImageRight = amenity.imagePosition === "right"

  return (
    <section id={`${amenity.id}-section`} className={`py-24 ${bgClass} amenity-section ${amenity.id}-section`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          isImageRight ? '' : 'lg:flex-row-reverse'
        }`}>
          {/* Image */}
          <div className={`relative h-[400px] md:h-[500px] lg:h-[600px] ${
            isImageRight ? 'lg:order-2' : 'lg:order-1'
          }`}>
            <Image
              src={amenity.image}
              alt={amenity.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className={`${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl text-mvl-espresso mb-8 leading-tight">
              {amenity.title}
            </h2>

            {amenity.description && (
              <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed mb-8">
                {amenity.description}
              </p>
            )}

            {amenity.items && (
              <ul className="space-y-4">
                {amenity.items.map((item, index) => {
                  // Split on " – " to separate the title from description
                  const parts = item.split(' – ')
                  const title = parts[0]
                  const description = parts[1]

                  return (
                    <li key={index} className="flex items-start">
                      <span className="text-mvl-coral mr-3 text-lg mt-1">•</span>
                      <div>
                        {description ? (
                          <>
                            <span className="font-medium text-mvl-espresso">{title}</span>
                            <span className="text-mvl-espresso/80"> – {description}</span>
                          </>
                        ) : (
                          <span className="text-mvl-espresso/80">{item}</span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
