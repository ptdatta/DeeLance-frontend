import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const EditPencilIcon = forwardRef<HTMLButtonElement, Props>(
  ({ className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type={type}
        className={twMerge(
          "w-[2.2em] h-[2.2em] rounded-full bg-woodsmoke-200 dark:bg-woodsmoke-950 flex items-center justify-center text-sm absolute top-0 right-0",
          className
        )}
      >
        <FaPencilAlt />
      </button>
    );
  }
);

EditPencilIcon.displayName = "EditPencilIcon";

export default EditPencilIcon;
