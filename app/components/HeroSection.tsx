import Image from "@/components/ui/image"
import { ArrowDown } from "lucide-react"
import { getImageUrl } from "@/lib/get-image-url"
import { Button } from "@/components/ui/button"

export interface HeroSectionProps {
  title: string
  subtitle: string
  videoSrc?: string
  fallbackImage: string
  overlayImage?: {
    src: string
    alt: string
  }
  showScrollIndicator?: boolean
  height?: "screen" | "large" | "medium"
  textAlignment?: "center" | "left" | "right"
  overlayPosition?: "left" | "right" | "none"
  textColor?: "white" | "dark"
  ctaText?: string
  ctaAction?: () => void
  ctaIcon?: React.ReactNode
}

export function HeroSection({
  title,
  subtitle,
  videoSrc,
  fallbackImage,
  overlayImage,
  showScrollIndicator = true,
  height = "screen",
  textAlignment = "center",
  overlayPosition = "right",
  textColor = "white",
  ctaText,
  ctaAction,
  ctaIcon
}: HeroSectionProps) {
  const heightClasses = {
    screen: "h-screen",
    large: "h-[80vh]",
    medium: "h-[60vh]"
  }

  const textAlignmentClasses = {
    center: "justify-center items-center text-center",
    left: "justify-center items-start text-left pl-8 md:pl-16",
    right: "justify-center items-end text-right pr-8 md:pr-16"
  }

  const textColorClasses = {
    white: "text-white",
    dark: "text-mvl-espresso"
  }

  const dropShadowClass = textColor === "white" ? "drop-shadow-xl" : ""

  return (
    <section className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={getImageUrl(fallbackImage)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}

        {/* Fallback background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${getImageUrl(fallbackImage)}')` }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

      {/* Additional overlay for text readability */}
      {textAlignment !== "center" && (
        <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/40 before:via-transparent before:to-transparent before:z-5" />
      )}

      {/* Main content */}
      <div className={`absolute inset-0 flex flex-col ${textAlignmentClasses[textAlignment]} z-10 px-8`}>
        <div className={`${textAlignment === "center" ? "max-w-4xl" : "max-w-2xl"}`}>
          <h1 className={`${textColorClasses[textColor]} text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-wide font-montserrat mb-6 ${dropShadowClass}`}>
            {title}
          </h1>
          <p className={`${textColorClasses[textColor]} text-lg md:text-xl lg:text-2xl font-light leading-relaxed tracking-wide font-montserrat mb-8 ${textAlignment === "center" ? "max-w-2xl mx-auto" : ""} ${textColor === "white" ? "drop-shadow-lg" : ""}`}>
            {subtitle}
          </p>
          {ctaText && ctaAction && (
            <div className={`${textAlignment === "center" ? "flex justify-center" : ""}`}>
              <Button
                onClick={ctaAction}
                size="lg"
                className="bg-mvl-coral hover:bg-mvl-coral-dark text-white px-8 py-4 text-lg font-medium tracking-wide transition-all duration-300 group shadow-2xl"
              >
                {ctaIcon && <span className="mr-2 group-hover:scale-110 transition-transform duration-200">{ctaIcon}</span>}
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20">
          <div className={`flex flex-col items-center ${textColorClasses[textColor]}`}>
            <span className={`text-sm font-light tracking-widest uppercase mb-2 ${textColor === "white" ? "drop-shadow-lg" : ""}`}>
              Scroll
            </span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      )}

      {/* Overlay image */}
      {overlayImage && overlayPosition !== "none" && (
        <div className={`absolute ${overlayPosition === "right" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-1/2 h-3/4 z-5 opacity-90`}>
          <div className="relative w-full h-full">
            <Image
              src={overlayImage.src}
              alt={overlayImage.alt}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${overlayPosition === "right" ? "bg-gradient-to-l from-transparent to-black/20" : "bg-gradient-to-r from-transparent to-black/20"}`} />
          </div>
        </div>
      )}
    </section>
  )
}