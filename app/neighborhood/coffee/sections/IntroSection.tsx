import { SubpageQuickStats } from "@/app/neighborhood/components/SubpageQuickStats"
import { coffeeData } from "@/app/config/neighborhood-coffee-data"

export function IntroSection() {
  return (
    <SubpageQuickStats
      stats={coffeeData.quickStats}
      lastUpdated={coffeeData.lastUpdated}
    />
  )
}
