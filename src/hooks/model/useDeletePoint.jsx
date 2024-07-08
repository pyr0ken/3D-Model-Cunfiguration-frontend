import { useMutation } from "@tanstack/react-query";
import { deletePoint } from "../../services/modelsApi";

export default function useDeletePoint() {
  return useMutation({
    mutationFn: (data) => deletePoint(data),
  });
}
