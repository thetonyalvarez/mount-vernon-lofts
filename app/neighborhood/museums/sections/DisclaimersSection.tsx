import { SubpageDisclaimers } from "@/app/neighborhood/components/SubpageDisclaimers"
import { museumsData } from "@/app/config/neighborhood-museums-data"
import { SUBPAGE_DISCLAIMERS } from "@/app/config/neighborhood-subpage-types"

export function DisclaimersSection() {
  return (
    <SubpageDisclaimers
      disclaimers={SUBPAGE_DISCLAIMERS}
      lastUpdated={museumsData.lastUpdated}
    />
  )
}
