"use client"

import Image from "@/components/ui/image"
import { featuresFinishesData } from "@/app/config/features-finishes"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollReveal, SplitText, StaggerContainer, StaggerItem } from "@/components/animations"
import { motion } from "framer-motion"
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations"

export function FeaturesFinishesSection() {
  return (
    <section className="py-24 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-4">
              <SplitText letterDelay={0.05}>
                Features & Finishes
              </SplitText>
            </h2>
            <p className="text-lg md:text-xl text-mvl-espresso/80 max-w-3xl mx-auto">
              Modern finishes and thoughtful design in every unit at Mount Vernon Lofts.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs Component */}
        <Tabs defaultValue={featuresFinishesData[0].title.toLowerCase().replace(/\s+/g, '-')} className="w-full">
          {/* Tab Triggers */}
          <ScrollReveal variant={fadeInUp} delay={0.2}>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-px bg-mvl-espresso/10 p-px mb-12">
              {featuresFinishesData.map((category) => (
                <TabsTrigger
                  key={category.title}
                  value={category.title.toLowerCase().replace(/\s+/g, '-')}
                  className="bg-mvl-warm-white data-[state=active]:bg-white"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollReveal>

          {/* Tab Contents */}
          <div id="features-finishes-grid">
            {featuresFinishesData.map((category, index) => (
              <TabsContent
                key={category.title}
                value={category.title.toLowerCase().replace(/\s+/g, '-')}
                className="mt-0"
              >
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Image */}
                  <motion.div
                    className="relative h-[400px] md:h-[500px] lg:h-[600px]"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="mb-8">
                      <span className="text-mvl-coral text-sm uppercase tracking-widest">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-montserrat text-3xl md:text-4xl text-mvl-espresso mt-2">
                        {category.title}
                      </h3>
                      <p className="text-mvl-espresso/70 mt-4 text-lg">
                        {category.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <StaggerContainer>
                      <ul className="space-y-3">
                        {category.features.map((feature, featureIndex) => (
                          <StaggerItem key={featureIndex} index={featureIndex}>
                            <li className="flex items-start">
                              <span className="text-mvl-coral mr-3 text-lg">•</span>
                              <span className="text-mvl-espresso/80">{feature}</span>
                            </li>
                          </StaggerItem>
                        ))}
                      </ul>
                    </StaggerContainer>
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}
