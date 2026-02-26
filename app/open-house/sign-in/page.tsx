import { notFound } from "next/navigation"
import { getActiveEventByType } from "@/app/config/open-house-data"
import { SignInForm } from "../SignInForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: "noindex, nofollow",
}

export default function PublicSignInPage() {
  const event = getActiveEventByType("public")

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-mvl-cream">
      <SignInForm event={event} />
    </div>
  )
}
