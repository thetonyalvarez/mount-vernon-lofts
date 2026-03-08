import Image from '@/components/ui/image'

export function WhyMvlIntroSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-4">
              Smart Buyers Are Choosing MVL
            </h2>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              Mount Vernon Lofts gives first-time buyers something rare in Houston: a modern building in a walkable neighborhood at an attainable price. While Montrose home prices push past $700K, MVL offers a real path to ownership starting in the $215Ks.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed">
              Built in 2018 with concrete foundation and modern building systems, these are not renovated apartments or aging conversions. This is a 42-unit, owner-focused community with predictable costs, conventional financing, and the Montrose lifestyle right outside your door.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/images/unit-9_1-bed/9-3.jpg"
              alt="Modern kitchen with granite countertops at Mount Vernon Lofts"
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
