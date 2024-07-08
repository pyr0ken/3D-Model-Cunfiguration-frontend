import { useMutation } from "@tanstack/react-query";
import { addEditModel } from "../../services/modelsApi";

export default function useAddEditModel() {
  return useMutation({
    mutationFn: (data) => addEditModel(data),
  });
}
