import { useContext } from "react";
import { AuthContext } from "Providers/AuthContextProvider";
import axios from "api/axios";

const useRefreshToken = () => {
  const { setTokenValue, removeTokenFromLocalStorage } =
    useContext(AuthContext);

  // eslint-disable-next-line consistent-return
  const refresh = async () => {
    try {
      const response = await axios.post(
        "/refresh-token",
        {},
        { withCredentials: true }
      );
      console.log("refresh token = ", response.data.accessToken);

      setTokenValue(response.data.accessToken);
      return response.data.accessToken;
    } catch (err) {
      await removeTokenFromLocalStorage();
      console.log("refresh token err = ", err);
    }
  };
  return refresh;
};

export default useRefreshToken;
