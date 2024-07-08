import { useQuery } from "@tanstack/react-query";
import { getEditModelDetail } from "../../services/modelsApi";

export default function useEditModelDetail(editModelId) {
  return useQuery({
    queryKey: ["editedModels", editModelId],
    queryFn: () => getEditModelDetail(editModelId),
  });
}
