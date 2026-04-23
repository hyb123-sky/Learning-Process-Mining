import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-pf-navy text-pf-ivory hover:bg-pf-navy-mid",
        gold: "bg-gradient-to-br from-pf-gold-light to-pf-gold text-pf-navy hover:brightness-105",
        outline: "border border-pf-navy/60 bg-transparent text-pf-navy hover:bg-pf-navy/5",
        ghost: "text-pf-navy hover:bg-pf-navy/5",
        subtle: "bg-pf-ivory-warm text-pf-navy hover:bg-pf-parchment",
        destructive: "bg-pf-error text-white hover:brightness-110",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export { buttonVariants };
