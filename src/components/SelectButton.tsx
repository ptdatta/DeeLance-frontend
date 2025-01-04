import { FaChevronDown } from "react-icons/fa";
import Typography from "./Typography";
import { forwardRef } from "react";
import { cn } from "utils/cn";

const SelectButton = forwardRef(
  ({ title, HRef, isActive, ...props }: any, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center bg-woodsmoke-200 dark:bg-woodsmoke-900 rounded-full py-1.5 px-3 border-2 border-transparent",
          isActive ? "border-green-haze-500" : ""
        )}
        {...props}
      >
        <Typography asChild variant="sm">
          <a href={HRef}>{title}</a>
        </Typography>
        <FaChevronDown className="text-[.6em] ms-2" />
      </button>
    );
  }
);

SelectButton.displayName = "SelectButton";

export default SelectButton;
