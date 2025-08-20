import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded text-sm font-bold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "premium-button text-primary-foreground border-2",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-600 border-2 border-destructive",
        outline:
          "border-2 border-glass-border bg-white text-foreground hover:bg-gray-100",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-gray-400 border-2 border-secondary",
        ghost: "text-foreground hover:bg-gray-200 border-2 border-transparent",
        link: "text-primary underline hover:text-blue-600",
        glass: "glass text-foreground hover:text-primary",
        premium: "premium-button text-primary-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
