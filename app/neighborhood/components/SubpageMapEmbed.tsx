interface SubpageMapEmbedProps {
  readonly title: string
  readonly query: string
}

export function SubpageMapEmbed({ title, query }: SubpageMapEmbedProps) {
  const mapSrc = `https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ""}&q=${encodeURIComponent(query)}&center=29.7377,-95.3932&zoom=14`

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-8 text-center uppercase tracking-wide">
          {title}
        </h2>
        <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden border border-mvl-beige">
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={title}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-mvl-warm-white text-mvl-espresso/60">
              <p className="text-center">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mvl-coral hover:text-mvl-coral-dark transition-colors"
                >
                  View on Google Maps &rarr;
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
