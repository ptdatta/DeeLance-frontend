import { twMerge } from "tailwind-merge";
import Typography from "./Typography";

function Pill({ children, className, sizeVariant = "xs", as, ...props }: any) {
  return (
    <Typography
      {...props}
      as={as}
      variant={sizeVariant}
      className={twMerge(
        "py-[.25em] px-[.75em] rounded-full bg-woodsmoke-100 dark:bg-woodsmoke-700 w-fit whitespace-nowrap",
        className
      )}
    >
      {children}
    </Typography>
  );
}

export default Pill;
