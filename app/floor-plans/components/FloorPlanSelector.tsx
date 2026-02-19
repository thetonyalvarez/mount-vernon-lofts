"use client"

import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { trackFloorPlanView } from "@/app/components/analytics"
import { floorPlanTypes, floorPlanSummary, getAvailableCountByFloorPlan } from "@/app/config/floor-plan-data"

export function FloorPlanSelector() {
  const scrollToForm = () => {
    const formElement = document.getElementById('floor-plan-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePlanSelect = (planId: string, planName: string) => {
    trackFloorPlanView(planId, planName, 'selector', 'floor_plan_selector')
    scrollToForm()
  }

  const studios = floorPlanTypes.filter(fp => fp.type === 'studio')
  const oneBedroomsPlans = floorPlanTypes.filter(fp => fp.type === '1-bedroom')

  return (
    <section className="w-full bg-mvl-warm-white py-20 md:py-28">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <ScrollReveal>
          <StaggerContainer>
            {/* Section Header */}
            <div className="text-center mb-16">
              <StaggerItem>
                <h2 className="font-montserrat text-mvl-espresso text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
                  Find Your Layout
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-mvl-espresso/70 text-lg md:text-xl max-w-2xl mx-auto">
                  {floorPlanSummary.availableUnits} units currently available across {floorPlanTypes.length} layouts.
                  Compare sizes and features to find the right fit.
                </p>
              </StaggerItem>
            </div>

            {/* Studios */}
            <div className="max-w-6xl mx-auto mb-12">
              <StaggerItem>
                <h3 className="font-montserrat text-mvl-espresso text-2xl font-medium mb-6 pl-1">
                  Studios
                </h3>
              </StaggerItem>
              <div className="grid md:grid-cols-2 gap-6">
                {studios.map((plan) => {
                  const availableCount = getAvailableCountByFloorPlan(plan.id)
                  return (
                    <StaggerItem key={plan.id}>
                      <div className="bg-white rounded-md border border-mvl-beige/50 p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-baseline justify-between mb-4">
                          <h4 className="font-montserrat text-mvl-espresso text-xl font-semibold">
                            {plan.label}
                          </h4>
                          {availableCount > 0 ? (
                            <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                              {availableCount} available
                            </span>
                          ) : (
                            <span className="text-sm font-medium text-mvl-espresso/40 bg-mvl-beige/30 px-3 py-1 rounded-full">
                              Waitlist
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                          <div className="bg-mvl-cream rounded-md p-3">
                            <div className="text-mvl-coral font-semibold text-lg">{plan.sqft}</div>
                            <div className="text-xs text-mvl-espresso/60 uppercase tracking-wide">Sq Ft</div>
                          </div>
                          <div className="bg-mvl-cream rounded-md p-3">
                            <div className="text-mvl-coral font-semibold text-lg">Studio</div>
                            <div className="text-xs text-mvl-espresso/60 uppercase tracking-wide">Type</div>
                          </div>
                          <div className="bg-mvl-cream rounded-md p-3">
                            <div className="text-mvl-coral font-semibold text-lg">{plan.unitCount}</div>
                            <div className="text-xs text-mvl-espresso/60 uppercase tracking-wide">Total Units</div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          {plan.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-mvl-espresso/70">
                              <Check className="w-4 h-4 text-mvl-coral flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => handlePlanSelect(plan.id, plan.label)}
                          className="w-full bg-mvl-coral hover:bg-mvl-coral-dark text-white transition-all duration-300 group"
                        >
                          Request {plan.label} Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </div>
                    </StaggerItem>
                  )
                })}
              </div>
            </div>

            {/* 1-Bedrooms */}
            <div className="max-w-6xl mx-auto mb-16">
              <StaggerItem>
                <h3 className="font-montserrat text-mvl-espresso text-2xl font-medium mb-6 pl-1">
                  1-Bedrooms
                </h3>
              </StaggerItem>
              <div className="grid md:grid-cols-2 gap-6">
                {oneBedroomsPlans.map((plan) => {
                  const availableCount = getAvailableCountByFloorPlan(plan.id)
                  return (
                    <StaggerItem key={plan.id}>
                      <div className="bg-white rounded-md border border-mvl-beige/50 p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-baseline justify-between mb-4">
                          <h4 className="font-montserrat text-mvl-espresso text-xl font-semibold">
                            {plan.label}
                          </h4>
                          {availableCount > 0 ? (
                            <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                              {availableCount} available
                            </span>
                          ) : (
                            <span className="text-sm font-medium text-mvl-espresso/40 bg-mvl-beige/30 px-3 py-1 rounded-full">
                              Waitlist
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                          <div className="bg-mvl-cream rounded-md p-3">
                            <div className="text-mvl-coral font-semibold text-lg">{plan.sqft}</div>
                            <div className="text-xs text-mvl-espresso/60 uppercase tracking-wide">Sq Ft</div>
                          </div>
                          <div className="bg-mvl-cream rounded-md p-3">
                            <div className="text-mvl-coral font-semibold text-lg">1 Bed / 1 Bath</div>
                            <div className="text-xs text-mvl-espresso/60 uppercase tracking-wide">Type</div>
                          </div>
                          <div className="bg-mvl-cream rounded-md p-3">
                            <div className="text-mvl-coral font-semibold text-lg">{plan.unitCount}</div>
                            <div className="text-xs text-mvl-espresso/60 uppercase tracking-wide">Total Units</div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          {plan.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-mvl-espresso/70">
                              <Check className="w-4 h-4 text-mvl-coral flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => handlePlanSelect(plan.id, plan.label)}
                          className="w-full bg-mvl-coral hover:bg-mvl-coral-dark text-white transition-all duration-300 group"
                        >
                          Request {plan.label} Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </div>
                    </StaggerItem>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <StaggerItem>
              <div className="text-center bg-white rounded-md p-8 shadow-sm border border-mvl-beige/50 max-w-3xl mx-auto">
                <h3 className="font-montserrat text-2xl text-mvl-espresso font-semibold mb-3">
                  Not sure which layout is right for you?
                </h3>
                <p className="text-mvl-espresso/70 mb-6">
                  Request the complete floor plan package and our team will help you find the right fit.
                </p>
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  variant="outline"
                  className="border-mvl-coral text-mvl-coral hover:bg-mvl-coral hover:text-white transition-all duration-300"
                >
                  Get All Floor Plans
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  )
}
