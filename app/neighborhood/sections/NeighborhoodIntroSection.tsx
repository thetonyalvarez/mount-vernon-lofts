import Image from "@/components/ui/image"

export function NeighborhoodIntroSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-mvl-espresso mb-8 leading-tight">
              Welcome to Montrose
            </h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                Montrose is one of Houston&apos;s most walkable and culturally rich neighborhoods -- a place where local coffee shops, art galleries, and neighborhood restaurants line tree-shaded streets.
              </p>
              <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed">
                From morning walks to Menil Collection to dinner at your favorite neighborhood spot, life at Mount Vernon Lofts puts you in the center of everything that makes inner loop living worth it.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/images/neighborhood/bridge.jpg"
              alt="Montrose neighborhood near Mount Vernon Lofts"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
