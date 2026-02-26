import { notFound } from "next/navigation"
import { getEventByDate } from "@/app/config/open-house-data"
import { SignInForm } from "./SignInForm"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ date: string }>
}

export const metadata: Metadata = {
  robots: "noindex, nofollow",
}

export default async function SignInPage({ params }: PageProps) {
  const { date } = await params
  const event = getEventByDate(date)

  if (!event) {
    notFound()
  }

  return <SignInForm event={event} />
}
