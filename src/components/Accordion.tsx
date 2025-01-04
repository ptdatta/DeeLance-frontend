import { ReactNode, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Typography from "./Typography";

function Accordion({
  title,
  children,
  buttonClassName,
  childrenWrapperClassName,
}: {
  title: string;
  children: ReactNode;
  buttonClassName: string;
  childrenWrapperClassName: string;
}) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const accordionMenuRef = useRef(null);

  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const getHeight = () => {
    return isAccordionOpen
      ? `${(accordionMenuRef?.current as any)?.scrollHeight}px`
      : "0";
  };

  const accordionHeight = { height: getHeight() };

  return (
    <div
      className={`bg-woodsmoke-200 dark:bg-woodsmoke-900 rounded-md accordion transition-all duration-300 ${
        isAccordionOpen && "active"
      }`}
    >
      <button
        type="button"
        onClick={toggleAccordion}
        className={twMerge(
          "w-full text-left flex items-center justify-between py-4 px-6",
          buttonClassName
        )}
      >
        <Typography
          asChild
          className="transition-all duration-300 inline-block font-medium"
        >
          <span>{title}</span>
        </Typography>

        <span
          className={`transition-all duration-300 ${
            isAccordionOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 relative"
        style={accordionHeight}
        ref={accordionMenuRef}
      >
        <div className={twMerge("pt-0 pb-6 px-6", childrenWrapperClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
