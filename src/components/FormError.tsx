import { ReactNode } from "react";
import { cn } from "utils/cn";

function FormError({
  children,
  className,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) {
  return children ? (
    <span
      className={cn(
        "mt-2 flex text-red-500 w-fit pointer-events-none select-none text-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  ) : null;
}

export default FormError;
