"use client"

import Image from "@/components/ui/image"
import {
  footerNavLinks,
  footerBottomLinks,
  socialLinks,
  contactInfo,
  copyrightText
} from "@/app/config/navigation"
import { footerGridItems } from "@/app/config/footer-grid"
import { getImageUrl } from "@/lib/get-image-url"
import { useContactModal } from "@/lib/contact-modal-context"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { fadeInUp } from "@/lib/animations"

export function Footer() {
  const { openModal } = useContactModal()
  return (
    <>
      {/* 3-Column Grid Section */}
      <section id="footer-grid" className="bg-mvl-beige">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3">
          {footerGridItems.map((item, index) => (
            <StaggerItem
              key={item.id}
              className={`relative group overflow-hidden ${item.hasBorder ? 'border-l border-mvl-espresso/10' : ''}`}
            >
              <div className={`relative h-[280px] sm:h-[320px] md:h-[400px] ${
                item.backgroundColor === 'beige-light' ? 'bg-mvl-warm-white' : 'bg-mvl-beige'
              } p-8 sm:p-10 md:p-12 flex flex-col justify-between`}>
                <div>
                  <h3 className="font-montserrat text-2xl sm:text-3xl md:text-4xl text-mvl-espresso mb-3 md:mb-4 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-mvl-espresso/70 text-sm sm:text-base leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.linkHref}
                  className="inline-flex items-center text-mvl-espresso font-medium tracking-widest uppercase text-xs sm:text-sm hover:opacity-70 transition-opacity"
                >
                  {item.linkText}
                  <svg className="ml-4 sm:ml-6 md:ml-8 w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <footer id="footer-bottom" className="w-full relative bg-mvl-espresso-dark text-white overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6">
        {/* Background pattern */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${getImageUrl('/images/design/tile.png')})`,
            backgroundRepeat: 'repeat',
            opacity: 0.25,
          }}
          aria-hidden="true"
        />
        <div className="w-full max-w-[1920px] mx-auto md:px-8 lg:px-12 relative z-10 flex flex-col min-h-[400px] sm:min-h-[500px] md:min-h-[600px] justify-between">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 sm:gap-10 md:gap-0">
            {/* Left: Navigation */}
            <ScrollReveal>
              <nav className="flex-1">
                <StaggerContainer>
                  <ul className="space-y-3 md:space-y-4">
                    {footerNavLinks.map((link) => (
                      <StaggerItem key={link.label}>
                        <li id={`footer-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                          <a
                            id={`footer-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}-link`}
                            href={link.href}
                            onClick={(e) => {
                              if (link.href === '/inquire') {
                                e.preventDefault()
                                openModal('footer_nav_link', 'contact_modal_footer_nav')
                              }
                            }}
                            className="font-montserrat text-xl sm:text-2xl md:text-3xl tracking-widest uppercase hover:opacity-80 transition-opacity block"
                            style={{ letterSpacing: "0.08em" }}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                          >
                            {link.label}
                          </a>
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              </nav>
            </ScrollReveal>

            {/* Right: Contact & Inquire */}
            <ScrollReveal delay={0.2}>
              <div className="flex-1 flex flex-col items-start md:items-end gap-4 sm:gap-6 md:gap-8">
                <div className="text-left md:text-right space-y-2">
                <div className="text-sm sm:text-base tracking-widest font-light">
                  {contactInfo.address.line1}<br />
                  {contactInfo.address.line2}
                </div>
                <div id="footer-contact-info" className="text-sm sm:text-base tracking-widest font-light">
                  <a href={`mailto:${contactInfo.email.toLowerCase()}`} className="hover:opacity-80 transition-opacity">{contactInfo.email}</a><br />
                  <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:opacity-80 transition-opacity">{contactInfo.phone}</a>
                </div>
                <div className="text-xs text-gray-300 mt-2">{contactInfo.note}</div>
              </div>
              <button
                id="footer-contact-button"
                onClick={() => openModal('footer_inquire_button', 'contact_modal_footer')}
                className="border border-white rounded-full px-6 sm:px-8 py-2 text-base sm:text-lg font-montserrat tracking-widest uppercase hover:bg-white hover:text-mvl-espresso-dark transition-colors"
              >
                INQUIRE
              </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom bar */}
          <div className="relative mt-12 sm:mt-16 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">

            {/* Legal disclaimer */}
            {/* <div className="flex-1 text-center text-xs text-gray-300 leading-relaxed md:px-8">
              {legalDisclaimer}
            </div> */}

            {/* Footer links & social */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm items-center">
                {footerBottomLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-white"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
                <a href={socialLinks.instagram} className="hover:text-white" aria-label="Instagram">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                </a>
                <a href={socialLinks.facebook} className="hover:text-white" aria-label="Facebook">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7v4h3v7h4v-7h3l1-4h-4V7a1.5 1.5 0 0 1 1.5-1.5H17v-3Z" stroke="currentColor" strokeWidth="2"/></svg>
                </a>
              </div>
              <div className="text-xs text-gray-400 mt-1">{copyrightText}</div>
            </div>
          </div>

          {/* Logo at the very bottom center */}
          <ScrollReveal delay={0.5}>
            <div className="w-full flex justify-center mt-8 sm:mt-10 md:mt-12">
              <Image
                src="/logos/logo_v_white.svg"
                alt="Mount Vernon Lofts Logo"
                width={137}
                height={60}
                style={{ width: 'auto', height: '60px' }}
                className="opacity-80"
              />
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </>
  )
}