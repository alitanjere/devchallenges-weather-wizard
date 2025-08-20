import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "premium-button",
        destructive: "bg-red-500 text-white border-4 border-red-500 hover:bg-red-600 p-2",
        outline: "border-4 border-gray-500 bg-white text-black hover:bg-gray-200 p-2",
        secondary: "bg-gray-400 text-black border-4 border-gray-400 hover:bg-gray-500 p-2",
        ghost: "text-black hover:bg-gray-200 border-4 border-transparent p-2",
        link: "text-blue-500 underline hover:text-blue-700 p-1",
        glass: "weather-card text-black hover:text-blue-500",
        premium: "premium-button",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-2 py-1",
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
