/**
 * Contact information configuration for Mount Vernon Lofts
 * Centralized contact details used across emails, forms, and website
 */

export const CONTACT_CONFIG = {
  // Primary contact information
  email: 'info@mtvernonlofts.com',
  phone: '713.986.9929',

  // Sales team contact
  salesEmail: 'info@mtvernonlofts.com',

  // Company information
  companyName: 'Mount Vernon Lofts',
  tagline: 'Montrose ownership, finally within reach.',
  location: "Montrose, Houston's Most Walkable Neighborhood",

  // Property address (sales are on-site)
  propertyAddress: {
    street: '4509 Mount Vernon',
    city: 'Houston',
    state: 'TX',
    zip: '77006',
    fullAddress: '4509 Mount Vernon, Houston, TX 77006',
    googleMapsUrl: 'https://www.google.com/maps/place/Mt.+Vernon+Lofts/@29.7321021,-95.3960046,979m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8640bf7dfa84632f:0x38a1ee531ace3ef5!8m2!3d29.7320975!4d-95.3934297!16s%2Fg%2F11fk4dvpqb?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D'
  },

  // Website URLs
  website: 'https://mtvernonlofts.com',
  documentsUrl: 'https://mtvernonlofts.com/documents',

  // Floor plans PDF (S3 URL for reliability)
  floorPlansPdfUrl: 'https://mount-vernon-lofts.s3.us-east-2.amazonaws.com/documents/mvl_brochure.pdf',

  // Email subjects
  subjects: {
    floorPlansDelivery: (floorPlan: string) =>
      `Your Mount Vernon Lofts Floor Plans${floorPlan !== 'all_plans' ? ` - ${floorPlan}` : ' - Complete Collection'}`,
    floorPlansLead: (name: string) =>
      `Floor Plans Request - ${name}`,
    brochureDelivery: () =>
      `Your Mount Vernon Lofts Brochure`,
    brochureLead: (name: string) =>
      `Brochure Request - ${name}`,
    generalInquiry: (name: string) =>
      `New Inquiry from ${name} - Mount Vernon Lofts`
  }
} as const

export type ContactConfig = typeof CONTACT_CONFIG
