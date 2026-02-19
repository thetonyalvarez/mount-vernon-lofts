import { Metadata } from "next"
import { BrochureHero } from "./components/BrochureHero"
import { BrochureOverview } from "./components/BrochureOverview"
import { BrochureForm } from "./components/BrochureForm"

export const metadata: Metadata = {
  title: "Download Brochure | Mount Vernon Lofts — Montrose Condos",
  description: "Download the Mount Vernon Lofts brochure featuring floor plans, building details, neighborhood highlights, and pricing for modern condos in Montrose, Houston.",
  keywords: "montrose condos brochure, houston condo information, mount vernon lofts details, montrose real estate brochure",
  openGraph: {
    title: "Download Brochure | Mount Vernon Lofts — Montrose Condos",
    description: "Get instant access to our property brochure featuring floor plans, building details, and pricing information.",
    images: [
      {
        url: "/images/gallery/interiors/living-room.jpg",
        width: 1200,
        height: 630,
        alt: "Mount Vernon Lofts condo interior in Montrose"
      }
    ]
  }
}

export default function BrochurePage() {
  return (
    <main>
      <BrochureHero />
      <BrochureOverview />
      <BrochureForm />
    </main>
  )
}
