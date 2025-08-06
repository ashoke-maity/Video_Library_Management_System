import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, success, ...props }, ref) => {
    return (
      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted group-focus-within:text-foreground-primary transition-colors duration-200">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-xl border border-white/10 bg-background-elevated/50 backdrop-blur-sm px-3 py-2 text-sm text-foreground-primary placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50",
            success && "border-green-500/50 focus:ring-green-500/20 focus:border-green-500/50",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted group-focus-within:text-foreground-primary transition-colors duration-200">
            {rightIcon}
          </div>
        )}
        
        {/* Focus glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 rounded-xl blur-xl opacity-0 group-focus-within:opacity-20 transition-opacity duration-200 pointer-events-none"></div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }