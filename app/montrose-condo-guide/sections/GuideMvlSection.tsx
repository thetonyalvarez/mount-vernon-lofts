import Image from '@/components/ui/image'
import Link from 'next/link'

export function GuideMvlSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-4">
              How Mount Vernon Lofts Fits In
            </h2>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              Mount Vernon Lofts is a 42-unit condo building at 4509 Mount Vernon in the heart of Montrose. Built in 2018 with concrete foundation and modern building systems, it offers studios (612–705 SF) and one-bedrooms (717–799 SF) starting in the $215Ks.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              The building checks many of the boxes outlined in this guide: 2018 construction, covered parking included, in-unit washer/dryer, $300/month HOA that includes water, reserves above Fannie Mae requirements, professional management, and short-term rentals prohibited. It qualifies for conventional financing with as little as 3% down for first-time buyers.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-6">
              If you&#39;re considering condos in Montrose, Mount Vernon Lofts is worth a visit. Units are available now, and tours can be scheduled 7 days a week.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/why-mvl"
                className="inline-block bg-mvl-coral text-white font-montserrat font-semibold px-6 py-2.5 rounded hover:bg-mvl-coral-dark transition-colors duration-200"
              >
                Why Buy at MVL
              </Link>
              <Link
                href="/residences"
                className="inline-block border-2 border-mvl-espresso text-mvl-espresso font-montserrat font-semibold px-6 py-2.5 rounded hover:bg-mvl-espresso hover:text-white transition-colors duration-200"
              >
                View Residences
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/images/unit-9_1-bed/9-5.jpg"
              alt="Living space at Mount Vernon Lofts in Montrose, Houston"
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
