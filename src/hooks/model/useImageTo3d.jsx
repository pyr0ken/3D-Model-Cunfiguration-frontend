import { useMutation } from "@tanstack/react-query";
import { imageTo3dModel } from "../../services/modelsApi";

export default function useImageTo3d() {
  return useMutation({
    mutationFn: (data) => imageTo3dModel(data),
  });
}
