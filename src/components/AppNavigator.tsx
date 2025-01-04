import { AuthContext } from "Providers/AuthContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function AppNavigator() {
  const { isToken } = useContext(AuthContext);
  return <Navigate to={isToken ? "/dashboard" : "/login"} replace />;
}

export default AppNavigator;
