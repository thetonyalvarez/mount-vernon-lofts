// Team members data configuration

export interface TeamMember {
  id: string
  company: string
  role: string
  description: string
  website?: string
  logo?: string
  highlights?: string[]
  contact?: {
    email?: string
    phone?: string
    address?: string
  }
  leadership?: {
    name?: string
    title?: string
  }[]
}

export const teamMembers: TeamMember[] = [
  {
    id: "developer",
    company: "Blake Capital Group",
    role: "Developer",
    description: "Houston-based real estate development firm focused on delivering quality residential projects. Blake Capital Group identified Mount Vernon Lofts as an opportunity to bring attainable homeownership to one of Houston's most desirable inner-loop neighborhoods.",
    highlights: [
      "Houston-based real estate development",
      "Focus on attainable urban housing",
      "42-unit condo conversion in Montrose",
    ],
  },
  {
    id: "property-manager",
    company: "Equity",
    role: "Property Management",
    description: "Professional property management ensuring Mount Vernon Lofts maintains its modern appeal and well-run community. Equity handles day-to-day operations, maintenance, and HOA management for a smooth ownership experience.",
    highlights: [
      "Professional HOA management",
      "Day-to-day building operations",
      "Responsive maintenance and owner support",
    ],
  },
  {
    id: "sales-marketing",
    company: "Nan Properties Developer Services",
    role: "Sales & Marketing",
    description: "Nan Properties Developer Services brings deep Houston real estate expertise to Mount Vernon Lofts. Specializing in developer sales and marketing, the team connects first-time buyers with attainable ownership opportunities across Houston's inner loop.",
    website: "https://nanproperties.com/developer-services",
    logo: "/logos/team/npds_logo.svg",
    highlights: [
      "20+ years in Houston real estate",
      "Specialized developer sales expertise",
      "Pre-construction through sellout services",
      "Strategic consulting and market analysis",
    ],
    contact: {
      email: "info@nanproperties.com",
      phone: "713.714.6454"
    }
  }
]

export const teamIntroContent = {
  title: "The Team Behind Mount Vernon Lofts",
  subtitle: "Experienced Partners, Real Results",
  description: "Mount Vernon Lofts brings together experienced Houston real estate professionals in development, property management, and sales. This team combines decades of local market knowledge with a shared commitment to delivering attainable homeownership in Montrose."
}
