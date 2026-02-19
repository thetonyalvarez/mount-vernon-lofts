import { Metadata } from 'next'
import { HeroSection } from "@/app/components/HeroSection"
import { 
  ArchitectureIntroSection,
  LegacyCraftingSection,
  InteriorsSection
} from "./sections"

export const metadata: Metadata = {
  title: "Building & Design | Mount Vernon Lofts — Montrose Condos",
  description: "Explore the modern building design of Mount Vernon Lofts. A 2018-built condo building in Montrose with clean lines and thoughtful finishes.",
  keywords: "modern condo building houston, montrose condo design, mount vernon lofts building, houston condo architecture, 2018 built condos houston",
  openGraph: {
    title: "Building & Design | Mount Vernon Lofts",
    description: "Modern 2018-built condo building in Houston's Montrose neighborhood.",
    images: [{
      url: '/images/gallery/exteriors/exterior-2.jpg',
      width: 1200,
      height: 630,
      alt: 'Mount Vernon Lofts building in Montrose'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/architecture`
  }
}

export default function ArchitecturePage() {
  return (
    <main>
      <HeroSection
        title="BUILDING & DESIGN"
        subtitle="A Modern Building in the Heart of Montrose"
        fallbackImage="/images/gallery/exteriors/exterior-2.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <ArchitectureIntroSection />
      <LegacyCraftingSection />
      <InteriorsSection />
    </main>
  )
}