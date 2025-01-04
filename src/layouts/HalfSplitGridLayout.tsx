import { ReactNode } from "react";
import { cn } from "utils/cn";

function HalfSplitGridLayout({
  children,
  reverse,
}: {
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <main
      className={cn(
        "grid xl:grid-cols-[400px_1fr] gap-7",
        reverse ? "xl:grid-cols-[1fr_400px]" : null
      )}
    >
      {children}
    </main>
  );
}

export default HalfSplitGridLayout;
