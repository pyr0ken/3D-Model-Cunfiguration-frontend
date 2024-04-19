import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../../services/authApi";

export default function useLogin() {
  return useMutation({
    mutationFn: (data) => loginRequest(data),
  });
}
