import { SubpageDisclaimers } from "@/app/neighborhood/components/SubpageDisclaimers"
import { transitData } from "@/app/config/neighborhood-transit-data"

const TRANSIT_DISCLAIMERS = [
  "Transit routes, fares, schedules, and service availability are subject to change. Visit ridemetro.org or call 713-635-4000 for current information.",
  "Rideshare cost estimates are approximate and based on typical non-surge pricing. Actual fares vary.",
  "Distances are approximate from 4509 Mount Vernon St.",
  "Equal Housing Opportunity.",
] as const

export function DisclaimersSection() {
  return (
    <SubpageDisclaimers
      disclaimers={TRANSIT_DISCLAIMERS}
      lastUpdated={transitData.lastUpdated}
    />
  )
}
