"use client"

import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, reducedMotionVariants, viewportSettings } from "@/lib/animations"
import type { Variants } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  variant?: Variants
  viewport?: typeof viewportSettings
  once?: boolean
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration,
  variant = fadeInUp,
  viewport = viewportSettings,
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  
  const animationVariant = shouldReduceMotion ? reducedMotionVariants : variant
  
  const customVariant = duration ? {
    ...animationVariant,
    visible: {
      ...animationVariant.visible,
      transition: {
        ...(typeof animationVariant.visible === 'object' && 'transition' in animationVariant.visible ? animationVariant.visible.transition : {}),
        duration,
        delay,
      },
    },
  } : delay ? {
    ...animationVariant,
    visible: {
      ...animationVariant.visible,
      transition: {
        ...(typeof animationVariant.visible === 'object' && 'transition' in animationVariant.visible ? animationVariant.visible.transition : {}),
        delay,
      },
    },
  } : animationVariant

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, once }}
      variants={customVariant}
    >
      {children}
    </motion.div>
  )
}