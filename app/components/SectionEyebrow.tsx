"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SectionEyebrowProps = Readonly<{
  label: string
  /** Hairline animation direction.
   *  `inward` (default): hairlines scale from the outside edges in toward the label.
   *  `outward`: hairlines scale from the label outward to the edges.
   */
  direction?: "inward" | "outward"
  className?: string
}>

export function SectionEyebrow({ label, direction = "inward", className }: SectionEyebrowProps) {
  const leftOrigin = direction === "inward" ? "right" : "left"
  const rightOrigin = direction === "inward" ? "left" : "right"

  return (
    <div className={cn("flex items-center space-x-6 mb-2", className)}>
      <motion.div
        className="flex-1 h-px bg-mvl-coral max-w-12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: leftOrigin }}
      />
      <span className="text-sm font-medium uppercase tracking-widest text-mvl-coral">
        {label}
      </span>
      <motion.div
        className="flex-1 h-px bg-mvl-coral max-w-12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: rightOrigin }}
      />
    </div>
  )
}
