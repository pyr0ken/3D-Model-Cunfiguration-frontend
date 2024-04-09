import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { apiBase } from "../../services";

export default function useLogin() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await apiBase.post("/users/token/", data);
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      const decodedToken = jwtDecode(accessToken);
      const user = { username: decodedToken.username };
      return { user, accessToken, refreshToken };
    },
  });
}
