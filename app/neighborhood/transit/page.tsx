import { Metadata } from "next"
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import { TransitSchema } from "./TransitSchema"
import {
  IntroSection,
  TransitFromMVLSection,
  METRORailSection,
  BusRoutesSection,
  OnDemandSection,
  AirportSection,
  FaresSection,
  RideshareSection,
  MVLCalloutSection,
  FAQSection,
  CTASection,
  DisclaimersSection,
} from "./sections"

export const metadata: Metadata = {
  title: "Public Transit Near Montrose Houston | Buses, Rail & More",
  description:
    "Getting around Montrose without a car. 3 bus routes within 0.5 mi, METRORail 0.8 mi. Transit Score 61. Full Houston METRO guide from Montrose.",
  keywords:
    "public transit montrose houston, metrorail montrose, metro bus montrose, transit score montrose, getting around houston without a car, houston bus routes montrose",
  openGraph: {
    title:
      "Getting Around Montrose — Public Transit & Transportation Guide",
    description:
      "METRORail, METRO buses, rideshare, and biking — how to get around from 4509 Mount Vernon St in Montrose.",
    images: [
      {
        url: "/images/neighborhood/skyline.jpg",
        width: 1200,
        height: 630,
        alt: "Public transit options near Montrose Houston",
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://mtvernonlofts.com"}/neighborhood/transit`,
  },
}

export default function TransitPage() {
  return (
    <main>
      <DataLayerEvent
        event="view_content"
        data={{ content_type: "neighborhood", content_name: "Transit" }}
      />
      <TransitSchema />
      <HeroSection
        title="GETTING AROUND MONTROSE"
        subtitle="Transit Score 61. Walk Score 74. Three bus routes and METRORail — all within walking distance."
        fallbackImage="/images/neighborhood/skyline.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <IntroSection />
      <TransitFromMVLSection />
      <METRORailSection />
      <BusRoutesSection />
      <OnDemandSection />
      <AirportSection />
      <FaresSection />
      <RideshareSection />
      <MVLCalloutSection />
      <FAQSection />
      <CTASection />
      <DisclaimersSection />
    </main>
  )
}
