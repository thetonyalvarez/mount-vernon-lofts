/**
 * Bare layout for open house form pages.
 * No navigation, footer, or banner — optimized for speed at the door (QR code scan).
 */
export default function OpenHouseFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-mvl-cream">
      {children}
    </div>
  )
}
