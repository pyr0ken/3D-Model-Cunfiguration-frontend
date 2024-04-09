import { create } from "zustand";
import Cookies from "js-cookie";

const userCookie = Cookies.get("user");
const accessTokenCookie = Cookies.get("accessToken");
const accessRefreshCookie = Cookies.get("refreshToken");

let user = null;
let accessToken = null;
let refreshToken = null;

if (userCookie && accessTokenCookie && accessRefreshCookie) {
  try {
    user = JSON.parse(userCookie);
    accessToken = accessTokenCookie;
    refreshToken = accessRefreshCookie;
  } catch (e) {}
}

export const useAuthStore = create((set) => ({
  user,
  accessToken,
  refreshToken,
  isAuthenticated: accessToken !== null,

  login: (user, accessToken, refreshToken) => {
    const timers = 60 * 86400;
    set(() => ({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    }));
    Cookies.set("refreshToken", refreshToken, { expires: timers });
    Cookies.set("user", JSON.stringify(user), { expires: timers });
    Cookies.set("accessToken", accessToken, { expires: timers });
  },
  logout: () => {
    set(() => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    }));
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },
}));
