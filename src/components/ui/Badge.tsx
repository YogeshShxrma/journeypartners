
import { cn } from "@/lib/utils";
import React from "react";

type BadgeVariant = "primary" | "secondary" | "outline" | "success" | "warning" | "danger";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary text-secondary-foreground border-secondary/40",
  outline: "bg-transparent border-border text-foreground/80",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
};

const Badge = ({ variant = "primary", className, children, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        "transition-all duration-200 animate-fade-in",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Badge.displayName = "Badge";

export { Badge };
