import * as userServices from "../services/userServices";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await userServices.refreshToken();
    const accessToken = response.data.access_token;
    console.log(response.data.access_token);
    const jwtDecoded = jwt_decode(accessToken);
    const username = jwtDecoded.sub;
    const role = jwtDecoded.role;
    setAuth((prev) => {
      return {
        ...prev,
        username: username,
        role: role,
        accessToken: accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
