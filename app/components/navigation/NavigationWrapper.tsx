"use client"

import { useState } from "react"
import Navigation from "./Navigation"
import { MobileMenu } from "./MobileMenu"

interface NavigationWrapperProps {
  readonly bannerVisible?: boolean;
}

export function NavigationWrapper({ bannerVisible = false }: NavigationWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} bannerVisible={bannerVisible} />
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  )
}
