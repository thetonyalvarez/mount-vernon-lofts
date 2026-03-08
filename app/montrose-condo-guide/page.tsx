import { Metadata } from 'next'
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import {
  GuideIntroSection,
  GuideMarketSection,
  GuideLifestyleSection,
  GuideChecklistSection,
  GuideFinancingSection,
  GuideMvlSection,
  GuideCTASection
} from "./sections"

export const metadata: Metadata = {
  title: "Buying a Condo in Montrose, Houston | 2026 Guide",
  description: "Complete guide to buying a condo in Montrose, Houston. Price ranges, walk score, what to look for in HOA health and reserves, financing options, and how to find the right unit.",
  keywords: "buying a condo in montrose, montrose condos houston, montrose condo prices, montrose walk score, first-time buyer houston condo, montrose real estate guide, houston inner loop condos",
  openGraph: {
    title: "Buying a Condo in Montrose | Complete Guide",
    description: "Everything you need to know about buying a condo in Houston's Montrose neighborhood — prices, lifestyle, financing, and what to look for.",
    images: [{
      url: '/images/neighborhood/skyline.jpg',
      width: 1200,
      height: 630,
      alt: 'Montrose neighborhood skyline in Houston'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/montrose-condo-guide`
  }
}

export default function MontroseCondoGuidePage() {
  return (
    <main>
      <DataLayerEvent event="view_content" data={{ content_type: 'guide', content_name: 'Montrose Condo Guide' }} />
      <HeroSection
        title="BUYING A CONDO IN MONTROSE"
        subtitle="Your guide to Houston's most walkable neighborhood"
        fallbackImage="/images/neighborhood/skyline.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <GuideIntroSection />
      <GuideMarketSection />
      <GuideLifestyleSection />
      <GuideChecklistSection />
      <GuideFinancingSection />
      <GuideMvlSection />
      <GuideCTASection />
    </main>
  )
}
