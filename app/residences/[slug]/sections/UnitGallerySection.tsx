"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from '@/components/ui/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { UnitTypePageData, UnitPhoto } from '@/app/config/unit-type-data'

interface UnitGallerySectionProps {
  readonly unitType: UnitTypePageData
}

export function UnitGallerySection({ unitType }: UnitGallerySectionProps) {
  const photos = unitType.photos
  const [selectedPhoto, setSelectedPhoto] = useState<UnitPhoto | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (photo: UnitPhoto, index: number) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }, [currentIndex, photos])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }, [currentIndex, photos])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedPhoto) return
      if (event.key === 'ArrowRight') goToNext()
      else if (event.key === 'ArrowLeft') goToPrevious()
      else if (event.key === 'Escape') closeLightbox()
    }

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto, goToNext, goToPrevious])

  return (
    <>
      <section className="py-16 md:py-20 bg-mvl-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-8">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className="group relative aspect-[4/3] bg-mvl-warm-white overflow-hidden rounded cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => openLightbox(photo, index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium text-sm">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:text-mvl-coral transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              {photos.length > 1 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 lg:left-8 z-10 text-white hover:text-mvl-coral transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
              )}

              <div className="relative w-full h-full max-w-[90vw] max-h-[80vh] flex items-center justify-center">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                />
              </div>

              {photos.length > 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 lg:right-8 z-10 text-white hover:text-mvl-coral transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              )}

              <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                <p className="text-lg font-montserrat mb-1">{selectedPhoto.title}</p>
                <p className="text-white/60 text-sm">
                  {currentIndex + 1} of {photos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
