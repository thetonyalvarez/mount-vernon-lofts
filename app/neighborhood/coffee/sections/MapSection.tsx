import { SubpageMapEmbed } from "@/app/neighborhood/components/SubpageMapEmbed"

export function MapSection() {
  return (
    <SubpageMapEmbed
      title="Map: Coffee Shops Near MVL"
      query="coffee shops near 4509 Mount Vernon St Houston TX 77006"
    />
  )
}
