"use client"

import { motion, useReducedMotion } from "framer-motion"
import { viewportSettings } from "@/lib/animations"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"

interface SplitTextProps {
  children: string
  className?: string
  letterDelay?: number
  once?: boolean
}

export function SplitText({
  children,
  className = "",
  letterDelay = 0.03,
  once = true,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
  }, [])
  
  // Prevent hydration mismatch by waiting for mount
  if (!mounted) {
    return <span className={`inline-block ${className}`}>{children}</span>
  }
  
  // Use simple animation on mobile to reduce blocking time
  if (isMobile || shouldReduceMotion) {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ ...viewportSettings, once }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    )
  }
  
  // Split text into words and letters for desktop
  const words = children.split(" ")
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : letterDelay,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }
  
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      rotateX: shouldReduceMotion ? 0 : -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportSettings, once }}
      variants={containerVariants}
      style={{ overflow: "hidden", width: "100%" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block" style={{ overflow: "hidden" }}>
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              className="inline-block"
              style={{ 
                transformStyle: "preserve-3d",
                overflow: "hidden",
                willChange: "transform, opacity"
              }}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}