import { SubpageMapEmbed } from "@/app/neighborhood/components/SubpageMapEmbed"

export function MapSection() {
  return (
    <SubpageMapEmbed
      title="Map: Museums Near MVL"
      query="museums near 4509 Mount Vernon St Houston TX 77006"
    />
  )
}
