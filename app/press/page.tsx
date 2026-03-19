import { Metadata } from 'next'
import { DataLayerEvent } from '@/app/components/analytics/DataLayerEvent'
import { PressHeroSection, PressArticleList } from './sections'
import { PressSchema } from './PressSchema'

export const metadata: Metadata = {
  title: 'In The Press | Mount Vernon Lofts — Montrose Condos',
  description:
    'Read press coverage and media mentions of Mount Vernon Lofts, modern condos in Houston\'s Montrose neighborhood starting in the $215Ks.',
  keywords:
    'mount vernon lofts press, montrose condos news, houston condos media, mount vernon lofts articles, montrose real estate news',
  openGraph: {
    title: 'In The Press | Mount Vernon Lofts',
    description:
      'Press coverage of modern condos in Houston\'s Montrose neighborhood.',
    images: [
      {
        url: '/images/gallery/exteriors/exterior-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Mount Vernon Lofts in Montrose, Houston',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtvernonlofts.com'}/press`,
  },
}

export default function PressPage() {
  return (
    <main>
      <PressSchema />
      <DataLayerEvent
        event="view_content"
        data={{ content_type: 'press', content_name: 'In The Press' }}
      />
      <PressHeroSection />
      <PressArticleList />
    </main>
  )
}
