import { getLatestEventByType } from "@/app/config/open-house-data"
import { SignInForm } from "../SignInForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: "noindex, nofollow",
}

export default function PublicSignInPage() {
  const event = getLatestEventByType("public")

  if (!event) {
    return (
      <div className="min-h-screen bg-mvl-cream flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-montserrat text-2xl font-semibold text-mvl-espresso mb-2">
            No Public Open Houses Available
          </h1>
          <p className="text-mvl-espresso/70">
            Check back soon for upcoming open houses.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mvl-cream">
      <SignInForm event={event} />
    </div>
  )
}
