import { useMutation } from "@tanstack/react-query";
import { deleteEditModel } from "../../services/modelsApi";

export default function useDeleteEditModel() {
  return useMutation({
    mutationFn: (data) => deleteEditModel(data),
  });
}
