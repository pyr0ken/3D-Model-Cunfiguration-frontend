import { useQuery } from "@tanstack/react-query";
import { getUploadedModel } from "../../services/modelsApi";

export default function useUploadedModels() {
  return useQuery({
    queryKey: ["uploadedModels"],
    queryFn: getUploadedModel,
  });
}
