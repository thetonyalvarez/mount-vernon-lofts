import Link from "next/link"
import { cn } from "@/lib/utils"

type ArrowCTAProps = Readonly<{
  href: string
  children: React.ReactNode
  className?: string
  id?: string
}>

export function ArrowCTA({ href, children, className, id }: ArrowCTAProps) {
  return (
    <Link id={id} href={href} className={cn("flex items-center space-x-6 pt-6 group", className)}>
      <span className="text-mvl-espresso font-medium uppercase tracking-wider text-sm">
        {children}
      </span>
      <div className="flex-1 h-px bg-mvl-espresso max-w-20" />
      <div className="w-8 h-8 rounded-full border border-mvl-espresso flex items-center justify-center group-hover:bg-mvl-espresso group-hover:text-white transition-colors">
        <svg className="w-4 h-4 text-mvl-espresso group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
