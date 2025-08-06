import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-white/20 bg-background-elevated/50 text-foreground-primary backdrop-blur-sm",
        secondary: "border-white/10 bg-white/5 text-foreground-secondary",
        destructive: "border-red-500/20 bg-red-500/10 text-red-400",
        success: "border-green-500/20 bg-green-500/10 text-green-400",
        warning: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
        info: "border-blue-500/20 bg-blue-500/10 text-blue-400",
        outline: "border-white/20 text-foreground-primary",
        gradient: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent",
        glass: "bg-white/10 backdrop-blur-sm border-white/20 text-foreground-primary",
        premium: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-transparent",
        new: "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-transparent",
        hot: "bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-xs px-2 py-0.5",
        lg: "text-sm px-3 py-1",
        xl: "text-base px-4 py-1.5",
      },
      animation: {
        none: "",
        pulse: "animate-pulse-slow",
        bounce: "animate-bounce",
        glow: "animate-pulse-slow shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Badge({ 
  className, 
  variant, 
  size, 
  animation, 
  leftIcon, 
  rightIcon, 
  children, 
  ...props 
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, animation, className }))} {...props}>
      {leftIcon && (
        <span className="mr-1">{leftIcon}</span>
      )}
      {children}
      {rightIcon && (
        <span className="ml-1">{rightIcon}</span>
      )}
    </div>
  )
}

export { Badge, badgeVariants }