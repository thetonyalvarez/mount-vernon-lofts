import { ArrowDown } from "lucide-react"
import { getImageUrl } from "@/lib/get-image-url"
import { SplitText } from "@/components/animations"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Emergency fix: Use CSS background for ALL devices to eliminate layout thrashing */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getImageUrl('images/unit-8_1-bed/8-5.jpg')})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* Main content: logo and headline */}
      <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-8 pb-24 sm:pb-32 md:pb-40 z-10">
        <div className="relative max-w-4xl w-full overflow-hidden">
          <motion.h1
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight tracking-wide font-montserrat mb-4 text-left drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ lineHeight: "0.8" }}
          >
            {/* Use simpler animation on mobile, complex on desktop */}
            <span className="block md:hidden">
              Montrose Living
              <br />
              Within Reach
            </span>
            <span className="hidden md:block">
              <SplitText letterDelay={0.04}>Montrose Living</SplitText>
              <br />
              <SplitText letterDelay={0.04}>Within Reach</SplitText>
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Down arrow centered at bottom - reduced animation complexity on mobile */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="animate-bounce">
          <ArrowDown className="w-8 h-8 text-white" />
        </div>
      </motion.div>
    </section>
  )
}