import { AuthContext } from "Providers/AuthContextProvider";
import { ReactNode, useContext } from "react";

function AuthGuard({
  children,
  inverse,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  const { isToken } = useContext(AuthContext);

  return inverse ? (isToken ? null : children) : isToken ? children : null;
}

export default AuthGuard;
