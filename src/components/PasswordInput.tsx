import { forwardRef, useState } from "react";
import Input, { InputProps } from "./Input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cn } from "utils/cn";

const TYPE_PASSWORD = "password";
const TYPE_TEXT = "text";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, disabled, showErrorText = false, ...otherProps } = props;
  const [type, setType] = useState(TYPE_PASSWORD);

  const togglePasswordVisibility = () => {
    setType((val) => (val === "password" ? "text" : "password"));
  };

  return (
    <div className="relative">
      <Input
        {...otherProps}
        ref={ref}
        type={type}
        className={cn("pr-16", className)}
        disabled={disabled}
        showErrorText={showErrorText}
      />

      <button
        onClick={togglePasswordVisibility}
        type="button"
        tabIndex={-1}
        disabled={disabled}
        className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl opacity-60  disabled:opacity-40 z-20"
      >
        {type === TYPE_TEXT ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
