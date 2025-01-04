/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import TickBox from "./TickBox";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  isChecked?: any;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ isChecked, onChange, label, ...props }, ref) => {
    const [isCheckedLocal, setIsCheckedLocal] = useState(false);

    const onChangeLocal = (e: any) => {
      setIsCheckedLocal(e.target.checked);
    };

    const state = onChange ? isChecked : isCheckedLocal;

    return (
      <label className="cursor-pointer flex">
        <TickBox isChecked={state} className="me-2.5">
          <input
            ref={ref}
            type="checkbox"
            className="hidden"
            checked={state}
            onChange={onChange || onChangeLocal}
            {...props}
          />
        </TickBox>

        {label && (
          <span className="text-base inline-block align-middle">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
