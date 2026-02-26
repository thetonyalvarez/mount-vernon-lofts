import { notFound } from "next/navigation"
import { getActiveEventByType } from "@/app/config/open-house-data"
import { FeedbackForm } from "../FeedbackForm"
import type { Metadata } from "next"

interface PageProps {
  searchParams: Promise<{ email?: string }>
}

export const metadata: Metadata = {
  robots: "noindex, nofollow",
}

export default async function PublicFeedbackPage({ searchParams }: PageProps) {
  const { email } = await searchParams
  const event = getActiveEventByType("public")

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-mvl-cream">
      <FeedbackForm event={event} prefillEmail={email ?? null} />
    </div>
  )
}
