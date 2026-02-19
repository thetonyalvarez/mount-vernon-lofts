import { galleryIntro } from '@/app/config/gallery-data'

export function GalleryHeroSection() {
  return (
    <section className="pt-32 pb-20 bg-mvl-beige">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-6">
            {galleryIntro.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-mvl-coral mb-8">
            {galleryIntro.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
            {galleryIntro.description}
          </p>
        </div>
      </div>
    </section>
  )
}
