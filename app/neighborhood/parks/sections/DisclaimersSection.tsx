import { SubpageDisclaimers } from "@/app/neighborhood/components/SubpageDisclaimers"
import { parksData } from "@/app/config/neighborhood-parks-data"

export function DisclaimersSection() {
  return (
    <SubpageDisclaimers
      disclaimers={parksData.disclaimers}
      lastUpdated={parksData.lastUpdated}
    />
  )
}
