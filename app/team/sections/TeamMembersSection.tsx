import { teamMembers } from '@/app/config/team-data'
import { ExternalLink } from 'lucide-react'
import Image from '@/components/ui/image'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations'
import { slideInLeft, slideInRight } from '@/lib/animations'

export function TeamMembersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <StaggerContainer className="grid gap-12 lg:gap-16">
          {teamMembers.map((member, index) => (
            <StaggerItem key={member.id} index={index}>
              <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-start ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <ScrollReveal variant={index % 2 === 0 ? slideInLeft : slideInRight}>
                  <div className={`space-y-6 order-2 md:order-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-widest text-mvl-coral mb-2">
                    {member.role}
                  </h3>
                  <h2 className="font-montserrat text-3xl md:text-4xl text-mvl-espresso mb-4">
                    {member.company}
                  </h2>
                  <p className="text-lg text-mvl-espresso/80 leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Highlights */}
                {member.highlights && (
                  <ul className="space-y-3">
                    {member.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-mvl-coral mr-3 text-lg mt-0.5">•</span>
                        <span className="text-mvl-espresso/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Leadership */}
                {member.leadership && member.leadership.length > 0 && (
                  <div className="pt-4">
                    <h4 className="text-sm font-medium uppercase tracking-wider text-mvl-coral mb-3">
                      Leadership
                    </h4>
                    <div className="space-y-2">
                      {member.leadership.map((leader, i) => (
                        <div key={i}>
                          <p className="text-mvl-espresso font-medium">{leader.name}</p>
                          <p className="text-sm text-mvl-espresso/60">{leader.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact & Website */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-mvl-coral hover:text-mvl-coral-dark transition-colors"
                    >
                      <span className="text-sm font-medium uppercase tracking-wider">Visit Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {member.contact?.phone && (
                    <a
                      href={`tel:${member.contact.phone}`}
                      className="text-sm text-mvl-espresso/80 hover:text-mvl-espresso transition-colors"
                    >
                      {member.contact.phone}
                    </a>
                  )}
                </div>
                  </div>
                </ScrollReveal>

                {/* Logo Image */}
                <ScrollReveal variant={index % 2 === 0 ? slideInRight : slideInLeft} delay={0.2}>
                  <div className={`bg-mvl-warm-white h-64 md:h-96 rounded-none flex items-center justify-center p-8 md:p-12 order-1 md:order-2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                {member.logo ? (
                  <div className="relative w-full h-full max-w-sm mx-auto">
                    <Image
                      src={member.logo}
                      alt={`${member.company} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <h3 className="font-montserrat text-2xl text-mvl-coral/30 mb-2">
                      {member.company}
                    </h3>
                    <p className="text-sm text-mvl-espresso/40">
                      {member.role}
                    </p>
                  </div>
                  )}
                  </div>
                </ScrollReveal>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
