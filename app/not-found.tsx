import Image from "@/components/ui/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getImageUrl } from "@/lib/get-image-url"

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getImageUrl('images/living-room.jpg')})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logos/logo_v_white.png"
            alt="Mount Vernon Lofts Logo"
            width={60}
            height={90}
            className="opacity-90"
          />
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="h-px bg-white/40 w-16"></div>
          <span className="text-sm font-medium uppercase tracking-widest text-white/80">
            Page Not Found
          </span>
          <div className="h-px bg-white/40 w-16"></div>
        </div>

        {/* Main heading */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-montserrat font-light leading-tight tracking-wide mb-6 drop-shadow-xl">
          Page Not Found
        </h1>

        {/* Subheading */}
        <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-12 font-light max-w-lg mx-auto">
          The page you&apos;re looking for doesn&apos;t seem to exist. Let us guide you back to explore Mount Vernon Lofts.
        </p>

        {/* Call to action */}
        <div className="space-y-4">
          <Link href="/">
            <Button
              size="lg"
              className="bg-white text-mvl-espresso hover:bg-white/90 px-8 py-4 text-base font-medium uppercase tracking-wider transition-all duration-300"
            >
              Return Home
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href="/residences"
              className="text-white/80 hover:text-white font-medium uppercase tracking-wider text-sm border-b border-white/40 hover:border-white transition-colors"
            >
              Explore Residences
            </Link>
            <Link
              href="/amenities"
              className="text-white/80 hover:text-white font-medium uppercase tracking-wider text-sm border-b border-white/40 hover:border-white transition-colors"
            >
              Explore Neighborhood
            </Link>
            <Link
              href="/neighborhood"
              className="text-white/80 hover:text-white font-medium uppercase tracking-wider text-sm border-b border-white/40 hover:border-white transition-colors"
            >
              Visit Montrose
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}