import { cn } from "@/components/ui/button"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-strong", className)}
      {...props}
    />
  )
}

export { Skeleton }
