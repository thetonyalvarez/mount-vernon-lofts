"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import Image from "@/components/ui/image"

interface ParallaxImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  containerClassName?: string
  offset?: number
  sizes?: string
  priority?: boolean
  style?: React.CSSProperties
}

export function ParallaxImage({
  offset = 50,
  className = "",
  containerClassName = "",
  ...imageProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  // Create parallax effect
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-offset, offset]
  )
  
  // Scale effect for extra depth
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [1.1, 1.05, 1]
  )

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.div
        style={{ y, scale }}
        className={`relative h-full w-full ${className}`}
      >
        <Image {...imageProps} />
      </motion.div>
    </div>
  )
}