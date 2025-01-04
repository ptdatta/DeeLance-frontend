import { VariantProps } from "class-variance-authority";
import { cn } from "utils/cn";
import Typography from "./Typography";
import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef } from "react";
import FormError from "./FormError";
import { InputVariants } from "./Input";
import { twMerge } from "tailwind-merge";

// const InputVariants = cva(
//   "h-24 w-full bg-woodsmoke-200 dark:bg-woodsmoke-900 rounded-md px-5 py-3 border-2 block",
//   {
//     variants: {
//       variant: {
//         outlined: "border-woodsmoke-900 bg-transparent",
//         contained: "bg-woodsmoke-200 dark:bg-woodsmoke-900 border-transparent",
//       },
//       error: {
//         true: "border-red-500 focus:outline-red-700",
//       },
//     },
//     defaultVariants: {
//       variant: "contained",
//     },
//   }
// );

interface TextareaProps
  extends DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    VariantProps<typeof InputVariants> {
  label?: string;
  characterCount?: any;
  error?: any;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, variant, label, error, ...inputProps } = props;

    return (
      <label className="w-full block">
        {label ? <Typography className="mb-1">{label}</Typography> : null}

        <textarea
          {...inputProps}
          ref={ref}
          className={cn(
            InputVariants({
              variant,
              className: twMerge("py-3 h-24", className),
              error: Boolean(error),
            })
          )}
        />

        {error ? <FormError>{error}</FormError> : null}

        {/* {error || characterCount ? (
          <div className="flex items-start space-x-4 justify-between mt-2">
            {error ? (
              <span className="flex text-red-500 w-fit pointer-events-none select-none text-sm">
                {error}
              </span>
            ) : null}

            {characterCount ? (
              <span className="flex w-fit ml-auto text-sm">
                {characterCount}
              </span>
            ) : null}
          </div>
        ) : null} */}
      </label>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
