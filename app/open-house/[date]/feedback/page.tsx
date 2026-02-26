import { notFound } from "next/navigation"
import { getEventByDate } from "@/app/config/open-house-data"
import { FeedbackForm } from "./FeedbackForm"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ date: string }>
  searchParams: Promise<{ email?: string }>
}

export const metadata: Metadata = {
  robots: "noindex, nofollow",
}

export default async function FeedbackPage({ params, searchParams }: PageProps) {
  const { date } = await params
  const { email } = await searchParams
  const event = getEventByDate(date)

  if (!event) {
    notFound()
  }

  return <FeedbackForm event={event} prefillEmail={email ?? null} />
}
