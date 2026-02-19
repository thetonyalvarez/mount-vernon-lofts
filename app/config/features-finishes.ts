// Features and Finishes data configuration

export interface FeatureCategory {
  title: string
  description: string
  image: string
  features: string[]
}

export const featuresFinishesData: FeatureCategory[] = [
  {
    title: "Unit Features",
    description: "Studios and 1-bedrooms designed for efficient, comfortable living in Montrose.",
    image: "/images/unit-9_1-bed/9-5.jpg",
    features: [
      "Studios (612-705 sq ft) and 1-bedrooms (717-799 sq ft)",
      "Open layouts with natural light throughout",
      "In-unit washer and dryer included",
      "1 covered parking space per unit",
      "Built in 2018 — concrete foundation, modern building systems",
      "Individual HVAC system per unit",
      "Pet-friendly — up to 2 dogs per handler, $75 registration fee, breed restrictions apply",
    ],
  },
  {
    title: "Kitchen & Bath",
    description: "Modern kitchens and bathrooms with quality materials and finishes.",
    image: "/images/unit-8_1-bed/8-3.jpg",
    features: [
      "Granite countertops with tile backsplash",
      "European-style cabinetry",
      "Dishwasher and garbage disposal",
      "Smart thermostat and ceiling fans",
      "In-unit washer and dryer",
    ],
  },
  {
    title: "Building & Community",
    description: "A well-managed, owner-focused community in the heart of Montrose.",
    image: "/images/unit-8_1-bed/8-7.jpg",
    features: [
      "Professional property management by Equity",
      "HOA $300/month — includes water",
      // "HOA reserves at 16.7% (above Fannie Mae 10% requirement)",
      "Gated property with resident entry access",
      "Mailboxes and mail center",
      "Recreational lounge and outdoor common areas",
      "Short-term rentals prohibited — owner-focused community",
    ],
  }
]
