import { redirect } from "next/navigation"

// Open House page is currently inactive.
// Redirect to homepage — re-enable by restoring the original page component.
export default function OpenHousePage() {
  redirect("/")
}
