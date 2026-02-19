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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <HeroSection />
      <ExclusivitySection />
      <ContactFormSection />
      <ArchitectureSection />
      <AmenitiesSection />
      <LifestyleSection />
    </div>
  )
}
