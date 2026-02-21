"use client"

import { useState } from "react"
import Navigation from "./Navigation"
import { MobileMenu } from "./MobileMenu"

interface NavigationWrapperProps {
  readonly bannerVisible?: boolean;
  readonly bannerInView?: boolean;
}

export function NavigationWrapper({ bannerVisible = false, bannerInView = false }: NavigationWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} bannerVisible={bannerVisible} bannerInView={bannerInView} />
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  )
}
