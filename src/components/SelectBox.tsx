/* eslint-disable jsx-a11y/label-has-associated-control */
import { DetailedHTMLProps, SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "utils/cn";
import { VariantProps } from "class-variance-authority";
import { InputVariants } from "./Input";
import Typography from "./Typography";

interface Props
  extends DetailedHTMLProps<
      SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    VariantProps<typeof InputVariants> {
  label?: string | any;
  showErrorText?: boolean;
  error?: any;
}

const SelectBox = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const {
    className,
    variant,
    label,
    error,
    showErrorText = true,
    ...inputProps
  } = props;

  return (
    <label>
      {label ? <Typography className="mb-1">{label}</Typography> : null}

      <select
        ref={ref}
        {...inputProps}
        style={{
          backgroundPosition: "calc(100% - 1.4rem) 50%",
          backgroundSize: ".7rem",
        }}
        className={cn(
          InputVariants({ variant, className, error: Boolean(error) }),
          "bg-[url('/images/down-icon.svg')] bg-no-repeat"
        )}
      />

      {error && showErrorText ? (
        <span className="mt-2 flex text-red-500 w-fit pointer-events-none select-none text-sm">
          {error}
        </span>
      ) : null}
    </label>
  );
});

SelectBox.displayName = "SelectBox";

export default SelectBox;
