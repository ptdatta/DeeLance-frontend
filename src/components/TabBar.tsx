import { twMerge } from "tailwind-merge";

function TabBar({ children, className, showLine = true }: any) {
  return (
    <div>
      <div className={twMerge("flex", className)}>{children}</div>

      {showLine ? <hr className="opacity-40 border-1 -mt-0.5" /> : null}
    </div>
  );
}

export default TabBar;
