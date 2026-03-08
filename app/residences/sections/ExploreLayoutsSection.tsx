import Link from 'next/link'
import Image from '@/components/ui/image'
import { unitTypePages } from '@/app/config/unit-type-data'
import { getFloorPlanById } from '@/app/config/floor-plan-data'

export function ExploreLayoutsSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-2">
          Explore Our Layouts
        </h2>
        <p className="text-mvl-espresso/70 mb-10">
          6 floor plans — studios and 1-bedrooms from 612 to 799 SF
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {unitTypePages.map((unit) => {
            const floorPlan = getFloorPlanById(unit.floorPlanId)
            const availabilityColor =
              unit.availabilityStatus === 'available'
                ? 'bg-green-600'
                : 'bg-amber-500'

            return (
              <Link
                key={unit.slug}
                href={`/residences/${unit.slug}`}
                className="group bg-white rounded overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Floor plan thumbnail */}
                <div className="relative aspect-square bg-white p-4">
                  {floorPlan && (
                    <Image
                      src={floorPlan.image}
                      alt={`${floorPlan.label} floor plan`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {/* 3D Tour badge */}
                  {unit.matterportUrl && (
                    <span className="absolute top-3 right-3 bg-mvl-coral text-white text-xs font-semibold px-2 py-1 rounded">
                      3D Tour
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 border-t border-mvl-beige/50">
                  <p className="font-montserrat font-semibold text-mvl-espresso mb-1">
                    {floorPlan?.label ?? unit.layoutName}
                  </p>
                  <p className="text-sm text-mvl-espresso/70 mb-2">
                    {unit.sqft} SF | {unit.bedrooms === 0 ? 'Studio' : `${unit.bedrooms} Bed`} / {unit.bathrooms} Bath
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${availabilityColor}`} />
                    <span className="text-xs text-mvl-espresso/60">{unit.availabilityText}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
