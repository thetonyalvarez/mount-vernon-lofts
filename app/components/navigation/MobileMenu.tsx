"use client"

import { X } from "lucide-react"
import Image from "@/components/ui/image"
import { useEffect, useState } from "react"
import type { MobileMenuProps } from "../../types"
import { mainNavLinks, socialLinks, contactInfo } from "@/app/config/navigation"
import { useContactModal } from "@/lib/contact-modal-context"

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const { openModal } = useContactModal()

  // Handle menu opening/closing animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay to allow DOM to render before animation
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      setTimeout(() => setShouldRender(false), 400)
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!shouldRender) return null

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/inquire') {
      e.preventDefault()
      openModal()
      onClose()
    } else {
      onClose()
    }
  }

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-50 flex transition-opacity duration-400 ease-out ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Left Panel - Image */}
      <div
        className={`hidden sm:block sm:w-2/5 relative overflow-hidden transition-transform duration-500 ease-out ${
          isAnimating ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Image
          src="/images/unit-9_1-bed/9-3.jpg"
          alt="Modern condo kitchen at Mount Vernon Lofts"
          fill
          className="object-cover"
          sizes="40vw"
          priority
        />
      </div>

      {/* Right Panel - Menu */}
      <div
        className={`w-full sm:w-3/5 bg-mvl-beige relative flex flex-col transition-transform duration-500 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-sm z-10 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
          style={{ transitionDelay: isAnimating ? '0.3s' : '0s' }}
        >
          <X size={20} className="text-mvl-espresso" />
        </button>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-8 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20 custom-scrollbar">
          {/* Menu Items */}
          <nav className="space-y-8 md:space-y-12 mb-16">
            {mainNavLinks.map((link, index) => (
              <div
                key={link.label}
                className={`transition-all duration-500 ease-out ${
                  isAnimating
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isAnimating ? `${0.4 + (index * 0.1)}s` : '0s'
                }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-mvl-espresso hover:opacity-70 transition-opacity leading-tight tracking-wide"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label.toUpperCase()}
                </a>
                {index < mainNavLinks.length - 1 && (
                  <div className="w-full h-px bg-mvl-espresso/20 mt-8 md:mt-12" />
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & Social Media */}
          <div
            id="mobile-menu-bottom"
            className={`text-mvl-espresso/70 text-sm space-y-4 pt-8 border-t border-mvl-espresso/20 transition-all duration-500 ease-out ${
              isAnimating
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isAnimating ? `${0.4 + (mainNavLinks.length * 0.1) + 0.2}s` : '0s'
            }}
          >
            {/* Contact Information */}
            <div className="space-y-1">
              <p className="font-medium text-mvl-espresso">Mount Vernon Lofts</p>
              <p>{contactInfo.address.line1}</p>
              <p>{contactInfo.address.line2}</p>
              <p className="mt-2">{contactInfo.email}</p>
              <p>{contactInfo.phone}</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href={socialLinks.instagram}
                className="text-mvl-espresso/60 hover:text-mvl-espresso transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a
                href={socialLinks.facebook}
                className="text-mvl-espresso/60 hover:text-mvl-espresso transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7v4h3v7h4v-7h3l1-4h-4V7a1.5 1.5 0 0 1 1.5-1.5H17v-3Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}