import { Metadata } from "next"
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import { CoffeeSchema } from "./CoffeeSchema"
import {
  IntroSection,
  MapSection,
  WalkingDistanceSection,
  ShortDriveSection,
  BestForSection,
  MVLCalloutSection,
  FAQSection,
  CTASection,
  DisclaimersSection,
} from "./sections"

export const metadata: Metadata = {
  title: "Best Coffee Shops in Montrose Houston | Local Guide",
  description:
    "The best coffee shops in Montrose Houston — from matcha bars to late-night spots. 3 within 0.5 miles of 4509 Mount Vernon St. Updated guide with hours.",
  keywords:
    "montrose coffee shops, best coffee montrose houston, coffee near montrose houston, late night coffee houston, dog friendly coffee houston, matcha montrose",
  openGraph: {
    title:
      "Montrose Coffee Guide — The Best Spots Near Mount Vernon Lofts",
    description:
      "The best coffee shops in Montrose Houston — from matcha bars to late-night spots. 3 within 0.5 miles of 4509 Mount Vernon St.",
    images: [
      {
        url: "/images/neighborhood/skyline.jpg",
        width: 1200,
        height: 630,
        alt: "Montrose neighborhood coffee shops near Mount Vernon Lofts",
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://mtvernonlofts.com"}/neighborhood/coffee`,
  },
}

export default function CoffeePage() {
  return (
    <main>
      <DataLayerEvent
        event="view_content"
        data={{ content_type: "neighborhood", content_name: "Coffee" }}
      />
      <CoffeeSchema />
      <HeroSection
        title="THE MONTROSE COFFEE SCENE"
        subtitle="From matcha bars to midnight espresso — your morning routine, on foot"
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
      <ShortDriveSection />
      <BestForSection />
      <MVLCalloutSection />
      <FAQSection />
      <CTASection />
      <DisclaimersSection />
    </main>
  )
}
