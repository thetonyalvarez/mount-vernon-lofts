import Image from "@/components/ui/image"
import { legalDisclaimer } from "@/app/config/navigation"

export function Footer() {
  return (
    <footer className="relative bg-mvl-espresso-dark text-white overflow-hidden pt-20 pb-10 px-4">
      {/* Subtle background overlay */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-mvl-espresso-dark/20"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-[600px] justify-between">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-0">
          {/* Left: Navigation */}
          <nav className="flex-1">
            <ul className="space-y-3 md:space-y-4">
              {[
                "ARCHITECTURE",
                "RESIDENCES",
                "PENTHOUSE WEST",
                "THE HOUSES",
                "SERVICES & AMENITIES",
                "LIFESTYLE",
                "FEATURED COLLECTION",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-montserrat text-2xl md:text-3xl tracking-widest uppercase hover:opacity-80 transition-opacity block"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Contact & Inquire */}
          <div className="flex-1 flex flex-col items-start md:items-end gap-6 md:gap-8">
            <div className="text-right space-y-2">
              <div className="text-sm md:text-base tracking-widest font-light">
                4509 MOUNT VERNON<br />
                HOUSTON, TX 77006
              </div>
              <div className="text-sm md:text-base tracking-widest font-light">
                INFO@MTVERNONLOFTS.COM<br />
                +1 713.000.0000
              </div>
              <div className="text-xs text-gray-300 mt-2">Tours by appointment.</div>
            </div>
            <button className="border border-white rounded-full px-8 py-2 text-lg font-montserrat tracking-widest uppercase hover:bg-white hover:text-mvl-espresso-dark transition-colors">
              INQUIRE
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0">
          {/* Language selector */}
          <div className="absolute left-0 -top-12 md:static md:top-auto md:left-auto flex items-center">
            <button className="border border-white rounded-full px-6 py-2 text-base font-montserrat tracking-widest uppercase bg-mvl-espresso-dark hover:bg-white hover:text-mvl-espresso-dark transition-colors">
              EN <span className="ml-2">▼</span>
            </button>
          </div>

          {/* Legal disclaimer */}
          <div className="flex-1 text-center text-xs text-gray-300 leading-relaxed md:px-8">
            {legalDisclaimer}
          </div>

          {/* Footer links & social */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white">PRESS</a>
              <a href="#" className="hover:text-white">PRIVACY & LEGAL</a>
              <a href="#" className="hover:text-white" aria-label="Instagram">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="#" className="hover:text-white" aria-label="Facebook">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7v4h3v7h4v-7h3l1-4h-4V7a1.5 1.5 0 0 1 1.5-1.5H17v-3Z" stroke="currentColor" strokeWidth="2"/></svg>
              </a>
            </div>
            <div className="text-xs text-gray-400 mt-1">© Mount Vernon Lofts, All Rights Reserved</div>
          </div>
        </div>

        {/* Logo at the very bottom center */}
        <div className="w-full flex justify-center mt-12">
          <Image src="/logos/logo_v_white.svg" alt="Mount Vernon Lofts Logo" width={60} height={60} className="opacity-80" />
        </div>
      </div>
    </footer>
  )
}