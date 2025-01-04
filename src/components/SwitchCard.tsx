import { Slot } from "@radix-ui/react-slot";
import Typography from "components/Typography";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: any;
  title?: string;
  className?: string;
  asChild?: boolean;
}

// const SwitchCard = (: Props) => {
const SwitchCard = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { Icon, title, className, asChild, ...localProps } = props;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      {...localProps}
      className={twMerge(
        "cursor-pointer flex items-center p-4 rounded hover:bg-green-500 border-2 border-black/40 dark:border-white/40 hover:dark:border-green-500 hover:text-white hover:border-green-500 hover:shadow-md transition-all duration-100",
        className
      )}
    >
      {Icon ? (
        <span className="w-10 text-2xl">
          <Icon className="opacity-90" />
        </span>
      ) : null}

      <Typography variant="lg" className="capitalize flex-shrink-0">
        {title}
      </Typography>
    </Comp>
  );
});

SwitchCard.displayName = "SwitchCard";

export default SwitchCard;
