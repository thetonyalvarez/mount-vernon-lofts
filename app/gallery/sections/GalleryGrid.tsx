"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from '@/components/ui/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryCategories, galleryImages, type GalleryImage } from '@/app/config/gallery-data'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations'
import { motion, AnimatePresence } from 'framer-motion'

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === activeCategory)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id))
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = useCallback(() => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }, [currentImageIndex, filteredImages])

  const goToNext = useCallback(() => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }, [currentImageIndex, filteredImages])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return

      if (event.key === 'l' || event.key === 'L' || event.key === 'ArrowRight') {
        goToNext()
      } else if (event.key === 'r' || event.key === 'R' || event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'Escape') {
        closeLightbox()
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage, currentImageIndex, filteredImages, goToNext, goToPrevious])

  return (
    <>
      <section id="gallery-grid-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Category Filter */}
          <ScrollReveal>
            <StaggerContainer className="flex flex-wrap justify-center gap-4 mb-12">
              {galleryCategories.map((category) => (
                <StaggerItem key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ${
                      activeCategory === category.id
                        ? 'bg-mvl-coral text-white'
                        : 'bg-mvl-beige text-mvl-espresso hover:bg-mvl-coral hover:text-white'
                    }`}
                  >
                    {category.name}
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                id={`gallery-grid-item-${image.id}`}
                className="group relative aspect-[4/3] bg-mvl-warm-white overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => openLightbox(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium text-lg mb-1">{image.title}</h3>
                  {image.description && (
                    <p className="text-white/80 text-sm">{image.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
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
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-mvl-coral transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            {filteredImages.length > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-8 lg:left-16 z-10 text-white hover:text-mvl-coral transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full max-w-[90vw] max-h-[80vh] flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
                sizes="90vw"
              />
            </div>

            {/* Next Button */}
            {filteredImages.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-8 lg:right-16 z-10 text-white hover:text-mvl-coral transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            )}

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center text-white">
              <h3 className="text-2xl font-montserrat mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-white/80 text-lg">{selectedImage.description}</p>
              )}
              <p className="text-white/60 text-sm mt-2">
                {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
