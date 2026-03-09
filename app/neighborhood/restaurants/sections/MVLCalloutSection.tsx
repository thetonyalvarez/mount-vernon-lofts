"use client"

import { SubpageMVLCallout } from "@/app/neighborhood/components/SubpageMVLCallout"
import { restaurantsData } from "@/app/config/neighborhood-restaurants-data"

export function MVLCalloutSection() {
  return (
    <SubpageMVLCallout
      callout={restaurantsData.mvlCallout}
      source="restaurants"
    />
  )
}
