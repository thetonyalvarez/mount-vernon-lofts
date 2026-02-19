import { Variants } from "framer-motion"

// Animation Variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for elegant easing
    },
  },
}

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Stagger container variant
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Stagger item variant
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Text reveal variants
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Parallax variants
export const parallaxY = (offset: number = 50): Variants => ({
  hidden: {
    y: -offset,
  },
  visible: {
    y: offset,
    transition: {
      duration: 0.8,
      ease: "linear",
    },
  },
})

// Viewport settings for scroll triggers
export const viewportSettings = {
  once: true, // Animation happens only once
  amount: 0.2, // Trigger when 20% of element is in view
  margin: "0px 0px -100px 0px", // Trigger slightly before element comes into view
}

// Reduced motion variants
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
}

// Animation delays
export const getDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay
}

// Custom transitions
export const elegantTransition = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96], // Elegant ease curve
}

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
}

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
}

export const hoverOpacity = {
  opacity: 0.8,
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
}