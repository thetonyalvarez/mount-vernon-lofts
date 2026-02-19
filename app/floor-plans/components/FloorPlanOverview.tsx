"use client"

import { useState } from "react"
import { Maximize2, X } from "lucide-react"
import Image from "next/image"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { trackFloorPlanView } from "@/app/components/analytics"
import { floorPlanTypes, floorPlanSummary, type FloorPlanType } from "@/app/config/floor-plan-data"

export function FloorPlanOverview() {
  const [selectedPlan, setSelectedPlan] = useState<FloorPlanType | null>(null)

  const handlePlanClick = (plan: FloorPlanType) => {
    setSelectedPlan(plan)
    trackFloorPlanView(plan.id, plan.label, 'detail', 'floor_plan_overview')
  }

  const closeLightbox = () => {
    setSelectedPlan(null)
  }

  return (
    <>
      <section className="relative w-full bg-mvl-cream py-20 md:py-28">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          <ScrollReveal>
            <StaggerContainer>
              {/* Section Header */}
              <div className="text-center mb-16">
                <StaggerItem>
                  <h2 className="font-montserrat text-mvl-espresso text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
                    6 Floor Plan Layouts
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-mvl-espresso/70 text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    {floorPlanSummary.studioCount} studios and {floorPlanSummary.oneBedroomCount} one-bedrooms from {floorPlanSummary.sqftRange.min} to {floorPlanSummary.sqftRange.max} sq ft.
                    Tap any plan to view full size.
                  </p>
                </StaggerItem>
              </div>

              {/* Floor Plan Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {floorPlanTypes.map((plan) => (
                  <StaggerItem key={plan.id}>
                    <button
                      onClick={() => handlePlanClick(plan)}
                      className="group w-full text-left bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-mvl-beige/50 focus:outline-none focus:ring-2 focus:ring-mvl-coral focus:ring-offset-2"
                      aria-label={`View ${plan.label} floor plan, ${plan.sqft} square feet`}
                    >
                      {/* Floor Plan Image */}
                      <div className="relative aspect-[4/3] bg-white overflow-hidden">
                        <Image
                          src={plan.image}
                          alt={`${plan.label} floor plan layout - ${plan.sqft} sq ft`}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Expand icon */}
                        <div className="absolute top-3 right-3 bg-mvl-espresso/70 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Plan Info */}
                      <div className="p-5 border-t border-mvl-beige/30">
                        <div className="flex items-baseline justify-between mb-2">
                          <h3 className="font-montserrat text-mvl-espresso text-xl font-semibold">
                            {plan.label}
                          </h3>
                          <span className="text-mvl-coral font-medium text-lg">
                            {plan.sqft.toLocaleString()} SF
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-mvl-espresso/60">
                          <span className="capitalize">{plan.type === 'studio' ? 'Studio' : '1 Bedroom'}</span>
                          <span aria-hidden="true">·</span>
                          <span>{plan.bathrooms} Bath</span>
                          <span aria-hidden="true">·</span>
                          <span>{plan.unitCount} {plan.unitCount === 1 ? 'unit' : 'units'}</span>
                        </div>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPlan !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPlan.label} floor plan detail view`}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-mvl-espresso/80 hover:bg-mvl-espresso text-white p-2 rounded-md transition-colors duration-200"
              aria-label="Close floor plan view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Plan details header */}
            <div className="bg-mvl-cream px-6 py-4 border-b border-mvl-beige/30">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-montserrat text-mvl-espresso text-2xl font-semibold">
                    {selectedPlan.label}
                  </h3>
                  <p className="text-mvl-espresso/60 text-sm mt-1">
                    {selectedPlan.type === 'studio' ? 'Studio' : '1 Bedroom'} · {selectedPlan.bathrooms} Bath · {selectedPlan.sqft.toLocaleString()} SF
                  </p>
                </div>
                <span className="text-mvl-coral font-semibold text-xl">
                  {selectedPlan.sqft.toLocaleString()} SF
                </span>
              </div>
            </div>

            {/* Full-size floor plan image */}
            <div className="relative aspect-[4/3] bg-white">
              <Image
                src={selectedPlan.image}
                alt={`${selectedPlan.label} floor plan layout - ${selectedPlan.sqft} sq ft`}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1200px) 90vw, 900px"
                priority
              />
            </div>

            {/* Features footer */}
            <div className="bg-mvl-cream px-6 py-4 border-t border-mvl-beige/30">
              <div className="flex flex-wrap gap-3">
                {selectedPlan.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-sm text-mvl-espresso/70 bg-white px-3 py-1 rounded-full border border-mvl-beige/50"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
