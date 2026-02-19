import { Metadata } from "next"
import { FloorPlanOverview } from "./components/FloorPlanOverview"
import { FloorPlanSelector } from "./components/FloorPlanSelector"
import { FloorPlanForm } from "./components/FloorPlanForm"

export const metadata: Metadata = {
  title: "Floor Plans | Mount Vernon Lofts — Montrose Condos",
  description: "View floor plans for studios and 1-bedroom condos at Mount Vernon Lofts in Montrose, Houston. 6 layouts from 612 to 799 sq ft. Request detailed floor plans today.",
  keywords: "montrose condo floor plans, houston condo layouts, mount vernon lofts floor plans, studio condo houston, 1-bedroom condo montrose",
  openGraph: {
    title: "Floor Plans | Mount Vernon Lofts — Montrose Condos",
    description: "View studio and 1-bedroom floor plans at Mount Vernon Lofts in Montrose, Houston. 6 layouts from 612 to 799 sq ft.",
    images: [
      {
        url: "/floor-plans/Studio S1 - 612 sq ft.jpg",
        width: 1200,
        height: 630,
        alt: "Mount Vernon Lofts Studio S1 floor plan"
      }
    ]
  }
}

export default function FloorPlansPage() {
  return (
    <main>
      <FloorPlanOverview />
      <FloorPlanSelector />
      <FloorPlanForm />
    </main>
  )
}
