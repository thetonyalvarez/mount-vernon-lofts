import { SubpageQuickStats } from "@/app/neighborhood/components/SubpageQuickStats"
import { museumsQuickStats, museumsData } from "@/app/config/neighborhood-museums-data"

export function IntroSection() {
  return (
    <SubpageQuickStats
      stats={museumsQuickStats}
      lastUpdated={museumsData.lastUpdated}
    />
  )
}
