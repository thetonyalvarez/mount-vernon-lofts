"use client"

import Image from '@/components/ui/image'
import { ExternalLink } from 'lucide-react'
import { pressArticles } from '@/app/config/press-data'
import { StaggerContainer, StaggerItem } from '@/components/animations'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

export function PressArticleList() {
  const sorted = [...pressArticles].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )

  if (sorted.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-mvl-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <p className="text-mvl-espresso/60 text-lg">
            Press coverage coming soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-16 md:pb-24 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((article) => (
            <StaggerItem key={article.id}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-mvl-warm-white rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.thumbnailSrc}
                    alt={article.thumbnailAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-mvl-coral text-sm font-medium mb-1">
                    {article.publication}
                  </p>
                  <h2 className="font-montserrat text-lg text-mvl-espresso mb-2 group-hover:text-mvl-coral transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-mvl-espresso/50 text-sm mb-3">
                    {article.author !== null && (
                      <span>By {article.author} &middot; </span>
                    )}
                    {formatDate(article.publishedDate)}
                  </p>
                  <p className="text-mvl-espresso/70 text-sm line-clamp-3 mb-4">
                    {article.description}
                  </p>
                  <span className="inline-flex items-center text-mvl-coral text-sm font-medium group-hover:underline">
                    Read article
                    <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
