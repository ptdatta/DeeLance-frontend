import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { cn } from "utils/cn";

const variants = cva("bg-white dark:bg-woodsmoke-900 shadow-md", {
  variants: {
    size: {
      1: "py-1 px-2",
      2: "py-2 px-3",
      3: "py-3 px-4",
      4: "py-4 px-5",
      5: "py-5 px-6",
      6: "py-6 px-7",
      7: "py-7 px-8",
      8: "py-8 px-9",
      9: "py-7 lg:py-9 px-8 lg:px-10",
      10: "py-10 px-11",
    },
    roundness: {
      sm: "rounded-sm",
      base: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    },
  },
  defaultVariants: {
    size: 6,
    roundness: "lg",
  },
});

interface Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {
  as?: any;
}

function Paper({
  size,
  className,
  children,
  roundness,
  as = "div",
  ...props
}: Props) {
  const Comp = as;

  return (
    <Comp {...props} className={cn(variants({ size, className, roundness }))}>
      {children}
    </Comp>
  );
}

export default Paper;
