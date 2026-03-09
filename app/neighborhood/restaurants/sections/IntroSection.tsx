import { SubpageQuickStats } from "@/app/neighborhood/components/SubpageQuickStats"
import { restaurantsData } from "@/app/config/neighborhood-restaurants-data"

export function IntroSection() {
  return (
    <SubpageQuickStats
      stats={restaurantsData.quickStats}
      lastUpdated={restaurantsData.lastUpdated}
    />
  )
}
