"use client"

import { useState } from "react"
import Navigation from "./Navigation"
import { MobileMenu } from "./MobileMenu"

export function NavigationWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  )
}