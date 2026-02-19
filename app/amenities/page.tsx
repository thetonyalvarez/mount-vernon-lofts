import { Metadata } from 'next'
import { HeroSection } from "@/app/components/HeroSection"
import { 
  AmenitiesIntroSection,
  AmenitiesTabsSection
} from "./sections"

export const metadata: Metadata = {
  title: "Building Features | Mount Vernon Lofts — Montrose Condos",
  description: "Explore building features at Mount Vernon Lofts in Montrose, Houston. Covered parking, recreational lounge, outdoor common areas, and a modern 2018 building with low HOA fees.",
  keywords: "montrose condo amenities, houston condo features, mount vernon lofts building, covered parking montrose, houston condo building features",
  openGraph: {
    title: "Building Features | Mount Vernon Lofts",
    description: "Covered parking, recreational lounge, and modern 2018 building in Montrose.",
    images: [{
      url: '/images/gallery/amenities/lobby-close-up.jpg',
      width: 1200,
      height: 630,
      alt: 'Building features at Mount Vernon Lofts in Montrose'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/amenities`
  }
}

export default function AmenitiesPage() {
  return (
    <main>
      <HeroSection
        title="BUILDING FEATURES"
        subtitle="Everything You Need, Nothing You Don't"
        fallbackImage="/images/gallery/interiors/kitchen-2.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <AmenitiesIntroSection />
      <AmenitiesTabsSection />
    </main>
  )
}