import Link from 'next/link'
import Image from '@/components/ui/image'
import { getFloorPlanById } from '@/app/config/floor-plan-data'
import { getOtherUnitTypes } from '@/app/config/unit-type-data'

interface CompareLayoutsSectionProps {
  readonly currentSlug: string
}

export function CompareLayoutsSection({ currentSlug }: CompareLayoutsSectionProps) {
  const otherUnits = getOtherUnitTypes(currentSlug)

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-10">
          Compare Other Layouts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {otherUnits.map((unit) => {
            const floorPlan = getFloorPlanById(unit.floorPlanId)
            const availabilityColor =
              unit.availabilityStatus === 'available'
                ? 'bg-green-600'
                : 'bg-amber-500'

            return (
              <Link
                key={unit.slug}
                href={`/residences/${unit.slug}`}
                className="group bg-mvl-warm-white rounded overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Floor plan thumbnail */}
                <div className="relative aspect-square bg-white p-4">
                  {floorPlan && (
                    <Image
                      src={floorPlan.image}
                      alt={`${floorPlan.label} floor plan`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-montserrat font-semibold text-mvl-espresso mb-1">
                    {floorPlan?.label ?? unit.layoutName}
                  </p>
                  <p className="text-sm text-mvl-espresso/70 mb-2">
                    {unit.sqft} SF | {unit.bedrooms === 0 ? 'Studio' : `${unit.bedrooms} Bed`} / {unit.bathrooms} Bath
                  </p>
                  <p className="text-sm font-semibold text-mvl-coral mb-2">
                    From {unit.priceFormatted}
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
