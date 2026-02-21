import { Metadata } from 'next'
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import {
  TheExperienceSection,
  FeaturesFinishesSection,
  PanoramicPerspectivesSection,
  HandcraftedLegacySection
} from "./sections"

export const metadata: Metadata = {
  title: "Residences | Mount Vernon Lofts — Montrose Condos",
  description: "Explore studios and 1-bedroom condos at Mount Vernon Lofts in Montrose, Houston. Modern units starting in the $215Ks in one of Houston's most walkable neighborhoods. Schedule a tour today.",
  keywords: "montrose condos, houston condos for sale, first-time buyer houston, montrose real estate, condos near medical center, studios houston",
  openGraph: {
    title: "Residences | Mount Vernon Lofts — Montrose Condos",
    description: "Modern studios and 1-bedroom condos in Houston's Montrose neighborhood starting in the $215Ks.",
    images: [{
      url: '/images/unit-9_1-bed/9-3.jpg',
      width: 1200,
      height: 630,
      alt: 'Modern condo kitchen at Mount Vernon Lofts in Montrose'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/residences`
  }
}

export default function ResidencesPage() {
  return (
    <main>
      <DataLayerEvent event="view_content" data={{ content_type: 'residences', content_name: 'Residences' }} />
      <HeroSection
        title="MODERN MONTROSE RESIDENCES"
        subtitle="Studios and 1-bedrooms in one of Houston's most walkable neighborhoods"
        fallbackImage="/images/unit-9_1-bed/9-3.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="right"
        textColor="white"
      />
      <TheExperienceSection />
      <FeaturesFinishesSection />
      <PanoramicPerspectivesSection />
      <HandcraftedLegacySection />
    </main>
  )
}
