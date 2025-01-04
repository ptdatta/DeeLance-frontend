import { AuthContext } from "@/Providers/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  adminCheck = false,
  redirectTo = "/login",
}: {
  children: ReactNode;
  adminCheck?: boolean;
  redirectTo?: string;
}) {
  const { isToken } = useContext(AuthContext);
  const { data: user } = useQuery<any>({
    queryKey: ["user"],
    enabled: false,
  });

  if (adminCheck && user?.role === "admin" && isToken) return children;

  if (isToken && adminCheck === false) return children;

  return <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
