import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  fullScreen?: boolean
}

export function LoadingSpinner({
  size = "md",
  className,
  fullScreen = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  }

  const spinner = (
    <div
      className={cn(
        "animate-spin rounded-full border-mvl-coral/20 border-t-mvl-coral",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

export function LoadingState({
  message = "Loading...",
  className
}: {
  message?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-12", className)}>
      <LoadingSpinner size="lg" />
      <p className="text-mvl-espresso/60 text-sm font-medium">{message}</p>
    </div>
  )
}