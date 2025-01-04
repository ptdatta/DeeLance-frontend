import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import axios from "api/axios";
import { streamClient } from "services/streamService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{
  token: string | null;
  isToken: boolean;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => Promise<unknown>;
  removeTokenFromLocalStorage: () => Promise<unknown>;
  setTokenValue: (tokenValue: string) => void;
  setToken: Dispatch<SetStateAction<string | null>>;
}>(null!);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isToken = Boolean(token);
  const navigate = useNavigate();

  const setTokenValue = (tokenValue: string) => {
    localStorage.setItem("token", tokenValue);
    setToken(tokenValue);
  };

  const login = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      const func = async () => {
        try {
          const response = await axios.post(
            "/login",
            {
              email,
              password,
            },
            { withCredentials: true }
          );

          setTokenValue(response.data.accessToken);
          resolve(response);
        } catch (error: any) {
          const errorMessage = error.response?.data?.errors
            ? error.response.data.errors[0].msg
            : "Wrong data details!";
          reject(errorMessage);
        }
      };

      func();
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      const func = async () => {
        try {
          const response = await axios.post(
            "/logoutUser",
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          await streamClient.disconnectUser();

          localStorage.removeItem("token");
          setToken(null);
          resolve(response);
        } catch (error: any) {
          resolve(error);
        }
      };

      func();
    });
  };

  const removeTokenFromLocalStorage = () => {
    return new Promise((resolve) => {
      async function func() {
        await streamClient.disconnectUser();
        localStorage.removeItem("token");
        setToken(null);
        // resetUser();
        resolve(null);
        navigate("/login");
      }

      func();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isToken,
        login,
        removeTokenFromLocalStorage,
        setTokenValue,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
