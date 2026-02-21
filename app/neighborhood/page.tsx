import { Metadata } from 'next'
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import {
  NeighborhoodIntroSection,
  DayInMontroseSection,
  NeighborhoodMapSection,
  NeighborhoodCTASection
} from "./sections"

export const metadata: Metadata = {
  title: "Montrose Neighborhood | Mount Vernon Lofts — Montrose Condos",
  description: "Discover life in Houston's Montrose neighborhood. Walkable streets, local coffee shops, restaurants, museums, and parks just steps from Mount Vernon Lofts.",
  keywords: "montrose houston neighborhood, walkable neighborhood houston, montrose real estate, houston inner loop living, montrose condos, museum district houston",
  openGraph: {
    title: "Montrose Neighborhood | Mount Vernon Lofts",
    description: "One of Houston's most walkable neighborhoods — local dining, culture, and parks steps from your door.",
    images: [{
      url: '/images/gallery/views/view-west.jpg',
      width: 1200,
      height: 630,
      alt: 'Montrose neighborhood near Mount Vernon Lofts'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/neighborhood`
  }
}

export default function NeighborhoodPage() {
  return (
    <main>
      <DataLayerEvent event="view_content" data={{ content_type: 'neighborhood', content_name: 'Neighborhood' }} />
      <HeroSection
        title="LIFE IN MONTROSE"
        subtitle="Houston's Most Walkable Neighborhood"
        fallbackImage="/images/neighborhood/skyline.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <NeighborhoodIntroSection />
      <DayInMontroseSection />
      <NeighborhoodMapSection />
      <NeighborhoodCTASection />
    </main>
  )
}