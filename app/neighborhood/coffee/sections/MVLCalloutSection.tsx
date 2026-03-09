"use client"

import { SubpageMVLCallout } from "@/app/neighborhood/components/SubpageMVLCallout"
import { coffeeData } from "@/app/config/neighborhood-coffee-data"

export function MVLCalloutSection() {
  return (
    <SubpageMVLCallout
      callout={coffeeData.mvlCallout}
      source="coffee"
    />
  )
}
