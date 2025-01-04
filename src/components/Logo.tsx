import { twMerge } from "tailwind-merge";

export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <img
        src="/images/logo.svg"
        className={twMerge("", className, "hidden dark:block")}
        alt="deelance.com deelance"
      />

      <img
        src="/images/logo-dark.svg"
        className={twMerge("", className, "block dark:hidden")}
        alt="deelance.com deelance"
      />
    </>
  );
}
