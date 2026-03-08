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
              The building checks many of the boxes outlined in this guide: 2018 construction with concrete foundation, one covered parking space per unit, in-unit washer/dryer, granite countertops, and individual HVAC systems. The HOA is $300/month and includes water, with reserves above the Fannie Mae 10% requirement. Professional management by Equity keeps the building well-maintained, and short-term rentals are prohibited — creating a stable, owner-focused community.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              From a financing perspective, MVL qualifies for conventional loans with as little as 3% down for first-time buyers. The building&#39;s strong owner-occupancy ratio and healthy HOA financials make the lending process straightforward. Most buyers close in 30 to 45 days.
            </p>
            <p className="text-mvl-espresso/80 leading-relaxed mb-4">
              The building is pet-friendly, with a gated property entrance, recreational lounge, and outdoor common areas. The location puts you within walking distance of Montrose&#39;s best restaurants, coffee shops, and the Menil Collection — with a 15-minute drive to both downtown and the Medical Center.
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
