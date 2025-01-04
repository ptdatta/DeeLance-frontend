import { cva, VariantProps } from "class-variance-authority";
import { cn } from "utils/cn";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import FormLabel from "./FormLabel";
import FormError from "./FormError";

export const InputVariants = cva(
  "h-11 w-full dark:bg-woodsmoke-900 rounded-md px-5 border",
  {
    variants: {
      variant: {
        outlined: "border-black/40 bg-transparent",
        contained:
          "bg-woodsmoke-200 dark:bg-woodsmoke-900 border-transparent disabled:opacity-60",
      },
      error: {
        true: "border-red-500 focus:outline-red-700",
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  }
);

export interface InputProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof InputVariants> {
  label?: string;
  startIcon?: any;
  endIcon?: any;
  showErrorText?: boolean;
  error?: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    variant,
    label,
    startIcon,
    endIcon,
    error,
    showErrorText = true,
    ...inputProps
  } = props;

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="w-full block">
      {label ? <FormLabel>{label}</FormLabel> : null}
      <div className="relative">
        {startIcon
          ? startIcon(
              "absolute top-1/2 -translate-y-1/2 left-4 z-10 pointer-events-none select-none"
            )
          : null}

        <input
          {...inputProps}
          ref={ref}
          className={cn(
            InputVariants({ variant, className, error: Boolean(error) })
          )}
        />

        {endIcon
          ? endIcon(
              "absolute top-1/2 -translate-y-1/2 right-4 z-10 pointer-events-none select-none"
            )
          : null}
      </div>

      {error && showErrorText ? <FormError>{error}</FormError> : null}
    </label>
  );
});

Input.displayName = "Input";

export default Input;
