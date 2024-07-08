import { useQuery } from "@tanstack/react-query";
import { getEditedModel } from "../../services/modelsApi";

export default function useEditedModels() {
  return useQuery({
    queryKey: ["editedModels"],
    queryFn: getEditedModel,
  });
}
