import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function SocialAuthIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="/"
      className={twMerge(
        "text-green-haze-600 text-xl border border-black dark:border-white rounded-full p-3",
        className
      )}
    >
      {children}
    </a>
  );
}

export default SocialAuthIcon;
