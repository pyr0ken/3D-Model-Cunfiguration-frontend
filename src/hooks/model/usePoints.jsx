import { useQuery } from "@tanstack/react-query";
import { getPoints } from "../../services/modelsApi";

export default function usePoints(modelId) {
  return useQuery({
    queryKey: ["points", modelId],
    queryFn: () => getPoints(modelId),
  });
}
