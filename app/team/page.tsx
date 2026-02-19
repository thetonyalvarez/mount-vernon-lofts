import { Metadata } from 'next'
import { HeroSection } from '@/app/components/HeroSection'
import { TeamIntroSection, TeamMembersSection } from './sections'

export const metadata: Metadata = {
  title: 'Team | Mount Vernon Lofts — Montrose Condos',
  description: 'Meet the team behind Mount Vernon Lofts in Montrose, Houston. Developers and real estate professionals helping first-time buyers find their home.',
  keywords: 'mount vernon lofts team, houston condo developers, montrose real estate team, blake capital group',
  openGraph: {
    title: 'Team | Mount Vernon Lofts',
    description: 'Meet the team helping first-time buyers find their home in Montrose.',
    images: [{
      url: '/images/gallery/amenities/lobby-close-up.jpg',
      width: 1200,
      height: 630,
      alt: 'Mount Vernon Lofts team'
    }]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com'}/team`
  }
}

export default function TeamPage() {
  return (
    <main>
      <HeroSection
        title="EXCEPTIONAL PARTNERS"
        subtitle="The Team"
        fallbackImage="/images/gallery/amenities/lobby-close-up.jpg"
        showScrollIndicator={true}
        height="screen"
        textAlignment="center"
        overlayPosition="none"
        textColor="white"
      />
      <TeamIntroSection />
      <TeamMembersSection />
    </main>
  )
}