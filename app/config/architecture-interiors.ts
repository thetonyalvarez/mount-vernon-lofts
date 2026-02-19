// Architecture interior features data configuration

export interface InteriorFeature {
  title: string
  description: string
  image: string
  alt: string
}

export const interiorFeatures: InteriorFeature[] = [
  {
    title: "Natural Light Throughout",
    description: "Large windows fill each unit with natural light from morning to evening. Open layouts make even studio floor plans feel spacious — a real difference from typical apartment living.",
    image: "/images/gallery/interiors/living-room.jpg",
    alt: "Large windows with natural light in living area",
  },
  {
    title: "Modern Finishes",
    description: "Granite countertops, European-style cabinetry, tile backsplash, and in-unit washer and dryer. Built in 2018, all systems and appliances are modern — move-in ready, no renovations needed.",
    image: "/images/gallery/interiors/kitchen-2.jpg",
    alt: "Modern kitchen with granite countertops and European-style cabinetry",
  },
  {
    title: "2018 Construction",
    description: "Built in 2018 with concrete foundation — modern building systems, efficient insulation, and contemporary design throughout. A newer building that's built to last.",
    image: "/images/gallery/exteriors/exterior-2.jpg",
    alt: "Mount Vernon Lofts modern exterior",
  }
]
