"use client"

import { useState } from 'react'
import Image from '@/components/ui/image'
import { X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFloorPlanById } from '@/app/config/floor-plan-data'
import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface FloorPlanSectionProps {
  readonly unitType: UnitTypePageData
}

export function FloorPlanSection({ unitType }: FloorPlanSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const floorPlan = getFloorPlanById(unitType.floorPlanId)

  if (!floorPlan) return null

  return (
    <>
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-3">
            Floor Plan
          </h2>
          <p className="text-mvl-espresso/70 mb-8">
            {floorPlan.label} — {unitType.sqft} SF | {unitType.bedrooms === 0 ? 'Studio' : `${unitType.bedrooms} Bed`} / {unitType.bathrooms} Bath
          </p>

          <div
            className="relative bg-mvl-warm-white rounded overflow-hidden cursor-pointer group"
            onClick={() => setLightboxOpen(true)}
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10]">
              <Image
                src={floorPlan.image}
                alt={`${floorPlan.label} floor plan — ${unitType.sqft} square feet`}
                fill
                className="object-contain p-4 md:p-8"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
              <span className="bg-white/90 text-mvl-espresso px-4 py-2 rounded text-sm font-medium">
                Click to enlarge
              </span>
            </div>
          </div>

          {unitType.floorPlanPdfUrl && (
            <a
              href={unitType.floorPlanPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-mvl-coral hover:text-mvl-coral-dark font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              {unitType.floorPlanPdfLabel}
            </a>
          )}
        </div>
      </section>

      {/* Floor plan lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-mvl-coral transition-colors"
                aria-label="Close floor plan"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center bg-white rounded p-4 md:p-8">
                <Image
                  src={floorPlan.image}
                  alt={`${floorPlan.label} floor plan — ${unitType.sqft} square feet`}
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
