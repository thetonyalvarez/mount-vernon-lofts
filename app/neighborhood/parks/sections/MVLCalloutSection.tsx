import { SubpageMVLCallout } from "@/app/neighborhood/components/SubpageMVLCallout"
import { parksData } from "@/app/config/neighborhood-parks-data"

export function MVLCalloutSection() {
  return <SubpageMVLCallout callout={parksData.mvlCallout} source="parks" />
}
