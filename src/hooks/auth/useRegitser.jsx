import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../../services/authApi";

export default function useRegister() {
  return useMutation({
    mutationFn: (data) => registerRequest(data),
  });
}
