import { SubpageQuickStats } from "@/app/neighborhood/components/SubpageQuickStats"
import { transitData } from "@/app/config/neighborhood-transit-data"

export function IntroSection() {
  return (
    <SubpageQuickStats
      stats={transitData.quickStats}
      lastUpdated={transitData.lastUpdated}
    />
  )
}
