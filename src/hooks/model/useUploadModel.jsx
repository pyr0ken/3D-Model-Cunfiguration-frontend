import { useMutation } from "@tanstack/react-query";
import { uploadModel } from "../../services/modelsApi";

export default function useUploadModel() {
  return useMutation({
    mutationFn: (data) => uploadModel(data),
  });
}
