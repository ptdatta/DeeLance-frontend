import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "utils/cn";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "flex items-center justify-center disabled:opacity-60 transition-all duration-200 h-[2.6em] px-[1em] disabled:pointer-events-none",
  {
    variants: {
      variant: {
        outlined:
          "border-2 border-green-haze-600 hover:bg-green-haze-600 hover:text-white text-green-haze-600",
        contained: "bg-green-haze-600 hover:bg-green-haze-700 text-white",
        "contained-2":
          "bg-green-haze-200 hover:bg-green-haze-400 text-green-haze-600 font-medium",
        simple: "text-black dark:text-white",
        dark: "bg-woodsmoke-900 border-2 border-transparent text-white/80 hover:bg-transparent hover:border-woodsmoke-900",

        "warning-contained": "bg-warning-600 hover:bg-warning-700 text-white",
        "warning-outlined":
          "border-2 border-warning-600 hover:bg-warning-900 hover:text-white text-warning-600",

        "error-contained": "bg-red-600 hover:bg-red-700 text-white",
        "error-outlined":
          "border-2 border-red-600 hover:bg-red-600 hover:text-white text-red-600",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
      shape: {
        button: "",
        icon: "w-[2.1em] h-[2.1em] p-0",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "contained",
      rounded: "default",
      size: "default",
      shape: "button",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: any;
  endIcon?: any;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      asChild,
      className,
      variant,
      rounded,
      size,
      type = "button",
      shape,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        type={type}
        className={cn(
          buttonVariants({ className, variant, rounded, size, shape })
        )}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
