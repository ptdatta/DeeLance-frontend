import { useEffect, useRef, useCallback } from "react";

const OutsideClickDetector = (handler: () => void, enabled: boolean) => {
  const ref = useRef<any>(null);

  const handleClick = useCallback(
    (event: any) => {
      if (enabled && ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    },
    [handler, enabled]
  );

  useEffect(() => {
    const cleanup = () => {
      document.removeEventListener("mousedown", handleClick);
    };

    if (enabled) {
      document.addEventListener("mousedown", handleClick);
      return cleanup;
    }

    return () => {
      cleanup();
    };
  }, [handleClick, enabled]);

  return ref;
};

export default OutsideClickDetector;
