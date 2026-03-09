import { Metadata } from "next"
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import { RestaurantsSchema } from "./RestaurantsSchema"
import {
  IntroSection,
  MapSection,
  WalkingDistanceSection,
  ShortWalkSection,
  WorthTheDriveSection,
  MVLCalloutSection,
  FAQSection,
  CTASection,
  DisclaimersSection,
} from "./sections"

export const metadata: Metadata = {
  title: "Best Restaurants Near Montrose Houston | Local Dining Guide",
  description:
    "From James Beard winners to Michelin-starred dining — the best restaurants within walking distance of Montrose. Updated guide with hours and what to order.",
  keywords:
    "montrose restaurants, best restaurants montrose houston, michelin restaurants houston, montrose dining guide, restaurants near montrose houston, james beard houston restaurants",
  openGraph: {
    title:
      "Montrose Restaurant Guide — Where to Eat Near Mount Vernon Lofts",
    description:
      "From James Beard winners to Michelin-starred dining — the best restaurants within walking distance of Montrose.",
    images: [
      {
        url: "/images/neighborhood/skyline.jpg",
        width: 1200,
        height: 630,
        alt: "Montrose neighborhood dining near Mount Vernon Lofts",
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://mtvernonlofts.com"}/neighborhood/restaurants`,
  },
}

export default function RestaurantsPage() {
  return (
    <main>
      <DataLayerEvent
        event="view_content"
        data={{ content_type: "neighborhood", content_name: "Restaurants" }}
      />
      <RestaurantsSchema />
      <HeroSection
        title="THE MONTROSE DINING SCENE"
        subtitle="From James Beard winners to neighborhood favorites — all within walking distance"
        fallbackImage="/images/neighborhood/skyline.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <IntroSection />
      <MapSection />
      <WalkingDistanceSection />
      <ShortWalkSection />
      <WorthTheDriveSection />
      <MVLCalloutSection />
      <FAQSection />
      <CTASection />
      <DisclaimersSection />
    </main>
  )
}
