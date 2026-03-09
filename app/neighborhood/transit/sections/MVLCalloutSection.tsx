import { SubpageMVLCallout } from "@/app/neighborhood/components/SubpageMVLCallout"
import { transitData } from "@/app/config/neighborhood-transit-data"

export function MVLCalloutSection() {
  return <SubpageMVLCallout callout={transitData.mvlCallout} source="transit" />
}
