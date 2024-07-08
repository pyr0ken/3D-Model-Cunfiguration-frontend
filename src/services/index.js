import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useAuthStore } from "../store/authStore";

const BASE_URL = "http://127.0.0.1:8000/"
const API = BASE_URL + "api/v1";

const apiBase = axios.create({
  baseURL: API,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

const apiAuth = axios.create({
  baseURL: API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
  },
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const response = await axios.post(`${API}/users/token/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;
    Cookies.set("accessToken", access);
    return access;
  } catch (error) {
    // Handle error, e.g., redirect to login page
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

// Axios interceptor to check access token expiration and refresh if needed
apiAuth.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = dayjs().unix();
      if (decodedToken.exp - currentTime < 10) {
        // Adjusted to check 10 seconds before expiration
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { apiBase, apiAuth, API, BASE_URL };
