"use client"

import Image from "@/components/ui/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { amenitySections } from "@/app/config/amenities-data"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { motion, AnimatePresence } from "framer-motion"
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations"

export function AmenitiesTabsSection() {
  return (
    <section id="amenities-services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <Tabs
          defaultValue={amenitySections[0].id}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
          orientation="vertical"
          id="amenities-services-tabs"
        >
          {/* Vertical Tab List */}
          <ScrollReveal variant={slideInLeft}>
            <TabsList id="amenities-services-tabs-list" className="lg:w-80 w-full flex flex-col h-fit bg-transparent p-0 gap-1">
              <StaggerContainer>
                {amenitySections.map((amenity, index) => (
                  <StaggerItem key={amenity.id} index={index}>
                    <TabsTrigger
                      value={amenity.id}
                      className="w-full justify-start text-left px-6 py-4 rounded-none border-l-2 border-transparent hover:border-mvl-coral/30 data-[state=active]:border-mvl-coral data-[state=active]:bg-mvl-warm-white/50 transition-all duration-300"
                    >
                      <div className="w-full">
                        <div className="flex items-start gap-3">
                          <span className="text-mvl-coral text-sm font-medium">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-base lg:text-lg font-medium text-mvl-espresso">
                            {amenity.title}
                          </h3>
                        </div>
                      </div>
                    </TabsTrigger>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TabsList>
          </ScrollReveal>

          {/* Tab Contents */}
          <div id="amenities-services-tabs-content" className="flex-1">
            {amenitySections.map((amenity) => (
              <TabsContent
                key={amenity.id}
                value={amenity.id}
                className="mt-0 focus-visible:outline-none"
                id={`amenity-services-tab-content-${amenity.id}`}
              >
                <motion.div
                  className="amenity-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Title for mobile */}
                  <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl text-mvl-espresso mb-8 lg:hidden">
                    {amenity.title}
                  </h2>

                  {/* Content Grid */}
                  <div id={`amenity-services-tab-content-${amenity.id}-grid`} className="amenity-services-tab-content-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Text Content */}
                    <motion.div
                      className="amenity-services-tab-content-text order-2 lg:order-1"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {/* Title for desktop */}
                      <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl text-mvl-espresso mb-8 hidden lg:block">
                        {amenity.title}
                      </h2>

                      {amenity.description && (
                        <p className="amenity-services-tab-content-description text-lg md:text-xl text-mvl-espresso/80 leading-relaxed mb-8">
                          {amenity.description}
                        </p>
                      )}

                      {amenity.items && (
                        <ul className="space-y-4">
                          {amenity.items.map((item, index) => {
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
                    </motion.div>

                    {/* Image */}
                    <motion.div
                      className="amenity-services-tab-content-image relative h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Image
                        src={amenity.image}
                        alt={amenity.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}
