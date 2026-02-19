// Centralized navigation configuration
// Edit this file to update links across the entire site

export interface NavLink {
  readonly label: string
  readonly href: string
  readonly external?: boolean
}

export interface ContactInfo {
  readonly address: {
    readonly line1: string
    readonly line2: string
  }
  readonly email: string
  readonly phone: string
  readonly note: string
}

// Project-specific data for Mount Vernon Lofts
export const projectData = {
  residences: 42,
  stories: 4,
  address: "4509 Mount Vernon, Houston, TX 77006",
  availability: "Now",
  developer: "Blake Capital Group",
  propertyManager: "Equity",
  neighborhood: "Montrose",
  ownership: "Fee Simple",
  yearBuilt: 2018,
  range: {
    price: "Starting in the $215Ks",
    bedrooms: "Studios & 1-Bedrooms",
    bathrooms: "1",
    interiorSqFt: "612-799",
  }
}

// Main navigation links (used in mobile menu)
export const mainNavLinks: ReadonlyArray<NavLink> = [
  { label: "Residences", href: "/residences" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Neighborhood", href: "/neighborhood" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/inquire" },
]

// Footer navigation links
export const footerNavLinks: ReadonlyArray<NavLink> = [
  { label: "HOME", href: "/" },
  { label: "RESIDENCES", href: "/residences" },
  { label: "FLOOR PLANS", href: "/floor-plans" },
  { label: "NEIGHBORHOOD", href: "/neighborhood" },
  { label: "GALLERY", href: "/gallery" },
]

// Footer bottom links
export const footerBottomLinks: ReadonlyArray<NavLink> = [
  { label: "PRIVACY & LEGAL", href: "#privacy-legal" },
  {
    label: "TREC INFO",
    href: "https://www.har.com/mhf/terms/dispBrokerInfo?sitetype=aws&cid=611863&token=a0f33cf34591caed5c88507d9bf4608a",
    external: true
  },
  {
    label: "CONSUMER PROTECTION",
    href: "https://content.harstatic.com/pdf/TREC_CPN.pdf",
    external: true
  },
]

// Social media links
export const socialLinks = {
  instagram: "https://instagram.com/mountvernonlofts",
  facebook: "https://facebook.com/mtvernonlofts",
}

// Contact information
export const contactInfo: ContactInfo = {
  address: {
    line1: "4509 MOUNT VERNON",
    line2: "HOUSTON, TX 77006",
  },
  email: "MOUNTVERNONLOFTS@NANPROPERTIES.COM",
  phone: "713.986.9929",
  note: "Tours available 7 days a week. Schedule yours today.",
}

// Legal disclaimer
export const legalDisclaimer = `All prices, features, and availability subject to change without notice. Short-term rentals (Airbnb, VRBO) prohibited per HOA Declaration. Equal Housing Opportunity. Buyer to verify all information. Exclusively represented by Nan Properties Developer Services. Information deemed reliable but not guaranteed.`

// Copyright text
export const copyrightText = "\u00A9 Mount Vernon Lofts, All Rights Reserved"

// Brand tagline
export const tagline = "Montrose ownership, finally within reach."
