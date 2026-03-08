import { Metadata } from 'next'
import { HeroSection } from "@/app/components/HeroSection"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import { FirstTimeBuyerSchema } from "./FirstTimeBuyerSchema"
import {
  BuyerStatStrip,
  BuyerRentVsBuySection,
  BuyerCondoVsHouseSection,
  BuyerCostsSection,
  BuyerDPASection,
  BuyerStepsSection,
  BuyerFinancingSection,
  BuyerHomesteadSection,
  BuyerFirstYearSection,
  BuyerFAQSection,
  BuyerCTASection,
  BuyerDisclaimersSection
} from "./sections"

export const metadata: Metadata = {
  title: "First-Time Buyer Guide | How to Buy a Condo in Houston",
  description: "Step-by-step guide to buying your first condo in Houston. Down payment programs, financing options, rent vs. buy math, and what first-time buyers need to know.",
  keywords: "first time home buyer Houston, how to buy a condo, condo vs renting Houston, first time buyer programs Houston TX, Houston down payment assistance 2026, first time condo buyer checklist",
  openGraph: {
    title: "First-Time Buyer's Guide to Buying a Condo in Houston",
    description: "From down payment assistance to closing day. Everything Houston first-time buyers need to know about purchasing a condo — including programs that can save you up to $50,000.",
    images: [{
      url: '/images/neighborhood/skyline.jpg',
      width: 1200,
      height: 630,
      alt: 'Houston skyline from Montrose neighborhood'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/first-time-buyer`
  }
}

export default function FirstTimeBuyerPage() {
  return (
    <main>
      <DataLayerEvent event="view_content" data={{ content_type: 'guide', content_name: 'First Time Buyer Guide' }} />
      <FirstTimeBuyerSchema />
      <HeroSection
        title="YOUR GUIDE TO BUYING YOUR FIRST CONDO IN HOUSTON"
        subtitle="From figuring out if you're ready to buy, to picking up your keys — here's what first-time buyers in Houston actually need to know."
        fallbackImage="/images/neighborhood/skyline.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <BuyerStatStrip />
      <BuyerRentVsBuySection />
      <BuyerCondoVsHouseSection />
      <BuyerCostsSection />
      <BuyerDPASection />
      <BuyerStepsSection />
      <BuyerFinancingSection />
      <BuyerHomesteadSection />
      <BuyerFirstYearSection />
      <BuyerFAQSection />
      <BuyerCTASection />
      <BuyerDisclaimersSection />
    </main>
  )
}
