/**
 * Metadata utilities for Mount Vernon Lofts
 * Ensures consistent attainable real estate metadata across all pages
 */

import type { Metadata } from 'next';

interface MetadataOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  images?: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
  pageType?: 'homepage' | 'residences' | 'gallery' | 'contact' | 'neighborhood' | 'floor-plans';
}

const BASE_URL = 'https://mtvernonlofts.com';
const SITE_NAME = 'Mount Vernon Lofts';
const DEFAULT_IMAGE = `${BASE_URL}/images/gallery/exteriors/exterior-1.jpg`;

export function generateMetadata(options: MetadataOptions): Metadata {
  const {
    title = `${SITE_NAME} | Modern Condos in Montrose, Houston`,
    description = "Modern condos in Montrose, Houston starting in the $215Ks. Studios and 1-bedrooms in one of Houston's most walkable neighborhoods. Built 2018, pet-friendly, covered parking. Schedule a tour today.",
    canonicalPath = '',
    images = [{
      url: DEFAULT_IMAGE,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} modern condos in Montrose, Houston`
    }],
    pageType = 'homepage'
  } = options;

  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  // Generate platform-optimized titles
  const openGraphTitle = pageType === 'homepage'
    ? `${SITE_NAME} | Montrose Condos Starting in the $215Ks`
    : title;

  const twitterTitle = title.length > 70
    ? `${SITE_NAME} | ${title.split('|')[1]?.trim() ?? 'Montrose Condos'}`
    : title;

  return {
    title,
    description,
    keywords: getKeywordsForPageType(pageType),

    metadataBase: new URL(BASE_URL),

    alternates: {
      canonical: canonicalUrl
    },

    openGraph: {
      title: openGraphTitle,
      description: getOpenGraphDescription(description, pageType),
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      url: canonicalUrl,
      images: images.map(img => ({
        ...img,
        url: img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`,
        type: 'image/jpeg'
      }))
    },

    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: getTwitterDescription(description, pageType),
      images: images.map(img =>
        img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`
      ),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    other: {
      'geo.region': 'US-TX',
      'geo.placename': 'Houston',
      'geo.position': '29.7560;-95.3920',
      'ICBM': '29.7560, -95.3920',
      'geo.locality': 'Montrose',
      'geo.postal-code': '77006'
    }
  };
}

function getKeywordsForPageType(pageType: string): string {
  const baseKeywords = 'montrose condos, houston condos for sale, first-time buyer houston, montrose real estate, inner loop condos houston';

  const pageSpecificKeywords: Record<string, string> = {
    homepage: `${baseKeywords}, condos near medical center, mount vernon lofts, walkable houston condos`,
    residences: `${baseKeywords}, studios montrose houston, 1 bedroom condos montrose, condos from 215k houston`,
    gallery: `${baseKeywords}, montrose condo photos, modern condos houston interior`,
    contact: `${baseKeywords}, schedule tour montrose condos, buy condo houston`,
    neighborhood: `${baseKeywords}, montrose neighborhood houston, walkable neighborhoods houston, museum district houston`,
    'floor-plans': `${baseKeywords}, studio floor plans houston, condo floor plans montrose`
  };

  return pageSpecificKeywords[pageType] ?? baseKeywords;
}

function getOpenGraphDescription(description: string, pageType: string): string {
  if (pageType === 'homepage') {
    return "42 modern condos in Houston's Montrose neighborhood starting in the $215Ks. Built 2018, walkable to restaurants and coffee shops. Schedule a tour.";
  }

  // Optimize for social sharing - shorter and more compelling
  return description.length > 160
    ? `${description.substring(0, 157)}...`
    : description;
}

function getTwitterDescription(description: string, pageType: string): string {
  const maxLength = 200;

  if (pageType === 'homepage') {
    return "Modern condos in Montrose, Houston starting in the $215Ks. Schedule a tour today.";
  }

  return description.length > maxLength
    ? `${description.substring(0, maxLength - 3)}...`
    : description;
}

/**
 * Generate structured data for specific page types
 */
export function generateStructuredData(pageType: string, canonicalUrl: string) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}/#webpage`,
    "url": canonicalUrl,
    "isPartOf": {
      "@id": `${BASE_URL}/#website`
    },
    "about": {
      "@id": `${BASE_URL}/#organization`
    },
    "datePublished": "2024-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString()
  };

  const pageSpecificData: Record<string, object> = {
    residences: {
      ...baseStructuredData,
      "@type": ["WebPage", "RealEstateListing"],
      "mainEntity": {
        "@type": "ApartmentComplex",
        "name": `${SITE_NAME} Residences`,
        "numberOfAccommodationUnits": 42
      }
    },
  };

  return pageSpecificData[pageType] ?? baseStructuredData;
}

/**
 * Email sharing optimization
 */
export function generateEmailMetadata() {
  return {
    'format-detection': 'telephone=no,address=no,email=no',
    'x-apple-disable-message-reformatting': 'true'
  };
}

/**
 * Social platform specific optimizations
 */
export function getPlatformOptimizedMetadata(platform: 'linkedin' | 'whatsapp' | 'instagram'): Partial<Metadata> {
  const optimizations = {
    linkedin: {
      openGraph: {
        title: `${SITE_NAME}: Attainable Montrose Condos Starting in the $215Ks`,
        description: "42 modern condos in one of Houston's most walkable neighborhoods. Studios and 1-bedrooms for first-time buyers. Schedule a tour."
      }
    },
    whatsapp: {
      openGraph: {
        title: `${SITE_NAME}: Montrose Condos Starting in the $215Ks`,
        description: "Modern condos in Montrose, Houston starting in the $215Ks. Schedule a tour today."
      }
    },
    instagram: {
      openGraph: {
        title: SITE_NAME,
        description: "Modern condos in Montrose, Houston starting in the $215Ks"
      }
    }
  };

  return optimizations[platform];
}
