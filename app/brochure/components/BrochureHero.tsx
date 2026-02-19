"use client"

import { HeroSection } from "@/app/components/HeroSection"
import { Download } from "lucide-react"

export function BrochureHero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('brochure-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HeroSection
      title="DOWNLOAD BROCHURE"
      subtitle="Discover everything about Mount Vernon Lofts in Montrose"
      fallbackImage="/images/gallery/interiors/living-room.jpg"
      showScrollIndicator={true}
      height="screen"
      textAlignment="center"
      overlayPosition="none"
      textColor="white"
      ctaText="Download Brochure"
      ctaAction={scrollToForm}
      ctaIcon={<Download className="w-5 h-5" />}
    />
  )
}
