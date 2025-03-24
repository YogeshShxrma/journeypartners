
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Merge the variants from both badge implementations
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        primary: "bg-primary/10 text-primary border-primary/20",
        success: "bg-success/10 text-success border-success/20",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        danger: "bg-destructive/10 text-destructive border-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        badgeVariants({ variant }), 
        "animate-fade-in",
        className
      )} 
      {...props} 
    />
  )
}

export { Badge, badgeVariants }
