"use client"

import dynamic from 'next/dynamic'
import {
  HeroSection,
  ExclusivitySection,
  ContactFormSection,
} from "./home/sections"

// Dynamically import below-fold sections for better performance
const AmenitiesSection = dynamic(() => import('./home/sections').then(mod => ({ default: mod.AmenitiesSection })), {
  loading: () => <div className="h-96 bg-mvl-warm-white animate-pulse" />
})

const ArchitectureSection = dynamic(() => import('./home/sections').then(mod => ({ default: mod.ArchitectureSection })), {
  loading: () => <div className="h-96 bg-mvl-beige animate-pulse" />
})

const LifestyleSection = dynamic(() => import('./home/sections').then(mod => ({ default: mod.LifestyleSection })), {
  loading: () => <div className="h-96 bg-mvl-warm-white animate-pulse" />
})

const homepageFAQSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do condos cost at Mount Vernon Lofts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Condos start in the $215Ks. HOA is $300/month and includes water. Mount Vernon Lofts is designed for first-time buyers looking for attainable ownership in Montrose."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Mount Vernon Lofts located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mount Vernon Lofts is located at 4509 Mount Vernon in Houston's Montrose neighborhood (77006). Montrose is one of Houston's most walkable neighborhoods, close to the Museum District, Medical Center, and downtown."
      }
    },
    {
      "@type": "Question",
      "name": "How many units are available at Mount Vernon Lofts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mount Vernon Lofts has 42 total units — 34 studios (612-705 sq ft) and 8 one-bedrooms (717-799 sq ft). Built in 2018 with concrete foundation and modern building systems."
      }
    }
  ]
})

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Homepage-only FAQ schema — not in global layout to avoid duplication on other pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homepageFAQSchema }}
      />

      <HeroSection />
      <ExclusivitySection />
      <ContactFormSection />
      <ArchitectureSection />
      <AmenitiesSection />
      <LifestyleSection />
    </div>
  )
}
