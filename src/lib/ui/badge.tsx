import * as React from "react"
import { cn } from "@/src/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "destructive" | "outline" | "primary" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-900/80",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "bg-red-500 text-white hover:bg-red-500/80",
    outline: "text-slate-950 border border-slate-200 hover:bg-slate-100",
    primary: "bg-primary text-white hover:bg-primary/80",
  }
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
