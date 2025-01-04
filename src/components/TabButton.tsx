import { twMerge } from "tailwind-merge";
import Button from "./Button";

const TabButton = ({ children, active, className, ...props }: any) => {
  return (
    <Button
      {...props}
      variant="simple"
      className={twMerge(
        `px-0 border-y-2 border-transparent rounded-none ${
          active
            ? "border-b-white-100 text-black dark:text-white"
            : "text-black/40 dark:text-white/40 border-transparent"
        }`,
        className
      )}
    >
      {children}
    </Button>
  );
};

export default TabButton;
