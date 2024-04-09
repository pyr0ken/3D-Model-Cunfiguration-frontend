import { jwtDecode } from "jwt-decode";
import { apiBase } from "./index";
import { useAuthStore } from "../store/authStore";

export const loginRequest = async (credentials) => {
  try {
    const response = await apiBase.post("/users/token/", credentials);
    console.log(response);
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    const decodedToken = jwtDecode(accessToken);
    const user = { username: decodedToken.username };
    return { user, accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    const message =
      error.response?.data?.detail || "An unknown error occurred.";
    throw error;
  }
};
