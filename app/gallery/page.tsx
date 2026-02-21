import { Metadata } from 'next'
import { HeroSection } from '@/app/components/HeroSection'
import { DataLayerEvent } from '@/app/components/analytics/DataLayerEvent'
import { GalleryHeroSection, GalleryGrid } from './sections'

export const metadata: Metadata = {
  title: 'Photo Gallery | Mount Vernon Lofts — Montrose Condos',
  description: 'Browse photos of Mount Vernon Lofts condos in Montrose, Houston. See real interiors, building details, and the walkable Montrose neighborhood.',
  keywords: 'montrose condos photos, houston condos gallery, mount vernon lofts images, montrose real estate photos, houston condo interiors',
  openGraph: {
    title: 'Photo Gallery | Mount Vernon Lofts',
    description: 'Real photos of modern condos in Houston\'s Montrose neighborhood.',
    images: [{
      url: '/images/unit-9_1-bed/9-4.jpg',
      width: 1200,
      height: 630,
      alt: 'Living and dining area at Mount Vernon Lofts in Montrose'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/gallery`
  }
}

export default function GalleryPage() {
  return (
    <main>
      <DataLayerEvent event="view_content" data={{ content_type: 'gallery', content_name: 'Gallery' }} />
      <HeroSection
        title="GALLERY"
        subtitle="Real photos of studios and 1-bedrooms at Mount Vernon Lofts"
        fallbackImage="/images/unit-9_1-bed/9-4.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <GalleryHeroSection />
      <GalleryGrid />
    </main>
  )
}