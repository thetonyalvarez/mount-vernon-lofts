import { teamIntroContent } from '@/app/config/team-data'
import { ScrollReveal, SplitText } from '@/components/animations'

export function TeamIntroSection() {
  return (
    <section className="pt-32 pb-20 bg-mvl-beige">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-6">
              <SplitText letterDelay={0.2}>
                {teamIntroContent.title}
              </SplitText>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <h2 className="text-xl md:text-2xl text-mvl-coral mb-8">
              {teamIntroContent.subtitle}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
              {teamIntroContent.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
