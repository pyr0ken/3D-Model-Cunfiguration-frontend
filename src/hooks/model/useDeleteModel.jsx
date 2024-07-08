import { useMutation } from "@tanstack/react-query";
import { deleteModel } from "../../services/modelsApi";

export default function useDeleteModel() {
  return useMutation({
    mutationFn: (data) => deleteModel(data),
  });
}
