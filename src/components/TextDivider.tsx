import { twMerge } from "tailwind-merge";
import Typography from "./Typography";

export default function TextDivider({ text, className }: any) {
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center mx-auto w-full",
        className
      )}
    >
      <div className="h-[1px] flex-1 bg-black dark:bg-white" />
      {text ? <Typography className="mx-[1rem]">{text}</Typography> : null}
      <div className="h-[1px] flex-1 bg-black dark:bg-white" />
    </div>
  );
}
