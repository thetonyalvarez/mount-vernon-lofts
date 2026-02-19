"use client"

import { motion, useReducedMotion } from "framer-motion"
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations"
import type { ReactNode } from "react"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  childDelay?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  childDelay = 0.2,
  once = true,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  
  const containerVariant = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  } : {
    hidden: staggerContainer.hidden,
    visible: {
      ...staggerContainer.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportSettings, once }}
      variants={containerVariant}
      style={{ overflow: "hidden", width: "100%" }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  index?: number
}

export function StaggerItem({
  children,
  className = "",
  index = 0,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()
  
  const itemVariant = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  } : staggerItem

  return (
    <motion.div
      className={className}
      variants={itemVariant}
      custom={index}
      style={{ overflow: "hidden", willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  )
}