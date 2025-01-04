import { cn } from "utils/cn";

const CheckBoxNumberIndicator = ({
  children,
  number,
  className,
  indicatorClassName,
}: any) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}

      {number ? (
        <div
          className={cn(
            "w-6 h-6 rounded bg-woodsmoke-200 dark:bg-woodsmoke-700 flex items-center justify-center text-xs",
            indicatorClassName
          )}
        >
          {number}
        </div>
      ) : null}
    </div>
  );
};

export default CheckBoxNumberIndicator;
