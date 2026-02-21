"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import Image from "@/components/ui/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import type { NavigationProps } from "../../types"
import { useContactModal } from "@/lib/contact-modal-context"
import { trackNavigation } from "@/app/components/analytics"

/** Routes without dark hero sections that need the dark navbar immediately */
const LIGHT_BACKGROUND_ROUTES = [
  '/floor-plans',
  '/open-house',
  '/thank-you',
  '/thank-you-floor-plans',
  '/thank-you-brochure',
]

export default function Navigation({ onMenuToggle, bannerVisible: _bannerVisible = false, bannerInView = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { openModal } = useContactModal()
  const pathname = usePathname()

  const needsDarkNav = LIGHT_BACKGROUND_ROUTES.some(route => pathname === route)
  const showDarkNav = isScrolled || needsDarkNav

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Check initial scroll position
    handleScroll()

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      id="navigation"
      className={clsx(
        "fixed left-0 right-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 z-40",
        "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        bannerInView ? "top-[44px]" : "top-0",
        showDarkNav ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      {/* Left: Menu Button */}
      <div className="flex items-center">
        <button
          onClick={() => {
            trackNavigation('header', 'Menu', 'menu_toggle')
            onMenuToggle()
          }}
          className={clsx(
            "flex items-center gap-3 hover:opacity-80 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            showDarkNav ? "text-mvl-espresso" : "text-white"
          )}
        >
          <Menu className="w-7 h-7" />
          <span className="hidden sm:inline text-lg font-medium tracking-wide uppercase">Menu</span>
        </button>
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          onClick={() => trackNavigation('header', 'Logo', '/')}
        >
          <Image
            src={showDarkNav ? "/logos/logo_h_black.svg" : "/logos/logo_h_white.svg"}
            alt="Mount Vernon Lofts"
            width={180}
            height={60}
            className="h-8 sm:h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Right: Inquire Button */}
      <div className="flex items-center">
        <Button
          variant="outline"
          onClick={() => {
            trackNavigation('header', 'Inquire Button', 'contact_modal')
            openModal('header_inquire_button', 'contact_modal_header')
          }}
          className={clsx(
            "border-2 bg-transparent px-3 sm:px-6 py-1.5 sm:py-2 rounded-none text-sm sm:text-base font-semibold uppercase tracking-wide",
            "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            showDarkNav
              ? "border-mvl-espresso text-mvl-espresso hover:bg-mvl-espresso hover:text-white"
              : "border-white text-white hover:bg-white hover:text-black"
          )}
        >
          <span className="hidden sm:inline">Inquire</span>
          <span className="sm:hidden">Info</span>
          <span className="ml-1 sm:ml-2">→</span>
        </Button>
      </div>
    </nav>
  )
}