import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "utils/cn";

function CircularLoader({ className }: { className?: string }) {
  return <div className={cn("loadingbutton-loader text-[240%]", className)} />;
}

function CircularSnake({
  className,
  color = "#22c55e",
  duration = 2,
}: {
  className?: string;
  color?: string;
  duration?: number;
}) {
  return (
    <svg
      width="24"
      height="24"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            calcMode="spline"
            values="0 150;42 150;42 150;42 150"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            calcMode="spline"
            values="0;-16;-59;-59"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur={`${duration}s`}
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

function BarLoader({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "w-full h-6 border-4 border-white shadow shadow-black/40 relative rounded-full overflow-hidden",
        className
      )}
    >
      <div className="bg-green-500 absolute h-full w-full transition-transform duration-1000 origin-left animate-indeterminate-bar rounded-full" />
    </div>
  );
}

function LoaderFullScreenWrapper({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 flex items-center justify-center w-full h-screen z-[10000] bg-transparent",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4 w-full">
        {children}
      </div>
    </div>
  );
}

const Loader = {
  CircularLoader,
  LoaderFullScreenWrapper,
  BarLoader,
  CircularSnake,
};

export default Loader;
