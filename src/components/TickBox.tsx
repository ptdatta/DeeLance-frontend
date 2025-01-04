import { FaCheck } from "react-icons/fa";
import { cn } from "utils/cn";

function TickBox({ children, isChecked, className }: any) {
  return (
    <div className={cn("relative inline-block align-middle", className)}>
      {children}

      <div
        className={`w-5 h-5 border-2 rounded transition-all duration-100 ${
          isChecked
            ? "bg-green-haze-600 border-green-haze-600"
            : "bg-transparent border-woodsmoke-400"
        }`}
      />
      <span
        className={`absolute top-0 left-0 w-5 h-5 flex items-center justify-center text-white select-none text-[12px] transition-all duration-200 ${
          isChecked ? "opacity-100" : "opacity-0"
        }`}
      >
        <FaCheck />
      </span>
    </div>
  );
}

export default TickBox;
