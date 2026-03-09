import { SubpageMVLCallout } from "@/app/neighborhood/components/SubpageMVLCallout"
import { museumsMVLCallout } from "@/app/config/neighborhood-museums-data"

export function MVLCalloutSection() {
  return (
    <SubpageMVLCallout
      callout={museumsMVLCallout}
      source="museums"
    />
  )
}
