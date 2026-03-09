import { SubpageDisclaimers } from "@/app/neighborhood/components/SubpageDisclaimers"
import { SUBPAGE_DISCLAIMERS } from "@/app/config/neighborhood-subpage-types"
import { coffeeData } from "@/app/config/neighborhood-coffee-data"

export function DisclaimersSection() {
  return (
    <SubpageDisclaimers
      disclaimers={SUBPAGE_DISCLAIMERS}
      lastUpdated={coffeeData.lastUpdated}
    />
  )
}
