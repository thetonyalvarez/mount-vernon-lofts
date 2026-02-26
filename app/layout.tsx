import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { Footer } from "./components/Footer";
import { ContactModalProvider } from "@/lib/contact-modal-context";
import { ContactModal } from "@/components/ContactModal";
import { GoogleTagManager, GTMDebugInfo } from "@/app/components/analytics";
import { EnhancedMetadata } from "@/app/components/metadata/EnhancedMetadata";
import { OpenHouseBannerWrapper } from "@/components/OpenHouseBannerWrapper";
import { DeferredScripts } from "@/components/DeferredScripts";
import "./globals.css";

// Define the Montserrat font for headings
const montserrat = localFont({
  src: [
    {
      path: "../public/fonts/montserrat/montserrat-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

// Define the Inter font (self-hosted)
const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/inter-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/inter-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/inter-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/inter-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/inter-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mount Vernon Lofts | Modern Condos in Montrose, Houston",
  description: "Modern condos in Montrose, Houston starting in the $215Ks. Studios and 1-bedrooms in one of Houston's most walkable neighborhoods. Built 2018, pet-friendly, covered parking. Schedule a tour today.",
  keywords: "montrose condos, houston condos for sale, first-time buyer houston, montrose real estate, condos near medical center, inner loop condos houston, affordable condos montrose, mount vernon lofts",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'),
  openGraph: {
    title: "Mount Vernon Lofts | Montrose Condos Starting in the $215Ks",
    description: "42 modern condos in Houston's Montrose neighborhood starting in the $215Ks. Built 2018, walkable to restaurants and coffee shops. Schedule a tour.",
    type: "website",
    locale: "en_US",
    siteName: "Mount Vernon Lofts",
    url: "https://mtvernonlofts.com",
    images: [
      {
        url: 'https://mount-vernon-lofts.s3.amazonaws.com/images/gallery/exteriors/exterior-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Mount Vernon Lofts modern condos in Montrose, Houston',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mount Vernon Lofts | Montrose Condos Starting in the $215Ks",
    description: "Modern condos in Montrose, Houston starting in the $215Ks. Schedule a tour today.",
    images: ['https://mount-vernon-lofts.s3.amazonaws.com/images/gallery/exteriors/exterior-1.jpg'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Houston',
    'geo.position': '29.7560;-95.3920',
    'ICBM': '29.7560, -95.3920',
    'geo.locality': 'Montrose',
    'geo.postal-code': '77006',
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    'p:domain_verify': process.env.PINTEREST_SITE_VERIFICATION || '',
    'domain-verification': 'mtvernonlofts.com'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if we're on the maintenance page - render bare-bones layout
  const headersList = await headers();
  const isMaintenance = headersList.get('x-maintenance-mode') === 'true';
  const isBareLayout = headersList.get('x-bare-layout') === 'true';

  // Maintenance mode: render completely bare layout
  if (isMaintenance) {
    return (
      <html lang="en">
        <head>
          <meta name="robots" content="noindex, nofollow" />
        </head>
        <body
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#FFFCF7',
            color: '#2D2B29',
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
            padding: 0,
          }}
        >
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`scroll-smooth ${montserrat.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <meta name="apple-mobile-web-app-title" content="Mount Vernon Lofts" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#E07A5F" />
        <meta name="msapplication-TileColor" content="#E07A5F" />

        {/* Domain preference and canonical signals */}
        <link rel="alternate" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'} hrefLang="en-us" />
        <link rel="alternate" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'} hrefLang="x-default" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'} />
        {process.env.GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        )}
        {process.env.BING_SITE_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.BING_SITE_VERIFICATION} />
        )}

        {/* Enhanced domain and indexing signals */}
        <meta httpEquiv="Content-Language" content="en-US" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="origin-when-cross-origin" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/inter/inter-400.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/montserrat/montserrat-600.woff2" as="font" type="font/woff2" crossOrigin="" />

        {/* Preload critical hero image for faster LCP - mobile optimized */}
        <link
          rel="preload"
          as="image"
          href="https://mount-vernon-lofts.s3.amazonaws.com/images/gallery/exteriors/exterior-1.jpg"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="https://mount-vernon-lofts.s3.amazonaws.com/images/gallery/exteriors/exterior-1.jpg"
          media="(max-width: 767px)"
          fetchPriority="high"
        />

        {/* Enhanced Metadata and Structured Data */}
        <EnhancedMetadata pageType="homepage" />
      </head>
      <body className="font-sans antialiased">
        {isBareLayout ? (
          /* Bare layout: no nav, banner, footer, or contact modal — used for open house forms */
          <main id="main-content">{children}</main>
        ) : (
          <ContactModalProvider>
            {/* Skip Navigation Link for Accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-mvl-coral text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Skip to main content
            </a>
            <OpenHouseBannerWrapper />
            <main id="main-content">
              {children}
            </main>
            <Footer />
            <ContactModal />
          </ContactModalProvider>
        )}
        <GoogleTagManager />
        <DeferredScripts />
        {process.env.NODE_ENV === 'development' && <GTMDebugInfo />}
      </body>
    </html>
  );
}
