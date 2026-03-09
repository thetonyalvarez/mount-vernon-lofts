import { Metadata } from "next"
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import { MuseumsSchema } from "./MuseumsSchema"
import {
  IntroSection,
  MapSection,
  MenilCampusSection,
  MuseumDistrictSection,
  GalleriesSection,
  MVLCalloutSection,
  FAQSection,
  CTASection,
  DisclaimersSection,
} from "./sections"

export const metadata: Metadata = {
  title: "Museums Near Montrose Houston | Art & Culture Guide",
  description:
    "World-class museums and galleries within walking distance of Mount Vernon Lofts in Montrose, Houston. The Menil Collection, Rothko Chapel, CAMH, MFAH, and more.",
  keywords:
    "museums near montrose houston, menil collection, rothko chapel, houston museum district, montrose art galleries, camh houston, mfah free thursdays",
  openGraph: {
    title: "Montrose Museum Guide — Art & Culture Nearby",
    description:
      "20+ museums in the Museum District. The Menil Collection, Rothko Chapel, and CAMH — all free, all within walking distance of Mount Vernon Lofts.",
    images: [
      {
        url: "/images/neighborhood/menil-collection.jpg",
        width: 1200,
        height: 630,
        alt: "The Menil Collection near Mount Vernon Lofts in Montrose, Houston",
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtvernonlofts.com"}/neighborhood/museums`,
  },
}

export default function MuseumsPage() {
  return (
    <main>
      <DataLayerEvent
        event="view_content"
        data={{ content_type: "neighborhood", content_name: "Museums" }}
      />
      <MuseumsSchema />
      <HeroSection
        title="ART & CULTURE IN MONTROSE"
        subtitle="World-class museums and galleries — most within walking distance"
        fallbackImage="/images/neighborhood/menil-collection.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <IntroSection />
      <MapSection />
      <MenilCampusSection />
      <MuseumDistrictSection />
      <GalleriesSection />
      <MVLCalloutSection />
      <FAQSection />
      <CTASection />
      <DisclaimersSection />
    </main>
  )
}
