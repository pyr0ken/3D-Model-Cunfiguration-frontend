import { jwtDecode } from "jwt-decode";
import { apiBase } from "./index";

export const loginRequest = async (credentials) => {
  const response = await apiBase.post("/users/token/", credentials);
  const accessToken = response.data.access;
  const refreshToken = response.data.refresh;
  const decodedToken = jwtDecode(accessToken);
  const user = { username: decodedToken.username };
  return { user, accessToken, refreshToken };
};
