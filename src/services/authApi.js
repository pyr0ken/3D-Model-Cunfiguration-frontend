import { apiBase } from "./index";

export const registerRequest = async (data) => {
  return await apiBase
    .post("/users/register/", data)
    .then((response) => response.data);
};

export const loginRequest = async (credentials) => {
  const response = await apiBase.post("/users/login/", credentials);
  const accessToken = response.data.access_token;
  const refreshToken = response.data.refresh_token;
  const user = {
    username: response.data.username,
    userId: response.data.user_id,
  };
  return { user, accessToken, refreshToken };
};
