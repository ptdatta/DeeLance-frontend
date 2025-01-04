import { ReactNode } from "react";
import Typography from "./Typography";

function FormLabel({
  children,
  as,
  ...props
}: {
  children: ReactNode;
  as?: any;
}) {
  return (
    <Typography className="mb-1 inline-block" {...props}>
      {children}
    </Typography>
  );
}

export default FormLabel;
