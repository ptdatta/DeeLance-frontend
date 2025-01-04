import useMediaQuery from "hooks/useMediaQuery";
import { ReactNode } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

function MediaQueryWrapper({
  breakpoint = "sm",
  children,
  up = true,
  inverse,
}: {
  children: ReactNode;
  up?: boolean;
  inverse?: boolean;
  breakpoint: keyof typeof breakpoints;
}) {
  const shouldShow = useMediaQuery(
    `(${up ? "min-width" : "max-width"}:${breakpoints[breakpoint]}px)`
  );

  return inverse
    ? shouldShow
      ? null
      : children
    : shouldShow
      ? children
      : null;
}

export default MediaQueryWrapper;
