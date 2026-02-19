// Amenities data configuration

export interface AmenitySection {
  id: string
  title: string
  description?: string
  items?: string[]
  image: string
  alt: string
  backgroundColor?: "white" | "beige"
  imagePosition?: "left" | "right"
}

export const amenitySections: AmenitySection[] = [
  {
    id: "parking",
    title: "Covered Parking",
    items: [
      "1 covered parking space per unit — included with every home",
      "Protected from Houston sun and rain",
      "Gated access with resident entry code",
    ],
    image: "/images/gallery/exteriors/exterior-2.jpg",
    alt: "Covered parking at Mount Vernon Lofts",
    backgroundColor: "white",
    imagePosition: "left"
  },
  {
    id: "pet-friendly",
    title: "Pet-Friendly Community",
    items: [
      "Up to 2 dogs per handler in common areas — $75 registration fee per pet",
      "Breed restrictions apply — check with management for details",
      "Walkable neighborhood with parks and green spaces nearby",
      "Outdoor common areas for fresh air and socializing",
    ],
    image: "/images/lifestyle/dog_running.png",
    alt: "Pet-friendly community at Mount Vernon Lofts",
    backgroundColor: "beige",
    imagePosition: "right"
  },
  {
    id: "building-features",
    title: "Modern Building Features",
    items: [
      "Built in 2018 — modern construction with concrete foundation",
      "Open layouts with natural light throughout",
      "In-unit washer and dryer — no trips to the laundromat",
      "Professional property management by Equity",
    ],
    image: "/images/gallery/interiors/living-room.jpg",
    alt: "Modern interior at Mount Vernon Lofts",
    backgroundColor: "white",
    imagePosition: "left"
  },
  {
    id: "community",
    title: "Owner-Focused Community",
    items: [
      "Short-term rentals (Airbnb, VRBO) prohibited — no revolving-door tourists",
      "42 units total — small enough to know your neighbors",
      "Recreational lounge and outdoor common areas",
      "Gated property with resident entry access",
    ],
    image: "/images/gallery/exteriors/exterior-2.jpg",
    alt: "Owner-focused community at Mount Vernon Lofts",
    backgroundColor: "beige",
    imagePosition: "right"
  },
]
