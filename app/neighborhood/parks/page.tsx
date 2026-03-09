import { Metadata } from "next"
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import { ParksSchema } from "./ParksSchema"
import {
  IntroSection,
  MapSection,
  DogParksSection,
  NeighborhoodParksSection,
  TrailsSection,
  MVLCalloutSection,
  FAQSection,
  CTASection,
  DisclaimersSection,
} from "./sections"

export const metadata: Metadata = {
  title:
    "Parks & Dog Parks Near Montrose Houston | Outdoor Guide",
  description:
    "Off-leash dog parks, hike-and-bike trails, and green spaces near Mount Vernon Lofts in Montrose, Houston. Ervan Chew Dog Park is a 6-minute walk. Buffalo Bayou trail ~1 mile away.",
  openGraph: {
    title: "Parks & Dog Parks Near Montrose Houston | Mount Vernon Lofts",
    description:
      "Off-leash dog parks, hike-and-bike trails, and green spaces within walking and biking distance of Montrose.",
    images: [
      {
        url: "/images/neighborhood/skyline.jpg",
        width: 1200,
        height: 630,
        alt: "Parks and green spaces near Mount Vernon Lofts in Montrose, Houston",
      },
    ],
  },
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtvernonlofts.com"
    }/neighborhood/parks`,
  },
}

export default function ParksPage() {
  return (
    <main>
      <DataLayerEvent
        event="view_content"
        data={{ content_type: "neighborhood", content_name: "Parks" }}
      />
      <ParksSchema />
      <HeroSection
        title="PARKS & GREEN SPACES NEAR MONTROSE"
        subtitle="From off-leash dog parks to hike-and-bike trails -- green space within reach"
        fallbackImage="/images/neighborhood/skyline.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <IntroSection />
      <MapSection />
      <DogParksSection />
      <NeighborhoodParksSection />
      <TrailsSection />
      <MVLCalloutSection />
      <FAQSection />
      <CTASection />
      <DisclaimersSection />
    </main>
  )
}
