import { ReactNode } from "react";
import ReactDOM from "react-dom";

function Portal({ children }: { children: ReactNode }) {
  return ReactDOM.createPortal(
    children,
    document.getElementById("modals") as any
  );
}

export default Portal;
