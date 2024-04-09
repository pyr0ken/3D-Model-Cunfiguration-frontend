import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useAuthStore } from "../store/authStore";

const accessToken = Cookies.get("accessToken");
const refreshToken = Cookies.get("refreshToken");

const API = "http://127.0.0.1:8000/api/v1";

const apiBase = axios.create({
  baseURL: API,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

const apiAuth = axios.create({
  baseURL: API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

// apiAuth.interceptors.request.use(async (req) => {
//   let user = jwtDecode(accessToken);
//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//   if (!isExpired) return req;

//   const response = await apiBase.post(`/users/token/refresh/`, {
//     refresh: refreshToken,
//   });

//   const decodedToken = jwtDecode(accessToken);
//   user = { username: decodedToken.username };

//   useAuthStore().login(response.data.access, response.data.refresh, refreshToken)

//   req.headers.Authorization = `Bearer ${response.data.access}`;
//   return req;
// });

export { apiBase, apiAuth, API };
