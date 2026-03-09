import { SubpageQuickStats } from "@/app/neighborhood/components/SubpageQuickStats"
import { parksData } from "@/app/config/neighborhood-parks-data"

export function IntroSection() {
  return (
    <SubpageQuickStats
      stats={parksData.quickStats}
      lastUpdated={parksData.lastUpdated}
    />
  )
}
