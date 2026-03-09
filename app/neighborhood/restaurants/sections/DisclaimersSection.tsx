import { SubpageDisclaimers } from "@/app/neighborhood/components/SubpageDisclaimers"
import { SUBPAGE_DISCLAIMERS } from "@/app/config/neighborhood-subpage-types"
import { restaurantsData } from "@/app/config/neighborhood-restaurants-data"

export function DisclaimersSection() {
  return (
    <SubpageDisclaimers
      disclaimers={SUBPAGE_DISCLAIMERS}
      lastUpdated={restaurantsData.lastUpdated}
    />
  )
}
