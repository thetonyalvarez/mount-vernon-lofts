import { SubpageMapEmbed } from "@/app/neighborhood/components/SubpageMapEmbed"

export function MapSection() {
  return (
    <SubpageMapEmbed
      title="Map: Restaurants Near MVL"
      query="restaurants near 4509 Mount Vernon St Houston TX 77006"
    />
  )
}
