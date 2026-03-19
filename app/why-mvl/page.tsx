import { Metadata } from 'next'
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import {
  WhyMvlIntroSection,
  WhyMvlPillarsSection,
  WhyMvlComparisonSection,
  WhyMvlCTASection
} from "./sections"

export const metadata: Metadata = {
  title: "Why Buy at Mount Vernon Lofts | Montrose Condos Houston",
  description: "Modern condos in Montrose starting in the $175Ks. 2018 construction, $300/month HOA, conventional financing ready. See why first-time buyers are choosing Mount Vernon Lofts.",
  keywords: "mount vernon lofts reviews, mount vernon lofts houston, montrose condos worth it, new condos montrose 2026, first-time buyer houston condos, rent vs own montrose",
  openGraph: {
    title: "Why Buy at Mount Vernon Lofts | Montrose Condos",
    description: "Own in Montrose starting in the $175Ks. 2018 construction, walkable neighborhood, $300/month HOA includes water. Schedule a tour today.",
    images: [{
      url: '/images/neighborhood/skyline.jpg',
      width: 1200,
      height: 630,
      alt: 'Montrose skyline near Mount Vernon Lofts'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/why-mvl`
  }
}

export default function WhyMvlPage() {
  return (
    <main>
      <DataLayerEvent event="view_content" data={{ content_type: 'why-mvl', content_name: 'Why MVL' }} />
      <HeroSection
        title="WHY MOUNT VERNON LOFTS"
        subtitle="The case for owning in Montrose"
        fallbackImage="/images/neighborhood/skyline.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <WhyMvlIntroSection />
      <WhyMvlPillarsSection />
      <WhyMvlComparisonSection />
      <WhyMvlCTASection />
    </main>
  )
}
