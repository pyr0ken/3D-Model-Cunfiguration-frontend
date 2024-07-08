import { useMutation } from "@tanstack/react-query";
import { addPoint } from "../../services/modelsApi";

export default function useAddPoint() {
  return useMutation({
    mutationFn: (data) => addPoint(data),
  });
}
