// Footer Grid Configuration

export interface FooterGridItem {
  id: string
  title: string
  description: string
  linkText: string
  linkHref: string
  backgroundColor: 'beige' | 'beige-light'
  hasBorder?: boolean
}

export const footerGridItems: FooterGridItem[] = [
  {
    id: 'residences',
    title: 'RESIDENCES',
    description: "42 modern condos — studios and 1-bedrooms designed for first-time buyers in one of Houston's most walkable neighborhoods",
    linkText: 'VIEW RESIDENCES',
    linkHref: '/residences',
    backgroundColor: 'beige',
    hasBorder: false
  },
  {
    id: 'floor-plans',
    title: 'FLOOR PLANS',
    description: 'Thoughtfully designed layouts from 612 to 799 sq ft with high ceilings, natural light, and modern finishes',
    linkText: 'VIEW FLOOR PLANS',
    linkHref: '/floor-plans',
    backgroundColor: 'beige-light',
    hasBorder: true
  },
  {
    id: 'neighborhood',
    title: 'NEIGHBORHOOD',
    description: "Discover Montrose's walkable streets, local coffee shops, restaurants, galleries, and proximity to the Museum District and Medical Center",
    linkText: 'VIEW NEIGHBORHOOD',
    linkHref: '/neighborhood',
    backgroundColor: 'beige',
    hasBorder: true
  }
]
