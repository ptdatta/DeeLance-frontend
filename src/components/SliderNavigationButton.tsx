/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const SliderNavigationButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type={type}
        className={twMerge(
          "w-10 h-10 rounded-md flex items-center justify-center bg-green-haze-600 disabled:opacity-60 text-white text-lg",
          className
        )}
      >
        <FaChevronRight />
      </button>
    );
  }
);

SliderNavigationButton.displayName = "SliderNavigationButton";

export default SliderNavigationButton;
