import { getFloorPlanById } from '@/app/config/floor-plan-data'
import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface UnitHeroSectionProps {
  readonly unitType: UnitTypePageData
}

export function UnitHeroSection({ unitType }: UnitHeroSectionProps) {
  const floorPlan = getFloorPlanById(unitType.floorPlanId)
  const backgroundUrl = unitType.photos[0]?.src ?? '/images/unit-26_studio/26-1.jpg'

  const availabilityColor =
    unitType.availabilityStatus === 'available'
      ? 'bg-green-600'
      : 'bg-amber-500'

  return (
    <section
      className="relative min-h-[70vh] flex items-end"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-12 md:pb-16">
        {/* Type badge */}
        <span className="inline-block bg-mvl-coral text-white text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded mb-4">
          {unitType.unitType}
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6">
          {floorPlan?.label ?? unitType.layoutName}
        </h1>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Size</span>
            <span className="font-semibold">{unitType.sqft} SF</span>
          </div>
          <div className="w-px h-5 bg-white/30 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Beds</span>
            <span className="font-semibold">{unitType.bedrooms === 0 ? 'Studio' : unitType.bedrooms}</span>
          </div>
          <div className="w-px h-5 bg-white/30 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Baths</span>
            <span className="font-semibold">{unitType.bathrooms}</span>
          </div>
          <div className="w-px h-5 bg-white/30 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">From</span>
            <span className="font-semibold text-lg">{unitType.priceFormatted}</span>
          </div>
          <div className="w-px h-5 bg-white/30 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${availabilityColor}`} />
            <span className="font-medium text-sm">{unitType.availabilityText}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
